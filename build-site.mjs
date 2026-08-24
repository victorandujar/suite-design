// Genera un sitio estático navegable a partir de los artboards .dc.html.
// Cada .dc.html es contenido plano dentro de <x-dc> con sus estilos en <helmet>:
// aquí se desenvuelve a una página HTML autónoma, más un índice y el canvas completo.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync } from "node:fs";

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

const boards = canvas.artboards.map((a, i) => ({ ...a, slug: slug(a.file), i }));

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
  .dcstage{transform-origin:top left}
  @media print{.dcbar{display:none}}
`;

/* Escala el artboard de ancho fijo para que quepa en pantallas estrechas. */
const FIT = w => `
<script>
(function(){
  var W=${w}, box=document.querySelector('.dcfit'), s=document.querySelector('.dcstage'), h=0;
  function fit(){
    if(!h) h=s.offsetHeight;
    var k=Math.min(1,(box.clientWidth||window.innerWidth)/W);
    s.style.transform = k<1 ? 'scale('+k+')' : 'none';
    box.style.height=(h*k)+'px';
  }
  addEventListener('resize',fit);
  addEventListener('load',function(){h=0;fit()});
  fit();
})();
</script>`;

for (const b of boards) {
  const src = readFileSync(b.file, "utf8");
  const head = between(src, "helmet");
  const body = between(src, "x-dc");
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
  ${prev ? `<a href="./${prev.slug}.html">← Anterior</a>` : ""}
  ${next ? `<a href="./${next.slug}.html">Siguiente →</a>` : ""}
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

/* ── Índice ── */
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
  footer{margin-top:64px;padding-top:22px;border-top:1px solid var(--line);color:var(--mut);font-size:13px}
</style>
</head>
<body>
<div class="wrap">
  <h1>Sunveon Suite</h1>
  <p class="sub">Prototipo de la integración de experiencia entre StoreBrid (ingeniería) y ReveNew
  (financiero). ${boards.length} pantallas de diseño, navegables una a una o sobre el lienzo completo.</p>

  <div class="cta">
    <a class="primary" href="./canvas.html">Abrir el lienzo completo</a>
    <a href="./screens/${boards[0].slug}.html">Empezar el recorrido →</a>
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
