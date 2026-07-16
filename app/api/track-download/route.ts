import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

// Global memory store for local development / fallback
const globalForDownloads = global as unknown as {
  downloads: Array<{ ip: string; city: string; region: string; country: string; timestamp: string }>;
};

if (!globalForDownloads.downloads) {
  globalForDownloads.downloads = [];
}

export async function POST(request: NextRequest) {
  try {
    // Detect IP
    const ipHeader = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');
    const ip = ipHeader ? ipHeader.split(',')[0].trim() : '127.0.0.1';

    // Detect location from Vercel geolocation headers
    const city = request.headers.get('x-vercel-ip-city') || 'Localhost';
    const region = request.headers.get('x-vercel-ip-country-region') || '';
    const country = request.headers.get('x-vercel-ip-country') || 'BR';

    const downloadData = {
      ip,
      city: decodeURIComponent(city),
      region,
      country,
      timestamp: new Date().toISOString(),
    };

    // Store in KV if configured, else fallback to global memory
    const isKvConfigured = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

    if (isKvConfigured) {
      await kv.lpush('downloads', JSON.stringify(downloadData));
      await kv.ltrim('downloads', 0, 999); // Keep last 1000 items
    } else {
      globalForDownloads.downloads.unshift(downloadData);
      if (globalForDownloads.downloads.length > 1000) {
        globalForDownloads.downloads = globalForDownloads.downloads.slice(0, 1000);
      }
    }

    return NextResponse.json({ success: true, data: downloadData });
  } catch (error: any) {
    console.error('Error tracking download:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
