// Drawer screens: the panel is pinned top:20/bottom:20 to a 2100px page, so it
// carries a lot of empty air. Let it size to its content, then frame that.
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
const CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const FILES = ["OverviewChangeSim","OverviewChangeScenario","OverviewTechnical","FinancialDetails","EditProjectDetails"];
const FIX = `<style>
  html,body{margin:0;padding:0;background:#EEF4F8}
  x-dc{display:block}helmet{display:none}
  .atmos > aside.raise{bottom:auto !important}
  .atmos > aside.raise > div:nth-child(2){flex:none !important}
</style>`;
const out = {};
for (const stem of FILES) {
  const base = readFileSync(`${stem}.dc.html`, "utf8");
  const probe = base.replace("</body>", FIX + `<script>addEventListener("load",()=>setTimeout(()=>{
    const a=document.querySelector(".atmos > aside.raise");
    document.title="H"+Math.ceil(a.getBoundingClientRect().bottom+scrollY);},400))<\/script></body>`);
  writeFileSync("export/_d.html", probe);
  const dom = execFileSync(CH, ["--headless=new","--disable-gpu","--no-sandbox","--hide-scrollbars",
    "--window-size=1440,2400","--virtual-time-budget=8000","--dump-dom",
    `file://${process.cwd()}/export/_d.html`], { maxBuffer: 1 << 26 }).toString();
  const h = Math.min(Number(dom.match(/<title>H(\d+)<\/title>/)[1]) + 22, 1500);
  const src = base.replace("<x-dc>", `<div class="vp"><div class="sh"><x-dc>`)
                  .replace("</x-dc>", `</x-dc></div></div>`)
                  .replace("</body>", FIX + `<style>.vp{width:1440px;height:${h}px;overflow:hidden;position:relative;background:#EEF4F8}
                    .sh{position:absolute;left:0;top:0;width:1440px}</style></body>`);
  writeFileSync("export/_d.html", src);
  execFileSync(CH, ["--headless=new","--disable-gpu","--no-sandbox","--hide-scrollbars",
    "--force-device-scale-factor=2","--window-size=1440,"+h,"--virtual-time-budget=9000",
    `--screenshot=export/img/${stem}-drawer.png`, `file://${process.cwd()}/export/_d.html`], { stdio: "ignore" });
  out[stem] = h; console.log(stem, h);
}
