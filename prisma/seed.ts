import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.lead.findFirst();
  if (!existing) {
    await prisma.lead.create({
      data: {
        services: ['web'],
        goals: 'Explorar prova de conceito para plataforma SaaS B2B.',
        features: ['Painel administrativo', 'Integração com pagamentos'],
        scope_notes: 'Desejamos validar com 100 usuários beta em 90 dias.',
        timeline: '90_dias',
        budget_range: '80000-120000',
        name: 'João Silva',
        company: 'InovaTech',
        email: 'joao@inovatech.com',
        phone: '+55 11 99999-9999',
        location: 'São Paulo - SP',
        consent: true
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
