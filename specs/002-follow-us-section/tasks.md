# Tasks: Follow Us Section with Social Link Cards

**Feature**: 002-follow-us-section  
**Branch**: `002-follow-us-section`  
**Date**: 2024-12-19  
**Status**: Ready for Implementation

## Overview

This document breaks down the implementation of the Follow Us section with social media link cards into actionable, dependency-ordered tasks. Tasks are organized by user story to enable independent implementation and testing.

## Implementation Strategy

**MVP Scope**: User Story 1 (View Social Media Links as Cards) provides the core user-facing value and should be completed first.

**Incremental Delivery**:
1. **Phase 1**: Setup (project structure verification)
2. **Phase 2**: Foundational (icon assets preparation)
3. **Phase 3**: User Story 1 - Core card display functionality
4. **Phase 4**: User Story 2 - Link functionality and accessibility
5. **Phase 5**: Polish and cross-cutting concerns

## Dependencies

### User Story Completion Order

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational)
    ↓
Phase 3 (US1: View Social Media Links as Cards) ← MVP
    ↓
Phase 4 (US2: Access Social Media Profiles)
    ↓
Phase 5 (Polish)
```

**Note**: User Stories 1 and 2 are both P1 priority but US1 should be completed first as it provides the visual foundation. US2 ensures link functionality and accessibility.

## Parallel Execution Opportunities

### Within User Story 1 (Phase 3)
- **T003-T005**: Can be parallelized (updating different parts of the template)
- **T006-T007**: Can be parallelized (CSS updates and icon verification)

### Within User Story 2 (Phase 4)
- **T008-T010**: Can be parallelized (accessibility features for different aspects)

## Phase 1: Setup

**Goal**: Verify project structure and prepare for implementation.

### Story Goal
N/A - Setup phase

### Independent Test Criteria
- Project structure is verified
- Required files are accessible
- Social media icons directory exists

### Tasks

- [X] T001 Verify _layouts/default.html exists and Contact section is accessible
- [X] T002 Verify assets/css/main.css exists and data-grid/data-card classes are defined
- [X] T003 Verify assets/images/social/ directory exists and contains twitter-icon.svg and youtube-icon.svg

---

## Phase 2: Foundational

**Goal**: Prepare icon assets and verify configuration variables.

### Story Goal
N/A - Foundational phase

### Independent Test Criteria
- All required social media icons are available
- Site configuration variables are accessible in template

### Tasks

- [X] T004 Check if github-icon.svg exists in assets/images/social/, create if missing
- [X] T005 Verify site configuration variables (site.x_handle, site.youtube_handle, site.github.repository_url) are accessible in Jekyll template context

---

## Phase 3: User Story 1 - View Social Media Links as Cards (P1)

**Goal**: As a website visitor, I want to see social media links (X/Twitter, YouTube, GitHub) displayed as cards consistent with other content sections so that I can easily identify and access the organization's social media presence.

**Why this priority**: This is the core user-facing value - visitors need to see social links in a format that matches the rest of the site's design language. Without this, the section appears inconsistent and unprofessional.

### Independent Test Criteria
Can be fully tested by viewing the website and verifying that the "Follow Us" section displays social media links as cards matching the card grid style used in other sections (services, projects, GitBooks, organizations).

### Acceptance Scenarios
1. **Given** the website is loaded, **When** I view the Follow Us section, **Then** I see social media links displayed as cards in a responsive grid layout matching the style of other content sections
2. **Given** the website is loaded, **When** I view the Follow Us section, **Then** I see cards for X/Twitter, YouTube, and GitHub platforms
3. **Given** I am on a mobile device, **When** I view the Follow Us section, **Then** the card grid adapts responsively to the screen size
4. **Given** a social media card is displayed, **When** I click on it, **Then** I am taken to the corresponding social media profile in a new tab
5. **Given** the website is loaded, **When** I view the Follow Us section, **Then** I do not see any email contact links

### Tasks

- [X] T006 [P] [US1] Change section heading from "Contact Us" to "Follow Us" in _layouts/default.html
- [X] T007 [P] [US1] Remove email contact text and mailto link from Contact section in _layouts/default.html
- [X] T008 [P] [US1] Replace existing social-links nav structure with data-grid container in _layouts/default.html
- [X] T009 [P] [US1] Add X/Twitter card with conditional rendering ({% if site.x_handle %}) in _layouts/default.html
- [X] T010 [P] [US1] Add YouTube card with conditional rendering ({% if site.youtube_handle %}) in _layouts/default.html
- [X] T011 [P] [US1] Add GitHub card with conditional rendering ({% if site.github.repository_url %}) in _layouts/default.html
- [X] T012 [US1] Verify data-grid CSS class provides responsive grid layout for social cards in assets/css/main.css
- [X] T013 [US1] Verify data-card CSS class provides consistent styling matching other sections in assets/css/main.css
- [X] T014 [US1] Test card grid rendering with all three social platforms in local Jekyll server
- [X] T015 [US1] Verify cards only display when corresponding URL is configured (test with missing config)

---

## Phase 4: User Story 2 - Access Social Media Profiles (P1)

**Goal**: As a website visitor, I want to access the organization's social media profiles through clearly labeled, accessible cards so that I can follow and engage with the organization on various platforms.

**Why this priority**: Social media engagement is essential for community building and communication. Clear, accessible links ensure visitors can easily connect with the organization.

### Independent Test Criteria
Can be fully tested by clicking on each social media card and verifying that it opens the correct social media profile in a new tab with proper accessibility attributes.

### Acceptance Scenarios
1. **Given** a social media card is displayed, **When** I click on the X/Twitter card, **Then** I am taken to the organization's X/Twitter profile in a new tab
2. **Given** a social media card is displayed, **When** I click on the YouTube card, **Then** I am taken to the organization's YouTube channel in a new tab
3. **Given** a social media card is displayed, **When** I click on the GitHub card, **Then** I am taken to the organization's GitHub repository or profile in a new tab
4. **Given** I use a screen reader, **When** I navigate through social media cards, **Then** each card is announced with its platform name and purpose
5. **Given** I navigate using only keyboard, **When** I tab through the Follow Us section, **Then** all social media cards are reachable and focusable

### Tasks

- [X] T016 [P] [US2] Add target="_blank" and rel="noopener" attributes to all social media card links in _layouts/default.html
- [X] T017 [P] [US2] Add ARIA labels to social media card links (aria-label="Follow us on [Platform]") in _layouts/default.html
- [X] T018 [P] [US2] Add semantic HTML structure (article elements) to social media cards in _layouts/default.html
- [X] T019 [P] [US2] Add alt text to social media icon images in card templates in _layouts/default.html
- [X] T020 [US2] Add keyboard navigation support (focus states, tab order) to social media card links in assets/css/main.css
- [X] T021 [US2] Verify color contrast ratios meet WCAG AA (4.5:1 normal text, 3:1 large text) for card text in assets/css/main.css
- [X] T022 [US2] Test keyboard navigation (Tab through all cards, verify focus visible, Enter to activate)
- [X] T023 [US2] Test with screen reader (verify cards announced correctly with platform names)
- [X] T024 [US2] Verify all social media links open in new tab and navigate to correct URLs
- [X] T025 [US2] Run automated accessibility checker (axe, WAVE, or Lighthouse) and fix any issues

---

## Phase 5: Polish & Cross-Cutting Concerns

**Goal**: Final polish, edge case handling, and cross-cutting improvements.

### Story Goal
N/A - Polish phase

### Independent Test Criteria
- All edge cases are handled gracefully
- Responsive design works across all screen sizes
- Cross-browser compatibility verified
- Performance goals are met

### Tasks

- [X] T026 Handle missing social media URLs gracefully (cards don't display, no errors) in _layouts/default.html
- [X] T027 Handle missing icon files gracefully (display card with platform name text if icon missing) in _layouts/default.html
- [X] T028 Test responsive design at extreme screen sizes (320px mobile, 2560px desktop)
- [X] T029 Verify card grid adapts gracefully when only one or two social links are configured
- [X] T030 Verify section maintains same position on page (after GitHub Organizations, before footer)
- [X] T031 Test cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [X] T032 Verify page load performance (< 2 seconds) and optimize if needed
- [X] T033 Verify visual consistency with existing card styling (matches data-card appearance from other sections)
- [X] T034 Verify no breaking changes to existing Liquid template structure or _config.yml compatibility

---

## Task Summary

**Total Tasks**: 34

**Tasks by Phase**:
- Phase 1 (Setup): 3 tasks
- Phase 2 (Foundational): 2 tasks
- Phase 3 (US1 - View Social Media Links as Cards): 10 tasks
- Phase 4 (US2 - Access Social Media Profiles): 10 tasks
- Phase 5 (Polish): 9 tasks

**Parallel Opportunities**:
- Phase 3: 6 tasks can be parallelized (T006-T011, T012-T013)
- Phase 4: 4 tasks can be parallelized (T016-T019)

**MVP Scope**: Phases 1-3 (Setup, Foundational, US1) = 15 tasks

**Independent Test Criteria per Story**:
- **US1**: Visual verification of card grid rendering matching other sections
- **US2**: Click testing and accessibility verification (keyboard navigation, screen reader)

## Format Validation

✅ All tasks follow the checklist format:
- Checkbox: `- [ ]`
- Task ID: `T001`, `T002`, etc.
- Parallel marker: `[P]` where applicable
- Story label: `[US1]`, `[US2]` for user story phases
- Description with file path: Clear action with exact file path

