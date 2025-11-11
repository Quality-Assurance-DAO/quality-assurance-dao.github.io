# Tabs Include Contract

**Component**: `_includes/tabs.html`  
**Type**: Jekyll Liquid Include Snippet  
**Version**: 1.0

## Overview

This contract defines the interface for using the reusable tabs include component in Jekyll pages and layouts.

## Include Syntax

### Basic Usage

```liquid
{% include tabs.html %}
```

### Parameters

Currently, no parameters are supported. The component automatically reads from `site.data.tabs`.

**Future Extensibility**: Parameters may be added in future versions:
- `data_source`: Custom data source (default: `site.data.tabs`)
- `default_tab`: Tab ID to show as active by default (default: first tab)
- `class`: Additional CSS classes for container

## Data Source

The component reads tab data from `_data/tabs.yml` via `site.data.tabs`.

**Required**: `_data/tabs.yml` must exist and contain a YAML array of tab objects.

**Schema**: See `tabs-data-schema.json` for complete schema definition.

## Output Structure

The include generates the following HTML structure:

```html
<div class="tabs-container" role="region" aria-label="Tabbed content">
  <div class="tabs-nav" role="tablist" aria-label="Tabs">
    <button 
      class="tab-button active" 
      role="tab" 
      id="tab-{id}" 
      aria-selected="true" 
      aria-controls="tabpanel-{id}"
      tabindex="0">
      {name}
    </button>
    <!-- Additional tab buttons -->
  </div>
  
  <div class="tabs-content">
    <div 
      class="tab-panel active" 
      role="tabpanel" 
      id="tabpanel-{id}" 
      aria-labelledby="tab-{id}"
      tabindex="0">
      {description}
    </div>
    <!-- Additional tab panels -->
  </div>
</div>
```

## Dependencies

### Required Files

1. **Include File**: `_includes/tabs.html` (the component itself)
2. **Data File**: `_data/tabs.yml` (tab data source)
3. **CSS**: Tab styles must be present in `assets/css/main.css`
4. **JavaScript**: Tab switching functionality (inline in include or `assets/js/tabs.js`)

### CSS Classes

The component uses the following CSS classes (see `tabs-css-contract.md` for details):
- `.tabs-container`
- `.tabs-nav`
- `.tab-button`
- `.tab-button.active`
- `.tabs-content`
- `.tab-panel`
- `.tab-panel.active`

### JavaScript Requirements

- Vanilla JavaScript (ES5+ compatible)
- No external dependencies
- Must handle click events on `.tab-button` elements
- Must manage `.active` class state
- Must update ARIA attributes (`aria-selected`)

## Behavior

### Initial State

- First tab in `site.data.tabs` array is active by default
- Only active tab's content is visible
- Active tab button has `.active` class and `aria-selected="true"`

### User Interaction

- Clicking a tab button switches active state
- Only one tab can be active at a time
- Transitions are smooth (CSS transitions, <300ms)
- ARIA attributes update automatically

### Progressive Enhancement

- **JavaScript Enabled**: Single active tab visible, switching works
- **JavaScript Disabled**: All tab content visible (stacked vertically)

## Error Handling

### Missing Data File

If `_data/tabs.yml` doesn't exist or is empty:
- Component renders nothing (empty output)
- No error message displayed (fails silently)
- Page continues to function normally

### Invalid Data

If data structure is invalid:
- Component attempts to render valid tabs
- Invalid tabs are skipped
- No error message displayed

### Missing Required Fields

If a tab is missing required fields (`id`, `name`, `description`):
- Tab is skipped during rendering
- Warning may be logged to console (development only)

## Examples

### Example 1: Basic Usage in Page

```markdown
---
layout: default
title: My Page
---

# My Page

{% include tabs.html %}

More content below tabs...
```

### Example 2: Usage in Layout

```liquid
<!-- _layouts/default.html -->
<main>
  <section id="content">
    {{ content }}
  </section>
  
  <section id="tabs">
    {% include tabs.html %}
  </section>
</main>
```

## Versioning

- **v1.0**: Initial implementation
  - Basic tab switching
  - ARIA support
  - Responsive design
  - Progressive enhancement

## Breaking Changes

None (initial version).

## Future Enhancements

Potential future parameters:
- `data_source`: Custom data source
- `default_tab`: Default active tab
- `class`: Additional CSS classes
- `id`: Container ID for multiple tab instances

