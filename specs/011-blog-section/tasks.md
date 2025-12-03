# Tasks: Blog Section

**Feature**: Blog Section  
**Branch**: `011-blog-section`  
**Date**: 2025-01-27  
**Status**: Ready for Implementation

## Overview

This document provides an actionable, dependency-ordered task list for implementing the blog section feature. Tasks are organized by phase, with each user story phase being independently testable and implementable.

## Implementation Strategy

**MVP Scope**: User Stories 1, 2, 3, and 5 (P1 priorities) - Core blog functionality with automatic post discovery and navigation integration.

**Incremental Delivery**: 
- Phase 1-2: Foundation (Setup and Jekyll configuration)
- Phase 3-6: Core blog functionality (Index, Posts, Navigation, Auto-discovery)
- Phase 7: Enhanced filtering (Tag-based filtering)
- Phase 8: Polish and cross-cutting concerns

## Dependencies

### User Story Completion Order

1. **Phase 1-2** (Setup & Foundational) → Must complete before all user stories
2. **Phase 3** (US1: Blog Index) → Can be developed in parallel with Phase 4 after Phase 2
3. **Phase 4** (US2: Individual Posts) → Can be developed in parallel with Phase 3 after Phase 2
4. **Phase 5** (US3: Navigation) → Depends on Phase 3 (blog index must exist)
5. **Phase 6** (US5: Auto-discovery) → Depends on Phase 1-2 (Jekyll collection config)
6. **Phase 7** (US4: Tag Filtering) → Depends on Phase 3 (blog index must exist)
7. **Phase 8** (Polish) → Depends on all previous phases

### Parallel Execution Opportunities

- **After Phase 2**: Phases 3 and 4 can be developed in parallel
- **Within Phase 3**: Blog index template and CSS styling can be done in parallel
- **Within Phase 4**: Post layout template and post CSS styling can be done in parallel
- **Within Phase 7**: Tag filtering JavaScript and tag CSS styling can be done in parallel

## Phase 1: Setup

**Goal**: Initialize project structure and prepare for blog feature implementation.

**Independent Test**: Verify posts directory exists and Jekyll configuration is ready.

### Tasks

- [ ] T001 Create `/posts` directory structure in repository root
- [ ] T002 Verify Jekyll is configured and working (`bundle exec jekyll build` succeeds)

---

## Phase 2: Foundational

**Goal**: Configure Jekyll Collections to process blog posts from custom `/posts` directory and set up core infrastructure.

**Independent Test**: Verify Jekyll collection configuration processes posts directory correctly.

### Tasks

- [ ] T003 Configure `posts` collection in `_config.yml` with `output: true` and `permalink: /blog/:slug/`
- [ ] T004 Verify collection configuration by running `bundle exec jekyll build` and checking for collection processing

---

## Phase 3: User Story 1 - View Blog Index Page [US1]

**Goal**: Visitors can access a blog index page that displays all published blog posts sorted by date (newest first). Each post listing shows the post title, publication date, optional summary/excerpt, tags, and a link to read the full post.

**Priority**: P1

**Independent Test**: Navigate to `/blog/` and verify all published posts are displayed correctly with proper sorting and metadata.

**Test Criteria**:
- All published posts display on blog index
- Posts sorted by date (newest first)
- Future-dated posts excluded from display
- Post titles, dates, summaries, and tags display correctly
- Post titles link to individual post pages
- Empty state displays when no posts exist
- Pagination works correctly (10 posts per page)

### Tasks

- [ ] T005 [P] [US1] Create `blog.html` page template in repository root with front matter (`layout: default`, `title: Blog`, `permalink: /blog/`)
- [ ] T006 [US1] Implement blog index HTML structure in `blog.html` with main container, section, and heading
- [ ] T007 [US1] Add Liquid template logic in `blog.html` to filter published posts (exclude future-dated posts) using `where_exp` filter
- [ ] T008 [US1] Add Liquid template logic in `blog.html` to sort posts by date (newest first) using `sort` filter
- [ ] T009 [US1] Implement post listing iteration in `blog.html` using `for` loop over `site.posts` collection
- [ ] T010 [US1] Add post card HTML structure in `blog.html` with data attributes (`data-post-slug`, `data-post-date`, `data-post-tags`)
- [ ] T011 [US1] Implement post title display with link to post URL in `blog.html` post card template
- [ ] T012 [US1] Implement post date display with formatted date in `blog.html` post card template
- [ ] T013 [US1] Add conditional summary/excerpt display in `blog.html` post card template (if `post.summary` exists)
- [ ] T014 [US1] Add conditional tags display in `blog.html` post card template (if `post.tags.size > 0`)
- [ ] T015 [US1] Add "Read more" link in `blog.html` post card template linking to post URL
- [ ] T016 [US1] Implement empty state HTML structure in `blog.html` with conditional display (`if published_posts.size == 0`)
- [ ] T017 [P] [US1] Add blog section CSS styles to `assets/css/main.css` (`.blog`, `.blog-posts`, `.blog-post-card` classes)
- [ ] T018 [US1] Add blog post card CSS styles to `assets/css/main.css` (card layout, spacing, typography)
- [ ] T019 [US1] Add blog post metadata CSS styles to `assets/css/main.css` (date, summary, tags styling)
- [ ] T020 [US1] Add blog empty state CSS styles to `assets/css/main.css` (empty state message styling)
- [ ] T021 [US1] Ensure blog CSS supports dark/light theme switching using CSS variables in `assets/css/main.css`
- [ ] T022 [US1] Add responsive design CSS for blog index in `assets/css/main.css` (mobile, tablet, desktop breakpoints)
- [ ] T023 [P] [US1] Create `assets/js/blog.js` file with initialization function `initBlog()`
- [ ] T024 [US1] Implement pagination state management in `assets/js/blog.js` (currentPage, postsPerPage variables)
- [ ] T025 [US1] Implement `getCurrentPage()` function in `assets/js/blog.js` to get current page from state
- [ ] T026 [US1] Implement `getTotalPages()` function in `assets/js/blog.js` to calculate total pages
- [ ] T027 [US1] Implement `getPostsForPage()` function in `assets/js/blog.js` to get posts for current page
- [ ] T028 [US1] Implement `showPosts()` function in `assets/js/blog.js` to display posts for current page
- [ ] T029 [US1] Implement `renderPagination()` function in `assets/js/blog.js` to render pagination controls
- [ ] T030 [US1] Add pagination controls HTML structure in `blog.html` with container div (`id="blog-pagination"`)
- [ ] T031 [US1] Implement pagination click handler in `assets/js/blog.js` to handle page navigation
- [ ] T032 [US1] Add pagination CSS styles to `assets/css/main.css` (pagination controls, buttons, page numbers)
- [ ] T033 [US1] Implement pagination initialization in `initBlog()` function in `assets/js/blog.js` (show first page on load)
- [ ] T034 [US1] Include `blog.js` script in `blog.html` template using `<script>` tag
- [ ] T035 [US1] Add DOM ready event listener in `assets/js/blog.js` to call `initBlog()` on page load

---

## Phase 4: User Story 2 - View Individual Blog Post [US2]

**Goal**: Visitors can read individual blog posts by navigating to dedicated post pages. Each post page displays the full post content (rendered from Markdown), post metadata (title, date, tags, author if available), and maintains navigation back to the blog index and main site.

**Priority**: P1

**Independent Test**: Navigate to a specific blog post URL (e.g., `/blog/2025-01-27-my-first-post/`) and verify content display, metadata, and navigation.

**Test Criteria**:
- Post content renders correctly from Markdown
- Post title, date, and tags display prominently
- Markdown formatting renders as HTML (headings, lists, links, code blocks)
- "Back to Blog" link navigates to blog index
- Theme switching works on post pages
- Responsive design works on mobile/tablet/desktop

### Tasks

- [ ] T036 [P] [US2] Create `_layouts/post.html` layout template with front matter (`layout: default`)
- [ ] T037 [US2] Implement post article HTML structure in `_layouts/post.html` with `<article class="blog-post">` container
- [ ] T038 [US2] Add post header HTML structure in `_layouts/post.html` with `<header class="post-header">` and post title (`<h1 class="post-title">{{ page.title }}</h1>`)
- [ ] T039 [US2] Implement post metadata HTML structure in `_layouts/post.html` with `<div class="post-meta">` container
- [ ] T040 [US2] Add post date display in `_layouts/post.html` with `<time>` element and formatted date
- [ ] T041 [US2] Add conditional tags display in `_layouts/post.html` (if `page.tags.size > 0`) with tag links
- [ ] T042 [US2] Implement tag links in `_layouts/post.html` that link to blog index with tag filter (`/blog/#tag={{ tag | url_encode }}`)
- [ ] T043 [US2] Add post content HTML structure in `_layouts/post.html` with `<div class="post-content">{{ content }}</div>`
- [ ] T044 [US2] Add post footer HTML structure in `_layouts/post.html` with `<footer class="post-footer">` and navigation
- [ ] T045 [US2] Implement "Back to Blog" link in `_layouts/post.html` footer linking to `/blog/`
- [ ] T046 [US2] Add conditional empty content handling in `_layouts/post.html` (if `content.size > 0`)
- [ ] T047 [P] [US2] Add blog post page CSS styles to `assets/css/main.css` (`.blog-post`, `.post-header`, `.post-title` classes)
- [ ] T048 [US2] Add post metadata CSS styles to `assets/css/main.css` (`.post-meta`, `.post-date`, `.post-tags` classes)
- [ ] T049 [US2] Add post content CSS styles to `assets/css/main.css` (`.post-content` with Markdown rendering support)
- [ ] T050 [US2] Add post footer CSS styles to `assets/css/main.css` (`.post-footer`, `.post-navigation`, `.back-to-blog` classes)
- [ ] T051 [US2] Add Markdown rendering CSS styles to `assets/css/main.css` (headings, paragraphs, lists, links, code blocks, blockquotes)
- [ ] T052 [US2] Ensure post page CSS supports dark/light theme switching using CSS variables in `assets/css/main.css`
- [ ] T053 [US2] Add responsive design CSS for post pages in `assets/css/main.css` (mobile, tablet, desktop breakpoints)

---

## Phase 5: User Story 3 - Navigate to Blog from Main Site [US3]

**Goal**: Visitors can easily discover and navigate to the blog section from the main site navigation. The blog link appears in the site's navigation menu alongside existing pages.

**Priority**: P1

**Independent Test**: Check the navigation menu and verify the blog link appears and functions correctly.

**Test Criteria**:
- Blog link appears in main navigation menu
- Blog link navigates to blog index page
- Blog link appears alongside other navigation items
- Blog link accessible in mobile navigation menu
- Blog link remains visible and functional on blog post pages

### Tasks

- [ ] T054 [US3] Add "Blog" link to navigation menu in `_layouts/default.html` (in `nav-links` div, after "Recent Projects" link)
- [ ] T055 [US3] Verify blog link appears in desktop navigation menu
- [ ] T056 [US3] Verify blog link appears in mobile navigation menu (hamburger menu)
- [ ] T057 [US3] Test blog link navigation from homepage to blog index
- [ ] T058 [US3] Test blog link navigation from blog post pages to blog index

---

## Phase 6: User Story 5 - Automatic Post Discovery [US5]

**Goal**: When a new Markdown blog post is added to the posts directory with proper front matter, it automatically appears on the blog index page after the site is rebuilt, without requiring manual HTML authoring or template modifications.

**Priority**: P1

**Independent Test**: Add a new Markdown file to the posts directory and verify it appears on the blog index after rebuild.

**Test Criteria**:
- New post with valid front matter appears on blog index after rebuild
- New post automatically sorted correctly by date among existing posts
- New post accessible via its slug-based URL
- Removed post no longer appears on blog index after rebuild
- Updated post front matter reflected on blog index and post page after rebuild

### Tasks

- [ ] T059 [US5] Create sample blog post file in `/posts/` directory with valid front matter (title, date, slug) following `blog-post-schema.json`
- [ ] T060 [US5] Verify Jekyll build processes new post (`bundle exec jekyll build`)
- [ ] T061 [US5] Verify new post appears on blog index page after rebuild
- [ ] T062 [US5] Verify new post is accessible via slug-based URL (`/blog/:slug/`)
- [ ] T063 [US5] Test post removal: delete post file and verify it no longer appears on blog index after rebuild
- [ ] T064 [US5] Test post update: modify post front matter and verify changes reflected on blog index and post page after rebuild
- [ ] T065 [US5] Verify posts with missing required front matter fields (title, date, slug) are skipped with warning during build
- [ ] T066 [US5] Verify future-dated posts are excluded from blog index display

---

## Phase 7: User Story 4 - Filter Posts by Tags/Categories [US4]

**Goal**: Visitors can filter blog posts by tags or categories to find content on specific topics. When tags are clicked or selected, the blog index displays only posts matching that tag.

**Priority**: P2

**Independent Test**: Click tags on the blog index or individual posts and verify filtered results display correctly.

**Test Criteria**:
- Tags display as clickable elements on blog index
- Clicking tag filters posts to show only posts with that tag
- Active tag clearly indicated in filtered results
- Filtered posts still sorted by date
- "Show all posts" option clears filter
- Tag links from post pages filter blog index by tag
- URL hash updates when filtering by tag (`#tag=ai`)
- Browser back/forward works with tag filter

### Tasks

- [ ] T067 [P] [US4] Implement `getActiveTag()` function in `assets/js/blog.js` to parse URL hash for active tag (`#tag=<tag-name>`)
- [ ] T068 [US4] Implement `setActiveTag()` function in `assets/js/blog.js` to set active tag filter and update display
- [ ] T069 [US4] Implement `filterPostsByTag()` function in `assets/js/blog.js` to filter posts array by tag
- [ ] T070 [US4] Implement `updateURLHash()` function in `assets/js/blog.js` to update URL hash with active tag
- [ ] T071 [US4] Add tag click handler function `handleTagClick()` in `assets/js/blog.js` to handle tag click events
- [ ] T072 [US4] Add event listeners for tag clicks in `initBlog()` function in `assets/js/blog.js` (delegate to tag elements)
- [ ] T073 [US4] Implement tag filtering initialization in `initBlog()` function in `assets/js/blog.js` (parse URL hash, apply filter on load)
- [ ] T074 [US4] Add hash change event listener in `assets/js/blog.js` to handle browser back/forward (`window.addEventListener('hashchange')`)
- [ ] T075 [US4] Implement `handleHashChange()` function in `assets/js/blog.js` to update filter when URL hash changes
- [ ] T076 [US4] Update pagination logic in `assets/js/blog.js` to work with filtered posts (filter first, then paginate)
- [ ] T077 [US4] Reset pagination to page 1 when tag filter is applied in `assets/js/blog.js`
- [ ] T078 [US4] Add "Show all posts" button/link in `blog.html` template to clear tag filter
- [ ] T079 [US4] Implement "Show all posts" functionality in `assets/js/blog.js` to clear active tag filter
- [ ] T080 [US4] Update empty state logic in `assets/js/blog.js` to show empty state when no posts match tag filter
- [ ] T081 [P] [US4] Add tag filter CSS styles to `assets/css/main.css` (`.blog-tags`, `.tag` classes, active tag styling)
- [ ] T082 [US4] Add tag clickable styling to `assets/css/main.css` (hover states, cursor pointer)
- [ ] T083 [US4] Add active tag indicator CSS styles to `assets/css/main.css` (visual indication of active filter)
- [ ] T084 [US4] Add "Show all posts" button CSS styles to `assets/css/main.css` (button styling, positioning)

---

## Phase 8: Polish & Cross-Cutting Concerns

**Goal**: Ensure blog feature integrates seamlessly with existing site, handles edge cases gracefully, and maintains consistent styling and functionality.

**Independent Test**: Verify blog feature works correctly with existing site functionality, handles edge cases, and maintains consistent user experience.

**Test Criteria**:
- Blog pages maintain consistent styling with rest of site
- Theme switching works on all blog pages
- Responsive design works on all blog pages
- Edge cases handled gracefully (empty states, missing fields, etc.)
- Site build completes successfully with blog feature
- No conflicts with existing site functionality

### Tasks

- [ ] T085 Verify blog pages maintain consistent styling with rest of site (theme, colors, typography)
- [ ] T086 Test theme switching on blog index page (dark/light mode)
- [ ] T087 Test theme switching on blog post pages (dark/light mode)
- [ ] T088 Verify responsive design on blog index (mobile < 768px, tablet 768px-1024px, desktop > 1024px)
- [ ] T089 Verify responsive design on blog post pages (mobile, tablet, desktop)
- [ ] T090 Test empty state display when no posts exist (blog index shows appropriate message)
- [ ] T091 Test empty state display when tag filter has no results (blog index shows "No posts found")
- [ ] T092 Verify pagination hides when only one page exists
- [ ] T093 Test pagination with exactly 10 posts (should show pagination controls)
- [ ] T094 Test pagination with more than 10 posts (should paginate correctly)
- [ ] T095 Verify posts with missing optional fields (summary, tags) display gracefully
- [ ] T096 Verify posts with very long content display and scroll properly
- [ ] T097 Verify posts with very long summaries truncate or display appropriately
- [ ] T098 Verify posts with many tags display appropriately without breaking layout
- [ ] T099 Test direct URL access to non-existent post (should display 404 or handle gracefully)
- [ ] T100 Verify site build completes successfully with blog feature (`bundle exec jekyll build`)
- [ ] T101 Verify existing site functionality still works (services, projects, partners sections)
- [ ] T102 Test blog link accessibility (keyboard navigation, screen readers)
- [ ] T103 Verify blog pages are SEO-friendly (meta tags, structured data if applicable)
- [ ] T104 Test browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] T105 Verify blog JavaScript works with JavaScript disabled (graceful degradation)

---

## Summary

### Task Statistics

- **Total Tasks**: 105
- **Setup Tasks**: 2 (Phase 1)
- **Foundational Tasks**: 2 (Phase 2)
- **User Story 1 Tasks**: 31 (Phase 3)
- **User Story 2 Tasks**: 18 (Phase 4)
- **User Story 3 Tasks**: 5 (Phase 5)
- **User Story 5 Tasks**: 8 (Phase 6)
- **User Story 4 Tasks**: 18 (Phase 7)
- **Polish Tasks**: 21 (Phase 8)

### Parallel Opportunities

- **After Phase 2**: Phases 3 and 4 can be developed in parallel
- **Within Phase 3**: Tasks T005, T017, T023 can be done in parallel (template, CSS, JS files)
- **Within Phase 4**: Tasks T036, T047 can be done in parallel (layout template, CSS)
- **Within Phase 7**: Tasks T067, T081 can be done in parallel (JavaScript functions, CSS)

### MVP Scope

**Recommended MVP**: Phases 1-6 (User Stories 1, 2, 3, 5)
- Core blog functionality with automatic post discovery
- Blog index with pagination
- Individual post pages
- Navigation integration
- **Excludes**: Tag filtering (Phase 7) - can be added incrementally

### Format Validation

✅ All tasks follow the checklist format:
- Checkbox: `- [ ]`
- Task ID: `T001`, `T002`, etc.
- Parallel marker: `[P]` where applicable
- Story label: `[US1]`, `[US2]`, etc. for user story phases
- Description: Clear action with file path

### Next Steps

1. Begin with Phase 1 (Setup) - Create posts directory
2. Complete Phase 2 (Foundational) - Configure Jekyll collection
3. Implement Phases 3-6 (Core blog functionality) - Can parallelize Phases 3 and 4
4. Add Phase 7 (Tag filtering) - Enhanced functionality
5. Complete Phase 8 (Polish) - Final testing and refinement

