import test from 'node:test';
import assert from 'node:assert';
import { validateLeadPayload, validateContactPayload } from '../src/server/validation.ts';

test('validateLeadPayload requires services and goals', () => {
  const result = validateLeadPayload({ services: [], goals: '' });
  assert.strictEqual(result.ok, false);
  assert.ok(result.errors.services);
  assert.ok(result.errors.goals);
});

test('validateLeadPayload accepts valid payload', () => {
  const payload = {
    services: ['web'],
    goals: 'Construir plataforma B2B',
    features: ['autenticacao'],
    scope_notes: '',
    timeline: '60',
    budget_range: '30-60',
    name: 'João Silva',
    company: 'Forge Teste',
    email: 'joao@forgeia.studio',
    phone: '+5511999999999',
    location: 'São Paulo - SP',
    consent: true
  };
  const result = validateLeadPayload(payload);
  assert.strictEqual(result.ok, true);
  assert.deepStrictEqual(result.value.services, ['web']);
});

test('validateContactPayload fails without email', () => {
  const result = validateContactPayload({ name: 'Ana', email: '', message: 'Oi' });
  assert.strictEqual(result.ok, false);
  assert.ok(result.errors.email);
});

