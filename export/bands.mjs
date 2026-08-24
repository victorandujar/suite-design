// For each artboard, find natural horizontal cut lines so a tall screen can be
// split into slide-sized bands without ever cutting through a card.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
const CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BAND = 810, MIN = 260;

const probe = `
<script>window.addEventListener("load",()=>{setTimeout(()=>{
  const roots=[...document.querySelectorAll(".content, .drawer, .sheet, .modal, .overlay")];
  const R=(e)=>{const r=e.getBoundingClientRect();return {t:r.top+scrollY,b:r.bottom+scrollY};};
  const blocks=[];
  const walk=(el)=>{ for(const c of el.children){
     const r=R(c); const h=r.b-r.t;
     if(h<=0) continue;
     if(h<=${BAND}) blocks.push(r);
     else if(c.children.length) walk(c);
     else blocks.push(r);
  }};
  (roots.length?roots:[document.body]).forEach(walk);
  blocks.sort((a,b)=>a.t-b.t);
  document.title="BANDS"+JSON.stringify({h:document.documentElement.scrollHeight,blocks});
},400)});<\/script>`;

const files = JSON.parse(readFileSync("canvas.json","utf8")).artboards;
const out = {};
for (const a of files) {
  const src = readFileSync(a.file, "utf8")
    .replace(/min-height:\d+px/, `min-height:${a.h}px`)
    .replace("</body>", `<style>x-dc{display:block}helmet{display:none}html,body{background:#eef4f8;margin:0}</style>${probe}</body>`);
  writeFileSync("export/_p.html", src);
  const dom = execFileSync(CH, ["--headless=new","--disable-gpu","--no-sandbox","--hide-scrollbars",
    `--window-size=${a.w},${a.h}`,"--virtual-time-budget=8000","--dump-dom",
    `file://${process.cwd()}/export/_p.html`], { maxBuffer: 1 << 28 }).toString();
  const m = dom.match(/<title>BANDS(.*?)<\/title>/s);
  if (!m) { console.error("no probe:", a.file); continue; }
  const { h, blocks } = JSON.parse(m[1].replace(/&quot;/g,'"').replace(/&amp;/g,"&"));

  out[a.file] = { w: a.w, h, blocks };
  console.log(a.file.padEnd(30), h, blocks.length, "blocks");
}
writeFileSync("export/bands.json", JSON.stringify(out, null, 1));
