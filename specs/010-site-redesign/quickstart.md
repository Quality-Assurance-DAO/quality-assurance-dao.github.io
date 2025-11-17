# Quickstart: Site Redesign with Modern UI

**Feature**: Site Redesign with Modern UI  
**Date**: 2025-01-27  
**Phase**: 1 - Design & Contracts

## Overview

This guide provides a quick introduction to the site redesign feature, helping developers understand the structure, key files, and how to get started with implementation.

## What This Feature Does

Redesigns the QADAO website homepage with a modern UI that:
- Matches a Tailwind CSS-based design guide using vanilla CSS
- Incorporates the QADAO logo prominently
- Implements dark/light theme switching with persistence
- Loads all content dynamically from YAML data files
- Features responsive design for mobile, tablet, and desktop
- Maintains Jekyll/GitHub Pages compatibility

## Key Files & Directories

### Data Files (Content Source)
- `_data/services.yml` - Service offerings
- `_data/partners.yml` - Partner organizations
- `_data/projects.yml` - Project portfolio
- `_data/slides.yml` - Video carousel slides
- `_config.yml` - Site configuration (title, logo, social links)

### Layout & Templates
- `_layouts/default.html` - Main layout template (to be updated)
- `_includes/animated-header.html` - Hero section header
- `_includes/video-carousel.html` - Video carousel component

### Styling
- `assets/css/main.css` - Main stylesheet (to be redesigned)
- Uses CSS custom properties (variables) for theming
- Inter font from Google Fonts
- Material Symbols icons from Google Fonts

### JavaScript
- `assets/js/theme-toggle.js` - Theme switching functionality (existing)

## Design System

### Color Palette
- **Primary**: `#4A00E0` (Purple)
- **Secondary**: `#00F2A9` (Teal)
- **Light Background**: `#f5f5f5`
- **Dark Background**: `#121212`

### Typography
- **Font**: Inter (from Google Fonts)
- **Weights**: 400 (normal), 500 (medium), 700 (bold)
- Responsive sizing using `clamp()`

### Spacing
- Uses CSS variables for consistent spacing scale
- Responsive padding/margins based on breakpoints

### Breakpoints
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## Theme System

### How It Works
1. Theme preference stored in `localStorage` (key: `"theme"`)
2. Applied via `data-theme` attribute on `<html>` element
3. CSS variables change based on `[data-theme="dark"]` or `[data-theme="light"]`
4. Default theme: dark

### Implementation
```css
:root {
  --bg: #f5f5f5; /* Light theme default */
  --text: #121212;
}

[data-theme="dark"] {
  --bg: #121212;
  --text: #f5f5f5;
}
```

## Content Structure

### Services
Each service in `_data/services.yml` has:
- `name`, `description`, `id` (required)
- Optional: `logo`, `icon`, `url`, `tags`, `color`, `featured`, `status`

### Partners
Each partner in `_data/partners.yml` has:
- `id`, `name`, `description`, `url`, `logo` (required)
- Optional: `tags`, `status`, `featured`, `year`

### Projects
Each project in `_data/projects.yml` has:
- `name`, `description`, `url`, `id` (required)
- Optional: `logo`, `tags`, `featured`, `status`, `year`

### Slides (Video Carousel)
Each slide in `_data/slides.yml` has:
- `video`, `headline` (required)
- Optional: `cta_link` or `section_link` (for navigation), `poster`, `duration`
- **Note**: `cta_label` exists in data but buttons are NOT displayed - videos are clickable

## Component Patterns

### Data Grid
```html
<div class="data-grid">
  {% for item in site.data.items %}
    <article class="data-card">
      <!-- Card content -->
    </article>
  {% endfor %}
</div>
```

### Data Card
```html
<article class="data-card">
  {% if item.logo %}
    <img src="{{ item.logo }}" alt="{{ item.name }}" class="data-card-logo">
  {% endif %}
  <h3>{{ item.name }}</h3>
  <p>{{ item.description }}</p>
  {% if item.url %}
    <a href="{{ item.url }}" class="data-card-link">Learn more</a>
  {% endif %}
</article>
```

## Getting Started

### 1. Understand the Current Structure
- Review existing `_layouts/default.html`
- Check current `assets/css/main.css`
- Examine data files in `_data/` directory

### 2. Review Design Contracts
- Read `contracts/css-variables-contract.md` for styling system
- Read `contracts/component-contracts.md` for component structure

### 3. Review Data Model
- Read `data-model.md` for entity definitions
- Understand required vs optional fields

### 4. Implementation Steps
1. Update CSS variables in `main.css` (see CSS Variables Contract)
2. Update layout template `default.html` (see Component Contracts)
3. Update include files (video-carousel, animated-header)
4. Test theme switching functionality
5. Test responsive design across breakpoints
6. Verify content loads from data files
7. Test accessibility (keyboard navigation, contrast)

## Testing Checklist

- [ ] Theme toggle switches between dark/light
- [ ] Theme preference persists across page loads
- [ ] All sections display content from data files
- [ ] QADAO logo displays in header
- [ ] Video carousel navigates to sections when clicked
- [ ] No CTA buttons visible on carousel slides
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] All interactive elements have 44x44px touch targets
- [ ] Color contrast meets WCAG AA standards
- [ ] Keyboard navigation works for all interactive elements
- [ ] Site builds successfully on GitHub Pages

## Common Tasks

### Adding a New Service
1. Edit `_data/services.yml`
2. Add new service entry with required fields
3. Site will automatically display it (no code changes needed)

### Updating Colors
1. Edit CSS variables in `assets/css/main.css`
2. Update `:root` and `[data-theme]` selectors
3. Ensure contrast ratios meet WCAG AA

### Modifying Component Structure
1. Check `contracts/component-contracts.md` for structure
2. Update relevant include file or layout template
3. Ensure accessibility requirements are met

## Key Constraints

- Must use vanilla CSS (no Tailwind framework)
- All content must come from data files
- Must work with Jekyll/GitHub Pages
- Must maintain accessibility (WCAG AA)
- Must support responsive design
- Theme switching must persist via localStorage

## Resources

- **Specification**: `spec.md`
- **Research**: `research.md`
- **Data Model**: `data-model.md`
- **CSS Variables Contract**: `contracts/css-variables-contract.md`
- **Component Contracts**: `contracts/component-contracts.md`
- **Implementation Plan**: `plan.md`

## Next Steps

After reviewing this quickstart:
1. Read the full specification (`spec.md`) for detailed requirements
2. Review research findings (`research.md`) for technical decisions
3. Study the data model (`data-model.md`) for content structure
4. Reference contracts when implementing components
5. Follow the implementation plan (`plan.md`) for phased approach

