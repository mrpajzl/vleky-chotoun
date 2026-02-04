"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, TranslationKey } from '@/lib/translations';

export type Locale = 'cs' | 'en';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('cs');

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale;
    if (saved && (saved === 'cs' || saved === 'en')) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = (key: TranslationKey): string => {
    return translations[locale][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Helper function to get localized field from a database object
export function getLocalizedField<T extends Record<string, any>>(
  obj: T | null | undefined,
  fieldName: string,
  locale: Locale
): string {
  if (!obj) return '';
  const localizedField = `${fieldName}_${locale}`;
  return obj[localizedField] || obj[fieldName] || '';
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
