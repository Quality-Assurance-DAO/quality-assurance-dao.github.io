# Contracts Directory

This directory contains API contracts and interface specifications for the interactive network graph service card components.

## Contract Files

### 1. `service-card-include-contract.md`

Defines the Jekyll Liquid include interface for service cards:
- How to use the service card includes (`{% include governance_graph.html %}`, etc.)
- Output HTML structure
- Canvas ID generation and uniqueness
- Progressive enhancement behavior
- Usage examples

### 2. `network-graph-function-api.md`

Defines the JavaScript network graph function API:
- `createInteractiveNetwork()` function signature and parameters
- Function initialization and lifecycle
- Animation loop implementation
- Node and connection rendering
- Mouse interaction handling
- Canvas resizing and position scaling
- Event handling (mousemove, mouseleave, resize)
- Performance optimization techniques
- Browser compatibility

### 3. `css-styling-contract.md`

Defines the CSS styling interface:
- CSS classes and their purposes
- Inline styles within includes
- Service card wrapper styling
- Canvas styling
- Typography and spacing
- Responsive design requirements
- Progressive enhancement styles
- Visual styling guidelines

## Contract Compliance

All implementations must adhere to these contracts to ensure:
- **Consistency**: Same interface across all service card uses
- **Maintainability**: Clear expectations for future changes
- **Testability**: Contracts define testable interfaces
- **Documentation**: Contracts serve as living documentation
- **Performance**: Contracts specify performance requirements
- **Accessibility**: Contracts ensure progressive enhancement
- **Code Reuse**: Shared function contract ensures proper reuse across cards

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

