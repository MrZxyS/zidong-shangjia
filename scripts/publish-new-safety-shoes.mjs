import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { apiRequest, getAccessToken } from '../src/meli.js';

const sellerId = '3166000149';
const outputDir = path.resolve('.data', 'new-safety-shoes');
const recordPath = path.join(outputDir, 'publish-record.json');
const sizeGridId = '5295335';

const sizeValueIds = {
  '40': '3189142',
  '41': '3259513',
  '42': '3259453',
  '43': '3259524',
  '44': '3259454'
};

const groups = [
  {
    id: 'NW260549MAR40-44', model: '795', color: 'Marron', colorId: '52005', mainColorId: '2450291',
    title: 'Zapato De Seguridad Botin Industrial Trabajo Hombre Marron', price: 55990,
    image: path.join(outputDir, 'source-images', '795-brown.png'),
    material: 'Cuero de gamuza', footwearType: 'Botin', sole: 'Goma', closure: 'Cordones',
    features: ['puntera de acero', 'entresuela resistente a perforaciones', 'suela antideslizante', 'acabado de gamuza'],
    sizes: [
      ['NW260549MAR40', '635614512153', '40'], ['NW260549MAR41', '635614512160', '41'],
      ['NW260549MAR42', '635614512177', '42'], ['NW260549MAR43', '635614512184', '43'],
      ['NW260549MAR44', '635614512191', '44']
    ]
  },
  {
    id: 'NW260550NEG40-44', model: '678', color: 'Negro', colorId: '52049', mainColorId: '2450295',
    title: 'Tenis Zapato De Seguridad Hombre Antideslizante Industrial', price: 53990,
    image: path.join(outputDir, 'source-images', '678-black.png'),
    material: 'Malla y material sintetico', footwearType: 'Zapatilla', sole: 'Poliuretano', closure: 'Perilla giratoria',
    features: ['puntera de acero', 'entresuela resistente a perforaciones', 'malla transpirable', 'suela antideslizante'],
    sizes: [
      ['NW260550NEG40', '635614512207', '40'], ['NW260550NEG41', '635614512214', '41'],
      ['NW260550NEG42', '635614512221', '42'], ['NW260550NEG43', '635614512238', '43'],
      ['NW260550NEG44', '635614512245', '44']
    ]
  },
  {
    id: 'NW260551NEG36-44', model: '266', color: 'Negro', colorId: '52049', mainColorId: '2450295',
    title: 'Zapatillas De Seguridad Industrial Trabajo Hombre Negro', price: 53990,
    image: path.join(outputDir, 'source-images', '266-black.png'),
    material: 'Malla y material sintetico', footwearType: 'Zapatilla', sole: 'Goma', closure: 'Perilla giratoria',
    features: ['puntera reforzada', 'diseño ligero', 'malla transpirable', 'suela antideslizante'],
    sizes: [
      ['NW260551NEG36', '723440647474', '36'], ['NW260551NEG37', '723440647481', '37'],
      ['NW260551NEG38', '723440647498', '38'], ['NW260551NEG39', '723440647504', '39'],
      ['NW260551NEG40', '723440647511', '40'], ['NW260551NEG41', '723440647528', '41'],
      ['NW260551NEG42', '723440647535', '42'], ['NW260551NEG43', '723440647542', '43'],
      ['NW260551NEG44', '723440647559', '44']
    ]
  },
  ...[
    ['VER', 'Verde oscuro', '52019', '2450324', 'green', [
      ['NW260552VER40', '723440647566', '40'], ['NW260552VER41', '148373909237', '41'],
      ['NW260552VER42', '148373909244', '42'], ['NW260552VER43', '148373909251', '43'],
      ['NW260552VER44', '148373909268', '44']
    ]],
    ['GRI', 'Gris', '283165', '2450294', 'gray', [
      ['NW260552GRI40', '148373909275', '40'], ['NW260552GRI41', '148373909282', '41'],
      ['NW260552GRI42', '148373909299', '42'], ['NW260552GRI43', '148373909305', '43'],
      ['NW260552GRI44', '148373909312', '44']
    ]],
    ['NEG', 'Negro', '52049', '2450295', 'black', [
      ['NW260552NEG40', '148373909329', '40'], ['NW260552NEG41', '855833556770', '41'],
      ['NW260552NEG42', '855833556787', '42'], ['NW260552NEG43', '855833556794', '43'],
      ['NW260552NEG44', '855833556800', '44']
    ]]
  ].map(([code, color, colorId, mainColorId, imageColor, sizes]) => ({
    id: `NW260552${code}40-44`, model: '178', color, colorId, mainColorId,
    title: `Bota Seguridad Industrial Trabajo Hombre ${color}`,
    price: 51990, image: path.join(outputDir, 'source-images', `178-${imageColor}.png`),
    material: 'Microfibra y goma plastica', footwearType: 'Zapatos de seguridad', sole: 'Goma', closure: 'Cordones',
    features: ['puntera de acero', 'material transpirable', 'suela de goma antideslizante', 'diseño ergonomico'], sizes
  }))
];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function loadRecord() {
  try { return JSON.parse(await fs.readFile(recordPath, 'utf8')); }
  catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return { created_at: new Date().toISOString(), stage: 'preflight', groups: {} };
  }
}

async function saveRecord(record) {
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(recordPath, `${JSON.stringify(record, null, 2)}\n`);
}

function allVariants() {
  return groups.flatMap(group => group.sizes.map(([sku, upc, size]) => ({ group, sku, upc, size })));
}

async function getAllSellerItems() {
  const ids = [];
  for (let offset = 0; ; offset += 100) {
    const page = await apiRequest(`/users/${sellerId}/items/search?limit=100&offset=${offset}`);
    ids.push(...(page.results || []));
    if (!page.results?.length || ids.length >= Number(page.paging?.total || 0)) break;
  }
  const items = [];
  for (let index = 0; index < ids.length; index += 20) {
    const batch = ids.slice(index, index + 20);
    const responses = await apiRequest(`/items?ids=${batch.join(',')}&include_attributes=all`);
    items.push(...responses.filter(response => response.code === 200).map(response => response.body));
  }
  return items;
}

function attrValue(attributes, id) {
  return attributes?.find(attribute => attribute.id === id)?.value_name;
}

async function preflight(record) {
  const variants = allVariants();
  const skus = variants.map(variant => variant.sku);
  const upcs = variants.map(variant => variant.upc);
  if (new Set(skus).size !== skus.length) throw new Error('Duplicate SKU inside source workbook');
  if (new Set(upcs).size !== upcs.length) throw new Error('Duplicate UPC inside source workbook');

  const items = await getAllSellerItems();
  const existing = [];
  for (const item of items) {
    const candidates = [
      { itemId: item.id, sku: attrValue(item.attributes, 'SELLER_SKU'), upc: attrValue(item.attributes, 'GTIN') },
      ...(item.variations || []).map(variation => ({
        itemId: item.id, variationId: variation.id,
        sku: attrValue(variation.attributes, 'SELLER_SKU'), upc: attrValue(variation.attributes, 'GTIN')
      }))
    ];
    for (const candidate of candidates) {
      if (skus.includes(candidate.sku) || upcs.includes(candidate.upc)) existing.push(candidate);
    }
  }
  if (existing.length) throw new Error(`Existing SKU/UPC found: ${JSON.stringify(existing)}`);
  record.preflight = { seller_id: sellerId, scanned_items: items.length, sku_count: skus.length, upc_count: upcs.length, duplicates: [] };
  record.stage = 'preflight_complete';
  await saveRecord(record);
}

async function ensureSizeRows(record) {
  let chart = await apiRequest(`/catalog/charts/${sizeGridId}`);
  let bySize = Object.fromEntries(chart.rows.map(row => [
    row.attributes?.find(attribute => attribute.id === 'SIZE')?.values?.[0]?.name,
    row.id
  ]));
  const footLengths = { '36': [22, 22.5], '37': [23, 23.5], '38': [24, 24.5], '39': [24.5, 25] };
  for (const size of ['36', '37', '38', '39']) {
    if (bySize[size]) continue;
    const [from, to] = footLengths[size];
    await apiRequest(`/catalog/charts/${sizeGridId}/rows`, {
      method: 'POST',
      body: {
        attributes: [
          { id: 'FOOT_LENGTH', values: [{ name: `${from} cm`, struct: { number: from, unit: 'cm' } }] },
          { id: 'FOOT_LENGTH_TO', values: [{ name: `${to} cm`, struct: { number: to, unit: 'cm' } }] },
          { id: 'MANUFACTURER_SIZE', values: [{ name: size }] }
        ]
      }
    });
  }
  chart = await apiRequest(`/catalog/charts/${sizeGridId}`);
  bySize = Object.fromEntries(chart.rows.map(row => [
    row.attributes?.find(attribute => attribute.id === 'SIZE')?.values?.[0]?.name,
    row.id
  ]));
  for (const size of ['36', '37', '38', '39', '40', '41', '42', '43', '44']) {
    if (!bySize[size]) throw new Error(`Size grid row missing for size ${size}`);
  }
  record.size_rows = bySize;
  record.stage = 'size_grid_ready';
  await saveRecord(record);
  return bySize;
}

async function uploadImage(group, groupRecord) {
  if (groupRecord.picture_ids?.length) return groupRecord.picture_ids;
  const preparedDir = path.join(outputDir, 'prepared-images', group.id);
  const prepared = path.join(preparedDir, '1.jpg');
  await fs.mkdir(preparedDir, { recursive: true });
  await sharp(group.image).rotate().resize(1200, 1200, { fit: 'contain', background: '#ffffff' }).jpeg({ quality: 94 }).toFile(prepared);
  const form = new FormData();
  form.append('file', new Blob([await fs.readFile(prepared)], { type: 'image/jpeg' }), `${group.id}.jpg`);
  const response = await fetch('https://api.mercadolibre.com/pictures/items/upload', {
    method: 'POST', headers: { authorization: `Bearer ${await getAccessToken()}` }, body: form
  });
  const body = await response.json();
  if (!response.ok || !body.id) throw new Error(`${group.id}: picture upload failed ${JSON.stringify(body)}`);
  groupRecord.picture_ids = [body.id];
  await fs.mkdir(path.dirname(recordPath), { recursive: true });
  return groupRecord.picture_ids;
}

function packageForSize(size) {
  const numeric = Number(size);
  return {
    length: Math.round(31 + Math.max(0, numeric - 40) * 0.7),
    width: 20,
    height: 12,
    weight: Math.round(1050 + Math.max(0, numeric - 40) * 25)
  };
}

function buildDescription(group) {
  const sizes = group.sizes.map(([, , size]) => size).join(', ');
  const featureLines = group.features.map(feature => `- ${feature.charAt(0).toUpperCase()}${feature.slice(1)}.`).join('\n');
  return `¡Bienvenido a Furaxis!\n\nEn Furaxis seleccionamos productos pensados para acompañar jornadas exigentes con una combinación equilibrada de protección, comodidad y apariencia moderna. Este calzado de seguridad modelo ${group.model} en color ${group.color.toLowerCase()} está diseñado para quienes trabajan de pie, caminan con frecuencia o necesitan un calzado firme para bodegas, talleres, logística, mantenimiento, construcción ligera y tareas industriales.\n\nLa publicación reúne las tallas ${sizes} dentro del mismo grupo de producto. Antes de comprar, selecciona la talla correcta. Todas las opciones mantienen el mismo modelo, color y características; únicamente cambia la talla elegida.\n\nCARACTERÍSTICAS PRINCIPALES\n\n${featureLines}\n- Diseño de seguridad para uso laboral.\n- Material exterior: ${group.material}.\n- Material de la suela: ${group.sole}.\n- Sistema de cierre: ${group.closure}.\n- Color: ${group.color}.\n- Modelo: ${group.model}.\n- Condición: producto nuevo.\n- Contenido: un par en la talla seleccionada.\n\nPROTECCIÓN PARA LA JORNADA\n\nEl diseño combina una estructura exterior reforzada con una base de apoyo pensada para el movimiento diario. La zona delantera ayuda a proteger los dedos frente a golpes accidentales propios de actividades laborales. La suela con relieve aporta puntos de contacto sobre superficies secas y ayuda a mantener una pisada estable durante desplazamientos frecuentes.\n\nLa protección del calzado no reemplaza las normas de prevención de riesgos de cada empresa. Utiliza siempre los elementos de protección personal exigidos para tu actividad y revisa periódicamente el estado del calzado, la suela, las costuras y el sistema de cierre.\n\nCOMODIDAD Y AJUSTE\n\nEl interior está pensado para recibir el pie con una sujeción estable. Ajusta el cierre de manera uniforme, sin comprimir los dedos. Una talla correcta debe mantener el talón firme y permitir un pequeño espacio en la puntera. Usa calcetines del mismo grosor que ocuparás normalmente para comprobar el calce.\n\nPara elegir la talla, mide ambos pies al final del día. Apoya el talón contra una pared y mide hasta el dedo más largo. Usa la medida del pie de mayor longitud. La horma puede variar entre modelos, por lo que no conviene elegir únicamente por la talla impresa en otro calzado.\n\nTALLAS DISPONIBLES\n\n${group.sizes.map(([, , size]) => `- Talla ${size}.`).join('\n')}\n\nSelecciona la talla antes de agregar al carrito. Al recibir el producto, pruébalo sobre una superficie limpia. Camina algunos pasos y verifica que el talón no se desplace en exceso, que los dedos no queden comprimidos y que el empeine se sienta firme sin molestias.\n\nMATERIALES Y DISEÑO\n\nEl exterior de ${group.material.toLowerCase()} combina zonas estructurales con una silueta pensada para el trabajo. La suela de ${group.sole.toLowerCase()} presenta un dibujo marcado que ayuda al contacto con el piso. El color ${group.color.toLowerCase()} ofrece una apariencia sobria y fácil de combinar con uniforme, pantalón de trabajo o ropa de uso diario.\n\nEl diseño busca equilibrar protección y movilidad. Resulta práctico para personas que se desplazan entre bodega, taller, área de carga, comercio, mantenimiento, inventario, reparto y supervisión. También puede acompañar tareas domésticas o proyectos personales donde se prefiera un calzado de estructura firme.\n\nMEDIDAS DEL PAQUETE\n\nLas medidas logísticas estimadas varían ligeramente según la talla. El paquete se prepara en una caja de aproximadamente 31 a 34 cm de largo, 20 cm de ancho y 12 cm de alto, con un peso aproximado de 1.050 a 1.150 g. Estas medidas corresponden al bulto de despacho y no al largo interior del zapato.\n\nCUIDADO Y LIMPIEZA\n\nRetira polvo y residuos después de cada uso con un cepillo suave. Para suciedad localizada, utiliza un paño apenas húmedo y jabón neutro. No sumerjas el calzado, no lo laves en lavadora y no uses solventes agresivos. La humedad excesiva y los movimientos intensos pueden afectar adhesivos, costuras y acolchado.\n\nDeja secar a la sombra en un lugar ventilado. No acerques el calzado a estufas, secadores ni fuentes de calor directo. Retira la plantilla si necesitas mejorar la ventilación interior. Antes de volver a usar, confirma que el interior esté completamente seco.\n\nMantén la suela libre de piedras, grasa y residuos. Revisa periódicamente las zonas de mayor flexión y reemplaza el calzado si observas desgaste profundo, separación de piezas o daño que reduzca su capacidad de protección.\n\nQUÉ RECIBES\n\nRecibirás un par de calzado de seguridad modelo ${group.model}, color ${group.color.toLowerCase()}, en la talla seleccionada. Las imágenes muestran el diseño y la apariencia general del producto. La percepción del color puede variar levemente por la iluminación, la cámara o la configuración de cada pantalla.\n\nPREGUNTAS FRECUENTES\n\n¿La compra incluye un par?\nSí. Recibirás un par en la talla seleccionada.\n\n¿Qué tallas están disponibles?\nEsta publicación permite elegir entre ${sizes}, según disponibilidad de stock.\n\n¿Todas las variantes son el mismo modelo?\nSí. Todas corresponden al modelo ${group.model} en color ${group.color.toLowerCase()}; solamente cambia la talla.\n\n¿Cómo elijo la talla?\nMide ambos pies con los calcetines que usarás habitualmente y toma como referencia el pie más largo. Considera que la horma puede variar frente a otras marcas.\n\n¿Se puede lavar en lavadora?\nNo lo recomendamos. Limpia con cepillo suave y paño húmedo, y seca siempre a la sombra.\n\n¿Sirve para jornadas largas?\nEl diseño busca ofrecer sujeción y comodidad durante actividades laborales. El resultado depende de elegir una talla adecuada, usar calcetines apropiados y ajustar correctamente el cierre.\n\n¿Es antideslizante?\nLa suela tiene relieve y está pensada para mejorar el agarre. Ningún calzado evita todos los deslizamientos; mantén la suela limpia y actúa con precaución sobre agua, aceite, polvo o superficies muy lisas.\n\n¿Tiene garantía?\nSí. La publicación incluye garantía del vendedor por 30 días. Si necesitas ayuda, utiliza la mensajería asociada a tu compra.\n\nRECOMENDACIONES ANTES DE COMPRAR\n\nRevisa las imágenes, selecciona la talla con atención y confirma que buscas el modelo ${group.model} en color ${group.color.toLowerCase()}. Una elección correcta mejora la comodidad, evita presión innecesaria y permite aprovechar mejor la estructura del calzado.\n\nEn Furaxis queremos que compres con información clara. Este modelo reúne una apariencia moderna, materiales pensados para el uso diario y características útiles para distintas rutinas laborales. Elige tu talla y prepara tu jornada con un calzado práctico, firme y fácil de combinar.\n\nUsted también puede buscar: zapatos de seguridad hombre, tenis de seguridad industrial, zapatillas de seguridad trabajo, calzado laboral, zapatos industriales antideslizantes, calzado con puntera reforzada, zapatos para bodega, calzado para taller, botas de seguridad hombre, zapatos de trabajo, calzado industrial ${group.color.toLowerCase()}, zapatos seguridad modelo ${group.model}.`;
}

function buildPayload(group, pictureIds, variant, rowId) {
  const { length, width, height, weight } = packageForSize(variant.size);
  return {
    family_name: group.title,
    category_id: 'MLC179382', price: group.price, currency_id: 'CLP', available_quantity: 10,
    buying_mode: 'buy_it_now', listing_type_id: 'gold_special', condition: 'new',
    pictures: pictureIds.map(id => ({ id })),
    attributes: [
      { id: 'BRAND', value_name: 'Generica' },
      { id: 'MODEL', value_name: group.model },
      { id: 'GENDER', value_id: '339666', value_name: 'Hombre' },
      { id: 'COLOR', value_id: group.colorId, value_name: group.color },
      { id: 'MAIN_COLOR', value_id: group.mainColorId },
      { id: 'SIZE', ...(sizeValueIds[variant.size] ? { value_id: sizeValueIds[variant.size] } : {}), value_name: variant.size },
      { id: 'SIZE_GRID_ID', value_name: sizeGridId },
      { id: 'SIZE_GRID_ROW_ID', value_name: rowId },
      { id: 'SAFETY_FOOTWEAR_TYPE', value_name: group.footwearType },
      { id: 'FOOTWEAR_MATERIAL', value_name: group.material },
      { id: 'OUTSOLE_MATERIAL', value_name: group.sole },
      { id: 'TOE_CAP_MATERIAL', value_name: 'Acero' },
      { id: 'CLOSURE_TYPE', value_name: group.closure },
      { id: 'GTIN', value_name: variant.upc },
      { id: 'SELLER_SKU', value_name: variant.sku },
      { id: 'SELLER_PACKAGE_LENGTH', value_name: `${length} cm` },
      { id: 'SELLER_PACKAGE_WIDTH', value_name: `${width} cm` },
      { id: 'SELLER_PACKAGE_HEIGHT', value_name: `${height} cm` },
      { id: 'SELLER_PACKAGE_WEIGHT', value_name: `${weight} g` }
    ],
    sale_terms: [
      { id: 'WARRANTY_TYPE', value_id: '2230280' },
      { id: 'WARRANTY_TIME', value_name: '30 dias' }
    ],
    shipping: { mode: 'me2', local_pick_up: false }
  };
}

async function validatePayload(payload) {
  try { await apiRequest('/items/validate', { method: 'POST', body: payload }); }
  catch (error) {
    const warningOnly = error.message.includes('\"type\":\"warning\"') && !error.message.includes('\"type\":\"error\"');
    if (!warningOnly) throw error;
  }
}

async function enableFlex(itemId) {
  const endpoint = `/flex/sites/MLC/items/${itemId}/v2`;
  try {
    let state = await apiRequest(endpoint);
    if (!state.has_flex) await apiRequest(endpoint, { method: 'POST' });
    for (let attempt = 0; attempt < 5; attempt += 1) {
      await sleep(1200);
      state = await apiRequest(endpoint);
      if (state.has_flex) return { enabled: true, state };
    }
    return { enabled: false, state, error: 'Flex did not become active' };
  } catch (error) {
    return { enabled: false, error: error.message };
  }
}

let record = await loadRecord();
try {
  const me = await apiRequest('/users/me');
  if (String(me.id) !== sellerId || me.nickname !== 'FURAXIS_CL' || me.site_id !== 'MLC') {
    throw new Error(`Wrong seller account: ${JSON.stringify({ id: me.id, nickname: me.nickname, site_id: me.site_id })}`);
  }
  if (!record.preflight) await preflight(record);
  const sizeRows = await ensureSizeRows(record);

  for (const group of groups) {
    const groupRecord = record.groups[group.id] ||= { id: group.id, title: group.title, price: group.price, items: {} };
    const description = buildDescription(group);
    if (description.length < 4000) throw new Error(`${group.id}: description too short (${description.length})`);
    const pictureIds = await uploadImage(group, groupRecord);

    for (const [sku, upc, size] of group.sizes) {
      const variant = { sku, upc, size };
      const payload = buildPayload(group, pictureIds, variant, sizeRows[size]);
      await validatePayload(payload);
      groupRecord.items[sku] ||= { stage: 'validated', size, upc };
    }
    groupRecord.stage = 'validated';
    await saveRecord(record);
  }
  record.stage = 'all_validated';
  await saveRecord(record);

  for (const group of groups) {
    const groupRecord = record.groups[group.id];
    const description = buildDescription(group);
    for (const [sku, upc, size] of group.sizes) {
      const itemRecord = groupRecord.items[sku];
      let itemId = itemRecord.id;
      if (!itemId) {
        const created = await apiRequest('/items', {
          method: 'POST', body: buildPayload(group, groupRecord.picture_ids, { sku, upc, size }, sizeRows[size])
        });
        itemId = created.id;
        Object.assign(itemRecord, { id: itemId, stage: 'created' });
        await saveRecord(record);
      }

      await apiRequest(`/items/${itemId}`, { method: 'PUT', body: { status: 'paused' } });
      let currentDescription = {};
      try { currentDescription = await apiRequest(`/items/${itemId}/description`); } catch {}
      await apiRequest(`/items/${itemId}/description`, {
        method: currentDescription.plain_text ? 'PUT' : 'POST', body: { plain_text: description }
      });

      let item = await apiRequest(`/items/${itemId}?include_attributes=all`);
      if (item.shipping?.mode !== 'me2') {
        await apiRequest(`/items/${itemId}`, { method: 'PUT', body: { shipping: { mode: 'me2', local_pick_up: false } } });
        await sleep(800);
        item = await apiRequest(`/items/${itemId}?include_attributes=all`);
      }
      const flex = await enableFlex(itemId);
      const finalDescription = await apiRequest(`/items/${itemId}/description`);
      item = await apiRequest(`/items/${itemId}?include_attributes=all`);
      const actualSku = attrValue(item.attributes, 'SELLER_SKU');
      const actualSize = attrValue(item.attributes, 'SIZE');
      if (item.status !== 'paused') throw new Error(`${sku}: status is ${item.status}, expected paused`);
      if (actualSku !== sku || actualSize !== size) throw new Error(`${sku}: attribute mismatch SKU=${actualSku}, SIZE=${actualSize}`);
      if ((finalDescription.plain_text?.length || 0) < 4000) throw new Error(`${sku}: description verification failed`);
      Object.assign(itemRecord, {
        stage: 'complete', id: item.id, title: item.title, family_name: item.family_name,
        permalink: item.permalink, price: item.price, status: item.status,
        shipping_mode: item.shipping?.mode, flex: flex.enabled, flex_error: flex.error || null,
        description_length: finalDescription.plain_text.length,
        package_estimated: true, completed_at: new Date().toISOString()
      });
      await saveRecord(record);
    }
    groupRecord.stage = 'complete';
    await saveRecord(record);
  }

  record.stage = 'complete';
  record.result = 'success';
  record.completed_at = new Date().toISOString();
  delete record.error;
  delete record.failed_at;
  await saveRecord(record);
  console.log(JSON.stringify(record, null, 2));
} catch (error) {
  record.stage = 'failed';
  record.result = 'exception';
  record.error = error.message;
  record.failed_at = new Date().toISOString();
  await saveRecord(record);
  console.error(JSON.stringify(record, null, 2));
  process.exitCode = 1;
}
