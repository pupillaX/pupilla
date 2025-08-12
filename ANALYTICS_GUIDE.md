# 📊 Pupilla Analytics Guide

## Global Tracking Implementation

Your website now tracks **all visits and downloads from users worldwide** using Google Analytics (ID: `G-VETQ7ZZ4FM`).

## 🌍 How Global Tracking Works

### **Page Views (Visits)**
- **Automatic**: Every page visit is automatically tracked by Google Analytics
- **Global Data**: Shows total visits from all users worldwide
- **Real-time**: View live visitor data in GA dashboard
- **Historical**: Access historical data going back to when GA was implemented

### **PDF Downloads** 
- **Custom Events**: Every PDF download triggers a `file_download` event in GA
- **Detailed Tracking**: Includes filename, language, page title, and user info
- **Worldwide Counts**: Aggregates downloads from all users globally
- **Language-specific**: Tracks downloads by language for multilingual PDFs

## 📈 Accessing Your Global Analytics Data

### **Google Analytics Dashboard**
1. Go to [analytics.google.com](https://analytics.google.com)
2. Select your property (Pupilla - G-VETQ7ZZ4FM)
3. Key sections:
   - **Real-time**: See current visitors
   - **Engagement > Pages and screens**: Page view counts
   - **Engagement > Events**: Download events

### **Key Reports for Your Data**

#### **Page Views by Preprint:**
- Navigate to: `Engagement > Pages and screens`
- Filter by page path (e.g., `/preprints/sample1/`)
- See total views, unique users, session duration

#### **PDF Downloads:**
- Navigate to: `Engagement > Events`
- Look for event: `file_download`
- Parameters include:
  - `file_name`: Which PDF was downloaded
  - `page_title`: Which preprint page
  - `language`: Language version downloaded
  - `file_extension`: Always "pdf"

## 🔍 What You Can Track

### **Individual Preprint Performance:**
- Total page views per preprint
- Download counts per PDF
- Language preference (which language PDFs are downloaded most)
- Geographic distribution of readers
- Referral sources (how people find your preprints)

### **Overall Site Analytics:**
- Total site visits and users
- Most popular preprints
- User engagement metrics
- Device/browser statistics
- Geographic analytics

## ⚡ Current User Experience

### **On Preprint Pages:**
- Visit counter shows: `X+ visits` (local minimum + global data in GA)
- Download counter shows: `X+ downloads` (local minimum + global data in GA)
- The "+" indicates these are minimum counts, with full global data in GA

### **Immediate Feedback:**
- Counters increment immediately when users visit/download
- Local storage provides instant visual feedback
- Google Analytics captures the global, permanent data

## 🔧 Technical Implementation

### **Events Tracked:**
```javascript
// Page View Event (automatic)
gtag('event', 'page_view', {
  'page_title': 'Preprint Title',
  'page_location': 'https://pupilla.org/preprints/sample/',
  'content_group1': 'Computer Science',
  'send_to': 'G-VETQ7ZZ4FM'
});

// Download Event (on PDF click)
gtag('event', 'file_download', {
  'file_name': '/assets/pdfs/sample.pdf',
  'file_extension': 'pdf',
  'page_title': 'Preprint Title',
  'language': 'English',
  'send_to': 'G-VETQ7ZZ4FM'
});
```

## 📊 Setting Up Custom Dashboards

### **Recommended GA4 Custom Reports:**

1. **Preprint Performance Dashboard:**
   - Page views by preprint
   - Download events by file
   - User engagement metrics

2. **Download Analytics:**
   - Total downloads over time
   - Language preference analysis
   - Most downloaded papers

3. **Geographic Analysis:**
   - Visitor locations
   - Regional download patterns

## 🎯 GDPR Compliance

- Analytics only load after user consent (GDPR compliant)
- Users can opt-out via cookie settings
- Privacy policy explains data collection
- No personal data collection beyond standard GA metrics

## 🚀 Next Steps

1. **Wait for SSL**: Once your SSL certificate is provisioned (~24-48 hours), GA will fully activate
2. **Verify Tracking**: Check GA Real-time reports to confirm data collection
3. **Custom Reports**: Set up custom dashboards for preprint-specific analytics
4. **Regular Monitoring**: Check weekly/monthly reports for insights

## 💡 Advanced Analytics Ideas

- **A/B Testing**: Test different preprint presentation formats
- **Conversion Tracking**: Track from page view to PDF download
- **Cohort Analysis**: Understand user behavior patterns
- **Content Optimization**: Use data to improve popular preprints

---

Your analytics system now provides comprehensive global tracking while maintaining GDPR compliance and immediate user feedback!
