---
title: "[HTML] 05. 시맨틱 태그, 웹 접근성, 실무 팁과 치트시트"
date: 2026-09-01
time: "09:05"
section: Study Notes
module: Module 1
categories: [HTML, Frontend]
tags: [html, semantic, 접근성, emmet, 개발자도구, 치트시트]
---

> HTML 기초 시리즈
> 1. HTML 기본 구조와 글자 태그
> 2. 목록과 표
> 3. 영역·이미지·미디어·링크
> 4. 폼(Form)
> 5. **시맨틱 태그와 실무 팁** ← 지금 글

---

## 1. 시맨틱(Semantic) 태그

`<div>`만으로도 페이지를 만들 수 있지만, **의미를 가진 태그**를 쓰면 코드 가독성, 웹 접근성, 검색 엔진 최적화(SEO)가 모두 좋아진다. 화면 모양은 `<div>`와 똑같이 블록으로 표시된다. 차이는 의미뿐이다.

```html
<!-- ❌ div만 사용 -->
<div class="header">...</div>
<div class="nav">...</div>
<div class="content">...</div>
<div class="footer">...</div>

<!-- ✅ 시맨틱 태그 사용 -->
<header>...</header>
<nav>...</nav>
<main>
    <article>
        <section>...</section>
    </article>
    <aside>...</aside>
</main>
<footer>...</footer>
```

| 태그 | 의미 |
|---|---|
| `<header>` | 페이지나 구역의 머리말 (로고, 제목) |
| `<nav>` | 주요 내비게이션 링크 모음 |
| `<main>` | 페이지의 핵심 콘텐츠 (페이지당 하나) |
| `<article>` | 독립적으로 배포 가능한 콘텐츠 (블로그 글, 뉴스 기사) |
| `<section>` | 주제별로 묶인 구역 (보통 제목 태그를 포함) |
| `<aside>` | 본문과 간접적으로 관련된 내용 (사이드바, 광고) |
| `<footer>` | 페이지나 구역의 꼬리말 (저작권, 연락처) |

**언제 `div`를 쓰나?** 의미 없이 순전히 스타일·레이아웃을 위해 묶을 때만.

---

## 2. HTML로 할 것과 CSS로 할 것

> **원칙: HTML은 "무엇인가(의미)", CSS는 "어떻게 보이는가(표현)"**

| HTML에서 쓰던 방식 (권장 안 함) | CSS 방식 (권장) |
|---|---|
| `<table border="1">` | `border: 1px solid black;` |
| `<td width="200px">` | `width: 200px;` |
| `<p align="center">` | `text-align: center;` |
| `<b>`로 꾸미기 | `font-weight: bold;` |
| `<br><br><br>`로 간격 | `margin`, `padding` |
| 큰 글씨를 위해 `<h1>` | `font-size` |

### CSS를 적용하는 3가지 방법

```html
<!-- 1. 인라인 스타일: 태그에 직접 -->
<p style="color: red;">빨간 글씨</p>

<!-- 2. 내부 스타일: head 안 style 태그 -->
<style>
    p { color: red; }
</style>

<!-- 3. 외부 스타일 (실무 권장): 별도 파일 연결 -->
<link rel="stylesheet" href="style.css">
```

---

## 3. 웹 접근성(Accessibility) 체크리스트

웹 접근성은 장애 여부와 관계없이 **모든 사용자가 동등하게 웹을 이용**할 수 있게 하는 것이다. 시각장애인은 스크린 리더가 HTML을 읽어주는 소리로 웹을 쓴다. 그래서 올바른 태그 선택이 곧 접근성이다.

- [ ] `<html lang="ko">` 언어 지정
- [ ] 모든 `<img>`에 적절한 `alt` (장식용은 `alt=""`)
- [ ] 모든 입력 요소에 `<label>` 연결
- [ ] 제목 태그를 순서대로 (`h1 → h2 → h3`)
- [ ] 링크 텍스트는 "여기", "클릭" 대신 목적지가 드러나게
- [ ] 표에 `<caption>`과 `<th>` (+ `scope`)
- [ ] 클릭할 수 있는 건 `<div>` 말고 `<button>` 또는 `<a>` (키보드 Tab·Enter로도 작동)

---

## 4. 코드 디버깅: 틀린 곳 찾기

실습에서 나온 "고칠 곳 찾기" 유형이다.

```html
<h1>김서연</h1>
<p>안녕하세요.</p>

<h3><p>좋아하는 것</p></h3>
<ul>
  <li>등산</li>
  <li>사진 찍기</li>
  <li>보드게임</li>
</ul>

<h3>링크</h3>
<a href=hobby.html>취미 페이지</a>
```

| 문제 | 수정 |
|---|---|
| 제목 태그 안에 `<p>` 중첩 | `<h3>좋아하는 것</h3>` |
| 속성 값에 따옴표 없음 | `href="hobby.html"` |

이런 문제를 찾을 때 볼 체크리스트:

- 블록 요소끼리 잘못 중첩되지 않았는가? (`h1~h6`와 `<p>`는 글 내용만 담을 수 있어 서로 넣을 수 없다)
- 여는 태그와 닫는 태그 짝, 닫는 순서가 맞는가?
- 속성 값에 따옴표가 있는가?
- `<ul>`/`<ol>` 바로 아래가 `<li>`인가?
- `lang`, `<title>`이 내용에 맞는가?
- `<img>`에 `alt`, 입력창에 `<label>`, 폼 요소에 `name`이 있는가?

> 브라우저는 이런 오류를 알아서 보정해 보여주기 때문에 눈으론 티가 안 나는 경우가 많다. [W3C Validator](https://validator.w3.org/)에 코드를 붙여 넣어 검사하는 습관을 들이자.

---

## 5. Emmet 단축키

VS Code에 내장된 **Emmet**은 약어를 입력하고 `Tab`을 누르면 코드를 자동 완성한다.

| 입력 | 결과 |
|---|---|
| `!` | HTML 기본 구조 |
| `ul>li*3` | `<ul>` 안에 `<li>` 3개 |
| `ul>li*3>a` | `<a>`를 가진 `<li>` 3개 |
| `tr*3>td*3` | 3행 3열 표의 행/칸 |
| `div.box` | `<div class="box"></div>` |
| `div#main` | `<div id="main"></div>` |
| `p{안녕}` | `<p>안녕</p>` |
| `li.item$*3` | `item1`, `item2`, `item3` 클래스를 가진 li 3개 |

`>` 자식, `*` 반복, `.` class, `#` id, `{}` 텍스트, `$` 번호

> VS Code 확장 **Live Server**를 설치하면 `Alt + L, Alt + O`로 로컬 서버가 열리고, 저장할 때마다 브라우저가 자동 새로고침된다.

---

## 6. 개발자 도구 활용

브라우저에서 `F12` (또는 우클릭 → 검사)

| 탭 | 활용 |
|---|---|
| Elements | 브라우저가 실제로 해석한 HTML 구조 확인 (잘못 중첩된 태그가 어떻게 보정됐는지 보임), 스타일 실시간 수정 |
| Network | 폼 전송 시 GET/POST로 어떤 데이터가 넘어가는지 확인 |
| Console | 이미지 경로 오류(404) 등 에러 메시지 확인 |

---

## 7. 한눈에 보는 태그 치트시트

| 분류 | 태그 | 한 줄 요약 |
|---|---|---|
| 문서 구조 | `html`, `head`, `body`, `title`, `meta`, `link`, `script` | 문서의 뼈대와 정보 |
| 제목·문단 | `h1`~`h6`, `p`, `pre` | 제목(계층) / 문단 / 공백 유지 문단 |
| 줄·선 | `br`, `hr` | 줄바꿈 / 구분선 |
| 텍스트 | `strong`, `em`, `b`, `i`, `mark`, `u`, `small`, `s`, `sub`, `sup`, `code` | 텍스트 꾸밈 (의미 유무 구분) |
| 인용 | `blockquote`, `q` | 블록 인용 / 인라인 인용 |
| 목록 | `ul`, `ol`, `li`, `dl`, `dt`, `dd` | 순서 없는 / 있는 / 정의 목록 |
| 표 | `table`, `caption`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td` | `colspan` 가로 병합, `rowspan` 세로 병합 |
| 영역 | `div`, `span` | 블록 영역 / 인라인 영역 |
| 시맨틱 | `header`, `nav`, `main`, `article`, `section`, `aside`, `footer` | 의미 있는 영역 |
| 이미지 | `img`, `figure`, `figcaption` | `src`, `alt` |
| 미디어 | `audio`, `video`, `source`, `iframe` | `controls`, `loop`, `autoplay`, `muted` |
| 링크 | `a` | `href`, `target`, `#id` 내부 이동 |
| 폼 | `form` | `action`, `method` |
| | `input` | `type`, `name`, `value`, `placeholder` |
| | `label` | `for` ↔ `id` 연결 |
| | `select`, `option` | 드롭다운, `selected`, `multiple` |
| | `textarea` | 여러 줄 입력, `cols`, `rows` |
| | `button` | 기본값 `submit` |
| | `fieldset`, `legend` | 입력 항목 그룹 |

---

## ✅ 마치며

HTML은 문법은 단순하지만 **"이 내용에 가장 알맞은 의미의 태그는 무엇인가?"** 를 고민하는 게 핵심이다.

1. **구조를 먼저** — 어떻게 보일지보다 내용이 어떤 구조인지 먼저 생각하기
2. **의미에 맞는 태그** — 모양이 아니라 의미로 태그 고르기
3. **꾸미기는 CSS에게** — HTML 속성으로 디자인하는 습관 버리기
4. **모두를 위한 웹** — `alt`, `label`, `lang`으로 접근성 챙기기

다음 시리즈에서는 이 뼈대에 **CSS**로 스타일을 입혀본다.
