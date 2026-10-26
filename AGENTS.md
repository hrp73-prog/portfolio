# AGENTS.md - Developer & Agent Instruction Specification

## 1. Project Overview & Architecture
This project is a 5-page personal portfolio website for **Harsh Patel**, a senior Civil and Construction Engineering Technology student at the **New Jersey Institute of Technology (NJIT)**. The portfolio showcases academic coursework, professional civil engineering internships (at Langan Engineering & Environmental Services and The LiRo Group), technical leadership, and engineering design projects.

### Page Hierarchy
1. `index.html` (Home): Hero introduction, career highlights, quick project highlights, and primary call-to-action buttons.
2. `about.html` (About Me): Comprehensive personal background, education history at NJIT, internship experience, certifications, and technical interests.
3. `projects.html` (Projects): Detailed showcase of 3 technical projects with real descriptions, categorized filtering, and an accessible modal/preview dialog.
4. `skills.html` (Skills): Categorized technical competencies (Civil & BIM Software, Programming & Hardware, Field Competencies, Professional Leadership) with visual proficiency meters.
5. `contact.html` (Contact): Direct professional contact channels (Email, LinkedIn, GitHub) and a fully accessible, client-side validated contact form.

---

## 2. Design System

### Color Palette & CSS Custom Properties
The site implements a dual-theme design system (Light and Dark modes) engineered to surpass WCAG 2.1 AA/AAA contrast ratios (minimum 4.5:1 for normal text, >7:1 target):

```css
:root {
  /* Light Theme Palette */
  --bg-primary: #f8fafc;
  --bg-surface: #ffffff;
  --bg-surface-elevated: #f1f5f9;
  --text-primary: #0f172a;        /* 16.9:1 contrast ratio against #ffffff */
  --text-secondary: #334155;      /* 8.9:1 contrast ratio against #ffffff */
  --text-muted: #475569;          /* 5.4:1 contrast ratio against #ffffff */
  --brand-primary: #0369a1;       /* Deep Engineering Blue: 5.2:1 against #ffffff */
  --brand-primary-hover: #075985;
  --brand-accent: #0284c7;
  --border-color: #cbd5e1;
  --border-focus: #0284c7;
  --error-color: #b91c1c;         /* High-contrast error red */
  --success-color: #15803d;       /* High-contrast success green */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --transition-speed: 0.25s;
}

[data-theme="dark"] {
  /* Dark Theme Palette */
  --bg-primary: #0b1120;
  --bg-surface: #1e293b;
  --bg-surface-elevated: #334155;
  --text-primary: #f8fafc;        /* 14.2:1 contrast ratio against #1e293b */
  --text-secondary: #cbd5e1;      /* 9.5:1 contrast ratio against #1e293b */
  --text-muted: #94a3b8;          /* 5.1:1 contrast ratio against #1e293b */
  --brand-primary: #38bdf8;       /* High-contrast sky blue against #1e293b */
  --brand-primary-hover: #7dd3fc;
  --brand-accent: #0284c7;
  --border-color: #475569;
  --border-focus: #38bdf8;
  --error-color: #f87171;
  --success-color: #4ade80;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.5);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5);
}
```

### Typography
- Primary Font Stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- Code / Monospace Stack: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
- Base Font Size: `16px` (1rem) with responsive scaling.
- Line Height: `1.6` for long-form body text, `1.25` for headings.
- Strict heading hierarchy: Exactly **one `<h1>` per page**, followed by logically nested `<h2>` and `<h3>` tags with zero skipped levels.

### Layout & Responsive Breakpoints
- Container max-width: `1180px` centered with auto margins and horizontal padding.
- Breakpoints:
  - Desktop / Laptop: `> 768px` (multi-column grid, persistent horizontal navigation).
  - Tablet / Mobile: `<= 768px` (stacked single-column layout, responsive hamburger menu).
  - Small Phone: `<= 480px` (optimized margins, 100% width buttons and form fields).
- Absolute prevention of horizontal scrolling (`overflow-x: hidden` and `box-sizing: border-box` globally).

---

## 3. Strict Coding Rules

1. **Zero External Dependencies:**
   - 100% pure vanilla HTML5, CSS3, and modern ES6 JavaScript.
   - Absolutely NO frameworks (no React, Vue, Angular), NO CSS libraries (no Tailwind, Bootstrap), NO utility scripts (no jQuery, Lodash), and NO font/icon CDNs (no FontAwesome).
   - Use clean inline SVG icons and standard Unicode symbols.

2. **File Organization & Link Paths:**
   - Exactly **one external stylesheet** (`style.css`) linked in the `<head>` of all 5 pages.
   - Exactly **one external script file** (`script.js`) deferred or loaded before `</body>` across all 5 pages.
   - Strictly **relative file paths** (`./style.css`, `./script.js`, `./images/...`) so pages run seamlessly via the `file://` protocol and on GitHub Pages (`https://<username>.github.io/portfolio/`).
   - Zero inline `style="..."` attributes in HTML.

3. **Semantic HTML & Accessibility Standards:**
   - Every page must contain `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` (where appropriate), and `<footer>`.
   - Accessible "Skip to main content" link must be the very first focusable element on every page.
   - Every image must contain an accurate, descriptive `alt` attribute.
   - All interactive controls (buttons, links, form inputs) must feature visible `:focus-visible` outline rings with at least 3px width and 3px offset for full keyboard accessibility (`Tab`, `Shift+Tab`, `Enter`, `Space`).
   - All modal dialogs and navigation menus must support the `Escape` key and maintain appropriate `aria-expanded`, `aria-hidden`, and `aria-modal` attributes.

4. **Image Constraints:**
   - All project and profile images must strictly remain under **500 KB** file size.
   - All images must be optimized and stripped of camera EXIF metadata prior to inclusion.

5. **JavaScript Defensive Execution:**
   - Because `script.js` is shared across all 5 pages, every DOM query and event listener must be guarded with conditional existence checks (e.g., `if (contactForm) { ... }`) to prevent `TypeError: null is not an object` in the browser console.
   - Zero console errors permitted across all pages.

---

## 4. Git Workflow & Discipline
- Atomic, purposeful commits mapped directly to milestone tasks.
- Meaningful commit messages written in the imperative mood.
- Verify in local browser and across viewports before every commit.
- Never commit private personal information (phone numbers, street addresses) or host-specific machine paths to the repository.
