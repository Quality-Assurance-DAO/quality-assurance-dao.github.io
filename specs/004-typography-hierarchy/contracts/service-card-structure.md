# Service Card HTML Structure Contract

**Date**: 2024-12-19  
**Feature**: 004-typography-hierarchy

## Overview

This document defines the HTML structure contract for service cards in the services section. All service cards must follow this structure to ensure consistent layout and functionality.

## HTML Structure

### Required Structure

```html
<article class="data-card"{% if service.id %} id="service-{{ service.id }}"{% endif %}>
  {% if service.logo or service.icon %}
    <div class="service-visual">
      {% if service.logo %}
        <img src="{{ service.logo | relative_url }}" alt="{% if service.name %}{{ service.name }} logo{% else %}Logo{% endif %}" class="data-card-logo">
      {% elsif service.icon %}
        <span class="service-icon">{{ service.icon }}</span>
      {% endif %}
    </div>
  {% endif %}
  
  <h3>{{ service.name }}</h3>
  <p>{{ service.description }}</p>
  
  {% if service.url %}
    <a href="{{ service.url }}" class="service-learn-more">Learn more</a>
  {% endif %}
  
  {% if service.tags.size > 0 %}
    <div class="data-card-tags">
      {% for tag in service.tags %}
        <span class="tag">{{ tag }}</span>
      {% endfor %}
    </div>
  {% endif %}
</article>
```

---

## Element Requirements

### 1. Container Element
**Element**: `<article class="data-card">`  
**Required**: Yes  
**Purpose**: Semantic container for service card content

**Attributes**:
- `class="data-card"`: Required for styling
- `id="service-{{ service.id }}"`: Optional, added if service.id exists

---

### 2. Visual Element (Icon/Image)
**Element**: `<div class="service-visual">` containing `<img>` or `<span class="service-icon">`  
**Required**: No (conditional)  
**Purpose**: Display icon or image representing the service

**Conditions**:
- Display if `service.logo` exists (image)
- Display if `service.icon` exists and `service.logo` does not (icon/emoji)
- Omit if neither exists

**Image Element**:
- `src="{{ service.logo | relative_url }}"`: Image path
- `alt`: Descriptive alt text
- `class="data-card-logo"`: Required for styling

**Icon Element**:
- `class="service-icon"`: Required for styling
- Content: `{{ service.icon }}` (emoji or icon identifier)

---

### 3. Heading Element
**Element**: `<h3>{{ service.name }}</h3>`  
**Required**: Yes  
**Purpose**: Service title, uses h3 for typography hierarchy

**Content**: `service.name` (required field)

---

### 4. Description Element
**Element**: `<p>{{ service.description }}</p>`  
**Required**: Yes  
**Purpose**: Short description of the service

**Content**: `service.description` (required field)

---

### 5. Learn More Link
**Element**: `<a href="{{ service.url }}" class="service-learn-more">Learn more</a>`  
**Required**: No (conditional)  
**Purpose**: Explicit call-to-action link to service details

**Conditions**:
- Display only if `service.url` exists
- Link text: "Learn more" (exact text required)
- `class="service-learn-more"`: Required for styling

**Attributes**:
- `href="{{ service.url }}"`: Service URL
- `class="service-learn-more"`: Required for styling

---

### 6. Tags Element (Optional)
**Element**: `<div class="data-card-tags">`  
**Required**: No  
**Purpose**: Display service tags if available

**Conditions**: Display if `service.tags.size > 0`

---

## Layout Order

**Required Order** (top to bottom):
1. Visual element (icon/image) - if available
2. Heading (h3) - required
3. Description (p) - required
4. Learn more link - if URL available
5. Tags - if available

**Rationale**: Visual hierarchy flows from visual element → title → description → action → metadata

---

## Accessibility Requirements

### Semantic HTML
- Use `<article>` for card container (semantic meaning)
- Use `<h3>` for service name (heading hierarchy)
- Use `<p>` for description (paragraph content)
- Use `<a>` for links (navigation)

### ARIA Labels
- Image alt text: Descriptive, includes service name if available
- Link text: "Learn more" is descriptive in context
- Card container: No additional ARIA needed (semantic HTML sufficient)

### Keyboard Navigation
- All links must be keyboard accessible (Tab navigation)
- Focus indicators must be visible
- Link activation via Enter or Space key

---

## Graceful Degradation

### Missing Icon/Image
- Card layout maintains consistent structure
- Description and heading remain at top
- No layout shift or broken appearance

### Missing URL
- "Learn more" link does not appear
- Card remains fully functional
- No broken links or empty states

### Missing Tags
- Tags section does not appear
- Card layout remains consistent
- No empty tag containers

---

## Browser Compatibility

### Required Features
- HTML5 semantic elements (`<article>`, `<h3>`, `<p>`, `<a>`)
- CSS Grid/Flexbox (for card layout)
- Liquid templating (Jekyll)

### Minimum Versions
- All modern browsers (HTML5 support)
- Jekyll 3.0+ (Liquid templating)

---

## Testing Contract

### Visual Tests
- All service cards follow required structure
- Icon/image displays when available
- "Learn more" link appears when URL available
- Layout order is correct (visual → heading → description → link → tags)

### Functional Tests
- "Learn more" links navigate to correct URLs
- Cards display correctly with missing optional elements
- Layout remains consistent across all cards

### Accessibility Tests
- All links are keyboard accessible
- Focus indicators are visible
- Semantic HTML structure is correct
- Screen readers can navigate cards correctly

---

## Version History

- **v1.0** (2024-12-19): Initial service card HTML structure contract

