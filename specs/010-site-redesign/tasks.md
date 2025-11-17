# Tasks: Site Redesign with Modern UI

**Input**: Design documents from `/specs/010-site-redesign/`  
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/  
**Feature**: 010-site-redesign  
**Branch**: `010-site-redesign`  
**Date**: 2025-01-27  
**Status**: Ready for Implementation

**Tests**: No test tasks included - this is a Jekyll static site feature with manual browser testing, accessibility testing, and GitHub Pages build verification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app (Jekyll)**: `assets/css/`, `_includes/`, `_layouts/`, `_data/` at repository root
- All paths are relative to repository root

---

## Overview

This document provides actionable, dependency-ordered tasks for implementing a modern UI redesign of the QADAO website homepage. The redesign uses vanilla CSS with CSS variables to recreate Tailwind design patterns, incorporates the QADAO logo, implements dark/light theme switching, and ensures all content is dynamically loaded from YAML data files.

**Total Tasks**: 47  
**User Stories**: 5 (3x P1, 1x P2)  
**MVP Scope**: User Stories 1, 2, 3, and 5 (P1 stories) - 35 tasks  
**Parallel Opportunities**: 22 tasks can run in parallel

---

## Implementation Strategy

### MVP First Approach
Start with **User Stories 1, 2, 3, and 5 (all P1)** as they provide the core functionality:
- User Story 1: Redesigned homepage display
- User Story 2: Theme switching functionality
- User Story 3: Data-driven content display
- User Story 5: Video carousel interaction

These can be completed independently and tested immediately.

### Incremental Delivery
1. **Phase 1**: Setup (3 tasks) - Verify environment and prepare structure
2. **Phase 2**: Foundational (4 tasks) - CSS variables, fonts, theme system foundation
3. **Phase 3**: User Story 1 - View Redesigned Homepage (8 tasks) 🎯 MVP
4. **Phase 4**: User Story 2 - Theme Switching Functionality (4 tasks) 🎯 MVP
5. **Phase 5**: User Story 3 - Data-Driven Content Display (12 tasks) 🎯 MVP
6. **Phase 6**: User Story 5 - Video Carousel Interaction (5 tasks) 🎯 MVP
7. **Phase 7**: User Story 4 - Responsive Design Across Devices (7 tasks)
8. **Phase 8**: Polish & Cross-cutting (6 tasks)

### Parallel Execution Opportunities
- Tasks T004-T006 (CSS variables, fonts, theme toggle JS) can be done in parallel
- Tasks T010-T011 (Layout template structure) can be done in parallel
- Tasks T014-T016 (Navigation, hero, sections) can be done in parallel
- Tasks T020-T022 (Services, partners, projects sections) can be done in parallel
- Tasks T024-T026 (Data file integration) can be done in parallel
- Tasks T030-T031 (Carousel structure and styling) can be done in parallel
- Tasks T033-T035 (Responsive breakpoints) can be done in parallel

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User Stories 1, 2, 3, 5 (P1): Can start after Foundational - Can proceed in parallel
  - User Story 4 (P2): Depends on User Stories 1, 3 (needs working layout and content sections to make responsive)
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies
- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 4 (P2)**: Depends on User Stories 1 and 3 - Requires working layout and content sections
- **User Story 5 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories

**Note**: User Stories 1, 2, 3, and 5 can be worked on in parallel after Foundational phase. User Story 4 should be completed after the P1 stories.

### Within Each User Story
- CSS variables and theme system before component styling
- Layout structure before content sections
- Data file integration before styling
- Core functionality before enhancements

### Parallel Opportunities
- Foundational tasks marked [P] can run in parallel
- Once Foundational phase completes, User Stories 1, 2, 3, and 5 can start in parallel
- Different sections (services, partners, projects) can be worked on in parallel
- CSS styling for different components can be added in parallel

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify development environment and prepare project structure

**Independent Test**: Jekyll site runs locally without errors, all required directories exist

### Tasks

- [X] T001 Verify Jekyll development environment is running (`bundle exec jekyll serve` from repository root)
- [X] T002 [P] Verify existing data files exist and are valid: `_data/services.yml`, `_data/partners.yml`, `_data/projects.yml`, `_data/slides.yml`
- [X] T003 [P] Verify QADAO logo exists at path specified in `_config.yml` or `assets/images/qadao.jpg`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

**Independent Test**: CSS variables are defined, fonts load correctly, theme toggle sets data-theme attribute, site displays with basic styling

### Tasks

- [X] T004 [P] Define CSS variables for color palette, typography, spacing, and layout in `assets/css/main.css` following css-variables-contract.md (primary #4A00E0, secondary #00F2A9, light/dark theme variables)
- [X] T005 [P] Add Inter font family from Google Fonts to `_layouts/default.html` with preconnect optimization (weights 400, 500, 700, font-display: swap)
- [X] T006 [P] Add Material Symbols icons from Google Fonts CDN to `_layouts/default.html` for icon system
- [X] T007 Verify existing theme toggle JavaScript in `assets/js/theme-toggle.js` sets `data-theme` attribute on `<html>` element and persists to localStorage (enhance if needed)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Redesigned Homepage (Priority: P1) 🎯 MVP

**Goal**: Visitors can view a modern, redesigned homepage that displays content dynamically loaded from data files with improved visual hierarchy, spacing, and cohesive color scheme.

**Independent Test**: Can be fully tested by viewing the homepage and verifying all sections display correctly with content from data files, QADAO logo is visible, and layout matches design guide.

### Implementation for User Story 1

- [X] T008 [US1] Update `_layouts/default.html` to include redesigned structure with semantic HTML5 elements (header, nav, main, section, footer)
- [X] T009 [US1] Create navigation header component in `_layouts/default.html` with logo display (image from `site.logo` with fallback to `site.title` text) and navigation links structure
- [X] T010 [US1] Add hero section structure in `_layouts/default.html` with include for animated-header.html
- [X] T011 [US1] Add section containers for services, partners, projects, about, and contact/follow-us in `_layouts/default.html` with semantic IDs (#services, #partners, #portfolio, #about, #contact)
- [X] T012 [US1] Style navigation header in `assets/css/main.css` using CSS variables (height 64px, sticky positioning, theme-aware background and text colors, logo max-height 40px)
- [X] T013 [US1] Style hero section in `assets/css/main.css` with full-width layout, theme-aware background, centered typography, responsive padding using section-padding-y variable
- [X] T014 [US1] Style section containers in `assets/css/main.css` with container class (max-width 1200px, responsive padding), section class (vertical padding, theme-aware background), and consistent spacing
- [X] T015 [US1] Apply Inter font family and typography scale from CSS variables throughout `assets/css/main.css` (headings use clamp() for responsive sizing, body text uses base font-size)

**Checkpoint**: At this point, User Story 1 should display a redesigned homepage structure with proper layout, navigation, and styling matching the design guide

---

## Phase 4: User Story 2 - Theme Switching Functionality (Priority: P1) 🎯 MVP

**Goal**: Visitors can toggle between dark and light themes using a theme switch control, with preference saved and persisting across page visits.

**Independent Test**: Can be tested independently by clicking the theme toggle and verifying theme changes, persistence, and content readability in both themes.

### Implementation for User Story 2

- [X] T016 [US2] Add theme toggle button to navigation header in `_layouts/default.html` with Material Symbols icons (light/dark icons) and proper ARIA labels
- [X] T017 [US2] Ensure theme toggle JavaScript in `assets/js/theme-toggle.js` reads from localStorage on page load and applies saved theme preference to `<html>` data-theme attribute
- [X] T018 [US2] Style theme toggle button in `assets/css/main.css` with minimum 44x44px touch target, theme-aware colors, hover states, and icon visibility based on current theme
- [X] T019 [US2] Add smooth CSS transitions for theme switching in `assets/css/main.css` using --transition-theme variable (300ms ease) for color changes on all theme-aware properties

**Checkpoint**: At this point, User Story 2 should allow visitors to toggle themes with persistence and smooth transitions

---

## Phase 5: User Story 3 - Data-Driven Content Display (Priority: P1) 🎯 MVP

**Goal**: All website content is dynamically loaded from data files (YAML format) located in the `_data/` directory, with content updates possible by editing data files without code changes.

**Independent Test**: Can be tested independently by modifying data files and verifying content updates on the site without code changes.

### Implementation for User Story 3

- [ ] T020 [P] [US3] Create services section template in `_layouts/default.html` with Liquid loop over `site.data.services`, displaying service cards with name, description, optional logo/icon, url, and tags
- [ ] T021 [P] [US3] Create partners section template in `_layouts/default.html` with Liquid loop over `site.data.partners`, displaying partner cards with logo, name, description, url (external link with target="_blank"), and tags
- [ ] T022 [P] [US3] Create projects section template in `_layouts/default.html` with Liquid loop over `site.data.projects`, displaying project cards with optional logo, name, description, url, and tags
- [ ] T023 [US3] Create about section template in `_layouts/default.html` with content from `site.about_text` or default text, centered or left-aligned with responsive typography
- [ ] T024 [US3] Create follow-us/contact section template in `_layouts/default.html` with social media links from `_config.yml` (x_handle, youtube_handle, github.repository_url) using SVG icons from assets/images/social/
- [ ] T025 [US3] Style data grid layout in `assets/css/main.css` with CSS Grid (repeat(auto-fit, minmax(300px, 1fr))), gap using --spacing-lg variable, responsive columns (1 mobile, 2 tablet, 3 desktop)
- [ ] T026 [US3] Style data card components in `assets/css/main.css` using --card-* variables (background, border-radius 12px, padding 1.5rem, shadow, hover elevation change)
- [ ] T027 [US3] Style service cards in `assets/css/main.css` with optional color coding from service.color field, logo/icon display, tag badges, and link styling
- [ ] T028 [US3] Style partner cards in `assets/css/main.css` with logo sizing constraints (max-height/width, object-fit contain), full card clickable area, external link indicators
- [ ] T029 [US3] Style project cards in `assets/css/main.css` similar to partner cards with optional GitHub icon indicators for repository links
- [ ] T030 [US3] Add conditional rendering in templates for optional fields (logo, icon, url, tags, featured badge) with graceful handling when fields are missing
- [ ] T031 [US3] Add empty state handling in templates for missing or empty data files (sections should not display or show appropriate empty state message)

**Checkpoint**: At this point, User Story 3 should display all content sections with data from YAML files, with proper styling and graceful handling of optional/missing fields

---

## Phase 6: User Story 5 - Video Carousel Interaction (Priority: P1) 🎯 MVP

**Goal**: Visitors can interact with the video carousel by clicking on videos to navigate to relevant sections. The carousel displays videos without CTA buttons, and clicking anywhere on a video navigates to the associated section.

**Independent Test**: Can be tested independently by clicking on videos in the carousel and verifying navigation to the correct sections.

### Implementation for User Story 5

- [X] T032 [US5] Update `_includes/video-carousel.html` to use slides from `site.data.slides` with clickable video containers (anchor tags wrapping videos) that navigate to `cta_link` or `section_link` when present
- [X] T033 [P] [US5] Style video carousel section in `assets/css/main.css` with height variables (600px desktop, 400px mobile), overlay styling for text readability, and smooth transitions between slides
- [X] T034 [US5] Ensure video carousel displays videos with poster images, muted autoplay, loop, and cover object-fit, with headline text overlaid on videos
- [X] T035 [US5] Add smooth scroll behavior for section navigation when videos are clicked (using CSS scroll-behavior: smooth or JavaScript smooth scroll)
- [X] T036 [US5] Verify no CTA buttons or link buttons are displayed on carousel slides (only video and headline visible, video itself is clickable)

**Checkpoint**: At this point, User Story 5 should display a working video carousel with clickable videos that navigate to sections, matching the redesigned aesthetic

---

## Phase 7: User Story 4 - Responsive Design Across Devices (Priority: P2)

**Goal**: The redesigned site adapts seamlessly to different screen sizes and devices, maintaining usability and visual appeal on mobile phones, tablets, and desktop computers.

**Independent Test**: Can be tested independently by resizing the browser window and testing on different devices to verify responsive behavior.

### Implementation for User Story 4

- [ ] T037 [US4] Add mobile-first responsive breakpoints in `assets/css/main.css` using media queries at 768px (tablet) and 1024px (desktop) with min-width approach
- [ ] T038 [US4] Update navigation header responsive styles in `assets/css/main.css` for mobile (hamburger menu, full menu on desktop), ensuring touch targets are minimum 44x44px
- [ ] T039 [US4] Update container and section padding in `assets/css/main.css` to be responsive (1rem mobile, 2rem tablet, 3rem desktop) using CSS variables and media queries
- [ ] T040 [US4] Update data grid responsive columns in `assets/css/main.css` (1 column mobile, 2 columns tablet, 3 columns desktop) using CSS Grid with appropriate minmax values
- [ ] T041 [US4] Update typography responsive sizing in `assets/css/main.css` using clamp() function for headings and responsive font-size adjustments for mobile/tablet/desktop
- [ ] T042 [US4] Ensure all interactive elements (buttons, links) in `assets/css/main.css` have minimum 44x44px touch target sizes on mobile devices
- [ ] T043 [US4] Update image and media responsive scaling in `assets/css/main.css` to maintain aspect ratios and quality across different screen sizes (max-width: 100%, height: auto, object-fit)

**Checkpoint**: At this point, User Story 4 should ensure the site works seamlessly across mobile, tablet, and desktop devices with appropriate responsive behavior

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories, accessibility, performance, and final polish

**Independent Test**: Site builds successfully on GitHub Pages, passes accessibility checks, meets performance goals, and handles edge cases gracefully

### Tasks

- [ ] T044 [P] Add accessibility improvements in `assets/css/main.css` (focus states for all interactive elements, keyboard navigation support, ARIA label verification in templates)
- [ ] T045 [P] Verify color contrast ratios in `assets/css/main.css` meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text) in both dark and light themes
- [ ] T046 Add graceful fallback handling in `_layouts/default.html` and templates for missing logo (text fallback), missing images (alt text display), missing data files (empty states), and JavaScript disabled (default theme)
- [ ] T047 Verify GitHub Pages build compatibility by testing Jekyll build locally (`bundle exec jekyll build`) and ensuring all assets, includes, and data files are properly referenced
- [ ] T048 [P] Optimize CSS in `assets/css/main.css` for performance (remove unused styles, consolidate media queries, ensure efficient selectors)
- [ ] T049 Run quickstart.md validation checklist: theme toggle works, all sections display content from data files, QADAO logo displays, video carousel navigates correctly, responsive design works, accessibility standards met

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User Stories 1, 2, 3, 5 (P1): Can start after Foundational - Can proceed in parallel
  - User Story 4 (P2): Depends on User Stories 1 and 3 - Requires working layout and content sections
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 4 (P2)**: Depends on User Stories 1 and 3 - Requires working layout and content sections
- **User Story 5 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- CSS variables and theme system before component styling
- Layout structure before content sections
- Data file integration before styling
- Core functionality before enhancements
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, User Stories 1, 2, 3, and 5 can start in parallel
- All tasks for different sections (services, partners, projects) marked [P] can run in parallel
- CSS styling for different components can be added in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 3

```bash
# Launch all section templates for User Story 3 together:
Task: "Create services section template in _layouts/default.html"
Task: "Create partners section template in _layouts/default.html"
Task: "Create projects section template in _layouts/default.html"

# Launch all styling tasks for User Story 3 together:
Task: "Style data grid layout in assets/css/main.css"
Task: "Style service cards in assets/css/main.css"
Task: "Style partner cards in assets/css/main.css"
Task: "Style project cards in assets/css/main.css"
```

---

## Implementation Strategy

### MVP First (User Stories 1, 2, 3, 5 - All P1)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 - View Redesigned Homepage
4. Complete Phase 4: User Story 2 - Theme Switching Functionality
5. Complete Phase 5: User Story 3 - Data-Driven Content Display
6. Complete Phase 6: User Story 5 - Video Carousel Interaction
7. **STOP and VALIDATE**: Test all P1 stories independently
8. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (Basic layout)
3. Add User Story 2 → Test independently → Deploy/Demo (Theme switching)
4. Add User Story 3 → Test independently → Deploy/Demo (Content display)
5. Add User Story 5 → Test independently → Deploy/Demo (Video carousel)
6. Add User Story 4 → Test independently → Deploy/Demo (Responsive design)
7. Add Polish → Final validation → Deploy
8. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Layout structure)
   - Developer B: User Story 2 (Theme switching)
   - Developer C: User Story 3 (Content sections)
   - Developer D: User Story 5 (Video carousel)
3. After P1 stories complete:
   - Developer A: User Story 4 (Responsive design)
   - Developer B: Polish & Cross-cutting
4. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All content must come from data files - no hardcoded content in templates
- CSS must use vanilla CSS with CSS variables - no Tailwind framework
- Theme switching must work with existing theme-toggle.js or be enhanced
- All sections must handle missing/empty data gracefully
- Accessibility (WCAG AA) must be maintained throughout

---

## Summary

**Total Tasks**: 49  
**Task Count by Phase**:
- Phase 1 (Setup): 3 tasks
- Phase 2 (Foundational): 4 tasks
- Phase 3 (User Story 1): 8 tasks
- Phase 4 (User Story 2): 4 tasks
- Phase 5 (User Story 3): 12 tasks
- Phase 6 (User Story 5): 5 tasks
- Phase 7 (User Story 4): 7 tasks
- Phase 8 (Polish): 6 tasks

**Task Count by User Story**:
- User Story 1: 8 tasks
- User Story 2: 4 tasks
- User Story 3: 12 tasks
- User Story 4: 7 tasks
- User Story 5: 5 tasks

**Parallel Opportunities Identified**: 22 tasks can run in parallel

**Independent Test Criteria**:
- User Story 1: View homepage and verify all sections display correctly with content from data files
- User Story 2: Click theme toggle and verify theme changes, persistence, and readability
- User Story 3: Modify data files and verify content updates without code changes
- User Story 4: Resize browser and test on different devices to verify responsive behavior
- User Story 5: Click videos in carousel and verify navigation to correct sections

**Suggested MVP Scope**: User Stories 1, 2, 3, and 5 (all P1 stories) - 29 tasks total

**Format Validation**: ✅ All tasks follow the checklist format (checkbox, ID, labels where applicable, file paths)

