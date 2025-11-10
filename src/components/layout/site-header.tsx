'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CTAButton } from '@/components/layout/cta-button';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Home' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/briefing', label: 'Briefing' },
  { href: '/contato', label: 'Contato' }
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-800/60 bg-brand-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-display text-xl text-brand-100">
          ForgeIA Studio
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-brand-300 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition hover:text-brand-100',
                pathname === link.href ? 'text-brand-100' : 'text-brand-300'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <CTAButton href="/briefing" fallbackLabel="Começar projeto" className="hidden sm:inline-flex" />
        <Link
          href="/briefing"
          className="sm:hidden text-sm text-brand-500 underline-offset-4 hover:underline"
        >
          Briefing
        </Link>
      </div>
    </header>
  );
}
