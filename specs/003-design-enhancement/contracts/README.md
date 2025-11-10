# Contracts: Modern Design Enhancement

**Date**: 2024-12-19  
**Feature**: 003-design-enhancement

## Overview

This directory contains contracts and schemas for the modern design enhancement feature. Since this is a static Jekyll site, contracts focus on:
1. YAML data file schemas (JSON Schema)
2. Theme toggle JavaScript API contract
3. CSS variable contract

## Contracts

### 1. YAML Data Schema
- **File**: `data-item-schema.json`
- **Purpose**: Validates structure of items in YAML data files (services, projects, gitbooks, organizations, values)
- **Format**: JSON Schema Draft 7

### 2. Theme Toggle API
- **File**: `theme-toggle-api.md`
- **Purpose**: Documents the JavaScript API for theme toggle functionality
- **Format**: Markdown API documentation

### 3. CSS Variables Contract
- **File**: `css-variables-contract.md`
- **Purpose**: Documents the CSS custom properties (variables) used for theming
- **Format**: Markdown documentation

## Usage

These contracts serve as:
- **Documentation**: Reference for developers implementing or maintaining the feature
- **Validation**: Can be used with JSON Schema validators to validate YAML data files
- **Testing**: Define expected behavior for theme toggle and CSS variables

## Validation

To validate YAML data files against the schema:

```bash
# Using yaml-schema-validator or similar tool
yaml-schema-validator -s contracts/data-item-schema.json _data/services.yml
```

