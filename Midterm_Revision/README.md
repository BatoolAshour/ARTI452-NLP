# ARTI 404 Study Atlas – NLP Midterm Revision

An interactive, bilingual (English / Arabic) study website for the **ARTI 404 Natural Language Processing** midterm. It turns the seven lecture PDFs into explanations, mind maps, essay practice, flashcards and self-tests, all in one page that runs in the browser.

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
- **Arabic translation toggle**: the button in the top bar (*Show / Hide Arabic Translation – إظهار / إخفاء الترجمة العربية*) switches the whole site between bilingual and English-only mode. The choice is remembered. In English-only mode, the small **عربي** button under any item shows just that one translation.
- **Mind maps**: 17 interactive maps (at least two per chapter). Click a coloured branch to focus on it, click the centre to reset, and use *Hide map / Show map* to collapse each one. Every map also has a text outline.
- **Essay questions with hidden model answers**: 78 questions (define, compare, explain, list, discuss, scenario), each with an Arabic translation. Write an attempt in the box first, then press *Show model answer* to see the answer, its Arabic translation, the key points for full marks and a suggested mark allocation.
- **Flashcards**: 113 cards. Tap a card to flip it, then mark it *Know it* or *Review again* and filter by those marks.
- **Revision materials**: key definitions, a quick revision sheet, comparison tables, common mistakes and a chapter checklist.
- **Self-test**: short-answer questions with reveal buttons and a multiple-choice quiz with a score.
- **Dashboard and progress tracking**: progress for sections studied, essays practised, flashcards known and checklist items.
- **Search**: finds concepts across all chapters, in English or Arabic.
- **Formula sheet**: every formula from the lectures on one page.
- **Light / dark mode and mobile-friendly layout**: follows the system theme and works on laptop, tablet and phone.

---

## Project structure

```text
ARTI452-NLP/                                  # repository root
├── .github/workflows/
│   └── deploy-midterm-revision.yml           # GitHub Actions: build + deploy to GitHub Pages
├── Lab2/ … Lab7/                             # lab solutions (not part of the website)
└── Midterm_Revision/
    ├── index.html          # The website (built file – this is what you open)
    ├── build.py            # Rebuilds index.html from the files in src/
    ├── README.md           # This file
    └── src/                # Source files
        ├── shell.html      # Page layout and all CSS styles
        ├── 00_helpers.js   # Small helper functions used by the chapter files
        ├── ch1.js … ch7.js # Content for each chapter (explanations, maps, questions…)
        └── zz_app.js       # App logic: navigation, toggles, mind maps, search, progress
```

`index.html` is self-contained: all content, styles and scripts are inside it. Navigation uses `#` links (for example `#ch3-essay`), so the site works from any folder or web address without server configuration.

---

## Technologies used

- **HTML5 and CSS3** (custom properties for light/dark themes, responsive grid/flex layout)
- **Vanilla JavaScript**, with no frameworks and no npm packages
- **Inline SVG** for the mind maps
- **Browser `localStorage`** to remember progress, drafts and the language choice
- **Google Fonts** (Bricolage Grotesque, IBM Plex Sans, IBM Plex Sans Arabic, IBM Plex Mono), loaded online with system-font fallbacks
- **Python 3 standard library** for the build script and the local web server
- **GitHub Actions + GitHub Pages** for online hosting

There is **nothing to install**: no `npm install`, no `pip install`, no dependencies.

---

## Run the website locally (macOS)

### Requirements

- A web browser (Safari, Chrome, Firefox or Edge)
- Python 3. Check that it is installed by opening **Terminal** and running:

  ```bash
  python3 --version
  ```

  If the command is not found, install Python 3 from [python.org](https://www.python.org/downloads/).

### Step 1 – Get the project

If you do not have the repository on your computer yet, clone it (replace `<username>` with the GitHub account that owns the repository):

```bash
git clone https://github.com/<username>/ARTI452-NLP.git
```

### Step 2 – Open the project folder

In Terminal, go into the website folder. From the folder where you cloned the repository:

```bash
cd ARTI452-NLP/Midterm_Revision
```

> Tip: you can also type `cd ` (with a space) and drag the `Midterm_Revision` folder from Finder into the Terminal window, then press Return.

### Step 3 – Start the local server

```bash
python3 -m http.server 8000
```

Terminal shows a line like `Serving HTTP on :: port 8000 (http://[::]:8000/) ...`. Leave this window open.

### Step 4 – Open the website

Open your browser and go to:

**http://localhost:8000**

### Step 5 – Stop the server

When you are done, go back to Terminal and press `Control + C`.

> If port 8000 is already in use, choose another number, for example `python3 -m http.server 8080`, and open `http://localhost:8080`.

### Alternative – open the file directly

From inside the `Midterm_Revision` folder you can also run:

```bash
open index.html
```

or double-click `index.html` in Finder. The local server (Steps 3–4) is recommended because browsers save progress more reliably on `http://localhost`.

> Fonts come from Google Fonts, so an internet connection gives the exact typography. Without one, the site still works with the system fonts.

---

## Publish online with GitHub Pages

The repository includes a GitHub Actions workflow (`.github/workflows/deploy-midterm-revision.yml`) that publishes the website automatically. It runs on every push to the `main` branch that changes something in `Midterm_Revision/`, and it can also be started manually. Each run:

1. checks out the repository
2. runs `python build.py` to rebuild `index.html` from `src/`
3. uploads **only** `index.html` (the lab folders are not published)
4. deploys it to GitHub Pages

### One-time setup

1. Push the repository, including the `.github/workflows` folder, to GitHub on the `main` branch.
2. On GitHub, open the repository → **Settings** → **Pages** (left sidebar).
3. Under **Build and deployment → Source**, select **GitHub Actions**.
   Do **not** use *Deploy from a branch*. That option publishes the repository's root `README.md` instead of the study website.
4. Open the **Actions** tab. Select **Deploy Midterm Revision site** and wait for the green check mark. If the run happened before you changed the setting, open it and click **Re-run all jobs**, or click **Run workflow** to start a new run.
5. The address is shown at the top of **Settings → Pages** and in the workflow's *deploy* step.

### Public URL

```text
https://<username>.github.io/ARTI452-NLP/
```

Replace `<username>` with the GitHub account name in lowercase. Links to a specific page also work, for example `https://<username>.github.io/ARTI452-NLP/#ch3-essay` opens the Week 3 essay questions.

### Troubleshooting

| What you see | Cause | Fix |
|---|---|---|
| A plain page with the repository title and "Here you'll find my solutions…" | Pages **Source** is set to *Deploy from a branch*, so GitHub shows the root `README.md` | Set **Source** to **GitHub Actions** (step 3), then re-run the workflow |
| The old page still appears after a successful deployment | The browser cached the previous version (GitHub Pages allows caching for up to 10 minutes) | Hard-refresh with `⌘ Shift R`, open the link in a private window, or wait a few minutes |
| 404 "Site not found" | No deployment has finished yet | Check the **Actions** tab and wait for the green check |
| The workflow did not start | The push did not touch `Midterm_Revision/` or was not on `main` | Use **Actions → Deploy Midterm Revision site → Run workflow** |

> Progress saved on the online site is separate from progress saved on `http://localhost:8000`, because each address keeps its own browser storage.

---

## How to use the website

1. Start on the **Dashboard** and pick a chapter.
2. **Learn**: read each section and tick **Studied**.
3. **Mind maps**: review how the ideas connect.
4. **Essay practice**: write an answer, press **Show model answer**, compare it with the key points, then tick **Practised**.
5. **Revision** and **Self-test**: use the flashcards, comparisons, checklist and quizzes.
6. Use the top-bar button to switch to **English-only** mode to practise without Arabic.

**Saved progress**: ticks, flashcard marks, quiz answers and essay drafts are stored in the browser for the address you use. They do not move to another browser or device, and a private window starts empty. Clear them with **Reset progress** at the bottom of the Dashboard.

---

## Editing the content (optional)

1. Edit the chapter files in `src/` (for example `src/ch3.js`) or the styles in `src/shell.html`.
2. From inside the `Midterm_Revision` folder, rebuild the site:

   ```bash
   python3 build.py
   ```

   You should see a message like `Built index.html (575,588 characters) from 9 script files.`
3. Refresh the page in the browser to check the change locally.
4. Commit and push to `main`. The workflow rebuilds and redeploys the online site automatically.
