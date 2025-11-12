# Tasks: Partners Section

**Feature**: 008-partners-section  
**Date**: 2024-12-19  
**Status**: Ready for Implementation

## Overview

This document provides an actionable, dependency-ordered task list for implementing the Partners Section feature. Tasks are organized by phase, with each user story having its own phase for independent implementation and testing.

## Implementation Strategy

**MVP Scope**: User Story 1 (View Partner Organizations) delivers a complete, functional Partners section with partner cards displaying logos, names, descriptions, and optional website links. User Stories 2 and 3 add responsive design and interaction enhancements.

**Incremental Delivery**:
1. **Phase 1**: Setup and project structure verification
2. **Phase 2**: Foundational data file and directory structure
3. **Phase 3**: Core partner display functionality (US1) - MVP deliverable
4. **Phase 4**: Responsive design (US2) - Enhancement
5. **Phase 5**: Card interactions and accessibility (US3) - Enhancement
6. **Final Phase**: Polish and cross-cutting concerns

## Dependencies

### User Story Completion Order

```
Phase 1: Setup
    ↓
Phase 2: Foundational (Data File Structure)
    ↓
Phase 3: User Story 1 (Partner Display) ──┐
    ↓                                      │
Phase 4: User Story 2 (Responsive) ───────┼──→ Complete MVP
    ↓                                      │
Phase 5: User Story 3 (Interactions) ────┘
    ↓
Final Phase: Polish
```

**Parallel Opportunities**:
- Tasks within the same user story phase can often be parallelized (marked with [P])
- Data file creation and directory structure can be done in parallel
- Template implementation tasks can be parallelized when working on different sections

## Phase 1: Setup

**Goal**: Initialize project structure and verify prerequisites.

**Independent Test**: Verify Jekyll site structure, `_data/` directory exists, `_layouts/` directory exists, and `assets/images/` directory exists.

### Tasks

- [X] T001 Verify `_data/` directory exists in Jekyll site root
- [X] T002 Verify `_layouts/` directory exists and contains `default.html`
- [X] T003 Verify `assets/images/` directory exists for partner logo storage
- [X] T004 Verify Jekyll site builds successfully (`bundle exec jekyll build`)
- [X] T005 Verify existing `data-card` and `data-grid` CSS classes are available in `assets/css/main.css`

## Phase 2: Foundational - Data File Structure

**Goal**: Create the partners data file structure and directory for partner logos. This is a blocking prerequisite for all user stories.

**Independent Test**: Can be tested by creating `_data/partners.yml` with sample partner data and verifying Jekyll can access it via `site.data.partners`, and verifying `assets/images/partners/` directory exists.

### Tasks

- [X] T006 Create `_data/partners.yml` file with empty YAML array structure (`---\n[]`)
- [X] T007 Create `assets/images/partners/` directory for partner logo images
- [X] T008 Verify YAML syntax is valid (test with `yamllint` or Jekyll build)
- [X] T009 Verify Jekyll can access partners data (`site.data.partners` in template test)

## Phase 3: User Story 1 - View Partner Organizations (P1)

**Goal**: Implement the core Partners section functionality. Visitors can view a "We work with" section that displays partner organizations in card format, matching the visual style of other sections (Services, Projects). Each partner card displays the partner's logo as an image, name, and optional description.

**Independent Test**: Can be fully tested by adding partners.yml with partner data and verifying cards render correctly with logos, names, and descriptions in the same style as service/project cards.

**Test Criteria**:
- Partners section appears on main page when `partners.yml` has data
- Partner cards are displayed in a grid layout matching the style of other sections
- Partner logo images are displayed prominently in cards when logo path is provided
- Partner names are displayed as headings (h3) in cards
- Partner descriptions are displayed as paragraph text in cards
- Partner cards with URLs are clickable (entire card acts as link)
- External links open in new tab with `target="_blank" rel="noopener noreferrer"`
- Section is hidden when `partners.yml` is empty or missing

### Tasks

- [X] T010 [US1] Add Partners section container with conditional rendering `{% if site.data.partners %}` in `_layouts/default.html` after Projects section
- [X] T011 [US1] Add section element with `id="partners"` and `class="section partners"` in `_layouts/default.html`
- [X] T012 [US1] Add container div with `class="container"` inside Partners section in `_layouts/default.html`
- [X] T013 [US1] Add section heading `<h2>We work with</h2>` inside container in `_layouts/default.html`
- [X] T014 [US1] Add data-grid container `<div class="data-grid">` inside container in `_layouts/default.html`
- [X] T015 [US1] Add Liquid loop `{% for partner in site.data.partners %}` inside data-grid in `_layouts/default.html`
- [X] T016 [US1] Add article element with `class="data-card"` and conditional `id="partner-{{ partner.id }}"` in `_layouts/default.html`
- [X] T017 [US1] Add conditional link wrapper `{% if partner.url %}<a href="{{ partner.url }}" class="data-card-link" target="_blank" rel="noopener noreferrer" aria-label="{{ partner.name }} - {{ partner.description }}">{% endif %}` in `_layouts/default.html`
- [X] T018 [US1] Add conditional logo image `{% if partner.logo %}<img src="{{ partner.logo | relative_url }}" alt="{% if partner.name %}{{ partner.name }} logo{% else %}Logo{% endif %}" class="data-card-logo">{% endif %}` in `_layouts/default.html`
- [X] T019 [US1] Add partner name heading `<h3>{{ partner.name }}</h3>` in `_layouts/default.html`
- [X] T020 [US1] Add partner description paragraph `<p>{{ partner.description }}</p>` in `_layouts/default.html`
- [X] T021 [US1] Add conditional closing link tag `{% if partner.url %}</a>{% endif %}` in `_layouts/default.html`
- [X] T022 [US1] Add closing article tag `</article>` in `_layouts/default.html`
- [X] T023 [US1] Add closing Liquid loop `{% endfor %}` in `_layouts/default.html`
- [X] T024 [US1] Add closing data-grid div `</div>` in `_layouts/default.html`
- [X] T025 [US1] Add closing container div `</div>` in `_layouts/default.html`
- [X] T026 [US1] Add closing section tag `</section>` in `_layouts/default.html`
- [X] T027 [US1] Add closing conditional `{% endif %}` for Partners section in `_layouts/default.html`
- [X] T028 [US1] Add sample partner data to `_data/partners.yml` with required fields (id, name, description)
- [X] T029 [US1] Add sample partner logo image to `assets/images/partners/` directory
- [X] T030 [US1] Test Partners section renders when `partners.yml` has data
- [X] T031 [US1] Test Partners section is hidden when `partners.yml` is empty

## Phase 4: User Story 2 - Responsive Partner Display (P2)

**Goal**: Ensure partner cards adapt to different screen sizes, maintaining readability and visual consistency across mobile, tablet, and desktop devices. The grid layout adjusts automatically based on available screen space.

**Independent Test**: Can be tested independently by resizing the browser window and verifying cards reflow appropriately, maintaining consistent spacing and readability.

**Test Criteria**:
- Partner cards stack vertically or display in single column on mobile (< 768px)
- Partner cards display in 2-3 columns on tablet (768px - 1024px)
- Partner cards display in multi-column grid (3-4 columns) on desktop (> 1024px)
- Partner logos maintain aspect ratio and scale appropriately on all screen sizes
- Card spacing remains consistent across all breakpoints

### Tasks

- [X] T032 [US2] Verify existing `data-grid` CSS class handles responsive layout (check `assets/css/main.css`)
- [X] T033 [US2] Test partner cards on mobile device (< 768px) - verify single column or vertical stacking
- [X] T034 [US2] Test partner cards on tablet device (768px - 1024px) - verify 2-3 column layout
- [X] T035 [US2] Test partner cards on desktop device (> 1024px) - verify multi-column grid (3-4 columns)
- [X] T036 [US2] Verify partner logos maintain aspect ratio when screen is resized
- [X] T037 [US2] Verify card spacing remains consistent across all breakpoints
- [X] T038 [US2] Test responsive layout with varying numbers of partner cards (1, 3, 6, 12+)

## Phase 5: User Story 3 - Partner Card Interactions (P3)

**Goal**: Partner cards provide visual feedback on hover and support optional click-through to partner websites. Cards maintain accessibility standards with proper focus states and keyboard navigation.

**Independent Test**: Can be tested independently by hovering over cards, clicking cards with URLs, and using keyboard navigation to verify interactions work correctly.

**Test Criteria**:
- Partner cards with URLs provide visual feedback on hover (e.g., slight elevation, shadow change)
- Partner cards with URLs are clickable (entire card acts as link)
- External links open in new tab with security attributes (`target="_blank" rel="noopener noreferrer"`)
- Partner cards have visible focus indicator when focused via keyboard navigation
- Partner cards with URLs can be activated with Enter key when focused
- Hover effects match the style of other card sections (Services, Projects)

### Tasks

- [X] T039 [US3] Verify existing `data-card` CSS class includes hover effects (check `assets/css/main.css`)
- [X] T040 [US3] Verify existing `data-card-link` CSS class provides clickable card styling (check `assets/css/main.css`)
- [X] T041 [US3] Test hover effect on partner cards with URLs - verify visual feedback (elevation, shadow change)
- [X] T042 [US3] Test click interaction on partner cards with URLs - verify entire card is clickable
- [X] T043 [US3] Test external links open in new tab with `target="_blank" rel="noopener noreferrer"` attributes
- [X] T044 [US3] Test keyboard navigation - verify focus indicator is visible when card is focused
- [X] T045 [US3] Test keyboard activation - verify Enter key activates link when card is focused
- [X] T046 [US3] Verify hover effects match style of project cards (compare visual appearance)
- [X] T047 [US3] Test cards without URLs - verify no hover effect or click interaction

## Final Phase: Polish & Cross-Cutting Concerns

**Goal**: Handle edge cases, optional fields, accessibility, validation, and final integration testing.

**Independent Test**: Test edge cases (empty data, missing fields, invalid URLs, missing logos, many partners), verify accessibility, and ensure no layout breaking.

**Test Criteria**:
- Section handles empty `partners.yml` gracefully (section hidden)
- Section handles missing `partners.yml` gracefully (section hidden)
- Partner cards handle missing optional fields gracefully (logo, URL, tags, status, featured, year)
- Partner cards handle missing or broken logo images gracefully (alt text displayed, layout maintained)
- Partner cards handle very long names/descriptions appropriately (truncate or wrap)
- Partner cards handle many partners (20+) gracefully (grid handles appropriately)
- Partner cards handle invalid URLs gracefully (no breaking)
- Partner cards handle unusual logo aspect ratios appropriately (maintain aspect ratio)
- Accessibility: ARIA labels work correctly for screen readers
- Accessibility: Keyboard navigation works for all interactive elements
- No console errors or layout breaking

### Tasks

- [X] T048 Test empty `partners.yml` file - verify section is hidden entirely
- [X] T049 Test missing `partners.yml` file - verify section is hidden entirely
- [X] T050 Test partner entry with missing logo - verify card displays without breaking layout
- [X] T051 Test partner entry with missing URL - verify card is not clickable
- [X] T052 Test partner entry with missing optional fields (tags, status, featured, year) - verify card displays available fields
- [X] T053 Test partner entry with very long name - verify text wraps appropriately
- [X] T054 Test partner entry with very long description - verify text wraps appropriately
- [X] T055 Test many partners (20+) - verify grid handles gracefully
- [X] T056 Test partner entry with invalid URL format - verify graceful handling
- [X] T057 Test partner entry with missing or broken logo image - verify alt text displayed, layout maintained
- [X] T058 Test partner entry with unusual logo aspect ratio - verify aspect ratio maintained, scaling appropriate
- [X] T059 Verify ARIA labels are present on all card links (`aria-label` attribute)
- [X] T060 Verify alt text is present on all logo images
- [X] T061 Test keyboard navigation through all partner cards - verify focus states visible
- [X] T062 Test screen reader announces partner cards correctly (test with screen reader tool)
- [X] T063 Verify no console errors in browser developer tools
- [X] T064 Verify Partners section integrates cleanly with existing page layout (no visual breaks or spacing issues)
- [X] T065 Test Partners section with dark/light theme toggle - verify styling works in both themes
- [X] T066 Validate `_data/partners.yml` against JSON schema (`specs/008-partners-section/contracts/partners-data-schema.json`)
- [X] T067 Verify all partner entries have required fields (id, name, description)
- [X] T068 Verify all partner IDs are unique across all data files (projects.yml, services.yml, gitbooks.yml, github-organisations.yml, partners.yml)
- [X] T069 Final integration test: View complete page with Partners section and verify all functionality works correctly

## Parallel Execution Examples

### User Story 1 (Phase 3)

**Parallel Group 1**: Template structure tasks can be implemented in sequence but some can be parallelized
- T010-T014: Section container and heading (sequential)
- T015-T027: Partner card template structure (sequential within loop, but can be implemented as a block)
- T028-T029: Sample data and logo (can be done in parallel)

**Execution**: Template structure should be implemented sequentially to ensure proper nesting, but data file and logo can be added in parallel.

### User Story 2 (Phase 4)

**Parallel Group 1**: Responsive testing across breakpoints
- T033-T035: Testing on different screen sizes (can be tested in parallel on different devices or browser windows)

**Execution**: Responsive testing can be done in parallel across different devices or browser resize scenarios.

### User Story 3 (Phase 5)

**Parallel Group 1**: Interaction testing
- T041-T045: Various interaction tests (can be tested in parallel during manual testing session)

**Execution**: Interaction tests can be performed in parallel during a comprehensive testing session.

## Task Summary

- **Total Tasks**: 69
- **Setup Tasks**: 5 (Phase 1)
- **Foundational Tasks**: 4 (Phase 2)
- **User Story 1 Tasks**: 22 (Phase 3)
- **User Story 2 Tasks**: 7 (Phase 4)
- **User Story 3 Tasks**: 9 (Phase 5)
- **Polish Tasks**: 22 (Final Phase)

**Parallel Opportunities**: 
- Phase 2: Data file and directory creation can be done in parallel
- Phase 3: Sample data and logo can be added in parallel with template implementation
- Phase 4: Responsive testing can be done across multiple devices/browsers in parallel
- Phase 5: Interaction tests can be performed in parallel during testing session
- Final Phase: Many edge case tests can be run in parallel

**MVP Scope**: Phases 1-3 (Setup + Foundational + US1) deliver complete, functional Partners section with partner cards displaying logos, names, descriptions, and optional website links.

**Suggested Implementation Order**:
1. Complete Phase 1-2 (Setup and Foundational) - blocking prerequisites
2. Implement Phase 3 (US1) - core functionality - MVP milestone
3. Implement Phase 4 (US2) - responsive design - Enhancement
4. Implement Phase 5 (US3) - interactions - Enhancement
5. Complete Final Phase - polish and edge cases

