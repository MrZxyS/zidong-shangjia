import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { apiRequest, getAccessToken } from '../src/meli.js';

const sku = 'NW260781BLAMS1';
const source = JSON.parse(await fs.readFile('.data/batch-51-129-image-manifest.json', 'utf8')).find(x => x.sku === sku);
const recordPath = path.resolve('.data', `${sku}-published.json`);
const title = 'Peluche Vaca Highland Escocesa Suave Color Crema';
const category = 'MLC1166';
const price = Math.ceil((Number(source.development.price_clp) * 1.8 - 990) / 1000) * 1000 + 990;
const intro = `¡Bienvenido a Furaxis!\n\nHay detalles que hacen más cálido un rincón de la casa. Este peluche con forma de vaquita Highland, en tono crema y con los característicos detalles marrones de su rostro y patas, aporta una presencia tierna a una habitación, un sillón o un espacio preparado para un regalo. Su silueta sentada permite reconocer de inmediato la inspiración de la vaca escocesa: pequeños cuernos, orejas visibles, hocico redondo y patas delanteras abiertas. Si buscas un regalo con personalidad y una figura fácil de combinar con otros objetos decorativos, esta vaquita es una opción encantadora.\n\nPOR QUÉ ELEGIR ESTA VAQUITA\n\nSu apariencia combina un cuerpo claro con contrastes marrones en los cuernos, el hocico y las patas. Es una figura amistosa que se luce tanto sola como acompañada de otros peluches. Su expresión sencilla invita a incluirla en la decoración de dormitorios, rincones de lectura, habitaciones infantiles o espacios de descanso. Puede ser un detalle para un cumpleaños, una sorpresa para alguien que aprecia los animales de granja o una incorporación a una colección de vaquitas.\n\nLa imagen de referencia permite observar la forma, el tono y los detalles del modelo ofrecido. Mira especialmente el rostro y las patas para confirmar que es el estilo que buscas. El producto corresponde a una sola figura de peluche; la silla y los elementos de ambientación de la fotografía no forman parte de la compra.\n\nCARACTERÍSTICAS PRINCIPALES\n\n- Diseño inspirado en una vaca Highland o vaquita escocesa.\n- Color principal crema con detalles marrones visibles.\n- Figura de peluche en postura sentada.\n- Cuernos pequeños, orejas, hocico y patas definidos en el diseño.\n- Una unidad por publicación.\n- Producto nuevo.\n\nUNA IDEA DE REGALO VERSÁTIL\n\nUn peluche puede ser un obsequio que no necesita una ocasión específica. Esta vaquita encaja en una celebración, una bienvenida, un detalle de agradecimiento o un regalo espontáneo. El aspecto claro y la expresión amable combinan con ambientes de tonos neutros y aportan un punto de interés a un estante o una cama. Para quien disfruta los animales, el estilo de granja o las figuras suaves, tiene una identidad reconocible desde el primer vistazo.\n\nTambién puede acompañar un rincón dedicado a la lectura o una colección temática. Puedes combinarla con una manta, una caja de regalo o una tarjeta escrita a mano para preparar una sorpresa más personal. La elección del envoltorio y de los demás accesorios corre por cuenta del comprador; aquí se ofrece únicamente el peluche de la imagen.\n\nDETALLES Y PRESENTACIÓN\n\nLa vaquita se presenta en color crema. Sus detalles marrones generan contraste sin perder la apariencia cálida del conjunto. El rostro redondo, los cuernos cortos y la postura sentada son los rasgos principales que puedes identificar en la foto. Como ocurre con artículos textiles, la iluminación de una pantalla puede alterar ligeramente la percepción del color; por eso conviene revisar la fotografía junto con el nombre de la variante antes de confirmar la compra.\n\nLa pieza se prepara para despacho en un paquete de aproximadamente 22 x 15 x 5 cm y 280 g. Son medidas y peso del paquete de envío, no una medida declarada de altura ni de largo del peluche en uso. El empaque puede comprimirse para el transporte; al abrirlo, acomoda suavemente la figura y deja que recupere su forma. No se declara una talla exacta del muñeco porque la información de origen solo permite confirmar las dimensiones del bulto.\n\nIDEAS PARA DISFRUTARLO\n\nEn un dormitorio, puede destacar sobre una cama o un asiento. En una repisa, su figura crea un acento amable junto a libros o marcos de fotos. Si buscas un pequeño detalle para un espacio de trabajo, su expresión aporta un toque cercano sin necesidad de reorganizar la habitación. También resulta agradable como parte de una selección de animales de peluche o de una decoración con inspiración campestre.\n\nAntes de regalarlo, revisa que la persona destinataria aprecie este tipo de figura y el tono crema. Si va dirigido a un niño pequeño, utiliza siempre el criterio de un adulto para revisar el artículo y supervisar su uso de acuerdo con la edad y las condiciones de la persona que lo recibirá. No se anuncia una edad mínima certificada que no conste en la información del producto.\n\nCUIDADO DEL PELUCHE\n\nPara conservar su aspecto, retira el polvo con suavidad y evita el contacto prolongado con humedad, calor intenso o superficies que puedan manchar el tejido claro. Si necesita limpieza, prueba primero un método suave en una zona poco visible y evita productos abrasivos. No se recomienda un ciclo específico de lavado porque la etiqueta de cuidado no está confirmada en los datos de origen. Deja que el artículo se seque completamente antes de guardarlo.\n\nAl recibirlo, abre el paquete con cuidado para no dañar la superficie. Acomoda el cuerpo y las patas con las manos y permite que el relleno se distribuya de manera uniforme después del transporte. Si planeas conservarlo sin usar durante un tiempo, mantenlo en un lugar limpio y seco; evita colocar objetos pesados encima para preservar la forma de la figura.\n\nPREGUNTAS FRECUENTES\n\n¿Qué incluye la compra?\nUna vaquita de peluche en color crema. Los muebles y objetos de ambientación visibles en la imagen no están incluidos.\n\n¿Es una vaca Highland?\nSu diseño está inspirado en la apariencia de una vaquita escocesa Highland, con cuernos pequeños, rostro redondo y detalles marrones. Es un peluche decorativo, no una figura de colección con licencia de una marca específica.\n\n¿De qué color es?\nEl color principal es crema y los detalles visibles del rostro, cuernos y patas son marrones. Considera que cada pantalla puede mostrar los tonos de manera distinta.\n\n¿La medida de 22 x 15 x 5 cm es el tamaño del peluche?\nNo. Son las dimensiones del paquete de despacho. No utilizamos esas medidas para anunciar la altura real del peluche.\n\n¿Viene listo para regalar?\nRecibirás el peluche nuevo, preparado para envío. Si deseas una presentación especial con tarjeta o envoltorio, puedes organizarla por separado al recibirlo.\n\n¿Puede cambiar la forma al viajar?\nEl paquete puede comprimirse durante el transporte. Una vez abierto, acomoda la figura y deja que recupere su forma naturalmente.\n\n¿Tiene garantía?\nSí, esta publicación incluye garantía del vendedor por 30 días. Para cualquier consulta sobre una compra realizada, usa la mensajería de tu pedido en Mercado Libre.\n\nANTES DE FINALIZAR TU COMPRA\n\nRevisa el diseño de la fotografía, el color y el contenido indicado. Esta publicación corresponde a una unidad, no a un juego de varias figuras. Si tienes dudas sobre un detalle que no aparezca confirmado aquí, consulta antes de comprar para elegir con tranquilidad. En Furaxis buscamos que la información esencial sea clara: sabes qué figura estás escogiendo, qué color tiene y cómo se prepara para el envío.\n\nTambién podrías buscar: peluche vaquita, peluche vaca Highland, vaquita escocesa de peluche, muñeco vaca color crema, regalo de vaquita, decoración con animales de granja, peluche de vaca para regalar.`;
if (intro.length < 4000) throw new Error(`Description too short: ${intro.length}`);

async function save(record) { await fs.writeFile(recordPath, `${JSON.stringify(record, null, 2)}\n`); }
let record = { sku, source_index: source.source_index, stage: 'preparing', price_source: '开发跟踪表平台售价 CL × 1.8，向上取 990 结尾' };
try { record = { ...record, ...JSON.parse(await fs.readFile(recordPath, 'utf8')) }; } catch (error) { if (error.code !== 'ENOENT') throw error; }
try {
  let id = record.id;
  if (!id) {
    const existing = await apiRequest(`/users/3166000149/items/search?sku=${sku}`);
    if (existing.results.length > 1) throw new Error('Duplicate seller SKU on platform');
    id = existing.results[0];
  }
  if (!id) {
    const prepared = path.resolve('.data', 'prepared-images', `${sku}.jpg`);
    await fs.mkdir(path.dirname(prepared), { recursive: true });
    await sharp(path.resolve(source.images[0].path)).rotate().resize(1200, 1200, { fit: 'contain', background: '#ffffff' }).jpeg({ quality: 90 }).toFile(prepared);
    const form = new FormData();
    form.append('file', new Blob([await fs.readFile(prepared)], { type: 'image/jpeg' }), `${sku}.jpg`);
    const upload = await fetch('https://api.mercadolibre.com/pictures/items/upload', { method: 'POST', headers: { authorization: `Bearer ${await getAccessToken()}` }, body: form });
    const picture = await upload.json();
    if (!upload.ok || !picture.id) throw new Error(`Picture upload: ${JSON.stringify(picture)}`);
    record.picture_id = picture.id;
    await save(record);
    const attributes = [
      { id: 'BRAND', value_name: 'Genérica' }, { id: 'MODEL', value_name: 'Vaquita Highland color crema' },
      { id: 'GTIN', value_name: source.upc }, { id: 'SELLER_SKU', value_name: sku },
      { id: 'SELLER_PACKAGE_LENGTH', value_name: '22 cm' }, { id: 'SELLER_PACKAGE_WIDTH', value_name: '15 cm' },
      { id: 'SELLER_PACKAGE_HEIGHT', value_name: '5 cm' }, { id: 'SELLER_PACKAGE_WEIGHT', value_name: '280 g' }
    ];
    const item = await apiRequest('/items', { method: 'POST', body: {
      family_name: title, category_id: category, price, currency_id: 'CLP', available_quantity: 10,
      buying_mode: 'buy_it_now', listing_type_id: 'gold_special', condition: 'new', pictures: [{ id: picture.id }], attributes,
      sale_terms: [{ id: 'WARRANTY_TYPE', value_id: '2230280' }, { id: 'WARRANTY_TIME', value_name: '30 días' }],
      shipping: { mode: 'me2', local_pick_up: false }
    }});
    id = item.id;
    record.id = id;
    record.stage = 'created';
    await save(record);
  }
  await apiRequest(`/items/${id}`, { method: 'PUT', body: { status: 'paused' } });
  record.stage = 'paused'; await save(record);
  let current = {};
  try { current = await apiRequest(`/items/${id}/description`); } catch {}
  if ((current.plain_text?.length || 0) < 4000) await apiRequest(`/items/${id}/description`, { method: current.plain_text ? 'PUT' : 'POST', body: { plain_text: intro } });
  record.stage = 'description_added'; await save(record);
  const endpoint = `/flex/sites/MLC/items/${id}/v2`;
  let flex = await apiRequest(endpoint);
  if (!flex.has_flex) await apiRequest(endpoint, { method: 'POST' });
  for (let n = 0; n < 6 && !flex.has_flex; n++) { await new Promise(resolve => setTimeout(resolve, 1500)); flex = await apiRequest(endpoint); }
  const [item, description] = await Promise.all([apiRequest(`/items/${id}`), apiRequest(`/items/${id}/description`)]);
  Object.assign(record, { title: item.title, permalink: item.permalink, price: item.price, status: item.status, flex: flex.has_flex, description_length: description.plain_text?.length || 0, category_id: item.category_id });
  if (item.status !== 'paused' || !flex.has_flex || record.description_length < 4000) throw new Error('Final verification failed');
  record.stage = 'complete'; delete record.error; await save(record);
  console.log(JSON.stringify({ sku, id, stage: record.stage, price: item.price, flex: true, description_length: record.description_length }));
} catch (error) {
  record.error = error.message; record.stage = record.id ? record.stage : 'failed_before_creation'; await save(record);
  console.error(JSON.stringify({ sku, id: record.id || null, stage: record.stage, error: error.message }));
  process.exitCode = 1;
}
