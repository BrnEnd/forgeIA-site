import * as React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'btn-focus flex h-12 w-full rounded-2xl border border-brand-300/30 bg-brand-900/60 px-4 text-sm text-brand-100 placeholder:text-brand-300 focus-visible:border-brand-500',
        className
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';
