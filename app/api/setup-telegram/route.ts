import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '7557767648:AAF7Z4tPmL65UBv1myjWoeILF7AsBGYD_58';

export async function GET(request: NextRequest) {
  try {
    // Get host from headers to detect the domain (e.g. mknetinternetilimitada.vercel.app or localhost:3000)
    const host = request.headers.get('host');
    const protocol = request.nextUrl.protocol;
    
    // We construct the webhook URL targeting the /api/telegram-webhook route
    const webhookUrl = `${protocol}//${host}/api/telegram-webhook`;
    
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook?url=${webhookUrl}`;
    
    const res = await fetch(telegramUrl);
    const data = await res.json();
    
    return NextResponse.json({
      success: data.ok,
      message: data.description,
      webhookUrlRegistered: webhookUrl,
      rawResponse: data
    });
  } catch (error: any) {
    console.error('Error setting up Telegram webhook:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
