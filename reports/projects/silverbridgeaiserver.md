# SilverBridgeAiServer

- 경로: `/home/apps/SilverBridgeSky/SilverBridgeAiServer`
- 분류: AI 서버
- 점검 시각: 2026-10-14 03:50:57 KST

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

- 파일 개수: 2159
- 디렉토리 개수: 83
- 주요 폴더: app, data, docs, models, tests
- 주요 경로: app, app/core, app/database, app/models, app/prompts, app/routers, app/schemas, app/services, app/utils, models, models/new, models/new/backup, tests

## DB 사용 여부

- 사용 여부: 예
- 연결 추정 DB: PostgreSQL, SQLite
- 근거: docker-compose.yml 확인, requirements.txt 확인, .env 키 154개 확인, DB 관련 파일 4개 확인, 추정 DB: PostgreSQL, SQLite

## 실행 상태

- 상태: 실행 중
- 관련 포트: 1000, 1008, 1024, 1069, 1153, 1224, 1254, 1271, 1280, 2000, 5432, 6012, 6015, 6017, 6019, 10125, 10274, 10400, 10963, 11414, 11571, 11685, 12389, 21283, 38260, 39702, 45285, 47060, 53908, 57296, 58807, 63444, 64612
- 관련 Docker 컨테이너: silverbridge-ai-server
- 관련 PM2 프로세스: 확인 불가

## Git 커밋 현황

- 브랜치: feature/chat-slot-lookahead
- 총 커밋 수: 80
- 계정별 커밋 수:
  - gosky <lovesky00317@gmail.com>: 37
  - gosky <gosky@gosky.kr>: 14
  - namgung <skarndaudwls@gmail.com>: 11
  - skarndaudwls1 <skarndaudwls@gmail.com>: 6
- 최근 커밋: 14664de / gosky <gosky@gosky.kr> / Merge remote-tracking branch 'origin/main' into feature/chat-slot-lookahead

## 최근 수정 파일

- app/services/fire_hold_tracker.py (2026-10-13 22:09:31 KST)
- app/services/stream_session_service.py (2026-10-13 22:09:31 KST)
- tests/test_fire_hold.py (2026-10-13 22:09:31 KST)
- app/core/config.py (2026-10-13 22:09:31 KST)
- data/collect/20261013/fire/near/220216511_ward_fmEXQiKTOT80p8wT_0.54.jpg (2026-10-13 22:02:16 KST)
- data/collect/20261013/fire/near/220216511_ward_fmEXQiKTOT80p8wT_0.54.json (2026-10-13 22:02:16 KST)
- data/collect/20261013/fire/near/220159069_ward_fmEXQiKTOT80p8wT_0.51.jpg (2026-10-13 22:01:59 KST)
- data/collect/20261013/fire/near/220159069_ward_fmEXQiKTOT80p8wT_0.51.json (2026-10-13 22:01:59 KST)

## 점검 결과 요약

- 분류: AI 서버
- 기술 추정: Python, FastAPI, Uvicorn, Pydantic, SQLAlchemy, PostgreSQL, PyTorch, Transformers, fastapi, Frontend, Backend, AI
- DB 사용 추정: PostgreSQL, SQLite
- 실행 상태: 실행 중
- Git 커밋 수: 80
- Git 상위 계정: gosky(37), gosky(14), namgung(11)