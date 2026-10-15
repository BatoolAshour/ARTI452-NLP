/* Guided lessons – Week 4: Machine Learning for NLP */
MISSIONS.ch4 = [
  { t: [`Learning from examples`, `التعلّم من الأمثلة`], goal: [`Explain machine learning, supervised learning and the six-step workflow for a text classifier.`, `اشرح تعلّم الآلة والتعلّم الموجَّه وخطوات بناء المصنف الست.`], secs: ['1', '2', '3', '4', '5', '6'] },
  { t: [`Turning text into features`, `تحويل النص إلى خصائص`], goal: [`Build a document-term matrix and say what a classifier learns from it.`, `ابنِ مصفوفة مستند-مصطلح وقل ماذا يتعلم المصنف منها.`], secs: ['7', '8'] },
  { t: [`Naive Bayes`, `Naive Bayes`], goal: [`Explain the decision rule, train by counting with add-1 smoothing, and classify the lecture example.`, `اشرح قاعدة القرار ودرّب بالعدّ مع add-1 وصنّف مثال المحاضرة.`], secs: ['9', '10', '11'] },
  { t: [`Logistic regression`, `الانحدار اللوجستي`], goal: [`Compute z and the sigmoid, describe training, extend to softmax and compare with Naive Bayes.`, `احسب z والسينية، وصف التدريب، ووسّع إلى softmax، وقارن مع NB.`], secs: ['12', '13', '14', '15', '16'] },
  { t: [`Evaluating classifiers`, `تقييم المصنفات`], goal: [`Explain why accuracy misleads, compute precision, recall and F1, and handle class imbalance.`, `اشرح لماذا تضلل الدقة الإجمالية، واحسب الدقة والاستدعاء وF1، وعالج عدم التوازن.`], secs: ['17', '18', '19'] }
];

LESSONS.c4s1 = {
  big: [`Instead of writing rules like "IF the email contains 'free credit' THEN spam", we show the computer many labelled examples and let it <b>learn the pattern</b>. The goal is not to memorize the examples but to <b>generalize</b> to new texts it has never seen.`, `بدل كتابة قواعد مثل "إذا احتوت الرسالة free credit فهي مزعجة"، نعرض على الحاسوب أمثلة موسومة كثيرة ونتركه <b>يتعلم النمط</b>. والهدف ليس حفظ الأمثلة بل <b>التعميم</b> على نصوص جديدة.`],
  steps: [
    [`<b>Input:</b> examples represented as features, such as word counts or TF-IDF values.`, `<b>المدخل:</b> أمثلة ممثلة كخصائص مثل أعداد الكلمات أو TF-IDF.`],
    [`<b>Output:</b> a prediction: spam / not spam, positive / negative, or a topic.`, `<b>المخرج:</b> تنبؤ: مزعج/غير مزعج، إيجابي/سلبي، أو موضوع.`],
    [`<b>Rules vs ML:</b> rules are explicit and clear for small cases but fragile when language changes; ML learns from data and handles interacting features but needs labelled data and evaluation.`, `<b>القواعد مقابل تعلّم الآلة:</b> القواعد واضحة لكنها هشة، وتعلّم الآلة يتعلم من البيانات لكنه يحتاج وسومًا وتقييمًا.`],
    [`<b>Why NLP needs it:</b> variation (many ways to say the same thing), sparse features (each text uses a tiny part of the vocabulary), hidden patterns (word combinations), adaptation (retrain when data changes).`, `<b>لماذا تحتاجه NLP:</b> التنوع، والخصائص المتناثرة، والأنماط الخفية، والتكيّف.`]
  ],
  analogy: [`Teaching a child to recognise dogs: you don't give a rulebook ("four legs, fur, barks"), which would fail for a sleeping hairless puppy; you show many dogs and non-dogs, and the child generalizes.`, `تعليم طفل التعرف على الكلاب: لا تعطيه كتاب قواعد يفشل مع جرو نائم بلا شعر، بل تريه كلابًا كثيرة وغيرها فيُعمّم.`],
  check: [`What is the goal of a machine-learning classifier?`, `ما هدف مصنف تعلّم الآلة؟`, [`Memorize the training texts`, `Generalize to new texts not seen in training`, `Replace all features with rules`, `Maximize the size of the vocabulary`], 1, `Slide 3: "Generalize to new texts that were not seen during training."`, `الشريحة 3: التعميم على نصوص لم تُرَ في التدريب.`],
  remember: [`ML = learn patterns from examples (features in, prediction out), goal = generalize. Rules are clear but fragile; ML needs labelled data.`, `تعلّم الآلة يتعلم من الأمثلة وهدفه التعميم؛ القواعد هشة وتعلّم الآلة يحتاج وسومًا.`],
  teach: [`Compare hand-written rules with machine learning using the spam example, and give two reasons NLP needs ML.`, `قارن القواعد بتعلّم الآلة بمثال المزعج واذكر سببين لحاجة NLP إليه.`, `A rule-based spam filter uses explicit if–then patterns, such as "IF the email contains 'free credit' THEN spam"; it is clear for small cases but fragile when language changes. A machine-learning filter learns from labelled spam and not-spam emails, handles interacting features, but needs labelled data and evaluation. NLP needs ML because language varies (the same meaning in many forms) and features are sparse; ML also adapts by retraining when patterns change.`, `القواعد صريحة وهشة، وتعلّم الآلة يتعلم من أمثلة موسومة ويتعامل مع الخصائص المتداخلة. وتحتاجه NLP بسبب تنوع اللغة وتناثر الخصائص وإمكانية إعادة التدريب.`]
};

LESSONS.c4s4 = {
  big: [`<b>Supervised</b> learning means learning with an answer key. Each training example is a pair (x, y): a text x and its correct label y. The classifier is a function learned from those pairs that maps a new text x to a predicted label ŷ.`, `<b>التعلّم الموجَّه</b> تعلّم بمفتاح إجابات: كل مثال زوج (x, y) نص ووسمه الصحيح، والمصنف دالة متعلَّمة تحوّل نصًّا جديدًا إلى وسم متوقع ŷ.`],
  steps: [
    [`<b>Training:</b> both x and y are known: (x₁, y₁), (x₂, y₂), …`, `<b>التدريب:</b> x وy معروفان.`],
    [`<b>Prediction:</b> only x is given; the model outputs ŷ.`, `<b>التنبؤ:</b> x فقط ويخرج النموذج ŷ.`],
    [`<b>Classification:</b> one label from a fixed set C = {c₁ … cₖ}. The output is a category, not a number, so it is not regression.`, `<b>التصنيف:</b> وسم من مجموعة ثابتة، والمخرج فئة لا رقم.`],
    [`<b>Typical tasks:</b> sentiment analysis, topic classification, spam detection, language identification.`, `<b>مهام معتادة:</b> المشاعر، المواضيع، المزعج، تحديد اللغة.`]
  ],
  check: [`Predicting tomorrow's temperature in degrees is NOT classification because:`, `التنبؤ بدرجة حرارة الغد ليس تصنيفًا لأن:`, [`It uses no features`, `The output is a continuous number, not a category`, `It has no training data`, `It has only two classes`], 1, `Classification outputs a category from a fixed set; a continuous number is regression.`, `التصنيف يخرج فئة، والرقم المتصل انحدار.`],
  remember: [`Supervised: learn from (x, y) pairs; classifier maps new x → ŷ; classification = categorical output.`, `الموجَّه: أزواج (x, y)، والتصنيف مخرج فئوي.`]
};

LESSONS.c4s6 = {
  big: [`Building a text classifier always follows the same six steps. Learn them as a story: decide what to predict, get labelled examples, turn text into numbers, pick a model, train and tune it, and finally test it on unseen data.`, `بناء مصنف النصوص يتبع دائمًا ست خطوات. احفظها كقصة: قرر ماذا تتنبأ، واجمع أمثلة موسومة، وحوّل النص إلى أرقام، واختر نموذجًا، ودرّبه واضبطه، ثم اختبره على بيانات جديدة.`],
  steps: [
    [`<b>1. Define the task:</b> what do we want to predict?`, `<b>1. حدد المهمة:</b> ماذا نريد أن نتنبأ؟`],
    [`<b>2. Collect and label data:</b> create labelled examples.`, `<b>2. اجمع البيانات ووسمها.</b>`],
    [`<b>3. Represent text:</b> convert text into features.`, `<b>3. مثّل النص</b> بخصائص.`],
    [`<b>4. Choose a classifier:</b> Naive Bayes or logistic regression.`, `<b>4. اختر المصنف:</b> NB أو LR.`],
    [`<b>5. Train and tune:</b> on training and development data.`, `<b>5. درّب واضبط</b> ببيانات التدريب والتطوير.`],
    [`<b>6. Evaluate:</b> on unseen test data. The test set is never used for training or tuning.`, `<b>6. قيّم</b> على بيانات اختبار جديدة، ولا تُستخدم للتدريب أو الضبط.`]
  ],
  check: [`At which step is the test set used?`, `في أي خطوة تُستخدم مجموعة الاختبار؟`, [`Train and tune`, `Choose a classifier`, `Evaluate`, `Represent text`], 2, `Only for the final evaluation; using it earlier makes results look artificially good.`, `فقط للتقييم النهائي.`],
  remember: [`Task → labelled data → features → classifier → train & tune → evaluate on unseen test data.`, `مهمة ← بيانات موسومة ← خصائص ← مصنف ← تدريب وضبط ← تقييم.`]
};

LESSONS.c4s7 = {
  big: [`Classifiers can't read words; they read <b>numbers</b>. The simplest conversion: pick a vocabulary, then describe each document by how often each vocabulary word appears. Stack the rows and you have a <b>document-term matrix</b>.`, `المصنفات لا تقرأ الكلمات بل <b>الأرقام</b>. أبسط تحويل: اختر مفردات ثم صف كل مستند بعدد مرات ظهور كل كلمة، وبتكديس الصفوف تحصل على <b>مصفوفة مستند-مصطلح</b>.`],
  action: { w: 'bow', cfg: { a: 'great movie great cast', b: 'great plot boring script' }, cap: [`Reviews R1 and R3 from slide 11 as count vectors. Each one-hot row adds into the review's vector.`, `المراجعتان R1 وR3 من الشريحة 11 كمتجهات أعداد.`] },
  steps: [
    [`R1 "great movie, great cast" → [great 2, movie 1, cast 1, boring 0, plot 0, script 0], label +.`, `R1 ← [2, 1, 1, 0, 0, 0] إيجابي.`],
    [`R2 "boring plot, boring script" → [0, 0, 0, 2, 1, 1], label −.`, `R2 ← [0, 0, 0, 2, 1, 1] سلبي.`],
    [`R3 "great plot, boring script" → [1, 0, 0, 1, 1, 1], label ?: it has evidence for <b>both</b> classes, which the classifier must weigh.`, `R3 فيها دليل على الفئتين ويجب أن يوازنه المصنف.`],
    [`Every vector has the same length (= vocabulary size), however long the review is. The same matrix can feed Naive Bayes and logistic regression.`, `لكل المتجهات الطول نفسه، والمصفوفة نفسها تغذي المصنفين.`]
  ],
  remember: [`Text → feature vector (counts, n-grams, TF-IDF); fixed length = |V|; these numbers are what the classifier learns from.`, `النص ← متجه خصائص بطول |V|، وهذه الأرقام ما يتعلم منه المصنف.`]
};

LESSONS.c4s9 = {
  big: [`Naive Bayes asks: <b>which class makes this document most probable?</b> It combines how common each class is (the <b>prior</b>) with how likely the document's words are in that class (the <b>likelihood</b>), and picks the class with the highest score.`, `يسأل Naive Bayes: <b>أي فئة تجعل هذا المستند الأكثر احتمالًا؟</b> يجمع شيوع الفئة (<b>القبلي</b>) مع احتمال كلمات المستند فيها (<b>الاحتمالية</b>) ويختار الأعلى.`],
  steps: [
    [`Goal: ĉ = argmax over classes of P(c | d).`, `الهدف: ĉ = argmax P(c | d).`],
    [`Bayes' rule: P(c | d) = P(c) P(d | c) / P(d). <b>P(d) is the same for every class</b>, so it cannot change which class wins: drop it.`, `قاعدة بايز، و<b>P(d) واحد لكل الفئات</b> فلا يغيّر الفائز: نحذفه.`],
    [`<b>The naive assumption:</b> words are conditionally independent given the class, so P(d | c) = Π P(wᵢ | c).`, `<b>الافتراض الساذج:</b> الكلمات مستقلة بمعلومية الفئة.`],
    [`Decision rule: <b>ĉ = argmax P(c) Π P(wᵢ | c)</b>, or with logs, argmax [log P(c) + Σ log P(wᵢ | c)].`, `قاعدة القرار: <b>argmax P(c) Π P(wᵢ | c)</b> أو باللوغاريتمات.`]
  ],
  analogy: [`A doctor guessing an illness: how common is the illness in general (prior) × how typical each symptom is for that illness (likelihood). "Naive" means treating every symptom as independent evidence, even if some usually come together.`, `طبيب يخمّن المرض: مدى شيوع المرض (القبلي) × مدى ارتباط كل عرض به (الاحتمالية). و"ساذج" يعني معاملة كل عرض كدليل مستقل حتى لو اجتمعت الأعراض عادة.`],
  check: [`Why can Naive Bayes ignore P(d)?`, `لماذا يتجاهل NB قيمة P(d)؟`, [`It is always 1`, `It is the same for all classes, so it doesn't change the argmax`, `It is unknown`, `It equals the prior`], 1, `Dividing every class's score by the same number doesn't change which is largest.`, `قسمة كل النتائج على الرقم نفسه لا يغيّر الأكبر.`],
  remember: [`ĉ = argmax P(c) Π P(wᵢ | c). Drop P(d); naive = words independent given the class; use logs.`, `ĉ = argmax P(c) Π P(wᵢ | c)، ونحذف P(d).`]
};

LESSONS.c4s10 = {
  big: [`Training Naive Bayes is mostly <b>counting</b>. Count documents per class for the prior; count words per class for the likelihoods. One problem appears immediately: a word never seen in a class gets probability 0, and one zero wipes out the whole score. Add-1 smoothing (from Week 3) fixes it.`, `تدريب NB في معظمه <b>عدّ</b>: نعدّ المستندات لكل فئة للقبلي والكلمات لكل فئة للاحتمالية. وتظهر مشكلة فورًا: الكلمة غير المرئية في فئة احتمالها 0 فتمحو النتيجة كلها، ويحلها add-1.`],
  links: ['c3s17'],
  steps: [
    [`<b>Prior:</b> P(c) = documents in class c / total documents.`, `<b>القبلي:</b> مستندات الفئة ÷ كل المستندات.`],
    [`<b>Likelihood (raw):</b> P(w | c) = count(w, c) / total tokens in c.`, `<b>الاحتمالية الخام:</b> عدد الكلمة في الفئة ÷ رموز الفئة.`],
    [`<b>The zero problem:</b> a vocabulary word never seen in class c → P(w | c) = 0 → the whole product is 0.`, `<b>مشكلة الصفر:</b> كلمة غير مرئية في الفئة ← صفر ← النتيجة كلها صفر.`],
    [`<b>Add-1:</b> P(w | c) = (count(w, c) + 1) / (tokens in c + |V|).`, `<b>add-1:</b> (العدد + 1) / (رموز الفئة + |V|).`],
    [`<b>OOV words</b> (not in the training vocabulary at all) are handled separately: they are dropped from the test document.`, `<b>الكلمات خارج المفردات</b> تُحذف من مستند الاختبار.`]
  ],
  confuse: { a: [`Word unseen in a class`, `In the vocabulary, but never in this class ("fun" in NEG) → <b>add-1 smoothing</b>.`, `في المفردات لكن ليس في هذه الفئة ← <b>التنعيم</b>.`], b: [`OOV word`, `Not in the training vocabulary at all ("with") → <b>drop it</b>.`, `ليست في المفردات أصلًا ← <b>احذفها</b>.`], why: [`Both are "missing", but smoothing only covers vocabulary words. An OOV word has no row in any class, so it is removed.`, `كلاهما "مفقود"، لكن التنعيم يغطي كلمات المفردات فقط، والكلمة المجهولة تُحذف.`] },
  check: [`Without add-1, P(fun | negative) when "fun" never appears in negative documents is:`, `دون add-1، ما P(fun | negative) إذا لم تظهر fun في السلبي؟`, [`1/34`, `0, and the whole negative score collapses`, `1/14`, `It is skipped automatically`], 1, `This is slide 17's "Your turn": option B.`, `هذا سؤال الشريحة 17: الخيار B.`],
  remember: [`P(c) = docs ratio; P(w | c) = (count + 1) / (tokens in c + |V|). Smoothing for words unseen in a class; drop OOV words.`, `صيغ القبلي والاحتمالية مع add-1، وحذف الكلمات المجهولة.`]
};

LESSONS.c4s11 = {
  big: [`Let's classify slide 16's sentence <b>"predictable with no fun"</b> step by step. Training summary: 3 negative and 2 positive documents; 14 negative tokens, 9 positive tokens; |V| = 20.`, `لنصنّف جملة الشريحة 16 <b>"predictable with no fun"</b> خطوة بخطوة: 3 مستندات سلبية و2 إيجابية؛ 14 رمزًا سلبيًّا و9 إيجابية؛ |V| = 20.`],
  links: ['c4s10'],
  action: { steps: [[`<b>Priors:</b> P(NEG) = 3/5 = 0.6, P(POS) = 2/5 = 0.4.`, `<b>القبلي:</b> 0.6 و0.4.`], [`<b>Drop OOV:</b> "with" is not in the training vocabulary → use predictable, no, fun.`, `<b>حذف المجهول:</b> with ليست في المفردات.`], [`<b>Denominators:</b> NEG 14 + 20 = 34; POS 9 + 20 = 29.`, `<b>المقامات:</b> 34 و29.`], [`<b>Smoothed likelihoods:</b> NEG predictable (1+1)/34, no (1+1)/34, fun (0+1)/34. POS predictable (0+1)/29, no (0+1)/29, fun (1+1)/29.`, `<b>الاحتمالات:</b> السلبي 2/34 و2/34 و1/34، والإيجابي 1/29 و1/29 و2/29.`], [`<b>Scores:</b> NEG 0.6 × 2/34 × 2/34 × 1/34 ≈ 6.1 × 10⁻⁵. POS 0.4 × 1/29 × 1/29 × 2/29 ≈ 3.3 × 10⁻⁵.`, `<b>النتائج:</b> السلبي ≈ 6.1 × 10⁻⁵ والإيجابي ≈ 3.3 × 10⁻⁵.`], [`<b>Decision:</b> the negative score is larger → <b>negative</b>.`, `<b>القرار:</b> سلبي.`]], cap: [`Reveal one step at a time and try to compute the next number before you reveal it.`, `اكشف خطوة واحدة في كل مرة وحاول حساب الرقم التالي قبل كشفه.`] },
  check: [`What is the add-1 denominator for the positive class?`, `ما مقام add-1 للفئة الإيجابية؟`, [`9`, `20`, `29`, `34`], 2, `Tokens in POS (9) + |V| (20) = 29.`, `9 + 20 = 29.`],
  remember: [`"predictable with no fun": drop "with"; denominators 34 / 29; 6.1e-5 (NEG) > 3.3e-5 (POS) → negative.`, `حذف with؛ المقامان 34 و29؛ النتيجة سلبي.`]
};

LESSONS.c4s12 = {
  big: [`Logistic regression gives every feature a <b>weight</b>: positive weights push toward class 1, negative weights push away. Add up weight × value plus a bias to get a score z, then squash z into a probability with the <b>sigmoid</b>.`, `يعطي الانحدار اللوجستي كل خاصية <b>وزنًا</b>: الموجب يدفع نحو الفئة 1 والسالب بعيدًا. نجمع الوزن × القيمة مع الانحياز لنحصل على z، ثم نحوّلها إلى احتمال بالدالة <b>السينية</b>.`],
  steps: [
    [`<b>Score:</b> z = w · x + b (weights × feature values + bias).`, `<b>النتيجة:</b> z = w · x + b.`],
    [`<b>Sigmoid:</b> P(y = 1 | x) = σ(z) = 1 / (1 + e⁻ᶻ), always between 0 and 1.`, `<b>السينية:</b> σ(z) = 1 / (1 + e⁻ᶻ) بين 0 و1.`],
    [`Large negative z → near 0; <b>z = 0 → exactly 0.5</b> (the decision boundary); large positive z → near 1.`, `z سالبة كبيرة ← قرب 0، و<b>z = 0 ← 0.5</b>، وz موجبة كبيرة ← قرب 1.`],
    [`<b>Decision:</b> predict class 1 when P ≥ 0.5. The steep middle is where the classifier is least certain.`, `<b>القرار:</b> الفئة 1 إذا الاحتمال ≥ 0.5.`]
  ],
  action: { w: 'activation', cfg: { z: 0.833, marks: [-3, 0, 0.833, 3] }, cap: [`Drag z and watch the probability. Try the lecture's z = 0.833.`, `حرّك z وراقب الاحتمال، وجرّب z = 0.833.`] },
  confuse: { a: [`Naive Bayes`, `Estimates <b>probabilities from counts</b>.`, `يقدّر <b>الاحتمالات بالعدّ</b>.`], b: [`Logistic regression`, `Learns <b>feature weights</b> directly.`, `يتعلم <b>أوزان الخصائص</b> مباشرة.`], why: [`Slide 18's bridge: "from counted probabilities to learned weights".`, `جسر الشريحة 18: "من الاحتمالات المعدودة إلى الأوزان المتعلَّمة".`] },
  check: [`What is σ(0)?`, `ما قيمة σ(0)؟`, [`0`, `0.5`, `1`, `It depends on the weights`], 1, `1 / (1 + e⁰) = 1/2: the decision boundary.`, `1/2 وهو حد القرار.`],
  remember: [`z = w·x + b → σ(z) = 1/(1 + e⁻ᶻ); σ(0) = 0.5 is the boundary; predict 1 if ≥ 0.5.`, `z ← σ(z)، وσ(0) = 0.5 حد القرار.`]
};

LESSONS.c4s13 = {
  big: [`Slide 21 scores a review with six features, with y = 1 meaning positive. Watch how the weights turn evidence into a single score.`, `الشريحة 21 تقيّم مراجعة بست خصائص، وy = 1 تعني إيجابي. لاحظ كيف تحوّل الأوزان الأدلة إلى نتيجة واحدة.`],
  action: { steps: [[`Features x: 3 positive lexicon words, 2 negative lexicon words, contains "no" = 1, 3 first/second-person pronouns, contains "!" = 0, ln(66 words) = 4.19.`, `الخصائص: 3 كلمات إيجابية، 2 سلبية، وجود no = 1، 3 ضمائر، لا "!"، ln(66) = 4.19.`], [`Weights w = [2.5, −5.0, −1.2, 0.5, 2.0, 0.7], bias b = 0.1.`, `الأوزان والانحياز 0.1.`], [`z = 2.5(3) − 5.0(2) − 1.2(1) + 0.5(3) + 2.0(0) + 0.7(4.19) + 0.1 = 7.5 − 10 − 1.2 + 1.5 + 0 + 2.93 + 0.1 = <b>0.833</b>.`, `z = 0.833.`], [`σ(0.833) ≈ <b>0.70</b> → positive; P(negative) = 0.30.`, `σ(0.833) ≈ 0.70 ← إيجابي.`], [`The two negative words pull the score down by 10, yet the review still comes out positive.`, `الكلمتان السلبيتان تخفضان النتيجة 10 ومع ذلك تبقى إيجابية.`]], cap: [`Compute each line yourself before revealing it.`, `احسب كل سطر بنفسك قبل كشفه.`] },
  check: [`Which feature pulls z down the most in this example?`, `أي خاصية تخفض z أكثر في المثال؟`, [`Positive lexicon words`, `Negative lexicon words`, `Pronouns`, `ln(word count)`], 1, `−5.0 × 2 = −10.`, `−5.0 × 2 = −10.`],
  remember: [`z = 0.833 → σ = 0.70 → positive.`, `z = 0.833 ← 0.70 ← إيجابي.`]
};

LESSONS.c4s14 = {
  big: [`Where do the weights come from? A loop: <b>predict</b> with the current weights, <b>measure the error</b> with cross-entropy loss, <b>nudge the weights</b> with gradient descent to reduce that loss, and repeat.`, `من أين تأتي الأوزان؟ من حلقة: <b>تنبأ</b> بالأوزان الحالية، و<b>قِس الخطأ</b> بخسارة الإنتروبيا المتقاطعة، و<b>عدّل الأوزان</b> بالانحدار التدريجي لتقليلها، ثم كرر.`],
  steps: [
    [`<b>Predict:</b> p = P(y = 1 | x) with the current w and b.`, `<b>التنبؤ:</b> p بالأوزان الحالية.`],
    [`<b>Loss:</b> L = −[y log p + (1 − y) log(1 − p)]. If y = 1 and p is near 1, L is small; if p is near 0, L is large.`, `<b>الخسارة:</b> صغيرة إذا اقتربت p من الصواب وكبيرة إذا ابتعدت.`],
    [`<b>Update:</b> gradient descent changes w and b in the direction that reduces L.`, `<b>التحديث:</b> الانحدار التدريجي يغيّر w وb لتقليل الخسارة.`],
    [`<b>Repeat</b> over the training examples. (Cross-entropy returns in Week 6.)`, `<b>التكرار</b> على أمثلة التدريب.`]
  ],
  analogy: [`Like tuning a guitar: play a note (predict), hear how far off it is (loss), turn the peg a little in the right direction (gradient step), and repeat until it sounds right.`, `مثل ضبط الغيتار: اعزف نغمة، واسمع مدى انحرافها، وأدر المفتاح قليلًا في الاتجاه الصحيح، وكرر.`],
  remember: [`Predict → cross-entropy loss → gradient descent → repeat.`, `تنبؤ ← خسارة ← انحدار تدريجي ← تكرار.`]
};

LESSONS.c4s15 = {
  big: [`Topics have more than two classes (business, sports, health…). The sigmoid only handles two, so we use <b>softmax</b>: give each class its own score zₖ = wₖ · x + bₖ, then turn all the scores into one probability distribution that sums to 1.`, `المواضيع لها أكثر من فئتين، والسينية تتعامل مع فئتين فقط، فنستخدم <b>softmax</b>: لكل فئة نتيجتها zₖ، ثم نحوّل كل النتائج إلى توزيع احتمالي واحد مجموعه 1.`],
  links: ['c4s12'],
  action: { w: 'softmax', cfg: { labels: ['business', 'sports', 'health'], z: [2.0, 0.5, -0.5] }, cap: [`Imagine these are the scores for "Liebert Corp shareholders approved a merger…". Raise or lower one score and watch every probability change. (Illustrative scores.)`, `تخيّل أنها نتائج مقال Liebert Corp؛ غيّر نتيجة وراقب تغيّر كل الاحتمالات (أرقام توضيحية).`] },
  steps: [
    [`Each class k has its own weights: zₖ = wₖ · x + bₖ.`, `لكل فئة أوزانها: zₖ = wₖ · x + bₖ.`],
    [`P(y = k | x) = exp(zₖ) / Σⱼ exp(zⱼ).`, `P(y = k | x) = exp(zₖ) / Σ exp(zⱼ).`],
    [`Choose the class with the highest probability. merger, shareholders, shares and stock are strong cues for <b>Business</b>.`, `نختار الفئة الأعلى، وكلمات مثل merger وstock تشير إلى <b>الأعمال</b>.`]
  ],
  confuse: { a: [`Sigmoid`, `<b>Binary</b>: one score → P(y = 1); P(y = 0) = 1 − P.`, `<b>ثنائي</b>: نتيجة واحدة.`], b: [`Softmax`, `<b>Multiclass</b>: one score per class → a distribution that sums to 1.`, `<b>متعدد</b>: نتيجة لكل فئة.`], why: [`Slide 25 trap: softmax outputs are NOT independent (they share one denominator), and the top probability is NOT always above 0.5.`, `فخ الشريحة 25: مخرجات softmax ليست مستقلة، وأعلى احتمال ليس دائمًا فوق 0.5.`] },
  check: [`Which statement about softmax outputs is true?`, `أي عبارة عن مخرجات softmax صحيحة؟`, [`Each class probability is computed independently`, `They are positive and sum to 1 across all classes`, `The largest is always above 0.5`, `They can be negative`], 1, `Slide 25's answer is B.`, `إجابة الشريحة 25 هي B.`],
  remember: [`Sigmoid → binary; softmax → multiclass: exp(zₖ) / Σ exp(zⱼ), positive, sums to 1.`, `السينية للثنائي وsoftmax للمتعدد ومجموعه 1.`]
};

LESSONS.c4s16 = {
  big: [`Both classifiers can use the same features and both pick the most probable class, but they think differently. Naive Bayes asks "how would each class <i>generate</i> these words?"; logistic regression asks directly "given these features, which class?"`, `المصنفان يستخدمان الخصائص نفسها ويختاران الفئة الأكثر احتمالًا، لكن طريقة التفكير مختلفة: NB يسأل "كيف <i>تولّد</i> كل فئة هذه الكلمات؟" وLR يسأل مباشرة "بمعلومية الخصائص، أي فئة؟"`],
  confuse: { a: [`Naive Bayes`, `<b>Generative</b>: models P(words | class). Learns probabilities by counting. Assumes conditional independence.`, `<b>توليدي</b>: P(الكلمات | الفئة)، بالعدّ، مع افتراض الاستقلال.`], b: [`Logistic regression`, `<b>Discriminative</b>: models P(class | text). Learns weights by gradient descent. No independence assumption; handles overlapping or correlated features better.`, `<b>تمييزي</b>: P(الفئة | النص)، يتعلم الأوزان، بلا افتراض استقلال، وأفضل مع الخصائص المترابطة.`], why: [`Memory hook: Generative = how the data is Generated; Discriminative = Discriminate between classes directly.`, `للحفظ: التوليدي = كيف تتولد البيانات، والتمييزي = التمييز بين الفئات مباشرة.`] },
  check: [`Which classifier is discriminative?`, `أي المصنفين تمييزي؟`, [`Naive Bayes`, `Logistic regression`, `Both`, `Neither`], 1, `It models P(class | text) directly.`, `ينمذج P(الفئة | النص) مباشرة.`],
  remember: [`NB = generative, counts, independence. LR = discriminative, weights, handles correlated features.`, `NB توليدي بالعدّ، وLR تمييزي بالأوزان.`],
  teach: [`Explain the difference between Naive Bayes and logistic regression in your own words.`, `اشرح الفرق بين المصنفين بأسلوبك.`, `Naive Bayes is generative: it models how likely the words are under each class, P(words | class), estimates class and word probabilities mostly by counting, and assumes words are conditionally independent given the class. Logistic regression is discriminative: it models P(class | text) directly by learning a weight for each feature with gradient descent on cross-entropy loss. It makes no independence assumption, so it handles overlapping or correlated features better.`, `NB توليدي ينمذج P(الكلمات | الفئة) بالعدّ ويفترض الاستقلال، وLR تمييزي ينمذج P(الفئة | النص) بتعلم الأوزان ولا يفترض الاستقلال فيتعامل أفضل مع الخصائص المترابطة.`]
};

LESSONS.c4s17 = {
  big: [`A spam filter that never flags anything can still score 95% accuracy, if 95% of emails are normal. <b>Accuracy hides mistakes on the class you care about</b> when the data is imbalanced.`, `مرشح مزعج لا يحدد شيئًا قد يحقق دقة 95% إذا كانت 95% من الرسائل عادية. <b>الدقة الإجمالية تخفي الأخطاء في الفئة المهمة</b> عند عدم التوازن.`],
  action: { w: 'prf', cfg: { tp: 0, fp: 0, fn: 50, tn: 950 }, cap: [`The "lazy model" that always says "not spam". Look at accuracy, then at recall. Then load the lecture example.`, `"النموذج الكسول" الذي يقول دائمًا "ليست مزعجة": انظر إلى الدقة ثم الاستدعاء، ثم حمّل مثال المحاضرة.`] },
  steps: [
    [`<b>Confusion matrix:</b> TP (spam caught), FN (spam missed), FP (false alarm), TN (normal passed).`, `<b>مصفوفة الالتباس:</b> TP وFN وFP وTN.`],
    [`Accuracy counts all correct predictions, so 950 correct "not spam" answers hide 50 missed spam emails.`, `الدقة الإجمالية تعدّ كل الصحيح، فتخفي 950 إجابة صحيحة 50 رسالة فائتة.`],
    [`<b>Solution:</b> use precision, recall and F1 for the target class.`, `<b>الحل:</b> الدقة والاستدعاء وF1 للفئة المستهدفة.`]
  ],
  remember: [`With imbalanced classes, accuracy misleads (always "not spam" = 95%). Use P/R/F1 for the target class.`, `مع عدم التوازن تضلل الدقة الإجمالية، فاستخدم الدقة والاستدعاء وF1.`]
};

LESSONS.c4s18 = {
  big: [`Two questions about the positive class. <b>Precision:</b> when the model says "spam", how often is it right? <b>Recall:</b> of all the real spam, how much did it catch? <b>F1</b> combines them into one balanced score.`, `سؤالان عن الفئة الإيجابية: <b>الدقة:</b> عندما يقول النموذج "مزعج" كم مرة يصيب؟ <b>الاستدعاء:</b> من كل المزعج الحقيقي كم أمسك؟ و<b>F1</b> يجمعهما.`],
  action: { w: 'prf', cfg: { tp: 8, fp: 2, fn: 4, tn: 86 }, cap: [`Slide 29: TP = 8, FP = 2, FN = 4. Precision 0.80, recall 0.67, F1 0.73. Raise FP and watch only precision fall; raise FN and watch only recall fall. (The slide gives no TN, so the 86 here, and therefore the accuracy, is illustrative.)`, `الشريحة 29: الدقة 0.80 والاستدعاء 0.67 وF1 0.73. ارفع FP ثم FN ولاحظ أثر كل منهما.`] },
  steps: [
    [`<b>Precision = TP / (TP + FP)</b> = 8/10 = 0.80: few false alarms when high.`, `<b>الدقة = TP / (TP + FP)</b> = 0.80.`],
    [`<b>Recall = TP / (TP + FN)</b> = 8/12 = 0.67: few missed positives when high.`, `<b>الاستدعاء = TP / (TP + FN)</b> = 0.67.`],
    [`<b>F1 = 2PR / (P + R)</b> = 2(0.80)(0.67) / 1.47 ≈ 0.73.`, `<b>F1 = 2PR / (P + R)</b> ≈ 0.73.`],
    [`For multiclass tasks, compute the metrics per class, then summarize.`, `في المتعدد نحسب لكل فئة ثم نلخّص.`]
  ],
  analogy: [`A fishing net: precision is how much of your catch is actually fish (not boots); recall is how many of the fish in the lake you caught.`, `شبكة صيد: الدقة كم من صيدك سمك فعلًا لا أحذية، والاستدعاء كم من أسماك البحيرة أمسكت.`],
  confuse: { a: [`Precision`, `TP / (TP + <b>FP</b>): hurt by <b>false alarms</b>.`, `يتأثر بـ <b>الإنذارات الكاذبة</b>.`], b: [`Recall`, `TP / (TP + <b>FN</b>): hurt by <b>missed positives</b>.`, `يتأثر بـ <b>الإيجابيات الفائتة</b>.`], why: [`Both have TP on top; only the second term in the denominator differs. Precision looks at what you predicted; recall looks at what was really there.`, `كلاهما بسطه TP ويختلف الحد الثاني في المقام: الدقة تنظر لما تنبأت به، والاستدعاء لما كان موجودًا فعلًا.`] },
  check: [`TP = 8, FN = 4. Recall = ?`, `TP = 8 وFN = 4. الاستدعاء = ؟`, [`0.80`, `0.67`, `0.50`, `0.33`], 1, `8 / (8 + 4) = 0.67.`, `8 / 12 = 0.67.`],
  remember: [`P = TP/(TP+FP), R = TP/(TP+FN), F1 = 2PR/(P+R). Spam: 0.80 / 0.67 / 0.73.`, `الصيغ الثلاث ومثال 0.80/0.67/0.73.`],
  teach: [`Explain precision and recall using the spam example and say which error type hurts each.`, `اشرح الدقة والاستدعاء بمثال المزعج وأي خطأ يضر كلًّا منهما.`, `Precision is the fraction of predicted spam that really is spam: TP / (TP + FP) = 8/10 = 0.80, so false alarms (FP) lower it. Recall is the fraction of real spam that the model found: TP / (TP + FN) = 8/12 = 0.67, so missed spam (FN) lowers it. F1 = 2PR / (P + R) ≈ 0.73 balances the two. Accuracy alone can hide these errors when classes are imbalanced.`, `الدقة نسبة ما تنبأ أنه مزعج وهو مزعج فعلًا (0.80) وتخفضها الإنذارات الكاذبة، والاستدعاء نسبة المزعج الحقيقي الذي وُجد (0.67) ويخفضه الفوات، وF1 ≈ 0.73.`]
};

LESSONS.c4s19 = {
  big: [`Two practical habits keep evaluation honest: keep a <b>clean train / dev / test split</b>, and watch for <b>class imbalance</b>, where the model may simply favour the majority class.`, `عادتان عمليتان تحفظان نزاهة التقييم: <b>تقسيم نظيف</b> للبيانات، ومراقبة <b>عدم توازن الفئات</b> حيث قد يفضّل النموذج الفئة الغالبة.`],
  steps: [
    [`<b>Training set:</b> learn parameters. <b>Development set:</b> tune features or hyperparameters. <b>Test set:</b> final evaluation only.`, `<b>التدريب:</b> المعاملات. <b>التطوير:</b> الضبط. <b>الاختبار:</b> التقييم النهائي فقط.`],
    [`<b>Detect imbalance:</b> check label counts before training and after splitting.`, `<b>اكشف عدم التوازن:</b> تحقق من أعداد الوسوم.`],
    [`<b>Evaluate</b> with precision, recall and F1; <b>split</b> with stratified splitting when possible.`, `<b>قيّم</b> بالدقة والاستدعاء وF1، و<b>قسّم</b> تقسيمًا طبقيًّا.`],
    [`<b>Mitigate during training:</b> class weighting or resampling. Resampling changes training data only; <b>never resample the test set</b>.`, `<b>عالج أثناء التدريب:</b> أوزان الفئات أو إعادة المعاينة، و<b>لا تُعِد معاينة الاختبار أبدًا</b>.`]
  ],
  check: [`Which of these must never be resampled?`, `أيها لا تجب إعادة معاينته أبدًا؟`, [`The training set`, `The minority class in training`, `The final test set`, `The majority class in training`], 2, `The test set must reflect real data to give an honest score.`, `يجب أن يعكس الاختبار البيانات الحقيقية.`],
  remember: [`Train / dev / test with no leakage. Imbalance: check counts, use P/R/F1, stratify, weight or resample the training data only.`, `تقسيم بلا تسرب، ومعالجة عدم التوازن على التدريب فقط.`]
};
