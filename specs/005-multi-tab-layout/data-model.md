# Data Model: Multi-Tab Interface Layout

**Feature**: 005-multi-tab-layout  
**Date**: 2024-12-19

## Overview

This document defines the data model for the multi-tab interface component. The component uses YAML data files following the standardized schema pattern used across all site data files.

## Entities

### Tab

Represents a single tab in the multi-tab interface. Each tab has an active/inactive state that determines visibility and styling.

**Data Source**: `_data/tabs.yml` (YAML array)

**Schema**:

```yaml
- id: string              # Required: URL-safe slug, must be unique across all tabs
  name: string            # Required: Display title shown in tab navigation bar
  description: string     # Required: Content displayed when tab is active (supports markdown/HTML)
  url: string            # Optional: External URL (available for future use)
  logo: string           # Optional: Path to logo image (available for future use)
  tags: array            # Optional: Array of tag strings (available for future use)
  status: string         # Optional: Status indicator (e.g., "active", "draft") (available for future use)
  featured: boolean      # Optional: Featured flag (available for future use)
  category: string      # Optional: Category classification (available for future use)
  repo: string          # Optional: Repository URL (available for future use)
  contact: string       # Optional: Contact information (available for future use)
  year: number         # Optional: Year field (available for future use)
```

**Field Descriptions**:

- **id** (required): Unique identifier for the tab. Must be URL-safe (lowercase, hyphens, no spaces). Used for:
  - ARIA `id` attributes (`tab-{id}`, `tabpanel-{id}`)
  - CSS class names for styling
  - JavaScript element selection
  - Validation (duplicate detection)

- **name** (required): Human-readable title displayed in the tab navigation bar. Used as:
  - Tab button text
  - ARIA label for tab button
  - Visible tab title

- **description** (required): Content displayed in the tab panel when the tab is active. Supports:
  - Markdown formatting (processed by Jekyll)
  - Raw HTML (when markdown insufficient)
  - Multi-line content
  - Empty string (handled gracefully with placeholder)

**Optional Fields**: All optional fields follow the standardized schema pattern used in `projects.yml`, `services.yml`, etc. These are available for future use or display but are not required for basic tab functionality.

**Example**:

```yaml
- id: overview
  name: Overview
  description: |
    This is the overview tab content.
    
    It supports **markdown** formatting and can include
    multiple paragraphs.
    
    - List items
    - More items

- id: features
  name: Features
  description: |
    <h3>Key Features</h3>
    <p>HTML content is also supported when needed.</p>

- id: contact
  name: Contact
  description: |
    Get in touch with us!
  url: https://example.com/contact
  tags: [support, contact]
  featured: true
```

## Relationships

### Tab Navigation Bar → Tabs (One-to-Many)

- One navigation bar contains multiple tab buttons
- Each tab button corresponds to one Tab entity
- Navigation bar displays tabs in the order they appear in the YAML array

### Tab → Tab Content Area (One-to-One)

- Each Tab entity has exactly one corresponding content area (tab panel)
- Tab panel visibility is controlled by the tab's active/inactive state
- Only one tab panel is visible at a time (when its corresponding tab is active)

### Tab State Management

- **Active State**: One tab is active at a time
  - Active tab button has `.active` CSS class
  - Active tab panel has `.active` CSS class and is visible
  - Active tab has `aria-selected="true"` attribute

- **Inactive State**: All other tabs are inactive
  - Inactive tab buttons do not have `.active` class
  - Inactive tab panels do not have `.active` class and are hidden
  - Inactive tabs have `aria-selected="false"` attribute

## Validation Rules

### Required Field Validation

1. **id**: Must be present and non-empty
   - Error handling: Skip tab if missing, log warning

2. **name**: Must be present and non-empty
   - Error handling: Skip tab if missing, log warning

3. **description**: Must be present (can be empty string)
   - Error handling: Display empty content area or placeholder if missing

### Uniqueness Validation

1. **id Uniqueness**: Tab IDs must be unique across all tabs in the array
   - Validation: Check for duplicate IDs during rendering
   - Error handling: 
     - Option 1: Skip duplicate tabs (use first occurrence)
     - Option 2: Display error message in console/UI
     - Option 3: Append suffix to duplicate IDs (`{id}-2`, `{id}-3`)

### Data Source Validation

1. **File Existence**: `_data/tabs.yml` must exist
   - Error handling: Don't render tab interface if file missing or empty
   - Display: Show empty state message or hide component entirely

2. **Array Structure**: Data must be a YAML array
   - Error handling: Validate structure, skip rendering if invalid

3. **Empty Array**: Handle case when array is empty
   - Error handling: Don't render tab interface, show empty state or hide component

## State Transitions

### Initial State (Page Load)

- First tab in array is active by default
- All other tabs are inactive
- Only first tab's content is visible

### Tab Switch (User Click)

1. **Before**: One tab active (e.g., Tab A)
2. **Action**: User clicks different tab (Tab B)
3. **Transition**:
   - Remove `.active` class from Tab A button and panel
   - Set `aria-selected="false"` on Tab A
   - Hide Tab A panel (CSS: `display: none` or `visibility: hidden`)
   - Add `.active` class to Tab B button and panel
   - Set `aria-selected="true"` on Tab B
   - Show Tab B panel
   - Update ARIA `aria-controls` and `aria-labelledby` relationships
4. **After**: Tab B is active, Tab A is inactive

### Edge Cases

- **Clicking Active Tab**: No state change (tab already active)
- **Rapid Clicks**: Each click processes sequentially, final state reflects last clicked tab
- **JavaScript Disabled**: All tabs visible (no state management, all content stacked)

## Data Access Patterns

### Liquid Templating

```liquid
{% if site.data.tabs %}
  {% for tab in site.data.tabs %}
    <!-- Access tab.id, tab.name, tab.description -->
  {% endfor %}
{% endif %}
```

### JavaScript Access

- Tabs are rendered as DOM elements with IDs: `tab-{id}`, `tabpanel-{id}`
- JavaScript selects elements using `querySelector` with these IDs
- State managed via CSS classes, not data attributes

## Integration with Existing Data Schema

The Tab entity follows the same standardized schema pattern used in:
- `_data/projects.yml`
- `_data/services.yml`
- `_data/gitbooks.yml`
- `_data/github-organisations.yml`

This ensures:
- Consistency across site data files
- Reusability of validation logic
- Familiar patterns for content editors
- Future extensibility with optional fields

