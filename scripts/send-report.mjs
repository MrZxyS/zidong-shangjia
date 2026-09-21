import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const configPath = path.resolve(".data", "wechat-webhook.txt");
const deliveryPath = path.resolve(".data", "report-delivered-2026-09-16.json");
try {
  const delivery = JSON.parse(await fs.readFile(deliveryPath, "utf8"));
  if (delivery.delivered) throw new Error("The September 16 report was already delivered; refusing duplicate send");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
const url = new URL((await fs.readFile(configPath, "utf8")).trim());
if (url.hostname !== "qyapi.weixin.qq.com" || url.pathname !== "/cgi-bin/webhook/send" || !url.searchParams.get("key")) {
  throw new Error("Invalid enterprise WeChat robot configuration");
}

const reportPath = path.resolve("outputs", "Furaxis智利上架结果.xlsx");
const report = await SpreadsheetFile.importXlsx(await FileBlob.load(reportPath));
const reportRows = report.worksheets.getItemAt(0).getUsedRange().values.slice(5)
  .filter((row) => String(row[1] || "").startsWith("NW"));
const early = Date.now() < Date.parse("2026-09-16T02:00:00Z");
if (early) {
  const source = await SpreadsheetFile.importXlsx(await FileBlob.load("产品信息2.xlsx"));
  const sourceRows = source.worksheets.getItemAt(0).getUsedRange().values.slice(1)
    .filter((row) => String(row[0] || "").startsWith("NW"));
  const skus = new Set(sourceRows.map((row) => String(row[0])));
  const conflict = sourceRows.some((row) => sourceRows.some((other) =>
    row !== other && row[0] === other[0] && row[4] !== other[4]));
  if (!process.argv.includes("--all-complete") || conflict || reportRows.length !== skus.size ||
      reportRows.some((row) => row[11] !== "已核实") ||
      new Set(reportRows.map((row) => String(row[1]))).size !== skus.size) {
    throw new Error("The partial report may only be delivered at or after 2026-09-16 10:00 China time");
  }
}
const buffer = await fs.readFile(reportPath);
const uploadUrl = new URL("/cgi-bin/webhook/upload_media", url.origin);
uploadUrl.searchParams.set("key", url.searchParams.get("key"));
uploadUrl.searchParams.set("type", "file");
const form = new FormData();
form.append("media", new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), path.basename(reportPath));

const uploaded = await fetch(uploadUrl, { method: "POST", body: form });
const media = await uploaded.json();
if (!uploaded.ok || media.errcode !== 0 || !media.media_id) {
  throw new Error(`Enterprise WeChat file upload failed: ${JSON.stringify({ status: uploaded.status, errcode: media.errcode, errmsg: media.errmsg })}`);
}

const sent = await fetch(url, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ msgtype: "file", file: { media_id: media.media_id } })
});
const result = await sent.json();
if (!sent.ok || result.errcode !== 0) {
  throw new Error(`Enterprise WeChat file send failed: ${JSON.stringify({ status: sent.status, errcode: result.errcode, errmsg: result.errmsg })}`);
}
await fs.writeFile(deliveryPath, JSON.stringify({ delivered: true, sent_at: new Date().toISOString(), filename: path.basename(reportPath), bytes: buffer.length }, null, 2));
console.log(JSON.stringify({ delivered: true, filename: path.basename(reportPath), bytes: buffer.length }));
