// True content height of every artboard vs the frame canvas.json declares.
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
const CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const probe = `<script>addEventListener("load",()=>setTimeout(()=>{
  const r=document.querySelector(".atmos");
  document.title="M"+Math.ceil(Math.max(r.scrollHeight, r.getBoundingClientRect().height));},450))<\/script>`;
const cv = JSON.parse(readFileSync("canvas.json","utf8"));
const out = [];
for (const a of cv.artboards) {
  const src = readFileSync(a.file,"utf8")
    .replace(/min-height:\d+px/g, "min-height:0px")
    .replace("</body>", `<style>x-dc{display:block}helmet{display:none}html,body{margin:0;background:#EEF4F8}</style>${probe}</body>`);
  writeFileSync("export/_me.html", src);
  const dom = execFileSync(CH, ["--headless=new","--disable-gpu","--no-sandbox","--hide-scrollbars",
    `--window-size=${a.w},1200`,"--virtual-time-budget=8000","--dump-dom",
    `file://${process.cwd()}/export/_me.html`], { maxBuffer: 1<<27 }).toString();
  const h = Number(dom.match(/<title>M(\d+)<\/title>/)[1]);
  const slack = a.h - h;
  out.push([a.file, a.h, h, slack]);
  console.log(`${a.file.replace(".dc.html","").padEnd(24)} frame ${String(a.h).padStart(5)}  content ${String(h).padStart(5)}  ${slack < 0 ? "CLIPPED " + slack : "slack " + slack}`);
}
writeFileSync("export/measured.json", JSON.stringify(out));
