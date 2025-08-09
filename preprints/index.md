---
layout: default
title: Home
---

<section class="hero">
  <div class="hero-text">
    <h1 class="site-title">Welcome to Pupilla</h1>
    <p class="site-blurb">A multidisciplinary preprint archive inspired by the spirituality of unity.</p>
    {% include search.html %}
    <div class="hero-stats">
      <span class="stat-item">📚 {{ site['pupilla-preprints'].size }} Preprints</span>
      <span class="stat-item">🌍 {{ site['pupilla-preprints'] | map: 'discipline' | uniq | size }} Disciplines</span>
      <span class="stat-item">👥 {{ site['pupilla-preprints'] | map: 'authors' | flatten | uniq | size }} Contributors</span>
    </div>
  </div>
  <div class="hero-media">
    <img src="{{ '/assets/images/logo.png' | relative_url }}" alt="Pupilla logo - representing unity in diversity of knowledge" />
  </div>
</section>

<section class="latest-preprints">
  <div class="section-header">
    <h2>Latest Preprints</h2>
    <a href="{{ '/preprints/' | relative_url }}" class="view-all-link">View All →</a>
  </div>
  
  <div class="preprint-grid">
    {% assign recent_items = site['pupilla-preprints'] | sort: 'date' | reverse | slice: 0, 6 %}
    {% for item in recent_items %}
      <article class="preprint-card">
        <div class="preprint-meta">
          {% if item.discipline %}
            <span class="discipline-tag">{{ item.discipline }}</span>
          {% endif %}
          {% if item.date %}
            <span class="date">{{ item.date | date: '%b %d, %Y' }}</span>
          {% endif %}
        </div>
        
        <h3 class="preprint-title">
          <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
        </h3>
        
        {% if item.authors %}
          <p class="preprint-authors">{{ item.authors | join: ', ' }}</p>
        {% endif %}
        
        {% if item.abstract %}
          <p class="preprint-abstract">{{ item.abstract | truncate: 120 }}</p>
        {% endif %}
        
        <div class="preprint-actions">
          <a href="{{ item.url | relative_url }}" class="read-more">Read More</a>
          {% if item.pdf %}
            <a href="{{ item.pdf | relative_url }}" target="_blank" rel="noopener" class="download-pdf" onclick="gtag('event', 'pdf_download', {'file_name': '{{ item.pdf }}', 'page_title': '{{ item.title }}'});">📄 PDF</a>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
</section>

<section class="disciplines-overview">
  <h2>Browse by Discipline</h2>
  <div class="discipline-grid">
    {% assign disciplines = site['pupilla-preprints'] | map: 'discipline' | uniq | sort %}
    {% for discipline in disciplines limit: 8 %}
      {% if discipline %}
        {% assign discipline_count = site['pupilla-preprints'] | where: 'discipline', discipline | size %}
        <a href="{{ '/disciplines/' | append: discipline | slugify | append: '/' | relative_url }}" class="discipline-card">
          <h3>{{ discipline }}</h3>
          <span class="count">{{ discipline_count }} preprint{% if discipline_count != 1 %}s{% endif %}</span>
        </a>
      {% endif %}
    {% endfor %}
  </div>
  
  {% if disciplines.size > 8 %}
    <div class="text-center mt-lg">
      <a href="{{ '/disciplines/' | relative_url }}" class="btn">View All Disciplines</a>
    </div>
  {% endif %}
</section>

<!-- <section class="about-preview">
  <div class="about-content">
    <h2>About Pupilla</h2>
    <p>Pupilla is more than just a preprint server—it's a platform built on the principles of unity and collaboration that Chiara Lubich championed. We believe that knowledge flourishes when shared across disciplines, cultures, and perspectives.</p>
    <p>Our mission is to create a space where researchers from all fields can contribute to the collective understanding of our world, fostering dialogue and cooperation in the spirit of unity.</p>
    <a href="{{ '/about/' | relative_url }}" class="btn">Learn More</a>
  </div>
</section> -->