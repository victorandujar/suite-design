import { readFileSync, writeFileSync } from "node:fs";
const s = readFileSync("build.mjs", "utf8");
const start = s.indexOf("const NOTES = {");
const body = s.slice(start + "const NOTES = ".length);
const end = body.indexOf("\n};") + 2;
const obj = (0, eval)("(" + body.slice(0, end) + ")");
const out = Object.fromEntries(Object.entries(obj).map(([k, v]) => [k.replace(".dc.html", ""), v[1]]));
writeFileSync("export/notes_en.json", JSON.stringify(out, null, 1));
console.log(Object.keys(out).join(" "));
