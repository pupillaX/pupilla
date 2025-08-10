---
layout: default
title: Browse Preprints
permalink: /preprints/
---

<section class="browse-header">
  <h1>Browse Preprints</h1>
  <p>Explore our collection of multidisciplinary research papers</p>
  {% include search.html %}
</section>

<section class="preprints-listing">
  <div class="preprint-grid">
    {% assign all_preprints = site['pupilla-preprints'] | sort: 'date' | reverse %}
    {% for item in all_preprints %}
      <article class="preprint-card">
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
        
        {% if item.abstract %}
          <p class="preprint-abstract">{{ item.abstract | truncate: 150 }}</p>
        {% endif %}
        
        <div class="preprint-actions">
          <a href="{{ item.url | relative_url }}" class="read-more">Read More</a>
          {% if item.pdfs %}
            {% for pdf in item.pdfs %}
              <a href="{{ pdf.url | relative_url }}" target="_blank" rel="noopener" class="download-pdf" onclick="gtag('event', 'pdf_download', {'file_name': '{{ pdf.url }}', 'page_title': '{{ item.title }}'});">{{ pdf.flag }} PDF ({{ pdf.language }})</a>
            {% endfor %}
          {% elsif item.pdf %}
            <a href="{{ item.pdf | relative_url }}" target="_blank" rel="noopener" class="download-pdf" onclick="gtag('event', 'pdf_download', {'file_name': '{{ item.pdf }}', 'page_title': '{{ item.title }}'});">📄 PDF</a>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
</section>