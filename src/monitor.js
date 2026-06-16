#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const WORKSPACE_ROOT = path.resolve(__dirname, "..", "..");
const PROJECT_CHECK_DIR = path.resolve(__dirname, "..");
const REPORT_DIR = path.join(PROJECT_CHECK_DIR, "reports");
const PROJECT_REPORT_DIR = path.join(REPORT_DIR, "projects");
const EXCLUDED_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  ".nuxt",
  "venv",
  "__pycache__",
  ".pytest_cache",
  "logs",
  "uploads",
]);

const MAX_SCAN_DEPTH = 6;
const MAX_RECENT_FILES = 8;
const MAX_CONTENT_BYTES = 262144;
const FIXED_SCAN_INTERVAL_MS = 30 * 60 * 1000;
const CONTENT_CANDIDATES = new Set([
  "package.json",
  "requirements.txt",
  "pyproject.toml",
  "Dockerfile",
  "docker-compose.yml",
  "docker-compose.yaml",
  "compose.yml",
  "compose.yaml",
  "application.yml",
  "application.yaml",
  ".env",
  ".env.example",
  ".env.local",
  ".env.development",
  "pom.xml",
  "build.gradle",
  "build.gradle.kts",
  "settings.gradle",
  "settings.gradle.kts",
  "Procfile",
]);

const KEY_FOLDERS = [
  "src",
  "app",
  "pages",
  "components",
  "routers",
  "routes",
  "controllers",
  "services",
  "models",
  "prisma",
  "migrations",
  "database",
  "public",
  "assets",
  "lib",
  "server",
  "api",
  "tests",
  "test",
];

const STACK_KEYWORDS = [
  "react",
  "vue",
  "vite",
  "next",
  "nestjs",
  "express",
  "fastapi",
  "flask",
  "spring",
  "django",
  "node",
  "typescript",
  "javascript",
  "python",
  "java",
  "docker",
  "kubernetes",
  "prisma",
  "sequelize",
  "typeorm",
  "mongoose",
  "mysql",
  "mariadb",
  "postgres",
  "mongodb",
  "redis",
  "sqlite",
  "celery",
  "torch",
  "transformers",
  "langchain",
  "openai",
  "ollama",
  "llama",
  "rag",
  "embedding",
  "vector",
];

const DB_TYPES = [
  "MySQL",
  "MariaDB",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "SQLite",
  "MSSQL",
  "Oracle",
];

const PORT_HINTS = new Set([
  3000,
  3001,
  4000,
  4200,
  5000,
  5173,
  6006,
  7000,
  8000,
  8080,
  8081,
  8082,
  8088,
  8888,
  9000,
  9200,
  9300,
  11211,
  1433,
  1521,
  27017,
  27018,
  27019,
  3306,
  5432,
  6379,
  5672,
  15672,
]);

function main() {
  ensureDirectory(REPORT_DIR);
  ensureDirectory(PROJECT_REPORT_DIR);

  if (!isGitRepo(PROJECT_CHECK_DIR)) {
    run("git", ["init", "-b", "main"], { cwd: PROJECT_CHECK_DIR });
  }

  const once = process.argv.includes("--once") || process.argv.includes("--scan-once");
  if (once) {
    runCycle();
    return;
  }

  loopForever().catch((error) => {
    console.error("[project-check] 치명적 오류:", error);
    process.exitCode = 1;
  });
}

async function loopForever() {
  while (true) {
    runCycle();
    console.log("[project-check] 다음 스캔까지 1800초 대기");
    await sleep(FIXED_SCAN_INTERVAL_MS);
  }
}

function runCycle() {
  const startedAt = new Date();
  console.log(`[project-check] 스캔 시작: ${formatKst(startedAt)}`);

  const pm2State = collectPm2State();
  const dockerState = collectDockerState();
  const listenerState = collectListenerPorts();
  const projects = scanAllProjects({
    pm2State,
    dockerState,
    listenerState,
  });

  const summary = buildSummary(projects, startedAt);
  const runtimeStatus = buildRuntimeStatus(projects, dockerState, pm2State, listenerState);
  const databaseStatus = buildDatabaseStatus(projects);
  const lastScan = buildLastScan(projects, summary, startedAt);

  writeReports({
    projects,
    summary,
    runtimeStatus,
    databaseStatus,
    lastScan,
    startedAt,
  });

  const changed = gitStatusHasReportChanges();
  if (!changed) {
    console.log("[project-check] 보고서 변경 없음");
    return;
  }

  const commitMessage = buildCommitMessage(projects, summary);
  const commitResult = commitAndPush(commitMessage);
  if (commitResult.committed) {
    console.log(`[project-check] 커밋 완료: ${commitResult.message}`);
  } else {
    console.log("[project-check] 커밋하지 못했습니다.");
  }
  if (commitResult.pushed) {
    console.log("[project-check] 푸시 완료");
  } else if (commitResult.pushSkipped) {
    console.log("[project-check] 원격 저장소가 없어 푸시를 건너뜁니다.");
  } else if (commitResult.commitSucceeded) {
    console.log("[project-check] 푸시에 실패했습니다.");
  }
}

function scanAllProjects(context) {
  const projectDirs = listProjectDirectories(WORKSPACE_ROOT);
  const results = [];

  for (const dir of projectDirs) {
    const result = scanProject(dir, context);
    results.push(result);
  }

  return results;
}

function listProjectDirectories(rootDir) {
  const entries = safeReadDir(rootDir);
  const dirs = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    if (entry.name.startsWith(".")) {
      continue;
    }
    if (EXCLUDED_DIRS.has(entry.name)) {
      continue;
    }

    const abs = path.join(rootDir, entry.name);
    if (entry.isSymbolicLink()) {
      continue;
    }
    dirs.push(abs);
  }

  dirs.sort((a, b) => path.basename(a).localeCompare(path.basename(b), "ko"));
  return dirs;
}

function scanProject(projectDir, context) {
  const projectName = path.basename(projectDir);
  const inventory = walkProject(projectDir);
  const content = inspectProjectContent(projectDir, inventory.candidateFiles);

  const classification = classifyProject(projectName, projectDir, inventory, content);
  const stack = detectStack(projectName, inventory, content);
  const dbInfo = detectDatabase(projectName, inventory, content);
  const ports = detectPorts(projectDir, inventory, content, dbInfo);
  const runtime = detectRuntime(projectName, projectDir, ports, context);
  const git = collectGitStats(projectDir);
  const recentFiles = inventory.files.slice(0, MAX_RECENT_FILES).map((file) => ({
    path: file.relPath,
    modifiedAt: new Date(file.mtimeMs).toISOString(),
  }));

  const project = {
    projectName,
    projectPath: projectDir,
    classification,
    stack,
    mainFiles: buildMainFilesSection(projectDir, inventory, content),
    structure: buildStructureSection(inventory),
    database: dbInfo,
    runtime,
    git,
    recentFiles,
    summary: buildProjectSummary(classification, stack, dbInfo, runtime, git),
    discoveredAt: new Date().toISOString(),
  };

  project.reportPath = path.join(PROJECT_REPORT_DIR, `${slugify(projectName)}.md`);
  return project;
}

function walkProject(projectDir) {
  const files = [];
  const candidateFiles = [];
  const directoryNames = new Set();
  const immediateDirectories = new Set();
  const interestingDirectories = new Set();
  let fileCount = 0;
  let dirCount = 0;

  const queue = [{ dir: projectDir, depth: 0, rel: "" }];

  while (queue.length > 0) {
    const current = queue.shift();
    const entries = safeReadDir(current.dir);

    for (const entry of entries) {
      if (entry.name.startsWith(".") && entry.name !== ".env" && entry.name !== ".env.example") {
        continue;
      }

      if (entry.isDirectory()) {
        if (shouldExcludeScanDirectory(projectDir, entry.name)) {
          continue;
        }

        const absPath = path.join(current.dir, entry.name);
        const relPath = current.rel ? path.posix.join(current.rel, entry.name) : entry.name;
        directoryNames.add(relPath);
        dirCount += 1;

        if (current.depth === 0) {
          immediateDirectories.add(entry.name);
        }

        const normalized = relPath.split(path.sep).join("/");
        if (KEY_FOLDERS.some((folder) => normalized === folder || normalized.startsWith(`${folder}/`) || normalized.includes(`/${folder}/`))) {
          interestingDirectories.add(normalized);
        }

        if (current.depth < MAX_SCAN_DEPTH) {
          queue.push({
            dir: absPath,
            depth: current.depth + 1,
            rel: relPath,
          });
        }
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      const absPath = path.join(current.dir, entry.name);
      const relPath = current.rel ? path.posix.join(current.rel, entry.name) : entry.name;
      const stat = safeStat(absPath);
      if (!stat) {
        continue;
      }

      fileCount += 1;
      files.push({
        absPath,
        relPath,
        mtimeMs: stat.mtimeMs,
        size: stat.size,
      });

      if (isContentCandidate(entry.name, relPath)) {
        candidateFiles.push(absPath);
      }
    }
  }

  files.sort((a, b) => b.mtimeMs - a.mtimeMs || a.relPath.localeCompare(b.relPath, "ko"));

  return {
    files,
    candidateFiles: unique(candidateFiles),
    directoryNames: Array.from(directoryNames).sort((a, b) => a.localeCompare(b, "ko")),
    immediateDirectories: Array.from(immediateDirectories).sort((a, b) => a.localeCompare(b, "ko")),
    interestingDirectories: Array.from(interestingDirectories).sort((a, b) => a.localeCompare(b, "ko")),
    fileCount,
    dirCount,
  };
}

function shouldExcludeScanDirectory(projectDir, dirName) {
  if (EXCLUDED_DIRS.has(dirName)) {
    return true;
  }
  if (projectDir === PROJECT_CHECK_DIR && dirName === "reports") {
    return true;
  }
  return false;
}

function inspectProjectContent(projectDir, candidateFiles) {
  const content = {
    packageJson: null,
    requirements: null,
    pyproject: null,
    dockerfile: null,
    dockerCompose: null,
    applicationYaml: null,
    envKeys: [],
    files: {},
    hints: {
      stack: new Set(),
      db: new Set(),
      ai: new Set(),
      framework: new Set(),
      ports: new Set(),
    },
  };

  for (const absPath of candidateFiles.slice(0, 60)) {
    const base = path.basename(absPath);
    const text = safeReadText(absPath);
    if (text === null) {
      continue;
    }

    content.files[path.relative(projectDir, absPath)] = text;

    if (base === "package.json") {
      const json = safeJsonParse(text);
      if (json) {
        content.packageJson = json;
        scanPackageJson(content, json);
      }
      continue;
    }

    if (base === "requirements.txt") {
      content.requirements = text;
      scanRequirements(content, text);
      continue;
    }

    if (base === "pyproject.toml") {
      content.pyproject = text;
      scanPyproject(content, text);
      continue;
    }

    if (base === "Dockerfile") {
      content.dockerfile = text;
      scanDockerfile(content, text);
      continue;
    }

    if (base.startsWith("docker-compose") || base.startsWith("compose")) {
      content.dockerCompose = text;
      scanCompose(content, text);
      continue;
    }

    if (base === "application.yml" || base === "application.yaml") {
      content.applicationYaml = text;
      scanApplicationYaml(content, text);
      continue;
    }

    if (base.startsWith(".env")) {
      scanEnvKeys(content, text);
      continue;
    }

    if (base === "pom.xml") {
      scanPom(content, text);
      continue;
    }

    if (base === "build.gradle" || base === "build.gradle.kts" || base === "settings.gradle" || base === "settings.gradle.kts") {
      scanGradle(content, text);
      continue;
    }

    scanGenericText(content, text, absPath);
  }

  return content;
}

function scanPackageJson(content, json) {
  const deps = {
    ...(json.dependencies || {}),
    ...(json.devDependencies || {}),
    ...(json.peerDependencies || {}),
  };
  const depNames = Object.keys(deps).map((name) => name.toLowerCase());

  addStackMatches(content, depNames);
  if (depNames.some((name) => name === "react" || name.startsWith("@types/react") || name.includes("react-dom"))) {
    content.hints.framework.add("React");
    content.hints.stack.add("React");
  }
  if (depNames.some((name) => name === "vue" || name.includes("vue-router") || name.includes("pinia"))) {
    content.hints.framework.add("Vue");
    content.hints.stack.add("Vue");
  }
  if (depNames.some((name) => name === "next" || name === "next.js")) {
    content.hints.framework.add("Next.js");
    content.hints.stack.add("Next.js");
  }
  if (depNames.some((name) => name === "vite")) {
    content.hints.framework.add("Vite");
    content.hints.stack.add("Vite");
  }
  if (depNames.some((name) => name === "express")) {
    content.hints.framework.add("Express");
    content.hints.stack.add("Express");
    content.hints.framework.add("Node.js");
    content.hints.stack.add("Node.js");
  }
  if (depNames.some((name) => name === "fastapi" || name === "flask")) {
    content.hints.framework.add(depNames.includes("fastapi") ? "FastAPI" : "Flask");
    content.hints.stack.add("Python");
  }
  if (depNames.some((name) => name.includes("spring"))) {
    content.hints.framework.add("Spring");
    content.hints.stack.add("Java");
  }
  if (depNames.some((name) => name.includes("prisma"))) {
    content.hints.stack.add("Prisma");
    content.hints.db.add("Database");
  }
  if (depNames.some((name) => name.includes("sequelize"))) {
    content.hints.stack.add("Sequelize");
    content.hints.db.add("Database");
  }
  if (depNames.some((name) => name.includes("typeorm"))) {
    content.hints.stack.add("TypeORM");
    content.hints.db.add("Database");
  }
  if (depNames.some((name) => name.includes("mongoose"))) {
    content.hints.stack.add("Mongoose");
    content.hints.db.add("MongoDB");
  }
  if (depNames.some((name) => name.includes("redis"))) {
    content.hints.db.add("Redis");
  }
  if (depNames.some((name) => name.includes("openai") || name.includes("langchain") || name.includes("llama"))) {
    content.hints.ai.add("AI");
  }
}

function scanRequirements(content, text) {
  const lower = text.toLowerCase();
  addKeywordIfMatch(content, lower, "fastapi", "FastAPI", "Python", "backend");
  addKeywordIfMatch(content, lower, "flask", "Flask", "Python", "backend");
  addKeywordIfMatch(content, lower, "django", "Django", "Python", "backend");
  addKeywordIfMatch(content, lower, "uvicorn", "Uvicorn", "Python", "backend");
  addKeywordIfMatch(content, lower, "gunicorn", "Gunicorn", "Python", "backend");
  addKeywordIfMatch(content, lower, "pydantic", "Pydantic", "Python", null);
  addKeywordIfMatch(content, lower, "sqlalchemy", "SQLAlchemy", null, "db");
  addKeywordIfMatch(content, lower, "psycopg", "PostgreSQL", null, "db");
  addKeywordIfMatch(content, lower, "pymysql", "MySQL", null, "db");
  addKeywordIfMatch(content, lower, "mysql-connector", "MySQL", null, "db");
  addKeywordIfMatch(content, lower, "mongoengine", "MongoDB", null, "db");
  addKeywordIfMatch(content, lower, "pymongo", "MongoDB", null, "db");
  addKeywordIfMatch(content, lower, "redis", "Redis", null, "db");
  addKeywordIfMatch(content, lower, "torch", "PyTorch", null, "ai");
  addKeywordIfMatch(content, lower, "transformers", "Transformers", null, "ai");
  addKeywordIfMatch(content, lower, "langchain", "LangChain", null, "ai");
  addKeywordIfMatch(content, lower, "openai", "OpenAI", null, "ai");
}

function scanPyproject(content, text) {
  const lower = text.toLowerCase();
  addKeywordIfMatch(content, lower, "fastapi", "FastAPI", "Python", "backend");
  addKeywordIfMatch(content, lower, "flask", "Flask", "Python", "backend");
  addKeywordIfMatch(content, lower, "sqlalchemy", "SQLAlchemy", null, "db");
  addKeywordIfMatch(content, lower, "pydantic", "Pydantic", null, null);
  addKeywordIfMatch(content, lower, "torch", "PyTorch", null, "ai");
  addKeywordIfMatch(content, lower, "transformers", "Transformers", null, "ai");
  addKeywordIfMatch(content, lower, "langchain", "LangChain", null, "ai");
}

function scanDockerfile(content, text) {
  const lower = text.toLowerCase();
  if (lower.includes("node")) {
    content.hints.stack.add("Node.js");
  }
  if (lower.includes("python")) {
    content.hints.stack.add("Python");
  }
  if (lower.includes("openjdk") || lower.includes("eclipse-temurin") || lower.includes("maven")) {
    content.hints.stack.add("Java");
  }
  if (lower.includes("mysql") || lower.includes("postgres") || lower.includes("redis") || lower.includes("mongo")) {
    inferDatabaseFromText(content, lower);
  }
  extractPortsFromText(content, text);
}

function scanCompose(content, text) {
  const lower = text.toLowerCase();
  inferDatabaseFromText(content, lower);
  extractPortsFromText(content, text);
  if (lower.includes("node")) {
    content.hints.stack.add("Node.js");
  }
  if (lower.includes("python")) {
    content.hints.stack.add("Python");
  }
  if (lower.includes("spring")) {
    content.hints.stack.add("Java");
  }
}

function scanApplicationYaml(content, text) {
  const lower = text.toLowerCase();
  inferDatabaseFromText(content, lower);
  extractPortsFromText(content, text);
  if (lower.includes("spring")) {
    content.hints.stack.add("Java");
    content.hints.framework.add("Spring");
  }
}

function scanEnvKeys(content, text) {
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }
    const key = trimmed.split("=")[0].trim();
    if (!key) {
      continue;
    }
    content.envKeys = content.envKeys || [];
    content.envKeys.push(key);
    const upper = key.toUpperCase();
    if (upper.includes("MYSQL") || upper.includes("MARIADB")) {
      content.hints.db.add("MySQL");
    }
    if (upper.includes("POSTGRES")) {
      content.hints.db.add("PostgreSQL");
    }
    if (upper.includes("MONGO")) {
      content.hints.db.add("MongoDB");
    }
    if (upper.includes("REDIS")) {
      content.hints.db.add("Redis");
    }
    if (upper.includes("DB") || upper.includes("DATABASE")) {
      content.hints.db.add("Database");
    }
    if (upper.includes("PORT")) {
      const match = trimmed.match(/=(\d{2,5})$/);
      if (match) {
        content.hints.ports.add(Number(match[1]));
      }
    }
  }
}

function scanPom(content, text) {
  const lower = text.toLowerCase();
  if (lower.includes("spring-boot")) {
    content.hints.stack.add("Java");
    content.hints.framework.add("Spring Boot");
  }
  if (lower.includes("mysql") || lower.includes("mariadb") || lower.includes("postgresql") || lower.includes("mongodb") || lower.includes("redis")) {
    inferDatabaseFromText(content, lower);
  }
}

function scanGradle(content, text) {
  const lower = text.toLowerCase();
  if (lower.includes("spring")) {
    content.hints.stack.add("Java");
    content.hints.framework.add("Spring");
  }
  if (lower.includes("mysql") || lower.includes("postgresql") || lower.includes("mongodb") || lower.includes("redis")) {
    inferDatabaseFromText(content, lower);
  }
}

function scanGenericText(content, text, absPath) {
  const lower = text.toLowerCase();

  if (lower.includes("fastapi") || lower.includes("flask") || lower.includes("django")) {
    content.hints.stack.add("Python");
    content.hints.framework.add(matchOne(lower, ["fastapi", "flask", "django"]));
  }
  if (lower.includes("express") || lower.includes("nestjs") || lower.includes("next.js") || lower.includes("vite") || lower.includes("react") || lower.includes("vue")) {
    if (lower.includes("express") || lower.includes("nestjs")) {
      content.hints.stack.add("Node.js");
      content.hints.framework.add(matchOne(lower, ["express", "nestjs"]));
    }
    if (lower.includes("react")) {
      content.hints.stack.add("React");
    }
    if (lower.includes("vue")) {
      content.hints.stack.add("Vue");
    }
    if (lower.includes("next.js") || lower.includes("nextjs")) {
      content.hints.stack.add("Next.js");
    }
    if (lower.includes("vite")) {
      content.hints.stack.add("Vite");
    }
  }
  if (lower.includes("openai") || lower.includes("langchain") || lower.includes("rag") || lower.includes("embedding") || lower.includes("transformer") || lower.includes("llama") || lower.includes("pytorch") || lower.includes("tensorflow")) {
    content.hints.ai.add("AI");
  }
  if (lower.includes("mysql") || lower.includes("mariadb") || lower.includes("postgres") || lower.includes("mongodb") || lower.includes("redis") || lower.includes("sqlite")) {
    inferDatabaseFromText(content, lower);
  }
  extractPortsFromText(content, text);

  const rel = path.relative(WORKSPACE_ROOT, absPath).toLowerCase();
  if (rel.includes("ai") || rel.includes("llm") || rel.includes("rag") || rel.includes("model") || rel.includes("agent")) {
    content.hints.ai.add("AI");
  }
}

function addStackMatches(content, names) {
  for (const name of names) {
    const lower = name.toLowerCase();
    if (lower.includes("react")) {
      content.hints.stack.add("React");
    }
    if (lower.includes("vue")) {
      content.hints.stack.add("Vue");
    }
    if (lower.includes("vite")) {
      content.hints.stack.add("Vite");
    }
    if (lower.includes("next")) {
      content.hints.stack.add("Next.js");
    }
    if (lower.includes("express") || lower.includes("nest")) {
      content.hints.stack.add("Node.js");
      content.hints.framework.add(lower.includes("nest") ? "NestJS" : "Express");
    }
    if (lower.includes("fastapi") || lower.includes("flask")) {
      content.hints.stack.add("Python");
      content.hints.framework.add(lower.includes("fastapi") ? "FastAPI" : "Flask");
    }
    if (lower.includes("spring")) {
      content.hints.stack.add("Java");
      content.hints.framework.add("Spring");
    }
    if (lower.includes("mysql") || lower.includes("mariadb") || lower.includes("postgres") || lower.includes("mongo") || lower.includes("redis")) {
      inferDatabaseFromText(content, lower);
    }
    if (lower.includes("torch") || lower.includes("transformer") || lower.includes("langchain") || lower.includes("openai") || lower.includes("ollama") || lower.includes("llama")) {
      content.hints.ai.add("AI");
    }
  }
}

function addKeywordIfMatch(content, lower, keyword, stackLabel, frameworkLabel, bucket) {
  if (!lower.includes(keyword)) {
    return;
  }
  if (stackLabel) {
    content.hints.stack.add(stackLabel);
  }
  if (frameworkLabel) {
    content.hints.framework.add(frameworkLabel);
  }
  if (bucket === "db") {
    content.hints.db.add(normalizeDbLabel(stackLabel || frameworkLabel || keyword));
  }
  if (bucket === "ai") {
    content.hints.ai.add("AI");
  }
  if (bucket === "backend") {
    content.hints.framework.add(frameworkLabel || stackLabel || "Backend");
  }
}

function inferDatabaseFromText(content, text) {
  const lower = text.toLowerCase();
  if (lower.includes("mysql") || lower.includes("mariadb")) {
    content.hints.db.add("MySQL");
  }
  if (lower.includes("postgres")) {
    content.hints.db.add("PostgreSQL");
  }
  if (lower.includes("mongodb") || lower.includes("mongo")) {
    content.hints.db.add("MongoDB");
  }
  if (lower.includes("redis")) {
    content.hints.db.add("Redis");
  }
  if (lower.includes("sqlite")) {
    content.hints.db.add("SQLite");
  }
  if (lower.includes("mssql")) {
    content.hints.db.add("MSSQL");
  }
  if (lower.includes("oracle")) {
    content.hints.db.add("Oracle");
  }
}

function extractPortsFromText(content, text) {
  const patterns = [
    /[:=]\s*(\d{4,5})/g,
    /--port\s+(\d{4,5})/g,
    /port\s*:\s*(\d{4,5})/g,
    /server\.port\s*[:=]\s*(\d{4,5})/g,
    /localhost:(\d{4,5})/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const port = Number(match[1]);
      if (Number.isInteger(port) && port > 0 && port < 65536) {
        content.hints.ports.add(port);
      }
    }
  }
}

function detectStack(projectName, inventory, content) {
  const stack = new Set();

  for (const label of content.hints.stack) {
    stack.add(label);
  }
  for (const label of content.hints.framework) {
    stack.add(label);
  }
  for (const ext of inferStackFromNames(projectName, inventory)) {
    stack.add(ext);
  }

  if (inventory.immediateDirectories.includes("app") || inventory.immediateDirectories.includes("pages") || inventory.immediateDirectories.includes("components") || inventory.immediateDirectories.includes("src")) {
    if (stack.size === 0) {
      stack.add("Frontend/웹앱");
    }
  }

  if (stack.size === 0) {
    stack.add("확인 불가");
  }

  return Array.from(stack);
}

function inferStackFromNames(projectName, inventory) {
  const result = new Set();
  const lowerName = projectName.toLowerCase();
  const directories = inventory.directoryNames.map((name) => name.toLowerCase());

  if (lowerName.includes("fe") || lowerName.includes("front") || lowerName.includes("web") || directories.some((name) => name.includes("components") || name.includes("pages") || name.includes("app"))) {
    result.add("Frontend");
  }
  if (lowerName.includes("be") || lowerName.includes("api") || lowerName.includes("server") || directories.some((name) => name.includes("routes") || name.includes("controllers") || name.includes("services") || name.includes("models"))) {
    result.add("Backend");
  }
  if (lowerName.includes("ai") || lowerName.includes("llm") || lowerName.includes("rag") || directories.some((name) => name.includes("model") || name.includes("agent") || name.includes("inference"))) {
    result.add("AI");
  }
  return result;
}

function detectDatabase(projectName, inventory, content) {
  const detectedTypes = new Set();
  const clues = [];

  for (const type of content.hints.db) {
    const normalized = normalizeDbLabel(type);
    if (normalized !== "Database") {
      detectedTypes.add(normalized);
    }
  }

  for (const file of Object.keys(content.files)) {
    const lower = file.toLowerCase();
    if (lower.includes("mysql")) {
      detectedTypes.add("MySQL");
    }
    if (lower.includes("mariadb")) {
      detectedTypes.add("MariaDB");
    }
    if (lower.includes("postgres")) {
      detectedTypes.add("PostgreSQL");
    }
    if (lower.includes("mongo")) {
      detectedTypes.add("MongoDB");
    }
    if (lower.includes("redis")) {
      detectedTypes.add("Redis");
    }
    if (lower.includes("sqlite")) {
      detectedTypes.add("SQLite");
    }
    if (lower.includes("schema.sql") || lower.includes("migrations") || lower.includes("database")) {
      clues.push(file);
    }
  }

  const envKeys = content.envKeys || [];
  for (const key of envKeys) {
    const upper = key.toUpperCase();
    if (upper.includes("MYSQL") || upper.includes("MARIADB")) {
      detectedTypes.add("MySQL");
    }
    if (upper.includes("POSTGRES")) {
      detectedTypes.add("PostgreSQL");
    }
    if (upper.includes("MONGO")) {
      detectedTypes.add("MongoDB");
    }
    if (upper.includes("REDIS")) {
      detectedTypes.add("Redis");
    }
  }

  const composeHint = content.dockerCompose ? inferDbFromCompose(content.dockerCompose) : [];
  for (const type of composeHint) {
    detectedTypes.add(type);
  }

  const dbUsage = detectedTypes.size > 0 || clues.length > 0;
  return {
    used: dbUsage,
    types: Array.from(detectedTypes),
    clueFiles: unique(clues).slice(0, 8),
    evidence: buildDatabaseEvidence(content, detectedTypes, clues),
    summary: dbUsage ? `${Array.from(detectedTypes).join(", ") || "Database"} 사용 추정` : "DB 사용 흔적 없음",
  };
}

function inferDbFromCompose(text) {
  const lower = text.toLowerCase();
  const result = new Set();
  if (lower.includes("mysql") || lower.includes("mariadb")) {
    result.add("MySQL");
  }
  if (lower.includes("postgres")) {
    result.add("PostgreSQL");
  }
  if (lower.includes("mongo")) {
    result.add("MongoDB");
  }
  if (lower.includes("redis")) {
    result.add("Redis");
  }
  if (lower.includes("mssql")) {
    result.add("MSSQL");
  }
  if (lower.includes("oracle")) {
    result.add("Oracle");
  }
  return Array.from(result);
}

function buildDatabaseEvidence(content, detectedTypes, clues) {
  const evidence = [];
  if (content.dockerCompose) {
    evidence.push("docker-compose.yml 확인");
  }
  if (content.applicationYaml) {
    evidence.push("application.yml 확인");
  }
  if (content.requirements) {
    evidence.push("requirements.txt 확인");
  }
  if (content.packageJson) {
    evidence.push("package.json 확인");
  }
  if ((content.envKeys || []).length > 0) {
    evidence.push(`.env 키 ${content.envKeys.length}개 확인`);
  }
  if (clues.length > 0) {
    evidence.push(`DB 관련 파일 ${clues.length}개 확인`);
  }
  if (detectedTypes.size > 0) {
    evidence.push(`추정 DB: ${Array.from(detectedTypes).join(", ")}`);
  }
  return evidence;
}

function detectPorts(projectDir, inventory, content, dbInfo) {
  const ports = new Set();
  for (const port of content.hints.ports) {
    if (Number.isInteger(port)) {
      ports.add(port);
    }
  }

  const files = inventory.files.slice(0, Math.min(120, inventory.files.length));
  for (const file of files) {
    const lower = file.relPath.toLowerCase();
    if (lower.includes("docker-compose") || lower.endsWith(".yml") || lower.endsWith(".yaml") || lower.endsWith(".json") || lower.endsWith(".env") || lower.endsWith(".toml")) {
      const text = safeReadText(file.absPath);
      if (text) {
        extractPortsFromText({ hints: { ports } }, text);
      }
    }
  }

  if (dbInfo.used) {
    for (const type of dbInfo.types) {
      const defaultPort = defaultPortForDb(type);
      if (defaultPort) {
        ports.add(defaultPort);
      }
    }
  }

  const openPorts = Array.from(ports).filter((port) => PORT_HINTS.has(port) || port > 0);
  openPorts.sort((a, b) => a - b);
  return openPorts;
}

function defaultPortForDb(dbType) {
  const lower = String(dbType).toLowerCase();
  if (lower.includes("mysql") || lower.includes("mariadb")) {
    return 3306;
  }
  if (lower.includes("postgres")) {
    return 5432;
  }
  if (lower.includes("mongo")) {
    return 27017;
  }
  if (lower.includes("redis")) {
    return 6379;
  }
  if (lower.includes("mssql")) {
    return 1433;
  }
  if (lower.includes("oracle")) {
    return 1521;
  }
  return null;
}

function detectRuntime(projectName, projectDir, ports, context) {
  const normalizedName = normalizeKey(projectName);
  const pm2Matches = context.pm2State.processes.filter((proc) => {
    const procName = normalizeKey(proc.name || "");
    const cwd = normalizeKey(proc.cwd || "");
    const script = normalizeKey(proc.script || "");
    return (
      procName.includes(normalizedName) ||
      normalizedName.includes(procName) ||
      cwd.includes(normalizedName) ||
      script.includes(normalizedName) ||
      cwd.includes(normalizeKey(projectDir)) ||
      script.includes(normalizeKey(projectDir))
    );
  });

  const dockerMatches = context.dockerState.containers.filter((container) => {
    const name = normalizeKey(container.name || "");
    const image = normalizeKey(container.image || "");
    const status = normalizeKey(container.status || "");
    return (
      name.includes(normalizedName) ||
      image.includes(normalizedName) ||
      status.includes(normalizedName) ||
      normalizedName.includes(name)
    );
  });

  const listeningPorts = ports.filter((port) => context.listenerState.listeningPorts.has(port));
  const foundEvidence = pm2Matches.length > 0 || dockerMatches.length > 0 || listeningPorts.length > 0;
  const running = foundEvidence;

  return {
    status: running ? "실행 중" : inventoryLooksLikeProject(projectDir) ? "정지" : "확인 불가",
    running,
    pm2: pm2Matches,
    docker: dockerMatches,
    ports: listeningPorts,
    allCandidatePorts: ports,
    summary: buildRuntimeSummary(running, pm2Matches, dockerMatches, listeningPorts),
  };
}

function inventoryLooksLikeProject(projectDir) {
  const names = safeReadDir(projectDir).map((entry) => entry.name);
  return names.some((name) => CONTENT_CANDIDATES.has(name) || KEY_FOLDERS.includes(name) || name.endsWith(".json") || name.endsWith(".py") || name.endsWith(".js") || name.endsWith(".ts"));
}

function collectPm2State() {
  const result = run("pm2", ["jlist"], { cwd: PROJECT_CHECK_DIR, allowFailure: true });
  if (!result.ok || !result.stdout.trim()) {
    return {
      available: false,
      processes: [],
    };
  }

  let parsed = [];
  try {
    parsed = JSON.parse(result.stdout);
  } catch (error) {
    parsed = [];
  }

  const processes = parsed.map((proc) => ({
    name: proc.name || proc.pm2_env?.name || "",
    cwd: proc.pm2_env?.pm_cwd || "",
    script: proc.pm2_env?.pm_exec_path || "",
    status: proc.pm2_env?.status || proc.pm2_env?.pm_uptime ? "online" : "unknown",
    pid: proc.pid || proc.process?.pid || null,
  }));

  return {
    available: true,
    processes,
  };
}

function collectDockerState() {
  const result = run("docker", ["ps", "--format", "{{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"], { cwd: PROJECT_CHECK_DIR, allowFailure: true });
  if (!result.ok) {
    return {
      available: false,
      containers: [],
    };
  }

  const containers = [];
  const lines = result.stdout.split(/\r?\n/).filter(Boolean);
  for (const line of lines) {
    const [name = "", image = "", status = "", ports = ""] = line.split("\t");
    containers.push({
      name,
      image,
      status,
      ports,
    });
  }

  return {
    available: true,
    containers,
  };
}

function collectListenerPorts() {
  const result = run("bash", ["-lc", "ss -ltnp 2>/dev/null || netstat -ltnp 2>/dev/null"], {
    cwd: PROJECT_CHECK_DIR,
    allowFailure: true,
  });
  const listeningPorts = new Set();

  if (!result.ok || !result.stdout.trim()) {
    return {
      available: false,
      listeningPorts,
    };
  }

  const lines = result.stdout.split(/\r?\n/);
  for (const line of lines) {
    const matches = line.match(/:(\d{2,5})\s/);
    if (matches) {
      const port = Number(matches[1]);
      if (port > 0 && port < 65536) {
        listeningPorts.add(port);
      }
    }
  }

  return {
    available: true,
    listeningPorts,
  };
}

function buildMainFilesSection(projectDir, inventory, content) {
  const checkedFiles = [];
  const fileMap = new Map([
    ["package.json", false],
    ["vite.config.js", false],
    ["vite.config.ts", false],
    ["vite.config.mjs", false],
    ["vite.config.cjs", false],
    ["next.config.js", false],
    ["next.config.mjs", false],
    ["next.config.ts", false],
    ["requirements.txt", false],
    ["pyproject.toml", false],
    ["Dockerfile", false],
    ["docker-compose.yml", false],
    ["docker-compose.yaml", false],
    ["compose.yml", false],
    ["compose.yaml", false],
    [".env.example", false],
    [".env", false],
    ["pom.xml", false],
    ["build.gradle", false],
    ["build.gradle.kts", false],
  ]);

  for (const rel of Object.keys(content.files)) {
    const base = path.basename(rel);
    if (fileMap.has(base)) {
      fileMap.set(base, true);
    }
  }

  for (const [file, exists] of fileMap.entries()) {
    checkedFiles.push({
      file,
      exists,
    });
  }

  return checkedFiles;
}

function buildStructureSection(inventory) {
  const mainFolders = unique([
    ...inventory.immediateDirectories,
    ...inventory.interestingDirectories.map((item) => item.split("/")[0]),
  ]).filter(Boolean);

  const majorPaths = unique([
    ...inventory.interestingDirectories,
    ...inventory.directoryNames.filter((name) => KEY_FOLDERS.some((folder) => name === folder || name.startsWith(`${folder}/`))),
  ]).slice(0, 20);

  return {
    fileCount: inventory.fileCount,
    dirCount: inventory.dirCount,
    mainFolders: mainFolders.slice(0, 15),
    majorPaths: majorPaths.slice(0, 20),
  };
}

function buildProjectSummary(classification, stack, dbInfo, runtime, git) {
  const parts = [];
  parts.push(`분류: ${classification}`);
  parts.push(`기술 추정: ${stack.join(", ")}`);
  parts.push(dbInfo.used ? `DB 사용 추정: ${dbInfo.types.join(", ") || "확인 불가"}` : "DB 사용 흔적 없음");
  parts.push(`실행 상태: ${runtime.status}`);
  if (git && git.isRepo) {
    parts.push(`Git 커밋 수: ${git.commitCount !== null ? git.commitCount : "확인 불가"}`);
    parts.push(`Git 상위 계정: ${git.authors.length > 0 ? git.authors.slice(0, 3).map((author) => `${author.name}(${author.count})`).join(", ") : "확인 불가"}`);
  } else {
    parts.push("Git 저장소: 아님");
  }
  return parts;
}

function collectGitStats(projectDir) {
  const repoCheck = run("git", ["rev-parse", "--is-inside-work-tree"], {
    cwd: projectDir,
    allowFailure: true,
  });

  if (!repoCheck.ok || repoCheck.stdout.trim() !== "true") {
    return {
      isRepo: false,
      branch: "확인 불가",
      commitCount: null,
      authors: [],
      latestCommit: null,
      summary: "Git 저장소 아님",
    };
  }

  const branchResult = run("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
    cwd: projectDir,
    allowFailure: true,
  });
  const commitCountResult = run("git", ["rev-list", "--count", "HEAD"], {
    cwd: projectDir,
    allowFailure: true,
  });
  const shortlogResult = run("git", ["shortlog", "-sne", "--all", "--no-merges"], {
    cwd: projectDir,
    allowFailure: true,
  });
  const latestCommitResult = run("git", ["log", "-1", "--pretty=format:%h|%an|%ae|%ad|%s", "--date=iso-strict"], {
    cwd: projectDir,
    allowFailure: true,
  });

  const commitCount = Number.parseInt(commitCountResult.stdout.trim(), 10);
  const authors = parseGitShortlog(shortlogResult.stdout);
  const latestCommit = parseGitLatestCommit(latestCommitResult.stdout);

  return {
    isRepo: true,
    branch: branchResult.ok ? branchResult.stdout.trim() : "확인 불가",
    commitCount: Number.isFinite(commitCount) ? commitCount : null,
    authors,
    latestCommit,
    summary: buildGitSummary(authors, commitCount, latestCommit),
  };
}

function parseGitShortlog(output) {
  const authors = [];
  const lines = String(output || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  for (const line of lines) {
    const match = line.match(/^(\d+)\s+(.+?)\s+<(.+?)>$/);
    if (!match) {
      continue;
    }
    const identity = canonicalizeGitIdentity(match[2], match[3]);
    authors.push({
      count: Number(match[1]),
      name: identity.name,
      email: identity.email,
    });
  }

  authors.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ko"));
  return authors;
}

function parseGitLatestCommit(output) {
  const text = String(output || "").trim();
  if (!text) {
    return null;
  }

  const [hash = "", author = "", email = "", date = "", subject = ""] = text.split("|");
  if (!hash) {
    return null;
  }

  return {
    hash,
    author,
    email,
    date,
    subject,
  };
}

function buildGitSummary(authors, commitCount, latestCommit) {
  if (!authors || authors.length === 0) {
    if (Number.isFinite(commitCount)) {
      return `총 ${commitCount}개 커밋`;
    }
    return "커밋 정보 확인 불가";
  }

  const topAuthors = authors
    .slice(0, 3)
    .map((author) => `${author.name}(${author.count})`)
    .join(", ");
  const total = Number.isFinite(commitCount) ? `총 ${commitCount}개 커밋` : "총 커밋 수 확인 불가";
  const latest = latestCommit ? `최근: ${latestCommit.subject}` : "최근 커밋 확인 불가";
  return `${total}, 상위 계정: ${topAuthors}, ${latest}`;
}

function classifyProject(projectName, projectDir, inventory, content) {
  const name = projectName.toLowerCase();
  const pathText = projectDir.toLowerCase();
  const stackText = [...content.hints.stack, ...content.hints.framework].join(" ").toLowerCase();
  const aiNameHit =
    name.includes("ai") ||
    name.includes("llm") ||
    name.includes("rag") ||
    name.includes("agent") ||
    name.includes("model") ||
    pathText.includes("/ai") ||
    pathText.includes("/llm") ||
    pathText.includes("/rag") ||
    pathText.includes("/agent") ||
    pathText.includes("/model");
  const aiStackHit =
    stackText.includes("langchain") ||
    stackText.includes("openai") ||
    stackText.includes("pytorch") ||
    stackText.includes("transformer") ||
    stackText.includes("tensorflow") ||
    stackText.includes("ollama") ||
    stackText.includes("llama");
  const frontendHit =
    name.includes("fe") ||
    name.includes("front") ||
    name.includes("web") ||
    stackText.includes("react") ||
    stackText.includes("vue") ||
    stackText.includes("vite") ||
    stackText.includes("next.js") ||
    inventory.immediateDirectories.includes("components") ||
    inventory.immediateDirectories.includes("pages") ||
    inventory.immediateDirectories.includes("app");
  const backendHit =
    name.includes("be") ||
    name.includes("api") ||
    name.includes("server") ||
    stackText.includes("express") ||
    stackText.includes("fastapi") ||
    stackText.includes("flask") ||
    stackText.includes("spring") ||
    inventory.immediateDirectories.includes("routes") ||
    inventory.immediateDirectories.includes("controllers") ||
    inventory.immediateDirectories.includes("services") ||
    inventory.immediateDirectories.includes("models");
  const dbHit = content.hints.db.size > 0 || pathText.includes("db") || pathText.includes("database") || inventory.immediateDirectories.includes("migrations");

  if (aiNameHit || aiStackHit) {
    return "AI 서버";
  }
  if (frontendHit && !backendHit) {
    return "프론트엔드";
  }
  if (backendHit && !frontendHit) {
    return "백엔드";
  }
  if (backendHit && frontendHit) {
    return "백엔드";
  }
  if (dbHit) {
    return "DB";
  }
  return "기타";
}

function buildRuntimeSummary(running, pm2Matches, dockerMatches, listeningPorts) {
  if (running) {
    return [
      "실행 중",
      pm2Matches.length > 0 ? `PM2 ${pm2Matches.length}개` : "PM2 없음",
      dockerMatches.length > 0 ? `Docker ${dockerMatches.length}개` : "Docker 없음",
      listeningPorts.length > 0 ? `포트 ${listeningPorts.join(", ")}` : "포트 확인 불가",
    ];
  }
  return ["정지 또는 확인 불가"];
}

function buildDatabaseStatus(projects) {
  const lines = [];
  lines.push("# 데이터베이스 상태");
  lines.push("");
  lines.push(`- 스캔 시각: ${formatKst(new Date())}`);
  lines.push("");
  lines.push("| 프로젝트 | DB 사용 여부 | 추정 DB | 실행 상태 | 관련 포트 | 관련 컨테이너 |");
  lines.push("| --- | --- | --- | --- | --- | --- |");

  for (const project of projects) {
    const db = project.database;
    const relatedContainers = project.runtime.docker.map((item) => item.name || item.image || "확인 불가").filter(Boolean);
    lines.push(
      `| ${escapeTable(project.projectName)} | ${db.used ? "예" : "아니오"} | ${escapeTable(db.types.length > 0 ? db.types.join(", ") : "확인 불가")} | ${escapeTable(project.runtime.status)} | ${escapeTable(project.runtime.allCandidatePorts.length > 0 ? project.runtime.allCandidatePorts.join(", ") : "확인 불가")} | ${escapeTable(relatedContainers.length > 0 ? relatedContainers.join(", ") : "확인 불가")} |`
    );
  }

  lines.push("");
  lines.push("## 점검 메모");
  lines.push("");
  for (const project of projects) {
    const db = project.database;
    lines.push(`- ${project.projectName}: ${db.summary}`);
    if (db.evidence.length > 0) {
      lines.push(`  - 근거: ${db.evidence.join(", ")}`);
    }
  }

  return lines.join("\n");
}

function buildRuntimeStatus(projects) {
  const lines = [];
  lines.push("# 실행 상태");
  lines.push("");
  lines.push(`- 스캔 시각: ${formatKst(new Date())}`);
  lines.push("");
  lines.push("| 프로젝트 | 분류 | 실행 상태 | PM2 | Docker | 포트 |");
  lines.push("| --- | --- | --- | --- | --- | --- |");

  for (const project of projects) {
    const pm2Names = project.runtime.pm2.map((item) => item.name || "확인 불가");
    const dockerNames = project.runtime.docker.map((item) => item.name || item.image || "확인 불가");
    lines.push(
      `| ${escapeTable(project.projectName)} | ${escapeTable(project.classification)} | ${escapeTable(project.runtime.status)} | ${escapeTable(pm2Names.length > 0 ? pm2Names.join(", ") : "확인 불가")} | ${escapeTable(dockerNames.length > 0 ? dockerNames.join(", ") : "확인 불가")} | ${escapeTable(project.runtime.allCandidatePorts.length > 0 ? project.runtime.allCandidatePorts.join(", ") : "확인 불가")} |`
    );
  }

  lines.push("");
  lines.push("## 요약");
  lines.push("");
  for (const project of projects) {
    lines.push(`- ${project.projectName}: ${project.runtime.summary.join(" / ")}`);
  }

  return lines.join("\n");
}

function buildSummary(projects, startedAt) {
  const counts = {
    total: projects.length,
    frontend: 0,
    backend: 0,
    ai: 0,
    db: 0,
    running: 0,
    stopped: 0,
  };
  const gitAuthors = aggregateGitAuthors(projects);

  for (const project of projects) {
    if (project.classification === "프론트엔드") {
      counts.frontend += 1;
    } else if (project.classification === "백엔드") {
      counts.backend += 1;
    } else if (project.classification === "AI 서버") {
      counts.ai += 1;
    }

    if (project.database.used) {
      counts.db += 1;
    }

    if (project.runtime.running) {
      counts.running += 1;
    } else {
      counts.stopped += 1;
    }
  }

  const lines = [];
  lines.push("# 프로젝트 상태 요약");
  lines.push("");
  lines.push(`- 전체 프로젝트 개수: ${counts.total}`);
  lines.push(`- 프론트엔드 프로젝트 개수: ${counts.frontend}`);
  lines.push(`- 백엔드 프로젝트 개수: ${counts.backend}`);
  lines.push(`- AI 서버 프로젝트 개수: ${counts.ai}`);
  lines.push(`- DB 사용 프로젝트 개수: ${counts.db}`);
  lines.push(`- Git 저장소 프로젝트 개수: ${projects.filter((project) => project.git.isRepo).length}`);
  lines.push(`- 실행 중인 서비스 개수: ${counts.running}`);
  lines.push(`- 꺼져 있는 서비스 개수: ${counts.stopped}`);
  lines.push(`- 마지막 스캔 시간: ${formatKst(startedAt)}`);
  lines.push("");
  lines.push("## 계정별 커밋 수");
  lines.push("");
  if (gitAuthors.length > 0) {
    lines.push("| 계정 | 이메일별 커밋 수 | 합산 커밋 수 |");
    lines.push("| --- | --- | ---: |");
    for (const author of gitAuthors) {
      lines.push(`| ${escapeTable(author.name)} | ${escapeTable(formatGitAuthorEmails(author.emails))} | ${author.count} |`);
    }
  } else {
    lines.push("- 확인 가능한 Git 계정 정보가 없습니다.");
  }
  lines.push("");
  lines.push("## 프로젝트 목록");
  lines.push("");
  for (const project of projects) {
    lines.push(`- ${project.projectName} | ${project.classification} | ${project.runtime.status} | ${project.database.used ? "DB 사용" : "DB 미사용"}`);
  }

  return lines.join("\n");
}

function buildLastScan(projects, summary, startedAt) {
  const gitAuthors = aggregateGitAuthors(projects);
  return {
    workspaceRoot: WORKSPACE_ROOT,
    projectCheckDir: PROJECT_CHECK_DIR,
    generatedAt: startedAt.toISOString(),
    generatedAtKst: formatKst(startedAt),
    summary: {
      total: projects.length,
      frontend: summary.includes("프론트엔드") ? countByLabel(projects, "프론트엔드") : 0,
      backend: summary.includes("백엔드") ? countByLabel(projects, "백엔드") : 0,
      ai: summary.includes("AI 서버") ? countByLabel(projects, "AI 서버") : 0,
      db: projects.filter((project) => project.database.used).length,
      gitRepos: projects.filter((project) => project.git.isRepo).length,
      running: projects.filter((project) => project.runtime.running).length,
      stopped: projects.filter((project) => !project.runtime.running).length,
    },
    gitAuthors,
    projects: projects.map((project) => ({
      projectName: project.projectName,
      projectPath: project.projectPath,
      classification: project.classification,
      stack: project.stack,
      mainFiles: project.mainFiles,
      structure: project.structure,
      database: project.database,
      runtime: project.runtime,
      git: project.git,
      recentFiles: project.recentFiles,
      summary: project.summary,
    })),
  };
}

function countByLabel(projects, label) {
  return projects.filter((project) => project.classification === label).length;
}

function aggregateGitAuthors(projects) {
  const authors = new Map();

  for (const project of projects) {
    if (!project.git || !project.git.isRepo) {
      continue;
    }

    for (const author of project.git.authors || []) {
      const identity = canonicalizeGitIdentity(author.name, author.email);
      const email = identity.email;
      const name = identity.name;
      const key = name;
      if (!key) {
        continue;
      }

      const existing = authors.get(key);
      if (existing) {
        existing.count += Number(author.count) || 0;
        existing.emails = mergeGitEmailCounts(existing.emails, email, Number(author.count) || 0);
        continue;
      }

      authors.set(key, {
        name: name || email || "확인 불가",
        emails: mergeGitEmailCounts([], email, Number(author.count) || 0),
        count: Number(author.count) || 0,
      });
    }
  }

  return Array.from(authors.values()).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ko"));
}

function mergeGitEmailCounts(existingEmails, email, count) {
  const emails = Array.isArray(existingEmails) ? [...existingEmails] : [];
  const normalizedEmail = String(email || "").trim() || "확인 불가";
  const existing = emails.find((item) => item.email === normalizedEmail);
  if (existing) {
    existing.count += count;
    return emails;
  }
  emails.push({
    email: normalizedEmail,
    count,
  });
  emails.sort((a, b) => b.count - a.count || a.email.localeCompare(b.email, "ko"));
  return emails;
}

function formatGitAuthorEmails(emails) {
  if (!Array.isArray(emails) || emails.length === 0) {
    return "확인 불가";
  }
  return emails.map((item) => `${item.email} (${item.count})`).join("; ");
}

function canonicalizeGitIdentity(name, email) {
  const normalizedEmail = String(email || "").trim();
  const normalizedName = String(name || "").trim();

  if (
    normalizedEmail === "65769312+gosky2@users.noreply.github.com" ||
    normalizedEmail === "lovesky00317@gmail.com"
  ) {
    return {
      name: "gosky",
      email: "lovesky00317@gmail.com",
    };
  }

  return {
    name: normalizedName || normalizedEmail || "확인 불가",
    email: normalizedEmail || "확인 불가",
  };
}

function writeReports({ projects, summary, runtimeStatus, databaseStatus, lastScan, startedAt }) {
  ensureDirectory(REPORT_DIR);
  ensureDirectory(PROJECT_REPORT_DIR);

  const reportFiles = new Set();

  for (const project of projects) {
    const reportPath = path.join(PROJECT_REPORT_DIR, `${slugify(project.projectName)}.md`);
    reportFiles.add(reportPath);
    fs.writeFileSync(reportPath, renderProjectReport(project), "utf8");
  }

  cleanupStaleProjectReports(reportFiles);

  fs.writeFileSync(path.join(REPORT_DIR, "summary.md"), summary, "utf8");
  fs.writeFileSync(path.join(REPORT_DIR, "runtime-status.md"), runtimeStatus, "utf8");
  fs.writeFileSync(path.join(REPORT_DIR, "database-status.md"), databaseStatus, "utf8");
  fs.writeFileSync(path.join(REPORT_DIR, "last-scan.json"), JSON.stringify(lastScan, null, 2), "utf8");

  console.log(`[project-check] 보고서 저장 완료: ${formatKst(startedAt)}`);
}


function cleanupStaleProjectReports(keepFiles) {
  const existing = safeReadDir(PROJECT_REPORT_DIR);
  for (const entry of existing) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) {
      continue;
    }
    const abs = path.join(PROJECT_REPORT_DIR, entry.name);
    if (!keepFiles.has(abs)) {
      try {
        fs.unlinkSync(abs);
      } catch (error) {
        console.warn("[project-check] 오래된 리포트 삭제 실패:", abs, error.message);
      }
    }
  }
}

function renderProjectReport(project) {
  const lines = [];
  lines.push(`# ${project.projectName}`);
  lines.push("");
  lines.push(`- 경로: \`${project.projectPath}\``);
  lines.push(`- 분류: ${project.classification}`);
  lines.push(`- 점검 시각: ${formatKst(new Date(project.discoveredAt))}`);
  lines.push("");
  lines.push("## 추정 기술 스택");
  lines.push("");
  for (const item of project.stack) {
    lines.push(`- ${item}`);
  }
  lines.push("");
  lines.push("## 주요 파일");
  lines.push("");
  for (const item of project.mainFiles) {
    lines.push(`- ${item.file}: ${item.exists ? "있음" : "없음"}`);
  }
  lines.push("");
  lines.push("## 주요 폴더 구조");
  lines.push("");
  lines.push(`- 파일 개수: ${project.structure.fileCount}`);
  lines.push(`- 디렉토리 개수: ${project.structure.dirCount}`);
  lines.push(`- 주요 폴더: ${project.structure.mainFolders.length > 0 ? project.structure.mainFolders.join(", ") : "확인 불가"}`);
  lines.push(`- 주요 경로: ${project.structure.majorPaths.length > 0 ? project.structure.majorPaths.join(", ") : "확인 불가"}`);
  lines.push("");
  lines.push("## DB 사용 여부");
  lines.push("");
  lines.push(`- 사용 여부: ${project.database.used ? "예" : "아니오"}`);
  lines.push(`- 연결 추정 DB: ${project.database.types.length > 0 ? project.database.types.join(", ") : "확인 불가"}`);
  if (project.database.evidence.length > 0) {
    lines.push(`- 근거: ${project.database.evidence.join(", ")}`);
  }
  lines.push("");
  lines.push("## 실행 상태");
  lines.push("");
  lines.push(`- 상태: ${project.runtime.status}`);
  lines.push(`- 관련 포트: ${project.runtime.allCandidatePorts.length > 0 ? project.runtime.allCandidatePorts.join(", ") : "확인 불가"}`);
  lines.push(`- 관련 Docker 컨테이너: ${project.runtime.docker.length > 0 ? project.runtime.docker.map((item) => item.name || item.image || "확인 불가").join(", ") : "확인 불가"}`);
  lines.push(`- 관련 PM2 프로세스: ${project.runtime.pm2.length > 0 ? project.runtime.pm2.map((item) => item.name || "확인 불가").join(", ") : "확인 불가"}`);
  lines.push("");
  lines.push("## Git 커밋 현황");
  lines.push("");
  if (project.git.isRepo) {
    lines.push(`- 브랜치: ${project.git.branch}`);
    lines.push(`- 총 커밋 수: ${project.git.commitCount !== null ? project.git.commitCount : "확인 불가"}`);
    lines.push("- 계정별 커밋 수:");
    if (project.git.authors.length > 0) {
      for (const author of project.git.authors) {
        lines.push(`  - ${author.name} <${author.email}>: ${author.count}`);
      }
    } else {
      lines.push("  - 확인 불가");
    }
    if (project.git.latestCommit) {
      lines.push(`- 최근 커밋: ${project.git.latestCommit.hash} / ${project.git.latestCommit.author} <${project.git.latestCommit.email}> / ${project.git.latestCommit.subject}`);
    } else {
      lines.push("- 최근 커밋: 확인 불가");
    }
  } else {
    lines.push("- 상태: Git 저장소 아님");
  }
  lines.push("");
  lines.push("## 최근 수정 파일");
  lines.push("");
  for (const file of project.recentFiles) {
    lines.push(`- ${file.path} (${formatKst(new Date(file.modifiedAt))})`);
  }
  lines.push("");
  lines.push("## 점검 결과 요약");
  lines.push("");
  for (const item of project.summary) {
    lines.push(`- ${item}`);
  }
  return lines.join("\n");
}

function buildCommitMessage(projects, summary) {
  const changedProjects = projects.map((project) => project.projectName);
  if (changedProjects.length === 1) {
    return `docs: ${changedProjects[0]} 점검 리포트 갱신\n\n- 프로젝트 상태 리포트 업데이트\n- 실행 상태 및 DB 추정 정보 반영\n- 최근 수정 파일 정보 갱신`;
  }
  return `docs: 프로젝트 상태 리포트 갱신\n\n- 워크스페이스 프로젝트 분류 결과 업데이트\n- 실행 중인 서비스 및 DB 상태 반영\n- 최근 수정 파일 정보 갱신`;
}

function commitAndPush(message) {
  const gitEnv = {
    ...process.env,
    GIT_AUTHOR_NAME: "gosky",
    GIT_AUTHOR_EMAIL: "lovesky00317@gmail.com",
    GIT_COMMITTER_NAME: "gosky",
    GIT_COMMITTER_EMAIL: "lovesky00317@gmail.com",
  };

  const addResult = run("git", ["add", "reports"], { cwd: PROJECT_CHECK_DIR, env: gitEnv, allowFailure: true });
  if (!addResult.ok) {
    return {
      committed: false,
      pushed: false,
      pushSkipped: false,
      commitSucceeded: false,
    };
  }

  const commitResult = run("git", ["commit", "-m", message], { cwd: PROJECT_CHECK_DIR, env: gitEnv, allowFailure: true });
  if (!commitResult.ok) {
    return {
      committed: false,
      pushed: false,
      pushSkipped: false,
      commitSucceeded: false,
      stdout: commitResult.stdout,
      stderr: commitResult.stderr,
    };
  }

  const remoteCheck = run("git", ["remote", "get-url", "origin"], { cwd: PROJECT_CHECK_DIR, env: gitEnv, allowFailure: true });
  if (!remoteCheck.ok || !remoteCheck.stdout.trim()) {
    return {
      committed: true,
      commitSucceeded: true,
      pushed: false,
      pushSkipped: true,
      message: commitResult.stdout.trim() || "commit",
    };
  }

  const pushResult = run("git", ["push"], { cwd: PROJECT_CHECK_DIR, env: gitEnv, allowFailure: true });
  return {
    committed: true,
    commitSucceeded: true,
    pushed: pushResult.ok,
    pushSkipped: false,
    message: commitResult.stdout.trim() || "commit",
    pushStdout: pushResult.stdout,
    pushStderr: pushResult.stderr,
  };
}

function gitStatusHasReportChanges() {
  const result = run("git", ["status", "--porcelain", "--", "reports"], {
    cwd: PROJECT_CHECK_DIR,
    allowFailure: true,
  });
  return Boolean(result.ok && result.stdout.trim());
}

function isGitRepo(dir) {
  const result = run("git", ["rev-parse", "--is-inside-work-tree"], {
    cwd: dir,
    allowFailure: true,
  });
  return Boolean(result.ok && result.stdout.trim() === "true");
}

function buildLastScanSummary(projects) {
  return {
    total: projects.length,
    frontend: projects.filter((project) => project.classification === "프론트엔드").length,
    backend: projects.filter((project) => project.classification === "백엔드").length,
    ai: projects.filter((project) => project.classification === "AI 서버").length,
    db: projects.filter((project) => project.database.used).length,
    gitRepos: projects.filter((project) => project.git.isRepo).length,
    running: projects.filter((project) => project.runtime.running).length,
    stopped: projects.filter((project) => !project.runtime.running).length,
  };
}

function ensureDirectory(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function safeReadDir(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch (error) {
    return [];
  }
}

function safeReadText(filePath) {
  try {
    const stat = fs.statSync(filePath);
    if (stat.size > MAX_CONTENT_BYTES) {
      return null;
    }
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    return null;
  }
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
}

function safeStat(filePath) {
  try {
    return fs.statSync(filePath);
  } catch (error) {
    return null;
  }
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function isContentCandidate(fileName, relPath) {
  const base = path.basename(fileName || relPath);
  if (CONTENT_CANDIDATES.has(base)) {
    return true;
  }
  if (base.endsWith(".env")) {
    return true;
  }
  if (base.endsWith(".yml") || base.endsWith(".yaml")) {
    return true;
  }
  if (base.endsWith(".json") && base !== "package-lock.json") {
    return base === "package.json" || base === "tsconfig.json" || base === "nest-cli.json" || base === "turbo.json";
  }
  if (base.endsWith(".py") || base.endsWith(".js") || base.endsWith(".ts") || base.endsWith(".java") || base.endsWith(".tsx") || base.endsWith(".jsx")) {
    const normalized = relPath.toLowerCase();
    return normalized.split("/").length <= 4 || normalized.includes("src/") || normalized.includes("app/") || normalized.includes("server/") || normalized.includes("api/");
  }
  return false;
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "") || "project";
}

function normalizeKey(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\/._-]+/g, "");
}

function normalizeDbLabel(text) {
  const value = String(text || "").toLowerCase();
  if (value.includes("mysql") || value.includes("mariadb")) {
    return "MySQL";
  }
  if (value.includes("postgres")) {
    return "PostgreSQL";
  }
  if (value.includes("mongo")) {
    return "MongoDB";
  }
  if (value.includes("redis")) {
    return "Redis";
  }
  if (value.includes("sqlite")) {
    return "SQLite";
  }
  if (value.includes("mssql")) {
    return "MSSQL";
  }
  if (value.includes("oracle")) {
    return "Oracle";
  }
  return "Database";
}

function matchOne(text, options) {
  for (const option of options) {
    if (text.includes(option)) {
      return option;
    }
  }
  return options[0] || "";
}

function escapeTable(value) {
  return String(value ?? "확인 불가").replace(/\|/g, "\\|");
}

function formatKst(value) {
  const date = value instanceof Date ? value : new Date(value);
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const lookup = {};
  for (const part of parts) {
    if (part.type !== "literal") {
      lookup[part.type] = part.value;
    }
  }
  return `${lookup.year}-${lookup.month}-${lookup.day} ${lookup.hour}:${lookup.minute}:${lookup.second} KST`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function run(command, args, options = {}) {
  const {
    cwd = PROJECT_CHECK_DIR,
    env = process.env,
    allowFailure = false,
  } = options;

  const result = cp.spawnSync(command, args, {
    cwd,
    env,
    encoding: "utf8",
    shell: false,
    maxBuffer: 10 * 1024 * 1024,
  });

  const ok = result.status === 0;
  if (!ok && !allowFailure) {
    console.warn(`[project-check] 명령 실패: ${command} ${args.join(" ")}`);
    if (result.stderr) {
      console.warn(result.stderr.trim());
    }
  }

  return {
    ok,
    status: result.status,
    stdout: result.stdout || "",
    stderr: result.stderr || "",
  };
}

function cleanupUnusedExports() {
  return buildLastScanSummary;
}

main();
