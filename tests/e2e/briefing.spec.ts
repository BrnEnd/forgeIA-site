import { test, expect } from '@playwright/test';

test.describe('Fluxo de briefing', () => {
  test('preenche etapas até finalizar', async ({ page }) => {
    await page.goto('/briefing');

    await page.getByLabel('Sistemas Web').click();
    await page.getByLabel('Aplicativos Mobile').click();
    await page.getByLabel('Qual o objetivo principal deste projeto?').fill(
      'Queremos lançar uma plataforma integrada para nossos clientes B2B.'
    );
    await page.getByRole('button', { name: 'Avançar' }).click();

    await page.getByLabel('Autenticação e perfis').click();
    await page.getByLabel('Integrações com terceiros').click();
    await page.getByLabel('Quais funcionalidades ou integrações são essenciais?').fill(
      'Integração com ERP e automações de onboarding.'
    );
    await page.getByRole('button', { name: 'Avançar' }).click();

    await page.getByLabel('Quando deseja lançar?').selectOption('90_dias');
    await page.getByLabel('Qual a faixa de investimento estimada?').selectOption('60000-120000');
    await page.getByRole('button', { name: 'Avançar' }).click();

    await page.getByLabel('Nome completo').fill('Teste Playwright');
    await page.getByLabel('Empresa').fill('ForgeIA QA');
    await page.getByLabel('E-mail').fill('qa@forgeia.studio');
    await page.getByLabel('Telefone / WhatsApp').fill('+55 11 99999-7777');
    await page.getByLabel('Cidade / Estado').fill('São Paulo - SP');
    await page.getByRole('button', { name: 'Avançar' }).click();

    await page.getByText('Autorizo contato da ForgeIA Studio').click();
    await expect(page.getByRole('button', { name: 'Enviar briefing' })).toBeEnabled();
  });
});
