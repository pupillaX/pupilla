// Shared client-side filter/sort for the article & essay browse lists.
// Expects: a container #browse-list of .archive-item elements carrying
// data-languages, data-authors, data-author, data-date, data-title, data-search;
// optional controls #search-input, #language-filter, #author-filter, #sort-order;
// and an optional #no-results element.
//
// - Search ignores case and accents ("zizek" finds "Žižek", "lleo" finds "Lleó") and
//   every word typed must match, in any order ("lubich morovic").
// - The current filters live in the address bar (?q=…&language=…&author=…&sort=…), so a
//   filtered list can be bookmarked or shared as a plain link.
document.addEventListener('DOMContentLoaded', function() {
  var container = document.getElementById('browse-list');
  if (!container) return;
  var languageFilter = document.getElementById('language-filter');
  var authorFilter = document.getElementById('author-filter');
  var searchInput = document.getElementById('search-input');
  var sortOrder = document.getElementById('sort-order');
  var noResults = document.getElementById('no-results');

  // Letters that Unicode decomposition does not strip down to ASCII.
  var EXTRA = { 'ł': 'l', 'đ': 'd', 'ø': 'o', 'ß': 'ss', 'æ': 'ae', 'œ': 'oe', 'ı': 'i', 'ð': 'd', 'þ': 'th' };
  function fold(s) {
    return (s || '').toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[łđøßæœıðþ]/g, function(c) { return EXTRA[c]; });
  }

  var items = Array.prototype.slice.call(container.querySelectorAll('.archive-item'));
  var index = items.map(function(it) { return fold(it.dataset.search); });

  // ---- restore state from the URL ----
  var params = new URLSearchParams(window.location.search);
  function restoreSelect(el, key) {
    var v = params.get(key);
    if (!el || !v) return;
    for (var i = 0; i < el.options.length; i++) if (el.options[i].value === v) { el.value = v; return; }
  }
  if (searchInput && params.get('q')) searchInput.value = params.get('q');
  restoreSelect(languageFilter, 'language');
  restoreSelect(authorFilter, 'author');
  restoreSelect(sortOrder, 'sort');

  function syncUrl(q, lang, author, sort) {
    if (!window.history || !history.replaceState) return;
    var p = new URLSearchParams();
    if (q) p.set('q', q);
    if (lang !== 'all') p.set('language', lang);
    if (author !== 'all') p.set('author', author);
    if (sort !== 'date-desc') p.set('sort', sort);
    var qs = p.toString();
    history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : '') + window.location.hash);
  }

  function apply() {
    var lang = languageFilter ? languageFilter.value : 'all';
    var author = authorFilter ? authorFilter.value : 'all';
    var raw = searchInput ? searchInput.value.trim() : '';
    var terms = fold(raw).split(/\s+/).filter(Boolean);
    var sort = sortOrder ? sortOrder.value : 'date-desc';
    var visible = 0;

    items.forEach(function(it, i) {
      var langs = (it.dataset.languages || '').split('|');
      var authors = (it.dataset.authors || '').split('|');
      var okLang = lang === 'all' || langs.indexOf(lang) !== -1;
      var okAuthor = author === 'all' || authors.indexOf(author) !== -1;
      var okSearch = terms.every(function(t) { return index[i].indexOf(t) !== -1; });
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

    syncUrl(raw, lang, author, sort);
  }

  [languageFilter, authorFilter, sortOrder].forEach(function(el) {
    if (el) el.addEventListener('change', apply);
  });
  if (searchInput) searchInput.addEventListener('input', apply);

  apply();   // honour any filters that arrived in the URL
});
