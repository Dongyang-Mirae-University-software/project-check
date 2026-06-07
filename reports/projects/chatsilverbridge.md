# ChatSilverBridge

- 경로: `/home/apps/SilverBridgeSky/ChatSilverBridge`
- 분류: AI 서버
- 점검 시각: 2026-06-08 06:23:36 KST

## 추정 기술 스택

- Python
- FastAPI
- Uvicorn
- Pydantic
- SQLAlchemy
- MySQL
- PyTorch
- Transformers
- fastapi
- Frontend
- Backend
- AI

## 주요 파일

- package.json: 있음
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

- 파일 개수: 61
- 디렉토리 개수: 12
- 주요 폴더: app, data, docs, scripts, tests
- 주요 경로: app, app/core, app/db, app/models, app/routers, app/schemas, app/services, app/utils, tests

## DB 사용 여부

- 사용 여부: 예
- 연결 추정 DB: MySQL, SQLite
- 근거: docker-compose.yml 확인, requirements.txt 확인, package.json 확인, .env 키 55개 확인, 추정 DB: MySQL, SQLite

## 실행 상태

- 상태: 실행 중
- 관련 포트: 1012, 3306, 3307, 3600, 6012, 6015, 6516, 8010
- 관련 Docker 컨테이너: chatsilverbridge-api-1, chatsilverbridge-mysql-1, chatsilverbridgetest-web-1
- 관련 PM2 프로세스: 확인 불가

## Git 커밋 현황

- 브랜치: main
- 총 커밋 수: 2
- 계정별 커밋 수:
  - gosky <gosky@gosky.kr>: 2
- 최근 커밋: 78689bf / gosky <gosky@gosky.kr> / Add environment file for private deployment.

## 최근 수정 파일

- app/services/reservation_api_client.py (2026-05-26 11:28:34 KST)
- app/services/chat_orchestrator.py (2026-05-26 11:05:42 KST)
- tests/test_chat_orchestrator.py (2026-05-26 11:01:19 KST)
- tests/test_conversation_store.py (2026-05-26 10:04:09 KST)
- app/services/conversation_store.py (2026-05-26 10:03:50 KST)
- tests/test_reservation_intake.py (2026-05-26 10:01:38 KST)
- app/core/reservation_prompts.py (2026-05-26 10:01:17 KST)
- app/services/reservation_intake.py (2026-05-26 10:01:02 KST)

## 점검 결과 요약

- 분류: AI 서버
- 기술 추정: Python, FastAPI, Uvicorn, Pydantic, SQLAlchemy, MySQL, PyTorch, Transformers, fastapi, Frontend, Backend, AI
- DB 사용 추정: MySQL, SQLite
- 실행 상태: 실행 중
- Git 커밋 수: 2
- Git 상위 계정: gosky(2)