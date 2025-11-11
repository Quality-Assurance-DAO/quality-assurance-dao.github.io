{% comment %}
  Shared Network Graph Function
  Reusable JavaScript function for interactive network graph animations
  Used by all three service card includes (governance, community, AI)
{% endcomment %}

<script>
function createInteractiveNetwork(canvasId, nodeCount, color) {
  'use strict';
  
  // T004: Create function structure with signature
  // T005: Implement canvas element selection and context creation
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
  
  // T006: Implement canvas dimension setup
  function resizeCanvas() {
    width = canvas.offsetWidth;
    canvas.width = width;
    canvas.height = height;
  }
  resizeCanvas();
  
  // T007: Implement hex color to RGB conversion function
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
  
  // T008: Implement node creation function with random positioning
  function createNodes(count) {
    const nodes = [];
    for (let i = 0; i < count; i++) {
      // T009: Implement node initialization with random velocities (0.5-2.0 pixels per frame range)
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
  
  // T010: Implement node update function with position updates
  function updateNodes() {
    nodes.forEach(node => {
      // T012: Implement mouse repulsion calculation (distance-based, proportional force)
      // T013: Implement mouse repulsion application with maximum force cap
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
      
      // T011: Implement edge collision detection and velocity reversal
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
  
  // T014: Implement connection calculation function with 120px threshold
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
  
  // T017: Implement background drawing function with dark color (#1a1a1a)
  function drawBackground() {
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);
  }
  
  // T015: Implement connection drawing function with distance-based opacity fading
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
  
  // T016: Implement node drawing function with 3.5px radius circles
  function drawNodes() {
    ctx.fillStyle = color;
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  
  // T018: Implement main animation loop using requestAnimationFrame
  function animate() {
    ctx.clearRect(0, 0, width, height);
    drawBackground();
    updateNodes();
    const connections = calculateConnections();
    drawConnections(connections);
    drawNodes();
    animationId = requestAnimationFrame(animate);
  }
  
  // T019: Implement mouse move event handler for cursor tracking
  function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }
  
  // T020: Implement mouse leave event handler to stop repulsion
  function handleMouseLeave() {
    mouseX = -1000;
    mouseY = -1000;
  }
  
  // T021: Implement resize handler with proportional node position scaling
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
  
  // T022: Implement event listener attachment (mousemove, mouseleave, resize)
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseleave', handleMouseLeave);
  window.addEventListener('resize', handleResize);
  
  // T023: Implement progressive enhancement check (Canvas API support detection)
  // (Already checked at function start with ctx check)
  
  // T024: Implement DOM ready check and animation initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animate);
  } else {
    animate();
  }
  
  // T025: Implement closure state management for instance independence
  // (All state is in closure, each function call creates independent instance)
  
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
</script>

