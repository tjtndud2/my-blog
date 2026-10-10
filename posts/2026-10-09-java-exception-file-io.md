---
title: "[Java] 예외 처리(Exception)와 파일 입출력(File I/O) 기초 정리"
date: 2026-10-09
section: Study Notes
module: Module 2
categories: [Java]
tags: [java, exception, try-catch, custom-exception, file-io]
---

> 프로그램은 언제든 예상치 못한 상황을 만납니다. 0으로 나누기, `null` 참조, 존재하지 않는 파일 열기…
> 이번 글에서는 **예외가 무엇인지**, **어떻게 처리하는지**, **나만의 예외를 어떻게 만드는지**, 그리고 예외 처리가 필수인 **파일 입출력**까지 예제 코드와 함께 정리합니다.

---

## 📁 프로젝트 구조

```
com.wanted
├── a_exception
│   ├── a_basic          # 예외란 무엇인가 (컴파일 오류 vs 런타임 오류)
│   ├── b_sovled         # try-catch-finally, throw
│   └── c_userexception  # 사용자 정의 예외
│       ├── Application.java
│       ├── ExceptionTest.java
│       └── exception
│           ├── NegativeException.java
│           ├── MoneyNegativeException.java
│           ├── ProductPriceNegativeException.java
│           └── NotEnoughMoneyException.java
└── b_fileio             # FileWriter / FileReader
    └── Application01.java
```

---

## 1. 오류의 종류 — 컴파일 오류 vs 런타임 오류

| 구분 | 발생 시점 | 예시 |
|---|---|---|
| **컴파일 오류** | 코드를 작성/컴파일할 때 | 없는 변수 참조, 타입 불일치 |
| **런타임 오류(예외)** | 프로그램을 실행하는 도중 | `NullPointerException`, `ArrayIndexOutOfBoundsException` |

컴파일 오류는 IDE가 빨간 줄로 바로 알려주기 때문에 실행 자체가 안 됩니다.
문제는 **런타임 오류**입니다. 문법상 문제가 없어 실행은 되지만, 특정 상황에서 터집니다.

```java
System.out.println("프로그램 시작..");

int[] iarr = new int[5];
System.out.println("6번째 인덱스 출력 : " + iarr[6]);   // ArrayIndexOutOfBoundsException

String str = null;
str.length();                                         // NullPointerException

System.out.println("프로그램 종료..");                  // ❌ 여기까지 도달하지 못함
```

> 💡 **핵심**: 예외를 처리하지 않으면 예외가 발생한 지점에서 프로그램이 **비정상 종료**됩니다.
> 그래서 "프로그램 종료.."는 출력되지 않습니다.

---

## 2. 예외 처리하기 — `try - catch - finally`

| 블록 | 역할 |
|---|---|
| `try` | 예외가 발생할 **가능성이 있는** 코드 |
| `catch` | 특정 예외가 발생했을 때 **처리하는** 코드 |
| `finally` | 예외 발생 여부와 **관계없이 항상** 실행되는 코드 |

```java
try {
    // int result = 10 / 0;   // ArithmeticException (산술 연산 오류)
    String str = null;
    str.length();             // NullPointerException

} catch (ArithmeticException e) {
    System.out.println("예외 메세지 : " + e.getMessage());
    System.out.println("⭐⭐⭐예외 발생!!!!!!!!⭐⭐⭐");
} catch (NullPointerException e) {
    System.out.println("예외 메세지 : " + e.getMessage());
    System.out.println("❌❌❌예외 발생!!!!!!!!❌❌❌");
} finally {
    System.out.println("예외 발생 여부와 관계 없이 실행됨");
}
```

- `catch`는 **여러 개** 둘 수 있고, 발생한 예외 타입과 일치하는 블록 하나만 실행됩니다.
- `e.getMessage()`로 예외에 담긴 메시지를 꺼낼 수 있습니다.
- `finally`는 자원 정리(파일 닫기, DB 연결 해제 등)에 주로 사용합니다.

예외를 잡아서 처리했기 때문에 이번에는 프로그램이 **끝까지 정상 실행**됩니다.

---

## 3. 예외 직접 발생시키기 — `throw`

예외는 JVM만 던지는 게 아닙니다. 개발자가 "이건 잘못된 값이야!"라고 판단되면 **직접 던질 수도** 있습니다.

```java
public static void checkAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("나이는 음수일 수 없습니다.");
    }
    System.out.println("전달 받은 " + age + "는 유효한 나이입니다!");
}
```

```java
try {
    checkAge(-10);
} catch (IllegalArgumentException e) {
    System.out.println("e.getMessage() = " + e.getMessage());
}
```

**실행 결과**

```
e.getMessage() = 나이는 음수일 수 없습니다.
```

- `throw new 예외클래스("메시지")` 형태로 예외 객체를 만들어 던집니다.
- 던져진 예외 객체가 호출한 쪽의 `catch (… e)`의 `e`로 전달됩니다.
- 실제로 예외를 **발생**시키는 곳은 `checkAge()`, **처리**하는 곳은 이를 호출한 `main()`입니다.

### `throw` vs `throws` 헷갈리지 말기!

| 키워드 | 위치 | 의미 |
|---|---|---|
| `throw` | 메서드 **본문** | 예외를 **실제로 발생**시킨다 |
| `throws` | 메서드 **선언부(시그니처)** | "이 메서드는 이런 예외를 던질 수 있으니 **호출한 쪽에서 처리해**"라고 **위임**한다 |

> 💡 `IllegalArgumentException`은 `RuntimeException` 계열(**Unchecked Exception**)이라 `throws` 선언 없이도 던질 수 있습니다.
> 반면 `Exception`을 직접 상속한 **Checked Exception**은 반드시 `throws`로 선언하거나 `try-catch`로 처리해야 컴파일이 됩니다. (아래 4장에서 확인)

---

## 4. 사용자 정의 예외 만들기

JDK에는 수많은 예외 클래스가 준비되어 있지만, "잔액 부족", "상품 가격이 음수" 같은 **현실 세계의 비즈니스 상황**을 표현하기에는 너무 추상적이고 제한적입니다.
그래서 **나만의 예외 클래스**를 만들어 사용할 수 있습니다.

### 4-1. 시나리오

> 상품 가격과 내가 가진 돈을 입력받아 구매 가능 여부를 판단한다.
> 1. 상품 가격 또는 가진 돈이 **음수**일 때 → 예외
> 2. 가진 돈이 **부족**할 때 (가진 돈 < 상품 가격) → 예외

### 4-2. 예외 클래스 계층 설계

```
Exception
├── NegativeException                   // 음수 관련 예외 (공통 부모)
│   ├── ProductPriceNegativeException   // 상품 가격이 음수
│   └── MoneyNegativeException          // 가진 돈이 음수
└── NotEnoughMoneyException             // 잔액 부족
```

### 4-3. 예외 클래스 만드는 법

**`Exception` 클래스를 상속**하고, 메시지를 부모 생성자로 넘겨주면 끝입니다.

```java
public class NegativeException extends Exception {
    public NegativeException(String message) {
        super(message);
    }
}
```

```java
public class ProductPriceNegativeException extends NegativeException {
    public ProductPriceNegativeException(String message) {
        super(message);
    }
}

public class MoneyNegativeException extends NegativeException {
    public MoneyNegativeException(String message) {
        super(message);
    }
}

public class NotEnoughMoneyException extends Exception {
    public NotEnoughMoneyException(String message) {
        super(message);
    }
}
```

> 💡 `super(message)`로 넘긴 메시지가 나중에 `e.getMessage()`로 꺼내집니다.

### 4-4. 예외를 던지는 메서드

```java
public class ExceptionTest {

    public void checkMoney(int productPrice, int money)
            throws ProductPriceNegativeException, MoneyNegativeException, NotEnoughMoneyException {

        if (productPrice < 0) {
            throw new ProductPriceNegativeException("상품의 가격은 음수일 수 없습니다!!");
        }

        if (money < 0) {
            throw new MoneyNegativeException("가진 돈이 음수일 수 없습니다!!");
        }

        if (money < productPrice) {
            throw new NotEnoughMoneyException("가진 돈 보다 상품의 가격이 더 비싸요..");
        }

        System.out.println("가진 돈이 충분합니다~~ 즐거운 쇼핑 되세요~~");
    }
}
```

직접 만든 예외는 `Exception`을 상속한 **Checked Exception**이므로, 메서드 시그니처에 `throws`로 **어떤 예외를 던지는지 명시**해야 합니다.

### 4-5. 호출하는 쪽에서 처리

```java
ExceptionTest et = new ExceptionTest();

try {
    et.checkMoney(50000, 30000);
} catch (ProductPriceNegativeException e) {
    System.out.println(e.getMessage());
} catch (MoneyNegativeException e) {
    System.out.println(e.getMessage());
} catch (NotEnoughMoneyException e) {
    System.out.println(e.getMessage());
}
```

**실행 결과** (상품 50,000원 / 가진 돈 30,000원)

```
가진 돈 보다 상품의 가격이 더 비싸요..
```

### 💡 알아두면 좋은 포인트

**① 부모 타입으로 묶어서 잡을 수 있다**

`ProductPriceNegativeException`과 `MoneyNegativeException`은 둘 다 `NegativeException`의 자식이므로, 처리 방법이 같다면 하나로 묶을 수 있습니다.

```java
try {
    et.checkMoney(-1000, 30000);
} catch (NegativeException e) {          // 음수 관련 예외를 한 번에 처리
    System.out.println(e.getMessage());
} catch (NotEnoughMoneyException e) {
    System.out.println(e.getMessage());
}
```

**② `catch` 순서는 자식 → 부모**

부모 예외를 먼저 잡으면 아래쪽 자식 `catch`는 절대 도달할 수 없어 **컴파일 에러**가 납니다.

```java
catch (NegativeException e) { ... }
catch (MoneyNegativeException e) { ... }  // ❌ 컴파일 에러: 이미 위에서 잡힘
```

---

## 5. 파일 입출력 (File I/O)

파일 입출력은 "파일이 없을 수도", "디스크에 쓸 수 없을 수도" 있기 때문에 **예외 처리가 강제**되는 대표적인 영역입니다.
`FileWriter`, `FileReader` 등의 생성자와 메서드는 `IOException`(Checked Exception)을 던지도록 선언되어 있습니다.

### 5-1. 파일 쓰기 — `FileWriter`

```java
try {
    FileWriter writer = new FileWriter("output.txt");
    writer.write("Hello, File IO!!");   // 줄바꿈이 필요하면 "\n" 추가
    writer.write("File Test");

    // 버퍼(연결 통로)에 남아있는 데이터를 밀어내 디스크에 저장
    writer.flush();

} catch (IOException e) {
    throw new RuntimeException(e);
}
```

- `write()`는 바로 디스크에 쓰지 않고 **버퍼**에 모아 둡니다.
- `flush()`를 호출해야 버퍼의 내용이 실제 파일로 저장됩니다.

### 5-2. 파일 읽기 — `FileReader`

```java
try {
    FileReader reader = new FileReader("output.txt");

    int data;
    // read() : 한 문자씩 읽고, 파일 끝에 도달하면 -1 반환
    while ((data = reader.read()) != -1) {
        System.out.println((char) data);
    }
} catch (FileNotFoundException e) {   // 파일이 없을 때 (생성자)
    throw new RuntimeException(e);
} catch (IOException e) {             // 읽기 중 오류 (read())
    throw new RuntimeException(e);
}
```

- `read()`는 문자를 `int`로 반환하므로 `(char)`로 형변환해 출력합니다.
- `FileNotFoundException`은 `IOException`의 **자식**이므로 위 4장의 규칙대로 **먼저** 잡아야 합니다.
- `println`을 썼기 때문에 한 글자씩 줄바꿈되어 출력됩니다. 한 줄로 보고 싶다면 `print`를 사용하세요.

### 5-3. 한 걸음 더 — `try-with-resources`

위 예제는 학습용이라 `close()`를 호출하지 않았지만, 실무에서는 **파일 같은 자원은 반드시 닫아야** 합니다.
Java 7부터 제공되는 **try-with-resources**를 쓰면 블록이 끝날 때 자동으로 `close()`가 호출됩니다. (`close()` 시 `flush()`도 함께 수행)

```java
try (FileWriter writer = new FileWriter("output.txt")) {
    writer.write("Hello, File IO!!\n");
    writer.write("File Test");
} catch (IOException e) {
    e.printStackTrace();
}

try (FileReader reader = new FileReader("output.txt")) {
    int data;
    while ((data = reader.read()) != -1) {
        System.out.print((char) data);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

---

## ✅ 마무리 요약

| 개념 | 한 줄 정리 |
|---|---|
| 런타임 오류 | 처리하지 않으면 프로그램이 비정상 종료된다 |
| `try-catch-finally` | 예외를 잡아 처리하고, `finally`는 항상 실행된다 |
| `throw` | 예외를 **직접 발생**시킨다 |
| `throws` | 예외 처리를 **호출한 쪽에 위임**한다 |
| 사용자 정의 예외 | `Exception`을 상속하고 `super(message)` 호출 |
| `catch` 순서 | 자식 예외 → 부모 예외 순으로 작성 |
| Checked / Unchecked | `Exception` 직접 상속은 처리 강제, `RuntimeException` 계열은 선택 |
| File I/O | `IOException` 처리 필수, `flush()`/`close()` 잊지 말기 → try-with-resources 권장 |
