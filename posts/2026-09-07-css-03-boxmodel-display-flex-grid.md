---
title: "[CSS] 03. 박스 모델, display, Flexbox, Grid"
date: 2026-09-07
time: "09:03"
section: Study Notes
module: Module 1
categories: [CSS, Frontend]
tags: [css, box-model, display, flex, flexbox, grid, layout]
---

> CSS 기초 시리즈
> 1. CSS 기초와 기본·속성·관계 선택자
> 2. 가상 선택자와 우선순위
> 3. **박스 모델, display, Flex, Grid** ← 지금 글
> 4. transition, transform, animation
> 5. CSS 프레임워크 (Tailwind, Bootstrap)

---

## 1. ➕ 박스 모델 (Box Model)

레이아웃을 이해하려면 먼저 알아야 하는 개념이다. 모든 HTML 요소는 **사각형 상자**이고, 안에서부터 4겹으로 이루어진다.

```
┌──────────── margin (바깥 여백, 투명) ────────────┐
│  ┌──────── border (테두리) ──────────────────┐   │
│  │  ┌───── padding (안쪽 여백) ──────────┐   │   │
│  │  │        content (내용)              │   │   │
│  │  │        width × height              │   │   │
│  │  └────────────────────────────────────┘   │   │
│  └───────────────────────────────────────────┘   │
└──────────────────────────────────────────────────┘
```

| 속성 | 의미 |
|---|---|
| `content` | 글자·이미지가 들어가는 영역 (`width`, `height`) |
| `padding` | 내용과 테두리 사이 (배경색이 칠해짐) |
| `border` | 테두리 |
| `margin` | 다른 요소와의 바깥 간격 (배경색 없음) |

### 값 쓰는 순서 (시계 방향)

```css
padding: 20px;                 /* 상하좌우 모두 */
padding: 10px 20px;            /* 상하 10, 좌우 20 */
margin: 8px 0 4px;             /* 상 8, 좌우 0, 하 4 */
margin: 0 0 16px;              /* 상 0, 좌우 0, 하 16 */
padding: 1px 2px 3px 4px;      /* 상 우 하 좌 (시계 방향) */
```

### border

```css
border: 1px solid black;   /* 두께 스타일 색 */
border-radius: 10px;       /* 모서리 둥글게, 999px이면 알약 모양, 50%면 원 */
```

> ⚠️ `border: 1px;`처럼 **스타일(solid, dashed 등)을 빼면 테두리가 안 보인다.** 기본 스타일이 `none`이기 때문이다.

### box-sizing

기본값 `content-box`에서 `width: 200px`은 **content만** 200px이다. padding 20px + border 1px을 더하면 실제 너비는 242px이 된다. 이게 헷갈려서 실무에선 거의 항상 아래 코드를 맨 위에 둔다.

```css
* { box-sizing: border-box; }  /* width에 padding, border까지 포함 */
```

---

## 2. ➕ 자주 쓰는 단위와 색

| 단위 | 기준 |
|---|---|
| `px` | 고정 크기 |
| `%` | 부모 요소 크기 기준 |
| `em` | 부모(자기) 글자 크기 기준 |
| `rem` | 최상위(`html`) 글자 크기 기준 (보통 16px) → 실무 글자 크기 단위로 많이 씀 |
| `vw` / `vh` | 화면 너비 / 높이의 1% |
| `fr` | Grid에서 남은 공간의 몫 |

| 색 표기 | 예시 |
|---|---|
| 색 이름 | `red`, `lightcyan`, `rebeccapurple` |
| 16진수 | `#DC2626` (빨강·초록·파랑 각 2자리) |
| rgb / rgba | `rgba(0, 0, 0, 0.12)` (a = 투명도 0~1) |

---

## 3. display — 블록과 인라인 전략

| 값 | 배치 | width/height | 대표 태그 기본값 |
|---|---|---|---|
| `block` | **아래로 쌓임**, 자기 줄 전체 차지 | 적용됨 | `div`, `p`, `h1`, `section`, `main` |
| `inline` | **옆으로 이어짐**, 내용만큼 | 적용 안 됨 (상하 margin도 안 먹음) | `span`, `a`, `strong` |
| `inline-block` | 옆으로 이어짐 | **적용됨** | `button`, `input` |
| `none` | 화면에서 사라짐 (자리도 없음) | - | |
| `flex` / `grid` | 자식들을 배치하는 컨테이너가 됨 | - | |

`display`를 바꾸면 태그의 기본 성질을 뒤집을 수 있다.

```css
.box-block-span  { display: block; }        /* span인데 자기 줄을 차지 */
.box-inline-div  { display: inline; }       /* div인데 옆으로 붙음 */
.box-inline-block { display: inline-block; width: 200px; } /* span인데 너비가 먹음 */
```

```html
<span class="box-block-span">같은 span인데 자기 줄을 차지합니다</span>
<div class="box-inline-div">같은 div 인데</div>
<div class="box-inline-div">옆으로 붙습니다</div>
```

**왜 Flex/Grid가 필요한가?** div로만 영역을 잡으면 각 div가 화면 가로를 전부 차지해 아래로만 쌓인다. 카드를 가로로 나란히 놓거나, 화면 크기에 맞춰 유연하게 재배치할 수 없다.

---

## 4. Flexbox — 한 줄로 세우고 정렬

**항목을 한 방향 줄로 세우는** 배치 방식이다.

- `display: flex`는 카드가 아니라 **카드를 감싸는 상자**에 준다.
- 감싸는 상자 = **플렉스 컨테이너**, 안의 카드 하나하나 = **플렉스 아이템**

```html
<main class="card-list">       <!-- 컨테이너 -->
    <div class="card">...</div> <!-- 아이템 -->
    <div class="card">...</div>
    <div class="card">...</div>
</main>
```

### 두 개의 축

| 축 | 방향 | 정렬 속성 |
|---|---|---|
| 주축 (main axis) | `flex-direction`이 정한 방향 | `justify-content` |
| 교차축 (cross axis) | 주축과 직각 | `align-items` |

`flex-direction: row`(기본)면 주축은 가로, 교차축은 세로다. `column`으로 바꾸면 **두 축이 서로 바뀌어** `justify-content`가 세로 정렬이 된다.

### 컨테이너 속성

```css
.card-list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    flex-wrap: wrap;
}
```

| 속성 | 값 | 의미 |
|---|---|---|
| `flex-direction` | `row` (기본) | 가로 |
| | `column` | 세로 |
| | `row-reverse` / `column-reverse` | 역순 |
| `justify-content` (주축) | `flex-start` | 시작점(왼쪽)에 모음 |
| | `center` | 가운데 |
| | `flex-end` | 끝(오른쪽) |
| | `space-between` | 양 끝에 붙이고 사이를 고르게 |
| | `space-around` | 아이템마다 양옆에 같은 여백 (바깥 여백 = 사이 여백의 절반) |
| | `space-evenly` | 바깥 여백과 사이 여백이 모두 같음 |
| `align-items` (교차축) | `stretch` (기본) | 컨테이너 높이만큼 늘림 → 카드 높이가 같아 보임 |
| | `flex-start` | 위쪽 끝 맞춤, 자기 내용만큼만 높이 |
| | `center` | 가운데 |
| | `flex-end` | 아래쪽 끝 |
| `gap` | `20px` | 아이템 사이 간격 (바깥쪽엔 안 생김) |
| `flex-wrap` | `nowrap` (기본) | 한 줄 고집 → 아이템이 줄어들거나 넘침 |
| | `wrap` | 공간이 부족하면 다음 줄로 내려감 |

> 💡 `align-items: flex-start`를 쓰면 설명이 한 줄 더 있는 카드만 아래로 길어진다. `stretch`(기본)면 가장 긴 카드에 맞춰 모두 같은 높이가 된다.

### ➕ 아이템 속성

| 속성 | 의미 |
|---|---|
| `flex-grow` | 남는 공간을 얼마나 나눠 가질지 (기본 0) |
| `flex-shrink` | 공간이 부족할 때 얼마나 줄어들지 (기본 1) |
| `flex-basis` | 늘고 줄기 전의 기본 크기 |
| `flex: 1` | 위 셋의 단축형, "남은 공간을 똑같이 나눠 가져라" |
| `align-self` | 이 아이템만 교차축 정렬을 다르게 |
| `order` | 화면 표시 순서 변경 (HTML 순서는 그대로) |

> ➕ **가운데 정렬 공식**: `display: flex; justify-content: center; align-items: center;`

---

## 5. Grid — 칸을 그리고 칸에 넣기

**행과 열 두 방향을 함께** 정하는 배치 방식이다.

| | Flex | Grid |
|---|---|---|
| 방향 | 1차원 (한 줄) | 2차원 (행 + 열) |
| 방식 | 한 줄로 세우고 정렬 | 칸을 그려두고 칸에 넣음 |
| 어울리는 곳 | 메뉴 바, 버튼 묶음, 카드 한 줄 | 카드 목록 격자, 페이지 전체 레이아웃 |

```css
.grid-list {
    display: grid;                          /* 이것만 있으면 열 1개 */
    grid-template-columns: repeat(3, 1fr);  /* 같은 너비 열 3개 */
    gap: 20px;
}
```

- `repeat(3, 1fr)` = `1fr 1fr 1fr`
- `fr` = **남은 공간의 몫**. `2fr 1fr`이면 2:1로 나눈다.
- **행 개수는 지정하지 않아도 된다.** 열을 정하면 행은 자동으로 결정된다. 아이템 6개 ÷ 3열 = 2행

### ➕ 더 알아둘 Grid 속성

```css
grid-template-columns: 200px 1fr;       /* 고정 사이드바 + 나머지 */
grid-template-rows: 100px auto;         /* 행 높이 지정 */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
/* 최소 200px짜리 열을 화면에 들어가는 만큼 자동으로 → 미디어 쿼리 없이 반응형 */

.item { grid-column: 1 / 3; }           /* 1번 선부터 3번 선까지 = 열 2칸 차지 */
.item { grid-column: span 2; }          /* 2칸 차지 (HTML 표의 colspan과 비슷) */
```

---

## 6. 실습: 상품 카드

```html
<main class="card-list">
    <div class="card">
        <div class="thumb"></div>
        <h2 class="product-name">노트북 거치대</h2>
        <p class="price">17,000</p>
        <p class="desc">각도를 6단계 조절할 수 있다.</p>
    </div>
    <!-- 카드 반복 -->
</main>
```

```css
body { background-color: lightcyan; color: lightslategray; }

.card {
    background-color: beige;
    border: 1px solid black;
    border-radius: 10px;
    padding: 20px;
}

.thumb {                 /* 이미지 자리를 대신하는 빈 상자 */
    width: 180px;
    height: 120px;
    background-color: lightcyan;
    border-radius: 10px;
}

.product-name { font-size: 30px; }
.price { font-size: 10px; }
.desc  { font-size: 20px; }
```

같은 카드를 `.card-list`(Flex)에 넣으면 한 줄 가로 배치, `.grid-list`(Grid)에 넣으면 3열 격자가 된다.

> ⚠️ 실습 HTML의 `<p class desc>`는 `class` 속성 값이 비고 `desc`라는 별개 속성이 생긴 것이라 `.desc` 스타일이 적용되지 않는다. `class="desc"`로 써야 한다.

---

## 7. ➕ 반응형: 미디어 쿼리

화면 너비에 따라 다른 스타일을 적용한다.

```css
.grid-list { grid-template-columns: repeat(3, 1fr); }

@media (max-width: 768px) {   /* 화면이 768px 이하일 때 */
    .grid-list { grid-template-columns: 1fr; }  /* 1열로 */
}
```

---

## ✅ 마무리 요약

- 모든 요소는 content → padding → border → margin 상자, `box-sizing: border-box` 습관
- `block`은 아래로, `inline`은 옆으로(크기 안 먹음), `inline-block`은 옆으로 + 크기 OK
- Flex: 컨테이너에 `display: flex`, 주축 `justify-content`, 교차축 `align-items`, `gap`, `flex-wrap`
- Grid: `grid-template-columns: repeat(3, 1fr)`, 열만 정하면 행은 자동
- 한 줄이면 Flex, 격자면 Grid
