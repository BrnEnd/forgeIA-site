import type { Metadata } from 'next';
import Link from 'next/link';
import { CTAButton } from '@/components/layout/cta-button';

const services = [
  {
    id: 'web',
    title: 'Sistemas Web',
    deliverables: [
      'Arquitetura full-stack escalável',
      'Design System e bibliotecas de componentes',
      'Integração com APIs críticas'
    ],
    timeline: '12-16 semanas',
    budget: 'A partir de R$ 120 mil'
  },
  {
    id: 'mobile',
    title: 'Aplicativos Mobile',
    deliverables: [
      'Apps nativos iOS/Android ou React Native',
      'Pipelines CI/CD e publicações assistidas',
      'Monitoramento de performance e crashes'
    ],
    timeline: '10-14 semanas',
    budget: 'A partir de R$ 90 mil'
  },
  {
    id: 'ia',
    title: 'Agentes Autônomos de IA',
    deliverables: [
      'Orquestração com LLMs, ferramentas e memórias',
      'Dashboards de observabilidade e alinhamento',
      'Finetuning e avaliação contínua'
    ],
    timeline: '6-10 semanas',
    budget: 'A partir de R$ 70 mil'
  },
  {
    id: 'auto',
    title: 'Automação de Processos',
    deliverables: [
      'Mapeamento de fluxos e descoberta de gargalos',
      'Implementação de integrações e RPA inteligentes',
      'Playbooks e enablement para o time interno'
    ],
    timeline: '4-8 semanas',
    budget: 'A partir de R$ 50 mil'
  },
  {
    id: 'lp',
    title: 'Landing Pages',
    deliverables: [
      'Copywriting orientado a conversão',
      'Componentes responsivos e acessíveis',
      'Testes A/B e SEO técnico'
    ],
    timeline: '2-4 semanas',
    budget: 'A partir de R$ 18 mil'
  }
];

export const metadata: Metadata = {
  title: 'Serviços',
  description:
    'Conheça o portfólio de serviços ForgeIA Studio: produtos digitais, automações e agentes autônomos com IA.'
};

export default function ServicesPage() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 pb-24 pt-24 sm:px-12">
      <header className="space-y-4 text-center">
        <h1 className="font-display text-4xl text-brand-100">Especialistas em experiências inteligentes</h1>
        <p className="text-brand-300">
          Escolha a trilha ideal para o seu desafio. Mantemos cadência semanal, entregáveis claros e comunicação aberta.
        </p>
      </header>

      <div className="space-y-10">
        {services.map((service) => (
          <section
            key={service.id}
            className="glow-border rounded-2xl border border-brand-300/20 bg-brand-800/40 p-8 shadow-sm"
            id={service.id}
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="space-y-4 md:max-w-xl">
                <h2 className="font-display text-3xl text-brand-100">{service.title}</h2>
                <ul className="grid gap-2 text-sm text-brand-300">
                  {service.deliverables.map((item) => (
                    <li key={item} className="rounded-xl border border-brand-300/10 bg-brand-900/40 px-4 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-brand-500/30 bg-brand-900/40 p-6 text-sm text-brand-300">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-brand-500">Prazo típico</span>
                  <p className="font-medium text-brand-100">{service.timeline}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-brand-500">Investimento</span>
                  <p className="font-medium text-brand-100">{service.budget}</p>
                </div>
                <CTAButton
                  href={`/briefing?service=${service.id}`}
                  fallbackLabel="Iniciar briefing"
                  variant="primary"
                />
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-2xl border border-brand-500/30 bg-brand-800/30 p-10 text-center">
        <h2 className="font-display text-3xl text-brand-100">Tem um desafio híbrido?</h2>
        <p className="text-brand-300">
          Combine serviços e co-crie um roadmap com nossos especialistas. Basta indicar as frentes no briefing e retornamos em até 24h úteis.
        </p>
        <CTAButton href="/briefing" fallbackLabel="Começar projeto" variant="primary" />
        <Link className="text-sm text-brand-300" href="/">
          Voltar para a Home
        </Link>
      </div>
    </main>
  );
}
