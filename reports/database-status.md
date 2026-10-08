# 데이터베이스 상태

- 스캔 시각: 2026-10-09 01:59:06 KST

| 프로젝트 | DB 사용 여부 | 추정 DB | 실행 상태 | 관련 포트 | 관련 컨테이너 |
| --- | --- | --- | --- | --- | --- |
| AiSilverBridgeSky | 아니오 | 확인 불가 | 정지 | 1280, 3099, 4306, 4747, 8000, 14122 | 확인 불가 |
| CharacterAi | 아니오 | 확인 불가 | 정지 | 확인 불가 | 확인 불가 |
| ChatSilverBridge | 아니오 | 확인 불가 | 실행 중 | 8010, 8090 | chatsilverbridge-api-1, chatsilverbridge-mysql-1, chatsilverbridgetest-web-1 |
| ChatSilverBridgeTest | 아니오 | 확인 불가 | 실행 중 | 8010 | chatsilverbridgetest-web-1 |
| docs | 아니오 | 확인 불가 | 확인 불가 | 확인 불가 | 확인 불가 |
| project-check | 예 | MySQL, PostgreSQL, MongoDB, Redis, SQLite, MSSQL, Oracle | 실행 중 | 1000, 1024, 1234, 1280, 1400, 1433, 1500, 1521, 2026, 2700, 3306, 5432, 6379, 8080, 8456, 26214, 27017 | 확인 불가 |
| SilverBridgeAi | 아니오 | 확인 불가 | 실행 중 | 1000, 1234, 1280, 1500, 2026, 2700, 8080, 8456 | silverbridge-ai-server |
| SilverBridgeAiServer | 예 | PostgreSQL, SQLite | 실행 중 | 1000, 1008, 1023, 1024, 1061, 1068, 1093, 1104, 1130, 1137, 1218, 1224, 1279, 1331, 1344, 1371, 1389, 1398, 1399, 1420, 1430, 1433, 1516, 1519, 1523, 1526, 1564, 1575, 1620, 1647, 1651, 1707, 1718, 1729, 1739, 1756, 1784, 1786, 1829, 1842, 1902, 1918, 1955, 1968, 1981, 1982, 1994, 2000, 2023, 2056, 2059, 2090, 2133, 2149, 2155, 2161, 2194, 2289, 2304, 2472, 2496, 2609, 2686, 2690, 5432, 6012, 6015, 6017, 6019, 44255, 44275, 56989 | silverbridge-ai-server |
| SilverBridgeBe | 예 | PostgreSQL, Redis | 실행 중 | 1024, 1536, 2000, 3000, 5173, 5432, 6379, 6510, 6511, 6513, 6514, 8080, 10000, 10485, 18000, 60480 | 확인 불가 |
| SilverBridgeFe | 아니오 | 확인 불가 | 실행 중 | 1900, 3000, 4000, 6000, 6510, 8000, 60480, 60836 | 확인 불가 |
| SilverBridgeJH | 아니오 | 확인 불가 | 정지 | 확인 불가 | 확인 불가 |
| SilverBridgeReservation | 예 | SQLite | 실행 중 | 5173, 6015, 6017, 6018 | silverbridgereservation-reservation-api-1 |
| SilverBridgeSky | 예 | PostgreSQL, Redis | 실행 중 | 3000, 5432, 6379, 6501, 8000, 8080 | 확인 불가 |
| SilverBridgeSSOBe | 예 | MySQL, Redis | 실행 중 | 3306, 6379, 6501, 18000, 60480 | 확인 불가 |
| SilverBridgeStreamTestFe | 아니오 | 확인 불가 | 실행 중 | 1012, 6018 | 확인 불가 |
| TestSilverBridge | 아니오 | 확인 불가 | 확인 불가 | 확인 불가 | 확인 불가 |
| WhitehouseBE | 예 | PostgreSQL | 실행 중 | 5432, 6701, 7084 | whitehousebe-api-1, whitehousebe-db-1 |
| WhiteHouseBELJH | 예 | PostgreSQL | 실행 중 | 3000, 3001, 5432, 5433, 6700, 6701, 6705, 9090, 10000, 18000 | 확인 불가 |
| WhitehouseFE | 아니오 | 확인 불가 | 실행 중 | 1024, 1280, 2026, 3000 | whitehousefe-web |
| xai-credit-scoring_sky | 아니오 | 확인 불가 | 확인 불가 | 확인 불가 | 확인 불가 |

## 점검 메모

- AiSilverBridgeSky: DB 사용 흔적 없음
  - 근거: requirements.txt 확인, .env 키 55개 확인
- CharacterAi: DB 사용 흔적 없음
  - 근거: package.json 확인
- ChatSilverBridge: DB 사용 흔적 없음
  - 근거: requirements.txt 확인, .env 키 42개 확인
- ChatSilverBridgeTest: DB 사용 흔적 없음
  - 근거: package.json 확인
- docs: DB 사용 흔적 없음
- project-check: MySQL, PostgreSQL, MongoDB, Redis, SQLite, MSSQL, Oracle 사용 추정
  - 근거: requirements.txt 확인, package.json 확인, .env 키 8개 확인, 추정 DB: MySQL, PostgreSQL, MongoDB, Redis, SQLite, MSSQL, Oracle
- SilverBridgeAi: DB 사용 흔적 없음
  - 근거: requirements.txt 확인, .env 키 8개 확인
- SilverBridgeAiServer: PostgreSQL, SQLite 사용 추정
  - 근거: docker-compose.yml 확인, requirements.txt 확인, .env 키 152개 확인, DB 관련 파일 4개 확인, 추정 DB: PostgreSQL, SQLite
- SilverBridgeBe: PostgreSQL, Redis 사용 추정
  - 근거: docker-compose.yml 확인, application.yml 확인, 추정 DB: PostgreSQL, Redis
- SilverBridgeFe: DB 사용 흔적 없음
  - 근거: docker-compose.yml 확인, package.json 확인, .env 키 16개 확인
- SilverBridgeJH: DB 사용 흔적 없음
- SilverBridgeReservation: SQLite 사용 추정
  - 근거: docker-compose.yml 확인, package.json 확인, .env 키 13개 확인, 추정 DB: SQLite
- SilverBridgeSky: PostgreSQL, Redis 사용 추정
  - 근거: docker-compose.yml 확인, package.json 확인, .env 키 1개 확인, 추정 DB: PostgreSQL, Redis
- SilverBridgeSSOBe: MySQL, Redis 사용 추정
  - 근거: docker-compose.yml 확인, application.yml 확인, 추정 DB: MySQL, Redis
- SilverBridgeStreamTestFe: DB 사용 흔적 없음
  - 근거: docker-compose.yml 확인, package.json 확인, .env 키 11개 확인
- TestSilverBridge: DB 사용 흔적 없음
- WhitehouseBE: PostgreSQL 사용 추정
  - 근거: docker-compose.yml 확인, application.yml 확인, 추정 DB: PostgreSQL
- WhiteHouseBELJH: PostgreSQL 사용 추정
  - 근거: docker-compose.yml 확인, application.yml 확인, .env 키 3개 확인, 추정 DB: PostgreSQL
- WhitehouseFE: DB 사용 흔적 없음
  - 근거: docker-compose.yml 확인, package.json 확인
- xai-credit-scoring_sky: DB 사용 흔적 없음