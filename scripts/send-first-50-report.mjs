import fs from "node:fs/promises";
import path from "node:path";

import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const markerPath = path.resolve(".data", "report-delivered-first-50-2026-09-16.json");
try {
  const marker = JSON.parse(await fs.readFile(markerPath, "utf8"));
  if (marker.delivered) throw new Error("First-50 report already delivered; refusing duplicate send");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const webhook = new URL((await fs.readFile(".data/wechat-webhook.txt", "utf8")).trim());
if (webhook.hostname !== "qyapi.weixin.qq.com" || webhook.pathname !== "/cgi-bin/webhook/send" || !webhook.searchParams.get("key")) {
  throw new Error("Invalid enterprise WeChat robot configuration");
}

const reportPath = path.resolve("outputs", "Furaxis智利前50个SKU上架结果.xlsx");
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(reportPath));
const detailSheet = workbook.worksheets.getItem("SKU明细");
const detailRows = detailSheet.getUsedRange().values.slice(3).filter((row) => String(row[2] || "").startsWith("NW"));
if (detailRows.length !== 50) throw new Error(`Expected 50 report rows before send, found ${detailRows.length}`);

const buffer = await fs.readFile(reportPath);
const uploadUrl = new URL("/cgi-bin/webhook/upload_media", webhook.origin);
uploadUrl.searchParams.set("key", webhook.searchParams.get("key"));
uploadUrl.searchParams.set("type", "file");
const form = new FormData();
form.append("media", new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), path.basename(reportPath));
const uploadResponse = await fetch(uploadUrl, { method: "POST", body: form });
const uploadResult = await uploadResponse.json();
if (!uploadResponse.ok || uploadResult.errcode !== 0 || !uploadResult.media_id) {
  throw new Error(`Enterprise WeChat upload failed: ${JSON.stringify({ status: uploadResponse.status, errcode: uploadResult.errcode, errmsg: uploadResult.errmsg })}`);
}

const sendResponse = await fetch(webhook, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ msgtype: "file", file: { media_id: uploadResult.media_id } })
});
const sendResult = await sendResponse.json();
if (!sendResponse.ok || sendResult.errcode !== 0) {
  throw new Error(`Enterprise WeChat send failed: ${JSON.stringify({ status: sendResponse.status, errcode: sendResult.errcode, errmsg: sendResult.errmsg })}`);
}

const marker = { delivered: true, sent_at: new Date().toISOString(), filename: path.basename(reportPath), bytes: buffer.length, rows: detailRows.length, errcode: sendResult.errcode };
await fs.writeFile(markerPath, `${JSON.stringify(marker, null, 2)}\n`);
console.log(JSON.stringify(marker));
