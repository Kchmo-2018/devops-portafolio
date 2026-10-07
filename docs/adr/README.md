# Registros de decisiones de arquitectura (ADR)

Un ADR es un documento corto que registra **una decisión técnica y su razonamiento**: qué problema había, qué opciones se evaluaron, qué se eligió y qué consecuencias tiene. El código muestra *qué* se hizo; un ADR conserva el *porqué*, que es lo primero que se olvida con el tiempo.

## Reglas

- Un archivo por decisión, numerado en orden: `NNNN-titulo-en-minusculas.md`.
- Un ADR aceptado no se reescribe. Si la decisión cambia, se crea un ADR nuevo que lo reemplaza y se actualiza el estado del anterior.
- Se parte de la plantilla [`0000-plantilla.md`](0000-plantilla.md).

## Índice

| ADR | Título | Estado |
|---|---|---|
| [0001](0001-flujo-de-ramas-y-commits.md) | Flujo de ramas, Pull Requests y Conventional Commits | Aceptada |
| [0002](0002-docker-nginx-para-el-sitio.md) | Docker y Nginx para ejecutar y validar el sitio | Aceptada |
| [0003](0003-dockerfile-en-src.md) | Dockerfile y configuración de Nginx dentro de `src/` | Aceptada |
| [0004](0004-ci-con-prueba-del-contenedor.md) | CI que construye la imagen y prueba el contenedor | Aceptada |
| [0005](0005-despliegue-en-github-pages.md) | Despliegue del sitio en GitHub Pages mediante GitHub Actions | Aceptada |
| [0006](0006-nextjs-estatico-con-tailwind.md) | Next.js exportado como sitio estático, con Tailwind CSS | Aceptada |
