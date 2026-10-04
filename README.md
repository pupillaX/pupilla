# Pupilla

A multidisciplinary, multilingual preprint archive for articles and essays on
mysticism, spirituality and philosophy — built with Jekyll, hosted on GitHub
Pages at [pupilla.org](https://pupilla.org).

## How it deploys

The live site is built and served by **GitHub Pages' built-in builder** from the
`main` branch. Pushing to `main` publishes within ~1 minute. The
[build workflow](.github/workflows/build.yml) also compiles the site on every
push/PR so build errors surface before they reach the live build (if the live
build fails, Pages keeps the previous version up).

Because Pages uses the `github-pages` gem (pinned to `223` in the
[`Gemfile`](Gemfile)), the whole toolchain — Jekyll 3.9, Liquid, kramdown — is
version-locked. Custom `_plugins/` are **not** run by the production builder
(safe mode), so don't rely on them for production output.

## Local preview

System Ruby on macOS (2.6) is too old. Use Homebrew Ruby:

```bash
brew install ruby                 # one-time
bundle install                    # one-time
./start-server.sh                 # serve at http://localhost:4000
```

`./restart-server.sh` does the same but clears the cache first.

Both scripts set two things needed for a working local build:

1. **Homebrew Ruby on `PATH`** (`/opt/homebrew/opt/ruby/bin`).
2. **`RUBYOPT=-r .../_plugins/ruby4_compat.rb`** — Liquid 4.x calls
   `String#untaint`, which Ruby 3.2+ removed. The shim restores it. It can't
   load as a normal Jekyll plugin because the `github-pages` gem forces safe
   mode, so it's preloaded into the Ruby process instead. (Production Pages runs
   Ruby 2.7 and doesn't need it.)

If you run `bundle exec jekyll serve` by hand, export those two first or you'll
hit `undefined method 'untaint'`.

> `Gemfile.lock` is intentionally **not** committed: it pins a Bundler version
> that isn't available in CI, and `github-pages "223"` already locks every gem.

## Adding content

| To add… | Do this |
|---|---|
| An **article** | Copy [`_templates/preprint-template.md`](_templates/preprint-template.md) into `_pupilla-preprints/`; drop PDFs in `assets/pdfs/`. |
| An **essay** | Copy [`_templates/essay-template.md`](_templates/essay-template.md) into `_pupilla-essays/`. |
| A **contributor** | Add one entry to [`_data/contributors.yml`](_data/contributors.yml) and a photo in `assets/images/contributors/`. The Contributors page and author links are generated from it. |

Multilingual articles use parallel arrays (`titles`, `subtitles`, `abstracts`,
`pdfs`) keyed by a `language:` label. **That label must be spelled identically
across all of them** (e.g. `"Italiano"` everywhere) — the language toggle and
PDF switcher match on it. See the template comments.

Language details handled for you:

- The first language in `languages:` is the default (its code becomes `<html lang>`);
  every language block in an essay body is tagged with the right `lang=` automatically.
- **Every language gets its own page** (`/essays/<slug>/es/`, `/preprints/<slug>/it/`, …) with
  its own title, `<html lang>`, canonical URL and `hreflang` links, so each version can be
  shared and indexed separately. The default language keeps the plain URL. Old `?lang=es`
  links redirect to the right page.
- These pages are thin stubs in `language-versions/`, **generated** — after adding or changing
  `languages:` run `python3 scripts/make-language-pages.py` and commit the result.
  (`--check` verifies they're up to date and runs in CI; GitHub Pages can't run plugins,
  which is why they're committed rather than generated at build time.)
- `languages:` = languages the page *text* (title, abstract, essay body) is available in.
  The EN/IT **badges** in listings show the language of the *full text*: PDF languages for
  articles, `languages:` for essays.
- Add `pages: N` to each `pdfs:` entry; it's shown in the article header (“14 pages”).

## Project layout

- `_layouts/` — `default` (pages), `preprint` (articles), `essay`.
- `_includes/` — shared chrome (`head`, `topbar`, `site-footer`), plus
  `giscus`, `author-link`, `lang-badge`.
- `_data/contributors.yml` — single source for contributors + author links.
- `assets/css/` — `site.css` (design system), `fonts.css` (self-hosted fonts, files in
  `assets/fonts/`; no Google Fonts requests) and `giscus.css` (comment widget).
- `assets/js/browse-filter.js` — search/filter for the browse pages: accent-insensitive,
  multi-word, and kept in the URL (`?q=…&language=…&author=…&sort=…`) so lists can be shared.
- Working files that must never be published (source manuscripts, drafts) go in
  `assets/pdfs/private/` or `assets/pdfs/tmp/` — both are excluded from the build and git.
- Comments/reactions are [giscus](https://giscus.app), backed by GitHub
  Discussions; configured under `giscus:` in `_config.yml`.
