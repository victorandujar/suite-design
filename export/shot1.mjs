import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
const CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const [file, h, top = 0, hh = h] = process.argv.slice(2);
const src = readFileSync(file, "utf8")
  .replace("<x-dc>", `<div class="vp"><div class="sh"><x-dc>`).replace("</x-dc>", `</x-dc></div></div>`)
  .replace("</body>", `<style>html,body{margin:0;padding:0;background:#EEF4F8}x-dc{display:block}helmet{display:none}
    .vp{width:1440px;height:${hh}px;overflow:hidden;position:relative;background:#EEF4F8}
    .sh{position:absolute;left:0;top:${-top}px;width:1440px}</style></body>`);
writeFileSync("export/_s1.html", src);
execFileSync(CH, ["--headless=new","--disable-gpu","--no-sandbox","--hide-scrollbars","--force-device-scale-factor=2",
  `--window-size=1440,${hh}`,"--virtual-time-budget=9000",`--screenshot=export/_shot.png`,
  `file://${process.cwd()}/export/_s1.html`], { stdio: "ignore" });
