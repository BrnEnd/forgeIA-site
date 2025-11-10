'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { track } from '@vercel/analytics/react';
import { WizardLayout } from '@/components/briefing/wizard-layout';
import { Button } from '@/components/ui/button';
import { useBriefingStore } from '@/store/briefing-store';
import {
  stepServicesSchema,
  stepScopeSchema,
  stepTimelineSchema,
  stepClientSchema,
  stepConfirmSchema,
  type StepServicesInput,
  type StepScopeInput,
  type StepTimelineInput,
  type StepClientInput,
  type StepConfirmInput,
  leadSchema,
  type LeadInput
} from '@/lib/validation';
import { toast } from 'sonner';
import { getWhatsappLink } from '@/lib/utils';
import Link from 'next/link';
import type { LeadResponse } from '@/types/lead';

const StepServices = dynamic(() => import('./(steps)/step-services').then((mod) => mod.StepServices), {
  ssr: false
});
const StepScope = dynamic(() => import('./(steps)/step-scope').then((mod) => mod.StepScope), {
  ssr: false
});
const StepTimeline = dynamic(() => import('./(steps)/step-timeline').then((mod) => mod.StepTimeline), {
  ssr: false
});
const StepClient = dynamic(() => import('./(steps)/step-client').then((mod) => mod.StepClient), {
  ssr: false
});
const StepConfirm = dynamic(() => import('./(steps)/step-confirm').then((mod) => mod.StepConfirm), {
  ssr: false
});

const stepConfig = [
  {
    title: 'Projeto & objetivos',
    schema: stepServicesSchema,
    Component: StepServices,
    withSummary: false
  },
  {
    title: 'Escopo & funcionalidades',
    schema: stepScopeSchema,
    Component: StepScope,
    withSummary: false
  },
  {
    title: 'Prazos & investimento',
    schema: stepTimelineSchema,
    Component: StepTimeline,
    withSummary: false
  },
  {
    title: 'Sobre você',
    schema: stepClientSchema,
    Component: StepClient,
    withSummary: false
  },
  {
    title: 'Confirmação',
    schema: stepConfirmSchema,
    Component: StepConfirm,
    withSummary: true
  }
] as const;

const stepsTitles = stepConfig.map((step) => step.title);

type StepSchema =
  | StepServicesInput
  | StepScopeInput
  | StepTimelineInput
  | StepClientInput
  | StepConfirmInput;

type SubmissionState = (LeadInput & { id: string; nonce: string }) | null;

const serviceAlias: Record<string, string> = {
  web: 'Sistemas Web',
  mobile: 'Aplicativos Mobile',
  ia: 'Agentes Autônomos de IA',
  auto: 'Automação de Processos',
  lp: 'Landing Pages'
};

const timelineLabels: Record<string, string> = {
  '30_dias': 'Até 30 dias',
  '60_dias': 'Até 60 dias',
  '90_dias': 'Até 90 dias',
  '180_dias': 'Planejamento para 6 meses'
};

const budgetLabels: Record<string, string> = {
  '30000-60000': 'R$ 30k — R$ 60k',
  '60000-120000': 'R$ 60k — R$ 120k',
  '120000-250000': 'R$ 120k — R$ 250k',
  '250000-999999': 'Acima de R$ 250k'
};

export default function BriefingPage() {
  const searchParams = useSearchParams();
  const { step, data, setStep, update, reset } = useBriefingStore();
  const [submission, setSubmission] = useState<SubmissionState>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const service = searchParams.get('service');
    if (service && !data.services?.includes(service)) {
      update({ services: [...(data.services ?? []), service] });
    }
  }, [searchParams, data.services, update]);

  const currentSchema = stepConfig[step].schema;
  const resolver = useMemo(() => zodResolver(currentSchema), [currentSchema]);
  const defaultValues = useMemo(() => ({
    ...data
  }), [data]);

  const form = useForm<StepSchema>({
    resolver,
    defaultValues,
    mode: 'onChange'
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form, step]);

  const goNext = () => setStep(Math.min(step + 1, stepConfig.length - 1));
  const goBack = () => setStep(Math.max(step - 1, 0));

  const onSubmit = async (values: StepSchema) => {
    update(values as Partial<LeadInput>);

    if (step < stepConfig.length - 1) {
      goNext();
      toast.success('Etapa salva! Vamos avançar.');
      return;
    }

    const parsed = leadSchema.safeParse({ ...data, ...values });
    if (!parsed.success) {
      toast.error('Revise as informações antes de enviar.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data)
      });

      if (!response.ok) {
        toast.error('Não foi possível salvar seu briefing. Tente novamente.');
        setIsLoading(false);
        return;
      }

      const payload = (await response.json()) as LeadResponse;
      setSubmission({ ...parsed.data, id: payload.id, nonce: payload.nonce });
      track('lead_submitted', { id: payload.id });
      toast.success('Briefing enviado com sucesso!');
      reset();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao enviar briefing. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!submission) {
      return;
    }
    setStep(0);
  }, [submission, setStep]);

  if (submission) {
    const pdfUrl = `/api/lead/${submission.id}/pdf?nonce=${submission.nonce}`;
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="rounded-2xl border border-brand-500/30 bg-brand-800/30 p-10 shadow-glow">
          <h1 className="font-display text-4xl text-brand-100">Recebemos seu briefing! 🚀</h1>
          <p className="mt-4 text-brand-300">
            Nosso time já está analisando os detalhes. Em até 24h úteis entraremos em contato com os próximos passos.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href={getWhatsappLink()} target="_blank" rel="noreferrer">
                Falar no WhatsApp
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href={pdfUrl} target="_blank" rel="noreferrer">
                Baixar briefing (PDF)
              </Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const summary = (
    <div className="space-y-3">
      <p>
        <strong className="text-brand-100">Serviços:</strong> {(data.services ?? [])
          .map((service) => serviceAlias[service] ?? service)
          .join(', ')}
      </p>
      <p>
        <strong className="text-brand-100">Objetivos:</strong> {data.goals}
      </p>
      <p>
        <strong className="text-brand-100">Funcionalidades:</strong> {(data.features ?? []).join(', ')}
      </p>
      <p>
        <strong className="text-brand-100">Prazos:</strong> {timelineLabels[data.timeline ?? ''] ?? data.timeline}
      </p>
      <p>
        <strong className="text-brand-100">Investimento:</strong> {budgetLabels[data.budget_range ?? ''] ?? data.budget_range}
      </p>
      <p>
        <strong className="text-brand-100">Contato:</strong> {data.name} · {data.email} · {data.phone} · {data.location}
      </p>
    </div>
  );

  const StepComponent = stepConfig[step].Component as React.ComponentType<any>;
  const stepProps = stepConfig[step].withSummary ? { summary } : {};

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-6xl flex-col gap-10 px-6 pb-24 pt-16">
      <WizardLayout steps={stepsTitles} currentStep={step}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <StepComponent form={form as any} {...stepProps} />
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <Button type="button" variant="ghost" onClick={goBack} disabled={step === 0}>
              Voltar
            </Button>
            <div className="flex gap-3">
              <Button type="submit" disabled={isLoading}>
                {step === stepConfig.length - 1 ? (isLoading ? 'Enviando...' : 'Enviar briefing') : 'Avançar'}
              </Button>
            </div>
          </div>
        </form>
      </WizardLayout>
    </main>
  );
}
