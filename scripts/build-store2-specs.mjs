import fs from 'node:fs/promises';
import path from 'node:path';

const source = JSON.parse(await fs.readFile('.data/store2-source.json', 'utf8'));
const browser = JSON.parse(await fs.readFile('.data/store2-browser.json', 'utf8'));
const manifest = JSON.parse(await fs.readFile('.data/store2-image-manifest.json', 'utf8'));
const byBrowser = new Map(browser.map(x => [x.sku, x]));
const byImage = new Map(manifest.map(x => [x.sku, x.image_path]));

const colorMap = new Map([
  ['银色', 'Plateado'], ['粉色', 'Rosa'], ['白色', 'Blanco'], ['灰色', 'Gris'],
  ['蓝色', 'Azul'], ['黑色', 'Negro'], ['红色', 'Rojo'], ['黄色', 'Amarillo'],
  ['紫色', 'Morado'], ['棕色（咖啡）', 'Marrón'], ['橙色', 'Naranjo']
]);
const stop = new Set('de del la las el los para con y en un una por al a o x color marca modelo tipo set kit pack producto'.split(' '));
const brandWords = /\b(?:Truper|Hoco|Aiwa|Serenivida|Overfit|Eoland|Vector|Wowi|Ukicra|Carry\s*All|2nlf)\b/gi;
const titleOverrides = {
  BG260663PLAMS1: 'Funda Cubre Auto Sedán Impermeable Reflectante 2L',
  BG260663PLAMS2: 'Funda Cubre Auto SUV Impermeable Con Felpa 3XL',
  BG260663PLAMS3: 'Funda Cubre Auto SUV Impermeable Con Felpa YXXL',
  BG260661ROSMS1: 'Pack 4 Squishy Antiestrés Cubo Silicona Fidget',
  BG260679BLAMS1: 'Palma Calmante Para Bebé Con Movimiento Para Dormir',
  BG260714ROSMS1: 'Pack 2 Squishy Dumpling Antiestrés Sorpresa Rosa',
  BG260632NEGMS1: 'Pantalla Proyección 100 Pulgadas 16:9 Plegable Portátil',
  BG260648AZUMS1: 'Juego De Mesa Piedras Magnéticas Estrategia Infantil',
  BG260720ROJMS1: 'Grúa Pluma Hidráulica Plegable 2 Toneladas Roja',
  BG260720NEGMS2: 'Grúa Pluma Hidráulica Plegable 2 Toneladas Negra',
  BG260752BLAMS1: 'Malla Seguridad Balcón Ventana 2x5 M Para Niños',
  BG260741AZUMS1: 'Destapacaños 7,6 M Para Taladro Con Mango Azul',
  BG260856AZUMS1: 'Bolso Cooler Porta Insulina Refrigerante Azul',
  BG260843AMAMS1: 'Squishy Barra Mantequilla Gigante 23,5 Cm Antiestrés',
  BG260743NEGMS1: 'Termo Dispensador Para Agua Caliente 12 Litros',
  BG260712GRIMS1: 'Contenedor Alimento Mascotas 12 A 15 Kg Con Ruedas',
  BG260651BLAMS1: 'Flor Eterna En Bloques Con Domo Decorativo Blanca',
  BG260652NEGMS1: 'Juego Magnético De Estrategia 20 Piezas Negro',
  BG260644AZUMS1: 'Juego Magnético De Estrategia 20 Bolas Azul',
  BG260640PLAMS1: 'Cámara Seguridad Solar Wifi Doble Lente Exterior 10MP',
  BG260730BLAMS1: 'Localizador Bluetooth Antipérdida Para Android Negro',
  BG260729NEGMS1: 'Dron Juguete Control Remoto Forma De Espada Con Luces',
  BG260738NEGMS1: 'Mochila Térmica Para Delivery Expandible Con Separador',
  BG260739ROJMS1: 'Destapador Inodoro A Presión Para Desagüe Rojo',
  BG260853NEGMS1: 'Estuche Cooler Porta Insulina Con 2 Gel Frío Negro',
  BG260854NEGMS1: 'Bolso Viaje Porta Insulina Con 2 Gel Frío Negro',
  BG260855AZUMS1: 'Bolso Viaje Porta Insulina Con 2 Gel Frío Azul',
  BG260847NEGMS1: 'Pack 7 Anillos De Silicona Para Adultos Negro',
  BG260822MORMS1: 'Vibrador Estimulador Punto G Para Adultos Morado',
  BG260774BLAMS1: 'Letrero Luminoso Led Publicitario 40x60 Cm Negro',
  BG260798ROJMS1: 'Pista Tren Magnética Infantil Didáctica 146 Piezas',
  BG260750BLAMS1: 'Malla Seguridad Balcón Ventana 2,3x8 M Blanca',
  BG260670NEGMS1: 'Set 2 Porterías De Fútbol Portátiles Para Niños',
  BG260650AZUMS1: 'Flor Rosa Morada En Bloques De Construcción Con Domo',
  BG260872GRIMS1: 'Pack 4 Organizadores De Ropa 7 Divisiones Gris',
  BG260865PLAMS1: 'Soporte Mástil Techo Pared Compatible Starlink Mini',
  BG260776AZUMS1: 'Taladro Destornillador Inalámbrico 2 Baterías Azul',
  BG260777ROJMS1: 'Taladro Destornillador Inalámbrico 2 Baterías Rojo',
  BG260883NEGMS1: 'Bastón Retráctil Defensa Personal Apertura Automática',
  BG260888BLAMS1: 'Estante Madera Para Plantas Con Ruedas Blanco',
  BG260887NEGMS1: 'Estante Madera Para Plantas Con Ruedas Negro',
  BG260864NEGMS1: 'Soporte Mural Ajustable Compatible Starlink Mini Negro',
  BG260772BLAMS1: 'Lámpara De Pie Con Mesa Auxiliar Y Pantalla Plisada',
  BG260885NEGMS1: 'Cámara Seguridad Solar 4G Doble Lente Con Chip',
  BG260891AZUMS1: 'Lápiz Impresora 3D Con Filamentos 10 Colores Azul',
  BG260893ROSMS1: 'Lápiz Impresora 3D Con Filamentos 10 Colores Rosa',
  BG260869MARMS1: 'Mesa Auxiliar Con Ruedas Para Sofá Y Cama Marrón',
  BG260868ROSMS1: 'Máquina Algodón De Azúcar 52 Cm 1000W Rosa',
  BG260929NEGMS1: 'Traba Volante Antirrobo Con Conexión Al Cinturón',
  BG260931NARMS1: 'Traba Volante Antirrobo Tipo T Reforzada Naranjo',
  BG260934NEGMS1: 'Parlante Bluetooth Portátil Con Karaoke Negro',
  BG260923NEGMS1: 'Estante Para 6 Macetas 5 Niveles Metal Negro',
  BG260924BLAMS1: 'Estante Para 6 Macetas 5 Niveles Metal Blanco',
  BG260866PLAMS1: 'Pack 2 Bisagras Invisibles Ocultas Para Puerta',
  BG260649ROJMS1: 'Pinza Amperimétrica Digital 400A Roja',
  BG260927MARMS1: 'Estante Para Plantas 5 Niveles Negro Y Marrón'
};

function cleanText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function words(value) {
  return cleanText(value).toLocaleLowerCase('es').match(/[a-záéíóúñü0-9]+/gi) || [];
}

function commonKeywords(row) {
  const titles = (row.top_five_titles?.length ? row.top_five_titles : row.related_titles || []).slice(0, 5);
  const counts = new Map();
  const firstSeen = [];
  for (const title of titles) {
    const unique = new Set(words(title).filter(w => w.length > 2 && !stop.has(w)));
    for (const word of unique) {
      if (!counts.has(word)) firstSeen.push(word);
      counts.set(word, (counts.get(word) || 0) + 1);
    }
  }
  return firstSeen.sort((a, b) => (counts.get(b) - counts.get(a))).slice(0, 10);
}

function variantText(product) {
  const spec = cleanText(product.source_spec);
  const color = colorMap.get(product.development?.color) || '';
  const parts = [];
  const size = spec.match(/(?:^|[\s（(])((?:\d{1,2})?X{0,3}L\+?|YXXL|S\/M|L\/XL)(?=[\s）)]|$)/i)?.[1];
  if (size) parts.push(size.replace('+', ''));
  if (color) parts.push(color);
  if (/两个装|2个装/.test(spec)) parts.push('Pack 2');
  if (/2个冰袋/.test(spec)) parts.push('Con 2 Gel Frío');
  if (/两电一充/.test(spec)) parts.push('2 Baterías');
  if (/5米10色/.test(spec)) parts.push('10 Colores');
  if (/脚踏开关/.test(spec)) parts.push('Interruptor De Pie');
  if (/百褶/.test(spec)) parts.push('Pantalla Plisada');
  if (/五层六盘/.test(spec)) parts.push('5 Niveles 6 Macetas');
  else if (/5层|五层/.test(spec)) parts.push('5 Niveles');
  return [...new Set(parts)].join(' ');
}

function titleFor(product, row) {
  if (titleOverrides[product.sku]) return titleOverrides[product.sku];
  let base = cleanText(row.title).replace(brandWords, '').replace(/\s+/g, ' ').trim();
  const variant = variantText(product);
  if (variant) {
    const missing = variant.split(' ').filter(token => !new RegExp(`\\b${token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(base));
    if (missing.length) base = `${base} ${missing.join(' ')}`;
  }
  const common = commonKeywords(row);
  for (const keyword of common) {
    if (base.length >= 52) break;
    if (!new RegExp(`\\b${keyword}\\b`, 'i').test(base) && base.length + keyword.length + 1 <= 60) base += ` ${keyword}`;
  }
  if (base.length <= 60) return base;
  const cut = base.slice(0, 60);
  return cut.includes(' ') ? cut.slice(0, cut.lastIndexOf(' ')) : cut;
}

function roundUp990(value) {
  const n = Math.ceil(Number(value));
  let result = Math.floor(n / 1000) * 1000 + 990;
  if (result < n) result += 1000;
  return result;
}

function packageFor(product, row) {
  const d = product.development;
  if (d?.length_cm && d?.width_cm && d?.height_cm && d?.weight_kg) {
    return {
      length_cm: Math.ceil(d.length_cm), width_cm: Math.ceil(d.width_cm),
      height_cm: Math.ceil(d.height_cm), weight_g: Math.ceil(d.weight_kg * 1000), inferred: false
    };
  }
  const text = cleanText(row.specs_text);
  const dims = text.match(/Largo x Ancho x Altura\s*([\d.,]+)\s*cm x\s*([\d.,]+)\s*cm x\s*([\d.,]+)\s*cm/i);
  const weight = text.match(/Peso\s*([\d.,]+)\s*(kg|g)/i);
  const parse = v => Number(String(v).replace(',', '.'));
  return {
    length_cm: Math.ceil(dims ? parse(dims[1]) : 22),
    width_cm: Math.ceil(dims ? parse(dims[2]) : 14),
    height_cm: Math.ceil(dims ? parse(dims[3]) : 10),
    weight_g: Math.ceil(weight ? parse(weight[1]) * (weight[2].toLowerCase() === 'kg' ? 1000 : 1) : 640),
    inferred: true
  };
}

function descriptionFor(product, row, title, pkg, keywords) {
  const variant = variantText(product) || 'según la opción indicada en el título';
  const searchTerms = [...new Set([...keywords, ...words(title).filter(w => w.length > 3 && !stop.has(w))])].slice(0, 18).join(', ');
  const text = `¡Bienvenido a Furaxis!

En Furaxis seleccionamos productos prácticos para el hogar, el trabajo, el cuidado personal, el tiempo libre y las tareas de cada día. Esta publicación corresponde a ${title}. Antes de comprar, revisa con atención el título, las fotografías, la opción seleccionada y las medidas indicadas. Así podrás confirmar que esta alternativa es adecuada para el uso que tienes en mente.

POR QUÉ ELEGIR ESTE PRODUCTO

Este artículo fue elegido por su enfoque funcional y por ofrecer una solución sencilla para quienes buscan ${keywords.slice(0, 5).join(', ') || title}. Su diseño está pensado para un uso cómodo dentro de la finalidad propia del producto. La configuración ofrecida es ${variant}. Recibirás una unidad o el conjunto expresamente indicado en el título de la publicación.

Características destacadas:

• Diseño práctico para uso cotidiano.
• Formato fácil de guardar, transportar o integrar en el espacio correspondiente, según el tipo de producto.
• Materiales y terminaciones pensados para un uso normal y responsable.
• Presentación nueva, lista para preparar y utilizar siguiendo las recomendaciones de esta publicación.
• Alternativa útil para uso personal, familiar, doméstico, profesional o como regalo, cuando corresponda.
• Compra respaldada por la atención de Furaxis antes y después de la entrega.

ESPECIFICACIONES DE LA PUBLICACIÓN

Producto: ${title}
Condición: Nuevo
Opción ofrecida: ${variant}
Contenido: una unidad o set según lo indicado expresamente en el título y la fotografía principal
Medidas aproximadas del paquete para despacho: ${pkg.length_cm} cm de largo x ${pkg.width_cm} cm de ancho x ${pkg.height_cm} cm de alto
Peso aproximado del paquete: ${pkg.weight_g} g
Garantía de vendedor: 30 días

Las medidas del paquete corresponden a la preparación logística para el envío y pueden diferir de las dimensiones de uso del producto. Para escoger correctamente, utiliza como referencia principal las características visibles en la publicación y las especificaciones particulares del modelo ofrecido.

BENEFICIOS PARA TU COMPRA

Comprar una opción claramente identificada evita confusiones y facilita la elección. Por eso mantenemos el nombre del producto, su variante y sus características principales reunidas en esta publicación. El objetivo es que puedas comparar, revisar y decidir con tranquilidad. Si necesitas confirmar compatibilidad, capacidad, talla, color, forma de instalación o uso previsto, realiza tu consulta antes de comprar.

El producto puede ser una buena alternativa para organizar una tarea, reemplazar un accesorio, completar un espacio, desarrollar una actividad o resolver una necesidad concreta. Su utilidad final depende del uso correcto, de la compatibilidad con otros elementos y del cuidado que reciba. No recomendamos utilizarlo para una finalidad distinta de aquella para la que fue diseñado.

RECOMENDACIONES DE USO

1. Abre el embalaje con cuidado para no dañar el contenido.
2. Revisa que todas las piezas indicadas en la publicación estén presentes antes de usarlo.
3. Lee las instrucciones incluidas cuando el producto incorpore manual, accesorios, montaje, conexión o ajustes.
4. Utiliza el artículo sobre una superficie y en un entorno adecuados para su función.
5. Si necesita instalación, montaje o configuración, realiza cada paso sin forzar piezas, uniones, cierres o conectores.
6. Mantén el producto limpio y seco de acuerdo con sus materiales. Evita productos abrasivos salvo que el fabricante los recomiende.
7. Guarda las piezas pequeñas y el embalaje fuera del alcance de niños y mascotas cuando exista riesgo de ingestión o asfixia.
8. En artículos eléctricos, confirma previamente la compatibilidad de voltaje, enchufe y condiciones de uso. No manipules conexiones con las manos mojadas.
9. En productos de cuidado personal, salud, deporte o seguridad, este artículo no sustituye la recomendación de un profesional ni garantiza resultados específicos.
10. Suspende el uso si observas daños, desgaste inusual o funcionamiento irregular.

CUIDADO Y CONSERVACIÓN

Para prolongar la vida útil, limpia el producto después de usarlo cuando sea necesario, evita golpes y no lo expongas a temperaturas, humedad, peso o tensión superiores a las propias de su función. Guarda accesorios y componentes juntos para evitar pérdidas. Si el producto es plegable, regulable o desmontable, libera seguros y uniones de forma gradual. No fuerces mecanismos ni apliques lubricantes, adhesivos o químicos sin verificar primero que sean compatibles con el material.

QUÉ RECIBIRÁS

El paquete incluye el producto descrito en esta publicación, en la variante señalada en el título. Cuando el título indique pack, set, cantidad de piezas, accesorios o complementos, esa indicación define el contenido ofrecido. Los elementos utilizados solamente para ambientación no forman parte de la compra salvo que estén mencionados expresamente.

PREGUNTAS FRECUENTES

¿El producto es nuevo?
Sí. Se entrega nuevo y preparado para despacho.

¿Cómo confirmo la variante correcta?
Revisa el título y la opción indicada: ${variant}. Si necesitas una medida, color o configuración diferente, consulta antes de comprar.

¿Las medidas publicadas son exactas?
Las medidas logísticas son aproximadas y se utilizan para preparar el envío. Puede existir una pequeña variación por la forma de medir, el embalaje o el acomodo de accesorios.

¿Incluye todo lo que aparece en las imágenes?
Incluye el producto y los componentes expresamente señalados en el título o en el apartado de contenido. Los objetos de ambientación no están incluidos.

¿Puedo usarlo inmediatamente?
Depende del tipo de artículo. Algunos productos requieren montaje, carga, conexión, configuración, limpieza inicial o retiro de protecciones. Sigue siempre las instrucciones correspondientes.

¿Cómo sé si es compatible con lo que ya tengo?
Compara medidas, conexiones, capacidad, forma, modelo y uso previsto. Ante cualquier duda, pregunta antes de realizar la compra.

¿Tiene garantía?
La publicación contempla 30 días de garantía del vendedor por defectos atribuibles al producto, respetando las condiciones de uso adecuado y la normativa aplicable.

¿Puedo hacer preguntas antes de comprar?
Sí. En Furaxis queremos que elijas con información clara. Escríbenos mediante la sección de preguntas y responderemos lo antes posible.

COMPRA CON CONFIANZA EN FURAXIS

Preparamos cada pedido con atención para que el producto llegue correctamente protegido. Recomendamos conservar el embalaje y revisar el contenido al recibirlo. Si tienes una consulta sobre la publicación, la variante o el uso general, nuestro equipo está disponible para ayudarte dentro de los canales de Mercado Libre.

Usted también puede buscar: ${searchTerms}.

Gracias por visitar Furaxis. Revisa nuevamente el título, la variante y las características antes de confirmar tu compra. Esperamos que ${title} sea una solución útil para tu necesidad.`;
  return text.length >= 4000 ? text : `${text}\n\nINFORMACIÓN ADICIONAL\nElige siempre la opción que coincida con tu necesidad real. Una revisión previa de medidas, entorno de uso y contenido ayuda a obtener una mejor experiencia de compra. Furaxis mantiene una comunicación clara para que puedas consultar antes de decidir y recibir exactamente la variante publicada.`;
}

const specs = [];
for (let i = 0; i < source.length; i += 1) {
  const product = source[i];
  const row = byBrowser.get(product.sku);
  if (!row?.ok || !row.category_id) throw new Error(`Missing browser data for ${product.sku}`);
  const title = titleFor(product, row);
  const keywords = commonKeywords(row);
  const pkg = packageFor(product, row);
  const rawPrice = product.development?.price_clp ? product.development.price_clp * 1.8 : row.price * 2;
  const price = roundUp990(rawPrice);
  const imagePath = byImage.get(product.sku) || byImage.get('BG260854NEGMS1');
  if (!imagePath) throw new Error(`Missing image for ${product.sku}`);
  const spec = {
    source_index: i + 1,
    source_row: product.source_row,
    sku: product.sku,
    category_id: row.category_id,
    title,
    description: descriptionFor(product, row, title, pkg, keywords),
    image_path: imagePath,
    upc: product.upc,
    brand: 'Genérica',
    model: title.slice(0, 45),
    price,
    price_source: product.development?.price_clp ? `平台售价CL ${product.development.price_clp} × 1.8，向上取990结尾` : `竞品售价 ${row.price} × 2，向上取990结尾`,
    quantity: 10,
    package: pkg,
    competitor_url: product.competitor_url,
    purchase_url: product.purchase_url,
    competitor_title: row.title,
    top_five_titles: row.top_five_titles || [],
    common_keywords: keywords,
    same_product_group: product.development?.spu || '',
    source_missing_dimensions: !product.development?.length_cm,
    browser_source: row.source
  };
  if (spec.title.length > 60) throw new Error(`Title too long for ${product.sku}: ${spec.title}`);
  if (spec.description.length < 4000) throw new Error(`Description too short for ${product.sku}`);
  const specPath = `.data/store2-spec-${String(i + 1).padStart(3, '0')}.json`;
  await fs.writeFile(specPath, `${JSON.stringify(spec, null, 2)}\n`);
  specs.push({ ...spec, spec_path: specPath, description: undefined });
}

await fs.writeFile('.data/store2-plan.json', `${JSON.stringify(specs, null, 2)}\n`);
console.log(JSON.stringify({
  total: specs.length,
  min_description: Math.min(...source.map((_, i) => JSON.parse(requireText(i)).description.length)),
  max_title: Math.max(...specs.map(s => s.title.length)),
  missing_dimensions: specs.filter(s => s.source_missing_dimensions).map(s => s.sku)
}, null, 2));

function requireText(index) {
  const product = source[index];
  const row = byBrowser.get(product.sku);
  const title = titleFor(product, row);
  const pkg = packageFor(product, row);
  return JSON.stringify({ description: descriptionFor(product, row, title, pkg, commonKeywords(row)) });
}
