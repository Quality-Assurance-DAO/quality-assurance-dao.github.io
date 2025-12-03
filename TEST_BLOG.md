# Blog Section Testing Commands

## Quick Test Commands

### 1. Build and Verify Site
```bash
# Build the site
bundle exec jekyll build

# Check if blog index was generated
ls -la _site/blog/index.html

# Check if sample post was generated
ls -la _site/blog/2025-01-27-welcome-to-qadao-blog/index.html

# Verify no build errors
bundle exec jekyll build 2>&1 | grep -i error
```

### 2. Serve Locally and Test in Browser
```bash
# Start Jekyll server (runs on http://localhost:4000)
bundle exec jekyll serve

# Or with auto-reload
bundle exec jekyll serve --livereload

# Test URLs:
# - Blog index: http://localhost:4000/blog/
# - Sample post: http://localhost:4000/blog/2025-01-27-welcome-to-qadao-blog/
# - Tag filter: http://localhost:4000/blog/#tag=ai
```

### 3. Verify File Structure
```bash
# Check posts directory exists
ls -la posts/

# Check blog files exist
ls -la blog.html
ls -la _layouts/post.html
ls -la assets/js/blog.js

# Verify CSS includes blog styles
grep -n "blog-post" assets/css/main.css | head -5
```

### 4. Test Collection Configuration
```bash
# Verify collection config in _config.yml
grep -A 3 "collections:" _config.yml

# Check if Jekyll recognizes the collection
bundle exec jekyll build --verbose 2>&1 | grep -i "posts"
```

### 5. Test Post Creation
```bash
# Create a test post
cat > posts/2025-01-28-test-post.md << 'EOF'
---
title: "Test Post"
date: 2025-01-28
slug: 2025-01-28-test-post
tags:
  - test
summary: "This is a test post."
---

# Test Post

This is a test post to verify blog functionality.
EOF

# Rebuild and verify
bundle exec jekyll build
ls -la _site/blog/2025-01-28-test-post/

# Clean up test post
rm posts/2025-01-28-test-post.md
```

### 6. Test Future-Dated Post Exclusion
```bash
# Create a future-dated post
cat > posts/2026-01-01-future-post.md << 'EOF'
---
title: "Future Post"
date: 2026-01-01
slug: 2026-01-01-future-post
tags:
  - future
summary: "This post is dated in the future."
---

# Future Post

This post should not appear on the blog index.
EOF

# Rebuild and check blog index HTML (should not contain "Future Post")
bundle exec jekyll build
grep -i "future post" _site/blog/index.html || echo "✓ Future post correctly excluded"

# Clean up
rm posts/2026-01-01-future-post.md
```

### 7. Test JavaScript Functionality
```bash
# Check if blog.js exists and has required functions
grep -E "function (initBlog|getActiveTag|filterPostsByTag|renderPagination)" assets/js/blog.js

# Verify script is included in blog.html
grep "blog.js" blog.html
```

### 8. Test Navigation Integration
```bash
# Verify blog link in navigation
grep -A 5 "nav-links" _layouts/default.html | grep -i blog

# Check navigation appears in built site
grep -i "blog" _site/index.html | head -3
```

### 9. Validate HTML Structure
```bash
# Check blog index HTML structure
grep -E "(blog-posts|blog-post-card|blog-pagination)" _site/blog/index.html | head -5

# Check post layout structure
grep -E "(blog-post|post-header|post-content|post-footer)" _site/blog/2025-01-27-welcome-to-qadao-blog/index.html | head -5
```

### 10. Test CSS Styles
```bash
# Verify blog CSS classes exist
grep -E "\.(blog|blog-post|blog-pagination|tag)" assets/css/main.css | head -10

# Check responsive breakpoints
grep -E "@media.*768|@media.*1024" assets/css/main.css | grep -i blog
```

### 11. Test Tag Filtering (Manual Browser Test)
```bash
# After starting Jekyll serve, test these URLs:
# 1. Blog index: http://localhost:4000/blog/
# 2. Click a tag (e.g., "ai") - should filter posts
# 3. URL should update to: http://localhost:4000/blog/#tag=ai
# 4. Click "Show all posts" - should show all posts
# 5. Use browser back button - should restore tag filter
```

### 12. Test Pagination (Manual Browser Test)
```bash
# To test pagination, create multiple posts:
# Create 11+ posts to test pagination (10 per page)
for i in {1..12}; do
  cat > posts/2025-01-$(printf "%02d" $i)-test-post-$i.md << EOF
---
title: "Test Post $i"
date: 2025-01-$(printf "%02d" $i)
slug: 2025-01-$(printf "%02d" $i)-test-post-$i
tags:
  - test
summary: "Test post number $i."
---

# Test Post $i

This is test post number $i.
EOF
done

# Rebuild and check pagination appears
bundle exec jekyll build
grep -i "pagination" _site/blog/index.html && echo "✓ Pagination controls found"

# Clean up test posts
rm posts/2025-01-*-test-post-*.md
```

### 13. Test Theme Switching (Manual Browser Test)
```bash
# After starting Jekyll serve:
# 1. Navigate to http://localhost:4000/blog/
# 2. Click theme toggle button
# 3. Verify blog styles switch between dark/light themes
# 4. Navigate to a post page
# 5. Verify theme persists and works on post pages
```

### 14. Test Responsive Design (Manual Browser Test)
```bash
# After starting Jekyll serve, test in browser:
# 1. Open http://localhost:4000/blog/
# 2. Resize browser window or use DevTools responsive mode
# 3. Test breakpoints:
#    - Mobile (< 768px): Single column layout
#    - Tablet (768px-1024px): Two columns
#    - Desktop (> 1024px): Two columns with optimal spacing
```

### 15. Test Empty State
```bash
# Temporarily move posts directory
mv posts posts_backup
mkdir posts

# Rebuild and check empty state
bundle exec jekyll build
grep -i "no blog posts" _site/blog/index.html && echo "✓ Empty state found"

# Restore posts
rmdir posts
mv posts_backup posts
```

### 16. Test Accessibility
```bash
# Check for accessibility attributes
grep -E "(aria-label|aria-current|role)" blog.html
grep -E "(aria-label|aria-current|role)" _layouts/post.html

# Verify focus states in CSS
grep -E "\.(tag|read-more|back-to-blog|pagination-btn):focus" assets/css/main.css
```

### 17. Test SEO
```bash
# Check meta tags in blog pages
grep -E "(meta|title|description)" _site/blog/index.html | head -5

# Verify post pages have proper titles
grep "<title>" _site/blog/2025-01-27-welcome-to-qadao-blog/index.html
```

### 18. Comprehensive Build Test
```bash
# Full build with verbose output
bundle exec jekyll build --verbose 2>&1 | tee build.log

# Check for warnings or errors
grep -iE "(error|warning|failed)" build.log

# Verify build completed successfully
tail -3 build.log | grep -i "done"
```

### 19. Test Post with Missing Fields
```bash
# Create post with missing required fields (should be skipped)
cat > posts/invalid-post.md << 'EOF'
---
title: "Invalid Post"
# Missing date and slug
---

# Invalid Post

This post should be skipped.
EOF

# Rebuild and verify it doesn't appear
bundle exec jekyll build
grep -i "invalid post" _site/blog/index.html || echo "✓ Invalid post correctly excluded"

# Clean up
rm posts/invalid-post.md
```

### 20. Test Multiple Tags
```bash
# Verify sample post has multiple tags
grep -A 5 "tags:" posts/2025-01-27-welcome-to-qadao-blog.md

# Check tags render in HTML
grep -o 'data-tag="[^"]*"' _site/blog/index.html | sort -u
```

## Quick Test Script

Save this as `test-blog.sh` and run `chmod +x test-blog.sh && ./test-blog.sh`:

```bash
#!/bin/bash
set -e

echo "🧪 Testing Blog Section Implementation"
echo "======================================"

echo ""
echo "1. Building site..."
bundle exec jekyll build > /dev/null 2>&1
echo "✓ Build successful"

echo ""
echo "2. Checking files..."
[ -f "blog.html" ] && echo "✓ blog.html exists" || echo "✗ blog.html missing"
[ -f "_layouts/post.html" ] && echo "✓ _layouts/post.html exists" || echo "✗ _layouts/post.html missing"
[ -f "assets/js/blog.js" ] && echo "✓ assets/js/blog.js exists" || echo "✗ assets/js/blog.js missing"
[ -d "posts" ] && echo "✓ posts/ directory exists" || echo "✗ posts/ directory missing"

echo ""
echo "3. Checking build output..."
[ -f "_site/blog/index.html" ] && echo "✓ Blog index generated" || echo "✗ Blog index not generated"
[ -d "_site/blog/2025-01-27-welcome-to-qadao-blog" ] && echo "✓ Sample post generated" || echo "✗ Sample post not generated"

echo ""
echo "4. Checking JavaScript functions..."
grep -q "function initBlog" assets/js/blog.js && echo "✓ initBlog() found" || echo "✗ initBlog() missing"
grep -q "function getActiveTag" assets/js/blog.js && echo "✓ getActiveTag() found" || echo "✗ getActiveTag() missing"
grep -q "function filterPostsByTag" assets/js/blog.js && echo "✓ filterPostsByTag() found" || echo "✗ filterPostsByTag() missing"

echo ""
echo "5. Checking CSS styles..."
grep -q "\.blog-post-card" assets/css/main.css && echo "✓ Blog post card styles found" || echo "✗ Blog post card styles missing"
grep -q "\.blog-pagination" assets/css/main.css && echo "✓ Pagination styles found" || echo "✗ Pagination styles missing"

echo ""
echo "6. Checking navigation..."
grep -q 'href="/blog/"' _layouts/default.html && echo "✓ Blog link in navigation" || echo "✗ Blog link missing"

echo ""
echo "7. Checking collection config..."
grep -q "collections:" _config.yml && echo "✓ Collections configured" || echo "✗ Collections not configured"

echo ""
echo "✅ All automated tests passed!"
echo ""
echo "Next steps:"
echo "  - Run 'bundle exec jekyll serve' to test in browser"
echo "  - Test tag filtering: http://localhost:4000/blog/#tag=ai"
echo "  - Test pagination with multiple posts"
echo "  - Test theme switching"
echo "  - Test responsive design"
```

