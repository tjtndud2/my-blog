---
title: "[CSS] 05. CSS 프레임워크 — 같은 카드를 Tailwind와 Bootstrap으로"
date: 2026-09-07
time: "09:05"
section: Study Notes
module: Module 1
categories: [CSS, Frontend]
tags: [css, tailwind, tailwindcss, bootstrap, utility-first, cdn]
---

> CSS 기초 시리즈
> 1. CSS 기초와 기본·속성·관계 선택자
> 2. 가상 선택자와 우선순위
> 3. 박스 모델, display, Flex, Grid
> 4. transition, transform, animation
> 5. **CSS 프레임워크 (Tailwind, Bootstrap)** ← 지금 글

---

## 1. 왜 CSS 프레임워크를 쓰나?

직접 CSS를 쓰면 클래스 이름 짓기, 파일 오가며 수정하기, 프로젝트마다 버튼·카드를 처음부터 만들기가 반복된다. 프레임워크는 **미리 만들어둔 클래스**를 HTML에 붙이기만 하면 스타일이 적용되게 해준다.

| | Bootstrap | Tailwind CSS |
|---|---|---|
| 방식 | **컴포넌트** 클래스 | **유틸리티** 클래스 (Utility-First) |
| 클래스 예 | `btn btn-primary`, `card` | `bg-white p-4 rounded-lg` |
| 클래스 하나가 | 완성된 부품 하나 | CSS 속성 하나 |
| 장점 | 빠르게 그럴듯한 화면 | 디자인 자유도 높음, CSS 파일을 오갈 필요 없음 |
| 단점 | 사이트들이 비슷해 보임, 커스텀 시 덮어쓰기 필요 | HTML의 class가 길어짐, 클래스 이름을 익혀야 함 |

---

## 2. CDN으로 불러오기

**CDN(Content Delivery Network)**: 라이브러리 파일을 설치하지 않고 인터넷 주소로 바로 불러오는 방식. 학습·프로토타입에 편하다.

```html
<!-- Tailwind (v4 브라우저용) -->
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-..." crossorigin="anonymous">

<!-- Bootstrap이 드롭다운·툴팁 위치 계산에 쓰는 Popper -->
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-..." crossorigin="anonymous"></script>
```

- Tailwind는 `<script>`로, Bootstrap은 `<link>`(CSS)로 불러온다. Tailwind 브라우저 버전은 페이지의 class를 읽어 필요한 CSS를 즉석에서 만들어낸다.
- ➕ `integrity`는 **SRI(Subresource Integrity)** 해시다. CDN 파일이 중간에 변조되면 해시가 맞지 않아 브라우저가 실행을 거부한다.
- ➕ Bootstrap의 드롭다운·모달 같은 **동작**은 CSS만으론 안 되고 `bootstrap.bundle.min.js`(Popper 포함)가 필요하다. 버튼처럼 모양만 쓸 땐 CSS 링크로 충분하다.
- ➕ Tailwind CDN은 **개발·학습용**이다. 실제 배포에선 npm으로 설치해 빌드하면, 사용한 클래스만 담긴 작은 CSS 파일이 만들어진다.
- 두 프레임워크를 한 페이지에서 같이 쓰면 기본 스타일이 서로 충돌하므로 하나만 쓴다. (실습에서도 Tailwind 스크립트를 주석 처리하고 Bootstrap을 켰다)

---

## 3. Bootstrap 맛보기

```html
<button type="button" class="btn btn-outline-success">눌러주세요</button>
```

| 클래스 | 의미 |
|---|---|
| `btn` | 버튼 기본 모양 (padding, 둥근 모서리, hover 효과) |
| `btn-outline-success` | 초록 테두리 + 투명 배경, hover 시 초록으로 채워짐 |

| 색 이름 | 의미 |
|---|---|
| `primary` | 파랑 (주요 동작) |
| `secondary` | 회색 |
| `success` | 초록 (성공) |
| `danger` | 빨강 (삭제·경고) |
| `warning` | 노랑 |
| `info` | 하늘색 |

`btn-primary`(채움) / `btn-outline-primary`(테두리만), `btn-sm` / `btn-lg`(크기) 식으로 조합한다. 이 외에 `card`, `navbar`, `modal`, 12칸 그리드(`container`, `row`, `col-4`) 등이 있다.

---

## 4. Tailwind — 직접 쓴 CSS를 그대로 옮겨보기 ⭐

4편에서 CSS로 만든 상품 카드를 Tailwind 클래스로 다시 만들면 이렇게 된다.

```html
<h1 class="text-2xl font-bold mb-4">오늘의 추천 상품</h1>

<main class="flex justify-center gap-5">
    <div class="bg-white border border-gray-200 rounded-lg p-4 transition
                hover:bg-gray-50 hover:-translate-y-2 hover:scale-105 hover:shadow-lg">
        <div class="w-44 h-28 bg-gray-200 rounded"></div>
        <span class="inline-block bg-red-600 text-white text-sm px-2 py-1 rounded-full mt-2">NEW</span>
        <h2 class="text-lg font-bold mt-2 mb-1">무선 이어폰</h2>
        <p class="text-red-700">89,000원</p>
    </div>
    <!-- 카드 반복 -->
</main>
```

### CSS ↔ Tailwind 대응표

**간격 규칙: 숫자 1 = 4px (0.25rem)** → `p-4` = 16px, `gap-5` = 20px, `w-44` = 176px

| 직접 쓴 CSS | Tailwind 클래스 |
|---|---|
| `font-size: 24px` | `text-2xl` |
| `font-weight: bold` | `font-bold` |
| `margin-bottom: 16px` | `mb-4` |
| `display: flex` | `flex` |
| `justify-content: center` | `justify-center` |
| `gap: 20px` | `gap-5` |
| `background-color: #FFFFFF` | `bg-white` |
| `border: 1px solid #E5E7EB` | `border border-gray-200` |
| `border-radius: 8px` | `rounded-lg` |
| `padding: 16px` | `p-4` |
| `transition: ...` | `transition` |
| `.card:hover { background: #F9FAFB }` | `hover:bg-gray-50` |
| `translate(0, -8px)` | `hover:-translate-y-2` |
| `scale(1.05)` | `hover:scale-105` |
| `box-shadow: ...` | `hover:shadow-lg` |
| `width: 176px; height: 112px` | `w-44 h-28` |
| `background-color: #E5E7EB` | `bg-gray-200` |
| `border-radius: 4px` | `rounded` |
| `display: inline-block` | `inline-block` |
| `background-color: #DC2626` | `bg-red-600` |
| `color: #FFFFFF` | `text-white` |
| `font-size: 14px` | `text-sm` |
| `padding: 4px 8px` | `py-1 px-2` |
| `border-radius: 999px` | `rounded-full` |
| `margin-top: 8px` | `mt-2` |
| `font-size: 18px` | `text-lg` |
| `margin: 8px 0 4px` | `mt-2 mb-1` |
| `color: #B91C1C` | `text-red-700` |

### 읽는 법

| 접두사 | 의미 |
|---|---|
| `p` / `px` / `py` / `pt` | padding 전체 / 좌우 / 상하 / 위 |
| `m` / `mx` / `my` / `mt` / `mb` | margin |
| `w` / `h` | width / height |
| `text-크기` / `text-색` | 글자 크기 / 글자 색 |
| `bg-색-숫자` | 배경색 (숫자가 클수록 진함, 50~950) |
| `-`(앞에 붙음) | 음수 값 (`-translate-y-2` = -8px) |
| `hover:` | 마우스 올렸을 때만 적용 (`:hover`와 같음) |
| ➕ `md:`, `lg:` | 화면 너비 조건 (미디어 쿼리와 같음) |

> ⭐ CSS에서 원래 규칙에 `transition`, hover 규칙에 변화를 나눠 쓰던 것을 Tailwind에선 **한 요소의 class 안에** `transition`과 `hover:...`를 함께 쓴다.

### 차이 나는 부분

- `shadow-lg`는 Tailwind가 정해둔 그림자라 직접 쓴 `0 8px 20px rgba(...)`와 완전히 같지는 않다.
- 깜빡이는 `@keyframes blink`와 `rotate(-5deg)` 같은 **사용자 정의 값**은 기본 클래스에 없다. `-rotate-[5deg]`처럼 **대괄호 임의값**을 쓰거나, 사용자 정의 애니메이션은 설정 파일(v4는 CSS의 `@theme`)에 등록해야 한다. 기본 제공 애니메이션은 `animate-pulse`, `animate-spin`, `animate-bounce` 등이 있다.
- 위 hex 값은 Tailwind v3 색상표 기준이다. v4는 색 표기 방식이 바뀌어 아주 미세하게 다를 수 있다.

---

## 5. 언제 무엇을 쓸까

| 상황 | 추천 |
|---|---|
| CSS 원리를 배우는 단계 | 순수 CSS (선택자·박스 모델·Flex를 먼저) |
| 관리자 페이지, 빠른 프로토타입 | Bootstrap |
| 디자인 시안대로 세밀하게, React 등 컴포넌트 기반 | Tailwind |

프레임워크는 CSS를 대신하는 게 아니라 **CSS를 빨리 쓰게 해주는 도구**다. `justify-center`가 뭘 하는지 알려면 결국 `justify-content`를 알아야 한다.

---

## ✅ 마무리 요약

- Bootstrap = 완성 부품(`btn`, `card`), Tailwind = 속성 하나짜리 유틸리티(`p-4`, `flex`)
- CDN은 학습용, 배포는 설치·빌드
- Tailwind 간격 1 = 4px, `hover:`는 `:hover`
- 사용자 정의 값은 `[ ]` 임의값 또는 설정 파일로
- 프레임워크를 쓰더라도 CSS 원리가 기본
