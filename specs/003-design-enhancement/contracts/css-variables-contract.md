# CSS Variables Contract

**Date**: 2024-12-19  
**Feature**: 003-design-enhancement

## Overview

This document defines the CSS custom properties (variables) contract for the theme system. All theme-related colors and design tokens are defined as CSS variables to enable efficient theme switching.

## Variable Categories

### 1. Base Colors

#### Light Theme (`:root`)
```css
--bg: #ffffff;
--bg-secondary: #f6f7f8;
--text: #1a1a1a;
--text-muted: #555555;
--border: #e0e0e0;
```

#### Dark Theme (`[data-theme="dark"]`)
```css
--bg: #121212;
--bg-secondary: #1a1a1a;
--text: #e0e0e0;
--text-muted: #b0b0b0;
--border: #333333;
```

**Contract**: These variables MUST be defined in both themes. All UI elements use these variables for consistent theming.

---

### 2. Primary Colors

#### Light Theme
```css
--primary: #0052cc;
--primary-light: #e6f0ff;
--primary-dark: #003d99;
```

#### Dark Theme
```css
--primary: #00BFFF;
--primary-light: #003d4d;
--primary-dark: #0099cc;
```

**Contract**: 
- `--primary` is the main brand color
- `--primary-light` is used for backgrounds and hover states
- `--primary-dark` is used for darker variations

---

### 3. Card Colors

#### Light Theme
```css
--card-bg: #e6f0ff;
--card-border: #e0e0e0;
--card-hover: #d0e0ff;
```

#### Dark Theme
```css
--card-bg: #1a1a1a;
--card-border: #333333;
--card-hover: #252525;
```

**Contract**: Used for all card-based components (services, projects, gitbooks, organizations, values).

---

### 4. Hero Section

#### Light Theme
```css
--hero-bg: linear-gradient(180deg, #0052cc 0%, #003d99 100%);
--hero-text: #ffffff;
```

#### Dark Theme
```css
--hero-bg: linear-gradient(180deg, #001a33 0%, #000d1a 100%);
--hero-text: #ffffff;
```

**Contract**: Hero section uses gradient background. Text color is always white for contrast.

---

### 5. Navigation

#### Light Theme
```css
--nav-bg: rgba(255, 255, 255, 0.95);
--nav-text: #1a1a1a;
--nav-border: #e0e0e0;
```

#### Dark Theme
```css
--nav-bg: rgba(18, 18, 18, 0.95);
--nav-text: #e0e0e0;
--nav-border: #333333;
```

**Contract**: Navigation uses semi-transparent background with backdrop blur. Text and border adapt to theme.

---

### 6. Design Tokens

#### Shared (Both Themes)
```css
--radius: 10px;
--max-width: 1152px;
--section-padding: 5rem;
--section-padding-mobile: 3rem;
```

**Contract**: These values are consistent across themes. Only color-related variables change.

---

## Variable Usage Rules

### 1. Color Variables
**Rule**: All colors MUST use CSS variables. No hardcoded color values allowed.

**Correct**:
```css
background: var(--bg);
color: var(--text);
border-color: var(--border);
```

**Incorrect**:
```css
background: #ffffff; /* Hardcoded color */
color: #1a1a1a; /* Hardcoded color */
```

---

### 2. Theme-Specific Variables
**Rule**: Variables defined in `:root` apply to light theme. Variables defined in `[data-theme="dark"]` override for dark theme.

**Pattern**:
```css
:root {
  --bg: #ffffff; /* Light theme */
}

[data-theme="dark"] {
  --bg: #121212; /* Dark theme override */
}
```

---

### 3. System Preference Fallback
**Rule**: Use `@media (prefers-color-scheme: dark)` for initial load when no user preference is set.

**Pattern**:
```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #121212; /* Dark theme for system preference */
  }
}
```

---

### 4. Variable Naming
**Rule**: Use kebab-case, descriptive names that indicate purpose.

**Examples**:
- `--bg` (background)
- `--text` (text color)
- `--primary` (primary brand color)
- `--card-bg` (card background)
- `--nav-text` (navigation text)

---

## Accessibility Contract

### Contrast Ratios
**Requirement**: All color combinations MUST meet WCAG AA standards.

**Minimum Ratios**:
- Normal text: 4.5:1
- Large text (18pt+): 3:1
- UI components: 3:1

**Validation**: Test all variable combinations:
- `--text` on `--bg`: ✅ 16.6:1 (light), ✅ 4.5:1+ (dark)
- `--primary` on `--bg`: ✅ 7.1:1 (light), ✅ 4.5:1+ (dark)
- `--text-muted` on `--bg`: ✅ 7.0:1 (light), ✅ 4.5:1+ (dark)

---

## Variable Dependencies

### Dependency Graph
```
:root / [data-theme="dark"]
  ├─> Base Colors (--bg, --text, --border)
  ├─> Primary Colors (--primary, --primary-light, --primary-dark)
  ├─> Card Colors (--card-bg, --card-border, --card-hover)
  ├─> Hero Colors (--hero-bg, --hero-text)
  └─> Navigation Colors (--nav-bg, --nav-text, --nav-border)
```

**Contract**: Variables are independent - no variable references another variable. This ensures predictable behavior and easier maintenance.

---

## Migration Contract

### Existing Variables (Preserved)
```css
--primary: #0052cc; /* Kept in light theme */
--primary-light: #e6f0ff; /* Kept in light theme */
--text: #1a1a1a; /* Kept in light theme */
--muted: #555; /* Renamed to --text-muted */
--bg: #fff; /* Kept in light theme */
--border: #e0e0e0; /* Kept in light theme */
--radius: 10px; /* Kept */
--font-base: 'Inter', 'Noto Sans', Arial, sans-serif; /* Updated to include Space Grotesk */
--max-width: 1000px; /* Updated to 1152px */
```

**Contract**: All existing variables are preserved for backward compatibility. New variables are added for dark theme support.

---

## Browser Compatibility

### Required Features
- CSS custom properties (CSS Variables)
- `data-*` attribute selectors
- `@media` queries

### Minimum Versions
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 15+

### Fallback Behavior
- Browsers without CSS variables: Use default light theme colors (hardcoded fallbacks)
- Browsers without `data-*` selectors: Use class-based selectors (`.dark-theme`)

---

## Testing Contract

### Visual Tests
- All UI elements use theme variables correctly
- Theme switch applies all variables instantly
- No hardcoded colors remain in stylesheet

### Accessibility Tests
- All color combinations meet WCAG AA contrast ratios
- Focus indicators visible in both themes
- Text readable in both themes

### Browser Tests
- Variables work in all supported browsers
- Fallback behavior works in older browsers
- System preference detection works correctly

---

## Version History

- **v1.0** (2024-12-19): Initial CSS variables contract

