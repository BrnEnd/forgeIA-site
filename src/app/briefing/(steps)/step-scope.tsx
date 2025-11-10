'use client';

import { Controller, type UseFormReturn } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Field } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import type { StepScopeInput } from '@/lib/validation';

const featureOptions = [
  'Autenticação e perfis',
  'Integrações com terceiros',
  'Painéis e relatórios',
  'Automação de tarefas',
  'Chatbots e assistentes IA',
  'E-commerce ou pagamentos',
  'Aplicativos mobile',
  'Infraestrutura e DevOps'
];

interface StepScopeProps {
  form: UseFormReturn<StepScopeInput>;
}

export function StepScope({ form }: StepScopeProps) {
  const selected = form.watch('features');

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {featureOptions.map((option) => (
          <Controller
            key={option}
            name="features"
            control={form.control}
            render={({ field }) => {
              const isChecked = selected?.includes(option) ?? false;
              return (
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      field.onChange([...(field.value ?? []), option]);
                    } else {
                      field.onChange(field.value?.filter((item: string) => item !== option) ?? []);
                    }
                  }}
                  label={option}
                  value={option}
                />
              );
            }}
          />
        ))}
      </div>
      {form.formState.errors.features ? (
        <p className="text-sm text-red-400" role="alert">
          {form.formState.errors.features.message}
        </p>
      ) : null}
      <Field
        label="Quais funcionalidades ou integrações são essenciais?"
        htmlFor="scope_notes"
        required
        error={form.formState.errors.scope_notes?.message}
      >
        <Textarea
          id="scope_notes"
          rows={6}
          placeholder="Liste integrações, restrições técnicas e prioridades."
          {...form.register('scope_notes')}
        />
      </Field>
    </div>
  );
}
