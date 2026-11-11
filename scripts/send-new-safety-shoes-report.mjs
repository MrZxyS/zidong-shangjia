import fs from 'node:fs/promises';
import path from 'node:path';

const configPath = path.resolve('.data/wechat-webhook.txt');
const deliveryPath = path.resolve('.data/new-safety-shoes/report-delivery.json');
const reportPath = path.resolve('outputs/new-safety-shoes-2026-10-19/Furaxis劳保鞋_MercadoLibre上架结果_2026-10-19.xlsx');
let delivery = { file_sent: false, text_sent: false };
try { delivery = { ...delivery, ...JSON.parse(await fs.readFile(deliveryPath, 'utf8')) }; }
catch (error) { if (error.code !== 'ENOENT') throw error; }

if (delivery.file_sent && delivery.text_sent) {
  console.log(JSON.stringify({ delivered: true, duplicate_prevented: true }));
  process.exit(0);
}

const url = new URL((await fs.readFile(configPath, 'utf8')).trim());
if (url.hostname !== 'qyapi.weixin.qq.com' || url.pathname !== '/cgi-bin/webhook/send' || !url.searchParams.get('key')) {
  throw new Error('Invalid enterprise WeChat robot configuration');
}

if (!delivery.file_sent) {
  const buffer = await fs.readFile(reportPath);
  const uploadUrl = new URL('/cgi-bin/webhook/upload_media', url.origin);
  uploadUrl.searchParams.set('key', url.searchParams.get('key'));
  uploadUrl.searchParams.set('type', 'file');
  const form = new FormData();
  form.append('media', new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), path.basename(reportPath));
  const uploadResponse = await fetch(uploadUrl, { method: 'POST', body: form });
  const media = await uploadResponse.json();
  if (!uploadResponse.ok || media.errcode !== 0 || !media.media_id) throw new Error(`WeCom upload failed: ${JSON.stringify(media)}`);
  const sendResponse = await fetch(url, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ msgtype: 'file', file: { media_id: media.media_id } })
  });
  const result = await sendResponse.json();
  if (!sendResponse.ok || result.errcode !== 0) throw new Error(`WeCom file send failed: ${JSON.stringify(result)}`);
  delivery = { ...delivery, file_sent: true, file_sent_at: new Date().toISOString(), filename: path.basename(reportPath), bytes: buffer.length };
  await fs.writeFile(deliveryPath, `${JSON.stringify(delivery, null, 2)}\n`);
}

if (!delivery.text_sent) {
  const content = [
    'Furaxis 劳保鞋 Mercado Libre 智利站上架完成：',
    '共 6 个商品组、34 个 SKU，全部已生成 MLC 并保持暂停。',
    '34 个 SKU 均已开启 Mercado Envíos (me2) 和 Flex，商详均超过 4,000 字符。',
    '包装尺寸和重量为竞品及同类商品估算，已在附件标注，正式启用前建议实测复核。',
    '详细 MLC 代码、SKU、标题、价格、状态和商品链接见附件。'
  ].join('\n');
  const response = await fetch(url, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ msgtype: 'text', text: { content } })
  });
  const result = await response.json();
  if (!response.ok || result.errcode !== 0) throw new Error(`WeCom text send failed: ${JSON.stringify(result)}`);
  delivery = { ...delivery, text_sent: true, text_sent_at: new Date().toISOString() };
  await fs.writeFile(deliveryPath, `${JSON.stringify(delivery, null, 2)}\n`);
}

console.log(JSON.stringify({ delivered: true, ...delivery }));
