# Service Card Include Contract

**Component**: `_includes/governance_graph.html`, `_includes/community_graph.html`, `_includes/ai_graph.html`  
**Type**: Jekyll Liquid Include Interface  
**Version**: 1.0

## Overview

This contract defines the Jekyll Liquid include interface for the three interactive service card components. Each include renders a service card with an interactive network graph canvas, service title, and description.

## Include Syntax

### Governance Innovation Card

```liquid
{% include governance_graph.html %}
```

### Open-Source Community Building Card

```liquid
{% include community_graph.html %}
```

### AI & Blockchain Strategy Card

```liquid
{% include ai_graph.html %}
```

**Note**: These includes do not accept parameters. Service-specific content (title, description, color) is hardcoded in each include file.

## Output HTML Structure

Each include must output the following HTML structure:

```html
<div class="service-card">
  <canvas id="canvas-{service}-{unique-id}" class="network-canvas"></canvas>
  <h3 class="service-title">{Service Title}</h3>
  <p class="service-description">{Service Description}</p>
</div>
```

### Structure Details

- **service-card** (div): Wrapper element with consistent styling (background, border radius, padding, shadow)
- **network-canvas** (canvas): HTML5 Canvas element for network graph animation. Must have unique ID per instance.
- **service-title** (h3): Service title text. Displayed prominently below canvas.
- **service-description** (p): Service description text. Displayed below title.

### Canvas ID Format

Canvas ID must follow format: `canvas-{service}-{unique-id}`

- **service**: Service identifier (`governance`, `community`, or `ai`)
- **unique-id**: Unique identifier to prevent conflicts when multiple instances on same page (e.g., timestamp, counter, or random)

**Examples**:
- `canvas-governance-1`
- `canvas-community-1703123456789`
- `canvas-ai-{{ forloop.index }}`

## Service-Specific Content

### Governance Innovation Card

- **Canvas ID prefix**: `canvas-governance-`
- **Color**: Teal-green (#6ee7b7)
- **Title**: "Governance Innovation"
- **Description**: Text describing decentralized decision-making and governance processes

### Open-Source Community Building Card

- **Canvas ID prefix**: `canvas-community-`
- **Color**: Blue (#60a5fa)
- **Title**: "Open-Source Community Building"
- **Description**: Text describing community engagement and open-source initiatives

### AI & Blockchain Strategy Card

- **Canvas ID prefix**: `canvas-ai-`
- **Color**: Purple (#a78bfa)
- **Title**: "AI & Blockchain Strategy"
- **Description**: Text describing technological innovation in AI and blockchain

## JavaScript Initialization

Each include must include the shared network graph function and initialize it:

```html
{% include network_graph.js %}

<script>
(function() {
  'use strict';
  
  function initServiceCard() {
    const canvasId = 'canvas-{service}-{unique-id}';
    const nodeCount = 20;
    const color = '{service-color}'; // #6ee7b7, #60a5fa, or #a78bfa
    
    // Wait for DOM ready
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

## Progressive Enhancement

### Canvas Support Detection

The include must handle browsers without Canvas support gracefully:

```html
<canvas id="canvas-{service}-{unique-id}" class="network-canvas">
  <!-- Fallback content (optional) -->
</canvas>
```

If Canvas is unsupported:
- Canvas element may not render, but service card structure remains
- Service title and description are still visible
- No errors should be thrown

### JavaScript Disabled

If JavaScript is disabled:
- Canvas element exists but animation does not start
- Service title and description are still visible
- No errors should be thrown
- Card displays with static content (progressive enhancement)

## CSS Requirements

Each include must include inline CSS for styling (see `css-styling-contract.md` for details):

```html
<style>
.service-card { /* ... */ }
.network-canvas { /* ... */ }
.service-title { /* ... */ }
.service-description { /* ... */ }
</style>
```

## Usage Examples

### Single Card on Page

```liquid
{% include governance_graph.html %}
```

### Multiple Cards on Same Page

```liquid
{% include governance_graph.html %}
{% include community_graph.html %}
{% include ai_graph.html %}
```

### Multiple Instances of Same Card

```liquid
{% for item in site.data.services %}
  {% include governance_graph.html %}
{% endfor %}
```

**Note**: Each instance must have unique canvas ID to prevent conflicts.

## Validation Rules

- Canvas ID must be unique per instance (prevents conflicts)
- Canvas ID must follow format: `canvas-{service}-{unique-id}`
- Service title and description must be present (non-empty)
- Include must include shared network graph function (`network_graph.js`)
- Include must initialize animation after DOM ready
- Include must handle progressive enhancement (Canvas/JS fallback)
- CSS must be inline within include (no external stylesheets)

## Error Handling

- If canvas element not found: Function should handle gracefully (no errors thrown)
- If Canvas API not supported: Animation should not start, card should display static content
- If JavaScript disabled: Card should display static content, no errors in console
- If multiple instances with same canvas ID: Only first instance will work (must ensure unique IDs)

## Related Contracts

- **Network Graph Function API**: See `network-graph-function-api.md` for function interface
- **CSS Styling**: See `css-styling-contract.md` for styling requirements

