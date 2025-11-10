# Implementation Plan: Typography Hierarchy and Services Card Refinement

**Branch**: `004-typography-hierarchy` | **Date**: 2024-12-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-typography-hierarchy/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Refine typography hierarchy with consistent h1/h2/h3 heading sizes and enhance services section with card-based layout featuring icons/images, descriptions, and "Learn more" links. Implementation uses CSS typography scale and enhances existing card components without modifying data structures.

## Technical Context

**Language/Version**: Jekyll (Ruby-based static site generator), Liquid templating language, HTML5, CSS3  
**Primary Dependencies**: Jekyll, GitHub Pages build environment, CSS custom properties (variables), existing design system from 003-design-enhancement  
**Storage**: YAML files in `_data/` directory (existing data files unchanged)  
**Testing**: Manual testing via GitHub Pages preview, Jekyll local server (`bundle exec jekyll serve`), browser-based visual testing, accessibility testing  
**Target Platform**: GitHub Pages (Jekyll static site hosting), modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)  
**Project Type**: Web (static site)  
**Performance Goals**: No performance degradation, typography renders instantly, card layout loads without layout shift  
**Constraints**: Must work within GitHub Pages limitations, maintain WCAG AA accessibility standards (4.5:1 contrast ratio minimum), preserve existing Liquid template compatibility, no changes to `_config.yml`, all existing YAML data files must continue to work, responsive design from 320px to 2560px width  
**Scale/Scope**: Single-page website with multiple sections, ~3-5 service items, typography hierarchy applied across all headings, card layout enhancement for services section only

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASS (Initial) | ✅ PASS (Post-Phase 1)

**Initial Notes**: 
- Constitution file (`.specify/memory/constitution.md`) appears to be a template and does not contain specific project principles
- No explicit constitution violations identified
- Implementation follows standard web development practices
- No external dependencies added beyond existing design system
- Maintains existing Jekyll structure and compatibility

**Post-Phase 1 Notes**:
- All design decisions documented in research.md
- Typography hierarchy preserves existing structure (no breaking changes)
- Card layout enhancements maintain backward compatibility
- Implementation approach maintains simplicity and accessibility
- No complexity violations identified

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
assets/
├── css/
│   └── main.css         # Main stylesheet (updated with typography hierarchy)

_data/
└── services.yml         # Existing (unchanged, but may add icon/image fields)

_layouts/
└── default.html         # Main layout template (updated services section)
```

**Structure Decision**: This is a Jekyll static site generator project. The structure follows standard Jekyll conventions:
- **Layouts**: `_layouts/default.html` contains the main page structure
- **Assets**: CSS files in `assets/` directory
- **Data**: YAML files in `_data/` directory for content
- **No build step required**: Jekyll processes files during GitHub Pages build
- **No separate frontend/backend**: Single static site with CSS enhancements

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**No violations identified.** The implementation follows standard web development practices:
- Uses CSS variables and standard typography patterns without external dependencies
- Maintains existing Jekyll structure without architectural changes
- Enhances existing components without breaking changes
- Simple, maintainable code structure
