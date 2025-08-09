#!/bin/bash

echo "🛑 Stopping any existing Jekyll processes..."
pkill -f jekyll

echo "🧹 Cleaning up Jekyll cache..."
rm -rf _site .jekyll-cache

echo "🚀 Starting Jekyll development server..."
echo "Site will be available at: http://localhost:4000"
echo "Press Ctrl+C to stop the server"
echo ""

bundle exec jekyll serve --drafts --livereload --host=0.0.0.0 --port=4000 --incremental
