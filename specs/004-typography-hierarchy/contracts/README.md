# Contracts: Typography Hierarchy and Services Card Refinement

**Date**: 2024-12-19  
**Feature**: 004-typography-hierarchy

## Overview

This directory contains contracts and schemas for the typography hierarchy and services card refinement feature. Since this is primarily a CSS/design enhancement, contracts focus on CSS variable definitions and HTML structure requirements.

## Contracts

### CSS Typography Variables Contract

**File**: `css-typography-contract.md`  
**Purpose**: Defines CSS custom properties (variables) for typography hierarchy

This contract specifies the CSS variables that must be defined for consistent heading sizes (h1/h2/h3) across all pages.

### Service Card HTML Structure Contract

**File**: `service-card-structure.md`  
**Purpose**: Defines the required HTML structure for service cards

This contract specifies the HTML elements and structure required for service cards, including icon/image, description, and "Learn more" link placement.

### Data Schema Contract

**File**: `service-data-schema.json`  
**Purpose**: Defines the YAML data structure for service items

This contract specifies the optional and required fields for service data in `_data/services.yml`.

---

## Contract Compliance

All implementations must:
- Define typography CSS variables as specified
- Follow service card HTML structure contract
- Support the data schema contract for service items
- Maintain backward compatibility with existing data

