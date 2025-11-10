'use client';

import { createContext, useContext, useMemo, useState } from 'react';

export type Locale = 'pt-BR' | 'en';

const dictionaries: Record<Locale, Record<string, string>> = {
  'pt-BR': {
    ctaStart: 'Começar projeto'
  },
  en: {
    ctaStart: 'Start a project'
  }
};

interface LocaleContextValue {
  locale: Locale;
  t: (key: string) => string;
  switchLocale: (next: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({
  children,
  defaultLocale = 'pt-BR'
}: {
  children: React.ReactNode;
  defaultLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      switchLocale: setLocale,
      t: (key: string) => dictionaries[locale][key] ?? dictionaries['pt-BR'][key] ?? key
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}
