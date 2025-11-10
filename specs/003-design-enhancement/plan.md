# Implementation Plan: Modern Design Enhancement

**Branch**: `003-design-enhancement` | **Date**: 2024-12-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-design-enhancement/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Enhance the Jekyll static website with modern design improvements including: (1) typography upgrade to Space Grotesk font, (2) enhanced spacing and container width (1000px → 1152px), (3) light/dark theme toggle with localStorage persistence, (4) sticky navigation bar, (5) hero section CTA button, and (6) optional Values section. All changes must preserve existing YAML data file functionality and original text content. Implementation uses custom CSS with CSS variables (no Tailwind dependency) and vanilla JavaScript for theme toggle, maintaining Jekyll/GitHub Pages compatibility.

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript (ES5+), Liquid (Jekyll templating), Ruby (Jekyll 3.x)  
**Primary Dependencies**: Jekyll static site generator, GitHub Pages build environment, CSS custom properties (variables), localStorage API  
**Storage**: N/A (static site, theme preference stored in browser localStorage)  
**Testing**: Manual browser testing (Chrome, Firefox, Safari, Edge), accessibility testing (WCAG AA compliance), responsive design testing (320px-2560px), Jekyll build verification  
**Target Platform**: Web browsers (modern browsers with CSS variables and localStorage support), GitHub Pages hosting  
**Project Type**: web (static site generator)  
**Performance Goals**: Theme toggle responds within 200ms, no layout shift on theme change, maintain current page load performance, smooth theme transitions without visual glitches  
**Constraints**: Must maintain 100% compatibility with existing Jekyll data structure (`_data/*.yml`), preserve all original text content, maintain WCAG AA accessibility standards in both themes, no breaking changes to existing functionality, GitHub Pages deployment compatibility, graceful degradation for browsers without JavaScript/localStorage  
**Scale/Scope**: Single-page website with 6 main sections (Hero, About, Services, Projects, GitBooks, Organizations, Follow Us), ~370 lines of CSS, ~240 lines of HTML template, theme toggle affects entire site, responsive design from 320px to 2560px viewport width

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design Assessment

**Status**: Constitution file (`.specify/memory/constitution.md`) contains template placeholders only. No specific constitution principles defined for this project.

**Assessment**: 
- No explicit constitution violations identified (no defined principles to violate)
- Project follows standard Jekyll static site patterns
- Changes are incremental enhancements to existing design system
- No architectural complexity introduced (CSS/JS enhancements only)

**Gate Result**: ✅ PASS (no violations, standard web enhancement pattern)

**Note**: Constitution template exists but is not customized for this project. Proceeding with standard web development best practices: accessibility (WCAG AA), responsive design, progressive enhancement, and maintainability.

### Post-Design Assessment

**Status**: After Phase 1 design completion, re-evaluation confirms no violations.

**Design Decisions Review**:
- **Theme System**: CSS variables approach is standard, maintainable, and performant. No complexity violations.
- **JavaScript**: Vanilla ES5+ with no dependencies. Minimal footprint (~2KB). No framework bloat.
- **File Structure**: All changes are incremental to existing files. No new architectural layers.
- **Data Model**: No changes to existing YAML structure. Optional Values section follows same pattern.
- **Accessibility**: WCAG AA compliance maintained in both themes. No accessibility regressions.

**Complexity Analysis**:
- **Files Modified**: 2 (main.css, default.html)
- **Files Created**: 1 (theme-toggle.js)
- **Dependencies Added**: 0 (Google Fonts is CDN, not a dependency)
- **Breaking Changes**: 0
- **Architectural Changes**: 0

**Gate Result**: ✅ PASS (design maintains simplicity, no unnecessary complexity introduced)

**Final Assessment**: Design phase completed successfully with no constitution violations. Implementation follows best practices for static site enhancement. All design decisions are justified and maintain project simplicity.

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
_layouts/
└── default.html              # Main layout template (modify: add theme toggle, sticky nav, hero CTA)

assets/
├── css/
│   └── main.css              # Main stylesheet (modify: add theme variables, typography, spacing)
└── js/
    ├── scale.fix.js          # Existing script (no changes)
    └── theme-toggle.js       # NEW: Theme toggle functionality

_data/
├── services.yml              # Existing data (no changes)
├── projects.yml              # Existing data (no changes)
├── gitbooks.yml              # Existing data (no changes)
└── github-organisations.yml  # Existing data (no changes)
└── values.yml                # NEW (optional): Values section data

_config.yml                   # Jekyll config (no changes required)
```

**Structure Decision**: Jekyll static site structure. All changes are incremental enhancements to existing files:
- CSS enhancements in `assets/css/main.css` (theme variables, typography, spacing)
- JavaScript addition: `assets/js/theme-toggle.js` (new file)
- HTML template updates in `_layouts/default.html` (theme toggle button, sticky nav, hero CTA)
- Optional data file: `_data/values.yml` (only if Values section content is available)

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
