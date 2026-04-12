import { Database } from "bun:sqlite";
const db = new Database("zhest.db");
const products = db.query("SELECT id, name, category, variants FROM products WHERE name LIKE ?").all("%Пирамида%");
console.log(JSON.stringify(products, null, 2));
db.close();
