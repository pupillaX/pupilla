---
layout: default
title: Essays
permalink: /essays/
---

# Browse All Essays

Explore our collection of full-text essays:

<div class="browse-controls">
  <div class="filter-section">
    <label for="search-input">Search:</label>
    <input type="text" id="search-input" placeholder="Search titles and abstracts..." />
    
    <label for="language-filter">Filter by Language:</label>
    <select id="language-filter">
      <option value="all">All Languages</option>
      {% assign all_languages = '' | split: '' %}
      {% for article in site['pupilla-essays'] %}
        {% if article.languages %}
          {% for lang in article.languages %}
            {% assign all_languages = all_languages | push: lang %}
          {% endfor %}
        {% elsif article.language %}
          {% if article.language.size %}
            {% for lang in article.language %}
              {% assign all_languages = all_languages | push: lang %}
            {% endfor %}
          {% else %}
            {% assign all_languages = all_languages | push: article.language %}
          {% endif %}
        {% endif %}
      {% endfor %}
      {% assign languages = all_languages | uniq | sort %}
      {% for language in languages %}
        {% if language %}
          <option value="{{ language | slugify }}">{{ language }}</option>
        {% endif %}
      {% endfor %}
    </select>
    
    <label for="author-filter">Filter by Author:</label>
    <select id="author-filter">
      <option value="all">All Authors</option>
      {% assign all_authors = '' | split: '' %}
      {% for article in site['pupilla-essays'] %}
        {% if article.authors %}
          {% for author in article.authors %}
            {% assign all_authors = all_authors | push: author %}
          {% endfor %}
        {% endif %}
      {% endfor %}
      {% assign authors = all_authors | uniq | sort %}
      {% for author in authors %}
        {% if author %}
          <option value="{{ author | slugify }}">{{ author }}</option>
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

## All Essays ({{ site['pupilla-essays'].size }})

<div id="essays-container" class="preprints-listing">
  {% assign all_articles = site['pupilla-essays'] | sort: 'date' | reverse %}
  {% assign published_articles = "" | split: "" %}
  {% assign coming_soon_articles = "" | split: "" %}
  
  {% for article in all_articles %}
    {% if article.coming_soon == true %}
      {% assign coming_soon_articles = coming_soon_articles | push: article %}
    {% else %}
      {% assign published_articles = published_articles | push: article %}
    {% endif %}
  {% endfor %}
  
  {% assign sorted_articles = coming_soon_articles | concat: published_articles %}
  {% for article in sorted_articles %}
    {% assign article_languages = '' %}
    {% if article.languages %}
      {% assign article_languages = article.languages | join: ' ' | slugify %}
    {% elsif article.language %}
      {% if article.language.size %}
        {% assign article_languages = article.language | join: ' ' | slugify %}
      {% else %}
        {% assign article_languages = article.language | slugify %}
      {% endif %}
    {% endif %}
    {% assign search_content = article.title | downcase %}
    {% if article.abstract %}
      {% assign search_content = search_content | append: ' ' | append: article.abstract | downcase %}
    {% endif %}
    {% if article.abstracts %}
      {% for abstract in article.abstracts %}
        {% assign search_content = search_content | append: ' ' | append: abstract.content | downcase %}
      {% endfor %}
    {% endif %}
    {% if article.keywords %}
      {% assign keywords_string = article.keywords | join: ' ' | downcase %}
      {% assign search_content = search_content | append: ' ' | append: keywords_string %}
    {% endif %}
    {% if article.authors %}
      {% assign authors_string = article.authors | join: ' ' | downcase %}
      {% assign search_content = search_content | append: ' ' | append: authors_string %}
    {% endif %}
    <article class="preprint-item" data-languages="{{ article_languages }}" data-date="{{ article.date | date: '%Y-%m-%d' }}" data-title="{{ article.title | downcase }}" data-author="{{ article.authors | first | downcase }}" data-authors="{{ article.authors | join: '|' | slugify }}" data-search="{{ search_content | strip | replace: '"', '&quot;' }}">
      <div class="preprint-content">
        <div class="preprint-meta">
          <div class="tags-section">
            {% if article.languages %}
              {% for lang in article.languages %}
                <span class="language-badge">{{ lang }}</span>
              {% endfor %}
            {% elsif article.language %}
              {% if article.language.size %}
                {% for lang in article.language %}
                  <span class="language-badge">{{ lang }}</span>
                {% endfor %}
              {% else %}
                <span class="language-badge">{{ article.language }}</span>
              {% endif %}
            {% endif %}
            {% if article.coming_soon %}
              <span class="coming-soon-tag">COMING SOON</span>
            {% endif %}
          </div>
          {% if article.date and article.coming_soon != true %}
            <time class="publish-date" datetime="{{ article.date | date: '%Y-%m-%d' }}">
              {{ article.date | date: '%B %d, %Y' }}
            </time>
          {% endif %}
        </div>
        
        <h3 class="preprint-title">
          <a href="{{ article.url | relative_url }}">{{ article.title }}</a>
        </h3>
        
        {% if article.authors %}
          <p class="preprint-authors">
            {% for author in article.authors %}{% include author-link.html author=author %}{% unless forloop.last %}, {% endunless %}{% endfor %}
          </p>
        {% endif %}
        
        {% if article.abstract %}
          <p class="preprint-summary">{{ article.abstract | truncate: 350 }}</p>
        {% endif %}
        
        <div class="preprint-links">
          <a href="{{ article.url | relative_url }}" class="read-link">Read Essay</a>
          {% if article.coming_soon %}
            <!-- No PDF buttons shown for coming soon items in browse view -->
          {% else %}
            {% if article.pdf %}
              <a href="{{ article.pdf | relative_url }}" target="_blank" rel="noopener" class="pdf-link" onclick="gtag('event', 'pdf_download', {'file_name': '{{ article.pdf }}', 'page_title': '{{ article.title }}'});">
                📄 Download PDF
              </a>
            {% endif %}
          {% endif %}
          {% if article.doi %}
            <a href="https://doi.org/{{ article.doi }}" target="_blank" rel="noopener" class="doi-link">
              DOI: {{ article.doi }}
            </a>
          {% endif %}
        </div>
      </div>
    </article>
  {% endfor %}
</div>

<div id="no-results" class="no-results" style="display: none;">
  <p>No essays match your current search and filters. Try adjusting your search terms or filter settings.</p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const languageFilter = document.getElementById('language-filter');
  const authorFilter = document.getElementById('author-filter');
  const searchInput = document.getElementById('search-input');
  const sortOrder = document.getElementById('sort-order');
  const articlesContainer = document.getElementById('essays-container');
  const noResults = document.getElementById('no-results');
  
  function filterAndSort() {
    const selectedLanguage = languageFilter.value;
    const selectedAuthor = authorFilter.value;
    const searchQuery = searchInput.value.toLowerCase().trim();
    const selectedSort = sortOrder.value;
    const articles = Array.from(document.querySelectorAll('.preprint-item'));
    
    // Filter
    let visibleCount = 0;
    articles.forEach(article => {
      const languages = article.dataset.languages;
      const authors = article.dataset.authors;
      const searchContent = article.dataset.search;
      
      const languageMatch = selectedLanguage === 'all' || (languages && languages.split('-').includes(selectedLanguage));
      const authorMatch = selectedAuthor === 'all' || (authors && authors.includes(selectedAuthor));
      const searchMatch = searchQuery === '' || (searchContent && searchContent.includes(searchQuery));
      
      const shouldShow = languageMatch && authorMatch && searchMatch;
      article.style.display = shouldShow ? 'block' : 'none';
      if (shouldShow) visibleCount++;
    });
    
    // Show/hide no results message
    if (visibleCount === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
    
    // Sort visible items
    const visibleArticles = articles.filter(a => a.style.display !== 'none');
    visibleArticles.sort((a, b) => {
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
    visibleArticles.forEach(article => {
      articlesContainer.appendChild(article);
    });
  }
  
  languageFilter.addEventListener('change', filterAndSort);
  authorFilter.addEventListener('change', filterAndSort);
  searchInput.addEventListener('input', filterAndSort);
  sortOrder.addEventListener('change', filterAndSort);
});
</script>

<style>
.browse-controls {
  background: var(--background-light);
  padding: var(--spacing-lg);
  border-radius: 12px;
  margin-bottom: var(--spacing-xl);
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
  background: var(--background);
  color: var(--text-primary);
  font-size: 0.9rem;
  min-width: 120px;
}

.filter-section input[type="text"] {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--background);
  color: var(--text-primary);
  font-size: 0.9rem;
  min-width: 200px;
  transition: border-color var(--transition-fast);
}

.filter-section input[type="text"]:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
}

.preprints-listing {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
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

.preprint-item .tags-section {
  margin-bottom: 0;
}

.preprint-item .preprint-content {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
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
}

@media (max-width: 480px) {
  .preprint-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }
}
</style>
