
import { Database } from 'bun:sqlite';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'zhest.db');
const db = new Database(dbPath);

const variants = [
  {
    "name": "RAL 8017 Шоколад",
    "color": "#5c4a3d",
    "image": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/8017-1769100548275.jpeg"
  },
  {
    "name": "RAL 8004 Оранжевый",
    "color": "#c55a32",
    "image": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/file-1769100548278.jpg"
  },
  {
    "name": "RAL 6005 Зеленый мох",
    "color": "#1e5945",
    "image": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/6005-1769100548276.png"
  },
  {
    "name": "RAL 7024 Графитовый серый",
    "color": "#2d4a5a",
    "image": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/7024-1769100548274.jpg"
  },
  {
    "name": "RAL 3011 Коричнево-красный",
    "color": "#a54030",
    "image": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/3011-1769100548273.jpeg"
  },
  {
    "name": "RAL 5015 Небесно-синий",
    "color": "#6080a0",
    "image": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/20351_zhelob_1_m_sinij-1769100548117.jpg"
  },
  {
    "name": "RAL 9003 Белый",
    "color": "#ffffff",
    "image": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/9003-1769100548274.jpg"
  },
  {
    "name": "RAL 8017 Шоколад (вид 2)",
    "color": "#5c4a3d",
    "image": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/C430AF2F-BF99-4132-A48C-A2C2D433F54A-1769092988750.jpeg"
  },
  {
    "name": "RAL 8004 Оранжевый (вид 2)",
    "color": "#c55a32",
    "image": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/2D3B6A0F-0B03-4815-A7C0-18F5B8F10BFE-1769092988693.jpeg"
  },
  {
    "name": "RAL 9005 Черный",
    "color": "#0a0a0a",
    "image": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/604AF50A-EB87-4C5B-9125-CE222260A907-1769092988694.jpeg"
  },
  {
    "name": "RAL 1015 Слоновая кость",
    "color": "#e6d2b5",
    "image": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/74FA3A95-AA7E-4B53-9C6B-F3C7C04B9849-1769092988694.jpeg"
  },
  {
    "name": "RAL 8007 Коричневый",
    "color": "#703731",
    "image": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2aa9f85f-5a96-42c4-a082-49fd6aa733ea/E69EF4A8-CBFC-4A5C-8D0A-6BE5EDB91095-1769092988696.jpeg"
  }
];

db.query('UPDATE products SET name = ?, variants = ? WHERE id = ?').run(
  'Желоб 3м',
  JSON.stringify(variants),
  152
);

console.log('Product 152 updated successfully with name "Желоб 3м" and variants.');
