'use client';

import { type UseFormReturn } from 'react-hook-form';
import { Field } from '@/components/ui/field';
import { Select } from '@/components/ui/select';
import type { StepTimelineInput } from '@/lib/validation';

const timelineOptions = [
  { label: 'Selecione uma opção', value: '', disabled: true },
  { label: 'Quanto antes (até 30 dias)', value: '30_dias' },
  { label: 'Em até 60 dias', value: '60_dias' },
  { label: 'Em até 90 dias', value: '90_dias' },
  { label: 'Planejamento para 6 meses', value: '180_dias' }
];

const budgetOptions = [
  { label: 'Selecione uma faixa', value: '', disabled: true },
  { label: 'R$ 30k — R$ 60k', value: '30000-60000' },
  { label: 'R$ 60k — R$ 120k', value: '60000-120000' },
  { label: 'R$ 120k — R$ 250k', value: '120000-250000' },
  { label: 'Acima de R$ 250k', value: '250000-999999' }
];

interface StepTimelineProps {
  form: UseFormReturn<StepTimelineInput>;
}

export function StepTimeline({ form }: StepTimelineProps) {
  return (
    <div className="space-y-6">
      <Field
        label="Quando deseja lançar?"
        htmlFor="timeline"
        required
        error={form.formState.errors.timeline?.message}
      >
        <Select id="timeline" options={timelineOptions} {...form.register('timeline')} />
      </Field>
      <Field
        label="Qual a faixa de investimento estimada?"
        htmlFor="budget_range"
        required
        error={form.formState.errors.budget_range?.message}
      >
        <Select id="budget_range" options={budgetOptions} {...form.register('budget_range')} />
      </Field>
    </div>
  );
}
