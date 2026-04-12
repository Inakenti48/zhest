import { Database } from "bun:sqlite";

const db = new Database("zhest.db");

const variants = JSON.stringify([
  {"color": "Сиреневый", "colorCode": "#9B8BA0", "image_url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5013-1768497692586.JPG?width=8000&height=8000&resize=contain"},
  {"color": "Темно-синий", "colorCode": "#2C3E50", "image_url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5014-1768497692680.JPG?width=8000&height=8000&resize=contain"},
  {"color": "Синий", "colorCode": "#0066CC", "image_url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5015-1768497692584.JPG?width=8000&height=8000&resize=contain"},
  {"color": "Терракот", "colorCode": "#A04030", "image_url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5016-1768497692585.JPG?width=8000&height=8000&resize=contain"},
  {"color": "Кирпичный", "colorCode": "#B03020", "image_url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5017-1768497694183.JPG?width=8000&height=8000&resize=contain"},
  {"color": "Серебро", "colorCode": "#C0C0C0", "image_url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5018-1768497692637.JPG?width=8000&height=8000&resize=contain"},
  {"color": "Вишневый", "colorCode": "#6B1010", "image_url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5019-1768497692597.JPG?width=8000&height=8000&resize=contain"},
  {"color": "Красный", "colorCode": "#CC2020", "image_url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5020-1768497692585.JPG?width=8000&height=8000&resize=contain"},
  {"color": "Бежевый", "colorCode": "#C8B8A0", "image_url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5021-1768497692584.JPG?width=8000&height=8000&resize=contain"},
  {"color": "Зеленый", "colorCode": "#228B22", "image_url": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5022-1768497692589.JPG?width=8000&height=8000&resize=contain"}
]);

db.run(
  "INSERT INTO products (name, buy_price, sell_price, image_url, stock, category, unit, variants) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  'Держатель труб',
  300,
  450,
  'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/IMG_5013-1768497692586.JPG?width=8000&height=8000&resize=contain',
  100,
  'Водосточные системы',
  'шт',
  variants
);

console.log('Товар "Держатель труб" добавлен!');
db.close();
