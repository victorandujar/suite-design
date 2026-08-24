# AGENTS.md

Instrucciones para agentes que trabajen en este repositorio.

## Regla principal: cada cambio del canvas se publica

Este repositorio **es** la web desplegada. Vercel reconstruye y republica en cada
push a `main`, así que un cambio que no se empuja no existe para quien revisa el
prototipo.

Por tanto, siempre que modifiques el canvas — cualquier `*.dc.html`, `canvas.json`,
`build.mjs`, `build-site.mjs` o `wiring.mjs` — cierra el trabajo así:

```bash
npm run check                 # reconstruye y valida; si falla, arregla antes de seguir
git add -A
git commit -m "<qué cambió y por qué>"
git push origin main
```

No dejes cambios sin empujar al terminar una tarea, y no hace falta pedir permiso
para hacerlo: el usuario ya ha autorizado este flujo para este repositorio.

Dos matices que sí requieren criterio:

- **Nunca empujes con `npm run check` en rojo.** Publicar un prototipo con
  recorridos rotos es peor que no publicar. Arregla o revierte.
- **`git push --force` no.** Si el push se rechaza, haz `git pull --rebase` y
  resuelve.

## Qué es esto

Prototipo de diseño de la Suite Sunveon: 27 pantallas de la integración entre
StoreBrid (ingeniería) y ReveNew (financiero). Maquetas estáticas de alta
fidelidad con navegación real entre ellas. Sin backend, sin estado en la página.

## Arquitectura

```
*.dc.html         Artboards fuente. Contenido dentro de <x-dc>, estilos en <helmet>.
                  Los genera build.mjs. No se abren solos en un navegador.
canvas.json       Orden, títulos, dimensiones y agrupación en secciones.
build.mjs         Genera los *.dc.html desde una base común (el canvas original).
wiring.mjs        Mapa de navegación: texto del elemento → pantalla destino.
build-site.mjs    Desenvuelve los artboards a HTML autónomo y genera public/.
check-links.mjs   Valida el resultado antes de publicar.
public/           Salida generada. Ignorada por git; Vercel la reconstruye.
```

## Cómo se cablea la navegación

Los artboards traen todo su interactivo como `href="#"`. El destino **no** se
escribe en el `.dc.html`: `build-site.mjs` lee el texto de cada `<a>` y `<button>`
y lo resuelve contra `wiring.mjs` en tiempo de compilación.

Esto es deliberado. Los `.dc.html` son salida de `build.mjs` y se regeneran; si
editas navegación dentro de ellos, la pierdes en la siguiente regeneración.
**Para cambiar a dónde lleva algo, edita `wiring.mjs`, nunca el artboard.**

`wiring.mjs` tiene cuatro piezas, en orden de prioridad:

| | Para qué |
| --- | --- |
| `OVERRIDE` | La misma etiqueta significa cosas distintas según la pantalla |
| `NAV` | Coincidencia exacta del texto, válida en cualquier pantalla |
| `PREFIX` | Filas cuyo texto arrastra cifras («High spread €138.0/MWh…») |
| `EXTERNAL` | Sale hacia StoreBrid o ReveNew: se marca, no navega |

## Decisiones de diseño que hay que respetar

**Las salidas a StoreBrid y ReveNew no llevan a ninguna pantalla.** Son ~59
elementos marcados con contorno discontinuo y un tooltip. Es el principio central
del diseño: la Suite enlaza fuera en vez de duplicar el producto dueño del dato.
No inventes esas pantallas.

**Lo que no navega se queda inerte a propósito.** Pestañas, filtros, paginación y
campos de formulario no responden porque no hay estado en la página. Simularlo
con JavaScript haría el prototipo menos honesto sobre lo que es.

**Los seis recorridos de `Flows.dc.html` son el contrato.** `check-links.mjs` los
verifica de extremo a extremo. Si un cambio rompe uno, el problema es el cambio.

## Alcance

Si necesitas cambiar el aspecto de una pantalla, el sitio es `build.mjs`, que
regenera los artboards desde una base compartida — no edites un `.dc.html` a mano
salvo que sea un retoque puntual que vayas a portar después.
