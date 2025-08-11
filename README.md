# Pupilla Preprint Archive Starter
Welcome to the Pupilla starter Jekyll site!

## Local Testing
1. Install Ruby + Bundler (should exist on MacOS)
2. Run `bundle install --verbose`
3. Run `bundle exec jekyll serve --livereload`
4. Run `chmod +x start-server.sh`
5. Run `./start-server.sh`
6. You should be able to access the site locally at `http://127.0.0.1:4000/pupilla/` or `http://localhost:4000/pupilla/`

## Key commands for development:
- `bundle exec jekyll serve` - Start the server
- `bundle exec jekyll serve --drafts` - Include draft posts
- `bundle exec jekyll serve --livereload` - Auto-refresh browser on changes
- `bundle exec jekyll build` - Build the site without serving
The site will automatically rebuild when you make changes to your files, and you can view it in your browser. Press Ctrl+C in the terminal to stop the server when you're done.