import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
const CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
for (const [stem, h] of [["ProjectStoreBrid", 1170], ["ProjectReveNew", 1140]]) {
  const src = readFileSync(`${stem}.dc.html`, "utf8").replace("</body>",
    `<style>html,body{margin:0;padding:0;background:#EEF4F8}x-dc{display:block}helmet{display:none}</style></body>`);
  writeFileSync("export/_f.html", src);
  execFileSync(CH, ["--headless=new","--disable-gpu","--no-sandbox","--hide-scrollbars",
    "--force-device-scale-factor=2",`--window-size=1440,${h}`,"--virtual-time-budget=9000",
    `--screenshot=export/img/${stem}-full.png`, `file://${process.cwd()}/export/_f.html`], { stdio: "ignore" });
  console.log(stem, h);
}
