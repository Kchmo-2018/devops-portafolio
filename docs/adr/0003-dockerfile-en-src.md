# ADR-0003: Dockerfile y configuración de Nginx dentro de `src/`

- **Estado:** Aceptada
- **Fecha:** 2026-10-06

## Contexto

La imagen Docker necesita copiar el sitio (`index.html`) y la configuración de Nginx (`nginx.conf`). Docker solo puede ver los archivos que están dentro del **contexto de build**, la carpeta que se le indica al construir, y el archivo `.dockerignore` debe estar en la raíz de ese contexto.

Hay que decidir dónde viven el `Dockerfile` y los archivos de configuración respecto al código del sitio. Durante la construcción inicial se probó mover estos archivos a una carpeta `docker/`, y aparecieron confusiones de rutas y de contexto que obligaron a revertir el cambio.

## Alternativas consideradas

1. **Carpeta separada `docker/` con el Dockerfile y `nginx.conf`.** Separa conceptualmente infraestructura y sitio, pero el contexto de build tendría que ser la raíz del repo (o rutas relativas con `..`, que Docker no permite). Se probó y generó errores de rutas. Descartada.
2. **`Dockerfile` en la raíz del repositorio.** Es una convención habitual, pero el contexto pasa a ser todo el repo: se envían a Docker archivos que no hacen falta (`docs/`, `.github/`) y hay que mantener un `.dockerignore` más complejo. Descartada.
3. **Todo dentro de `src/` y contexto `./src`.** El contexto es exactamente lo que la imagen necesita, las rutas del `COPY` son simples y `.dockerignore` vive junto al Dockerfile. Elegida.

## Decisión

El `Dockerfile`, `nginx.conf` y `.dockerignore` viven en `src/`, junto a `index.html`, y la imagen se construye con `docker build -t devops-portfolio ./src`.

## Consecuencias

- **A favor:**
  - Rutas simples y contexto mínimo: Docker recibe solo lo necesario.
  - Un solo comando de build, el mismo en el `Makefile` y en el CI.
  - Se evita la clase de errores de rutas que ya se vivió.
- **En contra:**
  - Los archivos de infraestructura quedan mezclados con los del sitio. Por eso `deploy.yml` copia `src/` a `_site/` y elimina `Dockerfile`, `nginx.conf` y `.dockerignore` antes de publicar, para no exponerlos como descargas públicas.
  - Si se añade un archivo de infraestructura nuevo en `src/`, hay que acordarse de excluirlo del despliegue.
- **Cuándo revisar esta decisión:** si el sitio crece a varios componentes (por ejemplo, un frontend con paso de build y una API), conviene reorganizar el repositorio con una carpeta por servicio.
