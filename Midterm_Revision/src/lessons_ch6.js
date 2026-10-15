/* Guided lessons – Week 6: Deep Learning for NLP */
MISSIONS.ch6 = [
  { t: [`What a neural layer does`, `ماذا تفعل الطبقة العصبية`], goal: [`Compute a neural unit, explain activations and show why a hidden layer solves XOR.`, `احسب الوحدة العصبية واشرح دوال التنشيط وبيّن كيف تحل الطبقة المخفية XOR.`], secs: ['1', '2', '3', '4', '5', '6'] },
  { t: [`Words as neural inputs`, `الكلمات كمدخلات عصبية`], goal: [`Explain embedding lookup and build a context vector by concatenation.`, `اشرح البحث في جدول التضمين وابنِ متجه السياق بالضم.`], secs: ['7', '8'] },
  { t: [`From context to prediction`, `من السياق إلى التنبؤ`], goal: [`Run the fixed-window forward pass from context vector to softmax probabilities.`, `نفّذ التمرير الأمامي من متجه السياق إلى احتمالات softmax.`], secs: ['9', '10', '11', '12'] },
  { t: [`Training and evaluating`, `التدريب والتقييم`], goal: [`Compute cross-entropy, describe backpropagation and gradient descent, and compute perplexity.`, `احسب الإنتروبيا المتقاطعة وصف الانتشار العكسي والانحدار التدريجي واحسب الحيرة.`], secs: ['13', '14', '15', '16'] },
  { t: [`Longer context: RNNs and LSTMs`, `السياق الأطول: RNN وLSTM`], goal: [`Explain the fixed-window limit (core), then RNN states and LSTM gates (additional depth).`, `اشرح قيد النافذة الثابتة (أساسي) ثم حالات RNN وبوابات LSTM (تعمّق إضافي).`], secs: ['16b', '17', '18', '19', '20'] }
];

LESSONS.c6s1 = {
  big: [`This lecture follows one sentence, "I like …", all the way from text to a prediction and back through training. Keep this map in mind: <b>text → token IDs → embeddings → context vector x → hidden layer h → logits z → softmax p → loss → update → evaluate</b>.`, `تتبع هذه المحاضرة جملة واحدة "I like …" من النص إلى التنبؤ ثم التدريب. احفظ هذه الخريطة: <b>نص ← أرقام ← تضمينات ← متجه السياق x ← الطبقة المخفية h ← logits z ← softmax p ← الخسارة ← التحديث ← التقييم</b>.`],
  links: ['c5s22', 'c4s12'],
  steps: [
    [`<b>Problem 1:</b> what does a neural layer do? (unit → activation → hidden layer)`, `<b>المسألة 1:</b> ماذا تفعل الطبقة العصبية؟`],
    [`<b>Problem 2:</b> how do words become inputs? (token ID → embedding → context vector)`, `<b>المسألة 2:</b> كيف تصبح الكلمات مدخلات؟`],
    [`<b>Problem 3:</b> how does the context become a prediction? (hidden layer → logits → softmax)`, `<b>المسألة 3:</b> كيف يصبح السياق تنبؤًا؟`],
    [`<b>Problem 4:</b> how do we train and evaluate? (cross-entropy → backpropagation → perplexity)`, `<b>المسألة 4:</b> كيف ندرّب ونقيّم؟`],
    [`<b>Problem 5 (additional depth):</b> what if useful context is far away? (RNN → LSTM)`, `<b>المسألة 5 (تعمّق):</b> ماذا لو كان السياق بعيدًا؟`]
  ],
  remember: [`Text → IDs → embeddings → x → h → logits → softmax → loss → update → evaluate.`, `نص ← أرقام ← تضمينات ← x ← h ← logits ← softmax ← خسارة ← تحديث ← تقييم.`]
};

LESSONS.c6s2 = {
  big: [`A neural network is a set of small computing units connected in layers. It uses much of the same maths as logistic regression, but it is a more powerful classifier because it can take raw tokens and <b>learn its own features</b>, instead of relying on hand-designed ones.`, `الشبكة العصبية وحدات حسابية صغيرة متصلة في طبقات، تستخدم رياضيات الانحدار اللوجستي نفسها تقريبًا لكنها أقوى لأنها <b>تتعلم خصائصها بنفسها</b> من الرموز بدل الخصائص المصممة يدويًّا.`],
  links: ['c4s12'],
  remember: [`Neural nets = layers of small units; same maths as logistic regression, but they learn their own features.`, `الشبكات طبقات وحدات، رياضيات LR نفسها، وتتعلم خصائصها.`]
};

LESSONS.c6s3 = {
  big: [`One neural unit does exactly three things: multiply each input by its weight, add them up with a bias to get a score z, then pass z through an activation to get the output a. With a sigmoid activation, <b>one unit is logistic regression</b>.`, `الوحدة العصبية تفعل ثلاثة أشياء: تضرب كل مدخل في وزنه، وتجمعها مع الانحياز لتحصل على z، ثم تمرر z عبر دالة تنشيط لتحصل على a. ومع السينية <b>الوحدة الواحدة = انحدار لوجستي</b>.`],
  links: ['c4s12'],
  action: { steps: [[`Inputs x = [2, 1]ᵀ, weights w = [0.5, −1]ᵀ, bias b = 0.1.`, `x = [2, 1] وw = [0.5, −1] وb = 0.1.`], [`Weighted sum: z = wᵀx + b = 0.5(2) + (−1)(1) + 0.1 = <b>0.1</b>.`, `z = 0.1.`], [`Activation: a = σ(0.1) = 1 / (1 + e^−0.1) ≈ <b>0.5250</b>.`, `a ≈ 0.5250.`], [`a goes to the next layer (or is the final prediction). A hidden activation is a learned feature; on its own it is not a class probability.`, `a تذهب للطبقة التالية، والتنشيط المخفي خاصية متعلَّمة لا احتمال فئة.`]], cap: [`Slide 7's complete example. Compute each value before revealing it.`, `مثال الشريحة 7 الكامل؛ احسب كل قيمة قبل كشفها.`] },
  check: [`x = [2, 1], w = [0.5, −1], b = 0.1. What is z?`, `ما قيمة z؟`, [`0.1`, `2.1`, `−0.1`, `0.5250`], 0, `0.5×2 − 1×1 + 0.1 = 0.1 (0.5250 is a, after the sigmoid).`, `0.1، و0.5250 هي a بعد السينية.`],
  remember: [`z = wᵀx + b, a = activation(z). Example: z = 0.1, a ≈ 0.5250. Sigmoid unit = logistic regression.`, `z = wᵀx + b وa = تنشيط(z)، والمثال 0.1 و0.5250.`]
};

LESSONS.c6s4 = {
  big: [`Why not skip the activation? Because without it, a layer is just a weighted sum plus a bias (an <b>affine</b> transformation), and stacking affine layers still gives one affine transformation: a deep network would be no smarter than a single layer. The <b>non-linear</b> activation is what lets depth add power.`, `لماذا لا نتخطى التنشيط؟ لأن الطبقة دونه مجموع موزون وانحياز (<b>تحويل تآلفي</b>)، وتكديس التحويلات التآلفية يبقى تحويلًا واحدًا، فلا تكون الشبكة العميقة أذكى من طبقة واحدة. <b>اللاخطية</b> هي ما يجعل العمق مفيدًا.`],
  action: { w: 'activation', cfg: { z: 0.1, all: true, marks: [-4, 0, 1, 4] }, cap: [`Drag z. Notice that sigmoid and tanh flatten at large |z| (saturate) while ReLU keeps rising.`, `حرّك z ولاحظ أن السينية وtanh تتسطحان عند القيم الكبيرة بينما يستمر ReLU في الارتفاع.`] },
  steps: [
    [`<b>Sigmoid:</b> 1 / (1 + e⁻ᶻ), range (0, 1): binary outputs and gates.`, `<b>السينية:</b> المدى (0, 1)، للمخرجات الثنائية والبوابات.`],
    [`<b>tanh:</b> range (−1, 1): RNN states and the LSTM candidate.`, `<b>tanh:</b> المدى (−1, 1)، لحالات RNN ومرشح LSTM.`],
    [`<b>ReLU:</b> max(0, z), range [0, ∞): feedforward hidden layers.`, `<b>ReLU:</b> max(0, z)، للطبقات المخفية الأمامية.`],
    [`<b>Saturation:</b> sigmoid and tanh flatten for large |z|, so their slope is near 0. The textbook page shown on slide 11 explains that this shrinks learning signals (vanishing gradients); ReLU's slope is 1 for positive z.`, `<b>التشبع:</b> السينية وtanh تتسطحان فيقترب ميلهما من 0 (تلاشي التدرج)، وميل ReLU = 1 للقيم الموجبة.`]
  ],
  check: [`Which activation has range (−1, 1)?`, `أي دالة مداها (−1, 1)؟`, [`Sigmoid`, `tanh`, `ReLU`, `Softmax`], 1, `tanh; sigmoid is (0, 1) and ReLU is [0, ∞).`, `tanh.`],
  remember: [`No activation → stacked layers collapse to one affine map. Sigmoid (0,1), tanh (−1,1), ReLU max(0,z).`, `دون تنشيط تنهار الطبقات، والمديات الثلاث.`],
  teach: [`Explain why a neural network needs a non-linear activation.`, `اشرح لماذا تحتاج الشبكة تنشيطًا غير خطي.`, `Without an activation, each layer computes only a weighted sum plus a bias, an affine transformation. A composition of affine transformations is still one affine transformation, so stacking layers would add no power. A non-linear activation such as ReLU, sigmoid or tanh lets the network model more complex patterns, for example XOR, which no single linear boundary can separate.`, `دون تنشيط تحسب كل طبقة تحويلًا تآلفيًّا، وتركيبها يبقى تحويلًا واحدًا، فلا يفيد التكديس. والتنشيط غير الخطي يسمح بنمذجة أنماط معقدة مثل XOR.`]
};

LESSONS.c6s5 = {
  big: [`Put many units side by side and you get a layer; chain layers and you get a <b>feedforward network</b>: values flow from inputs through hidden layers to outputs, with no loops. The output layer gives one score per class (a <b>logit</b>), and softmax turns the scores into probabilities.`, `ضع وحدات كثيرة متجاورة تحصل على طبقة، واربط الطبقات تحصل على <b>شبكة أمامية</b>: القيم تتدفق من المدخلات إلى المخرجات دون حلقات. وطبقة المخرجات تعطي نتيجة لكل فئة (<b>logit</b>)، وsoftmax يحولها لاحتمالات.`],
  steps: [
    [`<b>Layers:</b> input → hidden (one or more) → output. Each unit connects to every unit in the next layer.`, `<b>الطبقات:</b> مدخلات ← مخفية ← مخرجات.`],
    [`<b>Weights as matrices:</b> W connects inputs to the hidden layer; U connects the hidden layer to the output. Each layer has a bias.`, `<b>الأوزان كمصفوفات:</b> W للمدخلات ← المخفية، وU للمخفية ← المخرجات.`],
    [`<b>Logits → softmax → probabilities</b> that sum to 1.`, `<b>logits ← softmax ← احتمالات</b> مجموعها 1.`],
    [`<b>Training</b> learns the weights and biases by reducing a <b>loss</b>: a number for how far the prediction is from the correct output.`, `<b>التدريب</b> يتعلم الأوزان بتقليل <b>الخسارة</b>.`]
  ],
  action: { w: 'softmax', cfg: { labels: ['I', 'like', 'NLP'], z: [0, 1, 2] }, cap: [`The output layer's logits from the worked model coming up (z = [0, 1, 2]). Change them and watch softmax turn any scores into probabilities that sum to 1.`, `نتائج طبقة المخرجات من المثال القادم z = [0, 1, 2]. غيّرها وراقب softmax يحوّلها إلى احتمالات مجموعها 1.`] },
  remember: [`Feedforward = no loops; W: input → hidden, U: hidden → output; logits → softmax; training reduces a loss.`, `الشبكة الأمامية بلا حلقات، وW وU، وlogits ← softmax.`]
};

LESSONS.c6s6 = {
  big: [`Why do we need <i>hidden</i> layers at all? The classic answer is <b>XOR</b>: output 1 when exactly one input is 1. A single unit draws one straight line, and no straight line can separate XOR's answers. A hidden layer re-describes the inputs so the problem becomes easy.`, `لماذا نحتاج طبقات <i>مخفية</i>؟ الجواب الكلاسيكي <b>XOR</b>: المخرج 1 إذا كان مدخل واحد فقط 1. الوحدة الواحدة ترسم خطًّا مستقيمًا ولا يوجد خط يفصل إجابات XOR، والطبقة المخفية تعيد وصف المدخلات فيصبح الحل سهلًا.`],
  think: [`Picture the four points (0,0), (0,1), (1,0), (1,1) on a square. XOR is 1 for (0,1) and (1,0). Can one straight line put both 1s on one side and both 0s on the other?`, `تخيّل النقاط الأربع على مربع، وXOR = 1 للنقطتين (0,1) و(1,0). هل يفصل خط مستقيم واحد بين الـ1 والـ0؟`, `No. The 1s sit on opposite corners, and so do the 0s. Any line that separates one pair cuts through the other. XOR is not linearly separable.`, `لا. الـ1 في زاويتين متقابلتين وكذلك الـ0، فأي خط يفصل زوجًا يقطع الآخر. XOR غير قابل للفصل خطيًّا.`],
  steps: [
    [`A <b>perceptron</b> is a unit with a binary output and no non-linear activation.`, `<b>Perceptron</b> وحدة بمخرج ثنائي دون تنشيط غير خطي.`],
    [`Weights 1 and 1 with bias −1 compute <b>AND</b> (only 1 + 1 − 1 &gt; 0). With bias 0 the same unit computes <b>OR</b>.`, `بأوزان 1 و1 وانحياز −1 تحسب <b>AND</b>، وبانحياز 0 تحسب <b>OR</b>.`],
    [`For two inputs, w₁x₁ + w₂x₂ + b = 0 is a line, a <b>decision boundary</b>, so perceptrons are <b>linear classifiers</b>. XOR cannot be separated by one line (Minsky and Papert, 1969).`, `المعادلة خط مستقيم (<b>حد القرار</b>)، فالوحدات <b>مصنفات خطية</b>، وXOR لا يفصله خط.`],
    [`<b>Hidden-layer solution:</b> s = x₁ + x₂, h₁ = ReLU(s), h₂ = ReLU(s − 1), y = h₁ − 2h₂ → outputs 0, 1, 1, 0 for (0,0), (0,1), (1,0), (1,1).`, `<b>الحل:</b> h₁ = ReLU(s) وh₂ = ReLU(s − 1) وy = h₁ − 2h₂ ← 0، 1، 1، 0.`],
    [`This hand-built construction demonstrates non-linear representation; it is not a trained probabilistic classifier.`, `هذا بناء يدوي يوضح التمثيل غير الخطي وليس مصنفًا مدرَّبًا.`]
  ],
  check: [`For input (1, 1): s = 2, h₁ = 2, h₂ = ReLU(1) = 1. What is y = h₁ − 2h₂?`, `للمدخل (1, 1): ما قيمة y = h₁ − 2h₂؟`, [`0`, `1`, `2`, `−1`], 0, `2 − 2(1) = 0, as XOR requires.`, `2 − 2 = 0 كما يتطلب XOR.`],
  remember: [`Perceptron = linear (AND bias −1, OR bias 0). XOR is not linearly separable; a ReLU hidden layer solves it.`, `الوحدة خطية، وXOR غير قابل للفصل خطيًّا وتحله طبقة مخفية.`],
  teach: [`Explain why one perceptron cannot compute XOR and how a hidden layer fixes it.`, `اشرح لماذا لا تحسب وحدة واحدة XOR وكيف تصلح الطبقة المخفية ذلك.`, `A perceptron's decision boundary for two inputs is a straight line, so it is a linear classifier: it can compute AND (weights 1, 1, bias −1) and OR (bias 0). XOR outputs 1 only when exactly one input is 1; its positive points lie on opposite corners, so no single line separates them. A hidden layer re-represents the input: with h₁ = ReLU(x₁ + x₂) and h₂ = ReLU(x₁ + x₂ − 1), the output y = h₁ − 2h₂ gives 0, 1, 1, 0, which is XOR.`, `حد القرار للوحدة خط مستقيم فهي مصنف خطي يحسب AND وOR، أما XOR فنقاطه الموجبة في زاويتين متقابلتين فلا يفصلها خط، والطبقة المخفية تعيد التمثيل فتعطي 0، 1، 1، 0.`]
};

LESSONS.c6s7 = {
  big: [`A neural network needs numbers, but a token ID like 12 is just an address: ID 12 is not "twice" ID 6. So the network keeps an <b>embedding table</b> E with one row of d numbers per vocabulary word. The token ID simply <b>selects a row</b>, and training can improve those rows.`, `الشبكة تحتاج أرقامًا، لكن رقم الرمز 12 مجرد عنوان وليس "ضعف" 6. لذلك تحتفظ الشبكة بـ<b>جدول تضمين</b> E فيه صف من d أرقام لكل كلمة، والرقم <b>يختار صفًّا</b>، والتدريب يحسّن الصفوف.`],
  links: ['c5s22'],
  action: { steps: [[`Vocabulary [I, like, NLP] with IDs 0, 1, 2 (zero-based). E (3 × 2): I = [1, 0], like = [0, 1], NLP = [1, 1].`, `المفردات بأرقام 0، 1، 2، وE بحجم 3 × 2.`], [`"like" has ID 1 → select row 1 → e_like = [0, 1]ᵀ.`, `like رقمها 1 ← الصف 1 ← [0, 1].`], [`Same result as multiplying Eᵀ by the one-hot vector q_like = [0, 1, 0]ᵀ: Eᵀq_like = [0, 1]ᵀ. A lookup is just a cheap one-hot multiplication.`, `النتيجة نفسها بضرب Eᵀ في متجه one-hot؛ البحث ضرب مختصر.`]], cap: [`Slide 16's lookup by hand.`, `البحث اليدوي في الشريحة 16.`] },
  analogy: [`Like a phone's contact list: the ID is the position in the list, and the row is the contact's details. Position 12 isn't "twice" position 6; it just points somewhere else.`, `مثل قائمة جهات الاتصال: الرقم موضع في القائمة والصف تفاصيل جهة الاتصال، والموضع 12 ليس ضعف 6.`],
  check: [`E has 1,000 rows and 20 columns. How many stored values, and when are they all trainable?`, `E بحجم 1000 × 20. كم قيمة مخزنة ومتى تكون كلها قابلة للتدريب؟`, [`1,020; always`, `20,000; only if E is not frozen`, `1,000; never`, `20; always`], 1, `1,000 × 20 = 20,000 (slide 62); frozen embeddings stay fixed.`, `20,000، والتضمينات المجمدة لا تتغير.`],
  remember: [`Embedding layer = trainable table E (V × d); token ID selects a row; IDs are categorical, not quantities.`, `جدول E يختار الرقم صفًّا منه، والأرقام فئوية.`]
};

LESSONS.c6s8 = {
  big: [`We have one vector per context word, but the network wants <b>one fixed-size input</b>. Two ways to combine them: <b>average</b> them (mean pooling) or <b>glue them end to end</b> (concatenation). Only gluing remembers the order.`, `لدينا متجه لكل كلمة سياق، والشبكة تريد <b>مدخلًا واحدًا ثابت الحجم</b>. طريقتان: <b>المتوسط</b> أو <b>الضم</b>، والضم وحده يحفظ الترتيب.`],
  links: ['c6s7'],
  think: [`e_I = [1, 0] and e_like = [0, 1]. Does averaging them tell "I like" apart from "like I"?`, `e_I = [1, 0] وe_like = [0, 1]. هل يميز المتوسط "I like" من "like I"؟`, `No. Both give [0.5, 0.5]. Concatenation gives [1, 0, 0, 1] for "I like" and [0, 1, 1, 0] for "like I": different inputs.`, `لا، كلاهما [0.5, 0.5]. أما الضم فيعطي [1, 0, 0, 1] و[0, 1, 1, 0]: مدخلان مختلفان.`],
  confuse: { a: [`Mean pooling`, `[0.5, 0.5]: fixed size d, but <b>ignores order</b>.`, `حجم ثابت لكنه <b>يتجاهل الترتيب</b>.`], b: [`Concatenation`, `[1, 0, 0, 1]: size kd and <b>keeps each word's position</b>.`, `حجم kd و<b>يحفظ موضع كل كلمة</b>.`], why: [`The fixed-window language model uses concatenation, so x has kd values (here 4).`, `النموذج ذو النافذة الثابتة يستخدم الضم فيكون حجم x = kd.`] },
  remember: [`Context vector x joins the context embeddings. Mean pooling ignores order; concatenation [e_I; e_like] = [1, 0, 0, 1] keeps it.`, `المتوسط يتجاهل الترتيب والضم يحفظه.`]
};

LESSONS.c6s9 = {
  big: [`Predicting the next word is just <b>classification with a huge number of classes</b>: every vocabulary word is a class. And the training labels are free: any text tells us which word came next. That makes language modelling <b>self-supervised</b>.`, `التنبؤ بالكلمة التالية <b>تصنيف بعدد هائل من الفئات</b>: كل كلمة في المفردات فئة. والوسوم مجانية: أي نص يخبرنا بالكلمة التالية، فالنمذجة <b>ذاتية الإشراف</b>.`],
  links: ['c4s15', 'c3s2'],
  steps: [
    [`Sentiment: input a review → 2 classes. Topic: input a document → a few topics. Language modelling: input "I like" → <b>every word in the vocabulary</b>.`, `المشاعر فئتان، والمواضيع بضع فئات، والنمذجة اللغوية <b>كل كلمات المفردات</b>.`],
    [`So V sets the size of the output layer. N-grams estimated these probabilities by counting; a neural LM learns them with a classifier.`, `فيحدد V حجم طبقة المخرجات.`],
    [`Targets from the sentence "I like NLP": (&lt;BOS&gt;, &lt;BOS&gt;) → I; (&lt;BOS&gt;, I) → like; (I, like) → NLP; (like, NLP) → &lt;EOS&gt;.`, `الأهداف من الجملة: I ثم like ثم NLP ثم &lt;EOS&gt;.`],
    [`&lt;BOS&gt; starts the context, &lt;EOS&gt; can be a scored target, and padding is excluded from the loss.`, `&lt;BOS&gt; يبدأ السياق و&lt;EOS&gt; هدف، والحشو مستبعد.`]
  ],
  check: [`Why is next-token training called self-supervised?`, `لماذا يُسمى التدريب على الرمز التالي ذاتي الإشراف؟`, [`It needs no loss function`, `The text itself supplies the targets`, `Humans label each word`, `It uses no data`], 1, `Each next word in the text is the label.`, `كل كلمة تالية في النص هي الوسم.`],
  remember: [`LM = multiclass classification over V words; targets come from the text itself (self-supervised).`, `تصنيف متعدد على V كلمات بأهداف من النص.`]
};

LESSONS.c6s10 = {
  big: [`The fixed-window neural LM in one line: look up the embeddings of the previous k tokens, concatenate them into x, apply a hidden layer, and predict a probability for every vocabulary word. <b>h = ReLU(Wx + b_h), p = softmax(Uh + b_o).</b>`, `النموذج في سطر واحد: ابحث عن تضمينات آخر k رموز، واضممها في x، وطبّق طبقة مخفية، وتنبأ باحتمال لكل كلمة: <b>h = ReLU(Wx + b_h) وp = softmax(Uh + b_o).</b>`],
  links: ['c6s8', 'c6s5'],
  steps: [
    [`E is V × d (3 × 2): one row per word, shared by every context position.`, `E بحجم V × d ومشترك بين المواضع.`],
    [`x is kd × 1 (4 × 1): k = 2 context tokens, d = 2 each.`, `x بحجم kd × 1.`],
    [`W is H × kd (2 × 4) and b_h is H × 1: H = 2 hidden units.`, `W بحجم H × kd.`],
    [`U is V × H (3 × 2) and b_o is V × 1; logits z and probabilities p are V × 1 (3 × 1).`, `U بحجم V × H، وz وp بحجم V × 1.`],
    [`Check the shapes before any arithmetic: if they don't fit, the formula can't be applied.`, `تحقق من الأبعاد قبل الحساب.`]
  ],
  check: [`With V = 3, H = 2, what is the shape of U?`, `مع V = 3 وH = 2، ما حجم U؟`, [`2 × 3`, `3 × 2`, `4 × 2`, `2 × 4`], 1, `U maps the H hidden values to V logits: V × H.`, `U تحوّل H قيم إلى V نتائج: V × H.`],
  remember: [`h = ReLU(Wx + b_h), p = softmax(Uh + b_o). Shapes: E V×d, x kd×1, W H×kd, U V×H, z/p V×1.`, `الصيغتان والأبعاد.`]
};

LESSONS.c6s11 = {
  big: [`Now run the model by hand on slide 23's numbers and predict what follows "I like". Every number is small enough to compute in your head, so try each step before revealing it.`, `لنشغّل النموذج يدويًّا بأرقام الشريحة 23 ونتنبأ بما بعد "I like". كل الأرقام صغيرة فحاول كل خطوة قبل كشفها.`],
  links: ['c6s10'],
  action: { steps: [[`<b>Given:</b> x = [1, 0, 0, 1]ᵀ, W = [[1, 0, 0, 1], [0, 1, 1, 0]], b_h = [−1, 1]ᵀ, U = [[0, 0], [1, 0], [1, 1]], b_o = 0. Vocabulary [I, like, NLP]; target NLP.`, `<b>المعطيات</b> كما في الشريحة 23.`], [`<b>Step 1:</b> row 1 of W · x = 1 + 0 + 0 + 1 = 2, plus −1 → 1. Row 2 = 0 + 0 + 0 + 0 = 0, plus 1 → 1. ReLU keeps both: <b>h = [1, 1]</b>.`, `<b>الخطوة 1:</b> h = [1, 1].`], [`<b>Step 2:</b> z = Uh: [0·1 + 0·1, 1·1 + 0·1, 1·1 + 1·1] = <b>[0, 1, 2]</b>. Logits can be any numbers; they need not sum to 1.`, `<b>الخطوة 2:</b> z = [0, 1, 2].`], [`<b>Step 3:</b> e⁰ = 1, e¹ = 2.7183, e² = 7.3891, total 11.1073 → <b>p ≈ [0.0900, 0.2447, 0.6652]</b>. Prediction: <b>NLP</b>.`, `<b>الخطوة 3:</b> p ≈ [0.0900, 0.2447, 0.6652] والتنبؤ NLP.`]], cap: [`Slides 23–26. Step 4 (the loss) comes after cross-entropy is introduced.`, `الشرائح 23–26، والخطوة 4 بعد تعريف الخسارة.`] },
  check: [`What is the predicted token, and its probability?`, `ما الرمز المتوقع واحتماله؟`, [`I, 0.0900`, `like, 0.2447`, `NLP, 0.6652`, `NLP, 2`], 2, `NLP has the largest logit (2), so the largest softmax probability.`, `NLP لها أكبر logit فأكبر احتمال.`],
  remember: [`h = [1, 1] → z = [0, 1, 2] → p ≈ [0.0900, 0.2447, 0.6652] → predict NLP.`, `h ← z ← p ← NLP.`]
};

LESSONS.c6s12 = {
  big: [`What do neural LMs add over n-grams? If training saw "the cat gets fed" and the test asks about "the dog gets ___", an n-gram has never seen this context. A neural model maps <i>cat</i> and <i>dog</i> to related embeddings, which give related hidden representations, so it can still predict "fed". Similarity helps, though it doesn't guarantee the right answer.`, `ماذا تضيف النماذج العصبية على n-grams؟ إذا رأى التدريب "the cat gets fed" وجاء في الاختبار "the dog gets ___"، فالـ n-gram لم ير هذا السياق، أما النموذج العصبي فيعطي cat وdog تضمينات مترابطة فيتنبأ بـ fed غالبًا، مع أن التشابه لا يضمن الصحة.`],
  links: ['c3s15'],
  remember: [`N-grams handle unseen contexts with smoothing/backoff; neural LMs also share learned representations (cat ≈ dog).`, `n-grams تستخدم التنعيم، والعصبية تشارك تمثيلات متعلَّمة.`]
};

LESSONS.c6s13 = {
  big: [`How wrong was the prediction? <b>Cross-entropy loss</b> looks only at the probability the model gave the <b>correct</b> word and takes its negative log: L = −ln p(true word). Confident and right → loss near 0. Confident and wrong → a huge loss.`, `كم كان التنبؤ خاطئًا؟ <b>خسارة الإنتروبيا المتقاطعة</b> تنظر فقط إلى احتمال الكلمة <b>الصحيحة</b> وتأخذ سالب لوغاريتمه: L = −ln p. واثق ومصيب ← قرب 0، وواثق ومخطئ ← خسارة كبيرة.`],
  links: ['c4s14', 'c6s11'],
  steps: [
    [`y is one-hot (1 at the true word), so −Σ yᵢ ln pᵢ keeps only one term: <b>−ln p(true)</b>.`, `y أحادي الساخن فيبقى حد واحد: <b>−ln p(الصحيح)</b>.`],
    [`p = 1 → 0; 0.9 → 0.105; 0.6 → 0.511; 0.3 → 1.204; 0.05 → 2.996. It grows without limit as p → 0.`, `القيم: 0 و0.105 و0.511 و1.204 و2.996، وتكبر بلا حد كلما اقتربت p من 0.`],
    [`<b>Step 4 of the worked model:</b> the target is NLP with p = 0.6652, so L = −ln 0.6652 ≈ <b>0.4076 nats</b>. If the target were I (p = 0.0900), L ≈ 2.4076.`, `<b>الخطوة 4:</b> الخسارة ≈ 0.4076، ولو كان الهدف I لكانت ≈ 2.4076.`],
    [`With ln the unit is nats; with log₂, bits. <b>Maximising likelihood = minimising this loss.</b>`, `بـ ln الوحدة نات وبـ log₂ بت، و<b>تعظيم الاحتمالية = تقليل الخسارة</b>.`]
  ],
  analogy: [`Like a weather forecaster: saying "90% rain" on a rainy day costs little; saying "5% rain" on a rainy day costs a lot. The more confident the wrong forecast, the bigger the penalty.`, `مثل متنبئ الطقس: قول "90% مطر" في يوم ممطر يكلّف قليلًا، وقول "5%" يكلّف كثيرًا. كلما زادت ثقة التوقع الخاطئ زادت العقوبة.`],
  check: [`Which predicted probability for the true token gives the largest loss?`, `أي احتمال للرمز الصحيح يعطي أكبر خسارة؟`, [`0.9`, `0.6`, `0.3`, `0.05`], 3, `−ln 0.05 ≈ 2.996: confident and wrong.`, `−ln 0.05 ≈ 2.996.`],
  remember: [`L = −ln p(true token); 0 at p = 1, huge as p → 0; worked loss 0.4076 nats.`, `الخسارة = −ln احتمال الصحيح، والمثال 0.4076.`]
};

LESSONS.c6s14 = {
  big: [`Training repeats four moves: <b>forward pass</b> (make a prediction), <b>loss</b> (score it), <b>backpropagation</b> (work out how much each weight is to blame, using the chain rule), and an <b>optimiser step</b> (nudge every weight against its gradient).`, `التدريب يكرر أربع حركات: <b>تمرير أمامي</b>، و<b>خسارة</b>، و<b>انتشار عكسي</b> (حساب مسؤولية كل وزن بقاعدة السلسلة)، و<b>خطوة تحسين</b> (تعديل كل وزن عكس تدرجه).`],
  links: ['c4s14', 'c6s13'],
  steps: [
    [`<b>Gradient descent:</b> w ← w − η · dL/dw. Move each weight opposite to its gradient, scaled by the learning rate η.`, `<b>الانحدار التدريجي:</b> w ← w − η · dL/dw.`],
    [`<b>Chain rule:</b> a network is functions inside functions, so for one sigmoid unit dL/dwᵢ = (dL/da)(da/dz)(dz/dwᵢ). For logistic regression: [σ(w·x + b) − y] xⱼ.`, `<b>قاعدة السلسلة:</b> الشبكة دوال داخل دوال.`],
    [`<b>Backpropagation</b> applies the chain rule backwards from the output loss to get the gradient of every weight in every layer (Rumelhart, Hinton and Williams, 1986).`, `<b>الانتشار العكسي</b> يطبق قاعدة السلسلة للخلف من الخسارة لكل وزن.`],
    [`<b>Softmax + cross-entropy:</b> the logit gradient is simply p − y = [0.0900, 0.2447, −0.3348].`, `<b>softmax + الخسارة:</b> تدرج logit = p − y.`],
    [`<b>One update</b> (output bias only, η = 0.1): b_o = [0,0,0] − 0.1 × [0.0900, 0.2447, −0.3348] ≈ [−0.0090, −0.0245, <b>0.0335</b>]. The correct word's bias rises; the others fall.`, `<b>تحديث واحد:</b> انحياز الكلمة الصحيحة يرتفع 0.0335 والباقي ينخفض.`]
  ],
  analogy: [`Walking down a foggy hill: you can't see the valley, but you can feel which way the ground slopes under your feet (the gradient) and take a small step downhill (learning rate), again and again.`, `مثل النزول من تل في الضباب: لا ترى الوادي لكنك تشعر بميل الأرض (التدرج) وتخطو خطوة صغيرة للأسفل (معدل التعلم) مرة بعد مرة.`],
  check: [`For softmax with one-hot cross-entropy, the gradient with respect to the logits is:`, `مع softmax والإنتروبيا المتقاطعة، تدرج logits هو:`, [`y − p`, `p − y`, `−ln p`, `p × y`], 1, `Slide 34: predicted probability minus target.`, `الشريحة 34: الاحتمال المتوقع − الهدف.`],
  remember: [`Forward → loss → backprop (chain rule) → w ← w − η∇L. Logit gradient = p − y.`, `أمامي ← خسارة ← انتشار عكسي ← تحديث، وتدرج logit = p − y.`],
  teach: [`Explain the four stages of training a neural language model.`, `اشرح مراحل تدريب نموذج اللغة العصبي الأربع.`, `First, the forward pass looks up the embeddings, forms x, computes h and the logits, and turns them into probabilities. Second, the cross-entropy loss compares the prediction with the true next token. Third, backpropagation applies the chain rule backwards through the network to find how the loss changes with each unfrozen parameter. Fourth, an optimiser step uses those gradients to update E, W, U and the biases with w ← w − η∇L, and the process repeats over the training text. For softmax with cross-entropy, the logit gradient is p − y.`, `التمرير الأمامي يحسب الاحتمالات، والخسارة تقارنها بالرمز الصحيح، والانتشار العكسي يحسب التدرجات بقاعدة السلسلة، وخطوة التحسين تحدّث المعاملات، ثم التكرار.`]
};

LESSONS.c6s15 = {
  big: [`The embedding table can be trained three ways: <b>learn it from scratch</b> (random start, needs more data), <b>start from pretrained vectors and fine-tune</b> (e.g. Word2Vec/GloVe), or <b>keep pretrained vectors frozen</b> (fewer trainable parameters).`, `يمكن تدريب جدول التضمين بثلاث طرق: <b>من الصفر</b> (يحتاج بيانات أكثر)، أو <b>البدء بمتجهات مدربة مسبقًا وضبطها</b>، أو <b>تجميدها</b> (معاملات أقل).`],
  links: ['c5s18'],
  remember: [`Random init / pretrained + fine-tuned / pretrained + frozen. The same ID always selects the same vector; context comes later (RNN/LSTM).`, `ثلاث طرق، والرقم يختار المتجه نفسه دائمًا.`]
};

LESSONS.c6s16 = {
  big: [`To score a whole sequence, average the token losses (<b>mean cross-entropy H</b>) and exponentiate: <b>perplexity = exp(H)</b>. It is the same perplexity as Week 3, reached by a different route, and it equals 1 divided by the <i>geometric</i> mean of the true-token probabilities.`, `لتقييم سلسلة كاملة نأخذ متوسط الخسائر (<b>H</b>) ثم الأس: <b>الحيرة = exp(H)</b>. إنها حيرة الأسبوع 3 نفسها بطريق آخر، وتساوي 1 مقسومًا على المتوسط <i>الهندسي</i> لاحتمالات الرموز الصحيحة.`],
  links: ['c3s13', 'c6s13'],
  action: { w: 'ppl', cfg: { p: '0.5, 0.25, 0.125', presets: ['0.5, 0.25, 0.125', '0.8, 0.2', '0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125'] }, cap: [`Slide 37's three probabilities give perplexity 4. Then try the practice pair 0.8, 0.2 (perplexity 2.5, not 2) and a uniform guess over 8 tokens (perplexity 8).`, `الاحتمالات الثلاثة تعطي حيرة 4، ثم جرّب 0.8 و0.2 (2.5 وليس 2) والتخمين المنتظم على 8 رموز (8).`] },
  steps: [
    [`<b>H = (1/N) Σ −ln pₜ</b>, where pₜ is the probability of the true token at position t.`, `<b>H = متوسط −ln pₜ</b>.`],
    [`<b>PPL = exp(H) = (Π pₜ)^(−1/N).</b> With log₂ losses (bits), use 2ᴴ: match the base.`, `<b>PPL = exp(H)</b>، ومع log₂ نستخدم 2ᴴ.`],
    [`<b>Example:</b> 0.5, 0.25, 0.125 → losses 0.6931, 1.3863, 2.0794 → H = 1.3863 → PPL = <b>4</b>.`, `<b>مثال:</b> H = 1.3863 وPPL = 4.`],
    [`<b>Trap:</b> for 0.8 and 0.2 the arithmetic mean is 0.5, giving 2. The correct answer is exp(0.9163) = <b>2.5</b>. Average the losses first, then exponentiate.`, `<b>فخ:</b> المتوسط الحسابي يعطي 2، والصحيح 2.5.`],
    [`<b>Reading it:</b> lower is better; PPL ≥ 1; a uniform guess over V tokens gives PPL = V. Compare only with the same data, tokenisation and scoring. Corpus PPL = total loss ÷ total tokens, never an average of sentence perplexities. Low PPL doesn't prove factual accuracy.`, `<b>القراءة:</b> الأقل أفضل، والحد الأدنى 1، والمنتظم يعطي V، وحيرة المدونة من مجموع الخسائر.`]
  ],
  check: [`Two tokens with true-token probabilities 0.8 and 0.2. Perplexity?`, `رمزان باحتمالي 0.8 و0.2. الحيرة؟`, [`2`, `2.5`, `4`, `0.5`], 1, `H = (0.2231 + 1.6094)/2 = 0.9163; exp(0.9163) = 2.5.`, `exp(0.9163) = 2.5.`],
  remember: [`H = mean −ln pₜ; PPL = exp(H). 0.5/0.25/0.125 → 4; 0.8/0.2 → 2.5 (not 2). Uniform over V → V.`, `الحيرة = exp(متوسط الخسارة): 4 و2.5.`],
  teach: [`Explain why perplexity for probabilities 0.8 and 0.2 is 2.5 and not 2.`, `اشرح لماذا تكون الحيرة 2.5 وليس 2 للاحتمالين 0.8 و0.2.`, `Perplexity is the exponential of the mean cross-entropy: PPL = exp((1/N) Σ −ln pₜ). Here the losses are 0.2231 and 1.6094, so H = 0.9163 and PPL = e^0.9163 = 2.5. Equivalently, it is 1 divided by the geometric mean of the probabilities: √(0.8 × 0.2) = 0.4 and 1/0.4 = 2.5. Using the arithmetic mean (0.5) and taking 1/0.5 = 2 is wrong, because perplexity is defined through the product of probabilities.`, `الحيرة = exp(متوسط الخسائر) = e^0.9163 = 2.5، أو 1 ÷ المتوسط الهندسي (0.4). أما المتوسط الحسابي 0.5 فيعطي 2 خطأً لأن الحيرة معرّفة بحاصل الضرب.`]
};

LESSONS.c6s16b = {
  big: [`A fixed-window model only ever sees its last k tokens. Anything earlier simply cannot influence the prediction. Making the window wider is possible, but every extra token makes x longer and the weight matrix W bigger, and the window is still finite.`, `النموذج ذو النافذة الثابتة يرى آخر k رموز فقط، وما قبلها لا يؤثر. يمكن توسيع النافذة، لكن كل رمز إضافي يطيل x ويكبّر W، وتبقى النافذة محدودة.`],
  links: ['c3s5', 'c6s10'],
  think: [`"The flights the airline was cancelling were full." With a 2-word window, what does the model see when it predicts "were"?`, `مع نافذة من كلمتين، ماذا يرى النموذج عند التنبؤ بـ "were"؟`, `Only "was cancelling". The plural subject "flights", which explains "were", is outside the window, and the nearby singular "airline" could even mislead it.`, `فقط "was cancelling"، والفاعل الجمع flights خارج النافذة، وقد تضلله airline المفردة القريبة.`],
  remember: [`Fixed window = only the last k tokens; widening it grows x and W. Recurrence instead carries a state forward.`, `النافذة الثابتة آخر k رموز فقط، والتكرار يحمل حالة للأمام.`]
};

LESSONS.c6s17 = {
  big: [`(Additional depth.) A <b>recurrent neural network</b> reads one token at a time and keeps a running summary, the <b>hidden state hₜ</b>, computed from the current word and the previous state. Earlier words can influence later predictions through this state, using the same weights at every step.`, `(تعمّق إضافي) <b>الشبكة التكرارية</b> تقرأ رمزًا تلو الآخر وتحتفظ بملخص مستمر هو <b>الحالة المخفية hₜ</b> من الكلمة الحالية والحالة السابقة، بالأوزان نفسها في كل خطوة.`],
  links: ['c6s16b'],
  action: { steps: [[`hₜ = tanh(Wₓ eₜ + Wₕ hₜ₋₁ + b_h), with e₁ = 0.5, e₂ = 1.0, Wₓ = 0.8, Wₕ = 0.5, b_h = 0.1, h₀ = 0.`, `الصيغة والقيم المعطاة.`], [`h₁ = tanh(0.8 × 0.5 + 0.5 × 0 + 0.1) = tanh(0.5) ≈ <b>0.4621</b>.`, `h₁ ≈ 0.4621.`], [`h₂ = tanh(0.8 × 1 + 0.5 × 0.4621 + 0.1) ≈ <b>0.8114</b>. The term 0.5 × 0.4621 = 0.2311 is the memory of the first token.`, `h₂ ≈ 0.8114، والحد 0.2311 ذاكرة الرمز الأول.`], [`Without that memory (h₁ = 0) we would get tanh(0.9) ≈ 0.7163. Training unrolls the network over the sequence: <b>backpropagation through time</b>.`, `دون الذاكرة نحصل على 0.7163، والتدريب انتشار عكسي عبر الزمن.`]], cap: [`Slide 56's two-token example.`, `مثال الشريحة 56.`] },
  remember: [`RNN: hₜ = tanh(Wₓeₜ + Wₕhₜ₋₁ + b); same weights every step; fixed-size state; trained with BPTT.`, `حالة RNN بالأوزان نفسها، والتدريب BPTT.`]
};

LESSONS.c6s18 = {
  big: [`(Additional depth.) Simple RNNs struggle to learn long links, because learning signals passed through many steps can shrink or grow. An <b>LSTM</b> adds a separate memory, the <b>cell state cₜ</b>, and three <b>gates</b> (numbers between 0 and 1) that decide what to forget, what to write and what to show.`, `(تعمّق إضافي) الشبكات التكرارية البسيطة تتعثر مع الروابط البعيدة لأن الإشارات تتقلص أو تتضخم. أما <b>LSTM</b> فتضيف ذاكرة منفصلة هي <b>حالة الخلية cₜ</b> وثلاث <b>بوابات</b> بين 0 و1 تقرر ما يُنسى وما يُكتب وما يُظهر.`],
  links: ['c6s17'],
  action: { w: 'lstm', cfg: { c: 0.4, f: 0.549834, i: 0.731059, g: 0.664037, o: 0.622459 }, cap: [`Slide 59's values give cₜ ≈ 0.7054 and hₜ ≈ 0.3783. Move the gates to see what each one controls.`, `قيم الشريحة 59 تعطي cₜ ≈ 0.7054 وhₜ ≈ 0.3783. حرّك البوابات لترى أثرها.`] },
  steps: [
    [`<b>Forget gate f:</b> scales the old memory: near 1 keeps it, near 0 erases it.`, `<b>بوابة النسيان:</b> تبقي الذاكرة القديمة أو تمحوها.`],
    [`<b>Input gate i</b> and <b>candidate g</b> (tanh, can be negative): together decide what new content is written.`, `<b>بوابة الإدخال</b> و<b>المرشح g</b> يقرران المحتوى الجديد.`],
    [`<b>cₜ = f ⊙ cₜ₋₁ + i ⊙ g.</b> ⊙ means element-by-element multiplication.`, `<b>cₜ = f ⊙ cₜ₋₁ + i ⊙ g.</b>`],
    [`<b>Output gate o:</b> hₜ = o ⊙ tanh(cₜ). With o near 0 the memory stays in the cell but is hidden from hₜ.`, `<b>بوابة المخرج:</b> hₜ = o ⊙ tanh(cₜ).`],
    [`LSTMs help with long dependencies ("flights … were") but don't guarantee perfect memory, and they cost more parameters and computation per step.`, `تساعد مع الاعتماديات البعيدة دون ضمان ذاكرة كاملة وبتكلفة أكبر.`]
  ],
  analogy: [`A notebook (cell state) with three rules: an eraser (forget gate), a pen (input gate writing the candidate), and a decision about which page to show your friend right now (output gate).`, `دفتر (حالة الخلية) بثلاث أدوات: ممحاة (بوابة النسيان)، وقلم (بوابة الإدخال)، وقرار أي صفحة تُريها لصديقك الآن (بوابة المخرج).`],
  check: [`f = 0.9, c_old = 0.5, i = 0.2, g = −0.4. New cell state?`, `احسب الحالة الجديدة للخلية.`, [`0.37`, `0.53`, `0.45`, `−0.08`], 0, `0.9 × 0.5 + 0.2 × (−0.4) = 0.45 − 0.08 = 0.37 (slide 62).`, `0.45 − 0.08 = 0.37.`],
  remember: [`cₜ = f⊙cₜ₋₁ + i⊙g; hₜ = o⊙tanh(cₜ). Gates are sigmoids (0–1); the candidate uses tanh.`, `معادلتا LSTM، والبوابات سينية والمرشح tanh.`]
};

LESSONS.c6s19 = {
  big: [`All the language models so far keep the same goal, predicting the next token, and differ in <b>how they represent the available context</b>: counts of a short history, concatenated embeddings of a fixed window, a recurrent state, or a gated memory.`, `كل النماذج حتى الآن لها الهدف نفسه، وتختلف في <b>كيفية تمثيل السياق</b>: أعداد تاريخ قصير، أو تضمينات نافذة ثابتة، أو حالة تكرارية، أو ذاكرة ببوابات.`],
  links: ['c3s10', 'c6s16b', 'c6s17', 'c6s18'],
  remember: [`n-gram: counts (needs smoothing) → fixed window: shared embeddings, nothing outside k → RNN: state, long links hard → LSTM: gated memory, more cost.`, `n-gram ← نافذة ثابتة ← RNN ← LSTM.`]
};
