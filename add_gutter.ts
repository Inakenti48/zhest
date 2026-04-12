import { Database } from "bun:sqlite";

const db = new Database("zhest.db");

const variants = JSON.stringify([
  {"color": "Синий", "colorCode": "#5B7BA0", "image_url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5003-1768497142842.JPG?width=8000&height=8000&resize=contain"},
  {"color": "Голубой", "colorCode": "#6B8AB0", "image_url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5004-1768497142815.JPG?width=8000&height=8000&resize=contain"},
  {"color": "Терракот", "colorCode": "#A04030", "image_url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5006-1768497142814.JPG?width=8000&height=8000&resize=contain"},
  {"color": "Оранжевый", "colorCode": "#C05030", "image_url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5007-1768497142813.JPG?width=8000&height=8000&resize=contain"},
  {"color": "Зеленый", "colorCode": "#2D6B4F", "image_url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5008-1768497159825.JPG?width=8000&height=8000&resize=contain"},
  {"color": "Серый", "colorCode": "#A0A0A0", "image_url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5009-1768497154809.JPG?width=8000&height=8000&resize=contain"},
  {"color": "Бежевый", "colorCode": "#C8B8A0", "image_url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5010-1768497142813.JPG?width=8000&height=8000&resize=contain"},
  {"color": "Красный", "colorCode": "#C03030", "image_url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5011-1768497142812.JPG?width=8000&height=8000&resize=contain"},
  {"color": "Коричневый", "colorCode": "#806830", "image_url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5012-1768497142813.JPG?width=8000&height=8000&resize=contain"}
]);

db.run(`
  INSERT INTO products (name, buy_price, sell_price, image_url, stock, category, unit, variants)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`,
  'Желоб квадратный',
  2000,
  2500,
  'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5003-1768497142842.JPG?width=8000&height=8000&resize=contain',
  100,
  'Водосточные системы',
  'м.п.',
  variants
);

console.log('Товар "Желоб квадратный" добавлен!');
db.close();
