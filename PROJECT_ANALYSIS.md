# Nine Gate Web — Project Technical Analysis

**Date:** 2026-07-19
**Project root:** `/Users/alanpereyranielsen/nine-gate-web`
**Remote origin:** `https://github.com/alanpnielsen/nine-gate-web.git`

---

## 1. Project Structure

```
nine-gate-web/
├── 4-A.png                    # Logo (1080×526)
├── apple-touch-icon.png       # Apple PWA icon (180×180)
├── favicon.ico                # Legacy favicon
├── favicon-16x16.png          # Small favicon
├── favicon-32x32.png          # Medium favicon
├── index.html                 # Landing page (home)
├── contacto.html              # Contact page
├── soluciones.html            # Solutions page
├── como-trabajamos.html       # "How we work" page
├── cookies.html               # Cookie policy
├── terminos.html              # Terms of service
├── privacidad.html            # Privacy policy
├── styles.css                 # All styles (1,504 lines)
├── script.js                  # All JS (349 lines)
├── AGENTS.md                  # Empty placeholder
├── BRAND.md                   # Empty placeholder
├── DESIGN_SYSTEM.md           # Empty placeholder
├── ROADMAP.md                 # Empty placeholder
├── SALES.md                   # Empty placeholder
├── SERVICES.md                # Empty placeholder
├── .netlify/
│   ├── netlify.toml           # Netlify config (publish = root)
│   └── state.json             # Site ID
└── .git/                      # Git repository
```

No `assets/`, `css/`, `js/`, `img/` subdirectories — everything is flat in root.

---

## 2. Technologies Used

- **HTML5** — 7 hand-crafted pages with semantic elements (`<nav>`, `<section>`, `<footer>`, `<article>`, `<h1>`–`<h4>`)
- **CSS3** — Single `styles.css` with custom properties, `clamp()`, `backdrop-filter`, CSS Grid, Flexbox, 4 media query breakpoints (1024px, 768px, 480px). No preprocessor.
- **Vanilla JavaScript (ES6+)** — Single `script.js`. No frameworks, no build tools, no bundlers.
- **Google Fonts** — Inter typeface (weights 400–900)
- **Netlify** — Deployment platform
- **SVG** — Inline SVGs for icons; no icon library dependency

---

## 3. Dependencies

**Zero.** No npm packages, no CDN scripts (except Google Fonts CSS link). Fully self-contained.

---

## 4. Folder Organization

Everything resides in the root directory. No subdirectory organization exists for assets, styles, or scripts. The `.netlify/` directory contains deployment config.

---

## 5. Main Files and Their Function

| File | Lines | Function |
|---|---|---|
| `index.html` | 381 | Primary marketing landing page with 8 sections (hero, architecture, process, services, benefits, use cases, CTA, footer) |
| `contacto.html` | 266 | Contact methods: email button, WhatsApp button, diagnostic preparation card |
| `soluciones.html` | 267 | 10 solution cards in 5-column grid |
| `como-trabajamos.html` | 269 | 8-step implementation methodology in 4-column grid |
| `cookies.html` | 152 | Cookie policy (legal) |
| `terminos.html` | 157 | Terms of service (legal) |
| `privacidad.html` | 160 | Privacy policy (legal) |
| `styles.css` | 1,504 | All styles: layout, theme, components, animations, responsive breakpoints |
| `script.js` | 349 | Language toggle (ES/EN), nav hamburger menu, scroll-trigger animations, counter animation (dead code), contact form handler (dead code) |

---

## 6. Navigation Flow

### Primary Navigation (all pages)

| Link | Target |
|---|---|
| Logo (4-A.png) | `index.html` |
| Servicios | `index.html#servicios` |
| Soluciones | `soluciones.html` |
| Cómo trabajamos | `como-trabajamos.html` |
| Casos de uso | `index.html#casos` |
| Contacto | `contacto.html` |
| Empezar (CTA) | `contacto.html` |

### Secondary Navigation

| Element | Location | Target |
|---|---|---|
| Back-link | All subpages | `index.html` |
| WhatsApp float | index.html only | `https://wa.me/5492915052439?...` |
| WhatsApp CTAs | Hero + CTA section | Same WhatsApp link |
| Email | contacto.html | `mailto:contacto@ninegate.me` |
| Social links | Footers | `#` (placeholders) |

### Legal Footer Links (all pages)

- Privacidad → `privacidad.html`
- Términos → `terminos.html`
- Cookies → `cookies.html`

### Navigation Issues

- **Broken hash `#como-funciona`** in legal pages nav — no element with that ID exists on `index.html`
- **Hash links on wrong pages** — `#servicios` and `#casos` on `soluciones.html`/`como-trabajamos.html` have no matching IDs on those pages
- **Legal pages** have a different, simplified nav (3 links, no lang toggle, no Soluciones/Casos links)

---

## 7. Reusable Components

No templating system exists. Components are copy-pasted across files with slight inconsistencies:

| Component | Pages | Variants |
|---|---|---|
| Navbar | All 7 | Full (4 pages) vs Simplified (3 legal pages) |
| Footer | All 7 | Full with lang toggle (3 pages) vs Simplified without lang toggle (4 pages) |
| Language Toggle | All 7 | Present in nav and footer on main pages; missing on legal page navs and some footers |
| Back-link | All subpages | Same pattern, inline style duplicated |
| Section Headers | All sections | Consistent `.section__header` / `.tag` / `.section__title` / `.section__desc` pattern |
| Legal Page Template | 3 legal pages | Identical inline CSS (~42 lines) duplicated across 3 files |
| Cards | index.html | Service, benefit, use case cards share CSS patterns |

---

## 8. SEO State

### Meta Descriptions

| Page | Has meta description? |
|---|---|
| `index.html` | Yes |
| `contacto.html` | Yes |
| `soluciones.html` | Yes |
| `como-trabajamos.html` | Yes |
| `cookies.html` | **No** |
| `terminos.html` | **No** |
| `privacidad.html` | **No** |

### Headings

| Page | Has `<h1>`? |
|---|---|
| `index.html` | Yes |
| `contacto.html` | Yes |
| `soluciones.html` | **No** (uses `<h2>` as primary heading) |
| `como-trabajamos.html` | **No** (uses `<h2>` as primary heading) |
| `cookies.html` | Yes |
| `terminos.html` | Yes |
| `privacidad.html` | Yes |

### Missing SEO Features

- **Open Graph tags** — 0/7 pages (`og:title`, `og:description`, `og:image`)
- **Twitter Card tags** — 0/7 pages (`twitter:card`)
- **Canonical tags** — 0/7 pages (`<link rel="canonical">`)
- **JSON-LD structured data** — None
- **`sitemap.xml`** — Missing
- **`robots.txt`** — Missing

---

## 9. Accessibility State

### What's Good
- Semantic HTML (`<nav>`, `<section>`, `<footer>`, `<article>`)
- ARIA labels on hamburger menu, lang toggle, social SVGs, WhatsApp float button
- `lang="es"` on all pages, dynamically updated by JS on toggle
- Good color contrast ratios (dark bg, white/yellow text)
- Fluid typography with `clamp()`, responsive layout
- No `user-scalable=no` restriction

### What's Missing
- **No `<main>` landmark** on any page — critical for screen reader skip navigation
- **No focus styles** (`:focus-visible`) — keyboard users see no focus indicator
- **No skip-to-content link**
- **No `aria-current="page"`** on active nav links
- **No `<header>` landmark** wrapping the nav
- **Contact form has no UI** but JS handler exists (dead code)
- ARIA labels in Spanish only — not updated when language toggles to English

---

## 10. Possible Technical Improvements

### Critical
1. Fix broken hash link `#como-funciona` in legal pages nav
2. Fix `#servicios` / `#casos` hash links on soluciones/como-trabajamos pages
3. Add `<h1>` to soluciones.html and como-trabajamos.html
4. Add meta descriptions to 3 legal pages
5. Add `<main>` landmark to all pages

### High
6. Add `:focus-visible` styles globally
7. Consolidate duplicated inline styles (back-link, legal-page, contact-page) into `styles.css`
8. Add `data-i18n` attributes to legal pages for language toggle support
9. Add Open Graph and canonical tags to all pages
10. Remove or implement dead contact form JS

### Medium
11. Create `sitemap.xml` and `robots.txt`
12. Add JSON-LD structured data for Organization schema
13. Add skip-to-content link
14. Standardize footers across all pages (brand text, service links, lang toggle)
15. Replace placeholder social links (`href="#"`) with real URLs
16. Create `.gitignore`

### Low
17. Separate assets into subdirectories (`assets/img/`, `assets/css/`, `assets/js/`)
18. Normalize cache-busting approach (`?v=2` vs no version)
19. Remove duplicate CSS declarations
20. Remove or implement hero counter animation (targets non-existent elements)

---

## 11. Possible Technical Risks

| Risk | Impact | Pages Affected |
|---|---|---|
| `#como-funciona` broken link | User clicks do nothing | cookies, terminos, privacidad |
| Hash links on wrong pages | Users expect section scroll, get nothing | soluciones, como-trabajamos |
| Social links (`href="#"`) | Dead UX, scrolls to top | All pages |
| No skip nav or focus styles | Keyboard users can't navigate | All pages |
| No `<main>` landmark | Screen reader users lose skip nav | All pages |
| Legal pages not translatable | Non-Spanish speakers can't read policies | cookies, terminos, privacidad |
| Two email addresses | Communication confusion | All pages |
| No robots.txt/sitemap | SEO crawling inefficiency | All pages |
| No OG tags | Poor social sharing previews | All pages |
| Contact form dead code | False expectation of functionality | contacto.html |
| `netlify.toml` uses absolute path | Won't build on Netlify CI | Deployment |

---

## 12. Recommendations for Scaling

### Immediate (Low Effort, High Impact)
1. Add `<main>` landmark to all pages
2. Add `:focus-visible` focus styles
3. Add meta descriptions to 3 legal pages
4. Fix broken hash links
5. Add `<h1>` to soluciones/como-trabajamos
6. Add Open Graph tags (can be templated via JS)
7. Remove or implement contact form

### Short-term (Moderate Effort)
8. Consolidate shared components — extract nav, footer, head into a single source (partials, JS injection, or static site generator)
9. Move all inline styles into `styles.css`
10. Extend language toggle to cover legal pages
11. Create `sitemap.xml` and `robots.txt`
12. Add proper cookie consent banner if GA is mentioned
13. Create `.gitignore`

### Medium-term (Infrastructure)
14. Adopt a build tool (Vite, Parcel) for minification and cache-busting
15. Organize assets into subdirectories
16. Add JSON-LD structured data
17. Implement a serverless contact form backend (Netlify Forms, Formspree, or similar)
18. Set up automated a11y checks (axe-core, Lighthouse CI)

### Long-term (Architecture)
19. Migrate to a static site generator (Astro, 11ty, Hugo) for automatic component reuse, SEO management, and better DX
20. Implement proper i18n routing (`/en/`, `/es/`) instead of client-side JS translation for SEO on both languages
21. Add CSP headers via Netlify
22. Set up performance monitoring and opt-in analytics

---

## Summary

| Metric | Value |
|---|---|
| Total source files | 7 HTML, 1 CSS, 1 JS |
| Total lines of code | ~3,450 |
| Pages with meta description | 4/7 (57%) |
| Pages with `<h1>` | 5/7 (71%) |
| Pages with `<main>` | 0/7 (0%) |
| Pages with focus styles | 0/7 (0%) |
| Pages with OG tags | 0/7 (0%) |
| Broken internal links | 1 |
| Dead social links | 6 instances |
| Dependencies | 0 |

The project is a well-designed, hand-crafted static site with zero runtime dependencies. Core strengths: clean dark theme, solid marketing copy, responsive layout. Priority areas: accessibility (missing `<main>`, focus styles, skip nav), SEO completeness (meta descriptions, OG tags, H1s), component consistency (nav/footer variants), and dead code cleanup.
