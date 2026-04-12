const { Client } = require('pg');

const connectionString = 'postgresql://postgres.hbsxbdkweqdqrkkmkhjd:mZpp7EV85t9NLhBStECj4eKK7YEQ4AKsS9JqiKiqpaErqulBzhg2Ys8LcZLNCFXE@aws-0-us-west-2.pooler.supabase.com:5432/postgres';

const products = [
  // Кровля: Монтеррей
  ['Монтеррей 805', 500, 530, 'Кровля', 100, 'кв.м.', 1.20, 1.10, 0.5, '805', 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/monterrey/metallocherepitsa-monterrey-8017.jpg'],
  ['Монтеррей 807', 500, 530, 'Кровля', 100, 'кв.м.', 1.20, 1.10, 0.5, '807', 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/monterrey/metallocherepitsa-monterrey-7024.jpg'],
  ['Монтеррей 6005 Зеленый мох', 510, 540, 'Кровля', 100, 'кв.м.', 1.20, 1.10, 0.5, '6005', 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/monterrey/metallocherepitsa-monterrey-6005.jpg'],
  ['Монтеррей 8029', 600, 650, 'Кровля', 100, 'кв.м.', 1.20, 1.10, 0.5, '8029', 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/monterrey/metallocherepitsa-monterrey-8017.jpg'],
  
  // Кровля: Адамант
  ['Адамант 5005 Синий', 510, 540, 'Кровля', 100, 'кв.м.', 1.20, 1.15, 0.5, '5005', 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/adamant/metallocherepitsa-adamant-5005.jpg'],
  ['Адамант 8029', 600, 650, 'Кровля', 100, 'кв.м.', 1.20, 1.15, 0.5, '8029', 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/adamant/metallocherepitsa-adamant-8017.jpg'],
  ['Адамант 8017 Шоколад', 500, 530, 'Кровля', 100, 'кв.м.', 1.18, 1.10, 0.5, '8017', 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/adamant/metallocherepitsa-adamant-8017.jpg'],
  ['Адамант 7024 Графит', 500, 530, 'Кровля', 100, 'кв.м.', 1.18, 1.10, 0.5, '7024', 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/adamant/metallocherepitsa-adamant-7024.jpg'],
  
  // Кровля: Каскад
  ['Каскад 8004 Терракот', 500, 530, 'Кровля', 100, 'кв.м.', 1.20, 1.10, 0.5, '8004', 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/kaskad/metallocherepitsa-kaskad-8017.jpg'],
  ['Каскад 8029', 600, 650, 'Кровля', 100, 'кв.м.', 1.20, 1.10, 0.5, '8029', 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/kaskad/metallocherepitsa-kaskad-8017.jpg'],
  ['Каскад 3011 Красный', 510, 540, 'Кровля', 100, 'кв.м.', 1.20, 1.10, 0.5, '3011', 'https://vsyakrovlya.ru/image/catalog/tovary/metallocherepitsa/kaskad/metallocherepitsa-kaskad-3011.jpg'],
  
  // Водосток
  ['Желоб 3м', 445, 750, 'Водосток', 100, 'шт', null, null, null, null, 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800'],
  ['Крепление желоба', 65, 120, 'Водосток', 100, 'шт', null, null, null, null, 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800'],
  ['Труба 3м', 595, 900, 'Водосток', 100, 'шт', null, null, null, null, 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecb?auto=format&fit=crop&q=80&w=800'],
  ['Труба 1м', 200, 300, 'Водосток', 100, 'шт', null, null, null, null, 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecb?auto=format&fit=crop&q=80&w=800'],
  ['Колено трубы', 180, 350, 'Водосток', 100, 'шт', null, null, null, null, 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecb?auto=format&fit=crop&q=80&w=800'],
  ['Держатель трубы', 65, 150, 'Водосток', 100, 'шт', null, null, null, null, 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecb?auto=format&fit=crop&q=80&w=800'],
  ['Воронка', 270, 500, 'Водосток', 100, 'шт', null, null, null, null, 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800'],
  ['Заглушка желоба', 70, 200, 'Водосток', 100, 'шт', null, null, null, null, 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800'],
  ['Угол желоба 90°', 150, 500, 'Водосток', 100, 'шт', null, null, null, null, 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800'],
  ['Угол желоба 132°', 200, 600, 'Водосток', 100, 'шт', null, null, null, null, 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800'],
  
  // Водосток Ника
  ['Желоб 3м (Ника)', 450, 790, 'Водосток Ника', 100, 'шт', null, null, null, null, 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800'],
  ['Держатель желоба (Ника)', 65, 150, 'Водосток Ника', 100, 'шт', null, null, null, null, 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800'],
  ['Воронка (Ника)', 270, 500, 'Водосток Ника', 100, 'шт', null, null, null, null, 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800'],
  ['Заглушка желоба (Ника)', 70, 200, 'Водосток Ника', 100, 'шт', null, null, null, null, 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800'],
  ['Угол желоба (Ника)', 500, 900, 'Водосток Ника', 100, 'шт', null, null, null, null, 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800'],
  ['Угол желоба 135° (Ника)', 500, 1000, 'Водосток Ника', 100, 'шт', null, null, null, null, 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800'],
  ['Соединитель (Ника)', 80, 200, 'Водосток Ника', 100, 'шт', null, null, null, null, 'https://images.unsplash.com/photo-1634629402543-5f05df34006c?auto=format&fit=crop&q=80&w=800'],
  
  // Профнастил
  ['С10 8017 Шоколад', 450, 480, 'Профнастил', 100, 'кв.м.', 1.18, 1.15, 0.45, '8017', 'https://images.unsplash.com/photo-1620055242491-0361f67f8a70?auto=format&fit=crop&q=80&w=800'],
  ['С10 7024 Графит', 450, 480, 'Профнастил', 100, 'кв.м.', 1.18, 1.15, 0.45, '7024', 'https://images.unsplash.com/photo-1620055242491-0361f67f8a70?auto=format&fit=crop&q=80&w=800'],
  ['С19 8017 Шоколад', 460, 495, 'Профнастил', 100, 'кв.м.', 1.15, 1.10, 0.45, '8017', 'https://images.unsplash.com/photo-1620055242491-0361f67f8a70?auto=format&fit=crop&q=80&w=800'],
  ['С21 8017 Шоколад', 480, 520, 'Профнастил', 100, 'кв.м.', 1.05, 1.00, 0.45, '8017', 'https://images.unsplash.com/photo-1620055242491-0361f67f8a70?auto=format&fit=crop&q=80&w=800'],
];

async function seed() {
  const client = new Client({ connectionString });
  await client.connect();
  
  try {
    console.log('Clearing products...');
    await client.query('DELETE FROM products');
    
    console.log('Inserting products...');
    const query = 'INSERT INTO products (name, buy_price, sell_price, category, stock, unit, full_width, useful_width, thickness, color, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
    
    for (const product of products) {
      await client.query(query, product);
    }
    
    console.log('Success! All products seeded.');
  } catch (err) {
    console.error('Error seeding products:', err);
  } finally {
    await client.end();
  }
}

seed();
