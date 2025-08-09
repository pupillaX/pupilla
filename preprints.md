---
layout: default
title: Browse Preprints
permalink: /preprints/
---

# Browse All Preprints

Explore our collection of scholarly works:

<div class="browse-controls">
  <div class="search-section">
    {% include search.html %}
  </div>
  
  <div class="filter-section">
    <label for="discipline-filter">Filter by Discipline:</label>
    <select id="discipline-filter">
      <option value="all">All Disciplines</option>
      {% assign disciplines = site['pupilla-preprints'] | map: 'discipline' | uniq | sort %}
      {% for discipline in disciplines %}
        {% if discipline %}
          <option value="{{ discipline | slugify }}">{{ discipline }}</option>
        {% endif %}
      {% endfor %}
    </select>
    
    <label for="sort-order">Sort by:</label>
    <select id="sort-order">
      <option value="date-desc">Newest First</option>
      <option value="date-asc">Oldest First</option>
      <option value="title-asc">Title A-Z</option>
      <option value="title-desc">Title Z-A</option>
      <option value="author-asc">Author A-Z</option>
    </select>
  </div>
</div>

## All Preprints ({{ site['pupilla-preprints'].size }})

<div id="preprints-container" class="preprints-listing">
  {% assign all_preprints = site['pupilla-preprints'] | sort: 'date' | reverse %}
  {% for preprint in all_preprints %}
    <article class="preprint-item" data-discipline="{{ preprint.discipline | slugify }}" data-date="{{ preprint.date | date: '%Y-%m-%d' }}" data-title="{{ preprint.title | downcase }}" data-author="{{ preprint.authors | first | downcase }}">
      <div class="preprint-content">
        <div class="preprint-meta">
          {% if preprint.discipline %}
            <span class="discipline-badge">{{ preprint.discipline }}</span>
          {% endif %}
          {% if preprint.date %}
            <time class="publish-date" datetime="{{ preprint.date | date: '%Y-%m-%d' }}">
              {{ preprint.date | date: '%B %d, %Y' }}
            </time>
          {% endif %}
        </div>
        
        <h3 class="preprint-title">
          <a href="{{ preprint.url | relative_url }}">{{ preprint.title }}</a>
        </h3>
        
        {% if preprint.authors %}
          <p class="preprint-authors">
            {% for author in preprint.authors %}
              <span class="author">{{ author }}</span>{% unless forloop.last %}, {% endunless %}
            {% endfor %}
          </p>
        {% endif %}
        
        {% if preprint.abstract %}
          <p class="preprint-summary">{{ preprint.abstract | truncate: 200 }}</p>
        {% endif %}
        
        <div class="preprint-links">
          <a href="{{ preprint.url | relative_url }}" class="read-link">Read Article</a>
          {% if preprint.pdf %}
            <a href="{{ preprint.pdf | relative_url }}" target="_blank" rel="noopener" class="pdf-link" onclick="gtag('event', 'pdf_download', {'file_name': '{{ preprint.pdf }}', 'page_title': '{{ preprint.title }}'});">
              📄 Download PDF
            </a>
          {% endif %}
          {% if preprint.doi %}
            <a href="https://doi.org/{{ preprint.doi }}" target="_blank" rel="noopener" class="doi-link">
              DOI: {{ preprint.doi }}
            </a>
          {% endif %}
        </div>
      </div>
    </article>
  {% endfor %}
</div>

<div id="no-results" class="no-results" style="display: none;">
  <p>No preprints match your current filters. Try adjusting your search terms or discipline filter.</p>
</div>

## Browse by Discipline

<div class="discipline-overview">
  {% assign disciplines = site['pupilla-preprints'] | map: 'discipline' | uniq | sort %}
  {% for discipline in disciplines %}
    {% if discipline %}
      {% assign discipline_count = site['pupilla-preprints'] | where: 'discipline', discipline | size %}
      <div class="discipline-summary">
        <h4>
          <a href="#" onclick="filterByDiscipline('{{ discipline | slugify }}'); return false;">
            {{ discipline }}
          </a>
        </h4>
        <span class="count">{{ discipline_count }} preprint{% if discipline_count != 1 %}s{% endif %}</span>
      </div>
    {% endif %}
  {% endfor %}
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const disciplineFilter = document.getElementById('discipline-filter');
  const sortOrder = document.getElementById('sort-order');
  const preprintsContainer = document.getElementById('preprints-container');
  const noResults = document.getElementById('no-results');
  
  function filterAndSort() {
    const selectedDiscipline = disciplineFilter.value;
    const selectedSort = sortOrder.value;
    const preprints = Array.from(document.querySelectorAll('.preprint-item'));
    
    // Filter
    let visibleCount = 0;
    preprints.forEach(preprint => {
      const discipline = preprint.dataset.discipline;
      const shouldShow = selectedDiscipline === 'all' || discipline === selectedDiscipline;
      preprint.style.display = shouldShow ? 'block' : 'none';
      if (shouldShow) visibleCount++;
    });
    
    // Show/hide no results message
    if (visibleCount === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
    
    // Sort visible items
    const visiblePreprints = preprints.filter(p => p.style.display !== 'none');
    visiblePreprints.sort((a, b) => {
      switch(selectedSort) {
        case 'date-desc':
          return new Date(b.dataset.date) - new Date(a.dataset.date);
        case 'date-asc':
          return new Date(a.dataset.date) - new Date(b.dataset.date);
        case 'title-asc':
          return a.dataset.title.localeCompare(b.dataset.title);
        case 'title-desc':
          return b.dataset.title.localeCompare(a.dataset.title);
        case 'author-asc':
          return a.dataset.author.localeCompare(b.dataset.author);
        default:
          return 0;
      }
    });
    
    // Reorder in DOM
    visiblePreprints.forEach(preprint => {
      preprintsContainer.appendChild(preprint);
    });
  }
  
  disciplineFilter.addEventListener('change', filterAndSort);
  sortOrder.addEventListener('change', filterAndSort);
  
  // Global function for discipline links
  window.filterByDiscipline = function(discipline) {
    disciplineFilter.value = discipline;
    filterAndSort();
    document.getElementById('preprints-container').scrollIntoView({ behavior: 'smooth' });
  };
});
</script>

<style>
.browse-controls {
  background: var(--background-light);
  padding: var(--spacing-lg);
  border-radius: 12px;
  margin-bottom: var(--spacing-xl);
}

.search-section {
  margin-bottom: var(--spacing-lg);
}

.filter-section {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
  flex-wrap: wrap;
}

.filter-section label {
  font-weight: 500;
  color: var(--text-primary);
}

.filter-section select {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 0.875rem;
}

.preprints-listing {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.preprint-item {
  background: var(--background-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: var(--spacing-lg);
  transition: all var(--transition-fast);
}

.preprint-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.preprint-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.discipline-badge {
  background: var(--secondary-color);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.publish-date {
  color: var(--text-muted);
  font-size: 0.875rem;
}

.preprint-title a {
  color: var(--text-primary);
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 600;
}

.preprint-title a:hover {
  color: var(--secondary-color);
}

.preprint-authors {
  color: var(--text-secondary);
  margin: var(--spacing-sm) 0;
  font-weight: 500;
}

.preprint-summary {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.preprint-links {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.preprint-links a {
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
}

.read-link {
  color: var(--secondary-color);
}

.pdf-link {
  color: var(--accent-color);
}

.doi-link {
  color: var(--text-muted);
}

.discipline-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--border-color);
}

.discipline-summary {
  padding: var(--spacing-md);
  background: var(--background-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  text-align: center;
}

.discipline-summary h4 {
  margin-bottom: var(--spacing-xs);
}

.discipline-summary a {
  color: var(--text-primary);
  text-decoration: none;
}

.discipline-summary a:hover {
  color: var(--secondary-color);
}

.discipline-summary .count {
  color: var(--text-muted);
  font-size: 0.875rem;
}

.no-results {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--text-muted);
  background: var(--background-light);
  border-radius: 12px;
}

@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-section > * {
    width: 100%;
    margin-bottom: var(--spacing-sm);
  }
  
  .preprint-links {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .discipline-overview {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .discipline-overview {
    grid-template-columns: 1fr;
  }
  
  .preprint-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }
}
</style>