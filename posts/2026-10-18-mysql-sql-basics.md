---
title: "[MySQL] SQL 기초 총정리 — SELECT·JOIN부터 인덱스·트랜잭션까지"
date: 2026-10-18
section: Study Notes
module: Module 2
categories: [MySQL, Database]
tags: [mysql, sql, select, join, subquery, ddl, dml, view, index, transaction]
---

> 데이터를 꺼내 보는 `SELECT`부터, 테이블을 만들고 고치는 DDL·DML, 여러 테이블을 잇는 `JOIN`과 서브쿼리,
> 그리고 실무에서 꼭 마주치는 **VIEW·INDEX·TRANSACTION**까지 MySQL 수업에서 배운 내용을 예제 쿼리와 함께 정리합니다.

---

## 0. 한눈에 보기

| 분류 | 의미 | 명령어 |
|---|---|---|
| DQL | 조회 | `SELECT` |
| DDL | 정의어 (구조) | `CREATE`, `ALTER`, `DROP`, `TRUNCATE` |
| DML | 조작어 (데이터) | `INSERT`, `UPDATE`, `DELETE` |
| TCL | 트랜잭션 제어 | `START TRANSACTION`, `COMMIT`, `ROLLBACK` |

SELECT문의 논리적 실행 순서 — 작성 순서와 다르다.

```
FROM → (JOIN) → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

이 순서를 알면 "WHERE는 그룹화 전, HAVING은 그룹화 후"라는 차이가 자연스럽게 이해된다.

---

## 1. SELECT — 조회

SQL의 90% 이상을 차지하는 가장 기본 명령어. 핵심 질문은 두 가지다.

1. 어떤 열(컬럼)을 가져올 것인가? → 정보의 종류 → `SELECT`
2. 어떤 행을 가져올 것인가? → 정보의 범위 → `WHERE`

```sql
SELECT menu_name             -- 무엇을? (컬럼)
FROM   tbl_menu;             -- 어디에서? (테이블)

SELECT menu_code, category_code, menu_price
FROM   tbl_menu;

SELECT * FROM tbl_menu;      -- * (애스터리스크) = 모든 컬럼
```

### 별칭(Alias) — `AS`

```sql
SELECT menu_name  AS '메뉴 이름',
       menu_price AS 가격          -- 공백 없으면 따옴표 생략 가능
FROM   tbl_menu;
```

### 기본 함수

```sql
SELECT NOW();                  -- 현재 날짜·시간
SELECT CONCAT('조', '평훈');    -- 문자열 합치기
SELECT YEAR(created_at) FROM users;  -- 날짜에서 연도 추출
```

---

## 2. ORDER BY — 정렬

결과 집합을 특정 열이나 값 기준으로 정렬한다.

- `ASC` : 오름차순 (기본값)
- `DESC` : 내림차순

```sql
SELECT menu_code, menu_name, menu_price
FROM   tbl_menu
ORDER BY menu_price DESC;
```

### 연산 결과 + 별칭으로 정렬

```sql
SELECT menu_code,
       menu_price,
       menu_code * menu_price AS `연산결과`
FROM   tbl_menu
ORDER BY `연산결과` DESC;
```

> ⚠️ ORDER BY에서 별칭을 쓸 때는 백틱(`` ` ``)을 사용한다. 작은따옴표 `'연산결과'`는 문자열 상수로 인식돼 정렬이 되지 않는다.

### NULL 정렬

- 오름차순 정렬 시 `NULL`은 맨 위에 온다.
- `컬럼 IS NULL`은 NULL이면 1, 아니면 0이 되므로 이를 정렬 키로 쓰면 NULL을 뒤로 보낼 수 있다.

```sql
-- NULL은 맨 뒤로, 나머지는 오름차순
SELECT *
FROM   tbl_category
ORDER BY ref_category_code IS NULL ASC,
         ref_category_code ASC;
```

---

## 3. WHERE — 조건절

어떤 행을 가져올지 기술한다.

```sql
SELECT menu_name, menu_price, orderable_status
FROM   tbl_menu
WHERE  orderable_status = 'Y';
```

### 비교 연산자

| 연산자 | 의미 |
|---|---|
| `=` | 같다 |
| `!=`, `<>` | 같지 않다 |
| `>`, `<`, `>=`, `<=` | 크다 / 작다 / 이상 / 이하 |
| `LIKE` | 특정 패턴을 포함 |
| `IN` | 목록의 값 중 하나와 일치 |
| `BETWEEN a AND b` | a 이상 b 이하 범위 (양 끝 포함) |
| `NOT` | 부정 (`NOT LIKE`, `NOT IN`, `NOT BETWEEN`) |
| `IS NULL` / `IS NOT NULL` | NULL 여부 |

### AND / OR

- `AND` : 모든 조건을 만족해야 함
- `OR` : 조건 중 하나라도 만족하면 됨

```sql
-- 10000 이상 20000 미만
WHERE menu_price >= 10000 AND menu_price < 20000;

-- 판매상태 Y 이거나 카테고리 10
WHERE orderable_status = 'Y' OR category_code = 10;
```

> ⚠️ `AND`가 `OR`보다 우선순위가 높다.
>
> ```sql
> -- (J2 AND 급여 200만 이상) OR J7  → J7은 급여 상관없이 전부 나옴
> WHERE job_code = 'J2' AND salary >= 2000000 OR job_code = 'J7';
>
> -- (J2 또는 J7) AND 급여 200만 이상  → 의도대로
> WHERE job_code IN ('J2', 'J7') AND salary >= 2000000;
> ```
> 헷갈리면 괄호 `( )`로 묶는다.

### BETWEEN

```sql
WHERE menu_price BETWEEN 10000 AND 20000;
WHERE menu_price NOT BETWEEN 10000 AND 20000;
```

### LIKE — 패턴 검색

| 패턴 | 의미 |
|---|---|
| `'단어%'` | 단어로 시작 |
| `'%단어'` | 단어로 끝남 |
| `'%단어%'` | 단어를 포함 |
| `_` | 정확히 한 글자 |

```sql
WHERE menu_name LIKE '흑마늘%';   -- 흑마늘로 시작
WHERE emp_name  LIKE '%하%';      -- '하' 포함
WHERE phone     LIKE '___9%';     -- 네 번째 자리가 9
WHERE emp_name  NOT LIKE '이%';   -- 이씨가 아닌 사람
```

### IN

```sql
WHERE category_code IN (4, 5, 6);
WHERE category_code NOT IN (4, 5, 6);
```

### NULL 처리

NULL은 값이 아니라 "비어 있는 공간"이다. 그래서 `=`로 비교할 수 없다.

```sql
WHERE ref_category_code = NULL;       -- ❌ 결과 없음
WHERE ref_category_code IS NULL;      -- ✅
WHERE ref_category_code IS NOT NULL;  -- ✅
```

---

## 4. DISTINCT — 중복 제거

중복된 값이 존재하는 컬럼 앞에 작성한다.

```sql
SELECT DISTINCT category_code
FROM   tbl_menu
ORDER BY category_code;
```

---

## 5. LIMIT — 개수 제한

수백만 건을 한 번에 조회하면 시스템에 큰 부하가 생긴다. `LIMIT`은 '상위 5개만', '1페이지에 10개만' 같은 웹 앱 페이징 구현에 필수다.

```sql
LIMIT [offset,] row_count
```

- `offset` : 시작할 행 번호 (0부터 시작)
- `row_count` : 가져올 행 개수

```sql
SELECT *
FROM   tbl_menu
ORDER BY menu_price DESC
LIMIT 1, 5;     -- 2번째 행부터 5개 (가장 비싼 메뉴 1개를 건너뜀)
```

---

## 6. 그룹화 — 집계 함수, GROUP BY, HAVING

"총 사용자 수는?", "신고를 가장 많이 당한 사람은?" 같은 통계 질문에 쓴다.

### 집계 함수

| 함수 | 역할 |
|---|---|
| `COUNT(컬럼)` | 데이터 개수 (NULL 제외). `COUNT(*)`는 NULL 포함 전체 행 수 |
| `SUM(컬럼)` | 합계 |
| `AVG(컬럼)` | 평균 |
| `MAX(컬럼)` | 최댓값 |
| `MIN(컬럼)` | 최솟값 |

```sql
SELECT COUNT(*) AS '총 사용자 수' FROM users;

-- 중복 없이 세기
SELECT COUNT(DISTINCT author_id) AS '과정 등록 교육자 수' FROM courses;

SELECT SUM(score) AS '총점', AVG(score) AS '평균' FROM grades;
```

### 에러 케이스 — 일반 컬럼 + 집계 함수

```sql
SELECT name, COUNT(*) FROM users;   -- ❌
```

집계 결과는 1행인데 `name`은 여러 행이다. 어떤 `name`을 `COUNT(*)`와 짝지어야 할지 알 수 없어 에러가 난다. (MySQL 5.7+ 기본 설정 `ONLY_FULL_GROUP_BY`) → GROUP BY가 필요하다.

### GROUP BY

특정 컬럼 기준으로 그룹을 묶고, 각 그룹마다 집계 함수를 적용한다.

```sql
-- 상태별 사용자 수
SELECT status, COUNT(*) AS '사용자 수'
FROM   users
GROUP BY status;

-- 교육자별 개설 강좌 수
SELECT author_id AS '교육자 번호', COUNT(*) AS '개설 강좌 수'
FROM   courses
GROUP BY author_id;
```

### HAVING

WHERE처럼 조건을 거는 절이지만 시점이 다르다.

| | WHERE | HAVING |
|---|---|---|
| 시점 | 그룹화 **전** 필터링 | 그룹화 **후** 필터링 |
| 흐름 | 필터링 → 그룹화 | 그룹화 → 필터링 |
| 집계 함수 사용 | 불가 | 가능 |

```sql
-- 개설 강좌 3개 이상인 교육자
SELECT author_id AS '교육자 번호', COUNT(*) AS '개설 강좌 수'
FROM   courses
GROUP BY author_id
HAVING COUNT(*) >= 3;

-- WHERE + GROUP BY + HAVING 함께
-- 'completed' 상태 중 2명 이상 등록한 과정
SELECT course_id, COUNT(*) AS '학생 수'
FROM   enrollments
WHERE  status = 'completed'      -- 1) 행 필터링
GROUP BY course_id               -- 2) 그룹화
HAVING COUNT(*) >= 2;            -- 3) 그룹 필터링
```

---

## 7. JOIN ⭐ (매우 중요)

실제 DB는 비슷한 의미의 데이터가 여러 테이블에 분리 저장된다. JOIN은 테이블들이 공통으로 가진 값을 기준으로 합쳐 하나의 결과 집합을 만드는 것이다.

### 외래키(FK)와 연결

```sql
DESC courses;   -- 테이블 구조 확인
DESC users;
```

`courses.author_id`는 `users.user_id`를 가져온 값이다. 이를 외래키(FK)라고 하며, 두 테이블을 연결하는 다리 역할을 한다.

```sql
SELECT c.title AS '과정 제목',
       u.name  AS '교육자 이름'
FROM   courses AS c
JOIN   users   AS u ON c.author_id = u.user_id;
```

- 테이블에도 별칭을 붙일 수 있다 (`AS` 생략 가능).
- `ON`에 연결 조건을 쓴다.
- `JOIN`만 쓰면 `INNER JOIN`이다.

### JOIN의 종류

| 종류 | 설명 |
|---|---|
| `INNER JOIN` | 양쪽 모두 일치하는 행만 |
| `LEFT JOIN` | 왼쪽 테이블 기준, 오른쪽에 없으면 NULL로 채움 |
| `RIGHT JOIN` | 오른쪽 테이블 기준, 왼쪽에 없으면 NULL로 채움 |
| `SELF JOIN` | 같은 테이블을 자기 자신과 조인 |
| `OUTER JOIN` | LEFT/RIGHT를 포함하는 외부 조인의 총칭 (MySQL은 FULL OUTER JOIN 미지원 → LEFT + RIGHT를 UNION) |

```sql
-- 소셜 로그인 연동 안 한 사용자도 전부 출력 (provider는 NULL)
SELECT u.name AS '사용자 이름', uap.provider AS '소셜 로그인 제공자'
FROM   users AS u
LEFT JOIN user_auth_providers AS uap ON u.user_id = uap.user_id;

-- 소셜 로그인 테이블 기준
SELECT u.name, uap.provider
FROM   users AS u
RIGHT JOIN user_auth_providers AS uap ON u.user_id = uap.user_id;
```

### 3개 테이블 JOIN + WHERE

```sql
SELECT e.emp_name, d.dept_title, l.local_name
FROM   tbl_employee   e
JOIN   tbl_department d ON e.dept_code   = d.dept_id
JOIN   tbl_location   l ON d.location_id = l.local_code
WHERE  l.local_name = 'ASIA1';
```

---

## 8. 서브쿼리 (Subquery)

쿼리문 안의 또 다른 쿼리. 문제의 조건이 한 번에 주어지지 않을 때 2개 이상의 쿼리를 하나로 조합한다.

```sql
USE wanted_lms;   -- 사용할 데이터베이스 선택
```

### WHERE 절 서브쿼리

"'홍길동'과 같은 해에 가입한 사용자"
1. 홍길동의 가입 연도 구하기
2. 그 연도에 가입한 사용자 조회

```sql
SELECT name, created_at
FROM   users
WHERE  YEAR(created_at) = (
           SELECT YEAR(created_at)
           FROM   users
           WHERE  name = '홍길동'
       );
```

### FROM 절 서브쿼리 (인라인 뷰)

SELECT 결과를 하나의 **가상 테이블**처럼 사용한다. 반드시 별칭이 필요하다.

```sql
SELECT u.name         AS '교육자 이름',
       aut.course_count AS '교육자 개설 과정 수'
FROM   users u
JOIN  (
        SELECT author_id, COUNT(*) AS course_count
        FROM   courses
        GROUP BY author_id
      ) AS aut ON u.user_id = aut.author_id
ORDER BY `교육자 개설 과정 수` DESC;
```

---

## 9. DDL — 데이터 정의어

테이블을 정의·수정하는 언어. 테이블을 만드는 것은 칸을 나누는 일이 아니라, **데이터가 지켜야 할 규칙을 정의해 DB가 스스로 품질을 유지하게 만드는 설계**다. 핵심 요소는 데이터 타입과 제약 조건이다.

### 데이터 타입 — 왜 필요한가?

각 열에 들어갈 수 있는 데이터 종류를 강제한다. '나이' 열에 '스무살' 같은 글자를 원천 차단해 데이터 오염을 막고, 종류에 맞는 최적 공간만 써서 저장 효율을 높인다.

| 타입 | 용도 |
|---|---|
| `INT` / `BIGINT` | 정수 (user_id 등) |
| `VARCHAR(n)` | 최대 n글자 가변 길이 문자열 (≈ Java `String`) |
| `TEXT` | 매우 긴 텍스트 |
| `DATE` | 날짜 `YYYY-MM-DD` |
| `DATETIME` / `TIMESTAMP` | 날짜+시간 `YYYY-MM-DD HH:MI:SS` |
| `DECIMAL(p, s)` | 고정 소수점 (전체 p자리, 소수 s자리 — 금액에 적합) |

### 제약 조건 — 왜 필요한가?

타입을 넘어 데이터 간 논리 규칙까지 강제하는 DB의 '자동 경찰'.

| 제약 조건 | 의미 |
|---|---|
| `NOT NULL` | NULL 불가 (필수 입력) |
| `UNIQUE` | 테이블 내 중복 불가 |
| `PRIMARY KEY` | NOT NULL + UNIQUE, 테이블의 대표 식별자 |
| `FOREIGN KEY` | 다른 테이블의 PK를 참조해 관계를 맺고 일관성 보장 |
| `DEFAULT` | 값 미입력 시 사용할 기본값 |

### CREATE TABLE

형식: `컬럼명 데이터타입 제약조건 [COMMENT '설명']`

```sql
CREATE TABLE tb1 (
    user_id     INT PRIMARY KEY,
    user_pwd    VARCHAR(12) NOT NULL COMMENT '사용자 비밀번호',
    email       VARCHAR(30) NOT NULL UNIQUE COMMENT '이메일',
    user_status VARCHAR(10) DEFAULT 'active' COMMENT '계정 활성 상태',
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '가입 일시'
) COMMENT '서비스 유저 정보 테이블';

DESCRIBE tb1;   -- = DESC
```

### FOREIGN KEY와 참조 무결성

```sql
CREATE TABLE tb2 (
    user_id   INT PRIMARY KEY,
    author_id INT NOT NULL COMMENT 'tb1에서 전달받는 외래키',
    -- ...
    FOREIGN KEY (author_id) REFERENCES tb1(user_id)
);
```

- `tb2.author_id`는 부모 테이블 `tb1`의 `user_id`를 참조한다.
- 부모에 없는 값을 자식에 넣으려 하면 DB가 자동으로 차단한다.
- 이것이 **참조 무결성**을 지키는 메커니즘이다.
- 부모(`tb1`)는 자식이 참조 중이므로, 삭제할 때는 자식(`tb2`)부터 지워야 한다.

### 테이블 복제

```sql
CREATE TABLE courses_temp AS SELECT * FROM courses;
```

### ALTER TABLE — 구조 변경

```sql
ALTER TABLE courses_temp ADD COLUMN price INT NOT NULL DEFAULT 0;                   -- 추가
ALTER TABLE courses_temp MODIFY COLUMN price VARCHAR(200) NOT NULL DEFAULT '0원';   -- 수정
ALTER TABLE courses_temp DROP COLUMN price;                                         -- 삭제
```

### DROP vs TRUNCATE

| | DROP | TRUNCATE |
|---|---|---|
| 삭제 대상 | 데이터 + 테이블 구조 | 데이터만 (구조 유지) |
| 특징 | 매우 빠름, 롤백 불가 → 신중히 | 테이블을 비우고 새로 쓸 때 |

```sql
TRUNCATE TABLE courses_temp;
DROP TABLE courses_temp;
```

---

## 10. DML — 데이터 조작어 ⭐

### INSERT

```sql
INSERT INTO 테이블명 (컬럼...) VALUES (값...);

INSERT INTO users (email, name) VALUES ('email@gmail.com', '조평훈');

-- 여러 행 한 번에
INSERT INTO accounts (id, owner, balance)
VALUES (1, '홍길동', 10000.00), (2, '김짱구', 50000.00);
```

### INSERT 에러가 나면 → 제약 조건과 데이터 타입부터 확인!

| 위반 | 예시 |
|---|---|
| UNIQUE 위반 | 이미 존재하는 이메일로 다시 INSERT |
| NOT NULL 위반 | 필수 컬럼 `name` 없이 INSERT |
| **FK 참조 무결성 위반** (가장 어려움) | `users`에 없는 `author_id = 999`로 `courses`에 INSERT → 고아 데이터 방지 |

```sql
INSERT INTO courses (author_id, title, description)
VALUES (999, 'SQL 제약조건!', '...');   -- ❌ 존재하지 않는 회원
```

예외 케이스 — 에러가 **안 나서** 문제인 경우:

```sql
INSERT INTO users (email, name) VALUES ('email3@gmail.com', 123);  -- ✅ 들어가 버림
```

VARCHAR 컬럼에 정수를 넣으면 DB가 문자열 `'123'`으로 자동 형변환한다. 이런 입력값 검증은 DB가 아니라 프론트엔드·백엔드에서 처리해야 한다.

### UPDATE

```sql
UPDATE 테이블명 SET 컬럼 = 값 WHERE 조건;

UPDATE users SET name = '조평훈';                    -- ❌ 전체 행이 바뀜!
UPDATE users SET name = '조평순' WHERE user_id = 1;   -- ✅
```

> 수정·삭제에서 가장 중요한 것은 WHERE 절이다. 한 행을 정확히 식별할 수 있는 유일한 값(PK, UNIQUE)으로 조건을 거는 것이 권장된다.

### DELETE

```sql
DELETE FROM 테이블명 WHERE 조건;

DELETE FROM users WHERE email = 'email@gmail.com';
```

에러 케이스 — 부모 행 삭제:

```sql
DELETE FROM users WHERE user_id = 1;   -- ❌
```

- FK를 **주는** 쪽 = 부모 테이블 (`users`), **받는** 쪽 = 자식 테이블 (`courses`)
- 부모 행을 지우면 자식 데이터가 고아가 되므로 삭제가 거부된다.

---

## 11. UNION — 결과 합치기

여러 쿼리 결과를 위아래로 합친다. 수학의 합집합처럼 **중복 행은 제거**된다. (중복까지 유지하려면 `UNION ALL`)

JOIN과 비교:
- JOIN : 겹치는 컬럼(연결 키)이 있어야 옆으로 붙인다.
- UNION : 겹치는 컬럼 없이도 결과를 아래로 이어 붙인다.

조건:
- 각 SELECT의 **컬럼 개수가 같아야** 한다.
- 컬럼 순서와 데이터 타입이 서로 호환돼야 한다.

```sql
-- active + suspended 사용자에게 이메일 발송 (deleted 제외)
SELECT name, email, status FROM users WHERE status = 'active'
UNION
SELECT name, email, status FROM users WHERE status = 'suspended';
```

---

## 12. VIEW — 가상 테이블

쿼리를 저장해 테이블처럼 쓰는 가상 테이블.

시나리오: 데이터 분석팀은 '과정별 등록 학생 수'를 매일 확인한다. 마케팅팀에는 사용자 전체 정보 대신 실제로 쓸 이메일·이름만 전달하고 싶다.

### VIEW를 쓰는 이유

- 편의성 : 복잡한 쿼리를 뷰로 만들면 이후엔 단순한 테이블처럼 조회할 수 있다.
- 보안성 : 민감한 컬럼은 숨기고 허용된 컬럼만 담은 뷰를 제공해 원본 테이블 접근을 막는다.
- 가독성 & 속도 : 자주 쓰는 컬럼만으로 구성해 읽기 쉽고, 불필요한 컬럼을 조회하지 않는다.

### 생성 / 사용 / 수정 / 삭제

```sql
-- 생성: CREATE VIEW 뷰이름 AS 쿼리
CREATE VIEW v_courses_status AS
SELECT c.course_id,
       c.title,
       COUNT(e.enrollment_id) AS '등록 학생 수'
FROM   courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.course_id, c.title;

-- 사용: 일반 테이블처럼
SELECT * FROM v_courses_status
WHERE  `등록 학생 수` >= 3;

-- 수정: CREATE OR REPLACE VIEW
CREATE OR REPLACE VIEW v_courses_status AS
SELECT c.course_id, c.title, c.status,
       COUNT(e.enrollment_id) AS '등록 학생 수'
FROM   courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.course_id, c.title;

-- 삭제
DROP VIEW v_courses_status;
```

> LEFT JOIN을 썼기 때문에 등록 학생이 0명인 과정도 결과에 포함된다. (`COUNT(컬럼)`은 NULL을 세지 않으므로 0)

---

## 13. INDEX — 검색 성능

### Full Table Scan

100만 명의 `users`에서 '홍길동'을 찾을 때, DB는 기본적으로 첫 행부터 마지막 행까지 하나씩 비교한다. 이를 **Full Table Scan**이라 한다.

### 인덱스 = 책의 목차

DB에서 인덱스는 0부터 시작하는 번호가 아니라 '목차'라는 뜻이다. 특정 컬럼 값과 그 데이터의 물리적 위치를 미리 목차처럼 정리해 저장해 두고, 쿼리 시 목차로 원하는 위치에 바로 이동한다.

```sql
-- 실행 계획 확인
EXPLAIN SELECT * FROM users WHERE name = '홍길동';

-- 인덱스 생성: CREATE INDEX 인덱스명 ON 테이블(컬럼)
CREATE INDEX idx_users_name ON users(name);

EXPLAIN SELECT * FROM users WHERE name = '홍길동';
-- 적용 전: 120 rows full scan → 적용 후: 1 row만 scan
```

- PK, UNIQUE 컬럼은 유일성이 보장되므로 테이블 생성 시 **자동으로 인덱스**가 만들어진다.

### 인덱스는 양날의 검 (Trade-off)

1. 저장 공간 비용 — 인덱스는 테이블과 별도 공간을 차지한다. 많이 만들수록 전체 용량이 커진다. (책의 목차도 10~20페이지를 차지하듯)
2. **DML 성능 저하** (가장 중요) — SELECT는 빨라지지만 데이터 변경은 느려진다.
   - INSERT : 인덱스에도 정렬된 위치를 찾아 항목 추가
   - DELETE : 인덱스에서도 해당 항목을 찾아 삭제
   - UPDATE : 인덱스 컬럼 값이 바뀌면 **최악** — 기존 항목 삭제 + 새 위치에 삽입이 모두 필요

### 인덱스 적용 대상

1. 조회 비율이 압도적으로 높은 테이블 (DML 지연을 감수할 만큼)
2. 수정이 빈번하지 않은 컬럼

---

## 14. TRANSACTION — 하나의 작업 단위

### 왜 필요한가?

홍길동 → 김짱구 3000원 계좌이체는 논리적으로 하나의 작업이지만, 실제로는 UPDATE가 두 번 일어난다.

1. 홍길동 계좌 −3000
2. ⚡ 여기서 정전 등 문제 발생!
3. 김짱구 계좌 +3000 → 실행 안 됨 → 돈이 증발

**트랜잭션**은 여러 작업을 하나의 논리적 단위로 묶는 것이다. 하나라도 잘못되면 전부 되돌리는(롤백) 것이 핵심이다. (All or Nothing)

| 명령어 | 역할 |
|---|---|
| `START TRANSACTION` | 트랜잭션 시작 |
| `COMMIT` | 모든 작업을 영구 반영 |
| `ROLLBACK` | 시작 시점으로 되돌림 |

```sql
CREATE TABLE accounts (
    id      INT PRIMARY KEY,
    owner   VARCHAR(50),
    balance DECIMAL(10, 2)
);
INSERT INTO accounts VALUES (1, '홍길동', 10000.00), (2, '김짱구', 50000.00);
```

### 정상 흐름 → COMMIT

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 3000 WHERE id = 1;
UPDATE accounts SET balance = balance + 3000 WHERE id = 2;

SELECT * FROM accounts;   -- 중간 확인: 아직 영구 반영 아님 (Git의 add 상태와 비슷)

COMMIT;                   -- 영구 반영 (Git의 commit)
```

### 비정상 흐름 → ROLLBACK

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 3000 WHERE id = 1;
UPDATE accounts SET balance = balance + 3000 WHERE id = 99;  -- 없는 계좌

SELECT * FROM accounts;   -- 홍길동 돈만 빠져 있음

ROLLBACK;                 -- 시작 전 상태로 복구
SELECT * FROM accounts;   -- 홍길동 10000원 그대로
```

> 없는 id로 UPDATE해도 에러는 나지 않고 "0 rows affected"로 끝난다. 그래서 영향받은 행 수를 확인해 COMMIT할지 ROLLBACK할지 판단하는 것은 애플리케이션(백엔드)의 몫이다.

---

## ✅ 마무리 요약

- `SELECT`는 열을, `WHERE`는 행을 고른다.
- NULL은 `=`가 아니라 `IS NULL`로 비교한다.
- `AND`가 `OR`보다 먼저 계산된다.
- `WHERE`는 그룹화 전, `HAVING`은 그룹화 후 필터링이다.
- JOIN은 연결 키로 옆에 붙이고, UNION은 같은 형태의 결과를 아래로 붙인다.
- 서브쿼리는 WHERE(조건값)와 FROM(가상 테이블)에 쓸 수 있다.
- 데이터 타입 + 제약 조건 = DB가 스스로 지키는 규칙. INSERT 에러는 여기부터 확인한다.
- UPDATE/DELETE는 반드시 WHERE를 PK/UNIQUE로 건다.
- 부모 행은 자식이 참조 중이면 지울 수 없다 (참조 무결성).
- VIEW는 편의·보안·가독성, INDEX는 조회 속도와 DML 성능의 맞교환이다.
- 트랜잭션은 All or Nothing — `COMMIT` 아니면 `ROLLBACK`.
