import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

// Global memory store for local development / fallback
const globalForDownloads = global as unknown as {
  downloads: Array<{ ip: string; city: string; region: string; country: string; timestamp: string }>;
};

if (!globalForDownloads.downloads) {
  globalForDownloads.downloads = [];
}

// Telegram credentials (using environment variables, falling back to the ones provided)
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '7557767648:AAF7Z4tPmL65UBv1myjWoeILF7AsBGYD_58';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '5958118755';

async function sendTelegramNotification(data: { ip: string; city: string; region: string; country: string; timestamp: string }) {
  try {
    const formattedDate = new Date(data.timestamp).toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const text = 
      `📥 *Novo Download do App!*\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `🌐 *IP:* \`${data.ip}\`\n` +
      `📍 *Localização:* ${data.city}${data.region ? `, ${data.region}` : ''} - ${data.country}\n` +
      `⏰ *Horário:* ${formattedDate}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'Markdown',
      }),
    });
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
  }
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

    // Send Telegram Notification
    await sendTelegramNotification(downloadData);

    return NextResponse.json({ success: true, data: downloadData });
  } catch (error: any) {
    console.error('Error tracking download:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
