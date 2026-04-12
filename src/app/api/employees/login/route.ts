import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json() as { name?: string; pin?: string };
    const { name, pin } = body;
    
    if (!name || !pin) {
      return NextResponse.json({ error: 'Имя и PIN обязательны' }, { status: 400 });
    }

    const employee = (await db.prepare('SELECT id, name FROM employees WHERE name = ? AND pin = ?').get(name, pin)) as { id: number, name: string } | undefined;
    
    if (!employee) {
      return NextResponse.json({ error: 'Неверные данные' }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set('employee_id', String(employee.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24
    });
    cookieStore.set('employee_name', employee.name, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24
    });

    return NextResponse.json({ success: true, employee: { id: employee.id, name: employee.name } });
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка входа' }, { status: 500 });
  }
}
