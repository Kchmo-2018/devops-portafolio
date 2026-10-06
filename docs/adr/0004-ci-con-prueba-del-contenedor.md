# ADR-0004: CI que construye la imagen y prueba el contenedor

- **Estado:** Aceptada
- **Fecha:** 2026-10-06

## Contexto

Cada cambio al repositorio puede romper el sitio o la imagen Docker (un `nginx.conf` mal escrito, un archivo con otro nombre, un Dockerfile con una ruta incorrecta). Como `main` se publica automáticamente (ver ADR-0001), un fallo que llegue a esa rama se despliega en vivo.

Hace falta una verificación automática, repetible y ajena a la máquina de quien hace el cambio, que se ejecute antes de integrar y que compruebe algo más que la sintaxis: que el sitio realmente responde.

## Alternativas consideradas

1. **Probar a mano antes de fusionar.** No cuesta nada de configurar, pero depende de la memoria y la disciplina, se salta con facilidad y se ejecuta en la máquina de cada persona. Descartada.
2. **Solo construir la imagen (`docker build`) en el CI.** Detecta errores de Dockerfile y de rutas, pero una imagen puede construirse bien y aun así servir un sitio roto (por ejemplo, con una configuración de Nginx inválida). Descartada por incompleta.
3. **Solo analizadores estáticos (lint de HTML o de configuración).** Atrapan errores de forma, pero no demuestran que el contenedor arranque y responda. Pueden sumarse más adelante como complemento, no como sustituto.
4. **Construir la imagen, levantar el contenedor y hacer una petición HTTP real (`curl -f`).** Valida el recorrido completo: construcción, arranque y respuesta. Elegida.

## Decisión

Se usa un workflow de GitHub Actions (`ci.yml`) que se ejecuta en cada `push` y en cada Pull Request hacia `main`: descarga el código, construye la imagen, levanta el contenedor, espera unos segundos y hace `curl -f` al puerto expuesto. Si cualquier paso falla, el workflow queda en rojo.

## Consecuencias

- **A favor:**
  - La verificación es automática, igual en cada ejecución y corre en un entorno limpio, no en la máquina de quien cambia.
  - Detecta errores reales de construcción y de arranque antes de integrar.
  - El resultado queda visible en el PR y en la insignia del README.
- **En contra:**
  - La espera fija de `sleep 3` es frágil: en un runner lento el contenedor podría no estar listo y dar un falso fallo. Una mejora sería reintentar el `curl` hasta que responda.
  - La prueba es superficial: confirma que el servidor responde con éxito, no que el contenido sea el correcto.
  - Que el CI esté en rojo solo impide fusionar si se respeta; a menos que se active la protección de rama con checks obligatorios, depende de disciplina.
  - Se consumen minutos de GitHub Actions (hoy sin costo para un repositorio público).
- **Cuándo revisar esta decisión:** si aparecen falsos fallos por tiempos de arranque, si se quiere probar el contenido (pruebas de contenido o de enlaces rotos) o si se agregan análisis de seguridad de la imagen.
