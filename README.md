# ForgeIA Studio

Projeto Next.js 15 (App Router) com TypeScript, Tailwind CSS e UI baseada em shadcn/ui para a ForgeIA Studio.

## Requisitos

- Node.js 18+
- npm
- Banco Postgres (opcional, fallback salva em `storage/leads.json`)

## Scripts

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run db:push
npm run db:migrate
npm run db:studio
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e ajuste:

- `DATABASE_URL`
- `RESEND_API_KEY`
- `WHATSAPP_NUMBER`
- `LEAD_PDF_SECRET`

## Fluxo de desenvolvimento

1. `npm install`
2. `npm run dev`
3. Acesse `http://localhost:3000`
4. Execute testes unitários `npm run test`
5. Execute e2e com `npm run test:e2e` (necessário servidor rodando)

## PDF & Persistência

- Quando `DATABASE_URL` não está definido, os leads são salvos em `storage/leads.json`.
- PDFs são gerados via `@react-pdf/renderer` em `/api/lead/[id]/pdf?nonce=...`.

## Husky

Após instalar dependências, rode `npm run prepare` para habilitar hooks de commit com lint e typecheck.

## Deploy

O projeto inclui `vercel.json` e está pronto para deploy na Vercel. Ajuste as variáveis de ambiente via painel.
