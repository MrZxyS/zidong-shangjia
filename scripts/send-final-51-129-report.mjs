import fs from 'node:fs/promises';
import path from 'node:path';

const configPath=path.resolve('.data','wechat-webhook.txt');
const deliveryPath=path.resolve('.data','report-delivered-final-51-129-2026-09-21.json');
const reportPath=path.resolve('outputs','final-batch-51-129','MercadoLibre_智利SKU上架结果_2026-09-21.xlsx');
let delivery={file_sent:false,text_sent:false};
try{delivery={...delivery,...JSON.parse(await fs.readFile(deliveryPath,'utf8'))};}catch(error){if(error.code!=='ENOENT')throw error;}
if(delivery.file_sent&&delivery.text_sent)throw new Error('Final report was already delivered; refusing duplicate send');

const url=new URL((await fs.readFile(configPath,'utf8')).trim());
if(url.hostname!=='qyapi.weixin.qq.com'||url.pathname!=='/cgi-bin/webhook/send'||!url.searchParams.get('key'))throw new Error('Invalid enterprise WeChat robot configuration');

if(!delivery.file_sent){
  const buffer=await fs.readFile(reportPath);
  const uploadUrl=new URL('/cgi-bin/webhook/upload_media',url.origin);
  uploadUrl.searchParams.set('key',url.searchParams.get('key'));
  uploadUrl.searchParams.set('type','file');
  const form=new FormData();
  form.append('media',new Blob([buffer],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}),path.basename(reportPath));
  const uploaded=await fetch(uploadUrl,{method:'POST',body:form});
  const media=await uploaded.json();
  if(!uploaded.ok||media.errcode!==0||!media.media_id)throw new Error(`Enterprise WeChat file upload failed: ${JSON.stringify({status:uploaded.status,errcode:media.errcode,errmsg:media.errmsg})}`);
  const sent=await fetch(url,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({msgtype:'file',file:{media_id:media.media_id}})});
  const result=await sent.json();
  if(!sent.ok||result.errcode!==0)throw new Error(`Enterprise WeChat file send failed: ${JSON.stringify({status:sent.status,errcode:result.errcode,errmsg:result.errmsg})}`);
  delivery={...delivery,file_sent:true,file_sent_at:new Date().toISOString(),filename:path.basename(reportPath),bytes:buffer.length};
  await fs.writeFile(deliveryPath,`${JSON.stringify(delivery,null,2)}\n`);
}

if(!delivery.text_sent){
  const content='Furaxis 智利站 SKU 上架结果：清单 79 行，77 个唯一 SKU 已完整通过 paused、Mercado Envíos、xd_drop_off、Flex 及描述≥4000 字符终检；索引 117 与 112 为重复 SKU，已跳过重复创建；索引 123 压缩沙发已创建并暂停，但家具类目不支持 Mercado Envíos/Flex，已在报表中标注异常。详细 MLC、SKU、标题、价格、链接及同组说明见附件。';
  const sent=await fetch(url,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({msgtype:'text',text:{content}})});
  const result=await sent.json();
  if(!sent.ok||result.errcode!==0)throw new Error(`Enterprise WeChat text send failed: ${JSON.stringify({status:sent.status,errcode:result.errcode,errmsg:result.errmsg})}`);
  delivery={...delivery,text_sent:true,text_sent_at:new Date().toISOString()};
  await fs.writeFile(deliveryPath,`${JSON.stringify(delivery,null,2)}\n`);
}

console.log(JSON.stringify({delivered:true,file_sent:delivery.file_sent,text_sent:delivery.text_sent,filename:delivery.filename,bytes:delivery.bytes}));
