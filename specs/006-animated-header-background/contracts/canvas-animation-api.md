# Canvas Animation API Contract

**Component**: `_includes/animated-header.html` (JavaScript section)  
**Type**: JavaScript Canvas Animation API  
**Version**: 1.0

## Overview

This contract defines the JavaScript API for the animated header background canvas animation. The animation uses HTML5 Canvas API with requestAnimationFrame for smooth, performant rendering.

## API Structure

### Initialization

```javascript
(function() {
  'use strict';
  
  function initializeAnimation() {
    // Canvas setup
    // Node initialization
    // Animation loop start
  }
  
  // DOM ready initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnimation);
  } else {
    initializeAnimation();
  }
})();
```

### Core Functions

#### `initializeAnimation()`

Initializes the canvas animation system.

**Responsibilities**:
- Select/create canvas element
- Obtain 2D rendering context
- Set canvas dimensions
- Initialize nodes array (15-25 nodes)
- Start animation loop

**Returns**: `void`

**Side Effects**:
- Creates/modifies DOM elements
- Starts requestAnimationFrame loop
- Sets up event listeners

#### `createNodes(count)`

Creates and initializes node objects for animation.

**Parameters**:
- `count` (number): Number of nodes to create (15-25)

**Returns**: `Array<Node>` - Array of node objects

**Node Structure**:
```javascript
{
  x: number,      // X position (0 to canvas.width)
  y: number,      // Y position (0 to canvas.height)
  vx: number,     // X velocity (pixels per frame)
  vy: number,     // Y velocity (pixels per frame)
  radius: number  // Visual radius (2-3px)
}
```

#### `updateNodes(nodes, width, height)`

Updates node positions and handles edge collisions.

**Parameters**:
- `nodes` (Array<Node>): Array of node objects
- `width` (number): Canvas width
- `height` (number): Canvas height

**Returns**: `void`

**Behavior**:
- Updates position: `x += vx`, `y += vy`
- Checks edge collisions
- Reverses velocity on collision (bounce)

#### `calculateConnections(nodes, threshold)`

Calculates which nodes should be connected based on distance.

**Parameters**:
- `nodes` (Array<Node>): Array of node objects
- `threshold` (number): Distance threshold for connections (100-150px)

**Returns**: `Array<Connection>` - Array of connection pairs

**Connection Structure** (conceptual):
```javascript
{
  node1: Node,
  node2: Node,
  distance: number
}
```

#### `drawBackground(ctx, width, height)`

Draws gradient background on canvas.

**Parameters**:
- `ctx` (CanvasRenderingContext2D): Canvas 2D context
- `width` (number): Canvas width
- `height` (number): Canvas height

**Returns**: `void`

**Behavior**:
- Creates linear gradient
- Fills entire canvas with gradient

#### `drawConnections(ctx, connections)`

Draws connection lines between nodes.

**Parameters**:
- `ctx` (CanvasRenderingContext2D): Canvas 2D context
- `connections` (Array<Connection>): Array of connection pairs

**Returns**: `void`

**Styling**:
- Stroke color: `rgba(255, 255, 255, 0.25)` (20-30% opacity)
- Line width: 1.5px (1-2px range)
- Subtle, low-opacity appearance

#### `drawNodes(ctx, nodes)`

Draws node circles on canvas.

**Parameters**:
- `ctx` (CanvasRenderingContext2D): Canvas 2D context
- `nodes` (Array<Node>): Array of node objects

**Returns**: `void`

**Styling**:
- Fill color: `rgba(255, 255, 255, 0.6)` (60% opacity)
- Radius: 2-3px
- Small, subtle appearance

#### `animate()`

Main animation loop function (called by requestAnimationFrame).

**Returns**: `void`

**Behavior**:
1. Clears canvas: `ctx.clearRect(0, 0, width, height)`
2. Draws gradient background
3. Updates node positions
4. Calculates connections
5. Draws connections
6. Draws nodes
7. Requests next frame: `requestAnimationFrame(animate)`

**Performance**:
- Target: Minimum 30fps
- Uses requestAnimationFrame for browser optimization
- Automatically pauses when tab is in background

### Event Handlers

#### `handleResize()`

Handles window resize events to update canvas dimensions.

**Returns**: `void`

**Behavior**:
- Updates canvas width to match container width
- Maintains fixed height (150-200px)
- Continues animation (no restart needed)

**Event Binding**:
```javascript
window.addEventListener('resize', handleResize);
```

## Canvas Element Requirements

### HTML Structure

```html
<canvas 
  id="animated-header-canvas" 
  class="animated-header-canvas"
  width="{container-width}" 
  height="150">
</canvas>
```

### Context Acquisition

```javascript
const canvas = document.getElementById('animated-header-canvas');
const ctx = canvas.getContext('2d');
if (!ctx) {
  // Canvas not supported, use fallback
  return;
}
```

## Animation Parameters

### Node Configuration

- **Count**: 15-25 nodes (configurable, optimal range)
- **Initial Position**: Random across canvas
- **Initial Velocity**: Random direction and magnitude (0.5-2 pixels per frame)
- **Radius**: 2-3px visual radius

### Connection Configuration

- **Threshold Distance**: 100-150px (nodes connect if distance < threshold)
- **Line Opacity**: 20-30% (subtle appearance)
- **Line Width**: 1-2px (thin stroke)
- **Color**: Matches site theme (typically white/light on dark background)

### Performance Targets

- **Frame Rate**: Minimum 30fps on standard devices
- **Startup Time**: Animation begins within 1 second of page load
- **Background Behavior**: Automatically pauses/throttles when tab inactive

## Browser Compatibility

### Full Support

- Chrome 10+
- Firefox 4+
- Safari 5.1+
- Edge (all versions)
- Opera 15+

### Progressive Enhancement

- Older browsers: Static gradient background (no animation)
- JavaScript disabled: Static gradient background
- Canvas unsupported: Static gradient background

## Error Handling

### Canvas API Unavailable

```javascript
if (!canvas.getContext) {
  // Canvas not supported
  // Component should display static gradient fallback
  return;
}
```

### Context Acquisition Failure

```javascript
const ctx = canvas.getContext('2d');
if (!ctx) {
  // Context acquisition failed
  // Use fallback rendering
  return;
}
```

### Animation Errors

- Wrap animation code in try-catch (optional, recommended)
- Errors should not break page rendering
- Log errors to console for debugging (development only)

## Performance Optimization

### Rendering Optimizations

1. **Clear and Redraw**: Standard canvas pattern (`clearRect` then redraw)
2. **Batch Operations**: Group drawing operations (connections, then nodes)
3. **Efficient Calculations**: Only calculate distances for node pairs (O(n²) acceptable for 15-25 nodes)
4. **requestAnimationFrame**: Browser-optimized animation loop

### Memory Management

- Nodes array: Fixed size (15-25 nodes, minimal memory)
- Connections: Calculated each frame (not stored, minimal memory)
- No memory leaks: Proper cleanup if animation stopped

## Testing

### Unit Testing (Conceptual)

- Node initialization: Verify random positions and velocities
- Edge collision: Verify velocity reversal on boundaries
- Connection calculation: Verify distance threshold logic
- Rendering: Verify drawing operations complete

### Performance Testing

- Frame rate monitoring: Ensure minimum 30fps
- Memory profiling: Verify no memory leaks
- CPU usage: Verify reasonable CPU consumption
- Background behavior: Verify pause when tab inactive

## Version History

- **1.0** (2024-12-19): Initial API contract definition

## Related Contracts

- **Include Contract**: See `animated-header-include-contract.md` for Jekyll usage
- **CSS Styling Contract**: See `css-styling-contract.md` for styling specifications

