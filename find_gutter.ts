import { Database } from "bun:sqlite";
const db = new Database("zhest.db");
const products = db.query("SELECT id, name, variants FROM products WHERE name LIKE ?").all("%Желоб 3м%");
console.log(JSON.stringify(products, null, 2));
db.close();
