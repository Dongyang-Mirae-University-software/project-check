const fs = require("fs");
const path = require("path");

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildBarChart(title, series, maxBars = 12) {
  const entries = Object.entries(series || {}).sort((a, b) => a[0].localeCompare(b[0], "en"));
  const visible = entries.slice(-maxBars);
  const maxValue = Math.max(...visible.map(([, value]) => value), 1);

  const bars = visible.map(([label, value]) => {
    const height = Math.max(8, Math.round((value / maxValue) * 120));
    return `
      <div class="bar-item">
        <div class="bar-value">${value}</div>
        <div class="bar" style="height:${height}px" title="${escapeHtml(label)}: ${value}"></div>
        <div class="bar-label">${escapeHtml(label)}</div>
      </div>
    `;
  }).join("");

  return `
    <div class="chart-block">
      <div class="chart-title">${escapeHtml(title)}</div>
      <div class="bar-chart">${bars || '<div class="empty-chart">데이터 없음</div>'}</div>
    </div>
  `;
}

function buildReportHtml(meta, aggregated) {
  const payload = {
    generatedAt: meta.generatedAt,
    org: meta.org,
    repoCount: meta.repoCount,
    failedRepos: meta.failedRepos,
    periods: Object.fromEntries(
      Object.entries(aggregated).map(([key, value]) => [key, value.summary]),
    ),
  };

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(meta.org)} 기여도 리포트</title>
  <style>
    :root {
      --bg: #f4f7fb;
      --card: #ffffff;
      --text: #1f2937;
      --muted: #6b7280;
      --line: #dbe3ee;
      --primary: #2563eb;
      --accent: #0ea5e9;
      --danger: #dc2626;
      --bot: #7c3aed;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Segoe UI", Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 24px;
    }
    .hero {
      background: linear-gradient(135deg, #1d4ed8, #0ea5e9);
      color: #fff;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 20px;
    }
    .hero h1 { margin: 0 0 8px; font-size: 28px; }
    .hero p { margin: 4px 0; opacity: 0.95; }
    .filters {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 20px;
    }
    .filters label {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 13px;
      color: var(--muted);
    }
    .filters input, .filters select {
      padding: 10px 12px;
      border: 1px solid var(--line);
      border-radius: 10px;
      font-size: 14px;
      background: #fff;
    }
    .stats-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 12px;
      margin-bottom: 20px;
    }
    .stat-box {
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 14px;
      padding: 16px;
    }
    .stat-box .label { color: var(--muted); font-size: 13px; }
    .stat-box .value { font-size: 28px; font-weight: 700; margin-top: 6px; }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 16px;
    }
    .card {
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 16px;
      padding: 18px;
      break-inside: avoid;
    }
    .card.bot { border-color: #d8b4fe; }
    .card-header {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: start;
      margin-bottom: 14px;
    }
    .card h2 {
      margin: 0;
      font-size: 20px;
      line-height: 1.3;
    }
    .card .email {
      color: var(--muted);
      font-size: 13px;
      margin-top: 4px;
      word-break: break-all;
    }
    .badge {
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 999px;
      background: #eff6ff;
      color: var(--primary);
      white-space: nowrap;
    }
    .badge.bot { background: #f3e8ff; color: var(--bot); }
    .metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 14px;
    }
    .metric {
      background: #f8fafc;
      border-radius: 12px;
      padding: 12px;
      text-align: center;
    }
    .metric .name {
      font-size: 12px;
      color: var(--muted);
      margin-bottom: 6px;
    }
    .metric .num {
      font-size: 22px;
      font-weight: 700;
    }
    .repos {
      font-size: 13px;
      color: var(--muted);
      margin-bottom: 12px;
      line-height: 1.5;
    }
    .chart-block { margin-top: 10px; }
    .chart-title {
      font-size: 13px;
      color: var(--muted);
      margin-bottom: 8px;
    }
    .bar-chart {
      display: flex;
      align-items: end;
      gap: 8px;
      min-height: 160px;
      overflow-x: auto;
      padding-bottom: 4px;
    }
    .bar-item {
      min-width: 54px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: end;
      gap: 6px;
    }
    .bar-value {
      font-size: 12px;
      font-weight: 700;
      color: var(--primary);
    }
    .bar {
      width: 28px;
      border-radius: 8px 8px 4px 4px;
      background: linear-gradient(180deg, var(--accent), var(--primary));
    }
    .bar-label {
      font-size: 10px;
      color: var(--muted);
      text-align: center;
      line-height: 1.2;
      max-width: 64px;
      word-break: break-all;
    }
    .empty, .empty-chart {
      color: var(--muted);
      padding: 24px;
      text-align: center;
    }
    .footer {
      margin-top: 24px;
      color: var(--muted);
      font-size: 13px;
    }
    .table-section {
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 20px;
      overflow-x: auto;
    }
    .table-section h2 {
      margin: 0 0 12px;
      font-size: 18px;
    }
    .author-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }
    .author-table th,
    .author-table td {
      border-bottom: 1px solid var(--line);
      padding: 10px 12px;
      text-align: left;
      white-space: nowrap;
    }
    .author-table th {
      background: #f8fafc;
      position: sticky;
      top: 0;
      cursor: pointer;
    }
    .author-table tr:hover {
      background: #f8fafc;
    }
    .author-table tr.selected {
      background: #eff6ff;
    }
    .author-table .num {
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
    .view-toggle {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
    }
    .view-toggle button {
      border: 1px solid var(--line);
      background: #fff;
      border-radius: 10px;
      padding: 8px 12px;
      cursor: pointer;
    }
    .view-toggle button.active {
      background: var(--primary);
      border-color: var(--primary);
      color: #fff;
    }
    @media print {
      body { background: #fff; }
      .filters { display: none; }
      .card { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="container">
    <section class="hero">
      <h1>${escapeHtml(meta.org)} 기여도 리포트</h1>
      <p>생성 시각: ${escapeHtml(meta.generatedAt)}</p>
      <p>분석 레포 수: ${meta.repoCount}개 / 실패: ${meta.failedRepos.length}개</p>
    </section>

    <section class="filters">
      <label>기간
        <select id="periodSelect">
          <option value="midterm">중간 평가 (2026-03-03 ~ 2026-04-28)</option>
          <option value="final">기말 평가 (2026-04-29 ~ 2026-06-16)</option>
        </select>
      </label>
      <label>계정 선택
        <select id="accountSelect">
          <option value="">전체 계정</option>
        </select>
      </label>
    </section>

    <section class="stats-row" id="summaryStats"></section>

    <section class="table-section" id="tableSection">
      <h2>전체 계정 요약</h2>
      <div class="view-toggle">
        <button type="button" id="viewTableBtn" class="active">전체 테이블</button>
        <button type="button" id="viewCardsBtn">계정 카드</button>
        <button type="button" id="viewBothBtn">테이블 + 카드</button>
      </div>
      <table class="author-table" id="authorTable">
        <thead>
          <tr>
            <th data-sort="authorName">이름</th>
            <th data-sort="authorEmail">이메일</th>
            <th data-sort="alias">alias</th>
            <th data-sort="commitCount">커밋</th>
            <th data-sort="addedLines">추가</th>
            <th data-sort="deletedLines">삭제</th>
            <th data-sort="acceptedDeletedLines">인정 삭제</th>
            <th data-sort="activeDays">작업일</th>
            <th data-sort="repositoriesContributed">레포 수</th>
          </tr>
        </thead>
        <tbody id="authorTableBody"></tbody>
      </table>
    </section>

    <section class="cards" id="cards"></section>
    <div class="footer">
      검증 명령: <code>git log --all --format="%an &lt;%ae&gt;" | sort | uniq -c | sort -nr</code>
    </div>
  </div>

  <script>
    const REPORT_DATA = ${JSON.stringify(payload)};

    const periodSelect = document.getElementById("periodSelect");
    const accountSelect = document.getElementById("accountSelect");
    const cardsEl = document.getElementById("cards");
    const summaryStatsEl = document.getElementById("summaryStats");
    const authorTableBody = document.getElementById("authorTableBody");
    const tableSection = document.getElementById("tableSection");
    const viewTableBtn = document.getElementById("viewTableBtn");
    const viewCardsBtn = document.getElementById("viewCardsBtn");
    const viewBothBtn = document.getElementById("viewBothBtn");
    let viewMode = "table";
    let tableSortKey = "commitCount";
    let tableSortAsc = false;

    function formatNumber(value) {
      return new Intl.NumberFormat("ko-KR").format(value || 0);
    }

    function buildBarChart(title, series, maxBars = 12) {
      const entries = Object.entries(series || {}).sort((a, b) => a[0].localeCompare(b[0]));
      const visible = entries.slice(-maxBars);
      const maxValue = Math.max(...visible.map(([, value]) => value), 1);
      const bars = visible.map(([label, value]) => {
        const height = Math.max(8, Math.round((value / maxValue) * 120));
        return \`
          <div class="bar-item">
            <div class="bar-value">\${value}</div>
            <div class="bar" style="height:\${height}px" title="\${label}: \${value}"></div>
            <div class="bar-label">\${label}</div>
          </div>
        \`;
      }).join("");
      return \`
        <div class="chart-block">
          <div class="chart-title">\${title}</div>
          <div class="bar-chart">\${bars || '<div class="empty-chart">데이터 없음</div>'}</div>
        </div>
      \`;
    }

    function renderSummary(authors) {
      const totals = authors.reduce((acc, author) => {
        acc.commitCount += author.commitCount;
        acc.addedLines += author.addedLines;
        acc.deletedLines += author.deletedLines;
        acc.activeDays += author.activeDays;
        return acc;
      }, { commitCount: 0, addedLines: 0, deletedLines: 0, activeDays: 0 });

      summaryStatsEl.innerHTML = [
        ["표시 계정", authors.length],
        ["총 커밋", totals.commitCount],
        ["총 추가 줄", totals.addedLines],
        ["총 삭제 줄", totals.deletedLines],
        ["총 작업일", totals.activeDays],
      ].map(([label, value]) => \`
        <div class="stat-box">
          <div class="label">\${label}</div>
          <div class="value">\${formatNumber(value)}</div>
        </div>
      \`).join("");
    }

    function getFilteredAuthors() {
      const period = periodSelect.value;
      const accountKey = accountSelect.value;
      let authors = [...(REPORT_DATA.periods[period] || [])];

      if (accountKey) {
        authors = authors.filter((author) => author.alias === accountKey);
      }

      return authors;
    }

    function updateAccountSelectOptions() {
      const period = periodSelect.value;
      const current = accountSelect.value;
      const authors = [...(REPORT_DATA.periods[period] || [])]
        .sort((a, b) => b.commitCount - a.commitCount || a.alias.localeCompare(b.alias, "ko"));

      accountSelect.innerHTML = '<option value="">전체 계정</option>' + authors.map((author) => \`
        <option value="\${author.alias}">\${author.authorName} (\${author.authorEmail}) - \${author.commitCount} commits</option>
      \`).join("");

      if (current && [...accountSelect.options].some((option) => option.value === current)) {
        accountSelect.value = current;
      }
    }

    function applyViewMode() {
      tableSection.style.display = (viewMode === "cards") ? "none" : "block";
      cardsEl.style.display = (viewMode === "table") ? "none" : "grid";
      viewTableBtn.classList.toggle("active", viewMode === "table");
      viewCardsBtn.classList.toggle("active", viewMode === "cards");
      viewBothBtn.classList.toggle("active", viewMode === "both");
    }

    function renderTable(authors) {
      const sorted = [...authors].sort((a, b) => {
        const av = a[tableSortKey];
        const bv = b[tableSortKey];
        if (typeof av === "number" && typeof bv === "number") {
          return tableSortAsc ? av - bv : bv - av;
        }
        return tableSortAsc
          ? String(av).localeCompare(String(bv), "ko")
          : String(bv).localeCompare(String(av), "ko");
      });

      authorTableBody.innerHTML = sorted.map((author) => \`
        <tr data-alias="\${author.alias}" class="\${accountSelect.value === author.alias ? "selected" : ""}">
          <td>\${author.authorName}</td>
          <td>\${author.authorEmail}</td>
          <td>\${author.alias}</td>
          <td class="num">\${formatNumber(author.commitCount)}</td>
          <td class="num">\${formatNumber(author.addedLines)}</td>
          <td class="num">\${formatNumber(author.deletedLines)}</td>
          <td class="num">\${formatNumber(author.acceptedDeletedLines)}</td>
          <td class="num">\${formatNumber(author.activeDays)}</td>
          <td class="num">\${formatNumber(author.repositoriesContributed)}</td>
        </tr>
      \`).join("");

      authorTableBody.querySelectorAll("tr").forEach((row) => {
        row.addEventListener("click", () => {
          accountSelect.value = row.dataset.alias;
          viewMode = "both";
          applyViewMode();
          renderAll();
          const card = cardsEl.querySelector(\`[data-alias="\${row.dataset.alias}"]\`);
          if (card) card.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }

    function renderAll() {
      updateAccountSelectOptions();
      let authors = getFilteredAuthors();
      authors.sort((a, b) => b.commitCount - a.commitCount || a.alias.localeCompare(b.alias, "ko"));
      renderSummary(authors);
      renderTable(authors);
      renderCards(authors);
    }

    function renderCards(authors) {
      if (authors.length === 0) {
        cardsEl.innerHTML = '<div class="empty">조건에 맞는 계정이 없습니다.</div>';
        return;
      }

      cardsEl.innerHTML = authors.map((author) => \`
        <article class="card" data-alias="\${author.alias}" id="card-\${encodeURIComponent(author.alias)}">
          <div class="card-header">
            <div>
              <h2>\${author.authorName}</h2>
              <div class="email">\${author.authorEmail}</div>
              <div class="email">alias: \${author.alias}</div>
            </div>
          </div>
          <div class="metrics">
            <div class="metric"><div class="name">커밋 수</div><div class="num">\${formatNumber(author.commitCount)}</div></div>
            <div class="metric"><div class="name">추가 줄</div><div class="num">\${formatNumber(author.addedLines)}</div></div>
            <div class="metric"><div class="name">삭제 줄</div><div class="num">\${formatNumber(author.deletedLines)}</div></div>
            <div class="metric"><div class="name">인정 삭제</div><div class="num">\${formatNumber(author.acceptedDeletedLines)}</div></div>
            <div class="metric"><div class="name">작업일</div><div class="num">\${formatNumber(author.activeDays)}</div></div>
            <div class="metric"><div class="name">레포 수</div><div class="num">\${formatNumber(author.repositoriesContributed)}</div></div>
          </div>
          <div class="repos">레포: \${(author.repositories || []).join(", ") || "-"}</div>
          \${buildBarChart("주차별 커밋 수", author.weeklyCommits)}
          \${buildBarChart("일자별 커밋 수", author.dailyCommits)}
        </article>
      \`).join("");
    }

    viewTableBtn.addEventListener("click", () => { viewMode = "table"; applyViewMode(); });
    viewCardsBtn.addEventListener("click", () => { viewMode = "cards"; applyViewMode(); });
    viewBothBtn.addEventListener("click", () => { viewMode = "both"; applyViewMode(); });

    document.querySelectorAll("#authorTable th[data-sort]").forEach((th) => {
      th.addEventListener("click", () => {
        const key = th.dataset.sort;
        if (tableSortKey === key) {
          tableSortAsc = !tableSortAsc;
        } else {
          tableSortKey = key;
          tableSortAsc = false;
        }
        renderAll();
      });
    });

    [periodSelect, accountSelect].forEach((el) => {
      el.addEventListener("input", renderAll);
      el.addEventListener("change", renderAll);
    });

    applyViewMode();
    renderAll();
  </script>
</body>
</html>`;
}

function writeReportHtml(outDir, meta, aggregated) {
  const html = buildReportHtml(meta, aggregated);
  fs.writeFileSync(path.join(outDir, "report.html"), html, "utf8");
}

module.exports = {
  writeReportHtml,
};
