# Network Graph Function API Contract

**Component**: `_includes/network_graph.js`  
**Type**: JavaScript Function API  
**Version**: 1.0

## Overview

This contract defines the JavaScript API for the shared interactive network graph function. The function creates and manages canvas-based network graph animations with nodes, connections, and mouse interaction. The function is designed to be reusable across multiple service card instances.

## Function Signature

```javascript
function createInteractiveNetwork(canvasId, nodeCount, color) {
  // Implementation
  // Returns: { start(), stop(), destroy() } (optional control object)
}
```

## Parameters

### `canvasId` (required, string)

Unique ID of the canvas element to attach the animation to.

**Requirements**:
- Must be a valid DOM element ID
- Canvas element must exist in DOM before function call
- Should be unique per instance to prevent conflicts
- Format: `canvas-{service}-{unique-id}` (e.g., `canvas-governance-1`)

**Validation**:
- Function should check if element exists: `const canvas = document.getElementById(canvasId)`
- If element not found, function should handle gracefully (no errors thrown)

### `nodeCount` (required, number)

Number of nodes to create in the network graph.

**Requirements**:
- Must be positive integer
- Default: 20 nodes
- Recommended range: 15-25 for optimal performance
- Each instance can have different node count

**Validation**:
- Should validate: `if (nodeCount < 1) nodeCount = 20`
- Should clamp to reasonable maximum if needed

### `color` (required, string)

Color for nodes and connections in hex format.

**Requirements**:
- Must be valid hex color string (e.g., `"#6ee7b7"`, `"#60a5fa"`, `"#a78bfa"`)
- Used for both node fill color and connection line color
- Connection lines use same color with reduced opacity (30-50%)

**Service-Specific Colors**:
- Governance Innovation: `#6ee7b7` (teal-green)
- Open-Source Community Building: `#60a5fa` (blue)
- AI & Blockchain Strategy: `#a78bfa` (purple)

## Return Value

Function may return optional control object with lifecycle methods:

```javascript
{
  start: function() { /* Start animation */ },
  stop: function() { /* Stop animation */ },
  destroy: function() { /* Clean up resources */ }
}
```

**Note**: Return value is optional. Function can also return `void` if control object not needed.

## Function Behavior

### Initialization

1. **Canvas Selection**: Select canvas element by ID
2. **Context Creation**: Obtain 2D rendering context: `canvas.getContext('2d')`
3. **Dimension Setup**: Set canvas dimensions (width = container width, height = 180px)
4. **Node Creation**: Create and initialize nodes array with random positions and velocities
5. **Event Listeners**: Set up event listeners (mousemove, mouseleave, resize)
6. **Animation Start**: Start animation loop via `requestAnimationFrame()`

### Instance Independence

Each call to `createInteractiveNetwork()` creates a new closure with independent state:

- **Independent nodes array**: Each instance has its own nodes
- **Independent mouse tracking**: Each instance tracks mouse position separately
- **Independent animation loop**: Each instance has its own `requestAnimationFrame` loop
- **No shared state**: Instances do not interfere with each other

### Closure State (per instance)

```javascript
{
  canvas: HTMLCanvasElement,        // Canvas DOM element
  ctx: CanvasRenderingContext2D,   // 2D rendering context
  nodes: Array<Node>,              // Array of node objects
  mouseX: number,                  // Current mouse X position (-1000 if off canvas)
  mouseY: number,                  // Current mouse Y position (-1000 if off canvas)
  width: number,                   // Canvas width
  height: number,                  // Canvas height (180px fixed)
  oldWidth: number,                // Previous width (for resize scaling)
  oldHeight: number,               // Previous height (for resize scaling)
  animationId: number,            // requestAnimationFrame ID
  isAnimating: boolean,           // Animation state flag
  nodeCount: number,              // Number of nodes
  color: string                   // Node/connection color
}
```

## Core Functions (Internal)

### `initNodes()`

Creates and initializes node objects with random positions and velocities.

**Node Structure**:
```javascript
{
  x: number,        // X position (0 to canvas.width, random)
  y: number,        // Y position (0 to canvas.height, random)
  vx: number,       // X velocity (random, 0.5-2.0 pixels per frame)
  vy: number,       // Y velocity (random, 0.5-2.0 pixels per frame)
  radius: number    // Visual radius (3.5px)
}
```

**Initialization**:
- Random position: `x = Math.random() * width`, `y = Math.random() * height`
- Random velocity: `speed = 0.5 + Math.random() * 1.5` (0.5-2.0 range)
- Random direction: `angle = Math.random() * Math.PI * 2`
- Velocity: `vx = speed * Math.cos(angle)`, `vy = speed * Math.sin(angle)`

### `updateNodes()`

Updates node positions and handles edge collisions.

**Behavior**:
- Updates position: `x += vx * deltaTime`, `y += vy * deltaTime`
- Edge collision: If `x < 0 || x > width`, reverse `vx`. If `y < 0 || y > height`, reverse `vy`
- Mouse repulsion: If mouse within 100px, apply proportional repulsion force
- Repulsion force: `force = maxForce * (1 - distance / 100)`, capped at maximum

### `applyMouseRepulsion()`

Applies proportional repulsion force to nodes near mouse cursor.

**Behavior**:
- Calculate distance from mouse to each node: `distance = sqrt((mouseX - node.x)² + (mouseY - node.y)²)`
- If distance < 100px: Apply repulsion force
- Force calculation: `force = maxForce * (1 - distance / 100)`
- Direction: Normalized vector from mouse to node
- Apply to velocity: `node.vx += forceX * deltaTime`, `node.vy += forceY * deltaTime`
- Maximum force cap: Prevent excessive velocity (e.g., maxForce = 2.0)

### `calculateConnections()`

Calculates which nodes should be connected based on distance threshold.

**Behavior**:
- Iterate through all node pairs: `for (i = 0; i < nodes.length; i++) { for (j = i+1; j < nodes.length; j++) { ... } }`
- Calculate distance: `distance = sqrt((nodes[j].x - nodes[i].x)² + (nodes[j].y - nodes[i].y)²)`
- If distance < 120px: Create connection
- Return array of connection pairs

**Connection Structure** (conceptual):
```javascript
{
  node1: Node,
  node2: Node,
  distance: number
}
```

### `drawConnections(ctx, connections, color)`

Draws connection lines between nodes with distance-based opacity fading.

**Parameters**:
- `ctx`: Canvas 2D rendering context
- `connections`: Array of connection pairs
- `color`: Base color for connections (hex string)

**Behavior**:
- For each connection, calculate opacity: `opacity = baseOpacity * (1 - distance / 120)`
- Base opacity: 30-50% (0.3 to 0.5)
- Clamp opacity: `opacity = Math.max(0, Math.min(baseOpacity, opacity))`
- Convert hex color to RGB: Parse hex string to RGB values
- Set stroke style: `ctx.strokeStyle = rgba(r, g, b, opacity)`
- Set line width: `ctx.lineWidth = 1.5`
- Draw line: `ctx.beginPath()`, `ctx.moveTo(x1, y1)`, `ctx.lineTo(x2, y2)`, `ctx.stroke()`

### `drawNodes(ctx, nodes, color)`

Draws node circles on canvas.

**Parameters**:
- `ctx`: Canvas 2D rendering context
- `nodes`: Array of node objects
- `color`: Color for nodes (hex string)

**Behavior**:
- Convert hex color to RGB: Parse hex string to RGB values
- Set fill style: `ctx.fillStyle = color` (full opacity for nodes)
- For each node: `ctx.beginPath()`, `ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)`, `ctx.fill()`
- Node radius: 3.5px

### `drawBackground(ctx, width, height)`

Draws dark background on canvas.

**Parameters**:
- `ctx`: Canvas 2D rendering context
- `width`: Canvas width
- `height`: Canvas height

**Behavior**:
- Fill entire canvas with dark color: `ctx.fillStyle = '#1a1a1a'` (or similar dark color)
- Fill rectangle: `ctx.fillRect(0, 0, width, height)`

### `animate()`

Main animation loop function (called by requestAnimationFrame).

**Behavior** (each frame):
1. Clear canvas: `ctx.clearRect(0, 0, width, height)`
2. Draw dark background
3. Update node positions (including mouse repulsion)
4. Calculate connections based on distance
5. Draw connections with distance-based opacity
6. Draw nodes
7. Request next frame: `requestAnimationFrame(animate)`

**Performance**:
- Target: Minimum 30fps for three simultaneous instances
- Uses `requestAnimationFrame` for browser optimization
- Automatically pauses when browser tab is in background

## Event Handlers

### `handleMouseMove(event)`

Handles mouse movement over canvas to update mouse position and trigger repulsion.

**Event**: `mousemove` on canvas element

**Behavior**:
- Calculate mouse position relative to canvas: `mouseX = event.offsetX`, `mouseY = event.offsetY`
- Update closure state: `mouseX = mouseX`, `mouseY = mouseY`
- Repulsion is applied in `updateNodes()` based on mouse position

**Event Binding**:
```javascript
canvas.addEventListener('mousemove', handleMouseMove);
```

### `handleMouseLeave(event)`

Handles mouse leaving canvas area to stop repulsion effect.

**Event**: `mouseleave` on canvas element

**Behavior**:
- Set mouse position to off-canvas: `mouseX = -1000`, `mouseY = -1000`
- Stops repulsion effect (nodes return to normal movement)

**Event Binding**:
```javascript
canvas.addEventListener('mouseleave', handleMouseLeave);
```

### `handleResize()`

Handles window resize events to update canvas dimensions and scale node positions proportionally.

**Event**: `resize` on window object

**Behavior**:
1. Calculate new canvas width: `newWidth = canvas.offsetWidth` (or container width)
2. Calculate scale factors: `scaleX = newWidth / oldWidth`, `scaleY = newHeight / oldHeight`
3. Scale all node positions: `node.x *= scaleX`, `node.y *= scaleY`
4. Update canvas dimensions: `canvas.width = newWidth`, `canvas.height = 180` (fixed height)
5. Update context scale if needed (for high DPI displays)
6. Update oldWidth, oldHeight for next resize
7. Continue animation (no restart needed)

**Event Binding**:
```javascript
window.addEventListener('resize', handleResize);
```

**Note**: Each instance has its own resize handler. Only the canvas that needs resizing should update.

## Canvas Element Requirements

### HTML Structure

```html
<canvas 
  id="canvas-{service}-{unique-id}" 
  class="network-canvas"
  width="{container-width}" 
  height="180">
</canvas>
```

### Canvas Attributes

- **id**: Must match `canvasId` parameter
- **class**: Should have `network-canvas` class for styling
- **width**: Set via JavaScript (matches container width)
- **height**: Fixed at 180px

### Canvas Styling

- Background: Dark color (#1a1a1a or similar)
- Border radius: 4-6px (rounded corners)
- Width: 100% (responsive)
- Height: 180px (fixed)
- Cursor: crosshair (indicates interactivity)

## Progressive Enhancement

### Canvas Support Detection

Function should check for Canvas support:

```javascript
if (!canvas.getContext) {
  // Canvas not supported, handle gracefully
  return;
}
```

**Fallback Behavior**:
- If Canvas not supported: Function should return early, no errors thrown
- Service card still displays with title and description

### JavaScript Disabled

If JavaScript is disabled:
- Function never executes
- Canvas element exists but no animation
- Service card displays with static content

## Performance Requirements

### Frame Rate

- **Target**: Minimum 30fps for each instance
- **Three simultaneous instances**: All three must maintain 30fps minimum
- **Optimization**: Use efficient algorithms, minimize calculations, batch rendering

### Optimization Techniques

1. **Efficient distance calculations**: Only calculate for node pairs (O(n²) acceptable for 20 nodes)
2. **Early exit for mouse repulsion**: Only check nodes within reasonable distance
3. **Batch rendering**: Use `ctx.beginPath()` and batch stroke operations
4. **requestAnimationFrame**: Browser-optimized animation loop
5. **Minimize DOM queries**: Cache canvas element and context references
6. **Independent loops**: Each instance has its own animation loop (no blocking)

## Browser Compatibility

### Required APIs

- HTML5 Canvas API
- `requestAnimationFrame` API
- `addEventListener` API
- `getContext('2d')` method

### Browser Support

- Modern browsers: Full support (Chrome, Firefox, Safari, Edge)
- IE11: Limited support (may need polyfills)
- Mobile browsers: Full support (iOS Safari, Chrome Mobile)

## Error Handling

- **Canvas element not found**: Function should return early, no errors thrown
- **Canvas context not available**: Function should return early, no errors thrown
- **Invalid parameters**: Function should use defaults or validate inputs
- **Animation errors**: Should be caught and handled gracefully (no console errors)

## Usage Example

```javascript
// Include shared function once per page
// {% include network_graph.js %}

// Initialize for each service card
createInteractiveNetwork('canvas-governance-1', 20, '#6ee7b7');
createInteractiveNetwork('canvas-community-1', 20, '#60a5fa');
createInteractiveNetwork('canvas-ai-1', 20, '#a78bfa');
```

## Related Contracts

- **Service Card Include**: See `service-card-include-contract.md` for include interface
- **CSS Styling**: See `css-styling-contract.md` for styling requirements

