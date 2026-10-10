/* ================= app ================= */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const main = $('#main'), side = $('#side');
  const PRI = { must: ['Must Know', 'يجب معرفته'], imp: ['Important', 'مهم'], add: ['Additional Detail', 'تفصيل إضافي'] };
  const TABS = [['learn', 'Learn', 'الشرح'], ['map', 'Mind maps', 'الخرائط الذهنية'], ['essay', 'Essay practice', 'الأسئلة المقالية'], ['rev', 'Revision', 'المراجعة'], ['test', 'Self-test', 'الاختبار الذاتي']];

  /* ---------- escape literal tokens such as <s>, </s>, <UNK> in content (mind maps are escaped at draw time) ---------- */
  const TOK = /<(\/?)(s|UNK|URL|BOS|EOS|MASK|mask|EOS|pad|PAD)>/g;
  (function walk(o) { for (const k in o) { if (k === 'maps') continue; const v = o[k]; if (typeof v === 'string') o[k] = v.replace(TOK, '&lt;$1$2&gt;'); else if (v && typeof v === 'object') walk(v); } })(CH);

  /* ---------- state (per-browser convenience) ---------- */
  const KEY = 'arti404-atlas-v1';
  let st = { s: {}, e: {}, c: {}, k: {}, q: {}, d: {}, ar: true, open: {} };
  try { const raw = localStorage.getItem(KEY); if (raw) st = Object.assign(st, JSON.parse(raw)); } catch (e) { }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { } };

  /* ---------- small renderers ---------- */
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const strip = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  const bi = (en, ar, cls = '') => `<div class="bi ${cls}"><div class="en">${en}</div>${ar ? `<div class="ar" lang="ar" dir="rtl">${ar}</div><button class="peek" type="button" data-act="peek" lang="ar" aria-label="Show the Arabic translation for this item">عربي</button>` : ''}</div>`;
  const pri = p => `<span class="pri pri-${p}">${PRI[p][0]}</span>`;

  function block(b, sid, j) {
    switch (b.t) {
      case 'p': return bi(b.en, b.ar);
      case 'def': return `<div class="def" id="${sid}-d${j}"><div class="def-term">${b.term} ${pri(b.pri)}</div>${bi(b.en, b.ar)}</div>`;
      case 'list': { const tag = b.ordered ? 'ol' : 'ul'; return `<${tag} class="blist">${b.en.map((x, i) => `<li>${bi(x, b.ar && b.ar[i])}</li>`).join('')}</${tag}>`; }
      case 'table': return `<div class="tbl"><table class="t"><thead><tr>${b.head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${b.note ? bi(`<span class="muted">${b.note[0]}</span>`, b.note[1]) : ''}`;
      case 'ex': return `<div class="callout ex"><div class="callout-l">Example</div>${bi(b.en, b.ar)}</div>`;
      case 'xa': return `<div class="callout xa"><div class="callout-l">Added for clarity · not from the slides</div>${bi(b.en, b.ar)}</div>`;
      case 'warn': return `<div class="callout warn"><div class="callout-l">Don't confuse</div>${bi(b.en, b.ar)}</div>`;
      case 'key': return `<div class="callout key"><div class="callout-l">Memorize</div>${bi(b.en, b.ar)}</div>`;
      case 'formula': return `<div class="formula"><div class="f">${b.f}</div>${bi(b.en, b.ar)}</div>`;
      case 'flow': return `<div class="flow" role="list">${b.steps.map((s, i) => `${i ? '<span class="ar-r" aria-hidden="true">→</span>' : ''}<div class="st" role="listitem">${s[0]}${s[1] ? `<span class="s-ar" lang="ar">${s[1]}</span>` : ''}</div>`).join('')}</div>${b.cap ? bi(`<span class="muted">${b.cap[0]}</span>`, b.cap[1]) : ''}`;
    }
    return '';
  }

  /* ---------- progress ---------- */
  function prog(ch) {
    const sec = ch.sections.length, sd = ch.sections.filter(s => st.s[s.id]).length;
    const es = ch.essays.length, ed = ch.essays.filter((_, i) => st.e[`${ch.id}-e${i}`]).length;
    const fc = ch.flashcards.length, fd = ch.flashcards.filter((_, i) => st.c[`${ch.id}-f${i}`] === 'k').length;
    const ck = ch.checklist.length, cd = ch.checklist.filter((_, i) => st.k[`${ch.id}-k${i}`]).length;
    const tot = sec + es + fc + ck, done = sd + ed + fd + cd;
    return { sec, sd, es, ed, fc, fd, ck, cd, pct: tot ? Math.round(100 * done / tot) : 0 };
  }
  const pctOf = (a, b) => b ? Math.round(100 * a / b) : 0;
  const barRow = (label, a, b) => `<div class="bar"><span>${label}</span><span class="tr"><i style="width:${pctOf(a, b)}%"></i></span><span class="v">${a}/${b}</span></div>`;

  /* ---------- sidebar ---------- */
  function renderSide(route) {
    const link = (href, n, t, pct, on) => `<a href="#${href}" class="${on ? 'on' : ''}"><span class="n">${n}</span><span class="t">${t}</span>${pct == null ? '' : `<span class="mini"><i style="width:${pct}%"></i></span>`}</a>`;
    side.innerHTML = `<h2>Study</h2>${link('home', '◎', 'Dashboard', null, route.page === 'home')}${link('formulas', 'ƒ', 'Formula sheet', null, route.page === 'formulas')}<h2>Chapters</h2>${CH.map(c => link(c.id, String(c.num).padStart(2, '0'), c.title, prog(c).pct, route.ch === c)).join('')}`;
  }

  /* ---------- dashboard ---------- */
  function renderHome() {
    let A = { sec: 0, sd: 0, es: 0, ed: 0, fc: 0, fd: 0, ck: 0, cd: 0 };
    CH.forEach(c => { const p = prog(c); for (const k in A) A[k] += p[k]; });
    const tot = A.sec + A.es + A.fc + A.ck, done = A.sd + A.ed + A.fd + A.cd, pct = pctOf(done, tot);
    const C = 2 * Math.PI * 52;
    main.innerHTML = `<div class="wrap" style="max-width:1000px">
    <section class="hero">
      <div><div class="eyebrow">ARTI 404 · Natural Language Processing · Midterm</div>
        <h1>Seven lectures, one study atlas</h1>
        ${bi(`<p class="lede" style="margin:0">Every lecture from your slides, explained in plain English with Arabic support, mind maps, practice essay questions with model answers, flashcards and self-tests. Your progress is saved in this browser.</p>`, `كل محاضرة من شرائحك مشروحة بإنجليزية بسيطة مع دعم عربي، وخرائط ذهنية، وأسئلة مقالية للتدريب مع إجابات نموذجية، وبطاقات مراجعة، واختبارات ذاتية. يُحفظ تقدمك في هذا المتصفح.`)}
      </div>
      <div class="ring" role="img" aria-label="Overall progress ${pct} percent"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="var(--surface-2)" stroke-width="10"/><circle cx="60" cy="60" r="52" fill="none" stroke="var(--accent)" stroke-width="10" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct / 100)}"/></svg><div class="rv"><b>${pct}%</b><span>overall</span></div></div>
    </section>
    <div class="stats">
      <div class="stat"><b>${A.sd}/${A.sec}</b><span>sections studied</span></div>
      <div class="stat"><b>${A.ed}/${A.es}</b><span>essays practised</span></div>
      <div class="stat"><b>${A.fd}/${A.fc}</b><span>flashcards known</span></div>
      <div class="stat"><b>${A.cd}/${A.ck}</b><span>checklist items</span></div>
    </div>
    <h2 class="dash-h">Chapters</h2>
    <div class="grid-ch">${CH.map(c => { const p = prog(c); return `<a class="chcard" href="#${c.id}"><span class="wk">${c.week.toUpperCase()}</span><h3>${c.title}</h3><span class="tar" lang="ar">${c.titleAr}</span><span class="meta">${c.sections.length} sections · ${c.maps.length} mind maps · ${c.essays.length} essay questions · ${c.flashcards.length} flashcards</span><div class="bars">${barRow('Studied', p.sd, p.sec)}${barRow('Essays', p.ed, p.es)}${barRow('Cards', p.fd, p.fc)}${barRow('Checklist', p.cd, p.ck)}</div></a>`; }).join('')}</div>
    <div class="two">
      <div class="panel"><h3 style="font-size:19px;margin-bottom:10px">How to use this atlas</h3>
        <ol class="blist">
          <li>${bi(`<b>Learn</b>: read each section, then tick <i>Studied</i>.`, `<b>الشرح</b>: اقرأ كل قسم ثم ضع علامة <i>Studied</i>.`)}</li>
          <li>${bi(`<b>Mind maps</b>: click a coloured branch to focus on it.`, `<b>الخرائط الذهنية</b>: انقر على فرع ملوّن للتركيز عليه.`)}</li>
          <li>${bi(`<b>Essay practice</b>: write your own answer first, then reveal the model answer and compare with the key points.`, `<b>الأسئلة المقالية</b>: اكتب إجابتك أولًا، ثم اعرض الإجابة النموذجية وقارنها بالنقاط الأساسية.`)}</li>
          <li>${bi(`<b>Revision</b> and <b>Self-test</b>: flashcards, comparisons, common mistakes, checklist and quizzes.`, `<b>المراجعة</b> و<b>الاختبار الذاتي</b>: بطاقات، ومقارنات، وأخطاء شائعة، وقائمة تحقق، واختبارات.`)}</li>
          <li>${bi(`Use the Arabic button in the top bar to switch between English-only and bilingual mode. In English-only mode, the small <span lang="ar">عربي</span> button under any item shows just that translation.`, `استخدم زر العربية في الشريط العلوي للتبديل بين وضع الإنجليزية فقط والوضع ثنائي اللغة. في وضع الإنجليزية فقط، يعرض الزر الصغير "عربي" تحت أي عنصر ترجمته وحده.`)}</li>
        </ol></div>
      <div class="panel"><h3 style="font-size:19px;margin-bottom:10px">Priority labels</h3>
        <div class="legend">
          <div>${pri('must')}${bi(`Essential concepts: definitions, formulas, classifications and processes that are central to the lecture.`, `مفاهيم أساسية: تعريفات وصيغ وتصنيفات وعمليات محورية في المحاضرة.`)}</div>
          <div>${pri('imp')}${bi(`Concepts you should understand well and be able to explain.`, `مفاهيم يجب أن تفهمها جيدًا وتستطيع شرحها.`)}</div>
          <div>${pri('add')}${bi(`Supporting information, extra depth or reference material.`, `معلومات داعمة أو تعمّق إضافي أو مادة مرجعية.`)}</div>
        </div>
        <p class="muted" style="font-size:14px;margin:12px 0 0">Labels are a study aid based on how much each lecture emphasises a topic. The essay questions are practice questions built from your course material, not a prediction of the exam.</p></div>
    </div>
    <h2 class="dash-h">Sources covered</h2>
    <div class="panel" style="margin-top:12px"><div class="tbl" style="border:0"><table class="srcs"><thead><tr><th>Chapter</th><th>File</th><th>Slides</th></tr></thead><tbody>${CH.map(c => `<tr><td>${c.week}: ${c.title}</td><td class="mono">${c.file}</td><td>${c.slides}</td></tr>`).join('')}</tbody></table></div>
      <p style="font-size:14px;margin:12px 0 0" class="muted">All slides were readable. Lecture 1 is mostly screenshots (application demos, a POS tagger, a parse tree, a word-sense example); their content is described in words here. Equations that appear only as images in Weeks 5–7 were read from the slide images and checked by recalculation. Text marked <i>Added for clarity · not from the slides</i> is extra explanation that is not in your lecture files.</p></div>
    <h2 class="dash-h">Reset</h2>
    <div class="panel" style="margin-top:12px"><div class="confirm" id="resetBox"><span class="muted" style="font-size:14px">Clear all ticks, flashcard marks, quiz answers and drafts saved in this browser.</span><button class="btn small" data-act="reset1" type="button">Reset progress</button></div></div>
    </div>`;
  }

  /* ---------- formula sheet ---------- */
  function renderFormulas() {
    main.innerHTML = `<div class="wrap"><div class="eyebrow">All chapters</div><h1 style="font-size:clamp(28px,4vw,40px);margin:6px 0 8px">Formula sheet</h1>${bi(`<p class="lede" style="margin:0">Every formula from the lectures in one place, with a plain-language reading. Each one links back to the section it comes from.</p>`, `كل الصيغ الواردة في المحاضرات في مكان واحد مع شرح مبسّط، وكل صيغة مرتبطة بالقسم الذي جاءت منه.`)}
    ${CH.map(c => { const fs = []; c.sections.forEach(s => s.blocks.forEach(b => { if (b.t === 'formula') fs.push([s, b]); })); return fs.length ? `<section class="fsec"><h2>${c.week}: ${c.title}</h2><div class="fgrid">${fs.map(([s, b]) => `<div class="formula"><div class="f">${b.f}</div>${bi(b.en, b.ar)}<a href="#${c.id}" data-goto="${c.id}|learn|${s.id}" style="font-size:13px">From: ${s.h}</a></div>`).join('')}</div></section>` : ''; }).join('')}</div>`;
  }

  /* ---------- mind map ---------- */
  function wrapText(t, max) {
    const words = strip(t).split(' '), lines = []; let cur = '';
    words.forEach(w => { if ((cur + ' ' + w).trim().length > max && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); });
    if (cur) lines.push(cur); return lines;
  }
  function relax(movers, fixed, Wd, Ht, iters = 600) {
    const all = movers.concat(fixed);
    for (let it = 0; it < iters; it++) {
      let moved = false;
      for (let i = 0; i < movers.length; i++) {
        const a = movers[i];
        for (let j = 0; j < all.length; j++) {
          const b = all[j]; if (a === b) continue;
          const ox = (a.w + b.w) / 2 + 10 - Math.abs(a.x - b.x), oy = (a.h + b.h) / 2 + 8 - Math.abs(a.y - b.y);
          if (ox > 0 && oy > 0) {
            moved = true; const share = fixed.includes(b) ? 1 : .5;
            if (ox < oy) { const s = a.x < b.x ? -1 : 1; a.x += s * ox * share; if (share < 1) b.x -= s * ox * share; }
            else { const s = a.y < b.y ? -1 : 1; a.y += s * oy * share; if (share < 1) b.y -= s * oy * share; }
          }
        }
        a.x = Math.min(Math.max(a.x, a.w / 2 + 6), Wd - a.w / 2 - 6); a.y = Math.min(Math.max(a.y, a.h / 2 + 6), Ht - a.h / 2 - 6);
      }
      if (!moved) break;
    }
  }
  function boxText(n, cls, lh, attrs = '') {
    const y0 = n.y - (n.lines.length - 1) * lh / 2;
    return `<g class="${cls}" ${attrs}><rect x="${(n.x - n.w / 2).toFixed(1)}" y="${(n.y - n.h / 2).toFixed(1)}" width="${n.w.toFixed(1)}" height="${n.h.toFixed(1)}" rx="${cls === 'n-c' ? 14 : 8}"/>${n.lines.map((l, i) => `<text x="${n.x.toFixed(1)}" y="${(y0 + i * lh).toFixed(1)}" text-anchor="middle" dominant-baseline="central">${esc(l)}</text>`).join('')}</g>`;
  }
  function mindmap(m, mid) {
    const Wd = 1200, Ht = 860, cx = Wd / 2, cy = Ht / 2, n = m.b.length;
    const center = { x: cx, y: cy, lines: wrapText(m.c, 16) }; center.w = Math.max(...center.lines.map(l => l.length)) * 12.4 + 36; center.h = center.lines.length * 25 + 24;
    const br = m.b.map((b, i) => {
      const a = -Math.PI / 2 + i * 2 * Math.PI / n, lines = wrapText(b.n, 18);
      return { i, a, b, x: cx + 285 * Math.cos(a), y: cy + 215 * Math.sin(a), lines, w: Math.max(...lines.map(l => l.length)) * 9.6 + 28, h: lines.length * 20 + 18, c: `var(--m${i % 6 + 1})` };
    });
    const kids = [];
    br.forEach(B => {
      const k = B.b.k.length, span = Math.min(2 * Math.PI / n * .78, .4 * (k - 1));
      B.b.k.forEach((t, j) => {
        const a = B.a + (k > 1 ? (j / (k - 1) - .5) * span : 0), rr = (k >= 3 && j % 2) ? 1.1 : 1, lines = wrapText(t, 19);
        kids.push({ t, B, x: cx + 470 * rr * Math.cos(a), y: cy + 340 * rr * Math.sin(a), lines, w: Math.max(...lines.map(l => l.length)) * 8.1 + 22, h: lines.length * 18 + 14 });
      });
    });
    relax(kids, [center, ...br], Wd, Ht);
    const labels = [];
    br.forEach(B => { if (!B.b.r) return; const lines = wrapText(B.b.r, 22); labels.push({ x: cx + (B.x - cx) * .58, y: cy + (B.y - cy) * .58, lines, w: Math.max(...lines.map(l => l.length)) * 7.0 + 16, h: lines.length * 16 + 8, cls: 'lbl', b: String(B.i) }); });
    const xs = (m.x || []).map(([a, b, t]) => {
      const A = br[a], B = br[b]; let mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
      let dx = mx - cx, dy = my - cy; const d = Math.hypot(dx, dy);
      let qx, qy; if (d < 40) { const px = -(B.y - A.y), py = B.x - A.x, pl = Math.hypot(px, py); qx = cx + px / pl * 150; qy = cy + py / pl * 150; } else { qx = mx - dx / d * 30; qy = my - dy / d * 30; }
      const lx = .25 * A.x + .5 * qx + .25 * B.x, ly = .25 * A.y + .5 * qy + .25 * B.y, lines = wrapText(t, 24);
      const L = { x: lx, y: ly, lines, w: Math.max(...lines.map(l => l.length)) * 7.4 + 16, h: lines.length * 16 + 8, cls: 'lbl x', b: `${a} ${b}` };
      labels.push(L); return { A, B, qx, qy, a, b };
    });
    relax(labels, [center, ...br, ...kids], Wd, Ht);
    let s = `<svg class="mm" viewBox="0 0 ${Wd} ${Ht}" role="img" aria-label="Mind map: ${esc(m.title)}" data-mm="${mid}"><defs><marker id="ah-${mid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>`;
    xs.forEach(X => { s += `<path class="e-x" data-b="${X.a} ${X.b}" d="M${X.A.x.toFixed(1)} ${X.A.y.toFixed(1)} Q${X.qx.toFixed(1)} ${X.qy.toFixed(1)} ${X.B.x.toFixed(1)} ${X.B.y.toFixed(1)}" marker-end="url(#ah-${mid})" marker-start="url(#ah-${mid})"/>`; });
    br.forEach(B => { const qx = cx + (B.x - cx) * .5 + (B.y - cy) * .12, qy = cy + (B.y - cy) * .5 - (B.x - cx) * .12; s += `<path class="e-main" data-b="${B.i}" style="stroke:${B.c}" d="M${cx} ${cy} Q${qx.toFixed(1)} ${qy.toFixed(1)} ${B.x.toFixed(1)} ${B.y.toFixed(1)}"/>`; });
    kids.forEach(K => { s += `<path class="e-kid" data-b="${K.B.i}" style="stroke:${K.B.c}" d="M${K.B.x.toFixed(1)} ${K.B.y.toFixed(1)} L${K.x.toFixed(1)} ${K.y.toFixed(1)}"/>`; });
    kids.forEach(K => { s += boxText(K, 'n-k', 18, `data-b="${K.B.i}" style="--c:${K.B.c}"`); });
    br.forEach(B => { s += boxText(B, 'n-b', 20, `data-b="${B.i}" style="--c:${B.c}" tabindex="0" role="button" aria-label="Focus branch ${esc(B.b.n)}" data-act="mmfocus"`); });
    s += boxText(center, 'n-c', 25, `data-act="mmreset" style="cursor:pointer"`);
    labels.forEach(L => { s += boxText(L, L.cls, 16, `data-b="${L.b}"`); });
    return s + '</svg>';
  }
  function mapOutline(m) {
    return `<details class="outline"><summary>Text outline of this map</summary><ul><li><b>${m.c}</b><ul>${m.b.map(b => `<li>${b.r ? `<i>${b.r}</i> → ` : ''}<b>${b.n}</b>: ${b.k.join(' · ')}</li>`).join('')}</ul></li>${(m.x || []).length ? `<li>Cross-links: ${m.x.map(([a, b, t]) => `${m.b[a].n} ↔ ${m.b[b].n} (${t})`).join('; ')}</li>` : ''}</ul></details>`;
  }

  /* ---------- chapter page ---------- */
  function renderChapter(ch, tab, target) {
    const learn = `<div class="toolbar"><div class="chips" role="group" aria-label="Filter by priority">${[['all', 'All'], ['must', 'Must Know'], ['imp', 'Important'], ['add', 'Additional Detail']].map(([v, l], i) => `<button class="chip" type="button" data-act="filter" data-v="${v}" aria-pressed="${i === 0}">${l}</button>`).join('')}</div><div class="row"><button class="btn small" type="button" data-act="expand">Expand all</button><button class="btn small" type="button" data-act="collapse">Collapse all</button></div></div>
      ${bi(`<p class="lede" style="margin:0 0 16px">${ch.intro[0]}</p>`, ch.intro[1])}
      ${ch.sections.map(s => `<section class="sec${st.open[s.id] === false ? ' closed' : ''}" id="${s.id}" data-pri="${s.pri}"><div class="sec-h"><h3 class="sec-title"><button class="sec-toggle" type="button" data-act="sec" aria-expanded="${st.open[s.id] !== false}"><span class="chev"></span><span>${s.h}</span></button></h3>${pri(s.pri)}<label class="done"><input type="checkbox" data-st="s" data-id="${s.id}" ${st.s[s.id] ? 'checked' : ''}> Studied</label></div><div class="sec-body">${s.blocks.map((b, j) => block(b, s.id, j)).join('')}</div></section>`).join('')}`;

    const maps = `${bi(`<p class="lede" style="margin:0 0 14px">Each map puts the main idea in the centre. Italic labels on the coloured lines say how a branch connects to the centre; dashed arrows link related ideas across branches. Click a branch to focus on it, and click the centre to reset.</p>`, `تضع كل خريطة الفكرة الرئيسية في المركز. توضّح العناوين المائلة على الخطوط الملونة علاقة الفرع بالمركز، وتربط الأسهم المتقطعة بين الأفكار المرتبطة في الفروع المختلفة. انقر على فرع للتركيز عليه، وانقر على المركز للعودة.`)}
      ${ch.maps.map((m, i) => `<div class="mapcard" id="${ch.id}-m${i}"><div class="row" style="justify-content:space-between"><h3>${m.title}</h3><div class="row"><button class="btn small" type="button" data-act="mmreset">Reset focus</button><button class="btn small" type="button" data-act="maptoggle" aria-expanded="true">Hide map</button></div></div><div class="map-body"><div class="map-wrap">${mindmap(m, ch.id + 'm' + i)}</div><p class="map-note">On a small screen, scroll the map sideways.</p>${mapOutline(m)}</div></div>`).join('')}`;

    const essays = `<div class="disclaimer">${bi(`These are practice questions written from your lecture slides. They are not a prediction of what will be on the exam. Try each one in the box first, then reveal the model answer.`, `هذه أسئلة تدريبية مكتوبة من شرائح المحاضرة، وليست توقعًا لما سيأتي في الامتحان. حاول الإجابة في المربع أولًا ثم اعرض الإجابة النموذجية.`)}</div>
      <div class="toolbar"><span class="muted" style="font-size:14px">${ch.essays.length} questions · answers hidden by default</span><div class="row"><button class="btn small" type="button" data-act="showall">Show all answers</button><button class="btn small" type="button" data-act="hideall">Hide all answers</button></div></div>
      ${ch.essays.map((e, i) => { const id = `${ch.id}-e${i}`; return `<article class="essay" id="${id}"><div class="essay-meta"><span class="qtype">${e.type}</span><span class="marks">${e.marks} marks</span><label class="done"><input type="checkbox" data-st="e" data-id="${id}" ${st.e[id] ? 'checked' : ''}> Practised</label></div>
        ${bi(`<h4 class="q">Q${i + 1}. ${e.q}</h4>`, e.qa)}
        <label class="muted" for="${id}-draft" style="font-size:13px">Your attempt (saved in this browser)</label><textarea id="${id}-draft" data-draft="${id}" placeholder="Write your answer here before checking the model answer…">${esc(st.d[id] || '')}</textarea>
        <div><button class="btn primary small" type="button" data-act="reveal" aria-expanded="false" aria-controls="${id}-ans">Show model answer</button></div>
        <div class="answer" id="${id}-ans" hidden><h5>Model answer</h5><div class="ans-x">${bi(e.ans, e.ansAr)}</div><h5>Key points for full marks</h5><ul class="blist">${e.pts.map(p => `<li>${bi(p[0], p[1])}</li>`).join('')}</ul>${e.alloc ? `<div class="alloc"><b>Suggested mark allocation (${e.marks} marks):</b> ${e.alloc}</div>` : ''}</div></article>`; }).join('')}`;

    const defs = []; ch.sections.forEach(s => s.blocks.forEach((b, j) => { if (b.t === 'def') defs.push([s, b, j]); }));
    const rev = `<h3 class="rev-h">Key concepts to memorize <small lang="ar">مفاهيم يجب حفظها</small></h3><div class="keydefs">${defs.map(([s, b]) => `<div class="def"><div class="def-term">${b.term} ${pri(b.pri)}</div>${bi(b.en, b.ar)}</div>`).join('')}</div>
      <h3 class="rev-h">Quick revision sheet <small lang="ar">ورقة مراجعة سريعة</small></h3><div class="sheet"><ol>${ch.revision.map(r => `<li>${bi(r[0], r[1])}</li>`).join('')}</ol></div>
      <h3 class="rev-h">Important comparisons <small lang="ar">مقارنات مهمة</small></h3>${ch.compare.map(t => `<h4 style="font-size:16px;margin:12px 0 6px">${t.title}</h4><div class="tbl" style="background:var(--surface)"><table class="t"><thead><tr>${t.head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${t.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`).join('')}
      <h3 class="rev-h">Flashcards <small lang="ar">بطاقات المراجعة</small></h3><div class="toolbar"><div class="chips" role="group" aria-label="Filter flashcards">${[['all', 'All cards'], ['a', 'Review again'], ['n', 'Not marked yet']].map(([v, l], i) => `<button class="chip" type="button" data-act="fcfilter" data-v="${v}" aria-pressed="${i === 0}">${l}</button>`).join('')}</div><span class="muted" style="font-size:13px">Tap a card to flip it.</span></div>
      <div class="cards">${ch.flashcards.map((f, i) => { const id = `${ch.id}-f${i}`, v = st.c[id]; return `<div class="fc" id="${id}" data-mark="${v || 'n'}"><div class="fc-card" role="button" tabindex="0" data-act="flip" aria-label="Flashcard: ${esc(strip(f[0]))}. Tap to flip."><span class="side-l">Question</span><span class="front">${bi(f[0], f[2])}</span><span class="back">${bi(f[1], f[3])}</span></div><div class="fc-act"><button type="button" data-act="fcmark" data-v="k" class="${v === 'k' ? 'on-k' : ''}">Know it</button><button type="button" data-act="fcmark" data-v="a" class="${v === 'a' ? 'on-a' : ''}">Review again</button></div></div>`; }).join('')}</div>
      <h3 class="rev-h">Common mistakes and easily confused ideas <small lang="ar">أخطاء شائعة ومفاهيم متشابهة</small></h3><div class="mistakes">${ch.mistakes.map(m => `<div class="mistake">${bi(m[0], m[1])}</div>`).join('')}</div>
      <h3 class="rev-h">Chapter checklist <small lang="ar">قائمة التحقق</small></h3><div class="checklist">${ch.checklist.map((c, i) => { const id = `${ch.id}-k${i}`; return `<label><input type="checkbox" data-st="k" data-id="${id}" ${st.k[id] ? 'checked' : ''}>${bi(c[0], c[1])}</label>`; }).join('')}</div>`;

    const qs = ch.quiz.map((q, i) => { const id = `${ch.id}-q${i}`, ch2 = st.q[id]; const answered = ch2 != null; return `<div class="mcq" id="${id}" data-ans="${q.ans}">${bi(`<div class="qq">${i + 1}. ${q.q}</div>`, q.qa)}<div class="opts">${q.opts.map((o, j) => `<button class="opt${answered && j === q.ans ? ' right' : ''}${answered && j === ch2 && j !== q.ans ? ' wrong' : ''}" type="button" data-act="opt" data-j="${j}" ${answered ? 'disabled' : ''}>${String.fromCharCode(65 + j)}. ${o}</button>`).join('')}</div><div class="why" ${answered ? '' : 'hidden'}>${bi(`<b>${answered && ch2 === q.ans ? 'Correct.' : 'Answer: ' + String.fromCharCode(65 + q.ans) + '.'}</b> ${q.why}`, q.whyAr)}</div></div>`; }).join('');
    const test = `<h3 class="rev-h">Short-answer practice <small lang="ar">أسئلة قصيرة</small></h3><p class="muted" style="margin:0 0 10px;font-size:14px">Answer out loud or on paper, then reveal.</p>${ch.short.map((s, i) => `<div class="sa" id="${ch.id}-s${i}">${bi(`<div class="qq">${i + 1}. ${s[0]}</div>`, s[2])}<div><button class="btn small" type="button" data-act="sareveal" aria-expanded="false">Show answer</button></div><div class="aa" hidden>${bi(s[1], s[3])}</div></div>`).join('')}
      <h3 class="rev-h">Multiple-choice self-test <small lang="ar">اختبار اختيار من متعدد</small></h3><div class="toolbar"><span class="score" id="score"></span><button class="btn small" type="button" data-act="quizreset">Reset quiz</button></div>${qs}`;

    const panels = { learn, map: maps, essay: essays, rev, test };
    main.innerHTML = `<div class="wrap"><header class="ch-head"><div class="eyebrow">${ch.week}</div><h1>${ch.title}</h1><div class="tar" lang="ar">${ch.titleAr}</div><div class="src">Source: ${ch.file} · ${ch.slides} slides</div></header>
      <div class="tabs" role="tablist">${TABS.map(([k, en, ar]) => `<button role="tab" type="button" id="tab-${k}" aria-controls="p-${k}" aria-selected="${k === tab}" data-act="tab" data-tab="${k}">${en}<small lang="ar">${ar}</small></button>`).join('')}</div>
      ${TABS.map(([k]) => `<div role="tabpanel" id="p-${k}" aria-labelledby="tab-${k}" ${k === tab ? '' : 'hidden'}>${panels[k]}</div>`).join('')}
      <nav class="row" style="justify-content:space-between;margin-top:30px">${ch.num > 1 ? `<a class="btn" href="#${CH[ch.num - 2].id}">← ${CH[ch.num - 2].title}</a>` : '<span></span>'}${ch.num < CH.length ? `<a class="btn" href="#${CH[ch.num].id}">${CH[ch.num].title} →</a>` : ''}</nav></div>`;
    updateScore(ch);
  }

  function updateScore(ch) {
    const el = $('#score'); if (!el) return;
    const n = ch.quiz.length, a = ch.quiz.filter((q, i) => st.q[`${ch.id}-q${i}`] != null).length, c = ch.quiz.filter((q, i) => st.q[`${ch.id}-q${i}`] === q.ans).length;
    el.textContent = `${c} correct · ${a}/${n} answered`;
  }

  /* ---------- routing ---------- */
  let route = {};
  function parse() {
    const h = (location.hash || '#home').slice(1);
    if (h === 'formulas') return { page: 'formulas' };
    const m = h.match(/^(ch\d+)(?:-(learn|map|essay|rev|test))?$/);
    if (m) { const ch = CH.find(c => c.id === m[1]); if (ch) return { page: 'ch', ch, tab: m[2] || 'learn' }; }
    return { page: 'home' };
  }
  function go(target) {
    const r = parse();
    const sameCh = route.page === 'ch' && r.page === 'ch' && route.ch === r.ch;
    route = r;
    if (r.page === 'home') renderHome(); else if (r.page === 'formulas') renderFormulas();
    else if (sameCh && $('#p-' + r.tab)) switchTab(r.tab); else renderChapter(r.ch, r.tab);
    renderSide(r); closeMenu();
    if (target) { requestAnimationFrame(() => focusTarget(target)); }
    else if (!sameCh) window.scrollTo(0, 0);
    document.title = r.page === 'ch' ? `${r.ch.title} · ARTI 404 Study Atlas` : 'ARTI 404 Study Atlas';
  }
  function switchTab(k) {
    $$('.tabs [role=tab]').forEach(b => b.setAttribute('aria-selected', b.dataset.tab === k));
    $$('[role=tabpanel]').forEach(p => p.hidden = p.id !== 'p-' + k);
    route.tab = k;
  }
  function focusTarget(id) {
    const el = document.getElementById(id); if (!el) return;
    const sec = el.closest('.sec'); if (sec && sec.classList.contains('closed')) toggleSec(sec, true);
    main.classList.remove('f-must', 'f-imp', 'f-add'); $$('[data-act=filter]').forEach(b => b.setAttribute('aria-pressed', b.dataset.v === 'all'));
    el.scrollIntoView({ block: 'start' });
    setTimeout(() => el.scrollIntoView({ block: 'start' }), 250);
    el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
  }
  function navTo(chId, tab, target) {
    const h = '#' + chId + (tab && tab !== 'learn' ? '-' + tab : '');
    if (location.hash === h) { go(target); } else { pendingTarget = target; location.hash = h; }
  }
  let pendingTarget = null;
  window.addEventListener('hashchange', () => { const t = pendingTarget; pendingTarget = null; go(t); });

  /* ---------- arabic toggle ---------- */
  const arBtn = $('#arBtn');
  function applyAr() {
    document.body.classList.toggle('en-only', !st.ar);
    arBtn.setAttribute('aria-pressed', String(st.ar));
    arBtn.innerHTML = st.ar ? `<span>Hide Arabic Translation</span><span class="t-ar" lang="ar">إخفاء الترجمة العربية</span>` : `<span>Show Arabic Translation</span><span class="t-ar" lang="ar">إظهار الترجمة العربية</span>`;
    $$('.bi.peeked').forEach(b => b.classList.remove('peeked'));
  }
  arBtn.addEventListener('click', () => { st.ar = !st.ar; save(); applyAr(); });

  /* ---------- menu ---------- */
  const scrim = $('#scrim'), menuBtn = $('#menuBtn');
  function closeMenu() { side.classList.remove('open'); scrim.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', () => { const o = !side.classList.contains('open'); side.classList.toggle('open', o); scrim.hidden = !o; menuBtn.setAttribute('aria-expanded', String(o)); });
  scrim.addEventListener('click', closeMenu);

  /* ---------- section collapse ---------- */
  function toggleSec(sec, open) {
    sec.classList.toggle('closed', !open);
    $('.sec-toggle', sec).setAttribute('aria-expanded', String(open));
    st.open[sec.id] = open; save();
  }

  /* ---------- delegated clicks ---------- */
  document.addEventListener('click', ev => {
    const g = ev.target.closest('[data-goto]');
    if (g) { ev.preventDefault(); const [c, t, id] = g.dataset.goto.split('|'); clearSearch(); navTo(c, t, id); return; }
    const el = ev.target.closest('[data-act]'); if (!el) return;
    const act = el.dataset.act, ch = route.ch;
    if (act === 'peek') { el.parentElement.classList.toggle('peeked'); }
    else if (act === 'tab') { const k = el.dataset.tab; history.replaceState(null, '', '#' + ch.id + (k === 'learn' ? '' : '-' + k)); switchTab(k); }
    else if (act === 'sec') { const sec = el.closest('.sec'); toggleSec(sec, sec.classList.contains('closed')); }
    else if (act === 'expand' || act === 'collapse') { $$('#p-learn .sec').forEach(s => toggleSec(s, act === 'expand')); }
    else if (act === 'filter') { $$('[data-act=filter]').forEach(b => b.setAttribute('aria-pressed', b === el)); main.classList.remove('f-must', 'f-imp', 'f-add'); if (el.dataset.v !== 'all') main.classList.add('f-' + el.dataset.v); }
    else if (act === 'reveal') { const a = document.getElementById(el.getAttribute('aria-controls')); const open = a.hidden; a.hidden = !open; el.setAttribute('aria-expanded', String(open)); el.textContent = open ? 'Hide model answer' : 'Show model answer'; }
    else if (act === 'showall' || act === 'hideall') { const show = act === 'showall'; $$('#p-essay [data-act=reveal]').forEach(b => { document.getElementById(b.getAttribute('aria-controls')).hidden = !show; b.setAttribute('aria-expanded', String(show)); b.textContent = show ? 'Hide model answer' : 'Show model answer'; }); }
    else if (act === 'flip') { el.classList.toggle('flipped'); $('.side-l', el).textContent = el.classList.contains('flipped') ? 'Answer' : 'Question'; }
    else if (act === 'fcmark') { const fc = el.closest('.fc'), v = el.dataset.v; const cur = st.c[fc.id]; if (cur === v) delete st.c[fc.id]; else st.c[fc.id] = v; save(); fc.dataset.mark = st.c[fc.id] || 'n'; $$('.fc-act button', fc).forEach(b => b.className = st.c[fc.id] === b.dataset.v ? 'on-' + b.dataset.v : ''); renderSide(route); }
    else if (act === 'fcfilter') { $$('[data-act=fcfilter]').forEach(b => b.setAttribute('aria-pressed', b === el)); const v = el.dataset.v; $$('.fc').forEach(f => f.hidden = v !== 'all' && f.dataset.mark !== v); }
    else if (act === 'sareveal') { const a = $('.aa', el.closest('.sa')); a.hidden = !a.hidden; el.setAttribute('aria-expanded', String(!a.hidden)); el.textContent = a.hidden ? 'Show answer' : 'Hide answer'; }
    else if (act === 'opt') { const box = el.closest('.mcq'), ans = +box.dataset.ans, j = +el.dataset.j; st.q[box.id] = j; save(); $$('.opt', box).forEach((b, k) => { b.disabled = true; if (k === ans) b.classList.add('right'); if (k === j && j !== ans) b.classList.add('wrong'); }); const why = $('.why', box); why.hidden = false; $('b', why).textContent = j === ans ? 'Correct.' : 'Answer: ' + String.fromCharCode(65 + ans) + '.'; updateScore(ch); }
    else if (act === 'quizreset') { ch.quiz.forEach((q, i) => delete st.q[`${ch.id}-q${i}`]); save(); $$('.mcq').forEach(box => { $$('.opt', box).forEach(b => { b.disabled = false; b.classList.remove('right', 'wrong'); }); $('.why', box).hidden = true; }); updateScore(ch); }
    else if (act === 'maptoggle') { const card = el.closest('.mapcard'), body = $('.map-body', card); body.hidden = !body.hidden; el.textContent = body.hidden ? 'Show map' : 'Hide map'; el.setAttribute('aria-expanded', String(!body.hidden)); }
    else if (act === 'mmfocus') { const svg = el.closest('svg'), i = el.dataset.b; const same = svg.dataset.focus === i; svg.dataset.focus = same ? '' : i; $$('[data-b]', svg).forEach(n => n.classList.toggle('dim', !same && !n.dataset.b.split(' ').includes(i))); }
    else if (act === 'mmreset') { const svg = el.closest('svg') || $('svg', el.closest('.mapcard')); if (svg) { svg.dataset.focus = ''; $$('.dim', svg).forEach(n => n.classList.remove('dim')); } }
    else if (act === 'reset1') { $('#resetBox').innerHTML = `<span style="font-size:14px">This clears everything saved in this browser. Continue?</span><button class="btn small primary" type="button" data-act="reset2">Yes, reset</button><button class="btn small" type="button" data-act="reset0">Cancel</button>`; }
    else if (act === 'reset0') { renderHome(); }
    else if (act === 'reset2') { const ar = st.ar; st = { s: {}, e: {}, c: {}, k: {}, q: {}, d: {}, ar, open: {} }; save(); renderHome(); renderSide(route); }
  });
  document.addEventListener('keydown', ev => { if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.matches && ev.target.matches('g[data-act], [role=button][data-act]')) { ev.preventDefault(); ev.target.dispatchEvent(new MouseEvent('click', { bubbles: true })); } });
  document.addEventListener('change', ev => {
    const t = ev.target; if (t.dataset && t.dataset.st) { const bucket = st[t.dataset.st]; if (t.checked) bucket[t.dataset.id] = 1; else delete bucket[t.dataset.id]; save(); renderSide(route); }
  });
  let draftTimer; document.addEventListener('input', ev => { const t = ev.target; if (t.dataset && t.dataset.draft) { clearTimeout(draftTimer); draftTimer = setTimeout(() => { if (t.value.trim()) st.d[t.dataset.draft] = t.value; else delete st.d[t.dataset.draft]; save(); }, 400); } });

  /* ---------- search ---------- */
  const IDX = [];
  CH.forEach(c => {
    c.sections.forEach(s => {
      IDX.push({ c, tab: 'learn', id: s.id, title: s.h, kind: 'Section', text: strip(s.h + ' ' + s.blocks.map(b => [b.term, b.en, b.f, b.head, b.rows, b.steps].flat(3).join(' ')).join(' ')), ar: strip(s.blocks.map(b => [b.ar].flat().join(' ')).join(' ')) });
      s.blocks.forEach((b, j) => { if (b.t === 'def') IDX.push({ c, tab: 'learn', id: `${s.id}-d${j}`, title: strip(b.term), kind: 'Definition', text: strip(b.term + ' ' + b.en), ar: strip(b.ar), boost: 3 }); });
    });
    c.essays.forEach((e, i) => IDX.push({ c, tab: 'essay', id: `${c.id}-e${i}`, title: strip(e.q), kind: 'Essay question', text: strip(e.q + ' ' + e.ans), ar: strip(e.qa) }));
    c.flashcards.forEach((f, i) => IDX.push({ c, tab: 'rev', id: `${c.id}-f${i}`, title: strip(f[0]), kind: 'Flashcard', text: strip(f[0] + ' ' + f[1]), ar: strip(f[2] + ' ' + f[3]), boost: 1 }));
    c.maps.forEach((m, i) => IDX.push({ c, tab: 'map', id: `${c.id}-m${i}`, title: m.title, kind: 'Mind map', text: strip(m.title + ' ' + m.c + ' ' + m.b.map(b => b.n + ' ' + b.k.join(' ')).join(' ')), ar: '' }));
  });
  const q = $('#q'), res = $('#results');
  let hits = [], sel = -1;
  function clearSearch() { res.hidden = true; q.value = ''; hits = []; }
  function snippet(text, words) {
    const low = text.toLowerCase(); let at = low.indexOf(words[0]); if (at < 0) at = 0;
    let s = text.slice(Math.max(0, at - 50), at + 110); if (at > 50) s = '…' + s; if (at + 110 < text.length) s += '…';
    let h = esc(s); words.forEach(w => { if (w.length > 1) h = h.replace(new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>'); }); return h;
  }
  function search() {
    const v = q.value.trim().toLowerCase(); if (!v) { res.hidden = true; return; }
    const words = v.split(/\s+/);
    hits = IDX.map(e => { const hay = (e.text + ' ' + e.ar).toLowerCase(); if (!words.every(w => hay.includes(w))) return null; let sc = (e.boost || 0); if (e.title.toLowerCase().includes(v)) sc += 10; words.forEach(w => { if (e.title.toLowerCase().includes(w)) sc += 2; }); return [sc, e]; }).filter(Boolean).sort((a, b) => b[0] - a[0]).slice(0, 14).map(x => x[1]);
    sel = -1;
    res.innerHTML = hits.length ? hits.map((e, i) => { const inAr = !(e.text.toLowerCase().includes(words[0])); return `<button type="button" data-i="${i}"><span class="r-where">${e.c.week} · ${e.kind}</span><span class="r-title">${esc(e.title.length > 90 ? e.title.slice(0, 90) + '…' : e.title)}</span><span class="r-snip"${inAr ? ' dir="rtl" lang="ar"' : ''}>${snippet(inAr ? e.ar : e.text, words)}</span></button>`; }).join('') : `<div class="r-empty">No matches for “${esc(q.value)}”. Try a shorter word, such as “BPE”, “perplexity” or “softmax”.</div>`;
    res.hidden = false;
  }
  q.addEventListener('input', search);
  q.addEventListener('focus', () => { if (q.value.trim()) search(); });
  q.addEventListener('keydown', ev => {
    const btns = $$('button', res);
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') { ev.preventDefault(); if (!btns.length) return; sel = (sel + (ev.key === 'ArrowDown' ? 1 : -1) + btns.length) % btns.length; btns.forEach((b, i) => b.classList.toggle('on', i === sel)); btns[sel].scrollIntoView({ block: 'nearest' }); }
    else if (ev.key === 'Enter') { const i = sel >= 0 ? sel : 0; if (hits[i]) pick(hits[i]); }
    else if (ev.key === 'Escape') { res.hidden = true; q.blur(); }
  });
  res.addEventListener('click', ev => { const b = ev.target.closest('button[data-i]'); if (b) pick(hits[+b.dataset.i]); });
  document.addEventListener('click', ev => { if (!ev.target.closest('.search')) res.hidden = true; });
  function pick(e) { clearSearch(); q.blur(); navTo(e.c.id, e.tab, e.id); }

  applyAr();
  go(null);
})();
