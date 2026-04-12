import { Database } from "bun:sqlite";
const db = new Database("zhest.db");

// 1. Add "Пирамида" to the database if it doesn't exist
const pyramidExists = db.query("SELECT id FROM products WHERE name = ?").get("Пирамида");

if (!pyramidExists) {
  db.run(
    "INSERT INTO products (name, buy_price, sell_price, category, stock, unit, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
    "Пирамида",
    0,
    0,
    "Кровля",
    100,
    "шт",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/piramida-preview.png"
  );
  console.log("Product 'Пирамида' added.");
} else {
  console.log("Product 'Пирамида' already exists.");
}

// 2. Ensure "Желоб 3м" has the correct category and variants
db.run(
  "UPDATE products SET category = ? WHERE id = 152",
  "Водосточная система (круглая)"
);

console.log("Database updated successfully.");
db.close();
