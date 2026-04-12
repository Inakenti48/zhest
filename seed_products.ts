import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'zhest.db');
const db = new Database(dbPath);

const products = [
  { name: 'Монтеррей 8017 Шоколад', buy_price: 500, sell_price: 530, category: 'Кровля', stock: 100, unit: 'кв.м.', full_width: 1.20, useful_width: 1.10, thickness: 0.5, color: '8017', image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/monterrey/metallocherepitsa-monterrey-8017.jpg' },
  { name: 'Монтеррей 7024 Графит', buy_price: 500, sell_price: 530, category: 'Кровля', stock: 100, unit: 'кв.м.', full_width: 1.20, useful_width: 1.10, thickness: 0.5, color: '7024', image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/monterrey/metallocherepitsa-monterrey-7024.jpg' },
  { name: 'Монтеррей 8004 Терракот', buy_price: 500, sell_price: 530, category: 'Кровля', stock: 100, unit: 'кв.м.', full_width: 1.20, useful_width: 1.10, thickness: 0.5, color: '8004', image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/monterrey/metallocherepitsa-monterrey-8004.jpg' },
  { name: 'Монтеррей 805', buy_price: 500, sell_price: 530, category: 'Кровля', stock: 100, unit: 'кв.м.', full_width: 1.20, useful_width: 1.10, thickness: 0.5, color: '805', image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/monterrey/metallocherepitsa-monterrey-8017.jpg' },
  { name: 'Монтеррей 807', buy_price: 500, sell_price: 530, category: 'Кровля', stock: 100, unit: 'кв.м.', full_width: 1.20, useful_width: 1.10, thickness: 0.5, color: '807', image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/monterrey/metallocherepitsa-monterrey-7024.jpg' }
];

const insert = db.prepare(`
  INSERT INTO products (name, buy_price, sell_price, category, stock, unit, full_width, useful_width, thickness, color, image_url) 
  VALUES (@name, @buy_price, @sell_price, @category, @stock, @unit, @full_width, @useful_width, @thickness, @color, @image_url)
`);

for (const p of products) {
  insert.run(p);
}

console.log('Products seeded successfully');
