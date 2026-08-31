---
layout: post
title: "브랜치와 충돌(Merge Conflict) 정리"
date: 2026-08-31
---

<script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
<script>mermaid.initialize({ startOnLoad: true });</script>

지난 글에서 브랜치와 merge를 가볍게 훑어봤으니
오늘은 그중에서도 **브랜치를 왜 나누는지**, 그리고 **merge할 때 왜 충돌이 나는지**를 조금 더 깊게 ㄱㄱ.
 
## 1. 브랜치를 나누는 이유

`main` 브랜치를 안전하게 두고, 새 작업은 별도의 줄기(브랜치)에서 하는 이유.
**아직 완성 안 된 작업이 main을 망가뜨리지 않게** 하기 위해서임.

<div class="mermaid">
flowchart LR
    m1((main 커밋1)) --> m2((main 커밋2))
    m2 --> f1((기능 브랜치 커밋1))
    f1 --> f2((기능 브랜치 커밋2))
</div>

| 명령어 | 언제 쓰나 |
|---|---|
| `git branch 브랜치명` | main은 그대로 두고, 새로운 작업 줄기를 만들고 싶을 때 |
| `git checkout 브랜치명` | 그 작업 줄기로 옮겨가서 작업하고 싶을 때 |

## 2. merge는 두 줄기를 다시 합치는 것

기능 브랜치에서 작업을 끝냈다면, 이제 그 내용을 다시 main으로 합쳐야 함. 문제없이 합쳐지면 좋겠지만, **같은 파일의 같은 부분을 두 브랜치가 서로 다르게 고쳤다면** Git이 "어느 쪽이 맞는지 나는 모르겠어"라며 멈춤. 이게 바로 **충돌(conflict)**.

<div class="mermaid">
flowchart LR
    m1((main)) --> m2((main))
    m2 --> f1((기능 브랜치))
    f1 --> f2((기능 브랜치: A로 수정))
    m2 --> m3((main: B로 수정))
    f2 -. git merge .-> X{같은 줄을\n다르게 고침}
    m3 --> X
    X --> C[충돌 발생!]
</div>

## 3. 충돌이 나면 화면에 이렇게 나와요

`git merge`를 실행했는데 충돌이 나면, 파일 안에 이런 표시가 생겨요.

```
<<<<<<< HEAD
지금 내 브랜치(main)에서 고친 내용
=======
합치려는 브랜치에서 고친 내용
>>>>>>> 기능-브랜치
```

- `<<<<<<< HEAD` 부터 `=======` 사이: **지금 내가 있는 브랜치**의 내용
- `=======` 부터 `>>>>>>> 기능-브랜치` 사이: **합치려던 브랜치**의 내용

## 4. 충돌 해결 3단계

| 단계 | 하는 일 |
|---|---|
| 1. 직접 고치기 | 파일을 열어서 `<<<<<<<`, `=======`, `>>>>>>>` 표시를 지우고, 어떤 내용을 남길지 직접 결정한다 |
| 2. `git add 파일명` | 다 고친 파일을 "이제 해결됐어요"라고 다시 스테이징에 올린다 |
| 3. `git commit` | 충돌 해결을 하나의 커밋으로 마무리한다 |

<div class="mermaid">
flowchart LR
    A[충돌 발생] --> B[파일 열어서\n직접 내용 정리]
    B --> C[git add\n해결됐다고 표시]
    C --> D[git commit\nmerge 완료]
</div>

## 5. 전체 흐름 정리

<div class="mermaid">
flowchart TD
    A[git branch\n새 브랜치 생성] --> B[git checkout\n브랜치 이동]
    B --> C[커밋 쌓기]
    C --> D[git checkout main\nmain으로 복귀]
    D --> E[git merge 기능-브랜치]
    E --> F{충돌 있음?}
    F -- 아니오 --> G[merge 완료]
    F -- 예 --> H[파일 직접 수정]
    H --> I[git add]
    I --> J[git commit]
    J --> G
</div>

브랜치와 merge, 충돌까지 알면 이제 "혼자 작업할 때"뿐 아니라 "여러 사람이 같은 파일을 건드릴 때"도 무섭지 않음. 충돌은 실수가 아니라, Git이 "여기 확인해줘"라고 알려주는 정상적인 과정이라는 걸 기억해야됨.
