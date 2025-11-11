# Tabs CSS Contract

**Component**: Tab Interface Styling  
**Type**: CSS3 (with CSS Variables)  
**Version**: 1.0

## Overview

This contract defines the CSS class interface and styling requirements for the tabs component. Styles are added to the existing `assets/css/main.css` file.

## CSS Classes

### Container Classes

#### `.tabs-container`

**Purpose**: Main container for entire tab interface

**Properties**:
- Layout: Block-level container
- Spacing: Margin/padding as needed
- Responsive: Adapts to screen size

**Usage**:
```html
<div class="tabs-container">
  <!-- Tab navigation and content -->
</div>
```

#### `.tabs-nav`

**Purpose**: Container for tab buttons (navigation bar)

**Properties**:
- Layout: Horizontal flexbox or grid
- Direction: Row (horizontal)
- Alignment: Tab buttons aligned horizontally
- Responsive: May stack vertically on mobile

**Usage**:
```html
<div class="tabs-nav" role="tablist">
  <!-- Tab buttons -->
</div>
```

#### `.tabs-content`

**Purpose**: Container for tab panels (content area)

**Properties**:
- Layout: Block-level container
- Positioning: Below navigation bar
- Spacing: Padding for content

**Usage**:
```html
<div class="tabs-content">
  <!-- Tab panels -->
</div>
```

### Tab Button Classes

#### `.tab-button`

**Purpose**: Individual tab button in navigation bar

**Properties**:
- Display: Inline-block or flex item
- Styling: Base button appearance
- Interactive: Hover and focus states
- Accessibility: Minimum 44x44px touch target on mobile

**States**:
- Default: Inactive tab styling
- `.active`: Active tab styling (distinct visual appearance)
- `:hover`: Hover state (if supported)
- `:focus`: Focus state (keyboard navigation)

**Usage**:
```html
<button class="tab-button" role="tab">Tab Name</button>
<button class="tab-button active" role="tab">Active Tab</button>
```

#### `.tab-button.active`

**Purpose**: Active tab button styling

**Properties**:
- Visual distinction from inactive tabs
- Examples: Different color, underline, background, border
- Must be clearly distinguishable (WCAG AA contrast requirements)

### Tab Panel Classes

#### `.tab-panel`

**Purpose**: Individual tab content panel

**Properties**:
- Display: Hidden by default (`display: none` or `visibility: hidden`)
- Layout: Block-level content container
- Spacing: Padding for content readability

**States**:
- Default: Hidden (inactive)
- `.active`: Visible (active)

**Usage**:
```html
<div class="tab-panel" role="tabpanel">Content</div>
<div class="tab-panel active" role="tabpanel">Active Content</div>
```

#### `.tab-panel.active`

**Purpose**: Active tab panel styling

**Properties**:
- Display: Visible (`display: block` or `visibility: visible`)
- Transition: Smooth appearance (opacity, height, or display transition)

## CSS Variables

The component should use existing CSS variables from the site's design system:

### Color Variables

- `--primary`: Active tab color
- `--primary-light`: Hover state color
- `--text`: Tab text color
- `--border`: Tab border color
- `--bg`: Background color
- `--card-bg`: Panel background color

### Spacing Variables

- `--radius`: Border radius for tabs
- Existing spacing variables for padding/margins

### Typography Variables

- `--font-base`: Font family
- `--h3-size`: Tab title font size (or custom size)

## Responsive Design

### Desktop/Tablet (> 768px)

- Horizontal tab navigation
- Tabs displayed in a row
- Full width utilization

### Mobile (< 768px)

- Options:
  1. Horizontal scrollable tabs
  2. Vertical stacked tabs
  3. Dropdown/select menu
- Ensure touch targets are at least 44x44px
- Maintain readability and accessibility

### Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Transitions

### Tab Switching

**Property**: CSS transitions for smooth state changes

**Duration**: < 300ms (meets SC-005 success criteria)

**Properties to Transition**:
- Opacity (fade in/out)
- Visibility
- Transform (optional slide effects)
- Background color (for active state)

**Example**:
```css
.tab-panel {
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.tab-button {
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

## Accessibility Requirements

### Focus States

- Visible focus indicator on tab buttons
- Meets WCAG AA contrast requirements
- Outline or border highlight

### Touch Targets

- Minimum 44x44px on mobile devices
- Adequate spacing between tabs
- No overlapping interactive elements

### Color Contrast

- Active tab: Meets WCAG AA contrast (4.5:1 for normal text)
- Inactive tabs: Meets WCAG AA contrast
- Focus states: Meets WCAG AA contrast

## Progressive Enhancement

### JavaScript Disabled

**CSS Default State**:
- All `.tab-panel` elements visible (`display: block`)
- No `.active` class distinction needed
- Content stacked vertically
- Navigation bar may be hidden or styled differently

**Implementation**:
```css
/* Default: All panels visible */
.tab-panel {
  display: block;
}

/* JavaScript enhancement: Hide inactive panels */
.js-enabled .tab-panel:not(.active) {
  display: none;
}
```

## Integration with Existing Styles

The tabs component should integrate seamlessly with existing site styles:

- Use existing CSS variables
- Follow existing design patterns
- Match existing card/container styles
- Maintain consistent spacing and typography
- Support dark theme (via existing `[data-theme="dark"]` selectors)

## Example Implementation

```css
/* Tabs Container */
.tabs-container {
  margin: 2rem 0;
}

/* Tab Navigation */
.tabs-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  border-bottom: 2px solid var(--border);
  margin-bottom: 1.5rem;
}

/* Tab Button */
.tab-button {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  color: var(--text-muted);
  font-family: var(--font-base);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;
  min-height: 44px; /* Touch target */
}

.tab-button:hover {
  color: var(--primary);
}

.tab-button:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.tab-button.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
  font-weight: 600;
}

/* Tab Content */
.tabs-content {
  padding: 1.5rem 0;
}

/* Tab Panel */
.tab-panel {
  display: none;
}

.tab-panel.active {
  display: block;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Progressive Enhancement */
.js-enabled .tab-panel:not(.active) {
  display: none;
}

/* Responsive */
@media (max-width: 768px) {
  .tabs-nav {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  .tab-button {
    flex-shrink: 0;
    white-space: nowrap;
  }
}
```

## Versioning

- **v1.0**: Initial implementation
  - Basic tab styling
  - Responsive design
  - Transitions
  - Accessibility support

## Breaking Changes

None (initial version).

