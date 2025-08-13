---
layout: default
title: Analytics Dashboard
permalink: /analytics/
---

<div class="analytics-dashboard">
  <h1>Site Analytics</h1>
  
  <div class="analytics-grid">
    <div class="analytics-card">
      <h3>Total Site Views</h3>
      <div class="metric" id="total-views">Loading...</div>
    </div>
    
    <div class="analytics-card">
      <h3>Total Downloads</h3>
      <div class="metric" id="total-downloads">Loading...</div>
    </div>
    
    <div class="analytics-card">
      <h3>Most Popular Preprint</h3>
      <div class="metric" id="popular-preprint">Loading...</div>
    </div>
  </div>
  
  <div class="preprint-stats">
    <h2>Preprint Statistics</h2>
    <div id="preprint-analytics"></div>
  </div>
</div>

<style>
.analytics-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.analytics-card {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}

.analytics-card h3 {
  margin: 0 0 10px 0;
  color: #495057;
  font-size: 1.1em;
}

.metric {
  font-size: 2em;
  font-weight: bold;
  color: #007bff;
}

.preprint-stats {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
}

.preprint-item-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f1f3f4;
}

.preprint-item-stats:last-child {
  border-bottom: none;
}

.preprint-title-stats {
  flex: 1;
  font-weight: 500;
}

.preprint-metrics {
  display: flex;
  gap: 20px;
  font-size: 0.9em;
  color: #6c757d;
}
</style>

<script>
// Analytics Dashboard Script
document.addEventListener('DOMContentLoaded', function() {
  console.log('Analytics Dashboard: Initializing');
  
  // Collect analytics data from localStorage
  function collectAnalyticsData() {
    const analytics = {
      totalViews: 0,
      totalDownloads: 0,
      preprints: {}
    };
    
    // Scan localStorage for analytics data
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      if (key.startsWith('pupilla-visits-')) {
        const path = key.replace('pupilla-visits-', '');
        const views = parseInt(localStorage.getItem(key)) || 0;
        analytics.totalViews += views;
        
        if (!analytics.preprints[path]) {
          analytics.preprints[path] = { views: 0, downloads: 0 };
        }
        analytics.preprints[path].views = views;
      }
      
      if (key.startsWith('pupilla-downloads-')) {
        const path = key.replace('pupilla-downloads-', '');
        const downloads = parseInt(localStorage.getItem(key)) || 0;
        analytics.totalDownloads += downloads;
        
        if (!analytics.preprints[path]) {
          analytics.preprints[path] = { views: 0, downloads: 0 };
        }
        analytics.preprints[path].downloads = downloads;
      }
    }
    
    return analytics;
  }
  
  // Find preprint titles from the current site data
  function getPageTitle(path) {
    // Convert path to readable title
    const segments = path.split('/').filter(s => s);
    if (segments.includes('preprints')) {
      const slug = segments[segments.indexOf('preprints') + 1];
      if (slug) {
        return slug.replace(/_/g, ' ').replace(/-/g, ' ')
                  .replace(/\b\w/g, l => l.toUpperCase());
      }
    }
    return path;
  }
  
  // Display analytics data
  function displayAnalytics() {
    const data = collectAnalyticsData();
    
    // Update total metrics
    document.getElementById('total-views').textContent = data.totalViews;
    document.getElementById('total-downloads').textContent = data.totalDownloads;
    
    // Find most popular preprint
    let mostPopular = '';
    let maxViews = 0;
    
    Object.entries(data.preprints).forEach(([path, stats]) => {
      if (stats.views > maxViews) {
        maxViews = stats.views;
        mostPopular = getPageTitle(path);
      }
    });
    
    document.getElementById('popular-preprint').textContent = mostPopular || 'No data yet';
    
    // Display preprint statistics
    const preprintContainer = document.getElementById('preprint-analytics');
    preprintContainer.innerHTML = '';
    
    if (Object.keys(data.preprints).length === 0) {
      preprintContainer.innerHTML = '<p>No analytics data available yet. Visit some preprints to see statistics.</p>';
      return;
    }
    
    // Sort preprints by views
    const sortedPreprints = Object.entries(data.preprints)
      .sort((a, b) => b[1].views - a[1].views);
    
    sortedPreprints.forEach(([path, stats]) => {
      const preprintDiv = document.createElement('div');
      preprintDiv.className = 'preprint-item-stats';
      
      preprintDiv.innerHTML = `
        <div class="preprint-title-stats">${getPageTitle(path)}</div>
        <div class="preprint-metrics">
          <span>👁 ${stats.views} views</span>
          <span>📥 ${stats.downloads} downloads</span>
        </div>
      `;
      
      preprintContainer.appendChild(preprintDiv);
    });
  }
  
  // Initial display
  displayAnalytics();
  
  console.log('Analytics Dashboard: Loaded');
});
</script>
