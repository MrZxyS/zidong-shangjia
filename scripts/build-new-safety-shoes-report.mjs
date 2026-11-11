import fs from 'node:fs/promises';
import path from 'node:path';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const auditPath = path.resolve('.data/new-safety-shoes/final-audit.json');
const audit = JSON.parse(await fs.readFile(auditPath, 'utf8'));
const rows = audit.rows;
const outputDir = path.resolve('outputs/new-safety-shoes-2026-10-19');
const outputPath = path.join(outputDir, 'Furaxis劳保鞋_MercadoLibre上架结果_2026-10-19.xlsx');
const previewPath = path.resolve('.data/new-safety-shoes/report-preview.png');

const detailRows = rows.map((row, index) => [
  index + 1, row.id, row.sku, row.group_id, row.model, row.color, row.size,
  row.group_title, row.title, row.upc, row.price, row.status === 'paused' ? '已暂停' : row.status,
  row.shipping_mode === 'me2' ? '已开启 (me2)' : row.shipping_mode,
  row.flex ? '已开启' : '未开启', row.description_length, row.package,
  row.permalink, row.result === 'success' ? '全部通过' : '存在异常',
  row.package_estimated ? '包装尺寸/重量为竞品与同类商品估算；上线前建议实测复核。' : '',
  row.exceptions.join(', ')
]);

const workbook = Workbook.create();
const sheet = workbook.worksheets.add('上架结果');
sheet.showGridLines = false;

sheet.mergeCells('A1:T1');
sheet.getRange('A1').values = [['Furaxis 劳保鞋 Mercado Libre 智利站上架结果']];
sheet.getRange('A1:T1').format = {
  fill: '#183A37', font: { name: 'Microsoft YaHei', size: 16, bold: true, color: '#FFFFFF' },
  rowHeight: 36, verticalAlignment: 'center'
};

sheet.getRange('A3:L3').values = [[
  '商品组', audit.summary.groups, 'SKU', audit.summary.rows, '已暂停', audit.summary.paused,
  'Mercado Envíos', audit.summary.shipping_me2, 'Flex', audit.summary.flex_enabled,
  '描述≥4000字', audit.summary.descriptions_over_4000
]];
for (const col of [0, 2, 4, 6, 8, 10]) {
  sheet.getRangeByIndexes(2, col, 1, 1).format = {
    fill: '#2A6F62', font: { name: 'Microsoft YaHei', size: 10, bold: true, color: '#FFFFFF' },
    horizontalAlignment: 'center', verticalAlignment: 'center'
  };
  sheet.getRangeByIndexes(2, col + 1, 1, 1).format = {
    fill: '#E8F1EE', font: { name: 'Microsoft YaHei', size: 11, bold: true, color: '#183A37' },
    horizontalAlignment: 'center', verticalAlignment: 'center'
  };
}
sheet.getRange('A3:L3').format.rowHeight = 28;

sheet.mergeCells('A5:T5');
sheet.getRange('A5').values = [['本批次共 6 个款式+颜色商品组、34 个尺码 SKU。每个 SKU 均已生成独立 MLC 子商品并归入对应 family_name 商品组；所有链接保持暂停。']];
sheet.getRange('A5:T5').format = {
  fill: '#E8F1EE', font: { name: 'Microsoft YaHei', size: 10, color: '#294E4A' },
  rowHeight: 30, verticalAlignment: 'center', wrapText: true
};

sheet.mergeCells('A6:T6');
sheet.getRange('A6').values = [['注意：平台会自动在商品组标题后附加颜色和尺码，部分子商品标题因此出现重复颜色；“商品组标题”列为用于关键词设计的干净标题。包装数据来自竞品和同类商品估算。']];
sheet.getRange('A6:T6').format = {
  fill: '#FFF4D6', font: { name: 'Microsoft YaHei', size: 10, color: '#6B4F00' },
  rowHeight: 34, verticalAlignment: 'center', wrapText: true
};

const headers = [
  '序号', 'MLC代码', 'SKU', '商品组', '型号', '颜色', '尺码', '商品组标题', '实际MLC标题', 'UPC',
  '价格 CLP', '链接状态', 'Mercado Envíos', 'Flex', '描述字符数', '包装参数', '商品链接', '审核结果', '备注', '异常'
];
sheet.getRange('A9:T9').values = [headers];
sheet.getRange('A9:T9').format = {
  fill: '#2A6F62', font: { name: 'Microsoft YaHei', size: 10, bold: true, color: '#FFFFFF' },
  rowHeight: 38, horizontalAlignment: 'center', verticalAlignment: 'center', wrapText: true,
  borders: { preset: 'inside', style: 'thin', color: '#FFFFFF' }
};
sheet.getRangeByIndexes(9, 0, detailRows.length, headers.length).values = detailRows;
sheet.getRangeByIndexes(9, 0, detailRows.length, headers.length).format = {
  font: { name: 'Microsoft YaHei', size: 9, color: '#1F2933' }, rowHeight: 43,
  verticalAlignment: 'center', wrapText: true
};

const widths = [7, 19, 22, 26, 9, 14, 9, 48, 58, 19, 13, 13, 18, 13, 15, 31, 64, 15, 50, 20];
for (let col = 0; col < widths.length; col += 1) {
  sheet.getRangeByIndexes(0, col, detailRows.length + 10, 1).format.columnWidth = widths[col];
}
sheet.getRange(`K10:K${detailRows.length + 9}`).format.numberFormat = '#,##0';
sheet.getRange(`J10:J${detailRows.length + 9}`).format.numberFormat = '0';
sheet.getRange(`O10:O${detailRows.length + 9}`).format.numberFormat = '#,##0';
sheet.getRange(`A10:A${detailRows.length + 9}`).format.horizontalAlignment = 'center';
sheet.getRange(`E10:G${detailRows.length + 9}`).format.horizontalAlignment = 'center';
sheet.getRange(`K10:O${detailRows.length + 9}`).format.horizontalAlignment = 'center';
sheet.getRange(`R10:R${detailRows.length + 9}`).format.horizontalAlignment = 'center';

sheet.tables.add(`A9:T${detailRows.length + 9}`, true, 'SafetyShoeListingResults').style = 'TableStyleMedium4';
sheet.freezePanes.freezeRows(9);
sheet.freezePanes.freezeColumns(3);

workbook.recalculate();
const mainCheck = await workbook.inspect({
  kind: 'table', range: '上架结果!A1:T13', include: 'values,formulas', tableMaxRows: 13, tableMaxCols: 20
});
console.log(mainCheck.ndjson);
const errorCheck = await workbook.inspect({
  kind: 'match', searchTerm: '#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',
  options: { useRegex: true, maxResults: 100 }, summary: 'formula errors'
});
console.log(errorCheck.ndjson);

await fs.mkdir(outputDir, { recursive: true });
const preview = await workbook.render({ sheetName: '上架结果', range: 'A1:T16', scale: 1.2, format: 'png' });
await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(JSON.stringify({ outputPath, previewPath, rows: detailRows.length }));
