import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
const CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const MAX = 1120, MIN = 300, SIDE = 236;
mkdirSync("export/img", { recursive: true });

// ── cut lines live in the GAPS between blocks, so no card is ever crossed ──
const raw = JSON.parse(readFileSync("export/bands.json", "utf8"));
const packed = {};
for (const [file, d] of Object.entries(raw)) {
  const iv = [...d.blocks].sort((a, b) => a.t - b.t).reduce((acc, r) => {
    const last = acc.at(-1);
    if (last && r.t <= last.b + 0.5) last.b = Math.max(last.b, r.b); else acc.push({ ...r });
    return acc;
  }, []);
  const gaps = [0];                                    // midpoints of real whitespace — always safe
  for (let i = 0; i < iv.length - 1; i++) if (iv[i + 1].t - iv[i].b >= 2) gaps.push(Math.round((iv[i].b + iv[i + 1].t) / 2));
  gaps.push(d.h);
  const edges = [...new Set(d.blocks.flatMap((r) => [Math.round(r.t), Math.round(r.b)]))].sort((a, b) => a - b);
  const pick = (list, s) => { let e = null; for (const c of list) if (c > s + MIN && c - s <= MAX) e = c; return e; };
  const bands = []; let s = 0;
  while (s < d.h - 2) {
    let e = pick(gaps, s) ?? pick(edges, s) ?? gaps.find((c) => c > s) ?? Math.min(s + MAX, d.h);
    bands.push([s, Math.min(e, d.h)]); s = e;
  }
  if (bands.length > 1 && bands.at(-1)[1] - bands.at(-1)[0] < MIN) {
    const last = bands.pop();
    if (last[1] - bands.at(-1)[0] <= MAX + 220) bands.at(-1)[1] = last[1]; else bands.push(last);
  }
  packed[file] = { w: d.w, h: d.h, bands };
}
writeFileSync("export/packed.json", JSON.stringify(packed, null, 1));

const shot = (srcFile, outPng, { w, x = 0, top = 0, h }) => {
  const src = readFileSync(srcFile, "utf8")
    .replace("<x-dc>", `<div class="vp"><div class="sh"><x-dc>`)
    .replace("</x-dc>", `</x-dc></div></div>`)
    .replace("</body>", `<style>
      html,body{margin:0;padding:0;background:#EEF4F8}
      x-dc{display:block}helmet{display:none}
      .vp{width:${w}px;height:${h}px;overflow:hidden;position:relative;background:#EEF4F8}
      .sh{position:absolute;left:${-x}px;top:${-top}px;width:${x + w}px}
    </style></body>`);
  writeFileSync("export/_r.html", src);
  execFileSync(CH, ["--headless=new","--disable-gpu","--no-sandbox","--hide-scrollbars",
    "--force-device-scale-factor=2", `--window-size=${w},${h}`, "--virtual-time-budget=9000",
    `--screenshot=${outPng}`, `file://${process.cwd()}/export/_r.html`], { stdio: "ignore" });
};

const manifest = [];
for (const f of ["01-cover", "02-value", "03-model", "99-close"]) {
  const p = `export/img/${f}.png`;
  shot(`export/slides/${f}.html`, p, { w: 1440, h: 810 });
  manifest.push({ img: p, w: 1440, h: 810, key: f });
}
for (const [file, d] of Object.entries(packed)) {
  const stem = file.replace(".dc.html", "");
  const hasSide = readFileSync(file, "utf8").includes('class="side"');
  d.bands.forEach(([s, e], i) => {
    const x = i > 0 && hasSide ? SIDE : 0;
    const p = `export/img/${stem}-${i + 1}.png`;
    shot(file, p, { w: d.w - x, x, top: s, h: e - s });
    manifest.push({ img: p, w: d.w - x, h: e - s, key: `${stem}-${i + 1}`, stem, part: i + 1, of: d.bands.length });
  });
}
writeFileSync("export/manifest.json", JSON.stringify(manifest, null, 1));
console.log(manifest.length, "images");
