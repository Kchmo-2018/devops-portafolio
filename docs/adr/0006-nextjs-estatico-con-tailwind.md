# ADR-0006: Next.js exportado como sitio estático, con Tailwind CSS

- **Estado:** Propuesta
- **Fecha:** 2026-10-07

## Contexto

El sitio nació como un `index.html` único servido con Nginx y publicado en GitHub Pages (ADR-0002 a ADR-0005). Ese formato sirvió para montar y entender el pipeline, pero el portafolio final necesita varias secciones con movimiento (tarjeta que gira, tabla periódica filtrable, línea de tiempo, contadores), componentes que se repiten y todo el contenido (perfil, stack, proyectos, recorrido, logros) en un solo lugar para poder cambiarlo sin tocar el diseño. Además, el sitio debe poder ofrecerse en español e inglés.

Un único HTML con todo ese contenido y esa lógica se vuelve difícil de mantener y de revisar en un Pull Request. Por otro lado, el despliegue sigue siendo estático (GitHub Pages) y el sitio no necesita un servidor propio.

## Alternativas consideradas

1. **Seguir con HTML estático y Tailwind por línea de comandos.** Es lo que ya está instalado y no cambia el pipeline. Se descartó porque no ofrece componentes ni un modelo de datos: el contenido quedaría repetido en el HTML y las animaciones, en un script suelto.
2. **Astro.** Genera HTML casi sin JavaScript y tiene una curva de aprendizaje baja. Se descartó porque las partes interactivas requieren montar "islas" con otro framework, así que se acaba usando React igualmente, y su presencia en ofertas de trabajo es menor.
3. **Next.js con exportación estática (`output: "export"`).** Permite componentes React tipados con TypeScript, un archivo de datos central y Tailwind 4 integrado. Genera archivos estáticos que GitHub Pages sirve sin cambios. Elegida.

## Decisión

Se migra el sitio a Next.js con TypeScript y Tailwind CSS 4, configurado con exportación estática. El contenido vive en un archivo de datos (`src/lib/data.ts`) que los componentes solo leen. El pipeline añade los pasos `npm ci`, lint, comprobación de tipos y `next build`; el despliegue publica la carpeta exportada. La imagen Docker pasa a ser de dos etapas: una con Node que compila y otra con Nginx que sirve el resultado.

## Consecuencias

- **A favor:**
  - Contenido separado del diseño: cambiar un texto o un proyecto no exige tocar componentes.
  - Componentes reutilizables y tipados; el compilador detecta datos mal formados antes de desplegar.
  - El pipeline gana pasos reales (instalación reproducible, lint, tipos, build) y la imagen Docker multi-etapa, que es práctica habitual en equipos.
  - Next.js y React son de las tecnologías más pedidas en ofertas.
- **En contra:**
  - Curva de aprendizaje mayor: React, TypeScript y la estructura de Next.js.
  - Más JavaScript que un sitio puramente estático, y una dependencia grande (`node_modules`) que hay que mantener actualizada.
  - Hay que reescribir el CI, el Dockerfile y `deploy.yml`, y la dependencia de Tailwind instalada por línea de comandos se sustituye por la integración de Next.
  - La exportación estática descarta funciones del servidor de Next.js (rutas de API, renderizado bajo demanda); no se necesitan hoy, pero limitan el futuro.
- **Cuándo revisar esta decisión:** si el sitio necesita backend propio (formularios, autenticación), si el tiempo de build o el peso del JavaScript se vuelven un problema, o si se decide priorizar un sitio sin framework.
