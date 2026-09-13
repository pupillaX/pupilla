---
layout: default
title: Home
---

<section class="site-intro">
  <h1 class="site-lead">A pre-print archive with the aim of building bridges and striving for unity in diversity. Articles and essays on mysticism, spirituality, philosophy, science and mathematics: multidisciplinary, multilingual, and open to dialogue.</h1>
</section>

{% assign all_preprints = site['pupilla-preprints'] | sort: 'date' | reverse %}
{% assign all_essays = site['pupilla-essays'] | sort: 'date' | reverse %}

<section class="latest">
  <div class="section-header">
    <h2>Latest</h2>
    <span class="view-all-links">
      <a href="{{ '/preprints/' | relative_url }}" class="view-all-link">All articles ({{ all_preprints | size }}) →</a>
      <a href="{{ '/essays/' | relative_url }}" class="view-all-link">All essays ({{ all_essays | size }}) →</a>
    </span>
  </div>

  <div class="archive-list home-grid">
    {% assign published_items = "" | split: "" %}
    {% for preprint in all_preprints %}
      {% unless preprint.coming_soon == true %}
        {% assign published_items = published_items | push: preprint %}
      {% endunless %}
    {% endfor %}
    {% for essay in all_essays %}
      {% unless essay.coming_soon == true %}
        {% assign published_items = published_items | push: essay %}
      {% endunless %}
    {% endfor %}
    {% assign published_items = published_items | sort: 'date' | reverse %}
    {% assign items = published_items | slice: 0, 10 %}

    {% for item in items %}
      <article class="archive-item">
        <div class="archive-meta">
          {% if item.collection == 'pupilla-essays' %}
            <span class="type-tag type-essay">Essay</span>
          {% else %}
            <span class="type-tag type-article">Article</span>
          {% endif %}
          {% include lang-badges.html item=item %}
          {% if item.date %}<span class="archive-date">{{ item.date | date: '%b %-d, %Y' }}</span>{% endif %}
        </div>
        <h3 class="archive-title"><a href="{{ item.url | relative_url }}">{{ item.title }}</a></h3>
        {% if item.authors %}
          <p class="archive-authors">
            {% for author in item.authors %}{% include author-link.html author=author %}{% unless forloop.last %}, {% endunless %}{% endfor %}
          </p>
        {% endif %}
        {% if item.abstract %}<p class="archive-summary">{{ item.abstract | strip_html | truncate: 160 }}</p>{% endif %}
        <div class="archive-links"><a href="{{ item.url | relative_url }}">Read →</a></div>
      </article>
    {% endfor %}
  </div>
</section>

{% assign coming_soon = "" | split: "" %}
{% for preprint in all_preprints %}
  {% if preprint.coming_soon == true %}{% assign coming_soon = coming_soon | push: preprint %}{% endif %}
{% endfor %}
{% for essay in all_essays %}
  {% if essay.coming_soon == true %}{% assign coming_soon = coming_soon | push: essay %}{% endif %}
{% endfor %}

{% if coming_soon.size > 0 %}
<section class="coming">
  <div class="section-header">
    <h2>Coming soon</h2>
  </div>
  <div class="archive-list home-grid">
    {% for item in coming_soon %}
      <article class="archive-item">
        <div class="archive-meta">
          {% if item.collection == 'pupilla-essays' %}
            <span class="type-tag type-essay">Essay</span>
          {% else %}
            <span class="type-tag type-article">Article</span>
          {% endif %}
          {% include lang-badges.html item=item %}
          <span class="coming-soon-tag">Coming soon</span>
        </div>
        <h3 class="archive-title"><a href="{{ item.url | relative_url }}">{{ item.title }}</a></h3>
        {% if item.authors %}
          <p class="archive-authors">
            {% for author in item.authors %}{% include author-link.html author=author %}{% unless forloop.last %}, {% endunless %}{% endfor %}
          </p>
        {% endif %}
      </article>
    {% endfor %}
  </div>
</section>
{% endif %}
