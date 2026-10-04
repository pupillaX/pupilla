---
layout: default
title: Contributors
permalink: /contributors/
---

# Contributors

<div class="contributors-grid">
  {% assign all_works = site['pupilla-preprints'] | concat: site['pupilla-essays'] | sort: 'date' | reverse %}
  {% for c in site.data.contributors %}
  {% assign works = '' | split: '' %}
  {% for w in all_works %}{% unless w.coming_soon %}
    {% assign mine = false %}
    {% for a in w.authors %}{% if a == c.name or c.aliases contains a %}{% assign mine = true %}{% endif %}{% endfor %}
    {% if mine %}{% assign works = works | push: w %}{% endif %}
  {% endunless %}{% endfor %}
  <div class="contributor-card" id="{{ c.slug }}">
    <div class="contributor-photo">
      <img src="{{ '/assets/images/contributors/' | append: c.photo | relative_url }}" alt="{{ c.name }}" loading="lazy" />
    </div>
    <div class="contributor-info">
      <h2>{{ c.name }}</h2>
      {% if c.role %}<p class="role">{{ c.role }}</p>{% endif %}
      {% if c.bio %}<p class="bio">{{ c.bio }}</p>{% endif %}
      {% if c.links and c.links.size > 0 %}
      <p class="contributor-links">
        {% for link in c.links %}<a href="{{ link.url }}" target="_blank" rel="noopener">{{ link.label }}</a>{% unless forloop.last %}<span class="sep">·</span>{% endunless %}{% endfor %}
      </p>
      {% endif %}
      {% if works.size > 0 %}
      <div class="contributor-works">
        <h3 class="works-label">On Pupilla <span class="works-count">{{ works.size }}</span></h3>
        <ul>
          {% for w in works %}
          <li>
            {% if w.collection == 'pupilla-essays' %}<span class="type-tag type-essay">Essay</span>{% else %}<span class="type-tag type-article">Article</span>{% endif %}
            <span class="work-text"><a href="{{ w.url | relative_url }}">{{ w.title }}</a> <span class="work-year">{{ w.date | date: '%Y' }}</span></span>
          </li>
          {% endfor %}
        </ul>
      </div>
      {% endif %}
    </div>
  </div>
  {% endfor %}
</div>

**Interested in contributing?** [Contact us]({{ '/contact/' | relative_url }}) directly.
