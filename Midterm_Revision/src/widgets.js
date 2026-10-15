/* ================= interactive learning widgets =================
   Each widget is mounted into <div class="widget" data-w="name" data-cfg='{"...":...}'>.
   Widgets compute their results live, so the numbers always follow the lecture's formulas.
*/
const WIDGETS = (function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const f = (x, d = 4) => (Number.isFinite(x) ? (Math.abs(x) >= 1e-3 || x === 0 ? (+x.toFixed(d)).toString() : x.toExponential(2)) : '—');
  const q = (el, s) => el.querySelector(s);
  const qa = (el, s) => Array.from(el.querySelectorAll(s));
  const bar = (v, max = 1, cls = '') => `<span class="w-bar ${cls}"><i style="width:${Math.max(0, Math.min(100, 100 * v / (max || 1)))}%"></i></span>`;
  const W = {};

  /* ---------- Lecture 1: sort applications by difficulty (slide 21) ---------- */
  W.sorter = (el, cfg) => {
    const cats = cfg.cats, items = cfg.items; const pick = {};
    el.innerHTML = `<div class="w-rows">${items.map((it, i) => `<div class="w-sort-row" data-i="${i}"><span class="w-sort-name">${esc(it[0])}</span><span class="w-seg">${cats.map((c, j) => `<button type="button" data-j="${j}">${esc(c)}</button>`).join('')}</span><span class="w-mark"></span></div>`).join('')}</div>
      <div class="w-controls"><button type="button" class="btn small primary" data-x="check">Check my sorting</button><button type="button" class="btn small" data-x="reset">Reset</button><span class="w-msg" aria-live="polite"></span></div>`;
    el.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.j != null) { const row = b.closest('.w-sort-row'); pick[row.dataset.i] = +b.dataset.j; qa(row, '.w-seg button').forEach(x => x.setAttribute('aria-pressed', x === b)); row.classList.remove('ok', 'bad'); q(row, '.w-mark').textContent = ''; }
      if (b.dataset.x === 'reset') { for (const k in pick) delete pick[k]; qa(el, '.w-seg button').forEach(x => x.setAttribute('aria-pressed', 'false')); qa(el, '.w-sort-row').forEach(r => { r.classList.remove('ok', 'bad'); q(r, '.w-mark').textContent = ''; }); q(el, '.w-msg').textContent = ''; }
      if (b.dataset.x === 'check') {
        let ok = 0, done = 0;
        qa(el, '.w-sort-row').forEach(r => { const i = r.dataset.i, p = pick[i]; if (p == null) return; done++; const good = p === items[i][1]; ok += good; r.classList.toggle('ok', good); r.classList.toggle('bad', !good); q(r, '.w-mark').textContent = good ? '✓' : '→ ' + cats[items[i][1]]; });
        q(el, '.w-msg').textContent = done < items.length ? `Sorted ${done}/${items.length}. ${ok} correct so far.` : `${ok}/${items.length} correct.${ok === items.length ? ' Perfect.' : ''}`;
      }
    });
  };

  /* ---------- Lecture 2: count instances and types (slides 8–9) ---------- */
  W.counter = (el, cfg) => {
    el.innerHTML = `<label class="w-lab">Sentence<textarea rows="2" data-k="t">${esc(cfg.text)}</textarea></label>
      <div class="w-controls"><label><input type="checkbox" data-k="mw"> Treat "San Francisco" / "New York" as one token</label><label><input type="checkbox" data-k="lc"> Lowercase</label><label><input type="checkbox" data-k="lem"> Lemmatise plural "stars" → "star"</label></div><div class="w-out"></div>`;
    const run = () => {
      let t = q(el, '[data-k=t]').value.trim(); if (q(el, '[data-k=lc]').checked) t = t.toLowerCase();
      if (q(el, '[data-k=mw]').checked) t = t.replace(/San Francisco/gi, m => m.replace(' ', '_')).replace(/New York/gi, m => m.replace(' ', '_'));
      let toks = t.split(/\s+/).filter(Boolean); if (q(el, '[data-k=lem]').checked) toks = toks.map(w => w === 'stars' ? 'star' : w);
      const cnt = {}; toks.forEach(w => cnt[w] = (cnt[w] || 0) + 1); const rep = Object.entries(cnt).filter(([, n]) => n > 1);
      q(el, '.w-out').innerHTML = `<div class="w-chips">${toks.map(w => `<span class="w-chip ${cnt[w] > 1 ? 'rep' : ''}">${esc(w.replace('_', ' '))}</span>`).join('')}</div>
        <div class="w-stats"><div><b>${toks.length}</b><span>N (instances)</span></div><div><b>${Object.keys(cnt).length}</b><span>|V| (types)</span></div></div>
        <p class="w-note">${rep.length ? 'Repeated types (highlighted): ' + rep.map(([w, n]) => `<b>${esc(w.replace('_', ' '))}</b> ×${n}`).join(', ') + `. Each repeat adds to N but not to |V|.` : 'No repeated types.'}</p>`;
    };
    el.addEventListener('input', run); run();
  };

  /* ---------- Lecture 2: Heaps' law (slides 10–11) ---------- */
  W.heaps = el => {
    el.innerHTML = `<div class="w-controls"><label>Corpus size N: <b data-o="n"></b><input type="range" min="3" max="12" step="0.1" value="6" data-k="n"></label><label>β = <b data-o="b"></b><input type="range" min="0.3" max="0.8" step="0.01" value="0.5" data-k="b"></label><label>k = <b data-o="k"></b><input type="range" min="5" max="100" step="1" value="30" data-k="k"></label></div><div class="w-out"></div>`;
    const run = () => {
      const N = Math.pow(10, +q(el, '[data-k=n]').value), b = +q(el, '[data-k=b]').value, k = +q(el, '[data-k=k]').value, V = k * Math.pow(N, b);
      q(el, '[data-o=n]').textContent = Math.round(N).toLocaleString(); q(el, '[data-o=b]').textContent = b.toFixed(2); q(el, '[data-o=k]').textContent = k;
      q(el, '.w-out').innerHTML = `<div class="w-stats"><div><b>${Math.round(V).toLocaleString()}</b><span>|V| = k·N^β word types</span></div><div><b>${(100 * V / N).toPrecision(2)}%</b><span>types per instance</span></div></div>
        <p class="w-note">Multiply the text by 100 → the vocabulary grows by 100^${b.toFixed(2)} = <b>×${f(Math.pow(100, b), 2)}</b>. Vocabulary never stops growing, but it grows much more slowly than the text.</p>`;
    };
    el.addEventListener('input', run); run();
  };

  /* ---------- Lecture 2: regex tester with precision / recall (slides 12–17) ---------- */
  W.regex = (el, cfg) => {
    el.innerHTML = `<div class="w-controls"><label class="grow">Pattern <input type="text" data-k="p" value="${esc(cfg.p)}" spellcheck="false" autocapitalize="off"></label></div>
      <div class="w-controls">${cfg.presets.map(p => `<button type="button" class="btn small" data-preset="${esc(p)}"><code>${esc(p)}</code></button>`).join('')}</div>
      <label class="w-lab">Text<textarea rows="2" data-k="t">${esc(cfg.text)}</textarea></label><div class="w-out"></div>`;
    const run = () => {
      const p = q(el, '[data-k=p]').value, t = q(el, '[data-k=t]').value, out = q(el, '.w-out'); let re;
      try { re = new RegExp(p, 'g'); } catch (e) { out.innerHTML = `<p class="w-note bad">That pattern is not valid regex: ${esc(e.message)}</p>`; return; }
      const ms = []; if (p) { let m; while ((m = re.exec(t)) && ms.length < 200) { ms.push([m.index, m.index + m[0].length]); if (m[0].length === 0) re.lastIndex++; } }
      const truth = []; const tr = /\b[tT]he\b/g; let m2; while ((m2 = tr.exec(t))) truth.push([m2.index, m2.index + 3]);
      const covers = (a, b) => a[0] <= b[0] && a[1] >= b[1];
      const tp = ms.filter(x => truth.some(y => covers(x, y))).length, fp = ms.length - tp, fn = truth.filter(y => !ms.some(x => covers(x, y))).length;
      let html = '', i = 0; ms.forEach(([a, b]) => { html += esc(t.slice(i, a)) + `<mark class="${truth.some(y => covers([a, b], y)) ? 'tp' : 'fp'}">${esc(t.slice(a, b))}</mark>`; i = b; }); html += esc(t.slice(i));
      out.innerHTML = `<div class="w-text">${html}</div><div class="w-stats"><div><b>${ms.length}</b><span>matches</span></div><div><b class="good">${tp}</b><span>correct "the"</span></div><div><b class="bad">${fp}</b><span>false positives</span></div><div><b class="bad">${fn}</b><span>false negatives (missed)</span></div><div><b>${ms.length ? f(tp / ms.length, 2) : '—'}</b><span>precision</span></div><div><b>${truth.length ? f(tp / truth.length, 2) : '—'}</b><span>recall</span></div></div>
        <p class="w-note">Goal: find every whole word "the"/"The" (${truth.length} in the text). Green = correct match, red = matched something that is not the word "the".</p>`;
    };
    el.addEventListener('input', run);
    el.addEventListener('click', e => { const b = e.target.closest('[data-preset]'); if (b) { q(el, '[data-k=p]').value = b.dataset.preset; run(); } });
    run();
  };

  /* ---------- Lecture 2: normalization – what gets lost (slides 18–23) ---------- */
  W.normalize = (el, cfg) => {
    const STOP = ['the', 'a', 'an', 'of', 'and', 'to', 'it', "it's", 'is', 'not', 'no', 'this', 'that', 'in', 'on', 'said'];
    el.innerHTML = `<label class="w-lab">Raw text<textarea rows="2" data-k="t">${esc(cfg.text)}</textarea></label>
      <div class="w-controls"><label><input type="checkbox" data-k="url"> Replace URLs with &lt;URL&gt;</label><label><input type="checkbox" data-k="rep"> Shorten repeated letters</label><label><input type="checkbox" data-k="lc"> Case folding (lowercase)</label><label><input type="checkbox" data-k="punct"> Remove all non-letters</label><label><input type="checkbox" data-k="stop"> Remove stop words</label></div><div class="w-out"></div>`;
    const run = () => {
      const raw = q(el, '[data-k=t]').value; let t = raw; const lost = [], kept = [];
      const on = k => q(el, `[data-k=${k}]`).checked;
      if (on('url')) { if (/https?:\/\/\S+/.test(t)) kept.push('The link is now a placeholder: the fact that a link was present is kept, the address is dropped.'); t = t.replace(/https?:\/\/\S+/g, '<URL>'); }
      if (on('rep')) { if (/(\w)\1{2,}/.test(t)) kept.push('"sooooo" → "soo": still marks emphasis (reducing to "so" would remove it).'); t = t.replace(/(\w)\1{2,}/g, '$1$1'); }
      if (on('lc')) { if (/\bUS\b/.test(t)) lost.push('"US" (the country) became "us" (the pronoun).'); else if (/[A-Z]/.test(t)) lost.push('Capital letters that may mark names are gone.'); t = t.toLowerCase(); }
      if (on('punct')) { if (/[:;][()]/.test(raw)) lost.push('The emoticon ":(" was the only sign of sarcasm, and it is gone.'); if (/!/.test(raw)) lost.push('"!!!" emphasis is gone.'); t = t.replace(/<URL>/g, 'URLTOKEN').replace(/[^A-Za-z\s']/g, ' ').replace(/URLTOKEN/g, '<URL>').replace(/\s+/g, ' ').trim(); }
      if (on('stop')) { if (/\bnot\b/i.test(t)) lost.push('"not good" became "good": stop-word removal flipped the meaning.'); t = t.split(/\s+/).filter(w => !STOP.includes(w.toLowerCase().replace(/[^a-z']/g, ''))).join(' '); }
      q(el, '.w-out').innerHTML = `<div class="w-text">${esc(t) || '<span class="muted">(empty)</span>'}</div>${kept.map(x => `<p class="w-note good">Kept: ${esc(x)}</p>`).join('')}${lost.map(x => `<p class="w-note bad">Lost: ${esc(x)}</p>`).join('')}${!lost.length && !kept.length ? '<p class="w-note">Turn on a step to see what it changes.</p>' : ''}`;
    };
    el.addEventListener('input', run); run();
  };

  /* ---------- Lecture 2: BPE learner + segmenter (slides 33–42) ---------- */
  W.bpe = (el, cfg) => {
    el.innerHTML = `<div class="w-controls"><label class="grow">Training corpus <input type="text" data-k="c" value="${esc(cfg.corpus)}"></label></div>
      <div class="w-controls"><button type="button" class="btn small primary" data-x="next">Next merge</button><button type="button" class="btn small" data-x="all">Run ${cfg.k} merges</button><button type="button" class="btn small" data-x="reset">Reset</button><span class="w-msg" aria-live="polite"></span></div>
      <div class="w-out"></div>
      <div class="w-controls"><label>Segment a new word <input type="text" data-k="w" value="${esc(cfg.word)}" size="12"></label><button type="button" class="btn small" data-x="seg">Apply learned merges</button></div><div class="w-seg-out"></div>`;
    let words, merges, V0;
    const init = () => {
      const toks = q(el, '[data-k=c]').value.trim().split(/\s+/).filter(Boolean); const freq = new Map();
      toks.forEach(w => freq.set(w, (freq.get(w) || 0) + 1));
      words = [...freq.entries()].map(([w, n], i) => ({ n, i, sym: ['▁', ...w] })).sort((a, b) => b.n - a.n || a.i - b.i);
      merges = []; V0 = new Set(words.flatMap(w => w.sym)).size; render(null);
    };
    const pairCounts = () => { const m = new Map(); words.forEach(w => { for (let i = 0; i < w.sym.length - 1; i++) { const k = w.sym[i] + '\u0001' + w.sym[i + 1]; m.set(k, (m.get(k) || 0) + w.n); } }); return m; };
    const step = () => {
      const pc = pairCounts(); if (!pc.size) return null; let best = null, bv = 0; for (const [k, v] of pc) if (v > bv) { best = k; bv = v; }
      const [a, b] = best.split('\u0001'); words.forEach(w => { const s = []; for (let i = 0; i < w.sym.length; i++) { if (i < w.sym.length - 1 && w.sym[i] === a && w.sym[i + 1] === b) { s.push(a + b); i++; } else s.push(w.sym[i]); } w.sym = s; });
      merges.push([a, b, bv]); return { pc, best, bv };
    };
    const render = info => {
      const pc = info ? info.pc : pairCounts(); const top = [...pc.entries()].sort((x, y) => y[1] - x[1]).slice(0, 6);
      const len = words.reduce((s, w) => s + w.n * w.sym.length, 0);
      q(el, '.w-out').innerHTML = `<div class="w-grid2"><div><div class="w-h">Corpus now</div>${words.map(w => `<div class="w-corp"><span class="muted">${w.n} ×</span> ${w.sym.map(s => `<span class="w-sym">${esc(s)}</span>`).join('')}</div>`).join('')}<p class="w-note">|V| = ${V0} + ${merges.length} = <b>${V0 + merges.length}</b> · corpus length ${len} symbols</p></div>
        <div><div class="w-h">${info ? 'Pair counts before this merge' : 'Pair counts (next merge picks the top one)'}</div><table class="w-table"><tbody>${top.map(([k, v]) => `<tr class="${info && k === info.best ? 'hit' : ''}"><td>${esc(k.replace('\u0001', ' + '))}</td><td>${v}</td></tr>`).join('')}</tbody></table>
        <div class="w-h">Learned merges (in order)</div><ol class="w-ol">${merges.map(([a, b, v]) => `<li>${esc(a)} + ${esc(b)} → <b>${esc(a + b)}</b> <span class="muted">(${v})</span></li>`).join('') || '<li class="muted">none yet</li>'}</ol></div></div>`;
      q(el, '.w-msg').textContent = info ? `Merged ${info.best.replace('\u0001', ' + ')} (count ${info.bv}). Ties go to the pair that appears first in the corpus listing.` : '';
    };
    el.addEventListener('click', e => {
      const x = e.target.closest('[data-x]'); if (!x) return; const a = x.dataset.x;
      if (a === 'next') { const r = step(); if (r) render(r); }
      if (a === 'all') { let r; while (merges.length < cfg.k && (r = step())); render(r || null); }
      if (a === 'reset') init();
      if (a === 'seg') {
        let s = ['▁', ...q(el, '[data-k=w]').value.trim()]; const log = [`Start: ${s.join(' ')}`];
        merges.forEach(([a1, b1], mi) => { let ch = false; const o = []; for (let i = 0; i < s.length; i++) { if (i < s.length - 1 && s[i] === a1 && s[i + 1] === b1) { o.push(a1 + b1); i++; ch = true; } else o.push(s[i]); } if (ch) { s = o; log.push(`Rule ${mi + 1} (${a1} + ${b1}): ${s.join(' ')}`); } });
        q(el, '.w-seg-out').innerHTML = merges.length ? `<ol class="w-ol">${log.map(l => `<li>${esc(l)}</li>`).join('')}</ol><p class="w-note">Result: <b>${s.map(esc).join(' + ')}</b>. The segmenter only replays merges in order; it never recounts.</p>` : '<p class="w-note">Learn some merges first.</p>';
      }
    });
    q(el, '[data-k=c]').addEventListener('change', init); init();
  };

  /* ---------- Lecture 2: UTF-8 bytes (slides 44–45) ---------- */
  W.utf8 = (el, cfg) => {
    el.innerHTML = `<div class="w-controls"><label>Characters <input type="text" data-k="t" value="${esc(cfg.text)}" size="10"></label>${['a', 'ñ', 'ب', '进', '😀'].map(c => `<button type="button" class="btn small" data-c="${c}">${c}</button>`).join('')}</div><div class="w-out"></div>`;
    const run = () => {
      const chars = Array.from(q(el, '[data-k=t]').value).slice(0, 4);
      q(el, '.w-out').innerHTML = chars.length ? `<table class="w-table"><thead><tr><th>Char</th><th>Code point</th><th>Bytes</th><th>UTF-8 (binary)</th><th>Hex</th></tr></thead><tbody>${chars.map(c => {
        const cp = c.codePointAt(0), bytes = Array.from(new TextEncoder().encode(c));
        const bin = bytes.map((b, i) => { const s = b.toString(2).padStart(8, '0'); const n = i === 0 ? (bytes.length === 1 ? 1 : bytes.length + 1) : 2; return `<span class="w-bits"><i>${s.slice(0, n)}</i>${s.slice(n)}</span>`; }).join(' ');
        return `<tr><td class="w-big">${esc(c)}</td><td>U+${cp.toString(16).toUpperCase().padStart(4, '0')}</td><td>${bytes.length}</td><td>${bin}</td><td><b>${bytes.map(b => b.toString(16).toUpperCase().padStart(2, '0')).join(' ')}</b></td></tr>`; }).join('')}</tbody></table>
        <p class="w-note">Highlighted bits are the fixed prefixes: <code>0</code> = 1-byte character, <code>110</code>/<code>1110</code>/<code>11110</code> = start of a 2/3/4-byte sequence, <code>10</code> = continuation byte. The other bits carry the code point.</p>` : '';
    };
    el.addEventListener('input', run); el.addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (b) { q(el, '[data-k=t]').value = b.dataset.c; run(); } }); run();
  };

  /* ---------- Lecture 2: minimum edit distance matrix + WER (slides 51–58) ---------- */
  W.med = (el, cfg) => {
    el.innerHTML = `<div class="w-controls"><label>Source <input type="text" data-k="s" value="${esc(cfg.s)}" size="14"></label><label>Target <input type="text" data-k="t" value="${esc(cfg.t)}" size="14"></label><label><input type="checkbox" data-k="sub2"> Substitution costs 2</label><label><input type="checkbox" data-k="words" ${cfg.words ? 'checked' : ''}> Compare words (WER)</label></div>
      <div class="w-controls"><button type="button" class="btn small primary" data-x="next">Fill next cell</button><button type="button" class="btn small" data-x="all">Fill all</button><button type="button" class="btn small" data-x="back">Backtrace</button><button type="button" class="btn small" data-x="reset">Reset</button></div>
      <div class="w-scroll"><table class="w-table w-matrix"></table></div><div class="w-out"></div>`;
    let S, T, D, ptr, filled, sub;
    const init = () => {
      const words = q(el, '[data-k=words]').checked; sub = q(el, '[data-k=sub2]').checked ? 2 : 1;
      S = words ? q(el, '[data-k=s]').value.trim().split(/\s+/).filter(Boolean) : Array.from(q(el, '[data-k=s]').value);
      T = words ? q(el, '[data-k=t]').value.trim().split(/\s+/).filter(Boolean) : Array.from(q(el, '[data-k=t]').value);
      S = S.slice(0, 12); T = T.slice(0, 12);
      D = Array.from({ length: S.length + 1 }, (_, i) => Array.from({ length: T.length + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : null));
      ptr = {}; filled = 0; draw(null, '');
    };
    const cellCalc = k => { const i = Math.floor(k / T.length) + 1, j = k % T.length + 1; const c = S[i - 1] === T[j - 1] ? 0 : sub; const opts = [['delete (from above)', D[i - 1][j] + 1, 'up'], ['insert (from left)', D[i][j - 1] + 1, 'left'], [c ? `substitute (diagonal + ${c})` : 'match (diagonal + 0)', D[i - 1][j - 1] + c, 'diag']]; const m = Math.min(...opts.map(o => o[1])); D[i][j] = m; ptr[i + ',' + j] = opts.filter(o => o[1] === m).map(o => o[2]); return { i, j, opts, m }; };
    const draw = (cur, msg, path) => {
      const head = `<tr><th></th><th>∅</th>${T.map(t => `<th>${esc(t)}</th>`).join('')}</tr>`;
      const rows = D.map((r, i) => `<tr><th>${i === 0 ? '∅' : esc(S[i - 1])}</th>${r.map((v, j) => `<td class="${cur && cur.i === i && cur.j === j ? 'cur' : ''} ${path && path.has(i + ',' + j) ? 'path' : ''}">${v == null ? '' : v}</td>`).join('')}</tr>`).join('');
      q(el, '.w-matrix').innerHTML = head + rows; q(el, '.w-out').innerHTML = msg;
    };
    const next = () => {
      if (filled >= S.length * T.length) return false; const r = cellCalc(filled); filled++;
      draw(r, `<p class="w-note">Cell D[${r.i},${r.j}] compares "${esc(S.slice(0, r.i).join(q(el, '[data-k=words]').checked ? ' ' : ''))}" with "${esc(T.slice(0, r.j).join(q(el, '[data-k=words]').checked ? ' ' : ''))}": ${r.opts.map(o => `${o[0]} = <b>${o[1]}</b>`).join(' · ')} → min = <b>${r.m}</b></p>`); return true;
    };
    const finalMsg = () => { const n = S.length, m = T.length, d = D[n][m]; const words = q(el, '[data-k=words]').checked; return `<p class="w-note">Distance D[${n},${m}] = <b>${d}</b>${sub === 2 ? ' (substitution = 2)' : ' (all operations cost 1)'}.${words && n ? ` WER = edits / reference words = ${d}/${n} = <b>${f(d / n, 2)}</b> (treating Source as the reference).` : ''}</p>`; };
    el.addEventListener('click', e => {
      const x = e.target.closest('[data-x]'); if (!x) return; const a = x.dataset.x;
      if (a === 'next') { if (!next()) draw(null, finalMsg()); }
      if (a === 'all') { while (next()); draw(null, finalMsg()); }
      if (a === 'reset') init();
      if (a === 'back') {
        while (next()); let i = S.length, j = T.length; const path = new Set([i + ',' + j]); const ops = [];
        while (i > 0 || j > 0) { const p = i === 0 ? ['left'] : j === 0 ? ['up'] : ptr[i + ',' + j]; const d = p.includes('diag') ? 'diag' : p[0];
          if (d === 'diag') { ops.unshift(S[i - 1] === T[j - 1] ? `match ${S[i - 1]}` : `substitute ${S[i - 1]} → ${T[j - 1]}`); i--; j--; } else if (d === 'up') { ops.unshift(`delete ${S[i - 1]}`); i--; } else { ops.unshift(`insert ${T[j - 1]}`); j--; } path.add(i + ',' + j); }
        draw(null, finalMsg() + `<p class="w-note">One optimal alignment (follow the shaded path from the bottom-right back to the top-left): ${ops.map(o => /^match/.test(o) ? esc(o) : `<b>${esc(o)}</b>`).join(' → ')}</p>`, path);
      }
    });
    el.addEventListener('change', e => { if (e.target.matches('input')) init(); }); init();
  };

  /* ---------- Lecture 3: bigram MLE, sentence probability, add-one (slides 13–16, 28–29) ---------- */
  W.bigram = (el, cfg) => {
    el.innerHTML = `<label class="w-lab">Training corpus (one sentence per line; &lt;s&gt; and &lt;/s&gt; are added for you)<textarea rows="3" data-k="c">${esc(cfg.corpus)}</textarea></label>
      <div class="w-controls"><label class="grow">Sentence to score <input type="text" data-k="s" value="${esc(cfg.sentence)}"></label><label><input type="checkbox" data-k="add1" ${cfg.add1 ? 'checked' : ''}> Add-one (Laplace) smoothing</label></div><div class="w-out"></div>`;
    const run = () => {
      const sents = q(el, '[data-k=c]').value.split('\n').map(l => l.trim()).filter(Boolean).map(l => ['<s>', ...l.split(/\s+/), '</s>']);
      const uni = {}, bi = {}; const types = new Set();
      sents.forEach(s => s.forEach((w, i) => { uni[w] = (uni[w] || 0) + 1; if (w !== '<s>' && w !== '</s>') types.add(w); if (i) { const k = s[i - 1] + ' ' + w; bi[k] = (bi[k] || 0) + 1; } }));
      const V = types.size, add1 = q(el, '[data-k=add1]').checked; const sent = ['<s>', ...q(el, '[data-k=s]').value.trim().split(/\s+/).filter(Boolean), '</s>'];
      let P = 1, logP = 0; const rows = [];
      for (let i = 1; i < sent.length; i++) { const h = sent[i - 1], w = sent[i], c = bi[h + ' ' + w] || 0, ch = uni[h] || 0; const p = add1 ? (c + 1) / (ch + V) : (ch ? c / ch : 0); P *= p; logP += Math.log(p); rows.push([h, w, c, ch, p]); }
      const N = rows.length, pp = P > 0 ? Math.pow(P, -1 / N) : Infinity;
      q(el, '.w-out').innerHTML = `<table class="w-table"><thead><tr><th>Bigram</th><th>Calculation</th><th>Probability</th></tr></thead><tbody>${rows.map(([h, w, c, ch, p]) => `<tr class="${p === 0 ? 'bad' : ''}"><td>P(${esc(w)} | ${esc(h)})</td><td>${add1 ? `(${c} + 1) / (${ch} + ${V})` : `${c} / ${ch}`}</td><td>${f(p)}</td></tr>`).join('')}</tbody></table>
        <div class="w-stats"><div><b>${f(P, 6)}</b><span>sentence probability (product)</span></div><div><b>${P > 0 ? f(logP, 3) : '−∞'}</b><span>log probability (sum of logs)</span></div><div><b>${P > 0 ? f(pp, 3) : '∞'}</b><span>perplexity P^(−1/${N})</span></div></div>
        <p class="w-note">${P === 0 ? 'One unseen bigram makes the whole sentence probability 0. Turn on add-one smoothing to give it a small non-zero probability.' : add1 ? `V = ${V} word types (excluding &lt;s&gt; and &lt;/s&gt;), so every denominator grows by ${V}.` : 'The denominator is always the count of the history word.'}</p>`;
    };
    el.addEventListener('input', run); run();
  };

  /* ---------- Lectures 3 & 6: perplexity and cross-entropy from token probabilities ---------- */
  W.ppl = (el, cfg) => {
    el.innerHTML = `<div class="w-controls"><label class="grow">Probabilities the model gave the true tokens <input type="text" data-k="p" value="${esc(cfg.p)}"></label></div><div class="w-controls">${(cfg.presets || []).map(p => `<button type="button" class="btn small" data-p="${p}">${p}</button>`).join('')}</div><div class="w-out"></div>`;
    const run = () => {
      const ps = q(el, '[data-k=p]').value.split(/[,\s]+/).map(Number).filter(x => x > 0 && x <= 1);
      if (!ps.length) { q(el, '.w-out').innerHTML = '<p class="w-note">Enter probabilities between 0 and 1.</p>'; return; }
      const N = ps.length, prod = ps.reduce((a, b) => a * b, 1), ce = ps.reduce((a, p) => a - Math.log(p), 0) / N, am = ps.reduce((a, b) => a + b, 0) / N;
      q(el, '.w-out').innerHTML = `<table class="w-table"><thead><tr><th>Token</th><th>p</th><th>−ln p (loss)</th></tr></thead><tbody>${ps.map((p, i) => `<tr><td>${i + 1}</td><td>${p}</td><td>${f(-Math.log(p))}</td></tr>`).join('')}</tbody></table>
        <div class="w-stats"><div><b>${f(prod, 6)}</b><span>P(W) = product</span></div><div><b>${f(ce)}</b><span>mean cross-entropy H (nats)</span></div><div><b>${f(Math.pow(prod, -1 / N), 3)}</b><span>PP = P(W)^(−1/N)</span></div><div><b>${f(Math.exp(ce), 3)}</b><span>exp(H): the same number</span></div></div>
        <p class="w-note">Trap: the arithmetic mean of the probabilities is ${f(am, 3)}, and 1/${f(am, 3)} = ${f(1 / am, 3)}${Math.abs(1 / am - Math.exp(ce)) > 1e-6 ? `, which is <b>not</b> the perplexity` : ' (equal only because all probabilities are the same)'}. Perplexity uses the geometric mean: average the losses, then exponentiate.</p>`;
    };
    el.addEventListener('input', run); el.addEventListener('click', e => { const b = e.target.closest('[data-p]'); if (b) { q(el, '[data-k=p]').value = b.dataset.p; run(); } }); run();
  };

  /* ---------- Lectures 4 & 6: activation functions / sigmoid (L4 slides 19–20, L6 slide 8) ---------- */
  W.activation = (el, cfg) => {
    const fns = cfg.all ? [['sigmoid', z => 1 / (1 + Math.exp(-z)), 'var(--m1)'], ['tanh', Math.tanh, 'var(--m2)'], ['ReLU', z => Math.max(0, z), 'var(--m6)']] : [['sigmoid', z => 1 / (1 + Math.exp(-z)), 'var(--m1)']];
    el.innerHTML = `<div class="w-controls"><label class="grow">Score z = <b data-o="z"></b><input type="range" min="-6" max="6" step="0.01" value="${cfg.z}" data-k="z"></label>${(cfg.marks || []).map(m => `<button type="button" class="btn small" data-z="${m}">z = ${m}</button>`).join('')}</div><div class="w-plot"></div><div class="w-out"></div>`;
    const W_ = 520, H_ = 220, X = z => (z + 6) / 12 * W_, Y = v => H_ - 20 - (v + (cfg.all ? 1 : 0)) / (cfg.all ? 3.2 : 1) * (H_ - 40);
    const run = () => {
      const z = +q(el, '[data-k=z]').value; q(el, '[data-o=z]').textContent = z.toFixed(2);
      let svg = `<svg viewBox="0 0 ${W_} ${H_}" class="w-svg" role="img" aria-label="Activation curves"><line x1="0" x2="${W_}" y1="${Y(0)}" y2="${Y(0)}" class="ax"/><line x1="${X(0)}" x2="${X(0)}" y1="10" y2="${H_ - 10}" class="ax"/>`;
      if (!cfg.all) svg += `<line x1="0" x2="${W_}" y1="${Y(0.5)}" y2="${Y(0.5)}" class="ax dash"/><text x="6" y="${Y(0.5) - 4}" class="lbl">0.5 decision boundary</text>`;
      fns.forEach(([n, fn, c]) => { let d = ''; for (let i = 0; i <= 120; i++) { const zz = -6 + i / 10; const v = Math.min(fn(zz), cfg.all ? 2.2 : 1); d += (i ? 'L' : 'M') + X(zz).toFixed(1) + ' ' + Y(v).toFixed(1); } svg += `<path d="${d}" stroke="${c}" fill="none" stroke-width="2.5"/><circle cx="${X(z)}" cy="${Y(Math.min(fn(z), cfg.all ? 2.2 : 1))}" r="5" fill="${c}"/>`; });
      q(el, '.w-plot').innerHTML = svg + '</svg>';
      q(el, '.w-out').innerHTML = `<div class="w-stats">${fns.map(([n, fn, c]) => `<div><b style="color:${c}">${f(fn(z))}</b><span>${n}(${z.toFixed(2)})</span></div>`).join('')}</div>${cfg.all ? '<p class="w-note">Sigmoid squeezes into (0, 1), tanh into (−1, 1); both flatten (saturate) at large |z|. ReLU is 0 for negative z and equals z for positive z.</p>' : `<p class="w-note">${z >= 0 ? 'P(y=1) ≥ 0.5 → predict class 1 (positive).' : 'P(y=1) < 0.5 → predict class 0 (negative).'} The curve is steepest near z = 0, where the classifier is least certain.</p>`}`;
    };
    el.addEventListener('input', run); el.addEventListener('click', e => { const b = e.target.closest('[data-z]'); if (b) { q(el, '[data-k=z]').value = b.dataset.z; run(); } }); run();
  };

  /* ---------- Lecture 4: precision, recall, F1 and the accuracy trap (slides 27–29) ---------- */
  W.prf = (el, cfg) => {
    const k = ['tp', 'fp', 'fn', 'tn'], lab = { tp: 'TP (spam caught)', fp: 'FP (false alarm)', fn: 'FN (spam missed)', tn: 'TN (normal email passed)' };
    el.innerHTML = `<div class="w-controls">${k.map(x => `<label>${lab[x]} <input type="number" min="0" data-k="${x}" value="${cfg[x]}" style="width:5.5em"></label>`).join('')}</div>
      <div class="w-controls"><button type="button" class="btn small" data-preset="8,2,4,86">Lecture example</button><button type="button" class="btn small" data-preset="0,0,50,950">Lazy model: always "not spam"</button></div><div class="w-out"></div>`;
    const run = () => {
      const [tp, fp, fn, tn] = k.map(x => Math.max(0, +q(el, `[data-k=${x}]`).value || 0)); const P = tp + fp ? tp / (tp + fp) : 0, R = tp + fn ? tp / (tp + fn) : 0, F = P + R ? 2 * P * R / (P + R) : 0, A = (tp + fp + fn + tn) ? (tp + tn) / (tp + fp + fn + tn) : 0;
      q(el, '.w-out').innerHTML = `<table class="w-table w-cm"><tr><th></th><th>Predicted +</th><th>Predicted −</th></tr><tr><th>Actual +</th><td class="good">TP ${tp}</td><td class="bad">FN ${fn}</td></tr><tr><th>Actual −</th><td class="bad">FP ${fp}</td><td>TN ${tn}</td></tr></table>
        <div class="w-meters">${[['Accuracy', A, '(TP+TN)/all'], ['Precision', P, 'TP/(TP+FP)'], ['Recall', R, 'TP/(TP+FN)'], ['F1', F, '2PR/(P+R)']].map(([n, v, fm]) => `<div class="w-meter"><span>${n} <small class="muted">${fm}</small></span>${bar(v)}<b>${f(v, 2)}</b></div>`).join('')}</div>
        <p class="w-note">${A >= 0.9 && R < 0.2 ? 'Accuracy looks excellent, yet recall shows the model finds almost no spam. This is why accuracy is not enough on imbalanced data.' : 'Precision falls with false alarms (FP); recall falls with missed positives (FN). F1 balances the two.'}</p>`;
    };
    el.addEventListener('input', run); el.addEventListener('click', e => { const b = e.target.closest('[data-preset]'); if (b) { b.dataset.preset.split(',').forEach((v, i) => q(el, `[data-k=${k[i]}]`).value = v); run(); } }); run();
  };

  /* ---------- Lectures 4, 6, 7: softmax over logits ---------- */
  W.softmax = (el, cfg) => {
    el.innerHTML = `<div class="w-controls">${cfg.labels.map((l, i) => `<label>${esc(l)} <input type="number" step="0.1" data-i="${i}" value="${cfg.z[i]}" style="width:5em"></label>`).join('')}</div><div class="w-out"></div>`;
    const run = () => {
      const z = qa(el, '[data-i]').map(x => +x.value || 0), ex = z.map(Math.exp), s = ex.reduce((a, b) => a + b, 0), p = ex.map(x => x / s); const best = p.indexOf(Math.max(...p));
      q(el, '.w-out').innerHTML = `<table class="w-table"><thead><tr><th>Class</th><th>logit z</th><th>exp(z)</th><th>p = exp(z) / ${f(s, 3)}</th><th></th></tr></thead><tbody>${cfg.labels.map((l, i) => `<tr class="${i === best ? 'hit' : ''}"><td>${esc(l)}</td><td>${z[i]}</td><td>${f(ex[i], 3)}</td><td><b>${f(p[i])}</b></td><td>${bar(p[i])}</td></tr>`).join('')}</tbody></table>
        <p class="w-note">The probabilities are positive and sum to ${f(p.reduce((a, b) => a + b, 0), 3)}. They share one denominator, so raising one logit lowers every other probability. Prediction: <b>${esc(cfg.labels[best])}</b>.</p>`;
    };
    el.addEventListener('input', run); run();
  };

  /* ---------- Lecture 5: Bag-of-Words loses order (slides 9–13) ---------- */
  W.bow = (el, cfg) => {
    el.innerHTML = `<div class="w-controls"><label>Document A <input type="text" data-k="a" value="${esc(cfg.a)}"></label><label>Document B <input type="text" data-k="b" value="${esc(cfg.b)}"></label></div><div class="w-out"></div>`;
    const run = () => {
      const A = q(el, '[data-k=a]').value.toLowerCase().split(/\s+/).filter(Boolean), B = q(el, '[data-k=b]').value.toLowerCase().split(/\s+/).filter(Boolean);
      const voc = []; [...A, ...B].forEach(w => { if (!voc.includes(w)) voc.push(w); });
      const vec = d => voc.map(w => d.filter(x => x === w).length); const va = vec(A), vb = vec(B); const same = va.join() === vb.join();
      q(el, '.w-out').innerHTML = `<div class="w-scroll"><table class="w-table"><thead><tr><th></th>${voc.map(w => `<th>${esc(w)}</th>`).join('')}</tr></thead><tbody>${A.map(w => `<tr class="muted"><td>one-hot "${esc(w)}"</td>${voc.map(v => `<td>${v === w ? 1 : 0}</td>`).join('')}</tr>`).join('')}<tr class="hit"><td>BoW A (sum)</td>${va.map(v => `<td>${v}</td>`).join('')}</tr><tr class="hit"><td>BoW B</td>${vb.map(v => `<td>${v}</td>`).join('')}</tr></tbody></table></div>
        <p class="w-note ${same ? 'bad' : ''}">${same ? 'Same vector for both documents: Bag-of-Words cannot see word order, so it cannot tell these meanings apart.' : 'The vectors differ because the word counts differ. Try the same words in a different order.'}</p>`;
    };
    el.addEventListener('input', run); run();
  };

  /* ---------- Lecture 5: TF-IDF and cosine (slides 15–28) ---------- */
  W.tfidf = (el, cfg) => {
    el.innerHTML = `<label class="w-lab">Collection (one document per line)<textarea rows="4" data-k="d">${esc(cfg.docs)}</textarea></label>
      <div class="w-controls"><label>Compare <select data-k="x"></select></label><label>with <select data-k="y"></select></label></div><div class="w-out"></div>`;
    let last = -1;
    const run = () => {
      const docs = q(el, '[data-k=d]').value.split('\n').map(l => l.trim().toLowerCase().split(/\s+/).filter(Boolean)).filter(d => d.length); const N = docs.length;
      if (docs.length !== last) { last = docs.length; ['x', 'y'].forEach((k, n) => { q(el, `[data-k=${k}]`).innerHTML = docs.map((_, i) => `<option value="${i}" ${i === n ? 'selected' : ''}>D${i + 1}</option>`).join(''); }); }
      const voc = []; docs.forEach(d => d.forEach(w => { if (!voc.includes(w)) voc.push(w); }));
      const df = voc.map(w => docs.filter(d => d.includes(w)).length), idf = df.map(x => Math.log10(N / x));
      const tf = d => voc.map(w => { const c = d.filter(x => x === w).length; return c ? 1 + Math.log10(c) : 0; });
      const W2 = docs.map(d => tf(d).map((t, i) => t * idf[i])), C = docs.map(d => voc.map(w => d.filter(x => x === w).length));
      const cos = (a, b) => { const dot = a.reduce((s, v, i) => s + v * b[i], 0), na = Math.hypot(...a), nb = Math.hypot(...b); return na && nb ? dot / (na * nb) : 0; };
      const x = +q(el, '[data-k=x]').value || 0, y = +q(el, '[data-k=y]').value || 0;
      q(el, '.w-out').innerHTML = `<div class="w-scroll"><table class="w-table"><thead><tr><th></th>${voc.map(w => `<th>${esc(w)}</th>`).join('')}</tr></thead><tbody><tr><td>DF</td>${df.map(v => `<td>${v}</td>`).join('')}</tr><tr><td>IDF = log₁₀(${N}/DF)</td>${idf.map(v => `<td>${v.toFixed(3)}</td>`).join('')}</tr>${W2.map((r, i) => `<tr class="${i === x || i === y ? 'hit' : ''}"><td>D${i + 1} TF-IDF</td>${r.map(v => `<td>${v ? v.toFixed(3) : '0'}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
        <div class="w-stats"><div><b>${f(cos(W2[x] || [], W2[y] || []), 3)}</b><span>cos(D${x + 1}, D${y + 1}) with TF-IDF</span></div><div><b>${f(cos(C[x] || [], C[y] || []), 3)}</b><span>cos with raw counts (BoW)</span></div></div>
        <p class="w-note">A word in every document gets IDF = log₁₀(1) = 0, so it adds nothing. Shared words that are common across the collection count for less under TF-IDF than under raw counts.</p>`;
    };
    el.addEventListener('input', run); el.addEventListener('change', run); run();
  };

  /* ---------- Lecture 5: PMI / PPMI from the co-occurrence table (slides 32–36) ---------- */
  W.pmi = el => {
    const rows = ['cherry', 'strawberry', 'digital', 'information'], cols = ['computer', 'data', 'result', 'pie', 'sugar'];
    const M = [[2, 8, 9, 442, 25], [0, 0, 1, 60, 19], [1670, 1683, 85, 5, 4], [3325, 3982, 378, 5, 13]];
    const rt = M.map(r => r.reduce((a, b) => a + b, 0)), ct = cols.map((_, j) => M.reduce((a, r) => a + r[j], 0)), N = rt.reduce((a, b) => a + b, 0);
    el.innerHTML = `<p class="w-note">Click any count to compute its PMI.</p><div class="w-scroll"><table class="w-table w-click"><thead><tr><th></th>${cols.map(c => `<th>${c}</th>`).join('')}<th>row total</th></tr></thead><tbody>${rows.map((r, i) => `<tr><th>${r}</th>${M[i].map((v, j) => `<td><button type="button" data-ij="${i},${j}">${v.toLocaleString()}</button></td>`).join('')}<td class="muted">${rt[i].toLocaleString()}</td></tr>`).join('')}<tr><th>column total</th>${ct.map(v => `<td class="muted">${v.toLocaleString()}</td>`).join('')}<td class="muted">N = ${N.toLocaleString()}</td></tr></tbody></table></div><div class="w-out"></div>`;
    const show = (i, j) => {
      qa(el, '[data-ij]').forEach(b => b.classList.toggle('on', b.dataset.ij === `${i},${j}`));
      const pwc = M[i][j] / N, pw = rt[i] / N, pc = ct[j] / N, ratio = pwc / (pw * pc), pmi = M[i][j] ? Math.log2(ratio) : -Infinity;
      q(el, '.w-out').innerHTML = `<div class="w-calc">P(${rows[i]}, ${cols[j]}) = ${M[i][j]} / ${N} = ${f(pwc)}<br>P(${rows[i]}) = ${rt[i]} / ${N} = ${f(pw)} · P(${cols[j]}) = ${ct[j]} / ${N} = ${f(pc)}<br>PMI = log₂( ${f(pwc)} / (${f(pw)} × ${f(pc)}) ) = log₂(${f(ratio, 3)}) = <b>${M[i][j] ? f(pmi, 2) : '−∞'}</b> · PPMI = <b>${M[i][j] ? f(Math.max(0, pmi), 2) : 0}</b></div>
        <p class="w-note">${pmi > 0 ? `They occur together about ${f(ratio, 1)} times as often as chance predicts.` : 'They occur together less often than chance predicts, so PPMI clips the value to 0.'}</p>`;
    };
    el.addEventListener('click', e => { const b = e.target.closest('[data-ij]'); if (b) show(...b.dataset.ij.split(',').map(Number)); }); show(0, 3);
  };

  /* ---------- Lecture 5: skip-gram training pairs (slides 38–39) ---------- */
  W.skipgram = (el, cfg) => {
    const NOISE = ['orchestra', 'algebra', 'volcano', 'senate', 'pixel', 'harbor', 'violin', 'tax'];
    el.innerHTML = `<div class="w-controls"><label class="grow">Sentence <input type="text" data-k="s" value="${esc(cfg.s)}"></label><label>Window ±<b data-o="w"></b><input type="range" min="1" max="3" value="2" data-k="w"></label><button type="button" class="btn small" data-x="neg">New negative samples</button></div><div class="w-sent"></div><div class="w-out"></div>`;
    let centre = cfg.centre;
    const run = () => {
      const toks = q(el, '[data-k=s]').value.trim().split(/\s+/).filter(Boolean), w = +q(el, '[data-k=w]').value; q(el, '[data-o=w]').textContent = w; if (centre >= toks.length) centre = 0;
      const ctx = toks.map((_, i) => i).filter(i => i !== centre && Math.abs(i - centre) <= w);
      q(el, '.w-sent').innerHTML = toks.map((t, i) => `<button type="button" class="w-tok ${i === centre ? 'centre' : ctx.includes(i) ? 'ctx' : ''}" data-i="${i}">${esc(t)}</button>`).join('');
      const negs = NOISE.slice().sort(() => Math.random() - 0.5).slice(0, 2);
      q(el, '.w-out').innerHTML = `<div class="w-grid2"><div><div class="w-h">Skip-gram (centre → context)</div>${ctx.map(i => `<div class="w-pair pos">(${esc(toks[centre])}, ${esc(toks[i])}) → label 1</div>`).join('')}${negs.map(n => `<div class="w-pair neg">(${esc(toks[centre])}, ${n}) → label 0 <span class="muted">random noise</span></div>`).join('')}</div>
        <div><div class="w-h">CBOW (context → centre)</div><div class="w-pair pos">{${ctx.map(i => esc(toks[i])).join(', ')}} → predict <b>${esc(toks[centre])}</b></div><p class="w-note">Click any word to make it the centre word.</p></div></div>`;
    };
    el.addEventListener('input', run); el.addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) { centre = +b.dataset.i; run(); } if (e.target.closest('[data-x=neg]')) run(); }); run();
  };

  /* ---------- Lecture 6: LSTM cell update (Additional Depth, slides 46–48, 59–60) ---------- */
  W.lstm = (el, cfg) => {
    const ks = [['c', 'old cell state cₜ₋₁', -1, 1], ['f', 'forget gate f', 0, 1], ['i', 'input gate i', 0, 1], ['g', 'candidate g (tanh)', -1, 1], ['o', 'output gate o', 0, 1]];
    el.innerHTML = `<div class="w-controls">${ks.map(([k, l, a, b]) => `<label class="grow">${l} = <b data-o="${k}"></b><input type="range" min="${a}" max="${b}" step="any" value="${cfg[k]}" data-k="${k}"></label>`).join('')}</div><div class="w-out"></div>`;
    const run = () => {
      const v = {}; ks.forEach(([k]) => { v[k] = +q(el, `[data-k=${k}]`).value; q(el, `[data-o=${k}]`).textContent = f(v[k]); });
      const kept = v.f * v.c, written = v.i * v.g, c = kept + written, h = v.o * Math.tanh(c);
      q(el, '.w-out').innerHTML = `<div class="w-calc">kept memory = f × cₜ₋₁ = ${f(v.f)} × ${f(v.c)} = <b>${f(kept)}</b><br>written memory = i × g = ${f(v.i)} × ${f(v.g)} = <b>${f(written)}</b><br>cₜ = kept + written = <b>${f(c)}</b> · hₜ = o × tanh(cₜ) = ${f(v.o)} × ${f(Math.tanh(c))} = <b>${f(h)}</b></div>
        <p class="w-note">Set the forget gate near 0 to wipe old memory; set the output gate near 0 to hide the memory from hₜ while the cell still keeps it.</p>`;
    };
    el.addEventListener('input', run); run();
  };

  /* ---------- Lecture 7: causal vs bidirectional attention (slides 8–9) ---------- */
  W.attention = (el, cfg) => {
    el.innerHTML = `<div class="w-controls"><span class="w-seg"><button type="button" data-m="causal" aria-pressed="true">Causal (decoder)</button><button type="button" data-m="bi" aria-pressed="false">Bidirectional (encoder)</button></span></div><div class="w-scroll"><table class="w-table w-att"></table></div><div class="w-out"></div>`;
    let mode = 'causal', row = 2; const toks = cfg.tokens;
    const run = () => {
      q(el, '.w-att').innerHTML = `<tr><th>query ↓ / reads →</th>${toks.map(t => `<th>${esc(t)}</th>`).join('')}</tr>` + toks.map((t, i) => `<tr class="${i === row ? 'hit' : ''}"><th><button type="button" data-r="${i}">${i + 1}. ${esc(t)}</button></th>${toks.map((_, j) => { const ok = mode === 'bi' || j <= i; return `<td class="${ok ? 'ok' : 'no'}">${ok ? 1 : 0}</td>`; }).join('')}</tr>`).join('');
      const vis = toks.filter((_, j) => mode === 'bi' || j <= row);
      q(el, '.w-out').innerHTML = `<p class="w-note">Position ${row + 1} ("${esc(toks[row])}") can read: <b>${vis.map(esc).join(', ')}</b>. ${mode === 'causal' ? `Later tokens are masked with −∞ before softmax, because position ${row + 1} is trained to predict the token after it, so it must not see it.` : 'The encoder sees the whole input, so every token uses both left and right context.'}</p>`;
    };
    el.addEventListener('click', e => { const m = e.target.closest('[data-m]'), r = e.target.closest('[data-r]'); if (m) { mode = m.dataset.m; qa(el, '[data-m]').forEach(b => b.setAttribute('aria-pressed', b === m)); run(); } if (r) { row = +r.dataset.r; run(); } }); run();
  };

  /* ---------- Lecture 7: masked language modelling – which positions are scored (slides 19–21) ---------- */
  W.mlm = (el, cfg) => {
    const toks = cfg.tokens; const sel = new Set(cfg.sel);
    el.innerHTML = `<p class="w-note">Click words to select them for masking.</p><div class="w-sent"></div><div class="w-out"></div>`;
    const run = () => {
      q(el, '.w-sent').innerHTML = toks.map((t, i) => `<button type="button" class="w-tok ${sel.has(i) ? 'centre' : ''}" data-i="${i}">${sel.has(i) ? '[MASK]' : esc(t)}</button>`).join('');
      q(el, '.w-out').innerHTML = `<p class="w-note">Targets: <b>${[...sel].sort((a, b) => a - b).map(i => esc(toks[i])).join(', ') || 'none'}</b>. Loss = average of −ln p(original token) over <b>${sel.size}</b> selected position${sel.size === 1 ? '' : 's'}, not over all ${toks.length} tokens. The unselected words give no loss, but they are the context the encoder reads from both sides.</p>`;
    };
    el.addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) { const i = +b.dataset.i; sel.has(i) ? sel.delete(i) : sel.add(i); run(); } }); run();
  };

  /* ---------- Lecture 7: decoding playground – temperature, top-k, top-p, sampling (slides 30–42) ---------- */
  W.decode = (el, cfg) => {
    const labels = cfg.labels, base = cfg.p;
    el.innerHTML = `<div class="w-controls"><label class="grow">Temperature T = <b data-o="t"></b><input type="range" min="0.25" max="3" step="0.05" value="1" data-k="t"></label><label>top-k <select data-k="k"><option value="0">off</option>${labels.map((_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}</select></label><label>top-p <select data-k="p"><option value="0">off</option>${[0.5, 0.6, 0.7, 0.8, 0.9, 0.95].map(v => `<option>${v}</option>`).join('')}</select></label></div>
      <div class="w-controls"><button type="button" class="btn small primary" data-x="draw">Sample a token</button><button type="button" class="btn small" data-x="reset">Reset to slide settings</button><span class="w-msg" aria-live="polite"></span></div><div class="w-out"></div>`;
    let cur = [];
    const run = () => {
      const T = +q(el, '[data-k=t]').value, k = +q(el, '[data-k=k]').value, p = +q(el, '[data-k=p]').value; q(el, '[data-o=t]').textContent = T.toFixed(2);
      let pt = base.map(x => Math.pow(x, 1 / T)); const s = pt.reduce((a, b) => a + b, 0); pt = pt.map(x => x / s);
      const order = pt.map((v, i) => i).sort((a, b) => pt[b] - pt[a]); let keep = new Set(order);
      if (k) keep = new Set(order.slice(0, k));
      if (p) { let cum = 0; const nk = new Set(); for (const i of order) { if (!keep.has(i)) continue; nk.add(i); cum += pt[i]; if (cum >= p - 1e-9) break; } keep = nk; }
      const mass = [...keep].reduce((a, i) => a + pt[i], 0); cur = pt.map((v, i) => keep.has(i) ? v / mass : 0);
      q(el, '.w-out').innerHTML = `<table class="w-table"><thead><tr><th>Token</th><th>Original p</th><th>After T</th><th>Kept?</th><th>Sampling probability</th><th></th></tr></thead><tbody>${labels.map((l, i) => `<tr class="${keep.has(i) ? '' : 'muted'}"><td>${esc(l)}${i === order[0] ? ' <span class="w-tag">greedy pick</span>' : ''}</td><td>${base[i].toFixed(2)}</td><td>${pt[i].toFixed(4)}</td><td>${keep.has(i) ? '✓' : '—'}</td><td><b>${cur[i].toFixed(4)}</b></td><td>${bar(cur[i])}</td></tr>`).join('')}</tbody></table>
        <p class="w-note">Retained mass ${mass.toFixed(2)} is renormalised to 1. ${T < 1 ? 'T < 1 sharpens the distribution toward the top token.' : T > 1 ? 'T > 1 flattens it, giving rare tokens more chance.' : 'T = 1 keeps the model\'s distribution.'} Temperature never changes the ranking, so greedy always picks the same token.</p>`;
    };
    el.addEventListener('input', run); el.addEventListener('change', run);
    el.addEventListener('click', e => {
      const x = e.target.closest('[data-x]'); if (!x) return;
      if (x.dataset.x === 'reset') { q(el, '[data-k=t]').value = 1; q(el, '[data-k=k]').value = 0; q(el, '[data-k=p]').value = 0; run(); q(el, '.w-msg').textContent = ''; }
      if (x.dataset.x === 'draw') { const u = Math.random(); let c = 0, pick = 0; for (let i = 0; i < cur.length; i++) { c += cur[i]; if (u < c) { pick = i; break; } } q(el, '.w-msg').innerHTML = `u = ${u.toFixed(3)} → <b>${esc(labels[pick])}</b>`; }
    }); run();
  };

  return W;
})();
