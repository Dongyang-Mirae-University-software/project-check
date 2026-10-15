# SilverBridgeAiServer

- 경로: `/home/apps/SilverBridgeSky/SilverBridgeAiServer`
- 분류: AI 서버
- 점검 시각: 2026-10-15 19:58:23 KST

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

- 파일 개수: 2582
- 디렉토리 개수: 102
- 주요 폴더: app, data, docs, models, tests
- 주요 경로: app, app/core, app/database, app/models, app/prompts, app/routers, app/schemas, app/services, app/utils, models, models/new, models/new/backup, tests

## DB 사용 여부

- 사용 여부: 예
- 연결 추정 DB: PostgreSQL, SQLite
- 근거: docker-compose.yml 확인, requirements.txt 확인, .env 키 154개 확인, DB 관련 파일 4개 확인, 추정 DB: PostgreSQL, SQLite

## 실행 상태

- 상태: 실행 중
- 관련 포트: 1000, 1008, 1019, 1024, 1105, 1135, 1160, 1244, 1257, 1268, 1273, 1280, 2000, 5432, 6012, 6015, 6017, 6019, 10051, 10067, 10102, 10359, 10602, 10636, 10868, 10949, 10992, 11877, 11910, 11971, 12025, 12313, 12470, 12671, 12818, 12830, 12845, 13131, 13188, 13212, 13214, 13266, 13328, 13387, 13743, 13763, 14010, 14306, 14334, 14380, 14514, 14520, 14522, 14523, 14553, 15271, 15352, 20754, 41864, 52252, 54458, 56024, 60126
- 관련 Docker 컨테이너: silverbridge-ai-server
- 관련 PM2 프로세스: 확인 불가

## Git 커밋 현황

- 브랜치: main
- 총 커밋 수: 84
- 계정별 커밋 수:
  - gosky <lovesky00317@gmail.com>: 37
  - gosky <gosky@gosky.kr>: 14
  - skarndaudwls1 <skarndaudwls@gmail.com>: 14
  - namgung <skarndaudwls@gmail.com>: 11
- 최근 커밋: 95558ec / namgung <skarndaudwls@gmail.com> / Merge pull request #18 from Dongyang-Mirae-University-software/revert/live-decode-once

## 최근 수정 파일

- docs/chat-eval-set.md (2026-10-15 18:02:53 KST)
- app/prompts/medical_chat_prompts.py (2026-10-15 18:01:10 KST)
- app/services/chat_router_service.py (2026-10-15 18:01:10 KST)
- app/services/chat_service.py (2026-10-15 18:01:10 KST)
- app/services/medical_llm_service.py (2026-10-15 18:01:10 KST)
- tests/test_emergency_cases.py (2026-10-15 17:59:57 KST)
- data/collect/20261015/fall/near/132211466_ward_oZmI5T5tCbB52zdG_0.38.jpg (2026-10-15 13:22:11 KST)
- data/collect/20261015/fall/near/132211466_ward_oZmI5T5tCbB52zdG_0.38.json (2026-10-15 13:22:11 KST)

## 점검 결과 요약

- 분류: AI 서버
- 기술 추정: Python, FastAPI, Uvicorn, Pydantic, SQLAlchemy, PostgreSQL, PyTorch, Transformers, fastapi, Frontend, Backend, AI
- DB 사용 추정: PostgreSQL, SQLite
- 실행 상태: 실행 중
- Git 커밋 수: 84
- Git 상위 계정: gosky(37), gosky(14), skarndaudwls1(14)