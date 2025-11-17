# Component Contracts

**Version**: 1.0  
**Date**: 2025-01-27

## Overview

Component contracts define the structure, behavior, and styling requirements for reusable UI components in the redesigned site.

## Navigation Header

### Structure
```html
<header class="sticky-nav">
  <nav class="container nav-container">
    <a href="#home" class="logo-link">
      <img src="{{ site.logo }}" alt="{{ site.title }}" class="nav-logo">
      <span class="nav-title">{{ site.title }}</span>
    </a>
    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
      <!-- Hamburger icon -->
    </button>
    <div class="nav-links" id="nav-links">
      <a href="#about">About</a>
      <a href="#services">Services</a>
      <a href="#portfolio">Projects</a>
      <a href="#contact">Follow Us</a>
      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
        <!-- Theme icons -->
      </button>
    </div>
  </nav>
</header>
```

### Requirements
- Sticky positioning (fixed to top on scroll)
- Responsive: hamburger menu on mobile, full menu on desktop
- Logo display: image if available, fallback to text
- Theme toggle button included in navigation
- Smooth scroll to sections
- Accessible: keyboard navigation, ARIA labels

### Styling
- Height: `--nav-height` (64px)
- Background: `--nav-bg` with transparency/backdrop blur
- Text: `--nav-text` color
- Logo: Max height 40px
- Links: Hover states, active states
- Mobile menu: Slide-in or dropdown animation

---

## Hero Section

### Structure
```html
<section id="home" class="hero-section">
  {% include animated-header.html title="Decentralised Assurance of Quality" %}
</section>
```

### Requirements
- Full-width section
- Animated header text (from existing include)
- Background: gradient or solid color (theme-aware)
- Text: Centered, large typography
- Responsive: Adapts to mobile/tablet/desktop

### Styling
- Background: `--hero-bg` gradient or color
- Text color: `--hero-text` (typically white or theme-aware)
- Padding: `--section-padding-y`
- Typography: Large heading (h1), clamp() for responsive sizing

---

## Video Carousel

### Structure
```html
<section class="video-carousel-section">
  <div class="video-carousel" id="video-carousel">
    {% for slide in site.data.slides %}
      <a href="{{ slide.cta_link | default: slide.section_link }}" class="video-slide">
        <video src="{{ slide.video }}" poster="{{ slide.poster }}" class="carousel-video">
          <!-- Fallback content -->
        </video>
        <div class="carousel-overlay">
          <h3 class="carousel-headline">{{ slide.headline }}</h3>
        </div>
      </a>
    {% endfor %}
  </div>
</section>
```

### Requirements
- Auto-playing carousel with slides from `site.data.slides`
- Clickable videos: Navigate to `cta_link` or `section_link` when clicked
- No CTA buttons displayed (video itself is clickable)
- Smooth transitions between slides
- Video poster images as fallback
- Responsive: Adapts height for mobile/desktop
- Accessible: Keyboard navigation, ARIA labels

### Styling
- Height: `--carousel-height` (600px desktop, 400px mobile)
- Overlay: Semi-transparent background for text readability
- Headline: Large, centered text
- Video: Cover object-fit, muted, autoplay, loop
- Transitions: Smooth fade or slide between slides

---

## Services Grid

### Structure
```html
<section id="services" class="section services">
  <div class="container">
    <h2>Our Services</h2>
    <div class="data-grid">
      {% for service in site.data.services %}
        <article class="data-card service-card" id="service-{{ service.id }}">
          {% if service.logo or service.icon %}
            <div class="service-visual">
              <!-- Logo or icon -->
            </div>
          {% endif %}
          <h3>{{ service.name }}</h3>
          <p>{{ service.description }}</p>
          {% if service.url %}
            <a href="{{ service.url }}" class="service-link">Learn more</a>
          {% endif %}
          {% if service.tags %}
            <div class="data-card-tags">
              <!-- Tags -->
            </div>
          {% endif %}
        </article>
      {% endfor %}
    </div>
  </div>
</section>
```

### Requirements
- Grid layout: Responsive columns (1 mobile, 2 tablet, 3 desktop)
- Cards: Consistent styling, hover effects
- Optional fields: Logo/icon, URL, tags, featured badge
- Color coding: Use `service.color` if available
- Accessible: Keyboard navigation, semantic HTML

### Styling
- Grid: CSS Grid with `repeat(auto-fit, minmax(300px, 1fr))`
- Card: `--card-*` variables for styling
- Hover: Elevation change, color transition
- Tags: Small badges with theme-aware colors

---

## Partners Section

### Structure
```html
<section id="partners" class="section partners">
  <div class="container">
    <h2>We work with</h2>
    <div class="data-grid">
      {% for partner in site.data.partners %}
        <article class="data-card partner-card" id="partner-{{ partner.id }}">
          <a href="{{ partner.url }}" class="data-card-link" target="_blank" rel="noopener noreferrer">
            {% if partner.logo %}
              <img src="{{ partner.logo }}" alt="{{ partner.name }} logo" class="data-card-logo">
            {% endif %}
            <h3>{{ partner.name }}</h3>
            <p>{{ partner.description }}</p>
            {% if partner.tags %}
              <div class="data-card-tags">
                <!-- Tags -->
              </div>
            {% endif %}
          </a>
        </article>
      {% endfor %}
    </div>
  </div>
</section>
```

### Requirements
- Grid layout: Similar to services
- External links: `target="_blank" rel="noopener noreferrer"`
- Logo display: Partner logos with consistent sizing
- Optional fields: Tags, year, featured badge
- Accessible: Link descriptions, keyboard navigation

### Styling
- Logo: Max height/width constraints, object-fit contain
- Cards: Similar to service cards
- Links: Full card clickable area
- Hover: Subtle elevation or color change

---

## Projects Section

### Structure
```html
<section id="portfolio" class="section portfolio">
  <div class="container">
    <h2>Recent Projects</h2>
    <div class="data-grid">
      {% for project in site.data.projects %}
        <article class="data-card project-card" id="project-{{ project.id }}">
          <a href="{{ project.url }}" class="data-card-link">
            {% if project.logo %}
              <img src="{{ project.logo }}" alt="{{ project.name }} logo" class="data-card-logo">
            {% endif %}
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
            {% if project.tags %}
              <div class="data-card-tags">
                <!-- Tags -->
              </div>
            {% endif %}
          </a>
        </article>
      {% endfor %}
    </div>
  </div>
</section>
```

### Requirements
- Grid layout: Similar to services/partners
- External links: To project repositories/websites
- Optional fields: Logo, tags, featured badge, year
- Accessible: Link descriptions, keyboard navigation

### Styling
- Similar to partners section
- Project-specific styling if needed (e.g., GitHub icon indicator)

---

## About Section

### Structure
```html
<section id="about" class="section about">
  <div class="container">
    <h2>About Us</h2>
    <p>{{ site.about_text | default: "Default about text..." }}</p>
  </div>
</section>
```

### Requirements
- Simple text section
- Content from `_config.yml` or default text
- Responsive typography
- Accessible: Semantic HTML

### Styling
- Centered or left-aligned text
- Max width for readability
- Typography: `--font-size-lg` or similar

---

## Follow Us / Contact Section

### Structure
```html
<section id="contact" class="section contact">
  <div class="container">
    <h2>Follow Us</h2>
    <div class="data-grid">
      {% if site.x_handle %}
        <article class="data-card">
          <a href="{{ site.x_handle }}" class="data-card-link" target="_blank" rel="noopener">
            <img src="/assets/images/social/twitter-icon.svg" alt="X / Twitter icon" class="data-card-logo">
            <h3>X / Twitter</h3>
          </a>
        </article>
      {% endif %}
      <!-- Similar for YouTube, GitHub -->
    </div>
  </div>
</section>
```

### Requirements
- Social media links from `_config.yml`
- External links: `target="_blank" rel="noopener"`
- Icons: SVG icons from assets
- Grid layout: Responsive
- Accessible: Link descriptions, keyboard navigation

### Styling
- Icon sizing: Consistent across social links
- Cards: Similar to other sections
- Hover: Color change or elevation

---

## Theme Toggle Button

### Structure
```html
<button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark/light theme">
  <span class="theme-icon theme-icon-light">☀️</span>
  <span class="theme-icon theme-icon-dark">🌙</span>
</button>
```

### Requirements
- Toggles `data-theme` attribute on `<html>` element
- Persists preference in localStorage
- Smooth transition between themes
- Accessible: Keyboard operable, ARIA labels
- Icon: Shows current theme (opposite icon visible)

### Behavior
- Click: Toggle between "dark" and "light"
- Load: Read from localStorage, apply theme
- Default: "dark" if no preference
- Transition: CSS transition for smooth color changes

### Styling
- Size: Minimum 44x44px touch target
- Icons: Theme-aware visibility
- Position: In navigation header
- Hover: Subtle background change

---

## Common Patterns

### Data Grid
- Class: `.data-grid`
- Layout: CSS Grid, responsive columns
- Gap: `--spacing-lg`
- Responsive: 1 column mobile, 2-3 columns desktop

### Data Card
- Class: `.data-card`
- Styling: `--card-*` variables
- Hover: Elevation change, transition
- Padding: `--card-padding`
- Border radius: `--card-border-radius`

### Container
- Class: `.container`
- Max width: `--container-max-width`
- Padding: Responsive `--container-padding`
- Centered: `margin: 0 auto`

### Section
- Class: `.section`
- Padding: `--section-padding-y` vertical
- Background: Theme-aware
- Spacing: Gap between sections

## Accessibility Requirements

All components must:
- Use semantic HTML elements
- Include ARIA labels where appropriate
- Support keyboard navigation
- Have visible focus states
- Meet WCAG AA contrast requirements
- Have appropriate touch target sizes (44x44px minimum)

