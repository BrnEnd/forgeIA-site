'use client';

import { motion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  const list = [...items, ...items];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand-300/20 bg-brand-800/30 py-4">
      <motion.div
        className="flex min-w-full items-center gap-10"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
      >
        {list.map((item, index) => (
          <span key={`${item}-${index}`} className="font-accent text-sm uppercase tracking-[0.5em] text-brand-300">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
