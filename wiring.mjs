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
  "Compare 4": "CompareAlternatives",   // tras crear un caso, la barra lateral cuenta cuatro
  "Files": "Files",
  "Activity": "Activity",
  "All events": "ActivityDecisions",
  "Continue comparison": "CompareAlternatives",
  "Continue analysis": "CompareAlternatives",
  "Open brief": "DecisionBrief",
  "All saved briefs": "DecisionBrief",
  "Explore alternatives": "CaseMatrix",
  "Open analysis": "ProjectOverview",
  "Open comparison": "CompareAlternatives",
  "Review sensitivity": "CaseMatrixRobustness",
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
  /* §21 · Explain difference is arrived at FROM a comparison, so it has to
     lead back to the one that was open — the selection is carried, not
     rebuilt. */
  "Back to comparison": "CompareAlternatives",
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

/* Cuando la misma etiqueta significa cosas distintas según la pantalla.
   Una clave terminada en `*` coincide por prefijo, y sólo en esa pantalla.

   Todo lo que se abre encima de una pantalla —selectores, detalle, formularios—
   cierra con un aspa. Ese botón no lleva texto, así que se resuelve por su
   aria-label, «Close»: sin un destino aquí, la pantalla es un callejón sin
   salida, porque lo único clicable queda detrás del desenfoque. */
export const OVERRIDE = {
  // §12: el contador de Home y el indicador global abren el MISMO panel.
  Main:                { "View": "NeedsAttention" },
  // §15: al calcular una combinación pendiente, la celda pasa a estar disponible.
  CaseMatrixUnevaluated: { "Calculate": "CaseMatrix" },
  Analytics:             { "Open the widest in its case matrix": "CaseMatrixRobustness" },
  // Cerrar devuelve a la pantalla sobre la que se abrió el diálogo.
  NeedsAttention:      { "Close": "Main", "Review case": "OverviewStale",
                         "Recalculate in ReveNew": "OverviewStale",
                         "Recalculate in StoreBrid": "OverviewStale" },

  /* Los tres selectores del picker: elegir uno lleva a la matriz, donde se ve
     lo que ese emparejamiento produce. El que ya está en uso vuelve a Overview,
     porque elegirlo no cambia nada. */
  OverviewChangeSim: {
    "Close": "ProjectOverview",
    "Base case 2027 In use*": "ProjectOverview",
    "Base case 2027 — 4 h duration*": "CaseMatrix",
    "Base case 2027 — 85% round-trip*": "CaseMatrix",
  },
  OverviewChangeScenario: {
    "Close": "ProjectOverview",
    "Base market In use*": "ProjectOverview",
    "High spread*": "CaseMatrix",
    "Low spread*": "CaseMatrix",
  },
  OverviewTechnical:   { "Close": "ProjectOverview" },
  FinancialDetails:    { "Close": "ProjectOverview" },
  DecisionBrief:       { "Close": "CompareAlternatives", "Cancel": "CompareAlternatives" },

  // Flujo 5: el aviso de obsoleto lleva a la pantalla stale; desde ahí, recalcular
  // devuelve el resultado ya fresco.
  CompareAlternatives: { "Recalculate in ReveNew": "OverviewStale" },
  CompareAllMetrics:   { "Recalculate in ReveNew": "OverviewStale" },
  OverviewStale:       { "Recalculate in ReveNew": "ProjectOverview" },

  // El formulario enviado aterriza en el proyecto; cancelar vuelve atrás.
  CreateProject:       { "Close": "Projects", "Create project": "ProjectOverview", "Cancel": "Projects" },
  /* Crear un caso aterriza en la matriz con el caso ya guardado: el flujo
     tenía principio pero no final, y el final es la consecuencia visible. */
  /* En el modal de creación los dos catálogos son una SELECCIÓN, no una
     navegación: elegir una fila no debe abrir el selector antiguo al que
     ese mismo texto lleva desde Overview. Apuntar el prefijo a la propia
     pantalla las deja inertes, como las pestañas y los filtros. */
  CreateAnalysisCase:  { "Close": "CaseMatrix", "Cancel": "CaseMatrix", "Save": "CaseMatrix",
                         "Create analysis case": "CaseCreated",
                         "Analysis cases": "CompareAlternatives",
                         "Base case 2027*": "CreateAnalysisCase",
                         "Base market*": "CreateAnalysisCase",
                         "High spread*": "CreateAnalysisCase",
                         "Low spread*": "CreateAnalysisCase" },
  CreateCaseUnpriced:  { "Close": "CaseMatrix", "Cancel": "CaseMatrix",
                         "Create analysis case": "CaseCreated",
                         "Analysis cases": "CompareAlternatives",
                         "Base case 2027*": "CreateCaseUnpriced",
                         "Base market*": "CreateCaseUnpriced",
                         "High spread*": "CreateCaseUnpriced",
                         "Low spread*": "CreateCaseUnpriced" },
  CaseCreated:         { "Recalculate in ReveNew": "OverviewStale",
                         "Base 2 h + Base market": "ProjectOverview" },
  EditProjectDetails:  { "Close": "ProjectOverview", "Cancel": "ProjectOverview",
                         "Save": "ProjectOverview", "Save changes": "ProjectOverview" },
  States:              { "Create project": "CreateProject" },
  ProjectNew:          { "Configure plant": "CreateProject", "Open StoreBrid": "ProjectStoreBrid",
                         "Open ReveNew": "ProjectReveNew" },
  ProjectAnalysisReady:{ "Open analysis": "ProjectOverview" },

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
  "New simulation in StoreBrid": "Abriría StoreBrid para crear una simulación — la Suite no modela",
  "New case in ReveNew": "Abriría ReveNew para crear un caso financiero — la Suite no modela",
  "Export brief": "Exportaría el informe de decisión",
  "Export decision brief": "Exportaría el informe de decisión",
};
