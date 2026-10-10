import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { apiRequest, getAccessToken } from '../src/meli.js';

const sellerId = '3166000149';
const groupId = 'NW260579NEG40-44';
const recordPath = path.resolve('.data', `${groupId}-published.json`);
const imageSources = [
  'C:/Users/root/AppData/Local/Temp/codex-clipboard-53186c69-72cd-43a3-be57-0888739c707e.png',
  'C:/Users/root/AppData/Local/Temp/codex-clipboard-173eabd7-de51-4662-84c1-65efd02ab05a.png',
  'C:/Users/root/AppData/Local/Temp/codex-clipboard-6017ea9e-e8ff-4e47-a531-9e4ea42e91da.png'
];
const variants = [
  { sku: 'NW260579NEG40', upc: '474070131009', size: '40', sizeId: '3189142', row: '5295335:1', length: 32, width: 17, height: 12, weight: 600 },
  { sku: 'NW260579NEG41', upc: '474070131016', size: '41', sizeId: '3259513', row: '5295335:2', length: 33, width: 16, height: 12, weight: 650 },
  { sku: 'NW260579NEG42', upc: '474070131023', size: '42', sizeId: '3259453', row: '5295335:3', length: 32, width: 18, height: 12, weight: 700 },
  { sku: 'NW260579NEG43', upc: '474070131030', size: '43', sizeId: '3259524', row: '5295335:4', length: 32, width: 16, height: 13, weight: 700 },
  { sku: 'NW260579NEG44', upc: '474070131047', size: '44', sizeId: '3259454', row: '5295335:5', length: 36, width: 15, height: 13, weight: 600 }
];

const title = 'Zapatos De Seguridad Industrial Trabajo Hombre Negro Verci';
const description = `¡Bienvenido a Furaxis!

Cuando una jornada exige muchas horas de pie, caminar entre distintas superficies o moverse constantemente, el calzado deja de ser un detalle y pasa a formar parte de la comodidad diaria. Este modelo Verci DZ1346 combina una apariencia deportiva, estructura de trabajo, paneles de malla y un práctico sistema de ajuste con perilla giratoria. Su diseño negro es fácil de combinar con uniforme, pantalón de trabajo o vestuario casual, mientras que la forma baja favorece una pisada ágil y una sensación menos voluminosa.

La publicación reúne las tallas 40, 41, 42, 43 y 44 en un solo lugar. Antes de comprar, selecciona la talla correcta en el menú de variantes. Cada opción corresponde al mismo modelo, color y diseño; lo que cambia es la talla elegida.

CARACTERÍSTICAS PRINCIPALES

- Calzado de seguridad para hombre.
- Marca visible: Verci.
- Modelo: DZ1346.
- Color: negro.
- Diseño tipo zapatilla de trabajo de perfil bajo.
- Sistema de ajuste rápido mediante perilla giratoria y cable.
- Paneles de malla que favorecen la ventilación del pie.
- Refuerzos exteriores distribuidos en puntera, laterales y talón.
- Cuello acolchado para un contacto más cómodo alrededor del tobillo.
- Lengüeta acolchada y tirador posterior para facilitar la colocación.
- Suela con dibujo marcado para mejorar el contacto con la superficie.
- Tallas disponibles: 40, 41, 42, 43 y 44.
- Presentación: un par de zapatos en la talla seleccionada.
- Producto nuevo.

AJUSTE RÁPIDO CON PERILLA GIRATORIA

El sistema de cierre permite tensar el calzado de manera rápida y uniforme. Para ajustar, coloca el pie, acomoda la lengüeta y gira la perilla hasta lograr una sujeción firme pero confortable. El cable distribuye la tensión sobre el empeine y evita tener cordones largos sueltos durante el uso. Para liberar el ajuste, acciona la perilla según su mecanismo y afloja el cable antes de retirar el pie.

Este tipo de cierre es especialmente práctico cuando necesitas ponerte o quitarte el calzado varias veces durante el día. También ayuda a mantener una apariencia ordenada y reduce el tiempo dedicado a hacer nudos. Ajusta progresivamente: no es necesario aplicar una tensión excesiva para sentir el pie estable.

DISEÑO TRANSPIRABLE PARA EL USO DIARIO

La parte superior incorpora zonas de malla visibles en la puntera, los costados y el área cercana al tobillo. Estas aberturas favorecen la circulación de aire durante caminatas y jornadas prolongadas. Los paneles estructurales rodean la malla para aportar forma y soporte sin perder la estética deportiva del modelo.

El interior acolchado busca reducir el roce habitual alrededor del talón y el tobillo. La lengüeta también cuenta con volumen suficiente para repartir mejor la presión del sistema de ajuste. Utiliza calcetines de trabajo limpios y de grosor similar a los que usarás normalmente para obtener una elección de talla más precisa.

APARIENCIA DEPORTIVA Y PROFESIONAL

El color negro completo ofrece una presentación discreta que combina con distintos uniformes. Las líneas laterales y la suela de aspecto robusto conservan una estética moderna, por lo que el calzado puede acompañarte en bodegas, talleres, labores de mantenimiento, logística, comercio, reparto y otras actividades que requieren desplazamiento frecuente.

Su perfil bajo deja el tobillo libre y facilita movimientos naturales al caminar, subir escalones o agacharse. El tirador posterior ayuda a colocar el calzado sin deformar el borde. El diseño puede usarse como parte de un conjunto de trabajo o como zapatilla resistente para actividades cotidianas.

SUELA CON DIBUJO DE AGARRE

La base presenta canales y relieves visibles que aumentan los puntos de contacto con el suelo. Este dibujo ayuda a ofrecer una pisada estable sobre superficies secas de uso habitual. Como con cualquier calzado, la adherencia depende del estado del piso, polvo, grasa, humedad y desgaste de la suela; mantenerla limpia conserva mejor su relieve.

La zona delantera se eleva ligeramente y tiene un refuerzo exterior que protege el material frente al roce cotidiano. El talón también cuenta con una estructura envolvente que aporta estabilidad visual y ayuda a mantener la forma del zapato.

TALLAS DISPONIBLES

- Talla 40.
- Talla 41.
- Talla 42.
- Talla 43.
- Talla 44.

Elige la talla antes de agregar al carrito. Si normalmente alternas entre dos tallas, mide ambos pies al final del día y utiliza como referencia el pie de mayor longitud. Apoya el talón contra una pared, marca hasta el dedo más largo y compara la medida con el calzado que te resulte cómodo. Considera el grosor del calcetín y el espacio que prefieres en la puntera.

No selecciones solo por la talla impresa en otro modelo, porque la horma puede variar entre marcas. Una sujeción adecuada debe mantener el talón estable sin comprimir los dedos. Al recibir el producto, pruébalo en una superficie limpia antes de utilizarlo en exterior.

ESPECIFICACIONES

- Marca: Verci.
- Modelo: DZ1346.
- Género: hombre.
- Tipo: zapatilla de seguridad y trabajo.
- Color principal: negro.
- Material exterior visible: combinación de malla y material sintético.
- Sistema de cierre: perilla giratoria con cable.
- Interior: acolchado.
- Diseño: bajo, deportivo e industrial.
- Tallas: 40 a 44, según disponibilidad.
- Cantidad: un par.
- Condición: nuevo.
- Garantía del vendedor: 30 días.

MEDIDAS DEL PAQUETE SEGÚN TALLA

Las siguientes medidas corresponden al bulto preparado para despacho y pueden variar ligeramente por la forma de acomodar el calzado dentro del embalaje:

- Talla 40: aproximadamente 31,5 x 16,5 x 11,5 cm; peso aproximado 600 g.
- Talla 41: aproximadamente 33 x 16 x 12 cm; peso aproximado 650 g.
- Talla 42: aproximadamente 31,5 x 17,5 x 11,5 cm; peso aproximado 700 g.
- Talla 43: aproximadamente 32 x 15,5 x 12,5 cm; peso aproximado 700 g.
- Talla 44: aproximadamente 36 x 14,5 x 12,5 cm; peso aproximado 600 g.

Estas medidas son logísticas y no representan el largo interior del zapato. Para elegir la talla, utiliza tu medida de pie y tu experiencia con calzado de horma similar.

IDEAL PARA DISTINTAS RUTINAS

Su combinación de ajuste rápido, malla y apariencia deportiva resulta práctica para personas que se desplazan entre bodega, oficina, taller o zona de carga. También puede acompañar tareas de armado, inventario, mantenimiento general, supervisión, reparto y actividades domésticas que requieren un calzado de estructura firme.

El modelo está pensado para quienes prefieren una silueta similar a una zapatilla y no desean el volumen de una bota alta. La perilla permite adaptar la tensión durante el día: puedes aflojar ligeramente en momentos de descanso y volver a ajustar antes de caminar.

CÓMO USAR EL SISTEMA DE AJUSTE

1. Afloja el cable antes de introducir el pie.
2. Acomoda el talón al fondo del calzado.
3. Centra la lengüeta para evitar pliegues.
4. Activa la perilla y gira poco a poco.
5. Comprueba que el ajuste sea uniforme y que puedas mover los dedos.
6. Para retirar el zapato, libera la perilla y separa suavemente el cable.

No fuerces el mecanismo ni tires del cable con herramientas. Si entra polvo, limpia con un cepillo suave y seco. Un uso cuidadoso ayuda a conservar el cierre y evita tensiones innecesarias en los pasadores.

CUIDADO Y LIMPIEZA

Retira el polvo después de cada uso con un cepillo suave. Para suciedad localizada, utiliza un paño apenas húmedo con jabón neutro. No sumerjas el calzado ni lo laves en máquina, porque la humedad y los movimientos intensos pueden afectar adhesivos, acolchado y mecanismo de cierre.

Deja secar a la sombra en un lugar ventilado. No acerques a estufas, secadores ni fuentes de calor directo. Retira la plantilla si necesitas acelerar la ventilación interior. Antes de volver a usar, confirma que el interior esté completamente seco.

Mantén la suela libre de piedras y residuos. Revisa periódicamente el cable, la perilla y las zonas de mayor flexión. Guarda el par limpio, sin objetos pesados encima, para conservar su forma.

QUÉ RECIBES

Recibirás un par de zapatos Verci DZ1346 en color negro y en la talla seleccionada. Las imágenes muestran el diseño, la distribución de los paneles, el cierre giratorio y la apariencia general del producto. La percepción del color puede variar levemente por iluminación, cámara o configuración de pantalla.

PREGUNTAS FRECUENTES

¿La publicación incluye un par?
Sí. La compra corresponde a un par en la talla seleccionada.

¿Qué tallas están disponibles?
Puedes elegir entre 40, 41, 42, 43 y 44 mientras exista stock.

¿Todos los tamaños corresponden al mismo modelo?
Sí. Todas las variantes son Verci DZ1346, color negro y con el mismo sistema de ajuste.

¿Tiene cordones tradicionales?
No. Utiliza una perilla giratoria que regula un cable de ajuste sobre el empeine.

¿Cómo se afloja?
Libera la perilla y separa suavemente el cable. No tires bruscamente ni uses herramientas.

¿El material permite ventilación?
Sí. La parte superior presenta paneles de malla visibles que favorecen la circulación de aire.

¿Es una bota alta?
No. Es un diseño bajo tipo zapatilla, pensado para conservar libertad de movimiento en el tobillo.

¿El color es completamente negro?
El color principal es negro, con pequeños detalles de marca y líneas en tonos claros visibles en las fotografías.

¿Cómo elijo la talla?
Mide ambos pies con los calcetines que usarás habitualmente y selecciona según el pie más largo. Considera que la horma puede variar frente a otras marcas.

¿Se puede lavar en lavadora?
No lo recomendamos. Limpia con cepillo suave y paño húmedo, y seca siempre a la sombra.

¿Sirve para jornadas largas?
El diseño incorpora malla, acolchado y ajuste graduable, características pensadas para acompañar desplazamientos y uso prolongado con una talla bien elegida.

¿Tiene garantía?
Sí. La publicación incluye garantía del vendedor por 30 días. Si necesitas ayuda, utiliza la mensajería asociada a tu compra.

ANTES DE COMPRAR

Selecciona con atención la talla, revisa las imágenes y confirma que buscas el modelo negro Verci DZ1346 con cierre giratorio. Una buena elección de talla mejora la comodidad, evita presión innecesaria y permite aprovechar el diseño acolchado. Mantén el calzado limpio y seco para conservar su presentación y funcionamiento.

En Furaxis buscamos que recibas información clara para comprar con confianza. Este modelo combina una estética deportiva, ajuste rápido y detalles pensados para el movimiento diario. Elige tu talla y equipa tu jornada con un calzado práctico, moderno y fácil de ajustar.

Usted también puede buscar: zapatos de seguridad hombre, zapatillas de seguridad, calzado industrial, zapatos para trabajo, calzado laboral negro, zapatilla industrial hombre, zapato de seguridad liviano, calzado con perilla giratoria, zapatos para bodega, calzado para taller, zapatos de trabajo negro, zapatilla laboral transpirable, calzado Verci, modelo DZ1346, zapatos industriales tallas 40 41 42 43 44.`;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function loadRecord() {
  try {
    return JSON.parse(await fs.readFile(recordPath, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return { group_id: groupId, created_at: new Date().toISOString(), stage: 'preparing' };
  }
}

async function saveRecord(record) {
  await fs.mkdir(path.dirname(recordPath), { recursive: true });
  await fs.writeFile(recordPath, `${JSON.stringify(record, null, 2)}\n`);
}

async function findExisting() {
  const matches = {};
  for (const variant of variants) {
    const result = await apiRequest(`/users/${sellerId}/items/search?seller_sku=${encodeURIComponent(variant.sku)}`);
    matches[variant.sku] = result.results || [];
  }
  return matches;
}

async function uploadImages(record) {
  if (record.picture_ids?.length === imageSources.length) return record.picture_ids;
  const preparedDir = path.resolve('.data', 'prepared-images', groupId);
  await fs.mkdir(preparedDir, { recursive: true });
  const pictureIds = [];
  for (let index = 0; index < imageSources.length; index += 1) {
    const prepared = path.join(preparedDir, `${index + 1}.jpg`);
    await sharp(imageSources[index]).rotate().resize(1200, 1200, {
      fit: 'contain', background: '#ffffff'
    }).jpeg({ quality: 92 }).toFile(prepared);
    const form = new FormData();
    form.append('file', new Blob([await fs.readFile(prepared)], { type: 'image/jpeg' }), `${groupId}-${index + 1}.jpg`);
    const response = await fetch('https://api.mercadolibre.com/pictures/items/upload', {
      method: 'POST', headers: { authorization: `Bearer ${await getAccessToken()}` }, body: form
    });
    const body = await response.json();
    if (!response.ok || !body.id) throw new Error(`Picture upload failed: ${JSON.stringify(body)}`);
    pictureIds.push(body.id);
  }
  record.picture_ids = pictureIds;
  record.stage = 'pictures_uploaded';
  await saveRecord(record);
  return pictureIds;
}

function buildPayload(pictureIds, variant) {
  return {
    family_name: title,
    category_id: 'MLC179382',
    price: 55990,
    currency_id: 'CLP',
    available_quantity: 10,
    buying_mode: 'buy_it_now',
    listing_type_id: 'gold_special',
    condition: 'new',
    pictures: pictureIds.map(id => ({ id })),
    attributes: [
      { id: 'BRAND', value_name: 'Verci' },
      { id: 'MODEL', value_name: 'DZ1346' },
      { id: 'GENDER', value_id: '339666', value_name: 'Hombre' },
      { id: 'COLOR', value_id: '52049', value_name: 'Negro' },
      { id: 'SIZE', value_id: variant.sizeId, value_name: variant.size },
      { id: 'SIZE_GRID_ID', value_name: '5295335' },
      { id: 'SIZE_GRID_ROW_ID', value_name: variant.row },
      { id: 'SAFETY_FOOTWEAR_TYPE', value_id: '1148894', value_name: 'Zapatilla' },
      { id: 'FOOTWEAR_MATERIAL', value_name: 'Malla y cuero sintético' },
      { id: 'CLOSURE_TYPE', value_name: 'Perilla giratoria con cable' },
      { id: 'GTIN', value_name: variant.upc },
      { id: 'SELLER_SKU', value_name: variant.sku },
      { id: 'SELLER_PACKAGE_LENGTH', value_name: `${variant.length} cm` },
      { id: 'SELLER_PACKAGE_WIDTH', value_name: `${variant.width} cm` },
      { id: 'SELLER_PACKAGE_HEIGHT', value_name: `${variant.height} cm` },
      { id: 'SELLER_PACKAGE_WEIGHT', value_name: `${variant.weight} g` }
    ],
    sale_terms: [
      { id: 'WARRANTY_TYPE', value_id: '2230280' },
      { id: 'WARRANTY_TIME', value_name: '30 días' }
    ],
    shipping: { mode: 'me2', local_pick_up: false }
  };
}

async function validatePayloads(pictureIds) {
  for (const variant of variants) {
    try {
      await apiRequest('/items/validate', { method: 'POST', body: buildPayload(pictureIds, variant) });
    } catch (error) {
      const warningOnly = error.message.includes('"type":"warning"') && !error.message.includes('"type":"error"');
      if (!warningOnly) throw error;
    }
  }
}

async function enableFlex(itemId) {
  const endpoint = `/flex/sites/MLC/items/${itemId}/v2`;
  let flex = await apiRequest(endpoint);
  if (!flex.has_flex) await apiRequest(endpoint, { method: 'POST' });
  for (let attempt = 0; attempt < 8; attempt += 1) {
    await sleep(1500);
    flex = await apiRequest(endpoint);
    if (flex.has_flex) return flex;
  }
  return flex;
}

async function updateBatchPlan(itemsBySku) {
  const planPath = path.resolve('.data', 'batch-plan.json');
  const plan = JSON.parse(await fs.readFile(planPath, 'utf8'));
  for (const entry of plan) {
    if (!variants.some(variant => variant.sku === entry.sku)) continue;
    const item = itemsBySku[entry.sku];
    entry.title = item.title;
    entry.status = 'published';
    delete entry.error;
    entry.record = {
      id: item.id,
      title: item.title,
      permalink: item.permalink,
      price: item.price,
      status: item.status,
      flex: true,
      category_id: item.category_id,
      grouping_note: '同一 family_name 产品家族，按 talla 40-44 归入 5 个 SKU 子商品。'
    };
  }
  await fs.writeFile(planPath, `${JSON.stringify(plan, null, 2)}\n`);
}

let record = await loadRecord();
try {
  if (description.length < 4000) throw new Error(`Description too short: ${description.length}`);
  const existing = await findExisting();
  for (const [sku, ids] of Object.entries(existing)) {
    if (ids.length > 1) throw new Error(`Duplicate seller SKU ${sku}: ${ids.join(', ')}`);
  }

  const pictureIds = await uploadImages(record);
  await validatePayloads(pictureIds);
  record.validation_mode = 'family_name_product_family';
  record.stage = 'all_payloads_validated';
  record.items ||= {};
  await saveRecord(record);

  for (const variant of variants) {
    let itemId = existing[variant.sku][0] || record.items[variant.sku]?.id;
    if (!itemId) {
      const created = await apiRequest('/items', { method: 'POST', body: buildPayload(pictureIds, variant) });
      itemId = created.id;
      record.items[variant.sku] = { id: itemId, stage: 'created' };
      await saveRecord(record);
    }
  }

  const itemsBySku = {};
  for (const variant of variants) {
    const itemId = record.items[variant.sku].id;
    await apiRequest(`/items/${itemId}`, { method: 'PUT', body: { status: 'paused' } });
    let currentDescription = {};
    try { currentDescription = await apiRequest(`/items/${itemId}/description`); } catch {}
    await apiRequest(`/items/${itemId}/description`, {
      method: currentDescription.plain_text ? 'PUT' : 'POST', body: { plain_text: description }
    });
    let item = await apiRequest(`/items/${itemId}?include_attributes=all`);
    if (item.shipping?.mode !== 'me2') {
      await apiRequest(`/items/${itemId}`, { method: 'PUT', body: { shipping: { mode: 'me2', local_pick_up: false } } });
      await sleep(1200);
      item = await apiRequest(`/items/${itemId}?include_attributes=all`);
    }
    const flex = await enableFlex(itemId);
    const finalDescription = await apiRequest(`/items/${itemId}/description`);
    item = await apiRequest(`/items/${itemId}?include_attributes=all`);
    const actualSku = item.attributes?.find(attribute => attribute.id === 'SELLER_SKU')?.value_name;
    const actualSize = item.attributes?.find(attribute => attribute.id === 'SIZE')?.value_name;
    if (item.status !== 'paused') throw new Error(`${variant.sku}: unexpected item status ${item.status}`);
    if (item.shipping?.mode !== 'me2') throw new Error(`${variant.sku}: Mercado Envíos not enabled`);
    if (!flex.has_flex) throw new Error(`${variant.sku}: Flex not enabled: ${JSON.stringify(flex)}`);
    if ((finalDescription.plain_text?.length || 0) < 4000) throw new Error(`${variant.sku}: description verification failed`);
    if (actualSku !== variant.sku || actualSize !== variant.size) {
      throw new Error(`${variant.sku}: attribute verification failed (SKU=${actualSku}, SIZE=${actualSize})`);
    }
    itemsBySku[variant.sku] = { ...item, description_length: finalDescription.plain_text.length };
    record.items[variant.sku] = { id: itemId, stage: 'complete', flex: true, permalink: item.permalink };
    await saveRecord(record);
  }

  Object.assign(record, {
    stage: 'complete', result: 'success', title,
    price: 55990, status: 'paused', shipping_mode: 'me2', flex: true,
    description_length: Math.min(...Object.values(itemsBySku).map(item => item.description_length)),
    category_id: 'MLC179382',
    skus: variants.map(variant => variant.sku), completed_at: new Date().toISOString()
  });
  delete record.error;
  delete record.failed_at;
  await saveRecord(record);
  for (const variant of variants) {
    const item = itemsBySku[variant.sku];
    await fs.writeFile(path.resolve('.data', `${variant.sku}-published.json`), `${JSON.stringify({
      sku: variant.sku, group_id: groupId, id: item.id,
      title: item.title, permalink: item.permalink, price: item.price, status: item.status,
      flex: true, description_length: item.description_length,
      category_id: item.category_id, grouping_note: '同一 family_name 产品家族，按 talla 40-44 归入 5 个 SKU 子商品。',
      result: 'success', completed_at: record.completed_at
    }, null, 2)}\n`);
  }
  await updateBatchPlan(itemsBySku);
  console.log(JSON.stringify(record, null, 2));
} catch (error) {
  record.result = 'exception';
  record.error = error.message;
  record.failed_at = new Date().toISOString();
  await saveRecord(record);
  console.error(JSON.stringify(record, null, 2));
  process.exitCode = 1;
}
