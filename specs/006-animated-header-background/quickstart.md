# Quickstart: Animated Header Background

**Feature**: 006-animated-header-background  
**Date**: 2024-12-19

## Overview

This guide provides step-by-step instructions for implementing the animated header background component. Follow these steps to add the reusable animated header to your Jekyll site.

## Prerequisites

- Jekyll site with `_includes/` directory (create if needed)
- Basic understanding of HTML, CSS, and JavaScript
- Modern browser for testing (Chrome, Firefox, Safari, Edge)

## Implementation Steps

### Step 1: Create Include File

Create `_includes/animated-header.html`:

```liquid
<header class="animated-header">
  <canvas 
    id="animated-header-canvas-{{ include.id | default: 'default' }}" 
    class="animated-header-canvas"
    width="100" 
    height="150">
  </canvas>
  
  {% if include.title %}
  <div class="animated-header-title">
    {{ include.title | escape }}
  </div>
  {% endif %}
</header>

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

<script>
(function() {
  'use strict';
  
  const canvasId = 'animated-header-canvas-{{ include.id | default: "default" }}';
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return; // Canvas not supported, fallback to gradient
  
  // Configuration
  const NODE_COUNT = 20;
  const CONNECTION_THRESHOLD = 120;
  const NODE_RADIUS = 2.5;
  
  // Initialize canvas size
  function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }
  resizeCanvas();
  
  // Create nodes
  function createNodes(count) {
    const nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: NODE_RADIUS
      });
    }
    return nodes;
  }
  
  const nodes = createNodes(NODE_COUNT);
  
  // Update nodes (movement and collision)
  function updateNodes() {
    nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;
      
      // Bounce off edges
      if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      
      // Keep within bounds
      node.x = Math.max(0, Math.min(canvas.width, node.x));
      node.y = Math.max(0, Math.min(canvas.height, node.y));
    });
  }
  
  // Calculate connections
  function calculateConnections() {
    const connections = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < CONNECTION_THRESHOLD) {
          connections.push({ node1: nodes[i], node2: nodes[j], distance });
        }
      }
    }
    return connections;
  }
  
  // Draw gradient background
  function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  // Draw connections
  function drawConnections(connections) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;
    connections.forEach(conn => {
      ctx.beginPath();
      ctx.moveTo(conn.node1.x, conn.node1.y);
      ctx.lineTo(conn.node2.x, conn.node2.y);
      ctx.stroke();
    });
  }
  
  // Draw nodes
  function drawNodes() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    updateNodes();
    const connections = calculateConnections();
    drawConnections(connections);
    drawNodes();
    requestAnimationFrame(animate);
  }
  
  // Handle resize
  function handleResize() {
    resizeCanvas();
    // Optionally adjust node positions proportionally
  }
  window.addEventListener('resize', handleResize);
  
  // Start animation
  animate();
})();
</script>
```

**Key Features**:
- Self-contained (all CSS and JavaScript inline)
- Progressive enhancement (works without Canvas/JavaScript)
- Responsive canvas resizing
- Unique canvas ID per instance (supports multiple headers)

### Step 2: Use the Component

Include the animated header in any page or layout:

**In a Markdown page**:
```markdown
---
layout: default
title: My Page
---

{% include animated-header.html title="Welcome to Our Site" %}

# My Page

More content below...
```

**In a Liquid layout**:
```liquid
<section id="header-section">
  {% include animated-header.html title="Page Title" %}
</section>
```

**Without title**:
```liquid
{% include animated-header.html %}
```

**Multiple instances** (each with unique ID):
```liquid
{% include animated-header.html id="header1" title="Section 1" %}
<div>Content 1</div>

{% include animated-header.html id="header2" title="Section 2" %}
<div>Content 2</div>
```

## Customization

### Adjust Colors

Modify the gradient colors in the CSS:

```css
background: linear-gradient(to bottom, #your-color-1, #your-color-2);
```

And in the JavaScript gradient:

```javascript
gradient.addColorStop(0, '#your-color-1');
gradient.addColorStop(1, '#your-color-2');
```

### Adjust Node Count

Change `NODE_COUNT` in the JavaScript:

```javascript
const NODE_COUNT = 25; // Increase or decrease (15-25 recommended)
```

### Adjust Connection Threshold

Change `CONNECTION_THRESHOLD` in the JavaScript:

```javascript
const CONNECTION_THRESHOLD = 150; // Increase for more connections, decrease for fewer
```

### Adjust Header Height

Modify the height in CSS:

```css
.animated-header {
  height: 175px; /* Adjust as needed (150-200px range) */
}
```

## Testing

### Manual Testing Checklist

- [ ] Header displays on page load
- [ ] Animation starts within 1 second
- [ ] Animation runs smoothly (no stuttering)
- [ ] Nodes move continuously
- [ ] Connections appear between nearby nodes
- [ ] Canvas resizes when browser window resized
- [ ] Title displays correctly when provided
- [ ] Header works without title parameter
- [ ] Gradient background visible (fallback)
- [ ] Works on mobile devices (responsive)
- [ ] Works when JavaScript disabled (fallback)
- [ ] Works when Canvas unsupported (fallback)
- [ ] Multiple instances work independently
- [ ] No console errors

### Browser Testing

Test in:
- Chrome (desktop and mobile)
- Firefox (desktop and mobile)
- Safari (desktop and mobile)
- Edge
- Older browsers (for fallback verification)

### Performance Testing

- [ ] Animation maintains smooth frame rate (minimum 30fps)
- [ ] Page remains responsive during animation
- [ ] No noticeable performance degradation
- [ ] Animation pauses when browser tab in background

### Accessibility Testing

- [ ] Header displays when JavaScript disabled
- [ ] Header displays when Canvas unsupported
- [ ] Title text is readable (good contrast)
- [ ] No accessibility errors in console

## Troubleshooting

### Animation Not Starting

**Issue**: Canvas animation doesn't start.

**Solutions**:
1. Check browser console for JavaScript errors
2. Verify Canvas API is supported: `if (canvas.getContext('2d'))`
3. Ensure JavaScript is enabled in browser
4. Check that canvas element exists in DOM
5. Verify canvas ID is unique (if multiple instances)

### Canvas Not Resizing

**Issue**: Canvas doesn't resize when window resized.

**Solutions**:
1. Check that resize event listener is attached
2. Verify `resizeCanvas()` function updates `canvas.width` and `canvas.height`
3. Ensure container element has proper width
4. Check for CSS conflicts preventing resize

### Title Not Displaying

**Issue**: Title text doesn't appear.

**Solutions**:
1. Verify title parameter is provided: `{% include animated-header.html title="Title" %}`
2. Check that title is not empty
3. Verify CSS z-index (title should be above canvas)
4. Check for CSS conflicts hiding title
5. Verify title text color has good contrast

### Performance Issues

**Issue**: Animation is slow or stuttering.

**Solutions**:
1. Reduce node count (try 15 instead of 25)
2. Increase connection threshold (fewer connections to draw)
3. Check for other heavy JavaScript on page
4. Test on different devices (may be device-specific)
5. Verify requestAnimationFrame is being used (not setInterval)

### Multiple Instances Conflict

**Issue**: Multiple headers on same page interfere with each other.

**Solutions**:
1. Ensure each instance has unique `id` parameter
2. Verify canvas IDs are unique: `animated-header-canvas-{id}`
3. Check that JavaScript uses correct canvas ID
4. Test with different IDs: `id="header1"`, `id="header2"`

### Styling Conflicts

**Issue**: Header styles conflict with site CSS.

**Solutions**:
1. Use more specific class names (already scoped with `.animated-header-*`)
2. Check for CSS specificity conflicts
3. Override conflicting styles in site CSS if needed
4. Verify inline styles are properly scoped

## Next Steps

1. **Customize Colors**: Adjust gradient and node colors to match your site theme
2. **Adjust Parameters**: Tune node count, connection threshold, and header height
3. **Add to Layouts**: Include header in your main layout files
4. **Test Thoroughly**: Test across browsers and devices
5. **Optimize**: Monitor performance and adjust if needed

## Related Documentation

- **Data Model**: See `data-model.md` for entity relationships
- **Contracts**: See `contracts/` directory for API specifications
- **Research**: See `research.md` for technical decisions
- **Specification**: See `spec.md` for complete requirements

## Support

For issues or questions:
1. Check troubleshooting section above
2. Review contract documentation
3. Verify implementation matches examples
4. Check browser console for errors
5. Test in different browsers

