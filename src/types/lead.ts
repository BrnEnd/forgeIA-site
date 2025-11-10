export interface LeadPayload {
  services: string[];
  goals: string;
  features: string[];
  scope_notes: string;
  timeline: string;
  budget_range: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  consent: boolean;
}

export interface LeadResponse {
  ok: boolean;
  id: string;
  nonce: string;
}
