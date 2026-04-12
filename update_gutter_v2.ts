
import { Database } from 'bun:sqlite';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'zhest.db');
const db = new Database(dbPath);

const variants = [
  { "name": "1. RAL 8017 Шоколад", "color": "RAL 8017 Шоколад", "colorCode": "#5c4a3d", "image_url": "/uploads/gutter-sq-brown.jpg" },
  { "name": "2. RAL 7024 Графит", "color": "RAL 7024 Графит", "colorCode": "#474A51", "image_url": "/uploads/gutter-sq-grafit.jpg" },
  { "name": "3. RAL 9003 Белый", "color": "RAL 9003 Белый", "colorCode": "#F4F4F4", "image_url": "/uploads/gutter-sq-white.jpg" },
  { "name": "4. RAL 8019 Темно-коричневый", "color": "RAL 8019 Темно-коричневый", "colorCode": "#403A3A", "image_url": "/uploads/gutter-sq-darkbrown.jpg" },
  { "name": "5. RAL 3005 Вишневый", "color": "RAL 3005 Вишневый", "colorCode": "#5E2028", "image_url": "/uploads/gutter-sq-red.jpg" },
  { "name": "6. RAL 5005 Синий", "color": "RAL 5005 Синий", "colorCode": "#1E4D8C", "image_url": "/uploads/gutter-sq-blue.jpg" },
  { "name": "7. RAL 6005 Зеленый", "color": "RAL 6005 Зеленый", "colorCode": "#1E5945", "image_url": "/uploads/gutter-sq-green.jpg" },
  { "name": "8. RAL 1015 Слоновая кость", "color": "RAL 1015 Слоновая кость", "colorCode": "#E6D2B5", "image_url": "/uploads/gutter-sq-ivory.jpg" },
  { "name": "9. RAL 2004 Оранжевый", "color": "RAL 2004 Оранжевый", "colorCode": "#E75B12", "image_url": "/uploads/gutter-sq-orange.jpg" },
  { "name": "10. RAL 9005 Черный", "color": "RAL 9005 Черный", "colorCode": "#0A0A0A", "image_url": "/uploads/gutter-sq-black.jpg" }
];

const sizes = [
  { "name": "1м", "sell_price": 1200 },
  { "name": "3м", "sell_price": 2500 }
];

db.query('UPDATE products SET variants = ?, sizes = ?, image_url = ? WHERE id = 190').run(
  JSON.stringify(variants),
  JSON.stringify(sizes),
  "/uploads/gutter-sq-brown.jpg"
);

console.log('Product 190 "Желоб квадратный" updated with 10 variants, preserved sizes, and local main image.');
