const SERVICE_OPTIONS = ['web', 'mobile', 'ia', 'automacao', 'landing'];
const FEATURE_OPTIONS = [
  'autenticacao',
  'painel-admin',
  'integracao-api',
  'pagamentos',
  'chatbot',
  'analytics',
  'automacoes'
];
const TIMELINE_OPTIONS = ['30', '60', '90', '120'];
const BUDGET_OPTIONS = ['10-30', '30-60', '60-120', '120+'];

function isString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function parseArray(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.split(',').map((item) => item.trim());
  }
  return [];
}

export function validateLeadPayload(payload) {
  const errors = {};
  const services = parseArray(payload.services).filter((service) => SERVICE_OPTIONS.includes(service));
  if (services.length === 0) {
    errors.services = 'Selecione pelo menos um serviço';
  }

  const goals = normalizeString(payload.goals);
  if (!goals) {
    errors.goals = 'Descreva o objetivo do negócio';
  }

  const features = parseArray(payload.features).filter((feature) => FEATURE_OPTIONS.includes(feature));
  const scopeNotes = normalizeString(payload.scope_notes);

  const timeline = normalizeString(payload.timeline);
  if (!TIMELINE_OPTIONS.includes(timeline)) {
    errors.timeline = 'Selecione um prazo estimado';
  }

  const budget = normalizeString(payload.budget_range);
  if (!BUDGET_OPTIONS.includes(budget)) {
    errors.budget_range = 'Informe a faixa de investimento';
  }

  const name = normalizeString(payload.name);
  if (!name) {
    errors.name = 'Informe seu nome';
  }

  const email = normalizeString(payload.email);
  if (!email || !email.includes('@')) {
    errors.email = 'Email inválido';
  }

  const phone = normalizeString(payload.phone);
  if (!phone) {
    errors.phone = 'Informe um telefone ou WhatsApp';
  }

  const location = normalizeString(payload.location);
  if (!location) {
    errors.location = 'Informe sua cidade e estado';
  }

  const company = normalizeString(payload.company);
  const consent = Boolean(payload.consent);

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      services,
      goals,
      features,
      scope_notes: scopeNotes,
      timeline,
      budget_range: budget,
      name,
      company,
      email,
      phone,
      location,
      consent
    }
  };
}

export function validateContactPayload(payload) {
  const errors = {};
  const name = normalizeString(payload.name);
  const email = normalizeString(payload.email);
  const message = normalizeString(payload.message);

  if (!name) {
    errors.name = 'Informe seu nome';
  }
  if (!email || !email.includes('@')) {
    errors.email = 'Email inválido';
  }
  if (!message) {
    errors.message = 'Escreva sua mensagem';
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: { name, email, message }
  };
}

export const validationOptions = {
  SERVICE_OPTIONS,
  FEATURE_OPTIONS,
  TIMELINE_OPTIONS,
  BUDGET_OPTIONS
};
