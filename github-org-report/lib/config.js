const path = require("path");

const DEFAULT_ORG = process.env.GITHUB_ORG || "Dongyang-Mirae-University-software";

const EVAL_PERIODS = {
  midterm: {
    key: "midterm",
    label: "중간 평가",
    start: "2026-03-03T00:00:00",
    end: "2026-04-28T23:59:59",
  },
  final: {
    key: "final",
    label: "기말 평가",
    start: "2026-04-29T00:00:00",
    end: "2026-06-16T23:59:59",
  },
};

const BOT_PATTERNS = [
  /\[bot\]/i,
  /-bot$/i,
  /^dependabot/i,
  /^renovate/i,
  /^github-actions/i,
  /^copilot/i,
];

function parseArgs(argv) {
  const options = {
    org: DEFAULT_ORG,
    out: path.resolve(process.cwd(), "reports"),
    aliases: path.resolve(__dirname, "..", "aliases.json"),
    excludeMerges: false,
    skipClone: false,
    repos: null,
    help: false,
  };

  const args = argv.slice(2);
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--org") {
      options.org = args[i + 1];
      i += 1;
    } else if (arg === "--out") {
      options.out = path.resolve(args[i + 1]);
      i += 1;
    } else if (arg === "--aliases") {
      options.aliases = path.resolve(args[i + 1]);
      i += 1;
    } else if (arg === "--exclude-merges") {
      options.excludeMerges = true;
    } else if (arg === "--skip-clone") {
      options.skipClone = true;
    } else if (arg === "--repos") {
      options.repos = args[i + 1].split(",").map((item) => item.trim()).filter(Boolean);
      i += 1;
    }
  }

  return options;
}

function printHelp() {
  console.log(`GitHub 조직 기여도 리포트 도구

사용법:
  node github-org-report.js [옵션]

옵션:
  --org <name>           GitHub 조직명 (기본: ${DEFAULT_ORG})
  --out <dir>            리포트 출력 디렉터리 (기본: ./reports)
  --aliases <file>       author alias JSON 경로
  --exclude-merges       merge commit 제외
  --skip-clone           clone/fetch 생략 (기존 repos/ 사용)
  --repos <a,b,c>        특정 레포만 분석
  -h, --help             도움말

환경변수:
  GITHUB_ORG             기본 조직명

출력:
  summary-midterm.csv
  summary-final.csv
  detail-by-repo.csv
  report.html
  errors.log
`);
}

function gitUntilExclusive(endIso) {
  const date = new Date(endIso);
  date.setUTCSeconds(date.getUTCSeconds() + 1);
  return date.toISOString();
}

function allPeriods() {
  return Object.values(EVAL_PERIODS);
}

module.exports = {
  DEFAULT_ORG,
  EVAL_PERIODS,
  BOT_PATTERNS,
  parseArgs,
  printHelp,
  gitUntilExclusive,
  allPeriods,
};
