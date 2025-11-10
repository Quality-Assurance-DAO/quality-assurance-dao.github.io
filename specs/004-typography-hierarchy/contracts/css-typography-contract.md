# CSS Typography Variables Contract

**Date**: 2024-12-19  
**Feature**: 004-typography-hierarchy

## Overview

This document defines the CSS custom properties (variables) contract for typography hierarchy. All heading sizes (h1/h2/h3) are defined as CSS variables to enable consistent typography across all pages.

## Variable Definitions

### Typography Size Variables

#### Base Sizes (Desktop)
```css
:root {
  --h1-size: clamp(2rem, 5vw, 3rem);
  --h2-size: clamp(1.75rem, 4vw, 2.5rem);
  --h3-size: clamp(1.25rem, 3vw, 1.75rem);
}
```

**Contract**: These variables MUST be defined in `:root` section. All heading elements use these variables for consistent sizing.

---

### Variable Usage Rules

#### 1. Heading Size Application
**Rule**: All h1, h2, and h3 elements MUST use their respective CSS variables.

**Correct**:
```css
h1 {
  font-size: var(--h1-size);
}

h2 {
  font-size: var(--h2-size);
}

h3 {
  font-size: var(--h3-size);
}
```

**Incorrect**:
```css
h1 {
  font-size: 3rem; /* Hardcoded size */
}

h2 {
  font-size: 2rem; /* Hardcoded size */
}
```

---

#### 2. Hierarchy Relationship
**Rule**: Variables must maintain hierarchy: `--h1-size > --h2-size > --h3-size` at all screen sizes.

**Validation**: 
- Minimum h1 size (2rem) > Maximum h2 size (2.5rem) → FALSE (needs adjustment)
- Maximum h1 size (3rem) > Maximum h2 size (2.5rem) → TRUE
- Minimum h2 size (1.75rem) > Maximum h3 size (1.75rem) → FALSE (needs adjustment)

**Note**: clamp() min/max values may overlap slightly, but the computed values at any given viewport size must maintain hierarchy.

---

#### 3. Responsive Scaling
**Rule**: Variables use clamp() for fluid typography that scales between min and max values.

**Pattern**:
```css
--h1-size: clamp(min-size, preferred-size, max-size);
```

**Requirements**:
- Min size: Smallest acceptable size (typically for mobile)
- Preferred size: Viewport-relative size (vw units)
- Max size: Largest acceptable size (typically for desktop)

---

## Browser Compatibility

### Required Features
- CSS custom properties (CSS Variables)
- `clamp()` function
- `rem` units

### Minimum Versions
- Chrome 79+ (clamp() support)
- Firefox 75+ (clamp() support)
- Safari 13.1+ (clamp() support)
- Edge 79+ (clamp() support)

### Fallback Behavior
- Browsers without clamp(): Use rem values directly (less responsive but functional)
- Browsers without CSS variables: Use hardcoded rem values as fallback

---

## Testing Contract

### Visual Tests
- All h1 headings use --h1-size variable
- All h2 headings use --h2-size variable
- All h3 headings use --h3-size variable
- Hierarchy relationships maintained at all screen sizes (320px to 2560px)

### Responsive Tests
- Typography scales smoothly between min and max values
- No abrupt size changes at breakpoints
- Hierarchy maintained at all viewport widths

---

## Version History

- **v1.0** (2024-12-19): Initial CSS typography variables contract

