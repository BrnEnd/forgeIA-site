import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Inter, Poppins, Space_Grotesk } from 'next/font/google';
import '../styles/globals.css';
import { cn } from '@/lib/utils';
import { LocaleProvider } from '@/lib/i18n';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Toaster } from 'sonner';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-poppins'
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk'
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://forgeia.studio'),
  title: {
    default: 'ForgeIA Studio — Criamos sistemas que pensam',
    template: '%s | ForgeIA Studio'
  },
  description:
    'ForgeIA Studio une estratégia, design e engenharia para entregar experiências digitais inteligentes e de alta performance.',
  applicationName: 'ForgeIA Studio',
  authors: [{ name: 'ForgeIA Studio' }],
  keywords: [
    'ForgeIA',
    'desenvolvimento web',
    'aplicativos mobile',
    'automação com IA',
    'agentes autônomos'
  ],
  openGraph: {
    title: 'ForgeIA Studio — Criamos sistemas que pensam.',
    description:
      'Inteligência aplicada. Design que pensa. Código que resolve. Descubra como podemos acelerar seu próximo produto digital.',
    url: 'https://forgeia.studio',
    siteName: 'ForgeIA Studio',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'ForgeIA Studio'
      }
    ],
    locale: 'pt_BR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ForgeIA Studio',
    description: 'Inteligência aplicada. Design que pensa. Código que resolve.',
    images: ['/api/og']
  },
  alternates: {
    canonical: 'https://forgeia.studio'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={cn(poppins.variable, spaceGrotesk.variable, inter.variable)}>
      <body className="min-h-screen bg-brand-900 text-brand-100 antialiased flex flex-col">
        <LocaleProvider defaultLocale="pt-BR">
          <SiteHeader />
          <div className="mx-auto w-full max-w-6xl flex-1">{children}</div>
          <SiteFooter />
          <Analytics />
          <Toaster richColors position="top-center" closeButton />
        </LocaleProvider>
      </body>
    </html>
  );
}
