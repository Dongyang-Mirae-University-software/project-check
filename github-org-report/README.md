# GitHub 조직 기여도 리포트

GitHub 조직의 Public/Private 레포를 한 번에 수집해, 계정별·중간/기말 평가 기간별 커밋/코드 변경량/작업일을 집계하는 CLI 도구입니다.

GitHub 웹 Contributors 그래프가 아니라 `gh` + `git log --numstat` 기준으로 직접 계산합니다.

## 요구 사항

- Ubuntu 서버
- Node.js 18+
- GitHub CLI (`gh`)
- git

## 설치

```bash
cd github-org-report
```

별도 npm 패키지 설치는 필요 없습니다.

## 실행

```bash
node github-org-report.js --org Dongyang-Mirae-University-software --out ./reports
```

또는 프로젝트 루트에서:

```bash
npm run org-report
```

### 주요 옵션

| 옵션 | 설명 |
|------|------|
| `--org <name>` | GitHub 조직명 |
| `--out <dir>` | 리포트 출력 디렉터리 |
| `--aliases <file>` | author alias JSON 경로 |
| `--exclude-merges` | merge commit 제외 |
| `--skip-clone` | clone/fetch 생략 |
| `--repos a,b,c` | 특정 레포만 분석 |

환경변수 `GITHUB_ORG`로 기본 조직명을 지정할 수 있습니다.

## 평가 기간

| 키 | 기간 |
|----|------|
| midterm | 2026-03-03 ~ 2026-04-28 (중간 평가) |
| final | 2026-04-29 ~ 2026-06-16 (기말 평가) |

## 집계 항목

- GitHub author name / email
- commit count
- added lines
- deleted lines
- accepted deleted lines = `min(deleted, floor(added * 0.2))`
- active days (커밋이 존재한 날짜 수)
- repositories contributed
- repo별 상세 내역

## 출력 파일

```
reports/
  repos/                  # clone/fetch 대상
  summary-midterm.csv
  summary-final.csv
  detail-by-repo.csv
  report.html
  errors.log
```

## aliases.json

같은 사람의 여러 이메일을 하나의 alias로 병합합니다.

```json
{
  "gosky": [
    "gosky <gosky@gosky.kr>",
    "gosky <lovesky00317@gmail.com>"
  ]
}
```

## HTML 리포트

`report.html`에서 다음을 지원합니다.

- 기간 선택: 중간 / 기말
- 계정 선택
- 계정별 제출용 카드 + 주차별/일자별 막대 그래프(Data Label 포함)

브라우저에서 열어 Google Forms 제출용 숫자를 확인하고 캡처할 수 있습니다.

## 검증 명령

레포별 author 분포 확인:

```bash
cd reports/repos/<repo-name>
git log --all --format="%an <%ae>" | sort | uniq -c | sort -nr
```

기간 필터 예시:

```bash
git log --all --since="2026-03-03" --until="2026-04-29" --format="%an <%ae>" | sort | uniq -c | sort -nr
```

numstat 확인:

```bash
git log --all --since="2026-03-03" --until="2026-04-29" --numstat --format="%H|%an|%ae|%aI"
```

## 주의사항

- GitHub Contributors 페이지 수치와 `git log` 수치는 다를 수 있습니다.
- GitHub 계정에 연결되지 않은 이메일 커밋도 `git log` 기준으로 포함합니다.
- bot / Copilot 계정은 패턴으로 구분합니다.
- 레포 하나가 실패해도 전체 작업은 계속되며 `errors.log`에 기록됩니다.
- private 레포 분석에는 `gh auth` 권한이 필요합니다.

## 파일 구조

```
github-org-report/
  github-org-report.js
  aliases.json
  lib/
    config.js
    shell.js
    repos.js
    git-log.js
    aggregate.js
    csv.js
    html.js
  README.md
```
