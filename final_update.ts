import { Database } from "bun:sqlite";
const db = new Database("zhest.db");

// Update category and name to be more standard
db.run(
  "UPDATE products SET name = ?, category = ? WHERE id = 126",
  "Держатель водосточной трубы",
  "Водосточная система (круглая)"
);

console.log("Product 126 updated");
db.close();
