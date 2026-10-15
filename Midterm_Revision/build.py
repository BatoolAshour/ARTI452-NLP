"""Build index.html from the files in src/.

Usage (from this folder):  python3 build.py
Uses only the Python standard library.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"

# Order matters: helpers, chapter data + exam metadata, guided lessons, widgets, then the app logic.
parts = [SRC / "00_helpers.js", *sorted(SRC.glob("ch*.js")), *sorted(SRC.glob("lessons_*.js")), SRC / "widgets.js", SRC / "zz_app.js"]
script = "".join(p.read_text(encoding="utf-8") + "\n" for p in parts)

shell = (SRC / "shell.html").read_text(encoding="utf-8")
head = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n')
body = shell.replace("/*__JS__*/", script)
# shell.html holds <title>, <link>, <style> (head content) followed by the page body.
split = body.index("<a class=\"skip\"")
html = head + body[:split] + "</head>\n<body>\n" + body[split:] + "\n</body>\n</html>\n"

(ROOT / "index.html").write_text(html, encoding="utf-8")
print(f"Built index.html ({len(html):,} characters) from {len(parts)} script files.")
