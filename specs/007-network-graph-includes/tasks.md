# Tasks: Interactive Network Graph Includes

**Feature**: 007-network-graph-includes  
**Date**: 2024-12-19  
**Status**: Ready for Implementation

## Overview

This document provides an actionable, dependency-ordered task list for implementing three interactive service card Jekyll includes with dynamic network graphs. Tasks are organized by phase, with each user story having its own phase for independent implementation and testing.

## Implementation Strategy

**MVP Scope**: User Story 1 (Interactive Network Graph Display) + User Story 2 (Service Card Layout and Styling) deliver a complete, functional service card with interactive network graph. User Stories 3 and 4 add responsive design and performance optimizations.

**Incremental Delivery**:
1. **Phase 1-2**: Setup and foundational infrastructure
2. **Phase 3**: Core network graph functionality (US1) - MVP deliverable
3. **Phase 4**: Visual styling and layout (US2) - Complete MVP
4. **Phase 5**: Responsive design (US3) - Enhancement
5. **Phase 6**: Performance optimization (US4) - Enhancement
6. **Final Phase**: Polish and cross-cutting concerns

## Dependencies

### User Story Completion Order

```
Phase 1: Setup
    ↓
Phase 2: Foundational (Shared Network Function)
    ↓
Phase 3: User Story 1 (Network Graph Display) ──┐
    ↓                                            │
Phase 4: User Story 2 (Layout & Styling) ───────┼──→ Complete MVP
    ↓                                            │
Phase 5: User Story 3 (Responsive Design) ──────┤
    ↓                                            │
Phase 6: User Story 4 (Performance) ─────────────┘
    ↓
Final Phase: Polish
```

**Parallel Opportunities**:
- Tasks within the same user story phase can often be parallelized (marked with [P])
- Three service card includes (governance, community, ai) can be implemented in parallel after shared function is complete
- Responsive design tasks can be parallelized across breakpoints

## Phase 1: Setup

**Goal**: Initialize project structure and verify prerequisites.

**Independent Test**: Verify `_includes/` directory exists and is accessible for Jekyll includes.

### Tasks

- [X] T001 Verify `_includes/` directory exists in Jekyll site root
- [X] T002 Verify Jekyll site structure supports include files (check `_config.yml` if needed)
- [X] T003 Verify browser testing environment (Chrome, Firefox, Safari, Edge available)

## Phase 2: Foundational - Shared Network Graph Function

**Goal**: Create the reusable JavaScript function that powers all three service card network graphs. This is a blocking prerequisite for all user stories.

**Independent Test**: Can be tested by creating a standalone HTML page with a canvas element and calling `createInteractiveNetwork()` function, verifying that animation starts and nodes move.

### Tasks

- [X] T004 Create `_includes/network_graph.js` file structure with function signature `createInteractiveNetwork(canvasId, nodeCount, color)`
- [X] T005 [P] Implement canvas element selection and context creation in `_includes/network_graph.js`
- [X] T006 [P] Implement canvas dimension setup (width = container width, height = 180px) in `_includes/network_graph.js`
- [X] T007 [P] Implement hex color to RGB conversion function in `_includes/network_graph.js`
- [X] T008 [P] Implement node creation function `createNodes()` with random positioning in `_includes/network_graph.js`
- [X] T009 [P] Implement node initialization with random velocities (0.5-2.0 pixels per frame range) in `_includes/network_graph.js`
- [X] T010 [P] Implement node update function `updateNodes()` with position updates in `_includes/network_graph.js`
- [X] T011 [P] Implement edge collision detection and velocity reversal in `_includes/network_graph.js`
- [X] T012 [P] Implement mouse repulsion calculation (distance-based, proportional force) in `_includes/network_graph.js`
- [X] T013 [P] Implement mouse repulsion application with maximum force cap in `_includes/network_graph.js`
- [X] T014 [P] Implement connection calculation function `calculateConnections()` with 120px threshold in `_includes/network_graph.js`
- [X] T015 [P] Implement connection drawing function `drawConnections()` with distance-based opacity fading in `_includes/network_graph.js`
- [X] T016 [P] Implement node drawing function `drawNodes()` with 3.5px radius circles in `_includes/network_graph.js`
- [X] T017 [P] Implement background drawing function `drawBackground()` with dark color (#1a1a1a) in `_includes/network_graph.js`
- [X] T018 [P] Implement main animation loop `animate()` using requestAnimationFrame in `_includes/network_graph.js`
- [X] T019 [P] Implement mouse move event handler `handleMouseMove()` for cursor tracking in `_includes/network_graph.js`
- [X] T020 [P] Implement mouse leave event handler `handleMouseLeave()` to stop repulsion in `_includes/network_graph.js`
- [X] T021 [P] Implement resize handler `handleResize()` with proportional node position scaling in `_includes/network_graph.js`
- [X] T022 [P] Implement event listener attachment (mousemove, mouseleave, resize) in `_includes/network_graph.js`
- [X] T023 [P] Implement progressive enhancement check (Canvas API support detection) in `_includes/network_graph.js`
- [X] T024 [P] Implement DOM ready check and animation initialization in `_includes/network_graph.js`
- [X] T025 [P] Implement closure state management for instance independence in `_includes/network_graph.js`

## Phase 3: User Story 1 - Interactive Network Graph Display (P1)

**Goal**: Implement the core interactive network graph functionality for all three service cards. Users can see animated network graphs that respond to mouse interactions.

**Independent Test**: View a page with all three service cards, verify each displays an animated network graph with moving nodes, connections appear between nearby nodes, and mouse movement causes nodes to repel from cursor.

**Test Criteria**:
- All three service cards render on page load
- Each card displays animated network graph with 20 nodes
- Nodes move smoothly across canvas
- Connections appear between nearby nodes (within 120px)
- Mouse movement over canvas repels nearby nodes (within 100px)
- Each card has correct color (governance: teal-green, community: blue, AI: purple)

### Tasks

- [X] T026 [P] [US1] Create `_includes/governance_graph.html` with canvas element and service card structure
- [X] T027 [P] [US1] Add canvas element with ID `canvas-governance-{{ include.id | default: 1 }}` in `_includes/governance_graph.html`
- [X] T028 [P] [US1] Include shared network graph function `{% include network_graph.js %}` in `_includes/governance_graph.html`
- [X] T029 [P] [US1] Add JavaScript initialization calling `createInteractiveNetwork('canvas-governance-{{ include.id | default: 1 }}', 20, '#6ee7b7')` in `_includes/governance_graph.html`
- [X] T030 [P] [US1] Add service title "Governance Innovation" in `_includes/governance_graph.html`
- [X] T031 [P] [US1] Add service description for Governance Innovation in `_includes/governance_graph.html`
- [X] T032 [P] [US1] Create `_includes/community_graph.html` with canvas element and service card structure
- [X] T033 [P] [US1] Add canvas element with ID `canvas-community-{{ include.id | default: 1 }}` in `_includes/community_graph.html`
- [X] T034 [P] [US1] Include shared network graph function `{% include network_graph.js %}` in `_includes/community_graph.html`
- [X] T035 [P] [US1] Add JavaScript initialization calling `createInteractiveNetwork('canvas-community-{{ include.id | default: 1 }}', 20, '#60a5fa')` in `_includes/community_graph.html`
- [X] T036 [P] [US1] Add service title "Open-Source Community Building" in `_includes/community_graph.html`
- [X] T037 [P] [US1] Add service description for Open-Source Community Building in `_includes/community_graph.html`
- [X] T038 [P] [US1] Create `_includes/ai_graph.html` with canvas element and service card structure
- [X] T039 [P] [US1] Add canvas element with ID `canvas-ai-{{ include.id | default: 1 }}` in `_includes/ai_graph.html`
- [X] T040 [P] [US1] Include shared network graph function `{% include network_graph.js %}` in `_includes/ai_graph.html`
- [X] T041 [P] [US1] Add JavaScript initialization calling `createInteractiveNetwork('canvas-ai-{{ include.id | default: 1 }}', 20, '#a78bfa')` in `_includes/ai_graph.html`
- [X] T042 [P] [US1] Add service title "AI & Blockchain Strategy" in `_includes/ai_graph.html`
- [X] T043 [P] [US1] Add service description for AI & Blockchain Strategy in `_includes/ai_graph.html`

## Phase 4: User Story 2 - Service Card Layout and Styling (P1)

**Goal**: Style all three service cards with consistent visual design, proper typography, and professional appearance.

**Independent Test**: View the service cards and verify consistent styling, proper spacing, readable text, appropriate visual hierarchy with network graph as focal point, and canvas cursor indicates interactivity.

**Test Criteria**:
- Each card has consistent card wrapper with background color, border radius, padding, and shadow
- Canvas element has dark background with rounded corners
- Service title is displayed prominently below canvas
- Service description is displayed below title with appropriate text styling
- Cards are spaced appropriately with consistent margins
- Canvas cursor changes to crosshair to indicate interactivity

### Tasks

- [X] T044 [P] [US2] Add inline CSS for `.service-card` class (background, border-radius, padding, shadow) in `_includes/governance_graph.html`
- [X] T045 [P] [US2] Add inline CSS for `.network-canvas` class (width 100%, height 180px, dark background, border-radius, cursor crosshair) in `_includes/governance_graph.html`
- [X] T046 [P] [US2] Add inline CSS for `.service-title` class (font-size, font-weight, margins, color) in `_includes/governance_graph.html`
- [X] T047 [P] [US2] Add inline CSS for `.service-description` class (font-size, line-height, margins, color) in `_includes/governance_graph.html`
- [X] T048 [P] [US2] Add inline CSS for `.service-card` class (background, border-radius, padding, shadow) in `_includes/community_graph.html`
- [X] T049 [P] [US2] Add inline CSS for `.network-canvas` class (width 100%, height 180px, dark background, border-radius, cursor crosshair) in `_includes/community_graph.html`
- [X] T050 [P] [US2] Add inline CSS for `.service-title` class (font-size, font-weight, margins, color) in `_includes/community_graph.html`
- [X] T051 [P] [US2] Add inline CSS for `.service-description` class (font-size, line-height, margins, color) in `_includes/community_graph.html`
- [X] T052 [P] [US2] Add inline CSS for `.service-card` class (background, border-radius, padding, shadow) in `_includes/ai_graph.html`
- [X] T053 [P] [US2] Add inline CSS for `.network-canvas` class (width 100%, height 180px, dark background, border-radius, cursor crosshair) in `_includes/ai_graph.html`
- [X] T054 [P] [US2] Add inline CSS for `.service-title` class (font-size, font-weight, margins, color) in `_includes/ai_graph.html`
- [X] T055 [P] [US2] Add inline CSS for `.service-description` class (font-size, line-height, margins, color) in `_includes/ai_graph.html`

## Phase 5: User Story 3 - Responsive Service Cards (P2)

**Goal**: Ensure service cards and network graphs adapt to different screen sizes and handle window resizing gracefully.

**Independent Test**: View service cards on mobile, tablet, and desktop devices, resize browser window, verify canvas resizes appropriately, cards adapt to screen width, animation continues smoothly after resize, and node positions scale proportionally.

**Test Criteria**:
- Canvas adapts to mobile screen width (< 768px) and maintains appropriate height
- Canvas adapts to desktop screen width (> 1024px) and maintains appropriate height
- Canvas resizes to match new container dimensions when browser window resized
- Animation continues to run smoothly without errors after resize
- Network graph adjusts to new canvas dimensions appropriately
- Card layout and text remain readable and properly formatted on all screen sizes

### Tasks

- [X] T056 [P] [US3] Add responsive CSS media query for mobile (< 768px) with adjusted padding and font sizes in `_includes/governance_graph.html`
- [X] T057 [P] [US3] Add responsive CSS media query for mobile (< 768px) with adjusted padding and font sizes in `_includes/community_graph.html`
- [X] T058 [P] [US3] Add responsive CSS media query for mobile (< 768px) with adjusted padding and font sizes in `_includes/ai_graph.html`
- [X] T059 [P] [US3] Add responsive CSS media query for desktop (> 1024px) with enhanced padding and font sizes in `_includes/governance_graph.html`
- [X] T060 [P] [US3] Add responsive CSS media query for desktop (> 1024px) with enhanced padding and font sizes in `_includes/community_graph.html`
- [X] T061 [P] [US3] Add responsive CSS media query for desktop (> 1024px) with enhanced padding and font sizes in `_includes/ai_graph.html`
- [X] T062 [US3] Verify canvas resize handler properly scales node positions proportionally in `_includes/network_graph.js`
- [ ] T063 [US3] Test canvas resizing on window resize event across all three service cards
- [ ] T064 [US3] Verify animation continues smoothly after canvas resize without errors

## Phase 6: User Story 4 - Performance and Integration (P2)

**Goal**: Optimize performance for three simultaneous animations and ensure proper integration with Jekyll site.

**Independent Test**: Load page with service cards, verify all three animations start within 1 second, page remains responsive during animation, shared JavaScript function loads once and is reused, and each canvas responds independently to mouse interactions.

**Test Criteria**:
- All three network graph animations begin within 1 second of page load
- Page remains responsive and interactive with all three animations running simultaneously
- Animations do not cause noticeable performance degradation during scrolling or interaction
- Shared JavaScript function is loaded once and reused by all three cards
- Each canvas responds independently to mouse interactions

### Tasks

- [X] T065 [US4] Verify shared network graph function is included only once per page (check for duplicate includes)
- [X] T066 [US4] Optimize distance calculations in `calculateConnections()` function in `_includes/network_graph.js`
- [X] T067 [US4] Optimize mouse repulsion calculations (early exit for nodes far from mouse) in `_includes/network_graph.js`
- [X] T068 [US4] Verify batch rendering operations (beginPath, stroke batching) in `_includes/network_graph.js`
- [X] T069 [US4] Verify canvas element and context references are cached (minimize DOM queries) in `_includes/network_graph.js`
- [ ] T070 [US4] Test animation frame rate (minimum 30fps) with all three animations running simultaneously
- [X] T071 [US4] Verify each animation instance has independent requestAnimationFrame loop (no blocking)
- [ ] T072 [US4] Test page load time impact (should increase by less than 500ms)
- [X] T073 [US4] Verify animation pauses when browser tab is in background (requestAnimationFrame behavior)

## Final Phase: Polish & Cross-Cutting Concerns

**Goal**: Handle edge cases, progressive enhancement, accessibility, and final integration testing.

**Independent Test**: Test edge cases (Canvas unsupported, JavaScript disabled, multiple instances, rapid resizing, small/large screens), verify progressive enhancement works, and ensure no console errors.

**Test Criteria**:
- Service cards display with static content when Canvas unsupported
- Service cards display with static content when JavaScript disabled
- No errors thrown in console for unsupported browsers
- Multiple instances on same page function independently
- Canvas resizes correctly during rapid window resizing
- Service cards remain functional on very small screens (<320px) and very large screens (>2560px)

### Tasks

- [X] T074 Verify progressive enhancement: service cards display static content when Canvas API not supported
- [X] T075 Verify progressive enhancement: service cards display static content when JavaScript disabled
- [X] T076 Test multiple instances of same service card on same page (verify unique canvas IDs)
- [X] T077 Test rapid browser window resizing (verify no animation errors or performance issues)
- [X] T078 Test service cards on very small screens (<320px) - verify readability and functionality
- [X] T079 Test service cards on very large screens (>2560px) - verify scaling and performance
- [X] T080 Test mouse interactions occurring very rapidly (verify nodes respond appropriately)
- [X] T081 Verify no console errors across all browsers (Chrome, Firefox, Safari, Edge)
- [X] T082 Verify service cards integrate cleanly with existing Jekyll layouts (no layout breaking)
- [X] T083 Verify color contrast meets WCAG AA requirements for title and description text
- [X] T084 Add canvas `aria-hidden="true"` attribute for screen reader accessibility in all three includes
- [ ] T085 Final integration test: Include all three service cards on a test page and verify complete functionality

## Parallel Execution Examples

### User Story 1 (Phase 3)

**Parallel Group 1**: All three service card includes can be created simultaneously
- T026-T031: Governance card (can work in parallel within group)
- T032-T037: Community card (can work in parallel within group)
- T038-T043: AI card (can work in parallel within group)

**Execution**: Three developers can work on different cards simultaneously, or one developer can implement all three cards in sequence.

### User Story 2 (Phase 4)

**Parallel Group 1**: CSS styling for all three cards can be implemented simultaneously
- T044-T047: Governance card styling (can work in parallel within group)
- T048-T051: Community card styling (can work in parallel within group)
- T052-T055: AI card styling (can work in parallel within group)

**Execution**: CSS tasks within each card can be parallelized, and all three cards can be styled simultaneously.

### User Story 3 (Phase 5)

**Parallel Group 1**: Responsive CSS for all three cards
- T056, T059: Governance responsive styles (can work in parallel)
- T057, T060: Community responsive styles (can work in parallel)
- T058, T061: AI responsive styles (can work in parallel)

**Execution**: Mobile and desktop responsive styles can be implemented in parallel, and all three cards can be updated simultaneously.

## Task Summary

- **Total Tasks**: 85
- **Setup Tasks**: 3 (Phase 1)
- **Foundational Tasks**: 22 (Phase 2)
- **User Story 1 Tasks**: 18 (Phase 3)
- **User Story 2 Tasks**: 12 (Phase 4)
- **User Story 3 Tasks**: 9 (Phase 5)
- **User Story 4 Tasks**: 9 (Phase 6)
- **Polish Tasks**: 12 (Final Phase)

**Parallel Opportunities**: 
- Phase 2: Most foundational tasks can be parallelized (marked with [P])
- Phase 3: All three service cards can be implemented in parallel
- Phase 4: All three card stylings can be implemented in parallel
- Phase 5: Responsive styles can be parallelized across cards and breakpoints

**MVP Scope**: Phases 1-4 (Setup + Foundational + US1 + US2) deliver complete, functional service cards with interactive network graphs and professional styling.

**Suggested Implementation Order**:
1. Complete Phase 1-2 (Setup and Foundational) - blocking prerequisites
2. Implement Phase 3 (US1) - core functionality - MVP milestone
3. Implement Phase 4 (US2) - styling - Complete MVP
4. Implement Phase 5-6 (US3, US4) - enhancements
5. Complete Final Phase - polish and edge cases

