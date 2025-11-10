# Implementation Tasks: Typography Hierarchy and Services Card Refinement

**Feature**: 004-typography-hierarchy  
**Branch**: `004-typography-hierarchy`  
**Date**: 2024-12-19  
**Status**: Ready for Implementation

## Overview

This document provides actionable, dependency-ordered tasks for implementing typography hierarchy refinement and services card layout enhancements. Tasks are organized by user story to enable independent implementation and testing.

**Total Tasks**: 20  
**User Stories**: 2 (both P1 priority)  
**MVP Scope**: User Story 1 (Typography Hierarchy) - 7 tasks

---

## Implementation Strategy

### MVP First Approach
Start with **User Story 1 (Typography Hierarchy)** as it provides immediate visual improvement and is a prerequisite for consistent typography across the site. This can be completed independently and tested immediately.

### Incremental Delivery
1. **Phase 1**: Setup (minimal - verify environment)
2. **Phase 2**: Foundational (none required - feature builds on existing structure)
3. **Phase 3**: User Story 1 - Typography Hierarchy (6 tasks)
4. **Phase 4**: User Story 2 - Services Card Enhancement (7 tasks)
5. **Phase 5**: Polish & Cross-cutting (2 tasks)

### Parallel Execution Opportunities
- Tasks T003-T005 (CSS variable definitions) can be done in parallel
- Tasks T009-T011 (Service card HTML and CSS) can be done in parallel
- Tasks T012-T013 (Service card enhancements) can be done in parallel

---

## Dependencies

### User Story Completion Order
1. **User Story 1** (Typography Hierarchy) - **No dependencies** - Can start immediately
2. **User Story 2** (Services Card Enhancement) - **No dependencies** - Can start in parallel with US1

**Note**: Both user stories are independent and can be implemented in parallel if desired. However, completing US1 first ensures typography hierarchy is established before enhancing service cards.

---

## Phase 1: Setup

**Goal**: Verify development environment and project structure

**Independent Test**: Jekyll site runs locally without errors, all required files are accessible

### Tasks

- [ ] T001 Verify Jekyll development environment is running (`bundle exec jekyll serve`)
- [ ] T002 Verify access to required files: `assets/css/main.css`, `_layouts/default.html`, `_data/services.yml`

---

## Phase 2: Foundational

**Goal**: No foundational tasks required - feature builds on existing design system

**Note**: This feature enhances existing components without requiring new infrastructure. All dependencies (CSS variables system, card layout, Jekyll structure) are already in place from previous features.

---

## Phase 3: User Story 1 - Typography Hierarchy Refinement

**Priority**: P1  
**Goal**: Establish clear visual hierarchy through consistent heading sizes (h1/h2/h3) using CSS variables and responsive scaling

**Independent Test**: View website and verify that h1, h2, and h3 headings have distinct, consistent sizes that create clear visual hierarchy. All headings should use the modern sans-serif font family (Space Grotesk) and maintain proper spacing relative to body text. Hierarchy relationships must be maintained at all screen sizes (320px to 2560px).

**Acceptance Criteria**:
- h1 headings are largest and most prominent
- h2 headings are clearly smaller than h1 but larger than h3
- h3 headings are smaller than h2 but still distinct from body text
- All headings use Space Grotesk font family consistently
- Heading sizes scale proportionally while maintaining hierarchy relationships

### Tasks

- [ ] T003 [P] [US1] Define typography hierarchy CSS variables in `:root` section of `assets/css/main.css` (--h1-size: clamp(2rem, 5vw, 3rem), --h2-size: clamp(1.75rem, 4vw, 2.5rem), --h3-size: clamp(1.25rem, 3vw, 1.75rem))
- [ ] T004 [P] [US1] Add global h1 heading styles using --h1-size variable in `assets/css/main.css` (font-size: var(--h1-size), font-weight: 700, line-height: 1.2, margin-bottom: 1rem)
- [ ] T005 [P] [US1] Add global h2 heading styles using --h2-size variable in `assets/css/main.css` (font-size: var(--h2-size), font-weight: 600, line-height: 1.3, margin-bottom: 0.875rem)
- [ ] T006 [US1] Add global h3 heading styles using --h3-size variable in `assets/css/main.css` (font-size: var(--h3-size), font-weight: 600, line-height: 1.4, margin-bottom: 0.75rem)
- [ ] T007 [US1] Update `.hero h1` style to use --h1-size variable in `assets/css/main.css` (replace clamp(1.8rem, 4vw, 3rem) with var(--h1-size))
- [ ] T008 [US1] Update `.section h2` style to use --h2-size variable in `assets/css/main.css` (replace font-size: 2rem with var(--h2-size))
- [ ] T009 [US1] Update `.data-card h3` style to use --h3-size variable in `assets/css/main.css` (add font-size: var(--h3-size) if not already present)

---

## Phase 4: User Story 2 - Services Card Layout Enhancement

**Priority**: P1  
**Goal**: Enhance services section with card-based layout featuring icons/images, descriptions, and "Learn more" links

**Independent Test**: View services section and verify that each service is displayed in a card format with an icon or image (when available), a short description, and a "Learn more" link (when URL is available). All services should be presented consistently regardless of available data fields. Cards should maintain consistent layout, spacing, and styling.

**Acceptance Criteria**:
- Each card displays an icon or image representing the service (when available)
- Each card shows a short, concise description
- Each card displays a "Learn more" link when service URL is available
- Icons/images are visually prominent and appropriately sized
- Cards maintain consistent layout regardless of content length
- "Learn more" links navigate to correct service URLs
- Cards display gracefully when optional elements (icon, URL) are missing

### Tasks

- [ ] T010 [P] [US2] Update service card HTML structure in `_layouts/default.html` to include service-visual container with conditional icon/image display (lines 72-107, add service-visual div before h3, support service.logo and service.icon fields)
- [ ] T011 [P] [US2] Add "Learn more" link to service card HTML structure in `_layouts/default.html` (after description paragraph, conditional on service.url, class="service-learn-more", text="Learn more")
- [ ] T012 [US2] Add service-visual CSS styles in `assets/css/main.css` (.service-visual: margin-bottom: 1rem, text-align: center)
- [ ] T013 [US2] Add service-icon CSS styles in `assets/css/main.css` (.service-icon: font-size: 3rem, display: block, line-height: 1)
- [ ] T014 [US2] Add service-learn-more link CSS styles in `assets/css/main.css` (.service-learn-more: display: inline-block, margin-top: 1rem, color: var(--primary), text-decoration: none, font-weight: 500, font-size: 0.9375rem, transition: color 0.2s ease, hover and focus states)
- [ ] T015 [US2] Ensure data-card flexbox layout supports new structure in `assets/css/main.css` (verify .data-card uses display: flex, flex-direction: column, .data-card p has flex: 1 for consistent card heights)
- [ ] T016 [US2] Update service card structure to remove wrapper link if entire card was clickable, ensuring only "Learn more" link is clickable in `_layouts/default.html` (remove data-card-link wrapper, keep only service-learn-more link)

---

## Phase 5: Polish & Cross-Cutting Concerns

**Goal**: Final refinements, accessibility checks, and cross-cutting improvements

### Tasks

- [ ] T017 Verify typography hierarchy maintains relationships at all breakpoints (320px, 768px, 1024px, 1440px, 2560px) by testing in browser
- [ ] T018 Verify service cards maintain consistent layout when optional elements are missing (no icon, no URL) by testing with various data configurations
- [ ] T019 Verify accessibility: all "Learn more" links are keyboard accessible, focus indicators are visible, screen readers can navigate cards correctly
- [ ] T020 Verify responsive behavior: cards stack correctly on mobile, typography scales smoothly, no layout shift occurs

---

## Parallel Execution Examples

### User Story 1 (Typography Hierarchy)
**Tasks T003-T005 can run in parallel** (different CSS variable definitions):
- Developer A: T003 (Define CSS variables)
- Developer B: T004 (Global h1 styles) - can start after T003
- Developer C: T005 (Global h2 styles) - can start after T003

**Tasks T007-T009 can run in parallel** (updating specific heading styles):
- Developer A: T007 (Update .hero h1)
- Developer B: T008 (Update .section h2)
- Developer C: T009 (Update .data-card h3)

### User Story 2 (Services Card Enhancement)
**Tasks T010-T011 can run in parallel** (HTML structure updates):
- Developer A: T010 (Add service-visual container)
- Developer B: T011 (Add "Learn more" link)

**Tasks T012-T014 can run in parallel** (CSS styling):
- Developer A: T012 (service-visual styles)
- Developer B: T013 (service-icon styles)
- Developer C: T014 (service-learn-more styles)

---

## Testing Checklist

### Typography Testing (User Story 1)
- [ ] h1 headings are largest and most prominent
- [ ] h2 headings are smaller than h1 but larger than h3
- [ ] h3 headings are smaller than h2 but larger than body text
- [ ] Heading sizes scale responsively across screen sizes
- [ ] Hierarchy relationships maintained at all breakpoints (320px, 768px, 1024px, 1440px, 2560px)
- [ ] All headings use Space Grotesk font family consistently

### Services Card Testing (User Story 2)
- [ ] Icons/images display at top of cards when available
- [ ] Descriptions display correctly in cards
- [ ] "Learn more" links appear when service URLs are available
- [ ] "Learn more" links navigate to correct URLs
- [ ] Cards maintain consistent layout when optional elements are missing
- [ ] Cards display correctly on mobile and desktop
- [ ] Cards have consistent heights and spacing

### Accessibility Testing
- [ ] All headings use semantic HTML (h1, h2, h3)
- [ ] "Learn more" links are keyboard accessible
- [ ] Focus indicators are visible on links
- [ ] Screen readers can navigate cards correctly
- [ ] Color contrast meets WCAG AA standards

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

---

## Notes

- **No data migration required**: All existing YAML files continue to work as-is
- **Backward compatible**: All changes enhance existing structure without breaking changes
- **Optional enhancement**: Icons can be added to `_data/services.yml` by adding `icon` field (emoji or identifier), but this is not required for feature completion
- **CSS-only changes**: Typography hierarchy uses CSS variables and requires no JavaScript
- **Responsive by default**: clamp() function ensures typography scales smoothly across all screen sizes

---

## Resources

- [Plan Document](./plan.md) - Technical implementation plan
- [Specification](./spec.md) - Feature specification with user stories
- [Research Document](./research.md) - Design decisions and rationale
- [Data Model](./data-model.md) - Data structure documentation
- [Quickstart Guide](./quickstart.md) - Step-by-step implementation guide
- [Contracts](./contracts/) - CSS and HTML structure contracts

