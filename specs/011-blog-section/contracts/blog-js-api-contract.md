# Blog JavaScript API Contract

**Feature**: 011-blog-section  
**Date**: 2025-01-27  
**Contract Type**: JavaScript API

## Overview

This contract defines the JavaScript API for blog index pagination and tag filtering functionality. The API handles client-side pagination, tag filtering, URL hash management, and state management.

## File Location

- **Path**: `assets/js/blog.js`
- **Included In**: `blog.html` template
- **Execution**: Runs on page load and handles user interactions

## API Functions

### Initialization

```javascript
/**
 * Initialize blog functionality on page load
 * - Parse URL hash for active tag filter
 * - Apply pagination
 * - Set up event listeners
 */
function initBlog() {
  // Implementation
}
```

### Pagination Functions

```javascript
/**
 * Get current page number from state or URL
 * @returns {number} Current page number (1-indexed)
 */
function getCurrentPage() {
  // Implementation
}

/**
 * Set current page and update display
 * @param {number} page - Page number (1-indexed)
 */
function setCurrentPage(page) {
  // Implementation
}

/**
 * Calculate total number of pages
 * @param {number} totalPosts - Total number of posts
 * @param {number} postsPerPage - Posts per page (default: 10)
 * @returns {number} Total number of pages
 */
function getTotalPages(totalPosts, postsPerPage = 10) {
  // Implementation
}

/**
 * Get posts for current page
 * @param {Array} posts - All posts array
 * @param {number} currentPage - Current page number
 * @param {number} postsPerPage - Posts per page
 * @returns {Array} Posts for current page
 */
function getPostsForPage(posts, currentPage, postsPerPage = 10) {
  // Implementation
}

/**
 * Render pagination controls
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 */
function renderPagination(currentPage, totalPages) {
  // Implementation
}
```

### Tag Filtering Functions

```javascript
/**
 * Get active tag from URL hash
 * @returns {string|null} Active tag or null
 */
function getActiveTag() {
  // Implementation
}

/**
 * Set active tag filter and update display
 * @param {string|null} tag - Tag to filter by, or null to clear filter
 */
function setActiveTag(tag) {
  // Implementation
}

/**
 * Filter posts by tag
 * @param {Array} posts - All posts array
 * @param {string} tag - Tag to filter by
 * @returns {Array} Filtered posts
 */
function filterPostsByTag(posts, tag) {
  // Implementation
}

/**
 * Update URL hash with active tag
 * @param {string|null} tag - Active tag or null
 */
function updateURLHash(tag) {
  // Implementation
}
```

### Display Functions

```javascript
/**
 * Show posts for current page
 * @param {Array} posts - Posts to display
 */
function showPosts(posts) {
  // Implementation
}

/**
 * Hide all posts
 */
function hideAllPosts() {
  // Implementation
}

/**
 * Show empty state message
 */
function showEmptyState() {
  // Implementation
}

/**
 * Hide empty state message
 */
function hideEmptyState() {
  // Implementation
}
```

## State Management

### State Variables

```javascript
// Current page number (1-indexed)
let currentPage = 1;

// Active tag filter (null if no filter)
let activeTag = null;

// All posts (from DOM)
let allPosts = [];

// Filtered posts (after tag filtering)
let filteredPosts = [];

// Posts per page (from data attribute or default)
const postsPerPage = parseInt(
  document.getElementById('blog-posts')?.dataset.postsPerPage || '10'
);
```

## Event Handlers

### Tag Click Handler

```javascript
/**
 * Handle tag click event
 * @param {Event} event - Click event
 */
function handleTagClick(event) {
  const tag = event.target.dataset.tag;
  if (tag) {
    setActiveTag(tag);
    setCurrentPage(1); // Reset to first page when filtering
  }
}
```

### Pagination Click Handler

```javascript
/**
 * Handle pagination control click
 * @param {Event} event - Click event
 */
function handlePaginationClick(event) {
  const page = parseInt(event.target.dataset.page);
  if (page && page > 0) {
    setCurrentPage(page);
  }
}
```

### Hash Change Handler

```javascript
/**
 * Handle URL hash change (browser back/forward)
 */
function handleHashChange() {
  const tag = getActiveTag();
  setActiveTag(tag);
  setCurrentPage(1);
}
```

## URL Hash Format

### Tag Filter Hash
- Format: `#tag=<tag-name>`
- Example: `#tag=ai`
- Encoding: Tag name should be URL-encoded if it contains special characters

### Parsing Hash
```javascript
function getActiveTag() {
  const hash = window.location.hash;
  const match = hash.match(/^#tag=(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}
```

### Setting Hash
```javascript
function updateURLHash(tag) {
  if (tag) {
    window.location.hash = `#tag=${encodeURIComponent(tag)}`;
  } else {
    window.location.hash = '';
  }
}
```

## DOM Structure Requirements

### Posts Container
```html
<div id="blog-posts" data-posts-per-page="10">
  <!-- Post cards with data attributes -->
</div>
```

### Post Card Data Attributes
```html
<article 
  class="blog-post-card" 
  data-post-slug="2025-01-27-my-post"
  data-post-date="2025-01-27"
  data-post-tags="ai,blockchain,quality-assurance">
  <!-- Post content -->
</article>
```

### Pagination Container
```html
<div id="blog-pagination">
  <!-- Pagination controls rendered by JavaScript -->
</div>
```

### Empty State Container
```html
<div id="blog-empty-state" style="display: none;">
  <p>No blog posts found.</p>
</div>
```

## Execution Flow

### Page Load
1. Wait for DOM to be ready
2. Extract all posts from DOM
3. Parse URL hash for active tag
4. Filter posts by tag (if active)
5. Apply pagination (show first page)
6. Render pagination controls
7. Set up event listeners

### Tag Click
1. Get tag from clicked element
2. Update active tag state
3. Filter posts by tag
4. Reset to page 1
5. Update URL hash
6. Show filtered posts
7. Update pagination controls

### Pagination Click
1. Get page number from clicked element
2. Update current page state
3. Show posts for new page
4. Scroll to top of posts container (optional)

### Browser Back/Forward
1. Listen for hashchange event
2. Parse new hash for tag
3. Update active tag state
4. Filter posts accordingly
5. Reset to page 1
6. Show filtered posts

## Edge Cases

### No Posts
- Show empty state message
- Hide pagination controls
- Hide tag filter controls (optional)

### Filter with No Results
- Show empty state message
- Hide pagination controls
- Keep tag filter active

### Single Page
- Hide pagination controls or show single page indicator

### Invalid Page Number
- Clamp to valid range (1 to totalPages)
- Default to page 1 if invalid

### Invalid Tag in URL Hash
- Ignore invalid tag, show all posts
- Clear URL hash if tag doesn't exist

## Performance Considerations

### Initial Load
- All posts loaded in HTML (acceptable for blog scale)
- JavaScript processes posts client-side
- No additional HTTP requests needed

### Filtering/Pagination
- Instant updates (no server requests)
- Smooth transitions (CSS transitions optional)

## Testing Checklist

- [ ] Pagination displays correct number of posts per page
- [ ] Pagination controls work (Previous/Next, page numbers)
- [ ] Tag filtering filters posts correctly
- [ ] Tag filtering resets to page 1
- [ ] URL hash updates when filtering by tag
- [ ] Browser back/forward works with tag filter
- [ ] Empty state displays when no posts match filter
- [ ] Pagination hides when only one page exists
- [ ] Invalid page numbers handled gracefully
- [ ] Invalid tags in URL hash handled gracefully
- [ ] Page load initializes correctly
- [ ] Event listeners attached correctly

## Related Contracts

- **Blog Index Template**: `blog-index-template-contract.md` - Defines HTML structure
- **Blog Post Layout**: `blog-post-layout-contract.md` - Defines post page structure

