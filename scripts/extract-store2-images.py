import json, os, posixpath, zipfile
from xml.etree import ElementTree as ET

NS={"xdr":"http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing","a":"http://schemas.openxmlformats.org/drawingml/2006/main","r":"http://schemas.openxmlformats.org/officeDocument/2006/relationships","pr":"http://schemas.openxmlformats.org/package/2006/relationships"}
products=json.load(open('.data/store2-source.json',encoding='utf-8'))
os.makedirs('.data/store2-images',exist_ok=True)
with zipfile.ZipFile('2026开发跟踪表 智利-New.xlsx') as z:
    drawing=ET.fromstring(z.read('xl/drawings/drawing1.xml'))
    rels=ET.fromstring(z.read('xl/drawings/_rels/drawing1.xml.rels'))
    targets={n.attrib['Id']:n.attrib['Target'] for n in rels.findall('pr:Relationship',NS) if n.attrib.get('Type','').endswith('/image')}
    by_row={}
    for anchor in list(drawing):
        fr=anchor.find('xdr:from',NS); blip=anchor.find('.//a:blip',NS)
        if fr is None or blip is None: continue
        row=fr.find('xdr:row',NS); col=fr.find('xdr:col',NS)
        if row is None or col is None or int(col.text)!=5: continue
        rid=blip.attrib.get('{%s}embed'%NS['r']); target=targets.get(rid)
        if target: by_row[int(row.text)+1]=posixpath.normpath(posixpath.join('xl/drawings',target))
    manifest=[]
    for p in products:
        row=p.get('development',{}).get('row') if p.get('development') else None
        media=by_row.get(row); out=None
        if media:
            ext=os.path.splitext(media)[1].lower() or '.png'; out=f'.data/store2-images/{p["sku"]}{ext}'
            open(out,'wb').write(z.read(media))
        manifest.append({'sku':p['sku'],'image_path':out,'development_row':row})
json.dump(manifest,open('.data/store2-image-manifest.json','w',encoding='utf-8'),ensure_ascii=False,indent=2)
print(json.dumps({'total':len(manifest),'extracted':sum(bool(x['image_path']) for x in manifest),'missing':[x['sku'] for x in manifest if not x['image_path']]},ensure_ascii=False))
