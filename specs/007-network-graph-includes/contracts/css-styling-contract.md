# CSS Styling Contract

**Component**: Service card includes (`governance_graph.html`, `community_graph.html`, `ai_graph.html`)  
**Type**: CSS Styling Interface  
**Version**: 1.0

## Overview

This contract defines the CSS styling interface for the interactive network graph service cards. All styles must be inline within the Jekyll include files to maintain self-containment and avoid external dependencies.

## CSS Classes

### `.service-card`

Wrapper element for the entire service card component.

**Purpose**: Provides visual structure and consistent styling for service cards.

**Required Styles**:
```css
.service-card {
  background-color: #ffffff; /* or site background color */
  border-radius: 8px; /* 8-12px range */
  padding: 1.5rem; /* 1.5-2rem range */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* subtle shadow */
  margin-bottom: 2rem; /* spacing between cards */
  width: 100%; /* full width of container */
}
```

**Responsive Adjustments**:
- Mobile (< 768px): `padding: 1rem;`, `margin-bottom: 1.5rem;`
- Tablet (768px - 1024px): `padding: 1.5rem;`
- Desktop (> 1024px): `padding: 2rem;`

### `.network-canvas`

HTML5 Canvas element for network graph animation.

**Purpose**: Styles the canvas element with dark background and rounded corners.

**Required Styles**:
```css
.network-canvas {
  width: 100%; /* responsive width */
  height: 180px; /* fixed height */
  background-color: #1a1a1a; /* dark background */
  border-radius: 4px; /* 4-6px range */
  display: block; /* block element */
  cursor: crosshair; /* indicates interactivity */
}
```

**Canvas Element Attributes**:
- `width`: Set via JavaScript (matches container width)
- `height`: Fixed at 180px (set via JavaScript and CSS)

**Responsive Behavior**:
- Width adapts to container (100%)
- Height remains fixed (180px) across all screen sizes
- Border radius may be reduced on very small screens: `border-radius: 2px;` (mobile)

### `.service-title`

Service title heading element.

**Purpose**: Displays service title prominently below canvas.

**Required Styles**:
```css
.service-title {
  font-size: 1.5rem; /* 1.5-2rem range */
  font-weight: 600; /* 600-700 range */
  margin-top: 1rem; /* spacing from canvas */
  margin-bottom: 0.5rem; /* spacing to description */
  color: #1a1a1a; /* or site text color */
  line-height: 1.3; /* tight line height */
}
```

**Responsive Adjustments**:
- Mobile (< 768px): `font-size: 1.25rem;`, `margin-top: 0.75rem;`
- Desktop (> 1024px): `font-size: 2rem;`

### `.service-description`

Service description paragraph element.

**Purpose**: Displays service description text below title.

**Required Styles**:
```css
.service-description {
  font-size: 1rem; /* base font size */
  line-height: 1.6; /* readable line height */
  margin-top: 0.5rem; /* spacing from title */
  margin-bottom: 0; /* no bottom margin */
  color: #4a4a4a; /* muted text color */
}
```

**Responsive Adjustments**:
- Mobile (< 768px): `font-size: 0.9rem;`, `line-height: 1.5;`
- Desktop (> 1024px): `font-size: 1.1rem;`

## Inline Styles

All CSS must be included inline within each Jekyll include file using `<style>` tag:

```html
<style>
/* Service card styles */
.service-card { /* ... */ }
.network-canvas { /* ... */ }
.service-title { /* ... */ }
.service-description { /* ... */ }

/* Responsive styles */
@media (max-width: 768px) {
  /* Mobile adjustments */
}

@media (min-width: 1024px) {
  /* Desktop adjustments */
}
</style>
```

## Responsive Design

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Adjustments

```css
@media (max-width: 768px) {
  .service-card {
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 6px;
  }
  
  .network-canvas {
    border-radius: 2px;
  }
  
  .service-title {
    font-size: 1.25rem;
    margin-top: 0.75rem;
  }
  
  .service-description {
    font-size: 0.9rem;
    line-height: 1.5;
  }
}
```

### Desktop Enhancements

```css
@media (min-width: 1024px) {
  .service-card {
    padding: 2rem;
  }
  
  .service-title {
    font-size: 2rem;
  }
  
  .service-description {
    font-size: 1.1rem;
  }
}
```

## Visual Styling Guidelines

### Color Scheme

- **Card Background**: White or site background color (#ffffff or site default)
- **Canvas Background**: Dark color (#1a1a1a or similar dark gray)
- **Title Color**: Dark text color (#1a1a1a or site text color)
- **Description Color**: Muted text color (#4a4a4a or site muted color)
- **Node Colors**: Service-specific (governance: #6ee7b7, community: #60a5fa, AI: #a78bfa)

### Typography

- **Title Font**: Site heading font or system font stack (e.g., `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`)
- **Description Font**: Site body font or system font stack
- **Title Weight**: 600-700 (semi-bold to bold)
- **Description Weight**: 400 (normal)

### Spacing

- **Card Padding**: 1.5-2rem (responsive)
- **Card Margin**: 2rem bottom margin (spacing between cards)
- **Title Margin**: 1rem top, 0.5rem bottom
- **Description Margin**: 0.5rem top, 0 bottom

### Shadows and Borders

- **Card Shadow**: Subtle shadow (`0 2px 8px rgba(0, 0, 0, 0.1)`)
- **Border Radius**: 8-12px for card, 4-6px for canvas
- **No Borders**: Cards use shadow for depth, no border needed

## Progressive Enhancement Styles

### Canvas Unsupported

If Canvas is not supported, canvas element may not render. Styles should ensure card structure remains:

```css
.network-canvas {
  /* Styles apply even if canvas doesn't render */
  min-height: 180px; /* maintain space */
}
```

### JavaScript Disabled

If JavaScript is disabled, canvas exists but no animation. Styles remain the same:

```css
.network-canvas {
  /* Styles apply, animation just doesn't start */
  cursor: default; /* or keep crosshair */
}
```

## Accessibility

### Color Contrast

- **Title Text**: Must meet WCAG AA contrast ratio (4.5:1) against card background
- **Description Text**: Must meet WCAG AA contrast ratio (4.5:1) against card background
- **Canvas Background**: Dark enough to provide contrast for nodes (nodes are bright colors)

### Focus States

If cards become interactive (links, buttons), add focus styles:

```css
.service-card:focus {
  outline: 2px solid #0066cc; /* or site focus color */
  outline-offset: 2px;
}
```

### Screen Reader Support

- Canvas is decorative (no semantic meaning)
- Title and description provide accessible content
- Canvas should have `aria-hidden="true"` or be marked as decorative

## Implementation Requirements

### Inline CSS Only

- All CSS must be inline within include files
- No external stylesheets
- No `<link>` tags
- Use `<style>` tag within each include

### Scoped Styles

- Use specific class names (`.service-card`, `.network-canvas`, etc.)
- Avoid generic class names that might conflict
- Consider prefixing if needed (e.g., `.qadao-service-card`)

### No !important

- Avoid `!important` declarations
- Use specificity instead
- Ensure styles don't conflict with site styles

## Validation Rules

- All required classes must be styled
- Responsive breakpoints must be implemented
- Colors must meet accessibility contrast requirements
- Spacing must be consistent across all three cards
- Canvas must have fixed height (180px)
- Canvas must have responsive width (100%)
- Cursor must be `crosshair` for canvas (indicates interactivity)

## Related Contracts

- **Service Card Include**: See `service-card-include-contract.md` for HTML structure
- **Network Graph Function API**: See `network-graph-function-api.md` for JavaScript API

