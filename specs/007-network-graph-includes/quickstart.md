# Quickstart: Interactive Network Graph Includes

**Feature**: 007-network-graph-includes  
**Date**: 2024-12-19

## Overview

This guide provides step-by-step instructions for implementing the three interactive service card components with network graphs. Follow these steps to add the reusable service cards to your Jekyll site.

## Prerequisites

- Jekyll site with `_includes/` directory (create if needed)
- Basic understanding of HTML, CSS, and JavaScript
- Modern browser for testing (Chrome, Firefox, Safari, Edge)

## Implementation Steps

### Step 1: Create Shared Network Graph Function

Create `_includes/network_graph.js`:

```javascript
function createInteractiveNetwork(canvasId, nodeCount, color) {
  'use strict';
  
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return; // Canvas not supported
  
  // Configuration
  const CONNECTION_THRESHOLD = 120;
  const MOUSE_REPULSION_DISTANCE = 100;
  const MAX_REPULSION_FORCE = 2.0;
  const NODE_RADIUS = 3.5;
  const BASE_OPACITY = 0.4; // 40% base opacity for connections
  
  // State
  let width = canvas.offsetWidth;
  let height = 180; // Fixed height
  let oldWidth = width;
  let oldHeight = height;
  let mouseX = -1000;
  let mouseY = -1000;
  let animationId = null;
  
  // Initialize canvas size
  function resizeCanvas() {
    width = canvas.offsetWidth;
    canvas.width = width;
    canvas.height = height;
  }
  resizeCanvas();
  
  // Parse hex color to RGB
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  const rgb = hexToRgb(color);
  if (!rgb) return; // Invalid color
  
  // Create nodes
  function createNodes(count) {
    const nodes = [];
    for (let i = 0; i < count; i++) {
      const speed = 0.5 + Math.random() * 1.5; // 0.5-2.0 range
      const angle = Math.random() * Math.PI * 2;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: speed * Math.cos(angle),
        vy: speed * Math.sin(angle),
        radius: NODE_RADIUS
      });
    }
    return nodes;
  }
  
  const nodes = createNodes(nodeCount);
  
  // Update nodes (movement, collision, mouse repulsion)
  function updateNodes() {
    nodes.forEach(node => {
      // Apply mouse repulsion
      if (mouseX >= 0 && mouseY >= 0) {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < MOUSE_REPULSION_DISTANCE && distance > 0) {
          const force = MAX_REPULSION_FORCE * (1 - distance / MOUSE_REPULSION_DISTANCE);
          const forceX = (dx / distance) * force;
          const forceY = (dy / distance) * force;
          node.vx += forceX * 0.1;
          node.vy += forceY * 0.1;
        }
      }
      
      // Update position
      node.x += node.vx;
      node.y += node.vy;
      
      // Bounce off edges
      if (node.x < 0 || node.x > width) {
        node.vx *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
      }
      if (node.y < 0 || node.y > height) {
        node.vy *= -1;
        node.y = Math.max(0, Math.min(height, node.y));
      }
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
  
  // Draw background
  function drawBackground() {
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);
  }
  
  // Draw connections
  function drawConnections(connections) {
    connections.forEach(conn => {
      const opacity = BASE_OPACITY * (1 - conn.distance / CONNECTION_THRESHOLD);
      ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(conn.node1.x, conn.node1.y);
      ctx.lineTo(conn.node2.x, conn.node2.y);
      ctx.stroke();
    });
  }
  
  // Draw nodes
  function drawNodes() {
    ctx.fillStyle = color;
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, width, height);
    drawBackground();
    updateNodes();
    const connections = calculateConnections();
    drawConnections(connections);
    drawNodes();
    animationId = requestAnimationFrame(animate);
  }
  
  // Mouse event handlers
  function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }
  
  function handleMouseLeave() {
    mouseX = -1000;
    mouseY = -1000;
  }
  
  // Resize handler
  function handleResize() {
    const newWidth = canvas.offsetWidth;
    if (newWidth !== width) {
      const scaleX = newWidth / oldWidth;
      const scaleY = height / oldHeight;
      
      // Scale node positions
      nodes.forEach(node => {
        node.x *= scaleX;
        node.y *= scaleY;
      });
      
      oldWidth = newWidth;
      oldHeight = height;
      resizeCanvas();
    }
  }
  
  // Event listeners
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseleave', handleMouseLeave);
  window.addEventListener('resize', handleResize);
  
  // Start animation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animate);
  } else {
    animate();
  }
  
  // Return control object (optional)
  return {
    stop: function() {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }
  };
}
```

### Step 2: Create Governance Innovation Card

Create `_includes/governance_graph.html`:

```liquid
{% include network_graph.js %}

<div class="service-card">
  <canvas id="canvas-governance-{{ include.id | default: 1 }}" class="network-canvas"></canvas>
  <h3 class="service-title">Governance Innovation</h3>
  <p class="service-description">
    Decentralized decision-making and governance processes that empower community participation and transparent leadership.
  </p>
</div>

<style>
.service-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  width: 100%;
}

.network-canvas {
  width: 100%;
  height: 180px;
  background-color: #1a1a1a;
  border-radius: 4px;
  display: block;
  cursor: crosshair;
}

.service-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
  line-height: 1.3;
}

.service-description {
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 0.5rem;
  margin-bottom: 0;
  color: #4a4a4a;
}

@media (max-width: 768px) {
  .service-card {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .service-title {
    font-size: 1.25rem;
  }
  
  .service-description {
    font-size: 0.9rem;
  }
}
</style>

<script>
(function() {
  'use strict';
  
  function initServiceCard() {
    const canvasId = 'canvas-governance-{{ include.id | default: 1 }}';
    const nodeCount = 20;
    const color = '#6ee7b7'; // Teal-green
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        createInteractiveNetwork(canvasId, nodeCount, color);
      });
    } else {
      createInteractiveNetwork(canvasId, nodeCount, color);
    }
  }
  
  initServiceCard();
})();
</script>
```

### Step 3: Create Community Building Card

Create `_includes/community_graph.html`:

```liquid
{% include network_graph.js %}

<div class="service-card">
  <canvas id="canvas-community-{{ include.id | default: 1 }}" class="network-canvas"></canvas>
  <h3 class="service-title">Open-Source Community Building</h3>
  <p class="service-description">
    Fostering vibrant open-source communities through engagement, collaboration, and shared innovation.
  </p>
</div>

<style>
/* Same styles as governance_graph.html */
.service-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  width: 100%;
}

.network-canvas {
  width: 100%;
  height: 180px;
  background-color: #1a1a1a;
  border-radius: 4px;
  display: block;
  cursor: crosshair;
}

.service-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
  line-height: 1.3;
}

.service-description {
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 0.5rem;
  margin-bottom: 0;
  color: #4a4a4a;
}

@media (max-width: 768px) {
  .service-card {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .service-title {
    font-size: 1.25rem;
  }
  
  .service-description {
    font-size: 0.9rem;
  }
}
</style>

<script>
(function() {
  'use strict';
  
  function initServiceCard() {
    const canvasId = 'canvas-community-{{ include.id | default: 1 }}';
    const nodeCount = 20;
    const color = '#60a5fa'; // Blue
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        createInteractiveNetwork(canvasId, nodeCount, color);
      });
    } else {
      createInteractiveNetwork(canvasId, nodeCount, color);
    }
  }
  
  initServiceCard();
})();
</script>
```

### Step 4: Create AI & Blockchain Strategy Card

Create `_includes/ai_graph.html`:

```liquid
{% include network_graph.js %}

<div class="service-card">
  <canvas id="canvas-ai-{{ include.id | default: 1 }}" class="network-canvas"></canvas>
  <h3 class="service-title">AI & Blockchain Strategy</h3>
  <p class="service-description">
    Cutting-edge technological innovation combining artificial intelligence and blockchain for next-generation solutions.
  </p>
</div>

<style>
/* Same styles as governance_graph.html */
.service-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  width: 100%;
}

.network-canvas {
  width: 100%;
  height: 180px;
  background-color: #1a1a1a;
  border-radius: 4px;
  display: block;
  cursor: crosshair;
}

.service-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
  line-height: 1.3;
}

.service-description {
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 0.5rem;
  margin-bottom: 0;
  color: #4a4a4a;
}

@media (max-width: 768px) {
  .service-card {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .service-title {
    font-size: 1.25rem;
  }
  
  .service-description {
    font-size: 0.9rem;
  }
}
</style>

<script>
(function() {
  'use strict';
  
  function initServiceCard() {
    const canvasId = 'canvas-ai-{{ include.id | default: 1 }}';
    const nodeCount = 20;
    const color = '#a78bfa'; // Purple
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        createInteractiveNetwork(canvasId, nodeCount, color);
      });
    } else {
      createInteractiveNetwork(canvasId, nodeCount, color);
    }
  }
  
  initServiceCard();
})();
</script>
```

### Step 5: Use Service Cards in Pages

Add service cards to any Jekyll page or layout:

```liquid
{% include governance_graph.html %}
{% include community_graph.html %}
{% include ai_graph.html %}
```

Or with unique IDs for multiple instances:

```liquid
{% for service in site.data.services %}
  {% include governance_graph.html id=forloop.index %}
{% endfor %}
```

## Testing Checklist

### Functional Testing

- [ ] All three service cards render on page load
- [ ] Each card displays animated network graph with 20 nodes
- [ ] Nodes move smoothly across canvas
- [ ] Connections appear between nearby nodes (within 120px)
- [ ] Mouse movement over canvas repels nearby nodes (within 100px)
- [ ] Mouse leaving canvas stops repulsion
- [ ] Each card has correct color (governance: teal-green, community: blue, AI: purple)
- [ ] Service titles and descriptions display correctly

### Responsive Testing

- [ ] Cards adapt to mobile screen width (< 768px)
- [ ] Cards adapt to tablet screen width (768px - 1024px)
- [ ] Cards adapt to desktop screen width (> 1024px)
- [ ] Canvas resizes correctly when browser window resized
- [ ] Node positions scale proportionally on resize
- [ ] Animation continues smoothly after resize

### Performance Testing

- [ ] All three animations start within 1 second of page load
- [ ] All three animations maintain minimum 30fps frame rate
- [ ] Page remains responsive during animation
- [ ] No noticeable lag when interacting with multiple canvases
- [ ] Animation pauses when browser tab is in background

### Progressive Enhancement Testing

- [ ] Service cards display with static content when Canvas unsupported
- [ ] Service cards display with static content when JavaScript disabled
- [ ] No errors thrown in console for unsupported browsers
- [ ] Title and description always visible

### Cross-Browser Testing

- [ ] Chrome: Full functionality
- [ ] Firefox: Full functionality
- [ ] Safari: Full functionality
- [ ] Edge: Full functionality
- [ ] Mobile Safari: Full functionality
- [ ] Chrome Mobile: Full functionality

## Customization

### Change Node Count

Modify the `nodeCount` parameter in each card's initialization:

```javascript
const nodeCount = 25; // Change from 20 to 25
```

### Change Colors

Modify the `color` parameter in each card's initialization:

```javascript
const color = '#ff6b6b'; // Change to custom color
```

### Adjust Animation Speed

Modify speed range in `network_graph.js`:

```javascript
const speed = 0.3 + Math.random() * 1.7; // Slower: 0.3-2.0 range
```

### Adjust Connection Threshold

Modify `CONNECTION_THRESHOLD` in `network_graph.js`:

```javascript
const CONNECTION_THRESHOLD = 150; // Increase from 120 to 150
```

## Troubleshooting

### Canvas Not Rendering

- Check that canvas element exists in DOM
- Verify canvas ID matches function parameter
- Check browser console for errors
- Ensure Canvas API is supported

### Animation Not Starting

- Check that `network_graph.js` is included before card includes
- Verify JavaScript is enabled
- Check browser console for errors
- Ensure DOM is ready before initialization

### Performance Issues

- Reduce node count (e.g., from 20 to 15)
- Reduce connection threshold
- Check for multiple instances with same canvas ID
- Verify no other heavy animations on page

### Mouse Interaction Not Working

- Check that mouse event listeners are attached
- Verify mouse position calculation is correct
- Check that repulsion distance threshold is appropriate
- Ensure canvas has correct cursor style (crosshair)

## Related Documentation

- **Data Model**: See `data-model.md` for entity definitions
- **Research**: See `research.md` for technical decisions
- **Contracts**: See `contracts/` directory for API specifications

