import fs from 'node:fs/promises';
import path from 'node:path';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';
import { apiRequest } from '../src/meli.js';

const manifest = JSON.parse(await fs.readFile('.data/batch-51-129-image-manifest.json', 'utf8'));
const duplicateSkus = new Set(manifest.map(x => x.sku).filter((sku, i, all) => all.indexOf(sku) !== i));
const rows = [];
for (const entry of manifest) {
  let record = {};
  try { record = JSON.parse(await fs.readFile(`.data/${entry.sku}-published.json`, 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  let item = {}, flex = {}, description = {}, error = record.error || '';
  if (record.id) {
    try {
      [item, flex, description] = await Promise.all([
        apiRequest(`/items/${record.id}`), apiRequest(`/flex/sites/MLC/items/${record.id}/v2`),
        apiRequest(`/items/${record.id}/description`)
      ]);
    } catch (caught) { error = `平台回读失败: ${caught.message}`; }
  }
  const verified = item.status === 'paused' && flex.has_flex === true && (description.plain_text?.length || 0) >= 4000;
  let note = error;
  if (duplicateSkus.has(entry.sku)) note = [note, '源表重复SKU：需核对两个不同UPC，仅发布一次'].filter(Boolean).join('；');
  if (entry.source_index === 51) note = [note, '开发图有未经核实的“官方正品/400天”宣传，不宜直接上传'].filter(Boolean).join('；');
  if (!entry.images.length) note = [note, '缺少可用实物图'].filter(Boolean).join('；');
  if (!/^https?:\/\//.test(entry.competitor_url)) note = [note, '竞品字段不是有效网页链接'].filter(Boolean).join('；');
  const status = verified ? '已核实' : record.id ? '异常-已创建' : note ? '待核对' : '待处理';
  const plannedPrice = entry.development?.price_clp ? Math.ceil((Number(entry.development.price_clp) * 1.8 - 990) / 1000) * 1000 + 990 : null;
  rows.push([entry.source_index, record.id || '', entry.sku, entry.upc, item.title || record.title || '', item.permalink || record.permalink || '', item.price ?? (record.id ? '' : plannedPrice), item.status || (record.id ? '读取失败' : '未创建'), flex.has_flex ? '已开启' : '未开启', description.plain_text?.length || '', '否', '', status, note]);
}
const workbook = Workbook.create();
const sheet = workbook.worksheets.add('后续SKU进度');
sheet.showGridLines = false;
sheet.getRange('A2').values = [['Furaxis 智利后续SKU上架进度']];
sheet.getRange('A2').format = { font: { name: 'Arial', size: 15, bold: true, color: '#173F5F' }, rowHeight: 32 };
sheet.getRange('A4:D5').values = [['总行数', rows.length, '已核实', rows.filter(x => x[12] === '已核实').length], ['待处理/待核对', rows.filter(x => x[12].startsWith('待')).length, '异常-已创建', rows.filter(x => x[12] === '异常-已创建').length]];
sheet.getRange('A4:D5').format = { font: { name: 'Arial', size: 10 }, rowHeight: 25 };
const headers = ['源表序号', 'MLC代码', 'SKU', 'UPC', '商品标题', '商品链接', '价格 CLP', '销售状态', 'Flex', '描述字符数', '多个SKU同链接', '同链接其他SKU', '处理结果', '异常/备注'];
sheet.getRange('A7:N7').values = [headers];
sheet.getRange('A7:N7').format = { fill: '#20639B', font: { name: 'Arial', size: 10, bold: true, color: '#FFFFFF' }, rowHeight: 30, horizontalAlignment: 'center', verticalAlignment: 'center' };
sheet.getRange(`D8:D${rows.length + 7}`).format.numberFormat = '@';
sheet.getRangeByIndexes(7, 0, rows.length, headers.length).values = rows;
sheet.getRangeByIndexes(7, 0, rows.length, headers.length).format = { font: { name: 'Arial', size: 10 }, rowHeight: 27, verticalAlignment: 'center' };
for (let i = 0; i < rows.length; i++) if (rows[i][12] !== '待处理') sheet.getRangeByIndexes(i + 7, 12, 1, 2).format.fill = rows[i][12] === '已核实' ? '#E7F4EA' : '#FFF4CC';
const widths = [13, 19, 23, 19, 58, 76, 15, 15, 13, 17, 20, 24, 17, 62];
for (let i = 0; i < widths.length; i++) sheet.getRangeByIndexes(0, i, rows.length + 8, 1).format.columnWidth = widths[i];
sheet.getRange(`G8:G${rows.length + 7}`).format.numberFormat = '#,##0';
sheet.freezePanes.freezeRows(7);
sheet.freezePanes.freezeColumns(3);
sheet.tables.add(`A7:N${rows.length + 7}`, true, 'LaterSkuProgress').style = 'TableStyleMedium2';
workbook.recalculate();
console.log((await workbook.inspect({ kind: 'table', range: '后续SKU进度!A4:N10', include: 'values', tableMaxRows: 7, tableMaxCols: 14 })).ndjson.slice(0, 4000));
const preview = await workbook.render({ sheetName: '后续SKU进度', range: 'A2:N11', scale: 1, format: 'png' });
await fs.writeFile('.data/next-progress-preview.png', new Uint8Array(await preview.arrayBuffer()));
const outputPath = path.resolve('outputs', 'later-skus-2026-09-16', 'Furaxis智利后续SKU上架进度.xlsx');
await fs.mkdir(path.dirname(outputPath), { recursive: true });
await (await SpreadsheetFile.exportXlsx(workbook)).save(outputPath);
console.log(JSON.stringify({ outputPath, rows: rows.length, verified: rows.filter(x => x[12] === '已核实').length }));
