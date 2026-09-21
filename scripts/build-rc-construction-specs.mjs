import fs from 'node:fs/promises';

const products = [
  {
    source_index: 68,
    sku: 'NW26089AMAMS1',
    upc: '510089892637',
    title: 'Camión Tolva Control Remoto 2.4g 6 Canales Metal Amarillo',
    model: '258-13',
    vehicle: 'camión tolva o volquete',
    channels: 6,
    movable: 'tolva elevable para cargar, transportar y descargar materiales livianos de juego',
    actions: 'avanzar, retroceder, girar y subir o bajar la tolva',
    package: { length_cm: 27, width_cm: 13, height_cm: 12, weight_g: 626 },
    image_path: '.data/batch-51-129-images/NW26089AMAMS1-1.png'
  },
  {
    source_index: 69,
    sku: 'NW26088AMAMS1',
    upc: '510089892644',
    title: 'Excavadora Control Remoto 2.4g 8 Canales Metal Amarilla',
    model: '1051',
    vehicle: 'excavadora de orugas',
    channels: 8,
    movable: 'brazo articulado y pala para simular tareas de excavación y carga',
    actions: 'avanzar, retroceder, girar y controlar los movimientos del brazo y la pala',
    package: { length_cm: 31, width_cm: 13, height_cm: 15, weight_g: 636 },
    image_path: '.data/batch-51-129-images/NW26088AMAMS1-1.png'
  }
];

function description(p) {
  return `¡Bienvenido a Furaxis!

Las obras imaginarias pueden comenzar en una habitación, un patio protegido o una caja de arena limpia. Este ${p.vehicle} a control remoto combina apariencia de maquinaria de construcción, detalles metálicos y manejo inalámbrico de 2,4 GHz. El modelo ${p.model} ofrece ${p.channels} canales y permite ${p.actions}, creando una experiencia entretenida para practicar coordinación y recrear escenas de trabajo.

La presentación incluye el vehículo, control remoto, batería recargable para el vehículo, cable USB de carga, destornillador y manual. Su color amarillo con detalles oscuros recuerda a las máquinas que se ven en obras. Es un juguete de simulación; no está diseñado para transportar peso real, agua, piedras grandes ni materiales abrasivos.

CARACTERÍSTICAS PRINCIPALES

- Vehículo de construcción a control remoto.
- Modelo ${p.model} con ${p.channels} canales.
- Frecuencia de control de 2,4 GHz.
- Color amarillo con detalles negros y grises.
- Componentes metálicos combinados con plástico resistente.
- ${p.movable.charAt(0).toUpperCase() + p.movable.slice(1)}.
- Batería recargable para el vehículo.
- Cable USB de carga incluido.
- Control remoto incluido.
- Destornillador y manual incluidos.
- Producto nuevo.

JUEGO DE CONSTRUCCIÓN CON MOVIMIENTO

El control permite dirigir la máquina y operar sus funciones principales. El niño puede crear rutas, transportar piezas livianas, organizar una zona de trabajo imaginaria y repetir maniobras. Cada acción exige observar la posición, calcular distancia y coordinar los mandos con el movimiento del vehículo.

Comienza en una superficie lisa y despejada. Aprende primero a avanzar, retroceder y girar. Después incorpora el movimiento de ${p.movable}. Esta progresión ayuda a familiarizarse con los controles y reduce choques durante los primeros minutos.

CONTROL 2,4 GHZ

La frecuencia de 2,4 GHz proporciona una respuesta estable dentro del alcance normal del juguete y permite que varios vehículos compatibles funcionen cerca con menos interferencia que sistemas antiguos. El alcance real depende de paredes, obstáculos, carga de batería y otros equipos inalámbricos.

Enciende primero el vehículo o el control según indique el manual y espera la vinculación. Si no responde, apaga ambos, revisa las pilas del control y vuelve a intentar a corta distancia. No utilices cerca de calles, escaleras, piscinas ni lugares donde pueda caer.

PIEZAS MÓVILES Y DETALLES REALISTAS

El diseño incorpora una cabina, ruedas u orugas y mecanismos inspirados en maquinaria real. Los acabados metálicos aportan una sensación más sólida, mientras las partes plásticas permiten mantener un peso adecuado para el juego. Los accesorios y colores menores pueden variar ligeramente según el lote, tal como ocurre con piezas del control o batería.

La función principal es ${p.movable}. Opera el mecanismo sin forzarlo y detén el mando cuando llegue al final de su recorrido. No intentes levantar objetos pesados ni sujetes la parte móvil mientras el motor funciona.

CONTENIDO DEL PAQUETE

- Un ${p.vehicle} a control remoto.
- Un control remoto de 2,4 GHz.
- Una batería recargable para el vehículo.
- Un cable USB de carga.
- Un destornillador para el compartimiento correspondiente.
- Un manual de uso.

Las pilas del control remoto normalmente no se incluyen. Ten disponibles pilas AA nuevas y confirma la cantidad indicada en el compartimiento. Los elementos de escenario, arena, piedras y otros vehículos no forman parte de la compra.

PRIMER USO

1. Retira el vehículo y los accesorios del empaque.
2. Revisa que no existan piezas sueltas o daños visibles.
3. Carga la batería del vehículo con el cable incluido.
4. Instala pilas nuevas en el control respetando la polaridad.
5. Conecta la batería y cierra el compartimiento.
6. Enciende y espera el emparejamiento.
7. Prueba cada función a baja velocidad y corta distancia.
8. Apaga y desconecta la batería al terminar.

Durante la carga, coloca la batería sobre una superficie no inflamable y ventilada. No la dejes sin supervisión, no la cubras y no utilices cargadores dañados. El tiempo de funcionamiento cambia según carga, temperatura, uso de motores y estado de la batería.

IDEAS DE JUEGO

Organiza un recorrido con obstáculos livianos, marca una zona de carga y otra de descarga, o crea turnos para completar una misión. Puedes usar bloques grandes, bolas de papel o piezas adecuadas al tamaño. Evita arena húmeda, tierra con piedras y materiales que puedan entrar en engranajes.

Para practicar coordinación, realiza maniobras lentas: estacionar entre dos marcas, girar alrededor de un cono o mover una carga liviana sin dejarla caer. El juego acompañado permite conversar sobre seguridad, vehículos y tareas de construcción.

USO EN INTERIOR Y EXTERIOR PROTEGIDO

En interiores, utiliza pisos lisos y retira objetos frágiles. En exterior, elige una superficie seca, limpia y alejada del tránsito. No uses bajo lluvia, sobre barro profundo ni cerca de agua. El vehículo no se declara impermeable.

Las ruedas u orugas pueden recoger polvo y cabellos. Limpia después de cada sesión para conservar el movimiento. No conduzcas sobre superficies que puedan rayarse sin realizar una prueba en una zona poco visible.

ESPECIFICACIONES DE LA VARIANTE

- Tipo: ${p.vehicle} de juguete a control remoto.
- Modelo: ${p.model}.
- Canales: ${p.channels}.
- Frecuencia: 2,4 GHz.
- Color principal: amarillo.
- Materiales: metal y plástico.
- Alimentación del vehículo: batería recargable.
- Alimentación del control: pilas.
- Funciones: ${p.actions}.
- Condición: nuevo.
- Garantía del vendedor: 30 días.

MEDIDAS DEL PAQUETE

El bulto preparado para despacho mide aproximadamente ${p.package.length_cm} x ${p.package.width_cm} x ${p.package.height_cm} cm y pesa cerca de ${p.package.weight_g} g. Estas cifras corresponden a la caja con accesorios y no son las dimensiones exactas del vehículo fuera del empaque.

Abre con cuidado para no cortar cables ni manuales. Conserva la caja durante la prueba inicial. El vehículo puede venir sujeto con amarres que deben retirarse completamente antes de encender.

BATERÍA Y CARGA

Utiliza solo el cable incluido y una fuente USB adecuada. Conecta sin forzar y respeta la polaridad de los conectores. Deja enfriar la batería antes de recargar si estuvo en uso. No cargues una batería hinchada, perforada o con olor extraño.

Guarda la batería parcialmente cargada si no usarás el juguete durante varias semanas y revisa periódicamente su estado. Mantén baterías y pilas fuera del alcance de niños. No mezcles pilas nuevas y usadas en el control.

SEGURIDAD DURANTE EL JUEGO

Se recomienda supervisión adulta. El producto contiene piezas pequeñas, batería y mecanismos móviles. No es adecuado para niños que todavía llevan objetos a la boca. Respeta la edad indicada en el empaque y evalúa la habilidad individual del usuario.

Mantén dedos, cabello y ropa lejos de ruedas, orugas, engranajes y articulaciones. No detengas un mecanismo con la mano mientras el motor está activo. Apaga antes de liberar una pieza atascada.

CUIDADO Y MANTENIMIENTO

Apaga y desconecta la batería antes de limpiar. Utiliza un paño seco o un cepillo suave. No sumerjas ni uses solventes. Retira arena y cabellos de ejes y articulaciones. Revisa tornillos sin apretar en exceso.

Si el vehículo pierde fuerza, carga la batería antes de asumir una falla. Si se desvía, inspecciona ruedas u orugas. Detén el uso ante ruido anormal, olor, humo o calentamiento excesivo.

PREGUNTAS FRECUENTES

¿Qué vehículo incluye esta publicación?
Corresponde a un ${p.vehicle}, modelo ${p.model}.

¿Cuántos canales tiene?
Este modelo ofrece ${p.channels} canales de control.

¿Qué frecuencia utiliza?
Utiliza control inalámbrico de 2,4 GHz.

¿Incluye batería para el vehículo?
Sí. Incluye una batería recargable y cable USB.

¿Incluye pilas para el control?
Normalmente no. Revisa el compartimiento y utiliza pilas AA nuevas según indique el manual.

¿Tiene piezas metálicas?
Sí, combina componentes metálicos con piezas plásticas.

¿Puede usarse en arena?
Solo en material limpio y seco, evitando que partículas entren en mecanismos. No se recomienda arena húmeda, barro ni piedras.

¿Es impermeable?
No. Mantén alejado de lluvia, charcos y agua.

¿Las medidas del paquete son las del vehículo?
No. Son dimensiones logísticas de la caja completa.

¿Tiene garantía?
Sí. Incluye garantía del vendedor por 30 días. Utiliza la mensajería del pedido para consultas posteriores.

ANTES DE COMPRAR

Revisa el modelo, el tipo de máquina, los canales y los accesorios incluidos. Considera que los colores de accesorios menores pueden variar por lote. Confirma que el usuario pueda manipular control, batería y piezas móviles con supervisión apropiada.

En Furaxis buscamos ofrecer juguetes que inviten a imaginar, coordinar y compartir. Este ${p.vehicle} combina control de 2,4 GHz, batería recargable y movimiento funcional para crear pequeñas obras y desafíos en casa.

Usted también puede buscar: vehículo de construcción a control remoto, ${p.vehicle} RC, juguete maquinaria amarilla, camión control remoto, excavadora control remoto, juguete 2.4 GHz, vehículo RC recargable, juguete de construcción metálico, maquinaria de juguete con batería.`;
}

for (const p of products) {
  const spec = {
    source_index: p.source_index,
    sku: p.sku,
    category_id: 'MLC12154',
    title: p.title,
    brand: 'Genérica',
    model: p.model,
    upc: p.upc,
    image_path: p.image_path,
    price: 46990,
    price_source: '开发跟踪表平台售价 CL × 1.8，向上取 990 结尾',
    quantity: 10,
    package: p.package,
    extra_attributes: [
      { id: 'VEHICLE_POWER_SUPPLY_TYPE', value_name: 'Batería' },
      { id: 'REMOTE_CONTROL_POWER_SUPPLY_TYPE', value_name: 'Pilas' },
      { id: 'REMOTE_CONTROL_BATTERIES_TYPE', value_name: 'AA' },
      { id: 'REMOTE_CONTROL_BATTERIES_NUMBER', value_name: '2' },
      { id: 'BODY_MATERIALS', value_name: 'Metal y plástico ABS' },
      { id: 'IS_SUITABLE_FOR_SHIPMENT', value_id: '242085' }
    ],
    description: description(p)
  };
  await fs.writeFile(`.data/publish-spec-${p.source_index}.json`, `${JSON.stringify(spec, null, 2)}\n`);
  console.log(JSON.stringify({ index: p.source_index, title_length: p.title.length, description_length: spec.description.length }));
}
