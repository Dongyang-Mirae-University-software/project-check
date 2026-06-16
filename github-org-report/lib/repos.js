const fs = require("fs");
const path = require("path");
const { run } = require("./shell");

const WORKSPACE_ROOT = path.resolve(__dirname, "..", "..", "..");

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function findWorkspaceRepoDir(repoName) {
  if (!fs.existsSync(WORKSPACE_ROOT)) {
    return null;
  }

  const exact = path.join(WORKSPACE_ROOT, repoName);
  if (fs.existsSync(path.join(exact, ".git"))) {
    return exact;
  }

  const lowered = repoName.toLowerCase();
  for (const entry of fs.readdirSync(WORKSPACE_ROOT, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }
    if (entry.name.toLowerCase() !== lowered) {
      continue;
    }
    const candidate = path.join(WORKSPACE_ROOT, entry.name);
    if (fs.existsSync(path.join(candidate, ".git"))) {
      return candidate;
    }
  }

  return null;
}

function listOrgRepos(org) {
  const result = run("gh", [
    "repo",
    "list",
    org,
    "--limit",
    "1000",
    "--json",
    "name,sshUrl,url,visibility,isPrivate",
  ]);

  const repos = JSON.parse(result.stdout || "[]");
  return repos.sort((a, b) => a.name.localeCompare(b.name, "en"));
}

function syncRepo(repo, reposDir, skipClone) {
  const repoDir = path.join(reposDir, repo.name);
  ensureDir(reposDir);

  if (fs.existsSync(path.join(repoDir, ".git"))) {
    run("git", ["fetch", "--all", "--prune", "--tags"], { cwd: repoDir });
    return { repo: repo.name, action: "fetch", path: repoDir };
  }

  const workspaceRepoDir = findWorkspaceRepoDir(repo.name);
  if (workspaceRepoDir) {
    run("git", ["fetch", "--all", "--prune", "--tags"], { cwd: workspaceRepoDir });
    return { repo: repo.name, action: "workspace", path: workspaceRepoDir };
  }

  if (skipClone) {
    throw new Error(`레포가 없고 --skip-clone 이 설정됨: ${repo.name}`);
  }

  run("git", ["clone", repo.url, repoDir]);
  return { repo: repo.name, action: "clone", path: repoDir };
}

module.exports = {
  ensureDir,
  findWorkspaceRepoDir,
  listOrgRepos,
  syncRepo,
  WORKSPACE_ROOT,
};
