---
title: "[Java] 제네릭(Generic)과 컬렉션(Collection) 정리"
date: 2026-10-09
section: Study Notes
module: Module 2
categories: [Java]
tags: [java, generic, collection, list, set, map]
---

> 타입을 "필요한 시점에" 정하는 제네릭과, 데이터를 담는 그릇인 컬렉션 프레임워크(List · Set · Map)를 예제 코드와 함께 정리했습니다.
> 마지막에는 실무에서 자주 마주치는 함정과 추가로 알아두면 좋은 내용도 함께 담았습니다.

---

## 목차

1. 제네릭(Generic)
   - 제네릭이란?
   - 제네릭 클래스 만들기
   - Wrapper 클래스
   - 타입 제한 `<T extends Type>`
   - 와일드카드 `<?>`, `<? extends>`, `<? super>`
2. 컬렉션(Collection)
   - List / ArrayList
   - DTO와 함께 쓰는 ArrayList
   - Set / HashSet / TreeSet
   - Map / HashMap
   - Properties
3. 추가로 알아야 할 점
4. 마무리 요약

---

## 1. 제네릭(Generic)

### 1-1. 제네릭이란?

**제네릭은 데이터 타입을 일반화(generalize)한다**는 뜻입니다.
클래스나 메서드 안에서 쓸 데이터 타입을 **컴파일 시점에 지정**하는 방법이에요.

- 컴파일 시점에 타입 검사를 하기 때문에 **타입 안정성**이 높아집니다.
- 꺼낼 때 형변환(casting)을 할 필요가 없어집니다.
- 하나의 클래스를 여러 타입에 재사용할 수 있습니다.

### 1-2. 제네릭 클래스 만들기

클래스 선언부 끝에 `<>`(다이아몬드 연산자)를 붙이고 그 안에 **타입 변수**를 적습니다. 관례상 `T`(Type)를 사용합니다.

```java
public class GenericTest<T> {

    private T value;

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "GenericTest{" + "value=" + value + '}';
    }
}
```

> 💡 **toString()을 오버라이딩하는 이유**
> 클래스 타입은 참조자료형이라 그냥 출력하면 `GenericTest@1b6d3586` 같은 값이 나옵니다.
> `toString()`을 재정의하면 객체 안에 들어 있는 실제 값을 보기 좋게 출력할 수 있습니다.

사용하는 쪽에서는 이렇게 씁니다.

```java
// 타입을 지정하지 않으면 → 아무 타입이나 들어감 (Raw Type, 권장 X)
GenericTest gt = new GenericTest();
gt.setValue(1);
gt.setValue("안녕하세요");

// 타입을 String으로 고정
GenericTest<String> gt2 = new GenericTest<>();
gt2.setValue("문자열");
// gt2.setValue(1);   // ❌ 컴파일 에러! String만 들어갈 수 있음
```

`new GenericTest<String>()` 처럼 오른쪽에 타입을 다시 적어도 되지만, **Java 7부터는 `new GenericTest<>()`처럼 생략**할 수 있습니다. (타입 추론)

### 1-3. Wrapper 클래스

`<>` 안에는 **기본자료형(int, char, boolean …)을 넣을 수 없습니다.** 참조자료형만 가능해요.
그래서 기본자료형을 객체로 감싼 **Wrapper 클래스**를 사용합니다.

| 기본자료형 | Wrapper 클래스 |
|---|---|
| `byte` | `Byte` |
| `short` | `Short` |
| `int` | **`Integer`** |
| `long` | `Long` |
| `float` | `Float` |
| `double` | `Double` |
| `char` | **`Character`** |
| `boolean` | `Boolean` |

```java
// GenericTest<int> gt3 = new GenericTest<>();   // ❌ 컴파일 에러
GenericTest<Integer> gt3 = new GenericTest<>();  // ✅
gt3.setValue(1);  // int → Integer 자동 변환 (오토박싱)
```

### 1-4. 타입 제한 – `<T extends Type>`

`T`에 아무 타입이나 들어오는 것을 막고 싶을 때 **상한(upper bound)** 을 걸 수 있습니다.

예제에서 사용한 클래스 계층 구조는 다음과 같습니다.

```
Animal (interface)
 ├── Mammal (포유류)
 │    └── Rabbit
 │         └── Bunny
 │              └── DrunkenBunny
 └── Reptile (파충류)
      └── Snake
```

토끼 농장에는 토끼만 들어와야 하므로 `T extends Rabbit`으로 제한합니다.

```java
public class RabbitFarm<T extends Rabbit> {

    private T animal;

    public RabbitFarm() {}

    public RabbitFarm(T animal) {
        this.animal = animal;
    }

    public T getAnimal() { return animal; }
    public void setAnimal(T animal) { this.animal = animal; }
}
```

```java
// RabbitFarm<Mammal> farm = new RabbitFarm<>();   // ❌ Mammal은 Rabbit의 자식이 아님

RabbitFarm<Rabbit> farm1 = new RabbitFarm<>();        // ✅
RabbitFarm<Bunny> farm2 = new RabbitFarm<>();         // ✅
RabbitFarm<DrunkenBunny> farm3 = new RabbitFarm<>();  // ✅

// farm2.setAnimal(new Rabbit());   // ❌ Bunny 농장에 부모인 Rabbit은 못 들어감
farm2.setAnimal(new DrunkenBunny()); // ✅ Bunny의 자식은 들어갈 수 있음
farm2.getAnimal().cry();             // "ㅂ아ㅏ니ㅏㅂ아ㅣ니ㅣ 당근..당근당근" → 오버라이딩된 메서드 호출
```

> `T extends Rabbit` 덕분에 `RabbitFarm` 내부에서 `animal.cry()`처럼 **Rabbit의 메서드를 바로 호출할 수 있다**는 것도 장점입니다.
> 참고로 `extends` 뒤에는 클래스뿐 아니라 인터페이스도 올 수 있습니다. (`<T extends Comparable<T>>` 등)

### 1-5. 와일드카드 – `?`

와일드카드는 **메서드의 매개변수로 받을 제네릭 타입의 범위를 제한**할 때 사용합니다.

| 표기 | 의미 | 들어올 수 있는 것 |
|---|---|---|
| `<?>` | 제한 없음 | 아무 타입 |
| `<? extends Bunny>` | **상한 제한** (부모를 막음) | `Bunny`, `Bunny`의 자식 |
| `<? super Bunny>` | **하한 제한** (자식을 막음) | `Bunny`, `Bunny`의 부모 |

```java
public class WildcardFarm {

    public void anyType(RabbitFarm<?> farm) {
        farm.getAnimal().cry();
    }

    public void extendsType(RabbitFarm<? extends Bunny> farm) {  // 상한 제한
        farm.getAnimal().cry();
    }

    public void superType(RabbitFarm<? super Bunny> farm) {      // 하한 제한
        farm.getAnimal().cry();
    }
}
```

```java
WildcardFarm wf = new WildcardFarm();

// <?> : 다 됨
wf.anyType(new RabbitFarm<Rabbit>(new Rabbit()));
wf.anyType(new RabbitFarm<Bunny>(new Bunny()));
wf.anyType(new RabbitFarm<DrunkenBunny>(new DrunkenBunny()));

// <? extends Bunny> : Bunny 이하만
// wf.extendsType(new RabbitFarm<Rabbit>(new Rabbit()));  // ❌ Rabbit은 Bunny의 부모
wf.extendsType(new RabbitFarm<Bunny>(new Bunny()));
wf.extendsType(new RabbitFarm<DrunkenBunny>(new DrunkenBunny()));

// <? super Bunny> : Bunny 이상만
wf.superType(new RabbitFarm<Rabbit>(new Rabbit()));
wf.superType(new RabbitFarm<Bunny>(new Bunny()));
// wf.superType(new RabbitFarm<DrunkenBunny>(new DrunkenBunny()));  // ❌ DrunkenBunny는 Bunny의 자식
```

> 🔍 **잠깐, `<? super Bunny>`인데 왜 `cry()`가 호출될까?**
> 일반적으로 `<? super X>`에서 값을 꺼내면 타입이 `Object`로 취급되어 `X`의 메서드를 호출할 수 없습니다.
> 그런데 여기서는 `RabbitFarm` 자체가 `<T extends Rabbit>`으로 선언되어 있기 때문에, 컴파일러가 꺼낸 값을 **최소한 `Rabbit`** 이라고 알고 있습니다. 그래서 `cry()` 호출이 가능한 것입니다.

---

## 2. 컬렉션(Collection)

### 2-0. 컬렉션 한눈에 보기

| 종류 | 순서 | 중복 | 대표 구현체 |
|---|---|---|---|
| **List** | O | O | `ArrayList`, `LinkedList` |
| **Set** | X | X | `HashSet`, `LinkedHashSet`, `TreeSet` |
| **Map** | X (Key-Value 쌍) | Key는 X, Value는 O | `HashMap`, `LinkedHashMap`, `TreeMap` |

```
Iterable
 └── Collection
      ├── List  ── ArrayList, LinkedList, Vector
      ├── Set   ── HashSet ── LinkedHashSet
      │          └ TreeSet (SortedSet)
      └── Queue ── LinkedList, PriorityQueue, ArrayDeque

Map (Collection을 상속하지 않음!)
 ├── HashMap ── LinkedHashMap
 ├── TreeMap (SortedMap)
 └── Hashtable ── Properties
```

> `List`, `Set`, `Map`은 모두 **인터페이스**입니다. 인터페이스는 생성자가 없어 `new List()`처럼 객체를 만들 수 없으므로, **구현 클래스로 객체를 생성**하고 타입은 인터페이스로 받는 것이 일반적입니다.
> ```java
> List<String> list = new ArrayList<>();   // 다형성 활용
> ```

### 2-1. List – ArrayList

`ArrayList`는 가장 많이 쓰이는 List 구현체로, 내부적으로 **배열**을 사용합니다.
배열의 장점(인덱스로 빠른 접근)은 살리고, 단점(**고정 크기**, 중간 삽입·삭제의 불편함)은 보완했습니다.

```java
List list = new ArrayList();   // 제네릭 없이 → 모든 타입 저장 가능

list.add("apple");
list.add(1);
list.add(123.123);
list.add(true);
list.add(new Date());
System.out.println(list);          // [apple, 1, 123.123, true, Wed Oct 07 ...]
System.out.println(list.size());   // 5

list.add(1, "banana");   // 1번 인덱스에 삽입 → 뒤 요소들이 한 칸씩 밀림
System.out.println(list);          // [apple, banana, 1, 123.123, true, ...]

list.remove(2);          // 2번 인덱스(값 1) 삭제
System.out.println(list);          // [apple, banana, 123.123, true, ...]
```

실제로는 제네릭으로 타입을 고정해서 사용합니다.

```java
List<String> strings = new ArrayList<>();
strings.add("a");
strings.add("c");
strings.add("b");
strings.add("d");

Collections.sort(strings);   // 오름차순 정렬
System.out.println(strings); // [a, b, c, d]
```

**자주 쓰는 메서드**

| 메서드 | 설명 |
|---|---|
| `add(E e)` / `add(int index, E e)` | 끝에 추가 / 특정 위치에 삽입 |
| `get(int index)` | 조회 |
| `set(int index, E e)` | 수정 |
| `remove(int index)` / `remove(Object o)` | 삭제 |
| `size()` | 요소 개수 |
| `contains(Object o)` | 포함 여부 |
| `indexOf(Object o)` | 위치 찾기 (없으면 -1) |
| `isEmpty()` / `clear()` | 비었는지 확인 / 전체 삭제 |

### 2-2. DTO와 함께 쓰는 ArrayList

**DTO(Data Transfer Object)** 는 행위(메서드)보다 **데이터 운반**에 집중하는 클래스입니다. 보통 아래 구성을 가집니다.

1. 필드 (`private`)
2. 기본 생성자
3. 모든 필드를 초기화하는 생성자
4. getter
5. setter
6. `toString()`

```java
public class BookDTO {
    private int no;
    private String title;
    private String author;
    private int price;

    public BookDTO() {}

    public BookDTO(int no, String title, String author, int price) {
        this.no = no;
        this.title = title;
        this.author = author;
        this.price = price;
    }

    // getter / setter / toString 생략
}
```

```java
List<BookDTO> bookList = new ArrayList<>();
bookList.add(new BookDTO(1, "홍길동전", "허균", 50000));
bookList.add(new BookDTO(2, "목민심서", "정약용", 45000));
bookList.add(new BookDTO(3, "삼국지", "유지", 30000));
bookList.add(new BookDTO(4, "마법천자문", "손오공", 20000));
bookList.add(new BookDTO(5, "메이플스토리", "코메", 19900));

// 일반 for 문
for (int i = 0; i < bookList.size(); i++) {
    System.out.println((i + 1) + "번째 책 : " + bookList.get(i));
}

// 향상된 for 문 : for (요소 하나를 담을 변수 : 컬렉션)
for (BookDTO book : bookList) {
    System.out.println(book.getNo() + "번째 책 : " + book);
}
```

#### ➕ 가격 오름차순 정렬하기

`BookDTO`처럼 직접 만든 클래스는 "무엇을 기준으로 정렬할지" 자바가 모르기 때문에 `Collections.sort(bookList)`를 바로 쓸 수 없습니다. **`Comparator`** 로 기준을 알려줘야 합니다.

```java
// 가격 오름차순
bookList.sort(Comparator.comparingInt(BookDTO::getPrice));

// 가격 내림차순
bookList.sort(Comparator.comparingInt(BookDTO::getPrice).reversed());

// 가격 → 같으면 제목 순
bookList.sort(Comparator.comparingInt(BookDTO::getPrice)
                        .thenComparing(BookDTO::getTitle));
```

> 클래스 자체에 "기본 정렬 기준"을 넣고 싶다면 `implements Comparable<BookDTO>` 후 `compareTo()`를 구현하면 됩니다.

### 2-3. Set – HashSet

Set의 특징은 두 가지입니다.

1. **저장 순서를 유지하지 않는다.**
2. **중복을 허용하지 않는다.**

```java
Set<String> hset = new HashSet<>();
hset.add("java");
hset.add("db");
hset.add("servlet");
hset.add("spring");
hset.add("jpa");
hset.add("jpa");   // 중복 → 무시됨 (add()가 false를 반환)

System.out.println(hset);   // [spring, java, db, jpa, servlet]  ← 넣은 순서와 다를 수 있음
```

### 2-4. Set – TreeSet (로또 번호 생성기)

`TreeSet`은 중복을 허용하지 않는 것은 같지만, 내부가 **이진 검색 트리(Red-Black Tree)** 로 되어 있어 **자동으로 정렬**됩니다.

```java
Set<Integer> lotto = new TreeSet<>();

while (lotto.size() < 6) {
    // Math.random() : 0.0 이상 1.0 미만의 난수
    // * 45          : 0.0 이상 45.0 미만
    // (int) ... + 1 : 1 ~ 45
    lotto.add((int) (Math.random() * 45) + 1);
}

System.out.println(lotto);   // [3, 11, 19, 27, 33, 42]  ← 항상 정렬된 상태
```

> 중복된 번호가 뽑혀도 Set이 알아서 걸러주기 때문에, `size()`가 원하는 개수가 될 때까지 반복하면 됩니다.

| | HashSet | LinkedHashSet | TreeSet |
|---|---|---|---|
| 순서 | 보장 X | **넣은 순서** 유지 | **정렬** 순서 |
| 속도 | 가장 빠름 O(1) | O(1) | O(log n) |

### 2-5. Map – HashMap

Map은 **Key-Value 한 쌍**으로 데이터를 저장합니다.

- Key는 내부적으로 Set처럼 관리 → **중복 불가**
- 같은 Key로 다시 `put` 하면 **값이 덮어씌워짐**
- Value는 중복 가능

```java
Map map = new HashMap();
map.put("one", new Date());
map.put(12, "apple");
map.put(12, "banana");   // Key 12 중복 → "banana"로 덮어씀
map.put(16, "orange");

System.out.println(map.get(12));   // banana
```

제네릭을 사용한 형태:

```java
Map<String, String> map2 = new HashMap<>();
map2.put("one", "java");
map2.put("two", "javascript");
map2.put("three", "python");

map2.remove("three");      // Key로 삭제
System.out.println(map2);  // {one=java, two=javascript}
```

**자주 쓰는 메서드**

| 메서드 | 설명 |
|---|---|
| `put(K, V)` | 저장 (기존 Key면 덮어쓰고 이전 값을 반환) |
| `get(K)` | 조회 (없으면 `null`) |
| `getOrDefault(K, V)` | 없으면 기본값 반환 |
| `containsKey(K)` / `containsValue(V)` | 존재 여부 |
| `remove(K)` | 삭제 |
| `keySet()` / `values()` / `entrySet()` | Key 모음 / Value 모음 / 쌍 모음 |

| | HashMap | LinkedHashMap | TreeMap |
|---|---|---|---|
| 순서 | 보장 X | **넣은 순서** 유지 | **Key 기준 정렬** |

### 2-6. Properties

`Properties`는 **프로그램 설정값을 보관하기 위해 만들어진 특수한 Map**입니다. Key와 Value가 **모두 String**이라는 것이 특징이에요.
`.env`나 `application.properties` 같은 설정 파일을 떠올리면 됩니다.

```properties
# config.properties
driver=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost/menudb
```

```java
Properties prop = new Properties();
prop.setProperty("driver", "com.mysql.cj.jdbc.Driver");
prop.setProperty("url", "jdbc:mysql://localhost/menudb");
prop.setProperty("username", "wanted");

System.out.println(prop.getProperty("url"));            // jdbc:mysql://localhost/menudb
System.out.println(prop.getProperty("port"));           // null (없는 키)
System.out.println(prop.getProperty("port", "3306"));   // 3306 (기본값)
```

---

## 3. 추가로 알아야 할 점

수업 예제에서 한 걸음 더 나아가, 실제로 코드를 짤 때 자주 부딪히는 내용들입니다.

### 3-1. Raw Type은 쓰지 말자

`List list = new ArrayList();`처럼 제네릭 없이 쓰는 것을 **Raw Type**이라고 합니다. 예제에서는 비교를 위해 썼지만, 실제로는 피해야 합니다.

```java
List list = new ArrayList();
list.add("apple");
list.add(1);

String s = (String) list.get(1);   // 💥 런타임에 ClassCastException
```

제네릭을 쓰면 이 실수를 **컴파일 단계에서** 잡을 수 있습니다. 런타임 에러보다 컴파일 에러가 훨씬 싸다는 것이 제네릭의 핵심 가치입니다.

### 3-2. 타입 소거(Type Erasure)

제네릭 타입 정보는 **컴파일할 때만 존재하고, 컴파일 후에는 지워집니다.** (하위 호환성 때문)
그래서 다음과 같은 것들이 불가능합니다.

```java
public class Box<T> {
    T obj = new T();          // ❌ T가 뭔지 런타임에 모름
    T[] arr = new T[10];      // ❌ 제네릭 배열 생성 불가
    static T shared;          // ❌ static 필드에 타입 변수 사용 불가
}

// 런타임에는 둘 다 그냥 ArrayList
new ArrayList<String>().getClass() == new ArrayList<Integer>().getClass();   // true
```

### 3-3. 제네릭 메서드

클래스 전체가 아니라 **메서드 하나에만** 제네릭을 적용할 수도 있습니다. 반환 타입 앞에 `<T>`를 선언합니다.

```java
public static <T> void printAll(List<T> list) {
    for (T item : list) {
        System.out.println(item);
    }
}

// 타입 제한도 가능
public static <T extends Comparable<T>> T max(List<T> list) {
    T result = list.get(0);
    for (T item : list) {
        if (item.compareTo(result) > 0) result = item;
    }
    return result;
}
```

**타입 변수 이름 관례**: `T`(Type), `E`(Element), `K`(Key), `V`(Value), `N`(Number), `R`(Return)

### 3-4. PECS – 와일드카드는 언제 extends, 언제 super?

**P**roducer-**E**xtends, **C**onsumer-**S**uper 라는 공식으로 기억하면 쉽습니다.

- 컬렉션에서 값을 **꺼내기만(읽기)** 한다 → `<? extends T>`
- 컬렉션에 값을 **넣기만(쓰기)** 한다 → `<? super T>`

```java
// 꺼내서 쓰기만 함 → extends
public static void cryAll(List<? extends Rabbit> list) {
    for (Rabbit r : list) r.cry();       // ✅ 읽기 OK
    // list.add(new Rabbit());           // ❌ 쓰기 불가 (실제 타입이 List<Bunny>일 수도 있으니까)
}

// 넣기만 함 → super
public static void addBunnies(List<? super Bunny> list) {
    list.add(new Bunny());               // ✅ 쓰기 OK
    list.add(new DrunkenBunny());        // ✅ Bunny의 자식도 OK
    // Bunny b = list.get(0);            // ❌ 꺼내면 Object 취급
}
```

> 실제로 `Collections.copy(List<? super T> dest, List<? extends T> src)`가 이 원칙대로 선언되어 있습니다.

또 하나 헷갈리는 점: **`Bunny`가 `Rabbit`의 자식이어도 `List<Bunny>`는 `List<Rabbit>`의 자식이 아닙니다.** (제네릭은 불공변)
그래서 `List<Rabbit>` 매개변수에 `List<Bunny>`를 넘길 수 없고, 이럴 때 와일드카드가 필요한 것입니다.

### 3-5. 오토박싱의 함정

```java
Integer a = 127, b = 127;
System.out.println(a == b);       // true  (-128 ~ 127은 캐싱됨)

Integer c = 128, d = 128;
System.out.println(c == d);       // false (서로 다른 객체!)
System.out.println(c.equals(d));  // true
```

👉 **Wrapper 객체끼리 비교할 때는 반드시 `equals()`** 를 사용하세요.

또 `null`을 기본형으로 언박싱하면 `NullPointerException`이 납니다.

```java
Map<String, Integer> scores = new HashMap<>();
int score = scores.get("없는키");   // 💥 NullPointerException
int safe  = scores.getOrDefault("없는키", 0);   // ✅
```

### 3-6. `List<Integer>`의 `remove()` 헷갈림

```java
List<Integer> nums = new ArrayList<>(List.of(10, 20, 30));

nums.remove(1);                    // 인덱스 1 삭제 → [10, 30]
nums.remove(Integer.valueOf(10));  // 값 10 삭제   → [30]
```

`remove(int index)`와 `remove(Object o)`가 오버로딩되어 있어서, 값으로 지우고 싶다면 `Integer.valueOf()`로 감싸야 합니다.

### 3-7. 반복 중 삭제하면 `ConcurrentModificationException`

```java
for (BookDTO book : bookList) {
    if (book.getPrice() < 30000) {
        bookList.remove(book);   // 💥 ConcurrentModificationException
    }
}

// ✅ 해결 1: removeIf (Java 8+)
bookList.removeIf(book -> book.getPrice() < 30000);

// ✅ 해결 2: Iterator 직접 사용
Iterator<BookDTO> it = bookList.iterator();
while (it.hasNext()) {
    if (it.next().getPrice() < 30000) it.remove();
}
```

### 3-8. 직접 만든 객체를 Set / Map Key로 쓰려면 `equals()` + `hashCode()`

`HashSet`과 `HashMap`은 `hashCode()`와 `equals()`로 "같은 객체인지"를 판단합니다.
`BookDTO`에 이 두 메서드가 없으면 **내용이 같아도 다른 객체로 취급**되어 중복이 그대로 들어갑니다.

```java
Set<BookDTO> set = new HashSet<>();
set.add(new BookDTO(1, "홍길동전", "허균", 50000));
set.add(new BookDTO(1, "홍길동전", "허균", 50000));
System.out.println(set.size());   // 2 😱 (equals/hashCode 미구현 시)
```

```java
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof BookDTO)) return false;
    BookDTO b = (BookDTO) o;
    return no == b.no && price == b.price
            && Objects.equals(title, b.title)
            && Objects.equals(author, b.author);
}

@Override
public int hashCode() {
    return Objects.hash(no, title, author, price);
}
```

> 규칙: **`equals()`를 재정의하면 `hashCode()`도 반드시 같이 재정의**해야 합니다. (IntelliJ `Alt + Insert` → `equals() and hashCode()`로 자동 생성 가능)
> `TreeSet`/`TreeMap`은 `equals()` 대신 **`compareTo()` / `Comparator`** 결과로 중복을 판단한다는 점도 기억해 두세요.

### 3-9. Map 순회하기

```java
Map<String, String> map = new HashMap<>();
map.put("one", "java");
map.put("two", "javascript");

// 1) entrySet – Key와 Value를 같이 쓸 때 가장 효율적 (추천)
for (Map.Entry<String, String> entry : map.entrySet()) {
    System.out.println(entry.getKey() + " = " + entry.getValue());
}

// 2) keySet
for (String key : map.keySet()) {
    System.out.println(key + " = " + map.get(key));
}

// 3) forEach + 람다
map.forEach((k, v) -> System.out.println(k + " = " + v));
```

단어 개수 세기 같은 작업에는 `merge()`가 편리합니다.

```java
Map<String, Integer> count = new HashMap<>();
for (String word : List.of("a", "b", "a", "c", "a")) {
    count.merge(word, 1, Integer::sum);
}
System.out.println(count);   // {a=3, b=1, c=1}
```

> 📝 예제 주석에 "Map의 Key는 암묵적으로 String을 쓴다"고 적었지만, 이는 **자주 쓰인다는 의미일 뿐 규칙은 아닙니다.** `Integer`, `Long`, enum, 직접 만든 객체(단, `equals`/`hashCode` 구현 필수) 모두 Key로 쓸 수 있습니다.

### 3-10. 불변 컬렉션 – `List.of()`와 `Arrays.asList()`

```java
List<String> fixed = List.of("a", "b", "c");   // Java 9+
fixed.add("d");     // 💥 UnsupportedOperationException (수정 불가)

List<String> arr = Arrays.asList("a", "b", "c");
arr.set(0, "z");    // ✅ 값 변경은 가능
arr.add("d");       // 💥 UnsupportedOperationException (크기 변경 불가)

// 수정 가능한 리스트가 필요하면 새로 감싸기
List<String> mutable = new ArrayList<>(List.of("a", "b", "c"));
```

`List.of()`, `Set.of()`, `Map.of()`는 `null`도 허용하지 않습니다.

### 3-11. ArrayList vs LinkedList, 그리고 시간 복잡도

| 연산 | ArrayList | LinkedList |
|---|---|---|
| 인덱스로 조회 `get(i)` | **O(1)** | O(n) |
| 맨 끝에 추가 | O(1) (평균) | O(1) |
| 중간 삽입·삭제 | O(n) (요소 이동) | O(n) (위치 탐색) / 찾은 뒤엔 O(1) |

| 연산 | HashSet / HashMap | TreeSet / TreeMap |
|---|---|---|
| 추가 · 삭제 · 검색 | **O(1)** (평균) | O(log n) |
| 정렬 | X | O |

> 대부분의 경우 **`ArrayList`, `HashSet`, `HashMap`이 기본 선택**입니다. 순서가 필요하면 `Linked~`, 정렬이 필요하면 `Tree~`를 고르면 됩니다.

### 3-12. Properties 실전 팁

1. **`setProperty()`/`getProperty()`를 쓰자.** `Properties`는 `Hashtable<Object, Object>`를 상속하기 때문에 `put()`으로는 String이 아닌 값도 들어가지만, 그러면 `getProperty()`가 `null`을 반환합니다.
2. **설정은 코드가 아니라 파일에서 읽자.** 비밀번호 같은 민감 정보를 소스 코드에 하드코딩하면 Git에 그대로 올라갑니다.

```java
Properties prop = new Properties();
try (InputStream in = Files.newInputStream(Path.of("config.properties"))) {
    prop.load(in);
} catch (IOException e) {
    e.printStackTrace();
}
String url = prop.getProperty("url");
```

> 설정 파일은 `.gitignore`에 추가하고, 예시 파일(`config.properties.example`)만 공유하는 방식이 일반적입니다.
> 참고로 MySQL Connector/J 8 이상의 드라이버 클래스 이름은 `com.mysql.cj.jdbc.Driver`입니다.

### 3-13. 로또 번호, 더 깔끔하게 뽑기

한국 로또는 **1~45 중 6개 + 보너스 1개**입니다. `Math.random()` 대신 섞기(shuffle)를 이용하는 방법도 있습니다.

```java
List<Integer> balls = new ArrayList<>();
for (int i = 1; i <= 45; i++) balls.add(i);

Collections.shuffle(balls);
List<Integer> picked = new ArrayList<>(balls.subList(0, 6));
Collections.sort(picked);
int bonus = balls.get(6);

System.out.println(picked + " + 보너스 " + bonus);
```

`Random` 객체를 쓴다면 `new Random().nextInt(45) + 1`이 `(int)(Math.random() * 45) + 1`과 같은 범위(1~45)를 만들어 줍니다.

---

## 4. 마무리 요약

- **제네릭**은 타입을 컴파일 시점에 정해서 **타입 안정성**을 높이고 **형변환을 없애준다.**
- `<>` 안에는 **참조자료형만** → 기본형은 **Wrapper 클래스** 사용.
- `<T extends Type>`으로 타입 변수의 **상한**을 제한할 수 있다.
- 와일드카드: `<?>` 전체, `<? extends T>` 상한(읽기용), `<? super T>` 하한(쓰기용) → **PECS**.
- **List**: 순서 O, 중복 O → `ArrayList`
- **Set**: 순서 X, 중복 X → `HashSet`, 정렬이 필요하면 `TreeSet`
- **Map**: Key-Value, Key 중복 X → `HashMap`, 설정값 전용은 `Properties`
- 직접 만든 객체를 Set/Map Key에 넣는다면 **`equals()` + `hashCode()`** 필수.
- 정렬 기준은 **`Comparable`(기본 기준)** 또는 **`Comparator`(외부 기준)** 로 알려준다.
- Raw Type, Wrapper `==` 비교, 반복 중 삭제, 불변 컬렉션 수정은 **대표적인 함정**이니 주의하자.
