# ForgeIA Studio — Site estático com wizard de briefing

Este projeto fornece uma versão lightweight do site da ForgeIA Studio com um fluxo de briefing multi-etapas, API em Node.js puro e fallback de armazenamento em arquivos JSON. Ele foi desenhado para funcionar em ambientes restritos (sem acesso externo ao npm registry), portanto não possui dependências externas.

## Requisitos

- Node.js 22+
- Ambiente com permissões de escrita no diretório `storage/`

## Instalação

```bash
npm install
```

> Não há dependências externas, portanto o comando apenas prepara os scripts.

## Executando em modo desenvolvimento

```bash
npm run dev
```

O comando executa o build e inicia um servidor HTTP em `http://localhost:3000` com watch automático para arquivos em `src/` e `public/`.

## Build de produção

```bash
npm run build
```

Os arquivos compilados ficam em `dist/`. Para iniciar o servidor usando os artefatos de produção execute:

```bash
npm run start
```

## Testes

O projeto utiliza o runner nativo do Node (`node --test`).

```bash
npm test
```

## Estrutura principal

```
├── public/          # HTML e CSS estáticos
├── src/
│   ├── client/      # Scripts do front-end (TypeScript sem dependências)
│   └── server/      # Servidor HTTP, validações e geração de PDF
├── storage/         # Base de dados simples em JSON
└── scripts/         # Utilitários de build e dev
```

## Variáveis de ambiente

- `PORT`: porta utilizada pelo servidor HTTP (padrão: `3000`).
- `WHATSAPP_NUMBER`: número (somente dígitos) usado nos CTAs de WhatsApp. Caso não informado, será exibido um placeholder.

## Endpoints

- `POST /api/lead`: recebe o payload do briefing e persiste em `storage/leads.json`.
- `GET /api/lead/:id/pdf`: gera um PDF simples com as informações do lead.
- `POST /api/contact`: registra a mensagem em `storage/contacts.json`.

## Limitações conhecidas

- PDFs gerados possuem layout simples (texto linear).
- Não há integração com banco de dados ou provedores externos.
- Sem bibliotecas de UI/React; o front-end utiliza JavaScript/TypeScript puro.

Mesmo sem dependências, o projeto mantém o fluxo de briefing completo com validações por etapa, persistência em sessionStorage e tela de sucesso com resumo e links úteis.
