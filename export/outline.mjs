import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
const CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const packed = JSON.parse(readFileSync("export/packed.json", "utf8"));
const probe = `<script>addEventListener("load",()=>setTimeout(()=>{
  const sel=".content h1,.content h2,.content h3,.content .t-card,.content .band,.content .eyebrow";
  const seen=[...document.querySelectorAll(sel)].map(e=>({y:Math.round(e.getBoundingClientRect().top+scrollY),
    t:(e.textContent||"").replace(/\\s+/g," ").trim().slice(0,90)})).filter(o=>o.t);
  document.title="O"+JSON.stringify(seen);},400))<\/script>`;
const out = {};
for (const [file, d] of Object.entries(packed)) {
  const src = readFileSync(file, "utf8").replace("</body>", `<style>x-dc{display:block}helmet{display:none}html,body{margin:0}</style>${probe}</body>`);
  writeFileSync("export/_o.html", src);
  const dom = execFileSync(CH, ["--headless=new","--disable-gpu","--no-sandbox","--hide-scrollbars",
    `--window-size=1440,${d.h}`,"--virtual-time-budget=8000","--dump-dom",
    `file://${process.cwd()}/export/_o.html`], { maxBuffer: 1 << 27 }).toString();
  const m = dom.match(/<title>O(.*?)<\/title>/s); if (!m) continue;
  const items = JSON.parse(m[1].replace(/&quot;/g,'"').replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">"));
  const stem = file.replace(".dc.html","");
  d.bands.forEach(([s,e],i)=>{ out[`${stem}-${i+1}`] = items.filter(o=>o.y>=s-6&&o.y<e).map(o=>o.t); });
}
writeFileSync("export/outline.json", JSON.stringify(out, null, 1));
