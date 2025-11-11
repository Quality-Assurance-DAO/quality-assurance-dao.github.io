# CSS Styling Contract

**Component**: `_includes/animated-header.html` (CSS section)  
**Type**: Inline CSS Styling  
**Version**: 1.0

## Overview

This contract defines the CSS styling interface for the animated header background component. All CSS is inline within the include file to maintain self-containment.

## CSS Classes

### `.animated-header`

Main container for the animated header component.

**Properties**:
- `position`: `relative` (for title positioning)
- `width`: `100%` (full viewport width)
- `height`: `150px` to `200px` (fixed height, consistent across pages)
- `overflow`: `hidden` (prevent canvas overflow)
- `background`: Gradient fallback (for progressive enhancement)

**Usage**:
```html
<header class="animated-header">
  <!-- Canvas and title content -->
</header>
```

### `.animated-header-canvas`

Canvas element styling.

**Properties**:
- `display`: `block` (remove inline spacing)
- `width`: `100%` (responsive width)
- `height`: `150px` to `200px` (fixed height, matches container)
- `position`: `absolute` (for overlay positioning)
- `top`: `0`
- `left`: `0`
- `z-index`: `1` (behind title text)

**Usage**:
```html
<canvas class="animated-header-canvas" id="animated-header-canvas"></canvas>
```

### `.animated-header-title`

Title text overlay styling.

**Properties**:
- `position`: `absolute` (overlay positioning)
- `top`: `50%` (vertical centering)
- `left`: `50%` (horizontal centering)
- `transform`: `translate(-50%, -50%)` (perfect centering)
- `z-index`: `2` (above canvas)
- `color`: Text color (matches site theme)
- `font-size`: Responsive (adjusts for mobile/desktop)
- `font-weight`: `600` to `700` (bold for readability)
- `text-align`: `center`
- `padding`: `0.5rem 1rem` (spacing around text)
- `background`: Semi-transparent background OR `text-shadow` (for readability)
- `border-radius`: `4px` (if using background)

**Usage**:
```html
<div class="animated-header-title">
  {{ include.title | escape }}
</div>
```

## Inline Styles

All CSS is inline within the include file using `<style>` tag:

```html
<style>
.animated-header {
  /* Styles */
}

.animated-header-canvas {
  /* Styles */
}

.animated-header-title {
  /* Styles */
}
</style>
```

## Responsive Design

### Mobile (< 768px)

- Header height: `150px` (minimum)
- Title font-size: `1.5rem` to `2rem`
- Title padding: `0.5rem 1rem`

### Tablet (768px - 1024px)

- Header height: `175px`
- Title font-size: `2rem` to `2.5rem`
- Title padding: `0.75rem 1.5rem`

### Desktop (> 1024px)

- Header height: `200px` (maximum)
- Title font-size: `2.5rem` to `3rem`
- Title padding: `1rem 2rem`

### Breakpoints

```css
@media (max-width: 768px) {
  .animated-header {
    height: 150px;
  }
  .animated-header-title {
    font-size: 1.5rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .animated-header {
    height: 175px;
  }
  .animated-header-title {
    font-size: 2rem;
  }
}

@media (min-width: 1025px) {
  .animated-header {
    height: 200px;
  }
  .animated-header-title {
    font-size: 2.5rem;
  }
}
```

## Progressive Enhancement Styles

### Base Styles (No JavaScript/Canvas)

```css
.animated-header {
  background: linear-gradient(to bottom, #color1, #color2);
  /* Gradient fallback when Canvas unavailable */
}
```

### Enhanced Styles (With JavaScript/Canvas)

```css
.animated-header-canvas {
  /* Canvas visible and animated */
}
```

## Color Scheme

### Background Gradient

- **Dark Theme**: `linear-gradient(to bottom, #1a1a2e, #16213e)` (dark blue gradient)
- **Light Theme**: `linear-gradient(to bottom, #f5f5f5, #e0e0e0)` (light gray gradient)
- **Custom**: Should match site's existing color scheme

### Node Colors

- **Dark Background**: `rgba(255, 255, 255, 0.6)` (white, 60% opacity)
- **Light Background**: `rgba(0, 0, 0, 0.4)` (black, 40% opacity)

### Connection Colors

- **Dark Background**: `rgba(255, 255, 255, 0.25)` (white, 25% opacity)
- **Light Background**: `rgba(0, 0, 0, 0.2)` (black, 20% opacity)

### Title Text

- **Dark Background**: `#ffffff` (white text)
- **Light Background**: `#000000` or `#333333` (dark text)
- **Readability**: Semi-transparent background or text-shadow for contrast

## Typography

### Title Font

- **Font Family**: Inherit from site (or specify: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)
- **Font Weight**: `600` to `700` (semi-bold to bold)
- **Line Height**: `1.2` (tight spacing)
- **Letter Spacing**: `0.02em` (slight spacing for readability)

### Title Sizing

- **Mobile**: `1.5rem` to `2rem` (24px to 32px)
- **Tablet**: `2rem` to `2.5rem` (32px to 40px)
- **Desktop**: `2.5rem` to `3rem` (40px to 48px)

## Accessibility

### Contrast Ratios

- Title text must meet WCAG AA contrast ratio (4.5:1 minimum)
- Use semi-transparent background or text-shadow to ensure readability
- Test contrast with background gradient

### Focus States

- Title text (if interactive): Visible focus indicator
- Canvas element: Not focusable (decorative only)

### Screen Readers

- Canvas element: `aria-hidden="true"` (decorative, no semantic meaning)
- Title text: Proper heading level or accessible text

## Performance

### CSS Optimization

- Inline CSS (no external file requests)
- Minimal CSS (only necessary styles)
- Efficient selectors (class-based, not nested deeply)
- No expensive properties (avoid `filter`, `backdrop-filter` if possible)

### Rendering Performance

- Use `transform` for positioning (GPU-accelerated)
- Avoid layout-triggering properties
- Use `will-change` sparingly (if needed for animation optimization)

## Integration Guidelines

### Avoiding Conflicts

- Use specific class names (`.animated-header-*`) to avoid conflicts
- Scope styles to component (no global styles)
- Don't override site CSS variables (unless intentional)

### Customization

- Styles can be overridden with site CSS if needed
- Use `!important` sparingly (only if necessary for override)
- Document any customization requirements

## Example Complete CSS

```css
<style>
.animated-header {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(to bottom, #1a1a2e, #16213e);
}

.animated-header-canvas {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.animated-header-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .animated-header {
    height: 150px;
  }
  .animated-header-title {
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
  }
}
</style>
```

## Version History

- **1.0** (2024-12-19): Initial CSS contract definition

## Related Contracts

- **Include Contract**: See `animated-header-include-contract.md` for HTML structure
- **Canvas Animation API**: See `canvas-animation-api.md` for JavaScript implementation

