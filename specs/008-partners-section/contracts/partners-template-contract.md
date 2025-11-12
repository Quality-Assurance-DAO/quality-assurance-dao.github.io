# Partners Section Template Contract

**Feature**: 008-partners-section  
**Date**: 2024-12-19  
**Type**: Liquid Template API

## Overview

This contract defines the Liquid template structure for rendering the Partners section in the Jekyll layout.

## Template Location

**File**: `_layouts/default.html`  
**Section ID**: `partners`  
**Section Class**: `section partners`

## Template Structure

### Section Container

```liquid
{% if site.data.partners %}
  <section id="partners" class="section partners">
    <div class="container">
      <h2>We work with</h2>
      <div class="data-grid">
        <!-- Partner cards rendered here -->
      </div>
    </div>
  </section>
{% endif %}
```

**Conditional Rendering**: Section only renders if `site.data.partners` exists and is not empty.

### Partner Card Template

```liquid
{% for partner in site.data.partners %}
  <article class="data-card"{% if partner.id %} id="partner-{{ partner.id }}"{% endif %}>
    {% if partner.url %}
      <a href="{{ partner.url }}" class="data-card-link" target="_blank" rel="noopener noreferrer" aria-label="{{ partner.name }} - {{ partner.description }}">
    {% endif %}
    
    {% if partner.logo %}
      <img src="{{ partner.logo | relative_url }}" alt="{% if partner.name %}{{ partner.name }} logo{% else %}Logo{% endif %}" class="data-card-logo">
    {% endif %}
    
    <h3>{{ partner.name }}</h3>
    <p>{{ partner.description }}</p>
    
    {% if partner.tags.size > 0 %}
      <div class="data-card-tags">
        {% for tag in partner.tags %}
          <span class="tag">{{ tag }}</span>
        {% endfor %}
      </div>
    {% endif %}
    
    {% if partner.featured %}
      <span class="featured-badge" aria-label="Featured">Featured</span>
    {% endif %}
    
    {% if partner.status %}
      <span class="status-indicator status-{{ partner.status | downcase }}">{{ partner.status }}</span>
    {% endif %}
    
    {% if partner.year %}
      <span class="data-card-meta">Year: {{ partner.year }}</span>
    {% endif %}
    
    {% if partner.url %}
      </a>
    {% endif %}
  </article>
{% endfor %}
```

## Template API

### Data Access

- **Data Source**: `site.data.partners` (Jekyll data file)
- **Data Type**: Array of Partner objects
- **Iteration**: `{% for partner in site.data.partners %}`

### Partner Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `partner.id` | string | Yes | URL-safe slug identifier |
| `partner.name` | string | Yes | Display name |
| `partner.description` | string | Yes | Text description |
| `partner.url` | string | No | Website URL (makes card clickable) |
| `partner.logo` | string | No | Logo image path (relative to site root) |
| `partner.tags` | array | No | Array of tag strings |
| `partner.featured` | boolean | No | Featured flag |
| `partner.status` | string | No | Status indicator |
| `partner.year` | number | No | Numeric year |

### Conditional Rendering Rules

1. **Section Level**: `{% if site.data.partners %}` - Hide entire section if no data
2. **Card Link**: `{% if partner.url %}` - Wrap card in `<a>` tag only if URL exists
3. **Logo**: `{% if partner.logo %}` - Display logo only if path provided
4. **Tags**: `{% if partner.tags.size > 0 %}` - Display tags container only if tags exist
5. **Featured**: `{% if partner.featured %}` - Display badge only if true
6. **Status**: `{% if partner.status %}` - Display status only if present
7. **Year**: `{% if partner.year %}` - Display year only if present

### CSS Classes

| Class | Purpose | Location |
|-------|---------|----------|
| `section` | Base section styling | Container |
| `partners` | Section-specific class | Container |
| `container` | Content container | Inner div |
| `data-grid` | Responsive grid layout | Cards container |
| `data-card` | Card styling | Article element |
| `data-card-link` | Clickable card link | Anchor wrapper |
| `data-card-logo` | Logo image styling | Image element |
| `data-card-tags` | Tags container | Div wrapper |
| `tag` | Individual tag badge | Span element |
| `featured-badge` | Featured indicator | Span element |
| `status-indicator` | Status badge | Span element |
| `status-{value}` | Status-specific styling | Status span (e.g., `status-active`) |
| `data-card-meta` | Metadata styling | Year span |

### Filters Used

- `relative_url` - Converts logo path to relative URL (Jekyll filter)
- `downcase` - Converts status to lowercase for CSS class

### Security Attributes

All external partner links MUST include:
- `target="_blank"` - Opens in new tab
- `rel="noopener noreferrer"` - Security attributes

### Accessibility

- **ARIA Labels**: `aria-label` on card links for screen readers
- **Alt Text**: Logo images include alt text with partner name
- **Focus States**: Card links support keyboard navigation with visible focus indicators
- **Semantic HTML**: Uses `<article>`, `<h3>`, `<p>` for proper structure

## Template Placement

**Location in Layout**: After Projects section (`#portfolio`), before About section (`#about`)

**Example Context**:
```liquid
<!-- PORTFOLIO / PROJECTS -->
<section id="portfolio" class="section portfolio">
  <!-- projects content -->
</section>

<!-- PARTNERS SECTION -->
{% if site.data.partners %}
  <section id="partners" class="section partners">
    <!-- partners content -->
  </section>
{% endif %}

<!-- ABOUT SECTION -->
<section id="about" class="section about">
  <!-- about content -->
</section>
```

## Error Handling

### Empty Data File

If `partners.yml` is empty or missing:
- `site.data.partners` evaluates to false/empty
- Section is not rendered (conditional check prevents rendering)
- No errors or broken sections appear

### Missing Required Fields

If partner entry missing `id`, `name`, or `description`:
- Card may render with missing content
- Validation should catch this before deployment
- Template handles gracefully (empty values don't break layout)

### Missing Logo Image

If logo path is invalid or file missing:
- Browser displays broken image icon or alt text
- Layout remains intact (logo is optional)
- Alt text provides fallback information

### Invalid URL

If partner URL is malformed:
- Link may not work correctly
- Validation should catch this before deployment
- Template renders link as-is (browser handles invalid URLs)

## Testing Checklist

- [ ] Section renders when `partners.yml` has data
- [ ] Section hidden when `partners.yml` is empty
- [ ] Section hidden when `partners.yml` is missing
- [ ] Partner cards display with logo, name, description
- [ ] Cards with URLs are clickable (entire card)
- [ ] External links open in new tab with security attributes
- [ ] Optional fields (tags, featured, status, year) render when present
- [ ] Optional fields don't break layout when missing
- [ ] Responsive grid adapts to screen sizes
- [ ] Hover effects work on cards
- [ ] Keyboard navigation works (focus states visible)
- [ ] Screen reader announces cards correctly (ARIA labels)

