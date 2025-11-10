'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { LeadPayload } from '@/types/lead';

interface BriefingState {
  step: number;
  data: Partial<LeadPayload>;
  setStep: (step: number) => void;
  update: (payload: Partial<LeadPayload>) => void;
  reset: () => void;
}

const initialData: Partial<LeadPayload> = {
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

export const useBriefingStore = create<BriefingState>()(
  persist(
    (set) => ({
      step: 0,
      data: initialData,
      setStep: (step) => set({ step }),
      update: (payload) => set((state) => ({ data: { ...state.data, ...payload } })),
      reset: () => set({ step: 0, data: initialData })
    }),
    {
      name: 'forgeia-briefing',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
