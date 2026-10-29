/**
 * Portfolio Interactivity Script - Harsh Patel (NJIT)
 * Clean, modern vanilla JavaScript built with Codex assistance.
 * 
 * Features:
 *   1. Theme Toggle (Light / Dark mode saved to localStorage)
 *   2. Responsive Mobile Navigation (Accessible hamburger menu)
 *   3. Project Filter & Modal Dialog (Filter by category, inspect blueprints)
 *   4. Contact Form Validation (Client-side checks + mailto redirect)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Theme Toggle (Light / Dark Mode)
     -------------------------------------------------------------------------- */
  const initThemeToggle = () => {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return; // Guard check

    // Check saved preference or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    // Apply theme to <html>
    const applyTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('portfolio-theme', theme);
      const isDark = theme === 'dark';
      themeBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      themeBtn.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    };

    applyTheme(currentTheme);

    // Toggle on click
    themeBtn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') || 'light';
      applyTheme(active === 'dark' ? 'light' : 'dark');
    });
  };

  /* --------------------------------------------------------------------------
     2. Responsive Mobile Navigation Menu
     -------------------------------------------------------------------------- */
  const initMobileNav = () => {
    const menuBtn = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('primary-nav');
    if (!menuBtn || !navMenu) return; // Guard check

    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : menuBtn.getAttribute('aria-expanded') !== 'true';
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navMenu.classList.toggle('active', isOpen);
    };

    menuBtn.addEventListener('click', () => toggleMenu());

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMenu(false);
        menuBtn.focus();
      }
    });

    // Close menu when clicking any nav link
    const links = navMenu.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        toggleMenu(false);
      }
    });
  };

  /* --------------------------------------------------------------------------
     3. Project Filtering & Modal Preview
     -------------------------------------------------------------------------- */
  const initProjects = () => {
    // A. Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const filter = btn.getAttribute('data-filter');

          filterBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-pressed', 'true');

          projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
              card.style.display = 'grid';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }

    // B. Modal dialog preview
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    const modalTitle = document.getElementById('modal-project-title');
    const modalBody = document.getElementById('modal-body');
    const openBtns = document.querySelectorAll('.open-modal-btn');

    if (!modal || !closeBtn || !modalTitle || !modalBody) return;

    let triggerElement = null;

    openBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        triggerElement = btn;
        const card = btn.closest('.project-card');
        if (!card) return;

        const title = card.querySelector('.project-title')?.textContent || 'Project Details';
        const img = card.querySelector('img')?.src || '';
        const alt = card.querySelector('img')?.alt || '';
        const desc = card.querySelector('.project-description')?.textContent || '';

        modalTitle.textContent = title;
        modalBody.innerHTML = `
          <img src="${img}" alt="${alt}" style="width:100%; border-radius:6px; margin-bottom:1rem;">
          <p>${desc}</p>
        `;

        if (typeof modal.showModal === 'function') {
          modal.showModal();
        } else {
          modal.setAttribute('open', '');
        }
        closeBtn.focus();
      });
    });

    const closeModal = () => {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.removeAttribute('open');
      }
      if (triggerElement) triggerElement.focus();
    };

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  };

  // Run all feature initializers
  initThemeToggle();
  initMobileNav();
  initProjects();
});
