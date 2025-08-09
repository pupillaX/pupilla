---
layout: default
title: Preprints
permalink: /preprints/
---

# Preprints

<ul class="preprint-list">
  {% assign items = site['pupilla-preprints'] | sort: 'date' | reverse %}
  {% for item in items %}
    <li>
      <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
      {% if item.authors %}
        <span class="authors">— {{ item.authors | join: ', ' }}</span>
      {% endif %}
      {% if item.discipline %}
        <span class="discipline">[{{ item.discipline }}]</span>
      {% endif %}
      {% if item.date %}
        <time datetime="{{ item.date | date_to_xmlschema }}">{{ item.date | date: '%Y-%m-%d' }}</time>
      {% endif %}
    </li>
  {% endfor %}
  {% if items.size == 0 %}
    <li>No preprints found.</li>
  {% endif %}
  </ul>

