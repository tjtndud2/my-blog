---
layout: post
title: "이번 주 Git 핵심 명령어 정리"
date: 2026-08-31
--- 

<script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
<script>mermaid.initialize({ startOnLoad: true });</script>

안녕, 이번 주에 Git과 GitHub를 처음 배운 걸 축하해요!
오늘은 선생님이 되어서, 이번 주에 배운 내용만 딱 정리해줄게요.
**저장소 만들기 → 스테이징 → 커밋 → 브랜치 → push/pull/merge → 되돌리기**, 이 순서로 하나씩 볼게요.

## 1. 전체 흐름 한눈에 보기

Git으로 작업할 때 파일이 거쳐가는 세 가지 공간이 있어요. "워킹 디렉토리(내가 지금 고치고 있는 파일들)" → "스테이징(커밋할 것을 고르는 곳)" → "Local Repository(내 컴퓨터의 저장소)" 순서로 이동하고, 마지막에 `push`로 GitHub(원격 저장소)까지 올라가요.

<div class="mermaid">
flowchart LR
    A[워킹 디렉토리\n파일 수정] -->|git add| B[스테이징 영역]
    B -->|git commit| C[(Local Repository\n내 컴퓨터 저장소)]
    C -->|git push| D[(GitHub\n원격 저장소)]
    D -->|git pull| C
</div>

## 2. 저장소 만들기

내 컴퓨터의 어떤 폴더를 Git이 관리하도록 만드는 첫 단계예요. 이 명령을 실행하면 그 폴더 안에 숨겨진 `.git` 폴더가 생기는데, 여기가 바로 **Local Repository**예요.

| 명령어 | 언제 쓰나 |
|---|---|
| `git init` | 지금 있는 폴더를 Git 저장소로 처음 만들고 싶을 때 |

## 3. 스테이징

파일을 여러 개 고쳤는데, 그중 **커밋에 담고 싶은 것만 골라서** 올려두는 단계예요. 선생님이 자주 받는 질문이 "왜 굳이 스테이징을 거쳐야 하나요?"인데, 답은 "한 번에 다 커밋하지 않고, 관련 있는 변경사항끼리만 묶어서 기록하기 위해서"예요.

| 명령어 | 언제 쓰나 |
|---|---|
| `git add 파일명` | 특정 파일 하나만 스테이징에 올리고 싶을 때 |
| `git add .` | 바뀐 파일을 전부 스테이징에 올리고 싶을 때 |

## 4. Local Repository와 커밋

**Local Repository**는 커밋들이 차곡차곡 쌓이는, 내 컴퓨터 안의 저장소예요. `git commit`을 실행하면 스테이징에 올려둔 내용이 하나의 "저장 지점"으로 Local Repository에 기록돼요.

<div class="mermaid">
flowchart LR
    subgraph Local Repository
    c1((커밋 1)) --> c2((커밋 2)) --> c3((커밋 3))
    end
</div>

| 명령어 | 언제 쓰나 |
|---|---|
| `git commit -m "메시지"` | 스테이징에 올려둔 변경사항을 하나의 저장 지점으로 기록하고 싶을 때 |

## 5. 브랜치

브랜치는 "또 다른 작업 줄기"예요. 원래 줄기(보통 `main`)를 건드리지 않고 새로운 기능을 안전하게 실험해볼 수 있어요.

<div class="mermaid">
flowchart LR
    m1((main 커밋1)) --> m2((main 커밋2))
    m2 --> f1((기능 브랜치 커밋1))
    f1 --> f2((기능 브랜치 커밋2))
    m2 --> m3((main 커밋3))
</div>

| 명령어 | 언제 쓰나 |
|---|---|
| `git branch 브랜치명` | 새 브랜치를 만들고 싶을 때 |
| `git checkout 브랜치명` | 다른 브랜치로 이동하고 싶을 때 |

## 6. push와 pull

내 Local Repository와 GitHub(원격 저장소)는 서로 자동으로 동기화되지 않아요. **push**로 내 기록을 올리고, **pull**로 다른 사람(또는 다른 컴퓨터)의 기록을 받아와야 해요.

<div class="mermaid">
flowchart LR
    L[(Local Repository)] -- git push --> R[(GitHub 원격 저장소)]
    R -- git pull --> L
</div>

| 명령어 | 언제 쓰나 |
|---|---|
| `git push` | 내 Local Repository의 커밋을 GitHub에 올리고 싶을 때 |
| `git pull` | GitHub에 있는 최신 커밋을 내 Local Repository로 받아오고 싶을 때 |

## 7. merge

merge는 나뉘어 있던 두 브랜치를 **다시 하나로 합치는 것**이에요. 예를 들어 기능 브랜치에서 작업을 끝냈으면, 그 내용을 main 브랜치로 합쳐야 해요.

<div class="mermaid">
flowchart LR
    m1((main)) --> m2((main))
    m2 --> f1((기능 브랜치))
    f1 --> f2((기능 브랜치))
    m2 --> m3((main))
    f2 -.git merge.-> m4((main + 기능 합쳐짐))
    m3 --> m4
</div>

| 명령어 | 언제 쓰나 |
|---|---|
| `git merge 브랜치명` | 다른 브랜치의 변경사항을 지금 브랜치로 합치고 싶을 때 |

## 8. 되돌리기

작업하다 보면 실수로 잘못된 커밋을 만들 때가 있어요. 이럴 때 쓰는 두 가지 방법을 배웠어요.

| 명령어 | 언제 쓰나 |
|---|---|
| `git reset` | 최근 커밋을 아예 없었던 것처럼 되돌리고 싶을 때 |
| `git revert` | 커밋 기록은 남기되, 그 내용만 취소하는 새 커밋을 만들고 싶을 때 |

## 오늘의 정리

이번 주에 배운 순서를 다시 흐름도로 보면 이래요.

<div class="mermaid">
flowchart TD
    A[git init\n저장소 만들기] --> B[git add\n스테이징]
    B --> C[git commit\nLocal Repository에 기록]
    C --> D[git branch / checkout\n브랜치 만들기]
    D --> E[git push / git pull\nGitHub와 동기화]
    E --> F[git merge\n브랜치 합치기]
    F --> G[git reset / git revert\n되돌리기]
</div>

처음엔 단계가 많아 보이지만, 결국 "**고르고(add) → 기록하고(commit) → 주고받는다(push/pull)**"는 흐름만 기억하면 돼요. 다음 주엔 이 흐름 위에서 더 다양한 상황(예: 충돌 해결)을 배워볼 수 있을 거예요.
