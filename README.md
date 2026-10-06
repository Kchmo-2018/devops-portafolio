# DevOps & Infrastructure Portfolio

[![CI](https://github.com/Kchmo-2018/devops-portafolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Kchmo-2018/devops-portafolio/actions/workflows/ci.yml)
[![Deploy](https://github.com/Kchmo-2018/devops-portafolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Kchmo-2018/devops-portafolio/actions/workflows/deploy.yml)

**Sitio en vivo:** <https://kchmo-2018.github.io/devops-portafolio/>

Portafolio personal enfocado en prácticas de DevOps: control de versiones, CI/CD, contenerización e infraestructura como código. Este repositorio documenta tanto el resultado como el proceso de aprendizaje detrás de cada decisión técnica.

> Proyecto en construcción: el contenido y la estructura cambian a medida que avanza el roadmap.

## Tech Stack

Lo que ya está implementado y funcionando en este repositorio:

* **HTML5**: sitio estático.
* **Docker + Nginx (Alpine)**: imagen que empaqueta y sirve el sitio.
* **GitHub Actions**: pipeline de CI que construye la imagen y comprueba que el contenedor responde, y pipeline de CD que despliega el sitio.
* **GitHub Pages**: hosting del sitio estático, publicado automáticamente desde `main`.
* **Make**: comandos estandarizados para construir y ejecutar el proyecto.
* **Git / GitHub**: control de versiones con flujo basado en ramas y Pull Requests.
* **Conventional Commits**: historial de cambios legible y consistente.

## Estructura del proyecto

```text
devops-portafolio/
├── .github/
│   └── workflows/
│       ├── ci.yml        # CI: construye la imagen y prueba el contenedor
│       └── deploy.yml    # CD: despliega el sitio a GitHub Pages
├── docs/
│   └── adr/              # Registros de decisiones de arquitectura (ADR)
├── src/                  # Código fuente del sitio y su imagen Docker
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── index.html
│   └── nginx.conf
├── .gitignore
├── Makefile
└── README.md
```

## Cómo ejecutar localmente

Requisitos: [Docker](https://docs.docker.com/get-docker/) y `make`.

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Kchmo-2018/devops-portafolio.git
   cd devops-portafolio
   ```
2. Construir la imagen y levantar el contenedor:
   ```bash
   make build
   make run
   ```
3. Abrir <http://localhost:8080> en el navegador.
4. Detener y eliminar el contenedor:
   ```bash
   make stop
   ```

Otros comandos disponibles: `make restart` y `make logs`.

## Cómo funciona el pipeline de CI

En cada `push` a `main` y en cada Pull Request hacia `main`, GitHub Actions:

1. Descarga el código del repositorio.
2. Construye la imagen Docker desde `src/`.
3. Levanta el contenedor y hace una petición HTTP real (`curl -f`) para confirmar que el sitio responde.

Si cualquiera de esos pasos falla, el workflow se marca en rojo y el cambio no debería fusionarse.

## Cómo funciona el despliegue continuo (CD)

Cada vez que un cambio se fusiona a `main`, el workflow `deploy.yml`:

1. Copia `src/` a una carpeta `_site/` **sin** los archivos de infraestructura (`Dockerfile`, `nginx.conf`, `.dockerignore`), para no publicarlos junto al sitio.
2. Empaqueta esa carpeta como artefacto.
3. La publica en GitHub Pages.

Decisiones de diseño:

* **Permisos mínimos**: el workflow solo puede leer el código y publicar en Pages.
* **Concurrencia controlada**: dos despliegues seguidos se encolan en lugar de pisarse.
* **Docker no interviene en producción**: Pages sirve los archivos estáticos directamente. Docker y Nginx se usan en el CI para validar la imagen y quedan listos para la etapa de Kubernetes.

## Roadmap

* [x] Estructura inicial del repositorio y convenciones de commits
* [x] Contenerización con Docker + Nginx
* [x] Integración continua (CI) con GitHub Actions
* [x] Despliegue continuo (CD) a GitHub Pages
* [ ] Diseño del sitio con Tailwind CSS
* [ ] Despliegue en la nube (AWS S3 + CloudFront o Azure Static Web Apps)
* [ ] Infraestructura como código con Terraform
* [ ] Proyectos adicionales de práctica (Kubernetes, monitoreo con Prometheus/Grafana)
