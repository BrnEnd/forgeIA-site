import Link from 'next/link';

const quickLinks = [
  { label: 'Serviços', href: '/servicos' },
  { label: 'Briefing', href: '/briefing' },
  { label: 'Contato', href: '/contato' }
];

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/forgeia' },
  { label: 'GitHub', href: 'https://github.com/forgeia' }
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-brand-800/60 bg-brand-900/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
        <div className="space-y-3">
          <h3 className="font-display text-xl text-brand-100">ForgeIA Studio</h3>
          <p className="text-sm text-brand-300">
            Inteligência aplicada. Design que pensa. Código que resolve.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-brand-300">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand-100">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Conecte-se</h4>
          <ul className="mt-3 space-y-2 text-sm text-brand-300">
            {socials.map((social) => (
              <li key={social.href}>
                <Link href={social.href} className="hover:text-brand-100" target="_blank" rel="noreferrer">
                  {social.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-800/60 py-4 text-center text-xs text-brand-500">
        © {new Date().getFullYear()} ForgeIA Studio. Todos os direitos reservados.
      </div>
    </footer>
  );
}
