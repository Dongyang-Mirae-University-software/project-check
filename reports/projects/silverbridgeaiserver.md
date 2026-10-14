# SilverBridgeAiServer

- 경로: `/home/apps/SilverBridgeSky/SilverBridgeAiServer`
- 분류: AI 서버
- 점검 시각: 2026-10-14 10:52:18 KST

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

- 파일 개수: 2213
- 디렉토리 개수: 89
- 주요 폴더: app, data, docs, models, tests
- 주요 경로: app, app/core, app/database, app/models, app/prompts, app/routers, app/schemas, app/services, app/utils, models, models/new, models/new/backup, tests

## DB 사용 여부

- 사용 여부: 예
- 연결 추정 DB: PostgreSQL, SQLite
- 근거: docker-compose.yml 확인, requirements.txt 확인, .env 키 154개 확인, DB 관련 파일 4개 확인, 추정 DB: PostgreSQL, SQLite

## 실행 상태

- 상태: 실행 중
- 관련 포트: 1000, 1008, 1024, 1039, 1069, 1134, 1254, 1280, 2000, 5432, 6012, 6015, 6017, 6019, 10285, 10458, 10559, 10628, 10774, 11277, 11414, 11571, 11685, 12183, 12389, 12631, 13647, 13651, 13840, 14370, 14393, 14449, 14770, 14934, 15128, 15288, 21283, 27622, 39702, 40842, 45285, 46433, 53908, 63029
- 관련 Docker 컨테이너: silverbridge-ai-server
- 관련 PM2 프로세스: 확인 불가

## Git 커밋 현황

- 브랜치: main
- 총 커밋 수: 79
- 계정별 커밋 수:
  - gosky <lovesky00317@gmail.com>: 37
  - gosky <gosky@gosky.kr>: 14
  - namgung <skarndaudwls@gmail.com>: 11
  - skarndaudwls1 <skarndaudwls@gmail.com>: 6
- 최근 커밋: 623a092 / namgung <skarndaudwls@gmail.com> / Merge pull request #16 from Dongyang-Mirae-University-software/feature/chat-slot-lookahead

## 최근 수정 파일

- app/services/reservation_intake.py (2026-10-14 10:00:02 KST)
- app/services/reservation_orchestrator.py (2026-10-14 10:00:02 KST)
- app/services/stream_session_service.py (2026-10-14 10:00:02 KST)
- requirements.txt (2026-10-14 10:00:02 KST)
- tests/test_chat_fixes.py (2026-10-14 10:00:02 KST)
- tests/test_chat_router.py (2026-10-14 10:00:02 KST)
- tests/test_fire_hold.py (2026-10-14 10:00:02 KST)
- tests/test_frame_quality.py (2026-10-14 10:00:02 KST)

## 점검 결과 요약

- 분류: AI 서버
- 기술 추정: Python, FastAPI, Uvicorn, Pydantic, SQLAlchemy, PostgreSQL, PyTorch, Transformers, fastapi, Frontend, Backend, AI
- DB 사용 추정: PostgreSQL, SQLite
- 실행 상태: 실행 중
- Git 커밋 수: 79
- Git 상위 계정: gosky(37), gosky(14), namgung(11)