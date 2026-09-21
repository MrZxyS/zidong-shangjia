import fs from "node:fs/promises";
import path from "node:path";

import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

import { apiRequest } from "../src/meli.js";

const manifest = JSON.parse(await fs.readFile(".data/batch-image-manifest.json", "utf8"));
const skippedReasons = {
  NW260579NEG40: "开发表无精确匹配，缺少可核实包装参数和产品图片；未使用同名其他产品数据",
  NW260579NEG41: "开发表无精确匹配，缺少可核实包装参数和产品图片；未使用同名其他产品数据",
  NW260579NEG42: "开发表无精确匹配，缺少可核实包装参数和产品图片；未使用同名其他产品数据",
  NW260579NEG43: "开发表无精确匹配，缺少可核实包装参数和产品图片；未使用同名其他产品数据",
  NW260579NEG44: "开发表无精确匹配，缺少可核实包装参数和产品图片；未使用同名其他产品数据",
  NW260664PLAMS3: "YXXL 车衣未找到可核实的产品实际长宽；该类目不支持尺码变体，未猜测必填属性"
};

function intendedPrice(entry) {
  if (entry.development?.price_clp) {
    const target = Number(entry.development.price_clp) * 1.8;
    return Math.ceil((target - 990) / 1000) * 1000 + 990;
  }
  if (entry.sku.startsWith("NW260579NEG")) return 82990;
  return null;
}

const rows = [];
for (const entry of manifest) {
  let record = {};
  try { record = JSON.parse(await fs.readFile(`.data/${entry.sku}-published.json`, "utf8")); }
  catch (error) { if (error.code !== "ENOENT") throw error; }
  if (!record.id) {
    rows.push([
      entry.source_index, "", entry.sku, "", "", intendedPrice(entry), "未创建", "未开启", "", "否", "",
      entry.development ? "开发价×1.8，向上取990" : "竞品价×2，向上取990（仅计划价）",
      "异常-未创建", skippedReasons[entry.sku] || record.error || "缺少可核实数据"
    ]);
    continue;
  }
  let item = {};
  let flex = {};
  let description = {};
  let liveError = "";
  try {
    [item, flex, description] = await Promise.all([
      apiRequest(`/items/${record.id}`),
      apiRequest(`/flex/sites/MLC/items/${record.id}/v2`),
      apiRequest(`/items/${record.id}/description`)
    ]);
  } catch (error) {
    liveError = error.message;
  }
  const descriptionLength = description.plain_text?.length || 0;
  const complete = item.status === "paused" && flex.has_flex === true && descriptionLength >= 4000;
  const variantSkus = (item.variations || []).map((variation) => variation.attributes?.find((attribute) => attribute.id === "SELLER_SKU")?.value_name || variation.seller_custom_field).filter(Boolean);
  rows.push([
    entry.source_index, record.id, entry.sku, item.title || record.title || "", item.permalink || record.permalink || "",
    item.price ?? record.price ?? intendedPrice(entry), item.status === "paused" ? "已暂停" : (item.status || "读取失败"),
    flex.has_flex ? "已开启" : "未开启", descriptionLength, variantSkus.length > 1 ? "是" : "否",
    variantSkus.length > 1 ? variantSkus.filter((sku) => sku !== entry.sku).join(", ") : "",
    record.price_source || "开发价×1.8，向上取990", complete ? "已核实" : "异常-已创建",
    complete ? "" : (record.error || liveError || "平台实时核验未通过")
  ]);
}

const verified = rows.filter((row) => row[12] === "已核实").length;
const createdExceptions = rows.filter((row) => row[12] === "异常-已创建").length;
const skipped = rows.filter((row) => row[12] === "异常-未创建").length;
if (rows.length !== 50) throw new Error(`Expected 50 report rows, found ${rows.length}`);

const workbook = Workbook.create();
const summary = workbook.worksheets.add("批次汇总");
summary.showGridLines = false;
summary.getRange("A1:F1").merge();
summary.getRange("A1").values = [["Furaxis 智利美客多前50个SKU处理汇总"]];
summary.getRange("A1:F1").format = { fill: "#173F5F", font: { name: "Microsoft YaHei", size: 16, bold: true, color: "#FFFFFF" }, rowHeight: 34, verticalAlignment: "center" };
summary.getRange("A3:B7").values = [
  ["统计项", "数量"], ["处理SKU", 50], ["完整核实", verified], ["已创建但异常", createdExceptions], ["未创建异常", skipped]
];
summary.getRange("A3:B3").format = { fill: "#20639B", font: { name: "Microsoft YaHei", bold: true, color: "#FFFFFF" }, horizontalAlignment: "center" };
summary.getRange("A4:B7").format = { font: { name: "Microsoft YaHei", size: 11 }, rowHeight: 26 };
summary.getRange("A9:F9").merge();
summary.getRange("A9").values = [["口径：完整核实 = 商品状态已暂停、Flex已开启、描述不少于4000字符；所有状态均在导出前从平台实时读取。"]];
summary.getRange("A9:F9").format = { fill: "#EAF2F8", font: { name: "Microsoft YaHei", size: 10, color: "#34495E" }, wrapText: true, rowHeight: 38 };
summary.getRange("A11:F14").values = [
  ["异常说明", "", "", "", "", ""],
  ["Flex未开启", "平台拒绝激活的商品已保持暂停并记录MLC，不计入完整核实。", "", "", "", ""],
  ["安全鞋5个尺码", "缺少准确包装参数和图片，未用估算数据创建；计划价按竞品40,990×2向上取82,990。", "", "", "", ""],
  ["YXXL车衣", "缺少实际长宽，且类目不支持尺码变体，未创建。", "", "", "", ""]
];
summary.getRange("A11:F11").format = { fill: "#F4B942", font: { name: "Microsoft YaHei", bold: true, color: "#17202A" } };
summary.getRange("A12:F14").format = { font: { name: "Microsoft YaHei", size: 10 }, wrapText: true, rowHeight: 34 };
summary.getRange("A1:A14").format.columnWidth = 28;
summary.getRange("B1:F14").format.columnWidth = 24;
summary.freezePanes.freezeRows(1);

const sheet = workbook.worksheets.add("SKU明细");
sheet.showGridLines = false;
sheet.getRange("A1:N1").merge();
sheet.getRange("A1").values = [["前50个SKU平台实时核验明细"]];
sheet.getRange("A1:N1").format = { fill: "#173F5F", font: { name: "Microsoft YaHei", size: 15, bold: true, color: "#FFFFFF" }, rowHeight: 34, verticalAlignment: "center" };
const headers = ["序号", "MLC代码", "SKU", "商品标题", "商品链接", "价格 CLP", "销售状态", "Flex", "描述字符数", "多个SKU同链接", "同链接其他SKU", "价格来源", "处理结果", "异常/备注"];
sheet.getRange("A3:N3").values = [headers];
sheet.getRange("A3:N3").format = { fill: "#20639B", font: { name: "Microsoft YaHei", size: 10, bold: true, color: "#FFFFFF" }, rowHeight: 36, horizontalAlignment: "center", verticalAlignment: "center", wrapText: true };
sheet.getRangeByIndexes(3, 0, rows.length, headers.length).values = rows;
sheet.getRangeByIndexes(3, 0, rows.length, headers.length).format = { font: { name: "Microsoft YaHei", size: 9, color: "#17202A" }, rowHeight: 42, verticalAlignment: "center", wrapText: true };
for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
  const color = rows[rowIndex][12] === "已核实" ? "#E7F4EA" : (rows[rowIndex][12] === "异常-已创建" ? "#FFF4CC" : "#FDE8E7");
  sheet.getRangeByIndexes(rowIndex + 3, 12, 1, 2).format.fill = color;
}
sheet.getRange(`F4:F${rows.length + 3}`).format.numberFormat = "#,##0";
sheet.getRange(`I4:I${rows.length + 3}`).format.numberFormat = "#,##0";
const widths = [9, 20, 24, 62, 76, 16, 15, 13, 18, 20, 34, 30, 18, 66];
for (let index = 0; index < widths.length; index += 1) sheet.getRangeByIndexes(0, index, rows.length + 4, 1).format.columnWidth = widths[index];
sheet.freezePanes.freezeRows(3);
sheet.freezePanes.freezeColumns(3);
sheet.tables.add(`A3:N${rows.length + 3}`, true, "First50Results").style = "TableStyleMedium2";

workbook.recalculate();
const detailCheck = await workbook.inspect({ kind: "table", range: "SKU明细!A1:N53", include: "values", tableMaxRows: 8, tableMaxCols: 14 });
console.log(detailCheck.ndjson.slice(0, 7000));
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!", options: { useRegex: true, maxResults: 50 }, maxChars: 1000 });
console.log("formula errors", errors.ndjson);
await fs.mkdir("outputs", { recursive: true });
const preview = await workbook.render({ sheetName: "SKU明细", range: "A1:N10", scale: 1, format: "png" });
await fs.writeFile(".data/first-50-report-preview.png", new Uint8Array(await preview.arrayBuffer()));
const outputPath = path.resolve("outputs", "Furaxis智利前50个SKU上架结果.xlsx");
const file = await SpreadsheetFile.exportXlsx(workbook);
await file.save(outputPath);
console.log(JSON.stringify({ outputPath, rows: rows.length, verified, createdExceptions, skipped }));
