# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "pptx"))
from build_pptx import build, INK, MUTED

IMG = os.path.join(os.path.dirname(os.path.abspath(__file__)), "jpg")

def N(title, comunica, porque, detalle=None):
    p = [(title, True), ("", False), ("QUÉ COMUNICA", True), (comunica, False),
         ("", False), ("POR QUÉ ESTÁ AQUÍ", True), (porque, False)]
    if detalle:
        p += [("", False), ("EN ESTA VISTA", True), (detalle, False)]
    return p

# (imagen, sección, nombre, parte, notas)
D = [
# ── CONCEPTO ────────────────────────────────────────────────────────────
("01-cover", None, None, None, N(
 "Portada — Sunveon Suite",
 "Presenta la propuesta: StoreBrid y ReveNew dejan de ser dos aplicaciones que se consultan por separado y pasan a compartir un espacio de decisión. La cadena inferior fija desde el primer segundo los tres actores y sus colores: azul StoreBrid (motor técnico), teal Suite (capa de decisión), magenta ReveNew (motor financiero).",
 "El código de color que aparece aquí se mantiene en las 45 diapositivas siguientes. Establecerlo al principio permite que, en cualquier pantalla posterior, el cliente sepa de un vistazo qué dato viene de qué motor sin tener que leer una leyenda.")),
("02-value", None, None, None, N(
 "Propuesta de valor",
 "Resume en tres bloques por qué esta integración importa: el problema que resuelve (la decisión vive hoy partida entre dos aplicaciones), para quién es (ingeniería y negocio decidiendo sobre la misma configuración) y qué la diferencia (introduce un objeto propio, el analysis case, en lugar de yuxtaponer métricas).",
 "Es la diapositiva que responde a la objeción más probable del cliente: «¿esto no es un dashboard que junta indicadores de los dos productos?». La regla de producto del pie es el criterio que ha gobernado cada decisión de alcance del proyecto: lo que sirve para configurar en profundidad se queda en su motor; lo que sirve para entender el impacto conjunto, comparar y decidir, vive en la Suite.")),
("03-model", None, None, None, N(
 "Modelo de producto",
 "El modelo de dominio en una imagen: un proyecto compartido, una simulación técnica de StoreBrid, un caso financiero de ReveNew y, uniéndolos, el analysis case. A la derecha, el recorrido de cinco pasos — Understand, Explore, Compare, Decide y, solo si hace falta, edición profunda en el motor correspondiente.",
 "Sin este modelo las pantallas siguientes se leen como una colección de vistas. Con él se leen como un recorrido. También deja explícito el límite del alcance: la Suite no crea simulaciones ni modelos financieros, empareja los que ya existen.")),
("Flows-1", "Concepto", "Flujos de extremo a extremo", "1 / 2", N(
 "Flujos de extremo a extremo (1 de 2)",
 "Los recorridos completos, paso a paso, con el color indicando dónde ocurre cada uno: azul en StoreBrid, magenta en ReveNew, teal en la Suite.",
 "Es la comprobación de coherencia de toda la propuesta. Si un flujo obligara a saltar de producto en producto sin motivo, se vería aquí. La forma del producto queda visible en el color: la Suite es donde los dos motores se encuentran, y toda edición profunda sale hacia el producto que la posee.")),
("Flows-2", "Concepto", "Flujos de extremo a extremo", "2 / 2", N(
 "Flujos de extremo a extremo (2 de 2)",
 "Continuación de los recorridos: creación de un analysis case, comparación, decisión y los casos en los que el usuario sale hacia StoreBrid o ReveNew.",
 "Cierra el mapa mostrando que cada salida a un motor externo tiene un punto de retorno claro a la Suite. Ningún flujo termina fuera.")),

# ── LA SUITE ────────────────────────────────────────────────────────────
("Main-1", "La Suite", "Home", "1 / 2", N(
 "Home — la página de aterrizaje (1 de 2)",
 "El punto de entrada a la organización: saludo, indicadores del workspace, proyectos recientes y rendimiento agregado de la cartera. La fila de KPIs cuenta los objetos con los que la gente trabaja de verdad — portfolios, simulaciones, modelos financieros — junto a las dos cifras de salida.",
 "Fija la escala mental correcta antes de entrar en un proyecto: la Suite es multi-proyecto. También evita el error de representar a ReveNew a través de «escenarios»: aquí ReveNew aparece por sus objetos reales.")),
("Main-2", "La Suite", "Home", "2 / 2", N(
 "Home — actividad y lectura de cartera (2 de 2)",
 "La mitad inferior: actividad reciente de los tres orígenes y lecturas agregadas de la cartera.",
 "Da continuidad entre sesiones. Quien vuelve al producto necesita saber qué ha cambiado desde la última vez y en qué motor ha cambiado, sin abrir proyecto por proyecto.")),
("Projects-1", "La Suite", "Projects", None, N(
 "Projects — el registro único",
 "La lista de proyectos de la organización. La columna clave no es el estado de conexión sino CAPABILITIES: qué motores están configurados para cada proyecto.",
 "Un proyecto es una sola entidad compartida, no un proyecto de StoreBrid más un proyecto de ReveNew. Esta columna es lo que hace visible esa decisión: no dice «conectado/desconectado», dice qué trabajo existe ya.")),
("CreateProject-1", "La Suite", "Create project", "1 / 2", N(
 "Crear proyecto — contexto compartido (1 de 2)",
 "El formulario de alta: nombre, tecnología, potencia, capacidad, moneda, fecha de operación comercial y localización sobre mapa.",
 "Es el único lugar donde la Suite crea algo por sí misma, y crea justamente lo que ambos motores necesitan leer. Definir el contexto una sola vez es lo que evita que StoreBrid y ReveNew mantengan versiones divergentes del mismo proyecto.")),
("CreateProject-2", "La Suite", "Create project", "2 / 2", N(
 "Crear proyecto — capacidades disponibles (2 de 2)",
 "El bloque final declara qué capacidades quedarán disponibles en el proyecto según las licencias de la organización.",
 "Hace explícito desde el alta que un proyecto puede nacer solo con la parte técnica, solo con la financiera o con ambas. El análisis combinado exige las dos, y conviene que eso se sepa antes de empezar, no al chocar con una pantalla vacía.")),
("Analytics-1", "La Suite", "Analytics", "1 / 2", N(
 "Analytics — nivel cartera (1 de 2)",
 "Análisis entre proyectos: la dispersión de utilización frente a retorno y las lecturas sobre dónde ambos motores discrepan.",
 "Es la única vista de la propuesta que ningún motor puede dibujar por su cuenta, porque cruza un eje técnico con uno financiero sobre muchos proyectos. Justifica por sí sola la existencia de una capa por encima de los dos productos.")),
("Analytics-2", "La Suite", "Analytics", "2 / 2", N(
 "Analytics — evolución temporal (2 de 2)",
 "La lectura mensual de cuándo mover energía realmente genera ingreso, y la comparación entre proyectos.",
 "Traduce el dato agregado a una pregunta operativa. Cierra Analytics con algo accionable en lugar de con una tabla más.")),
("Files-1", "La Suite", "Files", None, N(
 "Files — biblioteca compartida",
 "El repositorio del que leen ambos productos. Cada fila declara qué la está usando — «Related to Base market · High spread», «Related to Base case 2027 and its 2 variants» — además de qué producto la lee.",
 "Un repositorio compartido solo aporta valor si se sabe qué depende de cada archivo. Ese campo es lo que permite reemplazar un fichero de precios sabiendo exactamente qué análisis quedarán afectados.")),
("Activity-1", "La Suite", "Activity", "1 / 2", N(
 "Activity — trazabilidad (1 de 2)",
 "El histórico del proyecto filtrable por origen: todos, StoreBrid, ReveNew y Suite, con recuento en cada filtro.",
 "Con dos motores calculando de forma independiente, la pregunta «¿por qué ha cambiado este número?» es constante. El filtro por origen la responde en un paso, y el lenguaje de cada entrada nombra lo que realmente ocurrió, no una acción genérica.")),
("Activity-2", "La Suite", "Activity", "2 / 2", N(
 "Activity — histórico anterior (2 de 2)",
 "Continuación del timeline hacia días anteriores.",
 "Muestra que la traza no se limita a las últimas horas: es el registro auditable del proyecto.")),

# ── PROJECT WORKSPACE ───────────────────────────────────────────────────
("ProjectOverview-1", "Project workspace", "Overview", "1 / 3", N(
 "Overview — ¿qué estoy analizando ahora? (1 de 2)",
 "La pantalla central de la propuesta. Arriba, el analysis case actual con sus dos mitades: la simulación técnica y el caso financiero, cada una con su origen y su frescura, y el resultado que producen juntas. Debajo, «What the asset does» (StoreBrid) y «What it earns» (ReveNew) en paralelo.",
 "Responde la primera pregunta de cualquier usuario que abre un proyecto: qué pareja concreta está leyendo. Nótese el tratamiento de CAPEX: no se atribuye a un solo producto, sino que muestra su linaje — se calcula en StoreBrid y lo consume el modelo financiero de ReveNew. La interfaz deja de fingir que cada dato tiene un único dueño.")),
("ProjectOverview-2a", "Project workspace", "Overview", "2 / 3", N(
 "Overview — qué produce la combinación (2 de 3)",
 "El gráfico de inversión frente a retorno de los tres analysis cases guardados: la barra azul es el CAPEX que StoreBrid calcula, la magenta el NPV que ReveNew produce, sobre un mismo eje en euros, y a la derecha los euros de NPV por euro invertido.",
 "Es la lectura que resume el proyecto en un vistazo: no solo cuál rinde más, sino cuánto capital exige cada punto de rendimiento. El título es deliberado — «Storage investment against return», no «¿mejora el retorno con más almacenamiento?» — porque los tres casos no mantienen constante el lado financiero y una pregunta causal afirmaría más de lo que el dato sostiene.")),
("ProjectOverview-2b", "Project workspace", "Overview", "3 / 3", N(
 "Overview — lo que hay disponible para combinar (3 de 3)",
 "El bloque de exploración: las simulaciones técnicas y los casos financieros que existen en el proyecto, y debajo la tabla de analysis cases guardados con su CAPEX, NPV e IRR.",
 "Es lo que convierte Overview en un punto de partida y no en un informe. Desde aquí se ve la materia prima disponible y se cambia el análisis actual sin salir de la página. El pie fija de nuevo el límite: cambiar una simulación o un modelo financiero ocurre en StoreBrid o en ReveNew; la Suite lee el resultado.")),
("OverviewChangeSim-drawer", "Project workspace", "Cambiar simulación técnica", None, N(
 "Cambiar simulación técnica",
 "Un panel enfocado con las tres simulaciones disponibles, cada una con las cifras que las separan: energía descargada, ciclos y CAPEX. El pie recuerda que crear o editar una simulación es trabajo de StoreBrid.",
 "Cambiar el lado técnico de la pareja es la acción más frecuente del recorrido, y no merece una página propia. Este panel absorbe cuatro pantallas de la propuesta anterior — el listado de simulaciones, su vista general, sus pestañas y la página de resultados técnicos — sin perder capacidad de elección.")),
("OverviewChangeScenario-drawer", "Project workspace", "Cambiar caso financiero", None, N(
 "Cambiar caso financiero",
 "El panel espejo del anterior: tres casos financieros de ReveNew con NPV, IRR y payback.",
 "Simetría deliberada: las dos mitades del analysis case se cambian con el mismo gesto. Es también donde se resuelve el malentendido de terminología — lo que antes se llamaba «escenarios» son en realidad casos financieros; los escenarios de Forecast, Energy, Revenue, CapEx y OpEx son la maquinaria interna de ReveNew que los construye, y la Suite muestra el caso y su resultado, no esa maquinaria.")),
("OverviewTechnical-drawer", "Project workspace", "Detalle técnico", None, N(
 "Detalle técnico",
 "Divulgación progresiva en lugar de una página de resultados técnicos: configuración, operación, degradación y la curva de potencia y estado de carga, en modo solo lectura.",
 "Codifica el límite del producto: la Suite muestra lo suficiente para entender por qué querrías abrir StoreBrid, y no intenta ser StoreBrid. La única acción del pie es precisamente «Open in StoreBrid».")),
("FinancialDetails-drawer", "Project workspace", "Desglose financiero", None, N(
 "Desglose financiero",
 "El equivalente financiero: Forecast, Energy, Revenue, Costs y Financial Model en un único panel de solo lectura.",
 "Es el único punto donde la estructura interna de ReveNew puede aparecer, y aparece como detalle que explica una cifra, nunca como navegación. Nada es editable; la única salida es «Open in ReveNew».")),
("OverviewStale-1", "Project workspace", "Fuera de sincronía", "1 / 3", N(
 "Fuera de sincronía (1 de 2)",
 "El estado que dos motores independientes hacen inevitable: la simulación se recalculó hace 12 minutos, el caso financiero hace 4 horas, de modo que las cifras mostradas corresponden al cálculo anterior. El aviso nombra qué cambió, qué lado va por detrás y dónde se corrige.",
 "Es la pieza de confianza de toda la propuesta. La alternativa — ocultar los números hasta que ambos lados coincidan — sería peor: el usuario perdería el contexto sin ganar precisión. Aquí la página sigue funcionando y el dato queda etiquetado.")),
("OverviewStale-2a", "Project workspace", "Fuera de sincronía", "2 / 3", N(
 "Fuera de sincronía — el resto de la página sigue funcionando (2 de 3)",
 "El gráfico de inversión frente a retorno se sigue dibujando con normalidad, con el aviso de frescura vigente sobre las cifras afectadas.",
 "Refuerza la regla: un resultado desactualizado se marca, no se esconde. Ocultar la página hasta que ambos motores coincidan haría perder el contexto sin ganar precisión.")),
("OverviewStale-2b", "Project workspace", "Fuera de sincronía", "3 / 3", N(
 "Fuera de sincronía — qué hay disponible (3 de 3)",
 "El bloque de exploración y los analysis cases guardados, con el estado de frescura de cada lado a la vista.",
 "Desde aquí se ve inmediatamente qué lado va por detrás y se puede recalcular en el motor que corresponde. Como se ve en Compare, un resultado obsoleto queda además excluido de cualquier conclusión de tipo «el mejor».")),
("CaseMatrix-1", "Project workspace", "Case matrix", "1 / 3", N(
 "Case matrix — explorar las combinaciones (1 de 3)",
 "La rejilla de 3 simulaciones × 3 casos financieros: 9 combinaciones posibles, de las cuales solo 3 están guardadas como analysis cases. Cada celda declara cuál es — el nombre del caso, o «Not saved».",
 "Es la distinción conceptual más importante del producto: una combinación se convierte en analysis case únicamente cuando alguien la nombra. Sin esa distinción, la Suite acabaría gestionando 9 objetos que nadie ha decidido crear. La celda desactualizada aparece marcada y atenuada, no como un resultado válido.")),
("CaseMatrix-2", "Project workspace", "Case matrix", "2 / 3", N(
 "Case matrix — la celda seleccionada (2 de 3)",
 "Al seleccionar una celda se abre debajo su detalle: las métricas de esa combinación con el origen de cada una, y las acciones disponibles — añadir a la comparación, explicar la diferencia y guardarla como analysis case.",
 "Aquí se cierra el bucle hacia Overview: si la combinación ya es un analysis case, la acción es «Use as current analysis». Explorar y decidir ocurren en el mismo gesto, sin cambiar de página.")),
("CaseMatrix-3", "Project workspace", "Case matrix", "3 / 3", N(
 "Case matrix — el trade-off detrás de la métrica (3 de 3)",
 "El gráfico de rango: para cada simulación técnica, el recorrido que la métrica cubre según el caso financiero con el que se combine.",
 "Traduce la rejilla a una lectura de sensibilidad: cuánto del resultado lo determina la decisión técnica y cuánto el mercado. Es la pregunta que ningún motor puede responder solo.")),
("CreateAnalysisCase-modal", "Project workspace", "Crear analysis case", None, N(
 "Crear analysis case",
 "Un nombre y dos selectores. El resumen — capacidad, CAPEX, NPV, IRR — se lee en vivo de ambos productos, con el origen indicado bajo cada cifra.",
 "El analysis case es el único objeto que la Suite posee, y es deliberadamente delgado: sin asistente, sin módulo de gestión, sin sección de navegación propia. El pie lo dice literalmente: no se crea nada en StoreBrid ni en ReveNew, es un emparejamiento con nombre de lo que ya existe.")),
("CompareAlternatives-1", "Project workspace", "Compare", "1 / 4", N(
 "Compare — donde se decide (1 de 4)",
 "La cabecera de comparación con el resumen de decisión: mejor NPV, mejor IRR, menor CAPEX y payback más corto entre los casos comparados.",
 "Es la respuesta directa a la pregunta del usuario. Y es donde la regla de frescura pesa más: el caso «Stress test» tiene un resultado financiero anterior al cambio técnico, así que se marca como desactualizado y queda excluido de estas conclusiones. Un resultado obsoleto nunca se etiqueta como el mejor en silencio.")),
("CompareAlternatives-2", "Project workspace", "Compare", "2 / 4", N(
 "Compare — diferencias respecto a la referencia (2 de 4)",
 "Las barras de delta frente al caso base, orientadas por significado y no por signo: lo mejor va a la derecha, lo peor a la izquierda, independientemente de si la métrica mejora subiendo o bajando.",
 "Un CAPEX menor y un IRR mayor son ambos buenos, pero con signos opuestos. Orientar por signo obligaría a traducir mentalmente cada fila. Orientar por significado hace que la lectura sea inmediata; la etiqueta conserva siempre el valor real con su signo.")),
("CompareAlternatives-3", "Project workspace", "Compare", "3 / 4", N(
 "Compare — descomposición técnica y financiera (3 de 4)",
 "Para cada alternativa, qué cambió del lado técnico, qué impacto financiero tuvo y qué compra ese cambio de diseño.",
 "Es la traducción que justifica el producto: convierte «+1,3 puntos de IRR» en «4 horas de duración en lugar de 2, a cambio de 8,6 M€ más de CAPEX». Ninguno de los dos motores puede escribir esa frase por su cuenta.")),
("CompareAlternatives-4", "Project workspace", "Compare", "4 / 4", N(
 "Compare — tabla completa de métricas (4 de 4)",
 "La tabla íntegra, agrupada por origen: Technical (StoreBrid), Financial (ReveNew) y Combined (Suite), tras «Show all metrics».",
 "No se eliminó densidad analítica, se jerarquizó: primero la conclusión, luego las diferencias, luego la descomposición y, al final y bajo demanda, el detalle completo. La agrupación por origen mantiene visible de dónde sale cada número.")),
("CompareExplained-1", "Project workspace", "Explicar una diferencia", "1 / 5", N(
 "Explicar una diferencia (1 de 5)",
 "Un estado de Compare al que se llega desde una celda seleccionada de la matriz. Cabecera con el resumen de decisión y los cambios clave frente a la referencia.",
 "Aparece cuando entre la referencia y el caso elegido se han movido las dos dimensiones a la vez — la técnica y la financiera — y por tanto la pregunta «¿a qué se debe la mejora?» no tiene respuesta directa.")),
("CompareExplained-2", "Project workspace", "Explicar una diferencia", "2 / 5", N(
 "Explicar una diferencia — aislar cada cambio (2 de 5)",
 "Las columnas de cambio técnico, cambio financiero y resultado, construidas con las dos combinaciones que aíslan una sola variación cada una.",
 "Esas dos combinaciones se añadieron desde la matriz: ya existían, no se calculó nada nuevo para poder explicar. Es coherente con el límite del producto — la Suite no modela, empareja lo que los motores ya han producido.")),
("CompareExplained-3", "Project workspace", "Explicar una diferencia", "3 / 5", N(
 "Explicar una diferencia — panel de contribución (3 de 5)",
 "El panel de contribución a lo largo del camino de comparación, mostrando los dos órdenes controlados (técnico primero y financiero primero) y nombrando el residuo entre ambos. Debajo, la economía incremental: qué cuesta y qué devuelve la duración adicional.",
 "Es la pieza intelectualmente más honesta de la propuesta. El reparto entre causas depende de qué dimensión se mueve primero, así que se muestran los dos órdenes y se nombra la diferencia en lugar de elegir uno y presentarlo como la verdad. La Suite informa de la diferencia asociada a cada paso; nunca afirma una causa.")),
("CompareExplained-4", "Project workspace", "Explicar una diferencia", "4 / 5", N(
 "Explicar una diferencia — técnico frente a financiero (4 de 5)",
 "La lectura «¿compensa exprimir más el activo?» y el comparador de métricas.",
 "Reformula el análisis como la decisión de negocio que realmente se está tomando, en lugar de dejarlo como un ejercicio de atribución.")),
("CompareExplained-5", "Project workspace", "Explicar una diferencia", "5 / 5", N(
 "Explicar una diferencia — detalle por origen (5 de 5)",
 "El desglose completo agrupado en Technical (StoreBrid), Financial (ReveNew) y Combined (Suite).",
 "Cierra la explicación con la trazabilidad íntegra: cualquier cifra citada arriba puede seguirse hasta el motor que la produjo.")),
("Settings-1", "Project workspace", "Settings", "1 / 2", N(
 "Settings — lo que la Suite sí configura (1 de 2)",
 "Contexto compartido del proyecto, unidades y moneda de visualización, y cuatro ANALYSIS DEFAULTS: la simulación y el caso financiero con los que abre Overview, la referencia contra la que se miden todas las diferencias y la métrica con la que abre Compare.",
 "Esas cuatro opciones son genuinamente propiedad de la Suite porque son decisiones sobre el emparejamiento, que es lo único que la Suite posee. Todo lo demás sería invadir la configuración de un motor.")),
("Settings-2", "Project workspace", "Settings", "2 / 2", N(
 "Settings — dónde se configura el resto (2 de 2)",
 "La última fila de tarjetas enumera explícitamente qué se configura en StoreBrid, qué en ReveNew y qué en la Suite.",
 "Pone el límite del producto a la vista en lugar de dejar que el usuario lo descubra por ausencia. Reduce el soporte y, sobre todo, enseña el modelo mental correcto.")),
("EditProjectDetails-drawer", "Project workspace", "Detalles del proyecto", None, N(
 "Detalles del proyecto",
 "Nombre, tecnología, capacidad, moneda, fecha de operación comercial y localización: el contexto compartido que ambos productos leen, editable directamente desde la Suite.",
 "Es la excepción coherente a la regla de no editar: estos campos no pertenecen a ningún motor, pertenecen al proyecto. Un proyecto, no un proyecto de StoreBrid más otro de ReveNew más otro de la Suite.")),

# ── ESTADOS, LICENCIAS Y PATRONES ───────────────────────────────────────
("ProjectNew-1", "Estados y licencias", "Proyecto nuevo", None, N(
 "Proyecto recién creado",
 "Un proyecto sin trabajo todavía: se ofrece empezar por el lado de ingeniería o por el financiero, con el contexto compartido ya relleno.",
 "El mensaje es preciso: al proyecto no le falta nada, simplemente los dominios aún no se han configurado. Es la diferencia entre un estado vacío que parece un error y uno que parece un punto de partida.")),
("ProjectStoreBrid-full", "Estados y licencias", "Licencia de ingeniería", None, N(
 "El mismo proyecto con licencia solo de ingeniería",
 "Idéntico proyecto e idéntica cabecera, pero el usuario solo tiene StoreBrid: aparece el rendimiento técnico y desaparece el grupo ANALYSIS de la navegación.",
 "Combinar exige ambos lados, así que la capacidad de análisis no se muestra deshabilitada, se ausenta. Demuestra además que el modelo de proyecto único aguanta: no hay dos proyectos, hay un proyecto visto con distintos permisos.")),
("ProjectReveNew-full", "Estados y licencias", "Licencia financiera", None, N(
 "El mismo proyecto con licencia solo financiera",
 "El espejo del anterior: mismo proyecto, misma cabecera, página completamente distinta, centrada en lo que el activo gana.",
 "Confirma la simetría del diseño. Ninguno de los dos motores es el principal y el otro un añadido; la Suite trata a ambos igual.")),
("States-1", "Estados y licencias", "Estados vacíos y no disponibles", None, N(
 "Estados vacíos y no disponibles",
 "El catálogo de estados: qué se muestra cuando un dominio aún no tiene trabajo y qué cuando el usuario no dispone de esa licencia.",
 "Con dos motores y dos licencias, los estados intermedios son la norma, no la excepción. Resolverlos como sistema — y no pantalla por pantalla — es lo que evita que el producto se sienta roto en el uso real.")),
("Administration-1", "Estados y licencias", "Administración y licencias", None, N(
 "Administración y licencias",
 "Visibilidad de derechos: qué productos tiene contratados la organización y qué licencias tiene cada miembro.",
 "Explica por qué dos personas ven el mismo proyecto de forma distinta. Sin esta pantalla, las diferencias de las dos diapositivas anteriores parecerían inconsistencias del producto.")),
("SourceAttribution-1", "Estados y licencias", "Patrones de origen", None, N(
 "Patrones — atribución de origen",
 "Los dos componentes que sostienen la coherencia del sistema: el chip de origen y la línea de contexto entre productos, con la regla de frontera al pie.",
 "Es el vocabulario visual que hace legible todo lo anterior. Cada cifra de la propuesta declara de dónde viene con el mismo componente, y esa consistencia es lo que permite mezclar datos de dos motores sin que el usuario se pierda.")),
("99-close", None, None, None, N(
 "Cierre",
 "La propuesta en una frase, y el recorrido completo Modelar → Entender → Comparar → Decidir → Modelar.",
 "Deja al cliente con el reparto de responsabilidades como idea final: los motores modelan, la Suite conecta y la persona decide. El pie advierte que las cifras del prototipo son ilustrativas y deben validarse contra los datos reales.")),
]

slides = []
for key, section, name, part, notes in D:
    p = os.path.join(IMG, key + ".jpg")
    if not os.path.exists(p):
        raise SystemExit("falta imagen: " + p)
    header = None
    if section:
        header = [(section + "   ", 1000, 0, MUTED), (name, 1000, 1, INK)]
    slides.append(dict(img=p, header=header, corner=part, notes=notes,
                       full_bleed=section is None))

out_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "output")
os.makedirs(out_dir, exist_ok=True)
dest = os.path.join(out_dir, "Sunveon-Suite-Integracion-UX-StoreBrid-ReveNew.pptx")
build(slides, dest, "Sunveon Suite — Integración UX StoreBrid + ReveNew",
      "Propuesta de integración UX. Arquitectura de información, flujos y pantallas.")
print("%d diapositivas -> %s (%.1f MB)" % (len(slides), dest, os.path.getsize(dest) / 1e6))
