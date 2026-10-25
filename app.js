const main = document.querySelector('main');

// ===== 1. Ma'lumotlar (brauzerda saqlanadi) =====
const KEY = 'maktab_state_v2';
const defaultState = {
  parent: { name: 'Dilnoza Aliyeva' },
  children: [
    { id: 'c1', name: 'Ali', grade: 2, avatar: '👦' },
    { id: 'c2', name: 'Malika', grade: 4, avatar: '👧' }
  ],
  activeId: 'c1',
  answers: {},
  approved: {},
  points: {}
};

let state = JSON.parse(localStorage.getItem(KEY)) || JSON.parse(JSON.stringify(defaultState));

function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}

function activeChild() {
  return state.children.find(c => c.id === state.activeId) || state.children[0];
}

function addPoints(childId, n) {
  state.points[childId] = (state.points[childId] || 0) + n;
}

function chipHTML(c) {
  return `<span class="child-chip">${c.avatar} <b>${c.name}</b> · ${c.grade}-sinf · ⭐ ${state.points[c.id] || 0}</span>`;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ===== 2. Podcast (YouTube havolalari) =====
const podcasts = [
  { title: 'Ota-onalar uchun video 1', note: 'Bola tarbiyasi', url: 'https://youtu.be/-rNPVCVa_Yg' },
  { title: 'Ota-onalar uchun video 2', note: 'Bola tarbiyasi', url: 'https://youtu.be/jr2MS8p4rOs' },
  { title: 'Ota-onalar uchun video 3', note: 'Bola tarbiyasi', url: 'https://youtu.be/zbDbbdfqbEs' },
  { title: 'Ota-onalar uchun video 4', note: 'Bola tarbiyasi', url: 'https://youtu.be/e3qjjTHtkxE' }
];

function renderPodcast() {
  document.getElementById('podcast').innerHTML = `
    <h2 class="page-title">🎙️ Podcast</h2>
    <p class="progress">Videoni bosing, YouTube’da ochiladi.</p>
    ${podcasts.map(p => `
      <a class="pod-card" href="${p.url}" target="_blank" rel="noopener">
        <span class="pod-ico">▶️</span>
        <span><strong>${p.title}</strong><small>${p.note}</small></span>
      </a>`).join('')}`;
}

// ===== 3. Tez orada sahifalari =====
const pages = {
  'child-psy': ['👶', 'Bola psixologiyasi', 'Maqolalar va maslahatlar keyingi qadamda qo\'shiladi.'],
  'women-psy': ['👩', 'Ayollar psixologiyasi', 'Maqolalar va maslahatlar keyingi qadamda qo\'shiladi.'],
  support:     ['🏆', 'Iqtidorni qo\'llab-quvvatlash', 'Qo\'shimcha topshiriqlar keyingi qadamda qo\'shiladi.'],
  class:       ['👥', 'Mening sinfim', 'Sinf ro\'yxati keyingi qadamda qo\'shiladi.'],
  awards:      ['🏆', 'Yutuqlar', 'Yutuqlar keyingi qadamda qo\'shiladi.']
};

Object.entries(pages).forEach(([id, [icon, title, text]]) => {
  const sec = document.createElement('section');
  sec.className = 'screen';
  sec.id = id;
  sec.innerHTML = `
    <div class="soon">
      <div class="soon-icon">${icon}</div>
      <h2 class="page-title">${title}</h2>
      <p>${text}</p>
      <button class="back-btn" data-go="home">← Bosh sahifaga</button>
    </div>`;
  main.appendChild(sec);
});

// ===== 4. Bo'limlar orasida o'tish =====
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.toggle('active', s.id === id);
  });
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.go === id);
  });
  main.scrollTop = 0;
}

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-go]');
  if (btn) showScreen(btn.dataset.go);
});

// ===== 5. Uyga vazifalar =====
const tasksData = {
  1: [
    { s: 'Matematika', t: '1 dan 10 gacha sonlarni sanang', how: 'Birga barmoqlarni sanang, har bir sonni ovoz chiqarib ayting.' },
    { s: 'Matematika', t: '2 + 3 va 4 + 5 misollarini yeching', how: 'Mevalar yoki tugmalar bilan misol tuzing, bola o\'zi hisoblasin.' },
    { s: 'Ona tili', t: 'Alifbodan 10 ta harfni yozing', how: 'Harflarni birga yozing, bola har bir harf nomini aytsin.' },
    { s: 'Ona tili', t: '5 ta oddiy so\'zni o\'qing', how: 'Bola so\'zlarni bo\'g\'in-bo\'g\'in o\'qisin, ota-ona to\'g\'rilab tursin.' },
    { s: 'Atrofdagi olam', t: 'Oilangiz a\'zolarining rasmini chizing', how: 'Birgalikda rasm chizing va har bir kishining ismini ayting.' }
  ],
  2: [
    { s: 'Matematika', t: '100 ichida qo\'shish va ayirish: 5 ta misol', how: 'Bola misollarni daftarda yechsin, ota-ona faqat tekshirsin.' },
    { s: 'Matematika', t: 'Sonlarni o\'sish tartibida yozing: 15, 8, 21, 3', how: 'Sonlarni kichikdan kattaga qarab yozish qoidasini birga eslang.' },
    { s: 'Ona tili', t: '10 ta so\'zni daftarga ko\'chirib yozing', how: 'Har bir so\'zni avval ovoz chiqarib o\'qisin, keyin yozsin.' },
    { s: 'Atrofdagi olam', t: 'Uch xil meva va sabzavot nomini ayting', how: 'Bozorga borganda yoki rasmda birga ko\'rsatib so\'rang.' },
    { s: 'Ingliz tili', t: 'Lug\'atdan 4 ta so\'zni yod oling', how: 'Lug\'atim bo\'limidagi so\'zlarni birga takrorlang, 🔊 bilan eshittiring.' }
  ],
  3: [
    { s: 'Matematika', t: '2 va 3 ko\'paytirish jadvalini yod oling', how: 'Jadvalni birga ayting, keyin bola o\'zi aytib bersin.' },
    { s: 'Matematika', t: 'Masala: 4 ta qutida 6 tadan olma bo\'lsa, jami nechta?', how: 'Masalani bola o\'zi o\'qisin, qanday amal kerakligini so\'rang.' },
    { s: 'Ona tili', t: '5 ta gapdan iborat qisqa matn yozing', how: 'Mavzu tanlang (masalan, uy hayvonlari), bola o\'zi yozsin.' },
    { s: 'Atrofdagi olam', t: 'Fasllarning nomini va belgilarini yozing', how: 'Har bir fasl haqida savol bering, javobini daftarga yozsin.' },
    { s: 'Ingliz tili', t: 'mother, father, sister so\'zlarini yod oling', how: 'Oila rasmini ko\'rsatib, so\'zlarni birga takrorlang.' }
  ],
  4: [
    { s: 'Matematika', t: 'Kasrlarni qo\'shing: 1/4 + 2/4', how: 'Pitsa yoki shokolad bo\'laklari bilan ko\'rsatib tushuntiring.' },
    { s: 'Matematika', t: 'Ko\'paytirish va bo\'lish bo\'yicha 3 ta masala yeching', how: 'Bola yechsin; qiyin bo\'lsa, birgalikda qadamma-qadam ko\'ring.' },
    { s: 'Ona tili', t: 'Mavzu bo\'yicha 5 gapdan iborat insho yozing', how: 'Bola o\'z fikrini yozsin, ota-ona faqat imloni tekshirsin.' },
    { s: 'Tabiatshunoslik', t: 'O\'simlikning qismlarini chizib, nomlang', how: 'Gulni birga kuzating va qismlarini ko\'rsatib bering.' },
    { s: 'Ingliz tili', t: 'Kundalik hayot haqida 3 ta gap tuzing', how: 'Bola ertalabki ishlari haqida gapirsin, ota-ona so\'zlarni ko\'rsatsin.' }
  ]
};

const taskId = (grade, i) => `${grade}-${i}`;

function renderTasks() {
  const c = activeChild();
  const list = tasksData[c.grade];
  const approved = state.approved[c.id] || [];
  const answers = state.answers[c.id] || {};
  const doneCount = list.filter((_, i) => approved.includes(taskId(c.grade, i))).length;

  document.getElementById('tasks').innerHTML = `
    <h2 class="page-title">📝 Uyga vazifalarim</h2>
    ${chipHTML(c)}
    <p class="progress">${doneCount}/${list.length} tasdiqlangan</p>
    ${list.map((t, i) => {
      const id = taskId(c.grade, i);
      const ok = approved.includes(id);
      return `
      <div class="task ${ok ? 'done' : ''}">
        <div class="task-head">
          <span class="check">${ok ? '✓' : ''}</span>
          <div>
            <small>${t.s}</small>
            <strong>${t.t}</strong>
          </div>
        </div>
        <details>
          <summary>Ota-ona uchun ko'rsatma</summary>
          <p>${t.how}</p>
        </details>
        <textarea data-answer="${id}" placeholder="${c.name}ning javobi...">${answers[id] || ''}</textarea>
        <button class="approve" data-approve="${id}">
          ${ok ? '✅ Tasdiqlangan (bekor qilish)' : 'Ota-ona tasdiqladi'}
        </button>
      </div>`;
    }).join('')}`;
}

main.addEventListener('change', e => {
  const ta = e.target.closest('[data-answer]');
  if (!ta) return;
  const cid = state.activeId;
  state.answers[cid] = state.answers[cid] || {};
  state.answers[cid][ta.dataset.answer] = ta.value;
  save();
});

function toggleApprove(id) {
  const cid = state.activeId;
  const answer = (state.answers[cid] || {})[id];
  const approved = state.approved[cid] || [];

  if (!approved.includes(id) && !(answer && answer.trim())) {
    alert('Avval bolaning javobini yozing, keyin tasdiqlang.');
    return;
  }

  if (approved.includes(id)) {
    state.approved[cid] = approved.filter(x => x !== id);
    addPoints(cid, -10);
  } else {
    state.approved[cid] = [...approved, id];
    addPoints(cid, 10);
  }
  save();
  renderAll();
}

// ===== 6. Javonim (kitoblar, o'zbek tilida) =====
const books = {
  parents: [
    {
      title: 'Bola bilan muloqot san\'ati',
      note: 'Ota-onalar uchun: bolani tinglash va to\'g\'ri gaplashish.',
      file: 'books/bola-bilan-muloqot.pdf'
    },
    {
      title: 'Ota-onalar uchun: intizom va mehr',
      note: 'Ota-onalar uchun: bolani mehr bilan tarbiyalash yo\'llari.',
      file: 'books/ota-ona-qollanma.pdf'
    }
  ],
  child: {
    title: 'O\'zbek xalq ertaklari',
    note: '1–4-sinf bolalari uchun. Ota-ona ovoz chiqarib o\'qib berishi mumkin.',
    file: 'books/ozbek-xalq-ertaklari.pdf'
  }
};

const bookCard = b => `
  <div class="book-card">
    <strong>${b.title}</strong>
    <p>${b.note}</p>
    <a class="dl" href="${b.file}" download>📥 Yuklab olish</a>
  </div>`;

function renderBooks() {
  document.getElementById('javonim').innerHTML = `
    <h2 class="page-title">📚 Javonim</h2>
    <h3 class="sub">Ota-onalar uchun</h3>
    ${books.parents.map(bookCard).join('')}
    <h3 class="sub">Bolaga o'qib berish uchun</h3>
    ${bookCard(books.child)}
    <p class="hint">Eslatma: kitob fayllarini MAKTAB papkasidagi "books" nomli papkaga joylang.</p>`;
}

// ===== 7. Bilimni mustahkamla (viktorina: 10 savol) =====
const langNames = { en: 'Ingliz', ru: 'Rus', fr: 'Fransuz', de: 'Nemis' };

const quiz = {
  lang: 'en',
  started: false,
  done: false,
  qs: [],
  i: 0,
  score: 0,
  answered: false,
  picked: -1
};

function mathQ(grade) {
  let a, b, q, ans;
  if (grade === 1) {
    a = rnd(1, 9); b = rnd(1, 10 - a);
    q = `${a} + ${b} = ?`; ans = a + b;
  } else if (grade === 2) {
    if (Math.random() < 0.5) {
      a = rnd(10, 60); b = rnd(10, 100 - a);
      q = `${a} + ${b} = ?`; ans = a + b;
    } else {
      a = rnd(20, 99); b = rnd(1, a);
      q = `${a} − ${b} = ?`; ans = a - b;
    }
  } else if (grade === 3) {
    a = rnd(2, 9); b = rnd(2, 9);
    q = `${a} × ${b} = ?`; ans = a * b;
  } else {
    b = rnd(2, 9); const c = rnd(2, 9);
    a = b * c;
    q = `${a} ÷ ${b} = ?`; ans = c;
  }

  const candidates = [ans + 1, ans + 2, ans + 3, ans - 1, ans - 2, ans - 3, ans + 10]
    .filter(x => x >= 0 && x !== ans);
  const opts = shuffle([ans, ...shuffle(candidates).slice(0, 3)]).map(String);
  return { q, opts, a: opts.indexOf(String(ans)) };
}

function buildQuiz() {
  const grade = activeChild().grade;
  const pool = words[quiz.lang].filter(w => w.g <= grade);
  const vocabCount = Math.min(5, pool.length);

  const vocab = shuffle(pool).slice(0, vocabCount).map(w => {
    const wrong = shuffle(pool.filter(x => x !== w)).slice(0, 3).map(x => x.uz);
    const opts = shuffle([w.uz, ...wrong]);
    return { q: `«${w.w}» so'zining ma'nosi qaysi?`, opts, a: opts.indexOf(w.uz) };
  });

  const math = Array.from({ length: 10 - vocabCount }, () => mathQ(grade));

  quiz.qs = shuffle([...vocab, ...math]);
  quiz.i = 0;
  quiz.score = 0;
  quiz.answered = false;
  quiz.picked = -1;
  quiz.started = true;
  quiz.done = false;
}

function renderQuiz() {
  const c = activeChild();
  let body;

  if (!quiz.started) {
    body = `
      <p class="progress">${c.name} uchun (${c.grade}-sinf): 5 ta lug'at savoli + 5 ta matematika savoli.</p>
      <h3 class="sub">Tilni tanlang</h3>
      <div class="lang-tabs">
        ${Object.keys(langNames).map(k => `
          <button class="lang ${k === quiz.lang ? 'active' : ''}" data-qlang="${k}">${langNames[k]}</button>`).join('')}
      </div>
      <button class="primary" data-qstart>Boshlash</button>`;
  } else if (quiz.done) {
    const msg = quiz.score >= 8 ? 'Ajoyib! 🌟' : quiz.score >= 5 ? 'Yaxshi, davom eting! 👍' : 'Yana bir bor urinib ko\'ring 💪';
    body = `
      <div class="result">
        <div class="big">${quiz.score}/10</div>
        <p>${msg}</p>
        <p class="progress">+${quiz.score * 10} ball qo'shildi</p>
        <button class="primary" data-qstart>Qayta boshlash</button>
      </div>`;
  } else {
    const q = quiz.qs[quiz.i];
    body = `
      <p class="progress">Savol ${quiz.i + 1}/10 · To'g'ri javoblar: ${quiz.score}</p>
      <h3 class="qtext">${q.q}</h3>
      <div class="opts">
        ${q.opts.map((o, k) => {
          let cls = '';
          if (quiz.answered) {
            if (k === q.a) cls = 'right';
            else if (k === quiz.picked) cls = 'wrong';
          }
          return `<button class="opt ${cls}" data-qa="${k}" ${quiz.answered ? 'disabled' : ''}>${o}</button>`;
        }).join('')}
      </div>
      ${quiz.answered ? `<button class="primary" data-qnext>${quiz.i === 9 ? 'Natijani ko\'rish' : 'Keyingi savol →'}</button>` : ''}`;
  }

  document.getElementById('quiz').innerHTML = `<h2 class="page-title">🧩 Bilimni mustahkamla</h2>${body}`;
}

// ===== 8. Sinf reytingi (butun sinf) =====
const classmates = {
  1: [['Jasur', 62], ['Sevara', 48], ['Bekzod', 35], ['Nodira', 21], ['Otabek', 12]],
  2: [['Jamshid', 70], ['Kamola', 58], ['Sardor', 44], ['Madina', 30], ['Rustam', 18]],
  3: [['Shahzod', 66], ['Zarina', 52], ['Dilshod', 40], ['Gulnoza', 27], ['Ulugbek', 15]],
  4: [['Abdulla', 74], ['Feruza', 55], ['Temur', 38], ['Sitora', 33], ['Ibrohim', 20]]
};

function renderRanking() {
  const c = activeChild();
  const grade = c.grade;

  const rows = [
    ...classmates[grade].map(([name, pts]) => ({ name, pts, avatar: '🙂', me: false })),
    ...state.children
      .filter(ch => ch.grade === grade)
      .map(ch => ({ name: ch.name, pts: state.points[ch.id] || 0, avatar: ch.avatar, me: ch.id === c.id }))
  ].sort((a, b) => b.pts - a.pts);

  const medals = ['🥇', '🥈', '🥉'];

  document.getElementById('ranking').innerHTML = `
    <h2 class="page-title">📊 Sinf reytingi</h2>
    <p class="progress">${grade}-sinf · butun sinf bo'yicha</p>
    ${rows.map((r, i) => `
      <div class="rank-row ${r.me ? 'me' : ''}">
        <span class="rank-no">${medals[i] || i + 1}</span>
        <span class="av">${r.avatar}</span>
        <span>
          <b>${r.name}</b>
          ${r.me ? '<small>Sizning farzandingiz</small>' : ''}
        </span>
        <span class="pts">${r.pts} ball</span>
      </div>`).join('')}`;
}

// ===== 9. Profil (ota-ona va bolalar) =====
function renderProfile() {
  const rows = state.children.map(c => `
    <button class="child-row ${c.id === state.activeId ? 'on' : ''}" data-child="${c.id}">
      <span class="av">${c.avatar}</span>
      <span class="cinfo"><b>${c.name}</b><small>${c.grade}-sinf · ⭐ ${state.points[c.id] || 0}</small></span>
      <span class="tick">${c.id === state.activeId ? '✓' : ''}</span>
    </button>`).join('');

  document.getElementById('profile').innerHTML = `
    <h2 class="page-title">👤 Profil</h2>
    <div class="parent-card">
      <span class="av big">👩</span>
      <div><b>${state.parent.name}</b><small>Ota-ona</small></div>
    </div>

    <h3 class="sub">Farzandlar (bosing, almashtiriladi)</h3>
    <div>${rows}</div>

    <h3 class="sub">Yangi bola qo'shish</h3>
    <div class="add-form">
      <input id="new-name" placeholder="Bolaning ismi">
      <select id="new-grade">
        <option value="1">1-sinf</option>
        <option value="2">2-sinf</option>
        <option value="3">3-sinf</option>
        <option value="4">4-sinf</option>
      </select>
      <select id="new-avatar">
        <option value="👦">O'g'il bola 👦</option>
        <option value="👧">Qiz bola 👧</option>
      </select>
      <button id="add-child">Qo'shish</button>
    </div>`;
}

function addChild() {
  const name = document.getElementById('new-name').value.trim();
  if (!name) return;
  const id = 'c' + Date.now();
  state.children.push({
    id,
    name,
    grade: Number(document.getElementById('new-grade').value),
    avatar: document.getElementById('new-avatar').value
  });
  state.activeId = id;
  save();
  renderAll();
}

// ===== 10. Bosh sahifa =====
function renderHome() {
  document.getElementById('active-chip').innerHTML = chipHTML(activeChild());
}

// ===== 11. Hodisalar =====
main.addEventListener('click', e => {
  const approveBtn = e.target.closest('[data-approve]');
  if (approveBtn) return toggleApprove(approveBtn.dataset.approve);

  const child = e.target.closest('[data-child]');
  if (child) {
    state.activeId = child.dataset.child;
    save();
    renderAll();
    return;
  }

  if (e.target.closest('#add-child')) return addChild();

  const ql = e.target.closest('[data-qlang]');
  if (ql) {
    quiz.lang = ql.dataset.qlang;
    return renderQuiz();
  }

  if (e.target.closest('[data-qstart]')) {
    buildQuiz();
    return renderQuiz();
  }

  const qa = e.target.closest('[data-qa]');
  if (qa && !quiz.answered) {
    const k = Number(qa.dataset.qa);
    quiz.answered = true;
    quiz.picked = k;
    if (k === quiz.qs[quiz.i].a) quiz.score++;
    return renderQuiz();
  }

  if (e.target.closest('[data-qnext]')) {
    if (quiz.i === 9) {
      quiz.done = true;
      addPoints(activeChild().id, quiz.score * 10);
      save();
    } else {
      quiz.i++;
      quiz.answered = false;
      quiz.picked = -1;
    }
    return renderQuiz();
  }
});

// ===== 12. Lug'atim (so'zlar oldindan kiritilgan) =====
// g = sinf, w = so'z, uz = o'zbekcha ma'nosi, p = talaffuz (o'zbekcha harflarda)
const words = {
  en: [
    { g: 1, w: 'apple',    uz: 'olma',        p: 'ep-l' },
    { g: 1, w: 'cat',      uz: 'mushuk',      p: 'ket' },
    { g: 1, w: 'dog',      uz: 'it',          p: 'dog' },
    { g: 1, w: 'sun',      uz: 'quyosh',      p: 'san' },
    { g: 2, w: 'book',     uz: 'kitob',       p: 'buk' },
    { g: 2, w: 'school',   uz: 'maktab',      p: 'skul' },
    { g: 2, w: 'water',    uz: 'suv',         p: 'vo-ter' },
    { g: 2, w: 'milk',     uz: 'sut',         p: 'milk' },
    { g: 3, w: 'family',   uz: 'oila',        p: 'fem-li' },
    { g: 3, w: 'friend',   uz: 'do\'st',      p: 'frend' },
    { g: 3, w: 'window',   uz: 'deraza',      p: 'vin-dou' },
    { g: 3, w: 'chair',    uz: 'stul',        p: 'cher' },
    { g: 4, w: 'teacher',  uz: 'o\'qituvchi', p: 'ti-cher' },
    { g: 4, w: 'homework', uz: 'uy vazifasi', p: 'hom-vyork' },
    { g: 4, w: 'garden',   uz: 'bog\'',       p: 'gar-dn' },
    { g: 4, w: 'morning',  uz: 'ertalab',     p: 'mor-ning' }
  ],
  ru: [
    { g: 1, w: 'яблоко',           uz: 'olma',        p: 'ya-blo-ko' },
    { g: 1, w: 'кот',              uz: 'mushuk',      p: 'kot' },
    { g: 1, w: 'собака',           uz: 'it',          p: 'so-ba-ka' },
    { g: 1, w: 'солнце',           uz: 'quyosh',      p: 'solnt-se' },
    { g: 2, w: 'книга',            uz: 'kitob',       p: 'kni-ga' },
    { g: 2, w: 'школа',            uz: 'maktab',      p: 'shko-la' },
    { g: 2, w: 'вода',             uz: 'suv',         p: 'va-da' },
    { g: 2, w: 'молоко',           uz: 'sut',         p: 'ma-la-ko' },
    { g: 3, w: 'семья',            uz: 'oila',        p: 'se-my-a' },
    { g: 3, w: 'друг',             uz: 'do\'st',      p: 'druk' },
    { g: 3, w: 'окно',             uz: 'deraza',      p: 'ok-no' },
    { g: 3, w: 'стул',             uz: 'stul',        p: 'stul' },
    { g: 4, w: 'учитель',          uz: 'o\'qituvchi', p: 'u-chi-tel' },
    { g: 4, w: 'домашнее задание', uz: 'uy vazifasi', p: 'da-ma-shnye za-da-nie' },
    { g: 4, w: 'сад',              uz: 'bog\'',       p: 'sad' },
    { g: 4, w: 'утро',             uz: 'ertalab',     p: 'u-tro' }
  ],
  fr: [
    { g: 1, w: 'pomme',      uz: 'olma',        p: 'pom' },
    { g: 1, w: 'chat',       uz: 'mushuk',      p: 'sha' },
    { g: 1, w: 'chien',      uz: 'it',          p: 'shyen' },
    { g: 1, w: 'soleil',     uz: 'quyosh',      p: 'so-ley' },
    { g: 2, w: 'livre',      uz: 'kitob',       p: 'livr' },
    { g: 2, w: 'école',      uz: 'maktab',      p: 'e-kol' },
    { g: 2, w: 'eau',        uz: 'suv',         p: 'o' },
    { g: 2, w: 'lait',       uz: 'sut',         p: 'le' },
    { g: 3, w: 'famille',    uz: 'oila',        p: 'fa-mi-y' },
    { g: 3, w: 'ami',        uz: 'do\'st',      p: 'a-mi' },
    { g: 3, w: 'fenêtre',    uz: 'deraza',      p: 'fe-netr' },
    { g: 3, w: 'chaise',     uz: 'stul',        p: 'shez' },
    { g: 4, w: 'professeur', uz: 'o\'qituvchi', p: 'pro-fe-sör' },
    { g: 4, w: 'devoirs',    uz: 'uy vazifasi', p: 'de-vuar' },
    { g: 4, w: 'jardin',     uz: 'bog\'',       p: 'zhar-den' },
    { g: 4, w: 'matin',      uz: 'ertalab',     p: 'ma-ten' }
  ],
  de: [
    { g: 1, w: 'Apfel',       uz: 'olma',        p: 'ap-fel' },
    { g: 1, w: 'Katze',       uz: 'mushuk',      p: 'kat-se' },
    { g: 1, w: 'Hund',        uz: 'it',          p: 'hunt' },
    { g: 1, w: 'Sonne',       uz: 'quyosh',      p: 'zon-ne' },
    { g: 2, w: 'Buch',        uz: 'kitob',       p: 'bukh' },
    { g: 2, w: 'Schule',      uz: 'maktab',      p: 'shu-le' },
    { g: 2, w: 'Wasser',      uz: 'suv',         p: 'vas-ser' },
    { g: 2, w: 'Milch',       uz: 'sut',         p: 'milkh' },
    { g: 3, w: 'Familie',     uz: 'oila',        p: 'fa-mi-li-e' },
    { g: 3, w: 'Freund',      uz: 'do\'st',      p: 'froynt' },
    { g: 3, w: 'Fenster',     uz: 'deraza',      p: 'fens-ter' },
    { g: 3, w: 'Stuhl',       uz: 'stul',        p: 'shtul' },
    { g: 4, w: 'Lehrer',      uz: 'o\'qituvchi', p: 'le-rer' },
    { g: 4, w: 'Hausaufgabe', uz: 'uy vazifasi', p: 'haus-auf-ga-be' },
    { g: 4, w: 'Garten',      uz: 'bog\'',       p: 'gar-ten' },
    { g: 4, w: 'Morgen',      uz: 'ertalab',     p: 'mor-gen' }
  ]
};

const langCodes = { en: 'en-US', ru: 'ru-RU', fr: 'fr-FR', de: 'de-DE' };
let currentLang = 'en';
let currentGrade = 1;

function renderWords() {
  const list = document.getElementById('word-list');
  const items = words[currentLang].filter(x => x.g === currentGrade);

  list.innerHTML = items.map(x => `
    <li>
      <div class="word-info">
        <strong>${x.w}</strong>
        <small>talaffuz: ${x.p}</small>
      </div>
      <span class="word-uz">${x.uz}</span>
      <button class="speak" data-word="${x.w}" title="Eshitish">🔊</button>
    </li>`).join('');
}

document.querySelectorAll('.lang').forEach(btn => {
  btn.addEventListener('click', () => {
    currentLang = btn.dataset.lang;
    document.querySelectorAll('.lang').forEach(b => b.classList.toggle('active', b === btn));
    renderWords();
  });
});

document.querySelectorAll('.grade').forEach(btn => {
  btn.addEventListener('click', () => {
    currentGrade = Number(btn.dataset.grade);
    document.querySelectorAll('.grade').forEach(b => b.classList.toggle('active', b === btn));
    renderWords();
  });
});

document.getElementById('word-list').addEventListener('click', e => {
  const btn = e.target.closest('.speak');
  if (!btn || !('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(btn.dataset.word);
  u.lang = langCodes[currentLang];
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
});

// ===== 13. Hammasini chizish =====
function renderAll() {
  renderHome();
  renderTasks();
  renderBooks();
  renderPodcast();
  renderQuiz();
  renderRanking();
  renderProfile();
  renderWords();
}

renderAll();