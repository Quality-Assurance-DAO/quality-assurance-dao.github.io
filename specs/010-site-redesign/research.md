# Research: Site Redesign with Modern UI

**Feature**: Site Redesign with Modern UI  
**Date**: 2025-01-27  
**Phase**: 0 - Research & Clarification

## Research Tasks

### 1. Icon System Source

**Question**: What icon system should be used? The design guide mentions Material Symbols icons, but the exact implementation needs verification.

**Research**: 
- Material Symbols is Google's icon library, successor to Material Icons
- Can be loaded via Google Fonts (fonts.googleapis.com) or self-hosted
- For Jekyll/GitHub Pages, using Google Fonts CDN is most practical
- Material Symbols provides both filled and outlined variants
- Icons can be used as web fonts or SVG

**Decision**: Use Material Symbols from Google Fonts CDN for consistency with design guide and ease of implementation in Jekyll.

**Rationale**: 
- Matches design guide specification
- No build process required (works with static site)
- Wide browser support
- Easy to implement via CSS @import or link tag
- Consistent with Inter font loading approach

**Alternatives Considered**:
- Font Awesome: More widely used but doesn't match design guide
- SVG sprite: More control but requires build process
- Self-hosted Material Symbols: Better performance but adds complexity

**Implementation**: Load Material Symbols via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
```

---

### 2. CSS Variables Architecture for Theme Switching

**Question**: How should CSS variables be structured to support dark/light theme switching while recreating Tailwind design patterns?

**Research**:
- CSS custom properties (variables) are well-supported in modern browsers
- Theme switching typically uses `data-theme` attribute or class on root element
- Tailwind uses utility classes, but we can recreate with semantic CSS variables
- Need separate variable sets for light and dark themes
- Variables should be scoped to `:root` for global access

**Decision**: Use CSS custom properties with `[data-theme="dark"]` and `[data-theme="light"]` selectors on `:root` element. Define color palette, spacing, typography, and component variables.

**Rationale**:
- Works with existing theme-toggle.js that sets `data-theme` attribute
- Maintains separation of concerns (CSS handles styling, JS handles state)
- Easy to extend with additional themes
- Browser-native solution, no dependencies
- Matches existing implementation pattern

**Alternatives Considered**:
- CSS classes instead of data attributes: Less semantic, harder to query
- Separate stylesheets: More HTTP requests, harder to maintain
- CSS-in-JS: Not applicable to static Jekyll site

**Implementation Pattern**:
```css
:root {
  --primary: #4A00E0;
  --secondary: #00F2A9;
  /* Light theme defaults */
  --bg: #f5f5f5;
  --text: #121212;
}

[data-theme="dark"] {
  --bg: #121212;
  --text: #f5f5f5;
}
```

---

### 3. Tailwind Design Pattern Recreation

**Question**: How to recreate Tailwind utility patterns (spacing, flexbox, grid, typography) using vanilla CSS?

**Research**:
- Tailwind uses utility classes like `flex`, `grid`, `p-4`, `text-center`
- We can recreate these patterns using semantic CSS classes
- CSS Grid and Flexbox are well-supported
- Modern CSS features (clamp, min/max, container queries) can replace Tailwind utilities
- Need to maintain component-based approach for maintainability

**Decision**: Use semantic CSS classes with modern CSS features. Create reusable component classes (`.container`, `.section`, `.card`, `.grid`) rather than utility classes. Use CSS variables for spacing scale, typography scale, and color palette.

**Rationale**:
- Maintains semantic HTML (better for accessibility and SEO)
- Easier to maintain than utility-first approach
- Works well with Jekyll/Liquid templating
- Reduces CSS file size compared to utility classes
- Aligns with existing codebase structure

**Alternatives Considered**:
- Utility-first CSS: Too verbose, harder to maintain in Jekyll context
- CSS-in-JS: Not applicable to static site
- Preprocessor (Sass/SCSS): Adds build complexity, GitHub Pages supports but not required

**Implementation Pattern**:
```css
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}
```

---

### 4. Video Carousel Click Navigation

**Question**: How should video carousel slides handle click navigation to sections? The spec mentions using `section_link` or `cta_link` from slides.yml, but CTA buttons should not be displayed.

**Research**:
- HTML5 video elements can be wrapped in anchor tags or have click handlers
- Smooth scrolling to sections using `#section-id` anchors
- Need to prevent default video controls from interfering
- Should handle cases where `section_link` is missing

**Decision**: Wrap video elements in clickable containers (anchor tags or divs with click handlers) that navigate to `section_link` when present. Use smooth scroll behavior. Hide CTA buttons/labels from display.

**Rationale**:
- Simple implementation using native HTML/CSS/JS
- Works with existing slides.yml structure (uses `cta_link` field)
- Maintains accessibility (keyboard navigation, screen readers)
- No external dependencies required

**Alternatives Considered**:
- JavaScript-only click handlers: Less accessible, harder to maintain
- Separate navigation buttons: Doesn't match spec requirement (no CTA buttons)
- Video overlay with separate click area: Adds complexity

**Implementation Pattern**:
```html
<a href="{{ slide.cta_link }}" class="video-slide-link">
  <video src="{{ slide.video }}" poster="{{ slide.poster }}">
  </video>
  <h3>{{ slide.headline }}</h3>
</a>
```

---

### 5. Responsive Breakpoint Strategy

**Question**: What responsive breakpoint strategy should be used to match design guide while ensuring compatibility?

**Research**:
- Common breakpoints: mobile (< 768px), tablet (768px-1024px), desktop (> 1024px)
- Mobile-first approach is standard
- CSS media queries are well-supported
- Container queries (newer) provide more flexibility but have limited support
- Need to ensure touch targets are appropriate (44x44px minimum)

**Decision**: Use mobile-first responsive design with breakpoints at 768px (tablet) and 1024px (desktop). Use CSS media queries with `min-width`. Ensure all interactive elements meet 44x44px touch target minimum.

**Rationale**:
- Matches spec requirements
- Standard approach, well-tested
- Works across all modern browsers
- Aligns with existing responsive patterns in codebase

**Alternatives Considered**:
- Desktop-first: Less efficient, harder to maintain
- Container queries: Limited browser support, not necessary for this use case
- Fixed breakpoints only: Less flexible, doesn't account for various screen sizes

**Implementation Pattern**:
```css
/* Mobile first (default) */
.container { padding: 1rem; }

/* Tablet */
@media (min-width: 768px) {
  .container { padding: 2rem; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { padding: 3rem; max-width: 1200px; }
}
```

---

### 6. Inter Font Loading Strategy

**Question**: How should Inter font be loaded to match design guide while ensuring performance?

**Research**:
- Google Fonts provides Inter font family
- Can load via CSS @import or HTML link tag
- Should use `font-display: swap` for performance
- Need to specify weights (400, 500, 700 typical)
- Preconnect to fonts.googleapis.com improves performance

**Decision**: Load Inter font from Google Fonts using HTML link tag in layout head. Use `font-display: swap`. Include weights 400 (regular), 500 (medium), 700 (bold). Add preconnect for performance.

**Rationale**:
- Matches design guide specification exactly
- Standard approach for Jekyll sites
- Good performance with preconnect
- No build process required
- Works with GitHub Pages

**Alternatives Considered**:
- Self-hosted fonts: Better performance but requires build process and font file management
- CSS @import: Slower than link tag, blocks rendering
- System font stack: Doesn't match design guide

**Implementation Pattern**:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
```

---

## Summary of Decisions

1. **Icons**: Material Symbols from Google Fonts CDN
2. **Theme Switching**: CSS custom properties with `data-theme` attribute
3. **CSS Architecture**: Semantic classes with CSS variables, not utility-first
4. **Video Navigation**: Clickable video containers with smooth scroll to sections
5. **Responsive Design**: Mobile-first with 768px and 1024px breakpoints
6. **Typography**: Inter font from Google Fonts with preconnect optimization

All "NEEDS CLARIFICATION" items from Technical Context have been resolved.

