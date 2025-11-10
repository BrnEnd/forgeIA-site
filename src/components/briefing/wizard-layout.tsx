'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WizardLayoutProps {
  steps: string[];
  currentStep: number;
  children: React.ReactNode;
}

export function WizardLayout({ steps, currentStep, children }: WizardLayoutProps) {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 rounded-2xl border border-brand-300/20 bg-brand-800/40 p-8 shadow-lg backdrop-blur-xl">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-brand-300">Briefing</p>
        <h1 className="font-display text-3xl text-brand-100">{steps[currentStep]}</h1>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-brand-900/60">
          <motion.span
            className="absolute left-0 top-0 h-full rounded-full bg-brand-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 160, damping: 24 }}
          />
        </div>
        <p className="text-xs text-brand-300">
          Etapa {currentStep + 1} de {steps.length}
        </p>
      </header>
      <motion.section
        key={currentStep}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn('flex flex-col gap-6')}
      >
        {children}
      </motion.section>
    </div>
  );
}
