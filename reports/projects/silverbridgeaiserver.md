# SilverBridgeAiServer

- 경로: `/home/apps/SilverBridgeSky/SilverBridgeAiServer`
- 분류: AI 서버
- 점검 시각: 2026-11-12 17:39:09 KST

## 추정 기술 스택

- Python
- FastAPI
- Uvicorn
- Pydantic
- SQLAlchemy
- PostgreSQL
- PyTorch
- Transformers
- Node.js
- fastapi
- express
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

- 파일 개수: 2587
- 디렉토리 개수: 96
- 주요 폴더: app, data, docs, models, scripts, tests, tools
- 주요 경로: app, app/core, app/data, app/database, app/models, app/prompts, app/routers, app/schemas, app/services, app/services/companion, app/services/companion/prompts, app/utils, models, models/companion, models/companion/face-detect, models/companion/face-emotion, models/companion/llm, models/companion/llm/exaone-3.5-2.4b, models/companion/llm/exaone-3.5-2.4b/assets, models/companion/llm/lora-mood-e900

## DB 사용 여부

- 사용 여부: 예
- 연결 추정 DB: PostgreSQL, SQLite
- 근거: docker-compose.yml 확인, requirements.txt 확인, .env 키 226개 확인, 추정 DB: PostgreSQL, SQLite

## 실행 상태

- 상태: 실행 중
- 관련 포트: 1000, 1800, 2000, 2048, 3599, 3600, 4096, 5432, 6012, 6015, 6017, 6019
- 관련 Docker 컨테이너: silverbridge-ai-server
- 관련 PM2 프로세스: 확인 불가

## Git 커밋 현황

- 브랜치: main
- 총 커밋 수: 710
- 계정별 커밋 수:
  - skarndaudwls1 <skarndaudwls@gmail.com>: 338
  - gosky <lovesky00317@gmail.com>: 37
  - Jaehe-he <hywuljh1@naver.com>: 30
  - gosky <gosky@gosky.kr>: 16
  - namgung <skarndaudwls@gmail.com>: 11
  - AI 말벗 담당 <ai-part@local>: 5
- 최근 커밋: 3025382 / namgung <skarndaudwls@gmail.com> / Merge pull request #275 from Dongyang-Mirae-University-software/fix/companion-stroke-keywords-avoided

## 최근 수정 파일

- data/companion_review.db (2026-11-12 16:47:26 KST)
- tests/test_companion_avoid_reply.py (2026-11-12 16:45:44 KST)
- tests/test_companion_stroke_keywords.py (2026-11-12 16:45:44 KST)
- app/routers/companion_router.py (2026-11-12 16:45:44 KST)
- app/services/companion/risk.py (2026-11-12 16:45:44 KST)
- docs/companion-team-status.md (2026-11-12 16:45:44 KST)
- docs/audits/2026-11-12-companion-avoid-reply-audit.md (2026-11-12 16:21:37 KST)
- app/services/companion/avoidance.py (2026-11-12 16:21:37 KST)

## 점검 결과 요약

- 분류: AI 서버
- 기술 추정: Python, FastAPI, Uvicorn, Pydantic, SQLAlchemy, PostgreSQL, PyTorch, Transformers, Node.js, fastapi, express, Frontend, Backend, AI
- DB 사용 추정: PostgreSQL, SQLite
- 실행 상태: 실행 중
- Git 커밋 수: 710
- Git 상위 계정: skarndaudwls1(338), gosky(37), Jaehe-he(30)