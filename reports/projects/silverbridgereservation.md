# SilverBridgeReservation

- 경로: `/home/apps/SilverBridgeSky/SilverBridgeReservation`
- 분류: 백엔드
- 점검 시각: 2026-10-27 12:53:22 KST

## 추정 기술 스택

- Node.js
- Prisma
- React
- Vue
- Vite
- nestjs
- NestJS
- Express
- express
- Frontend

## 주요 파일

- package.json: 있음
- vite.config.js: 없음
- vite.config.ts: 있음
- vite.config.mjs: 없음
- vite.config.cjs: 없음
- next.config.js: 없음
- next.config.mjs: 없음
- next.config.ts: 없음
- requirements.txt: 없음
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

- 파일 개수: 94
- 디렉토리 개수: 33
- 주요 폴더: admin-ui, docs, prisma, src, test, v8-compile-cache-0
- 주요 경로: admin-ui/src/pages, prisma, prisma/migrations, prisma/migrations/20260410002451_init, prisma/migrations/20260527114400_api_key_access, prisma/migrations/20261022120000_active_reservation_unique, prisma/migrations/20261027120000_active_slot_per_department, src, src/admin, src/admin/dto, src/auth, src/auth/decorators, src/auth/dto, src/auth/guards, src/auth/strategies, src/common, src/common/config, src/common/filters, src/common/utils, src/hospital

## DB 사용 여부

- 사용 여부: 예
- 연결 추정 DB: SQLite
- 근거: docker-compose.yml 확인, package.json 확인, .env 키 13개 확인, 추정 DB: SQLite

## 실행 상태

- 상태: 실행 중
- 관련 포트: 2026, 5173, 6015, 6017, 6018
- 관련 Docker 컨테이너: silverbridgereservation-reservation-api-1
- 관련 PM2 프로세스: 확인 불가

## Git 커밋 현황

- 브랜치: main
- 총 커밋 수: 60
- 계정별 커밋 수:
  - gosky <lovesky00317@gmail.com>: 53
  - skarndaudwls1 <skarndaudwls@gmail.com>: 4
- 최근 커밋: bc05f9b / namgung <skarndaudwls@gmail.com> / Merge pull request #3 from Dongyang-Mirae-University-software/fix/reservation-demo-label-r6

## 최근 수정 파일

- src/mcp/reservation-mcp.ts (2026-10-27 11:28:29 KST)
- src/reservation/reservation.service.ts (2026-10-27 11:28:29 KST)
- test/active-slot-unique.test.ts (2026-10-27 11:28:29 KST)
- test/department-slot-kst.test.ts (2026-10-27 11:28:29 KST)
- prisma/migrations/20261027120000_active_slot_per_department/migration.sql (2026-10-27 11:28:29 KST)
- prisma/schema.prisma (2026-10-27 11:28:29 KST)
- src/admin/admin.service.ts (2026-10-27 11:28:29 KST)
- src/common/active-slot-conflict.ts (2026-10-27 11:28:29 KST)

## 점검 결과 요약

- 분류: 백엔드
- 기술 추정: Node.js, Prisma, React, Vue, Vite, nestjs, NestJS, Express, express, Frontend
- DB 사용 추정: SQLite
- 실행 상태: 실행 중
- Git 커밋 수: 60
- Git 상위 계정: gosky(53), skarndaudwls1(4)