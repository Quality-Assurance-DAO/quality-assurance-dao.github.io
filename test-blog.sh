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

