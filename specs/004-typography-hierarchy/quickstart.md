# Quickstart: Typography Hierarchy and Services Card Refinement

**Date**: 2024-12-19  
**Feature**: 004-typography-hierarchy

## Overview

This quickstart guide provides step-by-step instructions for implementing typography hierarchy refinement and services card layout enhancements. The implementation is divided into logical phases that can be completed incrementally.

## Prerequisites

- Jekyll site running locally (or GitHub Pages)
- Access to `_layouts/default.html`
- Access to `assets/css/main.css`
- Access to `_data/services.yml` (optional, for adding icons)
- Modern browser for testing (Chrome, Firefox, Safari, or Edge)

## Implementation Phases

### Phase 1: Typography Hierarchy (30 minutes)

#### Step 1.1: Define Typography CSS Variables

**File**: `assets/css/main.css`

Add typography variables to `:root` section (after existing variables):

```css
:root {
  /* ... existing variables ... */
  
  /* Typography Hierarchy */
  --h1-size: clamp(2rem, 5vw, 3rem);
  --h2-size: clamp(1.75rem, 4vw, 2.5rem);
  --h3-size: clamp(1.25rem, 3vw, 1.75rem);
}
```

#### Step 1.2: Apply Typography Variables to Headings

**File**: `assets/css/main.css`

Update existing heading styles to use variables:

```css
/* Global Heading Styles */
h1 {
  font-size: var(--h1-size);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

h2 {
  font-size: var(--h2-size);
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 0.875rem;
}

h3 {
  font-size: var(--h3-size);
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0.75rem;
}
```

#### Step 1.3: Update Existing Heading Styles

**File**: `assets/css/main.css`

Update specific heading styles to use variables (replace hardcoded sizes):

```css
.hero h1 {
  font-size: var(--h1-size);
  margin: 0.5rem 0;
}

.section h2 {
  font-size: var(--h2-size);
  text-align: center;
  color: var(--primary);
  margin-bottom: 2rem;
}

.data-card h3 {
  font-size: var(--h3-size);
  color: var(--primary);
  margin-top: 0;
  margin-bottom: 0.75rem;
}
```

**Test**: View site, verify heading sizes create clear hierarchy (h1 > h2 > h3).

---

### Phase 2: Services Card Enhancement (45 minutes)

#### Step 2.1: Update Service Card HTML Structure

**File**: `_layouts/default.html`

Find the services section (around line 72-105) and update the service card structure:

```html
<section id="services" class="section services">
  <div class="container">
    <h2>Our Services</h2>
    <div class="data-grid">
      {% for service in site.data.services %}
        <article class="data-card"{% if service.id %} id="service-{{ service.id }}"{% endif %}>
          {% if service.logo or service.icon %}
            <div class="service-visual">
              {% if service.logo %}
                <img src="{{ service.logo | relative_url }}" alt="{% if service.name %}{{ service.name }} logo{% else %}Logo{% endif %}" class="data-card-logo">
              {% elsif service.icon %}
                <span class="service-icon">{{ service.icon }}</span>
              {% endif %}
            </div>
          {% endif %}
          
          <h3>{{ service.name }}</h3>
          <p>{{ service.description }}</p>
          
          {% if service.url %}
            <a href="{{ service.url }}" class="service-learn-more">Learn more</a>
          {% endif %}
          
          {% if service.tags.size > 0 %}
            <div class="data-card-tags">
              {% for tag in service.tags %}
                <span class="tag">{{ tag }}</span>
              {% endfor %}
            </div>
          {% endif %}
        </article>
      {% endfor %}
    </div>
  </div>
</section>
```

#### Step 2.2: Add Service Card CSS Styles

**File**: `assets/css/main.css`

Add styles for service visual elements and "Learn more" link:

```css
/* Service Card Visual Elements */
.service-visual {
  margin-bottom: 1rem;
  text-align: center;
}

.service-icon {
  font-size: 3rem;
  display: block;
  line-height: 1;
}

/* Service Learn More Link */
.service-learn-more {
  display: inline-block;
  margin-top: 1rem;
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9375rem;
  transition: color 0.2s ease;
}

.service-learn-more:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

.service-learn-more:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: 4px;
}
```

#### Step 2.3: Ensure Card Layout Consistency

**File**: `assets/css/main.css`

Verify existing `.data-card` styles support the new structure:

```css
.data-card {
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: var(--radius);
  text-align: left;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  border: 1px solid var(--card-border);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  position: relative;
  display: flex;
  flex-direction: column;
}

.data-card p {
  color: var(--text);
  margin-bottom: 1rem;
  flex: 1;
  /* Ensure descriptions don't break layout */
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

**Test**: 
1. View services section
2. Verify icons/images appear at top of cards
3. Verify "Learn more" links appear when URLs are available
4. Verify cards maintain consistent layout

---

### Phase 3: Optional - Add Icons to Services (15 minutes)

#### Step 3.1: Add Icon Field to Service Data

**File**: `_data/services.yml` (optional)

Add `icon` field to service items if desired:

```yaml
---
- name: Governance Innovation
  description: Innovative Governance solutions for transparency and risk management.
  id: governance-audits
  icon: "🏛️"
  url: https://example.com/governance

- name: Open Source Community Building
  description: Building and scaling open-source communities with best-practice frameworks.
  id: open-source-community-building
  icon: "🌱"
  url: https://example.com/community
```

**Note**: Icons are optional. Cards work with or without icons/images.

**Test**: Verify icons display in service cards when added to data file.

---

## Testing Checklist

### Typography Testing
- [ ] h1 headings are largest and most prominent
- [ ] h2 headings are smaller than h1 but larger than h3
- [ ] h3 headings are smaller than h2 but larger than body text
- [ ] Heading sizes scale responsively across screen sizes
- [ ] Hierarchy relationships maintained at all breakpoints (320px, 768px, 1024px, 1440px, 2560px)

### Services Card Testing
- [ ] Icons/images display at top of cards when available
- [ ] Descriptions display correctly in cards
- [ ] "Learn more" links appear when service URLs are available
- [ ] "Learn more" links navigate to correct URLs
- [ ] Cards maintain consistent layout when optional elements are missing
- [ ] Cards display correctly on mobile and desktop

### Accessibility Testing
- [ ] All headings use semantic HTML (h1, h2, h3)
- [ ] "Learn more" links are keyboard accessible
- [ ] Focus indicators are visible on links
- [ ] Screen readers can navigate cards correctly
- [ ] Color contrast meets WCAG AA standards

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

---

## Troubleshooting

### Headings Don't Scale Responsively
**Issue**: Heading sizes don't change with viewport width

**Solution**: 
- Verify `clamp()` function is supported in browser
- Check that CSS variables are defined correctly
- Ensure no hardcoded font sizes override variables

### Service Cards Layout Breaks
**Issue**: Cards have inconsistent heights or layout issues

**Solution**:
- Verify `.data-card` uses `display: flex` and `flex-direction: column`
- Check that descriptions have `flex: 1` to fill available space
- Ensure padding and margins are consistent

### "Learn More" Links Don't Appear
**Issue**: Links don't show even when URLs exist

**Solution**:
- Verify `service.url` field exists in YAML data
- Check Liquid template conditional: `{% if service.url %}`
- Verify CSS class `.service-learn-more` is not hidden

### Icons Don't Display
**Issue**: Icons don't appear in service cards

**Solution**:
- Verify `service.icon` or `service.logo` field exists in YAML
- Check that icon is emoji or valid identifier
- Verify `.service-icon` CSS class is applied correctly

---

## Next Steps

After completing implementation:

1. **Code Review**: Review all changes for consistency
2. **Visual Testing**: Compare before/after typography and card layouts
3. **Accessibility Audit**: Run automated accessibility tools
4. **Performance Check**: Verify no performance degradation
5. **User Testing**: Get feedback on typography readability and card usability

---

## Resources

- [Research Document](./research.md) - Detailed design decisions
- [Data Model](./data-model.md) - Data structure documentation
- [Contracts](./contracts/) - CSS and HTML structure contracts
- [Specification](./spec.md) - Feature specification

---

## Support

For questions or issues:
1. Check the [research.md](./research.md) for design rationale
2. Review [contracts](./contracts/) for structure requirements
3. Verify all files are in correct locations
4. Check browser console for errors

