feat: Add animated header background component with graph network animation

Implement a reusable animated header background component for Jekyll that
displays an HTML5 Canvas-based graph network animation with nodes, connections,
and gradient background. The component is fully responsive, accessible, and
includes progressive enhancement for graceful degradation.

## Features

- **Animated Graph Network**: 15-25 nodes with smooth movement and distance-based
  connections creating dynamic network patterns
- **Gradient Background**: Canvas gradient with CSS fallback for progressive
  enhancement
- **Responsive Design**: Adapts to mobile (150px), tablet (175px), and desktop
  (200px) screen sizes with media queries
- **Progressive Enhancement**: Graceful fallback to static gradient when Canvas
  API or JavaScript is unavailable
- **Performance Optimized**: Uses requestAnimationFrame for smooth 30fps+ animation,
  automatically pauses when tab is in background
- **Self-Contained**: All CSS and JavaScript inline within include file, no
  external dependencies
- **Accessibility**: Proper ARIA attributes, WCAG AA contrast compliance, supports
  multiple instances with unique IDs
- **Security**: Title parameter safely escaped to prevent XSS vulnerabilities

## Implementation

- Created `_includes/animated-header.html` with complete animation system
- Integrated into `_layouts/default.html` with "QADAO" title
- All 45 implementation tasks completed across 6 phases:
  - Phase 1: Setup (2 tasks)
  - Phase 2: Foundational (5 tasks)
  - Phase 3: User Story 1 - Core Animation (11 tasks)
  - Phase 4: User Story 2 - Responsive Resizing (7 tasks)
  - Phase 5: User Story 3 - Performance & Integration (7 tasks)
  - Phase 6: Polish & Cross-Cutting Concerns (13 tasks)

## Documentation

Complete specification documentation added:
- `specs/006-animated-header-background/spec.md` - Feature specification
- `specs/006-animated-header-background/plan.md` - Implementation plan
- `specs/006-animated-header-background/research.md` - Technical decisions
- `specs/006-animated-header-background/data-model.md` - Data model
- `specs/006-animated-header-background/quickstart.md` - Usage guide
- `specs/006-animated-header-background/contracts/` - API contracts
- `specs/006-animated-header-background/tasks.md` - Task breakdown (all completed)
- `specs/006-animated-header-background/checklists/requirements.md` - Quality checklist

## Usage

```liquid
{% include animated-header.html title="Page Title" %}
```

Or without title:
```liquid
{% include animated-header.html %}
```

## Technical Details

- **Technology**: HTML5 Canvas API, vanilla JavaScript (ES5+), CSS3
- **Animation**: requestAnimationFrame for browser-optimized rendering
- **Node Movement**: Continuous movement with edge collision detection (bounce)
- **Connections**: Distance-based threshold algorithm (120px default)
- **Styling**: Subtle, low-opacity nodes and connections for professional aesthetic
- **Browser Support**: Modern browsers with Canvas support, graceful degradation
  for older browsers

## Testing

Component structured to support testing across:
- Mobile devices (320px-768px)
- Tablet devices (768px-1024px)
- Desktop devices (1024px-2560px)
- JavaScript disabled scenarios
- Canvas unsupported scenarios
- Multiple instances on same page

Closes #006-animated-header-background

