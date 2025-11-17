# CSS Variables Contract

**Component**: Theme System & Design Tokens  
**Version**: 1.0  
**Date**: 2025-01-27

## Overview

CSS custom properties (variables) define the design system for the redesigned site, including color palette, typography, spacing, and component styling. Variables support dark/light theme switching via `data-theme` attribute.

## Color Palette

### Primary Colors
- `--primary`: `#4A00E0` (Primary purple)
- `--secondary`: `#00F2A9` (Secondary teal)
- `--primary-hover`: Darker shade of primary for hover states
- `--secondary-hover`: Darker shade of secondary for hover states

### Background Colors
**Light Theme**:
- `--bg`: `#f5f5f5` (Main background)
- `--bg-secondary`: Lighter shade for cards/sections
- `--bg-elevated`: White or near-white for elevated elements

**Dark Theme**:
- `--bg`: `#121212` (Main background)
- `--bg-secondary`: Darker shade for cards/sections
- `--bg-elevated`: Slightly lighter for elevated elements

### Text Colors
**Light Theme**:
- `--text`: `#121212` (Primary text)
- `--text-muted`: `#666666` (Secondary/muted text)
- `--text-inverse`: `#ffffff` (Text on dark backgrounds)

**Dark Theme**:
- `--text`: `#f5f5f5` (Primary text)
- `--text-muted`: `#999999` (Secondary/muted text)
- `--text-inverse`: `#121212` (Text on light backgrounds)

### Border Colors
- `--border`: Border color (adapts to theme)
- `--border-light`: Lighter border variant
- `--border-dark`: Darker border variant

## Typography

### Font Family
- `--font-family`: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Font Sizes
- `--font-size-xs`: `0.75rem` (12px)
- `--font-size-sm`: `0.875rem` (14px)
- `--font-size-base`: `1rem` (16px)
- `--font-size-lg`: `1.125rem` (18px)
- `--font-size-xl`: `1.25rem` (20px)
- `--font-size-2xl`: `1.5rem` (24px)
- `--font-size-3xl`: `1.875rem` (30px)
- `--font-size-4xl`: `2.25rem` (36px)

### Font Weights
- `--font-weight-normal`: `400`
- `--font-weight-medium`: `500`
- `--font-weight-bold`: `700`

### Line Heights
- `--line-height-tight`: `1.25`
- `--line-height-normal`: `1.5`
- `--line-height-relaxed`: `1.75`

## Spacing Scale

- `--spacing-xs`: `0.25rem` (4px)
- `--spacing-sm`: `0.5rem` (8px)
- `--spacing-md`: `1rem` (16px)
- `--spacing-lg`: `1.5rem` (24px)
- `--spacing-xl`: `2rem` (32px)
- `--spacing-2xl`: `3rem` (48px)
- `--spacing-3xl`: `4rem` (64px)
- `--spacing-4xl`: `6rem` (96px)

## Layout

### Container
- `--container-max-width`: `1200px`
- `--container-padding`: Responsive (1rem mobile, 2rem tablet, 3rem desktop)

### Section Spacing
- `--section-padding-y`: `5rem` (desktop), `3rem` (mobile)
- `--section-gap`: `4rem` (desktop), `2rem` (mobile)

## Component Variables

### Cards
- `--card-bg`: Background color (theme-aware)
- `--card-border`: Border color
- `--card-border-radius`: `12px`
- `--card-padding`: `1.5rem`
- `--card-shadow`: Box shadow (theme-aware)
- `--card-hover-shadow`: Hover state shadow

### Buttons
- `--button-padding-x`: `1.5rem`
- `--button-padding-y`: `0.75rem`
- `--button-border-radius`: `8px`
- `--button-font-weight`: `500`
- `--button-min-height`: `44px` (touch target)

### Navigation
- `--nav-height`: `64px`
- `--nav-bg`: Background (theme-aware, with transparency)
- `--nav-text`: Text color (theme-aware)
- `--nav-link-padding`: `1rem`

### Video Carousel
- `--carousel-height`: `600px` (desktop), `400px` (mobile)
- `--carousel-overlay-bg`: Semi-transparent overlay
- `--carousel-text-color`: `#ffffff`

## Breakpoints

- `--breakpoint-sm`: `640px`
- `--breakpoint-md`: `768px`
- `--breakpoint-lg`: `1024px`
- `--breakpoint-xl`: `1280px`

## Transitions

- `--transition-fast`: `150ms ease`
- `--transition-base`: `300ms ease`
- `--transition-slow`: `500ms ease`
- `--transition-theme`: `300ms ease` (for theme switching)

## Usage Pattern

```css
:root {
  /* Light theme defaults */
  --primary: #4A00E0;
  --secondary: #00F2A9;
  --bg: #f5f5f5;
  --text: #121212;
  /* ... other variables */
}

[data-theme="dark"] {
  --bg: #121212;
  --text: #f5f5f5;
  /* Override dark theme variables */
}
```

## Validation

- All color values must be valid hex codes or CSS color names
- Spacing values should use rem units for scalability
- Font sizes should use rem units with clamp() for responsive typography
- Breakpoints should match media query usage
- All variables must be defined in `:root` or `[data-theme]` selectors

## Accessibility Requirements

- Color contrast ratios must meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- Text colors must have sufficient contrast against background colors in both themes
- Interactive elements must have visible focus states
- Touch targets must be minimum 44x44px

