---
title: "[HTML] 03. 영역(div/span), 이미지, 미디어, 하이퍼링크"
date: 2026-09-01
time: "09:03"
section: Study Notes
module: Module 1
categories: [HTML, Frontend]
tags: [html, div, span, img, audio, video, a, 앵커]
---

> HTML 기초 시리즈
> 1. HTML 기본 구조와 글자 태그
> 2. 목록과 표
> 3. **영역·이미지·미디어·링크** ← 지금 글
> 4. 폼(Form)
> 5. 시맨틱 태그와 실무 팁

---

## 1. 영역 관리 태그 `<div>`, `<span>`

`<div>`와 `<span>`은 **그 자체로는 의미가 없고, 영역을 묶기 위한** 태그다. 묶은 영역에 CSS 스타일을 공통으로 적용할 때 주로 쓴다.

```html
<div style="border: 1px solid black; background: red;">첫 번째 영역</div>
<div style="border: 1px solid black; background: green;">두 번째 영역</div>

<span style="border: 1px solid black; background: red;">첫 번째 영역</span>
<span style="border: 1px solid black; background: green;">두 번째 영역</span>
```

실행하면 `div`는 각각 한 줄씩 화면 가로 전체를 차지하며 아래로 쌓이고, `span`은 글자 길이만큼만 차지하며 옆으로 나란히 붙는다.

### 블록 요소 vs 인라인 요소 ⭐

HTML/CSS 전체를 관통하는 가장 중요한 개념 중 하나다.

| 구분 | 블록(Block) | 인라인(Inline) |
|---|---|---|
| 대표 태그 | `div`, `p`, `h1~h6`, `ul`, `ol`, `li`, `table`, `form`, `pre`, `blockquote` | `span`, `a`, `strong`, `em`, `img`, `input`, `label`, `button` |
| 배치 | 항상 **새 줄**에서 시작 | 옆으로 **나란히** |
| 너비 | 부모의 **가로 전체** | **내용만큼만** |
| width/height | 적용됨 | 적용 안 됨 (`img`, `input` 등은 예외) |

```
[블록]
┌──────────────────────────────┐
│ 첫 번째 영역                  │
├──────────────────────────────┤
│ 두 번째 영역                  │
└──────────────────────────────┘

[인라인]
┌──────────┐┌──────────┐
│첫 번째 영역││두 번째 영역│
└──────────┘└──────────┘
```

### ➕ 더 알아둘 것

- CSS `display`로 성질을 바꿀 수 있다: `block`, `inline`, `inline-block`(나란히 배치 + 크기 지정 가능), `flex`, `grid`, `none`(숨김)
- 블록 안에 인라인은 OK, **인라인 안에 블록은 피한다.** (예외: HTML5의 `<a>`는 블록을 감쌀 수 있음)
- CSS `border`는 **두께 + 스타일 + 색** 중 스타일이 꼭 있어야 보인다. `border: 1px;`만 쓰면 선이 안 나타나고, `border: 1px solid black;`처럼 써야 한다.
- `style="..."`처럼 태그에 직접 쓰는 CSS는 **인라인 스타일**이다. 학습용으론 편하지만 재사용이 어려워 실무에선 별도 CSS 파일 + `class`를 쓴다.

---

## 2. 이미지 `<img>`

```html
<img src="이미지_경로.png" alt="이미지 설명">
```

| 속성 | 설명 |
|---|---|
| `src` | 불러올 이미지 파일 **경로** (필수) |
| `alt` | 이미지를 표시할 수 없을 때 대신 보여줄 **대체 텍스트** |
| `width` / `height` | 가로 / 세로 크기 |

### 실행 방식

- 경로가 맞으면 브라우저가 해당 위치에 이미지를 표시한다. `<img>`는 인라인 성격이라 여러 개를 쓰면 옆으로 나란히 배치된다.
- 경로가 틀리거나 파일이 없으면 **깨진 이미지 아이콘과 함께 `alt` 텍스트**가 표시된다. (확장자 오타도 마찬가지)
- `alt`는 평소엔 화면에 안 보인다.

### 고정 크기 vs 가변 크기

```html
<img src="이미지_경로.png" width="200px" height="100px">  <!-- 고정 -->
<img src="이미지_경로.png" width="20%"   height="100px">  <!-- 가변 -->
```

| 방식 | 단위 | 동작 |
|---|---|---|
| 고정 크기 | `px` | 브라우저 창 크기가 바뀌어도 그대로 |
| 가변 크기 | `%` | 부모 요소(화면) 너비에 비례해 늘었다 줄었다 함 → 반응형의 기초 |

### ➕ 이미지에 대해 더 알아둘 것

- **`alt`는 사실상 필수.** 스크린 리더가 `alt`를 읽어주고, 검색 엔진도 이미지 내용을 `alt`로 파악한다. 장식용 이미지라면 `alt=""`(빈 값)로 명시한다.
- `width`와 `height`를 **둘 다 고정**하면 원본 비율이 깨질 수 있다. 하나만 지정하면 나머지는 비율에 맞게 자동 조절된다.
- `loading="lazy"`: 화면에 보일 때가 되어서야 불러온다 → 이미지 많은 페이지 속도 개선
- 이미지 + 설명을 묶을 땐 `<figure>`와 `<figcaption>`

```html
<figure>
    <img src="이미지_경로.png" alt="서울 야경">
    <figcaption>남산에서 본 서울 야경</figcaption>
</figure>
```

- 자주 쓰는 이미지 형식

| 형식 | 특징 |
|---|---|
| JPG | 사진, 용량 작음, 투명 배경 X |
| PNG | 투명 배경 O, 화질 손실 없음 |
| GIF | 움짤, 색상 수 제한 |
| SVG | 벡터라 확대해도 안 깨짐 (아이콘, 로고) |
| WebP | JPG/PNG보다 용량이 작은 최신 형식 |

---

## 3. 파일 경로

이미지, 미디어, 링크, CSS/JS 연결에 모두 쓰이는 개념이다.

| 경로 종류 | 예시 | 기준 |
|---|---|---|
| 상대 경로 (같은 폴더 아래) | `images/photo.png` | **현재 HTML 파일 위치** |
| 상대 경로 (현재 폴더) | `./photo.png` | `.`은 현재 폴더 |
| 상대 경로 (상위 폴더) | `../images/photo.png` | `..`은 한 단계 위 폴더 |
| 루트 상대 경로 | `/images/photo.png` | 사이트의 최상위 폴더 |
| 절대 경로 (URL) | `https://example.com/a.png` | 인터넷 주소 전체 |

> 💡 서버(특히 Linux, GitHub Pages)는 **파일명 대소문자를 구분**한다. Windows에선 `photo.png`로 써도 `photo.PNG`가 열리지만, 배포하면 깨질 수 있다. 파일명은 소문자로 통일하는 게 안전하다.

---

## 4. 미디어 `<audio>`, `<video>`

```html
<audio src="오디오_경로.mp3" controls loop>이 브라우저는 audio를 지원하지 않습니다.</audio>
<video src="비디오_경로.mp4" controls></video>
```

### 실행 방식

- `controls`가 있으면 브라우저 기본 **플레이어(재생/일시정지 버튼, 진행 바, 볼륨, 비디오는 전체화면 버튼)** 가 표시되고, 사용자가 버튼을 눌러 재생한다.
- `controls`가 없으면 `<audio>`는 **화면에 아무것도 보이지 않고**, `<video>`는 첫 화면만 보이고 조작할 수 없다. (JS로 제어하는 경우에만 생략)
- 태그 사이의 텍스트는 **브라우저가 해당 태그를 지원하지 않을 때만** 대신 표시된다.

| 속성 | 설명 |
|---|---|
| `src` | 미디어 파일 경로 |
| `controls` | 컨트롤 바 표시 |
| `loop` | 끝나면 처음부터 반복 재생 |
| `autoplay` | 페이지 열리면 자동 재생 |
| `muted` | 음소거 상태로 시작 |
| `poster` | (video 전용) 재생 전 보여줄 썸네일 |
| `width` / `height` | (video) 플레이어 크기 |

### ➕ 더 알아둘 것

- **불리언(boolean) 속성**: `controls="controls"`처럼 써도 되지만, 속성은 **있으면 켜짐, 없으면 꺼짐**이라 `controls`만 써도 같다. `controls="false"`라고 써도 켜진다는 점에 주의.
- 대부분의 브라우저는 **소리 나는 자동 재생을 차단**한다. 자동 재생이 필요하면 `autoplay muted`를 함께 쓴다.
- 브라우저마다 지원 포맷이 다를 수 있어 `<source>`로 여러 포맷을 제공할 수 있다. 위에서부터 재생 가능한 첫 번째 파일을 쓴다.

```html
<video controls>
    <source src="video.webm" type="video/webm">
    <source src="video.mp4" type="video/mp4">
    이 브라우저는 video 태그를 지원하지 않습니다.
</video>
```

- 유튜브 영상처럼 **다른 사이트의 콘텐츠**를 넣을 땐 `<iframe>`을 쓴다. (유튜브 → 공유 → 퍼가기에서 코드 복사)

```html
<iframe src="https://www.youtube.com/embed/영상ID" width="560" height="315"
        title="영상 제목" allowfullscreen></iframe>
```

---

## 5. 하이퍼링크 `<a>`

링크는 웹 문서를 다른 문서와 구분 짓는 **가장 핵심적인 기능**이다. HTML의 "HyperText"가 바로 이것. 텍스트, 버튼, 이미지 등을 클릭해 다른 곳으로 이동할 수 있다.

### 5-1. `href` 속성

`<a>`(anchor) 태그의 `href`에 이동할 주소를 쓴다.

```html
<ul>
    <li><a href="01_글자관련태그.html">글자 관련 태그</a></li>  <!-- 내 프로젝트 파일 (상대 경로) -->
    <li><a href="https://github.com">깃허브</a></li>           <!-- 외부 사이트 (절대 경로) -->
</ul>
```

외부 주소는 `https://`까지 써야 한다. `www.naver.com`만 쓰면 현재 폴더 안의 파일로 인식한다.

### 5-2. `target` — 어디서 열 것인가

| 값 | 동작 |
|---|---|
| `_self` (기본값) | 현재 탭에서 이동 |
| `_blank` | 새 탭(창)에서 열기 |

```html
<a href="https://www.naver.com/" target="_blank">네이버</a>
<a href="https://eis.eu.ac.kr/nxui/index.html" target="_self">을지대 eis</a>
```

### 5-3. 이미지에 링크 걸기

`<a>`로 `<img>`를 **감싸면(부모–자식)** 이미지를 클릭했을 때 이동한다.

```html
<a href="https://www.naver.com">
    <img src="이미지_경로.png" alt="네이버로 이동">
</a>
```

이미지 링크에선 `alt`가 곧 **링크의 이름**이 되므로 "어디로 가는지"를 적어준다.

### 5-4. 페이지 내부 이동 (앵커)

`id`는 요소의 **고유한 이름표**다. `href="#id값"`으로 같은 페이지의 해당 위치로 스크롤 이동한다. 블로그 글의 **목차**가 이 원리다.

```html
<h1 id="title">하이퍼링크 관련 태그</h1>

<ul>
    <li><a href="#index1">목차 1</a></li>
    <li><a href="#index2">목차 2</a></li>
</ul>

<h4 id="index1">목차 1번 영역</h4>
<!-- 내용 -->
<h4 id="index2">목차 2번 영역</h4>
<!-- 내용 -->

<a href="#title">메인으로!!</a>   <!-- 맨 위로 돌아가기 -->
```

클릭하면 해당 `id`를 가진 요소가 화면 맨 위에 오도록 이동하고, 주소창 끝에 `#index1`이 붙는다.

### ➕ 링크에 대해 더 알아둘 것

- **`id`는 페이지 안에서 중복되면 안 된다.** 여러 요소에 같은 이름을 붙이려면 `class`
- `href="#"` : 페이지 맨 위로 이동
- 다른 페이지의 특정 위치로 이동: `<a href="07_하이퍼링크.html#index2">`
- 특수 링크

```html
<a href="mailto:hello@example.com">메일 보내기</a>   <!-- 메일 앱 실행 -->
<a href="tel:1234-5678">전화 걸기</a>               <!-- 모바일에서 전화 앱 -->
<a href="files/report.pdf" download>파일 다운로드</a>  <!-- 열지 않고 다운로드 -->
```

- 외부 사이트를 `target="_blank"`로 열 때는 `rel="noopener noreferrer"`를 함께 쓰는 게 보안상 권장된다. 새 탭의 페이지가 원래 페이지를 조작하지 못하게 막는다.
- 링크 텍스트는 "여기", "클릭" 대신 **목적지가 드러나게** 쓴다 (예: "깃허브 바로가기"). 스크린 리더 사용자는 링크만 모아서 듣기도 한다.

---

## ✅ 마무리 요약

- `div`는 블록(새 줄, 가로 전체), `span`은 인라인(옆으로, 내용만큼)
- `<img>`는 `src`(경로) + `alt`(대체 텍스트), `px`는 고정 / `%`는 가변
- 상대 경로는 **현재 HTML 파일 위치** 기준, 배포 서버는 대소문자 구분
- `<audio>`/`<video>`는 `controls`가 있어야 플레이어가 보인다
- `<a href>`로 이동, `target="_blank"`로 새 탭, `#id`로 페이지 내부 이동
