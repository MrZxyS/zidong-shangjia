import fs from 'node:fs/promises';

const commonCare = `
CUIDADO Y ALMACENAMIENTO

Después de cada uso, revisa que todas las piezas se encuentren completas y en buen estado. Limpia con un paño suave siguiendo las necesidades del material. Evita solventes, productos abrasivos, calor intenso y exposición prolongada al sol. Guarda en un lugar seco, protegido de polvo, humedad y golpes.

Conserva el empaque durante la prueba inicial. Si detectas una pieza suelta, grieta, cable dañado, olor extraño o funcionamiento irregular, suspende el uso y utiliza la mensajería de la compra para solicitar orientación. No intentes modificar componentes internos.

GARANTÍA Y SOPORTE

El producto cuenta con garantía del vendedor por 30 días. Revisa el contenido al recibir y prueba todas las funciones durante los primeros días. Para consultas posteriores, conserva el comprobante y comunícate mediante la mensajería del pedido.

ANTES DE COMPRAR

Revisa título, fotografías, contenido, medidas logísticas y recomendaciones de uso. Las dimensiones del paquete corresponden al bulto preparado para despacho, no necesariamente al producto armado o fuera de su caja. Los tonos pueden variar ligeramente según iluminación, pantalla o lote.
`;

function toyDescription(p) {
  return `¡Bienvenido a Furaxis!

${p.intro}

Este set invita a construir, probar y volver a comenzar. La actividad favorece la coordinación mano-ojo, la orientación espacial, el reconocimiento de colores y la resolución de pequeños desafíos. Cada diseño puede cambiar, por lo que el juego no queda limitado a una única configuración.

CARACTERÍSTICAS PRINCIPALES

${p.features.map(x => `- ${x}`).join('\n')}
- Producto nuevo.
- Garantía del vendedor: 30 días.

APRENDER MIENTRAS JUEGAN

Armar una estructura exige observar las formas, elegir una pieza y comprobar si encaja. El niño puede comparar tamaños, contar componentes, reconocer colores y anticipar el recorrido. Estas acciones convierten el juego en una experiencia práctica sin dejar de ser entretenida.

Un adulto puede proponer retos sencillos: construir una torre estable, conectar dos puntos, separar piezas por color o recrear un modelo de la caja. La dificultad debe adaptarse a la edad y experiencia. Celebra el proceso y permite que el niño encuentre soluciones propias.

JUEGO INDIVIDUAL O COMPARTIDO

El producto puede disfrutarse de forma individual o en grupo. Al compartir, los participantes practican turnos, comunicación y planificación. Reparte tareas, como ordenar piezas, construir una zona o probar el recorrido, para mantener la actividad organizada.

Las imágenes son una referencia de las posibilidades. No existe una sola forma correcta de utilizar el set. Desarmar y crear nuevamente forma parte de la experiencia.

PRIMER USO

1. Abre el paquete con ayuda de un adulto.
2. Separa las piezas por forma o función.
3. Revisa que no existan componentes dañados.
4. Comienza con una construcción sencilla sobre una superficie plana.
5. Añade piezas gradualmente y verifica la estabilidad.
6. Prueba las funciones sin forzar uniones o mecanismos.
7. Al terminar, guarda todo en la caja o recipiente correspondiente.

CONTENIDO DE ESTA PRESENTACIÓN

${p.contents.map(x => `- ${x}`).join('\n')}

Los colores de componentes menores pueden enviarse surtidos. Los muebles, adornos y elementos de ambientación que aparecen en fotografías no forman parte de la compra.

ESPECIFICACIONES

${p.specs.map(x => `- ${x}`).join('\n')}
- Condición: nuevo.

MEDIDAS DEL PAQUETE

El paquete preparado para despacho mide aproximadamente ${p.dims} y pesa cerca de ${p.weight}. Estas cifras incluyen empaque y accesorios. Abre con cuidado para no cortar piezas, manuales o bolsas internas.

SEGURIDAD INFANTIL

Se requiere supervisión adulta. El set puede contener piezas pequeñas, bolas, imanes, cables o componentes que no deben llevarse a la boca. Mantén lejos de bebés y mascotas. Respeta la edad indicada en el empaque y evalúa la habilidad individual del niño.

No utilices piezas rotas, agrietadas o deformadas. Si el producto contiene imanes, retira inmediatamente cualquier pieza que deje un imán expuesto; la ingestión de imanes requiere atención médica urgente. Si contiene bolas, evita su uso por niños que aún llevan objetos a la boca.

ORGANIZACIÓN DEL JUEGO

Elige una mesa o zona de piso limpia, seca y alejada de escaleras. Mantén bebidas y alimentos fuera del área. Después de jugar, cuenta visualmente los componentes y guárdalos para reducir pérdidas y tropiezos.

PREGUNTAS FRECUENTES

¿Qué variante incluye esta publicación?
${p.variant}

¿Necesita montaje?
Sí, la propuesta principal consiste en unir y organizar las piezas. No requiere herramientas salvo que el empaque indique lo contrario.

¿Las construcciones de la imagen vienen armadas?
No. Las fotografías muestran ejemplos. El usuario debe montar el diseño con las piezas incluidas.

¿Los colores son exactos?
El estilo general corresponde a la imagen, aunque tonos o piezas menores pueden variar por lote.

¿Es un regalo apropiado?
Es una opción para niños interesados en construcción, creatividad y actividades manuales, siempre considerando la edad recomendada.

¿Tiene garantía?
Sí. Incluye garantía del vendedor por 30 días.

${commonCare}

En Furaxis buscamos productos que conviertan el tiempo de juego en una oportunidad para imaginar y aprender. ${p.closing}

Usted también puede buscar: ${p.search}.`;
}

function adultDescription(p) {
  return `¡Bienvenido a Furaxis!

${p.intro}

Este artículo está destinado exclusivamente a personas adultas. Su diseño busca combinar manejo sencillo, almacenamiento discreto y cuidado personal responsable. Lee las recomendaciones antes del primer uso y avanza gradualmente según tu comodidad.

CARACTERÍSTICAS PRINCIPALES

${p.features.map(x => `- ${x}`).join('\n')}
- Uso individual recomendado.
- Producto nuevo.
- Garantía del vendedor: 30 días.

DISEÑO Y MANEJO

La forma del producto permite sujetarlo y controlar su posición. Antes del uso, revisa que la superficie se encuentre íntegra, sin grietas, zonas ásperas ni piezas sueltas. No fuerces un mecanismo ni utilices accesorios distintos de los indicados para esta presentación.

Comienza con una sesión breve y una intensidad moderada cuando exista función eléctrica. Aumenta solo si resulta cómodo. Detén el uso ante dolor, irritación, entumecimiento o cualquier sensación desagradable.

PRIMER USO

1. Retira el producto del empaque y revisa su estado.
2. Lee las instrucciones incluidas.
3. Lava o limpia la zona de contacto según el material.
4. Si es recargable, realiza una carga completa con el cable compatible.
5. Prueba controles o mecanismo antes del contacto corporal.
6. Utiliza lentamente y sin presión excesiva.
7. Apaga o libera el mecanismo al terminar.
8. Limpia, seca y guarda de manera individual.

ESPECIFICACIONES DE LA VARIANTE

${p.specs.map(x => `- ${x}`).join('\n')}
- Público: personas adultas.
- Condición: nuevo.

CONTENIDO DEL PAQUETE

${p.contents.map(x => `- ${x}`).join('\n')}

Los elementos de ambientación no forman parte de la compra. Revisa la imagen principal para identificar la forma y color de la variante.

MEDIDAS LOGÍSTICAS

El paquete preparado para despacho mide aproximadamente ${p.dims} y pesa cerca de ${p.weight}. Las cifras corresponden al bulto completo, no necesariamente a las dimensiones exactas del producto fuera del empaque.

HIGIENE

Limpia antes y después de cada uso. Emplea agua tibia, jabón neutro o un limpiador compatible con el material, evitando mojar motores, puertos o conexiones. No hiervas ni utilices alcohol fuerte, cloro o abrasivos salvo autorización expresa del fabricante.

Seca completamente antes de guardar o conectar a energía. Se recomienda uso individual. Si se comparte, utiliza una barrera adecuada y realiza limpieza completa entre usuarios.

LUBRICACIÓN Y COMPATIBILIDAD

Cuando se requiera lubricante, elige uno a base de agua y compatible con el material. Evita aceites, cremas y siliconas no recomendadas, ya que pueden deteriorar la superficie. Prueba primero una pequeña cantidad.

SEGURIDAD Y USO RESPONSABLE

Solo para mayores de 18 años. No es un dispositivo médico y no diagnostica, trata ni cura condiciones de salud. No utilices sobre heridas, inflamación, piel irritada ni zonas con sensibilidad reducida. Ante embarazo, cirugía reciente, dispositivo médico implantado o dudas de salud, consulta a un profesional.

Mantén fuera del alcance de niños y mascotas. No compartas sin higiene adecuada. No utilices mientras conduces, duermes o bajo efectos que reduzcan la capacidad de reaccionar.

CARGA Y BATERÍA

Si la variante es eléctrica, utiliza el cable compatible y una fuente USB apropiada. Mantén conectores secos y no uses durante la carga. Suspende si detectas calentamiento anormal, olor, hinchazón o cable dañado. La autonomía depende del modo, intensidad y estado de batería.

Si la variante es manual, revisa mangueras, válvulas, uniones y sellos antes de aplicar presión. Incrementa gradualmente y libera inmediatamente si aparece molestia. Nunca busques presión máxima como objetivo.

PREGUNTAS FRECUENTES

¿Es para adultos?
Sí. Está destinado exclusivamente a personas mayores de 18 años.

¿Cómo se limpia?
Con el equipo apagado, utiliza un método compatible con el material, enjuaga de forma controlada y seca por completo.

¿Se puede sumergir?
No se debe asumir que es sumergible. Mantén puertos, motores y conexiones lejos del agua salvo indicación expresa del fabricante.

¿Incluye los accesorios mostrados?
La compra incluye la configuración descrita y visible en la imagen principal. Los elementos decorativos no están incluidos.

¿Tiene finalidad médica?
No. Es un artículo de bienestar personal para adultos y no reemplaza consejo o tratamiento profesional.

¿Tiene garantía?
Sí. Incluye garantía del vendedor por 30 días.

${commonCare}

En Furaxis priorizamos una presentación clara, higiene y uso responsable. ${p.closing}

Usted también puede buscar: ${p.search}.`;
}

const rows = [
  { source_index:78, sku:'NW260814AZUMS1', category_id:'MLC1157', title:'Mesa Bloques Infantil Con Silla 300 Piezas Almacenaje', model:'Mesa 300 piezas', upc:'825753620066', image_path:'.data/batch-51-129-images/NW260814AZUMS1-1.png', price:57990, package:{length_cm:29,width_cm:51,height_cm:17,weight_g:2200}, kind:'toy', intro:'Una mesa de actividades puede convertirse en ciudad, pista, granja o zona de construcción. Esta presentación grande incluye mesa con superficie para bloques, una silla infantil, cuatro cajas laterales, 200 bloques de animales y 100 piezas de pista.', features:['Mesa grande y reforzada para bloques','Una silla infantil con diseño de conejo','200 bloques de construcción con temática animal','100 piezas para crear pista de recorrido','Cuatro cajas laterales de almacenamiento','Patas elevadas y protectores antideslizantes','Colores azul, blanco y amarillo'], contents:['Mesa de bloques desmontada','Una silla infantil','200 bloques de animales','100 piezas de pista','Cuatro cajas organizadoras','Patas y accesorios de montaje'], specs:['Tipo: mesa de construcción infantil','Cantidad total informada: 300 piezas','Incluye silla: sí','Incluye almacenamiento lateral: sí','Color principal: azul'], dims:'29 x 51 x 17 cm', weight:'2200 g', variant:'Corresponde a la mesa grande con una silla, 200 bloques de animales y 100 piezas de pista.', closing:'La mesa ayuda a mantener las piezas organizadas y ofrece un espacio definido para construir.', search:'mesa bloques infantil, mesa didáctica con silla, mesa lego compatible, juego construcción 300 piezas, mesa actividades niños' },
  { source_index:79, sku:'NW260815AZUMS1', category_id:'MLC1157', title:'Pista Canicas Bloques Construcción 197 Piezas + 30 Bolas', model:'Marble Run 197', upc:'825753620073', image_path:'.data/batch-51-129-images/NW260815AZUMS1-1.png', price:32990, package:{length_cm:38,width_cm:9,height_cm:26,weight_g:920}, kind:'toy', intro:'Observa cómo una bola desciende por curvas, embudos, tubos y cambios de nivel. Este set Marble Run incorpora 197 piezas de construcción y se complementa con una bolsa adicional de 30 bolas de colores para ampliar el juego.', features:['Pista de canicas modular','197 piezas indicadas en la caja','30 bolas de colores adicionales','Tubos, curvas, embudos y bases','Configuraciones de diferentes alturas','Empaque en inglés','Colores surtidos'], contents:['197 componentes del set Marble Run','30 bolas de colores adicionales','Piezas de pista y soportes','Caja de presentación'], specs:['Tipo: pista de canicas para armar','Cantidad del set: 197 piezas','Adicional: 30 bolas de colores','Tamaño armado de referencia en imagen: 55 x 28 x 48 cm'], dims:'38 x 9 x 26 cm', weight:'920 g', variant:'Corresponde al set de 197 piezas con una bolsa extra de 30 bolas de colores.', closing:'Cambiar la altura y el orden de las piezas permite descubrir nuevos recorridos.', search:'pista canicas niños, marble run 197 piezas, bloques construcción pista bolas, juego didáctico gravedad' },
  { source_index:80, sku:'NW26082ROJMS1', category_id:'MLC1157', title:'Bloques Magnéticos 56 Piezas Ventana Con Caja Niños', model:'Ventana 56 piezas', upc:'825753620080', image_path:'.data/batch-51-129-images/NW26082ROJMS1-1.png', price:31990, package:{length_cm:24,width_cm:19,height_cm:13,weight_g:1460}, kind:'toy', intro:'Construye casas, castillos, animales y figuras geométricas con un set de 56 bloques magnéticos transparentes. Las piezas de colores se unen por sus bordes y se guardan en la caja plástica incluida.', features:['56 piezas magnéticas de colores','Cuadrados, triángulos, ventanas y formas especiales','Caja organizadora incluida','Uniones magnéticas fáciles de montar','Guía de ideas incluida','Colores surtidos translúcidos'], contents:['56 bloques magnéticos','Una caja de almacenamiento','Una guía de construcción'], specs:['Tipo: bloques magnéticos','Cantidad: 56 piezas','Material principal: plástico con imanes integrados','Incluye caja: sí'], dims:'24 x 19 x 13 cm', weight:'1460 g', variant:'Corresponde al set de ventana de 56 piezas con caja organizadora.', closing:'Las formas variadas permiten pasar de construcciones planas a modelos tridimensionales.', search:'bloques magnéticos 56 piezas, imanes construcción niños, magnetic tiles caja, juego STEM didáctico' },
  { source_index:81, sku:'NW260799ROJMS1', category_id:'MLC440778', title:'Pista Magnética Modular 91 Piezas Con Auto Eléctrico', model:'Levitating Rail Car 91', upc:'825753620097', image_path:'.data/batch-51-129-images/NW260799ROJMS1-1.png', price:35990, package:{length_cm:26,width_cm:6,height_cm:36,weight_g:830}, kind:'toy', intro:'Crea puentes, curvas y recorridos elevados con esta pista modular de 91 piezas. El conjunto incluye un vehículo eléctrico y accesorios de tránsito para imaginar una pequeña red urbana.', features:['91 piezas según la presentación','Un vehículo eléctrico incluido','Pista modular con curvas y tramos elevados','Señales y barreras de tránsito','Piezas de conexión por encaje','Empaque en inglés','Recomendado desde 3 años según la caja'], contents:['91 componentes de pista y decoración','Un vehículo eléctrico','Cable de alimentación o carga mostrado','Señales, barreras y accesorios','Manual según lote'], specs:['Tipo: pista modular infantil','Cantidad: 91 piezas','Vehículos incluidos: 1','Temática: transporte urbano'], dims:'26 x 6 x 36 cm', weight:'830 g', variant:'Corresponde a la versión de 91 piezas con un vehículo.', closing:'La pista puede reorganizarse para crear recorridos nuevos y escenas de transporte.', search:'pista magnética 91 piezas, pista auto eléctrico niños, circuito modular juguete, pista tren levitación' },
  { source_index:82, sku:'NW260817NEGMS1', category_id:'MLC2738', title:'Bomba De Vacío Manual Para Adultos Con Accesorios', model:'Bomba manual con cilindro', upc:'825753620103', image_path:'.data/batch-51-129-images/NW260817NEGMS1-1.png', price:17990, package:{length_cm:11,width_cm:6,height_cm:24,weight_g:350}, kind:'adult', intro:'Kit manual de vacío para adultos con cilindro transparente, bomba de palanca, manguera flexible y accesorios de ajuste. El mecanismo manual permite aumentar y liberar la presión de manera gradual y controlada.', features:['Bomba de vacío manual con palanca','Cilindro transparente de aproximadamente 18,5 cm','Manguera flexible desmontable','Tres adaptadores de diferentes diámetros','Accesorio flexible adicional','Dos juegos de anillos según la configuración','No requiere electricidad'], contents:['Un cilindro transparente','Una bomba manual','Una manguera flexible','Tres adaptadores','Accesorio flexible','Anillos incluidos según presentación','Bolsa de empaque'], specs:['Tipo: bomba de vacío manual para adultos','Funcionamiento: manual','Color principal: negro y transparente','Cilindro visible: aproximadamente 18,5 cm de largo'], dims:'11 x 6 x 24 cm', weight:'350 g', closing:'El control manual permite avanzar lentamente y liberar la presión cuando sea necesario.', search:'bomba vacío adultos manual, bomba con cilindro y manguera, accesorio personal masculino, bomba entrenamiento adulto' },
  { source_index:83, sku:'NW260818ROSMS1', category_id:'MLC412499', title:'Vibrador Doble Extremo Recargable Con Calor Rosado', model:'Doble extremo calefacción', upc:'825753620110', image_path:'.data/batch-51-129-images/NW260818ROSMS1-1.png', price:25990, package:{length_cm:23,width_cm:6,height_cm:5,weight_g:270}, kind:'adult', intro:'Masajeador vibratorio para adultos con diseño de doble extremo, controles integrados y función de calentamiento. Su cuerpo curvo en color rosado permite sujetarlo cómodamente y alternar las funciones desde el mango.', features:['Diseño de doble extremo','Función de vibración','Función de calentamiento','Controles integrados','Batería recargable','Color rosado intenso','Formato ergonómico'], contents:['Un masajeador vibratorio','Cable de carga compatible según presentación','Empaque protector','Manual según lote'], specs:['Tipo: vibrador de doble extremo','Color: rosado','Funciones: vibración y calentamiento','Alimentación: batería recargable'], dims:'23 x 6 x 5 cm', weight:'270 g', closing:'Los controles integrados y la forma curva facilitan un uso gradual y personal.', search:'vibrador doble extremo, masajeador recargable con calor, vibrador rosado adultos, juguete adulto USB' },
  { source_index:84, sku:'NW260819ROSMS1', category_id:'MLC2741', title:'Masturbador Masculino Pro2 Recargable Compacto Adulto', model:'Pro2', upc:'825753620127', image_path:'.data/batch-51-129-images/NW260819ROSMS1-1.png', price:23990, package:{length_cm:12,width_cm:8,height_cm:12,weight_g:250}, kind:'adult', intro:'Dispositivo personal masculino Pro2 en formato compacto y recargable. Su diseño de mano incorpora una abertura con borde suave y controles integrados para manejar las funciones disponibles.', features:['Modelo Pro2','Formato compacto de mano','Controles integrados','Funcionamiento recargable','Abertura con borde flexible','Color rosado metálico y blanco','Presentación en caja'], contents:['Un dispositivo Pro2','Cable de carga compatible según presentación','Caja protectora','Manual según lote'], specs:['Tipo: masturbador masculino','Modelo: Pro2','Alimentación: batería recargable','Color principal: rosado metálico'], dims:'12 x 8 x 12 cm', weight:'250 g', closing:'Su tamaño compacto facilita la manipulación, limpieza y almacenamiento privado.', search:'masturbador masculino Pro2, juguete adulto recargable, masajeador masculino compacto, accesorio personal adultos' },
  { source_index:85, sku:'NW260820BLAMS1', category_id:'MLC2741', title:'Masturbador Masculino Pro G-spot Recargable Adulto', brand:'Satisfyer', model:'Pro+ G-Spot', upc:'825753620134', image_path:'.data/batch-51-129-images/NW260820BLAMS1-1.png', price:30990, package:{length_cm:28,width_cm:12,height_cm:7,weight_g:440}, kind:'adult', intro:'Satisfyer Pro+ G-Spot combina un diseño curvo, dos zonas funcionales y controles sencillos en una presentación recargable. El producto llega en caja de regalo y está destinado exclusivamente a personas adultas.', features:['Modelo Pro+ G-Spot','Diseño curvo de doble zona','Función de vibración','Tecnología de pulsos de aire indicada en el empaque','Controles integrados','Batería recargable','Color blanco','Presentación en caja de regalo'], contents:['Un Satisfyer Pro+ G-Spot','Cable de carga compatible','Caja de presentación','Manual según lote'], specs:['Tipo: accesorio personal recargable','Marca visible: Satisfyer','Modelo: Pro+ G-Spot','Color: blanco','Funciones declaradas: pulsos de aire y vibración'], dims:'28 x 12 x 7 cm', weight:'440 g', closing:'La forma curvada y los controles accesibles permiten explorar las funciones de manera progresiva.', search:'Satisfyer Pro G Spot, masajeador recargable adultos, pulsos de aire vibrador, juguete adulto blanco' },
  { source_index:86, sku:'NW26081BLAMS1', category_id:'MLC440513', title:'Tablero Dibujo Luminoso Grande Acrílico 7 Marcadores', model:'Tablero luminoso 30,5 x 20,5 cm', upc:'825753620141', image_path:'.data/batch-51-129-images/NW26081BLAMS1-1.png', price:13990, package:{length_cm:31,width_cm:21,height_cm:3,weight_g:360}, kind:'toy', intro:'Dibuja con colores que resaltan sobre una superficie acrílica iluminada. Este tablero grande incluye base, paño, cable USB y siete marcadores para crear mensajes, figuras y decoraciones borrables.', features:['Tablero acrílico luminoso','Tamaño aproximado de superficie: 30,5 x 20,5 cm','Siete marcadores de colores','Base de apoyo incluida','Paño de limpieza incluido','Cable USB incluido','Dibujos borrables y reutilizables'], contents:['Un tablero acrílico','Una base de apoyo','Siete marcadores','Un paño de limpieza','Un cable USB'], specs:['Tipo: tablero de dibujo luminoso','Superficie aproximada: 30,5 x 20,5 cm','Cantidad de marcadores: 7','Alimentación: USB'], dims:'31 x 21 x 3 cm', weight:'360 g', variant:'Corresponde al tablero luminoso grande con siete marcadores.', closing:'La iluminación realza los trazos y permite renovar el diseño después de limpiar la superficie.', search:'tablero dibujo luminoso, pizarra acrílica LED niños, tablero borrable 7 marcadores, regalo creativo infantil', extra_attributes:[{id:'PRODUCT_TYPE',value_id:'38481225'}] }
];

for (const row of rows) {
  const spec = {
    source_index: row.source_index, sku: row.sku, category_id: row.category_id,
    title: row.title, brand: row.brand || 'Genérica', model: row.model, upc: row.upc,
    image_path: row.image_path, price: row.price,
    price_source: '开发跟踪表平台售价 CL × 1.8，向上取 990 结尾', quantity: 10,
    package: row.package, extra_attributes: row.extra_attributes || [],
    description: row.kind === 'adult' ? adultDescription(row) : toyDescription(row)
  };
  await fs.writeFile(`.data/publish-spec-${row.source_index}.json`, `${JSON.stringify(spec, null, 2)}\n`);
  console.log(JSON.stringify({ source_index: row.source_index, sku: row.sku, title_length: row.title.length, description_length: spec.description.length }));
}
