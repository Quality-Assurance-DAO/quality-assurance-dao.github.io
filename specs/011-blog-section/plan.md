# Implementation Plan: Blog Section

**Branch**: `011-blog-section` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/011-blog-section/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a blog section for the QADAO Jekyll static site by creating a custom `/posts` directory structure for Markdown blog posts with YAML front matter, configuring Jekyll to process the custom directory, generating a blog index page with post listings sorted by date, creating individual blog post pages accessible via `/blog/post-slug` URLs, implementing pagination and tag-based filtering, and integrating the blog link into the main site navigation. The implementation will leverage Jekyll's built-in Markdown processing and Liquid templating while maintaining compatibility with GitHub Pages hosting.

## Technical Context

**Language/Version**: Jekyll (Ruby-based static site generator), Liquid templating, HTML5, CSS3, JavaScript (ES6+)  
**Primary Dependencies**: Jekyll static site generator, GitHub Pages hosting, Jekyll plugins (jekyll-feed, jekyll-seo-tag), Liquid template engine  
**Storage**: Markdown files with YAML front matter in `/posts` directory (custom structure, not Jekyll's default `_posts`), browser localStorage for tag filter state (optional)  
**Testing**: Manual testing, Jekyll build verification (`bundle exec jekyll build`), GitHub Pages build verification, browser compatibility testing  
**Target Platform**: Web browsers (modern browsers), GitHub Pages hosting, mobile/tablet/desktop responsive  
**Project Type**: Web (Jekyll static site)  
**Performance Goals**: Blog index page load time < 3 seconds on standard broadband, smooth pagination and filtering interactions  
**Constraints**: Must work within Jekyll static site generator framework, GitHub Pages hosting limitations (no server-side processing), must use custom `/posts` directory (not `_posts`), must generate `/blog/post-slug` URLs (not `/posts/post-slug`), static HTML generation only (no client-side Markdown rendering), must maintain existing site functionality  
**Scale/Scope**: Blog section with posts directory, blog index page, individual post pages, pagination (10 posts per page), tag filtering, navigation integration

**Technical Decisions** (resolved in research.md):
1. Use Jekyll Collections to process custom `/posts` directory (configured in `_config.yml`)
2. Generate post pages with `/blog/:slug/` permalink pattern using Collections
3. Implement client-side JavaScript pagination (10 posts per page) due to GitHub Pages limitations
4. Implement client-side JavaScript tag filtering with URL hash support
5. Use date-prefixed slugs in front matter for disambiguation (e.g., `slug: 2025-01-27-post-slug`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Note**: The constitution file (`.specify/memory/constitution.md`) appears to be a template with placeholders and has not been filled in with project-specific principles. As such, no specific constitution gates can be evaluated at this time.

**Constitution Status**: Template file detected - no specific gates to evaluate. Proceeding with standard implementation planning workflow.

**Post-Design Re-check**: 
- **Status**: No constitution violations detected
- **Rationale**: Design follows Jekyll best practices, uses standard static site patterns, maintains compatibility with existing site structure, and implements features using established web technologies (HTML, CSS, JavaScript)
- **Complexity**: Minimal - extends existing Jekyll site with standard collection configuration and client-side interactivity
- **Note**: Will re-evaluate once constitution is populated with project-specific principles

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
posts/                    # Custom directory for blog posts (NEW)
├── 2025-01-27-example-post.md
├── 2025-01-28-another-post.md
└── [other markdown posts]

_layouts/
├── default.html          # Main layout (to be updated - add blog nav link)
└── post.html             # Blog post layout (NEW)

_includes/
└── [existing includes - no changes needed]

assets/
├── css/
│   └── main.css          # Main stylesheet (to be updated - add blog styles)
└── js/
    └── blog.js           # Blog pagination and filtering logic (NEW)

blog.html                 # Blog index page (NEW)
_config.yml               # Jekyll configuration (to be updated - add collections/pagination config)
```

**Structure Decision**: This is a Jekyll static site with existing structure. The blog feature will add:
1. A custom `/posts` directory for storing Markdown blog posts (not Jekyll's default `_posts`)
2. A `blog.html` page for the blog index
3. A `_layouts/post.html` layout for individual blog post pages
4. Updates to `_layouts/default.html` to add blog navigation link
5. Updates to `_config.yml` to configure Jekyll collections or pagination
6. Blog-specific CSS and JavaScript for pagination and tag filtering

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
