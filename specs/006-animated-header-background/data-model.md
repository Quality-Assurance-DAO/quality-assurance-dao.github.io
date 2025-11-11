# Data Model: Animated Header Background

**Feature**: 006-animated-header-background  
**Date**: 2024-12-19

## Overview

This document defines the data model for the animated header background component. Unlike other features that use YAML data files, this component uses procedural animation with in-memory data structures. The data model describes the runtime entities and their relationships during animation execution.

## Entities

### Node

Represents a single animated point in the graph network. Each node has position and velocity properties that determine its movement and visual appearance.

**Data Source**: Procedurally generated in JavaScript (not from YAML data)

**Schema**:

```javascript
{
  x: number,        // Required: X coordinate position (0 to canvas.width)
  y: number,        // Required: Y coordinate position (0 to canvas.height)
  vx: number,       // Required: X velocity (pixels per frame, can be negative)
  vy: number,       // Required: Y velocity (pixels per frame, can be negative)
  radius: number    // Optional: Visual radius for rendering (default: 2-3px)
}
```

**Field Descriptions**:

- **x** (required): Current X coordinate position on canvas. Range: 0 to canvas.width. Updated each frame based on velocity.
- **y** (required): Current Y coordinate position on canvas. Range: 0 to canvas.height. Updated each frame based on velocity.
- **vx** (required): X-axis velocity component. Positive values move right, negative values move left. Magnitude determines speed. Reversed on edge collision.
- **vy** (required): Y-axis velocity component. Positive values move down, negative values move up. Magnitude determines speed. Reversed on edge collision.
- **radius** (optional): Visual radius for node rendering. Default: 2-3px. Used for `ctx.arc()` drawing.

**Initialization**:
- Nodes are randomly positioned across canvas on initialization
- Velocity vectors are randomly assigned (random direction, random magnitude within range)
- Total node count: 15-25 nodes (configurable, but within this range for optimal performance)

**State Transitions**:
1. **Movement**: Each frame, position updated: `x += vx * deltaTime`, `y += vy * deltaTime`
2. **Edge Collision**: When `x < 0 || x > canvas.width`, reverse `vx`. When `y < 0 || y > canvas.height`, reverse `vy`.
3. **Continuous**: Movement is continuous (no stopping), creating smooth animation

**Validation Rules**:
- Position must remain within canvas bounds (enforced by edge collision)
- Velocity magnitude should be reasonable (typically 0.5-2 pixels per frame) for smooth movement
- Node count must be between 15-25 for optimal performance

### Connection

Represents a visual line connecting two nodes when they are within threshold distance. Connections are calculated dynamically each frame based on node positions.

**Data Source**: Procedurally calculated in JavaScript (not stored, computed each frame)

**Schema** (conceptual, not stored):

```javascript
{
  node1: Node,      // First node in connection pair
  node2: Node,      // Second node in connection pair
  distance: number  // Euclidean distance between nodes (calculated)
}
```

**Field Descriptions**:

- **node1** (required): Reference to first node in connection pair
- **node2** (required): Reference to second node in connection pair
- **distance** (calculated): Euclidean distance between node1 and node2: `sqrt((x2-x1)² + (y2-y1)²)`

**Connection Rules**:
- Connection exists when `distance < threshold` (typically 100-150px)
- Connections are bidirectional (if node A connects to node B, node B connects to node A)
- Connections are recalculated each frame (dynamic network structure)
- Maximum connections per frame: `n * (n-1) / 2` where n = node count (all pairs checked)

**Rendering**:
- Connection lines drawn with low opacity (20-30%)
- Thin stroke width (1-2px)
- Subtle color (matches site theme, typically white/light on dark background or dark on light background)
- Line drawn from `(node1.x, node1.y)` to `(node2.x, node2.y)`

**Validation Rules**:
- Distance threshold must be reasonable (100-150px recommended for 150-200px header height)
- Connection calculation must be efficient (O(n²) for n nodes, acceptable for 15-25 nodes)

### Canvas State

Represents the HTML5 Canvas element and its rendering context. Manages canvas dimensions, drawing operations, and animation loop state.

**Data Source**: DOM element and browser Canvas API

**Schema** (conceptual):

```javascript
{
  element: HTMLCanvasElement,  // Canvas DOM element
  context: CanvasRenderingContext2D,  // 2D rendering context
  width: number,               // Canvas width (matches container width)
  height: number,               // Canvas height (fixed: 150-200px)
  animationId: number,         // requestAnimationFrame ID (for cancellation)
  isAnimating: boolean         // Animation loop state
}
```

**Field Descriptions**:

- **element** (required): HTML5 Canvas DOM element. Created dynamically or exists in HTML.
- **context** (required): 2D rendering context obtained via `canvas.getContext('2d')`. Used for all drawing operations.
- **width** (required): Canvas width in pixels. Matches container/viewport width. Updated on resize.
- **height** (required): Canvas height in pixels. Fixed value: 150-200px (consistent across pages).
- **animationId** (optional): Return value from `requestAnimationFrame()`. Used to cancel animation if needed.
- **isAnimating** (optional): Boolean flag indicating if animation loop is active.

**State Transitions**:
1. **Initialization**: Canvas element created/selected, context obtained, dimensions set
2. **Resize**: Width updated to match container, height remains fixed, animation continues
3. **Animation Start**: `requestAnimationFrame()` called, `isAnimating = true`
4. **Animation Stop**: `cancelAnimationFrame()` called (if needed), `isAnimating = false`

**Validation Rules**:
- Canvas element must exist in DOM before initialization
- Context must be successfully obtained (`getContext('2d')` must not return null)
- Width must be positive, height must be 150-200px
- Canvas must be responsive (width adapts to container)

### Title Parameter

Represents the optional title text displayed over the animated background. Passed through Jekyll include syntax.

**Data Source**: Jekyll include parameter (user-provided)

**Schema**:

```liquid
{% include animated-header.html title="Page Title" %}
```

**Field Descriptions**:

- **title** (optional): Text string to display as header title. Safely escaped to prevent XSS.

**Processing**:
- Title parameter passed via Jekyll include: `{% include animated-header.html title="My Title" %}`
- Accessed in include file as: `{{ include.title }}`
- Must be escaped: `{{ include.title | escape }}` or `{{ include.title | strip_html }}`
- Rendered as text overlay, centered horizontally and vertically
- Styled with semi-transparent background or text shadow for readability

**Validation Rules**:
- Title must be safely escaped (no raw HTML injection)
- Title can be empty/undefined (component works without title)
- Title length should be reasonable (very long text may need wrapping/truncation)

## Entity Relationships

```
Canvas State
  ├── contains: Array<Node> (15-25 nodes)
  ├── renders: Array<Connection> (calculated each frame)
  └── displays: Title Parameter (optional text overlay)

Node
  ├── connects to: Other Nodes (when distance < threshold)
  └── rendered on: Canvas State

Connection
  ├── connects: Node A to Node B
  └── rendered on: Canvas State
```

## Data Flow

1. **Initialization**:
   - Canvas element created/selected
   - Canvas context obtained
   - Canvas dimensions set (width = container width, height = 150-200px)
   - 15-25 nodes initialized with random positions and velocities
   - Title parameter extracted from Jekyll include (if provided)

2. **Animation Loop** (each frame):
   - Clear canvas: `ctx.clearRect(0, 0, width, height)`
   - Draw gradient background
   - Update node positions: `x += vx * deltaTime`, `y += vy * deltaTime`
   - Check edge collisions, reverse velocity if needed
   - Calculate distances between all node pairs
   - Draw connections for pairs within threshold distance
   - Draw nodes (circles at node positions)
   - Draw title text overlay (if title parameter provided)
   - Request next frame: `requestAnimationFrame(animate)`

3. **Resize Handling**:
   - Listen for window resize event
   - Update canvas width to match container width
   - Height remains fixed (150-200px)
   - Continue animation (nodes may need position adjustment if desired)

## State Management

**No Persistent State**: This component uses procedural animation with no data persistence. All state is:
- **Runtime only**: Nodes, connections, canvas state exist only during page execution
- **Regenerated on load**: Each page load creates new random node positions/velocities
- **No storage**: No localStorage, sessionStorage, or server-side storage required
- **No synchronization**: Multiple instances on same page function independently

## Validation Summary

- **Node Count**: Must be between 15-25 nodes
- **Canvas Dimensions**: Width = container width, Height = 150-200px (fixed)
- **Node Positions**: Must remain within canvas bounds (0 to width/height)
- **Velocity Magnitude**: Should be reasonable (0.5-2 pixels per frame)
- **Connection Threshold**: Should be 100-150px for optimal visual effect
- **Title Parameter**: Must be safely escaped to prevent XSS
- **Performance**: Animation must maintain minimum 30fps frame rate

## Implementation Notes

- Nodes array stored in JavaScript: `const nodes = [];`
- No YAML data file required (unlike other site components)
- All data structures are JavaScript objects/arrays
- Canvas state managed through DOM API and Canvas 2D context
- Title parameter passed through Jekyll Liquid templating

