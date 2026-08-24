// Genera un sitio estático navegable a partir de los artboards .dc.html.
// Cada .dc.html es contenido plano dentro de <x-dc> con sus estilos en <helmet>:
// aquí se desenvuelve a una página HTML autónoma, más un índice y el canvas completo.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync } from "node:fs";
import { NAV, PREFIX, OVERRIDE, EXTERNAL } from "./wiring.mjs";

const OUT = "public";
const canvas = JSON.parse(readFileSync("canvas.json", "utf8"));
const pageName = Object.fromEntries(canvas.pages.map(p => [p.id, p.name]));

const slug = f => f.replace(/\.dc\.html$/, "");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const between = (src, tag) => {
  const open = src.indexOf(`<${tag}>`);
  const close = src.lastIndexOf(`</${tag}>`);
  if (open === -1 || close === -1) throw new Error(`falta <${tag}>`);
  return src.slice(open + tag.length + 2, close);
};

rmSync(OUT, { recursive: true, force: true });
mkdirSync(`${OUT}/screens`, { recursive: true });


/* ── Cableado: resuelve cada <a>/<button> por su texto contra el mapa ──────── */
const label = html => html
  .replace(/<svg[\s\S]*?<\/svg>/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const stats = { wired: 0, external: 0, inert: 0 };

function wireBody(body, screen, valid) {
  const over = OVERRIDE[screen] || {};
  return body.replace(/<(a|button)\b([^>]*)>([\s\S]*?)<\/\1>/g, (all, tag, attrs, inner) => {
    const key = label(inner);
    const target = over[key] ?? NAV[key] ??
      (PREFIX.find(([p]) => key.startsWith(p)) || [])[1];

    if (target && valid.has(target) && target !== screen) {
      stats.wired++;
      const go = ` data-goto="${target}"`;
      return tag === "a"
        ? `<a${attrs.replace(/href="#"/, `href="./${target}.html"`)}${go}>${inner}</a>`
        : `<button${attrs}${go}>${inner}</button>`;
    }
    if (EXTERNAL[key]) {
      stats.external++;
      return `<${tag}${attrs} data-external title="${esc(EXTERNAL[key])}">${inner}</${tag}>`;
    }
    stats.inert++;
    return all;
  });
}

const boards = canvas.artboards.map((a, i) => ({ ...a, slug: slug(a.file), i }));

const validTargets = new Set(boards.map(b => b.slug));

/* ── Cromo compartido: barra superior fija con anterior/siguiente e índice ── */
const CHROME = `
  :root{color-scheme:light}
  html,body{margin:0;padding:0;background:#EEF2F8}
  .dcbar{position:sticky;top:0;z-index:99999;display:flex;align-items:center;gap:12px;
    padding:10px 18px;background:rgba(255,255,255,.86);backdrop-filter:blur(14px);
    border-bottom:1px solid rgba(30,58,138,.10);font:500 13px/1.4 Inter,system-ui,sans-serif;color:#334155}
  .dcbar a{color:#1D4ED8;text-decoration:none;padding:5px 11px;border-radius:8px;
    border:1px solid rgba(30,58,138,.14);background:#fff;white-space:nowrap}
  .dcbar a:hover{background:#F1F5F9}
  .dcbar .t{font-weight:600;color:#0F172A;margin-right:auto;
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .dcbar .m{color:#64748B;font-weight:400}
  .dcfit{overflow:hidden}
  [data-goto]{cursor:pointer}
  [data-external]{cursor:not-allowed}
  body.hot [data-goto]{outline:2px solid rgba(37,99,235,.85);outline-offset:2px;
    border-radius:6px;background:rgba(37,99,235,.07)}
  body.hot [data-external]{outline:2px dashed rgba(100,116,139,.65);outline-offset:2px;border-radius:6px}
  .dcbar button.tgl{font:inherit;cursor:pointer;color:#1D4ED8;padding:5px 11px;border-radius:8px;
    border:1px solid rgba(30,58,138,.14);background:#fff}
  .dcbar button.tgl[aria-pressed="true"]{background:#1D4ED8;color:#fff;border-color:#1D4ED8}
  .dcstage{transform-origin:top left}
  @media print{.dcbar{display:none}}
`;

/* Ajusta el artboard de ancho fijo al viewport: reduce en pantallas estrechas y
   AMPLÍA en las anchas, que es el caso habitual — los artboards se maquetan a
   1440 y casi todo el mundo revisa esto a 1920. Sin ampliar, la pantalla queda
   pegada a la izquierda con una banda muerta a la derecha.
   El tope evita que un monitor de 2560+ infle el texto a tamaño de cartel; la
   holgura que sobra por encima del tope se reparte a los dos lados. */
const MAX_ZOOM = 1.5;
const FIT = w => `
<script>
(function(){
  var W=${w}, MAX=${MAX_ZOOM}, box=document.querySelector('.dcfit'), s=document.querySelector('.dcstage'), h=0;
  function fit(){
    if(!h) h=s.offsetHeight;
    var bw=box.clientWidth||window.innerWidth;
    var k=Math.min(MAX,bw/W);
    var dx=Math.max(0,(bw-W*k)/2);
    s.style.transform='translateX('+dx+'px) scale('+k+')';
    box.style.height=(h*k)+'px';
  }
  addEventListener('resize',fit);
  addEventListener('load',function(){h=0;fit()});
  fit();

  // Navegación: los <a> ya llevan href, los <button> navegan aquí.
  document.addEventListener('click',function(e){
    var el=e.target.closest('[data-goto],[data-external]');
    if(!el) return;
    if(el.hasAttribute('data-external')){ e.preventDefault(); return; }
    if(el.tagName!=='A'){ e.preventDefault(); location.href='./'+el.dataset.goto+'.html'; }
  });

  // Resaltar zonas activas — se recuerda entre pantallas.
  var tgl=document.querySelector('.tgl');
  function paint(on){
    document.body.classList.toggle('hot',on);
    tgl.setAttribute('aria-pressed',on?'true':'false');
    try{ localStorage.setItem('dc-hot',on?'1':'0'); }catch(_){}
  }
  var on=false; try{ on=localStorage.getItem('dc-hot')==='1'; }catch(_){}
  paint(on);
  tgl.addEventListener('click',function(){ paint(!document.body.classList.contains('hot')); });

  // Flechas para recorrer el orden del lienzo.
  addEventListener('keydown',function(e){
    if(e.metaKey||e.ctrlKey||e.altKey) return;
    var t=e.target.tagName;
    if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT') return;
    var sel=e.key==='ArrowLeft'?'[data-prev]':e.key==='ArrowRight'?'[data-next]':null;
    if(!sel) return;
    var a=document.querySelector(sel); if(a) location.href=a.getAttribute('href');
  });
})();
</script>`;

for (const b of boards) {
  const src = readFileSync(b.file, "utf8");
  const head = between(src, "helmet");
  const body = wireBody(between(src, "x-dc"), b.slug, validTargets);
  const prev = boards[b.i - 1], next = boards[b.i + 1];

  writeFileSync(`${OUT}/screens/${b.slug}.html`, `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(b.title)} · Sunveon Suite</title>
${head}
<style>${CHROME}</style>
</head>
<body>
<div class="dcbar">
  <span class="t">${esc(b.title)}</span>
  <span class="m">${b.i + 1} / ${boards.length} · ${esc(pageName[b.page] || "")}</span>
  <button class="tgl" type="button" aria-pressed="false" title="Resalta lo que es clicable">Zonas activas</button>
  ${prev ? `<a data-prev href="./${prev.slug}.html">← Anterior</a>` : ""}
  ${next ? `<a data-next href="./${next.slug}.html">Siguiente →</a>` : ""}
  <a href="../index.html">Índice</a>
</div>
<div class="dcfit"><div class="dcstage">
${body}
</div></div>
${FIT(b.w)}
</body>
</html>
`);
}

/* ── Los seis recorridos de Flows.dc.html, como puntos de entrada ── */
const FLOWS = [
  ["Revisar el proyecto", "¿Qué está pasando ahora mismo?", ["Main","ProjectOverview"]],
  ["Análisis técnico", "¿Cómo se comportó esta configuración?", ["ProjectOverview","OverviewTechnical"]],
  ["Análisis financiero", "¿Y bajo otras hipótesis de mercado?", ["ProjectOverview","OverviewChangeScenario"]],
  ["Iteración técnica rápida", "¿Y si fuera una batería de 4 h?", ["ProjectOverview","OverviewChangeSim","CaseMatrix"]],
  ["Iteración financiera rápida", "¿Y si la captura subiera un 4%?", ["CaseMatrix","OverviewStale","ProjectOverview"]],
  ["Decisión entre productos", "¿Se justifica la inversión extra?", ["CaseMatrix","CompareAlternatives","CompareAllMetrics"]],
];

/* ── Índice ── */
const byslug = Object.fromEntries(boards.map(b => [b.slug, b]));
const groups = canvas.pages.map(p => ({
  name: p.name,
  items: boards.filter(b => b.page === p.id),
}));

const card = b => `
      <a class="card" href="./screens/${b.slug}.html">
        <span class="n">${String(b.i + 1).padStart(2, "0")}</span>
        <span class="ttl">${esc(b.title)}</span>
        <span class="dim">${b.w} × ${b.h}</span>
      </a>`;

writeFileSync(`${OUT}/index.html`, `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sunveon Suite — Prototipo StoreBrid + ReveNew</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{color-scheme:light;--ink:#0F172A;--mut:#54617A;--line:rgba(30,58,138,.10);--su:#0E9DA8;--b600:#2563EB}
  *{box-sizing:border-box}
  body{margin:0;font:400 15px/1.6 Inter,system-ui,sans-serif;color:var(--ink);
    background:radial-gradient(1200px 700px at 12% -10%,rgba(37,99,235,.10),transparent 60%),
               radial-gradient(1000px 600px at 92% 0%,rgba(14,157,168,.10),transparent 60%),#F6F8FC;
    min-height:100vh}
  .wrap{max-width:1120px;margin:0 auto;padding:64px 24px 96px}
  h1{font:700 40px/1.15 'DM Sans',Inter,sans-serif;margin:0 0 10px;letter-spacing:-.02em}
  .sub{color:var(--mut);margin:0 0 28px;max-width:62ch}
  .cta{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:52px}
  .cta a{display:inline-flex;align-items:center;gap:8px;padding:11px 18px;border-radius:12px;
    text-decoration:none;font-weight:600;font-size:14px;border:1px solid var(--line);
    background:#fff;color:var(--ink);box-shadow:0 2px 10px -4px rgba(30,58,138,.14)}
  .cta a.primary{background:linear-gradient(135deg,var(--b600),var(--su));color:#fff;border-color:transparent;
    box-shadow:0 10px 28px -10px rgba(37,99,235,.5)}
  h2{font:600 13px/1 Inter,sans-serif;text-transform:uppercase;letter-spacing:.09em;
    color:var(--mut);margin:40px 0 14px}
  .grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(250px,1fr))}
  .card{display:flex;flex-direction:column;gap:4px;padding:16px 18px;border-radius:14px;
    background:rgba(255,255,255,.82);border:1px solid var(--line);text-decoration:none;color:inherit;
    box-shadow:0 2px 10px -4px rgba(30,58,138,.12);transition:transform .18s cubic-bezier(.22,.61,.36,1),box-shadow .18s}
  .card:hover{transform:translateY(-2px);box-shadow:0 18px 40px -20px rgba(30,58,138,.34);border-color:rgba(37,99,235,.28)}
  .card .n{font:600 11px/1 Inter,sans-serif;color:var(--su);letter-spacing:.08em}
  .card .ttl{font-weight:600;font-size:15px}
  .card .dim{font-size:12px;color:var(--mut)}
  .flows{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));margin-bottom:8px}
  .flow{display:flex;flex-direction:column;gap:5px;padding:18px 20px;border-radius:16px;
    text-decoration:none;color:inherit;border:1px solid var(--line);
    background:linear-gradient(150deg,rgba(37,99,235,.06),rgba(14,157,168,.05)),rgba(255,255,255,.9);
    box-shadow:0 2px 10px -4px rgba(30,58,138,.12);transition:transform .18s cubic-bezier(.22,.61,.36,1),box-shadow .18s}
  .flow:hover{transform:translateY(-2px);box-shadow:0 18px 40px -20px rgba(30,58,138,.34);border-color:rgba(37,99,235,.30)}
  .flow .fn{font:600 11px/1 Inter,sans-serif;letter-spacing:.09em;text-transform:uppercase;color:var(--b600)}
  .flow .ttl{font:600 17px/1.3 'DM Sans',Inter,sans-serif}
  .flow .q{color:var(--mut);font-size:14px}
  .flow .steps{margin-top:6px;font-size:12px;color:var(--su);font-weight:500}
  footer{margin-top:64px;padding-top:22px;border-top:1px solid var(--line);color:var(--mut);font-size:13px}
</style>
</head>
<body>
<div class="wrap">
  <h1>Sunveon Suite</h1>
  <p class="sub">Prototipo navegable de la integración de experiencia entre StoreBrid (ingeniería)
  y ReveNew (financiero). ${boards.length} pantallas cableadas entre sí: se pulsa y se avanza,
  como en la aplicación real. Empieza por un recorrido o entra por cualquier pantalla.</p>

  <div class="cta">
    <a class="primary" href="./canvas.html">Abrir el lienzo completo</a>
    <a href="./screens/Login.html">Entrar como un usuario →</a>
  </div>

  <h2>Los seis recorridos</h2>
  <div class="flows">
${FLOWS.map(([n, q, steps], i) => `    <a class="flow" href="./screens/${steps[0]}.html">
      <span class="fn">Flujo ${i + 1}</span>
      <span class="ttl">${esc(n)}</span>
      <span class="q">${esc(q)}</span>
      <span class="steps">${steps.map(sl => esc(byslug[sl].title)).join(" → ")}</span>
    </a>`).join("\n")}
  </div>

${groups.map(g => `  <h2>${esc(g.name)}</h2>
  <div class="grid">${g.items.map(card).join("")}
  </div>`).join("\n")}

  <footer>Prototipo de diseño — pantallas estáticas de alta fidelidad, sin backend.</footer>
</div>
</body>
</html>
`);

copyFileSync("suite-storebrid-revenew.html", `${OUT}/canvas.html`);
console.log(`OK — ${boards.length} pantallas + índice + canvas en ${OUT}/`);
console.log(`   enlaces cableados: ${stats.wired} · salidas a producto: ${stats.external} · sin destino: ${stats.inert}`);
