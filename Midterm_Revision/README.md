# ARTI 404 Study Atlas – NLP Midterm Revision

An interactive, bilingual (English / Arabic) study website for the **ARTI 404 Natural Language Processing** midterm. It turns the seven lecture PDFs into explanations, mind maps, essay practice, flashcards and self-tests, all in one page that runs in your browser.

> The essay questions are practice questions written from the course slides. They are not a prediction of what will be on the exam.

---

## Contents covered

| # | Chapter | Source file |
|---|---------|-------------|
| 1 | Lecture 1 – Introduction | `LM#01-Introduction.pdf` |
| 2 | Week 2 – Text Processing | `L2_Text_Processing_Expanded.pdf` |
| 3 | Week 3 – Language Modelling | `ARTI404_L3_Language_Modelling.pdf` |
| 4 | Week 4 – Machine Learning for NLP | `ARTI404_Lecture04_Machine_Learning_for_NLP.pdf` |
| 5 | Week 5 – Text Representation | `ARTI404_L5_Text_Representation_UpdatedVF.pdf` |
| 6 | Week 6 – Deep Learning for NLP | `ARTI404_L6_Deep_Learning_for_NLP.pdf` |
| 7 | Week 7 – Large Language Models | `Week_7_Large_Language_Models.pdf` |

---

## Features

- **English explanations**: every chapter follows the original slide headings, with plain-English explanations, definitions, worked examples and "Don't confuse" notes.
- **Priority labels**: each section is tagged *Must Know*, *Important* or *Additional Detail*, and you can filter by label.
- **Arabic translation toggle**: the button in the top bar (*Show / Hide Arabic Translation – إظهار / إخفاء الترجمة العربية*) switches the whole site between bilingual and English-only mode. Your choice is remembered. In English-only mode, the small **عربي** button under any item shows just that one translation.
- **Mind maps**: 17 interactive maps (at least two per chapter). Click a coloured branch to focus on it, click the centre to reset, and use *Hide map / Show map* to collapse each one. Every map also has a text outline.
- **Essay questions with hidden model answers**: 78 questions (define, compare, explain, list, discuss, scenario), each with an Arabic translation. Write your attempt in the box first, then press *Show model answer* to see the answer, its Arabic translation, the key points for full marks and a suggested mark allocation.
- **Flashcards**: 113 cards. Tap a card to flip it, then mark it *Know it* or *Review again* and filter by those marks.
- **Revision materials**: key definitions, a quick revision sheet, comparison tables, common mistakes and a chapter checklist.
- **Self-test**: short-answer questions with reveal buttons and a multiple-choice quiz with a score.
- **Dashboard and progress tracking**: progress for sections studied, essays practised, flashcards known and checklist items.
- **Search**: finds concepts across all chapters, in English or Arabic.
- **Formula sheet**: every formula from the lectures on one page.
- **Light / dark mode and mobile-friendly layout**: follows your system theme and works on laptop, tablet and phone.

---

## Project structure

```text
Midterm_Revision/
├── index.html          # The website (built file – open this one)
├── build.py            # Rebuilds index.html from the files in src/
├── README.md           # This file
└── src/                # Source files
    ├── shell.html      # Page layout and all CSS styles
    ├── 00_helpers.js   # Small helper functions used by the chapter files
    ├── ch1.js … ch7.js # Content for each chapter (explanations, maps, questions…)
    └── zz_app.js       # App logic: navigation, toggles, mind maps, search, progress
```

`index.html` is self-contained: all the content, styles and scripts are inside it. You only need to edit `src/` and run `build.py` if you want to change the content.

---

## Technologies used

- **HTML5 and CSS3** (custom properties for light/dark themes, responsive grid/flex layout)
- **Vanilla JavaScript**, with no frameworks and no npm packages
- **Inline SVG** for the mind maps
- **Browser `localStorage`** to remember your progress, drafts and language choice
- **Google Fonts** (Bricolage Grotesque, IBM Plex Sans, IBM Plex Sans Arabic, IBM Plex Mono), loaded online with system-font fallbacks
- **Python 3 standard library** for the build script and the local web server

There is **nothing to install**: no `npm install`, no `pip install`, no dependencies.

---

## Run the website locally on your Mac

### Requirements

- A web browser (Safari, Chrome, Firefox or Edge)
- Python 3. It is already installed on this Mac (Python 3.12). To check, open **Terminal** and run:

  ```bash
  python3 --version
  ```

### Option A – Run with a local server (recommended)

1. Open **Terminal** (press `⌘ Space`, type *Terminal*, press Return).
2. Go to the project folder:

   ```bash
   cd /Users/batoolsaeed/github/ARTI452-NLP/Midterm_Revision
   ```

3. Start the local web server:

   ```bash
   python3 -m http.server 8000
   ```

   You should see: `Serving HTTP on :: port 8000 (http://[::]:8000/) ...`
4. Open your browser and go to:

   **http://localhost:8000**

5. When you are done studying, go back to Terminal and press `Control + C` to stop the server.

> If port 8000 is already in use, pick another number, for example `python3 -m http.server 8080`, and open `http://localhost:8080`.

### Option B – Open the file directly

You can also double-click `index.html` in Finder, or run:

```bash
open /Users/batoolsaeed/github/ARTI452-NLP/Midterm_Revision/index.html
```

The site does not load any local files, so it should work this way too. Option A is recommended because browsers handle saved progress more reliably on `http://localhost`.

> Fonts come from Google Fonts, so you need an internet connection for the exact typography. Without one, the site still works with your Mac's system fonts.

---

## How to use it

1. Start on the **Dashboard** and pick a chapter.
2. **Learn**: read each section and tick **Studied**.
3. **Mind maps**: review how the ideas connect.
4. **Essay practice**: write your answer, press **Show model answer**, compare it with the key points, then tick **Practised**.
5. **Revision** and **Self-test**: use the flashcards, comparisons, checklist and quizzes.
6. Use the top-bar button to switch to **English-only** mode when you want to practise without Arabic.

**Saved progress**: ticks, flashcard marks, quiz answers and essay drafts are stored in your browser for this address (for example `http://localhost:8000`). They do not move to another browser or device, and a private window starts empty. You can clear them with **Reset progress** at the bottom of the Dashboard.

---

## Online version (GitHub Pages)

The site is published with GitHub Pages at:

**https://batoolashour.github.io/ARTI452-NLP/**

Deployment is automatic. The workflow in `.github/workflows/deploy-midterm-revision.yml` (at the repository root) runs whenever a push to `main` changes anything in `Midterm_Revision/`. It:

1. runs `python build.py` to rebuild `index.html` from `src/`
2. uploads only `index.html` (the lab folders are not published)
3. deploys it to GitHub Pages

You can also run it by hand from the **Actions** tab → **Deploy Midterm Revision site** → **Run workflow**.

Links to a specific page work too, for example `https://batoolashour.github.io/ARTI452-NLP/#ch3-essay` opens the Week 3 essay questions.

> Progress saved on the online site is separate from progress saved on `http://localhost:8000`, because each address keeps its own browser storage.

---

## Editing the content (optional)

1. Edit the chapter files in `src/` (for example `src/ch3.js`) or the styles in `src/shell.html`.
2. Rebuild the site:

   ```bash
   cd /Users/batoolsaeed/github/ARTI452-NLP/Midterm_Revision
   python3 build.py
   ```

   You should see a message like `Built index.html (575,588 characters) from 9 script files.`
3. Refresh the page in your browser.
