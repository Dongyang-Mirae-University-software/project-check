# SilverBridgeAiServer

- 경로: `/home/apps/SilverBridgeSky/SilverBridgeAiServer`
- 분류: AI 서버
- 점검 시각: 2026-11-08 14:31:06 KST

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

- 파일 개수: 2671
- 디렉토리 개수: 101
- 주요 폴더: app, data, docs, models, scripts, tests, tools
- 주요 경로: app, app/core, app/data, app/database, app/models, app/prompts, app/routers, app/schemas, app/services, app/services/companion, app/services/companion/prompts, app/utils, models, models/companion, models/companion/face-detect, models/companion/face-emotion, models/companion/llm, models/companion/llm/exaone-3.5-2.4b, models/companion/llm/exaone-3.5-2.4b/assets, models/companion/stt-sensevoice

## DB 사용 여부

- 사용 여부: 예
- 연결 추정 DB: PostgreSQL, SQLite
- 근거: docker-compose.yml 확인, requirements.txt 확인, .env 키 206개 확인, 추정 DB: PostgreSQL, SQLite

## 실행 상태

- 상태: 실행 중
- 관련 포트: 1000, 2000, 2048, 2300, 4096, 5432, 6012, 6015, 6017, 6019, 6583, 6612, 6637, 6667, 6707, 6846, 6900, 6901, 7103, 7269, 7417, 7422, 7494, 7642, 7673, 7754, 7870, 7901, 7920, 7924, 7983, 7995, 8284, 8386, 8437, 8856, 9468, 10204, 10695, 10729, 11098, 11476, 11482, 11532, 11583, 11822, 11905, 11922, 13216, 13527, 13695, 14069, 14947, 15473, 15674, 15799, 17271, 17529, 18014, 18260, 31418, 33909
- 관련 Docker 컨테이너: silverbridge-ai-server
- 관련 PM2 프로세스: 확인 불가

## Git 커밋 현황

- 브랜치: main
- 총 커밋 수: 501
- 계정별 커밋 수:
  - skarndaudwls1 <skarndaudwls@gmail.com>: 239
  - gosky <lovesky00317@gmail.com>: 37
  - Jaehe-he <hywuljh1@naver.com>: 24
  - gosky <gosky@gosky.kr>: 16
  - namgung <skarndaudwls@gmail.com>: 11
- 최근 커밋: 877a3d9 / namgung <skarndaudwls@gmail.com> / Merge pull request #187 from Dongyang-Mirae-University-software/fix/router-fallback-emergency

## 최근 수정 파일

- .env (2026-11-07 24:51:33 KST)
- app/services/chat_service.py (2026-11-06 18:13:16 KST)
- docs/eval-results/2026-11-06-router-fallback-emergency-audit.md (2026-11-06 18:13:16 KST)
- tests/test_router_fallback_emergency.py (2026-11-06 18:13:16 KST)
- app/services/chat_keywords.py (2026-11-06 18:13:16 KST)
- app/services/medical_llm_service.py (2026-11-06 17:24:05 KST)
- docs/eval-results/2026-11-06-quality-v5-audit.md (2026-11-06 17:24:05 KST)
- tests/test_chat_quality_holdout_v5.py (2026-11-06 17:24:05 KST)

## 점검 결과 요약

- 분류: AI 서버
- 기술 추정: Python, FastAPI, Uvicorn, Pydantic, SQLAlchemy, PostgreSQL, PyTorch, Transformers, Node.js, fastapi, express, Frontend, Backend, AI
- DB 사용 추정: PostgreSQL, SQLite
- 실행 상태: 실행 중
- Git 커밋 수: 501
- Git 상위 계정: skarndaudwls1(239), gosky(37), Jaehe-he(24)