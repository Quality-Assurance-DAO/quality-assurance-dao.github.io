# JavaScript API Contract: Video Carousel

**Feature**: 009-video-carousel  
**Date**: 2024-12-19  
**File**: `_includes/video-carousel.html` (inline JavaScript)

## Overview

This contract defines the JavaScript API for the video carousel component. All JavaScript must be inline within the include file, using vanilla JavaScript (no external frameworks).

## Code Structure

### IIFE Wrapper

All code must be wrapped in an Immediately Invoked Function Expression (IIFE) to prevent global scope pollution:

```javascript
(function() {
  'use strict';
  // Carousel code
})();
```

## Initialization

### DOM Ready Detection

```javascript
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCarousel);
} else {
  initializeCarousel();
}
```

### Carousel Initialization

```javascript
function initializeCarousel() {
  const carousel = document.getElementById('video-carousel');
  if (!carousel) return;
  
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const validSlides = slides.filter(validateSlide);
  
  if (validSlides.length === 0) {
    // No valid slides, hide carousel
    return;
  }
  
  if (validSlides.length === 1) {
    // Single slide: no carousel behavior
    showSingleSlide(validSlides[0]);
    return;
  }
  
  // Multiple slides: full carousel behavior
  startCarousel(validSlides);
}
```

## Slide Validation

### validateSlide(slide)

Validates that a slide element has all required data attributes and child elements.

**Parameters**:
- `slide` (HTMLElement): Slide DOM element

**Returns**: `boolean` - `true` if slide is valid, `false` otherwise

**Required Elements**:
- Video element with `src` attribute
- Headline element with text content
- CTA link with `href` attribute and text content

**Implementation**:
```javascript
function validateSlide(slide) {
  const video = slide.querySelector('.carousel-video source');
  const headline = slide.querySelector('.carousel-headline');
  const cta = slide.querySelector('.carousel-cta');
  
  return video && 
         video.getAttribute('src') && 
         headline && 
         headline.textContent.trim() && 
         cta && 
         cta.getAttribute('href') && 
         cta.textContent.trim();
}
```

## Single Slide Mode

### showSingleSlide(slide)

Displays a single slide without carousel behavior (no transitions, no looping, no timer).

**Parameters**:
- `slide` (HTMLElement): Slide DOM element to display

**Behavior**:
- Add `active` class to slide
- No timer initialization
- No transition effects
- Video autoplay still attempted

**Implementation**:
```javascript
function showSingleSlide(slide) {
  slide.classList.add('active');
  setupVideoAutoplay(slide);
}
```

## Carousel Mode

### startCarousel(slides)

Initializes carousel behavior for multiple slides.

**Parameters**:
- `slides` (Array<HTMLElement>): Array of valid slide elements

**Behavior**:
- Show first slide
- Initialize timer
- Setup autoplay detection
- Setup event listeners

**Implementation**:
```javascript
let currentSlideIndex = 0;
let slideTimer = null;

function startCarousel(slides) {
  // Show first slide
  showSlide(0, slides);
  
  // Setup autoplay detection for all slides
  slides.forEach(slide => {
    setupVideoAutoplay(slide);
  });
}
```

### showSlide(index, slides)

Displays a specific slide and starts the timer.

**Parameters**:
- `index` (number): Index of slide to show
- `slides` (Array<HTMLElement>): Array of all slide elements

**Behavior**:
- Hide current slide (remove `active` class)
- Show new slide (add `active` class)
- Start timer immediately (regardless of video state)
- Timer duration from `data-duration` attribute or default 5 seconds

**Implementation**:
```javascript
function showSlide(index, slides) {
  // Hide current slide
  if (slides[currentSlideIndex]) {
    slides[currentSlideIndex].classList.remove('active');
  }
  
  // Update index
  currentSlideIndex = index;
  
  // Show new slide
  const slide = slides[currentSlideIndex];
  slide.classList.add('active');
  
  // Start timer immediately
  clearTimeout(slideTimer);
  const duration = parseInt(slide.dataset.duration) || 5000; // Default 5 seconds
  slideTimer = setTimeout(() => {
    nextSlide(slides);
  }, duration);
}
```

### nextSlide(slides)

Advances to the next slide, looping back to first slide after last.

**Parameters**:
- `slides` (Array<HTMLElement>): Array of all slide elements

**Behavior**:
- Increment slide index
- Loop back to 0 if past last slide
- Call `showSlide()` with new index

**Implementation**:
```javascript
function nextSlide(slides) {
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  showSlide(currentSlideIndex, slides);
}
```

## Video Autoplay Handling

### setupVideoAutoplay(slide)

Sets up autoplay detection and fallback for a video element.

**Parameters**:
- `slide` (HTMLElement): Slide DOM element containing video

**Behavior**:
- Attempt to play video
- Detect if autoplay was blocked
- Show play button if autoplay fails
- Handle video error events

**Implementation**:
```javascript
function setupVideoAutoplay(slide) {
  const video = slide.querySelector('.carousel-video');
  const playButton = slide.querySelector('.carousel-play-button');
  
  if (!video) return;
  
  // Attempt autoplay
  const playPromise = video.play();
  
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        // Autoplay succeeded
        if (playButton) {
          playButton.style.display = 'none';
        }
      })
      .catch(() => {
        // Autoplay was prevented
        if (playButton) {
          playButton.style.display = 'block';
          playButton.addEventListener('click', () => {
            video.play();
            playButton.style.display = 'none';
          });
        }
      });
  }
  
  // Handle video errors
  video.addEventListener('error', () => {
    // Video failed to load, show poster/fallback
    if (playButton) {
      playButton.style.display = 'block';
    }
  });
  
  // Hide play button when video starts playing
  video.addEventListener('play', () => {
    if (playButton) {
      playButton.style.display = 'none';
    }
  });
}
```

## Event Handling

### Video Events

**play**: Video starts playing
- Hide play button
- Ensure carousel continues normally

**error**: Video fails to load
- Show play button (if available)
- Display poster image or fallback
- Continue carousel with other slides

**loadeddata**: Video data loaded
- Video is ready to play
- May trigger autoplay

### User Interactions

**Play Button Click**: User clicks play button
- Start video playback
- Hide play button
- Continue carousel normally

**CTA Link Click**: User clicks CTA button
- Navigate to link (normal browser behavior)
- Carousel continues in background

## Timer Management

### Timer Behavior

- Timer starts immediately when slide becomes visible
- Timer duration from `data-duration` attribute (default: 5000ms)
- Timer is cleared when transitioning to next slide
- Timer is cleared when carousel is stopped

### Timer Implementation

```javascript
let slideTimer = null;

function startTimer(slide, callback) {
  clearTimeout(slideTimer);
  const duration = parseInt(slide.dataset.duration) || 5000;
  slideTimer = setTimeout(callback, duration);
}

function clearTimer() {
  if (slideTimer) {
    clearTimeout(slideTimer);
    slideTimer = null;
  }
}
```

## State Management

### Current Slide Index

```javascript
let currentSlideIndex = 0;
```

- Tracks currently visible slide
- Updated when transitioning between slides
- Used to determine next slide

### Slide Timer

```javascript
let slideTimer = null;
```

- Stores timeout ID for current slide timer
- Cleared when transitioning or stopping carousel
- Used to prevent multiple timers running

## Error Handling

### Missing Elements

- Check for carousel container before initialization
- Check for slide elements before processing
- Gracefully handle missing video/headline/CTA elements

### Video Errors

- Handle video load failures
- Show fallback (poster image or solid color)
- Continue carousel with other slides

### Browser Compatibility

- Check for video element support
- Check for autoplay support
- Provide fallbacks for unsupported features

## Performance Considerations

### Optimization

- Use `requestAnimationFrame` for smooth transitions (if needed)
- Debounce resize events
- Avoid unnecessary DOM queries (cache elements)
- Use event delegation where possible

### Memory Management

- Clear timers when carousel is destroyed
- Remove event listeners when not needed
- Avoid memory leaks from closures

## Accessibility

### Keyboard Navigation

- CTA links must be keyboard accessible
- Play button must be keyboard accessible
- Focus management for screen readers

### ARIA Attributes

- Update `aria-live` region when slides change (if needed)
- Ensure play button has descriptive `aria-label`
- Ensure video elements have appropriate labels

## Testing Checklist

### Functionality

- [ ] Carousel initializes correctly with multiple slides
- [ ] Single slide displays without carousel behavior
- [ ] Timer starts immediately on slide visibility
- [ ] Transitions work smoothly between slides
- [ ] Carousel loops back to first slide after last
- [ ] Autoplay works when allowed
- [ ] Play button appears when autoplay blocked
- [ ] Video errors handled gracefully

### Edge Cases

- [ ] Empty slides array handled
- [ ] Invalid slides filtered correctly
- [ ] Missing video files handled
- [ ] Missing poster images handled
- [ ] Browser autoplay restrictions handled
- [ ] Timer cleared correctly on transitions

## Related Documentation

- **Include Contract**: `video-carousel-include-contract.md`
- **CSS Contract**: `css-styling-contract.md`
- **Data Model**: `/specs/009-video-carousel/data-model.md`

