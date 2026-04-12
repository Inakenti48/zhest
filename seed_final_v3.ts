import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'zhest.db');
const db = new Database(dbPath);

// Clear existing products as requested ("предыдущие убери")
db.prepare('DELETE FROM products').run();

const products = [
  // Монтеррей
  {
    name: 'Монтеррей 805',
    buy_price: 500,
    sell_price: 530,
    category: 'Кровля',
    stock: 100,
    unit: 'кв.м.',
    full_width: 1.20,
    useful_width: 1.10,
    thickness: 0.5,
    color: '805',
    image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/monterrey/metallocherepitsa-monterrey-8017.jpg'
  },
  {
    name: 'Монтеррей 807',
    buy_price: 500,
    sell_price: 530,
    category: 'Кровля',
    stock: 100,
    unit: 'кв.м.',
    full_width: 1.20,
    useful_width: 1.10,
    thickness: 0.5,
    color: '807',
    image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/monterrey/metallocherepitsa-monterrey-7024.jpg'
  },
  {
    name: 'Монтеррей 6005 Зеленый мох',
    buy_price: 510,
    sell_price: 540,
    category: 'Кровля',
    stock: 100,
    unit: 'кв.м.',
    full_width: 1.20,
    useful_width: 1.10,
    thickness: 0.5,
    color: '6005',
    image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/monterrey/metallocherepitsa-monterrey-6005.jpg'
  },
  {
    name: 'Монтеррей 8029',
    buy_price: 600,
    sell_price: 650,
    category: 'Кровля',
    stock: 100,
    unit: 'кв.м.',
    full_width: 1.20,
    useful_width: 1.10,
    thickness: 0.5,
    color: '8029',
    image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/monterrey/metallocherepitsa-monterrey-8017.jpg'
  },
  
  // Адамант
  {
    name: 'Адамант 5005 Синий',
    buy_price: 510,
    sell_price: 540,
    category: 'Кровля',
    stock: 100,
    unit: 'кв.м.',
    full_width: 1.20,
    useful_width: 1.15,
    thickness: 0.5,
    color: '5005',
    image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/adamant/metallocherepitsa-adamant-5005.jpg'
  },
  {
    name: 'Адамант 8029',
    buy_price: 600,
    sell_price: 650,
    category: 'Кровля',
    stock: 100,
    unit: 'кв.м.',
    full_width: 1.20,
    useful_width: 1.15,
    thickness: 0.5,
    color: '8029',
    image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/adamant/metallocherepitsa-adamant-8017.jpg'
  },
  {
    name: 'Адамант 8017 Шоколад',
    buy_price: 500,
    sell_price: 530,
    category: 'Кровля',
    stock: 100,
    unit: 'кв.м.',
    full_width: 1.18,
    useful_width: 1.10,
    thickness: 0.5,
    color: '8017',
    image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/adamant/metallocherepitsa-adamant-8017.jpg'
  },
  {
    name: 'Адамант 7024 Графит',
    buy_price: 500,
    sell_price: 530,
    category: 'Кровля',
    stock: 100,
    unit: 'кв.м.',
    full_width: 1.18,
    useful_width: 1.10,
    thickness: 0.5,
    color: '7024',
    image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/adamant/metallocherepitsa-adamant-7024.jpg'
  },

  // Каскад
  {
    name: 'Каскад 8004 Терракот',
    buy_price: 500,
    sell_price: 530,
    category: 'Кровля',
    stock: 100,
    unit: 'кв.м.',
    full_width: 1.20,
    useful_width: 1.10,
    thickness: 0.5,
    color: '8004',
    image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/kaskad/metallocherepitsa-kaskad-8017.jpg'
  },
  {
    name: 'Каскад 8029',
    buy_price: 600,
    sell_price: 650,
    category: 'Кровля',
    stock: 100,
    unit: 'кв.м.',
    full_width: 1.20,
    useful_width: 1.10,
    thickness: 0.5,
    color: '8029',
    image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/kaskad/metallocherepitsa-kaskad-8017.jpg'
  },
  {
    name: 'Каскад 3011 Красный',
    buy_price: 510,
    sell_price: 540,
    category: 'Кровля',
    stock: 100,
    unit: 'кв.м.',
    full_width: 1.20,
    useful_width: 1.10,
    thickness: 0.5,
    color: '3011',
    image_url: 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/kaskad/metallocherepitsa-kaskad-3011.jpg'
  }
];

const insert = db.prepare(`
  INSERT INTO products (name, buy_price, sell_price, category, stock, unit, full_width, useful_width, thickness, color, image_url) 
  VALUES (@name, @buy_price, @sell_price, @category, @stock, @unit, @full_width, @useful_width, @thickness, @color, @image_url)
`);

for (const p of products) {
  insert.run(p);
}

console.log('Products re-seeded successfully with user requested data.');
