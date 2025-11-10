# Tasks: Standardize YAML Data Files and Dynamic Rendering

**Feature**: 001-standardize-yaml-data  
**Branch**: `001-standardize-yaml-data`  
**Date**: 2024-12-19  
**Status**: Ready for Implementation

## Overview

This document breaks down the implementation of standardized YAML data files and dynamic card grid rendering into actionable, dependency-ordered tasks. Tasks are organized by user story to enable independent implementation and testing.

## Implementation Strategy

**MVP Scope**: User Story 1 (View Standardized Data Display) provides the core user-facing value and should be completed first.

**Incremental Delivery**:
1. **Phase 1-2**: Setup and foundational tasks (data migration, validation)
2. **Phase 3**: User Story 1 - Core rendering functionality
3. **Phase 4**: User Story 2 - Data quality and validation
4. **Phase 5**: User Story 3 - Accessibility enhancements
5. **Phase 6**: Polish and cross-cutting concerns

## Dependencies

### User Story Completion Order

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational)
    ↓
Phase 3 (US1: View Standardized Data Display) ← MVP
    ↓
Phase 4 (US2: Access Complete and Valid Data)
    ↓
Phase 5 (US3: Navigate with Accessibility Features)
    ↓
Phase 6 (Polish)
```

**Note**: User Stories 1 and 2 are both P1 priority but US1 should be completed first as it provides the visual foundation. US2 ensures data quality. US3 (P2) can be implemented after core functionality is working.

## Parallel Execution Opportunities

### Within User Story 1 (Phase 3)
- **T010-T013**: Can be parallelized (migrating different YAML files)
- **T014-T015**: Can be parallelized (template updates and CSS updates)

### Within User Story 2 (Phase 4)
- **T016-T019**: Can be parallelized (different validation checks)

### Within User Story 3 (Phase 5)
- **T020-T023**: Can be parallelized (different accessibility features)

## Phase 1: Setup

**Goal**: Initialize project structure and prepare for data migration.

### Story Goal
N/A - Setup phase

### Independent Test Criteria
- Project structure is ready for data migration
- Validation script structure is in place

### Tasks

- [X] T001 Create validation script structure in scripts/validate-data.rb
- [X] T002 Create data migration script structure in scripts/migrate-data.rb
- [X] T003 Set up test data directory structure for validation testing

---

## Phase 2: Foundational

**Goal**: Implement data migration and validation infrastructure that blocks all user stories.

### Story Goal
N/A - Foundational phase

### Independent Test Criteria
- All YAML files have standardized schema with `id` fields
- Validation script can detect duplicate IDs, missing required fields, and invalid URLs
- Data migration preserves all existing data

### Tasks

- [X] T004 [P] Implement slug generation function in scripts/migrate-data.rb (converts name to URL-safe id)
- [X] T005 [P] Implement ID uniqueness check across all four YAML files in scripts/validate-data.rb
- [X] T006 [P] Implement required field validation (id, name, description) in scripts/validate-data.rb
- [X] T007 [P] Implement conditional URL validation (required for projects/GitBooks/organizations, optional for services) in scripts/validate-data.rb
- [X] T008 [P] Implement URL format validation in scripts/validate-data.rb
- [X] T009 [P] Migrate projects.yml: Generate id fields from name, preserve existing data, validate in _data/projects.yml

---

## Phase 3: User Story 1 - View Standardized Data Display (P1)

**Goal**: As a website visitor, I want to see all projects, services, GitBooks, and GitHub organizations displayed in a consistent, professional card-based layout so that I can easily browse and understand the Quality Assurance DAO's offerings and resources.

**Why this priority**: This is the core user-facing value - visitors need to see content in a clean, accessible format. Without this, the site appears unprofessional and difficult to navigate.

### Independent Test Criteria
Can be fully tested by viewing the website and verifying that all four data types (projects, services, GitBooks, organizations) render in consistent card grids with proper styling, tags, and optional metadata visible.

### Acceptance Scenarios
1. **Given** the website is loaded, **When** I view the services section, **Then** I see service cards in a responsive grid layout with name, description, and optional tags displayed
2. **Given** the website is loaded, **When** I view the projects section, **Then** I see project cards with name, description, URL link, and optional metadata (year, status, featured badge) displayed
3. **Given** the website is loaded, **When** I view GitBooks or GitHub organizations sections, **Then** I see consistent card styling matching the projects and services sections
4. **Given** I am on a mobile device, **When** I view any data section, **Then** the card grid adapts responsively to the screen size
5. **Given** a data item has optional metadata (logo, tags, status), **When** I view that item, **Then** the optional fields are displayed when present and gracefully omitted when absent

### Tasks

- [X] T010 [P] [US1] Migrate services.yml: Generate id fields from name, preserve existing data, validate in _data/services.yml
- [X] T011 [P] [US1] Migrate gitbooks.yml: Generate id fields from name, preserve existing data, validate in _data/gitbooks.yml
- [X] T012 [P] [US1] Migrate github-organisations.yml: Generate id fields from name, preserve existing data, validate in _data/github-organisations.yml
- [X] T013 [P] [US1] Update services section template to use card grid layout with data-card class in _layouts/default.html
- [X] T014 [P] [US1] Update projects section template to use card grid layout with data-card class in _layouts/default.html
- [X] T015 [US1] Add GitBooks section template with card grid layout in _layouts/default.html
- [X] T016 [US1] Add GitHub organizations section template with card grid layout in _layouts/default.html
- [X] T017 [US1] Create data-card CSS class with responsive grid layout matching service-grid pattern in assets/css/main.css
- [X] T018 [US1] Add conditional rendering for optional fields (tags, logo, status, featured badge) in card templates in _layouts/default.html
- [X] T019 [US1] Add responsive CSS for data-card grid (mobile-first, 320px to 2560px) in assets/css/main.css
- [X] T020 [US1] Add tag badge styling for tags array display in assets/css/main.css
- [X] T021 [US1] Add featured badge styling for featured boolean field in assets/css/main.css
- [X] T022 [US1] Add status indicator styling for status field in assets/css/main.css
- [X] T023 [US1] Add logo image styling within cards in assets/css/main.css
- [X] T024 [US1] Ensure cards are clickable links when url field is present in _layouts/default.html
- [ ] T025 [US1] Test card grid rendering with all four datasets in local Jekyll server

---

## Phase 4: User Story 2 - Access Complete and Valid Data (P1)

**Goal**: As a website visitor, I want all displayed data to be complete and accurate so that I can trust the information and access all available resources without broken links or missing information.

**Why this priority**: Data quality is foundational - incomplete or duplicate data creates a poor user experience and undermines trust in the organization.

### Independent Test Criteria
Can be fully tested by validating all YAML files contain required fields, have no duplicate IDs, and all URLs are accessible and properly formatted.

### Acceptance Scenarios
1. **Given** the YAML files are processed, **When** I check for required fields, **Then** every item has `id`, `name`, and `description` fields present, and projects/GitBooks/organizations have `url` fields present (services may omit `url`), and validation fails with clear error messages if any required fields are missing
2. **Given** the YAML files are processed, **When** I check for duplicates, **Then** no two items share the same `id` value across all files
3. **Given** a data item has a `url` field, **When** I verify the URL, **Then** it is a valid, properly formatted URL, and validation fails with clear error messages if the URL format is invalid
4. **Given** optional metadata fields are present, **When** I verify their format, **Then** they conform to expected data types (strings, arrays, booleans as appropriate)
5. **Given** the website renders data, **When** I view any section, **Then** no items are missing or display as empty/undefined

### Tasks

- [X] T026 [P] [US2] Run validation script on all four YAML files and fix any duplicate ID errors in _data/*.yml
- [X] T027 [P] [US2] Run validation script and fix any missing required field errors (id, name, description) in _data/*.yml
- [X] T028 [P] [US2] Run validation script and fix any missing conditional URL errors (projects/GitBooks/organizations must have url) in _data/*.yml
- [X] T029 [P] [US2] Run validation script and fix any invalid URL format errors in _data/*.yml
- [X] T030 [US2] Add validation error reporting with clear messages (file, item, field) in scripts/validate-data.rb
- [X] T031 [US2] Add validation script to pre-commit hook or CI/CD workflow to block deployment on errors
- [X] T032 [US2] Test validation script with missing required fields (should fail with clear errors)
- [X] T033 [US2] Test validation script with duplicate IDs (should fail with clear errors)
- [X] T034 [US2] Test validation script with invalid URLs (should fail with clear errors)
- [X] T035 [US2] Verify all data items render correctly without empty/undefined values in browser

---

## Phase 5: User Story 3 - Navigate with Accessibility Features (P2)

**Goal**: As a user with assistive technologies, I want the data displays to be accessible with proper semantic HTML, ARIA labels, and keyboard navigation so that I can fully interact with the content.

**Why this priority**: Accessibility is essential for inclusive design and legal compliance, but can be implemented after core functionality is working.

### Independent Test Criteria
Can be fully tested by using screen readers and keyboard navigation to verify all interactive elements are accessible and properly labeled.

### Acceptance Scenarios
1. **Given** I use a screen reader, **When** I navigate through data cards, **Then** each card is announced with its name, description, and link information
2. **Given** I navigate using only keyboard, **When** I tab through the page, **Then** all links and interactive elements are reachable and focusable
3. **Given** I view the page, **When** I check color contrast, **Then** all text meets WCAG AA contrast requirements
4. **Given** images or logos are displayed, **When** I use assistive technology, **Then** all images have appropriate alt text or are marked as decorative

### Tasks

- [X] T036 [P] [US3] Add semantic HTML structure (article elements, proper heading hierarchy) to card templates in _layouts/default.html
- [X] T037 [P] [US3] Add ARIA labels and roles to card containers and links in _layouts/default.html
- [X] T038 [P] [US3] Add keyboard navigation support (focus states, tab order) to card links in assets/css/main.css
- [X] T039 [P] [US3] Add alt text or decorative marking for logo images in card templates in _layouts/default.html
- [X] T040 [US3] Verify color contrast ratios meet WCAG AA (4.5:1 normal text, 3:1 large text) in assets/css/main.css
- [X] T041 [US3] Test keyboard navigation (Tab through all cards, verify focus visible)
- [X] T042 [US3] Test with screen reader (verify cards announced correctly)
- [X] T043 [US3] Run automated accessibility checker (axe, WAVE, or Lighthouse) and fix any issues

---

## Phase 6: Polish & Cross-Cutting Concerns

**Goal**: Final polish, edge case handling, and cross-cutting improvements.

### Story Goal
N/A - Polish phase

### Independent Test Criteria
- All edge cases are handled gracefully
- Brand consistency is maintained
- Performance goals are met
- Cross-browser compatibility verified

### Tasks

- [X] T044 Handle very long descriptions (truncate or wrap appropriately) in assets/css/main.css
- [X] T045 Handle empty tags arrays (don't display empty tag containers) in _layouts/default.html
- [X] T046 Handle special characters in names/descriptions (proper HTML escaping) in _layouts/default.html
- [X] T047 Verify featured items display visual distinction (badge/indicator) in assets/css/main.css
- [X] T048 Test responsive design at extreme screen sizes (320px mobile, 2560px desktop)
- [X] T049 Verify brand consistency (color scheme, typography, spacing) matches existing design
- [X] T050 Verify page load performance (< 2 seconds) and optimize if needed
- [X] T051 Test cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [X] T052 Update documentation (README or contributing guide) with new data schema requirements
- [X] T053 Verify compatibility with existing Liquid template loops and _config.yml (no breaking changes)

---

## Task Summary

**Total Tasks**: 53

**Tasks by Phase**:
- Phase 1 (Setup): 3 tasks
- Phase 2 (Foundational): 6 tasks
- Phase 3 (US1 - View Standardized Data Display): 16 tasks
- Phase 4 (US2 - Access Complete and Valid Data): 10 tasks
- Phase 5 (US3 - Navigate with Accessibility Features): 8 tasks
- Phase 6 (Polish): 10 tasks

**Parallel Opportunities**:
- Phase 2: 6 tasks can be parallelized (T004-T009)
- Phase 3: 13 tasks can be parallelized (T010-T014, T017-T023)
- Phase 4: 4 tasks can be parallelized (T026-T029)
- Phase 5: 4 tasks can be parallelized (T036-T039)

**MVP Scope**: Phases 1-3 (Setup, Foundational, US1) = 25 tasks

**Independent Test Criteria per Story**:
- **US1**: Visual verification of card grid rendering for all four datasets
- **US2**: Validation script confirms all required fields, no duplicates, valid URLs
- **US3**: Screen reader and keyboard navigation testing confirms accessibility

## Format Validation

✅ All tasks follow the checklist format:
- Checkbox: `- [ ]`
- Task ID: `T001`, `T002`, etc.
- Parallel marker: `[P]` where applicable
- Story label: `[US1]`, `[US2]`, `[US3]` for user story phases
- Description with file path: Clear action with exact file path

