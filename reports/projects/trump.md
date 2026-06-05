# Trump

- 경로: `/home/apps/SilverBridgeSky/project-check/dmu-projects/Trump`
- 분류: 백엔드
- 점검 시각: 2026-06-05 14:27:32 KST

## 추정 기술 스택

- Node.js
- React
- Vue
- Vite
- Prisma
- Express
- Next.js
- express
- Frontend
- Backend

## 주요 파일

- package.json: 있음
- vite.config.js: 없음
- vite.config.ts: 없음
- vite.config.mjs: 없음
- vite.config.cjs: 없음
- next.config.js: 없음
- next.config.mjs: 없음
- next.config.ts: 있음
- requirements.txt: 없음
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

- 파일 개수: 81
- 디렉토리 개수: 37
- 주요 폴더: apps, ops
- 주요 경로: apps/api/prisma, apps/api/prisma/migrations, apps/api/prisma/migrations/20260508114449_init, apps/api/prisma/migrations/20260515120000_add_korean_display_fields, apps/api/prisma/migrations/20260519120000_add_weather_fields, apps/api/src, apps/api/src/plugins, apps/api/src/prisma, apps/api/src/queues, apps/api/src/routes, apps/api/src/scripts, apps/api/src/services, apps/api/src/utils, apps/api/src/workers, apps/web/app/admin, apps/web/app/articles, apps/web/app/articles/[id], apps/web/app/news, apps/web/app/news/[id], apps/web/app/vip

## DB 사용 여부

- 사용 여부: 예
- 연결 추정 DB: Redis, PostgreSQL
- 근거: docker-compose.yml 확인, package.json 확인, .env 키 18개 확인, 추정 DB: Redis, PostgreSQL

## 실행 상태

- 상태: 실행 중
- 관련 포트: 3000, 4000, 5000, 5432, 6379, 11001, 11002, 11004, 60000
- 관련 Docker 컨테이너: trump-pulse-web, trump-pulse-api, trump_news_server, trump-pulse-redis, trump-pulse-postgres
- 관련 PM2 프로세스: 확인 불가

## Git 커밋 현황

- 브랜치: main
- 총 커밋 수: 1
- 계정별 커밋 수:
  - gosky <gosky@gosky.kr>: 1
- 최근 커밋: ccc8793 / gosky <gosky@gosky.kr> / chore(deps): pnpm lockfile 업데이트

## 최근 수정 파일

- apps/news_server/src/articleExtractor.js (2026-06-05 14:22:46 KST)
- apps/news_server/src/config.js (2026-06-05 14:22:46 KST)
- apps/news_server/src/index.js (2026-06-05 14:22:46 KST)
- apps/news_server/src/newsStore.js (2026-06-05 14:22:46 KST)
- apps/news_server/src/rssCollector.js (2026-06-05 14:22:46 KST)
- apps/news_server/src/scheduler.js (2026-06-05 14:22:46 KST)
- apps/news_server/src/sources.js (2026-06-05 14:22:46 KST)
- apps/web/app/admin/page.tsx (2026-06-05 14:22:46 KST)

## 점검 결과 요약

- 분류: 백엔드
- 기술 추정: Node.js, React, Vue, Vite, Prisma, Express, Next.js, express, Frontend, Backend
- DB 사용 추정: Redis, PostgreSQL
- 실행 상태: 실행 중
- Git 커밋 수: 1
- Git 상위 계정: gosky(1)