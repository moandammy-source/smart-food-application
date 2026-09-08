import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

const contentTypes: Record<string, string> = {
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
};

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await context.params;
  const relativePath = segments.join('/');
  const filePath = path.join(process.cwd(), 'js', relativePath);

  if (!filePath.startsWith(path.join(process.cwd(), 'js'))) {
    return new NextResponse('Not found', { status: 404 });
  }

  try {
    const content = await readFile(filePath);
    const extension = path.extname(filePath);
    return new NextResponse(content, {
      headers: { 'content-type': contentTypes[extension] ?? 'application/octet-stream' },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
