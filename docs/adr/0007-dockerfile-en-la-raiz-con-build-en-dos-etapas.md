# ADR-0007: Dockerfile en la raíz del repositorio con build en dos etapas

- **Estado:** Aceptada
- **Fecha:** 2026-10-09

## Contexto

El ADR-0003 colocó el `Dockerfile`, `nginx.conf` y `.dockerignore` dentro de `src/` y construía la imagen con `./src` como contexto. Funcionaba porque el sitio era un único `index.html`: el contexto contenía exactamente lo que la imagen necesitaba. Ese mismo ADR dejó escrita su condición de revisión: reorganizar si el sitio llegaba a tener un paso de build.

Con la migración a Next.js (ADR-0006) esa condición se cumple. Para generar el sitio hace falta `package.json`, `package-lock.json`, `app/`, `content/` y los archivos de configuración, que viven en la raíz del repositorio y no en `src/`. Docker solo puede leer lo que está dentro del contexto de build, así que con `./src` el build no vería nada de eso.

Además, la imagen ya no puede limitarse a copiar un archivo: tiene que compilar el sitio, y compilar exige Node y cientos de dependencias que no tienen ningún uso al servir el resultado.

## Alternativas consideradas

1. **Dejar el `Dockerfile` en `src/` y construir con `-f src/Dockerfile .`.** Mantiene la ubicación del ADR-0003 y permite que el contexto sea la raíz. Se descartó porque el archivo queda lejos de lo que construye, y `src/` deja de tener sentido una vez retirado el sitio estático antiguo.
2. **Compilar fuera de Docker y copiar solo `out/` a la imagen.** Produce una imagen mínima, pero obliga a tener Node instalado en cada máquina y a ejecutar el build antes de cada `docker build`. El resultado depende de la máquina, y eso es justo lo que Docker debería evitar. Se descartó.
3. **`Dockerfile` en la raíz con dos etapas: Node compila y Nginx sirve `out/`.** El contexto es la raíz, el build es reproducible en cualquier máquina y la imagen final contiene solo Nginx y el sitio generado. Elegida.

## Decisión

Se mueven `Dockerfile`, `nginx.conf` y `.dockerignore` a la raíz del repositorio y la imagen se construye con `docker build -t devops-portfolio .`. El `Dockerfile` tiene dos etapas: la primera, con `node:22-alpine`, ejecuta `npm ci` y `npm run build`; la segunda, con `nginx:alpine`, copia únicamente la carpeta `out/` generada.

Junto con el movimiento se ajusta `nginx.conf`: las URL inexistentes devuelven un 404 real con la página `404.html` que genera Next.js, en lugar de servir la portada con código 200.

## Consecuencias

- **A favor:**
  - El contexto de build contiene lo que el build necesita, y el `Dockerfile` vive junto a lo que construye.
  - La imagen final no incluye Node, `node_modules` ni el código fuente: es más pequeña y expone menos superficie.
  - El build es el mismo en la máquina local y en el CI. Si funciona con `make build`, funciona en el pipeline.
  - Se copian primero `package.json` y el lock, y después el resto: mientras las dependencias no cambien, Docker reutiliza la capa de `npm ci` y un cambio de texto solo repite el build del sitio.
  - `deploy.yml` deja de copiar `src/` y de borrar archivos de infraestructura antes de publicar: ahora publica `out/`, que solo contiene el sitio generado. El paso de limpieza que describía el ADR-0005 desaparece.
- **En contra:**
  - El contexto pasa a ser todo el repositorio, así que el `.dockerignore` deja de ser opcional. Sin `node_modules`, `.next` y `out` en él, el build copiaría las dependencias locales y sería más lento y menos reproducible.
  - La primera construcción es más lenta, porque instala dependencias y compila dentro de Docker.
  - Hay dos configuraciones de `basePath` según el destino. GitHub Pages sirve el sitio bajo `/devops-portafolio/` y lo recibe mediante `NEXT_PUBLIC_BASE_PATH` en `deploy.yml`. La imagen Docker y el CI compilan sin esa variable, porque el contenedor sirve el sitio en la raíz. Si alguien define la variable en el `Dockerfile`, el sitio dentro del contenedor dejará de cargar sus recursos.
- **Cuándo revisar esta decisión:** si el repositorio incorpora más de un servicio (por ejemplo una API propia), conviene un `Dockerfile` por servicio en su propia carpeta; o si el tiempo de build en CI se vuelve un problema, para evaluar la caché de capas de Docker en GitHub Actions.
