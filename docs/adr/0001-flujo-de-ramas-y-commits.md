# ADR-0001: Flujo de ramas, Pull Requests y Conventional Commits

- **Estado:** Aceptada
- **Fecha:** 2026-10-06

## Contexto

`main` es la rama desde la que se publica automáticamente el sitio en vivo: el workflow `deploy.yml` despliega cada commit que llega a ella, sin pasos intermedios. Si se trabaja directamente sobre `main`, un error (un archivo de configuración mal escrito, un `index.html` roto, un workflow con un typo) queda visible públicamente antes de ser detectado.

Además, sin una convención para los mensajes de commit, el historial es difícil de leer y de auditar: no se distingue de un vistazo si un cambio añade una funcionalidad, corrige un fallo o solo toca documentación.

Se necesita un mecanismo que revise y pruebe cada cambio antes de integrarlo, que señale los conflictos con el código existente y que deje un historial comprensible.

## Alternativas consideradas

1. **Trabajar directamente sobre `main` (sin ramas).** Es lo más simple y no exige ningún proceso. Se descartó porque cada commit se publica en vivo: no hay ninguna oportunidad de detectar un error antes de que lo vea el público, y un fallo obliga a corregir "en caliente" sobre producción.
2. **Git Flow (ramas `develop`, `release`, `hotfix` además de `main`).** Es un modelo completo pensado para software con versiones y ciclos de lanzamiento. Se descartó porque aquí no hay versiones ni equipos: el sitio se publica de forma continua y mantener varias ramas de larga duración añadiría trabajo de sincronización sin aportar beneficio.
3. **Ramas y Pull Requests, pero sin convención de commits.** Resuelve el riesgo de publicar errores, pero deja el historial con mensajes inconsistentes ("arreglos", "cambios", "update"). Se descartó porque el costo de adoptar la convención es mínimo y el historial legible tiene valor tanto para el mantenimiento como para quien revise el repositorio.

## Decisión

Se adopta un flujo basado en `main` (trunk-based simplificado): `main` siempre debe estar en estado desplegable, todo cambio se desarrolla en una rama corta (`feature/...`, `docs/...`, `fix/...`) y se integra mediante un Pull Request. El CI debe pasar en verde antes de fusionar. Los mensajes de commit siguen la especificación Conventional Commits (`feat`, `fix`, `docs`, `chore`, con alcance opcional).

## Consecuencias

- **A favor:**
  - Un cambio roto se detecta en el Pull Request, antes de llegar a `main` y de publicarse.
  - El CI (construir la imagen, levantar el contenedor y comprobar con `curl -f`) verifica que nada se rompió; GitHub señala por separado los conflictos de fusión.
  - El historial se lee de un vistazo y permite generar changelogs más adelante.
  - Cada cambio queda con su discusión y su revisión asociadas.
- **En contra:**
  - Más pasos para cambios pequeños: crear rama, abrir PR y esperar al CI en lugar de hacer un solo commit.
  - Exige disciplina para escribir los mensajes con el formato correcto.
  - Con un solo colaborador, el PR no aporta una segunda revisión humana. El control lo da el CI y la revisión propia.
- **Cuándo revisar esta decisión:** si se suman colaboradores (activar reglas de protección de rama y revisiones obligatorias), si el proyecto empieza a publicar versiones numeradas (valorar un flujo con releases) o si se quiere automatizar el changelog y las versiones a partir de los commits.
