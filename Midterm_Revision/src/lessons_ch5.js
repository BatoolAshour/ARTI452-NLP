/* Guided lessons – Week 5: Text Representation */
MISSIONS.ch5 = [
  { t: [`From text to vectors`, `من النص إلى المتجهات`], goal: [`Explain why text must become vectors and tell word vectors from document vectors.`, `اشرح لماذا يجب تحويل النص إلى متجهات وميّز متجهات الكلمات من المستندات.`], secs: ['1', '2', '3'] },
  { t: [`Sparse vectors: one-hot and Bag-of-Words`, `المتجهات المتناثرة: one-hot وBoW`], goal: [`Build one-hot and BoW vectors and say what BoW keeps and loses.`, `ابنِ متجهات one-hot وBoW وقل ما يحفظه BoW وما يفقده.`], secs: ['4', '5'] },
  { t: [`Weighting words with TF-IDF`, `وزن الكلمات بـ TF-IDF`], goal: [`Compute TF, DF, IDF and TF-IDF and explain why common words get low weight.`, `احسب TF وDF وIDF وTF-IDF واشرح لماذا تحصل الكلمات الشائعة على وزن منخفض.`], secs: ['6', '7', '8', '9'] },
  { t: [`Comparing vectors with cosine`, `مقارنة المتجهات بجيب التمام`], goal: [`Compute cosine similarity and explain why it ignores length.`, `احسب تشابه جيب التمام واشرح لماذا يتجاهل الطول.`], secs: ['10', '11'] },
  { t: [`Word meaning from context`, `معنى الكلمة من السياق`], goal: [`Explain the distributional hypothesis, co-occurrence matrices and PMI/PPMI.`, `اشرح الفرضية التوزيعية ومصفوفات التواجد وPMI/PPMI.`], secs: ['12', '13', '14', '15'] },
  { t: [`Dense embeddings`, `التضمينات الكثيفة`], goal: [`Compare sparse and dense vectors and explain Word2Vec and GloVe.`, `قارن المتجهات المتناثرة والكثيفة واشرح Word2Vec وGloVe.`], secs: ['16', '17', '18', '19'] },
  { t: [`Evaluation, bias and choosing a representation`, `التقييم والتحيز واختيار التمثيل`], goal: [`Evaluate embeddings, recognise bias and choose a representation for a task.`, `قيّم التضمينات وتعرّف على التحيز واختر تمثيلًا لمهمة.`], secs: ['20', '21', '22'] }
];

LESSONS.c5s1 = {
  big: [`Last week's classifiers needed numbers. This lecture answers one question: <b>how does text become a vector that keeps the signal a task needs?</b> Whatever a representation throws away (order, frequency, meaning), the model can never learn from.`, `مصنفات الأسبوع الماضي احتاجت أرقامًا. تجيب هذه المحاضرة عن سؤال واحد: <b>كيف يصبح النص متجهًا يحتفظ بالإشارة التي تحتاجها المهمة؟</b> وما يرميه التمثيل لا يمكن للنموذج تعلّمه.`],
  links: ['c4s7'],
  steps: [
    [`<b>Raw text is symbolic:</b> you cannot multiply words, so they must become numbers.`, `<b>النص رمزي:</b> لا يمكن ضرب الكلمات فيجب تحويلها لأرقام.`],
    [`<b>The representation limits learning:</b> if it drops order, frequency or meaning, so does the model.`, `<b>التمثيل يحدّ التعلّم:</b> ما يُسقطه لا يتعلمه النموذج.`],
    [`<b>Different tasks need different signals:</b> search needs term matching; semantic similarity needs dense embeddings.`, `<b>مهام مختلفة لإشارات مختلفة:</b> البحث يحتاج المطابقة، والتشابه الدلالي يحتاج التضمينات.`],
    [`<b>Pipeline:</b> "I love this movie" → tokens → numeric vector [v₁ … v_d] → model → positive.`, `<b>المسار:</b> نص ← رموز ← متجه ← نموذج ← إيجابي.`]
  ],
  remember: [`Every method here answers: how does text become a vector that keeps the signal the task needs?`, `كل طريقة هنا تجيب: كيف يصبح النص متجهًا يحفظ إشارة المهمة؟`]
};

LESSONS.c5s2 = {
  big: [`Before reading any vector, ask the lecture's <b>reading rule</b>: <i>does this vector represent a word or a document?</i> One-hot, PPMI, Word2Vec and GloVe describe <b>words</b>. Bag-of-Words and TF-IDF describe <b>documents</b>. Cosine is not a representation at all: it only <b>compares</b> vectors.`, `قبل قراءة أي متجه اسأل <b>قاعدة القراءة</b>: <i>هل يمثل كلمة أم مستندًا؟</i> one-hot وPPMI وWord2Vec وGloVe للكلمات، وBoW وTF-IDF للمستندات، وجيب التمام ليس تمثيلًا بل أداة <b>مقارنة</b>.`],
  steps: [
    [`<b>Track A (documents):</b> count each vocabulary term (BoW), then optionally reweight by document frequency (TF-IDF). Ready for classification, retrieval or cosine.`, `<b>المسار A (المستندات):</b> عدّ المصطلحات (BoW) ثم إعادة الوزن (TF-IDF).`],
    [`<b>Track B (words):</b> count nearby context words (co-occurrence), optionally reweight against chance (PPMI): still sparse.`, `<b>المسار B (الكلمات):</b> عدّ كلمات السياق ثم إعادة الوزن (PPMI)، ويبقى متناثرًا.`],
    [`<b>Dense route:</b> Word2Vec learns from local context pairs, GloVe from global co-occurrence counts. No PPMI step is needed before them.`, `<b>المسار الكثيف:</b> Word2Vec من أزواج محلية وGloVe من أعداد شاملة، دون الحاجة إلى PPMI.`],
    [`<b>Limits shared by all of them:</b> none encodes word order by itself, and static embeddings give one fixed vector per word type.`, `<b>قيود مشتركة:</b> لا يرمّز أي منها الترتيب، والتضمينات الثابتة متجه واحد لكل كلمة.`]
  ],
  confuse: { a: [`Representation`, `Builds a vector: one-hot, BoW, TF-IDF, PPMI, Word2Vec, GloVe.`, `يبني متجهًا.`], b: [`Cosine similarity`, `<b>Compares</b> two already-built vectors (word with word, document with document).`, `<b>يقارن</b> متجهين مبنيين.`], why: [`Cosine appears next to the representations, so it is often listed as one. It is a measuring tool, not a way to represent text.`, `يظهر جيب التمام بجانب التمثيلات فيُعدّ منها خطأً، وهو أداة قياس.`] },
  check: [`TF-IDF vectors represent:`, `متجهات TF-IDF تمثل:`, [`Words`, `Documents`, `Context windows`, `Similarity scores`], 1, `TF-IDF reweights Bag-of-Words counts for a whole document.`, `TF-IDF يعيد وزن أعداد مستند كامل.`],
  remember: [`Ask first: word or document? Word: one-hot, PPMI, Word2Vec, GloVe. Document: BoW, TF-IDF. Cosine compares; it is not a representation.`, `اسأل أولًا: كلمة أم مستند؟ وجيب التمام للمقارنة فقط.`]
};

LESSONS.c5s3 = {
  big: [`Every sparse vector depends on a <b>fixed vocabulary with a fixed order</b>. Position 1 must mean the same word in every vector, and the vocabulary size sets the length of every vector.`, `كل متجه متناثر يعتمد على <b>مفردات ثابتة بترتيب ثابت</b>: الموضع 1 يعني الكلمة نفسها في كل متجه، وحجم المفردات يحدد طول كل متجه.`],
  think: [`What does the vector [2, 1, 0, 1, 0] mean on its own?`, `ماذا يعني المتجه [2, 1, 0, 1, 0] وحده؟`, `Nothing. It only means something together with the vocabulary that produced it. With [good, movie, boring, plot, bad] it means "good ×2, movie ×1, plot ×1".`, `لا شيء؛ له معنى فقط مع المفردات التي أنتجته، ومع [good, movie, boring, plot, bad] يعني good مرتين وmovie وplot مرة.`],
  remember: [`Fixed vocabulary + fixed order → fixed length. Document length never changes vector length; out-of-vocabulary words are lost.`, `مفردات وترتيب ثابتان ← طول ثابت، والكلمات خارجها تضيع.`]
};

LESSONS.c5s4 = {
  big: [`<b>One-hot encoding</b> gives each word its own slot: a vector of length |V| with a single 1 at that word's position and 0 everywhere else. It says <i>which</i> word it is, and nothing about what it means.`, `<b>one-hot</b> يعطي كل كلمة خانة خاصة: متجه طوله |V| فيه 1 واحد في موضع الكلمة و0 في الباقي. يقول <i>أي</i> كلمة هي ولا شيء عن معناها.`],
  steps: [
    [`Vocabulary [cat, dog, movie]: cat = [1,0,0], dog = [0,1,0], movie = [0,0,1].`, `cat = [1,0,0] وdog = [0,1,0] وmovie = [0,0,1].`],
    [`<b>Strength:</b> simple and unambiguous; works as an internal index (a token ID selects a row of an embedding matrix, Week 6).`, `<b>الميزة:</b> بسيط وواضح ويعمل كفهرس داخلي.`],
    [`<b>Weakness 1:</b> very high dimensional: 50,000 words → 50,000 dimensions.`, `<b>العيب 1:</b> أبعاد كثيرة جدًّا.`],
    [`<b>Weakness 2:</b> no similarity. Every dot product between different words is 0, so cat is exactly as unrelated to dog as to movie.`, `<b>العيب 2:</b> لا تشابه: حاصل الضرب بين أي كلمتين = 0.`]
  ],
  analogy: [`Like giving every student a locker number: the number identifies the student perfectly, but lockers 12 and 13 tell you nothing about whether those students are friends.`, `مثل رقم خزانة لكل طالب: يحدد الطالب بدقة، لكن الخزانتين 12 و13 لا تخبرانك إن كان الطالبان صديقين.`],
  check: [`Why can't one-hot vectors show that cat and dog are related?`, `لماذا لا تُظهر متجهات one-hot أن cat وdog مترابطتان؟`, [`They are too short`, `All different words are orthogonal (dot product 0)`, `They contain negative numbers`, `They depend on document length`], 1, `Every pair of different one-hot vectors has dot product 0.`, `كل متجهين مختلفين حاصل ضربهما 0.`],
  remember: [`One-hot = identity only; |V| dimensions; all words equally unrelated.`, `one-hot = هوية فقط، وكل الكلمات غير مترابطة بالتساوي.`]
};

LESSONS.c5s5 = {
  big: [`A <b>Bag-of-Words</b> vector describes a document by how often each vocabulary word appears in it. It is literally the <b>sum of the one-hot vectors</b> of its words. Imagine pouring the words into a bag and counting them: the order falls out.`, `متجه <b>حقيبة الكلمات</b> يصف المستند بعدد مرات ظهور كل كلمة فيه، وهو حرفيًّا <b>مجموع متجهات one-hot</b> لكلماته. تخيّل سكب الكلمات في كيس وعدّها: يضيع الترتيب.`],
  links: ['c5s4'],
  action: { w: 'bow', cfg: { a: 'dog bites man', b: 'man bites dog' }, cap: [`Slide 13's example. Both sentences get the same vector. Then try "good plot good movie" to see a count of 2.`, `مثال الشريحة 13: الجملتان بالمتجه نفسه. جرّب "good plot good movie" لترى العدد 2.`] },
  steps: [
    [`"good plot good movie" = good + plot + good + movie = <b>[2, 1, 0, 1, 0]</b> over [good, movie, boring, plot, bad].`, `"good plot good movie" ← [2, 1, 0, 1, 0].`],
    [`<b>Keeps:</b> which terms occur and how often. Fast; works well with linear classifiers and retrieval baselines.`, `<b>يحفظ:</b> المصطلحات وتكرارها، وهو سريع.`],
    [`<b>Loses:</b> word order and syntax, long-distance context, similarity between different words, and word senses (bank: money or river).`, `<b>يفقد:</b> الترتيب والنحو والسياق البعيد والتشابه ومعاني الكلمة.`]
  ],
  check: [`BoW vector of "good plot good movie" over [good, movie, boring, plot, bad]:`, `متجه BoW لـ "good plot good movie":`, [`[1, 1, 0, 1, 0]`, `[2, 1, 0, 1, 0]`, `[2, 0, 0, 1, 1]`, `[1, 2, 0, 1, 0]`], 1, `good appears twice, movie once, plot once.`, `good مرتين وmovie وplot مرة.`],
  remember: [`BoW = sum of one-hots = counts; keeps terms and frequency, loses order ("dog bites man" = "man bites dog").`, `BoW = مجموع one-hot، يحفظ التكرار ويفقد الترتيب.`]
};

LESSONS.c5s6 = {
  big: [`Raw counts treat every word the same. "the" appears in every document, so it dominates the vectors while telling them apart not at all. We want to keep a word's count <i>inside</i> a document but lower its weight if it is <b>spread across the whole collection</b>. That is the idea behind TF-IDF.`, `الأعداد الخام تعامل كل الكلمات بالتساوي، فتسيطر the الموجودة في كل المستندات دون أن تميّز بينها. نريد الاحتفاظ بالعدد <i>داخل</i> المستند مع خفض الوزن إذا كانت الكلمة <b>منتشرة في المجموعة كلها</b>.`],
  remember: [`Common-everywhere words separate nothing → keep the count, lower the weight of widespread words.`, `الكلمات الشائعة في كل مكان لا تميّز ← نخفض وزنها.`]
};

LESSONS.c5s7 = {
  big: [`TF-IDF has two ingredients. <b>TF</b> (term frequency) asks "how much does this document use the word?" on a log scale. <b>DF</b> (document frequency) asks "in how many documents does the word appear at all?"`, `لـ TF-IDF مكونان: <b>TF</b> يسأل "كم يستخدم هذا المستند الكلمة؟" على مقياس لوغاريتمي، و<b>DF</b> يسأل "في كم مستندًا تظهر الكلمة أصلًا؟"`],
  steps: [
    [`<b>TF(t, d) = 1 + log₁₀ count(t, d)</b> if the count is above 0, otherwise 0 (log of 0 is undefined).`, `<b>TF = 1 + log₁₀ العدد</b> إذا كان أكبر من 0 وإلا 0.`],
    [`Counts 1, 10, 100, 1,000 → TF 1, 2, 3, 4. A word used 100 times matters more than once, but not 100 times more.`, `الأعداد 1، 10، 100، 1000 ← 1، 2، 3، 4.`],
    [`<b>DF(t)</b> = the number of documents containing t at least once.`, `<b>DF</b> = عدد المستندات التي تحتوي المصطلح مرة على الأقل.`],
    [`D1 "cat cat cat", D2 "cat dog", D3 "dog": TF(cat, D1) = 1 + log₁₀3 ≈ 1.48; DF(cat) = <b>2</b>, not 3 + 1 + 0 = 4.`, `TF(cat, D1) ≈ 1.48 وDF(cat) = 2 وليس 4.`]
  ],
  confuse: { a: [`TF`, `Measured <b>inside one document</b>, from the raw count, log-scaled.`, `يُقاس <b>داخل مستند واحد</b>.`], b: [`DF`, `Measured <b>over the collection</b>: counts documents, not occurrences.`, `يُقاس <b>على المجموعة</b> ويعدّ المستندات لا مرات الظهور.`], why: [`The most common mistake is adding up occurrences for DF. DF(cat) is 2 because cat is in two documents, however many times it appears in each.`, `الخطأ الأشهر جمع مرات الظهور في DF؛ DF(cat) = 2 لأنها في مستندين.`] },
  check: [`TF for a word that appears 100 times in a document:`, `TF لكلمة تظهر 100 مرة:`, [`100`, `3`, `2`, `1`], 1, `1 + log₁₀100 = 1 + 2 = 3.`, `1 + 2 = 3.`],
  remember: [`TF = 1 + log₁₀ count (0 if absent), inside a document. DF = number of documents containing the term.`, `TF داخل المستند، وDF عدد المستندات.`]
};

LESSONS.c5s8 = {
  big: [`<b>IDF</b> turns document frequency into a weight: rare words get high weight, words in every document get zero. Multiply by TF and you get <b>TF-IDF</b>: high only when a word is frequent <i>here</i> and rare <i>elsewhere</i>.`, `<b>IDF</b> يحوّل DF إلى وزن: النادرة وزنها عالٍ والموجودة في كل المستندات صفر. وبضربه في TF نحصل على <b>TF-IDF</b>: عالٍ فقط عندما تكون الكلمة متكررة <i>هنا</i> ونادرة <i>في غيره</i>.`],
  links: ['c5s7'],
  steps: [
    [`<b>IDF(t) = log₁₀(N / DF(t))</b>, where N is the number of documents.`, `<b>IDF = log₁₀(N / DF)</b>.`],
    [`With N = 4: DF 1 → log₁₀4 = 0.60 (rare); DF 2 → 0.30; DF 4 → log₁₀1 = <b>0</b> (in every document, no weight).`, `مع N = 4: DF 1 ← 0.60، DF 2 ← 0.30، DF 4 ← 0.`],
    [`<b>TF-IDF(t, d) = TF(t, d) × IDF(t).</b> Both factors are log-damped; raw counts are never used directly.`, `<b>TF-IDF = TF × IDF</b>.`],
    [`Used for search, document classification, clustering and keyword-retrieval baselines.`, `يُستخدم في البحث والتصنيف والتجميع.`]
  ],
  analogy: [`In a class where everyone wears glasses, "wears glasses" is useless for describing one student; "plays the oud" describes one student well. IDF is how rare the trait is; TF is how strongly this student shows it.`, `في فصل كل طلابه يرتدون نظارات، "يرتدي نظارة" لا يصف طالبًا بعينه، أما "يعزف العود" فيصفه جيدًا. IDF ندرة الصفة وTF مدى ظهورها عند الطالب.`],
  check: [`A term appears in all 4 of 4 documents. Its TF-IDF in any document is:`, `مصطلح في كل المستندات الأربعة. وزن TF-IDF له:`, [`0`, `0.30`, `0.60`, `Its count`], 0, `IDF = log₁₀(4/4) = 0, so TF × 0 = 0.`, `IDF = 0 فالوزن 0.`],
  remember: [`IDF = log₁₀(N/DF); TF-IDF = TF × IDF; a term in every document → 0.`, `IDF = log₁₀(N/DF) وTF-IDF = TF × IDF.`]
};

LESSONS.c5s9 = {
  big: [`Now compute a whole collection. The demo uses slide 20's four documents. Check its numbers against the lecture: cats IDF 0.12; chase, mice, eat 0.30; birds, fish, cheese 0.60.`, `لنحسب مجموعة كاملة: العرض يستخدم مستندات الشريحة 20 الأربعة. قارن أرقامه بالمحاضرة.`],
  links: ['c5s8'],
  action: { w: 'tfidf', cfg: { docs: 'cats chase mice\ncats chase birds\ncats eat fish\nmice eat cheese' }, cap: [`Edit the documents (add a word everywhere, repeat a word) and watch DF, IDF and TF-IDF update.`, `عدّل المستندات وراقب تحديث القيم.`] },
  steps: [
    [`DF: cats 3, chase 2, mice 2, birds 1, eat 2, fish 1, cheese 1.`, `DF: cats 3، chase 2، mice 2، birds 1، eat 2، fish 1، cheese 1.`],
    [`IDF = log₁₀(4/DF): 0.12 (DF 3), 0.30 (DF 2), 0.60 (DF 1).`, `IDF: 0.12 و0.30 و0.60.`],
    [`Each word occurs once per document, so TF = 1 and every non-zero cell equals the word's IDF.`, `كل كلمة تظهر مرة فـ TF = 1.`],
    [`D4 "mice eat cheese" = [mice 0.30, eat 0.30, cheese 0.60]. "cheese" gets the most weight because only D4 has it.`, `D4 = [0.30، 0.30، 0.60]، وcheese الأعلى لأنها في D4 فقط.`]
  ],
  check: [`What is TF-IDF(cheese, D4)?`, `ما TF-IDF(cheese, D4)؟`, [`0.12`, `0.30`, `0.60`, `1`], 2, `TF = 1, IDF = log₁₀(4/1) = 0.60.`, `TF = 1 وIDF = 0.60.`],
  remember: [`IDF cats 0.12, chase/mice/eat 0.30, birds/fish/cheese 0.60; D4 = [0.30, 0.30, 0.60].`, `قيم IDF ومتجه D4.`]
};

LESSONS.c5s10 = {
  big: [`Once documents are vectors, "how similar are these two documents?" becomes geometry. <b>Cosine similarity</b> measures the <b>angle</b> between two vectors, not their length, so a short and a long document about the same topic still score as similar.`, `بعد تحويل المستندات إلى متجهات يصبح سؤال التشابه هندسيًّا. <b>تشابه جيب التمام</b> يقيس <b>الزاوية</b> بين المتجهين لا طولهما، فالمستند القصير والطويل في الموضوع نفسه يبقيان متشابهين.`],
  steps: [
    [`<b>cos(x, y) = (x · y) / (‖x‖ ‖y‖).</b> x · y = multiply matching components and add; ‖x‖ = √(sum of squares).`, `<b>cos = (x · y) / (‖x‖ ‖y‖).</b>`],
    [`<b>Example:</b> x = [1, 2, 0], y = [2, 1, 0]. x · y = 2 + 2 + 0 = 4; ‖x‖ = ‖y‖ = √5; cos = 4 / 5 = <b>0.80</b>.`, `<b>مثال:</b> cos = 4 / 5 = 0.80.`],
    [`<b>Special cases:</b> same direction ([1,2] and [2,4]) → 1; orthogonal ([1,0] and [0,1]) → 0; opposite ([1,0] and [−1,0]) → −1.`, `<b>حالات خاصة:</b> نفس الاتجاه 1، متعامدان 0، متعاكسان −1.`],
    [`<b>Range:</b> −1 to 1 in general; <b>0 to 1</b> for BoW and TF-IDF, which have no negative values.`, `<b>المدى:</b> من −1 إلى 1، ومن 0 إلى 1 لـ BoW وTF-IDF.`],
    [`<b>Length doesn't matter:</b> cos(cx, y) = cos(x, y). A document repeated twice has a longer vector but the same direction.`, `<b>الطول لا يهم:</b> تكرار المستند مرتين لا يغيّر الاتجاه.`]
  ],
  analogy: [`Two arrows pointing the same way are "similar" whether one is short or long. Cosine only asks "do they point the same way?"`, `سهمان يشيران للاتجاه نفسه متشابهان سواء كان أحدهما قصيرًا أو طويلًا، وجيب التمام يسأل فقط: هل يشيران للاتجاه نفسه؟`],
  confuse: { a: [`cos = 0 (sparse vectors)`, `The documents <b>share no term</b>.`, `المستندان <b>لا يشتركان في أي مصطلح</b>.`], b: [`cos = −1`, `<b>Opposite</b> direction: needs negative components, as in dense embeddings.`, `اتجاه <b>معاكس</b>: يحتاج مكونات سالبة.`], why: [`Students read 0 as "opposite meaning". For BoW/TF-IDF, 0 just means nothing in common.`, `يقرأ الطلاب 0 كـ "معنى معاكس"، وهو في BoW/TF-IDF يعني لا شيء مشترك.`] },
  check: [`cos([1, 2], [2, 4]) = ?`, `cos([1, 2], [2, 4]) = ؟`, [`0`, `0.5`, `1`, `2`], 2, `[2, 4] is [1, 2] scaled by 2: same direction.`, `[2, 4] ضعف [1, 2]: الاتجاه نفسه.`],
  remember: [`cos = x·y / (‖x‖‖y‖): direction, not length. [1,2,0] vs [2,1,0] = 0.80. 0 = no shared term for sparse vectors.`, `جيب التمام للاتجاه لا الطول، والمثال 0.80.`]
};

LESSONS.c5s11 = {
  big: [`Now compare real documents, and see TF-IDF change the answer. D1 "cats chase mice" and D2 "cats chase birds" share two words. With raw counts they look quite similar; with TF-IDF, the shared word "cats" counts for little, because it is in 3 of 4 documents.`, `لنقارن مستندات حقيقية ونرَ كيف يغيّر TF-IDF الإجابة: D1 وD2 يشتركان في كلمتين، ويبدوان متشابهين بالأعداد الخام، لكن مع TF-IDF تقل قيمة cats لأنها في 3 من 4 مستندات.`],
  links: ['c5s10', 'c5s9'],
  action: { w: 'tfidf', cfg: { docs: 'cats chase mice\ncats chase birds\ncats eat fish\nmice eat cheese' }, cap: [`D1 vs D2 is selected. Compare the two cosine numbers (≈0.35 with TF-IDF, 0.67 with counts), then pick D1 vs D4 (≈0.28) and D2 vs D4 (0).`, `قارن الرقمين (≈0.35 مقابل 0.67)، ثم D1 مع D4 (≈0.28) وD2 مع D4 (0).`] },
  steps: [
    [`D1 = [0.125, 0.301, 0.301, 0, 0, 0, 0]; D2 = [0.125, 0.301, 0, 0.602, 0, 0, 0] (3 decimals to avoid rounding errors).`, `المتجهان بثلاث منازل عشرية.`],
    [`D1 · D2 = 0.125² + 0.301² = 0.1062 (shared: cats, chase).`, `الضرب النقطي 0.1062.`],
    [`‖D1‖ = 0.444, ‖D2‖ = 0.685 → cos = 0.1062 / 0.304 = <b>0.35</b>.`, `cos = 0.35.`],
    [`With raw counts: cos = 2 / (√3 · √3) = <b>0.67</b>. TF-IDF lowers it because "cats" is common.`, `بالأعداد الخام 0.67، وTF-IDF يخفضه لأن cats شائعة.`]
  ],
  remember: [`cos(D1, D2) = 0.35 (TF-IDF) vs 0.67 (counts); D1 is still closest to D2 (0.35 > 0.28 > 0).`, `0.35 مقابل 0.67، وD1 أقرب إلى D2.`]
};

LESSONS.c5s12 = {
  big: [`Document vectors can count and compare, but they still treat cat and dog as unrelated labels. To capture <b>word meaning</b>, word vectors should reflect relations like synonymy, similarity and relatedness.`, `متجهات المستندات تعدّ وتقارن لكنها تعامل cat وdog كتسميات غير مترابطة. لالتقاط <b>معنى الكلمة</b> يجب أن تعكس المتجهات الترادف والتشابه والترابط.`],
  steps: [
    [`<b>Synonymy:</b> can substitute in context (couch / sofa).`, `<b>الترادف:</b> تحل محل بعضها (couch / sofa).`],
    [`<b>Similarity:</b> share much meaning but aren't perfect substitutes (cat / dog).`, `<b>التشابه:</b> تشترك في معظم المعنى (cat / dog).`],
    [`<b>Relatedness:</b> belong to the same situation (coffee / cup).`, `<b>الترابط:</b> تنتمي لموقف واحد (coffee / cup).`],
    [`<b>Word sense:</b> one discrete meaning (mouse: animal or device). Static embeddings give one vector per word, so senses share it.`, `<b>معنى الكلمة:</b> mouse حيوان أو جهاز، والتضمين الثابت يعطي متجهًا واحدًا.`]
  ],
  check: [`coffee / cup is an example of:`, `coffee / cup مثال على:`, [`Synonymy`, `Similarity`, `Relatedness`, `Word sense`], 2, `They belong to the same situation, but they are not similar things.`, `ينتميان للموقف نفسه دون أن يكونا متشابهين.`],
  remember: [`Synonymy (couch/sofa) · similarity (cat/dog) · relatedness (coffee/cup) · sense (bank, mouse).`, `ترادف · تشابه · ترابط · معنى.`]
};

LESSONS.c5s13 = {
  big: [`How can a computer learn what a word means without a dictionary? By looking at the company it keeps. The <b>distributional hypothesis</b>: <b>words that occur in similar contexts tend to have similar meanings.</b>`, `كيف يتعلم الحاسوب معنى الكلمة دون قاموس؟ بالنظر إلى رفاقها. <b>الفرضية التوزيعية:</b> <b>الكلمات التي تظهر في سياقات متشابهة تميل إلى معانٍ متشابهة.</b>`],
  think: [`You have never seen the word "tezgüino". You read: "A bottle of tezgüino is on the table. Everybody likes tezgüino. Tezgüino makes you drunk." What is it? (Additional example, not from the slides.)`, `لم تر كلمة tezgüino من قبل، ثم قرأت: "زجاجة tezgüino على الطاولة… الكل يحبه… يجعلك ثملًا". ما هو؟ (مثال إضافي)`, `Some kind of alcoholic drink. You worked it out only from the words around it. That is exactly what distributional methods do with every word.`, `نوع من المشروبات الكحولية، واستنتجته من الكلمات المحيطة فقط، وهذا ما تفعله الطرق التوزيعية مع كل كلمة.`],
  steps: [
    [`Count the contexts each word appears in across a corpus.`, `عدّ السياقات التي تظهر فيها كل كلمة في المدونة.`],
    [`Words with similar context counts get similar vectors.`, `الكلمات ذات السياقات المتشابهة تحصل على متجهات متشابهة.`],
    [`In the vector space related words sit together: cat, dog, puppy in one area; movie, film, plot in another.`, `في الفضاء تتجمع الكلمات المترابطة.`],
    [`Classic Word2Vec and GloVe assign one (static) vector to each word type.`, `Word2Vec وGloVe يعطيان متجهًا ثابتًا لكل كلمة.`]
  ],
  remember: [`Distributional hypothesis: similar contexts → similar meanings.`, `سياقات متشابهة ← معانٍ متشابهة.`],
  teach: [`State the distributional hypothesis and explain how it lets a computer learn word meaning.`, `اذكر الفرضية التوزيعية واشرح كيف تمكّن الحاسوب من تعلّم المعنى.`, `The distributional hypothesis says that words occurring in similar contexts tend to have similar meanings. So a computer can learn meaning from co-occurrence patterns in a corpus: words such as cat, dog and puppy appear near similar neighbours, so their vectors become similar and they sit close together in the vector space. Word-word co-occurrence counts, PPMI, Word2Vec and GloVe are all built on this idea.`, `الفرضية تقول إن الكلمات في سياقات متشابهة لها معانٍ متشابهة، فيتعلم الحاسوب المعنى من أنماط التواجد، فتتقارب متجهات cat وdog وpuppy.`]
};

LESSONS.c5s14 = {
  big: [`Turn the hypothesis into numbers: a <b>word–word co-occurrence matrix</b>. Rows are target words, columns are context words, and each cell counts how often the context word appears near the target. Each row is a word vector, and cosine works on it just as it did for documents.`, `نحوّل الفرضية إلى أرقام: <b>مصفوفة التواجد المشترك</b>. الصفوف كلمات هدف والأعمدة كلمات سياق وكل خلية تعدّ مرات التجاور. كل صف متجه كلمة، وجيب التمام يعمل عليه كما في المستندات.`],
  links: ['c5s13', 'c5s10'],
  steps: [
    [`cherry: pie 442, sugar 25; digital: computer 1,670, data 1,683; information: computer 3,325, data 3,982 (Wikipedia counts).`, `cherry قرب pie، وdigital وinformation قرب computer وdata.`],
    [`P(w) = row total / N, P(c) = column total / N, N = 11,716 (all cells).`, `P(w) و P(c) من المجاميع، وN = 11,716.`],
    [`Using [pie, data, computer]: cos(cherry, information) ≈ <b>0.018</b>; cos(digital, information) ≈ <b>0.996</b>.`, `cos(cherry, information) ≈ 0.018 وcos(digital, information) ≈ 0.996.`],
    [`Words that share contexts point the same way, just as the hypothesis predicts.`, `الكلمات المشتركة في السياق تشير للاتجاه نفسه.`]
  ],
  check: [`In a word–word co-occurrence matrix, each row represents:`, `في مصفوفة التواجد، كل صف يمثل:`, [`A document`, `A target word`, `A sentence`, `A topic`], 1, `Rows are target words; columns are context words.`, `الصفوف كلمات هدف والأعمدة كلمات سياق.`],
  remember: [`Rows = target words, columns = context words; rows are word vectors; digital ~ information 0.996, cherry ~ information 0.018.`, `الصفوف متجهات كلمات، والمثالان 0.996 و0.018.`]
};

LESSONS.c5s15 = {
  big: [`Raw counts favour frequent context words: "data" co-occurs with almost everything. <b>PMI</b> asks a better question: <b>do these two words occur together more often than chance would predict?</b> <b>PPMI</b> then keeps only the positive answers.`, `الأعداد الخام تفضّل كلمات السياق الشائعة. <b>PMI</b> يسأل سؤالًا أفضل: <b>هل تظهر الكلمتان معًا أكثر مما تتوقعه الصدفة؟</b> ثم يحتفظ <b>PPMI</b> بالإجابات الموجبة فقط.`],
  links: ['c5s14'],
  action: { w: 'pmi', cfg: {}, cap: [`Click any count. cherry–pie gives 4.38 (slide 34); cherry–computer gives −6.70, so PPMI = 0 (slide 35).`, `انقر أي عدد: cherry–pie = 4.38 وcherry–computer = −6.70 فـ PPMI = 0.`] },
  steps: [
    [`<b>PMI(w, c) = log₂ [ P(w, c) / (P(w) · P(c)) ].</b> The denominator is what we'd expect if the words were independent.`, `<b>PMI = log₂ [P(w, c) / (P(w) P(c))]</b>، والمقام هو المتوقع عند الاستقلال.`],
    [`PMI &gt; 0: together more than expected (cherry, pie). PMI = 0: independent. PMI &lt; 0: less than expected (cherry, computer).`, `موجب: أكثر من المتوقع، صفر: مستقلان، سالب: أقل.`],
    [`<b>cherry, pie:</b> 0.0377 / (0.0415 × 0.0437) = 20.8 → log₂ 20.8 = <b>4.38</b>: about 21 times more than chance.`, `<b>cherry, pie:</b> log₂ 20.8 = 4.38.`],
    [`<b>PPMI = max(PMI, 0).</b> Negative values are clipped because claiming two words <i>avoid</i> each other needs enormous amounts of text; those estimates are unstable.`, `<b>PPMI = max(PMI, 0)</b> لأن تقدير التجنب غير مستقر.`],
    [`<b>Limit:</b> PPMI vectors are still sparse (one dimension per context word, 10,000–50,000, mostly zeros). Dense embeddings fix that.`, `<b>القيد:</b> ما زالت متناثرة، والتضمينات الكثيفة تحل ذلك.`]
  ],
  analogy: [`Two students who are both always on campus will often be seen together, so the raw count says "friends". PMI asks whether they are seen together <i>more than their attendance alone would predict</i>.`, `طالبان يحضران دائمًا سيُريان معًا كثيرًا، فيقول العدّ الخام "صديقان". أما PMI فيسأل: هل يُريان معًا <i>أكثر مما يتوقعه حضورهما وحده</i>؟`],
  check: [`What does PPMI do with a PMI of −6.70?`, `ماذا يفعل PPMI بقيمة PMI = −6.70؟`, [`Keeps it`, `Makes it 6.70`, `Replaces it with 0`, `Doubles it`], 2, `PPMI = max(PMI, 0).`, `PPMI = max(PMI, 0).`],
  remember: [`PMI = log₂ P(w,c)/(P(w)P(c)); cherry–pie = 4.38. PPMI = max(PMI, 0); still sparse.`, `PMI ومثاله 4.38، وPPMI يقص السالب، وما زال متناثرًا.`],
  teach: [`Explain what PMI measures, why it beats raw counts, and why PPMI clips negative values.`, `اشرح ما يقيسه PMI ولماذا يتفوق على العدّ ولماذا يقص PPMI السالب.`, `Raw co-occurrence counts favour frequent context words, which co-occur with many words. PMI compares how often a word and a context word actually appear together with how often they would if they were independent: PMI = log₂ P(w,c)/(P(w)P(c)). Positive PMI means more than chance (cherry–pie = 4.38, about 21 times chance). PPMI replaces negative values with 0, because a reliable negative association (two words avoiding each other) needs enormous amounts of text, so those estimates are unstable.`, `PMI يقارن التواجد الفعلي بالمتوقع عند الاستقلال، فيتجاوز انحياز العدّ للكلمات الشائعة. الموجب أكثر من الصدفة (4.38). وPPMI يجعل السالب صفرًا لأن تقديره يحتاج نصوصًا هائلة.`]
};

LESSONS.c5s16 = {
  big: [`Sparse vectors have one dimension per context word: tens of thousands of numbers, almost all zero. A <b>dense embedding</b> squeezes a word into 50–1,000 learned real numbers, so similar words end up close together and a classifier has far fewer weights to learn.`, `المتجهات المتناثرة لها بُعد لكل كلمة سياق: عشرات الآلاف معظمها أصفار. أما <b>التضمين الكثيف</b> فيضغط الكلمة في 50–1000 رقم متعلَّم، فتتقارب الكلمات المتشابهة ويتعلم المصنف أوزانًا أقل بكثير.`],
  confuse: { a: [`Sparse PPMI vector`, `10,000–50,000 dimensions, mostly zero. car and automobile are separate, unrelated dimensions.`, `آلاف الأبعاد ومعظمها أصفار، وcar وautomobile بُعدان منفصلان.`], b: [`Dense embedding`, `50–1,000 learned dimensions, mostly non-zero. Similar contexts put car and automobile close together; fewer weights, may generalize better.`, `50–1000 بُعد، وتتقارب car وautomobile، وأوزان أقل.`], why: [`Dense dimensions have no readable meaning (no "animal" dimension). Word2Vec and GloVe are not two output types; they are two ways to learn dense vectors.`, `أبعاد الكثيف لا معنى مقروءًا لها، وWord2Vec وGloVe طريقتان لتعلّمها.`] },
  check: [`Which is a property of dense embeddings?`, `أي خاصية للتضمينات الكثيفة؟`, [`One dimension per context word`, `Mostly zeros`, `50–1,000 learned real-valued dimensions`, `Each dimension has a readable meaning`], 2, `Slide 37's table.`, `جدول الشريحة 37.`],
  remember: [`Dense = short (50–1,000), learned, mostly non-zero; similar words close; fewer weights.`, `الكثيف قصير ومتعلَّم والكلمات المتشابهة متقاربة.`]
};

LESSONS.c5s17 = {
  big: [`<b>Word2Vec</b> learns embeddings with a trick: train a small network on a <i>fake</i> prediction task (predict neighbouring words), then throw the predictor away and keep the word vectors it learned. The prediction is only the training objective; the vectors are the prize.`, `<b>Word2Vec</b> يتعلم التضمينات بحيلة: يدرّب شبكة صغيرة على مهمة تنبؤ <i>مصطنعة</i> (التنبؤ بالكلمات المجاورة) ثم يحتفظ بمتجهات الكلمات. التنبؤ مجرد هدف تدريب، والمتجهات هي الجائزة.`],
  action: { w: 'skipgram', cfg: { s: 'I ate fresh cherry pie today', centre: 3 }, cap: [`Slide 38's sentence with a ±2 window: cherry's context is {ate, fresh, pie, today}. Click other words and change the window.`, `جملة الشريحة 38 بنافذة ±2: سياق cherry هو {ate, fresh, pie, today}. انقر كلمات أخرى وغيّر النافذة.`] },
  steps: [
    [`<b>Context window:</b> the words within a distance of the centre word, e.g. ±2.`, `<b>نافذة السياق:</b> الكلمات ضمن مسافة من الكلمة المركزية.`],
    [`<b>Skip-gram:</b> input the centre word, predict the context words (cherry → pie, sugar).`, `<b>Skip-gram:</b> من الكلمة المركزية إلى السياق.`],
    [`<b>CBOW:</b> input the context words, predict the centre word (pie, sugar, tart → cherry). Often faster, because the context is combined into one representation.`, `<b>CBOW:</b> من السياق إلى الكلمة المركزية، وغالبًا أسرع.`],
    [`<b>Skip-gram with negative sampling (SGNS):</b> a binary classifier learns to tell real pairs (cherry, pie) → 1 from random pairs (cherry, orchestra) → 0. Several negatives per positive. A large dot product between the two vectors means probability near 1.`, `<b>SGNS:</b> مصنف ثنائي يميز الأزواج الحقيقية (1) من العشوائية (0)، وحاصل الضرب الكبير يعني احتمالًا قرب 1.`]
  ],
  confuse: { a: [`Skip-gram`, `<b>centre → context</b>: one word predicts its neighbours.`, `<b>المركز ← السياق</b>.`], b: [`CBOW`, `<b>context → centre</b>: the neighbours predict the middle word.`, `<b>السياق ← المركز</b>.`], why: [`Hook: Skip-gram "skips out" from the centre to the neighbours; CBOW = Continuous <b>Bag</b> Of Words, a bag of context words predicting the middle.`, `للحفظ: Skip-gram يقفز من المركز للجيران، وCBOW حقيبة كلمات السياق تتنبأ بالوسط.`] },
  check: [`In SGNS, the pair (cherry, orchestra) is:`, `في SGNS، الزوج (cherry, orchestra):`, [`A positive pair, label 1`, `A negative sample, label 0`, `A context window`, `Ignored`], 1, `orchestra is a random noise word, not an observed neighbour.`, `orchestra كلمة ضوضاء عشوائية.`],
  remember: [`Word2Vec: train to predict neighbours, keep the vectors. Skip-gram centre → context; CBOW context → centre; SGNS = real (1) vs random (0) pairs.`, `Skip-gram من المركز للسياق، وCBOW العكس، وSGNS حقيقي مقابل عشوائي.`],
  teach: [`Explain skip-gram with negative sampling using the cherry example.`, `اشرح SGNS بمثال cherry.`, `Word2Vec learns a dense vector for each word by training a small network to predict nearby words; the learned vectors are the embeddings. In skip-gram the input is the centre word and the task is to predict its context words. With negative sampling this becomes a binary classifier: observed pairs such as (cherry, pie) are labelled 1, and random noise pairs such as (cherry, orchestra) or (cherry, algebra) are labelled 0, with several negatives per positive. Training raises the dot product of real pairs, so words with similar contexts get similar vectors.`, `يتعلم Word2Vec متجهًا لكل كلمة بالتنبؤ بالجيران. في skip-gram المدخل الكلمة المركزية، ومع العينات السالبة يصبح مصنفًا ثنائيًّا: (cherry, pie) = 1 و(cherry, orchestra) = 0، فتتقارب الكلمات ذات السياقات المتشابهة.`]
};

LESSONS.c5s18 = {
  big: [`<b>GloVe</b> takes the other route: first count co-occurrences over the <i>whole</i> corpus, then learn vectors whose dot product (plus biases) approximates the log of each count, ln Xᵢⱼ. Word2Vec learns from many small local examples; GloVe summarises them globally first.`, `<b>GloVe</b> يسلك الطريق الآخر: يعدّ التواجد في المدونة <i>كلها</i> أولًا، ثم يتعلم متجهات يقارب حاصل ضربها (مع الانحيازات) لوغاريتم كل عدد ln Xᵢⱼ.`],
  links: ['c5s17', 'c5s14'],
  confuse: { a: [`Word2Vec`, `<b>Predictive</b>: learns by predicting words from context (or the reverse) in <b>local windows</b>.`, `<b>تنبؤي</b> في <b>نوافذ محلية</b>.`], b: [`GloVe`, `<b>Count-based</b>: fits <b>global</b> co-occurrence statistics, word·context + biases ≈ ln Xᵢⱼ.`, `<b>قائم على العدّ</b> ويلائم إحصاءات <b>شاملة</b>.`], why: [`They differ in training signal and objective, but both produce dense, static word embeddings, so both share the static-vector limit (one vector for "bank").`, `يختلفان في إشارة التدريب والهدف، وكلاهما ينتج تضمينات كثيفة ثابتة.`] },
  check: [`GloVe learns vectors so that word · context + biases approximates:`, `يتعلم GloVe متجهات بحيث يقارب حاصل الضرب مع الانحيازات:`, [`The PMI value`, `ln of the co-occurrence count`, `The window size`, `The TF-IDF weight`], 1, `Slide 40: approximate ln Xᵢⱼ for observed pairs.`, `الشريحة 40: ln Xᵢⱼ.`],
  remember: [`Word2Vec = predictive, local windows; GloVe = count-based, global matrix, fits ln Xᵢⱼ. Both dense and static.`, `Word2Vec تنبؤي محلي، وGloVe عدّي شامل، وكلاهما كثيف ثابت.`]
};

LESSONS.c5s19 = {
  big: [`In a good embedding space, meaning shows up as <b>geometry</b>: similar words are close, and some relations appear as consistent directions (gender, country–capital). But these are geometric regularities, not proof of human-like understanding.`, `في فضاء التضمين الجيد يظهر المعنى <b>كهندسة</b>: الكلمات المتشابهة متقاربة وبعض العلاقات اتجاهات ثابتة، لكنها انتظامات هندسية لا دليل على فهم بشري.`],
  steps: [
    [`Nearest neighbours: similar words have nearby vectors.`, `الجيران الأقرب: الكلمات المتشابهة متقاربة.`],
    [`Analogies work for some relations but fail for many; analogy search usually excludes the three input words.`, `التناظر ينجح لبعض العلاقات ويفشل لكثير.`],
    [`Static limit: "bank" has one vector for "deposit money at the bank" and "sit on the river bank". Contextual models fix this.`, `قيد الثبات: bank متجه واحد للمعنيين.`],
    [`Visualizing: PCA, t-SNE or UMAP project hundreds of dimensions to 2D. Useful for spotting clusters, but a 2D plot can distort distances.`, `التصوير بـ PCA وt-SNE وUMAP مفيد لكنه قد يشوّه المسافات.`]
  ],
  remember: [`Geometry encodes some relations; analogies are limited; static vectors merge senses; 2D projections can mislead.`, `الهندسة ترمّز بعض العلاقات، والتصوير قد يضلل.`]
};

LESSONS.c5s20 = {
  big: [`Two ways to test embeddings. <b>Intrinsic</b>: test the vectors directly (similarity, relatedness, analogy, bias tests): fast, good for diagnosis. <b>Extrinsic</b>: plug them into a real task (classification F1, retrieval, NER): slower, but the best evidence for that task.`, `طريقتان لاختبار التضمينات: <b>داخلي</b> باختبار المتجهات مباشرة (سريع وجيد للتشخيص)، و<b>خارجي</b> بوضعها في مهمة حقيقية (أبطأ لكنه أفضل دليل).`],
  links: ['c3s12'],
  confuse: { a: [`Similarity`, `Share meaning: car / automobile, vanish / disappear. Dataset: <b>SimLex-999</b>.`, `تشترك في المعنى، ومجموعتها <b>SimLex-999</b>.`], b: [`Relatedness`, `Same situation: car / road, coffee / cup. Often <b>WordSim-353</b>.`, `الموقف نفسه، وغالبًا <b>WordSim-353</b>.`], why: [`SimLex-999 ratings (0–10): vanish/disappear 9.8, muscle/bone 3.65, hole/agreement 0.3. A related pair can score low on similarity.`, `تقييمات SimLex: 9.8 و3.65 و0.3، والزوج المترابط قد يحصل على تشابه منخفض.`] },
  check: [`Which is an extrinsic evaluation of embeddings?`, `أي تقييم خارجي للتضمينات؟`, [`SimLex-999 similarity`, `Analogy tests`, `Classification F1 in a sentiment system`, `Bias tests`], 2, `It measures the vectors inside a real NLP task.`, `يقيس المتجهات داخل مهمة حقيقية.`],
  remember: [`Intrinsic (SimLex similarity, WordSim relatedness, analogies, bias) vs extrinsic (F1, retrieval, NER).`, `داخلي مقابل خارجي، والتشابه ليس الترابط.`]
};

LESSONS.c5s21 = {
  big: [`Embeddings learn from human text, so they also learn human <b>biases</b>: systematic associations between words and social groups. Trained on news, Word2Vec gives <b>computer programmer − man + woman ≈ homemaker</b>.`, `التضمينات تتعلم من نصوص البشر فتتعلم <b>تحيزاتهم</b> أيضًا: ارتباطات منهجية بين الكلمات والفئات الاجتماعية. Word2Vec المدرب على الأخبار يعطي <b>computer programmer − man + woman ≈ homemaker</b>.`],
  steps: [
    [`<b>Source:</b> repeated associations in the training corpus.`, `<b>المصدر:</b> ارتباطات متكررة في المدونة.`],
    [`<b>Mechanism:</b> co-occurrence patterns become directions and distances in the vector space.`, `<b>الآلية:</b> أنماط التواجد تصبح اتجاهات ومسافات.`],
    [`<b>Effect:</b> a classifier or retrieval system that uses the vectors inherits, or amplifies, the association.`, `<b>الأثر:</b> المصنف أو نظام الاسترجاع يرث الارتباط أو يضخمه.`],
    [`<b>Practice:</b> inspect embeddings for such associations before using them in sensitive systems.`, `<b>الممارسة:</b> افحص التضمينات قبل الاستخدام في الأنظمة الحساسة.`]
  ],
  remember: [`Bias = systematic word–social-group association learned from text (programmer − man + woman ≈ homemaker). Inspect before sensitive use.`, `التحيز ارتباط منهجي يُتعلَّم من النص، فافحصه قبل الاستخدام الحساس.`]
};

LESSONS.c5s22 = {
  big: [`No representation is best for everything. The lecture's rule: <b>start with the simplest representation that keeps the signal the task needs</b>, and move to a heavier one only if the results require it.`, `لا يوجد تمثيل أفضل لكل شيء. قاعدة المحاضرة: <b>ابدأ بأبسط تمثيل يحفظ إشارة المهمة</b>، وانتقل للأثقل فقط إذا تطلبت النتائج.`],
  steps: [
    [`<b>Keyword search</b> → TF-IDF: a strong sparse matching baseline.`, `<b>البحث</b> ← TF-IDF.`],
    [`<b>Topic or sentiment classification</b> → TF-IDF + logistic regression: simple, interpretable, competitive.`, `<b>التصنيف</b> ← TF-IDF + انحدار لوجستي.`],
    [`<b>Word similarity</b> → Word2Vec or GloVe: dense vectors encode semantic neighbourhoods.`, `<b>تشابه الكلمات</b> ← Word2Vec أو GloVe.`],
    [`<b>Fast prototype</b> → Bag-of-Words: fast and easy to debug.`, `<b>نموذج أولي</b> ← BoW.`],
    [`<b>Next week:</b> an embedding layer is a lookup table; a token ID selects one row, and that dense row feeds the neural network.`, `<b>الأسبوع القادم:</b> طبقة التضمين جدول بحث يختار فيه الرقم صفًّا.`]
  ],
  check: [`A small team needs a quick, interpretable sentiment classifier. Best starting point?`, `فريق يحتاج مصنف مشاعر سريعًا وقابلًا للتفسير. أفضل بداية؟`, [`One-hot word vectors alone`, `TF-IDF + logistic regression`, `PPMI vectors`, `A 2D t-SNE plot`], 1, `Slide 48: a simple, interpretable, competitive baseline.`, `الشريحة 48: أساس بسيط وقابل للتفسير.`],
  remember: [`Search → TF-IDF; classification → TF-IDF + LR; word similarity → Word2Vec/GloVe; prototype → BoW. None keeps word order.`, `اختر حسب المهمة، ولا تمثيل هنا يحفظ الترتيب.`]
};
