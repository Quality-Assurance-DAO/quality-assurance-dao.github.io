# Quickstart: Modern Design Enhancement

**Date**: 2024-12-19  
**Feature**: 003-design-enhancement

## Overview

This quickstart guide provides step-by-step instructions for implementing the modern design enhancement feature. The implementation is divided into logical phases that can be completed incrementally.

## Prerequisites

- Jekyll site running locally (or GitHub Pages)
- Access to `_layouts/default.html`
- Access to `assets/css/main.css`
- Ability to create new JavaScript file in `assets/js/`
- Modern browser for testing (Chrome, Firefox, Safari, or Edge)

## Implementation Phases

### Phase 1: Typography & Spacing (30 minutes)

#### Step 1.1: Add Space Grotesk Font

**File**: `assets/css/main.css`

Add at the top of the file (before `:root`):

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');
```

#### Step 1.2: Update Font Variables

**File**: `assets/css/main.css`

Update the `:root` section:

```css
:root {
  /* ... existing variables ... */
  --font-base: 'Space Grotesk', 'Inter', 'Noto Sans', Arial, sans-serif;
  --max-width: 1152px; /* Updated from 1000px */
  /* ... rest of variables ... */
}
```

#### Step 1.3: Update Section Padding

**File**: `assets/css/main.css`

Update section padding:

```css
.section {
  padding: 5rem 0; /* Updated from 4rem */
  border-bottom: 1px solid var(--border);
}
```

Add mobile padding:

```css
@media (max-width: 768px) {
  .section {
    padding: 3rem 0; /* Mobile padding */
  }
}
```

**Test**: View site, verify font has changed and spacing is increased.

---

### Phase 2: Hero Section CTA (15 minutes)

#### Step 2.1: Add CTA Button to Hero

**File**: `_layouts/default.html`

Find the hero section (around line 18-27) and add the button:

```html
<header class="hero">
  <div class="container">
    {% if site.logo %}
      <img src="{{ site.logo | relative_url }}" alt="{{ site.title }} logo" class="hero-logo" loading="lazy">
    {% endif %}
    <h1>{{ site.title }}</h1>
    <p class="tagline">{{ site.description }}</p>
    <a href="#services" class="btn-primary btn-hero">Learn More</a>
  </div>
</header>
```

#### Step 2.2: Style Hero Button

**File**: `assets/css/main.css`

Add after existing `.btn-primary` styles:

```css
.btn-hero {
  margin-top: 2rem;
  padding: 0.875rem 2rem;
  font-size: 1.125rem;
  box-shadow: 0 4px 6px rgba(0, 82, 204, 0.2);
}
```

**Test**: View hero section, verify button appears and links to services section.

---

### Phase 3: Theme System (2-3 hours)

#### Step 3.1: Add Theme CSS Variables

**File**: `assets/css/main.css`

Replace the `:root` section with comprehensive theme variables:

```css
/* Light theme (default) */
:root {
  /* Base colors */
  --bg: #ffffff;
  --bg-secondary: #f6f7f8;
  --text: #1a1a1a;
  --text-muted: #555555;
  --border: #e0e0e0;
  
  /* Primary colors */
  --primary: #0052cc;
  --primary-light: #e6f0ff;
  --primary-dark: #003d99;
  
  /* Card colors */
  --card-bg: #e6f0ff;
  --card-border: #e0e0e0;
  --card-hover: #d0e0ff;
  
  /* Hero */
  --hero-bg: linear-gradient(180deg, #0052cc 0%, #003d99 100%);
  --hero-text: #ffffff;
  
  /* Navigation */
  --nav-bg: rgba(255, 255, 255, 0.95);
  --nav-text: #1a1a1a;
  --nav-border: #e0e0e0;
  
  /* Design tokens */
  --radius: 10px;
  --max-width: 1152px;
  --section-padding: 5rem;
  --section-padding-mobile: 3rem;
  --font-base: 'Space Grotesk', 'Inter', 'Noto Sans', Arial, sans-serif;
}
```

#### Step 3.2: Add Dark Theme Variables

**File**: `assets/css/main.css`

Add after `:root`:

```css
/* Dark theme */
[data-theme="dark"],
body.dark-theme {
  /* Base colors */
  --bg: #121212;
  --bg-secondary: #1a1a1a;
  --text: #e0e0e0;
  --text-muted: #b0b0b0;
  --border: #333333;
  
  /* Primary colors */
  --primary: #00BFFF;
  --primary-light: #003d4d;
  --primary-dark: #0099cc;
  
  /* Card colors */
  --card-bg: #1a1a1a;
  --card-border: #333333;
  --card-hover: #252525;
  
  /* Hero */
  --hero-bg: linear-gradient(180deg, #001a33 0%, #000d1a 100%);
  --hero-text: #ffffff;
  
  /* Navigation */
  --nav-bg: rgba(18, 18, 18, 0.95);
  --nav-text: #e0e0e0;
  --nav-border: #333333;
}
```

#### Step 3.3: Add System Preference Support

**File**: `assets/css/main.css`

Add after dark theme:

```css
/* Respect system preference on initial load */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #121212;
    --bg-secondary: #1a1a1a;
    --text: #e0e0e0;
    --text-muted: #b0b0b0;
    --border: #333333;
    --primary: #00BFFF;
    --primary-light: #003d4d;
    --primary-dark: #0099cc;
    --card-bg: #1a1a1a;
    --card-border: #333333;
    --card-hover: #252525;
    --hero-bg: linear-gradient(180deg, #001a33 0%, #000d1a 100%);
    --hero-text: #ffffff;
    --nav-bg: rgba(18, 18, 18, 0.95);
    --nav-text: #e0e0e0;
    --nav-border: #333333;
  }
}
```

#### Step 3.4: Update Existing CSS to Use Variables

**File**: `assets/css/main.css`

Ensure all hardcoded colors are replaced with variables. Key areas to check:
- `.hero` background → `var(--hero-bg)`
- `.data-card` background → `var(--card-bg)`
- All text colors → `var(--text)` or `var(--text-muted)`
- All borders → `var(--border)`

#### Step 3.5: Create Theme Toggle JavaScript

**File**: `assets/js/theme-toggle.js` (create new file)

```javascript
(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Get saved theme or default to system preference
  function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  }
  
  // Apply theme
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // Also add class for backwards compatibility
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
  
  // Initialize theme
  const initialTheme = getInitialTheme();
  setTheme(initialTheme);
  
  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }
  
  // Listen for system theme changes (optional)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    // Only auto-switch if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
})();
```

#### Step 3.6: Add Theme Toggle Button Styles

**File**: `assets/css/main.css`

Add at the end:

```css
/* Theme Toggle Button */
.theme-toggle {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  position: relative;
}

.theme-toggle:hover {
  background: var(--bg-secondary);
  border-color: var(--primary);
}

.theme-toggle:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.theme-icon {
  position: absolute;
  font-size: 1.25rem;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.theme-icon-light {
  opacity: 1;
  transform: rotate(0deg);
}

.theme-icon-dark {
  opacity: 0;
  transform: rotate(180deg);
}

[data-theme="dark"] .theme-icon-light,
body.dark-theme .theme-icon-light {
  opacity: 0;
  transform: rotate(-180deg);
}

[data-theme="dark"] .theme-icon-dark,
body.dark-theme .theme-icon-dark {
  opacity: 1;
  transform: rotate(0deg);
}
```

#### Step 3.7: Add Theme Toggle Button to Layout

**File**: `_layouts/default.html`

Add script reference in `<head>` (before closing `</head>`):

```html
<script src="{{ '/assets/js/theme-toggle.js' | relative_url }}" defer></script>
```

Add theme toggle button. Since there's no navigation yet, add it to the hero section temporarily (we'll move it in Phase 4):

```html
<header class="hero">
  <div class="container">
    <button 
      id="theme-toggle" 
      class="theme-toggle" 
      aria-label="Toggle dark mode"
      title="Toggle dark/light theme"
      style="position: absolute; top: 1rem; right: 1rem;">
      <span class="theme-icon theme-icon-light">☀️</span>
      <span class="theme-icon theme-icon-dark">🌙</span>
    </button>
    <!-- ... rest of hero content ... -->
  </div>
</header>
```

**Test**: 
1. Click theme toggle button
2. Verify theme switches instantly
3. Reload page, verify theme persists
4. Test in both light and dark themes

---

### Phase 4: Sticky Navigation (1-2 hours)

#### Step 4.1: Convert Header to Sticky Navigation

**File**: `_layouts/default.html`

Replace the hero `<header>` with a sticky navigation structure:

```html
<!-- STICKY NAVIGATION -->
<header class="sticky-nav">
  <nav class="container nav-container">
    <a href="#home" class="logo-link">
      {% if site.logo %}
        <img src="{{ site.logo | relative_url }}" alt="{{ site.title }}" class="nav-logo">
      {% endif %}
      <span class="nav-title">{{ site.title }}</span>
    </a>
    <div class="nav-links">
      <a href="#about">About</a>
      <a href="#services">Services</a>
      <a href="#portfolio">Projects</a>
      <a href="#contact">Contact</a>
      <button 
        id="theme-toggle" 
        class="theme-toggle" 
        aria-label="Toggle dark mode"
        title="Toggle dark/light theme">
        <span class="theme-icon theme-icon-light">☀️</span>
        <span class="theme-icon theme-icon-dark">🌙</span>
      </button>
    </div>
  </nav>
</header>

<!-- HERO SECTION -->
<header class="hero" id="home">
  <div class="container">
    {% if site.logo %}
      <img src="{{ site.logo | relative_url }}" alt="{{ site.title }} logo" class="hero-logo" loading="lazy">
    {% endif %}
    <h1>{{ site.title }}</h1>
    <p class="tagline">{{ site.description }}</p>
    <a href="#services" class="btn-primary btn-hero">Learn More</a>
  </div>
</header>
```

#### Step 4.2: Add Sticky Navigation Styles

**File**: `assets/css/main.css`

Add navigation styles:

```css
/* Sticky Navigation */
.sticky-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--nav-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--nav-border);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--nav-text);
  font-weight: 600;
}

.nav-logo {
  height: 2rem;
  width: auto;
}

.nav-title {
  font-size: 1.25rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-links a {
  color: var(--nav-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: var(--primary);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
```

#### Step 4.3: Add Mobile Navigation (Optional)

**File**: `assets/css/main.css`

Add responsive styles:

```css
@media (max-width: 768px) {
  .nav-links {
    gap: 1rem;
  }
  
  .nav-links a {
    font-size: 0.9rem;
  }
  
  .nav-title {
    font-size: 1rem;
  }
}
```

**Test**:
1. Scroll page, verify navigation stays sticky
2. Click navigation links, verify smooth scroll
3. Test theme toggle in navigation
4. Test on mobile devices

---

### Phase 5: Optional Values Section (30 minutes)

#### Step 5.1: Create Values Data File (Optional)

**File**: `_data/values.yml` (create if content available)

```yaml
- title: "Radical Transparency"
  description: "Open processes and clear communication in everything we do."
  icon: "👁️"
  order: 1

- title: "Quality First"
  description: "We prioritize quality and excellence in all our work."
  icon: "⭐"
  order: 2

- title: "Community Driven"
  description: "Building solutions that serve and empower communities."
  icon: "🤝"
  order: 3
```

#### Step 5.2: Add Values Section to Layout

**File**: `_layouts/default.html`

Add after Services section (around line 75):

```html
<!-- VALUES SECTION (Optional) -->
{% if site.data.values %}
<section id="values" class="section values">
  <div class="container">
    <h2>Our Values</h2>
    <div class="data-grid">
      {% for value in site.data.values %}
        <article class="data-card">
          <div class="value-icon">{{ value.icon }}</div>
          <h3>{{ value.title }}</h3>
          <p>{{ value.description }}</p>
        </article>
      {% endfor %}
    </div>
  </div>
</section>
{% endif %}
```

#### Step 5.3: Style Values Section

**File**: `assets/css/main.css`

Add:

```css
.value-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
}
```

**Test**: Verify Values section appears if data file exists, matches design system.

---

## Testing Checklist

### Visual Testing
- [ ] Typography updated to Space Grotesk
- [ ] Container width increased to 1152px
- [ ] Section padding increased
- [ ] Hero CTA button appears and works
- [ ] Theme toggle button appears
- [ ] Light theme displays correctly
- [ ] Dark theme displays correctly
- [ ] Sticky navigation works
- [ ] Navigation links scroll smoothly
- [ ] Values section appears (if data file exists)

### Functional Testing
- [ ] Theme toggle switches themes instantly
- [ ] Theme preference persists across page reloads
- [ ] System preference detected on first visit
- [ ] Manual theme selection overrides system preference
- [ ] All navigation links work
- [ ] Hero CTA links to services section
- [ ] All data sections display correctly (services, projects, gitbooks, organizations)

### Accessibility Testing
- [ ] Theme toggle is keyboard accessible (Tab, Enter, Space)
- [ ] Focus indicators visible in both themes
- [ ] Color contrast meets WCAG AA in light theme
- [ ] Color contrast meets WCAG AA in dark theme
- [ ] ARIA labels present on theme toggle
- [ ] Screen reader announces theme changes

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Responsive Testing
- [ ] 320px width (mobile)
- [ ] 768px width (tablet)
- [ ] 1024px width (desktop)
- [ ] 1440px width (large desktop)
- [ ] 2560px width (ultra-wide)

---

## Troubleshooting

### Theme Not Persisting
**Issue**: Theme resets on page reload

**Solution**: 
- Check browser console for localStorage errors
- Verify `theme-toggle.js` is loaded (check Network tab)
- Check if browser blocks localStorage (private browsing mode)

### Theme Toggle Not Working
**Issue**: Clicking toggle doesn't change theme

**Solution**:
- Verify `#theme-toggle` element exists in DOM
- Check browser console for JavaScript errors
- Verify `theme-toggle.js` is loaded before DOMContentLoaded

### Colors Not Changing
**Issue**: Theme toggle works but colors don't change

**Solution**:
- Verify CSS variables are defined for both themes
- Check that `data-theme` attribute is being set on `<html>`
- Verify all color properties use CSS variables (no hardcoded colors)

### Navigation Not Sticky
**Issue**: Navigation scrolls with page

**Solution**:
- Verify `.sticky-nav` has `position: sticky`
- Check that parent elements don't have `overflow: hidden`
- Verify `z-index` is set appropriately

---

## Next Steps

After completing implementation:

1. **Code Review**: Review all changes for consistency
2. **Accessibility Audit**: Run automated accessibility tools
3. **Performance Check**: Verify page load performance
4. **User Testing**: Get feedback on theme toggle and navigation
5. **Documentation**: Update any relevant documentation

---

## Resources

- [Research Document](./research.md) - Detailed design decisions
- [Data Model](./data-model.md) - Data structure documentation
- [Contracts](./contracts/) - API and schema contracts
- [Design Recommendations](../../DESIGN_INTEGRATION_RECOMMENDATIONS.md) - Original design document

---

## Support

For questions or issues:
1. Check the [research.md](./research.md) for design rationale
2. Review [contracts](./contracts/) for API details
3. Check browser console for errors
4. Verify all files are in correct locations

