# Implementation Plan: Partners Section

**Branch**: `008-partners-section` | **Date**: 2024-12-19 | **Spec**: `/specs/008-partners-section/spec.md`
**Input**: Feature specification from `/specs/008-partners-section/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create a "We work with" section on the main page that displays partner organizations in card format, matching the visual style of existing sections (Services, Projects). Partner data is managed through a `partners.yml` file following the standardized DataItem schema from spec 001. Partner cards display logos, names, descriptions, and optional website links. The entire card is clickable when a URL is provided, matching the project card pattern. The section is conditionally rendered - hidden entirely when partners.yml is empty or missing.

## Technical Context

**Language/Version**: Jekyll (Ruby-based static site generator), Liquid templating engine  
**Primary Dependencies**: Jekyll, GitHub Pages (hosting), CSS (existing styling system)  
**Storage**: YAML data files in `_data/` directory (partners.yml)  
**Testing**: Manual browser testing, Jekyll build validation, YAML schema validation  
**Target Platform**: GitHub Pages (web, static HTML/CSS/JS)  
**Project Type**: web (static site)  
**Performance Goals**: Page load < 2 seconds, responsive layout across mobile/tablet/desktop  
**Constraints**: Must work within Jekyll static site framework, maintain GitHub Pages compatibility, follow existing CSS styling patterns, maintain accessibility (WCAG AA), support dark/light theme system  
**Scale/Scope**: Single new section on main page, one new YAML data file, minimal template changes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASS (Pre-Phase 0) → ✅ PASS (Post-Phase 1)

**Pre-Phase 0 Review**: The constitution file (`.specify/memory/constitution.md`) appears to be a template and has not been customized for this project. However, based on standard development practices:

- **Simplicity**: This feature follows existing patterns (reuses data-card styling, follows established YAML schema)
- **Consistency**: Uses standardized DataItem schema from spec 001, matches existing section patterns
- **Maintainability**: Minimal code changes, data-driven approach via YAML file
- **Accessibility**: Maintains WCAG AA compliance with proper focus states and keyboard navigation
- **Security**: Includes security attributes (`rel="noopener noreferrer"`) on external links

**Post-Phase 1 Review**: After completing design and contracts:

- ✅ **No new dependencies introduced** - Uses existing Jekyll, Liquid, CSS
- ✅ **No architectural changes** - Follows established patterns
- ✅ **Reuses existing CSS** - No new CSS classes or styles needed
- ✅ **Data-driven approach** - All content managed via YAML file
- ✅ **Minimal code changes** - Single section addition to layout template
- ✅ **Accessibility maintained** - ARIA labels, keyboard navigation, focus states
- ✅ **Security best practices** - External links include security attributes

**No violations identified** - Feature is straightforward extension of existing functionality. Design phase confirms simplicity and consistency with existing codebase.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
_data/
└── partners.yml              # New: Partner data file (standardized DataItem schema)

_layouts/
└── default.html              # Modified: Add partners section

assets/
├── css/
│   └── main.css              # Existing: Uses data-card and data-grid classes (no changes needed)
└── images/
    └── partners/             # New: Directory for partner logo images
```

**Structure Decision**: This is a Jekyll static site. The feature adds:
1. A new YAML data file (`_data/partners.yml`) following the standardized schema
2. A new section in the main layout template (`_layouts/default.html`)
3. Partner logo images stored in `assets/images/partners/` directory
4. No new CSS classes needed - reuses existing `data-card` and `data-grid` styling

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
