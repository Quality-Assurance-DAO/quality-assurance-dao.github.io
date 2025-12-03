# Quickstart: Blog Section

**Feature**: Blog Section  
**Date**: 2025-01-27  
**Phase**: 1 - Design & Contracts

## Overview

This guide provides a quick introduction to the blog section feature, helping developers understand the structure, key files, and how to get started with implementation.

## What This Feature Does

Adds a blog section to the QADAO Jekyll static site that:
- Stores blog posts as Markdown files in a custom `/posts` directory
- Automatically discovers and processes posts during Jekyll build
- Generates a blog index page listing all published posts sorted by date
- Creates individual blog post pages accessible via `/blog/post-slug` URLs
- Implements client-side pagination (10 posts per page)
- Supports tag-based filtering with URL hash support
- Integrates blog link into main site navigation
- Maintains compatibility with existing site design and theme system

## Key Files & Directories

### Blog Posts Directory
- `/posts/` - Custom directory for Markdown blog post files
  - Example: `posts/2025-01-27-my-first-post.md`
  - Files contain YAML front matter + Markdown content

### Configuration
- `_config.yml` - Jekyll configuration (add `posts` collection configuration)

### Layouts & Templates
- `_layouts/default.html` - Main layout (add blog navigation link)
- `_layouts/post.html` - Blog post layout template (NEW)
- `blog.html` - Blog index page template (NEW)

### Styling
- `assets/css/main.css` - Main stylesheet (add blog-specific styles)
  - Blog post cards, pagination, tag filters
  - Theme-aware (dark/light mode support)
  - Responsive design

### JavaScript
- `assets/js/blog.js` - Blog pagination and filtering logic (NEW)

## Blog Post Structure

### Front Matter (Required)
```yaml
---
title: "My First Blog Post"
date: 2025-01-27
slug: 2025-01-27-my-first-post
tags:
  - ai
  - blockchain
summary: "This is a summary of my first blog post."
---
```

### Front Matter Fields
- `title` (string, required) - Blog post title
- `date` (date, required) - Publication date (YYYY-MM-DD)
- `slug` (string, required) - URL-friendly identifier (include date prefix for uniqueness)
- `tags` (array, optional) - Tags for categorization
- `summary` (string, optional) - Post summary for blog index

### Content
- Markdown content follows front matter
- Supports headings, lists, links, images, code blocks, etc.
- Rendered as HTML during Jekyll build

## Jekyll Collection Configuration

Add to `_config.yml`:

```yaml
collections:
  posts:
    output: true
    permalink: /blog/:slug/
```

This configuration:
- Processes files from `/posts` directory
- Generates HTML pages for each post
- Creates URLs using `/blog/:slug/` pattern

## Blog Index Page

### File: `blog.html`
- Lists all published blog posts
- Sorted by date (newest first)
- Excludes future-dated posts
- Client-side pagination (10 posts per page)
- Client-side tag filtering

### Post Listing Structure
Each post listing displays:
- Post title (links to post page)
- Publication date
- Summary/excerpt (if available)
- Tags (clickable for filtering)
- "Read more" link

## Individual Post Pages

### Layout: `_layouts/post.html`
- Extends default layout
- Displays post title, date, tags
- Renders Markdown content as HTML
- Includes "Back to Blog" navigation link
- Tag links filter blog index by tag

### URL Structure
- Pattern: `/blog/:slug/`
- Example: `/blog/2025-01-27-my-first-post/`
- Generated from `slug` field in front matter

## Pagination

### How It Works
- Client-side pagination using JavaScript
- 10 posts per page (configurable)
- Pagination controls: Previous/Next, page numbers
- Hidden when only one page exists

### Implementation
- All posts loaded in HTML
- JavaScript divides posts into pages
- Shows/hides posts based on current page
- Updates pagination controls

## Tag Filtering

### How It Works
- Client-side filtering using JavaScript
- Click tag to filter posts
- URL hash updates (`#tag=ai`)
- Filter resets pagination to page 1
- "Show all" clears filter

### Implementation
- Tags extracted from post front matter
- Rendered as clickable elements
- JavaScript filters posts by tag
- URL hash stores active filter
- Browser back/forward works with filters

## Navigation Integration

### Adding Blog Link
Update `_layouts/default.html` navigation:

```liquid
<div class="nav-links" id="nav-links">
  <a href="#services">Our Services</a>
  <a href="#portfolio">Recent Projects</a>
  <a href="/blog/">Blog</a>  <!-- NEW -->
  <a href="#about">About Us</a>
  <a href="#contact">Follow Us</a>
</div>
```

## Theme System Integration

### Blog Pages Support Themes
- Dark/light theme switching works on blog pages
- Uses existing CSS variables for colors
- Theme toggle button available (from default layout)
- Consistent styling with rest of site

## Responsive Design

### Breakpoints
- Mobile: `< 768px` - Single column, stacked layout
- Tablet: `768px - 1024px` - Two columns, adjusted spacing
- Desktop: `> 1024px` - Multi-column grid, optimal spacing

### Blog-Specific Responsive Features
- Post cards stack on mobile
- Pagination controls adapt to screen size
- Tag filters wrap appropriately
- Post content readable on all devices

## Build Process

### Automatic Post Discovery
1. Author creates Markdown file in `/posts/` directory
2. Adds front matter with required fields
3. Commits file to repository
4. Jekyll build processes collection
5. Post appears on blog index automatically
6. Individual post page generated

### Build Commands
```bash
# Build site locally
bundle exec jekyll build

# Serve site locally with auto-reload
bundle exec jekyll serve

# Check for build errors
bundle exec jekyll build --verbose
```

## Edge Cases Handled

### Missing Required Fields
- Post skipped during build
- Warning logged
- Build continues successfully
- Post excluded from blog index

### Future-Dated Posts
- Excluded from blog index
- Hidden until publication date
- Appear automatically after rebuild when date arrives

### Duplicate Slugs
- Use date-prefixed slugs (e.g., `2025-01-27-post-slug`)
- Ensures URL uniqueness
- Documented in post template

### Empty Posts Directory
- Blog index displays empty state message
- Site builds successfully
- No errors or warnings

### No Posts Match Filter
- Empty state message displayed
- Pagination hidden
- Tag filter remains active

## Testing Checklist

### Post Creation
- [ ] Create post with valid front matter
- [ ] Post appears on blog index after build
- [ ] Post accessible via `/blog/:slug/` URL
- [ ] Post content renders correctly

### Blog Index
- [ ] All published posts display
- [ ] Posts sorted by date (newest first)
- [ ] Future-dated posts excluded
- [ ] Pagination works (10 posts per page)
- [ ] Empty state displays when no posts

### Tag Filtering
- [ ] Tags display on blog index
- [ ] Clicking tag filters posts
- [ ] URL hash updates (`#tag=ai`)
- [ ] Browser back/forward works
- [ ] "Show all" clears filter

### Navigation
- [ ] Blog link appears in navigation
- [ ] Blog link navigates to blog index
- [ ] "Back to Blog" link works on post pages

### Theme & Responsive
- [ ] Theme switching works on blog pages
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Styling consistent with site design

## Quick Implementation Steps

1. **Configure Collection**: Add `posts` collection to `_config.yml`
2. **Create Post Layout**: Create `_layouts/post.html` layout template
3. **Create Blog Index**: Create `blog.html` page template
4. **Add Navigation Link**: Update `_layouts/default.html` navigation
5. **Add Blog Styles**: Add blog-specific CSS to `assets/css/main.css`
6. **Add Blog JavaScript**: Create `assets/js/blog.js` for pagination/filtering
7. **Create Posts Directory**: Create `/posts/` directory
8. **Add Sample Post**: Create sample post to test functionality
9. **Build & Test**: Run `bundle exec jekyll build` and test locally

## Related Documentation

- **Data Model**: `data-model.md` - Detailed entity definitions
- **Research**: `research.md` - Technical decisions and rationale
- **Contracts**: `contracts/` - API contracts and schemas
- **Spec**: `spec.md` - Complete feature specification

## Next Steps

After reviewing this quickstart:
1. Read `data-model.md` for detailed entity definitions
2. Review `contracts/` for API specifications
3. Check `research.md` for technical decisions
4. Refer to `spec.md` for complete requirements
5. Begin implementation following the contracts

