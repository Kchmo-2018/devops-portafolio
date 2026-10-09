# DevOps & Infrastructure Portfolio

[![CI](https://github.com/Kchmo-2018/devops-portafolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Kchmo-2018/devops-portafolio/actions/workflows/ci.yml)
[![Deploy](https://github.com/Kchmo-2018/devops-portafolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Kchmo-2018/devops-portafolio/actions/workflows/deploy.yml)

**Sitio en vivo:** <https://kchmo-2018.github.io/devops-portafolio/>

Portafolio personal de Kimberly Meneses, ingeniera en informática con experiencia en backend (Java/Spring Boot, Python/Django) en transición hacia DevOps. El repositorio es a la vez el sitio y el laboratorio: cada decisión técnica queda documentada en [`docs/adr/`](docs/adr/README.md).

> Proyecto en construcción: el contenido y la estructura cambian a medida que avanza el roadmap.

## Stack

* **Next.js + TypeScript**: sitio exportado como HTML estático (`output: "export"`).
* **Tailwind CSS 4**: estilos.
* **Docker (build en dos etapas) + Nginx**: Node compila el sitio y Nginx sirve solo `out/`.
* **GitHub Actions**: CI (lint, tipos, build, imagen Docker con prueba HTTP) y CD.
* **GitHub Pages**: hosting, publicado desde `main`.
* **Make**, **Git/GitHub** (ramas cortas + PR) y **Conventional Commits**.

## Estructura

```text
devops-portafolio/
├── .github/workflows/
│   ├── ci.yml           # lint, typecheck, build y prueba del contenedor
│   └── deploy.yml       # build con basePath y publicación en GitHub Pages
├── app/                 # páginas, layout y estilos (Next.js App Router)
├── content/             # datos del portafolio, separados del diseño
├── docs/adr/            # registros de decisiones de arquitectura
├── Dockerfile           # build en dos etapas: node → nginx
├── nginx.conf           # servidor estático con 404 real
├── Makefile             # build, run, stop, restart, logs
└── package.json
```

## Ejecutar en local

**Con Docker** (requiere Docker y `make`):

```bash
make build   # compila el sitio dentro de la imagen
make run     # sirve en http://localhost:8080
make stop    # detiene y elimina el contenedor
```

**Modo desarrollo** (requiere Node 22):

```bash
npm ci
npm run dev  # http://localhost:3000
```

Otros scripts: `npm run lint`, `npm run typecheck`, `npm run build`.

## Pipeline

**CI** (en cada PR y push a `main`): `npm ci` → lint → typecheck → build → construye la imagen y comprueba con `curl -f` que el contenedor responde.

**CD** (al fusionar a `main`): compila con `NEXT_PUBLIC_BASE_PATH=/devops-portafolio` y publica `out/` en GitHub Pages, con permisos mínimos y despliegues sin solaparse.

La imagen Docker se construye sin `basePath` (sirve en `/`); solo el despliegue en Pages lo usa. Detalle en [ADR-0007](docs/adr/0007-dockerfile-en-la-raiz-con-build-en-dos-etapas.md).

## Decisiones documentadas

El [índice de ADR](docs/adr/README.md) recoge qué se decidió, qué alternativas se descartaron y cuándo conviene revisarlo.

## Roadmap

* [x] Estructura inicial y convenciones de commits
* [x] Contenerización con Docker + Nginx
* [x] CI y CD con GitHub Actions
* [x] Migración a Next.js con build reproducible en Docker
* [ ] Secciones del portafolio (hero, skills, experiencia, contacto) e i18n ES/EN
* [ ] Despliegue en la nube y dominio propio
* [ ] Infraestructura como código con Terraform
* [ ] Kubernetes y monitoreo (Prometheus/Grafana)
