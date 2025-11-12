# CSS Styling Contract: Video Carousel

**Feature**: 009-video-carousel  
**Date**: 2024-12-19  
**File**: `_includes/video-carousel.html` (inline CSS)

## Overview

This contract defines the CSS styling API for the video carousel component. All styles must be inline within the include file.

## Container Styles

### `.video-carousel`

Main carousel container.

**Properties**:
- `position: relative` - Positioning context for absolute children
- `width: 100%` - Full width
- `height: [responsive]` - Responsive height (see breakpoints)
- `overflow: hidden` - Hide overflow content
- `background-color: [fallback color]` - Fallback when videos fail

**Responsive Heights**:
- Mobile (< 768px): `400px` or `50vh` (whichever is smaller)
- Tablet (768px - 1024px): `500px` or `60vh`
- Desktop (> 1024px): `600px` or `70vh`

## Slide Styles

### `.carousel-slide`

Individual slide wrapper.

**Properties**:
- `position: absolute` - Absolute positioning for stacking
- `top: 0` - Top alignment
- `left: 0` - Left alignment
- `width: 100%` - Full width
- `height: 100%` - Full height
- `opacity: 0` - Hidden by default
- `transition: opacity 0.8s ease-in-out` - Fade transition
- `z-index: 0` - Behind active slide

### `.carousel-slide.active`

Active/visible slide.

**Properties**:
- `opacity: 1` - Fully visible
- `z-index: 1` - Above other slides

## Video Styles

### `.carousel-video`

Video element styling.

**Properties**:
- `position: absolute` - Absolute positioning
- `top: 0` - Top alignment
- `left: 0` - Left alignment
- `width: 100%` - Full width
- `height: 100%` - Full height
- `object-fit: cover` - Fill container, maintain aspect ratio
- `object-position: center` - Center video in container

## Overlay Styles

### `.carousel-overlay`

Gradient overlay for text readability.

**Properties**:
- `position: absolute` - Absolute positioning
- `top: 0` - Top alignment
- `left: 0` - Left alignment
- `width: 100%` - Full width
- `height: 100%` - Full height
- `background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%)` - Linear gradient (darker at top, lighter at bottom)
- `z-index: 1` - Above video, below content
- `pointer-events: none` - Allow clicks to pass through

## Content Styles

### `.carousel-content`

Content wrapper (headline + CTA).

**Properties**:
- `position: absolute` - Absolute positioning
- `bottom: [responsive]` - Bottom alignment (see breakpoints)
- `left: 50%` - Horizontal centering
- `transform: translateX(-50%)` - Center horizontally
- `width: 90%` - 90% width with padding
- `max-width: 1200px` - Maximum width constraint
- `z-index: 2` - Above overlay
- `text-align: center` - Center text alignment
- `padding: [responsive]` - Responsive padding (see breakpoints)

**Responsive Positioning**:
- Mobile: `bottom: 2rem`, `padding: 1rem`
- Tablet: `bottom: 3rem`, `padding: 1.5rem`
- Desktop: `bottom: 4rem`, `padding: 2rem`

### `.carousel-headline`

Headline text styling.

**Properties**:
- `color: #ffffff` - White text
- `font-size: [responsive]` - Responsive font size (see breakpoints)
- `font-weight: 600` - Semi-bold
- `line-height: 1.3` - Line height
- `margin: 0 0 1rem 0` - Bottom margin
- `text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5)` - Text shadow for readability

**Responsive Font Sizes**:
- Mobile: `1.5rem` (24px)
- Tablet: `2rem` (32px)
- Desktop: `2.5rem` (40px)

### `.carousel-cta`

CTA button styling.

**Properties**:
- `display: inline-block` - Inline block
- `padding: [responsive]` - Responsive padding (see breakpoints)
- `background-color: [primary color]` - Primary brand color
- `color: #ffffff` - White text
- `text-decoration: none` - No underline
- `border-radius: 4px` - Rounded corners
- `font-size: [responsive]` - Responsive font size (see breakpoints)
- `font-weight: 600` - Semi-bold
- `transition: background-color 0.3s ease` - Hover transition
- `cursor: pointer` - Pointer cursor

**Hover State**:
- `background-color: [darker primary color]` - Darker on hover

**Responsive Padding**:
- Mobile: `0.75rem 1.5rem`
- Tablet: `0.875rem 1.75rem`
- Desktop: `1rem 2rem`

**Responsive Font Sizes**:
- Mobile: `0.9rem` (14.4px)
- Tablet: `1rem` (16px)
- Desktop: `1.1rem` (17.6px)

### `.carousel-play-button`

Play button (autoplay fallback).

**Properties**:
- `position: absolute` - Absolute positioning
- `top: 50%` - Vertical center
- `left: 50%` - Horizontal center
- `transform: translate(-50%, -50%)` - Center both axes
- `width: 80px` - Button width
- `height: 80px` - Button height
- `border-radius: 50%` - Circular button
- `background-color: rgba(255, 255, 255, 0.9)` - Semi-transparent white
- `border: none` - No border
- `font-size: 2rem` - Large play icon
- `color: [primary color]` - Primary brand color
- `cursor: pointer` - Pointer cursor
- `z-index: 3` - Above all content
- `transition: transform 0.3s ease, background-color 0.3s ease` - Hover transition

**Hover State**:
- `transform: translate(-50%, -50%) scale(1.1)` - Slight scale up
- `background-color: rgba(255, 255, 255, 1)` - Fully opaque

## Responsive Breakpoints

### Mobile (< 768px)

```css
@media (max-width: 767px) {
  .video-carousel {
    height: 400px;
  }
  .carousel-content {
    bottom: 2rem;
    padding: 1rem;
  }
  .carousel-headline {
    font-size: 1.5rem;
  }
  .carousel-cta {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
}
```

### Tablet (768px - 1024px)

```css
@media (min-width: 768px) and (max-width: 1024px) {
  .video-carousel {
    height: 500px;
  }
  .carousel-content {
    bottom: 3rem;
    padding: 1.5rem;
  }
  .carousel-headline {
    font-size: 2rem;
  }
  .carousel-cta {
    padding: 0.875rem 1.75rem;
    font-size: 1rem;
  }
}
```

### Desktop (> 1024px)

```css
@media (min-width: 1025px) {
  .video-carousel {
    height: 600px;
  }
  .carousel-content {
    bottom: 4rem;
    padding: 2rem;
  }
  .carousel-headline {
    font-size: 2.5rem;
  }
  .carousel-cta {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
}
```

## Theme Support

### Dark Theme

Carousel should work with existing dark/light theme system.

**Considerations**:
- Text colors should contrast with gradient overlay
- CTA button colors should match theme
- Overlay opacity may need adjustment for light theme

## Accessibility

### Contrast Requirements

- Headline text must meet WCAG AA contrast (4.5:1) against gradient overlay
- CTA button must meet WCAG AA contrast (4.5:1) for text
- Focus states must be visible (2px outline, high contrast)

### Focus States

```css
.carousel-cta:focus {
  outline: 2px solid [focus color];
  outline-offset: 2px;
}

.carousel-play-button:focus {
  outline: 2px solid [focus color];
  outline-offset: 2px;
}
```

## Performance

### Optimization

- Use `will-change: opacity` on `.carousel-slide` for smooth transitions
- Avoid expensive properties in transitions (use `opacity`, not `transform` for fade)
- Use `transform` and `opacity` for animations (GPU-accelerated)

## Related Documentation

- **Include Contract**: `video-carousel-include-contract.md`
- **JavaScript API**: `js-api-contract.md`
- **Data Model**: `/specs/009-video-carousel/data-model.md`

