---
title: "[Java 기초] 실행 구조, 변수, 형변환, 연산자 정리 (개념 + 실습)"
date: 2026-10-09
section: Study Notes
module: Module 2
categories: [Java, Basic]
tags: [java, jvm, variable, literal, type-casting, operator, scanner, overflow]
---

> Java 수업 1장(`com.wanted` 패키지)에서 배운 내용을 **개념(이론)** 과 **실습**으로 나누어 정리했습니다.
> 수업에서 다루지 않았지만 함께 알아두면 좋은 내용은 **Part 3**에 따로 모았습니다.

## 목차

- **Part 1. 개념 정리**
  1. Java 프로그램의 구조
  2. Java의 실행 과정 (JDK / JRE / JVM)
  3. 주석
  4. 리터럴과 변수
  5. 기본 자료형
  6. 형변환
  7. 연산자
- **Part 2. 실습 정리**
  1. Hello World 출력
  2. 자료형별 변수 선언
  3. Scanner로 입력 받기
  4. 형변환 실습
  5. 연산자 실습
  6. 생각해볼 문제: `byte` 127 + 1
- **Part 3. 추가로 알아두면 좋은 것**
- **Part 4. 확인 문제**
- **마무리 체크리스트**

### 실습 파일 구성

```
src
├── Helloworld.java                       # 주석 작성법
└── com/wanted
    ├── a_basic/Main.java                 # 기본 구조와 실행 과정
    ├── b_variable
    │   ├── module01/Application.java     # 리터럴, 자료형, 변수 선언/초기화
    │   ├── module01/Application02.java   # Scanner 입력
    │   └── module02/Application.java     # 형변환
    └── c_operator/Application.java       # 산술/비교/논리/증감 연산자
```

---

# Part 1. 개념 정리

## 1. Java 프로그램의 구조

```java
package com.wanted.a_basic;   // ① 패키지 선언

public class Main {           // ② 클래스 선언
    public static void main(String[] args) {   // ③ main 메서드 (시작점)
        System.out.println("Hello World!!!~"); // ④ 실행할 코드(문장)
    }
}
```

- **모든 Java 코드는 클래스 안에서 동작합니다.** 클래스 밖에는 변수나 실행 코드를 쓸 수 없습니다.
- **`main()` 메서드가 프로그램의 시작점(entry point)** 입니다. JVM은 프로그램을 실행할 때 이 메서드를 찾아서 호출합니다.
- 문장(statement)은 세미콜론(`;`)으로 끝납니다.

### `public static void main(String[] args)` 뜯어보기

| 키워드 | 의미 | 왜 필요할까? |
|---|---|---|
| `public` | 어디서든 접근 가능 | JVM이 클래스 바깥에서 호출해야 하기 때문 |
| `static` | 객체 없이 호출 가능 | 프로그램이 시작될 때는 아직 객체가 하나도 없기 때문 |
| `void` | 반환값 없음 | main이 끝나면 프로그램이 끝나므로 돌려줄 값이 필요 없음 |
| `main` | 메서드 이름 | JVM이 약속된 이름으로 찾음 |
| `String[] args` | 명령행 인자 | `java Main a b c`처럼 실행할 때 넘긴 값이 배열로 들어옴 |

### 파일 작성 규칙

- `public class`의 이름과 **파일 이름이 같아야 합니다.** (`Main` → `Main.java`)
- `package` 선언은 **실제 폴더 구조와 일치**해야 합니다. (`com.wanted.a_basic` → `src/com/wanted/a_basic/`)
- Java는 **대소문자를 구분**합니다. `main`과 `Main`은 다른 이름입니다.

---

## 2. Java의 실행 과정

```
 작성              컴파일                  실행
[Main.java] ──javac──▶ [Main.class] ──JVM──▶ [OS별 기계어] ──▶ 실행 결과
 (소스코드)            (바이트코드)
```

1. 개발자가 Java 코드를 작성합니다. (`.java`)
2. JDK에 포함된 **javac(컴파일러)** 가 `.java` 파일을 `.class` 파일(**바이트코드**)로 번역합니다.
3. **JVM**이 `.class` 파일을 메모리로 불러옵니다(로드).
4. JVM이 바이트코드를 해석해 현재 OS에서 실행 가능한 **기계어**로 바꿉니다.
5. 바뀐 기계어가 실행됩니다.

### JDK / JRE / JVM

```
┌────────────────────── JDK ──────────────────────┐
│  javac(컴파일러), 디버거 등 개발 도구               │
│  ┌──────────────── JRE ────────────────┐        │
│  │  표준 라이브러리 (java.lang, java.util…) │        │
│  │  ┌──────── JVM ────────┐            │        │
│  │  │ 바이트코드 실행 엔진   │            │        │
│  │  └─────────────────────┘            │        │
│  └─────────────────────────────────────┘        │
└─────────────────────────────────────────────────┘
```

| 이름 | 풀네임 | 역할 |
|---|---|---|
| **JDK** | Java Development Kit | **개발**에 필요한 도구 모음 (컴파일러 + JRE) |
| **JRE** | Java Runtime Environment | **실행**에 필요한 환경 (JVM + 표준 라이브러리) |
| **JVM** | Java Virtual Machine | 바이트코드를 실제로 실행하는 가상 머신 |

### Write Once, Run Anywhere

- 바이트코드는 **특정 OS에 묶이지 않은 중간 코드**입니다.
- OS마다 다른 부분은 OS별로 설치된 JVM이 처리합니다.
- 그래서 한 번 컴파일한 `.class` 파일을 Windows, macOS, Linux 어디서든 실행할 수 있습니다.

> 💡 참고: JVM은 처음에는 바이트코드를 한 줄씩 해석(인터프리트)하다가, 자주 실행되는 코드는 **JIT(Just-In-Time) 컴파일러**가 기계어로 미리 바꿔 두어 속도를 높입니다.

---

## 3. 주석

주석은 **컴파일러가 무시하는 메모**입니다. 코드 설명이나 필기에 씁니다.

```java
// 한 줄 주석

/* 여러 줄 주석
 * 여러 줄의 필기를 진행할 수 있습니다.
 */

/**
 * 문서화 주석(Javadoc)
 * 클래스나 메서드 위에 써서 API 문서를 만들 때 사용합니다.
 */
```

> 💡 **IntelliJ 팁: 필기용 주석 색 바꾸기**
> 수업에서는 `comment.`로 시작하는 주석을 녹색으로 보이게 설정했습니다.
> `Settings → Editor → TODO → +` 에서 패턴 `\bcomment\b.*` 를 추가하고 색을 지정하면, `/* comment. ... */` 형식의 필기가 눈에 잘 띕니다.

---

## 4. 리터럴과 변수

### 리터럴(Literal)

**리터럴은 코드에 직접 적은 "값" 그 자체**입니다.

| 종류 | 예시 | 표기 규칙 |
|---|---|---|
| 정수 | `10`, `-5`, `10000000000L` | 기본은 int, long은 뒤에 `L` |
| 실수 | `3.14`, `3.14f` | 기본은 double, float는 뒤에 `f` |
| 문자 | `'A'`, `'ㅎ'` | **작은따옴표**, 한 글자 |
| 문자열 | `"안녕하세요!"` | **큰따옴표** |
| 논리 | `true`, `false` | 두 값만 존재 |

### 변수(Variable)

**변수는 값을 저장하기 위해 이름을 붙인 메모리 공간**입니다.

```java
int num = 30;
//  │     │  └ 리터럴(값)
//  │     └── 변수 이름
//  └──────── 자료형(공간의 크기와 종류)
```

- **선언**: 자료형에 맞는 공간을 만들고 이름을 붙이는 것 → `int num;`
- **초기화**: 선언한 변수에 처음으로 값을 넣는 것 → `num = 30;`
- 선언과 초기화를 한 번에 할 수도 있습니다. → `int num2 = 10;`

### 변수 규칙

- **같은 블록(`{}`) 안에서는 같은 이름의 변수를 두 번 선언할 수 없습니다.**
- 지역 변수(메서드 안의 변수)는 **초기화하지 않고 사용하면 컴파일 에러**가 납니다.
- 이름 규칙
  - 영문자, 숫자, `_`, `$`만 쓸 수 있고 **숫자로 시작할 수 없습니다.**
  - `int`, `class` 같은 **예약어는 이름으로 쓸 수 없습니다.**
  - 관례상 변수 이름은 **camelCase**(`userName`, `totalPrice`)로 씁니다.

---

## 5. 기본 자료형 (Primitive Type)

| 분류 | 자료형 | 크기 | 표현 범위 | 비고 |
|---|---|---|---|---|
| 정수 | `byte` | 1byte (8bit) | -128 ~ 127 | |
| 정수 | `short` | 2byte | -32,768 ~ 32,767 | |
| 정수 | `int` | 4byte | 약 -21억 ~ 21억 | **정수 기본형** |
| 정수 | `long` | 8byte | 약 ±922경 | 리터럴 뒤에 `L` |
| 실수 | `float` | 4byte | 약 ±3.4 × 10³⁸ (정밀도 약 7자리) | 리터럴 뒤에 `f` **필수** |
| 실수 | `double` | 8byte | 약 ±1.8 × 10³⁰⁸ (정밀도 약 15자리) | **실수 기본형** |
| 문자 | `char` | 2byte | 0 ~ 65,535 (유니코드) | 한 글자 |
| 논리 | `boolean` | 1byte* | `true` / `false` | |

> \* `boolean`의 실제 크기는 JVM 구현에 따라 다르지만, 보통 1byte로 설명합니다.

### 기본형 vs 참조형

| | 기본형 (Primitive) | 참조형 (Reference) |
|---|---|---|
| 종류 | 위 표의 8가지 | `String`, 배열, 클래스 등 그 외 전부 |
| 저장하는 것 | **실제 값** | 값이 있는 곳의 **주소** |
| 이름 | 소문자로 시작 (`int`) | 대문자로 시작 (`String`) |
| 기본값으로 `null` | 불가능 | 가능 |

> `String`은 기본 자료형이 아니라 **클래스(참조형)** 입니다. 자주 쓰다 보니 기본형처럼 `"..."`로 바로 만들 수 있게 해 준 것입니다.

---

## 6. 형변환 (Type Conversion)

**형변환은 어떤 자료형의 값을 다른 자료형으로 바꾸는 것**입니다.

### 암시적(묵시적) 형변환: 작은 타입 → 큰 타입

```
byte → short → int → long → float → double
                ↑
              char
```

- 작은 그릇에서 큰 그릇으로 옮기므로 **데이터 손실이 없습니다.**
- 그래서 **컴파일러가 자동으로** 변환해 줍니다.

> 💡 `long`(8byte)에서 `float`(4byte)로 자동 변환이 되는 이유: 바이트 크기는 작아도 float이 **표현할 수 있는 범위**가 훨씬 넓기 때문입니다. 단, 정밀도는 떨어질 수 있습니다.

### 명시적 형변환: 큰 타입 → 작은 타입

```java
int inum = (int) dnum;   // (바꿀 자료형)을 직접 적는다
```

- 큰 그릇에서 작은 그릇으로 옮기므로 **데이터가 손실될 수 있습니다.**
- 그래서 형변환 연산자 `(자료형)`을 적지 않으면 컴파일러가 **에러**를 냅니다.
- `(자료형)`을 적는 것은 "손실을 알고 있고, 의도한 것"이라고 컴파일러에게 알리는 표시입니다.
- 실수 → 정수 변환은 **반올림이 아니라 소수점 버림**입니다.

### 연산 시 자동 형변환 (타입 승격)

- 서로 다른 타입끼리 연산하면 **더 큰 타입으로 맞춘 뒤** 계산합니다. (`int + double` → `double`)
- `byte`, `short`, `char`처럼 **int보다 작은 타입은 연산할 때 int로 바뀝니다.**

---

## 7. 연산자

### 7-1. 산술 연산자

| 연산자 | 의미 | 예 (`a=10, b=3`) | 결과 |
|---|---|---|---|
| `+` | 더하기 | `a + b` | 13 |
| `-` | 빼기 | `a - b` | 7 |
| `*` | 곱하기 | `a * b` | 30 |
| `/` | 나누기 (몫) | `a / b` | 3 |
| `%` | 나머지 (mod) | `a % b` | 1 |

- **정수 ÷ 정수 = 정수**입니다. 소수점 아래는 버립니다.
- **문자열 + 무엇이든 = 문자열**입니다. `+`가 덧셈이 아니라 **이어 붙이기**로 동작합니다.
- `+`는 **왼쪽부터 순서대로** 계산합니다.

### 7-2. 비교 연산자

두 값을 비교해 **`true` 또는 `false`** 를 돌려줍니다.

| 연산자 | 의미 |
|---|---|
| `==` | 같다 |
| `!=` | 같지 않다 (`!`는 NOT) |
| `>`, `<` | 크다, 작다 |
| `>=`, `<=` | 크거나 같다, 작거나 같다 |

> ⚠️ `=`는 **대입**, `==`는 **비교**입니다.

### 7-3. 논리 연산자

여러 **조건을 결합**해 최종 참/거짓을 판단합니다.

| A | B | `A && B` (AND) | `A \|\| B` (OR) | `!A` (NOT) |
|---|---|---|---|---|
| true | true | true | true | false |
| true | false | false | true | false |
| false | true | false | true | true |
| false | false | false | false | true |

#### 단축 평가 (Short-Circuit Evaluation)

- `A && B`: **A가 false면 B를 계산하지 않습니다.** (이미 결과가 false)
- `A || B`: **A가 true면 B를 계산하지 않습니다.** (이미 결과가 true)

### 7-4. 증감 연산자

| 형태 | 이름 | 동작 |
|---|---|---|
| `++a` / `--a` | 전위 연산 | **먼저 증감**하고 그 값을 사용 |
| `a++` / `a--` | 후위 연산 | **현재 값을 먼저 사용**하고 나중에 증감 |

---

# Part 2. 실습 정리

## 실습 1. Hello World 출력

📄 `com/wanted/a_basic/Main.java`

```java
package com.wanted.a_basic;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!!!~");
    }
}
```

**실행 결과**
```
Hello World!!!~
```

- `System.out.println()`: 괄호 안의 값을 출력하고 **줄을 바꿉니다.**
- `System.out.print()`: 출력만 하고 **줄을 바꾸지 않습니다.**
- IntelliJ에서 실행하면 `out/production/...` 폴더에 컴파일된 `.class` 파일이 생깁니다. Part 1에서 본 "`.java` → `.class`" 과정을 직접 확인할 수 있습니다.

---

## 실습 2. 자료형별 변수 선언

📄 `com/wanted/b_variable/module01/Application.java`

```java
// 숫자형 - 정수
byte b = 10;      // 1byte
short s = 10;     // 2byte
int i = 10;       // 4byte
long l = 10;      // 8byte

// 숫자형 - 실수
float f = 3.14f;  // 4byte
double d = 3.14;  // 8byte

// 문자형
char ch = 'ㅎ';

// 문자열
String str = "안녕하세요!";
String str2 = "안녕하세요!";   // 같은 블록에서 같은 이름(str)은 다시 쓸 수 없음

// 논리형
boolean bl = true;
boolean bl2 = false;

// 변수의 선언과 초기화
int num;          // 선언
num = 30;         // 초기화
int num2 = 10;    // 선언과 동시에 초기화
```

### 포인트

- `float f = 3.14;`처럼 `f`를 빼면 **컴파일 에러**가 납니다. `3.14`는 double(8byte) 리터럴이라, float(4byte)에 넣으면 손실 가능성이 있기 때문입니다.
- `long l = 10;`은 문제없지만, int 범위를 넘는 값은 반드시 `L`을 붙여야 합니다.
  ```java
  long big = 3000000000;   // ❌ 컴파일 에러: int 범위를 넘는 정수 리터럴
  long big = 3000000000L;  // ✅
  ```
- `String str = "안녕하세요!";`를 한 번 더 선언하면 `Variable 'str' is already defined` 에러가 납니다.

---

## 실습 3. Scanner로 입력 받기

📄 `com/wanted/b_variable/module01/Application02.java`

```java
import java.util.Scanner;

public class Application02 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("당신의 이름을 입력하세요 : ");
        String name = sc.nextLine();

        System.out.println("이름 : " + name + " 입니다!");
    }
}
```

**실행 결과**
```
당신의 이름을 입력하세요 : 홍길동
이름 : 홍길동 입니다!
```

### 코드 설명

| 코드 | 의미 |
|---|---|
| `import java.util.Scanner;` | `java.util` 패키지의 `Scanner` 클래스를 가져와 사용 |
| `new Scanner(System.in)` | 표준 입력(키보드)을 읽는 Scanner 객체 생성 |
| `System.out.print(...)` | 줄을 바꾸지 않고 출력 → 같은 줄에서 입력 받기 |
| `sc.nextLine()` | 엔터 전까지 입력한 **한 줄 전체**를 문자열로 읽음 |

### 자주 쓰는 Scanner 메서드

| 메서드 | 반환 타입 | 읽는 값 |
|---|---|---|
| `nextLine()` | `String` | 한 줄 전체 (공백 포함) |
| `next()` | `String` | 공백 전까지 단어 하나 |
| `nextInt()` | `int` | 정수 |
| `nextDouble()` | `double` | 실수 |
| `nextBoolean()` | `boolean` | true / false |

### ⚠️ `nextInt()` 다음 `nextLine()` 문제

```java
int age = sc.nextInt();       // "20⏎" 입력 → 20만 읽고 ⏎(개행)는 버퍼에 남음
String name = sc.nextLine();  // 남아 있던 ⏎를 읽고 바로 끝남 → name = ""
```

해결 방법: 사이에 `sc.nextLine();`을 한 번 넣어 남은 개행을 비웁니다.

```java
int age = sc.nextInt();
sc.nextLine();                // 버퍼에 남은 개행 제거
String name = sc.nextLine();
```

### IntelliJ 단축어

| 입력 | 결과 |
|---|---|
| `psvm` 또는 `main` | `public static void main(String[] args) { }` |
| `sout` | `System.out.println();` |
| `soutv` | `System.out.println("변수명 = " + 변수명);` |

---

## 실습 4. 형변환 실습

📄 `com/wanted/b_variable/module02/Application.java`

```java
// 명시적 형변환: double(8byte) → int(4byte)
double dnum = 99.99;
int inum = (int) dnum;
System.out.println("dnum = " + dnum);
System.out.println("inum = " + inum);

// 암시적 형변환: int(4byte) → double(8byte)
int num2 = 100;
double dnum2 = num2;
```

**실행 결과**
```
dnum = 99.99
inum = 99
```

### 포인트

- `99.99`를 int로 바꾸면 **반올림해서 100이 아니라, 소수점을 버려서 99**가 됩니다. 음수도 마찬가지로 0 쪽으로 버립니다. (`(int) -3.99` → `-3`)
- `(int)`를 빼고 `int inum = dnum;`이라고 쓰면 다음 에러가 납니다.
  ```
  incompatible types: possible lossy conversion from double to int
  ```
- `double dnum2 = num2;`는 형변환 연산자 없이도 됩니다. `dnum2`에는 `100.0`이 들어갑니다.

### 추가 실습: 정수 나눗셈과 형변환

```java
int a = 10, b = 3;
System.out.println(a / b);            // 3
System.out.println((double) a / b);   // 3.3333333333333335
System.out.println((double) (a / b)); // 3.0  ← 이미 3이 된 뒤 변환하므로 소용없음
```

형변환은 **나누기 전에** 해야 효과가 있습니다.

---

## 실습 5. 연산자 실습

📄 `com/wanted/c_operator/Application.java`

### 5-1. 산술 연산 + 문자열 연결

```java
int a = 10;
int b = 3;

System.out.println("덧셈 : " + a + b);     // 덧셈 : 103
System.out.println("덧셈 : " + (a + b));   // 덧셈 : 13
System.out.println("나눗셈 : " + (a / b)); // 나눗셈 : 3
System.out.println("나머지 : " + (a % b)); // 나머지 : 1
```

**왜 `103`이 나올까?**

```
"덧셈 : " + a + b
= ("덧셈 : " + 10) + 3     ← 왼쪽부터 계산
= "덧셈 : 10" + 3          ← 문자열 + 숫자 = 문자열
= "덧셈 : 103"
```

괄호 `(a + b)`를 쓰면 숫자끼리 먼저 더해 `13`이 됩니다.

> 💡 반대 상황도 확인해 봅시다.
> ```java
> System.out.println(1 + 2 + "3" + 4 + 5);   // 3345
> ```
> `1 + 2 = 3`(숫자 덧셈) → `3 + "3" = "33"` → `"334"` → `"3345"`

### 5-2. 비교 연산

```java
boolean isGreater = a > b;                  // true
System.out.println("a > b : " + (a > b));   // a > b : true
System.out.println("a != b : " + (a != b)); // a != b : true
```

### 5-3. 논리 연산

```java
boolean isTrue = true;
boolean isFalse = false;

System.out.println("둘 다 참이니? : " + (isFalse && isTrue));        // false
System.out.println("둘 중 하나는 참이니? : " + (isFalse || isTrue)); // true
```

#### 💬 면접 질문: `A && B`에서 A를 앞에 둘 때와 B를 앞에 둘 때 무엇이 다를까?

결과(true/false)는 같지만, **단축 평가** 때문에 **무엇이 실행되는지**가 달라집니다.

1. **성능**
   - `&&`에서는 **false가 될 가능성이 높거나, 계산 비용이 적은 조건을 앞에** 둡니다. 앞에서 false가 나오면 뒤를 계산하지 않기 때문입니다.
   - `||`에서는 반대로 **true가 될 가능성이 높은 조건을 앞에** 둡니다.
2. **안전성 (NullPointerException 방지)**
   ```java
   if (str != null && str.length() > 0) { }  // ✅ str이 null이면 뒤는 실행 안 됨
   if (str.length() > 0 && str != null) { }  // ❌ str이 null이면 바로 예외 발생
   ```
3. **부수 효과**
   ```java
   int x = 0;
   boolean r = false && (++x > 0);
   System.out.println(x);   // 0  ← 뒤쪽 ++x가 실행되지 않음
   ```

> `&`, `|`(한 개짜리)는 단축 평가 없이 **양쪽을 모두 계산**합니다.

### 5-4. 증감 연산

```java
int age = 20;
System.out.println("초기 값 age : " + (age)); // 20
System.out.println("++age : " + (++age));    // 21  증가 → 사용
System.out.println("age : " + (age));        // 21
System.out.println("age++ : " + (age++));    // 21  사용 → 증가
System.out.println("age : " + (age));        // 22
```

`age++`를 출력한 줄에서는 21이 보이지만, 그 줄이 끝난 뒤 `age`는 이미 22입니다.

---

## 실습 6. 🤔 생각해볼 문제: `byte` 127 + 1은 왜 128이 아닐까?

```java
byte bnum = 127;
bnum++;
System.out.println(bnum);   // 예상: 128 → 실제: -128
```

수업에서 제시한 키워드 **byte, bit, overflow, underflow, type casting**으로 설명해 보겠습니다.

### ① bit와 byte

- **bit**: 0 또는 1을 저장하는 가장 작은 단위
- **1byte = 8bit** → 2⁸ = **256가지** 값을 표현할 수 있습니다.
- 맨 앞 bit는 **부호 비트**(0: 양수, 1: 음수)입니다. 그래서 `byte` 범위는 **-128 ~ 127**입니다.

### ② 2진수로 계산해 보기

```
  0111 1111   (+127, byte 최댓값)
+ 0000 0001   (+1)
───────────
  1000 0000   → 부호 비트가 1 → 음수 → -128
```

Java는 음수를 **2의 보수** 방식으로 저장합니다. 이 규칙에서 `1000 0000`은 **-128**입니다.

### ③ 오버플로우 / 언더플로우

| 현상 | 설명 | 예시 |
|---|---|---|
| **오버플로우 (Overflow)** | 최댓값을 넘으면 최솟값 쪽으로 돌아감 | `byte` 127 + 1 → **-128** |
| **언더플로우 (Underflow)** | 최솟값보다 작아지면 최댓값 쪽으로 돌아감 | `byte` -128 - 1 → **127** |

자동차 주행거리계가 `999999` 다음에 `000000`이 되는 것과 비슷합니다.
**Java는 이때 에러를 내지 않고 조용히 값이 바뀌므로** 특히 조심해야 합니다.

> 정수 오버플로우는 `int`에서도 똑같이 일어납니다.
> ```java
> System.out.println(Integer.MAX_VALUE + 1);   // -2147483648
> ```

### ④ 형변환(Type Casting)과의 관계

```java
byte bnum = 127;
bnum = bnum + 1;   // ❌ 컴파일 에러!
bnum++;            // ✅ 컴파일 OK
bnum += 1;         // ✅ 컴파일 OK
```

- `byte`는 연산할 때 **int로 바뀌어 계산**됩니다. (Part 1의 "타입 승격")
- 그래서 `bnum + 1`의 결과는 **int**이고, 이를 byte에 그대로 넣으려 하면 컴파일 에러가 납니다.
- 반면 `bnum++`와 `bnum += 1`은 내부적으로 **`bnum = (byte)(bnum + 1);`** 처럼 명시적 형변환이 자동으로 들어갑니다.
- int로 계산한 `128`은 2진수로 `0000 0000 0000 0000 0000 0000 1000 0000`입니다. 이를 byte로 바꾸면 **아래 8bit `1000 0000`만 남고**, 이 값이 `-128`로 해석됩니다.

> 같은 원리로 `(byte) 200`은 `-56`이 됩니다. (200 - 256 = -56)

### ✅ 한 줄 정리

> `byte`는 8bit라서 -128 ~ 127만 표현할 수 있다. `bnum++`는 int로 계산한 128을 byte로 **형변환**하는데, 이때 아래 8bit `1000 0000`만 남아 2의 보수 규칙에 따라 **-128**이 된다. 이렇게 범위를 넘어 반대쪽 끝으로 돌아가는 현상을 **오버플로우**(반대 방향은 **언더플로우**)라고 한다.

> 💡 **실무 팁**: 오버플로우가 걱정되면 더 큰 타입(`long`)을 쓰거나, 오버플로우 시 예외를 던지는 `Math.addExact(a, b)`를 사용합니다.

---

# Part 3. 추가로 알아두면 좋은 것

수업 범위 바로 다음에 자주 나오거나, 실수하기 쉬운 내용입니다.

## 3-1. 대입 연산자와 복합 대입 연산자

```java
int x = 5;
x += 3;   // x = x + 3  → 8
x -= 1;   // x = x - 1  → 7
x *= 2;   // x = x * 2  → 14
x /= 2;   // x = x / 2  → 7
x %= 4;   // x = x % 4  → 3
```

복합 대입 연산자는 **자동으로 형변환을 포함**합니다. 그래서 `byte`에 `b += 1`은 되지만 `b = b + 1`은 에러가 납니다. (실습 6 참고)

## 3-2. 삼항 연산자

`조건 ? 참일 때 값 : 거짓일 때 값`

```java
int a = 10, b = 3;
String bigger = (a > b) ? "a" : "b";
System.out.println(bigger);   // a
```

간단한 if-else를 한 줄로 쓸 때 사용합니다. 너무 복잡하게 겹쳐 쓰면 읽기 어려우므로 주의합니다.

## 3-3. 연산자 우선순위

| 우선순위 | 연산자 |
|---|---|
| 1 (높음) | `()`, 후위 `a++` `a--` |
| 2 | 전위 `++a` `--a`, 단항 `+` `-`, `!`, 형변환 `(type)` |
| 3 | `*` `/` `%` |
| 4 | `+` `-` |
| 5 | `<` `>` `<=` `>=` |
| 6 | `==` `!=` |
| 7 | `&&` |
| 8 | `\|\|` |
| 9 | `? :` (삼항) |
| 10 (낮음) | `=` `+=` `-=` 등 대입 |

> 외우기보다는 **헷갈리면 괄호를 치는 것**이 가장 좋은 습관입니다.
> 형변환이 `/`보다 우선순위가 높아서 `(double) a / b`는 `((double) a) / b`로 계산됩니다.

## 3-4. 음수의 나눗셈과 나머지

```java
System.out.println(-7 / 2);   // -3  (0 쪽으로 버림)
System.out.println(-7 % 2);   // -1  (나머지 부호는 왼쪽 피연산자를 따름)
```

그래서 홀수 판별은 `n % 2 == 1`보다 **`n % 2 != 0`** 이 안전합니다. 음수 홀수에서는 `-1`이 나오기 때문입니다.

## 3-5. 실수 연산의 오차

```java
System.out.println(0.1 + 0.2);   // 0.30000000000000004
```

- 컴퓨터는 실수를 2진수로 저장하는데, `0.1` 같은 값은 2진수로 정확히 표현할 수 없어 아주 작은 오차가 생깁니다.
- 그래서 실수는 `==`로 직접 비교하지 않는 것이 좋습니다.
- **돈 계산처럼 정확해야 하는 경우**에는 `BigDecimal` 클래스를 사용합니다.

## 3-6. `char`는 사실 숫자다

```java
char c = 'A';
System.out.println(c + 1);          // 66  ('A'의 유니코드 값 65 + 1, int로 승격)
System.out.println((char) (c + 1)); // B
```

`char`는 내부적으로 **유니코드 번호(정수)** 를 저장합니다. 그래서 산술 연산이 가능하고, 결과는 int가 됩니다.

## 3-7. 문자열 비교는 `==`가 아니라 `equals()`

```java
String s1 = "hi";
String s2 = new String("hi");

System.out.println(s1 == s2);       // false  (주소 비교)
System.out.println(s1.equals(s2));  // true   (내용 비교)
```

`String`은 참조형이라 `==`는 **같은 객체(주소)인지**를 비교합니다. **내용**을 비교하려면 `equals()`를 사용합니다. (기본형 vs 참조형 차이)

## 3-8. 상수 `final`

```java
final double PI = 3.14159;
PI = 3.14;   // ❌ 컴파일 에러: 값을 바꿀 수 없음
```

- `final`을 붙이면 **한 번 초기화한 뒤 값을 바꿀 수 없습니다.**
- 상수 이름은 관례상 **대문자 + 언더스코어**(`MAX_SIZE`, `TAX_RATE`)로 씁니다.

## 3-9. 이름 짓기 관례 (Naming Convention)

| 대상 | 규칙 | 예시 |
|---|---|---|
| 클래스 | PascalCase (첫 글자 대문자) | `Application`, `HelloWorld` |
| 변수, 메서드 | camelCase (첫 글자 소문자) | `userName`, `getAge()` |
| 상수 | UPPER_SNAKE_CASE | `MAX_VALUE` |
| 패키지 | 모두 소문자 | `com.wanted.a_basic` |

> 실습 파일 `Helloworld.java`는 관례대로라면 `HelloWorld.java`가 더 자연스럽습니다.

## 3-10. 지역 변수 타입 추론 `var` (Java 10+)

```java
var count = 10;        // int로 추론
var name = "홍길동";    // String으로 추론
```

- 오른쪽 값을 보고 컴파일러가 타입을 정해 줍니다. **타입이 없어지는 것이 아니라 컴파일 시점에 정해지는 것**입니다.
- 지역 변수에만 쓸 수 있고, 반드시 선언과 동시에 초기화해야 합니다.

## 3-11. `Scanner` 닫기

```java
Scanner sc = new Scanner(System.in);
// ... 입력 처리 ...
sc.close();
```

다 쓴 자원은 닫는 습관을 들이면 좋습니다. 다만 `System.in`을 감싼 Scanner를 닫으면 **표준 입력 자체도 닫히므로**, 프로그램 안에서 다시 입력을 받아야 한다면 닫지 않습니다.

---

# Part 4. 확인 문제

스스로 답을 예상한 뒤 펼쳐서 확인해 보세요.

**Q1.** 다음 출력 결과는?
```java
System.out.println("결과 : " + 5 + 5);
System.out.println(5 + 5 + " : 결과");
```
<details>
<summary>정답</summary>

```
결과 : 55
10 : 결과
```
왼쪽부터 계산합니다. 첫 줄은 문자열이 먼저 나와 이어 붙이기가 되고, 둘째 줄은 숫자끼리 먼저 더한 뒤 문자열과 연결됩니다.
</details>

**Q2.** 다음 코드 중 컴파일 에러가 나는 줄은?
```java
float f1 = 1.5;
long  l1 = 100;
int   i1 = 3.0;
double d1 = 10;
```
<details>
<summary>정답</summary>

`float f1 = 1.5;`와 `int i1 = 3.0;`
둘 다 double 리터럴을 더 작은 타입에 넣으려 해서 에러가 납니다. `1.5f`, `(int) 3.0`처럼 고쳐야 합니다.
</details>

**Q3.** 다음 출력 결과는?
```java
int n = 5;
int result = n++ + ++n;
System.out.println(result + ", " + n);
```
<details>
<summary>정답</summary>

`12, 7`
`n++`는 5를 사용한 뒤 n이 6이 되고, `++n`은 n을 7로 만든 뒤 7을 사용합니다. 5 + 7 = 12.
</details>

**Q4.** `short s = 32767; s++;` 후 `s`의 값은?
<details>
<summary>정답</summary>

`-32768`
short의 최댓값에서 1을 더해 오버플로우가 일어납니다.
</details>

**Q5.** 다음 코드의 출력과, 그렇게 되는 이유는?
```java
int x = 10;
if (x > 100 && ++x > 0) { }
System.out.println(x);
```
<details>
<summary>정답</summary>

`10`
`x > 100`이 false이므로 단축 평가에 의해 `++x`가 실행되지 않습니다.
</details>

---

# 마무리 체크리스트

- [ ] Java 코드는 클래스 안에서 동작하고, `main()`이 프로그램의 시작점이다.
- [ ] `.java` → (javac) → `.class`(바이트코드) → (JVM) → 기계어 순서로 실행된다.
- [ ] JDK ⊃ JRE ⊃ JVM 관계를 설명할 수 있다.
- [ ] 리터럴은 값 자체이고, 변수는 값을 담는 이름 붙은 공간이다.
- [ ] 기본 자료형 8가지와 크기를 말할 수 있다. 정수 기본형은 `int`, 실수 기본형은 `double`이다.
- [ ] `float`에는 `f`, 큰 `long` 값에는 `L`을 붙인다.
- [ ] 작은 타입 → 큰 타입은 자동 형변환, 큰 타입 → 작은 타입은 `(타입)`을 적는 명시적 형변환이 필요하다.
- [ ] 실수 → 정수 변환은 반올림이 아니라 버림이다.
- [ ] 문자열 + 숫자는 이어 붙이기이고, `+`는 왼쪽부터 계산한다.
- [ ] 정수끼리 나누면 소수점이 버려진다.
- [ ] `&&`, `||`는 단축 평가를 하므로 조건 순서가 성능과 안전성에 영향을 준다.
- [ ] 전위(`++a`)는 증가 후 사용, 후위(`a++`)는 사용 후 증가다.
- [ ] `byte` 127 + 1 = -128이 되는 이유를 bit, 2의 보수, 오버플로우, 형변환으로 설명할 수 있다.
- [ ] `String` 내용 비교는 `equals()`를 쓴다.
