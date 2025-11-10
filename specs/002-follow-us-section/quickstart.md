# Quickstart: Follow Us Section with Social Link Cards

**Feature**: 002-follow-us-section  
**Date**: 2024-12-19

## Overview

This feature transforms the "Contact Us" section into a "Follow Us" section by removing email links and displaying social media links (X/Twitter, YouTube, GitHub) as cards consistent with the existing card grid design pattern.

## Quick Reference

### Section Location
- **File**: `_layouts/default.html`
- **Section ID**: `#contact` (to be updated to `#follow-us` or kept as `#contact`)
- **Position**: After GitHub Organizations section, before footer

### Social Media Platforms
- **X/Twitter**: Uses `site.x_handle` from `_config.yml`
- **YouTube**: Uses `site.youtube_handle` from `_config.yml`
- **GitHub**: Uses `site.github.repository_url` (automatic from GitHub Pages)

### CSS Classes
- `data-grid`: Container for card grid layout (reuse existing)
- `data-card`: Individual card styling (reuse existing)
- `data-card-link`: Clickable link wrapper for cards (reuse existing)

### Icons
- **Location**: `assets/images/social/`
- **Format**: SVG files
- **Existing**: `twitter-icon.svg`, `youtube-icon.svg`
- **May need**: `github-icon.svg` (if not already present)

## Implementation Steps

### 1. Update Section Heading

Change from:
```liquid
<h2>Contact Us</h2>
```

To:
```liquid
<h2>Follow Us</h2>
```

### 2. Remove Email Contact Text

Remove or comment out:
```liquid
<p>
  Interested in working with us? Get in touch via
  <a href="mailto:{{ site.email | default: 'info@qadao.io' }}">email</a>
  or follow us below.
</p>
```

### 3. Replace Social Links with Card Grid

Replace existing `<nav class="social-links">` structure with card grid:

```liquid
<div class="data-grid">
  {% if site.x_handle %}
    <article class="data-card">
      <a href="{{ site.x_handle }}" class="data-card-link" target="_blank" rel="noopener" aria-label="Follow us on X / Twitter">
        <img src="{{ '/assets/images/social/twitter-icon.svg' | relative_url }}" alt="X / Twitter icon" class="data-card-logo">
        <h3>X / Twitter</h3>
      </a>
    </article>
  {% endif %}
  
  {% if site.youtube_handle %}
    <article class="data-card">
      <a href="{{ site.youtube_handle }}" class="data-card-link" target="_blank" rel="noopener" aria-label="Follow us on YouTube">
        <img src="{{ '/assets/images/social/youtube-icon.svg' | relative_url }}" alt="YouTube icon" class="data-card-logo">
        <h3>YouTube</h3>
      </a>
    </article>
  {% endif %}
  
  {% if site.github.repository_url %}
    <article class="data-card">
      <a href="{{ site.github.repository_url }}" class="data-card-link" target="_blank" rel="noopener" aria-label="Follow us on GitHub">
        <img src="{{ '/assets/images/social/github-icon.svg' | relative_url }}" alt="GitHub icon" class="data-card-logo">
        <h3>GitHub</h3>
      </a>
    </article>
  {% endif %}
</div>
```

### 4. Add GitHub Icon (if missing)

If `github-icon.svg` doesn't exist in `assets/images/social/`, add it following the same pattern as existing icons.

### 5. Verify CSS Styling

Ensure existing `data-grid` and `data-card` CSS classes provide appropriate styling. No new CSS should be needed, but verify:
- Cards display in responsive grid
- Cards are clickable
- Icons display properly
- Focus states work for keyboard navigation

## Testing

### Manual Testing Checklist

- [ ] Section heading displays as "Follow Us"
- [ ] No email contact links visible
- [ ] Social media cards display in grid layout
- [ ] Cards match visual style of other sections
- [ ] Cards are clickable and open in new tab
- [ ] Icons display correctly for each platform
- [ ] Responsive design works (test 320px, 768px, 1920px widths)
- [ ] Keyboard navigation works (Tab through cards, Enter to activate)
- [ ] Screen reader announces cards correctly
- [ ] Cards only appear when URLs are configured

### Browser Testing

Test in:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

### Accessibility Testing

- [ ] Run automated accessibility checker (axe, WAVE, Lighthouse)
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Test keyboard-only navigation
- [ ] Verify color contrast ratios (WCAG AA)

## Configuration

### Required Configuration

No changes to `_config.yml` required. Feature uses existing variables:
- `x_handle`: X/Twitter URL
- `youtube_handle`: YouTube URL
- `github.repository_url`: Automatically provided by GitHub Pages

### Optional Configuration

If social media URLs are missing, corresponding cards will not display (graceful degradation).

## Troubleshooting

### Cards Not Displaying
- Check that social media URLs are configured in `_config.yml`
- Verify Liquid syntax is correct (check for unclosed tags)
- Check browser console for errors

### Icons Not Showing
- Verify icon files exist in `assets/images/social/`
- Check file paths in template (use `relative_url` filter)
- Verify SVG files are valid

### Styling Issues
- Ensure `data-grid` and `data-card` CSS classes are defined
- Check that existing card styles from other sections apply
- Verify responsive breakpoints work correctly

### Accessibility Issues
- Verify ARIA labels are present on links
- Check that focus states are visible
- Test with keyboard navigation
- Run automated accessibility checker

## Related Documentation

- [Feature Specification](./spec.md) - Complete requirements
- [Research](./research.md) - Technical decisions and rationale
- [Data Model](./data-model.md) - Entity definitions
- [Implementation Plan](./plan.md) - Overall implementation strategy

