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
  title: 'MK NET VPN - Internet Ultra Veloz Sem Limites',
  description: 'A MK NET oferece a melhor conexão VPN para todas as operadoras (Vivo, Tim, Claro e Oi) no Brasil. Navegue com ultra velocidade, segurança total e privacidade absoluta.',
  keywords: ['VPN', 'MK NET', 'Internet Grátis', 'Ultra Velocidade', 'VPN Brasil', 'Vivo', 'Tim', 'Claro', 'Oi', 'todas as operadoras'],
  authors: [{ name: 'MK NET' }],
  viewport: 'width=device-width, initial-scale=1',
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
