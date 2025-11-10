# Research: Follow Us Section with Social Link Cards

**Phase**: 0 - Outline & Research  
**Date**: 2024-12-19  
**Feature**: 002-follow-us-section

## Research Tasks & Findings

### 1. Card Grid Layout Pattern Reuse

**Decision**: Reuse existing `data-grid` and `data-card` CSS classes from other sections (services, projects, GitBooks, organizations) for social media cards.

**Rationale**: 
- Existing card grid pattern is already implemented and tested
- Maintains visual consistency across all content sections
- Reduces CSS code duplication
- Ensures responsive behavior matches other sections
- No need to create new layout patterns when existing ones work

**Alternatives Considered**:
- **New CSS classes for social cards**: Rejected because it would create inconsistency and duplicate responsive grid logic
- **Different layout (list or flexbox)**: Rejected because cards provide better visual hierarchy and match site design language
- **Inline social links**: Rejected because it doesn't match the card-based design pattern used throughout the site

**Best Practices Applied**:
- DRY (Don't Repeat Yourself) principle - reuse existing patterns
- Design system consistency - same visual language across sections
- Responsive grid pattern already proven to work (320px to 2560px)

### 2. Social Media Icon/Logo Implementation

**Decision**: Use SVG icons stored locally in `assets/images/social/` directory, matching existing pattern (twitter-icon.svg, youtube-icon.svg already exist).

**Rationale**:
- SVG format provides scalability and performance benefits
- Local storage avoids external dependencies and improves page load speed
- Existing icons (Twitter, YouTube) already follow this pattern
- GitHub icon can be added following the same pattern
- Consistent with site's asset management approach

**Alternatives Considered**:
- **External icon CDN (Font Awesome, etc.)**: Rejected because it adds external dependency and potential privacy concerns
- **PNG/JPG icons**: Rejected because SVG provides better scalability and smaller file sizes
- **Icon fonts**: Rejected because SVG is more flexible and maintainable
- **No icons, text only**: Rejected because icons improve visual recognition and user experience

**Best Practices Applied**:
- Local asset management for performance and privacy
- SVG format for scalability and crisp rendering at all sizes
- Consistent asset organization (social icons in dedicated directory)

### 3. Social Media URL Configuration

**Decision**: Use existing Jekyll site configuration variables (`site.x_handle`, `site.youtube_handle`, `site.github.repository_url`) without modifying `_config.yml` structure.

**Rationale**:
- Configuration already exists in `_config.yml`
- No need to add new configuration variables
- Maintains backward compatibility
- Follows existing pattern for social media links
- GitHub URL is automatically available via `site.github.repository_url`

**Alternatives Considered**:
- **YAML data file for social links**: Rejected because it's overkill for 3 static links and doesn't match site configuration pattern
- **Hardcoded URLs**: Rejected because it reduces maintainability and flexibility
- **New config variables**: Rejected because existing variables are sufficient

**Best Practices Applied**:
- Configuration management - centralized in `_config.yml`
- Maintainability - easy to update URLs without code changes
- Standard Jekyll patterns - using site configuration variables

### 4. Accessibility Implementation for Social Cards

**Decision**: Implement semantic HTML (`<article>` elements), ARIA labels, keyboard navigation support, and proper focus states matching existing card accessibility patterns.

**Rationale**:
- WCAG AA compliance is required by specification (FR-010, FR-011, FR-012)
- Existing cards already implement accessibility features - should match
- Semantic HTML improves screen reader experience
- Keyboard navigation is essential for users who cannot use pointing devices
- Consistent accessibility patterns across all interactive elements

**Alternatives Considered**:
- **Minimal accessibility**: Rejected because it violates requirements and excludes users
- **Accessibility as optional enhancement**: Rejected because it's a core requirement, not optional
- **Different accessibility pattern**: Rejected because consistency with existing cards is important

**Best Practices Applied**:
- Semantic HTML5 elements (`<article>`, proper heading hierarchy)
- ARIA labels for screen reader compatibility
- Keyboard navigation with visible focus states
- Color contrast ratios meet WCAG AA (4.5:1 for normal text, 3:1 for large text)

### 5. Handling Missing Social Media URLs

**Decision**: Conditionally render social media cards only when URLs are present, using Liquid `{% if %}` conditionals.

**Rationale**:
- Prevents broken links or empty cards
- Graceful degradation when configuration is incomplete
- Maintains clean UI without placeholder content
- Standard Jekyll/Liquid pattern for conditional rendering
- Specification requires graceful handling (FR-013)

**Alternatives Considered**:
- **Display placeholder cards**: Rejected because it creates confusion and poor UX
- **Show error message**: Rejected because missing config shouldn't be treated as an error
- **Always show all cards with default URLs**: Rejected because it may link to incorrect or non-existent profiles

**Best Practices Applied**:
- Conditional rendering based on data availability
- Graceful degradation - hide rather than show broken state
- Clean UI without unnecessary placeholders

### 6. Section Heading and Content Update

**Decision**: Change section heading from "Contact Us" to "Follow Us" and remove email contact text and links, keeping only social media cards.

**Rationale**:
- Direct requirement from specification (FR-001, FR-002)
- "Follow Us" better describes the section's purpose (social media links)
- Removing email links simplifies the section and focuses on social engagement
- Maintains section position and visual hierarchy as specified

**Alternatives Considered**:
- **Keep "Contact Us" heading**: Rejected because it doesn't accurately describe social media links
- **Keep email link with social cards**: Rejected because specification explicitly requires removal
- **Move section to different position**: Rejected because specification requires maintaining position

**Best Practices Applied**:
- Clear, descriptive section headings
- Focused content - one purpose per section
- Maintain visual hierarchy and page structure

## Technology Choices

### Jekyll Static Site Generator
- **Why**: Already in use, GitHub Pages native support, no additional infrastructure
- **Alternatives**: Next.js, Hugo, Eleventy - rejected because they would require complete migration

### Liquid Templating
- **Why**: Jekyll's native templating language, already in use
- **Alternatives**: Handlebars, Mustache - rejected because Jekyll doesn't support them natively

### CSS Grid (via existing data-grid class)
- **Why**: Already implemented and proven to work, maintains consistency
- **Alternatives**: Flexbox, custom layout - rejected because existing grid pattern is optimal

### SVG Icons
- **Why**: Scalable, performant, local asset management
- **Alternatives**: PNG, icon fonts, CDN - rejected because SVG provides best balance of quality and performance

## Integration Patterns

### Template Rendering Pattern
- Use existing `data-grid` class for container
- Use existing `data-card` class for individual social media cards
- Conditional rendering: `{% if site.x_handle %}` before rendering each card
- Semantic HTML: `<article>` elements for cards, proper heading hierarchy

### Link Pattern
- Wrap entire card content in `<a>` tag with `data-card-link` class
- Use `target="_blank"` and `rel="noopener"` for external links
- ARIA labels: `aria-label="Follow us on [Platform]"`

### Icon Display Pattern
- Include SVG icon at top of card using `<img>` tag
- Alt text: `alt="[Platform] icon"` or mark as decorative if appropriate
- Consistent sizing with other card logos

## Resolved Clarifications

All technical decisions have been made. No "NEEDS CLARIFICATION" items remain.

- ✅ Card grid layout pattern determined (reuse existing)
- ✅ Social media icon implementation approach defined
- ✅ URL configuration approach determined
- ✅ Accessibility implementation approach defined
- ✅ Missing URL handling strategy established
- ✅ Section content update approach determined

