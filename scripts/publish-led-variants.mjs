import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { apiRequest, getAccessToken } from '../src/meli.js';

const variants = [
  { sku: 'NW260795BLAMS1', upc: '510089892613', light_id: '6292358', light: 'Blanco cálido', image: '.data/batch-51-129-images/NW260795BLAMS1-1.png' },
  { sku: 'NW260796BLAMS1', upc: '510089892620', light_id: '5247680', light: 'Blanco frío', image: '.data/batch-51-129-images/NW260796BLAMS1-1.png' }
];

const description = `¡Bienvenido a Furaxis!

Una línea continua de luz puede transformar repisas, cielos, muebles, pasillos y detalles arquitectónicos sin ocupar espacio visual. Esta tira LED COB de 10 metros integra 288 puntos luminosos por metro dentro de una cubierta de silicona, creando una iluminación más uniforme que una cinta con puntos separados. La publicación reúne dos variantes para elegir: blanco cálido o blanco frío.

El kit funciona a 220 V e incluye un cable de alimentación y un paquete de accesorios para apoyar la instalación. Su formato flexible permite seguir recorridos rectos y curvas amplias. Está pensado para iluminación decorativa y ambiental en espacios compatibles, con una instalación planificada y protegida.

VARIANTES DISPONIBLES

- Blanco cálido: aporta una apariencia acogedora, adecuada para dormitorios, salas, cabeceras y espacios de descanso.
- Blanco frío: ofrece una sensación de mayor claridad visual, útil para vitrinas, zonas de trabajo y ambientes modernos.

Selecciona el color de luz antes de comprar. Ambos modelos comparten longitud, cantidad de LED, alimentación y presentación. El tono percibido puede variar ligeramente según paredes, cámara, pantalla y luz ambiental.

CARACTERÍSTICAS PRINCIPALES

- Tira de iluminación LED tipo COB.
- Longitud total: 10 metros.
- Densidad: 288 LED por metro.
- Alimentación: 220 V.
- Cubierta de silicona para una línea de luz más homogénea.
- Variantes blanco cálido y blanco frío.
- Incluye cable de alimentación.
- Incluye accesorios de fijación y terminación correspondientes al kit.
- Formato flexible para recorridos decorativos.
- Uso recomendado en interiores o sectores protegidos.
- Producto nuevo.

ILUMINACIÓN COB MÁS CONTINUA

La tecnología COB distribuye numerosos puntos luminosos muy próximos, por lo que la luz se aprecia como una línea más uniforme. Esto resulta atractivo cuando la cinta queda visible o cuando se busca reducir la apariencia de puntos individuales sobre una superficie. La percepción final depende de la distancia, el difusor, la reflexión y el ambiente.

Para iluminación indirecta, coloca la tira detrás de un borde o dentro de un perfil compatible. La luz reflejada en una pared o cielo genera un efecto suave. Para luz directa, evita instalar a la altura de los ojos sin difusor, especialmente en recorridos largos.

10 METROS PARA PROYECTOS AMPLIOS

La longitud permite cubrir muebles, perímetros y recorridos extensos sin unir muchos tramos. Mide siempre antes de instalar y agrega margen para esquinas, conexión y terminación. Presenta la tira sin retirar adhesivos ni fijaciones definitivas para confirmar que el recorrido funciona.

No dobles en ángulos cerrados ni retuerzas el cuerpo. Las curvas deben ser amplias para no dañar las pistas internas. Si necesitas cortar, hazlo únicamente en las marcas autorizadas por el fabricante y con la alimentación desconectada. Un corte fuera de la zona indicada puede inutilizar parte del producto y afectar el sellado.

BLANCO CÁLIDO PARA AMBIENTES ACOGEDORES

El blanco cálido suele combinar con madera, textiles y tonos tierra. Puede instalarse en cabeceras, repisas, living o comedor para crear una atmósfera confortable. También funciona como luz indirecta en molduras o muebles. No sustituye necesariamente una luminaria principal si el espacio requiere alta iluminación.

BLANCO FRÍO PARA MAYOR SENSACIÓN DE CLARIDAD

El blanco frío aporta un aspecto nítido y moderno. Puede utilizarse bajo repisas, alrededor de vitrinas, en estanterías o como apoyo visual en áreas de trabajo. La temperatura de color no cambia la potencia eléctrica; modifica el tono percibido. Elige según el ambiente y los colores del espacio.

CONTENIDO DEL KIT

- Un rollo de tira LED COB de 10 metros en el color elegido.
- Cable de alimentación para la variante.
- Accesorios de sujeción y terminación visibles en la presentación.

Los perfiles de aluminio, difusores, canaletas, extensiones y herramientas no están incluidos salvo indicación expresa. Revisa todos los accesorios antes de desechar el empaque.

PLANIFICACIÓN DE LA INSTALACIÓN

1. Mide el recorrido y define dónde quedará la conexión eléctrica.
2. Comprueba que el tono seleccionado sea el correcto.
3. Presenta la tira completa sin energizar ni doblar bruscamente.
4. Limpia y seca la superficie.
5. Instala fijaciones a intervalos suficientes para sostener el peso.
6. Evita calor, humedad constante, bordes cortantes y partes móviles.
7. Conecta el cable únicamente cuando todo esté asegurado.
8. Realiza una prueba breve y revisa temperatura y estabilidad.

La cinta puede necesitar clips mecánicos aunque tenga una superficie autoadhesiva. La adherencia depende de polvo, textura, pintura, temperatura y curvatura. En recorridos largos, los clips ayudan a impedir que el peso despegue la tira.

ALIMENTACIÓN A 220 V

Este producto funciona con tensión de red de 220 V. Debe manipularse con la misma precaución que cualquier elemento conectado directamente a la electricidad. Instala y corta siempre con el enchufe desconectado. No toques contactos, pines ni extremos sin protección.

El cable utiliza enchufe europeo de dos pines. Verifica compatibilidad física con tu tomacorriente; algunos puntos en Chile pueden requerir un adaptador apropiado. Un adaptador no cambia el voltaje. No utilices conectores flojos, cables dañados ni extensiones sobrecargadas.

CORTE, UNIONES Y TERMINACIÓN

No todos los modelos permiten cortar en cualquier punto. Localiza las marcas impresas o la separación definida por el fabricante. Después de cortar, instala una tapa final y conserva el aislamiento. Las uniones requieren conectores compatibles con el ancho, voltaje y tipo de tira.

Si necesitas crear varios tramos, considera que cada sección puede requerir alimentación y sellado adecuados. No improvises con cables desnudos. Para instalaciones permanentes o lugares de difícil acceso, solicita ayuda a un electricista.

PROTECCIÓN Y UBICACIÓN

La cubierta de silicona aporta protección física, pero el grado final depende de cortes, conexiones y terminaciones. Utiliza preferentemente en interiores secos o áreas protegidas. No sumerjas, no instales en piscinas y no expongas la conexión a lluvia.

Mantén separación de cocinas, estufas, calefactores y superficies que acumulen calor. No cubras la tira con materiales aislantes. Un perfil de aluminio compatible puede ayudar a ordenar el montaje y disipar calor, además de mejorar el acabado visual.

ESPECIFICACIONES DE LA PUBLICACIÓN

- Tecnología: LED COB.
- Longitud: 10 m.
- Cantidad de LED: 288 por metro.
- Voltaje: 220 V.
- Colores de luz: blanco cálido o blanco frío.
- Material exterior: silicona.
- Alimentación: incluida.
- Uso: iluminación decorativa y ambiental.
- Instalación: con clips o sistema apropiado.
- Condición: nuevo.
- Garantía del vendedor: 30 días.

MEDIDAS DEL PAQUETE

El bulto preparado para despacho mide aproximadamente 50 x 10 x 7 cm y pesa cerca de 600 g. Estas medidas corresponden al rollo y accesorios embalados. La longitud útil nominal de la tira es de 10 metros.

Abre sin cortar profundamente la bolsa. Desenrolla sobre una superficie limpia y prueba antes de fijar. No enciendas durante mucho tiempo mientras permanezca apretadamente enrollada, porque el calor no puede disiparse de la misma manera.

IDEAS DE USO

Puede instalarse bajo muebles de cocina protegidos, detrás de una cabecera, alrededor de repisas, en molduras de cielo, vitrinas, pasillos o exhibidores. El blanco cálido favorece ambientes de descanso; el blanco frío resalta líneas y objetos. Un difusor puede suavizar aún más la salida de luz.

Para un acabado ordenado, oculta el cable y deja accesible el punto de conexión. Evita pasar por bisagras, cajones o zonas que puedan pellizcar la tira. Planifica esquinas con curvas amplias o conectores adecuados.

CUIDADO Y LIMPIEZA

Desconecta y deja enfriar antes de limpiar. Retira polvo con un paño seco o apenas húmedo, sin tirar de la tira. No uses solventes, cloro ni abrasivos sobre silicona y conexiones. Comprueba periódicamente clips, cable, enchufe y tapas finales.

Si un tramo parpadea, se calienta de forma anormal o emite olor, desconecta de inmediato. No continúes usando una tira dañada. Las reparaciones de elementos a tensión de red deben ser realizadas por una persona competente.

PREGUNTAS FRECUENTES

¿Cuántos metros incluye?
La publicación corresponde a una tira de 10 metros.

¿Cuántos LED tiene por metro?
La densidad indicada es de 288 LED por metro.

¿Qué colores se pueden elegir?
Hay dos variantes: blanco cálido y blanco frío. Selecciona la opción antes de comprar.

¿Funciona a 220 V?
Sí. Está diseñada para alimentación de 220 V.

¿Incluye cable de alimentación?
Sí. El kit incorpora el cable correspondiente.

¿Incluye accesorios?
Sí. Incluye un paquete con piezas de fijación y terminación según la presentación.

¿Se puede cortar?
Solo en las marcas definidas por el fabricante y con la alimentación desconectada. Después debe volver a aislarse correctamente.

¿Se puede usar en exterior?
Recomendamos interior o zona protegida. Cortes y conexiones pueden reducir la protección del conjunto.

¿Se puede encender mientras está enrollada?
Realiza solo una prueba breve. Para uso continuo debe estar desplegada y con ventilación adecuada.

¿Tiene regulador de intensidad?
No anunciamos un regulador salvo que esté expresamente incluido en el kit recibido. La publicación confirma cable de alimentación y accesorios.

¿Las dos variantes vienen juntas?
No. La compra incluye un rollo en el color seleccionado. Cada variante tiene su propio código y stock.

¿Tiene garantía?
Sí. Incluye garantía del vendedor por 30 días. Utiliza la mensajería de tu pedido si necesitas ayuda.

ANTES DE COMPRAR

Mide el recorrido, selecciona blanco cálido o blanco frío y confirma que necesitas 10 metros a 220 V. Planifica fijaciones, cortes y conexión antes de instalar. Si el proyecto requiere exposición directa al agua o regulación profesional, utiliza componentes certificados para esa condición.

En Furaxis queremos que elijas con claridad. Esta tira COB ofrece una línea de luz uniforme, alta densidad de LED y dos tonos para adaptar el ambiente a tu estilo.

Usted también puede buscar: tira LED COB, cinta LED 220 V, tira de luces 10 metros, cinta LED blanco cálido, cinta LED blanco frío, luces LED para interiores, tira silicona, tira 288 LED por metro, iluminación para muebles, luz indirecta, luces para cielo y repisas.`;

async function uploadImage(variant) {
  const out = path.resolve('.data', 'prepared-images', `${variant.sku}.jpg`);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await sharp(path.resolve(variant.image)).rotate().resize(1200, 1200, { fit: 'contain', background: '#ffffff' }).jpeg({ quality: 90 }).toFile(out);
  const form = new FormData();
  form.append('file', new Blob([await fs.readFile(out)], { type: 'image/jpeg' }), `${variant.sku}.jpg`);
  const response = await fetch('https://api.mercadolibre.com/pictures/items/upload', {
    method: 'POST', headers: { authorization: `Bearer ${await getAccessToken()}` }, body: form
  });
  const body = await response.json();
  if (!response.ok || !body.id) throw new Error(`Picture upload failed: ${JSON.stringify(body)}`);
  return body.id;
}

for (const variant of variants) {
  const found = await apiRequest(`/users/3166000149/items/search?sku=${variant.sku}`);
  if (found.results?.length) throw new Error(`${variant.sku} already exists: ${found.results.join(', ')}`);
}

const pictureIds = [];
for (const variant of variants) pictureIds.push(await uploadImage(variant));

for (let index = 0; index < variants.length; index += 1) {
  const variant = variants[index];
  const created = await apiRequest('/items', { method: 'POST', body: {
    family_name: 'Tira Led Cob Silicona 10m 288 Led/m 220v Con Accesorios',
    category_id: 'MLC163822',
    price: 35990,
    currency_id: 'CLP',
    available_quantity: 10,
    buying_mode: 'buy_it_now',
    listing_type_id: 'gold_special',
    condition: 'new',
    pictures: [{ id: pictureIds[index] }],
    attributes: [
      { id: 'BRAND', value_name: 'Genérica' },
      { id: 'MODEL', value_name: 'COB 10 m 288 LED/m' },
      { id: 'LIGHT_COLOR', value_id: variant.light_id, value_name: variant.light },
      { id: 'VOLTAGE', value_name: '220V' },
      { id: 'LENGTH', value_name: '10 m' },
      { id: 'LEDS_PER_METER_NUMBER', value_name: '288' },
      { id: 'INCLUDES_POWER_SUPPLY', value_id: '242085' },
      { id: 'GTIN', value_name: variant.upc },
      { id: 'SELLER_SKU', value_name: variant.sku },
      { id: 'SELLER_PACKAGE_LENGTH', value_name: '50 cm' },
      { id: 'SELLER_PACKAGE_WIDTH', value_name: '10 cm' },
      { id: 'SELLER_PACKAGE_HEIGHT', value_name: '7 cm' },
      { id: 'SELLER_PACKAGE_WEIGHT', value_name: '600 g' }
    ],
    sale_terms: [
      { id: 'WARRANTY_TYPE', value_id: '2230280' },
      { id: 'WARRANTY_TIME', value_name: '30 días' }
    ],
    shipping: { mode: 'me2', local_pick_up: false }
  }});

  const id = created.id;
  await apiRequest(`/items/${id}`, { method: 'PUT', body: { status: 'paused' } });
  await apiRequest(`/items/${id}/description`, { method: 'POST', body: { plain_text: description } });
  const flexEndpoint = `/flex/sites/MLC/items/${id}/v2`;
  let flex = await apiRequest(flexEndpoint);
  if (!flex.has_flex) await apiRequest(flexEndpoint, { method: 'POST' });
  for (let i = 0; i < 6 && !flex.has_flex; i += 1) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    flex = await apiRequest(flexEndpoint);
  }
  const [item, finalDescription] = await Promise.all([
    apiRequest(`/items/${id}`), apiRequest(`/items/${id}/description`)
  ]);
  if (item.status !== 'paused' || item.shipping?.mode !== 'me2' || !flex.has_flex || finalDescription.plain_text?.length < 4000) {
    throw new Error(`Final verification failed for ${variant.sku}`);
  }

  const record = {
    sku: variant.sku,
    source_index: variant.sku === 'NW260795BLAMS1' ? 66 : 67,
    created_at: new Date().toISOString(),
    price_source: '开发跟踪表平台售价 CL × 1.8，向上取 990 结尾',
    stage: 'complete',
    id,
    title: item.title,
    permalink: item.permalink,
    price: 35990,
    status: item.status,
    shipping_mode: item.shipping.mode,
    logistic_type: item.shipping.logistic_type,
    flex: true,
    description_length: finalDescription.plain_text.length,
    category_id: item.category_id,
    result: 'success',
    related_variant_sku: variants.find(v => v.sku !== variant.sku).sku,
    variant_group: variant.light,
    grouping_note: '平台强制 family_name 结构不接受 seller variations，因此按灯光颜色分别创建。'
  };
  await fs.writeFile(path.resolve('.data', `${variant.sku}-published.json`), `${JSON.stringify(record, null, 2)}\n`);
  console.log(JSON.stringify(record, null, 2));
}
