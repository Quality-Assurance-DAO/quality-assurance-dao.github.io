# Video Carousel Include Contract

**Feature**: 009-video-carousel  
**Date**: 2024-12-19  
**File**: `_includes/video-carousel.html`

## Overview

This contract defines the API and structure for the video carousel include file. The include file is self-contained, containing HTML structure, inline CSS, and JavaScript.

## File Structure

The include file must contain:

1. **Liquid Comments**: File header with description
2. **Conditional Rendering**: Check if slides data exists
3. **HTML Structure**: Carousel container, slides, video elements, overlay, content
4. **Inline CSS**: All carousel-specific styles in `<style>` tag
5. **Inline JavaScript**: All carousel logic in `<script>` tag

## Liquid Template API

### Conditional Rendering

```liquid
{% if site.data.slides %}
  <!-- Carousel content -->
{% endif %}
```

**Behavior**: 
- Carousel only renders if `site.data.slides` exists and is not empty
- If file is missing or empty, carousel is completely hidden

### Slide Iteration

```liquid
{% for slide in site.data.slides %}
  {% if slide.video and slide.headline and slide.cta_label and slide.cta_link %}
    <!-- Slide content -->
  {% endif %}
{% endfor %}
```

**Behavior**:
- Iterate through all slides in `site.data.slides`
- Only render slides with all required fields present
- Silently skip invalid slides (missing required fields)

### Slide Data Access

- `slide.video` - Video file path (required)
- `slide.headline` - Headline text (required)
- `slide.cta_label` - CTA button label (required)
- `slide.cta_link` - CTA button URL (required)
- `slide.poster` - Poster image path (optional)
- `slide.duration` - Slide duration in seconds (optional, default: 5)

### Path Filtering

All paths must use Jekyll's `relative_url` filter:

```liquid
{{ slide.video | relative_url }}
{{ slide.poster | relative_url }}
```

## HTML Structure

### Container

```html
<section class="video-carousel" id="video-carousel" aria-label="Video carousel">
  <!-- Slides -->
</section>
```

### Slide Structure

```html
<div class="carousel-slide" data-duration="{{ slide.duration | default: 5 }}">
  <video 
    class="carousel-video"
    autoplay 
    muted 
    loop 
    playsinline
    {% if slide.poster %}poster="{{ slide.poster | relative_url }}"{% endif %}>
    <source src="{{ slide.video | relative_url }}" type="video/mp4">
  </video>
  <div class="carousel-overlay"></div>
  <div class="carousel-content">
    <h2 class="carousel-headline">{{ slide.headline }}</h2>
    <a href="{{ slide.cta_link }}" class="carousel-cta">{{ slide.cta_label }}</a>
  </div>
  <button class="carousel-play-button" aria-label="Play video" style="display: none;">
    ▶
  </button>
</div>
```

**Required Elements**:
- `.carousel-slide` - Slide wrapper (one per slide)
- `.carousel-video` - Video element with required attributes
- `.carousel-overlay` - Gradient overlay div
- `.carousel-content` - Content wrapper
- `.carousel-headline` - Headline element
- `.carousel-cta` - CTA button/link

**Optional Elements**:
- `poster` attribute on video (if `slide.poster` exists)
- `.carousel-play-button` - Play button (shown when autoplay blocked)

## Video Element Attributes

### Required Attributes

- `autoplay` - Start playback automatically
- `muted` - Mute audio (required for autoplay)
- `loop` - Loop video continuously
- `playsinline` - Play inline on mobile devices

### Optional Attributes

- `poster` - Poster image URL (if `slide.poster` exists)

### Source Element

```html
<source src="{{ slide.video | relative_url }}" type="video/mp4">
```

## CSS Requirements

All CSS must be inline within the include file in a `<style>` tag.

**Required Classes**:
- `.video-carousel` - Main container
- `.carousel-slide` - Individual slide
- `.carousel-slide.active` - Active/visible slide
- `.carousel-video` - Video element
- `.carousel-overlay` - Gradient overlay
- `.carousel-content` - Content wrapper
- `.carousel-headline` - Headline text
- `.carousel-cta` - CTA button
- `.carousel-play-button` - Play button (fallback)

See `css-styling-contract.md` for detailed CSS specifications.

## JavaScript Requirements

All JavaScript must be inline within the include file in a `<script>` tag.

**Required Functionality**:
- Slide validation (filter invalid slides)
- Single slide detection (disable carousel behavior)
- Timer management (start on slide visibility)
- Slide transitions (opacity fade)
- Autoplay detection and fallback
- Event handling (video play/error events)

See `js-api-contract.md` for detailed JavaScript API specifications.

## Accessibility Requirements

### ARIA Attributes

- `aria-label` on carousel container
- `aria-label` on play button
- Semantic HTML5 elements (`<section>`, `<video>`, `<h2>`)

### Keyboard Navigation

- CTA links must be keyboard accessible
- Play button must be keyboard accessible
- Focus states must be visible

### Screen Reader Support

- Headlines must be readable by screen readers
- Video elements should have appropriate labels
- Play button must have descriptive label

## Testing Checklist

### Data Validation

- [ ] Carousel renders when `slides.yml` has valid slides
- [ ] Carousel is hidden when `slides.yml` is empty
- [ ] Carousel is hidden when `slides.yml` is missing
- [ ] Invalid slides (missing required fields) are skipped
- [ ] Valid slides are displayed correctly

### Single Slide Handling

- [ ] Single slide displays without transitions
- [ ] Single slide has no looping behavior
- [ ] Single slide has no timer

### Video Playback

- [ ] Videos autoplay when possible
- [ ] Videos are muted and loop
- [ ] Poster images display when video is loading
- [ ] Play button appears when autoplay is blocked
- [ ] Clicking play button starts video playback

### Transitions

- [ ] Fade transitions work smoothly (multiple slides)
- [ ] Transitions complete in under 1 second
- [ ] No visible glitches or jumps during transitions
- [ ] Carousel loops back to first slide after last slide

### Responsive Design

- [ ] Carousel adapts to mobile screens (< 768px)
- [ ] Carousel adapts to tablet screens (768px - 1024px)
- [ ] Carousel adapts to desktop screens (> 1024px)
- [ ] Videos maintain aspect ratio on all screen sizes
- [ ] Text remains readable on all screen sizes

### Edge Cases

- [ ] Missing video files handled gracefully (poster or fallback)
- [ ] Missing poster images handled gracefully
- [ ] Very long headlines wrap appropriately
- [ ] Many slides (10+) handled gracefully
- [ ] Browser autoplay restrictions handled gracefully

## Integration

### Layout Integration

Include the carousel in `_layouts/default.html`:

```liquid
{% include video-carousel.html %}
```

**Placement**: Typically in hero section or prominent location on page.

### Dependencies

- Jekyll Liquid templating engine
- `site.data.slides` data file
- Video files in `/assets/videos/` directory
- Optional poster images in `/assets/images/posters/` directory

## Related Documentation

- **Data Model**: `/specs/009-video-carousel/data-model.md`
- **CSS Contract**: `css-styling-contract.md`
- **JavaScript API**: `js-api-contract.md`
- **Data Schema**: `slides-data-schema.json`

