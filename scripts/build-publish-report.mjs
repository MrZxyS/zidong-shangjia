import fs from "node:fs/promises";
import path from "node:path";

import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";
import { apiRequest } from "../src/meli.js";

const inputPath = path.resolve(".data", "listing-log.json");
let entries = [];
try {
  entries = JSON.parse(await fs.readFile(inputPath, "utf8"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const firstRecord = JSON.parse(await fs.readFile(".data/NW260684NEGMS1-published.json", "utf8"));
if (!entries.some((entry) => entry.sku === firstRecord.sku)) entries.unshift(firstRecord);

const sourceBook = await SpreadsheetFile.importXlsx(await FileBlob.load("产品信息2.xlsx"));
const sourceRows = sourceBook.worksheets.getItemAt(0).getUsedRange().values.slice(1)
  .filter((row) => String(row[0] || "").trim());
const sourceSkus = new Set(sourceRows.map((row) => String(row[0]).trim()));
const sourceBySku = new Map();
for (const row of sourceRows) {
  const sku = String(row[0]).trim();
  if (!sourceBySku.has(sku)) sourceBySku.set(sku, []);
  sourceBySku.get(sku).push(String(row[4] || "").trim());
}
const conflictingSkus = [...sourceBySku].filter(([, upcs]) => new Set(upcs).size > 1).map(([sku]) => sku);
const byId = new Map();
const recordedSkus = new Map();
for (const entry of entries) {
  if (!sourceSkus.has(entry.sku)) throw new Error(`Unknown source SKU ${entry.sku}`);
  if (recordedSkus.has(entry.sku) && recordedSkus.get(entry.sku) !== entry.id) {
    throw new Error(`SKU ${entry.sku} is logged under two different MLC items`);
  }
  recordedSkus.set(entry.sku, entry.id);
  if (!byId.has(entry.id)) byId.set(entry.id, []);
  byId.get(entry.id).push(entry);
}

const rows = [];
for (const [id, recorded] of byId) {
  const item = await apiRequest(`/items/${id}`);
  const flex = await apiRequest(`/flex/sites/MLC/items/${id}/v2`);
  const description = await apiRequest(`/items/${id}/description`);
  const variants = item.variations?.length ? item.variations.map((variation) => ({
    sku: variation.attributes?.find((a) => a.id === "SELLER_SKU")?.value_name || variation.seller_custom_field,
    price: variation.price ?? item.price
  })) : [{ sku: item.attributes?.find((a) => a.id === "SELLER_SKU")?.value_name, price: item.price }];
  const skus = variants.map((variant) => variant.sku).filter(Boolean);
  if (new Set(skus).size !== skus.length) throw new Error(`Duplicate variant SKU on ${id}`);
  for (const entry of recorded) {
    if (!skus.includes(entry.sku)) throw new Error(`SKU ${entry.sku} is absent from ${id}`);
  }
  for (const variant of variants) {
    if (!sourceSkus.has(variant.sku)) continue;
    if (recordedSkus.has(variant.sku) && recordedSkus.get(variant.sku) !== id) {
      throw new Error(`Variation SKU ${variant.sku} appears under another MLC item`);
    }
    const entry = recorded.find((record) => record.sku === variant.sku) || recorded[0];
    const complete = item.status === "paused" && flex.has_flex === true && (description.plain_text?.length || 0) >= 4000;
    rows.push([
      id, variant.sku, item.title, item.permalink, variant.price, item.status === "paused" ? "已暂停" : item.status,
      flex.has_flex ? "已开启" : "未开启",
      skus.length > 1 ? "是" : "否",
      skus.length > 1 ? skus.filter((sku) => sku !== variant.sku).join(", ") : "",
      entry.created_at ? new Date(new Date(entry.created_at).getTime() + 8 * 3600_000) : null,
      entry.price_source || "开发跟踪表", complete ? "已核实" : "待处理"
    ]);
  }
}
rows.sort((a, b) => a[1].localeCompare(b[1]));

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("上架结果");
sheet.showGridLines = false;
sheet.tabColor = "#164B67";
sheet.getRange("A2").values = [["Furaxis 智利美客多上架结果"]];
sheet.getRange("A2").format.font = { name: "Microsoft YaHei", size: 14, bold: true, color: "#17202A" };
sheet.getRange("A3").values = [[`来源 ${sourceRows.length} 行、${sourceSkus.size} 个唯一 SKU；已创建 ${rows.length} 个，已核实 ${rows.filter((row) => row[11] === "已核实").length} 个。状态从平台实时读取。`]];
sheet.getRange("A3").format.font = { name: "Microsoft YaHei", size: 10, color: "#5B6470" };
if (conflictingSkus.length) {
  sheet.getRange("A4").values = [[`待确认：${conflictingSkus.join(", ")} 在来源表中对应不同 UPC，不可用同一 SKU 重复上架。`]];
  sheet.getRange("A4").format.font = { name: "Microsoft YaHei", size: 10, color: "#A15700" };
}

const headers = ["MLC代码", "SKU", "商品标题", "商品链接", "价格 CLP", "销售状态", "Flex", "多个SKU同链接", "同链接其他SKU", "创建时间 北京", "价格来源", "处理结果"];
sheet.getRange("A5:L5").values = [headers];
sheet.getRange("A5:L5").format = {
  fill: "#164B67",
  font: { name: "Microsoft YaHei", size: 10, bold: true, color: "#FFFFFF" },
  rowHeight: 34, horizontalAlignment: "center", verticalAlignment: "center", wrapText: true
};
if (rows.length) {
  sheet.getRangeByIndexes(5, 0, rows.length, headers.length).values = rows;
  sheet.getRangeByIndexes(5, 0, rows.length, headers.length).format = {
    font: { name: "Microsoft YaHei", size: 10, color: "#17202A" },
    rowHeight: 44, verticalAlignment: "center", wrapText: true
  };
  sheet.getRange(`E6:E${rows.length + 5}`).format.numberFormat = "#,##0";
  sheet.getRange(`J6:J${rows.length + 5}`).format.numberFormat = "yyyy-mm-dd hh:mm";
}
const widths = [20, 26, 65, 88, 18, 18, 14, 22, 42, 27, 20, 16];
for (let index = 0; index < widths.length; index++) {
  sheet.getRangeByIndexes(0, index, rows.length + 6, 1).format.columnWidth = widths[index];
}
sheet.freezePanes.freezeRows(5);
workbook.recalculate();
const check = await workbook.inspect({ kind: "table", range: `上架结果!A5:L${Math.max(6, rows.length + 5)}`, include: "values", tableMaxRows: 5, tableMaxCols: 12 });
console.log(check.ndjson.slice(0, 2500));
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 20 }, maxChars: 1000 });
console.log("formula errors", errors.ndjson.slice(0, 400));
const output = path.resolve("outputs", "Furaxis智利上架结果.xlsx");
await fs.mkdir(path.dirname(output), { recursive: true });
const preview = await workbook.render({ sheetName: "上架结果", range: "A2:H6", scale: 1, format: "png" });
await fs.writeFile(path.resolve(".data", "publish-report-preview.png"), new Uint8Array(await preview.arrayBuffer()));
const file = await SpreadsheetFile.exportXlsx(workbook);
await file.save(output);
console.log(JSON.stringify({ output, sourceRowCount: sourceRows.length, sourceSkuCount: sourceSkus.size, conflictingSkus, createdSkuCount: rows.length, verifiedSkuCount: rows.filter((row) => row[11] === "已核实").length }));
