import { Database } from "bun:sqlite";
const db = new Database("zhest.db");
const cats = db.query("SELECT DISTINCT category FROM products").all();
console.log(JSON.stringify(cats, null, 2));
db.close();
