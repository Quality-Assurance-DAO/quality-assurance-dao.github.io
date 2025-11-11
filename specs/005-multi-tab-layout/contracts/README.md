# Contracts Directory

This directory contains API contracts and interface specifications for the multi-tab interface layout component.

## Contract Files

### 1. `tabs-include-contract.md`

Defines the Jekyll Liquid include interface:
- How to use the `{% include tabs.html %}` component
- Parameters (current and future)
- Data source requirements
- Output HTML structure
- Error handling
- Usage examples

### 2. `tabs-js-api.md`

Defines the JavaScript API for tab switching:
- DOM structure and selectors
- State management approach
- Event handling
- Internal API functions
- Browser compatibility
- Progressive enhancement

### 3. `tabs-css-contract.md`

Defines the CSS class interface and styling requirements:
- CSS classes and their purposes
- CSS variables integration
- Responsive design breakpoints
- Transitions and animations
- Accessibility requirements
- Progressive enhancement

### 4. `tabs-data-schema.json`

JSON schema for the `_data/tabs.yml` data file:
- Required and optional fields
- Field types and constraints
- Validation rules
- Examples
- Alignment with standardized site data schema

## Contract Compliance

All implementations must adhere to these contracts to ensure:
- **Consistency**: Same interface across all uses
- **Maintainability**: Clear expectations for future changes
- **Testability**: Contracts define testable interfaces
- **Documentation**: Contracts serve as living documentation

## Versioning

Contracts are versioned independently. Breaking changes require:
1. Version bump
2. Migration guide
3. Deprecation notice (if applicable)

Current version: **1.0** (all contracts)

## Related Documentation

- **Data Model**: See `../data-model.md` for entity relationships and validation
- **Research**: See `../research.md` for technical decisions and rationale
- **Quickstart**: See `../quickstart.md` for implementation guide

