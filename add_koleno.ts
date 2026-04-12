import { Database } from 'bun:sqlite';
const db = new Database('./zhest.db');

const variants = JSON.stringify([
  {name:'RAL 9005 Чёрный',color:'RAL 9005 Чёрный',colorCode:'#0A0A0A',image_url:'/uploads/koleno-black.png'},
  {name:'RAL 5005 Синий',color:'RAL 5005 Синий',colorCode:'#1E4D8C',image_url:'/uploads/koleno-blue.png'},
  {name:'RAL 1015 Слоновая кость',color:'RAL 1015 Слоновая кость',colorCode:'#E6D2B5',image_url:'/uploads/koleno-ivory.png'},
  {name:'RAL 9003 Белый',color:'RAL 9003 Белый',colorCode:'#F4F4F4',image_url:'/uploads/koleno-white.webp'},
  {name:'RAL 7024 Графит',color:'RAL 7024 Графит',colorCode:'#474A51',image_url:'/uploads/koleno-grafit.png'},
  {name:'RAL 2004 Оранжевый',color:'RAL 2004 Оранжевый',colorCode:'#E75B12',image_url:'/uploads/koleno-orange.png'}
]);

const stmt = db.prepare('INSERT INTO products (name, category, buy_price, sell_price, image_url, variants, stock) VALUES (?, ?, ?, ?, ?, ?, ?)');
stmt.run('Колено квадратной водосточной системы', 'Квадратная водосточная система', 500, 850, '/uploads/koleno-black.png', variants, 100);
console.log('Добавлено!');
