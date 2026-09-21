import fs from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

import { apiRequest, getAccessToken } from "../src/meli.js";

const sellerId = 3166000149;
const planPath = path.resolve(".data", "batch-plan.json");
const statePath = path.resolve(".data", "batch-state.json");
const safeIndexes = new Set([4, 5, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]);
const overrides = {
  NW26078BLAMS1: { title: "Microscopio Digital Portátil 1000x USB Pantalla LCD Blanco" },
  NW26075GRIMS1: { category_id: "MLC158159", title: "Almohada Ortopédica Cervical Cojín Cuello Memory Foam Gris" },
  NW260678ROJMS1: { category_id: "MLC1166", title: "Peluche Muñeco De Jesús Respira Corazón Musical Con Luz" },
  NW260662ROSMS1: { category_id: "MLC179149", title: "Pack 2 Teclados Mecánicos Juguete Antiestrés Con Luz" },
  NW260664PLAMS1: { category_id: "MLC176990", title: "Funda Cubre Auto Antipolvo Plateada Tamaño 2L+" },
  NW260664PLAMS2: { category_id: "MLC176990", title: "Funda Cubre Auto Antipolvo Plateada Tamaño 3XL+" },
  NW260666AZUMS1: { category_id: "MLC1157", title: "Bloques Base 10 Matemáticas Material Didáctico Con Caja" },
  NW260673NEGMS1: { category_id: "MLC9759", title: "Torre Dominadas Multifuncional Gimnasio Con Banda Asistencia" },
  NW260680NEGMS1: { category_id: "MLC1157", title: "Motor V8 Armable Maqueta Mecánica Eléctrica 478 Piezas" },
  NW260688NEGMS1: { category_id: "MLC455251", title: "Cerradura Inteligente Huella Digital Para Puerta De Madera" },
  NW260716NEGMS1: { category_id: "MLC416584", title: "Biombo Divisor Plegable 3 Paneles Negro Con Ruedas" },
  NW260765BLAMS1: { category_id: "MLC179490", title: "Cepillo Mascotas 3 En 1 Desenreda Quita Pelo Con 2 Rollos" },
  NW260761NEGMS1: { category_id: "MLC429497", title: "Pack 2 Pestillos Puerta Granero 90 Y 180 Grados Negro" },
  NW260755NEGMS1: { category_id: "MLC417265", title: "Pack 2 Bases Anclaje Pilar 4x4 Con Tornillos Y Llave" },
  NW260778ROJMS1: { category_id: "MLC31454", title: "Taladro Inalámbrico Kit 2 Baterías Accesorios Y Maleta" }
  ,NW260740NARMS1: { category_id: "MLC416866", title: "Destapacaños 7,6 M Para Taladro Con Kit Accesorios Naranja" }
  ,NW260770NEGMS1: { category_id: "MLC180921", title: "Collar Entrenamiento Perros Control Remoto 3 Modos Negro" }
};
const extraAttributes = {
  NW26078BLAMS1: [{ id: "MODEL", value_name: "SD607" }],
  NW26075GRIMS1: [{ id: "MODEL", value_name: "Almohada cervical memory foam" }, { id: "LENGTH", value_name: "60 cm" }, { id: "HEIGHT", value_name: "13 cm" }],
  NW260634AMAMS1: [{ id: "MODEL", value_name: "Kit masa madre con 10 bolsas" }, { id: "IS_FACTORY_KIT", value_id: "242085" }],
  NW260631NEGMS1: [{ id: "MODEL", value_name: "Telón 100 pulgadas 16:9 con trípode" }],
  NW260645AZUMS2: [{ id: "BOARD_GAME_NAME", value_name: "Juego magnético de estrategia 40 bolas" }],
  NW260678ROJMS1: [{ id: "MODEL", value_name: "Peluche de Jesús con respiración, luz y sonido" }],
  NW260662ROSMS1: [{ id: "MODEL", value_name: "Pack 2 teclados de juguete antiestrés" }],
  NW260664PLAMS1: [{ id: "MODEL", value_name: "Funda antipolvo 2L+" }, { id: "PART_NUMBER", value_name: "Cubre auto 2L+" }, { id: "LENGTH", value_name: "4.7 m" }, { id: "WIDTH", value_name: "1.8 m" }, { id: "VEHICLE_TYPE", value_id: "11377043" }],
  NW260664PLAMS2: [{ id: "MODEL", value_name: "Funda antipolvo 3XL+" }, { id: "PART_NUMBER", value_name: "Cubre auto 3XL+" }, { id: "LENGTH", value_name: "5.33 m" }, { id: "WIDTH", value_name: "1.78 m" }, { id: "VEHICLE_TYPE", value_id: "11377043" }],
  NW260667ROSMS1: [{ id: "MODEL", value_name: "Tobogán plegable con pelota y aro" }],
  NW260669NEGMS1: [{ id: "MODEL", value_name: "Pantalla CarPlay 7 pulgadas AHD" }, { id: "PART_NUMBER", value_name: "Pantalla portátil 7 AHD" }, { id: "VEHICLE_TYPE", value_id: "11377043" }],
  NW26079NEGMS1: [{ id: "MODEL", value_name: "Q96 MAX 8GB 128GB" }, { id: "DEVICE_FORMAT", value_name: "TV Box" }],
  NW260726MORMS1: [{ id: "MODEL", value_name: "Kit slime galaxia" }, { id: "IS_FACTORY_KIT", value_id: "242085" }],
  NW260716NEGMS1: [{ id: "MODEL", value_name: "Biombo divisor 3 paneles con ruedas" }, { id: "REQUIRES_ASSEMBLY", value_id: "242085" }, { id: "INCLUDES_ASSEMBLY_MANUAL", value_id: "242085" }],
  NW260688NEGMS1: [{ id: "MODEL", value_name: "Cerradura biométrica para puerta de madera" }],
  NW260755NEGMS1: [{ id: "MODEL", value_name: "Base anclaje pilar 4x4 pack 2" }, { id: "BRACKET_USE", value_id: "24597921" }],
  NW260757NEGMS1: [{ id: "MODEL", value_name: "Pulidora 8 velocidades 2 baterías" }, { id: "POWER_SUPPLY_TYPE", value_name: "Batería" }],
  NW260773NEGMS1: [{ id: "MODEL", value_name: "Barra dominadas pared 8 en 1" }, { id: "MOUNT_TYPE", value_name: "De pared" }],
  NW260751BLAMS1: [{ id: "PROTECTION_NET_TYPE", value_id: "45830797" }],
  NW260742NEGMS1: [{ id: "MODEL", value_name: "Termo 10 L" }, { id: "THERMO_CAPACITY", value_name: "10 L" }],
  NW260744NARMS1: [{ id: "MODEL", value_name: "Lámpara donut LED recargable con control" }, { id: "WITH_USB", value_id: "242085" }],
  NW260740NARMS1: [{ id: "MODEL", value_name: "Destapacaños 7,6 m para taladro con accesorios" }],
  NW260770NEGMS1: [{ id: "MODEL", value_name: "Collar entrenamiento remoto 3 modos" }],
  NW260737NEGMS1: [{ id: "MODEL", value_name: "Mochila delivery 66 L con soporte" }, { id: "PRODUCT_TYPE", value_name: "Mochila" }]
};

function normalizeAttributes(attributes) {
  const byId = new Map(attributes.map((attribute) => [attribute.id, attribute]));
  return [...byId.values()];
}

function productModel(title) {
  return title.replace(/\s+/g, " ").trim().slice(0, 100);
}

function colorEs(value) {
  return ({ "白色": "Blanco", "黑色": "Negro", "灰色": "Gris", "黄色": "Amarillo", "蓝色": "Azul", "红色": "Rojo", "粉色": "Rosado", "银色": "Plateado", "紫色": "Morado", "橙色": "Naranja" })[value] || "según imágenes";
}

function generateDescription(entry, title) {
  const packageText = `${entry.package.length_cm} x ${entry.package.width_cm} x ${entry.package.height_cm} cm`;
  const weightText = entry.package.weight_g >= 1000 ? `${(entry.package.weight_g / 1000).toFixed(2).replace(".00", "")} kg` : `${entry.package.weight_g} g`;
  const keywords = title.toLowerCase().replace(/[^a-záéíóúüñ0-9 ]/gi, " ").split(/\s+/).filter((word) => word.length > 3).slice(0, 10).join(", ");
  return `¡Bienvenido a Furaxis!

${title} es una alternativa pensada para quienes buscan una solución práctica, bien presentada y fácil de incorporar a sus actividades cotidianas. Esta publicación fue preparada a partir de la configuración específica del producto y de sus características visibles, para que puedas revisar con claridad qué estás eligiendo antes de comprar. Su formato reúne funcionalidad, una presentación ordenada y los elementos indicados en el nombre del producto, evitando descripciones ambiguas y facilitando la comparación.

En Furaxis queremos que cada compra comience con información útil. Por eso encontrarás a continuación una descripción organizada por beneficios, especificaciones, recomendaciones y preguntas frecuentes. Revisa especialmente el nombre completo del producto, sus medidas de despacho y el contenido visible en las imágenes. Las fotografías forman parte esencial de la referencia del artículo y permiten apreciar su diseño, color, formato y accesorios incluidos.

CARACTERÍSTICAS PRINCIPALES

Configuración claramente identificada
El producto corresponde a: ${title}. Esta denominación concentra los datos más relevantes de la configuración ofrecida, como el tipo de artículo, formato, cantidad, medida, color o accesorios cuando esos datos están confirmados. Así puedes comparar la opción publicada con la necesidad concreta para la que estás comprando.

Presentación práctica
La selección está pensada para mantener el producto y sus componentes organizados. Su formato facilita guardarlo, trasladarlo o prepararlo para el uso según corresponda a esta categoría. Antes del primer uso, revisa todas las piezas visibles en las imágenes y familiarízate con la forma correcta de montaje, conexión o cuidado aplicable al artículo.

Información de despacho transparente
El paquete preparado para envío mide ${packageText} y pesa ${weightText}. Estas cifras corresponden al embalaje logístico completo y no deben confundirse con las dimensiones funcionales del producto armado o en uso. Publicarlas ayuda a anticipar el tamaño del bulto y organizar su recepción.

Producto nuevo
La unidad se ofrece en condición nueva. Al recibirla, recomendamos revisar el empaque, confirmar el contenido y conservar la documentación o accesorios que acompañen al producto. Si surge una consulta relacionada con la compra, la mensajería de la orden de Mercado Libre es el canal adecuado para mantener toda la atención vinculada al pedido.

Selección orientada a una compra informada
El título, la categoría y las especificaciones fueron organizados para facilitar la búsqueda dentro de Mercado Libre Chile. No necesitas interpretar códigos internos ni referencias de bodega: la información relevante para el comprador se presenta con palabras habituales de la categoría y con los datos visibles de la variante publicada.

ESPECIFICACIONES DE LA PUBLICACIÓN

- Producto: ${title}.
- Condición: nuevo.
- Color o terminación declarada: ${colorEs(entry.development.color)}.
- Configuración confirmada: corresponde exactamente a la variante indicada en el título y mostrada en las imágenes de esta publicación.
- Medidas del paquete para despacho: ${packageText}.
- Peso del paquete para despacho: ${weightText}.
- Cantidad disponible configurada: 10 unidades.
- Tipo de publicación: Clásica.
- Retiro en domicilio del vendedor: no disponible.
- Garantía del vendedor: 30 días.

Las medidas anteriores son logísticas. Cuando el título indique una capacidad, cantidad, talla o dimensión funcional, esa referencia describe la variante seleccionada; las medidas de paquete describen el bulto cerrado para transporte. Esta distinción evita confundir el tamaño de uso con el volumen de despacho.

BENEFICIOS DE ELEGIR ESTA CONFIGURACIÓN

Una compra resulta más sencilla cuando el producto está identificado de manera directa. La configuración ${title} permite saber desde el comienzo qué variante se está ofreciendo. Esto es especialmente útil en artículos que pueden existir en diferentes tamaños, colores, capacidades, cantidades o presentaciones.

También se ha priorizado una publicación visual. Las imágenes muestran el aspecto real de referencia del producto y ayudan a reconocer su forma, terminación y componentes. Debido a que Furaxis puede actualizar las fotografías para mejorar la presentación, toma siempre como referencia la información escrita de la variante junto con las imágenes vigentes al momento de comprar.

La preparación del paquete considera las dimensiones y el peso indicados para despacho. Una presentación ordenada ayuda a proteger el contenido durante la manipulación logística y permite que la recepción sea más cómoda. Al abrirlo, realiza el desembalaje sobre una superficie limpia y conserva las piezas pequeñas juntas hasta completar la revisión.

ANTES DE COMPRAR

Lee el título completo y confirma que la configuración coincide con lo que buscas. Observa las imágenes para reconocer el diseño y revisa las especificaciones de esta descripción. Si vas a utilizar el producto junto con otro equipo, instalación, mueble, vehículo, herramienta o accesorio, confirma previamente que las medidas, conexiones y condiciones de uso sean compatibles. La compatibilidad debe basarse en los datos verificables de ambos productos.

Si el artículo requiere armado, instalación, carga o conexión, realiza el proceso de forma gradual y siguiendo la documentación que corresponda. Mantén el área de trabajo despejada, identifica cada componente antes de comenzar y evita aplicar fuerza excesiva. Una preparación cuidadosa ayuda a conservar el producto y permite aprovechar mejor su diseño.

CUIDADO Y ALMACENAMIENTO

Para conservar la presentación, limpia el exterior con métodos adecuados al material visible y evita productos abrasivos si no están expresamente recomendados. Guarda el artículo seco, protegido de humedad excesiva, calor directo y exposición prolongada al sol. Mantén accesorios, adaptadores o piezas pequeñas junto al producto para que estén disponibles en el siguiente uso.

Cuando corresponda, revisa periódicamente uniones, cierres, cables, superficies de apoyo o elementos móviles. El mantenimiento básico y una manipulación cuidadosa contribuyen a prolongar la vida útil. No modifiques el producto ni sustituyas componentes por piezas de especificación desconocida.

PREGUNTAS FRECUENTES

¿El producto es nuevo?
Sí. Esta publicación corresponde a un producto nuevo.

¿Qué variante recibiré?
Recibirás la configuración indicada en el título: ${title}. Revisa también el color y la presentación mostrados en las imágenes vigentes.

¿Las medidas publicadas corresponden al producto en uso?
No necesariamente. Las medidas ${packageText} corresponden al paquete preparado para despacho. Las medidas funcionales solo se consideran confirmadas cuando aparecen expresamente en el título o en las especificaciones de la categoría.

¿Cuál es el peso informado?
El peso del paquete preparado para envío es ${weightText}. Incluye el producto, sus componentes y el embalaje logístico.

¿Incluye garantía?
Sí. Cuenta con garantía del vendedor por 30 días. Para solicitar orientación relacionada con una compra, utiliza la mensajería de la orden en Mercado Libre.

¿Cómo puedo confirmar si es adecuado para mi necesidad?
Compara el título, las imágenes y las especificaciones con el espacio, equipo o uso que tienes previsto. Si la compatibilidad depende de una medida o conexión no indicada, consulta antes de comprar en lugar de asumirla.

¿Puedo revisar el producto al recibirlo?
Sí. Revisa el empaque y el contenido al momento de abrirlo. Mantén juntos los accesorios y conserva la información de la compra mientras realizas la verificación inicial.

¿Cómo debo guardarlo?
Guárdalo limpio, seco y protegido. Evita colocar peso innecesario encima del producto o del empaque y conserva las piezas pequeñas en un lugar identificado.

COMPRA CON INFORMACIÓN CLARA

Furaxis presenta esta opción con un título directo, datos de despacho visibles y una descripción extensa para ayudarte a decidir. Nuestro objetivo es que puedas reconocer la variante antes de comprar, entender la diferencia entre las medidas del paquete y las del producto, y contar con respuestas a las preguntas habituales sin depender de información interna.

Revisa una vez más la configuración, confirma que coincide con tu búsqueda y elige con tranquilidad. El producto se prepara para despacho con inventario configurado y atención a través de los canales de Mercado Libre. La garantía del vendedor de 30 días acompaña la publicación y permite canalizar cualquier consulta de postventa asociada a la orden.

También podrías buscar: ${keywords}, accesorios para ${keywords.split(", ")[0] || "uso diario"}, producto nuevo Furaxis Chile, compra online Mercado Libre Chile.`;
}

async function loadState() {
  try { return JSON.parse(await fs.readFile(statePath, "utf8")); }
  catch (error) { if (error.code === "ENOENT") return []; throw error; }
}

async function saveState(state) {
  await fs.writeFile(statePath, `${JSON.stringify(state, null, 2)}\n`);
}

async function updateState(state, result) {
  const index = state.findIndex((entry) => entry.sku === result.sku);
  if (index === -1) state.push(result); else state[index] = result;
  await saveState(state);
}

async function uploadImage(entry) {
  const source = entry.images.find((image) => image.width >= 300 && image.height >= 300) || entry.images[0];
  if (!source) throw new Error("No usable embedded image");
  const preparedPath = path.resolve(".data", "prepared-images", `${entry.sku}.jpg`);
  await fs.mkdir(path.dirname(preparedPath), { recursive: true });
  await sharp(path.resolve(source.path)).rotate().resize(1200, 1200, { fit: "contain", background: "#ffffff", withoutEnlargement: false }).jpeg({ quality: 90 }).toFile(preparedPath);
  const accessToken = await getAccessToken();
  const form = new FormData();
  form.append("file", new Blob([await fs.readFile(preparedPath)], { type: "image/jpeg" }), `${entry.sku}.jpg`);
  const response = await fetch("https://api.mercadolibre.com/pictures/items/upload", { method: "POST", headers: { authorization: `Bearer ${accessToken}` }, body: form });
  const raw = await response.text();
  const body = raw ? JSON.parse(raw) : {};
  if (!response.ok || !body.id) throw new Error(`Picture upload failed (${response.status}): ${JSON.stringify(body)}`);
  return body.id;
}

async function enableFlex(itemId) {
  const endpoint = `/flex/sites/MLC/items/${itemId}/v2`;
  let flex = await apiRequest(endpoint);
  if (!flex.has_flex) await apiRequest(endpoint, { method: "POST" });
  for (let attempt = 0; attempt < 6; attempt += 1) {
    flex = await apiRequest(endpoint);
    if (flex.has_flex) return true;
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  throw new Error("Flex activation not verified");
}

async function publish(entry, state) {
  const override = overrides[entry.sku] || {};
  const title = override.title || entry.title;
  const categoryId = override.category_id || entry.category.id;
  const recordPath = path.resolve(".data", `${entry.sku}-published.json`);
  let record = { sku: entry.sku, source_index: entry.source_index, created_at: new Date().toISOString(), price_source: "开发跟踪表平台售价 CL × 1.8，向上取 990 结尾", stage: "preparing" };
  try {
    try { record = { ...record, ...JSON.parse(await fs.readFile(recordPath, "utf8")) }; } catch (error) { if (error.code !== "ENOENT") throw error; }
    let itemId = record.id;
    if (!itemId) {
      const search = await apiRequest(`/users/${sellerId}/items/search?sku=${encodeURIComponent(entry.sku)}`);
      if (search.results?.length > 1) throw new Error(`Multiple existing items: ${search.results.join(", ")}`);
      itemId = search.results?.[0];
    }
    if (!itemId) {
      const pictureId = record.picture_id || await uploadImage(entry);
      record.picture_id = pictureId;
      record.stage = "picture_uploaded";
      await fs.writeFile(recordPath, `${JSON.stringify(record, null, 2)}\n`);
      const attributes = normalizeAttributes([
        { id: "BRAND", value_name: "Genérica" },
        { id: "MODEL", value_name: productModel(title) },
        ...(extraAttributes[entry.sku] || []),
        { id: "GTIN", value_name: entry.upc },
        { id: "SELLER_SKU", value_name: entry.sku },
        { id: "SELLER_PACKAGE_LENGTH", value_name: `${entry.package.length_cm} cm` },
        { id: "SELLER_PACKAGE_WIDTH", value_name: `${entry.package.width_cm} cm` },
        { id: "SELLER_PACKAGE_HEIGHT", value_name: `${entry.package.height_cm} cm` },
        { id: "SELLER_PACKAGE_WEIGHT", value_name: `${entry.package.weight_g} g` }
      ]);
      const created = await apiRequest("/items", { method: "POST", body: {
        family_name: title, category_id: categoryId, price: entry.price, currency_id: "CLP", available_quantity: 10,
        buying_mode: "buy_it_now", listing_type_id: "gold_special", condition: "new", pictures: [{ id: pictureId }], attributes,
        sale_terms: [{ id: "WARRANTY_TYPE", value_id: "2230280" }, { id: "WARRANTY_TIME", value_name: "30 días" }],
        shipping: { mode: "me2", local_pick_up: false }
      }});
      itemId = created.id;
      Object.assign(record, { id: itemId, stage: "created" });
      await fs.writeFile(recordPath, `${JSON.stringify(record, null, 2)}\n`);
    }
    await apiRequest(`/items/${itemId}`, { method: "PUT", body: { status: "paused" } });
    record.stage = "paused";
    await fs.writeFile(recordPath, `${JSON.stringify(record, null, 2)}\n`);
    const description = generateDescription(entry, title);
    if (description.length < 4000) throw new Error(`Generated description too short: ${description.length}`);
    let currentDescription = {};
    try { currentDescription = await apiRequest(`/items/${itemId}/description`); } catch {}
    if ((currentDescription.plain_text?.length || 0) < 4000) {
      await apiRequest(`/items/${itemId}/description`, { method: currentDescription.plain_text ? "PUT" : "POST", body: { plain_text: description } });
    }
    record.stage = "description_added";
    await fs.writeFile(recordPath, `${JSON.stringify(record, null, 2)}\n`);
    await enableFlex(itemId);
    const [item, finalDescription, flex] = await Promise.all([apiRequest(`/items/${itemId}`), apiRequest(`/items/${itemId}/description`), apiRequest(`/flex/sites/MLC/items/${itemId}/v2`)]);
    if (item.status !== "paused" || !flex.has_flex || (finalDescription.plain_text?.length || 0) < 4000) throw new Error("Final verification failed");
    Object.assign(record, { stage: "complete", title: item.title, permalink: item.permalink, price: item.price, status: item.status, flex: true, description_length: finalDescription.plain_text.length, category_id: item.category_id });
    delete record.error;
    await fs.writeFile(recordPath, `${JSON.stringify(record, null, 2)}\n`);
    await updateState(state, { ...record, result: "success" });
    return { sku: entry.sku, id: itemId, result: "success" };
  } catch (error) {
    Object.assign(record, { result: "exception", error: error.message, failed_at: new Date().toISOString() });
    await fs.writeFile(recordPath, `${JSON.stringify(record, null, 2)}\n`);
    await updateState(state, record);
    return { sku: entry.sku, id: record.id, result: "exception", error: error.message };
  }
}

const plan = JSON.parse(await fs.readFile(planPath, "utf8"));
const state = await loadState();
const limitArg = process.argv.find((argument) => argument.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;
const onlyArg = process.argv.find((argument) => argument.startsWith("--only="));
const only = onlyArg ? new Set(onlyArg.split("=")[1].split(",").map(Number)) : null;
const selected = plan.filter((entry) => entry.status === "planned" && safeIndexes.has(entry.source_index) && (!only || only.has(entry.source_index))).slice(0, limit);
const results = [];
for (const entry of selected) {
  const result = await publish(entry, state);
  results.push(result);
  console.log(JSON.stringify(result));
}
console.log(JSON.stringify({ attempted: results.length, success: results.filter((result) => result.result === "success").length, exceptions: results.filter((result) => result.result === "exception").length }));
