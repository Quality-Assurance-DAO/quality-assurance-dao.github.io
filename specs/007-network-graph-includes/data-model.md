# Data Model: Interactive Network Graph Includes

**Feature**: 007-network-graph-includes  
**Date**: 2024-12-19

## Overview

This document defines the data model for the interactive network graph service card components. Unlike other features that use YAML data files, this component uses procedural animation with in-memory data structures. The data model describes the runtime entities and their relationships during animation execution across three service card instances.

## Entities

### Service Card

Represents a container element that wraps a canvas, service title, and description. Provides visual structure and styling context for displaying service information with an interactive network graph.

**Data Source**: Jekyll include file (governance_graph.html, community_graph.html, ai_graph.html)

**Schema** (conceptual, HTML structure):

```html
<div class="service-card">
  <canvas id="canvas-{service}-{id}"></canvas>
  <h3 class="service-title">{Service Title}</h3>
  <p class="service-description">{Service Description}</p>
</div>
```

**Field Descriptions**:

- **canvas element** (required): HTML5 Canvas element for rendering network graph. Must have unique ID per instance.
- **service-title** (required): Text content for service title. Governance Innovation, Open-Source Community Building, or AI & Blockchain Strategy.
- **service-description** (required): Text content for service description. Explains the service offering.

**Service Card Types**:
1. **Governance Innovation**: Teal-green color (#6ee7b7), title "Governance Innovation", description about decentralized decision-making
2. **Open-Source Community Building**: Blue color (#60a5fa), title "Open-Source Community Building", description about community engagement
3. **AI & Blockchain Strategy**: Purple color (#a78bfa), title "AI & Blockchain Strategy", description about technological innovation

**Validation Rules**:
- Each card must have unique canvas ID (prevents conflicts when multiple instances on same page)
- Canvas ID format: `canvas-{service}-{unique-id}` (e.g., `canvas-governance-1`, `canvas-community-1`)
- Service title and description must be present (non-empty text)
- Card must be properly styled with consistent wrapper (background, border radius, padding, shadow)

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
  radius: number    // Optional: Visual radius for rendering (default: 3.5px)
}
```

**Field Descriptions**:

- **x** (required): Current X coordinate position on canvas. Range: 0 to canvas.width. Updated each frame based on velocity. Initially random across entire canvas area.
- **y** (required): Current Y coordinate position on canvas. Range: 0 to canvas.height. Updated each frame based on velocity. Initially random across entire canvas area.
- **vx** (required): X-axis velocity component. Positive values move right, negative values move left. Magnitude determines speed (variable, 0.5-2.0 pixels per frame). Reversed on edge collision. Adjusted by mouse repulsion force.
- **vy** (required): Y-axis velocity component. Positive values move down, negative values move up. Magnitude determines speed (variable, 0.5-2.0 pixels per frame). Reversed on edge collision. Adjusted by mouse repulsion force.
- **radius** (optional): Visual radius for node rendering. Default: 3.5px. Used for `ctx.arc()` drawing.

**Initialization**:
- Nodes are randomly positioned across entire canvas area on initialization
- Velocity vectors are randomly assigned (random direction, random magnitude within 0.5-2.0 pixels per frame range)
- Total node count: 20 nodes per graph (default, configurable via function parameter)

**State Transitions**:
1. **Movement**: Each frame, position updated: `x += vx * deltaTime`, `y += vy * deltaTime`
2. **Edge Collision**: When `x < 0 || x > canvas.width`, reverse `vx`. When `y < 0 || y > canvas.height`, reverse `vy`. Nodes bounce off edges.
3. **Mouse Repulsion**: When mouse within 100px of node, apply proportional repulsion force to velocity. Force stronger when closer to cursor, weaker when farther, with maximum strength cap.
4. **Continuous**: Movement is continuous (no stopping), creating smooth animation

**Validation Rules**:
- Position must remain within canvas bounds (enforced by edge collision)
- Velocity magnitude should be within range (0.5-2.0 pixels per frame) for smooth movement
- Node count must be 20 (default) or configurable via parameter
- Repulsion force must be capped to prevent excessive velocity

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
- Connection exists when `distance < threshold` (120px threshold)
- Connections are bidirectional (if node A connects to node B, node B connects to node A)
- Connections are recalculated each frame (dynamic network structure)
- Maximum connections per frame: `n * (n-1) / 2` where n = node count (all pairs checked, 20 nodes = 190 potential connections)

**Rendering**:
- Connection lines drawn with same color as nodes but with reduced base opacity (30-50%)
- Opacity fades based on distance: full base opacity at 0px distance, transparent at 120px threshold
- Thin stroke width (1.5px)
- Line drawn from `(node1.x, node1.y)` to `(node2.x, node2.y)`
- Opacity calculation: `opacity = baseOpacity * (1 - distance / 120)`, clamped to [0, baseOpacity]

**Validation Rules**:
- Distance threshold must be 120px (as specified)
- Connection calculation must be efficient (O(n²) for n nodes, acceptable for 20 nodes)
- Opacity must fade smoothly from base opacity to transparent

### Canvas State

Represents the HTML5 Canvas element and its rendering context. Manages canvas dimensions, drawing operations, and animation loop state for each service card instance.

**Data Source**: DOM element and browser Canvas API

**Schema** (conceptual):

```javascript
{
  element: HTMLCanvasElement,  // Canvas DOM element
  context: CanvasRenderingContext2D,  // 2D rendering context
  width: number,               // Canvas width (matches container width, 100%)
  height: number,              // Canvas height (fixed: 180px)
  animationId: number,         // requestAnimationFrame ID (for cancellation)
  isAnimating: boolean,       // Animation loop state
  mouseX: number,             // Current mouse X position (or -1000 if off canvas)
  mouseY: number,             // Current mouse Y position (or -1000 if off canvas)
  oldWidth: number,           // Previous canvas width (for resize scaling)
  oldHeight: number           // Previous canvas height (for resize scaling)
}
```

**Field Descriptions**:

- **element** (required): HTML5 Canvas DOM element. Selected by unique ID per service card instance.
- **context** (required): 2D rendering context obtained via `canvas.getContext('2d')`. Used for all drawing operations.
- **width** (required): Canvas width in pixels. Matches container/viewport width (100%). Updated on resize.
- **height** (required): Canvas height in pixels. Fixed value: 180px (consistent across all cards).
- **animationId** (optional): Return value from `requestAnimationFrame()`. Used to cancel animation if needed.
- **isAnimating** (optional): Boolean flag indicating if animation loop is active.
- **mouseX** (required): Current mouse X position relative to canvas. Set to -1000 when mouse leaves canvas.
- **mouseY** (required): Current mouse Y position relative to canvas. Set to -1000 when mouse leaves canvas.
- **oldWidth** (required): Previous canvas width before resize. Used for proportional position scaling.
- **oldHeight** (required): Previous canvas height before resize. Used for proportional position scaling.

**State Transitions**:
1. **Initialization**: Canvas element selected by ID, context obtained, dimensions set (width = container width, height = 180px), nodes initialized, mouse position set to off-canvas
2. **Resize**: Width updated to match container, height remains fixed (180px), node positions scaled proportionally, oldWidth/oldHeight updated, animation continues
3. **Animation Start**: `requestAnimationFrame()` called, `isAnimating = true`
4. **Animation Stop**: `cancelAnimationFrame()` called (if needed), `isAnimating = false`
5. **Mouse Enter**: Mouse position updated on mousemove event, nodes within 100px repelled
6. **Mouse Leave**: Mouse position set to off-canvas (-1000, -1000), repulsion stops

**Validation Rules**:
- Canvas element must exist in DOM before initialization (unique ID per instance)
- Context must be successfully obtained (`getContext('2d')` must not return null)
- Width must be positive, height must be 180px (fixed)
- Canvas must be responsive (width adapts to container)
- Mouse position must be tracked accurately for repulsion effect

### Shared Network Function

Represents the reusable JavaScript function that creates and manages network graph animations. Can be instantiated multiple times for different canvas elements.

**Data Source**: JavaScript function in `_includes/network_graph.js`

**Schema** (function signature):

```javascript
function createInteractiveNetwork(canvasId, nodeCount, color) {
  // Returns: { start(), stop(), destroy() } (optional control object)
}
```

**Parameters**:
- **canvasId** (required, string): Unique ID of canvas element to attach animation to
- **nodeCount** (required, number): Number of nodes to create (default: 20)
- **color** (required, string): Color for nodes and connections (hex format, e.g., "#6ee7b7")

**Function Behavior**:
- Creates closure with independent state for each instance
- Initializes canvas, context, nodes array
- Sets up event listeners (mousemove, mouseleave, resize)
- Starts animation loop via requestAnimationFrame
- Returns control object with lifecycle methods (optional)

**Instance Independence**:
- Each call to `createInteractiveNetwork()` creates independent animation instance
- Each instance has its own: nodes array, mouse position, animation loop, canvas reference
- Instances do not interfere with each other
- Supports multiple instances on same page (FR-024)

**Validation Rules**:
- Canvas ID must be unique per instance
- Node count must be positive integer (default: 20)
- Color must be valid hex color string
- Function must handle multiple simultaneous instances without conflicts

### Service Information

Represents the text content displayed on each service card including service title and description.

**Data Source**: Hardcoded in Jekyll include files (not from YAML data)

**Schema** (per service card):

```html
<h3 class="service-title">{Title}</h3>
<p class="service-description">{Description}</p>
```

**Service Card Content**:

1. **Governance Innovation**:
   - Title: "Governance Innovation"
   - Description: Text describing decentralized decision-making and governance processes

2. **Open-Source Community Building**:
   - Title: "Open-Source Community Building"
   - Description: Text describing community engagement and open-source initiatives

3. **AI & Blockchain Strategy**:
   - Title: "AI & Blockchain Strategy"
   - Description: Text describing technological innovation in AI and blockchain

**Field Descriptions**:
- **Title** (required): Service title text. Displayed prominently below canvas.
- **Description** (required): Service description text. Displayed below title with appropriate styling.

**Validation Rules**:
- Title and description must be present (non-empty text)
- Text must be properly styled with appropriate typography
- Content must be readable and accessible

## Entity Relationships

```
Service Card
  ├── contains: Canvas State (one per card)
  ├── displays: Service Information (title + description)
  └── uses: Shared Network Function (via createInteractiveNetwork call)

Canvas State
  ├── contains: Array<Node> (20 nodes per instance)
  ├── renders: Array<Connection> (calculated each frame)
  ├── tracks: Mouse Position (for repulsion effect)
  └── manages: Animation Loop (requestAnimationFrame)

Node
  ├── connects to: Other Nodes (when distance < 120px)
  ├── responds to: Mouse Position (repulsion within 100px)
  └── rendered on: Canvas State

Connection
  ├── connects: Node A to Node B
  ├── fades by: Distance (opacity based on distance)
  └── rendered on: Canvas State

Shared Network Function
  ├── creates: Canvas State instance
  ├── initializes: Array<Node>
  └── manages: Animation lifecycle
```

## Data Flow

1. **Page Load**:
   - Jekyll includes `network_graph.js` (shared function loaded once)
   - Jekyll includes service card files (governance_graph.html, community_graph.html, ai_graph.html)
   - Each card include renders HTML structure with canvas element
   - Each card include calls `createInteractiveNetwork(canvasId, nodeCount, color)` after DOM ready

2. **Function Initialization** (per card instance):
   - Canvas element selected by unique ID
   - Canvas context obtained
   - Canvas dimensions set (width = container width, height = 180px)
   - 20 nodes initialized with random positions and velocities
   - Event listeners set up (mousemove, mouseleave, resize)
   - Animation loop started via requestAnimationFrame

3. **Animation Loop** (each frame, per instance):
   - Clear canvas: `ctx.clearRect(0, 0, width, height)`
   - Draw dark background
   - Update node positions: `x += vx * deltaTime`, `y += vy * deltaTime`
   - Check edge collisions, reverse velocity if needed
   - Check mouse proximity, apply repulsion force if within 100px
   - Calculate distances between all node pairs
   - Draw connections for pairs within 120px threshold (with distance-based opacity)
   - Draw nodes (circles at node positions in specified color)
   - Request next frame: `requestAnimationFrame(animate)`

4. **Mouse Interaction** (per instance):
   - On mousemove: Update mouseX, mouseY relative to canvas
   - Calculate distance from mouse to each node
   - If distance < 100px: Apply proportional repulsion force to node velocity
   - On mouseleave: Set mouseX, mouseY to off-canvas (-1000, -1000), stop repulsion

5. **Resize Handling** (per instance):
   - Listen for window resize event
   - Calculate scale factors: `scaleX = newWidth / oldWidth`, `scaleY = newHeight / oldHeight`
   - Scale all node positions proportionally: `node.x *= scaleX`, `node.y *= scaleY`
   - Update canvas width to match container width
   - Height remains fixed (180px)
   - Update oldWidth, oldHeight for next resize
   - Continue animation

## State Management

**No Persistent State**: This component uses procedural animation with no data persistence. All state is:
- **Runtime only**: Nodes, connections, canvas state exist only during page execution
- **Regenerated on load**: Each page load creates new random node positions/velocities
- **No storage**: No localStorage, sessionStorage, or server-side storage required
- **No synchronization**: Multiple instances on same page function independently
- **Instance isolation**: Each service card instance has completely independent state

**Multiple Instance Management**:
- Each call to `createInteractiveNetwork()` creates new closure with independent state
- Instances do not share data or interfere with each other
- Each instance has its own animation loop
- Mouse interactions only affect the canvas directly under cursor (FR-025)

## Validation Summary

- **Node Count**: Must be 20 per graph (default, configurable via parameter)
- **Canvas Dimensions**: Width = container width (100%), Height = 180px (fixed)
- **Node Positions**: Must remain within canvas bounds (0 to width/height), initially random across entire canvas
- **Velocity Magnitude**: Should be within range (0.5-2.0 pixels per frame) for smooth movement
- **Connection Threshold**: Must be 120px for optimal visual effect
- **Mouse Repulsion Distance**: Must be 100px threshold
- **Repulsion Force**: Must be proportional with maximum cap to prevent visual glitches
- **Connection Opacity**: Base opacity 30-50%, fades from full to transparent over 0-120px distance
- **Canvas ID**: Must be unique per instance to prevent conflicts
- **Performance**: Animation must maintain minimum 30fps frame rate for three simultaneous instances
- **Color Schemes**: Governance (teal-green #6ee7b7), Community (blue #60a5fa), AI (purple #a78bfa)

## Implementation Notes

- Nodes array stored in JavaScript closure: `const nodes = [];` (per instance)
- No YAML data file required (unlike other site components)
- All data structures are JavaScript objects/arrays
- Canvas state managed through DOM API and Canvas 2D context
- Service information hardcoded in Jekyll include files
- Shared function promotes code reuse across three service cards
- Each instance maintains complete independence (no shared state)

