# OpenDesign + Nine Gate — Integration Guide

**OpenDesign version:** 0.15.1  
**Project:** Nine Gate Web  
**Repository:** `https://github.com/alanpnielsen/nine-gate-web.git`  
**Live URL:** `https://ninegate.me`  
**Date:** 2026-07-21

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Phase 1: Brand Extraction from ninegate.me](#2-phase-1-brand-extraction)
3. [Phase 2: Code Import from GitHub Repository](#3-phase-2-code-import)
4. [Phase 3: Design System Creation](#4-phase-3-design-system-creation)
5. [Phase 4: Improvement Proposals](#5-phase-4-improvement-proposals)
6. [Phase 5: Implementation via OpenCode](#6-phase-5-implementation)
7. [Complete Recommended Workflow](#7-complete-workflow)
8. [File Locations Reference](#8-file-locations)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Prerequisites

### 1.1 OpenDesign Installation
- OpenDesign v0.15.1 is installed at `/Applications/Open Design.app`
- App was launched at least once (onboarding completed)
- Default namespace: `release-stable`
- Agent ID: `amr`
- Default design system: `default` (Neutral Modern)

### 1.2 Verify OpenDesign is Running
```bash
# Check if the daemon process is active
pgrep -f "Open Design"
# Expected: a PID number (the daemon sidecar)
```

If the app is not running, launch it:
```bash
open "/Applications/Open Design.app"
```

### 1.3 Nine Gate Project Accessibility
- **Live site:** `https://ninegate.me` must be publicly accessible
- **GitHub repo:** `https://github.com/alanpnielsen/nine-gate-web.git` must be public (or authenticated)
- **Local folder:** `/Users/alanpereyranielsen/nine-gate-web` is available as fallback

---

## 2. Phase 1: Brand Extraction

### 2.1 What `brand-extract` Does

The `brand-extract` skill drives an in-app browser to `ninegate.me`, measures the real DOM and computed CSS, and harvests:

| Element | What it extracts |
|---|---|
| Colors | 7 semantic roles (primary, accent, background, surface, text, secondary text, border) |
| Typography | `@font-face` declarations, family names, weights, sizes |
| Logo | Favicon, SVG logos, `og:image` meta |
| Imagery | Hero images, cover images (6–8 samples) |
| Voice | Samples of headings, body copy, CTAs |

It then synthesizes a `brand.json`, generates a `BRAND.md`, and registers the result as a reusable `user:<id>` design system in OpenDesign.

### 2.2 Step-by-Step Execution

#### Step 1: Open OpenDesign
Launch the app:
```bash
open "/Applications/Open Design.app"
```

#### Step 2: Open the Chat / Agent Interface
The main interface is a chat panel where you type requests to the agent (`amr`).

#### Step 3: Trigger the Brand Extraction
Type (or paste) the following prompt into the chat:

> Extract the brand from https://ninegate.me

Or, more explicitly:

> Run brand-extract on https://ninegate.me. Build a complete brand kit: colors, typography, logo, imagery, and voice samples. Register the result as a design system.

#### Step 4: Wait for the Agent to Execute
The agent will:
1. Open an in-app browser tab to `https://ninegate.me`
2. Measure the page (DOM + computed CSS)
3. Harvest colors, fonts, logos, images, voice
4. Write `brand.json` incrementally
5. Show a preview via `od brand preview <brandId>`
6. Finalize with `od brand finalize <brandId> --json`

#### Step 5: Confirm Finalization
If prompted, confirm the finalization step. The brand will be registered as a `user:<id>` design system.

### 2.3 Generated Files

After successful extraction, the following files are created:

| File | Location | Contents |
|---|---|---|
| `brand.json` | `~/Library/Application Support/Open Design/namespaces/release-stable/data/brands/<id>/brand.json` | Structured brand tokens (colors, fonts, logos, imagery paths, voice samples) |
| `BRAND.md` | `~/Library/Application Support/Open Design/namespaces/release-stable/data/brands/<id>/BRAND.md` | Human-readable brand specification |
| `logos/` | `~/Library/Application Support/Open Design/namespaces/release-stable/data/brands/<id>/logos/` | Extracted logo images |
| `imagery/` | `~/Library/Application Support/Open Design/namespaces/release-stable/data/brands/<id>/imagery/` | Extracted hero/cover images |
| `fonts/` | `~/Library/Application Support/Open Design/namespaces/release-stable/data/brands/<id>/fonts/` | Extracted font files (if downloadable) |
| Design System registration | OpenDesign internal registry | The brand becomes selectable in the Design System dropdown as `user:<id>` |

### 2.4 Verification

After extraction, verify that:
1. The new design system appears in the top-bar Design System dropdown
2. Colors match the Nine Gate palette (background `#0B0B0B`, accent `#FFB100`, surface `#131313`)
3. Typography shows "Inter" as the primary font family
4. The logo (`4-A.png` variant) is captured correctly

---

## 3. Phase 2: Code Import

### 3.1 When to Run Code Import

Run **Phase 2 (code-import) after Phase 1 (brand-extract) has completed successfully**.

The optimal moment is right after the brand design system is registered, so that `token-map` can map the extracted tokens against the newly created Nine Gate design system (rather than the default "Neutral Modern" system).

### 3.2 What `code-import` Does

The `code-import` atom reads the repository structure and produces a normalized snapshot:

| Output file | Contents |
|---|---|
| `code/index.json` | Full file tree with framework detection |
| `code/components.json` | Component inventory (HTML elements, classes, patterns) |
| `code/routes.json` | Page routing structure (all HTML pages) |
| `code/meta.json` | Framework, style system, component library metadata |

### 3.3 Step-by-Step Execution

#### Option A: Import from GitHub (Recommended)

In the OpenDesign chat, type:

> Import the codebase from https://github.com/alanpnielsen/nine-gate-web

Or more explicitly:

> Run code-import on the repository https://github.com/alanpnielsen/nine-gate-web. Detect framework, styling system, components, and routing. Generate the full code snapshot.

The agent will:
1. Clone or fetch the repository
2. Walk the file tree
3. Detect: vanilla HTML, single CSS file, vanilla JS (no framework)
4. Identify components (nav, footer, cards, lang toggle, etc.)
5. Map page routes (index, contacto, soluciones, como-trabajamos, cookies, terminos, privacidad)
6. Generate `code/index.json`, `code/components.json`, `code/routes.json`, `code/meta.json`

#### Option B: Import from Local Folder

If the repo is private or GitHub is not accessible:

> Import the codebase from the local folder /Users/alanpereyranielsen/nine-gate-web

### 3.4 Then Run `design-extract`

After code-import completes, run the token extraction:

> Extract design tokens from the imported code. Read the CSS files and extract colors, typography, spacing, radius, and shadows.

The `design-extract` atom will:
1. Read `styles.css`
2. Parse CSS custom properties from `:root`
3. Extract:
   - **Colors:** `--bg`, `--surface`, `--accent`, `--accent-glow`, `--text`, `--text-secondary`, `--text-muted`, `--border`, `--border-strong`
   - **Typography:** Inter font family, weights 400–900, `clamp()` sizes
   - **Spacing:** Padding values, grid gaps, section spacing
   - **Radius:** `--radius-sm`, `--radius-md`, `--radius-lg`
   - **Shadows:** `--shadow-sm`, `--shadow-md`, `--shadow-lg`, glassmorphism effects
4. Output `code/tokens.json` with `sources[]` and `usage[]` audit trail

### 3.5 Then Run `token-map`

Finally, map the extracted tokens onto the Nine Gate design system:

> Map the extracted tokens onto the Nine Gate design system. Match semantic roles: background, surface, accent, text, border.

The `token-map` atom will:
1. Read `code/tokens.json` from design-extract
2. Read the active design system (Nine Gate, from brand-extract)
3. Perform semantic token inference
4. Generate `token-map/colors.json`, `token-map/typography.json`, `token-map/spacing.json`
5. Flag any `token-map/unmatched.json` tokens that couldn't be mapped

---

## 4. Phase 3: Design System Creation

### 4.1 What Happens Automatically

After Phase 1 (brand-extract) and Phase 2 (code-import + design-extract + token-map), OpenDesign will have:

1. A **registered design system** (`user:<id>`) with brand tokens from the live site
2. A **code snapshot** with component inventory and route map
3. A **token bag** with extracted CSS custom properties
4. A **token mapping** connecting code tokens to design system semantics

### 4.2 Manual Refinement (Optional)

To refine the design system further, you can type:

> Update the Nine Gate design system with the extracted tokens. Set background to #0B0B0B, surface to #131313, accent to #FFB100, text to #FFFFFF, secondary text to #ABABAB. Font: Inter, weights 400-900. Border radius: 8px (sm), 12px (md), 16px (lg). Glassmorphism with backdrop-filter.

This will override any auto-detected values with the precise Nine Gate specifications.

### 4.3 New Artifact Generation

Once the design system is ready, you can generate canonical design artifacts:

> Generate a DESIGN.md for the Nine Gate design system

This creates a `DESIGN.md` in the standard 9-section format (palette, accent, typography, display, layout, mood, density, constraints, components) that can be used as the single source of truth for all future design work.

---

## 5. Phase 4: Improvement Proposals

### 5.1 Using `redesign-skill`

With the design system active and code imported, run:

> Run redesign-skill on the Nine Gate project. Audit the current design and propose improvements without changing the brand identity.

The skill will:
1. **Scan** the codebase structure (already imported)
2. **Diagnose** across 8 dimensions:
   - Typography hierarchy and scale
   - Color/surfaces consistency
   - Layout responsiveness
   - Interactive states (hover, focus, active)
   - Content clarity
   - Component pattern consistency
   - Iconography quality
   - Code quality and CSS organization
3. **Output** a prioritized list of improvements with rationale

### 5.2 Using `design-review`

For a focused visual audit:

> Run design-review on the Nine Gate project. Capture before screenshots, audit the UI, and suggest priority fixes.

### 5.3 Using `od-design-refine`

For iterative refinement of specific artifacts:

> Run od-design-refine on the index.html artifact. Focus on clarity and hierarchy.

---

## 6. Phase 5: Implementation via OpenCode

### 6.1 Design-to-Implementation Handoff

Once OpenDesign has produced improvement proposals, the changes are implemented by OpenCode. The handoff works as follows:

1. **OpenDesign generates the spec** — `DESIGN.md`, `tokens.css`, `BRAND.md`
2. **OpenCode reads the spec** — Use the skill sharing mechanism documented in OpenDesign's `AGENTS.md`:
   > *"Copy the upstream folder into your active agent's skills directory (Claude Code, Codex, Cursor, etc.)"*
3. **OpenCode implements** — Apply the proposed changes following the design system tokens

### 6.2 Files to Share with OpenCode

After the design system is ready, these are the key files OpenCode needs:

| File | What it provides |
|---|---|
| `DESIGN.md` | Complete visual intent, constraints, and component vocabulary |
| `tokens.css` | Exact CSS custom properties matching the design system |
| `BRAND.md` | Brand identity guidelines |
| `design-tokens.json` | Structured token data (colors, typography, spacing) |
| `critique.json` (if generated) | Audit findings and improvement priorities |

### 6.3 Manual Reference for OpenCode

When asking OpenCode to implement changes, reference the design system directly:

> Use the Nine Gate design system (background #0B0B0B, accent #FFB100, surface #131313, font Inter). Apply the changes proposed in the redesign audit.

---

## 7. Complete Workflow

### 7.1 Flow Diagram

```
IDEA or FEATURE REQUEST
       │
       ▼
┌─────────────────────────────────────┐
│  PHASE 1: OpenDesign Brand Extract  │
│  ─────────────────────────────────  │
│  Input:  https://ninegate.me        │
│  Skill:  brand-extract              │
│  Output: BRAND.md, brand.json,      │
│          registered design system   │
└──────────────┬──────────────────────┘
               ▼
┌─────────────────────────────────────┐
│  PHASE 2: OpenDesign Code Import    │
│  ────────────────────────────────   │
│  Input:  GitHub repo URL            │
│  Atoms:  code-import →              │
│          design-extract →           │
│          token-map                  │
│  Output: tokens.json,               │
│          component inventory,       │
│          route map                  │
└──────────────┬──────────────────────┘
               ▼
┌─────────────────────────────────────┐
│  PHASE 3: Design System Creation    │
│  ────────────────────────────────   │
│  Combine brand + code tokens        │
│  Refine manually if needed          │
│  Output: DESIGN.md, tokens.css,     │
│          design-tokens.json         │
└──────────────┬──────────────────────┘
               ▼
┌─────────────────────────────────────┐
│  PHASE 4: OpenDesign Proposes       │
│  ────────────────────────────────   │
│  Skill: redesign-skill              │
│         design-review               │
│         od-design-refine            │
│  Output: prioritized improvements,  │
│          critique.json              │
└──────────────┬──────────────────────┘
               ▼
┌─────────────────────────────────────┐
│  PHASE 5: OpenCode Implements       │
│  ────────────────────────────────   │
│  Reads DESIGN.md + tokens.css       │
│  Applies changes to HTML/CSS/JS     │
│  Maintains brand identity           │
│  Output: updated project files      │
└──────────────┬──────────────────────┘
               ▼
┌─────────────────────────────────────┐
│  GIT: Commit + Push to main         │
│  ────────────────────────────────   │
│  git add .                          │
│  git commit -m "..."                │
│  git push origin main               │
└──────────────┬──────────────────────┘
               ▼
┌─────────────────────────────────────┐
│  VERCEL: Auto Deploy                │
│  ────────────────────────────────   │
│  Connected via GitHub               │
│  Automatic deploy on push           │
│  Verify at https://ninegate.me      │
└─────────────────────────────────────┘
```

### 7.2 Workflow Phases Summary

| Phase | Tool | Action | Duration | Dependency |
|---|---|---|---|---|
| 0 | — | Feature request or improvement idea | — | — |
| 1 | OpenDesign | `brand-extract` from ninegate.me | ~2 min | ninegate.me must be online |
| 2 | OpenDesign | `code-import` → `design-extract` → `token-map` from GitHub | ~3 min | Phase 1 complete |
| 3 | OpenDesign | Refine and finalize design system | ~5 min | Phase 2 complete |
| 4 | OpenDesign | `redesign-skill` or `design-review` | ~5 min | Phase 3 complete |
| 5 | OpenCode | Implement proposed changes | Varies | Phase 4 complete |
| 6 | Git | Commit and push to main | ~1 min | Phase 5 complete |
| 7 | Vercel | Automatic deploy | ~2 min | Phase 6 complete |

### 7.3 One-Time Setup vs. Recurring

| Step | Frequency |
|---|---|
| Phase 1: Brand extract | **One-time** (run once, update only if brand changes) |
| Phase 2: Code import | **One-time** (run once, re-import if project structure changes significantly) |
| Phase 3: Design system | **One-time creation**, then iterative refinement |
| Phase 4: Improvement proposals | **Per feature / per sprint** |
| Phase 5: Implementation | **Per feature / per sprint** |
| Phase 6: Git push | **Per change** |
| Phase 7: Vercel deploy | **Automatic on push** |

---

## 8. File Locations

### 8.1 OpenDesign Storage Paths

```
~/Library/Application Support/Open Design/
└── namespaces/release-stable/data/
    ├── app-config.json           # Active configuration
    ├── app.sqlite                # Main database
    ├── brands/
    │   └── <brand-id>/
    │       ├── brand.json
    │       ├── BRAND.md
    │       ├── logos/
    │       ├── imagery/
    │       └── fonts/
    ├── projects/
    │   └── <project-id>/
    │       └── code/
    │           ├── index.json
    │           ├── components.json
    │           ├── routes.json
    │           ├── meta.json
    │           └── tokens.json
    ├── token-map/
    │   ├── colors.json
    │   ├── typography.json
    │   ├── spacing.json
    │   └── unmatched.json
    ├── design-systems/           # User-registered design systems
    ├── artifacts/                # Generated artifacts
    ├── critique-artifacts/       # Critique results
    ├── runs/                     # Agent run logs
    ├── library/                  # Global asset library
    └── memory/                   # Agent memory and user profile
```

### 8.2 Nine Gate Project Paths

```
/Users/alanpereyranielsen/nine-gate-web/
├── index.html              # Landing page
├── contacto.html           # Contact page
├── soluciones.html         # Solutions page
├── como-trabajamos.html    # How we work page
├── cookies.html            # Cookie policy
├── terminos.html           # Terms of service
├── privacidad.html         # Privacy policy
├── styles.css              # All styles
├── script.js               # All JavaScript
├── 4-A.png                 # Logo
├── favicon.ico / .png      # Favicons
└── apple-touch-icon.png    # Apple icon
```

---

## 9. Troubleshooting

### 9.1 Brand Extraction Fails

| Symptom | Likely Cause | Solution |
|---|---|---|
| "Could not reach URL" | ninegate.me is down or not publicly accessible | Verify the site is online. Try with `http://localhost:8080` locally |
| "No colors detected" | Site uses inline styles or JS-injected CSS | Ensure the page loads fully before measurement. Try a different browser profile |
| "Font not detected" | Google Fonts loaded async | Reload the page and re-run. The browser measurement should capture `@font-face` |
| "Logo not found" | Logo is an `<img>` tag, not SVG/favicon | The skill should still detect it. Point manually if needed |

### 9.2 Code Import Fails

| Symptom | Likely Cause | Solution |
|---|---|---|
| "Repository not accessible" | Private repo or no network | Use the local folder path instead: `/Users/alanpereyranielsen/nine-gate-web` |
| "No framework detected" | Vanilla HTML/CSS/JS is correct — not an error | The output will show "none" for framework, which is accurate |
| "Token extraction empty" | CSS custom properties not parsed | Verify `styles.css` uses `:root { ... }` syntax with `--*` variables |

### 9.3 Design System Not Appearing

| Symptom | Likely Cause | Solution |
|---|---|---|
| New design system not in dropdown | Brand finalization may have failed | Re-run: "Finalize the brand and register it as a design system" |
| Tokens don't match project | Wrong values extracted | Manually override: "Update the design system with these exact values: ..." |

### 9.4 OpenCode Integration Issues

| Symptom | Likely Cause | Solution |
|---|---|---|
| OpenCode doesn't see the design system | Files not shared | Copy `DESIGN.md` and `tokens.css` from the OpenDesign data directory into the project root for OpenCode to reference |
| Design drift between OD and code | Manual changes not reflected in OD | Periodically re-run `design-extract` to sync tokens back to OpenDesign |

---

## Appendix: Key OpenDesign Skills & Atoms Reference

| Name | Type | Trigger Phrase |
|---|---|---|
| `brand-extract` | Skill | "Extract the brand from [URL]" |
| `redesign-skill` | Skill | "Redesign existing project" |
| `design-review` | Skill | "Design review" |
| `web-clone` | Skill | "Clone website [URL]" |
| `code-import` | Atom (plugin) | "Import the codebase from [repo/path]" |
| `design-extract` | Atom (plugin) | "Extract design tokens from the imported code" |
| `token-map` | Atom (plugin) | "Map extracted tokens onto the design system" |
| `critique-theater` | Atom (plugin) | "Critique the current artifact" |
| `od-code-migration` | Scenario (plugin) | Full pipeline automation |
| `od-design-refine` | Scenario (plugin) | "Refine the current artifact" |
| `npx opendesign convert` | CLI tool | Convert design files to `.octopus` format |

---

*Document prepared for the Nine Gate project. OpenDesign v0.15.1, OpenCode (latest).*
