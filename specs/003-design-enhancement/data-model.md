# Data Model: Modern Design Enhancement

**Date**: 2024-12-19  
**Feature**: 003-design-enhancement

## Overview

This document describes the data structures and entities involved in the modern design enhancement feature. Since this is a static Jekyll site, the data model primarily consists of:
1. Existing YAML data files (unchanged)
2. Theme preference state (client-side)
3. Optional Values section data (new, optional)

## Entities

### 1. Theme Preference

**Type**: Client-side state (localStorage)  
**Purpose**: Store user's theme preference (light/dark)

**Structure**:
```javascript
{
  theme: "light" | "dark"
}
```

**Storage**: Browser localStorage  
**Key**: `"theme"`  
**Default**: System preference (`prefers-color-scheme` media query) or `"light"`

**State Transitions**:
- Initial load: Check localStorage → if not found, check system preference → default to "light"
- User toggle: Toggle between "light" and "dark", save to localStorage
- System preference change: Only applies if no user preference is saved

**Validation**:
- Must be exactly "light" or "dark"
- Invalid values default to "light"
- Missing value triggers system preference check

---

### 2. Navigation State

**Type**: Client-side state (DOM/CSS)  
**Purpose**: Track navigation visibility and position during scroll

**Structure**:
```css
.sticky-nav {
  position: sticky;
  top: 0;
  /* State managed by CSS, no explicit data structure */
}
```

**State Transitions**:
- Page load: Navigation visible at top
- Scroll down: Navigation remains sticky at top of viewport
- Scroll to top: Navigation returns to normal position (if not sticky)

**Validation**: N/A (CSS-managed)

---

### 3. Service Data (Existing)

**Type**: YAML data file  
**Location**: `_data/services.yml`  
**Purpose**: Display service offerings

**Structure** (unchanged):
```yaml
- id: string (optional)
  name: string (required)
  description: string (required)
  url: string (optional)
  logo: string (optional, path to image)
  tags: array of strings (optional)
  featured: boolean (optional)
  status: string (optional, e.g., "active", "archived")
```

**Validation Rules**:
- `name` and `description` are required
- `url` must be valid URL if provided
- `logo` must be valid path if provided
- `tags` must be array of strings
- `status` must be one of: "active", "archived", "in-progress", "completed", "deprecated" (if provided)

**Relationships**: None (standalone entities)

---

### 4. Project Data (Existing)

**Type**: YAML data file  
**Location**: `_data/projects.yml`  
**Purpose**: Display project portfolio

**Structure** (unchanged):
```yaml
- id: string (optional)
  name: string (required)
  description: string (required)
  url: string (optional)
  logo: string (optional, path to image)
  tags: array of strings (optional)
  featured: boolean (optional)
  status: string (optional)
  year: number (optional)
```

**Validation Rules**:
- `name` and `description` are required
- `url` must be valid URL if provided
- `logo` must be valid path if provided
- `tags` must be array of strings
- `year` must be valid year (number) if provided
- `status` must be one of valid status values (if provided)

**Relationships**: None (standalone entities)

---

### 5. GitBook Data (Existing)

**Type**: YAML data file  
**Location**: `_data/gitbooks.yml`  
**Purpose**: Display GitBook resources

**Structure** (unchanged):
```yaml
- id: string (optional)
  name: string (required)
  description: string (required)
  url: string (optional)
  logo: string (optional, path to image)
  tags: array of strings (optional)
  featured: boolean (optional)
  status: string (optional)
```

**Validation Rules**: Same as Service Data

**Relationships**: None (standalone entities)

---

### 6. GitHub Organization Data (Existing)

**Type**: YAML data file  
**Location**: `_data/github-organisations.yml`  
**Purpose**: Display GitHub organizations

**Structure** (unchanged):
```yaml
- id: string (optional)
  name: string (required)
  description: string (required)
  url: string (optional)
  logo: string (optional, path to image)
  tags: array of strings (optional)
  featured: boolean (optional)
  status: string (optional)
  repo: string (optional, URL to repository)
```

**Validation Rules**: Same as Service Data, plus:
- `repo` must be valid URL if provided

**Relationships**: None (standalone entities)

---

### 7. Values Data (New, Optional)

**Type**: YAML data file (optional)  
**Location**: `_data/values.yml`  
**Purpose**: Display organizational values (if content available)

**Structure**:
```yaml
- id: string (optional)
  title: string (required)
  description: string (required)
  icon: string (optional, emoji or icon identifier)
  order: number (optional, for sorting)
```

**Validation Rules**:
- `title` and `description` are required
- `icon` is optional (can be emoji or Material Symbol name)
- `order` must be number if provided (used for sorting)

**Relationships**: None (standalone entities)

**Note**: This entity is optional. If `_data/values.yml` doesn't exist, the Values section will not be displayed.

---

## Data Flow

### Theme Preference Flow

```
1. Page Load
   ├─> Check localStorage for "theme"
   ├─> If found: Apply theme
   ├─> If not found: Check prefers-color-scheme
   └─> Apply theme (light or dark)

2. User Toggle
   ├─> Get current theme from data-theme attribute
   ├─> Toggle to opposite theme
   ├─> Update data-theme attribute
   ├─> Update body class (for backwards compatibility)
   └─> Save to localStorage

3. System Preference Change
   ├─> Listen to prefers-color-scheme change event
   ├─> Only apply if localStorage has no saved preference
   └─> Update theme accordingly
```

### Data Rendering Flow (Jekyll)

```
1. Jekyll Build
   ├─> Read _data/*.yml files
   ├─> Process Liquid templates
   └─> Generate static HTML

2. Page Render
   ├─> Load HTML
   ├─> Load CSS (with theme variables)
   ├─> Load JavaScript (theme-toggle.js)
   ├─> Apply initial theme (from localStorage or system)
   └─> Enable theme toggle interaction
```

## State Management

### Client-Side State

| State | Storage | Scope | Lifetime |
|-------|---------|-------|----------|
| Theme Preference | localStorage | Browser | Persistent across sessions |
| Navigation Position | DOM/CSS | Page | Session only |
| System Preference | Browser API | Browser | System-level |

### Server-Side State

| State | Storage | Scope | Lifetime |
|-------|---------|-------|----------|
| Service Data | `_data/services.yml` | Site | Version controlled |
| Project Data | `_data/projects.yml` | Site | Version controlled |
| GitBook Data | `_data/gitbooks.yml` | Site | Version controlled |
| Organization Data | `_data/github-organisations.yml` | Site | Version controlled |
| Values Data | `_data/values.yml` (optional) | Site | Version controlled |

## Validation Rules Summary

### Required Fields
- **Service/Project/GitBook/Organization**: `name`, `description`
- **Values** (if implemented): `title`, `description`

### Optional Fields
- All entities: `id`, `url`, `logo`, `tags`, `featured`, `status`
- Projects: `year`
- Organizations: `repo`
- Values: `icon`, `order`

### Format Validation
- URLs must be valid HTTP/HTTPS URLs
- Image paths must be valid relative paths
- Tags must be arrays of strings
- Status must match predefined values (if provided)
- Year must be valid number (if provided)
- Order must be valid number (if provided)

## Data Integrity

### Existing Data Files
- **No changes required** - All existing YAML files remain unchanged
- **Backward compatibility** - All existing data structures are preserved
- **Graceful degradation** - Missing optional fields handled gracefully

### New Data (Values)
- **Optional implementation** - Values section only appears if data file exists
- **Consistent structure** - Follows same pattern as other data entities
- **No breaking changes** - Addition of values.yml doesn't affect existing functionality

## Migration Notes

**No migration required** - This feature adds enhancements without changing existing data structures. All existing YAML files continue to work as-is.

**Optional Enhancement**: If Values section is to be implemented, create `_data/values.yml` following the structure defined above.

