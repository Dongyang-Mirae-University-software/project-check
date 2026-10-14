# SilverBridgeAiServer

- 경로: `/home/apps/SilverBridgeSky/SilverBridgeAiServer`
- 분류: AI 서버
- 점검 시각: 2026-10-14 21:24:12 KST

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

- 파일 개수: 2472
- 디렉토리 개수: 93
- 주요 폴더: app, data, docs, models, tests
- 주요 경로: app, app/core, app/database, app/models, app/prompts, app/routers, app/schemas, app/services, app/utils, models, models/new, models/new/backup, tests

## DB 사용 여부

- 사용 여부: 예
- 연결 추정 DB: PostgreSQL, SQLite
- 근거: docker-compose.yml 확인, requirements.txt 확인, .env 키 154개 확인, DB 관련 파일 4개 확인, 추정 DB: PostgreSQL, SQLite

## 실행 상태

- 상태: 실행 중
- 관련 포트: 1000, 1004, 1008, 1024, 1027, 1030, 1042, 1048, 1052, 1053, 1054, 1055, 1056, 2000, 5432, 6012, 6015, 6017, 6019, 10041, 11090, 28277, 43072, 44064, 49001, 51107, 52595, 56289, 58980, 59474, 62737, 62971, 64782, 65304, 65525
- 관련 Docker 컨테이너: silverbridge-ai-server
- 관련 PM2 프로세스: 확인 불가

## Git 커밋 현황

- 브랜치: main
- 총 커밋 수: 79
- 계정별 커밋 수:
  - gosky <lovesky00317@gmail.com>: 37
  - gosky <gosky@gosky.kr>: 14
  - namgung <skarndaudwls@gmail.com>: 11
  - skarndaudwls1 <skarndaudwls@gmail.com>: 7
- 최근 커밋: 623a092 / namgung <skarndaudwls@gmail.com> / Merge pull request #16 from Dongyang-Mirae-University-software/feature/chat-slot-lookahead

## 최근 수정 파일

- data/collect/20261014/fire/near/175256779_ward_0HX4WEegDu4LY5ZB_0.56.jpg (2026-10-14 17:52:56 KST)
- data/collect/20261014/fire/near/175256779_ward_0HX4WEegDu4LY5ZB_0.56.json (2026-10-14 17:52:56 KST)
- data/collect/20261014/fire/near/174844216_ward_E7saz8z8gXGCKWlS_0.59.jpg (2026-10-14 17:48:44 KST)
- data/collect/20261014/fire/near/174844216_ward_E7saz8z8gXGCKWlS_0.59.json (2026-10-14 17:48:44 KST)
- data/collect/20261014/fire/near/174834191_ward_E7saz8z8gXGCKWlS_0.73.jpg (2026-10-14 17:48:34 KST)
- data/collect/20261014/fire/near/174834191_ward_E7saz8z8gXGCKWlS_0.73.json (2026-10-14 17:48:34 KST)
- data/collect/20261014/knife/alert/174745852_ward_UlwUJUiUWT6skWW0_0.43.jpg (2026-10-14 17:47:45 KST)
- data/collect/20261014/knife/alert/174745852_ward_UlwUJUiUWT6skWW0_0.43.json (2026-10-14 17:47:45 KST)

## 점검 결과 요약

- 분류: AI 서버
- 기술 추정: Python, FastAPI, Uvicorn, Pydantic, SQLAlchemy, PostgreSQL, PyTorch, Transformers, fastapi, Frontend, Backend, AI
- DB 사용 추정: PostgreSQL, SQLite
- 실행 상태: 실행 중
- Git 커밋 수: 79
- Git 상위 계정: gosky(37), gosky(14), namgung(11)