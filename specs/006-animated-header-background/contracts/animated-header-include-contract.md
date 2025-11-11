# Animated Header Include Contract

**Component**: `_includes/animated-header.html`  
**Type**: Jekyll Liquid Include Snippet  
**Version**: 1.0

## Overview

This contract defines the interface for using the reusable animated header background include component in Jekyll pages and layouts.

## Include Syntax

### Basic Usage (No Title)

```liquid
{% include animated-header.html %}
```

### With Title Parameter

```liquid
{% include animated-header.html title="Page Title" %}
```

### Parameters

#### `title` (optional)

- **Type**: String
- **Required**: No
- **Description**: Text to display as header title overlay on the animated background
- **Security**: Automatically escaped to prevent XSS vulnerabilities
- **Default**: If not provided, header displays animated background only (no title text)

**Example**:
```liquid
{% include animated-header.html title="Welcome to Our Site" %}
```

**Future Extensibility**: Additional parameters may be added in future versions:
- `height`: Custom header height (default: 150-200px)
- `node_count`: Number of animated nodes (default: 15-25)
- `connection_threshold`: Distance threshold for connections (default: 100-150px)
- `class`: Additional CSS classes for header container

## Output Structure

The include generates the following HTML structure:

```html
<header class="animated-header">
  <canvas 
    id="animated-header-canvas" 
    class="animated-header-canvas"
    width="{container-width}" 
    height="150">
    <!-- Canvas content (progressive enhancement fallback) -->
  </canvas>
  
  {% if include.title %}
  <div class="animated-header-title">
    {{ include.title | escape }}
  </div>
  {% endif %}
</header>

<style>
/* Inline CSS for header styling */
.animated-header { /* ... */ }
.animated-header-canvas { /* ... */ }
.animated-header-title { /* ... */ }
</style>

<script>
/* Inline JavaScript for canvas animation */
(function() {
  // Animation initialization and loop
})();
</script>
```

## Progressive Enhancement

The component implements progressive enhancement:

1. **Base HTML**: Header element with gradient background (CSS-only, works without JavaScript)
2. **Canvas Enhancement**: JavaScript creates/initializes canvas animation if Canvas API is supported
3. **Fallback**: If Canvas is unsupported or JavaScript is disabled, header displays static gradient background

**Fallback Behavior**:
- Canvas element may not render (browser handles gracefully)
- Gradient background still visible via CSS
- Title text still displays (if provided)
- No JavaScript errors thrown

## Dependencies

### Required Files

1. **Include File**: `_includes/animated-header.html` (the component itself)
   - Contains all inline CSS and JavaScript
   - No external dependencies required

### Browser Requirements

- **Modern Browsers**: Full animation support (Canvas API, requestAnimationFrame)
- **Older Browsers**: Graceful degradation (static gradient background)
- **JavaScript Disabled**: Static gradient background (progressive enhancement)

## Error Handling

### Missing Canvas Support

- Component detects Canvas API availability: `if (canvas.getContext)`
- Falls back to static gradient background if Canvas unavailable
- No errors thrown, graceful degradation

### JavaScript Errors

- Animation code wrapped in IIFE to prevent global scope pollution
- Try-catch blocks around critical operations (optional, recommended)
- Errors in animation don't break page rendering

### Invalid Parameters

- Empty or undefined title: Component works normally (no title displayed)
- Invalid title content: Automatically escaped, safe rendering

## Usage Examples

### Homepage Header

```liquid
{% include animated-header.html title="Quality Assurance DAO" %}
```

### Section Header

```liquid
<section>
  {% include animated-header.html title="Our Services" %}
  <div class="content">
    <!-- Page content -->
  </div>
</section>
```

### Header Without Title

```liquid
{% include animated-header.html %}
```

### Multiple Instances

```liquid
<!-- Each instance functions independently -->
{% include animated-header.html title="Section 1" %}
<div>Content 1</div>

{% include animated-header.html title="Section 2" %}
<div>Content 2</div>
```

## Integration Guidelines

### Layout Integration

The component can be included in:
- Page front matter (via layout)
- Layout files directly
- Markdown content (via Liquid syntax)
- Other includes (nested includes)

### Styling Integration

- Inline CSS is self-contained within include
- Uses specific class names (`.animated-header-*`) to avoid conflicts
- Can be overridden with site CSS if needed (not recommended)

### Performance Considerations

- Animation runs continuously (uses requestAnimationFrame)
- Automatically pauses when browser tab is in background
- Lightweight implementation (15-25 nodes, efficient rendering)
- No external resource requests

## Testing

### Manual Testing Checklist

- [ ] Header displays on page load
- [ ] Animation starts within 1 second
- [ ] Animation runs smoothly (minimum 30fps)
- [ ] Canvas resizes on window resize
- [ ] Title displays correctly when provided
- [ ] Header works without title parameter
- [ ] Graceful degradation when Canvas unsupported
- [ ] Graceful degradation when JavaScript disabled
- [ ] Multiple instances work independently
- [ ] No console errors

### Browser Testing

Test in:
- Chrome (desktop and mobile)
- Firefox (desktop and mobile)
- Safari (desktop and mobile)
- Edge
- Older browsers (for fallback verification)

## Version History

- **1.0** (2024-12-19): Initial contract definition

## Related Contracts

- **Canvas Animation API**: See `canvas-animation-api.md` for JavaScript implementation details
- **CSS Styling Contract**: See `css-styling-contract.md` for styling specifications

