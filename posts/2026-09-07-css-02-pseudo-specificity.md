---
title: "[CSS] 02. 가상 클래스·가상 요소 선택자와 우선순위"
date: 2026-09-07
time: "09:02"
section: Study Notes
module: Module 1
categories: [CSS, Frontend]
tags: [css, hover, nth-child, not, pseudo-element, specificity, important]
---

> CSS 기초 시리즈
> 1. CSS 기초와 기본·속성·관계 선택자
> 2. **가상 선택자와 우선순위** ← 지금 글
> 3. 박스 모델, display, Flex, Grid
> 4. transition, transform, animation
> 5. CSS 프레임워크 (Tailwind, Bootstrap)

---

## 1. 가상 클래스 vs 가상 요소

| 구분 | 문법 | 의미 | 예 |
|---|---|---|---|
| 가상 클래스 (pseudo-class) | `:` 하나 | 요소의 **상태나 위치** | `:hover`, `:checked`, `:nth-child()` |
| 가상 요소 (pseudo-element) | `::` 두 개 | 요소의 **일부분** | `::first-letter`, `::selection` |

---

## 2. 반응 선택자 — 사용자 행동에 따라

| 선택자 | 적용 시점 |
|---|---|
| `:hover` | 마우스가 **올라가 있는** 동안 |
| `:active` | 마우스로 **누르고 있는** 동안 (클릭하는 순간) |
| ➕ `:focus` | 클릭·Tab으로 **포커스를 받은** 동안 (주로 입력창) |
| ➕ `:visited` | 이미 방문한 링크 |

```css
#active-test:active {
    background: red;
    color: white;
}

#hover-test:hover {
    cursor: pointer;          /* 마우스 커서를 손가락 모양으로 */
    background: darkgreen;
    color: bisque;
    font-size: 60px;
}
```

> ⚠️ 실습 코드의 `font: 60px bold;`는 **무시되는 잘못된 값**이다. `font` 단축 속성은 순서가 정해져 있고 **글꼴 이름이 필수**다.
> `font: bold 60px sans-serif;` (굵기 → 크기 → 글꼴) 처럼 쓰거나, `font-size`, `font-weight`를 따로 쓴다.

> ➕ 링크에 여러 상태를 줄 땐 **LVHA 순서**(`:link` → `:visited` → `:hover` → `:active`)로 작성해야 서로 덮어쓰지 않는다.

---

## 3. 상태 선택자 — 입력 양식의 상태에 따라

| 선택자 | 선택 대상 |
|---|---|
| `:checked` | 체크된 체크박스·라디오 |
| `:focus` | 포커스를 받은 입력창 |
| `:enabled` | 사용 가능한 요소 |
| `:disabled` | `disabled` 속성이 있어 사용 불가인 요소 |

```css
input[type=checkbox]:checked {   /* 속성 선택자 + 상태 선택자 조합 */
    width: 100px;
    height: 100px;
}

#userId:focus, #userPwd:focus {  /* 쉼표: 그룹 선택자 */
    background: hotpink;
}

option:enabled  { background: darkred; }
option:disabled { background: red; }
```

```html
<select>
    <option value="붕어빵" disabled>붕어빵</option>  <!-- 선택 불가 -->
    <option value="피자빵">피자빵</option>
</select>
<input type="text" disabled>
<button disabled>눌리지 않는 버튼</button>
```

> ➕ 자주 쓰는 폼 상태 선택자: `:required`, `:invalid`/`:valid`(유효성 검사 결과), `:placeholder-shown`, `:focus-visible`(키보드 포커스일 때만)

---

## 4. 동위(형제) 선택자

자손/후손처럼 포함 관계가 아니라, **같은 부모를 둔 별도의 요소들** 사이의 관계다.

| 선택자 | 문법 | 의미 |
|---|---|---|
| 인접 형제 | `A + B` | A **바로 다음** B 하나 |
| 일반 형제 | `A ~ B` | A **뒤에 있는** B 전부 |

```css
#div-test1       { background: red; }
#div-test1 + div { background: green; }      /* div-test2만 */
#div-test1 ~ div { background: darkkhaki; }  /* div-test2 ~ 5 전부 */
```

> 형제 선택자는 **뒤쪽만** 고를 수 있다. 앞에 있는 형제를 고르는 선택자는 없다.

---

## 5. 구조 선택자 — 위치로 고르기

```html
<div id="test">
    <p>테스트1</p>
    <p>테스트2</p>
    <p>테스트3</p>
    <p>테스트4</p>
    <p>테스트5</p>
    <pre>테스트6</pre>
</div>
```

| 선택자 | 의미 | 위 예시에서 |
|---|---|---|
| `:first-child` | 형제 중 첫 번째 | 테스트1 |
| `:last-child` | 형제 중 마지막 | 테스트6 (pre) |
| `:nth-child(n)` | 앞에서 n번째 | `(2)` → 테스트2 |
| `:nth-child(2n)` | 짝수 번째 (= `even`) | 테스트2, 4, 6 |
| `:nth-child(2n+1)` | 홀수 번째 (= `odd`, `2n-1`도 같음) | 테스트1, 3, 5 |
| `:nth-last-child(n)` | 뒤에서 n번째 | `(4)` → 테스트3 |
| `:first-of-type` | **같은 태그 중** 첫 번째 | p 중 첫째 → 테스트1, pre 중 첫째 → 테스트6 |
| `:last-of-type` | 같은 태그 중 마지막 | |
| `:nth-of-type(n)` | 같은 태그 중 n번째 | |

```css
#test :first-child     { background: rebeccapurple; }
#test :last-child      { background: darkgoldenrod; }
#test :nth-child(2)    { background: darkblue; }
#test :nth-child(2n)   { background: slateblue; }      /* 아래에 있어서 위 (2)를 덮어씀 */
#test :nth-last-child(4) { background: darkgreen; }
```

### `-child` vs `-of-type`

- `p:nth-child(2)` : **모든 형제 중 2번째**인데 그게 `p`여야 선택
- `p:nth-of-type(2)` : **p 형제들 중** 2번째

형제에 다른 태그가 섞여 있으면 결과가 달라진다.

> ⚠️ 실습 코드의 `#test2 :first-of-type(1)`은 **잘못된 문법이라 통째로 무시**된다. `:first-of-type`은 괄호 인자를 받지 않는다. `:first-of-type` 또는 `:nth-of-type(1)`로 써야 한다.

> 💡 `#test :first-child`처럼 **공백이 있으면** "#test의 후손 중 first-child인 모든 요소"라는 뜻이다. `#test > p:first-child`처럼 대상을 명확히 쓰는 게 안전하다.

> ➕ `n`은 0부터 대입된다. `:nth-child(n+3)`은 3번째부터 끝까지, `:nth-child(-n+3)`은 처음 3개.

---

## 6. 부정 선택자 `:not()`

괄호 안 조건의 **반대**를 고른다.

```css
/* 짝수 번째가 아닌 p → 홀수 번째 p */
#test2 p:not(:nth-child(2n)) {
    background: orange;
}
```

> ➕ 실무 예: `li:not(:last-child) { border-bottom: 1px solid #ddd; }` → 마지막 항목만 빼고 구분선

---

## 7. 문자 선택자 (가상 요소)

태그 내부의 **특정 문자 부분**을 고른다.

| 선택자 | 대상 |
|---|---|
| `::first-letter` | 첫 글자 |
| `::first-line` | 첫 줄 (화면 너비에 따라 바뀜) |
| `::selection` | 사용자가 **드래그해서 선택한** 부분 |

```css
#test3 p::first-letter { font-size: 50px; font-weight: bold; }
#test3 p::first-line   { font-size: 50px; font-weight: bold; }
#test3 p::selection    { color: red; }
```

> ➕ 가장 많이 쓰는 가상 요소는 `::before`, `::after`다. 요소의 앞/뒤에 HTML 없이 내용을 추가한다. `content` 속성이 필수.
> ```css
> .required::after { content: " *"; color: red; }
> ```

---

## 8. 선택자 우선순위 ⭐

- CSS는 기본적으로 **위에서 아래로** 적용된다.
- 같은 요소에 여러 규칙이 걸리면 **우선순위**가 높은 쪽이 이긴다.
- 우선순위가 같으면 **나중에 쓴 규칙**이 이긴다.

```
(강함) !important > 인라인 스타일 > 아이디(#) > 클래스(.) > 태그(div) > 전체(*) (약함)
```

```html
<div id="test1" class="test1">우선순위테스트</div>
<div id="test2" class="test2" style="background: green;">우선순위테스트</div>
```

```css
* { color: red; }
div { background: blue; color: aqua; }
#test1 { background: rebeccapurple; }   /* test1 → 이 색 (id > class > tag) */
.test1 { background: olive; }
#test2 { background: mediumpurple; }
.test2 { background: darkorange !important; }  /* test2 → 이 색 (인라인보다도 강함) */
```

- test1: 배경은 `#test1`의 rebeccapurple. 글자색은 `div`의 aqua (`*`보다 `div`가 강함)
- test2: 인라인 `green`도 이기는 `!important`의 darkorange

### `!important`는 최후의 보루

모든 우선순위를 무시하므로, 한 번 쓰면 그걸 덮으려고 또 `!important`를 쓰는 악순환이 생긴다. 외부 라이브러리 스타일을 어쩔 수 없이 덮을 때 같은 경우에만 쓴다.

### ➕ 명시도(Specificity) 계산법

실제 브라우저는 선택자를 **(id 개수, class·속성·가상클래스 개수, 태그·가상요소 개수)** 로 점수를 매겨 왼쪽 자리부터 비교한다.

| 선택자 | 점수 |
|---|---|
| `*` | (0, 0, 0) |
| `li` | (0, 0, 1) |
| `ul li` | (0, 0, 2) |
| `.card` | (0, 1, 0) |
| `li.active:hover` | (0, 2, 1) |
| `#test1 > h4` | (1, 0, 1) |

- class를 아무리 많이 붙여도 id 하나를 못 이긴다.
- `:not()` 자체는 점수가 없고 괄호 안 선택자 점수가 들어간다.
- 인라인 스타일은 이 표보다 위, `!important`는 그보다 위.

### ➕ 상속(Inheritance)

`color`, `font-*`, `line-height` 같은 **글자 관련 속성**은 부모에서 자식으로 물려받는다. `background`, `border`, `margin`, `padding`, `width` 같은 **박스 관련 속성**은 상속되지 않는다.

상속받은 값은 우선순위가 가장 낮다. 그래서 `body { color: gray; }`를 써도 `* { color: red; }`가 있으면 모든 요소가 빨간색이 된다. `*`는 요소에 **직접** 걸리는 규칙이기 때문이다.

---

## ✅ 마무리 요약

- `:` 가상 클래스(상태·위치), `::` 가상 요소(일부분)
- 반응 `:hover`/`:active`, 상태 `:checked`/`:focus`/`:enabled`/`:disabled`
- 형제 `+` 바로 다음 하나, `~` 뒤쪽 전부
- 구조 `:nth-child(n)`, `2n` 짝수, `2n+1` 홀수, `-of-type`은 같은 태그끼리만 셈
- `:not()`은 반대, `::selection`은 드래그 영역
- `!important` > 인라인 > id > class > tag > `*`, 같으면 나중 것
