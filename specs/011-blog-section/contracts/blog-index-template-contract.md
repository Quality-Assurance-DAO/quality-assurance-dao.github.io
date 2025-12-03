# Blog Index Page Template Contract

**Feature**: 011-blog-section  
**Date**: 2025-01-27  
**Contract Type**: Liquid Template API

## Overview

This contract defines how the blog index page (`blog.html`) is implemented using Liquid templating. The page displays all published blog posts sorted by date, with client-side pagination and tag filtering handled by JavaScript.

## Template Structure

### File Location
- **Path**: `/blog.html` (repository root)
- **Layout**: Uses `default` layout (`_layouts/default.html`)
- **Output**: `/blog/index.html` or `/blog.html` (depending on Jekyll configuration)

### Front Matter

```yaml
---
layout: default
title: Blog
permalink: /blog/
---
```

## Data Access

### Collection Access
- **Source**: `site.posts` (Jekyll Collection)
- **Filtering**: Exclude future-dated posts using Liquid filters
- **Sorting**: Sort by date (newest first) using `sort` filter

### Post Filtering Logic

```liquid
{% assign today = 'now' | date: '%Y-%m-%d' %}
{% assign published_posts = site.posts | where_exp: "post", "post.date <= today" | sort: 'date' | reverse %}
```

### Post Iteration

```liquid
{% for post in published_posts %}
  <!-- Render post listing -->
{% endfor %}
```

## HTML Structure

### Container Structure

```html
<main id="main-content">
  <section id="blog" class="section blog">
    <div class="container">
      <h1>Blog</h1>
      
      <!-- Tag filter controls (optional) -->
      <div class="blog-tags" id="blog-tags">
        <!-- Tags rendered here -->
      </div>
      
      <!-- Blog posts list -->
      <div class="blog-posts" id="blog-posts" data-posts-per-page="10">
        {% for post in published_posts %}
          <article class="blog-post-card" data-post-slug="{{ post.slug }}" data-post-date="{{ post.date | date: '%Y-%m-%d' }}" data-post-tags="{{ post.tags | join: ',' }}">
            <!-- Post content -->
          </article>
        {% endfor %}
      </div>
      
      <!-- Pagination controls -->
      <div class="blog-pagination" id="blog-pagination">
        <!-- Pagination rendered by JavaScript -->
      </div>
      
      <!-- Empty state -->
      <div class="blog-empty-state" id="blog-empty-state" style="display: none;">
        <p>No blog posts found.</p>
      </div>
    </div>
  </section>
</main>
```

## Post Listing Structure

Each post listing should include:

```html
<article class="blog-post-card" data-post-slug="{{ post.slug }}" data-post-date="{{ post.date | date: '%Y-%m-%d' }}" data-post-tags="{{ post.tags | join: ',' }}">
  <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
  <time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: '%B %d, %Y' }}</time>
  
  {% if post.summary %}
    <p class="post-summary">{{ post.summary }}</p>
  {% endif %}
  
  {% if post.tags.size > 0 %}
    <div class="post-tags">
      {% for tag in post.tags %}
        <span class="tag" data-tag="{{ tag }}">{{ tag }}</span>
      {% endfor %}
    </div>
  {% endif %}
  
  <a href="{{ post.url }}" class="read-more">Read more</a>
</article>
```

## Data Attributes

### Post Card Attributes
- `data-post-slug`: Post slug (for URL generation)
- `data-post-date`: Post date in YYYY-MM-DD format (for filtering/sorting)
- `data-post-tags`: Comma-separated list of tags (for filtering)

### Container Attributes
- `data-posts-per-page`: Number of posts per page (default: 10)
- `id="blog-posts"`: Container ID for JavaScript targeting

## Client-Side Behavior

### JavaScript Responsibilities
- Pagination: Divide posts into pages, show/hide posts based on current page
- Tag filtering: Filter posts by tag, update URL hash
- Empty state: Show/hide empty state message when no posts match filter

### Initialization
- Load all posts on page load
- Parse URL hash for active tag filter (`#tag=ai`)
- Apply pagination (show first page)
- Apply tag filter if present in URL hash

## Edge Cases

### Empty Posts Collection
```liquid
{% if published_posts.size == 0 %}
  <div class="blog-empty-state">
    <p>No blog posts available yet. Check back soon!</p>
  </div>
{% endif %}
```

### Missing Post Fields
- Missing `title`: Skip post or use default
- Missing `date`: Exclude from published posts
- Missing `slug`: Post won't have valid URL, skip
- Missing `tags`: Render post without tags section
- Missing `summary`: Use first paragraph of content or omit

### Future-Dated Posts
- Excluded from `published_posts` using date filter
- Not rendered on blog index
- Will appear automatically when date arrives (after rebuild)

## Styling Requirements

### CSS Classes
- `.blog` - Section container
- `.blog-posts` - Posts container
- `.blog-post-card` - Individual post card
- `.blog-pagination` - Pagination controls
- `.blog-empty-state` - Empty state message
- `.post-tags` - Tags container
- `.tag` - Individual tag

### Theme Support
- Must support dark/light theme switching
- Use CSS variables for colors (consistent with site theme)
- Responsive design (mobile, tablet, desktop)

## Testing Checklist

- [ ] All published posts display on blog index
- [ ] Future-dated posts excluded from display
- [ ] Posts sorted by date (newest first)
- [ ] Post titles link to individual post pages
- [ ] Post dates formatted correctly
- [ ] Post summaries display when available
- [ ] Post tags display when available
- [ ] Empty state displays when no posts exist
- [ ] Pagination works correctly (10 posts per page)
- [ ] Tag filtering works correctly
- [ ] URL hash updates when filtering by tag
- [ ] Theme switching works on blog index
- [ ] Responsive design works on mobile/tablet/desktop

## Related Contracts

- **Blog Post Schema**: `blog-post-schema.json` - Validates post front matter
- **Jekyll Collection Config**: `jekyll-collection-config.md` - Defines collection setup
- **JavaScript API**: `blog-js-api-contract.md` - Defines client-side behavior

