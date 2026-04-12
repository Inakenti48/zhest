import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import db from '@/lib/db';

interface WorkLog {
  id: number;
  employee_id: number;
  employee_name?: string;
  description: string;
  products_made: string | null;
  total_items: number;
  work_date: string;
  created_at: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get('employee_id');
    const date = searchParams.get('date');
    
    let query = `
      SELECT wl.*, e.name as employee_name 
      FROM work_logs wl 
      LEFT JOIN employees e ON wl.employee_id = e.id
    `;
    const params: any[] = [];
    const conditions: string[] = [];
    
    if (employeeId) {
      conditions.push('wl.employee_id = ?');
      params.push(employeeId);
    }
    
    if (date) {
      conditions.push('wl.work_date = ?');
      params.push(date);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY wl.created_at DESC';
    
    const logs = (await db.prepare(query).all(...params)) as WorkLog[];
    
    const parsedLogs = logs.map(log => ({
      ...log,
      products_made: log.products_made ? JSON.parse(log.products_made) : []
    }));
    
    return NextResponse.json(parsedLogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch work logs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const employeeId = cookieStore.get('employee_id')?.value;
    
    if (!employeeId) {
      return NextResponse.json({ error: 'Необходимо войти в систему' }, { status: 401 });
    }
    
    const body = await request.json() as { description?: string; products_made?: { product_id: number; product_name: string; quantity: number }[] };
    const { description, products_made } = body;
    
    if (!description) {
      return NextResponse.json({ error: 'Описание работы обязательно' }, { status: 400 });
    }

    const productsArray = products_made || [];
    const totalItems = productsArray.reduce((sum: number, p: { quantity: number }) => sum + (p.quantity || 0), 0);
    
    const result = await db.prepare(`
      INSERT INTO work_logs (employee_id, description, products_made, total_items)
      VALUES (?, ?, ?, ?)
    `).run(parseInt(employeeId), description, JSON.stringify(productsArray), totalItems);
    
    return NextResponse.json({ 
      id: result.lastInsertRowid,
      message: 'Работа записана' 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create work log' }, { status: 500 });
  }
}
