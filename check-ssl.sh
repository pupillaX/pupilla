#!/bin/bash

echo "🔍 Checking HTTPS status for pupilla.org..."
echo "Time: $(date)"
echo ""

# Test DNS resolution
echo "📡 DNS Check:"
dig +short A pupilla.org | head -4
echo ""

# Test HTTP (should work)
echo "🌐 HTTP Check:"
if curl -I --max-time 5 http://pupilla.org >/dev/null 2>&1; then
    echo "✅ HTTP working"
else
    echo "❌ HTTP not working"
fi

# Test HTTPS (might not work yet)
echo "🔒 HTTPS Check:"
if curl -I --max-time 5 https://pupilla.org >/dev/null 2>&1; then
    echo "✅ HTTPS working - Certificate issued!"
    echo "🎉 You can now enable 'Enforce HTTPS' in GitHub settings"
else
    echo "⏳ HTTPS not ready yet - Certificate still being issued"
    echo "💡 Check again in 15-30 minutes"
fi

echo ""
echo "🔗 GitHub Pages Settings: https://github.com/pupillaX/pupilla/settings/pages"
