# Research: Interactive Network Graph Includes

**Feature**: 007-network-graph-includes  
**Date**: 2024-12-19  
**Status**: Complete

## Overview

This document consolidates research findings and technical decisions for implementing three interactive service card Jekyll includes with dynamic network graphs. All technical clarifications from the feature specification have been resolved through research and best practices analysis.

## Technical Decisions

### 1. Proportional Mouse Repulsion Algorithm

**Decision**: Implement proportional repulsion force where nodes within 100px of cursor are repelled with force inversely proportional to distance, with maximum strength cap to prevent visual glitches.

**Rationale**: 
- Proportional repulsion creates natural, smooth interaction (nodes closer to cursor repel more strongly)
- Maximum strength cap prevents nodes from being launched too far or causing erratic movement
- Distance-based force calculation: `force = maxForce * (1 - distance / maxDistance)` where maxDistance = 100px
- Meets FR-008 requirement for proportional repulsion with maximum strength cap
- Creates engaging, responsive user interaction without visual artifacts

**Implementation Approach**:
- Calculate distance from cursor to each node: `distance = Math.sqrt((mouseX - node.x)² + (mouseY - node.y)²)`
- If distance < 100px, calculate repulsion force: `force = maxForce * (1 - distance / 100)`
- Apply force as velocity adjustment: `node.vx += forceX * deltaTime`, `node.vy += forceY * deltaTime`
- Cap maximum force to prevent excessive velocity (e.g., maxForce = 2.0 pixels per frame)
- Normalize direction vector: `forceX = (node.x - mouseX) / distance * force`, `forceY = (node.y - mouseY) / distance * force`

**Alternatives Considered**:
- Constant repulsion force: Rejected because creates unnatural, uniform movement regardless of distance
- Exponential repulsion: Rejected because may cause too strong repulsion at close distances, harder to tune
- No maximum cap: Rejected because can cause nodes to be launched too far, creating visual glitches

**References**:
- [MDN: Canvas Mouse Interaction](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations)
- [Physics-based Animation Principles](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)

### 2. Random Node Initial Positioning

**Decision**: Initialize nodes with random positions distributed across entire canvas area using uniform random distribution.

**Rationale**:
- Random distribution creates organic, non-repetitive initial network patterns
- Uniform distribution ensures nodes are spread across entire canvas (not clustered)
- Meets FR-004 requirement for random initial positioning across entire canvas area
- Simple implementation: `x = Math.random() * canvas.width`, `y = Math.random() * canvas.height`
- Creates varied visual appearance on each page load

**Implementation Approach**:
- For each node: `node.x = Math.random() * canvas.width`, `node.y = Math.random() * canvas.height`
- Ensure nodes are not too close to edges (optional padding: 5-10px from edges)
- Random velocity initialization: `vx = (Math.random() - 0.5) * speedRange`, `vy = (Math.random() - 0.5) * speedRange`
- Speed range configurable (e.g., 0.5-2.0 pixels per frame as specified)

**Alternatives Considered**:
- Grid-based positioning: Rejected because creates rigid, predictable patterns, less organic
- Clustered positioning: Rejected because doesn't utilize full canvas area, less visually interesting
- Fixed positions: Rejected because creates static, repetitive appearance

### 3. Variable Speed Configuration

**Decision**: Implement configurable speed range (e.g., 0.5-2.0 pixels per frame) with random velocity assignment per node within the range.

**Rationale**:
- Variable speeds create more dynamic, organic movement patterns
- Configurable range allows performance tuning (slower speeds = better performance, faster = more dynamic)
- Meets FR-004 requirement for variable speed with configurable range
- Each node can have different speed, creating varied movement
- Allows fine-tuning for performance optimization

**Implementation Approach**:
- Define speed range: `minSpeed = 0.5`, `maxSpeed = 2.0` (configurable)
- For each node: `speed = minSpeed + Math.random() * (maxSpeed - minSpeed)`
- Assign random direction: `angle = Math.random() * Math.PI * 2`
- Set velocity: `vx = speed * Math.cos(angle)`, `vy = speed * Math.sin(angle)`
- Speed can be adjusted globally for performance tuning

**Alternatives Considered**:
- Fixed speed for all nodes: Rejected because creates uniform, less dynamic movement
- Speed based on node position: Rejected because adds unnecessary complexity
- Speed based on time: Rejected because may cause performance issues, unnecessary variation

### 4. Canvas Resizing with Proportional Position Scaling

**Decision**: When canvas resizes, scale all node positions proportionally to maintain relative positions, then update canvas dimensions and continue animation.

**Rationale**:
- Proportional scaling maintains visual network structure during resize
- Prevents nodes from clustering or spreading unnaturally when canvas size changes
- Meets FR-029 requirement for maintaining relative positions when canvas resizes
- Creates smooth resize experience without visual jumps
- Maintains network graph appearance across different screen sizes

**Implementation Approach**:
- Store previous canvas dimensions: `oldWidth`, `oldHeight`
- On resize, calculate scale factors: `scaleX = newWidth / oldWidth`, `scaleY = newHeight / oldHeight`
- Scale all node positions: `node.x = node.x * scaleX`, `node.y = node.y * scaleY`
- Update canvas dimensions: `canvas.width = newWidth`, `canvas.height = newHeight`
- Update canvas element CSS size if needed
- Continue animation with new dimensions

**Alternatives Considered**:
- Reset node positions to random: Rejected because creates jarring visual jump, loses network structure
- Keep absolute positions (no scaling): Rejected because nodes may move outside canvas bounds or cluster unnaturally
- Wrap nodes to new bounds: Rejected because doesn't maintain relative positions, creates visual artifacts

**References**:
- [MDN: Canvas Scaling](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#scaling_for_high_resolution_displays)

### 5. Connection Line Color and Opacity with Distance-Based Fading

**Decision**: Use same color as nodes for connection lines with reduced base opacity (30-50%), and fade opacity based on distance from full base opacity at 0px to transparent at 120px threshold.

**Rationale**:
- Same color as nodes creates visual cohesion and unified appearance
- Reduced base opacity ensures connections don't overpower nodes
- Distance-based fading creates smooth visual transition, stronger connections appear more prominent
- Meets FR-027 requirement for same color with reduced opacity and distance-based fading
- Creates professional, subtle network graph appearance

**Implementation Approach**:
- Base opacity: `baseOpacity = 0.3` to `0.5` (30-50%, configurable)
- For each connection, calculate distance: `distance = Math.sqrt((x2-x1)² + (y2-y1)²)`
- Calculate fade opacity: `opacity = baseOpacity * (1 - distance / 120)`
- Clamp opacity: `opacity = Math.max(0, Math.min(baseOpacity, opacity))`
- Render line: `ctx.strokeStyle = rgba(r, g, b, opacity)`, `ctx.lineWidth = 1.5`
- Line color uses same RGB values as node color

**Alternatives Considered**:
- Fixed opacity for all connections: Rejected because doesn't create visual depth, less engaging
- Different color for connections: Rejected because creates visual disconnect, less cohesive
- No opacity fading: Rejected because doesn't meet requirement, less visually appealing

### 6. Shared JavaScript Function Architecture for Multiple Instances

**Decision**: Create reusable JavaScript function `createInteractiveNetwork(canvasId, nodeCount, color)` that can be instantiated multiple times for different canvas elements, with each instance maintaining independent state.

**Rationale**:
- Shared function promotes DRY principles and code reuse
- Meets FR-002, FR-017 requirements for shared JavaScript function with parameters
- Each instance maintains independent animation state (nodes, mouse position, animation loop)
- Reduces code duplication across three service cards
- Easier maintenance (single function to update for all cards)
- Supports multiple instances on same page (FR-024)

**Implementation Approach**:
- Function signature: `function createInteractiveNetwork(canvasId, nodeCount, color) { ... }`
- Each call creates closure with independent state: `{ canvas, ctx, nodes, mouseX, mouseY, animationId, ... }`
- Function returns control object (optional): `{ start(), stop(), destroy() }` for lifecycle management
- Canvas ID used to select DOM element: `const canvas = document.getElementById(canvasId)`
- Node count and color passed as parameters for customization
- Each instance has its own requestAnimationFrame loop

**Function Structure**:
```javascript
function createInteractiveNetwork(canvasId, nodeCount, color) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  let nodes = [];
  let mouseX = -1000, mouseY = -1000; // Off-canvas initially
  let animationId = null;
  
  // Initialization
  function init() { /* ... */ }
  
  // Animation loop
  function animate() { /* ... */ }
  
  // Event handlers
  function handleMouseMove(e) { /* ... */ }
  function handleMouseLeave() { /* ... */ }
  function handleResize() { /* ... */ }
  
  // Start animation
  init();
  return { /* control methods */ };
}
```

**Alternatives Considered**:
- Separate functions for each card: Rejected because violates DRY, creates code duplication, harder to maintain
- Class-based approach: Rejected because adds complexity, function-based is simpler for this use case
- Global state management: Rejected because creates coupling between instances, harder to manage multiple instances

**References**:
- [MDN: JavaScript Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [JavaScript Module Patterns](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

### 7. Performance Optimization for Three Simultaneous Animations

**Decision**: Implement multiple optimization strategies: efficient rendering algorithms, minimize calculations, use requestAnimationFrame, optimize distance calculations, and ensure each animation runs independently without blocking.

**Rationale**:
- Three simultaneous animations require careful performance optimization
- Meets FR-021, SC-002 requirements for minimum 30fps with three animations
- Performance optimizations ensure smooth user experience even with multiple animations
- Independent animation loops prevent blocking and ensure responsive page

**Optimization Strategies**:
1. **Efficient distance calculations**: Only calculate distances for node pairs (O(n²) but acceptable for 20 nodes = 190 calculations per frame per canvas)
2. **Early exit for mouse repulsion**: Only check nodes within reasonable distance of mouse (spatial optimization)
3. **Batch rendering operations**: Use `ctx.beginPath()` and batch stroke operations
4. **requestAnimationFrame**: Browser-optimized animation loop (automatic frame rate throttling when tab inactive)
5. **Minimize DOM queries**: Cache canvas element and context references
6. **Optimize node count**: 20 nodes per graph is optimal balance (fewer = less interesting, more = performance impact)
7. **Independent animation loops**: Each canvas has its own requestAnimationFrame, preventing blocking
8. **Efficient clearing**: Use `ctx.clearRect()` for full canvas clear (faster than redrawing background)

**Performance Targets**:
- Minimum 30fps frame rate for all three animations simultaneously
- Page load time increase < 500ms (SC-009)
- No noticeable lag during interaction (SC-002)
- Animation starts within 1 second of page load (SC-001)

**Alternatives Considered**:
- Reduce node count below 20: Rejected because animation becomes less visually interesting
- Increase node count above 20: Rejected because may impact performance on lower-end devices
- Shared animation loop: Rejected because creates coupling, harder to manage, may cause blocking
- Web Workers for calculations: Rejected because Canvas rendering must be on main thread, Workers can't access Canvas

**References**:
- [MDN: Optimizing Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas)
- [Google: Canvas Performance](https://developers.google.com/web/fundamentals/performance/rendering/optimize-javascript-execution)

### 8. Service Card Styling and Layout

**Decision**: Implement consistent card wrapper styling with background color, border radius, padding, shadow, and proper typography hierarchy with canvas as focal point.

**Rationale**:
- Consistent styling ensures professional appearance and visual cohesion
- Meets FR-013, FR-014, FR-015 requirements for card styling
- Proper visual hierarchy guides user attention to network graph
- Card wrapper creates clear visual boundaries and structure

**Implementation Approach**:
- Card wrapper: `background-color`, `border-radius: 8-12px`, `padding: 1.5-2rem`, `box-shadow: 0 2px 8px rgba(0,0,0,0.1)`
- Canvas styling: `background-color: #1a1a1a` (dark), `border-radius: 4-6px`, `width: 100%`, `height: 180px`
- Service title: Prominent typography (font-size: 1.5-2rem, font-weight: 600-700), margin-top: 1rem
- Service description: Readable text (font-size: 1rem, line-height: 1.6), margin-top: 0.5rem, color: muted
- Canvas cursor: `cursor: crosshair` to indicate interactivity (FR-016)
- Responsive spacing: Adjust padding and margins for mobile devices

**Alternatives Considered**:
- No card wrapper: Rejected because lacks visual structure, less professional appearance
- Complex card design: Rejected because may distract from network graph, violates minimal aesthetic
- Different styling per card: Rejected because creates inconsistency, harder to maintain

### 9. Progressive Enhancement Strategy

**Decision**: Implement graceful degradation: display static service cards with title and description when Canvas is unsupported or JavaScript is disabled, hiding canvas element.

**Rationale**:
- Ensures content remains accessible when Canvas API unavailable (older browsers, accessibility tools)
- Ensures service cards display when JavaScript disabled (progressive enhancement principle)
- Meets FR-019, FR-020 requirements for graceful handling
- Maintains content accessibility (service information still visible)

**Implementation Approach**:
- Default HTML: Service card with title and description (no canvas, CSS-only styling)
- JavaScript enhancement: Create canvas element, initialize animation
- Feature detection: `if (canvas.getContext) { /* initialize animation */ }`
- Fallback: If Canvas unavailable or JavaScript disabled, canvas element hidden or not created, card displays with text content only
- Service information always visible (works with or without animation)

**Alternatives Considered**:
- No fallback (Canvas required): Rejected because violates accessibility and progressive enhancement principles
- Server-side detection: Rejected because Jekyll static generation can't detect client capabilities
- Polyfill for Canvas: Rejected because adds external dependency, violates self-contained requirement

**References**:
- [MDN: Progressive Enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)
- [Can I Use: Canvas](https://caniuse.com/canvas)

### 10. Shared Script Include Pattern

**Decision**: Use Jekyll include syntax to include shared JavaScript function once per page, then call function multiple times from individual card includes.

**Rationale**:
- Meets FR-002, FR-017 requirements for shared JavaScript include file
- Ensures function is loaded once and reused (SC-004)
- Follows Jekyll best practices for code organization
- Maintains self-contained includes while sharing common code

**Implementation Approach**:
- Create `_includes/network_graph.js` with `createInteractiveNetwork()` function
- In page layout or before service cards: `{% include network_graph.js %}`
- In each card include: Call `createInteractiveNetwork(canvasId, nodeCount, color)` after DOM ready
- Function must be available globally or in shared scope
- Each card include generates unique canvas ID: `canvas-governance-{{ include.id | default: 1 }}`

**Alternatives Considered**:
- Inline JavaScript in each card: Rejected because violates DRY, creates code duplication
- External JavaScript file: Rejected because violates self-contained requirement, adds HTTP request
- Jekyll asset pipeline: Rejected because adds complexity, include pattern is simpler

## Summary

All technical decisions have been made based on best practices, performance considerations, and feature requirements. The implementation will use:

- **Proportional mouse repulsion** with distance-based force and maximum cap
- **Random node positioning** across entire canvas area
- **Variable speed configuration** with configurable range (0.5-2.0 pixels per frame)
- **Proportional position scaling** on canvas resize
- **Distance-based opacity fading** for connection lines (30-50% base opacity, fade to transparent at 120px)
- **Shared JavaScript function** (`createInteractiveNetwork`) for code reuse
- **Performance optimizations** for three simultaneous animations (minimum 30fps)
- **Progressive enhancement** with Canvas/JS fallback
- **Consistent card styling** with proper visual hierarchy
- **Jekyll include pattern** for shared script inclusion

The research phase is complete. All technical clarifications have been resolved. Ready to proceed to Phase 1 design artifacts.

