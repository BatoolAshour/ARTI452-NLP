/* Guided lessons – Week 2: Text Processing */
MISSIONS.ch2 = [
  { t: [`From raw text to tokens`, `من النص الخام إلى الرموز`], goal: [`Explain why models need token IDs, count instances and types, and explain Heaps' law.`, `اشرح لماذا تحتاج النماذج أرقام الرموز، واحسب الورود والأنواع، واشرح قانون Heaps.`], secs: ['1', '2', '3', '4', '5'] },
  { t: [`Finding patterns with regular expressions`, `البحث عن الأنماط بالتعابير النمطية`], goal: [`Read and write basic regex and connect errors to precision and recall.`, `اقرأ واكتب تعابير نمطية بسيطة واربط الأخطاء بالدقة والاستدعاء.`], secs: ['6'] },
  { t: [`Normalization: deciding what counts as the same`, `التوحيد: ما الذي يُعدّ متماثلًا`], goal: [`Choose normalization steps for a task and explain what information each one loses.`, `اختر خطوات التوحيد لمهمة ما واشرح ما تفقده كل خطوة.`], secs: ['7', '8', '9', '10', '11', '12', '13'] },
  { t: [`Subwords and Byte-Pair Encoding`, `الوحدات الفرعية وBPE`], goal: [`Explain why subwords are needed, run BPE merges by hand and compare BPE, WordPiece, Unigram and SentencePiece.`, `اشرح سبب الحاجة للوحدات الفرعية، ونفّذ دمجات BPE يدويًّا، وقارن بين الطرق.`], secs: ['14', '15', '16', '17', '18', '19', '20'] },
  { t: [`Minimum edit distance`, `مسافة التحرير الدنيا`], goal: [`Fill an edit-distance matrix, backtrace it and compute word error rate.`, `املأ جدول مسافة التحرير وتتبّعه واحسب معدل خطأ الكلمات.`], secs: ['21', '22', '23', '24'] }
];

LESSONS.c2s1 = {
  big: [`A model never sees letters. It sees a list of <b>integer IDs</b>, one per token. So before any model runs, we make three decisions: which forms count as the same (<b>normalization</b>), what the units are (<b>tokenization</b>), and which ID each unit gets (<b>vocabulary</b>).`, `النموذج لا يرى الحروف بل قائمة <b>أرقام صحيحة</b>، رقمًا لكل رمز. لذلك نتخذ ثلاثة قرارات قبل تشغيل أي نموذج: أي الأشكال متماثلة (<b>التوحيد</b>)، وما الوحدات (<b>الترميز</b>)، وما رقم كل وحدة (<b>المفردات</b>).`],
  why: [`These decisions change the vocabulary size, the length of every sequence, and what the model can represent at all. This whole lecture is about making them well.`, `هذه القرارات تغيّر حجم المفردات وطول كل سلسلة وما يستطيع النموذج تمثيله أصلًا، والمحاضرة كلها عن اتخاذها بشكل جيد.`],
  steps: [
    [`<b>Raw text:</b> "The cat sat."`, `<b>النص الخام:</b> "The cat sat."`],
    [`<b>Normalize:</b> decide The → the.`, `<b>التوحيد:</b> نقرر The ← the.`],
    [`<b>Tokenize:</b> the | cat | sat | .`, `<b>الترميز:</b> the | cat | sat | .`],
    [`<b>Map to IDs:</b> [1996, 4937, …]. The model then estimates P(next | context).`, `<b>التحويل إلى أرقام:</b> [1996, 4937, …] ثم يقدّر النموذج P(التالي | السياق).`],
    [`<b>The cost of a missing word:</b> if "cat" is not in the vocabulary and is split into c + at, the same sentence needs 5 IDs instead of 4.`, `<b>تكلفة الكلمة المفقودة:</b> إذا لم تكن cat في المفردات وقُسّمت إلى c + at، تحتاج الجملة 5 أرقام بدل 4.`]
  ],
  analogy: [`It's like a library catalogue: before a book can be found, someone decides what a "book" is (one volume or a series?), which spellings count as the same title, and which shelf number it gets. Different decisions give a different library.`, `يشبه فهرس المكتبة: قبل أن تجد كتابًا يقرر أحدهم ما هو "الكتاب" (مجلد واحد أم سلسلة؟)، وأي التهجئات تعني العنوان نفسه، وما رقم الرف. قرارات مختلفة تعطي مكتبة مختلفة.`],
  check: [`If "cat" is not in the vocabulary and becomes c + at, how many IDs does "The cat sat." need?`, `إذا لم تكن cat في المفردات وأصبحت c + at، كم رقمًا تحتاج "The cat sat."؟`, [`3`, `4`, `5`, `6`], 2, `the, c, at, sat, "." = 5 IDs instead of 4.`, `the وc وat وsat و"." = 5 أرقام بدل 4.`],
  remember: [`Models read IDs, not text: normalize → tokenize → map to IDs. Tokenization affects vocabulary size, sequence length and what can be represented.`, `النماذج تقرأ أرقامًا لا نصًّا: توحيد ← ترميز ← أرقام. والترميز يؤثر على حجم المفردات وطول السلسلة وما يمكن تمثيله.`],
  teach: [`Explain why a tokenization decision can change how many IDs a sentence needs.`, `اشرح لماذا قد يغيّر قرار الترميز عدد الأرقام التي تحتاجها الجملة.`, `A model receives one integer ID per token. If a word is in the vocabulary it costs one ID; if it is missing, it must be built from smaller units such as subwords or characters, each with its own ID. So "The cat sat." needs 4 IDs if "cat" is a token, but 5 if "cat" is split into c + at. Vocabulary decisions therefore change sequence length.`, `يستقبل النموذج رقمًا لكل رمز. الكلمة الموجودة في المفردات تكلّف رقمًا واحدًا، والمفقودة تُبنى من وحدات أصغر لكل منها رقم. لذا تحتاج "The cat sat." 4 أرقام إذا كانت cat رمزًا، و5 إذا قُسّمت.`]
};

LESSONS.c2s4 = {
  big: [`"How many words are in this sentence?" sounds simple, but there are <b>four different things</b> you could be counting. Exams love this because the numbers change with the definition and with the tokenization decision.`, `"كم كلمة في هذه الجملة؟" يبدو سهلًا، لكن هناك <b>أربعة أشياء مختلفة</b> قد تعدّها، والأرقام تتغير مع التعريف ومع قرار الترميز.`],
  think: [`In "the cat saw the dog and the bird", how many words are there? Try to give two different correct answers.`, `في "the cat saw the dog and the bird" كم كلمة؟ حاول أن تعطي إجابتين صحيحتين مختلفتين.`, `8 if you count every running word (instances, N), and 6 if you count distinct words (types, |V|), because "the" appears three times but is one type.`, `8 إذا عددت كل ورود (N)، و6 إذا عددت الكلمات المميزة (|V|)، لأن the تتكرر ثلاث مرات لكنها نوع واحد.`],
  steps: [
    [`<b>Word instance (N):</b> every occurrence. "the" counted 3 times. (Traditionally called word tokens.)`, `<b>الورود (N):</b> كل ظهور، فتُعد the ثلاث مرات.`],
    [`<b>Word type (|V|):</b> each distinct item once. "the" = 1 type. The number of types is the vocabulary size.`, `<b>النوع (|V|):</b> كل عنصر مميز مرة واحدة، وعددها حجم المفردات.`],
    [`<b>Wordform:</b> the surface form as written: cat, cats and cat's are three wordforms.`, `<b>الشكل:</b> الكتابة كما هي: cat وcats وcat's ثلاثة أشكال.`],
    [`<b>Lemma:</b> the dictionary headword: am, is, are → be; cat and cats share the lemma cat.`, `<b>الأصل المعجمي:</b> مدخل القاموس: am وis وare ← be.`],
    [`<b>Decisions change counts:</b> merging "San Francisco" into one unit removes one instance and one type. Every count must state its tokenization assumption.`, `<b>القرارات تغيّر العدّ:</b> دمج "San Francisco" يحذف ورودًا ونوعًا، فيجب ذكر افتراض الترميز مع كل عدّ.`]
  ],
  action: { w: 'counter', cfg: { text: 'they lay back on the San Francisco grass and looked at the stars and their stars' }, cap: [`Slide 9's sentence. Start with a whitespace split (N = 16, |V| = 13), then switch on each option and watch N and |V| change.`, `جملة الشريحة 9. ابدأ بالتقسيم بالمسافات (N = 16 و|V| = 13) ثم فعّل كل خيار ولاحظ تغيّر الأرقام.`] },
  confuse: { a: [`Type`, `Counted <b>once</b> per distinct word: the size of the vocabulary.`, `يُعد <b>مرة واحدة</b> لكل كلمة مميزة.`], b: [`Instance`, `Counted <b>every time</b> it appears in the text.`, `يُعد <b>كل مرة</b> يظهر فيها.`], why: [`Notice in the demo that lemmatising "stars → star" changes nothing for slide 9's sentence: both occurrences were already the same type. Lemmatisation merges types only when different forms (star and stars) both appear.`, `لاحظ أن تحويل stars إلى star لا يغيّر شيئًا في جملة الشريحة 9 لأن الظهورين نوع واحد أصلًا، فالإرجاع يدمج الأنواع فقط إذا ظهر الشكلان معًا.`] },
  check: [`"the cat saw the cat": what are N and |V|?`, `"the cat saw the cat": ما N و|V|؟`, [`N = 5, |V| = 5`, `N = 5, |V| = 3`, `N = 3, |V| = 5`, `N = 4, |V| = 3`], 1, `Five running words; three distinct types (the, cat, saw). This is slide 64's mini check.`, `خمس كلمات وثلاثة أنواع، وهو تمرين الشريحة 64.`],
  remember: [`Instance = every occurrence (N); type = distinct item (|V|); wordform = as written; lemma = dictionary form. Always state the tokenization assumption.`, `الورود كل ظهور، والنوع عنصر مميز، والشكل كما يُكتب، والأصل صيغة القاموس. واذكر دائمًا افتراض الترميز.`],
  teach: [`Explain the four counting terms using "the cat saw the dog and the bird".`, `اشرح مصطلحات العدّ الأربعة باستخدام الجملة.`, `The sentence has N = 8 word instances, because every running word is counted, and |V| = 6 word types, because "the" appears three times but is one type. A wordform is the written form (cat vs cats are different wordforms) and a lemma is the dictionary headword (cat and cats share the lemma cat). Counts depend on tokenization, so every count must state its assumption.`, `في الجملة N = 8 ورودًا و|V| = 6 أنواع لأن the تتكرر ثلاث مرات. الشكل هو الكتابة (cat وcats مختلفان) والأصل مدخل القاموس (cat). والعدّ يعتمد على الترميز.`]
};

LESSONS.c2s5 = {
  big: [`If you keep reading more text, do you eventually see every word? No. <b>Heaps' law</b> says the vocabulary keeps growing forever, just more and more slowly: |V| = k·N^β with 0 &lt; β &lt; 1.`, `إذا استمررت في قراءة نصوص أكثر، هل سترى كل الكلمات في النهاية؟ لا. يقول <b>قانون Heaps</b> إن المفردات تنمو دائمًا لكن ببطء متزايد: |V| = k·N^β حيث 0 &lt; β &lt; 1.`],
  why: [`This is the reason subword tokenization exists (topic 14): no fixed word vocabulary can ever cover open-domain text.`, `هذا سبب وجود الترميز بالوحدات الفرعية (الموضوع 14): لا توجد مفردات ثابتة تغطي النصوص المفتوحة.`],
  links: ['c2s4'],
  steps: [
    [`<b>N</b> = word instances (corpus size), <b>|V|</b> = word types, <b>k</b> = a corpus-dependent constant, <b>β</b> controls the growth rate.`, `<b>N</b> عدد الكلمات، <b>|V|</b> عدد الأنواع، <b>k</b> ثابت يعتمد على المدونة، <b>β</b> يتحكم في معدل النمو.`],
    [`Because β &lt; 1, growth is <b>sublinear</b>. Reported β is about 0.44–0.56, so roughly the square root: with β = 0.5, 4× more text gives 2× more types; 100× gives 10×.`, `لأن β &lt; 1 فالنمو <b>أبطأ من الخطي</b>، وقيم β نحو 0.44–0.56 أي قرب الجذر التربيعي: نص أكبر 4 مرات ← أنواع أكثر مرتين.`],
    [`<b>Why it never stops:</b> function words (a, of, the) are a small closed set and stop adding types early, but names, numbers, typos, technical terms and new wordforms keep coming.`, `<b>لماذا لا يتوقف:</b> كلمات الوظيفة مجموعة مغلقة تتوقف مبكرًا، لكن الأسماء والأرقام والأخطاء والمصطلحات والأشكال الجديدة تستمر.`],
    [`<b>Real corpora:</b> Shakespeare 884K instances / 29K types; Brown 1M / 38K; Switchboard 2.4M / 20K; Google n-grams 1T / 13M+.`, `<b>مدونات حقيقية:</b> شكسبير 884 ألفًا/29 ألفًا؛ Brown مليون/38 ألفًا؛ Google n-grams تريليون/أكثر من 13 مليونًا.`]
  ],
  action: { w: 'heaps', cfg: {}, cap: [`Drag N and β. Notice how |V| keeps rising, but the share of new types per word keeps falling.`, `حرّك N وβ ولاحظ أن |V| يرتفع دائمًا بينما تقل نسبة الأنواع الجديدة لكل كلمة.`] },
  analogy: [`Like meeting people in a growing city: at first almost everyone is new, later most faces are familiar, yet new people never stop arriving.`, `مثل التعرّف على الناس في مدينة تكبر: في البداية كل الوجوه جديدة، ثم يصبح معظمها مألوفًا، لكن الوافدين الجدد لا يتوقفون.`],
  check: [`With β = 0.5, the corpus grows 100 times. The vocabulary grows by about:`, `مع β = 0.5 تكبر المدونة 100 مرة. تكبر المفردات بنحو:`, [`100 times`, `50 times`, `10 times`, `It stops growing`], 2, `100^0.5 = 10.`, `100^0.5 = 10.`],
  remember: [`|V| = k·N^β, 0 &lt; β &lt; 1: vocabulary grows forever but slower than the text, so we need subwords.`, `|V| = k·N^β: المفردات تنمو دائمًا لكن أبطأ من النص، فنحتاج الوحدات الفرعية.`],
  teach: [`State Heaps' law and explain what it means for NLP models.`, `اذكر قانون Heaps واشرح ما يعنيه لنماذج NLP.`, `Heaps' law states |V| = k·N^β, where N is the number of word instances, |V| the number of types, k a corpus-dependent constant and 0 < β < 1 (about 0.44–0.56). Vocabulary keeps growing as text grows, but sublinearly. Function words stop adding types early, while names, numbers and technical terms keep adding new ones. So no fixed word vocabulary can cover all text, which motivates subword tokenization.`, `ينص قانون Heaps على |V| = k·N^β حيث 0 < β < 1. المفردات تنمو مع النص لكن أبطأ منه، والأسماء والأرقام والمصطلحات تضيف أنواعًا باستمرار، فلا مفردات ثابتة تكفي، وهذا يدفع نحو الوحدات الفرعية.`]
};

LESSONS.c2s6 = {
  big: [`A <b>regular expression</b> is a tiny pattern language: you describe the <i>shape</i> of the text you want, and the computer checks every position for a match. It knows nothing about meaning, which is why it makes mistakes, and those mistakes lead straight to <b>precision</b> and <b>recall</b>.`, `<b>التعبير النمطي</b> لغة أنماط صغيرة تصف بها <i>شكل</i> النص المطلوب، ويفحص الحاسوب كل موضع. لا يعرف شيئًا عن المعنى، ولذلك يخطئ، وتقودنا أخطاؤه مباشرة إلى <b>الدقة</b> و<b>الاستدعاء</b>.`],
  why: [`Regex is used for cleaning, extraction and rule-based tokenization, and it performs the pretokenization step of BPE tokenizers (topic 15).`, `تُستخدم التعابير النمطية في التنظيف والاستخراج والترميز بالقواعد، وتنفّذ خطوة الترميز المسبق في BPE.`],
  steps: [
    [`<b>Brackets match one character:</b> [tT] = t or T; [A-Z] = any capital; [^Ss] = anything except S or s.`, `<b>الأقواس المربعة تطابق حرفًا واحدًا:</b> [tT]، [A-Z]، و[^Ss] أي شيء عدا S أو s.`],
    [`<b>Counters act on the item just before them:</b> ? (0 or 1, colou?r), * (0 or more, o*h), + (1 or more, o+h), {3} (exactly 3). So baa+! matches baa!, baaa!… but ba*! also matches b!.`, `<b>العدّادات تعمل على ما قبلها مباشرة:</b> ? و* و+ و{3}. لذا ba*! تطابق b! أيضًا.`],
    [`<b>Parentheses group:</b> the* matches "theee"; (the)* repeats the whole word; gupp(y|ies) matches guppy and guppies.`, `<b>الأقواس العادية تجمّع:</b> the* تطابق "theee" و(the)* تكرر الكلمة.`],
    [`<b>Anchors match positions, not characters:</b> ^ start, $ end, \\b word boundary. \\. is a real period.`, `<b>المرابط تطابق مواضع لا حروفًا:</b> ^ البداية، $ النهاية، \\b حد الكلمة، و\\. نقطة حقيقية.`],
    [`<b>Matching is greedy:</b> &lt;.*&gt; grabs the longest match; &lt;.*?&gt; the shortest.`, `<b>المطابقة جشعة:</b> &lt;.*&gt; تأخذ أطول تطابق و&lt;.*?&gt; أقصره.`]
  ],
  action: { w: 'regex', cfg: { p: 'the', text: 'The cat sat on the mat. The other student studied theology there, then left.', presets: ['the', '[tT]he', '[^A-Za-z][tT]he[^A-Za-z]', '\\b[tT]he\\b'] }, cap: [`The lecture's task: find the word "the". Try each attempt from slides 15–16 and watch the false positives and false negatives.`, `مهمة المحاضرة: إيجاد كلمة the. جرّب كل محاولة من الشرائح 15–16 وراقب الأخطاء.`] },
  confuse: { a: [`False positive`, `Matched something that <b>should not</b> match (the in "theology"). Lowers <b>precision</b>.`, `طابق ما <b>لا يجب</b> مطابقته، فيخفض <b>الدقة</b>.`], b: [`False negative`, `<b>Missed</b> something that should match ("The" at the start). Lowers <b>recall</b>.`, `<b>فوّت</b> ما يجب مطابقته، فيخفض <b>الاستدعاء</b>.`], why: [`Precision = correct ÷ everything you returned; recall = correct ÷ everything you should have found. Lecture numbers: 14 matches, 9 correct, 10 real "the" → P = 9/14 = 0.64, R = 9/10 = 0.90. Fixing one error type often worsens the other.`, `الدقة = الصحيح ÷ كل ما أعدته، والاستدعاء = الصحيح ÷ كل ما كان يجب إيجاده. أرقام المحاضرة: الدقة 0.64 والاستدعاء 0.90.`] },
  check: [`Why does [tT]he still give errors?`, `لماذا لا يزال [tT]he يخطئ؟`, [`It misses "The"`, `It matches inside other, there and theology`, `It is not valid regex`, `It only matches at the start of a line`], 1, `It checks letters only, not word boundaries, so it creates false positives. \\b[tT]he\\b fixes this.`, `يفحص الحروف فقط دون حدود الكلمة فيعطي إيجابيات خاطئة، و\\b[tT]he\\b يصلح ذلك.`],
  remember: [`Brackets = one char, counters act on the item before, () groups, ^ $ \\b are positions. Best "the": \\b[tT]he\\b. FP → precision ↓, FN → recall ↓.`, `الأقواس حرف واحد، والعدادات على ما قبلها، والأقواس تجمّع، و^ $ \\b مواضع. أفضل نمط: \\b[tT]he\\b.`],
  teach: [`Explain, step by step, why finding "the" needs three attempts, and name the error at each step.`, `اشرح خطوة بخطوة لماذا يحتاج إيجاد the ثلاث محاولات، مع اسم الخطأ في كل خطوة.`, `The pattern "the" misses "The" at the start of a sentence: a false negative, which lowers recall. "[tT]he" fixes that but also matches inside "other", "there" and "theology": false positives, which lower precision. Adding word boundaries, "\\b[tT]he\\b" (or "(^|[^A-Za-z])[tT]he([^A-Za-z]|$)"), matches "the" and "The" only as whole words, including at the start or end of the text.`, `النمط the يفوّت The (سلبي خاطئ يخفض الاستدعاء)، و[tT]he يطابق داخل other وtheology (إيجابي خاطئ يخفض الدقة)، و\\b[tT]he\\b يطابق الكلمة كاملة فقط.`]
};

LESSONS.c2s8 = {
  big: [`Normalization means deciding which different-looking forms the system should treat as <b>the same</b> (an equivalence class): Window = window, U.S.A. = USA. It makes data tidier, but every merge throws a distinction away. The key question is always: <b>does this task need that distinction?</b>`, `التوحيد يعني تحديد أي الأشكال المختلفة يعاملها النظام كشيء <b>واحد</b> (فئة تكافؤ). يجعل البيانات أنظف، لكن كل دمج يزيل تمييزًا. والسؤال دائمًا: <b>هل تحتاج المهمة هذا التمييز؟</b>`],
  links: ['c2s7'],
  action: { w: 'normalize', cfg: { text: 'Great, another update :( The US team said it is NOT good!!! sooooo bad http://example.com' }, cap: [`Turn the cleaning and normalization steps on one by one. The demo tells you what each step keeps and what it destroys.`, `فعّل خطوات التنظيف والتوحيد واحدة تلو الأخرى، وسيخبرك العرض بما تحفظه كل خطوة وما تدمّره.`] },
  steps: [
    [`<b>Case folding</b> (everything to lowercase) shrinks the vocabulary and helps <i>search, spelling correction and topic classification</i>: typing "window" also finds "Window".`, `<b>تحويل حالة الأحرف</b> يصغّر المفردات ويفيد <i>البحث وتصحيح الإملاء وتصنيف المواضيع</i>.`],
    [`But it hurts tasks that read capitals as clues: <i>named-entity recognition, information extraction, sentiment</i>. US (country) becomes us (pronoun); Apple ≠ apple.`, `لكنه يضر المهام التي تستفيد من الأحرف الكبيرة: <i>NER والاستخراج والمشاعر</i>. US تصبح us.`],
    [`Other merges have the same trade-off: deleting periods (U.S.A. → USA) helps retrieval but loses the original form; colour → color loses an authorship signal; removing Arabic ال loses definiteness.`, `دمجات أخرى لها المقايضة نفسها: حذف النقاط، وتوحيد colour/color، وحذف "ال" يفقد التعريف.`],
    [`Arabic attaches clitics (و، ب، ال): وبالكتاب = و + ب + ال + كتاب. Without splitting them, every combination becomes a separate type.`, `العربية تلصق الزوائد: وبالكتاب = و + ب + ال + كتاب، وبدون فصلها تصبح كل تركيبة نوعًا مستقلًّا.`]
  ],
  confuse: { a: [`Fold case for…`, `Information retrieval, spelling correction, topic classification.`, `الاسترجاع وتصحيح الإملاء وتصنيف المواضيع.`], b: [`Keep case for…`, `Named entity recognition, information extraction, sentiment/context clues.`, `التعرف على الكيانات والاستخراج وإشارات المشاعر.`], why: [`There is no universally correct normalization. "Normalize only the distinctions the task can safely ignore."`, `لا يوجد توحيد صحيح دائمًا: "وحّد فقط الفروق التي يمكن للمهمة تجاهلها بأمان".`] },
  check: [`For a named-entity recognizer, lowercasing everything is risky because:`, `في نظام التعرف على الكيانات، التحويل للأحرف الصغيرة خطر لأن:`, [`It makes the vocabulary larger`, `Capital letters are clues, e.g. US vs us`, `It removes stop words`, `It splits clitics`], 1, `NER uses capitalization to spot names; folding destroys that clue.`, `NER يستخدم الأحرف الكبيرة لاكتشاف الأسماء، والتحويل يزيل هذا الدليل.`],
  remember: [`Normalization = equivalence classes. Ask "does the task need the distinction?" Fold case for IR; keep it for NER.`, `التوحيد = فئات تكافؤ. اسأل: هل تحتاج المهمة التمييز؟ حوّل الحالة للاسترجاع واحتفظ بها لـ NER.`],
  teach: [`Explain why case folding is called "a trade-off".`, `اشرح لماذا يُسمى تحويل حالة الأحرف "مقايضة".`, `Case folding maps all characters to one case. The gain: fewer forms, a smaller vocabulary and better matching, so a search for "window" also finds "Window". The cost: it destroys a distinction, so tasks that use capitals as clues, such as named entity recognition, lose information: US (the country) and us (the pronoun) become the same string. Whether to fold depends on whether the task needs that distinction.`, `تحويل الحالة يقلل الأشكال ويحسّن المطابقة، لكنه يزيل تمييزًا تحتاجه مهام مثل NER حيث تصبح US وus سلسلة واحدة، فالقرار يعتمد على حاجة المهمة.`]
};

LESSONS.c2s9 = {
  big: [`Three ways to shrink word variety: <b>stemming</b> chops endings by rule, <b>lemmatization</b> looks up the real dictionary form, and <b>stop-word removal</b> deletes the most frequent function words. They look similar but differ in how careful they are, and in what they can break.`, `ثلاث طرق لتقليل تنوع الكلمات: <b>التجذيع</b> يقطع النهايات بقاعدة، و<b>الإرجاع المعجمي</b> يجد صيغة القاموس الحقيقية، و<b>حذف كلمات التوقف</b> يحذف كلمات الوظيفة الأكثر تكرارًا.`],
  steps: [
    [`<b>Stemming</b> (heuristic): automates, automatic → <i>automat</i>. Fast, but the output need not be a real word.`, `<b>التجذيع</b> (تقريبي): automates وautomatic ← automat. سريع لكن الناتج قد لا يكون كلمة.`],
    [`<b>Lemmatization</b> (dictionary + morphology): am, are, is → <i>be</i>; car, cars, car's, cars' → <i>car</i>. Needs more linguistic analysis.`, `<b>الإرجاع المعجمي</b> (قاموس + صرف): am وare وis ← be. يحتاج تحليلًا لغويًّا أكثر.`],
    [`Lemmatization depends on the part of speech: <i>saw</i> → <i>see</i> as a verb, but stays <i>saw</i> as a noun (the tool).`, `يعتمد على قسم الكلام: saw ← see كفعل وتبقى saw كاسم.`],
    [`<b>Stop-word removal</b> deletes the, of, and… but can destroy meaning: "not good" → "good". Modern neural models usually keep stop words and learn what to ignore.`, `<b>حذف كلمات التوقف</b> قد يدمّر المعنى: "not good" ← "good"، لذا تحتفظ النماذج العصبية بها غالبًا.`]
  ],
  analogy: [`Stemming is like trimming every word with scissors at a fixed mark; lemmatization is like asking a dictionary "what is the base entry for this word here?"`, `التجذيع مثل قص كل كلمة بالمقص عند علامة ثابتة، والإرجاع مثل سؤال القاموس: "ما المدخل الأساسي لهذه الكلمة هنا؟"`],
  confuse: { a: [`Stemming`, `Rule-based chopping; may give a non-word (automat); ignores part of speech.`, `قطع بالقواعد؛ قد ينتج كلمة غير حقيقية؛ لا يراعي قسم الكلام.`], b: [`Lemmatization`, `Dictionary form (be, car); uses vocabulary and morphology; depends on POS (saw).`, `صيغة القاموس؛ يستخدم المفردات والصرف؛ يعتمد على قسم الكلام.`], why: [`Both reduce wordforms, so students treat them as the same. The exam answer hinges on "heuristic vs dictionary" and "non-word vs real lemma".`, `كلاهما يقلل الأشكال فيُخلط بينهما، والفرق في الامتحان: تقريبي مقابل قاموسي، وكلمة غير حقيقية مقابل أصل حقيقي.`] },
  check: [`Which operation turns "am, are, is" into "be"?`, `أي عملية تحوّل am وare وis إلى be؟`, [`Stemming`, `Lemmatization`, `Stop-word removal`, `Case folding`], 1, `Only a dictionary-based lemmatizer knows that these irregular forms share the lemma "be".`, `فقط الإرجاع القائم على القاموس يعرف أن هذه الأشكال أصلها be.`],
  remember: [`Stemming chops (automat), lemmatization looks up (be), stop-word removal deletes (and can turn "not good" into "good").`, `التجذيع يقطع، والإرجاع يبحث، وحذف كلمات التوقف يحذف وقد يقلب المعنى.`],
  teach: [`Compare stemming and lemmatization with one example each, and give one risk of stop-word removal.`, `قارن بين التجذيع والإرجاع بمثال لكل منهما واذكر خطرًا لحذف كلمات التوقف.`, `Stemming is a heuristic that strips affixes; it is fast but can produce non-words, e.g. automates and automatic → automat. Lemmatization uses vocabulary and morphological analysis to return the dictionary form, e.g. am, are, is → be, and depends on the part of speech (saw → see as a verb). Stop-word removal deletes frequent function words but can destroy meaning: "not good" becomes "good".`, `التجذيع تقريبي يقطع اللواحق وقد ينتج automat، والإرجاع يعيد صيغة القاموس be ويعتمد على قسم الكلام. وحذف كلمات التوقف قد يحوّل "not good" إلى "good".`]
};

LESSONS.c2s11 = {
  big: [`Splitting text into sentences sounds trivial until you meet the period. A "." can end a sentence, belong to an abbreviation (Dr., Inc.), or sit inside a number (4.3). So sentence segmentation is a <b>binary decision</b> for each candidate: boundary or not?`, `تقسيم النص إلى جمل يبدو سهلًا حتى تواجه النقطة: قد تنهي الجملة أو تنتمي لاختصار أو تكون داخل رقم. لذا فتقسيم الجمل <b>قرار ثنائي</b> لكل علامة: حد أم لا؟`],
  think: [`How many sentence boundaries are in: "Dr. Ahmed paid 4.3 dollars at Acme Inc."?`, `كم حدًّا للجمل في: "Dr. Ahmed paid 4.3 dollars at Acme Inc."؟`, `One. "Dr." is an abbreviation and "4.3" is a number, while the final period after "Inc." marks both the abbreviation and the end of the sentence.`, `حد واحد. Dr. اختصار و4.3 رقم، والنقطة الأخيرة بعد Inc. تدل على الاختصار ونهاية الجملة معًا.`],
  steps: [
    [`"?" and "!" are relatively unambiguous boundaries.`, `"?" و"!" حدود واضحة نسبيًّا.`],
    [`The period is ambiguous: sentence end, abbreviation marker or part of a number.`, `النقطة غامضة: نهاية جملة أو علامة اختصار أو جزء من رقم.`],
    [`<b>Simple rule:</b> a period ends a sentence unless the token before it is a known abbreviation or the period is inside a number. The abbreviation list is hand-built or learned.`, `<b>قاعدة بسيطة:</b> النقطة تنهي الجملة إلا إذا سبقها اختصار معروف أو كانت داخل رقم.`],
    [`<b>Classifier:</b> systems can also learn the decision from features: is it an abbreviation? is the next word capitalized? what is the next word? Many systems combine rules and classifiers.`, `<b>المصنف:</b> يمكن تعلّم القرار من خصائص: هل هو اختصار؟ هل الكلمة التالية بحرف كبير؟`]
  ],
  check: [`Which punctuation mark is the most ambiguous sentence boundary?`, `أي علامة ترقيم هي الأكثر غموضًا كحد للجملة؟`, [`?`, `!`, `.`, `,`], 2, `The period also marks abbreviations and decimals.`, `النقطة تدل أيضًا على الاختصارات والأرقام العشرية.`],
  remember: [`Sentence segmentation = boundary or not, per candidate; the period is the problem (Dr., 4.3, Inc.).`, `تقسيم الجمل: حد أم لا لكل علامة، والمشكلة في النقطة.`]
};

LESSONS.c2s14 = {
  big: [`Heaps' law told us new words never stop appearing. A model with a fixed list of whole words will keep meeting words it has never seen. <b>Subword tokenization</b> fixes this with one idea: keep frequent words whole, and build rare words from smaller known pieces.`, `أخبرنا قانون Heaps أن الكلمات الجديدة لا تتوقف. النموذج ذو القائمة الثابتة سيقابل دائمًا كلمات لم يرها. <b>الترميز بالوحدات الفرعية</b> يحل ذلك بفكرة واحدة: أبقِ الكلمات المتكررة كاملة وابنِ النادرة من قطع أصغر معروفة.`],
  links: ['c2s5'],
  steps: [
    [`<b>Unknown words (OOV):</b> neuroplasticity → UNK, COVID → UNK. The word's identity is lost.`, `<b>الكلمات المجهولة:</b> neuroplasticity ← UNK، فتضيع هوية الكلمة.`],
    [`<b>Large vocabulary:</b> about 1M word types means a large embedding matrix and a costly output softmax.`, `<b>مفردات كبيرة:</b> نحو مليون نوع يعني مصفوفة تضمين كبيرة وsoftmax مكلفًا.`],
    [`<b>No shared structure:</b> play, played, playing are stored as unrelated items.`, `<b>لا بنية مشتركة:</b> play وplayed وplaying عناصر غير مترابطة.`],
    [`<b>Poor multilingual scaling:</b> many languages → a huge word vocabulary.`, `<b>ضعف التوسع للغات:</b> لغات كثيرة ← مفردات ضخمة.`],
    [`<b>The fix:</b> training saw low, new, newer but not lower → a subword tokenizer that learned "low" and "er" writes lower = low + er. Worst case: a rare string like GRPO becomes single letters, so nothing is unknown.`, `<b>الحل:</b> رأى التدريب low وnew وnewer دون lower ← فتُكتب lower = low + er. وفي أسوأ حالة تُقسّم GRPO إلى حروف فلا يوجد مجهول.`]
  ],
  analogy: [`Like a set of LEGO pieces versus a box of finished toys: with finished toys you can only show what you bought; with pieces you can build anything, even a model you have never seen before.`, `مثل قطع الليغو مقابل صندوق ألعاب جاهزة: الألعاب الجاهزة محدودة بما اشتريت، أما القطع فتبني بها أي شيء حتى ما لم تره من قبل.`],
  check: [`Which is NOT one of the four failures of fixed word vocabularies on slide 30?`, `أي مما يلي ليس من القيود الأربعة في الشريحة 30؟`, [`Unknown words`, `Large vocabulary`, `No shared structure`, `Sentences become shorter`], 3, `The four are: unknown words, large vocabulary, no shared structure, poor multilingual scaling.`, `القيود الأربعة: الكلمات المجهولة، المفردات الكبيرة، غياب البنية المشتركة، ضعف التوسع للغات.`],
  remember: [`Four failures: OOV, huge vocabulary, no shared structure, poor multilingual scaling. Fix: frequent words whole, rare words from pieces. But pieces are not always real morphemes.`, `أربعة قيود، والحل: المتكرر كامل والنادر من قطع، والقطع ليست دائمًا مورفيمات حقيقية.`],
  teach: [`Explain how subwords solve the "lower" problem.`, `اشرح كيف تحل الوحدات الفرعية مشكلة lower.`, `If training contains low, new and newer but not lower, a word-level model has no entry for "lower" at test time, so it becomes unknown. A subword tokenizer that has learned the pieces "low" and "er" represents it as low + er. Frequent words stay single tokens, rare words are built from known pieces, and in the worst case a word falls back to characters or bytes, so no input is unknown.`, `إذا رأى التدريب low وnew وnewer دون lower فالنموذج على مستوى الكلمة لا يعرفها، أما أداة الوحدات الفرعية التي تعلمت low وer فتكتبها low + er، وفي أسوأ حالة تُقسّم إلى حروف أو بايتات.`]
};

LESSONS.c2s15 = {
  big: [`Every subword tokenizer has two separate phases. The <b>token learner</b> studies a training corpus once and produces a vocabulary plus an ordered list of merges. The <b>token segmenter</b> uses that frozen list to split new text. The segmenter never counts anything.`, `لكل أداة وحدات فرعية مرحلتان منفصلتان: <b>المتعلّم</b> يدرس مدونة التدريب مرة واحدة وينتج مفردات وقائمة دمجات مرتبة، و<b>المقسِّم</b> يستخدم هذه القائمة الثابتة لتقسيم نص جديد ولا يعدّ شيئًا.`],
  steps: [
    [`<b>Pretokenization</b> (often regex) first splits the input at spaces and punctuation: We're → We | 're. Merges never cross these boundaries.`, `<b>الترميز المسبق</b> (غالبًا بالتعابير النمطية) يقسم أولًا عند المسافات وعلامات الترقيم، ولا تتجاوز الدمجات هذه الحدود.`],
    [`<b>Learner (training phase):</b> counts pairs in the corpus, merges, recounts → vocabulary + merge order.`, `<b>المتعلّم (التدريب):</b> يعدّ الأزواج ويدمج ويعيد العدّ ← مفردات وترتيب دمج.`],
    [`<b>Segmenter (encoder phase):</b> takes a new word and replays the learned merges <i>in the order they were learned</i>. Frequencies in the new text play no role.`, `<b>المقسِّم (الترميز):</b> يأخذ كلمة جديدة ويعيد تطبيق الدمجات <i>بترتيب تعلمها</i>، ولا دور لتكرارات النص الجديد.`]
  ],
  analogy: [`The learner writes the recipe book; the segmenter is the cook who follows the recipes in order. The cook never rewrites the book, whatever ingredients turn up today.`, `المتعلّم يكتب كتاب الوصفات، والمقسِّم طاهٍ يتبعها بالترتيب ولا يعيد كتابة الكتاب مهما كانت مكونات اليوم.`],
  check: [`When encoding a new word, the segmenter:`, `عند ترميز كلمة جديدة، المقسِّم:`, [`Recounts pair frequencies in the new text`, `Replays the learned merges in learned order`, `Learns new merges`, `Chooses the most frequent pair`], 1, `Slide 32: "The segmenter does not recount frequencies."`, `الشريحة 32: "المقسِّم لا يعيد عدّ التكرارات".`],
  remember: [`Learner: corpus → count, merge, recount → vocabulary + ordered merges. Segmenter: new text → replay merges in order, never recount.`, `المتعلّم يعدّ ويدمج، والمقسِّم يعيد التطبيق بالترتيب دون عدّ.`]
};

LESSONS.c2s16 = {
  big: [`<b>Byte-Pair Encoding</b> is one simple loop. Start with single characters. Find the pair of neighbouring symbols that occurs most often. Glue it into one new symbol. Rewrite the corpus. Recount. Repeat k times. Frequent strings gradually become single tokens.`, `<b>BPE</b> حلقة بسيطة: ابدأ بالحروف المنفردة، وجد الزوج المتجاور الأكثر تكرارًا، والصقه في رمز جديد، وأعد كتابة المدونة، وأعد العدّ، وكرر k مرات.`],
  steps: [
    [`<b>V ← all unique characters in C.</b> The starting vocabulary is every distinct character (or byte).`, `<b>V ← كل الحروف الفريدة في C.</b>`],
    [`<b>for i = 1 to k:</b> k, the number of merges, is chosen before training.`, `<b>كرر k مرة:</b> يُختار k قبل التدريب.`],
    [`<b>Find the most frequent adjacent pair tL, tR</b>, counting each word's pairs times the word's frequency.`, `<b>جد الزوج المتجاور الأكثر تكرارًا</b> مع ضرب أزواج كل كلمة في تكرارها.`],
    [`<b>tNEW ← tL + tR; V ← V + tNEW.</b> The vocabulary grows by exactly one per merge.`, `<b>رمز جديد ويُضاف إلى V:</b> تكبر المفردات بواحد لكل دمج.`],
    [`<b>Replace every adjacent tL, tR in C with tNEW</b>, so the next count sees the merged symbol. Keep the merge order: the segmenter replays it.`, `<b>استبدل كل ظهور للزوج في المدونة</b> حتى يرى العدّ التالي الرمز المدموج، واحفظ ترتيب الدمج.`]
  ],
  action: { steps: [[`Tiny corpus: A B D C A B E C A B, vocabulary {A, B, C, D, E} (5 symbols).`, `مدونة صغيرة: A B D C A B E C A B، والمفردات 5 رموز.`], [`Count pairs: A B appears 3 times, more than any other pair → merge A + B → AB. Corpus: AB D C AB E C AB (length 7), vocabulary 6.`, `الزوج A B يظهر 3 مرات ← AB. الطول 7 والمفردات 6.`], [`Recount: now C AB appears 2 times → merge → CAB. Corpus: AB D CAB E CAB (length 5), vocabulary 7.`, `أعد العدّ: C AB يظهر مرتين ← CAB. الطول 5 والمفردات 7.`], [`After k merges the vocabulary is |V₀| + k. Real tokenizers stop at tens or hundreds of thousands (GPT-4o: 200K).`, `بعد k دمجات تصبح المفردات |V₀| + k، والأدوات الحقيقية تصل لمئات الآلاف.`]], cap: [`Slide 33's minimal run, one step at a time.`, `التشغيل المصغّر في الشريحة 33 خطوة بخطوة.`] },
  check: [`Starting from 7 symbols, BPE runs k = 4 merges. Final vocabulary size?`, `البدء بـ 7 رموز وتنفيذ 4 دمجات. ما حجم المفردات النهائي؟`, [`4`, `7`, `11`, `28`], 2, `Each merge adds exactly one symbol: 7 + 4 = 11.`, `كل دمج يضيف رمزًا واحدًا: 7 + 4 = 11.`],
  remember: [`Characters → count pairs → merge the top pair → rewrite → recount, k times. Final |V| = |V₀| + k.`, `حروف ← عدّ ← دمج الأعلى ← إعادة كتابة ← إعادة عدّ، k مرات.`]
};

LESSONS.c2s17 = {
  big: [`Now run BPE on the lecture's corpus: <b>set new new renew reset renew</b>. The ▁ symbol marks the start of a word, so "▁new" (a word) differs from "new" inside "renew". You will see BPE discover the prefix <i>re-</i> purely from counts.`, `نفّذ الآن BPE على مدونة المحاضرة: <b>set new new renew reset renew</b>. الرمز ▁ يدل على بداية الكلمة، وسترى BPE يكتشف البادئة <i>re-</i> من العدّ وحده.`],
  links: ['c2s16', 'c2s15'],
  action: { w: 'bpe', cfg: { corpus: 'set new new renew reset renew', k: 8, word: 'retest' }, cap: [`Press "Next merge" four times and compare with slide 41: ne, new, ▁r, ▁re. Then segment "retest" and "newest".`, `اضغط "Next merge" أربع مرات وقارن بالشريحة 41، ثم قسّم retest وnewest.`] },
  steps: [
    [`<b>Step 0:</b> 2 × ▁ n e w, 2 × ▁ r e n e w, 1 × ▁ s e t, 1 × ▁ r e s e t. Vocabulary {▁, e, n, r, s, t, w} = 7. Corpus length 30 symbols.`, `<b>الخطوة 0:</b> المفردات 7 رموز وطول المدونة 30.`],
    [`<b>Merge 1:</b> n e = 4 (2 from new + 2 from renew) ties with e w = 4. The tie goes to the pair listed first → <b>ne</b>. |V| = 8, length 26.`, `<b>الدمج 1:</b> n e = 4 يتعادل مع e w = 4، ويُكسر التعادل بالأول ← ne.`],
    [`<b>Recount!</b> e w drops from 4 to 0, because every e before w is now inside ne. The new pair ne w = 4 → <b>new</b>. |V| = 9.`, `<b>أعد العدّ!</b> e w يصبح 0 والزوج الجديد ne w = 4 ← new.`],
    [`<b>Merges 3–4:</b> ▁ r = 3 and r e = 3 (renew ×2 + reset ×1) → <b>▁r</b>, then <b>▁re</b>. |V| = 11. BPE found "re-" with no dictionary.`, `<b>الدمجان 3–4:</b> ▁r ثم ▁re، والمفردات 11، واكتشف BPE البادئة re- دون قاموس.`],
    [`<b>Segment "retest":</b> ▁ r e t e s t → rule ▁+r → rule ▁r+e → <b>▁re + t + e + s + t</b>. "newest" → ▁ + new + e + s + t.`, `<b>تقسيم retest:</b> ← ▁re + t + e + s + t، وnewest ← ▁ + new + e + s + t.`]
  ],
  confuse: { a: [`Training (learner)`, `Must <b>recount</b> pairs after every merge, because a merge changes the neighbouring pairs.`, `يجب <b>إعادة العدّ</b> بعد كل دمج.`], b: [`Encoding (segmenter)`, `<b>Never</b> counts. Replays merges in learned order; unseen endings stay as characters.`, `<b>لا يعدّ أبدًا</b> ويعيد التطبيق بالترتيب.`], why: [`Two classic exam mistakes: forgetting to recount during training (so e w is merged after ne), and recounting when segmenting a new word.`, `خطآن شائعان: نسيان إعادة العدّ أثناء التدريب، وإعادة العدّ عند تقسيم كلمة جديدة.`] },
  check: [`After merge 1 (n + e → ne), what is the count of the pair e w?`, `بعد الدمج الأول، ما عدد الزوج e w؟`, [`4`, `2`, `0`, `6`], 2, `Every e that preceded w is now part of ne, so e w no longer occurs.`, `كل e قبل w أصبحت داخل ne فلم يعد الزوج موجودًا.`],
  remember: [`Merges: ne → new → ▁r → ▁re (|V| 7 → 11). retest → ▁re t e s t; newest → ▁ new e s t.`, `الدمجات: ne ← new ← ▁r ← ▁re، وretest ← ▁re t e s t.`],
  teach: [`Walk through the first two BPE merges and explain why recounting is necessary.`, `اشرح أول دمجين في BPE ولماذا إعادة العدّ ضرورية.`, `Start with characters and the word-start marker: 2 × ▁ n e w, 2 × ▁ r e n e w, 1 × ▁ s e t, 1 × ▁ r e s e t (|V| = 7). Pair counts are multiplied by word frequency: n e = 4 and e w = 4; the tie goes to n e, so merge 1 creates "ne" (|V| = 8). Merging changes neighbouring pairs: e w drops to 0 and the new pair ne w has count 4, so merge 2 creates "new" (|V| = 9). Without recounting we would wrongly use the old counts.`, `نبدأ بالحروف (|V| = 7)، وn e = 4 وe w = 4 والتعادل لصالح n e فيُنشأ ne. الدمج يغيّر الأزواج: e w يصبح 0 وne w = 4 فيُنشأ new. دون إعادة العدّ سنستخدم أعدادًا قديمة خاطئة.`]
};

LESSONS.c2s18 = {
  big: [`What if a tokenizer started from <b>bytes</b> instead of characters? A byte has only 256 possible values, and every text in every script is just a sequence of bytes in UTF-8. Start the vocabulary with all 256, and <b>nothing can ever be unknown</b>. That is byte-level BPE (GPT-2, GPT-4o).`, `ماذا لو بدأت الأداة من <b>البايتات</b> بدل الحروف؟ للبايت 256 قيمة فقط، وكل نص بأي لغة سلسلة بايتات في UTF-8، فإذا بدأت المفردات بالقيم الـ256 <b>لا يمكن أن يوجد مجهول</b>.`],
  steps: [
    [`<b>Unicode</b> gives every character a <b>code point</b>: a = U+0061, ñ = U+00F1, ب = U+0628.`, `<b>Unicode</b> يعطي كل حرف <b>نقطة ترميز</b>.`],
    [`<b>UTF-8</b> stores a code point in 1–4 bytes: U+0000–007F → 1 byte (0xxxxxxx); U+0080–07FF → 2 bytes (110yyyyy 10xxxxxx); then 3 and 4 bytes.`, `<b>UTF-8</b> يخزّن نقطة الترميز في 1–4 بايتات حسب المدى.`],
    [`<b>ñ = U+00F1</b> is in the 2-byte range. 00F1 in 11 bits = 00011 | 110001. Byte 1 = 110 + 00011 = <b>C3</b>; byte 2 = 10 + 110001 = <b>B1</b>.`, `<b>ñ = U+00F1</b> في مدى البايتين: البايت الأول C3 والثاني B1.`],
    [`<b>Why no UNK:</b> all 256 byte values are in the starting vocabulary; BPE then merges frequent byte pairs and quickly rebuilds common characters.`, `<b>لماذا لا مجهول:</b> كل القيم الـ256 في المفردات الأولية، ثم يدمج BPE الأزواج المتكررة.`],
    [`<b>The cost:</b> merges trained on English-heavy data favour English, so other languages are <b>oversegmented</b>: a recipe needs 19 tokens in English but 33 in the Spanish original.`, `<b>التكلفة:</b> الدمجات تفضّل الإنجليزية فتُقسَّم اللغات الأخرى أكثر: 19 رمزًا مقابل 33.`]
  ],
  action: { w: 'utf8', cfg: { text: 'ñ' }, cap: [`Type any character, or try a, ñ, ب, 进 and 😀, and watch the byte pattern (1, 2, 2, 3 and 4 bytes, as on slide 44).`, `اكتب أي حرف أو جرّب الأمثلة وشاهد نمط البايتات.`] },
  check: [`How many UTF-8 bytes does the Arabic letter ب (U+0628) use?`, `كم بايتًا يستخدم الحرف ب في UTF-8؟`, [`1`, `2`, `3`, `4`], 1, `U+0080–U+07FF uses 2 bytes: D8 A8.`, `المدى U+0080–U+07FF يستخدم بايتين: D8 A8.`],
  remember: [`Byte-level BPE: 256 starting symbols → no UNK. ñ = C3 B1, ب = D8 A8. Downside: oversegmentation of underrepresented languages.`, `BPE بالبايت: 256 رمزًا ← لا مجهول. ñ = C3 B1. العيب: الإفراط في تقسيم اللغات الأقل تمثيلًا.`]
};

LESSONS.c2s19 = {
  big: [`BPE is not the only way to choose subword pieces. All the methods share the goal (frequent pieces whole, rare words from parts) but choose pieces differently: <b>BPE merges by count, WordPiece merges by a score, Unigram prunes a big list, and SentencePiece is a toolkit that runs BPE or Unigram.</b>`, `BPE ليس الطريقة الوحيدة. كل الطرق لها الهدف نفسه لكنها تختار القطع بشكل مختلف: <b>BPE يدمج بالعدد، وWordPiece يدمج بنتيجة، وUnigram يقلّم قائمة كبيرة، وSentencePiece مكتبة تشغّل BPE أو Unigram.</b>`],
  links: ['c2s16'],
  steps: [
    [`<b>WordPiece</b> (BERT): merge the pair that most increases training-data likelihood. Common score = count(pair) / (count(first) × count(second)). "##" marks a piece that continues a word: playing → play ##ing.`, `<b>WordPiece</b> (BERT): يدمج الزوج الذي يزيد الاحتمالية أكثر، و## تعني قطعة مكمّلة.`],
    [`<b>Same corpus, different choice</b> (hug ×10, pug ×5, pun ×12, bun ×4, hugs ×5): BPE takes ##u ##g (count 20). WordPiece takes ##g ##s: 5/(20×5) = 1/20 beats 20/(36×20) = 1/36, because ##u appears in every word and gets divided by 36.`, `<b>مدونة واحدة واختيار مختلف:</b> BPE يأخذ ##u ##g (20)، وWordPiece يأخذ ##g ##s لأن 1/20 أكبر من 1/36.`],
    [`<b>Unigram LM</b> (Kudo, 2018): the opposite direction. Start with many candidate pieces and remove the ones whose removal lowers likelihood least, until the target size.`, `<b>Unigram LM:</b> الاتجاه المعاكس: يبدأ بقطع كثيرة ويحذف الأقل أثرًا حتى الحجم المطلوب.`],
    [`<b>SentencePiece:</b> a library, not one algorithm. It treats the space as the symbol ▁ (▁I | ▁love | ▁NLP), so it needs no language-specific pre-splitting, and turning ▁ back into spaces restores the text.`, `<b>SentencePiece:</b> مكتبة لا خوارزم، تعامل المسافة كرمز ▁ فلا تحتاج تقسيمًا مسبقًا خاصًّا باللغة.`]
  ],
  analogy: [`Picking a team: BPE picks the most popular pair of friends; WordPiece picks the pair that is unusually often together compared with how popular each is alone; Unigram starts with everyone and cuts the least useful.`, `مثل اختيار فريق: BPE يختار أكثر ثنائي شهرة، وWordPiece يختار الثنائي الذي يجتمع أكثر مما تتوقعه شهرة كل منهما، وUnigram يبدأ بالجميع ويستبعد الأقل فائدة.`],
  check: [`Which method scores pairs with count(pair) / (count(first) × count(second))?`, `أي طريقة تقيّم الأزواج بهذه الصيغة؟`, [`BPE`, `WordPiece`, `Unigram LM`, `SentencePiece`], 1, `That is the common (Hugging Face) WordPiece score; it favours pairs whose parts are rare on their own.`, `هذه نتيجة WordPiece، وتفضّل الأزواج ذات الأجزاء النادرة منفردة.`],
  remember: [`BPE merges · WordPiece scores · Unigram prunes · SentencePiece runs algorithms. BERT = WordPiece; GPT-2 = byte-level BPE.`, `BPE يدمج · WordPiece يقيّم · Unigram يقلّم · SentencePiece مكتبة. BERT = WordPiece وGPT-2 = BPE بالبايت.`],
  teach: [`Explain why BPE and WordPiece choose different first merges on the hug/pug corpus.`, `اشرح لماذا يختلف أول دمج بين BPE وWordPiece في مدونة hug/pug.`, `BPE picks the most frequent adjacent pair: ##u ##g occurs 20 times, so it merges ##u + ##g. WordPiece divides the pair count by the counts of its two parts. ##u appears in every word (36 times), so every pair containing it scores only 1/36, while ##g ##s scores 5/(20 × 5) = 1/20 = 0.050. WordPiece therefore merges ##g + ##s, favouring pairs whose parts are rare on their own.`, `BPE يختار الأكثر تكرارًا ##u ##g (20)، وWordPiece يقسم على تكرار الجزأين، و##u في كل الكلمات (36) فنتيجة أزواجها 1/36، بينما ##g ##s = 1/20، فيختارها WordPiece.`]
};

LESSONS.c2s21 = {
  big: [`How different are "graffe" and "giraffe"? <b>Minimum edit distance</b> answers with a number: the cheapest sequence of <b>insertions, deletions and substitutions</b> that turns one string into the other. Spelling correction, name matching and speech recognition all rely on it.`, `ما مدى الاختلاف بين graffe وgiraffe؟ <b>مسافة التحرير الدنيا</b> تجيب برقم: أرخص سلسلة من <b>الإدراج والحذف والاستبدال</b> تحوّل سلسلة إلى أخرى.`],
  steps: [
    [`<b>Insertion:</b> cat → cart (add r). <b>Deletion:</b> cart → cat. <b>Substitution:</b> cat → cut (a → u).`, `<b>إدراج:</b> cat ← cart. <b>حذف:</b> cart ← cat. <b>استبدال:</b> cat ← cut.`],
    [`<b>Levenshtein distance:</b> every operation costs 1, so the distance is the minimum number of edits. graffe → giraffe = 1.`, `<b>مسافة ليفنشتاين:</b> كل عملية بتكلفة 1.`],
    [`<b>intention → execution:</b> delete i, substitute n→e, substitute t→x, insert c, substitute n→u (alignment d s s i s). Cost = 5.`, `<b>intention ← execution:</b> d s s i s، والتكلفة 5.`],
    [`<b>Another cost scheme:</b> if substitution is a deletion plus an insertion (cost 2), the same alignment costs (3 × 2) + 1 + 1 = 8. Always state the costs.`, `<b>نظام آخر:</b> إذا كان الاستبدال بتكلفة 2 تصبح التكلفة 8، فاذكر دائمًا التكاليف.`]
  ],
  check: [`With unit costs, what is the edit distance between cat and cart?`, `بتكلفة 1، ما مسافة التحرير بين cat وcart؟`, [`0`, `1`, `2`, `4`], 1, `One insertion (r).`, `إدراج واحد.`],
  remember: [`Three operations (insert, delete, substitute). Levenshtein = all cost 1. intention → execution = 5, or 8 if substitution costs 2.`, `ثلاث عمليات، وليفنشتاين كلها 1، والمثال 5 أو 8.`]
};

LESSONS.c2s22 = {
  big: [`Trying every possible edit sequence would take forever. Instead we fill a table where <b>D[i, j]</b> is the distance between the first i letters of the source and the first j letters of the target. Each cell needs only its three neighbours, so we solve every small problem once: <b>dynamic programming</b>.`, `تجربة كل تسلسلات التحرير مستحيلة عمليًّا، فنملأ جدولًا فيه <b>D[i, j]</b> هي المسافة بين أول i حروف من المصدر وأول j من الهدف. كل خلية تحتاج ثلاثة جيران فقط، وهذه <b>البرمجة الديناميكية</b>.`],
  steps: [
    [`<b>First row and column:</b> 0, 1, 2, 3… because turning 3 letters into the empty string takes 3 deletions.`, `<b>الصف والعمود الأولان:</b> 0، 1، 2، 3… لأن تحويل 3 حروف إلى فراغ يحتاج 3 حذف.`],
    [`<b>From above</b> D[i−1, j] + 1: <b>delete</b> source letter i.`, `<b>من الأعلى</b> + 1: <b>حذف</b> حرف المصدر.`],
    [`<b>From the left</b> D[i, j−1] + 1: <b>insert</b> target letter j.`, `<b>من اليسار</b> + 1: <b>إدراج</b> حرف الهدف.`],
    [`<b>From the diagonal</b> D[i−1, j−1] + 0 if the letters match, + 1 if they differ (<b>substitute</b>).`, `<b>من القطر</b> + 0 عند التطابق و+ 1 عند الاختلاف (<b>استبدال</b>).`],
    [`Take the <b>minimum</b> of the three. Fill row by row, left to right; the answer is the bottom-right cell D[n, m]. (The same idea returns as the Viterbi algorithm in Week 9.)`, `خذ <b>أصغر</b> القيم الثلاث، واملأ صفًّا صفًّا، والإجابة في الخلية الأخيرة.`]
  ],
  analogy: [`Like planning the cheapest route through a grid of streets: to know the cheapest cost to any corner, you only need the cheapest costs to the three corners you can arrive from.`, `مثل تخطيط أرخص طريق في شبكة شوارع: لتعرف أرخص تكلفة لأي زاوية تحتاج فقط أرخص تكلفة للزوايا الثلاث التي تصل منها.`],
  confuse: { a: [`Move from above`, `<b>Delete</b> a source letter (source gets shorter).`, `<b>حذف</b> حرف من المصدر.`], b: [`Move from the left`, `<b>Insert</b> a target letter (we add what the target needs).`, `<b>إدراج</b> حرف من الهدف.`], why: [`Rows are the source and columns are the target. Moving down uses up a source letter without producing a target letter: that is a deletion. Moving right produces a target letter from nothing: an insertion.`, `الصفوف للمصدر والأعمدة للهدف. النزول يستهلك حرف مصدر دون إنتاج حرف هدف (حذف)، والتحرك لليمين ينتج حرف هدف من لا شيء (إدراج).`] },
  check: [`D[i−1, j−1] = 2 and the two current letters are equal. What does the diagonal option give?`, `D[i−1, j−1] = 2 والحرفان متساويان. ماذا يعطي خيار القطر؟`, [`1`, `2`, `3`, `4`], 1, `A match costs 0, so 2 + 0 = 2.`, `التطابق بتكلفة 0 فالنتيجة 2.`],
  remember: [`D[i,j] = min(above + 1, left + 1, diagonal + 0/1). First row/column 0, 1, 2…; answer at D[n, m].`, `D[i,j] = min(الأعلى + 1، اليسار + 1، القطر + 0/1)، والإجابة في D[n, m].`]
};

LESSONS.c2s23 = {
  big: [`Let's fill the lecture's table for <b>flaw → lawn</b> and then read the actual edits back out of it. The matrix gives the distance; the <b>backtrace</b> gives the alignment.`, `لنملأ جدول المحاضرة لـ <b>flaw ← lawn</b> ثم نستخرج التعديلات الفعلية منه. الجدول يعطي المسافة، و<b>التتبع الخلفي</b> يعطي المحاذاة.`],
  links: ['c2s22'],
  action: { w: 'med', cfg: { s: 'flaw', t: 'lawn' }, cap: [`Press "Fill next cell" and read the explanation of each cell, then "Backtrace". Try your own words too (graffe → giraffe, intention → execution).`, `اضغط "Fill next cell" واقرأ شرح كل خلية ثم "Backtrace"، وجرّب كلماتك أيضًا.`] },
  steps: [
    [`D[f, l]: f ≠ l → min(above 1+1, left 1+1, diagonal 0+1) = 1.`, `D[f, l] = 1.`],
    [`D[a, a]: match → diagonal D[l, l] + 0 = 1.`, `D[a, a]: تطابق ← 1.`],
    [`D[w, n]: w ≠ n → min(3+1, 1+1, 2+1) = 2. The bottom-right cell: <b>MED(flaw, lawn) = 2</b>.`, `D[w, n] = 2 وهي المسافة النهائية.`],
    [`<b>Backtrace:</b> while filling, store an arrow to the neighbour that gave the minimum. Start at D[4,4] and follow the arrows: insert n ← match w ← match a ← match l ← delete f.`, `<b>التتبع:</b> خزّن سهمًا للجار الذي أعطى الأقل، ثم اتبع الأسهم من D[4,4].`],
    [`Read it forwards: <b>flaw → law (delete f) → lawn (insert n)</b>. Two costly operations = distance 2. A tie means more than one optimal alignment.`, `اقرأها للأمام: flaw ← law ← lawn، عمليتان = 2، والتعادل يعني أكثر من محاذاة مثلى.`]
  ],
  check: [`Which two operations turn flaw into lawn?`, `ما العمليتان اللتان تحولان flaw إلى lawn؟`, [`Substitute f→l, substitute w→n`, `Delete f, insert n`, `Insert l, delete w`, `Delete f, delete w`], 1, `The backtrace gives delete f, match l a w, insert n.`, `التتبع يعطي حذف f وإدراج n.`],
  remember: [`MED(flaw, lawn) = 2: delete f, insert n. Matrix = score; backpointers = alignment.`, `المسافة 2: حذف f وإدراج n. الجدول نتيجة والمؤشرات محاذاة.`],
  teach: [`Explain how the backtrace turns the finished matrix into an alignment.`, `اشرح كيف يحوّل التتبع الخلفي الجدول المكتمل إلى محاذاة.`, `While filling each cell we store backpointers to the neighbour (or neighbours, if tied) that produced the minimum. After the table is complete, we start at the bottom-right cell D[n, m] and follow the pointers back to D[0, 0]. A diagonal step is a match or substitution, a step up is a deletion, and a step left is an insertion. For flaw → lawn the path gives: delete f, match l, a, w, insert n, so the distance is 2.`, `نخزّن أثناء الملء مؤشرات للجار الذي أعطى الأقل، ثم نبدأ من الخلية الأخيرة ونتبعها حتى D[0, 0]: القطر تطابق أو استبدال، والأعلى حذف، واليسار إدراج. ولـ flaw ← lawn: حذف f وإدراج n.`]
};

LESSONS.c2s24 = {
  big: [`Speech recognizers are scored with the same algorithm, applied to <b>words</b> instead of letters. Align the system's transcript with the reference, count substitutions, deletions and insertions, and divide by the number of reference words: the <b>word error rate</b>.`, `أنظمة التعرف على الكلام تُقيَّم بالخوارزم نفسه على <b>الكلمات</b>: نحاذي مخرج النظام مع المرجع ونعدّ الاستبدال والحذف والإدراج ونقسم على عدد كلمات المرجع: <b>معدل خطأ الكلمات</b>.`],
  links: ['c2s23'],
  action: { w: 'med', cfg: { s: 'the cat sat on the mat', t: 'the cat sit on mat', words: true }, cap: [`Slide 57's example in word mode. Press "Backtrace" to see the substitution and the deletion.`, `مثال الشريحة 57 على مستوى الكلمات. اضغط "Backtrace".`] },
  steps: [
    [`<b>WER = (S + D + I) / N_reference.</b>`, `<b>WER = (S + D + I) / عدد كلمات المرجع.</b>`],
    [`Reference "the cat sat on the mat" (6 words); system "the cat sit on mat".`, `المرجع 6 كلمات والنظام "the cat sit on mat".`],
    [`sat → sit is one substitution; the missing "the" is one deletion: S = 1, D = 1, I = 0.`, `استبدال واحد وحذف واحد.`],
    [`WER = 2/6 = <b>0.33 (33%)</b>. The denominator is the reference length, never the system output's.`, `WER = 2/6 = 0.33، والمقام طول المرجع دائمًا.`]
  ],
  check: [`Reference "the cat sat", system "the cat". WER?`, `المرجع "the cat sat" والنظام "the cat". ما WER؟`, [`0`, `1/2`, `1/3`, `2/3`], 2, `One deletion over 3 reference words.`, `حذف واحد من 3 كلمات.`],
  remember: [`WER = (S + D + I) / N_reference: edit distance on words. "the cat sit on mat" → 2/6 = 0.33.`, `WER = مسافة التحرير على الكلمات ÷ كلمات المرجع.`]
};
