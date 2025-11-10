# Theme Toggle API Contract

**Date**: 2024-12-19  
**Feature**: 003-design-enhancement

## Overview

This document defines the JavaScript API contract for the theme toggle functionality.

## API Surface

### Global Functions

#### `getInitialTheme()`
**Returns**: `"light" | "dark"`

**Description**: Determines the initial theme to apply on page load.

**Logic**:
1. Check `localStorage.getItem('theme')`
2. If found, return that value
3. If not found, check `window.matchMedia('(prefers-color-scheme: dark)').matches`
4. Return `"dark"` if system prefers dark, otherwise `"light"`

**Side Effects**: None

---

#### `setTheme(theme)`
**Parameters**:
- `theme` (string, required): `"light"` or `"dark"`

**Returns**: `void`

**Description**: Applies the specified theme to the document.

**Side Effects**:
1. Sets `data-theme` attribute on `<html>` element
2. Saves theme to `localStorage.setItem('theme', theme)`
3. Adds/removes `dark-theme` class on `<body>` element (for backwards compatibility)

**Validation**:
- If `theme` is not `"light"` or `"dark"`, behavior is undefined (should validate before calling)

---

### DOM Elements

#### Theme Toggle Button
**Selector**: `#theme-toggle`

**HTML Structure**:
```html
<button 
  id="theme-toggle" 
  class="theme-toggle" 
  aria-label="Toggle dark mode"
  title="Toggle dark/light theme">
  <span class="theme-icon theme-icon-light">☀️</span>
  <span class="theme-icon theme-icon-dark">🌙</span>
</button>
```

**Event Handling**:
- **Click Event**: Toggles theme between light and dark
- **Keyboard Event**: Supports Enter and Space keys for activation

**Accessibility**:
- Must have `aria-label` attribute
- Must be keyboard focusable
- Must have visible focus indicator

---

### CSS Classes

#### Theme State Classes
- `[data-theme="light"]` - Applied to `<html>` when light theme is active
- `[data-theme="dark"]` - Applied to `<html>` when dark theme is active
- `body.dark-theme` - Applied to `<body>` when dark theme is active (backwards compatibility)

#### Icon Visibility Classes
- `.theme-icon-light` - Visible in light theme, hidden in dark theme
- `.theme-icon-dark` - Hidden in light theme, visible in dark theme

---

### localStorage Contract

#### Key: `"theme"`
**Type**: `string`  
**Values**: `"light"` | `"dark"`  
**Lifetime**: Persistent across browser sessions  
**Scope**: Per-domain

**Read Contract**:
```javascript
const theme = localStorage.getItem('theme');
// Returns: "light" | "dark" | null
```

**Write Contract**:
```javascript
localStorage.setItem('theme', 'light'); // or 'dark'
```

**Error Handling**:
- If localStorage is unavailable (private browsing, disabled), theme still works but doesn't persist
- Invalid values are ignored, system preference is used

---

### System Preference Detection

#### Media Query
**Query**: `(prefers-color-scheme: dark)`

**Usage**:
```javascript
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
```

**Event Listener**:
```javascript
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
  // Only applies if no user preference is saved
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});
```

**Behavior**:
- Only used on initial load if no saved preference exists
- Only auto-updates if user hasn't manually set a preference
- User's manual selection takes precedence

---

## Error Handling

### localStorage Unavailable
**Scenario**: Browser doesn't support localStorage or it's disabled

**Behavior**:
- Theme toggle still works for current session
- Preference doesn't persist across page reloads
- Falls back to system preference on each load

### Invalid Theme Value
**Scenario**: localStorage contains invalid value (not "light" or "dark")

**Behavior**:
- Ignore invalid value
- Use system preference
- Optionally clear invalid value from localStorage

### Missing DOM Elements
**Scenario**: Theme toggle button not found in DOM

**Behavior**:
- Script continues without error
- Theme still applies based on saved/system preference
- Toggle functionality simply unavailable

---

## Performance Requirements

### Response Time
- Theme toggle must respond within 200ms of user interaction
- No visible delay or flicker during theme transition

### Resource Usage
- Script size: < 2KB (minified)
- No external dependencies
- No network requests

---

## Browser Compatibility

### Required Features
- CSS custom properties (variables)
- `localStorage` API
- `matchMedia` API
- `data-*` attributes
- `classList` API

### Minimum Versions
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Graceful Degradation
- Browsers without localStorage: Theme works, doesn't persist
- Browsers without matchMedia: Defaults to light theme
- Browsers without CSS variables: Falls back to default styles

---

## Testing Contract

### Unit Tests
- `getInitialTheme()` returns correct value based on localStorage and system preference
- `setTheme()` correctly updates DOM and localStorage
- Theme toggle button click toggles theme correctly

### Integration Tests
- Theme persists across page reloads
- System preference is respected on first visit
- Manual selection overrides system preference
- Theme applies correctly on initial page load

### Accessibility Tests
- Theme toggle is keyboard accessible
- Focus indicator is visible
- ARIA label is present and accurate
- Screen readers announce theme change

---

## Version History

- **v1.0** (2024-12-19): Initial API contract

