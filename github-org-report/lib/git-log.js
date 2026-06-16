const { run } = require("./shell");
const { gitUntilExclusive } = require("./config");

function parseNumstatLine(line) {
  const parts = line.split("\t");
  if (parts.length < 3) {
    return { added: 0, deleted: 0 };
  }

  const added = parts[0] === "-" ? 0 : Number.parseInt(parts[0], 10) || 0;
  const deleted = parts[1] === "-" ? 0 : Number.parseInt(parts[1], 10) || 0;
  return { added, deleted };
}

function parseGitLog(output) {
  const commits = [];
  let current = null;

  for (const rawLine of output.split("\n")) {
    const line = rawLine.trimEnd();
    if (!line) {
      continue;
    }

    if (line.startsWith("COMMIT|")) {
      if (current) {
        commits.push(current);
      }
      const [, hash, authorName, authorEmail, authorDate, subject] = line.split("|");
      current = {
        hash,
        authorName: (authorName || "").trim() || "unknown",
        authorEmail: (authorEmail || "").trim() || "unknown",
        authorDate: (authorDate || "").trim(),
        subject: subject || "",
        added: 0,
        deleted: 0,
      };
      continue;
    }

    if (!current) {
      continue;
    }

    const stats = parseNumstatLine(line);
    current.added += stats.added;
    current.deleted += stats.deleted;
  }

  if (current) {
    commits.push(current);
  }

  return commits;
}

function fetchRepoCommits(repoDir, period, excludeMerges) {
  const args = [
    "log",
    "--all",
    "--since",
    period.start,
    "--until",
    gitUntilExclusive(period.end),
    "--numstat",
    "--date=iso-strict",
    "--format=COMMIT|%H|%an|%ae|%aI|%s",
  ];

  if (excludeMerges) {
    args.push("--no-merges");
  }

  const result = run("git", args, { cwd: repoDir });
  return parseGitLog(result.stdout);
}

module.exports = {
  fetchRepoCommits,
  parseGitLog,
  parseNumstatLine,
};
