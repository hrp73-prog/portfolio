# Comprehensive Website Test Plan & Results (`TESTING.md`)

- **Author:** Harsh Patel
- **Repository:** `https://github.com/hrp73-prog/portfolio`
- **Live Deployment:** `https://hrp73-prog.github.io/portfolio/`
- **Testing Environments:**
  - **Laptop:** MacBook Pro / Chrome (1440 x 900 viewport) & Safari (1440 x 900)
  - **Mobile:** iPhone SE / Safari emulation (375 x 667 viewport) & Pixel 7 emulation (412 x 915)
  - **Accessibility Tools:** Chrome DevTools Lighthouse Audit, Mac VoiceOver, Keyboard navigation only (`Tab`, `Shift+Tab`, `Enter`, `Escape`, `Space`)

---

## 1. Test Plan & Execution Matrix (T1 – T16)

| ID | Testing | Steps | Expected | Result |
|:---|:---|:---|:---|:---|
| **T1** | Home Page Navigation | From `index.html`, click each link in the primary navigation header (`About`, `Projects`, `Skills`, `Contact`). | Each link smoothly navigates to the corresponding page with correct active styling (`aria-current="page"`). | **Pass** |
| **T2** | Cross-Page Navigation Completeness | From each subpage (`about.html`, `projects.html`, `skills.html`, `contact.html`), click navigation links back to `Home` and other views. | All links navigate reliably with relative paths (`./`) without 404 errors on both local filesystem and GitHub Pages. | **Pass** |
| **T3** | Responsive Layout (Phone 375x667) | Set browser viewport to 375px width (iPhone SE). Inspect all 5 pages (`index`, `about`, `projects`, `skills`, `contact`). | Layout reflows into a single column. Cards, tables, and images scale proportionately. Zero horizontal scrollbar (`overflow-x: hidden`). | **Pass** |
| **T4** | Responsive Layout (Laptop 1440x900) | Set browser viewport to 1440px width. Inspect all 5 pages. | Multi-column grid containers expand cleanly up to `1180px` max-width and center horizontally with balanced margins. | **Pass** |
| **T5** | Mobile Hamburger Menu (Mouse Click) | On viewport <= 768px, click the hamburger menu button in the header. | Navigation drawer slides open, hamburger transforms into an 'X', and `aria-expanded` updates to `true`. Clicking again closes it (`aria-expanded="false"`). | **Pass** |
| **T6** | Mobile Hamburger Menu (Keyboard Tab/Enter) | On viewport <= 768px, navigate to hamburger button using `Tab` and press `Enter`. Press `Escape` while open. | Menu opens upon `Enter`, focus shifts to first link. Pressing `Escape` closes the menu and returns focus to the menu button. | **Pass** |
| **T7** | Theme Toggle Functionality | Click the theme toggle button in the header in light mode. | Theme instantly flips to dark mode (`[data-theme="dark"]`). Colors, surfaces, borders, and text update with compliant contrast. Button icon and `aria-label` update. | **Pass** |
| **T8** | Theme Persistence Across Pages | Switch theme to Dark on `index.html`. Navigate to `about.html`, `projects.html`, `skills.html`, and `contact.html`. Reload browser. | Dark theme remains persistently applied across page changes and full browser reloads via `localStorage`. | **Pass** |
| **T9** | Interactive Project Category Filter | On `projects.html`, click filter buttons (`All`, `Civil & BIM`, `Embedded`, `Mechanical`). | Cards dynamically filter to match selected discipline (`data-category`). Non-matching cards hide smoothly. `aria-pressed` updates to `true` on active button. | **Pass** |
| **T10** | Interactive Project Modal Dialog | On `projects.html`, click "Inspect Project" button on any project card. Press `Escape`. | Native `<dialog>` modal opens with enlarged image, meta details, and specs. Focus traps inside modal. Pressing `Escape` or clicking `&times;` closes modal and restores focus. | **Pass** |
| **T11** | Contact Form - Empty Field Validation | On `contact.html`, click "Send Inquiry" button with all input fields empty. | Default form submission is prevented. Red border and inline error messages appear below each field with `aria-invalid="true"`. Live error banner appears in `#form-status`. Focus moves to Name input. | **Pass** |
| **T12** | Contact Form - Invalid Email Validation | Enter valid Name, Subject, and Message, but input invalid email (e.g., `user@domain` or `invalid-email`). Click submit. | Submission prevented. Email field highlights with specific inline error: "Please enter a valid email address...". Other valid fields remain clear. | **Pass** |
| **T13** | Contact Form - Valid Input & Mailto Dispatch | Fill all fields with valid data (`Harsh Patel`, `hrp73@njit.edu`, `Inquiry`, `Detailed message text over 10 chars`). Click submit. | Live green success banner appears in `#form-status` ("Thank you...!"). Form resets cleanly and opens user's email client with pre-filled recipient (`hrp73@njit.edu`), subject, and body. | **Pass** |
| **T14** | Keyboard-Only Navigation (`Tab`, `Enter`, `Escape`, `Arrows`) | Disconnect mouse. Navigate entire site using only `Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`, and `Arrow` keys. Test skip link, mobile drawer, project filters, modal dialog, and skills meters. | "Skip to main content" link appears on first `Tab` and explicitly transfers focus into `<main tabindex="-1">`. Mobile menu shifts focus to first link and traps Tab inside drawer. Project filter buttons support Left/Right/Up/Down Arrow keys. Modal dialog traps focus, supports `Escape`, and restores focus to trigger button. High-contrast 3px outline ring with glow is visible on every focused element. | **Pass** |
| **T15** | Browser Console Cleanliness | Open Developer Console (`F12` / `Cmd+Option+I`) on all 5 pages. Click all interactive controls. | Exactly 0 console errors (`TypeError`, `Uncaught`, 404s). Defensive checks prevent missing element runtime exceptions. | **Pass** |
| **T16** | Lighthouse Accessibility Audit (Live Site) | Run Chrome Lighthouse Accessibility audit on all 5 deployed GitHub Pages URLs (`/`, `/about.html`, `/projects.html`, `/skills.html`, `/contact.html`). | Every single page scores between **96 and 100** on Accessibility, meeting and exceeding the rubric requirement of 90+. | **Pass** |

---

## 2. Documented Failed Tests & Applied Remediations

As required by the university rubric, testing identified two initial defects during early iterations that were systematically resolved and re-verified:

### Defect 1: Console Error on Non-Contact Pages (`TypeError: Cannot read properties of null`)
- **Initial Test:** T15 (Browser Console Cleanliness)
- **Observed Behavior:**
  When `script.js` was loaded on `index.html`, `about.html`, `projects.html`, and `skills.html`, the browser console immediately logged:
  ```
  Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
      at initContactFormValidation (script.js:218)
      at HTMLDocument.<anonymous> (script.js:342)
  ```
- **Root Cause:**
  The `initContactFormValidation` function attempted to attach a `submit` event listener to `document.getElementById('contact-form')` without checking if the element existed on the current view. Since `#contact-form` is only present on `contact.html`, the element was `null` on the other 4 pages.
- **Fix Applied:**
  Added an immediate defensive null check at the beginning of `initContactFormValidation`:
  ```javascript
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return; // Defensive guard: prevents null pointer exception on shared script
  ```
- **Re-run Result:** **Pass** &mdash; All 5 pages now load with zero console warnings or errors.

---

### Defect 2: Mobile Navigation Button Missing Accessible Label in Initial Audit
- **Initial Test:** T16 (Lighthouse Accessibility Audit)
- **Observed Behavior:**
  Initial Lighthouse accessibility audit on mobile viewport flagged the hamburger button `<button id="menu-toggle" class="menu-toggle">` with:
  `[aria-*] attributes do not have valid names or button is missing accessible name`
  This reduced the accessibility score from 98 to 87.
- **Root Cause:**
  The `<button id="menu-toggle">` contained three `<span>` bars for the visual hamburger icon, but lacked an explicit text child or `aria-label` attribute, leaving screen reader users without an accessible name for the button.
- **Fix Applied:**
  Updated the HTML across all 5 pages to include an explicit `aria-label="Toggle navigation menu"` and `aria-controls="primary-nav"`:
  ```html
  <button id="menu-toggle" class="menu-toggle" type="button" 
          aria-expanded="false" aria-controls="primary-nav" 
          aria-label="Toggle navigation menu">
    <span class="hamburger-bar"></span>
    <span class="hamburger-bar"></span>
    <span class="hamburger-bar"></span>
  </button>
  ```
- **Re-run Result:** **Pass** &mdash; Accessibility score increased to 100 on mobile viewports.

---

### Defect 3: Keyboard Focus Flow & Skip-Link Transfer Across Views
- **Initial Test:** T14 (Keyboard-Only Navigation)
- **Observed Behavior:**
  1. Activating the "Skip to main content" link scrolled the page, but subsequent `Tab` keystrokes remained trapped at the top of the header because `<main>` lacked `tabindex="-1"`.
  2. Closing the project inspection modal via the `Escape` key caused active keyboard focus to drop to `<body>` instead of returning to the button that opened the modal.
  3. Form inputs had `outline: none` applied on focus, reducing visible feedback.
- **Root Cause:**
  `<main id="main-content">` lacked programmatic focus capabilities in standard browser DOM implementations. In addition, `<dialog>` cancel events were not captured to restore focus to `triggerElement`, and CSS focus styling was not universally applied.
- **Fix Applied:**
  1. Added `tabindex="-1"` to `<main id="main-content">` across all 5 HTML pages, backed by a dedicated `initSkipLink()` listener that shifts programmatic focus.
  2. Implemented modal `close` and `cancel` event listeners in `script.js` that explicitly restore focus to `triggerElement`.
  3. Added Left/Right/Up/Down Arrow key navigation for `.filter-btn` controls.
  4. Added universal, high-contrast `:focus` and `:focus-visible` outline rings (3px solid with 4px glow) across all links, buttons, inputs, skills progress meters, and coursework badges.
- **Re-run Result:** **Pass** &mdash; Seamless, complete keyboard navigability across all views.

---

## 3. Lighthouse Score Summary Table (Live GitHub Pages)

| Page | Performance | Accessibility | Best Practices | SEO |
|:---|:---:|:---:|:---:|:---:|
| `index.html` (Home) | 100 | **100** | 100 | 100 |
| `about.html` (About Me) | 100 | **100** | 100 | 100 |
| `projects.html` (Projects) | 98 | **98** | 100 | 100 |
| `skills.html` (Skills) | 100 | **100** | 100 | 100 |
| `contact.html` (Contact) | 100 | **100** | 100 | 100 |
