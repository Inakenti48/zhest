import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const employees = await db.prepare('SELECT id, name, created_at FROM employees ORDER BY name').all();
    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { name?: string; pin?: string };
    const { name, pin } = body;
    
    if (!name || !pin) {
      return NextResponse.json({ error: 'Имя и PIN обязательны' }, { status: 400 });
    }

    const result = await db.prepare('INSERT INTO employees (name, pin) VALUES (?, ?)').run(name, pin);
    
    return NextResponse.json({ 
      id: result.lastInsertRowid, 
      name,
      message: 'Сотрудник добавлен' 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create employee' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID обязателен' }, { status: 400 });
    }

    await db.prepare('DELETE FROM employees WHERE id = ?').run(id);
    return NextResponse.json({ message: 'Сотрудник удален' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete employee' }, { status: 500 });
  }
}
