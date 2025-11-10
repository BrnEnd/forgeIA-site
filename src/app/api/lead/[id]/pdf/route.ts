import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { prisma } from '@/lib/prisma';
import { getFallbackLead, isDatabaseEnabled } from '@/lib/utils';
import { verifyNonce } from '@/lib/security';
import { PDFBriefing } from '@/components/briefing/pdf-briefing';

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const nonce = searchParams.get('nonce');

  if (!nonce || !verifyNonce(id, nonce)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  try {
    let payload: any = null;

    if (isDatabaseEnabled()) {
      payload = await prisma.lead.findUnique({ where: { id } });
    } else {
      payload = await getFallbackLead(id);
    }

    if (!payload) {
      return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
    }

    const createdAt = payload.created_at instanceof Date
      ? payload.created_at.toISOString()
      : payload.created_at ?? new Date().toISOString();

    const buffer = await renderToBuffer(
      <PDFBriefing
        id={id}
        created_at={createdAt}
        services={payload.services}
        goals={payload.goals}
        features={payload.features}
        scope_notes={payload.scope_notes}
        timeline={payload.timeline}
        budget_range={payload.budget_range}
        name={payload.name}
        company={payload.company}
        email={payload.email}
        phone={payload.phone}
        location={payload.location}
        consent={payload.consent}
      />
    );

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=forgeia-briefing-${id}.pdf`
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
