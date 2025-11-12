# Implementation Plan: Interactive Network Graph Includes

**Branch**: `007-network-graph-includes` | **Date**: 2024-12-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-network-graph-includes/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create three interactive service card Jekyll includes, each displaying a dynamic network graph on HTML5 Canvas representing QADAO services (Governance Innovation, Open-Source Community Building, AI & Blockchain Strategy). Each card uses a shared JavaScript function for the network graph animation with configurable parameters (canvas ID, node count, color). The network graphs feature animated nodes that move continuously, connect based on distance thresholds, respond to mouse interactions with proportional repulsion, and resize responsively. Implementation uses vanilla JavaScript with requestAnimationFrame, inline CSS/JavaScript for self-containment, and progressive enhancement for graceful degradation. The component must be lightweight, performant (minimum 30fps for three simultaneous animations), and maintain a professional aesthetic suitable for service presentation.

## Technical Context

**Language/Version**: Jekyll (static site generator), Liquid templating engine, vanilla JavaScript (ES5+), HTML5 Canvas API, CSS3  
**Primary Dependencies**: Jekyll static site generator, HTML5 Canvas API, requestAnimationFrame API (browser-native)  
**Storage**: N/A (no data persistence required, animation is procedural)  
**Testing**: Manual browser testing, performance testing (frame rate monitoring for three simultaneous animations), responsive design testing across breakpoints (320px-2560px), accessibility testing (progressive enhancement verification), cross-browser testing  
**Target Platform**: GitHub Pages (static hosting, no server-side processing), modern browsers with Canvas and JavaScript support  
**Project Type**: web (Jekyll static site component)  
**Performance Goals**: Three simultaneous network graph animations maintain minimum 30fps frame rate on standard devices, all animations start within 1 second of page load, no external resource dependencies, animations pause when browser tab is in background, page load time increases by less than 500ms  
**Constraints**: Must work on GitHub Pages (no server-side processing, limited plugin support), must use only inline CSS and JavaScript or shared script partial (no external files or dependencies), must be self-contained within Jekyll include files, must maintain compatibility with existing Jekyll site structure, must handle progressive enhancement (graceful degradation for unsupported browsers), must optimize for lightweight performance (suitable for GitHub Pages hosting), must ensure three simultaneous animations do not cause performance issues, must use inline JavaScript within includes or shared script partial (no external dependencies)  
**Scale/Scope**: Three Jekyll include files (governance_graph.html, community_graph.html, ai_graph.html) plus one shared JavaScript include file (network_graph.js) with reusable function. Each card displays animated network graph with 20 nodes (default, configurable), distinct color scheme per service (governance: teal-green, community: blue, AI: purple), and can be included multiple times on same page with independent instances

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design Evaluation

**Status**: ✅ PASS

**Evaluation**:
- **Progressive Enhancement**: Feature specification explicitly requires graceful degradation for browsers without canvas support or JavaScript disabled (FR-019, FR-020). This aligns with modern web development best practices.
- **No External Dependencies**: Feature explicitly requires self-contained implementation with inline CSS and JavaScript or shared script partial only (FR-017, constraints), avoiding dependency bloat and maintaining GitHub Pages compatibility.
- **Reusability**: Feature designed as reusable Jekyll include snippets (FR-001, FR-002, FR-018) with shared JavaScript function, promoting code reuse and maintainability.
- **Performance Optimization**: Feature includes explicit performance requirements (minimum 30fps for three simultaneous animations, FR-021, SC-002) and optimization for lightweight performance, ensuring good user experience even with multiple animations.
- **Security**: Feature includes requirement for safe implementation practices (progressive enhancement prevents XSS vulnerabilities), maintaining security best practices.
- **Accessibility**: Feature includes progressive enhancement approach ensuring content remains accessible even when JavaScript or Canvas is unavailable (FR-019, FR-020).
- **Code Organization**: Shared JavaScript function (FR-002, FR-017) promotes DRY principles and maintainability.

**No violations detected**. All requirements align with best practices for static site development, performance, security, and maintainability. The shared JavaScript function approach is appropriate for multiple similar components.

### Post-Design Evaluation

**Status**: ✅ PASS

**Re-evaluation after Phase 1 design completion**:

**Design Artifacts Review**:
- ✅ **Research (research.md)**: All technical clarifications resolved. Decisions documented with rationale and alternatives considered. Best practices for Canvas animation, proportional mouse repulsion, variable speed configuration, proportional position scaling, distance-based opacity fading, shared function architecture, and performance optimization confirmed.
- ✅ **Data Model (data-model.md)**: Entity relationships clearly defined (Service Card, Node, Connection, Canvas State, Shared Network Function, Service Information). Validation rules established. State transitions documented. Procedural animation model (no persistent data) clearly explained. Multiple instance independence documented.
- ✅ **Contracts (contracts/)**: Complete API contracts defined:
  - Service card include contract (usage, HTML structure, progressive enhancement)
  - Network graph function API contract (function signature, parameters, behavior, event handlers, performance)
  - CSS styling contract (classes, responsive design, accessibility, progressive enhancement)
- ✅ **Quickstart (quickstart.md)**: Implementation guide provides step-by-step instructions, complete code examples for all three cards and shared function, customization options, testing checklist, and troubleshooting.

**Constitution Compliance Verification**:
- ✅ **Progressive Enhancement**: Full implementation documented with Canvas/JS fallback to static service cards. Graceful degradation for unsupported browsers and disabled JavaScript. Feature detection implemented.
- ✅ **No External Dependencies**: All CSS and JavaScript inline within include files or shared script partial. No external libraries or frameworks. GitHub Pages compatible. Self-contained implementation.
- ✅ **Reusability**: Components designed as reusable Jekyll includes (`_includes/governance_graph.html`, `_includes/community_graph.html`, `_includes/ai_graph.html`). Shared JavaScript function (`_includes/network_graph.js`) promotes code reuse. Can be included on any page. Supports multiple instances with unique IDs. Follows Jekyll best practices.
- ✅ **Performance Optimization**: requestAnimationFrame for browser-optimized animation. Performance targets defined (minimum 30fps for three simultaneous animations). Automatic pause when tab inactive. Efficient rendering algorithms documented. Independent animation loops prevent blocking.
- ✅ **Security**: Progressive enhancement prevents XSS vulnerabilities. Safe implementation practices specified. Security best practices followed.
- ✅ **Accessibility**: Progressive enhancement ensures content accessible without JavaScript/Canvas. Service information (title and description) always visible. Canvas marked as decorative (no semantic meaning).

**Design Quality Assessment**:
- ✅ **Completeness**: All design artifacts complete. No missing specifications. All requirements addressed. Three service cards fully specified.
- ✅ **Clarity**: Contracts and documentation are clear and actionable. Code examples provided. Implementation steps detailed. Shared function architecture clearly explained.
- ✅ **Consistency**: Design aligns with existing site architecture and patterns. Follows Jekyll include pattern used in other components. Consistent styling across all three cards.
- ✅ **Testability**: Contracts define testable interfaces. Testing strategy documented. Performance targets specified. Multiple instance independence testable.

**Final Status**: ✅ **PASS** - All gates passed. Design is complete, compliant, and ready for implementation.

## Project Structure

### Documentation (this feature)

```text
specs/007-network-graph-includes/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
_includes/
├── governance_graph.html  # Service card include for Governance Innovation
├── community_graph.html   # Service card include for Open-Source Community Building
├── ai_graph.html          # Service card include for AI & Blockchain Strategy
└── network_graph.js       # Shared JavaScript function for network graph animation
```

**Structure Decision**: This is a Jekyll static site component. The three service cards will be implemented as reusable Jekyll include snippets (`_includes/governance_graph.html`, `_includes/community_graph.html`, `_includes/ai_graph.html`) that can be included on any page. The shared network graph function will be in a separate JavaScript include file (`_includes/network_graph.js`) that is included once and reused by all three cards. Each card include will contain inline CSS for styling and will call the shared JavaScript function with appropriate parameters (canvas ID, node count, color). The component accepts no parameters through Jekyll include syntax (colors and content are hardcoded per service).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
