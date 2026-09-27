document.addEventListener('DOMContentLoaded', () => {
  const CATEGORIES = [
    { id: 'characters', code: 'C', name: 'Personajes', sub: 'Desarrollo y credibilidad', icon: 'fa-users', color: '#ff6f59' },
    { id: 'atmosphere', code: 'A', name: 'Atmósfera', sub: 'Mundo y sensaciones', icon: 'fa-cloud-moon', color: '#6c5ce7' },
    { id: 'writing', code: 'W', name: 'Escritura / Dirección', sub: 'Calidad narrativa', icon: 'fa-pen-nib', color: '#2ec4b6' },
    { id: 'plot', code: 'P', name: 'Trama', sub: 'Estructura y coherencia', icon: 'fa-book-open-reader', color: '#3ddc84' },
    { id: 'intrigue', code: 'I', name: 'Intriga', sub: 'Te mantiene enganchado', icon: 'fa-magnifying-glass', color: '#ff4d97' },
    { id: 'logic', code: 'L', name: 'Lógica', sub: 'Consistencia interna', icon: 'fa-scale-balanced', color: '#4d8aff' },
    { id: 'enjoyment', code: 'E', name: 'Disfrute', sub: 'Placer personal', icon: 'fa-heart', color: '#ffc145' },
  ];
  const RING_CIRCUMFERENCE = 2 * Math.PI * 52; // r=52 in the SVG viewBox

  const form = document.getElementById('cawpileForm');
  const cardsContainer = document.getElementById('cardsContainer');
  const calculateBtn = document.getElementById('calculateBtn');
  const resetBtn = document.getElementById('resetBtn');
  const fillExampleBtn = document.getElementById('fillExampleBtn');
  const resultContainer = document.getElementById('resultContainer');
  const errorMessage = document.getElementById('errorMessage');
  const score5El = document.getElementById('score5');
  const score10El = document.getElementById('score10');
  const verdictEl = document.getElementById('verdictText');
  const starsRow = document.getElementById('starsRow');
  const breakdownList = document.getElementById('breakdownList');
  const progressFill = document.getElementById('progressFill');
  const progressCount = document.getElementById('progressCount');
  const copyBtn = document.getElementById('copyBtn');
  const copyHint = document.getElementById('copyHint');
  const scoreRingFill = document.getElementById('scoreRingFill');

  scoreRingFill.style.strokeDasharray = String(RING_CIRCUMFERENCE);
  scoreRingFill.style.strokeDashoffset = String(RING_CIRCUMFERENCE);

  // ---------- Render cards ----------
  cardsContainer.innerHTML = CATEGORIES.map((c) => `
    <article class="cat-card" data-card="${c.id}" style="--cat-color:${c.color}">
      <div class="cat-top">
        <span class="tab-badge" aria-hidden="true">${c.code}</span>
        <div class="cat-titles">
          <strong><i class="fa-solid ${c.icon}"></i> ${c.name}</strong>
          <small>${c.sub}</small>
        </div>
        <div class="cat-value-wrap">
          <input type="number" class="cat-value-input" id="num-${c.id}" min="1" max="10" step="0.5" placeholder="–" inputmode="decimal" aria-label="${c.name}, nota del 1 al 10">
          <span class="cat-value-max">/10</span>
        </div>
      </div>
      <input type="range" class="cat-range" id="range-${c.id}" min="1" max="10" step="0.5" value="5" aria-label="${c.name}, deslizador táctil">
    </article>
  `).join('');

  const state = {};
  CATEGORIES.forEach((c) => {
    state[c.id] = {
      ...c,
      range: document.getElementById(`range-${c.id}`),
      num: document.getElementById(`num-${c.id}`),
      card: document.querySelector(`[data-card="${c.id}"]`),
      touched: false,
    };
  });

  const isValid = (v) => {
    const n = parseFloat(String(v).replace(',', '.'));
    return !isNaN(n) && n >= 1 && n <= 10;
  };
  const toNum = (v) => parseFloat(String(v).replace(',', '.'));

  function paintRange(r) {
    const pct = ((parseFloat(r.value) - 1) / 9) * 100;
    r.style.setProperty('--fill', pct + '%');
  }

  // Los sliders arrancan (y se restablecen) en 5, ya marcados como rellenados.
  function applyDefault(s) {
    s.range.value = 5;
    s.num.value = 5;
    paintRange(s.range);
    s.touched = true;
    s.card.classList.add('filled');
    s.card.classList.remove('invalid');
  }
  Object.values(state).forEach((s) => applyDefault(s));

  function syncFromRange(s) {
    s.num.value = s.range.value;
    s.touched = true;
    s.card.classList.add('filled');
    s.card.classList.remove('invalid');
    updateProgress();
    hideError();
  }
  function syncFromNumber(s) {
    const raw = s.num.value;
    if (raw === '' || raw == null) {
      s.touched = false;
      s.card.classList.remove('filled', 'invalid');
      updateProgress();
      return;
    }
    if (!isValid(raw)) {
      s.card.classList.add('invalid');
      s.card.classList.remove('filled');
      updateProgress();
      return;
    }
    const n = toNum(raw);
    s.range.value = n;
    paintRange(s.range);
    s.touched = true;
    s.card.classList.add('filled');
    s.card.classList.remove('invalid');
    updateProgress();
    hideError();
  }

  Object.values(state).forEach((s) => {
    s.range.addEventListener('input', () => { paintRange(s.range); syncFromRange(s); });
    s.num.addEventListener('input', () => syncFromNumber(s));
    s.num.addEventListener('change', () => syncFromNumber(s));
  });

  function completedCount() {
    return Object.values(state).filter((s) => s.touched && isValid(s.num.value)).length;
  }
  function updateProgress() {
    const done = completedCount();
    progressCount.textContent = `${done}/7`;
    progressFill.style.width = `${(done / 7) * 100}%`;
  }

  function hideError() { errorMessage.classList.remove('show'); }
  function showError() {
    errorMessage.classList.add('show');
    resultContainer.classList.remove('show');
  }

  function verdictFor(score5) {
    if (score5 >= 4.5) return { text: 'Obra maestra · imprescindible', icon: 'fa-crown' };
    if (score5 >= 4.0) return { text: 'Excelente · muy recomendable', icon: 'fa-star' };
    if (score5 >= 3.5) return { text: 'Muy bueno · merece la pena', icon: 'fa-thumbs-up' };
    if (score5 >= 3.0) return { text: 'Bueno · entretenido', icon: 'fa-face-smile' };
    if (score5 >= 2.5) return { text: 'Aceptable · con altibajos', icon: 'fa-face-meh' };
    if (score5 >= 2.0) return { text: 'Flojo · solo para fans', icon: 'fa-face-frown' };
    return { text: 'No recomendable', icon: 'fa-ban' };
  }

  function renderStars(score5) {
    const rounded = Math.round(score5 * 2) / 2; // pasos de 0.5
    let html = '';
    for (let i = 1; i <= 5; i++) {
      if (rounded >= i) html += '<i class="fa-solid fa-star on"></i>';
      else if (rounded >= i - 0.5) html += '<i class="fa-solid fa-star-half-stroke on"></i>';
      else html += '<i class="fa-regular fa-star"></i>';
    }
    starsRow.innerHTML = html;
  }

  function renderBreakdown(values) {
    breakdownList.innerHTML = values.map((v) => `
      <div class="break-row" style="--cat-color:${v.color}">
        <span class="tab-badge" aria-hidden="true">${v.code}</span>
        <span class="break-bar"><i style="width:${(v.value / 10) * 100}%"></i></span>
        <span class="break-val">${v.value.toFixed(1)}</span>
      </div>
    `).join('');
  }

  function setRing(score5) {
    const pct = Math.max(0, Math.min(1, score5 / 5));
    scoreRingFill.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - pct));
  }

  function calculate() {
    const values = [];
    let ok = true;
    Object.values(state).forEach((s) => {
      if (!s.touched || !isValid(s.num.value)) {
        ok = false;
        s.card.classList.add('invalid');
      } else {
        values.push({ ...s, value: toNum(s.num.value) });
      }
    });
    if (!ok || values.length !== 7) { showError(); return; }
    hideError();
    const avg10 = values.reduce((a, b) => a + b.value, 0) / 7;
    const avg5 = avg10 / 2;
    score10El.textContent = avg10.toFixed(2);
    score5El.textContent = avg5.toFixed(2);
    const v = verdictFor(avg5);
    verdictEl.innerHTML = `<i class="fa-solid ${v.icon}"></i> ${v.text}`;
    renderStars(avg5);
    renderBreakdown(values);
    setRing(avg5);
    resultContainer.classList.add('show');
    copyHint.classList.remove('show');
    setTimeout(() => resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
  }

  function resetAll() {
    Object.values(state).forEach((s) => applyDefault(s));
    resultContainer.classList.remove('show');
    hideError();
    copyHint.classList.remove('show');
    setRing(0);
    updateProgress();
  }

  function fillExample() {
    const demo = { characters: 8, atmosphere: 9, writing: 7.5, plot: 8, intrigue: 9.5, logic: 7, enjoyment: 10 };
    Object.entries(demo).forEach(([id, val]) => {
      const s = state[id];
      s.range.value = val;
      paintRange(s.range);
      syncFromRange(s);
    });
    calculate();
  }

  calculateBtn.addEventListener('click', calculate);
  resetBtn.addEventListener('click', resetAll);
  fillExampleBtn.addEventListener('click', fillExample);
  form.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); calculate(); }
  });

  copyBtn.addEventListener('click', async () => {
    const txt = `Mi puntuación CAWPILE: ${score5El.textContent}/5 (${score10El.textContent}/10) — ${verdictEl.textContent.trim()}`;
    try { await navigator.clipboard.writeText(txt); }
    catch {
      const ta = document.createElement('textarea');
      ta.value = txt; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); ta.remove();
    }
    copyHint.classList.add('show');
    setTimeout(() => copyHint.classList.remove('show'), 2200);
  });

  // ---------- Acordeón ----------
  const accordion = document.getElementById('methodAccordion');
  const accBtn = document.getElementById('accordionBtn');
  const accPanel = document.getElementById('accordionPanel');
  const accHint = document.getElementById('accordionHint');
  // envolver contenido para animar con padding correcto
  accPanel.innerHTML = `<div class="accordion-panel-inner">${accPanel.innerHTML}</div>`;
  const accInner = accPanel.querySelector('.accordion-panel-inner');
  function setAccordion(open) {
    accordion.classList.toggle('open', open);
    accBtn.setAttribute('aria-expanded', String(open));
    accPanel.style.maxHeight = open ? accInner.scrollHeight + 'px' : '0px';
    accHint.textContent = open ? 'Toca para ocultar' : 'Toca para ver las 7 categorías';
  }
  accBtn.addEventListener('click', () => setAccordion(!accordion.classList.contains('open')));
  setAccordion(false);

  // ---------- Tema claro / oscuro ----------
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const root = document.documentElement;
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    const dark = t === 'dark';
    themeIcon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    themeToggle.setAttribute('aria-pressed', String(dark));
    try { localStorage.setItem('cawpile-theme', t); } catch {}
  }
  let saved = 'light';
  try { saved = localStorage.getItem('cawpile-theme') || saved; } catch {}
  if (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) saved = 'dark';
  applyTheme(saved);
  themeToggle.addEventListener('click', () => {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  updateProgress();
});