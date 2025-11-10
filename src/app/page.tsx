import type { Metadata } from 'next';
import Link from 'next/link';
import { CTAButton } from '@/components/layout/cta-button';
import { ServiceCard } from '@/components/layout/service-card';
import { serviceIcons } from '@/components/icons/service-icons';
import { Button } from '@/components/ui/button';
import { Marquee } from '@/components/layout/strip-marquee';
import { Workflow, Sparkles, ShieldCheck } from 'lucide-react';

const services = [
  {
    key: 'web',
    title: 'Sistemas Web',
    description: 'Portais, dashboards e plataformas SaaS com arquitetura escalável.'
  },
  {
    key: 'mobile',
    title: 'Aplicativos Mobile',
    description: 'Experiências nativas e híbridas integradas ao seu ecossistema.'
  },
  {
    key: 'ia',
    title: 'Agentes Autônomos de IA',
    description: 'Orquestração de modelos para processos autônomos e assistentes.'
  },
  {
    key: 'auto',
    title: 'Automação de Processos',
    description: 'Pipelines inteligentes que eliminam tarefas repetitivas.'
  },
  {
    key: 'lp',
    title: 'Landing Pages',
    description: 'Páginas de alta conversão otimizadas para campanhas.'
  }
];

const steps = [
  {
    icon: Workflow,
    title: 'Descoberta estratégica',
    description: 'Imersão com stakeholders para mapear objetivos, métricas e restrições.'
  },
  {
    icon: Sparkles,
    title: 'Design inteligente',
    description: 'Prototipação orientada a dados, fluxos acessíveis e jornadas encantadoras.'
  },
  {
    icon: ShieldCheck,
    title: 'Entrega contínua',
    description: 'Sprints curtos, observabilidade e garantia de qualidade em cada release.'
  }
];

const cases = [
  {
    title: 'Plataforma de investimento B2B',
    description: 'Redesign completo com automações de due diligence e painel para clientes.',
    badge: 'Sistemas Web'
  },
  {
    title: 'Assistente jurídico com IA',
    description: 'Agente autônomo que analisa contratos e sugere ações em minutos.',
    badge: 'Agentes Autônomos'
  },
  {
    title: 'Onboarding mobile gamificado',
    description: 'Aplicativo iOS/Android com scoring de engajamento em tempo real.',
    badge: 'Aplicativos Mobile'
  }
];

export const metadata: Metadata = {
  title: 'ForgeIA Studio — Criamos sistemas que pensam',
  description: 'Inteligência aplicada. Design que pensa. Código que resolve.'
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col gap-24 pb-24">
      <section className="relative overflow-hidden px-6 pb-24 pt-32 sm:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,194,255,0.18),_transparent_60%)]" />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-800/30 px-4 py-2 text-xs uppercase tracking-[0.4em] text-brand-300">
            ForgeIA Studio
          </span>
          <h1 className="font-display text-5xl leading-tight text-brand-100 sm:text-6xl">
            Criamos sistemas que pensam.
          </h1>
          <p className="mt-6 max-w-3xl font-accent text-lg text-brand-300">
            Inteligência aplicada. Design que pensa. Código que resolve.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CTAButton href="/briefing" fallbackLabel="Começar projeto" />
            <Button variant="ghost" asChild>
              <Link href="/servicos">Ver serviços</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <Marquee items={services.map((service) => service.title)} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.key}
              icon={serviceIcons[service.key as keyof typeof serviceIcons]}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto max-w-5xl space-y-10 text-center">
          <h2 className="font-display text-4xl text-brand-100">Como trabalhamos</h2>
          <p className="mx-auto max-w-2xl text-brand-300">
            Aceleramos times com rituais transparentes, muita colaboração e obsessão por resultados mensuráveis.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <ServiceCard
              key={step.title}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto max-w-5xl space-y-10 text-center">
          <h2 className="font-display text-4xl text-brand-100">Casos que contamos com orgulho</h2>
          <p className="mx-auto max-w-2xl text-brand-300">
            Histórias reais de parcerias que transformaram operações e ampliaram receitas.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {cases.map((item) => (
            <article
              key={item.title}
              className="glow-border flex h-full flex-col rounded-2xl border border-brand-300/20 bg-brand-800/40 p-6 text-left shadow-sm"
            >
              <span className="mb-4 inline-flex w-max rounded-full border border-brand-500/30 bg-brand-800/30 px-3 py-1 text-xs uppercase tracking-widest text-brand-300">
                {item.badge}
              </span>
              <h3 className="font-display text-2xl text-brand-100">{item.title}</h3>
              <p className="mt-3 text-sm text-brand-300">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-2xl border border-brand-500/30 bg-brand-800/30 p-12 text-center shadow-glow">
          <h2 className="font-display text-4xl text-brand-100">Pronto para construir o futuro da sua operação?</h2>
          <p className="max-w-2xl text-brand-300">
            Conte com uma equipe que combina engenharia, produto e IA para entregar impacto contínuo.
          </p>
          <CTAButton href="/briefing" fallbackLabel="Solicitar orçamento" />
        </div>
      </section>
    </main>
  );
}
