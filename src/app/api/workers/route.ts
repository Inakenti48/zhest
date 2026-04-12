import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const workers = await db.prepare('SELECT * FROM workers ORDER BY rating DESC').all();
    return NextResponse.json(workers);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const result = await db.prepare(`
      INSERT INTO workers (login, password, name, position, salary, conditions, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      body.login,
      body.password,
      body.name,
      body.position || null,
      body.salary || 0,
      body.conditions || '',
      100
    );

    const worker = await db.prepare('SELECT * FROM workers WHERE id = ?').get(result.lastInsertRowid);
    return NextResponse.json(worker);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
