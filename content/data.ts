/**
 * Fuente única de todo el contenido del sitio.
 * Los componentes solo leen de este archivo; nunca llevan texto escrito a mano.
 *
 * Origen de los datos: CV de Kimberly Meneses y repositorio devops-portafolio.
 * Decisiones tomadas con ella:
 *  - Teléfono NO se publica (va solo en el CV descargable).
 *  - Empresa actual se mantiene confidencial.
 *  - Experiencia total: 2 años. Los trabajos "independientes" del CV eran
 *    proyectos universitarios y de tesis, así que se tratan como proyectos
 *    académicos y no como experiencia laboral ni con clientes.
 *  - AWS aparece solo como caso futuro planeado, nunca como logro.
 *
 * BORRADOR en español. Los textos entre [CORCHETES] están pendientes.
 * Versión en inglés: se añadirá después con la misma estructura.
 */

/* ───────────────────────── Perfil ───────────────────────── */

export const PROFILE = {
  name: "Kimberly Meneses",
  firstName: "Kimberly",
  initials: "KM",
  role: "Backend & DevOps Engineer",
  roles: ["Backend Developer", "DevOps", "Ingeniera en Informática"],
  location: "Maracaibo, Venezuela",
  remote: true,
  email: "meneseskimberly97@gmail.com",
  github: "https://github.com/Kchmo-2018",
  repo: "https://github.com/Kchmo-2018/devops-portafolio",
  linkedin: "https://www.linkedin.com/in/kimberly-meneses-palmar-b05723282",
  resume: "/Kimberly-Meneses-CV.pdf",
  /** Resumen corto del hero y de Sobre mí (sale del CV; 2 años de experiencia). */
  summary:
    "Ingeniera en Informática con 2 años de experiencia construyendo APIs REST y aplicaciones web con Java (Spring Boot) y Python (Django). Hoy llevo ese oficio hacia DevOps: pipelines CI/CD, contenedores y despliegues reproducibles, con cada decisión documentada.",
  tagline: "Del código a producción, sin pasos manuales.",
  quote: "Si no está automatizado ni documentado, no está terminado.",
  photo: null as string | null, // [PENDIENTE: foto]
  /** Campos de la tarjeta de identificación. */
  card: { id: "KM-2025", dept: "Backend · DevOps", experience: "2 años" },
} as const;

/* ───────────────────────── Hero ───────────────────────── */

/** Textos del hero (prototipo). `ghost` va en contorno y `accent` en cursiva serif. */
export const HERO = {
  status: "Disponible",
  /** Perfil principal: Backend. DevOps es el segundo perfil, en formación. */
  ghost: "Backend",
  accent: "Developer.",
  /** Línea pequeña sobre el título, con la tipografía de las etiquetas. */
  profile: "DevOps Engineer · Desarrolladora",
  lead: "Convierto cambios de código en despliegues confiables: ramas, CI/CD, contenedores e infraestructura, con cada decisión documentada.",
  /** Mientras no exista la sección Contacto, el botón abre el correo. */
  secondary: { label: "Hablemos", href: `mailto:${PROFILE.email}` },
  /** Enlaces externos del hero (se abren en pestaña nueva). */
  links: [
    { label: "GitHub", href: PROFILE.github },
    { label: "LinkedIn", href: PROFILE.linkedin },
    { label: "Este repositorio", href: PROFILE.repo },
  ],
} as const;

/* ───────────────────────── Sobre mí ───────────────────────── */

export const ABOUT = {
  label: "01 · Sobre mí",
  title: "Construyo el camino del",
  accent: "código a producción.",
  factsTitle: "Datos rápidos",
  quoteBy: "Mi lema",
  /** Tecnologías destacadas bajo el resumen (ids de SKILL_GROUPS). */
  stack: ["java", "python", "django", "postgresql", "docker", "actions"],
} as const;

/* ───────────────────────── Navegación ───────────────────────── */

export type NavItem = { id: string; label: string };

export const NAV: NavItem[] = [
  { id: "about", label: "Sobre mí" },
  { id: "skills", label: "Stack" },
  { id: "work", label: "Trabajo" },
  { id: "experience", label: "Recorrido" },
  { id: "achievements", label: "Logros" },
  { id: "contact", label: "Contacto" },
];

/* ───────────────────────── Stack (tabla periódica) ───────────────────────── */

/** uso = lo aplico en trabajo o proyectos; practica = lo practico ahora; aprendiendo = en el roadmap. */
export type Level = "uso" | "practica" | "aprendiendo";

export const LEVELS: { id: Level; label: string; hint: string }[] = [
  { id: "uso", label: "Lo uso", hint: "Lo aplico en mi trabajo o en proyectos." },
  { id: "practica", label: "Lo practico", hint: "En práctica." },
  { id: "aprendiendo", label: "Aprendiendo", hint: "Está en mi roadmap." },
];

export type Skill = { id: string; name: string; symbol: string; level: Level };
export type SkillGroup = { family: string; skills: Skill[] };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    family: "Lenguajes",
    skills: [
      { id: "java", name: "Java", symbol: "Jv", level: "uso" },
      { id: "python", name: "Python", symbol: "Py", level: "uso" },
      { id: "javascript", name: "JavaScript", symbol: "Js", level: "uso" },
      { id: "sql", name: "SQL", symbol: "Sq", level: "uso" },
      { id: "typescript", name: "TypeScript", symbol: "Ts", level: "aprendiendo" },
    ],
  },
  {
    family: "Backend",
    skills: [
      { id: "spring", name: "Spring Boot", symbol: "Sp", level: "uso" },
      { id: "django", name: "Django / DRF", symbol: "Dj", level: "uso" },
      { id: "celery", name: "Celery", symbol: "Ce", level: "uso" },
      { id: "rest", name: "APIs REST", symbol: "Rs", level: "uso" },
      { id: "react", name: "React", symbol: "Re", level: "uso" },
    ],
  },
  {
    family: "Datos",
    skills: [
      { id: "postgresql", name: "PostgreSQL", symbol: "Pg", level: "uso" },
      { id: "mysql", name: "MySQL", symbol: "My", level: "uso" },
    ],
  },
  {
    family: "DevOps y entrega",
    skills: [
      { id: "git", name: "Git", symbol: "Gt", level: "uso" },
      { id: "github", name: "GitHub", symbol: "Gh", level: "uso" },
      { id: "actions", name: "GitHub Actions", symbol: "Ga", level: "uso" },
      { id: "docker", name: "Docker", symbol: "Dk", level: "uso" },
      { id: "nginx", name: "Nginx", symbol: "Nx", level: "uso" },
      { id: "tailwind", name: "Tailwind CSS", symbol: "Tw", level: "practica" },
      { id: "linux", name: "Linux / WSL2", symbol: "Lx", level: "uso" },
      { id: "make", name: "Makefile", symbol: "Mk", level: "uso" },
      { id: "node", name: "Node.js", symbol: "Nd", level: "practica" },
    ],
  },
  {
    family: "Prácticas",
    skills: [
      { id: "scrum", name: "Scrum", symbol: "Sc", level: "uso" },
      { id: "testing", name: "Pruebas automatizadas", symbol: "Pt", level: "uso" },
      { id: "adr", name: "ADR y documentación", symbol: "Ad", level: "uso" },
    ],
  },
  {
    family: "Aprendiendo",
    skills: [
      { id: "terraform", name: "Terraform", symbol: "Tf", level: "aprendiendo" },
      { id: "kubernetes", name: "Kubernetes", symbol: "K8", level: "aprendiendo" },
      { id: "monitoring", name: "Prometheus + Grafana", symbol: "Pr", level: "aprendiendo" },
      { id: "aws", name: "AWS", symbol: "Aw", level: "aprendiendo" },
    ],
  },
];

/* ───────────────────────── Experiencia (recorrido) ───────────────────────── */

export type Experience = {
  id: string;
  org: string;
  title: string;
  mode?: string;
  start: string; // "YYYY-MM" (aproximado si el CV solo da el año)
  end: string | null; // null = sin fecha de cierre (no se muestra "actualidad")
  period: string;
  bullets: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: "actual",
    org: "Empresa del sector industrial (confidencial)",
    title: "Desarrolladora Backend",
    start: "2025-12",
    end: null,
    period: "2025 – 2026",
    bullets: [
      "Digitalicé 13 formularios de inspección en una plataforma de trazabilidad con Python, Django REST Framework, Celery y PostgreSQL.",
      "Automaticé la gestión de incidencias: cada ítem fallido genera un ticket mediante tareas asíncronas que se ejecutan al confirmar la transacción.",
      "Diseñé un motor de detección de fallas recurrentes con niveles de severidad dinámicos y recomendaciones de mantenimiento.",
      "Extendí el sistema sin modificar los modelos en producción, con un único punto de integración, y documenté el diseño en un informe técnico aprobado.",
      "Evité hasta 100 consultas adicionales por petición precalculando alertas en segundo plano, con umbrales configurables y auditoría.",
    ],
  },
  {
    id: "urbe",
    org: "URBE · Universidad Privada Dr. Rafael Belloso Chacín",
    title: "Desarrolladora Backend",
    mode: "Remoto",
    start: "2022-01",
    end: "2023-12",
    period: "2022 – 2023",
    bullets: [
      "Diseñé y mantuve servicios backend en Java (Spring Boot, Data, Security) y Python (Django REST Framework) para aplicaciones empresariales.",
      "Migré aplicaciones Java heredadas a versiones modernas sin interrumpir los servicios en producción.",
      "Rediseñé esquemas relacionales en PostgreSQL y MySQL y mejoré el rendimiento de la base de datos en un 25 %.",
      "Implementé autenticación, autorización y cifrado de datos en las APIs.",
      "Configuré entornos productivos desde cero con pruebas automatizadas, CI/CD, Docker y documentación técnica.",
      "Guié a compañeros en buenas prácticas de Java y resolución de incidentes, trabajando con Scrum.",
    ],
  },
];

/* ───────────────────────── Recorrido (línea de tiempo) ───────────────────────── */

export const JOURNEY_HEADER = {
  label: "04 · Recorrido",
  title: "Cómo llegué",
  accent: "hasta aquí.",
  intro:
    "Una línea de tiempo honesta: lo que aprendí, cómo lo hice y qué decisiones tomé por el camino.",
} as const;

export type JourneyItem = {
  id: string;
  period: string;
  title: string;
  text: string;
  tech?: string[]; // ids de SKILL_GROUPS
};

/** Orden: de lo más antiguo a lo más reciente. Sin nombres de empresas confidenciales. */
export const JOURNEY: JourneyItem[] = [
  {
    id: "universidad",
    period: "Ene 2022 – Dic 2025",
    title: "Ingeniería en Informática",
    text: "Cuatro años en la URBE (Maracaibo, Venezuela), donde construí la base: programación, bases de datos, redes y desarrollo de software.",
  },
  {
    id: "primer-trabajo",
    period: "2022 – 2023",
    title: "Primer trabajo: backend Java en la universidad",
    text: "Empecé a trabajar mientras estudiaba: servicios backend con Java, bases de datos relacionales, contenedores y Linux, con pruebas automatizadas y CI/CD.",
    tech: ["java", "postgresql", "sql", "docker", "linux"],
  },
  {
    id: "servicio",
    period: "Ene 2024",
    title: "Servicio social: clases de hardware y software",
    text: "A través de una fundación di clases de hardware y software a la comunidad, como servicio social de la universidad. Enseñar me obligó a explicar con claridad lo que ya sabía.",
  },
  {
    id: "pasantias",
    period: "Ago – Dic 2025",
    title: "Prácticas profesionales",
    text: "Cuatro meses para cerrar la carrera, aprendiendo cómo funciona un entorno de producción real. Trabajé con software libre y fortalecí mi lógica de programación.",
  },
  {
    id: "tesis",
    period: "2025",
    title: "Tesis de grado",
    text: "Sistema informático para rehabilitación física con un sensor Kinect de Xbox. Captura los movimientos del paciente con precisión, los muestra en modelos 3D y los valida contra medidas establecidas por fisioterapeutas. Lo construí con PostgreSQL para los datos y MATLAB para el análisis del movimiento.",
    tech: ["postgresql"],
  },
  {
    id: "trabajo",
    period: "2025 – 2026",
    title: "Desarrolladora Backend en el sector industrial",
    text: "Mi primer trabajo fuera de la universidad: digitalicé procesos de inspección en una plataforma de trazabilidad, con tareas asíncronas y reglas que detectan fallas recurrentes.",
    tech: ["python", "django", "postgresql", "docker"],
  },
];

export type Education = {
  id: string;
  org: string;
  title: string;
  period: string;
  detail?: string;
  href?: string;
};

export const EDUCATION: Education[] = [
  {
    id: "urbe-ing",
    org: "URBE · Universidad Privada Dr. Rafael Belloso Chacín",
    title: "Ingeniería en Informática",
    period: "Ene 2022 – Dic 2025",
    detail: "Maracaibo, Venezuela. Incluye proyectos académicos y tesis (ver Trabajo).",
  },
  {
    id: "oracle-one",
    org: "Oracle Next Education (ONE) · Oracle y Alura Latam",
    title: "Programa de Desarrollo Back-End (Java, Spring Boot)",
    period: "Sep 2025 – Ene 2026",
    detail: "[PENDIENTE: enlace al certificado]",
  },
];

/* ───────────────────────── Proyectos (Trabajo) ───────────────────────── */

export type ProjectStatus = "produccion" | "publico" | "academico" | "planeado";

export type Project = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  status: ProjectStatus;
  description: string;
  features: string[];
  /** Ids de SKILL_GROUPS. */
  tech: string[];
  github: string | null;
  /** Título corto para la casilla cerrada del acordeón de Trabajo. */
  short?: string;
  /** Cuatro pasos del flujo ilustrativo (el último se resalta). */
  flow?: [string, string, string, string];
};

export const PROJECTS: Project[] = [
  {
    id: "pipeline",
    short: "Pipeline CI/CD",
    flow: ["Rama", "CI", "Merge", "En vivo"],
    index: "01",
    title: "Pipeline CI/CD del portafolio",
    kicker: "Este sitio · 2026",
    status: "publico",
    description:
      "De una rama a producción sin pasos manuales: construye la imagen, prueba el contenedor y despliega al fusionar.",
    features: [
      "Docker + Nginx reproducible en local y en CI",
      "CI con prueba real del contenedor (curl -f)",
      "Despliegue automático a GitHub Pages",
      "Decisiones registradas en ADR y post-mortems",
    ],
    tech: ["actions", "docker", "nginx", "github"],
    github: "https://github.com/Kchmo-2018/devops-portafolio",
  },
  {
    id: "trazabilidad",
    short: "Plataforma de trazabilidad",
    flow: ["Formulario", "Tarea asíncrona", "Alerta", "Ticket"],
    index: "02",
    title: "Plataforma de trazabilidad",
    kicker: "Experiencia profesional",
    status: "produccion",
    description:
      "Nuevas funcionalidades sobre una plataforma web en producción: formularios digitales, tickets automáticos y alertas de fallas recurrentes.",
    features: [
      "13 formularios digitalizados",
      "Tickets automáticos con tareas asíncronas",
      "Motor de fallas recurrentes con severidad dinámica",
      "Hasta 100 consultas menos por petición",
    ],
    tech: ["python", "django", "celery", "postgresql"],
    github: null,
  },
  {
    id: "entornos",
    short: "Entornos y migración Java",
    flow: ["Código", "Pruebas", "Imagen Docker", "Despliegue"],
    index: "03",
    title: "Entornos productivos y migración Java",
    kicker: "URBE · 2022–2023",
    status: "produccion",
    description:
      "Entornos desde cero con pruebas, CI/CD y Docker, y migración de aplicaciones heredadas sin cortar el servicio.",
    features: [
      "CI/CD y contenedores con documentación técnica",
      "Migración de Java heredado a versiones modernas",
      "Esquemas rediseñados: +25 % de rendimiento",
    ],
    tech: ["java", "spring", "docker", "postgresql"],
    github: null,
  },
  {
    id: "fisioterapia",
    index: "04",
    title: "Rehabilitación física con Kinect y modelos 3D",
    kicker: "Proyecto académico · URBE",
    status: "academico",
    description:
      "Sistema de rehabilitación física que captura los movimientos del paciente con un Kinect de Xbox y los muestra en modelos 3D, validados con medidas de fisioterapeutas. Fue mi tesis de grado.",
    features: ["Captura de movimiento con Kinect", "Modelos 3D interactivos", "Medidas validadas por fisioterapeutas", "Análisis con MATLAB"],
    tech: ["postgresql"],
    github: null,
  },
  {
    id: "asistente-voz",
    index: "05",
    title: "Asistente por comandos de voz",
    kicker: "Proyecto académico · URBE",
    status: "academico",
    description:
      "Asistente que automatiza tareas personales mediante comandos de voz y algoritmos de aprendizaje automático.",
    features: ["Comandos de voz", "Automatización de tareas personales"],
    tech: ["python"],
    github: null,
  },
  {
    id: "nube-aws",
    short: "Despliegue en AWS",
    flow: ["Plan", "Apply", "Contenedor", "Servicio"],
    index: "06",
    title: "Despliegue en la nube con AWS",
    kicker: "Todavía no iniciado",
    status: "planeado",
    description:
      "Llevar la misma imagen del sitio a un servicio de AWS con infraestructura como código, y documentarlo con su ADR.",
    features: ["Infraestructura como código", "Despliegue repetible", "ADR propio"],
    tech: ["aws", "terraform"],
    github: null,
  },
];

/* ───────────────────────── Trabajo ───────────────────────── */

export const WORK = {
  label: "03 · Trabajo",
  title: "Lo que",
  accent: "construí.",
  /** Proyectos del acordeón, en orden. */
  featured: ["pipeline", "trazabilidad", "entornos", "nube-aws"],
  open: "Abrir",
  flowTitle: "Flujo",
  repo: "Ver repositorio",
  statuses: {
    produccion: "En producción",
    publico: "Público",
    academico: "Académico",
    planeado: "Planeado",
  } satisfies Record<ProjectStatus, string>,
};

/* ───────────────────────── Certificaciones ───────────────────────── */

/** Si queda vacío, la sección no se muestra. Solo credenciales obtenidas. */
export const CERTIFICATIONS: { title: string; issuer: string; period: string; href?: string }[] = [
  {
    title: "Programa Back-End (Java, Spring Boot)",
    issuer: "Oracle Next Education · Oracle y Alura Latam",
    period: "Sep 2025 – Ene 2026",
  },
];

/* ───────────────────────── Logros (cifras) ───────────────────────── */

export const ACHIEVEMENTS_HEADER = {
  label: "05 · Logros",
  title: "Cifras",
  accent: "verificables.",
} as const;

export type Achievement = {
  id: string;
  kicker: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  caption: string;
  featured?: boolean; // tarjeta oscura y elevada
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: "bd", kicker: "Rendimiento", value: 25, suffix: " %", label: "Mejora en la base de datos", caption: "Esquemas relacionales rediseñados en PostgreSQL y MySQL." },
  { id: "forms", kicker: "Digitalización", value: 13, label: "Formularios digitalizados", caption: "Formularios de inspección en la plataforma de trazabilidad." },
  { id: "manual", kicker: "Despliegue", value: 0, label: "Pasos manuales a producción", caption: "Fusionar a main publica el sitio.", featured: true },
  { id: "queries", kicker: "Optimización", value: 100, prefix: "hasta ", label: "Consultas evitadas por petición", caption: "Alertas precalculadas en segundo plano." },
  { id: "adr", kicker: "Documentación", value: 5, label: "ADR documentados", caption: "Flujo de ramas, Docker, CI y despliegue." },
];

/* ───────────────────────── Idiomas ───────────────────────── */

export const LANGUAGES = [
  { name: "Español", level: "Nativo" },
  { name: "Inglés", level: "Intermedio (B1), en formación hacia C1" },
] as const;
