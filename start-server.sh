#!/bin/bash

# Use Homebrew Ruby instead of system Ruby
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
export PATH="$(ruby -e 'puts Gem.user_dir')/bin:$PATH"

# Patch String#untaint for Ruby 3.2+ (removed but still called by Liquid 4.x)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
export RUBYOPT="-r ${SCRIPT_DIR}/_plugins/ruby4_compat.rb"

# Force a UTF-8 locale. Without it the shell inherits LANG=C (US-ASCII) and the
# old Sass (3.7.4) that ships with github-pages reads the Primer theme's
# UTF-8 .scss files as US-ASCII, failing with:
#   Invalid US-ASCII character "\xE2" ... typography.scss
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# Start Jekyll development server
echo "Starting Jekyll development server..."
echo "Site will be available at: http://localhost:4000"
echo "Press Ctrl+C to stop the server"
echo ""

bundle exec jekyll serve --drafts --livereload --host=0.0.0.0 --port=4000
