# Quickstart: Multi-Tab Interface Layout

**Feature**: 005-multi-tab-layout  
**Date**: 2024-12-19

## Overview

This guide provides step-by-step instructions for implementing the multi-tab interface layout component. Follow these steps to add the reusable tab component to your Jekyll site.

## Prerequisites

- Jekyll site with `_data/` directory
- Access to `_includes/` directory (create if needed)
- Access to `assets/css/main.css` for styling
- Basic understanding of Liquid templating

## Implementation Steps

### Step 1: Create Data File

Create `_data/tabs.yml` with your tab data:

```yaml
---
- id: overview
  name: Overview
  description: |
    This is the overview tab content.
    
    It supports **markdown** formatting.

- id: features
  name: Features
  description: |
    ## Features
    
    - Feature 1
    - Feature 2
    - Feature 3

- id: contact
  name: Contact
  description: |
    Get in touch with us!
    
    Email: contact@example.com
```

**Required Fields**:
- `id`: URL-safe unique identifier (e.g., "overview", "features")
- `name`: Display title for tab button
- `description`: Content shown when tab is active (supports markdown)

**Optional Fields**: `url`, `logo`, `tags`, `status`, `featured`, `category`, `repo`, `contact`, `year`

See `contracts/tabs-data-schema.json` for complete schema.

### Step 2: Create Include File

Create `_includes/tabs.html`:

```liquid
{% if site.data.tabs and site.data.tabs.size > 0 %}
<div class="tabs-container" role="region" aria-label="Tabbed content">
  <!-- Tab Navigation -->
  <div class="tabs-nav" role="tablist" aria-label="Tabs">
    {% for tab in site.data.tabs %}
      {% if tab.id and tab.name %}
        <button 
          class="tab-button{% if forloop.first %} active{% endif %}" 
          role="tab" 
          id="tab-{{ tab.id }}" 
          aria-selected="{% if forloop.first %}true{% else %}false{% endif %}" 
          aria-controls="tabpanel-{{ tab.id }}"
          tabindex="{% if forloop.first %}0{% else %}-1{% endif %}">
          {{ tab.name }}
        </button>
      {% endif %}
    {% endfor %}
  </div>
  
  <!-- Tab Content -->
  <div class="tabs-content">
    {% for tab in site.data.tabs %}
      {% if tab.id and tab.name %}
        <div 
          class="tab-panel{% if forloop.first %} active{% endif %}" 
          role="tabpanel" 
          id="tabpanel-{{ tab.id }}" 
          aria-labelledby="tab-{{ tab.id }}"
          tabindex="0">
          {% if tab.description %}
            {{ tab.description | markdownify }}
          {% else %}
            <p>No content available.</p>
          {% endif %}
        </div>
      {% endif %}
    {% endfor %}
  </div>
</div>

<!-- JavaScript for Tab Switching -->
<script>
(function() {
  'use strict';
  
  function initializeTabs() {
    const tabsNav = document.querySelector('.tabs-nav');
    if (!tabsNav) return;
    
    // Mark as JS-enabled for progressive enhancement
    document.documentElement.classList.add('js-enabled');
    
    // Set first tab as active if none active
    const activeButton = tabsNav.querySelector('.tab-button.active');
    if (!activeButton) {
      const firstButton = tabsNav.querySelector('.tab-button');
      if (firstButton) {
        switchTab(firstButton.id.replace('tab-', ''));
      }
    }
    
    // Attach event listener
    tabsNav.addEventListener('click', handleTabClick);
    
    // Keyboard navigation
    tabsNav.addEventListener('keydown', handleKeyDown);
  }
  
  function handleTabClick(event) {
    const button = event.target.closest('.tab-button');
    if (!button || button.classList.contains('active')) return;
    
    const tabId = button.id.replace('tab-', '');
    switchTab(tabId);
  }
  
  function handleKeyDown(event) {
    const button = event.target.closest('.tab-button');
    if (!button) return;
    
    let targetButton = null;
    const buttons = Array.from(button.parentElement.querySelectorAll('.tab-button'));
    const currentIndex = buttons.indexOf(button);
    
    switch(event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        targetButton = buttons[currentIndex - 1] || buttons[buttons.length - 1];
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        targetButton = buttons[currentIndex + 1] || buttons[0];
        break;
      case 'Home':
        event.preventDefault();
        targetButton = buttons[0];
        break;
      case 'End':
        event.preventDefault();
        targetButton = buttons[buttons.length - 1];
        break;
    }
    
    if (targetButton) {
      targetButton.focus();
      switchTab(targetButton.id.replace('tab-', ''));
    }
  }
  
  function switchTab(tabId) {
    // Remove active state from all tabs
    const allButtons = document.querySelectorAll('.tab-button');
    const allPanels = document.querySelectorAll('.tab-panel');
    
    allButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
      btn.setAttribute('tabindex', '-1');
    });
    
    allPanels.forEach(panel => {
      panel.classList.remove('active');
    });
    
    // Set new active tab
    const button = document.getElementById('tab-' + tabId);
    const panel = document.getElementById('tabpanel-' + tabId);
    
    if (button && panel) {
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      button.setAttribute('tabindex', '0');
      panel.classList.add('active');
    }
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTabs);
  } else {
    initializeTabs();
  }
})();
</script>
{% endif %}
```

### Step 3: Add CSS Styles

Add the following styles to `assets/css/main.css`:

```css
/* Tabs Container */
.tabs-container {
  margin: 2rem 0;
}

/* Tab Navigation */
.tabs-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  border-bottom: 2px solid var(--border);
  margin-bottom: 1.5rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* Tab Button */
.tab-button {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  color: var(--text-muted);
  font-family: var(--font-base);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;
  min-height: 44px;
  white-space: nowrap;
  flex-shrink: 0;
}

.tab-button:hover {
  color: var(--primary);
}

.tab-button:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: var(--radius);
}

.tab-button.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
  font-weight: 600;
}

/* Tab Content */
.tabs-content {
  padding: 1.5rem 0;
}

/* Tab Panel */
.tab-panel {
  display: block; /* Default: all visible (progressive enhancement) */
}

/* JavaScript enhancement: Hide inactive panels */
.js-enabled .tab-panel:not(.active) {
  display: none;
}

.js-enabled .tab-panel.active {
  display: block;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .tabs-nav {
    gap: 0.25rem;
  }
  
  .tab-button {
    padding: 0.625rem 1rem;
    font-size: 0.9rem;
  }
}
```

### Step 4: Use the Component

Include the tabs component in any page or layout:

**In a Markdown page**:
```markdown
---
layout: default
title: My Page
---

# My Page

{% include tabs.html %}

More content below...
```

**In a Liquid layout**:
```liquid
<section id="tabs-section">
  {% include tabs.html %}
</section>
```

## Testing

### Manual Testing Checklist

- [ ] Tabs display correctly on page load
- [ ] First tab is active by default
- [ ] Clicking tabs switches active state
- [ ] Only one tab is active at a time
- [ ] Active tab is visually distinct
- [ ] Transitions are smooth (< 300ms)
- [ ] Works on mobile devices (responsive)
- [ ] Works with keyboard navigation (arrow keys, Home, End)
- [ ] Works with screen readers (test with NVDA/JAWS/VoiceOver)
- [ ] All content visible when JavaScript is disabled

### Browser Testing

Test in:
- Chrome (desktop and mobile)
- Firefox (desktop and mobile)
- Safari (desktop and mobile)
- Edge

### Accessibility Testing

- [ ] Tab navigation works with keyboard only
- [ ] Screen reader announces tab state changes
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA standards
- [ ] Touch targets are at least 44x44px on mobile

## Troubleshooting

### Tabs Not Displaying

**Issue**: Tabs don't appear on page.

**Solutions**:
1. Check that `_data/tabs.yml` exists and has valid YAML
2. Verify tabs have required fields (`id`, `name`, `description`)
3. Check for YAML syntax errors
4. Ensure `{% include tabs.html %}` is in the correct location

### Tabs Not Switching

**Issue**: Clicking tabs doesn't change active state.

**Solutions**:
1. Check browser console for JavaScript errors
2. Verify JavaScript is enabled in browser
3. Ensure `.tabs-nav` element exists in DOM
4. Check that tab IDs are unique and valid

### Styling Issues

**Issue**: Tabs don't look right or aren't responsive.

**Solutions**:
1. Verify CSS is added to `assets/css/main.css`
2. Check CSS variables are defined (`--primary`, `--border`, etc.)
3. Test responsive breakpoints
4. Check for CSS conflicts with existing styles

### Accessibility Issues

**Issue**: Screen readers don't work correctly or keyboard navigation fails.

**Solutions**:
1. Verify ARIA attributes are present (`role`, `aria-selected`, etc.)
2. Test with actual screen reader (NVDA, JAWS, VoiceOver)
3. Check keyboard event handlers are attached
4. Verify focus management (tabindex attributes)

## Next Steps

1. **Customize Styling**: Adjust colors, spacing, and transitions to match your site design
2. **Add More Tabs**: Add additional tabs to `_data/tabs.yml`
3. **Extend Functionality**: Add features like URL hash support, tab persistence, etc.
4. **Optimize**: Review performance and optimize if needed

## Related Documentation

- **Data Model**: See `data-model.md` for entity relationships
- **Contracts**: See `contracts/` directory for API specifications
- **Research**: See `research.md` for technical decisions
- **Specification**: See `spec.md` for complete requirements

## Support

For issues or questions:
1. Check troubleshooting section above
2. Review contract documentation
3. Verify implementation matches examples
4. Check browser console for errors

