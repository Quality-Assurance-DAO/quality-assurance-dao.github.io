# Data Contracts

This directory contains schema definitions for the standardized YAML data files.

## Files

- **data-item-schema.json**: JSON Schema for a single data item (used in all four YAML files)
- **dataset-schema.json**: JSON Schema for a complete dataset (array of data items)

## Usage

These schemas can be used for:
- Validation of YAML data files
- Documentation of expected data structure
- IDE autocomplete/validation (if supported)
- Automated testing of data integrity

## Validation Rules

### Required Fields (All Datasets)
- `id`: URL-safe slug (auto-generated from name)
- `name`: Display name
- `description`: Text description

### Conditional Required Fields
- `url`: Required for `projects.yml`, `gitbooks.yml`, `github-organisations.yml`
- `url`: Optional for `services.yml`

### Optional Fields (All Datasets)
- `logo`: Image path
- `year`: Numeric year
- `tags`: Array of strings
- `status`: Status indicator
- `featured`: Boolean flag
- `category`: Category string
- `repo`: Repository URL
- `contact`: Contact information

### Cross-File Validation
- `id` values must be unique across all four YAML files
- All `url` fields (when present) must be valid URLs

## Example Valid Data Item

```yaml
- id: singularitynet-archive
  name: SingularityNet Archive
  description: SingularityNet Archive Project Board
  url: https://github.com/orgs/SingularityNET-Archive/projects/1
  tags:
    - blockchain
    - archive
  status: active
  featured: true
```

