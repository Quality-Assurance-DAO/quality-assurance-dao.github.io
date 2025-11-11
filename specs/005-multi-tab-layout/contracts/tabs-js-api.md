# Tabs JavaScript API Contract

**Component**: Tab Switching Functionality  
**Type**: Vanilla JavaScript (ES5+ compatible)  
**Version**: 1.0

## Overview

This contract defines the JavaScript interface for the tabs component. The implementation uses vanilla JavaScript with no external dependencies.

## DOM Structure

### Tab Buttons

- **Selector**: `.tab-button` within `.tabs-nav`
- **ID Format**: `tab-{id}` (where `{id}` is from YAML data)
- **Attributes**:
  - `role="tab"`
  - `aria-selected`: `"true"` (active) or `"false"` (inactive)
  - `aria-controls`: `"tabpanel-{id}"`
  - `id`: `"tab-{id}"`

### Tab Panels

- **Selector**: `.tab-panel` within `.tabs-content`
- **ID Format**: `tabpanel-{id}` (where `{id}` is from YAML data)
- **Attributes**:
  - `role="tabpanel"`
  - `aria-labelledby`: `"tab-{id}"`
  - `id`: `"tabpanel-{id}"`

## State Management

### Active State

- **CSS Class**: `.active` on both tab button and corresponding panel
- **ARIA Attribute**: `aria-selected="true"` on active tab button
- **Visibility**: Active panel is visible, inactive panels are hidden

### Inactive State

- **CSS Class**: No `.active` class
- **ARIA Attribute**: `aria-selected="false"` on inactive tab buttons
- **Visibility**: Inactive panels are hidden

## Event Handling

### Click Event

**Event**: `click` on `.tab-button` elements

**Handler Behavior**:
1. Prevent default action (if needed)
2. Get clicked tab's ID from button element
3. Remove `.active` class from all tab buttons and panels
4. Set `aria-selected="false"` on all tab buttons
5. Hide all tab panels
6. Add `.active` class to clicked tab button and corresponding panel
7. Set `aria-selected="true"` on clicked tab button
8. Show corresponding tab panel
9. Update ARIA relationships (`aria-controls`, `aria-labelledby`)

### Event Delegation

Implementation should use event delegation on `.tabs-nav` container:
- Attach single event listener to `.tabs-nav`
- Check if clicked element is `.tab-button`
- Process click if button, ignore otherwise

## API Functions (Internal)

### switchTab(tabId)

**Purpose**: Switch active tab programmatically

**Parameters**:
- `tabId` (string): ID of tab to activate (without `tab-` prefix)

**Behavior**:
- Validates tab exists
- Switches active state to specified tab
- Updates all ARIA attributes
- Triggers visual transition

**Returns**: `void`

**Example**:
```javascript
// Switch to tab with id "features"
switchTab('features');
```

### getActiveTab()

**Purpose**: Get currently active tab ID

**Returns**: `string | null` - Active tab ID (without `tab-` prefix) or `null` if no active tab

**Example**:
```javascript
const activeId = getActiveTab(); // Returns "overview" or null
```

### initializeTabs()

**Purpose**: Initialize tab interface on page load

**Behavior**:
- Sets first tab as active by default
- Attaches event listeners
- Ensures ARIA attributes are correct
- Handles edge cases (no tabs, single tab, etc.)

**Returns**: `void`

**Called**: Automatically on DOMContentLoaded

## Implementation Requirements

### Browser Compatibility

- **Minimum**: ES5+ compatible
- **Target Browsers**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Fallback**: IE11+ (with polyfills if needed)

### Performance

- **Event Delegation**: Use single event listener on container
- **DOM Queries**: Cache selectors where possible
- **Transitions**: Let CSS handle visual transitions (no JS animation)
- **No Blocking**: All operations should be synchronous and fast

### Error Handling

- **Missing Elements**: Gracefully handle missing tab buttons or panels
- **Invalid IDs**: Skip tabs with invalid or missing IDs
- **Duplicate IDs**: Handle gracefully (use first occurrence)

## Code Structure

### Recommended Implementation

```javascript
(function() {
  'use strict';
  
  function initializeTabs() {
    const tabsNav = document.querySelector('.tabs-nav');
    if (!tabsNav) return;
    
    // Set first tab as active
    const firstButton = tabsNav.querySelector('.tab-button');
    if (firstButton) {
      switchTab(firstButton.id.replace('tab-', ''));
    }
    
    // Attach event listener
    tabsNav.addEventListener('click', handleTabClick);
  }
  
  function handleTabClick(event) {
    const button = event.target.closest('.tab-button');
    if (!button) return;
    
    const tabId = button.id.replace('tab-', '');
    switchTab(tabId);
  }
  
  function switchTab(tabId) {
    // Implementation details...
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTabs);
  } else {
    initializeTabs();
  }
})();
```

## Progressive Enhancement

### JavaScript Disabled

- All tab panels visible (CSS default: `display: block`)
- No interactive switching
- All content accessible
- ARIA attributes still present (for screen readers)

### JavaScript Enabled

- Single active tab visible
- Interactive switching works
- Smooth transitions
- ARIA attributes update dynamically

## Testing Requirements

### Unit Tests (if applicable)

- `switchTab()` function behavior
- `getActiveTab()` return values
- Event handler correctness

### Integration Tests

- Click interaction works
- Only one tab active at a time
- ARIA attributes update correctly
- Transitions complete smoothly

### Browser Tests

- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)
- Screen reader compatibility (NVDA, JAWS, VoiceOver)

## Versioning

- **v1.0**: Initial implementation
  - Basic tab switching
  - ARIA support
  - Event delegation
  - Progressive enhancement

## Breaking Changes

None (initial version).

