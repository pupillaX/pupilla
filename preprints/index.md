---
layout: default
title: Browse Preprints
permalink: /preprints/
---

<section class="browse-header">
  <h1>Browse Preprints</h1>
  <p>Explore our collection of multidisciplinary research papers</p>
  <!-- Search commented out - can be restored later -->
  <!-- {% include search.html %} -->
</section>

<section class="preprints-listing">
  <div class="preprint-grid">
    {% assign all_preprints = site['pupilla-preprints'] | sort: 'date' | reverse %}
    {% assign published_preprints = "" | split: "" %}
    {% assign coming_soon_preprints = "" | split: "" %}
    
    {% for preprint in all_preprints %}
      {% if preprint.coming_soon == true %}
        {% assign coming_soon_preprints = coming_soon_preprints | push: preprint %}
      {% else %}
        {% assign published_preprints = published_preprints | push: preprint %}
      {% endif %}
    {% endfor %}
    
    {% assign sorted_preprints = published_preprints | concat: coming_soon_preprints %}
    {% for item in sorted_preprints %}
      <article class="preprint-card">
        <div class="preprint-meta">
          <!-- Discipline tags removed - can be restored if needed -->
          
          {% if item.coming_soon %}
            <!-- Show language indicators for coming soon items, only for languages with planned PDFs -->
            {% if item.pdfs %}
              {% for pdf in item.pdfs %}
                <span class="language-tag">{{ pdf.language }}</span>
              {% endfor %}
            {% elsif item.abstracts %}
              {% for abstract in item.abstracts %}
                <span class="language-tag">{{ abstract.language }}</span>
              {% endfor %}
            {% else %}
              <span class="language-tag">PDF</span>
            {% endif %}
          {% else %}
            <!-- Show language tags for available PDFs only -->
            {% if item.pdfs %}
              {% for pdf in item.pdfs %}
                <span class="language-tag">{{ pdf.language }}</span>
              {% endfor %}
            {% elsif item.pdf %}
              <span class="language-tag">PDF</span>
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
              <a href="{{ pdf.url | relative_url }}" target="_blank" rel="noopener" class="download-pdf" onclick="gtag('event', 'file_download', {'file_name': '{{ pdf.url }}', 'file_extension': 'pdf', 'page_title': '{{ item.title }}', 'language': '{{ pdf.language }}', 'send_to': '{{ site.google_analytics }}'});">{{ pdf.flag }} PDF ({{ pdf.language }})</a>
            {% endfor %}
          {% elsif item.pdf %}
            <a href="{{ item.pdf | relative_url }}" target="_blank" rel="noopener" class="download-pdf" onclick="gtag('event', 'file_download', {'file_name': '{{ item.pdf }}', 'file_extension': 'pdf', 'page_title': '{{ item.title }}', 'send_to': '{{ site.google_analytics }}'});">📄 PDF</a>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
</section>