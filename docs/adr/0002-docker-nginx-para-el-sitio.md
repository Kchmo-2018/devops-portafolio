# ADR-0002: Docker y Nginx para ejecutar y validar el sitio

- **Estado:** Aceptada
- **Fecha:** 2026-10-06

## Contexto

El sitio es HTML estático y puede abrirse con doble clic (`file://`), pero ese modo no usa HTTP: no hay servidor, ni puertos, ni reglas de resolución de rutas, así que no permite comprobar cómo responde el sitio como lo haría en la web.

Además, el servidor web que lo sirva (su versión y su configuración) puede variar de una máquina a otra, y eso provoca el clásico "en mi máquina funciona" cuando se prueba en otro entorno. Se necesita una forma reproducible de ejecutar y validar el sitio, igual en el equipo local y en el CI, y que además sirva de base para etapas posteriores del roadmap (orquestación con Kubernetes).

## Alternativas consideradas

1. **Abrir `index.html` directamente (`file://`).** No requiere nada, pero no ejerce HTTP, puertos ni rutas, por lo que no valida lo que importa. Descartada.
2. **Servidor de desarrollo ligero (`python -m http.server`, extensiones tipo Live Server).** Sí sirve por HTTP, pero depende de lo que tenga instalado cada equipo y no es el mismo entorno que correría en el CI. No resuelve la reproducibilidad. Descartada.
3. **Instalar Nginx directamente en la máquina.** Da un servidor real, pero la versión y la configuración dependen del sistema operativo de cada persona y dejan el equipo "contaminado" con instalaciones y archivos de configuración. Descartada.
4. **Contenedor con otro servidor web (Apache, Caddy).** Mantiene la reproducibilidad. Se eligió Nginx por ser el más extendido en el ecosistema DevOps (proxy inverso, balanceo, Kubernetes) y por tener una imagen oficial muy ligera sobre Alpine.

## Decisión

Se empaqueta el sitio en una imagen Docker basada en `nginx:alpine`, con configuración propia (`nginx.conf`), y se ejecuta como contenedor tanto en local (`make run`) como en el CI.

## Consecuencias

- **A favor:**
  - El mismo entorno en local y en el CI: lo que se prueba es lo que se ejecuta.
  - Se ejerce HTTP real (puertos, rutas, `try_files`), no solo la apertura de un archivo.
  - Se practica y se evidencia contenerización, habilidad muy demandada, y se deja la imagen lista para Kubernetes.
- **En contra:**
  - Exige tener Docker instalado para ejecutar el proyecto en local.
  - Para un sitio estático es más herramienta de la necesaria: se asume por motivos de aprendizaje y de preparación del roadmap.
  - La imagen no es lo que se publica: en producción el sitio lo sirve GitHub Pages (ver ADR-0005), así que la configuración de Nginx no aplica allí.
  - El `nginx.conf` actual es mínimo y no incluye cabeceras de seguridad.
- **Cuándo revisar esta decisión:** al llegar a la etapa de Kubernetes o de despliegue con contenedores, o cuando se quiera endurecer la configuración de Nginx (cabeceras de seguridad, restricción de métodos, ocultar la versión).
