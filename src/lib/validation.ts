import { z } from 'zod';

export const stepServicesSchema = z.object({
  services: z.array(z.string()).min(1, 'Selecione pelo menos um serviço'),
  goals: z.string().min(10, 'Descreva o objetivo do negócio')
});

export const stepScopeSchema = z.object({
  features: z.array(z.string()).min(1, 'Selecione pelo menos uma funcionalidade'),
  scope_notes: z.string().min(10, 'Conte-nos mais sobre o escopo')
});

export const stepTimelineSchema = z.object({
  timeline: z.string().min(1, 'Escolha a janela de entrega'),
  budget_range: z.string().min(1, 'Informe a faixa de investimento')
});

export const stepClientSchema = z.object({
  name: z.string().min(3, 'Informe seu nome completo'),
  company: z.string().min(2, 'Informe o nome da empresa'),
  email: z.string().email('Informe um e-mail válido'),
  phone: z.string().min(14, 'Informe um telefone válido'),
  location: z.string().min(2, 'Cidade e estado são obrigatórios')
});

export const stepConfirmSchema = z.object({
  consent: z.literal(true, {
    errorMap: () => ({ message: 'É necessário aceitar o contato para continuar' })
  })
});

export const leadSchema = stepServicesSchema
  .merge(stepScopeSchema)
  .merge(stepTimelineSchema)
  .merge(stepClientSchema)
  .merge(stepConfirmSchema);

export type StepServicesInput = z.infer<typeof stepServicesSchema>;
export type StepScopeInput = z.infer<typeof stepScopeSchema>;
export type StepTimelineInput = z.infer<typeof stepTimelineSchema>;
export type StepClientInput = z.infer<typeof stepClientSchema>;
export type StepConfirmInput = z.infer<typeof stepConfirmSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
