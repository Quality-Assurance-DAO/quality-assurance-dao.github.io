# Data Model: Typography Hierarchy and Services Card Refinement

**Date**: 2024-12-19  
**Feature**: 004-typography-hierarchy

## Overview

This document describes the data structures and entities involved in the typography hierarchy and services card refinement feature. Since this is primarily a CSS/design enhancement, the data model focuses on the service card entity and typography configuration.

## Entities

### 1. Service Card (Enhanced)

**Type**: YAML data file + HTML template rendering  
**Location**: `_data/services.yml` (data), `_layouts/default.html` (template)  
**Purpose**: Display service offerings in enhanced card format

**Structure** (existing, with optional enhancements):
```yaml
- id: string (optional)
  name: string (required)
  description: string (required)
  url: string (optional, for "Learn more" link)
  logo: string (optional, path to image)
  icon: string (optional, emoji or icon identifier - NEW)
  tags: array of strings (optional)
  featured: boolean (optional)
  status: string (optional)
```

**Enhancements**:
- `icon` field (optional): Can be emoji (e.g., "🚀") or icon identifier for display in card
- `url` field: Now explicitly used for "Learn more" link (was already optional)

**Validation Rules**:
- `name` and `description` are required
- `url` must be valid URL if provided
- `logo` must be valid path if provided
- `icon` is optional (can be emoji or identifier)
- `tags` must be array of strings
- `status` must be one of valid status values (if provided)

**Relationships**: None (standalone entities)

**State Transitions**: N/A (static data)

---

### 2. Typography Hierarchy Configuration

**Type**: CSS variables and styles  
**Location**: `assets/css/main.css`  
**Purpose**: Define consistent heading sizes (h1/h2/h3) across all pages

**Structure**:
```css
:root {
  --h1-size: clamp(2rem, 5vw, 3rem);
  --h2-size: clamp(1.75rem, 4vw, 2.5rem);
  --h3-size: clamp(1.25rem, 3vw, 1.75rem);
}
```

**Validation Rules**:
- h1 size must be largest
- h2 size must be between h1 and h3
- h3 size must be larger than body text
- All sizes must use responsive units (rem, clamp, or similar)
- Sizes must maintain hierarchy relationships at all screen sizes

**Relationships**: Applied to all HTML heading elements (h1, h2, h3) site-wide

**State Transitions**: N/A (CSS configuration)

---

## Data Flow

### Service Card Rendering Flow (Jekyll)

```
1. Jekyll Build
   ├─> Read _data/services.yml
   ├─> Process Liquid templates in _layouts/default.html
   └─> Generate static HTML with service cards

2. Page Render
   ├─> Load HTML
   ├─> Load CSS (with typography hierarchy and card styles)
   ├─> Apply typography hierarchy to all headings
   └─> Display service cards with icons/images, descriptions, and "Learn more" links
```

### Typography Hierarchy Application Flow

```
1. Page Load
   ├─> CSS loads with typography variables
   ├─> All h1 elements apply --h1-size
   ├─> All h2 elements apply --h2-size
   └─> All h3 elements apply --h3-size

2. Responsive Scaling
   ├─> clamp() function evaluates viewport width
   ├─> Heading sizes scale between min and max values
   └─> Hierarchy relationships maintained at all sizes
```

## State Management

### Client-Side State

| State | Storage | Scope | Lifetime |
|-------|---------|-------|----------|
| Typography Sizes | CSS Variables | Page | Session only (applied on load) |
| Card Layout | CSS/DOM | Page | Session only |

### Server-Side State

| State | Storage | Scope | Lifetime |
|-------|---------|-------|----------|
| Service Data | `_data/services.yml` | Site | Version controlled |
| Typography Config | `assets/css/main.css` | Site | Version controlled |

## Validation Rules Summary

### Required Fields
- **Service**: `name`, `description`

### Optional Fields
- **Service**: `id`, `url`, `logo`, `icon`, `tags`, `featured`, `status`

### Format Validation
- URLs must be valid HTTP/HTTPS URLs
- Image paths must be valid relative paths
- Icons can be emoji or identifier strings
- Tags must be arrays of strings
- Status must match predefined values (if provided)

## Data Integrity

### Existing Data Files
- **No changes required** - All existing YAML files remain unchanged
- **Backward compatibility** - All existing data structures are preserved
- **Graceful degradation** - Missing optional fields (icon, url) handled gracefully

### Typography Configuration
- **CSS-only changes** - No data file modifications required
- **Global application** - Typography hierarchy applies to all headings site-wide
- **No breaking changes** - Existing heading styles enhanced, not replaced

## Migration Notes

**No migration required** - This feature adds enhancements without changing existing data structures. All existing YAML files continue to work as-is.

**Optional Enhancement**: If icons are desired for services, add `icon` field to service items in `_data/services.yml` with emoji or icon identifiers.

