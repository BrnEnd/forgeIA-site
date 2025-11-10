const storageKey = 'forgeia-briefing-state';
const defaultState = {
  services: [],
  goals: '',
  features: [],
  scope_notes: '',
  timeline: '',
  budget_range: '',
  name: '',
  company: '',
  email: '',
  phone: '',
  location: '',
  consent: false
};

function loadState() {
  try {
    const stored = sessionStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultState, ...parsed };
    }
  } catch (error) {
    console.warn('Failed to load wizard state', error);
  }
  return { ...defaultState };
}

function saveState(state) {
  sessionStorage.setItem(storageKey, JSON.stringify(state));
}

function clearErrors(step) {
  const errorElements = step.querySelectorAll('[data-error]');
  errorElements.forEach((element) => {
    element.textContent = '';
  });
}

function setError(step, field, message) {
  const target = step.querySelector(`[data-error="${field}"]`);
  if (target) {
    target.textContent = message;
  }
}

function updateProgress(current, total) {
  const progressBar = document.querySelector('[data-progress]');
  const progressLabel = document.querySelector('[data-progress-label]');
  const percentage = Math.round(((current + 1) / total) * 100);
  if (progressBar instanceof HTMLElement) {
    progressBar.style.width = `${percentage}%`;
    progressBar.setAttribute('aria-valuenow', String(percentage));
  }
  if (progressLabel) {
    progressLabel.textContent = `${current + 1} de ${total}`;
  }
}

function applyStateToStep(step, state) {
  const inputs = step.querySelectorAll('input, textarea, select');
  inputs.forEach((input) => {
    const name = input.name;
    if (!name) {
      return;
    }
    if (input.type === 'checkbox' && input.hasAttribute('data-multi')) {
      input.checked = state[name]?.includes(input.value);
    } else if (input.type === 'checkbox') {
      input.checked = Boolean(state[name]);
    } else {
      input.value = state[name] || '';
    }
  });
}

function collectStateFromStep(step, state) {
  const inputs = step.querySelectorAll('input, textarea, select');
  inputs.forEach((input) => {
    const name = input.name;
    if (!name) {
      return;
    }
    if (input.type === 'checkbox' && input.hasAttribute('data-multi')) {
      const collection = new Set(state[name] || []);
      if (input.checked) {
        collection.add(input.value);
      } else {
        collection.delete(input.value);
      }
      state[name] = Array.from(collection);
    } else if (input.type === 'checkbox') {
      state[name] = input.checked;
    } else {
      state[name] = input.value.trim();
    }
  });
}

function validateStep(stepIndex, state) {
  const errors = {};
  switch (stepIndex) {
    case 0: {
      if (!state.services || state.services.length === 0) {
        errors.services = 'Selecione pelo menos um serviço';
      }
      if (!state.goals) {
        errors.goals = 'Descreva o objetivo do negócio';
      }
      break;
    }
    case 1: {
      if (!state.features || state.features.length === 0) {
        errors.features = 'Escolha ao menos uma funcionalidade desejada';
      }
      break;
    }
    case 2: {
      if (!state.timeline) {
        errors.timeline = 'Selecione um prazo estimado';
      }
      if (!state.budget_range) {
        errors.budget_range = 'Informe a faixa de investimento';
      }
      break;
    }
    case 3: {
      if (!state.name) {
        errors.name = 'Informe seu nome';
      }
      if (!state.email || !state.email.includes('@')) {
        errors.email = 'Informe um email válido';
      }
      if (!state.phone) {
        errors.phone = 'Informe um telefone ou WhatsApp';
      }
      if (!state.location) {
        errors.location = 'Informe sua cidade e estado';
      }
      break;
    }
    case 4: {
      if (!state.consent) {
        errors.consent = 'É necessário aceitar o contato da ForgeIA Studio';
      }
      break;
    }
  }
  return { ok: Object.keys(errors).length === 0, errors };
}

function showStep(stepIndex, steps, state) {
  steps.forEach((step, index) => {
    const isCurrent = index === stepIndex;
    step.setAttribute('aria-hidden', isCurrent ? 'false' : 'true');
    step.classList.toggle('step-hidden', !isCurrent);
    if (isCurrent) {
      clearErrors(step);
      applyStateToStep(step, state);
    }
  });
  updateProgress(stepIndex, steps.length);
  const backButton = document.querySelector('[data-action="back"]');
  const nextButton = document.querySelector('[data-action="next"]');
  const submitButton = document.querySelector('[data-action="submit"]');
  if (backButton instanceof HTMLButtonElement) {
    backButton.disabled = stepIndex === 0;
  }
  if (nextButton instanceof HTMLButtonElement) {
    nextButton.hidden = stepIndex === steps.length - 1;
  }
  if (submitButton instanceof HTMLButtonElement) {
    submitButton.hidden = stepIndex !== steps.length - 1;
  }
}

function renderSummary(state) {
  const summaryContainer = document.querySelector('[data-summary]');
  if (!summaryContainer) {
    return;
  }
  summaryContainer.innerHTML = `
    <h3>Resumo do briefing</h3>
    <ul>
      <li><strong>Serviços:</strong> ${state.services.join(', ')}</li>
      <li><strong>Objetivos:</strong> ${state.goals}</li>
      <li><strong>Funcionalidades:</strong> ${state.features.join(', ')}</li>
      <li><strong>Notas:</strong> ${state.scope_notes || 'N/A'}</li>
      <li><strong>Prazo:</strong> ${state.timeline} dias</li>
      <li><strong>Investimento:</strong> ${state.budget_range}</li>
      <li><strong>Nome:</strong> ${state.name}</li>
      <li><strong>Empresa:</strong> ${state.company || 'N/A'}</li>
      <li><strong>Email:</strong> ${state.email}</li>
      <li><strong>Telefone:</strong> ${state.phone}</li>
      <li><strong>Localização:</strong> ${state.location}</li>
      <li><strong>Consentimento:</strong> ${state.consent ? 'Sim' : 'Não'}</li>
    </ul>
  `;
}

async function submitLead(state) {
  const response = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state)
  });
  if (!response.ok) {
    throw new Error('Falha ao enviar briefing');
  }
  return response.json();
}

function showSuccess(id, state) {
  const formWrapper = document.querySelector('[data-wizard]');
  const successWrapper = document.querySelector('[data-success]');
  if (formWrapper) {
    (formWrapper as HTMLElement).style.display = 'none';
  }
  if (successWrapper instanceof HTMLElement) {
    successWrapper.style.display = 'block';
    const whatsappLink = successWrapper.querySelector('[data-action="whatsapp"]');
    const pdfLink = successWrapper.querySelector('[data-action="pdf"]');
    if (whatsappLink instanceof HTMLAnchorElement) {
      const base = successWrapper.getAttribute('data-whatsapp');
      const phone = base || '55XXXXXXXXXXX';
      const message = encodeURIComponent('Olá ForgeIA Studio! Recebi meu briefing e gostaria de conversar.');
      whatsappLink.href = `https://wa.me/${phone}?text=${message}`;
    }
    if (pdfLink instanceof HTMLAnchorElement) {
      pdfLink.href = `/api/lead/${id}/pdf`;
    }
  }
  renderSummary(state);
  sessionStorage.removeItem(storageKey);
}

function initializeFromQuery(state) {
  const params = new URLSearchParams(window.location.search);
  const service = params.get('service');
  if (service && !state.services.includes(service)) {
    state.services.push(service);
  }
}

function initWizard() {
  const steps = Array.from(document.querySelectorAll('[data-step]'));
  if (steps.length === 0) {
    return;
  }
  let state = loadState();
  initializeFromQuery(state);
  let currentStep = 0;
  showStep(currentStep, steps, state);
  renderSummary(state);

  const form = document.querySelector('form[data-form]');
  const nextButton = document.querySelector('[data-action="next"]');
  const backButton = document.querySelector('[data-action="back"]');
  const submitButton = document.querySelector('[data-action="submit"]');
  const messageBox = document.querySelector('[data-message]');

  function displayMessage(text, variant) {
    if (!(messageBox instanceof HTMLElement)) {
      return;
    }
    messageBox.textContent = text;
    messageBox.dataset.variant = variant;
    messageBox.hidden = !text;
  }

  nextButton?.addEventListener('click', (event) => {
    event.preventDefault();
    const step = steps[currentStep];
    clearErrors(step);
    collectStateFromStep(step, state);
    const validation = validateStep(currentStep, state);
    if (!validation.ok) {
      Object.entries(validation.errors).forEach(([field, message]) => {
        setError(step, field, message);
      });
      displayMessage('Revise as informações destacadas antes de avançar.', 'error');
      return;
    }
    displayMessage('', '');
    saveState(state);
    currentStep = Math.min(currentStep + 1, steps.length - 1);
    showStep(currentStep, steps, state);
    renderSummary(state);
  });

  backButton?.addEventListener('click', (event) => {
    event.preventDefault();
    displayMessage('', '');
    currentStep = Math.max(currentStep - 1, 0);
    showStep(currentStep, steps, state);
  });

  submitButton?.addEventListener('click', async (event) => {
    event.preventDefault();
    const step = steps[currentStep];
    clearErrors(step);
    collectStateFromStep(step, state);
    const validation = validateStep(currentStep, state);
    if (!validation.ok) {
      Object.entries(validation.errors).forEach(([field, message]) => {
        setError(step, field, message);
      });
      displayMessage('Confirme os itens pendentes antes de enviar.', 'error');
      return;
    }
    displayMessage('Enviando briefing...', 'info');
    try {
      const result = await submitLead(state);
      displayMessage('', '');
      showSuccess(result.id, state);
    } catch (error) {
      console.error(error);
      displayMessage('Não foi possível enviar agora. Tente novamente em instantes.', 'error');
    }
  });

  form?.addEventListener('input', (event) => {
    const step = steps[currentStep];
    collectStateFromStep(step, state);
    renderSummary(state);
  });
}

initWizard();
