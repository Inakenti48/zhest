import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'zhest.db');
const db = new Database(dbPath);

const variants = [
  { name: '1. RAL 3011 Красный', color: 'RAL 3011 Красный', colorCode: '#7E2D32', image_url: '/uploads/holder-kv-1.jpeg' },
  { name: '2. RAL 3005 Вишневый', color: 'RAL 3005 Вишневый', colorCode: '#5E2028', image_url: '/uploads/holder-kv-3005.jpg' },
  { name: '3. RAL 8017 Коричневый', color: 'RAL 8017 Коричневый', colorCode: '#5c4a3d', image_url: '/uploads/holder-kv-8017.jpg' },
  { name: '4. RAL 7024 Графит', color: 'RAL 7024 Графит', colorCode: '#474A51', image_url: '/uploads/holder-kv-7004.jpg' },
  { name: '5. RAL 8004 Медный', color: 'RAL 8004 Медный', colorCode: '#6B3D2E', image_url: '/uploads/holder-kv-2.jpeg' },
  { name: '6. RAL 1015 Слоновая кость', color: 'RAL 1015 Слоновая кость', colorCode: '#E6D2B5', image_url: '/uploads/holder-kv-9002.jpg' },
  { name: '7. RAL 9003 Белый', color: 'RAL 9003 Белый', colorCode: '#F4F4F4', image_url: '/uploads/holder-kv-9003.jpg' },
  { name: '8. RAL 8019 Тёмно-коричневый', color: 'RAL 8019 Тёмно-коричневый', colorCode: '#403A3A', image_url: '/uploads/holder-kv-8019.jpg' },
  { name: '9. RAL 5005 Синий', color: 'RAL 5005 Синий', colorCode: '#1E4D8C', image_url: '/uploads/holder-kv-5005.jpg' },
  { name: '10. RAL 6005 Зеленый', color: 'RAL 6005 Зеленый', colorCode: '#2F4F2F', image_url: '/uploads/holder-kv-6005.jpg' }
];

const variantsJson = JSON.stringify(variants);

// Update product 98
db.prepare('UPDATE products SET name = ?, category = ?, variants = ?, image_url = ? WHERE id = ?').run(
  'Держатель желоба короткий',
  'Квадратная водосточная система',
  variantsJson,
  '/uploads/holder-kv-1.jpeg',
  98
);

console.log('Updated Держатель желоба короткий (ID 98)');
