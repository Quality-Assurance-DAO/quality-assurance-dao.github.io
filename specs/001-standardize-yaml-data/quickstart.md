# Quickstart: Standardize YAML Data Files

**Feature**: 001-standardize-yaml-data  
**Date**: 2024-12-19

## Overview

This feature standardizes four YAML data files to use a consistent schema and updates the Jekyll templates to render them in responsive card grids.

## Quick Reference

### Data Files
- `_data/projects.yml` - Project data (url required)
- `_data/services.yml` - Service data (url optional)
- `_data/gitbooks.yml` - GitBook data (url required)
- `_data/github-organisations.yml` - GitHub organization data (url required)

### Required Fields (All)
- `id`: URL-safe slug (auto-generated from name)
- `name`: Display name
- `description`: Text description

### Conditional Required
- `url`: Required for projects, GitBooks, organizations; optional for services

### Optional Fields
- `logo`, `year`, `tags`, `status`, `featured`, `category`, `repo`, `contact`

## Adding a New Data Item

1. **Choose the appropriate file** (`projects.yml`, `services.yml`, etc.)

2. **Add the item with required fields**:
   ```yaml
   - id: my-new-item
     name: My New Item
     description: Description of my new item
     url: https://example.com  # Required for projects/GitBooks/orgs
   ```

3. **Add optional fields as needed**:
   ```yaml
   - id: my-new-item
     name: My New Item
     description: Description of my new item
     url: https://example.com
     tags:
       - tag1
       - tag2
     featured: true
     status: active
   ```

4. **Generate ID from name** (if not auto-generated):
   - Convert to lowercase
   - Replace spaces with hyphens
   - Remove special characters
   - Example: "My New Item" → "my-new-item"

5. **Validate**:
   - Run validation script to check for duplicates, missing fields, invalid URLs
   - Fix any errors before committing

## Template Usage

### Rendering All Items

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

### Conditional Fields

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

{% if item.logo %}
  <img src="{{ item.logo | relative_url }}" alt="{{ item.name }} logo">
{% endif %}
```

## Validation

### Manual Validation

Check for:
- ✅ All required fields present (`id`, `name`, `description`)
- ✅ `url` present for projects/GitBooks/organizations
- ✅ No duplicate `id` values across all files
- ✅ All `url` fields are valid URLs
- ✅ Data types are correct (tags is array, featured is boolean, etc.)

### Automated Validation

Run validation script (when implemented):
```bash
# Example (to be implemented)
ruby scripts/validate-data.rb
```

## Common Patterns

### Adding Tags

```yaml
tags:
  - blockchain
  - governance
  - audit
```

### Marking as Featured

```yaml
featured: true
```

### Adding Logo

```yaml
logo: /assets/images/logos/project-name.png
```

### Setting Status

```yaml
status: active  # Options: active, archived, in-progress, completed, deprecated
```

## Migration Checklist

When migrating existing data:

- [ ] Generate `id` from `name` for each item
- [ ] Check for duplicate IDs across all files
- [ ] Ensure `description` is present (add if missing)
- [ ] Verify `url` is present for projects/GitBooks/organizations
- [ ] Validate all URLs are properly formatted
- [ ] Preserve any existing optional metadata
- [ ] Run validation script
- [ ] Test rendering in Jekyll local server

## Testing

### Local Development

1. **Start Jekyll server**:
   ```bash
   bundle exec jekyll serve
   ```

2. **View site**: http://localhost:4000

3. **Check each section**:
   - Services section (`#services`)
   - Projects section (`#portfolio`)
   - GitBooks section (if added)
   - GitHub organizations section (if added)

4. **Test responsive design**:
   - Resize browser window
   - Test on mobile device or emulator
   - Verify cards adapt to screen size

5. **Test accessibility**:
   - Use keyboard navigation (Tab through page)
   - Test with screen reader
   - Check color contrast

### Validation Testing

- Test with missing required fields (should fail)
- Test with duplicate IDs (should fail)
- Test with invalid URLs (should fail)
- Test with all optional fields (should pass)
- Test with no optional fields (should pass)

## Troubleshooting

### Card Not Displaying

- Check YAML syntax (indentation, colons, dashes)
- Verify item is in correct file
- Check for required fields (`id`, `name`, `description`)
- Verify Jekyll is reading data: `{{ site.data.projects | jsonify }}`

### Duplicate ID Error

- Check all four YAML files for duplicate `id` values
- Generate new unique ID (append `-2`, `-3`, etc.)

### Invalid URL Error

- Verify URL starts with `http://` or `https://`
- Check for typos or missing protocol
- Test URL in browser to ensure it's accessible

### Optional Field Not Displaying

- Check if field exists in YAML (case-sensitive)
- Verify conditional rendering in template: `{% if item.field %}`
- Check for typos in field name

## Related Documentation

- [Data Model](./data-model.md) - Detailed entity definitions
- [Research](./research.md) - Technical decisions and rationale
- [Feature Specification](./spec.md) - Complete requirements
- [Contracts](./contracts/) - JSON Schema definitions

