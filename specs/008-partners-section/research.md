# Research: Partners Section

**Phase**: 0 - Outline & Research  
**Date**: 2024-12-19  
**Feature**: 008-partners-section

## Overview

This document consolidates research findings and decisions for implementing the Partners Section feature. All technical unknowns from the Technical Context have been resolved.

## Research Findings

### 1. Data Schema Standardization

**Decision**: Use standardized DataItem schema from spec 001 for partners.yml

**Rationale**: 
- Spec 001 established a consistent schema across projects.yml, services.yml, gitbooks.yml, and github-organisations.yml
- Partners are conceptually similar to projects/services - they represent entities with metadata
- Consistency enables reuse of validation scripts and reduces cognitive load
- The schema already supports all required fields: id, name, description (required), url, logo (optional)

**Alternatives Considered**:
- Custom schema for partners only → Rejected: Would create inconsistency and require separate validation logic
- Minimal schema (name, logo only) → Rejected: Doesn't support descriptions or optional metadata that may be needed

**Reference**: `/specs/001-standardize-yaml-data/contracts/data-item-schema.json`

### 2. Card Interaction Pattern

**Decision**: Use project card pattern (entire card clickable) rather than service card pattern (separate link)

**Rationale**:
- Spec clarification confirmed: "Entire card is clickable when URL exists (wrap card in <a> tag, like project cards)"
- Project cards provide better UX for external links - larger click target
- Matches user expectation for partner links (going to external websites)
- Service cards use "Learn more" links because services may have internal documentation vs external sites

**Implementation Pattern**:
```liquid
{% if partner.url %}
  <a href="{{ partner.url }}" class="data-card-link" target="_blank" rel="noopener noreferrer">
{% endif %}
  <!-- card content -->
{% if partner.url %}
  </a>
{% endif %}
```

**Reference**: `_layouts/default.html` lines 145-172 (project card pattern)

### 3. Conditional Section Rendering

**Decision**: Hide entire section when partners.yml is empty or missing (conditional rendering)

**Rationale**:
- Spec requirement: "Hide the section entirely (don't render the section at all)"
- Prevents empty/broken section from appearing on page
- Follows Jekyll best practice: `{% if site.data.partners %}` before section
- Matches pattern used for optional sections (e.g., Values section)

**Implementation Pattern**:
```liquid
{% if site.data.partners %}
  <section id="partners" class="section partners">
    <!-- section content -->
  </section>
{% endif %}
```

**Reference**: `_layouts/default.html` lines 120-137 (Values section conditional rendering)

### 4. Logo Image Path Format

**Decision**: Use relative paths from site root (e.g., "/assets/images/partners/logo.png")

**Rationale**:
- Matches existing pattern used by services and projects
- Works correctly with Jekyll's `relative_url` filter
- Consistent with site asset organization
- Spec clarification confirmed this approach

**Implementation Pattern**:
```liquid
{% if partner.logo %}
  <img src="{{ partner.logo | relative_url }}" alt="{{ partner.name }} logo" class="data-card-logo">
{% endif %}
```

**Reference**: `_layouts/default.html` lines 84-85, 150 (logo rendering pattern)

### 5. Security Attributes for External Links

**Decision**: Include `target="_blank" rel="noopener noreferrer"` on all partner links

**Rationale**:
- Security best practice: `rel="noopener noreferrer"` prevents new page from accessing `window.opener`
- `target="_blank"` opens in new tab (expected behavior for external partner links)
- Spec requirement explicitly calls for these attributes
- Matches pattern used in Follow Us section

**Reference**: `_layouts/default.html` lines 196, 205, 214 (Follow Us section security attributes)

### 6. CSS Styling Approach

**Decision**: Reuse existing `data-card` and `data-grid` CSS classes (no new CSS needed)

**Rationale**:
- Existing CSS already provides all needed styling:
  - `.data-grid` for responsive grid layout
  - `.data-card` for card styling with hover effects
  - `.data-card-link` for clickable card links
  - `.data-card-logo` for logo images
- Maintains visual consistency with other sections
- Reduces CSS bloat and maintenance burden
- Spec requirement: "MUST use the same `data-card` CSS class and styling"

**Reference**: `assets/css/main.css` lines 234-282 (data-grid and data-card styles)

### 7. Section Placement

**Decision**: Place Partners section after Projects section and before About section

**Rationale**:
- Logical flow: Services → Projects → Partners → About
- Partners are external relationships (similar to projects)
- About section provides context after showcasing work/relationships
- Spec assumption: "The section will be placed after the Projects section and before the About section"

**Reference**: `_layouts/default.html` section order (lines 70-187)

### 8. Responsive Design

**Decision**: Rely on existing `data-grid` responsive behavior (no custom breakpoints needed)

**Rationale**:
- `data-grid` uses `repeat(auto-fit, minmax(260px, 1fr))` which automatically adapts
- Existing breakpoints (768px, 1024px) are handled by CSS variables and grid
- No need for custom media queries - grid handles all screen sizes
- Spec requirements met: mobile (< 768px), tablet (768px-1024px), desktop (> 1024px)

**Reference**: `assets/css/main.css` line 237 (data-grid definition)

## Technical Decisions Summary

| Decision Area | Choice | Rationale |
|--------------|--------|-----------|
| Data Schema | Standardized DataItem schema | Consistency with existing data files |
| Card Pattern | Project card (entire card clickable) | Better UX for external links |
| Section Rendering | Conditional (hide if empty) | Prevents broken/empty sections |
| Logo Paths | Relative from site root | Matches existing pattern |
| Security | `rel="noopener noreferrer"` | Security best practice |
| CSS | Reuse existing classes | Maintains consistency, reduces bloat |
| Placement | After Projects, before About | Logical content flow |
| Responsive | Existing grid system | No custom breakpoints needed |

## Resolved Unknowns

All technical unknowns from Technical Context have been resolved:

- ✅ **Data Schema**: Use standardized DataItem schema from spec 001
- ✅ **Card Interaction**: Project card pattern (entire card clickable)
- ✅ **Empty Data Handling**: Conditional rendering (hide section)
- ✅ **Logo Format**: Relative paths from site root
- ✅ **Security**: Include security attributes on external links
- ✅ **Styling**: Reuse existing CSS classes
- ✅ **Section Placement**: After Projects, before About
- ✅ **Responsive Design**: Existing grid handles all breakpoints

## Next Steps

Proceed to Phase 1: Design & Contracts
- Generate data-model.md
- Generate API contracts (Liquid template contract)
- Generate quickstart.md
- Update agent context

