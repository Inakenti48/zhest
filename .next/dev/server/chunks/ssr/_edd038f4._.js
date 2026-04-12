module.exports = [
"[project]/src/lib/db.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "isPostgres",
    ()=>isPostgres
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$better$2d$sqlite3$29$__ = __turbopack_context__.i("[externals]/better-sqlite3 [external] (better-sqlite3, cjs, [project]/node_modules/better-sqlite3)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
// Database configurations
const isPostgres = !!process.env.DATABASE_URL;
let db;
if (isPostgres) {
    const config = {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DATABASE_URL?.includes('localhost') ? false : {
            rejectUnauthorized: false
        }
    };
    const pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["Pool"](config);
    // Wrapper to mimic better-sqlite3 interface for compatibility
    db = {
        prepare: (sql)=>{
            // Basic conversion of SQLite ? to Postgres $1, $2...
            let pgSql = sql;
            let paramCount = 0;
            pgSql = pgSql.replace(/\?/g, ()=>{
                paramCount++;
                return `$${paramCount}`;
            });
            return {
                get: async (...params)=>{
                    const res = await pool.query(pgSql, params);
                    return res.rows[0];
                },
                all: async (...params)=>{
                    const res = await pool.query(pgSql, params);
                    return res.rows;
                },
                run: async (...params)=>{
                    const res = await pool.query(pgSql, params);
                    return {
                        lastInsertRowid: null,
                        changes: res.rowCount
                    };
                }
            };
        },
        exec: async (sql)=>{
            await pool.query(sql);
        }
    };
} else {
    // Fallback to SQLite
    const dbPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].resolve(process.cwd(), 'zhest.db');
    db = new __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$better$2d$sqlite3$29$__["default"](dbPath);
    // Sync wrapper
    const originalPrepare = db.prepare.bind(db);
    db.prepare = (sql)=>{
        const stmt = originalPrepare(sql);
        return {
            get: async (...params)=>stmt.get(...params),
            all: async (...params)=>stmt.all(...params),
            run: async (...params)=>stmt.run(...params)
        };
    };
    const originalExec = db.exec.bind(db);
    db.exec = async (sql)=>originalExec(sql);
}
const __TURBOPACK__default__export__ = db;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/product-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/* __next_internal_action_entry_do_not_use__ [{"00372b6f3a16347f082fafc66cf3a8f348d568813a":"getProducts","00e464c490bc164924a9355ab5fff6e153f80eae61":"getOrders","400b79f202db494eb0900239090c7a07cf1efaa7bf":"updateProduct","40122411613c3a7f8cd8e969d4b7d9cd616b375f94":"saveReportToFile","4060aa4ef51857bae96849b62dd26a5640744b075e":"addProduct","40b3110da721655e0d264a066be68fc1808e5e923d":"deleteProduct","600429b440598bcfbe4b59c0defec2eee5bdb1ed73":"updateOrderStatus","60b0ae999b82d34fd6b5b1aa0cfc6b1e60bd5dfe11":"createOrder","60c9a46e934643c36da052e2a842900b5338bdca97":"updateStock","784f12991ac472cce3925bad5dd60c488c271ec2a9":"registerSale","7f0c868ff325f4a0782602637ca022bde0315f6081":"getRecentSales","7f6ab2cb751394ea58a6245bf576b2c7bb7a90412f":"getSalesStats","7fc2e19247234beb5f92d9f2eb33935f6ae2385539":"getCategories"},"",""] */ __turbopack_context__.s([
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
async function getProducts() {
    const products = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('SELECT * FROM products ORDER BY created_at DESC').all();
    console.log('Fetched products:', products.map((p)=>p.name).join(', '));
    return products;
}
const getSalesStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async ()=>{
    const sales = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
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
    const sales = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
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
    const image_url = formData.get('image_url');
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
    INSERT INTO products (name, buy_price, sell_price, image_url, stock, category, unit, full_width, useful_width, thickness, color, image_padding, image_scale, variants, sizes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(name, buy_price, sell_price, image_url, stock, category, unit, full_width, useful_width, thickness, color, image_padding, image_scale, variants, sizes);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/products');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
}
async function updateProduct(formData) {
    const id = parseInt(formData.get('id'));
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!existing) return;
    const rawName = formData.get('name');
    const name = typeof rawName === 'string' && rawName.trim() ? rawName : existing.name;
    const rawBuyPrice = formData.get('buy_price');
    const buy_price = rawBuyPrice !== null && rawBuyPrice !== '' ? parseFloat(rawBuyPrice) : Number(existing.buy_price) || 0;
    const rawSellPrice = formData.get('sell_price');
    const sell_price = rawSellPrice !== null && rawSellPrice !== '' ? parseFloat(rawSellPrice) : Number(existing.sell_price) || 0;
    const rawStock = formData.get('stock');
    const stock = rawStock !== null && rawStock !== '' ? parseFloat(rawStock) : Number(existing.stock) || 0;
    const rawUnit = formData.get('unit');
    const unit = typeof rawUnit === 'string' && rawUnit.trim() ? rawUnit : existing.unit || 'шт';
    const rawCategory = formData.get('category');
    const category = typeof rawCategory === 'string' && rawCategory.trim() ? rawCategory : existing.category || 'Общее';
    const rawFullWidth = formData.get('full_width');
    const full_width = rawFullWidth !== null && rawFullWidth !== '' ? parseFloat(rawFullWidth) : existing.full_width ?? null;
    const rawUsefulWidth = formData.get('useful_width');
    const useful_width = rawUsefulWidth !== null && rawUsefulWidth !== '' ? parseFloat(rawUsefulWidth) : existing.useful_width ?? null;
    const rawThickness = formData.get('thickness');
    const thickness = rawThickness !== null && rawThickness !== '' ? parseFloat(rawThickness) : existing.thickness ?? null;
    const rawColor = formData.get('color');
    const color = typeof rawColor === 'string' && rawColor.trim() ? rawColor : existing.color || null;
    const rawImagePadding = formData.get('image_padding');
    const image_padding = rawImagePadding !== null && rawImagePadding !== '' ? parseInt(rawImagePadding) : existing.image_padding || 0;
    const rawImageScale = formData.get('image_scale');
    const image_scale = rawImageScale !== null && rawImageScale !== '' ? parseFloat(rawImageScale) : existing.image_scale || 1.0;
    const rawVariants = formData.get('variants');
    const variants = typeof rawVariants === 'string' && rawVariants.trim() !== '' ? rawVariants : existing.variants || null;
    const rawSizes = formData.get('sizes');
    const sizes = typeof rawSizes === 'string' && rawSizes.trim() !== '' ? rawSizes : existing.sizes || null;
    const rawImageUrl = formData.get('image_url');
    const image_url = typeof rawImageUrl === 'string' && rawImageUrl.trim() ? rawImageUrl : existing.image_url || null;
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
    UPDATE products SET name = ?, buy_price = ?, sell_price = ?, image_url = ?, stock = ?, category = ?, unit = ?, full_width = ?, useful_width = ?, thickness = ?, color = ?, image_padding = ?, image_scale = ?, variants = ?, sizes = ?
    WHERE id = ?
  `).run(name, buy_price, sell_price, image_url, stock, category, unit, full_width, useful_width, thickness, color, image_padding, image_scale, variants, sizes, id);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/products');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
}
async function getOrders() {
    const orders = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    const ordersWithItems = await Promise.all(orders.map(async (order)=>{
        const items = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      SELECT oi.*, p.name as product_name, p.image_url 
      FROM order_items oi 
      LEFT JOIN products p ON oi.product_id = p.id 
      WHERE oi.order_id = ?
    `).all(order.id);
        return {
            ...order,
            items
        };
    }));
    return ordersWithItems;
}
async function createOrder(customerInfo, cart) {
    const totalPrice = cart.reduce((sum, item)=>sum + item.sell_price * item.quantity, 0);
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
    INSERT INTO orders (customer_name, customer_phone, customer_address, total_price)
    VALUES (?, ?, ?, ?)
  `).run(customerInfo.name, customerInfo.phone, customerInfo.address, totalPrice);
    const orderId = result.lastInsertRowid;
    for (const item of cart){
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      INSERT INTO order_items (order_id, product_id, quantity, price_at_time, unit)
      VALUES (?, ?, ?, ?, ?)
    `).run(orderId, item.id, item.quantity, item.sell_price, item.unit);
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('UPDATE products SET stock = stock - ? WHERE id = ?').run(item.quantity, item.id);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
    return {
        success: true,
        orderId
    };
}
async function updateOrderStatus(id, status) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
}
const getCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async ()=>{
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('SELECT DISTINCT category FROM products WHERE category IS NOT NULL').all();
    return rows.map((r)=>r.category);
});
async function deleteProduct(id) {
    console.log('Deleting product with id:', id);
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM products WHERE id = ?').run(id);
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
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('UPDATE products SET stock = ? WHERE id = ?').run(newStock, id);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/products');
}
async function registerSale(productId, quantity, totalPrice, paymentMethod = 'Наличными') {
    const product = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('SELECT stock, name FROM products WHERE id = ?').get(productId);
    if (product && Number(product.stock) >= quantity) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare(`
      INSERT INTO sales (product_id, product_name, quantity, total_price, payment_method)
      VALUES (?, ?, ?, ?, ?)
    `).run(productId, product.name, quantity, totalPrice, paymentMethod);
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prepare('UPDATE products SET stock = stock - ? WHERE id = ?').run(quantity, productId);
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getProducts, "00372b6f3a16347f082fafc66cf3a8f348d568813a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addProduct, "4060aa4ef51857bae96849b62dd26a5640744b075e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateProduct, "400b79f202db494eb0900239090c7a07cf1efaa7bf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getOrders, "00e464c490bc164924a9355ab5fff6e153f80eae61", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createOrder, "60b0ae999b82d34fd6b5b1aa0cfc6b1e60bd5dfe11", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateOrderStatus, "600429b440598bcfbe4b59c0defec2eee5bdb1ed73", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteProduct, "40b3110da721655e0d264a066be68fc1808e5e923d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateStock, "60c9a46e934643c36da052e2a842900b5338bdca97", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(registerSale, "784f12991ac472cce3925bad5dd60c488c271ec2a9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveReportToFile, "40122411613c3a7f8cd8e969d4b7d9cd616b375f94", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSalesStats, "7f6ab2cb751394ea58a6245bf576b2c7bb7a90412f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecentSales, "7f0c868ff325f4a0782602637ca022bde0315f6081", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCategories, "7fc2e19247234beb5f92d9f2eb33935f6ae2385539", null);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/.next-internal/server/app/admin/products/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/product-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/product-actions.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/.next-internal/server/app/admin/products/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/product-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "400b79f202db494eb0900239090c7a07cf1efaa7bf",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateProduct"],
    "4060aa4ef51857bae96849b62dd26a5640744b075e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addProduct"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$products$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/products/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/product-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/product-actions.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$products$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$products$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=_edd038f4._.js.map