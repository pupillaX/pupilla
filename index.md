---
layout: default
title: Home
---

<section class="hero">
  <div class="hero-text">
    <h1 class="site-title">Pupilla</h1>
    <p class="site-blurb">A multidisciplinary preprint archive inspired by Chiara Lubich’s spirituality of unity.</p>
    {% include search.html %}
  </div>
  <div class="hero-media">
    <img src="{{ '/assets/images/logo.png' | relative_url }}" alt="Pupilla logo" />
  </div>
</section>

<section>
  <h2>Latest preprints</h2>
  <ul class="preprint-list">
    {% assign items = site['pupilla-preprints'] | sort: 'date' | reverse | slice: 0, 5 %}
    {% for item in items %}
      <li>
        <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
        {% if item.authors %}<span class="authors">— {{ item.authors | join: ', ' }}</span>{% endif %}
      </li>
    {% endfor %}
  </ul>
</section>
