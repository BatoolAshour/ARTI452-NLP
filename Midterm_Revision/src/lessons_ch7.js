/* Guided lessons – Week 7: Large Language Models */
MISSIONS.ch7 = [
  { t: [`What a large language model is`, `ما هو النموذج اللغوي الكبير`], goal: [`Define LMs and LLMs, list the training stages and the five questions of the lecture.`, `عرّف النموذج اللغوي والكبير واذكر مراحل التدريب والأسئلة الخمسة.`], secs: ['1', '2'] },
  { t: [`Architectures: who can see what`, `البنى: من يرى ماذا`], goal: [`Explain causal vs bidirectional attention and compare encoder, decoder and encoder-decoder models.`, `اشرح الانتباه السببي والثنائي وقارن العائلات الثلاث.`], secs: ['3', '4'] },
  { t: [`Training: data and objectives`, `التدريب: البيانات والأهداف`], goal: [`Describe pretraining data and compute causal and MLM losses.`, `صف بيانات التدريب المسبق واحسب الخسارة السببية وخسارة MLM.`], secs: ['5', '6', '7', '8', '9'] },
  { t: [`Using the model: tasks and decoding`, `استخدام النموذج: المهام وفك الترميز`], goal: [`Match tasks to model families and compare greedy decoding with beam search.`, `طابق المهام مع العائلات وقارن الجشع بالبحث الحزمي.`], secs: ['10', '11', '12'] },
  { t: [`Controlling generation`, `التحكم في التوليد`], goal: [`Apply sampling, temperature, top-k and top-p by hand.`, `طبّق المعاينة والحرارة وtop-k وtop-p يدويًّا.`], secs: ['13', '14'] },
  { t: [`Putting it all together`, `تجميع الصورة`], goal: [`Design a model and decoding setup for a task and justify it.`, `صمّم نموذجًا وطريقة فك ترميز لمهمة وبرّرها.`], secs: ['15', '16'] }
];

LESSONS.c7s1 = {
  big: [`An LLM is the same idea as Week 3's language model, predicting the next token, but done by a <b>very large neural network trained on very large text collections</b>. GPT-3, for example, has 96 layers and 175 billion parameters.`, `النموذج اللغوي الكبير هو فكرة الأسبوع 3 نفسها، التنبؤ بالرمز التالي، لكن بـ<b>شبكة عصبية كبيرة جدًّا مدربة على نصوص ضخمة جدًّا</b>. GPT-3 مثلًا فيه 96 طبقة و175 مليار معامل.`],
  links: ['c3s2', 'c6s9'],
  steps: [
    [`<b>Language model:</b> given a prefix, assign a probability to every possible next token. After "So long and thanks for", <i>all</i> and <i>the</i> are likely; <i>of</i> is not.`, `<b>النموذج اللغوي:</b> يُسند احتمالًا لكل رمز تالٍ بعد البادئة.`],
    [`<b>Training stages:</b> pretraining (this week) → instruction tuning → preference alignment → RL for reasoning (Week 13).`, `<b>مراحل التدريب:</b> تدريب مسبق ← ضبط التعليمات ← مواءمة التفضيلات ← تعلم معزز للاستدلال.`],
    [`<b>Masked language models</b> (encoders such as BERT) predict a <i>hidden</i> token using both sides, not the next token.`, `<b>النماذج المقنّعة</b> تتنبأ برمز مخفي من الجانبين.`]
  ],
  check: [`Which is the first training stage of an LLM?`, `ما أول مرحلة في تدريب النموذج الكبير؟`, [`Instruction tuning`, `Preference alignment`, `Pretraining`, `RL for reasoning`], 2, `Pretraining → instruction tuning → preference alignment → RL for reasoning.`, `التدريب المسبق أولًا.`],
  remember: [`LLM = large network trained on huge text to predict the next token (GPT-3: 96 layers, 175B). Stages: pretraining → instruction tuning → preference alignment → RL.`, `النموذج الكبير ومراحله الأربع.`]
};

LESSONS.c7s2 = {
  big: [`The lecture is organised around <b>five questions</b>: 1) Architecture: what can each position see? 2) Data: what text does it learn from? 3) Objective: what does it predict in training? 4) Task: do we need a label, a tag per token, or new text? 5) Generation: how do we choose the next token?`, `تُبنى المحاضرة حول <b>خمسة أسئلة</b>: البنية، البيانات، الهدف، المهمة، والتوليد.`],
  links: ['c6s1'],
  steps: [
    [`From Week 6, the <b>probability and loss maths stay the same</b>: logits, softmax, −log of the target probability.`, `من الأسبوع 6 <b>تبقى رياضيات الاحتمال والخسارة كما هي</b>.`],
    [`What changes is the <b>context</b>: tokens plus positional information, and <b>attention</b> over the permitted positions instead of a fixed window or a recurrent state.`, `ما يتغير هو <b>السياق</b>: رموز مع معلومات الموضع، و<b>انتباه</b> على المواضع المسموحة.`],
    [`Decoding settings such as top-p change token selection at inference; they <b>do not retrain</b> the model.`, `إعدادات فك الترميز تغيّر الاختيار عند الاستدلال و<b>لا تعيد التدريب</b>.`]
  ],
  remember: [`Five questions: architecture, data, objective, task, generation. Same maths as Week 6; new context: attention.`, `الأسئلة الخمسة، ونفس الرياضيات مع سياق جديد هو الانتباه.`]
};

LESSONS.c7s3 = {
  big: [`In a Transformer, each position builds its new representation by <b>attending</b> to the positions it is allowed to read. The whole difference between model families comes down to one rule: <b>which positions can each token see?</b>`, `في المحوّل يبني كل موضع تمثيله الجديد <b>بالانتباه</b> إلى المواضع المسموح له بقراءتها، والفرق كله بين العائلات يعود إلى قاعدة واحدة: <b>أي المواضع يراها كل رمز؟</b>`],
  action: { w: 'attention', cfg: { tokens: ['The', 'lecture', 'starts', 'at', '11:00'] }, cap: [`Click a row to choose a query position, then switch between causal and bidirectional. Position 3 reads 1–3 (causal) or 1–5 (bidirectional), as on slide 8.`, `انقر صفًّا لاختيار موضع ثم بدّل بين السببي والثنائي.`] },
  steps: [
    [`<b>Causal</b> (decoder): position t can read positions 1…t only. The visibility table is lower-triangular.`, `<b>السببي:</b> الموضع t يقرأ 1…t فقط.`],
    [`<b>Bidirectional</b> (encoder): every position reads every position.`, `<b>الثنائي:</b> كل موضع يقرأ الكل.`],
    [`Why is the diagonal allowed in causal attention? Because position t is trained to predict token <b>t + 1</b>, so seeing itself is fine; seeing t + 1 would be cheating.`, `لماذا القطر مسموح؟ لأن الموضع t يتنبأ بالرمز <b>t + 1</b>.`],
    [`Implementation: blocked scores are set to <b>−∞ before softmax</b>, so they get probability 0. Padding may need a separate mask. (How attention weights are computed with query, key and value is Week 11.)`, `الدرجات المحجوبة تُجعل <b>−∞ قبل softmax</b>.`]
  ],
  analogy: [`Causal attention is like writing an exam essay line by line: you can reread what you've written but not lines you haven't written yet. Bidirectional attention is like proofreading a finished essay: you can look anywhere.`, `السببي مثل كتابة مقال سطرًا سطرًا: تعيد قراءة ما كتبت لا ما لم تكتب، والثنائي مثل مراجعة مقال مكتمل.`],
  check: [`In causal self-attention, which positions can position 3 read?`, `في الانتباه السببي، أي المواضع يقرؤها الموضع 3؟`, [`3 only`, `1, 2, 3`, `1 to 5`, `3, 4, 5`], 1, `Positions up to and including itself.`, `حتى نفسه.`],
  remember: [`Causal: t reads 1…t (lower triangle, −∞ mask). Bidirectional: all positions.`, `السببي: 1…t، والثنائي: الكل.`],
  teach: [`Explain why an encoder may read right context while a causal decoder must block future targets (exit question 1).`, `اشرح لماذا يقرأ المرمِّز السياق الأيمن بينما يحجب المفكِّك المستقبل.`, `A causal decoder is trained to predict the next token, so if position t could read position t + 1, the answer would already be visible and the model would learn nothing useful; also, during generation future tokens do not exist yet. So the causal mask blocks them with −∞ before softmax. An encoder is given the whole input (to classify or tag it) and its masked-LM objective hides the answer by masking, so reading both sides simply gives each token a better representation.`, `المفكِّك يتنبأ بالرمز التالي، فلو رأى t + 1 لكانت الإجابة ظاهرة، والرموز المستقبلية غير موجودة أثناء التوليد. أما المرمِّز فيأخذ المدخل كاملًا ويخفي الإجابة بالإقناع، فقراءة الجانبين تحسّن التمثيل.`]
};

LESSONS.c7s4 = {
  big: [`Three Transformer families share the same building blocks but route information differently. <b>Encoder-only</b> reads everything and outputs a vector per token. <b>Decoder-only</b> reads left-to-right and continues text. <b>Encoder-decoder</b> reads a full source, then writes a new target sequence.`, `ثلاث عائلات تشترك في المكونات وتختلف في تدفق المعلومات: <b>المرمِّز فقط</b> يقرأ الكل ويخرج متجهًا لكل رمز، و<b>المفكِّك فقط</b> يقرأ من اليسار ويكمل النص، و<b>المرمِّز-المفكِّك</b> يقرأ المصدر كاملًا ثم يكتب هدفًا جديدًا.`],
  links: ['c7s3'],
  steps: [
    [`<b>Encoder-only (BERT, RoBERTa):</b> bidirectional; one contextual vector per token; a head maps vectors to labels. Use: sequence classification, token labelling, extractive QA. Standard BERT has no left-to-right generation loop.`, `<b>المرمِّز فقط:</b> ثنائي ومتجه لكل رمز، للتصنيف والوسم.`],
    [`<b>Decoder-only (GPT-style):</b> causal; a vocabulary distribution at every position; generation extends the prefix: &lt;BOS&gt; → I → like → NLP → &lt;EOS&gt;.`, `<b>المفكِّك فقط:</b> سببي ويكمل البادئة.`],
    [`<b>Encoder-decoder (T5, BART):</b> the encoder reads the full source; decoder self-attention reads earlier target tokens; <b>cross-attention</b> lets every decoder position read the encoder's outputs. Use: translation, summarization ("The lecture moved from 10:00 to 11:00." → "Lecture starts at 11:00.").`, `<b>المرمِّز-المفكِّك:</b> المرمِّز يقرأ المصدر، والانتباه المتقاطع يسمح للمفكِّك بقراءة مخرجاته، للترجمة والتلخيص.`],
    [`These are tendencies, not rules: fine-tuning and prompting can adapt any family to several tasks.`, `هذه ميول لا قواعد.`]
  ],
  confuse: { a: [`Decoder self-attention`, `Reads <b>earlier target tokens</b> (what it has written so far).`, `يقرأ <b>رموز الهدف السابقة</b>.`], b: [`Cross-attention`, `Reads the <b>encoder outputs for the full source</b>.`, `يقرأ <b>مخرجات المرمِّز للمصدر كاملًا</b>.`], why: [`Both live in the decoder of an encoder-decoder model. Self-attention looks at its own output so far; cross-attention looks over at the source. Neither may see future target tokens.`, `كلاهما في المفكِّك: الذاتي ينظر لما كتبه، والمتقاطع ينظر للمصدر، ولا يرى أي منهما رموز الهدف المستقبلية.`] },
  check: [`Which family is a natural starting point for tagging every word in a complete sentence?`, `أي عائلة مناسبة لوسم كل كلمة في جملة كاملة؟`, [`Decoder-only`, `Encoder-only`, `Encoder-decoder`, `None`], 1, `Both directions help each token's representation, and no text needs to be generated.`, `الاتجاهان يفيدان تمثيل كل رمز ولا حاجة للتوليد.`],
  remember: [`Encoder-only (BERT): both sides → vectors → labels. Decoder-only (GPT): left → continuation. Encoder-decoder (T5, BART): full source + cross-attention → new sequence.`, `المرمِّز للوسوم، والمفكِّك للتكملة، والمرمِّز-المفكِّك للتوليد المشروط.`]
};

LESSONS.c7s5 = {
  big: [`A model can only learn from the evidence it sees, so <b>pretraining data</b> matters. It starts as huge web crawls plus curated text, goes through quality and safety filters, and is tokenised into sequences. Keep two ideas apart: <b>data decides what evidence the model sees; the objective decides what it predicts from that evidence.</b>`, `النموذج لا يتعلم إلا من الدليل الذي يراه، لذا <b>بيانات التدريب المسبق</b> مهمة: زحف ويب ونصوص منتقاة، ثم تصفية للجودة والأمان، ثم ترميز. وافصل بين فكرتين: <b>البيانات تحدد الدليل، والهدف يحدد ما يُتنبأ به.</b>`],
  steps: [
    [`<b>Sources:</b> Common Crawl snapshots, Wikipedia, books, code.`, `<b>المصادر:</b> Common Crawl وويكيبيديا والكتب والشيفرات.`],
    [`<b>Quality filtering:</b> remove duplicates, boilerplate and adult content.`, `<b>تصفية الجودة:</b> إزالة التكرار والنصوص المتكررة والمحتوى غير اللائق.`],
    [`<b>Safety filtering:</b> a classifier removes toxic text, but such classifiers can wrongly flag minority dialects.`, `<b>تصفية الأمان:</b> مصنف يزيل النص المسيء وقد يخطئ مع لهجات الأقليات.`],
    [`<b>Tokenisation:</b> cleaned text becomes token sequences for the objective. Example mix (LLaMA): Common Crawl 67%, C4 15%, GitHub/Wikipedia/Books 4.5% each, ArXiv 2.5%, StackExchange 2%.`, `<b>الترميز:</b> يتحول النص إلى سلاسل، ومزيج LLaMA مثال.`]
  ],
  check: [`What is the difference between pretraining data and the pretraining objective?`, `ما الفرق بين بيانات التدريب المسبق وهدفه؟`, [`They are the same thing`, `Data = the evidence seen; objective = what is predicted from it`, `Data is for fine-tuning only`, `The objective chooses the data sources`], 1, `This is exit question 2 on slide 46.`, `هذا سؤال الخروج 2.`],
  remember: [`Sources → quality filter → safety filter (dialect risk) → tokenise. Data = evidence; objective = prediction.`, `المصادر ← الجودة ← الأمان ← الترميز. البيانات دليل والهدف تنبؤ.`]
};

LESSONS.c7s6 = {
  big: [`Pretraining is <b>self-supervised</b>: the text itself provides the answers. There are three ways to turn raw text into a prediction task, one for each family.`, `التدريب المسبق <b>ذاتي الإشراف</b>: النص يوفر الإجابات، وهناك ثلاث طرق لتحويله إلى مهمة تنبؤ، واحدة لكل عائلة.`],
  steps: [
    [`<b>Causal LM</b> (decoder): input = a prefix; target = the next original token.`, `<b>السببي:</b> المدخل بادئة والهدف الرمز التالي.`],
    [`<b>Masked LM</b> (encoder): input = text with selected tokens manipulated; target = the original tokens at those positions.`, `<b>المقنّع:</b> المدخل نص فيه رموز معدلة والهدف الرموز الأصلية.`],
    [`<b>Denoising</b> (encoder-decoder): input = a corrupted source; target = the clean sequence or its missing spans.`, `<b>إزالة التشويش:</b> المدخل مصدر مشوّه والهدف النص النظيف أو المقاطع.`],
    [`"Self-supervised" means the targets come from the data; training still uses an explicit loss (cross-entropy).`, `الأهداف من البيانات مع خسارة صريحة.`]
  ],
  remember: [`Causal: prefix → next token. MLM: corrupted input → original selected tokens. Denoising: corrupted source → clean text/spans.`, `السببي والمقنّع وإزالة التشويش.`]
};

LESSONS.c7s7 = {
  big: [`For a causal model, the targets are simply the input <b>shifted by one</b>: the position that reads "like" must predict "NLP". During training the model is always fed the <b>correct</b> earlier tokens (teacher forcing), even if it would have guessed wrong.`, `في النموذج السببي الأهداف هي المدخل <b>مزاحًا بموضع</b>: الموضع الذي يقرأ like يتنبأ بـ NLP. وأثناء التدريب يُعطى النموذج الرموز السابقة <b>الصحيحة</b> دائمًا (teacher forcing).`],
  links: ['c6s9', 'c6s13'],
  steps: [
    [`Input &lt;BOS&gt; → target I; input I → like; input like → NLP; input NLP → &lt;EOS&gt;.`, `&lt;BOS&gt; ← I، I ← like، like ← NLP، NLP ← &lt;EOS&gt;.`],
    [`The causal mask blocks later positions; every non-padding target contributes a loss.`, `القناع يحجب اللاحق، وكل هدف غير حشو يساهم.`],
    [`<b>Teacher forcing:</b> training feeds the correct earlier tokens; generation feeds the model's own earlier choices.`, `<b>Teacher forcing:</b> التدريب بالرموز الصحيحة والتوليد باختيارات النموذج.`],
    [`<b>Loss by hand:</b> target probabilities 0.5, 0.8, 0.4, 0.9 → −ln: 0.6931, 0.2231, 0.9163, 0.1054 → mean ≈ <b>0.4845 nats</b>. "NLP" adds the most loss because it got the lowest probability.`, `<b>الخسارة:</b> المتوسط ≈ 0.4845، وNLP الأكبر.`]
  ],
  analogy: [`Teacher forcing is like practising a song with the recording playing: even if you hit a wrong note, the next bar starts from the correct one. On stage (generation) you have to continue from whatever you actually played.`, `مثل التدرب على أغنية مع التسجيل: حتى لو أخطأت تبدأ الجملة التالية من الصحيح، أما على المسرح (التوليد) فتكمل مما عزفته فعلًا.`],
  check: [`Causal LM on "&lt;BOS&gt; I like NLP": what is the target at the position whose input is "like"?`, `ما الهدف في الموضع الذي مدخله like؟`, [`I`, `like`, `NLP`, `&lt;EOS&gt;`], 2, `Slide 25: the position reading "like" predicts the next original token, NLP.`, `الشريحة 25: NLP.`],
  remember: [`Targets = input shifted by one; teacher forcing in training; mean loss example 0.4845 nats.`, `الأهداف مزاحة، وteacher forcing، والمثال 0.4845.`]
};

LESSONS.c7s8 = {
  big: [`An encoder sees the whole sentence, so asking it to predict "starts" in "The lecture starts at 11:00" would be pointless: the answer is right there. <b>Masked language modelling</b> hides it first: "The lecture [MASK] at 11:00", and the model must recover "starts" from the remaining context.`, `المرمِّز يرى الجملة كاملة، فطلب التنبؤ بـ starts منها عديم الفائدة لأن الإجابة ظاهرة. <b>النمذجة المقنّعة</b> تخفيها أولًا: "The lecture [MASK] at 11:00" فيستعيدها النموذج من السياق.`],
  links: ['c7s3'],
  action: { w: 'mlm', cfg: { tokens: ['So', 'long', 'and', 'thanks', 'for', 'all', 'the', 'fish'], sel: [1, 3, 6] }, cap: [`Slide 20's sentence with long, thanks and the selected. Click words to change the selection and watch the loss denominator.`, `جملة الشريحة 20 مع اختيار long وthanks وthe. غيّر الاختيار وراقب المقام.`] },
  steps: [
    [`Keep the original tokens as targets before corrupting the input.`, `احفظ الرموز الأصلية قبل التشويش.`],
    [`In the figure, two selected positions are masked (long, thanks) and one is replaced by a random token ("apricot" instead of "the").`, `موضعان مقنّعان وموضع مستبدل بـ apricot.`],
    [`<b>Only selected positions get a loss.</b> −ln 0.8 = 0.2231 (long), −ln 0.25 = 1.3863 (thanks), −ln 0.5 = 0.6931 (the) → mean = <b>0.7675</b>, dividing by <b>3</b>, not 8.`, `<b>الخسارة على المختار فقط:</b> 0.7675 والمقام 3 لا 8.`],
    [`Unselected tokens get no direct loss, but they still matter: they are the context the encoder reads from both sides.`, `غير المختارة بلا خسارة لكنها السياق.`]
  ],
  check: [`A 40-token sentence has exactly 6 selected MLM positions. The loss denominator is:`, `جملة من 40 رمزًا فيها 6 مواضع مختارة. المقام:`, [`40`, `34`, `6`, `1`], 2, `Average over the 6 selected targets (slide 25).`, `متوسط على 6 أهداف.`],
  remember: [`MLM: hide selected tokens ([MASK] or random), predict the originals, average loss over selected positions only (example 0.7675 ÷ 3).`, `MLM: الخسارة على المواضع المختارة فقط، والمثال 0.7675.`],
  teach: [`Explain which MLM targets receive a direct loss and why unselected tokens still matter (exit question 3).`, `اشرح أي أهداف MLM تتلقى خسارة ولماذا تبقى غير المختارة مهمة.`, `Only the selected positions, whether replaced by [MASK] or by a random token, receive a direct loss: the model must predict the original token there, and the loss is averaged over the number of selected positions (3 in the lecture example, giving 0.7675 nats). The unselected tokens have no loss of their own, but they still matter because they are the context the bidirectional encoder reads, from both sides, to make those predictions.`, `المواضع المختارة فقط تتلقى خسارة ويُحسب المتوسط عليها. وغير المختارة مهمة لأنها السياق الذي يقرؤه المرمِّز من الجانبين.`]
};

LESSONS.c7s9 = {
  big: [`Encoder-decoder models like T5 learn by <b>denoising</b>: cut spans out of a sentence, give the damaged version to the encoder, and train the decoder to write the missing spans back.`, `نماذج مثل T5 تتعلم <b>بإزالة التشويش</b>: نقطع مقاطع من الجملة ونعطي النسخة التالفة للمرمِّز وندرّب المفكِّك على كتابة المقاطع المفقودة.`],
  steps: [
    [`Original: "The lecture starts at 11:00 in room 1090."`, `الأصل: "The lecture starts at 11:00 in room 1090."`],
    [`Encoder input: "The lecture [missing span] in room [missing span]."`, `مدخل المرمِّز: مع مقطعين مفقودين.`],
    [`Decoder target: "starts at 11:00 | 1090". One marker can hide several tokens, so input and target lengths can differ. (Real T5 uses a distinct sentinel token for each span.)`, `هدف المفكِّك: "starts at 11:00 | 1090"، وقد يختلف الطول.`],
    [`The decoder uses the corrupted source (through cross-attention) and its own earlier target tokens.`, `يستخدم المفكِّك المصدر المشوّه ورموزه السابقة.`]
  ],
  confuse: { a: [`MLM (encoder)`, `Predicts <b>single selected tokens</b> in place; output length = input length.`, `يتنبأ <b>برموز مختارة</b> في مكانها.`], b: [`Span denoising (encoder-decoder)`, `<b>Generates the missing spans</b> as a new sequence; lengths can differ.`, `<b>يولّد المقاطع المفقودة</b> كسلسلة جديدة.`], why: [`Both hide parts of the input. The difference is who answers and how: the encoder fills positions in place; the decoder writes the answer out as text.`, `كلاهما يخفي أجزاء، والفرق: المرمِّز يملأ المواضع والمفكِّك يكتب الإجابة نصًّا.`] },
  check: [`In conditional generation, can the decoder read the full source? Future target tokens?`, `في التوليد المشروط، هل يقرأ المفكِّك المصدر كاملًا؟ والأهداف المستقبلية؟`, [`Yes / yes`, `Yes / no`, `No / yes`, `No / no`], 1, `Full source and earlier targets: yes. Future targets: blocked.`, `المصدر نعم، والمستقبل محجوب.`],
  remember: [`T5-style denoising: spans hidden in the encoder input; the decoder generates them. Every objective uses cross-entropy over its chosen targets; exclude padding.`, `إزالة التشويش: المفكِّك يولّد المقاطع، وكل الأهداف بالإنتروبيا المتقاطعة.`]
};

LESSONS.c7s10 = {
  big: [`Before choosing a model, ask <b>what output the task needs</b>: a label for the whole text, a tag for each token, or new text. Only new text needs a decoding strategy.`, `قبل اختيار النموذج اسأل <b>ما المخرج المطلوب</b>: وسم للنص، أم وسم لكل رمز، أم نص جديد؟ والنص الجديد وحده يحتاج فك ترميز.`],
  links: ['c7s4'],
  steps: [
    [`<b>Tag every word of a complete sentence</b> → encoder-only (both directions help each token). No generation.`, `<b>وسم كل كلمة</b> ← المرمِّز فقط، بلا توليد.`],
    [`<b>Summary that keeps consulting the source</b> → encoder-decoder (separate source encoding and target generation). Generates text.`, `<b>ملخص يرجع للمصدر</b> ← المرمِّز-المفكِّك، يولّد نصًّا.`],
    [`<b>Continue a supplied prefix</b> → decoder-only (causal prediction matches the output process). Generates text.`, `<b>تكملة بادئة</b> ← المفكِّك فقط، يولّد نصًّا.`]
  ],
  check: [`Which task does NOT need a decoding strategy?`, `أي مهمة لا تحتاج فك ترميز؟`, [`Summarizing a report`, `Continuing a story`, `Classifying feedback as positive/negative/neutral`, `Translating a sentence`], 2, `It stops at a label: argmax over three classes (exit question 4).`, `يتوقف عند وسم (سؤال الخروج 4).`],
  remember: [`Label / tag per token → encoder, no decoding. Source-conditioned text → encoder-decoder. Continuation → decoder.`, `الوسم ← مرمِّز، والنص المشروط ← مرمِّز-مفكِّك، والتكملة ← مفكِّك.`]
};

LESSONS.c7s11 = {
  big: [`Generation is a loop: the model gives probabilities for the next token, a <b>decoding rule</b> picks one, the pick is appended to the prefix, and the loop repeats until a stop token. The model supplies the probabilities; the decoding rule decides what happens.`, `التوليد حلقة: النموذج يعطي الاحتمالات، و<b>قاعدة فك الترميز</b> تختار رمزًا، ويُضاف للبادئة، ويتكرر ذلك حتى رمز التوقف.`],
  links: ['c3s21'],
  steps: [
    [`Compute logits → form probabilities → select a token → append it → check the stopping rule.`, `logits ← احتمالات ← اختيار ← إضافة ← فحص التوقف.`],
    [`"I would like" → tea → please → &lt;EOS&gt;.`, `"I would like" ← tea ← please ← &lt;EOS&gt;.`],
    [`The running example distribution after "I would like": tea 0.40, coffee 0.25, water 0.20, juice 0.10, milk 0.05 (supplied teaching values).`, `التوزيع المثال: tea 0.40، coffee 0.25، water 0.20، juice 0.10، milk 0.05.`]
  ],
  remember: [`Logits → probabilities → select → append → stop? The next distribution depends on what was selected.`, `حلقة التوليد، والتوزيع التالي يعتمد على الاختيار.`]
};

LESSONS.c7s12 = {
  big: [`<b>Greedy decoding</b> always takes the single best next token. It is simple and deterministic, but short-sighted: the best first step doesn't always start the best sentence. <b>Beam search</b> keeps several partial sentences alive, so it can find a better overall path.`, `<b>فك الترميز الجشع</b> يأخذ دائمًا الرمز الأفضل؛ بسيط وحتمي لكنه قصير النظر. أما <b>البحث الحزمي</b> فيبقي عدة جمل جزئية حية فيجد مسارًا أفضل إجمالًا.`],
  think: [`After "I would like": tea 0.50, coffee 0.30, water 0.20. After tea: please 0.52, now 0.48. After coffee: please 0.90, now 0.10. Which two-word continuation is most probable overall?`, `أي تكملة من كلمتين هي الأعلى احتمالًا إجمالًا؟`, `coffee please: 0.30 × 0.90 = 0.27, which beats tea please: 0.50 × 0.52 = 0.26. Greedy grabs tea first and never finds it.`, `coffee please = 0.27 وهي أكبر من tea please = 0.26، والجشع يأخذ tea أولًا فلا يجدها.`],
  action: { steps: [[`<b>Greedy, step 1:</b> pick the best first token: tea (0.50).`, `<b>الجشع 1:</b> tea.`], [`<b>Greedy, step 2:</b> after tea pick please (0.52). Result "tea please" = 0.50 × 0.52 = <b>0.26</b>.`, `<b>الجشع 2:</b> tea please = 0.26.`], [`<b>Beam (width 2), step 1:</b> keep the best two: tea (0.50) and coffee (0.30); prune water (0.20).`, `<b>الحزمي 1:</b> يبقي tea وcoffee.`], [`<b>Beam, step 2:</b> score all four continuations: coffee please 0.270, tea please 0.260, tea now 0.240, coffee now 0.030. Keep the best two.`, `<b>الحزمي 2:</b> النتائج الأربع.`], [`<b>Result:</b> the best complete sequence is "coffee please" (<b>0.27</b>). Beam search kept coffee alive long enough to find it.`, `<b>النتيجة:</b> coffee please = 0.27.`]], cap: [`Slides 32–33, one move at a time.`, `الشريحتان 32–33 خطوة بخطوة.`] },
  analogy: [`Greedy is a hiker who always takes the steepest-looking path up; beam search sends a few scouts down the most promising paths and compares where they end up.`, `الجشع متسلق يأخذ دائمًا أكثر طريق يبدو صاعدًا، والبحث الحزمي يرسل بضعة مستكشفين في أكثر الطرق وعدًا ويقارن أين وصلوا.`],
  check: [`What does beam search (width 2) return in the lecture example?`, `ماذا يعيد البحث الحزمي (عرض 2) في المثال؟`, [`tea please`, `coffee please`, `tea now`, `water please`], 1, `0.30 × 0.90 = 0.27 > 0.26.`, `0.27 أكبر من 0.26.`],
  remember: [`Greedy: best token each step (tea please 0.26). Beam width 2 keeps 2 partials → coffee please 0.27. Beam suits MT; open-ended LLMs usually sample.`, `الجشع 0.26 والحزمي 0.27.`]
};

LESSONS.c7s13 = {
  big: [`For creative, varied text we <b>sample</b>: draw the next token at random, with each token's chance equal to its probability. <b>Temperature</b> reshapes the distribution first: below 1 sharpens it toward the top token, above 1 flattens it.`, `للنص المتنوع <b>نعاين</b>: نسحب الرمز عشوائيًّا بفرصة تساوي احتماله. و<b>الحرارة</b> تعيد تشكيل التوزيع أولًا: أقل من 1 تحدّه نحو الأعلى وأكبر من 1 تسطّحه.`],
  action: { w: 'decode', cfg: { labels: ['tea', 'coffee', 'water', 'juice', 'milk'], p: [0.40, 0.25, 0.20, 0.10, 0.05] }, cap: [`Set T = 0.5: tea should rise to 0.5818 (slide 37). Set T = 2: tea falls to 0.2984. Press "Sample a token" several times and watch the variety change.`, `اجعل T = 0.5 فيرتفع tea إلى 0.5818، وT = 2 فينخفض إلى 0.2984، واضغط "Sample" عدة مرات.`] },
  steps: [
    [`<b>Sampling intervals:</b> tea [0, 0.40), coffee [0.40, 0.65), water [0.65, 0.85), juice [0.85, 0.95), milk [0.95, 1). A draw u = 0.70 picks water.`, `<b>فترات المعاينة:</b> u = 0.70 يختار water.`],
    [`<b>Problem:</b> a real vocabulary has a long tail of unlikely tokens; together they get picked often enough to produce odd text.`, `<b>المشكلة:</b> الذيل الطويل من الرموز غير المحتملة.`],
    [`<b>Temperature:</b> pᵢ(T) = exp(zᵢ/T) / Σⱼ exp(zⱼ/T), T &gt; 0.`, `<b>الحرارة:</b> pᵢ(T) = exp(zᵢ/T) / Σ exp(zⱼ/T).`],
    [`With only probabilities: raise each to the power 1/T and renormalise. T = 0.5 → square: 0.16, 0.0625, 0.04, 0.01, 0.0025 (total 0.275) → tea 0.16/0.275 = <b>0.5818</b>.`, `بالاحتمالات فقط: ارفع للأس 1/T وطبّع، فيصبح tea = 0.5818.`],
    [`Temperature never changes the ranking, so the greedy (argmax) choice stays tea.`, `الحرارة لا تغيّر الترتيب فيبقى اختيار الجشع tea.`]
  ],
  confuse: { a: [`T &lt; 1`, `<b>Sharper</b>: top token gains (tea 0.40 → 0.58). Safer, less varied.`, `<b>أحدّ</b>: الأعلى يزداد.`], b: [`T &gt; 1`, `<b>Flatter</b>: rare tokens gain (tea 0.40 → 0.30). More varied, riskier.`, `<b>أسطح</b>: النادرة تزداد.`], why: [`Neither changes which token is most likely. Temperature changes how much the others get a chance.`, `لا يغيّر أي منهما الرمز الأعلى، بل فرصة البقية.`] },
  check: [`At T = 0.5, does tea's sampling probability rise or fall, and does the argmax change?`, `عند T = 0.5 هل يرتفع احتمال tea، وهل يتغير الأعلى؟`, [`Rises; argmax changes`, `Rises; argmax stays tea`, `Falls; argmax stays tea`, `Falls; argmax changes`], 1, `0.40 → 0.5818; ranking is preserved.`, `يرتفع إلى 0.5818 ويبقى tea.`],
  remember: [`Sampling: chance = probability (u = 0.70 → water). Temperature: T &lt; 1 sharpen (tea 0.58), T &gt; 1 flatten (tea 0.30); argmax unchanged.`, `الحرارة تحد أو تسطّح ولا تغيّر الأعلى.`]
};

LESSONS.c7s14 = {
  big: [`To stop the long tail producing odd words, we <b>filter</b> before sampling. <b>Top-k</b> keeps a fixed number of best tokens. <b>Top-p (nucleus)</b> keeps the smallest set of best tokens whose probabilities add up to p. Then we renormalise and sample from what is left.`, `لمنع الذيل الطويل من إنتاج كلمات غريبة <b>نرشّح</b> قبل المعاينة: <b>top-k</b> يبقي عددًا ثابتًا من الأفضل، و<b>top-p</b> يبقي أصغر مجموعة يبلغ مجموعها p، ثم نعيد التطبيع ونعاين.`],
  links: ['c7s13'],
  action: { w: 'decode', cfg: { labels: ['tea', 'coffee', 'water', 'juice', 'milk'], p: [0.40, 0.25, 0.20, 0.10, 0.05] }, cap: [`Slide 41's practice: set top-k = 2 (expect 0.6154 / 0.3846), then reset and set top-p = 0.8 (expect tea, coffee, water: 0.4706 / 0.2941 / 0.2353).`, `تمرين الشريحة 41: top-k = 2 ثم top-p = 0.8 وقارن النتائج.`] },
  steps: [
    [`<b>Top-k = 2:</b> keep tea and coffee (mass 0.65) → 0.40/0.65 = 0.6154 and 0.25/0.65 = 0.3846. k = 1 is just greedy.`, `<b>top-k = 2:</b> tea وcoffee ← 0.6154 و0.3846.`],
    [`<b>Top-p = 0.80:</b> cumulative 0.40, 0.65, 0.85. The first three reach 0.80, and we keep the token that crosses the threshold (water) → [0.4706, 0.2941, 0.2353].`, `<b>top-p = 0.80:</b> أول ثلاثة تتجاوز العتبة ← [0.4706, 0.2941, 0.2353].`],
    [`<b>Adaptive vs fixed:</b> for [0.90, 0.04, 0.03, 0.02, 0.01], top-p = 0.8 keeps 1 token, top-k = 2 keeps 2. For [0.22, 0.21, 0.20, 0.19, 0.18], top-p keeps 4, top-k still 2.`, `<b>متكيف مقابل ثابت:</b> التوزيع الحاد يُبقي فيه top-p رمزًا واحدًا، والمسطح أربعة.`],
    [`They can be combined: top-k first as a hard filter, then top-p. Neither guarantees factual correctness.`, `يمكن دمجهما: top-k ثم top-p، ولا يضمن أي منهما الصحة.`]
  ],
  confuse: { a: [`Top-k`, `The <b>count k</b> decides the retained set (always k tokens).`, `<b>العدد k</b> يحدد المجموعة.`], b: [`Top-p`, `The <b>cumulative probability mass p</b> decides it (the size adapts).`, `<b>الكتلة التراكمية p</b> تحددها (الحجم متكيف).`], why: [`Exit question 5 asks exactly this. Also remember to include the token that crosses p, and always renormalise.`, `سؤال الخروج 5 يسأل هذا تمامًا، وتذكّر الرمز المتجاوز وإعادة التطبيع.`] },
  check: [`For [0.40, 0.25, 0.20, 0.10, 0.05], top-p = 0.80 keeps how many tokens?`, `top-p = 0.80 يبقي كم رمزًا؟`, [`1`, `2`, `3`, `5`], 2, `0.40 + 0.25 = 0.65 < 0.80; adding water gives 0.85 ≥ 0.80.`, `0.65 أقل من 0.80، وبإضافة water تصبح 0.85.`],
  remember: [`Top-k = fixed count (k = 2 → 0.6154 / 0.3846). Top-p = smallest set reaching p (0.8 → 3 tokens, 0.4706 / 0.2941 / 0.2353). Renormalise, then sample.`, `top-k عدد ثابت وtop-p كتلة، ثم إعادة التطبيع.`],
  teach: [`Explain the difference between top-k and top-p with the lecture's numbers.`, `اشرح الفرق بين top-k وtop-p بأرقام المحاضرة.`, `Both filter the distribution before sampling and then renormalise the kept probabilities. Top-k keeps a fixed number of the most probable tokens: with k = 2 we keep tea (0.40) and coffee (0.25), giving 0.6154 and 0.3846. Top-p keeps the smallest sorted set whose cumulative probability reaches p, including the token that crosses it: with p = 0.80 we keep tea, coffee and water (0.85), giving 0.4706, 0.2941 and 0.2353. So the count decides top-k's set, while the probability mass decides top-p's, which adapts to peaked or flat distributions.`, `كلاهما يرشّح ثم يعيد التطبيع. top-k يبقي عددًا ثابتًا (tea وcoffee ← 0.6154 و0.3846)، وtop-p يبقي أصغر مجموعة تبلغ p (ثلاثة رموز ← 0.4706 و0.2941 و0.2353)، فالعدد يحدد الأول والكتلة تحدد الثاني ويتكيف حجمه.`]
};

LESSONS.c7s15 = {
  big: [`Put the five questions to work on a real design: for each task, choose a family, how to adapt it, and whether and how to decode. These are starting points to validate on task data, not fixed rules.`, `طبّق الأسئلة الخمسة على تصميم حقيقي: لكل مهمة اختر عائلة وطريقة تكييف وهل نفك الترميز وكيف. هذه نقاط بداية للتحقق لا قواعد ثابتة.`],
  links: ['c7s10', 'c7s12', 'c7s14'],
  steps: [
    [`<b>Classify student feedback</b> (positive / negative / neutral) → encoder + supervised classification head → argmax over 3 labels; no generation loop.`, `<b>تصنيف آراء الطلاب</b> ← مرمِّز ورأس تصنيف ← argmax بلا توليد.`],
    [`<b>Concise summary of a supplied report</b> → encoder-decoder fine-tuned on source–summary pairs → compare greedy and beam search, checking faithfulness to the source.`, `<b>تلخيص تقرير</b> ← مرمِّز-مفكِّك مضبوط ← مقارنة الجشع والحزمي مع التحقق من الأمانة.`],
    [`<b>Several different story openings</b> → causal decoder, adapted or prompted → sample with a stated temperature and filtering, then evaluate.`, `<b>بدايات قصص متنوعة</b> ← مفكِّك سببي ← معاينة بحرارة وترشيح ثم تقييم.`],
    [`Use held-out examples to assess quality, cost and failure cases. Other families can also work.`, `استخدم أمثلة محجوزة لتقييم الجودة والتكلفة والأخطاء.`]
  ],
  check: [`For "several different story openings from one prompt", which output strategy fits best?`, `لـ "بدايات قصص متنوعة من تلقين واحد"، أي استراتيجية أنسب؟`, [`Argmax over labels`, `Greedy decoding`, `Sampling with temperature and filtering`, `No decoding`], 2, `We want variety, which greedy and beam search don't give.`, `نريد التنوع، والجشع والحزمي لا يعطيانه.`],
  remember: [`Labels → encoder + head (no decoding). Faithful summary → encoder-decoder + greedy/beam. Varied text → decoder + sampling (T, top-k/top-p).`, `الوسوم ← مرمِّز، والتلخيص ← مرمِّز-مفكِّك، والتنوع ← مفكِّك ومعاينة.`]
};
