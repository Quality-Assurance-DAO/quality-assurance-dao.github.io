# Implementation Plan: Typography Hierarchy and Services Card Refinement

**Branch**: `004-typography-hierarchy` | **Date**: 2024-12-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-typography-hierarchy/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Refine typography hierarchy with consistent h1/h2/h3 heading sizes using a modular scale (2.5:2:1.5 ratio) with responsive clamp() values, and enhance services section with card-based layout featuring icons/images, descriptions, and explicit "Learn more" links. Implementation uses CSS-only enhancements (typography variables, card link styles) that build on existing design system from 003-design-enhancement feature. All changes maintain backward compatibility with existing Jekyll structure and YAML data files.

## Technical Context

**Language/Version**: CSS3, HTML5, Liquid (Jekyll templating), YAML  
**Primary Dependencies**: Jekyll (static site generator), Google Fonts (Space Grotesk - already integrated), CSS custom properties (variables), clamp() function  
**Storage**: N/A (static site, YAML data files in `_data/` directory)  
**Testing**: Manual visual testing, browser developer tools, responsive design testing (320px to 2560px), accessibility testing (WCAG AA compliance)  
**Target Platform**: Web browsers (Chrome 79+, Firefox 75+, Safari 13.1+, Edge 79+), GitHub Pages hosting  
**Project Type**: Web (static site)  
**Performance Goals**: Typography renders instantly (CSS-only), no layout shift on page load, maintain current page load performance (<2 seconds), smooth responsive scaling without jank  
**Constraints**: Must work within GitHub Pages limitations, maintain WCAG AA accessibility standards (4.5:1 contrast ratio minimum), preserve existing Liquid template compatibility, no changes to `_config.yml`, all existing YAML data files must continue to work, responsive design from 320px to 2560px width, must maintain hierarchy relationships at all screen sizes, must handle missing optional fields gracefully  
**Scale/Scope**: Single-page website with multiple sections, ~3-5 service items in `_data/services.yml`, typography applies to all headings site-wide, CSS-only changes (~50-100 lines of CSS additions), no JavaScript required

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASS (Initial) | ✅ PASS (Post-Phase 1)

**Initial Notes**: 
- Constitution file (`.specify/memory/constitution.md`) appears to be a template and does not contain specific project principles
- No explicit constitution violations identified
- Implementation follows standard web development practices
- No external dependencies added (uses existing Space Grotesk font from 003-design-enhancement)
- Maintains existing Jekyll structure and compatibility
- CSS-only enhancements (no JavaScript, no new dependencies)
- Backward compatible with all existing data files

**Post-Phase 1 Notes**:
- All design decisions documented in research.md
- Data model preserves existing YAML structure (no breaking changes)
- Contracts defined for CSS typography variables and service card HTML structure
- Implementation approach maintains simplicity and accessibility
- No complexity violations identified
- Typography hierarchy uses standard web practices (modular scale, clamp() for responsive scaling)
- Service card enhancements build on existing `.data-card` infrastructure

## Project Structure

### Documentation (this feature)

```text
specs/004-typography-hierarchy/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   ├── README.md
│   ├── css-typography-contract.md
│   ├── service-card-structure.md
│   └── service-data-schema.json
├── checklists/
│   └── requirements.md
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
assets/
└── css/
    └── main.css         # Typography variables and service card styles

_layouts/
└── default.html         # Service card HTML structure updates

_data/
└── services.yml         # Service data (optional icon field addition)
```

**Structure Decision**: This is a static Jekyll site with CSS-only enhancements. Changes are made to:
- `assets/css/main.css`: Add typography CSS variables (`--h1-size`, `--h2-size`, `--h3-size`) and service card link styles
- `_layouts/default.html`: Update services section HTML structure to include icon/image display and "Learn more" links
- `_data/services.yml`: Optional enhancement to add `icon` field to service items (backward compatible)

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**No violations identified** - All implementation follows standard web development practices with CSS-only enhancements. No additional complexity required.
