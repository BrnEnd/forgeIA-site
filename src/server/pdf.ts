function escapePdfText(text) {
  return String(text || '')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\r?\n/g, ' ');
}

export function generateLeadPdf(lead) {
  const lines = [
    'ForgeIA Studio - Briefing',
    '',
    `Serviços: ${lead.services.join(', ')}`,
    `Objetivos: ${lead.goals}`,
    `Funcionalidades: ${lead.features.join(', ')}`,
    `Notas de escopo: ${lead.scope_notes || 'N/A'}`,
    `Prazo: ${lead.timeline}`,
    `Investimento: ${lead.budget_range}`,
    '',
    'Dados do cliente',
    `Nome: ${lead.name}`,
    `Empresa: ${lead.company || 'N/A'}`,
    `Email: ${lead.email}`,
    `Telefone: ${lead.phone}`,
    `Localização: ${lead.location}`,
    `Consentimento: ${lead.consent ? 'Sim' : 'Não'}`
  ];

  const text = lines.map((line) => escapePdfText(line)).join(' (\n) Tj\nT* ');
  const contentStream = `BT /F1 12 Tf 50 760 Td (${text}) Tj ET`;
  const contentLength = contentStream.length;

  const objects = [
    '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
    '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
    '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj',
    `4 0 obj << /Length ${contentLength} >> stream\n${contentStream}\nendstream endobj`,
    '5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj'
  ];

  const xrefPositions = [];
  let offset = '%PDF-1.4\n'.length;
  const bodyParts = objects.map((obj) => {
    const part = `${obj}\n`;
    xrefPositions.push(offset);
    offset += part.length;
    return part;
  });

  const xrefStart = offset;
  const xrefEntries = ['0000000000 65535 f '].concat(
    xrefPositions.map((pos) => `${String(pos).padStart(10, '0')} 00000 n `)
  );

  const pdf = [
    '%PDF-1.4',
    ...bodyParts,
    'xref',
    `0 ${xrefEntries.length}`,
    xrefEntries.join('\n'),
    'trailer << /Size 6 /Root 1 0 R >>',
    `startxref`,
    String(xrefStart),
    '%%EOF'
  ].join('\n');

  return Buffer.from(pdf, 'utf8');
}
