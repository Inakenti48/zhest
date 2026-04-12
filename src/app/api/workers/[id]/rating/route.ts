import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const change = body.change || 0;

    const worker = (await db.prepare('SELECT rating FROM workers WHERE id = ?').get(id)) as { rating: number } | undefined;

    if (!worker) {
      return NextResponse.json({ error: 'Worker not found' }, { status: 404 });
    }

    const newRating = Math.max(0, worker.rating + change);

    await db.prepare('UPDATE workers SET rating = ? WHERE id = ?').run(newRating, id);
    
    const updated = await db.prepare('SELECT * FROM workers WHERE id = ?').get(id);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
