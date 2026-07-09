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
    'footer-link-priv': 'Privacidad',
    'footer-link-term': 'T\u00E9rminos',
    'footer-link-cookies': 'Cookies',
    'footer-copy': '\u00A9 2026 Nine Gate. Todos los derechos reservados.',
    'lang-btn': 'EN',
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
    'footer-link-priv': 'Privacy',
    'footer-link-term': 'Terms',
    'footer-link-cookies': 'Cookies',
    'footer-copy': '\u00A9 2026 Nine Gate. All rights reserved.',
    'lang-btn': 'ES',
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

  setText('nav-servicios', t['nav-servicios']);
  setText('nav-soluciones', t['nav-soluciones']);
  setText('nav-como', t['nav-como']);
  setText('nav-casos', t['nav-casos']);
  setText('nav-contacto', t['nav-contacto']);
  setText('nav-empezar', t['nav-empezar']);
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
  setText('footer-link-priv', t['footer-link-priv']);
  setText('footer-link-term', t['footer-link-term']);
  setText('footer-link-cookies', t['footer-link-cookies']);
  setText('footer-copy', t['footer-copy']);
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
