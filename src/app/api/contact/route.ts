import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  message: z.string().min(10)
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.warn('RESEND_API_KEY não configurada. Simulando envio.');
      return NextResponse.json({ ok: true, simulated: true });
    }

    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: 'ForgeIA Studio <contato@mail.forgeia.studio>',
      to: ['contato@forgeia.studio'],
      subject: `Novo contato de ${parsed.data.name}`,
      reply_to: parsed.data.email,
      text: parsed.data.message
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
