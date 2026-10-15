/* ---------- content helpers (used by the chapter data files) ---------- */
const CH = [];
const P = (en, ar) => ({ t: 'p', en, ar });
const D = (term, en, ar, pri = 'must') => ({ t: 'def', term, en, ar, pri });
const L = (en, ar, ordered) => ({ t: 'list', en, ar, ordered });
const T = (head, rows, note) => ({ t: 'table', head, rows, note });
const EX = (en, ar) => ({ t: 'ex', en, ar });
const XA = (en, ar) => ({ t: 'xa', en, ar });
const W = (en, ar) => ({ t: 'warn', en, ar });
const F = (f, en, ar) => ({ t: 'formula', f, en, ar });
const FL = (steps, cap) => ({ t: 'flow', steps, cap });
const K = (en, ar) => ({ t: 'key', en, ar });
const S = (id, h, pri, blocks) => ({ id, h, pri, blocks });
const E = (type, q, qa, marks, ans, ansAr, pts, alloc) => ({ type, q, qa, marks, ans, ansAr, pts, alloc });
const MCQ = (q, qa, opts, ans, why, whyAr) => ({ q, qa, opts, ans, why, whyAr });
/* guided lessons (lessons_ch*.js): LESSONS[sectionId] = { big, why, links, think, steps, analogy, action, confuse, check, remember, teach }
   missions: MISSIONS[chapterId] = [{ t: [en, ar], goal: [en, ar], secs: ['1', '2', …] }] */
const LESSONS = {};
const MISSIONS = {};
