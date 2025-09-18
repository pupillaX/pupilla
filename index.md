---
layout: default
title: Home
---

<!-- <section class="hero">
  <div class="hero-text">
    <h1 class="site-title">Pupilla</h1>
    <p class="site-blurb">A multidisciplinary preprint archive with the aim of building bridges and striving for unity in diversity.</p>
    <!-- {% include search.html %}
  </div>
  <div class="hero-media">
    <img src="{{ '/assets/images/logo.png' | relative_url }}" alt="Pupilla logo" />
  </div>
</section> -->

<section class="latest-preprints">
  <div class="section-header">
    <h2>Latest preprints</h2>
    <a href="{{ '/preprints/' | relative_url }}" class="view-all-link">View All {{ site['pupilla-preprints'] | size }} →</a>
  </div>
  
  <div class="preprint-grid">
    {% assign all_preprints = site['pupilla-preprints'] | sort: 'date' | reverse %}
    {% assign published_preprints = "" | split: "" %}
    
    {% for preprint in all_preprints %}
      {% unless preprint.coming_soon == true %}
        {% assign published_preprints = published_preprints | push: preprint %}
      {% endunless %}
    {% endfor %}
    
    {% assign items = published_preprints | slice: 0, 6 %}
    {% for item in items %}
      <article class="preprint-card preprint-card-compact">
        <div class="preprint-meta">
          {% if item.date %}
            <span class="date">{{ item.date | date: '%b %d, %Y' }}</span>
          {% endif %}
        </div>
        
        <h3 class="preprint-title">
          <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
        </h3>
        
        {% if item.authors %}
          <p class="preprint-authors">
            {% for author in item.authors %}
              {% if author == "Ján Morovic" %}
                <a href="{{ '/contributors/' | relative_url }}#jan-morovic" class="author-link">{{ author }}</a>{% unless forloop.last %}, {% endunless %}
              {% elsif author == "Peter Morovic" %}
                <a href="{{ '/contributors/' | relative_url }}#peter-morovic" class="author-link">{{ author }}</a>{% unless forloop.last %}, {% endunless %}
              {% elsif author == "Jordi Rodriguez Salleras" or author == "Jordi Rodríguez Salleras" %}
                <a href="{{ '/contributors/' | relative_url }}#jordi-rodriguez-salleras" class="author-link">{{ author }}</a>{% unless forloop.last %}, {% endunless %}
              {% elsif author == "Lucas Cervino" or author == "Lucas Cerviño" %}
                <a href="{{ '/contributors/' | relative_url }}#lucas-cervino" class="author-link">{{ author }}</a>{% unless forloop.last %}, {% endunless %}
              {% elsif author == "Ugo Gianazza" %}
                <a href="{{ '/contributors/' | relative_url }}#ugo-gianazza" class="author-link">{{ author }}</a>{% unless forloop.last %}, {% endunless %}
              {% elsif author == "Luca Magri" %}
                <a href="{{ '/contributors/' | relative_url }}#luca-magri" class="author-link">{{ author }}</a>{% unless forloop.last %}, {% endunless %}
              {% else %}
                {{ author }}{% unless forloop.last %}, {% endunless %}
              {% endif %}
            {% endfor %}
          </p>
        {% endif %}
        
        <div class="preprint-actions">
          <a href="{{ item.url | relative_url }}" class="read-more">Read More</a>
          <!-- Show non-clickable flags for available languages -->
          {% if item.pdfs %}
            {% for pdf in item.pdfs %}
              <span class="language-indicator" title="Available in {{ pdf.language }}">{{ pdf.flag }}</span>
            {% endfor %}
          {% elsif item.abstracts %}
            {% for abstract in item.abstracts %}
              <span class="language-indicator" title="Available in {{ abstract.language }}">{{ abstract.flag | default: "📄" }}</span>
            {% endfor %}
          {% elsif item.pdf %}
            <span class="language-indicator" title="PDF available">📄</span>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
</section>

<section class="coming-soon-preprints">
  <div class="section-header">
    <h2>Coming soon</h2>
  </div>
  
  <div class="preprint-grid">
    {% assign coming_soon_preprints = "" | split: "" %}
    
    {% for preprint in all_preprints %}
      {% if preprint.coming_soon == true %}
        {% assign coming_soon_preprints = coming_soon_preprints | push: preprint %}
      {% endif %}
    {% endfor %}
    
    {% for item in coming_soon_preprints %}
      <article class="preprint-card preprint-card-compact">
        <div class="preprint-meta">
          <span class="coming-soon-tag">COMING SOON</span>
        </div>
        
        <h3 class="preprint-title">
          <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
        </h3>
        
        {% if item.authors %}
          <p class="preprint-authors">
            {% for author in item.authors %}
              {% if author == "Ján Morovic" %}
                <a href="{{ '/contributors/' | relative_url }}#jan-morovic" class="author-link">{{ author }}</a>{% unless forloop.last %}, {% endunless %}
              {% elsif author == "Peter Morovic" %}
                <a href="{{ '/contributors/' | relative_url }}#peter-morovic" class="author-link">{{ author }}</a>{% unless forloop.last %}, {% endunless %}
              {% elsif author == "Jordi Rodriguez Salleras" or author == "Jordi Rodríguez Salleras" %}
                <a href="{{ '/contributors/' | relative_url }}#jordi-rodriguez-salleras" class="author-link">{{ author }}</a>{% unless forloop.last %}, {% endunless %}
              {% elsif author == "Lucas Cervino" or author == "Lucas Cerviño" %}
                <a href="{{ '/contributors/' | relative_url }}#lucas-cervino" class="author-link">{{ author }}</a>{% unless forloop.last %}, {% endunless %}
              {% elsif author == "Ugo Gianazza" %}
                <a href="{{ '/contributors/' | relative_url }}#ugo-gianazza" class="author-link">{{ author }}</a>{% unless forloop.last %}, {% endunless %}
              {% elsif author == "Luca Magri" %}
                <a href="{{ '/contributors/' | relative_url }}#luca-magri" class="author-link">{{ author }}</a>{% unless forloop.last %}, {% endunless %}
              {% else %}
                {{ author }}{% unless forloop.last %}, {% endunless %}
              {% endif %}
            {% endfor %}
          </p>
        {% endif %}
        
        <div class="preprint-actions">
          <a href="{{ item.url | relative_url }}" class="read-more">Read More</a>
          <!-- Show language indicators for coming soon items, only for languages with planned PDFs -->
          {% if item.pdfs %}
            {% for pdf in item.pdfs %}
              <span class="language-indicator" title="PDF will be available soon in {{ pdf.language }}">{{ pdf.flag | default: "📄" }}</span>
            {% endfor %}
          {% elsif item.abstracts %}
            {% for abstract in item.abstracts %}
              <span class="language-indicator" title="PDF will be available soon in {{ abstract.language }}">{{ abstract.flag | default: "📄" }}</span>
            {% endfor %}
          {% else %}
            <span class="language-indicator" title="PDF will be available soon">📄</span>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
</section>
