# SilverBridgeAiServer

- 경로: `/home/apps/SilverBridgeSky/SilverBridgeAiServer`
- 분류: AI 서버
- 점검 시각: 2026-10-16 14:01:47 KST

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

- 파일 개수: 2650
- 디렉토리 개수: 108
- 주요 폴더: app, data, docs, models, tests
- 주요 경로: app, app/core, app/database, app/models, app/prompts, app/routers, app/schemas, app/services, app/utils, models, models/new, models/new/backup, tests

## DB 사용 여부

- 사용 여부: 예
- 연결 추정 DB: PostgreSQL, SQLite
- 근거: docker-compose.yml 확인, requirements.txt 확인, .env 키 156개 확인, DB 관련 파일 4개 확인, 추정 DB: PostgreSQL, SQLite

## 실행 상태

- 상태: 실행 중
- 관련 포트: 1000, 1008, 1019, 1024, 1135, 1160, 1219, 1222, 1271, 1273, 2000, 5432, 6012, 6015, 6017, 6019, 10150, 11380, 11477, 11535, 11565, 11630, 11786, 12027, 12467, 12530, 12707, 13062, 13188, 13255, 13266, 13375, 13387, 13494, 13743, 13763, 13847, 13890, 13900, 14010, 14255, 14306, 14334, 14380, 14436, 14514, 14520, 14522, 14523, 14553, 14568, 14814, 14824, 15230, 16177, 41864, 56862, 62927
- 관련 Docker 컨테이너: silverbridge-ai-server
- 관련 PM2 프로세스: 확인 불가

## Git 커밋 현황

- 브랜치: main
- 총 커밋 수: 88
- 계정별 커밋 수:
  - gosky <lovesky00317@gmail.com>: 37
  - skarndaudwls1 <skarndaudwls@gmail.com>: 16
  - gosky <gosky@gosky.kr>: 14
  - namgung <skarndaudwls@gmail.com>: 11
- 최근 커밋: 699de5f / namgung <skarndaudwls@gmail.com> / Merge pull request #20 from Dongyang-Mirae-University-software/feature/live-infer-quality-timing

## 최근 수정 파일

- app/services/stream_session_service.py (2026-10-16 13:54:22 KST)
- tests/test_frame_quality.py (2026-10-16 13:54:22 KST)
- data/collect/20261016/fire/near/135232369_ward_XMearkEqllaDvR81_0.42.jpg (2026-10-16 13:52:32 KST)
- data/collect/20261016/fire/near/135232369_ward_XMearkEqllaDvR81_0.42.json (2026-10-16 13:52:32 KST)
- data/collect/20261016/fall/near/135229602_ward_XMearkEqllaDvR81_0.24.jpg (2026-10-16 13:52:29 KST)
- data/collect/20261016/fall/near/135229602_ward_XMearkEqllaDvR81_0.24.json (2026-10-16 13:52:29 KST)
- data/collect/20261016/fire/near/134250588_ward_XMearkEqllaDvR81_0.47.jpg (2026-10-16 13:42:50 KST)
- data/collect/20261016/fire/near/134250588_ward_XMearkEqllaDvR81_0.47.json (2026-10-16 13:42:50 KST)

## 점검 결과 요약

- 분류: AI 서버
- 기술 추정: Python, FastAPI, Uvicorn, Pydantic, SQLAlchemy, PostgreSQL, PyTorch, Transformers, fastapi, Frontend, Backend, AI
- DB 사용 추정: PostgreSQL, SQLite
- 실행 상태: 실행 중
- Git 커밋 수: 88
- Git 상위 계정: gosky(37), skarndaudwls1(16), gosky(14)