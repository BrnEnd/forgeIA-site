'use client';

import type { ReactNode } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import type { StepConfirmInput } from '@/lib/validation';
import { getWhatsappLink } from '@/lib/utils';

interface StepConfirmProps {
  form: UseFormReturn<StepConfirmInput>;
  summary: ReactNode;
}

export function StepConfirm({ form, summary }: StepConfirmProps) {
  const consent = form.watch('consent');

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-brand-300/20 bg-brand-900/40 p-6 text-sm text-brand-300">
        {summary}
      </div>
      <Checkbox
        checked={consent}
        onCheckedChange={(checked) => form.setValue('consent', Boolean(checked))}
        label="Autorizo contato da ForgeIA Studio e confirmo leitura da política de privacidade."
        description={`Podemos entrar em contato via e-mail ou WhatsApp (${getWhatsappLink().replace('https://', '')}).`}
      />
      {form.formState.errors.consent ? (
        <p className="text-sm text-red-400" role="alert">
          {form.formState.errors.consent.message}
        </p>
      ) : null}
    </div>
  );
}
