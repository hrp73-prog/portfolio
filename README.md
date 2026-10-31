# Personal Portfolio Website - Harsh Patel

[![Live Website](https://img.shields.io/badge/Live_Site-GitHub_Pages-blue.svg)](https://hrp73-prog.github.io/portfolio/)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse_Accessibility-100%2F100-brightgreen.svg)](#accessibility-standards)
[![W3C Valid](https://img.shields.io/badge/HTML5_%26_CSS3-Semantic_Valid-success.svg)](#technical-architecture)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A high-performance, fully accessible, 5-page personal engineering portfolio website designed and developed for **Harsh Patel**, a senior student in **Civil & Construction Engineering Technology** at the **New Jersey Institute of Technology (NJIT)**. 

The website highlights professional engineering internships at **Langan Engineering & Environmental Services** and **The LiRo Group (LiRo-Hill)**, academic CAD/BIM projects, embedded systems firmware, and community STEM leadership.

---

## Live Links & Repository

- **Live Deployed Website (GitHub Pages):** [https://hrp73-prog.github.io/portfolio/](https://hrp73-prog.github.io/portfolio/)
- **GitHub Source Repository:** [https://github.com/hrp73-prog/portfolio](https://github.com/hrp73-prog/portfolio)

---

## Page Overview

The portfolio consists of five interconnected pages adhering to semantic HTML5 standards:

1. **Home (`index.html`)**
   - High-impact hero introduction summarizing engineering focus areas.
   - Professional highlights from Langan Engineering, The LiRo Group, and NJIT.
   - Featured project preview cards linking directly into detailed project views.
   - Direct call-to-action buttons for bio review, projects, and contact.

2. **About Me (`about.html`)**
   - Comprehensive personal background, career objectives, and engineering philosophy.
   - Detailed academic history at NJIT including specialized CET coursework (BIM, structural steel, concrete, surveying, estimating).
   - Chronological industry timeline covering engineering internships, retail operations, and collegiate peer mentoring.
   - Verified digital credentials (NJIT Civic Engagement & Cisco CCNA).
   - Personal interests spanning robotics prototyping, additive manufacturing, and hiking/trail exploration.

3. **Engineering Projects (`projects.html`)**
   - Showcase of 3 featured technical projects:
     1. **Residential Architecture & BIM Modeling (Autodesk Revit):** End-to-end modeling, 3D visualizations, elevation cross-sections, and zoning compliance reviews.
     2. **Embedded Arduino Digital Calculator:** 4-operation arithmetic system, C++ firmware, LCD screen, and custom 3D-printed enclosure.
     3. **Lego Minifigure Mechanical Assembly & CAD Drafting:** Advanced CAD schematic, Section A-A cross-sectional analysis, geometric tolerancing, and injection molding DFM.
   - Interactive category filtering (`All`, `Civil & BIM`, `Embedded Systems`, `Mechanical CAD`).
   - Accessible modal inspection dialog (`<dialog>`) providing enlarged schematics and engineering specifications.

4. **Technical Skills (`skills.html`)**
   - Categorized proficiency matrix with visual percentage meters:
     - Civil Design & BIM Software (Revit, Civil 3D, AutoCAD, ArcGIS).
     - Programming & Embedded Systems (C++, Arduino, HTML5, CSS3, ES6 JavaScript).
     - Municipal Infrastructure & Field Engineering (Site plans, QA field inspections, stormwater management, DFM).
     - Leadership & Communication (Technical instruction, peer mentoring, project coordination).
   - Core competency badges and coursework verification chips.

5. **Contact (`contact.html`)**
   - Direct professional channels: University Email (`hrp73@njit.edu`), LinkedIn profile, and GitHub profile.
   - Interactive, client-side validated inquiry form (`Name`, `Email`, `Subject`, `Message`).
   - Accessible inline error feedback (`aria-invalid="true"`, `aria-live="polite"`).
   - Seamless mailto generation and confirmation dispatch without backend server dependencies.

---

## Technical Architecture & Constraints

- **100% Vanilla Tech Stack:** Built exclusively with semantic HTML5, pure CSS3, and ES6 JavaScript.
- **Zero External Dependencies:** No frameworks (no React, Vue), no CSS libraries (no Tailwind, Bootstrap), no runtime packages (no jQuery, npm), and no external font/icon CDNs.
- **Single External Stylesheet & Script:** All 5 pages link to a single cohesive stylesheet (`style.css`) and shared script (`script.js`). Zero inline `style="..."` attributes.
- **Strict Heading Hierarchy:** Every page contains exactly one `<h1>`, with all subsequent headings (`<h2>`, `<h3>`) in strict sequential order.
- **Asset Optimization:** All images are compressed, stripped of EXIF metadata, and kept strictly under 500 KB to guarantee instantaneous mobile loading.

---

## Accessibility Standards (WCAG 2.1 AA/AAA)

- **Lighthouse Accessibility Score:** 98&ndash;100% across all 5 pages.
- **Color Contrast:** All text and UI elements surpass WCAG AAA contrast standards (minimum 7:1 ratio for normal text).
- **Keyboard Usability:** 100% operable using only `Tab`, `Shift+Tab`, `Enter`, and `Escape`.
- **Skip Links:** "Skip to main content" link present as the first focusable element on every view.
- **Visible Focus States:** Prominent 3px outline rings with 3px offset and glow for all interactive elements.
- **Screen Reader Support:** Full ARIA integration (`aria-expanded`, `aria-controls`, `aria-label`, `aria-current`, `aria-pressed`, `aria-modal`, `aria-live="polite"`).

---

## Local Development & Viewing Instructions

This project is a completely static website that functions offline via the `file://` protocol or through any lightweight local HTTP server.

### Option 1: Direct File Viewing (No installation required)
1. Clone the repository:
   ```bash
   git clone https://github.com/hrp73-prog/portfolio.git
   cd portfolio
   ```
2. Double-click `index.html` in your file manager (Finder or Windows Explorer), or open it directly in any modern browser:
   ```bash
   open index.html   # On macOS
   start index.html  # On Windows
   xdg-open index.html # On Linux
   ```

### Option 2: VS Code Live Server Extension
1. Open the repository folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and select **"Open with Live Server"**.
4. The site will launch automatically at `http://127.0.0.1:5500/index.html`.

### Option 3: Python Built-in HTTP Server
Run from the root of the project directory:
```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000/` in your browser.

---

## Project Documentation Files

- **`AGENTS.md`**: Complete agent instruction specification defining the design system, hex colors, typography, coding rules, and Git discipline.
- **`TESTING.md`**: Formal test plan containing 16 test cases (T1&ndash;T16), covering navigation, responsive viewports (375x667 & 1440x900), keyboard traversal, form validation, and documented defect resolution.
- **`REPORT.md`**: Submission report detailing feature overviews, engineering challenges and solutions, coding assistant collaboration analysis, and viewport screenshots.

---

## Author & Acknowledgments

- **Author:** Harsh Patel (`hrp73@njit.edu`)
- **Institution:** New Jersey Institute of Technology (NJIT), Newark, NJ
- **Special Thanks:** 
  - Mentors and colleagues at **Langan Engineering & Environmental Services** and **The LiRo Group**.
  - Faculty and peers in the NJIT Department of Engineering Technology.
