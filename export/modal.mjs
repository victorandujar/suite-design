import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
const CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
for (const stem of ["CreateAnalysisCase"]) {
  const base = readFileSync(`${stem}.dc.html`, "utf8");
  const css = `<style>html,body{margin:0;padding:0;background:#EEF4F8}x-dc{display:block}helmet{display:none}</style>`;
  writeFileSync("export/_m.html", base.replace("</body>", css + `<script>addEventListener("load",()=>setTimeout(()=>{
    const m=[...document.querySelectorAll(".atmos > .raise")].pop();
    const r=m.getBoundingClientRect();
    document.title="M"+Math.round(r.top+scrollY)+","+Math.round(r.bottom+scrollY);},400))<\/script></body>`));
  const dom = execFileSync(CH, ["--headless=new","--disable-gpu","--no-sandbox","--hide-scrollbars",
    "--window-size=1440,3000","--virtual-time-budget=8000","--dump-dom",
    `file://${process.cwd()}/export/_m.html`], { maxBuffer: 1 << 26 }).toString();
  const [t, b] = dom.match(/<title>M(\d+),(\d+)<\/title>/).slice(1).map(Number);
  const top = Math.max(0, t - 70), h = Math.min(b - top + 70, 1180);
  const src = base.replace("<x-dc>", `<div class="vp"><div class="sh"><x-dc>`)
                  .replace("</x-dc>", `</x-dc></div></div>`)
                  .replace("</body>", css + `<style>.vp{width:1440px;height:${h}px;overflow:hidden;position:relative;background:#EEF4F8}
                   .sh{position:absolute;left:0;top:${-top}px;width:1440px}</style></body>`);
  writeFileSync("export/_m.html", src);
  execFileSync(CH, ["--headless=new","--disable-gpu","--no-sandbox","--hide-scrollbars",
    "--force-device-scale-factor=2","--window-size=1440,"+h,"--virtual-time-budget=9000",
    `--screenshot=export/img/${stem}-modal.png`, `file://${process.cwd()}/export/_m.html`], { stdio: "ignore" });
  console.log(stem, top, h);
}
