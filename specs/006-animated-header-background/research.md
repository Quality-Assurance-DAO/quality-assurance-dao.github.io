# Research: Animated Header Background

**Feature**: 006-animated-header-background  
**Date**: 2024-12-19  
**Status**: Complete

## Overview

This document consolidates research findings and technical decisions for implementing a reusable animated header background component in Jekyll using HTML5 Canvas. All technical clarifications from the feature specification have been resolved through research and best practices analysis.

## Technical Decisions

### 1. HTML5 Canvas Animation Architecture

**Decision**: Use requestAnimationFrame API for smooth, browser-optimized animation loop with automatic frame rate throttling when tab is in background.

**Rationale**: 
- requestAnimationFrame is the standard browser API for smooth animations, automatically syncing with display refresh rate (typically 60fps)
- Browser automatically pauses or throttles animation when tab is inactive, conserving resources (meets FR-019 requirement)
- Provides better performance than setInterval/setTimeout by allowing browser to optimize rendering
- Works across all modern browsers (IE10+, all modern browsers)
- Ensures smooth animation without jank or stuttering

**Alternatives Considered**:
- setInterval: Rejected because doesn't sync with display refresh rate, causes jank, doesn't pause when tab inactive
- setTimeout with recursive calls: Rejected for same reasons as setInterval, plus more complex code
- Web Workers: Rejected because Canvas rendering must occur on main thread, Workers can't access DOM/Canvas

**References**:
- [MDN: Window.requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [HTML5 Canvas Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas)

### 2. Graph Network Node Movement Algorithm

**Decision**: Implement continuous movement with random velocity vectors and edge collision detection (bounce on canvas edges by reversing velocity component).

**Rationale**:
- Random velocity vectors create organic, non-repetitive movement patterns
- Edge collision with bounce (reverse velocity) keeps nodes within canvas bounds naturally
- Continuous movement (no stopping) maintains dynamic animation feel
- Simple physics model (velocity + position update) is performant and easy to implement
- Meets FR-002 requirement for smooth continuous movement with bouncing

**Implementation Approach**:
- Each node has: `{ x, y, vx, vy }` (position and velocity)
- Each frame: `x += vx * deltaTime`, `y += vy * deltaTime`
- Edge collision: if `x < 0 || x > width`, reverse `vx`; if `y < 0 || y > height`, reverse `vy`
- Velocity magnitude determines speed (adjustable for performance tuning)

**Alternatives Considered**:
- Wrap-around (teleport to opposite edge): Rejected because creates jarring visual jumps, less natural
- Stop at edges: Rejected because violates continuous movement requirement
- Complex physics (gravity, friction): Rejected because adds unnecessary complexity, may impact performance

### 3. Distance-Based Connection Algorithm

**Decision**: Calculate Euclidean distance between all node pairs each frame, draw connection line if distance is within threshold (typically 100-150px).

**Rationale**:
- Distance-based connections create natural network graph patterns
- Threshold distance creates visual clusters and network structures
- Simple algorithm: `distance = sqrt((x2-x1)² + (y2-y1)²)`
- Meets FR-003 requirement for distance-based connection rules
- Performance acceptable for 15-25 nodes (225-625 distance calculations per frame, manageable)

**Implementation Approach**:
- For each frame, iterate through all node pairs: `for (i = 0; i < nodes.length; i++) { for (j = i+1; j < nodes.length; j++) { ... } }`
- Calculate distance: `Math.sqrt(Math.pow(nodes[j].x - nodes[i].x, 2) + Math.pow(nodes[j].y - nodes[i].y, 2))`
- If distance < threshold, draw line between nodes[i] and nodes[j]
- Use low opacity (20-30%) and thin stroke (1-2px) for subtle appearance

**Alternatives Considered**:
- Fixed connections (predefined pairs): Rejected because doesn't create dynamic network effect
- Grid-based connections: Rejected because creates rigid, unnatural patterns
- Force-directed graph algorithms: Rejected because too complex, may impact performance, not needed for simple animation

### 4. Canvas Resizing Strategy

**Decision**: Use window resize event listener to update canvas width/height and redraw animation, maintaining aspect ratio and node positions relative to canvas size.

**Rationale**:
- Responsive design requires canvas to adapt to container/viewport size
- Window resize event is standard approach for responsive canvas
- Must update both canvas element size and internal drawing buffer size
- Meets FR-008, FR-009, FR-010 requirements for responsive resizing

**Implementation Approach**:
- Listen for `window.addEventListener('resize', handleResize)`
- On resize: `canvas.width = container.offsetWidth`, `canvas.height = fixedHeight` (150-200px)
- Optionally adjust node positions proportionally if needed (or let them naturally redistribute)
- Redraw immediately after resize to prevent blank canvas

**Alternatives Considered**:
- CSS-only resizing: Rejected because canvas internal buffer size must match display size to prevent blurriness
- Fixed canvas size: Rejected because violates responsive design requirements
- Media queries for different sizes: Rejected because JavaScript resize is more flexible and handles all breakpoints

**References**:
- [MDN: Canvas Tutorial - Scaling](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#scaling_for_high_resolution_displays)

### 5. Progressive Enhancement Strategy

**Decision**: Implement graceful degradation: display static header with gradient background when Canvas is unsupported or JavaScript is disabled.

**Rationale**:
- Ensures content remains accessible when Canvas API unavailable (older browsers, accessibility tools)
- Ensures header displays when JavaScript disabled (progressive enhancement principle)
- Meets FR-015, FR-016 requirements for graceful handling
- Maintains visual consistency (gradient background still visible)

**Implementation Approach**:
- Default HTML: `<header>` with gradient background (CSS-only, no Canvas)
- JavaScript enhancement: Create canvas element, initialize animation
- Feature detection: `if (canvas.getContext) { /* initialize animation */ }`
- Fallback: If Canvas unavailable or JavaScript disabled, header displays with gradient only (no animation)
- Title text always visible (works with or without animation)

**Alternatives Considered**:
- No fallback (Canvas required): Rejected because violates accessibility and progressive enhancement principles
- Server-side detection: Rejected because Jekyll static generation can't detect client capabilities
- Polyfill for Canvas: Rejected because adds external dependency, violates self-contained requirement

**References**:
- [MDN: Progressive Enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)
- [Can I Use: Canvas](https://caniuse.com/canvas)

### 6. Performance Optimization Techniques

**Decision**: Implement multiple optimization strategies: efficient rendering (clear + redraw pattern), minimize calculations, use requestAnimationFrame, avoid unnecessary redraws.

**Rationale**:
- Canvas animation performance is critical for smooth user experience
- Meets FR-017 requirement for minimum 30fps frame rate
- Optimizations ensure animation runs smoothly on standard devices
- Lightweight implementation suitable for portfolio/documentation sites

**Optimization Strategies**:
1. **Clear and redraw pattern**: `ctx.clearRect(0, 0, width, height)` then redraw all elements each frame (standard canvas pattern)
2. **Minimize distance calculations**: Only calculate distances for node pairs, cache if possible (though 15-25 nodes is manageable)
3. **Efficient rendering**: Use `ctx.beginPath()` and `ctx.stroke()` for lines, batch drawing operations
4. **requestAnimationFrame**: Use browser-optimized animation loop (already decided)
5. **Avoid unnecessary operations**: Don't recalculate static values, minimize DOM queries
6. **Optimize node count**: 15-25 nodes is optimal balance (fewer = less interesting, more = performance impact)

**Alternatives Considered**:
- Offscreen canvas for complex operations: Rejected because adds complexity, not needed for simple graph network
- WebGL instead of 2D Canvas: Rejected because overkill for simple 2D animation, adds complexity, may have compatibility issues
- Reduce node count below 15: Rejected because animation becomes less visually interesting
- Increase node count above 25: Rejected because may impact performance on lower-end devices

**References**:
- [MDN: Optimizing Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas)
- [Google: Canvas Performance](https://developers.google.com/web/fundamentals/performance/rendering/optimize-javascript-execution)

### 7. Gradient Background Implementation

**Decision**: Use Canvas `createLinearGradient()` or CSS gradient background as fallback, with subtle color transitions suitable for professional sites.

**Rationale**:
- Gradient provides visual depth and complements animated graph network
- Canvas gradient allows integration with animation rendering
- CSS gradient provides fallback when Canvas unavailable
- Meets FR-004 requirement for gradient background
- Professional aesthetic requires subtle, non-distracting colors

**Implementation Approach**:
- Canvas gradient: `const gradient = ctx.createLinearGradient(0, 0, 0, height); gradient.addColorStop(0, '#color1'); gradient.addColorStop(1, '#color2'); ctx.fillStyle = gradient; ctx.fillRect(0, 0, width, height);`
- CSS fallback: `background: linear-gradient(to bottom, #color1, #color2);` on header element
- Color selection: Use subtle, muted colors (e.g., dark blue to darker blue, or light gray to slightly darker gray) that complement site design
- Ensure gradient doesn't compete with animated nodes for attention

**Alternatives Considered**:
- Solid color background: Rejected because doesn't provide visual depth, less engaging
- Radial gradient: Rejected because linear gradient is more suitable for header (horizontal band)
- Complex multi-stop gradients: Rejected because may be distracting, simple 2-color gradient is more professional

### 8. Title Parameter Security (XSS Prevention)

**Decision**: Use Jekyll's `escape` or `strip_html` filters to sanitize title parameter before rendering, or use textContent for safe DOM insertion.

**Rationale**:
- Title parameter comes from user-controlled Jekyll include syntax
- Must prevent XSS (Cross-Site Scripting) vulnerabilities
- Meets FR-020 requirement for safe escaping
- Security best practice for user-provided content

**Implementation Approach**:
- Jekyll Liquid: `{{ include.title | escape }}` or `{{ include.title | strip_html }}`
- If rendering in JavaScript: Use `textContent` instead of `innerHTML` for safe text insertion
- Never use `innerHTML` with user-provided content without sanitization
- Consider HTML entity encoding for special characters

**Alternatives Considered**:
- No sanitization: Rejected because creates XSS vulnerability
- Complex HTML sanitization library: Rejected because adds external dependency, violates self-contained requirement
- Allow HTML in title: Rejected because unnecessary complexity, security risk, plain text is sufficient

**References**:
- [OWASP: XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Jekyll: Liquid Filters](https://jekyllrb.com/docs/liquid/filters/)

### 9. Self-Contained Implementation (Inline CSS/JS)

**Decision**: Include all CSS and JavaScript inline within the Jekyll include file, using `<style>` and `<script>` tags.

**Rationale**:
- Meets FR-011, FR-012, FR-013 requirements for self-contained implementation
- No external dependencies required (GitHub Pages compatible)
- Single file deployment (easier maintenance)
- Faster page load (no additional HTTP requests)

**Implementation Approach**:
- CSS: `<style>/* header styles */</style>` within include file
- JavaScript: `<script>/* animation code */</script>` within include file
- Use IIFE (Immediately Invoked Function Expression) for JavaScript to avoid global scope pollution: `(function() { /* code */ })();`
- Use scoped CSS or specific class names to avoid style conflicts

**Alternatives Considered**:
- External CSS/JS files: Rejected because violates self-contained requirement, adds HTTP requests
- CDN dependencies: Rejected because violates no external dependencies requirement, may have network issues
- Jekyll asset pipeline: Rejected because adds complexity, inline is simpler for single component

### 10. Node and Connection Visual Styling

**Decision**: Use subtle, low-opacity styling: nodes as small circles (2-3px radius), connections as thin lines (1-2px stroke, 20-30% opacity) with muted colors.

**Rationale**:
- Professional, minimal aesthetic requires subtle visual elements
- Low opacity ensures animation doesn't distract from content
- Meets FR-022, FR-023 requirements for professional minimal aesthetic
- Thin lines and small nodes create delicate, elegant appearance

**Implementation Approach**:
- Nodes: `ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'; ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();`
- Connections: `ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();`
- Color selection: Use white/light colors on dark background, or dark colors on light background (depending on site theme)
- Adjust opacity and colors to match site design while maintaining subtlety

**Alternatives Considered**:
- High opacity/bright colors: Rejected because too distracting, violates minimal aesthetic requirement
- Large nodes/thick lines: Rejected because too prominent, competes with content
- Animated colors: Rejected because adds complexity, may be distracting

## Summary

All technical decisions have been made based on best practices, performance considerations, and feature requirements. The implementation will use:

- **requestAnimationFrame** for smooth animation
- **Distance-based connections** with threshold algorithm
- **Edge collision with bounce** for node movement
- **Progressive enhancement** with Canvas/JS fallback
- **Inline CSS/JavaScript** for self-contained implementation
- **Performance optimizations** for 30fps minimum frame rate
- **XSS prevention** for title parameter security
- **Subtle visual styling** for professional aesthetic

The research phase is complete. All technical clarifications have been resolved. Ready to proceed to Phase 1 design artifacts.

