/* ================= exam metadata =================
   Slide references, priority labels and links for every chapter.
   Slide numbers are PDF page numbers (what a PDF viewer shows).

   Section entry:  id: [slides, label, [reason codes], memorize?, flag?]
     label:   'must' = MUST MEMORIZE · 'imp' = UNDERSTAND · 'add' = ADDITIONAL DETAIL
     reasons: keys of LABEL_REASONS (why the label was given)
     memorize: [en, ar]  what exactly to memorize (MUST MEMORIZE only)
     flag:     [en, ar]  note when a slide is unclear or shows an image only
   Link lists (essays, rev, fc, sa, quiz) give the section numbers each item covers, in item order.
*/
const LABEL_REASONS = {
  sum: [`On the lecture's summary / "What you should know" / wrap-up slide`, `مذكور في شريحة الملخص أو "ما يجب أن تعرفه" في المحاضرة`],
  outcome: [`Listed as a learning outcome of the lecture`, `مذكور كهدف تعليمي للمحاضرة`],
  terms: [`Defined on a key-terms or definition slide`, `معرّف في شريحة المصطلحات أو التعريفات`],
  calc: [`Worked example or practice check the slides ask you to reproduce`, `مثال محلول أو تمرين تطلب الشرائح إعادة حله`],
  list: [`A named list or classification (suits "list and explain" questions)`, `قائمة أو تصنيف مسمّى (يناسب أسئلة "اذكر واشرح")`],
  cmp: [`A comparison table on the slides (compare-and-contrast material)`, `جدول مقارنة في الشرائح (مادة للمقارنة)`],
  core: [`Core mechanism that later topics build on`, `آلية أساسية تبني عليها الموضوعات اللاحقة`],
  motiv: [`Motivation or context: explains why a method exists`, `دافع أو سياق: يشرح سبب وجود الطريقة`],
  example: [`Case study or illustration supporting a core idea`, `دراسة حالة أو توضيح يدعم فكرة أساسية`],
  practical: [`Practical guidance rather than a definition, formula or procedure`, `إرشاد عملي وليس تعريفًا أو صيغة أو إجراءً`],
  depth: [`Marked "Additional depth", "Optional" or "Reference" on the slides`, `مصنّف في الشرائح كـ "تعمّق إضافي" أو "اختياري" أو "مرجع"`]
};

const META = {
  ch1: {
    sec: {
      c1s1: ['2', 'must', ['terms'], [`The definition: three parent fields (linguistics, computer science, information engineering) and the goal (process and analyze large amounts of natural-language data).`, `التعريف: المجالات الثلاثة (علم اللغة، علوم الحاسب، هندسة المعلومات) والهدف (معالجة وتحليل كميات كبيرة من بيانات اللغة الطبيعية).`]],
      c1s2: ['3–4', 'must', ['terms'], [`Vocabulary = set of words; text = sequence of words from the vocabulary; language = set of all possible texts.`, `المفردات = مجموعة كلمات؛ النص = سلسلة كلمات؛ اللغة = كل النصوص الممكنة.`], [`Slide 3 shows only two pictures (book text vs program code) labelled "Natural Language" and "Artificial Language". The explanations of the two terms are added for clarity.`, `الشريحة 3 تعرض صورتين فقط بعنوان "لغة طبيعية" و"لغة اصطناعية"، وشرح المصطلحين مضاف للتوضيح.`]],
      c1s3: ['5–20', 'must', ['list'], [`All 12 applications, each with its one-line definition and the example shown on the slide.`, `التطبيقات الاثنا عشر، لكل منها تعريف من سطر ومثال الشريحة.`], [`Slides 9 (text categorization), 12, 15 and 16 (machine translation) show screenshots only, with no definition text. The definitions of text categorization and machine translation are added for clarity.`, `الشرائح 9 و12 و15 و16 تعرض لقطات شاشة فقط دون تعريف، وتعريفا تصنيف النصوص والترجمة الآلية مضافان للتوضيح.`]],
      c1s4: ['21', 'must', ['list', 'cmp'], [`Which applications are easy (mostly solved), intermediate (good progress) and difficult (still hard). Note the word "some".`, `أي التطبيقات سهلة ومتوسطة وصعبة، مع الانتباه لكلمة "بعض".`]],
      c1s5: ['22–24', 'must', ['list'], [`The five techniques; POS tagging = a syntactic tag per word; parsing = the syntactic tree; WSD example "interest".`, `التقنيات الخمس؛ وسم أقسام الكلام = وسم لكل كلمة؛ التحليل النحوي = الشجرة؛ مثال WSD كلمة interest.`], [`Slide 22 names section splitting and sentence splitting without defining them, and slide 24 shows WSD only as a screenshot (the six LDOCE senses of "interest").`, `الشريحة 22 تذكر تقسيم الأقسام والجمل دون تعريف، والشريحة 24 تعرض WSD كلقطة شاشة فقط.`]],
      c1s6: ['25–27', 'must', ['terms', 'list'], [`Definitions of phonetics/phonology, morphology, syntax, pragmatics and discourse, each with its slide example (salt, John … He … it).`, `تعريفات الصوتيات والصرف والنحو والتداولية والخطاب مع أمثلة الشرائح.`]],
      c1s7: ['28–31', 'must', ['terms', 'list'], [`Paraphrasing (many forms → one meaning) vs ambiguity (one form → many meanings), with one example per level: telescope (syntax), star (semantics), she (discourse), door is open (pragmatics).`, `إعادة الصياغة مقابل الغموض مع مثال لكل مستوى: المنظار، النجم، هي، الباب مفتوح.`], [`Slide 31 lists "Semantics" as a challenge, but the linguistic-knowledge slides (25–27) do not define it.`, `الشريحة 31 تذكر "الدلالة" كتحدٍّ، لكن شرائح المعرفة اللغوية لا تعرّفها.`]]
    },
    essays: [['1'], ['2'], ['3'], ['4', '7'], ['3'], ['6'], ['7'], ['5'], ['3', '4', '7'], ['6', '7']],
    rev: [['1'], ['2'], ['3'], ['4'], ['5'], ['6'], ['7'], ['7', '6']],
    fc: [['1'], ['2'], ['3'], ['3'], ['4'], ['4'], ['5'], ['5'], ['5'], ['6'], ['6'], ['6'], ['7'], ['7']],
    sa: [['1'], ['3'], ['7'], ['6'], ['7'], ['5'], ['4']],
    quiz: [['3'], ['4'], ['7'], ['3'], ['7'], ['5']],
    maps: ['2–31', '25–31']
  },
  ch2: {
    note: [`Practice slides 63–64 are printed as "P1" and "P2".`, `شريحتا التمرين 63 و64 مطبوعتان كـ "P1" و"P2".`],
    sec: {
      c2s1: ['2–4', 'imp', ['core']],
      c2s2: ['5', 'must', ['terms'], [`Corpus, word type (|V|), word instance (N), orthographic word, function vs content words, tokenization.`, `المدونة، نوع الكلمة |V|، ورودها N، الكلمة الإملائية، كلمات الوظيفة والمحتوى، الترميز.`]],
      c2s3: ['6–7', 'imp', ['example']],
      c2s4: ['8–9', 'must', ['calc', 'sum'], [`Instance vs type vs wordform vs lemma; "the cat saw the dog and the bird" → N = 8, |V| = 6; every count states its tokenization assumption (skill 1).`, `الورود والنوع والشكل والأصل؛ N = 8 و|V| = 6؛ ذكر افتراض الترميز مع كل عدّ.`]],
      c2s5: ['10–11', 'must', ['terms', 'motiv'], [`|V| = k·N^β with 0 < β < 1 (≈ 0.44–0.56); vocabulary keeps growing, more slowly than the corpus, so subwords are needed.`, `|V| = k·N^β و0 < β < 1؛ المفردات تنمو ببطء دون توقف فنحتاج الوحدات الفرعية.`]],
      c2s6: ['12–17', 'must', ['calc', 'sum'], [`Operator table; \\b[tT]he\\b; false positive lowers precision, false negative lowers recall; P = 9/14 = 0.64, R = 9/10 = 0.90.`, `جدول المعاملات؛ النمط \\b[tT]he\\b؛ الإيجابي الخاطئ يخفض الدقة والسلبي الخاطئ يخفض الاستدعاء.`]],
      c2s7: ['18–19', 'must', ['terms'], [`Definitions: text normalization, morpheme, root, affix, inflectional vs derivational, clitic, sentence segmentation, stemming, lemmatization.`, `تعريفات: التوحيد، المورفيم، الجذر، الزائدة، التصريفي والاشتقاقي، اللاحقة المتصلة، تقسيم الجمل، التجذيع، الإرجاع المعجمي.`]],
      c2s8: ['20–21', 'must', ['cmp', 'sum'], [`Normalization = equivalence classes; ask whether the task needs the distinction; case folding helps IR, hurts NER (US vs us) (skill 2).`, `التوحيد فئات تكافؤ؛ هل تحتاج المهمة التمييز؟ تحويل الحالة يفيد الاسترجاع ويضر NER.`]],
      c2s9: ['22', 'must', ['cmp'], [`Stemming (heuristic, automat) vs lemmatization (dictionary form, be; depends on POS: saw) vs stop-word removal ("not good" → "good").`, `التجذيع مقابل الإرجاع المعجمي مقابل حذف كلمات التوقف.`]],
      c2s10: ['23', 'imp', ['practical']],
      c2s11: ['24', 'imp', ['core']],
      c2s12: ['25', 'imp', ['example']],
      c2s13: ['26', 'add', ['example']],
      c2s14: ['27–28, 30', 'must', ['terms', 'list'], [`OOV, character and subword definitions; the four failures of fixed word vocabularies (unknown words, large vocabulary, no shared structure, poor multilingual scaling).`, `تعريفات OOV والحرف والوحدة الفرعية؛ والقيود الأربعة للمفردات الثابتة.`]],
      c2s15: ['28, 31–32', 'must', ['terms', 'core'], [`Token learner (trains on a corpus, counts, merges) vs token segmenter (replays merges in learned order, never recounts).`, `المتعلّم (يعدّ ويدمج) مقابل المقسِّم (يعيد تطبيق الدمجات بالترتيب دون عدّ).`]],
      c2s16: ['28, 33–35', 'must', ['core', 'list'], [`The BPE loop (start with characters → count pairs → merge most frequent → rewrite → recount, k times); final |V| = |V₀| + k.`, `حلقة BPE وحجم المفردات النهائي |V₀| + k.`]],
      c2s17: ['36–42, 63', 'must', ['calc', 'sum'], [`Run the merges n+e → ne, ne+w → new, ▁+r → ▁r, ▁r+e → ▁re (|V| 7 → 11); segment retest → ▁re t e s t and newest → ▁ new e s t (skill 4).`, `تنفيذ الدمجات الأربعة وتقسيم retest وnewest.`]],
      c2s18: ['29, 43–45', 'must', ['terms', 'calc'], [`Byte-level BPE has no UNK (only 256 byte values); UTF-8 uses 1–4 bytes; ñ = U+00F1 → C3 B1 (slide 64 check); oversegmentation of underrepresented languages.`, `BPE بالبايت بلا مجهول؛ UTF-8 من 1 إلى 4 بايتات؛ ñ ← C3 B1؛ الإفراط في التقسيم.`]],
      c2s19: ['29, 46–49', 'must', ['cmp', 'terms'], [`BPE merges · WordPiece scores · Unigram prunes · SentencePiece is a toolkit; WordPiece score = count(pair)/(count(a)·count(b)); hug/pug example (BPE ##u##g vs WordPiece ##g##s).`, `BPE يدمج · WordPiece يقيّم · Unigram يقلّم · SentencePiece مكتبة؛ ومثال hug/pug.`]],
      c2s20: ['50', 'imp', ['sum', 'practical']],
      c2s21: ['51–53', 'must', ['terms'], [`MED and Levenshtein definitions; insert / delete / substitute; intention → execution = 5 (or 8 if substitution costs 2); always state the cost scheme.`, `تعريف مسافة التحرير وليفنشتاين؛ العمليات الثلاث؛ 5 أو 8.`]],
      c2s22: ['54–55', 'must', ['core', 'sum'], [`D[i,j] = min(above + 1 delete, left + 1 insert, diagonal + 0/1); row 0 and column 0 = 0, 1, 2, …; answer in D[n, m].`, `العلاقة بالجيران الثلاثة والتهيئة والإجابة في الخلية الأخيرة.`]],
      c2s23: ['56–58', 'must', ['calc', 'sum'], [`Fill the flaw → lawn table (MED = 2) and backtrace it: delete f, match l a w, insert n (skill 5).`, `ملء جدول flaw ← lawn (= 2) والتتبع: حذف f وإدراج n.`]],
      c2s24: ['52, 57, 64', 'must', ['calc', 'terms'], [`WER = (S + D + I) / N_reference; "the cat sit on mat" vs 6-word reference → 2/6 = 0.33.`, `WER = (S + D + I) / عدد كلمات المرجع؛ المثال = 0.33.`]]
    },
    essays: [['3', '12'], ['4'], ['5', '14'], ['6'], ['8', '9'], ['10', '11'], ['14'], ['15', '16', '17'], ['19'], ['18'], ['21', '22', '23'], ['8', '10', '12', '14', '18'], ['24'], ['1', '4', '8', '14', '21']],
    rev: [['1'], ['4'], ['5'], ['6'], ['6'], ['8'], ['9'], ['7'], ['11'], ['14'], ['15', '16'], ['17'], ['18'], ['19'], ['21', '22', '23'], ['24']],
    fc: [['2'], ['2', '4'], ['5'], ['2', '3'], ['6'], ['6'], ['8'], ['7'], ['7'], ['14'], ['16'], ['15'], ['19'], ['19'], ['18'], ['18'], ['21'], ['22'], ['24']],
    sa: [['4'], ['6'], ['6'], ['9'], ['16'], ['17'], ['21'], ['24'], ['17'], ['19']],
    quiz: [['5'], ['6'], ['9'], ['15'], ['19'], ['18'], ['23'], ['21']],
    maps: ['3–58', '28, 32–49', '18–26']
  },
  ch3: {
    sec: {
      c3s1: ['3–5', 'imp', ['motiv', 'list']],
      c3s2: ['6', 'must', ['terms', 'sum'], [`LM = assigns probabilities to next words P(w | h) or complete sequences P(w₁ … wₙ).`, `النموذج اللغوي يُسند احتمالات للكلمة التالية أو للسلسلة.`]],
      c3s3: ['7', 'imp', ['motiv']],
      c3s4: ['8', 'must', ['terms', 'sum'], [`n-gram = n consecutive tokens; an n-gram model uses only the previous n − 1 tokens.`, `n-gram = n رموز متتالية ويستخدم آخر n − 1.`]],
      c3s5: ['9', 'must', ['terms', 'sum'], [`P(wₙ | w₁…wₙ₋₁) ≈ P(wₙ | wₙ₋ₙ₊₁…wₙ₋₁); an approximation; fails on long-distance dependencies ("The computer … crashed").`, `صيغة ماركوف؛ تقريب؛ يفشل مع الاعتماديات البعيدة.`]],
      c3s6: ['10–11', 'must', ['core', 'cmp'], [`Chain rule P = Π P(wᵢ | w₁:ᵢ₋₁) vs bigram Π P(wᵢ | wᵢ₋₁); the unigram / bigram / trigram table (history used, trade-off).`, `قاعدة السلسلة مقابل التقريب الثنائي؛ جدول الأحادي والثنائي والثلاثي.`]],
      c3s7: ['12–13', 'must', ['terms', 'sum'], [`MLE: P(wᵢ | wᵢ₋₁) = C(wᵢ₋₁ wᵢ) / C(wᵢ₋₁); the denominator is the count of the history.`, `صيغة التقدير؛ المقام عدد التاريخ.`]],
      c3s8: ['14–16, 38', 'must', ['calc'], [`From a tiny corpus compute bigram probabilities (P(like | I) = 1, P(AI | like) = 1/2, P(NLP | AI) = 0) and a sentence probability (1/3).`, `حساب احتمالات الثنائي واحتمال الجملة 1/3.`]],
      c3s9: ['17', 'imp', ['practical']],
      c3s10: ['18', 'imp', ['core']],
      c3s11: ['19', 'imp', ['practical']],
      c3s12: ['20', 'must', ['cmp'], [`Intrinsic (perplexity; fast, cheap) vs extrinsic (inside a task, e.g. speech recognition accuracy; realistic, expensive).`, `الداخلي (الحيرة) مقابل الخارجي (داخل مهمة).`]],
      c3s13: ['21–23', 'must', ['terms', 'calc', 'sum'], [`PP(W) = P(W)^(−1/N); lower is better; 0.5 · 0.25 · 0.25 → ≈ 3.17; compare only on the same test set and tokenisation.`, `صيغة الحيرة؛ الأقل أفضل؛ مثال 3.17؛ نفس مجموعة الاختبار والترميز.`]],
      c3s14: ['24', 'imp', ['example']],
      c3s15: ['25', 'must', ['sum'], [`One unseen n-gram ("denied the offer") gets P = 0 and makes the whole sentence probability 0.`, `n-gram غير مرئي يعطي صفرًا ويجعل احتمال الجملة صفرًا.`]],
      c3s16: ['26', 'must', ['cmp', 'sum'], [`Closed vs open vocabulary; <UNK> procedure (choose vocabulary → replace rare words with <UNK> → estimate it like any token); OOV rate.`, `المفردات المغلقة مقابل المفتوحة؛ خطوات <UNK>؛ نسبة OOV.`]],
      c3s17: ['27–29', 'must', ['terms', 'calc', 'sum'], [`Add-one: (C(h, w) + 1) / (C(h) + V); P(NLP | AI) = 1/8 = 0.125; too aggressive when V is large.`, `صيغة لابلاس؛ 1/8؛ عنيف مع V كبيرة.`], [`Slide 29 states V = 6 without listing the vocabulary. It matches the six words of the practice corpus on slide 15 (I, like, NLP, AI, is, useful).`, `الشريحة 29 تذكر V = 6 دون سرد المفردات، وتطابق الكلمات الست في مدونة الشريحة 15.`]],
      c3s18: ['30', 'imp', ['list']],
      c3s19: ['31', 'must', ['cmp', 'sum'], [`Backoff = fallback, one model at a time; interpolation = λ₁P_uni + λ₂P_bi + λ₃P_tri, all contribute, λ from dev data, sum to 1.`, `الرجوع احتياطي بنموذج واحد؛ الاستيفاء مزيج بأوزان λ مجموعها 1.`]],
      c3s20: ['32', 'add', ['depth']],
      c3s21: ['33–36', 'must', ['sum', 'cmp'], [`Generation loop: <s> → probabilities → sample → append → repeat until </s>; sampling (varied) vs greedy (predictable, repetitive).`, `حلقة التوليد؛ المعاينة مقابل الجشع.`]],
      c3s22: ['37', 'imp', ['practical', 'list']]
    },
    essays: [['1', '2'], ['5', '6'], ['6', '10', '13', '21'], ['7', '8'], ['13'], ['11', '12'], ['15', '16'], ['17', '18'], ['19', '20'], ['21'], ['22', '11', '16', '19'], ['2', '4', '5', '7', '13', '17']],
    rev: [['2'], ['3', '5'], ['6'], ['7'], ['8'], ['9'], ['10'], ['11'], ['12'], ['13'], ['15', '16'], ['17'], ['18'], ['19'], ['20'], ['21']],
    fc: [['2'], ['4'], ['5'], ['7'], ['7'], ['9'], ['13'], ['13'], ['12'], ['15'], ['16'], ['17'], ['18'], ['19'], ['20']],
    sa: [['8'], ['8', '15'], ['17'], ['13'], ['11'], ['16'], ['17'], ['19']],
    quiz: [['7'], ['13'], ['13'], ['17'], ['19'], ['12'], ['20']],
    maps: ['3–40', '27–32']
  },
  ch4: {
    sec: {
      c4s1: ['3', 'must', ['terms'], [`ML: learn a pattern from examples instead of only hand-written rules; input = features, output = prediction, goal = generalize to new texts.`, `تعريف تعلّم الآلة والمدخل والمخرج والهدف.`]],
      c4s2: ['4', 'must', ['cmp'], [`Rules (explicit if–then, clear, fragile) vs ML (learns from data, handles interacting features, needs labeled data); the "free credit" spam example.`, `القواعد مقابل تعلّم الآلة مع مثال free credit.`]],
      c4s3: ['5', 'imp', ['motiv', 'list']],
      c4s4: ['6', 'must', ['terms', 'sum'], [`Training set of (x, y) pairs; classifier maps a new x to ŷ; x and y known in training, only x in prediction.`, `أزواج (x, y)؛ المصنف يحوّل x إلى ŷ.`]],
      c4s5: ['7–8', 'must', ['terms', 'list'], [`Classification = one label from a fixed set C (categorical, not regression); four tasks: sentiment, topic, spam, language identification.`, `التصنيف فئوي لا انحدار؛ والمهام الأربع.`]],
      c4s6: ['9', 'must', ['list'], [`Six steps: define task → collect & label → represent text → choose classifier → train & tune → evaluate; the test set is never used for training or tuning.`, `الخطوات الست وعدم استخدام الاختبار للتدريب.`]],
      c4s7: ['10–11', 'imp', ['core', 'example']],
      c4s8: ['12', 'imp', ['example']],
      c4s9: ['13–14', 'must', ['terms', 'sum'], [`ĉ = argmax P(c) Π P(wᵢ | c); P(d) dropped (same for all classes); naive assumption = conditional independence given the class; log version adds.`, `قاعدة القرار وحذف P(d) والافتراض الساذج والصيغة اللوغاريتمية.`]],
      c4s10: ['15', 'must', ['core', 'sum'], [`P(c) = docs in c / total docs; P(w | c) = (count(w, c) + 1) / (tokens in c + |V|); smoothing for words unseen in a class, OOV words dropped.`, `صيغ القبلي والاحتمالية وadd-1؛ وحذف الكلمات المجهولة.`]],
      c4s11: ['16–17', 'must', ['calc'], [`"predictable with no fun": drop "with"; denominators 34 and 29; 6.1 × 10⁻⁵ (NEG) > 3.3 × 10⁻⁵ (POS) → negative.`, `مثال NB: حذف with؛ المقامان 34 و29؛ النتيجة سلبي.`], [`Slide 16 gives only a training summary (class counts, token counts, |V| = 20); the training documents themselves are not shown.`, `الشريحة 16 تعطي ملخص التدريب فقط دون مستندات التدريب نفسها.`]],
      c4s12: ['18–20', 'must', ['terms', 'sum'], [`z = w · x + b; σ(z) = 1 / (1 + e⁻ᶻ); σ(0) = 0.5 is the decision boundary; predict 1 if P ≥ 0.5.`, `z والدالة السينية وحد القرار 0.5.`]],
      c4s13: ['21', 'must', ['calc'], [`z = 2.5(3) − 5(2) − 1.2(1) + 0.5(3) + 0 + 0.7(4.19) + 0.1 = 0.833 → σ = 0.70 → positive.`, `z = 0.833 والاحتمال 0.70 إيجابي.`]],
      c4s14: ['22', 'imp', ['core']],
      c4s15: ['23–25', 'must', ['terms', 'calc'], [`Softmax P(y = k | x) = exp(zₖ) / Σ exp(zⱼ) for multiclass; outputs positive and sum to 1; sigmoid = binary.`, `صيغة softmax للمتعدد؛ مخرجات موجبة مجموعها 1.`]],
      c4s16: ['26', 'must', ['cmp', 'sum'], [`NB generative (P(words | class), counts, independence assumption) vs LR discriminative (P(class | text), learned weights, handles correlated features).`, `NB توليدي مقابل LR تمييزي.`]],
      c4s17: ['27', 'must', ['sum', 'motiv'], [`Accuracy misleads with imbalance (95% not-spam → 95% accuracy); confusion matrix cells TP, FN, FP, TN.`, `فخ الدقة الإجمالية ومصفوفة الالتباس.`]],
      c4s18: ['28–29', 'must', ['terms', 'calc', 'sum'], [`Precision TP/(TP+FP), recall TP/(TP+FN), F1 2PR/(P+R); spam example 0.80 / 0.67 / 0.73.`, `صيغ الدقة والاستدعاء وF1 ومثال 0.80/0.67/0.73.`]],
      c4s19: ['30–31', 'must', ['sum', 'list'], [`Train (parameters) / dev (tuning) / test (final only); imbalance: detect, evaluate with P/R/F1, stratified split, class weighting or resampling of training data only.`, `أدوار المجموعات الثلاث وخطوات معالجة عدم التوازن.`]]
    },
    essays: [['1', '2', '3'], ['4', '5', '6'], ['7'], ['9', '10'], ['10', '11'], ['12', '13'], ['14'], ['15'], ['16'], ['17', '18'], ['19', '17', '18']],
    rev: [['1'], ['2'], ['3'], ['4', '5'], ['6'], ['7'], ['9'], ['10'], ['11'], ['12'], ['13'], ['14'], ['15'], ['16'], ['18'], ['19']],
    fc: [['1'], ['4'], ['5'], ['7'], ['9'], ['9'], ['10'], ['12'], ['12'], ['14'], ['15'], ['16'], ['18'], ['18'], ['18'], ['19']],
    sa: [['11'], ['12'], ['15'], ['18'], ['18'], ['10', '11'], ['19'], ['19']],
    quiz: [['16'], ['9'], ['13'], ['15'], ['18'], ['18'], ['19']],
    maps: ['3–31', '27–31']
  },
  ch5: {
    note: [`On the slides themselves, the printed slide number is one lower than the PDF page from page 7 onward (page 8 shows "7"). This site uses PDF page numbers.`, `في الشرائح نفسها يكون الرقم المطبوع أقل بواحد من رقم صفحة PDF ابتداءً من الصفحة 7. هذا الموقع يستخدم أرقام صفحات PDF.`],
    sec: {
      c5s1: ['3–4', 'imp', ['motiv']],
      c5s2: ['2, 5–6', 'must', ['core', 'sum'], [`Reading rule: first ask whether a vector represents a word or a document; cosine compares vectors and is not a representation; TF-IDF modifies BoW, PPMI modifies co-occurrence counts.`, `قاعدة القراءة: كلمة أم مستند؛ جيب التمام ليس تمثيلًا؛ ما يبنى على ماذا.`]],
      c5s3: ['8', 'imp', ['core']],
      c5s4: ['9–10', 'must', ['terms', 'sum'], [`One-hot = 1 at the word's position, 0 elsewhere; identity only; all different words orthogonal (no similarity); |V| dimensions.`, `تعريف one-hot؛ هوية فقط؛ كل الكلمات متعامدة.`]],
      c5s5: ['11–13', 'must', ['terms', 'calc', 'sum'], [`BoW = count vector = sum of one-hots ("good plot good movie" → [2, 1, 0, 1, 0]); keeps terms + counts, loses order ("dog bites man"), sense and similarity.`, `BoW مجموع one-hot؛ ما يحفظه وما يفقده.`]],
      c5s6: ['15', 'imp', ['motiv']],
      c5s7: ['16–17', 'must', ['terms', 'calc'], [`TF = 1 + log₁₀ count (0 if count = 0); DF = number of documents containing the term (DF(cat) = 2, not 4).`, `صيغة TF؛ DF يعدّ المستندات.`]],
      c5s8: ['18–19', 'must', ['terms', 'sum'], [`IDF = log₁₀(N / DF); TF-IDF = TF × IDF; a term in every document gets 0; high = frequent here, rare elsewhere.`, `IDF وTF-IDF؛ المصطلح في كل المستندات وزنه 0.`]],
      c5s9: ['20–22', 'must', ['calc'], [`Collection of 4 documents: IDF cats 0.12, chase/mice/eat 0.30, birds/fish/cheese 0.60; D4 = [mice 0.30, eat 0.30, cheese 0.60].`, `قيم IDF ومتجه D4.`]],
      c5s10: ['24–26', 'must', ['terms', 'calc', 'sum'], [`cos = x·y / (‖x‖‖y‖); [1,2,0] vs [2,1,0] → 0.80; range −1…1 (0…1 for BoW/TF-IDF); length-independent; cos 0 = no shared term, not "opposite".`, `صيغة جيب التمام والمدى والحالات الخاصة.`]],
      c5s11: ['27–28', 'must', ['calc'], [`cos(D1, D2) = 0.35 with TF-IDF vs 0.67 with raw counts, because the shared term "cats" has a small IDF; D1 is closest to D2.`, `0.35 مقابل 0.67 وسببه.`]],
      c5s12: ['30', 'imp', ['terms']],
      c5s13: ['31', 'must', ['terms', 'sum'], [`Distributional hypothesis: words that occur in similar contexts tend to have similar meanings.`, `الفرضية التوزيعية.`]],
      c5s14: ['32–33', 'must', ['terms', 'calc'], [`Rows = target words, columns = context words; P(w) = row total/N, P(c) = column total/N; cos(digital, information) ≈ 0.996 vs cos(cherry, information) ≈ 0.018.`, `بنية المصفوفة والاحتمالات ومثال جيب التمام.`]],
      c5s15: ['34–36', 'must', ['terms', 'calc', 'sum'], [`PMI = log₂ P(w,c)/(P(w)P(c)); PMI(cherry, pie) = 4.38; PPMI = max(PMI, 0) because negative estimates are unreliable; PPMI vectors stay sparse.`, `صيغة PMI ومثال 4.38؛ PPMI وسبب القص؛ ما زال متناثرًا.`]],
      c5s16: ['37', 'must', ['cmp', 'sum'], [`Sparse PPMI (10,000–50,000 dims, mostly zero) vs dense (50–1,000 learned dims, fewer weights, synonyms close).`, `جدول المتناثر مقابل الكثيف.`]],
      c5s17: ['38–39', 'must', ['terms', 'cmp'], [`Skip-gram (centre → context) vs CBOW (context → centre, faster); SGNS: positive pair (cherry, pie) = 1 vs random negatives = 0; context window ±2.`, `skip-gram مقابل CBOW وSGNS ونافذة السياق.`]],
      c5s18: ['40–41', 'must', ['cmp', 'sum'], [`GloVe fits word·context + biases ≈ ln Xᵢⱼ from global counts; Word2Vec predictive/local vs GloVe count-based/global; both dense and static.`, `GloVe ومقارنته بـ Word2Vec.`]],
      c5s19: ['42–43', 'imp', ['core']],
      c5s20: ['45', 'must', ['sum', 'cmp'], [`Intrinsic (similarity, relatedness, analogy, bias tests) vs extrinsic (F1, retrieval, NER); SimLex-999 = similarity, WordSim-353 = relatedness.`, `التقييم الداخلي والخارجي وSimLex وWordSim.`]],
      c5s21: ['46', 'must', ['sum', 'terms'], [`Bias = systematic association between words and a social group, learned from text; programmer − man + woman ≈ homemaker; inspect before sensitive use.`, `تعريف التحيز ومثاله.`]],
      c5s22: ['47–49', 'must', ['cmp', 'sum'], [`Comparison table (unit, sparse/dense, signal, order); choose: search → TF-IDF, classification → TF-IDF + LR, similarity → Word2Vec/GloVe, prototype → BoW.`, `جدول المقارنة واختيار التمثيل حسب المهمة.`]]
    },
    essays: [['1', '2'], ['4', '5'], ['6', '7', '8', '9'], ['10', '11'], ['13', '14'], ['15'], ['16', '17'], ['18'], ['19', '20', '21'], ['22'], ['4', '5', '8', '10', '15', '16', '17', '18', '20', '21', '22']],
    rev: [['2'], ['3'], ['4'], ['5'], ['7', '8'], ['9'], ['10', '11'], ['12'], ['13'], ['14'], ['15'], ['16'], ['17'], ['18'], ['20'], ['21'], ['22']],
    fc: [['4'], ['5'], ['7'], ['7'], ['8'], ['8'], ['10'], ['13'], ['15'], ['15'], ['16'], ['17'], ['17'], ['17'], ['18'], ['21']],
    sa: [['7'], ['8'], ['10'], ['11'], ['17'], ['15'], ['19'], ['20']],
    quiz: [['5'], ['8'], ['10'], ['15'], ['17'], ['18'], ['20'], ['22']],
    maps: ['2–50', '14–22', '29–41']
  },
  ch6: {
    sec: {
      c6s1: ['2–3', 'imp', ['outcome', 'core']],
      c6s2: ['5', 'imp', ['motiv']],
      c6s3: ['6–7', 'must', ['terms', 'calc', 'sum'], [`z = wᵀx + b, a = σ(z); x = [2, 1], w = [0.5, −1], b = 0.1 → z = 0.1, a ≈ 0.5250; one sigmoid unit = logistic regression.`, `صيغة الوحدة ومثالها؛ وحدة سينية واحدة = انحدار لوجستي.`]],
      c6s4: ['8, 11, 55', 'must', ['terms', 'cmp'], [`Without activations stacked affine layers collapse into one; sigmoid (0, 1), tanh (−1, 1), ReLU max(0, z); sigmoid/tanh saturate.`, `سبب التنشيط؛ مدى الدوال الثلاث؛ التشبع.`], [`The vanishing-gradient explanation comes from the textbook page reproduced on slide 11, not from the lecture's own text.`, `شرح تلاشي التدرج مأخوذ من صفحة الكتاب المعروضة في الشريحة 11 لا من نص المحاضرة.`]],
      c6s5: ['9', 'must', ['terms'], [`Feedforward = layers, no loops; W (input → hidden), U (hidden → output); logits = one score per class; softmax → probabilities; training reduces a loss.`, `الشبكة الأمامية وW وU وlogits وsoftmax والخسارة.`]],
      c6s6: ['10–13', 'must', ['sum', 'calc'], [`Perceptron AND (weights 1, 1, bias −1) and OR (bias 0); perceptron = linear classifier; XOR not linearly separable; hidden ReLU construction y = h₁ − 2h₂.`, `AND وOR؛ الوحدة مصنف خطي؛ XOR غير قابل للفصل؛ حل الطبقة المخفية.`]],
      c6s7: ['15–16', 'must', ['terms', 'sum', 'outcome'], [`Embedding layer = trainable table E (V × d); a token ID selects a row; IDs are categorical (ID 12 is not twice ID 6).`, `جدول E؛ الرقم يختار صفًّا؛ الأرقام فئوية.`]],
      c6s8: ['17', 'must', ['cmp', 'sum'], [`Mean pooling ([0.5, 0.5]) ignores order; concatenation ([1, 0, 0, 1]) keeps positions.`, `المتوسط يتجاهل الترتيب والضم يحفظه.`]],
      c6s9: ['19–20', 'must', ['core', 'outcome'], [`Next-token prediction = multiclass classification over the V vocabulary words; targets come from the text itself (self-supervised).`, `التنبؤ بالرمز التالي تصنيف متعدد ذاتي الإشراف.`]],
      c6s10: ['21–22', 'must', ['core', 'outcome'], [`h = ReLU(Wx + b_h), p = softmax(Uh + b_o); shapes: E V×d, x kd×1, W H×kd, U V×H, z and p V×1.`, `الصيغتان والأبعاد.`]],
      c6s11: ['23–26', 'must', ['calc', 'outcome'], [`Wx + b_h = [1, 1] → h = [1, 1]; z = [0, 1, 2]; p ≈ [0.0900, 0.2447, 0.6652] → predicts NLP.`, `خطوات التمرير الأمامي وقيمها.`]],
      c6s12: ['27', 'imp', ['core']],
      c6s13: ['29–30', 'must', ['terms', 'calc', 'sum'], [`L = −ln p(true token); 0 when p = 1, large for confident wrong predictions; worked loss 0.4076 nats; maximum likelihood = minimum loss.`, `صيغة الخسارة وسلوكها والقيمة 0.4076.`]],
      c6s14: ['31–34', 'must', ['core', 'sum'], [`Forward → loss → backpropagation (chain rule) → gradient-descent update w ← w − η∇L; softmax + CE logit gradient = p − y.`, `حلقة التدريب وقاعدة التحديث وتدرج p − y.`]],
      c6s15: ['35', 'imp', ['practical']],
      c6s16: ['36–41, 62', 'must', ['calc', 'outcome', 'sum'], [`H = mean −ln pₜ; PPL = exp(H) = inverse geometric mean; 0.5/0.25/0.125 → 4; 0.8/0.2 → 2.5 (not 2); uniform over V → PPL = V; corpus PPL = total loss / total tokens.`, `متوسط الخسارة والحيرة والأمثلة.`]],
      c6s16b: ['43', 'must', ['outcome', 'sum'], [`A fixed-window LM cannot use evidence outside its k tokens; a wider window enlarges x and W.`, `النافذة الثابتة لا ترى خارج k رموز، وتوسيعها يكبّر x وW.`]],
      c6s17: ['44, 46, 56–57', 'add', ['depth']],
      c6s18: ['45–48, 58–60, 62', 'add', ['depth']],
      c6s19: ['49–50', 'imp', ['cmp']],
      c6s20: ['54–55, 61–62', 'add', ['depth']]
    },
    essays: [['3'], ['4'], ['6'], ['7', '8'], ['9', '10'], ['11', '13', '14'], ['13'], ['14'], ['16'], ['19', '12', '16b'], ['18'], ['15', '7'], ['16b', '8', '10', '17']],
    rev: [['1'], ['3'], ['4'], ['5'], ['6'], ['7'], ['8'], ['9'], ['10', '11'], ['13'], ['14'], ['14'], ['15'], ['16'], ['16'], ['17'], ['18']],
    fc: [['3'], ['4'], ['4'], ['6'], ['6'], ['7'], ['8'], ['5'], ['9'], ['13'], ['14'], ['14'], ['14'], ['16'], ['17'], ['18'], ['17']],
    sa: [['3'], ['6'], ['10'], ['11'], ['16'], ['20', '7'], ['18'], ['14']],
    quiz: [['3'], ['4'], ['6'], ['8'], ['13'], ['16'], ['18'], ['15']],
    maps: ['2–51', '45–48, 58–60']
  },
  ch7: {
    note: [`From page 37 onward the printed slide number is one lower than the PDF page, because two slides are numbered 36. This site uses PDF page numbers.`, `ابتداءً من الصفحة 37 يكون الرقم المطبوع أقل بواحد من رقم صفحة PDF لأن شريحتين تحملان الرقم 36. هذا الموقع يستخدم أرقام صفحات PDF.`],
    sec: {
      c7s1: ['3', 'must', ['terms', 'outcome'], [`LM assigns a probability to every possible next token; LLM = large network on very large text (GPT-3: 96 layers, 175B); stages: pretraining → instruction tuning → preference alignment → RL for reasoning.`, `تعريف LM وLLM ومراحل التدريب الأربع.`]],
      c7s2: ['4–5', 'imp', ['core']],
      c7s3: ['7–9', 'must', ['core', 'outcome'], [`Causal: position t reads 1…t (lower-triangular, diagonal allowed because t predicts t + 1, blocked scores = −∞ before softmax); bidirectional: all positions.`, `مصفوفة الرؤية السببية مقابل الثنائية والإقناع بـ −∞.`], [`Slide 7 is a figure only (textbook Figure 9.1). Its content is described in words here.`, `الشريحة 7 شكل فقط (الشكل 9.1 من الكتاب) ومحتواه موصوف هنا بالكلمات.`]],
      c7s4: ['10–13', 'must', ['cmp', 'outcome'], [`Encoder-only (BERT, RoBERTa: bidirectional, vectors → labels), decoder-only (GPT: causal, continuation), encoder-decoder (T5, BART: full source + cross-attention, generated target).`, `العائلات الثلاث: السياق والمخرج والأمثلة.`]],
      c7s5: ['15', 'must', ['list', 'outcome'], [`Sources → quality filtering → safety filtering (can wrongly flag minority dialects) → tokenisation; data decides evidence, objective decides prediction.`, `خطوات معالجة البيانات؛ البيانات مقابل الهدف.`]],
      c7s6: ['16', 'must', ['cmp', 'terms'], [`Causal (prefix → next token), masked (manipulated input → original selected tokens), denoising (corrupted source → clean sequence or spans); self-supervised.`, `الأهداف الثلاثة: المدخل والهدف.`]],
      c7s7: ['17–18', 'must', ['calc', 'terms'], [`Targets = input shifted by one; teacher forcing feeds correct earlier tokens in training; mean loss for 0.5, 0.8, 0.4, 0.9 = 0.4845 nats.`, `الأهداف المزاحة وteacher forcing والمتوسط 0.4845.`]],
      c7s8: ['19–21', 'must', ['calc', 'core'], [`Why mask (target would be visible with bidirectional attention); only selected positions get a loss; (0.2231 + 1.3863 + 0.6931)/3 = 0.7675, divided by 3 not 8.`, `سبب الإقناع؛ المواضع المختارة فقط؛ 0.7675.`]],
      c7s9: ['22–25', 'must', ['cmp', 'calc'], [`T5-style spans: "The lecture [missing span] in room [missing span]" → "starts at 11:00 | 1090"; what each objective scores; checkpoint answers (NLP, 6, full source yes / future no).`, `إزالة التشويش وما يقيّمه كل هدف وإجابات المراجعة.`]],
      c7s10: ['27–28', 'must', ['cmp', 'outcome'], [`Tag a sentence → encoder-only (no generation); source-conditioned summary → encoder-decoder; continue a prefix → decoder-only; only text output needs decoding.`, `اختيار العائلة حسب المهمة ومتى نحتاج فك الترميز.`]],
      c7s11: ['29–30', 'must', ['core'], [`Each step: compute logits → form probabilities → select a token → append → check the stopping rule.`, `خطوات حلقة التوليد.`]],
      c7s12: ['31–33', 'must', ['calc', 'cmp'], [`Greedy picks tea then please (0.26); beam width 2 keeps tea and coffee and finds coffee please (0.27); beam common in MT.`, `الجشع 0.26 مقابل الحزمي 0.27.`]],
      c7s13: ['34–37', 'must', ['calc', 'terms'], [`Sampling intervals (u = 0.70 → water); pᵢ(T) = exp(zᵢ/T)/Σexp(zⱼ/T); T = 0.5 → tea 0.5818, T = 2 → 0.2984; ranking (argmax) unchanged.`, `فترات المعاينة وصيغة الحرارة وقيمها.`]],
      c7s14: ['38–42', 'must', ['calc', 'cmp'], [`Top-k = 2 → [0.6154, 0.3846]; top-p = 0.80 → tea, coffee, water [0.4706, 0.2941, 0.2353]; k fixes the count, p fixes the mass.`, `قيم top-k وtop-p والفرق بينهما.`]],
      c7s15: ['43–46', 'imp', ['sum', 'example']],
      c7s16: ['48–50', 'add', ['depth']]
    },
    essays: [['1', '2'], ['4'], ['3'], ['5'], ['6', '9'], ['7'], ['8'], ['12'], ['13', '14'], ['11', '10'], ['15', '10'], ['3', '5', '6', '8', '10', '14']],
    rev: [['1'], ['1'], ['2'], ['3'], ['4'], ['4'], ['4'], ['5'], ['5'], ['7'], ['8'], ['9'], ['10'], ['11'], ['12'], ['13'], ['14']],
    fc: [['1'], ['1'], ['3'], ['3'], ['4'], ['4'], ['4'], ['7'], ['8'], ['9'], ['12'], ['12'], ['13'], ['14'], ['14'], ['5']],
    sa: [['9', '7'], ['9', '8'], ['9'], ['12'], ['13'], ['13'], ['14'], ['10']],
    quiz: [['4'], ['3'], ['4'], ['8'], ['12'], ['13'], ['14'], ['10']],
    maps: ['2–46', '29–42', '16–25']
  }
};

/* ---------- apply metadata to the chapter data ---------- */
(function applyMeta() {
  const problems = [];
  CH.forEach(ch => {
    const m = META[ch.id]; if (!m) { problems.push('no META for ' + ch.id); return; }
    ch.note = m.note || null;
    const byId = {};
    ch.sections.forEach(s => {
      byId[s.id] = s;
      const e = m.sec[s.id]; if (!e) { problems.push('no meta for section ' + s.id); return; }
      s.sl = e[0]; s.pri = e[1]; s.why = e[2]; s.mem = e[3] || null; s.flag = e[4] || null;
      if (s.pri === 'must' && !s.mem) problems.push('must without memorize text: ' + s.id);
    });
    Object.keys(m.sec).forEach(id => { if (!byId[id]) problems.push('meta for unknown section ' + id); });
    const prefix = ch.id.replace('ch', 'c') + 's';
    const link = (list, items, kind) => {
      if (!list) return;
      if (list.length !== items.length) problems.push(`${ch.id} ${kind}: ${list.length} links for ${items.length} items`);
      items.forEach((it, i) => {
        const ids = (list[i] || []).map(n => prefix + n);
        ids.forEach(id => { if (!byId[id]) problems.push(`${ch.id} ${kind}[${i}] links unknown section ${id}`); });
        it.secs = ids.filter(id => byId[id]);
      });
    };
    link(m.essays, ch.essays, 'essays'); link(m.rev, ch.revision, 'rev'); link(m.fc, ch.flashcards, 'fc');
    link(m.sa, ch.short, 'sa'); link(m.quiz, ch.quiz, 'quiz');
    (m.maps || []).forEach((sl, i) => { if (ch.maps[i]) ch.maps[i].sl = sl; });
    ch.secById = byId;
  });
  if (problems.length) console.warn('Metadata problems:\n' + problems.join('\n'));
  window.META_PROBLEMS = problems;
})();
