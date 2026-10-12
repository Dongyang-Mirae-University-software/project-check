# SilverBridgeAiServer

- 경로: `/home/apps/SilverBridgeSky/SilverBridgeAiServer`
- 분류: AI 서버
- 점검 시각: 2026-10-12 22:45:32 KST

## 추정 기술 스택

- Python
- FastAPI
- Uvicorn
- Pydantic
- SQLAlchemy
- PostgreSQL
- PyTorch
- Transformers
- fastapi
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

- 파일 개수: 1978
- 디렉토리 개수: 73
- 주요 폴더: app, data, docs, models, tests
- 주요 경로: app, app/core, app/database, app/models, app/prompts, app/routers, app/schemas, app/services, app/utils, models, models/new, models/new/backup, tests

## DB 사용 여부

- 사용 여부: 예
- 연결 추정 DB: PostgreSQL, SQLite
- 근거: docker-compose.yml 확인, requirements.txt 확인, .env 키 152개 확인, DB 관련 파일 4개 확인, 추정 DB: PostgreSQL, SQLite

## 실행 상태

- 상태: 실행 중
- 관련 포트: 1000, 1008, 1023, 1024, 1059, 1061, 1064, 1068, 1078, 1093, 1104, 1114, 1123, 1130, 1137, 1151, 1181, 1196, 1218, 1224, 1269, 1279, 1331, 1341, 1343, 1344, 1355, 1371, 1373, 1375, 1389, 1399, 1420, 1430, 1433, 1443, 1516, 1519, 1523, 1526, 1538, 1541, 1564, 1575, 1620, 1647, 1651, 1707, 1718, 1729, 1739, 1756, 1784, 1786, 1829, 1842, 1902, 1918, 1955, 1968, 1982, 1994, 2000, 2023, 2056, 2059, 2090, 2133, 2149, 2155, 2161, 2194, 2289, 2304, 2472, 2496, 2609, 2686, 2690, 5432, 6012, 6015, 6017, 6019, 14736, 15824, 15873, 15950, 16504, 16834, 17361, 17446, 18037, 18100, 18129, 18148, 19131, 19328, 19482, 19624, 19633, 19789, 20557, 44255, 56989
- 관련 Docker 컨테이너: silverbridge-ai-server
- 관련 PM2 프로세스: 확인 불가

## Git 커밋 현황

- 브랜치: feature/chat-slot-lookahead
- 총 커밋 수: 68
- 계정별 커밋 수:
  - gosky <lovesky00317@gmail.com>: 37
  - namgung <skarndaudwls@gmail.com>: 11
  - gosky <gosky@gosky.kr>: 8
  - skarndaudwls1 <skarndaudwls@gmail.com>: 4
- 최근 커밋: 276592a / gosky <gosky@gosky.kr> / Fix: 챗봇 예약 시나리오 한 세션 연속 실행 보완

## 최근 수정 파일

- data/postgres/pg_wal/000000010000000000000002 (2026-10-12 21:15:20 KST)
- data/postgres/global/pg_control (2026-10-12 21:15:19 KST)
- data/postgres/base/16384/32958 (2026-10-12 21:15:19 KST)
- data/postgres/base/16384/32957 (2026-10-12 21:15:19 KST)
- data/postgres/base/16384/32956 (2026-10-12 21:15:19 KST)
- data/postgres/base/16384/32955 (2026-10-12 21:15:19 KST)
- data/postgres/base/16384/32950 (2026-10-12 21:15:19 KST)
- data/postgres/base/16384/32948 (2026-10-12 21:15:19 KST)

## 점검 결과 요약

- 분류: AI 서버
- 기술 추정: Python, FastAPI, Uvicorn, Pydantic, SQLAlchemy, PostgreSQL, PyTorch, Transformers, fastapi, Frontend, Backend, AI
- DB 사용 추정: PostgreSQL, SQLite
- 실행 상태: 실행 중
- Git 커밋 수: 68
- Git 상위 계정: gosky(37), namgung(11), gosky(8)