// Google Analytics Data API Integration for Pupilla
// This script provides real data from Google Analytics API

class GoogleAnalyticsAPI {
  constructor() {
    this.propertyId = '412345678'; // Replace with your actual GA4 property ID
    this.apiKey = null; // Will be set by user
    this.accessToken = null;
    this.baseURL = 'https://analyticsdata.googleapis.com/v1beta';
  }

  // Initialize with API credentials
  async initialize(apiKey, accessToken) {
    this.apiKey = apiKey;
    this.accessToken = accessToken;
    return this.testConnection();
  }

  // Test API connection
  async testConnection() {
    try {
      const response = await this.makeRequest('metadata');
      return response.ok;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }

  // Make authenticated request to GA API
  async makeRequest(endpoint, data = null) {
    const url = `${this.baseURL}/properties/${this.propertyId}/${endpoint}`;
    
    const options = {
      method: data ? 'POST' : 'GET',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  // Get basic metrics (users, sessions, page views)
  async getBasicMetrics(startDate, endDate) {
    const request = {
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'totalUsers' },
        { name: 'sessions' },
        { name: 'screenPageViews' },
        { name: 'activeUsers' }
      ]
    };

    try {
      const response = await this.makeRequest('runReport', request);
      const row = response.rows?.[0];
      
      if (!row) return null;

      return {
        totalUsers: parseInt(row.metricValues[0].value),
        sessions: parseInt(row.metricValues[1].value),
        pageViews: parseInt(row.metricValues[2].value),
        activeUsers: parseInt(row.metricValues[3].value)
      };
    } catch (error) {
      console.error('Error fetching basic metrics:', error);
      return null;
    }
  }

  // Get PDF download events
  async getPDFDownloads(startDate, endDate) {
    const request = {
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: 'customEvent:file_name' },
        { name: 'pageTitle' }
      ],
      metrics: [
        { name: 'eventCount' }
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          stringFilter: {
            matchType: 'EXACT',
            value: 'file_download'
          }
        }
      },
      orderBys: [{
        metric: { metricName: 'eventCount' },
        desc: true
      }],
      limit: 10
    };

    try {
      const response = await this.makeRequest('runReport', request);
      
      if (!response.rows) return [];

      return response.rows.map(row => ({
        fileName: row.dimensionValues[0].value,
        pageTitle: row.dimensionValues[1].value,
        downloads: parseInt(row.metricValues[0].value)
      }));
    } catch (error) {
      console.error('Error fetching PDF downloads:', error);
      return [];
    }
  }

  // Get top pages
  async getTopPages(startDate, endDate) {
    const request = {
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: 'pagePath' },
        { name: 'pageTitle' }
      ],
      metrics: [
        { name: 'screenPageViews' }
      ],
      orderBys: [{
        metric: { metricName: 'screenPageViews' },
        desc: true
      }],
      limit: 10
    };

    try {
      const response = await this.makeRequest('runReport', request);
      
      if (!response.rows) return [];

      return response.rows.map(row => ({
        path: row.dimensionValues[0].value,
        title: row.dimensionValues[1].value,
        views: parseInt(row.metricValues[0].value)
      }));
    } catch (error) {
      console.error('Error fetching top pages:', error);
      return [];
    }
  }

  // Get daily traffic data for charts
  async getDailyTraffic(startDate, endDate) {
    const request = {
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: 'date' }
      ],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'sessions' }
      ],
      orderBys: [{
        dimension: { dimensionName: 'date' }
      }]
    };

    try {
      const response = await this.makeRequest('runReport', request);
      
      if (!response.rows) return [];

      return response.rows.map(row => ({
        date: row.dimensionValues[0].value,
        pageViews: parseInt(row.metricValues[0].value),
        sessions: parseInt(row.metricValues[1].value)
      }));
    } catch (error) {
      console.error('Error fetching daily traffic:', error);
      return [];
    }
  }

  // Get real-time active users
  async getRealTimeData() {
    const request = {
      dimensions: [
        { name: 'unifiedPageScreen' }
      ],
      metrics: [
        { name: 'activeUsers' }
      ],
      limit: 10
    };

    try {
      // Note: Real-time API has different endpoint
      const url = `https://analyticsdata.googleapis.com/v1beta/properties/${this.propertyId}:runRealtimeReport`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`Real-time API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      const totalActiveUsers = data.rows?.reduce((sum, row) => 
        sum + parseInt(row.metricValues[0].value), 0) || 0;

      return {
        activeUsers: totalActiveUsers,
        pages: data.rows?.map(row => ({
          page: row.dimensionValues[0].value,
          users: parseInt(row.metricValues[0].value)
        })) || []
      };
    } catch (error) {
      console.error('Error fetching real-time data:', error);
      return { activeUsers: 0, pages: [] };
    }
  }
}

// Export for use in dashboard
window.GoogleAnalyticsAPI = GoogleAnalyticsAPI;
