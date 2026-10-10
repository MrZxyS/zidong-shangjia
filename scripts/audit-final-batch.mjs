import fs from 'node:fs/promises';
import { apiRequest } from '../src/meli.js';

const manifest=JSON.parse(await fs.readFile('.data/batch-51-129-image-manifest.json','utf8'));
const seen=new Map();
const rows=[];
for(const entry of manifest){
  if(seen.has(entry.sku)){
    rows.push({source_index:entry.source_index,sku:entry.sku,result:'skipped_duplicate',duplicate_of:seen.get(entry.sku),note:`与索引 ${seen.get(entry.sku)} 为相同 SKU，仅发布一次。`});
    continue;
  }
  seen.set(entry.sku,entry.source_index);
  let record={};
  try{record=JSON.parse(await fs.readFile(`.data/${entry.sku}-published.json`,'utf8'));}catch{}
  rows.push({source_index:entry.source_index,sku:entry.sku,record_id:record.id||'',record_result:record.result||'',record_error:record.error||''});
}

const uniques=rows.filter(r=>r.result!=='skipped_duplicate');
for(let offset=0;offset<uniques.length;offset+=8){
  const batch=uniques.slice(offset,offset+8);
  await Promise.all(batch.map(async row=>{
    try{
      let id=row.record_id;
      if(!id){
        const found=await apiRequest(`/users/3166000149/items/search?sku=${encodeURIComponent(row.sku)}`);
        id=found.results?.[0]||'';
      }
      if(!id)throw new Error('No se encontró publicación para el SKU');
      const [item,description,flex]=await Promise.all([
        apiRequest(`/items/${id}`),
        apiRequest(`/items/${id}/description`).catch(()=>({})),
        apiRequest(`/flex/sites/MLC/items/${id}/v2`).catch(error=>({has_flex:false,error:error.message}))
      ]);
      Object.assign(row,{id,title:item.title||'',price:item.price??'',status:item.status||'',shipping_mode:item.shipping?.mode||'',logistic_type:item.shipping?.logistic_type||'',flex:flex.has_flex===true,description_length:description.plain_text?.length||0,category_id:item.category_id||'',permalink:item.permalink||'',audit_result:item.status==='paused'&&item.shipping?.mode==='me2'&&item.shipping?.logistic_type==='xd_drop_off'&&flex.has_flex===true&&(description.plain_text?.length||0)>=4000?'success':'exception'});
      if(row.audit_result!=='success')row.audit_error=`Verificación final: status=${row.status}, shipping=${row.shipping_mode}, logistic=${row.logistic_type}, flex=${row.flex}, description=${row.description_length}`;
    }catch(error){row.audit_result='exception';row.audit_error=error.message;}
  }));
}

rows.sort((a,b)=>a.source_index-b.source_index);
await fs.writeFile('.data/final-audit-51-129.json',`${JSON.stringify({generated_at:new Date().toISOString(),rows},null,2)}\n`);
const counts=rows.reduce((a,r)=>{const k=r.result==='skipped_duplicate'?'skipped_duplicate':r.audit_result||'exception';a[k]=(a[k]||0)+1;return a;},{});
console.log(JSON.stringify(counts));
for(const row of rows.filter(r=>(r.audit_result&&r.audit_result!=='success')||r.result==='skipped_duplicate'))console.log(JSON.stringify(row));
