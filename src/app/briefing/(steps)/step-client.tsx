'use client';

import { type UseFormReturn } from 'react-hook-form';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { StepClientInput } from '@/lib/validation';

interface StepClientProps {
  form: UseFormReturn<StepClientInput>;
}

export function StepClient({ form }: StepClientProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Field label="Nome completo" htmlFor="name" required error={form.formState.errors.name?.message}>
        <Input id="name" autoComplete="name" {...form.register('name')} />
      </Field>
      <Field label="Empresa" htmlFor="company" required error={form.formState.errors.company?.message}>
        <Input id="company" autoComplete="organization" {...form.register('company')} />
      </Field>
      <Field label="E-mail" htmlFor="email" required error={form.formState.errors.email?.message}>
        <Input id="email" type="email" autoComplete="email" {...form.register('email')} />
      </Field>
      <Field label="Telefone / WhatsApp" htmlFor="phone" required error={form.formState.errors.phone?.message}>
        <Input
          id="phone"
          placeholder="+55 11 99999-9999"
          {...form.register('phone', {
            onChange: (event) => {
              const value = event.target.value.replace(/\D/g, '');
              const masked = value
                .replace(/^\+?/, '')
                .replace(/(\d{2})(\d)/, '+$1 $2')
                .replace(/(\d{2}) (\d{1})(\d{4})(\d{4})/, '+$1 $2 $3-$4');
              event.target.value = masked;
              form.setValue('phone', masked, { shouldValidate: true });
            }
          })}
        />
      </Field>
      <Field
        label="Cidade / Estado"
        htmlFor="location"
        required
        error={form.formState.errors.location?.message}
        description="Ex: São Paulo - SP"
      >
        <Input id="location" {...form.register('location')} />
      </Field>
    </div>
  );
}
