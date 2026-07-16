import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const globalForDownloads = global as unknown as {
  downloads: Array<{ ip: string; city: string; region: string; country: string; timestamp: string }>;
};

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '7557767648:AAF7Z4tPmL65UBv1myjWoeILF7AsBGYD_58';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '5958118755';

async function sendTelegramMessage(chatId: number | string, text: string) {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
      }),
    });
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    
    // Check if it's a valid message update
    if (!payload.message || !payload.message.text || !payload.message.chat) {
      return NextResponse.json({ success: true });
    }

    const chatId = payload.message.chat.id.toString();
    const messageText = payload.message.text.trim();

    // Security check: Only allow the authorized owner to run commands
    if (chatId !== TELEGRAM_CHAT_ID) {
      await sendTelegramMessage(chatId, '❌ *Acesso negado.* Você não está autorizado a interagir com este bot.');
      return NextResponse.json({ success: true });
    }

    // Fetch downloads from KV or global store
    const isKvConfigured = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
    let downloads: Array<{ ip: string; city: string; region: string; country: string; timestamp: string }> = [];

    if (isKvConfigured) {
      const kvData = await kv.lrange('downloads', 0, -1);
      downloads = kvData.map((item) => (typeof item === 'string' ? JSON.parse(item) : item));
    } else {
      downloads = globalForDownloads.downloads || [];
    }

    const command = messageText.toLowerCase().split(' ')[0];

    if (command === '/total') {
      const totalDownloads = downloads.length;
      const uniqueIps = new Set(downloads.map((d) => d.ip)).size;
      const uniqueCities = new Set(
        downloads
          .map((d) => d.city)
          .filter((c) => c !== 'Localhost' && c !== 'Desconhecido')
      ).size || (totalDownloads > 0 ? 1 : 0);

      const reply = 
        `📊 *Estatísticas Gerais de Downloads*\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `📥 *Total de Cliques:* \`${totalDownloads}\`\n` +
        `👥 *IPs Únicos:* \`${uniqueIps}\`\n` +
        `📍 *Cidades:* \`${uniqueCities}\`\n\n` +
        `_Banco de dados: ${isKvConfigured ? 'Vercel KV (Redis) ☁️' : 'Memória Temporária ⚠️'}_`;

      await sendTelegramMessage(chatId, reply);
    } 
    else if (command === '/estados') {
      if (downloads.length === 0) {
        await sendTelegramMessage(chatId, '📍 *Estatísticas por Estado*\n━━━━━━━━━━━━━━━━━━\nNenhum download registrado.');
        return NextResponse.json({ success: true });
      }

      // Group by region (state)
      const statesMap: Record<string, number> = {};
      downloads.forEach((d) => {
        const state = d.region || 'Outros/Desconhecido';
        statesMap[state] = (statesMap[state] || 0) + 1;
      });

      // Sort states by count descending
      const sortedStates = Object.entries(statesMap).sort((a, b) => b[1] - a[1]);

      let reply = `📍 *Downloads por Estado*\n━━━━━━━━━━━━━━━━━━\n`;
      sortedStates.forEach(([state, count]) => {
        reply += `▪️ *${state}:* \`${count}\` download(s)\n`;
      });

      await sendTelegramMessage(chatId, reply);
    }
    else if (command === '/start') {
      const reply = 
        `👋 *Olá! Bem-vindo ao painel MK NET!*\n\n` +
        `Comandos disponíveis:\n` +
        `▫️ /total - Ver total de downloads, IPs e cidades.\n` +
        `▫️ /estados - Ver downloads agrupados por Estado.`;
      
      await sendTelegramMessage(chatId, reply);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error processing Telegram webhook:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
