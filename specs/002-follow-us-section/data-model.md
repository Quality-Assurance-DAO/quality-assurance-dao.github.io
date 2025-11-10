# Data Model: Follow Us Section with Social Link Cards

**Feature**: 002-follow-us-section  
**Date**: 2024-12-19

## Overview

This feature does not introduce new data structures or persistent storage. Social media URLs are read from existing Jekyll site configuration variables. The feature primarily involves template rendering and CSS styling changes.

## Entities

### Social Media Card (Presentation Entity)

**Type**: Presentation/UI Entity (not a data entity)  
**Purpose**: Represents a single social media platform link displayed as a card in the Follow Us section.

**Attributes**:
- `platform_name` (string): Display name of the platform (e.g., "X / Twitter", "YouTube", "GitHub")
- `platform_url` (string): URL to the social media profile (from site configuration)
- `icon_path` (string): Path to platform icon/logo SVG file (e.g., "/assets/images/social/twitter-icon.svg")
- `aria_label` (string): Accessibility label for screen readers (e.g., "Follow us on X / Twitter")

**Source of Data**:
- Platform name: Hardcoded in template (not from configuration)
- Platform URL: From Jekyll site configuration variables:
  - X/Twitter: `site.x_handle`
  - YouTube: `site.youtube_handle`
  - GitHub: `site.github.repository_url`
- Icon path: Hardcoded in template based on platform
- ARIA label: Generated in template from platform name

**Rendering Rules**:
- Card is only rendered if corresponding URL is present in site configuration
- Card wraps entire content in clickable link (`<a>` tag)
- Link opens in new tab with `target="_blank"` and `rel="noopener"`
- Card uses existing `data-card` CSS class for styling consistency

**Relationships**:
- Belongs to: Follow Us Section (presentation container)
- Platform type: One of {X/Twitter, YouTube, GitHub}

### Follow Us Section (Presentation Entity)

**Type**: Presentation/UI Entity (not a data entity)  
**Purpose**: Represents the website section that displays social media links as cards.

**Attributes**:
- `section_id` (string): HTML ID attribute ("follow-us" or "contact" - to be updated)
- `section_heading` (string): Section heading text ("Follow Us")
- `social_cards` (array): Collection of Social Media Card entities (0-3 cards)

**Rendering Rules**:
- Section maintains same position on page (after GitHub Organizations, before footer)
- Uses existing `section` and `container` CSS classes
- Contains `data-grid` container for card layout
- Heading changed from "Contact Us" to "Follow Us"
- No email contact links displayed

**Relationships**:
- Contains: 0-3 Social Media Card entities
- Position: After GitHub Organizations section, before Footer

## Configuration Variables (Existing)

### Site Configuration (`_config.yml`)

**Variables Used**:
- `site.x_handle` (string, optional): URL to X/Twitter profile
- `site.youtube_handle` (string, optional): URL to YouTube channel
- `site.github.repository_url` (string, automatic): GitHub repository URL (provided by GitHub Pages)

**Validation**:
- URLs should be valid HTTP/HTTPS URLs
- Missing URLs result in corresponding card not being displayed
- No validation errors thrown for missing URLs (graceful degradation)

## State Transitions

N/A - This is a static presentation feature with no state management.

## Data Flow

```
Site Configuration (_config.yml)
    ↓
Jekyll Site Variables (site.x_handle, site.youtube_handle, site.github.repository_url)
    ↓
Liquid Template (_layouts/default.html)
    ↓
Conditional Rendering ({% if site.x_handle %})
    ↓
HTML Output (Social Media Cards)
    ↓
CSS Styling (data-grid, data-card classes)
    ↓
Rendered Page (Browser Display)
```

## Constraints

- Maximum 3 social media cards (X/Twitter, YouTube, GitHub)
- Cards only render if corresponding URL is configured
- No data persistence required (static site)
- No user input or data collection
- No API calls or external data fetching

## Notes

- This feature does not introduce new data storage or database entities
- All data comes from existing Jekyll site configuration
- The "data model" here refers to the presentation structure, not persistent data
- No migrations or data transformations required
- Feature is purely presentational with no backend logic

