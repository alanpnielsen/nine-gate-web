const toggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (toggle && navMenu) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });
}

const revealElements = document.querySelectorAll('[data-r]');

const revealObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  }
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

/* Architecture sequential node animation */
(function() {
  var flow = document.querySelector('.arch-flow');
  if (!flow) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var boxes = flow.querySelectorAll('.arch-node__box');
  var arrows = flow.querySelectorAll('.arch-flow__arrow');
  var STEP_MS = 600;
  var PAUSE_MS = 1800;
  var cycleTimeout = null;
  var stepTimeout = null;

  function resetAll() {
    boxes.forEach(function(b) { b.classList.remove('active'); });
    arrows.forEach(function(a) { a.classList.remove('active', 'pulse'); });
  }

  function activateNode(i) {
    if (i >= boxes.length) {
      cycleTimeout = setTimeout(function() {
        resetAll();
        activateNode(0);
      }, PAUSE_MS);
      return;
    }

    boxes[i].classList.add('active');

    if (i > 0) {
      arrows[i - 1].classList.add('active');
      arrows[i - 1].classList.remove('pulse');
      void arrows[i - 1].offsetWidth;
      arrows[i - 1].classList.add('pulse');
    }

    stepTimeout = setTimeout(function() {
      boxes[i].classList.remove('active');
      if (i > 0) arrows[i - 1].classList.remove('active');
      activateNode(i + 1);
    }, STEP_MS);
  }

  var seqObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        setTimeout(function() { activateNode(0); }, 800);
        seqObserver.unobserve(flow);
      }
    });
  }, { threshold: 0.15 });

  seqObserver.observe(flow);
})();

const counters = document.querySelectorAll('.hero__stat-num');

function animateCounters() {
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-c'), 10);
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      counter.textContent = current;
      if (progress < 1) requestAnimationFrame(update);
      else counter.textContent = target;
    }

    requestAnimationFrame(update);
  });
}

const heroObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      animateCounters();
      heroObserver.disconnect();
    }
  }
}, { threshold: 0.3 });

const heroSection = document.querySelector('.hero');
if (heroSection) heroObserver.observe(heroSection);

const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    const subject = encodeURIComponent('Nueva propuesta desde ninegate.ai');
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\nServicio: ${form.querySelector('#service').value}\n\nMensaje:\n${message}`
    );

    window.open(`mailto:hola@ninegate.ai?subject=${subject}&body=${body}`, '_blank');
    form.reset();
    alert('Gracias. Te responderemos en menos de 24 horas.');
  });
}

/* ===== LANGUAGE SWITCHER ===== */
const translations = {
  es: {
    'nav-servicios': 'Servicios',
    'nav-soluciones': 'Soluciones',
    'nav-como': 'Cómo trabajamos',
    'nav-casos': 'Casos de uso',
    'nav-contacto': 'Contacto',
    'nav-empezar': 'Empezar',
    'sol-tag': 'Soluciones',
    'sol-title-before': 'Procesos ',
    'sol-title-accent': 'concretos',
    'sol-desc': 'Automatizaciones pensadas para operación real.',
    'impl-tag': 'Implementación',
    'impl-title-before': 'Así convertimos un proceso manual en un ',
    'impl-title-accent': 'sistema funcionando',
    'impl-desc': 'Diseñamos el flujo, el estado, las reglas y la operación antes de pasar a producción.',
    'step-0-title': 'Brief',
    'step-0-desc': 'Mapeamos conversaciones y tareas reales',
    'step-1-title': 'Flow map',
    'step-1-desc': 'Detectamos reglas, datos y excepciones',
    'step-2-title': 'State schema',
    'step-2-desc': 'Diseñamos el estado del proceso',
    'step-3-title': 'n8n',
    'step-3-desc': 'Creamos el workflow en n8n',
    'step-4-title': 'Database',
    'step-4-desc': 'Integramos bases, APIs y paneles',
    'step-5-title': 'QA',
    'step-5-desc': 'Probamos con casos reales',
    'step-6-title': 'Monitoring',
    'step-6-desc': 'Activamos logs, monitoreo y handoff',
    'step-7-title': 'Production',
    'step-7-desc': 'Iteramos con datos reales',
    'how-title-before': 'Cómo',
    'how-title-accent': 'Funciona',
    'how-subtitle': 'Así se ve un proceso que se ejecuta solo.',
    'how-desc': 'Un disparador pone todo en marcha. Los datos fluyen entre tus sistemas, la IA decide y las acciones se ejecutan automáticamente, sin intervención manual.',
    'flow-0-title': 'Disparador',
    'flow-0-desc': 'Email · Formulario · API',
    'flow-1-title': 'Recopilar datos',
    'flow-1-desc': 'CRM · Hojas · Docs',
    'flow-2-title': 'Procesar con IA',
    'flow-2-desc': 'Clasifica y decide',
    'flow-3-title': 'Lógica de negocio',
    'flow-3-desc': 'Reglas y condiciones',
    'flow-4-title': 'Ejecutar acciones',
    'flow-4-desc': 'Crear · Enviar · Actualizar',
    'flow-5-title': 'Notificar equipo',
    'flow-5-desc': 'Slack · Email · Panel',
    'tag-entrada': 'Entrada',
    'tag-ia': 'Inteligencia Artificial',
    'tag-proceso': 'Proceso',
    'tag-salida': 'Salida',
    'hero-tag': 'Inteligencia Artificial para Empresas',
    'hero-title-before': 'Automatizamos procesos, conversaciones y decisiones empresariales ',
    'hero-title-accent': 'con IA.',
    'hero-subtitle': 'Diseñamos agentes inteligentes, automatizaciones y sistemas de inteligencia artificial que reducen costos, aumentan productividad y permiten escalar operaciones.',
    'hero-cta1': 'Solicitar Diagnóstico',
    'hero-cta2': 'Ver Soluciones',
    'arch-tag': 'Arquitectura',
    'arch-title-before': 'EL BOT NO \u201CRESPONDE\u201D: ',
    'arch-title-accent': 'TRABAJA',
    'arch-desc': 'Cada conversaci\u00F3n se convierte en datos, acciones y decisiones dentro de tu operaci\u00F3n.',
    'proc-tag': 'Metodolog\u00EDa',
    'proc-title-before': 'As\u00ED convertimos un proceso manual en un ',
    'proc-title-accent': 'sistema funcionando',
    'proc-desc': 'Dise\u00F1amos el flujo, el estado, las reglas y la operaci\u00F3n antes de pasar a producci\u00F3n.',
    'serv-tag': 'Servicios',
    'serv-title-before': 'Soluciones de IA para ',
    'serv-title-accent': 'tu negocio',
    'serv-desc': 'Desde agentes conversacionales hasta automatizaci\u00F3n de flujos completos.',
    'ben-tag': 'Beneficios',
    'ben-title-before': 'Resultados que marcan ',
    'ben-title-accent': 'la diferencia',
    'ben-desc': 'M\u00E9tricas reales de empresas que ya automatizaron con Nine Gate.',
    'case-tag': 'Casos de uso',
    'case-title-before': '\u00C1reas que transformamos ',
    'case-title-accent': 'con IA',
    'case-desc': 'Aplicaciones pr\u00E1cticas de inteligencia artificial en cada \u00E1rea de tu empresa.',
    'cta-title': '\u00BFListo para automatizar tu empresa?',
    'cta-desc': 'Descubr\u00ED c\u00F3mo Nine Gate puede ayudarte a implementar Inteligencia Artificial en tu negocio.',
    'cta-btn': 'Agendar Diagn\u00F3stico',
    'footer-brand': 'Automatizaci\u00F3n inteligente para empresas.',
    'footer-servicios': 'Servicios',
    'footer-empresa': 'Empresa',
    'footer-legal': 'Legal',
    'footer-redes': 'Redes',
    'footer-link-ia': 'Agentes de IA',
    'footer-link-auto': 'Automatizaci\u00F3n',
    'footer-link-int': 'Integraciones',
    'footer-link-cons': 'Consultor\u00EDa',
    'footer-link-casos': 'Casos de uso',
    'footer-link-contacto': 'Contacto',
    'footer-link-como': 'C\u00F3mo trabajamos',
    'footer-link-priv': 'Privacidad',
    'footer-link-term': 'T\u00E9rminos',
    'footer-link-cookies': 'Cookies',
    'footer-copy': '\u00A9 2026 Nine Gate. Todos los derechos reservados.',
    'footer-credit': 'Hecho con',
    'footer-opencode': 'con OpenCode',
    'lang-btn': 'EN',
    'back-link': '\u2190 Volver al inicio',
    'contact-title': 'Contacto',
    'contact-desc': 'Si quer\u00E9s evaluar una automatizaci\u00F3n para tu empresa, escribinos y contanos qu\u00E9 proceso quer\u00E9s mejorar.',
    'contact-email-title': 'Email',
    'contact-wa-title': 'WhatsApp',
    'contact-wa-btn': 'Escribir por WhatsApp',
    'contact-prepare-title': 'C\u00F3mo preparar el diagn\u00F3stico',
    'contact-prepare-desc': 'Para que podamos darte una propuesta precisa en menos de 24 horas, ayudanos con esto:',
    'contact-prepare-1': 'Describ\u00ED el proceso manual que quer\u00E9s automatizar.',
    'contact-prepare-2': 'Indic\u00E1 qu\u00E9 herramientas usa hoy tu equipo.',
    'contact-prepare-3': 'Cont\u00E1 qu\u00E9 datos entran, qu\u00E9 decisiones se toman y qu\u00E9 salida esper\u00E1s.',
    'serv-card1-title': 'Agentes de IA',
    'serv-card1-desc': 'Asistentes inteligentes para ventas, soporte y operaciones.',
    'serv-card2-title': 'Automatizaci\u00F3n de Procesos',
    'serv-card2-desc': 'Automatizaci\u00F3n de tareas repetitivas y flujos empresariales.',
    'serv-card3-title': 'Integraciones Inteligentes',
    'serv-card3-desc': 'Conexi\u00F3n entre WhatsApp, CRM, ERP, APIs y herramientas internas.',
    'serv-card4-title': 'Consultor\u00EDa IA',
    'serv-card4-desc': 'Dise\u00F1o e implementaci\u00F3n de estrategias de Inteligencia Artificial.',
    'ben-label1': 'menos trabajo manual',
    'ben-label2': 'disponibilidad total',
    'ben-label3': 'escalabilidad autom\u00E1tica',
    'ben-label4': 'reducci\u00F3n de costos operativos',
    'sol-items-0-title': 'Turnos y reservas',
    'sol-items-0-desc': 'Agenda, disponibilidad, confirmaciones y seguimiento.',
    'sol-items-1-title': 'Compras y proveedores',
    'sol-items-1-desc': 'B\u00FAsqueda, cotizaciones, comparaci\u00F3n y ranking.',
    'sol-items-2-title': 'Ventas por WhatsApp',
    'sol-items-2-desc': 'Pedidos, upsells, totales y estados.',
    'sol-items-3-title': 'Emails administrativos',
    'sol-items-3-desc': 'Lectura, clasificaci\u00F3n y respuestas asistidas.',
    'sol-items-4-title': 'Seguimiento de leads',
    'sol-items-4-desc': 'Tareas, recordatorios y cambios de estado.',
    'sol-items-5-title': 'Alertas internas',
    'sol-items-5-desc': 'Eventos cr\u00EDticos, faltantes y desv\u00EDos.',
    'sol-items-6-title': 'Dashboards operativos',
    'sol-items-6-desc': 'Conversaciones, reservas y pr\u00F3ximas acciones.',
    'sol-items-7-title': 'Scraping controlado',
    'sol-items-7-desc': 'Datos p\u00FAblicos, monitoreo y enriquecimiento.',
    'sol-items-8-title': 'Clasificaci\u00F3n de documentos',
    'sol-items-8-desc': 'PDFs, campos y registros ordenados.',
    'sol-items-9-title': 'Handoff humano',
    'sol-items-9-desc': 'Resumen, contexto y derivaci\u00F3n segura.',
    'case-card1-title': 'Ventas',
    'case-card1-desc': 'Automatizaci\u00F3n de calificaci\u00F3n de leads, seguimiento y cierre comercial.',
    'case-card2-title': 'Atenci\u00F3n al Cliente',
    'case-card2-desc': 'Respuestas instant\u00E1neas 24/7, resoluci\u00F3n de consultas y derivaci\u00F3n inteligente.',
    'case-card3-title': 'Recursos Humanos',
    'case-card3-desc': 'Filtrado de postulantes, entrevistas autom\u00E1ticas y onboarding digital.',
    'case-card4-title': 'Marketing',
    'case-card4-desc': 'Segmentaci\u00F3n de audiencias, generaci\u00F3n de contenido y an\u00E1lisis de campa\u00F1as.',
    'case-card5-title': 'Operaciones',
    'case-card5-desc': 'Sincronizaci\u00F3n de sistemas, generaci\u00F3n de reportes y control de gesti\u00F3n.',
  },
  en: {
    'nav-servicios': 'Services',
    'nav-soluciones': 'Solutions',
    'nav-como': 'How we work',
    'nav-casos': 'Use Cases',
    'nav-contacto': 'Contact',
    'nav-empezar': 'Get Started',
    'sol-tag': 'Solutions',
    'sol-title-before': 'Concrete ',
    'sol-title-accent': 'processes',
    'sol-desc': 'Automations designed for real operations.',
    'impl-tag': 'Implementation',
    'impl-title-before': 'How we turn a manual process into a ',
    'impl-title-accent': 'working system',
    'impl-desc': 'We design the flow, state, rules and operations before going to production.',
    'step-0-title': 'Brief',
    'step-0-desc': 'We map real conversations and tasks',
    'step-1-title': 'Flow map',
    'step-1-desc': 'We detect rules, data and exceptions',
    'step-2-title': 'State schema',
    'step-2-desc': 'We design the process state',
    'step-3-title': 'n8n',
    'step-3-desc': 'We build the workflow in n8n',
    'step-4-title': 'Database',
    'step-4-desc': 'We integrate databases, APIs and dashboards',
    'step-5-title': 'QA',
    'step-5-desc': 'We test with real cases',
    'step-6-title': 'Monitoring',
    'step-6-desc': 'We activate logs, monitoring and handoff',
    'step-7-title': 'Production',
    'step-7-desc': 'We iterate with real data',
    'how-title-before': 'How It ',
    'how-title-accent': 'Works',
    'how-subtitle': 'This is what a self-running process looks like.',
    'how-desc': 'A trigger sets everything in motion. Data flows between your systems, AI decides, and actions execute automatically, with no manual intervention.',
    'flow-0-title': 'Trigger',
    'flow-0-desc': 'Email · Form · API',
    'flow-1-title': 'Collect Data',
    'flow-1-desc': 'CRM · Sheets · Docs',
    'flow-2-title': 'Process with AI',
    'flow-2-desc': 'Classifies and decides',
    'flow-3-title': 'Business Logic',
    'flow-3-desc': 'Rules and conditions',
    'flow-4-title': 'Execute Actions',
    'flow-4-desc': 'Create · Send · Update',
    'flow-5-title': 'Notify Team',
    'flow-5-desc': 'Slack · Email · Dashboard',
    'tag-entrada': 'Input',
    'tag-ia': 'Artificial Intelligence',
    'tag-proceso': 'Process',
    'tag-salida': 'Output',
    'hero-tag': 'Artificial Intelligence for Business',
    'hero-title-before': 'We automate processes, conversations and business decisions ',
    'hero-title-accent': 'with AI.',
    'hero-subtitle': 'We design intelligent agents, automations and AI systems that reduce costs, increase productivity and scale operations.',
    'hero-cta1': 'Request Diagnosis',
    'hero-cta2': 'View Solutions',
    'arch-tag': 'Architecture',
    'arch-title-before': 'THE BOT DOESN\u2019T JUST \u201CREPLY\u201D: ',
    'arch-title-accent': 'IT WORKS',
    'arch-desc': 'Every conversation becomes data, actions and decisions inside your operation.',
    'proc-tag': 'Methodology',
    'proc-title-before': 'How we turn a manual process into a ',
    'proc-title-accent': 'working system',
    'proc-desc': 'We design the flow, state, rules and operation before going into production.',
    'serv-tag': 'Services',
    'serv-title-before': 'AI Solutions for ',
    'serv-title-accent': 'your business',
    'serv-desc': 'From conversational agents to full workflow automation.',
    'ben-tag': 'Benefits',
    'ben-title-before': 'Results that make ',
    'ben-title-accent': 'the difference',
    'ben-desc': 'Real metrics from companies that already automated with Nine Gate.',
    'case-tag': 'Use Cases',
    'case-title-before': 'Areas we transform ',
    'case-title-accent': 'with AI',
    'case-desc': 'Practical AI applications in every area of your business.',
    'cta-title': 'Ready to automate your business?',
    'cta-desc': 'Discover how Nine Gate can help you implement Artificial Intelligence in your business.',
    'cta-btn': 'Schedule Diagnosis',
    'footer-brand': 'Intelligent automation for businesses.',
    'footer-servicios': 'Services',
    'footer-empresa': 'Company',
    'footer-legal': 'Legal',
    'footer-redes': 'Social',
    'footer-link-ia': 'AI Agents',
    'footer-link-auto': 'Automation',
    'footer-link-int': 'Integrations',
    'footer-link-cons': 'Consulting',
    'footer-link-casos': 'Use Cases',
    'footer-link-contacto': 'Contact',
    'footer-link-como': 'How we work',
    'footer-link-priv': 'Privacy',
    'footer-link-term': 'Terms',
    'footer-link-cookies': 'Cookies',
    'footer-copy': '\u00A9 2026 Nine Gate. All rights reserved.',
    'footer-credit': 'Made with',
    'footer-opencode': 'with OpenCode',
    'lang-btn': 'ES',
    'back-link': '\u2190 Back to home',
    'contact-title': 'Contact',
    'contact-desc': 'If you want to evaluate an automation for your company, write to us and tell us which process you want to improve.',
    'contact-email-title': 'Email',
    'contact-wa-title': 'WhatsApp',
    'contact-wa-btn': 'Message us on WhatsApp',
    'contact-prepare-title': 'How to prepare for the diagnosis',
    'contact-prepare-desc': 'So we can give you an accurate proposal in less than 24 hours, help us with the following:',
    'contact-prepare-1': 'Describe the manual process you want to automate.',
    'contact-prepare-2': 'Tell us what tools your team currently uses.',
    'contact-prepare-3': 'Share what data comes in, what decisions are made, and what output you expect.',
    'serv-card1-title': 'AI Agents',
    'serv-card1-desc': 'Intelligent assistants for sales, support and operations.',
    'serv-card2-title': 'Process Automation',
    'serv-card2-desc': 'Automation of repetitive tasks and business workflows.',
    'serv-card3-title': 'Smart Integrations',
    'serv-card3-desc': 'Connection between WhatsApp, CRM, ERP, APIs and internal tools.',
    'serv-card4-title': 'AI Consulting',
    'serv-card4-desc': 'Design and implementation of Artificial Intelligence strategies.',
    'ben-label1': 'less manual work',
    'ben-label2': 'total availability',
    'ben-label3': 'automatic scalability',
    'ben-label4': 'operational cost reduction',
    'sol-items-0-title': 'Appointments & bookings',
    'sol-items-0-desc': 'Scheduling, availability, confirmations and tracking.',
    'sol-items-1-title': 'Purchasing & suppliers',
    'sol-items-1-desc': 'Search, quotes, comparison and ranking.',
    'sol-items-2-title': 'WhatsApp sales',
    'sol-items-2-desc': 'Orders, upsells, totals and status.',
    'sol-items-3-title': 'Admin emails',
    'sol-items-3-desc': 'Reading, classification and assisted responses.',
    'sol-items-4-title': 'Lead tracking',
    'sol-items-4-desc': 'Tasks, reminders and status changes.',
    'sol-items-5-title': 'Internal alerts',
    'sol-items-5-desc': 'Critical events, shortages and deviations.',
    'sol-items-6-title': 'Operational dashboards',
    'sol-items-6-desc': 'Conversations, bookings and next actions.',
    'sol-items-7-title': 'Controlled scraping',
    'sol-items-7-desc': 'Public data, monitoring and enrichment.',
    'sol-items-8-title': 'Document classification',
    'sol-items-8-desc': 'PDFs, fields and organized records.',
    'sol-items-9-title': 'Human handoff',
    'sol-items-9-desc': 'Summary, context and safe escalation.',
    'case-card1-title': 'Sales',
    'case-card1-desc': 'Lead qualification automation, follow-up and commercial closing.',
    'case-card2-title': 'Customer Support',
    'case-card2-desc': 'Instant 24/7 responses, query resolution and smart routing.',
    'case-card3-title': 'Human Resources',
    'case-card3-desc': 'Applicant filtering, automated interviews and digital onboarding.',
    'case-card4-title': 'Marketing',
    'case-card4-desc': 'Audience segmentation, content generation and campaign analysis.',
    'case-card5-title': 'Operations',
    'case-card5-desc': 'System synchronization, report generation and management control.',
  }
};

function setLang(lang) {
  const t = translations[lang];
  if (!t) return;

  document.documentElement.lang = lang;

  setText('nav-servicios', t['nav-servicios']);
  setText('nav-soluciones', t['nav-soluciones']);
  setText('nav-como', t['nav-como']);
  setText('nav-casos', t['nav-casos']);
  setText('nav-contacto', t['nav-contacto']);
  setText('nav-empezar', t['nav-empezar']);
  setText('sol-tag', t['sol-tag']);
  setText('sol-title-before', t['sol-title-before']);
  setText('sol-title-accent', t['sol-title-accent']);
  setText('sol-desc', t['sol-desc']);
  setText('impl-tag', t['impl-tag']);
  setText('impl-title-before', t['impl-title-before']);
  setText('impl-title-accent', t['impl-title-accent']);
  setText('impl-desc', t['impl-desc']);
  setText('step-0-title', t['step-0-title']);
  setText('step-0-desc', t['step-0-desc']);
  setText('step-1-title', t['step-1-title']);
  setText('step-1-desc', t['step-1-desc']);
  setText('step-2-title', t['step-2-title']);
  setText('step-2-desc', t['step-2-desc']);
  setText('step-3-title', t['step-3-title']);
  setText('step-3-desc', t['step-3-desc']);
  setText('step-4-title', t['step-4-title']);
  setText('step-4-desc', t['step-4-desc']);
  setText('step-5-title', t['step-5-title']);
  setText('step-5-desc', t['step-5-desc']);
  setText('step-6-title', t['step-6-title']);
  setText('step-6-desc', t['step-6-desc']);
  setText('step-7-title', t['step-7-title']);
  setText('step-7-desc', t['step-7-desc']);
  setText('how-title-before', t['how-title-before']);
  setText('how-title-accent', t['how-title-accent']);
  setText('how-subtitle', t['how-subtitle']);
  setText('how-desc', t['how-desc']);
  setText('flow-0-title', t['flow-0-title']);
  setText('flow-0-desc', t['flow-0-desc']);
  setText('flow-1-title', t['flow-1-title']);
  setText('flow-1-desc', t['flow-1-desc']);
  setText('flow-2-title', t['flow-2-title']);
  setText('flow-2-desc', t['flow-2-desc']);
  setText('flow-3-title', t['flow-3-title']);
  setText('flow-3-desc', t['flow-3-desc']);
  setText('flow-4-title', t['flow-4-title']);
  setText('flow-4-desc', t['flow-4-desc']);
  setText('flow-5-title', t['flow-5-title']);
  setText('flow-5-desc', t['flow-5-desc']);
  setText('tag-entrada', t['tag-entrada']);
  setText('tag-ia', t['tag-ia']);
  setText('tag-proceso', t['tag-proceso']);
  setText('tag-salida', t['tag-salida']);
  setText('hero-tag', t['hero-tag']);
  setText('hero-title-before', t['hero-title-before']);
  setText('hero-title-accent', t['hero-title-accent']);
  setText('hero-subtitle', t['hero-subtitle']);
  setText('hero-cta1', t['hero-cta1']);
  setText('hero-cta2', t['hero-cta2']);
  setText('arch-tag', t['arch-tag']);
  setText('arch-title-before', t['arch-title-before']);
  setText('arch-title-accent', t['arch-title-accent']);
  setText('arch-desc', t['arch-desc']);
  setText('proc-tag', t['proc-tag']);
  setText('proc-title-before', t['proc-title-before']);
  setText('proc-title-accent', t['proc-title-accent']);
  setText('proc-desc', t['proc-desc']);
  setText('serv-tag', t['serv-tag']);
  setText('serv-title-before', t['serv-title-before']);
  setText('serv-title-accent', t['serv-title-accent']);
  setText('serv-desc', t['serv-desc']);
  setText('ben-tag', t['ben-tag']);
  setText('ben-title-before', t['ben-title-before']);
  setText('ben-title-accent', t['ben-title-accent']);
  setText('ben-desc', t['ben-desc']);
  setText('case-tag', t['case-tag']);
  setText('case-title-before', t['case-title-before']);
  setText('case-title-accent', t['case-title-accent']);
  setText('case-desc', t['case-desc']);
  setText('cta-title', t['cta-title']);
  setText('cta-desc', t['cta-desc']);
  setText('cta-btn', t['cta-btn']);
  setText('footer-brand', t['footer-brand']);
  setText('footer-servicios', t['footer-servicios']);
  setText('footer-empresa', t['footer-empresa']);
  setText('footer-legal', t['footer-legal']);
  setText('footer-redes', t['footer-redes']);
  setText('footer-link-ia', t['footer-link-ia']);
  setText('footer-link-auto', t['footer-link-auto']);
  setText('footer-link-int', t['footer-link-int']);
  setText('footer-link-cons', t['footer-link-cons']);
  setText('footer-link-casos', t['footer-link-casos']);
  setText('footer-link-contacto', t['footer-link-contacto']);
  setText('footer-link-como', t['footer-link-como']);
  setText('footer-link-priv', t['footer-link-priv']);
  setText('footer-link-term', t['footer-link-term']);
  setText('footer-link-cookies', t['footer-link-cookies']);
  setText('footer-copy', t['footer-copy']);
  setText('footer-credit', t['footer-credit']);
  setText('footer-opencode', t['footer-opencode']);
  setText('back-link', t['back-link']);
  setText('contact-title', t['contact-title']);
  setText('contact-desc', t['contact-desc']);
  setText('contact-email-title', t['contact-email-title']);
  setText('contact-wa-title', t['contact-wa-title']);
  setText('contact-wa-btn', t['contact-wa-btn']);
  setText('contact-prepare-title', t['contact-prepare-title']);
  setText('contact-prepare-desc', t['contact-prepare-desc']);
  setText('contact-prepare-1', t['contact-prepare-1']);
  setText('contact-prepare-2', t['contact-prepare-2']);
  setText('contact-prepare-3', t['contact-prepare-3']);
  setText('sol-items-0-title', t['sol-items-0-title']);
  setText('sol-items-0-desc', t['sol-items-0-desc']);
  setText('sol-items-1-title', t['sol-items-1-title']);
  setText('sol-items-1-desc', t['sol-items-1-desc']);
  setText('sol-items-2-title', t['sol-items-2-title']);
  setText('sol-items-2-desc', t['sol-items-2-desc']);
  setText('sol-items-3-title', t['sol-items-3-title']);
  setText('sol-items-3-desc', t['sol-items-3-desc']);
  setText('sol-items-4-title', t['sol-items-4-title']);
  setText('sol-items-4-desc', t['sol-items-4-desc']);
  setText('sol-items-5-title', t['sol-items-5-title']);
  setText('sol-items-5-desc', t['sol-items-5-desc']);
  setText('sol-items-6-title', t['sol-items-6-title']);
  setText('sol-items-6-desc', t['sol-items-6-desc']);
  setText('sol-items-7-title', t['sol-items-7-title']);
  setText('sol-items-7-desc', t['sol-items-7-desc']);
  setText('sol-items-8-title', t['sol-items-8-title']);
  setText('sol-items-8-desc', t['sol-items-8-desc']);
  setText('sol-items-9-title', t['sol-items-9-title']);
  setText('sol-items-9-desc', t['sol-items-9-desc']);
  setText('serv-card1-title', t['serv-card1-title']);
  setText('serv-card1-desc', t['serv-card1-desc']);
  setText('serv-card2-title', t['serv-card2-title']);
  setText('serv-card2-desc', t['serv-card2-desc']);
  setText('serv-card3-title', t['serv-card3-title']);
  setText('serv-card3-desc', t['serv-card3-desc']);
  setText('serv-card4-title', t['serv-card4-title']);
  setText('serv-card4-desc', t['serv-card4-desc']);
  setText('ben-label1', t['ben-label1']);
  setText('ben-label2', t['ben-label2']);
  setText('ben-label3', t['ben-label3']);
  setText('ben-label4', t['ben-label4']);
  setText('case-card1-title', t['case-card1-title']);
  setText('case-card1-desc', t['case-card1-desc']);
  setText('case-card2-title', t['case-card2-title']);
  setText('case-card2-desc', t['case-card2-desc']);
  setText('case-card3-title', t['case-card3-title']);
  setText('case-card3-desc', t['case-card3-desc']);
  setText('case-card4-title', t['case-card4-title']);
  setText('case-card4-desc', t['case-card4-desc']);
  setText('case-card5-title', t['case-card5-title']);
  setText('case-card5-desc', t['case-card5-desc']);

  const langBtns = document.querySelectorAll('.lang-toggle');
  langBtns.forEach(btn => {
    const options = btn.querySelectorAll('.lang-toggle__option');
    options.forEach(opt => {
      opt.classList.toggle('lang-toggle__option--active', opt.textContent.trim() === (lang === 'es' ? 'ES' : 'EN'));
    });
  });
  document.documentElement.lang = lang;
  localStorage.setItem('nine-gate-lang', lang);
}

function setText(key, val) {
  const el = document.querySelector(`[data-i18n="${key}"]`);
  if (el) el.textContent = val;
}

/* Init language */
const langToggles = document.querySelectorAll('.lang-toggle');
if (langToggles.length) {
  const saved = localStorage.getItem('nine-gate-lang') || 'es';
  langToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.lang === 'en' ? 'es' : 'en';
      setLang(current);
    });
  });
  setLang(saved);
}

/* Theme toggle */
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const savedTheme = localStorage.getItem('nine-gate-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('nine-gate-theme', next);
  });
}
