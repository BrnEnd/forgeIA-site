'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends CheckboxPrimitive.CheckboxProps {
  label: string;
  description?: string;
}

export function Checkbox({ label, description, className, ...props }: CheckboxProps) {
  return (
    <label className={cn('glow-border flex cursor-pointer items-start gap-3 rounded-2xl border border-brand-300/20 bg-brand-900/40 p-4 transition hover:border-brand-500 focus-within:border-brand-500', className)}>
      <CheckboxPrimitive.Root
        className="btn-focus mt-1 flex h-5 w-5 items-center justify-center rounded-md border border-brand-300/50 bg-brand-800/60"
        {...props}
      >
        <CheckboxPrimitive.Indicator>
          <Check className="h-4 w-4 text-brand-500" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <span className="space-y-1">
        <span className="block text-sm font-medium text-brand-100">{label}</span>
        {description ? <span className="block text-xs text-brand-300">{description}</span> : null}
      </span>
    </label>
  );
}
