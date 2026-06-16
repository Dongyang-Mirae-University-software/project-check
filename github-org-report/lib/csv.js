const fs = require("fs");
const path = require("path");

function csvEscape(value) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function writeCsv(filePath, headers, rows) {
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((header) => csvEscape(row[header])).join(","));
  }
  fs.writeFileSync(filePath, `${lines.join("\n")}\n`, "utf8");
}

function writeSummaryCsv(filePath, summaryRows) {
  writeCsv(filePath, [
    "period",
    "periodLabel",
    "alias",
    "authorName",
    "authorEmail",
    "identities",
    "commitCount",
    "addedLines",
    "deletedLines",
    "acceptedDeletedLines",
    "activeDays",
    "repositoriesContributed",
    "repositories",
    "isBot",
  ], summaryRows.map((row) => ({
    period: row.period,
    periodLabel: row.periodLabel,
    alias: row.alias,
    authorName: row.authorName,
    authorEmail: row.authorEmail,
    identities: row.identities.join("; "),
    commitCount: row.commitCount,
    addedLines: row.addedLines,
    deletedLines: row.deletedLines,
    acceptedDeletedLines: row.acceptedDeletedLines,
    activeDays: row.activeDays,
    repositoriesContributed: row.repositoriesContributed,
    repositories: row.repositories.join("; "),
    isBot: row.isBot ? "yes" : "no",
  })));
}

function writeDetailCsv(filePath, detailRows) {
  writeCsv(filePath, [
    "period",
    "periodLabel",
    "alias",
    "authorName",
    "authorEmail",
    "repo",
    "commitCount",
    "addedLines",
    "deletedLines",
    "acceptedDeletedLines",
    "activeDays",
    "isBot",
  ], detailRows);
}

function writeExports(outDir, aggregated) {
  const midterm = aggregated.midterm?.summary || [];
  const final = aggregated.final?.summary || [];
  const detailRows = [];

  for (const result of Object.values(aggregated)) {
    detailRows.push(...result.detailByRepo);
  }

  writeSummaryCsv(path.join(outDir, "summary-midterm.csv"), midterm);
  writeSummaryCsv(path.join(outDir, "summary-final.csv"), final);
  writeDetailCsv(path.join(outDir, "detail-by-repo.csv"), detailRows);
}

module.exports = {
  writeExports,
  writeCsv,
};
