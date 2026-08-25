# Sunveon Suite — prototipo StoreBrid + ReveNew

Prototipo de diseño de alta fidelidad de la integración de experiencia entre
**StoreBrid** (ingeniería) y **ReveNew** (financiero): 35 pantallas repartidas en
tres secciones — espacio de trabajo del proyecto, la Suite, y estados/licencias/patrones.

## Qué se publica

| Ruta | Contenido |
| --- | --- |
| `/` | Índice con las 35 pantallas agrupadas por sección |
| `/screens/<Pantalla>` | Cada pantalla, cableada: se pulsa y se navega |
| `/canvas.html` | El lienzo completo con zoom y desplazamiento (archivo único) |

## Navegación

Las 35 pantallas están enlazadas entre sí, así que se recorre como una aplicación:
pulsar «Compare» abre la comparación, «Change simulation» abre el cambio de caso
técnico, «Create analysis case» abre el emparejamiento, y la barra lateral funciona.
30 de las 35 se alcanzan pulsando desde «Sign in»; las cinco restantes son variantes
de arquitectura y material de referencia, y se abren desde el índice.

Los siete recorridos documentados en `Flows.dc.html` son los puntos de entrada del
índice y están verificados de extremo a extremo.

Extras de revisión: **Zonas activas** en la barra superior resalta lo clicable
(azul continuo) frente a lo que sale hacia StoreBrid o ReveNew (gris discontinuo),
y las flechas ← → recorren el orden del lienzo.

Lo que no navega —pestañas, filtros, paginación, campos— se queda inerte a
propósito: son maquetas estáticas, no hay estado en la página.

## Cómo funciona

Las pantallas fuente son los `*.dc.html` de la raíz: contenido dentro de `<x-dc>`
con sus estilos en `<helmet>`, y `canvas.json` define el orden, los títulos y las
secciones. `build-site.mjs` los desenvuelve a HTML autónomo y genera `public/`.

Los artboards traen todo su interactivo como `href="#"`. El destino de cada
elemento se resuelve por su texto contra el mapa de `wiring.mjs`, en tiempo de
compilación: los `.dc.html` no se tocan y siguen siendo regenerables desde
`build.mjs`. Para cambiar a dónde lleva algo, se edita `wiring.mjs`.

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
ejecutan lógica. La navegación es real; el cálculo no.
