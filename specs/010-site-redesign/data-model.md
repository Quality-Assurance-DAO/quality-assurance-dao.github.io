# Data Model: Site Redesign with Modern UI

**Feature**: Site Redesign with Modern UI  
**Date**: 2025-01-27  
**Phase**: 1 - Design & Contracts

## Overview

The site redesign uses existing Jekyll data files located in the `_data/` directory. All content is dynamically loaded from YAML files, ensuring separation of content from presentation. The data model consists of entities representing services, partners, projects, slides (video carousel), and site configuration.

## Entities

### Service

Represents a service offering displayed in the services section.

**Source**: `_data/services.yml`

**Fields**:
- `name` (string, required): Service name/title
- `description` (string, required): Service description
- `id` (string, required): Unique identifier for the service
- `color` (string, optional): Hex color code for service branding
- `logo` (string, optional): Path to service logo image
- `icon` (string, optional): Icon identifier or emoji
- `url` (string, optional): Link to service details or external page
- `tags` (array of strings, optional): Tags for categorization
- `featured` (boolean, optional): Whether service is featured
- `status` (string, optional): Service status (e.g., "active", "coming-soon")

**Relationships**:
- None (standalone entity)

**Validation Rules**:
- `name`, `description`, and `id` must be present
- `id` should be unique within the services collection
- `color` must be valid hex color code if provided
- `logo` path should be relative to site root or absolute URL

**State Transitions**: N/A (static data)

**Example**:
```yaml
- name: Community Co-Production
  description: In our SingularityNet Archive project we co‑designed an archive...
  id: Community Co-Production
  color: '#6ee7b7'
```

---

### Partner

Represents a partner organization displayed in the partners section.

**Source**: `_data/partners.yml`

**Fields**:
- `id` (string, required): Unique identifier for the partner
- `name` (string, required): Partner organization name
- `description` (string, required): Partner description
- `url` (string, required): Partner website URL
- `logo` (string, required): Path to partner logo image
- `tags` (array of strings, optional): Tags for categorization
- `status` (string, optional): Partner status (e.g., "active", "inactive")
- `featured` (boolean, optional): Whether partner is featured
- `year` (string or number, optional): Year of partnership

**Relationships**:
- None (standalone entity)

**Validation Rules**:
- `id`, `name`, `description`, `url`, and `logo` must be present
- `id` should be unique within the partners collection
- `url` should be a valid URL (absolute)
- `logo` path should be relative to site root or absolute URL

**State Transitions**: N/A (static data)

**Example**:
```yaml
- id: singularitynet
  name: SingularityNet
  description: SingularityNET is bootstrapping an ecosystem...
  url: https://singularitynet.io
  logo: /assets/images/partners/singularitynet.png
  tags:
    - ai
    - agi
  status: active
  featured: true
```

---

### Project

Represents a project displayed in the projects/portfolio section.

**Source**: `_data/projects.yml`

**Fields**:
- `name` (string, required): Project name/title
- `description` (string, required): Project description
- `url` (string, required): Link to project repository or website
- `id` (string, required): Unique identifier for the project
- `logo` (string, optional): Path to project logo image
- `tags` (array of strings, optional): Tags for categorization
- `featured` (boolean, optional): Whether project is featured
- `status` (string, optional): Project status (e.g., "active", "archived")
- `year` (string or number, optional): Year project was completed or started

**Relationships**:
- None (standalone entity)

**Validation Rules**:
- `name`, `description`, `url`, and `id` must be present
- `id` should be unique within the projects collection
- `url` should be a valid URL (absolute)
- `logo` path should be relative to site root or absolute URL if provided

**State Transitions**: N/A (static data)

**Example**:
```yaml
- name: ASI-Chain-MeTTa-Simulation-Dashboard
  description: An interactive Streamlit web application...
  url: https://github.com/SingularityNET-Archive/ASI-Chain-MeTTa-Simulation-Dashboard
  id: ASI-Chain-MeTTa-Simulation-Dashboard
```

---

### Slide

Represents a video carousel slide displayed in the hero section.

**Source**: `_data/slides.yml`

**Fields**:
- `video` (string, required): Path to video file
- `headline` (string, required): Slide headline text
- `cta_link` (string, optional): Section anchor link for navigation when video is clicked (e.g., "#portfolio", "#services")
- `section_link` (string, optional): Alternative field name for section link (same purpose as cta_link)
- `poster` (string, optional): Path to video poster/thumbnail image
- `duration` (number, optional): Slide display duration in seconds (default: 5)
- `cta_label` (string, optional): **NOT DISPLAYED** - This field exists in data but buttons are not shown per spec requirements

**Relationships**:
- None (standalone entity)

**Validation Rules**:
- `video` and `headline` must be present
- `video` path should be relative to site root or absolute URL
- `cta_link` or `section_link` should be a valid anchor link (starts with #) if provided
- `poster` path should be relative to site root or absolute URL if provided
- `duration` should be a positive number if provided

**State Transitions**: N/A (static data, but carousel has runtime state for current slide)

**Special Notes**:
- When a slide is clicked, navigate to `cta_link` or `section_link` if present
- No CTA buttons are displayed - the video itself is clickable
- If neither `cta_link` nor `section_link` is present, video may be non-clickable or play/pause only

**Example**:
```yaml
- video: /assets/videos/MeTTa-sim.mp4
  headline: "Visualise an ASI Chain Agent Network"
  cta_link: "#portfolio"
  duration: 15
```

---

### Theme Preference

Represents the user's theme selection (dark or light mode).

**Source**: Browser localStorage (not a data file)

**Fields**:
- `theme` (string): Theme value - either "dark" or "light"

**Storage**:
- Key: `"theme"`
- Value: `"dark"` or `"light"`
- Applied via `data-theme` attribute on `<html>` element

**Validation Rules**:
- Must be either "dark" or "light"
- Defaults to "dark" if not set or invalid value

**State Transitions**:
- Initial: No preference → defaults to "dark"
- User toggles → switches between "dark" and "light"
- Persists across page loads via localStorage

---

### Site Configuration

Represents site-wide configuration from Jekyll `_config.yml`.

**Source**: `_config.yml`

**Relevant Fields for Redesign**:
- `title` (string): Site title (used in header/navigation)
- `logo` (string): Path to site logo image (QADAO logo)
- `description` (string): Site description/meta description
- `x_handle` (string, optional): X/Twitter URL
- `youtube_handle` (string, optional): YouTube URL
- `github.repository_url` (string, optional): GitHub repository URL (auto-set by GitHub Pages)

**Relationships**:
- Used by layout template for global site elements

**Validation Rules**:
- `title` and `logo` should be present for redesign requirements
- Logo path should be relative to site root or absolute URL

---

## Data File Structure

All data files follow YAML front matter format:

```yaml
---
- entity1:
    field1: value1
    field2: value2
- entity2:
    field1: value1
    field2: value2
```

## Data Access Patterns

### Jekyll/Liquid Access

- Services: `site.data.services` (array)
- Partners: `site.data.partners` (array)
- Projects: `site.data.projects` (array)
- Slides: `site.data.slides` (array)
- Site config: `site.title`, `site.logo`, etc.

### Iteration Pattern

```liquid
{% for service in site.data.services %}
  <!-- Render service card -->
{% endfor %}
```

## Edge Cases & Handling

1. **Empty Data Files**: Sections should not display or show empty state message
2. **Missing Required Fields**: Skip entry or display with available fields only
3. **Missing Optional Fields**: Display gracefully, omit missing elements
4. **Invalid URLs**: Use `target="_blank" rel="noopener noreferrer"` for external links
5. **Missing Images**: Display alt text or placeholder, maintain layout
6. **Long Text Content**: Use CSS text truncation or wrapping to maintain layout
7. **Missing Logo**: Fallback to site title text in header
8. **No Theme Preference**: Default to dark theme

## Data Validation

Validation should be performed:
- During development (manual review)
- Via Jekyll build process (errors will surface)
- In templates (conditional rendering for optional fields)

No runtime validation needed (static site).

