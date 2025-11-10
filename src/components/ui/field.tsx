import { Label } from '@/components/ui/label';
import type { ReactNode } from 'react';

interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  description?: string;
  error?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, required, description, error, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} requiredMark={required}>
        {label}
      </Label>
      {description ? <p className="text-xs text-brand-300">{description}</p> : null}
      {children}
      {error ? <p className="text-xs text-red-400" role="alert">{error}</p> : null}
    </div>
  );
}
