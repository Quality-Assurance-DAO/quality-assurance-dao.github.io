# Implementation Plan: Site Redesign with Modern UI

**Branch**: `010-site-redesign` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/010-site-redesign/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Redesign the QADAO website homepage with a modern UI matching a Tailwind CSS-based design guide, while maintaining Jekyll/GitHub Pages compatibility. The redesign will use vanilla CSS with CSS variables to recreate Tailwind design patterns, incorporate the QADAO logo, implement dark/light theme switching, and ensure all content is dynamically loaded from YAML data files. The site will feature a hero section with video carousel, services grid, partners section, projects section, about section, and contact/follow-us section, all styled with the exact color scheme from the design guide (primary purple #4A00E0, secondary teal #00F2A9).

## Technical Context

**Language/Version**: Jekyll (Ruby-based static site generator), Liquid templating, HTML5, CSS3, JavaScript (ES6+)  
**Primary Dependencies**: Jekyll static site generator, GitHub Pages hosting, Google Fonts (Inter font family), Material Symbols icons from Google Fonts CDN  
**Storage**: YAML data files in `_data/` directory (services.yml, partners.yml, projects.yml, slides.yml, tabs.yml), browser localStorage for theme preference  
**Testing**: Manual testing, browser compatibility testing, GitHub Pages build verification, accessibility testing (WCAG AA compliance)  
**Target Platform**: Web browsers (modern browsers with CSS variables and localStorage support), GitHub Pages hosting, mobile/tablet/desktop responsive  
**Project Type**: Web (Jekyll static site)  
**Performance Goals**: Page load time < 3 seconds on standard broadband, smooth theme transitions (< 500ms), responsive layout rendering  
**Constraints**: Must work within Jekyll static site generator framework, GitHub Pages hosting limitations (no server-side processing), vanilla CSS only (no Tailwind framework), all content from data files, WCAG AA accessibility compliance, responsive design (mobile < 768px, tablet 768px-1024px, desktop > 1024px)  
**Scale/Scope**: Single homepage redesign, ~6-8 content sections, multiple data files, theme switching functionality, responsive breakpoints

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Note**: The constitution file (`.specify/memory/constitution.md`) appears to be a template with placeholders and has not been filled in with project-specific principles. As such, no specific constitution gates can be evaluated at this time.

**Constitution Status**: Template file detected - no specific gates to evaluate. Proceeding with standard implementation planning workflow.

**Post-Design Re-check**: Will re-evaluate once constitution is populated with project-specific principles.

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
├── services.yml          # Service offerings data
├── partners.yml          # Partner organizations data
├── projects.yml          # Project portfolio data
├── slides.yml            # Video carousel slides data
└── tabs.yml              # Tab navigation data (if used)

_layouts/
└── default.html          # Main layout template (to be updated)

_includes/
├── animated-header.html   # Hero section header (to be updated)
├── video-carousel.html   # Video carousel component (to be updated)
├── tabs.html             # Tab navigation component (if used)
└── [other includes]      # Existing include files

assets/
├── css/
│   └── main.css          # Main stylesheet (to be redesigned)
├── js/
│   ├── theme-toggle.js   # Theme switching functionality (existing)
│   └── scale.fix.js      # Responsive scaling (existing)
├── images/
│   ├── qadao.jpg         # QADAO logo
│   ├── partners/         # Partner logos
│   └── social/           # Social media icons
└── videos/               # Video assets for carousel

_config.yml               # Jekyll configuration (existing)
```

**Structure Decision**: This is a Jekyll static site with existing structure. The redesign will update existing templates, CSS, and includes while maintaining the Jekyll conventions. No new directory structure needed - modifications to existing files only.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
