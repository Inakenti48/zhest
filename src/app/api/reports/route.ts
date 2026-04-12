import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const reportPath = path.resolve(process.cwd(), 'reports.json');
    if (fs.existsSync(reportPath)) {
      const data = fs.readFileSync(reportPath, 'utf8');
      return NextResponse.json(JSON.parse(data));
    }
    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read reports' }, { status: 500 });
  }
}
