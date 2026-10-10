---
title: "[Java] 객체지향 프로그래밍(OOP) 한 번에 정리하기 — String부터 인터페이스까지"
date: 2026-10-09
section: Study Notes
module: Module 2
categories: [Java]
tags: [java, oop, class, encapsulation, inheritance, polymorphism, interface]
---

> Java 수업에서 배운 객체지향 프로그래밍 내용을 **이론 + 실습 코드**로 정리한 글이다.
> 나중에 다시 봐도 흐름이 이해되도록, 각 개념마다 **왜 필요한가 → 한 줄 정의 → 실습 코드 → 실행 결과 → 헷갈리기 쉬운 점** 순서로 적었다.

---

## 목차

0. [큰 그림: 개념들은 어떻게 이어질까?](#0-큰-그림-개념들은-어떻게-이어질까)
1. [String — Java가 만든 첫 번째 객체](#1-string--java가-만든-첫-번째-객체)
2. [배열 — 같은 자료형 여러 개 묶기](#2-배열--같은-자료형-여러-개-묶기)
3. [클래스 — 내가 만드는 자료형](#3-클래스--내가-만드는-자료형)
4. [생성자와 this — 만들 때 바로 값 넣기](#4-생성자와-this--만들-때-바로-값-넣기)
5. [캡슐화 — 필드를 숨기고 메서드로만](#5-캡슐화--필드를-숨기고-메서드로만)
6. [추상화 — 필요한 것만 뽑아서 설계하기](#6-추상화--필요한-것만-뽑아서-설계하기)
7. [오버로딩 — 같은 이름, 다른 매개변수](#7-오버로딩--같은-이름-다른-매개변수)
8. [static — 객체가 아닌 클래스에 붙는 것](#8-static--객체가-아닌-클래스에-붙는-것)
9. [싱글톤 패턴 — 객체를 딱 하나만](#9-싱글톤-패턴--객체를-딱-하나만)
10. [final — 한 번 정하면 못 바꾼다](#10-final--한-번-정하면-못-바꾼다)
11. [상속 — 부모 코드 물려받기](#11-상속--부모-코드-물려받기)
12. [다형성 — 부모 타입 하나로 자식들 다루기](#12-다형성--부모-타입-하나로-자식들-다루기)
13. [인터페이스 — 반드시 구현할 메서드 강제하기](#13-인터페이스--반드시-구현할-메서드-강제하기)
14. [마무리: 객체지향 4대 특징 & 셀프 체크](#14-마무리-객체지향-4대-특징--셀프-체크)

---

## 0. 큰 그림: 개념들은 어떻게 이어질까?

객체지향 개념들은 따로따로 외우면 금방 잊어버린다. 사실 각 개념은 **앞 단계에서 생긴 불편함을 해결하려고** 등장한다. 이 흐름만 기억하면 전체가 하나의 이야기로 연결된다.

```
String·배열          Java가 미리 만들어 둔 객체를 써 본다
   │  "서로 다른 자료형(이름, 나이, 성별...)은 하나로 못 묶네?"
   ▼
클래스               내가 직접 자료형을 만든다
   │  "만들 때 값을 한 번에 넣고 싶은데?"
   ▼
생성자               new 하는 순간 필드를 초기화
   │  "아무나 필드에 이상한 값을 막 넣네?"
   ▼
캡슐화               private 필드 + 검증 메서드
   │  "그럼 클래스는 어떻게 설계하지?"
   ▼
추상화               필요한 것만 뽑아서 클래스로
   │
   ├─ "같은 일인데 입력만 다르면?"        → 오버로딩
   └─ "객체 말고 클래스에 붙는 건 없나?"  → static → 싱글톤, final
   │
   │  "비슷한 클래스끼리 코드가 계속 반복되네?"
   ▼
상속                 extends, 오버라이딩
   │  "부모 타입 하나로 자식들을 한꺼번에 다룰 수 없을까?"
   ▼
다형성               Animal a = new Raccoon();
   │  "자식들이 꼭 가져야 할 메서드를 강제하고 싶은데?"
   ▼
인터페이스           implements
```

---

## 1. String — Java가 만든 첫 번째 객체

### 왜 필요할까?

글자 하나는 `char`에 담을 수 있지만, `"applemango"` 같은 문장을 `char` 변수 10개로 관리할 수는 없다. 글자 여러 개를 한 덩어리로 다루면서, **길이 구하기 · 공백 제거 같은 기능**도 같이 쓰고 싶다.

### 한 줄 정의

> `String`은 Java가 미리 만들어 둔 **문자열 클래스(참조 자료형)** 로, 문자열 데이터와 그 데이터를 다루는 메서드를 함께 가지고 있다.

### 자료형의 종류

| 종류 | 예시 | 설명 |
|---|---|---|
| 기본 자료형 | `int`, `char`, `double`, `boolean` | 변수에 **값 자체**가 저장된다 |
| 참조 자료형 (Java 제공) | `String`, 배열, `Scanner` | 변수에 객체의 **주소**가 저장된다 |
| 사용자 정의 자료형 | 내가 만든 `Member`, `Monster` 등 | 내가 직접 만든 클래스 (3장) |

> 💡 `String`은 "사용자 정의 자료형"이 아니라 **Java가 제공하는 참조 자료형**이다. 둘을 헷갈리기 쉽다.

### 실습 ① 자주 쓰는 String 메서드

```java
String str1 = "applemango";

System.out.println("str1 의 길이! : " + str1.length());   // 10

// index는 0부터 시작한다. "abc" → a:0, b:1, c:2
for (int i = 0; i < str1.length(); i++) {
    System.out.println(str1.charAt(i));   // i번째 문자 1개를 꺼낸다
}

String trimStr = "   java   ";
System.out.println("공백 제거 전 :#" + trimStr + "#");
System.out.println("공백 제거 후 :#" + trimStr.trim() + "#");
```

**실행 결과**

```
str1 의 길이! : 10
a
p
p
l
e
m
a
n
g
o
공백 제거 전 :#   java   #
공백 제거 후 :#java#
```

| 메서드 | 하는 일 |
|---|---|
| `length()` | 문자열 길이를 `int`로 반환 |
| `charAt(index)` | index 위치의 **문자 1개**(`char`)를 반환 |
| `trim()` | 앞뒤 공백을 제거한 **새 문자열**을 반환 |

`str1.length()`처럼 변수 뒤에 `.메서드()`를 붙일 수 있는 이유는 `str1`이 단순한 값이 아니라 **객체**이기 때문이다.

> 📌 **공부 팁** — 메서드를 전부 외우고 쓰는 게 아니라, **직접 써 보고 → 출력해 보고 → 이해하는** 순서로 익히자.

### 실습 ② `==` vs `equals()`

문자열을 만드는 방법은 두 가지다.

```java
String str1 = "java";              // ① 리터럴 방식
String str2 = new String("java");  // ② new 방식
String str3 = "java";
String str4 = new String("java");

System.out.println("동등비교 : " + (str1 == str2));          // false
System.out.println("동등비교 : " + (str1 == str3));          // true
System.out.println("동등비교 : " + (str2 == str4));          // false
System.out.println("equals() 활용 비교 : " + str1.equals(str2)); // true
```

왜 이런 결과가 나올까? 메모리 그림으로 보면 쉽다.

```
            String Pool (heap 안의 특별한 공간)
str1 ──┐    ┌─────────┐
       ├──▶ │ "java"  │   ← 리터럴은 같은 내용이면 이미 만든 것을 재사용
str3 ──┘    └─────────┘

            heap
str2 ─────▶ ┌─────────┐
            │ "java"  │   ← new는 만날 때마다 "항상" 새 공간을 만든다
            └─────────┘
str4 ─────▶ ┌─────────┐
            │ "java"  │
            └─────────┘
```

- `==` → **주소**를 비교한다. str1과 str3만 같은 곳을 가리키므로 `true`.
- `equals()` → **내용**을 비교한다. 만든 방식과 상관없이 글자가 같으면 `true`.

### ⚠️ 헷갈리기 쉬운 점

- 문자열 **내용**을 비교할 땐 무조건 `equals()`를 쓴다. `==`는 우연히 맞을 때도 있어서 더 위험하다.
- `charAt()`은 "문자열을 문자로 변환"하는 게 아니라 **해당 위치의 문자 하나를 꺼내는** 메서드다.
- `trim()`은 원래 문자열을 바꾸지 않는다. 공백이 제거된 **새 문자열을 돌려줄 뿐**이다.

---

## 2. 배열 — 같은 자료형 여러 개 묶기

### 왜 필요할까?

```java
int num1 = 1;
int num2 = 2;
int num3 = 3;
int num4 = 4;
int num5 = 5;
int sum = num1 + num2 + num3 + num4 + num5;
```

값 5개면 변수 5개, 100개면 변수 100개가 필요하다. 합계도 하나하나 더해야 한다. 변수는 **값 1개만** 담을 수 있기 때문이다.

### 한 줄 정의

> 배열은 **같은 자료형의 값 여러 개를 하나의 이름으로 묶고, index 번호로 꺼내 쓰는** 참조 자료형이다.

```java
자료형[] 변수명;          // 선언   예) int[] iarr;
변수명 = new 자료형[크기]; // 할당   예) iarr = new int[5];
```

### 실습 ① 배열 만들고 들여다보기

```java
int[] iarr = new int[5];

System.out.println("iarr =" + iarr);                 // iarr =[I@1b6d3586 (주소값)
System.out.println("iarr.length = " + iarr.length);  // 5
System.out.println(iarr[0]);                          // 0

int[] iarr2 = new int[10];
for (int i = 0; i < iarr2.length; i++) {
    System.out.println("iarr[" + i + "] 공간에 있는 값" + iarr2[i]);   // 전부 0
}
```

- `iarr`를 출력하면 값이 아니라 **주소값**이 나온다 → 배열은 참조 자료형이다.
- 값을 넣은 적이 없는데 `iarr[0]`이 `0`이다. 왜일까?

**heap 메모리는 빈칸이 있을 수 없다.** 그래서 JVM이 기본값을 자동으로 채운다.

| 타입 | 기본값 |
|---|---|
| 정수 (`int`, `long` …) | `0` |
| 실수 (`double`, `float`) | `0.0` |
| 논리 (`boolean`) | `false` |
| 참조 (`String`, 배열, 객체 …) | `null` |

배열의 가장 큰 장점은 **index가 0부터 1씩 증가**한다는 것이다. 그래서 반복문과 궁합이 아주 좋다.

### 실습 ② 점수 계산기

> 요구사항: 5명의 Java 점수를 입력받아 합계와 평균을 실수로 출력한다.

```java
Scanner sc = new Scanner(System.in);
int[] scores = new int[5];

for (int i = 0; i < scores.length; i++) {
    System.out.print((i + 1) + "번째 학생의 java 점수를 입력해주세요 : ");
    scores[i] = sc.nextInt();       // i번째 칸에 입력값 저장
}

double sum = 0;
double avg = 0.0;

for (int i = 0; i < scores.length; i++) {
    sum = sum + scores[i];          // sum += scores[i]; 와 같다
}
avg = sum / scores.length;

System.out.println("sum = " + sum);
System.out.println("avg = " + avg);
```

**실행 결과** (90, 80, 70, 100, 85 입력 시)

```
1번째 학생의 java 점수를 입력해주세요 : 90
2번째 학생의 java 점수를 입력해주세요 : 80
3번째 학생의 java 점수를 입력해주세요 : 70
4번째 학생의 java 점수를 입력해주세요 : 100
5번째 학생의 java 점수를 입력해주세요 : 85
sum = 425.0
avg = 85.0
```

학생이 100명이 되어도 `new int[5]`의 숫자만 바꾸면 나머지 코드는 그대로다. 이게 배열의 힘이다.

### ⚠️ 헷갈리기 쉬운 점

- **`arr.length`** (배열, 괄호 없음) vs **`str.length()`** (String, 괄호 있음)
- 마지막 index는 `length - 1`이다. `scores[5]`에 접근하면 `ArrayIndexOutOfBoundsException`.
- `sum`을 `int`로 선언하면 `sum / 5`가 **정수 나눗셈**이 되어 소수점이 잘린다. 그래서 `double sum`을 썼다.

### 다음 단계로

배열의 핵심은 **"같은 자료형"** 이다. 그럼 이름(String) + 나이(int) + 성별(char)처럼 **서로 다른 자료형**은 어떻게 하나로 묶을까?

---

## 3. 클래스 — 내가 만드는 자료형

### 왜 필요할까?

회원 정보를 관리하는 프로그램을 만든다고 해 보자.

```java
String id = "user01";
String pwd = "pass01";
String name = "gap";
int age = 20;
char gender = '여';
String[] hobby = {"웃기", "베이킹", "콘서트 감상"};
```

회원 **1명**인데 변수가 6개다. 자료형이 제각각이라 배열로도 못 묶는다. 이 방식의 문제점은:

1. 변수명을 전부 따로 관리해야 한다.
2. 회원 정보를 메서드에 넘기려면 **매개변수가 6개씩** 필요하다.
3. 메서드는 **값 1개만 return** 할 수 있어서 회원 정보를 통째로 돌려줄 수 없다.

### 한 줄 정의

> 클래스는 **서로 다른 자료형의 변수들을 하나로 묶어 새로운 자료형을 만드는 설계도**이고, `new`로 만들어 낸 실체를 **객체(인스턴스)** 라고 한다.

### 실습

```java
// Member.java
public class Member {
    // 메서드 밖, 클래스 안에 선언한 변수 = 필드 (인스턴스 변수, 속성)
    String id;
    String pwd;
    String name;
    int age;
    char gender;
    String[] hobby;
}
```

```java
// Application01.java
// 클래스명 변수명 = new 클래스명();
Member member = new Member();
System.out.println("member 의 이름: " + member.name);   // null
System.out.println("member 의 나이: " + member.age);    // 0

// 참조변수.필드명 으로 접근해서 값 대입
member.id = "user02";
member.hobby = new String[]{"야구시청", "배드민턴"};

System.out.println("member.id = " + member.id);         // user02
```

**실행 결과**

```
member 의 이름: null
member 의 나이: 0
member.id = user02
```

이제 회원 1명 = `member` 변수 1개다. 메서드에 넘길 때도, 돌려받을 때도 `member` 하나면 된다.

```
 stack                 heap
┌────────┐         ┌──────────────────────┐
│ member │ ──────▶ │ Member 객체           │
└────────┘         │  id     = "user02"   │
                   │  pwd    = null       │
                   │  name   = null       │
                   │  age    = 0          │
                   │  gender = '\u0000'   │
                   │  hobby  = ──▶ [배열]  │
                   └──────────────────────┘
```

### ⚠️ 헷갈리기 쉬운 점

- **클래스 = 설계도, 객체 = 설계도로 찍어낸 실물.** `new`를 할 때마다 새 객체가 하나씩 생긴다.
- 필드는 heap에 있으니 기본값(0, null …)이 자동으로 들어간다. 반면 메서드 안의 **지역변수는 기본값이 없어서** 초기화하지 않고 쓰면 컴파일 에러다.
- 지금처럼 필드에 아무것도 안 붙이면 다른 클래스에서 `member.age = -5`처럼 마음대로 바꿀 수 있다. → 5장에서 문제가 된다.

### 다음 단계로

필드를 `member.id = ...`, `member.pwd = ...` 처럼 한 줄씩 넣는 건 번거롭고 빠뜨리기도 쉽다. **객체를 만드는 순간 값을 한 번에 넣을 수는 없을까?**

---

## 4. 생성자와 this — 만들 때 바로 값 넣기

### 왜 필요할까?

객체를 만들고 나서 필드 6개를 한 줄씩 대입하는 건 번거롭다. **객체가 태어나는 순간** 필요한 값을 다 넣어 주고 싶다.

### 한 줄 정의

> 생성자는 `new`로 객체가 만들어지는 순간 **가장 먼저 자동으로 실행되는 특별한 메서드**로, 주로 필드를 초기화하는 데 쓴다.

```java
접근제한자 클래스명([매개변수]) { }
```

사실 지금까지 쓰던 `new Member()`의 `Member()` 부분이 **생성자를 호출하는 코드**였다.

생성자를 쓰는 목적
1. 객체 생성 시점에 꼭 실행해야 할 명령이 있을 때
2. 생성 시점에 필드를 초기화할 때
   - 매개변수 없는 생성자(기본 생성자) → 기본값으로 초기화
   - 매개변수 있는 생성자 → 전달받은 값으로 초기화

### 실습

```java
// Member.java
public class Member {
    String id;
    String pwd;
    String name;
    int age;
    char gender;
    String[] hobby;

    // 기본 생성자
    public Member() {
        System.out.println("기본생성자 동작함...");
    }

    // 매개변수 있는 생성자
    public Member(String id, String pwd, String name, int age, char gender, String[] hobby) {
        System.out.println("매개변수 있는 생성자 동작함..");
        this.id = id;           // this.id → 객체의 필드 / id → 전달받은 매개변수
        this.pwd = pwd;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.hobby = hobby;
    }

    // println(member) 했을 때 주소 대신 이 문자열이 출력되도록 재정의
    @Override
    public String toString() {
        return "Member{" +
                "id='" + id + '\'' +
                ", pwd='" + pwd + '\'' +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", gender=" + gender +
                ", hobby=" + Arrays.toString(hobby) +
                '}';
    }
}
```

```java
// Application01.java
System.out.println("main() 시작됨...");

Member member = new Member("user01", "pass01", "raccoon", 20, '남',
        new String[]{"탁구", "야구"});
System.out.println("member = " + member);

System.out.println("main() 종료됨...");
```

**실행 결과**

```
main() 시작됨...
매개변수 있는 생성자 동작함..
member = Member{id='user01', pwd='pass01', name='raccoon', age=20, gender=남, hobby=[탁구, 야구]}
main() 종료됨...
```

`new Member(...)`를 만나는 순간 ① heap에 객체가 만들어지고 ② 생성자가 실행되어 필드가 채워진다. 한 줄로 회원 객체가 완성된다.

### `this`는 뭘까?

> `this` = 지금 만들어진 **객체 자기 자신의 주소**

생성자 안에서 매개변수 이름(`id`)과 필드 이름(`id`)이 같으면, Java는 **가까운 지역변수(매개변수)를 우선**으로 본다. 그래서 `id = id;`라고 쓰면 매개변수에 매개변수를 넣는 의미 없는 코드가 된다. "이 객체의 필드"라고 콕 집어 주려면 `this.id`라고 써야 한다.

### ⚠️ 헷갈리기 쉬운 점

- 생성자는 **이름이 클래스명과 같고**, **반환 타입을 쓰지 않는다** (`void`도 안 쓴다).
- 생성자를 하나도 안 만들면 컴파일러가 **기본 생성자를 자동으로** 넣어 준다.
- 하지만 매개변수 있는 생성자를 **하나라도** 만들면 기본 생성자는 자동으로 안 생긴다. `new Member()`도 쓰고 싶다면 직접 작성해야 한다. (그래서 위 코드에 둘 다 있다.)
- `toString()`을 재정의하지 않으면 `println(member)`은 `Member@1b6d3586` 같은 주소 형태로 출력된다.

### 다음 단계로

생성자로 처음 값은 깔끔하게 넣을 수 있게 됐다. 하지만 필드는 여전히 열려 있어서, 나중에 누가 `member.age = -5`처럼 엉뚱한 값을 넣어도 막을 방법이 없다.

---

## 5. 캡슐화 — 필드를 숨기고 메서드로만

### 왜 필요할까?

이 단원은 몬스터 예제로 **문제 → 개선 → 또 문제 → 해결**의 4단계를 거친다.

| 단계 | 상황 | 남은 문제 |
|---|---|---|
| problem1 | 필드에 직접 대입 | 체력에 `-200` 같은 **잘못된 값**이 그냥 들어간다 |
| problem2 | 요구사항 변경으로 필드명 `name` → `kinds` | 필드를 직접 쓰던 **모든 곳이 동시에 컴파일 에러** |
| problem3 | `setHp()`, `setName()`, `getInfo()` 메서드로 접근 | 그래도 `monster3.hp = -5500;` 처럼 **직접 접근이 여전히 가능** |
| solved | 필드에 `private` | ✅ 외부에서 필드 접근 자체가 불가능 |

#### problem1 — 검증되지 않은 값

```java
public class Monster {
    String name;
    int hp;

    public void setHp(int hp) {
        if (hp >= 0) {
            System.out.println("정상 값입니다." + "몬스터의 체력을" + hp + "로 설정합니다.");
            this.hp = hp;
        } else {
            System.out.println("삐빅... 오류 발생" + "잘못된 값이 탐지되어 hp를 0으로 강제합니다.");
            this.hp = 0;
        }
    }
}
```

```java
Monster monster2 = new Monster();
monster2.name = "피카츄";
monster2.hp = -200;            // ❌ 검증 없이 그대로 들어간다
System.out.println("monster2.hp = " + monster2.hp);   // -200

Monster monster3 = new Monster();
monster3.name = "갸라도스";
monster3.setHp(-300);          // ✅ 메서드를 거치면 검증된다
System.out.println("monster3.hp = " + monster3.hp);   // 0
```

`setHp()`라는 검증 메서드가 있어도, 필드에 **직접** 대입하면 아무 소용이 없다.

#### problem2 — 필드명 변경의 파급

```java
public class Monster {
    // String name;   요구사항 변경으로
    String kinds;  // name → kinds 로 이름이 바뀌었다
    int hp;
}
```

`monster1.name = "성원몬";`처럼 필드를 직접 쓰던 코드가 **전부** 컴파일 에러가 난다. 사용하는 곳이 100군데면 100군데를 고쳐야 한다.

#### problem3 — 메서드로 접근하기

```java
public class Monster {
    String kinds;
    int hp;

    public void setHp(int hp) { /* 위와 동일한 검증 */ }

    public void setName(String name) {   // 외부에서는 "name"으로 부르지만
        this.kinds = name;               // 내부 필드명은 kinds
    }

    public String getInfo() {
        return "몬스터의 이름은 " + this.kinds + "이고, 체력은" + this.hp + "입니다.";
    }
}
```

```java
Monster monster3 = new Monster();
monster3.setName("갸라도스");
monster3.setHp(-300);
System.out.println(monster3.getInfo());

monster3.hp = -5500;   // 😱 그런데 이게 아직도 된다
```

메서드를 통해 접근하니 ① 값 검증도 되고 ② 필드명이 바뀌어도 `setName()` 안쪽만 고치면 된다. **하지만 필드가 열려 있어서** 누군가 메서드를 무시하고 직접 접근하는 걸 막을 수 없다.

#### problem_solved — `private`으로 완성

```java
public class Monster {
    private String kinds;   // private: Monster 클래스 안에서만 접근 가능
    private int hp;

    public void setHp(int hp) {
        if (hp >= 0) {
            System.out.println("정상 값입니다." + "몬스터의 체력을" + hp + "로 설정합니다.");
            this.hp = hp;
        } else {
            System.out.println("삐빅... 오류 발생. 잘못된 값이 탐지되어 hp를 0으로 강제합니다.");
            this.hp = 0;
        }
    }

    public void setName(String name) {
        this.kinds = name;
    }

    public String getInfo() {
        return "몬스터의 이름은 " + this.kinds + "이고, 체력은" + this.hp + "입니다.";
    }
}
```

```java
Monster monster3 = new Monster();
monster3.setName("갸라도스");
monster3.setHp(-300);
System.out.println(monster3.getInfo());
// monster3.hp = -5500;   // ❌ 컴파일 에러: hp has private access in Monster
```

**실행 결과**

```
삐빅... 오류 발생. 잘못된 값이 탐지되어 hp를 0으로 강제합니다.
몬스터의 이름은 갸라도스이고, 체력은0입니다.
```

### 한 줄 정의

> 캡슐화는 **필드를 `private`으로 숨기고, 검증 로직이 들어간 `public` 메서드로만 접근하게 하는 것**이다.

### 접근제한자 정리

| 제한자 | 같은 클래스 | 같은 패키지 | 자식 클래스 | 전체 |
|---|:-:|:-:|:-:|:-:|
| `public` | O | O | O | O |
| `protected` | O | O | O | X |
| (default, 안 씀) | O | O | X | X |
| `private` | O | X | X | X |

### ⚠️ 헷갈리기 쉬운 점

- **메서드만 만든다고 캡슐화가 아니다.** problem3처럼 필드가 열려 있으면 소용없다. `private`까지 붙여야 완성이다.
- 캡슐화로 얻는 이점은 두 가지다.
  1. **잘못된 값 방지** — 메서드 안에서 검증
  2. **변경에 강함** — 내부 필드명을 바꿔도 외부 코드는 그대로
- 값을 넣는 메서드는 보통 `setXxx()`(**setter**), 꺼내는 메서드는 `getXxx()`(**getter**)라고 부른다.

### 다음 단계로

"필드는 숨기고 메서드로 소통한다"는 객체지향의 기본 규칙이 생겼다. 그럼 **어떤 필드와 어떤 메서드를 만들지**는 어떻게 정할까?

---

## 6. 추상화 — 필요한 것만 뽑아서 설계하기

### 왜 필요할까?

현실의 자동차에는 색상, 연비, 타이어 공기압, 라디오 채널… 수천 가지 속성이 있다. 이걸 전부 코드로 옮기면 너무 방대하고 복잡하다. **이 프로그램의 목적에 필요한 것만** 골라내야 한다.

### 한 줄 정의

> 추상화는 복잡한 현실 세계에서 **프로그램 목적에 필요한 공통 부분만 추출하고, 나머지는 제거해서** 단순화하는 것이다.

### 실습: 카레이서가 자동차를 운전하는 프로그램

#### Step 1. 요구사항 작성

1. 자동차는 처음에 멈춘 상태로 대기한다.
2. 카레이서는 먼저 자동차에 시동을 건다. 이미 걸려 있다면 다시 시동을 걸 수 없다.
3. 카레이서가 엑셀을 밟으면, 시동이 걸려 있다면 시속이 10km/h 증가하며 앞으로 나간다.
4. 자동차가 달리고 있는 중이면 브레이크를 밟을 시 시속이 0으로 떨어지며 멈춘다.
5. 브레이크를 밟을 때 자동차가 달리는 중이 아니라면 이미 멈춰 있는 상태라고 안내한다.
6. 카레이서가 시동을 끄면 더 이상 자동차는 움직이지 않는다.
7. 자동차가 달리는 중이라면 시동을 끌 수 없다.

#### Step 2. 요구사항에서 클래스·메서드·필드 뽑기

| 찾는 방법 | 결과 |
|---|---|
| **은/는/이/가** 앞의 명사 → 클래스 후보 | `CarRacer`(카레이서), `Car`(자동차) |
| 객체가 **해야 할 일**(동사) → 메서드 후보 | 카레이서: 시동 걸기, 엑셀 밟기, 브레이크 밟기, 시동 끄기<br>자동차: 시동 걸기, 앞으로 가기, 멈추기, 시동 끄기 |
| **변하는 상태** → 필드 후보 | 속력 `speed`, 시동 여부 `isOn` |

#### Step 3. 코드로 옮기기

```java
// Car.java
public class Car {

    private int speed;      // 현재 속력 (기본값 0 → 요구사항 1 "처음엔 멈춘 상태")
    private boolean isOn;   // 시동 여부 (기본값 false)

    public void startUp() {
        if (isOn) {
            System.out.println("⚠️ 시동이 이미 걸려 있습니다. ⚠️");          // 요구사항 2
        } else {
            this.isOn = true;
            System.out.println("🚗 시동 걸기 완료!! 출발 준비 OK 🚗");
        }
    }

    public void go() {
        if (isOn) {
            System.out.println("👌차가 출발합니다~👌");
            this.speed += 10;                                                // 요구사항 3
            System.out.println("😊현재 차의 속력은 " + this.speed + "(km/h) 입니다.😊");
        } else {
            System.out.println("❌차의 시동이 걸려있지 않습니다. 시동 확인해주세요!!❌");
        }
    }

    public void stop() {
        if (isOn) {
            if (speed > 0) {
                this.speed = 0;                                              // 요구사항 4
                System.out.println("🖐️끼~~~~익 브레이크 밟기 OK. 차는 멈췄습니다.🖐️");
            } else {
                System.out.println("차는 이미 멈춰있습니다!!");               // 요구사항 5
            }
        } else {
            System.out.println("⭐차에 시동이 걸려있지 않습니다! 시동부터 확인해주세요!⭐");
        }
    }

    public void turnOff() {
        if (isOn) {
            if (speed > 0) {
                System.out.println("😔달리는 상태에서는 시동을 끌 수 없습니다. 차를 먼저 멈춰주세요😔"); // 요구사항 7
            } else {
                this.isOn = false;                                           // 요구사항 6
                System.out.println("😊시동이 꺼집니다. 다시 운행하고 싶으면 시동을 켜주세요!!😊");
            }
        } else {
            System.out.println("이미 시동이 꺼져있습니다!");
        }
    }
}
```

```java
// CarRacer.java
public class CarRacer {

    // 클래스도 자료형이므로 필드로 선언할 수 있다.
    // private → Car는 CarRacer만 다룰 수 있고, Application은 Car에 직접 접근할 수 없다.
    private Car car = new Car();

    public void startUp()   { car.startUp(); }  // "시동 걸어"   → 자동차에게 "시동 걸어"
    public void stepAccel() { car.go(); }       // "엑셀 밟아"   → 자동차에게 "앞으로 가"
    public void stepBreak() { car.stop(); }     // "브레이크 밟아" → 자동차에게 "멈춰"
    public void turnOff()   { car.turnOff(); }  // "시동 꺼"     → 자동차에게 "시동 꺼"
}
```

```java
// Application.java
Scanner sc = new Scanner(System.in);
CarRacer racer = new CarRacer();

while (true) {
    System.out.println("==========카레이싱 프로그램==========");
    System.out.println("1. 시동 걸기");
    System.out.println("2. 전진!");
    System.out.println("3. 정지");
    System.out.println("4. 시동 끄기");
    System.out.println("9. 프로그램 종료");
    System.out.println("==================================");
    System.out.print("메뉴를 선택해주세요 : ");

    int no = sc.nextInt();

    switch (no) {
        case 1: racer.startUp();   break;
        case 2: racer.stepAccel(); break;
        case 3: racer.stepBreak(); break;
        case 4: racer.turnOff();   break;
        case 9: break;
        default: System.out.println("잘못된 번호 입력!"); break;
    }

    if (no == 9) {
        System.out.println("프로그램을 종료합니다...");
        break;
    }
}
```

**실행 예시** (메뉴 2 → 1 → 2 → 2 → 4 → 3 → 4 → 9)

```
❌차의 시동이 걸려있지 않습니다. 시동 확인해주세요!!❌
🚗 시동 걸기 완료!! 출발 준비 OK 🚗
👌차가 출발합니다~👌
😊현재 차의 속력은 10(km/h) 입니다.😊
👌차가 출발합니다~👌
😊현재 차의 속력은 20(km/h) 입니다.😊
😔달리는 상태에서는 시동을 끌 수 없습니다. 차를 먼저 멈춰주세요😔
🖐️끼~~~~익 브레이크 밟기 OK. 차는 멈췄습니다.🖐️
😊시동이 꺼집니다. 다시 운행하고 싶으면 시동을 켜주세요!!😊
프로그램을 종료합니다...
```

#### 객체 간 메시지 흐름

```
Application ──"시동 걸어"──▶ CarRacer ──"시동 걸어"──▶ Car
            ──"엑셀 밟아"──▶          ──"앞으로 가"──▶
            ──"브레이크"───▶          ──"멈춰"──────▶
```

각 객체는 **자기 일만** 하고, 필요한 건 다른 객체에게 **메시지(메서드 호출)** 로 부탁한다. 이게 객체지향 프로그램이 돌아가는 방식이다.

### ⚠️ 헷갈리기 쉬운 점

- 추상화는 문법이 아니라 **설계하는 생각법**이다. 특정 키워드가 있는 게 아니다.
- 나중에 배울 **추상 클래스(`abstract class`)** 와 이름은 비슷하지만 다른 이야기다.
- 클래스도 자료형이므로 `private Car car;`처럼 **다른 클래스의 필드**로 넣을 수 있다.
- **추상화(무엇을 만들지 정함) + 캡슐화(안전하게 만듦)** 는 한 세트로 생각하자.

---

## 7. 오버로딩 — 같은 이름, 다른 매개변수

### 왜 필요할까?

"출력한다"는 같은 일인데 정수용 `printInt()`, 문자열용 `printString()`, 실수용 `printDouble()`처럼 이름을 다 따로 지어야 한다면 외우기도, 쓰기도 불편하다.
실제로 우리가 매일 쓰는 `System.out.println()`은 int, String, double을 전부 받는다. 오버로딩 덕분이다.

### 한 줄 정의

> 오버로딩은 **같은 이름의 메서드를 매개변수(개수·타입·순서)만 다르게 여러 개 정의하는 것**이다.

### 메서드 시그니처

Java는 메서드를 **시그니처 = 메서드명 + 매개변수 목록**으로 구별한다. 시그니처가 같으면 "같은 메서드를 두 번 만들었다"고 보고 에러를 낸다.

### 실습

```java
public class OverloadingTest {

    public void test() {}                        // 기준 메서드

    // public void test() {}                     // ❌ 시그니처 완전히 동일
    // private void test() {}                    // ❌ 접근제한자만 다름 → 시그니처 동일
    // private int test() { return 0; }          // ❌ 반환타입만 다름 → 시그니처 동일

    private void test(int num) {}                // ✅ 매개변수 유무가 다름
    // private void test(int num2) {}            // ❌ 매개변수 "이름"은 시그니처에 포함 X
    private void test(int num, String str) {}    // ✅ 매개변수 개수가 다름
    private void test(String str, int num) {}    // ✅ 매개변수 순서(타입 순서)가 다름

    private void test2() {}                      // ✅ 이름이 다르면 아예 다른 메서드
}
```

| 바꾼 것 | 오버로딩 성립? |
|---|:-:|
| 매개변수 개수 | ✅ |
| 매개변수 타입 | ✅ |
| 매개변수 순서 | ✅ |
| 매개변수 이름만 | ❌ |
| 반환타입만 | ❌ |
| 접근제한자만 | ❌ |

### ⚠️ 헷갈리기 쉬운 점

- 판단 기준은 딱 하나: **"호출하는 쪽에서 구별이 되는가?"**
  `test()`를 호출할 때 `int test()`인지 `void test()`인지 호출 코드만 보고는 알 수 없다. 그래서 반환타입만 다른 건 안 된다.
- 4장의 생성자 `Member()`와 `Member(String, String, ...)`가 함께 있을 수 있었던 것도 **생성자 오버로딩**이다.
- 11장의 **오버라이딩**과 이름이 비슷하지만 완전히 다른 개념이다. (11장에 비교표)

---

## 8. static — 객체가 아닌 클래스에 붙는 것

### 왜 필요할까?

필드는 객체마다 따로 생긴다. 그런데 "지금까지 만들어진 객체 수"나 "모두가 함께 쓰는 설정값"처럼 **객체마다가 아니라 딱 하나만 있어야 하는 값**이 필요할 때가 있다.

### 한 줄 정의

> `static`이 붙은 필드·메서드는 객체가 아니라 **클래스에 속하며**, 애플리케이션 시작 시점에 한 번 만들어져 **모든 객체가 공유**한다.

### 실습

```java
// StaticFieldTest.java
public class StaticFieldTest {

    private int nonStaticInt;          // 일반 필드: 객체마다 하나씩
    private static int staticInt;      // static 필드: 클래스에 딱 하나

    public StaticFieldTest() {}

    public int getNonStaticInt() { return nonStaticInt; }
    public static int getStaticInt() { return staticInt; }

    public void increaseNonStatic() {
        this.nonStaticInt++;             // 이 객체의 값 증가
    }

    public void increaseStatic() {
        StaticFieldTest.staticInt++;     // 클래스명.변수명 으로 접근 (this 사용 X)
    }
}
```

```java
// Application.java
StaticFieldTest str1 = new StaticFieldTest();
System.out.println("non-static 변수값 확인 : " + str1.getNonStaticInt());
System.out.println("static 변수값 확인 : " + StaticFieldTest.getStaticInt()); // 클래스명.메서드명()

str1.increaseNonStatic();
str1.increaseStatic();

System.out.println("non-static 변수값 확인 : " + str1.getNonStaticInt());
System.out.println("static 변수값 확인 : " + StaticFieldTest.getStaticInt());

StaticFieldTest str2 = new StaticFieldTest();   // 새 객체
System.out.println("st2 = non-static 변수값 확인 : " + str2.getNonStaticInt());
System.out.println("st2 = static 변수값 확인 : " + StaticFieldTest.getStaticInt());
```

**실행 결과**

```
non-static 변수값 확인 : 0
static 변수값 확인 : 0
non-static 변수값 확인 : 1
static 변수값 확인 : 1
st2 = non-static 변수값 확인 : 0     ← str2만의 필드라 새로 0
st2 = static 변수값 확인 : 1         ← 공유 값이라 str1이 올린 1이 그대로
```

```
        클래스 영역 (static)
        ┌──────────────────┐
        │ staticInt = 1    │ ◀── 모두가 공유
        └──────────────────┘
              ▲        ▲
   ┌──────────┴──┐  ┌──┴───────────┐
   │ str1 객체    │  │ str2 객체     │
   │ nonStatic=1 │  │ nonStatic=0  │   ← 각자 따로
   └─────────────┘  └──────────────┘
```

### ⚠️ 헷갈리기 쉬운 점

- **static 메서드 안에서는 `this`를 쓸 수 없다.** `this`는 "특정 객체"를 가리키는데, static은 객체가 없어도 존재하기 때문이다.
- `main()`이 `static`인 이유도 같다. 객체를 하나도 만들기 전에 프로그램이 시작되어야 하니까.
- **생명주기가 다르다.** 일반 필드는 객체와 함께 생기고 사라지지만, static은 프로그램 시작부터 끝까지 유지된다.

---

## 9. 싱글톤 패턴 — 객체를 딱 하나만

### 왜 필요할까?

TV 리모컨처럼 **하나만 있으면 되는 객체**를 여기저기서 `new`로 계속 만들면 메모리가 낭비되고, 서로 다른 리모컨이 다른 상태를 가지는 혼란도 생긴다.

### 한 줄 정의

> 싱글톤은 애플리케이션이 실행될 때 **클래스의 객체를 최초 한 번만 만들고, 그 하나를 공유해서 쓰도록 보장하는 디자인 패턴**이다.

### 싱글톤의 3요소

1. **`private` 생성자** → 외부에서 `new` 금지
2. **`private static` 자기 자신 타입 필드** → 유일한 객체를 보관
3. **`public static getInstance()`** → 외부는 이 메서드로만 객체를 얻음

### 실습 ① 이른 초기화 (Eager)

```java
public class EagerSingleton {

    // 클래스가 로딩될 때 바로 객체 1개 생성
    private static EagerSingleton eager = new EagerSingleton();

    private EagerSingleton() {}

    public static EagerSingleton getInstance() {
        return eager;              // 항상 같은 객체 반환
    }
}
```

### 실습 ② 게으른 초기화 (Lazy)

```java
public class LazySingleton {

    private static LazySingleton lazy;     // 처음엔 null

    private LazySingleton() {}

    public static LazySingleton getInstance() {
        if (lazy == null) {                // 처음 요청이 왔을 때만
            lazy = new LazySingleton();    //   객체 생성
        }
        return lazy;                       // 이후로는 만들어 둔 것을 반환
    }
}
```

### 실행

```java
// EagerSingleton e = new EagerSingleton();   // ❌ 생성자가 private
EagerSingleton eager1 = EagerSingleton.getInstance();
EagerSingleton eager2 = EagerSingleton.getInstance();
System.out.println("eager1의 hashcode() : " + eager1.hashCode());
System.out.println("eager2의 hashcode() : " + eager2.hashCode());

LazySingleton lazy1 = LazySingleton.getInstance();
LazySingleton lazy2 = LazySingleton.getInstance();
System.out.println("lazy1의 hashcode() : " + lazy1.hashCode());
System.out.println("lazy2의 hashcode() : " + lazy2.hashCode());
```

**실행 결과** (숫자는 실행할 때마다 다르다)

```
eager1의 hashcode() : 460141958
eager2의 hashcode() : 460141958   ← 같은 객체
lazy1의 hashcode() : 1163157884
lazy2의 hashcode() : 1163157884   ← 같은 객체
```

### Eager vs Lazy

| | Eager (이른 초기화) | Lazy (게으른 초기화) |
|---|---|---|
| 생성 시점 | 클래스가 로딩될 때 | 처음 `getInstance()`를 호출할 때 |
| 장점 | 코드가 단순하다 | 한 번도 안 쓰면 아예 안 만든다 |
| 단점 | 안 써도 메모리를 차지한다 | `null` 체크가 필요하다 |

### ⚠️ 헷갈리기 쉬운 점

- 3요소는 **세트**다. 하나라도 빠지면 싱글톤이 깨진다.
- `getInstance()`가 `static`이어야 하는 이유: 외부에서는 객체를 만들 수 없으니, **객체 없이도 호출할 수 있어야** 하기 때문이다.
- 싱글톤 = 5장의 `private`(접근 제한) + 8장의 `static`(하나만 존재)의 응용이다.

---

## 10. final — 한 번 정하면 못 바꾼다

### 왜 필요할까?

학번, 주민번호, 원주율처럼 한 번 정해지면 **절대 바뀌면 안 되는 값**이 실수로 바뀌는 것을 **컴파일 단계에서** 막고 싶다.

### 한 줄 정의

> `final`은 **최초 초기화 이후에는 다시 대입할 수 없게** 만드는 키워드다.

### 실습

```java
public class FinalFieldTest {

    // 방법 ① 선언과 동시에 초기화
    private final int NON_STATIC_NUM = 1;

    // 방법 ② 선언만 하고, 생성자에서 반드시 초기화
    private final int NON_STATIC_NUM2;

    public FinalFieldTest(int num) {
        this.NON_STATIC_NUM2 = num;
    }

    public int getNON_STATIC_NUM()  { return NON_STATIC_NUM; }
    public int getNON_STATIC_NUM2() { return NON_STATIC_NUM2; }

    // public void setNON_STATIC_NUM(int num) {
    //     this.NON_STATIC_NUM = num;   // ❌ 이미 1로 정해져서 재대입 불가 → 컴파일 에러
    // }
}
```

```java
FinalFieldTest f = new FinalFieldTest(3);   // 생성자를 통해 NON_STATIC_NUM2 = 3 으로 확정
```

### final 필드 초기화 규칙

| 방법 | 가능? | 이유 |
|---|:-:|---|
| 선언과 동시에 초기화 | ✅ | 값이 바로 정해진다 |
| 선언만 하고 생성자에서 초기화 | ✅ | 생성자는 객체 생성 시 **반드시 가장 먼저** 실행되니 초기화가 보장된다 |
| 선언만 하고 아무 데서도 초기화 안 함 | ❌ | JVM 기본값(0)이 "컴퓨터 마음대로" 들어가는 것을 허용하지 않는다 |
| 초기화 후 다시 대입 | ❌ | final의 존재 이유 |

### ⚠️ 헷갈리기 쉬운 점

- 기본값 0을 쓰고 싶다면 `private final int NUM = 0;`처럼 **직접** 써야 한다.
- 이름은 관례상 **대문자 + `_`(언더바)** 로 짓는다. 예) `MAX_SIZE`, `NON_STATIC_NUM`
- `final`은 필드에만 붙는 게 아니다.
  - `final` 클래스 → **상속 불가**
  - `final` 메서드 → **오버라이딩 불가**

### 다음 단계로

지금까지는 **클래스 하나를 잘 만드는 법**이었다. 이제부터는 **클래스와 클래스 사이의 관계**를 다룬다.

---

## 11. 상속 — 부모 코드 물려받기

### 왜 필요할까?

`Car`(자동차)와 `CapsCar`(경찰차)를 따로 만들면 `run()`, `stop()`, `soundHorn()`, `isRunning()`을 **두 번 똑같이** 써야 한다. 차 종류가 10개면 10번이다. 공통 로직을 고치려면 10곳을 다 고쳐야 한다.

> 부모의 돈은 내 돈이고, 내 돈은 내 돈이다. 🙃
> → 부모의 필드·메서드를 자식이 물려받는다.

### 한 줄 정의

> 상속은 `extends`로 **부모 클래스의 필드와 메서드를 자식 클래스가 물려받아 재사용**하는 것이고, 다르게 동작해야 하는 메서드만 **오버라이딩(재정의)** 한다.

### 실습

```java
// Car.java (부모)
public class Car {

    private boolean runningStatus;   // 달리는 중인지

    public Car() {
        System.out.println("Car 클래스의 기본생성자 호출됨...");
    }

    public void run() {
        runningStatus = true;
        System.out.println("자동차가 달려갑니다~~~~~~");
    }

    public boolean isRunning() {
        return runningStatus;
    }

    public void soundHorn() {
        if (isRunning()) {
            System.out.println("빵~~~~~~~~빵!!");
        } else {
            System.out.println("주행 중이 아니여서 경적을 울릴 수 없습니다.");
        }
    }

    public void stop() {
        runningStatus = false;
        System.out.println("자동차가 멈춥니다...");
    }
}
```

```java
// CapsCar.java (자식) — 경찰차는 차다 (IS-A 관계 성립)
public class CapsCar extends Car {

    public CapsCar() {
        System.out.println("CapsCar의 기본생성자 호출됨..");
    }

    @Override
    public void run() {             // 선언부는 부모와 같고, 몸체만 새로 작성
        System.out.println("경찰차는 삐용삐용~~~ 하면서 달립니다");
    }

    @Override
    public void soundHorn() {
        System.out.println("삐~~~~~~~~~~~용~~~~~~~~~~~~삐~~~~~~~~~~~");
    }

    // 부모에게 없는 자식만의 메서드 (부모가 모르는 비상금 💰)
    public void 무전하기() {
        System.out.println("치지지ㅣ...421에 성원몬 등장");
    }
}
```

`stop()`, `isRunning()`은 `CapsCar`에 한 줄도 안 썼지만 **물려받았기 때문에** 그대로 쓸 수 있다.

```java
// Application.java
Car car = new Car();
car.soundHorn();
car.run();
car.soundHorn();
car.isRunning();
car.stop();
car.soundHorn();
System.out.println("===============================");

CapsCar capsCar = new CapsCar();
capsCar.run();
capsCar.soundHorn();
capsCar.stop();
capsCar.무전하기();
```

**실행 결과**

```
Car 클래스의 기본생성자 호출됨...
주행 중이 아니여서 경적을 울릴 수 없습니다.
자동차가 달려갑니다~~~~~~
빵~~~~~~~~빵!!
자동차가 멈춥니다...
주행 중이 아니여서 경적을 울릴 수 없습니다.
===============================
Car 클래스의 기본생성자 호출됨...        ← 부모 생성자가 먼저!
CapsCar의 기본생성자 호출됨..
경찰차는 삐용삐용~~~ 하면서 달립니다     ← 오버라이딩된 자식 버전
삐~~~~~~~~~~~용~~~~~~~~~~~~삐~~~~~~~~~~~ ← 오버라이딩된 자식 버전
자동차가 멈춥니다...                    ← 자식에 없으니 부모 버전
치지지ㅣ...421에 성원몬 등장            ← 자식 고유 메서드
```

> `car.isRunning()`은 값을 반환만 하고 출력하지 않아서 결과에 아무것도 안 찍힌다.

### 오버라이딩(Override)이란?

> 부모의 메서드 **선언부는 그대로** 두고, 자식이 원하는 대로 동작하도록 **몸체만 새로 작성**하는 것

### this vs super

| 키워드 | 의미 | 예 |
|---|---|---|
| `this` | 나(자식) 객체 자신 | `this.run()` → 자식 버전 |
| `super` | 부모 부분 | `super.run()` → 부모 버전 |
| `super()` | 부모 생성자 호출 | 자식 생성자 첫 줄에 **자동으로** 들어간다 |

### ⚠️ 헷갈리기 쉬운 점

- **자식 객체를 만들면 부모 생성자 → 자식 생성자 순서로 실행된다.** 자식 생성자 첫 줄에 `super();`가 숨어 있기 때문이다.
- 부모의 `private` 필드(`runningStatus`)는 자식이 **직접** 접근할 수 없다. 부모의 `public` 메서드를 통해서만 쓴다. 캡슐화는 상속 관계에서도 유지된다.
- 🔍 **놓치기 쉬운 부분**: `CapsCar`의 `run()`은 부모 `run()`을 완전히 덮어써서 `runningStatus = true`가 실행되지 않는다. 그래서 `capsCar.run()` 후에 `capsCar.isRunning()`을 호출하면 `false`가 나온다. 부모의 동작도 유지하고 싶다면 오버라이딩한 메서드 안에서 `super.run();`을 먼저 호출하면 된다.
- 자식 고유 메서드는 자식 타입으로만 호출할 수 있다. `car.무전하기()`는 에러, `capsCar.무전하기()`만 된다.
- `@Override`는 안 써도 동작하지만, 쓰면 부모와 선언부가 다를 때(오타 등) 컴파일러가 잡아준다. **꼭 붙이자.**

### 오버로딩 vs 오버라이딩

| | 오버로딩 (7장) | 오버라이딩 (11장) |
|---|---|---|
| 어디서 | 같은 클래스 안 | 부모 ↔ 자식 |
| 메서드명 | 같음 | 같음 |
| 매개변수 | **달라야** 함 | **같아야** 함 |
| 반환타입 | 상관없음 | 같아야 함 |
| 목적 | 같은 기능, 다른 입력 | 같은 기능, 다른 동작 |

---

## 12. 다형성 — 부모 타입 하나로 자식들 다루기

### 왜 필요할까?

동물원에 너구리와 코알라가 있고, 모두 울게 하고 싶다. 다형성이 없다면 `Raccoon` 배열, `Koala` 배열을 따로 만들고 반복문도 따로 돌려야 한다. 동물 종류가 늘어날수록 코드도 계속 늘어난다.

### 한 줄 정의

> 다형성은 **하나의 객체가 여러 타입을 가질 수 있는 것**이다. 그래서 **하나의 타입으로 여러 타입의 객체를 처리**할 수 있고, **같은 메서드 호출로 객체마다 다르게 동작**하게 할 수 있다.

### 실습

```java
// Animal.java (부모)
public class Animal {
    public void eat()  { System.out.println("동물이 먹이를 먹습니다.."); }
    public void run()  { System.out.println("동물이 초원을 뛰어다닙니다.."); }
    public void bark() { System.out.println("동물이 울부짖습니다.."); }
}
```

```java
// Raccoon.java (자식 1)
public class Raccoon extends Animal {
    @Override public void eat()  { System.out.println("너구리가 너구리라면을 먹습니다.."); }
    @Override public void run()  { System.out.println("너구리가 쓰레기통으로 잽싸게 뛰어갑니다.."); }
    @Override public void bark() { System.out.println("너굴너굴 너굴맨.."); }

    public void bite() { System.out.println("분노한 너구리가 깨물기 시작합니다.."); }  // 너구리만의 기능
}
```

```java
// Koala.java (자식 2)
public class Koala extends Animal {
    @Override public void eat()  { System.out.println("코알리가 유칼리투스 잎을 먹습니다.."); }
    @Override public void run()  { System.out.println("코알라가 다른 나무로 폴~짝 뜁니다.."); }
    @Override public void bark() { System.out.println("코알코알"); }

    public void sleep() { System.out.println("코알라는 하루에 20시간을 잡니다..zzz"); }  // 코알라만의 기능
}
```

#### IS-A 관계로 생각하기

```
너구리는 동물이다  (O)  →  Animal a = new Raccoon();   ✅
동물은 너구리다    (X)  →  Raccoon r = new Animal();   ❌ 컴파일 에러
```

자식은 부모가 가진 걸 **전부 + 알파**로 가지고 있다. 그래서 부모 타입 변수에 자식 객체를 담는 건 문제가 없지만, 그 반대는 "알파" 부분이 비어 있어서 안 된다.

```java
Animal a1 = new Raccoon();   // 부모 타입 변수에 자식 객체 (업캐스팅, 자동)

a1.bark();                   // "너굴너굴 너굴맨.."  ← Animal이 아니라 Raccoon 버전 실행!
// a1.bite();                // ❌ 컴파일 에러: Animal 타입에는 bite()가 없다
((Raccoon) a1).bite();       // ✅ Raccoon으로 형변환(다운캐스팅)하면 호출 가능

// Raccoon r1 = new Animal(); // ❌ 동물은 너구리가 아니다
```

**실행 결과**

```
너굴너굴 너굴맨..
분노한 너구리가 깨물기 시작합니다..
```

### 동적 바인딩 — `a1.bark()`에서 일어나는 일

| 시점 | 누가 보나 | 무엇을 보나 | 결과 |
|---|---|---|---|
| **컴파일** | 컴파일러 | 변수 타입 `Animal` | "Animal에 `bark()` 있네? OK" |
| **실행(런타임)** | JVM | 실제 객체 `Raccoon` | Raccoon이 오버라이딩한 `bark()` 실행 |

> 📌 **"무엇을 호출할 수 있나"는 변수 타입이, "실제로 어떻게 동작하나"는 객체 타입이 정한다.**

컴파일 시점에는 `Animal`의 메서드와 연결되어 있다가, 런타임에 실제 객체(Raccoon)가 오버라이딩한 메서드로 바뀌어 실행되는 것. 이걸 **동적 바인딩**이라고 한다.

### 다형성의 진짜 활용

```java
Animal[] zoo = { new Raccoon(), new Koala() };   // 서로 다른 동물을 한 배열에

for (Animal a : zoo) {
    a.bark();
}
```

```
너굴너굴 너굴맨..
코알코알
```

동물이 100종류로 늘어나도 이 반복문은 **한 글자도 바꿀 필요가 없다.** 이게 다형성의 힘이다.

### ⚠️ 헷갈리기 쉬운 점

- **업캐스팅**(자식 → 부모 타입)은 자동, **다운캐스팅**(부모 → 자식 타입)은 `(Raccoon)`처럼 직접 써야 한다.
- 실제 객체가 Raccoon인데 `(Koala)`로 형변환하면 컴파일은 되지만 실행 중에 `ClassCastException`이 터진다. 안전하게 하려면 먼저 확인하자.

  ```java
  if (a1 instanceof Raccoon) {
      ((Raccoon) a1).bite();
  }
  ```
- 다형성은 **상속 + 오버라이딩**이 있어야 성립한다.

### 다음 단계로

생각해 보면 `Animal` 클래스의 `bark()` 몸체("동물이 울부짖습니다..")는 쓸 일이 없다. 자식들이 어차피 다 재정의하니까. 게다가 자식이 `bark()` 재정의를 깜빡해도 컴파일러는 아무 말도 안 한다.
**몸체 없이 "이 메서드는 반드시 만들어라"라는 규칙만 정할 수는 없을까?**

---

## 13. 인터페이스 — 반드시 구현할 메서드 강제하기

### 한 줄 정의

> 인터페이스는 **구현 클래스가 반드시 가져야 할 메서드(Can-Do)를 선언만 해서 강제하는 규칙표**다.

### 실습

```java
// Animal.java
public interface Animal {           // class 대신 interface

    // public Animal() {}           // ❌ 인터페이스는 생성자를 가질 수 없다
    // public void test() {}        // ❌ 몸체({})가 있는 일반 메서드 불가

    void run();                     // 선언만 있고 몸체 없음 → "run()을 할 수 있어야 한다"
    void eat();
    void bark();
}
```

```java
// Raccoon.java
public class Raccoon implements Animal {   // 인터페이스는 extends가 아니라 implements

    @Override
    public void run() {
        System.out.println("너구리가 폴짝폴짝 뛰어댕깁니다..");
    }

    @Override
    public void eat() { }           // 내용이 비어 있어도 "구현"은 해야 한다

    @Override
    public void bark() { }          // 셋 중 하나라도 빠지면 컴파일 에러
}
```

```java
// Application.java
// Animal animal = new Animal();   // ❌ 인터페이스는 몸체가 없어서 new 불가
Animal animal = new Raccoon();     // ✅ 구현 클래스로 객체를 만들고, 인터페이스 타입 변수에 담는다 → 다형성
animal.run();                      // 너구리가 폴짝폴짝 뛰어댕깁니다..
```

### 클래스 상속 vs 인터페이스

| | 클래스 상속 (`extends`) | 인터페이스 (`implements`) |
|---|---|---|
| 관계 | IS-A (~는 ~이다) | CAN-DO (~할 수 있다) |
| 물려받는 것 | 필드 + 완성된 메서드 | 메서드 **선언**만 (구현은 직접) |
| 객체 생성 | `new Animal()` 가능 | 불가능 |
| 개수 | 부모 **1개**만 | **여러 개** 구현 가능 |
| 구현 강제 | 안 함 (재정의 안 하면 부모 버전) | 함 (안 하면 컴파일 에러) |

### ⚠️ 헷갈리기 쉬운 점

- 인터페이스의 메서드는 자동으로 `public abstract`다. 그래서 구현할 때 **`public`을 꼭 붙여야** 한다. 안 붙이면 접근 범위가 좁아져서 컴파일 에러가 난다.
- 몸체를 비워 둔 `{ }`도 "구현한 것"으로 인정된다.
- 인터페이스 메서드를 하나라도 구현하지 않으면 컴파일 에러다. (또는 그 클래스를 `abstract`로 선언해야 한다.)
- 참고: Java 8부터는 `default` 키워드를 붙이면 인터페이스에도 몸체 있는 메서드를 만들 수 있다. (나중에 배울 내용)

---

## 14. 마무리: 객체지향 4대 특징 & 셀프 체크

### 객체지향 4대 특징 한눈에 보기

| 특징 | 한 줄 요약 | 이 글에서 |
|---|---|---|
| **추상화** | 필요한 것만 뽑아서 클래스로 설계 | 6장 카레이서 & 자동차 |
| **캡슐화** | 필드는 숨기고 메서드로만 소통 | 5장 몬스터 (`private`) |
| **상속** | 공통 코드는 부모에, 다른 부분만 오버라이딩 | 11장 자동차 & 경찰차 |
| **다형성** | 부모(인터페이스) 타입 하나로 여러 객체를 다루고, 같은 호출에 각자 다르게 반응 | 12~13장 동물 |

### 꼭 기억할 문장 7개

1. `==`는 **주소**, `equals()`는 **내용** 비교다.
2. heap에 있는 값(배열 칸, 필드)은 **기본값이 자동으로** 채워진다.
3. 매개변수 있는 생성자를 만들면 **기본 생성자는 자동으로 안 생긴다.**
4. 캡슐화는 메서드만으로는 부족하다. **`private`까지** 붙여야 완성이다.
5. 오버로딩은 **매개변수**가 달라야 하고, 반환타입·이름만 다른 건 안 된다.
6. 자식 객체를 만들면 **부모 생성자가 먼저** 실행된다.
7. **호출 가능 여부는 변수 타입, 실제 동작은 객체 타입**이 정한다.

### 셀프 체크 퀴즈

<details>
<summary>Q1. 출력 결과는? <code>String a = "hi"; String b = new String("hi"); System.out.println(a == b); System.out.println(a.equals(b));</code></summary>

`false`, `true` — `new`는 새 공간을 만들어 주소가 다르고, `equals()`는 내용을 비교한다.
</details>

<details>
<summary>Q2. <code>String[] names = new String[3];</code> 직후 <code>names[0]</code>의 값은?</summary>

`null` — 참조 자료형 배열의 기본값.
</details>

<details>
<summary>Q3. 캡슐화 problem3에서 아직 해결되지 않은 문제는? 어떻게 해결했나?</summary>

setter가 있어도 `monster3.hp = -5500;`처럼 필드에 직접 접근할 수 있었다 → 필드를 `private`으로 선언해서 해결.
</details>

<details>
<summary>Q4. 다음 중 오버로딩이 성립하는 것은? (a) <code>int test()</code> vs <code>void test()</code> (b) <code>test(int a)</code> vs <code>test(int b)</code> (c) <code>test(int, String)</code> vs <code>test(String, int)</code></summary>

(c) — 반환타입이나 매개변수 이름만 다른 건 시그니처가 같다.
</details>

<details>
<summary>Q5. static 변수와 일반 필드의 차이를 객체 2개를 예로 설명하면?</summary>

일반 필드는 객체마다 따로 존재한다 (t1이 증가시켜도 t2는 0). static 변수는 클래스에 하나만 존재해서 모든 객체가 공유한다 (t1이 증가시키면 t2에서 봐도 1).
</details>

<details>
<summary>Q6. <code>new CapsCar()</code>를 실행하면 어떤 생성자가 어떤 순서로 호출되나?</summary>

`Car()` → `CapsCar()` 순서. 자식 생성자 첫 줄에 `super()`가 자동으로 들어가기 때문.
</details>

<details>
<summary>Q7. <code>Animal a = new Koala(); a.sleep();</code> 은 왜 에러인가? 어떻게 고치나?</summary>

변수 타입이 `Animal`이라 컴파일러는 `Animal`에 있는 메서드만 안다. `((Koala) a).sleep();`으로 다운캐스팅해야 한다.
</details>

<details>
<summary>Q8. 싱글톤에서 생성자를 <code>private</code>으로 만드는 이유는?</summary>

외부에서 `new`로 객체를 여러 개 만들지 못하게 막고, `getInstance()`를 통해서만 하나의 객체를 얻게 하려고.
</details>

<details>
<summary>Q9. 인터페이스를 구현한 클래스가 인터페이스 메서드 하나를 구현하지 않으면?</summary>

컴파일 에러. 인터페이스는 메서드 구현을 강제한다. (또는 그 클래스를 `abstract`로 선언해야 한다.)
</details>

<details>
<summary>Q10. ✍️ 직접 짜보기: 캡슐화를 적용한 <code>BankAccount</code> 클래스</summary>

조건: 잔액 `balance`는 외부에서 직접 수정 불가, `deposit(int)`은 양수만 허용, `withdraw(int)`는 잔액보다 크면 거부.

```java
public class BankAccount {
    private int balance;

    public void deposit(int money) {
        if (money > 0) balance += money;
        else System.out.println("입금액은 양수여야 합니다.");
    }

    public void withdraw(int money) {
        if (money <= balance) balance -= money;
        else System.out.println("잔액이 부족합니다.");
    }

    public int getBalance() { return balance; }
}
```
</details>

---

> 다음에 배울 내용: 추상 클래스(`abstract`), 예외 처리, 컬렉션, 제네릭, 람다 …
> 이번 글의 개념(특히 **상속·다형성·인터페이스**)이 전부 그 바탕이 되니, 헷갈리면 이 글로 돌아와서 다시 보자.
