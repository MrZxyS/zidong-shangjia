import fs from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const plan = JSON.parse(await fs.readFile('.data/store2-plan.json', 'utf8'));
const start = Number(process.argv[2] || 1);
const end = Number(process.argv[3] || plan.length);

for (const entry of plan.filter(x => x.source_index >= start && x.source_index <= end)) {
  const recordPath = `.data/${entry.sku}-published.json`;
  let before = null;
  try { before = JSON.parse(await fs.readFile(recordPath, 'utf8')); } catch {}
  if (before?.result === 'success' && before?.stage === 'complete') {
    console.log(JSON.stringify({ index: entry.source_index, sku: entry.sku, result: 'already_complete', id: before.id }));
    continue;
  }
  const child = spawnSync(process.execPath, ['scripts/publish-from-spec.mjs', entry.spec_path], {
    encoding: 'utf8', timeout: 150000, windowsHide: true, maxBuffer: 8 * 1024 * 1024
  });
  let record = null;
  try { record = JSON.parse(await fs.readFile(recordPath, 'utf8')); } catch {}
  console.log(JSON.stringify({
    index: entry.source_index,
    sku: entry.sku,
    result: record?.result || 'exception',
    id: record?.id || null,
    stage: record?.stage || null,
    flex: record?.flex ?? null,
    error: record?.error || (child.status !== 0 ? (child.stderr || child.stdout || '').slice(0, 1000) : null)
  }));
  await new Promise(resolve => setTimeout(resolve, 900));
}

const records = [];
for (const entry of plan) {
  try { records.push(JSON.parse(await fs.readFile(`.data/${entry.sku}-published.json`, 'utf8'))); }
  catch { records.push({ sku: entry.sku, result: 'not_started' }); }
}
await fs.writeFile('.data/store2-publish-results.json', `${JSON.stringify(records, null, 2)}\n`);
console.log(JSON.stringify({
  total: records.length,
  success: records.filter(x => x.result === 'success').length,
  exception: records.filter(x => x.result === 'exception').length,
  not_started: records.filter(x => x.result === 'not_started').length
}));
