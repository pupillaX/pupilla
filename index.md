---
layout: default
title: Home
---

<section class="hero">
  <div class="hero-text">
    <h1 class="site-title">Pupilla</h1>
    <p class="site-blurb">A multidisciplinary preprint archive inspired by the spirituality of unity.</p>
    {% include search.html %}
  </div>
  <div class="hero-media">
    <img src="{{ '/assets/images/logo.png' | relative_url }}" alt="Pupilla logo" />
  </div>
</section>

<section class="latest-preprints">
  <div class="section-header">
    <h2>Latest preprints</h2>
    <a href="{{ '/preprints/' | relative_url }}" class="view-all-link">View All →</a>
  </div>
  
  <div class="preprint-grid">
    {% assign items = site['pupilla-preprints'] | sort: 'date' | reverse | slice: 0, 5 %}
    {% for item in items %}
      <article class="preprint-card preprint-card-compact">
        <div class="preprint-meta">
          {% if item.discipline %}
            <span class="discipline-tag">{{ item.discipline }}</span>
          {% endif %}
          
          {% if item.language %}
            {% if item.language.size %}
              {% for lang in item.language %}
                <span class="language-tag">{{ lang }}</span>
              {% endfor %}
            {% else %}
              <span class="language-tag">{{ item.language }}</span>
            {% endif %}
          {% endif %}
          
          {% if item.coming_soon %}
            <span class="coming-soon-tag">COMING SOON</span>
          {% elsif item.date %}
            <span class="date">{{ item.date | date: '%b %d, %Y' }}</span>
          {% endif %}
        </div>
        
        <h3 class="preprint-title">
          <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
        </h3>
        
        {% if item.authors %}
          <p class="preprint-authors">{{ item.authors | join: ', ' }}</p>
        {% endif %}
        
        <div class="preprint-actions">
          <a href="{{ item.url | relative_url }}" class="read-more">Read More</a>
          {% if item.pdfs %}
            {% for pdf in item.pdfs %}
              <a href="{{ pdf.url | relative_url }}" target="_blank" rel="noopener" class="download-pdf download-pdf-compact" onclick="gtag('event', 'pdf_download', {'file_name': '{{ pdf.url }}', 'page_title': '{{ item.title }}'});">{{ pdf.flag }}</a>
            {% endfor %}
          {% elsif item.pdf %}
            <a href="{{ item.pdf | relative_url }}" target="_blank" rel="noopener" class="download-pdf download-pdf-compact" onclick="gtag('event', 'pdf_download', {'file_name': '{{ item.pdf }}', 'page_title': '{{ item.title }}'});">📄</a>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
</section>
