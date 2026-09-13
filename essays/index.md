---
layout: default
title: Essays
permalink: /essays/
---

# Essays

{% assign all_essays = site['pupilla-essays'] | sort: 'date' | reverse %}

<div class="browse-controls">
  <div class="filter-section">
    <label for="search-input">Search</label>
    <input type="text" id="search-input" placeholder="Search titles, authors, abstracts…" />

    <label for="language-filter">Language</label>
    <select id="language-filter">
      <option value="all">All</option>
      {% assign all_languages = '' | split: '' %}
      {% for essay in all_essays %}
        {% if essay.languages %}{% for lang in essay.languages %}{% assign all_languages = all_languages | push: lang %}{% endfor %}{% endif %}
      {% endfor %}
      {% assign languages = all_languages | uniq | sort %}
      {% for language in languages %}<option value="{{ language | slugify }}">{{ language }}</option>{% endfor %}
    </select>

    <label for="author-filter">Author</label>
    <select id="author-filter">
      <option value="all">All</option>
      {% assign all_authors = '' | split: '' %}
      {% for essay in all_essays %}
        {% if essay.authors %}{% for author in essay.authors %}{% assign all_authors = all_authors | push: author %}{% endfor %}{% endif %}
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
  {% for essay in all_essays %}
    {% capture author_slugs %}{% for a in essay.authors %}{{ a | slugify }}{% unless forloop.last %}|{% endunless %}{% endfor %}{% endcapture %}
    {% capture lang_slugs %}{% for l in essay.languages %}{{ l | slugify }}{% unless forloop.last %}|{% endunless %}{% endfor %}{% endcapture %}
    {% capture search_content %}{{ essay.title }} {{ essay.authors | join: ' ' }} {{ essay.abstract }} {{ essay.keywords | join: ' ' }}{% if essay.abstracts %}{% for a in essay.abstracts %} {{ a.content }}{% endfor %}{% endif %}{% endcapture %}
    <article class="archive-item"
      data-date="{{ essay.date | date: '%Y-%m-%d' }}"
      data-title="{{ essay.title | downcase | escape }}"
      data-author="{{ essay.authors | first | slugify }}"
      data-authors="{{ author_slugs }}"
      data-languages="{{ lang_slugs }}"
      data-search="{{ search_content | strip_newlines | downcase | escape }}">
      <div class="archive-meta">
        <span class="type-tag type-essay">Essay</span>
        {% include lang-badges.html item=essay %}
        {% if essay.coming_soon %}
          <span class="coming-soon-tag">Coming soon</span>
        {% elsif essay.date %}
          <span class="archive-date">{{ essay.date | date: '%b %-d, %Y' }}</span>
        {% endif %}
      </div>
      <h3 class="archive-title"><a href="{{ essay.url | relative_url }}">{{ essay.title }}</a></h3>
      {% if essay.authors %}
        <p class="archive-authors">
          {% for author in essay.authors %}{% include author-link.html author=author %}{% unless forloop.last %}, {% endunless %}{% endfor %}
        </p>
      {% endif %}
      {% if essay.abstract %}<p class="archive-summary">{{ essay.abstract | strip_html | truncate: 280 }}</p>{% endif %}
      <div class="archive-links">
        <a href="{{ essay.url | relative_url }}">Read →</a>
        {% unless essay.coming_soon %}
          {% if essay.pdfs %}{% assign first_pdf = essay.pdfs | first %}<a href="{{ first_pdf.url | relative_url }}" target="_blank" rel="noopener">PDF</a>{% elsif essay.pdf %}<a href="{{ essay.pdf | relative_url }}" target="_blank" rel="noopener">PDF</a>{% endif %}
        {% endunless %}
        {% if essay.doi %}<a class="doi" href="https://doi.org/{{ essay.doi }}" target="_blank" rel="noopener">DOI: {{ essay.doi }}</a>{% endif %}
      </div>
    </article>
  {% endfor %}
</div>

<div id="no-results" class="no-results" style="display: none;">No essays match your search and filters.</div>

<script src="{{ '/assets/js/browse-filter.js' | relative_url }}"></script>
