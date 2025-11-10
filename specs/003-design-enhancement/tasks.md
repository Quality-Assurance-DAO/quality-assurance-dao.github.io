# Tasks: Modern Design Enhancement

**Feature**: 003-design-enhancement  
**Branch**: `003-design-enhancement`  
**Date**: 2024-12-19  
**Status**: Ready for Implementation

## Overview

This document provides an actionable, dependency-ordered task list for implementing the modern design enhancement feature. Tasks are organized by user story priority to enable independent implementation and testing.

## Implementation Strategy

**MVP Scope**: User Stories 1 and 2 (P1 priorities) provide the core design enhancement with modern typography, spacing, and theme toggle functionality.

**Incremental Delivery**:
- **Phase 1-2**: Setup and foundational infrastructure
- **Phase 3**: Visual design enhancements (US1) - independently testable
- **Phase 4**: Theme toggle system (US2) - independently testable
- **Phase 5**: Sticky navigation (US3) - depends on US2 for theme integration
- **Phase 6**: Optional Values section (US4) - can be deferred if content unavailable
- **Final Phase**: Polish and cross-cutting concerns

## Dependencies

### User Story Completion Order

```
Setup (Phase 1)
  └─> Foundational (Phase 2)
       ├─> US1: Visual Design (Phase 3) - Independent
       ├─> US2: Theme Toggle (Phase 4) - Independent
       │    └─> US3: Sticky Navigation (Phase 5) - Depends on US2
       └─> US4: Values Section (Phase 6) - Optional, Independent
            └─> Polish (Final Phase)
```

**Parallel Opportunities**:
- US1 and US2 can be implemented in parallel after Phase 2
- US4 can be implemented independently at any time after Phase 2
- Polish tasks can be done incrementally alongside user stories

## Phase 1: Setup

**Goal**: Initialize project structure and verify prerequisites.

**Independent Test**: Project structure is ready, all existing files are accessible, Jekyll site runs locally without errors.

### Tasks

- [ ] T001 Verify Jekyll site runs locally with `bundle exec jekyll serve`
- [ ] T002 Verify access to `_layouts/default.html` template
- [ ] T003 Verify access to `assets/css/main.css` stylesheet
- [ ] T004 Verify `assets/js/` directory exists (create if needed)
- [ ] T005 Verify all existing data files are accessible (`_data/services.yml`, `_data/projects.yml`, `_data/gitbooks.yml`, `_data/github-organisations.yml`)
- [ ] T006 Review current `_layouts/default.html` structure and identify modification points
- [ ] T007 Review current `assets/css/main.css` and identify CSS variable locations

## Phase 2: Foundational

**Goal**: Establish CSS variable system and base infrastructure required by all user stories.

**Independent Test**: CSS variables are defined for both themes, system preference detection works, base structure supports theme switching.

### Tasks

- [ ] T008 [P] Add Space Grotesk font import to `assets/css/main.css` (before `:root` section)
- [ ] T009 [P] Define base color CSS variables in `:root` section of `assets/css/main.css` (--bg, --bg-secondary, --text, --text-muted, --border)
- [ ] T010 [P] Define primary color CSS variables in `:root` section of `assets/css/main.css` (--primary, --primary-light, --primary-dark)
- [ ] T011 [P] Define card color CSS variables in `:root` section of `assets/css/main.css` (--card-bg, --card-border, --card-hover)
- [ ] T012 [P] Define hero section CSS variables in `:root` section of `assets/css/main.css` (--hero-bg, --hero-text)
- [ ] T013 [P] Define navigation CSS variables in `:root` section of `assets/css/main.css` (--nav-bg, --nav-text, --nav-border)
- [ ] T014 [P] Define design token CSS variables in `:root` section of `assets/css/main.css` (--radius, --max-width: 1152px, --section-padding: 5rem, --section-padding-mobile: 3rem, --font-base with Space Grotesk)
- [ ] T015 [P] Define dark theme base color CSS variables in `[data-theme="dark"]` selector of `assets/css/main.css`
- [ ] T016 [P] Define dark theme primary color CSS variables in `[data-theme="dark"]` selector of `assets/css/main.css`
- [ ] T017 [P] Define dark theme card color CSS variables in `[data-theme="dark"]` selector of `assets/css/main.css`
- [ ] T018 [P] Define dark theme hero section CSS variables in `[data-theme="dark"]` selector of `assets/css/main.css`
- [ ] T019 [P] Define dark theme navigation CSS variables in `[data-theme="dark"]` selector of `assets/css/main.css`
- [ ] T020 [P] Add system preference fallback CSS in `assets/css/main.css` using `@media (prefers-color-scheme: dark)` with `:root:not([data-theme="light"])` selector
- [ ] T021 [P] Update existing color properties in `assets/css/main.css` to use CSS variables (replace hardcoded colors with var(--*))

## Phase 3: User Story 1 - Enhanced Visual Design and Typography

**Goal**: Implement modern typography, improved spacing, and hero CTA button.

**Priority**: P1  
**Independent Test**: Website displays with Space Grotesk font, container width is 1152px, section padding is 5rem, hero section includes "Learn More" button linking to #services, all existing content displays correctly.

### Tasks

- [ ] T022 [US1] Update `--font-base` variable in `:root` section of `assets/css/main.css` to include 'Space Grotesk' as primary font
- [ ] T023 [US1] Update `--max-width` variable in `:root` section of `assets/css/main.css` from 1000px to 1152px
- [ ] T024 [US1] Update `.section` padding in `assets/css/main.css` to use `--section-padding` variable (5rem)
- [ ] T025 [US1] Add mobile responsive padding for `.section` in `assets/css/main.css` using `@media (max-width: 768px)` with `--section-padding-mobile` (3rem)
- [ ] T026 [US1] Add hero CTA button HTML in `_layouts/default.html` hero section: `<a href="#services" class="btn-primary btn-hero">Learn More</a>`
- [ ] T027 [US1] Add `.btn-hero` styles in `assets/css/main.css` with margin-top, padding, font-size, and box-shadow
- [ ] T028 [US1] Verify all existing data sections (services, projects, gitbooks, organizations) display correctly with new typography and spacing
- [ ] T029 [US1] Test responsive design at breakpoints: 320px, 768px, 1024px, 1440px, 2560px

## Phase 4: User Story 2 - Light and Dark Theme Toggle

**Goal**: Implement theme toggle functionality with localStorage persistence and system preference detection.

**Priority**: P1  
**Independent Test**: Theme toggle button switches between light and dark themes instantly, preference persists across page reloads, system preference is detected on first visit, all content is readable in both themes with WCAG AA contrast.

### Tasks

- [ ] T030 [US2] Create `assets/js/theme-toggle.js` with `getInitialTheme()` function that checks localStorage then system preference
- [ ] T031 [US2] Implement `setTheme(theme)` function in `assets/js/theme-toggle.js` that sets `data-theme` attribute on `<html>` element
- [ ] T032 [US2] Implement localStorage save functionality in `setTheme()` function in `assets/js/theme-toggle.js`
- [ ] T033 [US2] Add backwards compatibility class toggle (`dark-theme` on `<body>`) in `setTheme()` function in `assets/js/theme-toggle.js`
- [ ] T034 [US2] Add theme initialization on page load in `assets/js/theme-toggle.js` using `getInitialTheme()` and `setTheme()`
- [ ] T035 [US2] Add click event listener to theme toggle button in `assets/js/theme-toggle.js` that toggles between light and dark
- [ ] T036 [US2] Add system preference change listener in `assets/js/theme-toggle.js` that only applies if no user preference is saved
- [ ] T037 [US2] Add theme toggle button HTML in `_layouts/default.html` with id="theme-toggle", aria-label, and emoji icons (☀️ for light, 🌙 for dark)
- [ ] T038 [US2] Add `.theme-toggle` button styles in `assets/css/main.css` with circular design, border, hover states, and focus indicators
- [ ] T039 [US2] Add `.theme-icon` visibility styles in `assets/css/main.css` that show/hide icons based on `[data-theme]` attribute
- [ ] T040 [US2] Add script reference to `assets/js/theme-toggle.js` in `<head>` section of `_layouts/default.html` with `defer` attribute
- [ ] T041 [US2] Verify all UI elements use CSS variables correctly in both themes (no hardcoded colors remain)
- [ ] T042 [US2] Test theme persistence: toggle theme, reload page, verify preference is maintained
- [ ] T043 [US2] Test system preference detection: clear localStorage, set system preference, reload page, verify theme matches system
- [ ] T044 [US2] Test keyboard accessibility: Tab to theme toggle, activate with Enter/Space, verify theme switches
- [ ] T045 [US2] Verify WCAG AA color contrast ratios in both themes using contrast checker tool

## Phase 5: User Story 3 - Sticky Navigation with Enhanced Usability

**Goal**: Implement sticky navigation bar with smooth scrolling and mobile hamburger menu.

**Priority**: P2  
**Dependencies**: Phase 4 (US2) - Navigation must integrate with theme toggle  
**Independent Test**: Navigation bar remains visible when scrolling, navigation links smoothly scroll to sections, hamburger menu works on mobile (<768px), navigation styling matches current theme.

### Tasks

- [ ] T046 [US3] Replace hero `<header>` structure in `_layouts/default.html` with sticky navigation `<header class="sticky-nav">` containing logo, nav links, and theme toggle
- [ ] T047 [US3] Add separate hero section `<header class="hero" id="home">` in `_layouts/default.html` below sticky navigation
- [ ] T048 [US3] Add navigation links in sticky nav in `_layouts/default.html`: About (#about), Services (#services), Projects (#portfolio), Contact (#contact)
- [ ] T049 [US3] Move theme toggle button from hero to sticky navigation in `_layouts/default.html`
- [ ] T050 [US3] Add `.sticky-nav` styles in `assets/css/main.css` with `position: sticky`, `top: 0`, `z-index: 50`, backdrop-filter blur, and border
- [ ] T051 [US3] Add `.nav-container` flexbox styles in `assets/css/main.css` for horizontal layout with space-between
- [ ] T052 [US3] Add `.logo-link` styles in `assets/css/main.css` for logo and site title display
- [ ] T053 [US3] Add `.nav-logo` styles in `assets/css/main.css` with height: 2rem
- [ ] T054 [US3] Add `.nav-links` flexbox styles in `assets/css/main.css` for horizontal link layout
- [ ] T055 [US3] Add `.nav-links a` styles in `assets/css/main.css` with color, hover states, and transitions
- [ ] T056 [US3] Add smooth scrolling CSS in `assets/css/main.css` using `html { scroll-behavior: smooth; }`
- [ ] T057 [US3] Add mobile hamburger menu HTML structure in `_layouts/default.html` with button and collapsible menu (for screens <768px)
- [ ] T058 [US3] Add hamburger menu JavaScript functionality in `assets/js/theme-toggle.js` or new `assets/js/navigation.js` for mobile menu toggle
- [ ] T059 [US3] Add mobile responsive styles for navigation in `assets/css/main.css` using `@media (max-width: 768px)` with hamburger menu layout
- [ ] T060 [US3] Test sticky navigation: scroll page, verify nav remains visible at top
- [ ] T061 [US3] Test smooth scrolling: click nav links, verify smooth scroll to sections
- [ ] T062 [US3] Test mobile navigation: resize to <768px, verify hamburger menu appears and functions
- [ ] T063 [US3] Test keyboard navigation: Tab through nav links, verify focus indicators and activation
- [ ] T064 [US3] Verify navigation styling matches current theme (light/dark) correctly

## Phase 6: User Story 4 - Values Section Display

**Goal**: Add optional Values section between Services and Projects sections.

**Priority**: P3  
**Independent Test**: Values section appears if `_data/values.yml` exists, displays value cards in grid layout consistent with other sections, matches design system and theme.

### Tasks

- [ ] T065 [US4] Create optional `_data/values.yml` data file with structure: title (required), description (required), icon (optional), order (optional)
- [ ] T066 [US4] Add Values section HTML in `_layouts/default.html` after Services section (around line 75) with conditional `{% if site.data.values %}`
- [ ] T067 [US4] Add Values section Liquid template loop in `_layouts/default.html` that iterates over `site.data.values` and displays value cards
- [ ] T068 [US4] Add `.value-icon` styles in `assets/css/main.css` for emoji/icon display with font-size: 3rem and margin-bottom
- [ ] T069 [US4] Verify Values section uses existing `.data-grid` and `.data-card` classes for consistent layout
- [ ] T070 [US4] Test Values section: create sample `_data/values.yml`, verify section appears and displays correctly
- [ ] T071 [US4] Test Values section without data file: verify section does not appear (graceful degradation)
- [ ] T072 [US4] Verify Values section styling matches current theme (light/dark) correctly

## Final Phase: Polish & Cross-Cutting Concerns

**Goal**: Finalize implementation, ensure accessibility, and verify all requirements are met.

**Independent Test**: All user stories work together, accessibility standards met, no visual glitches, all edge cases handled gracefully.

### Tasks

- [ ] T073 Verify all existing data files (services, projects, gitbooks, organizations) display correctly with all enhancements
- [ ] T074 Verify all original text content is preserved exactly as-is (no modifications to content)
- [ ] T075 Test theme toggle rapid clicking: click multiple times quickly, verify no visual glitches or state inconsistencies
- [ ] T076 Test localStorage unavailable scenario: disable localStorage, verify theme still works (doesn't persist but functions)
- [ ] T077 Test JavaScript disabled scenario: disable JavaScript, verify site functions with system preference via CSS media query
- [ ] T078 Test very small screens (<320px): verify navigation remains accessible with hamburger menu
- [ ] T079 Test very long content in data cards: verify card layouts accommodate varying content lengths without breaking grid
- [ ] T080 Verify all interactive elements (links, buttons, cards, theme toggle) are keyboard accessible
- [ ] T081 Verify all interactive elements have visible focus indicators in both themes
- [ ] T082 Verify ARIA labels are present on theme toggle button and other interactive elements
- [ ] T083 Run automated accessibility audit using browser tools or Lighthouse
- [ ] T084 Verify color contrast meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text) in both themes
- [ ] T085 Test all sections in both themes: Services, Projects, GitBooks, Organizations, Follow Us, Values (if present)
- [ ] T086 Verify theme transitions are smooth (200ms duration) without content flashing
- [ ] T087 Verify page load performance: theme toggle script loads with defer, no blocking resources
- [ ] T088 Test browser compatibility: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- [ ] T089 Verify responsive design at all breakpoints: 320px, 768px, 1024px, 1440px, 2560px
- [ ] T090 Verify Jekyll build process works correctly: run `bundle exec jekyll build`, verify no errors
- [ ] T091 Verify GitHub Pages compatibility: all changes work within GitHub Pages limitations
- [ ] T092 Final visual review: compare before/after, verify all design enhancements are implemented correctly

## Task Summary

**Total Tasks**: 92  
**Setup Tasks**: 7 (T001-T007)  
**Foundational Tasks**: 14 (T008-T021)  
**User Story 1 Tasks**: 8 (T022-T029)  
**User Story 2 Tasks**: 16 (T030-T045)  
**User Story 3 Tasks**: 19 (T046-T064)  
**User Story 4 Tasks**: 8 (T065-T072)  
**Polish Tasks**: 20 (T073-T092)

**Parallel Opportunities**:
- T008-T021: All foundational CSS variable tasks can be done in parallel
- T022-T029: US1 tasks can be done in parallel with US2 tasks (T030-T045) after Phase 2
- T030-T045: US2 tasks can be done in parallel with US1 tasks after Phase 2
- T065-T072: US4 tasks are independent and can be done at any time after Phase 2

**MVP Scope** (Minimum Viable Product):
- Phases 1-2: Setup and Foundational (required)
- Phase 3: User Story 1 - Visual Design (P1)
- Phase 4: User Story 2 - Theme Toggle (P1)
- Basic polish tasks (T073-T092) for MVP validation

**Suggested Implementation Order**:
1. Complete Phase 1 (Setup) - 7 tasks
2. Complete Phase 2 (Foundational) - 14 tasks (can parallelize T008-T021)
3. Complete Phase 3 (US1) and Phase 4 (US2) in parallel - 24 tasks total
4. Complete Phase 5 (US3) - 19 tasks (depends on US2)
5. Complete Phase 6 (US4) if content available - 8 tasks (optional)
6. Complete Final Phase (Polish) - 20 tasks

## Independent Test Criteria

### User Story 1 (US1)
- ✅ Typography updated to Space Grotesk font family
- ✅ Container width increased to 1152px
- ✅ Section padding increased to 5rem (3rem on mobile)
- ✅ Hero CTA button appears and links to #services
- ✅ All existing content displays correctly
- ✅ Responsive design works at all breakpoints

### User Story 2 (US2)
- ✅ Theme toggle button switches themes instantly (<200ms)
- ✅ Theme preference persists across page reloads
- ✅ System preference detected on first visit
- ✅ All content readable in both themes
- ✅ WCAG AA contrast ratios met in both themes
- ✅ Keyboard accessible (Tab, Enter, Space)

### User Story 3 (US3)
- ✅ Navigation remains sticky when scrolling
- ✅ Navigation links smoothly scroll to sections
- ✅ Hamburger menu works on mobile (<768px)
- ✅ Navigation styling matches current theme
- ✅ Keyboard navigation works correctly

### User Story 4 (US4)
- ✅ Values section appears if data file exists
- ✅ Value cards display in consistent grid layout
- ✅ Section styling matches design system
- ✅ Section respects current theme
- ✅ Graceful degradation if data file missing

## Notes

- **No tests requested**: Tasks do not include test file creation as TDD approach was not specified in the feature specification
- **Optional Values section**: US4 tasks (T065-T072) can be skipped if content is not available
- **Backwards compatibility**: All changes maintain compatibility with existing Jekyll structure and data files
- **No breaking changes**: All existing YAML data files continue to work without modification
- **Accessibility first**: All tasks include accessibility considerations (keyboard navigation, ARIA labels, contrast ratios)

