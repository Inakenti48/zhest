import db from './src/lib/db';
const products = db.prepare('SELECT * FROM products WHERE name LIKE ?').all('%Пирамида%');
console.log(JSON.stringify(products, null, 2));
