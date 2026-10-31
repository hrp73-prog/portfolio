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
     0. Skip Link Keyboard Focus Helper (WCAG Focus Management)
     -------------------------------------------------------------------------- */
  const initSkipLink = () => {
    const skipLink = document.querySelector('.skip-link');
    if (!skipLink) return;

    skipLink.addEventListener('click', (e) => {
      const target = document.getElementById('main-content');
      if (target) {
        e.preventDefault();
        target.focus();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };

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
     2. Responsive Mobile Navigation Menu (With Complete Keyboard Accessibility)
     -------------------------------------------------------------------------- */
  const initMobileNav = () => {
    const menuBtn = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('primary-nav');
    if (!menuBtn || !navMenu) return; // Guard check

    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : menuBtn.getAttribute('aria-expanded') !== 'true';
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navMenu.classList.toggle('active', isOpen);

      if (isOpen) {
        // Shift focus into first nav link for keyboard users
        const firstLink = navMenu.querySelector('.nav-link');
        if (firstLink) {
          setTimeout(() => firstLink.focus(), 50);
        }
      }
    };

    menuBtn.addEventListener('click', () => toggleMenu());

    // Close menu when pressing Escape key and return focus to menu button
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

    // Keyboard focus trap inside mobile drawer
    navMenu.addEventListener('keydown', (e) => {
      if (!navMenu.classList.contains('active') || e.key !== 'Tab') return;
      const navLinks = Array.from(navMenu.querySelectorAll('.nav-link'));
      if (!navLinks.length) return;
      const first = navLinks[0];
      const last = navLinks[navLinks.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        menuBtn.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        menuBtn.focus();
      }
    });
  };

  /* --------------------------------------------------------------------------
     3. Project Filtering & Modal Preview (With Keyboard Arrows & Focus Trap)
     -------------------------------------------------------------------------- */
  const initProjects = () => {
    // A. Filter buttons (with Arrow key keyboard navigation)
    const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
      filterBtns.forEach((btn, index) => {
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

        // Arrow key navigation between filter buttons
        btn.addEventListener('keydown', (e) => {
          let nextIndex = null;
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            nextIndex = (index + 1) % filterBtns.length;
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            nextIndex = (index - 1 + filterBtns.length) % filterBtns.length;
          } else if (e.key === 'Home') {
            nextIndex = 0;
          } else if (e.key === 'End') {
            nextIndex = filterBtns.length - 1;
          }

          if (nextIndex !== null) {
            e.preventDefault();
            filterBtns[nextIndex].focus();
            filterBtns[nextIndex].click();
          }
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

    const closeModal = () => {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.removeAttribute('open');
      }
      if (triggerElement) {
        triggerElement.focus();
      }
    };

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
          <img src="${img}" alt="${alt}" class="modal-preview-img">
          <p>${desc}</p>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary modal-done-btn">Close Preview</button>
          </div>
        `;

        if (typeof modal.showModal === 'function') {
          modal.showModal();
        } else {
          modal.setAttribute('open', '');
        }

        const doneBtn = modalBody.querySelector('.modal-done-btn');
        if (doneBtn) {
          doneBtn.addEventListener('click', closeModal);
        }

        closeBtn.focus();
      });
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Ensure focus is restored to trigger button when modal is closed
    modal.addEventListener('close', () => {
      if (triggerElement) {
        triggerElement.focus();
      }
    });

    modal.addEventListener('cancel', (e) => {
      e.preventDefault();
      closeModal();
    });

    // Trap focus inside modal for keyboard navigation
    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  };

  /* --------------------------------------------------------------------------
     4. Contact Form Validation (With Defensive Guard)
     -------------------------------------------------------------------------- */
  const initContactForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return; // Defensive guard: prevents null errors on non-contact pages!

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const statusBox = document.getElementById('form-status');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    // Simple email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const clearErrors = () => {
      [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
        if (inp) {
          inp.classList.remove('input-error');
          inp.removeAttribute('aria-invalid');
        }
      });
      [nameError, emailError, subjectError, messageError].forEach(span => {
        if (span) span.textContent = '';
      });
      if (statusBox) {
        statusBox.style.display = 'none';
        statusBox.textContent = '';
        statusBox.className = 'form-status';
      }
    };

    // Clear inline error when typing
    [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
      if (!inp) return;
      inp.addEventListener('input', () => {
        inp.classList.remove('input-error');
        inp.removeAttribute('aria-invalid');
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();
      let hasError = false;

      // Validate Name
      if (!nameInput || nameInput.value.trim().length < 2) {
        nameInput.classList.add('input-error');
        nameInput.setAttribute('aria-invalid', 'true');
        if (nameError) nameError.textContent = 'Please enter your name (at least 2 characters).';
        hasError = true;
      }

      // Validate Email
      if (!emailInput || !emailPattern.test(emailInput.value.trim())) {
        emailInput.classList.add('input-error');
        emailInput.setAttribute('aria-invalid', 'true');
        if (emailError) emailError.textContent = 'Please enter a valid email address.';
        hasError = true;
      }

      // Validate Subject
      if (!subjectInput || subjectInput.value.trim().length < 3) {
        subjectInput.classList.add('input-error');
        subjectInput.setAttribute('aria-invalid', 'true');
        if (subjectError) subjectError.textContent = 'Please enter a subject.';
        hasError = true;
      }

      // Validate Message
      if (!messageInput || messageInput.value.trim().length < 10) {
        messageInput.classList.add('input-error');
        messageInput.setAttribute('aria-invalid', 'true');
        if (messageError) messageError.textContent = 'Please write a message of at least 10 characters.';
        hasError = true;
      }

      if (hasError) {
        if (statusBox) {
          statusBox.className = 'form-status status-error';
          statusBox.textContent = 'Please fill out all required fields correctly.';
          statusBox.style.display = 'block';
        }
        const firstError = form.querySelector('.input-error');
        if (firstError) firstError.focus();
        return;
      }

      // Success flow
      const name = nameInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      if (statusBox) {
        statusBox.className = 'form-status status-success';
        statusBox.textContent = `Thank you, ${name}! Launching your email client to send your message to hrp73@njit.edu...`;
        statusBox.style.display = 'block';
      }

      const mailtoUrl = `mailto:hrp73@njit.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\n\n${message}`)}`;
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);

      form.reset();
    });

    form.addEventListener('reset', clearErrors);
  };

  // Run all feature initializers
  initSkipLink();
  initThemeToggle();
  initMobileNav();
  initProjects();
  initContactForm();
});
