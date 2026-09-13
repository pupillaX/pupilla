---
layout: essay
# Essays are full-text pieces (the body below is rendered on the page).
# Same multilingual rules as articles: every language array uses the SAME
# label spelling (e.g. "English", "Italiano"), which the toggle matches on.
title: "Your Essay Title"
titles:
  - language: "English"
    content: "Your Essay Title"
  - language: "Italiano"
    content: "Titolo del tuo saggio"

subtitle: "An optional subtitle"
# subtitles:                      # uncomment for a language-aware subtitle
#   - language: "English"
#     content: "An optional subtitle"
#   - language: "Italiano"
#     content: "Un sottotitolo facoltativo"

authors:
  - First Author                  # match _data/contributors.yml to link

discipline: "Spirituality"
keywords: ["keyword one", "keyword two"]
languages: ["English"]            # drives the EN/IT badges in listings
date: 2026-01-01
coming_soon: false

# Short abstract for SEO/meta + list summary.
abstract: "One- or two-sentence summary."

# Optional: a downloadable version per language.
# pdfs:
#   - language: "English"
#     url: "/assets/pdfs/your-essay-en.pdf"

pupilla_citation: "Author, A., Your Essay Title, Pupilla (2026), https://pupilla.org/essays/YYYY-short-name/"
---

Write the essay in Markdown here. Use `##` for section headings and `###`
for subsections — the floating table of contents is built from them.

## A section

Body text…

<!--
  For a multilingual essay, wrap each language so the toggle switches the body:

  <div class="lang-content" data-lang="English">
  ## A section
  English body…
  </div>
  <div class="lang-content" data-lang="Italiano" style="display:none">
  ## Una sezione
  Testo in italiano…
  </div>
-->
