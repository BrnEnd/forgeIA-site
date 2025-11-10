import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  requiredMark?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, requiredMark, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn('text-sm font-medium text-brand-100', className)}
        {...props}
      >
        {children}
        {requiredMark ? <span className="text-brand-500"> *</span> : null}
      </label>
    );
  }
);
Label.displayName = 'Label';
