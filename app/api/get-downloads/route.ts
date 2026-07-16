import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const globalForDownloads = global as unknown as {
  downloads: Array<{ ip: string; city: string; region: string; country: string; timestamp: string }>;
};

export async function GET() {
  try {
    const isKvConfigured = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
    let downloads = [];

    if (isKvConfigured) {
      const kvData = await kv.lrange('downloads', 0, -1);
      downloads = kvData.map((item) => (typeof item === 'string' ? JSON.parse(item) : item));
    } else {
      downloads = globalForDownloads.downloads || [];
    }

    return NextResponse.json({
      success: true,
      count: downloads.length,
      downloads,
      isKvConfigured,
    });
  } catch (error: any) {
    console.error('Error fetching downloads:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
