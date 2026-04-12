module.exports = [
"[project]/src/lib/db.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$better$2d$sqlite3$29$__ = __turbopack_context__.i("[externals]/better-sqlite3 [external] (better-sqlite3, cjs, [project]/node_modules/better-sqlite3)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const dbPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].resolve(process.cwd(), 'zhest.db');
const db = new __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$better$2d$sqlite3$29$__["default"](dbPath);
// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'admin'
  );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      buy_price REAL NOT NULL,
      sell_price REAL NOT NULL,
      image_url TEXT,
      category TEXT DEFAULT 'Общее',
      stock REAL DEFAULT 0,
      unit TEXT DEFAULT 'шт',
      full_width REAL,
      useful_width REAL,
        thickness REAL,
        color TEXT,
        variants TEXT,
        image_padding INTEGER DEFAULT 0,
        image_scale REAL DEFAULT 1.0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

  CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    product_name TEXT,
    quantity REAL NOT NULL,
    total_price REAL NOT NULL,
    payment_method TEXT DEFAULT 'Наличными',
    sale_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    total_price REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity REAL NOT NULL,
    price_at_time REAL NOT NULL,
    unit TEXT DEFAULT 'шт',
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE INDEX IF NOT EXISTS idx_sales_product_id ON sales(product_id);
  CREATE INDEX IF NOT EXISTS idx_sales_sale_date ON sales(sale_date);
  CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
  CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
  CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    pin TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS work_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    products_made TEXT,
    total_items INTEGER DEFAULT 0,
    work_date DATE DEFAULT (DATE('now')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
  );

  CREATE INDEX IF NOT EXISTS idx_work_logs_employee_id ON work_logs(employee_id);
  CREATE INDEX IF NOT EXISTS idx_work_logs_work_date ON work_logs(work_date);
`);
// Migration for existing databases
const migrations = [
    "ALTER TABLE products ADD COLUMN category TEXT DEFAULT 'Общее'",
    "ALTER TABLE products ADD COLUMN unit TEXT DEFAULT 'шт'",
    "ALTER TABLE sales ADD COLUMN product_name TEXT",
    "ALTER TABLE sales ADD COLUMN payment_method TEXT DEFAULT 'Наличными'",
    "ALTER TABLE order_items ADD COLUMN unit TEXT DEFAULT 'шт'",
    "ALTER TABLE products ADD COLUMN full_width REAL",
    "ALTER TABLE products ADD COLUMN useful_width REAL",
    "ALTER TABLE products ADD COLUMN thickness REAL",
    "ALTER TABLE products ADD COLUMN color TEXT",
    "ALTER TABLE products ADD COLUMN variants TEXT",
    "ALTER TABLE products ADD COLUMN image_padding INTEGER DEFAULT 0",
    "ALTER TABLE products ADD COLUMN image_scale REAL DEFAULT 1.0",
    "ALTER TABLE products ADD COLUMN sizes TEXT"
];
for (const sql of migrations){
    try {
        db.prepare(sql).run();
    } catch (e) {
    // Column already exists or other error
    }
}
// Insert default admin if not exists
const adminExists = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
if (!adminExists) {
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', 'admin123');
}
const __TURBOPACK__default__export__ = db;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/src/lib/product-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"006aaf6b3f5abc44a11c1aaa25cce71d70f6adb7dd":"getOrders","00c6c30db9c8c0ed9e500ae55b68405f7f46f9107b":"getProducts","405928a053d73e6740f1c7223973fe5f5a8c7b4f24":"saveReportToFile","4068047fbe6e0f1a99dda2fe518dbece1b34296774":"addProduct","40bd9d72953f42d214d67457348347921795bdc87a":"updateProduct","40ec1de7e4ca5688f9b67aa46e49f4af665e7f5ed9":"deleteProduct","60981819606304e39056a22bbcead56494e1b0d651":"updateOrderStatus","60c67c4f8aeaa1f3589b896f7ee17594cd85cbbaf4":"createOrder","60c6f19fc42a7302e9e353fef9cd632a9b153ebde8":"updateStock","78b243d7993befc5655d3ab775323904abb39fdf15":"registerSale","7f097121fe04b0d970160a621cdc9cb475f9c2755a":"getRecentSales","7f2e6c3ffe8900292bc4aa52e0b39ad942eb2ce605":"getCategories","7fbe037d5c8a9f497085f86093b9809e54f8b93b6c":"getSalesStats"},"",""] */ __turbopack_context__.s([
    "addProduct",
    ()=>addProduct,
    "createOrder",
    ()=>createOrder,
    "deleteProduct",
    ()=>deleteProduct,
    "getCategories",
    ()=>getCategories,
    "getOrders",
    ()=>getOrders,
    "getProducts",
    ()=>getProducts,
    "getRecentSales",
    ()=>getRecentSales,
    "getSalesStats",
    ()=>getSalesStats,
    "registerSale",
    ()=>registerSale,
    "saveReportToFile",
    ()=>saveReportToFile,
    "updateOrderStatus",
    ()=>updateOrderStatus,
    "updateProduct",
    ()=>updateProduct,
    "updateStock",
    ()=>updateStock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function uploadFile(file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    // Add random suffix to prevent collisions
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const fileName = `${Date.now()}-${randomSuffix}.${fileExt}`;
    const uploadDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'public', 'uploads');
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(uploadDir)) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(uploadDir, {
            recursive: true
        });
    }
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(uploadDir, fileName);
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(filePath, buffer);
    return `/uploads/${fileName}`;
}
async function getProducts() {
    const products = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('SELECT * FROM products ORDER BY created_at DESC').all();
    return products;
}
const getSalesStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async ()=>{
    const sales = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
    SELECT s.*, p.buy_price, p.name as product_name 
    FROM sales s 
    LEFT JOIN products p ON s.product_id = p.id
  `).all();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterday = today - 86400000;
    const last7Days = today - 7 * 86400000;
    const last14Days = today - 14 * 86400000;
    const last30Days = today - 30 * 86400000;
    const last60Days = today - 60 * 86400000;
    const stats = {
        daily_total: 0,
        daily_profit: 0,
        prev_daily_total: 0,
        weekly_total: 0,
        weekly_profit: 0,
        prev_weekly_total: 0,
        monthly_total: 0,
        monthly_profit: 0,
        prev_monthly_total: 0
    };
    sales.forEach((s)=>{
        const saleDate = new Date(s.sale_date).getTime();
        const total = Number(s.total_price);
        const buyPrice = s.buy_price || 0;
        const cost = Number(buyPrice) * Number(s.quantity);
        const profit = total - cost;
        if (saleDate >= today) {
            stats.daily_total += total;
            stats.daily_profit += profit;
        } else if (saleDate >= yesterday && saleDate < today) {
            stats.prev_daily_total += total;
        }
        if (saleDate >= last7Days) {
            stats.weekly_total += total;
            stats.weekly_profit += profit;
        } else if (saleDate >= last14Days && saleDate < last7Days) {
            stats.prev_weekly_total += total;
        }
        if (saleDate >= last30Days) {
            stats.monthly_total += total;
            stats.monthly_profit += profit;
        } else if (saleDate >= last60Days && saleDate < last30Days) {
            stats.prev_monthly_total += total;
        }
    });
    const chartMap = new Map();
    sales.filter((s)=>new Date(s.sale_date).getTime() >= last30Days).forEach((s)=>{
        const d = new Date(s.sale_date).toISOString().split('T')[0];
        chartMap.set(d, (chartMap.get(d) || 0) + Number(s.total_price));
    });
    const chartData = Array.from(chartMap.entries()).map(([date, amount])=>({
            date,
            amount
        })).sort((a, b)=>a.date.localeCompare(b.date));
    const monthlyMap = new Map();
    sales.forEach((s)=>{
        const d = new Date(s.sale_date);
        const m = d.getMonth() + 1;
        monthlyMap.set(m, (monthlyMap.get(m) || 0) + Number(s.total_price));
    });
    const monthlyAnalysis = Array.from(monthlyMap.entries()).map(([month, total])=>({
            month: String(month).padStart(2, '0'),
            total
        })).sort((a, b)=>b.month.localeCompare(a.month));
    const weeklyMap = new Map();
    sales.filter((s)=>new Date(s.sale_date).getTime() >= last30Days).forEach((s)=>{
        const d = new Date(s.sale_date);
        const week = Math.ceil((d.getDate() - 1 + new Date(d.getFullYear(), d.getMonth(), 1).getDay()) / 7);
        weeklyMap.set(week, (weeklyMap.get(week) || 0) + Number(s.total_price));
    });
    const weeklyAnalysis = Array.from(weeklyMap.entries()).map(([week, total])=>({
            week: String(week),
            total
        })).sort((a, b)=>b.week.localeCompare(a.week));
    const calculateTrend = (current, previous)=>{
        if (!previous || previous === 0) return current > 0 ? 100 : 0;
        return Math.round((current - previous) / previous * 100);
    };
    return {
        daily: {
            total: stats.daily_total,
            profit: stats.daily_profit,
            trend: calculateTrend(stats.daily_total, stats.prev_daily_total)
        },
        weekly: {
            total: stats.weekly_total,
            profit: stats.weekly_profit,
            trend: calculateTrend(stats.weekly_total, stats.prev_weekly_total)
        },
        monthly: {
            total: stats.monthly_total,
            profit: stats.monthly_profit,
            trend: calculateTrend(stats.monthly_total, stats.prev_monthly_total)
        },
        chartData,
        monthlyAnalysis,
        weeklyAnalysis
    };
});
const getRecentSales = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async ()=>{
    const sales = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
    SELECT s.*, p.name as product_name 
    FROM sales s 
    LEFT JOIN products p ON s.product_id = p.id 
    ORDER BY s.sale_date DESC 
    LIMIT 10
  `).all();
    return sales;
});
async function addProduct(formData) {
    const name = formData.get('name');
    const buy_price = parseFloat(formData.get('buy_price'));
    const sell_price = parseFloat(formData.get('sell_price'));
    const stock = parseFloat(formData.get('stock')) || 0;
    const unit = formData.get('unit') || 'шт';
    const category = formData.get('category') || 'Общее';
    const full_width = parseFloat(formData.get('full_width')) || null;
    const useful_width = parseFloat(formData.get('useful_width')) || null;
    const thickness = parseFloat(formData.get('thickness')) || null;
    const color = formData.get('color') || null;
    const image_padding = parseInt(formData.get('image_padding')) || 0;
    const image_scale = parseFloat(formData.get('image_scale')) || 1.0;
    const variants = formData.get('variants') || null;
    const sizes = formData.get('sizes') || null;
    const image_file = formData.get('image_file');
    let image_url = formData.get('image_url');
    if (image_file && image_file.size > 0) {
        image_url = await uploadFile(image_file);
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
    INSERT INTO products (name, buy_price, sell_price, image_url, stock, category, unit, full_width, useful_width, thickness, color, image_padding, image_scale, variants, sizes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(name, buy_price, sell_price, image_url, stock, category, unit, full_width, useful_width, thickness, color, image_padding, image_scale, variants, sizes);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/products');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
}
async function updateProduct(formData) {
    const id = parseInt(formData.get('id'));
    const name = formData.get('name');
    const buy_price = parseFloat(formData.get('buy_price'));
    const sell_price = parseFloat(formData.get('sell_price'));
    const stock = parseFloat(formData.get('stock')) || 0;
    const unit = formData.get('unit') || 'шт';
    const category = formData.get('category') || 'Общее';
    const full_width = parseFloat(formData.get('full_width')) || null;
    const useful_width = parseFloat(formData.get('useful_width')) || null;
    const thickness = parseFloat(formData.get('thickness')) || null;
    const color = formData.get('color') || null;
    const image_padding = parseInt(formData.get('image_padding')) || 0;
    const image_scale = parseFloat(formData.get('image_scale')) || 1.0;
    const variants = formData.get('variants') || null;
    const sizes = formData.get('sizes') || null;
    const image_file = formData.get('image_file');
    let image_url = formData.get('image_url');
    if (image_file && image_file.size > 0) {
        image_url = await uploadFile(image_file);
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
    UPDATE products SET 
      name = ?, buy_price = ?, sell_price = ?, image_url = ?, 
      stock = ?, category = ?, unit = ?, full_width = ?, 
      useful_width = ?, thickness = ?, color = ?, 
      image_padding = ?, image_scale = ?, variants = ?, sizes = ?
    WHERE id = ?
  `).run(name, buy_price, sell_price, image_url, stock, category, unit, full_width, useful_width, thickness, color, image_padding, image_scale, variants, sizes, id);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/products');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
}
async function getOrders() {
    const orders = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    const ordersWithItems = orders.map((order)=>{
        const items = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      SELECT oi.*, p.name as product_name, p.image_url 
      FROM order_items oi 
      LEFT JOIN products p ON oi.product_id = p.id 
      WHERE oi.order_id = ?
    `).all(order.id);
        return {
            ...order,
            items
        };
    });
    return ordersWithItems;
}
async function createOrder(customerInfo, cart) {
    const totalPrice = cart.reduce((sum, item)=>sum + item.sell_price * item.quantity, 0);
    const result = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
    INSERT INTO orders (customer_name, customer_phone, customer_address, total_price)
    VALUES (?, ?, ?, ?)
  `).run(customerInfo.name, customerInfo.phone, customerInfo.address, totalPrice);
    const orderId = result.lastInsertRowid;
    for (const item of cart){
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      INSERT INTO order_items (order_id, product_id, quantity, price_at_time, unit)
      VALUES (?, ?, ?, ?, ?)
    `).run(orderId, item.id, item.quantity, item.sell_price, item.unit);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('UPDATE products SET stock = stock - ? WHERE id = ?').run(item.quantity, item.id);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
    return {
        success: true,
        orderId
    };
}
async function updateOrderStatus(id, status) {
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
}
const getCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async ()=>{
    const rows = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('SELECT DISTINCT category FROM products WHERE category IS NOT NULL').all();
    return rows.map((r)=>r.category);
});
async function deleteProduct(id) {
    console.log('Deleting product with id:', id);
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM products WHERE id = ?').run(id);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/products');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
        return {
            success: true
        };
    } catch (error) {
        console.error('Delete error:', error);
        return {
            success: false,
            error
        };
    }
}
async function updateStock(id, newStock) {
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('UPDATE products SET stock = ? WHERE id = ?').run(newStock, id);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/products');
}
async function registerSale(productId, quantity, totalPrice, paymentMethod = 'Наличными') {
    const product = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('SELECT stock, name FROM products WHERE id = ?').get(productId);
    if (product && Number(product.stock) >= quantity) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      INSERT INTO sales (product_id, product_name, quantity, total_price, payment_method)
      VALUES (?, ?, ?, ?, ?)
    `).run(productId, product.name, quantity, totalPrice, paymentMethod);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('UPDATE products SET stock = stock - ? WHERE id = ?').run(quantity, productId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/products');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
        return {
            success: true
        };
    }
    return {
        error: 'Недостаточно товара на складе'
    };
}
async function saveReportToFile(reportData) {
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getProducts,
    addProduct,
    updateProduct,
    getOrders,
    createOrder,
    updateOrderStatus,
    deleteProduct,
    updateStock,
    registerSale,
    saveReportToFile,
    getSalesStats,
    getRecentSales,
    getCategories
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getProducts, "00c6c30db9c8c0ed9e500ae55b68405f7f46f9107b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addProduct, "4068047fbe6e0f1a99dda2fe518dbece1b34296774", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateProduct, "40bd9d72953f42d214d67457348347921795bdc87a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getOrders, "006aaf6b3f5abc44a11c1aaa25cce71d70f6adb7dd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createOrder, "60c67c4f8aeaa1f3589b896f7ee17594cd85cbbaf4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateOrderStatus, "60981819606304e39056a22bbcead56494e1b0d651", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteProduct, "40ec1de7e4ca5688f9b67aa46e49f4af665e7f5ed9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateStock, "60c6f19fc42a7302e9e353fef9cd632a9b153ebde8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(registerSale, "78b243d7993befc5655d3ab775323904abb39fdf15", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveReportToFile, "405928a053d73e6740f1c7223973fe5f5a8c7b4f24", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSalesStats, "7fbe037d5c8a9f497085f86093b9809e54f8b93b6c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecentSales, "7f097121fe04b0d970160a621cdc9cb475f9c2755a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCategories, "7f2e6c3ffe8900292bc4aa52e0b39ad942eb2ce605", null);
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/product-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/product-actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/product-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "006aaf6b3f5abc44a11c1aaa25cce71d70f6adb7dd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrders"],
    "00c6c30db9c8c0ed9e500ae55b68405f7f46f9107b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProducts"],
    "405928a053d73e6740f1c7223973fe5f5a8c7b4f24",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveReportToFile"],
    "4068047fbe6e0f1a99dda2fe518dbece1b34296774",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addProduct"],
    "40bd9d72953f42d214d67457348347921795bdc87a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateProduct"],
    "40ec1de7e4ca5688f9b67aa46e49f4af665e7f5ed9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteProduct"],
    "60981819606304e39056a22bbcead56494e1b0d651",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateOrderStatus"],
    "60c67c4f8aeaa1f3589b896f7ee17594cd85cbbaf4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createOrder"],
    "60c6f19fc42a7302e9e353fef9cd632a9b153ebde8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateStock"],
    "78b243d7993befc5655d3ab775323904abb39fdf15",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerSale"],
    "7f097121fe04b0d970160a621cdc9cb475f9c2755a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRecentSales"],
    "7f2e6c3ffe8900292bc4aa52e0b39ad942eb2ce605",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategories"],
    "7fbe037d5c8a9f497085f86093b9809e54f8b93b6c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSalesStats"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/product-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/product-actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__759c1cb1._.js.map