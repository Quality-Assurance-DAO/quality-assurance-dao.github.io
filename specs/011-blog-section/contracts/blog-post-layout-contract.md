# Blog Post Layout Template Contract

**Feature**: 011-blog-section  
**Date**: 2025-01-27  
**Contract Type**: Liquid Layout Template API

## Overview

This contract defines how individual blog post pages are rendered using the `_layouts/post.html` layout template. The layout extends the default site layout and displays post metadata and content.

## Template Structure

### File Location
- **Path**: `_layouts/post.html`
- **Extends**: `default` layout (`_layouts/default.html`)
- **Usage**: Applied automatically to posts in `site.posts` collection

### Front Matter

Posts using this layout don't need explicit front matter in the layout file. The layout receives post data from the post's own front matter.

## Layout Structure

### Basic Structure

```liquid
---
layout: default
---

<main id="main-content">
  <article class="blog-post">
    <header class="post-header">
      <h1 class="post-title">{{ page.title }}</h1>
      
      <div class="post-meta">
        <time datetime="{{ page.date | date: '%Y-%m-%d' }}" class="post-date">
          {{ page.date | date: '%B %d, %Y' }}
        </time>
        
        {% if page.tags.size > 0 %}
          <div class="post-tags">
            {% for tag in page.tags %}
              <a href="/blog/#tag={{ tag | url_encode }}" class="tag">{{ tag }}</a>
            {% endfor %}
          </div>
        {% endif %}
      </div>
    </header>
    
    <div class="post-content">
      {{ content }}
    </div>
    
    <footer class="post-footer">
      <nav class="post-navigation">
        <a href="/blog/" class="back-to-blog">← Back to Blog</a>
      </nav>
    </footer>
  </article>
</main>
```

## Data Access

### Post Fields
- `page.title` - Post title from front matter
- `page.date` - Post date from front matter
- `page.slug` - Post slug from front matter
- `page.tags` - Post tags array from front matter
- `page.summary` - Post summary from front matter (if needed)
- `content` - Post Markdown content rendered as HTML

### URL Generation
- Post URL: `page.url` (generated from permalink pattern)
- Blog index URL: `/blog/` or `/blog.html`
- Tag filter URL: `/blog/#tag={{ tag | url_encode }}`

## HTML Structure

### Article Container
```html
<article class="blog-post">
  <!-- Post content -->
</article>
```

### Post Header
```html
<header class="post-header">
  <h1 class="post-title">{{ page.title }}</h1>
  <div class="post-meta">
    <!-- Date and tags -->
  </div>
</header>
```

### Post Content
```html
<div class="post-content">
  {{ content }}
</div>
```
- `content` variable contains Markdown rendered as HTML
- Jekyll automatically processes Markdown during build

### Post Footer
```html
<footer class="post-footer">
  <nav class="post-navigation">
    <a href="/blog/" class="back-to-blog">← Back to Blog</a>
  </nav>
</footer>
```

## Tag Links

Tags should link back to blog index with tag filter:

```liquid
{% for tag in page.tags %}
  <a href="/blog/#tag={{ tag | url_encode }}" class="tag">{{ tag }}</a>
{% endfor %}
```

- URL encoding ensures special characters in tags work correctly
- Hash-based filtering allows JavaScript to apply filter on blog index

## Edge Cases

### Missing Post Fields
- Missing `title`: Use filename or default title
- Missing `date`: Display without date or use file modification date
- Missing `tags`: Omit tags section
- Missing `content`: Display metadata only, handle empty content gracefully

### Empty Content
```liquid
{% if content.size > 0 %}
  <div class="post-content">
    {{ content }}
  </div>
{% else %}
  <div class="post-content">
    <p class="empty-content">No content available.</p>
  </div>
{% endif %}
```

### Very Long Content
- Content displays in full (no truncation on post page)
- Proper scrolling and formatting handled by CSS
- Markdown rendering handles headings, lists, code blocks, etc.

## Styling Requirements

### CSS Classes
- `.blog-post` - Article container
- `.post-header` - Post header section
- `.post-title` - Post title (h1)
- `.post-meta` - Metadata container (date, tags)
- `.post-date` - Publication date
- `.post-tags` - Tags container
- `.tag` - Individual tag link
- `.post-content` - Post content container
- `.post-footer` - Post footer section
- `.post-navigation` - Navigation links
- `.back-to-blog` - Link back to blog index

### Theme Support
- Must support dark/light theme switching
- Use CSS variables for colors (consistent with site theme)
- Responsive design (mobile, tablet, desktop)
- Typography consistent with site design

### Markdown Rendering
- Headings (h1-h6) styled appropriately
- Paragraphs with proper spacing
- Lists (ul, ol) with proper indentation
- Links with proper styling
- Code blocks with syntax highlighting (if supported)
- Images with proper sizing and alignment
- Blockquotes with proper styling

## Integration Points

### Navigation
- Blog link appears in main navigation (from default layout)
- "Back to Blog" link in post footer

### Theme System
- Post pages use existing theme system
- Theme toggle button available (from default layout)

### Layout Inheritance
- Extends `default` layout
- Inherits header, footer, navigation
- Inherits theme system and CSS

## Testing Checklist

- [ ] Post title displays correctly
- [ ] Post date displays and formats correctly
- [ ] Post tags display and link to filtered blog index
- [ ] Post content renders Markdown correctly
- [ ] Headings, lists, links, code blocks render properly
- [ ] "Back to Blog" link navigates correctly
- [ ] Theme switching works on post pages
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Post URL matches permalink pattern (`/blog/:slug/`)
- [ ] Missing optional fields handled gracefully
- [ ] Empty content handled gracefully
- [ ] Very long content displays and scrolls properly

## Related Contracts

- **Blog Post Schema**: `blog-post-schema.json` - Validates post front matter
- **Jekyll Collection Config**: `jekyll-collection-config.md` - Defines collection setup
- **Blog Index Template**: `blog-index-template-contract.md` - Defines blog index page

