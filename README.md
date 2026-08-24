# Sunveon Suite — prototipo StoreBrid + ReveNew

Prototipo de diseño de alta fidelidad de la integración de experiencia entre
**StoreBrid** (ingeniería) y **ReveNew** (financiero): 27 pantallas repartidas en
tres secciones — espacio de trabajo del proyecto, la Suite, y estados/licencias/patrones.

## Qué se publica

| Ruta | Contenido |
| --- | --- |
| `/` | Índice con las 27 pantallas agrupadas por sección |
| `/screens/<Pantalla>` | Cada pantalla como página autónoma, con anterior/siguiente |
| `/canvas.html` | El lienzo completo con zoom y desplazamiento (archivo único) |

## Cómo funciona

Las pantallas fuente son los `*.dc.html` de la raíz: contenido dentro de `<x-dc>`
con sus estilos en `<helmet>`, y `canvas.json` define el orden, los títulos y las
secciones. `build-site.mjs` los desenvuelve a HTML autónomo y genera `public/`.

```bash
npm run build   # genera public/
npm run dev     # genera y sirve en local
```

`public/` no está versionado: Vercel lo reconstruye en cada despliegue, así que
editar un `.dc.html` y hacer push actualiza la web publicada.

## Despliegue

Vercel, sin configuración adicional — `vercel.json` ya declara el comando de
compilación y el directorio de salida. Cada push a `main` republica el sitio.

## Alcance

Maquetas estáticas, sin backend: los datos son de ejemplo y los controles no
ejecutan lógica.
