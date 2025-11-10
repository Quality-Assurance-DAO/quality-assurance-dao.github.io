# Research: Standardize YAML Data Files and Dynamic Rendering

**Phase**: 0 - Outline & Research  
**Date**: 2024-12-19  
**Feature**: 001-standardize-yaml-data

## Research Tasks & Findings

### 1. YAML Schema Design for Jekyll Data Files

**Decision**: Use consistent schema with required fields (`id`, `name`, `description`) and optional metadata fields, with conditional `url` requirement based on dataset type.

**Rationale**: 
- Jekyll's `_data/` directory supports YAML files that are automatically loaded as `site.data.filename`
- Consistent schema enables reusable template logic across all four datasets
- Auto-generated `id` fields (URL-safe slugs) provide stable identifiers for future enhancements (filtering, linking)
- Conditional `url` requirement (required for projects/GitBooks/organizations, optional for services) reflects real-world data patterns

**Alternatives Considered**:
- **Separate schemas per dataset**: Rejected because it would require duplicate template logic and reduce maintainability
- **All fields required**: Rejected because existing data has varying levels of completeness, and optional metadata provides flexibility
- **No `id` field**: Rejected because unique identifiers enable future features (deduplication, linking, filtering)

**Best Practices Applied**:
- YAML arrays of objects for list-based data (`- name: ...`)
- Consistent field naming (snake_case)
- URL-safe slug generation from names (lowercase, hyphens for spaces, remove special chars)

### 2. Jekyll/Liquid Template Patterns for Dynamic Rendering

**Decision**: Use Liquid <code>{% raw %}{% for %}{% endraw %}</code> loops with conditional rendering for optional fields, maintaining compatibility with existing `site.data.*` access patterns.

**Rationale**:
- Jekyll's Liquid templating is the standard approach for GitHub Pages
- Existing templates already use <code>{% raw %}{% for service in site.data.services %}{% endraw %}</code> pattern
- Conditional rendering (<code>{% raw %}{% if item.url %}{% endraw %}</code>) handles optional fields gracefully
- No changes to `_config.yml` required - data access remains the same

**Alternatives Considered**:
- **Jekyll plugins for data processing**: Rejected because GitHub Pages has limited plugin support and adds complexity
- **JavaScript-based rendering**: Rejected because it would break SEO, accessibility, and require additional build steps
- **Separate includes for each dataset**: Rejected because card rendering logic is identical across datasets

**Best Practices Applied**:
- Semantic HTML structure (`<section>`, `<article>`, proper heading hierarchy)
- Liquid filters for data transformation (`| downcase`, `| slugify`)
- Graceful handling of missing optional fields

### 3. Responsive Card Grid Design

**Decision**: Use CSS Grid with `repeat(auto-fit, minmax(260px, 1fr))` pattern, matching existing `service-grid` styling.

**Rationale**:
- Existing `service-grid` class already implements responsive grid pattern
- CSS Grid provides native responsive behavior without media query complexity
- `minmax(260px, 1fr)` ensures cards don't get too narrow on small screens
- Consistent styling across all data sections maintains brand identity

**Alternatives Considered**:
- **Flexbox-based grid**: Rejected because CSS Grid is more appropriate for 2D layouts and provides better control
- **Fixed column counts with breakpoints**: Rejected because `auto-fit` provides smoother responsive behavior
- **Separate grid classes per dataset**: Rejected because styling should be consistent across all sections

**Best Practices Applied**:
- Mobile-first responsive design (works from 320px width)
- Consistent gap spacing (`1.5rem`)
- Card styling matches existing `service-card` pattern for brand consistency

### 4. Accessibility Implementation (WCAG AA)

**Decision**: Implement semantic HTML, ARIA labels where needed, keyboard navigation support, and proper color contrast.

**Rationale**:
- WCAG AA compliance is required by specification (FR-013)
- Semantic HTML (`<section>`, `<article>`, proper headings) improves screen reader experience
- Keyboard navigation is essential for users who cannot use pointing devices
- Color contrast ensures text is readable for users with visual impairments

**Alternatives Considered**:
- **Minimal accessibility**: Rejected because it violates requirements and excludes users
- **WCAG AAA compliance**: Rejected because AA is the specified minimum and AAA may require design compromises
- **Accessibility as optional enhancement**: Rejected because it's a core requirement, not optional

**Best Practices Applied**:
- Semantic HTML5 elements (`<section>`, `<article>`, `<nav>`)
- Proper heading hierarchy (h2 for sections, h3 for cards)
- Alt text for images/logos (or decorative marking)
- Focus states for interactive elements
- Color contrast ratios meet WCAG AA (4.5:1 for normal text, 3:1 for large text)

### 5. URL Validation Approach

**Decision**: Implement validation script (Ruby/Python) that runs pre-deployment to check URL format and required fields, blocking deployment on errors.

**Rationale**:
- Specification requires validation to fail with clear error messages (FR-005, FR-006)
- Pre-deployment validation prevents broken links from reaching production
- Clear error messages help content maintainers fix issues quickly
- Validation can be run as part of CI/CD or local development workflow

**Alternatives Considered**:
- **Runtime validation in templates**: Rejected because it would slow page rendering and errors should be caught earlier
- **Manual validation only**: Rejected because it's error-prone and doesn't scale
- **GitHub Actions validation**: Considered but not required - can be added as enhancement

**Best Practices Applied**:
- URL format validation using regex or URI parsing library
- Clear error messages identifying file, item, and specific field with issue
- Validation script can be run locally and in CI/CD
- Non-blocking for optional fields (warnings vs errors)

### 6. Data Migration Strategy

**Decision**: Generate `id` fields from existing `name` fields using URL-safe slug algorithm, preserve all existing data, add missing required fields with validation errors.

**Rationale**:
- Auto-generating IDs from names ensures consistency and avoids manual ID assignment
- Preserving existing data prevents information loss
- Missing required fields should trigger validation errors (not auto-filled) to ensure data quality
- Slug algorithm (lowercase, hyphens, remove special chars) creates stable, readable IDs

**Alternatives Considered**:
- **Manual ID assignment**: Rejected because it's time-consuming and error-prone
- **UUID-based IDs**: Rejected because they're not human-readable and don't match specification (URL-safe slugs)
- **Auto-fill missing required fields**: Rejected because it would create low-quality placeholder data

**Best Practices Applied**:
- Slug generation: lowercase, replace spaces with hyphens, remove special characters, handle duplicates with numeric suffix
- Preserve all existing optional metadata
- Validation identifies missing fields clearly for manual correction

## Technology Choices

### Jekyll Static Site Generator
- **Why**: Already in use, GitHub Pages native support, no additional infrastructure
- **Alternatives**: Next.js, Hugo, Eleventy - rejected because they would require complete migration

### Liquid Templating
- **Why**: Jekyll's native templating language, already in use
- **Alternatives**: Handlebars, Mustache - rejected because Jekyll doesn't support them natively

### CSS Grid
- **Why**: Native responsive layout, better than flexbox for 2D grids, modern browser support
- **Alternatives**: Flexbox, Bootstrap grid - rejected because CSS Grid is simpler and more appropriate

### YAML Data Format
- **Why**: Jekyll's native data format, human-readable, easy to edit
- **Alternatives**: JSON, CSV - rejected because YAML is more readable and Jekyll-optimized

## Integration Patterns

### Data Access Pattern
- Use `site.data.filename` to access YAML data in templates
- Loop through arrays: <code>{% raw %}{% for item in site.data.projects %}{% endraw %}</code>
- Access fields: <code>{% raw %}{{ item.name }}{% endraw %}</code>, <code>{% raw %}{{ item.description }}{% endraw %}</code>

### Conditional Rendering Pattern
- Check for optional fields: <code>{% raw %}{% if item.url %}...{% endif %}{% endraw %}</code>
- Check for arrays: <code>{% raw %}{% if item.tags.size > 0 %}...{% endif %}{% endraw %}</code>
- Check for booleans: <code>{% raw %}{% if item.featured %}...{% endif %}{% endraw %}</code>

### Card Rendering Pattern
- Wrap each item in `<article>` or `<div class="card">`
- Include semantic structure: heading, description, optional metadata
- Add link wrapper when URL present: <code>{% raw %}<a href="{{ item.url }}">...</a>{% endraw %}</code>

## Resolved Clarifications

All technical decisions have been made. No "NEEDS CLARIFICATION" items remain.

- ✅ YAML schema structure defined
- ✅ Template rendering approach determined
- ✅ Responsive design pattern selected
- ✅ Accessibility implementation approach defined
- ✅ Validation strategy established
- ✅ Data migration approach determined

