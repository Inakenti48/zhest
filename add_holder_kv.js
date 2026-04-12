import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'zhest.db');
const db = new Database(dbPath);

const variants = [
  { name: '1. RAL 3011 Красный', color: 'RAL 3011 Красный', colorCode: '#7E2D32', image_url: '/uploads/holder-kv-1.jpeg' },
  { name: '2. RAL 2004 Оранжевый', color: 'RAL 2004 Оранжевый', colorCode: '#E75B12', image_url: '/uploads/holder-kv-1.jpeg' },
  { name: '3. RAL 2009 Оранжевый яркий', color: 'RAL 2009 Оранжевый яркий', colorCode: '#F54021', image_url: '/uploads/holder-kv-1.jpeg' },
  { name: '4. RAL 8017 Коричневый', color: 'RAL 8017 Коричневый', colorCode: '#5c4a3d', image_url: '/uploads/holder-kv-8017.jpg' },
  { name: '5. RAL 7024 Графит', color: 'RAL 7024 Графит', colorCode: '#474A51', image_url: '/uploads/holder-kv-1.jpeg' },
  { name: '6. RAL 8004 Медный', color: 'RAL 8004 Медный', colorCode: '#6B3D2E', image_url: '/uploads/holder-kv-2.jpeg' },
  { name: '7. RAL 1015 Слоновая кость', color: 'RAL 1015 Слоновая кость', colorCode: '#E6D2B5', image_url: '/uploads/holder-kv-9003.jpg' },
  { name: '8. RAL 5021 Бирюзовый', color: 'RAL 5021 Бирюзовый', colorCode: '#1A6E6E', image_url: '/uploads/holder-kv-1.jpeg' },
  { name: '9. RAL 9003 Белый', color: 'RAL 9003 Белый', colorCode: '#F4F4F4', image_url: '/uploads/holder-kv-9003.jpg' },
  { name: '10. RAL 8019 Тёмно-коричневый', color: 'RAL 8019 Тёмно-коричневый', colorCode: '#403A3A', image_url: '/uploads/holder-kv-8019.jpg' },
  { name: '11. RAL 5005 Синий', color: 'RAL 5005 Синий', colorCode: '#1E4D8C', image_url: '/uploads/holder-kv-5005.jpg' },
  { name: '12. RAL 5011 Тёмно-синий', color: 'RAL 5011 Тёмно-синий', colorCode: '#1A2B3C', image_url: '/uploads/holder-kv-5005.jpg' }
];

const variantsJson = JSON.stringify(variants);

// Add Держатель желоба короткий
db.prepare('DELETE FROM products WHERE name = ?').run('Держатель желоба короткий');
db.prepare(`
  INSERT INTO products (name, buy_price, sell_price, category, stock, unit, image_url, variants)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`).run(
  'Держатель желоба короткий',
  80,
  150,
  'Квадратная водосточная система',
  1000,
  'шт',
  '/uploads/holder-kv-1.jpeg',
  variantsJson
);

// Update Угол желоба 135° внутренний if variants are empty
const corner = db.prepare('SELECT id, variants FROM products WHERE name LIKE ?').get('%Угол желоба 135%');
if (corner && (!corner.variants || corner.variants === '[]')) {
    // We'll use the same variant list structure but with different base images if possible
    // For now, let's just make sure it has variants
    db.prepare('UPDATE products SET variants = ? WHERE id = ?').run(variantsJson, corner.id);
}

console.log('Database updated successfully.');
