# Contracts Directory

**Feature**: Site Redesign with Modern UI  
**Date**: 2025-01-27

## Overview

This directory contains contracts defining the structure, behavior, and styling requirements for the redesigned site components and systems.

## Contract Files

### CSS Variables Contract
**File**: `css-variables-contract.md`

Defines the CSS custom properties (variables) for the design system, including:
- Color palette (primary, secondary, backgrounds, text)
- Typography scale (font sizes, weights, line heights)
- Spacing scale
- Layout variables (container, sections)
- Component-specific variables (cards, buttons, navigation)
- Breakpoints and transitions

**Usage**: Reference when implementing CSS styling to ensure consistency across the site.

---

### Component Contracts
**File**: `component-contracts.md`

Defines the structure, behavior, and styling requirements for UI components:
- Navigation Header
- Hero Section
- Video Carousel
- Services Grid
- Partners Section
- Projects Section
- About Section
- Follow Us / Contact Section
- Theme Toggle Button
- Common Patterns (Data Grid, Data Card, Container, Section)

**Usage**: Reference when implementing or updating Jekyll includes and layout templates.

---

## Contract Validation

Contracts should be validated during implementation:
- CSS variables must match contract definitions
- Components must follow structure and behavior requirements
- Accessibility requirements must be met
- Responsive breakpoints must be consistent

## Updates

When updating contracts:
1. Update the relevant contract file
2. Update version number and date
3. Document breaking changes
4. Update implementation to match new contract

