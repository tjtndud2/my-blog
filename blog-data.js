// Home과 Blog가 함께 쓰는 글 데이터.
// 글 추가: posts/ 폴더에 .md 파일을 만들고, posts/index.json 목록에 파일 이름을 추가하세요.
// .md 맨 위 front matter 형식:
// ---
// title: "글 제목"
// date: 2026-09-30
// section: Study Notes        (Study Notes | Assignments | Projects, 생략 시 Study Notes)
// categories: [Git]           (Jekyll 형식도 지원)
// category: Git               (선택)
// summary: "한 줄 요약"        (선택)
// tags: [git, branch]          (선택)
// ---
(function () {
  const MODULES = [
    { title: 'Module 1', period: '2026.08.26 ~ 2026.09.23' },
    { title: 'Module 2', period: '2026.09.28 ~' },
    { title: 'Module 3', period: '' },
    { title: 'Module 4', period: '' },
    { title: 'Module 5', period: '' }
  ];
  const POSTS_DIR = './posts/';

  function parseValue(v) {
    v = v.trim();
    if (v.startsWith('[') && v.endsWith(']')) {
      return v.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    }
    return v.replace(/^["']|["']$/g, '');
  }

  function parseFrontMatter(text) {
    const m = text.replace(/^\uFEFF/, '').match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)([\s\S]*)$/);
    const meta = {};
    let body = text;
    if (m) {
      body = m[2];
      m[1].split('\n').forEach(line => {
        const i = line.indexOf(':');
        if (i > 0) meta[line.slice(0, i).trim()] = parseValue(line.slice(i + 1));
      });
    }
    return { meta, body };
  }

  function toPost(file, text) {
    const { meta, body } = parseFrontMatter(text);
    const dateFromName = (file.match(/^(\d{4}-\d{2}-\d{2})/) || [])[1] || '';
    const firstLine = body.split('\n').map(s => s.trim()).find(s => s && !s.startsWith('#')) || '';
    const heading = (body.match(/^#\s+(.+)$/m) || [])[1];
    return {
      file,
      url: POSTS_DIR + file,
      title: meta.title || heading || file.replace(/\.md$/, ''),
      date: String(meta.date || dateFromName).slice(0, 10),
      section: meta.section || 'Study Notes',
      category: meta.category || (Array.isArray(meta.categories) ? meta.categories[0] : meta.categories) || '',
      summary: meta.summary || '',
      tags: Array.isArray(meta.tags) ? meta.tags : (meta.tags ? [meta.tags] : []),
      likes: Number(meta.likes) || 0
    };
  }

  window.BlogMD = { parseFrontMatter, toPost, POSTS_DIR };

  function publish(posts) {
    posts.sort((a, b) => b.date.localeCompare(a.date));
    window.BLOG_DATA = { modules: MODULES, posts };
    window.dispatchEvent(new Event('blogdata'));
  }

  fetch(POSTS_DIR + 'index.json', { cache: 'no-cache' })
    .then(r => r.ok ? r.json() : [])
    .then(files => Promise.all(files.map(f =>
      fetch(POSTS_DIR + f, { cache: 'no-cache' }).then(r => r.ok ? r.text() : null).then(t => t ? toPost(f, t) : null).catch(() => null)
    )))
    .then(list => publish(list.filter(Boolean)))
    .catch(() => publish([]));
})();
