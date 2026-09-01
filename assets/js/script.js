/* =========================================================
 *  sooyoung's blog
 *  ---------------------------------------------------------
 *  아래 CONFIG 값만 바꾸면 학습 진행률이 맞춰집니다.
 * ========================================================= */
const CONFIG = {
    startDate: '2026-08-26',   // 학습 1일차 (YYYY-MM-DD)
    totalDays: 200             // 목표 일수
};


/* ============ 테마 (다크 / 라이트) ============ */
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const next = isDark ? '' : 'dark';

    html.setAttribute('data-theme', next);
    try {
        localStorage.setItem('theme', next);
    } catch (e) { /* 저장 실패해도 화면은 바뀜 */ }

    updateThemeToggle();
}

function updateThemeToggle() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = isDark ? '☀️' : '🌙';
}

function initTheme() {
    let saved = '';
    try {
        saved = localStorage.getItem('theme') || '';
    } catch (e) { /* 무시 */ }

    document.documentElement.setAttribute('data-theme', saved);
    updateThemeToggle();
}


/* ============ 학습 진행률 (원형 + 막대) ============ */
function updateProgress() {
    const circle = document.getElementById('progressCircle');
    if (!circle) return;   // 홈이 아니면 종료

    const [y, m, d] = CONFIG.startDate.split('-').map(Number);
    const start = new Date(y, m - 1, d);
    const today = new Date();

    // 시각 차이로 하루가 어긋나지 않게 날짜만 비교
    const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const days = Math.floor((todayDay - startDay) / 86400000) + 1;
    const dayCount = Math.max(days, 1);
    const percent = Math.min(Math.round((dayCount / CONFIG.totalDays) * 100), 100);

    document.getElementById('dayCount').textContent = dayCount;
    document.getElementById('progressPercent').textContent = percent + '%';
    document.getElementById('progressBarFill').style.width = percent + '%';

    const circumference = 2 * Math.PI * 45;
    circle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
}


/* ============ 캘린더 ============ */
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function renderCalendar() {
    const daysBox = document.getElementById('calendarDays');
    const header = document.getElementById('calendarHeader');
    if (!daysBox || !header) return;   // 홈이 아니면 종료

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const prevLastDate = new Date(currentYear, currentMonth, 0).getDate();
    const trailing = 6 - lastDay.getDay();

    header.textContent = currentYear + '년 ' + (currentMonth + 1) + '월';
    daysBox.innerHTML = '';

    const cell = (text, cls) => {
        const el = document.createElement('div');
        el.className = 'calendar-day' + (cls ? ' ' + cls : '');
        el.textContent = text;
        daysBox.appendChild(el);
    };

    // 지난달 남은 날짜
    for (let i = prevLastDate - firstDay.getDay() + 1; i <= prevLastDate; i++) {
        cell(i, 'empty');
    }

    // 이번달
    const now = new Date();
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const isToday = now.getDate() === i &&
                        now.getMonth() === currentMonth &&
                        now.getFullYear() === currentYear;
        cell(i, isToday ? 'today' : '');
    }

    // 다음달 첫 날짜
    for (let i = 1; i <= trailing; i++) {
        cell(i, 'empty');
    }
}

function initCalendarNav() {
    const prev = document.getElementById('prevMonth');
    const next = document.getElementById('nextMonth');
    if (!prev || !next) return;

    prev.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) { currentMonth = 11; currentYear--; }
        renderCalendar();
    });

    next.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) { currentMonth = 0; currentYear++; }
        renderCalendar();
    });
}


/* ============ 방문자수 ============
 * 오늘  : 그날 하루의 방문 횟수 (날짜가 바뀌면 0부터)
 * 전체  : 계속 쌓이는 누적 방문 횟수
 * 저장소: localStorage (브라우저별로 따로 쌓임)
 * 초기화: 콘솔에서 resetVisitorStats()
 * ================================ */
const VISIT_KEY = 'sooyoungBlogVisits';
let visitStats = { date: '', today: 0, total: 0 };

function getTodayKey() {
    const d = new Date();
    return d.getFullYear() + '-' +
           String(d.getMonth() + 1).padStart(2, '0') + '-' +
           String(d.getDate()).padStart(2, '0');
}

function loadVisitStats() {
    try {
        const raw = localStorage.getItem(VISIT_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed.total === 'number') return parsed;
        }
    } catch (e) { /* 못 읽으면 0부터 */ }
    return { date: getTodayKey(), today: 0, total: 0 };
}

function saveVisitStats(stats) {
    try {
        localStorage.setItem(VISIT_KEY, JSON.stringify(stats));
    } catch (e) { /* 저장 실패해도 표시는 계속 */ }
}

function countVisit() {
    const key = getTodayKey();
    const stats = loadVisitStats();

    if (stats.date !== key) {   // 날짜가 바뀌면 '오늘'만 리셋
        stats.date = key;
        stats.today = 0;
    }

    stats.today += 1;
    stats.total += 1;

    saveVisitStats(stats);
    visitStats = stats;
}

function renderVisitorStats() {
    const today = visitStats.today.toLocaleString('ko-KR');
    const total = visitStats.total.toLocaleString('ko-KR');

    [['homeToday', today], ['homeTotal', total],
     ['todayVisitors', today], ['totalVisitors', total]].forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    });
}

function resetVisitorStats() {
    visitStats = { date: getTodayKey(), today: 0, total: 0 };
    saveVisitStats(visitStats);
    renderVisitorStats();
    console.log('방문자수를 초기화했습니다.');
}


/* ============ 글 목록 검색 / 카테고리 필터 (Blog 페이지) ============ */
function initBlogFilter() {
    const input = document.getElementById('searchInput');
    const list = document.getElementById('postsList');
    if (!input || !list) return;   // 블로그 페이지가 아니면 종료

    const items = Array.from(list.querySelectorAll('.post-item'));
    const buttons = Array.from(document.querySelectorAll('.filter-tag'));
    const empty = document.getElementById('emptyState');
    let category = 'all';

    function apply() {
        const q = input.value.trim().toLowerCase();
        let shown = 0;

        items.forEach(li => {
            const title = li.dataset.title || '';
            const summary = li.dataset.summary || '';
            const cats = (li.dataset.categories || '').split(',');

            const hitText = !q || title.includes(q) || summary.includes(q);
            const hitCategory = category === 'all' || cats.includes(category);
            const show = hitText && hitCategory;

            li.style.display = show ? '' : 'none';
            if (show) shown++;
        });

        if (empty) empty.style.display = shown === 0 ? 'block' : 'none';
    }

    input.addEventListener('input', apply);

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            category = btn.dataset.category;
            apply();
        });
    });

    // 홈 검색창에서 넘어온 ?q= 값 반영
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) input.value = q;

    apply();
}


/* ============ 시작 ============ */
initTheme();   // 화면 깜빡임을 줄이려고 즉시 실행

document.addEventListener('DOMContentLoaded', () => {
    updateThemeToggle();
    renderCalendar();
    initCalendarNav();
    updateProgress();
    initBlogFilter();
    countVisit();
    renderVisitorStats();
});
