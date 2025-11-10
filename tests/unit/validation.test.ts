import { describe, expect, it } from 'vitest';
import { leadSchema } from '@/lib/validation';

describe('leadSchema', () => {
  const validPayload = {
    services: ['web'],
    goals: 'Lançar uma plataforma B2B para 100 clientes.',
    features: ['Autenticação e perfis'],
    scope_notes: 'Integração com ERP interno e dashboard em tempo real.',
    timeline: '90_dias',
    budget_range: '60000-120000',
    name: 'Maria Silva',
    company: 'Empresa X',
    email: 'maria@empresa.com',
    phone: '+55 11 99999-8888',
    location: 'São Paulo - SP',
    consent: true
  };

  it('valida um payload completo', () => {
    const result = leadSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('falha quando nenhum serviço é selecionado', () => {
    const result = leadSchema.safeParse({ ...validPayload, services: [] });
    expect(result.success).toBe(false);
  });
});
