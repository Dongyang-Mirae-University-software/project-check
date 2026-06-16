#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const {
  EVAL_PERIODS,
  allPeriods,
  parseArgs,
  printHelp,
} = require("./lib/config");
const { ensureDir, listOrgRepos, syncRepo } = require("./lib/repos");
const { fetchRepoCommits } = require("./lib/git-log");
const { aggregateAll, loadAliases } = require("./lib/aggregate");
const { writeExports } = require("./lib/csv");
const { writeReportHtml } = require("./lib/html");

function appendError(errorsPath, message) {
  const line = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(errorsPath, line, "utf8");
}

function logStep(message) {
  console.log(`[github-org-report] ${message}`);
}

function analyzeRepo(repo, repoDir, periods, excludeMerges) {
  const repoResultsByPeriod = new Map();

  for (const period of periods) {
    const commits = fetchRepoCommits(repoDir, period, excludeMerges);
    if (!repoResultsByPeriod.has(period.key)) {
      repoResultsByPeriod.set(period.key, []);
    }
    repoResultsByPeriod.get(period.key).push({
      repo: repo.name,
      commits,
    });
  }

  return repoResultsByPeriod;
}

function mergePeriodResults(target, source) {
  for (const [periodKey, repoResults] of source.entries()) {
    if (!target.has(periodKey)) {
      target.set(periodKey, []);
    }
    target.get(periodKey).push(...repoResults);
  }
}

async function main() {
  const options = parseArgs(process.argv);
  if (options.help) {
    printHelp();
    return;
  }

  const outDir = options.out;
  const reposDir = path.join(outDir, "repos");
  const errorsPath = path.join(outDir, "errors.log");
  const periods = allPeriods();
  const aliasMaps = loadAliases(options.aliases);

  ensureDir(outDir);
  ensureDir(reposDir);
  fs.writeFileSync(errorsPath, "", "utf8");

  logStep(`조직 레포 목록 수집: ${options.org}`);
  let repos = listOrgRepos(options.org);
  if (options.repos) {
    const allow = new Set(options.repos);
    repos = repos.filter((repo) => allow.has(repo.name));
  }

  logStep(`대상 레포 ${repos.length}개`);
  const failedRepos = [];
  const repoResultsByPeriod = new Map();

  for (const repo of repos) {
    try {
      logStep(`동기화 시작: ${repo.name}`);
      const syncResult = syncRepo(repo, reposDir, options.skipClone);
      logStep(`${repo.name}: ${syncResult.action}`);

      const repoPeriodResults = analyzeRepo(repo, syncResult.path, periods, options.excludeMerges);
      mergePeriodResults(repoResultsByPeriod, repoPeriodResults);
      logStep(`분석 완료: ${repo.name}`);
    } catch (error) {
      const message = `${repo.name}: ${error.message}`;
      failedRepos.push({ repo: repo.name, error: error.message });
      appendError(errorsPath, message);
      logStep(`실패 (계속 진행): ${message}`);
    }
  }

  logStep("집계 중...");
  const aggregated = aggregateAll(periods, repoResultsByPeriod, aliasMaps);

  logStep("CSV 생성 중...");
  writeExports(outDir, aggregated);

  const meta = {
    generatedAt: new Date().toISOString(),
    org: options.org,
    repoCount: repos.length - failedRepos.length,
    failedRepos,
    periods: {
      midterm: EVAL_PERIODS.midterm,
      final: EVAL_PERIODS.final,
    },
  };

  logStep("HTML 리포트 생성 중...");
  writeReportHtml(outDir, meta, aggregated);

  const summaryPath = path.join(outDir, "report.html");
  logStep(`완료: ${summaryPath}`);
  logStep(`중간평가 CSV: ${path.join(outDir, "summary-midterm.csv")}`);
  logStep(`기말평가 CSV: ${path.join(outDir, "summary-final.csv")}`);
  logStep(`레포 상세 CSV: ${path.join(outDir, "detail-by-repo.csv")}`);

  if (failedRepos.length > 0) {
    logStep(`실패 레포 ${failedRepos.length}개 -> ${errorsPath}`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(`[github-org-report] fatal: ${error.message}`);
  process.exit(1);
});
