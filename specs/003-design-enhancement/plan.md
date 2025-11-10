# Implementation Plan: Modern Design Enhancement

**Branch**: `003-design-enhancement` | **Date**: 2024-12-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-design-enhancement/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Enhance the Jekyll static website with modern design improvements including: (1) modern typography (Space Grotesk font), (2) enhanced spacing and container width (1152px), (3) light/dark theme toggle with localStorage persistence, (4) sticky navigation with smooth scrolling, (5) hero section call-to-action button, and (6) optional Values section. All enhancements maintain full compatibility with existing Jekyll data files, preserve all original content, and meet WCAG AA accessibility standards. Implementation uses CSS custom properties for theming, vanilla JavaScript for theme toggle functionality, and maintains the existing custom CSS approach without adding external dependencies.

## Technical Context

**Language/Version**: Jekyll (Ruby-based static site generator), Liquid templating language, HTML5, CSS3, JavaScript (ES5+)  
**Primary Dependencies**: Jekyll, GitHub Pages build environment, CSS custom properties (variables), localStorage API  
**Storage**: Browser localStorage (for theme preference), YAML files in `_data/` directory (existing data files unchanged)  
**Testing**: Manual testing via GitHub Pages preview, Jekyll local server (`bundle exec jekyll serve`), browser-based accessibility testing, color contrast validation tools  
**Target Platform**: GitHub Pages (Jekyll static site hosting), modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)  
**Project Type**: Web (static site)  
**Performance Goals**: Theme toggle response <200ms, page load <2 seconds, no layout shift on theme change, smooth theme transitions (200ms duration)  
**Constraints**: Must work within GitHub Pages limitations, maintain WCAG AA accessibility standards (4.5:1 contrast ratio minimum), preserve existing Liquid template compatibility, no changes to `_config.yml`, all existing YAML data files must continue to work, responsive design from 320px to 2560px width  
**Scale/Scope**: Single-page website with multiple sections, 4 existing YAML data files (~10-15 total data items), 1 new optional YAML data file (values.yml), ~3 CSS files, 1 JavaScript file (~2KB)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASS (Initial) | ✅ PASS (Post-Phase 1)

**Initial Notes**: 
- Constitution file (`.specify/memory/constitution.md`) appears to be a template and does not contain specific project principles
- No explicit constitution violations identified
- Implementation follows standard web development practices
- No external dependencies added beyond Google Fonts (typography)
- Maintains existing Jekyll structure and compatibility

**Post-Phase 1 Notes**:
- All design decisions documented in research.md
- Data model preserves existing YAML structure (no breaking changes)
- Contracts defined for CSS variables, theme toggle API, and data schemas
- Implementation approach maintains simplicity and accessibility
- No complexity violations identified

## Project Structure

### Documentation (this feature)

```text
specs/003-design-enhancement/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   ├── README.md
│   ├── css-variables-contract.md
│   ├── data-item-schema.json
│   └── theme-toggle-api.md
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
assets/
├── css/
│   └── main.css         # Main stylesheet (updated with theme variables)
└── js/
    ├── scale.fix.js     # Existing script
    └── theme-toggle.js  # New theme toggle script

_data/
├── services.yml         # Existing (unchanged)
├── projects.yml         # Existing (unchanged)
├── gitbooks.yml        # Existing (unchanged)
├── github-organisations.yml  # Existing (unchanged)
└── values.yml          # New (optional)

_layouts/
└── default.html         # Main layout template (updated with navigation, theme toggle, CTA)

_config.yml              # Jekyll config (unchanged)
```

**Structure Decision**: This is a Jekyll static site generator project. The structure follows standard Jekyll conventions:
- **Layouts**: `_layouts/default.html` contains the main page structure
- **Assets**: CSS and JavaScript files in `assets/` directory
- **Data**: YAML files in `_data/` directory for content
- **Configuration**: `_config.yml` for Jekyll settings
- **No build step required**: Jekyll processes files during GitHub Pages build
- **No separate frontend/backend**: Single static site with client-side JavaScript for theme toggle

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**No violations identified.** The implementation follows standard web development practices:
- Uses native browser APIs (localStorage, CSS variables) without external dependencies
- Maintains existing Jekyll structure without architectural changes
- Implements theme system using well-established patterns (CSS custom properties)
- No additional build tools or frameworks required
- Simple, maintainable code structure
