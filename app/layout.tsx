import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'MK NET VPN | Ultra Veloz em Todo o Brasil',
  description: 'Conecte-se com ultra velocidade nas operadoras Vivo e Tim. A VPN mais rápida do Brasil.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning className="bg-[#050505] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
