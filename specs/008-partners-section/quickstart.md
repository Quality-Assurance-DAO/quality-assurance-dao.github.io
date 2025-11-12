# Quickstart: Partners Section

**Feature**: 008-partners-section  
**Date**: 2024-12-19

## Overview

This quickstart guide provides step-by-step instructions for implementing the Partners Section feature. The feature adds a "We work with" section to the main page displaying partner organizations in card format.

## Prerequisites

- Jekyll site running locally or on GitHub Pages
- Access to `_data/` directory for YAML files
- Access to `_layouts/default.html` for template modifications
- Partner logo images (PNG, SVG, or JPG format)

## Implementation Steps

### Step 1: Create Partners Data File

Create `_data/partners.yml` with partner entries following the standardized DataItem schema:

```yaml
---
- id: cardano-foundation
  name: Cardano Foundation
  description: A non-profit organization dedicated to advancing Cardano blockchain technology.
  url: https://cardanofoundation.org
  logo: /assets/images/partners/cardano-foundation.png
  tags:
    - blockchain
    - governance
    - non-profit
  status: active
  featured: true

- id: singularitynet
  name: SingularityNET
  description: Decentralized AI network and marketplace.
  url: https://singularitynet.io
  logo: /assets/images/partners/singularitynet.png
  tags:
    - ai
    - blockchain
  status: active
```

**Required Fields**:
- `id`: URL-safe slug (auto-generated from name)
- `name`: Display name
- `description`: Text description

**Optional Fields**:
- `url`: Website URL (makes card clickable)
- `logo`: Logo image path (relative to site root)
- `tags`: Array of tag strings
- `status`: Status indicator (`active`, `archived`, `in-progress`, `completed`, `deprecated`)
- `featured`: Boolean flag
- `year`: Numeric year

### Step 2: Add Partner Logo Images

1. Create directory: `assets/images/partners/`
2. Add partner logo images (PNG, SVG, or JPG)
3. Use descriptive filenames matching partner IDs (e.g., `cardano-foundation.png`)
4. Ensure images are optimized for web (reasonable file sizes)

**Example**:
```
assets/images/partners/
├── cardano-foundation.png
├── singularitynet.png
└── ...
```

### Step 3: Add Partners Section to Layout

Open `_layouts/default.html` and add the Partners section after the Projects section and before the About section:

```liquid
<!-- PORTFOLIO / PROJECTS -->
<section id="portfolio" class="section portfolio">
  <!-- existing projects content -->
</section>

<!-- PARTNERS SECTION -->
{% if site.data.partners %}
  <section id="partners" class="section partners">
    <div class="container">
      <h2>We work with</h2>
      <div class="data-grid">
        {% for partner in site.data.partners %}
          <article class="data-card"{% if partner.id %} id="partner-{{ partner.id }}"{% endif %}>
            {% if partner.url %}
              <a href="{{ partner.url }}" class="data-card-link" target="_blank" rel="noopener noreferrer" aria-label="{{ partner.name }} - {{ partner.description }}">
            {% endif %}
            
            {% if partner.logo %}
              <img src="{{ partner.logo | relative_url }}" alt="{% if partner.name %}{{ partner.name }} logo{% else %}Logo{% endif %}" class="data-card-logo">
            {% endif %}
            
            <h3>{{ partner.name }}</h3>
            <p>{{ partner.description }}</p>
            
            {% if partner.tags.size > 0 %}
              <div class="data-card-tags">
                {% for tag in partner.tags %}
                  <span class="tag">{{ tag }}</span>
                {% endfor %}
              </div>
            {% endif %}
            
            {% if partner.featured %}
              <span class="featured-badge" aria-label="Featured">Featured</span>
            {% endif %}
            
            {% if partner.status %}
              <span class="status-indicator status-{{ partner.status | downcase }}">{{ partner.status }}</span>
            {% endif %}
            
            {% if partner.year %}
              <span class="data-card-meta">Year: {{ partner.year }}</span>
            {% endif %}
            
            {% if partner.url %}
              </a>
            {% endif %}
          </article>
        {% endfor %}
      </div>
    </div>
  </section>
{% endif %}

<!-- ABOUT SECTION -->
<section id="about" class="section about">
  <!-- existing about content -->
</section>
```

### Step 4: Update Navigation (Optional)

If you want to add a navigation link to the Partners section, update the navigation in `_layouts/default.html`:

```liquid
<div class="nav-links" id="nav-links">
  <a href="#about">About</a>
  <a href="#services">Services</a>
  <a href="#portfolio">Projects</a>
  <a href="#partners">Partners</a>  <!-- Add this line -->
  <a href="#contact">Follow Us</a>
  <!-- theme toggle button -->
</div>
```

### Step 5: Validate Data

Validate `_data/partners.yml` against the schema:

```bash
# Using a JSON schema validator (example)
validate-json specs/008-partners-section/contracts/partners-data-schema.json _data/partners.yml
```

Or use the existing validation script:

```bash
ruby scripts/validate-data.rb
```

### Step 6: Test Locally

1. Start Jekyll server: `bundle exec jekyll serve`
2. Navigate to main page
3. Verify Partners section appears (if data exists)
4. Verify section is hidden (if data is empty)
5. Test partner card interactions:
   - Hover effects
   - Click-through to partner websites
   - Keyboard navigation
   - Responsive layout (resize browser)

### Step 7: Test Edge Cases

- [ ] Empty `partners.yml` file → Section should be hidden
- [ ] Missing `partners.yml` file → Section should be hidden
- [ ] Partner with missing logo → Card should display without breaking
- [ ] Partner with missing URL → Card should not be clickable
- [ ] Partner with missing optional fields → Card should display available fields
- [ ] Very long partner names/descriptions → Should wrap appropriately
- [ ] Many partners (20+) → Grid should handle gracefully

## File Structure

After implementation:

```
_data/
└── partners.yml                    # Partner data file

_layouts/
└── default.html                    # Modified: Added Partners section

assets/
└── images/
    └── partners/                   # Partner logo images
        ├── cardano-foundation.png
        ├── singularitynet.png
        └── ...
```

## CSS Styling

**No new CSS needed!** The feature reuses existing CSS classes:

- `.data-grid` - Responsive grid layout
- `.data-card` - Card styling with hover effects
- `.data-card-link` - Clickable card link wrapper
- `.data-card-logo` - Logo image styling
- `.data-card-tags` - Tags container
- `.tag` - Individual tag badge
- `.featured-badge` - Featured indicator
- `.status-indicator` - Status badge

All styling is already defined in `assets/css/main.css`.

## Common Issues

### Section Not Appearing

**Problem**: Partners section doesn't appear on page.

**Solutions**:
1. Check if `partners.yml` exists and has data
2. Verify YAML syntax is correct (proper indentation, no syntax errors)
3. Check Jekyll build output for errors
4. Verify conditional rendering: `{% if site.data.partners %}`

### Partner Cards Not Clickable

**Problem**: Cards with URLs are not clickable.

**Solutions**:
1. Verify `partner.url` field exists and is valid
2. Check that `<a>` tag wraps entire card content
3. Verify `data-card-link` class is applied
4. Check browser console for JavaScript errors

### Logos Not Displaying

**Problem**: Partner logos don't appear.

**Solutions**:
1. Verify logo path is correct (relative to site root, starts with "/")
2. Check that image file exists in `assets/images/partners/`
3. Verify file permissions
4. Check Jekyll build output for missing asset warnings
5. Verify `relative_url` filter is applied: `{{ partner.logo | relative_url }}`

### YAML Syntax Errors

**Problem**: Jekyll build fails with YAML errors.

**Solutions**:
1. Check indentation (YAML is space-sensitive)
2. Verify all strings are properly quoted if they contain special characters
3. Check for trailing commas (not allowed in YAML)
4. Validate YAML syntax using online validator or `yamllint`

## Next Steps

After implementation:

1. **Add Partner Data**: Populate `partners.yml` with actual partner organizations
2. **Add Logos**: Add partner logo images to `assets/images/partners/`
3. **Test Responsively**: Verify layout works on mobile, tablet, and desktop
4. **Validate Accessibility**: Test with screen reader and keyboard navigation
5. **Deploy**: Commit changes and push to GitHub Pages

## Related Documentation

- **Data Model**: `data-model.md`
- **Research**: `research.md`
- **Template Contract**: `contracts/partners-template-contract.md`
- **Data Schema**: `contracts/partners-data-schema.json`
- **Standardized Schema**: `../001-standardize-yaml-data/contracts/data-item-schema.json`

