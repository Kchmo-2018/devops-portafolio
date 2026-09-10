# DevOps & Infrastructure Portfolio

Portafolio Personal enfocado en prácticas de DevOps: control de versiones, CI/DC, contenerización e infraestructura como codigo. Este repositorio documenta tanto el resultado como el proceso de aprendizaje detras de cada desicion técnica

Nota: Sujeto a proximos cambios

## Tech Stack

* HTML5 + Tailwind CSS - estructura y estilo sel sitio 
* Javascript - interactividad mínima
* Git / Github - control de versiones y flujo basado en ramas 
* Convetional commits - estandarización del historial de cambios

## Estructura del proyecto
 
```text
devops-portfolio/
├── .github/
│   └── workflows/        # Workflows de CI/CD (GitHub Actions) — próximamente
├── docs/                 # Registros de decisiones de arquitectura (ADRs)
│   └── decisiones.md
├── infrastructure/       # Manifiestos de Terraform — próximamente
├── src/                  # Código fuente del sitio
│   ├── index.html
│   ├── nginx.conf
│   └── Dockerfile
└── README.md
```

## Estructura y DevPos

1. Clonar el repositorio: `git clone <url-del-repo>`
2. Entrar a la carpeta: `cd devops-portfolio/src`
3. Abrir `index.html` en el navegador (por ahora, sin build necesario)
4. *(Próximamente, tras agregar Docker)*: `docker build -t devops-portfolio . && docker run -p 8080:80 devops-portfolio` 

## Roadmap

* [x] Estructura inicial del repositorio y convenciones de commits
* [ ] Contenerización con Docker + Nginx
* [ ] Pipeline de CI/CD con GitHub Actions
* [ ] Despliegue automatizado a la nube (AWS S3/CloudFront)
* [ ] Infraestructura como código con Terraform
* [ ] Proyectos adicionales de práctica (Kubernetes, monitoreo con Prometheus/Grafana)