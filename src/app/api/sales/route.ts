import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const sales = await db.prepare(`
      SELECT s.*, p.buy_price, p.name as product_name 
      FROM sales s 
      LEFT JOIN products p ON s.product_id = p.id 
      ORDER BY s.sale_date DESC
    `).all();
    return NextResponse.json(sales);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
