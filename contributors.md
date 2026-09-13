---
layout: default
title: Contributors
permalink: /contributors/
---

# Contributors

<div class="contributors-grid">
  {% for c in site.data.contributors %}
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
    </div>
  </div>
  {% endfor %}
</div>

**Interested in contributing?** [Contact us]({{ '/contact/' | relative_url }}) directly.
