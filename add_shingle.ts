
import { Database } from 'bun:sqlite';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'zhest.db');
const db = new Database(dbPath);

const variants = [
  {
    "name": "RAL 5005 Синий",
    "color": "RAL 5005 Синий",
    "colorCode": "#005387",
    "image": "/uploads/pyramid-1.jpeg"
  },
  {
    "name": "RAL 9005 Черный",
    "color": "RAL 9005 Черный",
    "colorCode": "#0E0E10",
    "image": "/uploads/pyramid-2.jpeg"
  },
  {
    "name": "RAL 6005 Зеленый",
    "color": "RAL 6005 Зеленый",
    "colorCode": "#0F4336",
    "image": "/uploads/pyramid-3.jpeg"
  },
  {
    "name": "RAL 7004 Серый",
    "color": "RAL 7004 Серый",
    "colorCode": "#9A9A9A",
    "image": "/uploads/pyramid-4.jpeg"
  },
  {
    "name": "RAL 1015 Бежевый",
    "color": "RAL 1015 Бежевый",
    "colorCode": "#E6D2B5",
    "image": "/uploads/pyramid-5.jpeg"
  },
  {
    "name": "RAL 7024 Графит",
    "color": "RAL 7024 Графит",
    "colorCode": "#474A51",
    "image": "/uploads/pyramid-6.jpeg"
  },
  {
    "name": "RAL 8017 Шоколад",
    "color": "RAL 8017 Шоколад",
    "colorCode": "#45322E",
    "image": "/uploads/pyramid-7.jpeg"
  },
  {
    "name": "RAL 3005 Вишня",
    "color": "RAL 3005 Вишня",
    "colorCode": "#5E2028",
    "image": "/uploads/pyramid-8.jpeg"
  },
  {
    "name": "RAL 8004 Терракот",
    "color": "RAL 8004 Терракот",
    "colorCode": "#8D4931",
    "image": "/uploads/pyramid-9.jpeg"
  },
  {
    "name": "RAL 3020 Красный",
    "color": "RAL 3020 Красный",
    "colorCode": "#C1121C",
    "image": "/uploads/pyramid-10.jpeg"
  },
  {
    "name": "Оцинкованный",
    "color": "Оцинкованный",
    "colorCode": "#C0C0C0",
    "image": "/uploads/pyramid-11.jpeg"
  }
];

const productName = 'Чешуя';
const category = 'Кровля';
const defaultImageUrl = variants[0].image;

// Delete existing 'Чешуя' if any to avoid duplicates
db.prepare("DELETE FROM products WHERE name = ?").run(productName);

db.prepare(`
  INSERT INTO products (name, buy_price, sell_price, image_url, category, stock, unit, variants)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`).run(productName, 0, 1800, defaultImageUrl, category, 100, 'шт', JSON.stringify(variants));

console.log('Product "Чешуя" inserted into zhest.db successfully');
