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
  card: { id: "KM-2025", dept: "Backend · DevOps", validTill: "[N] años" },
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
      { id: "tailwind", name: "Tailwind CSS", symbol: "Tw", level: "uso" },
      { id: "linux", name: "Linux / WSL2", symbol: "Lx", level: "practica" },
      { id: "make", name: "Makefile", symbol: "Mk", level: "practica" },
      { id: "node", name: "Node.js", symbol: "Nd", level: "practica" },
    ],
  },
  {
    family: "Prácticas",
    skills: [
      { id: "scrum", name: "Scrum", symbol: "Sc", level: "uso" },
      { id: "testing", name: "Pruebas automatizadas", symbol: "Ts", level: "uso" },
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
  end: string | null; // null = actualidad
  period: string;
  bullets: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: "alimentaria",
    org: "Empresa del sector alimentario (confidencial)",
    title: "Desarrolladora Backend",
    start: "2025-12",
    end: null,
    period: "Dic 2025 – actualidad",
    bullets: [
      "Digitalicé 13 formularios de inspección de inocuidad alimentaria en una plataforma de trazabilidad con Python, Django REST Framework, Celery y PostgreSQL.",
      "Automaticé la gestión de no conformidades: cada ítem fallido genera un ticket mediante tareas asíncronas que se ejecutan al confirmar la transacción.",
      "Diseñé un motor de detección de fallas recurrentes con niveles de severidad dinámicos y recomendaciones de mantenimiento para equipos de planta.",
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
};

export const PROJECTS: Project[] = [
  {
    id: "pipeline",
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
    index: "02",
    title: "Plataforma de trazabilidad",
    kicker: "Empresa del sector alimentario · en producción",
    status: "produccion",
    description:
      "Nuevas funcionalidades sobre una plataforma en producción: inspecciones digitales, tickets automáticos y alertas de fallas recurrentes.",
    features: [
      "13 formularios de inocuidad digitalizados",
      "Tickets automáticos con tareas asíncronas",
      "Motor de fallas recurrentes con severidad dinámica",
      "Hasta 100 consultas menos por petición",
    ],
    tech: ["python", "django", "celery", "postgresql"],
    github: null,
  },
  {
    id: "entornos",
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
    title: "Fisioterapia en línea con modelos 3D e IA",
    kicker: "Proyecto académico · URBE",
    status: "academico",
    description:
      "Aplicación web con modelos 3D interactivos y recomendaciones basadas en IA; backend diseñado y optimizado.",
    features: ["Modelos 3D interactivos", "Recomendaciones con IA", "Backend optimizado"],
    tech: ["python", "javascript", "react"],
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
    index: "06",
    title: "Despliegue en la nube con AWS",
    kicker: "Planeado · todavía no iniciado",
    status: "planeado",
    description:
      "Llevar la misma imagen del sitio a un servicio de AWS con infraestructura como código, y documentarlo con su ADR.",
    features: ["Infraestructura como código", "Despliegue repetible", "ADR propio"],
    tech: ["aws", "terraform"],
    github: null,
  },
];

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

export type Achievement = {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  caption: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: "bd", value: 25, suffix: " %", label: "Rendimiento de base de datos", caption: "Esquemas relacionales rediseñados en PostgreSQL y MySQL." },
  { id: "forms", value: 13, label: "Formularios digitalizados", caption: "Inspecciones de inocuidad en la plataforma de trazabilidad." },
  { id: "queries", value: 100, prefix: "hasta ", label: "Consultas evitadas por petición", caption: "Alertas precalculadas en segundo plano." },
  { id: "adr", value: 5, label: "ADR documentados", caption: "Flujo de ramas, Docker, CI y despliegue." },
  { id: "manual", value: 0, label: "Pasos manuales a producción", caption: "Fusionar a main publica el sitio." },
];

/* ───────────────────────── Idiomas ───────────────────────── */

export const LANGUAGES = [
  { name: "Español", level: "Nativo" },
  { name: "Inglés", level: "Intermedio (B1), en formación hacia C1" },
] as const;
