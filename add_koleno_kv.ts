import { Database } from 'bun:sqlite';
const db = new Database('zhest.db');

const variants = JSON.stringify([
  { name: "RAL 9003 Белый", color: "RAL 9003 Белый", colorCode: "#F4F4F4", image_url: "/uploads/koleno-white.jpeg" },
  { name: "RAL 7024 Графит", color: "RAL 7024 Графит", colorCode: "#474A51", image_url: "/uploads/koleno-grafit.jpeg" },
  { name: "RAL 5005 Синий", color: "RAL 5005 Синий", colorCode: "#1E4D8C", image_url: "/uploads/koleno-blue.jpeg" }
]);

db.prepare(`
  INSERT INTO products (name, category, buy_price, sell_price, stock, unit, image_url, variants)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`).run(
  'Колено квадратное',
  'Водосточная система квадратная',
  800,
  1200,
  50,
  'шт',
  '/uploads/koleno-white.jpeg',
  variants
);

console.log('Колено добавлено!');
const p = db.prepare("SELECT id, name, category FROM products WHERE name = 'Колено квадратное'").get();
console.log(p);
