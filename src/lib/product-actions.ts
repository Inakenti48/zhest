'use server';

import { revalidatePath } from 'next/cache';
import { cache } from 'react';
import db from './db';

export async function getProducts() {
  const products = await db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
  console.log('Fetched products:', products.map((p: any) => p.name).join(', '));
  return products;
}

export const getSalesStats = cache(async () => {
  const sales = (await db.prepare(`
    SELECT s.*, p.buy_price, p.name as product_name 
    FROM sales s 
    LEFT JOIN products p ON s.product_id = p.id
  `).all()) as any[];

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterday = today - 86400000;
  const last7Days = today - 7 * 86400000;
  const last14Days = today - 14 * 86400000;
  const last30Days = today - 30 * 86400000;
  const last60Days = today - 60 * 86400000;

  const stats = {
    daily_total: 0, daily_profit: 0, prev_daily_total: 0,
    weekly_total: 0, weekly_profit: 0, prev_weekly_total: 0,
    monthly_total: 0, monthly_profit: 0, prev_monthly_total: 0
  };

  sales.forEach((s: any) => {
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
  sales.filter((s: any) => new Date(s.sale_date).getTime() >= last30Days).forEach((s: any) => {
    const d = new Date(s.sale_date).toISOString().split('T')[0];
    chartMap.set(d, (chartMap.get(d) || 0) + Number(s.total_price));
  });
  const chartData = Array.from(chartMap.entries())
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const monthlyMap = new Map();
  sales.forEach((s: any) => {
    const d = new Date(s.sale_date);
    const m = d.getMonth() + 1;
    monthlyMap.set(m, (monthlyMap.get(m) || 0) + Number(s.total_price));
  });
  const monthlyAnalysis = Array.from(monthlyMap.entries())
    .map(([month, total]) => ({ month: String(month).padStart(2, '0'), total }))
    .sort((a, b) => b.month.localeCompare(a.month));

  const weeklyMap = new Map();
  sales.filter((s: any) => new Date(s.sale_date).getTime() >= last30Days).forEach((s: any) => {
    const d = new Date(s.sale_date);
    const week = Math.ceil((d.getDate() - 1 + new Date(d.getFullYear(), d.getMonth(), 1).getDay()) / 7);
    weeklyMap.set(week, (weeklyMap.get(week) || 0) + Number(s.total_price));
  });
  const weeklyAnalysis = Array.from(weeklyMap.entries())
    .map(([week, total]) => ({ week: String(week), total }))
    .sort((a, b) => b.week.localeCompare(a.week));

  const calculateTrend = (current: number, previous: number) => {
    if (!previous || previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
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

export const getRecentSales = cache(async () => {
  const sales = await db.prepare(`
    SELECT s.*, p.name as product_name 
    FROM sales s 
    LEFT JOIN products p ON s.product_id = p.id 
    ORDER BY s.sale_date DESC 
    LIMIT 10
  `).all();
  return sales;
});

export async function addProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const buy_price = parseFloat(formData.get('buy_price') as string);
  const sell_price = parseFloat(formData.get('sell_price') as string);
  const stock = parseFloat(formData.get('stock') as string) || 0;
  const unit = formData.get('unit') as string || 'шт';
  const category = formData.get('category') as string || 'Общее';
  const full_width = parseFloat(formData.get('full_width') as string) || null;
  const useful_width = parseFloat(formData.get('useful_width') as string) || null;
  const thickness = parseFloat(formData.get('thickness') as string) || null;
  const color = formData.get('color') as string || null;
  const image_padding = parseInt(formData.get('image_padding') as string) || 0;
  const image_scale = parseFloat(formData.get('image_scale') as string) || 1.0;
  const variants = formData.get('variants') as string || null;
  const sizes = formData.get('sizes') as string || null;
  const image_url = formData.get('image_url') as string;

  await db.prepare(`
    INSERT INTO products (name, buy_price, sell_price, image_url, stock, category, unit, full_width, useful_width, thickness, color, image_padding, image_scale, variants, sizes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(name, buy_price, sell_price, image_url, stock, category, unit, full_width, useful_width, thickness, color, image_padding, image_scale, variants, sizes);

  revalidatePath('/admin/products');
  revalidatePath('/admin');
  revalidatePath('/');
}

export async function updateProduct(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  const existing = (await db.prepare('SELECT * FROM products WHERE id = ?').get(id)) as any;
  if (!existing) return;

  const rawName = formData.get('name');
  const name = typeof rawName === 'string' && rawName.trim() ? rawName : existing.name;

  const rawBuyPrice = formData.get('buy_price');
  const buy_price = rawBuyPrice !== null && rawBuyPrice !== ''
    ? parseFloat(rawBuyPrice as string)
    : Number(existing.buy_price) || 0;

  const rawSellPrice = formData.get('sell_price');
  const sell_price = rawSellPrice !== null && rawSellPrice !== ''
    ? parseFloat(rawSellPrice as string)
    : Number(existing.sell_price) || 0;

  const rawStock = formData.get('stock');
  const stock = rawStock !== null && rawStock !== ''
    ? parseFloat(rawStock as string)
    : Number(existing.stock) || 0;

  const rawUnit = formData.get('unit');
  const unit = typeof rawUnit === 'string' && rawUnit.trim() ? rawUnit : (existing.unit || 'шт');

  const rawCategory = formData.get('category');
  const category = typeof rawCategory === 'string' && rawCategory.trim() ? rawCategory : (existing.category || 'Общее');

  const rawFullWidth = formData.get('full_width');
  const full_width = rawFullWidth !== null && rawFullWidth !== ''
    ? parseFloat(rawFullWidth as string)
    : existing.full_width ?? null;

  const rawUsefulWidth = formData.get('useful_width');
  const useful_width = rawUsefulWidth !== null && rawUsefulWidth !== ''
    ? parseFloat(rawUsefulWidth as string)
    : existing.useful_width ?? null;

  const rawThickness = formData.get('thickness');
  const thickness = rawThickness !== null && rawThickness !== ''
    ? parseFloat(rawThickness as string)
    : existing.thickness ?? null;

  const rawColor = formData.get('color');
  const color = typeof rawColor === 'string' && rawColor.trim() ? rawColor : (existing.color || null);

  const rawImagePadding = formData.get('image_padding');
  const image_padding = rawImagePadding !== null && rawImagePadding !== ''
    ? parseInt(rawImagePadding as string)
    : (existing.image_padding || 0);

  const rawImageScale = formData.get('image_scale');
  const image_scale = rawImageScale !== null && rawImageScale !== ''
    ? parseFloat(rawImageScale as string)
    : (existing.image_scale || 1.0);

  const rawVariants = formData.get('variants');
  const variants = typeof rawVariants === 'string' && rawVariants.trim() !== ''
    ? rawVariants
    : existing.variants || null;

  const rawSizes = formData.get('sizes');
  const sizes = typeof rawSizes === 'string' && rawSizes.trim() !== ''
    ? rawSizes
    : existing.sizes || null;

  const rawImageUrl = formData.get('image_url');
  const image_url = typeof rawImageUrl === 'string' && rawImageUrl.trim()
    ? rawImageUrl
    : (existing.image_url || null);

  await db.prepare(`
    UPDATE products SET name = ?, buy_price = ?, sell_price = ?, image_url = ?, stock = ?, category = ?, unit = ?, full_width = ?, useful_width = ?, thickness = ?, color = ?, image_padding = ?, image_scale = ?, variants = ?, sizes = ?
    WHERE id = ?
  `).run(
    name,
    buy_price,
    sell_price,
    image_url,
    stock,
    category,
    unit,
    full_width,
    useful_width,
    thickness,
    color,
    image_padding,
    image_scale,
    variants,
    sizes,
    id
  );

  revalidatePath('/admin/products');
  revalidatePath('/admin');
  revalidatePath('/');
}

export async function getOrders() {
  const orders = (await db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all()) as any[];
  
  const ordersWithItems = await Promise.all(orders.map(async (order) => {
    const items = await db.prepare(`
      SELECT oi.*, p.name as product_name, p.image_url 
      FROM order_items oi 
      LEFT JOIN products p ON oi.product_id = p.id 
      WHERE oi.order_id = ?
    `).all(order.id);
    return { ...order, items };
  }));

  return ordersWithItems;
}

export async function createOrder(
  customerInfo: { name: string, phone: string, address: string }, 
  cart: any[], 
  orderType: string = 'internal',
  urgentUntil: string | null = null,
  costOfWork: number = 0,
  dynamicFields: any[] = []
) {
  const totalPrice = cart.reduce((sum, item) => sum + (item.sell_price * item.quantity), 0);
  
  const result = await db.prepare(`
    INSERT INTO orders (customer_name, customer_phone, customer_address, total_price, type, urgent_until, cost_of_work, dynamic_fields)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    customerInfo.name, 
    customerInfo.phone, 
    customerInfo.address, 
    totalPrice, 
    orderType, 
    urgentUntil, 
    costOfWork, 
    JSON.stringify(dynamicFields)
  );

  const orderId = result.lastInsertRowid;

  for (const item of cart) {
    await db.prepare(`
      INSERT INTO order_items (order_id, product_id, quantity, price_at_time, unit)
      VALUES (?, ?, ?, ?, ?)
    `).run(orderId, item.id, item.quantity, item.sell_price, item.unit);

    if (item.id) {
      await db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?').run(item.quantity, item.id);
    }
  }

  revalidatePath('/admin/orders');
  revalidatePath('/admin');
  return { success: true, orderId };
}

export async function takeOrder(orderId: number, workerId: number) {
  const startTime = new Date().toISOString();
  await db.prepare(`
    UPDATE orders 
    SET status = 'in_progress', worker_id = ?, start_time = ? 
    WHERE id = ?
  `).run(workerId, startTime, orderId);
  revalidatePath('/admin/orders');
}

export async function submitOrderForReview(orderId: number, photoUrl: string) {
  const endTime = new Date().toISOString();
  await db.prepare(`
    UPDATE orders 
    SET status = 'review', end_time = ?, completion_photo = ? 
    WHERE id = ?
  `).run(endTime, photoUrl, orderId);
  revalidatePath('/admin/orders');
}

export async function approveOrder(orderId: number, finalStatus: 'delivered' | 'completed') {
  await db.prepare(`
    UPDATE orders 
    SET status = ? 
    WHERE id = ?
  `).run(finalStatus, orderId);
  revalidatePath('/admin/orders');
}

export async function updateOrderStatus(id: number, status: string) {
  await db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id);
  revalidatePath('/admin');
}

export const getCategories = cache(async () => {
  const rows = (await db.prepare('SELECT DISTINCT category FROM products WHERE category IS NOT NULL').all()) as { category: string }[];
  return rows.map(r => r.category);
});

export async function deleteProduct(id: number) {
  console.log('Deleting product with id:', id);
  try {
    await db.prepare('DELETE FROM products WHERE id = ?').run(id);
    revalidatePath('/admin/products');
    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return { success: false, error };
  }
}

export async function updateStock(id: number, newStock: number) {
  await db.prepare('UPDATE products SET stock = ? WHERE id = ?').run(newStock, id);
  revalidatePath('/admin/products');
}

export async function registerSale(productId: number, quantity: number, totalPrice: number, paymentMethod: string = 'Наличными', invoiceNo?: string) {
  const product = (await db.prepare('SELECT stock, name FROM products WHERE id = ?').get(productId)) as { stock: number, name: string } | undefined;
  
  if (product && Number(product.stock) >= quantity) {
    const result = await db.prepare(`
      INSERT INTO sales (product_id, product_name, quantity, total_price, payment_method, invoice_no)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(productId, product.name, quantity, totalPrice, paymentMethod, invoiceNo || null);

    await db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?').run(quantity, productId);
    
    revalidatePath('/admin/products');
    revalidatePath('/admin');
    return { success: true, id: result.lastInsertRowid };
  }
  return { error: 'Недостаточно товара на складе' };
}

export async function getNextInvoiceNo() {
  const now = new Date();
  
  // Format current date components
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const prefix = `${day}${month}`;
  
  // Find the highest sequence number for today's prefix in SQLite
  // We use prefix-based search which is more robust than sale_date for daily resets
  const result = await db.prepare(`
    SELECT invoice_no 
    FROM sales 
    WHERE invoice_no LIKE ? || '-%'
    ORDER BY CAST(SUBSTR(invoice_no, 6) AS INTEGER) DESC
    LIMIT 1
  `).get(prefix);
  
  let nextNum = 1;
  if (result?.invoice_no) {
    const parts = result.invoice_no.split('-');
    if (parts.length > 1) {
      const lastNum = parseInt(parts[1]);
      if (!isNaN(lastNum)) {
        nextNum = lastNum + 1;
      }
    }
  }
  
  const invoiceNo = `${prefix}-${String(nextNum).padStart(3, '0')}`;
  
  // Russian month names for date formatting
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const formattedDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} г.г. ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  return {
    invoiceNo,
    formattedDate,
    rawDate: now.toISOString()
  };
}

export async function saveReportToFile(reportData: any) {
  return { success: true };
}

export async function getWorkers() {
  return await db.prepare('SELECT id, username as name FROM users WHERE role = "worker"').all();
}

export async function deleteOrder(id: number) {
  await db.prepare('DELETE FROM order_items WHERE order_id = ?').run(id);
  await db.prepare('DELETE FROM orders WHERE id = ?').run(id);
  revalidatePath('/admin/orders');
}
