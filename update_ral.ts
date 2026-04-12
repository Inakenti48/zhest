import { Database } from 'bun:sqlite';

const db = new Database('zhest.db');

const ralColors: Record<string, string> = {
  '1015': 'Слоновая кость',
  '3005': 'Винно-красный', 
  '3009': 'Красная окись',
  '3011': 'Коричнево-красный',
  '4009': 'Пастельно-фиолетовый',
  '5002': 'Ультрамарин',
  '5005': 'Сигнальный синий',
  '5011': 'Стальной синий',
  '5015': 'Небесно-синий',
  '6005': 'Зеленый мох',
  '6020': 'Хромовый зеленый',
  '7024': 'Графитовый серый',
  '8004': 'Медно-коричневый',
  '8005': 'Орехово-коричневый',
  '8007': 'Олень коричневый',
  '8017': 'Шоколадно-коричневый',
  '8019': 'Серо-коричневый',
  '8024': 'Бежево-коричневый',
  '8029': 'Жемчужно-медный',
  '9003': 'Сигнальный белый',
  '9010': 'Чистый белый',
};

const colorToRal: Record<string, string> = {
  'белый': 'RAL 9003 Сигнальный белый',
  'зеленый': 'RAL 6005 Зеленый мох',
  'зелёный': 'RAL 6005 Зеленый мох',
  'темно-зеленый': 'RAL 6005 Зеленый мох',
  'синий': 'RAL 5015 Небесно-синий',
  'темно-синий': 'RAL 5011 Стальной синий',
  'фиолетовый': 'RAL 4009 Пастельно-фиолетовый',
  'сиреневый': 'RAL 4009 Пастельно-фиолетовый',
  'красный': 'RAL 3011 Коричнево-красный',
  'бордовый': 'RAL 3005 Винно-красный',
  'вишневый': 'RAL 3005 Винно-красный',
  'вишнёвый': 'RAL 3005 Винно-красный',
  'коричневый': 'RAL 8017 Шоколадно-коричневый',
  'темно-коричневый': 'RAL 8019 Серо-коричневый',
  'бежевый': 'RAL 1015 Слоновая кость',
  'терракот': 'RAL 8004 Медно-коричневый',
  'терракотовый': 'RAL 8004 Медно-коричневый',
  'террактовый': 'RAL 8004 Медно-коричневый',
  'оранжевый': 'RAL 8004 Медно-коричневый',
  'коралловый': 'RAL 8004 Медно-коричневый',
  'кирпичный': 'RAL 8004 Медно-коричневый',
  'графит': 'RAL 7024 Графитовый серый',
  'графитовый': 'RAL 7024 Графитовый серый',
  'серый': 'RAL 7024 Графитовый серый',
  'серебро': 'Оцинкованный',
  'голубой': 'RAL 5015 Небесно-синий',
  'шоколад': 'RAL 8017 Шоколадно-коричневый',
  'шоколадный': 'RAL 8017 Шоколадно-коричневый',
  'изумрудный': 'RAL 6005 Зеленый мох',
  'светло-зеленый': 'RAL 6018 Желто-зеленый',
  'салатовый': 'RAL 6018 Желто-зеленый',
  'золотой': 'RAL 1036 Перламутрово-золотой',
  'песочный': 'RAL 1015 Слоновая кость',
  'чёрный': 'RAL 9005 Черный',
  'черный': 'RAL 9005 Черный',
  'стальной': 'RAL 7046 Телегрей',
  'серебристый': 'Оцинкованный',
  'светло-серый': 'RAL 7035 Светло-серый',
};

function updateColorName(name: string): string {
  if (!name) return name;
  
  const lowerName = name.toLowerCase().trim();
  
  if (lowerName.startsWith('ral ')) {
    const match = lowerName.match(/ral\s*(\d{4})\s*(.*)?/i);
    if (match) {
      const ralNum = match[1];
      const existingName = match[2]?.trim();
      const officialName = ralColors[ralNum];
      if (officialName && !existingName) {
        return `RAL ${ralNum} ${officialName}`;
      }
      return name;
    }
  }
  
  const ralMatch = lowerName.match(/(\d{4})\s*(.*)?/);
  if (ralMatch) {
    const ralNum = ralMatch[1];
    const existingName = ralMatch[2]?.trim();
    const officialName = ralColors[ralNum];
    if (officialName) {
      return `RAL ${ralNum} ${officialName}`;
    }
    return `RAL ${name}`;
  }
  
  const simpleMatch = name.match(/^([а-яёa-z\-]+)\s+(\d{4})$/i);
  if (simpleMatch) {
    const colorName = simpleMatch[1];
    const ralNum = simpleMatch[2];
    const officialName = ralColors[ralNum];
    if (officialName) {
      return `RAL ${ralNum} ${officialName}`;
    }
    return `RAL ${ralNum} ${colorName}`;
  }
  
  if (colorToRal[lowerName]) {
    return colorToRal[lowerName];
  }
  
  for (const [key, value] of Object.entries(colorToRal)) {
    if (lowerName.includes(key)) {
      return value;
    }
  }
  
  return name;
}

const products = db.prepare('SELECT id, name, variants FROM products WHERE variants IS NOT NULL AND variants != \'[]\' AND variants != \'null\'').all() as any[];

for (const product of products) {
  try {
    const variants = JSON.parse(product.variants);
    let updated = false;
    
    for (const variant of variants) {
      const colorField = variant.name || variant.color;
      if (colorField) {
        const newName = updateColorName(colorField);
        if (newName !== colorField) {
          if (variant.name) variant.name = newName;
          if (variant.color) variant.color = newName;
          updated = true;
        }
      }
    }
    
    if (updated) {
      const newVariants = JSON.stringify(variants);
      db.prepare('UPDATE products SET variants = ? WHERE id = ?').run(newVariants, product.id);
      console.log(`Updated product ${product.id}: ${product.name}`);
    }
  } catch (e) {
    console.error(`Error processing product ${product.id}:`, e);
  }
}

console.log('Done!');
db.close();
