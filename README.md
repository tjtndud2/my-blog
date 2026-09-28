# my-blog complete redesign

이 폴더는 업로드된 두 원본을 합친 GitHub Pages 배포용 완성본입니다.

- `HTML 페이지 편집 설정.zip`의 디자인/기능을 정적 페이지 구조로 유지
- `my-blog.zip`의 실제 Markdown 게시글 6개 본문을 그대로 보존
- 기존 Jekyll 글 주소는 새 `post.html` 주소로 리다이렉트
- `.nojekyll` 포함: GitHub Pages에서 그대로 정적 파일로 배포
- 방명록/좋아요/저장/방문자 수는 원본 디자인과 동일하게 브라우저 `localStorage` 기반

배포할 때는 이 폴더 **안의 파일과 폴더 전체**를 저장소 루트에 올리면 됩니다.
