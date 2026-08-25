// Sunveon Suite — design canvas artboards (iteration 2: refinement).
// Built from one shared foundation so the system stays identical across
// screens (artboards share nothing at runtime).
import { readFileSync, writeFileSync } from "node:fs";

/* ─────────────────────────────────────────────────────────────
   FOUNDATION — Premium Light Spatial Glass, calmed down.
   Atmosphere ~35% lighter than iteration 1; one card recipe instead
   of three nested ones. Content is the protagonist, not the surface.
   ───────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');

:root{
  /* StoreBrid's tokens, inherited verbatim from the StoreBrid UI Rework canvas */
  --b400:#60A5FA; --b500:#3B82F6; --b600:#2563EB; --b700:#1D4ED8; --b800:#1E40AF;
  --cy:#06B6D4; --cy600:#0891B2;
  --ok:#10B981; --warn:#F59E0B; --bad:#DC2626; --run:#8B5CF6; --info:#3B82F6;
  --s100:#F1F5F9; --s300:#CBD5E1; --s400:#5F6C82; --s500:#54617A; --s700:#334155; --s900:#0F172A;
  --hair:rgba(30,58,138,.07);
  --edge:rgba(255,255,255,.80); --edge-soft:rgba(255,255,255,.62); --lit:rgba(255,255,255,.92);
  --sh-xs:0 1px 2px rgba(30,58,138,.05);
  --sh-sm:0 2px 10px -4px rgba(30,58,138,.12);
  --sh-md:0 14px 34px -18px rgba(30,58,138,.26),0 2px 8px -3px rgba(30,58,138,.07);
  --sh-lg:0 26px 60px -28px rgba(30,58,138,.30),0 4px 14px -6px rgba(30,58,138,.08);
  --sh-xl:0 40px 90px -40px rgba(30,58,138,.34),0 6px 18px -8px rgba(30,58,138,.09);
  --sh-b:0 10px 28px -10px rgba(37,99,235,.50),0 2px 6px -1px rgba(37,99,235,.22);
  --lume:0 40px 120px -52px rgba(37,99,235,.55);
  --r-xs:10px; --r-sm:12px; --r-md:16px; --r-lg:20px;
  --ease:cubic-bezier(.22,.61,.36,1);
  /* ReveNew's dimension */
  --rv:#AF47B2; --rv600:#9A3E9D; --rv400:#C74FC9; --rv-deep:#7B2D80;
  --lume-rv:0 40px 120px -52px rgba(175,71,178,.34);
  /* The Suite's own parent colour — the neutral bridge between them.
     Aqua-teal, never green, and never used for Combined (§24). */
  --su:#0E9DA8; --su600:#0C838D; --su700:#0A6E77;
  --lume-su:0 40px 120px -52px rgba(14,157,168,.34);
  /* Combined = both datasets participating. A restrained blend of the two. */
  --cmb:#6D5AC6;
}

*,*::before,*::after{box-sizing:border-box}
body{margin:0;font-family:Inter,system-ui,-apple-system,'Segoe UI',sans-serif;color:var(--s900);
  font-size:14px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
h1,h2,h3,h4,p{margin:0}
a{color:var(--b700);text-decoration:none}
a:hover{color:var(--b800)}

/* ── Level 0 · page atmosphere ───────────────────────────────────
   StoreBrid's four fields, unchanged, plus one very faint violet
   field on the financial side — the only place the Suite's parent
   identity differs from StoreBrid's.                                */
.atmos{
  min-height:100%;
  background:
    radial-gradient(1700px 1180px at 10% -12%, rgba(105,200,208,.17), rgba(105,200,208,0) 78%),
    radial-gradient(1900px 1300px at 95% -18%, rgba(125,180,215,.13), rgba(125,180,215,0) 76%),
    radial-gradient(1500px 1250px at 84% 112%, rgba(110,195,203,.10), rgba(110,195,203,0) 78%),
    radial-gradient(1400px 1150px at -14% 104%, rgba(130,180,210,.07), rgba(130,180,210,0) 76%),
    radial-gradient(1250px 980px at 104% 46%, rgba(160,130,205,.055), rgba(160,130,205,0) 74%),
    linear-gradient(168deg,#ECF5F7 0%,#F9FBFC 46%,#EEF4F8 100%);
}
/* Suite-owned screens sit in the parent's own light. Entering a product's
   domain lets that product's colour come forward (§25) — same shell. */
.focus{
  position:absolute; inset:0; pointer-events:none; z-index:0;
  background:
    radial-gradient(74% 64% at 24% 20%, rgba(90,195,205,.115), rgba(90,195,205,0) 78%),
    radial-gradient(60% 52% at 88% 84%, rgba(125,180,215,.06), rgba(125,180,215,0) 80%);
}
.focus.sb{
  background:
    radial-gradient(74% 64% at 24% 20%, rgba(105,160,228,.135), rgba(105,160,228,0) 78%),
    radial-gradient(60% 52% at 88% 84%, rgba(95,195,205,.055), rgba(95,195,205,0) 80%);
}
.focus.rv{
  background:
    radial-gradient(74% 64% at 24% 20%, rgba(165,120,205,.10), rgba(165,120,205,0) 78%),
    radial-gradient(60% 52% at 88% 84%, rgba(100,190,205,.055), rgba(100,190,205,0) 80%);
}

/* ── Level 1 · primary glass ─────────────────────────────────────
   White edge with the blue filo as an outer ring, top specular line,
   inset highlight above and a blue seam below. This is the recipe. */
.panel{
  position:relative;
  background:linear-gradient(168deg,rgba(255,255,255,.62) 0%,rgba(255,255,255,.48) 46%,rgba(255,255,255,.40) 100%);
  backdrop-filter:blur(16px) saturate(190%); -webkit-backdrop-filter:blur(16px) saturate(190%);
  border:1px solid rgba(255,255,255,.95); border-radius:var(--r-md);
  box-shadow:0 0 0 1px rgba(37,99,235,.09), var(--sh-md),
             inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(37,99,235,.05);
  transition:box-shadow .22s var(--ease), border-color .22s var(--ease);
}
.panel::before{
  content:""; position:absolute; left:16px; right:16px; top:0; height:1px; pointer-events:none; z-index:2;
  background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.98) 15%,rgba(255,255,255,.98) 85%,rgba(255,255,255,0));
}
/* the ONE protagonist surface per screen */
.panel.lift{
  background:linear-gradient(168deg,rgba(255,255,255,.66) 0%,rgba(255,255,255,.54) 46%,rgba(255,255,255,.46) 100%);
  box-shadow:0 0 0 1px rgba(37,99,235,.17), var(--sh-lg), 0 44px 120px -56px rgba(37,99,235,.60),
             inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(37,99,235,.09);
}
/* ── Level 2 · secondary surfaces ─────────────────────────────── */
.glass-sm{
  position:relative;
  background:linear-gradient(168deg,rgba(255,255,255,.60),rgba(255,255,255,.42));
  backdrop-filter:blur(12px) saturate(180%); -webkit-backdrop-filter:blur(12px) saturate(180%);
  border:1px solid var(--edge); border-radius:var(--r-sm);
  box-shadow:var(--sh-md), inset 0 1px 0 rgba(255,255,255,.92);
  transition:background .2s var(--ease), box-shadow .2s var(--ease), transform .2s var(--ease);
}
a.glass-sm:hover{
  background:linear-gradient(168deg,rgba(255,255,255,.84),rgba(255,255,255,.64));
  box-shadow:var(--sh-lg), inset 0 1px 0 rgba(255,255,255,1); transform:translateY(-1px);
}
/* a recess of the panel it sits in — never another card */
.wash{
  background:linear-gradient(168deg,rgba(255,255,255,.44),rgba(255,255,255,.26));
  border:1px solid rgba(255,255,255,.70); border-radius:var(--r-sm);
}
/* floating: modals, toasts */
.raise{
  background:linear-gradient(168deg,rgba(255,255,255,.86),rgba(255,255,255,.68));
  backdrop-filter:blur(18px) saturate(180%); -webkit-backdrop-filter:blur(18px) saturate(180%);
  border:1px solid rgba(255,255,255,.96); border-radius:var(--r-md);
  box-shadow:0 0 0 1px rgba(37,99,235,.15), var(--sh-xl), inset 0 1px 0 rgba(255,255,255,1);
}
.hr{height:1px;background:var(--hair)}

/* product atmosphere on a project card — extremely restrained */
.tint-both{background:linear-gradient(168deg,rgba(37,99,235,.055),rgba(175,71,178,.05)),
  linear-gradient(168deg,rgba(255,255,255,.62) 0%,rgba(255,255,255,.48) 46%,rgba(255,255,255,.40) 100%)}
.tint-sb{background:linear-gradient(168deg,rgba(37,99,235,.07),rgba(37,99,235,0) 70%),
  linear-gradient(168deg,rgba(255,255,255,.62) 0%,rgba(255,255,255,.48) 46%,rgba(255,255,255,.40) 100%)}
.tint-rv{background:linear-gradient(168deg,rgba(175,71,178,.07),rgba(175,71,178,0) 70%),
  linear-gradient(168deg,rgba(255,255,255,.62) 0%,rgba(255,255,255,.48) 46%,rgba(255,255,255,.40) 100%)}
/* Combined = blue into violet. Restrained, never a rainbow. */
.combined{background:linear-gradient(122deg,rgba(37,99,235,.10),rgba(175,71,178,.085));
  border-radius:var(--r-sm); box-shadow:inset 0 0 0 1px rgba(37,99,235,.10)}

/* Typography — Inter, seven roles */
.t-page{font-size:30px;font-weight:700;line-height:1.14;letter-spacing:-.025em;color:var(--s900)}
.t-sec {font-size:19px;font-weight:600;line-height:1.28;letter-spacing:-.015em;color:var(--s900)}
.t-card{font-size:16px;font-weight:600;line-height:1.35;color:var(--s900)}
.t-body{font-size:14px;font-weight:400;line-height:1.55;color:var(--s700)}
.t-tbl {font-size:13px;font-weight:400;line-height:1.4;color:var(--s700)}
.t-lab {font-size:12px;font-weight:500;line-height:1.3;color:var(--s500)}
.t-meta{font-size:11px;font-weight:400;line-height:1.45;color:var(--s400)}
.eyebrow{font-size:12px;font-weight:500;line-height:1.3;color:var(--s500);margin:0 0 8px}
.band{font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--s500)}

/* Shell */
.shell{display:flex;align-items:stretch;min-height:100%}
.side{
  width:236px;flex:none;position:relative;z-index:2;display:flex;flex-direction:column;padding:18px 12px 14px;
  background:linear-gradient(180deg,rgba(255,255,255,.56),rgba(255,255,255,.34));
  backdrop-filter:blur(16px) saturate(180%); -webkit-backdrop-filter:blur(16px) saturate(180%);
  border-right:1px solid rgba(255,255,255,.75);
  box-shadow:1px 0 0 rgba(14,157,168,.07);
}
.main{position:relative;flex:1;min-width:0;overflow:hidden}
.content{position:relative;z-index:1;padding:28px 36px 42px}

.brand{display:flex;align-items:center;gap:9px;padding:2px 8px 0}
.brand-name{font-size:14px;font-weight:700;letter-spacing:-.015em;color:var(--s900);line-height:1.1}
.brand-sub{font-size:10px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--su700);line-height:1.1;margin-top:3px}

.nav{display:flex;flex-direction:column;gap:2px}
.nav a{display:flex;align-items:center;gap:10px;height:35px;padding:0 10px;border-radius:var(--r-xs);
  font-size:13px;font-weight:500;color:var(--s500);transition:background .18s var(--ease),color .18s var(--ease)}
.nav a svg{flex:none;opacity:.8}
.nav a:hover{background:linear-gradient(168deg,rgba(255,255,255,.7),rgba(255,255,255,.5));color:var(--s900)}
.nav a.on{
  background:linear-gradient(168deg,rgba(255,255,255,.92),rgba(255,255,255,.7));
  color:var(--su700);font-weight:600;
  box-shadow:0 0 0 1px rgba(14,157,168,.16), 0 2px 10px -4px rgba(12,131,141,.22),
             inset 0 1px 0 rgba(255,255,255,.96), inset 2px 0 0 var(--su);
}
.nav a.on svg{opacity:1}
.grp{display:flex;align-items:center;justify-content:flex-start;gap:7px;padding:0 10px;margin:18px 0 7px;
  font-size:10px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--s400)}
.rule{height:1px;background:var(--hair);margin:12px 6px}

/* Buttons — blue stays the Suite's only primary. Never purple. */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:38px;padding:0 15px;
  border-radius:var(--r-xs);border:1px solid transparent;font-size:13px;font-weight:500;cursor:pointer;
  white-space:nowrap;transition:box-shadow .2s var(--ease),background .2s var(--ease),transform .2s var(--ease)}
.btn-primary{background:linear-gradient(140deg,#3B82F6,#2563EB);color:#fff;
  box-shadow:var(--sh-b), inset 0 1px 0 rgba(255,255,255,.26)}
.btn-primary:hover{box-shadow:0 16px 38px -12px rgba(37,99,235,.60),0 3px 8px -2px rgba(37,99,235,.28),
  inset 0 1px 0 rgba(255,255,255,.28);transform:translateY(-1px)}
.btn-secondary{color:var(--s900);border-color:rgba(255,255,255,.9);
  background:linear-gradient(168deg,rgba(255,255,255,.66),rgba(255,255,255,.46));
  box-shadow:0 0 0 1px rgba(37,99,235,.08), var(--sh-xs), inset 0 1px 0 rgba(255,255,255,.92)}
.btn-secondary:hover{background:linear-gradient(168deg,rgba(255,255,255,.84),rgba(255,255,255,.64));
  box-shadow:0 0 0 1px rgba(37,99,235,.10), var(--sh-md), inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-1px)}
.btn-ghost{color:var(--s500);background:transparent}
.btn-ghost:hover{background:linear-gradient(168deg,rgba(255,255,255,.62),rgba(255,255,255,.42));color:var(--s900)}
.btn-icon{width:38px;padding:0}

/* Level 5 · attribution — visible, quiet */
.src{display:inline-flex;align-items:center;gap:5px;font-size:10.5px;font-weight:500;color:var(--s400);white-space:nowrap}
.src i{width:4px;height:4px;border-radius:50%;display:block;flex:none}
.src .pair{display:inline-flex;width:10px;height:4px;position:relative;flex:none}
.src .pair i{position:absolute;top:0}
.src .pair i:first-child{left:0}
.src .pair i:last-child{left:4px;box-shadow:0 0 0 1.5px rgba(255,255,255,.85)}

.cov{display:inline-flex;align-items:center;gap:5px;height:22px;padding:0 8px;border-radius:7px;
  font-size:10.5px;font-weight:500;color:var(--s500);
  background:linear-gradient(168deg,rgba(255,255,255,.6),rgba(255,255,255,.4));
  border:1px solid rgba(255,255,255,.8)}
.cov i{width:4px;height:4px;border-radius:50%;display:block;flex:none}
.cov.off{opacity:.3}

.badge{display:inline-flex;align-items:center;gap:6px;height:22px;padding:0 9px;border-radius:7px;
  font-size:11px;font-weight:500;white-space:nowrap}
.badge i{width:5px;height:5px;border-radius:50%;display:block;flex:none}

/* KPI row — divided, not boxed */
.kpirow{display:flex;align-items:stretch;margin:0 -22px}
.kpirow > *{flex:1;min-width:0;padding:4px 22px}
.kpirow > * + *{border-left:1px solid var(--hair)}
.kpi-lab{font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--s500)}
.kpi-val{font-size:29px;font-weight:700;letter-spacing:-.028em;color:var(--s900);line-height:1.12;margin-top:9px;font-variant-numeric:tabular-nums}
.kpi-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:11px}
.delta{font-size:10.5px;font-weight:500}
.delta.up{color:#0E9469}.delta.down{color:var(--bad)}

/* Level 3 · flat content */
.rows > * + *{border-top:1px solid var(--hair)}

.tbl{width:100%;border-collapse:collapse}
.tbl thead th{height:40px;padding:0 18px;text-align:left;font-size:12px;font-weight:500;color:var(--s500);white-space:nowrap}
.tbl thead tr{background:linear-gradient(168deg,rgba(255,255,255,.44),rgba(255,255,255,.26))}
.tbl tbody td{height:50px;padding:0 18px;border-top:1px solid var(--hair);font-size:13px;color:var(--s700);vertical-align:middle}
.tbl tbody tr{transition:background .18s var(--ease),box-shadow .18s var(--ease)}
.tbl tbody tr:hover{background:linear-gradient(168deg,rgba(255,255,255,.70),rgba(255,255,255,.52));
  box-shadow:inset 3px 0 0 rgba(37,99,235,.55)}
.tbl .anchor{font-size:14px;font-weight:500;color:var(--s900)}
.tbl tbody tr:hover .anchor{color:var(--b700)}
.num{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}

.search{display:flex;align-items:center;gap:9px;height:38px;padding:0 15px;border-radius:19px;
  background:linear-gradient(168deg,rgba(255,255,255,.5),rgba(255,255,255,.32));
  border:1px solid rgba(255,255,255,.78);color:var(--s400);font-size:13px}

.tabs{display:inline-flex;align-items:center;gap:3px;padding:3px;border-radius:var(--r-sm);
  background:linear-gradient(168deg,rgba(255,255,255,.44),rgba(255,255,255,.26));
  border:1px solid rgba(255,255,255,.7)}
.tabs a{display:inline-flex;align-items:center;gap:7px;height:32px;padding:0 13px;border-radius:var(--r-xs);
  font-size:13px;font-weight:500;color:var(--s500)}
.tabs a.on{color:var(--s900);font-weight:600;
  background:linear-gradient(168deg,rgba(255,255,255,.92),rgba(255,255,255,.72));
  box-shadow:0 0 0 1px rgba(37,99,235,.08), var(--sh-sm), inset 0 1px 0 rgba(255,255,255,1)}
.tabs .count{font-size:10.5px;font-weight:500;color:var(--s400)}
.tabs a.on .count{color:var(--su700)}

.crumb{display:flex;align-items:center;gap:7px;font-size:12px;font-weight:500;color:var(--s400);margin-bottom:14px}
.crumb .sep{opacity:.5}
.crumb b{font-weight:500;color:var(--s700)}
.grid{display:grid;gap:20px}
`;

/* ─────────────────────────────────────────────────────────────
   ICONS — stroke-based, 16/18/20 grid, one style, currentColor
   ───────────────────────────────────────────────────────────── */
const P = {
  home:     '<path d="M3 9.2 10 3.5l7 5.7"/><path d="M4.6 8.3V16a.9.9 0 0 0 .9.9h9a.9.9 0 0 0 .9-.9V8.3"/>',
  projects: '<rect x="2.8" y="4.4" width="6.1" height="5.2" rx="1.2"/><rect x="11.1" y="4.4" width="6.1" height="5.2" rx="1.2"/><rect x="2.8" y="11.4" width="6.1" height="4.2" rx="1.2"/><rect x="11.1" y="11.4" width="6.1" height="4.2" rx="1.2"/>',
  analytics:'<path d="M3 16.6h14"/><path d="M5.4 13.4V9.1"/><path d="M9.2 13.4V4.9"/><path d="M13 13.4v-5.6"/><path d="M16.6 13.4v-2.6"/>',
  admin:    '<circle cx="10" cy="10" r="2.5"/><path d="M10 2.9v2M10 15.1v2M15 5l-1.4 1.4M6.4 13.6 5 15m10 0-1.4-1.4M6.4 6.4 5 5m12.1 5h-2M4.9 10h-2"/>',
  zap:      '<path d="M11.1 2.7 4.4 11.2h4.3l-.8 6.1 6.7-8.5h-4.3z"/>',
  trend:    '<path d="M2.9 13.9 7.6 9.1l3 3 6.5-6.6"/><path d="M12.9 5.5h4.2v4.2"/>',
  plus:     '<path d="M10 4.6v10.8M4.6 10h10.8"/>',
  search:   '<circle cx="9.1" cy="9.1" r="5.3"/><path d="m13.1 13.1 3.2 3.2"/>',
  upRight:  '<path d="M6.2 13.8 13.8 6.2"/><path d="M7.4 6.2h6.4v6.4"/>',
  right:    '<path d="m7.8 4.6 5.2 5.4-5.2 5.4"/>',
  left:     '<path d="m12.2 4.6-5.2 5.4 5.2 5.4"/>',
  down:     '<path d="m5.2 8 4.8 4.6L14.8 8"/>',
  up:       '<path d="m5.2 12 4.8-4.6L14.8 12"/>',
  eye:      '<path d="M2.2 10s2.9-4.9 7.8-4.9S17.8 10 17.8 10s-2.9 4.9-7.8 4.9S2.2 10 2.2 10Z"/><circle cx="10" cy="10" r="2.2"/>',
  dots:     '<circle cx="10" cy="4.6" r="1.15" fill="currentColor" stroke="none"/><circle cx="10" cy="10" r="1.15" fill="currentColor" stroke="none"/><circle cx="10" cy="15.4" r="1.15" fill="currentColor" stroke="none"/>',
  alert:    '<path d="M10 3.6 2.9 16.1h14.2z"/><path d="M10 8.2v3.3"/><circle cx="10" cy="13.7" r=".85" fill="currentColor" stroke="none"/>',
  clock:    '<circle cx="10" cy="10" r="7"/><path d="M10 5.9V10l2.8 1.7"/>',
  filter:   '<path d="M3.4 5h13.2l-5.2 6v4.6l-2.8 1.4V11z"/>',
  back:     '<path d="M16.4 10H4.2"/><path d="m8.8 5.4-4.6 4.6 4.6 4.6"/>',
  layers:   '<path d="m10 3 6.8 3.6L10 10.2 3.2 6.6z"/><path d="m3.2 10.6 6.8 3.6 6.8-3.6"/>',
  file:     '<path d="M11.3 2.9H6.1a1.3 1.3 0 0 0-1.3 1.3v11.6a1.3 1.3 0 0 0 1.3 1.3h7.8a1.3 1.3 0 0 0 1.3-1.3V6.7z"/><path d="M11.3 2.9v3.8h3.9"/>',
  activity: '<path d="M2.9 10h3.2l2.1-5.3 3.4 10.6 2.1-5.3h3.4"/>',
  cog:      '<circle cx="10" cy="10" r="2.4"/><path d="M15.9 12.1a1.3 1.3 0 0 0 .3 1.5l.1.1a1.6 1.6 0 1 1-2.2 2.2l-.1-.1a1.3 1.3 0 0 0-1.5-.3 1.3 1.3 0 0 0-.8 1.2v.2a1.6 1.6 0 0 1-3.2 0v-.1a1.3 1.3 0 0 0-.9-1.2 1.3 1.3 0 0 0-1.5.3l-.1.1A1.6 1.6 0 1 1 3.8 13.7l.1-.1a1.3 1.3 0 0 0 .3-1.5 1.3 1.3 0 0 0-1.2-.8h-.2a1.6 1.6 0 1 1 0-3.2h.1a1.3 1.3 0 0 0 1.2-.9 1.3 1.3 0 0 0-.3-1.5l-.1-.1a1.6 1.6 0 1 1 2.2-2.2l.1.1a1.3 1.3 0 0 0 1.5.3h.1a1.3 1.3 0 0 0 .8-1.2v-.2a1.6 1.6 0 0 1 3.2 0v.1a1.3 1.3 0 0 0 .8 1.2 1.3 1.3 0 0 0 1.5-.3l.1-.1a1.6 1.6 0 1 1 2.2 2.2l-.1.1a1.3 1.3 0 0 0-.3 1.5v.1a1.3 1.3 0 0 0 1.2.8h.2a1.6 1.6 0 0 1 0 3.2h-.1a1.3 1.3 0 0 0-1.2.8z"/>',
  sliders:  '<path d="M4.4 16.2V11M4.4 7.8V3.8M10 16.2v-6.4M10 6.6V3.8M15.6 16.2v-3.8M15.6 9.2V3.8"/><path d="M2.4 11h4M8 6.6h4M13.6 12.4h4"/>',
  gauge:    '<path d="M4.1 14.4a7 7 0 1 1 11.8 0"/><path d="m10 10.6 3-3.1"/>',
  euro:     '<path d="M14.2 5.4a5.4 5.4 0 1 0 0 9.2"/><path d="M3.9 8.9h6.6M3.9 11.4h6.6"/>',
  battery:  '<rect x="2.6" y="6.6" width="12.2" height="6.8" rx="1.7"/><path d="M17.4 9.1v1.8"/><path d="M5.6 9.1v1.8M8.4 9.1v1.8"/>',
  check:    '<path d="m4.8 10.4 3.5 3.4 6.9-7.6"/>',
  link:     '<path d="M8.6 11.4a3 3 0 0 0 4.5.3l1.9-1.9a3 3 0 0 0-4.3-4.3l-1.1 1.1"/><path d="M11.4 8.6a3 3 0 0 0-4.5-.3L5 10.2a3 3 0 0 0 4.3 4.3l1.1-1.1"/>',
  sun:      '<circle cx="10" cy="10" r="3.6"/><path d="M10 2.6v1.7M10 15.7v1.7M15.2 4.8l-1.2 1.2M6 14l-1.2 1.2m10.4 0L14 14M6 6 4.8 4.8M17.4 10h-1.7M4.3 10H2.6"/>',
  arrowDown:'<path d="M10 4.2v11.6"/><path d="m5.4 11.2 4.6 4.6 4.6-4.6"/>',
};
const ic = (n, s = 18, sw = 1.6) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;

/* Suite parent-brand mark — placeholder isotype (no Suite logo exists yet) */
const suiteMark = (s = 26) => `
<svg width="${s}" height="${s}" viewBox="0 0 28 28" fill="none" aria-hidden="true">
  <defs><linearGradient id="sm" x1="4" y1="24" x2="24" y2="4" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#2ED3C6"/><stop offset=".5" stop-color="#0E9DA8"/><stop offset="1" stop-color="#1F6FD0"/>
  </linearGradient></defs>
  <rect x="1" y="1" width="26" height="26" rx="8" fill="url(#sm)"/>
  <path d="M14 6.6 21.6 11 14 15.4 6.4 11z" fill="#fff" fill-opacity=".95"/>
  <path d="m7.6 14.6 6.4 3.7 6.4-3.7" stroke="#fff" stroke-opacity=".7" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="m7.6 18.4 6.4 3.7 6.4-3.7" stroke="#fff" stroke-opacity=".45" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;


/* ── attribution ──────────────────────────────────────────────
   StoreBrid blue · ReveNew magenta · Suite cyan · Combined = both.
   Level 5 of the hierarchy: always present, never loud.          */
const SB = "#2563EB", RN = "#AF47B2", SU = "#0E9DA8", CMB = "#6D5AC6";
const src = (which) => {
  if (which === "storebrid") return `<span class="src"><i style="background:${SB}"></i>StoreBrid</span>`;
  if (which === "revenew")   return `<span class="src"><i style="background:${RN}"></i>ReveNew</span>`;
  if (which === "suite")     return `<span class="src"><i style="background:${SU}"></i>Suite</span>`;
  return `<span class="src"><span class="pair"><i style="background:${SB}"></i><i style="background:${RN}"></i></span>Combined</span>`;
};
const cov = (sb, rn) =>
  `<span style="display:inline-flex;gap:6px">
     <span class="cov${sb ? "" : " off"}"><i style="background:${SB}"></i>StoreBrid</span>
     <span class="cov${rn ? "" : " off"}"><i style="background:${RN}"></i>ReveNew</span>
   </span>`;
/* §3 · IRR and payback are not owned by either product. They come out of
   the project financial model, which needs BOTH sides: ReveNew revenue
   cash flows and StoreBrid CAPEX. Anywhere IRR appears it is Combined,
   and where the financial model is missing the case shows no IRR. */
const FINMODEL = "IRR comes from the project financial model — ReveNew revenue cash flows against StoreBrid CAPEX. Cases with no financial model show no IRR at all.";
const badge = (text, color, tint) =>
  `<span class="badge" style="background:${tint};color:${color}"><i style="background:${color}"></i>${text}</span>`;
const ST = {
  active:      badge("Active", "#0E9469", "rgba(16,185,129,.11)"),
  development: badge("Development", "#9A6208", "rgba(245,158,11,.12)"),
  draft:       badge("Draft", "#5B4BB5", "rgba(139,92,246,.12)"),
};
const SIMSTATE = {
  completed: badge("Completed", "#0E9469", "rgba(16,185,129,.11)"),
  progress:  badge("In progress", "#9A6208", "rgba(245,158,11,.12)"),
  running:   badge("Running…", "#1D4ED8", "rgba(37,99,235,.10)"),
  waiting:   badge("Waiting", "#5B4BB5", "rgba(139,92,246,.12)"),
  error:     badge("Completed (error)", "#C22222", "rgba(220,38,38,.10)"),
};

/* ── page wrapper ─────────────────────────────────────────────── */
const doc = ({ w, h, side, body, overlay, extraCss, rvFocus, focusSb }) => `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <style>${CSS}${extraCss || ""}</style>
</helmet>
<div class="atmos" style="width:${w}px;min-height:${h}px;position:relative">
  <div class="shell" style="min-height:${h}px">
    <aside class="side">${side}</aside>
    <main class="main">
      <div class="focus${rvFocus ? " rv" : focusSb ? " sb" : ""}"></div>
      <div class="content">${body}</div>
    </main>
  </div>
  ${overlay || ""}
</div>
</x-dc>
<script data-dc-script data-props='{"$preview":{"width":${w},"height":${h}}}'>
class Component extends DCLogic {}
</script>
</body>
</html>
`;
const sheet = ({ w, h, body }) => `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <style>${CSS}</style>
</helmet>
<div class="atmos" style="width:${w}px;min-height:${h}px;position:relative">
  <div class="focus"></div>
  <div style="position:relative;z-index:1;padding:30px 34px 38px">${body}</div>
</div>
</x-dc>
<script data-dc-script data-props='{"$preview":{"width":${w},"height":${h}}}'>
class Component extends DCLogic {}
</script>
</body>
</html>
`;

const brand = () => `
<div class="brand">
  ${suiteMark(26)}
  <div><div class="brand-name">Sunveon</div><div class="brand-sub">Suite</div></div>
</div>`;

const userChip = () => `
<div style="display:flex;align-items:center;gap:9px;padding:9px 10px;margin-top:8px;border-radius:10px;
            background:rgba(255,255,255,.5);border:1px solid var(--hair)">
  <span style="width:26px;height:26px;flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;
               background:linear-gradient(140deg,#0E9DA8,#2563EB);color:#fff;font-size:10px;font-weight:700">VA</span>
  <span style="min-width:0">
    <span style="display:block;font-size:12px;font-weight:600;color:var(--s900);line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Victor Andújar</span>
    <span style="display:block;font-size:10px;color:var(--s400);line-height:1.3;margin-top:1px">Sunveon Energy</span>
  </span>
  <span style="margin-left:auto;color:var(--s400);display:flex">${ic("down", 14, 1.7)}</span>
</div>`;

/* A licensed product links out. An unlicensed one is not hidden and not
   padlocked — it carries one quiet word, and nothing else changes. */
const appLink = (name, dot, licensed) => licensed
  ? `<a href="#"><span style="width:17px;display:flex;justify-content:center"><i style="width:6px;height:6px;border-radius:50%;background:${dot};display:block"></i></span>${name}<span style="margin-left:auto;color:var(--s400);display:flex">${ic("upRight", 13, 1.8)}</span></a>`
  : `<a href="#" style="opacity:.72"><span style="width:17px;display:flex;justify-content:center"><i style="width:6px;height:6px;border-radius:50%;background:${dot};opacity:.45;display:block"></i></span>${name}<span style="margin-left:auto;font-size:10.5px;font-weight:500;color:var(--s400)">Available</span></a>`;

/* §9 · Staleness is a persistent condition, not a notification: it does not
   clear because someone looked at it, and it reappears the moment a
   simulation is re-run. So the indicator is a standing count, never a
   read/unread badge — it sits with Administration and the account, out of
   the working navigation, and reuses the amber the rest of the product
   already spends on outdated results. */
const attnLink = (n = STALE_PORTFOLIO, on = false) => n ? `
<a href="#" class="${on ? "on" : ""}" style="display:flex;align-items:center;gap:10px;height:35px;padding:0 10px;
   border-radius:var(--r-xs);font-size:13px;font-weight:500;color:var(--s500);text-decoration:none;
   ${on ? "background:linear-gradient(168deg,rgba(255,255,255,.92),rgba(255,255,255,.7));color:var(--s900)" : ""}">
  <span style="flex:none;display:flex;color:${WARN.ink}">${ic("alert", 17)}</span>
  <span style="flex:1;min-width:0">Needs attention</span>
  <span style="flex:none;min-width:19px;height:19px;padding:0 6px;border-radius:9px;display:flex;align-items:center;justify-content:center;
        font-size:11px;font-weight:700;font-variant-numeric:tabular-nums;color:${WARN.ink};
        background:rgba(${WARN.tint},.16);box-shadow:inset 0 0 0 1px rgba(${WARN.tint},.28)">${n}</span>
</a>` : "";

const rootSide = (active, ent = "both") => `
${brand()}
<div class="rule" style="margin-top:16px"></div>
<nav class="nav">
  <a href="#" class="${active === "home" ? "on" : ""}">${ic("home", 17)}Home</a>
  <a href="#" class="${active === "projects" ? "on" : ""}">${ic("projects", 17)}Projects</a>
  <a href="#" class="${active === "analytics" ? "on" : ""}">${ic("analytics", 17)}Analytics</a>
</nav>
<div class="grp">Applications</div>
<nav class="nav">
  ${appLink("StoreBrid", SB, ent !== "rv")}
  ${appLink("ReveNew", RN, ent !== "sb")}
</nav>
<div style="flex:1"></div>
<div class="rule"></div>
<nav class="nav">
  ${attnLink(STALE_PORTFOLIO, active === "attn")}
  <a href="#" class="${active === "admin" ? "on" : ""}">${ic("sliders", 17)}Administration</a>
</nav>
${userChip()}`;

const projectSide = (active = "overview", caps = "both", name = "Valencia BESS", meta = "Spain · BESS · 100 MW / 200 MWh") => `
${brand()}
<div class="rule" style="margin-top:16px"></div>
<a href="#" style="display:flex;align-items:center;gap:8px;padding:0 10px;height:28px;
   font-size:12px;font-weight:500;color:var(--s400)">${ic("back", 14, 1.8)}All projects</a>
<div class="wash" style="padding:11px 12px;margin:8px 2px 4px">
  <div style="font-size:14px;font-weight:600;letter-spacing:-.01em;color:var(--s900);line-height:1.25">${name}</div>
  <div class="t-meta" style="margin-top:3px">${meta}</div>
</div>
<div style="height:10px"></div>
<div class="grp">Analysis<i style="width:5px;height:5px;border-radius:50%;background:${SU};display:block" title="Suite"></i></div>
<nav class="nav">
  <a href="#" class="${["overview", "simulations", "results", "financial"].includes(active) ? "on" : ""}">${ic("gauge", 17)}Overview</a>
  ${caps !== "both" ? "" : `<a href="#" class="${active === "cases" ? "on" : ""}">${ic("layers", 17)}Case matrix<span style="margin-left:auto;font-size:10.5px;color:var(--s400)">9</span></a>`}
  ${caps !== "both" ? "" : `<a href="#" class="${active === "compare" ? "on" : ""}">${ic("analytics", 17)}Compare<span style="margin-left:auto;font-size:10.5px;color:var(--s400)">${ACASES.length}</span></a>`}
</nav>
<div class="grp">Open in</div>
<nav class="nav">
  ${caps === "rv" ? "" : `<a href="#"><span style="width:17px;display:flex;justify-content:center"><i style="width:6px;height:6px;border-radius:50%;background:${SB};display:block"></i></span>StoreBrid<span style="margin-left:auto;color:var(--s400);display:flex">${ic("upRight", 13, 1.8)}</span></a>`}
  ${caps === "sb" ? "" : `<a href="#"><span style="width:17px;display:flex;justify-content:center"><i style="width:6px;height:6px;border-radius:50%;background:${RN};display:block"></i></span>ReveNew<span style="margin-left:auto;color:var(--s400);display:flex">${ic("upRight", 13, 1.8)}</span></a>`}
</nav>
<div class="grp">Project</div>
<nav class="nav">
  <a href="#" class="${active === "files" ? "on" : ""}">${ic("file", 17)}Files</a>
  <a href="#" class="${active === "activity" ? "on" : ""}">${ic("clock", 17)}Activity</a>
  <a href="#" class="${active === "settings" ? "on" : ""}">${ic("cog", 17)}Settings</a>
</nav>
<div style="flex:1;min-height:14px"></div>
<div class="rule"></div>
<nav class="nav">${attnLink()}</nav>
${userChip()}`;

const closeX = (s = 17) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M5.4 5.4l9.2 9.2M14.6 5.4l-9.2 9.2"/></svg>`;


const scrim = () => `
<div style="position:absolute;inset:0;z-index:10;backdrop-filter:blur(9px) saturate(.92);-webkit-backdrop-filter:blur(9px) saturate(.92);
     background:linear-gradient(168deg,rgba(236,245,247,.5),rgba(238,244,248,.46))"></div>`;

/* ── The one dialog shell ────────────────────────────────────────
   Everything that opens over a screen uses this: pickers, read-only
   detail, forms, the attention panel. It used to be split in two —
   this centred shell for the things that create something, and a
   tall right-hand drawer for everything else — and the drawer was
   the worse half of the split. A 520px column beside a 1440px page
   forces long content into a scroll nobody can see the end of, and
   it pushes the thing you are meant to be reading against the edge
   of the screen while the page it belongs to fills the middle.

   One geometry now, centred, sized to its content. Wide content
   (detail groups, charts) gets to be wide instead of stacking.

   `openIn`, `footNote`, `cancel`, `confirm` and `foot` are all
   optional, so a read-only panel is the same shell with an empty
   footer rather than a different component.                        */
const capabilityModal = ({ title, context, accent, source, openIn, width, body,
                           footNote, cancel, confirm, foot }) => `
${scrim()}
${/* Centrado horizontal, anclado arriba. En la app real esto iría fijo al
     viewport; aquí el artboard ES la página, y una página de 2.400px con el
     diálogo al 50% lo deja a 1.200px de altura — invisible al abrir la
     pantalla, que es exactamente lo que no puede pasarle a un diálogo. */""}
<div class="raise" style="position:absolute;left:50%;top:96px;transform:translateX(-50%);width:${width}px;z-index:11;overflow:hidden">
  ${accent ? `<span style="position:absolute;left:0;right:0;top:0;height:2px;display:block;z-index:3;
        background:linear-gradient(90deg,${accent}00,${accent}cc 18%,${accent}cc 82%,${accent}00)"></span>` : ""}
  <div style="display:flex;align-items:center;gap:16px;padding:17px 22px;border-bottom:1px solid var(--hair)">
    <div style="flex:1;min-width:0">
      <div class="t-card" style="font-size:16px">${title}</div>
      ${context ? `<div style="display:flex;align-items:center;gap:10px;margin-top:5px">
        <span class="t-meta">${context}</span>${source || ""}
      </div>` : ""}
    </div>
    ${openIn ? `<button class="btn btn-secondary" style="height:34px">${openIn}${ic("upRight", 14, 1.8)}</button>` : ""}
    <button class="btn btn-ghost btn-icon" style="height:34px;width:34px" aria-label="Close">${closeX()}</button>
  </div>
  ${body}
  ${footNote || cancel || confirm || foot ? `
  <div style="display:flex;align-items:center;gap:14px;padding:16px 22px;border-top:1px solid var(--hair)">
    <span class="t-meta" style="flex:1;min-width:0;line-height:1.5">${footNote || ""}</span>
    ${foot || ""}
    ${cancel ? `<button class="btn btn-secondary">${cancel}</button>` : ""}
    ${confirm ? `<button class="btn btn-primary">${ic("check", 16, 1.9)}${confirm}</button>` : ""}
  </div>` : ""}
</div>`;

const forecastModal = () => capabilityModal({
  title: "Edit forecast curve", context: "Valencia BESS · High spread",
  accent: RN, source: src("revenew"), openIn: "Open in ReveNew", width: 1020,
  footNote: "Saved to ReveNew as a new scenario. High spread keeps its current curve, so the three cases already built on it stay valid.",
  cancel: "Cancel", confirm: "Create scenario variant",
  body: `
  <div style="display:flex;align-items:stretch">
    <div style="width:296px;flex:none;padding:22px;border-right:1px solid var(--hair);display:flex;flex-direction:column;gap:16px">
      ${field("Based on", "High spread", { chev: true })}
      ${field("Market", "OMIE — Spain", { chev: true })}
      ${field("Resolution", "Hourly", { chev: true })}
      ${field("Annual escalation", "2.0", { unit: "%/yr", help: "Applied from 2028 onwards" })}
      ${field("Save as", "High spread — +4% capture", { req: true })}
      <div class="hr"></div>
      <p class="t-meta" style="line-height:1.6">
        8,760 points, shaped from the ES hourly profile. Drag a monthly handle to reshape the curve.
        Contract structures, tax and financing stay in ReveNew.
      </p>
      <div style="flex:1"></div>
      <button class="btn btn-secondary" style="width:100%">Reset to High spread</button>
    </div>
    <div style="flex:1;min-width:0;padding:20px 22px 14px">
      <div style="display:flex;align-items:baseline;justify-content:space-between;gap:12px">
        <div>
          <div class="t-card" style="font-size:14.5px">Monthly capture price</div>
          <div class="t-meta" style="margin-top:4px">Based on High spread · unsaved variant</div>
        </div>
        ${legend([["Capture price", RN]])}
      </div>
      <div style="margin-top:12px">${priceCurve()}</div>
    </div>
  </div>`,
});


/* Page header — no card. Breadcrumb, context, title, actions, hairline. */
const head = ({ crumb, eyebrow, title, meta, actions }) => `
${crumb ? `<div class="crumb">${crumb}</div>` : ""}
<div style="display:flex;align-items:flex-start;gap:24px;padding-bottom:20px;border-bottom:1px solid var(--hair2);margin-bottom:24px">
  <div style="flex:1;min-width:0">
    ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
    <h1 class="t-page">${title}</h1>
    ${meta ? `<div class="t-body" style="margin-top:9px;color:var(--s500)">${meta}</div>` : ""}
  </div>
  <div style="display:flex;align-items:center;gap:10px;flex:none;padding-top:${eyebrow ? "12" : "2"}px">${actions}</div>
</div>`;

/* Section header — label, optional source, optional sub-line */
const sec = ({ label, source, sub, right, band, top = 28 }) => `
<div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin:${top}px 0 14px">
  <div style="min-width:0">
    ${band ? `<div class="band" style="margin-bottom:7px">${band}</div>` : ""}
    <div style="display:flex;align-items:center;gap:10px">
      <h2 class="t-sec">${label}</h2>${source || ""}
    </div>
    ${sub ? `<p class="t-meta" style="margin-top:6px;font-size:12px;line-height:1.5">${sub}</p>` : ""}
  </div>
  ${right ? `<div style="flex:none">${right}</div>` : ""}
</div>`;

/* `quiet` is for inventory counts — how many things exist. They belong on the
   page but must not compete with what needs a decision (§4), so they keep the
   same anatomy at a smaller weight rather than becoming a different component. */
const kpi = ({ label, value, source, delta, formula, combined, warn, quiet }) => `
<div style="${combined ? "background:linear-gradient(158deg,rgba(6,182,212,.10),rgba(6,182,212,.03));border-radius:12px" : ""}">
  <div class="kpi-lab"${quiet ? ' style="font-size:10.5px"' : ""}>${label}</div>
  <div class="kpi-val"${quiet ? ' style="font-size:21px;margin-top:7px"' : ""}>${value}</div>
  ${formula ? `<div class="t-meta" style="margin-top:7px;font-size:10.5px;line-height:1.45">${formula}</div>` : ""}
  <div class="kpi-foot">${source}${delta ? `<span class="delta ${delta[0] === "−" ? "down" : "up"}">${delta}</span>` : ""}</div>
  ${warn ? `<a href="#" style="display:inline-flex;align-items:center;gap:7px;margin-top:9px;text-decoration:none">
    ${staleTag(warn)}<span style="font-size:11px;font-weight:500;color:var(--b700)">View${ic("right", 11, 2)}</span></a>` : ""}
</div>`;

/* ═══════════════════════════════════════════════════════════════
   CHARTS
   Palettes validated with the dataviz validator (six checks PASS):
     dispatch #5B8DEF / #1D4ED8   — StoreBrid's own blue family
     revenue  #7B2D80 / #C74FC9   — ReveNew's own magenta family
     combined #0891B2             — single hue, Suite cyan
   SOC and throughput ride ALIGNED strips sharing the x axis, never a
   second y scale on the same plot.
   ═══════════════════════════════════════════════════════════════ */
const niceTicks = (lo, hi, n) => {
  const raw = (hi - lo) / n, mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((f) => f * mag).find((v) => v >= raw) || 10 * mag;
  const out = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) out.push(+v.toFixed(6));
  return out.length ? out : [lo, hi];
};

const GRID = "rgba(30,58,138,.07)", AXIS = "#5F6C82", INK = "#0F172A";
/* §27, §40 · Point labels sit wherever their point is, which means they
   land on gridlines and reference rays. One knockout, used by every
   scatter, so the label always wins without hiding what is under it. */
const KO = 'paint-order="stroke" stroke="#fff" stroke-width="3.4" stroke-linejoin="round"';
/* Bubble and scatter fields read as one neutral mass; the Combined accent is
   spent only on the points a panel is actually talking about (§1). Colour
   stops being decoration and becomes the pointer.                        */
const FIELD = "#8496AD";
const MKSTYLE = '<style>.mk{transition:opacity .12s} .mk:hover{opacity:.82}</style>';

function bar(x, y, w, h, r, up) {
  const rr = Math.min(r, h, w / 2);
  if (h <= 0.4) return "";
  return up
    ? `M${x} ${y + h}L${x} ${y + rr}Q${x} ${y} ${x + rr} ${y}L${x + w - rr} ${y}Q${x + w} ${y} ${x + w} ${y + rr}L${x + w} ${y + h}Z`
    : `M${x} ${y}L${x} ${y + h - rr}Q${x} ${y + h} ${x + rr} ${y + h}L${x + w - rr} ${y + h}Q${x + w} ${y + h} ${x + w} ${y + h - rr}L${x + w} ${y}Z`;
}
const legend = (items) => `
<div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
  ${items.map(([label, color, dash]) => `
    <span style="display:inline-flex;align-items:center;gap:7px">
      ${dash
        ? `<svg width="14" height="9" aria-hidden="true"><line x1="0" y1="4.5" x2="14" y2="4.5" stroke="${color}" stroke-width="1.8" stroke-dasharray="3 2.5"/></svg>`
        : `<i style="width:9px;height:9px;border-radius:3px;background:${color};display:block;flex:none"></i>`}
      <span style="font-size:11.5px;font-weight:500;color:var(--s500)">${label}</span>
    </span>`).join("")}
</div>`;

/* ── Dispatch + State of Charge ───────────────────────────────────
   SOC is DERIVED from the dispatch series (√0.88 each way on a 200 MWh
   pack starting at 20%), so the strip cannot disagree with the bars.   */
const DAY = [-30,-35,-35,-30,-20,-5,0,25,60,45,15,-25,-55,-60,-35,0,0,20,60,70,30,0,0,-20];

function dispatchChart(w = 700) {
  const CHARGE = "#5B8DEF", DISCHARGE = "#1D4ED8";
  const H = 272, L = 46, R = 12, MW_T = 14, MW_H = 150, S_T = 186, S_H = 54;
  const pw = w - L - R, mid = MW_T + MW_H / 2, dom = 110;
  const yM = (v) => mid - (v / dom) * (MW_H / 2);
  const CAP = 200, EFF = Math.sqrt(0.88);
  let e = 40; const soc = DAY.map((v) => (e += v < 0 ? -v * EFF : -v / EFF));
  const yS = (mwh) => S_T + S_H - (mwh / CAP) * S_H;
  const band = pw / 24, bw = 17;

  const grids = [100, 50, -50, -100].map((g) =>
    `<line x1="${L}" y1="${yM(g).toFixed(1)}" x2="${w - R}" y2="${yM(g).toFixed(1)}" stroke="${GRID}" stroke-width="1"/>`).join("");
  const ylabs = [[100, "100"], [0, "0"], [-100, "−100"]].map(([g, t]) =>
    `<text x="${L - 9}" y="${(yM(g) + 3.4).toFixed(1)}" text-anchor="end" font-size="9.5" fill="${AXIS}">${t}</text>`).join("");
  const bars = DAY.map((v, i) => {
    if (v === 0) return "";
    const x = L + i * band + (band - bw) / 2, up = v > 0;
    return `<path class="mk" d="${bar(x, up ? yM(v) : mid, bw, Math.abs(yM(v) - mid), 4, up)}" fill="${up ? DISCHARGE : CHARGE}"><title>${String(i).padStart(2,"0")}:00 — ${up ? "discharging" : "charging"} ${Math.abs(v)} MW</title></path>`;
  }).join("");

  const pts = [[L, yS(40)], ...soc.map((mwh, i) => [L + (i + 1) * band, yS(mwh)])];
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("");
  const area = `${line}L${(w - R).toFixed(1)} ${S_T + S_H}L${L} ${S_T + S_H}Z`;
  const socMax = Math.max(...soc), socMin = Math.min(...soc);

  const xlabs = [0, 6, 12, 18].map((i) =>
    `<text x="${(L + i * band + band / 2).toFixed(1)}" y="${H - 6}" text-anchor="middle" font-size="9.5" fill="${AXIS}">${String(i).padStart(2,"0")}:00</text>`).join("");

  return `
<svg viewBox="0 0 ${w} ${H}" width="100%" style="display:block" role="img" aria-label="Hourly dispatch power in MW with the resulting state of charge below">
  ${MKSTYLE}${grids}${ylabs}
  <line x1="${L}" y1="${mid}" x2="${w - R}" y2="${mid}" stroke="rgba(30,58,138,.16)" stroke-width="1"/>
  ${bars}
  <text x="${(L + 19 * band + band / 2).toFixed(1)}" y="${(yM(70) - 7).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="600" fill="${INK}">70 MW</text>
  <text x="${L - 9}" y="${MW_T + 4}" text-anchor="end" font-size="9" fill="${AXIS}">MW</text>

  <line x1="${L}" y1="${S_T - 16}" x2="${w - R}" y2="${S_T - 16}" stroke="${GRID}" stroke-width="1"/>
  <text x="${L}" y="${S_T - 6}" font-size="9.5" font-weight="600" fill="${AXIS}" letter-spacing=".06em">STATE OF CHARGE</text>
  <line x1="${L}" y1="${(yS(CAP / 2)).toFixed(1)}" x2="${w - R}" y2="${(yS(CAP / 2)).toFixed(1)}" stroke="${GRID}" stroke-width="1"/>
  <path d="${area}" fill="rgba(37,99,235,.08)"/>
  <path d="${line}" fill="none" stroke="#54617A" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>
  <text x="${L - 9}" y="${(yS(CAP) + 3.4).toFixed(1)}" text-anchor="end" font-size="9.5" fill="${AXIS}">100%</text>
  <text x="${L - 9}" y="${(yS(0) + 1).toFixed(1)}" text-anchor="end" font-size="9.5" fill="${AXIS}">0%</text>
  <text x="${(L + 14 * band).toFixed(1)}" y="${(yS(socMax) - 6).toFixed(1)}" text-anchor="middle" font-size="9.5" font-weight="600" fill="${AXIS}">${Math.round(socMax / CAP * 100)}%</text>
  <text x="${(L + 21 * band).toFixed(1)}" y="${(yS(socMin) - 6).toFixed(1)}" text-anchor="middle" font-size="9.5" font-weight="600" fill="${AXIS}">${Math.round(socMin / CAP * 100)}%</text>
  ${xlabs}
</svg>`;
}

/* ── Revenue forecast — the real ReveNew model ────────────────────
   merchant + contracted = base; `merchantOnly` is the product's own
   counterfactual ("what if there were no PPA"), drawn as a reference
   line in ink rather than a third series hue.                        */
function revenueChart(w = 700) {
  const CONTRACTED = "#7B2D80", MERCHANT = "#C74FC9";
  const d = [[2026,5.2,3.2,7.7],[2027,5.2,3.6,7.9],[2028,5.2,3.9,8.2],[2029,5.2,3.7,8.1],[2030,5.2,4.2,8.6],
             [2031,2.6,6.3,8.5],[2032,0,8.6,8.6],[2033,0,8.3,8.3],[2034,0,8.0,8.0],[2035,0,7.6,7.6]];
  const H = 236, L = 46, R = 12, T = 18, B = 24;
  const pw = w - L - R, ph = H - T - B, dom = 10;
  const y = (v) => T + ph - (v / dom) * ph;
  const band = pw / d.length, bw = Math.min(30, band * 0.62);

  const grids = [10, 5, 0].map((g) =>
    `<line x1="${L}" y1="${y(g).toFixed(1)}" x2="${w - R}" y2="${y(g).toFixed(1)}" stroke="${g === 0 ? "rgba(30,58,138,.16)" : GRID}" stroke-width="1"/>
     <text x="${L - 9}" y="${(y(g) + 3.4).toFixed(1)}" text-anchor="end" font-size="9.5" fill="${AXIS}">${g === 0 ? "0" : "€" + g + "M"}</text>`).join("");

  const bars = d.map(([yr, c, m], i) => {
    const x = L + i * band + (band - bw) / 2, base = y(0);
    const hc = base - y(c);
    const topM = y(c + m), hm = y(c) - topM - (c > 0 ? 2 : 0);
    return (c > 0 ? `<path class="mk" d="${bar(x, base - hc, bw, hc, m > 0 ? 0 : 4, true)}" fill="${CONTRACTED}"><title>${yr} — contracted (PPA) €${c.toFixed(1)}M</title></path>` : "")
         + (m > 0 ? `<path class="mk" d="${bar(x, topM, bw, hm, 4, true)}" fill="${MERCHANT}"><title>${yr} — merchant €${m.toFixed(1)}M</title></path>` : "");
  }).join("");

  const cf = d.map(([, , , mo], i) => `${i ? "L" : "M"}${(L + i * band + band / 2).toFixed(1)} ${y(mo).toFixed(1)}`).join("");
  const xlabs = d.map(([yr], i) =>
    `<text x="${(L + i * band + band / 2).toFixed(1)}" y="${H - 6}" text-anchor="middle" font-size="9.5" fill="${AXIS}">’${String(yr).slice(2)}</text>`).join("");

  return `
<svg viewBox="0 0 ${w} ${H}" width="100%" style="display:block" role="img" aria-label="Revenue by year split into contracted and merchant, against a no-PPA counterfactual">
  ${MKSTYLE}${grids}${bars}
  <path d="${cf}" fill="none" stroke="#54617A" stroke-width="1.6" stroke-dasharray="4 3" stroke-linejoin="round"/>
  <text x="${(L + band / 2).toFixed(1)}" y="${(y(8.4) - 8).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="600" fill="${INK}">€8.4M</text>
  <text x="${(L + 5.6 * band).toFixed(1)}" y="${(y(8.5) + 15).toFixed(1)}" text-anchor="middle" font-size="9.5" font-weight="500" fill="${AXIS}">PPA ends</text>
  ${xlabs}
</svg>`;
}

/* ── Fleet scatter — the chart neither product can draw alone ───── */
/* One portfolio dataset behind every Analytics chart, so the three
   scatters plot the same eleven projects and a name means the same asset
   in all of them. Valencia is the project modelled in full elsewhere in
   the canvas, so its row IS that model — 200 MWh, 65.2 GWh, €8.42M,
   12.8%, €42.1M — and the portfolio figures are summed from here rather
   than typed, which is what keeps the KPI row and the charts agreeing.
   NPV is not stored: it comes out of the same CAPEX-and-IRR model the
   project screens use, so a project cannot read one way here and another
   way inside its own Overview. */
const FLEET = [
  { n: "Murcia BESS",     util: 78, irr: 13.4, mw: 110, mwh: 220, gwh: 76.6, rev: 9.80, capex: 45.6 },
  { n: "Valencia BESS",   util: 74, irr: 12.8, mw: 100, mwh: 200, gwh: 65.2, rev: 8.42, capex: 42.1 },
  { n: "Girona BESS",     util: 76, irr: 12.6, mw:  85, mwh: 170, gwh: 56.3, rev: 7.10, capex: 37.2 },
  { n: "Bilbao BESS",     util: 71, irr: 12.1, mw:  90, mwh: 180, gwh: 54.9, rev: 7.03, capex: 38.9 },
  { n: "Madrid Hybrid",   util: 68, irr: 11.9, mw:  80, mwh: 120, gwh: 35.8, rev: 4.55, capex: 51.4 },
  { n: "Córdoba Storage", util: 62, irr: 10.6, mw:  45, mwh:  90, gwh: 24.1, rev: 2.84, capex: 22.8 },
  { n: "Faro Storage",    util: 64, irr: 10.1, mw:  35, mwh:  70, gwh: 19.5, rev: 2.18, capex: 18.6 },
  { n: "Évora Hybrid",    util: 59, irr:  9.6, mw:  50, mwh: 100, gwh: 25.4, rev: 2.64, capex: 34.7 },
  { n: "Almería BESS",    util: 81, irr:  9.4, mw:  60, mwh: 120, gwh: 42.7, rev: 4.34, capex: 28.5, lab: "start" },
  { n: "Toledo Hybrid",   util: 57, irr:  8.9, mw:  70, mwh: 140, gwh: 34.4, rev: 3.30, capex: 47.9, lab: "top" },
  { n: "Cádiz Storage",   util: 52, irr:  7.8, mw:  40, mwh:  80, gwh: 18.2, rev: 1.67, capex: 20.4, lab: "start" },
];
const FSUM = (f) => FLEET.reduce((s, p) => s + f(p), 0);
/* The only projects that carry the accent are the ones Performance insights
   is reading out beside the chart — the panel and the plot point at the same
   three assets, so the eye lands where the argument is.                    */
const FLAGGED = new Set(["Almería BESS", "Cádiz Storage", "Toledo Hybrid"]);
const bubbleR = (mw) => 6 + ((mw - 35) / 75) * 7;

function fleetScatter(w = 640) {
  const H = 340, L = 46, R = 16, T = 16, B = 40;
  const pw = w - L - R, ph = H - T - B;
  const x = (v) => L + ((v - 45) / 45) * pw;
  const y = (v) => T + ph - ((v - 6) / 9) * ph;

  const gx = [50, 60, 70, 80, 90].map((g) =>
    `<line x1="${x(g).toFixed(1)}" y1="${T}" x2="${x(g).toFixed(1)}" y2="${T + ph}" stroke="${GRID}" stroke-width="1"/>
     <text x="${x(g).toFixed(1)}" y="${T + ph + 15}" text-anchor="middle" font-size="9.5" fill="${AXIS}">${g}%</text>`).join("");
  const gy = [6, 9, 12, 15].map((g) =>
    `<line x1="${L}" y1="${y(g).toFixed(1)}" x2="${w - R}" y2="${y(g).toFixed(1)}" stroke="${GRID}" stroke-width="1"/>
     <text x="${L - 9}" y="${(y(g) + 3.4).toFixed(1)}" text-anchor="end" font-size="9.5" fill="${AXIS}">${g}%</text>`).join("");
  // Draw the field first, the flagged three last, so the accent is never overlapped.
  const mark = ({ n, util: u, irr, mw }) => {
    const on = FLAGGED.has(n);
    return `<circle class="mk" cx="${x(u).toFixed(1)}" cy="${y(irr).toFixed(1)}" r="${bubbleR(mw).toFixed(1)}"
       fill="${on ? CMB : FIELD}" fill-opacity="${on ? ".72" : ".26"}"
       stroke="${on ? "#fff" : "rgba(255,255,255,.85)"}" stroke-width="${on ? 2.2 : 1.5}"
       ><title>${n} — ${u}% utilisation · ${irr}% IRR · ${mw} MW</title></circle>`;
  };
  const dots = FLEET.filter((f) => !FLAGGED.has(f.n)).map(mark).join("")
             + FLEET.filter((f) => FLAGGED.has(f.n)).map(mark).join("");
  const labs = FLEET.filter((f) => f.lab && FLAGGED.has(f.n)).map(({ n, util: u, irr, mw, lab }) =>
    lab === "top"
      ? `<text x="${(x(u) - 6).toFixed(1)}" y="${(y(irr) - bubbleR(mw) - 9).toFixed(1)}" text-anchor="middle" font-size="10.5" font-weight="600" fill="${INK}" ${KO}>${n}</text>`
      : `<text x="${(x(u) + bubbleR(mw) + 7).toFixed(1)}" y="${(y(irr) + 3.6).toFixed(1)}" text-anchor="start" font-size="10.5" font-weight="600" fill="${INK}" ${KO}>${n}</text>`).join("");

  return `
<svg viewBox="0 0 ${w} ${H}" width="100%" style="display:block" role="img" aria-label="Battery utilisation against IRR, one bubble per Suite project, sized by installed power">
  ${MKSTYLE}${gx}${gy}${dots}${labs}
</svg>`;
}

/* ── When does moving energy actually earn? ───────────────────────
   One measure on the axis (€ per MWh discharged, the Combined metric),
   with the StoreBrid volume it was earned on as an aligned strip.    */
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const EUR_MWH = [138,131,118,96,88,112,141,152,126,119,133,149];
const GWH     = [41,38,44,47,49,45,40,38,43,46,44,37];

function valueOverTime(w = 1052) {
  const H = 208, L = 46, R = 14, T = 14, P_H = 116, S_T = 152, S_H = 34;
  const pw = w - L - R;
  const y = (v) => T + P_H - ((v - 70) / 100) * P_H;
  const yS = (v) => S_T + S_H - (v / 55) * S_H;
  const band = pw / 12, cx = (i) => L + i * band + band / 2;

  const grids = [170, 140, 110, 80].map((g) =>
    `<line x1="${L}" y1="${y(g).toFixed(1)}" x2="${w - R}" y2="${y(g).toFixed(1)}" stroke="${GRID}" stroke-width="1"/>
     <text x="${L - 9}" y="${(y(g) + 3.4).toFixed(1)}" text-anchor="end" font-size="9.5" fill="${AXIS}">${g}</text>`).join("");
  const line = EUR_MWH.map((v, i) => `${i ? "L" : "M"}${cx(i).toFixed(1)} ${y(v).toFixed(1)}`).join("");
  const dots = EUR_MWH.map((v, i) =>
    `<circle class="mk" cx="${cx(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="4" fill="#fff" stroke="#6D5AC6" stroke-width="2"><title>${MONTHS[i]} — €${v}/MWh on ${GWH[i]} GWh</title></circle>`).join("");
  const strip = GWH.map((v, i) => {
    const bw = Math.min(26, band * 0.5), xx = cx(i) - bw / 2;
    const low = v >= 46;
    return `<path class="mk" d="${bar(xx, yS(v), bw, S_T + S_H - yS(v), 3, true)}" fill="${low ? "rgba(37,99,235,.34)" : "rgba(37,99,235,.16)"}"><title>${MONTHS[i]} — ${v} GWh discharged</title></path>`;
  }).join("");
  const xlabs = MONTHS.map((m, i) =>
    `<text x="${cx(i).toFixed(1)}" y="${H - 4}" text-anchor="middle" font-size="9.5" fill="${AXIS}">${m}</text>`).join("");

  return `
<svg viewBox="0 0 ${w} ${H}" width="100%" style="display:block" role="img" aria-label="Revenue per MWh discharged by month, with energy discharged as an aligned strip">
  ${MKSTYLE}${grids}
  <path d="${line}" fill="none" stroke="#6D5AC6" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
  ${dots}
  ${/* the unit caption sat on top of the highest tick label, and the legend
        beside the chart already says "Revenue / MWh discharged" */""}
  <text x="${cx(7).toFixed(1)}" y="${(y(152) - 10).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="600" fill="${INK}">€152</text>
  <text x="${cx(4).toFixed(1)}" y="${(y(88) + 16).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="600" fill="${INK}">€88</text>
  <line x1="${L}" y1="${S_T - 12}" x2="${w - R}" y2="${S_T - 12}" stroke="${GRID}" stroke-width="1"/>
  <text x="${L}" y="${S_T - 3}" font-size="9.5" font-weight="600" fill="${AXIS}" letter-spacing=".06em">GWh DISCHARGED</text>
  ${strip}${xlabs}
</svg>`;
}

/* ═══════════════════════════════════════════════════════════════
   THE ANALYSIS CASE
   technical simulation × financial scenario = case.
   Every number below is derived from these two tables, so no two
   screens can disagree about the same case.
   ═══════════════════════════════════════════════════════════════ */
const TECH = [
  { id: "base2h", name: "Base case 2027", short: "Base 2 h", mw: 100, mwh: 200, dur: 2.0, rte: 88,
    cycles: 326, gwh: 65.2, util: 74, capex: 42.1, state: "completed", when: "2h ago" },
  { id: "v4h", name: "Base case 2027 — 4 h duration", short: "4 h variant", mw: 100, mwh: 400, dur: 4.0, rte: 88,
    cycles: 231, gwh: 92.4, util: 79, capex: 50.7, state: "completed", when: "1d ago" },
  { id: "lowrte", name: "Base case 2027 — 85% round-trip", short: "Low RTE", mw: 100, mwh: 200, dur: 2.0, rte: 85,
    cycles: 318, gwh: 63.6, util: 72, capex: 41.2, state: "completed", when: "3d ago" },
];
const SCEN = [
  { id: "base", name: "Base market", capture: 118.4, when: "Updated 4h ago" },
  { id: "high", name: "High spread", capture: 138.0, when: "Updated 1d ago" },
  { id: "low",  name: "Low spread",  capture: 97.2,  when: "Updated 2w ago" },
];
/* €M revenue and IRR per cell — the two figures the products own. */
const REV = { base2h: { base: 8.42, high: 9.80, low: 6.91 },
              v4h:    { base: 10.35, high: 12.05, low: 8.50 },
              lowrte: { base: 7.96, high: 9.27, low: 6.54 } };
const IRR = { base2h: { base: 12.8, high: 13.4, low: 9.6 },
              v4h:    { base: 13.2, high: 14.1, low: 10.0 },
              lowrte: { base: 11.5, high: 12.2, low: 8.4 } };
const T = (id) => TECH.find((t) => t.id === id);
const S = (id) => SCEN.find((x) => x.id === id);
const caseOf = (tid, sid) => {
  const t = T(tid), sc = S(sid), rev = REV[tid][sid], irr = IRR[tid][sid];
  return { t, sc, rev, irr,
    perMwh: (rev * 1e6) / (t.gwh * 1000),
    perCycle: (rev * 1e6) / t.cycles,
    perMw: (rev * 1e6) / t.mw };
};
/* §29 · toFixed() emits an ASCII hyphen; everything signed in this product
   uses the typographic minus, so the two must not appear side by side. */
const signed = (v, d = 1) => (v >= 0 ? "+" : "−") + Math.abs(v).toFixed(d);
const eurM = (v) => "€" + v.toFixed(2) + "M";
const eurMs = (v) => (v < 0 ? "−€" : "€") + Math.abs(v).toFixed(1) + "M";

/* NPV is derived from the case's own IRR and CAPEX rather than from a
   second cash-flow model that could disagree with it: CAPEX is spent
   30/70 over two build years, then a level net cash flow runs for the
   15-year horizon. The annuity is whatever returns that IRR; NPV is the
   same series discounted at the project's cost of capital. */
const WACC = 0.095, HORIZON = 15;
const pvCapex = (capex, r) => capex * 0.30 + (capex * 0.70) / (1 + r);
const annuityF = (r) => { let f = 0; for (let i = 2; i < 2 + HORIZON; i++) f += 1 / Math.pow(1 + r, i); return f; };
const netFlow = (c) => pvCapex(c.t.capex, c.irr / 100) / annuityF(c.irr / 100);
const npvOfCase = (c) => -pvCapex(c.t.capex, WACC) + netFlow(c) * annuityF(WACC);
const paybackOfCase = (c) => c.t.capex / netFlow(c);

/* ═══════════════════════════════════════════════════════════════
   ANALYSIS CASE — the Suite's own object, and the only one it owns
   A named pairing of a StoreBrid simulation with a ReveNew financial
   case. Deliberately thin: a name and two references. Everything it
   reports is read from the two products, never stored here.
   ═══════════════════════════════════════════════════════════════ */
const ACASES = [
  { id: "base", name: "Base case", tid: "base2h", sid: "base", goal: "Reference", when: "Created 2 weeks ago", current: true },
  { id: "high", name: "High storage", tid: "v4h", sid: "base", goal: "Evaluate more storage", when: "Created 1 day ago" },
  { id: "stress", name: "Stress test", tid: "v4h", sid: "low", goal: "Evaluate financial risk", when: "Created 1 day ago" },
];
const AC = (id) => ACASES.find((a) => a.id === id);
const acCase = (a) => caseOf(a.tid, a.sid);
const acMetrics = (a) => {
  const c = acCase(a);
  return { c, npv: npvOfCase(c), irr: c.irr, capex: c.t.capex, rev: c.rev, pb: paybackOfCase(c) };
};

/* which saved analysis case, if any, a combination corresponds to */
const savedAs = (tid, sid) => ACASES.find((a) => a.tid === tid && a.sid === sid);
/* §7 · one freshness vocabulary, used wherever a result appears */
const STALE = { tid: "v4h", sid: "low" };   /* the simulation moved after this case was priced */
const isStale = (tid, sid) => tid === STALE.tid && sid === STALE.sid;
/* §3 · Staleness had been drawn five different ways — four alpha recipes
   and three icon sizes for the same idea. One palette, one badge, one
   notice, everywhere a result can be out of date. The amber used for
   JUDGED metrics ("Weakest", "worse") is a different meaning and keeps
   its own treatment: that one is information, this one is a warning.  */
const WARN = { ink: "#9A6208", tint: "245,158,11" };
/* §2 · portfolio scale. Detection happens when a screen opens, so this is
   a count as of this page load, not a live feed. */
const STALE_PORTFOLIO = 3;
const warnWash = (a = 0.08) => `linear-gradient(168deg,rgba(${WARN.tint},${a}),rgba(255,255,255,0) 70%)`;
const warnRing = (a = 0.2) => `inset 0 0 0 1px rgba(${WARN.tint},${a})`;

/* the badge — the matrix cell, the Compare row, the portfolio counter */
const staleTag = (label = "Outdated") =>
  `<span class="cov" style="background:linear-gradient(168deg,rgba(${WARN.tint},.14),rgba(${WARN.tint},.07));border-color:rgba(${WARN.tint},.3);color:${WARN.ink}">
     <i style="background:${WARN.ink}"></i>${label}</span>`;

/* the notice — aggregate, informative, never blocking. `title` gives the
   two-line banner form; without it, the single-line form. */
const staleNotice = ({ title, body, cta, link, gap = "20px" } = {}) => `
<div style="display:flex;align-items:${title ? "flex-start" : "center"};gap:12px;margin-bottom:${gap};
     padding:${title ? "15px 20px" : "12px 16px"};border-radius:var(--r-${title ? "sm" : "xs"});
     background:${warnWash()};box-shadow:${warnRing()}">
  <span style="color:${WARN.ink};display:flex;flex:none;${title ? "margin-top:1px" : ""}">${ic("alert", 16)}</span>
  <span style="flex:1;min-width:0">
    ${title ? `<span style="display:block;font-size:13px;font-weight:600;color:var(--s900)">${title}</span>` : ""}
    <span class="t-meta" style="display:block;${title ? "margin-top:5px;" : ""}line-height:1.55;font-size:12.5px">${body}</span>
  </span>
  ${cta ? `<button class="btn btn-secondary" style="flex:none;height:${title ? "34px" : "32px"};font-size:12.5px"><i style="width:6px;height:6px;border-radius:50%;background:${RN};display:block"></i>${cta}${ic("upRight", 13, 1.8)}</button>` : ""}
  ${link ? `<a href="#" style="flex:none;font-size:12.5px;font-weight:500;white-space:nowrap">${link}${ic("right", 12, 2)}</a>` : ""}
</div>`;

/* The catalogue the criteria editor offers. Every one reads a computed
   result; none of them is an input to a model. */
const CRIT_SPEC = {
  capex: { label: "CAPEX", op: "≤", get: (c) => c.t.capex, fmt: (v) => "€" + v.toFixed(1) + "M",
           unit: "€M", pass: (v, t) => v <= t, over: (v, t) => v - t, from: "storebrid" },
  irr:   { label: "IRR", op: "≥", get: (c) => c.irr, fmt: (v) => v.toFixed(1) + "%",
           unit: "%", pass: (v, t) => v >= t, over: (v, t) => t - v, from: "combined" },
  pb:    { label: "Payback", op: "≤", get: (c) => paybackOfCase(c), fmt: (v) => v.toFixed(1) + " yrs",
           unit: "yrs", pass: (v, t) => v <= t, over: (v, t) => v - t, from: "revenew" },
  npv:   { label: "NPV", op: "≥", get: (c) => npvOfCase(c), fmt: (v) => eurMs(v),
           unit: "€M", pass: (v, t) => v >= t, over: (v, t) => t - v, from: "revenew" },
};

/* The worked example the screens carry. Criteria are optional — CRITERIA
   empty is a valid, and the default, state of the product. */
const CRITERIA = [{ key: "capex", target: 48 }, { key: "irr", target: 12 }];

/* Why a combination fails, in the words of the criterion it failed.
   Returns [] when it satisfies everything. */
const failsOf = (c, crit = CRITERIA) => crit.flatMap(({ key, target }) => {
  const k = CRIT_SPEC[key], v = k.get(c);
  return k.pass(v, target) ? [] : [{ k, key, target, v, by: k.over(v, target) }];
});
const eligible = (c, crit = CRITERIA) => failsOf(c, crit).length === 0;

/* Every pairing in the project, and the ones a deterministic claim may
   be made about: eligible, and not sitting on data that has moved on.
   §14 — a stale result never wins anything until it is recalculated. */
const ALLCOMBOS = () => TECH.flatMap((t) => SCEN.map((sc) => caseOf(t.id, sc.id)));
const claimable = (crit = CRITERIA) =>
  ALLCOMBOS().filter((c) => !isStale(c.t.id, c.sc.id) && eligible(c, crit));

/* the pairing, drawn the same way everywhere it appears */
const acPair = (a, { size = "md", freshness } = {}) => {
  const c = acCase(a), big = size === "lg";
  const half = (label, name, meta, dot, product, when) => `
    <span style="flex:1;min-width:0">
      <span class="band" style="font-size:10px">${label}</span>
      <span style="display:flex;align-items:center;gap:9px;margin-top:7px">
        <i style="width:6px;height:6px;flex:none;border-radius:50%;background:${dot};display:block"></i>
        <span style="font-size:${big ? "15" : "13.5"}px;font-weight:600;color:var(--s900);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${name}</span>
      </span>
      <span class="t-meta" style="display:block;margin-top:5px">${meta}</span>
      ${freshness ? `<span class="t-meta" style="display:block;margin-top:4px">${product} · ${when}</span>` : ""}
    </span>`;
  return `
<span style="display:flex;align-items:center;gap:20px;flex:1;min-width:0">
  ${half("Technical simulation", c.t.name, `${c.t.mw} MW / ${c.t.mwh} MWh · ${c.t.dur.toFixed(1)} h · ${c.t.gwh} GWh discharged`, SB, "StoreBrid", "updated 2h ago")}
  <span style="flex:none;font-size:15px;font-weight:600;color:var(--s400)">+</span>
  ${half("Financial case", c.sc.name, `Capture €${c.sc.capture.toFixed(1)}/MWh · ${eurM(c.rev)} revenue`, RN, "ReveNew", "updated 4h ago")}
</span>`;
};



/* §"Cross-product UX" · the financial summary that belongs beside a
   StoreBrid result — the whole point of showing the two together. */
const finSummary = (tid, sid) => {
  const c = caseOf(tid, sid), npv = npvOfCase(c);
  return `
<section class="panel" style="padding:22px 26px;margin-top:24px;
     background:linear-gradient(122deg,rgba(175,71,178,.05),rgba(255,255,255,0) 62%)">
  <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
    <span class="band" style="color:var(--rv600)">Financial summary</span>
    <span class="t-meta">for this simulation under</span>
    <span style="display:inline-flex;align-items:center;gap:7px">
      <i style="width:5px;height:5px;border-radius:50%;background:${RN};display:block"></i>
      <span style="font-size:13.5px;font-weight:600;color:var(--s900)">${c.sc.name}</span>
    </span>
    <span class="cov"><i style="background:${SU}"></i>Current scenario</span>
    <span style="flex:1"></span>
    <button class="btn btn-secondary" style="height:34px;font-size:12.5px">${ic("trend", 15)}Change scenario${ic("down", 14, 1.8)}</button>
    <a href="#" style="font-size:12.5px;font-weight:500;display:inline-flex;align-items:center;gap:5px">View financial scenario${ic("right", 13, 2)}</a>
  </div>
  <div style="display:flex;gap:30px;margin-top:18px;padding-top:16px;border-top:1px solid var(--hair)">
    ${[["NPV", eurMs(npv), src("revenew"), `at ${(WACC * 100).toFixed(1)}% cost of capital`],
       ["IRR", c.irr.toFixed(1) + "%", src("combined"), "ReveNew cash flows · StoreBrid CAPEX"],
       ["CAPEX", "€" + c.t.capex.toFixed(1) + "M", src("storebrid"), `${c.t.mwh} MWh installed`],
       ["Annual revenue", eurM(c.rev), src("revenew"), `capture €${c.sc.capture.toFixed(1)}/MWh`],
       ["Revenue / MWh discharged", "€" + c.perMwh.toFixed(1), src("combined"), `${eurM(c.rev)} ÷ ${c.t.gwh} GWh`]].map(([k, v, sr, note]) => `
      <span style="flex:1;min-width:0">
        <span class="kpi-lab" style="display:block">${k}</span>
        <span style="display:block;font-size:22px;font-weight:700;letter-spacing:-.024em;color:var(--s900);margin-top:8px;font-variant-numeric:tabular-nums">${v}</span>
        <span style="display:flex;align-items:center;gap:8px;margin-top:8px">${sr}</span>
        <span class="t-meta" style="display:block;margin-top:5px;line-height:1.45">${note}</span>
      </span>`).join("")}
  </div>
  <p class="t-meta" style="margin-top:16px;line-height:1.6">
    The technical results above and these figures describe the same asset: ${c.t.gwh} GWh discharged is what earns ${eurM(c.rev)}.
    Change the scenario and only the financial half moves.
  </p>
</section>`;
};


/* The whole thesis in one strip: what is being evaluated, and what it
   yields once both sides are counted. */
const caseBar = ({ tid, sid, action, delta }) => {
  const c = caseOf(tid, sid);
  const half = (label, name, meta, dot, product) => `
    <span style="flex:1;min-width:0">
      <span class="band" style="font-size:10px">${label}</span>
      <span style="display:flex;align-items:center;gap:9px;margin-top:7px">
        <span style="font-size:15px;font-weight:600;color:var(--s900);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${name}</span>
        <span class="src" style="flex:none"><i style="background:${dot}"></i>${product}</span>
      </span>
      <span class="t-meta" style="display:block;margin-top:5px">${meta}</span>
    </span>`;
  return `
<section class="panel lift combined" style="padding:20px 24px;border:1px solid rgba(255,255,255,.9);
         display:flex;align-items:center;gap:22px">
  ${half("Technical case", c.t.name, `${c.t.mw} MW / ${c.t.mwh} MWh · ${c.t.dur.toFixed(1)} h · ${c.t.gwh} GWh discharged`, SB, "StoreBrid")}
  <span style="flex:none;font-size:17px;font-weight:600;color:var(--s400)">×</span>
  ${half("Financial scenario", c.sc.name, `Capture price €${c.sc.capture.toFixed(1)}/MWh · ${c.sc.when.toLowerCase()}`, RN, "ReveNew")}
  <span style="flex:none;font-size:17px;font-weight:600;color:var(--s400)">=</span>
  <span style="flex:none;text-align:right;min-width:150px">
    <span class="band" style="font-size:10px">Outcome</span>
    <span style="display:block;font-size:26px;font-weight:700;letter-spacing:-.026em;color:var(--s900);margin-top:6px;font-variant-numeric:tabular-nums">€${c.perMwh.toFixed(1)}</span>
    <span style="display:flex;align-items:center;justify-content:flex-end;gap:8px;margin-top:6px">
      ${delta ? delta : ""}<span class="t-meta">per MWh discharged</span>${src("combined")}
    </span>
  </span>
  ${action ? `<span style="flex:none">${action}</span>` : ""}
</section>`;
};

/* ═══════════════════════════════════════════════════════════════
   SCREEN 1 — Suite Home
   Executive + working overview. One primary glass surface (the
   portfolio), two secondary pairs beneath it, flat rows at the end.
   ═══════════════════════════════════════════════════════════════ */
const coverageBar = () => {
  const seg = (n, bg, first, last) =>
    `<span style="flex:${n};height:10px;background:${bg};display:block;
      border-radius:${first ? "5px 2px 2px 5px" : last ? "2px 5px 5px 2px" : "2px"};
      box-shadow:inset 0 1px 0 rgba(255,255,255,.28)"></span>`;
  return `
  <div style="display:flex;gap:2px;margin-top:16px">
    ${seg(11, `linear-gradient(90deg,${SB},${RN})`, true, false)}
    ${seg(5, SB, false, false)}
    ${seg(8, RN, false, true)}
  </div>
  <div style="display:flex;gap:22px;margin-top:12px;flex-wrap:wrap">
    ${[["Both products", 11, `linear-gradient(90deg,${SB},${RN})`],
       ["Engineering only", 5, SB], ["Financial only", 8, RN]].map(([l, n, bg]) => `
      <span style="display:inline-flex;align-items:center;gap:7px">
        <i style="width:10px;height:5px;border-radius:3px;background:${bg};display:block;flex:none"></i>
        <span style="font-size:12px;color:var(--s500)">${l}</span>
        <b style="font-size:12px;font-weight:600;color:var(--s900)">${n}</b>
      </span>`).join("")}
  </div>`;
};

/* Are technical output and commercial performance moving together?
   Two measures of different scale, one axis: both indexed to January.
   Derived from the same monthly figures Analytics plots.            */
function portfolioTrend(w = 566) {
  /* R has to clear the widest end-of-line label: "Revenue" at 10px semibold
     is ~45px, and the labels start 7px inside the margin. At 44 it was
     clipped mid-word at every viewport width. */
  const H = 224, L = 34, R = 58, T = 16, B = 26;
  const pw = w - L - R, ph = H - T - B;
  const rev = GWH.map((g, i) => (g * EUR_MWH[i]) / 1000);
  const idx = (a) => a.map((v) => (v / a[0]) * 100);
  const E = idx(GWH), V = idx(rev);
  const lo = 70, hi = 125;
  const x = (i) => L + (i / 11) * pw;
  const y = (v) => T + ph - ((v - lo) / (hi - lo)) * ph;
  const grids = [120, 100, 80].map((g) =>
    `<line x1="${L}" y1="${y(g).toFixed(1)}" x2="${w - R}" y2="${y(g).toFixed(1)}" stroke="${g === 100 ? "rgba(30,58,138,.16)" : GRID}" stroke-width="1"/>
     <text x="${L - 7}" y="${(y(g) + 3.4).toFixed(1)}" text-anchor="end" font-size="9.5" fill="${AXIS}">${g}</text>`).join("");
  const path = (a) => a.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join("");
  const dot = (a, c) => a.map((v, i) =>
    `<circle class="mk" cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="3.2" fill="#fff" stroke="${c}" stroke-width="1.8"><title>${MONTHS[i]} — index ${v.toFixed(0)}</title></circle>`).join("");
  const xl = [0, 3, 6, 9, 11].map((i) =>
    `<text x="${x(i).toFixed(1)}" y="${H - 6}" text-anchor="middle" font-size="9.5" fill="${AXIS}">${MONTHS[i]}</text>`).join("");
  return `
<svg viewBox="0 0 ${w} ${H}" width="100%" style="display:block" role="img" aria-label="Energy discharged and revenue, both indexed to January">
  ${MKSTYLE}${grids}
  <rect x="${x(3).toFixed(1)}" y="${T}" width="${(x(4) - x(3)).toFixed(1)}" height="${ph}" fill="rgba(37,99,235,.05)"/>
  <path d="${path(E)}" fill="none" stroke="${SB}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="${path(V)}" fill="none" stroke="${RN}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
  ${dot(E, SB)}${dot(V, RN)}
  <text x="${(w - R + 7).toFixed(1)}" y="${(y(E[11]) + 3.6).toFixed(1)}" font-size="10" font-weight="600" fill="${SB}">Energy</text>
  <text x="${(w - R + 7).toFixed(1)}" y="${(y(V[11]) + 3.6).toFixed(1)}" font-size="10" font-weight="600" fill="${RN}">Revenue</text>
  <text x="${L - 7}" y="${T + 4}" text-anchor="end" font-size="9" fill="${AXIS}">idx</text>
  ${xl}
</svg>`;
}

const projectCard = ({ name, place, spec, icon, sb, rn, when }) => {
  const tint = sb && rn ? "tint-both" : sb ? "tint-sb" : "tint-rv";
  return `
<a href="#" class="panel ${tint}" style="display:flex;align-items:center;gap:16px;padding:16px 18px;text-decoration:none">
  <span class="wash" style="width:40px;height:40px;flex:none;display:flex;align-items:center;justify-content:center;
        border-radius:var(--r-xs);color:var(--b700)">${ic(icon, 20)}</span>
  <span style="flex:1;min-width:0">
    <span class="t-card" style="display:block;font-size:15px">${name}</span>
    <span style="display:block;font-size:12px;color:var(--s500);margin-top:3px">${place} · ${spec}</span>
    <span style="display:flex;align-items:center;gap:10px;margin-top:9px">${cov(sb, rn)}<span class="t-meta">${when}</span></span>
  </span>
  <span style="flex:none;display:flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:var(--b700)">
    Open${ic("right", 14, 2)}
  </span>
</a>`;
};

const activityRow = ({ what, project, source, when }) => `
<div style="display:flex;align-items:center;gap:14px;height:52px">
  <span style="flex:1;min-width:0;font-size:13px;color:var(--s700);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${what}</span>
  <a href="#" style="width:160px;flex:none;font-size:13px;font-weight:500">${project}</a>
  <span style="width:96px;flex:none">${source}</span>
  <span class="t-meta" style="width:74px;flex:none;text-align:right">${when}</span>
</div>`;

/* §4 · What the portfolio needs from the user, not what it contains.
   Every card is a deterministic reading of figures that already exist:
   an observation, the two numbers that support it, and what it may mean.
   Nothing here is generated, ranked or recommended. */
/* §4-§5, §27 · The reason to come back. Every item is a decision the user
   already started — a saved brief, an open comparison, criteria they set —
   so nothing here is invented: it is the Suite handing back the reasoning
   they left behind. Deliberately two or three, never a task list; Home is
   not a queue. */
const CONTINUE = [
  { project: "Valencia BESS", title: "4 h storage investment decision",
    kind: "Decision brief", cases: 3, objective: "Maximise NPV",
    crit: "CAPEX ≤ €48M · IRR ≥ 12%", when: "Saved 2 days ago · Victor Andújar",
    note: "Stress test became outdated after you saved this.", warn: true,
    action: "Continue comparison" },
  { project: "Madrid Hybrid", title: "High spread sensitivity",
    kind: "Open comparison", cases: 2, objective: "Maximise IRR",
    crit: "CAPEX ≤ €48M", when: "Last opened yesterday",
    note: "Left with two cases selected and no brief saved.",
    action: "Continue analysis" },
  { project: "Porto PV", title: "Contracted vs merchant", kind: "Decision brief",
    cases: 2, objective: "Shortest payback", crit: "None",
    when: "Saved 5 days ago · Ana Ruiz",
    note: "Both cases still in step with their sources.",
    action: "Open brief" },
];

const continueCard = (x) => `
<a href="#" class="panel" style="flex:1;min-width:0;display:flex;flex-direction:column;padding:18px 20px;text-decoration:none">
  <span style="display:flex;align-items:center;gap:9px;flex-wrap:wrap">
    <span class="cov"><i style="background:${SU}"></i>${x.kind}</span>
    <span class="t-meta">${x.project}</span>
  </span>
  <span style="display:block;font-size:15px;font-weight:600;color:var(--s900);margin-top:10px">${x.title}</span>
  <span style="display:flex;flex-wrap:wrap;gap:8px 16px;margin-top:11px">
    <span class="t-meta">${x.cases} analysis cases</span>
    <span class="t-meta">Objective <b style="font-weight:600;color:var(--s700)">${x.objective}</b></span>
    <span class="t-meta">Constraints <b style="font-weight:600;color:var(--s700)">${x.crit}</b></span>
  </span>
  <span style="display:flex;align-items:flex-start;gap:8px;margin-top:12px;flex:1">
    ${x.warn ? `<span style="color:${WARN.ink};display:flex;flex:none;margin-top:1px">${ic("alert", 13)}</span>` : ""}
    <span class="t-meta" style="line-height:1.55;${x.warn ? `color:${WARN.ink}` : ""}">${x.note}</span>
  </span>
  <span style="display:flex;align-items:center;gap:10px;margin-top:14px;padding-top:12px;border-top:1px solid var(--hair)">
    <span class="t-meta" style="flex:1;min-width:0">${x.when}</span>
    <span style="display:inline-flex;align-items:center;gap:5px;font-size:12.5px;font-weight:500;color:var(--b700)">
      ${x.action}${ic("right", 13, 2)}</span>
  </span>
</a>`;

const attnCard = ({ subject, verdict, tone, readings, implication, action }) => `
<a href="#" class="panel" style="flex:1;min-width:0;display:flex;flex-direction:column;padding:18px 20px;text-decoration:none">
  <span style="display:flex;align-items:center;gap:8px">
    <i style="width:6px;height:6px;flex:none;border-radius:50%;display:block;background:${tone}"></i>
    <span class="t-meta" style="font-size:11.5px">${verdict}</span>
  </span>
  <span style="display:block;font-size:15px;font-weight:600;color:var(--s900);margin-top:9px">${subject}</span>
  <span style="display:flex;gap:22px;margin-top:13px">
    ${readings.map(([v, l, sr]) => `
      <span style="min-width:0">
        <span style="display:block;font-size:19px;font-weight:700;letter-spacing:-.022em;color:var(--s900);font-variant-numeric:tabular-nums">${v}</span>
        <span style="display:flex;align-items:center;gap:6px;margin-top:4px"><span class="t-meta">${l}</span>${sr}</span>
      </span>`).join("")}
  </span>
  <span style="display:block;font-size:12.5px;color:var(--s500);line-height:1.55;margin-top:13px;flex:1">${implication}</span>
  <span style="display:inline-flex;align-items:center;gap:5px;margin-top:14px;font-size:12.5px;font-weight:500;color:var(--b700)">
    ${action}${ic("right", 13, 2)}
  </span>
</a>`;

const insightCard = ({ verdict, tone, body, action, source }) => `
<a href="#" class="glass-sm" style="display:block;padding:15px 17px;text-decoration:none">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
    <span style="display:inline-flex;align-items:center;gap:8px">
      <i style="width:6px;height:6px;border-radius:50%;display:block;background:${tone}"></i>
      <span style="font-size:12.5px;font-weight:600;color:var(--s900)">${verdict}</span>
    </span>
    ${source}
  </div>
  <p style="font-size:12.5px;color:var(--s500);line-height:1.55;margin-top:8px">${body}</p>
  <span style="display:inline-flex;align-items:center;gap:5px;margin-top:10px;font-size:12px;font-weight:500;color:var(--b700)">
    ${action}${ic("right", 13, 2)}
  </span>
</a>`;

const HOMEB = { w: 1440, h: 2040 };
const homeBody = () => `
${head({
  eyebrow: "Friday, 21 August · Sunveon Energy",
  title: "Good morning, Victor",
  actions: `<button class="btn btn-primary">${ic("analytics", 16)}Compare projects</button>
            <button class="btn btn-secondary">${ic("plus", 16, 1.9)}New project</button>`,
})}

<section class="panel lift" style="padding:26px 30px">
  <div class="band">Workspace</div>
  <div style="display:flex;align-items:flex-start;gap:44px;margin-top:14px">
    <div style="flex:1.35;min-width:0">
      <div style="display:flex;align-items:baseline;gap:12px">
        <span style="font-size:42px;font-weight:700;letter-spacing:-.032em;color:var(--s900);line-height:1">24</span>
        <span style="font-size:17px;font-weight:600;color:var(--s700)">Projects</span>
        <span class="t-meta" style="margin-left:2px">16 with engineering · 19 with financial</span>
      </div>
      ${coverageBar()}
    </div>
    <div style="width:1px;align-self:stretch;background:var(--hair);flex:none"></div>
    <div style="flex:1;min-width:0;padding-top:2px">
      <div class="kpi-lab">Installed capacity</div>
      <div style="font-size:26px;font-weight:700;letter-spacing:-.026em;color:var(--s900);margin-top:9px;font-variant-numeric:tabular-nums">1.84 GW</div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:10px">
        <span class="t-meta">3.21 GWh storage</span>${src("suite")}
      </div>
    </div>
  </div>
  <div class="hr" style="margin:24px 0 20px"></div>
  <div class="kpirow">
    ${kpi({ quiet: 1, label: "Financial cases", value: "21", source: src("revenew"), formula: "across 19 projects · 3 in draft" })}
    ${kpi({ quiet: 1, label: "Simulations", value: "68", source: src("storebrid"), delta: "+6 this week" })}
    ${kpi({ quiet: 1, label: "Analysis cases", value: "54", source: src("suite"), formula: "simulation + financial case pairings",
            warn: `${STALE_PORTFOLIO} need recalculation` })}
    ${kpi({ quiet: 1, label: "Energy discharged", value: "512 GWh", source: src("storebrid"), delta: "+6.2%" })}
    ${kpi({ quiet: 1, label: "Annual revenue", value: "€63.4M", source: src("revenew"), delta: "+4.1%" })}
  </div>
</section>

${sec({ label: "Needs your attention", top: 30,
        sub: "Deterministic readings of figures that already exist — a technical number against a financial one. The Suite states what it sees; the judgement is yours.",
        right: `<a href="#" style="font-size:13px;font-weight:500">All insights</a>` })}
<div style="display:flex;gap:14px;align-items:stretch">
  ${attnCard({
    subject: "Almería BESS", verdict: "High utilisation · low return", tone: "var(--warn)",
    readings: [["81%", "utilisation", src("storebrid")], ["9.4%", "IRR", src("combined")]],
    implication: "The hardest-cycled asset in the portfolio sits second from bottom on return. High technical usage is not translating into equivalent financial performance.",
    action: "Review project" })}
  ${attnCard({
    subject: `${STALE_PORTFOLIO} analysis cases outdated`, verdict: "Financial results predate the asset", tone: WARN.ink,
    readings: [[String(STALE_PORTFOLIO), "cases affected", src("suite")], ["12 min", "since the last re-run", src("storebrid")]],
    implication: "Their technical simulations were re-run after the financial result was calculated, so those cases are excluded from portfolio conclusions until they are recalculated.",
    action: "Review affected cases" })}
  ${attnCard({
    subject: "Cádiz Storage", verdict: "Low utilisation · low return", tone: "var(--warn)",
    readings: [["52%", "utilisation", src("storebrid")], ["7.8%", "IRR", src("combined")]],
    implication: "Least-used asset in the portfolio. Its export limit in the plant configuration sits below the grid offer on file, which caps what the market case can earn.",
    action: "Review project" })}
</div>

${sec({ label: "Continue analysis", top: 34,
        sub: "Decisions you already started — a saved brief, an open comparison, the criteria you set. The Suite hands the reasoning back rather than making you rebuild it.",
        right: `<a href="#" style="font-size:13px;font-weight:500">All saved briefs</a>` })}
<div style="display:flex;gap:14px;align-items:stretch">
  ${CONTINUE.map(continueCard).join("")}
</div>

<div style="display:flex;gap:26px;margin-top:34px;align-items:flex-start">
  <section style="flex:1;min-width:0">
    ${sec({ label: "Recent projects", top: 0, right: `<a href="#" style="font-size:13px;font-weight:500">All projects</a>` })}
    <div style="display:flex;flex-direction:column;gap:12px">
      ${projectCard({ name: "Valencia BESS", place: "Spain", spec: "BESS · 100 MW / 200 MWh · 3 simulations", icon: "battery", sb: 1, rn: 1, when: "2 hours ago" })}
      ${projectCard({ name: "Madrid Hybrid", place: "Spain", spec: "PV + BESS · 80 MW / 120 MWh · 2 simulations", icon: "layers", sb: 1, rn: 1, when: "Yesterday" })}
      ${projectCard({ name: "Porto PV", place: "Portugal", spec: "PV · 45 MW · financial model only", icon: "sun", sb: 0, rn: 1, when: "2 days ago" })}
    </div>
  </section>

  <section style="flex:1.16;min-width:0">
    ${sec({ label: "Portfolio performance", top: 0, source: src("combined"),
            right: `<span class="t-meta">Last 12 months</span>` })}
    <div class="panel" style="padding:20px 22px">
      <p class="t-meta" style="font-size:12px;line-height:1.55;margin-bottom:12px">
        Energy discharged and revenue, both indexed to January. They track each other until spring —
        then April and May move more energy for less money.
      </p>
      <div style="margin-bottom:10px">${legend([["Energy discharged", SB], ["Revenue", RN]])}</div>
      ${portfolioTrend(566)}
    </div>
  </section>
</div>

<div style="display:flex;gap:26px;margin-top:34px;align-items:flex-start">
  <section style="flex:1.16;min-width:0">
    ${sec({ label: "Recent activity", top: 0, right: `<a href="#" style="font-size:13px;font-weight:500">View all</a>` })}
    <div class="rows">
      ${activityRow({ what: "Simulation “Base case 2027” completed", project: "Valencia BESS", source: src("storebrid"), when: "2h ago" })}
      ${activityRow({ what: "Financial scenario “High spread” updated", project: "Valencia BESS", source: src("revenew"), when: "4h ago" })}
      ${activityRow({ what: "Financial model recalculated", project: "Madrid Hybrid", source: src("revenew"), when: "Yesterday" })}
      ${activityRow({ what: "PPA contract “Iberdrola 2026–31” changed", project: "Valencia BESS", source: src("revenew"), when: "Yesterday" })}
      ${activityRow({ what: "Plant configuration changed", project: "Sevilla Storage", source: src("storebrid"), when: "2d ago" })}
      ${activityRow({ what: "Simulation “Low RTE 85%” ended in error", project: "Madrid Hybrid", source: src("storebrid"), when: "2d ago" })}
    </div>
  </section>

  <section style="flex:1;min-width:0">
    ${sec({ label: "Portfolio conditions", top: 0, right: `<a href="#" style="font-size:13px;font-weight:500">View all</a>` })}
    <div style="display:flex;flex-direction:column;gap:12px">
      ${insightCard({ verdict: "Contracted share falling", tone: "var(--b500)", source: src("revenew"),
        body: "Across the portfolio, contracted revenue drops from 58% to 34% by 2031 as three PPAs reach their end date.",
        action: "Review contracts" })}
      ${insightCard({ verdict: "Strong performance", tone: "var(--ok)", source: src("revenew"),
        body: "Porto PV sits above the portfolio median on both revenue and IRR for a third consecutive quarter.",
        action: "View details" })}
    </div>
  </section>
</div>`;
const home = doc({ ...HOMEB, side: rootSide("home"), body: homeBody() });
/* §10 · The panel behind the global indicator. Persistent conditions only —
   things that are still true and still need an action — so no read/unread,
   no dismiss, and no history. Each row carries the minimum that lets someone
   decide whether to act: whose project, which analysis case, which side fell
   behind, and the one link that fixes it. It deliberately does not restate
   the case's figures; those live one click away and would only invite
   deciding from inside a notification panel. */
const ATTN = [
  { project: "Valencia BESS", ac: "Stress test", pair: "4 h variant × Low spread",
    state: "Outdated", behind: "rn",
    why: "The technical simulation was re-run 12 minutes ago; the financial result dates from 4 hours ago." },
  { project: "Madrid Hybrid", ac: "Base case", pair: "2 h baseline × Base market",
    state: "Recalculation required", behind: "rn",
    why: "Plant configuration changed after the last financial calculation, so CAPEX no longer matches the model." },
  { project: "Sevilla Storage", ac: "Contracted 2027", pair: "2 h baseline × PPA 2027",
    state: "Outdated", behind: "sb",
    why: "The price curve was replaced after the simulation ran, so the dispatch behind these figures is the earlier one." },
];

const attnRow = (x, last) => `
<div style="padding:16px 22px;${last ? "" : "border-bottom:1px solid var(--hair)"}">
  <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
    <span style="font-size:13.5px;font-weight:600;color:var(--s900)">${x.project}</span>
    <span style="color:var(--s300)">·</span>
    <span style="font-size:13px;color:var(--s700)">${x.ac}</span>
    <span style="flex:1"></span>
    ${staleTag(x.state)}
  </div>
  <div style="display:flex;align-items:center;gap:8px;margin-top:7px;flex-wrap:wrap">
    <span class="t-meta">${x.pair}</span>
    <span style="color:var(--s300)">·</span>
    <span class="src" title="Which side moved, and which side is behind">
      <i style="background:${x.behind === "rn" ? SB : RN}"></i>${x.behind === "rn" ? "StoreBrid" : "ReveNew"}
      <span style="color:var(--s400);margin:0 2px">→</span>
      <i style="background:${x.behind === "rn" ? RN : SB}"></i>${x.behind === "rn" ? "ReveNew" : "StoreBrid"}
    </span>
  </div>
  <p class="t-meta" style="margin-top:9px;line-height:1.55">${x.why}</p>
  <div style="display:flex;align-items:center;gap:12px;margin-top:11px">
    <a href="#" style="font-size:12.5px;font-weight:500">Review case${ic("right", 12, 2)}</a>
    <button class="btn btn-secondary" style="height:30px;font-size:12px">
      <i style="width:6px;height:6px;border-radius:50%;background:${x.behind === "rn" ? RN : SB};display:block"></i>Recalculate in ${x.behind === "rn" ? "ReveNew" : "StoreBrid"}${ic("upRight", 12, 1.8)}</button>
  </div>
</div>`;

const attnPanel = () => capabilityModal({
  title: "Needs attention",
  context: "Conditions that require action across your portfolio.",
  accent: WARN.ink, width: 860,
  footNote: "Nothing is dismissed here. A case leaves this list when both sides are back in step.",
  body: `
  <div style="padding:13px 22px;border-bottom:1px solid var(--hair);display:flex;align-items:center;gap:10px">
    <span style="color:${WARN.ink};display:flex;flex:none">${ic("alert", 15)}</span>
    <span style="flex:1;min-width:0;font-size:12.5px;color:var(--s700);line-height:1.5">
      ${ATTN.length} analysis cases pair a result with data that has moved on since it was calculated.
    </span>
  </div>
  <div>${ATTN.map((x, i) => attnRow(x, i === ATTN.length - 1)).join("")}</div>`,
});

writeFileSync("NeedsAttention.dc.html", doc({ ...HOMEB, side: rootSide("attn"), body: homeBody(), overlay: attnPanel() }));
console.log("NeedsAttention.dc.html");

writeFileSync("Main.dc.html", home);
console.log("Main.dc.html", home.length);

/* ═══════════════════════════════════════════════════════════════
   Unified Projects — kept as built, moved onto the calmer foundation
   ═══════════════════════════════════════════════════════════════ */
/* §11-§12 · The registry said what a project IS. It never said whether it
   was worth opening. Six states, derived — not a seventh column of prose:
   whether both sides exist, whether anyone has paired them, and whether
   what they produced still holds. */
const anStatus = ({ sb, rn, cases = 0, stale = 0 }) => {
  if (!sb && !rn) return { tag: "Not analysed", tone: "n", sub: "Neither side configured" };
  if (sb && !rn) return { tag: "Technical only", tone: "sb", sub: "No financial case yet" };
  if (!sb && rn) return { tag: "Financial only", tone: "rn", sub: "No simulation yet" };
  if (!cases) return { tag: "Not analysed", tone: "n", sub: "Both sides ready, nothing paired" };
  if (stale) return { tag: "Needs recalculation", tone: "warn", sub: `${cases} cases · ${stale} outdated` };
  return { tag: "Ready", tone: "ok", sub: `${cases} analysis cases` };
};

const anCell = (x) => {
  const st = anStatus(x);
  const dot = { sb: SB, rn: RN, ok: SU, warn: WARN.ink, n: "var(--s300)" }[st.tone];
  return `
  <span style="display:block">
    ${st.tone === "warn"
      ? staleTag(st.tag)
      : `<span class="cov"${st.tone === "ok" ? ` style="border-color:rgba(14,157,168,.3);background:linear-gradient(168deg,rgba(14,157,168,.1),rgba(14,157,168,.05));color:var(--su700)"` : ""}><i style="background:${dot}"></i>${st.tag}</span>`}
    <span class="t-meta" style="display:block;margin-top:5px">${st.sub}</span>
  </span>`;
};

const projectRow = ({ name, desc, country, tech, capacity, sb, rn, status, when, cases = 0, stale = 0 }) => `
<tr>
  <td><a href="#" class="anchor">${name}</a><div class="t-meta" style="margin-top:2px">${desc}</div></td>
  <td class="t-tbl">${country}</td>
  <td class="t-tbl">${tech}</td>
  <td class="t-tbl" style="white-space:nowrap">${capacity}</td>
  <td>${cov(sb, rn)}</td>
  <td>${anCell({ sb, rn, cases, stale })}</td>
  <td>${status}</td>
  <td class="t-meta num">${when}</td>
</tr>`;

const pager = (pages, note) => `
<div style="display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:20px">
  <span class="t-meta">${note}</span>
  <div style="display:flex;align-items:center;gap:6px">
    <button class="btn btn-ghost" style="height:34px;padding:0 11px;gap:6px">${ic("left", 15, 1.9)}Previous</button>
    ${pages.map((p, i) => i === 0
      ? `<a href="#" style="width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:#fff;background:${SB};box-shadow:0 6px 14px -8px rgba(37,99,235,.6)">${p}</a>`
      : `<a href="#" style="width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:500;color:var(--s500)">${p}</a>`).join("")}
    <button class="btn btn-ghost" style="height:34px;padding:0 11px;gap:6px">Next${ic("right", 15, 1.9)}</button>
  </div>
</div>`;

const projects = doc({
  w: 1440, h: 900, side: rootSide("projects"),
  body: `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><b>Projects</b>`,
  eyebrow: "24 Suite projects · 11 with both engineering and financial capabilities",
  title: "Projects",
  actions: `<button class="btn btn-secondary">${ic("filter", 16)}Filters</button>
            <button class="btn btn-primary">${ic("plus", 16, 1.9)}New project</button>`,
})}
<div style="display:flex;align-items:center;gap:14px;margin-bottom:18px">
  <div class="search" style="flex:1;max-width:340px">${ic("search", 16)}<span>Search projects…</span></div>
  <div class="tabs">
    <a href="#" class="on">All <span class="count">24</span></a>
    <a href="#">Both products <span class="count">11</span></a>
    <a href="#"><i style="width:5px;height:5px;border-radius:50%;background:${SB};display:block"></i>StoreBrid <span class="count">16</span></a>
    <a href="#"><i style="width:5px;height:5px;border-radius:50%;background:${RN};display:block"></i>ReveNew <span class="count">19</span></a>
  </div>
  <span style="margin-left:auto;display:flex;align-items:center;gap:7px" class="t-meta">${ic("clock", 14, 1.7)}Sorted by last activity</span>
</div>
<section class="panel lift" style="overflow:hidden">
  <table class="tbl">
    <thead><tr>
      <th style="width:20%">Project</th><th style="width:8%">Location</th><th style="width:11%">Technology</th>
      <th style="width:12%">Capacity</th><th style="width:15%">Capabilities</th>
      <th style="width:16%">Analysis</th><th style="width:10%">Status</th>
      <th style="width:8%;text-align:right">Last activity</th>
    </tr></thead>
    <tbody>
      ${projectRow({ name: "Valencia BESS", cases: 3, stale: 1, desc: "Merchant + PPA · COD 2027", country: "Spain", tech: "BESS", capacity: "100 MW / 200 MWh", sb: 1, rn: 1, status: ST.active, when: "2h ago" })}
      ${projectRow({ name: "Madrid Hybrid", cases: 2, stale: 1, desc: "PV + storage · COD 2027", country: "Spain", tech: "PV + BESS", capacity: "80 MW / 120 MWh", sb: 1, rn: 1, status: ST.active, when: "Yesterday" })}
      ${projectRow({ name: "Sevilla Storage", desc: "Stand-alone BESS · COD 2028", country: "Spain", tech: "BESS", capacity: "50 MW / 100 MWh", sb: 1, rn: 0, status: ST.active, when: "2d ago" })}
      ${projectRow({ name: "Porto PV", desc: "Merchant solar · COD 2027", country: "Portugal", tech: "PV", capacity: "45 MW", sb: 0, rn: 1, status: ST.active, when: "2d ago" })}
      ${projectRow({ name: "Helios II", desc: "Late-stage development", country: "Spain", tech: "PV", capacity: "45 MW", sb: 0, rn: 1, status: ST.development, when: "3d ago" })}
      ${projectRow({ name: "Almería BESS", cases: 4, desc: "Two-hour duration · COD 2028", country: "Spain", tech: "BESS", capacity: "60 MW / 120 MWh", sb: 1, rn: 1, status: ST.active, when: "4d ago" })}
      ${projectRow({ name: "Zaragoza Wind + BESS", desc: "Co-located wind · COD 2029", country: "Spain", tech: "Wind + BESS", capacity: "120 MW / 90 MWh", sb: 1, rn: 0, status: ST.development, when: "1w ago" })}
      ${projectRow({ name: "Lisboa Storage", desc: "Awaiting grid connection", country: "Portugal", tech: "BESS", capacity: "30 MW / 60 MWh", sb: 0, rn: 1, status: ST.draft, when: "2w ago" })}
    </tbody>
  </table>
</section>
${pager([1, 2, 3], "Showing 8 of 24 projects")}`,
});
writeFileSync("Projects.dc.html", projects);
console.log("Projects.dc.html", projects.length);

/* ═══════════════════════════════════════════════════════════════
   SCREEN 2 — Unified Project Overview · the flagship
   The two products are stacked as a sequence, not set side by side:
   what the asset DOES, then what that EARNS, joined by the one real
   dependency between them — capture price is production-weighted,
   so the dispatch schedule is what sets it.
   ═══════════════════════════════════════════════════════════════ */
const statList = (rows) => `
<div class="rows" style="min-width:0">
  ${rows.map(([label, value, unit]) => `
    <div style="display:flex;align-items:baseline;justify-content:space-between;gap:14px;padding:11px 0">
      <span style="font-size:12.5px;color:var(--s500)">${label}</span>
      <span style="font-size:15px;font-weight:600;color:var(--s900);white-space:nowrap;font-variant-numeric:tabular-nums">${value}${unit ? `<span style="font-size:11px;font-weight:500;color:var(--s400);margin-left:3px">${unit}</span>` : ""}</span>
    </div>`).join("")}
</div>`;

const perfBand = ({ band, label, sub, source, chart, legendItems, stats, tone, context, actions, popover }) => `
<div style="display:flex;align-items:flex-start;gap:32px;padding:20px 22px;border-radius:var(--r-sm);
     background:linear-gradient(168deg,${tone === "rv" ? "rgba(175,71,178,.05)" : "rgba(37,99,235,.05)"},rgba(255,255,255,0) 62%)">
  <div style="flex:1.95;min-width:0">
    <div class="band" style="color:${tone === "rv" ? "var(--rv600)" : "var(--b700)"}">${band}</div>
    <div style="display:flex;align-items:center;gap:10px;margin-top:8px">
      <h3 class="t-card" style="font-size:17px">${label}</h3>${source}
      ${context ? `<span class="cov" style="margin-left:2px">${context}</span>` : ""}
    </div>
    <p class="t-meta" style="margin-top:5px;font-size:12px">${sub}</p>
    <div style="margin-top:14px">${legend(legendItems)}</div>
    <div style="margin-top:6px">${chart}</div>
  </div>
  <div style="flex:1;min-width:0;padding-top:26px">
    ${statList(stats)}
    ${actions ? `<div style="display:flex;gap:10px;margin-top:18px;flex-wrap:wrap">${actions}</div>` : ""}
    ${popover || ""}
  </div>
</div>`;

/* An open dropdown rendered in flow — always anchored to its button. */
const popover = ({ label, items, footer }) => `
<div class="raise" style="margin-top:12px;padding:14px 6px 8px;border-radius:var(--r-sm)">
  <div class="band" style="padding:0 12px 10px">${label}</div>
  ${items.map(({ name, meta, on }) => `
    <a href="#" style="display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:var(--r-xs);text-decoration:none;
       ${on ? "background:linear-gradient(168deg,rgba(255,255,255,.8),rgba(255,255,255,.56))" : ""}">
      <span style="width:15px;height:15px;flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;
            ${on ? "background:var(--su);color:#fff" : "box-shadow:inset 0 0 0 1.5px rgba(30,58,138,.2)"}">
        ${on ? `<span style="width:5px;height:5px;border-radius:50%;background:#fff;display:block"></span>` : ""}
      </span>
      <span style="flex:1;min-width:0">
        <span style="display:block;font-size:13px;font-weight:${on ? "600" : "500"};color:var(--s900)">${name}</span>
        <span style="display:block;font-size:11px;color:var(--s400);margin-top:2px">${meta}</span>
      </span>
    </a>`).join("")}
  <div class="hr" style="margin:8px 12px"></div>
  <a href="#" style="display:flex;align-items:center;gap:6px;padding:8px 12px 4px;font-size:12.5px;font-weight:500">${footer}</a>
</div>`;

/* ═══════════════════════════════════════════════════════════════
   OVERVIEW — the decision dashboard, and the Suite's main surface
   Everything the user needs before deciding is here: the current
   pairing, what it does technically, what it earns, what the two
   produce together, and which alternatives exist. Detail opens in
   place; modelling opens in the product that owns it.
   ═══════════════════════════════════════════════════════════════ */

/* one chart, one question: does buying more storage improve the return? */
/* What each analysis case costs to build and what it returns, on one
   euro axis. Three items do not make a scatter — they make three rows,
   and rows are read in a glance. The right-hand figure does the
   comparison the eye cannot: value created per euro invested. */
/* §5, §50 · The hero of Overview: what each case costs against what it
   returns, which is the one reading neither product can produce alone.

   Three points do not make a scatter on their own — that objection stood
   in an earlier iteration and it was right. What makes position mean
   something here is the reference: a dashed ray through the origin at the
   current case's NPV-per-euro. Above the ray, capital works harder than
   it does today; below it, the extra euro buys less. The question §5
   actually asks — "does additional CAPEX create proportional value" — is
   answered by which side of that line a point falls on, not by reading
   two numbers and dividing them in your head.

   Point area encodes storage capacity, the technical dimension that
   drives CAPEX, so the eye can see cost rising with the asset.          */
function investValue(w = 1240) {
  const rows = ACASES.map((a) => ({ a, ...acMetrics(a), stale: isStale(a.tid, a.sid) }));
  const cur = rows.find((r) => r.a.current) || rows[0];
  const ratio = cur.npv / cur.capex;
  const H = 396, L = 62, R = 250, TT = 26, B = 52;
  const pw = w - L - R, ph = H - TT - B;
  const xMax = Math.max(...rows.map((r) => r.capex)) * 1.16;
  const yMax = Math.max(...rows.map((r) => r.npv)) * 1.22;
  const X = (v) => L + (v / xMax) * pw;
  const Y = (v) => TT + ph - (v / yMax) * ph;
  const rOf = (mwh) => 11 + ((mwh - 200) / 200) * 8;

  const gx = niceTicks(0, xMax, 4).map((t) =>
    `<line x1="${X(t).toFixed(1)}" y1="${TT}" x2="${X(t).toFixed(1)}" y2="${TT + ph}" stroke="${GRID}" stroke-width="1"/>
     <text x="${X(t).toFixed(1)}" y="${TT + ph + 17}" text-anchor="middle" font-size="9.5" fill="${AXIS}">€${t.toFixed(0)}M</text>`).join("");
  const gy = niceTicks(0, yMax, 4).map((t) =>
    `<line x1="${L}" y1="${Y(t).toFixed(1)}" x2="${w - R}" y2="${Y(t).toFixed(1)}" stroke="${GRID}" stroke-width="1"/>
     <text x="${L - 9}" y="${(Y(t) + 3.4).toFixed(1)}" text-anchor="end" font-size="9.5" fill="${AXIS}">€${t.toFixed(0)}M</text>`).join("");

  /* the iso-efficiency ray: every point on it returns the same € per € */
  const rayEnd = Math.min(xMax, yMax / ratio);
  const ray = `
    <line x1="${X(0)}" y1="${Y(0)}" x2="${X(rayEnd).toFixed(1)}" y2="${Y(rayEnd * ratio).toFixed(1)}"
      stroke="${SU}" stroke-width="1.5" stroke-dasharray="5 4" opacity=".7"/>
    <text x="${X(rayEnd * 0.42).toFixed(1)}" y="${(Y(rayEnd * 0.42 * ratio) + 17).toFixed(1)}"
      font-size="10" font-weight="600" fill="var(--su700)" ${KO}>€${ratio.toFixed(2)} of NPV per € — the current rate</text>`;

  const marks = rows.map((r) => {
    const x = X(r.capex), y = Y(r.npv), rad = rOf(r.a.tid ? acCase(r.a).t.mwh : 200);
    const dens = r.npv / r.capex;
    const above = dens > ratio + 0.005, below = dens < ratio - 0.005;
    const isCur = r.a.current;
    const fill = r.stale ? FIELD : isCur ? SU : CMB;
    /* §41 · the current analysis is a ring, not just another colour */
    return `
    ${isCur ? `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(rad + 6).toFixed(1)}" fill="none" stroke="${SU}" stroke-width="1.6" stroke-dasharray="3 3"/>` : ""}
    <circle class="mk" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(1)}"
      fill="${fill}" fill-opacity="${r.stale ? ".24" : isCur ? ".3" : ".62"}" stroke="#fff" stroke-width="2.2">
      <title>${r.a.name} — €${r.capex.toFixed(1)}M CAPEX · ${eurMs(r.npv)} NPV · ${r.irr.toFixed(1)}% IRR · ${eurM(r.rev)} revenue${r.stale ? " · outdated" : ""}</title></circle>
    <text x="${(x + rad + 10).toFixed(1)}" y="${(y - 2).toFixed(1)}" font-size="11.5" font-weight="600" fill="${INK}" ${KO}>${r.a.name}</text>
    <text x="${(x + rad + 10).toFixed(1)}" y="${(y + 13).toFixed(1)}" font-size="10" fill="${AXIS}" ${KO}>€${dens.toFixed(2)} per € invested${
      r.stale ? " · outdated" : above ? " · above today's rate" : below ? " · below today's rate" : ""}</text>`;
  }).join("");

  return `
<svg viewBox="0 0 ${w} ${H}" width="100%" style="display:block" role="img"
  aria-label="CAPEX against NPV for each analysis case, with a reference line at the current case's return per euro invested">
  ${MKSTYLE}${gx}${gy}${ray}${marks}
  <text x="${L}" y="${H - 8}" font-size="10.5" fill="${AXIS}">CAPEX — what it costs to build · StoreBrid</text>
  <text transform="translate(15,${TT + ph / 2}) rotate(-90)" text-anchor="middle" font-size="10.5" fill="${AXIS}">NPV over ${HORIZON} years · ReveNew</text>
</svg>`;
}

function investReturn(w = 1240) {
  const rows = ACASES.map((a) => ({ a, ...acMetrics(a), stale: isStale(a.tid, a.sid) }));
  const cur = rows.find((r) => r.a.current) || rows[0];
  const curDens = cur.npv / cur.capex;
  const L = 168, R = 250, TT = 34, rowH = 62, gap = 16;
  const H = TT + rows.length * (rowH + gap);
  const pw = w - L - R;
  const max = Math.max(...rows.map((r) => r.capex)) * 1.04;
  const X = (v) => (v / max) * pw;
  const ticks = niceTicks(0, max, 4).filter((t) => t > 0);
  return `
<svg viewBox="0 0 ${w} ${H}" width="100%" style="display:block" role="img" aria-label="CAPEX and NPV for each analysis case">
  ${MKSTYLE}
  ${ticks.map((t) => `
    <line x1="${(L + X(t)).toFixed(1)}" y1="${TT - 12}" x2="${(L + X(t)).toFixed(1)}" y2="${H - 8}" stroke="${GRID}" stroke-width="1"/>
    <text x="${(L + X(t)).toFixed(1)}" y="${TT - 18}" text-anchor="middle" font-size="9.5" fill="${AXIS}">€${t}M</text>`).join("")}
  <line x1="${L}" y1="${TT - 12}" x2="${L}" y2="${H - 8}" stroke="rgba(30,58,138,.18)" stroke-width="1"/>
  ${rows.map((r, i) => {
    const y = TT + i * (rowH + gap);
    const dens = r.npv / r.capex;
    const better = dens > curDens + 0.004, worse = dens < curDens - 0.004;
    return `
    <text x="${L - 16}" y="${y + 17}" text-anchor="end" font-size="12" font-weight="600" fill="${INK}">${r.a.name}</text>
    <text x="${L - 16}" y="${y + 33}" text-anchor="end" font-size="9.5" fill="${AXIS}">${r.a.current ? "current analysis" : r.stale ? "outdated" : acCase(r.a).t.short}</text>

    <path class="mk" d="${bar(L, y, Math.max(X(r.capex), 2), 20, 3, true)}" fill="${SB}" fill-opacity="${r.stale ? ".28" : ".55"}">
      <title>${r.a.name} — €${r.capex.toFixed(1)}M invested</title></path>
    <text x="${(L + X(r.capex) + 10).toFixed(1)}" y="${y + 15}" font-size="11" font-weight="600" fill="${AXIS}">€${r.capex.toFixed(1)}M invested</text>

    <path class="mk" d="${bar(L, y + 26, Math.max(X(r.npv), 2), 20, 3, true)}" fill="${RN}" fill-opacity="${r.stale ? ".3" : ".8"}">
      <title>${r.a.name} — ${eurMs(r.npv)} of value created</title></path>
    <text x="${(L + X(r.npv) + 10).toFixed(1)}" y="${y + 41}" font-size="11.5" font-weight="700" fill="${r.stale ? AXIS : INK}">${eurMs(r.npv)} returned</text>

    <text x="${w - 14}" y="${y + 20}" text-anchor="end" font-size="17" font-weight="700" fill="${r.stale ? AXIS : INK}">€${dens.toFixed(2)}</text>
    <text x="${w - 14}" y="${y + 36}" text-anchor="end" font-size="9.5" fill="${better ? "#0E9469" : worse ? "#9A6208" : AXIS}">${
      r.a.current ? "of NPV per € invested" : better ? "per € — better than current" : worse ? "per € — worse than current" : "per € — same as current"}</text>`;
  }).join("")}
</svg>`;
}

/* §7 · Each block leads with the shape of the thing over its life and
   then quantifies it. The chart is not decoration under the numbers: it
   answers "how does this change?", which no row in the list can, while
   the rows keep answering "how much?". Both blocks draw a fifteen-year
   horizon so the two curves are read on the same clock. */
const perfBlock = ({ band, tone, source, title, chart, chartTitle, chartNote, rows, action }) => `
<section class="panel" style="flex:1;min-width:0;padding:24px 26px;display:flex;flex-direction:column">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
    <span class="band" style="color:${tone}">${band}</span>${source}
  </div>
  <h2 class="t-sec" style="margin-top:9px">${title}</h2>
  ${chart ? `
  <div style="margin-top:16px;padding:14px 16px 6px;border-radius:var(--r-xs);
       background:linear-gradient(168deg,rgba(255,255,255,.5),rgba(255,255,255,.24));box-shadow:inset 0 0 0 1px var(--hair)">
    <div style="display:flex;align-items:baseline;justify-content:space-between;gap:12px">
      <span style="font-size:12.5px;font-weight:600;color:var(--s700)">${chartTitle}</span>
      <span class="t-meta">${chartNote}</span>
    </div>
    <div style="margin-top:8px">${chart}</div>
  </div>` : ""}
  <div class="rows" style="margin-top:14px">
    ${rows.map(([k, v, note]) => `
      <div style="display:flex;align-items:baseline;justify-content:space-between;gap:14px;padding:12px 0">
        <span style="min-width:0">
          <span style="display:block;font-size:12.5px;color:var(--s500)">${k}</span>
          ${note ? `<span class="t-meta" style="display:block;margin-top:3px">${note}</span>` : ""}
        </span>
        <b style="font-size:16px;font-weight:600;color:var(--s900);white-space:nowrap;font-variant-numeric:tabular-nums">${v}</b>
      </div>`).join("")}
  </div>
  <div style="flex:1"></div>
  <button class="btn btn-secondary" style="width:100%;height:36px;font-size:12.5px;margin-top:16px">${action}</button>
</section>`;


/* ── EXPLORE — the simulations and financial cases, on the Overview
      itself. Browsing the alternatives is the step before choosing one,
      so it belongs where the choice is made, not behind a drawer. */
const optionCard = ({ name, on, meta, figs, when, dot, href }) => `
<a href="#" class="${on ? "glass-sm" : "wash"}" style="flex:1;min-width:0;padding:16px 18px;text-decoration:none;
   ${on ? "box-shadow:0 0 0 1px rgba(14,157,168,.32), var(--sh-md), inset 0 1px 0 rgba(255,255,255,.92)" : ""}">
  <span style="display:flex;align-items:center;gap:9px">
    <i style="width:6px;height:6px;flex:none;border-radius:50%;background:${dot};display:block"></i>
    <span style="font-size:13.5px;font-weight:600;color:var(--s900);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${name}</span>
    ${on ? `<span class="cov" style="flex:none;margin-left:auto"><i style="background:${SU}"></i>In use</span>` : ""}
  </span>
  <span class="t-meta" style="display:block;margin-top:6px">${meta}</span>
  <span style="display:flex;gap:18px;margin-top:12px;padding-top:12px;border-top:1px solid var(--hair)">
    ${figs.map(([v, k]) => `<span style="flex:1;min-width:0">
      <span style="display:block;font-size:14px;font-weight:600;color:var(--s900);font-variant-numeric:tabular-nums">${v}</span>
      <span class="t-meta" style="display:block;margin-top:2px">${k}</span></span>`).join("")}
  </span>
  <span style="display:flex;align-items:center;gap:8px;margin-top:12px">
    <span class="t-meta">${when}</span>
    <span style="flex:1"></span>
    <span style="font-size:12px;font-weight:500;color:${on ? "var(--s400)" : "var(--b700)"}">${on ? "Current" : "Use this"}</span>
  </span>
</a>`;

const exploreStrip = ({ label, tone, items, href, count }) => `
<div style="flex:1;min-width:0">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
    <span class="band" style="color:${tone};font-size:10px">${label}</span>
    <span class="t-meta">${count} in this project</span>
    <span style="flex:1"></span>
    <a href="#" style="font-size:12px;font-weight:500">${href}</a>
  </div>
  <div class="rows">
    ${items.map(({ name, meta, fig, on, dot }) => `
      <a href="#" style="display:flex;align-items:center;gap:12px;padding:11px 0;text-decoration:none">
        <i style="width:6px;height:6px;flex:none;border-radius:50%;background:${dot};display:block"></i>
        <span style="flex:1;min-width:0">
          <span style="display:flex;align-items:center;gap:8px">
            <span style="font-size:13px;font-weight:${on ? "600" : "500"};color:var(--s900);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${name}</span>
            ${on ? `<span class="cov" style="flex:none"><i style="background:${SU}"></i>In use</span>` : ""}
          </span>
          <span class="t-meta" style="display:block;margin-top:3px">${meta}</span>
        </span>
        <b style="flex:none;font-size:14px;font-weight:600;color:var(--s900);font-variant-numeric:tabular-nums">${fig}</b>
      </a>`).join("")}
  </div>
</div>`;

const exploreBlock = () => `
${sec({ label: "Explore alternatives", source: src("suite"),
        sub: "What this project already has on each side. Choosing one changes the current analysis — nothing is modelled here.",
        right: `<button class="btn btn-secondary" style="height:34px;font-size:12.5px">${ic("plus", 15, 1.9)}Create analysis case</button>` })}
<section class="panel" style="padding:22px 26px;display:flex;gap:40px">
  ${exploreStrip({ label: "Technical simulations", tone: "var(--b700)", count: TECH.length, href: "Change simulation →",
    items: TECH.map((t) => ({ name: t.name, on: t.id === "base2h", dot: SB,
      meta: `${t.mwh} MWh · ${t.dur.toFixed(1)} h · ${t.cycles} cycles/yr`, fig: t.gwh + " GWh" })) })}
  <span style="width:1px;background:var(--hair);flex:none"></span>
  ${exploreStrip({ label: "Financial cases", tone: "var(--rv600)", count: SCEN.length, href: "Change financial case →",
    items: SCEN.map((sc) => {
      const c = caseOf("base2h", sc.id);
      return { name: sc.name, on: sc.id === "base", dot: RN,
        meta: `Capture €${sc.capture.toFixed(1)}/MWh · ${c.irr.toFixed(1)}% IRR`, fig: eurMs(npvOfCase(c)) };
    }) })}
</section>`;

const overviewBody = ({ drawer, stale } = {}) => {
  const a = AC("base"), m = acMetrics(a), c = m.c;
  return `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Projects</a><span class="sep">${ic("right", 12, 2)}</span><b>Valencia BESS</b>`,
  eyebrow: "Project",
  title: "Valencia BESS",
  meta: `<span style="display:inline-flex;align-items:center;gap:12px;flex-wrap:wrap">
           <span>Spain · Stand-alone BESS · 100 MW / 200 MWh · COD 2027</span>${ST.active}</span>`,
  actions: `<button class="btn btn-secondary">${ic("sliders", 16)}Project details</button>
            <button class="btn btn-primary">${ic("analytics", 16)}Compare</button>`,
})}

${stale ? staleNotice({
  title: "Financial results may be outdated",
  body: "Base case 2027 was re-run 12 minutes ago; Base market was last calculated 4 hours ago. The figures below still show the earlier calculation.",
  cta: "Recalculate in ReveNew" }) : ""}

<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap">
  <span class="band">Current analysis</span>
  <span class="t-meta">The pairing every figure on this page is read from.</span>
</div>
<section class="panel lift combined" style="padding:22px 26px;border:1px solid rgba(255,255,255,.9)">
  <div style="display:flex;align-items:center;gap:24px">
    <span style="flex:none;min-width:124px">
      <span class="band" style="font-size:10px">Analysis case</span>
      <span style="display:block;font-size:17px;font-weight:700;color:var(--s900);margin-top:7px">${a.name}</span>
      <a href="#" style="display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:500;margin-top:6px">Switch${ic("down", 13, 1.9)}</a>
    </span>
    <span style="width:1px;align-self:stretch;background:var(--hair);flex:none"></span>
    <span style="flex:1;min-width:0">
      <span class="band" style="font-size:10px">Technical simulation</span>
      <span style="display:flex;align-items:center;gap:9px;margin-top:7px">
        <i style="width:6px;height:6px;flex:none;border-radius:50%;background:${SB};display:block"></i>
        <span style="font-size:15px;font-weight:600;color:var(--s900)">${c.t.name}</span>
      </span>
      <span class="t-meta" style="display:block;margin-top:5px">${c.t.mw} MW / ${c.t.mwh} MWh · ${c.t.dur.toFixed(1)} h · ${c.t.gwh} GWh/yr</span>
      <button class="btn btn-secondary" style="height:30px;font-size:12px;margin-top:10px">Change simulation${ic("down", 13, 1.8)}</button>
    </span>
    <span style="flex:1;min-width:0">
      <span class="band" style="font-size:10px">Financial case</span>
      <span style="display:flex;align-items:center;gap:9px;margin-top:7px">
        <i style="width:6px;height:6px;flex:none;border-radius:50%;background:${RN};display:block"></i>
        <span style="font-size:15px;font-weight:600;color:var(--s900)">${c.sc.name}</span>
      </span>
      <span class="t-meta" style="display:block;margin-top:5px">Capture €${c.sc.capture.toFixed(1)}/MWh · ${eurM(c.rev)}/yr</span>
      <button class="btn btn-secondary" style="height:30px;font-size:12px;margin-top:10px">Change financial case${ic("down", 13, 1.8)}</button>
    </span>
    <span style="width:1px;align-self:stretch;background:var(--hair);flex:none"></span>
    <span style="flex:none;text-align:right;min-width:112px">
      <span class="band" style="font-size:10px">Result</span>
      <span style="display:block;font-size:27px;font-weight:700;letter-spacing:-.026em;color:var(--s900);margin-top:6px;font-variant-numeric:tabular-nums">${eurMs(m.npv)}</span>
      <span class="t-meta" style="display:block;margin-top:5px">NPV · ${m.irr.toFixed(1)}% IRR</span>
    </span>
  </div>
  <div style="display:flex;align-items:center;gap:10px;margin-top:16px;padding-top:14px;border-top:1px solid var(--hair)">
    <span class="t-meta" style="flex:1;min-width:0">
      Technical data · StoreBrid, updated 2h ago &nbsp;·&nbsp; Financial data · ReveNew, updated 4h ago &nbsp;·&nbsp; in step
    </span>
    ${src("combined")}
  </div>
</section>

${(() => {
  /* §5 · Level 1 of the page: what this pairing MEANS, in one deterministic
     sentence, before the two performance blocks give the evidence. Every
     figure is derived, so the sentence cannot drift from the cards below.
     Deliberately not a KPI row — NPV, IRR, GWh and utilisation all appear
     within 300px of here, and restating them is the repetition §17 warns
     against. What is missing between the pairing and the evidence is the
     reading, not more numbers. */
  const perEur = m.npv / m.capex;
  return `
${/* §31 · Two tinted strips used to stack here, the same weight and the
      same treatment, saying two different things. One surface, two rows:
      what this pairing produces, and where it sits among the alternatives —
      which are exactly the two questions this page answers. */""}
<div style="margin-top:14px;padding:15px 20px;border-radius:var(--r-xs);
     background:linear-gradient(168deg,rgba(14,157,168,.055),rgba(255,255,255,0) 78%);
     box-shadow:inset 0 0 0 1px rgba(14,157,168,.13)">
<div style="display:flex;align-items:center;gap:20px">
  <span class="band" style="flex:none;color:var(--su700)">Reading</span>
  <span style="flex:1;min-width:0;font-size:13px;color:var(--s700);line-height:1.6">
    This configuration turns <b style="font-weight:600;color:var(--s900)">€${m.capex.toFixed(1)}M</b> of CAPEX costed in StoreBrid into
    <b style="font-weight:600;color:var(--s900)">${eurMs(m.npv)}</b> of NPV modelled in ReveNew, while discharging
    <b style="font-weight:600;color:var(--s900)">${c.t.gwh} GWh</b> a year — <b style="font-weight:600;color:var(--s900)">€${perEur.toFixed(2)}</b> of NPV per euro invested.
  </span>
  <a href="#" style="flex:none;font-size:12.5px;font-weight:500;white-space:nowrap">Explain${ic("right", 12, 2)}</a>
</div>
${(() => {
  /* §13-§14 · The loop back into the Suite's own capability. Both lines are
     counted from combinations that already exist, so neither is a
     recommendation: one says how many pairings currently beat the case on
     screen, the other whether the case clears the constraints the user set.
     Naming a winner would be the Suite deciding; counting is the Suite
     reporting. */
  const beats = ALLCOMBOS().filter((z) => !isStale(z.t.id, z.sc.id) && z.irr > c.irr).length;
  const f = CRITERIA.length ? failsOf(c) : [];
  if (!beats && !f.length) return "";
  return `
<div style="display:flex;align-items:center;gap:12px;margin-top:13px;padding-top:12px;border-top:1px solid rgba(14,157,168,.14)">
  <span style="color:var(--s400);display:flex;flex:none">${ic("layers", 15)}</span>
  <span style="flex:1;min-width:0;font-size:12.5px;color:var(--s700);line-height:1.55">
    ${f.length
      ? `This case is <b style="font-weight:600;color:var(--s900)">outside the active criteria</b> — ${f[0].k.label} ${f[0].k.fmt(Math.abs(f[0].by)).replace("−", "")} ${f[0].k.op === "≤" ? "above the limit" : "below target"}.`
      : ""}
    ${beats ? `<b style="font-weight:600;color:var(--s900)">${beats} of the ${TECH.length * SCEN.length} combinations</b> currently exceed it on IRR.` : ""}
  </span>
  <a href="#" style="flex:none;font-size:12.5px;font-weight:500;white-space:nowrap">Explore alternatives${ic("right", 12, 2)}</a>
</div>`;
})()}
</div>`;
})()}

${/* §15 · Investment against value is the Suite's OWN reading — cost from
      one product against value from the other — so it comes before the two
      single-product blocks that support it, not after them. The page now
      runs: what is paired -> what it produces -> where it sits among the
      alternatives -> what each side contributes. */""}
<section class="panel lift" style="padding:24px 26px;margin-top:24px">
  <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:24px">
    <div style="flex:1;min-width:0">
      <div style="display:flex;align-items:center;gap:9px"><span class="band">What the combination produces</span>${src("combined")}</div>
      <h2 class="t-sec" style="margin-top:9px">Investment against value</h2>
      <p class="t-meta" style="margin-top:7px;font-size:12px;line-height:1.6;max-width:96ch">
        Cost from StoreBrid, value from ReveNew. The dashed line is the rate the current analysis returns today — above it, capital works harder; below it, the extra euro buys less.
      </p>
    </div>
    <div style="display:flex;gap:30px;flex:none">
      ${[["Revenue / MWh discharged", "€" + c.perMwh.toFixed(1)],
         ["CAPEX / MW installed", "€" + Math.round((m.capex * 1e6) / c.t.mw / 1000) + "k"],
         ["NPV / MW installed", "€" + Math.round((m.npv * 1e6) / c.t.mw / 1000) + "k"]].map(([k, v]) => `
        <span style="min-width:0">
          <span class="t-meta" style="display:block">${k}</span>
          <span style="display:block;font-size:19px;font-weight:700;letter-spacing:-.02em;color:var(--s900);margin-top:5px;font-variant-numeric:tabular-nums">${v}</span>
        </span>`).join("")}
    </div>
  </div>
  <div style="margin-top:18px">${investValue(1240)}</div>
  <div style="display:flex;align-items:center;gap:18px;padding-top:12px;border-top:1px solid var(--hair);flex-wrap:wrap">
    <span style="display:inline-flex;align-items:center;gap:7px">
      <span style="width:11px;height:11px;border-radius:50%;background:#fff;box-shadow:0 0 0 1.6px ${SU};display:block"></span>
      <span class="t-meta">Current analysis</span>
    </span>
    <span style="display:inline-flex;align-items:center;gap:7px">
      <svg width="26" height="10" aria-hidden="true"><circle cx="6" cy="5" r="4" fill="${CMB}" fill-opacity=".62"/><circle cx="19" cy="5" r="6" fill="${CMB}" fill-opacity=".62"/></svg>
      <span class="t-meta">Point size = storage capacity</span>${src("storebrid")}
    </span>
    <span style="flex:1"></span>
    <span class="t-meta">Position against the dashed line is the reading</span>${src("combined")}
  </div>
</section>

<div style="display:flex;gap:22px;margin-top:26px;align-items:stretch">
  ${perfBlock({ band: "Technical performance", tone: "var(--b700)", source: src("storebrid"),
    title: "What the asset does",
    chartTitle: "Effective capacity over life",
    chartNote: "2.1%/yr · StoreBrid",
    chart: degradation(520),
    rows: [["Installed power", c.t.mw + " MW", `${c.t.mwh} MWh · ${c.t.dur.toFixed(1)} h duration`],
           ["Energy discharged", c.t.gwh + " GWh/yr", `${c.t.cycles} full cycles`],
           ["Utilisation", c.t.util + "%"],
           ["Round-trip efficiency", c.t.rte + "%"],
           ["Capacity at year 15", "73%", "2.1%/yr degradation"]],
    action: `${ic("analytics", 15)}View technical details` })}
  ${perfBlock({ band: "Financial performance", tone: "var(--rv600)", source: src("revenew"),
    title: "What it earns",
    chartTitle: "Cumulative cash flow",
    chartNote: `crosses zero after ${m.pb.toFixed(1)} yrs · ReveNew`,
    chart: projCash(c, 520),
    rows: [["NPV", eurMs(m.npv), `at ${(WACC * 100).toFixed(1)}% cost of capital`],
           /* §23 · IRR and payback need both sides — ReveNew cash flows against
              StoreBrid CAPEX — so they carry Combined here too, even sitting
              inside the financial block. A metric cannot be ReveNew on one
              screen and Combined on another. */
           ["IRR", m.irr.toFixed(1) + "%", `<span style="display:inline-flex;align-items:center;gap:6px">${src("combined")}ReveNew cash flows against StoreBrid CAPEX</span>`],
           ["CAPEX", "€" + m.capex.toFixed(1) + "M", `<span style="display:inline-flex;align-items:center;gap:6px">${src("storebrid")}costed in StoreBrid, consumed by the financial model</span>`],
           ["Revenue", eurM(m.rev) + "/yr", `capture €${c.sc.capture.toFixed(1)}/MWh`],
           ["Payback", m.pb.toFixed(1) + " years", `<span style="display:inline-flex;align-items:center;gap:6px">${src("combined")}undiscounted, from COD</span>`]],
    action: `${ic("euro", 15)}View financial breakdown` })}
</div>

${exploreBlock()}

${sec({ label: "Saved analysis cases", source: src("suite"),
        sub: "Named pairings of a technical simulation and a financial case. Nothing is modelled here — each one reads from both products.",
        right: `<span style="display:flex;gap:10px">
                  <button class="btn btn-secondary" style="height:34px;font-size:12.5px">${ic("plus", 15, 1.9)}Create analysis case</button>
                  <button class="btn btn-primary" style="height:34px;font-size:12.5px">${ic("analytics", 15)}Compare all</button>
                </span>` })}
<section class="panel" style="overflow:hidden">
  <table class="tbl">
    <thead><tr>
      <th style="width:23%">Analysis case</th><th style="width:22%">Technical simulation</th><th style="width:18%">Financial case</th>
      <th style="width:12%;text-align:right">CAPEX</th><th style="width:12%;text-align:right">NPV</th>
      <th style="width:9%;text-align:right">IRR</th><th style="width:4%"></th>
    </tr></thead>
    <tbody>
      ${ACASES.map((x) => {
        const k = acMetrics(x);
        return `
        <tr>
          <td>
            <span style="display:flex;align-items:center;gap:9px">
              <span class="anchor" style="font-size:14px;font-weight:500">${x.name}</span>
              ${x.current ? `<span class="cov"><i style="background:${SU}"></i>Current</span>` : ""}
            </span>
          </td>
          <td class="t-tbl"><span style="display:inline-flex;align-items:center;gap:7px"><i style="width:4px;height:4px;border-radius:50%;background:${SB};display:block"></i>${k.c.t.short}</span></td>
          <td class="t-tbl"><span style="display:inline-flex;align-items:center;gap:7px"><i style="width:4px;height:4px;border-radius:50%;background:${RN};display:block"></i>${k.c.sc.name}</span></td>
          <td class="t-tbl num">€${k.capex.toFixed(1)}M</td>
          <td class="num"><b style="font-size:14px;font-weight:600;color:var(--s900)">${eurMs(k.npv)}</b></td>
          <td class="t-tbl num">${k.irr.toFixed(1)}%</td>
          <td style="text-align:right;color:var(--s400)">${ic("right", 15, 2)}</td>
        </tr>`;
      }).join("")}
    </tbody>
  </table>
</section>
<p class="t-meta" style="margin-top:14px;line-height:1.6;max-width:112ch">
  Long duration · strong market produces the highest NPV on €8.6M more CAPEX. Compare puts the technical change beside the financial one.
  Changing a simulation or a financial model happens in StoreBrid or ReveNew — the Suite reads the result.
</p>`;
};

/* Picking a simulation or a financial case is a selection, not a
   destination: a drawer over the page you are already reading. */
const pickDrawer = ({ kind }) => {
  const tech = kind === "tech";
  const items = tech
    ? TECH.map((t) => ({ name: t.name, on: t.id === "base2h",
        meta: `${t.mw} MW / ${t.mwh} MWh · ${t.dur.toFixed(1)} h · ${t.rte}% RTE`,
        figs: [[t.gwh + " GWh", "discharged"], [String(t.cycles), "cycles/yr"], ["€" + t.capex.toFixed(1) + "M", "CAPEX"]],
        when: "StoreBrid · " + t.when }))
    : SCEN.map((sc) => {
        const c = caseOf("base2h", sc.id);
        return { name: sc.name, on: sc.id === "base",
          meta: `Capture €${sc.capture.toFixed(1)}/MWh · ${eurM(c.rev)}/yr`,
          figs: [[eurMs(npvOfCase(c)), "NPV"], [c.irr.toFixed(1) + "%", "IRR"], [paybackOfCase(c).toFixed(1) + "y", "payback"]],
          when: "ReveNew · " + sc.when.toLowerCase() };
      });
  /* Three options side by side rather than stacked: the choice is a
     comparison, and a comparison wants the candidates on one line.
     The drawer could only ever show them one under another. */
  return capabilityModal({
    title: tech ? "Change technical simulation" : "Change financial case",
    context: "Base case · Valencia BESS", source: src(tech ? "storebrid" : "revenew"),
    accent: tech ? SB : RN, width: 940,
    footNote: tech ? "Creating or editing a simulation happens in StoreBrid."
                   : "Building or editing a financial case happens in ReveNew.",
    foot: `<button class="btn btn-secondary"><i style="width:6px;height:6px;border-radius:50%;background:${tech ? SB : RN};display:block"></i>Open in ${tech ? "StoreBrid" : "ReveNew"}${ic("upRight", 14, 1.8)}</button>`,
    body: `
    <div style="display:flex;gap:14px;padding:20px 22px">
      ${items.map((it) => `
      <a href="#" class="${it.on ? "glass-sm" : "wash"}" style="flex:1;min-width:0;display:block;padding:16px 18px;text-decoration:none;
         ${it.on ? `box-shadow:0 0 0 1.5px ${tech ? SB : RN}59, var(--sh-sm), inset 0 1px 0 rgba(255,255,255,.92)` : ""}">
        <span style="display:flex;align-items:flex-start;gap:9px;min-height:38px">
          <span style="flex:1;min-width:0;font-size:13.5px;font-weight:600;color:var(--s900);line-height:1.35">${it.name}</span>
          ${it.on ? `<span class="cov" style="flex:none"><i style="background:${SU}"></i>In use</span>` : ""}
        </span>
        <span class="t-meta" style="display:block;margin-top:6px">${it.meta}</span>
        <span class="t-meta" style="display:block;margin-top:3px">${it.when}</span>
        <span style="display:block;margin-top:13px;padding-top:12px;border-top:1px solid var(--hair)">
          ${it.figs.map(([v, k], i) => `<span style="display:flex;align-items:baseline;justify-content:space-between;gap:12px;${i ? "margin-top:7px" : ""}">
            <span class="t-meta">${k}</span>
            <span style="font-size:14px;font-weight:600;color:var(--s900);font-variant-numeric:tabular-nums">${v}</span></span>`).join("")}
        </span>
      </a>`).join("")}
    </div>`,
  });
};

/* Label/value groups. In the drawer these stacked into one long
   column; centred, they sit side by side as cards, which is both
   shorter and easier to scan across. */
const detailGroup = (label, rows) => `
<div class="wash" style="flex:1;min-width:0;padding:15px 17px">
  <div class="band" style="font-size:10px">${label}</div>
  <div style="margin-top:11px">
    ${rows.map(([k, v], i) => `
      <div style="display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:6px 0;${i ? "border-top:1px solid var(--hair)" : ""}">
        <span style="font-size:12px;color:var(--s500)">${k}</span>
        <b style="font-size:13px;font-weight:600;color:var(--s900);font-variant-numeric:tabular-nums;text-align:right">${v}</b>
      </div>`).join("")}
  </div>
</div>`;

/* the technical counterpart of the financial breakdown: StoreBrid's
   detail, one level down, read-only */
const techDrawer = () => {
  const t = T("base2h");
  return capabilityModal({
    title: "Technical details", context: `${t.name} · hourly · 15-year horizon`,
    source: src("storebrid"), accent: SB, width: 940,
    footNote: "Read-only. Daily graphs, heat maps and exports are in StoreBrid.",
    foot: `<button class="btn btn-secondary"><i style="width:6px;height:6px;border-radius:50%;background:${SB};display:block"></i>Open in StoreBrid${ic("upRight", 14, 1.8)}</button>`,
    body: `
    <div style="padding:20px 22px">
      <div style="display:flex;gap:14px;align-items:stretch">
        ${detailGroup("Configuration", [["Installed power", t.mw + " MW"], ["Storage capacity", t.mwh + " MWh"], ["Duration", t.dur.toFixed(1) + " h"],
                                        ["Round-trip efficiency", t.rte + "%"], ["Max export power", t.mw + " MW"]])}
        ${detailGroup("Operation", [["Energy discharged", t.gwh + " GWh/yr"], ["Full cycles", String(t.cycles)], ["Utilisation", t.util + "%"], ["Peak discharge", "70 MW"]])}
        ${detailGroup("Degradation", [["Capacity at year 15", "73%"], ["Annual degradation", "2.1%/yr"], ["80% threshold", "year 10.5"]])}
      </div>
      <div style="margin-top:18px;padding-top:16px;border-top:1px solid var(--hair)">
        <div class="band" style="font-size:10px">Power and state of charge</div>
        <div style="margin-top:12px">${dispatchChart(880)}</div>
      </div>
    </div>`,
  });
};

const field = (label, value, { unit, chev, help, req, placeholder } = {}) => `
<div style="flex:1;min-width:0">
  <span style="display:block;font-size:12px;font-weight:600;color:var(--s700);margin-bottom:7px">
    ${label}${req ? `<span style="color:var(--rv600);margin-left:3px">*</span>` : ""}
  </span>
  <div style="display:flex;align-items:center;height:40px;padding:0 13px;gap:9px;border-radius:var(--r-xs);font-size:13.5px;color:var(--s900);
       background:linear-gradient(168deg,rgba(255,255,255,.66),rgba(255,255,255,.46));border:1px solid rgba(255,255,255,.88);
       box-shadow:0 0 0 1px rgba(14,157,168,.09), inset 0 1px 0 rgba(255,255,255,.92)">
    <span style="flex:1;min-width:0;${placeholder ? "color:var(--s400)" : ""};font-variant-numeric:tabular-nums">${value}</span>
    ${unit ? `<span style="padding-left:10px;border-left:1px solid var(--hair);color:var(--s400);font-size:11.5px;align-self:stretch;display:flex;align-items:center">${unit}</span>` : ""}
    ${chev ? `<span style="color:var(--s400);display:flex">${ic("down", 15, 1.8)}</span>` : ""}
  </div>
  <span style="display:block;font-size:11px;color:var(--s400);margin-top:7px;min-height:15px;line-height:1.4">${help || ""}</span>
</div>`;

function siteMap({ lon = -5.9845, lat = 37.3891, name = "Sevilla" } = {}) {
  const X = (lon) => ((lon + 10) / 14) * 400;
  const Y = (lat) => ((44 - lat) / 8) * 300;
  const coast = [[-9.3,42.9],[-8.4,43.4],[-5.7,43.5],[-3.8,43.5],[-3.0,43.4],[-1.6,43.5],[3.0,42.7],
                 [2.2,41.4],[-0.4,39.5],[-1.0,37.6],[-2.5,36.8],[-4.4,36.7],[-5.6,36.0],[-6.9,37.2],
                 [-9.0,37.0],[-9.1,38.7],[-8.6,41.1]];
  const land = coast.map(([lo, la], i) => `${i ? "L" : "M"}${X(lo).toFixed(1)} ${Y(la).toFixed(1)}`).join("") + "Z";
  const grat = [];
  for (let lo = -8; lo <= 2; lo += 2) grat.push(`<line x1="${X(lo).toFixed(1)}" y1="0" x2="${X(lo).toFixed(1)}" y2="300" stroke="rgba(14,157,168,.13)" stroke-width="1"/>`);
  for (let la = 38; la <= 43; la += 2) grat.push(`<line x1="0" y1="${Y(la).toFixed(1)}" x2="400" y2="${Y(la).toFixed(1)}" stroke="rgba(14,157,168,.13)" stroke-width="1"/>`);
  const mx = X(lon), my = Y(lat);
  return `
<svg viewBox="0 0 400 300" width="100%" style="display:block" role="img" aria-label="Project location, ${Math.abs(lat).toFixed(4)} ${lat >= 0 ? "north" : "south"}, ${Math.abs(lon).toFixed(4)} ${lon >= 0 ? "east" : "west"}, near ${name}, Spain">
  <defs>
    <linearGradient id="sea" x1="0" y1="0" x2="0" y2="300" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#DCEFF2"/><stop offset="1" stop-color="#E8F3F6"/>
    </linearGradient>
    <linearGradient id="soil" x1="40" y1="20" x2="360" y2="290" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#FBFDFD"/><stop offset="1" stop-color="#EEF5F6"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#sea)"/>
  ${grat.join("")}
  <path d="${land}" fill="url(#soil)" stroke="rgba(14,157,168,.42)" stroke-width="1.2" stroke-linejoin="round"/>
  <circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="19" fill="#0E9DA8" fill-opacity=".12"/>
  <circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="11" fill="#0E9DA8" fill-opacity=".2"/>
  <circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="5.5" fill="#0E9DA8" stroke="#fff" stroke-width="2.2"/>
  <text x="${(mx + 14).toFixed(1)}" y="${(my + 4).toFixed(1)}" font-size="11" font-weight="600" fill="#0F172A">${name}</text>
  <text x="12" y="290" font-size="8.5" fill="rgba(15,23,42,.34)">Schematic · coordinates are authoritative</text>
</svg>`;
}

/* The form and the map were stacked in a 520px column, which made the
   map a postage stamp under six fields. Centred, the two halves sit
   beside each other: the values on the left, where they are read, and
   the place they describe on the right, at a size worth drawing. */
const detailsDrawer = () => capabilityModal({
  title: "Edit project details", context: "Valencia BESS", source: src("suite"),
  accent: SU, width: 900,
  footNote: "Shared across the Suite — both products read these values.",
  cancel: "Cancel", confirm: "Save changes",
  body: `
  <div style="display:flex;gap:22px;padding:22px">
    <div style="flex:1.15;min-width:0">
      <div class="band" style="color:var(--su700)">Project details</div>
      <div style="display:flex;gap:16px;margin-top:14px">
        ${field("Project name", "Valencia BESS", { req: true })}
        ${field("Technology", "Stand-alone BESS", { req: true, chev: true })}
      </div>
      <div style="display:flex;gap:16px">
        ${field("Installed power", "100", { unit: "MW" })}
        ${field("Storage capacity", "200", { unit: "MWh" })}
      </div>
      <div style="display:flex;gap:16px">
        ${field("Currency", "EUR — Euro", { req: true, chev: true })}
        ${field("Commercial operation date", "2027", { chev: true })}
      </div>
    </div>
    <div style="flex:1;min-width:0;display:flex;flex-direction:column">
      <div class="band" style="color:var(--su700)">Location</div>
      <div style="display:flex;gap:16px;margin-top:14px">
        ${field("Latitude", "39.4699", { req: true, unit: "°" })}
        ${field("Longitude", "−0.3763", { req: true, unit: "°" })}
      </div>
      <div style="border-radius:var(--r-sm);overflow:hidden;position:relative;
           border:1px solid rgba(255,255,255,.9);box-shadow:0 0 0 1px rgba(14,157,168,.12), var(--sh-sm)">
        ${/* El mapa dibujaba Sevilla bajo un formulario que dice Valencia. En un
             cajón de 520px casi no se veía; centrado y grande, el error es lo
             primero que se lee. */""}
        ${siteMap({ lon: -0.3763, lat: 39.4699, name: "Valencia" })}
        <div style="position:absolute;left:10px;bottom:10px;display:flex;align-items:center;gap:9px;padding:8px 12px;border-radius:9px;
             background:linear-gradient(168deg,rgba(255,255,255,.92),rgba(255,255,255,.76));
             border:1px solid rgba(255,255,255,.95);box-shadow:0 0 0 1px rgba(14,157,168,.1), var(--sh-xs)">
          <i style="width:6px;height:6px;border-radius:50%;background:var(--su);display:block"></i>
          <span style="font-size:12px;font-weight:600;color:var(--s900)">Valencia, Spain</span>
        </div>
      </div>
    </div>
  </div>`,
});


const OVB = { w: 1440, h: 2380, side: projectSide("overview") };
writeFileSync("ProjectOverview.dc.html", doc({ ...OVB, body: overviewBody() }));
writeFileSync("OverviewChangeSim.dc.html", doc({ ...OVB, focusSb: true, body: overviewBody(), overlay: pickDrawer({ kind: "tech" }) }));
writeFileSync("OverviewChangeScenario.dc.html", doc({ ...OVB, rvFocus: true, body: overviewBody(), overlay: pickDrawer({ kind: "fin" }) }));
writeFileSync("OverviewTechnical.dc.html", doc({ ...OVB, focusSb: true, body: overviewBody(), overlay: techDrawer() }));
writeFileSync("OverviewStale.dc.html", doc({ ...OVB, body: overviewBody({ stale: true }) }));
writeFileSync("EditProjectDetails.dc.html", doc({ ...OVB, body: overviewBody(), overlay: detailsDrawer() }));
console.log("Overview · decision dashboard + 4 states");

/* ═══════════════════════════════════════════════════════════════
   SCREEN 3 — Workspace · Engineering / Simulations
   The "Used by" pattern: what a completed run feeds downstream.
   Grounded in the real model — a ReveNew Revenue Case consumes
   production curves (`productionCurveIds`), so this dependency is
   the product's own, not a metaphor.
   ═══════════════════════════════════════════════════════════════ */
const consumer = ({ name, detail, source }) => `
<a href="#" class="glass-sm" style="padding:12px 15px;flex:1;min-width:0;display:flex;align-items:center;gap:12px;text-decoration:none">
  <span style="flex:1;min-width:0">
    <span style="display:block;font-size:13px;font-weight:500;color:var(--s900)">${name}</span>
    <span style="display:block;font-size:11px;color:var(--s400);margin-top:3px">${detail}</span>
  </span>
  ${source}<span style="color:var(--s400);display:flex;flex:none">${ic("right", 14, 1.8)}</span>
</a>`;

const usedBy = ({ subject, state, sub, consumers, action }) => `
<div class="band">Connected workflow</div>
<div style="display:flex;align-items:center;gap:26px;margin-top:14px">
  <div style="flex:none;min-width:0;width:230px">
    <div style="display:flex;align-items:center;gap:10px">
      <span class="t-card" style="font-size:15px">${subject}</span>${state}
    </div>
    <div class="t-meta" style="margin-top:5px">${sub}</div>
  </div>
  <span style="flex:none;display:flex;align-items:center;gap:7px;color:var(--s400);font-size:10.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase">
    Used by${ic("right", 13, 2.1)}
  </span>
  <div style="display:flex;gap:12px;flex:1;min-width:0">${consumers}</div>
  <button class="btn btn-secondary" style="flex:none">${action}${ic("upRight", 14, 1.8)}</button>
</div>`;

const simRow = ({ name, note, step, state, created }) => `
<tr>
  <td><a href="#" class="anchor">${name}</a><div class="t-meta" style="margin-top:2px">${note}</div></td>
  <td class="t-tbl">${step}</td>
  <td>${state}</td>
  <td class="t-tbl" style="white-space:nowrap">${created}</td>
  <td style="width:34px;text-align:right"><span style="color:var(--s400);display:inline-flex">${ic("right", 14, 1.8)}</span></td>
</tr>`;

const workspace = doc({
  w: 1440, h: 980, side: projectSide("simulations"), focusSb: true,
  body: `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Projects</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Valencia BESS</a><span class="sep">${ic("right", 12, 2)}</span><b>Engineering</b>`,
  eyebrow: `<span style="display:inline-flex;align-items:center;gap:9px">Engineering ${src("storebrid")}</span>`,
  title: "Simulations",
  meta: "12 simulations · Valencia BESS · last run 2 hours ago",
  actions: `<button class="btn btn-secondary">${ic("analytics", 16)}Compare simulations</button>
            <button class="btn btn-primary">${ic("plus", 16, 1.9)}New simulation</button>`,
})}


<div style="display:flex;align-items:center;gap:14px;margin-bottom:18px">
  <div class="search" style="flex:1;max-width:320px">${ic("search", 16)}<span>Search simulations…</span></div>
  <div class="tabs">
    <a href="#" class="on">All <span class="count">12</span></a>
    <a href="#">Completed <span class="count">7</span></a>
    <a href="#">Running <span class="count">3</span></a>
    <a href="#">Failed <span class="count">1</span></a>
  </div>
  <span style="margin-left:auto;display:flex;align-items:center;gap:7px" class="t-meta">${ic("clock", 14, 1.7)}Newest first</span>
</div>

<section class="panel lift" style="overflow:hidden">
  <table class="tbl">
    <thead><tr><th style="width:42%">Simulation</th><th style="width:14%">Time-step</th><th style="width:20%">State</th><th style="width:18%">Created</th><th></th></tr></thead>
    <tbody>
      ${simRow({ name: "Base case 2027", note: "2 h duration · merchant + PPA", step: "Hourly", state: SIMSTATE.completed, created: "21 Aug 2026" })}
      ${simRow({ name: "Base case 2027 — 4 h duration", note: "400 MWh · 4.0 h", step: "Hourly", state: SIMSTATE.running, created: "21 Aug 2026" })}
      ${simRow({ name: "2.2 h duration upgrade", note: "220 MWh · same POI", step: "Hourly", state: SIMSTATE.completed, created: "19 Aug 2026" })}
      ${simRow({ name: "aFRR co-optimisation", note: "Balancing + arbitrage", step: "15-min", state: SIMSTATE.progress, created: "19 Aug 2026" })}
      ${simRow({ name: "Degradation stress 15 yr", note: "Accelerated ageing curve", step: "Hourly", state: SIMSTATE.completed, created: "14 Aug 2026" })}
      ${simRow({ name: "Low RTE 85%", note: "85% round-trip", step: "Hourly", state: SIMSTATE.error, created: "12 Aug 2026" })}
      ${simRow({ name: "Grid constraint 80 MW", note: "Curtailed export limit", step: "Hourly", state: SIMSTATE.waiting, created: "11 Aug 2026" })}
      ${simRow({ name: "Baseline no PPA", note: "Full merchant exposure", step: "Hourly", state: SIMSTATE.completed, created: "8 Aug 2026" })}
    </tbody>
  </table>
</section>
${pager([1, 2], "Showing 8 of 12 simulations")}`,
});
console.log("Workspace.dc.html", workspace.length);

/* ═══════════════════════════════════════════════════════════════
   SCREEN 4 — Embedded cross-product workflow
   Suite owns the frame, focus, close, fallback and the post-save
   contract; ReveNew owns the body. The backdrop is a light neutral
   veil, not a blue flood — you are still inside the Suite.
   ═══════════════════════════════════════════════════════════════ */
const REVCSS = `
.rev{font-family:'DM Sans',system-ui,sans-serif;background:#fff;color:#0f172a}
.rev .lab{display:block;font-size:12px;font-weight:500;color:#475569;margin-bottom:6px}
.rev .fld{display:flex;align-items:center;height:36px;padding:0 11px;border:1px solid #e2e8f0;border-radius:6px;background:#fff;font-size:13px;color:#0f172a;gap:8px}
.rev .fld .unit{margin-left:auto;padding-left:9px;border-left:1px solid #e2e8f0;color:#94a3b8;font-size:12px;align-self:stretch;display:flex;align-items:center}
.rev .fld .chev{margin-left:auto;color:#94a3b8;display:flex}
.rev .help{display:block;font-size:11px;color:#94a3b8;margin-top:5px}
.rev .rbtn{display:inline-flex;align-items:center;justify-content:center;gap:7px;height:32px;padding:0 12px;border-radius:6px;font-size:13px;font-weight:500;font-family:inherit;border:1px solid transparent;cursor:pointer}
.rev .rbtn-sec{background:#fff;color:#0f172a;border-color:#e2e8f0}
.rev .rule{height:1px;background:#f1f5f9}
`;

function priceCurve() {
  const v = [78, 74, 66, 58, 52, 61, 79, 84, 72, 68, 76, 88];
  const M = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const W = 640, H = 286, L = 40, R = 10, T = 16, B = 26;
  const pw = W - L - R, ph = H - T - B, lo = 40, hi = 100;
  const x = (i) => L + (i / (v.length - 1)) * pw;
  const y = (val) => T + ph - ((val - lo) / (hi - lo)) * ph;
  const grids = [100, 80, 60, 40].map((g) =>
    `<line x1="${L}" y1="${y(g).toFixed(1)}" x2="${W - R}" y2="${y(g).toFixed(1)}" stroke="rgba(30,58,138,.07)" stroke-width="1"/>
     <text x="${L - 8}" y="${(y(g) + 3.4).toFixed(1)}" text-anchor="end" font-size="9.5" fill="#5F6C82">${g}</text>`).join("");
  const line = v.map((val, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(val).toFixed(1)}`).join("");
  const area = `${line}L${x(v.length - 1).toFixed(1)} ${(T + ph).toFixed(1)}L${L} ${(T + ph).toFixed(1)}Z`;
  const dots = v.map((val, i) =>
    `<circle cx="${x(i).toFixed(1)}" cy="${y(val).toFixed(1)}" r="4" fill="#fff" stroke="#AF47B2" stroke-width="2"><title>${M[i]} — €${val}/MWh</title></circle>`).join("");
  const labs = M.map((m, i) => `<text x="${x(i).toFixed(1)}" y="${H - 8}" text-anchor="middle" font-size="9.5" fill="#5F6C82">${m}</text>`).join("");
  return `
<svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block" role="img" aria-label="Monthly capture price curve in euros per megawatt hour">
  <defs><linearGradient id="pcf" x1="0" y1="${T}" x2="0" y2="${T + ph}" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#AF47B2" stop-opacity=".15"/><stop offset="1" stop-color="#AF47B2" stop-opacity="0"/>
  </linearGradient></defs>
  ${grids}<path d="${area}" fill="url(#pcf)"/>
  <path d="${line}" fill="none" stroke="#AF47B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  ${dots}${labs}
  <text x="${L - 8}" y="${T + 4}" text-anchor="end" font-size="9" fill="#5F6C82">€/MWh</text>
</svg>`;
}

const revField = (label, value, { unit, chev, help } = {}) => `
<div>
  <span class="lab">${label}</span>
  <div class="fld"><span>${value}</span>${unit ? `<span class="unit">${unit}</span>` : ""}${chev ? `<span class="chev">${ic("down", 15, 1.8)}</span>` : ""}</div>
  ${help ? `<span class="help">${help}</span>` : ""}
</div>`;
const curveModal = () => `
<div style="position:absolute;inset:0;z-index:10;backdrop-filter:blur(9px) saturate(.92);-webkit-backdrop-filter:blur(9px) saturate(.92);background:linear-gradient(168deg,rgba(238,242,249,.5),rgba(230,237,248,.46))"></div>
<div class="raise" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:1020px;z-index:11;overflow:hidden">
  <div style="display:flex;align-items:center;gap:16px;padding:15px 20px;border-bottom:1px solid var(--hair)">
    <div style="flex:1;min-width:0">
      <div class="t-card" style="font-size:16px">Edit forecast curve</div>
      <div style="display:flex;align-items:center;gap:10px;margin-top:4px">
        <span class="t-meta">Valencia BESS · Base market</span>${src("revenew")}
      </div>
    </div>
    <button class="btn btn-secondary" style="height:34px">Open in ReveNew${ic("upRight", 14, 1.8)}</button>
    <button class="btn btn-ghost btn-icon" style="height:34px;width:34px" aria-label="Close">${closeX()}</button>
  </div>
  <div class="rev" style="display:flex;align-items:stretch">
    <div style="width:286px;flex:none;padding:20px;border-right:1px solid #f1f5f9;display:flex;flex-direction:column;gap:15px">
      ${revField("Scenario", "Base market", { chev: true })}
      ${revField("Market", "Spain (ES)", { chev: true })}
      ${revField("Resolution", "Hourly", { chev: true })}
      ${revField("Annual escalation", "2.0", { unit: "%/yr", help: "Applied from 2027 onwards" })}
      <div class="rule" style="margin:3px 0"></div>
      <div style="font-size:11px;color:#94a3b8;line-height:1.6">8,760 points · shaped from the ES hourly profile.<br>Drag a monthly handle to reshape the curve.</div>
      <div style="flex:1"></div>
      <button class="rbtn rbtn-sec" style="width:100%">Reset to market shape</button>
    </div>
    <div style="flex:1;min-width:0;padding:18px 20px 12px">
      <div style="display:flex;align-items:baseline;justify-content:space-between;gap:12px">
        <div>
          <div style="font-size:14px;font-weight:600;color:#0f172a">Monthly capture price</div>
          <div style="font-size:11px;color:#94a3b8;margin-top:3px">Base market · unsaved changes</div>
        </div>
        <div style="display:flex;align-items:center;gap:7px">
          <i style="width:9px;height:9px;border-radius:3px;background:#AF47B2;display:block"></i>
          <span style="font-size:12px;font-weight:500;color:#64748b">Capture price</span>
        </div>
      </div>
      <div style="margin-top:10px">${priceCurve()}</div>
    </div>
  </div>
  <div style="display:flex;align-items:center;gap:16px;padding:14px 20px;border-top:1px solid var(--hair)">
    <span class="t-meta" style="flex:1;min-width:0;display:flex;align-items:center;gap:7px">
      ${ic("link", 14, 1.7)}Saving updates the revenue case and the financial model for Valencia BESS.
    </span>
    <button class="btn btn-secondary">Cancel</button>
    <button class="btn btn-primary">${ic("check", 16, 1.9)}Save changes</button>
  </div>
</div>`;

const inputItem = ({ label, value, source, action }) => `
<div style="flex:1;min-width:0;display:flex;align-items:center;gap:12px;padding:0 20px">
  <span style="flex:1;min-width:0">
    <span class="kpi-lab" style="display:block">${label}</span>
    <span style="display:block;font-size:15px;font-weight:600;color:var(--s900);margin-top:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${value}</span>
    <span style="display:block;margin-top:8px">${source}</span>
  </span>
  ${action ? `<button class="btn btn-secondary" style="height:32px;padding:0 12px;flex:none">${action}</button>` : ""}
</div>`;



/* ── the states screen 4 has to have (§32 of the source doc) ────── */
const skel = (w, h = 10) => `<span style="display:block;width:${w};height:${h}px;border-radius:${h / 2}px;background:rgba(30,58,138,.08)"></span>`;
const stateCol = ({ n, name, note, panel }) => `
<div style="flex:1;min-width:0;display:flex;flex-direction:column">
  <div style="display:flex;align-items:baseline;gap:9px">
    <span style="font-size:11px;font-weight:700;color:var(--blue700)">${n}</span>
    <span class="t-card" style="font-size:15px">${name}</span>
  </div>
  <p class="t-meta" style="margin:6px 0 14px;line-height:1.55;min-height:48px;font-size:12px">${note}</p>
  ${panel}
</div>`;
const modalChrome = (body, foot) => `
<div class="raise" style="overflow:hidden">
  <div style="display:flex;align-items:center;gap:12px;padding:13px 16px;border-bottom:1px solid var(--hair)">
    <div style="flex:1;min-width:0">
      <div class="t-card" style="font-size:14px">Edit forecast curve</div>
      <div style="display:flex;align-items:center;gap:9px;margin-top:3px"><span class="t-meta">Valencia BESS</span>${src("revenew")}</div>
    </div>
    <span style="color:var(--s400);display:flex;flex:none">${closeX(16)}</span>
  </div>
  ${body}
  ${foot ? `<div style="display:flex;align-items:center;gap:9px;padding:13px 16px;border-top:1px solid var(--hair)">${foot}</div>` : ""}
</div>`;

const embedStates = sheet({
  w: 1440, h: 580,
  body: `
<p style="margin:0 0 7px;color:var(--blue700);font-weight:600;letter-spacing:.08em;text-transform:uppercase;font-size:11px">Screen 4 · States</p>
<h1 class="t-page">When the other product is slow, broken, or done</h1>
<div style="display:flex;gap:26px;margin-top:24px;align-items:flex-start">
  ${stateCol({ n: "01", name: "Loading",
    note: "The Suite owns the frame from the first paint, so the modal never appears empty or jumps size while ReveNew loads.",
    panel: modalChrome(`
      <div style="padding:18px 16px;display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;gap:14px">
          <div style="width:96px;flex:none;display:flex;flex-direction:column;gap:9px">${skel("60%", 8)}${skel("100%", 30)}${skel("50%", 8)}${skel("100%", 30)}</div>
          <div style="flex:1;display:flex;flex-direction:column;gap:9px">${skel("45%", 8)}${skel("100%", 96)}</div>
        </div>
        <div style="display:flex;align-items:center;gap:9px;margin-top:2px">
          <span style="width:13px;height:13px;border-radius:50%;border:2px solid rgba(37,99,235,.18);border-top-color:${SB};display:block"></span>
          <span class="t-meta">Loading the forecast editor…</span>
        </div>
      </div>`) })}
  ${stateCol({ n: "02", name: "Didn’t load",
    note: "Never a dead end. The user is told what is safe — nothing changed — and offered the same work in ReveNew instead.",
    panel: modalChrome(`
      <div style="padding:26px 20px 22px;text-align:center">
        <span style="width:40px;height:40px;margin:0 auto;border-radius:12px;display:flex;align-items:center;justify-content:center;background:rgba(245,158,11,.13);color:#9A6208">${ic("alert", 20)}</span>
        <div class="t-card" style="font-size:14px;margin-top:13px">The forecast editor didn’t load</div>
        <p style="font-size:12.5px;color:var(--s500);margin-top:7px;line-height:1.55">Nothing was changed. You can try again, or open the curve directly in ReveNew.</p>
      </div>`,
      `<button class="btn btn-ghost" style="height:32px;font-size:12.5px">Cancel</button><span style="flex:1"></span>
       <button class="btn btn-secondary" style="height:32px;font-size:12.5px">Open in ReveNew${ic("upRight", 13, 1.8)}</button>
       <button class="btn btn-primary" style="height:32px;font-size:12.5px">Try again</button>`) })}
  ${stateCol({ n: "03", name: "Saved — back in context",
    note: "The modal closes onto the screen it came from. The technical simulation is never touched, and neither is the scenario it was based on — the edit lands as a new scenario with new cases.",
    panel: `
      <div class="raise" style="display:flex;align-items:flex-start;gap:11px;padding:13px 15px">
        <span style="width:22px;height:22px;flex:none;border-radius:7px;display:flex;align-items:center;justify-content:center;background:rgba(16,185,129,.14);color:#0E9469">${ic("check", 14, 2.1)}</span>
        <span style="flex:1;min-width:0">
          <span class="t-card" style="display:block;font-size:13.5px">Forecast curve updated</span>
          <span class="t-meta" style="display:block;margin-top:3px">Saved as a new scenario — High spread itself is untouched.</span>
        </span>
      </div>
      <div class="wash" style="padding:13px 15px;margin-top:12px">
        <span class="kpi-lab" style="display:block">Financial scenario</span>
        <span style="display:block;font-size:13.5px;font-weight:500;color:var(--s900);margin-top:4px">High spread — +4% capture</span>
        <span style="display:flex;align-items:center;gap:9px;margin-top:7px">${src("revenew")}<span class="t-meta">updated just now</span></span>
      </div>
      <div class="panel" style="padding:13px 15px;margin-top:12px;display:flex;align-items:center;gap:12px">
        <span style="color:#9A6208;display:flex;flex:none">${ic("alert", 17)}</span>
        <span style="flex:1;min-width:0">
          <span style="display:block;font-size:13px;font-weight:500;color:var(--s900)">3 new cases available</span>
          <span class="t-meta" style="display:block;margin-top:3px">Base 2 h, 4 h variant and Low RTE × the new scenario</span>
        </span>
        <button class="btn btn-primary" style="height:32px;font-size:12.5px;flex:none">View cases</button>
      </div>` })}
</div>`,
});
console.log("EmbeddedStates.dc.html", embedStates.length);

/* ═══════════════════════════════════════════════════════════════
   SCREEN 5 — Cross-product Analytics
   The scatter and the monthly value chart both ask a question that
   needs BOTH products to answer. Insights name the mismatch, quote
   the two numbers behind it, and link to the project.
   ═══════════════════════════════════════════════════════════════ */
const insight = ({ name, verdict, readings, why, action }) => `
<div style="padding:16px 0">
  <div style="display:flex;align-items:baseline;justify-content:space-between;gap:10px">
    <a href="#" style="font-size:14px;font-weight:500">${name}</a>
    <span class="t-meta" style="white-space:nowrap">${verdict}</span>
  </div>
  <div style="display:flex;gap:18px;margin-top:9px">
    ${readings.map(([v, l, s]) => `
      <span style="min-width:0">
        <span style="display:block;font-size:17px;font-weight:700;letter-spacing:-.02em;color:var(--s900);font-variant-numeric:tabular-nums">${v}</span>
        <span style="display:flex;align-items:center;gap:6px;margin-top:3px"><span class="t-meta">${l}</span>${s}</span>
      </span>`).join("")}
  </div>
  <p style="font-size:12.5px;color:var(--s500);line-height:1.55;margin:10px 0 0">${why}</p>
  ${action ? `<a href="#" style="display:inline-flex;align-items:center;gap:5px;margin-top:10px;font-size:12px;font-weight:500;color:var(--b700);text-decoration:none">${action}${ic("right", 12, 2)}</a>` : ""}
</div>`;

const CMP = [
  { name: "Murcia BESS",     mwh: 220, cycles: 348, util: 78, degr: 2.3, rev: 9.80, irr: 13.4 },
  { name: "Valencia BESS",   mwh: 200, cycles: 326, util: 74, degr: 2.1, rev: 8.42, irr: 12.8 },
  { name: "Girona BESS",     mwh: 170, cycles: 331, util: 76, degr: 2.2, rev: 7.10, irr: 12.6 },
  { name: "Madrid Hybrid",   mwh: 120, cycles: 298, util: 68, degr: 1.9, rev: 4.55, irr: 11.9 },
  { name: "Almería BESS",    mwh: 120, cycles: 356, util: 81, degr: 2.6, rev: 4.34, irr: 9.4 },
  { name: "Sevilla Storage", mwh: 100, cycles: 312, util: 71, degr: 2.0, linked: false },
];
const cmpRow = (p) => {
  const num = (t) => `<td class="t-tbl num">${t}</td>`;
  const gap = `<td class="num"><span class="t-meta" style="opacity:.5">—</span></td>`;
  return `
<tr>
  <td><a href="#" class="anchor">${p.name}</a>
      ${p.linked === false ? `<div class="t-meta" style="margin-top:2px">No financial data</div>` : ""}</td>
  ${num(p.cycles)}${num(p.util + "%")}${num(p.degr.toFixed(1) + "%/yr")}
  ${p.linked === false ? gap + gap + gap
    : num("€" + p.rev.toFixed(2) + "M") + num(p.irr.toFixed(1) + "%") +
      `<td class="num"><b style="font-size:13.5px;font-weight:600;color:var(--s900)">€${(p.rev * 1e6 / (p.cycles * p.mwh)).toFixed(1)}</b></td>`}
</tr>`;
};
const cmpHead = (label, source, first) => `
<th style="${first ? "" : "text-align:right"};vertical-align:bottom;height:52px;padding-bottom:9px">
  <span style="display:block">${label}</span>
  <span style="display:${first ? "block" : "flex"};justify-content:flex-end;margin-top:5px;font-weight:400">${source}</span>
</th>`;

/* ── the two portfolio relationships neither product can plot ─────
   Same eleven projects, same marks, same accent as Utilisation against
   return: one chart language, three questions. The field is grey, the
   three projects Portfolio signals is reading out carry the accent, and
   every point keeps its name in the tooltip — so selecting an insight
   and finding it on a plot is the same act in all three.

   Each takes a StoreBrid quantity on one axis and a ReveNew quantity on
   the other, which is the whole reason they belong to the Suite.       */
const portNpv = (p) => -pvCapex(p.capex, WACC) + (pvCapex(p.capex, p.irr / 100) / annuityF(p.irr / 100)) * annuityF(WACC);
const portPerMwh = (p) => (p.rev * 1e6) / (p.gwh * 1000);

function portScatter({ xOf, yOf, xTicks, yTicks, xFmt, yFmt, xLab, yLab, refs, label, place, w = 596 }) {
  const H = 320, L = 54, R = 18, T = 18, B = 42;
  const pw = w - L - R, ph = H - T - B;
  const xs = FLEET.map(xOf), ys = FLEET.map(yOf);
  const xA = Math.min(...xs, ...xTicks), xB = Math.max(...xs, ...xTicks);
  const yA = Math.min(...ys, ...yTicks), yB = Math.max(...ys, ...yTicks);
  const xp = (xB - xA) * 0.10, yp = (yB - yA) * 0.12;
  const X = (v) => L + ((v - (xA - xp)) / ((xB + xp) - (xA - xp))) * pw;
  const Y = (v) => T + ph - ((v - (yA - yp)) / ((yB + yp) - (yA - yp))) * ph;
  const gx = xTicks.map((t) =>
    `<line x1="${X(t).toFixed(1)}" y1="${T}" x2="${X(t).toFixed(1)}" y2="${T + ph}" stroke="${GRID}" stroke-width="1"/>
     <text x="${X(t).toFixed(1)}" y="${T + ph + 15}" text-anchor="middle" font-size="9.5" fill="${AXIS}">${xFmt(t)}</text>`).join("");
  const gy = yTicks.map((t) =>
    `<line x1="${L}" y1="${Y(t).toFixed(1)}" x2="${w - R}" y2="${Y(t).toFixed(1)}" stroke="${GRID}" stroke-width="1"/>
     <text x="${L - 9}" y="${(Y(t) + 3.4).toFixed(1)}" text-anchor="end" font-size="9.5" fill="${AXIS}">${yFmt(t)}</text>`).join("");
  const mark = (p) => {
    const on = FLAGGED.has(p.n);
    return `<circle class="mk" cx="${X(xOf(p)).toFixed(1)}" cy="${Y(yOf(p)).toFixed(1)}" r="${bubbleR(p.mw).toFixed(1)}"
      fill="${on ? CMB : FIELD}" fill-opacity="${on ? ".72" : ".26"}"
      stroke="${on ? "#fff" : "rgba(255,255,255,.85)"}" stroke-width="${on ? 2.2 : 1.5}"
      ><title>${p.n} — ${label(p)}</title></circle>`;
  };
  /* field first, accent last, so the three the panel names are never
     hidden under a project nobody is asking about */
  const dots = FLEET.filter((p) => !FLAGGED.has(p.n)).map(mark).join("")
             + FLEET.filter((p) => FLAGGED.has(p.n)).map(mark).join("");
  /* Label placement is per chart, not per project: the same three names
     land in different places on each plot, and a shared side would put
     two of them on top of each other. */
  const labs = FLEET.filter((p) => FLAGGED.has(p.n) && place(p)).map((p) => {
    const at = place(p), px = X(xOf(p)), py = Y(yOf(p)), r = bubbleR(p.mw);
    return at === "top"
      ? `<text x="${px.toFixed(1)}" y="${(py - r - 9).toFixed(1)}" text-anchor="middle" font-size="10.5" font-weight="600" fill="${INK}" ${KO}>${p.n}</text>`
      : at === "end"
        ? `<text x="${(px - r - 7).toFixed(1)}" y="${(py + 3.6).toFixed(1)}" text-anchor="end" font-size="10.5" font-weight="600" fill="${INK}" ${KO}>${p.n}</text>`
        : `<text x="${(px + r + 7).toFixed(1)}" y="${(py + 3.6).toFixed(1)}" text-anchor="start" font-size="10.5" font-weight="600" fill="${INK}" ${KO}>${p.n}</text>`;
  }).join("");
  return `
<svg viewBox="0 0 ${w} ${H}" width="100%" style="display:block" role="img" aria-label="${xLab} against ${yLab}, one bubble per Suite project">
  ${MKSTYLE}${gx}${gy}${refs ? refs({ X, Y, L, R, T, ph, pw, w }) : ""}${dots}${labs}
</svg>`;
}

/* §32 · What the money buys. The line at zero is not decoration: below it
   a project does not clear the 9.5% cost of capital, which is the only
   threshold on this plot that is a fact rather than a preference. */
function capexNpvScatter(w = 596) {
  return portScatter({ w,
    xOf: (p) => p.capex, yOf: portNpv,
    xTicks: [0, 15, 30, 45, 60], yTicks: [-3, 0, 3, 6, 9],
    xFmt: (t) => "€" + t + "M", yFmt: (t) => (t < 0 ? "−€" : "€") + Math.abs(t) + "M",
    xLab: "CAPEX", yLab: "NPV",
    label: (p) => `€${p.capex.toFixed(1)}M CAPEX · ${eurMs(portNpv(p))} NPV · ${p.irr.toFixed(1)}% IRR · ${eurM(p.rev)} revenue`,
    place: () => "start",
    refs: ({ X, Y, L, w: ww }) => `
      <line x1="${L}" y1="${Y(0).toFixed(1)}" x2="${ww - 18}" y2="${Y(0).toFixed(1)}" stroke="rgba(154,98,8,.5)" stroke-width="1.4" stroke-dasharray="4 3"/>
      <text x="${L + 5}" y="${(Y(0) - 8).toFixed(1)}" font-size="9.5" font-weight="600" fill="#9A6208">NPV 0 · breaks even at ${(WACC * 100).toFixed(1)}%</text>`,
  });
}

/* §33 · Moving energy and being paid for it are different achievements,
   and the portfolio separates them: the vertical is what a discharged MWh
   actually earns, the horizontal is how many of them there are. The
   crosshair is the portfolio's own median, so "below the middle" is a
   position on the plot rather than a judgement in a sentence. */
function throughputScatter(w = 596) {
  const med = (a) => { const s = [...a].sort((x, y) => x - y); const h = s.length >> 1;
    return s.length % 2 ? s[h] : (s[h - 1] + s[h]) / 2; };
  const mx = med(FLEET.map((p) => p.gwh)), my = med(FLEET.map(portPerMwh));
  return portScatter({ w,
    xOf: (p) => p.gwh, yOf: portPerMwh,
    xTicks: [20, 40, 60, 80], yTicks: [90, 105, 120, 135],
    xFmt: (t) => t + " GWh", yFmt: (t) => "€" + t,
    xLab: "Energy discharged", yLab: "Revenue per MWh discharged",
    label: (p) => `${p.gwh.toFixed(1)} GWh discharged · €${portPerMwh(p).toFixed(1)} per MWh · ${eurM(p.rev)} revenue`,
    place: (p) => (p.n === "Toledo Hybrid" ? "end" : "start"),
    refs: ({ X, Y, L, T, ph, w: ww }) => `
      <line x1="${X(mx).toFixed(1)}" y1="${T}" x2="${X(mx).toFixed(1)}" y2="${T + ph}" stroke="rgba(30,58,138,.20)" stroke-width="1.2" stroke-dasharray="4 3"/>
      <line x1="${L}" y1="${Y(my).toFixed(1)}" x2="${ww - 18}" y2="${Y(my).toFixed(1)}" stroke="rgba(30,58,138,.20)" stroke-width="1.2" stroke-dasharray="4 3"/>
      <text x="${(X(mx) + 6).toFixed(1)}" y="${T + 11}" font-size="9" fill="${AXIS}">median ${mx.toFixed(1)} GWh</text>
      <text x="${L + 5}" y="${(Y(my) - 6).toFixed(1)}" font-size="9" fill="${AXIS}">median €${my.toFixed(1)} / MWh</text>`,
  });
}

const analytics = doc({
  w: 1440, h: 2580, side: rootSide("analytics"), rvFocus: true,
  body: `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><b>Analytics</b>`,
  eyebrow: `${FLEET.length} projects with both capabilities · ${(FSUM((p) => p.mw) / 1000).toFixed(2)} GW · ${(FSUM((p) => p.mwh) / 1000).toFixed(2)} GWh`,
  title: "Analytics",
  actions: `<button class="btn btn-secondary">${ic("upRight", 16)}Export</button>`,
})}
<div style="display:flex;align-items:center;gap:12px;margin-bottom:26px;flex-wrap:wrap">
  <button class="btn btn-secondary">${ic("layers", 16)}Iberia Core${ic("down", 15, 1.8)}</button>
  <button class="btn btn-secondary">${ic("clock", 16)}2026${ic("down", 15, 1.8)}</button>
  <div class="tabs">
    <a href="#" class="on">Both products <span class="count">11</span></a>
    <a href="#">All projects <span class="count">24</span></a>
  </div>
  <span style="margin-left:auto;display:flex;align-items:center;gap:7px" class="t-meta">${ic("link", 14, 1.7)}11 of 24 projects carry both technical and financial data</span>
</div>

${(() => {
  /* Every headline is summed from the same eleven projects the charts
     plot, so the KPI row and the geometry below it cannot disagree.
     Utilisation is weighted by storage capacity and IRR by capital,
     because an unweighted mean of either would let a 35 MW asset speak
     as loudly as a 110 MW one. */
  const gwh = FSUM((p) => p.gwh), rev = FSUM((p) => p.rev), cap = FSUM((p) => p.capex);
  const util = FSUM((p) => p.util * p.mwh) / FSUM((p) => p.mwh);
  const irr = FSUM((p) => p.irr * p.capex) / cap;
  return `
<div class="kpirow">
  ${kpi({ label: "Battery utilisation", value: util.toFixed(0) + "%", source: src("storebrid"), delta: "+3 pp" })}
  ${kpi({ label: "Energy discharged", value: gwh.toFixed(0) + " GWh", source: src("storebrid"), delta: "+6.2%" })}
  ${kpi({ label: "Annual revenue", value: "€" + rev.toFixed(1) + "M", source: src("revenew"), delta: "+4.1%" })}
  ${kpi({ label: "Portfolio IRR", value: irr.toFixed(1) + "%", source: src("combined"), combined: true,
          formula: "weighted by CAPEX · ReveNew cash flows against StoreBrid CAPEX" })}
  ${kpi({ label: "Revenue / MWh discharged", value: "€" + ((rev * 1e6) / (gwh * 1000)).toFixed(1), source: src("combined"), combined: true,
          formula: `€${rev.toFixed(1)}M revenue ÷ ${gwh.toFixed(0)} GWh discharged` })}
</div>`;
})()}
<div style="margin-top:20px">${staleNotice({
  body: `${STALE_PORTFOLIO} analysis cases across the portfolio are outdated — their financial result was calculated before the technical simulation changed, so they are excluded from the figures above.`,
  link: `View the ${STALE_PORTFOLIO} cases`, gap: "0" })}</div>

<section class="panel lift" style="display:flex;align-items:stretch;margin-top:28px">
  <div style="flex:1.62;min-width:0;padding:24px 26px">
    <div class="band">Technical vs financial</div>
    <div style="display:flex;align-items:center;gap:10px;margin-top:8px">
      <h2 class="t-sec">Utilisation against return</h2>${src("combined")}
    </div>
    <p class="t-meta" style="margin-top:6px;font-size:12px;line-height:1.55">
      One bubble per Suite project. Neither product can draw this — each owns one axis.<br>
      <span style="display:inline-flex;align-items:center;gap:6px;margin-top:4px">
        <svg width="11" height="11" aria-hidden="true"><circle cx="5.5" cy="5.5" r="5" fill="${CMB}" fill-opacity=".72"/></svg>
        Coloured only where Portfolio signals has something to say — the rest is the field.
      </span>
    </p>
    <div style="margin-top:12px">${fleetScatter(640)}</div>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding-top:14px;border-top:1px solid var(--hair)">
      <span style="display:inline-flex;align-items:center;gap:7px"><span class="t-meta">↑ IRR</span>${src("revenew")}</span>
      <span style="display:inline-flex;align-items:center;gap:9px">
        <svg width="34" height="16" aria-hidden="true"><circle cx="6" cy="8" r="5" fill="${FIELD}" fill-opacity=".3"/><circle cx="24" cy="8" r="7.5" fill="${FIELD}" fill-opacity=".3"/></svg>
        <span class="t-meta">Bubble = installed power, 35–110 MW</span>${src("suite")}
      </span>
      <span style="display:inline-flex;align-items:center;gap:7px"><span class="t-meta">→ Battery utilisation</span>${src("storebrid")}</span>
    </div>
  </div>
  <div style="width:1px;background:var(--hair);flex:none"></div>
  <div style="flex:1;min-width:0;padding:24px 26px;background:linear-gradient(168deg,rgba(255,255,255,.34),rgba(255,255,255,.16))">
    <div class="band">Portfolio signals</div>
    <h2 class="t-sec" style="margin-top:8px">Where should I investigate?</h2>
    <p class="t-meta" style="margin-top:6px;font-size:12px;line-height:1.5">
      Each reads one StoreBrid number against one ReveNew number, and each one leads somewhere it can be acted on.</p>
    <div class="rows" style="margin-top:6px">
      ${insight({ name: "Almería BESS", action: "Review project", verdict: "High utilisation · low return",
        readings: [["81%", "utilisation", src("storebrid")], ["9.4%", "IRR", src("revenew")]],
        why: "Cycles hardest in the portfolio while its return sits second from bottom. Degradation is 2.6%/yr against a 2.1% median — check the ReCapEx assumptions." })}
      ${insight({ name: "Cádiz Storage", action: "Review project", verdict: "Low utilisation · low return",
        readings: [["52%", "utilisation", src("storebrid")], ["7.8%", "IRR", src("revenew")]],
        why: "Least-used asset in the portfolio. The export limit in its plant configuration is below the grid offer on file." })}
      ${insight({ name: "Toledo Hybrid", action: "Open comparison", verdict: "Below the co-located median",
        readings: [["57%", "utilisation", src("storebrid")], ["8.9%", "IRR", src("revenew")]],
        why: "Both figures trail Madrid Hybrid, the closest comparable, on a similar capacity and market." })}
    </div>
  </div>
</section>

${(() => {
  /* The two relationships the portfolio KPIs cannot express. Investment
     against value asks whether capital is working; throughput against
     capture asks whether energy is being sold well. Both take one
     StoreBrid axis and one ReveNew axis, which is why they live here and
     not inside either product — and both plot the same eleven projects
     with the same marks as the chart above, so a name found in one is the
     same asset in all three. */
  const cap = FSUM((p) => p.capex), npv = FSUM(portNpv);
  const gwh = FSUM((p) => p.gwh), rev = FSUM((p) => p.rev);
  const under = FLEET.filter((p) => portNpv(p) < 0);
  const dense = FLEET.reduce((a, b) => (portNpv(b) / b.capex > portNpv(a) / a.capex ? b : a));
  const thin = FLEET.filter((p) => portNpv(p) > 0)
    .reduce((a, b) => (portNpv(b) / b.capex < portNpv(a) / a.capex ? b : a));
  const cheapest = FLEET.reduce((a, b) => (portPerMwh(b) < portPerMwh(a) ? b : a));
  const richest = FLEET.reduce((a, b) => (portPerMwh(b) > portPerMwh(a) ? b : a));
  const stat = (k, v) => `
    <span style="min-width:0">
      <span class="t-meta" style="display:block">${k}</span>
      <span style="display:block;font-size:17px;font-weight:700;letter-spacing:-.02em;color:var(--s900);margin-top:4px;font-variant-numeric:tabular-nums">${v}</span>
    </span>`;
  const panel = ({ band, title, note, chart, stats, foot, xLab, xSrc, yLab, ySrc }) => `
    <section class="panel" style="flex:1;min-width:0;padding:24px 26px">
      <div class="band">${band}</div>
      <div style="display:flex;align-items:center;gap:10px;margin-top:8px">
        <h2 class="t-sec">${title}</h2>${src("combined")}
      </div>
      <p class="t-meta" style="margin-top:6px;font-size:12px;line-height:1.55">${note}</p>
      <div style="display:flex;gap:26px;margin-top:12px">${stats}</div>
      <div style="margin-top:14px">${chart}</div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;padding-top:12px;border-top:1px solid var(--hair)">
        <span style="display:inline-flex;align-items:center;gap:7px"><span class="t-meta">↑ ${yLab}</span>${src(ySrc)}</span>
        <span style="display:inline-flex;align-items:center;gap:7px"><span class="t-meta">→ ${xLab}</span>${src(xSrc)}</span>
      </div>
      <p class="t-meta" style="margin-top:12px;line-height:1.55">${foot}</p>
    </section>`;
  return `
${sec({ label: "Investment, output and what they return", source: src("combined"), top: 26,
        sub: "Two cross-product relationships on the same eleven projects and the same marks as above. Position is the reading; the exact figures are in the comparison table at the foot of the page." })}
<div style="display:flex;gap:22px;align-items:stretch">
  ${panel({ band: "Capital efficiency", title: "Investment against value",
    note: "What each project cost to build against what it is worth today. Distance above the dashed line is value created; below it the project does not clear the cost of capital.",
    stats: stat("Portfolio CAPEX", "€" + cap.toFixed(0) + "M") + stat("Portfolio NPV", eurMs(npv)) + stat("NPV per € invested", "€" + (npv / cap).toFixed(2)),
    chart: capexNpvScatter(596),
    xLab: "CAPEX", xSrc: "storebrid", yLab: "NPV", ySrc: "revenew",
    foot: `${under.length} project${under.length === 1 ? "" : "s"} sit${under.length === 1 ? "s" : ""} below the line — ${under.map((p) => p.n).join(", ")}. ${dense.n} returns the most per euro at €${(portNpv(dense) / dense.capex).toFixed(2)}, ${thin.n} the least of those above it at €${(portNpv(thin) / thin.capex).toFixed(2)}.` })}
  ${panel({ band: "Throughput against capture", title: "Energy moved against what it earns",
    note: "Volume is a StoreBrid outcome, price per MWh a ReveNew one. A project can be busy and poorly paid, or quiet and well paid — the two axes separate them.",
    stats: stat("Energy discharged", gwh.toFixed(0) + " GWh") + stat("Annual revenue", "€" + rev.toFixed(1) + "M") + stat("Spread in capture", "€" + (portPerMwh(richest) - portPerMwh(cheapest)).toFixed(0) + " / MWh"),
    chart: throughputScatter(596),
    xLab: "Energy discharged", xSrc: "storebrid", yLab: "Revenue / MWh discharged", ySrc: "combined",
    foot: `${richest.n} earns €${portPerMwh(richest).toFixed(1)} per discharged MWh against €${portPerMwh(cheapest).toFixed(1)} at ${cheapest.n} — a €${(portPerMwh(richest) - portPerMwh(cheapest)).toFixed(0)} gap on the same commodity. Below and right of the crosshair is high volume sold cheaply.` })}
</div>`;
})()}

${(() => {
  /* §10 · Which projects depend most on the market view being right. The
     range comes from each project's own financial cases; it is a spread,
     not a probability, and the copy has to keep saying so. Sorted by how
     wide the spread is, because that is the question — not by return. */
  const PS = [
    { p: "Valencia BESS", lo: 9.6, hi: 14.1, cur: 12.8, cases: 3 },
    { p: "Almería BESS", lo: 7.1, hi: 11.8, cur: 9.4, cases: 3 },
    { p: "Murcia BESS", lo: 11.2, hi: 15.0, cur: 13.4, cases: 3 },
    { p: "Madrid Hybrid", lo: 10.8, hi: 12.9, cur: 11.9, cases: 2 },
    { p: "Porto PV", lo: 10.4, hi: 12.1, cur: 11.2, cases: 2 },
  ].sort((a, b) => (b.hi - b.lo) - (a.hi - a.lo));
  const A0 = Math.min(...PS.map((x) => x.lo)) - 0.7, B0 = Math.max(...PS.map((x) => x.hi)) + 0.7;
  const pct = (v) => ((v - A0) / (B0 - A0)) * 100;
  return `
${sec({ label: "Financial-case sensitivity", source: src("combined"), top: 26,
        sub: "How far each project's IRR moves across its own financial cases. A spread between modelled views, not a probability — the widest ones are the ones whose case depends most on the market view being right." })}
<section class="panel" style="padding:22px 26px">
  ${PS.map((x, i) => `
  <div style="display:flex;align-items:center;gap:16px;padding:12px 0;${i ? "border-top:1px solid var(--hair)" : ""}">
    <span style="flex:none;width:190px;min-width:0">
      <a href="#" style="font-size:13.5px;font-weight:500">${x.p}</a>
      <span class="t-meta" style="display:block;margin-top:2px">${x.cases} financial cases</span>
    </span>
    <span style="flex:1;min-width:0;position:relative;height:18px;display:block">
      <span style="position:absolute;left:0;right:0;top:8px;height:1px;background:var(--hair);display:block"></span>
      <span style="position:absolute;top:5.5px;height:7px;border-radius:4px;display:block;
            left:${pct(x.lo).toFixed(1)}%;width:${(pct(x.hi) - pct(x.lo)).toFixed(1)}%;
            background:linear-gradient(90deg,rgba(175,71,178,.32),rgba(37,99,235,.48))"></span>
      <span style="position:absolute;top:3px;left:${pct(x.cur).toFixed(1)}%;margin-left:-6px;width:12px;height:12px;
            border-radius:50%;display:block;background:#fff;box-shadow:0 0 0 2px ${SU}"></span>
    </span>
    <span style="flex:none;width:118px;text-align:right;font-size:13px;font-weight:600;color:var(--s900);font-variant-numeric:tabular-nums">${x.lo.toFixed(1)}–${x.hi.toFixed(1)}%</span>
    <span style="flex:none;width:78px;text-align:right;font-size:12.5px;font-weight:600;color:var(--s500);font-variant-numeric:tabular-nums">${(x.hi - x.lo).toFixed(1)} pp</span>
  </div>`).join("")}
  <div style="display:flex;align-items:center;gap:16px;margin-top:14px;padding-top:12px;border-top:1px solid var(--hair)">
    <span style="display:inline-flex;align-items:center;gap:7px"><i style="width:9px;height:9px;border-radius:50%;background:#fff;box-shadow:0 0 0 2px ${SU};display:block"></i><span class="t-meta">Current analysis case</span></span>
    <span style="flex:1"></span>
    <a href="#" style="font-size:12.5px;font-weight:500">Open the widest in its case matrix${ic("right", 12, 2)}</a>
  </div>
</section>`;
})()}

${/* §17 · Every analytical block below the hero is introduced the same
      way — a section heading naming the question, then one panel holding
      the chart. This one carried its title inside the panel instead, which
      made it read as a stray card rather than the fourth reading. */""}
${sec({ label: "Over the year", source: src("combined"), top: 26,
        sub: "April and May move the most energy in the year and are worth the least per MWh — spreads collapse when solar floods the middle of the day." })}
<section class="panel" style="padding:24px 26px">
  <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:20px">
    <div style="min-width:0">
      <h2 class="t-sec">When moving energy actually earns</h2>
      <p class="t-meta" style="margin-top:6px;font-size:12px;max-width:78ch">
        Revenue per MWh discharged, month by month, over the volume it was earned on.
      </p>
    </div>
    <div style="flex:none">${legend([["Revenue / MWh discharged", "#6D5AC6"], ["GWh discharged", "rgba(37,99,235,.34)"]])}</div>
  </div>
  <div style="margin-top:14px">${valueOverTime(1052)}</div>
</section>

${sec({ label: "Project comparison", right: `<a href="#" style="font-size:13px;font-weight:500">Add a column</a>`, top: 26 })}
<section class="panel" style="overflow:hidden">
  <table class="tbl">
    <thead><tr>
      ${cmpHead("Project", src("suite"), true)}${cmpHead("Cycles / yr", src("storebrid"))}
      ${cmpHead("Utilisation", src("storebrid"))}${cmpHead("Degradation", src("storebrid"))}
      ${cmpHead("Annual revenue", src("revenew"))}${cmpHead("IRR", src("revenew"))}
      ${cmpHead("Revenue / MWh", src("combined"))}
    </tr></thead>
    <tbody>${CMP.map(cmpRow).join("")}</tbody>
  </table>
</section>
<p class="t-meta" style="margin-top:12px">Sevilla Storage has no financial data yet, so its financial columns stay in place and stay empty rather than the project dropping out of the comparison.</p>`,
});
writeFileSync("Analytics.dc.html", analytics);
console.log("Analytics.dc.html", analytics.length);

/* ── Pattern sheet ───────────────────────────────────────────────── */
const srcSpec = ({ chip, when, click, last }) => `
<div style="display:flex;align-items:flex-start;gap:16px;padding:14px 0;${last ? "" : "border-bottom:1px solid var(--hair)"}">
  <span style="width:104px;flex:none;padding-top:1px">${chip}</span>
  <span style="flex:1;min-width:0">
    <span style="display:block;font-size:13px;color:var(--s700);line-height:1.5">${when}</span>
    <span style="display:block;font-size:11px;color:var(--s400);margin-top:4px">On click → ${click}</span>
  </span>
</div>`;
const swatch = (name, hex, role) => `
<div style="flex:1;min-width:0">
  <span style="display:block;width:100%;height:36px;border-radius:9px;background:${hex};box-shadow:inset 0 1px 0 rgba(255,255,255,.28)"></span>
  <div style="font-size:13px;font-weight:600;color:var(--s900);margin-top:10px">${name}</div>
  <div class="t-meta" style="margin-top:3px;font-family:ui-monospace,Menlo,monospace">${hex}</div>
  <div class="t-meta" style="margin-top:5px">${role}</div>
</div>`;

const attribution = sheet({
  w: 860, h: 1180,
  body: `
<p style="margin:0 0 7px;color:var(--blue700);font-weight:600;letter-spacing:.08em;text-transform:uppercase;font-size:11px">Suite · Patterns</p>
<h1 class="t-page">Source and relationship</h1>
<p class="t-body" style="color:var(--s500);margin-top:9px;max-width:60ch">
  Two patterns carry the whole Suite argument: where a number came from, and what depends on it.
  Both stay quiet — 10.5&nbsp;px, slate&nbsp;400, a 4&nbsp;px dot. Metadata, never a badge.
</p>

${sec({ label: "The four sources", top: 26 })}
<div>
  ${srcSpec({ chip: src("suite"), when: "Neutral metadata the Suite owns — name, country, technology, capacity, status.", click: "stays in the Suite" })}
  ${srcSpec({ chip: src("storebrid"), when: "Technical results — simulations, dispatch, state of charge, cycles, throughput.", click: "deep-links into the StoreBrid workflow" })}
  ${srcSpec({ chip: src("revenew"), when: "Financial results — forecasts, capture price, revenue, costs, IRR, NPV.", click: "deep-links into the ReveNew workflow" })}
  ${srcSpec({ chip: src("combined"), when: "Exists only because the Suite understands both domains. Always shows how it is derived.", click: "opens the combined metric in Analytics", last: true })}
</div>

${sec({ label: "Cross-product context", sub: "How a Suite screen says that one product's numbers rest on the other's, without pretending to own either calculation." })}
<div style="display:flex;align-items:center;gap:14px;padding:15px 18px;border-radius:var(--r-sm);
     background:linear-gradient(168deg,rgba(245,158,11,.07),rgba(255,255,255,0) 70%);box-shadow:inset 0 0 0 1px rgba(245,158,11,.16)">
  <span style="color:#9A6208;display:flex;flex:none">${ic("alert", 17)}</span>
  <span style="flex:1;min-width:0;font-size:13px;color:var(--s700);line-height:1.55">
    Financial figures are based on simulation <b style="font-weight:600">Base case 2027</b>, last calculated 5 days ago —
    the plant configuration changed after that.
  </span>
  <a href="#" style="flex:none;font-size:12.5px;font-weight:500">Review →</a>
</div>
<p class="t-meta" style="margin-top:11px;line-height:1.6">
  It appears only on Suite-owned screens — overview, analytics, comparison. A specialist screen stays inside its own product:
  the simulations list carries no revenue cases, and a revenue case carries no dispatch settings.
  The Suite states the relationship; each product still owns its own recalculation.
</p>

${sec({ label: "Product accents", sub: "Lifted from each product. The Suite is the parent brand; it does not flatten them." })}
<div style="display:flex;gap:16px">
  ${swatch("StoreBrid", SB, "Engineering · technical")}
  ${swatch("ReveNew", RN, "Financial")}
  ${swatch("Suite", SU, "Neutral · combined")}
</div>

${sec({ label: "Two badge families — never mixed" })}
<div style="display:flex;gap:18px">
  <div style="flex:1;min-width:0">
    <div class="t-lab" style="font-weight:600;color:var(--s700)">Product capabilities</div>
    <div style="margin-top:11px">${cov(1, 0)}</div>
    <p class="t-meta" style="margin-top:11px;line-height:1.55">
      Which product capabilities are enabled on this <b style="font-weight:600;color:var(--s500)">project</b>.
      There is one project — this is never two records joined together.
    </p>
  </div>
  <div style="width:1px;background:var(--hair)"></div>
  <div style="flex:1;min-width:0">
    <div class="t-lab" style="font-weight:600;color:var(--s700)">Status</div>
    <div style="margin-top:11px;display:flex;gap:7px;flex-wrap:wrap">${ST.active}${ST.development}${ST.draft}</div>
    <p class="t-meta" style="margin-top:11px;line-height:1.55">
      What <b style="font-weight:600;color:var(--s500)">state</b> the thing is in. Always with a dot, so state never rests on hue alone.
    </p>
  </div>
</div>`,
});
writeFileSync("SourceAttribution.dc.html", attribution);
console.log("SourceAttribution.dc.html", attribution.length);


/* ═══════════════════════════════════════════════════════════════
   PHASE 1 — the same Home, three entitlements
   Single-product users never see the other product's metrics, an
   empty dashboard standing in for it, or a Combined KPI that cannot
   exist. What changes is WHICH questions Home answers.
   ═══════════════════════════════════════════════════════════════ */
function monoTrend(vals, color, unit, w = 566) {
  const H = 224, L = 40, R = 16, T = 16, B = 26;
  const pw = w - L - R, ph = H - T - B;
  const hi = Math.max(...vals) * 1.14, lo = 0;
  const x = (i) => L + (i / 11) * pw;
  const y = (v) => T + ph - ((v - lo) / (hi - lo)) * ph;
  const ticks = [0, 1, 2].map((k) => Math.round((hi * (k / 2)) / 5) * 5);
  const grids = ticks.map((g) =>
    `<line x1="${L}" y1="${y(g).toFixed(1)}" x2="${w - R}" y2="${y(g).toFixed(1)}" stroke="${g === 0 ? "rgba(30,58,138,.16)" : GRID}" stroke-width="1"/>
     <text x="${L - 7}" y="${(y(g) + 3.4).toFixed(1)}" text-anchor="end" font-size="9.5" fill="${AXIS}">${g}</text>`).join("");
  const band = pw / 12, bw = Math.min(26, band * 0.5);
  const bars = vals.map((v, i) => {
    const xx = x(i) + band / 2 - bw / 2 - band / 24;
    return `<path class="mk" d="${bar(xx, y(v), bw, y(0) - y(v), 4, true)}" fill="${color}" fill-opacity=".82"><title>${MONTHS[i]} — ${v} ${unit}</title></path>`;
  }).join("");
  const xl = [0, 3, 6, 9, 11].map((i) =>
    `<text x="${(x(i) + band / 2 - band / 24).toFixed(1)}" y="${H - 6}" text-anchor="middle" font-size="9.5" fill="${AXIS}">${MONTHS[i]}</text>`).join("");
  return `
<svg viewBox="0 0 ${w} ${H}" width="100%" style="display:block" role="img" aria-label="Monthly ${unit}">
  ${MKSTYLE}${grids}${bars}
  <text x="${L - 7}" y="${T + 4}" text-anchor="end" font-size="9" fill="${AXIS}">${unit}</text>
  ${xl}
</svg>`;
}

const soloCard = ({ name, place, spec, icon, meta, tint }) => `
<a href="#" class="panel ${tint}" style="display:flex;align-items:center;gap:16px;padding:16px 18px;text-decoration:none">
  <span class="wash" style="width:40px;height:40px;flex:none;display:flex;align-items:center;justify-content:center;
        border-radius:var(--r-xs);color:${tint === "tint-rv" ? "var(--rv600)" : "var(--b700)"}">${ic(icon, 20)}</span>
  <span style="flex:1;min-width:0">
    <span class="t-card" style="display:block;font-size:15px">${name}</span>
    <span style="display:block;font-size:12px;color:var(--s500);margin-top:3px">${place} · ${spec}</span>
    <span style="display:block;font-size:11px;color:var(--s400);margin-top:8px">${meta}</span>
  </span>
  <span style="flex:none;display:flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:var(--b700)">Open${ic("right", 14, 2)}</span>
</a>`;

function soloHome({ ent, greetingSub, count, countSub, split, capLabel, capValue, capSub, capSrc,
                    kpis, chartTitle, chartNote, chartLegend, chart, cards, insights, activity, h }) {
  return doc({
    w: 1440, h, side: rootSide("home", ent), rvFocus: ent === "rv",
    body: `
${head({
  eyebrow: greetingSub,
  title: "Good morning, Victor",
  actions: `<button class="btn btn-primary">${ic("analytics", 16)}Compare projects</button>
            <button class="btn btn-secondary">${ic("plus", 16, 1.9)}New project</button>`,
})}

<section class="panel lift" style="padding:26px 30px">
  <div class="band">Portfolio</div>
  <div style="display:flex;align-items:flex-start;gap:44px;margin-top:14px">
    <div style="flex:1.35;min-width:0">
      <div style="display:flex;align-items:baseline;gap:12px">
        <span style="font-size:42px;font-weight:700;letter-spacing:-.032em;color:var(--s900);line-height:1">${count}</span>
        <span style="font-size:17px;font-weight:600;color:var(--s700)">Projects</span>
        <span class="t-meta" style="margin-left:2px">${countSub}</span>
      </div>
      <div style="display:flex;gap:26px;margin-top:18px;flex-wrap:wrap">
        ${split.map(([l, n, c]) => `
          <span style="display:inline-flex;align-items:center;gap:8px">
            <i style="width:6px;height:6px;border-radius:50%;background:${c};display:block;flex:none"></i>
            <span style="font-size:12.5px;color:var(--s500)">${l}</span>
            <b style="font-size:12.5px;font-weight:600;color:var(--s900)">${n}</b>
          </span>`).join("")}
      </div>
    </div>
    <div style="width:1px;align-self:stretch;background:var(--hair);flex:none"></div>
    <div style="flex:1;min-width:0;padding-top:2px">
      <div class="kpi-lab">${capLabel}</div>
      <div style="font-size:26px;font-weight:700;letter-spacing:-.026em;color:var(--s900);margin-top:9px;font-variant-numeric:tabular-nums">${capValue}</div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:10px">
        <span class="t-meta">${capSub}</span>${capSrc}
      </div>
    </div>
  </div>
  <div class="hr" style="margin:24px 0 20px"></div>
  <div class="kpirow">${kpis}</div>
</section>

<div style="display:flex;gap:26px;margin-top:34px;align-items:flex-start">
  <section style="flex:1;min-width:0">
    ${sec({ label: "Continue working", top: 0, right: `<a href="#" style="font-size:13px;font-weight:500">All projects</a>` })}
    <div style="display:flex;flex-direction:column;gap:12px">${cards}</div>
  </section>
  <section style="flex:1.16;min-width:0">
    ${sec({ label: chartTitle, top: 0, right: `<span class="t-meta">Last 12 months</span>` })}
    <div class="panel" style="padding:20px 22px">
      <p class="t-meta" style="font-size:12px;line-height:1.55;margin-bottom:12px">${chartNote}</p>
      <div style="margin-bottom:10px">${chartLegend}</div>
      ${chart}
    </div>
  </section>
</div>

<div style="display:flex;gap:26px;margin-top:34px;align-items:flex-start">
  <section style="flex:1.16;min-width:0">
    ${sec({ label: "Recent activity", top: 0, right: `<a href="#" style="font-size:13px;font-weight:500">View all</a>` })}
    <div class="rows">${activity}</div>
  </section>
  <section style="flex:1;min-width:0">
    ${sec({ label: "Portfolio insights", top: 0, right: `<a href="#" style="font-size:13px;font-weight:500">View all</a>` })}
    <div style="display:flex;flex-direction:column;gap:12px">${insights}</div>
  </section>
</div>`,
  });
}

/* ── Scenario A · StoreBrid only ─────────────────────────────── */
const SB_GWH = [31, 29, 33, 35, 37, 34, 30, 29, 32, 35, 33, 28];
const homeSB = soloHome({
  ent: "sb", h: 1380,
  greetingSub: "Friday, 21 August · Sunveon Energy",
  count: 16, countSub: "1.42 GW across four markets",
  split: [["Active", 12, "#0E9469"], ["Development", 3, "var(--warn)"], ["Draft", 1, "var(--run)"]],
  capLabel: "Installed capacity", capValue: "1.42 GW", capSub: "2.68 GWh storage", capSrc: src("suite"),
  kpis: kpi({ label: "Energy discharged", value: "386 GWh", source: src("storebrid"), delta: "+5.4%" })
      + kpi({ label: "Average utilisation", value: "71%", source: src("storebrid"), delta: "+2 pp" })
      + kpi({ label: "Full cycles / yr", value: "318", source: src("storebrid"), delta: "+9" })
      + kpi({ label: "Simulations this month", value: "47", source: src("storebrid") }),
  chartTitle: "Energy discharged",
  chartNote: "Monthly discharge across the portfolio. Spring peaks as spreads widen around midday solar.",
  chartLegend: legend([["GWh discharged", SB]]),
  chart: monoTrend(SB_GWH, SB, "GWh"),
  cards: soloCard({ name: "Valencia BESS", place: "Spain", spec: "BESS · 100 MW / 200 MWh", icon: "battery", tint: "tint-sb", meta: "Simulation “Base case 2027” completed · 2 hours ago" })
       + soloCard({ name: "Madrid Hybrid", place: "Spain", spec: "PV + BESS · 80 MW / 120 MWh", icon: "layers", tint: "tint-sb", meta: "1 simulation failed · 2 days ago" })
       + soloCard({ name: "Sevilla Storage", place: "Spain", spec: "BESS · 50 MW / 100 MWh", icon: "battery", tint: "tint-sb", meta: "Plant configuration changed · 2 days ago" }),
  activity: activityRow({ what: "Simulation “Base case 2027” completed", project: "Valencia BESS", source: src("storebrid"), when: "2h ago" })
          + activityRow({ what: "Technical variant “4 h duration” started", project: "Valencia BESS", source: src("storebrid"), when: "4h ago" })
          + activityRow({ what: "Plant configuration changed — round-trip 87% → 88%", project: "Sevilla Storage", source: src("storebrid"), when: "Yesterday" })
          + activityRow({ what: "Dispatch results exported", project: "Almería BESS", source: src("storebrid"), when: "Yesterday" })
          + activityRow({ what: "Simulation “Low RTE 85%” ended in error", project: "Madrid Hybrid", source: src("storebrid"), when: "2d ago" })
          + activityRow({ what: "Project created", project: "Zaragoza Wind + BESS", source: src("suite"), when: "1w ago" }),
  insights: insightCard({ verdict: "Simulation failed", tone: "var(--warn)", source: src("storebrid"),
      body: "“Low RTE 85%” on Madrid Hybrid ended in error two days ago — that sensitivity is still unmodelled.", action: "Open simulation" })
    + insightCard({ verdict: "Hardest cycled", tone: "var(--warn)", source: src("storebrid"),
      body: "Almería BESS runs at 81% utilisation with 2.6%/yr degradation, against a 2.1% portfolio median.", action: "Review project" })
    + insightCard({ verdict: "Below expected dispatch", tone: "var(--b500)", source: src("storebrid"),
      body: "Cádiz Storage sits at 52% utilisation. Its configured export limit is below the grid offer on file.", action: "Check configuration" }),
});

/* ── Scenario B · ReveNew only ───────────────────────────────── */
const RV_REV = [6.4, 5.6, 5.9, 5.1, 4.9, 5.7, 6.4, 6.5, 6.1, 6.2, 6.6, 6.3];
const homeRV = soloHome({
  ent: "rv", h: 1380,
  greetingSub: "Friday, 21 August · Sunveon Energy",
  count: 19, countSub: "€71.8M forecast revenue · 2026",
  split: [["Active", 14, "#0E9469"], ["Development", 4, "var(--warn)"], ["Draft", 1, "var(--run)"]],
  capLabel: "Annual revenue · 2026", capValue: "€71.8M", capSub: "58% contracted", capSrc: src("revenew"),
  kpis: kpi({ label: "Portfolio IRR", value: "10.8%", source: src("revenew"), delta: "−0.3 pp" })
      + kpi({ label: "Capture price", value: "€112.4", source: src("revenew"), delta: "+3.8%" })
      + kpi({ label: "Contracted share", value: "58%", source: src("revenew"), delta: "−4 pp" })
      + kpi({ label: "Financial scenarios", value: "34", source: src("revenew") }),
  chartTitle: "Revenue",
  chartNote: "Monthly forecast revenue across the portfolio. Spring dips as capture prices fall with midday solar.",
  chartLegend: legend([["€M revenue", RN]]),
  chart: monoTrend(RV_REV, RN, "€M"),
  cards: soloCard({ name: "Valencia BESS", place: "Spain", spec: "BESS · 100 MW / 200 MWh", icon: "battery", tint: "tint-rv", meta: "PPA “Iberdrola 2026–31” changed · yesterday" })
       + soloCard({ name: "Porto PV", place: "Portugal", spec: "PV · 45 MW", icon: "sun", tint: "tint-rv", meta: "Financial scenario updated · 2 days ago" })
       + soloCard({ name: "Helios II", place: "Spain", spec: "PV · 45 MW", icon: "sun", tint: "tint-rv", meta: "Financial model recalculated · 3 days ago" }),
  activity: activityRow({ what: "PPA contract “Iberdrola 2026–31” changed", project: "Valencia BESS", source: src("revenew"), when: "3h ago" })
          + activityRow({ what: "Financial scenario “High spread” updated", project: "Porto PV", source: src("revenew"), when: "Yesterday" })
          + activityRow({ what: "Financial model recalculated", project: "Helios II", source: src("revenew"), when: "Yesterday" })
          + activityRow({ what: "Financial scenario “Merchant upside” created", project: "Madrid Hybrid", source: src("revenew"), when: "2d ago" })
          + activityRow({ what: "CapEx scenario updated", project: "Lisboa Storage", source: src("revenew"), when: "3d ago" })
          + activityRow({ what: "Project created", project: "Évora Hybrid", source: src("suite"), when: "1w ago" }),
  insights: insightCard({ verdict: "PPA rolls off in 2031", tone: "var(--warn)", source: src("revenew"),
      body: "Valencia BESS moves from 62% contracted to fully merchant across 2031. The downside case has not been modelled.", action: "Review contract" })
    + insightCard({ verdict: "Below median return", tone: "var(--warn)", source: src("revenew"),
      body: "Toledo Hybrid returns 8.9% IRR against a 10.8% portfolio median, on comparable capacity and market.", action: "Review project" })
    + insightCard({ verdict: "Strong performance", tone: "var(--ok)", source: src("revenew"),
      body: "Porto PV sits above the portfolio median on both revenue and IRR for a third consecutive quarter.", action: "View details" }),
});
console.log("HomeStoreBrid.dc.html", homeSB.length, "· HomeReveNew.dc.html", homeRV.length);





/* ═══════════════════════════════════════════════════════════════
   PHASE 8 — Compare projects · a decision, not a spreadsheet
   ═══════════════════════════════════════════════════════════════ */
const CMPSEL = [
  { name: "Murcia BESS",   mw: 110, mwh: 220, cycles: 348, util: 78, degr: 2.3, rev: 9.80, irr: 13.4, capex: 46.2 },
  { name: "Valencia BESS", mw: 100, mwh: 200, cycles: 326, util: 74, degr: 2.1, rev: 8.42, irr: 12.8, capex: 42.1 },
  { name: "Almería BESS",  mw: 60,  mwh: 120, cycles: 356, util: 81, degr: 2.6, rev: 4.34, irr: 9.4,  capex: 26.8 },
];
const cmpMetric = (label, vals, fmt, best) => {
  const nums = vals.map((v) => (typeof v === "number" ? v : NaN));
  const bi = best === "hi" ? nums.indexOf(Math.max(...nums)) : best === "lo" ? nums.indexOf(Math.min(...nums)) : -1;
  return `
<div style="display:flex;align-items:center;gap:16px;padding:12px 0;border-top:1px solid var(--hair)">
  <span style="width:210px;flex:none;font-size:12.5px;color:var(--s500)">${label}</span>
  ${vals.map((v, i) => `
    <span style="flex:1;min-width:0;text-align:right;font-variant-numeric:tabular-nums;
          font-size:${i === bi ? "15" : "14"}px;font-weight:${i === bi ? "700" : "500"};
          color:${i === bi ? "var(--s900)" : "var(--s700)"}">
      ${fmt(v)}${i === bi ? `<span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:var(--b600);margin-left:7px;vertical-align:middle"></span>` : ""}
    </span>`).join("")}
</div>`;
};
const cmpGroup = (label, source, rows) => `
<div style="margin-top:26px">
  <div style="display:flex;align-items:center;gap:10px">
    <span class="band">${label}</span>${source}
  </div>
  <div style="margin-top:10px">${rows}</div>
</div>`;

const V = (k) => CMPSEL.map((p) => p[k]);
const perCycle = CMPSEL.map((p) => (p.rev * 1e6) / p.cycles);
const perMwh = CMPSEL.map((p) => (p.rev * 1e6) / (p.cycles * p.mwh));



/* ═══════════════════════════════════════════════════════════════
   PHASES 11–13 — administration, licences, per-user access
   Entitlement visibility, not billing.
   ═══════════════════════════════════════════════════════════════ */
const licenceCard = ({ name, dot, state, seats, used, note }) => `
<div class="glass-sm" style="flex:1;min-width:0;padding:20px 22px">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
    <span style="display:inline-flex;align-items:center;gap:9px">
      <i style="width:8px;height:8px;border-radius:50%;background:${dot};display:block"></i>
      <span class="t-card" style="font-size:16px">${name}</span>
    </span>
    ${state === "active"
      ? badge("Active", "#0E9469", "rgba(16,185,129,.11)")
      : badge("Not licensed", "#54617A", "rgba(30,58,138,.06)")}
  </div>
  ${state === "active" ? `
  <div style="display:flex;align-items:baseline;gap:9px;margin-top:16px">
    <span style="font-size:28px;font-weight:700;letter-spacing:-.026em;color:var(--s900);font-variant-numeric:tabular-nums">${used}</span>
    <span style="font-size:13px;color:var(--s500)">of ${seats} seats in use</span>
  </div>
  <div style="display:flex;gap:2px;margin-top:12px">
    ${Array.from({ length: seats }, (_, i) =>
      `<span style="flex:1;height:6px;border-radius:2px;background:${i < used ? dot : "rgba(30,58,138,.09)"};display:block"></span>`).join("")}
  </div>` : `
  <p style="font-size:13px;color:var(--s500);line-height:1.6;margin-top:16px">${note}</p>`}
  <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:16px">
    <span class="t-meta">${state === "active" ? note : ""}</span>
    <a href="#" style="font-size:12.5px;font-weight:500">${state === "active" ? "Manage access" : "Learn more"}</a>
  </div>
</div>`;

const memberRow = ({ name, email, role, sb, rv, when }) => `
<tr>
  <td>
    <div style="display:flex;align-items:center;gap:11px">
      <span style="width:28px;height:28px;flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;
            background:linear-gradient(140deg,#0E9DA8,#3B82F6);color:#fff;font-size:10px;font-weight:700">${name.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>
      <span style="min-width:0">
        <span class="anchor" style="display:block">${name}</span>
        <span class="t-meta" style="display:block;margin-top:2px">${email}</span>
      </span>
    </div>
  </td>
  <td class="t-tbl">${role}</td>
  <td>${sb ? `<span class="cov"><i style="background:${SB}"></i>StoreBrid</span>` : `<span class="t-meta" style="opacity:.6">No access</span>`}</td>
  <td>${rv ? `<span class="cov"><i style="background:${RN}"></i>ReveNew</span>` : `<span class="t-meta" style="opacity:.6">No access</span>`}</td>
  <td class="t-meta num">${when}</td>
</tr>`;

const admin = doc({
  w: 1440, h: 1220, side: rootSide("admin"),
  body: `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><b>Administration</b>`,
  eyebrow: "Sunveon Energy · 14 members",
  title: "Administration",
  actions: `<button class="btn btn-secondary">${ic("plus", 16, 1.9)}Invite member</button>`,
})}
<div class="tabs" style="margin-bottom:26px">
  <a href="#">Organisation</a>
  <a href="#" class="on">Products &amp; licences</a>
  <a href="#">Members <span class="count">14</span></a>
  <a href="#">Projects <span class="count">24</span></a>
</div>

${sec({ label: "Products & licences", top: 0, sub: "What the organisation holds today. Seats are per product — a member can hold one, both, or neither." })}
<div style="display:flex;gap:18px">
  ${licenceCard({ name: "StoreBrid", dot: SB, state: "active", seats: 15, used: 12, note: "Engineering · renews 1 March 2027" })}
  ${licenceCard({ name: "ReveNew", dot: RN, state: "active", seats: 10, used: 8, note: "Financial · renews 1 March 2027" })}
  ${licenceCard({ name: "Suite", dot: SU, state: "active", seats: 15, used: 14, note: "Included with either product" })}
</div>

${sec({ label: "Member access", sub: "Holding both products as an organisation does not give every member both. The shell adapts per person." })}
<section class="panel" style="overflow:hidden">
  <table class="tbl">
    <thead><tr>
      <th style="width:34%">Member</th><th style="width:18%">Role</th>
      <th style="width:19%">Engineering</th><th style="width:19%">Financial</th>
      <th style="width:10%;text-align:right">Last active</th>
    </tr></thead>
    <tbody>
      ${memberRow({ name: "Victor Andújar", email: "victor@sunveon.com", role: "Administrator", sb: 1, rv: 1, when: "Now" })}
      ${memberRow({ name: "Ana Ruiz", email: "ana@sunveon.com", role: "Engineer", sb: 1, rv: 0, when: "2h ago" })}
      ${memberRow({ name: "Marta Gil", email: "marta@sunveon.com", role: "Analyst", sb: 0, rv: 1, when: "Yesterday" })}
      ${memberRow({ name: "Diego Sanz", email: "diego@sunveon.com", role: "Engineer", sb: 1, rv: 0, when: "Yesterday" })}
      ${memberRow({ name: "Laura Peña", email: "laura@sunveon.com", role: "Portfolio manager", sb: 1, rv: 1, when: "2d ago" })}
      ${memberRow({ name: "Felix Serrano", email: "felix@sunveon.com", role: "Analyst", sb: 0, rv: 1, when: "3d ago" })}
    </tbody>
  </table>
</section>
<p class="t-meta" style="margin-top:12px;line-height:1.6">
  Ana and Diego see the engineering Suite; Marta and Felix see the financial one. Combined metrics only appear for members who hold both —
  a member without ReveNew is never shown revenue through a combined figure.
</p>

${sec({ label: "Project capabilities", sub: "Every project belongs to the Suite. What varies is which product capabilities are enabled on it." })}
<div style="display:flex;gap:18px">
  ${[["24", "Suite projects", src("suite")], ["11", "Both capabilities", src("combined")],
     ["5", "Engineering only", src("storebrid")], ["8", "Financial only", src("revenew")]].map(([n, l, s]) => `
    <div class="wash" style="flex:1;min-width:0;padding:18px 20px">
      <div style="font-size:28px;font-weight:700;letter-spacing:-.026em;color:var(--s900);font-variant-numeric:tabular-nums">${n}</div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:10px">
        <span class="t-meta">${l}</span>${s}
      </div>
    </div>`).join("")}
</div>`,
});
writeFileSync("Administration.dc.html", admin);
console.log("Administration.dc.html", admin.length);



/* ═══════════════════════════════════════════════════════════════
   THE PROJECT MODEL, CORRECTED
   There is ONE Suite project. It is created once, in the Suite, and
   carries the shared context both products read. A licence decides
   which capabilities a user sees — never which project they own.
   Nothing here connects, links or maps two records together.
   ═══════════════════════════════════════════════════════════════ */

/* A drawn map, not a tile service — the artboard has no network.
   Iberia across lon −10…4, lat 36…44. Sevilla sits where it should. */

const mapControl = (glyph, label) => `
<button aria-label="${label}" style="width:28px;height:28px;display:flex;align-items:center;justify-content:center;
  border-radius:8px;font-size:15px;font-weight:600;color:var(--s700);border:1px solid rgba(255,255,255,.9);
  background:linear-gradient(168deg,rgba(255,255,255,.9),rgba(255,255,255,.72));
  box-shadow:0 0 0 1px rgba(14,157,168,.1), var(--sh-xs);cursor:pointer">${glyph}</button>`;

const capabilityCard = ({ name, product, dot, desc, state }) => `
<div class="glass-sm" style="flex:1;min-width:0;padding:18px 20px">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
    <span style="display:inline-flex;align-items:center;gap:9px">
      <span style="width:30px;height:30px;flex:none;border-radius:9px;display:flex;align-items:center;justify-content:center;
            background:${dot}1a;color:${dot}">${ic(name === "Engineering" ? "sliders" : "trend", 16)}</span>
      <span>
        <span style="display:block;font-size:14px;font-weight:600;color:var(--s900)">${name}</span>
        <span class="src" style="margin-top:3px"><i style="background:${dot}"></i>${product}</span>
      </span>
    </span>
    ${state === "on"
      ? badge("Available", "#0E9469", "rgba(16,185,129,.11)")
      : badge("Not licensed", "#54617A", "rgba(30,58,138,.06)")}
  </div>
  <p style="font-size:12.5px;color:var(--s500);line-height:1.55;margin-top:12px">${desc}</p>
</div>`;

const createProject = doc({
  w: 1440, h: 1400, side: rootSide("projects"),
  body: `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Projects</a><span class="sep">${ic("right", 12, 2)}</span><b>New project</b>`,
  eyebrow: "Shared project context · used across your Sunveon products",
  title: "Create project",
  actions: `<button class="btn btn-ghost">Cancel</button>
            <button class="btn btn-primary">${ic("check", 16, 1.9)}Create project</button>`,
})}

<section class="panel" style="padding:26px 28px">
  <div style="display:flex;align-items:baseline;justify-content:space-between;gap:16px">
    <div>
      <div class="band" style="color:var(--su700)">Project details</div>
      <p class="t-meta" style="font-size:12px;margin-top:7px">Name, type and currency. Entered once — no product asks for them again.</p>
    </div>
    ${src("suite")}
  </div>
  <div style="display:flex;gap:20px;margin-top:20px">
    ${field("Project name", "Andalucía Solar + BESS", { req: true, help: "Must be unique across your company" })}
    ${field("Type", "Hybrid", { req: true, chev: true, help: "Hybrid combines generation and storage" })}
    ${field("Currency", "EUR — Euro", { req: true, chev: true, help: "Used across every product in this project" })}
  </div>
</section>

<section class="panel lift" style="padding:26px 28px;margin-top:22px">
  <div style="display:flex;align-items:baseline;justify-content:space-between;gap:16px">
    <div>
      <div class="band" style="color:var(--su700)">Project location</div>
      <p class="t-meta" style="font-size:12px;margin-top:7px">Coordinates of the site. Type the values or drag the pin.</p>
    </div>
    ${src("suite")}
  </div>
  <div style="display:flex;gap:28px;margin-top:20px;align-items:flex-start">
    <div style="width:300px;flex:none">
      ${field("Latitude", "37.3891", { req: true, unit: "°", help: "Degrees north of the equator" })}
      ${field("Longitude", "−5.9845", { req: true, unit: "°", help: "Degrees east of Greenwich" })}
      <div style="display:flex;gap:10px;margin-top:6px">
        <button class="btn btn-secondary" style="height:34px;padding:0 12px;font-size:12.5px;flex:1">${ic("gauge", 15)}Get location</button>
        <button class="btn btn-ghost" style="height:34px;padding:0 12px;font-size:12.5px">Reset</button>
      </div>
      <div class="wash" style="padding:13px 15px;margin-top:18px">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="color:var(--su600);display:flex">${ic("link", 14, 1.8)}</span>
          <span style="font-size:12px;font-weight:600;color:var(--s900)">Shared across the Suite</span>
        </div>
        <p style="font-size:11.5px;color:var(--s500);line-height:1.55;margin-top:8px">
          The location belongs to the project, so product-specific calculations and market context read the same coordinates.
        </p>
        <p style="font-size:11.5px;color:var(--s500);line-height:1.55;margin-top:9px;display:flex;align-items:flex-start;gap:7px">
          <span style="flex:none;margin-top:4px"><i style="width:4px;height:4px;border-radius:50%;background:${SB};display:block"></i></span>
          <span>In Engineering it selects the meteorological series every simulation in this project runs on.</span>
        </p>
      </div>
    </div>
    <div style="flex:1;min-width:0;position:relative;border-radius:var(--r-sm);overflow:hidden;
         border:1px solid rgba(255,255,255,.9);box-shadow:0 0 0 1px rgba(14,157,168,.12), var(--sh-sm)">
      ${siteMap()}
      <div style="position:absolute;top:12px;right:12px;display:flex;flex-direction:column;gap:6px">
        ${mapControl("+", "Zoom in")}${mapControl("−", "Zoom out")}
      </div>
      <div style="position:absolute;left:12px;bottom:12px;display:flex;align-items:center;gap:10px;padding:9px 13px;border-radius:10px;
           background:linear-gradient(168deg,rgba(255,255,255,.92),rgba(255,255,255,.76));
           border:1px solid rgba(255,255,255,.95);box-shadow:0 0 0 1px rgba(14,157,168,.1), var(--sh-sm)">
        <i style="width:7px;height:7px;border-radius:50%;background:var(--su);display:block;flex:none"></i>
        <span style="font-size:12.5px;font-weight:600;color:var(--s900)">Sevilla, Spain</span>
        <span style="font-size:11.5px;color:var(--s400);font-variant-numeric:tabular-nums">37.3891, −5.9845</span>
      </div>
    </div>
  </div>
</section>

<section style="margin-top:22px">
  ${sec({ label: "Available capabilities", top: 0,
    sub: "What this project will be able to use once it exists. Nothing to choose — your licences already decide it." })}
  <div style="display:flex;gap:18px">
    ${capabilityCard({ name: "Engineering", product: "StoreBrid", dot: SB, state: "on",
      desc: "Plant configuration, dispatch simulations, technical results — configured inside the project after it is created." })}
    ${capabilityCard({ name: "Financial", product: "ReveNew", dot: RN, state: "on",
      desc: "Market assumptions, contracts, revenue cases and the financial model — configured inside the project after it is created." })}
  </div>
  <p class="t-meta" style="margin-top:14px;line-height:1.6">
    Creating this takes you straight to the project overview. There is no second project to make, and nothing to join together afterwards.
  </p>
</section>`,
});
writeFileSync("CreateProject.dc.html", createProject);

/* ── §19 · a shared project that exists but has no domain work yet ── */
const nextStep = ({ name, product, dot, body, action, tone }) => `
<div class="glass-sm" style="flex:1;min-width:0;padding:22px 24px;display:flex;flex-direction:column">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
    <span style="display:inline-flex;align-items:center;gap:10px">
      <span style="width:32px;height:32px;flex:none;border-radius:10px;display:flex;align-items:center;justify-content:center;
            background:${dot}1a;color:${dot}">${ic(tone, 17)}</span>
      <span class="t-card" style="font-size:15px">${name}</span>
    </span>
    <span class="src"><i style="background:${dot}"></i>${product}</span>
  </div>
  <div style="display:flex;align-items:center;gap:9px;margin-top:16px">
    <i style="width:5px;height:5px;border-radius:50%;background:var(--s300);display:block"></i>
    <span style="font-size:12.5px;font-weight:500;color:var(--s500)">Not configured yet</span>
  </div>
  <p style="font-size:12.5px;color:var(--s500);line-height:1.6;margin-top:10px;flex:1">${body}</p>
  <button class="btn btn-secondary" style="margin-top:16px;align-self:flex-start">${action}${ic("upRight", 14, 1.8)}</button>
</div>`;

/* §15-§16 · Onboarding used to end at two links out and leave the user in
   whichever product they clicked. It is a three-phase loop instead: each
   engine configures its own half, and the third phase is the Suite claiming
   the analysis back the moment both halves exist. The third step is not a
   fourth link — it is the reason the first two were worth doing. */
const stepCard = ({ n, name, product, dot, body, action, state }) => {
  const done = state === "done", live = state === "live", wait = state === "wait";
  return `
<div class="${live ? "glass-sm" : "wash"}" style="flex:1;min-width:0;padding:20px 22px;display:flex;flex-direction:column;
     ${live ? "box-shadow:0 0 0 1px rgba(14,157,168,.28), var(--sh-sm), inset 0 1px 0 rgba(255,255,255,.92)" : ""}${wait ? "opacity:.62" : ""}">
  <span style="display:flex;align-items:center;gap:10px">
    <span style="width:22px;height:22px;flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;
          font-size:11px;font-weight:700;${done ? `background:${SU};color:#fff` : `background:rgba(30,58,138,.07);color:var(--s500)`}">
      ${done ? ic("check", 12, 3) : n}</span>
    <span style="flex:1;min-width:0;font-size:14px;font-weight:600;color:var(--s900)">${name}</span>
    ${dot ? `<span class="src"><i style="background:${dot}"></i>${product}</span>` : src("suite")}
  </span>
  <p class="t-meta" style="margin-top:11px;line-height:1.6;flex:1">${body}</p>
  <span style="display:block;margin-top:14px">
    ${done
      ? `<span class="cov" style="border-color:rgba(14,157,168,.3);background:linear-gradient(168deg,rgba(14,157,168,.1),rgba(14,157,168,.05));color:var(--su700)"><i style="background:${SU}"></i>${product} ready</span>`
      : wait
        ? `<span class="t-meta">Waiting for the other side</span>`
        : `<button class="btn ${live ? "btn-primary" : "btn-secondary"}" style="height:34px;font-size:12.5px">${action}${dot ? ic("upRight", 13, 1.8) : ic("right", 13, 2)}</button>`}
  </span>
</div>`;
};

const setupLoop = (stage) => {
  const sb = stage === "partial" || stage === "ready", rn = stage === "ready";
  return `
<section class="panel lift" style="padding:26px 28px">
  <div style="display:flex;align-items:baseline;justify-content:space-between;gap:16px">
    <div>
      <h2 class="t-sec">${stage === "ready" ? "Your first analysis is ready" : "Start configuring your project"}</h2>
      <p style="font-size:13px;color:var(--s500);line-height:1.6;margin-top:8px;max-width:88ch">
        ${stage === "ready"
          ? "Both halves now exist, so the pairing the Suite is for can finally be made. Nothing was modelled here — this is the first technical × financial combination of what the two products already built."
          : stage === "partial"
            ? "Engineering has run its first simulation. The Suite has nothing to pair it with until a financial case exists, so the analysis stays out of reach until then."
            : "The project exists and both products can already see it. Each domain configures its own half; the shared details are done."}
      </p>
    </div>
    ${src("suite")}
  </div>
  <div style="display:flex;gap:16px;margin-top:22px;align-items:stretch">
    ${stepCard({ n: 1, name: "Configure engineering", product: "StoreBrid", dot: SB,
      body: "Plant layout, BESS sizing, losses and cycling limits — then the first dispatch simulation.",
      action: "Open StoreBrid", state: sb ? "done" : "live" })}
    ${stepCard({ n: 2, name: "Configure the financial model", product: "ReveNew", dot: RN,
      body: "Price curves, market assumptions and contracts — then the first financial case.",
      action: "Open ReveNew", state: rn ? "done" : sb ? "live" : "" })}
    ${stepCard({ n: 3, name: "Analyse the project", product: "Suite", dot: null,
      body: rn
        ? "Pair the simulation with the financial case, explore every combination, and compare what each trade-off costs and returns."
        : "Pairing needs one of each. This step opens by itself once both sides exist — the Suite never models either half.",
      action: "Open analysis", state: rn ? "live" : "wait" })}
  </div>
  ${stage !== "empty" ? `
  <div style="display:flex;align-items:center;gap:12px;margin-top:18px;padding:13px 18px;border-radius:var(--r-xs);
       background:linear-gradient(168deg,rgba(14,157,168,.05),rgba(255,255,255,0) 76%);box-shadow:inset 0 0 0 1px rgba(14,157,168,.14)">
    <span style="color:var(--su700);display:flex;flex:none">${ic(rn ? "gauge" : "clock", 15)}</span>
    <span style="flex:1;min-width:0;font-size:12.5px;color:var(--s700);line-height:1.5">
      ${rn
        ? "<b style=\"font-weight:600\">Base case 2027</b> × <b style=\"font-weight:600\">Base market</b> — your first technical × financial combination is ready to open."
        : "Engineering ready · financial model missing. Come back here, or the Suite will claim the analysis the moment ReveNew has a case."}
    </span>
    ${rn ? `<button class="btn btn-primary" style="flex:none;height:32px;font-size:12.5px">${ic("gauge", 14)}Open analysis${ic("right", 13, 2)}</button>` : ""}
  </div>` : ""}
</section>`;
};

const projectNewBody = (stage = "empty") => `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Projects</a><span class="sep">${ic("right", 12, 2)}</span><b>Andalucía Solar + BESS</b>`,
  eyebrow: "Suite project · created 2 minutes ago",
  title: "Andalucía Solar + BESS",
  meta: `<span style="display:inline-flex;align-items:center;gap:12px;flex-wrap:wrap">
           <span>Spain · Hybrid · Sevilla · EUR</span>
           ${badge("New project", "#0A6E77", "rgba(14,157,168,.12)")}${cov(1, 1)}</span>`,
  actions: `<button class="btn btn-ghost btn-icon">${ic("dots", 18)}</button>`,
})}

${setupLoop(stage)}

<div style="display:flex;gap:26px;margin-top:30px;align-items:flex-start">
  <section style="flex:1.25;min-width:0">
    ${sec({ label: "Shared project context", top: 0, source: src("suite"),
      sub: "Owned by the Suite. Both products read these values; neither asks for them again." })}
    <div class="panel" style="padding:8px 24px">
      <div class="rows">
        ${[["Project name", "Andalucía Solar + BESS"], ["Type", "Hybrid — generation and storage"],
           ["Currency", "EUR — Euro"], ["Country", "Spain"],
           ["Coordinates", "37.3891, −5.9845 · Sevilla"], ["Created by", "Victor Andújar · 21 August 2026"]].map(([k, v]) => `
          <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 0">
            <span style="font-size:12.5px;color:var(--s500)">${k}</span>
            <span style="font-size:13.5px;font-weight:500;color:var(--s900);text-align:right;font-variant-numeric:tabular-nums">${v}</span>
          </div>`).join("")}
      </div>
    </div>
  </section>
  <section style="flex:1;min-width:0">
    ${sec({ label: "Project activity", top: 0 })}
    <div class="rows">
      ${activityRow({ what: "Project created", project: "Victor Andújar", source: src("suite"), when: "2m ago" })}
    </div>
    <div class="wash" style="padding:18px 20px;margin-top:18px">
      <p style="font-size:12.5px;color:var(--s500);line-height:1.6">
        Once Engineering runs its first simulation and Finance builds its first revenue case, this timeline carries both —
        and the overview gains the combined figures that need one of each.
      </p>
    </div>
  </section>
</div>`;

const PNB = { w: 1440, h: 1080,
  side: projectSide("overview", "both", "Andalucía Solar + BESS", "Spain · Hybrid · not configured") };
writeFileSync("ProjectNew.dc.html", doc({ ...PNB, body: projectNewBody("empty") }));
writeFileSync("ProjectAnalysisReady.dc.html", doc({ ...PNB, h: 1140, body: projectNewBody("ready") }));
console.log("CreateProject.dc.html · ProjectNew.dc.html · ProjectAnalysisReady.dc.html");


/* ── §29 · the SAME Suite project, seen through a licence ────────
   Valencia BESS on all three. Nothing is missing from the project;
   what varies is which capabilities the viewer holds. No connect
   prompts, no withheld-combined slot, no upsell — each page is
   complete for the person looking at it.                          */
function valenciaView({ caps, h, kpis, band, activity, rvFocus }) {
  return doc({
    w: 1440, h, side: projectSide("overview", caps), rvFocus,
    body: `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Projects</a><span class="sep">${ic("right", 12, 2)}</span><b>Valencia BESS</b>`,
  eyebrow: "Suite project",
  title: "Valencia BESS",
  meta: `<span style="display:inline-flex;align-items:center;gap:12px;flex-wrap:wrap">
           <span>Spain · BESS · 100 MW / 200 MWh · COD 2027</span>${ST.active}</span>`,
  actions: `<button class="btn btn-secondary"><i style="width:6px;height:6px;border-radius:50%;background:${caps === "rv" ? RN : SB};display:block"></i>Open in ${caps === "rv" ? "ReveNew" : "StoreBrid"}${ic("upRight", 14, 1.8)}</button>
            <button class="btn btn-ghost btn-icon">${ic("dots", 18)}</button>`,
})}
<div class="kpirow">${kpis}</div>
<section class="panel lift" style="padding:26px 28px;margin-top:28px">${band}</section>
${sec({ label: "Project activity", right: `<a href="#" style="font-size:13px;font-weight:500">View all</a>` })}
<div class="rows">${activity}</div>`,
  });
}

const valenciaSB = valenciaView({
  caps: "sb", h: 1300,
  kpis: kpi({ label: "Cycles / year", value: "326", source: src("storebrid"), delta: "+12" })
      + kpi({ label: "Energy discharged", value: "65.2 GWh", source: src("storebrid"), delta: "+4.1%" })
      + kpi({ label: "Utilisation", value: "74%", source: src("storebrid"), delta: "+2 pp" })
      + kpi({ label: "Round-trip efficiency", value: "88%", source: src("storebrid"), delta: "+1 pp" }),
  band: perfBand({
    tone: "sb", band: "Technical performance", label: "What the asset does",
    sub: "Highest-spread day this month. The state of charge below is derived from the same schedule.",
    source: src("storebrid"),
    legendItems: [["Charging", "#5B8DEF"], ["Discharging", "#1D4ED8"], ["State of charge", "#54617A", true]],
    chart: dispatchChart(700),
    stats: [["Energy discharged", "65.2", "GWh / yr"], ["Full cycles", "326", "/ yr"],
            ["Peak discharge", "70", "MW"], ["State of charge range", "2 – 98", "%"]],
  }),
  activity: activityRow({ what: "Simulation “Base case 2027” completed", project: "Ana Ruiz", source: src("storebrid"), when: "2h ago" })
          + activityRow({ what: "Technical variant “4 h duration” started", project: "Ana Ruiz", source: src("storebrid"), when: "4h ago" })
          + activityRow({ what: "Plant configuration changed — round-trip 87% → 88%", project: "Ana Ruiz", source: src("storebrid"), when: "2d ago" })
          + activityRow({ what: "Dispatch results exported", project: "Victor Andújar", source: src("storebrid"), when: "3d ago" })
          + activityRow({ what: "Project created", project: "Victor Andújar", source: src("suite"), when: "8mo ago" }),
});
writeFileSync("ProjectStoreBrid.dc.html", valenciaSB);

const valenciaRV = valenciaView({
  caps: "rv", h: 1300, rvFocus: true,
  kpis: kpi({ label: "IRR", value: "12.8%", source: src("revenew"), delta: "+0.4 pp" })
      + kpi({ label: "Annual revenue", value: "€8.42M", source: src("revenew"), delta: "+3.1%" })
      + kpi({ label: "CAPEX", value: "€42.1M", source: src("revenew") })
      + kpi({ label: "Capture price", value: "€118.4", source: src("revenew"), delta: "+2.6%" }),
  band: perfBand({
    tone: "rv", band: "Financial performance", label: "What it earns",
    sub: "Base case. The dashed line is the same asset with no PPA, recomputed hour by hour at market price.",
    source: src("revenew"),
    legendItems: [["Contracted (PPA)", "#7B2D80"], ["Merchant", "#C74FC9"], ["Without PPA", "#54617A", true]],
    chart: revenueChart(700),
    stats: [["Contracted (PPA)", "€5.2", "M / yr"], ["Merchant", "€3.2", "M / yr"],
            ["Capture price", "118.4", "€/MWh"], ["Spot average", "71.4", "€/MWh"], ["Capture rate", "166", "%"]],
  }),
  activity: activityRow({ what: "PPA contract “Iberdrola 2026–31” changed", project: "Victor Andújar", source: src("revenew"), when: "3h ago" })
          + activityRow({ what: "Financial scenario “High spread” updated", project: "Victor Andújar", source: src("revenew"), when: "5h ago" })
          + activityRow({ what: "Financial model recalculated", project: "System", source: src("revenew"), when: "Yesterday" })
          + activityRow({ what: "Financial scenario “Merchant upside” created", project: "Marta Gil", source: src("revenew"), when: "4d ago" })
          + activityRow({ what: "Project created", project: "Victor Andújar", source: src("suite"), when: "8mo ago" }),
});
writeFileSync("ProjectReveNew.dc.html", valenciaRV);

/* ── §24 · states, with the connection model removed ─────────── */
const stateCard = ({ n, title, when, body, action, tone, source, wide }) => `
<div class="panel" style="${wide ? "flex:1.6" : "flex:1"};min-width:0;padding:22px 24px;display:flex;flex-direction:column">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
    <span style="display:inline-flex;align-items:center;gap:10px">
      <span style="width:30px;height:30px;flex:none;border-radius:9px;display:flex;align-items:center;justify-content:center;
            background:${tone === "warn" ? "rgba(245,158,11,.13)" : tone === "rv" ? "rgba(175,71,178,.11)" : tone === "su" ? "rgba(14,157,168,.13)" : "rgba(37,99,235,.10)"};
            color:${tone === "warn" ? "#9A6208" : tone === "rv" ? "var(--rv600)" : tone === "su" ? "var(--su700)" : "var(--b700)"}">${ic(n, 16)}</span>
      <span class="t-card" style="font-size:14.5px">${title}</span>
    </span>
    ${source || ""}
  </div>
  <p style="font-size:12.5px;color:var(--s500);line-height:1.6;margin-top:12px;flex:1">${body}</p>
  <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:14px">
    <span class="t-meta">${when}</span>
    <a href="#" style="font-size:12.5px;font-weight:500;display:inline-flex;align-items:center;gap:5px">${action}${ic("right", 13, 2)}</a>
  </div>
</div>`;

const states = sheet({
  w: 1440, h: 900,
  body: `
<p style="margin:0 0 8px;color:var(--su700);font-weight:600;letter-spacing:.08em;text-transform:uppercase;font-size:11px">Resilience</p>
<h1 class="t-page">Empty, partial and unavailable</h1>
<p class="t-body" style="color:var(--s500);margin-top:10px;max-width:90ch">
  Every state names what is missing and the one thing that changes it. None of them is a dead end.
  None of them describes a project as incomplete — the project is always whole; only the work inside a domain, or the viewer's licence, varies.
</p>

<div style="display:flex;gap:20px;margin-top:28px;align-items:stretch">
  ${stateCard({ n: "projects", tone: "su", title: "No projects yet", when: "New organisation", source: src("suite"),
    body: "Everything hangs off a project — the portfolio, the analytics, both product workspaces. Create the first one and it exists for every product you hold.",
    action: "Create project" })}
  ${stateCard({ n: "sliders", tone: "sb", title: "Engineering not configured", when: "Andalucía Solar + BESS", source: src("storebrid"),
    body: "The project exists and StoreBrid can see it, but the plant has not been laid out yet. Nothing is missing from the project itself.",
    action: "Configure plant" })}
  ${stateCard({ n: "trend", tone: "rv", title: "Financial model not configured", when: "Andalucía Solar + BESS", source: src("revenew"),
    body: "Price curves and market assumptions have not been set. Revenue, IRR and the financial model appear once they are.",
    action: "Configure assumptions" })}
</div>

<div style="display:flex;gap:20px;margin-top:20px;align-items:stretch">
  ${stateCard({ n: "activity", tone: "sb", title: "No simulation yet", when: "Zaragoza Wind + BESS", source: src("storebrid"),
    body: "Plant configuration is complete but nothing has been dispatched, so there is no throughput, no cycle count and nothing for the financial side to read.",
    action: "Run first simulation" })}
  ${stateCard({ n: "gauge", tone: "warn", title: "Combined metric does not apply", when: "Porto PV", source: src("combined"),
    body: "Revenue per MWh discharged needs a discharge. A solar project without storage has none — so the metric is withheld rather than shown as zero.",
    action: "About combined metrics" })}
  ${stateCard({ n: "clock", tone: "warn", title: "Awaiting recalculation", when: "Valencia BESS · 2 days", source: src("revenew"),
    body: "A technical input moved and the revenue case has not been re-run since. The figure shown is the last trustworthy one, dated — not a fresh one.",
    action: "Review impact" })}
</div>

<div style="display:flex;gap:20px;margin-top:20px;align-items:stretch">
  ${stateCard({ n: "alert", tone: "warn", title: "ReveNew is unavailable", when: "Forecast editor", wide: true, source: src("revenew"),
    body: "The financial editor did not load. Nothing was changed, and the work is still reachable directly in ReveNew while the Suite retries. The rest of the project is unaffected.",
    action: "Open in ReveNew" })}
  ${stateCard({ n: "sliders", tone: "su", title: "Capability not licensed", when: "A member without ReveNew", wide: true, source: src("suite"),
    body: "Financial capabilities are simply absent for that member — no padlocked navigation, no empty dashboards, and no combined metric that would leak revenue they cannot access. Their project pages are complete, not partial. The Applications list is the one place an unlicensed product is named at all.",
    action: "Request access" })}
</div>`,
});
writeFileSync("States.dc.html", states);
console.log("ProjectStoreBrid/ReveNew (capability views) ·", "States.dc.html", states.length);


/* ═══════════════════════════════════════════════════════════════
   FILES — Suite-owned. The shared library both products read from.
   Teal identity throughout; product colour appears only in "Used by".
   ═══════════════════════════════════════════════════════════════ */
const FSTATE = {
  ready:      badge("Ready", "#0E9469", "rgba(16,185,129,.11)"),
  processing: badge("Processing", "#1D4ED8", "rgba(37,99,235,.10)"),
  uploading:  badge("Uploading", "#0A6E77", "rgba(14,157,168,.13)"),
  error:      badge("Could not process", "#C22222", "rgba(220,38,38,.10)"),
};
const usedByTag = (who) => {
  if (who === "sb") return `<span class="cov"><i style="background:${SB}"></i>StoreBrid</span>`;
  if (who === "rv") return `<span class="cov"><i style="background:${RN}"></i>ReveNew</span>`;
  if (who === "both") return `<span class="cov"><span style="display:inline-flex;width:10px;height:4px;position:relative">
      <i style="position:absolute;left:0;top:0;background:${SB}"></i><i style="position:absolute;left:4px;top:0;background:${RN};box-shadow:0 0 0 1.5px rgba(255,255,255,.85)"></i>
    </span>Both</span>`;
  return `<span class="cov"><i style="background:${SU}"></i>Suite</span>`;
};
const FILEICON = { Prices: "euro", Generator: "zap", Production: "sun", Revenue: "trend",
  Template: "file", Contract: "file", Technical: "sliders", Demand: "activity", Other: "file" };

const fileRow = ({ name, type, used, who, size, when, state, sub, rel, act }) => `
<tr>
  <td>
    <div style="display:flex;align-items:center;gap:12px">
      <span style="width:32px;height:32px;flex:none;border-radius:9px;display:flex;align-items:center;justify-content:center;
            background:linear-gradient(168deg,rgba(255,255,255,.7),rgba(255,255,255,.46));
            box-shadow:0 0 0 1px rgba(14,157,168,.12);color:var(--su700)">${ic(FILEICON[type] || "file", 15)}</span>
      <span style="min-width:0">
        <span class="anchor" style="display:block;font-family:ui-monospace,Menlo,monospace;font-size:13px">${name}</span>
        <span class="t-meta" style="display:block;margin-top:3px">${sub ? sub : rel ? `Related to ${rel}` : "Not linked to a simulation or scenario yet"}</span>
      </span>
    </div>
  </td>
  <td class="t-tbl">${type}</td>
  <td>${usedByTag(who)}</td>
  <td class="t-tbl">${used}</td>
  <td class="t-meta num">${when}</td>
  <td class="t-tbl num">${size}</td>
  <td>${state}</td>
  <td style="text-align:right;white-space:nowrap">
    ${act ? `<a href="#" style="font-size:12px;font-weight:500;margin-right:12px">${act}</a>` : ""}
    <span style="color:var(--s400);display:inline-flex;vertical-align:middle">${ic("dots", 16)}</span>
  </td>
</tr>`;

const FILEROWS =
  fileRow({ name: "iberia_prices_2027.csv", type: "Prices", who: "rv", used: "Victor Andújar", size: "4.2 MB", when: "2h ago", state: FSTATE.ready, rel: "Base market · High spread · Low spread", act: "Replace" }) +
  fileRow({ name: "generator_profile_v2.csv", type: "Generator", who: "sb", used: "Ana Ruiz", size: "12.4 MB", when: "Yesterday", state: FSTATE.ready, rel: "Base case 2027 and its 2 variants", act: "Replace" }) +
  fileRow({ name: "production_profile_2026.csv", type: "Production", who: "both", used: "System", size: "8.1 MB", when: "4d ago", state: FSTATE.ready, rel: "the whole project" }) +
  fileRow({ name: "ppa_iberdrola_2026_31.pdf", type: "Contract", who: "rv", used: "Victor Andújar", size: "1.8 MB", when: "1w ago", state: FSTATE.ready, rel: "Base market · High spread" }) +
  fileRow({ name: "capex_template.xlsx", type: "Template", who: "rv", used: "Marta Gil", size: "860 KB", when: "1w ago", state: FSTATE.ready, rel: "the financial model" }) +
  fileRow({ name: "bess_losses_curve.csv", type: "Technical", who: "sb", used: "Ana Ruiz", size: "320 KB", when: "2w ago", state: FSTATE.ready, rel: "Base case 2027" }) +
  fileRow({ name: "demand_profile_draft.csv", type: "Demand", who: "sb", used: "Diego Sanz", size: "6.7 MB", when: "Just now", state: FSTATE.processing, sub: "Checking columns and time-step" }) +
  fileRow({ name: "prices_2028_draft.csv", type: "Prices", who: "rv", used: "Victor Andújar", size: "3.9 MB", when: "3d ago", state: FSTATE.error, sub: "Missing timestamp column · row 1", act: "Replace file" });

const filesBody = ({ drawer }) => `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Projects</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Valencia BESS</a><span class="sep">${ic("right", 12, 2)}</span><b>Files</b>`,
  eyebrow: `<span style="display:inline-flex;align-items:center;gap:9px">Project library ${src("suite")}</span>`,
  title: "Files",
  meta: "Datasets, templates and documents used across this project. Both products read from here.",
  actions: `<button class="btn btn-primary">${ic("plus", 16, 1.9)}Upload file</button>`,
})}
<div style="display:flex;align-items:center;gap:26px;margin-bottom:22px">
  ${[["24", "files"], ["148 MB", "stored"], ["2h ago", "last updated"]].map(([v, l]) => `
    <span style="display:inline-flex;align-items:baseline;gap:7px">
      <b style="font-size:15px;font-weight:600;color:var(--s900);font-variant-numeric:tabular-nums">${v}</b>
      <span class="t-meta">${l}</span>
    </span>`).join('<span style="width:1px;height:14px;background:var(--hair);display:block"></span>')}
</div>
<div style="display:flex;align-items:center;gap:14px;margin-bottom:18px;flex-wrap:wrap">
  <div class="search" style="flex:1;max-width:300px">${ic("search", 16)}<span>Search files…</span></div>
  <div class="tabs">
    <a href="#" class="on">All <span class="count">24</span></a>
    <a href="#">Prices <span class="count">6</span></a>
    <a href="#">Production <span class="count">5</span></a>
    <a href="#">Technical <span class="count">4</span></a>
    <a href="#">Contracts <span class="count">3</span></a>
    <a href="#">Templates <span class="count">2</span></a>
  </div>
  <button class="btn btn-secondary" style="margin-left:auto">${ic("clock", 15)}Last updated${ic("down", 15, 1.8)}</button>
</div>
<section class="panel${drawer ? "" : " lift"}" style="overflow:hidden">
  <table class="tbl">
    <thead><tr>
      <th style="width:30%">Name and what reads it</th><th style="width:11%">Type</th><th style="width:12%">Used by</th>
      <th style="width:13%">Uploaded by</th><th style="width:9%;text-align:right">Updated</th>
      <th style="width:8%;text-align:right">Size</th><th style="width:12%">Status</th><th style="width:8%"></th>
    </tr></thead>
    <tbody>${FILEROWS}</tbody>
  </table>
</section>
<p class="t-meta" style="margin-top:14px;line-height:1.6">
  “Used by” records which product reads a file — it does not move or copy anything. A file marked Both is read by each product from the same place.
  Replacing a file keeps its type, its project and everything that already points at it.
</p>`;

const files = doc({ w: 1440, h: 1140, side: projectSide("files"), body: filesBody({ drawer: false }) });
writeFileSync("Files.dc.html", files);

/* ── §23–§27 · upload as a focused Suite drawer ────────────────── */
const drawerField = (label, value, { req, chev, help, ph } = {}) => `
<div>
  <span style="display:block;font-size:12px;font-weight:600;color:var(--s700);margin-bottom:7px">
    ${label}${req ? `<span style="color:var(--rv600);margin-left:3px">*</span>` : ""}</span>
  <div style="display:flex;align-items:center;height:40px;padding:0 13px;gap:9px;border-radius:var(--r-xs);font-size:13.5px;
       color:${ph ? "var(--s400)" : "var(--s900)"};
       background:linear-gradient(168deg,rgba(255,255,255,.66),rgba(255,255,255,.46));border:1px solid rgba(255,255,255,.88);
       box-shadow:0 0 0 1px rgba(14,157,168,.09), inset 0 1px 0 rgba(255,255,255,.92)">
    <span style="flex:1;min-width:0">${value}</span>
    ${chev ? `<span style="color:var(--s400);display:flex">${ic("down", 15, 1.8)}</span>` : ""}
  </div>
  ${help ? `<span style="display:block;font-size:11px;color:var(--s400);margin-top:7px;line-height:1.45">${help}</span>` : ""}
</div>`;

const uploadDrawer = () => capabilityModal({
  title: "Upload file", context: "Valencia BESS", source: src("suite"),
  accent: SU, width: 620,
  footNote: "Nothing is shared until the file finishes processing.",
  cancel: "Cancel", confirm: "Upload",
  body: `
  <div style="padding:22px;display:flex;flex-direction:column;gap:20px">
    <div style="border-radius:var(--r-sm);padding:26px 20px;text-align:center;
         background:linear-gradient(168deg,rgba(14,157,168,.05),rgba(255,255,255,0) 70%);
         box-shadow:inset 0 0 0 1.5px rgba(14,157,168,.22)">
      <span style="width:40px;height:40px;margin:0 auto;border-radius:11px;display:flex;align-items:center;justify-content:center;
            background:rgba(14,157,168,.13);color:var(--su700)">${ic("arrowDown", 20)}</span>
      <div style="font-size:13.5px;font-weight:600;color:var(--s900);margin-top:12px">Drop file here</div>
      <div class="t-meta" style="margin-top:5px">or <a href="#" style="font-size:11px;font-weight:500">browse</a> · CSV, XLSX, JSON and other supported project formats</div>
    </div>

    <div class="wash" style="display:flex;align-items:center;gap:13px;padding:14px 16px">
      <span style="width:34px;height:34px;flex:none;border-radius:9px;display:flex;align-items:center;justify-content:center;
            background:rgba(255,255,255,.7);box-shadow:0 0 0 1px rgba(14,157,168,.12);color:var(--su700)">${ic("euro", 16)}</span>
      <span style="flex:1;min-width:0">
        <span style="display:block;font-family:ui-monospace,Menlo,monospace;font-size:12.5px;font-weight:500;color:var(--s900)">iberia_prices_2027.csv</span>
        <span class="t-meta" style="display:block;margin-top:3px">4.2 MB · ready to upload</span>
      </span>
      <span style="color:var(--s400);display:flex;flex:none">${closeX(15)}</span>
    </div>

    ${drawerField("File type", "Price data", { req: true, chev: true, help: "Tells the Suite what the file represents, so the right product can read it." })}
    ${drawerField("Project", "Valencia BESS", { chev: true, help: "Preselected because you started from inside this project." })}
    ${drawerField("Description", "Add a note or version reference", { ph: true })}
  </div>`,
});

const filesUpload = doc({ w: 1440, h: 1140, side: projectSide("files"),
  body: filesBody({ drawer: true }), overlay: uploadDrawer() });
console.log("Files.dc.html", files.length, "· FilesUpload.dc.html", filesUpload.length);


/* ═══════════════════════════════════════════════════════════════
   RESULTS — StoreBrid-owned. Technical only; no financial cards.
   ═══════════════════════════════════════════════════════════════ */
const mix = (a, b, t) => {
  const h = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  const [r1, g1, b1] = h(a), [r2, g2, b2] = h(b);
  return `rgb(${Math.round(r1 + (r2 - r1) * t)},${Math.round(g1 + (g2 - g1) * t)},${Math.round(b1 + (b2 - b1) * t)})`;
};
function dispatchHeatmap(w = 1040) {
  const L = 44, T = 12, cw = (w - L - 10) / 24, ch = 17;
  const H = T + 12 * ch + 26;
  const factor = GWH.map((g) => g / Math.max(...GWH));
  const cells = [];
  let vmax = 0;
  const grid = MONTHS.map((_, m) => DAY.map((v) => Math.max(0, v) * factor[m]));
  grid.forEach((row) => row.forEach((v) => { if (v > vmax) vmax = v; }));
  grid.forEach((row, m) => row.forEach((v, hh) => {
    const t = vmax ? v / vmax : 0;
    cells.push(`<rect class="mk" x="${(L + hh * cw).toFixed(1)}" y="${T + m * ch}" width="${(cw - 1.4).toFixed(1)}" height="${ch - 1.4}" rx="2"
      fill="${t < 0.02 ? "rgba(30,58,138,.04)" : mix("#E6EEFC", "#1D4ED8", 0.12 + t * 0.88)}"><title>${MONTHS[m]} · ${String(hh).padStart(2, "0")}:00 — ${v.toFixed(0)} MW discharged</title></rect>`);
  }));
  const ylabs = MONTHS.map((mn, m) =>
    `<text x="${L - 8}" y="${T + m * ch + 12}" text-anchor="end" font-size="9" fill="${AXIS}">${mn}</text>`).join("");
  const xlabs = [0, 4, 8, 12, 16, 20, 23].map((hh) =>
    `<text x="${(L + hh * cw + cw / 2).toFixed(1)}" y="${H - 10}" text-anchor="middle" font-size="9" fill="${AXIS}">${String(hh).padStart(2, "0")}</text>`).join("");
  return `
<svg viewBox="0 0 ${w} ${H}" width="100%" style="display:block" role="img" aria-label="Discharged power by hour of day and month">
  ${MKSTYLE}${cells.join("")}${ylabs}${xlabs}
</svg>`;
}
const heatLegend = () => `
<div style="display:flex;align-items:center;gap:10px">
  <span class="t-meta">0</span>
  <span style="width:110px;height:8px;border-radius:4px;display:block;
        background:linear-gradient(90deg,${mix("#E6EEFC", "#1D4ED8", .12)},${mix("#E6EEFC", "#1D4ED8", .55)},#1D4ED8)"></span>
  <span class="t-meta">70 MW discharged</span>
</div>`;



/* ═══════════════════════════════════════════════════════════════
   COMPARE — visual first, exact values on demand
   ═══════════════════════════════════════════════════════════════ */
function selScatter(w = 640) {
  const H = 320, L = 46, R = 90, T = 18, B = 40;
  const pw = w - L - R, ph = H - T - B;
  const x = (v) => L + ((v - 68) / 18) * pw;
  const y = (v) => T + ph - ((v - 8) / 7) * ph;
  const r = (mw) => 9 + ((mw - 60) / 50) * 8;
  const gx = [70, 75, 80, 85].map((g) =>
    `<line x1="${x(g).toFixed(1)}" y1="${T}" x2="${x(g).toFixed(1)}" y2="${T + ph}" stroke="${GRID}" stroke-width="1"/>
     <text x="${x(g).toFixed(1)}" y="${T + ph + 15}" text-anchor="middle" font-size="9.5" fill="${AXIS}">${g}%</text>`).join("");
  const gy = [9, 11, 13, 15].map((g) =>
    `<line x1="${L}" y1="${y(g).toFixed(1)}" x2="${w - R}" y2="${y(g).toFixed(1)}" stroke="${GRID}" stroke-width="1"/>
     <text x="${L - 9}" y="${(y(g) + 3.4).toFixed(1)}" text-anchor="end" font-size="9.5" fill="${AXIS}">${g}%</text>`).join("");
  const marks = CMPSEL.map((p) => `
    <circle class="mk" cx="${x(p.util).toFixed(1)}" cy="${y(p.irr).toFixed(1)}" r="${r(p.mw).toFixed(1)}"
      fill="#6D5AC6" fill-opacity=".62" stroke="#fff" stroke-width="2.2"><title>${p.name} — ${p.util}% utilisation · ${p.irr}% IRR · ${p.mw} MW</title></circle>
    <text x="${(x(p.util) + r(p.mw) + 8).toFixed(1)}" y="${(y(p.irr) + 4).toFixed(1)}" font-size="11" font-weight="600" fill="${INK}">${p.name}</text>`).join("");
  return `
<svg viewBox="0 0 ${w} ${H}" width="100%" style="display:block" role="img" aria-label="Battery utilisation against IRR for the three selected projects">
  ${MKSTYLE}${gx}${gy}${marks}
</svg>`;
}
const metricBars = (vals, fmt, best) => {
  const max = Math.max(...vals);
  return CMPSEL.map((p, i) => `
    <div style="display:flex;align-items:center;gap:16px;padding:11px 0">
      <span style="width:150px;flex:none;font-size:13px;font-weight:${i === best ? "600" : "500"};color:var(--s900)">${p.name}</span>
      <span style="flex:1;min-width:0;height:22px;display:block;position:relative">
        <span style="position:absolute;left:0;top:0;height:22px;width:${((vals[i] / max) * 100).toFixed(1)}%;border-radius:6px;display:block;
              background:linear-gradient(90deg,rgba(109,90,198,.72),rgba(109,90,198,.9));box-shadow:inset 0 1px 0 rgba(255,255,255,.24)"></span>
      </span>
      <span style="width:96px;flex:none;text-align:right;font-variant-numeric:tabular-nums;
            font-size:${i === best ? "15" : "14"}px;font-weight:${i === best ? "700" : "500"};color:var(--s900)">${fmt(vals[i])}</span>
    </div>`).join("");
};
const metricChip = (label, on) =>
  `<a href="#" class="${on ? "on" : ""}">${label}</a>`;

const compare = doc({
  w: 1440, h: 2100, side: rootSide("projects"),
  body: `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Projects</a><span class="sep">${ic("right", 12, 2)}</span><b>Compare</b>`,
  eyebrow: "Three projects with both capabilities · 2026",
  title: "Compare projects",
  actions: `<button class="btn btn-secondary">${ic("upRight", 16)}Export</button>
            <button class="btn btn-secondary">${ic("plus", 16, 1.9)}Add project</button>`,
})}
<div style="display:flex;align-items:center;gap:10px;margin-bottom:24px;flex-wrap:wrap">
  ${CMPSEL.map((p) => `
    <span class="glass-sm" style="display:inline-flex;align-items:center;gap:10px;padding:9px 13px">
      <span style="font-size:13px;font-weight:600;color:var(--s900)">${p.name}</span>
      <span class="t-meta">${p.mw} MW / ${p.mwh} MWh</span>
      <span style="color:var(--s400);display:flex">${closeX(13)}</span>
    </span>`).join("")}
</div>

<section class="panel combined" style="padding:22px 26px;border:1px solid rgba(255,255,255,.9)">
  <div style="display:flex;align-items:flex-start;gap:20px">
    <span style="flex:1;min-width:0">
      <span class="band">Comparison summary</span>
      <p style="font-size:14px;color:var(--s900);line-height:1.6;margin-top:10px;max-width:92ch">
        Murcia BESS shows the strongest overall balance between technical utilisation and financial return:
        the highest IRR of the three at 13.4%, on 78% utilisation. Almería cycles hardest at 81% and returns least on every MWh it moves.
      </p>
    </span>
    ${src("combined")}
  </div>
</section>

<section class="panel lift" style="padding:24px 26px;margin-top:24px">
  <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px">
    <div>
      <div class="band">Technical vs financial</div>
      <h2 class="t-sec" style="margin-top:8px">Utilisation against return</h2>
      <p class="t-meta" style="margin-top:6px;font-size:12px">Bubble size is installed power. Neither product can draw this — each owns one axis.</p>
    </div>
    ${src("combined")}
  </div>
  <div style="margin-top:14px">${selScatter(980)}</div>
  <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding-top:12px;border-top:1px solid var(--hair)">
    <span style="display:inline-flex;align-items:center;gap:7px"><span class="t-meta">↑ IRR</span>${src("revenew")}</span>
    <span style="display:inline-flex;align-items:center;gap:9px">
      <svg width="34" height="16" aria-hidden="true"><circle cx="6" cy="8" r="5" fill="${FIELD}" fill-opacity=".3"/><circle cx="24" cy="8" r="7.5" fill="${FIELD}" fill-opacity=".3"/></svg>
      <span class="t-meta">Installed power</span>${src("suite")}
    </span>
    <span style="display:inline-flex;align-items:center;gap:7px"><span class="t-meta">→ Battery utilisation</span>${src("storebrid")}</span>
  </div>
</section>

<section class="panel" style="padding:24px 26px;margin-top:24px">
  <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:18px">
    <div>
      <div class="band">Metric comparison</div>
      <h2 class="t-sec" style="margin-top:8px">Revenue / MWh discharged</h2>
    </div>
    <div class="tabs">
      ${metricChip("Energy discharged")}${metricChip("Cycles")}${metricChip("Annual revenue")}
      ${metricChip("IRR")}${metricChip("Revenue / MWh", true)}
    </div>
  </div>
  ${metricBars(perMwh, (v) => "€" + v.toFixed(1), 1)}
  <p class="t-meta" style="margin-top:14px">Derived, never typed: annual revenue ÷ (full cycles × storage capacity).</p>
</section>

<div style="display:flex;align-items:center;gap:14px;margin:26px 0 18px">
  <span class="hr" style="flex:1"></span>
  <button class="btn btn-secondary">Hide data${ic("down", 15, 1.9)}</button>
  <span class="hr" style="flex:1"></span>
</div>

<section class="panel" style="padding:14px 28px 26px">
  <div style="display:flex;align-items:flex-end;gap:16px;padding-bottom:14px">
    <span style="width:210px;flex:none" class="t-meta">All metrics</span>
    ${CMPSEL.map((p) => `<span style="flex:1;min-width:0;text-align:right;font-size:13.5px;font-weight:600;color:var(--s900)">${p.name}</span>`).join("")}
  </div>
  ${cmpGroup("Technical", src("storebrid"),
    cmpMetric("Storage capacity", V("mwh"), (v) => v + " MWh", null) +
    cmpMetric("Duration", CMPSEL.map((p) => p.mwh / p.mw), (v) => v.toFixed(1) + " h", null) +
    cmpMetric("Full cycles / year", V("cycles"), (v) => v, "hi") +
    cmpMetric("Utilisation", V("util"), (v) => v + "%", "hi") +
    cmpMetric("Energy discharged", CMPSEL.map((p) => (p.cycles * p.mwh) / 1000), (v) => v.toFixed(1) + " GWh", "hi") +
    cmpMetric("Degradation", V("degr"), (v) => v.toFixed(1) + "%/yr", "lo"))}
  ${cmpGroup("Financial", src("revenew"),
    cmpMetric("Annual revenue", V("rev"), (v) => "€" + v.toFixed(2) + "M", "hi") +
    cmpMetric("CAPEX", V("capex"), (v) => "€" + v.toFixed(1) + "M", null) +
    cmpMetric("IRR", V("irr"), (v) => v.toFixed(1) + "%", "hi"))}
  ${cmpGroup("Combined", src("combined"),
    cmpMetric("Revenue / MWh discharged", perMwh, (v) => "€" + v.toFixed(1), "hi") +
    cmpMetric("Revenue / cycle", perCycle, (v) => "€" + Math.round(v).toLocaleString("en-GB"), "hi") +
    cmpMetric("Revenue / MW installed", CMPSEL.map((p) => (p.rev * 1e6) / p.mw), (v) => "€" + Math.round(v / 1000) + "k", "hi"))}
</section>`,
});

/* ═══════════════════════════════════════════════════════════════
   SETTINGS — minimal on purpose (§27). Shared project context, the
   defaults the Suite reads when it opens, and where each product's
   own configuration lives. Not a second administration product.
   ═══════════════════════════════════════════════════════════════ */
const setRow = ({ label, value, help, source, action, dot }) => `
<div style="display:flex;align-items:center;gap:20px;padding:16px 0">
  <span style="width:250px;flex:none">
    <span style="display:block;font-size:13px;font-weight:600;color:var(--s900)">${label}</span>
    ${help ? `<span class="t-meta" style="display:block;margin-top:4px;line-height:1.5">${help}</span>` : ""}
  </span>
  <span style="flex:1;min-width:0;display:flex;align-items:center;gap:10px">
    ${dot ? `<i style="width:6px;height:6px;flex:none;border-radius:50%;background:${dot};display:block"></i>` : ""}
    <span style="font-size:14px;font-weight:500;color:var(--s900);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${value}</span>
    ${source || ""}
  </span>
  <span style="flex:none">${action}</span>
</div>`;

const setGroup = ({ label, source, sub, rows }) => `
${sec({ label, source, sub })}
<section class="panel" style="padding:8px 26px 14px">
  <div class="rows">${rows}</div>
</section>`;

const settings = doc({
  w: 1440, h: 1680, side: projectSide("settings"),
  body: `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Projects</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Valencia BESS</a><span class="sep">${ic("right", 12, 2)}</span><b>Settings</b>`,
  eyebrow: `<span style="display:inline-flex;align-items:center;gap:9px">Project ${src("suite")}</span>`,
  title: "Settings",
  meta: "The context both products read, and the defaults this project opens with.",
  actions: `<button class="btn btn-secondary">${ic("sliders", 16)}Edit project details</button>`,
})}

${setGroup({ label: "Project details", source: src("suite"),
  sub: "Shared context. Both StoreBrid and ReveNew read these values, so they are edited once, here.",
  rows:
    setRow({ label: "Project name", value: "Valencia BESS", action: `<a href="#" style="font-size:12.5px;font-weight:500">Edit</a>` }) +
    setRow({ label: "Technology", value: "Stand-alone BESS · 100 MW / 200 MWh", action: `<a href="#" style="font-size:12.5px;font-weight:500">Edit</a>` }) +
    setRow({ label: "Location", value: "Valencia, Spain · 39.4699°, −0.3763°", action: `<a href="#" style="font-size:12.5px;font-weight:500">Edit</a>` }) +
    setRow({ label: "Commercial operation date", value: "2027", action: `<a href="#" style="font-size:12.5px;font-weight:500">Edit</a>` }) })}

${setGroup({ label: "Units, currency and financial basis", source: src("suite"),
  sub: "The first two apply to everything the Suite displays; figures imported from either product are converted for display, never rewritten at the source. The third is what makes a return figure possible at all.",
  rows:
    setRow({ label: "Currency", value: "EUR — Euro", help: "Revenue, CAPEX and every combined figure.",
             action: `<button class="btn btn-secondary" style="height:34px;font-size:12.5px">Change${ic("down", 14, 1.8)}</button>` }) +
    setRow({ label: "Energy units", value: "MWh · GWh for annual totals", help: "Power in MW, capacity in MWh.",
             action: `<button class="btn btn-secondary" style="height:34px;font-size:12.5px">Change${ic("down", 14, 1.8)}</button>` }) +
    setRow({ label: "Financial model", value: "Configured · 15-year horizon, 9.5% discount rate", help: "Without it, cases show no IRR and no payback.",
             source: src("combined"),
             action: `<a href="#" style="font-size:12.5px;font-weight:500;display:inline-flex;align-items:center;gap:5px">Open in ReveNew${ic("upRight", 13, 1.9)}</a>` }) })}

${setGroup({ label: "Analysis defaults", source: src("suite"),
  sub: "What the project opens with. Changing a default re-reads existing results — it never re-runs a simulation or edits a financial case.",
  rows:
    setRow({ label: "Default analysis case", value: "Base case", dot: SU, source: src("suite"),
             help: "What Overview opens with. The two rows below are what it is made of.",
             action: `<button class="btn btn-secondary" style="height:34px;font-size:12.5px">Change${ic("down", 14, 1.8)}</button>` }) +
    setRow({ label: "— Technical simulation", value: "Base case 2027", dot: SB, source: src("storebrid"), action: "" }) +
    setRow({ label: "— Financial case", value: "Base market", dot: RN, source: src("revenew"), action: "" }) +
    setRow({ label: "Comparison baseline", value: "Base case", dot: SU, source: src("suite"),
             help: "The analysis case every delta on Compare is measured against.",
             action: `<button class="btn btn-secondary" style="height:34px;font-size:12.5px">Change${ic("down", 14, 1.8)}</button>` }) +
    setRow({ label: "Default comparison metric", value: "Revenue / MWh discharged", source: src("combined"),
             help: "What Compare opens with. Any of the six can be selected on the page.",
             action: `<button class="btn btn-secondary" style="height:34px;font-size:12.5px">Change${ic("down", 14, 1.8)}</button>` }) })}

${sec({ label: "Where the rest is configured", sub: "The Suite deliberately owns none of this. Each product keeps its own configuration and its own access rules." })}
<div style="display:flex;gap:20px">
  ${[["StoreBrid", SB, "Plant layout, BESS losses, degradation and augmentation, dispatch strategy, cost build-up, grid files.",
      "Open StoreBrid settings"],
     ["ReveNew", RN, "Price curves and markets, contract structures, escalation, tax and financing assumptions.",
      "Open ReveNew settings"]].map(([nm, dot, body, act]) => `
    <section class="panel" style="flex:1;min-width:0;padding:22px 24px">
      <div style="display:flex;align-items:center;gap:9px">
        <i style="width:7px;height:7px;border-radius:50%;background:${dot};display:block"></i>
        <span class="t-card" style="font-size:15px">${nm}</span>
      </div>
      <p class="t-meta" style="margin-top:10px;line-height:1.6">${body}</p>
      <a href="#" style="display:inline-flex;align-items:center;gap:6px;margin-top:14px;font-size:12.5px;font-weight:500">${act}${ic("upRight", 13, 1.9)}</a>
    </section>`).join("")}
  <section class="panel" style="flex:1;min-width:0;padding:22px 24px">
    <div style="display:flex;align-items:center;gap:9px">
      <i style="width:7px;height:7px;border-radius:50%;background:${SU};display:block"></i>
      <span class="t-card" style="font-size:15px">Suite</span>
    </div>
    <p class="t-meta" style="margin-top:10px;line-height:1.6">
      Project membership and licences are managed once for the organisation, not per project.
    </p>
    <a href="#" style="display:inline-flex;align-items:center;gap:6px;margin-top:14px;font-size:12.5px;font-weight:500">Administration &amp; licences${ic("right", 13, 2)}</a>
  </section>
</div>`,
});
writeFileSync("Settings.dc.html", settings);
console.log("Settings.dc.html", settings.length);

/* ── §30 · Activity · one chronological Suite timeline ─────────── */
const tlDay = (label, rows) => `
<div style="margin-top:26px">
  <div class="band">${label}</div>
  <div class="rows" style="margin-top:8px">${rows}</div>
</div>`;
const tlRow = ({ what, who, source, when }) => `
<div style="display:flex;align-items:center;gap:16px;height:56px">
  <span style="width:7px;height:7px;flex:none;border-radius:50%;background:var(--s300);display:block"></span>
  <span style="flex:1;min-width:0;font-size:13.5px;color:var(--s700);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${what}</span>
  <span class="t-meta" style="width:150px;flex:none">${who}</span>
  <span style="width:96px;flex:none">${source}</span>
  <span class="t-meta" style="width:70px;flex:none;text-align:right">${when}</span>
</div>`;

/* §16-17 · A decision event carries what the provenance filter cannot: what
   was active before, what replaced it, and what that swap was worth at the
   time. Two lines instead of a table — Activity records the trail, it does
   not become an audit screen. */
const tlDecision = ({ what, who, when, from, to }) => `
<div style="display:flex;align-items:flex-start;gap:16px;padding:15px 0">
  <span style="width:7px;height:7px;flex:none;border-radius:50%;background:var(--su);display:block;margin-top:6px"></span>
  <span style="flex:1;min-width:0">
    <span style="display:block;font-size:13.5px;color:var(--s700)">${what}</span>
    ${from ? `
    <span style="display:flex;align-items:center;gap:12px;margin-top:9px;flex-wrap:wrap">
      <span class="wash" style="padding:8px 12px">
        <span class="t-meta" style="display:block;font-size:10.5px">Previous</span>
        <span style="display:block;font-size:12.5px;font-weight:600;color:var(--s500);margin-top:3px;font-variant-numeric:tabular-nums">${from}</span>
      </span>
      <span style="color:var(--s400);display:flex">${ic("right", 14, 2)}</span>
      <span class="glass-sm" style="padding:8px 12px">
        <span class="t-meta" style="display:block;font-size:10.5px">New</span>
        <span style="display:block;font-size:12.5px;font-weight:600;color:var(--s900);margin-top:3px;font-variant-numeric:tabular-nums">${to}</span>
      </span>
    </span>` : ""}
  </span>
  <span class="t-meta" style="width:150px;flex:none;padding-top:1px">${who}</span>
  <span style="width:96px;flex:none;padding-top:1px">${src("suite")}</span>
  <span class="t-meta" style="width:70px;flex:none;text-align:right;padding-top:1px">${when}</span>
</div>`;

const eventFilter = (on = "all") => `
<button class="btn btn-secondary" style="height:34px;font-size:12.5px">${ic("filter", 15, 1.7)}${
  on === "dec" ? "Analysis &amp; decisions" : "All events"}${ic("down", 14, 1.8)}</button>`;

const activityHead = ({ on = "all", srcOn = "all" } = {}) => head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Projects</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Valencia BESS</a><span class="sep">${ic("right", 12, 2)}</span><b>Activity</b>`,
  eyebrow: `<span style="display:inline-flex;align-items:center;gap:9px">Project timeline ${src("suite")}</span>`,
  title: "Activity",
  meta: "The history of the project, not of the applications. Every event keeps the product that produced it.",
  actions: `<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:flex-end">
              ${eventFilter(on)}
              <div class="tabs">
                <a href="#" class="${srcOn === "all" ? "on" : ""}">All <span class="count">${on === "dec" ? 12 : 38}</span></a>
                <a href="#"><i style="width:5px;height:5px;border-radius:50%;background:${SB};display:block"></i>StoreBrid <span class="count">${on === "dec" ? 0 : 14}</span></a>
                <a href="#"><i style="width:5px;height:5px;border-radius:50%;background:${RN};display:block"></i>ReveNew <span class="count">${on === "dec" ? 1 : 16}</span></a>
                <a href="#"><i style="width:5px;height:5px;border-radius:50%;background:${SU};display:block"></i>Suite <span class="count">${on === "dec" ? 10 : 8}</span></a>
              </div>
            </div>`,
});

const activity = doc({
  w: 1440, h: 1080, side: projectSide("activity"),
  body: `
${activityHead()}
${tlDay("Today", 
  tlRow({ what: "Analysis case “Stress test” created — 4 h variant + Low spread", who: "Victor Andújar", source: src("suite"), when: "1h ago" }) +
  tlRow({ what: "Financial results became outdated — technical simulation changed after the last calculation", who: "System", source: src("combined"), when: "1h ago" }) +
  tlRow({ what: "Simulation “Base case 2027” completed", who: "Ana Ruiz", source: src("storebrid"), when: "2h ago" }) +
  tlRow({ what: "Price curve uploaded — iberia_prices_2027.csv", who: "Victor Andújar", source: src("suite"), when: "2h ago" }) +
  tlRow({ what: "Financial scenario “High spread” updated", who: "Victor Andújar", source: src("revenew"), when: "4h ago" }) +
  tlRow({ what: "Technical variant “Base case 2027 — 4 h duration” completed", who: "Ana Ruiz", source: src("storebrid"), when: "5h ago" }) +
  tlRow({ what: "Analysis case “High storage” created — 4 h variant + Base market", who: "Victor Andújar", source: src("suite"), when: "6h ago" }) +
  tlRow({ what: "Current analysis case changed — Base case → High storage", who: "Victor Andújar", source: src("suite"), when: "6h ago" }) +
  tlRow({ what: "Comparison saved — “4 h storage investment decision”", who: "Victor Andújar", source: src("suite"), when: "7h ago" }))}
${tlDay("Yesterday",
  tlRow({ what: "PPA contract “Iberdrola 2026–31” changed", who: "Victor Andújar", source: src("revenew"), when: "16:20" }) +
  tlRow({ what: "Financial model recalculated", who: "System", source: src("revenew"), when: "16:22" }) +
  tlRow({ what: "3 cases recalculated — Base case 2027 × Base market, High spread, Low spread", who: "System", source: src("suite"), when: "16:22" }))}
${tlDay("19 August 2026",
  tlRow({ what: "Plant configuration changed — round-trip efficiency 87% → 88%", who: "Ana Ruiz", source: src("storebrid"), when: "11:04" }) +
  tlRow({ what: "Project settings updated — COD moved to 2027", who: "Victor Andújar", source: src("suite"), when: "09:41" }) +
  tlRow({ what: "Generator profile replaced — generator_profile_v2.csv", who: "Ana Ruiz", source: src("suite"), when: "09:12" }))}
<p class="t-meta" style="margin-top:24px;line-height:1.6">
  Suite events are the shared ones — files, settings, membership. Product events keep their own provenance and open in the product that produced them.
</p>`,
});
/* §16 · The same screen with the event filter on Analysis & decisions:
   only what moved the decision forward. It is the decision trail the brief
   asked for, without a Decision History page that would duplicate this. */
const activityDecisions = doc({
  w: 1440, h: 1180, side: projectSide("activity"),
  body: `
${activityHead({ on: "dec" })}
<div style="display:flex;align-items:center;gap:11px;margin-bottom:20px;padding:12px 16px;border-radius:var(--r-xs);
     background:linear-gradient(168deg,rgba(14,157,168,.05),rgba(255,255,255,0) 76%);box-shadow:inset 0 0 0 1px rgba(14,157,168,.13)">
  <span style="color:var(--su700);display:flex;flex:none">${ic("gauge", 15)}</span>
  <span style="flex:1;min-width:0;font-size:12.5px;color:var(--s700);line-height:1.5">
    12 of the 38 events changed what is being analysed or how it is compared. Where the current analysis changed, the figures each pairing produced at that moment are kept.
  </span>
</div>
${tlDay("Today",
  tlDecision({ what: "Analysis case created — <b style=\"font-weight:600;color:var(--s900)\">Stress test</b> · 4 h variant + Low spread",
    who: "Victor Andújar", when: "1h ago" }) +
  tlDecision({ what: "Financial results became outdated — <b style=\"font-weight:600;color:var(--s900)\">Stress test</b>. The technical simulation changed after the last financial calculation.",
    who: "System", when: "1h ago" }) +
  tlDecision({ what: "Analysis case created — <b style=\"font-weight:600;color:var(--s900)\">High storage</b> · 4 h variant + Base market",
    who: "Victor Andújar", when: "6h ago" }) +
  tlDecision({ what: "Current analysis changed — Base case → High storage",
    who: "Victor Andújar", when: "6h ago",
    from: `Base case · ${eurMs(acMetrics(AC("base")).npv)} NPV · ${acMetrics(AC("base")).irr.toFixed(1)}% IRR`,
    to: `High storage · ${eurMs(acMetrics(AC("high")).npv)} NPV · ${acMetrics(AC("high")).irr.toFixed(1)}% IRR` }) +
  tlDecision({ what: "Decision brief saved — <b style=\"font-weight:600;color:var(--s900)\">4 h storage investment decision</b> · objective Maximise NPV · 3 cases compared · <a href=\"#\">Open brief</a>",
    who: "Victor Andújar", when: "7h ago" }) +
  tlDecision({ what: "Decision criteria changed — CAPEX ≤ €52M → <b style=\"font-weight:600;color:var(--s900)\">CAPEX ≤ €48M</b>, IRR ≥ 12% added",
    who: "Victor Andújar", when: "7h ago" }))}
${tlDay("Yesterday",
  tlDecision({ what: "Comparison baseline changed — Base case → High storage, then back to Base case",
    who: "Victor Andújar", when: "17:05" }) +
  tlDecision({ what: "Analysis case renamed — “4 h variant” → <b style=\"font-weight:600;color:var(--s900)\">High storage</b>",
    who: "Ana Ruiz", when: "11:40" }))}
${tlDay("19 August 2026",
  tlDecision({ what: "Current analysis changed — no analysis → Base case",
    who: "Victor Andújar", when: "09:15",
    from: "No current analysis",
    to: `Base case · ${eurMs(acMetrics(AC("base")).npv)} NPV · ${acMetrics(AC("base")).irr.toFixed(1)}% IRR` }) +
  tlDecision({ what: "Analysis case created — <b style=\"font-weight:600;color:var(--s900)\">Base case</b> · Base 2 h + Base market",
    who: "Victor Andújar", when: "09:12" }))}
<p class="t-meta" style="margin-top:18px;line-height:1.6;max-width:110ch">
  A record of what was decided, not an approval trail. Nothing here can be signed off, commented on or locked — the Suite
  keeps the history the project already generates and leaves governance to the systems that own it.
</p>`,
});
writeFileSync("ActivityDecisions.dc.html", activityDecisions);
console.log("ActivityDecisions.dc.html");

writeFileSync("Activity.dc.html", activity);
console.log("Activity.dc.html", activity.length);


/* ═══════════════════════════════════════════════════════════════
   V3 · embedded specialist capabilities, native to the Suite
   The shell, background, navigation and project context stay put.
   The owning product appears as provenance and accent — never as a
   second application taking the screen over (§48).
   ═══════════════════════════════════════════════════════════════ */
console.log("V3 embedded capabilities: forecast · technical · project details");



/* ═══════════════════════════════════════════════════════════════
   SIMULATION OVERVIEW — where cross-product analysis starts
   A Suite reading of a StoreBrid simulation: the handful of values
   that define the technical case, its core results, and the
   financial scenarios being run against it. Never the wizard.
   ═══════════════════════════════════════════════════════════════ */
const simTabs = (on) => `
<div class="tabs" style="margin-bottom:26px">
  <a href="#" class="${on === "overview" ? "on" : ""}">Overview</a>
  <a href="#" class="${on === "results" ? "on" : ""}">Technical results</a>
  <a href="#" class="${on === "scenarios" ? "on" : ""}">Financial scenarios <span class="count">3</span></a>
</div>`;

const paramGrid = (rows) => `
<div style="display:flex;flex-wrap:wrap;gap:0 34px">
  ${rows.map(([k, v, u]) => `
    <div style="flex:1 1 150px;min-width:0;padding:14px 0;border-top:1px solid var(--hair)">
      <div class="t-meta">${k}</div>
      <div style="font-size:18px;font-weight:600;color:var(--s900);margin-top:6px;font-variant-numeric:tabular-nums">${v}<span style="font-size:11.5px;font-weight:500;color:var(--s400);margin-left:4px">${u || ""}</span></div>
    </div>`).join("")}
</div>`;

const scenarioOutcome = ({ tid, sid, best }) => {
  const c = caseOf(tid, sid);
  return `
<a href="#" class="glass-sm" style="flex:1;min-width:0;padding:20px 22px;text-decoration:none;display:flex;flex-direction:column;
   ${best ? "box-shadow:0 0 0 1px rgba(109,90,198,.3), var(--sh-md), inset 0 1px 0 rgba(255,255,255,.92)" : ""}">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:10px">
    <span class="t-card" style="font-size:15px">${c.sc.name}</span>
    ${best ? badge("Best outcome", "#5B4BB5", "rgba(109,90,198,.13)") : src("revenew")}
  </div>
  <div class="rows" style="margin-top:14px">
    ${[["NPV", eurMs(npvOfCase(c)), src("revenew")],
       ["IRR", c.irr.toFixed(1) + "%", src("combined")],
       ["Annual revenue", eurM(c.rev), src("revenew")],
       ["Revenue / MWh discharged", "€" + c.perMwh.toFixed(1), src("combined")]].map(([k, v, sr]) => `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 0">
        <span style="min-width:0">
          <span style="display:block;font-size:12.5px;color:var(--s500)">${k}</span>
          <span style="display:block;margin-top:4px">${sr}</span>
        </span>
        <b style="font-size:15px;font-weight:600;color:var(--s900);white-space:nowrap;font-variant-numeric:tabular-nums">${v}</b>
      </div>`).join("")}
  </div>
  <div style="flex:1"></div>
  <span style="display:inline-flex;align-items:center;gap:6px;margin-top:16px;font-size:12.5px;font-weight:500;color:var(--b700)">
    View case${ic("right", 13, 2)}
  </span>
</a>`;
};

/* One Simulation overview, three lifecycle states (§14): a completed
   simulation, a variant still running, and a variant that has just
   landed. Nothing commercial is ever shown before the technical run
   finishes — there is nothing to compute it from. */
const simTabsFor = (on, state) => `
<div class="tabs" style="margin-bottom:26px">
  <a href="#" class="${on === "overview" ? "on" : ""}">Overview</a>
  <a href="#" class="${on === "results" ? "on" : ""}" ${state === "running" ? 'style="opacity:.45"' : ""}>Technical results</a>
  <a href="#" class="${on === "scenarios" ? "on" : ""}" ${state === "running" ? 'style="opacity:.45"' : ""}>Financial scenarios
    <span class="count">${state === "running" ? "—" : "3"}</span></a>
</div>`;

/* §5 · one dependency, shown as operational status rather than a wizard.
   The financial side cannot start until StoreBrid returns energy to
   price, and the cases cannot exist until both are done. */
const PIPE = {
  running:    [["run", "Running", "Hourly dispatch, 15-year horizon"], ["wait", "Waiting for technical results", "3 scenarios queued"], ["wait", "Waiting", "3 cases"]],
  evaluating: [["done", "Completed", "92.4 GWh · 231 cycles · 79% utilisation"], ["run", "Evaluating 3 scenarios", "Base market · High spread · Low spread"], ["wait", "Waiting", "3 cases"]],
  ready:      [["done", "Completed", "92.4 GWh · 231 cycles · 79% utilisation"], ["done", "Completed", "3 scenarios evaluated"], ["done", "3 cases ready", "One per financial scenario"]],
};
const pipeStage = ({ label, source, state, title, note, last }) => {
  const tone = state === "done" ? "#0E9469" : state === "run" ? SB : "#8FA3C4";
  const glyph = state === "done"
    ? `<span style="color:#0E9469;display:flex">${ic("check", 14, 2.2)}</span>`
    : state === "run"
      ? `<span style="width:14px;height:14px;border-radius:50%;border:2.2px solid rgba(37,99,235,.2);border-top-color:${SB};display:block"></span>`
      : `<span style="width:8px;height:8px;border-radius:50%;background:#CBD5E1;display:block"></span>`;
  return `
<div style="flex:1;min-width:0;display:flex;align-items:flex-start;gap:12px">
  <span style="flex:1;min-width:0;padding:16px 18px;border-radius:var(--r-xs);
        background:${state === "wait" ? "linear-gradient(168deg,rgba(255,255,255,.36),rgba(255,255,255,.2))" : "linear-gradient(168deg,rgba(255,255,255,.6),rgba(255,255,255,.4))"};
        border:1px solid rgba(255,255,255,${state === "wait" ? ".55" : ".8"});${state === "wait" ? "opacity:.72" : ""}">
    <span style="display:flex;align-items:center;justify-content:space-between;gap:10px">
      <span class="band" style="font-size:10px">${label}</span>${source}
    </span>
    <span style="display:flex;align-items:center;gap:9px;margin-top:12px">
      <span style="width:20px;flex:none;display:flex;justify-content:center">${glyph}</span>
      <span style="font-size:13.5px;font-weight:600;color:${state === "wait" ? "var(--s500)" : "var(--s900)"}">${title}</span>
    </span>
    <span class="t-meta" style="display:block;margin-top:7px;padding-left:29px;line-height:1.5">${note}</span>
  </span>
  ${last ? "" : `<span style="flex:none;color:var(--s400);display:flex;padding-top:44px">${ic("right", 15, 2)}</span>`}
</div>`;
};

const pipelinePanel = (stage) => {
  const rows = PIPE[stage];
  const running = stage !== "ready";
  return `
<section class="panel lift" style="padding:24px 26px;margin-top:24px">
  <div style="display:flex;align-items:center;gap:16px;margin-bottom:18px">
    <span style="flex:1;min-width:0">
      <span style="display:flex;align-items:center;gap:10px">
        <span class="t-card" style="font-size:16px">${stage === "ready" ? "Ready to explore" : stage === "evaluating" ? "Pricing the results" : "Running the simulation"}</span>
        ${stage === "ready" ? SIMSTATE.completed : SIMSTATE.running}
      </span>
      <span class="t-meta" style="display:block;margin-top:5px">
        ${stage === "running" ? "Started 4 minutes ago · typically 6–9 minutes"
          : stage === "evaluating" ? "Technical run finished 30 seconds ago · scenarios usually take under a minute"
          : "One technical variant, evaluated against the project's three financial scenarios"}
      </span>
    </span>
    ${running ? `<button class="btn btn-secondary" style="flex:none"><i style="width:6px;height:6px;border-radius:50%;background:${SB};display:block"></i>Follow in StoreBrid${ic("upRight", 14, 1.8)}</button>`
      : `<button class="btn btn-secondary" style="flex:none">${ic("analytics", 15)}Compare with baseline</button>
         <button class="btn btn-primary" style="flex:none">${ic("layers", 15)}Explore 3 new cases</button>`}
  </div>
  <div style="display:flex;gap:12px;align-items:stretch">
    ${pipeStage({ label: "Technical simulation", source: src("storebrid"), state: rows[0][0], title: rows[0][1], note: rows[0][2] })}
    ${pipeStage({ label: "Financial evaluation", source: src("revenew"), state: rows[1][0], title: rows[1][1], note: rows[1][2] })}
    ${pipeStage({ label: "Cases", source: src("suite"), state: rows[2][0], title: rows[2][1], note: rows[2][2], last: true })}
  </div>
  ${running ? `
  <div style="display:flex;gap:26px;margin-top:20px;padding-top:18px;border-top:1px solid var(--hair)">
    ${[["Energy discharged", stage === "evaluating" ? "92.4 GWh" : null], ["Full cycles / year", stage === "evaluating" ? "231" : null],
       ["Utilisation", stage === "evaluating" ? "79%" : null], ["Peak discharge", stage === "evaluating" ? "70 MW" : null],
       ["Capacity at year 15", stage === "evaluating" ? "78%" : null]].map(([k, v]) => `
      <span style="flex:1;min-width:0">
        <span class="kpi-lab" style="display:block">${k}</span>
        <span style="display:block;margin-top:${v ? "9" : "12"}px">${v
          ? `<b style="font-size:20px;font-weight:700;letter-spacing:-.02em;color:var(--s900);font-variant-numeric:tabular-nums">${v}</b>`
          : skel("62%", 20)}</span>
      </span>`).join("")}
  </div>
  <p class="t-meta" style="margin-top:16px;line-height:1.6">
    Base case 2027 is untouched, so every case already built on it stays valid. This variant becomes a new row in Cases once all three scenarios are priced.
  </p>` : ""}
</section>`;
};

const simOverviewBody = ({ tid = "base2h", state = "completed" } = {}) => {
  const t = T(tid);
  const isVariant = tid !== "base2h";
  const running = state === "running" || state === "evaluating";
  const changes = isVariant ? [["Storage capacity", "200 MWh", t.mwh + " MWh"], ["Duration", "2.0 h", t.dur.toFixed(1) + " h"]] : null;
  return `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Projects</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Valencia BESS</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Simulations</a><span class="sep">${ic("right", 12, 2)}</span><b>${t.name}</b>`,
  eyebrow: `<span style="display:inline-flex;align-items:center;gap:9px">Engineering ${src("storebrid")}${
    isVariant ? `<span class="cov" style="margin-left:2px"><i style="background:${SU}"></i>Technical variant of Base case 2027</span>` : ""}</span>`,
  title: t.name,
  meta: `<span style="display:inline-flex;align-items:center;gap:12px;flex-wrap:wrap">
           <span>Hourly · 15-year horizon · ${running ? (state === "evaluating" ? "technical run finished" : "started 4 minutes ago") : "run " + t.when}</span>${running ? SIMSTATE.running : SIMSTATE.completed}</span>`,
  actions: running
    ? `<button class="btn btn-secondary">Cancel run</button>
       <button class="btn btn-secondary"><i style="width:6px;height:6px;border-radius:50%;background:${SB};display:block"></i>Open in StoreBrid${ic("upRight", 14, 1.8)}</button>`
    : `<button class="btn btn-primary">${ic("sliders", 16)}Create technical variant</button>
       <button class="btn btn-secondary"><i style="width:6px;height:6px;border-radius:50%;background:${SB};display:block"></i>Open in StoreBrid${ic("upRight", 14, 1.8)}</button>`,
})}
${simTabsFor("overview", state)}

${state === "ready" ? `
<div style="display:flex;align-items:center;gap:18px;padding:18px 22px;margin-bottom:24px;border-radius:var(--r-sm);
     background:linear-gradient(168deg,rgba(16,185,129,.07),rgba(255,255,255,0) 70%);box-shadow:inset 0 0 0 1px rgba(16,185,129,.18)">
  <span style="width:34px;height:34px;flex:none;border-radius:10px;display:flex;align-items:center;justify-content:center;
        background:rgba(16,185,129,.14);color:#0E9469">${ic("check", 17, 2.1)}</span>
  <span style="flex:1;min-width:0">
    <span style="display:block;font-size:13.5px;font-weight:600;color:var(--s900)">Technical simulation completed · 3 financial scenarios evaluated</span>
    <span class="t-meta" style="display:block;margin-top:4px">One variant produced three cases, because it is priced against every financial scenario in the project.</span>
  </span>
  <button class="btn btn-secondary" style="flex:none">${ic("analytics", 15)}Compare with baseline</button>
  <button class="btn btn-primary" style="flex:none">${ic("layers", 15)}Explore 3 new cases</button>
</div>` : ""}

<section class="panel lift" style="padding:24px 26px">
  <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px">
    <div>
      <div class="band" style="color:var(--b700)">Technical case</div>
      <h2 class="t-sec" style="margin-top:8px">What ${running ? "is being simulated" : "was simulated"}</h2>
      <p class="t-meta" style="margin-top:6px;font-size:12px;max-width:78ch">
        The values that define this case. Plant layout, losses, degradation curves and dispatch strategy stay in StoreBrid.
      </p>
    </div>
    <div style="display:flex;align-items:center;gap:12px">${src("storebrid")}
      <a href="#" style="font-size:12.5px;font-weight:500;display:inline-flex;align-items:center;gap:5px">Open simulation in StoreBrid${ic("upRight", 13, 1.9)}</a>
    </div>
  </div>
  <div style="margin-top:16px">
    ${paramGrid([["Installed power", t.mw, "MW"], ["Storage capacity", t.mwh, "MWh"], ["Duration", t.dur.toFixed(1), "h"],
                 ["Round-trip efficiency", t.rte, "%"], ["Max export power", t.mw, "MW"], ["Simulation horizon", 15, "years"]])}
  </div>
  ${changes ? `
  <div class="wash" style="padding:15px 18px;margin-top:18px;display:flex;align-items:center;gap:30px;flex-wrap:wrap">
    <span style="display:flex;align-items:center;gap:9px;flex:none">
      <span style="color:var(--b700);display:flex">${ic("sliders", 15)}</span>
      <span style="font-size:12.5px;font-weight:600;color:var(--s900)">${changes.length} changes from Base case 2027</span>
    </span>
    ${changes.map(([k, was, now]) => `
      <span style="min-width:0">
        <span class="t-meta" style="display:block">${k}</span>
        <span style="display:flex;align-items:center;gap:9px;margin-top:4px">
          <span style="font-size:13px;color:var(--s400);text-decoration:line-through">${was}</span>
          <span style="color:var(--s400);display:flex">${ic("right", 13, 2)}</span>
          <span style="font-size:13.5px;font-weight:600;color:var(--s900)">${now}</span>
        </span>
      </span>`).join("")}
    <span class="t-meta" style="flex:1;min-width:180px;line-height:1.5">Everything else carries over from Base case 2027 unchanged.</span>
  </div>` : ""}
</section>

${running ? pipelinePanel(state) : `
${sec({ label: "Core technical results", source: src("storebrid"),
        sub: isVariant
          ? "Movement is against Base case 2027 — the simulation this variant was created from."
          : "Movement is against the previous run of this simulation.",
        right: `<a href="#" style="font-size:13px;font-weight:500">Technical results</a>` })}
<div class="kpirow">
  ${kpi({ label: "Energy discharged", value: t.gwh + " GWh", source: src("storebrid"), delta: isVariant ? "+41.7%" : "+4.1%" })}
  ${kpi({ label: "Full cycles / year", value: String(t.cycles), source: src("storebrid"), delta: isVariant ? "−95" : "+12" })}
  ${kpi({ label: "Utilisation", value: t.util + "%", source: src("storebrid"), delta: isVariant ? "+5 pt" : "+2 pt" })}
  ${kpi({ label: "Peak discharge", value: "70 MW", source: src("storebrid"), delta: isVariant ? "—" : undefined })}
  ${kpi({ label: "Capacity at year 15", value: isVariant ? "78%" : "73%", source: src("storebrid"), delta: isVariant ? "+5 pt" : "−2.1 %/yr" })}
</div>

${sec({ label: "Financial scenarios", sub: `The same technical case, evaluated against three ReveNew scenarios. Each pairing is a case.`,
        right: `<button class="btn btn-secondary">${ic("plus", 15, 1.9)}Add scenario to analysis</button>` })}
<div style="display:flex;gap:18px;align-items:stretch">
  ${SCEN.map((sc) => scenarioOutcome({ tid, sid: sc.id, best: sc.id === "high" })).join("")}
</div>
<div style="display:flex;align-items:center;gap:18px;padding:18px 22px;margin-top:22px;border-radius:var(--r-sm);
     background:linear-gradient(168deg,rgba(14,157,168,.06),rgba(255,255,255,0) 70%);box-shadow:inset 0 0 0 1px rgba(14,157,168,.18)">
  <span style="width:34px;height:34px;flex:none;border-radius:10px;display:flex;align-items:center;justify-content:center;
        background:rgba(14,157,168,.13);color:var(--su700)">${ic("layers", 17)}</span>
  <span style="flex:1;min-width:0">
    <span style="display:block;font-size:13.5px;font-weight:600;color:var(--s900)">This simulation produces 3 cases, one per financial scenario</span>
    <span class="t-meta" style="display:block;margin-top:4px">Two other technical simulations exist in this project — nine cases across the whole matrix.</span>
  </span>
  <button class="btn btn-secondary" style="flex:none">${ic("analytics", 15)}Compare the 3</button>
  <button class="btn btn-primary" style="flex:none">${ic("layers", 15)}Explore 3 cases</button>
</div>
<p class="t-meta" style="margin-top:16px;line-height:1.6;max-width:112ch">
  Energy discharged and cycles come from StoreBrid; revenue and capture price from ReveNew. Revenue per MWh discharged exists only because both are present —
  it is a combined figure, not a claim that one causes the other. ${FINMODEL}
</p>`}`;
};

const simOverview = doc({ w: 1440, h: 1700, side: projectSide("simulations"), focusSb: true, body: simOverviewBody() });

/* §11 · a small, controlled iteration — never the wizard (§46) */
const variantModal = () => capabilityModal({
  title: "Create technical variant", context: "Based on Base case 2027",
  accent: SB, source: src("storebrid"), openIn: "Advanced configuration in StoreBrid", width: 780,
  footNote: "The original simulation is untouched. The variant runs as a new StoreBrid simulation.",
  cancel: "Cancel", confirm: "Create & run variant",
  body: `
  <div style="padding:24px 26px">
    <p class="t-meta" style="line-height:1.6;margin-bottom:20px;max-width:76ch">
      Five levers that move the technical and financial result most. Base case 2027 is not modified — this creates a sibling simulation
      so every case built on the original stays comparable.
    </p>
    <div style="display:flex;gap:18px">
      ${field("Installed power", "100", { unit: "MW" })}
      ${field("Storage capacity", "400", { unit: "MWh" })}
    </div>
    <div style="display:flex;gap:18px">
      ${field("Duration", "4.0", { unit: "h", help: "Derived from power and capacity" })}
      ${field("Round-trip efficiency", "88", { unit: "%" })}
    </div>
    <div style="display:flex;gap:18px">
      ${field("Max export power", "100", { unit: "MW", help: "Point of interconnection limit" })}
      <div style="flex:1"></div>
    </div>
    <div class="wash" style="padding:16px 18px;margin:6px 0 20px">
      <div style="display:flex;align-items:center;gap:9px">
        <span style="color:var(--b700);display:flex">${ic("sliders", 15)}</span>
        <span style="font-size:12.5px;font-weight:600;color:var(--s900)">2 changes from Base case 2027</span>
      </div>
      <div style="display:flex;gap:30px;margin-top:12px;flex-wrap:wrap">
        ${[["Storage capacity", "200 MWh", "400 MWh"], ["Duration", "2.0 h", "4.0 h"]].map(([k, was, now]) => `
          <span style="min-width:0">
            <span class="t-meta" style="display:block">${k}</span>
            <span style="display:flex;align-items:center;gap:9px;margin-top:5px">
              <span style="font-size:13.5px;color:var(--s400);text-decoration:line-through">${was}</span>
              <span style="color:var(--s400);display:flex">${ic("right", 13, 2)}</span>
              <span style="font-size:14px;font-weight:600;color:var(--s900)">${now}</span>
            </span>
          </span>`).join("")}
      </div>
      <p class="t-meta" style="margin-top:14px;line-height:1.55">
        Everything else — power, round-trip efficiency, export limit, losses, degradation, dispatch strategy and costs — is unchanged from Base case 2027.
      </p>
    </div>
    ${field("Variant name", "Base case 2027 — 4 h duration", { req: true })}
  </div>`,
});

/* §8 · adding a scenario SELECTS one that already exists in ReveNew and
   evaluates it here. It never authors anything in ReveNew. */
const SCENLIB = [
  { name: "Base market", meta: "In this analysis", on: true },
  { name: "High spread", meta: "In this analysis", on: true },
  { name: "Low spread", meta: "In this analysis", on: true },
  { name: "Merchant upside", meta: "Updated 3d ago", pick: true },
  { name: "Regulated floor 2030", meta: "Updated 1mo ago" },
  { name: "Capture floor 2032", meta: "No price curve", blocked: true },
];
const scenarioPicker = ({ picked = 0 } = {}) => `
<div class="raise" style="position:absolute;right:36px;top:250px;width:360px;z-index:11;padding:16px 8px 8px;border-radius:var(--r-sm)">
  <div class="band" style="padding:0 14px 4px">Add revenue scenarios</div>
  <p class="t-meta" style="padding:0 14px 12px;line-height:1.5;margin:0">Scenarios already built in ReveNew. Adding one creates cases here, not in ReveNew.</p>
  ${SCENLIB.map((x) => {
    const on = x.on || (x.pick && picked);
    return `
    <a href="#" style="display:flex;align-items:center;gap:11px;padding:10px 14px;border-radius:var(--r-xs);text-decoration:none;${x.blocked ? "opacity:.62" : ""}">
      <span style="width:15px;height:15px;flex:none;border-radius:4px;display:flex;align-items:center;justify-content:center;
            ${x.blocked ? "box-shadow:inset 0 0 0 1.5px rgba(30,58,138,.12)" : on ? `background:${RN};color:#fff` : "box-shadow:inset 0 0 0 1.5px rgba(30,58,138,.2)"}">${on && !x.blocked ? ic("check", 10, 2.8) : ""}</span>
      <span style="flex:1;min-width:0">
        <span style="display:block;font-size:13px;font-weight:${on ? "600" : "500"};color:var(--s900)">${x.name}</span>
        <span style="display:block;font-size:11px;color:${x.blocked ? "#9A6208" : "var(--s400)"};margin-top:2px">${x.blocked ? "Needs a price curve in ReveNew" : x.meta}</span>
      </span>
      ${x.blocked ? `<span style="color:#9A6208;display:flex;flex:none">${ic("alert", 14)}</span>` : ""}
    </a>`;
  }).join("")}
  <div class="hr" style="margin:8px 14px"></div>
  <div style="display:flex;align-items:center;gap:10px;padding:8px 14px 6px">
    <a href="#" style="flex:1;font-size:12.5px;font-weight:500;display:inline-flex;align-items:center;gap:6px">Manage in ReveNew${ic("upRight", 13, 1.9)}</a>
    <button class="btn btn-primary" style="height:34px;font-size:12.5px">Add ${picked ? "1 scenario" : "selected"}</button>
  </div>
</div>`;

const commercialScenarios = doc({
  w: 1440, h: 1720, side: projectSide("scenarios"), rvFocus: true, overlay: scenarioPicker(),
  body: `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Projects</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Valencia BESS</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Base case 2027</a><span class="sep">${ic("right", 12, 2)}</span><b>Financial scenarios</b>`,
  eyebrow: `<span style="display:inline-flex;align-items:center;gap:9px">Financial ${src("revenew")}</span>`,
  title: "Financial scenarios",
  meta: "Three ReveNew scenarios evaluated against one technical case.",
  actions: `<button class="btn btn-primary">${ic("analytics", 16)}Compare scenarios</button>
            <button class="btn btn-secondary">${ic("plus", 16, 1.9)}Add scenario</button>
            <button class="btn btn-secondary"><i style="width:6px;height:6px;border-radius:50%;background:${RN};display:block"></i>Open ReveNew${ic("upRight", 14, 1.8)}</button>`,
})}
${simTabs("scenarios")}
<section class="panel" style="padding:18px 24px;display:flex;align-items:center;gap:18px;margin-bottom:26px">
  <span style="width:34px;height:34px;flex:none;border-radius:10px;display:flex;align-items:center;justify-content:center;
        background:rgba(37,99,235,.1);color:var(--b700)">${ic("battery", 17)}</span>
  <span style="flex:1;min-width:0">
    <span class="band" style="font-size:10px">Technical case</span>
    <span style="display:flex;align-items:center;gap:10px;margin-top:6px">
      <span style="font-size:15px;font-weight:600;color:var(--s900)">Base case 2027</span>${src("storebrid")}
    </span>
  </span>
  <span class="t-meta" style="flex:none">100 MW / 200 MWh · 2.0 h · 65.2 GWh discharged · 326 cycles</span>
  <a href="#" style="flex:none;font-size:12.5px;font-weight:500">Change technical case</a>
</section>
<section class="panel lift" style="padding:22px 26px;margin-bottom:22px">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:16px">
    <div style="display:flex;align-items:center;gap:10px"><span class="band">Quick comparison</span>${src("combined")}</div>
    <span class="t-meta">Base case 2027 · 65.2 GWh discharged in every column</span>
  </div>
  <div style="display:flex;gap:16px;padding-bottom:12px">
    <span style="width:190px;flex:none"></span>
    ${SCEN.map((sc) => `<span style="flex:1;min-width:0;text-align:right;font-size:13.5px;font-weight:600;color:var(--s900)">${sc.name}</span>`).join("")}
  </div>
  ${[["Annual revenue", (c) => eurM(c.rev), src("revenew")],
     ["Capture price", (c) => "€" + c.sc.capture.toFixed(1) + "/MWh", src("revenew")],
     ["Revenue / MWh discharged", (c) => "€" + c.perMwh.toFixed(1), src("combined")],
     ["IRR", (c) => c.irr.toFixed(1) + "%", src("combined")]].map(([label, f, sr]) => {
    const vals = SCEN.map((sc) => caseOf("base2h", sc.id));
    const nums = vals.map((c) => parseFloat(String(f(c)).replace(/[^\d.]/g, "")));
    const bi = nums.indexOf(Math.max(...nums));
    return `
    <div style="display:flex;align-items:center;gap:16px;padding:13px 0;border-top:1px solid var(--hair)">
      <span style="width:190px;flex:none;display:flex;align-items:center;gap:8px">
        <span style="font-size:12.5px;color:var(--s500)">${label}</span>${sr}
      </span>
      ${vals.map((c, i) => `<span style="flex:1;min-width:0;text-align:right;font-variant-numeric:tabular-nums;
        font-size:${i === bi ? "16" : "15"}px;font-weight:${i === bi ? "700" : "500"};color:${i === bi ? "var(--s900)" : "var(--s700)"}">${f(c)}${
        i === bi ? `<span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:var(--cmb);margin-left:8px;vertical-align:middle"></span>` : ""}</span>`).join("")}
    </div>`;
  }).join("")}
</section>
<div style="display:flex;gap:18px;align-items:stretch">
  ${scenarioOutcome({ tid: "base2h", sid: "base" })}
  ${scenarioOutcome({ tid: "base2h", sid: "high", best: true })}
  ${scenarioOutcome({ tid: "base2h", sid: "low" })}
</div>
<p class="t-meta" style="margin-top:18px;line-height:1.6;max-width:104ch">
  Adding a scenario here creates an analysis case in the Suite — it does not create anything in ReveNew.
  A genuinely new scenario, with its own price curves and assumptions, is authored in ReveNew and appears in this list afterwards.
</p>`,
});
console.log("SimulationOverview · QuickVariant · CommercialScenarios");


/* ── §14 · two more technical views, both derived from the case ── */
function energyBalance(w = 500) {
  const t = T("base2h"), charged = +(t.gwh / (t.rte / 100)).toFixed(1), loss = +(charged - t.gwh).toFixed(1);
  const H = 250, L = 42, R = 12, TT = 18, B = 34;
  const pw = w - L - R, ph = H - TT - B, max = charged * 1.12;
  const y = (v) => TT + ph - (v / max) * ph;
  const band = pw / 3, bw = Math.min(74, band * 0.56);
  const cols = [["Charged", charged, "#5B8DEF", 0], ["Round-trip losses", loss, "#8FA3C4", charged - loss], ["Discharged", t.gwh, "#1D4ED8", 0]];
  const grids = [0, 25, 50, 75].map((g) =>
    `<line x1="${L}" y1="${y(g).toFixed(1)}" x2="${w - R}" y2="${y(g).toFixed(1)}" stroke="${g === 0 ? "rgba(30,58,138,.16)" : GRID}" stroke-width="1"/>
     <text x="${L - 8}" y="${(y(g) + 3.4).toFixed(1)}" text-anchor="end" font-size="9.5" fill="${AXIS}">${g}</text>`).join("");
  const bars = cols.map(([label, v, c, base], i) => {
    const x = L + i * band + (band - bw) / 2, top = y(base + v), h = y(base) - y(base + v);
    return `<path class="mk" d="${bar(x, top, bw, h, 4, true)}" fill="${c}"><title>${label} — ${v} GWh</title></path>
      <text x="${(x + bw / 2).toFixed(1)}" y="${(top - 7).toFixed(1)}" text-anchor="middle" font-size="10.5" font-weight="600" fill="${INK}">${v}</text>
      <text x="${(x + bw / 2).toFixed(1)}" y="${H - 10}" text-anchor="middle" font-size="9.5" fill="${AXIS}">${label}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${H}" width="100%" style="display:block" role="img" aria-label="Energy charged, round-trip losses and energy discharged in GWh">
    ${MKSTYLE}${grids}${bars}
    <text x="${L - 8}" y="${TT + 4}" text-anchor="end" font-size="9" fill="${AXIS}">GWh</text></svg>`;
}
function degradation(w = 500) {
  const H = 250, L = 42, R = 14, TT = 18, B = 30, yrs = 15, rate = 0.021;
  const pw = w - L - R, ph = H - TT - B;
  const x = (n) => L + (n / yrs) * pw;
  const y = (p) => TT + ph - ((p - 60) / 45) * ph;
  const pts = Array.from({ length: yrs + 1 }, (_, n) => [n, 100 * Math.pow(1 - rate, n)]);
  const line = pts.map(([n, p], i) => `${i ? "L" : "M"}${x(n).toFixed(1)} ${y(p).toFixed(1)}`).join("");
  const area = `${line}L${x(yrs).toFixed(1)} ${(TT + ph).toFixed(1)}L${L} ${(TT + ph).toFixed(1)}Z`;
  const grids = [100, 90, 80, 70].map((g) =>
    `<line x1="${L}" y1="${y(g).toFixed(1)}" x2="${w - R}" y2="${y(g).toFixed(1)}" stroke="${g === 80 ? "rgba(245,158,11,.4)" : GRID}" stroke-width="1" ${g === 80 ? 'stroke-dasharray="4 3"' : ""}/>
     <text x="${L - 8}" y="${(y(g) + 3.4).toFixed(1)}" text-anchor="end" font-size="9.5" fill="${AXIS}">${g}%</text>`).join("");
  const cross = Math.log(0.8) / Math.log(1 - rate);
  const xl = [0, 5, 10, 15].map((n) => `<text x="${x(n).toFixed(1)}" y="${H - 8}" text-anchor="middle" font-size="9.5" fill="${AXIS}">Yr ${n}</text>`).join("");
  const end = pts[yrs][1];
  return `<svg viewBox="0 0 ${w} ${H}" width="100%" style="display:block" role="img" aria-label="Effective storage capacity retained over fifteen years">
    ${MKSTYLE}${grids}
    <path d="${area}" fill="rgba(37,99,235,.08)"/>
    <path d="${line}" fill="none" stroke="#1D4ED8" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="${x(cross).toFixed(1)}" cy="${y(80).toFixed(1)}" r="4" fill="#fff" stroke="#9A6208" stroke-width="2"/>
    <text x="${(x(cross) + 9).toFixed(1)}" y="${(y(80) - 8).toFixed(1)}" font-size="10" font-weight="600" fill="#9A6208">80% at year ${cross.toFixed(1)}</text>
    <text x="${(x(yrs) - 4).toFixed(1)}" y="${(y(end) + 16).toFixed(1)}" text-anchor="end" font-size="10.5" font-weight="600" fill="${INK}">${end.toFixed(0)}% · ${(200 * end / 100).toFixed(0)} MWh</text>
    ${xl}</svg>`;
}

const results = doc({
  w: 1440, h: 1500, side: projectSide("results"), focusSb: true,
  body: `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Projects</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Valencia BESS</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Base case 2027</a><span class="sep">${ic("right", 12, 2)}</span><b>Technical results</b>`,
  eyebrow: `<span style="display:inline-flex;align-items:center;gap:9px">Engineering ${src("storebrid")}</span>`,
  title: "Technical results",
  meta: "Base case 2027 · hourly · run 2 hours ago",
  actions: `<button class="btn btn-secondary"><i style="width:6px;height:6px;border-radius:50%;background:${SB};display:block"></i>Open full results in StoreBrid${ic("upRight", 14, 1.8)}</button>`,
})}
${simTabs("results")}
<div class="kpirow">
  ${kpi({ label: "Energy discharged", value: "65.2 GWh", source: src("storebrid"), delta: "+4.1%" })}
  ${kpi({ label: "Full cycles / year", value: "326", source: src("storebrid"), delta: "+12" })}
  ${kpi({ label: "Utilisation", value: "74%", source: src("storebrid"), delta: "+2 pp" })}
  ${kpi({ label: "Round-trip efficiency", value: "88%", source: src("storebrid") })}
  ${kpi({ label: "Capacity at year 15", value: "73%", source: src("storebrid"), delta: "−2.1 %/yr" })}
</div>
<section class="panel lift" style="padding:24px 26px;margin-top:28px">
  <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:14px">
    <div>
      <div class="band" style="color:var(--b700)">Operation</div>
      <h2 class="t-sec" style="margin-top:8px">Power and state of charge</h2>
      <p class="t-meta" style="margin-top:6px;font-size:12px">Highest-spread day this month · 21 August</p>
    </div>
    ${legend([["Charging", "#5B8DEF"], ["Discharging", "#1D4ED8"], ["State of charge", "#54617A", true]])}
  </div>
  ${dispatchChart(1040)}
</section>
<div style="display:flex;gap:22px;margin-top:24px;align-items:stretch">
  <section class="panel" style="flex:1;min-width:0;padding:24px 26px">
    <div class="band" style="color:var(--b700)">Energy balance</div>
    <h2 class="t-sec" style="margin-top:8px">Where the energy goes</h2>
    <p class="t-meta" style="margin-top:6px;font-size:12px;line-height:1.55">
      One year. 88% round-trip means 8.9 GWh never comes back out.
    </p>
    <div style="margin-top:14px">${energyBalance(500)}</div>
  </section>
  <section class="panel" style="flex:1;min-width:0;padding:24px 26px">
    <div class="band" style="color:var(--b700)">Degradation</div>
    <h2 class="t-sec" style="margin-top:8px">Effective capacity over life</h2>
    <p class="t-meta" style="margin-top:6px;font-size:12px;line-height:1.55">
      2.1%/yr. The financial case reads this — less capacity later means less energy to sell.
    </p>
    <div style="margin-top:14px">${degradation(500)}</div>
  </section>
</div>
<p class="t-meta" style="margin-top:18px;line-height:1.6">
  Three views, not thirty. Daily graphs, heat maps, detailed tables and CSV exports stay in StoreBrid —
  <a href="#" style="font-size:11px;font-weight:500">open full results${ic("upRight", 11, 2)}</a>.
</p>
${finSummary("base2h", "base")}`,
});

/* ═══════════════════════════════════════════════════════════════
   THE ANALYSIS MODEL — owned here, never re-derived in a view
   The project baseline is canonical and set in Settings. The ANALYSIS
   baseline is a Suite-only lens: pointing it at another case changes
   which deltas are shown and nothing else. No simulation re-runs, no
   scenario is edited, no value changes — only the reference does.
   ═══════════════════════════════════════════════════════════════ */
const PROJECT_BASE = { tid: "base2h", sid: "base" };
const selLabel = (c) => `${c.t.short} + ${c.sc.name}`;
const selKey = (c) => `${c.t.id}|${c.sc.id}`;

/* §4 · The product only pays off if the combinations worth keeping get
   kept. Where an explored combination has no name, say quietly what a
   name would buy — a line of copy, never a modal and never a blocker. */
const unsavedOf = (list) => list.filter((c) => !savedAs(c.t.id, c.sc.id));
const nameItHint = ({ body, cta }) => `
<div style="display:flex;align-items:center;gap:11px;padding:10px 15px;border-radius:var(--r-xs);
     background:linear-gradient(168deg,rgba(14,157,168,.05),rgba(255,255,255,0) 78%);
     box-shadow:inset 0 0 0 1px rgba(14,157,168,.13)">
  <span style="color:var(--su700);display:flex;flex:none">${ic("layers", 14)}</span>
  <span style="flex:1;min-width:0;font-size:12px;color:var(--s700);line-height:1.55">${body}</span>
  ${cta ? `<a href="#" style="flex:none;font-size:12px;font-weight:500;white-space:nowrap">${cta}</a>` : ""}
</div>`;
let BASE = caseOf(PROJECT_BASE.tid, PROJECT_BASE.sid);
const isProjectBase = () => BASE.t.id === PROJECT_BASE.tid && BASE.sc.id === PROJECT_BASE.sid;

/* Which dimension separates two cases. Everything that claims to explain
   a difference reads this first — a claim the model cannot support is
   simply not made. */
const diffKind = (a, b) => {
  const sameT = a.t.id === b.t.id, sameS = a.sc.id === b.sc.id;
  if (sameT && sameS) return { key: "same", label: "No difference" };
  if (sameT) return { key: "rv", label: "Financial only", chip: src("revenew"), dot: RN };
  if (sameS) return { key: "sb", label: "Technical only", chip: src("storebrid"), dot: SB };
  return { key: "both", label: "Technical and financial", chip: src("combined"), dot: CMB };
};

/* §3 · the controlled cases needed to explain a difference. When both
   dimensions moved, the two intermediates already exist in the matrix —
   the Suite does not build anything, it picks the right four cells. */
const explainSet = (base, sel) => {
  const k = diffKind(base, sel);
  if (k.key === "same") return { kind: k, cases: [base] };
  if (k.key !== "both") return { kind: k, cases: [base, sel] };
  return {
    kind: k,
    cases: [base, caseOf(base.t.id, sel.sc.id), caseOf(sel.t.id, base.sc.id), sel],
    commercialFirst: [base, caseOf(base.t.id, sel.sc.id), sel],
    technicalFirst: [base, caseOf(sel.t.id, base.sc.id), sel],
  };
};

/* Both orders reach the same total. Where they split it differently, the
   residual is reported rather than one order being picked silently. */
const contributions = (mk, base, sel) => {
  const g = (c) => MET[mk].get(c);
  const e = explainSet(base, sel);
  if (e.kind.key !== "both") return { simple: true, kind: e.kind, total: g(sel) - g(base) };
  const [a, b1, , d] = e.cases, cTech = e.cases[2];
  return {
    simple: false, kind: e.kind, total: g(d) - g(a),
    commercialFirst: { commercial: g(b1) - g(a), technical: g(d) - g(b1) },
    technicalFirst: { technical: g(cTech) - g(a), commercial: g(d) - g(cTech) },
    interaction: (g(d) - g(b1)) - (g(cTech) - g(a)),
  };
};
const MET = {
  irr:    { label: "IRR", fmt: (c) => c.irr.toFixed(1) + "%", get: (c) => c.irr, pt: true, from: "combined",
            sub: (c) => eurM(c.rev) + " revenue", why: FINMODEL },
  rev:    { label: "Annual revenue", fmt: (c) => eurM(c.rev), get: (c) => c.rev, from: "revenew",
            sub: (c) => c.irr.toFixed(1) + "% IRR",
            why: "Revenue is ReveNew's own output. It moves with the financial scenario and with how much energy StoreBrid says there is to sell." },
  perMwh: { label: "Revenue / MWh", fmt: (c) => "€" + c.perMwh.toFixed(1), get: (c) => c.perMwh, from: "combined",
            sub: (c) => c.t.gwh + " GWh discharged",
            why: "Annual revenue (ReveNew) ÷ energy discharged (StoreBrid). It says what a MWh through the battery is worth, which is why more duration can lower it." },
  perCyc: { label: "Revenue / cycle", fmt: (c) => "€" + Math.round(c.perCycle).toLocaleString("en-GB"), get: (c) => c.perCycle, from: "combined",
            sub: (c) => c.t.cycles + " full cycles",
            why: "Annual revenue (ReveNew) ÷ full cycles per year (StoreBrid) — what one round trip earns." },
  gwh:    { label: "Energy discharged", fmt: (c) => c.t.gwh + " GWh", get: (c) => c.t.gwh, from: "storebrid",
            sub: (c) => c.t.mwh + " MWh · " + c.t.dur.toFixed(1) + " h",
            why: "A StoreBrid output. It is constant across a row — the financial scenario cannot change how much energy the asset moves." },
  capex:  { label: "CAPEX", fmt: (c) => "€" + c.t.capex.toFixed(1) + "M", get: (c) => c.t.capex, lowerBetter: true, from: "storebrid",
            sub: (c) => c.t.mwh + " MWh installed",
            why: "A StoreBrid cost output, constant across a row. Lower is better, so the best cell here is the cheapest — not the highest." },
  cycles: { label: "Full cycles / year", fmt: (c) => String(c.t.cycles), get: (c) => c.t.cycles, from: "storebrid",
            sub: (c) => c.t.dur.toFixed(1) + " h duration" },
  util:   { label: "Utilisation", fmt: (c) => c.t.util + "%", get: (c) => c.t.util, pt: true, from: "storebrid",
            sub: (c) => c.t.gwh + " GWh discharged" },
};
/* the six metrics the matrix and Compare both offer, in one order.
   variesTech / variesComm are domain facts, not display choices: they
   decide whether the matrix has three columns or one. */
const METKEYS = ["irr", "rev", "perMwh", "perCyc", "gwh", "capex"];

/* ═══════════════════════════════════════════════════════════════
   §2-§7 · DECISION CRITERIA
   The matrix used to ask "which metric do you want to see?". It now
   asks "what are you trying to achieve, and what will you not accept?"
   — the same six metrics, reframed as objectives, plus optional
   constraints ON RESULTS THAT ALREADY EXIST. Nothing here models
   anything: a criterion can only accept or reject a number StoreBrid
   or ReveNew already produced. Storage size, prices, curves and
   assumptions stay where they are edited.
   ═══════════════════════════════════════════════════════════════ */
/* "IRR" and "CAPEX" are acronyms, not sentence-case words — lowercasing
   them wholesale produced "What irr says about this project". */
const inSentence = (s) => (/^[A-Z0-9]{2,}$/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1));
const objectiveOf = (mk) => (MET[mk].lowerBetter ? "Minimise " : "Maximise ") + MET[mk].label;

const bestBy = (mk, pool) => {
  if (!pool.length) return null;
  const m = MET[mk], better = m.lowerBetter ? (x, y) => x < y : (x, y) => x > y;
  return pool.reduce((a, b) => (better(m.get(b), m.get(a)) ? b : a));
};

const VARIES = {
  irr:    { tech: true,  comm: true },
  rev:    { tech: true,  comm: true },
  perMwh: { tech: true,  comm: true },
  perCyc: { tech: true,  comm: true },
  gwh:    { tech: true,  comm: false },
  capex:  { tech: true,  comm: false },
  cycles: { tech: true,  comm: false },
  util:   { tech: true,  comm: false },
};
const variesComm = (mk) => VARIES[mk].comm;
const metricTabs = (on, keys = METKEYS) => `
<div class="tabs">${keys.map((k) => `<a href="#" class="${k === on ? "on" : ""}">${MET[k].label}</a>`).join("")}</div>`;
/* percentage points for a rate, per cent for a quantity — never mixed */
const deltaOf = (mk, c, base = BASE) => {
  const m = MET[mk], v = m.get(c), b = m.get(base);
  if (Math.abs(v - b) < 1e-9) return { txt: "—", tone: "flat", t: 0 };
  const t = m.pt ? v - b : ((v - b) / b) * 100;
  const good = m.lowerBetter ? v < b : v > b;
  return { txt: (t > 0 ? "+" : "−") + Math.abs(t).toFixed(1) + (m.pt ? " pp" : "%"), tone: good ? "up" : "down", t };
};
const deltaChip = (d, size = 10.5, neutral) => d.tone === "flat"
  ? `<span style="font-size:${size}px;color:var(--s400)">—</span>`
  : `<span style="font-size:${size}px;font-weight:600;color:${
      neutral ? "var(--s700)" : d.tone === "up" ? "#0E9469" : "#C22222"}">${d.txt}</span>`;
/* judged metrics carry a good/bad reading; descriptive ones only carry size */
const isNeutral = (mk) => MX[mk] && MX[mk].judge === false;

/* ── §20–§23 · Case detail. Context, outcome, combined — no causality ── */
const groupStats = (label, source, rows) => `
<div style="flex:1;min-width:0">
  <div style="display:flex;align-items:center;gap:9px"><span class="band">${label}</span>${source}</div>
  <div class="rows" style="margin-top:10px">
    ${rows.map(([k, v]) => `
      <div style="display:flex;align-items:baseline;justify-content:space-between;gap:14px;padding:12px 0">
        <span style="font-size:12.5px;color:var(--s500)">${k}</span>
        <b style="font-size:15px;font-weight:600;color:var(--s900);white-space:nowrap;font-variant-numeric:tabular-nums">${v}</b>
      </div>`).join("")}
  </div>
</div>`;

const cd = caseOf("base2h", "high");
const caseDetail = doc({
  w: 1440, h: 1920, side: projectSide("cases"),
  body: `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Projects</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Valencia BESS</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Cases</a><span class="sep">${ic("right", 12, 2)}</span><b>Base case 2027 + High spread</b>`,
  eyebrow: "Analysis case · Suite",
  title: "Base case 2027 + High spread",
  meta: "One technical case, one financial scenario, and what falls out of the pair.",
  actions: `<button class="btn btn-secondary">${ic("euro", 16)}Edit forecast</button>
            <button class="btn btn-primary">${ic("analytics", 16)}Compare cases</button>`,
})}
<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap">
  <span class="band">Case definition</span>
  <span class="cov"><i style="background:${diffKind(BASE, cd).dot}"></i>${diffKind(BASE, cd).label} vs baseline</span>
  <span class="t-meta">Baseline ${selLabel(BASE)} — same simulation, same ${cd.t.gwh} GWh, same €${cd.t.capex.toFixed(1)}M invested.</span>
  <span style="flex:1"></span>
  <span class="t-meta">Technical run 2h ago · financial calculation 4h ago · case up to date</span>
</div>
${caseBar({ tid: "base2h", sid: "high",
  delta: `<span style="font-size:12px;font-weight:600;color:#0E9469">${deltaOf("perMwh", cd).txt}</span>` })}

${sec({ label: "Key outcome", sub: "Absolute figures, with movement against the Base 2 h + Base market baseline." })}
<div class="kpirow">
  ${kpi({ label: "Annual revenue", value: eurM(cd.rev), source: src("revenew"), delta: "+16.4% vs base market" })}
  ${kpi({ label: "IRR", value: cd.irr.toFixed(1) + "%", source: src("combined"), combined: true, delta: "+0.6 pp",
          formula: "Financial model · unchanged CAPEX" })}
  ${kpi({ label: "CAPEX", value: "€" + cd.t.capex.toFixed(1) + "M", source: src("storebrid") })}
  ${kpi({ label: "Revenue / MWh discharged", value: "€" + cd.perMwh.toFixed(1), source: src("combined"), combined: true,
          formula: `${eurM(cd.rev)} ÷ ${cd.t.gwh} GWh discharged` })}
  ${kpi({ label: "Revenue / cycle", value: "€" + Math.round(cd.perCycle).toLocaleString("en-GB"), source: src("combined"), combined: true,
          formula: `${eurM(cd.rev)} ÷ ${cd.t.cycles} full cycles` })}
</div>

<section class="panel lift" style="padding:26px 28px;margin-top:28px;display:flex;gap:34px">
  ${groupStats("Technical context", src("storebrid"),
    [["Energy discharged", cd.t.gwh + " GWh"], ["Full cycles / year", cd.t.cycles], ["Utilisation", cd.t.util + "%"],
     ["Round-trip efficiency", cd.t.rte + "%"], ["Capacity at year 15", "73%"]])}
  <span style="width:1px;background:var(--hair)"></span>
  ${groupStats("Financial outcome", src("revenew"),
    [["Annual revenue", eurM(cd.rev)], ["Capture price", "€" + cd.sc.capture.toFixed(1) + "/MWh"],
     ["Spot average", "€71.4/MWh"], ["Capture rate", (cd.sc.capture / 71.4 * 100).toFixed(0) + "%"],
     ["Merchant share", "39%"]])}
  <span style="width:1px;background:var(--hair)"></span>
  ${groupStats("Combined metrics", src("combined"),
    [["Revenue / MWh discharged", "€" + cd.perMwh.toFixed(1)], ["Revenue / cycle", "€" + Math.round(cd.perCycle).toLocaleString("en-GB")],
     ["Revenue / MW installed", "€" + Math.round(cd.perMw / 1000) + "k"], ["Revenue / CAPEX", (cd.rev / cd.t.capex * 100).toFixed(1) + "%"],
     ["IRR", cd.irr.toFixed(1) + "%"]])}
</section>
<p class="t-meta" style="margin-top:14px;line-height:1.6;max-width:112ch">
  Every combined figure divides a ReveNew number by a StoreBrid one — none of them is claimed as a cause. ${FINMODEL}
</p>

<div style="display:flex;gap:22px;margin-top:26px;align-items:stretch">
  <section class="panel" style="flex:1;min-width:0;padding:24px 26px">
    <div style="display:flex;align-items:center;gap:9px"><span class="band" style="color:var(--rv600)">Financial outcome</span>${src("revenew")}</div>
    <h2 class="t-sec" style="margin-top:8px">Revenue by year</h2>
    <div style="margin:14px 0 8px">${legend([["Contracted (PPA)", "#7B2D80"], ["Merchant", "#C74FC9"], ["Without PPA", "#54617A", true]])}</div>
    ${revenueChart(500)}
  </section>
  <section class="panel" style="flex:1;min-width:0;padding:24px 26px">
    <div style="display:flex;align-items:center;gap:9px"><span class="band" style="color:var(--b700)">Technical context</span>${src("storebrid")}</div>
    <h2 class="t-sec" style="margin-top:8px">Energy discharged by month</h2>
    <div style="margin:14px 0 8px">${legend([["GWh discharged", SB]])}</div>
    ${monoTrend(GWH.map((g) => +(g * 65.2 / 512).toFixed(1)), SB, "GWh", 500)}
  </section>
</div>

<section class="panel" style="padding:24px 26px;margin-top:24px">
  <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px">
    <div>
      <div style="display:flex;align-items:center;gap:9px"><span class="band">Combined metric</span>${src("combined")}</div>
      <h2 class="t-sec" style="margin-top:8px">Revenue per MWh discharged, by month</h2>
      <p class="t-meta" style="margin-top:6px;font-size:12px;max-width:88ch">
        The two series above, divided. It is a combined figure — the months that move the most energy are not the months worth the most per MWh.
      </p>
    </div>
    ${legend([["Revenue / MWh discharged", "#6D5AC6"], ["GWh discharged", "rgba(37,99,235,.34)"]])}
  </div>
  <div style="margin-top:14px">${valueOverTime(1040)}</div>
</section>`,
});
console.log("Results (3 core views) · CaseDetail");





console.log("CaseMatrix · CompareCases");


/* ═══════════════════════════════════════════════════════════════
   BASELINE AND DELTAS
   Everything below is measured against one declared case, so the
   question stops being "what are the numbers" and becomes
   "what changed, and was it worth it".
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   MATRIX BEHAVIOUR PER METRIC (§12–§18)
   The geometry never changes — rows are StoreBrid simulations,
   columns are ReveNew scenarios — because the entities compared
   never change. Everything that carries MEANING does change:
   the question, the ranking, whether an extreme is a judgement at
   all, the context under each value, the highlights, the chart
   beneath, and the sentence that reads the result.
   ═══════════════════════════════════════════════════════════════ */
const ALLC = () => TECH.flatMap((t) => SCEN.map((s) => caseOf(t.id, s.id)));
const topBy = (f, arr = ALLC()) => arr.reduce((a, b) => (f(b) > f(a) ? b : a));
const lowBy = (f, arr = ALLC()) => arr.reduce((a, b) => (f(b) < f(a) ? b : a));
const eurK = (v) => "€" + Math.round(v).toLocaleString("en-GB");
const pct = (a, b) => ((a - b) / b) * 100;

/* A highlight names the criterion it optimises. Some name a case;
   the trade-off cards name a relationship instead, because the honest
   answer to "which is best" is sometimes "that depends what you buy". */
/* §7, §32 · These are SUPPORTING readings, so they sit on the flat wash
   the design system already uses for secondary tiles. They used to carry
   the same elevation as the matrix panel itself, which told the eye that
   an aside mattered as much as the hero. Depth is hierarchy here: lift for
   the one protagonist, panel for a section, wash for what supports it. */
const hl = ({ label, tone, value, unit, c, meta, note }) => `
<div class="wash" style="flex:1;min-width:0;padding:17px 19px;
     box-shadow:inset 3px 0 0 ${tone}5c">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:10px">
    <span class="band" style="color:${tone};font-size:10px">${label}</span>
    ${c ? src("combined") : ""}
  </div>
  <div style="display:flex;align-items:baseline;gap:7px;margin-top:10px">
    <span style="font-size:25px;font-weight:700;letter-spacing:-.026em;color:var(--s900);font-variant-numeric:tabular-nums">${value}</span>
    ${unit ? `<span style="font-size:12px;font-weight:500;color:var(--s400)">${unit}</span>` : ""}
  </div>
  ${c ? `
  <div style="display:flex;align-items:center;gap:8px;margin-top:9px;flex-wrap:wrap">
    <span style="display:inline-flex;align-items:center;gap:5px">
      <i style="width:4px;height:4px;border-radius:50%;background:${SB};display:block"></i>
      <span style="font-size:12px;font-weight:500;color:var(--s700)">${c.t.short}</span>
    </span>
    <span style="font-size:11px;color:var(--s400)">+</span>
    <span style="display:inline-flex;align-items:center;gap:5px">
      <i style="width:4px;height:4px;border-radius:50%;background:${RN};display:block"></i>
      <span style="font-size:12px;font-weight:500;color:var(--s700)">${c.sc.name}</span>
    </span>
  </div>` : `<div style="margin-top:9px"><span class="t-meta">${note || ""}</span></div>`}
  <div class="t-meta" style="margin-top:8px;line-height:1.5">${meta}</div>
</div>`;

/* ── the trade-off chart under each matrix (§23) ──────────────────
   One chart, one question, and never a second one for decoration.
   Nine marks in one violet — identity comes from position and a
   direct label, never from colour alone. The three technical
   simulations separate along x, the three scenarios along y. */
/* Scenario identity is carried by MARK SHAPE, not colour: one violet at
   one weight keeps the page restrained, and shape survives every kind of
   colour vision. Direct labels go only on the baseline and the selected
   case — a label on all nine collides and reads as noise. */
const SHAPE = { base: "circle", high: "square", low: "triangle" };
const markPath = (kind, cx, cy, r) =>
  kind === "square" ? `<rect x="${(cx - r * .88).toFixed(1)}" y="${(cy - r * .88).toFixed(1)}" width="${(r * 1.76).toFixed(1)}" height="${(r * 1.76).toFixed(1)}" rx="1.5"`
  : kind === "triangle" ? `<path d="M${cx.toFixed(1)} ${(cy - r * 1.12).toFixed(1)}L${(cx + r).toFixed(1)} ${(cy + r * .74).toFixed(1)}L${(cx - r).toFixed(1)} ${(cy + r * .74).toFixed(1)}Z"`
  : `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}"`;
const shapeKey = () => `
<span style="display:inline-flex;align-items:center;gap:14px">
  ${SCEN.map((sc) => `
    <span style="display:inline-flex;align-items:center;gap:6px">
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">${markPath(SHAPE[sc.id], 7, 7, 4.6)} fill="#6D5AC6" fill-opacity=".7"/></svg>
      <span class="t-meta">${sc.name}</span>
    </span>`).join("")}
</span>`;

function tradeoff({ xOf, yOf, xTicks, yTicks, xFmt, yFmt, xLab, yLab, xSrc, ySrc, sel, w = 1240 }) {
  const H = 360, L = 76, R = 44, TT = 40, B = 92;
  const pw = w - L - R, ph = H - TT - B;
  const cs = ALLC();
  const xs = cs.map(xOf), ys = cs.map(yOf);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), xp = (x1 - x0) * 0.16 || 1;
  const y0 = Math.min(...ys), y1 = Math.max(...ys), yp = (y1 - y0) * 0.16 || 1;
  const X = (v) => L + ((v - (x0 - xp)) / ((x1 + xp) - (x0 - xp))) * pw;
  const Y = (v) => TT + ph - ((v - (y0 - yp)) / ((y1 + yp) - (y0 - yp))) * ph;
  const gx = xTicks.map((g) =>
    `<line x1="${X(g).toFixed(1)}" y1="${TT}" x2="${X(g).toFixed(1)}" y2="${TT + ph}" stroke="${GRID}" stroke-width="1"/>
     <text x="${X(g).toFixed(1)}" y="${TT + ph + 17}" text-anchor="middle" font-size="10" fill="${AXIS}">${xFmt(g)}</text>`).join("");
  const gy = yTicks.map((g) =>
    `<line x1="${L}" y1="${Y(g).toFixed(1)}" x2="${w - R}" y2="${Y(g).toFixed(1)}" stroke="${GRID}" stroke-width="1"/>
     <text x="${L - 11}" y="${(Y(g) + 3.6).toFixed(1)}" text-anchor="end" font-size="10" fill="${AXIS}">${yFmt(g)}</text>`).join("");
  /* each technical simulation is a RANGE: how far the market alone can
     move the result at that level of investment */
  const groups = TECH.map((t) => {
    const grp = cs.filter((c) => c.t.id === t.id);
    const gy2 = grp.map(yOf), gx2 = grp.map(xOf);
    return { t, grp, lo: Math.min(...gy2), hi: Math.max(...gy2), x: (Math.min(...gx2) + Math.max(...gx2)) / 2 };
  });
  /* two simulations can sit almost on top of each other in x, so the
     range labels are laid out on one row and pushed apart first */
  const lane = TT + ph + 30;
  let lastLx = -1e9;
  const spans = groups.slice().sort((a, b) => X(a.x) - X(b.x)).map((g) => {
    const cx = X(g.x);
    let lx = cx;
    if (lx - lastLx < 168) lx = lastLx + 168;
    lx = Math.min(lx, w - R - 78);
    lastLx = lx;
    return `
    <line x1="${cx.toFixed(1)}" y1="${Y(g.lo).toFixed(1)}" x2="${cx.toFixed(1)}" y2="${Y(g.hi).toFixed(1)}"
          stroke="rgba(109,90,198,.34)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="${cx.toFixed(1)}" y1="${(Y(g.lo) + 8).toFixed(1)}" x2="${lx.toFixed(1)}" y2="${(lane - 20).toFixed(1)}"
          stroke="rgba(30,58,138,.2)" stroke-width="1"/>
    <text x="${lx.toFixed(1)}" y="${(lane - 6).toFixed(1)}" text-anchor="middle" font-size="11.5" font-weight="700" fill="${INK}" ${KO}>${g.t.short}</text>
    <text x="${lx.toFixed(1)}" y="${(lane + 8).toFixed(1)}" text-anchor="middle" font-size="10" fill="${AXIS}" ${KO}>${yFmt(g.lo)} – ${yFmt(g.hi)} across markets</text>`;
  }).join("");
  const marks = cs.map((c) => {
    const isBase = c.t.id === BASE.t.id && c.sc.id === BASE.sc.id;
    const isSel = !!sel && c.t.id === sel.tid && c.sc.id === sel.sid;
    const cx = X(xOf(c)), cy = Y(yOf(c));
    return `
    ${isBase || isSel ? `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="13" fill="none" stroke="${SU}" stroke-width="${isSel ? 2.2 : 1.6}" ${isBase ? 'stroke-dasharray="3 3"' : ""}/>` : ""}
    ${markPath(SHAPE[c.sc.id], cx, cy, 7.5)} fill="#6D5AC6" fill-opacity="${isBase || isSel ? "1" : ".78"}" stroke="#fff" stroke-width="2"><title>${c.t.short} + ${c.sc.name} — ${yFmt(yOf(c))}</title></${SHAPE[c.sc.id] === "circle" ? "circle" : SHAPE[c.sc.id] === "square" ? "rect" : "path"}>
    ${isBase || isSel ? `<text x="${(cx + 19).toFixed(1)}" y="${(cy + 4).toFixed(1)}" font-size="10.5" font-weight="600" fill="${INK}"
      stroke="#fff" stroke-width="3.2" paint-order="stroke">${isBase ? "Baseline" : "Selected"} · ${c.sc.name}</text>` : ""}`;
  }).join("");
  /* the key sits inside the plot, beside the marks it explains */
  const key = `
  <g transform="translate(${L + 4},${16})">
    ${SCEN.map((sc, i) => `
      <g transform="translate(${i * 132},0)">
        ${markPath(SHAPE[sc.id], 6, 6, 5.5)} fill="#6D5AC6" fill-opacity=".8" stroke="#fff" stroke-width="1.6"/>
        <text x="18" y="10" font-size="10.5" fill="${AXIS}">${sc.name}</text>
      </g>`).join("")}
  </g>`;
  return `
<svg viewBox="0 0 ${w} ${H}" width="100%" style="display:block" role="img" aria-label="${yLab} against ${xLab}, one vertical range per technical simulation">
  ${MKSTYLE}${gx}${gy}${spans}${marks}${key}
  <text x="${w - R}" y="${H - 8}" text-anchor="end" font-size="10.5" fill="${AXIS}">${xLab} →</text>
  <text transform="translate(17,${TT + ph / 2}) rotate(-90)" text-anchor="middle" font-size="10.5" fill="${AXIS}">↑ ${yLab}</text>
</svg>
<div style="display:flex;align-items:center;gap:16px;padding-top:12px;border-top:1px solid var(--hair);flex-wrap:wrap">
  <span style="display:inline-flex;align-items:center;gap:8px">
    <svg width="16" height="16" aria-hidden="true"><line x1="8" y1="2" x2="8" y2="14" stroke="rgba(109,90,198,.34)" stroke-width="2.5" stroke-linecap="round"/></svg>
    <span class="t-meta">each vertical range is one technical simulation — its height is what the financial case alone is worth</span>
  </span>
  <span style="flex:1"></span>
  <span style="display:inline-flex;align-items:center;gap:12px">
    <span style="display:inline-flex;align-items:center;gap:6px">
      <svg width="15" height="15" aria-hidden="true"><circle cx="7.5" cy="7.5" r="6" fill="none" stroke="${SU}" stroke-width="1.5" stroke-dasharray="3 3"/></svg>
      <span class="t-meta">baseline</span></span>
    ${sel ? `<span style="display:inline-flex;align-items:center;gap:6px">
      <svg width="15" height="15" aria-hidden="true"><circle cx="7.5" cy="7.5" r="6" fill="none" stroke="${SU}" stroke-width="2"/></svg>
      <span class="t-meta">selected</span></span>` : ""}
    ${src(ySrc)}
  </span>
</div>`;
}

/* Row-constant metrics get bars, not a scatter: there is no second
   measure to plot them against, and inventing one would be a lie. */
function techBars({ valueOf, fmt, note, w = 1240, sel }) {
  const H = 230, L = 150, R = 220, TT = 14, B = 16;
  const pw = w - L - R, ph = H - TT - B;
  const vals = TECH.map(valueOf), max = Math.max(...vals) * 1.04;
  const bh = 40, gap = (ph - TECH.length * bh) / (TECH.length - 1 || 1);
  return `
<svg viewBox="0 0 ${w} ${H}" width="100%" style="display:block" role="img" aria-label="Value by technical simulation">
  ${MKSTYLE}
  ${TECH.map((t, i) => {
    const y = TT + i * (bh + gap), bw = (valueOf(t) / max) * pw;
    const isSel = !!sel && t.id === sel.tid, isBase = t.id === BASE.t.id;
    return `
    <text x="${L - 14}" y="${(y + bh / 2 - 2).toFixed(1)}" text-anchor="end" font-size="11.5" font-weight="600" fill="${INK}">${t.short}</text>
    <text x="${L - 14}" y="${(y + bh / 2 + 12).toFixed(1)}" text-anchor="end" font-size="10" fill="${AXIS}">${t.mwh} MWh · ${t.dur.toFixed(1)} h</text>
    <path class="mk" d="${bar(L, y, Math.max(bw, 3), bh, 4, true)}" fill="${SB}" fill-opacity="${isSel ? ".9" : ".6"}"><title>${t.short} — ${fmt(t)}</title></path>
    ${isSel ? `<path d="${bar(L, y, Math.max(bw, 3), bh, 4, true)}" fill="none" stroke="${SU}" stroke-width="2"/>` : ""}
    <text x="${(L + bw + 13).toFixed(1)}" y="${(y + bh / 2 - 2).toFixed(1)}" font-size="13" font-weight="700" fill="${INK}">${fmt(t)}</text>
    <text x="${(L + bw + 13).toFixed(1)}" y="${(y + bh / 2 + 12).toFixed(1)}" font-size="10" fill="${AXIS}">${note(t)}${isBase ? " · baseline" : ""}${isSel ? " · selected" : ""}</text>`;
  }).join("")}
</svg>`;
}

/* ── the per-metric table: question, ranking semantics, context,
      highlights, chart and the sentence that reads it ──────────── */
const V4H = T("v4h"), B2H = T("base2h"), LRT = T("lowrte");
const cBH = caseOf("base2h", "high"), cVH = caseOf("v4h", "high"),
      cBB = caseOf("base2h", "base"), cVB = caseOf("v4h", "base"),
      cLL = caseOf("lowrte", "low"), cLB = caseOf("lowrte", "base"),
      cLH = caseOf("lowrte", "high"), cBL = caseOf("base2h", "low");

const MX = {
  irr: {
    q: "Which combination of asset and market produces the strongest return on the money invested?",
    unit: "per cent", judge: true,
    sub: (c) => `${eurM(c.rev)} revenue · €${c.t.capex.toFixed(1)}M CAPEX`,
    cards: () => [
      hl({ label: "Highest return", tone: "#5B4BB5", value: cVH.irr.toFixed(1) + "%", c: cVH,
           meta: `€${cVH.t.capex.toFixed(1)}M invested · +${(cVH.irr - BASE.irr).toFixed(1)} pp vs baseline. The most return, and also the most capital at risk.` }),
      hl({ label: "Best return on the baseline investment", tone: "#0A6E77", value: cBH.irr.toFixed(1) + "%", c: cBH,
           meta: `+${(cBH.irr - BASE.irr).toFixed(1)} pp for no additional CAPEX — the whole gain comes from the market, not from the asset.` }),
      hl({ label: "Weakest return", tone: "#9A6208", value: cLL.irr.toFixed(1) + "%", c: cLL,
           meta: `${signed(cLL.irr - BASE.irr, 1)} pp vs baseline. A 3 pp round-trip loss and the softest market compound.` }),
    ],
    chart: (sel) => tradeoff({
      xOf: (c) => c.t.capex, yOf: (c) => c.irr,
      xTicks: [42, 45, 48, 51], yTicks: [9, 11, 13, 15],
      xFmt: (v) => "€" + v + "M", yFmt: (v) => v + "%",
      xLab: "CAPEX (€M)", yLab: "IRR (%)", xSrc: "storebrid", ySrc: "combined", sel }),
    chartTitle: "Return against investment",
    chartQ: "Within a cluster only the market moved, so the vertical spread is what a financial scenario is worth at fixed investment. Moving right costs capital.",
    read: `Return rises with duration and with spread, but not by the same mechanism. The 4&nbsp;h variant reaches 14.1% only by committing €8.6M more;
           Base 2&nbsp;h under High spread reaches 13.4% on the money already committed. Whether the extra 0.7&nbsp;pt is worth €8.6M is the decision — Compare puts that increment on its own.`,
  },
  rev: {
    q: "Which combination produces the largest annual revenue?",
    unit: "€ per year", judge: true,
    sub: (c) => `${c.t.gwh} GWh discharged · €${c.perMwh.toFixed(1)}/MWh`,
    cards: () => [
      hl({ label: "Highest annual revenue", tone: "#5B4BB5", value: eurM(cVH.rev), c: cVH,
           meta: `+${pct(cVH.rev, BASE.rev).toFixed(1)}% vs baseline — but on a ${cVH.t.mwh} MWh asset, not the ${BASE.t.mwh} MWh one the baseline prices.` }),
      hl({ label: "Most revenue on the same asset", tone: "#0A6E77", value: eurM(cBH.rev), c: cBH,
           meta: `+${pct(cBH.rev, BASE.rev).toFixed(1)}% vs baseline with CAPEX unchanged at €${cBH.t.capex.toFixed(1)}M. Nothing was built to earn it.` }),
      hl({ label: "What the revenue lead costs", tone: "#9A6208", value: `+€${(cVH.t.capex - cBH.t.capex).toFixed(1)}M`, unit: "CAPEX",
           note: "4 h variant vs Base 2 h, both on High spread",
           meta: `Buys +${eurM(cVH.rev - cBH.rev)} a year. Revenue is a size measure as much as a performance measure — read it beside CAPEX, or switch to Revenue / MWh.` }),
    ],
    chart: (sel) => tradeoff({
      xOf: (c) => c.t.capex, yOf: (c) => c.rev,
      xTicks: [42, 45, 48, 51], yTicks: [7, 9, 11, 13],
      xFmt: (v) => "€" + v + "M", yFmt: (v) => "€" + v + "M",
      xLab: "CAPEX (€M)", yLab: "Annual revenue (€M / yr)", xSrc: "storebrid", ySrc: "revenew", sel }),
    chartTitle: "Revenue against investment",
    chartQ: "Does the revenue lead come from a better asset or simply a bigger one? High and far right means the revenue was bought with capital.",
    read: `Annual revenue is ReveNew's own output and rises with both duration and spread — which is exactly why it is a poor sole criterion.
           The leader discharges 41.7% more energy because it stores twice as much, so most of its revenue advantage was bought rather than earned. Revenue / MWh separates the two.`,
  },
  perMwh: {
    q: "Which combination monetises each MWh that actually leaves the battery most effectively?",
    unit: "€ per MWh discharged", judge: true,
    sub: (c) => `${eurM(c.rev)} ÷ ${c.t.gwh} GWh`,
    cards: () => [
      hl({ label: "Best monetisation", tone: "#0A6E77", value: "€" + cBH.perMwh.toFixed(1), c: cBH,
           meta: `Every MWh discharged earns €${cBH.perMwh.toFixed(1)} — the highest in the matrix, and on the smaller of the two batteries.` }),
      hl({ label: "Highest revenue, weaker per MWh", tone: "#5B4BB5", value: "€" + cVH.perMwh.toFixed(1), c: cVH,
           meta: `The revenue leader monetises each MWh ${Math.abs(pct(cVH.perMwh, cBH.perMwh)).toFixed(1)}% worse. A longer battery sells into more hours, including cheaper ones.` }),
      hl({ label: "Best technical configuration for price", tone: "#1D4ED8", value: "Base 2 h", unit: "row",
           note: `€${cBL.perMwh.toFixed(1)} – €${cBH.perMwh.toFixed(1)} across the three scenarios`,
           meta: `Highest €/MWh in every column. Short duration concentrates discharge into the highest-priced hours of the day.` }),
    ],
    chart: (sel) => tradeoff({
      xOf: (c) => c.t.gwh, yOf: (c) => c.perMwh,
      xTicks: [65, 75, 85, 92], yTicks: [105, 120, 135, 150],
      xFmt: (v) => v + " GWh", yFmt: (v) => "€" + v,
      xLab: "Energy discharged (GWh / yr)", yLab: "Revenue / MWh discharged (€)", xSrc: "storebrid", ySrc: "combined", sel }),
    chartTitle: "Volume against unit value",
    chartQ: "The downward slope is the trade-off itself: the configurations that move the most energy are not the ones that earn the most for each MWh moved.",
    read: `This is the metric that separates a bigger asset from a better one. Base 2&nbsp;h leads every column because a two-hour battery discharges only into the
           steepest part of the day; the 4&nbsp;h variant reaches further down the price curve to place its extra energy. Neither is wrong — they are different products.`,
  },
  perCyc: {
    q: "How much financial value does one full charge–discharge cycle generate?",
    unit: "€ per full cycle", judge: true,
    sub: (c) => `${c.t.cycles} cycles / yr · ${eurM(c.rev)}`,
    cards: () => [
      hl({ label: "Most value per cycle", tone: "#5B4BB5", value: eurK(cVH.perCycle), c: cVH,
           meta: `${cVH.t.cycles} cycles a year, each moving twice the energy of a 2 h cycle. Fewer, larger round trips.` }),
      hl({ label: "Most value per cycle at 2 h", tone: "#0A6E77", value: eurK(cBH.perCycle), c: cBH,
           meta: `${cBH.t.cycles} cycles a year of half the size. More cycling, less value in each one.` }),
      hl({ label: "Why this metric misleads on its own", tone: "#9A6208",
           value: ((cVH.t.gwh / cVH.t.cycles) / (cBH.t.gwh / cBH.t.cycles)).toFixed(1) + "×", unit: "energy per cycle",
           note: "4 h variant vs Base 2 h",
           meta: `Per-cycle value is high mainly because each cycle is larger, not because the energy sells better. Cycles are what warranties and degradation curves are written against, which is what makes it worth watching at all.` }),
    ],
    chart: (sel) => tradeoff({
      xOf: (c) => c.t.cycles, yOf: (c) => c.perCycle / 1000,
      xTicks: [230, 265, 300, 330], yTicks: [20, 32, 44, 53],
      xFmt: (v) => v, yFmt: (v) => "€" + v + "k",
      xLab: "Full cycles per year (StoreBrid)", yLab: "Revenue per cycle (€k)", xSrc: "storebrid", ySrc: "combined", sel }),
    chartTitle: "Cycling frequency against value per cycle",
    chartQ: "The 4 h cluster sits top-left: fewer cycles, more value in each. That is a warranty and degradation argument, not a revenue one.",
    read: `Cycle count is what battery warranties and degradation curves are written against, so value per cycle is the bridge between the financial result and the
           cell replacement schedule in StoreBrid. It is a supporting metric, never a ranking on its own — a battery that never cycles has infinite value per cycle and no revenue.`,
  },
  gwh: {
    q: "Which technical configuration delivers the most energy to the grid?",
    unit: "GWh per year", judge: false, rowConstant: true,
    sub: (c) => `${c.t.cycles} cycles / yr · ${c.t.util}% utilisation`,
    cards: () => [
      hl({ label: "Most energy discharged", tone: "#1D4ED8", value: String(V4H.gwh), unit: "GWh / yr",
           note: `4 h variant · ${V4H.mwh} MWh · ${V4H.dur.toFixed(1)} h`,
           meta: `${V4H.cycles} full cycles a year at ${V4H.util}% utilisation. The highest throughput of the three simulations.` }),
      hl({ label: "Energy for double the storage", tone: "#0A6E77", value: "+" + pct(V4H.gwh, B2H.gwh).toFixed(1) + "%", unit: "energy",
           note: `for +${pct(V4H.mwh, B2H.mwh).toFixed(0)}% storage capacity`,
           meta: `Doubling storage adds ${(V4H.gwh - B2H.gwh).toFixed(1)} GWh, not ${B2H.gwh}. Installed power and the export limit did not move, so the extra capacity can only discharge over more hours — never faster.` }),
      hl({ label: "Cost of a round trip", tone: "#9A6208", value: (LRT.rte - B2H.rte) + " pp", unit: "round-trip",
           note: `Low RTE vs Base 2 h, both ${B2H.mwh} MWh`,
           meta: `Costs ${(B2H.gwh - LRT.gwh).toFixed(1)} GWh a year — energy the asset absorbs and never returns. Efficiency shows up here before it shows up in revenue.` }),
    ],
    chart: (sel) => techBars({
      valueOf: (t) => t.gwh, fmt: (t) => t.gwh + " GWh", unit: "Energy discharged",
      note: (t) => `${t.cycles} cycles · ${t.util}% utilisation · ${t.rte}% round-trip`, sel }),
    chartTitle: "Energy discharged by technical simulation",
    chartQ: "One bar per simulation — there is no financial dimension to plot against. Storage capacity and round-trip efficiency are what move it.",
    read: `Energy discharged is a StoreBrid output and does not change with the financial scenario: these simulations were dispatched against one price signal, and
           the Suite does not re-run them per scenario. Throughput is the input to almost every other metric here — but on its own it says nothing about whether the energy was worth moving.`,
  },
  capex: {
    q: "How much capital does each technical configuration require?",
    unit: "€ million", judge: false, rowConstant: true, lowerBetter: true,
    sub: (c) => `${c.t.mwh} MWh · ${c.t.dur.toFixed(1)} h · ${c.t.mw} MW`,
    cards: () => [
      hl({ label: "Lowest investment", tone: "#0A6E77", value: "€" + LRT.capex.toFixed(1) + "M", unit: "CAPEX",
           note: `Low RTE · ${LRT.mwh} MWh · ${LRT.dur.toFixed(1)} h`,
           meta: `€${(B2H.capex - LRT.capex).toFixed(1)}M less than the baseline — cheaper cells, ${B2H.rte - LRT.rte} points less round-trip efficiency.` }),
      hl({ label: "Highest investment", tone: "#1D4ED8", value: "€" + V4H.capex.toFixed(1) + "M", unit: "CAPEX",
           note: `4 h variant · ${V4H.mwh} MWh · ${V4H.dur.toFixed(1)} h`,
           meta: `+${pct(V4H.capex, B2H.capex).toFixed(1)}% for double the storage — not double the cost. Power conversion and the grid connection are already paid for.` }),
      hl({ label: "Cheaper is not better here", tone: "#9A6208", value: (cLB.irr - BASE.irr).toFixed(1) + " pp", unit: "IRR",
           note: "Low RTE vs Base 2 h, both on Base market",
           meta: `Saving €${(B2H.capex - LRT.capex).toFixed(1)}M gives up ${Math.abs(cLB.irr - BASE.irr).toFixed(1)} pp of return. Nothing in this matrix costs less than the baseline and beats it.` }),
    ],
    chart: (sel) => techBars({
      valueOf: (t) => t.capex, fmt: (t) => "€" + t.capex.toFixed(1) + "M", unit: "CAPEX",
      note: (t) => `€${Math.round((t.capex * 1e6) / (t.mwh * 1e3))}/kWh installed · ${t.mw} MW`, sel }),
    chartTitle: "Investment by technical simulation",
    chartQ: "The annotation is the reading that matters: unit cost per kWh installed falls sharply with duration, because the power equipment and the connection are shared across more storage.",
    read: `CAPEX comes from the StoreBrid configuration and is identical across every financial scenario — a market assumption cannot change what the plant costs to build.
           Lower is not automatically better: this column is here to be read against IRR and revenue, which is the whole reason both live in one matrix.`,
  },
};

/* ── the grid (§19) ──────────────────────────────────────────────
   Primary value, one line of metric-specific context, movement
   against the baseline. Marked in words as well as tint, and the
   words change with the metric: a judged metric has a best and a
   weakest, a descriptive one has a most and a least. */
const cellMark = (text, color, tint) =>
  `<span style="display:inline-flex;align-items:center;gap:4px;height:18px;padding:0 7px;border-radius:6px;
     font-size:10px;font-weight:600;letter-spacing:.02em;background:${tint};color:${color}">${text}</span>`;

const matrixGrid = (mk, sel, evalModel = false) => {
  const m = MET[mk], x = MX[mk], rowConstant = !variesComm(mk);
  const vals = ALLC().map(m.get);
  const lo = Math.min(...vals), hi = Math.max(...vals);
  const top = m.lowerBetter ? lo : hi, bot = m.lowerBetter ? hi : lo;
  const words = x.judge
    ? { top: m.lowerBetter ? "Lowest" : "Best", bot: m.lowerBetter ? "Highest" : "Weakest" }
    : { top: m.lowerBetter ? "Least" : "Most", bot: m.lowerBetter ? "Most" : "Least" };
  const neutral = x.judge === false;
  const tint = (v) => {
    const t = hi === lo ? 0.5 : (v - lo) / (hi - lo);
    /* descriptive metric: one hue, light to dark by magnitude — a
       sequential ramp, which is what a quantity with no polarity needs */
    if (neutral) return `background:linear-gradient(168deg,rgba(37,99,235,${(0.03 + t * 0.11).toFixed(3)}),rgba(255,255,255,0) 78%)`;
    const g = m.lowerBetter ? 1 - t : t;
    return g >= 0.5
      ? `background:linear-gradient(168deg,rgba(109,90,198,${(0.025 + (g - 0.5) * 0.17).toFixed(3)}),rgba(255,255,255,0) 78%)`
      : `background:linear-gradient(168deg,rgba(245,158,11,${((0.5 - g) * 0.10).toFixed(3)}),rgba(255,255,255,0) 78%)`;
  };
  const NEU = ["#334155", "rgba(30,58,138,.07)"];
  const head = `
<div style="display:flex;gap:14px;margin-bottom:14px">
  <span style="width:236px;flex:none;display:flex;align-items:flex-end">
    <span class="t-meta">Technical simulation ↓ &nbsp;·&nbsp; Financial case →</span>
  </span>
  ${SCEN.map((s2) => `
    <span style="flex:1;min-width:0;text-align:center;${rowConstant ? "opacity:.45" : ""}">
      <span style="display:block;font-size:13.5px;font-weight:600;color:var(--s900)">${s2.name}</span>
      <span style="display:flex;align-items:center;justify-content:center;gap:7px;margin-top:5px">
        <span class="t-meta">capture €${s2.capture.toFixed(1)}/MWh</span>${src("revenew")}
      </span>
    </span>`).join("")}
</div>
${rowConstant ? `
<div style="display:flex;align-items:center;gap:11px;padding:11px 15px;margin-bottom:14px;border-radius:var(--r-xs);
     background:linear-gradient(168deg,rgba(37,99,235,.055),rgba(255,255,255,0) 72%);box-shadow:inset 0 0 0 1px rgba(37,99,235,.14)">
  <span style="color:var(--b700);display:flex;flex:none">${ic("battery", 15)}</span>
  <span style="flex:1;min-width:0;font-size:12.5px;color:var(--s700);line-height:1.5">
    <b style="font-weight:600">${m.label} does not vary by financial scenario.</b>
    It is a StoreBrid output of the simulation, so each row holds one value across all three columns. The Suite shows it that way rather than inventing a difference.
  </span>
  ${src("storebrid")}
</div>` : ""}`;

  const rows = TECH.map((t) => {
    const rowSel = !!sel && sel.tid === t.id;
    const c0 = caseOf(t.id, SCEN[0].id), v0 = m.get(c0);
    const header = `
    <span style="width:236px;flex:none;display:flex;flex-direction:column;justify-content:center;padding-right:12px;
          ${rowConstant && rowSel ? "box-shadow:inset 3px 0 0 " + SU + ";padding-left:11px" : ""}">
      <span style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
        <span style="font-size:13.5px;font-weight:600;color:var(--s900)">${t.short}</span>
        ${t.id === "v4h" ? cellMark("New", "#0A6E77", "rgba(14,157,168,.13)") : ""}
        ${rowConstant && rowSel ? cellMark("Selected", "#0A6E77", "rgba(14,157,168,.14)") : ""}
      </span>
      <span class="t-meta" style="margin-top:5px">${t.mw} MW · ${t.mwh} MWh · ${t.dur.toFixed(1)} h · ${t.rte}% RTE</span>
      <span style="margin-top:7px">${src("storebrid")}</span>
    </span>`;
    if (rowConstant) {
      const win = v0 === top, low = v0 === bot && !win;
      const isBase = t.id === BASE.t.id;
      const d = deltaOf(mk, c0);
      return `
      <div style="display:flex;gap:14px;align-items:stretch;margin-bottom:14px">
        ${header}
        <span class="${win ? "glass-sm" : "wash"}" style="flex:1;min-width:0;padding:13px 20px 16px;display:flex;align-items:center;gap:22px;${tint(v0)};
              ${win ? "box-shadow:0 0 0 1px rgba(37,99,235,.28), var(--sh-md), inset 0 1px 0 rgba(255,255,255,.92)" : ""}">
          <span style="flex:none;text-align:center;min-width:150px">
            <span style="display:flex;justify-content:center;height:18px;margin-bottom:5px">
              ${win ? cellMark(words.top, NEU[0], NEU[1]) : low ? cellMark(words.bot, NEU[0], NEU[1]) : ""}
            </span>
            <span style="display:block;font-size:${win ? "25" : "22"}px;font-weight:${win ? "700" : "600"};letter-spacing:-.024em;
                  color:var(--s900);font-variant-numeric:tabular-nums">${m.fmt(c0)}</span>
            <span style="display:block;margin-top:8px">
              ${isBase ? `<span class="cov"><i style="background:${SU}"></i>Baseline</span>`
                       : `${deltaChip(d, 11, neutral)}<span class="t-meta" style="margin-left:5px">vs baseline</span>`}
            </span>
          </span>
          <span style="width:1px;align-self:stretch;background:var(--hair);flex:none"></span>
          <span style="flex:1;min-width:0">
            <span class="t-meta" style="display:block;line-height:1.55">${x.sub(c0)}</span>
            ${t.id === TECH[0].id ? `<span class="t-meta" style="display:block;margin-top:6px;line-height:1.55">
              One value per row, held across all three columns — the three cases in this row differ only in what the energy earns.
            </span>` : ""}
          </span>
        </span>
      </div>`;
    }
    return `
    <div style="display:flex;gap:14px;align-items:stretch;margin-bottom:14px">
      ${header}
      ${SCEN.map((s2) => {
        const c = caseOf(t.id, s2.id), v = m.get(c);
        const win = v === top, low = v === bot && !win;
        const isBase = t.id === BASE.t.id && s2.id === BASE.sc.id;
        const isSel = !!sel && sel.tid === t.id && sel.sid === s2.id;
        const d = deltaOf(mk, c);
        const ring = isSel ? "box-shadow:0 0 0 2px rgba(14,157,168,.6), var(--sh-md), inset 0 1px 0 rgba(255,255,255,.92)"
                   : win ? "box-shadow:0 0 0 1px rgba(109,90,198,.34), var(--sh-md), inset 0 1px 0 rgba(255,255,255,.92)" : "";
        const mark = isSel ? cellMark("Selected", "#0A6E77", "rgba(14,157,168,.14)")
                   : win ? cellMark(words.top, neutral ? NEU[0] : "#5B4BB5", neutral ? NEU[1] : "rgba(109,90,198,.13)")
                   : low ? cellMark(words.bot, neutral ? NEU[0] : "#9A6208", neutral ? NEU[1] : "rgba(245,158,11,.14)") : "";
        const saved = savedAs(t.id, s2.id), stale = isStale(t.id, s2.id);
        const est = evalOf(t.id, s2.id, evalModel);
        const fails = CRITERIA.length && est === "ok" ? failsOf(c) : [];
        const dim = fails.length ? "opacity:.52;" : "";
        if (est !== "ok") return `
        <a href="#" class="wash" style="flex:1;min-width:0;padding:13px 16px 16px;text-decoration:none;text-align:center">
          <span style="display:flex;justify-content:center;height:18px;margin-bottom:5px">
            ${est === "calc" ? `<span class="cov" style="border-color:rgba(37,99,235,.3);background:linear-gradient(168deg,rgba(37,99,235,.1),rgba(37,99,235,.05));color:var(--b700)"><i style="background:${SB}"></i>Calculating</span>` : ""}
          </span>
          <span style="display:block;font-size:22px;font-weight:600;letter-spacing:-.024em;color:var(--s300);font-variant-numeric:tabular-nums">—</span>
          <span class="t-meta" style="display:block;margin-top:6px;line-height:1.5">
            ${est === "calc" ? "Started 20 seconds ago" : "Not evaluated"}</span>
          <span style="display:block;margin-top:9px">
            ${est === "calc"
              ? `<span class="t-meta" style="opacity:.8">Result appears here when it finishes</span>`
              : `<span class="btn btn-secondary" style="height:28px;font-size:11.5px;pointer-events:none">${ic("gauge", 13)}Calculate</span>`}
          </span>
          <span style="display:flex;align-items:center;justify-content:center;gap:6px;margin-top:10px;padding-top:9px;border-top:1px solid var(--hair)">
            <span class="t-meta" style="opacity:.75">Not saved</span>
          </span>
        </a>`;
        return `
        <a href="#" class="${win || isSel ? "glass-sm" : "wash"}" style="flex:1;min-width:0;padding:13px 16px 16px;text-decoration:none;text-align:center;${tint(v)};${ring};${dim}">
          <span style="display:flex;justify-content:center;height:18px;margin-bottom:5px">${stale ? staleTag() : mark}</span>
          <span style="display:block;font-size:${win || isSel ? "25" : "22"}px;font-weight:${win || isSel ? "700" : "600"};letter-spacing:-.024em;
                color:${stale ? "var(--s500)" : "var(--s900)"};font-variant-numeric:tabular-nums">${m.fmt(c)}</span>
          <span class="t-meta" style="display:block;margin-top:6px;line-height:1.5">${x.sub(c)}</span>
          <span style="display:block;margin-top:9px">
            ${isBase ? `<span class="cov"><i style="background:${SU}"></i>Baseline</span>`
                     : `${deltaChip(d, 11, neutral)}<span class="t-meta" style="margin-left:5px">vs baseline</span>`}
          </span>
          <span style="display:flex;align-items:center;justify-content:center;gap:6px;margin-top:10px;padding-top:9px;border-top:1px solid var(--hair)">
            ${saved
              ? `<i style="width:4px;height:4px;flex:none;border-radius:50%;background:${SU};display:block"></i>
                 <span class="t-meta" style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${saved.name}</span>`
              : `<span class="t-meta" style="opacity:.75">Not saved</span>`}
          </span>
          ${CRITERIA.length ? `<span style="display:flex;align-items:center;justify-content:center;gap:6px;margin-top:7px">
            ${fails.length
              ? `<span class="t-meta" style="color:${WARN.ink}">${fails.length === 1 ? fails[0].k.label + " " + (fails[0].k.op === "≤" ? "over" : "under") + " limit" : fails.length + " criteria not met"}</span>`
              : `<span style="display:inline-flex;align-items:center;gap:5px;color:var(--su700)">${ic("check", 12, 2.6)}<span class="t-meta" style="color:var(--su700)">Meets criteria</span></span>`}
          </span>` : ""}
        </a>`;
      }).join("")}
    </div>`;
  }).join("");
  return head + rows;
};

/* §21 · the selected case survives a metric change, because the
   selection is a case, not a number. The panel is the same five
   figures whichever tab is open. */
/* §2 · one baseline treatment, reused everywhere. Teal ring, the word
   baseline, and — when the analysis is pointed somewhere other than the
   project's own case — the way back. */
const baselineBar = ({ pop } = {}) => `
<div style="display:flex;align-items:flex-start;gap:14px;margin-bottom:22px;flex-wrap:wrap">
  <span class="t-lab" style="font-weight:600;color:var(--s700);padding-top:11px">Analysis baseline</span>
  <div>
    <button class="btn btn-secondary" style="${isProjectBase() ? "" : "box-shadow:0 0 0 1px rgba(14,157,168,.4), var(--sh-xs), inset 0 1px 0 rgba(255,255,255,.92)"}">
      <i style="width:5px;height:5px;border-radius:50%;background:${SB};display:block"></i>${BASE.t.short}
      <span style="color:var(--s400)">+</span>
      <i style="width:5px;height:5px;border-radius:50%;background:${RN};display:block"></i>${BASE.sc.name}${ic("down", 15, 1.8)}
    </button>
    ${pop ? baselineMenu(`${BASE.t.id}|${BASE.sc.id}`) : ""}
  </div>
  ${isProjectBase()
    ? `<span class="t-meta" style="padding-top:12px">Every delta on this page is measured against it.</span>`
    : `<span style="display:inline-flex;align-items:center;gap:10px;padding-top:7px">
         <span class="cov" style="height:26px"><i style="background:${SU}"></i>Not the project baseline</span>
         <a href="#" style="font-size:12.5px;font-weight:500;display:inline-flex;align-items:center;gap:5px">${ic("back", 13, 1.9)}Restore ${caseOf(PROJECT_BASE.tid, PROJECT_BASE.sid).t.short} + ${caseOf(PROJECT_BASE.tid, PROJECT_BASE.sid).sc.name}</a>
       </span>`}
</div>`;

/* §21 · the selected case survives a metric change, because the selection
   is a case, not a number. §3 · and it is where an explanation starts. */
const cellPreview = (sel, mk) => {
  const c = caseOf(sel.tid, sel.sid);
  const k = diffKind(BASE, c);
  /* §11 · Selected against baseline, read as movement rather than as five
     numbers to subtract by eye. The bar is relative change so metrics in
     different units sit on one scale; the figure stays absolute. Direction
     means better or worse, never sign — a lower CAPEX points the same way
     as a higher NPV. */
  const bars = () => {
    const keys = ["capex", "gwh", "rev", "irr", "perMwh"];
    const rows = keys.map((kk) => {
      const mm = MET[kk], base = mm.get(BASE), v = mm.get(c);
      const d = v - base, rel = d / (Math.abs(base) || 1);
      return { kk, mm, d, rel, good: d === 0 ? null : (mm.lowerBetter ? d < 0 : d > 0) };
    });
    const gmax = Math.max(...rows.map((r) => Math.abs(r.rel)), 0.0001);
    return rows.map((r) => {
      const on = r.kk === mk, w = (Math.abs(r.rel) / gmax) * 50;
      const dd = deltaOf(r.kk, c);
      return `
      <div style="display:flex;align-items:center;gap:14px;padding:9px 0;${on ? "box-shadow:inset 2px 0 0 " + SU : ""}">
        <span style="flex:none;width:${on ? "150" : "162"}px;${on ? "padding-left:12px" : ""};min-width:0">
          <span style="display:block;font-size:12px;color:var(--s500)">${r.mm.label}</span>
          <span style="display:block;font-size:14.5px;font-weight:600;color:var(--s900);margin-top:2px;font-variant-numeric:tabular-nums">${r.mm.fmt(c)}</span>
        </span>
        <span style="flex:1;min-width:0;position:relative;height:20px;display:block">
          <span style="position:absolute;left:50%;top:0;bottom:0;width:1px;background:rgba(30,58,138,.16);display:block"></span>
          <span class="mk" style="position:absolute;top:5px;height:10px;border-radius:3px;display:block;
                ${r.good ? `left:50%;width:${w.toFixed(1)}%` : `right:50%;width:${w.toFixed(1)}%`};
                background:${isNeutral(r.kk) ? FIELD : r.good ? SU : WARN.ink};opacity:${r.good === null ? ".25" : ".62"}"></span>
        </span>
        <span style="flex:none;width:118px;text-align:right">
          <span style="display:block">${deltaChip(dd, 11, isNeutral(r.kk))}</span>
        </span>
        <span style="flex:none;width:92px">${src(r.mm.from)}</span>
      </div>`;
    }).join("");
  };
  const stat = (kk, label) => {
    const m = MET[kk], d = deltaOf(kk, c), on = kk === mk;
    return `
    <span style="flex:1;min-width:0;${on ? "box-shadow:inset 2px 0 0 " + SU + ";padding-left:13px" : ""}">
      <span style="display:flex;align-items:center;gap:7px">
        <span class="t-meta">${label}</span>${on ? cellMark("On the matrix", "#0A6E77", "rgba(14,157,168,.12)") : ""}
      </span>
      <span style="display:block;font-size:19px;font-weight:700;letter-spacing:-.02em;color:var(--s900);margin-top:5px;font-variant-numeric:tabular-nums">${m.fmt(c)}</span>
      <span style="display:flex;align-items:center;gap:7px;margin-top:6px">${deltaChip(d, 11, isNeutral(kk))}${src(m.from)}</span>
    </span>`;
  };
  const note = k.key === "same" ? "This case is the analysis baseline, so every delta on the page is measured from here."
    : k.key === "rv" ? `Same simulation as the baseline — ${c.t.gwh} GWh, €${c.t.capex.toFixed(1)}M. The difference is entirely commercial.`
    : k.key === "sb" ? `Same financial scenario as the baseline. The difference is entirely technical.`
    : `Both dimensions differ from the baseline. Explaining the split needs two controlled steps — Compare builds them.`;
  return `
<div style="display:flex;gap:14px;margin-top:-4px">
  <span style="width:236px;flex:none"></span>
  ${SCEN.map((s2) => `<span style="flex:1;min-width:0;display:flex;justify-content:center">${
    s2.id === sel.sid && variesComm(mk) ? `<span style="width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;
      border-bottom:8px solid rgba(255,255,255,.96);display:block;filter:drop-shadow(0 -1px 0 rgba(14,157,168,.28))"></span>` : ""}</span>`).join("")}
</div>
<section class="raise" style="padding:20px 24px;box-shadow:0 0 0 1px rgba(14,157,168,.28), var(--sh-lg), inset 0 1px 0 rgba(255,255,255,1)">
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
    <span class="band" style="color:var(--su700)">Selected case</span>
    <span style="display:inline-flex;align-items:center;gap:7px">
      <i style="width:5px;height:5px;border-radius:50%;background:${SB};display:block"></i>
      <span style="font-size:14px;font-weight:600;color:var(--s900)">${c.t.short}</span>
    </span>
    <span style="font-size:13px;color:var(--s400)">×</span>
    <span style="display:inline-flex;align-items:center;gap:7px">
      <i style="width:5px;height:5px;border-radius:50%;background:${RN};display:block"></i>
      <span style="font-size:14px;font-weight:600;color:var(--s900)">${c.sc.name}</span>
    </span>
    ${savedAs(sel.tid, sel.sid)
      ? `<span class="cov"><i style="background:${SU}"></i>Saved as ${savedAs(sel.tid, sel.sid).name}</span>`
      : `<span class="cov" style="opacity:.82">Unsaved combination</span>`}
    ${(() => {
      /* §11 · Eligibility belongs where the decision is being made, and it
         has to say WHY and BY HOW MUCH — "does not meet criteria" alone
         leaves the user to work out which limit and by how far. */
      if (!CRITERIA.length) return "";
      const f = failsOf(c);
      if (!f.length) return `<span class="cov" style="border-color:rgba(14,157,168,.3);background:linear-gradient(168deg,rgba(14,157,168,.1),rgba(14,157,168,.05));color:var(--su700)">
        <i style="background:${SU}"></i>Meets all criteria</span>`;
      return f.map((x) => staleTag(
        `${x.k.label} ${x.k.op === "≤" ? "exceeds limit by" : "short of limit by"} ${x.k.fmt(Math.abs(x.by)).replace("−", "")}`)).join("");
    })()}
    ${k.key === "same" ? `<span class="cov"><i style="background:${SU}"></i>Baseline</span>`
                       : `<span class="cov"><i style="background:${k.dot}"></i>${k.label} vs baseline</span>`}
    <span style="flex:1"></span>
    ${savedAs(sel.tid, sel.sid)
      ? `<button class="btn btn-ghost" style="height:34px;font-size:12.5px">${ic("gauge", 15)}Use as current analysis</button>`
      : `<button class="btn btn-secondary" style="height:34px;font-size:12.5px">${ic("plus", 15, 1.9)}Save as analysis case</button>`}
    <button class="btn btn-secondary" style="height:34px;font-size:12.5px">${ic("plus", 15, 1.9)}Add to comparison</button>
    ${k.key === "same" ? "" : `<button class="btn btn-primary" style="height:34px;font-size:12.5px">${ic("analytics", 15)}Explain difference${ic("right", 14, 2)}</button>`}
  </div>
  <div style="display:flex;gap:26px;margin-top:18px;padding-top:16px;border-top:1px solid var(--hair)">
    <span style="flex:1;min-width:0">
      <span style="display:flex;align-items:center;gap:12px;margin-bottom:4px">
        <span class="band" style="font-size:10px">Selected against ${AC("base").name}</span>
        <span class="hr" style="flex:1"></span>
        <span class="t-meta">← worse</span>
        <span class="t-meta">better →</span>
      </span>
      ${bars()}
    </span>
  </div>
  ${k.key === "both" ? "" : `<p class="t-meta" style="margin-top:16px;line-height:1.6">${note}</p>`}
  ${(() => {
    /* §9 · Why this cell reads differently, decomposed the way the domain
       splits: what StoreBrid changed, what ReveNew changed, and what came
       out of the two together. Each line is a subtraction between this
       pairing and the baseline — the Suite reports the difference attached
       to each step and never claims one caused the other. When only one
       dimension moved, the other column says so instead of inventing a
       contribution. Level 2 evidence; Compare holds the full path. */
    if (k.key === "same") return "";
    const b = BASE, sgn = (v, d = 1, u = "") => (v >= 0 ? "+" : "−") + Math.abs(v).toFixed(d) + u;
    const tMoved = c.t.id !== b.t.id, fMoved = c.sc.id !== b.sc.id;
    const col = (band, tone, sr, rows, none) => `
      <div style="flex:1;min-width:0;padding:0 20px">
        <div style="display:flex;align-items:center;gap:8px">
          <span class="band" style="font-size:10px;color:${tone}">${band}</span>${sr}
        </div>
        ${rows.length ? rows.map(([v, l]) => `
          <div style="margin-top:11px">
            <span style="display:block;font-size:15px;font-weight:600;color:var(--s900);font-variant-numeric:tabular-nums">${v}</span>
            <span class="t-meta" style="display:block;margin-top:2px">${l}</span>
          </div>`).join("")
        : `<p class="t-meta" style="margin-top:11px;line-height:1.55">${none}</p>`}
      </div>`;
    return `
<div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--hair)">
  <span class="band" style="color:var(--su700)">Why this pairing reads differently</span>
  <div style="display:flex;align-items:flex-start;margin-top:12px">
    ${col("Technical contribution", "var(--b700)", src("storebrid"),
      tMoved ? [[sgn(c.t.mwh - b.t.mwh, 0, " MWh"), "storage capacity"],
                [sgn(c.t.gwh - b.t.gwh, 1, " GWh/yr"), "energy discharged"]] : [],
      "Same StoreBrid simulation as the baseline — the asset is unchanged.")}
    <span style="width:1px;align-self:stretch;background:var(--hair);flex:none"></span>
    ${col("Financial contribution", "var(--rv600)", src("revenew"),
      fMoved ? [[sgn(c.sc.capture - b.sc.capture, 1, "/MWh"), "capture price"],
                [sgn(c.rev - b.rev, 2, "M/yr"), "annual revenue"]] : [],
      "Same ReveNew financial case as the baseline — the market view is unchanged.")}
    <span style="width:1px;align-self:stretch;background:var(--hair);flex:none"></span>
    ${col("Combined outcome", "var(--su700)", src("combined"),
      [[sgn(npvOfCase(c) - npvOfCase(b), 1, "M NPV"), "net present value"],
       [sgn(c.irr - b.irr, 1, " pp IRR"), "return on the money invested"]], "")}
  </div>
  <p class="t-meta" style="margin-top:14px;line-height:1.6">
    ${tMoved && fMoved
      ? `Both dimensions moved, so these two contributions cannot be added into a causal split — the share each takes depends on which one moves first. <b style="font-weight:600;color:var(--s700)">Explain difference</b> builds both controlled orders and names the residual.`
      : tMoved
        ? "Only the asset changed, so the whole difference is attached to the technical step at a fixed market view."
        : "Only the market view changed, so the whole difference is attached to the financial step on the asset already committed."}
  </p>
</div>`;
  })()}
  ${savedAs(sel.tid, sel.sid) ? "" : `<div style="margin-top:14px">${nameItHint({
    body: `Right now this pairing exists only while the cell is selected. Give it a name and it becomes an analysis case — it can be set as the current analysis, pulled into Compare, and reopened later with its figures re-read from both products.`,
    cta: "" })}</div>`}
</section>`;
};

/* ── the Cases page: one component, six analytical states ──────── */
/* La rejilla y todo lo que la rodea. Vive aparte de casesBody para que
   Performance y Robustness sean dos ramas simétricas de la misma pantalla,
   y no un template anidado dentro de otro. */
/* §15 · The screens assume every pairing can be read live, because that is
   what the current architecture implies. If evaluation turns out to cost
   something, the matrix must not pretend the number is already there —
   so the cell has a second life cycle: not evaluated -> calculating ->
   available. Saved analysis cases are always available; they were
   evaluated when they were named. Nothing about the layout changes, only
   what the cell is allowed to claim. */
const EVALSTATE = { "lowrte|base": "calc", "base2h|low": "none", "lowrte|low": "none",
                    "v4h|base": "none", "lowrte|high": "none" };
const evalOf = (tid, sid, on) => (on && !savedAs(tid, sid) ? (EVALSTATE[`${tid}|${sid}`] || "ok") : "ok");

const perfView = ({ mk = "irr", sel, evalModel = false, baselinePop } = {}) => {
  const m = MET[mk], x = MX[mk];
  return `${(() => {
  /* §2-§3, §9, §21 · Everything the matrix needs to be read, in one band
     above it: what is being optimised, what will not be accepted, and the
     three numbers that frame the grid. It replaces a metric header, a
     criteria section and three large ranking cards that together pushed
     the hero below the fold. Nothing was deleted — the per-metric cards
     and the other objectives now sit AFTER the thing they describe. */
  const all = ALLCOMBOS(), pool = claimable();
  const nOk = all.filter((c) => eligible(c)).length;
  const fresh = all.filter((c) => !isStale(c.t.id, c.sc.id));
  const win = bestBy(mk, CRITERIA.length ? pool : fresh);
  const worst = fresh.reduce((a, b) => (m.lowerBetter ? (m.get(b) > m.get(a) ? b : a) : (m.get(b) < m.get(a) ? b : a)));
  const stat = (label, c, tone) => `
    <span style="flex:1;min-width:0">
      <span class="band" style="font-size:10px;${tone ? `color:${tone}` : ""}">${label}</span>
      <span style="display:block;font-size:19px;font-weight:700;letter-spacing:-.022em;color:var(--s900);margin-top:6px;font-variant-numeric:tabular-nums">${c ? m.fmt(c) : "—"}</span>
      <span class="t-meta" style="display:block;margin-top:4px;line-height:1.4">${c ? `${c.t.short} × ${c.sc.name}` : "no case within criteria"}</span>
    </span>`;
  return `
<section class="panel" style="display:flex;align-items:stretch;padding:0;margin-bottom:20px;flex-wrap:wrap">
  <div style="flex:1.5;min-width:300px;padding:20px 24px;display:flex;flex-direction:column;justify-content:center">
    <div class="band">Evaluate combinations by</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:7px;flex-wrap:wrap">
      <h2 class="t-sec">${objectiveOf(mk)}</h2>
      <span class="t-meta">${x.unit}</span>${src(m.from)}
    </div>
    <p class="t-meta" style="margin-top:8px;line-height:1.5">${x.q}</p>
  </div>
  <div style="width:1px;background:var(--hair);flex:none"></div>
  <div style="flex:1;min-width:250px;padding:20px 24px">
    <div style="display:flex;align-items:center;gap:9px">
      <span class="band" style="font-size:10px">Decision criteria</span>
      <a href="#" style="font-size:11.5px;font-weight:500">Edit</a>
    </div>
    <div style="display:flex;gap:7px;margin-top:9px;flex-wrap:wrap">
      ${CRITERIA.length ? CRITERIA.map(({ key, target }) => {
        const k = CRIT_SPEC[key];
        return `<span class="cov" style="gap:6px"><span style="color:var(--s500)">${k.label}</span><b style="font-weight:600;color:var(--s900)">${k.op} ${k.fmt(target)}</b></span>`;
      }).join("") : `<span class="t-meta">None — all ${all.length} combinations evaluated</span>`}
    </div>
    ${CRITERIA.length ? `<div class="t-meta" style="margin-top:10px"><b style="font-weight:600;color:var(--s900)">${nOk} of ${all.length}</b> combinations meet them</div>` : ""}

    <div style="margin-top:14px;padding-top:13px;border-top:1px solid var(--hair)">
      <span class="band" style="font-size:10px">Analysis baseline</span>
      <div style="margin-top:8px">
        <button class="btn btn-secondary" style="height:32px;font-size:12.5px;${isProjectBase() ? "" : "box-shadow:0 0 0 1px rgba(14,157,168,.4), var(--sh-xs), inset 0 1px 0 rgba(255,255,255,.92)"}">
          <i style="width:5px;height:5px;border-radius:50%;background:${SB};display:block"></i>${BASE.t.short}
          <span style="color:var(--s400)">+</span>
          <i style="width:5px;height:5px;border-radius:50%;background:${RN};display:block"></i>${BASE.sc.name}${ic("down", 14, 1.8)}
        </button>
        ${baselinePop ? baselineMenu(`${BASE.t.id}|${BASE.sc.id}`) : ""}
      </div>
      ${isProjectBase()
        ? `<div class="t-meta" style="margin-top:8px;line-height:1.45">Every delta on this page is measured against it.</div>`
        : `<div style="display:flex;align-items:center;gap:9px;margin-top:9px;flex-wrap:wrap">
             <span class="cov" style="height:24px"><i style="background:${SU}"></i>Not the project baseline</span>
             <a href="#" style="font-size:12px;font-weight:500;display:inline-flex;align-items:center;gap:5px">${ic("back", 13, 1.9)}Restore ${caseOf(PROJECT_BASE.tid, PROJECT_BASE.sid).t.short} + ${caseOf(PROJECT_BASE.tid, PROJECT_BASE.sid).sc.name}</a>
           </div>`}
    </div>
  </div>
  <div style="width:1px;background:var(--hair);flex:none"></div>
  <div style="flex:1.5;min-width:340px;padding:20px 24px;display:flex;gap:20px;align-items:center;
       background:linear-gradient(168deg,rgba(14,157,168,.045),rgba(255,255,255,0) 78%)">
    ${stat(CRITERIA.length ? (m.lowerBetter ? "Lowest within criteria" : "Highest within criteria") : (m.lowerBetter ? "Lowest" : "Highest"), win, "var(--su700)")}
    ${stat("Baseline", BASE)}
    ${stat(m.lowerBetter ? "Highest" : "Lowest", worst)}
  </div>
  <div style="width:100%;display:flex;align-items:center;gap:14px;padding:14px 24px;border-top:1px solid var(--hair);flex-wrap:wrap">
    <span class="t-meta" style="flex:none">Evaluate by</span>
    ${metricTabs(mk)}
    <span style="flex:1"></span>
    <span class="t-meta">Changing the objective re-reads the whole matrix — the combinations do not change, only what is being compared.</span>
  </div>
</section>`;
})()}

<section class="panel lift" style="padding:26px 28px;margin-top:24px">
  ${matrixGrid(mk, sel, evalModel)}
  ${sel ? cellPreview(sel, mk) : `
  <div style="display:flex;align-items:center;gap:12px;padding:14px 18px;margin-top:4px;border-radius:var(--r-xs);
       background:linear-gradient(168deg,rgba(14,157,168,.05),rgba(255,255,255,0) 72%);box-shadow:inset 0 0 0 1px rgba(14,157,168,.14)">
    <span style="color:var(--su700);display:flex;flex:none">${ic("layers", 16)}</span>
    <span style="flex:1;min-width:0;font-size:12.5px;color:var(--s700);line-height:1.5">
      Open a cell to read the case against the baseline, send it to Compare, or make it the analysis baseline.
    </span>
  </div>`}
</section>

<div style="display:flex;align-items:flex-start;gap:12px;margin-top:16px">
  <span style="flex:none;margin-top:1px">${src(m.from)}</span>
  <p class="t-meta" style="line-height:1.65;max-width:114ch;margin:0;font-size:11.5px">${x.read}</p>
</div>

<section class="panel" style="padding:24px 26px;margin-top:24px">
  <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:16px">
    <div style="flex:1;min-width:0">
      <div class="band">The trade-off behind ${inSentence(m.label)}</div>
      <h2 class="t-sec" style="margin-top:8px">${x.chartTitle}</h2>
      <p class="t-meta" style="margin-top:7px;font-size:12px;line-height:1.6;max-width:96ch">${x.chartQ}</p>
    </div>
    ${src(m.from)}
  </div>
  ${x.chart(sel)}
</section>

${(() => {
  /* §1 · the aggregate notice Compare already carries, at matrix scale.
     Only SAVED analysis cases can be outdated — an unsaved combination is
     calculated live when the cell is opened, so it has no age to be stale
     against. The notice says so, or the empty cells read as unchecked.  */
  const out = ACASES.filter((a) => isStale(a.tid, a.sid));
  if (!out.length) return "";
  const one = out.length === 1;
  return staleNotice({
    body: `${out.length} of the ${ACASES.length} saved analysis cases ${one ? "is" : "are"} outdated — ${one ? `<b style="font-weight:600;color:var(--s900)">${out[0].name}</b> was priced` : "they were priced"} before the technical simulation changed. The other ${TECH.length * SCEN.length - ACASES.length} combinations are calculated live and are never outdated.`,
    cta: "Recalculate in ReveNew" });
})()}
${sec({ label: "Other ways to read the matrix", source: src("suite"), top: 26,
        sub: "The same nine combinations, read against objectives other than the one selected above. Rankings, not recommendations — which objective matters is your decision." })}
<section class="panel" style="padding:22px 26px">
  <div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap">
    <h3 style="font-size:13.5px;font-weight:600;color:var(--s900);margin:0">What ${inSentence(m.label)} says about this project</h3>
    ${src(m.from)}
    <span style="flex:1"></span>
    <span class="t-meta">${x.q}</span>
  </div>
  <div style="display:flex;gap:14px;margin-top:14px">${x.cards().join("")}</div>


${(() => {
  /* §8 · The matrix's own value proposition, stated before the grid: across
     every viable pairing, what leads on each objective. These are rankings,
     not recommendations — the label names the objective, never a preference,
     and the user picks which objective matters. Outdated results are excluded
     from every claim, the same rule Compare applies. */
  /* §7 · With criteria active the ranking that matters is the ranking
     among the alternatives the user would actually accept. The overall
     leader is still shown when it differs, because that gap IS the cost
     of the constraint — hiding it would hide the trade-off. */
  const all = ALLCOMBOS().filter((c) => !isStale(c.t.id, c.sc.id));
  const pool = CRITERIA.length ? all.filter((c) => eligible(c)) : all;
  const top = (f, better, fmt) => {
    const pick = (xs) => xs.reduce((x, y) => (better(f(y), f(x)) ? y : x));
    const w = pick(pool.length ? pool : all), o = pick(all);
    return { c: w, v: fmt(f(w)), out: f(o) !== f(w) ? { c: o, v: fmt(f(o)) } : null };
  };
  const up = (x, y) => x > y, down = (x, y) => x < y;
  /* The metric cards under the tabs already lead on whichever metric is
     selected, so the strip drops that objective and shows the others.
     Repeating the same figure 250px apart is the noise §17 warns about;
     what the user cannot see anywhere else is how the OTHER objectives
     rank — which is the question the matrix exists to answer. */
  const objectives = [
    ["Highest IRR", "irr", top((c) => c.irr, up, (v) => v.toFixed(1) + "%"), src("combined")],
    ["Highest NPV", null, top((c) => npvOfCase(c), up, eurMs), src("revenew")],
    ["Lowest CAPEX", "capex", top((c) => c.t.capex, down, (v) => "€" + v.toFixed(1) + "M"), src("storebrid")],
    ["Highest revenue / MWh", "perMwh", top((c) => c.perMwh, up, (v) => "€" + v.toFixed(1)), src("combined")],
  ].filter(([, key]) => key !== mk);
  return `
<div style="display:flex;align-items:baseline;gap:12px;margin:22px 0 0;padding-top:18px;border-top:1px solid var(--hair);flex-wrap:wrap">
  <h3 style="font-size:13.5px;font-weight:600;color:var(--s900);margin:0">Leaders on the other objectives</h3>
  ${src("suite")}
  <span style="flex:1"></span>
  <span class="t-meta">Across all ${TECH.length * SCEN.length} pairings, saved or not · outdated results excluded</span>
</div>
<div style="display:flex;align-items:stretch;margin-top:4px">
  ${objectives.map(([label, , { c, v, out }, sr], i) => `
    <div style="flex:1;min-width:0;padding:15px 22px 4px;${i ? "border-left:1px solid var(--hair)" : ""}">
      <div style="display:flex;align-items:center;gap:8px">
        <span class="band" style="font-size:10px">${label}${CRITERIA.length ? " within criteria" : ""}</span>${sr}
      </div>
      <div style="font-size:21px;font-weight:700;letter-spacing:-.024em;color:var(--s900);margin-top:8px;font-variant-numeric:tabular-nums">${v}</div>
      <div style="display:flex;align-items:center;gap:7px;margin-top:6px;flex-wrap:wrap">
        <span style="display:inline-flex;align-items:center;gap:5px">
          <i style="width:4px;height:4px;flex:none;border-radius:50%;background:${SB};display:block"></i>
          <span class="t-meta">${c.t.short}</span></span>
        <span style="font-size:11px;color:var(--s400)">×</span>
        <span style="display:inline-flex;align-items:center;gap:5px">
          <i style="width:4px;height:4px;flex:none;border-radius:50%;background:${RN};display:block"></i>
          <span class="t-meta">${c.sc.name}</span></span>
      </div>
      ${out ? `<div class="t-meta" style="margin-top:8px;padding-top:8px;border-top:1px solid var(--hair);line-height:1.45">
        <b style="font-weight:600;color:var(--s500)">${out.v}</b> overall — ${out.c.t.short} × ${out.c.sc.name},
        <span style="color:${WARN.ink}">outside criteria</span>
      </div>` : ""}
    </div>`).join("")}
</div>
${CRITERIA.length ? `<p class="t-meta" style="margin:14px 0 0;padding-top:14px;border-top:1px solid var(--hair);line-height:1.5">
  Ranked within your criteria. Where the outright leader is different it is shown too, because that gap is what the constraint costs you.
</p>` : ""}
</section>` ;
})()}

`;
};

const casesBody = ({ mk = "irr", sel, baselinePop, view = "perf", evalModel = false, created } = {}) => {
  const m = MET[mk], x = MX[mk];
  return `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Projects</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Valencia BESS</a><span class="sep">${ic("right", 12, 2)}</span><b>Case matrix</b>`,
  eyebrow: `<span style="display:inline-flex;align-items:center;gap:9px">Analysis ${src("suite")}</span>`,
  title: "Case matrix",
  meta: "Explore every technical simulation × financial case combination — saved or not. Comparing the ones you keep is <a href=\"#\">Compare</a>.",
  actions: `<button class="btn btn-secondary">${ic("plus", 16, 1.9)}New analysis case</button>
            <button class="btn btn-secondary">${ic("analytics", 16)}Compare analysis cases</button>`,
})}
${created ? createdStrip(created) : ""}

${/* §5 · Two rows used to sit between the title and the grid: a lone
      baseline selector, and a strip doing the arithmetic the grid itself
      performs (3 × 3 = 9). Both are gone. The baseline moved INTO the
      control band, beside the objective and the criteria it belongs with,
      and "a combination becomes an analysis case only when it is named"
      already appears where it is actionable — inside an unsaved cell. */""}
<div class="tabs" style="margin-bottom:20px">
  <a href="#" class="${view === "perf" ? "on" : ""}">Performance</a>
  <a href="#" class="${view === "robust" ? "on" : ""}">Robustness</a>
</div>
${view === "robust" ? robustView(mk) : perfView({ mk, sel, evalModel, baselinePop })}
`;
};

/* §20 · the baseline selector lists only cases in the analysis —
   a baseline outside it would produce deltas against something the
   page never shows. */
const baselineMenu = (currentKey, options) => {
  const opts = options || [["base2h", "base"], ["base2h", "high"], ["v4h", "high"]];
  return `
<div class="raise" style="margin-top:10px;width:344px;padding:14px 6px 8px;border-radius:var(--r-sm)">
  <div class="band" style="padding:0 12px 10px">Measure everything against</div>
  ${opts.map(([tid, sid]) => {
    const c = caseOf(tid, sid), on = `${tid}|${sid}` === currentKey;
    return `
    <a href="#" style="display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:var(--r-xs);text-decoration:none;
       ${on ? "background:linear-gradient(168deg,rgba(255,255,255,.8),rgba(255,255,255,.56))" : ""}">
      <span style="width:15px;height:15px;flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;
            ${on ? `background:${SU};color:#fff` : "box-shadow:inset 0 0 0 1.5px rgba(30,58,138,.2)"}">
        ${on ? `<span style="width:5px;height:5px;border-radius:50%;background:#fff;display:block"></span>` : ""}
      </span>
      <span style="flex:1;min-width:0">
        <span style="display:block;font-size:13px;font-weight:${on ? "600" : "500"};color:var(--s900)">${c.t.short} + ${c.sc.name}</span>
        <span style="display:block;font-size:11px;color:var(--s400);margin-top:2px">${eurM(c.rev)} · ${c.irr.toFixed(1)}% IRR · €${c.t.capex.toFixed(1)}M CAPEX</span>
      </span>
    </a>`;
  }).join("")}
  <div class="hr" style="margin:8px 12px"></div>
  <p class="t-meta" style="padding:4px 12px 4px;line-height:1.5;margin:0">
    Only cases already in the analysis can be the baseline. Deltas, highlights, key changes and the bridge all follow this choice.
  </p>
</div>`;
};

/* Six metric states of one component (§38). The selection is carried
   through five of them unchanged, which is the point being made. */
const SELCASE = { tid: "v4h", sid: "high" };
/* The nine-cell matrix survives as ONE state of Compare — the surface
   for exploring combinations behind the named alternatives, not eight
   navigational destinations. */
/* ═══════════════════════════════════════════════════════════════
   §8-§10 · ROBUSTNESS
   The matrix already holds every technical configuration against every
   financial case, so the spread of a row is free information: how much
   of the outcome the market decides rather than the asset.

   §9 · The language has to stay honest about what the data is. Three
   financial cases are three modelled views, not a distribution — they
   carry no probabilities. So: range, spread, highest and lowest, never
   risk, confidence or expected value. Nothing here is weighted, because
   weighting would require probabilities nobody has supplied.
   ═══════════════════════════════════════════════════════════════ */
const robustRows = (mk = "irr") => {
  const m = MET[mk];
  return TECH.map((t) => {
    const vs = SCEN.map((sc) => ({ sc, c: caseOf(t.id, sc.id), v: m.get(caseOf(t.id, sc.id)) }));
    const lo = vs.reduce((a, b) => (b.v < a.v ? b : a)), hi = vs.reduce((a, b) => (b.v > a.v ? b : a));
    return { t, vs, lo, hi, spread: hi.v - lo.v };
  });
};

const robustView = (mk = "irr") => {
  const m = MET[mk], rows = robustRows(mk);
  const gLo = Math.min(...rows.map((r) => r.lo.v)), gHi = Math.max(...rows.map((r) => r.hi.v));
  const pad = (gHi - gLo) * 0.12, A = gLo - pad, B = gHi + pad;
  const pct = (v) => ((v - A) / (B - A)) * 100;
  const best = (f, better) => rows.reduce((a, b) => (better(f(b), f(a)) ? b : a));
  const upside = best((r) => r.hi.v, (x, y) => x > y);
  const floor = best((r) => r.lo.v, (x, y) => x > y);
  const tight = Math.min(...rows.map((r) => r.spread));
  const tightest = rows.filter((r) => Math.abs(r.spread - tight) < 1e-9);
  const unit = m.pt ? " pp" : "";
  /* Axis ends are bare numbers on the metric's own scale: m.fmt expects a
     real case, and inventing one to label an axis would be a lie waiting
     to drift. */
  const axis = (v) => (m.pt ? v.toFixed(1) + "%" : mk === "capex" || mk === "rev" ? "€" + v.toFixed(1) + "M" : v.toFixed(1));
  return `
${sec({ label: "Scenario sensitivity", source: src("combined"), top: 0,
        sub: `How far ${m.label} moves for each technical simulation as the financial case changes. The three financial cases are modelled views, not probabilities — this is a range, not a distribution.` })}
<section class="panel" style="padding:26px 28px">
  <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px">
    <span style="flex:none;width:210px;display:inline-flex;align-items:center;gap:7px"><span class="t-meta">Technical simulation</span>${src("storebrid")}</span>
    <span style="flex:1;min-width:0;display:flex;justify-content:space-between">
      <span class="t-meta">${axis(A)}</span>
      <span style="display:inline-flex;align-items:center;gap:7px"><span class="t-meta">${m.label} across financial cases</span>${src("revenew")}</span>
      <span class="t-meta">${axis(B)}</span>
    </span>
    <span class="t-meta" style="flex:none;width:96px;text-align:right">Spread</span>
  </div>
  ${rows.map((r, i) => `
  <div style="display:flex;align-items:center;gap:14px;padding:16px 0;${i ? "border-top:1px solid var(--hair)" : ""}">
    <span style="flex:none;width:210px;min-width:0">
      <span style="display:block;font-size:14px;font-weight:600;color:var(--s900)">${r.t.short}</span>
      <span class="t-meta" style="display:block;margin-top:3px">${r.t.mwh} MWh · ${r.t.dur.toFixed(1)} h</span>
    </span>
    <span style="flex:1;min-width:0;position:relative;height:42px;display:block">
      <span style="position:absolute;left:0;right:0;top:20px;height:1px;background:var(--hair);display:block"></span>
      <span style="position:absolute;top:17px;height:7px;border-radius:4px;display:block;
            left:${pct(r.lo.v).toFixed(1)}%;width:${(pct(r.hi.v) - pct(r.lo.v)).toFixed(1)}%;
            background:linear-gradient(90deg,rgba(175,71,178,.34),rgba(37,99,235,.5))"></span>
      ${r.vs.map((x) => `
        <span class="mk" style="position:absolute;top:14.5px;left:${pct(x.v).toFixed(1)}%;margin-left:-6.5px;
              width:13px;height:13px;border-radius:50%;display:block;background:#fff;
              box-shadow:0 0 0 2px ${x.v === r.hi.v ? SB : x.v === r.lo.v ? RN : "rgba(132,150,173,.75)"}">
          <span style="position:absolute;inset:0"><title>${x.sc.name} — ${m.fmt(x.c)}</title></span></span>`).join("")}
      <span style="position:absolute;top:0;left:${pct(r.lo.v).toFixed(1)}%;margin-left:-6.5px;font-size:10.5px;color:var(--s500);white-space:nowrap">${m.fmt(r.lo.c)}</span>
      <span style="position:absolute;bottom:0;left:${pct(r.hi.v).toFixed(1)}%;margin-left:-6.5px;font-size:10.5px;font-weight:600;color:var(--s900);white-space:nowrap">${m.fmt(r.hi.c)}</span>
      ${(() => {
        /* §8 · Minimum, base and maximum all have to stay readable. The
           middle marker carried its value only in a tooltip, so the one
           figure the reader is measuring the range against was the one
           they could not see. It sits under the marker, in the baseline's
           own weight — and only when it is far enough from the ends not
           to collide with them. */
        const mid = r.vs.find((x) => x.sc.id === BASE.sc.id) || r.vs.find((x) => x.v !== r.hi.v && x.v !== r.lo.v);
        if (!mid || mid.v === r.hi.v || mid.v === r.lo.v) return "";
        /* the maximum's figure hangs BELOW the track and the minimum's
           above it, so the only label this one can run into is the
           minimum's */
        const p = pct(mid.v);
        if (Math.abs(p - pct(r.lo.v)) < 9) return "";
        return `<span style="position:absolute;top:0;left:${p.toFixed(1)}%;transform:translateX(-50%);
              font-size:10.5px;color:var(--s500);white-space:nowrap">${m.fmt(mid.c)}</span>`;
      })()}
    </span>
    <span style="flex:none;width:96px;text-align:right;font-size:14px;font-weight:600;color:var(--s900);font-variant-numeric:tabular-nums">${r.spread.toFixed(1)}${unit}</span>
  </div>`).join("")}
  <div style="display:flex;align-items:center;gap:20px;margin-top:18px;padding-top:14px;border-top:1px solid var(--hair);flex-wrap:wrap">
    <span style="display:inline-flex;align-items:center;gap:7px"><i style="width:9px;height:9px;border-radius:50%;background:#fff;box-shadow:0 0 0 2px ${RN};display:block"></i><span class="t-meta">Lowest financial case</span></span>
    <span style="display:inline-flex;align-items:center;gap:7px"><i style="width:9px;height:9px;border-radius:50%;background:#fff;box-shadow:0 0 0 2px ${SB};display:block"></i><span class="t-meta">Highest financial case</span></span>
    <span style="flex:1"></span>
    <span class="t-meta">Each row holds the asset constant and varies only the financial case.</span>
  </div>
</section>

${sec({ label: "What the ranges say", source: src("combined"), top: 24,
        sub: "Three readings of the plot above. Which of upside, floor and stability matters depends on the decision being made — the Suite reports them, it does not rank them." })}
<section class="panel" style="padding:20px 22px">
<div style="display:flex;gap:14px">
  ${[["Highest upside", `${m.fmt(upside.hi.c)}`, `${upside.t.short} under ${upside.hi.sc.name}`,
      "The best result available anywhere in the matrix, and the financial case it depends on."],
     ["Highest floor", `${m.fmt(floor.lo.c)}`, `${floor.t.short} under ${floor.lo.sc.name}`,
      "The strongest worst case. If the weakest financial view is the one that lands, this configuration gives up the least."],
     ["Smallest variation", `${tight.toFixed(1)}${unit}`,
      tightest.map((r) => r.t.short).join(" and "),
      tightest.length > 1
        ? "Two configurations move the same amount across the financial cases — neither is more exposed to the market view than the other."
        : "Moves least as the financial case changes: more of this result is decided by the asset than by the market."]]
    .map(([band, v, who, why]) => `
    <div class="wash" style="flex:1;min-width:0;padding:17px 19px">
      <div style="display:flex;align-items:center;gap:8px">
        <span class="band" style="font-size:10px">${band}</span>${src("combined")}
      </div>
      <div style="font-size:23px;font-weight:700;letter-spacing:-.024em;color:var(--s900);margin-top:9px;font-variant-numeric:tabular-nums">${v}</div>
      <div style="font-size:13px;font-weight:500;color:var(--s700);margin-top:6px">${who}</div>
      <p class="t-meta" style="margin-top:10px;line-height:1.55">${why}</p>
    </div>`).join("")}
</div>
</section>`;
};

writeFileSync("CaseMatrixUnevaluated.dc.html", doc({ w: 1440, h: 3290, side: projectSide("cases"),
  body: casesBody({ mk: "irr", sel: { tid: "v4h", sid: "high" }, evalModel: true }) }));
console.log("CaseMatrixUnevaluated.dc.html");

writeFileSync("CaseMatrixRobustness.dc.html", doc({ w: 1440, h: 1180, side: projectSide("cases"),
  body: casesBody({ mk: "irr", view: "robust" }) }));
console.log("CaseMatrixRobustness.dc.html");

writeFileSync("CaseMatrix.dc.html", doc({ w: 1440, h: 3290, side: projectSide("cases"),
  body: casesBody({ mk: "irr", sel: { tid: "v4h", sid: "high" } }) }));
console.log("Compare · all combinations");

console.log("Cases reworked · baseline + highlights + heatmap matrix");


/* ═══════════════════════════════════════════════════════════════
   COMPARE CASES — a decision cockpit
   Baseline, deltas, and the one thing neither product can do alone:
   say whether an improvement came from the technical configuration
   or from the market — but only when a controlled comparison
   actually supports the claim (§21).
   ═══════════════════════════════════════════════════════════════ */
/* The selection is state, not a constant — Compare is the same page with
   0, 1, 2, 3 or 4 cases in it and any of them as the baseline (§17, §18). */
let SEL = [caseOf("base2h", "base"), caseOf("base2h", "high"), caseOf("v4h", "high")];
const changeKind = (a, b) => a.t.id === b.t.id
  ? { key: "rv", label: "Financial change", chip: src("revenew") }
  : a.sc.id === b.sc.id
    ? { key: "sb", label: "Technical change", chip: src("storebrid") }
    : { key: "both", label: "Both dimensions changed", chip: src("combined") };

const caseChip = (c, baseline) => `
<span class="glass-sm" style="display:inline-flex;align-items:center;gap:11px;padding:10px 14px;cursor:pointer;
      ${baseline ? "box-shadow:0 0 0 1px rgba(14,157,168,.3), var(--sh-sm), inset 0 1px 0 rgba(255,255,255,.92)" : ""}">
  ${baseline ? `<span class="cov"><i style="background:${SU}"></i>Baseline</span>` : ""}
  <span style="display:inline-flex;align-items:center;gap:6px">
    <i style="width:5px;height:5px;border-radius:50%;background:${SB};display:block"></i>
    <span style="font-size:12.5px;font-weight:600;color:var(--s900)">${c.t.short}</span>
  </span>
  <span style="font-size:12px;color:var(--s400)">+</span>
  <span style="display:inline-flex;align-items:center;gap:6px">
    <i style="width:5px;height:5px;border-radius:50%;background:${RN};display:block"></i>
    <span style="font-size:12.5px;font-weight:600;color:var(--s900)">${c.sc.name}</span>
  </span>
  ${baseline
    ? `<span style="color:var(--s400);display:flex" title="Change baseline">${ic("down", 14, 1.8)}</span>`
    : `<span style="color:var(--s400);display:flex" title="Remove from comparison">${closeX(13)}</span>`}
</span>`;

const addCaseChip = () => `
<button class="btn btn-secondary" style="height:41px">${ic("plus", 15, 1.9)}Add case</button>`;

/* §17 · the selection bar: add, remove and change baseline without leaving
   the page. It is the same control at every selection count. */
const selectionBar = ({ baselinePop, addPop } = {}) => `
<div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:26px;flex-wrap:wrap">
  <div>
    ${caseChip(BASE, true)}
    ${baselinePop ? baselineMenu(selKey(BASE), SEL.map((c) => [c.t.id, c.sc.id])) : ""}
  </div>
  <span class="t-meta" style="margin:0 4px;padding-top:14px">compared with</span>
  ${SEL.filter((c) => selKey(c) !== selKey(BASE)).map((c) => caseChip(c)).join("")}
  <div>${addCaseChip()}${addPop ? addCaseMenu() : ""}</div>
  <span style="flex:1"></span>
  <span class="t-meta" style="padding-top:14px">Chips add and remove cases · the baseline chip changes the reference</span>
</div>`;

/* Adding a case picks from the nine that already exist — it never runs
   anything in StoreBrid or ReveNew (§9). */
const addCaseMenu = () => `
<div class="raise" style="margin-top:10px;width:376px;padding:14px 6px 8px;border-radius:var(--r-sm)">
  <div class="band" style="padding:0 12px 10px">Add a case to this comparison</div>
  ${TECH.slice(0, 2).flatMap((t) => SCEN.map((sc) => {
    const c = caseOf(t.id, sc.id), on = SEL.some((x) => selKey(x) === selKey(c));
    return `
    <a href="#" style="display:flex;align-items:center;gap:11px;padding:9px 12px;border-radius:var(--r-xs);text-decoration:none;${on ? "opacity:.5" : ""}">
      <span style="width:15px;height:15px;flex:none;border-radius:4px;display:flex;align-items:center;justify-content:center;
            ${on ? `background:${SU};color:#fff` : "box-shadow:inset 0 0 0 1.5px rgba(30,58,138,.2)"}">${on ? ic("check", 10, 2.8) : ""}</span>
      <span style="flex:1;min-width:0">
        <span style="display:block;font-size:13px;font-weight:${on ? "600" : "500"};color:var(--s900)">${selLabel(c)}</span>
        <span style="display:block;font-size:11px;color:var(--s400);margin-top:2px">${eurM(c.rev)} · ${c.irr.toFixed(1)}% IRR</span>
      </span>
      ${on ? `<span class="t-meta">In comparison</span>` : ""}
    </a>`;
  })).join("")}
  <div class="hr" style="margin:8px 12px"></div>
  <p class="t-meta" style="padding:4px 12px;line-height:1.5;margin:0">4 cases maximum. All nine are on the Cases matrix.</p>
</div>`;

/* §19 · the summary is generated from the same figures the page shows,
   so it cannot describe a comparison that is not on screen. */
/* §19 · generated from the same figures the page shows, so it cannot
   describe a comparison that is not on screen. Each sentence reads one
   case against the baseline — never two arbitrary neighbours. */
const decisionSummary = () => {
  const others = SEL.filter((c) => selKey(c) !== selKey(BASE));
  const sentences = others.map((c) => {
    const k = diffKind(BASE, c), dRev = c.rev - BASE.rev, dIrr = c.irr - BASE.irr;
    if (k.key === "rv")
      return `${c.sc.name} ${dRev >= 0 ? "adds" : "removes"} ${eurM(Math.abs(dRev))} of annual revenue and ${Math.abs(dIrr).toFixed(1)} pt of IRR on the same asset — same ${c.t.gwh} GWh, same €${c.t.capex.toFixed(1)}M.`;
    if (k.key === "sb")
      return `${c.t.short} discharges ${(c.t.gwh - BASE.t.gwh).toFixed(1)} GWh more on the same market for €${(c.t.capex - BASE.t.capex).toFixed(1)}M of additional CAPEX, worth ${eurM(Math.abs(dRev))} a year.`;
    return `${selLabel(c)} moves both dimensions at once: ${eurM(Math.abs(dRev))} more revenue and ${Math.abs(dIrr).toFixed(1)} pt of IRR, on €${(c.t.capex - BASE.t.capex).toFixed(1)}M more CAPEX.`;
  });
  const bestIrr = SEL.reduce((x, y) => (y.irr > x.irr ? y : x));
  const bestMwh = SEL.reduce((x, y) => (y.perMwh > x.perMwh ? y : x));
  const verdict = selKey(bestIrr) === selKey(bestMwh)
    ? `${selLabel(bestIrr)} leads on both return and revenue per MWh — worth checking against a wider set of scenarios before treating it as settled.`
    : `${selLabel(bestIrr)} gives the highest return at ${bestIrr.irr.toFixed(1)}%, while ${selLabel(bestMwh)} earns the most per MWh discharged at €${bestMwh.perMwh.toFixed(1)}. Extra duration buys volume, not price.`;
  return [...sentences, verdict].join(" ");
};

const changeSide = ({ band, tone, chip, changed, from, to, detail }) => `
<div style="flex:1;min-width:0;padding:16px 18px;border-radius:var(--r-xs);
     background:linear-gradient(168deg,${tone === "rv" ? "rgba(175,71,178,.05)" : "rgba(37,99,235,.05)"},rgba(255,255,255,0) 70%);
     box-shadow:inset 0 0 0 1px ${tone === "rv" ? "rgba(175,71,178,.14)" : "rgba(37,99,235,.14)"}">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:10px">
    <span class="band" style="font-size:10px;color:${tone === "rv" ? "var(--rv600)" : "var(--b700)"}">${band}</span>${chip}
  </div>
  ${changed ? `
  <div style="display:flex;align-items:center;gap:9px;margin-top:11px;flex-wrap:wrap">
    <span style="font-size:13px;font-weight:500;color:var(--s500)">${from}</span>
    <span style="color:var(--s400);display:flex">${ic("right", 14, 2)}</span>
    <span style="font-size:13.5px;font-weight:600;color:var(--s900)">${to}</span>
  </div>` : `
  <div style="margin-top:11px;font-size:13.5px;font-weight:600;color:var(--s400)">None</div>`}
  <div class="t-meta" style="margin-top:7px;line-height:1.5">${detail}</div>
</div>`;

const outcomeRow = (label, mk, c, neutral) => {
  const m = MET[mk], d = deltaOf(mk, c);
  const abs = m.get(c) - m.get(BASE);
  const moved = Math.abs(abs) > 1e-9;
  const shown = !moved ? "unchanged"
    : m.pt ? (abs > 0 ? "+" : "−") + Math.abs(abs).toFixed(1) + " pp"
    : mk === "rev" || mk === "capex" ? (abs > 0 ? "+" : "−") + "€" + Math.abs(abs).toFixed(2) + "M"
    : mk === "gwh" ? (abs > 0 ? "+" : "−") + Math.abs(abs).toFixed(1) + " GWh"
    : (abs > 0 ? "+" : "−") + "€" + Math.abs(abs).toFixed(1);
  return `
  <div style="display:flex;align-items:center;gap:14px;padding:10px 0;border-top:1px solid var(--hair)">
    <span style="flex:1;min-width:0;display:flex;align-items:center;gap:8px">
      <span style="font-size:12.5px;color:var(--s500)">${label}</span>${src(m.from)}
    </span>
    <span style="width:96px;flex:none;text-align:right;font-size:14px;font-weight:600;color:var(--s900);font-variant-numeric:tabular-nums">${m.fmt(c)}</span>
    <span style="width:92px;flex:none;text-align:right;font-size:12.5px;font-weight:600;
          color:${!moved ? "var(--s400)" : neutral ? "var(--s700)" : d.tone === "up" ? "#0E9469" : "#C22222"};font-variant-numeric:tabular-nums">${shown}</span>
  </div>`;
};

const keyChangeBlock = (c) => {
  const sameT = c.t.id === BASE.t.id, sameS = c.sc.id === BASE.sc.id;
  const k = sameT ? "financial only" : sameS ? "technical only" : "technical and financial";
  return `
<section class="panel" style="padding:22px 26px;margin-bottom:18px">
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:16px">
    <span style="display:inline-flex;align-items:center;gap:7px">
      <i style="width:5px;height:5px;border-radius:50%;background:${SB};display:block"></i>
      <span style="font-size:15px;font-weight:600;color:var(--s900)">${c.t.short}</span>
    </span>
    <span style="font-size:13px;color:var(--s400)">×</span>
    <span style="display:inline-flex;align-items:center;gap:7px">
      <i style="width:5px;height:5px;border-radius:50%;background:${RN};display:block"></i>
      <span style="font-size:15px;font-weight:600;color:var(--s900)">${c.sc.name}</span>
    </span>
    <span class="cov"><i style="background:${sameT ? RN : sameS ? SB : CMB}"></i>${k} change vs baseline</span>
  </div>
  <div style="display:flex;gap:16px;align-items:stretch">
    ${changeSide({ band: "Technical change", tone: "sb", chip: src("storebrid"), changed: !sameT,
      from: `${BASE.t.mwh} MWh · ${BASE.t.dur.toFixed(1)} h`, to: `${c.t.mwh} MWh · ${c.t.dur.toFixed(1)} h`,
      detail: sameT
        ? `Same StoreBrid simulation as the baseline — ${c.t.mw} MW / ${c.t.mwh} MWh, ${c.t.rte}% round-trip, ${c.t.gwh} GWh discharged.`
        : `${c.t.rte}% round-trip, ${c.t.mw} MW installed. A separate StoreBrid simulation; the baseline's is untouched.` })}
    ${changeSide({ band: "Financial change", tone: "rv", chip: src("revenew"), changed: !sameS,
      from: BASE.sc.name, to: c.sc.name,
      detail: sameS
        ? `Same ReveNew scenario as the baseline — capture price €${c.sc.capture.toFixed(1)}/MWh.`
        : `Capture price €${BASE.sc.capture.toFixed(1)} → €${c.sc.capture.toFixed(1)}/MWh against a €71.4/MWh spot average.` })}
  </div>
  <div style="margin-top:18px">
    <div style="display:flex;align-items:center;gap:14px;padding-bottom:6px">
      <span class="band" style="flex:1;min-width:0;font-size:10px">Outcome</span>
      <span style="width:96px;flex:none;text-align:right" class="t-meta">value</span>
      <span style="width:92px;flex:none;text-align:right" class="t-meta">vs baseline</span>
    </div>
    ${outcomeRow("Energy discharged", "gwh", c, true)}
    ${outcomeRow("Annual revenue", "rev", c)}
    ${outcomeRow("Revenue / MWh discharged", "perMwh", c)}
    ${outcomeRow("CAPEX", "capex", c, true)}
    ${outcomeRow("IRR", "irr", c)}
  </div>
</section>`;
};

/* §4 · CONTRIBUTION ALONG THE COMPARISON PATH
   A controlled step holds one dimension while the other moves. When both
   moved, two orders exist and they do not split the total the same way —
   so both are shown and the residual is named. The Suite reports the
   difference associated with each step; it never claims a cause. */
const shortFmt = (mk, v, delta) => {
  if (mk === "irr" || mk === "util") return v.toFixed(1) + (delta ? " pp" : "%");
  if (mk === "rev" || mk === "capex") return "€" + v.toFixed(2) + "M";
  if (mk === "gwh") return v.toFixed(1) + " GWh";
  if (mk === "perCyc") return "€" + Math.round(v).toLocaleString("en-GB");
  return "€" + v.toFixed(1);
};
const stepChip = (mk, v, kind) => {
  const up = v >= 0;
  return `
  <span style="display:inline-flex;align-items:center;gap:7px;padding:5px 11px;border-radius:8px;
        background:${kind === "rv" ? "rgba(175,71,178,.09)" : "rgba(37,99,235,.09)"}">
    <i style="width:5px;height:5px;border-radius:50%;background:${kind === "rv" ? RN : SB};display:block"></i>
    <span style="font-size:11.5px;font-weight:500;color:var(--s700)">${kind === "rv" ? "Financial" : "Technical"}</span>
    <b style="font-size:12.5px;font-weight:700;color:var(--s900);font-variant-numeric:tabular-nums">${up ? "+" : "−"}${shortFmt(mk, Math.abs(v), true)}</b>
  </span>`;
};
const pathRow = (mk, label, cases, steps) => {
  const m = MET[mk];
  return `
<div style="padding:14px 0;border-top:1px solid var(--hair)">
  <div class="t-meta" style="margin-bottom:9px">${label}</div>
  <div style="display:flex;align-items:center;gap:11px;flex-wrap:wrap">
    ${cases.map((c, i) => `
      <span style="display:inline-flex;align-items:baseline;gap:7px">
        <b style="font-size:16px;font-weight:700;color:var(--s900);font-variant-numeric:tabular-nums">${m.fmt(c)}</b>
        <span class="t-meta" style="max-width:16ch;line-height:1.3">${i === 0 ? "baseline" : i === cases.length - 1 ? "selected" : c.t.short + " + " + c.sc.name}</span>
      </span>
      ${i < steps.length ? `<span style="color:var(--s400);display:flex">${ic("right", 14, 2)}</span>${stepChip(mk, steps[i][0], steps[i][1])}<span style="color:var(--s400);display:flex">${ic("right", 14, 2)}</span>` : ""}`).join("")}
  </div>
</div>`;
};

const contributionPanel = (mk) => {
  const m = MET[mk], sel = SEL[SEL.length - 1];
  const cn = contributions(mk, BASE, sel);
  if (!variesComm(mk)) return `
<section class="panel" style="flex:1.1;min-width:0;padding:24px 26px">
  <div style="display:flex;align-items:center;gap:10px"><span class="band">Contribution along the comparison path</span>${src("storebrid")}</div>
  <h3 class="t-card" style="font-size:16px;margin-top:8px">${m.label} has no financial step</h3>
  <p class="t-meta" style="margin-top:10px;line-height:1.6;max-width:70ch">
    ${m.label} comes from the StoreBrid simulation and does not move with the financial scenario, so the whole difference of
    <b style="font-weight:600;color:var(--s700)">${cn.total >= 0 ? "+" : "−"}${shortFmt(mk, Math.abs(cn.total), true)}</b> sits on the technical step.
    Choose a combined metric to see the split.
  </p>
</section>`;
  if (cn.simple) return `
<section class="panel" style="flex:1.1;min-width:0;padding:24px 26px">
  <div style="display:flex;align-items:center;gap:10px"><span class="band">Contribution along the comparison path</span>${src(m.from)}</div>
  <h3 class="t-card" style="font-size:16px;margin-top:8px">${m.label} — one controlled step</h3>
  <p class="t-meta" style="margin-top:8px;line-height:1.6;max-width:74ch">
    ${cn.kind.key === "rv" ? "The technical simulation is held constant" : "The financial scenario is held constant"}, so the whole movement
    is associated with the ${cn.kind.key === "rv" ? "commercial" : "technical"} change. No decomposition is needed, and none is invented.
  </p>
  ${pathRow(mk, "Baseline to selected", [BASE, sel], [[cn.total, cn.kind.key]])}
</section>`;
  const A = BASE, D = sel;
  const B = caseOf(A.t.id, D.sc.id), C = caseOf(D.t.id, A.sc.id);
  const same = Math.abs(cn.interaction) < (Math.abs(cn.total) * 0.04);
  return `
<section class="panel" style="flex:1.1;min-width:0;padding:24px 26px">
  <div style="display:flex;align-items:center;gap:10px"><span class="band">Contribution along the comparison path</span>${src(m.from)}</div>
  <h3 class="t-card" style="font-size:16px;margin-top:8px">${m.label} — both dimensions moved</h3>
  <p class="t-meta" style="margin-top:8px;line-height:1.6;max-width:78ch">
    Each step below holds one dimension while the other moves, using cases that already exist in the matrix.
    Both orders reach ${m.fmt(D)}${same ? " and split it the same way." : `, but they do not split it the same way.`}
  </p>
  ${pathRow(mk, "Financial first", [A, B, D], [[cn.commercialFirst.commercial, "rv"], [cn.commercialFirst.technical, "sb"]])}
  ${pathRow(mk, "Technical first", [A, C, D], [[cn.technicalFirst.technical, "sb"], [cn.technicalFirst.commercial, "rv"]])}
  ${(() => {
    /* §23 · The finding was buried in a paragraph. It is the most important
       thing on the page, so it gets read as a range: each effect has a
       span, not a value, and the span is what proves the two are not
       independent. The methodology moves behind a link — the caveat does
       not, because a reader who takes one number from here without it has
       been misled. */
    const rng = (a, b) => {
      const lo = Math.min(a, b), hi = Math.max(a, b);
      const f = (v) => (v >= 0 ? "+" : "−") + shortFmt(mk, Math.abs(v), true);
      return same ? f(a) : `${f(lo)} → ${f(hi)}`;
    };
    const line = (label, val, why) => `
      <div style="display:flex;align-items:baseline;gap:14px;padding:9px 0">
        <span class="t-meta" style="width:150px;flex:none">${label}</span>
        <b style="flex:none;width:146px;font-size:14px;font-weight:700;color:var(--s900);font-variant-numeric:tabular-nums;white-space:nowrap">${val}</b>
        <span class="t-meta" style="flex:1;min-width:0;line-height:1.45">${why}</span>
      </div>`;
    return `
  <div style="margin-top:16px;padding:16px 18px;border-radius:var(--r-xs);
       background:linear-gradient(168deg,rgba(109,90,198,.055),rgba(255,255,255,0) 74%);box-shadow:inset 0 0 0 1px rgba(109,90,198,.14)">
    <div style="display:flex;align-items:center;gap:10px">
      <span class="band" style="color:var(--cmb)">${same ? "The effects are independent" : "The effects interact"}</span>${src("combined")}
    </div>
    <div style="margin-top:8px">
      ${line("Technical contribution", rng(cn.technicalFirst.technical, cn.commercialFirst.technical),
        same ? "the same on either financial case" : "depending on which financial case it is applied to")}
      ${line("Financial contribution", rng(cn.commercialFirst.commercial, cn.technicalFirst.commercial),
        same ? "the same on either asset" : "depending on which asset it is applied to")}
      ${line("Final delta", (cn.total >= 0 ? "+" : "−") + shortFmt(mk, Math.abs(cn.total), true), "the same whichever order is taken")}
    </div>
    <div style="display:flex;align-items:flex-start;gap:12px;margin-top:10px;padding-top:11px;border-top:1px solid rgba(109,90,198,.14)">
      <span style="flex:1;min-width:0;font-size:12.5px;color:var(--s700);line-height:1.55">
        ${same
          ? "Either order can be quoted — the two changes barely affect each other on this metric."
          : "Neither change has one universal contribution. Its impact depends on the other side of the analysis case, so quoting a single split would be inventing precision."}
      </span>
      <a href="#" style="flex:none;font-size:12.5px;font-weight:500;white-space:nowrap">How this works${ic("right", 12, 2)}</a>
    </div>
  </div>`;
  })()}
</section>`;
};

function caseScatter(w = 900) {
  const H = 350, L = 62, R = 150, TT = 18, B = 58;
  const pw = w - L - R, ph = H - TT - B;
  const us = SEL.map((c) => c.t.util), rs = SEL.map((c) => c.irr);
  const ux0 = Math.min(...us) - 4, ux1 = Math.max(...us) + 4;
  const ry0 = Math.min(...rs) - 1.3, ry1 = Math.max(...rs) + 1.1;
  const x = (v) => L + ((v - ux0) / (ux1 - ux0)) * pw;
  const y = (v) => TT + ph - ((v - ry0) / (ry1 - ry0)) * ph;
  const r = (mwh) => 10 + ((mwh - 200) / 200) * 7;
  const xt = [0.15, 0.45, 0.75].map((f) => Math.round(ux0 + (ux1 - ux0) * f));
  const yt = [0.2, 0.5, 0.8].map((f) => +(ry0 + (ry1 - ry0) * f).toFixed(0));
  const gx = xt.map((g) =>
    `<line x1="${x(g).toFixed(1)}" y1="${TT}" x2="${x(g).toFixed(1)}" y2="${TT + ph}" stroke="${GRID}" stroke-width="1"/>
     <text x="${x(g).toFixed(1)}" y="${TT + ph + 15}" text-anchor="middle" font-size="9.5" fill="${AXIS}">${g}%</text>`).join("");
  const gy = yt.map((g) =>
    `<line x1="${L}" y1="${y(g).toFixed(1)}" x2="${w - R}" y2="${y(g).toFixed(1)}" stroke="${GRID}" stroke-width="1"/>
     <text x="${L - 9}" y="${(y(g) + 3.4).toFixed(1)}" text-anchor="end" font-size="9.5" fill="${AXIS}">${g}%</text>`).join("");
  const path = SEL.map((c, i) => `${i ? "L" : "M"}${x(c.t.util).toFixed(1)} ${y(c.irr).toFixed(1)}`).join("");
  const marks = SEL.map((c) => {
    const isBase = selKey(c) === selKey(BASE), best = c.irr === Math.max(...rs);
    // Same rule as the fleet scatter: the accent marks the answer, not every mark.
    const on = best && !isStale(c);
    return `
    ${isBase ? `<circle cx="${x(c.t.util).toFixed(1)}" cy="${y(c.irr).toFixed(1)}" r="${(r(c.t.mwh) + 6).toFixed(1)}" fill="none" stroke="${SU}" stroke-width="1.6" stroke-dasharray="3 3"/>` : ""}
    <circle class="mk" cx="${x(c.t.util).toFixed(1)}" cy="${y(c.irr).toFixed(1)}" r="${r(c.t.mwh).toFixed(1)}"
      fill="${on ? CMB : FIELD}" fill-opacity="${on ? ".72" : isBase ? ".22" : ".3"}"
      stroke="#fff" stroke-width="2.2"><title>${selLabel(c)} — ${c.t.util}% utilisation · ${c.irr}% IRR · ${c.t.mwh} MWh</title></circle>
    <text x="${(x(c.t.util) + r(c.t.mwh) + 9).toFixed(1)}" y="${(y(c.irr) + 1).toFixed(1)}" font-size="10.5" font-weight="600" fill="${INK}">${selLabel(c)}</text>
    <text x="${(x(c.t.util) + r(c.t.mwh) + 9).toFixed(1)}" y="${(y(c.irr) + 14).toFixed(1)}" font-size="9.5" fill="${AXIS}">${isBase ? "Baseline" : best ? "Highest return" : deltaOf("irr", c).txt + " IRR"}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${H}" width="100%" style="display:block" role="img" aria-label="Utilisation against return for the compared cases">
    ${MKSTYLE}${gx}${gy}
    <path d="${path}" fill="none" stroke="rgba(132,150,173,.42)" stroke-width="1.5" stroke-dasharray="4 4"/>
    ${marks}
    <text x="${L}" y="${H - 6}" font-size="10.5" fill="${AXIS}">Utilisation (% of hours the asset is charging or discharging) · StoreBrid</text>
    <text transform="translate(15,${TT + (H - TT - B) / 2}) rotate(-90)" text-anchor="middle" font-size="10.5" fill="${AXIS}">IRR (%) · Combined</text>
    </svg>`;
}

const caseBars = (mk) => {
  const m = MET[mk], vals = SEL.map(m.get), max = Math.max(...vals);
  const bi = m.lowerBetter ? vals.indexOf(Math.min(...vals)) : vals.indexOf(max);
  return SEL.map((c, i) => {
    const isBase = selKey(c) === selKey(BASE);
    return `
    <div style="display:flex;align-items:center;gap:16px;padding:11px 0">
      <span style="width:236px;flex:none;font-size:13px;font-weight:${i === bi ? "600" : "500"};color:var(--s900)">${selLabel(c)}</span>
      <span style="flex:1;min-width:0;height:22px;display:block;position:relative">
        <span style="position:absolute;left:0;top:0;height:22px;width:${((vals[i] / max) * 100).toFixed(1)}%;border-radius:6px;display:block;
              background:linear-gradient(90deg,rgba(109,90,198,${isBase ? ".42" : ".7"}),rgba(109,90,198,${isBase ? ".58" : ".9"}));box-shadow:inset 0 1px 0 rgba(255,255,255,.24)"></span>
      </span>
      <span style="width:150px;flex:none;text-align:right;display:flex;align-items:baseline;justify-content:flex-end;gap:10px">
        <b style="font-variant-numeric:tabular-nums;font-size:${i === bi ? "15" : "14"}px;font-weight:${i === bi ? "700" : "500"};color:var(--s900)">${m.fmt(c)}</b>
        ${isBase ? `<span class="t-meta">baseline</span>` : deltaChip(deltaOf(mk, c), 11)}
      </span>
    </div>`;
  }).join("");
};
const caseRow = (label, mk) => {
  const m = MET[mk], vals = SEL.map(m.get);
  const bi = m.lowerBetter ? vals.indexOf(Math.min(...vals)) : vals.indexOf(Math.max(...vals));
  return `
<div style="display:flex;align-items:center;gap:16px;padding:12px 0;border-top:1px solid var(--hair)">
  <span style="width:236px;flex:none;font-size:12.5px;color:var(--s500)">${label}</span>
  ${SEL.map((c, i) => `<span style="flex:1;min-width:0;text-align:right">
    <span style="font-variant-numeric:tabular-nums;font-size:${i === bi ? "15" : "14"}px;font-weight:${i === bi ? "700" : "500"};color:${i === bi ? "var(--s900)" : "var(--s700)"}">${m.fmt(c)}</span>
    <span style="display:block;margin-top:3px">${selKey(c) === selKey(BASE) ? `<span class="t-meta">baseline</span>` : deltaChip(deltaOf(mk, c), 11)}</span>
  </span>`).join("")}
</div>`;
};
const plainRow = (label, get) => `
<div style="display:flex;align-items:center;gap:16px;padding:12px 0;border-top:1px solid var(--hair)">
  <span style="width:236px;flex:none;font-size:12.5px;color:var(--s500)">${label}</span>
  ${SEL.map((c) => `<span style="flex:1;min-width:0;text-align:right;font-size:14px;font-weight:500;color:var(--s700);font-variant-numeric:tabular-nums">${get(c)}</span>`).join("")}
</div>`;

/* §24 · the table is secondary and grouped by who owns each figure. */
const dataTable = () => `
<section class="panel" style="padding:14px 28px 26px">
  <div style="display:flex;align-items:flex-end;gap:16px;padding-bottom:14px">
    <span style="width:236px;flex:none" class="t-meta">All metrics</span>
    ${SEL.map((c) => `<span style="flex:1;min-width:0;text-align:right;font-size:13px;font-weight:600;color:var(--s900)">${selLabel(c)}</span>`).join("")}
  </div>
  ${cmpGroup("Technical — StoreBrid", src("storebrid"),
    plainRow("Storage capacity", (c) => c.t.mwh + " MWh") +
    plainRow("Duration", (c) => c.t.dur.toFixed(1) + " h") +
    plainRow("Round-trip efficiency", (c) => c.t.rte + "%") +
    caseRow("Full cycles / year", "cycles") +
    caseRow("Utilisation", "util") +
    caseRow("Energy discharged", "gwh") +
    caseRow("CAPEX", "capex"))}
  ${cmpGroup("Financial — ReveNew", src("revenew"),
    caseRow("Annual revenue", "rev") +
    plainRow("Capture price", (c) => "€" + c.sc.capture.toFixed(1) + "/MWh") +
    plainRow("Spot average", () => "€71.4/MWh") +
    plainRow("Capture rate", (c) => (c.sc.capture / 71.4 * 100).toFixed(0) + "%"))}
  ${cmpGroup("Combined — Suite", src("combined"),
    caseRow("Revenue / MWh discharged", "perMwh") +
    caseRow("Revenue / cycle", "perCyc") +
    plainRow("Revenue / MW installed", (c) => "€" + Math.round(c.perMw / 1000) + "k") +
    plainRow("Revenue / CAPEX", (c) => (c.rev / c.t.capex * 100).toFixed(1) + "%") +
    caseRow("IRR", "irr"))}
  <p class="t-meta" style="margin-top:16px;line-height:1.6">${FINMODEL}</p>
</section>`;

/* §22 · the incremental question, only when a technical step exists. */
const incrementalPanel = () => {
  const pairs = SEL.flatMap((a) => SEL.map((b) => ({ a, b })))
    .filter(({ a, b }) => diffKind(a, b).key === "sb" && b.t.capex > a.t.capex)
    .sort((x, y) => (y.b.t.capex - y.a.t.capex) - (x.b.t.capex - x.a.t.capex));
  const step = pairs[0];
  if (!step) return `
<section class="panel" style="flex:1;min-width:0;padding:24px 26px">
  <div style="display:flex;align-items:center;gap:10px"><span class="band" style="color:var(--b700)">Incremental economics</span>${src("storebrid")}</div>
  <h3 class="t-card" style="font-size:16px;margin-top:8px">No technical step in this comparison</h3>
  <p class="t-meta" style="margin-top:10px;line-height:1.6;max-width:64ch">
    Every selected case runs the same StoreBrid simulation, so CAPEX is identical and there is no additional investment to justify.
    Add a technical variant to the comparison to see what extra capacity would have to earn.
  </p>
  <div class="wash" style="padding:16px 18px;margin-top:16px">
    <span class="t-meta" style="display:block">Investment, all selected cases</span>
    <span style="display:block;font-size:22px;font-weight:700;color:var(--s900);margin-top:6px;font-variant-numeric:tabular-nums">€${SEL[0].t.capex.toFixed(1)}M</span>
    <span style="display:flex;align-items:center;gap:8px;margin-top:7px">${src("storebrid")}<span class="t-meta">${SEL[0].t.mwh} MWh installed</span></span>
  </div>
</section>`;
  const { a, b } = step;
  const dCap = b.t.capex - a.t.capex, dRev = b.rev - a.rev, dGwh = b.t.gwh - a.t.gwh;
  return `
<section class="panel" style="flex:1;min-width:0;padding:24px 26px">
  <div style="display:flex;align-items:center;gap:10px"><span class="band" style="color:var(--b700)">Incremental economics</span>${src("combined")}</div>
  <h3 class="t-card" style="font-size:16px;margin-top:8px">What the extra duration costs and returns</h3>
  <p class="t-meta" style="margin-top:6px;font-size:12px;line-height:1.55">
    The ${a.t.dur.toFixed(1)} h → ${b.t.dur.toFixed(1)} h step, on ${b.sc.name} on both sides.
  </p>
  <div class="rows" style="margin-top:14px">
    ${[["Additional storage", `+${b.t.mwh - a.t.mwh} MWh`, src("storebrid")],
       ["Additional discharged energy", `+${dGwh.toFixed(1)} GWh`, src("storebrid")],
       ["Additional CAPEX", `+€${dCap.toFixed(1)}M`, src("storebrid")],
       ["Additional annual revenue", `+${eurM(dRev)}`, src("revenew")],
       ["IRR impact", `+${(b.irr - a.irr).toFixed(1)} pt`, src("combined")],
       ["Simple payback on the increment", `${(dCap / dRev).toFixed(1)} years`, src("combined")]].map(([k, v, sr]) => `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 0">
        <span style="min-width:0">
          <span style="display:block;font-size:12.5px;color:var(--s500)">${k}</span>
          <span style="display:block;margin-top:4px">${sr}</span>
        </span>
        <b style="font-size:15px;font-weight:600;color:var(--s900);white-space:nowrap;font-variant-numeric:tabular-nums">${v}</b>
      </div>`).join("")}
  </div>
  <p class="t-meta" style="margin-top:12px;line-height:1.55">
    Payback is €${dCap.toFixed(1)}M of extra CAPEX divided by ${eurM(dRev)} of extra annual revenue — undiscounted, before operating cost.
  </p>
</section>`;
};

const compareBody = ({ mk = "perMwh", expanded = true, baselinePop, addPop, metricPop, explained } = {}) => `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Projects</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Valencia BESS</a><span class="sep">${ic("right", 12, 2)}</span><b>Compare</b>`,
  eyebrow: `<span style="display:inline-flex;align-items:center;gap:9px">Analysis ${src("suite")}</span>`,
  title: "Compare cases",
  meta: `Why these ${SEL.length} cases differ, what each change contributed, and what the better outcome costs. Exploring the full set is <a href="#">Cases</a>.`,
  actions: `<button class="btn btn-secondary">${ic("file", 16)}Export decision brief</button>
            <button class="btn btn-secondary">${ic("check", 16, 1.9)}Save comparison</button>`,
})}
${explained ? `
<div style="display:flex;align-items:flex-start;gap:13px;padding:15px 20px;margin-bottom:20px;border-radius:var(--r-sm);
     background:linear-gradient(122deg,rgba(37,99,235,.075),rgba(175,71,178,.065));box-shadow:inset 0 0 0 1px rgba(37,99,235,.1)">
  <span style="color:var(--cmb);display:flex;flex:none;margin-top:1px">${ic("analytics", 17)}</span>
  <span style="flex:1;min-width:0">
    <span style="display:block;font-size:13px;font-weight:600;color:var(--s900)">Explaining ${selLabel(SEL[SEL.length - 1])} against the baseline</span>
    <span class="t-meta" style="display:block;margin-top:5px;line-height:1.55">
      Both dimensions moved, so the two cases that isolate one change each were added from the matrix. Nothing was calculated to do it — all four already existed.
    </span>
  </span>
</div>` : ""}
${selectionBar({ baselinePop, addPop })}
${(() => {
  const un = unsavedOf(SEL);
  if (!un.length) return "";
  const names = un.map((c) => `<b style="font-weight:600;color:var(--s900)">${selLabel(c)}</b>`);
  const list = names.length === 1 ? names[0]
    : names.slice(0, -1).join(", ") + " and " + names[names.length - 1];
  return `<div style="margin:-12px 0 24px">${nameItHint({
    body: `${list} ${names.length === 1 ? "is an unsaved combination" : "are unsaved combinations"} — pulled in to make this comparison work, but ${names.length === 1 ? "it leaves" : "they leave"} with it. Naming ${names.length === 1 ? "it" : "them"} keeps the reasoning available next time.`,
    cta: names.length === 1 ? "Save as analysis case" : "Save as analysis cases" })}</div>`;
})()}

<section class="panel lift combined" style="padding:24px 28px;border:1px solid rgba(255,255,255,.9)">
  <div style="display:flex;align-items:flex-start;gap:20px">
    <span style="flex:1;min-width:0">
      <span class="band">Decision summary</span>
      <p style="font-size:14px;color:var(--s900);line-height:1.65;margin-top:11px;max-width:96ch">${decisionSummary()}</p>
    </span>
    ${src("combined")}
  </div>
</section>

${sec({ label: "Key changes vs baseline",
        sub: `Each selected case against ${selLabel(BASE)}, split the way the domain splits it: what changed in the StoreBrid simulation, what changed in the ReveNew scenario, and what came out.` })}
${SEL.filter((c) => selKey(c) !== selKey(BASE)).map(keyChangeBlock).join("")}

<div style="display:flex;gap:20px;margin-top:22px;align-items:stretch">
  ${contributionPanel(mk)}
  ${incrementalPanel()}
</div>

<section class="panel lift" style="padding:24px 26px;margin-top:24px">
  <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px">
    <div>
      <div class="band">Technical vs financial</div>
      <h2 class="t-sec" style="margin-top:8px">Does working the asset harder pay for itself?</h2>
      <p class="t-meta" style="margin-top:6px;font-size:12px">Utilisation against return. Bubble size is storage capacity; the dashed ring marks the baseline.</p>
    </div>
    ${src("combined")}
  </div>
  <div style="margin-top:14px">${caseScatter(920)}</div>
  <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding-top:12px;border-top:1px solid var(--hair)">
    <span style="display:inline-flex;align-items:center;gap:7px"><span class="t-meta">↑ IRR</span>${src("combined")}</span>
    <span style="display:inline-flex;align-items:center;gap:9px">
      <svg width="34" height="16" aria-hidden="true"><circle cx="6" cy="8" r="5" fill="${FIELD}" fill-opacity=".3"/><circle cx="24" cy="8" r="7.5" fill="${FIELD}" fill-opacity=".3"/></svg>
      <span class="t-meta">Storage capacity</span>${src("storebrid")}
    </span>
    <span style="display:inline-flex;align-items:center;gap:7px"><span class="t-meta">→ Utilisation</span>${src("storebrid")}</span>
  </div>
</section>

<section class="panel" style="padding:24px 26px;margin-top:24px">
  <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:18px">
    <div>
      <div class="band">Metric comparison</div>
      <h2 class="t-sec" style="margin-top:8px">${MET[mk].label}</h2>
      <p class="t-meta" style="margin-top:6px;font-size:12px;max-width:78ch">${MET[mk].why || ""}</p>
    </div>
    <div style="text-align:right">
      <div class="t-meta" style="margin-bottom:7px">Compare by</div>
      ${metricTabs(mk)}
      ${metricPop ? metricMenu(mk) : ""}
    </div>
  </div>
  ${caseBars(mk)}
</section>

<div style="display:flex;align-items:center;gap:14px;margin:26px 0 18px">
  <span class="hr" style="flex:1"></span>
  <button class="btn btn-secondary">${expanded ? "Hide all metrics" : "Show all metrics"}${ic(expanded ? "up" : "down", 15, 1.9)}</button>
  <span class="hr" style="flex:1"></span>
</div>
${expanded ? `
<div style="display:flex;align-items:center;gap:12px;margin:-4px 0 12px">
  <span class="band" style="color:var(--s400)">Detail level</span>
  <span class="hr" style="flex:1"></span>
  <span class="t-meta">16 metrics · grouped by which product owns each figure</span>
</div>${dataTable()}` : `<p class="t-meta" style="text-align:center;line-height:1.6">
  16 metrics across the three groups, collapsed. The charts above carry the decision; the table is for checking it.</p>`}`;

const metricMenu = (mk) => `
<div class="raise" style="margin-top:10px;width:300px;padding:12px 6px 8px;border-radius:var(--r-sm);text-align:left">
  ${METKEYS.map((k) => `
    <a href="#" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:var(--r-xs);text-decoration:none;
       ${k === mk ? "background:linear-gradient(168deg,rgba(255,255,255,.8),rgba(255,255,255,.56))" : ""}">
      <span style="width:13px;height:13px;flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;
            ${k === mk ? `background:${SU};color:#fff` : "box-shadow:inset 0 0 0 1.5px rgba(30,58,138,.2)"}">
        ${k === mk ? `<span style="width:4px;height:4px;border-radius:50%;background:#fff;display:block"></span>` : ""}</span>
      <span style="flex:1;font-size:13px;font-weight:${k === mk ? "600" : "500"};color:var(--s900)">${MET[k].label}</span>
      ${src(MET[k].from)}
    </a>`).join("")}
</div>`;

/* §6 · a comparison is an analysis someone made, not disposable UI state.
   Saving it keeps the four things that make it reproducible: the cases,
   the baseline they were read against, the primary metric, and the name
   of the question it was answering. */
const saveDialog = () => capabilityModal({
  title: "Save comparison", context: "Valencia BESS · 4 cases", accent: SU, source: src("suite"),
  openIn: "Saved comparisons", width: 660,
  footNote: "Saved in the Suite. Nothing is written to StoreBrid or ReveNew.",
  cancel: "Cancel", confirm: "Save comparison",
  body: `
  <div style="padding:22px 24px">
    ${field("Name", "4 h storage investment decision", { req: true })}
    <div class="wash" style="padding:16px 18px;margin-top:6px">
      <div class="band" style="font-size:10px">What is kept</div>
      <div class="rows" style="margin-top:8px">
        ${[["Cases compared", SEL.map(selLabel).join(" · "), src("suite")],
           ["Analysis baseline", selLabel(BASE), src("suite")],
           ["Primary metric", "IRR", src("combined")],
           ["Technical differences", "Storage capacity, duration, CAPEX", src("storebrid")],
           ["Financial differences", "Capture price, annual revenue", src("revenew")]].map(([k, v, sr]) => `
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:10px 0">
            <span style="display:flex;align-items:center;gap:8px;flex:none">
              <span style="font-size:12px;color:var(--s500)">${k}</span>${sr}
            </span>
            <span style="font-size:12.5px;font-weight:500;color:var(--s900);text-align:right;line-height:1.45">${v}</span>
          </div>`).join("")}
      </div>
      <p class="t-meta" style="margin-top:12px;line-height:1.55">
        Values are re-read from StoreBrid and ReveNew when the comparison is reopened, so a saved analysis follows its sources instead of freezing a copy of them.
      </p>
    </div>
  </div>`,
});


/* ═══════════════════════════════════════════════════════════════
   EXPLAIN DIFFERENCE — rebuilt around the decomposition itself
   The analytical logic is untouched: same controlled cases, same
   contributions, same refusal to name a single causal split. What
   changed is that the reader now SEES it before reading anything.

   The two paths are the hero because they are the argument. Everything
   that was primary before them — the prose decision summary, three
   key-change blocks, a scatter, a metric bar chart, the full table —
   was either restating the paths or belonged to Compare. It is kept,
   one level down, where it verifies rather than competes.
   ═══════════════════════════════════════════════════════════════ */
const pathNode = ({ c, role, mk, big }) => {
  const m = MET[mk];
  return `
<div style="padding:${big ? "15px 17px" : "13px 16px"};border-radius:var(--r-xs);
     background:linear-gradient(168deg,rgba(255,255,255,${big ? ".78" : ".55"}),rgba(255,255,255,${big ? ".5" : ".3"}));
     box-shadow:inset 0 0 0 1px ${big ? "rgba(14,157,168,.24)" : "var(--hair)"}">
  <div style="display:flex;align-items:baseline;justify-content:space-between;gap:12px">
    <span class="band" style="font-size:9.5px">${role}</span>
    <b style="font-size:${big ? "21" : "18"}px;font-weight:700;letter-spacing:-.022em;color:var(--s900);font-variant-numeric:tabular-nums">${m.fmt(c)}</b>
  </div>
  <div style="display:flex;align-items:center;gap:7px;margin-top:7px;flex-wrap:wrap">
    <span style="display:inline-flex;align-items:center;gap:5px">
      <i style="width:4px;height:4px;flex:none;border-radius:50%;background:${SB};display:block"></i>
      <span class="t-meta">${c.t.short}</span></span>
    <span style="font-size:10px;color:var(--s400)">×</span>
    <span style="display:inline-flex;align-items:center;gap:5px">
      <i style="width:4px;height:4px;flex:none;border-radius:50%;background:${RN};display:block"></i>
      <span class="t-meta">${c.sc.name}</span></span>
  </div>
</div>`;
};

/* The step between two nodes: what moved, which product owns it, how much. */
const pathStep = ({ from, to, kind, delta, mk }) => {
  const sb = kind === "sb", col = sb ? SB : RN;
  return `
<div style="display:flex;align-items:center;gap:12px;padding:11px 16px 11px 0">
  <span style="flex:none;width:2px;height:34px;margin-left:22px;border-radius:1px;
        background:linear-gradient(180deg,${col}55,${col}22);display:block"></span>
  <span style="flex:1;min-width:0">
    <span style="display:flex;align-items:center;gap:7px">
      <i style="width:5px;height:5px;flex:none;border-radius:50%;background:${col};display:block"></i>
      <span class="band" style="font-size:9.5px;color:${sb ? "var(--b700)" : "var(--rv600)"}">${sb ? "Technical change" : "Financial change"}</span>
    </span>
    <span class="t-meta" style="display:block;margin-top:4px">${from} → ${to}</span>
  </span>
  <b style="flex:none;font-size:14.5px;font-weight:700;color:${delta >= 0 ? "#0E9469" : "#C22222"};font-variant-numeric:tabular-nums">
    ${delta >= 0 ? "+" : "−"}${shortFmt(mk, Math.abs(delta), true)}</b>
</div>`;
};

const pathColumn = ({ title, note, cases, steps, mk }) => `
<div style="flex:1;min-width:0">
  <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:12px">
    <span style="font-size:13px;font-weight:600;color:var(--s900)">${title}</span>
    <span class="t-meta">${note}</span>
  </div>
  ${cases.map((c, i) => `
    ${pathNode({ c, mk, role: i === 0 ? "Baseline" : i === cases.length - 1 ? "Selected" : "Controlled case", big: i === 0 || i === cases.length - 1 })}
    ${i < steps.length ? pathStep({ ...steps[i], mk }) : ""}`).join("")}
</div>`;

const explainBody = ({ mk = "irr" } = {}) => {
  const sel = SEL[SEL.length - 1], base = BASE;
  const cn = contributions(mk, base, sel), m = MET[mk];
  const B = caseOf(base.t.id, sel.sc.id), C = caseOf(sel.t.id, base.sc.id);
  const both = !cn.simple;
  const same = both && Math.abs(cn.interaction) < Math.abs(cn.total) * 0.04;

  /* §10 · Each effect as a pair of bars, so "it depends" is something you
     see rather than something you are told. */
  const swing = (label, a, b, ctxA, ctxB, col) => {
    const mx = Math.max(Math.abs(a), Math.abs(b), 0.0001);
    const row = (v, ctx) => `
      <div style="display:flex;align-items:center;gap:12px;padding:5px 0">
        <span class="t-meta" style="flex:none;width:150px">${ctx}</span>
        <span style="flex:1;min-width:0;height:12px;display:block;position:relative">
          <span style="position:absolute;left:0;top:2px;height:8px;width:${((Math.abs(v) / mx) * 100).toFixed(1)}%;
                border-radius:3px;background:${col};opacity:.55;display:block"></span>
        </span>
        <b style="flex:none;width:66px;text-align:right;font-size:12.5px;font-weight:700;color:var(--s900);font-variant-numeric:tabular-nums">
          ${v >= 0 ? "+" : "−"}${shortFmt(mk, Math.abs(v), true)}</b>
      </div>`;
    return `
    <div style="flex:1;min-width:0">
      <span class="band" style="font-size:10px">${label}</span>
      <div style="margin-top:8px">${row(a, ctxA)}${row(b, ctxB)}</div>
    </div>`;
  };

  return `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Projects</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Valencia BESS</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Compare</a><span class="sep">${ic("right", 12, 2)}</span><b>Explain difference</b>`,
  eyebrow: `<span style="display:inline-flex;align-items:center;gap:9px">Analysis ${src("suite")}</span>`,
  title: "Explain difference",
  meta: `Why <b style="font-weight:600;color:var(--s900)">${selLabel(sel)}</b> reads ${m.fmt(sel)} against <b style="font-weight:600;color:var(--s900)">${selLabel(base)}</b> at ${m.fmt(base)}.`,
  actions: `<button class="btn btn-secondary">${ic("back", 15, 1.9)}Back to comparison</button>`,
})}
${/* §14 · Six metric tabs in the header's action slot squeezed the title
      column until the sentence underneath broke mid-phrase. The switcher
      is a control over the whole screen, so it gets the full width — and
      the header slot goes back to carrying the one action that returns the
      user to where they came from (§21). */""}
<div style="display:flex;align-items:center;gap:14px;margin-bottom:22px;flex-wrap:wrap">
  <span class="t-meta" style="flex:none">Explaining</span>
  ${metricTabs(mk)}
</div>

${both ? `
<div style="display:flex;align-items:center;gap:11px;padding:13px 18px;margin-bottom:22px;border-radius:var(--r-xs);
     background:linear-gradient(122deg,rgba(37,99,235,.06),rgba(175,71,178,.05));box-shadow:inset 0 0 0 1px rgba(37,99,235,.1)">
  <span style="color:var(--cmb);display:flex;flex:none">${ic("analytics", 15)}</span>
  <span style="flex:1;min-width:0;font-size:12.5px;color:var(--s700);line-height:1.5">
    Both dimensions moved, so there is no single order to read this in. The two controlled paths below use combinations that already exist — nothing was calculated to build them.
  </span>
</div>` : ""}

<section class="panel lift" style="padding:26px 28px">
  <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:18px;flex-wrap:wrap">
    <h2 class="t-sec">${both ? "Two controlled paths, one destination" : "One controlled step"}</h2>${src("combined")}
    <span style="flex:1"></span>
    <span class="t-meta">Each step moves one dimension and holds the other</span>
  </div>
  <div style="display:flex;gap:${both ? "34" : "0"}px;align-items:flex-start">
    ${both ? `
    ${pathColumn({ title: "Financial first", note: "market moves, then the asset", mk, cases: [base, B, sel],
      steps: [{ kind: "rv", from: base.sc.name, to: sel.sc.name, delta: cn.commercialFirst.commercial },
              { kind: "sb", from: base.t.short, to: sel.t.short, delta: cn.commercialFirst.technical }] })}
    <span style="width:1px;align-self:stretch;background:var(--hair);flex:none"></span>
    ${pathColumn({ title: "Technical first", note: "asset moves, then the market", mk, cases: [base, C, sel],
      steps: [{ kind: "sb", from: base.t.short, to: sel.t.short, delta: cn.technicalFirst.technical },
              { kind: "rv", from: base.sc.name, to: sel.sc.name, delta: cn.technicalFirst.commercial }] })}`
    : pathColumn({ title: cn.kind.key === "sb" ? "Technical change only" : "Financial change only",
      note: cn.kind.key === "sb" ? "the market view is unchanged" : "the asset is unchanged", mk,
      cases: [base, sel],
      steps: [{ kind: cn.kind.key === "sb" ? "sb" : "rv",
                from: cn.kind.key === "sb" ? base.t.short : base.sc.name,
                to: cn.kind.key === "sb" ? sel.t.short : sel.sc.name, delta: cn.total }] })}
  </div>
</section>

${both ? `
<section class="panel" style="padding:24px 26px;margin-top:20px">
  <div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap">
    <h2 class="t-sec">${same ? "The effects are independent" : "The effects interact"}</h2>${src("combined")}
    <span style="flex:1"></span>
    <b style="font-size:15px;font-weight:700;color:var(--s900);font-variant-numeric:tabular-nums">
      ${cn.total >= 0 ? "+" : "−"}${shortFmt(mk, Math.abs(cn.total), true)} either way</b>
  </div>
  <div style="display:flex;gap:34px;margin-top:16px;flex-wrap:wrap">
    ${swing("Technical contribution", cn.technicalFirst.technical, cn.commercialFirst.technical,
      `on ${base.sc.name}`, `on ${sel.sc.name}`, SB)}
    ${swing("Financial contribution", cn.commercialFirst.commercial, cn.technicalFirst.commercial,
      `on ${base.t.short}`, `on ${sel.t.short}`, RN)}
  </div>
  <p style="font-size:12.5px;color:var(--s700);line-height:1.6;margin:16px 0 0">
    ${same
      ? "The two changes barely affect each other on this metric, so either order can be quoted."
      : "Neither change has a single universal contribution — its impact depends on the other side of the analysis case."}
  </p>
</section>` : ""}

${sec({ label: "What the change is worth", source: src("combined"),
        sub: `${selLabel(sel)} against ${selLabel(base)}, in the units the decision is made in.` })}
<section class="panel lift" style="padding:24px 26px">
  ${(() => {
    const keys = ["capex", "gwh", "rev", "irr"];
    const rows = keys.map((kk) => {
      const mm = MET[kk], b0 = mm.get(base), v = mm.get(sel), d = v - b0;
      return { kk, mm, v, d, rel: d / (Math.abs(b0) || 1), good: d === 0 ? null : (mm.lowerBetter ? d < 0 : d > 0) };
    });
    const npvD = npvOfCase(sel) - npvOfCase(base);
    const gmax = Math.max(...rows.map((r) => Math.abs(r.rel)), Math.abs(npvD / npvOfCase(base)), 0.0001);
    const bar = (label, val, rel, good, fmtD, from) => `
      <div style="display:flex;align-items:center;gap:16px;padding:10px 0">
        <span style="flex:none;width:168px;min-width:0">
          <span style="display:block;font-size:12px;color:var(--s500)">${label}</span>
          <span style="display:block;font-size:15px;font-weight:600;color:var(--s900);margin-top:2px;font-variant-numeric:tabular-nums">${val}</span>
        </span>
        <span style="flex:1;min-width:0;position:relative;height:20px;display:block">
          <span style="position:absolute;left:50%;top:0;bottom:0;width:1px;background:rgba(30,58,138,.16);display:block"></span>
          <span style="position:absolute;top:5px;height:10px;border-radius:3px;display:block;
                ${good ? `left:50%;width:${((Math.abs(rel) / gmax) * 48).toFixed(1)}%` : `right:50%;width:${((Math.abs(rel) / gmax) * 48).toFixed(1)}%`};
                background:${good ? SU : WARN.ink};opacity:.6"></span>
        </span>
        <b style="flex:none;width:104px;text-align:right;font-size:13px;font-weight:700;color:${good ? "#0E9469" : "#C22222"};font-variant-numeric:tabular-nums">${fmtD}</b>
        <span style="flex:none;width:92px">${src(from)}</span>
      </div>`;
    return rows.map((r) => bar(r.mm.label, r.mm.fmt(sel), r.rel, r.good,
        (r.d >= 0 ? "+" : "−") + shortFmt(r.kk, Math.abs(r.d), true), r.mm.from)).join("")
      + bar("NPV", eurMs(npvOfCase(sel)), npvD / npvOfCase(base), npvD >= 0,
        (npvD >= 0 ? "+" : "−") + eurMs(Math.abs(npvD)), "revenew");
  })()}
  <div style="display:flex;align-items:center;gap:14px;margin-top:14px;padding-top:12px;border-top:1px solid var(--hair)">
    <span class="t-meta" style="flex:1;min-width:0">Bar length is relative change; the figure is the actual difference. Direction means better or worse, not sign.</span>
    <span class="t-meta">← worse</span><span class="t-meta">better →</span>
  </div>
</section>

<div style="display:flex;align-items:center;gap:14px;margin:26px 0 0">
  <span class="hr" style="flex:1"></span>
  <button class="btn btn-secondary">Technical details${ic("down", 15, 1.9)}</button>
  <button class="btn btn-secondary">Financial details${ic("down", 15, 1.9)}</button>
  <button class="btn btn-secondary">How this explanation works${ic("down", 15, 1.9)}</button>
  <span class="hr" style="flex:1"></span>
</div>
<p class="t-meta" style="text-align:center;margin-top:13px;line-height:1.6;max-width:104ch;margin-left:auto;margin-right:auto">
  Exact before-and-after values for every technical and financial figure, and why a controlled path is needed at all,
  are one level down. The caveat that matters stays here: no single split of the total is correct, so none is quoted.
</p>`;
};

/* §3 · arrived at from Explain difference: four cases, two of them the
   controlled intermediates the matrix already held. */
SEL = explainSet(BASE, caseOf("v4h", "high")).cases;
writeFileSync("CompareExplained.dc.html", doc({ w: 1440, h: 1630, side: projectSide("compare"),
  body: explainBody({ mk: "irr" }) }));
SEL = [caseOf("base2h", "base"), caseOf("base2h", "high"), caseOf("v4h", "high")];

console.log("Compare cases reworked · decision cockpit");

/* ═══════════════════════════════════════════════════════════════
   INTERACTION STATES & MISSING FLOWS (§29)
   Compact demonstrations of components that already exist on the
   screens, in the states those screens imply. Not new screens —
   every tile below is a state of something already designed.
   ═══════════════════════════════════════════════════════════════ */
const withState = ({ sel, base }, fn) => {
  const s0 = SEL, b0 = BASE;
  if (sel) SEL = sel;
  if (base) BASE = base;
  const out = fn();
  SEL = s0; BASE = b0;
  return out;
};

const tile = ({ code, name, note, body, span = 1 }) => `
<div style="flex:${span};min-width:0;display:flex;flex-direction:column">
  <div style="display:flex;align-items:baseline;gap:9px">
    <span style="font-size:11px;font-weight:700;color:var(--su700);letter-spacing:.04em">${code}</span>
    <span class="t-card" style="font-size:14.5px">${name}</span>
  </div>
  <p class="t-meta" style="margin:6px 0 13px;line-height:1.55;font-size:11.5px;min-height:50px">${note}</p>
  <div style="flex:1;min-width:0">${body}</div>
</div>`;

const tileRow = (tiles) => `<div style="display:flex;gap:26px;align-items:flex-start;margin-top:30px">${tiles.join("")}</div>`;
const sheetHead = (eyebrow, title, sub) => `
<p style="margin:0 0 7px;color:var(--su700);font-weight:600;letter-spacing:.08em;text-transform:uppercase;font-size:11px">${eyebrow}</p>
<h1 class="t-page">${title}</h1>
<p class="t-body" style="margin-top:10px;color:var(--s500);max-width:104ch">${sub}</p>`;

/* the metric control, small enough for a tile */
const miniMetric = (mk) => `
<div style="display:flex;align-items:center;gap:9px;margin-bottom:13px">
  <span class="t-meta">Show</span>
  <span class="btn btn-secondary" style="height:30px;font-size:12px;padding:0 11px">${MET[mk].label}${ic("down", 13, 1.8)}</span>
  ${src(MET[mk].from)}
</div>`;

/* §10 A–E · the matrix at tile scale, markers intact */
const miniMatrix = (mk, sel) => {
  const m = MET[mk];
  const vals = TECH.flatMap((t) => SCEN.map((s2) => m.get(caseOf(t.id, s2.id))));
  const lo = Math.min(...vals), hi = Math.max(...vals);
  const best = m.lowerBetter ? lo : hi, worst = m.lowerBetter ? hi : lo;
  const neutral = MX[mk].judge === false;
  const words = MX[mk].judge
    ? { top: m.lowerBetter ? "Lowest" : "Best", bot: m.lowerBetter ? "Highest" : "Weakest" }
    : { top: m.lowerBetter ? "Least" : "Most", bot: m.lowerBetter ? "Most" : "Least" };
  const tint = (v) => {
    const t = hi === lo ? 0.5 : (v - lo) / (hi - lo);
    if (neutral) return `background:linear-gradient(168deg,rgba(37,99,235,${(0.03 + t * 0.12).toFixed(3)}),rgba(255,255,255,0) 80%)`;
    const g = m.lowerBetter ? 1 - t : t;
    return g >= 0.5
      ? `background:linear-gradient(168deg,rgba(109,90,198,${(0.03 + (g - 0.5) * 0.18).toFixed(3)}),rgba(255,255,255,0) 80%)`
      : `background:linear-gradient(168deg,rgba(245,158,11,${((0.5 - g) * 0.11).toFixed(3)}),rgba(255,255,255,0) 80%)`;
  };
  return `
<section class="panel" style="padding:16px 18px">
  <div style="display:flex;gap:7px;margin-bottom:9px">
    <span style="width:74px;flex:none"></span>
    ${SCEN.map((s2) => `<span style="flex:1;min-width:0;text-align:center;font-size:10.5px;font-weight:600;color:var(--s700);line-height:1.25">${s2.name.replace(" ", "<br>")}</span>`).join("")}
  </div>
  ${TECH.map((t) => `
    <div style="display:flex;gap:7px;margin-bottom:7px;align-items:stretch">
      <span style="width:74px;flex:none;display:flex;flex-direction:column;justify-content:center">
        <span style="font-size:11px;font-weight:600;color:var(--s900)">${t.short}</span>
        <span class="t-meta" style="font-size:9.5px;margin-top:2px">${t.mwh} MWh</span>
      </span>
      ${SCEN.map((s2) => {
        const c = caseOf(t.id, s2.id), v = m.get(c);
        const win = v === best, low = v === worst && !win;
        const isBase = t.id === "base2h" && s2.id === "base";
        const isSel = !!sel && sel.tid === t.id && sel.sid === s2.id;
        const mark = isSel ? ["Selected", "#0A6E77", "rgba(14,157,168,.14)"]
                   : win ? [words.top, neutral ? "#334155" : "#5B4BB5", neutral ? "rgba(30,58,138,.07)" : "rgba(109,90,198,.13)"]
                   : low ? [words.bot, neutral ? "#334155" : "#9A6208", neutral ? "rgba(30,58,138,.07)" : "rgba(245,158,11,.14)"]
                   : isBase ? ["Baseline", "#0A6E77", "rgba(14,157,168,.10)"] : null;
        return `
        <span class="${win || isSel ? "glass-sm" : "wash"}" style="flex:1;min-width:0;padding:8px 6px 9px;text-align:center;${tint(v)};
              ${isSel ? "box-shadow:0 0 0 2px rgba(14,157,168,.6), var(--sh-sm)" : win ? "box-shadow:0 0 0 1px rgba(109,90,198,.34), var(--sh-sm)" : ""}">
          <span style="display:flex;justify-content:center;height:15px;margin-bottom:3px">
            ${mark ? `<span style="display:inline-flex;align-items:center;height:15px;padding:0 5px;border-radius:5px;font-size:8.5px;font-weight:700;letter-spacing:.02em;background:${mark[2]};color:${mark[1]}">${mark[0]}</span>` : ""}
          </span>
          <span style="display:block;font-size:${win || isSel ? "14.5" : "13.5"}px;font-weight:${win || isSel ? "700" : "600"};color:var(--s900);font-variant-numeric:tabular-nums">${m.fmt(c)}</span>
          <span style="display:block;margin-top:4px">${isBase ? `<span class="t-meta" style="font-size:9px">baseline</span>` : deltaChip(deltaOf(mk, c), 9.5, neutral)}</span>
        </span>`;
      }).join("")}
    </div>`).join("")}
</section>`;
};

const statesMatrix = sheet({
  w: 1440, h: 1580,
  body: `
${sheetHead("Interaction states · A–E", "Case matrix",
  "The six metric states are built out in full on the Cases page — this sheet is the component's rulebook. The geometry never changes, because the entities compared never change. What changes is the ranking, the words on the markers, the wash, the highlights, the chart beneath and the sentence that reads the result. Switching metric re-reads the same nine cases: nothing recalculates and nothing is created in either product.")}

${tileRow([
  tile({ code: "A", name: "IRR — a judged metric", note: "Combined: ReveNew cash flows against StoreBrid CAPEX, through the financial model. Higher is better, so the extremes read Best and Weakest and the wash carries a good/bad reading. Where a project has no financial model, this tab is not offered at all.",
    body: miniMetric("irr") + miniMatrix("irr") }),
  tile({ code: "B", name: "Revenue / MWh — a different winner", note: "Base 2 h + High spread leads here, because the 4 h variant earns more in total but less for each MWh it moves. Same nine cases, same geometry, a different question — which is the whole argument for a metric selector rather than a fixed column.",
    body: miniMetric("perMwh") + miniMatrix("perMwh") }),
  tile({ code: "C", name: "CAPEX — a descriptive metric", note: "Not judged. Lower CAPEX is not better, it is only less: the markers read Least and Most, the wash becomes one blue ramp by magnitude, and the deltas lose their green and red. One value per row, because a market assumption cannot change what the plant costs.",
    body: miniMetric("capex") + miniMatrix("capex") }),
])}

${tileRow([
  tile({ code: "D", name: "Cell selected", note: "Clicking a cell does not leave the page. The preview opens under the grid, aligned to the column, with the five figures that matter and two ways out.",
    body: miniMetric("irr") + miniMatrix("irr", { tid: "v4h", sid: "high" }) }),
  tile({ code: "D", name: "…and its preview", note: "Movement is shown against the baseline; attribution is not, because both dimensions differ here. Splitting it is Compare's job, and the card says so rather than guessing.",
    body: `
<section class="raise" style="padding:16px 18px">
  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
    <span class="band" style="color:var(--su700);font-size:10px">Selected case</span>
    <span style="display:inline-flex;align-items:center;gap:5px"><i style="width:4px;height:4px;border-radius:50%;background:${SB};display:block"></i>
      <span style="font-size:12.5px;font-weight:600;color:var(--s900)">4 h variant</span></span>
    <span style="font-size:11px;color:var(--s400)">×</span>
    <span style="display:inline-flex;align-items:center;gap:5px"><i style="width:4px;height:4px;border-radius:50%;background:${RN};display:block"></i>
      <span style="font-size:12.5px;font-weight:600;color:var(--s900)">High spread</span></span>
  </div>
  <div class="rows" style="margin-top:12px">
    ${[["irr", "IRR"], ["rev", "Annual revenue"], ["perMwh", "Revenue / MWh"], ["gwh", "Energy discharged"], ["capex", "CAPEX"]].map(([k, lab]) => {
      const c = caseOf("v4h", "high");
      return `<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 0">
        <span style="display:flex;align-items:center;gap:7px"><span style="font-size:11.5px;color:var(--s500)">${lab}</span>${src(MET[k].from)}</span>
        <span style="display:flex;align-items:baseline;gap:9px">
          <b style="font-size:13.5px;font-weight:600;color:var(--s900);font-variant-numeric:tabular-nums">${MET[k].fmt(c)}</b>
          ${deltaChip(deltaOf(k, c), 10)}
        </span></div>`;
    }).join("")}
  </div>
  <div style="display:flex;gap:9px;margin-top:14px">
    <button class="btn btn-secondary" style="flex:1;height:32px;font-size:12px">Add to comparison</button>
    <button class="btn btn-primary" style="flex:1;height:32px;font-size:12px">View case</button>
  </div>
</section>` }),
  tile({ code: "E", name: "How a cell is marked", note: "Four states, four words. Tint only says roughly where to look; a reader who cannot separate the wash from the background loses nothing.",
    body: `
<section class="panel" style="padding:18px 20px">
  <div class="rows">
    ${[["Best", "#5B4BB5", "rgba(109,90,198,.13)", "Judged metrics only — IRR, revenue, revenue per MWh, revenue per cycle. Ring plus tag."],
       ["Weakest", "#9A6208", "rgba(245,158,11,.14)", "The other end of a judged metric. Tag only, no ring — information, not a warning."],
       ["Most · Least", "#334155", "rgba(30,58,138,.07)", "Descriptive metrics — energy discharged and CAPEX. Slate, never green or amber: the cheapest plant is not the best one, and the Suite does not say it is."],
       ["Baseline", "#0A6E77", "rgba(14,157,168,.10)", "The declared reference. It shows the word “baseline” where the other cells show a delta."],
       ["Selected", "#0A6E77", "rgba(14,157,168,.14)", "Two-pixel teal ring plus tag. Selection outranks every other marker, and survives a metric change."]].map(([t, c, bg, note]) => `
      <div style="padding:11px 0">
        <span style="display:inline-flex;align-items:center;height:17px;padding:0 6px;border-radius:5px;font-size:9.5px;font-weight:700;background:${bg};color:${c}">${t}</span>
        <span class="t-meta" style="display:block;margin-top:6px;line-height:1.55">${note}</span>
      </div>`).join("")}
  </div>
  <p class="t-meta" style="margin-top:12px;line-height:1.55;padding-top:12px;border-top:1px solid var(--hair)">
A cell can be several of these at once. Selected wins, then the metric's own extreme; baseline always keeps its own delta slot.
  </p>
</section>` }),
])}

<p class="t-meta" style="margin-top:30px;line-height:1.65;max-width:118ch">
  All six states are built out at full size on the <b style="font-weight:600;color:var(--s700)">Cases</b> page, each with its own decision question, its own three
  highlights and its own trade-off chart. Two of the six behave structurally differently and are the reason the component needed a rulebook at all:
  <b style="font-weight:600;color:var(--s700)">Energy discharged</b> and <b style="font-weight:600;color:var(--s700)">CAPEX</b> are StoreBrid outputs that do not vary
  by financial scenario, so each row collapses to one value across all three columns — shown that way rather than repeated three times or given an invented difference.
</p>`,
});

/* §17–§24 F–N · Compare cases */
const miniChips = (cases, baseline) => `
<div style="display:flex;gap:8px;flex-wrap:wrap">
  ${cases.map((c) => `
    <span class="glass-sm" style="display:inline-flex;align-items:center;gap:8px;padding:7px 10px;
          ${selKey(c) === selKey(baseline) ? "box-shadow:0 0 0 1px rgba(14,157,168,.3), var(--sh-sm)" : ""}">
      ${selKey(c) === selKey(baseline) ? `<span class="cov" style="height:18px;font-size:9.5px"><i style="background:${SU}"></i>Baseline</span>` : ""}
      <i style="width:4px;height:4px;border-radius:50%;background:${SB};display:block"></i>
      <span style="font-size:11.5px;font-weight:600;color:var(--s900)">${c.t.short}</span>
      <span style="font-size:10px;color:var(--s400)">+</span>
      <i style="width:4px;height:4px;border-radius:50%;background:${RN};display:block"></i>
      <span style="font-size:11.5px;font-weight:600;color:var(--s900)">${c.sc.name}</span>
      ${selKey(c) === selKey(baseline) ? "" : `<span style="color:var(--s400);display:flex">${closeX(11)}</span>`}
    </span>`).join("")}
  <span class="btn btn-secondary" style="height:32px;font-size:12px;padding:0 10px">${ic("plus", 13, 1.9)}Add case</span>
</div>`;

const miniDeltas = (cases, baseline, keys) => withState({ sel: cases, base: baseline }, () => `
<section class="panel" style="padding:6px 18px 14px;margin-top:12px">
  <div style="display:flex;gap:12px;padding-top:12px">
    <span style="width:104px;flex:none"></span>
    ${cases.filter((c) => selKey(c) !== selKey(baseline)).map((c) => `<span style="flex:1;min-width:0;text-align:right;font-size:11px;font-weight:600;color:var(--s900);line-height:1.3">${selLabel(c)}</span>`).join("")}
  </div>
  ${keys.map((k) => `
    <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-top:1px solid var(--hair)">
      <span style="width:104px;flex:none;display:flex;align-items:center;gap:6px">
        <span style="font-size:11px;color:var(--s500)">${MET[k].label}</span>
      </span>
      ${cases.filter((c) => selKey(c) !== selKey(baseline)).map((c) => `
        <span style="flex:1;min-width:0;text-align:right">
          <span style="display:block;font-size:12.5px;font-weight:600;color:var(--s900);font-variant-numeric:tabular-nums">${MET[k].fmt(c)}</span>
          <span style="display:block;margin-top:2px">${deltaChip(deltaOf(k, c, baseline), 10)}</span>
        </span>`).join("")}
    </div>`).join("")}
</section>`);

const miniBars = (mk, cases, baseline) => withState({ sel: cases, base: baseline }, () => {
  const m = MET[mk], vals = cases.map(m.get), max = Math.max(...vals);
  return `
<section class="panel" style="padding:16px 18px">
  <div style="display:flex;align-items:center;gap:9px;margin-bottom:12px">
    <span class="t-meta">Compare by</span>
    <span class="btn btn-secondary" style="height:29px;font-size:11.5px;padding:0 10px">${m.label}${ic("down", 13, 1.8)}</span>
    ${src(m.from)}
  </div>
  ${cases.map((c, i) => `
    <div style="display:flex;align-items:center;gap:10px;padding:8px 0">
      <span style="width:112px;flex:none;font-size:11px;font-weight:500;color:var(--s900);line-height:1.3">${selLabel(c)}</span>
      <span style="flex:1;min-width:0;height:16px;display:block;position:relative">
        <span style="position:absolute;left:0;top:0;height:16px;width:${((vals[i] / max) * 100).toFixed(1)}%;border-radius:5px;display:block;
          background:linear-gradient(90deg,rgba(109,90,198,${selKey(c) === selKey(baseline) ? ".42" : ".7"}),rgba(109,90,198,${selKey(c) === selKey(baseline) ? ".58" : ".9"}))"></span>
      </span>
      <span style="width:96px;flex:none;text-align:right;display:flex;align-items:baseline;justify-content:flex-end;gap:7px">
        <b style="font-size:12.5px;font-weight:600;color:var(--s900);font-variant-numeric:tabular-nums">${m.fmt(c)}</b>
        ${selKey(c) === selKey(baseline) ? `<span class="t-meta" style="font-size:9.5px">base</span>` : deltaChip(deltaOf(mk, c, baseline), 10)}
      </span>
    </div>`).join("")}
</section>`;
});

const A0 = caseOf("base2h", "base"), B0 = caseOf("base2h", "high"), C0 = caseOf("v4h", "high"), D0 = caseOf("v4h", "base");

const statesCompare = sheet({
  w: 1440, h: 2340,
  body: `
${sheetHead("Interaction states · F–N", "Compare cases",
  "The same page at every selection count, with the baseline and the metric as real controls. Changing the baseline moves every delta, the key changes, the bridge and the wording of the summary. Changing the metric moves the primary comparison. Neither is decoration.")}

${tileRow([
  tile({ code: "F", name: "No cases selected", note: "The empty state says what a comparison needs and where cases come from — each one is a StoreBrid simulation already run, paired with a ReveNew scenario already built.",
    body: `
<section class="panel lift" style="padding:30px 24px;text-align:center">
  <span style="width:40px;height:40px;margin:0 auto;border-radius:12px;display:flex;align-items:center;justify-content:center;
        background:rgba(14,157,168,.12);color:var(--su700)">${ic("layers", 20)}</span>
  <div class="t-card" style="font-size:15px;margin-top:13px">Select cases to compare</div>
  <p class="t-meta" style="margin-top:8px;line-height:1.6">A comparison needs two to four cases. Pick them from the matrix, or add them here.</p>
  <div style="display:flex;gap:9px;margin-top:16px">
    <button class="btn btn-secondary" style="flex:1;height:32px;font-size:12px">Case matrix</button>
    <button class="btn btn-primary" style="flex:1;height:32px;font-size:12px">Add case</button>
  </div>
</section>` }),
  tile({ code: "G", name: "One case selected", note: "Not an error — a half-finished selection. The case stays, becomes the baseline, and the copy explains why the next one matters: change one dimension and the difference becomes attributable.",
    body: `
${miniChips([A0], A0)}
<section class="panel lift" style="padding:26px 24px;text-align:center;margin-top:12px">
  <div class="t-card" style="font-size:15px">Select at least one more case</div>
  <p class="t-meta" style="margin-top:8px;line-height:1.6">
    Base 2 h + Base market is the baseline. Add a case that changes the scenario, the simulation, or both — the page reports which.
  </p>
  <button class="btn btn-primary" style="height:32px;font-size:12px;margin-top:14px">Add case</button>
</section>` }),
  tile({ code: "H", name: "Four cases selected", note: "The upper bound. Chips add and remove in place; the baseline keeps its position and cannot be removed without another case taking the role.",
    body: miniChips([A0, B0, C0, D0], A0) + miniDeltas([A0, B0, C0, D0], A0, ["rev", "irr", "capex"]) }),
])}

${tileRow([
  tile({ code: "I", name: "Baseline selector open", note: "It lists only cases already in the comparison — a baseline outside the selection would produce deltas against something not on screen.",
    body: `<div style="display:flex;flex-direction:column;align-items:flex-start;gap:0">
      ${caseChip(A0, true)}
      ${withState({ sel: [A0, B0, C0] }, () => baselineMenu(selKey(A0), [A0, B0, C0].map((c) => [c.t.id, c.sc.id])))}
    </div>` }),
  tile({ code: "J", name: "Baseline moved to 4 h + High spread", note: "The same three cases, measured from the other end. Every delta flips sign, and the comparison now reads as “what do we give up by not building the 4 h” instead of “what does it gain us”.",
    body: miniChips([A0, B0, C0], C0) + miniDeltas([A0, B0, C0], C0, ["rev", "irr", "capex", "perMwh"]) }),
  tile({ code: "K", name: "Metric selector open", note: "Six metrics, each carrying its own provenance. A metric is offered only when the data behind it exists — IRR disappears from this list for a project with no financial model.",
    body: `<div style="display:flex;flex-direction:column;align-items:flex-start">
      <span class="btn btn-secondary" style="height:36px;font-size:12.5px">Revenue / MWh${ic("down", 14, 1.8)}</span>
      ${metricMenu("perMwh")}
    </div>` }),
])}

${tileRow([
  tile({ code: "L", name: "Metric: Revenue / MWh", note: "The default. It answers what a MWh through the battery is worth, so the 2 h case leads — it moves less energy but each MWh earns more.",
    body: miniBars("perMwh", [A0, B0, C0], A0) }),
  tile({ code: "L", name: "Metric: Annual revenue", note: "The same three cases, the same baseline, a different question — and a different winner. This is why the metric cannot be fixed to one choice.",
    body: miniBars("rev", [A0, B0, C0], A0) }),
  tile({ code: "M · N", name: "Detailed data, collapsed and expanded", note: "The table is deliberately secondary: the charts carry the decision, the table is for checking it. Expanded, it groups by who owns each figure.",
    body: `
<div style="display:flex;align-items:center;gap:10px">
  <span class="hr" style="flex:1"></span>
  <span class="btn btn-secondary" style="height:30px;font-size:12px">Show data${ic("down", 13, 1.9)}</span>
  <span class="hr" style="flex:1"></span>
</div>
<section class="panel" style="padding:14px 18px;margin-top:12px">
  ${[["Technical — StoreBrid", src("storebrid"), ["Storage capacity", "Duration", "Round-trip efficiency", "Full cycles / year", "Utilisation", "Energy discharged", "CAPEX"]],
     ["Financial — ReveNew", src("revenew"), ["Annual revenue", "Capture price", "Spot average", "Capture rate"]],
     ["Combined — Suite", src("combined"), ["Revenue / MWh discharged", "Revenue / cycle", "Revenue / MW installed", "Revenue / CAPEX", "IRR"]]].map(([g, sr, rows]) => `
    <div style="padding:10px 0;border-top:1px solid var(--hair)">
      <div style="display:flex;align-items:center;gap:9px"><span class="band" style="font-size:10px">${g}</span>${sr}</div>
      <div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:9px">
        ${rows.map((r) => `<span class="wash" style="padding:4px 8px;border-radius:6px;font-size:10.5px;color:var(--s700)">${r}</span>`).join("")}
      </div>
    </div>`).join("")}
  <p class="t-meta" style="margin-top:12px;line-height:1.55">Differences from baseline sit under each value, not beside the label — the absolute figure stays the primary reading.</p>
</section>` }),
])}`,
});

/* §14 O–R · the technical variant lifecycle, end to end */
const lifeStep = (n, label, tone) => `
<span style="display:inline-flex;align-items:center;gap:7px">
  <span style="width:18px;height:18px;flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;
        font-size:9.5px;font-weight:700;background:${tone}1f;color:${tone}">${n}</span>
  <span style="font-size:11.5px;font-weight:600;color:var(--s900)">${label}</span>
</span>`;

const statesVariant = sheet({
  w: 1440, h: 1300,
  body: `
${sheetHead("Interaction states · O–R", "Technical variant lifecycle",
  "The Suite's one piece of technical iteration, and a strict dependency chain: StoreBrid returns energy, ReveNew prices it, the cases exist. No financial figure appears before the technical run finishes because there is nothing to compute it from — and the original simulation is never touched, so every case already built on it stays valid. The three stages are shown as operational status on the simulation itself.")}

<div style="display:flex;align-items:center;gap:14px;margin-top:22px;flex-wrap:wrap">
  ${lifeStep("O", "Create variant", SU)}<span style="color:var(--s400);display:flex">${ic("right", 14, 2)}</span>
  ${lifeStep("P", "Technical simulation — StoreBrid", SB)}<span style="color:var(--s400);display:flex">${ic("right", 14, 2)}</span>
  ${lifeStep("Q", "Financial evaluation — ReveNew", RN)}<span style="color:var(--s400);display:flex">${ic("right", 14, 2)}</span>
  ${lifeStep("R", "3 cases ready — Suite", SU)}
</div>

${tileRow([
  tile({ code: "O", name: "Create variant", note: "Five levers, not the wizard. The modal states its own changes, names everything that carries over, and says plainly that the full model is not being edited.",
    body: `
<section class="panel" style="padding:18px 20px">
  <div style="display:flex;align-items:center;gap:10px">
    <span class="t-card" style="font-size:14px">Create technical variant</span>${src("storebrid")}
  </div>
  <p class="t-meta" style="margin-top:7px;line-height:1.55">Based on Base case 2027 · the original is not modified</p>
  <div class="wash" style="padding:13px 15px;margin-top:13px">
    <span class="t-meta" style="display:block">2 changes</span>
    ${[["Storage capacity", "200 MWh", "400 MWh"], ["Duration", "2.0 h", "4.0 h"]].map(([k, was, now]) => `
      <span style="display:flex;align-items:center;gap:9px;margin-top:8px">
        <span style="flex:1;min-width:0;font-size:11.5px;color:var(--s500)">${k}</span>
        <span style="font-size:11.5px;color:var(--s400);text-decoration:line-through">${was}</span>
        <span style="color:var(--s400);display:flex">${ic("right", 12, 2)}</span>
        <span style="font-size:12.5px;font-weight:600;color:var(--s900)">${now}</span>
      </span>`).join("")}
  </div>
  <div style="margin-top:12px">
    <span class="t-meta" style="display:block;margin-bottom:6px">Create as</span>
    <span class="wash" style="display:block;padding:9px 12px;font-size:12.5px;color:var(--s900)">Base case 2027 — 4 h duration</span>
  </div>
  <div style="display:flex;align-items:center;gap:9px;margin-top:14px">
    <a href="#" style="flex:1;font-size:11.5px;font-weight:500;display:inline-flex;align-items:center;gap:5px">Advanced in StoreBrid${ic("upRight", 12, 1.9)}</a>
    <button class="btn btn-primary" style="height:32px;font-size:12px">Create &amp; run</button>
  </div>
</section>` }),
  tile({ code: "P", name: "Running", note: "Two dependent things, both honest. StoreBrid is processing; the financial side is waiting on it, and shows no number rather than a stale or invented one.",
    body: `
<section class="panel" style="padding:18px 20px">
  <div style="display:flex;align-items:center;gap:11px">
    <span style="width:15px;height:15px;flex:none;border-radius:50%;border:2.2px solid rgba(37,99,235,.2);border-top-color:${SB};display:block"></span>
    <span class="t-card" style="font-size:14px">4 h variant</span>${SIMSTATE.running}
  </div>
  <div style="height:5px;border-radius:3px;margin-top:14px;overflow:hidden;background:rgba(30,58,138,.07)">
    <span style="display:block;width:58%;height:100%;border-radius:3px;background:linear-gradient(90deg,#5B8DEF,#2563EB)"></span>
  </div>
  <div class="rows" style="margin-top:14px">
    <div style="padding:11px 0">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px">
        <span style="font-size:12px;font-weight:600;color:var(--s900)">Technical results</span>${src("storebrid")}
      </div>
      <span class="t-meta" style="display:block;margin-top:4px">Processing in StoreBrid</span>
    </div>
    <div style="padding:11px 0">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px">
        <span style="font-size:12px;font-weight:600;color:var(--s900)">Financial cases</span>${src("suite")}
      </div>
      <span class="t-meta" style="display:block;margin-top:4px">Waiting for technical results · 3 scenarios queued</span>
    </div>
  </div>
  <div style="display:flex;gap:16px;margin-top:12px;padding-top:12px;border-top:1px solid var(--hair)">
    ${["Energy discharged", "Cycles / year", "Utilisation"].map((k) => `
      <span style="flex:1;min-width:0"><span class="t-meta" style="display:block;font-size:9.5px">${k}</span>
      <span style="display:block;margin-top:7px">${skel("70%", 14)}</span></span>`).join("")}
  </div>
</section>` }),
  tile({ code: "Q", name: "Completed", note: "The technical results land first and the three scenarios are evaluated against them. The variant's deltas are measured against the simulation it came from, not against a previous run it never had.",
    body: `
<section class="panel" style="padding:18px 20px">
  <div style="display:flex;align-items:center;gap:10px">
    <span class="t-card" style="font-size:14px">4 h variant</span>${SIMSTATE.completed}
  </div>
  <div style="display:flex;gap:14px;margin-top:14px">
    ${[["Energy discharged", "92.4 GWh", "+41.7%"], ["Cycles / year", "231", "−95"], ["Utilisation", "79%", "+5 pp"]].map(([k, v, d]) => `
      <span style="flex:1;min-width:0">
        <span class="t-meta" style="display:block;font-size:9.5px">${k}</span>
        <span style="display:block;font-size:15px;font-weight:700;color:var(--s900);margin-top:5px;font-variant-numeric:tabular-nums">${v}</span>
        <span style="display:block;font-size:10px;font-weight:600;color:${d.startsWith("−") ? "#C22222" : "#0E9469"};margin-top:3px">${d}</span>
      </span>`).join("")}
  </div>
  <p class="t-meta" style="margin-top:10px;line-height:1.5">vs Base case 2027 — fewer, deeper cycles moving more energy.</p>
  <div class="wash" style="padding:12px 14px;margin-top:13px">
    <span style="display:flex;align-items:center;gap:9px">
      <span style="font-size:12px;font-weight:600;color:var(--s900);flex:1">3 financial scenarios available</span>${src("revenew")}
    </span>
    <span style="display:flex;gap:6px;margin-top:9px;flex-wrap:wrap">
      ${SCEN.map((sc) => `<span class="cov" style="height:20px;font-size:10px"><i style="background:${RN}"></i>${sc.name}</span>`).join("")}
    </span>
  </div>
  <div style="display:flex;gap:9px;margin-top:13px">
    <button class="btn btn-secondary" style="flex:1;height:32px;font-size:12px">Compare</button>
    <button class="btn btn-primary" style="flex:1;height:32px;font-size:12px">View cases</button>
  </div>
</section>` }),
  tile({ code: "R", name: "Case matrix updated", note: "The variant becomes a row, not a replacement. Six cases become nine, the baseline does not move, and the new row is marked so the change is visible without re-reading the whole grid.",
    body: miniMetric("irr") + miniMatrix("irr") }),
])}`,
});

/* §8, §15 S–X · financial scenarios and the forecast editor */
const statesCommercial = sheet({
  w: 1440, h: 1420,
  body: `
${sheetHead("Interaction states · S–X", "Financial scenarios and the forecast editor",
  "Two controlled financial actions. Adding a scenario selects one that already exists in ReveNew and evaluates it here — it authors nothing. Editing a forecast changes four values and hands the rest back to ReveNew. Both make clear what has to recalculate afterwards, and what stays untouched.")}

${tileRow([
  tile({ code: "S", name: "Scenario selector", note: "Scenarios come from ReveNew. The checkboxes say which are already in the analysis; the footer says where new ones are authored. Nothing here creates a scenario.",
    body: `
<section class="raise" style="padding:14px 8px 8px">
  <div class="band" style="padding:0 12px 4px;font-size:10px">Add revenue scenarios</div>
  <p class="t-meta" style="padding:0 12px 10px;line-height:1.5;margin:0">Already built in ReveNew. Adding one creates cases here, not there.</p>
  ${SCENLIB.map((x) => `
    <span style="display:flex;align-items:center;gap:9px;padding:8px 12px;${x.blocked ? "opacity:.62" : ""}">
      <span style="width:14px;height:14px;flex:none;border-radius:4px;display:flex;align-items:center;justify-content:center;
            ${x.blocked ? "box-shadow:inset 0 0 0 1.5px rgba(30,58,138,.12)" : x.on ? `background:${RN};color:#fff` : "box-shadow:inset 0 0 0 1.5px rgba(30,58,138,.2)"}">${x.on ? ic("check", 9, 2.8) : ""}</span>
      <span style="flex:1;min-width:0">
        <span style="display:block;font-size:12px;font-weight:${x.on ? "600" : "500"};color:var(--s900)">${x.name}</span>
        <span style="display:block;font-size:10px;color:${x.blocked ? "#9A6208" : "var(--s400)"};margin-top:2px">${x.blocked ? "Needs a price curve in ReveNew" : x.meta}</span>
      </span>
      ${x.blocked ? `<span style="color:#9A6208;display:flex">${ic("alert", 13)}</span>` : ""}
    </span>`).join("")}
  <div class="hr" style="margin:6px 12px"></div>
  <div style="display:flex;align-items:center;gap:9px;padding:6px 12px 2px">
    <a href="#" style="flex:1;font-size:11.5px;font-weight:500">Manage in ReveNew${ic("upRight", 12, 1.9)}</a>
    <button class="btn btn-primary" style="height:30px;font-size:11.5px">Add selected</button>
  </div>
</section>` }),
  tile({ code: "T", name: "Scenario added", note: "One scenario in, three cases out — one against each technical simulation in the project. The confirmation names them, because that is the thing the user cannot see from the button they pressed.",
    body: `
<section class="raise" style="padding:15px 17px">
  <div style="display:flex;align-items:flex-start;gap:11px">
    <span style="width:22px;height:22px;flex:none;border-radius:7px;display:flex;align-items:center;justify-content:center;background:rgba(16,185,129,.14);color:#0E9469">${ic("check", 14, 2.1)}</span>
    <span style="flex:1;min-width:0">
      <span class="t-card" style="display:block;font-size:13.5px">Merchant upside added</span>
      <span class="t-meta" style="display:block;margin-top:4px;line-height:1.5">Evaluated against all three technical simulations — 3 new cases.</span>
    </span>
  </div>
</section>
<section class="panel" style="padding:14px 17px;margin-top:12px">
  <span class="band" style="font-size:10px">New cases</span>
  <div class="rows" style="margin-top:8px">
    ${TECH.map((t) => `
      <div style="display:flex;align-items:center;gap:9px;padding:9px 0">
        <i style="width:4px;height:4px;border-radius:50%;background:${SB};display:block"></i>
        <span style="font-size:12px;font-weight:600;color:var(--s900)">${t.short}</span>
        <span style="font-size:10.5px;color:var(--s400)">+</span>
        <i style="width:4px;height:4px;border-radius:50%;background:${RN};display:block"></i>
        <span style="font-size:12px;font-weight:600;color:var(--s900)">Merchant upside</span>
        <span style="flex:1"></span>
        <span class="t-meta">calculating…</span>
      </div>`).join("")}
  </div>
  <p class="t-meta" style="margin-top:11px;line-height:1.55">The case matrix becomes 3 × 4. Nothing was created in ReveNew, and no simulation was re-run.</p>
</section>` }),
  tile({ code: "U", name: "Scenario unavailable", note: "A scenario without a price curve cannot be priced against anything. It is shown rather than hidden — the user needs to know it exists — and the fix lives where the fix belongs.",
    body: `
<section class="panel" style="padding:18px 20px">
  <div style="display:flex;align-items:flex-start;gap:11px">
    <span style="color:#9A6208;display:flex;flex:none;margin-top:1px">${ic("alert", 17)}</span>
    <span style="flex:1;min-width:0">
      <span style="display:block;font-size:13px;font-weight:600;color:var(--s900)">Capture floor 2032 cannot be evaluated</span>
      <span class="t-meta" style="display:block;margin-top:6px;line-height:1.6">
        The scenario exists in ReveNew but has no price curve attached, so there is no revenue to pair with any technical case.
        The Suite does not guess one and does not offer a partial case.
      </span>
    </span>
  </div>
  <div class="wash" style="padding:12px 14px;margin-top:14px">
    <span style="display:flex;align-items:center;gap:9px">
      <span style="font-size:11.5px;color:var(--s500);flex:1">Needs a price curve</span>${src("revenew")}
    </span>
  </div>
  <a href="#" style="display:inline-flex;align-items:center;gap:6px;margin-top:13px;font-size:12px;font-weight:500">Configure in ReveNew${ic("upRight", 12, 1.9)}</a>
</section>` }),
])}

${tileRow([
  tile({ code: "V", name: "Editing the forecast", note: "Four fields and a curve, hosted in the Suite with ReveNew as provenance. Note the last field: the edit is saved as a NEW scenario, so nothing already built on High spread moves under anyone.",
    body: `
<section class="raise" style="padding:0;overflow:hidden">
  <span style="display:block;height:2px;background:linear-gradient(90deg,${RN}00,${RN}cc 18%,${RN}cc 82%,${RN}00)"></span>
  <div style="padding:14px 17px;border-bottom:1px solid var(--hair);display:flex;align-items:center;gap:11px">
    <span style="flex:1;min-width:0">
      <span class="t-card" style="display:block;font-size:13.5px">Edit forecast curve</span>
      <span style="display:flex;align-items:center;gap:8px;margin-top:4px"><span class="t-meta">Valencia BESS · High spread</span>${src("revenew")}</span>
    </span>
    <span class="btn btn-secondary" style="height:28px;font-size:11px;padding:0 9px">Open in ReveNew${ic("upRight", 12, 1.8)}</span>
  </div>
  <div style="padding:14px 17px">
    ${[["Based on", "High spread"], ["Market", "OMIE — Spain"], ["Resolution", "Hourly"], ["Annual escalation", "2.0 %/yr"], ["Save as", "High spread — +4% capture"]].map(([k, v]) => `
      <div style="display:flex;align-items:center;gap:10px;padding:7px 0">
        <span style="width:104px;flex:none;font-size:11px;color:var(--s500)">${k}</span>
        <span class="wash" style="flex:1;min-width:0;padding:6px 10px;font-size:11.5px;color:var(--s900)">${v}</span>
      </div>`).join("")}
    <span class="t-meta" style="display:block;margin-top:9px;line-height:1.5">8,760 points. Drag a monthly handle to reshape the capture-price curve.</span>
  </div>
</section>` }),
  tile({ code: "W", name: "Saving", note: "The write goes to ReveNew, which owns scenarios. The Suite holds the frame so the panel never empties or jumps, and says what the save does before it lands.",
    body: `
<section class="raise" style="padding:22px 20px;text-align:center">
  <span style="width:34px;height:34px;margin:0 auto;border-radius:10px;display:flex;align-items:center;justify-content:center;background:rgba(175,71,178,.11)">
    <span style="width:15px;height:15px;border-radius:50%;border:2.2px solid rgba(175,71,178,.22);border-top-color:${RN};display:block"></span>
  </span>
  <div class="t-card" style="font-size:13.5px;margin-top:12px">Creating the scenario in ReveNew…</div>
  <p class="t-meta" style="margin-top:7px;line-height:1.55">Writing “High spread — +4% capture”. High spread itself is not modified.</p>
</section>
<section class="panel" style="padding:13px 16px;margin-top:12px">
  <span class="t-meta" style="line-height:1.55;display:block">
    The technical simulation is never part of this save. StoreBrid results do not depend on the forecast, so nothing upstream is invalidated —
    and because this writes a new scenario rather than editing one, nothing downstream is either.
  </span>
</section>` }),
  tile({ code: "X", name: "New scenario — and the stale case", note: "The variant lands as three new cases. The amber block is the other path: when someone edits High spread itself in ReveNew, the Suite marks the cases that read it rather than showing stale figures as current.",
    body: `
<section class="raise" style="padding:14px 16px">
  <div style="display:flex;align-items:flex-start;gap:11px">
    <span style="width:22px;height:22px;flex:none;border-radius:7px;display:flex;align-items:center;justify-content:center;background:rgba(16,185,129,.14);color:#0E9469">${ic("check", 14, 2.1)}</span>
    <span style="flex:1;min-width:0">
      <span class="t-card" style="display:block;font-size:13.5px">High spread — +4% capture created</span>
      <span class="t-meta" style="display:block;margin-top:4px">Capture €138.0 → €143.5/MWh · 3 new cases, one per simulation</span>
    </span>
  </div>
</section>
<section class="panel" style="padding:14px 16px;margin-top:12px;
     background:linear-gradient(168deg,rgba(245,158,11,.06),rgba(255,255,255,0) 70%);box-shadow:inset 0 0 0 1px rgba(245,158,11,.16)">
  <div style="display:flex;align-items:flex-start;gap:11px">
    <span style="color:#9A6208;display:flex;flex:none;margin-top:1px">${ic("alert", 16)}</span>
    <span style="flex:1;min-width:0">
      <span style="display:block;font-size:12.5px;font-weight:600;color:var(--s900)">If High spread itself is edited in ReveNew</span>
      <span class="t-meta" style="display:block;margin-top:5px;line-height:1.55">
        The three cases that read it are marked stale. Their technical results are unaffected and are not re-run — the dependency only points one way.
      </span>
    </span>
  </div>
  <button class="btn btn-secondary" style="height:31px;font-size:12px;margin-top:12px;width:100%">Recalculate 3 cases</button>
</section>
<p class="t-meta" style="margin-top:11px;line-height:1.55">Until they are recalculated, those cases show their last calculated figures with the date they were produced — never a blend of old and new.</p>` }),
])}`,
});

/* §25 Y–AC · files */
const fileTile = ({ name, sub, state, bar, action, tone }) => `
<section class="panel" style="padding:15px 17px">
  <div style="display:flex;align-items:center;gap:11px">
    <span style="width:30px;height:30px;flex:none;border-radius:9px;display:flex;align-items:center;justify-content:center;
          background:linear-gradient(168deg,rgba(255,255,255,.7),rgba(255,255,255,.46));box-shadow:0 0 0 1px rgba(14,157,168,.12);color:var(--su700)">${ic("file", 14)}</span>
    <span style="flex:1;min-width:0">
      <span style="display:block;font-family:ui-monospace,Menlo,monospace;font-size:12px;font-weight:500;color:var(--s900);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${name}</span>
      <span class="t-meta" style="display:block;margin-top:3px">${sub}</span>
    </span>
    ${state}
  </div>
  ${bar ? `<div style="height:5px;border-radius:3px;margin-top:13px;overflow:hidden;background:rgba(30,58,138,.07)">
    <span style="display:block;width:${bar}%;height:100%;border-radius:3px;background:linear-gradient(90deg,${tone === "sb" ? "#5B8DEF,#2563EB" : "#3ED0DA,#0E9DA8"})"></span></div>` : ""}
  ${action ? `<div style="margin-top:13px">${action}</div>` : ""}
</section>`;

const statesFiles = sheet({
  w: 1440, h: 1240,
  body: `
${sheetHead("Interaction states · Y–AC", "Files",
  "The shared library both products read from — not a document manager. A file has one required piece of metadata, its type, because that is what tells the Suite which product can read it. Everything else is recorded, not enforced.")}

${tileRow([
  tile({ code: "Y", name: "Upload", note: "A focused Suite drawer. Type is required and drives everything downstream; “related to” is optional and can be attached later, or never.",
    body: `
<section class="raise" style="padding:15px 17px">
  <div style="display:flex;align-items:center;gap:10px">
    <span class="t-card" style="font-size:13.5px;flex:1">Upload file</span>${src("suite")}
  </div>
  <div style="border-radius:var(--r-sm);padding:22px 16px;margin-top:13px;text-align:center;
       background:linear-gradient(168deg,rgba(14,157,168,.05),rgba(255,255,255,0) 74%);box-shadow:inset 0 0 0 1px rgba(14,157,168,.18)">
    <span style="color:var(--su700);display:flex;justify-content:center">${ic("arrowDown", 20)}</span>
    <span style="display:block;font-size:12.5px;font-weight:600;color:var(--s900);margin-top:8px">Drop a file, or browse</span>
    <span class="t-meta" style="display:block;margin-top:4px">CSV, XLSX or PDF · up to 200 MB</span>
  </div>
  ${[["File type", "Prices", true], ["Related to", "Base market", false]].map(([k, v, req]) => `
    <div style="margin-top:11px">
      <span style="display:block;font-size:11px;font-weight:600;color:var(--s700);margin-bottom:5px">${k}${req ? `<span style="color:var(--rv600);margin-left:3px">*</span>` : ""}</span>
      <span class="wash" style="display:flex;align-items:center;padding:7px 11px;font-size:11.5px;color:var(--s900)">${v}<span style="margin-left:auto;color:var(--s400);display:flex">${ic("down", 13, 1.8)}</span></span>
    </div>`).join("")}
  <p class="t-meta" style="margin-top:11px;line-height:1.5">The type is what tells the Suite which product should read the file.</p>
</section>` }),
  tile({ code: "Z", name: "Uploading", note: "Transfer only. The row appears immediately in the table so the file is never invisible while it moves.",
    body: fileTile({ name: "prices_2028_final.csv", sub: "Prices · 3.9 MB · 62%", state: FSTATE.uploading, bar: 62 }) +
      `<p class="t-meta" style="margin-top:12px;line-height:1.55">Cancelling here removes the row entirely. Nothing downstream has seen the file yet.</p>` }),
  tile({ code: "AA", name: "Processing", note: "Columns, time-step and coverage are checked before any product is allowed to read it. Two distinct states, because they fail for different reasons and take different times.",
    body: fileTile({ name: "prices_2028_final.csv", sub: "Checking columns and time-step", state: FSTATE.processing, bar: 100, tone: "sb" }) +
      `<p class="t-meta" style="margin-top:12px;line-height:1.55">A file in this state can be seen but not selected in a simulation or a scenario.</p>` }),
])}

${tileRow([
  tile({ code: "AB", name: "Ready", note: "The steady state. “Used by” records which product reads it; “related to” records which simulation or scenario. Replacing keeps both, along with everything already pointing at the file.",
    body: fileTile({ name: "prices_2028_final.csv", sub: "Related to Base market · High spread", state: FSTATE.ready,
      action: `<div style="display:flex;align-items:center;gap:10px">
        ${usedByTag("rv")}<span class="t-meta">3.9 MB · just now</span>
        <span style="flex:1"></span><a href="#" style="font-size:11.5px;font-weight:500">Replace</a></div>` }) +
      `<p class="t-meta" style="margin-top:12px;line-height:1.55">Replacing a file marks every case that reads it for recalculation — the same dependency rule as a forecast change.</p>` }),
  tile({ code: "AC", name: "Error", note: "The row stays. It names the row and column that failed, because “invalid file” is not something anyone can act on, and offers the replace that fixes it.",
    body: fileTile({ name: "prices_2028_draft.csv", sub: "Missing timestamp column · row 1", state: FSTATE.error,
      action: `<div style="display:flex;align-items:center;gap:10px">
        <span class="t-meta">Nothing downstream was changed</span>
        <span style="flex:1"></span><a href="#" style="font-size:11.5px;font-weight:500">Replace file</a></div>` }) +
      `<p class="t-meta" style="margin-top:12px;line-height:1.55">A failed file never silently substitutes an older version — simulations and scenarios that referenced the previous file keep referencing it.</p>` }),
  tile({ code: "", name: "What the Suite does not do", note: "",
    body: `
<section class="panel" style="padding:18px 20px">
  <span class="band" style="font-size:10px">Out of scope, deliberately</span>
  <div class="rows" style="margin-top:10px">
    ${["Folders, tags and permissions per file",
       "Version history beyond the current file and who replaced it",
       "In-browser editing or preview of the data",
       "Anything StoreBrid or ReveNew already stores in its own project"].map((x) => `
      <div style="display:flex;align-items:flex-start;gap:9px;padding:9px 0">
        <span style="width:14px;flex:none;color:var(--s400);display:flex;justify-content:center;margin-top:2px">
          <svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 5l10 10M15 5L5 15"/></svg>
        </span>
        <span style="font-size:11.5px;color:var(--s500);line-height:1.5">${x}</span>
      </div>`).join("")}
  </div>
  <p class="t-meta" style="margin-top:12px;line-height:1.55;padding-top:12px;border-top:1px solid var(--hair)">
    The test each time: does it help someone make a cross-product decision faster? A document manager does not.
  </p>
</section>` }),
])}`,
});

/* §31 · the seven journeys the whole thing has to support */
const flowStep = ({ n, label, where, dot, last }) => `
<span style="display:flex;align-items:center;gap:10px;flex:none">
  <span style="display:flex;flex-direction:column;align-items:flex-start;gap:5px;min-width:0">
    <span class="wash" style="display:flex;align-items:center;gap:7px;padding:8px 12px;white-space:nowrap">
      ${dot ? `<i style="width:5px;height:5px;flex:none;border-radius:50%;background:${dot};display:block"></i>` : ""}
      <span style="font-size:12px;font-weight:600;color:var(--s900)">${label}</span>
    </span>
    <span class="t-meta" style="padding-left:2px">${where}</span>
  </span>
  ${last ? "" : `<span style="color:var(--s400);display:flex;flex:none">${ic("right", 14, 2)}</span>`}
</span>`;

const flow = ({ n, title, question, steps, note }) => `
<section class="panel" style="padding:20px 24px;margin-top:18px">
  <div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap">
    <span style="font-size:11px;font-weight:700;color:var(--su700);letter-spacing:.04em">FLOW ${n}</span>
    <span class="t-card" style="font-size:15px">${title}</span>
    <span class="t-meta" style="font-style:italic">“${question}”</span>
  </div>
  <div style="display:flex;align-items:flex-start;gap:10px;margin-top:16px;flex-wrap:wrap">
    ${steps.map((s2, i) => flowStep({ ...s2, last: i === steps.length - 1 })).join("")}
  </div>
  ${note ? `<p class="t-meta" style="margin-top:14px;line-height:1.6;max-width:120ch">${note}</p>` : ""}
</section>`;

const flows = sheet({
  w: 1440, h: 1900,
  body: `
${sheetHead("End-to-end", "The seven journeys",
  "Every screen in this canvas exists to serve one of these. Blue steps happen in a StoreBrid-owned surface, magenta in a ReveNew-owned one, teal in the Suite. The shape of the product is visible in the colour of the chain: the Suite is where the two meet, and the deep work stays where it belongs.")}

${flow({ n: 1, title: "Review the project", question: "What is happening with this project right now?",
  steps: [{ label: "Project", where: "Suite", dot: SU }, { label: "Overview", where: "Suite", dot: SU },
          { label: "Current pairing", where: "technical × financial", dot: CMB }, { label: "Key outcome", where: "combined", dot: CMB }],
  note: "One screen, four seconds. The analysis case strip names both sides and the figure they produce together; everything below it is context for that one line." })}

${flow({ n: 2, title: "Technical analysis", question: "How did this configuration actually behave?",
  steps: [{ label: "Simulations", where: "StoreBrid", dot: SB }, { label: "Simulation overview", where: "Suite reading", dot: SU },
          { label: "Technical results", where: "3 core views", dot: SB }, { label: "Full results", where: "StoreBrid ↗", dot: SB }],
  note: "The Suite carries three charts and six KPIs. Daily graphs, heat maps, tables and exports are one link away and stay there — reproducing them would make the Suite a worse StoreBrid." })}

${flow({ n: 3, title: "Financial analysis", question: "How does it perform under different market assumptions?",
  steps: [{ label: "Simulation", where: "one technical case", dot: SB }, { label: "Financial scenarios", where: "Suite", dot: SU },
          { label: "Select from ReveNew", where: "existing scenarios", dot: RN }, { label: "Case", where: "the pairing", dot: CMB }],
  note: "Adding a scenario evaluates it against the selected technical case. It creates cases in the Suite and nothing in ReveNew — a genuinely new scenario, with its own curves, is authored there and appears in the list afterwards." })}

${flow({ n: 4, title: "Quick technical iteration", question: "What if it were a 4 h battery?",
  steps: [{ label: "Create variant", where: "5 values", dot: SU }, { label: "Run", where: "StoreBrid", dot: SB },
          { label: "Processing", where: "no financial figures yet", dot: SB }, { label: "Completed", where: "3 cases", dot: CMB },
          { label: "New matrix row", where: "Suite", dot: SU }],
  note: "The one place the Suite writes to StoreBrid, and it writes a sibling — Base case 2027 is never modified, so the six cases already built on it stay valid and comparable against the three new ones." })}

${flow({ n: 5, title: "Quick financial iteration", question: "What if capture prices were 4% higher?",
  steps: [{ label: "Case", where: "Suite", dot: SU }, { label: "Edit forecast", where: "ReveNew, hosted", dot: RN },
          { label: "Save", where: "ReveNew owns it", dot: RN }, { label: "Cases marked stale", where: "Suite", dot: SU },
          { label: "Recalculate", where: "new outcome", dot: CMB }],
  note: "The financial mirror of flow 4. Technical results are not affected and are not re-run — the dependency only points one way, and the interface says so rather than re-running everything to be safe." })}

${flow({ n: 6, title: "Cross-product decision", question: "Is the extra investment justified?",
  steps: [{ label: "Case matrix", where: "9 cases", dot: SU }, { label: "Select metric", where: "6 available", dot: CMB },
          { label: "Open cells", where: "preview in place", dot: SU }, { label: "Compare", where: "2–4 cases", dot: SU },
          { label: "Baseline", where: "declared", dot: SU }, { label: "Decide", where: "or go deeper ↗", dot: CMB }],
  note: "The reason the Suite exists. Neither product can draw this chain alone: StoreBrid knows what the asset does but not what it earns, ReveNew knows what it earns but not what it cost to build. The trade-off only exists where they meet." })}

${flow({ n: 7, title: "Name a pairing", question: "This combination is worth keeping — how do I keep it?",
  steps: [{ label: "Case matrix", where: "an unsaved cell", dot: SU }, { label: "Pick the asset", where: "StoreBrid catalogue", dot: SB },
          { label: "Pick the market", where: "ReveNew catalogue", dot: RN }, { label: "Name it", where: "Suite", dot: SU },
          { label: "Analysis case", where: "in the matrix, in Compare", dot: CMB }],
  note: "The only thing the Suite creates, and the shortest flow here on purpose. Both catalogues are open at once and every option shows what it would produce against the half already chosen, so choosing is the whole interaction — the name is the one field, because the name is the one thing neither product already holds. Nothing is written to StoreBrid or ReveNew; a case is a reference to both, and it re-reads them every time it is opened." })}

<div style="display:flex;align-items:center;gap:16px;padding:20px 24px;margin-top:26px;border-radius:var(--r-sm);
     background:linear-gradient(122deg,rgba(37,99,235,.08),rgba(175,71,178,.07));box-shadow:inset 0 0 0 1px rgba(37,99,235,.1)">
  <span style="flex:1;min-width:0">
    <span class="band" style="display:block">The boundary, restated</span>
    <span style="display:block;font-size:13.5px;color:var(--s700);line-height:1.65;margin-top:8px;max-width:118ch">
      StoreBrid remains the source of truth for technical simulation and engineering configuration. ReveNew remains the source of truth for revenue modelling and forecast configuration.
      The Suite owns nothing except the pairing of the two, the baseline, and the questions that need both sides to answer.
      Every time a screen here was tempted to become a more convenient version of an existing product page, it links out instead.
    </span>
  </span>
</div>`,
});
writeFileSync("Flows.dc.html", flows);
console.log("Interaction states · 5 sheets + flows");




/* ── FINANCIALS — the decision-relevant output of a ReveNew case,
      not a copy of ReveNew's module structure (§10–§13) ─────────── */
const COMPOSITION = [
  ["Forecast", "Baseline Iberia 2027", "Average €71.4/MWh · volatility €41.4/MWh"],
  ["Energy", "Production curve 03", "65.2 GWh discharged · 326 full cycles"],
  ["Revenue", "Merchant + PPA", "Capture €118.4/MWh · 92% capture rate"],
  ["DevEx", "Actual", "€1.4M"],
  ["CapEx", "Base estimate", "€42.1M"],
  ["OpEx", "Base estimate", "€1.7M/yr"],
  ["Financial model", "FM scenario 02", `${(WACC * 100).toFixed(1)}% cost of capital · ${HORIZON}-year horizon`],
];

const finCaseChip = (sid, current) => {
  const c = caseOf("base2h", sid);
  return `
<a href="#" class="${current ? "glass-sm" : "wash"}" style="flex:1;min-width:0;padding:14px 16px;text-decoration:none;
   ${current ? "box-shadow:0 0 0 1px rgba(175,71,178,.3), var(--sh-sm), inset 0 1px 0 rgba(255,255,255,.92)" : ""}">
  <span style="display:flex;align-items:center;gap:8px">
    <i style="width:5px;height:5px;flex:none;border-radius:50%;background:${RN};display:block"></i>
    <span style="font-size:13px;font-weight:600;color:var(--s900)">${c.sc.name}</span>
    ${current ? `<span class="cov" style="margin-left:auto"><i style="background:${SU}"></i>Selected</span>` : ""}
  </span>
  <span style="display:flex;align-items:baseline;gap:14px;margin-top:10px">
    <span style="font-size:15px;font-weight:700;color:${npvOfCase(c) < 0 ? "#C22222" : "var(--s900)"};font-variant-numeric:tabular-nums">${eurMs(npvOfCase(c))}</span>
    <span class="t-meta">${c.irr.toFixed(1)}% IRR · ${eurM(c.rev)}/yr</span>
  </span>
</a>`;
};

/* the drawer §13 asks for: everything ReveNew built the number from,
   read-only, one level down */
const finDrawer = () => {
  const c = caseOf("base2h", "base");
  const grp = (label, rows) => `
  <div style="padding:16px 0;border-top:1px solid var(--hair)">
    <div class="band" style="font-size:10px">${label}</div>
    <div style="margin-top:10px">
      ${rows.map(([k, v]) => `
        <div style="display:flex;align-items:baseline;justify-content:space-between;gap:14px;padding:7px 0">
          <span style="font-size:12.5px;color:var(--s500)">${k}</span>
          <b style="font-size:13.5px;font-weight:600;color:var(--s900);font-variant-numeric:tabular-nums">${v}</b>
        </div>`).join("")}
    </div>
  </div>`;
  /* Five groups. Stacked in a 520px drawer that was a very long
     scroll; as a grid it is one screen, and the order still reads
     the way the model runs — price, energy, revenue, cost, result. */
  return capabilityModal({
    title: "Financial details", context: "Base market · Valencia BESS",
    source: src("revenew"), accent: RN, width: 980,
    footNote: "Read-only. Every value is modelled in ReveNew.",
    foot: `<button class="btn btn-secondary"><i style="width:6px;height:6px;border-radius:50%;background:${RN};display:block"></i>Open in ReveNew${ic("upRight", 14, 1.8)}</button>`,
    body: `
    <div style="padding:20px 22px">
      <div style="display:flex;gap:14px;align-items:stretch">
        ${detailGroup("Forecast", [["Average price", "€71.4/MWh"], ["Volatility", "€41.4/MWh"], ["Market", "OMIE — Spain"]])}
        ${detailGroup("Energy", [["Annual production", c.t.gwh + " GWh"], ["Full cycles", String(c.t.cycles)], ["Round-trip efficiency", c.t.rte + "%"]])}
        ${detailGroup("Revenue", [["Annual revenue", eurM(c.rev)], ["Capture price", "€" + c.sc.capture.toFixed(1) + "/MWh"], ["Capture rate", "166%"], ["Contracted share", "62%"]])}
      </div>
      <div style="display:flex;gap:14px;align-items:stretch;margin-top:14px">
        ${detailGroup("Costs", [["DevEx", "€1.4M"], ["CapEx", "€" + c.t.capex.toFixed(1) + "M"], ["OpEx", "€1.7M/yr"], ["ReCapEx", "not modelled"]])}
        ${detailGroup("Financial model", [["NPV", eurMs(npvOfCase(c))], ["IRR", c.irr.toFixed(1) + "%"], ["Payback", paybackOfCase(c).toFixed(1) + " years"], ["Cost of capital", (WACC * 100).toFixed(1) + "%"]])}
        <div style="flex:1;min-width:0"></div>
      </div>
    </div>`,
  });
};

/* one simplified cash-flow view, not ReveNew's chart with its controls */
function projCash(c, w = 520) {
  const net = netFlow(c), cap = c.t.capex, cod = 2027;
  const rows = [{ y: cod - 2, v: -cap * 0.30 }, { y: cod - 1, v: -cap * 0.70 }];
  for (let i = 0; i < HORIZON; i++) rows.push({ y: cod + i, v: net });
  let cum = 0; const f = rows.map((r) => ({ ...r, cum: (cum += r.v) }));
  const H = 250, L = 56, R = 14, TT = 18, B = 34;
  const pw = w - L - R, ph = H - TT - B;
  const vals = f.map((r) => r.cum), lo = Math.min(0, ...vals), hi = Math.max(0, ...vals);
  const Y = (v) => TT + ph - ((v - lo) / (hi - lo)) * ph;
  const band = pw / f.length;
  const ticks = niceTicks(lo, hi, 4);
  const grid = ticks.map((g) =>
    `<line x1="${L}" y1="${Y(g).toFixed(1)}" x2="${w - R}" y2="${Y(g).toFixed(1)}" stroke="${g === 0 ? "rgba(30,58,138,.18)" : GRID}" stroke-width="1"/>
     <text x="${L - 8}" y="${(Y(g) + 3.4).toFixed(1)}" text-anchor="end" font-size="9.5" fill="${AXIS}">${eurMs(g)}</text>`).join("");
  const pts = f.map((r, i) => `${(L + i * band + band / 2).toFixed(1)},${Y(r.cum).toFixed(1)}`).join(" ");
  const cross = f.findIndex((r) => r.cum >= 0);
  const cx = cross > 0 ? L + cross * band + band / 2 : null;
  const xlabs = f.map((r, i) => (i % 4 === 0 || i === f.length - 1)
    ? `<text x="${(L + i * band + band / 2).toFixed(1)}" y="${TT + ph + 15}" text-anchor="middle" font-size="9.5" fill="${AXIS}">${r.y}</text>` : "").join("");
  return `<svg viewBox="0 0 ${w} ${H}" width="100%" style="display:block" role="img" aria-label="Cumulative cash flow">
    ${MKSTYLE}${grid}
    <polyline points="${pts}" fill="none" stroke="${RN}" stroke-width="2.2" stroke-linejoin="round"/>
    ${f.map((r, i) => `<circle class="mk" cx="${(L + i * band + band / 2).toFixed(1)}" cy="${Y(r.cum).toFixed(1)}" r="2.8" fill="#fff" stroke="${RN}" stroke-width="1.6"><title>${r.y} — ${eurMs(r.cum)}</title></circle>`).join("")}
    ${cx ? `<line x1="${cx.toFixed(1)}" y1="${TT}" x2="${cx.toFixed(1)}" y2="${TT + ph}" stroke="${SU}" stroke-width="1.4" stroke-dasharray="3 3"/>
      <text x="${(cx + 7).toFixed(1)}" y="${TT + 12}" font-size="10" font-weight="600" fill="${INK}">Payback ${f[cross].y}</text>` : ""}
    ${xlabs}</svg>`;
}


const financialsBody = () => {
  const a = AC("base"), m = acMetrics(a), c = m.c;
  return `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Projects</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Valencia BESS</a><span class="sep">${ic("right", 12, 2)}</span><b>Financials</b>`,
  eyebrow: `<span style="display:inline-flex;align-items:center;gap:9px">Financials ${src("revenew")}</span>`,
  title: "Financials",
  meta: "The financial result of this project, and what it was built from.",
  actions: `<button class="btn btn-secondary">${ic("plus", 16, 1.9)}Use in analysis case</button>
            <button class="btn btn-secondary"><i style="width:6px;height:6px;border-radius:50%;background:${RN};display:block"></i>Open in ReveNew${ic("upRight", 14, 1.8)}</button>`,
})}

<div style="display:flex;align-items:center;gap:14px;margin-bottom:18px;flex-wrap:wrap">
  <span class="t-lab" style="font-weight:600;color:var(--s700)">Financial case</span>
  <span style="flex:1;min-width:0;display:flex;gap:12px">
    ${finCaseChip("base", true)}${finCaseChip("high")}${finCaseChip("low")}
  </span>
</div>

<div class="kpirow">
  ${kpi({ label: "NPV", value: eurMs(m.npv), source: src("revenew"), formula: `at ${(WACC * 100).toFixed(1)}% cost of capital` })}
  ${kpi({ label: "IRR", value: m.irr.toFixed(1) + "%", source: src("combined"), combined: true, formula: "ReveNew cash flows · StoreBrid CAPEX" })}
  ${kpi({ label: "Payback", value: m.pb.toFixed(1) + " yrs", source: src("revenew"), formula: "undiscounted, from COD 2027" })}
  ${kpi({ label: "CAPEX", value: "€" + m.capex.toFixed(1) + "M", source: src("storebrid"), formula: `${c.t.mwh} MWh installed` })}
  ${kpi({ label: "Revenue", value: eurM(m.rev) + "/yr", source: src("revenew"), delta: "+3.1%" })}
</div>
<div style="display:flex;align-items:center;gap:14px;margin-top:16px;flex-wrap:wrap">
  <span class="t-meta" style="flex:1;min-width:0;line-height:1.55;max-width:96ch">
    Priced against <b style="font-weight:600;color:var(--s700)">${c.t.name}</b> — ${c.t.mw} MW / ${c.t.mwh} MWh.
    A different simulation gives a different CAPEX and a different NPV.
  </span>
  <button class="btn btn-secondary" style="height:34px;font-size:12.5px">${ic("file", 15)}View financial details</button>
</div>

<div style="display:flex;gap:22px;margin-top:28px;align-items:stretch">
  <section class="panel" style="flex:1.1;min-width:0;padding:24px 26px">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:14px">
      <div style="display:flex;align-items:center;gap:9px"><span class="band" style="color:var(--rv600)">Case composition</span>${src("revenew")}</div>
      <a href="#" style="font-size:12.5px;font-weight:500;display:inline-flex;align-items:center;gap:5px">Edit in ReveNew${ic("upRight", 13, 1.9)}</a>
    </div>
    <h2 class="t-sec" style="margin-top:8px">What Base market is made of</h2>
    <p class="t-meta" style="margin-top:6px;font-size:12px;line-height:1.55;max-width:72ch">
      The ReveNew scenarios this case selects, so the result can be traced without opening the model. Read-only here.
    </p>
    <div class="rows" style="margin-top:14px">
      ${COMPOSITION.map(([mod, pick, note]) => `
        <div style="display:flex;align-items:flex-start;gap:16px;padding:12px 0">
          <span style="width:120px;flex:none;font-size:12.5px;color:var(--s500)">${mod}</span>
          <span style="flex:1;min-width:0">
            <span style="display:block;font-size:13.5px;font-weight:600;color:var(--s900)">${pick}</span>
            <span class="t-meta" style="display:block;margin-top:3px">${note}</span>
          </span>
        </div>`).join("")}
    </div>
  </section>

  <section class="panel" style="flex:1;min-width:0;padding:24px 26px">
    <div style="display:flex;align-items:center;gap:9px"><span class="band" style="color:var(--rv600)">Cumulative cash flow</span>${src("revenew")}</div>
    <h2 class="t-sec" style="margin-top:8px">When it pays itself back</h2>
    <p class="t-meta" style="margin-top:6px;font-size:12px;line-height:1.55">
      €${m.capex.toFixed(1)}M over two build years, then ${eurM(netFlow(c))} a year net. Crosses zero after ${m.pb.toFixed(1)} years.
    </p>
    <div style="margin-top:14px">${projCash(c, 520)}</div>
  </section>
</div>`;
};

writeFileSync("FinancialDetails.dc.html",
  doc({ w: 1440, h: 1160, side: projectSide("financial"), rvFocus: true, body: financialsBody(), overlay: finDrawer() }));


/* ── COMPARE · ALTERNATIVES (§17–§20) ───────────────────────────
   Two to three Analysis Cases, technical beside financial, with the
   deltas that answer the actual question: what does changing the
   design buy, and what does it cost. */
const acChip = (a, sel) => {
  const c = acCase(a), stale = isStale(a.tid, a.sid);
  return `
<span class="${sel ? "glass-sm" : "wash"}" style="display:inline-flex;align-items:center;gap:11px;padding:10px 14px;
      ${sel ? "box-shadow:0 0 0 1px rgba(14,157,168,.3), var(--sh-sm), inset 0 1px 0 rgba(255,255,255,.92)" : ""}">
  <span style="font-size:12.5px;font-weight:600;color:var(--s900)">${a.name}</span>
  ${a.current ? `<span class="cov"><i style="background:${SU}"></i>Current</span>` : ""}
  ${stale ? staleTag() : ""}
  ${(() => {
    /* §6 · One contextual state per case, not a row of badges: either it
       clears everything, or the first limit it misses and by how much. */
    if (!CRITERIA.length || stale) return "";
    const f = failsOf(c);
    if (!f.length) return `<span class="cov" style="border-color:rgba(14,157,168,.3);background:linear-gradient(168deg,rgba(14,157,168,.1),rgba(14,157,168,.05));color:var(--su700)"><i style="background:${SU}"></i>Meets criteria</span>`;
    const x = f[0];
    return staleTag(`${x.k.label} ${x.k.fmt(Math.abs(x.by)).replace("−", "")} ${x.k.op === "≤" ? "above limit" : "below target"}`);
  })()}
  <span style="display:inline-flex;align-items:center;gap:5px">
    <i style="width:4px;height:4px;border-radius:50%;background:${SB};display:block"></i>
    <span class="t-meta">${c.t.short}</span>
    <span style="font-size:10px;color:var(--s400)">+</span>
    <i style="width:4px;height:4px;border-radius:50%;background:${RN};display:block"></i>
    <span class="t-meta">${c.sc.name}</span>
  </span>
  ${sel ? `<span style="color:var(--s400);display:flex">${closeX(13)}</span>` : ""}
</span>`;
};

/* §19 · deterministic, never a recommendation */
const decisionTiles = () => {
  const all = ACASES.map((a) => ({ a, ...acMetrics(a), stale: isStale(a.tid, a.sid) }));
  const fresh = all.filter((x) => !x.stale);
  const excluded = all.length - fresh.length;
  const pick = (label, f, fmt, better) => {
    const w = fresh.reduce((x, y) => (better(f(y), f(x)) ? y : x));
    const beaten = all.find((x) => x.stale && better(f(x), f(w)));
    return `
    <div class="wash" style="flex:1;min-width:0;padding:14px 16px">
      <span class="band" style="font-size:10px">${label}</span>
      <span style="display:block;font-size:18px;font-weight:700;letter-spacing:-.022em;color:var(--s900);margin-top:7px;font-variant-numeric:tabular-nums">${fmt(f(w))}</span>
      <span class="t-meta" style="display:block;margin-top:7px">${w.a.name}</span>
      ${beaten ? `<span class="t-meta" style="display:block;margin-top:6px;color:${WARN.ink};line-height:1.45">${beaten.a.name} scores higher but is outdated</span>` : ""}
      ${(() => {
        /* §7 · With constraints on, the honest headline is the leader among
           the cases the user would accept — and the outright leader beside
           it when they differ, because that gap is what the limit costs. */
        if (!CRITERIA.length) return "";
        const ok = fresh.filter((z) => eligible(z.c));
        if (!ok.length) return `<span class="t-meta" style="display:block;margin-top:6px;color:${WARN.ink};line-height:1.45">No case in this comparison meets the criteria</span>`;
        const wIn = ok.reduce((x, y) => (better(f(y), f(x)) ? y : x));
        if (wIn.a.id === w.a.id) return `<span class="t-meta" style="display:block;margin-top:6px;color:var(--su700);line-height:1.45">Also the leader within your criteria</span>`;
        const x0 = failsOf(w.c)[0];
        return `<span style="display:block;margin-top:8px;padding-top:8px;border-top:1px solid var(--hair)">
          <span class="t-meta" style="display:block;color:${WARN.ink};line-height:1.45">${w.a.name} is outside your criteria — ${x0.k.label} ${x0.k.fmt(Math.abs(x0.by)).replace("−", "")} ${x0.k.op === "≤" ? "above limit" : "below target"}</span>
          <span class="t-meta" style="display:block;margin-top:5px;line-height:1.45">Within criteria: <b style="font-weight:600;color:var(--s900)">${fmt(f(wIn))}</b> · ${wIn.a.name}</span>
        </span>`;
      })()}
    </div>`;
  };
  return `
<div style="display:flex;gap:14px">
  ${pick("Best NPV", (m) => m.npv, (v) => eurMs(v), (x, y) => x > y)}
  ${pick("Best IRR", (m) => m.irr, (v) => v.toFixed(1) + "%", (x, y) => x > y)}
  ${pick("Lowest CAPEX", (m) => m.capex, (v) => "€" + v.toFixed(1) + "M", (x, y) => x < y)}
  ${pick("Shortest payback", (m) => m.pb, (v) => v.toFixed(1) + " yrs", (x, y) => x < y)}
</div>
${excluded ? `<div style="margin-top:12px">${staleNotice({
  body: `${excluded} analysis case ${excluded === 1 ? "is" : "are"} excluded from these conclusions — ${excluded === 1 ? "its" : "their"} financial result was calculated before the technical simulation changed.`,
  cta: "Recalculate in ReveNew", gap: "0" })}</div>` : ""}`;
};

const cmpRowAlt = (label, get, src2, best) => {
  const vals = ACASES.map((a) => get(acMetrics(a)));
  const bi = best ? (best === "hi" ? vals.indexOf(Math.max(...vals.map(Number))) : vals.indexOf(Math.min(...vals.map(Number)))) : -1;
  return `
<div style="display:flex;align-items:center;gap:16px;padding:12px 0;border-top:1px solid var(--hair)">
  <span style="width:230px;flex:none;display:flex;align-items:center;gap:8px">
    <span style="font-size:12.5px;color:var(--s500)">${label}</span>${src2}
  </span>
  ${ACASES.map((a, i) => {
    const m = acMetrics(a), v = get(m);
    return `<span style="flex:1;min-width:0;text-align:right;font-variant-numeric:tabular-nums;
      font-size:${i === bi ? "15" : "14"}px;font-weight:${i === bi ? "700" : "500"};color:${i === bi ? "var(--s900)" : "var(--s700)"}">${
      typeof v === "number" ? v : v}</span>`;
  }).join("")}
</div>`;
};

/* §20 · one technical change, its financial consequence */
const impactBlock = (fromId, toId) => {
  const A = acMetrics(AC(fromId)), B = acMetrics(AC(toId));
  const k = diffKind(A.c, B.c);
  /* §10 · "What did I have to change and what did I get in return?" — the
     shortest form of the trade-off, in the header, before the evidence.
     The sentence underneath is selected from the figures, never written:
     it reads the sign of the NPV move against the size of the IRR move,
     so it cannot claim more than the numbers support. */
  const dCap = B.capex - A.capex, dNpv = B.npv - A.npv, dIrr = B.irr - A.irr;
  const capital = Math.abs(dCap) >= 0.05;
  const tradeOff = !capital
    ? `No additional capital is committed. The whole difference is what this market view is worth on the asset already built — ${dNpv >= 0 ? "value gained" : "value lost"} without rebuilding anything.`
    : dNpv <= 0
      ? `The extra €${Math.abs(dCap).toFixed(1)}M does not pay for itself at this market view: NPV falls by ${eurMs(Math.abs(dNpv))}. The additional capacity earns less than the capital it consumes.`
      : dIrr >= 0.5
        ? `The extra €${Math.abs(dCap).toFixed(1)}M both adds ${eurMs(dNpv)} of value and earns a better return than the money already committed — return on capital rises ${dIrr.toFixed(1)} pp.`
        : dIrr > 0
          ? `The extra €${Math.abs(dCap).toFixed(1)}M adds ${eurMs(dNpv)} of absolute value but improves return on capital by only ${dIrr.toFixed(1)} pp. Higher storage increases what the project is worth without materially changing how hard the money works — whether that trade is worth making is the decision.`
          : `The extra €${Math.abs(dCap).toFixed(1)}M adds ${eurMs(dNpv)} of absolute value while diluting return on capital by ${Math.abs(dIrr).toFixed(1)} pp. The project becomes larger, not more efficient.`;
  return `
<section class="panel" style="padding:24px 26px">
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:14px">
    <span class="t-card" style="font-size:16px">${AC(toId).name}</span>
    <span class="t-meta">vs ${AC(fromId).name}</span>
    <span class="cov"><i style="background:${k.dot}"></i>${k.label}</span>
  </div>
  ${(() => {
    /* §1, §51 · The hero of Compare, drawn rather than written: the chain
       from a technical decision to a financial consequence, in the order it
       actually happens. Storage bought -> capital committed -> energy that
       buys -> revenue it earns -> value it creates -> rate that value
       returns.

       The geometry is a PAIR OF BARS per stage, each pair on its own
       zero-based scale, so the gap between the two bar tops IS the change
       and the height of the bars is the size of the quantity it happened
       to. That is what a row of cards could not do: +€8.6M on €42.1M of
       CAPEX and +€3.0M on €8.3M of NPV are the same shape as text and very
       different shapes as bars.

       Each stage keeps its own unit and its own scale — deliberately. The
       quantities do not conserve, so one shared axis, or a Sankey, would
       imply a conservation that is not there. What crosses the stages is
       ownership, and that is drawn once, as the rail changing colour
       exactly where the number stops being StoreBrid's and becomes
       ReveNew's. That crossing is the argument for the Suite existing.

       §2 · Both absolute values sit under every stage, so the hero carries
       the baseline and the selected case as well as the movement between
       them — the chart shows the relationship, the figures quantify it.

       The change figures are NEUTRAL in ink. Whether more CAPEX is bad
       news is a decision, not a reading, and the delta chart below already
       orients everything by better and worse — repeating that judgement
       here would be the same story told twice (§4). */
    const tMoved = A.c.t.id !== B.c.t.id;
    const sgn = (v, d, u, pre = "") => (v >= 0 ? "+" : "−") + pre + Math.abs(v).toFixed(d) + u;
    const num = (v, d, u, pre = "") => pre + v.toFixed(d) + u;
    /* The chain starts wherever the change started. A financial-only case
       has no asset stage to show, and inventing one — "+0 MWh" — would
       suggest a decision nobody made. */
    const steps = tMoved
      ? [{ g: "Technical decision", who: "sb", lab: "Storage capacity", a: A.c.t.mwh, b: B.c.t.mwh, d: 0, u: " MWh" },
         { g: "Investment", who: "sb", lab: "CAPEX", a: A.capex, b: B.capex, d: 1, u: "M", pre: "€" },
         { g: "Operational output", who: "sb", lab: "Energy discharged", a: A.c.t.gwh, b: B.c.t.gwh, d: 1, u: " GWh/yr" },
         { g: "Financial consequence", who: "rn", lab: "Expected revenue", a: A.rev, b: B.rev, d: 2, u: "M/yr", pre: "€" },
         { g: "Financial consequence", who: "rn", lab: "NPV", a: A.npv, b: B.npv, d: 1, u: "M", pre: "€" },
         { g: "Financial consequence", who: "cmb", lab: "IRR", a: A.irr, b: B.irr, d: 1, u: "%", pt: true }]
      : [{ g: "Market view", who: "rn", lab: "Capture price", a: A.c.sc.capture, b: B.c.sc.capture, d: 1, u: "/MWh", pre: "€" },
         { g: "Investment", who: "sb", lab: "CAPEX", a: A.capex, b: B.capex, d: 1, u: "M", pre: "€" },
         { g: "Financial consequence", who: "rn", lab: "Expected revenue", a: A.rev, b: B.rev, d: 2, u: "M/yr", pre: "€" },
         { g: "Financial consequence", who: "rn", lab: "NPV", a: A.npv, b: B.npv, d: 1, u: "M", pre: "€" },
         { g: "Financial consequence", who: "cmb", lab: "IRR", a: A.irr, b: B.irr, d: 1, u: "%", pt: true }];

    const tone = { sb: SB, rn: RN, cmb: CMB };
    const W = 1240, PAD = 10, RAIL = 34, TT = 74, PH = 128, FOOT = 76;
    const H = TT + PH + FOOT;
    const n = steps.length, colW = (W - PAD * 2) / n;
    const BW = 30, GAP = 14;

    /* the rail: one segment per run of consecutive stages with the same
       owner, so the colour changes once, where ownership does */
    const runOf = (key) => {
      const rs = [];
      steps.forEach((st, i) => {
        const last = rs[rs.length - 1];
        if (last && last.k === st[key]) last.to = i; else rs.push({ k: st[key], from: i, to: i });
      });
      return rs;
    };
    const owners = runOf("who");
    const rail = owners.map((r) => {
      const x0 = PAD + r.from * colW + 10, x1 = PAD + (r.to + 1) * colW - 10;
      const who = r.k === "sb" ? "StoreBrid decides these" : r.k === "rn" ? "ReveNew produces these" : "Needs both products";
      return `
      <line x1="${x0.toFixed(1)}" y1="${RAIL}" x2="${x1.toFixed(1)}" y2="${RAIL}" stroke="${tone[r.k]}" stroke-width="2.5" stroke-linecap="round" opacity=".8"/>
      <text x="${((x0 + x1) / 2).toFixed(1)}" y="${RAIL - 9}" text-anchor="middle" font-size="10" font-weight="600" fill="${tone[r.k]}">${who}</text>`;
    }).join("");
    /* the hand-off: a break drawn where the rail changes owner, because
       that transfer is the thing worth pointing at */
    const handoff = owners.slice(0, -1).map((r) => {
      const x = PAD + (r.to + 1) * colW;
      return `<circle cx="${x.toFixed(1)}" cy="${RAIL}" r="4.5" fill="#fff" stroke="${AXIS}" stroke-width="1.5"/>`;
    }).join("");

    const groups = runOf("g").map((r, gi, all) => {
      const x0 = PAD + r.from * colW, x1 = PAD + (r.to + 1) * colW;
      return `
      <text x="${((x0 + x1) / 2).toFixed(1)}" y="12" text-anchor="middle" font-size="9.5" font-weight="700"
        letter-spacing=".08em" fill="${AXIS}">${r.k.toUpperCase()}</text>
      ${gi < all.length - 1 ? `<line x1="${x1.toFixed(1)}" y1="20" x2="${x1.toFixed(1)}" y2="${TT + PH + 60}" stroke="${GRID}" stroke-width="1"/>` : ""}`;
    }).join("");

    const base0 = TT + PH;
    const cols = steps.map((st, i) => {
      const cx = PAD + i * colW + colW / 2;
      /* zero-based within the stage: the bars are the quantities, the gap
         between their tops is the change */
      const lo = Math.min(0, st.a, st.b), hi = Math.max(0, st.a, st.b);
      const span = (hi - lo) * 1.16 || 1;
      const Y = (v) => base0 - ((v - lo) / span) * PH;
      const ax = cx - BW - GAP / 2, bx = cx + GAP / 2;
      const dv = st.b - st.a;
      const fmt = (v) => num(v, st.d, st.u, st.pre || "");
      const dfmt = st.pt ? sgn(dv, 1, " pp") : sgn(dv, st.d, st.u, st.pre || "");
      const yA = Y(st.a), yB = Y(st.b), y0 = Y(0);
      const bTop = Math.min(yA, yB), bBot = Math.max(yA, yB);
      const brX = bx + BW + 10;
      return `
      <path d="${bar(ax, Math.min(yA, y0), BW, Math.max(Math.abs(y0 - yA), 1.5), 3, true)}" fill="${FIELD}" fill-opacity=".32">
        <title>${AC(fromId).name} — ${st.lab} ${fmt(st.a)}</title></path>
      <path class="mk" d="${bar(bx, Math.min(yB, y0), BW, Math.max(Math.abs(y0 - yB), 1.5), 3, true)}" fill="${tone[st.who]}" fill-opacity=".6">
        <title>${AC(toId).name} — ${st.lab} ${fmt(st.b)} (${dfmt} against ${AC(fromId).name})</title></path>
      ${bBot - bTop > 7 ? `
      <line x1="${brX.toFixed(1)}" y1="${bTop.toFixed(1)}" x2="${brX.toFixed(1)}" y2="${bBot.toFixed(1)}" stroke="${AXIS}" stroke-width="1"/>
      <line x1="${(brX - 3.5).toFixed(1)}" y1="${bTop.toFixed(1)}" x2="${(brX + 3.5).toFixed(1)}" y2="${bTop.toFixed(1)}" stroke="${AXIS}" stroke-width="1"/>
      <line x1="${(brX - 3.5).toFixed(1)}" y1="${bBot.toFixed(1)}" x2="${(brX + 3.5).toFixed(1)}" y2="${bBot.toFixed(1)}" stroke="${AXIS}" stroke-width="1"/>` : ""}
      <line x1="${(cx - colW / 2 + 14).toFixed(1)}" y1="${base0}" x2="${(cx + colW / 2 - 14).toFixed(1)}" y2="${base0}" stroke="rgba(30,58,138,.18)" stroke-width="1"/>

      <text x="${cx.toFixed(1)}" y="${(bTop - 11).toFixed(1)}" text-anchor="middle" font-size="15" font-weight="700"
        fill="${INK}" font-variant-numeric="tabular-nums">${dfmt}</text>

      <text x="${cx.toFixed(1)}" y="${base0 + 21}" text-anchor="middle" font-size="11.5" font-weight="600" fill="${INK}">${st.lab}</text>
      <text x="${cx.toFixed(1)}" y="${base0 + 40}" text-anchor="middle" font-size="10.5" fill="${AXIS}" font-variant-numeric="tabular-nums">${fmt(st.a)}</text>
      <text x="${cx.toFixed(1)}" y="${base0 + 56}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}" font-variant-numeric="tabular-nums">${fmt(st.b)}</text>
      ${i < n - 1 ? `<path d="M${(PAD + (i + 1) * colW - 4).toFixed(1)} ${(base0 - PH / 2 - 6).toFixed(1)}l6 6-6 6"
        fill="none" stroke="${AXIS}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity=".5"/>` : ""}`;
    }).join("");

    return `
<div style="margin-bottom:18px">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap">
    <span class="band" style="color:var(--su700)">${tMoved ? "From the technical decision to its financial consequence" : "From the market view to its financial consequence"}</span>
    <span class="hr" style="flex:1"></span>
    <span style="display:inline-flex;align-items:center;gap:7px">
      <svg width="13" height="12" aria-hidden="true"><rect x="0" y="2" width="5" height="10" rx="1.5" fill="${FIELD}" fill-opacity=".32"/></svg>
      <span class="t-meta">${AC(fromId).name}</span>
    </span>
    <span style="display:inline-flex;align-items:center;gap:7px">
      <svg width="13" height="12" aria-hidden="true"><rect x="0" y="4" width="5" height="8" rx="1.5" fill="${CMB}" fill-opacity=".6"/></svg>
      <span class="t-meta">${AC(toId).name}</span>
    </span>
  </div>
  <svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block" role="img"
    aria-label="Every stage from the technical decision to the return, drawn as the baseline case beside the selected case with the change between them">
    ${MKSTYLE}${groups}${rail}${handoff}${cols}
  </svg>
  <p class="t-meta" style="margin-top:12px;line-height:1.55">
    Bar height is the quantity on each stage's own zero-based scale, so the gap between the pair is the change.
    The stages share no axis because they share no unit and do not conserve — a sequence, not a flow.
  </p>
</div>`;
  })()}

  <div style="display:flex;align-items:flex-start;gap:12px;margin-top:16px;padding-top:14px;border-top:1px solid var(--hair)">
    <span class="band" style="flex:none;color:var(--su700);padding-top:2px">Trade-off</span>
    <span style="flex:1;min-width:0;font-size:12.5px;color:var(--s700);line-height:1.6">${tradeOff}</span>
    ${src("combined")}
  </div>
  <div style="display:flex;align-items:center;gap:12px;margin-top:14px">
    <span class="t-meta" style="flex:1;min-width:0">
      ${k.key === "both"
        ? "Both dimensions moved between these two cases, so the split depends on which one moves first."
        : k.key === "sb"
          ? "Only the StoreBrid simulation moved, so the whole difference sits on the technical step."
          : "Only the ReveNew case moved, so the whole difference sits on the financial step."}
    </span>
    <button class="btn btn-secondary" style="flex:none;height:32px;font-size:12.5px">${ic("analytics", 14)}Explain difference${ic("right", 13, 2)}</button>
  </div>
</section>`;
};


/* ── deltas, drawn. "The change between alternatives matters more than a
      large table of numbers" — so the table gets a picture above it. */
/* Deltas, oriented by MEANING rather than by sign: better always goes
   right, worse always goes left, and the label keeps the true signed
   value. Otherwise +€8.6M of CAPEX and +€3.0M of NPV point the same
   way and mean opposite things. */
function deltaBars(w = 1240) {
  let gmax = 1;
  const base = acMetrics(AC("base"));
  const others = ACASES.filter((a) => !a.current)
    .map((a) => ({ a, ...acMetrics(a), stale: isStale(a.tid, a.sid) }));
  const rows = [
    ["CAPEX", "what it costs to build", (m) => m.capex, (v) => (v >= 0 ? "+" : "−") + "€" + Math.abs(v).toFixed(1) + "M", false, SB],
    ["Energy discharged", "what the asset moves", (m) => m.c.t.gwh, (v) => (v >= 0 ? "+" : "−") + Math.abs(v).toFixed(1) + " GWh", true, SB],
    ["Revenue / yr", "what it earns", (m) => m.rev, (v) => (v >= 0 ? "+" : "−") + "€" + Math.abs(v).toFixed(2) + "M", true, RN],
    ["NPV", "value created", (m) => m.npv, (v) => (v >= 0 ? "+" : "−") + "€" + Math.abs(v).toFixed(1) + "M", true, RN],
    ["IRR", "rate of return", (m) => m.irr, (v) => (v >= 0 ? "+" : "−") + Math.abs(v).toFixed(1) + " pp", true, CMB],
    ["Payback", "years to break even", (m) => m.pb, (v) => (v >= 0 ? "+" : "−") + Math.abs(v).toFixed(1) + " y", false, RN],
  ];
  const L = 150, R = 24, TT = 54, rowH = 56;
  const H = TT + rows.length * rowH + 10;
  const colW = (w - L - R) / others.length;
  return `
<svg viewBox="0 0 ${w} ${H}" width="100%" style="display:block" role="img" aria-label="Difference from the base case, oriented so better is to the right">
  ${MKSTYLE}
  ${others.map((o, ci) => {
    const mid = L + ci * colW + colW / 2;
    return `
    <text x="${mid.toFixed(1)}" y="16" text-anchor="middle" font-size="12" font-weight="600" fill="${INK}">${o.a.name}</text>
    <text x="${mid.toFixed(1)}" y="31" text-anchor="middle" font-size="9.5" fill="${AXIS}">vs ${AC("base").name}${o.stale ? " · outdated" : ""}</text>
    <text x="${(mid - colW * 0.36).toFixed(1)}" y="46" text-anchor="start" font-size="9" fill="#9A6208">← worse</text>
    <text x="${(mid + colW * 0.36).toFixed(1)}" y="46" text-anchor="end" font-size="9" fill="#0E9469">better →</text>`;
  }).join("")}
  ${(() => { /* one relative scale for every row, computed once */
    gmax = Math.max(...rows.flatMap(([, , get]) =>
      others.map((o) => Math.abs((get(o) - get(base)) / (Math.abs(get(base)) || 1)))), 0.0001);
    return ""; })()}
  ${rows.map(([label, note, get, fmt, higherBetter, col], ri) => {
    const y = TT + ri * rowH;
    const deltas = others.map((o) => get(o) - get(base));
    const rels = others.map((o) => (get(o) - get(base)) / (Math.abs(get(base)) || 1));
    return `
    <text x="${L - 18}" y="${y + 20}" text-anchor="end" font-size="11.5" font-weight="600" fill="${INK}">${label}</text>
    <text x="${L - 18}" y="${y + 34}" text-anchor="end" font-size="9" fill="${AXIS}">${note}</text>
    ${others.map((o, ci) => {
      const d = deltas[ci], rel = rels[ci], mid = L + ci * colW + colW / 2, half = colW * 0.30;
      const good = d === 0 ? null : (higherBetter ? d > 0 : d < 0);
      /* §6 · Bar length is RELATIVE change, so six metrics in six different
         units share one axis honestly. The figure printed is the real
         difference — the bar compares, the number quantifies. */
      const bw = (Math.abs(rel) / gmax) * half;
      const toRight = good === true;
      const pc = (rel >= 0 ? "+" : "−") + (Math.abs(rel) * 100).toFixed(0) + "%";
      return `
      <line x1="${mid.toFixed(1)}" y1="${y + 4}" x2="${mid.toFixed(1)}" y2="${y + 40}" stroke="rgba(30,58,138,.16)" stroke-width="1"/>
      <path class="mk" d="${bar(toRight ? mid : mid - bw, y + 9, Math.max(bw, 2), 18, 3, true)}"
        fill="${col}" fill-opacity="${o.stale ? ".3" : good ? ".8" : ".42"}"><title>${o.a.name} — ${label} ${fmt(d)} (${pc} against the base case)</title></path>
      <text x="${(toRight ? mid + bw + 9 : mid - bw - 9).toFixed(1)}" y="${y + 16}" text-anchor="${toRight ? "start" : "end"}"
        font-size="11.5" font-weight="700" fill="${o.stale ? AXIS : good ? "#0E9469" : "#C22222"}">${fmt(d)}</text>
      <text x="${(toRight ? mid + bw + 9 : mid - bw - 9).toFixed(1)}" y="${y + 30}" text-anchor="${toRight ? "start" : "end"}"
        font-size="9.5" fill="${AXIS}">${pc}</text>`;
    }).join("")}`;
  }).join("")}
</svg>`;
}

/* §6 · a comparison someone made is worth keeping */
/* §2-§3 · What the user brought with them from the matrix: what they are
   optimising, what they will not accept, and what everything is measured
   against. Editable here so nobody has to walk back to the matrix to move
   a limit — but only these three. Anything that would change a model is a
   deep link, not a field. */
const decisionContext = ({ mk = "npvObj" } = {}) => {
  const objLabel = mk === "npvObj" ? "Maximise NPV" : objectiveOf(mk);
  const cell = (band, body, edit) => `
    <div style="flex:none;padding:0 20px;border-left:1px solid var(--hair)">
      <span class="band" style="font-size:10px">${band}</span>
      <div style="display:flex;align-items:center;gap:9px;margin-top:7px">${body}
        ${edit ? `<a href="#" style="font-size:11.5px;font-weight:500">Edit</a>` : ""}</div>
    </div>`;
  return `
<section class="panel" style="display:flex;align-items:center;padding:15px 0;margin-bottom:20px;flex-wrap:wrap;row-gap:12px">
  <div style="flex:1;min-width:220px;padding:0 20px">
    <span class="band" style="font-size:10px;color:var(--su700)">Decision context</span>
    <div class="t-meta" style="margin-top:7px;line-height:1.45">Carried from the case matrix. It sets what these deltas are for.</div>
  </div>
  ${cell("Objective", `<b style="font-size:13.5px;font-weight:600;color:var(--s900)">${objLabel}</b>${src("revenew")}`, true)}
  ${cell("Constraints", CRITERIA.length
      ? CRITERIA.map(({ key, target }) => {
          const k = CRIT_SPEC[key];
          return `<span class="cov" style="gap:6px"><span style="color:var(--s500)">${k.label}</span><b style="font-weight:600;color:var(--s900)">${k.op} ${k.fmt(target)}</b></span>`;
        }).join("")
      : `<span class="t-meta">None</span>`, true)}
  ${cell("Baseline", `<span style="display:inline-flex;align-items:center;gap:7px">
      <i style="width:5px;height:5px;border-radius:50%;background:${SU};display:block"></i>
      <b style="font-size:13.5px;font-weight:600;color:var(--s900)">${AC("base").name}</b></span>`, true)}
</section>`;
};

const savedBar = () => `
<div style="display:flex;align-items:center;gap:12px;padding:14px 18px;margin-bottom:20px;border-radius:var(--r-sm);
     background:linear-gradient(168deg,rgba(14,157,168,.05),rgba(255,255,255,0) 72%);box-shadow:inset 0 0 0 1px rgba(14,157,168,.16)">
  <span style="color:var(--su700);display:flex;flex:none">${ic("layers", 16)}</span>
  <span style="flex:1;min-width:0;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
    <span style="font-size:13px;font-weight:600;color:var(--s900)">4 h storage investment decision</span>
    <span class="t-meta">saved 2 days ago · Victor Andújar</span>
  </span>
  <span style="display:flex;gap:8px;flex:none">
    <button class="btn btn-ghost" style="height:32px;font-size:12px">${ic("clock", 14)}Saved comparisons${ic("down", 13, 1.8)}</button>
    <button class="btn btn-secondary" style="height:32px;font-size:12px">${ic("file", 14)}Export brief</button>
    <button class="btn btn-secondary" style="height:32px;font-size:12px">${ic("check", 14, 1.9)}Save decision brief</button>
  </span>
</div>`;

/* §2 · "Deltas before density." The full table is a checking instrument,
   not the reading — so it sits one level down, behind its own control,
   and says so when it is open. `detail` is the only thing that opens it. */
/* §8 · One bridge, not three. The hero always reads baseline against ONE
   selected case; the others stay a click away. Three bridges side by side
   would be three stories competing, which is the problem this iteration
   exists to fix. */
const pairSelector = (selId) => `
<div style="display:flex;align-items:center;gap:12px;margin-bottom:18px;flex-wrap:wrap">
  <span class="t-meta" style="flex:none">Inspecting</span>
  <span style="display:inline-flex;align-items:center;gap:7px">
    <i style="width:5px;height:5px;border-radius:50%;background:${SU};display:block"></i>
    <b style="font-size:13.5px;font-weight:600;color:var(--s900)">${AC("base").name}</b>
    <span class="t-meta">baseline</span>
  </span>
  <span style="color:var(--s400);display:flex">${ic("right", 14, 2)}</span>
  <button class="btn btn-secondary" style="height:34px;font-size:12.5px">
    <i style="width:5px;height:5px;border-radius:50%;background:${CMB};display:block"></i>${AC(selId).name}${ic("down", 14, 1.8)}</button>
  <span style="flex:1"></span>
  <span class="t-meta">The other cases stay in the delta chart and the table below</span>
</div>`;

/* §10 · A limit is a position, not a sentence. One bullet row per ACTIVE
   criterion — never one per metric — so the reader sees which side of the
   line each case sits on before reading a number. */
const criteriaThreshold = (selId) => {
  if (!CRITERIA.length) return "";
  const cases = ACASES.map((a) => ({ a, c: acCase(a), m: acMetrics(a) }));
  return `
<section class="panel" style="padding:20px 26px;margin-top:18px">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
    <span class="band">Against your criteria</span>${src("suite")}
    <span style="flex:1"></span>
    <span class="t-meta">Only the limits you set are drawn</span>
  </div>
  ${CRITERIA.map(({ key, target }) => {
    const k = CRIT_SPEC[key];
    const vals = cases.map((x) => k.get(x.c));
    const lo = Math.min(...vals, target), hi = Math.max(...vals, target);
    const pad = (hi - lo) * 0.22 || 1;
    const A0 = lo - pad, B0 = hi + pad;
    const pct = (v) => ((v - A0) / (B0 - A0)) * 100;
    const ok = k.op === "\u2264";
    return `
    <div style="display:flex;align-items:center;gap:18px;padding:15px 0;border-top:1px solid var(--hair)">
      <span style="flex:none;width:150px;min-width:0">
        <span style="display:flex;align-items:center;gap:7px">
          <span style="font-size:13.5px;font-weight:600;color:var(--s900)">${k.label}</span>${src(k.from)}
        </span>
        <span class="t-meta" style="display:block;margin-top:3px">${k.op} ${k.fmt(target)}</span>
      </span>
      <span style="flex:1;min-width:0;position:relative;height:44px;display:block">
        <span style="position:absolute;left:0;right:0;top:26px;height:1px;background:var(--hair);display:block"></span>
        <span style="position:absolute;left:${pct(target).toFixed(1)}%;top:14px;bottom:0;width:1.5px;
              background:${WARN.ink};opacity:.55;display:block"></span>
        <span style="position:absolute;left:${pct(target).toFixed(1)}%;top:0;transform:translateX(-50%);
              font-size:10px;font-weight:600;color:${WARN.ink};white-space:nowrap">limit ${k.fmt(target)}</span>
        ${ok ? `<span style="position:absolute;left:0;width:${pct(target).toFixed(1)}%;top:24px;height:5px;border-radius:3px;
              background:rgba(14,157,168,.16);display:block"></span>` : ""}
        ${(() => {
          /* Cases built on the same simulation share a CAPEX, so their markers
             land on the same point. Draw one marker per distinct value and let
             it carry every name — stacking two dots at identical coordinates
             would hide one of them and quietly undercount the field. */
          const byVal = new Map();
          for (const x of cases) {
            const v = +k.get(x.c).toFixed(4);
            (byVal.get(v) || byVal.set(v, []).get(v)).push(x);
          }
          return [...byVal.entries()].map(([v, xs]) => {
            const pass = k.pass(v, target), isSel = xs.some((x) => x.a.id === selId);
            const d = isSel ? 15 : 11;
            return `<span class="mk" style="position:absolute;left:${pct(v).toFixed(1)}%;top:${(26 - d / 2).toFixed(1)}px;margin-left:-${(d / 2).toFixed(1)}px;
                  width:${d}px;height:${d}px;border-radius:50%;display:block;background:#fff;
                  box-shadow:0 0 0 ${isSel ? 2.4 : 1.8}px ${pass ? SU : WARN.ink}">
              <span style="position:absolute;inset:0"><title>${xs.map((x) => x.a.name).join(" and ")} — ${k.fmt(v)}${pass ? "" : ` · ${k.fmt(Math.abs(k.over(v, target))).replace("\u2212", "")} over the limit`}</title></span></span>
              ${xs.length > 1 ? `<span style="position:absolute;left:${pct(v).toFixed(1)}%;top:36px;transform:translateX(-50%);
                    font-size:9px;color:var(--s400);white-space:nowrap">${xs.length} cases</span>` : ""}`;
          }).join("");
        })()}
      </span>
      <span style="flex:none;width:230px;text-align:right">
        ${cases.filter((x) => !k.pass(k.get(x.c), target)).map((x) =>
          `<span style="display:block;font-size:12px;color:${WARN.ink};line-height:1.5">${x.a.name} ${k.fmt(Math.abs(k.over(k.get(x.c), target))).replace("\u2212", "")} ${ok ? "above" : "below"} limit</span>`).join("")
        || `<span class="t-meta">All cases within the limit</span>`}
      </span>
    </div>`;
  }).join("")}
</section>`;
};

const alternativesBody = ({ detail = false } = {}) => `
${head({
  crumb: `<a href="#">Home</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Projects</a><span class="sep">${ic("right", 12, 2)}</span><a href="#">Valencia BESS</a><span class="sep">${ic("right", 12, 2)}</span><b>Compare</b>`,
  eyebrow: `<span style="display:inline-flex;align-items:center;gap:9px">Compare ${src("suite")}</span>`,
  title: "Compare",
  meta: "Compare saved analysis cases and see what each trade-off costs and returns. Exploring every possible pairing is <a href=\"#\">Case matrix</a>.",
  actions: `<button class="btn btn-primary">${ic("plus", 16, 1.9)}New analysis case</button>`,
})}
${decisionContext()}
${savedBar()}
<div style="display:flex;align-items:center;gap:12px;margin-bottom:22px;flex-wrap:wrap">
  ${ACASES.map((a) => acChip(a, true)).join("")}
  <button class="btn btn-secondary" style="height:40px">${ic("plus", 15, 1.9)}Add case</button>
</div>

${pairSelector("high")}

${/* §50 · The panel carries its own heading and its own band, both of which
      said this already. Three titles for one chart is the duplication this
      pass exists to remove — the chart starts where the controls end. */""}
${impactBlock("base", "high")}
${criteriaThreshold("high")}

${sec({ label: "Difference from " + AC("base").name, source: src("combined"),
        sub: "Every bar is read from the base case and oriented by what it means: an improvement points right. Bar length is relative change so metrics in different units compare honestly; the figure is the actual difference." })}
<section class="panel lift" style="padding:24px 26px">
  ${deltaBars(1240)}
</section>

${sec({ label: "Best on each objective", source: src("combined"),
        sub: "Four objectives, three analysis cases, no single winner. The Suite names the trade-off; the choice is yours." })}
${decisionTiles()}
<div style="display:flex;align-items:center;gap:12px;margin-top:18px;padding:14px 18px;border-radius:var(--r-sm);
     background:linear-gradient(168deg,rgba(14,157,168,.05),rgba(255,255,255,0) 74%);box-shadow:inset 0 0 0 1px rgba(14,157,168,.16)">
  <span style="color:var(--su700);display:flex;flex:none">${ic("gauge", 16)}</span>
  <span style="flex:1;min-width:0;font-size:12.5px;color:var(--s700);line-height:1.5">
    <b style="font-weight:600">High storage</b> is selected. Making it the current analysis takes it back to Overview, where every figure then reads from it.
  </span>
  <button class="btn btn-secondary" style="flex:none;height:34px;font-size:12.5px">${ic("gauge", 15)}Use as current analysis</button>
</div>


${(() => {
  /* §8 · The matrix already computed how far each asset moves across the
     financial cases. Here it answers a different question than it does
     there: not "which configuration is steadiest" but "how much of this
     delta survives if the market view turns out wrong". One row per case,
     not another matrix. */
  const rows = ACASES.map((a) => {
    const c = acCase(a);
    const vs = SCEN.map((sc) => caseOf(c.t.id, sc.id).irr);
    return { a, c, lo: Math.min(...vs), hi: Math.max(...vs) };
  });
  const A0 = Math.min(...rows.map((r) => r.lo)) - 0.6, B0 = Math.max(...rows.map((r) => r.hi)) + 0.6;
  const pct = (v) => ((v - A0) / (B0 - A0)) * 100;
  return `
${sec({ label: "Market sensitivity", source: src("combined"),
        sub: "How far each case's IRR moves across the three financial cases, holding its asset constant. The range belongs to the technical simulation, so two cases built on the same asset share it and differ only in where they sit inside it. Modelled views, not probabilities — a range, not a distribution." })}
<section class="panel" style="padding:22px 26px">
  ${rows.map((r, i) => `
  <div style="display:flex;align-items:center;gap:16px;padding:13px 0;${i ? "border-top:1px solid var(--hair)" : ""}">
    <span style="flex:none;width:200px;min-width:0">
      <span style="display:block;font-size:13.5px;font-weight:600;color:var(--s900)">${r.a.name}</span>
      <span class="t-meta" style="display:block;margin-top:2px">${r.c.t.short}</span>
    </span>
    <span style="flex:1;min-width:0;position:relative;height:20px;display:block">
      <span style="position:absolute;left:0;right:0;top:9px;height:1px;background:var(--hair);display:block"></span>
      <span style="position:absolute;top:6.5px;height:7px;border-radius:4px;display:block;
            left:${pct(r.lo).toFixed(1)}%;width:${(pct(r.hi) - pct(r.lo)).toFixed(1)}%;
            background:linear-gradient(90deg,rgba(175,71,178,.34),rgba(37,99,235,.5))"></span>
      <span class="mk" style="position:absolute;top:4px;left:${pct(r.c.irr).toFixed(1)}%;margin-left:-6px;width:12px;height:12px;
            border-radius:50%;display:block;background:#fff;box-shadow:0 0 0 2px ${SU}"></span>
    </span>
    <span style="flex:none;width:132px;text-align:right;font-size:13px;font-weight:600;color:var(--s900);font-variant-numeric:tabular-nums">${r.lo.toFixed(1)}–${r.hi.toFixed(1)}%</span>
  </div>`).join("")}
  <div style="display:flex;align-items:center;gap:16px;margin-top:14px;padding-top:12px;border-top:1px solid var(--hair)">
    <span style="display:inline-flex;align-items:center;gap:7px"><i style="width:9px;height:9px;border-radius:50%;background:#fff;box-shadow:0 0 0 2px ${SU};display:block"></i><span class="t-meta">Where this case sits on its own financial case</span></span>
    <span style="flex:1"></span>
    <a href="#" style="font-size:12.5px;font-weight:500">Full sensitivity in the case matrix${ic("right", 12, 2)}</a>
  </div>
</section>`;
})()}


</div>
<p class="t-meta" style="margin-top:16px;line-height:1.6;max-width:112ch">
  Doubling storage costs €8.6M and returns €1.93M a year, lifting NPV by €3.0M. The stress test then holds that asset and
  drops the market to Low spread: nothing is rebuilt, and €9.8M of NPV disappears. That is the risk the extra storage carries.
</p>

<div style="display:flex;align-items:center;gap:14px;margin:26px 0 ${detail ? "16px" : "0"}">
  <span class="hr" style="flex:1"></span>
  <button class="btn btn-secondary">${detail ? "Hide all metrics" : "Show all metrics"}${ic(detail ? "up" : "down", 15, 1.9)}</button>
  <span class="hr" style="flex:1"></span>
</div>
${detail ? `
<div style="display:flex;align-items:center;gap:12px;margin:0 0 12px">
  <span class="band" style="color:var(--s400)">Detail level</span>
  <span class="hr" style="flex:1"></span>
  <span class="t-meta">13 metrics · grouped by which product owns each figure</span>
</div>` : `
<p class="t-meta" style="text-align:center;margin-top:13px;line-height:1.6">
  13 metrics across StoreBrid, ReveNew and the Suite, collapsed.
  The deltas above are the reading — this is for checking them.
</p>`}
${detail ? `
<section class="panel" style="padding:14px 28px 24px">
  <div style="display:flex;align-items:flex-end;gap:16px;padding:12px 0 14px">
    <span style="width:230px;flex:none" class="t-meta">Analysis case</span>
    ${ACASES.map((a) => `<span style="flex:1;min-width:0;text-align:right">
      <span style="display:block;font-size:13.5px;font-weight:600;color:var(--s900)">${a.name}</span>
      <span class="t-meta" style="display:block;margin-top:3px">${acCase(a).t.short} + ${acCase(a).sc.name}</span>
    </span>`).join("")}
  </div>
  ${cmpGroup("Technical — StoreBrid", src("storebrid"),
    cmpRowAlt("Installed power", (m) => m.c.t.mw + " MW", src("storebrid")) +
    cmpRowAlt("Storage capacity", (m) => m.c.t.mwh + " MWh", src("storebrid")) +
    cmpRowAlt("Duration", (m) => m.c.t.dur.toFixed(1) + " h", src("storebrid")) +
    cmpRowAlt("Round-trip efficiency", (m) => m.c.t.rte + "%", src("storebrid")) +
    cmpRowAlt("Energy discharged", (m) => m.c.t.gwh + " GWh", src("storebrid")) +
    cmpRowAlt("Full cycles / year", (m) => String(m.c.t.cycles), src("storebrid")))}
  ${cmpGroup("Financial — ReveNew", src("revenew"),
    cmpRowAlt("CAPEX", (m) => "€" + m.capex.toFixed(1) + "M", `<span class="src" title="Costed in StoreBrid, consumed by the ReveNew financial model"><i style="background:${SB}"></i>StoreBrid<span style="color:var(--s400);margin:0 2px">→</span><i style="background:${RN}"></i>ReveNew</span>`) +
    cmpRowAlt("Revenue / year", (m) => eurM(m.rev), src("revenew")) +
    cmpRowAlt("NPV", (m) => eurMs(m.npv), src("revenew")) +
    cmpRowAlt("IRR", (m) => m.irr.toFixed(1) + "%", src("combined")) +
    cmpRowAlt("Payback", (m) => m.pb.toFixed(1) + " yrs", src("revenew")))}
  ${cmpGroup("Combined — Suite", src("combined"),
    cmpRowAlt("Revenue / MWh discharged", (m) => "€" + m.c.perMwh.toFixed(1), src("combined")) +
    cmpRowAlt("NPV / MW installed", (m) => "€" + Math.round((m.npv * 1e6) / m.c.t.mw / 1000) + "k", src("combined")))}
</section>` : ""}

`;

/* ═══════════════════════════════════════════════════════════════
   §16 · CREATE AN ANALYSIS CASE — a pairing, not a form

   An analysis case is one StoreBrid simulation held against one ReveNew
   financial case. That is a choice on two axes, and an earlier pass hid
   both of them inside closed dropdowns — which put the one moment where
   the two products actually meet behind two clicks that showed nothing.

   Both catalogues are open, side by side, each in its owner's colour.
   Every option carries what it produces AGAINST THE HALF ALREADY CHOSEN,
   so the consequence of a choice is legible before it is made, and the
   band underneath reads the pairing that results. Choosing is the whole
   interaction: there is nothing to fill in but the name.

   Still deliberately thin — one step, no wizard, no CRUD module, no
   draft. The Suite stores a name and two references; every figure on
   this screen is read from the products that own it.
   ═══════════════════════════════════════════════════════════════ */

/* one option in either catalogue. `outcome` is the pairing this option
   would form with the half already chosen — the only thing on the row
   that belongs to neither product alone. */
const pairOption = ({ name, when, meta, figs, on, accent, status, outcome }) => `
<a href="#" class="${on ? "glass-sm" : "wash"}" style="display:block;padding:12px 14px;margin-bottom:8px;text-decoration:none;
   ${on ? `box-shadow:0 0 0 1.5px ${accent}59, var(--sh-sm), inset 0 1px 0 rgba(255,255,255,.92)` : ""}">
  <span style="display:flex;align-items:center;gap:9px">
    <span style="width:15px;height:15px;flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;
          ${on ? `background:${accent};color:#fff` : "box-shadow:inset 0 0 0 1.5px rgba(30,58,138,.2)"}">
      ${on ? `<span style="width:5px;height:5px;border-radius:50%;background:#fff;display:block"></span>` : ""}
    </span>
    <span style="flex:1;min-width:0;font-size:13px;font-weight:${on ? "600" : "500"};color:var(--s900);
          overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${name}</span>
    ${status}
    <span class="t-meta" style="flex:none">${when}</span>
  </span>
  <span class="t-meta" style="display:block;margin:5px 0 0 24px">${meta}</span>
  <span style="display:flex;gap:16px;margin:9px 0 0 24px">
    ${figs.map(([v, k]) => `<span style="min-width:0">
      <span style="font-size:12.5px;font-weight:600;color:var(--s900);font-variant-numeric:tabular-nums">${v}</span>
      <span class="t-meta" style="margin-left:5px">${k}</span></span>`).join("")}
  </span>
  <span style="display:flex;align-items:center;gap:8px;margin:9px 0 0 24px;padding-top:9px;border-top:1px solid var(--hair)">
    ${outcome}
  </span>
</a>`;

/* What an option ALREADY IS belongs with its identity; what it WOULD
   PRODUCE belongs on its own line. Splitting them that way also keeps
   every row one line tall, so the two catalogues stay in step.

   Only the positive states are drawn. Most pairings are unsaved, so a
   "Not saved" on four rows out of six is chrome that crowds out the two
   marks that carry the signal — and the band underneath already names
   the state of the pairing being built. */
const pairStatus = (tid, sid) => {
  const saved = savedAs(tid, sid);
  if (!saved) return "";
  return `<span style="flex:none;display:inline-flex;align-items:center;gap:6px">
    ${isStale(tid, sid) ? staleTag() : ""}
    <span class="cov"><i style="background:${SU}"></i>${saved.name}</span>
  </span>`;
};

/* what this option would be worth in combination — or, when the pairing
   has never been priced, the honest absence of a figure. */
const pairOutcome = (tid, sid, otherLabel, priced) => {
  if (!priced(tid, sid)) return `
    <span class="t-meta" style="flex:1;min-width:0">With ${otherLabel} · <b style="font-weight:600;color:var(--s500)">no result yet</b></span>`;
  const c = caseOf(tid, sid), stale = isStale(tid, sid);
  const ink = stale ? "var(--s500)" : "var(--s900)";
  return `
    <span style="flex:1;min-width:0;font-size:11.5px;color:var(--s500)">
      With ${otherLabel} <span style="color:var(--s400)">→</span>
      <b style="font-weight:600;color:${ink};font-variant-numeric:tabular-nums">${c.irr.toFixed(1)}% IRR</b>
      <span style="color:var(--s400)"> · </span>
      <b style="font-weight:600;color:${ink};font-variant-numeric:tabular-nums">${eurMs(npvOfCase(c))} NPV</b>
    </span>`;
};

/* the pairing the two choices make. Everything StoreBrid owns is known
   as soon as the left column is chosen; the financial half is the one
   that has to be computed — which is why the unpriced state can only
   ever hollow out the right-hand figures. */
const pairingBand = (tid, sid, priced) => {
  const c = caseOf(tid, sid), ok = priced(tid, sid), saved = savedAs(tid, sid);
  const fig = (k, v, sr, dim) => `
    <span style="flex:1;min-width:0">
      <span class="t-meta" style="display:block">${k}</span>
      <span style="display:block;font-size:19px;font-weight:700;letter-spacing:-.02em;margin-top:5px;font-variant-numeric:tabular-nums;
            color:${dim ? "var(--s300)" : "var(--s900)"}">${v}</span>
      <span style="display:block;margin-top:6px">${sr}</span>
    </span>`;
  return `
<div class="wash" style="padding:17px 19px;margin-top:16px">
  <div style="display:flex;align-items:center;gap:11px;flex-wrap:wrap">
    <span class="band" style="font-size:10px;color:var(--su700)">This pairing</span>
    <span style="display:inline-flex;align-items:center;gap:7px">
      <i style="width:5px;height:5px;border-radius:50%;background:${SB};display:block"></i>
      <span style="font-size:13px;font-weight:600;color:var(--s900)">${c.t.short}</span>
    </span>
    <span style="font-size:12px;color:var(--s400)">×</span>
    <span style="display:inline-flex;align-items:center;gap:7px">
      <i style="width:5px;height:5px;border-radius:50%;background:${RN};display:block"></i>
      <span style="font-size:13px;font-weight:600;color:var(--s900)">${c.sc.name}</span>
    </span>
    <span style="flex:1"></span>
    ${saved ? `<span class="cov"><i style="background:${SU}"></i>Already saved as ${saved.name}</span>`
            : `<span class="cov" style="opacity:.82">Unsaved combination</span>`}
  </div>
  <div style="display:flex;gap:24px;margin-top:15px">
    ${fig("Capacity", c.t.mw + " MW / " + c.t.mwh + " MWh", src("storebrid"))}
    ${fig("CAPEX", "€" + c.t.capex.toFixed(1) + "M", src("storebrid"))}
    ${fig("NPV", ok ? eurMs(npvOfCase(c)) : "—", src("revenew"), !ok)}
    ${fig("IRR", ok ? c.irr.toFixed(1) + "%" : "—", src("combined"), !ok)}
  </div>
  <p class="t-meta" style="margin-top:14px;line-height:1.55">
    ${ok
      ? `Read live from both products. Nothing here is copied into the case — reopening it re-reads ${c.t.short} from StoreBrid and ${c.sc.name} from ReveNew.`
      : `The asset is known the moment the simulation is chosen: StoreBrid has already costed it. What is missing is the financial half — this combination has never been priced, so ReveNew computes it when the case is created and the figures fill in where the dashes are.`}
  </p>
</div>`;
};

const createAC = ({ tid = "v4h", sid = "high", name = "Long duration · strong market",
                    priced = () => true } = {}) => {
  const c = caseOf(tid, sid), ok = priced(tid, sid);
  const column = ({ side, label, sub, items, more }) => {
    const tech = side === "sb", accent = tech ? SB : RN;
    return `
    <div style="flex:1;min-width:0">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:9px">
        <span style="font-size:12px;font-weight:600;color:var(--s700)">${label}<span style="color:var(--rv600);margin-left:3px">*</span></span>
        <span style="flex:1"></span>${src(tech ? "storebrid" : "revenew")}
      </div>
      <div style="height:2px;border-radius:2px;margin-bottom:11px;
           background:linear-gradient(90deg,${accent}66,${accent}14 78%,${accent}00)"></div>
      ${items}
      <div style="display:flex;align-items:center;gap:10px;margin-top:2px">
        <span class="t-meta" style="flex:1;min-width:0">${sub}</span>
        <button class="btn btn-ghost" style="height:28px;font-size:11.5px;padding:0 9px">${more}${ic("upRight", 13, 1.8)}</button>
      </div>
    </div>`;
  };
  return capabilityModal({
    title: "Create analysis case", context: "Valencia BESS", accent: SU, source: src("suite"),
    openIn: "Analysis cases", width: 900,
    footNote: ok
      ? "Nothing is created in StoreBrid or ReveNew — this is a named pairing of what already exists."
      : "Nothing is created in StoreBrid or ReveNew. The pairing is saved now and priced when ReveNew finishes; the case shows its result the moment it lands.",
    cancel: "Cancel", confirm: "Create analysis case",
    body: `
    <div style="padding:20px 24px">
      ${field("Name", name, { req: true })}
      <div style="display:flex;gap:20px;margin-top:6px">
        ${column({ side: "sb", label: "Technical simulation",
          sub: TECH.length + " simulations in this project",
          more: "New simulation in StoreBrid",
          items: TECH.map((t) => pairOption({
            name: t.name, when: t.when, on: t.id === tid, accent: SB,
            meta: `${t.mw} MW / ${t.mwh} MWh · ${t.dur.toFixed(1)} h · ${t.rte}% RTE`,
            figs: [[t.gwh + " GWh", "discharged"], ["€" + t.capex.toFixed(1) + "M", "CAPEX"]],
            status: pairStatus(t.id, sid), outcome: pairOutcome(t.id, sid, c.sc.name, priced),
          })).join("") })}
        <span style="width:1px;flex:none;background:var(--hair);margin-top:26px"></span>
        ${column({ side: "rn", label: "Financial case",
          sub: SCEN.length + " cases in this project",
          more: "New case in ReveNew",
          items: SCEN.map((s2) => {
            const cc = caseOf(tid, s2.id);
            return pairOption({
              name: s2.name, when: s2.when.replace("Updated ", ""), on: s2.id === sid, accent: RN,
              meta: `Capture €${s2.capture.toFixed(1)}/MWh · OMIE Spain`,
              figs: priced(tid, s2.id)
                ? [[eurM(cc.rev), "revenue/yr"], ["€" + cc.perMwh.toFixed(1), "per MWh"]]
                : [["—", "revenue/yr"], ["—", "per MWh"]],
              status: pairStatus(tid, s2.id), outcome: pairOutcome(tid, s2.id, c.t.short, priced),
            });
          }).join("") })}
      </div>
      ${pairingBand(tid, sid, priced)}
    </div>`,
  });
};

writeFileSync("CreateAnalysisCase.dc.html",
  doc({ w: 1440, h: 2700, side: projectSide("compare"), body: alternativesBody(), overlay: createAC() }));
console.log("CreateAnalysisCase.dc.html");

/* §16b · The same screen where evaluating a combination costs something —
   the architecture 2c is drawn against. Only pairings already saved as
   cases were priced when they were named; the rest have no figure yet,
   and the screen says so rather than drawing one. What changes is the
   right-hand half of every reading: StoreBrid's side is known throughout. */
writeFileSync("CreateCaseUnpriced.dc.html",
  doc({ w: 1440, h: 2700, side: projectSide("compare"), body: alternativesBody(),
        overlay: createAC({ priced: (t2, s2) => !!savedAs(t2, s2) }) }));
console.log("CreateCaseUnpriced.dc.html");

/* §16c · The landing. Creating a case had no visible consequence: the
   modal closed and the user was returned to a matrix that looked exactly
   as it had. The named cell, the strip that says what was created, and
   the two moves worth making next are that consequence — and they close
   the loop the flow left open.

   Not a toast. Staleness taught the same lesson elsewhere in this set:
   a condition that matters does not clear because someone glanced at it.
   A case having just been created is worth stating until it is acted on. */
const createdStrip = (a) => {
  const c = acCase(a);
  return `
<div style="display:flex;align-items:center;gap:15px;margin-bottom:20px;padding:15px 19px;border-radius:var(--r-sm);
     background:linear-gradient(168deg,rgba(14,157,168,.085),rgba(255,255,255,0) 74%);
     box-shadow:inset 0 0 0 1px rgba(14,157,168,.22)">
  <span style="flex:none;width:27px;height:27px;border-radius:50%;display:flex;align-items:center;justify-content:center;
        background:${SU};color:#fff">${ic("check", 15, 2.4)}</span>
  <span style="flex:1;min-width:0">
    <span style="display:block;font-size:13.5px;color:var(--s900);line-height:1.45">
      <b style="font-weight:600">${a.name}</b> is now an analysis case — ${c.t.short} × ${c.sc.name}, created just now.
    </span>
    <span class="t-meta" style="display:block;margin-top:4px;line-height:1.5">
      The Suite kept the name and the two references, nothing else. Its figures go on being read from StoreBrid and ReveNew,
      so the case follows them instead of freezing a copy of them.
    </span>
  </span>
  ${/* Both secondary on purpose. The strip reports something already done;
        a primary button here would imply the task is still open, and
        "Use as current analysis" is drawn as a secondary in Compare too. */""}
  <button class="btn btn-secondary" style="flex:none;height:34px;font-size:12.5px">${ic("plus", 15, 1.9)}Add to comparison</button>
  <button class="btn btn-secondary" style="flex:none;height:34px;font-size:12.5px">${ic("gauge", 15)}Use as current analysis</button>
</div>`;
};

const NEWAC = { id: "long", name: "Long duration · strong market", tid: "v4h", sid: "high",
                goal: "Evaluate more storage in a strong market", when: "Created just now" };
ACASES.push(NEWAC);
writeFileSync("CaseCreated.dc.html", doc({ w: 1440, h: 3290, side: projectSide("cases"),
  body: casesBody({ mk: "irr", sel: { tid: "v4h", sid: "high" }, created: NEWAC }) }));
ACASES.pop();
console.log("CaseCreated.dc.html");

/* ═══════════════════════════════════════════════════════════════
   §13-§17 · DECISION BRIEF
   "Save comparison" kept a set of chips. What was missing was the
   reasoning: what question was being asked, what was being optimised,
   what would not be accepted, and what the person concluded. All of it
   already exists on the screen except the last two, so the brief is a
   capture step, not a new module — the only things it asks for are the
   question and the note, because those are the only things the product
   cannot derive.

   §18-§19 · It also stays out of the way of the other two concepts: a
   brief is saved reasoning, the baseline is the reference for deltas,
   and the current analysis is what Overview shows. Nothing here
   approves, locks or signs anything off.
   ═══════════════════════════════════════════════════════════════ */
const briefRow = (label, body, sr) => `
<div style="display:flex;align-items:flex-start;gap:16px;padding:11px 0;border-top:1px solid var(--hair)">
  <span class="t-meta" style="width:132px;flex:none;padding-top:2px">${label}</span>
  <span style="flex:1;min-width:0;font-size:12.5px;color:var(--s900);line-height:1.55">${body}</span>
  ${sr ? `<span style="flex:none">${sr}</span>` : ""}
</div>`;

const decisionBrief = () => {
  const base = acMetrics(AC("base")), high = acMetrics(AC("high"));
  return capabilityModal({
    title: "Save decision brief", context: "Valencia BESS · Compare", accent: SU, source: src("suite"),
    openIn: "Saved briefs", width: 720,
    footNote: "A brief records reasoning, not approval. Nothing here is signed off or locked, and the figures re-read from both products when it is reopened.",
    cancel: "Cancel", confirm: "Save decision brief",
    body: `
    <div style="padding:22px 24px">
      ${field("Decision question", "Is 4 h storage worth the additional CAPEX?", { req: true,
        help: "The question this comparison exists to answer. It is what the brief is filed under." })}

      <div class="wash" style="padding:16px 18px;margin-top:4px">
        <div class="band" style="font-size:10px;color:var(--su700)">Captured from this comparison</div>
        <div style="margin-top:6px">
          ${briefRow("Objective", `Maximise NPV`, src("revenew"))}
          ${briefRow("Constraints", CRITERIA.map(({ key, target }) => {
            const k = CRIT_SPEC[key]; return `${k.label} ${k.op} ${k.fmt(target)}`;
          }).join(" · ") || "None")}
          ${briefRow("Baseline", AC("base").name, src("suite"))}
          ${briefRow("Cases compared", ACASES.map((a) => a.name).join(" · "), src("suite"))}
          ${briefRow("Key deltas",
            `High storage: +€${(high.capex - base.capex).toFixed(1)}M CAPEX → ${eurMs(high.npv - base.npv)} NPV, ${(high.irr - base.irr).toFixed(1)} pp IRR`,
            src("combined"))}
          ${briefRow("Sensitivity", `Base 2 h 9.6–13.4% IRR · 4 h variant 10.0–14.1% IRR across the three financial cases`, src("combined"))}
          ${briefRow("Trade-off",
            `The extra €${(high.capex - base.capex).toFixed(1)}M adds ${eurMs(high.npv - base.npv)} of absolute value but improves return on capital by only ${(high.irr - base.irr).toFixed(1)} pp.`,
            src("combined"))}
          ${briefRow("Data status",
            `<span style="display:inline-flex;align-items:center;gap:8px">${staleTag()}<span class="t-meta">Stress test — excluded from the deterministic conclusions</span></span>`)}
          ${briefRow("Saved by", "Victor Andújar · 21 August 2026, 14:22")}
        </div>
      </div>

      ${field("Decision note", "Proceed with Base 2 h for now; High storage only becomes attractive under High spread assumptions.", {
        help: "Optional, and yours to write. The Suite never generates this." })}
    </div>`,
  });
};

writeFileSync("DecisionBrief.dc.html", doc({ w: 1440, h: 2700, side: projectSide("compare"),
  body: alternativesBody(), overlay: decisionBrief() }));
console.log("DecisionBrief.dc.html");

writeFileSync("CompareAlternatives.dc.html",
  doc({ w: 1440, h: 2700, side: projectSide("compare"), body: alternativesBody() }));

/* ═══════════════════════════════════════════════════════════════
   §3 · SIGN IN — the way into the Suite
   The set had no entry point of its own, so the first thing a user
   saw was a product they had not chosen. This screen does one job
   besides authenticating: it says WHICH layer is being opened. The
   provenance dots do that work here exactly as they do on every
   figure elsewhere — teal for the Suite, blue and magenta for the
   two engines it reads from, which keep their own sign-in.
   ═══════════════════════════════════════════════════════════════ */
const authField = (label, value, { help, masked, action } = {}) => `
<div style="margin-top:16px">
  <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:7px">
    <span style="flex:1;min-width:0;font-size:12px;font-weight:600;color:var(--s700)">${label}</span>
    ${action ? `<a href="#" style="flex:none;font-size:11.5px;font-weight:500">${action}</a>` : ""}
  </div>
  <div style="display:flex;align-items:center;height:44px;padding:0 14px;gap:9px;border-radius:var(--r-xs);font-size:13.5px;
       color:${masked ? "var(--s700)" : "var(--s900)"};letter-spacing:${masked ? ".14em" : "normal"};
       background:linear-gradient(168deg,rgba(255,255,255,.72),rgba(255,255,255,.5));border:1px solid rgba(255,255,255,.9);
       box-shadow:0 0 0 1px rgba(14,157,168,.09), inset 0 1px 0 rgba(255,255,255,.94)">
    <span style="flex:1;min-width:0">${value}</span>
    ${masked ? `<span style="color:var(--s400);display:flex;letter-spacing:normal" title="Show password">${ic("eye", 16, 1.6)}</span>` : ""}
  </div>
  ${help ? `<span style="display:block;font-size:11px;color:var(--s400);margin-top:7px;line-height:1.45">${help}</span>` : ""}
</div>`;

const login = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <style>${CSS}</style>
</helmet>
<div class="atmos" style="width:1440px;min-height:900px;position:relative">
  <div class="focus"></div>
  <div style="position:relative;z-index:1;min-height:900px;display:flex;align-items:center;justify-content:center;padding:56px 72px">
    <div style="display:flex;align-items:center;gap:88px;width:100%;max-width:1120px">

      <!-- what you are entering, said in the same dots the product uses everywhere -->
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:12px">
          ${suiteMark(32)}
          <div>
            <div style="font-size:16px;font-weight:700;letter-spacing:-.015em;color:var(--s900);line-height:1.1">Sunveon</div>
            <div style="font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--su700);line-height:1.1;margin-top:3px">Suite</div>
          </div>
        </div>

        <h1 style="font-size:38px;font-weight:700;letter-spacing:-.028em;line-height:1.16;color:var(--s900);margin-top:34px;max-width:17ch">
          One project, two engines, one decision</h1>
        <p style="font-size:15px;line-height:1.65;color:var(--s500);margin-top:16px;max-width:48ch">
          Pair a StoreBrid simulation with a ReveNew financial case, compare the pairings that matter, and decide with both sides on the same page.
        </p>

        <div class="wash" style="padding:20px 22px;margin-top:32px;max-width:52ch">
          <div class="band" style="color:var(--su700)">You are signing in to</div>
          <div style="display:flex;align-items:flex-start;gap:12px;margin-top:13px">
            <span style="flex:none;padding-top:1px">${src("suite")}</span>
            <span style="flex:1;min-width:0;font-size:12.5px;color:var(--s700);line-height:1.55">
              The decision layer. It reads from both products and owns nothing but the pairing.
            </span>
          </div>
          <div class="hr" style="margin:15px 0"></div>
          <div class="band">Opened from inside a project</div>
          <div style="display:flex;align-items:flex-start;gap:12px;margin-top:13px">
            <span style="flex:none;display:inline-flex;gap:6px;padding-top:1px">${src("storebrid")}${src("revenew")}</span>
            <span style="flex:1;min-width:0;font-size:12.5px;color:var(--s700);line-height:1.55">
              Each engine keeps its own sign-in. Your licences decide which of them open.
            </span>
          </div>
        </div>
      </div>

      <!-- the card -->
      <div style="width:404px;flex:none">
        <section class="panel lift" style="position:relative;overflow:hidden;padding:30px 32px 28px">
          <span style="position:absolute;left:0;right:0;top:0;height:2px;display:block;z-index:3;
                background:linear-gradient(90deg,${SU}00,${SU}cc 18%,${SU}cc 82%,${SU}00)"></span>
          <div style="display:flex;align-items:center;gap:10px">
            <h2 class="t-card" style="font-size:19px;flex:1;min-width:0">Sign in</h2>${src("suite")}
          </div>
          <p class="t-meta" style="margin-top:7px;line-height:1.5">Use your Sunveon Energy account.</p>

          ${authField("Work email", "victor.andujar@sunveon.energy")}
          ${authField("Password", "••••••••••••", { masked: true, action: "Forgot password?" })}

          <div style="display:flex;align-items:center;gap:9px;margin-top:16px">
            <span style="width:15px;height:15px;flex:none;border-radius:4px;display:flex;align-items:center;justify-content:center;
                  background:${SU};color:#fff">${ic("check", 10, 2.8)}</span>
            <span style="font-size:12.5px;color:var(--s700)">Keep me signed in on this device</span>
          </div>

          <button class="btn btn-primary" style="width:100%;height:44px;margin-top:20px;justify-content:center">
            Continue to the Suite${ic("right", 15, 2)}</button>

          <div style="display:flex;align-items:center;gap:12px;margin:18px 0">
            <span class="hr" style="flex:1"></span>
            <span class="t-meta">or</span>
            <span class="hr" style="flex:1"></span>
          </div>
          <button class="btn btn-secondary" style="width:100%;height:42px;justify-content:center">
            ${ic("link", 16, 1.7)}Continue with Sunveon SSO</button>

          <p class="t-meta" style="margin-top:18px;line-height:1.55;text-align:center">
            No account yet? Your organisation administrator issues Suite access.
          </p>
        </section>

        <p class="t-meta" style="margin-top:16px;line-height:1.6;text-align:center">
          Signing in here opens the layer above StoreBrid and ReveNew.<br>Nothing is modelled in the Suite.
        </p>
      </div>

    </div>
  </div>
</div>
</x-dc>
<script data-dc-script data-props='{"$preview":{"width":1440,"height":900}}'>
class Component extends DCLogic {}
</script>
</body>
</html>
`;
writeFileSync("Login.dc.html", login);
console.log("Login.dc.html", login.length);

/* §2 · the full table as its own destination, one level below Compare. */
writeFileSync("CompareAllMetrics.dc.html",
  doc({ w: 1440, h: 3520, side: projectSide("compare"), body: alternativesBody({ detail: true }) }));
console.log("CompareAllMetrics.dc.html");

/* ═══════════════════════════════════════════════════════════════
   DECK SLIDES — purpose-made 16:9 pages for the client deck.
   They reuse the Suite's own type, colour and surface system so the
   framing slides sit in the same world as the product screens.
   Written to export/, never onto the canvas.
   ═══════════════════════════════════════════════════════════════ */
const SLIDE = { w: 1440, h: 810 };
const slideDoc = (body) => `<!doctype html><html><head><meta charset="utf-8">
<style>${CSS}</style></head><body>
<div class="atmos" style="width:${SLIDE.w}px;height:${SLIDE.h}px;position:relative;overflow:hidden">
  <div class="focus"></div>
  <div style="position:relative;z-index:1;height:100%;padding:64px 76px;display:flex;flex-direction:column">${body}</div>
</div></body></html>`;

const chain = (steps) => `
<div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
  ${steps.map(([label, sub, dot], i) => `
    <span style="display:flex;align-items:center;gap:14px">
      <span class="wash" style="padding:16px 20px;min-width:150px">
        <span style="display:flex;align-items:center;gap:8px">
          ${dot ? `<i style="width:6px;height:6px;flex:none;border-radius:50%;background:${dot};display:block"></i>` : ""}
          <span style="font-size:14px;font-weight:600;color:var(--s900)">${label}</span>
        </span>
        <span class="t-meta" style="display:block;margin-top:5px">${sub}</span>
      </span>
      ${i < steps.length - 1 ? `<span style="color:var(--s400);display:flex">${ic("right", 17, 2)}</span>` : ""}
    </span>`).join("")}
</div>`;

writeFileSync("export/slides/01-cover.html", slideDoc(`
<div style="flex:1;display:flex;flex-direction:column;justify-content:center;max-width:96ch">
  <div style="display:flex;align-items:center;gap:12px">${suiteMark(34)}
    <span><span style="display:block;font-size:17px;font-weight:700;letter-spacing:-.015em;color:var(--s900)">Sunveon</span>
    <span style="display:block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--su700);margin-top:2px">Suite</span></span>
  </div>
  <h1 style="font-size:52px;font-weight:700;letter-spacing:-.03em;line-height:1.1;color:var(--s900);margin-top:38px;max-width:22ch">
    StoreBrid + ReveNew como un único espacio de decisión</h1>
  <p style="font-size:19px;line-height:1.55;color:var(--s500);margin-top:22px;max-width:62ch">
    Propuesta de integración UX. Arquitectura de información, flujos y pantallas del Project Workspace.</p>
  <div style="margin-top:44px">${chain([["StoreBrid", "Motor técnico", SB], ["Sunveon Suite", "Capa de decisión", SU], ["ReveNew", "Motor financiero", RN]])}</div>
</div>
<div style="display:flex;align-items:center;gap:12px;padding-top:22px;border-top:1px solid var(--hair)">
  <span class="t-meta" style="flex:1">Sunveon Energy · propuesta de diseño</span>
  <span class="t-meta">Agosto 2026</span>
</div>`));

writeFileSync("export/slides/02-value.html", slideDoc(`
<div class="band" style="font-size:12px">Propuesta de valor</div>
<h1 style="font-size:36px;font-weight:700;letter-spacing:-.026em;line-height:1.18;color:var(--s900);margin-top:14px;max-width:34ch">
  Por qué esta integración importa</h1>
<div style="display:flex;gap:22px;margin-top:32px">
  ${[["El problema que resuelve",
      "Hoy la decisión vive entre dos aplicaciones. StoreBrid sabe qué puede hacer el activo; ReveNew sabe qué produce económicamente. Nadie ve las dos cosas a la vez, y decidir obliga a saltar, exportar y reconciliar a mano.", SU],
     ["Para quién",
      "Para quien decide la configuración de un proyecto: ingeniería que necesita saber qué vale técnicamente una decisión, y negocio que necesita saber qué activo hay detrás de un NPV.", SB],
     ["Qué lo diferencia",
      "No es un dashboard que junta métricas de ambos. Introduce un objeto propio — el analysis case, una simulación técnica emparejada con un caso financiero — y compara esas parejas completas mostrando qué cambió técnicamente, cuánto costó y qué retorno produjo.", RN]].map(([t, b, dot]) => `
    <div class="panel" style="flex:1;min-width:0;padding:26px 28px;display:flex;flex-direction:column">
      <i style="width:8px;height:8px;border-radius:50%;background:${dot};display:block"></i>
      <div class="t-card" style="font-size:18px;margin-top:16px">${t}</div>
      <p style="font-size:14.5px;line-height:1.65;color:var(--s700);margin-top:12px">${b}</p>
    </div>`).join("")}
</div>
<div style="flex:1"></div>
<div class="panel lift combined" style="padding:22px 26px;margin-top:22px;border:1px solid rgba(255,255,255,.9)">
  <p style="font-size:16px;line-height:1.6;color:var(--s900);max-width:118ch">
    <b style="font-weight:600">La regla de producto:</b> si algo solo sirve para configurar en profundidad uno de los dos motores, se queda en StoreBrid o en ReveNew.
    Si ayuda a entender el impacto conjunto, comparar alternativas o decidir, vive en la Suite.
  </p>
</div>`));

writeFileSync("export/slides/03-model.html", slideDoc(`
<div class="band" style="font-size:12px">Modelo de producto</div>
<h1 style="font-size:36px;font-weight:700;letter-spacing:-.026em;line-height:1.18;color:var(--s900);margin-top:14px;max-width:36ch">
  Un proyecto, dos motores, un objeto de análisis</h1>
<div style="margin-top:34px">${chain([["Proyecto", "entidad compartida", SU],
  ["Simulación técnica", "StoreBrid", SB], ["Caso financiero", "ReveNew", RN], ["Analysis case", "Suite", SU]])}</div>
<div style="display:flex;gap:22px;margin-top:34px;flex:1">
  <div class="panel" style="flex:1.1;min-width:0;padding:26px 28px">
    <div class="band" style="color:var(--su700)">Qué es un analysis case</div>
    <p style="font-size:15px;line-height:1.65;color:var(--s700);margin-top:12px">
      Una pareja guardada y con nombre: una simulación de StoreBrid y un caso financiero de ReveNew.
      No es otra simulación ni otro modelo financiero — es la unidad que se entiende y se compara.
    </p>
    <div class="rows" style="margin-top:16px">
      ${ACASES.map((a) => {
        const c = acCase(a), m = acMetrics(a);
        return `<div style="display:flex;align-items:center;gap:12px;padding:12px 0">
          <span style="flex:1.1;min-width:0;font-size:14px;font-weight:600;color:var(--s900)">${a.name}</span>
          <span style="flex:1;min-width:0;display:flex;align-items:center;gap:6px">
            <i style="width:5px;height:5px;flex:none;border-radius:50%;background:${SB};display:block"></i>
            <span class="t-meta">${c.t.short}</span></span>
          <span style="flex:1;min-width:0;display:flex;align-items:center;gap:6px">
            <i style="width:5px;height:5px;flex:none;border-radius:50%;background:${RN};display:block"></i>
            <span class="t-meta">${c.sc.name}</span></span>
          <span style="flex:none;font-size:14px;font-weight:700;color:var(--s900);font-variant-numeric:tabular-nums">${eurMs(m.npv)}</span>
        </div>`;
      }).join("")}
    </div>
  </div>
  <div class="panel" style="flex:1;min-width:0;padding:26px 28px">
    <div class="band">El recorrido</div>
    <div style="margin-top:16px">
      ${[["Understand", "Qué estoy analizando ahora mismo"],
         ["Explore", "Qué combinaciones existen y cuáles interesan"],
         ["Compare", "Qué cambia entre las que me importan"],
         ["Decide", "Cuál pasa a ser el análisis actual"],
         ["Deep edit", "Abrir StoreBrid o ReveNew solo si hace falta"]].map(([t, d], i) => `
        <div style="display:flex;align-items:flex-start;gap:14px;padding:11px 0;${i ? "border-top:1px solid var(--hair)" : ""}">
          <span style="width:22px;height:22px;flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;
                background:rgba(14,157,168,.12);color:var(--su700);font-size:11px;font-weight:700">${i + 1}</span>
          <span style="min-width:0">
            <span style="display:block;font-size:14px;font-weight:600;color:var(--s900)">${t}</span>
            <span class="t-meta" style="display:block;margin-top:3px">${d}</span>
          </span>
        </div>`).join("")}
    </div>
  </div>
</div>`));

writeFileSync("export/slides/99-close.html", slideDoc(`
<div style="flex:1;display:flex;flex-direction:column;justify-content:center;max-width:100ch">
  <div class="band" style="font-size:12px">En una frase</div>
  <p style="font-size:34px;font-weight:600;letter-spacing:-.022em;line-height:1.32;color:var(--s900);margin-top:20px">
    StoreBrid explica qué puede hacer técnicamente el activo. ReveNew explica qué resultado económico produce.
    <span style="color:var(--su700)">La Suite conecta ambas perspectivas para explorar alternativas, comparar trade-offs y decidir con contexto.</span>
  </p>
  <div style="margin-top:44px">${chain([["StoreBrid", "Modelar", SB], ["Suite", "Entender", SU], ["Suite", "Comparar", SU], ["Usuario", "Decidir", null], ["ReveNew", "Modelar", RN]])}</div>
</div>
<div style="display:flex;align-items:center;gap:12px;padding-top:22px;border-top:1px solid var(--hair)">
  <span class="t-meta" style="flex:1">Los valores numéricos del prototipo son ilustrativos y deben validarse contra los datos reales de StoreBrid y ReveNew.</span>
</div>`));
console.log("deck slides -> export/slides");

/* ── canvas manifest ─────────────────────────────────────────────
   Three pages following the phase order: what is approved, the
   project model that surrounds it, and the platform on top.      */
const COLX = [0, 1560, 3120];
const PAGES = [
  { id: "page-1", name: "Project workspace", rows: [
    [["ProjectOverview.dc.html", 1440, 2670, "1 · Overview"],
     ["CaseMatrix.dc.html", 1440, 3370, "2 · Case matrix"],
     ["CaseMatrixRobustness.dc.html", 1440, 1085, "2b · Case matrix — robustness"],
     ["CaseMatrixUnevaluated.dc.html", 1440, 3370, "2c · Case matrix — evaluation states"],
     ["CompareAlternatives.dc.html", 1440, 2820, "3 · Compare"],
     ["CompareAllMetrics.dc.html", 1440, 3645, "3b · Compare — all metrics"],
     ["DecisionBrief.dc.html", 1440, 2820, "3c · Save decision brief"]],
    [["OverviewChangeSim.dc.html", 1440, 2670, "4 · Change technical simulation"],
     ["OverviewChangeScenario.dc.html", 1440, 2670, "5 · Change financial case"],
     ["OverviewTechnical.dc.html", 1440, 2670, "6 · Technical details"]],
    [["FinancialDetails.dc.html", 1440, 1160, "7 · Financial details"],
     ["CreateAnalysisCase.dc.html", 1440, 2820, "8 · Create analysis case"],
     ["CaseCreated.dc.html", 1440, 3370, "8b · Analysis case created"],
     ["CreateCaseUnpriced.dc.html", 1440, 2820, "8c · Create — pairing not priced"],
     ["CompareExplained.dc.html", 1440, 1675, "9 · Explain difference"]],
    [["OverviewStale.dc.html", 1440, 2760, "10 · Financial results outdated"],
     ["EditProjectDetails.dc.html", 1440, 2670, "11 · Project details"]],
  ]},
  { id: "page-2", name: "Suite", rows: [
    [["Login.dc.html", 1440, 900, "Sign in"],
     ["NeedsAttention.dc.html", 1440, 2040, "Needs attention"]],
    [["Main.dc.html", 1440, 2040, "Home"],
     ["Projects.dc.html", 1440, 800, "Projects"],
     ["CreateProject.dc.html", 1440, 1380, "Create project"]],
    [["Analytics.dc.html", 1440, 3230, "Analytics"],
     ["Files.dc.html", 1440, 870, "Files"],
     ["Activity.dc.html", 1440, 1280, "Activity"]],
    [["Settings.dc.html", 1440, 1600, "Settings"],
     ["ActivityDecisions.dc.html", 1440, 1180, "Activity — analysis & decisions"]],
  ]},
  { id: "page-3", name: "States, licences & patterns", rows: [
    [["ProjectStoreBrid.dc.html", 1440, 1170, "Project — engineering licence"],
     ["ProjectReveNew.dc.html", 1440, 1140, "Project — financial licence"],
     ["ProjectNew.dc.html", 1440, 1020, "New project"],
     ["ProjectAnalysisReady.dc.html", 1440, 1140, "New project — first analysis ready"]],
    [["States.dc.html", 1440, 850, "Empty and unavailable"],
     ["Administration.dc.html", 1440, 1200, "Administration & licences"],
     ["SourceAttribution.dc.html", 860, 1130, "Patterns"]],
    [["Flows.dc.html", 1440, 1760, "End-to-end flows"]],
  ]},
];

const NOTES = {
  "ProjectAnalysisReady.dc.html": ["n-ready", "NEW PROJECT — FIRST ANALYSIS READY\n\nOnboarding used to end at two links out, leaving the user inside whichever product they clicked. It is a three-phase loop now: StoreBrid configures its half, ReveNew configures its half, and the third phase is the Suite claiming the analysis back the moment both exist.\n\nThe third step is not a fourth link — it is the reason the first two were worth doing. Until both halves exist it stays visibly out of reach and says why: pairing needs one of each, and the Suite never models either half.\n\nThis is the retention loop in its smallest form. A project configured across two separate products gives nobody a reason to come back; a project whose first combination is waiting does."],
  "DecisionBrief.dc.html": ["n-brief", "3c · SAVE DECISION BRIEF\n\nSaving a comparison kept a set of chips. What it never kept was the reasoning: what question was being asked, what was being optimised, what would not be accepted, and what the person concluded.\n\nEverything in the captured block already exists on the screen — objective, constraints, baseline, cases, deltas, sensitivity, trade-off, data status. So the brief is a capture step, not a new module, and it asks for exactly two things the product cannot derive: the question and the note. The note is explicitly the user's to write; nothing generates it.\n\nIt stays out of the way of the other two concepts. A brief is saved reasoning; the baseline is the reference deltas are measured against; the current analysis is what Overview shows. And it stops short of governance — no approvals, no sign-off, no locking. The figures re-read from both products when it is reopened, so a brief follows its sources instead of freezing a copy of them."],
  "CaseMatrixUnevaluated.dc.html": ["n-uneval", "2c · CASE MATRIX — EVALUATION STATES\n\nEvery other screen assumes a combination can be read live, because that is what the current architecture implies. If evaluating one turns out to cost something, the matrix must not draw a number that does not exist yet.\n\nSo the cell has a second life cycle beside its freshness one: NOT EVALUATED with a Calculate action, CALCULATING while it runs, then AVAILABLE. Saved analysis cases are always available — they were evaluated when they were named. The layout does not change; only what the cell is allowed to claim.\n\nDesigned so the product can ship against either backend model without a redesign, and so nobody has to decide the architecture to unblock the design."],
  "CaseMatrixRobustness.dc.html": ["n-robust", "2b · CASE MATRIX — ROBUSTNESS\n\nThe same screen, second tab. The matrix already holds every asset against every financial case, so the spread of a row is free information: how much of the outcome the market decides rather than the asset.\n\nThe language is constrained by what the data actually is. Three financial cases are three modelled views; they carry no probabilities. So this reads as a RANGE, never a distribution — no risk, no confidence, no expected value, and nothing weighted, because weighting needs probabilities nobody supplied.\n\nThe three summaries — highest upside, highest floor, smallest variation — are readings, not a ranking. Which of them matters depends on the decision, and the Suite has no way to know that. Note the honest tie: two configurations move by the same 3.8 pp, and the card says so rather than picking one."],
  "ActivityDecisions.dc.html": ["n-actdec", "ACTIVITY — ANALYSIS & DECISIONS\n\nThe same screen with a second filter axis. Provenance answers WHICH PRODUCT did it; this one answers WHAT KIND of thing happened — and the kind people come looking for is the decision.\n\nWhere the current analysis changed, the row keeps the figures each pairing produced at that moment: what was active, what replaced it, what each was worth. That answers \"what was active before, what replaced it, when, and who changed it\" without turning Activity into an audit screen.\n\nThis is why there is no Decision History page. With these two filters, one would be the same events under a second name."],
  "NeedsAttention.dc.html": ["n-attn", "NEEDS ATTENTION — portfolio scale\n\nNEW. Every screen could already say a result was outdated; none of them could say it across projects. Someone with forty projects had no way to find the three that need recalculating except by opening all forty.\n\nIt is deliberately NOT a notification centre. Staleness is a persistent condition, not an event: it does not clear because someone looked at it, and it comes back the moment a simulation is re-run. So there is no read/unread, no dismiss, and no history — a case leaves the list when both sides are back in step, and the panel says so.\n\nEach row carries only what is needed to decide whether to act: whose project, which analysis case, which side fell behind, and the deep link that fixes it. It does not restate the case's figures, because deciding from inside a notification panel is exactly what it should not invite.\n\nThe same panel opens from the sidebar indicator and from the Home counter — one destination, not two."],
  "Login.dc.html": ["n-login", "SIGN IN\n\nNEW. The set had no entry point of its own — StoreBrid has one, the Suite did not, so the first screen a user met was a product they had not chosen.\n\nIt authenticates, and it does one more job: it says which layer is opening. The provenance dots carry that here exactly as they carry it on every figure elsewhere — teal for the Suite, blue and magenta for the two engines it reads from.\n\nThe copy is explicit that StoreBrid and ReveNew keep their own sign-in, and that nothing is modelled in the Suite. The boundary is stated before the user is inside it."],
  "CompareAllMetrics.dc.html": ["n-allmetrics", "3b · COMPARE — ALL METRICS\n\nThe full table, one level below Compare rather than beside it.\n\nDeltas before density: the horizontal worse/better bars carry the decision, so the table is collapsed by default behind \"Show all metrics\" and, when open, labels itself DETAIL LEVEL. Nothing was removed — it stopped competing with the reading it exists to check.\n\nGrouping stays by owner, so any figure quoted above can be traced to the product that produced it."],
  "OverviewStale.dc.html": ["n-stale", "6 · OUT OF SYNC\n\nThe state that two engines make necessary. The simulation was re-run 12 minutes ago; the financial case was last calculated 4 hours ago, so the figures below are the earlier calculation.\n\nIt names what changed, which side is behind, and where to fix it. The rest of the page still renders — hiding the numbers would be worse than labelling them."],
  "OverviewTechnical.dc.html": ["n-techdet", "4 · TECHNICAL DETAILS\n\nProgressive disclosure instead of a Technical Results page. Configuration, operation, degradation and the dispatch chart — read-only, one level down from the KPIs that prompted the question.\n\nThe rule this drawer encodes: the Suite shows enough to understand why you might open StoreBrid. It does not try to be StoreBrid."],
  "FinancialDetails.dc.html": ["n-findet", "5 · FINANCIAL BREAKDOWN\n\nThe financial counterpart: Forecast, Energy, Revenue, Costs and Financial Model in one read-only drawer.\n\nThis is where ReveNew's internal structure is allowed to appear — as supporting detail explaining a number, never as navigation. Nothing here is editable; the only action is Open in ReveNew."],
  "CreateAnalysisCase.dc.html": ["n-createac", "8 · CREATE AN ANALYSIS CASE\n\nCHANGED. This was a name and two closed dropdowns, which put the one moment where the two products actually meet behind two clicks that showed nothing. Both catalogues are open now, side by side, each in its owner's colour — the only screen in the set where StoreBrid and ReveNew face each other as equals, because that symmetry is what the act is.\n\nEvery option carries what it would produce AGAINST THE HALF ALREADY CHOSEN: pick the 4 h variant and each financial case shows the IRR and NPV that pairing would have. Choosing stops being a guess followed by a check.\n\nIt also shows what already exists, so nobody recreates it. Base market is already High storage; Low spread is already Stress test, and outdated. The band underneath reads the pairing that results.\n\nStill deliberately thin: one step, no wizard, no CRUD module, no draft. The Suite writes down a name and two references — the name is the only thing on the screen neither product already holds. Creating one in StoreBrid or ReveNew stays in StoreBrid or ReveNew, and the two footers say so.\n\nThe matrix explores all nine combinations; this picker shows the three-plus-three slice around the choice being made. They answer different questions and neither replaces the other."],
  "CaseCreated.dc.html": ["n-accreated", "8b · ANALYSIS CASE CREATED\n\nNEW — the end of the flow, which had none. Creating a case closed a modal and returned the user to a matrix that looked exactly as it had; nothing said what had happened or what to do about it.\n\nThe cell now carries the name, Compare counts four, and the strip states the consequence in the Suite's own terms: the name and the two references were kept, nothing else — the figures go on being read from both products, so the case follows them instead of freezing a copy.\n\nDeliberately not a toast. Staleness taught the same lesson elsewhere in this set: a condition worth stating does not clear because someone glanced at it. It stays until one of the two moves worth making is made — carry it into Compare, or make it the current analysis and let Overview read from it."],
  "CreateCaseUnpriced.dc.html": ["n-acunpriced", "8c · CREATE — PAIRING NOT PRICED\n\nThe same screen under the architecture 2c is drawn against: where evaluating a combination costs something. Only pairings already saved as cases were priced when they were named, so the rest have no figure yet and the screen draws none.\n\nWhat changes is exactly one half of every reading. StoreBrid's side is known throughout — the asset is costed the moment the simulation is chosen — and it is the financial half that hollows out. That asymmetry is the dependency between the two products, drawn rather than described.\n\nCreation is still allowed. A case is a named reference, not a copy of a result, so naming an unpriced pairing is legitimate: ReveNew computes it and the figures fill in where the dashes are. The footer says so instead of blocking the action.\n\nAs with 2c, this exists so the product can ship against either backend model without a redesign."],
  "CompareAlternatives.dc.html": ["n-compare", "3 · COMPARE — where the decision is made\n\nRestructured for hierarchy: decision summary, deltas, technical → financial decomposition. The full metrics table is no longer part of this page — it is collapsed behind \"Show all metrics\" and opens as its own detail level. Nothing analytical was removed; the competition for the reader's attention was.\n\nThe freshness rule matters most here. Stress test's financial result predates the technical change, so it carries an Outdated tag, is excluded from the deterministic Best NPV / Best IRR / Lowest CAPEX conclusions, and the amber line says so. A stale result is never quietly labelled best.\n\n\"Use as current analysis\" appears when a case is selected — compare, choose, and Overview follows\n\nCHANGED. Each comparison block now opens with the trade-off in its shortest form — Requires −> Produces — and closes with a TRADE-OFF reading selected from the figures, never written: it tests the sign of the NPV move against the size of the IRR move, so it cannot claim more than the numbers support.\n\nFor High storage it reads that the extra capital adds absolute value without materially changing how hard the money works. For Stress test, that no capital is committed at all and the whole difference is what the market view is worth on the asset already built.\n\nCHANGED. The All combinations tab is gone. It duplicated the case matrix, and having two places to browse the same nine pairings blurred what each screen was for. Compare now has one continuous view and works only on saved analysis cases; exploring the full set is the matrix, and the subtitle links there.\n\nEach delta block also gained its own Explain difference entry, so someone who arrives straight at Compare can open the decomposition for one specific trade-off without going back to the matrix first."],
  "ProjectFinancial.dc.html": ["n-projfin", "4 · FINANCIALS\n\nScenarios became Financials. ReveNew has Forecast, Energy, Revenue, DevEx, CapEx, OpEx and Financial Model scenarios inside it; exposing that structure in the Suite would have been reproducing ReveNew.\n\nInstead: the five decision figures at the top, the financial case switcher above them, and CASE COMPOSITION underneath — the ReveNew scenarios this case selects, read-only, so a number can be traced without opening the model.\n\nThe line under the KPIs is the cross-product point: this result is priced against Base case 2027. A different simulation gives a different CAPEX and a different NPV."],
  "CasesBaseline.dc.html": ["n-casesbase", "ANALYSIS BASELINE MOVED\n\nThe same nine cases, read from 4 h variant + High spread instead of the project's own case.\n\nNothing was re-run, no scenario was edited and no value moved — only the reference the deltas count from. Every delta has flipped sign, and the question the page answers has flipped with it: not \"what does the 4 h buy us\" but \"what do we give up by not building it\".\n\nThe control says it is not the project baseline and offers the way back. That is the whole safety model for this feature."],
  "VariantEvaluating.dc.html": ["n-vareval", "11 · VARIANT · PRICING\n\nNEW — the middle stage that was missing.\n\nThe technical run has landed, so the StoreBrid figures are real: 92.4 GWh, 231 cycles, 79% utilisation. ReveNew is now pricing that same energy against the project's three scenarios, and the cases are still waiting.\n\nThis is the stage that makes the dependency legible: one technical run, three commercial evaluations, three cases."],
  "CompareSave.dc.html": ["n-savecmp", "8 · SAVE COMPARISON\n\nA comparison is an analysis someone made, not disposable UI state. What is kept is the minimum that makes it reproducible: the cases, the baseline they were read against, the primary metric, and the name of the question.\n\nValues are NOT frozen. They are re-read from StoreBrid and ReveNew when the comparison is reopened, so a saved analysis follows its sources — which is also why Export decision brief sits beside it rather than instead of it."],
  "CompareExplained.dc.html": ["n-explained", "10 · EXPLAIN A DIFFERENCE\n\nA state of Compare, reached from a selected cell. Both dimensions moved between the baseline and this case, so the two combinations that isolate one change each were added from the matrix — nothing was calculated to do it.\n\nThe contribution panel shows both controlled orders and names the residual, because the split depends on which dimension moves first. The Suite reports the difference associated with each step; it never claims a cause.\n\nENTRY POINTS. Reached from a selected matrix cell or from a single delta block in Compare. Either way it opens with the comparison already assembled and the baseline preserved — the controlled intermediates are added from combinations that already exist, and they are never saved as analysis cases. Their use is explanatory; they leave when the explanation does."],
  "CaseMatrixCapex.dc.html": ["n-mx-capex", "CAPEX — a StoreBrid output\n\nThe other row-constant metric, and the one where colour semantics had to be corrected: an earlier pass painted the cheapest cell green and the priciest red. Lower CAPEX is not better, it is only less. Markers, wash and deltas are all neutral here.\n\nThe third highlight is the honest finding: nothing in this matrix costs less than the baseline and beats it — Low RTE saves €0.9M and gives up 1.3 pp of return.\n\nThe chart's annotation is the reading that matters: €211/kWh installed at 2 h against €127/kWh at 4 h. Unit cost falls with duration because the power equipment and the grid connection are already paid for."],
  "CaseMatrixEnergy.dc.html": ["n-mx-gwh", "ENERGY DISCHARGED — a StoreBrid output\n\nStructurally different, and deliberately so. This metric does not vary by financial scenario: these simulations were dispatched against one price signal and the Suite does not re-run them per scenario. So each row collapses to ONE value across all three columns, with a band saying why.\n\nNo invented scenario-dependent difference, and no green: the markers read Most and Least in slate, because more throughput is a fact, not a recommendation.\n\nThe reading worth having: doubling storage adds 41.7% more energy, not 100%. Power and the export limit did not move, so the extra capacity discharges over more hours — never faster."],
  "CaseMatrixPerCycle.dc.html": ["n-mx-cyc", "REVENUE / CYCLE\n\nThe bridge between the financial result and the cell replacement schedule: warranties and degradation curves are written against cycles, not against euros.\n\nThe third highlight is a warning rather than a winner. Per-cycle value is high on the 4 h variant mainly because each cycle is twice the size — not because the energy sells better. A battery that never cycles has infinite value per cycle and no revenue, which is why this is a supporting metric and never a ranking on its own."],
  "CaseMatrixPerMwh.dc.html": ["n-mx-mwh", "REVENUE / MWH DISCHARGED\n\nThe metric that separates a bigger asset from a better one, and the tab where the ranking flips: Base 2 h + High spread leads, and the revenue leader drops to third.\n\nA two-hour battery discharges only into the steepest part of the day. The 4 h variant reaches further down the price curve to place its extra energy, so it earns more in total and less for each MWh. Neither is wrong — they are different products, and the downward slope in the chart is that trade-off drawn once."],
  "CaseMatrixRevenue.dc.html": ["n-mx-rev", "ANNUAL REVENUE\n\nA pure ReveNew figure, and the one most likely to be misread — which is why the third highlight is not a case at all but a price tag: the revenue leader costs €8.6M more to build.\n\nRevenue rises with duration and with spread, but only one of those was bought. A configuration can lead this tab simply by being larger. The chart plots revenue against CAPEX for exactly that reason: high AND far right means the revenue was bought with capital."],
  "ProjectOverview.dc.html": ["n-overview", "1 · OVERVIEW — what am I currently analysing?\n\nThe current analysis case, its two halves with their provenance and freshness, and the result they produce together.\n\nCAPEX now shows lineage rather than a single owner: costed in StoreBrid, consumed by the ReveNew financial model. Both products touch it, and the UI stops pretending otherwise.\n\nThe chart title changed from \"Does more storage improve the return?\" to \"Storage investment against return\". The three analysis cases do not hold the financial case constant, so a causal question would be claiming more than the data supports\n\nCHANGED. A READING band now sits between the pairing and the evidence: one deterministic sentence turning CAPEX, NPV and energy discharged into what the configuration actually does with money. Every figure in it is derived, so it cannot drift from the cards below.\n\nIt is deliberately not another KPI row — NPV, IRR, GWh and utilisation all appear within 300px of it. What was missing between the pairing and the evidence was the reading, not more numbers.\n\n\"What this project has to combine\" became EXPLORE ALTERNATIVES: named by what the user does there, not by what the data is."],
  "SimulationOverview.dc.html": ["n-simov", "2 · SIMULATION OVERVIEW\n\nOpening a simulation from the Suite does not open the StoreBrid wizard. Six values define the technical case; layout, losses, degradation curves and dispatch strategy stay in StoreBrid.\n\nUnderneath: core results, then the same technical case against three ReveNew scenarios. Each pairing is a case.\n\nCHANGED. The technical KPI deltas now declare their referent — the previous run of this simulation, or for a variant, the simulation it was created from. This screen is now one component with three lifecycle states; artboards 10 and 11 are the other two."],
  "Results.dc.html": ["n-results", "3 · TECHNICAL RESULTS — three views, not thirty\n\nPower and state of charge; the energy balance; degradation. Daily graphs, heat maps, tables and CSV exports stay in StoreBrid.\n\nCHANGED. A FINANCIAL SUMMARY now sits under the technical results: the NPV, IRR and CAPEX of this same simulation under the current ReveNew scenario, with the scenario named and switchable.\n\nThat panel is the whole argument for a Suite in one screen — 65.2 GWh discharged is what earns €8.42M, and you can see both without changing application. Change the scenario and only the financial half moves."],
  "CommercialScenarios.dc.html": ["n-scen", "4 · COMMERCIAL SCENARIOS\n\nOne technical case, three ReveNew scenarios, read as a strip before any card is opened. The constant is stated: 65.2 GWh in every column, because the technical case does not change.\n\nCHANGED. The picker now has the action it was missing — Add selected — plus a scenario that cannot be evaluated at all, because it has no price curve in ReveNew. It is shown rather than hidden, and the fix links to where the fix lives. IRR moved into the Combined rows here too."],
  "CaseDetail.dc.html": ["n-casedet", "5 · CASE DETAIL — Base case 2027 + High spread\n\nThree columns: TECHNICAL CONTEXT, COMMERCIAL OUTCOME, COMBINED METRICS. Not \"cause\" and \"effect\" — the Suite states the pairing, it does not claim one produces the other.\n\nCHANGED. IRR left the ReveNew column and joined Combined, alongside Revenue / CAPEX; Merchant share took its place on the financial side. A freshness line at the top states when each side was last calculated, because two systems means two clocks."],
  "CaseMatrix.dc.html": ["n-matrix", "2 · CASE MATRIX — explore the combinations\n\nRenamed from \"Cases\", which collided with Financial Case and Analysis Case.\n\nThe distinction it now carries is the important one: 3 simulations × 3 financial cases = 9 POSSIBLE COMBINATIONS, of which 3 are saved as analysis cases. A combination becomes an analysis case only when someone names it. Every cell says which it is — the case name, or \"Not saved\" — and the selected cell offers \"Save as analysis case\" or, if it already is one, \"Use as current analysis\".\n\nThat second action is what closes the loop back to Overview.\n\nThe outdated cell is marked and greyed rather than shown as a valid result.\n\nCHANGED. The aggregate freshness notice Compare already carried now appears here too, under the header summary and before the grid: how many SAVED analysis cases are outdated, which one, and the deep link that fixes it. It also states the rule the empty cells depend on — the other six combinations are calculated live when a cell is opened, so they have no age to be stale against and are never marked\n\nCHANGED. Two additions make the matrix state its own value proposition. Above the grid, the leaders on the objectives NOT currently selected — highest NPV, lowest CAPEX, highest revenue per MWh — across all nine pairings, saved or not, outdated ones excluded. They are rankings, never preferences: the label names the objective and the user decides which objective matters.\n\nBelow the selected cell, WHY THIS PAIRING READS DIFFERENTLY decomposes the difference the way the domain splits it: what StoreBrid changed, what ReveNew changed, what came out of both. When only one dimension moved, the other column says so rather than inventing a contribution. When both moved, the panel refuses to split the cause and hands that to Explain difference, which builds the two controlled orders.\n\nHANDOFF. The two actions on a selected cell carry their selection with them. Add to comparison opens Compare with that pairing already in the comparison — as its analysis case if one is saved, otherwise under the product's existing rule for unsaved combinations; nothing is auto-named. Explain difference opens with the comparison already built, including the controlled intermediates needed to isolate one dimension at a time. Neither ever lands the user on an empty screen asking them to choose again.\n\nCHANGED. The matrix stopped asking which metric to display and started asking what the decision is for. The heading is now an objective — Maximise IRR, Minimise CAPEX — over the same six metrics, and DECISION CRITERIA sits above it: optional constraints on results that already exist. A criterion can only accept or reject a number StoreBrid or ReveNew produced; nothing here models anything, and storage size, prices and assumptions stay where they are edited.\n\nWith criteria set, the Suite can make a bounded claim it could not make before — \"highest IRR within your criteria\" is answerable because the user defined the criteria. The outright leader is still shown beside it when it differs, because that gap is exactly what the constraint costs. Combinations that fail are dimmed, never hidden: the user has to keep seeing the space they are ruling out.\n\nCriteria carry to Compare with the selection, the baseline and the objective."],
  "CaseMatrixCell.dc.html": ["n-matrixcell", "IRR · A CASE SELECTED\n\nClicking a cell does not leave the page. The panel opens under the grid with the five figures that matter, and three actions that each mean something different: make this the analysis baseline, add it to a comparison, or explain the difference.\n\nEXPLAIN DIFFERENCE is the important one. Both dimensions differ from the baseline here, so the panel refuses to attribute — and instead names the two cells that would isolate each change, which is exactly what the action opens Compare with.\n\nThe selection is a case, not a number, so it survives every metric change."],
  "CompareCases.dc.html": ["n-compcases", "8 · COMPARE CASES — the decision cockpit\n\nCHANGED SUBSTANTIALLY. The baseline and the metric are now real controls, not labels. Both are read by everything below them: change the baseline and every delta, the key changes, the bridge and the wording of the summary follow; change the metric and the bridge and the bar comparison follow with it.\n\nTHE SUMMARY IS GENERATED from the same figures the page shows, so it cannot describe a comparison that is not on screen.\n\nTHE BRIDGE IS NO LONGER IRR-ONLY and no longer hard-coded. It reads the selected metric, and it is drawn only when each step moved one dimension. Select two cases that differ on both and it refuses, in words, and says what to add.\n\nIncremental economics is unchanged in spirit and now derived: +€8.6M of CAPEX buys +27.2 GWh and +€2.25M a year, 3.8 years undiscounted. The data table is regrouped as Technical — StoreBrid / Financial — ReveNew / Combined — Suite, with CAPEX moved to Technical where it belongs and IRR to Combined."],
  "QuickVariant.dc.html": ["n-variant", "9 · CREATE TECHNICAL VARIANT\n\nFive levers, never the wizard. It states its own changes — storage 200 → 400 MWh, duration 2.0 → 4.0 h — and names everything that carries over untouched.\n\nThat matters because the whole comparison model rests on it: the original simulation is never modified, so every case already built on it stays valid."],
  "VariantRunning.dc.html": ["n-varrun", "10 · VARIANT · RUNNING\n\nThe pipeline, as operational status rather than a wizard: technical simulation → commercial evaluation → cases.\n\nStoreBrid is running. ReveNew cannot start — there is no energy to price yet — and the cases cannot exist until both are done. The KPIs below are skeletons, not stale numbers."],
  "VariantReady.dc.html": ["n-varready", "12 · VARIANT · CASES READY\n\nAll three stages complete. The primary action is now Explore 3 new cases, because that is what a variant actually produces — one simulation priced against every financial scenario in the project.\n\nThe deltas are measured against Base case 2027, the simulation this variant came from, not against a previous run it never had."],
  "EmbeddedWorkflow.dc.html": ["n-embed", "12 · EDIT FORECAST — the commercial equivalent of the variant\n\nThe ReveNew-owned capability the Suite hosts. Suite glass, ReveNew as provenance and accent; the shell, background and project context never move.\n\nCHANGED. It now edits a COMMERCIAL SCENARIO — High spread — rather than something confusingly named after a technical simulation. The footer states what the save does: it writes to ReveNew, and marks every case built on that scenario for recalculation. It does not touch StoreBrid, because the dependency only points one way."],
  "Main.dc.html": ["n-home", "HOME\n\nCHANGED. ReveNew is no longer represented through scenarios. The KPI row now counts the objects people actually work with — portfolios, simulations, financial models — alongside the two output figures.\n\n\"Portfolio\" was the word this page used for the whole organisation. That word now belongs to a real entity, so the panel is Workspace and RECENT PORTFOLIOS sits under Recent projects. Both levels of work, on the page you land on\n\nCHANGED. One portfolio-level freshness counter, inside the Analysis cases figure rather than beside it: the same amber badge the matrix cell and the Compare row use, reading \"3 need recalculation\", with a link to the filtered list. No project names here — a count and a way in, so the landing page does not turn into a work queue\n\nCHANGED. Home was a KPI dashboard: five inventory counts at equal weight, and the observations that actually need a decision tucked into a bottom corner. The counts now step back and NEEDS YOUR ATTENTION sits directly under Workspace, full width.\n\nEach card is an observation, the two figures that support it, and what it may mean — one technical number read against one financial number. Nothing is generated or recommended; they are subtractions over data that already exists. Conditions that need watching but no decision stay below as Portfolio conditions."],
  "Projects.dc.html": ["n-projects", "PROJECTS\n\nOne registry. The column is CAPABILITIES, never connection status."],
  "CreateProject.dc.html": ["n-create", "CREATE PROJECT\n\nThe Suite owns the shared context — name, type, currency, coordinates. The map is drawn, not tiled; an artboard has no network."],
  "Analytics.dc.html": ["n-analytics", "ANALYTICS — portfolio level\n\nAcross projects, where Cases work within one. The scatter neither product can draw, and the monthly view of when moving energy actually earns.\n\nCHANGED. The bubbles were all one colour, which stops being readable somewhere around fifteen projects — and a real portfolio has more. The field is now neutral and the Combined accent is spent only on the two or three assets Performance insights is actually reading out beside the chart. Colour stopped being decoration and became the pointer; the same rule now governs the compared-cases scatter.\n\nCHANGED. A portfolio-scale freshness notice sits under the KPI row, in the same component Compare and the case matrix use. It says how many analysis cases are outdated and that they are excluded from the figures above — which matters, because a portfolio average quietly computed over stale results is the failure this whole vocabulary exists to prevent."],
  "CompareProjects.dc.html": ["n-compare", "COMPARE PROJECTS — portfolio level\n\nKept for cross-project comparison. Inside a project, Compare Cases is the more frequent question."],
  "Workspace.dc.html": ["n-workspace", "SIMULATIONS — StoreBrid-owned\n\nSpecialist and clean: simulation, time-step, state, created. No ReveNew widgets. Opening a row leads to the Suite Simulation Overview, where cross-product analysis begins."],
  "Files.dc.html": ["n-files", "FILES — Suite-owned\n\nThe shared library both products read from.\n\nCHANGED. Every row now says what reads it — \"Related to Base market · High spread\", \"Related to Base case 2027 and its 2 variants\" — which is the field that makes a shared library worth having. \"Used by\" still records which PRODUCT reads a file; Replace keeps its type, project and everything pointing at it."],
  "FilesUpload.dc.html": ["n-upload", "UPLOAD FILE\n\nA focused Suite drawer. File type is the one required piece of metadata — it is what tells the Suite which product should read the file."],
  "Activity.dc.html": ["n-activity", "ACTIVITY\n\nCHANGED. The undefined \"All sources\" dropdown became the filter §26 asked for: All, StoreBrid, ReveNew, Suite, with counts.\n\nThe entries were audited too. A financial scenario is no longer named like a technical simulation, and \"Revenue case Base case 2026 recalculated\" became what actually happens in this product — three cases recalculated, named."],
  "Settings.dc.html": ["n-settings", "SETTINGS\n\nNEW. The sidebar had a Settings item that led nowhere.\n\nMinimal on purpose. Shared project context, the units and currency the Suite displays in, and four ANALYSIS DEFAULTS: the technical simulation and financial scenario Overview opens with, the baseline every delta is measured against, and the metric Compare opens with. Those four are genuinely Suite-owned — they are decisions about the pairing, which is the only thing the Suite owns.\n\nThe last row of cards is the boundary in plain sight: everything else is configured in StoreBrid or in ReveNew, and the card says which."],
  "StatesMatrix.dc.html": ["n-st-matrix", "A–E · CASE MATRIX STATES\n\nThree metrics side by side, and the same nine cases produce three different winners. That is the argument for a metric selector rather than a fixed column.\n\nTile E is the marker key: four states, four words, and the precedence between them. Tint only says roughly where to look — a reader who cannot separate the wash from the background loses nothing."],
  "StatesCompare.dc.html": ["n-st-compare", "F–N · COMPARE CASES STATES\n\nThe nine states §17–§24 asked for, compact.\n\nTwo are worth stopping on. Tile J moves the baseline to 4 h + High spread: the same three cases, measured from the other end, every delta flipped, and the question becomes \"what do we give up by not building it\". Tiles L show the same three cases under two metrics, with two different winners.\n\nNeither is a different screen. Both are the same page reading a different control."],
  "StatesVariant.dc.html": ["n-st-variant", "O–R · TECHNICAL VARIANT LIFECYCLE\n\nCreate, run, complete, appear in the matrix — the four states, in one row, at tile scale.\n\nThe rule the whole sequence protects: no financial figure exists before the technical run finishes, so none is shown. Skeletons, not stale numbers."],
  "StatesCommercial.dc.html": ["n-st-comm", "S–X · SCENARIOS AND FORECAST STATES\n\nAdding a scenario selects one that already exists in ReveNew — tile T shows what the user cannot see from the button they pressed: one scenario in, three cases out, one per technical simulation.\n\nTile U is the case that has to exist: a scenario with no price curve. Shown, not hidden; no partial case offered; the fix links to ReveNew.\n\nTiles V–X close §15. The save writes to ReveNew, and what it invalidates is the CASES built on that scenario — never the technical simulation, which does not depend on the forecast."],
  "StatesFiles.dc.html": ["n-st-files", "Y–AC · FILE STATES\n\nUpload, uploading, processing, ready, error.\n\nThe last tile is the more useful one: what Files deliberately is not. No folders, no per-file permissions, no in-browser editing, nothing either product already stores. The test each time is whether it helps someone make a cross-product decision faster."],
  "Flows.dc.html": ["n-flows", "END-TO-END FLOWS\n\nRewritten for the simplified architecture. Blue steps happen in StoreBrid, magenta in ReveNew, teal in the Suite.\n\nThe shape of the product is visible in the colour: the Suite is where the two meet, and every deep edit leaves for the product that owns it."],
  "OverviewChangeSim.dc.html": ["n-chsim", "2 · CHANGE TECHNICAL SIMULATION\n\nThe same three simulations, as a focused drawer for when the choice is the only thing on your mind.\n\nEach one shows the figures that separate it — energy, cycles, CAPEX. Creating or editing one is StoreBrid's job, and the footer says so.\n\nFour former screens fold into this plus the Overview list: the simulations list, the simulation overview, its tabs, and the technical results page."],
  "OverviewChangeScenario.dc.html": ["n-chscen", "3 · CHANGE FINANCIAL CASE\n\nThe mirror: three ReveNew cases with NPV, IRR and payback.\n\nThis is what \"Scenarios\" became. ReveNew's Forecast, Energy, Revenue, DevEx, CapEx, OpEx and Financial Model scenarios are what BUILD these cases — the Suite shows the case and its result, not the machinery that produced it."],
  "EditProjectDetails.dc.html": ["n-details", "11 · PROJECT DETAILS\n\nName, technology, capacity, currency, COD and location — the shared context both products read, so the Suite edits it directly.\n\nOne project. Not a StoreBrid project plus a ReveNew project plus a Suite project."],
  "HomeStoreBrid.dc.html": ["n-home-sb", "HOME — engineering licence\n\nThe same Home, adapted. No revenue, no IRR, no combined KPI."],
  "HomeReveNew.dc.html": ["n-home-rv", "HOME — financial licence\n\nThe mirror. No simulations, no utilisation, no cycles."],
  "ProjectStoreBrid.dc.html": ["n-proj-sb", "PROJECT — engineering licence\n\nThe same project as page 1. What changed is the viewer. Note the ANALYSIS group is absent: combining needs both sides."],
  "ProjectReveNew.dc.html": ["n-proj-rv", "PROJECT — financial licence\n\nIdentical project, identical header, entirely different page."],
  "ProjectNew.dc.html": ["n-projnew", "NEW PROJECT\n\nNothing is missing from the project; the domains have not been configured yet."],
  "Administration.dc.html": ["n-admin", "ADMINISTRATION & LICENCES\n\nEntitlement visibility. The organisation holds both products; individual members do not."],
  "States.dc.html": ["n-states", "EMPTY AND UNAVAILABLE\n\nThe project is always whole. What varies is whether a domain's work has started, or whether the viewer holds that licence."],
  "EmbeddedStates.dc.html": ["n-states-embed", "EMBEDDED STATES\n\nLoading, didn't-load, saved-back-in-context. Never a dead end.\n\nCHANGED. The third state used to claim a forecast change invalidated the DISPATCH results. It does not — StoreBrid is upstream. What it invalidates is the three cases built on that scenario, and that is what it now says."],
  "SourceAttribution.dc.html": ["n-attrib", "PATTERNS\n\nThe source chip and the cross-product context line. The boundary rule at the bottom still governs every screen.\n\nTHE PROVENANCE RULE, stated once so it can be checked anywhere:\n\nOWNERSHIP is which product calculates the number. LINEAGE is what it needed to be calculated. SUITE-DERIVED is what neither product could produce alone.\n\nSo: energy, cycles, utilisation, degradation and CAPEX are StoreBrid. Revenue, capture price and NPV are ReveNew. Revenue per MWh, revenue per cycle and NPV per MW are Combined, because each divides one product's output by the other's.\n\nIRR and payback are the case worth stating explicitly: they come out of the project financial model, which needs ReveNew cash flows AND StoreBrid CAPEX, so they are Combined everywhere — including inside the financial block on Overview, where the row now carries its own chip rather than inheriting the block's. A metric cannot be ReveNew on one screen and Combined on another.\n\nCAPEX is the mirror case: owned by StoreBrid, consumed by ReveNew. It keeps the StoreBrid chip and states the lineage in words rather than being relabelled Combined — ownership and lineage are different questions."],
};

const artboards = [], annotations = [], pages = [];
let rowY = 0;
for (const pg of PAGES) {
  pages.push({ id: pg.id, name: pg.name });
  for (const row of pg.rows) {
    row.forEach(([file, w, h, title], i) => {
      artboards.push({ file, x: COLX[i], y: rowY, w, h, title, print: "fixed", page: pg.id });
      const nt = NOTES[file];
      /* notes carry more this pass — give them room so a long one cannot
         reach the artboard it belongs to */
      if (nt) annotations.push({ id: nt[0], x: COLX[i], y: rowY - 760, w: 640, text: nt[1], page: pg.id });
    });
    rowY += Math.max(...row.map((r) => r[2])) + 940;
  }
}
/* Artboards are authored generously and trimmed here to the height the
   manifest declares — one source of truth for every frame. */
for (const a of artboards) {
  const t = readFileSync(a.file, "utf8");
  const cur = +t.match(/"height":(\d+)\}/)[1];
  if (cur === a.h) continue;
  writeFileSync(a.file, t.split(`min-height:${cur}px`).join(`min-height:${a.h}px`)
                         .replace(`"height":${cur}}`, `"height":${a.h}}`));
}

writeFileSync("canvas.json", JSON.stringify(
  { artboards, annotations, pages, launch: { view: "canvas", page: "page-1" } }, null, 2));
console.log("canvas.json —", artboards.length, "artboards,", annotations.length, "notes,", pages.length, "pages");
