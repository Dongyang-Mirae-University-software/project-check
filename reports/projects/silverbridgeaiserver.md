# SilverBridgeAiServer

- 경로: `/home/apps/SilverBridgeSky/SilverBridgeAiServer`
- 분류: AI 서버
- 점검 시각: 2026-10-15 12:57:07 KST

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

- 파일 개수: 2537
- 디렉토리 개수: 103
- 주요 폴더: app, data, docs, models, tests, tools
- 주요 경로: app, app/core, app/database, app/models, app/prompts, app/routers, app/schemas, app/services, app/utils, models, models/new, models/new/backup, tests

## DB 사용 여부

- 사용 여부: 예
- 연결 추정 DB: PostgreSQL, SQLite
- 근거: docker-compose.yml 확인, requirements.txt 확인, .env 키 154개 확인, DB 관련 파일 4개 확인, 추정 DB: PostgreSQL, SQLite

## 실행 상태

- 상태: 실행 중
- 관련 포트: 1000, 1004, 1008, 1024, 1105, 1244, 1257, 1268, 1280, 2000, 5432, 6012, 6015, 6017, 6019, 10041, 10051, 10067, 10102, 10602, 10636, 10868, 10949, 10992, 11090, 11877, 11910, 12025, 12470, 12671, 12818, 12830, 13131, 13212, 13214, 13328, 15271, 15352, 17274, 20261, 20754, 28277, 43072, 44064, 49001, 51107, 52252, 52595, 54458, 56024, 56289, 58980, 59474, 60126
- 관련 Docker 컨테이너: silverbridge-ai-server
- 관련 PM2 프로세스: 확인 불가

## Git 커밋 현황

- 브랜치: main
- 총 커밋 수: 82
- 계정별 커밋 수:
  - gosky <lovesky00317@gmail.com>: 37
  - gosky <gosky@gosky.kr>: 14
  - skarndaudwls1 <skarndaudwls@gmail.com>: 13
  - namgung <skarndaudwls@gmail.com>: 11
- 최근 커밋: a71db90 / namgung <skarndaudwls@gmail.com> / Merge pull request #17 from Dongyang-Mirae-University-software/feature/live-decode-once

## 최근 수정 파일

- .env (2026-10-15 12:50:47 KST)
- data/collect/20261015/fire/alert/111204528_ward_gsY4nXqjxJWfZcO2_0.56.jpg (2026-10-15 11:12:04 KST)
- data/collect/20261015/fire/alert/111204528_ward_gsY4nXqjxJWfZcO2_0.56.json (2026-10-15 11:12:04 KST)
- data/collect/20261015/fire/near/111156021_ward_gsY4nXqjxJWfZcO2_0.37.jpg (2026-10-15 11:11:56 KST)
- data/collect/20261015/fire/near/111156021_ward_gsY4nXqjxJWfZcO2_0.37.json (2026-10-15 11:11:56 KST)
- data/collect/20261015/fire/near/111145144_ward_gsY4nXqjxJWfZcO2_0.39.jpg (2026-10-15 11:11:45 KST)
- data/collect/20261015/fire/near/111145144_ward_gsY4nXqjxJWfZcO2_0.39.json (2026-10-15 11:11:45 KST)
- data/collect/20261015/fire/alert/111139172_ward_gsY4nXqjxJWfZcO2_0.62.jpg (2026-10-15 11:11:39 KST)

## 점검 결과 요약

- 분류: AI 서버
- 기술 추정: Python, FastAPI, Uvicorn, Pydantic, SQLAlchemy, PostgreSQL, PyTorch, Transformers, fastapi, Frontend, Backend, AI
- DB 사용 추정: PostgreSQL, SQLite
- 실행 상태: 실행 중
- Git 커밋 수: 82
- Git 상위 계정: gosky(37), gosky(14), skarndaudwls1(13)