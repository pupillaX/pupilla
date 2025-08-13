---
layout: default
title: Analytics Dashboard
permalink: /dashboard/
---

<div class="analytics-dashboard">
  <h1>📊 Pupilla Analytics Dashboard</h1>
  
  <div class="auth-section">
    <p>To view your analytics data, you'll need to authenticate with Google Analytics:</p>
    <button id="auth-button" class="btn">🔐 Connect to Google Analytics</button>
    <div id="auth-status"></div>
  </div>

  <div id="dashboard-content" style="display: none;">
    <div class="date-selector">
      <label for="date-range">Date Range:</label>
      <select id="date-range">
        <option value="7">Last 7 days</option>
        <option value="30" selected>Last 30 days</option>
        <option value="90">Last 90 days</option>
      </select>
      <button id="refresh-data" class="btn">🔄 Refresh Data</button>
    </div>

    <div class="metrics-grid">
      <div class="metric-card">
        <h3>👥 Total Users</h3>
        <div class="metric-value" id="total-users">Loading...</div>
        <div class="metric-change" id="users-change"></div>
      </div>
      
      <div class="metric-card">
        <h3>📄 Page Views</h3>
        <div class="metric-value" id="page-views">Loading...</div>
        <div class="metric-change" id="views-change"></div>
      </div>
      
      <div class="metric-card">
        <h3>⬇️ PDF Downloads</h3>
        <div class="metric-value" id="pdf-downloads">Loading...</div>
        <div class="metric-change" id="downloads-change"></div>
      </div>
      
      <div class="metric-card">
        <h3>🔄 Sessions</h3>
        <div class="metric-value" id="sessions">Loading...</div>
        <div class="metric-change" id="sessions-change"></div>
      </div>
    </div>

    <div class="charts-section">
      <div class="chart-container">
        <h3>📈 Daily Traffic</h3>
        <canvas id="traffic-chart" width="400" height="200"></canvas>
      </div>
      
      <div class="chart-container">
        <h3>📊 Top Pages</h3>
        <div id="top-pages"></div>
      </div>
      
      <div class="chart-container">
        <h3>📋 Top Downloads</h3>
        <div id="top-downloads"></div>
      </div>
    </div>

    <div class="real-time-section">
      <h3>🔴 Real-time Activity</h3>
      <div id="realtime-data">
        <div class="realtime-metric">
          <span class="label">Active Users:</span>
          <span id="active-users">-</span>
        </div>
        <div class="realtime-metric">
          <span class="label">Recent Downloads:</span>
          <div id="recent-downloads">No recent downloads</div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.analytics-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
}

.auth-section {
  text-align: center;
  padding: 40px 20px;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 30px;
}

.btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.btn:hover {
  background: #0056b3;
}

.date-selector {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.date-selector select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.metric-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.metric-card h3 {
  margin: 0 0 12px 0;
  color: #495057;
  font-size: 16px;
  font-weight: 600;
}

.metric-value {
  font-size: 32px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 8px;
}

.metric-change {
  font-size: 14px;
  color: #6c757d;
}

.metric-change.positive {
  color: #28a745;
}

.metric-change.negative {
  color: #dc3545;
}

.charts-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
}

.chart-container {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.chart-container h3 {
  margin: 0 0 20px 0;
  color: #495057;
  font-size: 18px;
  font-weight: 600;
}

.chart-container:first-child {
  grid-column: 1 / -1;
}

.real-time-section {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.real-time-section h3 {
  margin: 0 0 20px 0;
  color: #495057;
  font-size: 18px;
  font-weight: 600;
}

.realtime-metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f3f4;
}

.realtime-metric:last-child {
  border-bottom: none;
}

.realtime-metric .label {
  font-weight: 500;
  color: #495057;
}

#active-users {
  font-size: 24px;
  font-weight: bold;
  color: #28a745;
}

.page-item, .download-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f1f3f4;
}

.page-item:last-child, .download-item:last-child {
  border-bottom: none;
}

.page-title, .download-title {
  font-weight: 500;
  color: #495057;
  flex-grow: 1;
  margin-right: 12px;
}

.page-count, .download-count {
  font-weight: bold;
  color: #007bff;
  background: #e7f3ff;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 16px;
  border-radius: 6px;
  margin: 20px 0;
  border: 1px solid #f5c6cb;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .charts-section {
    grid-template-columns: 1fr;
  }
  
  .date-selector {
    flex-direction: column;
    align-items: stretch;
  }
  
  .realtime-metric {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
class PupillaAnalytics {
  constructor() {
    this.propertyId = 'G-VETQ7ZZ4FM';
    this.isAuthenticated = false;
    this.accessToken = null;
    this.chart = null;
    
    this.init();
  }
  
  init() {
    // Load Google API client
    this.loadGoogleAPI();
    
    // Set up event listeners
    document.getElementById('auth-button').addEventListener('click', () => this.authenticate());
    document.getElementById('date-range').addEventListener('change', () => this.loadData());
    document.getElementById('refresh-data').addEventListener('click', () => this.loadData());
    
    // Auto-refresh every 5 minutes
    setInterval(() => {
      if (this.isAuthenticated) {
        this.loadRealTimeData();
      }
    }, 300000);
  }
  
  loadGoogleAPI() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: '{{site.google_analytics_client_id}}'
        });
      });
    };
    document.head.appendChild(script);
  }
  
  authenticate() {
    const authStatus = document.getElementById('auth-status');
    authStatus.innerHTML = '<div class="loading-spinner"></div> Connecting...';
    
    // For this demo, we'll use a simple approach
    // In production, you'd want to use proper OAuth2 flow
    const clientId = prompt('Please enter your Google Analytics API Client ID:');
    if (!clientId) {
      authStatus.innerHTML = '<div class="error-message">Authentication cancelled.</div>';
      return;
    }
    
    // Simulate authentication success
    // In real implementation, this would use proper OAuth2
    setTimeout(() => {
      this.isAuthenticated = true;
      authStatus.innerHTML = '<div style="color: green;">✅ Connected successfully!</div>';
      document.getElementById('dashboard-content').style.display = 'block';
      this.loadData();
    }, 1000);
  }
  
  async loadData() {
    if (!this.isAuthenticated) return;
    
    const dateRange = parseInt(document.getElementById('date-range').value);
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - dateRange);
    
    try {
      // In a real implementation, these would be actual API calls
      // For demo purposes, we'll simulate the data
      
      await this.loadMetrics(startDate, endDate);
      await this.loadPageViews(startDate, endDate);
      await this.loadDownloads(startDate, endDate);
      await this.loadRealTimeData();
      
    } catch (error) {
      console.error('Error loading analytics data:', error);
      this.showError('Failed to load analytics data. Please check your connection and try again.');
    }
  }
  
  async loadMetrics(startDate, endDate) {
    // Show message that this is a demo
    document.getElementById('total-users').innerHTML = '<span style="color: #dc3545;">Demo Mode</span>';
    document.getElementById('page-views').innerHTML = '<span style="color: #dc3545;">Demo Mode</span>';
    document.getElementById('sessions').innerHTML = '<span style="color: #dc3545;">Demo Mode</span>';
    document.getElementById('pdf-downloads').innerHTML = '<span style="color: #dc3545;">Demo Mode</span>';
    
    // Show setup instructions
    this.addChangeIndicator('users-change', 'Setup API for real data');
    this.addChangeIndicator('views-change', 'See DASHBOARD_SETUP.md');
    this.addChangeIndicator('sessions-change', 'Configure credentials');
    this.addChangeIndicator('downloads-change', 'Enable Google Analytics API');
  }
  
  async loadPageViews(startDate, endDate) {
    // Simulate daily traffic data
    const days = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    const dailyData = [];
    const labels = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      dailyData.push(Math.floor(Math.random() * 200) + 50);
    }
    
    this.createTrafficChart(labels, dailyData);
    
    // Load top pages
    const topPages = [
      { path: '/preprints/', views: 234 },
      { path: '/preprints/2025_chiaras_two_or_three/', views: 156 },
      { path: '/', views: 134 },
      { path: '/preprints/2025_zizek_christian_atheism/', views: 98 },
      { path: '/about/', views: 67 }
    ];
    
    this.displayTopPages(topPages);
  }
  
  async loadDownloads(startDate, endDate) {
    // Simulate download data
    const topDownloads = [
      { file: '20250809_PUPILLA_ChiarasTwoOrThre_en.pdf', downloads: 45 },
      { file: 'sample2.pdf', downloads: 23 },
      { file: '20250809_PUPILLA_ChiarasTwoOrThre_sl.pdf', downloads: 18 }
    ];
    
    this.displayTopDownloads(topDownloads);
  }
  
  async loadRealTimeData() {
    // Simulate real-time data
    const activeUsers = Math.floor(Math.random() * 10) + 1;
    document.getElementById('active-users').textContent = activeUsers;
    
    // Recent downloads
    const recentDownloads = [
      '20250809_PUPILLA_ChiarasTwoOrThre_en.pdf - 2 min ago',
      'sample2.pdf - 7 min ago'
    ];
    
    const recentDownloadsEl = document.getElementById('recent-downloads');
    if (recentDownloads.length > 0) {
      recentDownloadsEl.innerHTML = recentDownloads.map(download => 
        `<div style="margin: 4px 0; color: #495057;">${download}</div>`
      ).join('');
    }
  }
  
  createTrafficChart(labels, data) {
    const ctx = document.getElementById('traffic-chart').getContext('2d');
    
    if (this.chart) {
      this.chart.destroy();
    }
    
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Page Views',
          data: data,
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#f1f3f4'
            }
          },
          x: {
            grid: {
              color: '#f1f3f4'
            }
          }
        }
      }
    });
  }
  
  displayTopPages(pages) {
    const container = document.getElementById('top-pages');
    container.innerHTML = pages.map(page => `
      <div class="page-item">
        <span class="page-title">${page.path}</span>
        <span class="page-count">${page.views}</span>
      </div>
    `).join('');
  }
  
  displayTopDownloads(downloads) {
    const container = document.getElementById('top-downloads');
    container.innerHTML = downloads.map(download => `
      <div class="download-item">
        <span class="download-title">${download.file}</span>
        <span class="download-count">${download.downloads}</span>
      </div>
    `).join('');
  }
  
  addChangeIndicator(elementId, change) {
    const element = document.getElementById(elementId);
    const isPositive = change > 0;
    const arrow = isPositive ? '↗' : '↘';
    const className = isPositive ? 'positive' : 'negative';
    
    element.textContent = `${arrow} ${Math.abs(change).toFixed(1)}% from last period`;
    element.className = `metric-change ${className}`;
  }
  
  showError(message) {
    const dashboardContent = document.getElementById('dashboard-content');
    dashboardContent.innerHTML = `<div class="error-message">${message}</div>`;
  }
}

// Initialize the dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
  new PupillaAnalytics();
});
</script>
