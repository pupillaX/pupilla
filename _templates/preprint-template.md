---
layout: preprint
# ── Title ───────────────────────────────────────────────────────────────
# `title` is the canonical (usually English) title used in listings, <title>,
# and citations. For a multilingual article, also provide `titles` so the title
# switches with the language toggle. IMPORTANT: every language array below
# (titles, subtitles, abstracts, pdfs) must use the SAME language label spelling
# (e.g. "English", "Italiano") — the toggle and PDF switcher match on it.
title: "Your Article Title"
titles:
  - language: "English"
    content: "Your Article Title"
  - language: "Italiano"
    content: "Titolo del tuo articolo"

# Subtitle — also language-aware (optional). Keep `subtitle` as the English
# fallback; `subtitles` switches with the language toggle.
subtitle: "An optional subtitle"
subtitles:
  - language: "English"
    content: "An optional subtitle"
  - language: "Italiano"
    content: "Un sottotitolo facoltativo"

authors:
  - First Author
  - Second Author          # names must match _data/contributors.yml to link

discipline: "Philosophy"   # e.g. Philosophy, Theology, Interfaith Studies
keywords: ["keyword one", "keyword two"]
languages: ["English", "Italiano"]   # drives the EN/IT badges in listings
date: 2026-01-01           # publication date (YYYY-MM-DD)
coming_soon: false         # true = listed as "Coming soon", no PDF shown
# doi: "10.5281/zenodo.XXXX"         # uncomment when a DOI is minted

# Short abstract (single language) — used for SEO/meta and list summaries.
abstract: "One- or two-sentence summary in the primary language."

# Full abstracts, one per language (shown on the article page, toggled).
abstracts:
  - language: "English"
    content: "Full English abstract…"
  - language: "Italiano"
    content: "Abstract completo in italiano…"

# PDFs, one per language. Filename convention:
# YYYYMMDD_PUPILLA_ShortName_xx.pdf — place files in assets/pdfs/.
pdfs:
  - language: "English"
    url: "/assets/pdfs/YYYYMMDD_PUPILLA_ShortName_en.pdf"
  - language: "Italiano"
    url: "/assets/pdfs/YYYYMMDD_PUPILLA_ShortName_it.pdf"

# How to cite this Pupilla preprint (always include).
pupilla_citation: "Author, A., Author, B., Your Article Title, Pupilla (2026), https://pupilla.org/preprints/YYYY-short-name/"

# Only if this reprints prior work (thesis, journal article, etc.):
# external_citation: "Author, A. (2025). Original Title. Journal / University."
# external_citation_note: "Optional note on the relationship to the original."
---

<!--
  Most articles are abstract + PDF only, in which case leave the body empty.
  If you want full text on the page, write it in Markdown below; for
  multilingual full text, wrap each language so the toggle works:

  <div class="lang-content" data-lang="English">
  ## Section heading
  Your text…
  </div>
  <div class="lang-content" data-lang="Italiano" style="display:none">
  ## Titolo della sezione
  Il tuo testo…
  </div>
-->
