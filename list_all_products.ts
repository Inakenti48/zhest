import { Database } from "bun:sqlite";
const db = new Database("zhest.db");
const products = db.query("SELECT id, name, category, variants FROM products").all();
console.log(JSON.stringify(products, null, 2));
db.close();
