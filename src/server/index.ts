import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { randomUUID } from 'node:crypto';
import { parse as parseUrl } from 'node:url';
import { generateLeadPdf } from './pdf.ts';
import { validateLeadPayload, validateContactPayload } from './validation.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');
const distPublicDir = path.join(__dirname, '..', 'public');
const storageDir = path.join(rootDir, 'storage');
const leadsFile = path.join(storageDir, 'leads.json');
const contactsFile = path.join(storageDir, 'contacts.json');

async function ensureStorage() {
  await mkdir(storageDir, { recursive: true });
  try {
    await access(leadsFile);
  } catch {
    await writeFile(leadsFile, '[]', 'utf8');
  }
  try {
    await access(contactsFile);
  } catch {
    await writeFile(contactsFile, '[]', 'utf8');
  }
}

async function readJsonArray(file) {
  try {
    const content = await readFile(file, 'utf8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeJsonArray(file, data) {
  await writeFile(file, JSON.stringify(data, null, 2), 'utf8');
}

function sendJson(res, statusCode, data) {
  const body = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  });
  res.end(body);
}

function sendNotFound(res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
}

function sendMethodNotAllowed(res) {
  res.writeHead(405, { 'Content-Type': 'text/plain' });
  res.end('Method Not Allowed');
}

async function readRequestBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

async function handleLeadPost(req, res) {
  try {
    const body = await readRequestBody(req);
    const payload = JSON.parse(body || '{}');
    const validation = validateLeadPayload(payload);
    if (!validation.ok) {
      sendJson(res, 400, { ok: false, errors: validation.errors });
      return;
    }
    const leads = await readJsonArray(leadsFile);
    const newLead = {
      id: randomUUID(),
      created_at: new Date().toISOString(),
      ...validation.value
    };
    leads.push(newLead);
    await writeJsonArray(leadsFile, leads);
    sendJson(res, 200, { ok: true, id: newLead.id });
  } catch (error) {
    console.error('Failed to handle lead', error);
    sendJson(res, 500, { ok: false, message: 'Internal Server Error' });
  }
}

async function handleLeadPdf(req, res, id) {
  try {
    const leads = await readJsonArray(leadsFile);
    const lead = leads.find((item) => item.id === id);
    if (!lead) {
      sendNotFound(res);
      return;
    }
    const pdfBuffer = generateLeadPdf(lead);
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Length': pdfBuffer.length,
      'Content-Disposition': `attachment; filename="briefing-${id}.pdf"`
    });
    res.end(pdfBuffer);
  } catch (error) {
    console.error('Failed to serve PDF', error);
    sendJson(res, 500, { ok: false, message: 'Internal Server Error' });
  }
}

async function handleContactPost(req, res) {
  try {
    const body = await readRequestBody(req);
    const payload = JSON.parse(body || '{}');
    const validation = validateContactPayload(payload);
    if (!validation.ok) {
      sendJson(res, 400, { ok: false, errors: validation.errors });
      return;
    }
    const contacts = await readJsonArray(contactsFile);
    contacts.push({
      id: randomUUID(),
      created_at: new Date().toISOString(),
      ...validation.value
    });
    await writeJsonArray(contactsFile, contacts);
    sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error('Failed to handle contact', error);
    sendJson(res, 500, { ok: false, message: 'Internal Server Error' });
  }
}

async function serveStaticFile(res, filePath) {
  try {
    const ext = path.extname(filePath);
    const contentType = getContentType(ext);
    if (ext === '.html') {
      const html = await readFile(filePath, 'utf8');
      const enriched = html.replaceAll('__WHATSAPP_NUMBER__', process.env.WHATSAPP_NUMBER || '55XXXXXXXXXXX');
      const buffer = Buffer.from(enriched, 'utf8');
      res.writeHead(200, { 'Content-Type': contentType, 'Content-Length': buffer.length });
      res.end(buffer);
      return;
    }
    const stream = createReadStream(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    await pipeline(stream, res);
  } catch (error) {
    console.error('Failed to serve static file', error);
    sendNotFound(res);
  }
}

function getContentType(ext) {
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.css':
      return 'text/css';
    case '.js':
      return 'application/javascript';
    case '.svg':
      return 'image/svg+xml';
    case '.json':
      return 'application/json';
    default:
      return 'application/octet-stream';
  }
}

function resolvePublicPath(urlPath) {
  const cleaned = urlPath === '/' ? '/index.html' : urlPath;
  const filePath = path.join(distPublicDir, cleaned.replace(/^\/+/, ''));
  return filePath;
}

const server = http.createServer(async (req, res) => {
  const url = parseUrl(req.url || '', true);
  const method = req.method || 'GET';

  if (url.pathname?.startsWith('/api/lead') && method === 'POST' && url.pathname === '/api/lead') {
    await handleLeadPost(req, res);
    return;
  }

  if (url.pathname?.startsWith('/api/lead/') && method === 'GET' && url.pathname.endsWith('/pdf')) {
    const parts = url.pathname.split('/');
    const id = parts[3];
    await handleLeadPdf(req, res, id);
    return;
  }

  if (url.pathname === '/api/contact' && method === 'POST') {
    await handleContactPost(req, res);
    return;
  }

  if (method !== 'GET') {
    sendMethodNotAllowed(res);
    return;
  }

  const filePath = resolvePublicPath(url.pathname || '/');
  await serveStaticFile(res, filePath);
});

const PORT = Number(process.env.PORT || 3000);

ensureStorage().then(() => {
  server.listen(PORT, () => {
    console.log(`ForgeIA Studio server running at http://localhost:${PORT}`);
  });
});

