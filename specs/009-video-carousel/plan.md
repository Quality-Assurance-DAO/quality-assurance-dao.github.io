# Implementation Plan: Responsive Autoplay Video Carousel

**Branch**: `009-video-carousel` | **Date**: 2024-12-19 | **Spec**: `/specs/009-video-carousel/spec.md`
**Input**: Feature specification from `/specs/009-video-carousel/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a responsive three-slide autoplay video carousel that dynamically loads slide data from `_data/slides.yml`. Each slide contains a background video (HTML5 `<video>` with autoplay, muted, loop, playsinline), headline text, and CTA button. The carousel uses smooth CSS opacity transitions and lightweight vanilla JavaScript (no external frameworks). Features include semi-transparent dark gradient overlay for text readability, responsive mobile scaling, graceful fallbacks for missing videos, and optional poster images. Optimized for GitHub Pages with Jekyll data conventions.

## Technical Context

**Language/Version**: Jekyll (Ruby-based static site generator), Liquid templating engine, HTML5, CSS3, Vanilla JavaScript (ES6+)  
**Primary Dependencies**: Jekyll, GitHub Pages (hosting), HTML5 video API, CSS transitions  
**Storage**: YAML data files in `_data/` directory (slides.yml), video files in `/assets/videos/` directory  
**Testing**: Manual browser testing, Jekyll build validation, YAML schema validation, cross-browser compatibility testing  
**Target Platform**: GitHub Pages (web, static HTML/CSS/JS), modern browsers with HTML5 video support  
**Project Type**: web (static site)  
**Performance Goals**: Carousel displays within 3 seconds of page load, fade transitions complete in under 1 second, videos load progressively with poster images showing immediately  
**Constraints**: Must work within Jekyll static site framework, maintain GitHub Pages compatibility, use lightweight vanilla JavaScript (no external frameworks), handle browser autoplay restrictions gracefully, maintain accessibility (WCAG AA), support dark/light theme system, videos must be compressed/optimized for web  
**Scale/Scope**: Single carousel component on main page, one new YAML data file (slides.yml), one new include file for carousel template, minimal CSS additions, lightweight JavaScript file

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASS (Pre-Phase 0) → ✅ PASS (Post-Phase 1)

**Pre-Phase 0 Review**: The constitution file (`.specify/memory/constitution.md`) appears to be a template and has not been customized for this project. However, based on standard development practices:

- **Simplicity**: This feature follows existing patterns (reuses include pattern, follows established YAML schema conventions, uses vanilla JavaScript)
- **Consistency**: Uses standardized data file pattern (`_data/slides.yml`), matches existing include pattern (`_includes/`), follows Jekyll conventions
- **Maintainability**: Minimal code changes, data-driven approach via YAML file, lightweight JavaScript without external dependencies
- **Accessibility**: Maintains WCAG AA compliance with proper text contrast, keyboard navigation support, and semantic HTML
- **Performance**: Optimized for fast load times with compressed videos, progressive loading, and poster images
- **Browser Compatibility**: Handles autoplay restrictions gracefully, uses standard HTML5 video attributes

**Post-Phase 1 Review**: After completing design and contracts:

- ✅ **No new dependencies introduced** - Uses existing Jekyll, Liquid, HTML5, CSS3, Vanilla JavaScript
- ✅ **No architectural changes** - Follows established include pattern
- ✅ **Self-contained component** - HTML, CSS, JS in single include file (matches animated-header.html pattern)
- ✅ **Data-driven approach** - All content managed via YAML file
- ✅ **Minimal code changes** - Single include file, one data file, minimal layout integration
- ✅ **Accessibility maintained** - ARIA labels, keyboard navigation, focus states, semantic HTML
- ✅ **Performance optimized** - Inline CSS/JS (no external requests), compressed videos, poster images
- ✅ **Browser compatibility** - Graceful fallbacks for autoplay restrictions, video errors

**No violations identified** - Feature is straightforward extension of existing functionality. Design phase confirms simplicity and consistency with existing codebase.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
_data/
└── slides.yml                    # New: Slide data file (YAML array of slide objects)

_includes/
└── video-carousel.html           # New: Carousel include file (HTML structure, CSS, JavaScript)

assets/
├── css/
│   └── main.css                 # Modified: Add carousel-specific CSS classes
└── videos/                      # New: Directory for video files (MP4 format)
    └── [video-files].mp4

_layouts/
└── default.html                 # Modified: Include video carousel component
```

**Structure Decision**: This is a Jekyll static site. The feature adds:
1. A new YAML data file (`_data/slides.yml`) containing slide definitions
2. A new include file (`_includes/video-carousel.html`) with carousel HTML structure, inline CSS, and JavaScript
3. Video assets directory (`assets/videos/`) for storing MP4 video files
4. Minimal CSS additions to `assets/css/main.css` for carousel-specific styling
5. Integration into main layout template (`_layouts/default.html`) via include

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
