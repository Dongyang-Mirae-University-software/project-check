# 데이터베이스 상태

- 스캔 시각: 2026-06-05 14:26:46 KST

| 프로젝트 | DB 사용 여부 | 추정 DB | 실행 상태 | 관련 포트 | 관련 컨테이너 |
| --- | --- | --- | --- | --- | --- |
| AiSilverBridgeSky | 아니오 | 확인 불가 | 확인 불가 | 3099, 4306, 4747, 8000, 14122 | 확인 불가 |
| ChatSilverBridge | 아니오 | 확인 불가 | 실행 중 | 8010, 8090 | chatsilverbridge-api-1, chatsilverbridge-mysql-1, chatsilverbridgetest-web-1 |
| ChatSilverBridgeTest | 아니오 | 확인 불가 | 실행 중 | 8010 | chatsilverbridgetest-web-1 |
| Playground | 아니오 | 확인 불가 | 확인 불가 | 확인 불가 | 확인 불가 |
| project-check | 아니오 | 확인 불가 | 실행 중 | 2026, 3307, 6012, 6015, 6516, 11000, 11001, 11002, 11003, 11004, 26465, 59905 | 확인 불가 |
| SilverBridgeAi | 아니오 | 확인 불가 | 실행 중 | 1000, 1234, 1280, 1500, 2026, 2700, 8080, 8456 | silverbridge-ai-server |
| SilverBridgeAiServer | 예 | PostgreSQL, SQLite | 실행 중 | 1008, 5432, 6012, 6015, 6017, 6019 | silverbridge-ai-server |
| SilverBridgeBe | 예 | PostgreSQL, Redis | 실행 중 | 3000, 5173, 5432, 6379, 6511, 8080, 18000, 60480 | 확인 불가 |
| SilverBridgeFe | 아니오 | 확인 불가 | 실행 중 | 3000, 5000, 6000, 60480, 60836 | 확인 불가 |
| SilverBridgeReservation | 예 | SQLite | 실행 중 | 5173, 6015, 6017, 6018 | silverbridgereservation-reservation-api-1 |
| SilverBridgeSky | 예 | PostgreSQL, Redis | 실행 중 | 3000, 5432, 6379, 6501, 8000, 8080 | 확인 불가 |
| SilverBridgeSSOBe | 예 | MySQL, Redis | 실행 중 | 3306, 6379, 6501, 18000, 60480 | 확인 불가 |
| SilverBridgeSSOFe | 아니오 | 확인 불가 | 확인 불가 | 확인 불가 | 확인 불가 |
| SilverBridgeStreamTestFe | 아니오 | 확인 불가 | 실행 중 | 1012, 6018 | 확인 불가 |
| Trump | 예 | Redis, PostgreSQL | 실행 중 | 3000, 4000, 5000, 5432, 6379, 11001, 11002, 11004, 60000 | trump-pulse-web, trump-pulse-api, trump_news_server, trump-pulse-redis, trump-pulse-postgres |
| VisionX-DMU | 아니오 | 확인 불가 | 정지 | 확인 불가 | 확인 불가 |
| WhitehouseFE | 아니오 | 확인 불가 | 정지 | 1280, 3000 | 확인 불가 |

## 점검 메모

- AiSilverBridgeSky: DB 사용 흔적 없음
  - 근거: requirements.txt 확인, .env 키 26개 확인
- ChatSilverBridge: DB 사용 흔적 없음
  - 근거: requirements.txt 확인, .env 키 42개 확인
- ChatSilverBridgeTest: DB 사용 흔적 없음
  - 근거: package.json 확인
- Playground: DB 사용 흔적 없음
- project-check: DB 사용 흔적 없음
- SilverBridgeAi: DB 사용 흔적 없음
  - 근거: requirements.txt 확인, .env 키 8개 확인
- SilverBridgeAiServer: PostgreSQL, SQLite 사용 추정
  - 근거: docker-compose.yml 확인, requirements.txt 확인, .env 키 48개 확인, DB 관련 파일 3개 확인, 추정 DB: PostgreSQL, SQLite
- SilverBridgeBe: PostgreSQL, Redis 사용 추정
  - 근거: docker-compose.yml 확인, application.yml 확인, 추정 DB: PostgreSQL, Redis
- SilverBridgeFe: DB 사용 흔적 없음
  - 근거: docker-compose.yml 확인, package.json 확인
- SilverBridgeReservation: SQLite 사용 추정
  - 근거: docker-compose.yml 확인, package.json 확인, .env 키 8개 확인, 추정 DB: SQLite
- SilverBridgeSky: PostgreSQL, Redis 사용 추정
  - 근거: docker-compose.yml 확인, package.json 확인, 추정 DB: PostgreSQL, Redis
- SilverBridgeSSOBe: MySQL, Redis 사용 추정
  - 근거: docker-compose.yml 확인, application.yml 확인, 추정 DB: MySQL, Redis
- SilverBridgeSSOFe: DB 사용 흔적 없음
- SilverBridgeStreamTestFe: DB 사용 흔적 없음
  - 근거: docker-compose.yml 확인, package.json 확인, .env 키 6개 확인
- Trump: Redis, PostgreSQL 사용 추정
  - 근거: docker-compose.yml 확인, package.json 확인, .env 키 18개 확인, 추정 DB: Redis, PostgreSQL
- VisionX-DMU: DB 사용 흔적 없음
  - 근거: requirements.txt 확인
- WhitehouseFE: DB 사용 흔적 없음
  - 근거: docker-compose.yml 확인, package.json 확인