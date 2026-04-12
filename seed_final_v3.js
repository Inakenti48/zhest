const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(process.cwd(), 'zhest.db');
const db = new Database(dbPath);

// Clear existing products
db.prepare('DELETE FROM products').run();

const products = [
  // Кровля
  { name: 'Монтеррей 805', buy_price: 500, sell_price: 530, category: 'Кровля', stock: 100, unit: 'кв.м.', full_width: 1.20, useful_width: 1.10, thickness: 0.5, color: '805', image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/monterrey/metallocherepitsa-monterrey-8017.jpg' },
  { name: 'Монтеррей 807', buy_price: 500, sell_price: 530, category: 'Кровля', stock: 100, unit: 'кв.м.', full_width: 1.20, useful_width: 1.10, thickness: 0.5, color: '807', image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/monterrey/metallocherepitsa-monterrey-7024.jpg' },
  { name: 'Монтеррей 6005 Зеленый мох', buy_price: 510, sell_price: 540, category: 'Кровля', stock: 100, unit: 'кв.м.', full_width: 1.20, useful_width: 1.10, thickness: 0.5, color: '6005', image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/monterrey/metallocherepitsa-monterrey-6005.jpg' },
  { name: 'Монтеррей 8029', buy_price: 600, sell_price: 650, category: 'Кровля', stock: 100, unit: 'кв.м.', full_width: 1.20, useful_width: 1.10, thickness: 0.5, color: '8029', image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/monterrey/metallocherepitsa-monterrey-8017.jpg' },
  { name: 'Адамант 5005 Синий', buy_price: 510, sell_price: 540, category: 'Кровля', stock: 100, unit: 'кв.м.', full_width: 1.20, useful_width: 1.15, thickness: 0.5, color: '5005', image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/adamant/metallocherepitsa-adamant-5005.jpg' },
  { name: 'Адамант 8029', buy_price: 600, sell_price: 650, category: 'Кровля', stock: 100, unit: 'кв.м.', full_width: 1.20, useful_width: 1.15, thickness: 0.5, color: '8029', image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/adamant/metallocherepitsa-adamant-8017.jpg' },
  { name: 'Адамант 8017 Шоколад', buy_price: 500, sell_price: 530, category: 'Кровля', stock: 100, unit: 'кв.м.', full_width: 1.18, useful_width: 1.10, thickness: 0.5, color: '8017', image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/adamant/metallocherepitsa-adamant-8017.jpg' },
  { name: 'Адамант 7024 Графит', buy_price: 500, sell_price: 530, category: 'Кровля', stock: 100, unit: 'кв.м.', full_width: 1.18, useful_width: 1.10, thickness: 0.5, color: '7024', image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/adamant/metallocherepitsa-adamant-7024.jpg' },
  { name: 'Каскад 8004 Терракот', buy_price: 500, sell_price: 530, category: 'Кровля', stock: 100, unit: 'кв.м.', full_width: 1.20, useful_width: 1.10, thickness: 0.5, color: '8004', image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/kaskad/metallocherepitsa-kaskad-8017.jpg' },
  { name: 'Каскад 8029', buy_price: 600, sell_price: 650, category: 'Кровля', stock: 100, unit: 'кв.м.', full_width: 1.20, useful_width: 1.10, thickness: 0.5, color: '8029', image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/kaskad/metallocherepitsa-kaskad-8017.jpg' },
  { name: 'Каскад 3011 Красный', buy_price: 510, sell_price: 540, category: 'Кровля', stock: 100, unit: 'кв.м.', full_width: 1.20, useful_width: 1.10, thickness: 0.5, color: '3011', image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/kaskad/metallocherepitsa-kaskad-3011.jpg' },

  // Водосток
  { name: 'Желоб 3м', buy_price: 445, sell_price: 750, category: 'Водосток', stock: 100, unit: 'шт', full_width: null, useful_width: null, thickness: null, color: null, image_url: 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800' },
  { name: 'Крепление желоба', buy_price: 65, sell_price: 120, category: 'Водосток', stock: 100, unit: 'шт', full_width: null, useful_width: null, thickness: null, color: null, image_url: 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800' },
  { name: 'Труба 3м', buy_price: 595, sell_price: 900, category: 'Водосток', stock: 100, unit: 'шт', full_width: null, useful_width: null, thickness: null, color: null, image_url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecb?auto=format&fit=crop&q=80&w=800' },
  { name: 'Труба 1м', buy_price: 200, sell_price: 300, category: 'Водосток', stock: 100, unit: 'шт', full_width: null, useful_width: null, thickness: null, color: null, image_url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecb?auto=format&fit=crop&q=80&w=800' },
  { name: 'Колено трубы', buy_price: 180, sell_price: 350, category: 'Водосток', stock: 100, unit: 'шт', full_width: null, useful_width: null, thickness: null, color: null, image_url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecb?auto=format&fit=crop&q=80&w=800' },
  { name: 'Держатель трубы', buy_price: 65, sell_price: 150, category: 'Водосток', stock: 100, unit: 'шт', full_width: null, useful_width: null, thickness: null, color: null, image_url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecb?auto=format&fit=crop&q=80&w=800' },
  { name: 'Воронка', buy_price: 270, sell_price: 500, category: 'Водосток', stock: 100, unit: 'шт', full_width: null, useful_width: null, thickness: null, color: null, image_url: 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800' },
  { name: 'Заглушка желоба', buy_price: 70, sell_price: 200, category: 'Водосток', stock: 100, unit: 'шт', full_width: null, useful_width: null, thickness: null, color: null, image_url: 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800' },
  { name: 'Угол желоба 90°', buy_price: 150, sell_price: 500, category: 'Водосток', stock: 100, unit: 'шт', full_width: null, useful_width: null, thickness: null, color: null, image_url: 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800' },
  { name: 'Угол желоба 132°', buy_price: 200, sell_price: 600, category: 'Водосток', stock: 100, unit: 'шт', full_width: null, useful_width: null, thickness: null, color: null, image_url: 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800' },

  // Водосток Ника
  { name: 'Желоб 3м (Ника)', buy_price: 450, sell_price: 790, category: 'Водосток Ника', stock: 100, unit: 'шт', full_width: null, useful_width: null, thickness: null, color: null, image_url: 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800' },
  { name: 'Держатель желоба (Ника)', buy_price: 65, sell_price: 150, category: 'Водосток Ника', stock: 100, unit: 'шт', full_width: null, useful_width: null, thickness: null, color: null, image_url: 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800' },
  { name: 'Воронка (Ника)', buy_price: 270, sell_price: 500, category: 'Водосток Ника', stock: 100, unit: 'шт', full_width: null, useful_width: null, thickness: null, color: null, image_url: 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800' },
  { name: 'Заглушка желоба (Ника)', buy_price: 70, sell_price: 200, category: 'Водосток Ника', stock: 100, unit: 'шт', full_width: null, useful_width: null, thickness: null, color: null, image_url: 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800' },
  { name: 'Угол желоба (Ника)', buy_price: 500, sell_price: 900, category: 'Водосток Ника', stock: 100, unit: 'шт', full_width: null, useful_width: null, thickness: null, color: null, image_url: 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800' },
  { name: 'Угол желоба 135° (Ника)', buy_price: 500, sell_price: 1000, category: 'Водосток Ника', stock: 100, unit: 'шт', full_width: null, useful_width: null, thickness: null, color: null, image_url: 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800' },
  { name: 'Соединитель (Ника)', buy_price: 80, sell_price: 200, category: 'Водосток Ника', stock: 100, unit: 'шт', full_width: null, useful_width: null, thickness: null, color: null, image_url: 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800' },

  // Профнастил
  { name: 'С10 8017 Шоколад', buy_price: 450, sell_price: 480, category: 'Профнастил', stock: 100, unit: 'кв.м.', full_width: 1.18, useful_width: 1.15, thickness: 0.45, color: '8017', image_url: 'https://images.unsplash.com/photo-1620055242491-0361f67f8a70?auto=format&fit=crop&q=80&w=800' },
  { name: 'С10 7024 Графит', buy_price: 450, sell_price: 480, category: 'Профнастил', stock: 100, unit: 'кв.м.', full_width: 1.18, useful_width: 1.15, thickness: 0.45, color: '7024', image_url: 'https://images.unsplash.com/photo-1620055242491-0361f67f8a70?auto=format&fit=crop&q=80&w=800' },
  { name: 'С19 8017 Шоколад', buy_price: 460, sell_price: 495, category: 'Профнастил', stock: 100, unit: 'кв.м.', full_width: 1.15, useful_width: 1.10, thickness: 0.45, color: '8017', image_url: 'https://images.unsplash.com/photo-1620055242491-0361f67f8a70?auto=format&fit=crop&q=80&w=800' },
  { name: 'С21 8017 Шоколад', buy_price: 480, sell_price: 520, category: 'Профнастил', stock: 100, unit: 'кв.м.', full_width: 1.05, useful_width: 1.00, thickness: 0.45, color: '8017', image_url: 'https://images.unsplash.com/photo-1620055242491-0361f67f8a70?auto=format&fit=crop&q=80&w=800' },
];

const insert = db.prepare(`
  INSERT INTO products (name, buy_price, sell_price, category, stock, unit, full_width, useful_width, thickness, color, image_url) 
  VALUES (@name, @buy_price, @sell_price, @category, @stock, @unit, @full_width, @useful_width, @thickness, @color, @image_url)
`);

for (const p of products) {
  insert.run(p);
}

console.log('Successfully seeded all products into SQLite.');
