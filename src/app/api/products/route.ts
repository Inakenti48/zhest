import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  const products = await db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
  return NextResponse.json(products);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }
  
  await db.prepare('DELETE FROM products WHERE id = ?').run(parseInt(id));
  return NextResponse.json({ success: true });
}
