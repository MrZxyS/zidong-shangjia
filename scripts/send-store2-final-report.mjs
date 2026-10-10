import fs from "node:fs/promises";
import path from "node:path";

const configPath = path.resolve(".data/wechat-webhook.txt");
const deliveryPath = path.resolve(".data/report-delivered-store2-2026-09-22.json");
const reportPath = path.resolve("outputs/store2-2026-09-22/Furaxis店铺二_MercadoLibre上架结果_2026-09-22.xlsx");

let delivery = { file_sent: false, text_sent: false };
try {
  delivery = { ...delivery, ...JSON.parse(await fs.readFile(deliveryPath, "utf8")) };
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

if (delivery.file_sent && delivery.text_sent) {
  console.log(JSON.stringify({ delivered: true, duplicate_prevented: true, filename: delivery.filename }));
  process.exit(0);
}

const url = new URL((await fs.readFile(configPath, "utf8")).trim());
if (url.hostname !== "qyapi.weixin.qq.com" || url.pathname !== "/cgi-bin/webhook/send" || !url.searchParams.get("key")) {
  throw new Error("Invalid enterprise WeChat robot configuration");
}

if (!delivery.file_sent) {
  const buffer = await fs.readFile(reportPath);
  const uploadUrl = new URL("/cgi-bin/webhook/upload_media", url.origin);
  uploadUrl.searchParams.set("key", url.searchParams.get("key"));
  uploadUrl.searchParams.set("type", "file");
  const form = new FormData();
  form.append(
    "media",
    new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
    path.basename(reportPath),
  );
  const uploaded = await fetch(uploadUrl, { method: "POST", body: form });
  const media = await uploaded.json();
  if (!uploaded.ok || media.errcode !== 0 || !media.media_id) {
    throw new Error(`Enterprise WeChat file upload failed: ${JSON.stringify({ status: uploaded.status, errcode: media.errcode, errmsg: media.errmsg })}`);
  }
  const sent = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ msgtype: "file", file: { media_id: media.media_id } }),
  });
  const result = await sent.json();
  if (!sent.ok || result.errcode !== 0) {
    throw new Error(`Enterprise WeChat file send failed: ${JSON.stringify({ status: sent.status, errcode: result.errcode, errmsg: result.errmsg })}`);
  }
  delivery = {
    ...delivery,
    file_sent: true,
    file_sent_at: new Date().toISOString(),
    filename: path.basename(reportPath),
    bytes: buffer.length,
  };
  await fs.writeFile(deliveryPath, `${JSON.stringify(delivery, null, 2)}\n`);
}

if (!delivery.text_sent) {
  const content = [
    "Furaxis 店铺二 Mercado Libre 智利站上架结果：",
    "81 个 SKU 全部已成功创建 MLC 并暂停。",
    "78 条已完整通过 Mercado Envíos、Flex 及描述长度终检。",
    "3 条已上架，但受平台物流能力限制，无法开启 Mercado Envíos/Flex：BG260632NEGMS1、BG260720ROJMS1、BG260720NEGMS2。",
    "BG260853NEGMS1 源表无包装尺寸，已使用竞品参考参数并在报表标注。",
    "详细 MLC 代码、SKU、商品标题、价格、链接及异常说明见附件。",
  ].join("\n");
  const sent = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ msgtype: "text", text: { content } }),
  });
  const result = await sent.json();
  if (!sent.ok || result.errcode !== 0) {
    throw new Error(`Enterprise WeChat text send failed: ${JSON.stringify({ status: sent.status, errcode: result.errcode, errmsg: result.errmsg })}`);
  }
  delivery = { ...delivery, text_sent: true, text_sent_at: new Date().toISOString() };
  await fs.writeFile(deliveryPath, `${JSON.stringify(delivery, null, 2)}\n`);
}

console.log(JSON.stringify({ delivered: true, file_sent: delivery.file_sent, text_sent: delivery.text_sent, filename: delivery.filename, bytes: delivery.bytes }));
