import crypto from 'crypto';

const PDF_SECRET = process.env.LEAD_PDF_SECRET || 'forgeia-secret';

export function generateNonce(id: string) {
  return crypto.createHash('sha256').update(`${id}:${PDF_SECRET}`).digest('hex').slice(0, 12);
}

export function verifyNonce(id: string, nonce: string) {
  return generateNonce(id) === nonce;
}
