import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Briefing de projeto',
  description:
    'Conduza o briefing completo para projetos ForgeIA Studio em um fluxo orientado a resultados, com salvamento e PDF automático.'
};

export default function BriefingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
