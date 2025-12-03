/**
 * Posts Index Pagination and Tag Filtering
 * Handles client-side pagination and tag-based filtering for posts
 */

// State management
let currentPage = 1;
let activeTag = null;
let allPosts = [];
let filteredPosts = [];

// Get posts per page from data attribute or default to 10
const postsPerPage = parseInt(
  document.getElementById('blog-posts')?.dataset.postsPerPage || '10'
);

/**
 * Initialize blog functionality on page load
 */
function initBlog() {
  const postsContainer = document.getElementById('blog-posts');
  if (!postsContainer) return;
  
  // Extract all posts from DOM
  allPosts = Array.from(postsContainer.querySelectorAll('.blog-post-card'));
  
  // Parse URL hash for active tag
  activeTag = getActiveTag();
  
  // Apply tag filter if active
  if (activeTag) {
    filteredPosts = filterPostsByTag(allPosts, activeTag);
    showFilterControls();
  } else {
    filteredPosts = allPosts;
    hideFilterControls();
  }
  
  // Reset to page 1
  currentPage = 1;
  
  // Show first page
  showPosts(getPostsForPage(filteredPosts, currentPage, postsPerPage));
  
  // Render pagination
  renderPagination(currentPage, getTotalPages(filteredPosts.length, postsPerPage));
  
  // Set up event listeners
  setupEventListeners();
}

/**
 * Set up event listeners for tag clicks, pagination, and hash changes
 */
function setupEventListeners() {
  const postsContainer = document.getElementById('blog-posts');
  if (!postsContainer) return;
  
  // Tag click handler (event delegation)
  postsContainer.addEventListener('click', function(event) {
    const tagElement = event.target.closest('.tag[data-tag]');
    if (tagElement) {
      event.preventDefault();
      handleTagClick(event);
    }
  });
  
  // Pagination click handler (event delegation)
  const paginationContainer = document.getElementById('blog-pagination');
  if (paginationContainer) {
    paginationContainer.addEventListener('click', function(event) {
      const pageButton = event.target.closest('[data-page]');
      if (pageButton) {
        event.preventDefault();
        handlePaginationClick(event);
      }
    });
  }
  
  // Show all posts button
  const showAllButton = document.getElementById('show-all-posts');
  if (showAllButton) {
    showAllButton.addEventListener('click', function(event) {
      event.preventDefault();
      handleShowAllClick();
    });
  }
  
  // Hash change handler (browser back/forward)
  window.addEventListener('hashchange', handleHashChange);
}

/**
 * Get current page number from state
 * @returns {number} Current page number (1-indexed)
 */
function getCurrentPage() {
  return currentPage;
}

/**
 * Set current page and update display
 * @param {number} page - Page number (1-indexed)
 */
function setCurrentPage(page) {
  const totalPages = getTotalPages(filteredPosts.length, postsPerPage);
  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;
  
  currentPage = page;
  
  // Show posts for current page
  const postsToShow = getPostsForPage(filteredPosts, currentPage, postsPerPage);
  showPosts(postsToShow);
  
  // Update pagination controls
  renderPagination(currentPage, totalPages);
  
  // Scroll to top of posts container
  const postsContainer = document.getElementById('blog-posts');
  if (postsContainer) {
    postsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Calculate total number of pages
 * @param {number} totalPosts - Total number of posts
 * @param {number} postsPerPage - Posts per page (default: 10)
 * @returns {number} Total number of pages
 */
function getTotalPages(totalPosts, postsPerPage = 10) {
  if (totalPosts === 0) return 0;
  return Math.ceil(totalPosts / postsPerPage);
}

/**
 * Get posts for current page
 * @param {Array} posts - All posts array
 * @param {number} currentPage - Current page number
 * @param {number} postsPerPage - Posts per page
 * @returns {Array} Posts for current page
 */
function getPostsForPage(posts, currentPage, postsPerPage = 10) {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  return posts.slice(startIndex, endIndex);
}

/**
 * Show posts for current page
 * @param {Array} posts - Posts to display
 */
function showPosts(posts) {
  // Hide all posts first
  hideAllPosts();
  
  // Show posts for current page
  posts.forEach(post => {
    post.style.display = '';
  });
  
  // Show/hide empty state
  if (posts.length === 0) {
    showEmptyState();
  } else {
    hideEmptyState();
  }
}

/**
 * Hide all posts
 */
function hideAllPosts() {
  allPosts.forEach(post => {
    post.style.display = 'none';
  });
}

/**
 * Show empty state message
 */
function showEmptyState() {
  const emptyState = document.getElementById('blog-empty-state');
  if (emptyState) {
    emptyState.style.display = 'block';
  }
}

/**
 * Hide empty state message
 */
function hideEmptyState() {
  const emptyState = document.getElementById('blog-empty-state');
  if (emptyState) {
    emptyState.style.display = 'none';
  }
}

/**
 * Render pagination controls
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 */
function renderPagination(currentPage, totalPages) {
  const paginationContainer = document.getElementById('blog-pagination');
  if (!paginationContainer) return;
  
  // Hide pagination if only one page or no pages
  if (totalPages <= 1) {
    paginationContainer.style.display = 'none';
    return;
  }
  
  paginationContainer.style.display = 'flex';
  
  let html = '<div class="pagination-controls">';
  
  // Previous button
  if (currentPage > 1) {
    html += `<button class="pagination-btn" data-page="${currentPage - 1}" aria-label="Previous page">Previous</button>`;
  } else {
    html += '<button class="pagination-btn disabled" disabled aria-label="Previous page">Previous</button>';
  }
  
  // Page numbers
  html += '<div class="pagination-numbers">';
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      html += `<span class="pagination-number active" aria-current="page">${i}</span>`;
    } else {
      html += `<button class="pagination-number" data-page="${i}" aria-label="Go to page ${i}">${i}</button>`;
    }
  }
  html += '</div>';
  
  // Next button
  if (currentPage < totalPages) {
    html += `<button class="pagination-btn" data-page="${currentPage + 1}" aria-label="Next page">Next</button>`;
  } else {
    html += '<button class="pagination-btn disabled" disabled aria-label="Next page">Next</button>';
  }
  
  html += '</div>';
  paginationContainer.innerHTML = html;
}

/**
 * Get active tag from URL hash
 * @returns {string|null} Active tag or null
 */
function getActiveTag() {
  const hash = window.location.hash;
  const match = hash.match(/^#tag=(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Set active tag filter and update display
 * @param {string|null} tag - Tag to filter by, or null to clear filter
 */
function setActiveTag(tag) {
  activeTag = tag;
  
  // Filter posts
  if (tag) {
    filteredPosts = filterPostsByTag(allPosts, tag);
    showFilterControls();
  } else {
    filteredPosts = allPosts;
    hideFilterControls();
  }
  
  // Reset to page 1
  currentPage = 1;
  
  // Update URL hash
  updateURLHash(tag);
  
  // Show filtered posts
  showPosts(getPostsForPage(filteredPosts, currentPage, postsPerPage));
  
  // Update pagination
  renderPagination(currentPage, getTotalPages(filteredPosts.length, postsPerPage));
}

/**
 * Filter posts by tag
 * @param {Array} posts - All posts array
 * @param {string} tag - Tag to filter by
 * @returns {Array} Filtered posts
 */
function filterPostsByTag(posts, tag) {
  return posts.filter(post => {
    const tags = post.dataset.postTags;
    if (!tags) return false;
    const tagArray = tags.split(',').map(t => t.trim().toLowerCase());
    return tagArray.includes(tag.toLowerCase());
  });
}

/**
 * Update URL hash with active tag
 * @param {string|null} tag - Active tag or null
 */
function updateURLHash(tag) {
  if (tag) {
    window.location.hash = `#tag=${encodeURIComponent(tag)}`;
  } else {
    // Remove hash without triggering page reload
    history.replaceState(null, null, window.location.pathname + window.location.search);
  }
}

/**
 * Show filter controls (show all posts button)
 */
function showFilterControls() {
  const filterControls = document.getElementById('blog-filter-controls');
  if (filterControls) {
    filterControls.style.display = 'block';
  }
}

/**
 * Hide filter controls
 */
function hideFilterControls() {
  const filterControls = document.getElementById('blog-filter-controls');
  if (filterControls) {
    filterControls.style.display = 'none';
  }
}

/**
 * Handle tag click event
 * @param {Event} event - Click event
 */
function handleTagClick(event) {
  const tagElement = event.target.closest('.tag[data-tag]');
  if (!tagElement) return;
  
  const tag = tagElement.dataset.tag;
  if (tag) {
    setActiveTag(tag);
  }
}

/**
 * Handle pagination control click
 * @param {Event} event - Click event
 */
function handlePaginationClick(event) {
  const pageButton = event.target.closest('[data-page]');
  if (!pageButton) return;
  
  const page = parseInt(pageButton.dataset.page);
  if (page && page > 0) {
    setCurrentPage(page);
  }
}

/**
 * Handle show all posts button click
 */
function handleShowAllClick() {
  setActiveTag(null);
}

/**
 * Handle URL hash change (browser back/forward)
 */
function handleHashChange() {
  const tag = getActiveTag();
  setActiveTag(tag);
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlog);
} else {
  initBlog();
}

