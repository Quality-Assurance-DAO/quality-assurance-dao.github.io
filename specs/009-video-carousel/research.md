# Research: Responsive Autoplay Video Carousel

**Phase**: 0 - Outline & Research  
**Date**: 2024-12-19  
**Feature**: 009-video-carousel

## Overview

This document consolidates research findings and decisions for implementing the Responsive Autoplay Video Carousel feature. All technical unknowns from the Technical Context have been resolved.

## Research Findings

### 1. HTML5 Video Autoplay Attributes

**Decision**: Use `autoplay`, `muted`, `loop`, and `playsinline` attributes on HTML5 `<video>` elements

**Rationale**: 
- Modern browsers require `muted` attribute for autoplay to work (autoplay policy)
- `playsinline` ensures videos play inline on mobile devices (iOS requirement)
- `loop` provides continuous playback for background videos
- `autoplay` starts playback automatically when video loads
- These attributes together ensure maximum browser compatibility

**Alternatives Considered**:
- Using JavaScript to trigger playback → Rejected: Less reliable, may conflict with browser policies
- Using iframe embeds (YouTube, Vimeo) → Rejected: Adds external dependencies, less control, potential privacy concerns
- Using CSS background videos → Rejected: Less control over playback, accessibility concerns

**Reference**: HTML5 Video API specification, browser autoplay policies

### 2. CSS Opacity Transitions for Fade Effects

**Decision**: Use CSS `opacity` transitions with `transition` property for smooth fade effects between slides

**Rationale**:
- CSS transitions are hardware-accelerated and performant
- Opacity transitions are smoother than display/visibility changes
- No JavaScript required for the visual transition (only for timing)
- Works well with video elements (opacity doesn't affect video playback)
- Standard approach for carousel fade effects

**Implementation Pattern**:
```css
.carousel-slide {
  opacity: 0;
  transition: opacity 0.8s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.carousel-slide.active {
  opacity: 1;
  z-index: 1;
}
```

**Alternatives Considered**:
- Using CSS animations → Rejected: More complex, harder to control timing
- Using JavaScript for opacity changes → Rejected: Less performant, unnecessary complexity
- Using transform/translate → Rejected: Not needed for fade-only transitions

**Reference**: CSS Transitions specification, web performance best practices

### 3. Vanilla JavaScript Implementation (No External Frameworks)

**Decision**: Implement carousel logic using vanilla JavaScript (ES6+) without external libraries

**Rationale**:
- Spec requirement: "lightweight JavaScript (no external frameworks)"
- Reduces page load time and dependencies
- Full control over implementation
- Easier to maintain and debug
- No version conflicts or security vulnerabilities from external libraries
- Small codebase doesn't justify framework overhead

**Implementation Pattern**:
```javascript
(function() {
  'use strict';
  // Carousel initialization
  // Slide transition logic
  // Timer management
  // Autoplay detection and fallback
})();
```

**Alternatives Considered**:
- Using jQuery → Rejected: Adds dependency, unnecessary for simple carousel
- Using React/Vue → Rejected: Overkill for static site, adds build complexity
- Using Slick/Swiper carousel libraries → Rejected: External dependency, violates spec requirement

**Reference**: Vanilla JavaScript best practices, Jekyll static site patterns

### 4. Slide Data Schema Design

**Decision**: Use YAML data file (`slides.yml`) with required fields: `video`, `headline`, `cta_label`, `cta_link`; optional fields: `poster`, `duration`

**Rationale**:
- Follows existing Jekyll data file pattern (`_data/` directory)
- Consistent with other data files (projects.yml, services.yml, partners.yml)
- Easy to manage content without code changes
- YAML is human-readable and maintainable
- Jekyll automatically loads data files into `site.data` object

**Schema Structure**:
```yaml
---
- video: /assets/videos/slide1.mp4
  headline: "Welcome to QADAO"
  cta_label: "Learn More"
  cta_link: "/about"
  poster: /assets/images/posters/slide1.jpg
  duration: 5
```

**Alternatives Considered**:
- Hardcoding slides in template → Rejected: Not maintainable, requires code changes for content updates
- Using JSON file → Rejected: YAML is more readable, standard for Jekyll
- Using front matter → Rejected: Would require separate pages, not suitable for carousel

**Reference**: Jekyll data files documentation, existing data file patterns in codebase

### 5. Gradient Overlay Implementation

**Decision**: Use CSS linear gradient overlay (top to bottom, darker at top) positioned over video with `::before` pseudo-element or separate div

**Rationale**:
- Spec requirement: "semi-transparent dark gradient overlay behind text for readability"
- Linear gradient from top to bottom (darker at top, lighter at bottom) as specified
- CSS gradients are performant and don't require images
- Can be layered over video using absolute positioning
- Maintains text readability over varying video content

**Implementation Pattern**:
```css
.carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 100%);
  z-index: 1;
  pointer-events: none;
}
```

**Alternatives Considered**:
- Using image overlay → Rejected: Less flexible, adds file size, harder to maintain
- Using box-shadow → Rejected: Doesn't provide gradient effect
- Using multiple divs → Rejected: More complex, unnecessary

**Reference**: CSS Gradients specification, text readability best practices

### 6. Autoplay Restriction Handling

**Decision**: Detect autoplay restrictions and show poster image with visible play button when autoplay fails

**Rationale**:
- Modern browsers (Chrome, Safari, Firefox) restrict autoplay with sound
- Even with `muted` attribute, some browsers may block autoplay in certain contexts
- User experience requires graceful fallback
- Play button provides clear call-to-action for user interaction
- Poster image provides visual context while video loads or is blocked

**Implementation Pattern**:
```javascript
video.addEventListener('play', function() {
  // Autoplay succeeded
  playButton.style.display = 'none';
});

video.addEventListener('error', function() {
  // Video failed to load
  showPosterWithPlayButton();
});

// Check if autoplay was blocked
const playPromise = video.play();
if (playPromise !== undefined) {
  playPromise.catch(() => {
    // Autoplay was prevented
    showPosterWithPlayButton();
  });
}
```

**Alternatives Considered**:
- Ignoring autoplay restrictions → Rejected: Poor user experience, videos won't play
- Using only poster images → Rejected: Doesn't provide video experience when possible
- Requiring user interaction before showing carousel → Rejected: Defeats purpose of autoplay carousel

**Reference**: Browser autoplay policies, HTML5 Video API

### 7. Slide Duration Timer Implementation

**Decision**: Start timer immediately when slide becomes visible, regardless of video load/playback state

**Rationale**:
- Spec requirement: "Timer starts immediately when the slide becomes visible (regardless of video load state)"
- Ensures consistent timing between slides
- Prevents carousel from waiting indefinitely for slow-loading videos
- Provides predictable user experience
- Timer duration defaults to 5 seconds if not specified in slides.yml

**Implementation Pattern**:
```javascript
function showSlide(index) {
  // Hide current slide
  currentSlide.classList.remove('active');
  
  // Show new slide
  const newSlide = slides[index];
  newSlide.classList.add('active');
  
  // Start timer immediately (regardless of video state)
  clearTimeout(slideTimer);
  const duration = newSlide.dataset.duration || 5000; // Default 5 seconds
  slideTimer = setTimeout(() => {
    nextSlide();
  }, duration);
}
```

**Alternatives Considered**:
- Waiting for video to load before starting timer → Rejected: Violates spec, inconsistent timing
- Waiting for video to play before starting timer → Rejected: Violates spec, may never start if autoplay blocked
- Using video duration as slide duration → Rejected: Not specified, videos loop continuously

**Reference**: Spec clarification, carousel timing patterns

### 8. Single Slide Handling

**Decision**: Display single slide without transition effects (no fade, no looping) when only one valid slide exists

**Rationale**:
- Spec requirement: "Display the single slide without any transition effects (no fade, no looping)"
- No need for carousel behavior with only one slide
- Simpler implementation, better performance
- Avoids unnecessary JavaScript execution
- Clear user experience (no confusing transitions)

**Implementation Pattern**:
```javascript
if (validSlides.length === 1) {
  // Single slide: no carousel behavior
  showSingleSlide(validSlides[0]);
  // No timer, no transitions, no looping
} else {
  // Multiple slides: full carousel behavior
  initializeCarousel(validSlides);
}
```

**Alternatives Considered**:
- Always using carousel behavior → Rejected: Violates spec, unnecessary complexity
- Hiding carousel with single slide → Rejected: Spec says to display the slide

**Reference**: Spec clarification, edge case handling

### 9. Invalid Slide Entry Handling

**Decision**: Skip slide entries with missing required fields silently and continue displaying valid slides

**Rationale**:
- Spec requirement: "Skip invalid entries silently and continue displaying valid slides"
- Prevents carousel from breaking due to data errors
- Graceful degradation: show what's valid
- Required fields: `video`, `headline`, `cta_label`, `cta_link`
- Missing any required field → skip entry

**Implementation Pattern**:
```javascript
function validateSlide(slide) {
  return slide.video && 
         slide.headline && 
         slide.cta_label && 
         slide.cta_link;
}

const validSlides = site.data.slides.filter(validateSlide);
```

**Alternatives Considered**:
- Showing error messages for invalid slides → Rejected: Violates spec (silent skip)
- Breaking carousel on invalid slide → Rejected: Poor user experience
- Showing partial content for invalid slides → Rejected: May break layout, unclear UX

**Reference**: Spec clarification, data validation patterns

### 10. Responsive Design Approach

**Decision**: Use CSS media queries with existing breakpoints (768px, 1024px) and responsive video sizing

**Rationale**:
- Spec requirement: "fully responsive, with mobile scaling"
- Existing site uses standard breakpoints (768px mobile, 1024px tablet/desktop)
- Videos should scale to fit container while maintaining aspect ratio
- Text sizes should adjust for readability on mobile
- Use `object-fit: cover` for videos to fill container appropriately

**Implementation Pattern**:
```css
.carousel-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .carousel-headline {
    font-size: 1.5rem;
  }
  .carousel-cta {
    font-size: 0.9rem;
    padding: 0.75rem 1.5rem;
  }
}
```

**Alternatives Considered**:
- Fixed video dimensions → Rejected: Not responsive, breaks on mobile
- Using different videos for mobile → Rejected: Unnecessary complexity, larger file sizes
- Using CSS background videos → Rejected: Less control, accessibility concerns

**Reference**: Responsive design best practices, existing site breakpoints

### 11. Video File Organization

**Decision**: Store video files in `/assets/videos/` directory with paths relative to site root

**Rationale**:
- Spec requirement: "using standard Jekyll data and asset folder conventions (/assets/videos/ for MP4 files)"
- Consistent with existing asset organization (`/assets/images/`, `/assets/css/`, `/assets/js/`)
- Jekyll serves assets from `/assets/` directory
- Relative paths work correctly with Jekyll's `relative_url` filter
- Standard web convention for static assets

**Path Format**:
```yaml
video: /assets/videos/slide1.mp4
```

**Alternatives Considered**:
- Storing videos in `_assets/` → Rejected: Not standard Jekyll convention
- Using absolute URLs → Rejected: Not portable, breaks local development
- Storing videos in `_data/` → Rejected: Data directory is for YAML/JSON, not binary files

**Reference**: Jekyll asset organization, spec requirements

### 12. Include File Pattern

**Decision**: Create `_includes/video-carousel.html` with HTML structure, inline CSS, and JavaScript (following animated-header.html pattern)

**Rationale**:
- Follows existing include pattern (`_includes/animated-header.html`, `_includes/tabs.html`)
- Self-contained component (HTML, CSS, JS in one file)
- Easy to include in layout: `{% include video-carousel.html %}`
- Maintains consistency with other includes
- No external file dependencies

**Implementation Pattern**:
```liquid
{% comment %} Video Carousel Component {% endcomment %}
{% if site.data.slides %}
  <section class="video-carousel">
    <!-- HTML structure -->
  </section>
  <style>
    /* Inline CSS */
  </style>
  <script>
    /* Inline JavaScript */
  </script>
{% endif %}
```

**Alternatives Considered**:
- Separate CSS/JS files → Rejected: Adds file dependencies, less self-contained
- Template in layout file → Rejected: Clutters layout, less reusable
- External carousel library → Rejected: Violates spec (no external frameworks)

**Reference**: Existing include patterns, Jekyll include documentation

## Technical Decisions Summary

| Decision Area | Choice | Rationale |
|--------------|--------|-----------|
| Video Autoplay | HTML5 attributes (autoplay, muted, loop, playsinline) | Browser compatibility, autoplay policies |
| Fade Transitions | CSS opacity transitions | Performance, simplicity, standard approach |
| JavaScript | Vanilla JS (no frameworks) | Spec requirement, lightweight, maintainable |
| Data Schema | YAML file with required/optional fields | Jekyll convention, maintainable |
| Gradient Overlay | CSS linear gradient | Performance, flexibility, readability |
| Autoplay Fallback | Poster + play button | Graceful degradation, user experience |
| Timer Logic | Start immediately on slide visibility | Spec requirement, consistent timing |
| Single Slide | No transitions/looping | Spec requirement, simplicity |
| Invalid Slides | Silent skip | Spec requirement, graceful degradation |
| Responsive Design | CSS media queries + object-fit | Standard approach, existing breakpoints |
| Video Storage | /assets/videos/ directory | Jekyll convention, spec requirement |
| Include Pattern | Self-contained include file | Consistency, reusability |

## Resolved Unknowns

All technical unknowns from Technical Context have been resolved:

- ✅ **Video Autoplay**: HTML5 attributes with fallback handling
- ✅ **Fade Transitions**: CSS opacity transitions
- ✅ **JavaScript Framework**: Vanilla JavaScript (no external dependencies)
- ✅ **Data Schema**: YAML file with required/optional fields
- ✅ **Gradient Overlay**: CSS linear gradient (top to bottom)
- ✅ **Autoplay Restrictions**: Poster image + play button fallback
- ✅ **Timer Implementation**: Start immediately on slide visibility
- ✅ **Single Slide Handling**: No transitions/looping
- ✅ **Invalid Slide Handling**: Silent skip of invalid entries
- ✅ **Responsive Design**: CSS media queries with existing breakpoints
- ✅ **Video Organization**: /assets/videos/ directory
- ✅ **Include Pattern**: Self-contained include file

## Next Steps

Proceed to Phase 1: Design & Contracts
- Generate data-model.md
- Generate API contracts (Liquid template contract, CSS contract, JavaScript API contract)
- Generate quickstart.md
- Update agent context

