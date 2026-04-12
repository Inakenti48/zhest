import { Database } from 'bun:sqlite';
const db = new Database('zhest.db');
const row = db.query(`SELECT variants FROM products WHERE name = 'Саморезы'`).get() as any;
console.log(row?.variants);
