# ARTI 404 Study Atlas – NLP Midterm Revision

An interactive English/Arabic study website for the **ARTI 404 Natural Language Processing** midterm, covering all seven lectures.

🌐 **Use it online:** https://batoolashour.github.io/ARTI452-NLP/

> The essay questions are practice questions based on the course slides, not a prediction of the exam.

## Features

- **Guided lessons in missions**: each chapter is split into short missions; each topic teaches the big picture, a step-by-step breakdown you reveal one step at a time, a real-life analogy, a common-confusion card, a quick check, a "Remember this" line and a "Teach it back" exercise
- **31 live demos** that compute with the lecture's formulas: regex tester, BPE merger, edit-distance matrix, bigram and add-one calculator, perplexity, sigmoid and softmax, precision/recall, TF-IDF and cosine, PMI, skip-gram pairs, LSTM gates, attention masks and a temperature/top-k/top-p decoding playground
- **Progress and feedback**: mission and chapter progress, completion messages, and links from each lesson to the essay questions that test it
- **Slide references and exam labels**: every topic shows its slide (PDF page) numbers and a *Must memorize / Understand / Additional detail* label with its reason; the full slide notes stay under every lesson
- **Must-memorize sheet** per chapter for quick revision
- **Arabic translation toggle**: show or hide all Arabic with one button, or reveal a single translation
- **17 interactive mind maps** with a guided tour that reveals one branch at a time
- **83 essay questions** with hidden model answers, Arabic translations, key points for full marks and links to the slides they are based on
- **113 flashcards**, revision sheets, comparison tables, common mistakes and checklists
- **Self-tests**, search, a formula sheet and progress tracking (saved in your browser)

## Project structure

```text
Midterm_Revision/
├── index.html   # The website
├── build.py     # Rebuilds index.html from src/
└── src/
    ├── shell.html          # Page layout and styles
    ├── ch1.js … ch7.js     # Slide notes, essays, flashcards and quizzes per chapter
    ├── ch_meta.js          # Slide references, exam labels and links between topics and questions
    ├── lessons_ch1.js …    # Guided lessons and missions per chapter
    ├── widgets.js          # Interactive demos
    └── zz_app.js           # App logic: navigation, lessons, progress, search
```

Built with HTML, CSS and vanilla JavaScript. There is nothing to install.

## Run locally

Requires Python 3 (check with `python3 --version`).

```bash
cd ARTI452-NLP/Midterm_Revision
python3 -m http.server 8000
```

Open **http://localhost:8000** in your browser. Press `Control + C` in Terminal to stop the server.

## Edit and deploy

1. Edit the files in `src/`, then rebuild from inside `Midterm_Revision`:

   ```bash
   python3 build.py
   ```

2. Push to `main`. GitHub Actions (`.github/workflows/deploy-midterm-revision.yml`) redeploys the site automatically.

> GitHub Pages must use **Settings → Pages → Source: GitHub Actions**. If the online page shows an old version, hard-refresh with `⌘ Shift R`.
