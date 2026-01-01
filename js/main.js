/* =============================================
   ARCH STUDIO - Main JavaScript
   Theme Toggle, Mobile Menu, Filtering
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  initMobileMenu();
  initFilters();
});

/* =============================================
   THEME TOGGLE
   ============================================= */
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const storageKey = 'architecture-theme';
  
  // Get stored theme or detect system preference
  function getTheme() {
    const stored = localStorage.getItem(storageKey);
    if (stored) return stored;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  // Apply theme to document
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(storageKey, theme);
  }
  
  // Toggle theme
  function toggleTheme() {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = current === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }
  
  // Initialize
  applyTheme(getTheme());
  
  // Add click handlers to all theme toggles
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleTheme);
  });
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(storageKey)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

/* =============================================
   MOBILE MENU
   ============================================= */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (!menuBtn || !mobileMenu) return;
  
  menuBtn.addEventListener('click', function() {
    const isOpen = mobileMenu.classList.contains('active');
    
    if (isOpen) {
      mobileMenu.classList.remove('active');
      menuBtn.textContent = '☰';
      menuBtn.setAttribute('aria-expanded', 'false');
    } else {
      mobileMenu.classList.add('active');
      menuBtn.textContent = '✕';
      menuBtn.setAttribute('aria-expanded', 'true');
    }
  });
  
  // Close menu when clicking on links
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      menuBtn.textContent = '☰';
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* =============================================
   FILTER FUNCTIONALITY
   ============================================= */
function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const filterableItems = document.querySelectorAll('[data-category]');
  
  if (filterButtons.length === 0) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.dataset.filter;
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter items
      filterableItems.forEach(item => {
        if (category === 'ALL' || item.dataset.category === category) {
          item.style.display = '';
          // Add fade in animation
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* =============================================
   SMOOTH SCROLL (for anchor links)
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* =============================================
   NEWSLETTER FORM (placeholder)
   ============================================= */
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert('Thank you for subscribing! Email: ' + email);
    this.reset();
  });
});
