import { Database } from 'bun:sqlite';

const db = new Database('zhest.db');

const screwVariants = [
  { name: "RAL 9003", image: "/uploads/screw-white.png" },
  { name: "RAL 8017", image: "/uploads/screw-brown-1.jpeg" },
  { name: "RAL 8014", image: "/uploads/screw-brown-2.png" },
  { name: "RAL 8004", image: "/uploads/screw-brown-3.png" },
  { name: "RAL 8019", image: "/uploads/screw-brown-4.png" },
  { name: "RAL 3005", image: "/uploads/screw-red-1.png" },
  { name: "RAL 3011", image: "/uploads/screw-red-2.png" },
  { name: "RAL 2004", image: "/uploads/screw-orange.png" },
  { name: "RAL 9005", image: "/uploads/screw-black.png" },
  { name: "RAL 7024", image: "/uploads/screw-gray.png" },
  { name: "RAL 1015", image: "/uploads/screw-beige.png" },
  { name: "RAL 6005", image: "/uploads/screw-green.png" },
  { name: "RAL 5005", image: "/uploads/screw-blue.png" },
];

db.run(`
  INSERT INTO products (name, buy_price, sell_price, image_url, stock, category, unit, variants)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`, [
  'Саморезы',
  5,
  15,
  '/uploads/screw-white.png',
  1000,
  'Крепёж',
  'шт',
  JSON.stringify(screwVariants)
]);

console.log('Саморезы добавлены с 13 вариантами!');
