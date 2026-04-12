import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const records = await db.prepare(`
      SELECT a.*, w.name as worker_name 
      FROM attendance a 
      LEFT JOIN workers w ON a.worker_id = w.id 
      ORDER BY a.date DESC
    `).all();
    
    return NextResponse.json(records);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const result = await db.prepare(`
      INSERT INTO attendance (worker_id, date, status, check_in, check_out, note)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      body.worker_id,
      body.date,
      body.status || 'present',
      body.check_in || null,
      body.check_out || null,
      body.note || ''
    );

    const record = await db.prepare('SELECT * FROM attendance WHERE id = ?').get(result.lastInsertRowid);
    return NextResponse.json(record);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
