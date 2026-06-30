# ChatSilverBridge

- 경로: `/home/apps/SilverBridgeSky/ChatSilverBridge`
- 분류: AI 서버
- 점검 시각: 2026-06-30 12:07:08 KST

## 추정 기술 스택

- FastAPI
- Uvicorn
- Pydantic
- PyTorch
- Transformers
- Python
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
- Dockerfile: 없음
- docker-compose.yml: 없음
- docker-compose.yaml: 없음
- compose.yml: 없음
- compose.yaml: 없음
- .env.example: 있음
- .env: 있음
- pom.xml: 없음
- build.gradle: 없음
- build.gradle.kts: 없음

## 주요 폴더 구조

- 파일 개수: 30
- 디렉토리 개수: 11
- 주요 폴더: app, data, scripts, tests
- 주요 경로: app, app/core, app/db, app/models, app/routers, app/schemas, app/services, app/utils, tests

## DB 사용 여부

- 사용 여부: 아니오
- 연결 추정 DB: 확인 불가
- 근거: requirements.txt 확인, .env 키 42개 확인

## 실행 상태

- 상태: 실행 중
- 관련 포트: 8010, 8090
- 관련 Docker 컨테이너: chatsilverbridge-api-1, chatsilverbridge-mysql-1, chatsilverbridgetest-web-1
- 관련 PM2 프로세스: 확인 불가

## Git 커밋 현황

- 브랜치: main
- 총 커밋 수: 2
- 계정별 커밋 수:
  - gosky <lovesky00317@gmail.com>: 2
- 최근 커밋: 2a11a50 / gosky <lovesky00317@gmail.com> / Add environment file for private deployment.

## 최근 수정 파일

- app/schemas/chat.py (2026-06-15 16:30:07 KST)
- app/services/chat_service.py (2026-06-15 16:30:07 KST)
- requirements.txt (2026-06-15 16:30:07 KST)
- .env (2026-06-15 16:30:07 KST)
- .env.example (2026-06-15 16:30:07 KST)
- app/core/config.py (2026-06-15 16:30:07 KST)
- app/core/prompts.py (2026-06-15 16:30:07 KST)
- app/main.py (2026-06-15 16:30:07 KST)

## 점검 결과 요약

- 분류: AI 서버
- 기술 추정: FastAPI, Uvicorn, Pydantic, PyTorch, Transformers, Python, fastapi, Frontend, Backend, AI
- DB 사용 흔적 없음
- 실행 상태: 실행 중
- Git 커밋 수: 2
- Git 상위 계정: gosky(2)