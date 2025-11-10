'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Field } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
import { getWhatsappLink } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(3, 'Informe seu nome'),
  email: z.string().email('E-mail inválido'),
  message: z.string().min(10, 'Conte um pouco sobre o projeto')
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (values: ContactForm) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      toast.error('Não foi possível enviar. Tente novamente.');
      return;
    }

    toast.success('Recebemos sua mensagem! Retornaremos em breve.');
    reset();
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 px-6 pb-24 pt-24 sm:px-12">
      <header className="space-y-4 text-center">
        <h1 className="font-display text-4xl text-brand-100">Vamos conversar?</h1>
        <p className="text-brand-300">
          Queremos entender o momento da sua empresa e como podemos ajudar. Envie uma mensagem rápida ou fale conosco agora pelo WhatsApp.
        </p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="glow-border space-y-6 rounded-2xl border border-brand-300/20 bg-brand-800/40 p-8 shadow-sm"
      >
        <Field label="Nome" htmlFor="name" required error={errors.name?.message ?? ''}>
          <Input id="name" autoComplete="name" {...register('name')} />
        </Field>
        <Field label="E-mail" htmlFor="email" required error={errors.email?.message ?? ''}>
          <Input id="email" type="email" autoComplete="email" {...register('email')} />
        </Field>
        <Field label="Mensagem" htmlFor="message" required error={errors.message?.message ?? ''}>
          <Textarea id="message" rows={6} {...register('message')} />
        </Field>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
          </Button>
          <Link
            href={getWhatsappLink()}
            className="text-sm text-brand-500 underline-offset-4 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Falar no WhatsApp
          </Link>
        </div>
      </form>
    </main>
  );
}
