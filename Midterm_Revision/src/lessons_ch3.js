/* Guided lessons – Week 3: Language Modelling */
MISSIONS.ch3 = [
  { t: [`What a language model is`, `ما هو النموذج اللغوي`], goal: [`Define a language model and explain how n-grams and the Markov assumption make it practical.`, `عرّف النموذج اللغوي واشرح كيف تجعله n-gram وافتراض ماركوف عمليًّا.`], secs: ['1', '2', '3', '4', '5', '6'] },
  { t: [`Turning counts into probabilities`, `تحويل العدّ إلى احتمالات`], goal: [`Compute bigram probabilities and sentence probabilities by hand.`, `احسب احتمالات الثنائي واحتمال الجملة يدويًّا.`], secs: ['7', '8', '9', '10'] },
  { t: [`Evaluating a language model`, `تقييم النموذج اللغوي`], goal: [`Use train/dev/test correctly and compute and interpret perplexity.`, `استخدم مجموعات البيانات بشكل صحيح واحسب الحيرة وفسّرها.`], secs: ['11', '12', '13', '14'] },
  { t: [`When counts fail: zeros, unknown words and smoothing`, `عندما يفشل العدّ: الأصفار والكلمات المجهولة والتنعيم`], goal: [`Explain the zero-count and unknown-word problems and how smoothing, backoff and interpolation fix them.`, `اشرح مشكلتي الأصفار والكلمات المجهولة وكيف يعالجها التنعيم والرجوع والاستيفاء.`], secs: ['15', '16', '17', '18', '19', '20'] },
  { t: [`Generating text`, `توليد النص`], goal: [`Describe how a language model generates text and how the n-gram order affects it.`, `صف كيف يولّد النموذج النص وكيف تؤثر رتبة n-gram.`], secs: ['21', '22'] }
];

LESSONS.c3s1 = {
  big: [`A language model is a word predictor. Given what has been said so far, it says how likely each possible next word is. That one skill, predicting the next word, turns out to teach a model a lot about language.`, `النموذج اللغوي متنبئ بالكلمات: بمعلومية ما قيل حتى الآن، يقول ما احتمال كل كلمة تالية ممكنة. وهذه المهارة الواحدة تعلّم النموذج الكثير عن اللغة.`],
  think: [`"The water of Walden Pond is so beautifully …" Rank these next words from most to least likely: refrigerator, blue, clear, green.`, `"The water of Walden Pond is so beautifully …" رتّب الكلمات التالية من الأكثر للأقل احتمالًا: refrigerator وblue وclear وgreen.`, `blue, clear and green are all likely; refrigerator is very unlikely. You just acted as a language model: you assigned higher probability to words that fit the context.`, `blue وclear وgreen محتملة وrefrigerator غير محتملة. لقد تصرفت كنموذج لغوي: أعطيت احتمالًا أعلى للكلمات المناسبة للسياق.`],
  steps: [
    [`<b>Speech recognition:</b> prefer "back soonish" over "bassoon dish" when the audio is unclear.`, `<b>التعرف على الكلام:</b> تفضيل "back soonish" على "bassoon dish".`],
    [`<b>Spelling and grammar:</b> prefer "There are" over "Their are", because the sentence probability is higher.`, `<b>الإملاء والقواعد:</b> تفضيل "There are" على "Their are".`],
    [`<b>Autocomplete / AAC:</b> suggest likely words to reduce typing or support communication.`, `<b>الإكمال التلقائي:</b> اقتراح كلمات محتملة.`],
    [`<b>Modern LMs:</b> generate text by predicting the next token again and again (Week 7).`, `<b>النماذج الحديثة:</b> تولّد النص بالتنبؤ المتكرر بالرمز التالي.`]
  ],
  remember: [`An LM predicts P(next word | previous context). That helps speech recognition, spelling correction, autocomplete and modern text generation.`, `النموذج اللغوي يتنبأ بـ P(الكلمة التالية | السياق)، وهذا يفيد التعرف على الكلام والتصحيح والإكمال والتوليد.`]
};

LESSONS.c3s2 = {
  big: [`A language model estimates two connected things: the probability of the <b>next word given a history</b>, P(w | h), and the probability of a <b>whole sentence</b>, P(w₁, …, wₙ). The second is built from the first.`, `يقدّر النموذج اللغوي أمرين مترابطين: احتمال <b>الكلمة التالية بمعلومية التاريخ</b> P(w | h)، واحتمال <b>الجملة كاملة</b> P(w₁…wₙ)، والثاني مبني من الأول.`],
  steps: [
    [`<b>P(w | h):</b> w is a candidate next word, h is the history. Example: P(help | thank you for your).`, `<b>P(w | h):</b> w الكلمة المرشحة وh التاريخ، مثل P(help | thank you for your).`],
    [`<b>P(w₁, …, wₙ):</b> the probability of a complete sequence, used to compare candidate sentences or to score a test set.`, `<b>P(w₁…wₙ):</b> احتمال سلسلة كاملة لمقارنة الجمل أو تقييم مجموعة اختبار.`]
  ],
  check: [`Comparing "There are" with "Their are" uses which quantity?`, `مقارنة "There are" مع "Their are" تستخدم أي كمية؟`, [`Next-word probability only`, `Sentence probability`, `Vocabulary size`, `Perplexity of the training set`], 1, `We score each complete candidate sentence and pick the more probable one.`, `نقيّم كل جملة مرشحة كاملة ونختار الأكثر احتمالًا.`],
  remember: [`LM = probabilities for next words P(w | h) or whole sequences P(w₁…wₙ).`, `النموذج اللغوي = احتمال الكلمة التالية أو السلسلة كاملة.`]
};

LESSONS.c3s3 = {
  big: [`Why not just count how often "blue" followed the <i>whole</i> phrase "The water of Walden Pond is so beautifully"? Because long phrases are rare: that exact phrase may never appear, even in a huge corpus. Counts on long histories are zero or unreliable.`, `لماذا لا نعدّ كم مرة جاءت blue بعد العبارة <i>كاملة</i>؟ لأن العبارات الطويلة نادرة وقد لا تظهر أبدًا حتى في مدونة ضخمة، فتكون أعداد التواريخ الطويلة صفرًا أو غير موثوقة.`],
  steps: [
    [`The exact long phrase may never appear in the corpus.`, `قد لا تظهر العبارة الطويلة نفسها أبدًا.`],
    [`Even if it appears once, one observation is not a stable estimate.`, `وحتى إن ظهرت مرة، فظهور واحد لا يعطي تقديرًا مستقرًّا.`],
    [`<b>Solution:</b> approximate the history with only the last n − 1 words. That is what n-grams do (next topics).`, `<b>الحل:</b> تقريب التاريخ بآخر n − 1 كلمات فقط، وهذا ما تفعله n-grams.`]
  ],
  remember: [`Full histories are too sparse to count reliably, so we keep only the last n − 1 words.`, `التواريخ الكاملة نادرة جدًّا، فنحتفظ بآخر n − 1 كلمات فقط.`]
};

LESSONS.c3s4 = {
  big: [`An <b>n-gram</b> is simply a run of n consecutive tokens. An n-gram model predicts the next token from the previous n − 1 tokens.`, `<b>n-gram</b> سلسلة من n رموز متتالية، ونموذج n-gram يتنبأ بالرمز التالي من آخر n − 1 رموز.`],
  steps: [
    [`<b>Unigram (n = 1):</b> "homework": no history at all.`, `<b>أحادي:</b> "homework" بلا تاريخ.`],
    [`<b>Bigram (n = 2):</b> "your homework": uses the previous 1 word.`, `<b>ثنائي:</b> "your homework" يستخدم كلمة واحدة سابقة.`],
    [`<b>Trigram (n = 3):</b> "turn your homework": uses the previous 2 words.`, `<b>ثلاثي:</b> "turn your homework" يستخدم كلمتين.`],
    [`Tokens can be words, punctuation or subword pieces, depending on the tokenizer (Week 2).`, `الرموز قد تكون كلمات أو علامات ترقيم أو وحدات فرعية.`]
  ],
  check: [`A trigram model predicts the next word using:`, `نموذج الثلاثي يتنبأ بالكلمة التالية باستخدام:`, [`No history`, `The previous 1 word`, `The previous 2 words`, `The previous 3 words`], 2, `n = 3, so it uses n − 1 = 2 previous words.`, `n = 3 فيستخدم n − 1 = 2.`],
  remember: [`n-gram = n consecutive tokens; the model uses the previous n − 1.`, `n-gram = n رموز متتالية، والنموذج يستخدم آخر n − 1.`]
};

LESSONS.c3s5 = {
  big: [`The <b>Markov assumption</b> is the trick that makes n-grams work: pretend that only the recent words matter for predicting the next one. P(wₙ | w₁…wₙ₋₁) ≈ P(wₙ | wₙ₋ₙ₊₁…wₙ₋₁).`, `<b>افتراض ماركوف</b> هو الحيلة التي تجعل n-grams تعمل: نفترض أن الكلمات القريبة فقط تهم في التنبؤ بالتالية.`],
  analogy: [`Like a forgetful friend who finishes your sentences using only your last word or two. Usually they are right, but they miss a joke that depended on something you said a minute ago.`, `مثل صديق كثير النسيان يكمل جملك من آخر كلمة أو كلمتين؛ غالبًا يصيب، لكنه يفوّت نكتة اعتمدت على شيء قلته قبل دقيقة.`],
  steps: [
    [`Unigram: no history. Bigram: the previous word. Trigram: the previous two words.`, `أحادي بلا تاريخ، وثنائي كلمة سابقة، وثلاثي كلمتان.`],
    [`It is an <b>approximation</b>, not a claim that older words never matter.`, `إنه <b>تقريب</b> وليس ادعاءً بأن الكلمات الأقدم لا تهم.`],
    [`<b>Its weakness:</b> long-distance dependencies. In "The computer … on the fifth floor crashed", <i>crashed</i> depends on <i>computer</i>, which is far outside a short window.`, `<b>نقطة ضعفه:</b> الاعتماديات البعيدة: crashed تعتمد على computer البعيدة.`]
  ],
  check: [`Why does the Markov assumption struggle with "The computer … on the fifth floor crashed"?`, `لماذا يتعثر افتراض ماركوف مع هذه الجملة؟`, [`The sentence has no verb`, `"crashed" depends on a word far outside the short history`, `The sentence is too short`, `It has unknown words`], 1, `A bigram or trigram only sees "floor" before "crashed".`, `الثنائي أو الثلاثي يرى floor فقط قبل crashed.`],
  remember: [`Markov: only the last n − 1 words matter. It is an approximation that misses long-distance dependencies.`, `ماركوف: آخر n − 1 كلمات فقط، وهو تقريب يفوّت الاعتماديات البعيدة.`],
  teach: [`State the Markov assumption and give its main limitation with the lecture's example.`, `اذكر افتراض ماركوف وقيده الرئيسي مع مثال المحاضرة.`, `The Markov assumption approximates the full history by the recent context: P(wₙ | w₁…wₙ₋₁) ≈ P(wₙ | wₙ₋ₙ₊₁…wₙ₋₁), so a bigram uses only the previous word and a trigram the previous two. It is an approximation, not a claim that older words never matter. Its limitation is long-distance dependencies: in "The computer … on the fifth floor crashed", the verb depends on "computer", which a short window cannot see.`, `يقرّب افتراض ماركوف التاريخ بالسياق القريب، فالثنائي يستخدم كلمة واحدة. وهو تقريب، وقيده الاعتماديات البعيدة كما في مثال computer … crashed.`]
};

LESSONS.c3s6 = {
  big: [`How do we get the probability of a whole sentence? The <b>chain rule</b> says: multiply the probability of each word given everything before it. The Markov assumption then shortens each "everything before it" to just the previous word (bigram).`, `كيف نحصل على احتمال جملة كاملة؟ <b>قاعدة السلسلة</b> تقول: اضرب احتمال كل كلمة بمعلومية كل ما قبلها، ثم يختصر افتراض ماركوف "كل ما قبلها" إلى الكلمة السابقة فقط.`],
  links: ['c3s5'],
  steps: [
    [`<b>Exact (chain rule):</b> P(w₁:ₙ) = Πᵢ P(wᵢ | w₁:ᵢ₋₁).`, `<b>الدقيق:</b> P(w₁:ₙ) = Πᵢ P(wᵢ | w₁:ᵢ₋₁).`],
    [`<b>Bigram approximation:</b> P(w₁:ₙ) ≈ Πᵢ P(wᵢ | wᵢ₋₁).`, `<b>التقريب الثنائي:</b> P(w₁:ₙ) ≈ Πᵢ P(wᵢ | wᵢ₋₁).`],
    [`<b>Unigram:</b> P(w₁)P(w₂)…: robust counts, weak coherence. <b>Bigram:</b> better local fluency. <b>Trigram:</b> more context, more sparsity.`, `<b>الأحادي:</b> عدّ مستقر وترابط ضعيف. <b>الثنائي:</b> سلاسة محلية أفضل. <b>الثلاثي:</b> سياق أكثر وتشتت أكثر.`]
  ],
  check: [`In the bigram approximation, each factor is:`, `في التقريب الثنائي، كل عامل هو:`, [`P(wᵢ)`, `P(wᵢ | wᵢ₋₁)`, `P(wᵢ | w₁:ᵢ₋₁)`, `P(wᵢ₋₁ | wᵢ)`], 1, `Each word is conditioned only on the previous word.`, `كل كلمة مشروطة بالكلمة السابقة فقط.`],
  remember: [`Sentence probability = multiply each word's probability given its allowed context. Bigram: Π P(wᵢ | wᵢ₋₁).`, `احتمال الجملة = حاصل ضرب احتمال كل كلمة بمعلومية سياقها المسموح.`]
};

LESSONS.c3s7 = {
  big: [`Where do the probabilities come from? <b>Counting.</b> To estimate P(am | I), count how often "I am" occurs and divide by how often "I" occurs. This is <b>maximum likelihood estimation (MLE)</b>.`, `من أين تأتي الاحتمالات؟ <b>من العدّ.</b> لتقدير P(am | I) نعدّ "I am" ونقسم على عدد مرات "I". هذا <b>التقدير بأقصى احتمالية</b>.`],
  steps: [
    [`From conditional probability, P(A | B) = C(B, A) / C(B).`, `من الاحتمال الشرطي: P(A | B) = C(B, A) / C(B).`],
    [`With words: <b>P(wᵢ | wᵢ₋₁) = C(wᵢ₋₁ wᵢ) / C(wᵢ₋₁)</b>.`, `مع الكلمات: <b>P(wᵢ | wᵢ₋₁) = C(wᵢ₋₁ wᵢ) / C(wᵢ₋₁)</b>.`],
    [`The numerator counts the bigram; the <b>denominator counts the history word</b>, not the whole sentence and not the candidate word.`, `البسط يعدّ الثنائي، و<b>المقام يعدّ كلمة التاريخ</b> وليس الجملة ولا الكلمة المرشحة.`],
    [`&lt;s&gt; and &lt;/s&gt; mark the start and end of each sentence, so the first word has a history and the end of a sentence can be predicted.`, `&lt;s&gt; و&lt;/s&gt; تحددان بداية الجملة ونهايتها.`]
  ],
  analogy: [`Imagine you note what your friend orders after saying "I'll have…". Out of 10 times, 7 were coffee. Your best guess for P(coffee | I'll have) is 7/10: the count of the pair divided by the count of the history.`, `تخيّل أنك تسجّل ماذا يطلب صديقك بعد قوله "I'll have…": من 10 مرات طلب القهوة 7، فأفضل تقدير 7/10: عدد الزوج ÷ عدد التاريخ.`],
  confuse: { a: [`Right denominator`, `C(history), e.g. C(I) = 3 for P(am | I).`, `عدد التاريخ مثل C(I) = 3.`], b: [`Wrong denominators`, `Total words in the corpus, or the count of the candidate word "am".`, `عدد كلمات المدونة أو عدد الكلمة المرشحة.`], why: [`The probability answers "of all the times we saw the history, how often did this word follow?", so the history count goes underneath.`, `الاحتمال يجيب: "من كل مرات رؤية التاريخ، كم مرة تلته هذه الكلمة؟"، لذا يكون عدد التاريخ في المقام.`] },
  check: [`In the "I am Sam" corpus, "I" occurs 3 times and "I am" occurs 2 times. P(am | I) = ?`, `في مدونة "I am Sam" تظهر I ثلاث مرات وI am مرتين. P(am | I) = ؟`, [`2/3`, `1/3`, `2/11`, `3/2`], 0, `C(I am) / C(I) = 2/3.`, `2/3.`],
  remember: [`MLE bigram: P(wᵢ | wᵢ₋₁) = C(wᵢ₋₁ wᵢ) / C(wᵢ₋₁). The denominator is the history count.`, `تقدير الثنائي: عدد الثنائي ÷ عدد التاريخ.`]
};

LESSONS.c3s8 = {
  big: [`Put it together on the lecture's practice corpus. Every number here is a count divided by a count, and a sentence's probability is the product of its bigram probabilities.`, `لنطبّق ذلك على مدونة التمرين: كل رقم عدّ مقسوم على عدّ، واحتمال الجملة حاصل ضرب احتمالات ثنائياتها.`],
  links: ['c3s7'],
  action: { w: 'bigram', cfg: { corpus: 'I like NLP\nI like AI\nAI is useful', sentence: 'I like NLP', add1: false }, cap: [`Slides 15–16. The table shows each factor; the sentence probability should be 1/3. Then try "I like AI NLP" to meet a zero.`, `الشريحتان 15–16: احتمال الجملة يجب أن يكون 1/3، ثم جرّب "I like AI NLP" لترى الصفر.`] },
  steps: [
    [`P(I | &lt;s&gt;) = 2/3, because 2 of the 3 sentences start with I.`, `P(I | &lt;s&gt;) = 2/3.`],
    [`P(like | I) = 2/2 = 1. P(AI | like) = 1/2. P(NLP | AI) = 0/2 = 0, because "AI NLP" never occurs.`, `P(like | I) = 1، وP(AI | like) = 1/2، وP(NLP | AI) = 0.`],
    [`P(&lt;s&gt; I like NLP &lt;/s&gt;) = 2/3 × 1 × 1/2 × 1 = <b>1/3 ≈ 0.333</b>.`, `احتمال الجملة = 1/3.`]
  ],
  check: [`What is P(AI | like) in the practice corpus?`, `ما P(AI | like) في مدونة التمرين؟`, [`1`, `1/2`, `1/3`, `0`], 1, `"like" occurs 2 times, followed once by "AI".`, `like تظهر مرتين وتليها AI مرة واحدة.`],
  remember: [`P(like | I) = 1, P(AI | like) = 1/2, P(NLP | AI) = 0; P(&lt;s&gt; I like NLP &lt;/s&gt;) = 1/3.`, `القيم 1 و1/2 و0، واحتمال الجملة 1/3.`]
};

LESSONS.c3s9 = {
  big: [`Multiplying many small probabilities gives numbers so tiny that a computer rounds them to zero (<b>underflow</b>). The fix: add <b>log probabilities</b> instead of multiplying probabilities. log(p₁ × p₂ × …) = log p₁ + log p₂ + …`, `ضرب احتمالات صغيرة كثيرة يعطي أرقامًا صغيرة جدًّا يقرّبها الحاسوب إلى صفر (<b>تجاوز سفلي</b>). الحل: جمع <b>لوغاريتمات الاحتمالات</b> بدل الضرب.`],
  check: [`Why do language models store log probabilities?`, `لماذا تخزّن النماذج لوغاريتمات الاحتمالات؟`, [`To make probabilities larger than 1`, `To avoid numerical underflow by adding instead of multiplying`, `To remove zeros`, `To compute perplexity faster only`], 1, `The product of many small numbers underflows; a sum of logs does not.`, `حاصل ضرب أرقام صغيرة كثيرة يتجاوز سفليًّا، ومجموع اللوغاريتمات لا يفعل.`],
  remember: [`Multiply many small probabilities → underflow. Use logs: add instead of multiply.`, `الضرب يسبب تجاوزًا سفليًّا، فنجمع اللوغاريتمات.`]
};

LESSONS.c3s10 = {
  big: [`Should we use bigrams, trigrams or 5-grams? More context gives more fluent local predictions, but the number of possible contexts explodes, so more of them are never seen in training: more <b>zero counts</b>. Higher n is better only with enough data and smoothing.`, `هل نستخدم الثنائي أم الثلاثي أم أكثر؟ السياق الأكثر يعطي سلاسة محلية أفضل، لكن عدد السياقات الممكنة ينفجر فلا يُرى كثير منها: <b>أصفار</b> أكثر. N الأعلى أفضل فقط مع بيانات كافية وتنعيم.`],
  analogy: [`Like predicting traffic: knowing the hour helps a lot; also knowing the exact street, weather and day helps more, but you will rarely have past data for that exact combination.`, `مثل التنبؤ بالزحام: معرفة الساعة تساعد، ومعرفة الشارع والطقس واليوم تساعد أكثر، لكن نادرًا ما تملك بيانات سابقة لهذه التركيبة بالضبط.`],
  remember: [`Higher n → better local fluency but more zero counts (sparsity).`, `N أعلى ← سلاسة أفضل وأصفار أكثر.`]
};

LESSONS.c3s11 = {
  big: [`To judge a model fairly, it must be tested on text it has never seen. So the data is split: <b>training</b> (≈80%) to count n-grams, <b>development</b> (≈10%) to tune choices such as smoothing, and <b>test</b> (≈10%) for the final evaluation.`, `لتقييم النموذج بعدل يجب اختباره على نص لم يره، لذا تُقسم البيانات: <b>تدريب</b> (≈80%) للعدّ، و<b>تطوير</b> (≈10%) لضبط الخيارات، و<b>اختبار</b> (≈10%) للتقييم النهائي.`],
  analogy: [`It is like studying with past papers but keeping one exam paper sealed. If you peek at the sealed paper while studying, your score on it no longer tells you how well you really know the material.`, `مثل المذاكرة بأسئلة سابقة مع إبقاء ورقة امتحان مغلقة؛ إذا نظرت إليها أثناء المذاكرة فلن تخبرك درجتك فيها بمستواك الحقيقي.`],
  remember: [`Train ≈80% (counts), dev ≈10% (tuning), test ≈10% (final). Never train on the test set.`, `تدريب وتطوير واختبار، ولا تدرب على الاختبار أبدًا.`]
};

LESSONS.c3s12 = {
  big: [`There are two ways to check whether a language model is good. <b>Intrinsic</b>: measure the model directly (perplexity), which is fast and cheap. <b>Extrinsic</b>: plug it into a real task and see whether the task improves (e.g. speech recognition accuracy), which is realistic but expensive.`, `هناك طريقتان للتحقق من جودة النموذج: <b>داخلي</b> بقياس النموذج مباشرة (الحيرة) وهو سريع ورخيص، و<b>خارجي</b> بوضعه في مهمة حقيقية ورؤية تحسّنها، وهو واقعي لكنه مكلف.`],
  confuse: { a: [`Intrinsic`, `Measures the model on its own. Classic metric: perplexity. Fast, cheap, reusable.`, `يقيس النموذج وحده بالحيرة؛ سريع ورخيص.`], b: [`Extrinsic`, `Measures improvement in a real task, e.g. speech recognition accuracy. Realistic but expensive.`, `يقيس تحسّن مهمة حقيقية؛ واقعي لكنه مكلف.`], why: [`"In" = inside the model itself; "ex" = outside, in an application.`, `"داخلي" داخل النموذج نفسه، و"خارجي" في تطبيق.`] },
  check: [`Measuring how much a new LM improves a speech recognizer's word accuracy is:`, `قياس تحسّن دقة نظام التعرف على الكلام بنموذج جديد هو تقييم:`, [`Intrinsic`, `Extrinsic`, `Smoothing`, `Perplexity`], 1, `The model is evaluated inside a real application.`, `يُقيَّم النموذج داخل تطبيق حقيقي.`],
  remember: [`Intrinsic = model alone (perplexity, cheap). Extrinsic = inside a task (realistic, expensive).`, `الداخلي = النموذج وحده، والخارجي = داخل مهمة.`]
};

LESSONS.c3s13 = {
  big: [`<b>Perplexity</b> turns "how probable is the test text?" into an easy-to-read number: roughly <b>how many words the model is choosing between</b> at each step. A perplexity of 3 means the model is about as unsure as if it were picking among 3 equally likely words. <b>Lower is better.</b>`, `<b>الحيرة</b> تحوّل "ما احتمال نص الاختبار؟" إلى رقم سهل القراءة: تقريبًا <b>بين كم كلمة يختار النموذج</b> في كل خطوة. حيرة 3 تعني أنه متردد كأنه يختار بين 3 كلمات متساوية. <b>الأقل أفضل.</b>`],
  links: ['c3s12'],
  steps: [
    [`<b>Formula:</b> PP(W) = P(w₁…w_N)^(−1/N): the inverse probability of the test set, normalized by its length N.`, `<b>الصيغة:</b> PP(W) = P(W)^(−1/N): مقلوب الاحتمال مطبَّعًا بالطول.`],
    [`<b>Why inverse?</b> A higher probability for real text means a better model, and inverting makes "better" a smaller number.`, `<b>لماذا المقلوب؟</b> الاحتمال الأعلى يعني نموذجًا أفضل، والمقلوب يجعل "الأفضل" رقمًا أصغر.`],
    [`<b>Why the 1/N power?</b> It averages per word, so long and short texts can be compared.`, `<b>لماذا الأس 1/N؟</b> يحسب المتوسط لكل كلمة فيمكن مقارنة النصوص الطويلة والقصيرة.`],
    [`<b>Example:</b> 0.50 × 0.25 × 0.25 = 0.03125; 0.03125^(−1/3) ≈ <b>3.17</b> choices per word.`, `<b>مثال:</b> 0.03125^(−1/3) ≈ 3.17.`],
    [`<b>In practice:</b> unigram 962, bigram 170, trigram 109 on one test set. Compare only on the same test set and tokenisation.`, `<b>عمليًّا:</b> 962 و170 و109، وقارن فقط على مجموعة الاختبار والترميز نفسيهما.`]
  ],
  action: { w: 'ppl', cfg: { p: '0.5, 0.25, 0.25', presets: ['0.5, 0.25, 0.25', '0.9, 0.9, 0.9', '0.1, 0.1, 0.1', '0.8, 0.2'] }, cap: [`Change the probabilities and watch perplexity. Confident, correct predictions push it toward 1.`, `غيّر الاحتمالات وراقب الحيرة؛ التنبؤات الواثقة الصحيحة تقربها من 1.`] },
  analogy: [`Like a quiz-show contestant: perplexity 2 is like always narrowing it to two answers; perplexity 100 is like guessing among a hundred.`, `مثل متسابق في مسابقة: حيرة 2 كأنه يحصر الإجابة دائمًا في خيارين، وحيرة 100 كأنه يخمن بين مئة.`],
  check: [`Model A has perplexity 120 and model B 150 on the same test set. Which is better?`, `النموذج A حيرته 120 وB حيرته 150 على الاختبار نفسه. أيهما أفضل؟`, [`A`, `B`, `They are equal`, `Cannot compare perplexities`], 0, `Lower perplexity = higher probability on the real test text.`, `الحيرة الأقل = احتمال أعلى للنص الحقيقي.`],
  remember: [`PP(W) = P(W)^(−1/N) ≈ average number of choices per word. Lower is better; compare on the same test set and tokenisation.`, `الحيرة = متوسط عدد الخيارات لكل كلمة؛ الأقل أفضل.`],
  teach: [`Explain perplexity to a classmate without using the formula first, then give the formula and the 3.17 example.`, `اشرح الحيرة لزميل دون الصيغة أولًا، ثم أعطِ الصيغة ومثال 3.17.`, `Perplexity measures how surprised a model is by real test text: roughly the average number of plausible choices it is choosing between at each word. Lower means better predictions. Formally PP(W) = P(w₁…w_N)^(−1/N), the inverse probability of the test set normalized by length. If the model gives the three test words probabilities 0.5, 0.25 and 0.25, P(W) = 0.03125 and PP = 0.03125^(−1/3) ≈ 3.17. Models must be compared on the same test set and tokenisation.`, `الحيرة تقيس مدى تفاجؤ النموذج بالنص الحقيقي: متوسط عدد الخيارات المعقولة لكل كلمة، والأقل أفضل. وصيغتها P(W)^(−1/N)، ومثالها ≈ 3.17، وتُقارن على نفس الاختبار والترميز.`]
};

LESSONS.c3s14 = {
  big: [`A model can only sound like its data. Train on SMS messages to model SMS; train on legal documents to model legal text. Training on Shakespeare and testing on news gives poor probabilities, because genre, dialect and topic coverage shape the model.`, `النموذج لا يشبه إلا بياناته: درّب على الرسائل لنمذجة الرسائل، وعلى الوثائق القانونية للنصوص القانونية. التدريب على شكسبير والاختبار على الأخبار يعطي احتمالات ضعيفة.`],
  remember: [`Match the training domain to the test domain (SMS → SMS).`, `طابق مجال التدريب مع مجال الاختبار.`]
};

LESSONS.c3s15 = {
  big: [`Here is the biggest weakness of counting: anything never seen gets probability <b>zero</b>. And because sentence probability is a product, <b>one zero makes the whole sentence impossible</b>, even if every other word fits perfectly.`, `أكبر نقطة ضعف للعدّ: أي شيء لم يُرَ يحصل على <b>صفر</b>. ولأن احتمال الجملة حاصل ضرب، <b>صفر واحد يجعل الجملة كلها مستحيلة</b>.`],
  think: [`Training has "denied the allegations / reports / claims / request". Under raw MLE, what is P(offer | denied the)? Is that reasonable?`, `التدريب فيه "denied the allegations / reports / claims / request". ما P(offer | denied the) بالتقدير الخام؟ وهل هذا معقول؟`, `It is 0, because "denied the offer" never appeared. That is not reasonable: "denied the offer" is a perfectly normal phrase. A good model should give it a small probability, not zero.`, `صفر لأن "denied the offer" لم تظهر، وهذا غير معقول فالعبارة طبيعية، والنموذج الجيد يعطيها احتمالًا صغيرًا لا صفرًا.`],
  action: { w: 'bigram', cfg: { corpus: 'I like NLP\nI like AI\nAI is useful', sentence: 'I like AI NLP', add1: false }, cap: [`"AI NLP" never occurs in training, so this sentence gets probability 0 and perplexity cannot be computed. Keep this in mind for smoothing.`, `"AI NLP" لم تظهر في التدريب فاحتمال الجملة صفر ولا تُحسب الحيرة.`] },
  remember: [`Unseen n-gram → P = 0 → whole sentence P = 0. A good model gives small, not zero, probability.`, `n-gram غير مرئي ← صفر ← الجملة كلها صفر.`]
};

LESSONS.c3s16 = {
  big: [`Zero counts are about known words in a new combination. <b>Unknown words</b> are a different problem: the word itself is not in the vocabulary at all. The standard trick is a special token, <b>&lt;UNK&gt;</b>, that stands for "any word we don't know".`, `مشكلة الأصفار تخص كلمات معروفة في تركيبة جديدة. أما <b>الكلمات المجهولة</b> فمشكلة مختلفة: الكلمة نفسها ليست في المفردات. والحل رمز خاص <b>&lt;UNK&gt;</b> يعني "أي كلمة لا نعرفها".`],
  steps: [
    [`<b>Closed vocabulary:</b> all test words are known in advance, so there are no OOV words. Useful in constrained tasks.`, `<b>المفردات المغلقة:</b> كل كلمات الاختبار معروفة مسبقًا.`],
    [`<b>Open vocabulary:</b> new words may appear at test time. The <b>OOV rate</b> = the percentage of test tokens outside the vocabulary.`, `<b>المفردات المفتوحة:</b> قد تظهر كلمات جديدة، و<b>نسبة OOV</b> = نسبة رموز الاختبار خارج المفردات.`],
    [`<b>&lt;UNK&gt; recipe:</b> choose a vocabulary → replace rare / out-of-vocabulary training words with &lt;UNK&gt; → estimate &lt;UNK&gt;'s probability like any other token.`, `<b>طريقة &lt;UNK&gt;:</b> اختر المفردات ← استبدل الكلمات النادرة بـ &lt;UNK&gt; ← قدّر احتماله كأي رمز.`]
  ],
  confuse: { a: [`Zero-count problem`, `The <b>n-gram</b> is new ("denied the offer"); the words are known. Fixed by <b>smoothing</b>.`, `الـ <b>n-gram</b> جديد والكلمات معروفة، ويحله <b>التنعيم</b>.`], b: [`Unknown-word problem`, `The <b>word</b> itself is not in the vocabulary. Handled with <b>&lt;UNK&gt;</b>.`, `<b>الكلمة</b> نفسها غير موجودة، ويعالجها <b>&lt;UNK&gt;</b>.`], why: [`Both produce missing probabilities, so they get mixed up, but they need different fixes.`, `كلاهما يسبب احتمالات مفقودة فيُخلط بينهما، لكن لكل منهما حل مختلف.`] },
  check: [`What does the OOV rate measure?`, `ماذا تقيس نسبة OOV؟`, [`The share of zero bigrams`, `The percentage of test tokens outside the vocabulary`, `The perplexity of unknown words`, `How many words appear once`], 1, `Slide 26: OOV rate = percentage of test tokens outside the vocabulary.`, `الشريحة 26: نسبة رموز الاختبار خارج المفردات.`],
  remember: [`Closed vocab: no OOV. Open vocab: use &lt;UNK&gt; (replace rare training words, estimate it like any token). OOV rate = % of test tokens outside the vocabulary.`, `المغلقة بلا OOV، والمفتوحة تستخدم &lt;UNK&gt;.`]
};

LESSONS.c3s17 = {
  big: [`<b>Smoothing</b> takes a little probability away from things we have seen and gives it to things we haven't, so nothing gets exactly zero and the total still sums to 1. The simplest version, <b>add-one (Laplace)</b>, pretends every possible next word was seen one extra time.`, `<b>التنعيم</b> يأخذ قليلًا من احتمال ما رأيناه ويعطيه لما لم نره، فلا يصبح شيء صفرًا ويبقى المجموع 1. أبسط نسخة، <b>add-one (لابلاس)</b>، تتظاهر بأن كل كلمة تالية ممكنة ظهرت مرة إضافية.`],
  links: ['c3s15'],
  steps: [
    [`<b>Formula:</b> P_add1(wᵢ | h) = (C(h, wᵢ) + 1) / (C(h) + V).`, `<b>الصيغة:</b> (C(h, wᵢ) + 1) / (C(h) + V).`],
    [`<b>Why + V in the denominator?</b> We added 1 to each of the V possible next words, so the history's total grows by V. That keeps the probabilities summing to 1.`, `<b>لماذا + V؟</b> أضفنا 1 لكل من الكلمات V الممكنة، فيكبر المجموع بـ V ويبقى مجموع الاحتمالات 1.`],
    [`<b>Worked example:</b> V = 6, C(AI) = 2, C(AI NLP) = 0. Unsmoothed 0/2 = 0; add-one (0 + 1)/(2 + 6) = <b>1/8 = 0.125</b>.`, `<b>مثال:</b> بلا تنعيم 0، ومع add-one = 1/8 = 0.125.`],
    [`<b>Limitation:</b> with a large V it is too aggressive: it moves too much probability to unseen events. Better options follow: add-k, Good–Turing, absolute discounting, backoff, interpolation.`, `<b>القيد:</b> مع V كبيرة ينقل احتمالًا كبيرًا جدًّا لغير المرئي، والبدائل: add-k وGood–Turing والخصم والرجوع والاستيفاء.`]
  ],
  action: { w: 'bigram', cfg: { corpus: 'I like NLP\nI like AI\nAI is useful', sentence: 'I like AI NLP', add1: true }, cap: [`The same "impossible" sentence with add-one smoothing on. Check that P(NLP | AI) = (0 + 1) / (2 + 6) = 0.125, then switch smoothing off and on again.`, `الجملة "المستحيلة" نفسها مع التنعيم: تحقق أن P(NLP | AI) = 0.125.`] },
  analogy: [`Like a teacher who gives every student one bonus point before grading, so nobody ends up with an impossible zero. Fair, but if the class is huge, those bonus points add up to a lot.`, `مثل معلم يعطي كل طالب درجة إضافية قبل التصحيح حتى لا يحصل أحد على صفر؛ عادل، لكن مع فصل ضخم تتراكم الدرجات الإضافية كثيرًا.`],
  check: [`With V = 6, C(AI) = 2 and C(AI NLP) = 0, add-one gives P(NLP | AI) =`, `مع V = 6 وC(AI) = 2 وC(AI NLP) = 0، قيمة add-one:`, [`0`, `1/6`, `1/8`, `1/2`], 2, `(0 + 1) / (2 + 6) = 1/8.`, `(0 + 1) / (2 + 6) = 1/8.`],
  remember: [`Add-one: (C(h,w) + 1) / (C(h) + V). AI → NLP: 0 → 1/8. Too aggressive when V is large.`, `لابلاس: (C + 1) / (C(h) + V)، والمثال 1/8، وعنيف مع V كبيرة.`],
  teach: [`Explain add-one smoothing, why V is added to the denominator, and one weakness.`, `اشرح تنعيم لابلاس ولماذا نضيف V للمقام وعيبًا واحدًا.`, `Add-one smoothing pretends every possible next word appeared once more than it did: P = (C(h, w) + 1) / (C(h) + V). Because 1 is added for each of the V possible words, the denominator must grow by V so the probabilities still sum to 1. In the lecture example, P(NLP | AI) goes from 0/2 = 0 to (0 + 1)/(2 + 6) = 1/8. Its weakness is that with a large vocabulary it moves too much probability mass to unseen events.`, `لابلاس يتظاهر بأن كل كلمة ممكنة ظهرت مرة إضافية، ونضيف V للمقام ليبقى المجموع 1. في المثال يصبح الاحتمال 1/8 بدل صفر. وعيبه أنه ينقل كتلة كبيرة لغير المرئي مع مفردات كبيرة.`]
};

LESSONS.c3s19 = {
  big: [`When a trigram has never been seen, we can still use shorter histories. <b>Backoff</b> falls back: trigram if available, else bigram, else unigram (one model at a time). <b>Interpolation</b> always blends all three with weights λ that sum to 1.`, `عندما لا يُرى الثلاثي يمكننا استخدام تواريخ أقصر. <b>الرجوع</b> يتراجع: الثلاثي إن وُجد وإلا الثنائي وإلا الأحادي (نموذج واحد). <b>الاستيفاء</b> يمزج الثلاثة دائمًا بأوزان λ مجموعها 1.`],
  action: { steps: [[`Suppose for some word: P_tri = 0 (unseen), P_bi = 0.2, P_uni = 0.01. (Illustrative numbers, not from the slides.)`, `افترض: P_tri = 0 وP_bi = 0.2 وP_uni = 0.01 (أرقام توضيحية).`], [`<b>Backoff:</b> the trigram has no evidence, so fall back to the bigram: use 0.2.`, `<b>الرجوع:</b> لا دليل للثلاثي فنستخدم الثنائي 0.2.`], [`<b>Interpolation</b> with λ₁ = 0.1, λ₂ = 0.3, λ₃ = 0.6: 0.1(0.01) + 0.3(0.2) + 0.6(0) = 0.001 + 0.06 + 0 = <b>0.061</b>. Not zero.`, `<b>الاستيفاء:</b> 0.001 + 0.06 + 0 = 0.061، وليس صفرًا.`], [`The λ values are learned on held-out (development) data and must sum to 1.`, `تُتعلَّم λ على بيانات التطوير ومجموعها 1.`]], cap: [`A worked illustration of the two strategies.`, `مثال توضيحي للطريقتين.`] },
  confuse: { a: [`Backoff`, `<b>Fallback</b>: use one model at a time, the highest order that has evidence.`, `<b>احتياطي</b>: نموذج واحد، الأعلى رتبة الذي له دليل.`], b: [`Interpolation`, `<b>Mixture</b>: all orders contribute, P = λ₁P_uni + λ₂P_bi + λ₃P_tri.`, `<b>مزيج</b>: كل الرتب تساهم.`], why: [`Both use shorter histories, so they sound alike. Ask: "one model at a time, or a weighted blend of all of them?"`, `كلاهما يستخدم تواريخ أقصر. اسأل: نموذج واحد في كل مرة أم مزيج موزون للجميع؟`] },
  check: [`Which statement is true of interpolation?`, `أي عبارة صحيحة عن الاستيفاء؟`, [`It uses only the trigram when available`, `All orders contribute with λ weights that sum to 1`, `λ values are chosen on the test set`, `It never uses the unigram`], 1, `λ weights are learned on dev data and sum to 1.`, `أوزان λ من بيانات التطوير ومجموعها 1.`],
  remember: [`Backoff = fallback, one model at a time. Interpolation = λ₁P_uni + λ₂P_bi + λ₃P_tri, λ sum to 1, learned on dev data.`, `الرجوع احتياطي، والاستيفاء مزيج موزون مجموعه 1.`]
};

LESSONS.c3s20 = {
  big: [`(Additional depth.) For a lower-order model, being frequent isn't the same as being a good continuation. "Francisco" is frequent but almost always follows "San"; "of" follows many different words. <b>Kneser–Ney</b> rewards words that appear in many different contexts.`, `(تعمّق إضافي) في النموذج الأدنى، التكرار ليس كالفائدة كتكملة: Francisco متكررة لكنها تأتي غالبًا بعد San، أما of فتأتي بعد كلمات كثيرة. <b>Kneser–Ney</b> يكافئ الكلمات الظاهرة في سياقات كثيرة.`],
  remember: [`Kneser–Ney: reward words seen after many different words (of), not merely frequent ones (Francisco).`, `Kneser–Ney يكافئ تنوع السياقات لا التكرار وحده.`]
};

LESSONS.c3s21 = {
  big: [`Once a model can predict the next word, it can <b>write</b>: pick a word, add it to the context, predict again. The rule for picking matters: <b>sampling</b> picks according to probability (varied text), <b>greedy</b> always picks the top word (predictable, can repeat).`, `ما دام النموذج يتنبأ بالكلمة التالية فهو يستطيع <b>الكتابة</b>: اختر كلمة وأضفها للسياق وتنبأ مجددًا. وقاعدة الاختيار مهمة: <b>المعاينة</b> تختار حسب الاحتمال (نص متنوع)، و<b>الجشع</b> يختار الأعلى دائمًا (متوقع وقد يتكرر).`],
  steps: [
    [`Start with &lt;s&gt;. The model gives P(I | &lt;s&gt;) = 2/3, P(AI | &lt;s&gt;) = 1/3.`, `نبدأ بـ &lt;s&gt;: P(I) = 2/3 وP(AI) = 1/3.`],
    [`Sample "I" (it will be picked about 2 times out of 3). Append it.`, `نختار I (نحو مرتين من ثلاث) ونضيفها.`],
    [`P(like | I) = 1, so "like" is certain. Append it.`, `P(like | I) = 1 فتأتي like حتمًا.`],
    [`After "like": P(NLP | like) = P(AI | like) = 1/2. Either can appear.`, `بعد like: NLP أو AI باحتمال متساوٍ.`],
    [`Repeat until &lt;/s&gt; is generated.`, `كرر حتى توليد &lt;/s&gt;.`]
  ],
  confuse: { a: [`Sampling`, `Chooses <b>according to probability</b>; allows variation; sometimes picks a less likely word.`, `يختار <b>حسب الاحتمال</b>؛ يسمح بالتنوع.`], b: [`Greedy`, `<b>Always</b> the highest-probability word; predictable; can get repetitive or stuck in common phrases.`, `الأعلى احتمالًا <b>دائمًا</b>؛ متوقع وقد يتكرر.`], why: [`Week 7 builds on this with beam search, temperature, top-k and top-p.`, `يبني الأسبوع 7 على هذا بالبحث الحزمي والحرارة وtop-k وtop-p.`] },
  check: [`Text generated by a unigram model typically looks like:`, `النص المولَّد بنموذج أحادي يبدو عادة:`, [`"I want to eat Chinese food."`, `"food want the to Chinese I …"`, `Perfectly coherent paragraphs`, `Only the most frequent word repeated`], 1, `Plausible words, poor order, because a unigram model uses no history.`, `كلمات معقولة بترتيب ضعيف لأن الأحادي بلا تاريخ.`],
  remember: [`Generate: &lt;s&gt; → probabilities → sample → append → repeat until &lt;/s&gt;. Higher n = more local coherence.`, `التوليد: معاينة وإضافة وتكرار، وn الأعلى أكثر ترابطًا.`]
};
