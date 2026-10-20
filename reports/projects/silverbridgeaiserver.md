# SilverBridgeAiServer

- 경로: `/home/apps/SilverBridgeSky/SilverBridgeAiServer`
- 분류: AI 서버
- 점검 시각: 2026-10-20 18:50:24 KST

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

- 파일 개수: 3655
- 디렉토리 개수: 130
- 주요 폴더: app, data, docs, models, tests
- 주요 경로: app, app/core, app/database, app/models, app/prompts, app/routers, app/schemas, app/services, app/utils, models, models/new, models/new/backup, tests

## DB 사용 여부

- 사용 여부: 예
- 연결 추정 DB: PostgreSQL, SQLite
- 근거: docker-compose.yml 확인, requirements.txt 확인, .env 키 167개 확인, DB 관련 파일 4개 확인, 추정 DB: PostgreSQL, SQLite

## 실행 상태

- 상태: 실행 중
- 관련 포트: 1000, 1008, 1024, 2000, 5432, 6012, 6015, 6017, 6019, 11502, 11740, 11901, 12121, 12345, 13527, 14496, 14844, 15457, 15916, 16315, 16755, 17278, 17313, 17359, 17821, 18016, 18065, 18257, 18349, 18612, 19064, 19091, 19185, 19191, 19260, 19597, 19880, 20129, 20228, 20249, 20646, 20897, 21206, 21242, 21395, 21413, 21725, 21735, 22332, 23454, 23534, 25101, 26090, 26575, 26837
- 관련 Docker 컨테이너: silverbridge-ai-server
- 관련 PM2 프로세스: 확인 불가

## Git 커밋 현황

- 브랜치: main
- 총 커밋 수: 97
- 계정별 커밋 수:
  - gosky <lovesky00317@gmail.com>: 37
  - skarndaudwls1 <skarndaudwls@gmail.com>: 19
  - gosky <gosky@gosky.kr>: 16
  - namgung <skarndaudwls@gmail.com>: 11
- 최근 커밋: 52483a8 / gosky <gosky@gosky.kr> / fix: 게임 API 키 요구를 서버 간 경로에만 적용 - GAME_REQUIRE_API_KEY 를 라우터 전체가 아니라 목록·시작·progress·activity 에만 적용 - iframe 과 그 안의 JS 가 키 없이 부르는 /embed·/state·/answer·/reset 은 항상 열어 게임 화면 401 방지 - 플래그를 요청 시점에 읽도록 바꿔 FE 프록시 전환 없이 켤 수 있게 함

## 최근 수정 파일

- .env (2026-10-20 13:55:38 KST)
- .env.example (2026-10-20 13:51:26 KST)
- tests/test_qa_followup_fixes.py (2026-10-20 13:50:28 KST)
- app/core/security.py (2026-10-20 13:50:24 KST)
- app/main.py (2026-10-20 13:50:24 KST)
- app/routers/game_router.py (2026-10-20 13:50:24 KST)
- data/postgres/pg_wal/000000010000000000000002 (2026-10-20 11:19:04 KST)
- data/postgres/global/pg_control (2026-10-20 11:19:00 KST)

## 점검 결과 요약

- 분류: AI 서버
- 기술 추정: Python, FastAPI, Uvicorn, Pydantic, SQLAlchemy, PostgreSQL, PyTorch, Transformers, fastapi, Frontend, Backend, AI
- DB 사용 추정: PostgreSQL, SQLite
- 실행 상태: 실행 중
- Git 커밋 수: 97
- Git 상위 계정: gosky(37), skarndaudwls1(19), gosky(16)