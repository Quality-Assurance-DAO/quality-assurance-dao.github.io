# Data Model: Blog Section

**Feature**: Blog Section  
**Date**: 2025-01-27  
**Phase**: 1 - Design & Contracts

## Overview

The blog section uses Jekyll Collections to process Markdown blog posts stored in the `/posts` directory. Each post contains YAML front matter with metadata (title, date, slug, tags, summary) and Markdown content body. Posts are automatically discovered during Jekyll build and transformed into static HTML pages. The blog index page displays all published posts sorted by date, with client-side pagination and tag filtering.

## Entities

### Blog Post

Represents a single blog post stored as a Markdown file with YAML front matter.

**Source**: Markdown files in `/posts/` directory (processed via Jekyll Collections)

**Fields**:
- `title` (string, required): Blog post title
- `date` (date, required): Publication date in YYYY-MM-DD format or ISO 8601
- `slug` (string, required): URL-friendly identifier (should include date prefix for uniqueness, e.g., `2025-01-27-post-slug`)
- `tags` (array of strings, optional): Tags for categorization and filtering
- `summary` (string, optional): Post summary/excerpt for blog index display
- `content` (string, auto-generated): Markdown content body (rendered as HTML)

**Relationships**:
- Belongs to collection: `site.posts` (Jekyll Collection)
- Can have multiple tags (many-to-many relationship with Tag entity)
- Referenced by Blog Index page

**Validation Rules**:
- `title`, `date`, and `slug` must be present in front matter
- `date` must be valid date format (YYYY-MM-DD or ISO 8601)
- `slug` should be URL-friendly (lowercase, hyphens for spaces, no special characters)
- `slug` should include date prefix for uniqueness (e.g., `2025-01-27-post-slug`)
- Posts with missing required fields are skipped (excluded from blog index, build continues with warning)
- Posts with future dates are excluded from display (hidden until publication date)
- `tags` must be array of strings if provided
- `summary` is optional - if not provided, first paragraph of content may be used as excerpt

**State Transitions**:
- **Draft**: Post file exists but has future date → excluded from display
- **Published**: Post file exists with valid front matter and past/current date → displayed on blog index
- **Removed**: Post file deleted → no longer appears on blog index after rebuild

**URL Generation**:
- Permalink pattern: `/blog/:slug/`
- Example: Post with `slug: 2025-01-27-my-first-post` → URL: `/blog/2025-01-27-my-first-post/`

**Example Front Matter**:
```yaml
---
title: "My First Blog Post"
date: 2025-01-27
slug: 2025-01-27-my-first-post
tags:
  - ai
  - blockchain
  - quality-assurance
summary: "This is a summary of my first blog post about AI and blockchain."
---

# My First Blog Post

This is the content of the blog post in Markdown format...
```

---

### Blog Index

Represents the blog index page that lists all published blog posts.

**Source**: `blog.html` page template

**Fields**:
- `posts` (array of Blog Post entities, auto-generated): All published posts from `site.posts` collection
- `current_page` (number, client-side state): Current pagination page (1-indexed)
- `posts_per_page` (number, constant): Number of posts per page (default: 10)
- `total_pages` (number, computed): Total number of pagination pages
- `active_tag` (string, optional, client-side state): Currently active tag filter (from URL hash)

**Relationships**:
- Contains multiple Blog Post entities
- References Tag entities for filtering

**Validation Rules**:
- Posts are sorted by date (newest first)
- Future-dated posts are excluded from display
- Posts with missing required front matter are excluded
- Empty state displayed when no posts exist

**State Transitions** (client-side):
- **Initial Load**: Display first page of all posts
- **Pagination**: User navigates to different page → update displayed posts
- **Tag Filter**: User clicks tag → filter posts by tag, reset to page 1
- **Clear Filter**: User clears tag filter → show all posts, reset to page 1

**Pagination Logic**:
- Divide posts into pages of `posts_per_page` (10)
- Display current page posts only
- Show pagination controls (Previous/Next, page numbers)
- Hide pagination if only one page exists

---

### Tag

Represents a categorization label associated with blog posts.

**Source**: Extracted from `tags` field in blog post front matter

**Fields**:
- `name` (string, required): Tag name/label
- `post_count` (number, computed): Number of posts with this tag

**Relationships**:
- Many-to-many with Blog Post entities (posts can have multiple tags, tags can be on multiple posts)

**Validation Rules**:
- Tag names should be lowercase, URL-friendly strings
- Tags are case-sensitive (normalize to lowercase for consistency)
- Empty tags array is valid (post has no tags)

**Tag Filtering**:
- Clicking a tag filters blog index to show only posts with that tag
- Active tag stored in URL hash (e.g., `#tag=ai`)
- Multiple tags per post supported
- Tag filtering works with pagination (filter first, then paginate)

**Example Tags**:
- `ai`
- `blockchain`
- `quality-assurance`
- `cardano`
- `singularitynet`

---

### Post Metadata

Represents the front matter metadata for a blog post (subset of Blog Post entity).

**Fields** (same as Blog Post front matter):
- `title` (string, required)
- `date` (date, required)
- `slug` (string, required)
- `tags` (array of strings, optional)
- `summary` (string, optional)

**Usage**:
- Displayed on blog index page (title, date, summary, tags)
- Displayed on individual post page (title, date, tags)
- Used for URL generation (slug)
- Used for sorting (date)
- Used for filtering (tags)

**Date Formatting**:
- Stored as: YYYY-MM-DD or ISO 8601
- Displayed as: Formatted date (e.g., "January 27, 2025")
- Used for sorting: Chronological order (newest first)

---

## Data Access Patterns

### Jekyll/Liquid Access

- Blog Posts Collection: `site.posts` (array of post objects)
- Individual Post Fields: `post.title`, `post.date`, `post.slug`, `post.tags`, `post.summary`, `post.content`
- Post URL: `post.url` (generated from permalink pattern)
- Sorted Posts: `site.posts | sort: 'date' | reverse` (newest first)
- Filtered Posts: `site.posts | where: 'tags', 'ai'` (Liquid filter, but client-side filtering preferred)

### Collection Configuration

Defined in `_config.yml`:
```yaml
collections:
  posts:
    output: true
    permalink: /blog/:slug/
```

### Iteration Pattern

```liquid
{% for post in site.posts %}
  {% assign post_date = post.date | date: '%Y-%m-%d' %}
  {% assign today = 'now' | date: '%Y-%m-%d' %}
  {% if post_date <= today %}
    <!-- Render post listing -->
  {% endif %}
{% endfor %}
```

---

## Edge Cases & Handling

1. **Missing Required Fields**: Post skipped, warning logged, build continues, post excluded from blog index
2. **Invalid Date Format**: Post skipped or uses default date, warning logged
3. **Duplicate Slugs**: Use date-prefixed slugs (e.g., `2025-01-27-post-slug`) for uniqueness
4. **Future-Dated Posts**: Excluded from display (hidden from blog index and post pages until date arrives)
5. **Empty Posts Directory**: Blog index displays empty state message, site builds successfully
6. **Empty Markdown Body**: Post displays metadata but handles empty content gracefully
7. **Very Long Content**: Post page displays full content with proper formatting and scrolling
8. **Special Characters in Markdown**: Content properly escaped/rendered according to Markdown and HTML standards
9. **No Posts**: Blog index displays appropriate empty state message
10. **Pagination with One Page**: Pagination controls hidden or not displayed
11. **Tag Filter with No Results**: Display empty state or "No posts found" message
12. **Direct URL Access to Non-Existent Post**: Display 404 error page consistent with site design
13. **Very Long Tags or Many Tags**: Tags displayed appropriately without breaking layout
14. **Very Long Summary**: Summary truncated or displayed with appropriate length limits
15. **Missing Optional Fields**: Display available information, omit missing fields gracefully

---

## Data Validation

### Build-Time Validation

- Jekyll build process validates YAML front matter syntax
- Invalid front matter causes build errors (handled by skipping post with warning)
- Missing required fields detected during collection processing

### Runtime Validation (Client-Side)

- Tag filtering validates tag exists before filtering
- Pagination validates page number is within valid range
- URL hash parsing validates format before applying filter

### Manual Validation

- Post authors should validate front matter before committing
- Slug uniqueness should be checked manually (or via script)
- Date format should be validated (YYYY-MM-DD)

---

## State Management

### Build-Time State

- Posts collection built from `/posts` directory
- Posts sorted by date (newest first)
- Future-dated posts excluded
- Invalid posts skipped

### Client-Side State (JavaScript)

- Current pagination page (stored in component state)
- Active tag filter (stored in URL hash: `#tag=ai`)
- Posts displayed on current page (computed from filtered/sorted posts)

### URL State

- Post URLs: `/blog/:slug/`
- Blog index: `/blog/` or `/blog.html`
- Tag-filtered index: `/blog/#tag=ai`
- Paginated index: `/blog/#page=2` (optional, or use component state)

---

## Data Flow

1. **Author creates post**: Writes Markdown file with front matter in `/posts/` directory
2. **Jekyll build**: Processes `/posts` directory via Collections, validates front matter
3. **Post processing**: Excludes future-dated posts, skips invalid posts, generates HTML
4. **Blog index generation**: Renders `blog.html` with all published posts
5. **Post page generation**: Renders individual post pages using `_layouts/post.html`
6. **Client-side rendering**: Blog index loads all posts, paginates and filters client-side

---

## Integration Points

- **Navigation**: Blog link added to `_layouts/default.html` navigation menu
- **Theme System**: Blog pages use existing theme system (dark/light mode)
- **Layout**: Blog pages use site layout (`_layouts/default.html`) with blog-specific content
- **Styling**: Blog pages use existing CSS with blog-specific styles added
- **Build Process**: Blog posts processed automatically during Jekyll build (no manual steps)

