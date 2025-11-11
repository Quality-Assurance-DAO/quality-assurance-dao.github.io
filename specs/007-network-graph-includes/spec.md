# Feature Specification: Interactive Network Graph Includes

**Feature Branch**: `007-network-graph-includes`  
**Created**: 2024-12-19  
**Status**: Draft  
**Input**: User description: "Interactive Network Graph Includes for QADAO (Jekyll) - Create three interactive service cards for a Jekyll (GitHub Pages) site — each displaying a dynamic network graph representing: Governance Innovation, Open-Source Community Building, AI & Blockchain Strategy"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Interactive Network Graph Display (Priority: P1)

As a website visitor, I want to see interactive network graphs on service cards so that I can visually understand the interconnected nature of QADAO's services and engage with the visualizations through mouse interaction.

**Why this priority**: The interactive network graphs are the core visual feature of the service cards. Users need to see animated network nodes and connections that respond to their mouse movements, providing an engaging and modern way to represent the services. This delivers the primary value of visual engagement and interactivity.

**Independent Test**: Can be fully tested by viewing a page with the service cards, verifying that each card displays a canvas with an animated network graph, confirming that nodes move and connect dynamically, and observing that mouse movement causes nodes to repel from the cursor.

**Acceptance Scenarios**:

1. **Given** I visit a page with the service cards, **When** the page loads, **Then** I see three service cards displayed
2. **Given** I view a service card, **When** the page loads, **Then** I see a canvas element displaying an animated network graph with moving nodes
3. **Given** I view a service card, **When** the animation is running, **Then** I see nodes (points) that move smoothly across the canvas
4. **Given** I view a service card, **When** the animation is running, **Then** I see connections (lines) between nearby nodes that create a network graph pattern
5. **Given** I view a service card, **When** I move my mouse over the canvas, **Then** nodes near my cursor repel away from the mouse position
6. **Given** I view a service card, **When** I move my mouse away from the canvas, **Then** nodes return to their normal movement pattern
7. **Given** I view the three service cards, **When** I observe each card, **Then** each card displays a network graph with a distinct color (governance: teal/green, community: blue, AI: purple)
8. **Given** I view a service card, **When** I see the card, **Then** I see the service title and description displayed below the canvas

---

### User Story 2 - Service Card Layout and Styling (Priority: P1)

As a website visitor, I want service cards to be visually consistent and well-styled so that the network graphs are presented in a professional and cohesive manner that matches the site's design.

**Why this priority**: Visual consistency and proper styling ensure the service cards integrate seamlessly with the site design and provide a professional appearance. The cards must be properly styled with appropriate backgrounds, spacing, and typography to deliver a polished user experience.

**Independent Test**: Can be fully tested by viewing the service cards and verifying that they have consistent styling, proper spacing, readable text, and appropriate visual hierarchy with the network graph as the focal point.

**Acceptance Scenarios**:

1. **Given** I view the service cards, **When** I see the cards, **Then** each card has a consistent card wrapper with background color, border radius, padding, and shadow
2. **Given** I view a service card, **When** I see the card, **Then** the canvas element has a dark background with rounded corners
3. **Given** I view a service card, **When** I see the card, **Then** the service title is displayed prominently below the canvas
4. **Given** I view a service card, **When** I see the card, **Then** the service description is displayed below the title with appropriate text styling
5. **Given** I view the service cards, **When** I see multiple cards, **Then** cards are spaced appropriately with consistent margins between them
6. **Given** I view a service card, **When** I see the canvas, **Then** the canvas cursor changes to indicate interactivity (crosshair or pointer)

---

### User Story 3 - Responsive Service Cards (Priority: P2)

As a website visitor using different devices or screen sizes, I want the service cards and network graphs to adapt to my screen dimensions so that the visualizations remain visible and functional regardless of my device.

**Why this priority**: Responsive design ensures the feature works across all devices and screen sizes, making it accessible to all users. The canvas and cards must resize correctly to maintain visual quality and functionality on mobile, tablet, and desktop devices.

**Independent Test**: Can be fully tested by viewing the service cards on different screen sizes (mobile, tablet, desktop) and resizing the browser window, verifying that the canvas resizes appropriately, cards adapt to the screen width, and the animation continues to function correctly.

**Acceptance Scenarios**:

1. **Given** I view the service cards on a mobile device, **When** the page loads, **Then** the canvas adapts to the mobile screen width and maintains appropriate height
2. **Given** I view the service cards on a desktop, **When** the page loads, **Then** the canvas adapts to the desktop screen width and maintains appropriate height
3. **Given** I view the service cards, **When** I resize my browser window, **Then** the canvas resizes to match the new container dimensions
4. **Given** I view the service cards, **When** the canvas resizes, **Then** the animation continues to run smoothly without errors
5. **Given** I view the service cards, **When** the canvas resizes, **Then** the network graph adjusts to the new canvas dimensions appropriately
6. **Given** I view the service cards on any screen size, **When** I see the cards, **Then** the card layout and text remain readable and properly formatted

---

### User Story 4 - Performance and Integration (Priority: P2)

As a website visitor, I want the service cards to load quickly and not impact page performance so that the site remains fast and responsive even with multiple animated network graphs.

**Why this priority**: Performance is critical for user experience. Multiple animated canvases must be lightweight and optimized to avoid slowing down page load times or causing performance issues, especially on lower-end devices.

**Independent Test**: Can be fully tested by loading a page with the service cards and verifying that the page loads quickly, all three animations start promptly, and the page remains responsive during animation.

**Acceptance Scenarios**:

1. **Given** I visit a page with the service cards, **When** the page loads, **Then** all three network graph animations begin within 1 second of page load
2. **Given** I view the service cards, **When** all three animations are running simultaneously, **Then** the page remains responsive and interactive (no freezing or lag)
3. **Given** I view the service cards, **When** I scroll or interact with the page, **Then** the animations do not cause noticeable performance degradation
4. **Given** I view the service cards, **When** the page is loaded, **Then** the shared JavaScript function is loaded once and reused by all three cards
5. **Given** I view the service cards, **When** I interact with multiple canvases, **Then** each canvas responds independently to mouse interactions

---

### Edge Cases

- What happens when the canvas element is not supported by the browser? → System should handle gracefully, either showing a static card with service information or hiding the canvas element
- What happens when JavaScript is disabled? → System should display service cards with static content (title and description) without the interactive network graphs (progressive enhancement approach)
- What happens when the service cards are included multiple times on the same page? → Each instance should function independently with its own canvas and animation
- What happens when the browser window is resized very rapidly? → Canvas should resize appropriately without causing animation errors or performance issues
- What happens when the page is viewed on a very small screen (<320px)? → Service cards should remain functional with appropriately sized canvas and readable text
- What happens when the page is viewed on a very large screen (>2560px)? → Service cards should scale appropriately without performance degradation
- What happens when mouse interactions occur very rapidly? → Nodes should respond appropriately to mouse movements without causing erratic behavior
- How does the animation behave when the browser tab is in the background? → Animation should pause or reduce frame rate to conserve resources (requestAnimationFrame behavior)
- What happens when the device has limited processing power? → Animation should maintain acceptable frame rate (minimum 30fps) or gracefully degrade
- What happens when multiple canvases are visible simultaneously and user interacts with one? → Only the canvas under the cursor should respond to mouse interactions, other canvases continue normal animation

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST create three Jekyll include files for service cards: governance_graph.html, community_graph.html, and ai_graph.html
- **FR-002**: System MUST create a shared JavaScript include file (network_graph.js) containing a reusable function for creating interactive network graphs
- **FR-003**: System MUST render a canvas element within each service card for displaying the network graph
- **FR-004**: System MUST render an animated network graph on each canvas with configurable number of nodes (default 20) that move smoothly with continuous movement
- **FR-005**: System MUST render connections (lines) between nodes based on distance threshold (nodes connect if within 120px distance) to create a network graph pattern
- **FR-006**: System MUST display each service card with appropriate title and description (Governance Innovation, Open-Source Community Building, AI & Blockchain Strategy)
- **FR-007**: System MUST use distinct colors for each service card's network graph (governance: #6ee7b7/teal-green, community: #60a5fa/blue, AI: #a78bfa/purple)
- **FR-008**: System MUST respond to mouse movement over canvas by repelling nearby nodes (within 100px) away from cursor position
- **FR-009**: System MUST stop repelling nodes when mouse leaves the canvas area
- **FR-010**: System MUST resize canvas responsively when browser window is resized
- **FR-011**: System MUST adapt canvas dimensions to different screen sizes (mobile, tablet, desktop)
- **FR-012**: System MUST maintain smooth animation performance during canvas resizing
- **FR-013**: System MUST style service cards with consistent card wrapper (background, border radius, padding, shadow)
- **FR-014**: System MUST style canvas with dark background, rounded corners, and appropriate dimensions (100% width, 180px height)
- **FR-015**: System MUST style service titles and descriptions with appropriate typography and spacing
- **FR-016**: System MUST change canvas cursor to crosshair to indicate interactivity
- **FR-017**: System MUST integrate shared JavaScript function that accepts parameters (canvasId, nodeCount, color) for customization
- **FR-018**: System MUST allow service cards to be embedded in Jekyll layouts or Markdown files using include syntax
- **FR-019**: System MUST handle browsers that do not support canvas element gracefully (progressive enhancement)
- **FR-020**: System MUST handle browsers with JavaScript disabled gracefully (progressive enhancement)
- **FR-021**: System MUST optimize animation performance to maintain acceptable frame rate (minimum 30fps on standard devices)
- **FR-022**: System MUST render animation smoothly using browser-optimized animation methods (requestAnimationFrame)
- **FR-023**: System MUST pause or reduce animation when browser tab is in background to conserve resources
- **FR-024**: System MUST ensure each canvas instance functions independently with its own animation state
- **FR-025**: System MUST ensure mouse interactions only affect the canvas directly under the cursor
- **FR-026**: System MUST render nodes as small filled circles (3.5px radius) in the specified color
- **FR-027**: System MUST render connection lines with opacity based on distance (fade from full opacity at 0px to transparent at 120px threshold)
- **FR-028**: System MUST ensure nodes bounce off canvas edges by reversing velocity when hitting boundaries

### Key Entities *(include if feature involves data)*

- **Service Card**: Container element that wraps a canvas, service title, and description. Provides visual structure and styling context for displaying service information with an interactive network graph. Each card represents one of three services: Governance Innovation, Open-Source Community Building, or AI & Blockchain Strategy.

- **Canvas Element**: HTML5 canvas element that renders the interactive network graph. Handles all visual rendering including nodes, connections, and background. Must be responsive and resize appropriately. Each service card contains one canvas instance.

- **Network Graph**: Visual representation consisting of configurable number of nodes (default 20) and connections (lines between nodes). Nodes connect based on distance threshold (120px). Connection lines have opacity that fades with distance. Nodes move continuously with velocity vectors, bouncing off canvas edges. Nodes respond to mouse proximity by repelling away from cursor.

- **Shared Network Function**: Reusable JavaScript function (createInteractiveNetwork) that accepts parameters for canvas ID, node count, and color. Handles all animation logic, mouse interaction, and rendering. Can be instantiated multiple times for different canvas elements.

- **Service Information**: Text content displayed on each card including service title and description. Governance Innovation describes decentralized decision-making, Open-Source Community Building describes community engagement, AI & Blockchain Strategy describes technological innovation.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All three service cards render correctly on page load (100% of page loads show all three network graphs within 1 second)
- **SC-002**: Network graph animations maintain smooth performance (minimum 30fps frame rate on standard devices during normal operation for all three canvases simultaneously)
- **SC-003**: Canvas elements resize correctly when browser window is resized (100% of resize events result in properly sized canvases)
- **SC-004**: Service cards integrate cleanly with Jekyll layouts (no layout breaking or visual conflicts when included on pages)
- **SC-005**: Mouse interactions work correctly (100% of mouse movements over canvas result in appropriate node repelling behavior)
- **SC-006**: Service cards function across screen sizes from 320px to 2560px width (animations remain functional and visually appropriate at all tested breakpoints)
- **SC-007**: Each service card displays with correct color scheme (governance: teal-green, community: blue, AI: purple - 100% accuracy)
- **SC-008**: Service cards handle edge cases gracefully (browsers without canvas support or JavaScript disabled show appropriate fallback, no errors thrown)
- **SC-009**: Page performance remains acceptable with three simultaneous animations (page load time increases by less than 500ms, no noticeable lag during interaction)

## Scope

### In Scope

- Three Jekyll include files for service cards (governance_graph.html, community_graph.html, ai_graph.html)
- Shared JavaScript include file (network_graph.js) with reusable network graph function
- Interactive network graph animation with nodes and connections
- Mouse interaction (repel effect) for network nodes
- Responsive canvas resizing
- Service card styling and layout
- Integration with Jekyll include syntax
- Progressive enhancement (graceful degradation for unsupported browsers)
- Performance optimization for multiple simultaneous animations

### Out of Scope

- Customizable animation parameters through Jekyll include parameters (node count, colors, speed)
- Multiple animation styles or presets beyond the three specified services
- Animation controls (play, pause, reset buttons)
- Node labeling or text on nodes
- Complex graph algorithms or data-driven network structures
- Animation synchronization across multiple card instances
- Analytics or tracking for animation interactions
- Export or screenshot functionality for the animations
- Touch gesture support for mobile devices (mouse interaction only)
- Keyboard navigation for network graphs
- Accessibility features beyond basic progressive enhancement

## Assumptions

- HTML5 Canvas API is supported in target browsers (modern browsers support canvas)
- JavaScript is enabled in user's browser (animation requires JavaScript)
- Jekyll include syntax {% include %} is available and functional
- Service cards will be included within existing page layouts (not standalone pages)
- Animation should be visually engaging but not distracting (suitable for professional sites)
- Standard device performance can handle three simultaneous canvas animations at 30fps minimum
- Mouse interaction is the primary input method (touch devices may have limited interaction)
- Service card colors (teal-green, blue, purple) complement the site's existing color scheme
- Multiple service card instances on the same page should function independently
- Animation should pause when browser tab is in background (standard requestAnimationFrame behavior)
- Canvas dimensions (100% width, 180px height) are appropriate for service card layout
- Node count of 20 per graph provides good visual balance without performance issues

## Dependencies

- Jekyll static site generator
- HTML5 Canvas API support in browsers
- JavaScript enabled in user's browser
- requestAnimationFrame API support (standard in modern browsers)
- Existing Jekyll site structure and layout system

## Constraints

- Must work on GitHub Pages hosting environment (no server-side processing, limited plugin support)
- Must use Jekyll include files for modularity and reusability
- Must maintain compatibility with existing Jekyll site structure
- Must not break existing page functionality or layouts
- Must work with Jekyll's static site generation process (no client-side data fetching)
- Must maintain professional, engaging aesthetic (suitable for QADAO service presentation)
- Must optimize for lightweight performance (suitable for GitHub Pages hosting)
- Must handle progressive enhancement (graceful degradation for unsupported browsers)
- Must ensure three simultaneous animations do not cause performance issues
- Must use inline JavaScript within includes or shared script partial (no external dependencies)
