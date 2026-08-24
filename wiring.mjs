// Mapa de navegación del prototipo.
// Las pantallas fuente traen todo su interactivo como href="#", así que el
// destino se resuelve aquí por el texto del elemento. `build-site.mjs` lo aplica
// al generar, y los .dc.html se quedan intactos y regenerables desde build.mjs.

/* Destinos válidos en cualquier pantalla. */
export const NAV = {
  // Barra lateral de la Suite
  "Home": "Main",
  "Projects": "Projects",
  "Analytics": "Analytics",
  "Administration": "Administration",
  "Needs attention 3": "NeedsAttention",
  "All projects": "Projects",

  // Barra lateral del proyecto
  "Overview": "ProjectOverview",
  "Case matrix 9": "CaseMatrix",
  "Compare 3": "CompareAlternatives",
  "Files": "Files",
  "Activity": "Activity",
  "All events": "ActivityDecisions",
  "Analysis & decisions": "Activity",
  "Settings": "Settings",

  // Cabecera del proyecto
  "Project details": "EditProjectDetails",
  "Compare": "CompareAlternatives",
  "Compare all": "CompareAllMetrics",
  "Save decision brief": "DecisionBrief",
  "Export brief": "DecisionBrief",
  "Robustness": "CaseMatrixRobustness",
  "Performance": "CaseMatrix",
  "Compare analysis cases": "CompareAlternatives",

  // Flujo 2 y 3 — profundizar en cada mitad
  "View technical details": "OverviewTechnical",
  "View financial breakdown": "FinancialDetails",

  // Flujo 4 y 5 — cambiar un lado del emparejamiento
  "Change simulation": "OverviewChangeSim",
  "Change simulation →": "OverviewChangeSim",
  "Change financial case": "OverviewChangeScenario",
  "Change financial case →": "OverviewChangeScenario",
  "Switch": "CaseMatrix",

  // Casos de análisis
  "Create analysis case": "CreateAnalysisCase",
  "New analysis case": "CreateAnalysisCase",
  "Save as analysis case": "CreateAnalysisCase",
  "Save as analysis cases": "CreateAnalysisCase",
  "Use as current analysis": "ProjectOverview",
  "Analysis cases 3": "CompareAlternatives",
  "All combinations 9": "CaseMatrix",

  // Flujo 6 — decisión entre productos
  "Add to comparison": "CompareAlternatives",
  "Add case": "CompareAlternatives",
  "Explain difference": "CompareExplained",
  "Show all metrics": "CompareAllMetrics",
  "Hide all metrics": "CompareAlternatives",
  "Saved comparisons": "CompareAlternatives",
  "Cases": "CaseMatrix",

  // Proyectos
  "Valencia BESS": "ProjectOverview",
  "Madrid Hybrid": "ProjectOverview",
  "Sevilla Storage": "ProjectStoreBrid",
  "Almería BESS": "ProjectOverview",
  "Helios II": "ProjectOverview",
  "Zaragoza Wind + BESS": "ProjectOverview",
  "Lisboa Storage": "ProjectOverview",
  "Porto PV": "ProjectReveNew",   // sólo modelo financiero
  "Lisboa Storage": "States",     // estados vacíos y sin licencia
  "New project": "CreateProject",
  "Configure plant": "CreateProject",
  "View all": "Activity",

  // Entrada
  "Continue to the Suite": "Main",
  "Continue with Sunveon SSO": "Main",

  // Estados
  "Review impact": "OverviewStale",
  "Request access": "Administration",
  "Manage access": "Administration",
  "About combined metrics": "SourceAttribution",
  "View the 3 cases": "CaseMatrix",
  "Cádiz Storage": "ProjectOverview",
  "Invite member": "Administration",
};

/* Filas cuyo texto arrastra cifras: se resuelven por prefijo.
   Elegir otra simulación o escenario es el gesto central de los flujos 4 y 5. */
export const PREFIX = [
  ["Base case 2027 — 4 h duration",   "OverviewChangeSim"],
  ["Base case 2027 — 85% round-trip", "OverviewChangeSim"],
  ["Base case 2027 In use",           "OverviewChangeSim"],
  ["High spread",                     "OverviewChangeScenario"],
  ["Low spread",                      "OverviewChangeScenario"],
  ["Base market In use",              "OverviewChangeScenario"],
  ["Selected",                        "CompareAlternatives"],
  ["Outdated",                        "OverviewStale"],
  ["Baseline",                        "CompareAlternatives"],
  ["Weakest",                         "CompareExplained"],
];

/* Cuando la misma etiqueta significa cosas distintas según la pantalla. */
export const OVERRIDE = {
  // §12: el contador de Home y el indicador global abren el MISMO panel.
  Main:                { "View": "NeedsAttention" },
  // §15: al calcular una combinación pendiente, la celda pasa a estar disponible.
  CaseMatrixUnevaluated: { "Calculate": "CaseMatrix" },
  // Desde el panel se entra al caso afectado, que es la pantalla stale.
  NeedsAttention:      { "Review case": "OverviewStale", "Recalculate in ReveNew": "OverviewStale",
                         "Recalculate in StoreBrid": "OverviewStale" },
  // Flujo 5: el aviso de obsoleto lleva a la pantalla stale; desde ahí, recalcular
  // devuelve el resultado ya fresco.
  CompareAlternatives: { "Recalculate in ReveNew": "OverviewStale" },
  CompareAllMetrics:   { "Recalculate in ReveNew": "OverviewStale" },
  OverviewStale:       { "Recalculate in ReveNew": "ProjectOverview" },

  // El formulario enviado aterriza en el proyecto; cancelar vuelve atrás.
  CreateProject:       { "Create project": "ProjectOverview", "Cancel": "Projects" },
  CreateAnalysisCase:  { "Cancel": "CaseMatrix", "Save": "CaseMatrix" },
  EditProjectDetails:  { "Cancel": "ProjectOverview", "Save": "ProjectOverview" },
  States:              { "Create project": "CreateProject" },
  ProjectNew:          { "Configure plant": "CreateProject" },

  // En la matriz, la celda seleccionada se adopta como análisis actual.
  CaseMatrix:          { "Recalculate in ReveNew": "OverviewStale",
                         "Base 2 h + Base market": "ProjectOverview" },
};

/* Sale de la Suite hacia el producto dueño del dato: por diseño no hay pantalla. */
export const EXTERNAL = {
  "StoreBrid": "Abriría StoreBrid — la Suite enlaza fuera en vez de duplicar el producto",
  "ReveNew": "Abriría ReveNew — la Suite enlaza fuera en vez de duplicar el producto",
  "Open in StoreBrid": "Abriría StoreBrid, dueño de la simulación técnica",
  "Open in ReveNew": "Abriría ReveNew, dueño del modelo de ingresos",
  "Configure assumptions": "Abriría ReveNew para configurar las hipótesis",
  "Run first simulation": "Abriría StoreBrid para lanzar la primera simulación",
  "Export brief": "Exportaría el informe de decisión",
  "Export decision brief": "Exportaría el informe de decisión",
};
