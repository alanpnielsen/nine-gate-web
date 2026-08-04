# Nine Gate — Rediseño Premium de Sitio Web
## Plan de Rediseño Completo

---

## 1. ANÁLISIS DEL ESTADO ACTUAL

### Fortalezas
- **Identidad clara**: Dark theme profesional, acento amarillo (#FFB100) distintivo
- **Arquitectura sólida**: Vanilla HTML/CSS/JS sin dependencias, rendimiento excelente
- **Contenido estratégico**: Copy enfocado en valor empresarial, metodología clara (8 pasos)
- **Componentes reutilizables**: Cards, grids, botones, navigation consistentes
- **Internacionalización**: i18n client-side ES/EN funcional
- **Despliegue simple**: Netlify, zero build step

### Debilidades Críticas (del PROJECT_ANALYSIS.md)
- **Accesibilidad**: Sin `<main>`, sin focus-visible, sin skip-link, ARIA solo en ES
- **SEO**: Sin Open Graph, Twitter Cards, canonical, JSON-LD, sitemap, robots.txt
- **Navegación rota**: Hash `#como-funciona` inexistente, hashes cross-page inválidos
- **HTML semántico**: Falta `<h1>` en 2 páginas, landmark `<header>` ausente
- **Código duplicado**: Nav, footer, legal-template, back-link repetidos en 7 archivos
- **CSS inline**: ~42 líneas duplicadas en 3 páginas legales + back-link en 4 páginas
- **JS muerto**: Contador hero (`.hero__stat-num` no existe), formulario contacto inexistente

---

## 2. VISIÓN DEL REDESIGN

### Principios de Diseño
| Principio | Aplicación |
|-----------|------------|
| **Minimalismo funcional** | Espacio en blanco generoso, jerarquía tipográfica clara, cero decoración innecesaria |
| **Confianza empresarial** | UI limpia, micro-interacciones sutiles, copy directo, pruebas sociales visibles |
| **Innovación sutil** | Gradientes controlados, glassmorphism restringido, motion purposeful |
| **Accesibilidad first** | WCAG 2.1 AA nativo, no como afterthought |
| **Performance by default** | Sin build step, CSS optimizado, fonts preloaded, images optimizadas |

### Referencias Estilísticas (inspiración, no copia)
- **Linear.app** — tipografía, spacing, dark mode execution
- **Vercel.com** — hero minimal, social proof, developer trust signals
- **Anthropic.com** — AI brand voice, clarity over cleverness
- **Stripe.com** — component consistency, motion restraint
- **Retool.com** — B2B SaaS density, technical credibility

---

## 3. SISTEMA DE DISEÑO ACTUALIZADO

### 3.1 Paleta de Colores (Refinada)

```css
:root {
  /* Core - Dark theme base */
  --bg: #0A0A0B;           /* Negro puro, más profundo */
  --bg-elevated: #111113;  /* Surface elevation 1 */
  --surface: #18181B;      /* Cards, panels */
  --surface-hover: #1F1F23; /* Interactive hover */
  
  /* Text hierarchy */
  --text: #FAFAFA;         /* Primary - near white */
  --text-secondary: #A1A1AA; /* Secondary - zinc 400 */
  --text-muted: #71717A;   /* Tertiary - zinc 500 */
  --text-inverse: #0A0A0B; /* On accent */
  
  /* Brand - Nine Gate Yellow/Amber */
  --accent: #FFB100;       /* Primary brand (mantenido) */
  --accent-hover: #FFC107; /* Lighter on hover */
  --accent-muted: rgba(255, 177, 0, 0.12);
  --accent-glow: rgba(255, 177, 0, 0.18);
  --accent-strong: rgba(255, 177, 0, 0.35);
  
  /* Semantic */
  --success: #22C55E;      /* Green 500 */
  --success-muted: rgba(34, 197, 94, 0.12);
  --error: #EF4444;        /* Red 500 */
  --info: #38BDF8;         /* Sky 400 */
  
  /* Borders */
  --border: rgba(255, 255, 255, 0.06);
  --border-strong: rgba(255, 255, 255, 0.1);
  --border-focus: var(--accent);
  
  /* Radius scale */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;
  --radius-full: 9999px;
  
  /* Shadows - restrained */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.35);
  --shadow-lg: 0 12px 32px rgba(0,0,0,0.4);
  --shadow-glow: 0 0 40px rgba(255,177,0,0.15);
  
  /* Spacing scale (4px base) */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-5: 20px;  --space-6: 24px;
  --space-8: 32px;  --space-10: 40px; --space-12: 48px;
  --space-16: 64px; --space-20: 80px; --space-24: 96px;
  
  /* Typography */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Fluid type scale */
  --text-xs: clamp(0.7rem, 0.65rem + 0.25vw, 0.75rem);
  --text-sm: clamp(0.825rem, 0.775rem + 0.25vw, 0.875rem);
  --text-base: clamp(0.95rem, 0.875rem + 0.375vw, 1rem);
  --text-lg: clamp(1.1rem, 1rem + 0.5vw, 1.25rem);
  --text-xl: clamp(1.3rem, 1.15rem + 0.75vw, 1.5rem);
  --text-2xl: clamp(1.6rem, 1.35rem + 1.25vw, 2rem);
  --text-3xl: clamp(2rem, 1.65rem + 1.75vw, 2.75rem);
  --text-4xl: clamp(2.5rem, 2rem + 2.5vw, 3.5rem);
  --text-5xl: clamp(3.5rem, 2.75rem + 3.75vw, 5rem);
  
  /* Layout */
  --max-w: 1200px;
  --nav-h: 72px;
  --section-space: clamp(80px, 10vw, 120px);
  
  /* Transitions */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;
}
```

### 3.2 Tipografía — Inter (Upgrade)
- **Pesos**: 400, 500, 600, 700 (eliminar 900, no usado)
- **Variable font**: Inter Variable (single file, mejor performance)
- **Display**: Títulos hero usan `font-weight: 700`, `letter-spacing: -0.03em`
- **UI**: Labels/botones `font-weight: 600`, `letter-spacing: 0.02em`
- **Body**: `font-weight: 400`, `line-height: 1.7`

### 3.3 Componentes Base (Design Tokens)

| Componente | Variantes | Estados |
|------------|-----------|---------|
| **Button** | primary, secondary, ghost, outline | hover, focus-visible, active, disabled, loading |
| **Card** | default, elevated, interactive, bordered | hover, focus-within |
| **Input** | default, error, success | focus, disabled |
| **Badge** | default, accent, success, info | - |
| **Link** | inline, standalone | hover, focus-visible, visited |
| **Icon** | 16, 20, 24, 32px | - |

---

## 4. CAMBIOS ESTRUCTURALES POR ARCHIVO

### 4.1 Archivos Nuevos a Crear

```
/nine-gate-web/
├── components/              # Partials reutilizables
│   ├── head.html           # <head> completo con SEO, OG, JSON-LD
│   ├── nav.html            # Navigation completa (desktop + mobile)
│   ├── footer.html         # Footer completa
│   ├── back-link.html      # Componente back-link
│   └── lang-toggle.html    # Language toggle component
├── data/
│   ├── i18n/
│   │   ├── es.json         # Traducciones ES
│   │   └── en.json         # Traducciones EN
│   ├── services.json       # Datos de servicios
│   ├── solutions.json      # Datos de soluciones
│   ├── process-steps.json  # 8 pasos metodología
│   ├── benefits.json       # 4 beneficios
│   ├── use-cases.json      # 5 casos de uso
│   └── company.json        # Info empresa, contacto, redes
├── assets/
│   ├── css/
│   │   ├── tokens.css      # Design tokens (CSS custom properties)
│   │   ├── base.css        # Reset, typography, utilities
│   │   ├── components.css  # Component styles
│   │   ├── layout.css      # Grid, sections, responsive
│   │   └── pages.css       # Page-specific overrides
│   └── js/
│       ├── main.js         # Entry point
│       ├── i18n.js         # Language system
│       ├── navigation.js   # Mobile nav, scroll spy
│       ├── reveal.js       # Scroll animations
│       └── analytics.js    # Event tracking (GA4/plausible ready)
├── sitemap.xml             # Auto-generado
├── robots.txt              # Configuración crawlers
├── .gitignore              # Excluir node_modules, .DS_Store, etc.
└── build.js                # Script simple para inyectar partials + minificar
```

### 4.2 Páginas HTML — Estructura Unificada

Todas las páginas siguen este template:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <!-- Incluye components/head.html + page-specific meta -->
</head>
<body>
  <!-- Incluye components/nav.html -->
  
  <main id="main-content" role="main">
    <!-- Page-specific content -->
  </main>
  
  <!-- Incluye components/footer.html -->
  
  <script type="module" src="assets/js/main.js"></script>
</body>
</html>
```

### 4.3 Cambios por Página

#### `index.html` (Home) — Landing Premium
- **Hero**: Simplificado, copy más punchy, CTA principal destacado, trust signals (logos clientes, métricas)
- **Arquitectura**: Flow horizontal en desktop, vertical en mobile — animación de entrada escalonada
- **Servicios**: Grid 4 columnas → cards con icono, título, descripción, link "Ver más"
- **Beneficios**: 4 métricas clave con animación de contador (implementada real)
- **Casos de uso**: Grid 2x3 (5 items + 1 CTA card "Ver todas las soluciones")
- **Social Proof**: Nueva sección — logos clientes, testimonio, certificaciones
- **CTA Final**: Full-width, gradient border, dual CTA (WhatsApp + Email)

#### `soluciones.html` — Catálogo Completo
- **Hero**: Page header con breadcrumb, título, descripción
- **Filtros**: Tags clickeables (Ventas, Operaciones, Soporte, RRHH, Marketing, Técnico)
- **Grid**: 10 cards responsivas (5 cols → 3 → 2 → 1)
- **Card mejorada**: Código, título, descripción, tags, hover con preview
- **CTA lateral**: Sticky en desktop "¿No ves tu caso? Hablemos"

#### `como-trabajamos.html` — Metodología Detallada
- **Hero**: Page header
- **Timeline**: 8 pasos en timeline vertical (desktop: alternado izq/der)
- **Cada paso**: Número, tag, título, descripción, deliverables, timeline, herramientas
- **FAQ**: Acordeón con preguntas frecuentes del proceso
- **CTA**: "Inicia tu diagnóstico"

#### `contacto.html` — Conversión Optimizada
- **Hero**: Page header + value prop breve
- **Layout 2-col**: Info contacto (WhatsApp, Email, Calendly) | Formulario funcional
- **Formulario**: Netlify Forms / Formspree ready — nombre, email, empresa, servicio, mensaje
- **Preparación**: Card "Cómo preparar la reunión" (existente, mejorada)
- **Trust**: Logos, respuesta <24h, NDA opcional

#### Páginas Legales (`privacidad.html`, `terminos.html`, `cookies.html`)
- **Hero**: Page header minimal
- **Contenido**: Igual, pero con `<main>`, `<article>`, `<section>` semánticos
- **Nav/Footer**: Versión simplificada consistente
- **i18n**: Traducciones completas EN/ES
- **TOC**: Tabla de contenidos sticky en desktop

---

## 5. MEJORAS UX/UI ESPECÍFICAS

### 5.1 Navegación
- **Desktop**: Logo + 5 links + Lang toggle + CTA "Empezar"
- **Mobile**: Drawer lateral (no overlay), animación 300ms, focus trap
- **Scroll behavior**: Nav se oculta al scroll down, aparece al scroll up
- **Active state**: `aria-current="page"` + estilo visual sutil
- **Skip link**: Primer elemento en `<body>` — "Saltar al contenido principal"

### 5.2 Hero & Above-the-fold
- **Headline**: Máximo 10 palabras, value prop clara
- **Subhead**: 1 frase, beneficio cuantificable
- **CTA Primary**: WhatsApp (canal principal) — tracking event
- **CTA Secondary**: "Ver soluciones" → anchor scroll
- **Trust signals**: "Confiado por X empresas", "Respuesta < 24h", "Implementación en semanas"
- **Visual**: Chat mockup interactivo (hover pausa auto-scroll) O diagrama arquitectura simplificado

### 5.3 Conversión
- **WhatsApp float**: Solo en mobile, hide en desktop (redundante con nav CTA)
- **Exit intent**: Solo mobile — "¿Te vas? Agenda 15 min gratis"
- **Form validation**: Real-time, inline errors, success toast
- **Thank you**: Modal + redirect a Calendly/Thanks page

### 5.4 Motion & Interaction
- **Scroll reveal**: IntersectionObserver, stagger 50ms, `prefers-reduced-motion` respected
- **Hover cards**: Transform Y -4px, border accent, shadow glow — 200ms
- **Button press**: Scale 0.98, 100ms
- **Lang toggle**: Slide animation entre ES/EN
- **Mobile nav**: Slide-in right, backdrop blur, body scroll lock
- **Page transitions**: View Transitions API (progressive enhancement)

---

## 6. ACCESIBILIDAD (WCAG 2.1 AA)

### Checklist Obligatorio
- [x] **Semantic HTML**: `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`
- [x] **Heading hierarchy**: h1 → h2 → h3 (no saltos)
- [x] **Focus visible**: `:focus-visible` en TODOS los interactivos
- [x] **Skip link**: Primer focusable element
- [x] **ARIA labels**: Dinámicos por idioma (i18n)
- [x] **Color contrast**: 4.5:1 normal, 3:1 large/text UI
- [x] **Reduced motion**: `@media (prefers-reduced-motion: reduce)`
- [x] **Keyboard nav**: Tab order lógico, focus trap en modales/drawer
- [x] **Alt text**: Imágenes informativas descritas, decorativas `alt=""`
- [x] **Forms**: Labels asociados, error messages `aria-describedby`, `aria-invalid`
- [x] **Language**: `lang` attribute + `hreflang` en head

### Testing
- **axe-core** en CI
- **Lighthouse** > 95 a11y score
- **Screen readers**: NVDA (Win), VoiceOver (Mac/iOS), TalkBack (Android)
- **Keyboard only**: Full navigation test

---

## 7. SEO TÉCNICO COMPLETO

### 7.1 Meta Tags por Página
```html
<!-- Obligatorios -->
<title>Nine Gate — Automatización Inteligente para Empresas</title>
<meta name="description" content="Diseñamos agentes de IA, automatizaciones n8n e integraciones que reducen costos 60% y escalan operaciones 24/7. Diagnóstico gratis.">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="canonical" href="https://ninegate.me/">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://ninegate.me/">
<meta property="og:title" content="Nine Gate — Automatización Inteligente para Empresas">
<meta property="og:description" content="Agentes IA, n8n, integraciones WhatsApp/CRM/ERP. Reducí trabajo manual 70%. Diagnóstico gratis.">
<meta property="og:image" content="https://ninegate.me/assets/og-default.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="es_AR">
<meta property="og:locale:alternate" content="en_US">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Nine Gate — Automatización Inteligente para Empresas">
<meta name="twitter:description" content="Agentes IA, n8n, integraciones WhatsApp/CRM/ERP. Reducí trabajo manual 70%.">
<meta name="twitter:image" content="https://ninegate.me/assets/og-default.jpg">

<!-- JSON-LD Organization -->
<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Nine Gate",
  "url": "https://ninegate.me",
  "logo": "https://ninegate.me/assets/logo.png",
  "sameAs": ["https://wa.me/5492915052439", "mailto:contacto@ninegate.me"],
  "address": {"@type": "PostalAddress", "addressCountry": "AR"},
  "priceRange": "$$$"
}</script>
```

### 7.2 JSON-LD por Tipo de Página
| Página | Schema |
|--------|--------|
| Home | `WebSite`, `Organization`, `Service` (x4) |
| Soluciones | `ItemList` + `Service` (x10) |
| Cómo trabajamos | `HowTo` (8 steps) |
| Contacto | `ContactPage`, `Organization` |
| Legales | `WebPage` |

### 7.3 Archivos Técnicos
- **sitemap.xml**: 7 URLs + `lastmod`, `changefreq`, `priority`
- **robots.txt**: Allow all, sitemap reference, no AI training opt-out
- **security.txt**: Contacto seguridad

---

## 8. PERFORMANCE & CORE WEB VITALS

### Objetivos
| Métrica | Target |
|---------|--------|
| LCP | < 2.0s |
| INP | < 200ms |
| CLS | < 0.1 |
| FCP | < 1.5s |
| TTI | < 2.5s |
| Lighthouse Performance | > 95 |

### Optimizaciones
- **Fonts**: `preload` Inter Variable WOFF2, `font-display: swap`
- **CSS**: Critical CSS inlined, rest `media="print" onload`
- **JS**: ES Modules, `defer`, code-split por página
- **Images**: WebP/AVIF, `srcset`, `sizes`, lazy-load nativo, LCP image `fetchpriority="high"`
- **Cache**: `Cache-Control: public, max-age=31536000, immutable` para assets versionados
- **Compression**: Brotli/Gzip en Netlify (automático)
- **No render-blocking**: Todo CSS/JS non-blocking

---

## 9. ARQUITECTURA FRONTEND MODERNA

### 9.1 Estructura CSS Modular
```
assets/css/
├── tokens.css        # Design tokens (custom properties)
├── base.css          # Reset, typography, utilities, accessibility
├── components.css    # Button, Card, Badge, Input, Nav, Footer, etc.
├── layout.css        # Container, Grid, Section, Responsive breakpoints
├── pages/
│   ├── home.css
│   ├── solutions.css
│   ├── process.css
│   ├── contact.css
│   └── legal.css
└── main.css          # Importa todo (build output)
```

### 9.2 JavaScript — ES Modules Pattern
```javascript
// assets/js/main.js
import { initI18n } from './i18n.js';
import { initNavigation } from './navigation.js';
import { initReveal } from './reveal.js';
import { initForms } from './forms.js';
import { initAnalytics } from './analytics.js';

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initNavigation();
  initReveal();
  initForms();
  initAnalytics();
});
```

### 9.3 i18n System — Build-time + Runtime
- **Build**: Inyectar traducciones en HTML (SSG ligero via `build.js`)
- **Runtime**: Toggle instantáneo sin recarga, persistencia `localStorage`
- **SEO**: `hreflang` + URLs separadas `/en/` en roadmap futuro

---

## 10. PLAN DE IMPLEMENTACIÓN

### Fase 1: Foundation (Día 1-2)
- [ ] Crear estructura `components/`, `data/`, `assets/css/`, `assets/js/`
- [ ] Definir `tokens.css` con design system completo
- [ ] Crear `base.css` (reset, typography, utilities, a11y)
- [ ] Crear partials: `head.html`, `nav.html`, `footer.html`, `back-link.html`, `lang-toggle.html`
- [ ] Migrar traducciones a `data/i18n/es.json` + `en.json`
- [ ] Crear `build.js` (Node) para inyectar partials + validar HTML

### Fase 2: Component Library (Día 2-3)
- [ ] `components.css` — Button, Card, Badge, Input, Nav, Footer, LangToggle
- [ ] `layout.css` — Container, Grid, Section, Responsive
- [ ] `navigation.js` — Mobile drawer, scroll hide/show, active states
- [ ] `i18n.js` — Sistema traducciones runtime + build
- [ ] `reveal.js` — Scroll animations con stagger + reduced motion

### Fase 3: Páginas (Día 3-5)
- [ ] `index.html` — Hero, Arquitectura, Servicios, Beneficios, Casos, Social Proof, CTA
- [ ] `soluciones.html` — Filtros, Grid 10 cards, CTA sticky
- [ ] `como-trabajamos.html` — Timeline 8 pasos, FAQ, CTA
- [ ] `contacto.html` — Form funcional (Netlify Forms), info contacto, preparación
- [ ] `privacidad.html`, `terminos.html`, `cookies.html` — Semántica, TOC, i18n completo

### Fase 4: SEO & Technical (Día 5)
- [ ] `head.html` con todos meta tags, OG, Twitter, JSON-LD por página
- [ ] `sitemap.xml` generado
- [ ] `robots.txt`
- [ ] `.gitignore`
- [ ] Optimización fonts (preload, variable font)
- [ ] Critical CSS inlining via build

### Fase 5: QA & Launch (Día 6)
- [ ] Testing responsive (320, 768, 1024, 1440, 1920)
- [ ] Testing a11y (axe, Lighthouse, screen readers, keyboard)
- [ ] Testing performance (Lighthouse, WebPageTest)
- [ ] Testing cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Testing i18n (ES/EN, persistence, SEO tags)
- [ ] Deploy preview → QA → Production

---

## 11. MANTENIMIENTO Y ESCALABILIDAD

### Convenciones
- **BEM modificado**: `.component__element--modifier`
- **CSS**: Mobile-first, custom properties para theming
- **JS**: Single responsibility modules, event-driven
- **Data-driven**: Contenido en JSON, templates en HTML

### Roadmap Post-Launch
1. **i18n routing**: `/en/` subdirectory + hreflang
2. **Blog/Resources**: CMS headless (Notion/Contentful) + SSG
3. **Analytics**: Plausible/GA4 + event tracking dashboard
4. **A/B testing**: Hero variants, CTA copy
5. **Client portal**: Área logada para clientes activos

---

## 12. ENTREGABLES

| Archivo | Descripción |
|---------|-------------|
| `REDESIGN_PLAN.md` | Este documento |
| `components/*.html` | 5 partials reutilizables |
| `data/i18n/*.json` | Traducciones completas |
| `data/*.json` | Contenido estructurado (services, solutions, etc.) |
| `assets/css/*.css` | Design system modular |
| `assets/js/*.js` | JS modular ES6 |
| `build.js` | Build script (Node, zero deps) |
| `*.html` | 7 páginas refactorizadas |
| `sitemap.xml`, `robots.txt`, `.gitignore` | Técnicos |
| `OG_IMAGE.jpg` | 1200x630 para social sharing |

---

## 13. APROBACIÓN Y PRÓXIMOS PASOS

**¿Aprobado para proceder con la implementación?**

Si sí, iniciar **Fase 1** inmediatamente. Estimación: **6 días de trabajo** para entrega completa lista para producción.

**Decisiones pendientes tuyas:**
1. **Formulario backend**: Netlify Forms (gratis, 100/mes) vs Formspree vs custom endpoint
2. **Analytics**: Plausible (privacy-first, $9/mes) vs GA4 (gratis, complejo) vs ambos
3. **Calendly embed** en contacto vs link externo
4. **Testimonios/logos clientes**: ¿Tenés material o usamos placeholders?
5. **Imágenes OG**: ¿Generamos diseño o usás existente?