function initContactForm() {
  const form = document.querySelector('form[data-contact]');
  const message = document.querySelector('[data-contact-message]');
  if (!(form instanceof HTMLFormElement) || !(message instanceof HTMLElement)) {
    return;
  }

  function showMessage(text, variant) {
    message.textContent = text;
    message.dataset.variant = variant;
    message.hidden = !text;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    showMessage('Enviando mensagem...', 'info');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error('Falha ao enviar');
      }
      form.reset();
      showMessage('Mensagem enviada! Em breve entraremos em contato.', 'success');
    } catch (error) {
      console.error(error);
      showMessage('Não foi possível enviar agora. Tente novamente.', 'error');
    }
  });
}

initContactForm();
