# Contracts: Responsive Autoplay Video Carousel

**Feature**: 009-video-carousel  
**Date**: 2024-12-19

## Overview

This directory contains API contracts and schemas for the Responsive Autoplay Video Carousel feature.

## Contracts

### 1. Slides Data Schema (`slides-data-schema.json`)

JSON Schema definition for `slides.yml` data file. Validates slide entries follow the required schema.

**Key Points**:
- Required fields: `video`, `headline`, `cta_label`, `cta_link`
- Optional fields: `poster`, `duration`
- Video path pattern: `/assets/videos/*.mp4`
- Poster path pattern: `/assets/images/posters/*.{jpg,png,webp}`
- Duration range: 3-10 seconds (default: 5)

**Usage**: Validate `_data/slides.yml` against this schema before deployment.

### 2. Video Carousel Include Contract (`video-carousel-include-contract.md`)

Liquid include file API contract defining how to implement the video carousel component.

**Key Points**:
- Conditional rendering: Carousel hidden if `site.data.slides` is empty or has no valid slides
- HTML structure: Semantic HTML5 video elements with overlay and content
- Self-contained: HTML, CSS, and JavaScript in single include file
- Single slide handling: No transitions/looping when only one valid slide exists
- Invalid slide filtering: Silently skip slides missing required fields

**Usage**: Reference when implementing or modifying the `_includes/video-carousel.html` file.

### 3. CSS Styling Contract (`css-styling-contract.md`)

CSS styling API contract defining carousel visual design and responsive behavior.

**Key Points**:
- Fade transitions: CSS opacity transitions (0.8s duration)
- Gradient overlay: Linear gradient from top to bottom (darker at top)
- Responsive breakpoints: 768px (mobile), 1024px (tablet/desktop)
- Video sizing: `object-fit: cover` to fill container
- Text readability: WCAG AA contrast compliance

**Usage**: Reference when implementing or modifying carousel CSS styles.

### 4. JavaScript API Contract (`js-api-contract.md`)

JavaScript API contract defining carousel behavior and interaction logic.

**Key Points**:
- Timer management: Start immediately on slide visibility
- Slide transitions: Opacity-based fade effects
- Autoplay detection: Handle browser autoplay restrictions
- Single slide mode: Disable carousel behavior for single slide
- Event handling: Video play/error events, user interactions

**Usage**: Reference when implementing or modifying carousel JavaScript logic.

## Validation

### Data Validation

Use the JSON schema to validate `_data/slides.yml`:

```bash
# Example validation (requires json-schema validator)
validate-json slides-data-schema.json _data/slides.yml
```

Or use Jekyll's built-in YAML validation:

```bash
bundle exec jekyll build
```

### Template Validation

Manual testing checklist provided in `video-carousel-include-contract.md` under "Testing Checklist".

### CSS Validation

CSS linting and validation:

```bash
# Example CSS validation
css-validator assets/css/main.css
```

### JavaScript Validation

JavaScript linting:

```bash
# Example JS validation
eslint _includes/video-carousel.html --extract-js
```

## Related Documentation

- **Data Model**: `/specs/009-video-carousel/data-model.md`
- **Research**: `/specs/009-video-carousel/research.md`
- **Quickstart**: `/specs/009-video-carousel/quickstart.md`

