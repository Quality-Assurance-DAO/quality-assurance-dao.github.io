# Data Model: Partners Section

**Phase**: 1 - Design & Contracts  
**Date**: 2024-12-19  
**Feature**: 008-partners-section

## Overview

This feature adds a Partners data entity following the standardized DataItem schema from spec 001. Partners represent organizations that QADAO works with, displayed in card format on the main page.

## Entities

### Partner

Represents an organization that QADAO works with.

**Location**: `_data/partners.yml`

**Schema**: Follows standardized DataItem schema from spec 001

```yaml
- id: string                    # REQUIRED: URL-safe slug (auto-generated from name)
  name: string                  # REQUIRED: Display name
  description: string           # REQUIRED: Text description
  url: string                   # OPTIONAL: Website URL (external link)
  logo: string                  # OPTIONAL: Image path (relative to site root)
  year: number                  # OPTIONAL: Numeric year
  tags: array<string>           # OPTIONAL: Array of tag strings
  status: string                # OPTIONAL: Status indicator (e.g., "active", "archived")
  featured: boolean             # OPTIONAL: Featured item flag
  category: string              # OPTIONAL: Category classification
  repo: string                  # OPTIONAL: Repository URL
  contact: string               # OPTIONAL: Contact information
```

**Field Details**:

- **id** (required): URL-safe slug identifier auto-generated from `name` field
  - Generation rules: lowercase, spaces → hyphens, remove special characters
  - Example: "Cardano Foundation" → "cardano-foundation"
  - Must be unique across all YAML data files (projects.yml, services.yml, gitbooks.yml, github-organisations.yml, partners.yml)
  - If collision occurs, append numeric suffix (e.g., "cardano-foundation-2")

- **name** (required): Human-readable display name
  - Used in card headings (h3)
  - Example: "Cardano Foundation"

- **description** (required): Text description of the partner organization
  - Used in card body (paragraph)
  - Can be multi-line (YAML multiline string)
  - Example: "A non-profit organization dedicated to advancing Cardano blockchain technology."

- **url** (optional): Website URL for the partner organization
  - Must be valid, properly formatted URL
  - When present, entire card becomes clickable link
  - Opens in new tab with `target="_blank" rel="noopener noreferrer"`
  - Example: "https://cardanofoundation.org"

- **logo** (optional): Path to partner logo image
  - Relative to site root (e.g., "/assets/images/partners/cardano-foundation.png")
  - Displayed prominently in card using `data-card-logo` class
  - If missing or broken, alt text displayed, layout maintained

- **year** (optional): Numeric year
  - Integer value (e.g., 2024)
  - Displayed as metadata in card if present

- **tags** (optional): Array of tag strings
  - Example: `["blockchain", "governance", "non-profit"]`
  - Rendered as badges/pills in card using `data-card-tags` class
  - Empty array or missing field → no tags displayed

- **status** (optional): Status indicator string
  - Examples: "active", "archived", "in-progress", "completed"
  - Displayed as badge using `status-indicator` class
  - Values: "active", "archived", "in-progress", "completed", "deprecated"

- **featured** (optional): Boolean flag
  - `true` → display featured badge using `featured-badge` class
  - `false` or missing → no featured indicator

- **category** (optional): Category classification
  - String value for grouping/filtering (future enhancement)
  - Examples: "blockchain", "governance", "research", "community"

- **repo** (optional): Repository URL
  - GitHub or other repository URL
  - Not typically displayed in partner cards (reserved for projects)

- **contact** (optional): Contact information
  - Email, social handle, or other contact method
  - Not typically displayed in partner cards (reserved for projects)

**Validation Rules**:

1. **Required Fields**: Every partner MUST have `id`, `name`, `description`
2. **Uniqueness**: `id` values MUST be unique across all YAML data files
3. **URL Format**: All `url` fields (when present) MUST be valid URLs
4. **Data Types**: 
   - `id`, `name`, `description`, `url`, `logo`, `status`, `category`, `repo`, `contact` → strings
   - `year` → number
   - `tags` → array of strings
   - `featured` → boolean
5. **Logo Path Format**: Logo paths must be relative from site root (start with "/")

**State Transitions**: N/A (static data, no state machine)

### Partners Dataset

Represents the YAML file containing partner entries.

**Location**: `_data/partners.yml`

**Structure**: YAML array of Partner objects

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

**Access Pattern**: In Jekyll templates, accessed via `site.data.partners`

**Conditional Rendering**: 
- If file is empty, missing, or contains no valid entries → section is hidden
- Use `{% if site.data.partners %}` before rendering section

**Relationships**: Partners Dataset contains zero or more Partner objects. Each Partner belongs to exactly one Dataset.

### Partner Card

Visual representation of a Partner in the layout template.

**Not a data entity** - this is a presentation layer concept.

**Structure**:
- Container: `<article class="data-card">` or wrapped in `<a class="data-card-link">` if URL exists
- Logo: `<img class="data-card-logo">` (if logo present)
- Heading: `<h3>{{ partner.name }}</h3>`
- Description: `<p>{{ partner.description }}</p>`
- Optional metadata: tags, status, featured badge, year
- Link: Entire card wrapped in `<a>` tag if `url` present

**Rendering Rules**:
- Cards arranged in responsive grid layout using `data-grid` class
- Optional fields displayed only when present
- Missing optional fields don't break layout
- Cards are clickable when `url` is present (entire card acts as link)
- External links include `target="_blank" rel="noopener noreferrer"`
- Cards provide hover effects matching other sections
- Cards support keyboard navigation with focus states

**CSS Classes Used**:
- `.data-grid` - Responsive grid container
- `.data-card` - Card styling with hover effects
- `.data-card-link` - Clickable card link wrapper
- `.data-card-logo` - Logo image styling
- `.data-card-tags` - Tags container
- `.tag` - Individual tag badge
- `.featured-badge` - Featured indicator
- `.status-indicator` - Status badge

## Relationships

```
Partners Dataset (1) ──contains──> (0..*) Partner
Partner (1) ──rendered as──> (1) Partner Card (presentation)
```

## Data Access Patterns

### Jekyll Template Access

```liquid
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
```

### Conditional Field Rendering

All optional fields are conditionally rendered:
- Logo: Only if `partner.logo` exists
- Tags: Only if `partner.tags.size > 0`
- Featured badge: Only if `partner.featured` is true
- Status: Only if `partner.status` exists
- Year: Only if `partner.year` exists
- URL link: Only if `partner.url` exists (wraps entire card)

## Data Validation

### Required Field Validation

```ruby
# Pseudocode
def validate_partner(partner)
  errors = []
  errors << "Missing 'id'" unless partner['id']
  errors << "Missing 'name'" unless partner['name']
  errors << "Missing 'description'" unless partner['description']
  errors
end
```

### Uniqueness Validation

```ruby
# Pseudocode
def validate_uniqueness(all_items)
  ids = all_items.map { |item| item['id'] }
  duplicates = ids.group_by(&:itself).select { |k, v| v.size > 1 }.keys
  duplicates.empty? ? [] : ["Duplicate IDs found: #{duplicates.join(', ')}"]
end
```

### URL Format Validation

```ruby
# Pseudocode
def validate_url(url)
  return [] unless url  # Optional field
  uri = URI.parse(url)
  uri.scheme && uri.host ? [] : ["Invalid URL format: #{url}"]
rescue URI::InvalidURIError
  ["Invalid URL format: #{url}"]
end
```

## Example Data

### Minimal Partner Entry

```yaml
- id: example-partner
  name: Example Partner
  description: A partner organization we work with.
```

### Full Partner Entry

```yaml
- id: cardano-foundation
  name: Cardano Foundation
  description: A non-profit organization dedicated to advancing Cardano blockchain technology and supporting the Cardano ecosystem.
  url: https://cardanofoundation.org
  logo: /assets/images/partners/cardano-foundation.png
  year: 2024
  tags:
    - blockchain
    - governance
    - non-profit
    - cardano
  status: active
  featured: true
  category: blockchain
```

