'use client';

import { Controller, type UseFormReturn } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Field } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import type { StepServicesInput } from '@/lib/validation';

const serviceOptions = [
  { value: 'web', label: 'Sistemas Web' },
  { value: 'mobile', label: 'Aplicativos Mobile' },
  { value: 'ia', label: 'Agentes Autônomos de IA' },
  { value: 'auto', label: 'Automação de Processos' },
  { value: 'lp', label: 'Landing Pages' }
];

interface StepServicesProps {
  form: UseFormReturn<StepServicesInput>;
}

export function StepServices({ form }: StepServicesProps) {
  const selected = form.watch('services');

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {serviceOptions.map((option) => (
          <Controller
            key={option.value}
            name="services"
            control={form.control}
            render={({ field }) => {
              const isChecked = selected?.includes(option.value) ?? false;
              return (
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked) => {
                    const value = option.value;
                    if (checked) {
                      field.onChange([...(field.value ?? []), value]);
                    } else {
                      field.onChange(field.value?.filter((item: string) => item !== value) ?? []);
                    }
                  }}
                  label={option.label}
                  value={option.value}
                />
              );
            }}
          />
        ))}
      </div>
      {form.formState.errors.services ? (
        <p className="text-sm text-red-400" role="alert">
          {form.formState.errors.services.message}
        </p>
      ) : null}
      <Field
        label="Qual o objetivo principal deste projeto?"
        htmlFor="goals"
        required
        error={form.formState.errors.goals?.message}
        description="Compartilhe o problema que deseja resolver e os indicadores de sucesso."
      >
        <Textarea id="goals" rows={6} {...form.register('goals')} />
      </Field>
    </div>
  );
}
