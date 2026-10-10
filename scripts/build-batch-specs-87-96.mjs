import fs from 'node:fs/promises';

const common = `

COMPRA INFORMADA

Antes de comprar, revisa el título, las fotografías, el contenido incluido y las medidas indicadas. Las medidas del paquete corresponden al bulto preparado para despacho. Los tonos pueden variar ligeramente por iluminación, configuración de pantalla o lote de fabricación. Los objetos utilizados para ambientar las fotografías no forman parte de la compra.

RECEPCIÓN Y PRIMERA REVISIÓN

Al recibir el pedido, abre el embalaje con cuidado y conserva la caja durante la revisión inicial. Comprueba que las piezas estén completas, limpias y sin daños visibles. Realiza una prueba breve antes del uso prolongado. Si detectas una pieza suelta, deformación, cable dañado, olor extraño o funcionamiento irregular, suspende el uso y escríbenos mediante la mensajería de la compra.

CUIDADO Y ALMACENAMIENTO

Limpia con métodos compatibles con los materiales. Evita solventes, cloro, productos abrasivos, calor intenso y humedad prolongada. Deja secar completamente antes de guardar. Mantén el producto en un lugar limpio, ventilado y protegido de golpes, sol directo y polvo. Revisa periódicamente las uniones, costuras, cables, tornillos o superficies según corresponda.

GARANTÍA Y SOPORTE

El producto cuenta con garantía del vendedor por 30 días. Para recibir orientación, utiliza la mensajería del pedido e indica de forma clara lo observado. Conserva el comprobante, el empaque y los accesorios durante el periodo de prueba. En Furaxis queremos que recibas información clara y una atención ordenada antes y después de tu compra.
`;

function tentDescription(p) {
  return `¡Bienvenido a Furaxis!

Convierte una salida al aire libre en un espacio cómodo para compartir. Esta carpa familiar de gran tamaño está pensada para camping, paseos, reuniones y escapadas donde se necesita amplitud, ventilación y una distribución práctica. La presentación incluye una lámpara de camping y dos almohadas pequeñas para completar la experiencia desde el primer uso.

CARACTERÍSTICAS PRINCIPALES

- Carpa familiar de doble capa para grupos grandes.
- Capacidad referencial de 8 a 12 personas, según distribución del equipo y equipaje.
- Color de esta publicación: ${p.color}.
- Dimensiones de referencia del modelo: 430 x 305 x 210 cm.
- Ventanas y accesos que favorecen la circulación del aire.
- Estructura pensada para armado y desmontaje en actividades recreativas.
- Lámpara de camping incluida.
- Dos almohadas pequeñas incluidas.
- Producto nuevo.
- Garantía del vendedor: 30 días.

ESPACIO PARA COMPARTIR

La distribución amplia permite organizar zonas para descanso, bolsos y artículos de camping. La altura central facilita el movimiento dentro de la carpa y ayuda a crear un ambiente más cómodo durante estadías familiares. La capacidad real depende del tamaño de los colchones, la cantidad de equipaje y el espacio que cada persona desea conservar.

Para aprovechar el interior, coloca primero los elementos grandes y deja libres los accesos. Los bolsos pequeños pueden ubicarse junto a los laterales. Antes de salir, realiza un armado de prueba para conocer las piezas, practicar la secuencia y confirmar que el espacio corresponde a tus necesidades.

DOBLE CAPA Y VENTILACIÓN

La construcción de doble capa ayuda a separar el ambiente interior de la cubierta exterior. Las aberturas permiten renovar el aire y observar el entorno. En días cálidos, abre las zonas de ventilación disponibles. En noches frías, regula la apertura sin bloquear completamente el flujo de aire.

Como toda carpa recreativa, su desempeño depende de una instalación correcta, el estado del terreno y las condiciones meteorológicas. No se recomienda utilizarla durante tormentas severas, vientos fuertes, acumulación de nieve ni situaciones que superen el uso normal de camping.

ARMADO RECOMENDADO

1. Elige un terreno plano, firme y libre de piedras, ramas o elementos cortantes.
2. Extiende la carpa y ordena las piezas antes de comenzar.
3. Identifica puertas, ventanas, varillas, anclajes y cubierta exterior.
4. Monta la estructura siguiendo la secuencia indicada por el fabricante.
5. Distribuye la tensión de manera uniforme, sin forzar costuras ni conectores.
6. Fija correctamente estacas y tensores según el terreno.
7. Instala la cubierta exterior y verifica que no quede apoyada directamente sobre la capa interior.
8. Revisa todos los puntos antes de ingresar colchones y equipaje.

Se recomienda realizar el armado entre dos adultos. No utilices herramientas que puedan perforar la tela. Si una varilla ofrece resistencia, revisa su posición antes de aplicar fuerza.

CONTENIDO DEL PAQUETE

- Una carpa familiar color ${p.color}.
- Estructura y componentes de armado correspondientes al modelo.
- Cubierta exterior de doble capa.
- Accesorios de fijación incluidos por el fabricante.
- Una lámpara de camping adicional.
- Dos almohadas pequeñas adicionales.
- Bolsa o empaque de transporte según presentación.

ESPECIFICACIONES

- Tipo: carpa familiar para camping.
- Capacidad referencial: 8 a 12 personas.
- Color: ${p.color}.
- Dimensiones de referencia: 430 x 305 x 210 cm.
- Configuración: doble capa.
- Requiere armado: sí.
- Condición: nuevo.

MEDIDAS LOGÍSTICAS

El paquete preparado para despacho mide aproximadamente ${p.dims} y pesa cerca de ${p.weight}. Estas medidas incluyen el embalaje y los accesorios. Verifica que el espacio de transporte sea suficiente antes de planificar el viaje.

USO SEGURO

Mantén la carpa alejada de fogatas, cocinas, braseros, calefactores, velas y cualquier llama o fuente de calor. No cocines dentro de una carpa cerrada. Ventila siempre el espacio y nunca utilices equipos que generen monóxido de carbono en el interior.

Los niños deben permanecer bajo supervisión adulta durante el armado y el uso. Las cuerdas, estacas y varillas pueden provocar tropiezos o lesiones si se manipulan incorrectamente. Señaliza los tensores cuando haya poca luz y guarda las piezas pequeñas fuera del alcance de niños.

DESMONTAJE Y GUARDADO

Retira todo el equipaje y limpia el interior. Sacude tierra y hojas antes de plegar. Si la carpa está húmeda, déjala secar completamente en un lugar ventilado antes de guardarla. Plegar tela húmeda puede producir olores, manchas o deterioro. Guarda varillas y estacas separadas para evitar perforaciones.

PREGUNTAS FRECUENTES

¿Qué color corresponde a esta publicación?
Corresponde a la variante ${p.color} mostrada en la imagen principal.

¿Cuántas personas caben?
La capacidad referencial es de 8 a 12 personas. La comodidad depende de colchones, equipaje y distribución interior.

¿Incluye lámpara y almohadas?
Sí. Esta configuración añade una lámpara de camping y dos almohadas pequeñas.

¿Llega armada?
No. La carpa debe montarse antes de usar. Recomendamos practicar el armado en casa.

¿Es totalmente impermeable?
No se debe considerar invulnerable a cualquier clima. Un armado correcto y el cuidado de costuras mejoran la protección en uso recreativo normal.

¿Sirve para clima extremo?
Está pensada para camping recreativo. Evita tormentas severas, vientos intensos y condiciones extremas.

¿Tiene garantía?
Sí. Incluye garantía del vendedor por 30 días.

${common}

En Furaxis seleccionamos soluciones prácticas para disfrutar más cada salida. Esta carpa reúne espacio familiar, doble capa y accesorios útiles en una sola compra.

Usted también puede buscar: carpa camping familiar, carpa 8 personas, carpa 10 personas, carpa 12 personas, carpa grande doble capa, tienda campaña familiar, carpa amplia con ventanas, carpa camping con lámpara.`;
}

function kidsMakeupDescription(p) {
  return `¡Bienvenido a Furaxis!

Un espacio de juego donde la imaginación se convierte en historias, personajes y momentos compartidos. El set de maquillaje infantil ${p.model} reúne accesorios de simulación en una presentación rosada que permite ordenar, transportar y desplegar el juego con facilidad.

CARACTERÍSTICAS PRINCIPALES

- Set de maquillaje de simulación para niños.
- Modelo: ${p.model}.
- Presentación: ${p.style}.
- Color principal: rosado.
- Múltiples accesorios visibles para juego de roles.
- Compartimentos para ordenar las piezas.
- Diseño fácil de transportar y guardar.
- Producto nuevo.
- Garantía del vendedor: 30 días.

JUEGO DE ROLES Y CREATIVIDAD

Imitar rutinas cotidianas ayuda a crear historias y practicar la comunicación. Los niños pueden organizar un salón imaginario, preparar un personaje para una fiesta o compartir turnos con amigos y familiares. Cada pieza funciona como apoyo para inventar escenas nuevas sin limitar el juego a una sola forma.

La actividad también puede favorecer la coordinación mano-ojo, la clasificación por formas y colores, el orden y el cuidado de los objetos. Un adulto puede acompañar el juego, enseñar a guardar cada componente y proponer situaciones sencillas que estimulen la expresión oral.

UNA PRESENTACIÓN PRÁCTICA

El formato ${p.style.toLowerCase()} mantiene los accesorios reunidos y facilita llevar el set a otra habitación, una visita o una tarde de juego. Al abrirlo, las secciones permiten ver y elegir las piezas. Al terminar, guardar cada accesorio ayuda a evitar pérdidas y convierte el orden en parte de la actividad.

CONTENIDO

- Una presentación ${p.style.toLowerCase()} modelo ${p.model}.
- Accesorios infantiles de maquillaje de simulación mostrados en la imagen.
- Compartimentos y piezas de organización integrados según modelo.
- Empaque protector.

Los accesorios son juguetes de simulación. La cantidad, forma y combinación corresponden a la presentación visible en las fotografías. Los muebles, decoraciones y objetos de ambientación no están incluidos.

PRIMER USO

1. Abre el empaque con ayuda de un adulto.
2. Revisa que no existan piezas dañadas o bordes irregulares.
3. Separa los accesorios por tipo y colócalos en los compartimentos.
4. Explica al niño que son elementos de juego y que no deben ingerirse.
5. Comienza con una actividad breve y supervisada.
6. Cuenta las piezas al terminar y guárdalas dentro del estuche.

ESPECIFICACIONES

- Tipo: set infantil de maquillaje de simulación.
- Modelo: ${p.model}.
- Color principal: rosado.
- Formato: ${p.style}.
- Uso: juego de roles.
- Condición: nuevo.

MEDIDAS LOGÍSTICAS

El paquete preparado para despacho mide aproximadamente ${p.dims} y pesa cerca de ${p.weight}. Estas cifras incluyen empaque y accesorios. Abre cuidadosamente para no cortar bolsas ni componentes internos.

SEGURIDAD INFANTIL

Utilizar siempre bajo supervisión adulta. El set puede contener piezas pequeñas y no es adecuado para niños que todavía llevan objetos a la boca. Mantén las piezas alejadas de bebés, mascotas, alimentos y bebidas. Respeta la edad recomendada en el empaque y considera la habilidad individual del niño.

Este producto es un juguete de simulación. No reemplaza cosméticos reales ni debe aplicarse en ojos, boca, piel irritada o heridas. No permitas que el niño mastique, ingiera o introduzca piezas en nariz u oídos. Retira inmediatamente cualquier componente roto, agrietado o deformado.

IDEAS PARA JUGAR

- Organizar un salón de belleza imaginario.
- Clasificar los accesorios por forma o función.
- Practicar turnos entre cliente y estilista.
- Crear personajes para una obra o fiesta de disfraces.
- Aprender a ordenar y guardar después de la actividad.

El adulto puede formular preguntas abiertas: ¿qué personaje estás preparando?, ¿qué pieza necesitas ahora?, ¿cómo ordenarías los accesorios? Estas preguntas ayudan a ampliar la historia y mantener el juego activo.

PREGUNTAS FRECUENTES

¿Es maquillaje real?
No. Es un set infantil de simulación destinado al juego de roles.

¿Qué variante recibiré?
Recibirás el modelo ${p.model} en formato ${p.style.toLowerCase()}, color rosado.

¿Incluye el estuche?
Sí. La presentación mostrada forma parte del producto y sirve para organizar los accesorios.

¿Se puede transportar?
Sí. El formato está pensado para mantener las piezas reunidas y facilitar su traslado por un adulto.

¿Requiere pilas?
No se ofrece como juguete electrónico. Si algún componente del lote incorpora una función adicional, revisa el empaque recibido.

¿Tiene garantía?
Sí. Incluye garantía del vendedor por 30 días.

${common}

En Furaxis buscamos juguetes que inviten a imaginar, conversar y compartir. Este set ofrece una presentación atractiva y un lugar definido para ordenar cada accesorio después del juego.

Usted también puede buscar: maquillaje infantil juguete, set maquillaje niñas, maleta maquillaje infantil, juego de belleza niños, tocador portátil juguete, regalo creativo niña, accesorios de maquillaje simulación.`;
}

function grillDescription() {
  return `¡Bienvenido a Furaxis!

Prepara carnes, verduras, sándwiches y desayunos con una superficie amplia y resistente. Esta plancha reversible de hierro fundido ofrece un lado liso y otro acanalado para adaptar la cocción a distintas recetas. La presentación añade cuatro pequeños cepillos para apoyar el uso y la limpieza.

CARACTERÍSTICAS PRINCIPALES

- Plancha churrasquera reversible de hierro fundido.
- Largo total aproximado: 50 cm.
- Superficie útil aproximada: 42 x 23 cm.
- Un lado liso para preparaciones de contacto uniforme.
- Un lado acanalado para marcar carnes y favorecer el drenaje.
- Asas integradas para manipulación con protección adecuada.
- Incluye cuatro cepillos pequeños adicionales.
- Producto nuevo.
- Garantía del vendedor: 30 días.

DOS SUPERFICIES EN UNA SOLA PIEZA

El lado liso es apropiado para huevos, verduras, pan, tortillas y alimentos que necesitan apoyo continuo. El lado acanalado crea líneas de parrilla y ayuda a separar parte de la grasa de carnes, hamburguesas, pollo o vegetales. Puedes elegir la cara según la receta y el resultado deseado.

El hierro fundido retiene y distribuye el calor de forma gradual. Una vez caliente, mantiene una temperatura estable y permite cocinar varias porciones. Para obtener un resultado uniforme, precalienta a fuego bajo o medio y evita cambios bruscos de temperatura.

ANTES DEL PRIMER USO

1. Lava la plancha con agua tibia y una pequeña cantidad de jabón suave.
2. Enjuaga y seca inmediatamente.
3. Aplica una capa muy fina de aceite vegetal apto para altas temperaturas.
4. Calienta de manera gradual para acondicionar la superficie.
5. Deja enfriar de forma natural y retira el exceso de aceite.

El curado ayuda a proteger el hierro y mejora con el uso. Sigue también cualquier indicación incluida por el fabricante.

RECOMENDACIONES DE COCCIÓN

Precalienta lentamente y utiliza una cantidad moderada de aceite. Coloca alimentos secos para reducir salpicaduras. No sobrecargues la superficie, ya que la temperatura puede bajar de manera repentina. Gira los alimentos con utensilios compatibles y controla el fuego durante toda la preparación.

La compatibilidad depende del tamaño, forma y soporte de cada cocina, parrilla u horno. Antes de comprar, compara las medidas con tu equipo. La base debe quedar estable y recibir calor de manera segura. No se debe asumir compatibilidad con inducción u otro sistema específico sin revisar las instrucciones del equipo.

CONTENIDO DEL PAQUETE

- Una plancha reversible de hierro fundido.
- Cuatro cepillos pequeños adicionales.
- Empaque protector para despacho.

ESPECIFICACIONES

- Tipo: plancha churrasquera reversible.
- Material principal: hierro fundido.
- Color: negro.
- Largo total aproximado: 50 cm.
- Área de cocción aproximada: 42 x 23 cm.
- Espesor aproximado: 2 cm.
- Caras: lisa y acanalada.
- Condición: nuevo.

MEDIDAS LOGÍSTICAS

El paquete preparado para despacho mide aproximadamente 50 x 23 x 2 cm y pesa cerca de 3500 g. El hierro fundido es pesado; manipula el paquete con ambas manos y evita golpes durante el traslado.

LIMPIEZA

Deja que la plancha se enfríe antes de limpiarla, pero no permitas que restos húmedos permanezcan durante horas. Retira residuos con agua tibia y un cepillo adecuado. Evita remojarla, usar lavavajillas o aplicar limpiadores abrasivos que eliminen el curado. Seca inmediatamente con calor suave o un paño seco y aplica una película fina de aceite antes de guardar.

Si aparece una zona de oxidación superficial, límpiala de acuerdo con las recomendaciones de cuidado del hierro fundido y vuelve a curar. La prevención depende principalmente de mantener la pieza seca y protegida.

SEGURIDAD EN LA COCINA

La plancha, las asas y la grasa alcanzan temperaturas muy altas. Utiliza guantes térmicos secos y utensilios resistentes al calor. Mantén niños y mascotas alejados. Coloca la pieza sobre una superficie estable y nunca la dejes calentando sin vigilancia.

No agregues agua fría sobre la plancha caliente. El choque térmico puede deformar o dañar el material y generar vapor peligroso. Evita moverla mientras contenga aceite caliente. Comprueba que esté completamente fría antes de lavarla o guardarla.

PREGUNTAS FRECUENTES

¿Es reversible?
Sí. Tiene una cara lisa y otra acanalada.

¿Cuál es el tamaño?
El largo total es de aproximadamente 50 cm y la zona de cocción ronda los 42 x 23 cm.

¿Incluye cepillos?
Sí. Esta presentación añade cuatro cepillos pequeños.

¿Hay que curarla?
Se recomienda acondicionar y mantener el hierro fundido con una capa fina de aceite.

¿Se puede lavar en lavavajillas?
No se recomienda. El lavado prolongado puede retirar el curado y favorecer oxidación.

¿Sirve para cualquier cocina?
La compatibilidad depende del tamaño, soporte y sistema de calor. Compara medidas antes de comprar.

¿Tiene garantía?
Sí. Incluye garantía del vendedor por 30 días.

${common}

En Furaxis valoramos utensilios durables y versátiles. Una plancha reversible permite cambiar de receta sin cambiar de pieza y se convierte en una herramienta que mejora con el cuidado correcto.

Usted también puede buscar: plancha hierro fundido 50 cm, plancha churrasquera reversible, parrilla lisa acanalada, plancha carne verduras, grill hierro fundido cocina, plancha para asado.`;
}

function adultDescription() {
  return `¡Bienvenido a Furaxis!

Artículo de bienestar personal para adultos con diseño realista, función eléctrica y control remoto. La variante color café permite manejar sus funciones de forma cómoda y discreta. La presentación incluye el dispositivo, control, cable USB y una batería pequeña según la configuración mostrada.

CARACTERÍSTICAS PRINCIPALES

- Producto destinado exclusivamente a mayores de 18 años.
- Diseño realista color café.
- Función eléctrica controlada a distancia.
- Control remoto incluido.
- Cable USB incluido.
- Batería pequeña incluida según presentación.
- Controles pensados para un uso gradual.
- Producto nuevo.
- Garantía del vendedor: 30 días.

USO PERSONAL Y RESPONSABLE

Antes del primer uso, revisa completamente la superficie, los controles y el puerto de conexión. Lee las instrucciones incluidas y prueba las funciones sin contacto corporal. Comienza con una intensidad moderada y una sesión breve. Aumenta solo si la experiencia resulta cómoda.

La respuesta y preferencias son personales. No existe una intensidad que sea adecuada para todas las personas. Detén el uso ante dolor, irritación, entumecimiento, sangrado o cualquier sensación desagradable. Nunca utilices presión excesiva ni fuerces el producto.

CONTROL REMOTO

El control permite manejar las funciones disponibles sin sostener directamente los botones del dispositivo. Antes de usar, verifica que la batería esté instalada con la polaridad correcta y que exista conexión. El alcance puede variar por obstáculos, orientación, carga y condiciones del entorno.

Si el control no responde, revisa la carga del dispositivo, la batería del control y la secuencia de encendido. No golpees ni abras componentes eléctricos. Mantén el control seco y fuera de ambientes húmedos.

PRIMER USO

1. Retira todos los elementos del empaque.
2. Revisa que no existan grietas, bordes, piezas sueltas ni daños.
3. Limpia la zona de contacto con un método compatible con el material.
4. Carga el dispositivo con el cable compatible y una fuente adecuada.
5. Prueba los botones y el control remoto antes del contacto corporal.
6. Aplica lubricante compatible si corresponde.
7. Comienza lentamente y sin presión excesiva.
8. Apaga, limpia, seca y guarda por separado después de usar.

CONTENIDO DEL PAQUETE

- Un dispositivo personal para adultos color café.
- Un control remoto.
- Un cable USB compatible.
- Una batería pequeña según presentación.
- Empaque protector.
- Manual según lote.

ESPECIFICACIONES

- Tipo: artículo de bienestar personal para adultos.
- Variante: control remoto.
- Color: café.
- Alimentación: recargable mediante cable USB según presentación.
- Control: remoto.
- Condición: nuevo.

MEDIDAS LOGÍSTICAS

El paquete preparado para despacho mide aproximadamente 23 x 12 x 7 cm y pesa cerca de 550 g. Estas cifras corresponden al bulto completo y no necesariamente a las dimensiones exactas del producto fuera del empaque.

HIGIENE

Limpia antes y después de cada uso. Utiliza agua tibia, jabón neutro o un limpiador compatible, evitando mojar motores, puertos, control y conexiones. No hiervas ni sumerjas componentes eléctricos. No uses alcohol fuerte, cloro, aceites esenciales ni abrasivos.

Seca completamente antes de guardar o conectar a energía. Se recomienda uso individual. Guarda el producto separado de otros materiales para evitar reacciones, transferencia de color o acumulación de humedad.

LUBRICACIÓN Y COMPATIBILIDAD

Cuando se requiera lubricación, utiliza un producto a base de agua y compatible con el material. Evita aceites, cremas y siliconas no recomendadas, porque pueden deteriorar la superficie. Aplica una pequeña cantidad y añade más solo si es necesario.

CARGA Y BATERÍA

Utiliza el cable incluido o uno compatible con las especificaciones del fabricante. Conecta a una fuente USB estable. No uses cargadores dañados ni manipules el puerto con las manos mojadas. Desconecta al completar la carga y no cubras el producto durante el proceso.

SEGURIDAD

Solo para mayores de 18 años. No es un dispositivo médico y no diagnostica, trata ni cura condiciones de salud. No utilices sobre heridas, inflamación, piel irritada ni zonas con sensibilidad reducida. Ante embarazo, cirugía reciente, dispositivo médico implantado o dudas de salud, consulta a un profesional.

Mantén fuera del alcance de niños y mascotas. No utilices mientras conduces, duermes o realizas actividades que requieran atención. Suspende el uso si el producto se calienta de forma inusual, emite olor extraño o presenta fallas.

PREGUNTAS FRECUENTES

¿Es para adultos?
Sí. Está destinado exclusivamente a mayores de 18 años.

¿Incluye control remoto?
Sí. Esta variante incluye control remoto.

¿Incluye cable?
Sí. Incluye un cable USB compatible según presentación.

¿Se puede sumergir?
No se debe asumir que es sumergible. Mantén puertos, motor y control lejos del agua.

¿Cómo se limpia?
Con el equipo apagado, usa un método compatible con el material y seca por completo.

¿Tiene finalidad médica?
No. Es un artículo de bienestar personal y no reemplaza asesoría profesional.

¿Tiene garantía?
Sí. Incluye garantía del vendedor por 30 días.

${common}

En Furaxis priorizamos una presentación clara, discreta y orientada al cuidado responsable. Revisa cada función con calma y conserva las instrucciones para futuras consultas.

Usted también puede buscar: juguete adulto control remoto, vibrador realista café, masajeador recargable USB, artículo bienestar adultos, dispositivo personal control inalámbrico.`;
}

function swingDescription() {
  return `¡Bienvenido a Furaxis!

Movimiento, coordinación y juego activo en una propuesta sencilla para espacios preparados. Este set infantil combina una barra de trapecio de madera con dos anillos en color naranja. Además, esta presentación incorpora dos mosquetones y dos cuerdas de extensión para facilitar una instalación compatible.

CARACTERÍSTICAS PRINCIPALES

- Trapecio infantil con barra de madera.
- Dos anillos de agarre color naranja.
- Dos cuerdas de suspensión.
- Dos mosquetones adicionales.
- Dos cuerdas de extensión adicionales.
- Actividad para coordinación, equilibrio y fuerza de agarre.
- Instalación en soporte resistente y compatible.
- Uso siempre bajo supervisión adulta.
- Producto nuevo.
- Garantía del vendedor: 30 días.

JUEGO ACTIVO

Los anillos y la barra permiten practicar agarres, balanceos suaves y movimientos básicos de forma recreativa. La actividad invita a mover brazos y cuerpo, coordinar ambas manos y ganar confianza gradualmente. Cada niño debe avanzar de acuerdo con su edad, habilidad y condición física.

Comienza con la barra a poca altura y ejercicios simples. Un adulto debe permanecer cerca y controlar que la zona esté libre. No promuevas giros extremos, saltos desde altura, acrobacias ni movimientos que el niño todavía no domina.

ELECCIÓN DEL LUGAR

La seguridad depende principalmente del soporte y la instalación. Utiliza una estructura diseñada para soportar cargas dinámicas, como un marco infantil adecuado o una viga evaluada por una persona competente. No instales en ramas débiles, muebles, cielos falsos, tuberías ni puntos cuya resistencia sea desconocida.

Deja espacio libre alrededor y debajo. Utiliza una superficie amortiguante apropiada para juegos infantiles. Evita concreto, baldosas, bordes, escaleras, ventanas, piscinas, tránsito de vehículos y cualquier obstáculo que pueda causar lesiones.

INSTALACIÓN GENERAL

1. Selecciona dos puntos de fijación firmes, nivelados y compatibles.
2. Revisa cuerdas, costuras, barra, anillos y mosquetones.
3. Instala las cuerdas siguiendo las instrucciones del soporte.
4. Utiliza las extensiones solo cuando sean necesarias y compatibles.
5. Cierra completamente los mosquetones y orienta las aperturas lejos del roce.
6. Ajusta ambos lados para que la barra quede nivelada.
7. Realiza una prueba progresiva con carga controlada antes de permitir el uso infantil.
8. Comprueba que el niño no pueda alcanzar el suelo u obstáculos durante el movimiento.

Si no tienes experiencia instalando equipos suspendidos, solicita ayuda a una persona competente. La inclusión de accesorios no garantiza compatibilidad con todos los soportes.

CONTENIDO DEL PAQUETE

- Una barra de trapecio de madera.
- Dos anillos color naranja.
- Dos cuerdas de suspensión.
- Dos mosquetones adicionales.
- Dos cuerdas de extensión adicionales.
- Empaque protector.

ESPECIFICACIONES

- Tipo: trapecio con anillos para juego infantil.
- Material visible de la barra: madera.
- Color de los anillos: naranja.
- Cantidad de anillos: 2.
- Requiere instalación: sí.
- Uso: recreativo infantil supervisado.
- Condición: nuevo.

MEDIDAS LOGÍSTICAS

El paquete preparado para despacho mide aproximadamente 28 x 32 x 3 cm y pesa cerca de 650 g. Las medidas corresponden al bulto empacado con accesorios.

INSPECCIÓN ANTES DE CADA USO

Comprueba que las cuerdas no tengan cortes, fibras sueltas, quemaduras o desgaste. Revisa que los anillos y la barra no estén agrietados, deformados o con bordes. Confirma que cada conexión esté cerrada y que el soporte no se haya aflojado.

Suspende inmediatamente el uso si encuentras daño o si el montaje produce ruidos, movimientos o deformaciones inusuales. No repares cuerdas con nudos improvisados ni sustituyas conexiones por elementos sin capacidad comprobada.

SUPERVISIÓN Y SEGURIDAD

Un adulto debe supervisar de manera directa durante toda la actividad. Permite un solo usuario a la vez. No enredes cuerdas alrededor del cuello, brazos o piernas. Retira cascos, bufandas, collares y prendas con cordones que puedan engancharse.

No utilizar con lluvia, viento fuerte, hielo ni cuando las cuerdas estén mojadas. Si se instala al exterior, guárdalo después de usar para reducir el deterioro por sol y humedad. La capacidad segura debe determinarse de acuerdo con el soporte, los accesorios, la instalación y las instrucciones del producto.

PREGUNTAS FRECUENTES

¿Qué incluye esta presentación?
Incluye barra de madera, dos anillos, cuerdas, dos mosquetones y dos extensiones adicionales.

¿Viene instalado?
No. Requiere instalación en un soporte resistente y compatible.

¿Se puede colocar en cualquier árbol?
No. La resistencia de una rama no debe asumirse. El punto de instalación debe ser evaluado y seguro.

¿Puede usarlo más de un niño al mismo tiempo?
No. Se recomienda un solo usuario a la vez y supervisión adulta constante.

¿Sirve en interior y exterior?
Puede utilizarse en un espacio preparado, siempre que el soporte, la distancia libre y la superficie sean adecuados.

¿Incluye los mosquetones?
Sí. Esta presentación añade dos mosquetones y dos cuerdas de extensión.

¿Tiene garantía?
Sí. Incluye garantía del vendedor por 30 días.

${common}

En Furaxis buscamos productos que conviertan el movimiento en una experiencia entretenida y ordenada. Una instalación responsable y la supervisión directa son esenciales para disfrutar el juego.

Usted también puede buscar: trapecio infantil, anillos gimnasia niños, columpio barra madera, juego exterior infantil, anillas con cuerdas, columpio con mosquetones, equipo motricidad niños.`;
}

const rows = [
  { source_index:87, sku:'NW260825CQIMS1', category_id:'MLC3894', title:'Carpa Familiar 8-12 Personas Doble Capa Khaki', model:'Familiar 8-12 personas', upc:'916723982731', image_path:'.data/batch-51-129-images/NW260825CQIMS1-1.png', price:244990, package:{length_cm:67,width_cm:29,height_cm:29,weight_g:14000}, description:tentDescription({color:'khaki',dims:'67 x 29 x 29 cm',weight:'14 kg'}), extra_attributes:[{id:'MAX_PEOPLE_CAPACITY',value_name:'12'},{id:'REQUIRES_ASSEMBLY',value_id:'242085'}], grouping_note:'Mismo modelo de carpa que índices 88, 89 y 94; publicado por separado por restricción de variaciones del perfil.' },
  { source_index:88, sku:'NW260826VERMS1', category_id:'MLC3894', title:'Carpa Familiar 8-12 Personas Doble Capa Verde', model:'Familiar 8-12 personas', upc:'916723982748', image_path:'.data/batch-51-129-images/NW260826VERMS1-1.png', price:244990, package:{length_cm:67,width_cm:29,height_cm:29,weight_g:14000}, description:tentDescription({color:'verde',dims:'67 x 29 x 29 cm',weight:'14 kg'}), extra_attributes:[{id:'MAX_PEOPLE_CAPACITY',value_name:'12'},{id:'REQUIRES_ASSEMBLY',value_id:'242085'}], grouping_note:'Mismo modelo de carpa que índices 87, 89 y 94; publicado por separado por restricción de variaciones del perfil.' },
  { source_index:89, sku:'NW260827MARMS1', category_id:'MLC3894', title:'Carpa Familiar 8-12 Personas Doble Capa Café', model:'Familiar 8-12 personas', upc:'916723982755', image_path:'.data/batch-51-129-images/NW260827MARMS1-1.png', price:244990, package:{length_cm:67,width_cm:29,height_cm:29,weight_g:14000}, description:tentDescription({color:'café oscuro',dims:'67 x 29 x 29 cm',weight:'14 kg'}), extra_attributes:[{id:'MAX_PEOPLE_CAPACITY',value_name:'12'},{id:'REQUIRES_ASSEMBLY',value_id:'242085'}], grouping_note:'Mismo modelo de carpa que índices 87, 88 y 94; publicado por separado por restricción de variaciones del perfil.' },
  { source_index:90, sku:'NW260828CQIMS1', category_id:'MLC3894', title:'Carpa Familiar 8-12 Personas Doble Capa Silver Khaki', model:'Familiar Silver 8-12', upc:'916723982762', image_path:'.data/batch-51-129-images/NW260828CQIMS1-1.png', price:345990, package:{length_cm:67,width_cm:29,height_cm:29,weight_g:15500}, description:tentDescription({color:'khaki con recubrimiento plateado',dims:'67 x 29 x 29 cm',weight:'15,5 kg'}), extra_attributes:[{id:'MAX_PEOPLE_CAPACITY',value_name:'12'},{id:'REQUIRES_ASSEMBLY',value_id:'242085'}], grouping_note:'Variante de cobertura completa de la misma familia de carpas 87-89 y 94; publicada por separado.' },
  { source_index:91, sku:'NW260829ROSMS1', category_id:'MLC457425', title:'Set Maquillaje Infantil Maleta Rosa J-1154 Accesorios', model:'J-1154', upc:'979406362879', image_path:'.data/batch-51-129-images/NW260829ROSMS1-1.png', price:53990, package:{length_cm:22,width_cm:20,height_cm:19,weight_g:1500}, description:kidsMakeupDescription({model:'J-1154',style:'maleta desplegable'}) },
  { source_index:92, sku:'NW260834NEGMS1', category_id:'MLC162501', title:'Plancha Churrasquera Reversible Hierro Fundido 50cm', model:'203 50 cm', upc:'979406362886', image_path:'.data/batch-51-129-images/NW260834NEGMS1-1.png', price:32990, package:{length_cm:50,width_cm:23,height_cm:2,weight_g:3500}, description:grillDescription() },
  { source_index:93, sku:'NW260838MARMS1', category_id:'MLC412499', title:'Vibrador Realista Control Remoto Recargable Café Adulto', model:'Emperador Romano remoto', upc:'979406362893', image_path:'.data/batch-51-129-images/NW260838MARMS1-1.png', price:27990, package:{length_cm:23,width_cm:12,height_cm:7,weight_g:550}, description:adultDescription() },
  { source_index:94, sku:'NW260840NARMS1', category_id:'MLC3894', title:'Carpa Familiar 8-12 Personas Doble Capa Naranja', model:'Familiar 8-12 personas', upc:'979406362909', image_path:'.data/batch-51-129-images/NW260840NARMS1-1.png', price:244990, package:{length_cm:67,width_cm:29,height_cm:29,weight_g:14000}, description:tentDescription({color:'naranja',dims:'67 x 29 x 29 cm',weight:'14 kg'}), extra_attributes:[{id:'MAX_PEOPLE_CAPACITY',value_name:'12'},{id:'REQUIRES_ASSEMBLY',value_id:'242085'}], grouping_note:'Mismo modelo de carpa que índices 87, 88 y 89; publicado por separado por restricción de variaciones del perfil.' },
  { source_index:95, sku:'NW260824ROSMS1', category_id:'MLC457425', title:'Set Maquillaje Infantil Estuche Rosa 68816 Accesorios', model:'68816', upc:'979406362916', image_path:'.data/batch-51-129-images/NW260824ROSMS1-1.png', price:32990, package:{length_cm:18,width_cm:12,height_cm:28,weight_g:1100}, description:kidsMakeupDescription({model:'68816',style:'estuche portátil desplegable'}) },
  { source_index:96, sku:'NW260830AMAMS1', category_id:'MLC11236', title:'Trapecio Infantil Madera Con Anillos Cuerdas Mosquetones', model:'Trapecio con anillos', upc:'979406362923', image_path:'.data/batch-51-129-images/NW260830AMAMS1-1.png', price:25990, package:{length_cm:28,width_cm:32,height_cm:3,weight_g:650}, description:swingDescription() }
];

for (const row of rows) {
  const spec = {
    source_index: row.source_index,
    sku: row.sku,
    category_id: row.category_id,
    title: row.title,
    brand: 'Genérica',
    model: row.model,
    upc: row.upc,
    image_path: row.image_path,
    price: row.price,
    price_source: '开发跟踪表平台售价 CL × 1.8，向上取 990 结尾',
    quantity: 10,
    package: row.package,
    extra_attributes: row.extra_attributes || [],
    description: row.description,
    grouping_note: row.grouping_note || ''
  };
  if (spec.title.length > 60) throw new Error(`Title too long ${row.source_index}: ${spec.title.length}`);
  if (spec.description.length < 4000) throw new Error(`Description too short ${row.source_index}: ${spec.description.length}`);
  await fs.writeFile(`.data/publish-spec-${row.source_index}.json`, `${JSON.stringify(spec, null, 2)}\n`);
  console.log(JSON.stringify({source_index:row.source_index,sku:row.sku,title_length:spec.title.length,description_length:spec.description.length}));
}
