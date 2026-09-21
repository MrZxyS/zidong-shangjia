import fs from 'node:fs/promises';

const products = [
  {
    source_index: 62,
    sku: 'NW260763NEGMS1',
    upc: '510089892576',
    title: 'Extractor Aire Industrial 6 Pulgadas 150mm 40w 220v Negro',
    model: 'FD150',
    inches: 6,
    diameter_mm: 150,
    depth_mm: 135,
    power_w: 40,
    airflow: 600,
    price: 35990,
    weight_g: 1050,
    package: { length_cm: 15, width_cm: 15, height_cm: 16 },
    image_path: '.data/batch-51-129-images/NW260763NEGMS1-1.png'
  },
  {
    source_index: 63,
    sku: 'NW260768NEGMS1',
    upc: '510089892583',
    title: 'Extractor Aire Industrial 10 Pulgadas 250mm 100w 220v Negro',
    model: 'FD250',
    inches: 10,
    diameter_mm: 245,
    depth_mm: 155,
    power_w: 100,
    airflow: 2100,
    price: 55990,
    weight_g: 2100,
    package: { length_cm: 25, width_cm: 17, height_cm: 25 },
    image_path: '.data/batch-51-129-images/NW260768NEGMS1-1.png'
  }
];

function description(p) {
  return `¡Bienvenido a Furaxis!

Renovar el aire de un espacio ayuda a reducir la sensación de encierro, evacuar olores y acompañar el control de calor o humedad. Este extractor axial cilíndrico de ${p.inches} pulgadas está diseñado para integrarse a una instalación de ventilación compatible. La variante negra modelo ${p.model} trabaja a 220 V y 50 Hz, incorpora motor con bobinado de cobre y entrega una potencia nominal de ${p.power_w} W.

Su cuerpo redondo permite instalarlo en un conducto o abertura de aproximadamente ${p.diameter_mm} mm, según las tolerancias del montaje. El formato compacto facilita usarlo en proyectos de extracción de aire para talleres, bodegas, cocinas, baños, quinchos, áreas de trabajo u otros recintos, siempre que el caudal, las condiciones ambientales y la instalación eléctrica sean adecuados.

CARACTERÍSTICAS PRINCIPALES

- Extractor de aire axial de formato cilíndrico.
- Diámetro nominal: ${p.inches} pulgadas.
- Modelo de referencia: ${p.model}.
- Color principal: negro.
- Alimentación: 220 V, 50 Hz.
- Potencia nominal: ${p.power_w} W.
- Velocidad indicada: aproximadamente 2800 rpm.
- Caudal estándar declarado: aproximadamente ${p.airflow} m³/h.
- Diámetro exterior visible de referencia: ${p.diameter_mm} mm.
- Profundidad aproximada del cuerpo: ${p.depth_mm} mm.
- Motor con bobinado de cobre según la configuración adquirida.
- Cable preparado con enchufe europeo de dos pines.
- Producto nuevo.

VENTILACIÓN PARA DIFERENTES ESPACIOS

El extractor crea movimiento de aire a través de sus aspas y ayuda a dirigirlo hacia un conducto o salida. Para lograr un resultado efectivo, el aire extraído debe poder salir y el recinto debe contar con una entrada de reposición. Una puerta completamente sellada o un conducto obstruido puede reducir considerablemente el rendimiento.

El caudal anunciado se obtiene bajo condiciones de referencia. Codos, rejillas, filtros, ductos largos, diferencias de diámetro y presión reducen el flujo real. Antes de comprar, calcula el volumen del recinto y la cantidad de renovaciones de aire que requiere tu aplicación. En instalaciones exigentes, solicita el diseño de un especialista en ventilación.

MODELO ${p.model} DE ${p.inches} PULGADAS

Esta publicación corresponde específicamente al modelo ${p.model}. La abertura recomendada se encuentra alrededor de ${p.diameter_mm} mm y el cuerpo tiene una profundidad aproximada de ${p.depth_mm} mm. Mide el espacio disponible y deja margen para sujeción, conexión eléctrica y mantenimiento. No confundas esta variante con extractores de otro diámetro que utilizan una carcasa visualmente similar.

La imagen principal incluye las cifras del modelo para facilitar la identificación. Revisa el diámetro, potencia y caudal antes de finalizar la compra. Si vas a reemplazar una unidad existente, mide tanto la abertura como el largo del cuerpo, y compara la tensión y frecuencia.

INSTALACIÓN MECÁNICA

1. Define la dirección de flujo que necesita el recinto.
2. Mide la abertura o conducto y compárala con el diámetro del extractor.
3. Elige soportes y fijaciones adecuados al muro, techo o ducto.
4. Evita deformar la carcasa al apretar los tornillos.
5. Comprueba que las aspas giren libremente y no rocen el cuerpo.
6. Sella el perímetro sin bloquear entradas, salidas ni ventilación del motor.
7. Instala una rejilla o protección cuando exista acceso a las aspas.
8. Antes de energizar, revisa la firmeza y retira herramientas del área.

La orientación debe respetar el diseño del producto y las condiciones del proyecto. Una fijación insuficiente puede generar vibraciones, ruido o desprendimiento. Si la unidad se instala en altura, incorpora medidas de seguridad apropiadas y no trabajes sin equipo adecuado.

CONEXIÓN ELÉCTRICA

El producto está especificado para 220 V y 50 Hz. La variante incluye cable con enchufe europeo de dos pines preparado según la solicitud de origen. En Chile, verifica la compatibilidad física del tomacorriente; algunos puntos pueden requerir un adaptador apropiado. Un adaptador de forma no cambia el voltaje ni reemplaza las protecciones eléctricas.

Conecta solo a una instalación en buenas condiciones y protegida de acuerdo con la potencia. No manipules cables con energía. Si necesitas empotrar, extender o modificar el cable, el trabajo debe realizarlo una persona calificada y respetar la normativa local. No elimines protecciones ni improvises uniones expuestas.

UBICACIÓN Y CONDUCTOS

Coloca el extractor lo más cerca posible de la zona donde se acumula aire caliente, vapor u olor, sin exponerlo a temperaturas o humedad superiores a las admitidas por su fabricación. Para baños o cocinas, considera distancias de seguridad, condensación y requisitos eléctricos específicos. Este modelo no se declara resistente al agua ni apto para contacto directo con lluvia.

Utiliza ductos con un diámetro compatible. Reducir bruscamente la sección aumenta la resistencia y puede producir ruido. Mantén el recorrido corto y con pocos codos cuando sea posible. Sujeta el conducto para que su peso no recaiga sobre la carcasa del ventilador.

CAUDAL Y DESEMPEÑO

El caudal de referencia del modelo es de aproximadamente ${p.airflow} m³/h. Esta cifra ayuda a comparar variantes, pero el valor real depende del montaje. Para estimar una necesidad básica, multiplica el volumen del recinto por las renovaciones de aire por hora recomendadas para ese uso y compara el resultado con una curva de rendimiento adecuada.

El extractor no reemplaza una campana captadora cuando se requiere recoger grasa o humo en el punto de generación. Tampoco debe emplearse para transportar gases peligrosos, polvo combustible, vapores corrosivos o materiales a alta temperatura sin una certificación específica.

ESPECIFICACIONES TÉCNICAS

- Tipo: extractor axial cilíndrico.
- Modelo: ${p.model}.
- Diámetro nominal: ${p.inches} pulgadas.
- Diámetro de referencia: ${p.diameter_mm} mm.
- Profundidad aproximada: ${p.depth_mm} mm.
- Voltaje: 220 V.
- Frecuencia: 50 Hz.
- Potencia: ${p.power_w} W.
- Velocidad: 2800 rpm de referencia.
- Caudal estándar: ${p.airflow} m³/h de referencia.
- Color: negro.
- Instalación: pared, techo o ducto compatible, según proyecto.
- Uso recomendado: interior protegido.
- Garantía del vendedor: 30 días.

MEDIDAS DEL PAQUETE

El paquete preparado para despacho mide aproximadamente ${p.package.length_cm} x ${p.package.width_cm} x ${p.package.height_cm} cm y pesa cerca de ${p.weight_g} g. Son dimensiones logísticas del bulto y no sustituyen las medidas técnicas del extractor. Para diseñar la abertura, utiliza el diámetro y la profundidad indicados para el modelo.

Abre la caja con cuidado y evita que una cuchilla alcance el cable o las aspas. Revisa que la carcasa no presente deformaciones por transporte. Gira manualmente las aspas con el equipo desconectado para confirmar que no existan obstrucciones.

PUESTA EN MARCHA

Después de instalar, enciende durante un periodo breve y escucha el funcionamiento. Un flujo uniforme y una vibración controlada indican que el montaje está alineado. Si aparecen golpes, roce, movimiento excesivo u olor anormal, apaga de inmediato y revisa fijaciones, aspas y alimentación.

Comprueba la dirección del aire con una tira liviana de papel sin acercarla a las aspas. Verifica que la salida exterior no esté bloqueada. Durante las primeras horas, revisa que el motor no alcance una temperatura anormal y que el enchufe permanezca firme.

MANTENIMIENTO

Desconecta la alimentación antes de cualquier tarea. El polvo acumulado en aspas y carcasa reduce el caudal y puede desequilibrar el giro. Limpia periódicamente con un paño o cepillo suave, sin mojar el motor. Si hay rejillas o filtros externos, mantenlos despejados.

Revisa tornillos, soportes, cable y enchufe. Un aumento de ruido suele indicar suciedad, holgura, obstrucción o desgaste. No apliques lubricantes sin confirmar que sean compatibles. No introduzcas objetos a través de la abertura mientras el equipo está conectado.

SEGURIDAD

Las aspas giran a alta velocidad. Instala protecciones cuando puedan quedar al alcance de personas o animales. Mantén manos, cabello, ropa y objetos lejos de la entrada y salida. No permita que los niños operen o manipulen el equipo.

No utilices cerca de líquidos inflamables, gases explosivos, polvo combustible ni ambientes corrosivos. No bloquees el flujo durante el funcionamiento. Ante cable dañado, vibración severa o sobrecalentamiento, suspende el uso y solicita una revisión técnica.

PREGUNTAS FRECUENTES

¿Qué tamaño corresponde a esta publicación?
Es el modelo ${p.model} de ${p.inches} pulgadas, con diámetro aproximado de ${p.diameter_mm} mm.

¿Cuál es la potencia?
La potencia nominal indicada es de ${p.power_w} W.

¿Qué caudal entrega?
El fabricante declara cerca de ${p.airflow} m³/h en condiciones de referencia. El montaje y los ductos pueden disminuir el valor real.

¿Funciona a 220 V?
Sí, está especificado para 220 V y 50 Hz.

¿Incluye enchufe?
La variante se prepara con cable y enchufe europeo de dos pines. Verifica si tu tomacorriente requiere adaptación física.

¿Se puede instalar en pared o techo?
Puede integrarse en pared, techo o ducto cuando la fijación, orientación y conexión sean apropiadas para el proyecto.

¿Sirve para baño o cocina?
Puede apoyar la ventilación, pero la instalación debe considerar humedad, grasa, temperatura, normativa y caudal requerido. No reemplaza automáticamente una campana extractora.

¿Incluye ducto o rejilla?
La compra corresponde al extractor mostrado. Ductos, rejillas y accesorios externos solo se incluyen si aparecen expresamente como contenido.

¿Las medidas del paquete son las del extractor?
No. El bulto logístico y las dimensiones técnicas son datos distintos.

¿Tiene garantía?
Sí. Incluye garantía del vendedor por 30 días. Para consultas posteriores, utiliza la mensajería de tu compra.

ANTES DE COMPRAR

Confirma el diámetro de ${p.inches} pulgadas, la alimentación de 220 V, la potencia de ${p.power_w} W y el espacio de instalación. Calcula el caudal necesario y revisa el recorrido del ducto. Si reemplazas una unidad, compara todas las medidas y no solo la apariencia.

En Furaxis queremos que cuentes con datos claros para una instalación segura. Este extractor axial ofrece un formato cilíndrico compacto y especificaciones definidas para proyectos de renovación de aire correctamente dimensionados.

Usted también puede buscar: extractor de aire industrial, extractor axial, ventilador extractor ${p.inches} pulgadas, extractor 220 V, extractor para pared, extractor para techo, extractor para ducto, ventilación de cocina, ventilación de baño, extractor negro, extractor ${p.model}, ventilador industrial cilíndrico.`;
}

for (const p of products) {
  const spec = {
    source_index: p.source_index,
    sku: p.sku,
    category_id: 'MLC174295',
    title: p.title,
    brand: 'Genérica',
    model: p.model,
    upc: p.upc,
    image_path: p.image_path,
    price: p.price,
    price_source: '开发跟踪表平台售价 CL × 1.8，向上取 990 结尾',
    quantity: 10,
    package: { ...p.package, weight_g: p.weight_g },
    extra_attributes: [
      { id: 'VOLTAGE', value_name: '220V' },
      { id: 'RANGE_HOOD_MOUNTING', value_name: 'De pared' },
      { id: 'ENGINE_POWER', value_name: `${p.power_w} W` },
      { id: 'TUBE_DIAMETER', value_name: `${p.diameter_mm} mm` },
      { id: 'IS_SUITABLE_FOR_SHIPMENT', value_id: '242085' }
    ],
    description: description(p)
  };
  await fs.writeFile(`.data/publish-spec-${p.source_index}.json`, `${JSON.stringify(spec, null, 2)}\n`);
  console.log(JSON.stringify({ index: p.source_index, title_length: p.title.length, description_length: spec.description.length }));
}
