// Shared client-side filter/sort for the article & essay browse lists.
// Expects: a container #browse-list of .archive-item elements carrying
// data-languages, data-authors, data-author, data-date, data-title, data-search;
// optional controls #search-input, #language-filter, #author-filter, #sort-order;
// and an optional #no-results element.
document.addEventListener('DOMContentLoaded', function() {
  var container = document.getElementById('browse-list');
  if (!container) return;
  var languageFilter = document.getElementById('language-filter');
  var authorFilter = document.getElementById('author-filter');
  var searchInput = document.getElementById('search-input');
  var sortOrder = document.getElementById('sort-order');
  var noResults = document.getElementById('no-results');

  function apply() {
    var lang = languageFilter ? languageFilter.value : 'all';
    var author = authorFilter ? authorFilter.value : 'all';
    var q = searchInput ? searchInput.value.toLowerCase().trim() : '';
    var sort = sortOrder ? sortOrder.value : 'date-desc';
    var items = Array.prototype.slice.call(container.querySelectorAll('.archive-item'));
    var visible = 0;

    items.forEach(function(it) {
      var langs = (it.dataset.languages || '').split('|');
      var authors = (it.dataset.authors || '').split('|');
      var okLang = lang === 'all' || langs.indexOf(lang) !== -1;
      var okAuthor = author === 'all' || authors.indexOf(author) !== -1;
      var okSearch = q === '' || (it.dataset.search || '').indexOf(q) !== -1;
      var show = okLang && okAuthor && okSearch;
      it.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';

    var visibleItems = items.filter(function(p) { return p.style.display !== 'none'; });
    visibleItems.sort(function(a, b) {
      switch (sort) {
        case 'date-asc':   return new Date(a.dataset.date) - new Date(b.dataset.date);
        case 'title-asc':  return (a.dataset.title || '').localeCompare(b.dataset.title || '');
        case 'title-desc': return (b.dataset.title || '').localeCompare(a.dataset.title || '');
        case 'author-asc': return (a.dataset.author || '').localeCompare(b.dataset.author || '');
        default:           return new Date(b.dataset.date) - new Date(a.dataset.date);
      }
    });
    visibleItems.forEach(function(p) { container.appendChild(p); });
  }

  [languageFilter, authorFilter, sortOrder].forEach(function(el) {
    if (el) el.addEventListener('change', apply);
  });
  if (searchInput) searchInput.addEventListener('input', apply);
});
