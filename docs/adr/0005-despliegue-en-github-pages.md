# ADR-0005: Despliegue del sitio en GitHub Pages mediante GitHub Actions

- **Estado:** Aceptada
- **Fecha:** 2026-10-06

## Contexto

El portafolio necesita una dirección pública para que reclutadores y otras personas lo vean, y el repositorio debería demostrar un despliegue continuo real: que un cambio fusionado en `main` llegue al sitio sin pasos manuales.

Las restricciones son prácticas: el sitio es estático, no se quiere asumir costos ni administrar servidores, y el repositorio ya está en GitHub con Actions disponible. Además, `src/` contiene archivos de infraestructura (Dockerfile, `nginx.conf`, `.dockerignore`) que no deben publicarse como descargas.

## Alternativas consideradas

1. **Servidor o máquina virtual propia ejecutando el contenedor.** Reproduce el entorno Docker en producción, pero implica costo, mantenimiento del servidor, parches y seguridad, que son desproporcionados para un sitio estático. Descartada por ahora.
2. **Otros servicios de hosting estático (Netlify, Vercel, Cloudflare Pages).** Resuelven el despliegue con facilidad, pero añaden una cuenta y una plataforma más, mientras que GitHub ya aloja el código y las Actions. Descartada por simplicidad.
3. **GitHub Pages publicando desde una rama o carpeta, sin Actions.** Es la forma más simple, pero publica el contenido tal cual, incluidos los archivos de infraestructura, y no deja el paso de despliegue visible ni versionado como código. Descartada.
4. **GitHub Pages con un workflow de GitHub Actions (`deploy.yml`).** Permite preparar una carpeta publicable (`_site/`) sin los archivos de infraestructura, dejar el despliegue definido como código y aplicar permisos mínimos y control de concurrencia. Elegida.

## Decisión

Se publica en GitHub Pages usando `deploy.yml`: en cada `push` a `main` (y manualmente con `workflow_dispatch`) copia `src/` a `_site/`, elimina `Dockerfile`, `nginx.conf` y `.dockerignore`, empaqueta la carpeta como artefacto y la despliega con las acciones oficiales de Pages. El workflow usa permisos mínimos y una cola de concurrencia que evita pisar un despliegue en curso.

## Consecuencias

- **A favor:**
  - Sin costo y sin servidores que mantener.
  - Despliegue continuo real y versionado: fusionar a `main` publica el sitio.
  - Los archivos de infraestructura no se exponen públicamente.
  - HTTPS y URL pública incluidos.
- **En contra:**
  - Solo sirve contenido estático: no hay backend ni procesamiento del lado del servidor.
  - Docker y Nginx no intervienen en producción, así que su configuración (incluidas futuras cabeceras de seguridad) no se aplica en el sitio publicado.
  - Control limitado sobre el servidor (cabeceras, redirecciones, caché) frente a un hosting propio.
  - El despliegue ocurre al fusionar a `main` sin una aprobación adicional, por lo que la calidad depende del flujo de PR y del CI (ver ADR-0001 y ADR-0004).
- **Cuándo revisar esta decisión:** cuando se quiera desplegar el contenedor en una plataforma real (por ejemplo, para practicar infraestructura como código con Terraform o ejecutar en Kubernetes), cuando haga falta controlar cabeceras de seguridad o cuando el sitio necesite un backend.
