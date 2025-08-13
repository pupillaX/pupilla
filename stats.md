---
layout: default
title: Simple Analytics
permalink: /stats/
---

<div class="simple-analytics">
  <h1>📊 Pupilla Analytics</h1>
  
  <div class="analytics-note">
    <h3>🔍 How to View Your Real Analytics</h3>
    <p>Since you already have Google Analytics set up, here's the easiest way to see your actual data:</p>
  </div>

  <div class="ga-links">
    <h3>📈 Quick Links to Your Google Analytics</h3>
    <div class="link-grid">
      <a href="https://analytics.google.com/analytics/web/#/p{property-id}/reports/intelligenthome" class="analytics-link" target="_blank">
        👥 <strong>Overview</strong><br>
        <small>Total users, sessions, page views</small>
      </a>
      
      <a href="https://analytics.google.com/analytics/web/#/p{property-id}/reports/engagement-pages" class="analytics-link" target="_blank">
        📄 <strong>Page Views</strong><br>
        <small>Most viewed preprint pages</small>
      </a>
      
      <a href="https://analytics.google.com/analytics/web/#/p{property-id}/reports/engagement-events" class="analytics-link" target="_blank">
        ⬇️ <strong>PDF Downloads</strong><br>
        <small>file_download events</small>
      </a>
      
      <a href="https://analytics.google.com/analytics/web/#/p{property-id}/reports/realtime-overview" class="analytics-link" target="_blank">
        🔴 <strong>Real-time</strong><br>
        <small>Current active users</small>
      </a>
    </div>
  </div>

  <div class="how-to-section">
    <h3>📋 What to Look For</h3>
    
    <div class="instruction-card">
      <h4>🎯 For PDF Downloads:</h4>
      <ol>
        <li>Click "PDF Downloads" link above</li>
        <li>Look for event: <code>file_download</code></li>
        <li>Click on it to see which files were downloaded</li>
        <li>Use date picker to see specific time periods</li>
      </ol>
    </div>

    <div class="instruction-card">
      <h4>📊 For Page Popularity:</h4>
      <ol>
        <li>Click "Page Views" link above</li>
        <li>Look for pages starting with <code>/preprints/</code></li>
        <li>These show which preprints get the most traffic</li>
        <li>Sort by "Views" column for ranking</li>
      </ol>
    </div>

    <div class="instruction-card">
      <h4>👥 For Visitor Stats:</h4>
      <ol>
        <li>Click "Overview" link above</li>
        <li>See total users, new vs returning visitors</li>
        <li>View traffic sources (direct, search, social)</li>
        <li>Check geographic distribution</li>
      </ol>
    </div>
  </div>

  <div class="local-stats">
    <h3>📱 Quick Local Stats</h3>
    <p>Here are some basic metrics from your current session:</p>
    
    <div class="local-metrics">
      <div class="local-metric">
        <strong>Your Visit Time:</strong>
        <span id="visit-duration">0:00</span>
      </div>
      
      <div class="local-metric">
        <strong>Pages Viewed This Session:</strong>
        <span id="pages-viewed">1</span>
      </div>
      
      <div class="local-metric">
        <strong>Google Analytics Status:</strong>
        <span id="ga-status">Checking...</span>
      </div>
      
      <div class="local-metric">
        <strong>Cookie Consent:</strong>
        <span id="cookie-status">Checking...</span>
      </div>
    </div>
    
    <div id="analytics-help" class="analytics-help" style="display: none;">
      <h4>🍪 About Cookie Consent & Analytics</h4>
      <p>This website uses GDPR-compliant cookie consent. Google Analytics only loads after you accept cookies for the best privacy protection.</p>
      <p><strong>What this means:</strong></p>
      <ul>
        <li>Analytics respect your privacy choices</li>
        <li>No tracking without explicit consent</li>
        <li>You can change your choice anytime</li>
      </ul>
    </div>
  </div>

  <div class="tips-section">
    <h3>💡 Pro Tips</h3>
    <ul>
      <li><strong>Real-time data:</strong> Check the "Real-time" section to see current visitors</li>
      <li><strong>Mobile usage:</strong> Most academic readers use mobile - check device breakdown</li>
      <li><strong>Download patterns:</strong> Look for which languages are downloaded most</li>
      <li><strong>Traffic sources:</strong> See if people find you via Google, social media, or direct links</li>
      <li><strong>Geographic data:</strong> Understand your global audience</li>
    </ul>
  </div>
</div>

<style>
.simple-analytics {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
}

.analytics-note {
  background: #e7f3ff;
  border: 1px solid #b8daff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
}

.analytics-note h3 {
  margin-top: 0;
  color: #004085;
}

.link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

.analytics-link {
  display: block;
  padding: 20px;
  background: white;
  border: 2px solid #007bff;
  border-radius: 8px;
  text-decoration: none;
  color: #007bff;
  text-align: center;
  transition: all 0.3s ease;
}

.analytics-link:hover {
  background: #007bff;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,123,255,0.3);
}

.instruction-card {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.instruction-card h4 {
  margin-top: 0;
  color: #495057;
}

.instruction-card code {
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
}

.local-stats {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 20px;
  margin: 30px 0;
}

.local-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.local-metric {
  padding: 15px;
  background: white;
  border-radius: 6px;
  text-align: center;
}

.local-metric strong {
  display: block;
  margin-bottom: 8px;
  color: #495057;
}

.local-metric span {
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
}

.tips-section {
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
}

.tips-section h3 {
  margin-top: 0;
  color: #155724;
}

.tips-section ul {
  margin: 0;
}

.tips-section li {
  margin-bottom: 8px;
}

.analytics-help {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  padding: 15px;
  margin-top: 15px;
}

.analytics-help h4 {
  margin: 0 0 10px 0;
  color: #856404;
}

.analytics-help p {
  margin: 0 0 8px 0;
  color: #856404;
}

.analytics-help ul {
  margin: 8px 0 0 0;
  color: #856404;
}

@media (max-width: 768px) {
  .link-grid {
    grid-template-columns: 1fr;
  }
  
  .local-metrics {
    grid-template-columns: 1fr;
  }
}
</style>

<script>
class SimpleAnalytics {
  constructor() {
    this.startTime = Date.now();
    this.pageViews = 1;
    this.init();
  }
  
  init() {
    this.startTimer();
    this.checkGoogleAnalytics();
    this.checkCookieConsent();
    this.trackPageViews();
  }
  
  checkCookieConsent() {
    const statusEl = document.getElementById('cookie-status');
    const helpEl = document.getElementById('analytics-help');
    const consentStatus = localStorage.getItem('cookie-consent');
    
    if (consentStatus === 'accepted') {
      statusEl.textContent = '✅ Accepted';
      statusEl.style.color = '#28a745';
    } else if (consentStatus === 'rejected') {
      statusEl.textContent = '🚫 Rejected';
      statusEl.style.color = '#dc3545';
      helpEl.style.display = 'block';
    } else {
      statusEl.textContent = '⏳ Pending';
      statusEl.style.color = '#ffc107';
      helpEl.style.display = 'block';
    }
  }
  
  startTimer() {
    setInterval(() => {
      const elapsed = Date.now() - this.startTime;
      const minutes = Math.floor(elapsed / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);
      document.getElementById('visit-duration').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
  }
  
  checkGoogleAnalytics() {
    const statusEl = document.getElementById('ga-status');
    
    // Check cookie consent first
    const consentStatus = localStorage.getItem('cookie-consent');
    
    if (consentStatus === 'rejected') {
      statusEl.textContent = '🚫 Disabled (cookies rejected)';
      statusEl.style.color = '#ffc107';
    } else if (consentStatus === 'accepted') {
      // User accepted cookies, check if GA is loaded
      if (typeof gtag !== 'undefined') {
        statusEl.textContent = '✅ Active & Tracking';
        statusEl.style.color = '#28a745';
      } else {
        statusEl.textContent = '⏳ Loading...';
        statusEl.style.color = '#007bff';
        // Check again in a moment
        setTimeout(() => this.checkGoogleAnalytics(), 2000);
      }
    } else {
      // No consent given yet
      statusEl.textContent = '⚠️ Waiting for cookie consent';
      statusEl.style.color = '#ffc107';
      
      // Check again periodically until consent is given
      setTimeout(() => this.checkGoogleAnalytics(), 3000);
    }
  }
  
  trackPageViews() {
    // Track internal navigation
    let pageCount = parseInt(sessionStorage.getItem('pupilla-page-count') || '1');
    document.getElementById('pages-viewed').textContent = pageCount;
    
    // Increment on page load
    sessionStorage.setItem('pupilla-page-count', (pageCount + 1).toString());
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  new SimpleAnalytics();
});
</script>
