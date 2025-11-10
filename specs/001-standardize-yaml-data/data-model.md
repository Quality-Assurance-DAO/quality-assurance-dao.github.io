# Data Model: Standardize YAML Data Files

**Phase**: 1 - Design & Contracts  
**Date**: 2024-12-19  
**Feature**: 001-standardize-yaml-data

## Overview

This feature standardizes four YAML data files to use a consistent schema. All datasets share the same structure with required and optional fields, with conditional requirements based on dataset type.

## Entities

### DataItem

Represents a single entry in any of the four YAML files.

**Location**: `_data/projects.yml`, `_data/services.yml`, `_data/gitbooks.yml`, `_data/github-organisations.yml`

**Schema**:

```yaml
- id: string                    # REQUIRED: URL-safe slug (auto-generated from name)
  name: string                  # REQUIRED: Display name
  description: string           # REQUIRED: Text description
  url: string                   # CONDITIONAL: Required for projects, GitBooks, organizations; optional for services
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
  - Example: "SingularityNet Archive" → "singularitynet-archive"
  - Must be unique across all four YAML files
  - If collision occurs, append numeric suffix (e.g., "singularitynet-archive-2")

- **name** (required): Human-readable display name
  - Used in card headings and links
  - Preserved from existing data

- **description** (required): Text description of the item
  - Used in card body
  - Can be multi-line (YAML multiline string)

- **url** (conditional):
  - **Required for**: projects, gitbooks, github-organisations
  - **Optional for**: services
  - Must be valid, properly formatted URL
  - Used as link target in cards

- **logo** (optional): Path to logo image
  - Relative to site root (e.g., "/assets/images/logos/project-name.png")
  - Displayed in card if present

- **year** (optional): Numeric year
  - Integer value (e.g., 2024)
  - Displayed as metadata in card

- **tags** (optional): Array of tag strings
  - Example: `["blockchain", "governance", "audit"]`
  - Rendered as badges/pills in card
  - Empty array or missing field → no tags displayed

- **status** (optional): Status indicator string
  - Examples: "active", "archived", "in-progress", "completed"
  - Displayed as badge or indicator in card

- **featured** (optional): Boolean flag
  - `true` → display featured badge/indicator
  - `false` or missing → no featured indicator

- **category** (optional): Category classification
  - String value for grouping/filtering (future enhancement)
  - Examples: "governance", "development", "community"

- **repo** (optional): Repository URL
  - GitHub or other repository URL
  - Can be displayed as secondary link

- **contact** (optional): Contact information
  - Email, social handle, or other contact method
  - Displayed as metadata in card

**Validation Rules**:

1. **Required Fields**: Every item MUST have `id`, `name`, `description`
2. **Conditional Required**: Projects, GitBooks, and organizations MUST have `url`
3. **Uniqueness**: `id` values MUST be unique across all four YAML files
4. **URL Format**: All `url` fields (when present) MUST be valid URLs
5. **Data Types**: 
   - `id`, `name`, `description`, `url`, `logo`, `status`, `category`, `repo`, `contact` → strings
   - `year` → number
   - `tags` → array of strings
   - `featured` → boolean

**State Transitions**: N/A (static data, no state machine)

### Dataset

Represents one of the four YAML files containing a collection of related data items.

**Types**:
1. **projects** (`_data/projects.yml`)
2. **services** (`_data/services.yml`)
3. **gitbooks** (`_data/gitbooks.yml`)
4. **github-organisations** (`_data/github-organisations.yml`)

**Structure**: YAML array of DataItem objects

```yaml
- id: item-1
  name: Item One
  description: Description of item one
  url: https://example.com/item-1
  tags:
    - tag1
    - tag2
- id: item-2
  name: Item Two
  description: Description of item two
  # ... more items
```

**Access Pattern**: In Jekyll templates, accessed via `site.data.projects`, `site.data.services`, etc.

**Relationships**: Each Dataset contains zero or more DataItem objects. Each DataItem belongs to exactly one Dataset.

### Card

Visual representation of a DataItem in the layout template.

**Not a data entity** - this is a presentation layer concept.

**Structure**:
- Container: `<article>` or `<div class="data-card">`
- Heading: `<h3>{{ item.name }}</h3>`
- Description: `<p>{{ item.description }}</p>`
- Optional metadata: tags, logo, status, featured badge
- Link: Wraps card content if `url` present

**Rendering Rules**:
- Cards arranged in responsive grid layout
- Optional fields displayed only when present
- Missing optional fields don't break layout
- Cards are clickable when `url` is present

## Relationships

```
Dataset (1) ──contains──> (0..*) DataItem
DataItem (1) ──rendered as──> (1) Card (presentation)
```

## Data Migration

### Current State

**projects.yml**: 2 items, has `name`, `description`, `url` (missing `id`)
**services.yml**: 3 items, has `name`, `description` (missing `id`, `url` optional)
**gitbooks.yml**: 2 items, has `name`, `description`, `url` (missing `id`)
**github-organisations.yml**: 2 items, has `name`, `description`, `url` (missing `id`)

### Migration Steps

1. **Generate IDs**: For each item, generate `id` from `name` using slug algorithm
2. **Validate Uniqueness**: Check for duplicate IDs across all files, append suffix if needed
3. **Add Missing Required Fields**: Identify items missing `description` (none found in current data)
4. **Validate URLs**: Check all `url` fields for proper format (projects, GitBooks, organizations)
5. **Preserve Optional Fields**: Keep any existing optional metadata
6. **Validation**: Run validation script to ensure all rules pass

### Example Migration

**Before**:
```yaml
- name: SingularityNet Archive
  description: SingularityNet Archive Project Board
  url: https://github.com/orgs/SingularityNET-Archive/projects/1
```

**After**:
```yaml
- id: singularitynet-archive
  name: SingularityNet Archive
  description: SingularityNet Archive Project Board
  url: https://github.com/orgs/SingularityNET-Archive/projects/1
```

## Validation Schema

### Required Field Validation

```ruby
# Pseudocode
def validate_required_fields(item, dataset_type)
  errors = []
  errors << "Missing 'id'" unless item['id']
  errors << "Missing 'name'" unless item['name']
  errors << "Missing 'description'" unless item['description']
  
  if dataset_type != 'services'
    errors << "Missing 'url' (required for #{dataset_type})" unless item['url']
  end
  
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
  return [] unless url  # Optional for services
  uri = URI.parse(url)
  uri.scheme && uri.host ? [] : ["Invalid URL format: #{url}"]
rescue URI::InvalidURIError
  ["Invalid URL format: #{url}"]
end
```

## Data Access Patterns

### Jekyll Template Access

```liquid
{% for project in site.data.projects %}
  <article class="data-card">
    <h3>{{ project.name }}</h3>
    <p>{{ project.description }}</p>
    {% if project.url %}
      <a href="{{ project.url }}">Learn more</a>
    {% endif %}
  </article>
{% endfor %}
```

### Conditional Field Rendering

```liquid
{% if item.tags.size > 0 %}
  <div class="tags">
    {% for tag in item.tags %}
      <span class="tag">{{ tag }}</span>
    {% endfor %}
  </div>
{% endif %}

{% if item.featured %}
  <span class="featured-badge">Featured</span>
{% endif %}
```

