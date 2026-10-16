# wt-collect-random

- 경로: `/home/apps/SilverBridgeSky/wt-collect-random`
- 분류: AI 서버
- 점검 시각: 2026-10-16 22:03:17 KST

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
- .env: 없음
- pom.xml: 없음
- build.gradle: 없음
- build.gradle.kts: 없음

## 주요 폴더 구조

- 파일 개수: 104
- 디렉토리 개수: 11
- 주요 폴더: app, docs, tests
- 주요 경로: app, app/core, app/database, app/models, app/prompts, app/routers, app/schemas, app/services, app/utils, tests

## DB 사용 여부

- 사용 여부: 예
- 연결 추정 DB: PostgreSQL, SQLite
- 근거: docker-compose.yml 확인, requirements.txt 확인, .env 키 89개 확인, DB 관련 파일 4개 확인, 추정 DB: PostgreSQL, SQLite

## 실행 상태

- 상태: 실행 중
- 관련 포트: 1000, 1008, 1024, 2000, 5432, 6012, 6015, 6017, 6019
- 관련 Docker 컨테이너: 확인 불가
- 관련 PM2 프로세스: 확인 불가

## Git 커밋 현황

- 브랜치: feature/collect-random-frames
- 총 커밋 수: 89
- 계정별 커밋 수:
  - gosky <lovesky00317@gmail.com>: 37
  - skarndaudwls1 <skarndaudwls@gmail.com>: 16
  - gosky <gosky@gosky.kr>: 15
  - namgung <skarndaudwls@gmail.com>: 11
- 최근 커밋: 31ba9b4 / gosky <gosky@gosky.kr> / feat: 수집 모드에 무작위 장면 저장(reason=random) 추가

## 최근 수정 파일

- .env.example (2026-10-16 16:19:24 KST)
- tests/test_training_sample_collector.py (2026-10-16 16:18:23 KST)
- app/services/training_sample_collector.py (2026-10-16 16:17:27 KST)
- app/core/config.py (2026-10-16 16:17:07 KST)
- app/services/stream_session_service.py (2026-10-16 16:17:07 KST)
- tests/test_clip_buffer.py (2026-10-16 16:16:29 KST)
- tests/test_clip_encoder.py (2026-10-16 16:16:29 KST)
- tests/test_clip_endpoint.py (2026-10-16 16:16:29 KST)

## 점검 결과 요약

- 분류: AI 서버
- 기술 추정: Python, FastAPI, Uvicorn, Pydantic, SQLAlchemy, PostgreSQL, PyTorch, Transformers, fastapi, Frontend, Backend, AI
- DB 사용 추정: PostgreSQL, SQLite
- 실행 상태: 실행 중
- Git 커밋 수: 89
- Git 상위 계정: gosky(37), skarndaudwls1(16), gosky(15)