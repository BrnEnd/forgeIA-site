"use client";

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function ServiceCard({ icon: Icon, title, description, className }: ServiceCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
      className={cn(
        'glow-border relative flex h-full flex-col rounded-2xl border border-brand-300/20 bg-brand-800/40 p-6 text-left shadow-sm backdrop-blur-lg',
        className
      )}
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-500">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 font-display text-xl text-brand-100">{title}</h3>
      <p className="text-sm text-brand-300">{description}</p>
    </motion.article>
  );
}
