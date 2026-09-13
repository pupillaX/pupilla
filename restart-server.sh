#!/bin/bash

# Use Homebrew Ruby instead of system Ruby (system Ruby 2.6 is too old)
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
export PATH="$(ruby -e 'puts Gem.user_dir')/bin:$PATH"

# Patch String#untaint for Ruby 3.2+ (removed but still called by Liquid 4.x).
# The github-pages gem forces Jekyll safe mode, so the shim in _plugins/
# never loads as a plugin — we have to preload it into the Ruby process.
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
export RUBYOPT="-r ${SCRIPT_DIR}/_plugins/ruby4_compat.rb"

# Force a UTF-8 locale. Without it the shell inherits LANG=C (US-ASCII) and the
# old Sass (3.7.4) that ships with github-pages reads the Primer theme's
# UTF-8 .scss files as US-ASCII, failing with:
#   Invalid US-ASCII character "\xE2" ... typography.scss
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

echo "🛑 Stopping any existing Jekyll processes..."
pkill -f jekyll

echo "🧹 Cleaning up Jekyll cache..."
rm -rf _site .jekyll-cache

echo "🚀 Starting Jekyll development server..."
echo "Site will be available at: http://localhost:4000"
echo "Press Ctrl+C to stop the server"
echo ""

# NOTE: no --incremental. The site builds in <1s, and incremental builds don't
# regenerate collection listing pages (preprints/, essays/) when a new article
# or essay is added, so new items would be missing from the listings locally.
bundle exec jekyll serve --livereload --host=0.0.0.0 --port=4000
