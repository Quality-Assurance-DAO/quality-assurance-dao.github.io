# Contracts: Partners Section

**Feature**: 008-partners-section  
**Date**: 2024-12-19

## Overview

This directory contains API contracts and schemas for the Partners Section feature.

## Contracts

### 1. Partners Data Schema (`partners-data-schema.json`)

JSON Schema definition for `partners.yml` data file. Validates partner entries follow the standardized DataItem schema from spec 001.

**Key Points**:
- Required fields: `id`, `name`, `description`
- Optional fields: `url`, `logo`, `tags`, `status`, `featured`, `year`, `category`, `repo`, `contact`
- Logo path pattern: `/assets/images/partners/*.{png,jpg,jpeg,svg,gif}`
- Status enum: `active`, `archived`, `in-progress`, `completed`, `deprecated`

**Usage**: Validate `_data/partners.yml` against this schema before deployment.

### 2. Partners Template Contract (`partners-template-contract.md`)

Liquid template API contract defining how to render the Partners section in Jekyll layouts.

**Key Points**:
- Conditional rendering: Section hidden if `site.data.partners` is empty
- Card pattern: Entire card clickable when URL exists (project card pattern)
- CSS classes: Reuses existing `data-card` and `data-grid` classes
- Security: External links include `target="_blank" rel="noopener noreferrer"`
- Accessibility: ARIA labels, alt text, keyboard navigation support

**Usage**: Reference when implementing or modifying the Partners section template.

## Validation

### Data Validation

Use the JSON schema to validate `_data/partners.yml`:

```bash
# Example validation (requires json-schema validator)
validate-json partners-data-schema.json _data/partners.yml
```

### Template Validation

Manual testing checklist provided in `partners-template-contract.md` under "Testing Checklist".

## Related Documentation

- **Data Model**: `/specs/008-partners-section/data-model.md`
- **Research**: `/specs/008-partners-section/research.md`
- **Standardized Schema**: `/specs/001-standardize-yaml-data/contracts/data-item-schema.json`

