'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'ghost' | 'outline';

const baseStyles =
  'inline-flex items-center justify-center rounded-2xl border border-transparent px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 disabled:pointer-events-none disabled:opacity-50';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-500 text-brand-900 shadow-glow hover:-translate-y-0.5 hover:shadow-lg focus-visible:shadow-glow',
  ghost:
    'bg-transparent text-brand-100 border border-brand-300/40 hover:border-brand-500 hover:bg-brand-800/60',
  outline:
    'bg-brand-900/60 border border-brand-300/40 text-brand-100 hover:border-brand-500 hover:bg-brand-800/60'
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, variant = 'primary', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(baseStyles, variantStyles[variant], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
