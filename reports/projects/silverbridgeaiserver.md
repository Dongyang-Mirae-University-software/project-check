# SilverBridgeAiServer

- 경로: `/home/apps/SilverBridgeSky/SilverBridgeAiServer`
- 분류: AI 서버
- 점검 시각: 2026-11-05 06:42:05 KST

## 추정 기술 스택

- Python
- FastAPI
- Uvicorn
- Pydantic
- SQLAlchemy
- PostgreSQL
- PyTorch
- Transformers
- Node.js
- fastapi
- express
- Frontend
- Backend
- AI

## 주요 파일

- package.json: 없음
- vite.config.js: 없음
- vite.config.ts: 없음
- vite.config.mjs: 없음
- vite.config.cjs: 없음
- next.config.js: 없음
- next.config.mjs: 없음
- next.config.ts: 없음
- requirements.txt: 있음
- pyproject.toml: 없음
- Dockerfile: 있음
- docker-compose.yml: 있음
- docker-compose.yaml: 없음
- compose.yml: 없음
- compose.yaml: 없음
- .env.example: 있음
- .env: 있음
- pom.xml: 없음
- build.gradle: 없음
- build.gradle.kts: 없음

## 주요 폴더 구조

- 파일 개수: 2597
- 디렉토리 개수: 83
- 주요 폴더: app, data, docs, models, scripts, tests, tools
- 주요 경로: app, app/core, app/data, app/database, app/models, app/prompts, app/routers, app/schemas, app/services, app/services/companion, app/services/companion/prompts, app/utils, models, models/new, models/new/backup, tests, tests/eval

## DB 사용 여부

- 사용 여부: 예
- 연결 추정 DB: PostgreSQL, SQLite
- 근거: docker-compose.yml 확인, requirements.txt 확인, .env 키 206개 확인, 추정 DB: PostgreSQL, SQLite

## 실행 상태

- 상태: 실행 중
- 관련 포트: 1000, 2048, 2300, 4096, 5432, 6012, 6015, 6017, 6019, 6667, 6707, 7673, 7920, 8386, 8856, 10204, 10695, 11476, 11482, 11583, 11922, 13216, 13527, 14947, 15473, 17271, 17529, 18014, 18260, 33909, 36627, 37625, 38539, 39188, 39328, 39390, 39446, 39696, 40124, 40312, 40489, 40665, 40776, 41480, 41758, 42932, 43626, 58309, 61464
- 관련 Docker 컨테이너: silverbridge-ai-server
- 관련 PM2 프로세스: 확인 불가

## Git 커밋 현황

- 브랜치: main
- 총 커밋 수: 474
- 계정별 커밋 수:
  - skarndaudwls1 <skarndaudwls@gmail.com>: 222
  - gosky <lovesky00317@gmail.com>: 37
  - Jaehe-he <hywuljh1@naver.com>: 24
  - gosky <gosky@gosky.kr>: 16
  - namgung <skarndaudwls@gmail.com>: 11
- 최근 커밋: 4e6cb92 / namgung <skarndaudwls@gmail.com> / Merge pull request #177 from Dongyang-Mirae-University-software/feat/companion-ai-main

## 최근 수정 파일

- .env (2026-11-04 23:02:59 KST)
- docs/companion-data-handoff.md (2026-11-04 22:52:19 KST)
- docs/companion-team-status.md (2026-11-04 22:52:19 KST)
- docs/eval-results/2026-11-02-stt-cer-sensevoice.json (2026-11-04 22:52:19 KST)
- docs/eval-results/2026-11-02-stt-cer.json (2026-11-04 22:52:19 KST)
- docs/eval-results/2026-11-02-text-emotion-453-dialogue.json (2026-11-04 22:52:19 KST)
- docs/eval-results/2026-11-02-text-emotion-453.json (2026-11-04 22:52:19 KST)
- docs/eval-results/2026-11-04-quality-v4.json (2026-11-04 22:52:19 KST)

## 점검 결과 요약

- 분류: AI 서버
- 기술 추정: Python, FastAPI, Uvicorn, Pydantic, SQLAlchemy, PostgreSQL, PyTorch, Transformers, Node.js, fastapi, express, Frontend, Backend, AI
- DB 사용 추정: PostgreSQL, SQLite
- 실행 상태: 실행 중
- Git 커밋 수: 474
- Git 상위 계정: skarndaudwls1(222), gosky(37), Jaehe-he(24)