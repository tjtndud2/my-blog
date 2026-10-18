---
title: "[CSS] 01. CSS 기초와 기본·속성·관계 선택자"
date: 2026-09-07
time: "09:01"
section: Study Notes
module: Module 1
categories: [CSS, Frontend]
tags: [css, selector, 선택자, 속성선택자, 자손선택자]
---

> CSS 기초 시리즈
> 1. **CSS 기초와 기본·속성·관계 선택자** ← 지금 글
> 2. 가상 선택자와 우선순위
> 3. 박스 모델, display, Flex, Grid
> 4. transition, transform, animation
> 5. CSS 프레임워크 (Tailwind, Bootstrap)

---

## 1. CSS란?

**CSS(Cascading Style Sheets)** 는 HTML 요소의 **모양(색, 크기, 배치, 움직임)** 을 정하는 언어다.

- HTML = 무엇인가(구조·의미), CSS = 어떻게 보이는가(표현)
- **Cascading(폭포)**: 여러 규칙이 겹치면 정해진 순서와 우선순위에 따라 위에서 아래로 흘러내리듯 최종 스타일이 결정된다.

### 기본 문법

```css
선택자 {
    속성: 값;
    속성: 값;
}

li {
    color: yellowgreen;
}
```

| 용어 | 예시 | 설명 |
|---|---|---|
| 선택자(selector) | `li` | 스타일을 적용할 대상 |
| 선언 블록 | `{ ... }` | 적용할 스타일 묶음 |
| 속성(property) | `color` | 바꿀 항목 |
| 값(value) | `yellowgreen` | 속성의 값 |

- 선언 끝에는 `;`를 붙인다.
- 주석은 `/* */` 한 가지뿐이다. (`//`는 CSS 주석이 아님)
- 속성이나 값이 잘못되면 **에러 없이 그 줄만 무시**된다. 스타일이 안 먹으면 오타부터 의심한다.

---

## 2. CSS를 적용하는 3가지 방법

| 방식 | 위치 | 특징 |
|---|---|---|
| 인라인 | 태그의 `style` 속성 | 해당 요소 하나에만 적용, 우선순위 매우 높음, 재사용 불가 |
| 내부 스타일시트 | `<head>` 안 `<style>` 태그 | 그 HTML 파일 안에서만 적용 |
| 외부 스타일시트 | 별도 `.css` 파일 + `<link>` | 여러 페이지에서 재사용, **실무 표준** |

```html
<!-- 1. 인라인 -->
<div style="background: green;">...</div>

<!-- 2. 내부: style 태그 안은 HTML이 아니라 CSS 영역 -->
<head>
    <style>
        li { color: yellowgreen; }
    </style>
</head>

<!-- 3. 외부 -->
<head>
    <link rel="stylesheet" href="selector.css">
</head>
```

내부 스타일시트에 CSS를 잔뜩 쓰면 `<head>`가 길어지고 다른 페이지에서 재사용할 수 없다. 이 문제를 외부 스타일시트로 해결한다. HTML은 구조만, CSS 파일은 디자인만 맡게 되어 관리가 쉬워진다.

---

## 3. 선택자(Selector)란?

특정 HTML 요소를 **골라내는** 기능이다. 요소를 선택해야 원하는 스타일과 기능(JS)을 적용할 수 있다.

### 3-1. 기본 선택자

| 선택자 | 문법 | 선택 대상 |
|---|---|---|
| 전체 선택자 | `*` | 문서 안의 모든 요소 |
| 태그 선택자 | `li` | 해당 태그 전부 |
| 아이디 선택자 | `#id3` | `id="id3"`인 요소 (페이지에 하나) |
| 클래스 선택자 | `.class3` | `class="class3"`인 요소 전부 |

```css
* { color: red; }

li { color: yellowgreen; }

#id3 {
    color: yellow;
    background-color: blue;
}

.class3 {
    color: aqua;
    background-color: bisque;
}
```

한 요소가 여러 선택자에 걸리면 **id > class > tag > \*** 순으로 이긴다. (자세한 건 2편 우선순위)

> 💡 **id vs class**
> - `id`는 페이지에서 **유일**해야 한다. 같은 id를 여러 요소에 쓰면 HTML 규칙 위반이다.
> - `class`는 여러 요소가 공유할 수 있고, 한 요소에 여러 개를 공백으로 붙일 수 있다: `class="card active"`
> - 실무에선 스타일링에 주로 **class**를 쓰고, id는 앵커 링크·label 연결·JS용으로 남겨둔다. id는 우선순위가 너무 강해서 나중에 덮어쓰기 어렵기 때문이다.

### ➕ 선택자 조합

```css
h1, h2, p { margin: 0; }        /* 그룹 선택자: 쉼표로 여러 개에 같은 스타일 */
li.class3 { ... }                /* 붙여 쓰기: class3를 가진 li만 (AND) */
.card.active { ... }             /* card와 active 클래스를 둘 다 가진 요소 */
```

---

## 4. 속성 선택자

기본 선택자 뒤에 `[ ]`를 붙여 **속성과 속성값으로** 요소를 고른다.

```
선택자[속성명=속성값] { 설정 내용 }
```

예제 HTML:

```html
<div name="name1 name5 name6" class="div-class">div1</div>
<div name="name2" class="div-class">div2</div>
<div name="name3" class="div-class">div3</div>
<div name="name4" class="class-div">div4</div>
```

| 문법 | 의미 | 예시 | 선택되는 것 |
|---|---|---|---|
| `[속성]` | 속성을 가지고 있기만 하면 | `input[disabled]` | |
| `[속성=값]` | 값이 **정확히 일치** | `div[name=name2]` | div2 |
| `[속성~=값]` | 공백으로 나뉜 단어 중 하나가 일치 | `div[name~=name1]` | div1 |
| `[속성\|=값]` | 값이 정확히 일치하거나 `값-`으로 시작 | `div[class\|=class]` | div4 (`class-div`) |
| `[속성^=값]` | 값으로 **시작** (접두사) | `div[name^=name]` | div1~4 전부 |
| `[속성$=값]` | 값으로 **끝남** (접미사) | `div[class$=class]` | div1~3 (`div-class`) |
| `[속성*=값]` | 값을 **포함** | `div[class*=div]` | div1~4 전부 |

외우는 요령: `^`는 정규식의 시작, `$`는 끝, `*`는 아무 데나, `~`는 단어 단위, `|`는 언어코드처럼 `en`, `en-US` 하이픈 구분.

> ⚠️ 우선순위가 같은 규칙끼리는 **가장 마지막에 작성한 코드**가 적용된다. 위 예제에서 div1은 `~=`, `^=`, `$=`, `*=`에 모두 걸리지만 맨 아래 `[class*=div]`의 배경색이 최종 적용된다.

> ➕ 실무에서 자주 보는 형태: `input[type=checkbox]`, `a[href^="https"]`(외부 링크), `a[href$=".pdf"]`(PDF 링크).
> 값에 공백이나 특수문자가 있으면 따옴표로 감싼다: `[name="name1 name5"]`

---

## 5. 관계 선택자 — 자식(자손)과 후손

HTML은 부모–자식 트리 구조다. 이 관계로 요소를 고를 수 있다.

| 선택자 | 문법 | 의미 |
|---|---|---|
| 자식(자손) 선택자 | `A > B` | A **바로 아래** 한 단계의 B만 |
| 후손 선택자 | `A B` (공백 한 칸) | A 안에 있는 **모든 단계**의 B |

> 수업 자료에서는 바로 아래를 "자손", 전체 하위를 "후손"이라 불렀다. 일반적으로는 바로 아래를 **자식(child)**, 전체 하위를 **자손(descendant)** 이라 부르는 경우가 많으니 문서를 읽을 때 헷갈리지 말자.

```html
<div id="test1">
    <h4>자손 1번 입니다.</h4>
    <h4>자손 2번 입니다.</h4>
    <div>
        <ul id="testul">리스트
            <li>ul 태그의 자손이면서, div 태그의 후손</li>
            <li>ul 태그의 자손이면서, div 태그의 후손</li>
        </ul>
    </div>
</div>
```

```css
#test1 > h4 { background: hotpink; }        /* ✅ test1 바로 아래 h4 */

#test1 > ul > li { background: chocolate; } /* ❌ 아무것도 선택 안 됨 */
/* ul은 test1의 바로 아래가 아니라 안쪽 div 아래에 있기 때문 */

#test1 > div > ul > li { ... }              /* ✅ 경로를 정확히 쓰거나 */
#test1 ul { background: chocolate; }        /* ✅ 후손 선택자로 깊이 무시 */
```

정리: **자식은 꺾쇠 `>`, 후손은 띄어쓰기 한 칸.** 부모 태그의 id를 기준점으로 잡으면 범위를 좁히기 쉽다.

> ⚠️ 공백 하나가 뜻을 바꾼다. `.card:hover`는 "hover된 카드", `.card :hover`는 "카드 안쪽의 hover된 요소"다.

---

## 6. ➕ Emmet으로 실습 구조 빠르게 만들기

실습 HTML 주석에 나온 약어들이다.

| 입력 | 결과 |
|---|---|
| `ul>li{테스트$}*3` | 텍스트가 테스트1~3인 li 3개 |
| `ol>li#id$*5` | id가 id1~id5인 li 5개 |
| `ul>li.class$*5{클래스 테스트$}` | class1~5 li 5개 |
| `div[name=name$].div-class{div$}*4` | 속성·클래스·텍스트까지 한 번에 |
| `div#test1>h4*2+div>ul>li*2` | `+`는 **형제**, `>`는 자식 |
| `(input:c[name=fruits]+label)*3` | `()`는 그룹, `input:c`는 checkbox |
| `input:t`, `input:p` | text, password input |

---

## ✅ 마무리 요약

- CSS는 외부 스타일시트(`<link>`)로 분리하는 게 표준
- 기본 선택자: `*`, `태그`, `#id`, `.class`
- 속성 선택자: `=` 일치, `~=` 단어 포함, `|=` 값 또는 값-, `^=` 시작, `$=` 끝, `*=` 포함
- 자식 `>`는 한 단계, 후손 공백은 모든 단계
- 같은 우선순위면 나중에 쓴 규칙이 이긴다
