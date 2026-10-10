# ARTI 404 Study Atlas – NLP Midterm Revision

An interactive English/Arabic study website for the **ARTI 404 Natural Language Processing** midterm, covering all seven lectures.

🌐 **Use it online:** https://batoolashour.github.io/ARTI452-NLP/

> The essay questions are practice questions based on the course slides, not a prediction of the exam.

## Features

- **English explanations** with *Must Know / Important / Additional Detail* labels
- **Arabic translation toggle**: show or hide all Arabic with one button, or reveal a single translation
- **17 interactive mind maps**
- **78 essay questions** with hidden model answers, Arabic translations and key points for full marks
- **113 flashcards**, revision sheets, comparison tables, common mistakes and checklists
- **Self-tests**, search, a formula sheet and progress tracking (saved in your browser)

## Project structure

```text
Midterm_Revision/
├── index.html   # The website
├── build.py     # Rebuilds index.html from src/
└── src/         # Page layout, styles, chapter content and app logic
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
