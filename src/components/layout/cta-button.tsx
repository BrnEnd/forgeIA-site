'use client';

import Link from 'next/link';
import { Button, type ButtonProps } from '@/components/ui/button';
import { useLocale } from '@/lib/i18n';

interface CTAButtonProps extends Omit<ButtonProps, 'children'> {
  href: string;
  labelKey?: string;
  fallbackLabel: string;
}

export function CTAButton({ href, labelKey = 'ctaStart', fallbackLabel, ...props }: CTAButtonProps) {
  const { t } = useLocale();

  return (
    <Button asChild {...props}>
      <Link href={href} aria-label={fallbackLabel}>
        {t(labelKey) ?? fallbackLabel}
      </Link>
    </Button>
  );
}
