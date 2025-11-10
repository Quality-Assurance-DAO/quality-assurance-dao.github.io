# Tasks: Typography Hierarchy and Services Card Refinement

**Input**: Design documents from `/specs/004-typography-hierarchy/`  
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/  
**Feature**: 004-typography-hierarchy  
**Branch**: `004-typography-hierarchy`  
**Date**: 2024-12-19  
**Status**: Ready for Implementation

**Tests**: No test tasks included - this is a CSS/HTML enhancement feature with manual visual testing.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Web app (Jekyll)**: `assets/css/`, `_layouts/`, `_data/` at repository root
- All paths are relative to repository root

---

## Overview

This document provides actionable, dependency-ordered tasks for implementing typography hierarchy refinement and services card layout enhancements. Tasks are organized by user story to enable independent implementation and testing.

**Total Tasks**: 20  
**User Stories**: 2 (both P1 priority)  
**MVP Scope**: User Story 1 (Typography Hierarchy) - 7 tasks  
**Parallel Opportunities**: 8 tasks can run in parallel

---

## Implementation Strategy

### MVP First Approach
Start with **User Story 1 (Typography Hierarchy)** as it provides immediate visual improvement and is a prerequisite for consistent typography across the site. This can be completed independently and tested immediately.

### Incremental Delivery
1. **Phase 1**: Setup (2 tasks) - Verify environment
2. **Phase 2**: Foundational (0 tasks) - No foundational tasks required
3. **Phase 3**: User Story 1 - Typography Hierarchy (7 tasks)
4. **Phase 4**: User Story 2 - Services Card Enhancement (7 tasks)
5. **Phase 5**: Polish & Cross-cutting (4 tasks)

### Parallel Execution Opportunities
- Tasks T003-T005 (CSS variable definitions and global heading styles) can be done in parallel
- Tasks T007-T009 (Updating specific heading styles) can be done in parallel
- Tasks T010-T011 (Service card HTML structure) can be done in parallel
- Tasks T012-T014 (Service card CSS styles) can be done in parallel

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: No tasks required - feature builds on existing design system
- **User Stories (Phase 3+)**: Can start immediately after Setup
  - User stories can proceed in parallel (if staffed)
  - Or sequentially in priority order (both are P1)
- **Polish (Phase 5)**: Depends on all user stories being complete

### User Story Dependencies
- **User Story 1 (P1)**: Can start after Setup (Phase 1) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Setup (Phase 1) - No dependencies on other stories

**Note**: Both user stories are independent and can be implemented in parallel if desired. However, completing US1 first ensures typography hierarchy is established before enhancing service cards.

### Within Each User Story
- CSS variables before heading styles
- Global heading styles before specific heading overrides
- HTML structure before CSS styling
- Core implementation before polish

### Parallel Opportunities
- All Setup tasks can run in parallel
- CSS variable definitions (T003-T005) can run in parallel
- Specific heading style updates (T007-T009) can run in parallel
- Service card HTML updates (T010-T011) can run in parallel
- Service card CSS styles (T012-T014) can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify development environment and project structure

**Independent Test**: Jekyll site runs locally without errors, all required files are accessible

### Tasks

- [ ] T001 Verify Jekyll development environment is running (`bundle exec jekyll serve` from repository root)
- [ ] T002 Verify access to required files: `assets/css/main.css`, `_layouts/default.html`, `_data/services.yml`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

**Note**: This feature enhances existing components without requiring new infrastructure. All dependencies (CSS variables system, card layout, Jekyll structure) are already in place from previous features (003-design-enhancement). No foundational tasks are required.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Typography Hierarchy Refinement (Priority: P1) 🎯 MVP

**Goal**: Establish clear visual hierarchy through consistent heading sizes (h1/h2/h3) using CSS variables and responsive scaling with clamp() function

**Independent Test**: View website and verify that h1, h2, and h3 headings have distinct, consistent sizes that create clear visual hierarchy. All headings should use the modern sans-serif font family (Space Grotesk) and maintain proper spacing relative to body text. Hierarchy relationships must be maintained at all screen sizes (320px to 2560px).

**Acceptance Criteria**:
- h1 headings are largest and most prominent
- h2 headings are clearly smaller than h1 but larger than h3
- h3 headings are smaller than h2 but still distinct from body text
- All headings use Space Grotesk font family consistently
- Heading sizes scale proportionally while maintaining hierarchy relationships
- Hierarchy relationships maintained at all breakpoints (320px, 768px, 1024px, 1440px, 2560px)

### Implementation for User Story 1

- [ ] T003 [P] [US1] Define typography hierarchy CSS variables in `:root` section of `assets/css/main.css` (add --h1-size: clamp(2rem, 5vw, 3rem), --h2-size: clamp(1.75rem, 4vw, 2.5rem), --h3-size: clamp(1.25rem, 3vw, 1.75rem) after existing CSS variables)
- [ ] T004 [P] [US1] Add global h1 heading styles using --h1-size variable in `assets/css/main.css` (h1 { font-size: var(--h1-size); font-weight: 700; line-height: 1.2; margin-bottom: 1rem; })
- [ ] T005 [P] [US1] Add global h2 heading styles using --h2-size variable in `assets/css/main.css` (h2 { font-size: var(--h2-size); font-weight: 600; line-height: 1.3; margin-bottom: 0.875rem; })
- [ ] T006 [US1] Add global h3 heading styles using --h3-size variable in `assets/css/main.css` (h3 { font-size: var(--h3-size); font-weight: 600; line-height: 1.4; margin-bottom: 0.75rem; })
- [ ] T007 [P] [US1] Update `.hero h1` style to use --h1-size variable in `assets/css/main.css` (replace existing clamp(1.8rem, 4vw, 3rem) or hardcoded size with var(--h1-size))
- [ ] T008 [P] [US1] Update `.section h2` style to use --h2-size variable in `assets/css/main.css` (replace existing font-size: 2rem or hardcoded size with var(--h2-size))
- [ ] T009 [US1] Update `.data-card h3` style to use --h3-size variable in `assets/css/main.css` (add or update font-size: var(--h3-size) if not already present)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. All headings should display with consistent hierarchy across the site.

---

## Phase 4: User Story 2 - Services Card Layout Enhancement (Priority: P1)

**Goal**: Enhance services section with card-based layout featuring icons/images, descriptions, and explicit "Learn more" links

**Independent Test**: View services section and verify that each service is displayed in a card format with an icon or image (when available), a short description, and a "Learn more" link (when URL is available). All services should be presented consistently regardless of available data fields. Cards should maintain consistent layout, spacing, and styling.

**Acceptance Criteria**:
- Each card displays an icon or image representing the service (when available)
- Each card shows a short, concise description
- Each card displays a "Learn more" link when service URL is available
- Icons/images are visually prominent and appropriately sized
- Cards maintain consistent layout regardless of content length
- "Learn more" links navigate to correct service URLs
- Cards display gracefully when optional elements (icon, URL) are missing

### Implementation for User Story 2

- [ ] T010 [P] [US2] Update service card HTML structure in `_layouts/default.html` to include service-visual container with conditional icon/image display (find services section around lines 72-105, add `<div class="service-visual">` before h3, support service.logo (image) and service.icon (emoji) fields with priority: logo if present, otherwise icon if present)
- [ ] T011 [P] [US2] Add "Learn more" link to service card HTML structure in `_layouts/default.html` (add `<a href="{{ service.url }}" class="service-learn-more">Learn more</a>` after description paragraph, conditional on service.url existence)
- [ ] T012 [US2] Add service-visual CSS styles in `assets/css/main.css` (.service-visual { margin-bottom: 1rem; text-align: center; })
- [ ] T013 [US2] Add service-icon CSS styles in `assets/css/main.css` (.service-icon { font-size: 3rem; display: block; line-height: 1; })
- [ ] T014 [US2] Add service-learn-more link CSS styles in `assets/css/main.css` (.service-learn-more { display: inline-block; margin-top: 1rem; color: var(--primary); text-decoration: none; font-weight: 500; font-size: 0.9375rem; transition: color 0.2s ease; } .service-learn-more:hover { color: var(--primary-dark); text-decoration: underline; } .service-learn-more:focus { outline: 2px solid var(--primary); outline-offset: 2px; border-radius: 4px; })
- [ ] T015 [US2] Ensure data-card flexbox layout supports new structure in `assets/css/main.css` (verify .data-card uses display: flex and flex-direction: column, ensure .data-card p has flex: 1 for consistent card heights and proper spacing)
- [ ] T016 [US2] Verify service card structure removes wrapper link if entire card was clickable, ensuring only "Learn more" link is clickable in `_layouts/default.html` (check for data-card-link wrapper or similar, remove if present, keep only service-learn-more link for navigation)

**Checkpoint**: At this point, User Story 2 should be fully functional and testable independently. All service cards should display with icons/images, descriptions, and "Learn more" links when data is available.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements, accessibility checks, and cross-cutting improvements

### Tasks

- [ ] T017 Verify typography hierarchy maintains relationships at all breakpoints (320px, 768px, 1024px, 1440px, 2560px) by testing in browser developer tools
- [ ] T018 Verify service cards maintain consistent layout when optional elements are missing (no icon, no URL) by testing with various data configurations in `_data/services.yml`
- [ ] T019 Verify accessibility: all "Learn more" links are keyboard accessible, focus indicators are visible, screen readers can navigate cards correctly, color contrast meets WCAG AA standards (4.5:1 minimum)
- [ ] T020 Verify responsive behavior: cards stack correctly on mobile (<768px), typography scales smoothly without jank, no layout shift occurs on page load, all elements remain readable at 320px width

---

## Parallel Execution Examples

### User Story 1 (Typography Hierarchy)

**Tasks T003-T005 can run in parallel** (different CSS variable definitions and global styles):
```bash
# Developer A: Define CSS variables
Task: T003 - Define typography hierarchy CSS variables in assets/css/main.css

# Developer B: Add global h1 styles (can start after T003)
Task: T004 - Add global h1 heading styles using --h1-size variable in assets/css/main.css

# Developer C: Add global h2 styles (can start after T003)
Task: T005 - Add global h2 heading styles using --h2-size variable in assets/css/main.css
```

**Tasks T007-T008 can run in parallel** (updating specific heading styles in different sections):
```bash
# Developer A: Update hero h1
Task: T007 - Update .hero h1 style to use --h1-size variable in assets/css/main.css

# Developer B: Update section h2
Task: T008 - Update .section h2 style to use --h2-size variable in assets/css/main.css
```

### User Story 2 (Services Card Enhancement)

**Tasks T010-T011 can run in parallel** (HTML structure updates in same file but different sections):
```bash
# Developer A: Add service-visual container
Task: T010 - Update service card HTML structure in _layouts/default.html to include service-visual container

# Developer B: Add "Learn more" link
Task: T011 - Add "Learn more" link to service card HTML structure in _layouts/default.html
```

**Tasks T012-T014 can run in parallel** (different CSS style definitions):
```bash
# Developer A: Add service-visual styles
Task: T012 - Add service-visual CSS styles in assets/css/main.css

# Developer B: Add service-icon styles
Task: T013 - Add service-icon CSS styles in assets/css/main.css

# Developer C: Add service-learn-more styles
Task: T014 - Add service-learn-more link CSS styles in assets/css/main.css
```

---

## Testing Checklist

### Typography Testing (User Story 1)
- [ ] h1 headings are largest and most prominent
- [ ] h2 headings are smaller than h1 but larger than h3
- [ ] h3 headings are smaller than h2 but larger than body text
- [ ] Heading sizes scale responsively across screen sizes
- [ ] Hierarchy relationships maintained at all breakpoints (320px, 768px, 1024px, 1440px, 2560px)
- [ ] All headings use Space Grotesk font family consistently
- [ ] Typography renders instantly (CSS-only, no layout shift)

### Services Card Testing (User Story 2)
- [ ] Icons/images display at top of cards when available
- [ ] Logo (image) takes priority over icon when both are present
- [ ] Descriptions display correctly in cards
- [ ] "Learn more" links appear when service URLs are available
- [ ] "Learn more" links navigate to correct URLs
- [ ] Cards maintain consistent layout when optional elements are missing
- [ ] Cards display correctly on mobile and desktop
- [ ] Cards have consistent heights and spacing
- [ ] Card layout adapts gracefully on very small screens (<320px)

### Accessibility Testing
- [ ] All headings use semantic HTML (h1, h2, h3)
- [ ] "Learn more" links are keyboard accessible (Tab navigation)
- [ ] Focus indicators are visible on links
- [ ] Screen readers can navigate cards correctly
- [ ] Color contrast meets WCAG AA standards (4.5:1 minimum)
- [ ] Image alt text is descriptive and includes service name when available

### Browser Testing
- [ ] Chrome 79+ (latest)
- [ ] Firefox 75+ (latest)
- [ ] Safari 13.1+ (latest)
- [ ] Edge 79+ (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

---

## Notes

- **No data migration required**: All existing YAML files continue to work as-is
- **Backward compatible**: All changes enhance existing structure without breaking changes
- **Optional enhancement**: Icons can be added to `_data/services.yml` by adding `icon` field (emoji or identifier), but this is not required for feature completion
- **CSS-only changes**: Typography hierarchy uses CSS variables and requires no JavaScript
- **Responsive by default**: clamp() function ensures typography scales smoothly across all screen sizes
- **No foundational tasks**: Feature builds on existing design system from 003-design-enhancement
- **Both user stories are P1**: Can be implemented in parallel or sequentially based on team preference
- **MVP recommendation**: Start with User Story 1 (Typography Hierarchy) for immediate visual improvement

---

## Resources

- [Plan Document](./plan.md) - Technical implementation plan
- [Specification](./spec.md) - Feature specification with user stories
- [Research Document](./research.md) - Design decisions and rationale
- [Data Model](./data-model.md) - Data structure documentation
- [Quickstart Guide](./quickstart.md) - Step-by-step implementation guide
- [Contracts](./contracts/) - CSS and HTML structure contracts
  - [CSS Typography Contract](./contracts/css-typography-contract.md) - CSS variables contract
  - [Service Card Structure Contract](./contracts/service-card-structure.md) - HTML structure contract
  - [Service Data Schema](./contracts/service-data-schema.json) - YAML data schema

---

## Summary

**Total Task Count**: 20 tasks
- Phase 1 (Setup): 2 tasks
- Phase 2 (Foundational): 0 tasks
- Phase 3 (User Story 1): 7 tasks
- Phase 4 (User Story 2): 7 tasks
- Phase 5 (Polish): 4 tasks

**Task Count Per User Story**:
- User Story 1 (Typography Hierarchy): 7 tasks
- User Story 2 (Services Card Enhancement): 7 tasks

**Parallel Opportunities Identified**: 8 tasks marked with [P]
- T003-T005: CSS variable definitions and global heading styles
- T007-T008: Specific heading style updates
- T010-T011: Service card HTML structure updates
- T012-T014: Service card CSS styles

**Independent Test Criteria**:
- **User Story 1**: View website and verify h1/h2/h3 headings have distinct, consistent sizes creating clear visual hierarchy. Hierarchy must be maintained at all screen sizes (320px to 2560px).
- **User Story 2**: View services section and verify each service displays in card format with icon/image (when available), description, and "Learn more" link (when URL available). Cards must maintain consistent layout regardless of available data fields.

**Suggested MVP Scope**: User Story 1 (Typography Hierarchy) - 7 tasks
- Provides immediate visual improvement
- Establishes typography foundation for entire site
- Can be completed and tested independently
- No dependencies on other stories

**Format Validation**: ✅ All tasks follow the strict checklist format:
- ✅ Checkbox: `- [ ]` present
- ✅ Task ID: T001-T020 in sequential order
- ✅ [P] marker: Included for parallelizable tasks
- ✅ [Story] label: [US1] or [US2] for user story phase tasks, omitted for setup/polish
- ✅ Description: Clear action with exact file path included
