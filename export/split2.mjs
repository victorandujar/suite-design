import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
const CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const JOBS = [["ProjectOverview", 912, 2100], ["OverviewStale", 1000, 2190]];
const css = `<style>html,body{margin:0;padding:0;background:#EEF4F8}x-dc{display:block}helmet{display:none}</style>`;
for (const [stem, start, h] of JOBS) {
  const base = readFileSync(`${stem}.dc.html`, "utf8");
  writeFileSync("export/_s.html", base.replace("</body>", css + `<script>addEventListener("load",()=>setTimeout(()=>{
    const t=[...document.querySelectorAll(".content h2,.content h3,.content .t-card,.content section")]
      .map(e=>({y:Math.round(e.getBoundingClientRect().top+scrollY),t:(e.textContent||"").replace(/\\s+/g," ").trim().slice(0,60)}));
    document.title="S"+JSON.stringify(t);},400))<\/script></body>`));
  const dom = execFileSync(CH, ["--headless=new","--disable-gpu","--no-sandbox","--hide-scrollbars",
    `--window-size=1440,${h}`,"--virtual-time-budget=8000","--dump-dom",
    `file://${process.cwd()}/export/_s.html`], { maxBuffer: 1 << 27 }).toString();
  const items = JSON.parse(dom.match(/<title>S(.*?)<\/title>/s)[1].replace(/&quot;/g,'"').replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">"));
  const hit = items.find((o) => o.y > start + 200 && /this project has to combine/i.test(o.t));
  const cut = Math.round((hit ? hit.y : (start + h) / 2) - 26);
  console.log(stem, "cut at", cut, "->", `${start}-${cut}`, `${cut}-${h}`);
  const shot = (top, hh, out) => {
    const src = base.replace("<x-dc>", `<div class="vp"><div class="sh"><x-dc>`).replace("</x-dc>", `</x-dc></div></div>`)
      .replace("</body>", css + `<style>.vp{width:1204px;height:${hh}px;overflow:hidden;position:relative;background:#EEF4F8}
        .sh{position:absolute;left:-236px;top:${-top}px;width:1440px}</style></body>`);
    writeFileSync("export/_s.html", src);
    execFileSync(CH, ["--headless=new","--disable-gpu","--no-sandbox","--hide-scrollbars",
      "--force-device-scale-factor=2","--window-size=1204,"+hh,"--virtual-time-budget=9000",
      `--screenshot=${out}`, `file://${process.cwd()}/export/_s.html`], { stdio: "ignore" });
  };
  shot(start, cut - start, `export/img/${stem}-2a.png`);
  shot(cut, h - cut, `export/img/${stem}-2b.png`);
}
