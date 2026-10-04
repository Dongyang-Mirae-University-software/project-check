# SilverBridgeAiServer

- 경로: `/home/apps/SilverBridgeSky/SilverBridgeAiServer`
- 분류: AI 서버
- 점검 시각: 2026-10-04 15:40:09 KST

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

- 파일 개수: 1464
- 디렉토리 개수: 51
- 주요 폴더: app, data, docs, models, tests
- 주요 경로: app, app/core, app/database, app/models, app/prompts, app/routers, app/schemas, app/services, app/utils, models, tests

## DB 사용 여부

- 사용 여부: 예
- 연결 추정 DB: PostgreSQL, SQLite
- 근거: docker-compose.yml 확인, requirements.txt 확인, .env 키 112개 확인, DB 관련 파일 3개 확인, 추정 DB: PostgreSQL, SQLite

## 실행 상태

- 상태: 실행 중
- 관련 포트: 1000, 1008, 5432, 6012, 6015, 6017, 6019
- 관련 Docker 컨테이너: silverbridge-ai-server
- 관련 PM2 프로세스: 확인 불가

## Git 커밋 현황

- 브랜치: main
- 총 커밋 수: 45
- 계정별 커밋 수:
  - gosky <lovesky00317@gmail.com>: 37
  - gosky <gosky@gosky.kr>: 5
  - namgung <skarndaudwls@gmail.com>: 3
- 최근 커밋: ae64cad / namgung <skarndaudwls@gmail.com> / fix: 프레임 수신의 YOLO 추론을 이벤트 루프 밖 전용 스레드로 이동

## 최근 수정 파일

- app/routers/live_stream_router.py (2026-10-04 15:03:43 KST)
- app/services/stream_session_service.py (2026-10-04 15:03:43 KST)
- tests/test_stream_analysis_offload.py (2026-10-04 15:03:43 KST)
- .env.example (2026-10-04 01:39:43 KST)
- app/core/config.py (2026-10-04 01:39:43 KST)
- app/routers/health_router.py (2026-10-04 01:39:43 KST)
- app/schemas/clip_schema.py (2026-10-04 01:39:43 KST)
- app/services/clip_buffer.py (2026-10-04 01:39:43 KST)

## 점검 결과 요약

- 분류: AI 서버
- 기술 추정: Python, FastAPI, Uvicorn, Pydantic, SQLAlchemy, PostgreSQL, PyTorch, Transformers, fastapi, Frontend, Backend, AI
- DB 사용 추정: PostgreSQL, SQLite
- 실행 상태: 실행 중
- Git 커밋 수: 45
- Git 상위 계정: gosky(37), gosky(5), namgung(3)