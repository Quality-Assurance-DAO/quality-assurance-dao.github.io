# Quickstart: Responsive Autoplay Video Carousel

**Feature**: 009-video-carousel  
**Date**: 2024-12-19

## Overview

This quickstart guide provides step-by-step instructions for implementing the Responsive Autoplay Video Carousel feature. The feature adds a video carousel component that displays slides with background videos, headline text, and call-to-action buttons.

## Prerequisites

- Jekyll site running locally or on GitHub Pages
- Access to `_data/` directory for YAML files
- Access to `_includes/` directory for include files
- Access to `assets/` directory for video files
- Video files in MP4 format (compressed for web)
- Optional: Poster images (JPG, PNG, or WebP format)

## Implementation Steps

### Step 1: Create Slides Data File

Create `_data/slides.yml` with slide entries:

```yaml
---
- video: /assets/videos/slide1.mp4
  headline: "Welcome to QADAO"
  cta_label: "Learn More"
  cta_link: /about
  poster: /assets/images/posters/slide1.jpg
  duration: 5

- video: /assets/videos/slide2.mp4
  headline: "Decentralized Quality Assurance"
  cta_label: "Explore Services"
  cta_link: /services
  duration: 6

- video: /assets/videos/slide3.mp4
  headline: "Join Our Community"
  cta_label: "Get Started"
  cta_link: /contact
  poster: /assets/images/posters/slide3.jpg
  duration: 5
```

**Required Fields**:
- `video`: Video file path (relative to site root, e.g., `/assets/videos/slide1.mp4`)
- `headline`: Text headline to display
- `cta_label`: CTA button label text
- `cta_link`: CTA button URL (relative or absolute)

**Optional Fields**:
- `poster`: Poster image path (relative to site root)
- `duration`: Display duration in seconds (default: 5, range: 3-10)

### Step 2: Add Video Files

1. Create directory: `assets/videos/`
2. Add video files in MP4 format
3. Ensure videos are compressed/optimized for web delivery
4. Use descriptive filenames (e.g., `welcome-slide.mp4`, `services-slide.mp4`)

**Example**:
```
assets/videos/
├── slide1.mp4
├── slide2.mp4
└── slide3.mp4
```

**Video Requirements**:
- Format: MP4 (H.264 codec recommended)
- Optimized for web (compressed file size)
- Recommended aspect ratio: 16:9
- Recommended resolution: 1920x1080 (or lower for smaller file sizes)

### Step 3: Add Poster Images (Optional)

1. Create directory: `assets/images/posters/`
2. Add poster images (JPG, PNG, or WebP format)
3. Use descriptive filenames matching video names

**Example**:
```
assets/images/posters/
├── slide1.jpg
├── slide2.jpg
└── slide3.jpg
```

**Poster Image Requirements**:
- Format: JPG, PNG, or WebP
- Recommended size: Match video aspect ratio (16:9)
- Optimized for web (compressed file size)
- Used as fallback when video is loading or fails to load

### Step 4: Create Video Carousel Include File

Create `_includes/video-carousel.html` with the carousel component:

```liquid
{% comment %}
  Video Carousel Component
  Responsive autoplay video carousel with fade transitions
{% endcomment %}

{% if site.data.slides %}
  <section class="video-carousel" id="video-carousel" aria-label="Video carousel">
    {% for slide in site.data.slides %}
      {% if slide.video and slide.headline and slide.cta_label and slide.cta_link %}
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
      {% endif %}
    {% endfor %}
  </section>

  <style>
    /* CSS styles - see css-styling-contract.md for full styles */
    .video-carousel {
      position: relative;
      width: 100%;
      height: 600px;
      overflow: hidden;
    }
    /* ... additional styles ... */
  </style>

  <script>
    (function() {
      'use strict';
      // JavaScript logic - see js-api-contract.md for full implementation
      // ... carousel initialization and logic ...
    })();
  </script>
{% endif %}
```

**Note**: See contracts for complete implementation:
- `contracts/video-carousel-include-contract.md` - Full HTML structure
- `contracts/css-styling-contract.md` - Complete CSS styles
- `contracts/js-api-contract.md` - Complete JavaScript implementation

### Step 5: Include Carousel in Layout

Open `_layouts/default.html` and add the carousel include:

```liquid
<!-- HERO SECTION -->
<section id="home">
  {% include animated-header.html title="Decentralised Assurance of Quality" %}
</section>

<!-- VIDEO CAROUSEL -->
{% include video-carousel.html %}

<main>
  <!-- rest of content -->
</main>
```

**Placement**: Typically in hero section or prominent location on page, before main content.

### Step 6: Validate Data

Validate `_data/slides.yml` against the schema:

```bash
# Using a JSON schema validator (example)
validate-json specs/009-video-carousel/contracts/slides-data-schema.json _data/slides.yml
```

Or use Jekyll's built-in validation:

```bash
bundle exec jekyll build
```

**Validation Checks**:
- All required fields present
- Video paths are valid (files exist)
- Poster paths are valid (if specified)
- Duration is between 3-10 seconds (if specified)
- CTA links are valid URLs

### Step 7: Test Locally

1. Start Jekyll server: `bundle exec jekyll serve`
2. Navigate to main page
3. Verify carousel appears (if data exists)
4. Verify carousel is hidden (if data is empty)
5. Test carousel functionality:
   - Video autoplay
   - Slide transitions
   - CTA button clicks
   - Responsive layout (resize browser)
   - Autoplay fallback (if blocked)

### Step 8: Test Edge Cases

- [ ] Empty `slides.yml` file → Carousel should be hidden
- [ ] Missing `slides.yml` file → Carousel should be hidden
- [ ] Single valid slide → Display without transitions/looping
- [ ] Invalid slide entries → Should be skipped silently
- [ ] Missing video files → Should show poster or fallback
- [ ] Missing poster images → Should use solid color fallback
- [ ] Browser autoplay restrictions → Should show play button
- [ ] Very long headlines → Should wrap appropriately
- [ ] Many slides (10+) → Should cycle through all slides
- [ ] Mobile devices → Should scale appropriately

## File Structure

After implementation:

```
_data/
└── slides.yml                    # Slide data file

_includes/
└── video-carousel.html           # Carousel include file

assets/
├── videos/                       # Video files
│   ├── slide1.mp4
│   ├── slide2.mp4
│   └── slide3.mp4
└── images/
    └── posters/                  # Poster images (optional)
        ├── slide1.jpg
        ├── slide2.jpg
        └── slide3.jpg

_layouts/
└── default.html                  # Modified: Added carousel include
```

## CSS Styling

All CSS is inline within `_includes/video-carousel.html`. See `contracts/css-styling-contract.md` for complete styling specifications.

**Key CSS Classes**:
- `.video-carousel` - Main container
- `.carousel-slide` - Individual slide
- `.carousel-slide.active` - Active/visible slide
- `.carousel-video` - Video element
- `.carousel-overlay` - Gradient overlay
- `.carousel-content` - Content wrapper
- `.carousel-headline` - Headline text
- `.carousel-cta` - CTA button
- `.carousel-play-button` - Play button (fallback)

## JavaScript Implementation

All JavaScript is inline within `_includes/video-carousel.html`. See `contracts/js-api-contract.md` for complete JavaScript API.

**Key Functions**:
- `initializeCarousel()` - Initialize carousel
- `validateSlide()` - Validate slide elements
- `showSlide()` - Display specific slide
- `nextSlide()` - Advance to next slide
- `setupVideoAutoplay()` - Handle video autoplay

## Common Issues

### Carousel Not Appearing

**Problem**: Carousel doesn't appear on page.

**Solutions**:
1. Check if `slides.yml` exists and has data
2. Verify YAML syntax is correct (proper indentation, no syntax errors)
3. Check Jekyll build output for errors
4. Verify conditional rendering: `{% if site.data.slides %}`
5. Check browser console for JavaScript errors

### Videos Not Autoplaying

**Problem**: Videos don't autoplay.

**Solutions**:
1. Verify video elements have `autoplay`, `muted`, `loop`, `playsinline` attributes
2. Check browser autoplay policies (some browsers block autoplay)
3. Verify videos are muted (required for autoplay)
4. Check if play button appears (indicates autoplay was blocked)
5. Test in different browsers

### Transitions Not Working

**Problem**: Slide transitions don't work smoothly.

**Solutions**:
1. Verify CSS transitions are applied (check `transition` property)
2. Check that only one slide has `active` class at a time
3. Verify JavaScript is initializing carousel correctly
4. Check browser console for JavaScript errors
5. Verify timer is starting correctly

### Videos Not Loading

**Problem**: Videos don't load or display.

**Solutions**:
1. Verify video file paths are correct (relative to site root, start with "/")
2. Check that video files exist in `assets/videos/` directory
3. Verify video file format is MP4
4. Check Jekyll build output for missing asset warnings
5. Verify `relative_url` filter is applied: `{{ slide.video | relative_url }}`
6. Check browser network tab for 404 errors

### Responsive Issues

**Problem**: Carousel doesn't adapt to different screen sizes.

**Solutions**:
1. Verify CSS media queries are present (768px, 1024px breakpoints)
2. Check that video elements use `object-fit: cover`
3. Verify text sizes adjust for mobile devices
4. Test on actual mobile devices, not just browser resize
5. Check that container height is responsive

### YAML Syntax Errors

**Problem**: Jekyll build fails with YAML errors.

**Solutions**:
1. Check indentation (YAML is space-sensitive)
2. Verify all strings are properly quoted if they contain special characters
3. Check for trailing commas (not allowed in YAML)
4. Validate YAML syntax using online validator or `yamllint`
5. Verify required fields are present for each slide

## Performance Optimization

### Video Optimization

- Compress videos for web (use tools like HandBrake, FFmpeg)
- Recommended bitrate: 2-5 Mbps for 1080p
- Use H.264 codec for maximum compatibility
- Consider multiple resolutions (responsive video)

### Loading Strategy

- Poster images load immediately (fast initial display)
- Videos load progressively in background
- Use `preload="metadata"` for faster initial load
- Consider lazy loading for videos below the fold

### CSS/JS Optimization

- All CSS/JS is inline (no external requests)
- Minify CSS/JS if needed (for production)
- Use efficient selectors
- Avoid expensive CSS properties in transitions

## Next Steps

After implementation:

1. **Add Slide Data**: Populate `slides.yml` with actual slide content
2. **Add Videos**: Add video files to `assets/videos/` directory
3. **Add Posters**: Add poster images to `assets/images/posters/` (optional)
4. **Test Responsively**: Verify layout works on mobile, tablet, and desktop
5. **Validate Accessibility**: Test with screen reader and keyboard navigation
6. **Optimize Videos**: Compress videos for fast loading
7. **Deploy**: Commit changes and push to GitHub Pages

## Related Documentation

- **Data Model**: `data-model.md`
- **Research**: `research.md`
- **Include Contract**: `contracts/video-carousel-include-contract.md`
- **CSS Contract**: `contracts/css-styling-contract.md`
- **JavaScript API**: `contracts/js-api-contract.md`
- **Data Schema**: `contracts/slides-data-schema.json`

