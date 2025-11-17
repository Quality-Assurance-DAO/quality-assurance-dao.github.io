# Feature Specification: Site Redesign with Modern UI

**Feature Branch**: `010-site-redesign`  
**Created**: 2025-01-27  
**Status**: Draft  
**Input**: User description: "redesign the site using the following files as a guide @code.html . But ensure the websites content is only drawn from the data files, that it works as a github page, with jekyll and css. Incorporate the qadao logo. Ensure there is still a dark and light theme switch."

## Clarifications

### Session 2025-01-27

- Q: Design guide reference - the spec mentions @code.html but file was not found in repository. How should the design guide be handled? → A: Design guide file (code.html) has been provided - it's a Tailwind CSS-based modern design with dark/light theme support, hero section with video carousel, services grid, partners scrolling section, about section, and contact form. The design uses Inter font, primary purple (#4A00E0) and secondary teal (#00F2A9) colors, and Material Symbols icons.
- Q: CSS implementation approach - design guide uses Tailwind CSS but spec requires vanilla CSS. How should Tailwind design patterns be implemented? → A: Recreate Tailwind design patterns in vanilla CSS with CSS variables - match visual appearance and structure without using Tailwind framework
- Q: Color scheme implementation - design guide uses specific colors (purple #4A00E0, teal #00F2A9). Should exact colors be used or adapted? → A: Use exact color scheme from design guide (primary purple #4A00E0, secondary teal #00F2A9, background colors #f5f5f5 light/#121212 dark, text colors, etc.)
- Q: Typography and font family - design guide uses Inter font. Should Inter be used or maintain existing fonts? → A: Use Inter font family from Google Fonts to match design guide exactly
- Q: Section structure and content - design guide shows Hero, Services, Partners, About, Contact. Spec also mentions Projects. Which sections should be included? → A: Include all design guide sections (Hero, Services, Partners, About, Contact) plus Projects section from existing data files
- Q: Partner cards display - should partner cards show featured badges and status indicators like services and projects? → A: No, partner cards in the "We work with" section should NOT display featured badges or status indicators. Only logos, names, descriptions, links, tags, and optional year should be shown. This keeps the partners section cleaner and more focused.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Redesigned Homepage (Priority: P1)

Visitors to the QADAO website can view a modern, redesigned homepage that displays content dynamically loaded from data files. The page features a clean, professional design with improved visual hierarchy, better spacing, and a cohesive color scheme that maintains the site's identity while providing a more engaging user experience.

**Why this priority**: This is the core functionality - displaying the redesigned site with all content sourced from data files. Without this, the feature cannot deliver value.

**Independent Test**: Can be fully tested by viewing the homepage and verifying all sections display correctly with content from data files.

**Acceptance Scenarios**:

1. **Given** the site is deployed, **When** a visitor views the homepage, **Then** the redesigned layout displays with content from data files (services, partners, projects, slides)
2. **Given** the site has a QADAO logo configured, **When** a visitor views the page, **Then** the logo is prominently displayed in the header/navigation area
3. **Given** the site has data files with content, **When** a visitor views the page, **Then** all sections (hero, services, partners, projects, about, contact) display content from the respective data files
4. **Given** the redesigned site is viewed, **When** a visitor scrolls through the page, **Then** all sections maintain consistent styling and visual hierarchy consistent with the design guide
5. **Given** the site is viewed on different screen sizes, **When** a visitor accesses the site, **Then** the redesigned layout adapts responsively to mobile, tablet, and desktop viewports

---

### User Story 2 - Theme Switching Functionality (Priority: P1)

Visitors can toggle between dark and light themes using a theme switch control. The theme preference is saved and persists across page visits. All content and styling adapt appropriately to the selected theme while maintaining readability and visual consistency.

**Why this priority**: Theme switching is explicitly required and is a core user experience feature. Without it, the redesign would not meet the stated requirements.

**Independent Test**: Can be tested independently by clicking the theme toggle and verifying theme changes, persistence, and content readability in both themes.

**Acceptance Scenarios**:

1. **Given** a visitor is viewing the site, **When** they click the theme toggle button, **Then** the site switches between dark and light themes with all content and styling updating appropriately
2. **Given** a visitor selects a theme preference, **When** they navigate to a different page or return to the site later, **Then** their theme preference is maintained and applied automatically
3. **Given** the site is displayed in dark theme, **When** a visitor views all sections, **Then** all text, backgrounds, and interactive elements have sufficient contrast for readability
4. **Given** the site is displayed in light theme, **When** a visitor views all sections, **Then** all text, backgrounds, and interactive elements have sufficient contrast for readability
5. **Given** a visitor has no saved theme preference, **When** they first visit the site, **Then** the site displays in a default theme (dark or light) with smooth transitions when switching

---

### User Story 3 - Data-Driven Content Display (Priority: P1)

All website content is dynamically loaded from data files (YAML format) located in the `_data/` directory. Content updates can be made by editing data files without requiring code changes. The site displays all available content from these files in the appropriate sections.

**Why this priority**: This is a core requirement - all content must come from data files. This ensures maintainability and separation of content from presentation.

**Independent Test**: Can be tested independently by modifying data files and verifying content updates on the site without code changes.

**Acceptance Scenarios**:

1. **Given** the `_data/services.yml` file contains service entries, **When** a visitor views the services section, **Then** all services from the data file are displayed with their names, descriptions, and associated metadata
2. **Given** the `_data/partners.yml` file contains partner entries, **When** a visitor views the partners section, **Then** all partners from the data file are displayed with their logos, names, descriptions, and links
3. **Given** the `_data/projects.yml` file contains project entries, **When** a visitor views the projects section, **Then** all projects from the data file are displayed with their names, descriptions, and links
4. **Given** the `_data/slides.yml` file contains slide entries, **When** a visitor views the hero/video carousel section, **Then** all slides from the data file are displayed in the carousel with styling that fits the new design
5. **Given** a data file is updated with new entries, **When** the site is rebuilt, **Then** the new content appears on the site without requiring template or code changes
6. **Given** a data file contains optional fields, **When** content is displayed, **Then** optional fields are shown when present and gracefully omitted when absent

---

### User Story 4 - Responsive Design Across Devices (Priority: P2)

The redesigned site adapts seamlessly to different screen sizes and devices, maintaining usability and visual appeal on mobile phones, tablets, and desktop computers. Navigation, content layout, and interactive elements work effectively across all device types.

**Why this priority**: Ensures the feature works well for all users regardless of device, maintaining the improved user experience across all screen sizes.

**Independent Test**: Can be tested independently by resizing the browser window and testing on different devices to verify responsive behavior.

**Acceptance Scenarios**:

1. **Given** the site is viewed on a mobile device (< 768px), **When** a visitor navigates the site, **Then** the layout adapts with appropriate font sizes, spacing, and a mobile-friendly navigation menu
2. **Given** the site is viewed on a tablet device (768px - 1024px), **When** a visitor navigates the site, **Then** the layout displays with tablet-optimized spacing and navigation
3. **Given** the site is viewed on a desktop device (> 1024px), **When** a visitor navigates the site, **Then** the layout displays with full desktop spacing and navigation
4. **Given** interactive elements are displayed, **When** viewed on touch devices, **Then** buttons and links have appropriate touch target sizes (minimum 44x44px)
5. **Given** images and media are displayed, **When** viewed on different screen sizes, **Then** they scale appropriately while maintaining aspect ratios and quality

---

### User Story 5 - Video Carousel Interaction (Priority: P1)

Visitors can interact with the video carousel by clicking on videos to navigate to relevant sections of the site. The carousel displays videos without CTA buttons, and clicking anywhere on a video navigates to the associated section. The carousel maintains the redesigned aesthetic while providing intuitive navigation.

**Why this priority**: This clarifies the video carousel interaction pattern, which is a key part of the redesigned site experience. The carousel must fit the new design and provide clear navigation.

**Independent Test**: Can be tested independently by clicking on videos in the carousel and verifying navigation to the correct sections.

**Acceptance Scenarios**:

1. **Given** a slide in the carousel has a section link configured, **When** a visitor clicks anywhere on the video, **Then** the page navigates to the relevant section (e.g., #portfolio, #services)
2. **Given** the video carousel is displayed, **When** a visitor views the carousel, **Then** no CTA buttons or link buttons are visible on the carousel slides
3. **Given** the video carousel is displayed, **When** a visitor views the carousel, **Then** the carousel styling matches the new design aesthetic with consistent colors, spacing, and visual hierarchy
4. **Given** a slide has a section link, **When** a visitor clicks on the video, **Then** the page smoothly scrolls or navigates to the target section
5. **Given** a slide does not have a section link configured, **When** a visitor clicks on the video, **Then** the click does not trigger navigation (video may play/pause or no action occurs)

---

### Edge Cases

- What happens when a data file is empty or missing? (Site should handle gracefully - sections without data should either not display or show appropriate empty states)
- What happens when a data file entry has missing required fields? (Site should skip invalid entries or display with available fields, maintaining page stability)
- How does the site handle very long text content in data files? (Text should wrap appropriately or truncate with ellipsis to maintain layout consistency)
- What happens when the logo file is missing? (Site should display site title as text fallback or show a placeholder)
- How does the theme toggle handle localStorage being unavailable? (Theme should still work for the current session, just not persist)
- What happens when a visitor has JavaScript disabled? (Site should display in default theme with basic functionality, graceful degradation)
- How does the site handle many entries in data files (e.g., 50+ services)? (Site should display all entries with appropriate pagination or scrolling, maintaining performance)
- What happens when image files referenced in data files are missing? (Site should display alt text or placeholder, maintaining layout)
- How does the site handle special characters or markdown in data file content? (Content should be properly escaped/rendered according to Jekyll conventions)
- What happens when the site is viewed in older browsers? (Site should provide graceful fallbacks for modern CSS features)
- What happens when a visitor clicks on a video in the carousel? (Video should navigate to the section specified in section_link field, or no action if no link is configured)
- How does the carousel handle slides without section links? (Videos without section links should not be clickable or should have no navigation action)
- What happens when a section link points to a non-existent section? (Should handle gracefully - may scroll to top or show error, but should not break page)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a redesigned homepage with modern UI elements matching the design guide, including improved visual hierarchy, spacing, and exact color scheme (primary purple #4A00E0, secondary teal #00F2A9, background colors #f5f5f5 light/#121212 dark)
- **FR-002**: System MUST incorporate the QADAO logo prominently in the header/navigation area, with fallback to site title if logo is unavailable
- **FR-003**: System MUST load all content dynamically from data files located in the `_data/` directory (services.yml, partners.yml, projects.yml, slides.yml, tabs.yml, etc.)
- **FR-004**: System MUST display a theme toggle control that allows visitors to switch between dark and light themes
- **FR-005**: System MUST persist theme preference using browser localStorage, applying the saved theme on subsequent visits
- **FR-006**: System MUST apply theme styling consistently across all sections and components (header, navigation, content sections, footer)
- **FR-007**: System MUST maintain sufficient color contrast in both dark and light themes to meet accessibility standards (WCAG AA minimum)
- **FR-008**: System MUST work as a GitHub Pages site using Jekyll static site generator
- **FR-009**: System MUST use vanilla CSS for styling (no external CSS frameworks like Tailwind required) - Tailwind design patterns from the design guide MUST be recreated using CSS variables, custom properties, and modern CSS features to match the visual appearance
- **FR-010**: System MUST use Inter font family from Google Fonts as the primary typography to match the design guide exactly
- **FR-011**: System MUST display services section with content from `_data/services.yml`, showing service names, descriptions, and associated metadata
- **FR-012**: System MUST display partners section with content from `_data/partners.yml`, showing partner logos, names, descriptions, links, and tags. Note: Featured badges and status indicators MUST NOT be displayed for partners (unlike services and projects)
- **FR-013**: System MUST display projects section with content from `_data/projects.yml`, showing project names, descriptions, and links
- **FR-014**: System MUST display video carousel/hero section with content from `_data/slides.yml` if slides are available, with styling that fits the new design aesthetic
- **FR-015**: System MUST make videos in the carousel clickable, navigating to relevant sections when clicked (no CTA buttons required)
- **FR-016**: System MUST NOT display CTA buttons or link buttons on carousel slides - videos themselves serve as the clickable navigation element
- **FR-017**: System MUST handle missing or empty data files gracefully without breaking page layout
- **FR-018**: System MUST handle data file entries with missing optional fields gracefully, displaying available information
- **FR-019**: System MUST maintain responsive design that adapts to mobile (< 768px), tablet (768px-1024px), and desktop (> 1024px) viewports
- **FR-020**: System MUST ensure all interactive elements (buttons, links) have appropriate touch target sizes on mobile devices (minimum 44x44px)
- **FR-021**: System MUST maintain existing Jekyll site structure and conventions (layouts, includes, data files)
- **FR-022**: System MUST ensure images and media scale appropriately across different screen sizes while maintaining aspect ratios
- **FR-023**: System MUST provide graceful fallbacks when JavaScript is disabled (default theme, basic functionality)
- **FR-024**: System MUST handle theme switching with smooth transitions between dark and light modes
- **FR-025**: System MUST ensure the redesigned layout does not break existing functionality or content structure

### Key Entities

- **Service**: Represents a service offering with fields from `_data/services.yml` (name, description, id, color, optional: logo, icon, url, tags, featured, status)
- **Partner**: Represents a partner organization with fields from `_data/partners.yml` (id, name, description, url, logo, tags, optional: year). Note: Although partners data may contain `status` and `featured` fields, these MUST NOT be displayed in the partners section - only logos, names, descriptions, links, tags, and optional year are shown
- **Project**: Represents a project with fields from `_data/projects.yml` (name, description, url, id, optional: logo, tags, featured, status, year)
- **Slide**: Represents a carousel slide with fields from `_data/slides.yml` (video, headline, section_link or cta_link - link to relevant section when video is clicked, optional: poster, duration). Note: CTA buttons (cta_label) are not displayed - clicking the video itself navigates to the section. The section_link field may be the same as cta_link but is used for navigation when the video is clicked rather than displaying a button.
- **Theme Preference**: User's selected theme (dark or light) stored in browser localStorage and applied via data-theme attribute or CSS classes
- **Site Logo**: QADAO logo image file referenced in `_config.yml` or assets directory, displayed in header/navigation

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visitors can view the redesigned homepage with all sections displaying correctly within 3 seconds of page load
- **SC-002**: QADAO logo is visible and properly displayed in the header/navigation area for 100% of page views
- **SC-003**: All content sections (services, partners, projects, hero/carousel) display content from data files - 100% of displayed content is sourced from `_data/` directory files
- **SC-013**: Video carousel fits the new design aesthetic - styling is consistent with the redesigned site (colors, spacing, visual hierarchy)
- **SC-014**: Video carousel navigation works correctly - clicking on videos navigates to the relevant sections 100% of the time when section links are configured
- **SC-015**: Video carousel displays without CTA buttons - no link buttons are visible on carousel slides
- **SC-004**: Theme toggle functions correctly - visitors can switch between dark and light themes with changes applying immediately (within 500ms)
- **SC-005**: Theme preference persists across page visits - 100% of returning visitors see their previously selected theme applied automatically
- **SC-006**: Both dark and light themes meet accessibility standards - all text has sufficient contrast (WCAG AA compliance) in both themes
- **SC-007**: Site works correctly on GitHub Pages - builds successfully and displays properly when deployed
- **SC-008**: Site adapts responsively to different screen sizes - layout maintains usability and visual appeal on mobile (< 768px), tablet (768px-1024px), and desktop (> 1024px) devices
- **SC-009**: Content updates can be made through data files only - adding, removing, or modifying entries in data files updates the site without requiring code changes
- **SC-010**: Site handles edge cases gracefully - missing data files, empty entries, or missing images do not break page layout or prevent other content from displaying
- **SC-011**: Site maintains performance - page load time remains under 3 seconds on standard broadband connections
- **SC-012**: All interactive elements are accessible - buttons and links are keyboard navigable and have appropriate focus states

## Scope

### In Scope

- Redesigning the homepage layout with modern UI elements matching the design guide exactly
- Including all sections: Hero (with video carousel), Services, Partners, About, Contact, and Projects
- Incorporating QADAO logo in header/navigation
- Implementing theme toggle functionality (dark/light mode switching)
- Ensuring all content is loaded from data files (`_data/` directory)
- Creating responsive CSS styling that works across mobile, tablet, and desktop
- Maintaining Jekyll site structure and GitHub Pages compatibility
- Updating layout templates to use redesigned components
- Ensuring theme persistence using localStorage
- Maintaining accessibility standards (WCAG AA) in both themes
- Handling graceful fallbacks for missing content or data
- Redesigning video carousel to fit new design aesthetic
- Making videos clickable to navigate to relevant sections (removing CTA buttons)

### Out of Scope

- Creating new data file structures (uses existing data files)
- Adding new content sections beyond existing ones
- Implementing backend functionality or server-side processing
- Creating new video content or media assets (uses existing assets)
- Implementing user authentication or user accounts
- Adding analytics or tracking functionality
- Creating content management interface (content edited via YAML files)
- Implementing search functionality
- Adding new interactive features beyond theme toggle
- Modifying existing Jekyll plugins or build process
- Creating mobile apps or native applications

## Dependencies

- Existing Jekyll site structure and configuration (`_config.yml`)
- Existing data files in `_data/` directory (services.yml, partners.yml, projects.yml, slides.yml, tabs.yml)
- Existing layout templates (`_layouts/default.html`)
- Existing include files for components (video-carousel.html, animated-header.html, etc.)
- QADAO logo file (referenced in `_config.yml` or assets directory)
- Existing theme toggle JavaScript (`assets/js/theme-toggle.js`)
- GitHub Pages hosting and Jekyll build system
- Modern browser support for CSS variables and localStorage
- Existing asset structure (images, videos, CSS, JS files)

## Assumptions

- QADAO logo file exists and is accessible at the path specified in `_config.yml` or assets directory
- Data files follow existing YAML structure and conventions
- Existing data files contain valid content that should be displayed
- Visitors have modern browsers with JavaScript enabled (with graceful fallbacks)
- GitHub Pages build system supports the Jekyll version and plugins in use
- CSS variables and modern CSS features are supported (with fallbacks for older browsers)
- Theme toggle JavaScript functionality exists and can be enhanced if needed
- Existing site structure and navigation patterns should be maintained
- Color scheme from the design guide (primary purple #4A00E0, secondary teal #00F2A9, backgrounds, text colors) should be used exactly as specified
- Default theme preference is dark mode (consistent with existing site behavior)
- Existing slides.yml uses cta_link field which can be repurposed for video click navigation (cta_label will not be displayed as a button)

## Constraints

- Must work within existing Jekyll static site generator framework
- Must maintain compatibility with GitHub Pages hosting (no server-side processing)
- Must use existing data file structures and conventions (YAML format, `_data/` directory)
- Must maintain existing site structure and URL patterns
- Must use CSS for styling (may use CSS variables, modern CSS features with fallbacks)
- Must ensure all content is sourced from data files (no hardcoded content in templates)
- Must maintain accessibility standards (WCAG AA minimum for color contrast)
- Must work with existing theme toggle JavaScript functionality
- Must not break existing functionality or content display
- Must handle missing or empty data files gracefully
- Must maintain responsive design patterns consistent with existing site
- Must work with existing asset structure and file paths
- Must ensure logo display works with existing logo file location and format

