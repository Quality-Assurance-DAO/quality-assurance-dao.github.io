# Tasks: Responsive Autoplay Video Carousel

**Feature**: 009-video-carousel  
**Branch**: `009-video-carousel`  
**Date**: 2024-12-19  
**Status**: Ready for Implementation

## Overview

This document breaks down the implementation of the Responsive Autoplay Video Carousel feature into actionable, dependency-ordered tasks. Tasks are organized by user story to enable independent implementation and testing.

## Implementation Strategy

**MVP Scope**: User Story 1 (View Video Carousel with Content) provides the core user-facing value and should be completed first.

**Incremental Delivery**:
1. **Phase 1-2**: Setup and foundational tasks (data structure, directory setup)
2. **Phase 3**: User Story 1 - Core carousel functionality with autoplay videos
3. **Phase 4**: User Story 2 - Responsive design and mobile scaling
4. **Phase 5**: User Story 3 - Fallbacks and edge case handling
5. **Phase 6**: Polish and cross-cutting concerns

## Dependencies

### User Story Completion Order

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational)
    ↓
Phase 3 (US1: View Video Carousel with Content) ← MVP
    ↓
Phase 4 (US2: Responsive Video Carousel Display)
    ↓
Phase 5 (US3: Video Carousel Interactions and Fallbacks)
    ↓
Phase 6 (Polish)
```

**Note**: User Story 1 (P1) must be completed first as it provides the core carousel functionality. User Story 2 (P2) ensures responsive behavior across devices. User Story 3 (P3) adds reliability and fallback handling.

## Parallel Execution Opportunities

### Within User Story 1 (Phase 3)
- **T006-T009**: Can be parallelized (HTML structure elements - slide iteration, video, overlay, content)
- **T010-T017**: Can be parallelized (CSS styling tasks - container, slides, video, overlay, content, headline, CTA)
- **T018-T027**: Can be parallelized (JavaScript functions - initialization, validation, carousel logic, autoplay)

### Within User Story 2 (Phase 4)
- **T029-T031**: Can be parallelized (responsive styles for mobile, tablet, desktop breakpoints)

### Within User Story 3 (Phase 5)
- **T033-T035**: Can be parallelized (poster support, play button HTML, play button CSS)
- **T036-T038**: Can be parallelized (event handlers for autoplay, error, play events)

## Phase 1: Setup

**Goal**: Initialize project structure and prepare for carousel implementation.

### Story Goal
N/A - Setup phase

### Independent Test Criteria
- Data file structure is ready for slide entries
- Video assets directory exists
- Layout file is ready for carousel integration

### Tasks

- [ ] T001 [P] Create slides data file structure in _data/slides.yml with YAML array format
- [ ] T002 [P] Create video assets directory structure at assets/videos/ for MP4 files
- [ ] T003 [P] Create poster images directory structure at assets/images/posters/ for optional poster images

---

## Phase 2: Foundational

**Goal**: Implement core data structure and basic include file that blocks all user stories.

### Story Goal
N/A - Foundational phase

### Independent Test Criteria
- Slides data file follows schema with required fields (video, headline, cta_label, cta_link)
- Include file structure exists with conditional rendering
- Basic HTML structure is in place

### Tasks

- [ ] T004 [P] Create video carousel include file structure in _includes/video-carousel.html with conditional rendering {% if site.data.slides %}
- [ ] T005 [P] Implement basic HTML structure in _includes/video-carousel.html with carousel container, slide wrapper, and semantic elements

---

## Phase 3: User Story 1 - View Video Carousel with Content (P1)

**Goal**: As a website visitor, I want to view an autoplaying video carousel that displays multiple slides, each containing a background video, headline text, and a call-to-action button, so that I can see engaging visual content with automatic transitions.

**Why this priority**: This is the core functionality - displaying video content with text overlays in an autoplaying carousel format. Without this, the feature cannot deliver value.

### Independent Test Criteria
- Carousel displays when slides.yml has valid slide entries
- Videos autoplay in background (muted, looping)
- Headlines and CTA buttons are visible over videos
- Carousel automatically transitions between slides with fade effects
- Carousel loops back to first slide after last slide

### Tasks

- [ ] T006 [US1] Implement slide iteration loop in _includes/video-carousel.html to render slides from site.data.slides with validation check
- [ ] T007 [US1] Implement video element structure in _includes/video-carousel.html with autoplay, muted, loop, playsinline attributes and source element
- [ ] T008 [US1] Implement gradient overlay div in _includes/video-carousel.html with class carousel-overlay positioned over video
- [ ] T009 [US1] Implement content wrapper structure in _includes/video-carousel.html with headline (h2.carousel-headline) and CTA link (a.carousel-cta) displaying slide data
- [ ] T010 [US1] Implement CSS container styles in _includes/video-carousel.html for .video-carousel with position relative, width 100%, height 600px, overflow hidden
- [ ] T011 [US1] Implement CSS slide styles in _includes/video-carousel.html for .carousel-slide with absolute positioning, opacity 0, transition opacity 0.8s ease-in-out
- [ ] T012 [US1] Implement CSS active slide styles in _includes/video-carousel.html for .carousel-slide.active with opacity 1, z-index 1
- [ ] T013 [US1] Implement CSS video styles in _includes/video-carousel.html for .carousel-video with absolute positioning, width/height 100%, object-fit cover
- [ ] T014 [US1] Implement CSS overlay styles in _includes/video-carousel.html for .carousel-overlay with linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%), z-index 1, pointer-events none
- [ ] T015 [US1] Implement CSS content styles in _includes/video-carousel.html for .carousel-content with absolute positioning, bottom 4rem, left 50%, transform translateX(-50%), z-index 2, text-align center
- [ ] T016 [US1] Implement CSS headline styles in _includes/video-carousel.html for .carousel-headline with color #ffffff, font-size 2.5rem, font-weight 600, text-shadow
- [ ] T017 [US1] Implement CSS CTA button styles in _includes/video-carousel.html for .carousel-cta with display inline-block, padding, background-color, color, border-radius, transition
- [ ] T018 [US1] Implement JavaScript IIFE wrapper in _includes/video-carousel.html with 'use strict' to prevent global scope pollution
- [ ] T019 [US1] Implement DOM ready detection in _includes/video-carousel.html to call initializeCarousel when DOM is ready
- [ ] T020 [US1] Implement initializeCarousel function in _includes/video-carousel.html to get carousel container, query slides, filter valid slides
- [ ] T021 [US1] Implement validateSlide function in _includes/video-carousel.html to check for video source, headline text, CTA href and text content
- [ ] T022 [US1] Implement showSingleSlide function in _includes/video-carousel.html to display single slide without carousel behavior (add active class only)
- [ ] T023 [US1] Implement startCarousel function in _includes/video-carousel.html to initialize carousel with multiple slides, show first slide, setup autoplay
- [ ] T024 [US1] Implement showSlide function in _includes/video-carousel.html to hide current slide, show new slide, start timer immediately using data-duration attribute (default 5000ms)
- [ ] T025 [US1] Implement nextSlide function in _includes/video-carousel.html to advance to next slide index, loop back to 0 after last slide, call showSlide
- [ ] T026 [US1] Implement timer management in _includes/video-carousel.html with slideTimer variable, clearTimeout on transitions, setTimeout for next slide
- [ ] T027 [US1] Implement setupVideoAutoplay function in _includes/video-carousel.html to attempt video.play(), handle promise rejection for autoplay blocking
- [ ] T028 [US1] Add carousel include to _layouts/default.html in appropriate location (typically after hero section, before main content)

---

## Phase 4: User Story 2 - Responsive Video Carousel Display (P2)

**Goal**: As a website visitor, I want the video carousel to adapt to different screen sizes, maintaining video quality and text readability across mobile, tablet, and desktop devices.

**Why this priority**: Ensures the feature works well for all users regardless of device, maintaining the engaging visual experience across all screen sizes.

### Independent Test Criteria
- Carousel adapts to mobile screens (< 768px) with appropriate video scaling and text sizes
- Carousel adapts to tablet screens (768px - 1024px) with appropriate sizing
- Carousel adapts to desktop screens (> 1024px) with full quality display
- Videos maintain aspect ratio on all screen sizes
- Text remains readable on all screen sizes

### Tasks

- [ ] T029 [US2] Implement mobile responsive styles in _includes/video-carousel.html with @media (max-width: 767px) for container height 400px, content bottom 2rem padding 1rem, headline font-size 1.5rem, CTA padding 0.75rem 1.5rem font-size 0.9rem
- [ ] T030 [US2] Implement tablet responsive styles in _includes/video-carousel.html with @media (min-width: 768px) and (max-width: 1024px) for container height 500px, content bottom 3rem padding 1.5rem, headline font-size 2rem, CTA padding 0.875rem 1.75rem font-size 1rem
- [ ] T031 [US2] Implement desktop responsive styles in _includes/video-carousel.html with @media (min-width: 1025px) for container height 600px, content bottom 4rem padding 2rem, headline font-size 2.5rem, CTA padding 1rem 2rem font-size 1.1rem
- [ ] T032 [US2] Verify video object-fit cover maintains aspect ratio in _includes/video-carousel.html CSS for .carousel-video across all breakpoints

---

## Phase 5: User Story 3 - Video Carousel Interactions and Fallbacks (P3)

**Goal**: As a website visitor, I want the carousel to provide graceful fallbacks when videos fail to load, support optional poster images, and maintain smooth transitions even when videos are loading.

**Why this priority**: Ensures reliability and user experience even when content fails to load, but is not essential for basic functionality.

### Independent Test Criteria
- Poster images display when video is loading or when poster attribute is present
- Missing video files handled gracefully with poster or solid color fallback
- Autoplay restrictions detected and play button shown when autoplay blocked
- Video errors handled gracefully without breaking carousel
- Carousel continues functioning when videos are loading slowly

### Tasks

- [ ] T033 [US3] Implement poster image support in _includes/video-carousel.html Liquid template with conditional poster attribute {% if slide.poster %}poster="{{ slide.poster | relative_url }}"{% endif %}
- [ ] T034 [US3] Implement play button HTML structure in _includes/video-carousel.html with button.carousel-play-button, aria-label, display none by default
- [ ] T035 [US3] Implement play button CSS styles in _includes/video-carousel.html for .carousel-play-button with absolute positioning centered, circular button, semi-transparent white background, z-index 3
- [ ] T036 [US3] Implement play button click handler in _includes/video-carousel.html setupVideoAutoplay function to show button when autoplay blocked, add click listener to start video and hide button
- [ ] T037 [US3] Implement video error event handler in _includes/video-carousel.html setupVideoAutoplay function to show play button when video fails to load
- [ ] T038 [US3] Implement video play event handler in _includes/video-carousel.html setupVideoAutoplay function to hide play button when video starts playing
- [ ] T039 [US3] Implement fallback background color in _includes/video-carousel.html CSS for .video-carousel when videos fail to load

---

## Phase 6: Polish & Cross-Cutting Concerns

**Goal**: Finalize implementation with accessibility, performance optimizations, and edge case handling.

### Story Goal
N/A - Polish phase

### Independent Test Criteria
- All accessibility requirements met (ARIA labels, keyboard navigation, focus states)
- Performance optimizations applied (will-change, efficient transitions)
- Edge cases handled (empty data, single slide, invalid entries, missing files)
- Theme compatibility verified

### Tasks

- [ ] T040 Add aria-label attribute to carousel container in _includes/video-carousel.html section element
- [ ] T041 Add aria-label attribute to play button in _includes/video-carousel.html button element
- [ ] T042 Implement focus states in _includes/video-carousel.html CSS for .carousel-cta:focus and .carousel-play-button:focus with 2px outline and outline-offset
- [ ] T043 Add will-change opacity property to _includes/video-carousel.html CSS for .carousel-slide to optimize transitions
- [ ] T044 Verify conditional rendering handles empty slides.yml in _includes/video-carousel.html with {% if site.data.slides %} check
- [ ] T045 Verify single slide handling in _includes/video-carousel.html initializeCarousel function to call showSingleSlide when validSlides.length === 1
- [ ] T046 Verify invalid slide filtering in _includes/video-carousel.html validateSlide function to skip entries missing required fields
- [ ] T047 Test carousel with missing video files to verify poster image or fallback background displays correctly
- [ ] T048 Verify theme compatibility in _includes/video-carousel.html CSS to ensure carousel works with existing dark/light theme system
- [ ] T049 Add data-duration attribute to slide divs in _includes/video-carousel.html Liquid template with {{ slide.duration | default: 5 }} for timer duration
- [ ] T050 Verify relative_url filter usage in _includes/video-carousel.html for all video and poster paths to ensure correct Jekyll asset paths

---

## Summary

**Total Tasks**: 50

**Task Count by Phase**:
- Phase 1 (Setup): 3 tasks
- Phase 2 (Foundational): 2 tasks
- Phase 3 (User Story 1): 23 tasks
- Phase 4 (User Story 2): 4 tasks
- Phase 5 (User Story 3): 7 tasks
- Phase 6 (Polish): 11 tasks

**Parallel Opportunities Identified**:
- Within US1: T006-T009 (HTML structure elements), T010-T017 (CSS styling tasks), T018-T027 (JavaScript functions)
- Within US2: T029-T031 (responsive styles for mobile, tablet, desktop)
- Within US3: T033-T035 (poster support, play button HTML/CSS), T036-T038 (event handlers)

**Independent Test Criteria**:
- **US1**: Carousel displays with autoplay videos, transitions, and looping
- **US2**: Carousel adapts responsively to mobile, tablet, and desktop
- **US3**: Carousel handles fallbacks gracefully (posters, errors, autoplay restrictions)

**Suggested MVP Scope**: Phase 1-3 (Setup, Foundational, and User Story 1) provides complete core carousel functionality with autoplay videos, transitions, and basic styling.

**Format Validation**: All tasks follow the checklist format with checkbox, Task ID, optional [P] marker, optional [Story] label, and file path in description.

