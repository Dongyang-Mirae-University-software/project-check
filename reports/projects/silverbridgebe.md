# SilverBridgeBe

- 경로: `/home/apps/SilverBridgeSky/project-check/dmu-projects/SilverBridgeBe`
- 분류: 백엔드
- 점검 시각: 2026-06-05 14:26:46 KST

## 추정 기술 스택

- Java
- Spring
- Frontend
- Backend

## 주요 파일

- package.json: 없음
- vite.config.js: 없음
- vite.config.ts: 없음
- vite.config.mjs: 없음
- vite.config.cjs: 없음
- next.config.js: 없음
- next.config.mjs: 없음
- next.config.ts: 없음
- requirements.txt: 없음
- pyproject.toml: 없음
- Dockerfile: 있음
- docker-compose.yml: 없음
- docker-compose.yaml: 없음
- compose.yml: 없음
- compose.yaml: 없음
- .env.example: 없음
- .env: 없음
- pom.xml: 없음
- build.gradle: 있음
- build.gradle.kts: 없음

## 주요 폴더 구조

- 파일 개수: 64
- 디렉토리 개수: 25
- 주요 폴더: db, docs, gradle, src, tools
- 주요 경로: src, src/main, src/main/java, src/main/java/kr, src/main/java/kr/silverbridge, src/main/java/kr/silverbridge/main, src/main/java/kr/silverbridge/main/domain, src/main/java/kr/silverbridge/main/global, src/main/resources, src/main/resources/db, src/main/resources/db/migration, src/test, src/test/java, src/test/java/kr, src/test/java/kr/silverbridge, src/test/java/kr/silverbridge/main, src/test/java/kr/silverbridge/main/domain, src/test/java/kr/silverbridge/main/global

## DB 사용 여부

- 사용 여부: 예
- 연결 추정 DB: PostgreSQL, Redis
- 근거: docker-compose.yml 확인, application.yml 확인, 추정 DB: PostgreSQL, Redis

## 실행 상태

- 상태: 실행 중
- 관련 포트: 3000, 5173, 5432, 6379, 6511, 8080, 18000, 60480
- 관련 Docker 컨테이너: 확인 불가
- 관련 PM2 프로세스: 확인 불가

## Git 커밋 현황

- 브랜치: dev
- 총 커밋 수: 1
- 계정별 커밋 수:
  - namgung <skarndaudwls@gmail.com>: 1
- 최근 커밋: 66d9b68 / namgung <skarndaudwls@gmail.com> / Merge pull request #191 from Dongyang-Mirae-University-software/feature/connection-partner-full-profile

## 최근 수정 파일

- 프로젝트_설명.txt (2026-06-05 14:15:44 KST)
- tools/fcm-test/firebase-messaging-sw.js (2026-06-05 14:15:44 KST)
- tools/fcm-test/index.html (2026-06-05 14:15:44 KST)
- src/main/resources/db/migration/V1__init.sql (2026-06-05 14:15:44 KST)
- src/main/resources/db/migration/V10__add_address_to_users.sql (2026-06-05 14:15:44 KST)
- src/main/resources/db/migration/V11__add_missing_indexes_and_resize_hospital_user_id.sql (2026-06-05 14:15:44 KST)
- src/main/resources/db/migration/V12__add_withdraw_access_action.sql (2026-06-05 14:15:44 KST)
- src/main/resources/db/migration/V13__add_announcement_view_count.sql (2026-06-05 14:15:44 KST)

## 점검 결과 요약

- 분류: 백엔드
- 기술 추정: Java, Spring, Frontend, Backend
- DB 사용 추정: PostgreSQL, Redis
- 실행 상태: 실행 중
- Git 커밋 수: 1
- Git 상위 계정: namgung(1)