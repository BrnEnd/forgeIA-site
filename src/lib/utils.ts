import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyRange(range: string) {
  if (!range) return '';
  return range
    .split('-')
    .map((value) => value.trim())
    .map((value) =>
      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        Number(value)
      )
    )
    .join(' — ');
}

export function isDatabaseEnabled() {
  return Boolean(process.env.DATABASE_URL);
}

export function getWhatsappLink() {
  const number = process.env.WHATSAPP_NUMBER || '5511999999999';
  return `https://wa.me/${number}`;
}

export async function persistFallbackLead(data: unknown) {
  const { promises: fs } = await import('fs');
  const path = 'storage/leads.json';

  try {
    await fs.access('storage');
  } catch (error) {
    await fs.mkdir('storage', { recursive: true });
  }

  try {
    const current = await fs.readFile(path, 'utf-8');
    const parsed = JSON.parse(current) as unknown[];
    parsed.push(data);
    await fs.writeFile(path, JSON.stringify(parsed, null, 2), 'utf-8');
  } catch (error) {
    await fs.writeFile(path, JSON.stringify([data], null, 2), 'utf-8');
  }
}

export async function getFallbackLead(id: string) {
  const { promises: fs } = await import('fs');
  const path = 'storage/leads.json';
  try {
    const current = await fs.readFile(path, 'utf-8');
    const parsed = JSON.parse(current) as Array<Record<string, unknown>>;
    return parsed.find((item) => item.id === id) ?? null;
  } catch (error) {
    return null;
  }
}
