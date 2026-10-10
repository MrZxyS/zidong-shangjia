import fs from "node:fs/promises";
import path from "node:path";

import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const auditPath = path.resolve(".data/store2-final-audit.json");
const audit = JSON.parse(await fs.readFile(auditPath, "utf8"));
const records = [...audit.rows].sort((a, b) => a.source_index - b.source_index);

if (records.length !== 81) throw new Error(`Expected 81 rows, found ${records.length}`);

const groupCounts = new Map();
for (const row of records) {
  groupCounts.set(row.same_product_group, (groupCounts.get(row.same_product_group) || 0) + 1);
}

const exceptionNotes = {
  BG260632NEGMS1: "已上架；平台返回 shipping.mode=not_specified，重试 Mercado Envíos 后未生效，因此无法启用 Flex。",
  BG260720ROJMS1: "已上架；平台未向该商品开放 Mercado Envíos 能力，因此无法启用 Flex。",
  BG260720NEGMS2: "已上架；平台未向该商品开放 Mercado Envíos 能力，因此无法启用 Flex。",
};

const detailRows = records.map((row, index) => {
  const groupCount = groupCounts.get(row.same_product_group) || 1;
  const groupNote = groupCount > 1
    ? `同组 ${groupCount} 个 SKU（${row.same_product_group}）；本批次为独立 MLC 链接`
    : "单 SKU 独立链接";
  const dimensionNote = row.source_missing_dimensions
    ? "源表无尺寸；包装参数参考竞品：23×14×10 cm，640 g"
    : "源表已提供包装参数";
  const complete = row.audit_result === "success";
  return [
    index + 1,
    row.id,
    row.sku,
    row.title,
    row.price,
    row.category_id,
    row.permalink,
    row.status === "paused" ? "已上架并暂停" : row.status,
    row.shipping_mode === "me2" ? "已开启 (me2)" : "平台未开放",
    row.flex ? "已开启" : "未开启（平台限制）",
    row.description_length,
    groupNote,
    dimensionNote,
    row.price_source,
    complete ? "已上架并完整通过" : "已上架，物流/Flex异常",
    complete ? "" : (exceptionNotes[row.sku] || row.audit_error || "平台终检未完整通过"),
  ];
});

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("上架结果");
sheet.showGridLines = false;

sheet.getRange("A1:P1").merge();
sheet.getRange("A1").values = [["Furaxis 店铺二 Mercado Libre 智利站上架结果"]];
sheet.getRange("A1:P1").format = {
  fill: "#173F5F",
  font: { name: "Microsoft YaHei", size: 17, bold: true, color: "#FFFFFF" },
  rowHeight: 36,
  verticalAlignment: "center",
};

sheet.getRange("A3:P3").values = [[
  "总 SKU", 81, "完整通过", 78, "物流/Flex 异常", 3, "已生成 MLC", 81,
  "暂停商品", 81, "描述≥4000字符", 81, "报表日期", "2026-09-22", "店铺", "FURAXIS_CL",
]];
for (const col of [0, 2, 4, 6, 8, 10, 12, 14]) {
  sheet.getRangeByIndexes(2, col, 1, 1).format = {
    fill: "#20639B",
    font: { name: "Microsoft YaHei", size: 10, bold: true, color: "#FFFFFF" },
    horizontalAlignment: "center",
    verticalAlignment: "center",
  };
  sheet.getRangeByIndexes(2, col + 1, 1, 1).format = {
    fill: "#EAF2F8",
    font: { name: "Microsoft YaHei", size: 11, bold: true, color: "#173F5F" },
    horizontalAlignment: "center",
    verticalAlignment: "center",
  };
}
sheet.getRange("A3:P3").format.rowHeight = 30;

sheet.getRange("A5:P5").merge();
sheet.getRange("A5").values = [["结果口径：“完整通过”表示商品已创建并暂停、Mercado Envíos 为 me2、Flex 已开启、描述不少于 4000 字符。所有 81 个 SKU 均已取得 MLC 代码。"]];
sheet.getRange("A5:P5").format = {
  fill: "#EAF2F8",
  font: { name: "Microsoft YaHei", size: 10, color: "#34495E" },
  rowHeight: 34,
  verticalAlignment: "center",
  wrapText: true,
};

sheet.getRange("A6:P6").merge();
sheet.getRange("A6").values = [["注意：3 条异常均已成功上架并保持暂停，仅因 Mercado Libre 平台未开放或未应用 Mercado Envíos，导致 Flex 无法启用；不属于“未上架”。"]];
sheet.getRange("A6:P6").format = {
  fill: "#FFF1F0",
  font: { name: "Microsoft YaHei", size: 10, bold: true, color: "#A61B1B" },
  rowHeight: 34,
  verticalAlignment: "center",
  wrapText: true,
};

const headers = [
  "序号", "MLC代码", "SKU", "商品标题", "价格 CLP", "类目ID", "商品链接", "销售状态",
  "Mercado Envíos", "Flex", "描述字符数", "多SKU同链接/同组说明", "尺寸来源", "价格来源", "处理结果", "异常说明",
];
sheet.getRange("A9:P9").values = [headers];
sheet.getRange("A9:P9").format = {
  fill: "#20639B",
  font: { name: "Microsoft YaHei", size: 10, bold: true, color: "#FFFFFF" },
  rowHeight: 40,
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: true,
};

sheet.getRangeByIndexes(9, 0, detailRows.length, headers.length).values = detailRows;
sheet.getRangeByIndexes(9, 0, detailRows.length, headers.length).format = {
  font: { name: "Microsoft YaHei", size: 9, color: "#17202A" },
  rowHeight: 46,
  verticalAlignment: "center",
  wrapText: true,
};

for (let rowIndex = 0; rowIndex < detailRows.length; rowIndex += 1) {
  const sheetRow = rowIndex + 9;
  const record = records[rowIndex];
  if (record.audit_result !== "success") {
    sheet.getRangeByIndexes(sheetRow, 0, 1, headers.length).format.fill = "#FDE8E7";
    sheet.getRangeByIndexes(sheetRow, 14, 1, 2).format.font = { name: "Microsoft YaHei", size: 9, bold: true, color: "#A61B1B" };
  } else if (record.source_missing_dimensions) {
    sheet.getRangeByIndexes(sheetRow, 12, 1, 1).format.fill = "#FFF4CC";
    sheet.getRangeByIndexes(sheetRow, 12, 1, 1).format.font = { name: "Microsoft YaHei", size: 9, bold: true, color: "#7A4E00" };
  }
}

const widths = [7, 19, 22, 54, 14, 15, 66, 17, 20, 20, 16, 35, 42, 39, 28, 68];
for (let col = 0; col < widths.length; col += 1) {
  sheet.getRangeByIndexes(0, col, detailRows.length + 10, 1).format.columnWidth = widths[col];
}
sheet.getRange(`E10:E${detailRows.length + 9}`).format.numberFormat = "#,##0";
sheet.getRange(`K10:K${detailRows.length + 9}`).format.numberFormat = "#,##0";
sheet.getRange(`A10:A${detailRows.length + 9}`).format.horizontalAlignment = "center";
sheet.getRange(`E10:F${detailRows.length + 9}`).format.horizontalAlignment = "center";
sheet.getRange(`H10:K${detailRows.length + 9}`).format.horizontalAlignment = "center";
sheet.getRange(`O10:O${detailRows.length + 9}`).format.horizontalAlignment = "center";

sheet.tables.add(`A9:P${detailRows.length + 9}`, true, "Store2ListingResults").style = "TableStyleMedium2";
sheet.freezePanes.freezeRows(9);
sheet.freezePanes.freezeColumns(2);

workbook.recalculate();

const summaryCheck = await workbook.inspect({
  kind: "table",
  range: "上架结果!A1:P12",
  include: "values,formulas",
  tableMaxRows: 12,
  tableMaxCols: 16,
});
console.log(summaryCheck.ndjson);

const exceptionCheck = await workbook.inspect({
  kind: "match",
  searchTerm: "已上架，物流/Flex异常",
  options: { useRegex: false, maxResults: 10 },
  summary: "exception rows",
});
console.log(exceptionCheck.ndjson);

const formulaErrors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});
console.log(formulaErrors.ndjson);

const outputDir = path.resolve("outputs/store2-2026-09-22");
await fs.mkdir(outputDir, { recursive: true });
const previewPath = path.resolve(".data/store2-final-report-preview.png");
const preview = await workbook.render({ sheetName: "上架结果", range: "A1:P18", scale: 1.35, format: "png" });
await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));

const outputPath = path.join(outputDir, "Furaxis店铺二_MercadoLibre上架结果_2026-09-22.xlsx");
const file = await SpreadsheetFile.exportXlsx(workbook);
await file.save(outputPath);

console.log(JSON.stringify({
  outputPath,
  previewPath,
  total: records.length,
  complete: records.filter((row) => row.audit_result === "success").length,
  exceptions: records.filter((row) => row.audit_result !== "success").length,
  missingDimensions: records.filter((row) => row.source_missing_dimensions).map((row) => row.sku),
}));
