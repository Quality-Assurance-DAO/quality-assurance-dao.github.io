# Feature Specification: Partners Section

**Feature Branch**: `008-partners-section`  
**Created**: 2024-12-19  
**Status**: Draft  
**Input**: User description: "Create a "We work with" section in the same style as the other sections. Add a partners.yml data file that cards in this section draw their data from. Ensure that logos of partners can be embedded as images in each card"

## Clarifications

### Session 2024-12-19

- Q: Should partners.yml follow the standardized DataItem schema from spec 001? → A: Yes - Follow standardized schema: id (required), name (required), description (required), url (optional), logo (optional), plus other optional fields (tags, status, featured, etc.)
- Q: Should partner cards follow the project card pattern (entire card clickable) or service card pattern (separate "Learn more" link)? → A: Entire card is clickable when URL exists (wrap card in <a> tag, like project cards)
- Q: What should happen when partners.yml is empty or missing? → A: Hide the section entirely (don't render the section at all)
- Q: Should external partner links include security attributes? → A: Yes - Use rel="noopener noreferrer" on all external partner links (security best practice)
- Q: What format should partner logo paths use? → A: Relative paths from site root (e.g., "/assets/images/partners/logo.png") - matches existing services/projects pattern

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Partner Organizations (Priority: P1)

Visitors to the QADAO website can view a "We work with" section that displays partner organizations in card format, matching the visual style of other sections (Services, Projects). Each partner card displays the partner's logo as an image, name, and optional description. This helps visitors understand QADAO's network and partnerships.

**Why this priority**: This is the core functionality - displaying partner information in a consistent, professional manner. Without this, the feature cannot deliver value.

**Independent Test**: Can be fully tested by adding partners.yml with partner data and verifying cards render correctly with logos, names, and descriptions in the same style as service/project cards.

**Acceptance Scenarios**:

1. **Given** the site has a partners.yml data file with partner entries, **When** a visitor views the "We work with" section, **Then** partner cards are displayed in a grid layout matching the style of other sections
2. **Given** a partner entry has a logo image path, **When** the partner card is rendered, **Then** the logo image is displayed prominently in the card
3. **Given** a partner entry has a name, **When** the partner card is rendered, **Then** the partner name is displayed as a heading
4. **Given** a partner entry has a description, **When** the partner card is rendered, **Then** the description text is displayed below the name
5. **Given** a partner entry has a website URL, **When** a visitor clicks anywhere on the partner card, **Then** they are taken to the partner's website (opens in new tab with `target="_blank" rel="noopener noreferrer"`). The entire card acts as a clickable link, matching the project card pattern.

---

### User Story 2 - Responsive Partner Display (Priority: P2)

Partner cards adapt to different screen sizes, maintaining readability and visual consistency across mobile, tablet, and desktop devices. The grid layout adjusts automatically based on available screen space.

**Why this priority**: Ensures the feature works well for all users regardless of device, maintaining the professional appearance of the site.

**Independent Test**: Can be tested independently by resizing the browser window and verifying cards reflow appropriately, maintaining consistent spacing and readability.

**Acceptance Scenarios**:

1. **Given** the site is viewed on a mobile device (< 768px), **When** the "We work with" section is displayed, **Then** partner cards stack vertically or display in a single column with appropriate spacing
2. **Given** the site is viewed on a tablet device (768px - 1024px), **When** the "We work with" section is displayed, **Then** partner cards display in 2-3 columns with appropriate spacing
3. **Given** the site is viewed on a desktop device (> 1024px), **When** the "We work with" section is displayed, **Then** partner cards display in a multi-column grid (3-4 columns) with appropriate spacing
4. **Given** partner logos are displayed, **When** the screen is resized, **Then** logos maintain their aspect ratio and scale appropriately

---

### User Story 3 - Partner Card Interactions (Priority: P3)

Partner cards provide visual feedback on hover and support optional click-through to partner websites. Cards maintain accessibility standards with proper focus states and keyboard navigation.

**Why this priority**: Enhances user experience and maintains consistency with other card sections, but is not essential for basic functionality.

**Independent Test**: Can be tested independently by hovering over cards, clicking cards with URLs, and using keyboard navigation to verify interactions work correctly.

**Acceptance Scenarios**:

1. **Given** a partner card has a URL, **When** a visitor hovers over the card, **Then** the card provides visual feedback (e.g., slight elevation, shadow change) indicating it is clickable
2. **Given** a partner card has a URL, **When** a visitor clicks anywhere on the card, **Then** they are navigated to the partner's website in a new tab/window with security attributes (`target="_blank" rel="noopener noreferrer"`) - entire card acts as clickable link
3. **Given** a partner card is focused via keyboard navigation, **When** the card receives focus, **Then** a visible focus indicator is displayed
4. **Given** a partner card has a URL, **When** a visitor presses Enter while the card is focused, **Then** they are navigated to the partner's website

---

### Edge Cases

- What happens when partners.yml is empty or missing? (Section should be hidden entirely - not rendered at all. Use conditional rendering to check if partners data exists before displaying the section)
- How does the system handle partner entries with missing required fields (id, name, description)? (Should handle gracefully, display available information. Missing id should be auto-generated from name per standardized schema rules)
- What happens when a partner logo image file is missing or broken? (Should display alt text or placeholder, not break the layout)
- How does the system handle very long partner names or descriptions? (Should truncate or wrap appropriately to maintain card consistency)
- What happens when there are many partners (20+)? (Grid should handle gracefully, may paginate or scroll)
- How does the system handle partner entries with invalid URLs? (Should validate URLs, handle gracefully if invalid)
- What happens when partner logos have unusual aspect ratios? (Should maintain aspect ratio, scale appropriately within card constraints)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a "We work with" section on the main page with the same visual style as other sections (Services, Projects)
- **FR-002**: System MUST read partner data from a `partners.yml` file located in the `_data/` directory, following the standardized DataItem schema (id, name, description required; url, logo, and other fields optional)
- **FR-003**: System MUST display partner cards in a grid layout matching the `data-grid` style used in other sections
- **FR-004**: System MUST display partner logos as images in each partner card when a logo path is provided
- **FR-005**: System MUST display partner names as headings (h3) in each partner card
- **FR-006**: System MUST display partner descriptions as paragraph text in each partner card when provided
- **FR-007**: System MUST support optional website URLs for partner cards that link to partner websites
- **FR-008**: System MUST open partner website links in a new tab/window when clicked, with `target="_blank"` and `rel="noopener noreferrer"` attributes for security
- **FR-017**: System MUST make the entire partner card clickable (wrapped in `<a>` tag) when a URL is provided, matching the project card pattern
- **FR-009**: System MUST maintain responsive design, adapting partner card layout to different screen sizes
- **FR-010**: System MUST use the same `data-card` CSS class and styling as other card sections for visual consistency
- **FR-011**: System MUST handle missing or invalid logo images gracefully (display alt text, maintain layout)
- **FR-012**: System MUST support optional fields in partner data (description, URL, tags) without breaking when absent
- **FR-013**: System MUST provide hover effects on partner cards matching the style of other card sections
- **FR-014**: System MUST support keyboard navigation and focus states for accessible interaction
- **FR-015**: System MUST display partner cards even when some optional fields are missing
- **FR-016**: System MUST handle empty partners.yml file gracefully - when the file is empty, missing, or contains no valid partner entries, the entire "We work with" section MUST be hidden (not rendered)

### Key Entities

- **Partner**: Represents an organization that QADAO works with. Follows the standardized DataItem schema from spec 001. Required fields: `id` (URL-safe slug, auto-generated from name), `name` (display name), `description` (text description). Optional fields: `url` (website URL), `logo` (image path relative to site root, e.g., "/assets/images/partners/logo.png"), `tags` (array of strings), `status` (status indicator), `featured` (boolean flag), `year` (numeric year), `category` (category classification), `repo` (repository URL), `contact` (contact information). The `id` field must be unique across all data files (projects.yml, services.yml, gitbooks.yml, github-organisations.yml, partners.yml).
- **Partners Data File**: YAML file (`partners.yml`) containing an array of partner entries, following the standardized DataItem schema from spec 001, consistent with `services.yml` and `projects.yml`

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visitors can view all partner organizations in a consistent card format within 2 seconds of page load
- **SC-002**: Partner cards maintain visual consistency with other sections (Services, Projects) - 100% match in card styling, spacing, and typography
- **SC-003**: Partner logos display correctly for 100% of partners with valid logo image paths
- **SC-004**: Partner cards adapt responsively to screen sizes - cards reflow appropriately on mobile (< 768px), tablet (768px-1024px), and desktop (> 1024px) devices
- **SC-005**: Partner cards with URLs are clickable and navigate correctly - 100% of valid URLs open partner websites in new tabs
- **SC-006**: Section integrates seamlessly with existing page layout - no visual breaks, spacing issues, or layout conflicts with other sections
- **SC-007**: Partner data can be managed entirely through partners.yml file - no code changes required to add, remove, or modify partners
- **SC-008**: Section handles edge cases gracefully - missing logos, empty data file, or invalid URLs do not break the page layout or functionality. When partners.yml is empty or missing, the section is hidden entirely without affecting other page sections

## Scope

### In Scope

- Creating a "We work with" section in the main page layout
- Creating `partners.yml` data file structure
- Implementing partner card display using existing `data-card` styling
- Supporting partner logos as images in cards
- Supporting partner names, descriptions, and optional website URLs
- Responsive design matching other sections
- Integration with existing Jekyll site structure

### Out of Scope

- Partner logo image creation or optimization (assumes logos are provided)
- Partner data entry interface (data managed via YAML file editing)
- Partner filtering or search functionality
- Partner categories or grouping
- Partner detail pages or expanded views
- Partner logo animation or special effects
- Partner relationship management system
- Analytics tracking for partner link clicks
- Partner logo upload functionality

## Dependencies

- Existing Jekyll site structure and layout system
- Existing `data-card` CSS styling and `data-grid` layout system
- Existing section structure and container system
- Jekyll Liquid templating engine for data file processing
- Image assets directory structure for storing partner logos

## Assumptions

- Partner logos will be provided as image files (PNG, SVG, or JPG format)
- Partner logos will be stored in the site's assets/images directory (e.g., `/assets/images/partners/`) with paths specified relative to site root (e.g., "/assets/images/partners/logo.png"), matching the pattern used by services and projects
- Partner data will be managed manually through YAML file editing
- Partner entries will follow the standardized DataItem schema from spec 001, consistent with services.yml and projects.yml files
- The section will be placed after the Projects section and before the About section (or in a logical location in the page flow)
- Partner logos will have reasonable aspect ratios and file sizes for web display
- Partner website URLs will be valid and accessible
- The site uses the same responsive breakpoints as other sections (768px, 1024px)

## Constraints

- Must work within existing Jekyll static site generator framework
- Must use existing CSS styling system (no new major CSS framework dependencies)
- Must maintain compatibility with GitHub Pages hosting
- Must follow existing data file patterns (YAML format, `_data/` directory)
- Must maintain accessibility standards (WCAG AA compliance)
- Must include security attributes (`rel="noopener noreferrer"`) on all external partner links
- Must work with existing dark/light theme system
- Must not break existing page layout or other sections
