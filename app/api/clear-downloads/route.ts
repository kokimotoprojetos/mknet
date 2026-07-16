import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const globalForDownloads = global as unknown as {
  downloads: Array<{ ip: string; city: string; region: string; country: string; timestamp: string }>;
};

export async function POST() {
  try {
    const isKvConfigured = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

    if (isKvConfigured) {
      await kv.del('downloads');
    } else {
      globalForDownloads.downloads = [];
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error clearing downloads:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
