#!/bin/bash

# Start Jekyll development server
echo "Starting Jekyll development server..."
echo "Site will be available at: http://localhost:4000"
echo "Press Ctrl+C to stop the server"
echo ""

bundle exec jekyll serve --drafts --livereload --host=0.0.0.0 --port=4000
