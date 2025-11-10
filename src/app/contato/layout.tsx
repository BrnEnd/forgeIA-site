import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Fale com a ForgeIA Studio e descubra como aceleramos o seu produto digital.'
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
