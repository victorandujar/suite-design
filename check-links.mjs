// Verifica el sitio generado antes de publicar: que no haya destinos rotos,
// que las pantallas sigan alcanzándose pulsando, y que los seis recorridos
// documentados en Flows.dc.html se recorran de extremo a extremo.
import { readFileSync, readdirSync, existsSync } from "node:fs";

const DIR = "public/screens";
if (!existsSync(DIR)) {
  console.error("No existe public/ — ejecuta `npm run build` primero.");
  process.exit(1);
}

const screens = readdirSync(DIR).filter(f => f.endsWith(".html")).map(f => f.slice(0, -5));
const graph = new Map();
let broken = 0;

for (const s of screens) {
  const html = readFileSync(`${DIR}/${s}.html`, "utf8");
  const out = new Set([...html.matchAll(/data-goto="([^"]+)"/g)].map(m => m[1]));
  for (const t of out) {
    if (!screens.includes(t)) { console.error(`ROTO  ${s} → ${t}`); broken++; }
  }
  graph.set(s, out);
}

/* Alcanzabilidad pulsando desde la pantalla de entrada. */
const seen = new Set(["Login"]);
for (const stack = ["Login"]; stack.length; ) {
  for (const t of graph.get(stack.pop()) ?? []) if (!seen.has(t)) { seen.add(t); stack.push(t); }
}

/* Los recorridos que el prototipo promete en su índice. */
const FLOWS = [
  ["1 Revisar el proyecto",      ["Login", "Main", "ProjectOverview"]],
  ["2 Análisis técnico",         ["ProjectOverview", "OverviewTechnical"]],
  ["3 Análisis financiero",      ["ProjectOverview", "OverviewChangeScenario"]],
  ["4 Iteración técnica",        ["ProjectOverview", "OverviewChangeSim", "CaseMatrix"]],
  ["5 Iteración financiera",     ["CaseMatrix", "OverviewStale", "ProjectOverview"]],
  ["6 Decisión entre productos", ["CaseMatrix", "CompareAlternatives", "CompareAllMetrics"]],
];

let failed = 0;
for (const [name, path] of FLOWS) {
  const gaps = path.slice(0, -1)
    .map((from, i) => [from, path[i + 1]])
    .filter(([from, to]) => !graph.get(from)?.has(to));
  if (gaps.length) {
    failed++;
    console.error(`FALLA ${name}`);
    for (const [from, to] of gaps) console.error(`        falta ${from} → ${to}`);
  }
}

const orphans = screens.filter(s => !seen.has(s));
const wired = [...graph.values()].reduce((n, s) => n + s.size, 0);

console.log(`${screens.length} pantallas · ${wired} destinos · ${seen.size} alcanzables pulsando`);
if (orphans.length) console.log(`sólo desde el índice: ${orphans.join(", ")}`);

if (broken || failed) {
  console.error(`\nFALLO — ${broken} enlaces rotos, ${failed} recorridos incompletos. No publiques.`);
  process.exit(1);
}
console.log("OK — sin enlaces rotos y los seis recorridos se completan.");
