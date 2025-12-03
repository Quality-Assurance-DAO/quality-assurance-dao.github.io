# Contracts: Blog Section

**Feature**: 011-blog-section  
**Date**: 2025-01-27

## Overview

This directory contains API contracts and schemas for the Blog Section feature. Contracts define the interfaces between Jekyll templates, JavaScript components, and data structures.

## Contracts

### 1. Blog Post Front Matter Schema (`blog-post-schema.json`)

JSON Schema definition for blog post front matter in Markdown files. Validates that blog posts follow the required schema.

**Key Points**:
- Required fields: `title`, `date`, `slug`
- Optional fields: `tags`, `summary`
- Date format: YYYY-MM-DD or ISO 8601
- Slug format: URL-friendly with date prefix (e.g., `2025-01-27-post-slug`)
- Tags: Array of strings

**Usage**: Validate blog post front matter against this schema before committing.

### 2. Jekyll Collection Configuration Contract (`jekyll-collection-config.md`)

Jekyll configuration API contract defining how the `posts` collection is configured in `_config.yml`.

**Key Points**:
- Collection name: `posts`
- Source directory: `/posts` (custom directory, not `_posts`)
- Output: `true` (generates pages for each post)
- Permalink pattern: `/blog/:slug/`
- Processing: Automatic during Jekyll build

**Usage**: Reference when configuring or modifying Jekyll collection settings.

### 3. Blog Index Page Template Contract (`blog-index-template-contract.md`)

Liquid template API contract defining how the blog index page (`blog.html`) is implemented.

**Key Points**:
- Data source: `site.posts` collection
- Post filtering: Exclude future-dated posts
- Post sorting: By date (newest first)
- HTML structure: Semantic HTML5 with post listings
- Client-side pagination: JavaScript handles pagination
- Client-side filtering: JavaScript handles tag filtering

**Usage**: Reference when implementing or modifying the `blog.html` template.

### 4. Blog Post Layout Template Contract (`blog-post-layout-contract.md`)

Liquid layout template API contract defining how individual blog post pages are rendered using `_layouts/post.html`.

**Key Points**:
- Layout extends: `default` layout
- Post metadata: Display title, date, tags
- Content rendering: Markdown rendered as HTML
- Navigation: Link back to blog index
- Theme support: Dark/light theme compatibility

**Usage**: Reference when implementing or modifying the `_layouts/post.html` layout.

### 5. JavaScript API Contract (`blog-js-api-contract.md`)

JavaScript API contract defining blog index pagination and tag filtering behavior.

**Key Points**:
- Pagination: Client-side pagination (10 posts per page)
- Tag filtering: Filter posts by tag, update URL hash
- State management: Current page, active tag filter
- Event handling: Tag clicks, pagination controls
- URL hash: Store active tag filter (`#tag=ai`)

**Usage**: Reference when implementing or modifying blog JavaScript functionality.

## Validation

### Data Validation

Use the JSON schema to validate blog post front matter:

```bash
# Example validation (requires json-schema validator)
validate-json blog-post-schema.json posts/2025-01-27-example-post.md
```

Or use Jekyll's built-in YAML validation:

```bash
bundle exec jekyll build
```

### Template Validation

Manual testing checklist provided in template contract files under "Testing Checklist".

### JavaScript Validation

JavaScript linting:

```bash
# Example JS validation
eslint assets/js/blog.js
```

## Related Documentation

- **Data Model**: `/specs/011-blog-section/data-model.md`
- **Research**: `/specs/011-blog-section/research.md`
- **Quickstart**: `/specs/011-blog-section/quickstart.md`

