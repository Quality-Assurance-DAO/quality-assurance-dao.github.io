(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Get saved theme or default to dark mode
  function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Default to dark mode (can still respect system preference if desired)
    // Uncomment the line below to respect system preference instead:
    // return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return 'dark';
  }
  
  // Apply theme
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // localStorage unavailable (private browsing, etc.)
      // Theme still works, just doesn't persist
    }
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
    
    // Support keyboard activation
    themeToggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
      }
    });
  }
  
  // Listen for system theme changes (optional)
  // Note: With dark mode as default, this is disabled to maintain dark mode preference
  // Uncomment below to enable system preference following:
  // if (window.matchMedia) {
  //   window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
  //     // Only auto-switch if user hasn't manually set a preference
  //     if (!localStorage.getItem('theme')) {
  //       setTheme(e.matches ? 'dark' : 'light');
  //     }
  //   });
  // }
  
  // Mobile navigation toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.setAttribute('data-visible', !isExpanded);
    });
    
    // Close menu when clicking a link
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('data-visible', 'false');
      });
    });
  }
})();

