import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const filePath = path.join(process.cwd(), 'h.html');
  const html = await readFile(filePath, 'utf8');
  const withBase = html.replace('<head>', '<head><base href="/" />');

  return new NextResponse(withBase, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
