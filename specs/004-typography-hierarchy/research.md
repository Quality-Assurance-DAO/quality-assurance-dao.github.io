# Research: Typography Hierarchy and Services Card Refinement

**Date**: 2024-12-19  
**Feature**: 004-typography-hierarchy  
**Status**: Complete

## Overview

This research document consolidates design decisions and technical choices for refining typography hierarchy and enhancing the services section card layout while maintaining full compatibility with existing functionality.

## Research Questions & Findings

### 1. Typography Hierarchy Scale

**Question**: What size ratios should be used for h1, h2, and h3 headings to establish clear visual hierarchy?

**Decision**: Use a modular scale with h1:h2:h3 ratio of approximately 2.5:2:1.5 (or 2.5rem:2rem:1.5rem base sizes)

**Rationale**:
- Modular typography scales (like 1.25, 1.5, 2.0, 2.5) create harmonious relationships
- Ratio of 2.5:2:1.5 provides clear distinction between levels while maintaining readability
- Standard web typography practices recommend h1 at 2-3x body text, h2 at 1.5-2x, h3 at 1.25-1.5x
- Responsive scaling using clamp() or rem units ensures hierarchy maintains across screen sizes
- Current implementation has h1 at clamp(1.8rem, 4vw, 3rem), h2 at 2rem, h3 inherits body size - needs refinement

**Alternatives Considered**:
- **1.618 (Golden Ratio) scale**: Rejected - too subtle for clear hierarchy distinction
- **1.5x scale (1.5rem, 1.25rem, 1rem)**: Rejected - too small for h1, insufficient distinction
- **3:2:1.5 scale**: Rejected - h1 too large relative to container width
- **Fixed pixel sizes**: Rejected - doesn't scale responsively

**Implementation**: 
- Define CSS variables for heading sizes: `--h1-size`, `--h2-size`, `--h3-size`
- Use rem units with clamp() for responsive scaling
- Apply to all h1, h2, h3 elements globally

---

### 2. Services Card "Learn More" Link Implementation

**Question**: How should "Learn more" links be implemented in service cards when URLs may or may not be available?

**Decision**: Add explicit "Learn more" link text within each service card, separate from the card wrapper link, that appears when service.url is available

**Rationale**:
- Provides clear call-to-action that users can easily identify
- Separates card navigation (if entire card is clickable) from explicit "Learn more" action
- Follows common UX patterns for service/product listings
- Handles missing URLs gracefully (link doesn't appear if service.url is not set)
- Maintains accessibility with proper link text and ARIA labels

**Alternatives Considered**:
- **Entire card as link only**: Rejected - doesn't provide explicit "Learn more" text as specified
- **Icon-only link**: Rejected - less accessible, unclear purpose
- **Button-style link**: Rejected - may conflict with existing card styling

**Implementation**: 
- Add `<a href="{{ service.url }}" class="service-learn-more">Learn more</a>` in service card template
- Style as text link with primary color, positioned at bottom of card
- Only render when `service.url` exists (conditional Liquid template)

---

### 3. Icon/Image Display in Service Cards

**Question**: How should icons/images be displayed in service cards, and what should happen when they're missing?

**Decision**: Display icon/image at top of card when available (service.logo or service.icon field), with graceful degradation when missing

**Rationale**:
- Visual elements improve card recognition and engagement
- Current implementation already supports service.logo (image)
- Can extend to support service.icon (emoji or icon identifier) for flexibility
- Missing visual elements should not break layout - card maintains consistent height and spacing
- Icons/images should be appropriately sized (not too large, not too small) relative to card

**Alternatives Considered**:
- **Required icon/image**: Rejected - breaks graceful degradation requirement
- **Placeholder icon when missing**: Rejected - adds unnecessary visual noise
- **Icon only (no images)**: Rejected - limits flexibility, images may be preferred for some services

**Implementation**: 
- Use existing `service.logo` field for images (already implemented)
- Optionally support `service.icon` field for emoji or icon identifiers
- Display at top of card with consistent sizing
- Card layout adapts when icon/image is missing (description starts at top)

---

### 4. Typography Responsive Scaling

**Question**: How should heading sizes scale across different screen sizes while maintaining hierarchy?

**Decision**: Use clamp() CSS function with rem units for fluid typography that scales between min and max values

**Rationale**:
- clamp() provides smooth scaling without media query breakpoints
- Rem units ensure consistent scaling relative to root font size
- Maintains hierarchy relationships at all screen sizes
- Better than fixed sizes (not responsive) or viewport units alone (can become too large/small)

**Alternatives Considered**:
- **Fixed rem sizes**: Rejected - doesn't adapt to very small or very large screens
- **Viewport units (vw) only**: Rejected - can become too large on wide screens, too small on narrow screens
- **Media query breakpoints**: Rejected - creates abrupt size changes, more maintenance

**Implementation**: 
- h1: `clamp(2rem, 5vw, 3rem)` or similar
- h2: `clamp(1.75rem, 4vw, 2.5rem)` or similar  
- h3: `clamp(1.25rem, 3vw, 1.75rem)` or similar
- Ensure ratios maintain hierarchy at all sizes

---

### 5. Card Layout Consistency

**Question**: How to ensure service cards maintain consistent layout regardless of content length variations?

**Decision**: Use flexbox with consistent card dimensions, text truncation/clamping for long descriptions, and fixed icon/image sizing

**Rationale**:
- Flexbox provides flexible layout that adapts to content while maintaining structure
- Text clamping (line-clamp) prevents cards from becoming too tall
- Fixed icon/image dimensions ensure visual consistency
- Consistent padding and spacing maintain uniform card appearance

**Alternatives Considered**:
- **Fixed card heights**: Rejected - can truncate important content, poor UX
- **No text limits**: Rejected - cards become inconsistent heights, breaks grid layout
- **Equal height cards with flexbox**: Accepted - provides consistency while allowing content flexibility

**Implementation**: 
- Use existing `.data-card` flexbox layout
- Apply `-webkit-line-clamp` or max-height to descriptions
- Set consistent icon/image dimensions (e.g., max-width: 120px, height: auto)
- Ensure "Learn more" link is positioned consistently (bottom of card)

---

### 6. Font Family Consistency

**Question**: Should a new font be selected, or use the existing modern sans-serif?

**Decision**: Use existing Space Grotesk font family already implemented from 003-design-enhancement feature

**Rationale**:
- Space Grotesk is a clean modern sans-serif that meets the requirement
- Already integrated and working in the design system
- No need to add additional font dependencies
- Maintains design consistency across features

**Alternatives Considered**:
- **Select new font**: Rejected - unnecessary, existing font meets requirements
- **System fonts only**: Rejected - doesn't provide the modern, distinctive character desired

**Implementation**: 
- Ensure all headings use `var(--font-base)` which includes Space Grotesk
- Verify font is applied consistently across h1, h2, h3, and body text

---

## Technology Choices Summary

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Typography Scale | Modular scale (2.5:2:1.5) | Clear hierarchy, standard web practices |
| Responsive Typography | clamp() with rem units | Smooth scaling, maintains hierarchy |
| Card Links | Explicit "Learn more" text link | Clear CTA, accessible, follows UX patterns |
| Icon/Image Display | Top of card, optional | Visual engagement, graceful degradation |
| Font Family | Space Grotesk (existing) | Already implemented, meets requirements |
| Card Layout | Flexbox with text clamping | Consistent heights, flexible content |

## Browser Compatibility

**Target Browsers**:
- Chrome 90+ (clamp(), line-clamp, flexbox)
- Firefox 88+ (clamp(), line-clamp, flexbox)
- Safari 14+ (clamp(), line-clamp, flexbox)
- Edge 90+ (clamp(), line-clamp, flexbox)

**Graceful Degradation**:
- Browsers without clamp(): Falls back to rem values (still responsive)
- Browsers without line-clamp: Text wraps normally (cards may vary in height)
- Browsers without flexbox: Cards stack vertically (still functional)

## Performance Considerations

**Optimizations**:
- CSS-only changes (no JavaScript required)
- No additional font loading (uses existing Space Grotesk)
- Minimal CSS additions (typography variables and card link styles)
- No layout shift (enhancements to existing structure)

**Performance Goals**:
- Typography renders instantly (CSS-only)
- No layout shift on page load
- Maintain current page load performance

## Risk Assessment

**Low Risk**:
- Typography hierarchy refinement (CSS-only, well-established patterns)
- Card layout enhancements (builds on existing structure)

**Medium Risk**:
- None identified

**High Risk**:
- None identified (all changes are incremental enhancements)

## Conclusion

All research questions have been resolved. The implementation approach uses standard web typography practices and enhances existing card components without breaking changes. Typography hierarchy uses a modular scale with responsive clamp() values, and service cards are enhanced with explicit "Learn more" links and improved icon/image display. All changes maintain compatibility with existing Jekyll structure and GitHub Pages deployment.

