import fs from "node:fs/promises";
import { spawnSync } from "node:child_process";

const sku = process.argv[2];
if (!/^NW[0-9A-Z]+$/.test(sku || "")) throw new Error("Provide a valid SKU");
const code = `import openpyxl,sys,json,os
w=openpyxl.load_workbook('2026开发跟踪表 智利.xlsx')
s=w.active
rows=[r for r in range(3,s.max_row+1) if s.cell(r,7).value==sys.argv[1]]
if len(rows)!=1: raise ValueError('Expected exactly one development row')
row=rows[0]
out=[]
for i,img in enumerate(s._images):
    if hasattr(img.anchor,'_from') and img.anchor._from.row+1==row and img.anchor._from.col+1==6:
        extension=img.format.lower()
        if extension not in ('png','jpeg','jpg'): continue
        name='.data/'+sys.argv[1]+'-source-'+str(len(out)+1)+'.'+('jpg' if extension=='jpeg' else extension)
        with open(name,'wb') as f: f.write(img._data())
        out.append({'path':name,'width':img.width,'height':img.height})
print(json.dumps(out))`;
await fs.mkdir(".data", { recursive: true });
const python = "C:/Users/root/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe";
const result = spawnSync(python, ["-c", code, sku], { encoding: "utf8" });
if (result.status !== 0) throw new Error(result.stderr);
console.log(result.stdout.trim());
