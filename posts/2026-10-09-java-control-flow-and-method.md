---
title: "[Java] 제어문(조건문·반복문)과 메서드 정리"
date: 2026-10-09
section: Study Notes
module: Module 2
categories: [Java]
tags: [Java, 조건문, 반복문, switch, 메서드, 단축평가]
---

프로그램은 기본적으로 **위에서 아래로, 한 줄씩** 실행된다. 하지만 실제 프로그램은 "점수가 90점 이상이면 A", "5번 반복해", "이 작업은 따로 떼어서 재사용해" 같은 흐름 제어가 필요하다.
이번 글에서는 Java의 흐름을 바꾸는 세 가지 도구를 정리한다.

1. **조건문** — `if`, `switch` : 흐름을 *분기*시킨다
2. **반복문** — `for`, `while`, `do-while` : 흐름을 *반복*시킨다
3. **메서드** — 코드를 *묶어서 재사용*하고, 호출을 통해 흐름을 *이동*시킨다

수업 실습 코드를 바탕으로 정리하고, 실습 중 놓치기 쉬운 부분과 추가로 알아두면 좋은 개념도 함께 덧붙였다.

---

## 0. 모든 것의 시작, `main()`

```java
public static void main(String[] args) {
    System.out.println("프로그램이 시작됩니다..");
}
```

Java 프로그램은 **항상 `main()` 메서드에서 시작**한다. JVM이 클래스를 로드한 뒤 가장 먼저 찾아서 실행하는 진입점(entry point)이다.

- `public` : JVM이 외부에서 호출해야 하므로 공개되어 있어야 한다.
- `static` : 객체를 만들지 않고도 호출할 수 있어야 한다. (→ [5-5. static 메서드 vs 인스턴스 메서드](#5-5-static-메서드-vs-인스턴스-메서드)에서 다시 다룸)
- `void` : JVM에 돌려줄 값이 없다.
- `String[] args` : 실행 시 전달하는 명령행 인자.

---

## 1. 조건문 ① — `if`

### 1-1. 기본 형태

`if`문은 **조건식의 결과(`true`/`false`)에 따라 실행 흐름을 분기**시키는 제어문이다.

```java
if (조건식) {
    // 조건이 true일 때 실행
} else if (조건식2) {
    // 위 조건이 false이고 조건식2가 true일 때 실행
} else {
    // 모든 조건이 false일 때 실행
}
```

### 1-2. 예제 — 성적 등급 판정

```java
int score = 65;

if (score >= 90) {
    System.out.println("A 등급입니다!");
} else if (score >= 80) {
    System.out.println("B 등급입니다!");
} else if (score >= 70) {
    System.out.println("C 등급..?");
} else {
    System.out.println("재수강 확정!");
}
```

```
재수강 확정!
```

> 💡 **포인트 : `else if`는 위에서부터 순서대로 검사하고, 처음 만족한 블록 하나만 실행한다.**
> 그래서 `score >= 80` 조건에는 "90 미만"을 따로 적지 않아도 된다. 이미 위의 `score >= 90`이 `false`였기 때문에 내려온 것이기 때문이다.
> 반대로 조건의 순서를 `score >= 70` → `score >= 80` → `score >= 90`으로 바꾸면 95점도 "C 등급"이 되어 버린다. **범위 조건은 좁은(엄격한) 조건부터** 쓰자.

### 1-3. 예제 — `Scanner`로 입력받아 할인율 계산

```java
import java.util.Scanner;

Scanner sc = new Scanner(System.in);
System.out.print("나이를 입력해주세요 : ");
int age = sc.nextInt();

double discountRate;

if (age < 13) {
    discountRate = 0.5;   // 어린이 50%
} else if (age >= 65) {
    discountRate = 0.3;   // 노약자 30%
} else {
    discountRate = 0.0;   // 할인 없음
}

System.out.println("나이 : " + age + ", 할인율 : " + (discountRate * 100) + "%");
```

```
나이를 입력해주세요 : 10
나이 : 10, 할인율 : 50.0%
```

#### ➕ 알아두면 좋은 것들

**① 지역 변수는 반드시 초기화된 후에 사용해야 한다**

`double discountRate;`처럼 선언만 해두고 값을 넣지 않은 채 사용하면 컴파일 에러가 난다.
위 코드가 문제없는 이유는 `if / else if / else`가 **모든 경우를 빠짐없이 덮고 있어서**, 컴파일러가 "어떤 경로로 가도 값이 들어간다"는 것을 확인할 수 있기 때문이다. 만약 마지막 `else`를 지우면 다음 에러가 발생한다.

```
error: variable discountRate might not have been initialized
```

**② `print` vs `println`**

- `print()` : 출력 후 줄바꿈 **안 함** → 입력 안내문 뒤에 커서가 붙어 있어 입력받기 좋다.
- `println()` : 출력 후 줄바꿈(**l**i**n**e).

**③ `Scanner` 사용 시 주의점**

- `nextInt()`에 숫자가 아닌 값을 입력하면 `InputMismatchException`이 발생한다.
- `nextInt()` 다음에 `nextLine()`을 호출하면, 버퍼에 남아 있던 엔터(`\n`)를 읽어서 빈 문자열이 들어오는 문제가 있다. 이때는 `nextLine()`을 한 번 더 호출해 버퍼를 비워준다.
- 사용이 끝나면 `sc.close()`로 자원을 닫아주는 습관을 들이자.

**④ `double` 연산의 오차**

`discountRate * 100`의 결과는 `double`이라 `50.0`처럼 소수점이 붙는다. 또한 실수(부동소수점)는 2진수로 정확히 표현할 수 없는 값이 있어서 `0.1 + 0.2`가 `0.30000000000000004`가 되는 등의 오차가 생긴다. **금액 계산처럼 정확도가 중요한 곳에서는 `BigDecimal`이나 정수(원 단위) 연산을 사용**한다.

---

## 2. 논리 연산자와 단축 평가(Short-circuit Evaluation)

조건문에는 여러 조건을 묶어서 쓰는 경우가 많다. 이때 사용하는 것이 논리 연산자다.

| 연산자 | 의미 | 결과 |
|---|---|---|
| `A && B` | AND | 둘 다 `true`일 때만 `true` |
| `A \|\| B` | OR | 하나라도 `true`면 `true` |
| `!A` | NOT | `true` ↔ `false` 반전 |

### 2-1. 단축 평가란?

`&&`와 `||`는 **왼쪽 피연산자만으로 결과가 확정되면 오른쪽은 아예 실행하지 않는다.**

- `A && B` : `A`가 `false`면 → 결과는 무조건 `false` → `B`를 **평가하지 않음**
- `A || B` : `A`가 `true`면 → 결과는 무조건 `true` → `B`를 **평가하지 않음**

### 2-2. 왜 중요할까? — 회원가입 예시

회원가입 조건을 검사한다고 해보자.

- **A** : 아이디 중복 여부 검사 (DB 조회 → 느림, 1초)
- **B** : 비밀번호 8자 이상 여부 검사 (문자열 길이 확인 → 빠름, 0.0001초)

```java
// ❌ 느린 검사를 먼저 → 비밀번호가 짧아도 DB 조회를 무조건 한다
if (isIdAvailable(id) && password.length() >= 8) { ... }

// ✅ 빠르고 실패 확률이 높은 검사를 먼저 → 비밀번호가 짧으면 DB 조회 자체를 생략
if (password.length() >= 8 && isIdAvailable(id)) { ... }
```

정리하면,

- `&&` : **`false`가 나올 확률이 높거나, 비용이 싼 조건을 왼쪽**에
- `||` : **`true`가 나올 확률이 높거나, 비용이 싼 조건을 왼쪽**에

트래픽이 많은 서비스에서는 이런 작은 순서 차이가 DB 부하와 응답 속도에 꽤 큰 영향을 준다.

### 2-3. 단축 평가의 또 다른 쓰임 — NPE 방어

단축 평가는 성능뿐 아니라 **안전성**에도 쓰인다. 실무에서 가장 흔한 패턴이다.

```java
String name = null;

// name이 null이면 왼쪽에서 false가 확정 → name.length()는 실행되지 않음
if (name != null && name.length() > 0) {
    System.out.println("이름 : " + name);
}
```

순서를 바꿔서 `name.length() > 0 && name != null`로 쓰면 `NullPointerException`이 발생한다. **"앞의 조건이 뒤의 조건이 안전하게 실행될 수 있는지 보장"** 하도록 순서를 짜는 것이 핵심이다.

### 2-4. ⚠️ `&` / `|` 는 단축 평가를 하지 않는다

`&`, `|`도 `boolean`에 사용할 수 있지만, 이들은 **양쪽을 항상 모두 평가**한다.

```java
int count = 0;

if (false && (++count > 0)) { }   // 오른쪽 실행 X
System.out.println(count);        // 0

if (false & (++count > 0)) { }    // 오른쪽 실행 O
System.out.println(count);        // 1
```

조건문에서는 특별한 이유가 없는 한 **`&&`, `||`를 사용**하자. (`&`, `|`는 주로 비트 연산에 쓰인다.)

### 2-5. ⚠️ `System.nanoTime()`으로 성능을 재는 것에 대하여

실습에서는 조건 순서에 따른 차이를 `System.nanoTime()`으로 측정해봤다.

```java
long startTime = System.nanoTime();
if (age <= 19) { ... } else { ... }
long endTime = System.nanoTime();
System.out.println("시간 : " + (endTime - startTime) + "(ns)");
```

하지만 이 방식으로 나온 숫자는 **조건 순서의 효율을 증명하지 못한다.** 이유는 다음과 같다.

1. **조건이 하나뿐이다.** 단축 평가는 `&&`/`||`로 여러 조건을 연결했을 때 의미가 있다. 조건이 하나면 어차피 그 하나만 평가된다.
2. **JVM 워밍업(JIT 컴파일).** Java 코드는 처음엔 인터프리터로 느리게 실행되다가, 자주 실행되는 코드는 JIT 컴파일러가 기계어로 최적화한다. 그래서 **먼저 측정한 쪽이 거의 항상 더 느리게** 나온다. (측정 순서를 바꿔보면 결과가 뒤집히는 것을 확인할 수 있다.)
3. **측정 단위보다 작업이 너무 작다.** `if` 하나는 수 나노초 수준이라, `nanoTime()` 호출 자체의 오버헤드와 OS 스케줄링 노이즈에 묻힌다.

정확한 마이크로 벤치마크가 필요하다면 **JMH(Java Microbenchmark Harness)** 같은 전용 도구를 사용한다. 단축 평가의 효과를 직접 확인하고 싶다면 시간 대신 **"오른쪽 조건이 실제로 호출됐는지"를 출력**해 보는 것이 훨씬 명확하다.

```java
static boolean slowCheck() {
    System.out.println("slowCheck() 실행됨!");
    return true;
}

if (false && slowCheck()) { }   // 아무것도 출력되지 않음
if (true  || slowCheck()) { }   // 아무것도 출력되지 않음
```

---

## 3. 조건문 ② — `switch`

### 3-1. 기본 형태

`switch`는 **하나의 값을 여러 경우(case)와 비교**해야 할 때 `if-else` 사슬을 대신하는 문법이다.

```java
switch (식) {
    case 값1:
        실행코드;
        break;
    case 값2:
        실행코드;
        break;
    default:
        기본코드;   // if문의 else 역할
}
```

```java
int month = 1;

switch (month) {
    case 1:
        System.out.println("1월~");
        break;
    case 2:
        System.out.println("2월~");
        break;
    case 3:
        System.out.println("3월~");
        break;
    default:
        System.out.println("그 외의 월입니다!");
}
```

### 3-2. `switch`에 사용할 수 있는 타입

| 사용 가능 ✅ | 사용 불가 ❌ |
|---|---|
| `byte`, `short`, `char`, `int` 와 그 래퍼 클래스 | `long` |
| `String` (Java 7+) | `float`, `double` |
| `enum` | `boolean` |

`switch`는 **"값이 정확히 일치하는가(==)"** 만 비교한다. `score >= 90` 같은 **범위 비교는 `if`문**을 써야 한다.

### 3-3. ⚠️ `break`를 빼먹으면? — Fall-through

`break`가 없으면 일치한 `case`부터 **아래 `case`들을 조건 검사 없이 연달아 실행**한다. 이를 fall-through라고 한다.

```java
int month = 1;
switch (month) {
    case 1: System.out.println("1월~");
    case 2: System.out.println("2월~");
    case 3: System.out.println("3월~");
    default: System.out.println("그 외의 월입니다!");
}
```

```
1월~
2월~
3월~
그 외의 월입니다!
```

대부분은 버그지만, 의도적으로 활용할 수도 있다.

```java
switch (month) {
    case 3: case 4: case 5:
        System.out.println("봄");
        break;
    case 6: case 7: case 8:
        System.out.println("여름");
        break;
    // ...
}
```

### 3-4. ➕ 향상된 switch (Java 14+)

최신 Java에서는 화살표(`->`) 문법을 지원한다. **`break`가 필요 없고 fall-through도 일어나지 않으며**, 값을 반환하는 **식(expression)** 으로도 쓸 수 있다.

```java
int month = 4;

String season = switch (month) {
    case 3, 4, 5   -> "봄";
    case 6, 7, 8   -> "여름";
    case 9, 10, 11 -> "가을";
    case 12, 1, 2  -> "겨울";
    default        -> "잘못된 월";
};

System.out.println(season);   // 봄
```

여러 줄을 실행한 뒤 값을 반환하고 싶다면 `yield`를 사용한다.

```java
String result = switch (month) {
    case 1 -> {
        System.out.println("새해 복 많이 받으세요");
        yield "1월";
    }
    default -> "기타";
};
```

Java 17 이상 환경이라면 새 코드에서는 화살표 문법을 쓰는 것을 추천한다.

---

## 4. 반복문

### 4-1. `for`문 — 반복 횟수가 정해져 있을 때

```java
for (초기식; 조건식; 증감식) {
    실행 코드
}
```

- **초기식** : 반복에 쓸 변수의 초기값 설정 (처음 1번만 실행)
- **조건식** : `true`면 반복, `false`면 종료
- **증감식** : 1회 반복이 끝날 때마다 실행

**실행 순서** : `초기식 → 조건식 → 실행코드 → 증감식 → 조건식 → 실행코드 → 증감식 → ... → 조건식(false) → 종료`

```java
System.out.println("벤치프레스 5회 실시할게요~");

for (int i = 1; i <= 5; i++) {
    if (i % 2 == 0) {
        System.out.println("침묵함...");
    } else {
        System.out.println(i + "번 했습니다~");
    }
}
```

```
1번 했습니다~
침묵함...
3번 했습니다~
침묵함...
5번 했습니다~
```

- `i % 2 == 0` : 2로 나눈 나머지가 0 → 짝수 판별의 정석 패턴.
- 반복문 없이 쓰면 `println`을 5줄 복붙해야 하지만, `for`문을 쓰면 횟수가 100번, 10000번이 되어도 숫자 하나만 바꾸면 된다.

> 💡 `for (int i = ...)`에서 선언한 `i`는 **`for` 블록 안에서만 유효**하다(변수의 스코프). 반복문이 끝난 뒤 `i`를 사용하면 컴파일 에러가 난다.

### 4-2. `while`문 — 반복 횟수가 불확실할 때

```java
while (조건식) {
    실행 코드
    증감식
}
```

```java
int count = 0;

while (count <= 5) {
    System.out.println("카운트 : " + count);
    count++;
}
```

```
카운트 : 0
카운트 : 1
...
카운트 : 5
```

`0`부터 `5`까지 **총 6번** 실행된다. 경계값(`<` vs `<=`, 시작값 0 vs 1)은 반복 횟수 버그(off-by-one)가 가장 많이 나오는 곳이니 항상 확인하자.

`while`은 "사용자가 `q`를 입력할 때까지", "파일의 끝에 도달할 때까지"처럼 **언제 끝날지 미리 알 수 없는 반복**에 어울린다.

> ⚠️ **무한 루프 주의** : 증감식(`count++`)을 빼먹으면 조건이 영원히 `true`라서 프로그램이 끝나지 않는다.

### 4-3. `do-while`문 — 최소 1번은 무조건 실행

```java
do {
    실행 코드
} while (조건식);   // ← 세미콜론 필수!
```

`while`과 달리 **실행 먼저, 조건 검사는 나중**이다.

```java
int num = 5;

do {
    System.out.println("반복 출력 : " + num);
    num++;
} while (num < 3);
```

```
반복 출력 : 5
```

`num`이 5라서 조건 `num < 3`은 처음부터 `false`지만, **조건을 검사하기 전에 한 번 실행되므로 1번 출력**된다. 같은 코드를 `while`로 쓰면 아무것도 출력되지 않는다.

대표적인 사용처는 **"메뉴를 일단 한 번 보여주고, 종료를 선택할 때까지 반복"** 하는 콘솔 프로그램이다.

```java
Scanner sc = new Scanner(System.in);
int menu;

do {
    System.out.println("1. 조회  2. 등록  0. 종료");
    menu = sc.nextInt();
} while (menu != 0);
```

### 4-4. 세 반복문 비교

| | `for` | `while` | `do-while` |
|---|---|---|---|
| 조건 검사 시점 | 실행 전 | 실행 전 | **실행 후** |
| 최소 실행 횟수 | 0회 | 0회 | **1회** |
| 주 사용처 | 반복 횟수가 명확할 때 | 종료 시점이 조건에 달려 있을 때 | 최소 1번은 실행해야 할 때 |

### 4-5. ➕ `break`와 `continue`

반복문의 흐름을 중간에 바꾸는 키워드다.

- `break` : **반복문을 즉시 탈출**
- `continue` : **이번 회차의 나머지를 건너뛰고 다음 회차로**

```java
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) continue;   // 짝수는 건너뛰기
    if (i > 7) break;           // 7을 넘으면 종료
    System.out.print(i + " ");
}
// 출력 : 1 3 5 7
```

> 💡 `for`문에서 `continue`를 만나면 **증감식(`i++`)으로 이동**하지만, `while`문에서는 **바로 조건식으로 이동**한다. 그래서 `while`문에서 증감식보다 위에 `continue`를 두면 무한 루프에 빠질 수 있다.

중첩 반복문을 한 번에 빠져나가야 할 때는 **라벨(label)** 을 붙일 수 있다.

```java
outer:
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (i * j == 4) break outer;   // 바깥 for까지 한 번에 탈출
        System.out.println(i + " x " + j);
    }
}
```

### 4-6. ➕ 향상된 for문 (for-each)

배열이나 컬렉션의 요소를 처음부터 끝까지 순회할 때는 인덱스 없이 간단하게 쓸 수 있다.

```java
int[] scores = {90, 85, 70};

for (int score : scores) {
    System.out.println(score);
}
```

---

## 5. 메서드(Method)

### 5-1. 메서드가 없으면 생기는 문제

"두 수를 더해서 출력"하는 작업을 여러 번 해야 한다고 해보자.

```java
int num1 = 1;
int num2 = 2;
System.out.println("1번째 연산 결과 : " + (num1 + num2));

int num3 = 3;
int num4 = 4;
System.out.println("2번째 연산 결과 : " + (num3 + num4));
// ... 계속 반복
```

같은 로직이 끝없이 복사된다. 나중에 "더하기가 아니라 곱하기로 바꿔주세요"라는 요구가 오면 **복사한 모든 곳을 찾아서 고쳐야** 한다.

### 5-2. 메서드란?

> **메서드(Method)** : 특정 작업을 수행하는 코드 블록에 이름을 붙인 것.
> 코드의 **재사용성**과 **가독성**을 높이고, 프로그램 구조를 체계적으로 만들어 **유지보수**를 쉽게 한다.

```java
[접근제어자] [반환타입] 메서드명([매개변수타입 매개변수명, ...]) {
    실행할 코드
    [return 반환값;]
}
```

```java
public int sumTwoNumber(int a, int b) {
    return a + b;
}
```

| 구성 요소 | 예시 | 설명 |
|---|---|---|
| 접근제어자 | `public` | 이 메서드를 어디서 호출할 수 있는가 |
| 반환타입 | `int` | 메서드가 끝나고 돌려주는 값의 타입 (없으면 `void`) |
| 메서드명 | `sumTwoNumber` | 동사로 시작하는 camelCase가 관례 |
| 매개변수 | `int a, int b` | 호출할 때 전달받는 값 |
| `return` | `return a + b;` | 값을 돌려주고 메서드를 즉시 종료 |

### 5-3. 메서드 호출하기

```java
Application01 app = new Application01();   // 1. 객체 생성 (호출 준비)

System.out.println("3번째 연산 : " + app.sumTwoNumber(5, 6));   // 11
System.out.println("4번째 연산 : " + app.sumTwoNumber(7, 8));   // 15
System.out.println("5번째 연산 : " + app.sumTwoNumber(9, 10));  // 19
```

- `클래스명 변수명 = new 클래스명();` : 클래스로 **객체(인스턴스)를 생성**한다. 클래스도 `int`처럼 **자료형**이 될 수 있다.
- `.` (참조 연산자) : 객체 **안으로 들어가서** 메서드나 필드에 접근한다.
- `()` : 메서드를 **호출(실행)** 하라는 의미다.

### 5-4. 메서드 호출 흐름과 콜 스택(Call Stack)

```java
public static void main(String[] args) {
    System.out.println("main() 시작됨...");
    Application02 app2 = new Application02();
    app2.methodA();
    System.out.println("main() 종료됨...");
}

public void methodA() {
    System.out.println("methodA() 호출됨...");
    methodB();
    System.out.println("methodA() 종료됨...");
}

public void methodB() {
    System.out.println("methodB() 호출됨...");
}
```

```
main() 시작됨...
methodA() 호출됨...
methodB() 호출됨...
methodA() 종료됨...
main() 종료됨...
```

핵심은 두 가지다.

1. **메서드는 작성만 해서는 실행되지 않는다. 반드시 누군가 호출해야 실행된다.** (`methodB()`를 작성만 하고 호출하지 않으면 출력되지 않는다.)
2. **메서드가 끝나면, 자신을 호출했던 바로 그 위치로 돌아온다.**

이 동작은 JVM의 **콜 스택(Call Stack)** 으로 설명할 수 있다. 메서드가 호출되면 스택에 그 메서드의 공간(스택 프레임: 매개변수, 지역 변수 등)이 쌓이고, 메서드가 끝나면 제거된다. 나중에 들어온 것이 먼저 나가는 **LIFO(Last In First Out)** 구조다.

```
 호출 →                                                       ← 종료
┌────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌────────┐
│        │   │         │   │ methodB │   │         │   │        │
│        │   │ methodA │   │ methodA │   │ methodA │   │        │
│  main  │   │  main   │   │  main   │   │  main   │   │  main  │
└────────┘   └─────────┘   └─────────┘   └─────────┘   └────────┘
```

> 💡 같은 클래스 안의 인스턴스 메서드끼리는 `methodA()` 안에서 `methodB()`처럼 **객체 생성 없이 바로 호출**할 수 있다. (사실 `this.methodB()`에서 `this.`가 생략된 것이다.)
>
> 💡 메서드가 끝없이 자기 자신을 호출(무한 재귀)하면 스택이 가득 차서 `StackOverflowError`가 발생한다.

### 5-5. static 메서드 vs 인스턴스 메서드

실습에서 `main()`에서 `sumTwoNumber()`를 호출하려면 `new Application01()`로 객체를 먼저 만들어야 했다. 왜일까?

- `main()`은 **`static`** 메서드다 → 객체 없이 **클래스 자체에 소속**된다.
- `sumTwoNumber()`는 `static`이 없는 **인스턴스 메서드**다 → **객체가 있어야** 호출할 수 있다.

static 영역은 객체가 존재하는지 알 수 없으므로, 인스턴스 메서드를 쓰려면 직접 객체를 만들어서 호출해야 하는 것이다.

```java
public class MathUtil {
    public static int add(int a, int b) { return a + b; }   // static
    public int multiply(int a, int b) { return a * b; }     // 인스턴스
}

MathUtil.add(1, 2);                     // 클래스명.메서드명()
new MathUtil().multiply(2, 3);          // 객체.메서드명()
```

| | static 메서드 | 인스턴스 메서드 |
|---|---|---|
| 소속 | 클래스 | 객체(인스턴스) |
| 호출 방법 | `클래스명.메서드()` | `참조변수.메서드()` |
| 객체 생성 필요 | ❌ | ✅ |
| 인스턴스 필드 사용 | ❌ | ✅ |
| 예시 | `Math.max()`, `Integer.parseInt()` | `"abc".length()`, `sc.nextInt()` |

### 5-6. 매개변수(Parameter)와 전달인자(Argument)

```java
int x = app3.testMethod(40, "문자열", true, 'ㅂ');   // 40, "문자열", true, 'ㅂ' → 전달인자(Argument)

public int testMethod(int a, String s, boolean b, char c) {   // a, s, b, c → 매개변수(Parameter)
    return a;
}
```

- **전달인자(Argument, 인수)** : 메서드를 **호출할 때 넘겨주는 실제 값**
- **매개변수(Parameter)** : 메서드 **정의부에서 값을 받기 위해 선언한 변수**

전달인자는 매개변수와 **개수, 타입, 순서가 모두 일치**해야 한다.

```java
app3.testMethod("문자열", 40, true, 'ㅂ');   // ❌ 컴파일 에러 (순서 불일치)
app3.testMethod(40, "문자열");               // ❌ 컴파일 에러 (개수 불일치)
```

#### ➕ Java는 항상 값에 의한 전달(Pass by Value)

메서드에 전달되는 것은 **변수 자체가 아니라 값의 복사본**이다.

```java
public static void change(int n) {
    n = 100;
}

int num = 10;
change(num);
System.out.println(num);   // 10 — 원본은 바뀌지 않는다
```

객체를 넘기는 경우에는 "참조값(주소)의 복사본"이 전달되기 때문에, 메서드 안에서 그 객체의 내부 상태를 바꾸면 원본에도 반영된다. 이 차이는 이후 배열·객체를 배울 때 다시 중요해진다.

### 5-7. `return`과 반환 타입

- 반환 타입이 `void`가 아니라면 **반드시 `return 값;`이 있어야** 한다. (모든 실행 경로에서!)
- `return`은 값을 돌려주는 동시에 **메서드를 즉시 종료**한다.
- `void` 메서드에서도 `return;`(값 없이)으로 중간에 빠져나올 수 있다.

```java
public String grade(int score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    return "F";        // ← 이게 없으면 "missing return statement" 컴파일 에러
}
```

> 💡 **조기 반환(Early Return)** : 예외적인 경우를 먼저 `return`으로 처리해 버리면 `if-else` 중첩이 줄어 가독성이 좋아진다.

### 5-8. 접근 제어자

| 접근 제어자 | 같은 클래스 | 같은 패키지 | 자식 클래스 (다른 패키지) | 전체 |
|---|:---:|:---:|:---:|:---:|
| `public` | ✅ | ✅ | ✅ | ✅ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| `(default)` 아무것도 안 씀 | ✅ | ✅ | ❌ | ❌ |
| `private` | ✅ | ❌ | ❌ | ❌ |

`default`는 키워드를 **아무것도 쓰지 않은 상태**를 말하며, **같은 패키지 안에서만** 접근할 수 있다. (`switch`의 `default`와는 전혀 다른 개념이다.)

### 5-9. 다른 클래스의 메서드 호출하기

관련 있는 기능은 별도 클래스로 모아두고 가져다 쓰는 것이 일반적이다.

```java
public class Calculator {

    public int minNumberOf(int a, int b) {
        return (a > b) ? b : a;
    }

    public int maxNumberOf(int a, int b) {
        return (a > b) ? a : b;
    }
}
```

```java
public class Application04 {
    public static void main(String[] args) {
        int first = 100;
        int second = 20;

        Calculator calc = new Calculator();      // 1. 다른 클래스의 객체 생성
        int min = calc.minNumberOf(first, second);   // 2. 메서드 호출
        int max = calc.maxNumberOf(first, second);

        System.out.println(first + ", " + second + " 중 최솟값은 : " + min + "입니다.");
        System.out.println(first + ", " + second + " 중 최댓값은 : " + max + "입니다.");
    }
}
```

```
100, 20 중 최솟값은 : 20입니다.
100, 20 중 최댓값은 : 100입니다.
```

같은 패키지(`com.wanted.c_method`)에 있으므로 `import` 없이 바로 사용할 수 있다. 다른 패키지에 있다면 `import 패키지명.Calculator;`가 필요하다.

#### 삼항 연산자

```java
조건식 ? 참일 때 값 : 거짓일 때 값
```

간단한 `if-else`를 한 줄로 표현할 수 있다. 값을 **반환하는 식**이기 때문에 `return`이나 변수 대입에 바로 쓸 수 있다는 것이 장점이다. 단, 중첩하면 읽기 어려워지므로 단순한 경우에만 사용하자.

#### 🐛 테스트 케이스는 "운 좋게 맞는" 값을 피하자

실습 코드에서 최댓값 메서드가 처음에 이렇게 작성되어 있었다.

```java
return (a > b) ? a : a;   // 조건과 상관없이 항상 a 반환
```

`maxNumberOf(100, 20)`으로 테스트하면 **우연히 정답(100)이 나와서** 버그가 드러나지 않는다. 하지만 `maxNumberOf(20, 100)`을 호출하면 `20`이 나온다.
메서드를 테스트할 때는 **인자의 순서를 바꾼 경우, 두 값이 같은 경우, 음수인 경우** 등 여러 케이스를 넣어봐야 한다.

참고로 Java에는 이미 `Math.min(a, b)`, `Math.max(a, b)`가 `static` 메서드로 제공된다.

### 5-10. ➕ 메서드 오버로딩(Overloading)

**같은 이름의 메서드를 매개변수의 개수나 타입을 다르게 해서 여러 개 정의**하는 것.

```java
public int sum(int a, int b)           { return a + b; }
public int sum(int a, int b, int c)    { return a + b + c; }
public double sum(double a, double b)  { return a + b; }
```

`System.out.println()`이 `int`, `String`, `double` 무엇을 넣어도 동작하는 이유가 바로 오버로딩이다.

> ⚠️ **반환 타입만 다른 것은 오버로딩이 아니다.** 호출하는 쪽에서 어떤 메서드를 부를지 구분할 수 없기 때문에 컴파일 에러가 난다.

### 5-11. ➕ 좋은 메서드를 만드는 습관

- **하나의 메서드는 하나의 일만** 한다. (단일 책임)
- 이름만 보고 무슨 일을 하는지 알 수 있게 **동사로 시작**하는 이름을 짓는다. (`calculateDiscount`, `isAdult`, `findMinNumber`)
- `boolean`을 반환하는 메서드는 `is`, `has`, `can` 등으로 시작하면 조건문에서 자연스럽게 읽힌다. (`if (isAdult(age))`)
- 메서드 내부의 계산과 출력을 분리하자. `sumTwoNumber()`가 값을 `return`만 하고 출력은 호출한 쪽에서 하기 때문에, 그 결과를 출력할 수도, 다른 계산에 쓸 수도 있다.

---

## 6. 정리

| 분류 | 문법 | 한 줄 요약 |
|---|---|---|
| 조건문 | `if / else if / else` | 조건식 결과에 따라 분기. 범위 비교 가능 |
| 조건문 | `switch` | 하나의 값을 여러 case와 일치 비교. `break` 잊지 말기 |
| 연산자 | `&&`, `\|\|` | 단축 평가 → 비용이 싸거나 결과를 빨리 확정하는 조건을 왼쪽에 |
| 반복문 | `for` | 반복 횟수가 정해져 있을 때 |
| 반복문 | `while` | 종료 시점이 조건에 달려 있을 때 |
| 반복문 | `do-while` | 최소 1회 실행 보장 |
| 제어 | `break`, `continue` | 반복 탈출 / 다음 회차로 건너뛰기 |
| 메서드 | `반환타입 이름(매개변수)` | 코드 재사용. 호출해야 실행되고, 끝나면 호출한 곳으로 복귀 |
| 메서드 | `static` | 객체 없이 클래스명으로 호출 |
| 메서드 | 오버로딩 | 같은 이름, 다른 매개변수 |

## 7. 셀프 체크

- [ ] `else if`의 조건 순서를 바꾸면 결과가 왜 달라지는지 설명할 수 있다.
- [ ] `name != null && name.length() > 0`에서 순서가 중요한 이유를 설명할 수 있다.
- [ ] `switch`에서 `break`를 빼면 어떤 일이 일어나는지 안다.
- [ ] `while`과 `do-while`의 차이를 예제로 설명할 수 있다.
- [ ] `main()`에서 인스턴스 메서드를 호출하려면 왜 `new`가 필요한지 안다.
- [ ] 매개변수와 전달인자를 구분할 수 있다.
- [ ] 오버로딩이 성립하는 조건과 성립하지 않는 조건을 안다.
