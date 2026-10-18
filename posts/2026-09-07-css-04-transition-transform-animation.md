---
title: "[CSS] 04. transition, transform, animation으로 움직임 만들기"
date: 2026-09-07
time: "09:04"
section: Study Notes
module: Module 1
categories: [CSS, Frontend]
tags: [css, transition, transform, animation, keyframes, hover]
---

> CSS 기초 시리즈
> 1. CSS 기초와 기본·속성·관계 선택자
> 2. 가상 선택자와 우선순위
> 3. 박스 모델, display, Flex, Grid
> 4. **transition, transform, animation** ← 지금 글
> 5. CSS 프레임워크 (Tailwind, Bootstrap)

---

## 0. 세 가지 비교

| 기능 | 역할 | 언제 움직이나 |
|---|---|---|
| `transform` | 모양 변형 (이동·확대·회전) | 그 자체로는 즉시 변함 |
| `transition` | A 상태 → B 상태를 **부드럽게** 연결 | `:hover` 같은 **상태 변화가 있을 때** |
| `animation` | `@keyframes`로 짠 동작을 **스스로** 재생 | 페이지 열리자마자, 반복 가능 |

실습 목표: 마우스를 올리면 카드가 떠오르고, NEW 배지는 계속 깜빡이는 상품 카드.

---

## 1. 기본 카드 스타일

```css
body {
    background-color: #F3F4F6;
    color: #1F2937;
    margin: 0;          /* 브라우저 기본 여백 제거 */
    padding: 20px;
}

h1 { font-size: 24px; margin: 0 0 16px; }

.card-list {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.card {
    background-color: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    padding: 16px;
    transition: all 0.3s;   /* ⭐ 여기! */
}

.thumb { width: 176px; height: 112px; background-color: #E5E7EB; border-radius: 4px; }
.product-name { font-size: 18px; margin: 8px 0 4px; }
.price { font-size: 16px; color: #B91C1C; margin: 0; }
```

> 크기와 색은 이후 Tailwind로 똑같이 다시 만들 수 있는 값(16px, 176px, #E5E7EB 등)으로 골랐다. 두 방법의 결과를 나란히 비교하기 위해서다.

---

## 2. transform — 모양 바꾸기

```css
.card:hover {
    background-color: #F9FAFB;
    transform: translate(0, -8px) scale(1.05);   /* 위로 8px + 1.05배 */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}
```

| 함수 | 의미 |
|---|---|
| `translate(x, y)` | 이동 (`-8px`이면 위로) |
| `translateX()` / `translateY()` | 한 방향만 이동 |
| `scale(n)` | 확대/축소 (1 = 원래 크기) |
| `rotate(deg)` | 회전 (`-5deg` = 반시계 5도) |
| ➕ `skew(deg)` | 기울이기 |

- 여러 함수는 **공백으로 이어서 한 줄에** 쓴다. `transform`을 두 번 쓰면 뒤의 것이 앞을 덮어써 하나만 남는다.
- ⭐ **transform은 자리는 그대로 두고 그림만 움직인다.** 카드가 커져도 옆 카드가 비켜주지 않는다. (margin이나 width를 바꾸면 주변 레이아웃이 다시 계산되며 밀린다)
- 그래서 성능도 좋다. 움직임은 가능하면 `transform`과 `opacity`로 만든다.

### box-shadow

```
box-shadow: x이동 y이동 흐림정도 색;
box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);   /* 아래로 8px, 20px 흐리게, 12% 검정 */
```

> ⚠️ **`.card:hover`는 붙여 쓴다.** 공백을 넣으면(`.card :hover`) "카드 **안쪽** 요소 중 hover된 것"이라는 완전히 다른 뜻이 된다.

---

## 3. transition — 부드럽게 바꾸기

transition이 없으면 hover 순간 **뚝** 바뀐다. transition은 그 사이를 시간에 걸쳐 채워준다.

```css
transition: all 0.3s;
/*          속성 시간 */
```

| 하위 속성 | 의미 | 예 |
|---|---|---|
| `transition-property` | 어떤 속성을 | `all`, `transform`, `background-color` |
| `transition-duration` | 얼마 동안 | `0.3s`, `300ms` |
| `transition-timing-function` | 어떤 속도 곡선으로 | `ease`(기본), `linear`, `ease-in`, `ease-out`, `ease-in-out` |
| `transition-delay` | 얼마 뒤에 시작 | `0.1s` |

> ⭐ **transition은 `:hover`가 아니라 "원래 규칙"에 쓴다.**
> `.card`에 쓰면 마우스를 올릴 때도, **뗄 때도** 부드럽게 돌아온다. `.card:hover`에만 쓰면 올릴 때만 부드럽고 뗄 때는 뚝 돌아온다.

> ➕ `all`은 편하지만 의도치 않은 속성까지 애니메이션된다. 실무에선 `transition: transform 0.3s, box-shadow 0.3s;`처럼 필요한 것만 적는 게 좋다.
> `display`처럼 중간값이 없는 속성은 transition되지 않는다.

---

## 4. animation — 스스로 반복하는 움직임

### 4-1. NEW 배지

```css
.badge {
    display: inline-block;     /* span이지만 padding·transform이 제대로 먹도록 */
    background-color: #DC2626;
    color: #FFFFFF;
    font-size: 14px;
    padding: 4px 8px;
    border-radius: 999px;      /* 알약 모양 */
    margin-top: 8px;
    transform: rotate(-5deg);  /* 살짝 기울임 */

    animation-name: blink;              /* 어떤 keyframes를 */
    animation-duration: 1.2s;           /* 한 바퀴 1.2초 */
    animation-iteration-count: infinite; /* 무한 반복 */
}
```

### 4-2. `@keyframes` — 동작 시나리오

```css
@keyframes blink {
    0%   { background-color: #DC2626; }  /* 빨강 */
    50%  { background-color: #F97316; }  /* 주황 */
    100% { background-color: #DC2626; }  /* 다시 빨강 */
}
```

- `0%`(시작)와 `100%`(끝)를 **같은 값**으로 두면 한 바퀴가 끝나도 끊기지 않고 자연스럽게 이어진다.
- 중간에 원하는 모습이 있으면 `50%`처럼 **그 시점을 직접** 적어야 한다.
- 2개 시점만 있으면 `from { } to { }`로도 쓸 수 있다.

### 4-3. animation 속성 정리

| 속성 | 의미 | 예 |
|---|---|---|
| `animation-name` | `@keyframes` 이름 | `blink` |
| `animation-duration` | 한 바퀴 시간 | `1.2s` |
| `animation-iteration-count` | 반복 횟수 | `3`, `infinite` |
| ➕ `animation-timing-function` | 속도 곡선 | `ease`, `linear` |
| ➕ `animation-delay` | 시작 지연 | `0.5s` |
| ➕ `animation-direction` | 방향 | `normal`, `reverse`, `alternate`(왕복) |
| ➕ `animation-fill-mode` | 끝난 뒤 상태 유지 | `forwards`(마지막 모습 유지) |
| ➕ `animation-play-state` | 재생/일시정지 | `running`, `paused` |

단축형: `animation: blink 1.2s infinite;`

> ⚠️ 배지의 `transform: rotate(-5deg)`가 있는 상태에서 keyframes 안에 `transform`을 쓰면 회전값이 덮어써진다. keyframes에서도 `rotate(-5deg)`를 함께 적어줘야 한다.

> ➕ 움직임에 민감한 사용자를 위해 OS 설정을 존중할 수 있다.
> ```css
> @media (prefers-reduced-motion: reduce) {
>     .badge { animation: none; }
> }
> ```

---

## ✅ 마무리 요약

- `transform`: 이동·확대·회전, **자리는 그대로 그림만** 움직임
- `transition`: 상태 변화를 부드럽게, **원래 규칙에** 작성
- `animation` + `@keyframes`: 스스로 반복, 0%와 100%를 맞추면 이음새 없음
- `.card:hover`는 붙여 쓰기, 공백 넣으면 뜻이 바뀜
