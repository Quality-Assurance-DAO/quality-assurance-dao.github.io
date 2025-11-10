# Implementation Plan: Standardize YAML Data Files and Dynamic Rendering

**Branch**: `001-standardize-yaml-data` | **Date**: 2024-12-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-standardize-yaml-data/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Standardize all four YAML data files (`projects.yml`, `services.yml`, `gitbooks.yml`, `github-organisations.yml`) to use a consistent schema with required fields (`id`, `name`, `description`) and conditional/optional metadata fields. Implement validation to ensure data quality (no duplicates, required fields present, valid URLs). Update Jekyll Liquid templates to render data items in responsive card grid layouts with proper accessibility, maintaining compatibility with existing site structure and brand consistency.

## Technical Context

**Language/Version**: Jekyll (Ruby-based static site generator), Liquid templating language  
**Primary Dependencies**: Jekyll, GitHub Pages build environment, YAML parser  
**Storage**: YAML files in `_data/` directory (projects.yml, services.yml, gitbooks.yml, github-organisations.yml)  
**Testing**: Manual testing via GitHub Pages preview, Jekyll local server, browser-based accessibility testing  
**Target Platform**: GitHub Pages (Jekyll static site hosting)  
**Project Type**: Web (static site)  
**Performance Goals**: Page load < 2 seconds, responsive rendering from 320px to 2560px width  
**Constraints**: Must work within GitHub Pages limitations, maintain WCAG AA accessibility standards, preserve existing Liquid template compatibility, no changes to `_config.yml`  
**Scale/Scope**: 4 YAML data files, ~10-15 total data items, single-page website with multiple sections

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASS (Initial) | ✅ PASS (Post-Phase 1)

**Initial Notes**: 
- Constitution file (`.specify/memory/constitution.md`) appears to be a template and has not been customized for this project
- No specific constitution gates identified that would block this feature
- Feature aligns with standard web development practices (static site, accessibility, responsive design)
- No violations of common development principles (simplicity, maintainability, accessibility)

**Post-Phase 1 Re-evaluation**:
- ✅ Design artifacts (data-model.md, contracts/, quickstart.md) completed
- ✅ No complexity violations introduced
- ✅ Simple, maintainable data structure (YAML files with consistent schema)
- ✅ Standard Jekyll/Liquid patterns used (no custom plugins or complex infrastructure)
- ✅ Accessibility requirements addressed in design
- ✅ No breaking changes to existing structure
- ✅ Agent context updated successfully

**Final Status**: ✅ PASS - No constitution violations. Feature is ready for Phase 2 (task breakdown).

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
├── projects.yml          # Standardized project data
├── services.yml          # Standardized service data
├── gitbooks.yml          # Standardized GitBook data
└── github-organisations.yml  # Standardized GitHub organization data

_layouts/
└── default.html          # Updated template with card grid rendering

assets/
├── css/
│   └── main.css          # Updated styles for card grids, responsive design
└── images/               # Logo images for data items (optional)

_config.yml               # Site configuration (no changes required)
```

**Structure Decision**: Jekyll static site structure. Data files in `_data/`, templates in `_layouts/`, styles in `assets/css/`. No backend or complex application structure needed - this is a static site generator workflow.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
