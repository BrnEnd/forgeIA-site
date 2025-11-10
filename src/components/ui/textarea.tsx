import * as React from 'react';
import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'btn-focus min-h-[120px] w-full rounded-2xl border border-brand-300/30 bg-brand-900/60 px-4 py-3 text-sm text-brand-100 placeholder:text-brand-300 focus-visible:border-brand-500',
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
