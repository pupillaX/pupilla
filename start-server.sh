#!/bin/bash

# Use Homebrew Ruby instead of system Ruby
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
export PATH="$(ruby -e 'puts Gem.user_dir')/bin:$PATH"

# Patch String#untaint for Ruby 3.2+ (removed but still called by Liquid 4.x)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
export RUBYOPT="-r ${SCRIPT_DIR}/_plugins/ruby4_compat.rb"

# Start Jekyll development server
echo "Starting Jekyll development server..."
echo "Site will be available at: http://localhost:4000"
echo "Press Ctrl+C to stop the server"
echo ""

bundle exec jekyll serve --drafts --livereload --host=0.0.0.0 --port=4000
