import { Database } from "bun:sqlite";
const db = new Database("zhest.db");
const product = db.query("SELECT * FROM products WHERE id = 126").get();
console.log(JSON.stringify(product, null, 2));
db.close();
