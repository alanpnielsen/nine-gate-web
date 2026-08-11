/* i18n element cache — built once at load, used by setText */
var i18nEls = {};
document.querySelectorAll('[data-i18n]').forEach(function(el) {
  i18nEls[el.getAttribute('data-i18n')] = el;
});

function setText(key, val) {
  var el = i18nEls[key];
  if (el) el.textContent = val;
}

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
    'footer-link-about': 'Acerca de Nosotros',
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
    'about-title': 'Nuestra visi\u00F3n',
    'about-p1': 'Creemos que el futuro no consiste en reemplazar a las personas. Consiste en devolverles aquello que nunca debieron perder: tiempo para pensar, crear y decidir.',
    'about-p2': 'La inteligencia artificial est\u00E1 cambiando la forma en que trabajamos. Pero para nosotros, la verdadera transformaci\u00F3n no est\u00E1 en hacer que una m\u00E1quina haga m\u00E1s cosas. Est\u00E1 en conseguir que las personas puedan dedicar menos tiempo a las tareas repetitivas y m\u00E1s tiempo a las que realmente necesitan criterio, creatividad, experiencia y sensibilidad humana.',
    'about-p3': 'En Nine Gate construimos sistemas de inteligencia artificial y automatizaci\u00F3n que trabajan dentro de las empresas para hacer posible ese cambio.',
    'about-p4': 'No buscamos automatizar por automatizar. Primero entendemos c\u00F3mo funciona una organizaci\u00F3n, d\u00F3nde se pierde tiempo, d\u00F3nde existen fricciones y qu\u00E9 tareas pueden ser realizadas de una manera m\u00E1s inteligente. Despu\u00E9s dise\u00F1amos sistemas que trabajan junto a las personas, potenciando sus capacidades en lugar de reemplazarlas.',
    'about-p5': 'Porque creemos que la tecnolog\u00EDa alcanza su verdadero valor cuando amplifica lo que nos hace humanos.',
    'about-p6': 'Queremos construir empresas m\u00E1s eficientes, pero tambi\u00E9n m\u00E1s humanas. Empresas donde la tecnolog\u00EDa se encargue de lo repetitivo, mientras las personas recuperan espacio para imaginar, resolver problemas, construir relaciones y tomar mejores decisiones.',
    'about-s1': 'El futuro que imaginamos no es un mundo donde la inteligencia artificial trabaja en lugar de nosotros.',
    'about-s2': 'Es un mundo donde la inteligencia artificial nos permite trabajar mejor.',
    'about-s3': 'Y creemos que ese futuro no est\u00E1 tan lejos.',
    'about-s4': 'Lo estamos construyendo ahora.',
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
    'serv-card1-title': 'Diagn\u00F3stico',
    'serv-card1-desc': 'Llamada inicial gratuita. Identificamos los 3 procesos con m\u00E1s potencial.',
    'serv-card2-title': 'Auditor\u00EDa',
    'serv-card2-desc': 'An\u00E1lisis completo de procesos para identificar oportunidades de automatizaci\u00F3n.',
    'serv-card3-title': 'Automatizaciones',
    'serv-card3-desc': 'Implementaci\u00F3n de flujos automatizados con IA y herramientas como n8n.',
    'serv-card4-title': 'Acompa\u00F1amiento',
    'serv-card4-desc': 'Soporte continuo y optimizaci\u00F3n de procesos ya implementados.',
    'serv-card5-title': 'Diagn\u00F3stico',
    'serv-card5-desc': 'Llamada inicial gratuita. Identificamos los 3 procesos con m\u00E1s potencial.',
    'serv-card5-detail': 'Dise\u00F1amos flujos que reciben llamadas, clasifican solicitudes, ordenan documentos, generan presupuestos, avisan al equipo y dejan trazabilidad. Sin promesas vac\u00EDas: partimos de una auditor\u00EDa, construimos con datos reales y dejamos siempre supervisi\u00F3n humana.',
    'flow-step1': 'Llamada',
    'flow-step2': 'IA',
    'flow-step3': 'CRM',
    'flow-step4': 'Validaci\u00F3n',
    'flow-step5': 'Supervisor',
    'flow-title': 'Flujo Nine Gate',
    'serv-problems-tag': 'Problemas',
    'serv-problems-title-before': 'Problemas reales que ',
    'serv-problems-title-accent': 'automatizamos',
    'serv-problems-subtitle': 'De fricci\u00F3n operativa a sistema trazable.',
    'serv-problems-note': 'Estos ejemplos combinan problemas detectados en una auditor\u00EDa real de ingenier\u00EDa t\u00E9cnica con automatizaciones habituales en pymes. Cuando el caso procede de la auditor\u00EDa, lo tratamos como propuesta dise\u00F1ada a partir del diagn\u00F3stico, no como implementaci\u00F3n ya ejecutada.',
    'serv-problem1-title': 'Documentos sin clasificar',
    'serv-problem1-desc': 'PDFs, planillas y formularios que llegan por email o WhatsApp sin orden ni trazabilidad.',
    'serv-problem2-title': 'Seguimiento manual de leads',
    'serv-problem2-desc': 'Ventas que se pierden por falta de recordatorios, estados desactualizados y falta de contexto.',
    'serv-problem3-title': 'Presupuestos lentos',
    'serv-problem3-desc': 'C\u00E1lculos manuales, copiar pegar entre planillas y demora en respuestas al cliente.',
    'serv-problem4-title': 'Alertas ignoradas',
    'serv-problem4-desc': 'Eventos cr\u00EDticos que nadie monitorea, faltantes detectados tarde y desv\u00EDos sin aviso.',
    'serv-problem5-title': 'Agenda desorganizada',
    'serv-problem5-desc': 'Turnos duplicados, disponibilidad incierta y confirmaciones manuales por WhatsApp.',
    'serv-problem6-title': 'Handoff sin contexto',
    'serv-problem6-desc': 'Paso de chat a humano sin resumen, preguntas repetitivas y p\u00E9rdida de informaci\u00F3n.',
    'serv-case-tag': 'IA + Humano',
    'serv-case-title-before': 'Alto flujo de llamadas y ',
    'serv-case-title-accent': 'solicitudes de clientes',
    'serv-case-subtitle': 'De llamadas sueltas a oportunidades ordenadas. Cada llamada termina convertida en una ficha clara, con responsable, prioridad y siguiente paso.',
    'serv-case-problem-title': 'Problema detectado',
    'serv-case-problem-desc': 'Las llamadas entran durante todo el d\u00EDa y se mezclan consultas comerciales, incidencias, presupuestos y dudas t\u00E9cnicas. Parte de la informaci\u00F3n queda en notas, correos o memoria de una persona.',
    'serv-case-what-title': 'Qu\u00E9 automatizamos',
    'serv-case-what-desc': 'Un asistente telef\u00F3nico conversacional con IA que atiende, recoge datos, clasifica la solicitud y deriva el caso al responsable adecuado.',
    'serv-case-flow-title': 'C\u00F3mo funciona el flujo',
    'serv-case-flow1': 'Entra una llamada.',
    'serv-case-flow2': 'El asistente saluda, explica que recoge datos para el equipo y solicita consentimiento si hay grabaci\u00F3n o transcripci\u00F3n.',
    'serv-case-flow3': 'Pregunta nombre, empresa, tel\u00E9fono, email, tipo de solicitud, urgencia, servicio requerido y descripci\u00F3n.',
    'serv-case-flow4': 'Si detecta urgencia o sensibilidad, transfiere a una persona o genera aviso inmediato.',
    'serv-case-flow5': 'n8n crea registro, resume la llamada, asigna responsable y avisa por email, Teams o Slack.',
    'serv-case-flow6': 'La IA prepara un borrador de respuesta u oferta inicial.',
    'serv-case-flow7': 'El sistema comprueba campos obligatorios y pasa el caso a supervisor humano.',
    'serv-case-data-title': 'Datos que se guardan',
    'serv-case-data-desc': 'Nombre, empresa, tel\u00E9fono, email, motivo, urgencia, resumen, transcripci\u00F3n, responsable, estado, pr\u00F3xima acci\u00F3n, fecha, canal, consentimiento y enlace a oferta o documentaci\u00F3n.',
    'serv-case-control-title': 'Control humano',
    'serv-case-control-desc': 'Ninguna oferta se env\u00EDa sola. La IA prepara el borrador, el sistema revisa campos y una persona valida antes de enviar.',
    'serv-case-result-title': 'Resultado esperado',
    'serv-case-result-desc': 'M\u00E1s orden comercial, menos informaci\u00F3n perdida y una trazabilidad clara de cada solicitud.',
    'serv-case-more': 'Ver m\u00E1s',
    'serv-case-more-1': 'Ver m\u00E1s',
    'serv-case-more-2': 'Ver m\u00E1s',
    'serv-case-more-3': 'Ver m\u00E1s',
    'serv-case-more-4': 'Ver m\u00E1s',
    'serv-case-more-5': 'Ver m\u00E1s',
    'serv-audit-tag': 'Auditor\u00EDa real',
    'serv-audit-title-before': 'Recepci\u00F3n de informaci\u00F3n y ',
    'serv-audit-title-accent': 'documentaci\u00F3n duplicada',
    'serv-audit-subtitle': 'Una sola fuente de verdad. Menos documentos repetidos, menos errores y m\u00E1s trazabilidad entre departamentos.',
    'serv-audit-problem-desc': 'En la auditor\u00EDa real se detect\u00F3 duplicidad documental entre departamentos y necesidad de usar plantillas comunes. Varias personas rellenaban datos parecidos en sitios distintos.',
    'serv-audit-what-desc': 'Sistema \u00FAnico de recepci\u00F3n documental, expedientes y plantillas corporativas conectado con automatizaciones.',
    'serv-audit-flow1': 'El cliente env\u00EDa formulario, email o documento.',
    'serv-audit-flow2': 'n8n detecta la entrada.',
    'serv-audit-flow3': 'La IA extrae cliente, proyecto, fecha, tipo de documento, departamento y prioridad.',
    'serv-audit-flow4': 'El sistema comprueba si ya existe expediente.',
    'serv-audit-flow5': 'Si existe, adjunta la informaci\u00F3n. Si no, crea carpeta, registro y tarea.',
    'serv-audit-flow6': 'Se usan plantillas comunes para calidad, medioambiente, operaciones o proyectos.',
    'serv-audit-flow7': 'Se avisa al departamento correspondiente y queda registro de qu\u00E9 falta.',
    'serv-audit-data-desc': 'Cliente, proyecto, fecha, tipo documental, departamento, estado, responsable, archivo original, versi\u00F3n, campos pendientes y trazabilidad de cambios.',
    'serv-audit-control-desc': 'Validaci\u00F3n de duplicados, campos obligatorios, naming autom\u00E1tico de archivos y revisi\u00F3n humana cuando falten datos.',
    'serv-audit-result-desc': 'Documentaci\u00F3n m\u00E1s ordenada, menos copia manual y una base com\u00FAn para trabajar entre departamentos.',
    'serv-data-tag': 'Datos estructurados',
    'serv-data-price': 'Desde 1.890 \u20AC',
    'serv-data-title-before': 'Partes de trabajo, control horario y ',
    'serv-data-title-accent': 'administraci\u00F3n',
    'serv-data-subtitle': 'Menos administraci\u00F3n repetida. Los datos nacen una vez y viajan al resto del sistema.',
    'serv-data-problem-desc': 'En la auditor\u00EDa aparecieron control horario, reportes, partes de trabajo y facturaci\u00F3n como tareas repetitivas que consumen tiempo.',
    'serv-data-what-desc': 'Generaci\u00F3n de partes, validaci\u00F3n de fichajes, reportes internos y preparaci\u00F3n de datos para facturaci\u00F3n.',
    'serv-data-flow1': 'El empleado registra jornada, tarea o parte desde m\u00F3vil, formulario o app.',
    'serv-data-flow2': 'El sistema valida proyecto, cliente, horas, descripci\u00F3n y responsable.',
    'serv-data-flow3': 'n8n guarda la informaci\u00F3n en la herramienta correspondiente.',
    'serv-data-flow4': 'Si faltan datos, devuelve aviso autom\u00E1tico.',
    'serv-data-flow5': 'Si est\u00E1 completo, genera PDF o registro interno.',
    'serv-data-flow6': 'Si procede, env\u00EDa datos a facturaci\u00F3n o ERP.',
    'serv-data-flow7': 'Direcci\u00F3n recibe resumen semanal de horas, partes pendientes y desviaciones.',
    'serv-data-data-desc': 'Empleado, fecha, proyecto, cliente, horas, tarea, estado, validaci\u00F3n, parte generado, responsable y observaciones.',
    'serv-data-control-desc': 'No se factura autom\u00E1ticamente sin revisi\u00F3n. El sistema prepara datos y avisa al responsable.',
    'serv-data-result-desc': 'Menos tiempo administrativo y mejor visibilidad de horas, partes pendientes y trabajos listos para facturar.',
    'serv-offer-tag': 'IA + Supervisor',
    'serv-offer-title-before': 'Presupuestos y ofertas autom\u00E1ticas con ',
    'serv-offer-title-accent': 'revisi\u00F3n humana',
    'serv-offer-subtitle': 'Ofertas m\u00E1s r\u00E1pidas, pero no autom\u00E1ticas a ciegas. La IA prepara; la empresa decide.',
    'serv-offer-problem-desc': 'El equipo comercial o t\u00E9cnico recoge informaci\u00F3n en llamadas, emails o formularios y luego debe convertirla manualmente en una oferta.',
    'serv-offer-what-desc': 'Sistema de generaci\u00F3n asistida de ofertas, con control de campos, coherencia y aprobaci\u00F3n humana.',
    'serv-offer-flow1': 'Entra lead por llamada, formulario o email.',
    'serv-offer-flow2': 'La IA clasifica necesidad, urgencia, tama\u00F1o, sector y prioridad.',
    'serv-offer-flow3': 'n8n guarda el lead en CRM o base de datos.',
    'serv-offer-flow4': 'La IA genera resumen interno y borrador de oferta.',
    'serv-offer-flow5': 'El sistema revisa campos obligatorios, precios, servicios, l\u00EDmites y tono.',
    'serv-offer-flow6': 'Si falta algo, crea tarea para pedir informaci\u00F3n.',
    'serv-offer-flow7': 'Si est\u00E1 completo, pasa a supervisor.',
    'serv-offer-flow8': 'Tras aprobar, se genera PDF y se env\u00EDa al cliente.',
    'serv-offer-tools-title': 'Herramientas posibles',
    'serv-offer-tools-desc': 'n8n, OpenAI o IA configurada por API, Airtable, HubSpot, Holded, Google Docs, Word, generador PDF, Gmail, Outlook.',
    'serv-offer-data-desc': 'Lead, empresa, necesidad, servicio, urgencia, importe orientativo, versi\u00F3n de oferta, estado, aprobador, fecha y documento generado.',
    'serv-offer-control-desc': 'Debe existir siempre human-in-the-loop. La IA nunca firma ni env\u00EDa una oferta final sin aprobaci\u00F3n.',
    'serv-offer-result-desc': 'Menos espera entre solicitud y propuesta, sin perder criterio comercial ni control sobre el env\u00EDo final.',
    'serv-system-tag': 'Sistema de automatizaci\u00F3n real',
    'serv-system-title-before': 'As\u00ED convertir\u00EDamos un diagn\u00F3stico en un ',
    'serv-system-title-accent': 'sistema automatizado',
    'serv-system-subtitle': 'Ejemplos visuales basados en flujos reales que una pyme puede necesitar. Primero se dise\u00F1a, luego se prueba y solo despu\u00E9s se automatiza.',
    'serv-system-card1-title': 'Sistema de llamadas y ofertas con IA',
    'serv-system-card1-desc': 'Las llamadas se pierden o llegan incompletas. El sistema convierte cada conversaci\u00F3n en registro, tarea y borrador revisable.',
    'serv-system-card1-label': 'Llamadas y ofertas',
    'serv-system-card1-s1': 'Entrada',
    'serv-system-card1-s2': 'IA',
    'serv-system-card1-s3': 'Base de datos',
    'serv-system-card1-s4': 'Validaci\u00F3n',
    'serv-system-card1-s5': 'Supervisor',
    'serv-system-card1-s6': 'Cliente',
    'serv-system-card2-title': 'Sistema documental para expedientes t\u00E9cnicos',
    'serv-system-card2-desc': 'Documentos repetidos, carpetas sin criterio y datos dispersos entre departamentos.',
    'serv-system-card2-label': 'Documentaci\u00F3n centralizada',
    'serv-system-card2-s1': 'Email',
    'serv-system-card2-s2': 'Extracci\u00F3n IA',
    'serv-system-card2-s3': 'Expediente',
    'serv-system-card2-s4': 'Duplicados',
    'serv-system-card2-s5': 'Departamento',
    'serv-system-card2-s6': 'Registro',
    'serv-system-card3-title': 'Sistema de partes, horas y facturaci\u00F3n preparada',
    'serv-system-card3-desc': 'Horas, partes y facturaci\u00F3n se registran varias veces y llegan tarde a direcci\u00F3n.',
    'serv-system-card3-label': 'Partes y facturaci\u00F3n',
    'serv-system-card3-s1': 'Formulario',
    'serv-system-card3-s2': 'Validaci\u00F3n',
    'serv-system-card3-s3': 'Parte PDF',
    'serv-system-card3-s4': 'ERP',
    'serv-system-card3-s5': 'Responsable',
    'serv-system-card3-s6': 'Dashboard',
    'serv-flow-title-before': 'As\u00ED fluye una ',
    'serv-flow-title-accent': 'automatizaci\u00F3n',
    'serv-flow-title-after': ' de Nine Gate',
    'serv-flow-subtitle': 'Automatizamos el trabajo repetitivo, no la responsabilidad de tu empresa.',
    'serv-flow-note': 'La automatizaci\u00F3n no elimina el criterio humano: elimina el trabajo repetitivo que impide usarlo.',
    'serv-flow-step1-title': 'Entrada',
    'serv-flow-step1-desc': 'Llamada, email, formulario, documento, WhatsApp o tarea interna.',
    'serv-flow-step2-title': 'Captura',
    'serv-flow-step2-desc': 'n8n recoge el dato y lo env\u00EDa al sistema correcto.',
    'serv-flow-step3-title': 'IA',
    'serv-flow-step3-desc': 'Clasifica, resume, extrae campos, redacta borradores o detecta urgencias.',
    'serv-flow-step4-title': 'Base de datos',
    'serv-flow-step4-desc': 'Airtable, HubSpot, Supabase, Sheets, SharePoint o CRM existente.',
    'serv-flow-step5-title': 'Control',
    'serv-flow-step5-desc': 'Validaci\u00F3n de campos, detecci\u00F3n de errores, reglas de negocio y logs.',
    'serv-flow-step6-title': 'Humano',
    'serv-flow-step6-desc': 'Supervisor aprueba, corrige o escala.',
    'serv-flow-step7-title': 'Salida',
    'serv-flow-step7-desc': 'Oferta, tarea, email, PDF, dashboard, aviso o expediente.',
    'serv-controls-tag': 'Controles',
    'serv-controls-title-before': 'Controles, seguridad y ',
    'serv-controls-title-accent': 'supervisi\u00F3n humana',
    'serv-controls-subtitle': 'Automatizaciones con control',
    'serv-controls-note': 'Un flujo serio debe poder revisarse, pausarse y corregirse. Dise\u00F1amos automatizaciones con trazabilidad y criterios de supervisi\u00F3n desde el principio.',
    'serv-controls-item1': 'Pruebas con datos reales anonimizados.',
    'serv-controls-item2': 'Campos obligatorios antes de generar una oferta.',
    'serv-controls-item3': 'Registro de cada ejecuci\u00F3n.',
    'serv-controls-item4': 'Alertas si falla un flujo.',
    'serv-controls-item5': 'Supervisi\u00F3n humana en decisiones comerciales.',
    'ticker-1': 'Automatizamos todos aquellos procesos repetitivos',
    'ticker-2': 'Reducimos tiempos operativos',
    'ticker-3': 'Eliminamos tareas manuales',
    'ticker-4': 'Conectamos todos tus sistemas',
    'ticker-5': 'Integramos WhatsApp con tu empresa',
    'ticker-6': 'Agentes de IA disponibles 24/7',
    'ticker-7': 'Reducimos errores humanos',
    'ticker-8': 'Aumentamos la productividad',
    'ticker-9': 'Automatizamos ventas y atenci\u00F3n',
    'ticker-10': 'Convertimos conversaciones en acciones',
    'ticker-11': 'Tu empresa trabaja incluso mientras dorm\u00EDs',
    'ticker-12': 'Escalamos procesos sin aumentar personal',
    'ticker-13': 'IA integrada con tu operaci\u00F3n',
    'ticker-14': 'Automatizaciones pensadas para crecer',
    'arch-wa-name': 'WhatsApp',
    'arch-wa-desc': 'Captura consultas, ventas y soporte.',
    'arch-ia-name': 'Router IA',
    'arch-ia-desc': 'Analiza mensajes y toma decisiones.',
    'arch-n8-name': 'n8n Workflows',
    'arch-n8-desc': 'Ejecuta procesos empresariales.',
    'arch-db-name': 'Base de datos',
    'arch-db-desc': 'Almacena informaci\u00F3n estructurada.',
    'arch-ds-name': 'Dashboard',
    'arch-ds-desc': 'Genera m\u00E9tricas y reportes.',
    'arch-hm-name': 'Humano',
    'arch-hm-desc': 'Interviene \u00FAnicamente cuando es necesario.',
    'meth-tag': 'Metodolog\u00EDa',
    'meth-title-before': 'C\u00F3mo ',
    'meth-title-accent': 'construimos tu automatizaci\u00F3n',
    'meth-desc': '8 pasos para pasar de la idea a la producci\u00F3n con datos reales.',
    'meth-step1': 'Brief',
    'meth-desc1': 'Mapeamos conversaciones y tareas reales.',
    'meth-step2': 'Flow map',
    'meth-desc2': 'Detectamos reglas, datos y excepciones.',
    'meth-step3': 'State schema',
    'meth-desc3': 'Dise\u00F1amos el estado del proceso.',
    'meth-step4': 'n8n',
    'meth-desc4': 'Creamos el workflow en n8n.',
    'meth-step5': 'Database',
    'meth-desc5': 'Integramos bases, APIs y paneles.',
    'meth-step6': 'QA',
    'meth-desc6': 'Probamos con casos reales.',
    'meth-step7': 'Monitoring',
    'meth-desc7': 'Activamos logs, monitoreo y handoff.',
    'meth-step8': 'Production',
    'meth-desc8': 'Iteramos con datos reales.',
    'serv-list-tag': 'Servicios',
    'serv-list-title-before': 'Servicios de automatizaci\u00F3n para ',
    'serv-list-title-accent': 'empresas',
    'serv-list-desc': 'Listado de servicios Nine Gate: diagn\u00F3stico, auditor\u00EDa, automatizaciones y acompa\u00F1amiento.',
    'serv-item0-title': 'Diagn\u00F3stico',
    'serv-item0-desc': 'Llamada inicial gratuita. Identificamos los 3 procesos con m\u00E1s potencial.',
    'serv-item1-title': 'Auditor\u00EDa',
    'serv-item1-desc': 'An\u00E1lisis completo de procesos para identificar oportunidades de automatizaci\u00F3n.',
    'serv-item2-title': 'Automatizaciones',
    'serv-item2-desc': 'Implementaci\u00F3n de flujos automatizados con IA y herramientas como n8n.',
    'serv-item3-title': 'Acompa\u00F1amiento',
    'serv-item3-desc': 'Soporte continuo y optimizaci\u00F3n de procesos ya implementados.',
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
    'footer-link-about': 'About Us',
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
    'about-title': 'Our vision',
    'about-p1': 'We believe the future is not about replacing people. It is about giving back what they should never have lost: time to think, create and decide.',
    'about-p2': 'Artificial intelligence is changing the way we work. But for us, the real transformation is not about making a machine do more. It is about helping people spend less time on repetitive tasks and more time on the ones that truly require judgment, creativity, experience and human sensitivity.',
    'about-p3': 'At Nine Gate we build AI and automation systems that work inside companies to make that change possible.',
    'about-p4': 'We do not automate just for the sake of automating. First we understand how an organization works, where time is lost, where friction exists and which tasks can be done more intelligently. Then we design systems that work alongside people, amplifying their capabilities instead of replacing them.',
    'about-p5': 'Because we believe technology reaches its true value when it amplifies what makes us human.',
    'about-p6': 'We want to build more efficient companies, but also more human ones. Companies where technology handles the repetitive work, while people reclaim space to imagine, solve problems, build relationships and make better decisions.',
    'about-s1': 'The future we imagine is not a world where artificial intelligence works instead of us.',
    'about-s2': 'It is a world where artificial intelligence lets us work better.',
    'about-s3': 'And we believe that future is not far away.',
    'about-s4': 'We are building it now.',
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
    'serv-card1-title': 'Diagnosis',
    'serv-card1-desc': 'Free initial call. We identify the 3 processes with the highest automation potential.',
    'serv-card2-title': 'Audit',
    'serv-card2-desc': 'Complete analysis of business processes to identify automation opportunities.',
    'serv-card3-title': 'Automations',
    'serv-card3-desc': 'Implementation of AI-powered automated workflows using tools such as n8n.',
    'serv-card4-title': 'Ongoing Support',
    'serv-card4-desc': 'Continuous support and optimization of already implemented processes.',
    'serv-card5-title': 'Diagnosis',
    'serv-card5-desc': 'Free initial call. We identify the 3 processes with the highest automation potential.',
    'serv-card5-detail': 'We design flows that receive calls, classify requests, sort documents, generate quotes, notify the team and leave traceability. No empty promises: we start from an audit, build with real data and always leave human oversight.',
    'flow-step1': 'Call',
    'flow-step2': 'AI',
    'flow-step3': 'CRM',
    'flow-step4': 'Validation',
    'flow-step5': 'Supervisor',
    'flow-title': 'Nine Gate Flow',
    'serv-problems-tag': 'Problems',
    'serv-problems-title-before': 'Real problems we ',
    'serv-problems-title-accent': 'automate',
    'serv-problems-subtitle': 'From operational friction to traceable systems.',
    'serv-problems-note': 'These examples combine problems detected in a real technical engineering audit with common SME automations. When the case comes from the audit, we treat it as a proposal designed from the diagnosis, not an already executed implementation.',
    'serv-problem1-title': 'Unclassified documents',
    'serv-problem1-desc': 'PDFs, spreadsheets and forms arriving by email or WhatsApp without order or traceability.',
    'serv-problem2-title': 'Manual lead tracking',
    'serv-problem2-desc': 'Sales lost due to lack of reminders, outdated statuses and missing context.',
    'serv-problem3-title': 'Slow quotes',
    'serv-problem3-desc': 'Manual calculations, copy-pasting between spreadsheets and delayed client responses.',
    'serv-problem4-title': 'Ignored alerts',
    'serv-problem4-desc': 'Critical events nobody monitors, late-detected shortages and unnoticed deviations.',
    'serv-problem5-title': 'Disorganized schedule',
    'serv-problem5-desc': 'Duplicate appointments, uncertain availability and manual WhatsApp confirmations.',
    'serv-problem6-title': 'Handoff without context',
    'serv-problem6-desc': 'Chat to human transfer without summary, repetitive questions and information loss.',
    'serv-case-tag': 'AI + Human',
    'serv-case-title-before': 'High volume of calls and ',
    'serv-case-title-accent': 'customer requests',
    'serv-case-subtitle': 'From loose calls to organized opportunities. Every call ends up as a clear card, with responsible person, priority and next step.',
    'serv-case-problem-title': 'Problem detected',
    'serv-case-problem-desc': 'Calls come in all day and mix commercial inquiries, incidents, quotes and technical questions. Part of the information stays in notes, emails or someone\'s memory.',
    'serv-case-what-title': 'What we automate',
    'serv-case-what-desc': 'A conversational AI phone assistant that answers, collects data, classifies the request and routes the case to the appropriate responsible person.',
    'serv-case-flow-title': 'How the flow works',
    'serv-case-flow1': 'A call comes in.',
    'serv-case-flow2': 'The assistant greets, explains it collects data for the team and requests consent if there is recording or transcription.',
    'serv-case-flow3': 'Asks name, company, phone, email, request type, urgency, required service and description.',
    'serv-case-flow4': 'If it detects urgency or sensitivity, it transfers to a person or generates an immediate alert.',
    'serv-case-flow5': 'n8n creates record, summarizes the call, assigns responsible person and notifies via email, Teams or Slack.',
    'serv-case-flow6': 'The AI prepares a draft response or initial quote.',
    'serv-case-flow7': 'The system checks required fields and passes the case to a human supervisor.',
    'serv-case-data-title': 'Data stored',
    'serv-case-data-desc': 'Name, company, phone, email, reason, urgency, summary, transcription, responsible person, status, next action, date, channel, consent and link to quote or documentation.',
    'serv-case-control-title': 'Human control',
    'serv-case-control-desc': 'No quote is sent alone. The AI prepares the draft, the system checks fields and a person validates before sending.',
    'serv-case-result-title': 'Expected result',
    'serv-case-result-desc': 'More commercial order, less lost information and clear traceability of every request.',
    'serv-case-more': 'See more',
    'serv-case-more-1': 'See more',
    'serv-case-more-2': 'See more',
    'serv-case-more-3': 'See more',
    'serv-case-more-4': 'See more',
    'serv-case-more-5': 'See more',
    'serv-audit-tag': 'Real audit',
    'serv-audit-title-before': 'Information reception and ',
    'serv-audit-title-accent': 'duplicate documentation',
    'serv-audit-subtitle': 'A single source of truth. Fewer repeated documents, fewer errors and more traceability between departments.',
    'serv-audit-problem-desc': 'The real audit detected document duplication between departments and the need to use common templates. Several people were filling in similar data in different places.',
    'serv-audit-what-desc': 'Unique system for document reception, files and corporate templates connected with automations.',
    'serv-audit-flow1': 'The client sends a form, email or document.',
    'serv-audit-flow2': 'n8n detects the entry.',
    'serv-audit-flow3': 'The AI extracts client, project, date, document type, department and priority.',
    'serv-audit-flow4': 'The system checks if a file already exists.',
    'serv-audit-flow5': 'If it exists, it attaches the information. If not, it creates folder, record and task.',
    'serv-audit-flow6': 'Common templates are used for quality, environment, operations or projects.',
    'serv-audit-flow7': 'The corresponding department is notified and a record of what is missing is kept.',
    'serv-audit-data-desc': 'Client, project, date, document type, department, status, responsible person, original file, version, pending fields and change traceability.',
    'serv-audit-control-desc': 'Duplicate validation, required fields, automatic file naming and human review when data is missing.',
    'serv-audit-result-desc': 'More organized documentation, less manual copying and a common base for working between departments.',
    'serv-data-tag': 'Structured data',
    'serv-data-price': 'From €1,890',
    'serv-data-title-before': 'Work reports, time tracking and ',
    'serv-data-title-accent': 'administration',
    'serv-data-subtitle': 'Less repetitive administration. Data is born once and travels to the rest of the system.',
    'serv-data-problem-desc': 'The audit revealed time tracking, reports, work reports and invoicing as repetitive tasks that consume time.',
    'serv-data-what-desc': 'Report generation, timesheet validation, internal reports and data preparation for invoicing.',
    'serv-data-flow1': 'The employee records workday, task or report from mobile, form or app.',
    'serv-data-flow2': 'The system validates project, client, hours, description and responsible person.',
    'serv-data-flow3': 'n8n saves the information in the corresponding tool.',
    'serv-data-flow4': 'If data is missing, it returns an automatic alert.',
    'serv-data-flow5': 'If complete, it generates PDF or internal record.',
    'serv-data-flow6': 'If applicable, it sends data to invoicing or ERP.',
    'serv-data-flow7': 'Management receives weekly summary of hours, pending reports and deviations.',
    'serv-data-data-desc': 'Employee, date, project, client, hours, task, status, validation, generated report, responsible person and observations.',
    'serv-data-control-desc': 'No automatic invoicing without review. The system prepares data and notifies the responsible person.',
    'serv-data-result-desc': 'Less administrative time and better visibility of hours, pending reports and jobs ready to invoice.',
    'serv-offer-tag': 'AI + Supervisor',
    'serv-offer-title-before': 'Automatic quotes and offers with ',
    'serv-offer-title-accent': 'human review',
    'serv-offer-subtitle': 'Faster offers, but not blindly automatic. The AI prepares; the company decides.',
    'serv-offer-problem-desc': 'The sales or technical team collects information in calls, emails or forms and then must manually convert it into an offer.',
    'serv-offer-what-desc': 'Assisted offer generation system, with field control, coherence and human approval.',
    'serv-offer-flow1': 'Lead enters via call, form or email.',
    'serv-offer-flow2': 'The AI classifies need, urgency, size, sector and priority.',
    'serv-offer-flow3': 'n8n saves the lead in CRM or database.',
    'serv-offer-flow4': 'The AI generates internal summary and offer draft.',
    'serv-offer-flow5': 'The system checks required fields, prices, services, limits and tone.',
    'serv-offer-flow6': 'If something is missing, it creates a task to request information.',
    'serv-offer-flow7': 'If complete, it passes to supervisor.',
    'serv-offer-flow8': 'After approval, PDF is generated and sent to the client.',
    'serv-offer-tools-title': 'Possible tools',
    'serv-offer-tools-desc': 'n8n, OpenAI or API-configured AI, Airtable, HubSpot, Holded, Google Docs, Word, PDF generator, Gmail, Outlook.',
    'serv-offer-data-desc': 'Lead, company, need, service, urgency, estimated amount, offer version, status, approver, date and generated document.',
    'serv-offer-control-desc': 'Human-in-the-loop must always exist. The AI never signs or sends a final offer without approval.',
    'serv-offer-result-desc': 'Less wait between request and proposal, without losing commercial criteria or control over final delivery.',
    'serv-system-tag': 'Real automation system',
    'serv-system-title-before': 'How we would turn a diagnosis into an ',
    'serv-system-title-accent': 'automated system',
    'serv-system-subtitle': 'Visual examples based on real flows that an SME may need. First we design, then we test and only then we automate.',
    'serv-system-card1-title': 'Calls and offers system with AI',
    'serv-system-card1-desc': 'Calls are lost or arrive incomplete. The system converts each conversation into a record, task and reviewable draft.',
    'serv-system-card1-label': 'Calls and offers',
    'serv-system-card1-s1': 'Entry',
    'serv-system-card1-s2': 'AI',
    'serv-system-card1-s3': 'Database',
    'serv-system-card1-s4': 'Validation',
    'serv-system-card1-s5': 'Supervisor',
    'serv-system-card1-s6': 'Client',
    'serv-system-card2-title': 'Document system for technical files',
    'serv-system-card2-desc': 'Duplicate documents, folders without criteria and scattered data between departments.',
    'serv-system-card2-label': 'Centralized documentation',
    'serv-system-card2-s1': 'Email',
    'serv-system-card2-s2': 'AI extraction',
    'serv-system-card2-s3': 'File',
    'serv-system-card2-s4': 'Duplicates',
    'serv-system-card2-s5': 'Department',
    'serv-system-card2-s6': 'Record',
    'serv-system-card3-title': 'Work reports, hours and prepared invoicing',
    'serv-system-card3-desc': 'Hours, reports and invoicing are registered several times and arrive late to management.',
    'serv-system-card3-label': 'Reports and invoicing',
    'serv-system-card3-s1': 'Form',
    'serv-system-card3-s2': 'Validation',
    'serv-system-card3-s3': 'Report PDF',
    'serv-system-card3-s4': 'ERP',
    'serv-system-card3-s5': 'Responsible',
    'serv-system-card3-s6': 'Dashboard',
    'serv-flow-title-before': 'How a ',
    'serv-flow-title-accent': 'automation',
    'serv-flow-title-after': ' flows at Nine Gate',
    'serv-flow-subtitle': 'We automate repetitive work, not your company\'s responsibility.',
    'serv-flow-note': 'Automation doesn\'t eliminate human judgment: it eliminates the repetitive work that prevents using it.',
    'serv-flow-step1-title': 'Entry',
    'serv-flow-step1-desc': 'Call, email, form, document, WhatsApp or internal task.',
    'serv-flow-step2-title': 'Capture',
    'serv-flow-step2-desc': 'n8n collects the data and sends it to the correct system.',
    'serv-flow-step3-title': 'AI',
    'serv-flow-step3-desc': 'Classifies, summarizes, extracts fields, drafts or detects urgencies.',
    'serv-flow-step4-title': 'Database',
    'serv-flow-step4-desc': 'Airtable, HubSpot, Supabase, Sheets, SharePoint or existing CRM.',
    'serv-flow-step5-title': 'Control',
    'serv-flow-step5-desc': 'Field validation, error detection, business rules and logs.',
    'serv-flow-step6-title': 'Human',
    'serv-flow-step6-desc': 'Supervisor approves, corrects or escalates.',
    'serv-flow-step7-title': 'Output',
    'serv-flow-step7-desc': 'Offer, task, email, PDF, dashboard, alert or file.',
    'serv-controls-tag': 'Controls',
    'serv-controls-title-before': 'Controls, security and ',
    'serv-controls-title-accent': 'human supervision',
    'serv-controls-subtitle': 'Automations with control',
    'serv-controls-note': 'A serious flow must be reviewable, pausable and correctable. We design automations with traceability and supervision criteria from the start.',
    'serv-controls-item1': 'Tests with anonymized real data.',
    'serv-controls-item2': 'Required fields before generating an offer.',
    'serv-controls-item3': 'Record of every execution.',
    'serv-controls-item4': 'Alerts if a flow fails.',
    'serv-controls-item5': 'Human supervision in commercial decisions.',
    'ticker-1': 'We automate all those repetitive processes',
    'ticker-2': 'We reduce operational times',
    'ticker-3': 'We eliminate manual tasks',
    'ticker-4': 'We connect all your systems',
    'ticker-5': 'We integrate WhatsApp with your business',
    'ticker-6': 'AI agents available 24/7',
    'ticker-7': 'We reduce human errors',
    'ticker-8': 'We increase productivity',
    'ticker-9': 'We automate sales and support',
    'ticker-10': 'We turn conversations into actions',
    'ticker-11': 'Your business works even while you sleep',
    'ticker-12': 'We scale processes without increasing staff',
    'ticker-13': 'AI integrated with your operations',
    'ticker-14': 'Automations designed to grow',
    'arch-wa-name': 'WhatsApp',
    'arch-wa-desc': 'Captures inquiries, sales and support.',
    'arch-ia-name': 'AI Router',
    'arch-ia-desc': 'Analyzes messages and makes decisions.',
    'arch-n8-name': 'n8n Workflows',
    'arch-n8-desc': 'Runs business processes.',
    'arch-db-name': 'Database',
    'arch-db-desc': 'Stores structured information.',
    'arch-ds-name': 'Dashboard',
    'arch-ds-desc': 'Generates metrics and reports.',
    'arch-hm-name': 'Human',
    'arch-hm-desc': 'Intervenes only when necessary.',
    'meth-tag': 'Methodology',
    'meth-title-before': 'How we ',
    'meth-title-accent': 'build your automation',
    'meth-desc': '8 steps from idea to production with real data.',
    'meth-step1': 'Brief',
    'meth-desc1': 'Map real conversations and tasks.',
    'meth-step2': 'Flow map',
    'meth-desc2': 'Detect rules, data, and exceptions.',
    'meth-step3': 'State schema',
    'meth-desc3': 'Design the process state.',
    'meth-step4': 'n8n',
    'meth-desc4': 'Build the workflow in n8n.',
    'meth-step5': 'Database',
    'meth-desc5': 'Integrate databases, APIs, and dashboards.',
    'meth-step6': 'QA',
    'meth-desc6': 'Test with real-world cases.',
    'meth-step7': 'Monitoring',
    'meth-desc7': 'Activate logs, monitoring, and human handoff.',
    'meth-step8': 'Production',
    'meth-desc8': 'Iterate with real-world data.',
    'serv-list-tag': 'Services',
    'serv-list-title-before': 'Automation services for ',
    'serv-list-title-accent': 'businesses',
    'serv-list-desc': 'List of Nine Gate services: diagnosis, audit, automations and ongoing support.',
    'serv-item0-title': 'Diagnosis',
    'serv-item0-desc': 'Free initial call. We identify the 3 processes with the highest automation potential.',
    'serv-item1-title': 'Audit',
    'serv-item1-desc': 'Complete analysis of business processes to identify automation opportunities.',
    'serv-item2-title': 'Automations',
    'serv-item2-desc': 'Implementation of AI-powered automated workflows using tools such as n8n.',
    'serv-item3-title': 'Ongoing Support',
    'serv-item3-desc': 'Continuous support and optimization of already implemented processes.',
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

  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    const key = el.getAttribute('data-i18n');
    if (Object.prototype.hasOwnProperty.call(t, key)) {
      el.textContent = t[key];
    }
  });

  document.querySelectorAll('.lang-toggle').forEach(function(btn) {
    btn.querySelectorAll('.lang-toggle__option').forEach(function(opt) {
      opt.classList.toggle(
        'lang-toggle__option--active',
        opt.textContent.trim() === (lang === 'es' ? 'ES' : 'EN')
      );
    });
  });

  localStorage.setItem('nine-gate-lang', lang);
}

/* Init language */
const langToggles = document.querySelectorAll('.lang-toggle');

function initLanguage() {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  const saved = localStorage.getItem('nine-gate-lang') || 'es';
  const initialLang = urlLang === 'en' || urlLang === 'es' ? urlLang : saved;

  langToggles.forEach(btn => {
    btn.onclick = function () {
      const current = document.documentElement.lang === 'en' ? 'es' : 'en';
      setLang(current);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', current);
      window.history.replaceState({}, '', url);
    };
  });

  setLang(initialLang);
}

if (langToggles.length) {
  initLanguage();
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
