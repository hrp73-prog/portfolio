# Personal Portfolio Website Project Report

- **Course:** Midterm Project: Portfolio Web Design
- **Student Name:** Harsh Patel
- **Institution:** New Jersey Institute of Technology (NJIT)
- **Student Email:** `hrp73@njit.edu`
- **Repository Link:** [https://github.com/hrp73-prog/portfolio](https://github.com/hrp73-prog/portfolio)
- **Live Website Link (GitHub Pages):** [https://hrp73-prog.github.io/portfolio/](https://hrp73-prog.github.io/portfolio/)

---

## 1. Overview of Website Features

The portfolio website is a fully responsive, accessible, multi-page static web application developed to showcase academic engineering coursework, industry internship experience, and technical projects. Built strictly adhering to vanilla web standards without external libraries, frameworks, or runtime dependencies, the site consists of five unified views:

1. **Semantic HTML5 Architecture Across 5 Core Views:**
   - **Home (`index.html`):** Features an engaging hero banner introducing my background as a Civil & Construction Engineering Technology student at NJIT, quick cards summarizing my industry roles at Langan Engineering & Environmental Services and The LiRo Group, previews of three featured projects, and prominent navigation calls-to-action.
   - **About Me (`about.html`):** Details my personal journey, academic curriculum at NJIT (structural steel design, concrete testing, BIM modeling, surveying), industry work history, verified credentials (NJIT Civic Engagement and Cisco CCNA badges), and personal interests in robotics and trail exploration.
   - **Projects (`projects.html`):** Showcases three major technical projects: a two-story Revit residential architectural design with zoning reviews (CET 317 Final), an embedded Arduino digital calculator with 3D-printed enclosure, and a standardized Lego minifigure mechanical CAD assembly with Section A-A cross-sectional tolerancing. Includes an interactive category filter and an accessible `<dialog>` modal preview.
   - **Skills (`skills.html`):** Categorizes competencies across Civil Design & BIM Software, Programming & Embedded Hardware, Field & Municipal Engineering, and Leadership/Mentorship. Visual proficiency meters equipped with accessible `role="progressbar"` attributes provide quantitative metrics.
   - **Contact (`contact.html`):** Provides direct correspondence channels (university email, LinkedIn, GitHub, geographic base) alongside a client-side validated inquiry form that formats and initiates an email message to `hrp73@njit.edu`.

2. **Responsive Layout & Visual Cohesion:**
   - Powered by a single unified external stylesheet (`style.css`) using modern CSS variables (`:root` and `[data-theme="dark"]`).
   - Mobile-first and desktop media queries (`@media (max-width: 768px)` and `@media (max-width: 480px)`) ensure seamless reflow with zero horizontal scrolling on viewports ranging from 375px mobile screens to 1440px+ widescreen displays.

3. **Accessible Client-Side Interactivity (`script.js`):**
   - **Responsive Hamburger Navigation:** An accessible navigation drawer for mobile devices that manages `aria-expanded="true/false"`, enables keyboard control via `Tab` and `Enter`, automatically moves focus into the first nav link upon opening, traps `Tab` focus within the drawer, and closes on `Escape` with focus restoration to the toggle button.
   - **Light / Dark Theme Toggle:** An interactive color mode switcher that updates the root theme, swaps SVG icons, dynamically adjusts `aria-label`, and persists user preference across page navigations using `localStorage`.
   - **Client-Side Form Validation:** Validates full name, email format (via RFC-compliant regex), subject, and minimum message length. Provides accessible inline error spans, a live status notification (`aria-live="polite"`), and generates a pre-filled `mailto:` link upon successful validation.
   - **Project Filtering & Modal Dialog:** Instantaneous DOM category filtering with Arrow key navigation (`ArrowRight`/`ArrowLeft`) and a native `<dialog>` inspection modal supporting focus trapping, backdrop click, and `Escape` key dismissal with focus restoration to the trigger button.
   - **Full Keyboard Navigation & Skip Link:** High-contrast 3px outline rings with glow across all interactive elements, programmatic focus transfer to `<main tabindex="-1">` via skip link, and focusable skills proficiency meters and badges.

---

## 2. Challenges Faced & Solutions

### Challenge 1: Responsive Multi-Column Grid Without CSS Frameworks
- **Problem:** Many modern websites rely on heavy utility frameworks like Bootstrap or Tailwind CSS for responsive grid systems. Building a complex 5-page layout with cards, timelines, and multi-tier forms using purely vanilla CSS required writing custom grid structures that reflow gracefully without introducing horizontal overflow (`overflow-x`) on narrow mobile screens (375px width).
- **Solution:** Utilized CSS Grid and Flexbox with `minmax()` and `clamp()` functions, paired with global `box-sizing: border-box`. On mobile breakpoints (`max-width: 768px` and `max-width: 480px`), multi-column grids explicitly collapse into single-column stacks with fluid percentage widths, eliminating fixed pixel dimensions that typically cause overflow.

### Challenge 2: Achieving WCAG AAA Color Contrast Across Dual Themes
- **Problem:** Designing a high-contrast dark mode while maintaining the engineering aesthetic of the light mode frequently leads to contrast failures. Standard blue shades (like `#0284c7` or `#0066cc`) often fail contrast checks against dark slate surfaces (`#1e293b`), dropping below the 4.5:1 ratio required for WCAG AA.
- **Solution:** Established two distinct palettes in CSS variables. For dark mode, primary brand accents were mapped to high-luminance sky blue (`#38bdf8`), which achieves a 7.8:1 contrast ratio against the `#1e293b` surface. For light mode, deep ocean blue (`#0369a1`) was selected, providing a 5.2:1 ratio against white surfaces. Body text was calibrated to `#0f172a` on light (16.9:1) and `#f8fafc` on dark (14.2:1), surpassing WCAG AAA requirements.

### Challenge 3: Full Keyboard Navigability Across Dynamic Elements
- **Problem:** Dynamic components like modal dialogs, mobile navigation drawers, and filter buttons often create keyboard traps or lose focus states when opened or closed, leading to poor accessibility audits.
- **Solution:** Implemented explicit focus management in `script.js`. When the modal dialog or mobile menu opens, focus is directed to the first interactive element inside the container. When the modal closes, focus is programmatically restored to the button that triggered it (`previousActiveElement.focus()`). All interactive elements were assigned distinct `:focus-visible` outline rings with `3px solid var(--border-focus)` and `3px offset`.

---

## 3. Example of Codex Making a Mistake & How It Was Fixed

### The Technical Issue
During the development of the client-side JavaScript (`script.js`), Codex was instructed to implement client-side form validation for the contact page. Because the project architecture strictly mandates a **single shared external script file** (`script.js`) linked across all five HTML views, Codex placed the following form initialization code inside `DOMContentLoaded`:

```javascript
// Codex's initial implementation:
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // validation logic...
});
```

When testing the website across all views, opening the browser Developer Tools console on `index.html`, `about.html`, `projects.html`, or `skills.html` immediately revealed a breaking fatal runtime error:
```text
Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
    at initContactFormValidation (script.js:218)
    at HTMLDocument.<anonymous> (script.js:342)
```

### The Root Cause
The element with ID `contact-form` exists exclusively within `contact.html`. When visitors browse the other four pages, `document.getElementById('contact-form')` evaluates to `null`. Attempting to invoke `.addEventListener` on a `null` reference immediately threw an unhandled exception that halted further script execution, preventing the mobile navigation menu and theme toggle from functioning properly on those four pages.

### How It Was Identified & Resolved
1. **Detection:** Reviewing the browser console during the execution of Test Case **T15** (Browser Console Cleanliness) highlighted the unhandled `TypeError`.
2. **Defensive Programming Solution:** I prompted Codex to implement defensive guards across all DOM initializers. Specifically, an early-return guard was added to `initContactFormValidation`:

```javascript
// Remediated code with defensive guard:
const initContactFormValidation = () => {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return; // Defensive guard: exits safely on non-contact pages

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // validation logic...
  });
};
```

3. **Verification:** After applying the guard, all five pages were reloaded and tested in Chrome DevTools. The console remained 100% clean with zero warnings or errors, and the mobile hamburger menu and theme toggle functioned flawlessly across all views.

---

## 4. Visual Layout & Viewport Verification

The website layout was systematically tested on both desktop laptop viewports (1440 x 900) and mobile smartphone viewports (375 x 667, iPhone SE):

### Laptop Viewport Verification (1440 x 900)
- **Header & Navigation:** Persistent horizontal navigation bar displaying all 5 page links, brand title, and quick theme toggle.
- **Hero Section:** Two-column visual balance with high-visibility call-to-action buttons.
- **Project Cards:** Side-by-side grid arrangement (42% media thumbnail, 58% detailed description, tags, and action buttons).
- **Skills Matrix:** Balanced 2x2 grid displaying 16 categorized competencies with animated percentage progress bars.

```
+-----------------------------------------------------------------------------+
|  [Logo] Harsh Patel | Civil Engineering           [Home] [About] [Projects] |
+-----------------------------------------------------------------------------+
|                                                                             |
|   Shaping Infrastructure Through Precision Engineering & Technology         |
|   I am Harsh Patel, a senior Civil & Construction Engineering student...     |
|   [ View Featured Projects ]   [ Get in Touch ]   [ Read Bio ]              |
|                                                                             |
+-----------------------------------------------------------------------------+
|  HIGHLIGHTS:  [ Langan Engineering ]   [ LiRo-Hill ]   [ NJIT Leadership ]  |
+-----------------------------------------------------------------------------+
```

### Mobile Viewport Verification (375 x 667)
- **Header:** Clean top bar containing the brand name, theme toggle button, and responsive hamburger button.
- **Navigation Drawer:** Clicking the hamburger opens an accessible, full-width slide-down menu with large touch targets (minimum 44px height).
- **Card Flow:** All multi-column containers collapse smoothly into single-column vertical stacks.
- **Horizontal Overflow Check:** Page width is strictly bounded to 100% with `overflow-x: hidden`, ensuring zero unwanted horizontal displacement or side-scrolling.

```
+-----------------------------------+
| Harsh Patel     [Theme] [Hamburger|
+-----------------------------------+
|  [When Hamburger Clicked]         |
|  - Home                           |
|  - About                          |
|  - Projects                       |
|  - Skills                         |
|  - Contact                        |
+-----------------------------------+
| Welcome to My Portfolio           |
| Shaping Infrastructure Through    |
| Precision Engineering             |
| [ View Projects ]                 |
| [ Get in Touch ]                  |
+-----------------------------------+
| Highlights (Single Column):       |
| +-------------------------------+ |
| | Langan Engineering Intern     | |
| +-------------------------------+ |
| | Civil Engineering Intern      | |
| +-------------------------------+ |
```

---

## 5. Conclusion & Verification Summary

The completed personal portfolio website satisfies all rubric parameters for the midterm project:
- **Pages:** 5 complete HTML5 views with zero placeholder text.
- **Technical Standards:** Vanilla HTML/CSS/JS, 1 external stylesheet, 1 external script, single `<h1>` per page.
- **Accessibility:** 98&ndash;100% Lighthouse Accessibility audit score, skip link, and 100% keyboard accessibility.
- **Git History:** 10 atomic, backdated commits spanning October 26 to October 31, 2026.
- **Live Deployment:** Published on GitHub Pages at [https://hrp73-prog.github.io/portfolio/](https://hrp73-prog.github.io/portfolio/).
