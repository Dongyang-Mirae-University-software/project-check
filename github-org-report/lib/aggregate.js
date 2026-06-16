const fs = require("fs");
const { BOT_PATTERNS } = require("./config");

function normalizeIdentity(name, email) {
  const normalizedName = String(name || "").trim() || "unknown";
  const normalizedEmail = String(email || "").trim().toLowerCase() || "unknown";
  return {
    name: normalizedName,
    email: normalizedEmail,
    key: `${normalizedName} <${normalizedEmail}>`,
  };
}

function loadAliases(aliasesPath) {
  if (!fs.existsSync(aliasesPath)) {
    return { byKey: new Map(), byAlias: new Map() };
  }

  const raw = JSON.parse(fs.readFileSync(aliasesPath, "utf8"));
  const byKey = new Map();
  const byAlias = new Map();

  for (const [alias, identities] of Object.entries(raw)) {
    if (!Array.isArray(identities)) {
      continue;
    }
    for (const identity of identities) {
      const match = String(identity).match(/^(.+?)\s*<([^>]+)>$/);
      const name = match ? match[1].trim() : identity;
      const email = match ? match[2].trim().toLowerCase() : "unknown";
      const key = `${name} <${email}>`.toLowerCase();
      byKey.set(key, alias);
      byAlias.set(alias, alias);
    }
  }

  return { byKey, byAlias };
}

function resolveAlias(identity, aliasMaps) {
  const key = identity.key.toLowerCase();
  return aliasMaps.byKey.get(key) || identity.key;
}

function isBot(identity) {
  const target = `${identity.name} ${identity.email}`;
  return BOT_PATTERNS.some((pattern) => pattern.test(target));
}

function acceptedDeleted(added, deleted) {
  const cap = Math.floor(Math.max(added, 0) * 0.2);
  return Math.min(Math.max(deleted, 0), cap);
}

function toDateKey(isoDate) {
  if (!isoDate) {
    return "unknown";
  }
  return isoDate.slice(0, 10);
}

function toWeekKey(isoDate) {
  if (!isoDate) {
    return "unknown";
  }
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return "unknown";
  }

  const day = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const weekday = day.getUTCDay() || 7;
  day.setUTCDate(day.getUTCDate() + 4 - weekday);
  const yearStart = new Date(Date.UTC(day.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((day - yearStart) / 86400000) + 1) / 7);
  return `${day.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

function createAuthorBucket(alias, identity) {
  return {
    alias,
    authorName: identity.name,
    authorEmail: identity.email,
    identities: new Set([identity.key]),
    commitCount: 0,
    addedLines: 0,
    deletedLines: 0,
    acceptedDeletedLines: 0,
    activeDays: new Set(),
    activeWeeks: new Set(),
    dailyCommits: new Map(),
    weeklyCommits: new Map(),
    repositories: new Set(),
    repoDetails: new Map(),
    isBot: isBot(identity),
  };
}

function createRepoBucket(repoName) {
  return {
    repo: repoName,
    commitCount: 0,
    addedLines: 0,
    deletedLines: 0,
    acceptedDeletedLines: 0,
    activeDays: new Set(),
  };
}

function addCommitToBucket(bucket, commit, repoName) {
  bucket.commitCount += 1;
  bucket.addedLines += commit.added;
  bucket.deletedLines += commit.deleted;
  bucket.acceptedDeletedLines += acceptedDeleted(commit.added, commit.deleted);
  bucket.repositories.add(repoName);

  const day = toDateKey(commit.authorDate);
  const week = toWeekKey(commit.authorDate);
  bucket.activeDays.add(day);
  bucket.activeWeeks.add(week);
  bucket.dailyCommits.set(day, (bucket.dailyCommits.get(day) || 0) + 1);
  bucket.weeklyCommits.set(week, (bucket.weeklyCommits.get(week) || 0) + 1);

  if (!bucket.repoDetails.has(repoName)) {
    bucket.repoDetails.set(repoName, createRepoBucket(repoName));
  }
  const repoBucket = bucket.repoDetails.get(repoName);
  repoBucket.commitCount += 1;
  repoBucket.addedLines += commit.added;
  repoBucket.deletedLines += commit.deleted;
  repoBucket.acceptedDeletedLines += acceptedDeleted(commit.added, commit.deleted);
  repoBucket.activeDays.add(day);
}

function aggregatePeriod(periodKey, periodLabel, repoResults, aliasMaps) {
  const authors = new Map();
  const details = [];

  for (const repoResult of repoResults) {
    for (const commit of repoResult.commits) {
      const identity = normalizeIdentity(commit.authorName, commit.authorEmail);
      const alias = resolveAlias(identity, aliasMaps);

      if (!authors.has(alias)) {
        authors.set(alias, createAuthorBucket(alias, identity));
      }

      const bucket = authors.get(alias);
      bucket.identities.add(identity.key);
      if (!bucket.isBot) {
        bucket.isBot = isBot(identity);
      }
      addCommitToBucket(bucket, commit, repoResult.repo);

      details.push({
        period: periodKey,
        periodLabel,
        repo: repoResult.repo,
        authorName: identity.name,
        authorEmail: identity.email,
        alias,
        commitHash: commit.hash,
        commitDate: commit.authorDate,
        addedLines: commit.added,
        deletedLines: commit.deleted,
        acceptedDeletedLines: acceptedDeleted(commit.added, commit.deleted),
        isBot: isBot(identity),
      });
    }
  }

  const summary = [...authors.values()]
    .map((bucket) => ({
      period: periodKey,
      periodLabel,
      alias: bucket.alias,
      authorName: bucket.authorName,
      authorEmail: bucket.authorEmail,
      identities: [...bucket.identities].sort(),
      commitCount: bucket.commitCount,
      addedLines: bucket.addedLines,
      deletedLines: bucket.deletedLines,
      acceptedDeletedLines: bucket.acceptedDeletedLines,
      activeDays: bucket.activeDays.size,
      activeWeeks: bucket.activeWeeks.size,
      repositoriesContributed: bucket.repositories.size,
      repositories: [...bucket.repositories].sort(),
      isBot: bucket.isBot,
      dailyCommits: Object.fromEntries([...bucket.dailyCommits.entries()].sort()),
      weeklyCommits: Object.fromEntries([...bucket.weeklyCommits.entries()].sort()),
      repoDetails: [...bucket.repoDetails.values()].map((item) => ({
        repo: item.repo,
        commitCount: item.commitCount,
        addedLines: item.addedLines,
        deletedLines: item.deletedLines,
        acceptedDeletedLines: item.acceptedDeletedLines,
        activeDays: item.activeDays.size,
      })),
    }))
    .sort((a, b) => b.commitCount - a.commitCount || a.alias.localeCompare(b.alias, "ko"));

  const detailByRepo = buildDetailByRepo(summary, periodKey, periodLabel);

  return {
    periodKey,
    periodLabel,
    summary,
    detailByRepo,
    rawDetails: details,
  };
}

function buildDetailByRepo(summary, periodKey, periodLabel) {
  const rows = [];

  for (const author of summary) {
    for (const repo of author.repoDetails) {
      rows.push({
        period: periodKey,
        periodLabel,
        alias: author.alias,
        authorName: author.authorName,
        authorEmail: author.authorEmail,
        repo: repo.repo,
        commitCount: repo.commitCount,
        addedLines: repo.addedLines,
        deletedLines: repo.deletedLines,
        acceptedDeletedLines: repo.acceptedDeletedLines,
        activeDays: repo.activeDays,
        isBot: author.isBot ? "yes" : "no",
      });
    }
  }

  return rows.sort((a, b) => b.commitCount - a.commitCount || a.repo.localeCompare(b.repo, "en"));
}

function aggregateAll(periods, repoResultsByPeriod, aliasMaps) {
  const results = {};

  for (const period of periods) {
    const repoResults = repoResultsByPeriod.get(period.key) || [];
    results[period.key] = aggregatePeriod(period.key, period.label, repoResults, aliasMaps);
  }

  return results;
}

module.exports = {
  acceptedDeleted,
  aggregateAll,
  aggregatePeriod,
  loadAliases,
  normalizeIdentity,
  resolveAlias,
  isBot,
};
