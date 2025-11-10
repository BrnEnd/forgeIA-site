import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validation';
import { prisma } from '@/lib/prisma';
import { generateNonce } from '@/lib/security';
import { isDatabaseEnabled, persistFallbackLead } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    let id: string;
    let nonce: string;

    if (isDatabaseEnabled()) {
      const lead = await prisma.lead.create({
        data
      });
      id = lead.id;
      nonce = generateNonce(id);
    } else {
      id = crypto.randomUUID();
      nonce = generateNonce(id);
      await persistFallbackLead({ ...data, id, nonce, created_at: new Date().toISOString() });
    }

    return NextResponse.json({ ok: true, id, nonce });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
