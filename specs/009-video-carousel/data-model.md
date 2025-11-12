# Data Model: Responsive Autoplay Video Carousel

**Phase**: 1 - Design & Contracts  
**Date**: 2024-12-19  
**Feature**: 009-video-carousel

## Overview

This feature adds a Slide data entity for the video carousel component. Slides represent individual carousel items containing video content, headline text, and call-to-action information.

## Entities

### Slide

Represents a single carousel slide containing video content, headline text, and CTA information.

**Location**: `_data/slides.yml`

**Schema**:

```yaml
- video: string                  # REQUIRED: Video file path (relative to site root)
  headline: string              # REQUIRED: Text headline to display
  cta_label: string             # REQUIRED: Text for CTA button
  cta_link: string              # REQUIRED: URL for CTA button
  poster: string                # OPTIONAL: Poster image path (relative to site root)
  duration: number              # OPTIONAL: Display duration in seconds (default: 5)
```

**Field Details**:

- **video** (required): Path to video file relative to site root
  - Format: `/assets/videos/filename.mp4`
  - Must be valid path to MP4 video file
  - Used as `src` attribute for HTML5 `<video>` element
  - Example: `/assets/videos/welcome-slide.mp4`

- **headline** (required): Text headline displayed over the video
  - Plain text or HTML (if HTML, must be properly escaped)
  - Displayed prominently over video with gradient overlay
  - Should be concise for readability
  - Example: "Welcome to QADAO"

- **cta_label** (required): Text label for the call-to-action button
  - Plain text
  - Displayed on CTA button
  - Should be action-oriented (e.g., "Learn More", "Get Started", "Explore")
  - Example: "Learn More"

- **cta_link** (required): URL for the CTA button
  - Can be relative path (e.g., `/about`) or absolute URL (e.g., `https://example.com`)
  - Used as `href` attribute for CTA button link
  - Should be valid URL
  - Example: `/about` or `https://qadao.org/about`

- **poster** (optional): Path to poster image displayed while video loads or as fallback
  - Format: `/assets/images/posters/filename.jpg` (or .png, .webp)
  - Used as `poster` attribute for HTML5 `<video>` element
  - Displayed when video is loading, blocked, or fails to load
  - If missing, solid color background used as fallback
  - Example: `/assets/images/posters/welcome-slide.jpg`

- **duration** (optional): Display duration in seconds before transitioning to next slide
  - Integer or float (e.g., `5` or `5.5`)
  - Default: `5` seconds if not specified
  - Timer starts immediately when slide becomes visible (regardless of video load state)
  - Minimum recommended: 3 seconds
  - Maximum recommended: 10 seconds
  - Example: `5` (5 seconds)

**Validation Rules**:

1. **Required Fields**: Every slide MUST have `video`, `headline`, `cta_label`, `cta_link`
2. **Data Types**: 
   - `video`, `headline`, `cta_label`, `cta_link`, `poster` → strings
   - `duration` → number (integer or float)
3. **Path Format**: All paths (video, poster) must be relative to site root (start with "/")
4. **URL Format**: `cta_link` must be valid URL (relative or absolute)
5. **Duration Range**: `duration` should be between 3 and 10 seconds (if specified)
6. **Invalid Entries**: Slides missing any required field are silently skipped

**State Transitions**: N/A (static data, no state machine)

### Slides Dataset

Represents the YAML file containing slide entries.

**Location**: `_data/slides.yml`

**Structure**: YAML array of Slide objects

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

**Access Pattern**: In Jekyll templates, accessed via `site.data.slides`

**Conditional Rendering**: 
- If file is empty, missing, or contains no valid entries → carousel is hidden
- Use `{% if site.data.slides %}` before rendering carousel
- If only one valid slide exists → display without carousel behavior (no transitions, no looping)

**Relationships**: Slides Dataset contains zero or more Slide objects. Each Slide belongs to exactly one Dataset.

### Carousel Component

Visual representation of slides in the layout template.

**Not a data entity** - this is a presentation layer concept.

**Structure**:
- Container: `<section class="video-carousel">`
- Slide wrapper: `<div class="carousel-slide">` (one per slide)
- Video element: `<video>` with attributes: `autoplay`, `muted`, `loop`, `playsinline`
- Gradient overlay: `<div class="carousel-overlay">` (CSS gradient)
- Content wrapper: `<div class="carousel-content">`
- Headline: `<h2 class="carousel-headline">{{ slide.headline }}</h2>`
- CTA button: `<a href="{{ slide.cta_link }}" class="carousel-cta">{{ slide.cta_label }}</a>`
- Play button (fallback): `<button class="carousel-play-button">` (shown when autoplay blocked)

**Rendering Rules**:
- Only one slide visible at a time (others have `opacity: 0`)
- Active slide has `active` class and `opacity: 1`
- Slides transition with CSS opacity fade (0.8s duration)
- Timer starts immediately when slide becomes visible
- Carousel loops back to first slide after last slide
- Single slide: no transitions, no looping, no timer
- Invalid slides are filtered out before rendering

**CSS Classes Used**:
- `.video-carousel` - Main carousel container
- `.carousel-slide` - Individual slide wrapper
- `.carousel-slide.active` - Active/visible slide
- `.carousel-video` - Video element styling
- `.carousel-overlay` - Gradient overlay
- `.carousel-content` - Content wrapper (headline + CTA)
- `.carousel-headline` - Headline text styling
- `.carousel-cta` - CTA button styling
- `.carousel-play-button` - Play button (autoplay fallback)

## Relationships

```
Slides Dataset (1) ──contains──> (0..*) Slide
Slide (1) ──rendered as──> (1) Carousel Slide (presentation)
Carousel Component (1) ──displays──> (1..*) Slide
```

## Data Access Patterns

### Jekyll Template Access

```liquid
{% if site.data.slides %}
  <section class="video-carousel" id="video-carousel">
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
{% endif %}
```

### Conditional Field Rendering

- Video: Required, always rendered
- Poster: Only if `slide.poster` exists
- Duration: Defaults to 5 seconds if not specified
- Headline: Required, always rendered
- CTA: Required, always rendered (button with label and link)

### Slide Validation

```javascript
function validateSlide(slide) {
  return slide.video && 
         slide.headline && 
         slide.cta_label && 
         slide.cta_link;
}

// Filter valid slides
const validSlides = site.data.slides.filter(validateSlide);
```

## Data Validation

### Required Field Validation

```ruby
# Pseudocode
def validate_slide(slide)
  errors = []
  errors << "Missing 'video'" unless slide['video']
  errors << "Missing 'headline'" unless slide['headline']
  errors << "Missing 'cta_label'" unless slide['cta_label']
  errors << "Missing 'cta_link'" unless slide['cta_link']
  errors
end
```

### Path Format Validation

```ruby
# Pseudocode
def validate_path(path)
  return [] unless path  # Optional field
  path.start_with?('/') ? [] : ["Path must be relative to site root: #{path}"]
end
```

### Duration Validation

```ruby
# Pseudocode
def validate_duration(duration)
  return [] unless duration  # Optional field
  (duration.is_a?(Numeric) && duration >= 3 && duration <= 10) ? [] : 
    ["Duration must be between 3 and 10 seconds: #{duration}"]
end
```

## Example Data

### Minimal Slide Entry

```yaml
- video: /assets/videos/slide1.mp4
  headline: "Welcome"
  cta_label: "Learn More"
  cta_link: /about
```

### Full Slide Entry

```yaml
- video: /assets/videos/welcome-slide.mp4
  headline: "Welcome to QADAO - Decentralized Quality Assurance"
  cta_label: "Explore Our Services"
  cta_link: /services
  poster: /assets/images/posters/welcome-slide.jpg
  duration: 6
```

### Multiple Slides

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

## Edge Cases

### Empty or Missing slides.yml

- Carousel should not render
- Use conditional: `{% if site.data.slides %}`

### Single Valid Slide

- Display slide without carousel behavior
- No fade transitions
- No looping
- No timer

### Invalid Slide Entries

- Skip entries missing any required field
- Continue displaying valid slides
- Silent skip (no error messages)

### Missing Video Files

- Display poster image if available
- Otherwise, use solid color background
- Headline and CTA still visible

### Autoplay Blocked

- Show poster image with visible play button
- User clicks play button to start video
- Carousel continues after user interaction

