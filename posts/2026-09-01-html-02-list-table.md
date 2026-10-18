---
title: "[HTML] 02. 목록 태그와 표 태그 (셀 병합까지)"
date: 2026-09-01
time: "09:02"
section: Study Notes
module: Module 1
categories: [HTML, Frontend]
tags: [html, ul, ol, table, colspan, rowspan]
---

> HTML 기초 시리즈
> 1. HTML 기본 구조와 글자 태그
> 2. **목록과 표** ← 지금 글
> 3. 영역·이미지·미디어·링크
> 4. 폼(Form)
> 5. 시맨틱 태그와 실무 팁

---

## 1. 목록 관련 태그

### 1-1. 순서 없는 목록 `<ul>` (Unordered List)

순서가 상관없는 항목. 앞에 점(●)이 붙는다.

```html
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JS</li>
</ul>
```

### 1-2. 순서 있는 목록 `<ol>` (Ordered List)

순서가 의미 있는 항목. 앞에 번호가 붙는다.

```html
<ol>
    <li>HTML</li>
    <li>CSS</li>
    <li>JS</li>
</ol>
```

`type` 속성으로 번호 형식을 바꿀 수 있다.

| `type` | 표시 |
|---|---|
| `1` (기본값) | 1, 2, 3 |
| `a` | a, b, c |
| `A` | A, B, C |
| `i` | i, ii, iii |
| `I` | I, II, III |

```html
<ol type="A">
    <li>HTML</li>
    <li>CSS</li>
</ol>
```

### ➕ 더 알아둘 것

- `<ul>`, `<ol>`의 **직계 자식은 반드시 `<li>`** 여야 한다. 다른 내용은 `<li>` 안에 넣는다.
- `<ol start="5">` : 5번부터 시작 / `<ol reversed>` : 역순 번호
- 목록 안에 목록을 넣을 수 있다 (중첩 목록). 이때 안쪽 목록은 `<li>` 안에 둔다.

```html
<ul>
    <li>프론트엔드
        <ul>
            <li>HTML</li>
            <li>CSS</li>
        </ul>
    </li>
    <li>백엔드</li>
</ul>
```

- **정의 목록** `<dl>`: 용어–설명 쌍을 나열할 때 쓴다.

```html
<dl>
    <dt>HTML</dt>
    <dd>웹 페이지의 구조를 만드는 언어</dd>
    <dt>CSS</dt>
    <dd>웹 페이지를 꾸미는 언어</dd>
</dl>
```

- 웹사이트의 **내비게이션 메뉴**는 대부분 `<ul>` + `<li>` + `<a>` 조합이다.

```html
<ul>  <!-- Emmet: ul>li*3>a -->
    <li><a href="https://www.google.com">구글검색</a></li>
    <li><a href="https://github.com">깃허브</a></li>
    <li><a href="https://tjtndud2.github.io/my-blog/">내 블로그</a></li>
</ul>
```

### 실습: 자기소개

```html
<h1>박서준</h1>
<p>부트캠프에서 웹을 배우고 있습니다.</p>

<h3>좋아하는 것</h3>
<ul>
    <li>커피 내리기</li>
    <li>영화 보기</li>
    <li>주말 산책</li>
</ul>

<h3>배우고 싶은 순서</h3>
<ol>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ol>
```

순서가 의미 있는 것(학습 순서)은 `<ol>`, 상관없는 것(취미)은 `<ul>`.

---

## 2. 표 관련 태그

### 2-1. 구성 요소

| 태그 | 역할 |
|---|---|
| `<table>` | 표 전체 |
| `<caption>` | 표 제목 (`<table>` 바로 안 첫 번째에 작성) |
| `<tr>` | 행 (Table Row) |
| `<th>` | 제목 칸 (Table Header) — 기본 굵게, 가운데 정렬 |
| `<td>` | 데이터 칸 (Table Data) |

표는 **행(`tr`) 단위로 위에서 아래로**, 각 행 안에서 **칸을 왼쪽에서 오른쪽으로** 작성한다. 열(column)을 만드는 태그는 따로 없다. 각 행의 칸 개수가 곧 열 개수다.

### 2-2. 기본 표

```html
<table border="2">  <!-- Emmet: tr*3>td*3 -->
    <tr>
        <th>메뉴 이름</th>
        <th>메뉴 가격</th>
        <th>판매 상태</th>
    </tr>
    <tr>
        <td>비냉돈까스</td>
        <td>12000</td>
        <td>Y</td>
    </tr>
    <tr>
        <td>제육볶음</td>
        <td>8000</td>
        <td>Y</td>
    </tr>
</table>
```

`border` 속성이 없으면 표에 선이 보이지 않는다.

### 2-3. 셀 병합 `colspan`, `rowspan`

| 속성 | 의미 | 방향 |
|---|---|---|
| `colspan="n"` | 열 n개를 합침 | 가로 → |
| `rowspan="n"` | 행 n개를 합침 | 세로 ↓ |

```html
<table border="2">
    <caption>회원 이력서</caption>
    <tr>
        <td colspan="2" rowspan="2" width="130px" height="130px">사진</td>
        <td width="200px">이름</td>
        <td width="200px"></td>
    </tr>
    <tr>
        <!-- "사진" 칸이 아래로 내려와 2칸을 차지 → 이 행엔 2칸만 작성 -->
        <td>연락처</td>
        <td></td>
    </tr>
    <tr>
        <td>주소</td>
        <td colspan="3"></td>
    </tr>
</table>
```

### 병합 표를 틀리지 않고 만드는 요령

1. 병합 없는 **전체 격자(행 × 열)** 를 먼저 그린다.
2. 합쳐지는 칸을 표시한다.
3. `rowspan`으로 **위에서 내려온 칸이 차지한 자리는 아래 행에서 `<td>`를 생략**한다.
4. 각 행마다 `(colspan 합계) + (위에서 내려온 칸 수) = 전체 열 수`인지 검산한다.

---

## 3. 표 실습

### 실습 1. 공연 요금표 (colspan + rowspan)

```
┌──────────────────────────────────┐
│             공연요금              │  ← colspan="3"
├──────────┬───────────┬───────────┤
│   구분   │    S석     │    VIP    │
│   성인   │  30,000   │  50,000   │
│  청소년  │  40,000   │  60,000   │
├──────────┼───────────────────────┤
│   소인   │ 미취학 아동 일반 요금의 50% │  ← colspan="2"
├──────────┼───────────┬───────────┤
│ 공연시간  │    1회    │13:00~15:00│  ← 공연시간 rowspan="2"
│          │    2회    │17:00~19:00│
└──────────┴───────────┴───────────┘
```

```html
<table border="2" style="text-align: center;">
    <tr><td colspan="3">공연요금</td></tr>
    <tr><td>구분</td><td>S석</td><td>VIP</td></tr>
    <tr><td>성인</td><td>30,000</td><td>50,000</td></tr>
    <tr><td>청소년</td><td>40,000</td><td>60,000</td></tr>
    <tr><td>소인</td><td colspan="2">미취학 아동 일반 요금의 50%</td></tr>
    <tr>
        <td rowspan="2">공연시간</td>
        <td>1회</td><td>13:00~15:00</td>
    </tr>
    <tr>
        <!-- 공연시간 칸이 내려와 있으므로 2칸만 -->
        <td>2회</td><td>17:00~19:00</td>
    </tr>
</table>
```

### 실습 2. 식단표 (가로·세로 병합 혼합)

```html
<table border="2" style="text-align: center;">
    <caption>원티드 식단표</caption>
    <tr>
        <th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th><th>일</th>
    </tr>
    <tr>
        <td colspan="2">쌀밥</td>
        <td colspan="3">잡곡밥</td>
        <td>스파게티</td>
        <td>짜장면</td>
    </tr>
    <tr>
        <td>불고기</td><td>떡갈비</td><td>미니돈까스</td><td>오징어볶음</td><td>제육볶음</td>
        <td rowspan="2">피클</td>
        <td>단무지</td>
    </tr>
    <tr>
        <!-- 토요일 칸은 피클이 차지 → 6칸만 -->
        <td>배추김치</td><td>깍두기</td><td>미소된장국</td><td>동치미</td><td>고추절임</td>
        <td>짬뽕국물</td>
    </tr>
</table>
```

### 실습 3. 행·열 동시 병합

```
┌────┬────┬────┬────┐
│ 가 │ 나 │ 다 │    │
├────┼────┴────┤    │
│ 마 │         │ 라 │  ← 라: rowspan="4"
├────┤         │    │
│ 사 │   바    │    │  ← 바: colspan="2" rowspan="3"
├────┤         │    │
│ 아 │         │    │
├────┴────┬────┴────┤
│   자    │   차    │
├─────────┴─────────┤
│        카         │
└───────────────────┘
```

```html
<table border="2" style="text-align: center;">
    <tr>
        <td>가</td><td>나</td><td>다</td>
        <td rowspan="4">라</td>
    </tr>
    <tr>
        <td>마</td>
        <td colspan="2" rowspan="3">바</td>
    </tr>
    <tr><td>사</td></tr>
    <tr><td>아</td></tr>
    <tr>
        <td colspan="2">자</td>
        <td colspan="2">차</td>
    </tr>
    <tr><td colspan="4">카</td></tr>
</table>
```

3~4번째 행은 `바`(2칸)와 `라`(1칸)가 위에서 내려와 자리를 차지하므로 `<td>`를 하나만 쓴다.

### 실습 4. `<th>`로 행 제목 만들기 (강의 시간표)

```html
<table border="2" style="text-align: center;">
    <caption>이번 주 강의 일정</caption>
    <tr>
        <th>시간</th><th>월요일</th><th>화요일</th>
    </tr>
    <tr>
        <th rowspan="2">오전</th>
        <td>HTML 기초</td><td>표 만들기</td>
    </tr>
    <tr>
        <td>목록 태그</td><td>칸 합치기</td>
    </tr>
    <tr>
        <th rowspan="2">오후</th>
        <td>자율 실습</td><td>자율 실습</td>
    </tr>
    <tr>
        <td>질문 시간</td><td>질문 시간</td>
    </tr>
</table>
```

`<th>`는 첫 행(열 제목)뿐 아니라 **첫 열(행 제목)** 에도 쓸 수 있다.

### 실습 5. 배송비 / 도착 예정일 안내

```html
<table border="2" style="text-align: center;">
    <caption>지역별 도착 예정일</caption>
    <tr><th>지역</th><th>평일 주문</th><th>주말 주문</th></tr>
    <tr><td>서울·경기</td><td>다음 날 도착</td><td>월요일 도착</td></tr>
    <tr><td>그 외 지역</td><td colspan="2">2~3일 소요</td></tr>
    <tr><td colspan="3">제주·도서산간은 하루 더 걸립니다.</td></tr>
</table>
```

---

## 4. ➕ 표에 대해 더 알아둘 것

### 구역 나누기 `<thead>`, `<tbody>`, `<tfoot>`

```html
<table>
    <caption>주문 금액별 배송비</caption>
    <thead>
        <tr><th scope="col">주문 금액</th><th scope="col">기본 배송비</th></tr>
    </thead>
    <tbody>
        <tr><td>3만원 미만</td><td>3,000원</td></tr>
        <tr><td>3만원 이상</td><td>무료</td></tr>
    </tbody>
    <tfoot>
        <tr><td colspan="2">도서산간은 추가 요금이 있습니다.</td></tr>
    </tfoot>
</table>
```

- 구조가 명확해지고 CSS로 머리/본문/꼬리를 따로 꾸미기 쉽다.
- `<th scope="col">`(열 제목) / `<th scope="row">`(행 제목)를 붙이면 스크린 리더가 제목의 방향을 정확히 읽는다.

### 모양 속성은 CSS로

`border`, `width`, `height` 같은 모양 관련 HTML 속성은 **HTML5에서 권장되지 않는다(deprecated).** 학습용으론 편하지만 실무에선 CSS로 지정한다.

```css
table, th, td {
    border: 1px solid black;
    border-collapse: collapse;  /* 칸 사이 이중선을 한 줄로 합침 */
}
```

### 표는 표 데이터에만

과거엔 페이지 레이아웃을 표로 짰지만, 지금은 CSS(Flexbox, Grid)로 한다. 표는 **행과 열로 이루어진 데이터**에만 쓴다.

---

## ✅ 마무리 요약

- 순서 상관없음 `<ul>`, 순서 있음 `<ol>`, 항목은 항상 `<li>`
- 표는 `table > tr > th/td`, 행 단위로 작성
- `colspan`은 가로 병합, `rowspan`은 세로 병합
- 위에서 내려온 칸 자리는 아래 행에서 `<td>`를 빼고, 행마다 칸 수를 검산
- 표의 모양은 CSS, 구조는 `thead/tbody/tfoot`
