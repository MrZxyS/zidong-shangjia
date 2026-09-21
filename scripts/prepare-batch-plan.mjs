import fs from "node:fs/promises";

import { apiRequest } from "../src/meli.js";

const titles = {
  NW26078BLAMS1: "Microscopio Digital Portátil Para Niños Con Pantalla LCD",
  NW26075GRIMS1: "Almohada Cervical Ortopédica Memory Foam Gris Con Funda",
  NW260634AMAMS1: "Kit Masa Madre Para Hornear Pan Con Accesorios Y 10 Bolsas",
  NW260631NEGMS1: "Telón Proyector 100 Pulgadas 16:9 Con Trípode Y Bolsa",
  NW260645AZUMS2: "Juego Magnético De Estrategia 40 Bolas Con Cuerda",
  NW260678ROJMS1: "Peluche Muñeco Respira Con Corazón Musical Y Luz Rojo",
  NW260664PLAMS1: "Cubierta Funda Auto Antipolvo Plateada Tamaño 2L+",
  NW260664PLAMS2: "Cubierta Funda Auto Antipolvo Plateada Tamaño 3XL+",
  NW260664PLAMS3: "Cubierta Funda Auto Antipolvo Plateada Tamaño YXXL",
  NW260667ROSMS1: "Tobogán Infantil Plegable Rosado Con Pelota Y Aro",
  NW260669NEGMS1: "Pantalla Carplay Portátil 7 Pulgadas Con Cámara AHD",
  NW260671AMAMS1: "Alfombra Rectangular 200x240 Cm Camel Living Dormitorio",
  NW260666AZUMS1: "Material Didáctico Base 10 Bloques Decimales Con Caja",
  NW260672AZUMS1: "Pack 4 Cubos Squishy Antiestrés Marmoleados",
  NW260659ROSMS1: "Squishy Panecillo Sorpresa Con Luz Diseño Aleatorio",
  NW260662ROSMS1: "Pack 2 Mini Teclados Mecánicos Antiestrés Con Luz",
  NW260673NEGMS1: "Torre Barra Dominadas Multifuncional Con Banda Asistencia",
  NW260658NEGMS1: "Grifo Monomando Cocina Negro Flexible Manguera 70 Cm",
  NW260674NARMS1: "Laminadora Manual En Frío 650 Mm LBS650 Naranja",
  NW260688NEGMS1: "Cerradura Inteligente Huella Digital Para Puerta De Madera",
  NW260680NEGMS1: "Motor V8 Eléctrico Armable Maqueta Mecánica Colección",
  NW260722BLAMS1: "Juego Bloques Construcción Magnéticos Tubos 97 Piezas",
  NW260716NEGMS1: "Biombo Separador Plegable Negro 3 Paneles Con Ruedas",
  NW26079NEGMS1: "TV Box Q96 Max 4K 8GB 128GB Con Control Remoto",
  NW260713GRIMS1: "Contenedor Plegable Alimentos Mascotas 15 Kg Con Ruedas",
  NW260726MORMS1: "Kit Slime Galaxia Para Niños Con Accesorios",
  NW260735AMAMS1: "Set Comida Juguete 95 Piezas Con Caja Hamburguesa",
  NW260765BLAMS1: "Cepillo Mascotas 3 En 1 Doble Diente Con 2 Rollos",
  NW260767BLAMS1: "Masajeador De Manos Compresión Aire Y Calor Blanco",
  NW260755NEGMS1: "Pack 2 Bases Anclaje Pilar 4x4 Con Tornillos Y Llave",
  NW260757NEGMS1: "Pulidora Inalámbrica 8 Velocidades 2 Baterías 16 Discos",
  NW260761NEGMS1: "Pack 2 Cerraduras Puerta Granero 90 Y 180 Grados Negro",
  NW260751BLAMS1: "Malla Seguridad Balcón Ventanas 8x2,3 M Con Accesorios",
  NW260773NEGMS1: "Barra Dominadas Pared Multifuncional 8 En 1 Negra",
  NW260778ROJMS1: "Taladro Destornillador Inalámbrico Kit 2 Baterías Maleta",
  NW260742NEGMS1: "Termo Acero Inoxidable 10 L Para Café Y Agua Caliente",
  NW260744NARMS1: "Lámpara Donut LED Naranja Recargable Touch Con Control",
  NW260732BLAMS1: "Kit Starter RFID Compatible Arduino Con Caja Plástica",
  NW260575PLAMS1: "Destapador Inodoro Acero Inoxidable Con Mango",
  NW260740NARMS1: "Destapacaños 7,6 M Para Taladro Con Accesorios Naranja",
  NW260737NEGMS1: "Mochila Delivery Térmica Impermeable 66 L Con Soporte"
  ,NW260770NEGMS1: "Collar Entrenamiento Perros Control Remoto 3 Modos Negro"
};

const exceptions = {
  NW260579NEG40: "开发表无精确 SKU，缺少可核实价格、包装参数和内嵌图片；不可套用同名其他产品数据",
  NW260579NEG41: "开发表无精确 SKU，缺少可核实价格、包装参数和内嵌图片；不可套用同名其他产品数据",
  NW260579NEG42: "开发表无精确 SKU，缺少可核实价格、包装参数和内嵌图片；不可套用同名其他产品数据",
  NW260579NEG43: "开发表无精确 SKU，缺少可核实价格、包装参数和内嵌图片；不可套用同名其他产品数据",
  NW260579NEG44: "开发表无精确 SKU，缺少可核实价格、包装参数和内嵌图片；不可套用同名其他产品数据",
};

function roundPrice(value) {
  const target = Number(value) * 1.8;
  return Math.ceil((target - 990) / 1000) * 1000 + 990;
}

function ceilPositive(value) {
  return Number.isFinite(Number(value)) ? Math.ceil(Number(value)) : null;
}

const manifest = JSON.parse(await fs.readFile(".data/batch-image-manifest.json", "utf8"));
const existing = new Map();
for (const entry of manifest) {
  try {
    const record = JSON.parse(await fs.readFile(`.data/${entry.sku}-published.json`, "utf8"));
    existing.set(entry.sku, record);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

const plan = [];
for (const entry of manifest) {
  const base = {
    source_index: entry.source_index,
    sku: entry.sku,
    upc: entry.upc,
    competitor_url: entry.competitor_url,
    purchase_url: entry.purchase_url,
    source_spec: entry.source_spec,
    images: entry.images,
    title: titles[entry.sku] || existing.get(entry.sku)?.title || null,
    status: "planned"
  };
  if (existing.get(entry.sku)?.id && (existing.get(entry.sku)?.stage === "complete" || entry.source_index === 1)) {
    plan.push({ ...base, status: "published", record: existing.get(entry.sku) });
    continue;
  }
  if (exceptions[entry.sku]) {
    plan.push({ ...base, status: "exception", error: exceptions[entry.sku] });
    continue;
  }
  if (!entry.development || !entry.images?.length || !base.title) {
    plan.push({ ...base, status: "exception", error: "缺少准确开发表记录、图片或标题" });
    continue;
  }
  const discovery = await apiRequest(`/sites/MLC/domain_discovery/search?q=${encodeURIComponent(base.title)}`);
  const category = discovery[0];
  if (!category?.category_id) {
    plan.push({ ...base, status: "exception", error: "官方类目预测未返回结果" });
    continue;
  }
  const attributes = await apiRequest(`/categories/${category.category_id}/attributes`);
  const requiredAttributes = attributes
    .filter((attribute) => attribute.tags?.required || attribute.tags?.catalog_required)
    .map((attribute) => ({
      id: attribute.id,
      name: attribute.name,
      value_type: attribute.value_type,
      values: attribute.values?.slice(0, 30) || []
    }));
  plan.push({
    ...base,
    development: entry.development,
    price: roundPrice(entry.development.price_clp),
    package: {
      length_cm: ceilPositive(entry.development.length_cm),
      width_cm: ceilPositive(entry.development.width_cm),
      height_cm: ceilPositive(entry.development.height_cm),
      weight_g: ceilPositive(Number(entry.development.weight_kg) * 1000)
    },
    category: {
      id: category.category_id,
      name: category.category_name,
      domain_id: category.domain_id,
      domain_name: category.domain_name
    },
    required_attributes: requiredAttributes
  });
}

await fs.writeFile(".data/batch-plan.json", `${JSON.stringify(plan, null, 2)}\n`);
console.log(JSON.stringify({
  rows: plan.length,
  published: plan.filter((entry) => entry.status === "published").length,
  planned: plan.filter((entry) => entry.status === "planned").length,
  exceptions: plan.filter((entry) => entry.status === "exception").length,
  categories: [...new Set(plan.filter((entry) => entry.category).map((entry) => `${entry.category.id}:${entry.category.name}`))]
}, null, 2));
