# 🔧 Analytics Dashboard Setup Guide

## Step 1: Get Google Analytics Data API Credentials

### **1.1 Enable the Analytics Data API**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to **APIs & Services** → **Library**
4. Search for "Google Analytics Data API"
5. Click **Enable**

### **1.2 Create Service Account (Recommended)**
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Name it "Pupilla Analytics Dashboard"
4. Click **Create and Continue**
5. Skip role assignment for now
6. Click **Done**

### **1.3 Generate Service Account Key**
1. Click on your new service account
2. Go to **Keys** tab
3. Click **Add Key** → **Create New Key**
4. Choose **JSON** format
5. Download the key file (keep it secure!)

### **1.4 Add Service Account to Google Analytics**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your Pupilla property
3. Go to **Admin** → **Property Access Management**
4. Click **+** → **Add Users**
5. Enter the service account email (from the JSON file)
6. Choose **Viewer** permissions
7. Click **Add**

## Step 2: Get Your GA4 Property ID

1. In Google Analytics, go to **Admin**
2. Under **Property**, you'll see your Property ID (numbers like `123456789`)
3. Copy this number

## Step 3: Configure the Dashboard

### **Option A: Simple Setup (Service Account)**
1. Open your downloaded JSON key file
2. Find the `private_key` and `client_email` fields
3. In your dashboard, you'll use these for authentication

### **Option B: OAuth Setup (For Multiple Users)**
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth 2.0 Client IDs**
3. Choose **Web application**
4. Add your domain to **Authorized origins**
5. Copy the Client ID

## Step 4: Update Dashboard Configuration

Edit your `dashboard.md` file and update:

```javascript
// Update these values in the dashboard
const CONFIG = {
  propertyId: 'YOUR_GA4_PROPERTY_ID', // From Step 2
  // For Service Account:
  serviceAccount: {
    clientEmail: 'your-service-account@project.iam.gserviceaccount.com',
    privateKey: '-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n'
  }
  // For OAuth:
  // clientId: 'your-oauth-client-id.apps.googleusercontent.com'
};
```

## Step 5: Test Your Setup

1. Visit `/dashboard/` on your website
2. Click "Connect to Google Analytics"
3. The dashboard should show your real data!

## 🔒 Security Notes

- **Never commit your private key to Git**
- Store credentials as environment variables in production
- Consider using OAuth for multi-user access
- Regularly rotate your service account keys

## 📊 What You'll See

Once configured, your dashboard will show:
- **Real visitor counts** from GA4
- **Actual page views** for each preprint
- **PDF download events** with file names
- **Daily traffic charts** over time
- **Real-time active users**

## 🚨 Troubleshooting

### "Property ID not found"
- Double-check your GA4 Property ID
- Ensure the service account has access to the property

### "Authentication failed"
- Verify your service account key is correct
- Check that the API is enabled in Google Cloud

### "No data showing"
- Wait 24-48 hours for data to appear in GA4
- Verify your website is sending events correctly

### "CORS errors"
- This is normal for client-side API calls
- Consider using a server-side proxy for production

## 🎯 Next Steps

1. **Set up automated reports** via email
2. **Create custom dashboards** for specific metrics
3. **Add conversion tracking** for important actions
4. **Set up alerts** for traffic spikes or drops

Need help? Check the [Google Analytics Data API documentation](https://developers.google.com/analytics/devguides/reporting/data/v1).
