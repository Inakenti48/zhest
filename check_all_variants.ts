import { Database } from 'bun:sqlite';
const db = new Database('zhest.db');
const rows = db.query(`SELECT name, variants FROM products WHERE variants IS NOT NULL AND variants != '' AND variants != '[]' LIMIT 5`).all() as any[];
rows.forEach(r => {
  console.log(`\n${r.name}:`);
  try {
    const v = JSON.parse(r.variants);
    if (v[0]) console.log('Keys:', Object.keys(v[0]));
  } catch(e) {}
});
