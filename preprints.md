---
layout: default
title: Browse Articles
permalink: /preprints/
---

# Articles

{% assign all_preprints = site['pupilla-preprints'] | sort: 'date' | reverse %}

<div class="browse-controls">
  <div class="filter-section">
    <label for="search-input">Search</label>
    <input type="text" id="search-input" placeholder="Search titles, authors, abstracts…" />

    <label for="language-filter">Language</label>
    <select id="language-filter">
      <option value="all">All</option>
      {% assign all_languages = '' | split: '' %}
      {% for preprint in all_preprints %}
        {% if preprint.languages %}{% for lang in preprint.languages %}{% assign all_languages = all_languages | push: lang %}{% endfor %}{% endif %}
      {% endfor %}
      {% assign languages = all_languages | uniq | sort %}
      {% for language in languages %}<option value="{{ language | slugify }}">{{ language }}</option>{% endfor %}
    </select>

    <label for="author-filter">Author</label>
    <select id="author-filter">
      <option value="all">All</option>
      {% assign all_authors = '' | split: '' %}
      {% for preprint in all_preprints %}
        {% if preprint.authors %}{% for author in preprint.authors %}{% assign all_authors = all_authors | push: author %}{% endfor %}{% endif %}
      {% endfor %}
      {% assign authors = all_authors | uniq | sort %}
      {% for author in authors %}<option value="{{ author | slugify }}">{{ author }}</option>{% endfor %}
    </select>

    <label for="sort-order">Sort</label>
    <select id="sort-order">
      <option value="date-desc">Newest first</option>
      <option value="date-asc">Oldest first</option>
      <option value="title-asc">Title A–Z</option>
      <option value="title-desc">Title Z–A</option>
      <option value="author-asc">Author A–Z</option>
    </select>
  </div>
</div>

<div id="browse-list" class="archive-list">
  {% for preprint in all_preprints %}
    {% comment %} Build per-value slug lists so multi-word names survive {% endcomment %}
    {% capture author_slugs %}{% for a in preprint.authors %}{{ a | slugify }}{% unless forloop.last %}|{% endunless %}{% endfor %}{% endcapture %}
    {% capture lang_slugs %}{% for l in preprint.languages %}{{ l | slugify }}{% unless forloop.last %}|{% endunless %}{% endfor %}{% endcapture %}
    {% capture search_content %}{{ preprint.title }} {{ preprint.authors | join: ' ' }} {{ preprint.abstract }} {{ preprint.keywords | join: ' ' }}{% if preprint.abstracts %}{% for a in preprint.abstracts %} {{ a.content }}{% endfor %}{% endif %}{% endcapture %}
    <article class="archive-item"
      data-date="{{ preprint.date | date: '%Y-%m-%d' }}"
      data-title="{{ preprint.title | downcase | escape }}"
      data-author="{{ preprint.authors | first | slugify }}"
      data-authors="{{ author_slugs }}"
      data-languages="{{ lang_slugs }}"
      data-search="{{ search_content | strip_newlines | downcase | escape }}">
      <div class="archive-meta">
        <span class="type-tag type-article">Article</span>
        {% include lang-badges.html item=preprint %}
        {% if preprint.coming_soon %}
          <span class="coming-soon-tag">Coming soon</span>
        {% elsif preprint.date %}
          <span class="archive-date">{{ preprint.date | date: '%b %-d, %Y' }}</span>
        {% endif %}
      </div>
      <h3 class="archive-title"><a href="{{ preprint.url | relative_url }}">{{ preprint.title }}</a></h3>
      {% if preprint.authors %}
        <p class="archive-authors">
          {% for author in preprint.authors %}{% include author-link.html author=author %}{% unless forloop.last %}, {% endunless %}{% endfor %}
        </p>
      {% endif %}
      {% if preprint.abstract %}<p class="archive-summary">{{ preprint.abstract | strip_html | truncate: 280 }}</p>{% endif %}
      <div class="archive-links">
        <a href="{{ preprint.url | relative_url }}">Read →</a>
        {% unless preprint.coming_soon %}
          {% if preprint.pdfs %}{% assign first_pdf = preprint.pdfs | first %}<a href="{{ first_pdf.url | relative_url }}" target="_blank" rel="noopener">PDF</a>{% elsif preprint.pdf %}<a href="{{ preprint.pdf | relative_url }}" target="_blank" rel="noopener">PDF</a>{% endif %}
        {% endunless %}
        {% if preprint.doi %}<a class="doi" href="https://doi.org/{{ preprint.doi }}" target="_blank" rel="noopener">DOI: {{ preprint.doi }}</a>{% endif %}
      </div>
    </article>
  {% endfor %}
</div>

<div id="no-results" class="no-results" style="display: none;">No articles match your search and filters.</div>

<script src="{{ '/assets/js/browse-filter.js' | relative_url }}"></script>
