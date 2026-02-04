"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'cs' | 'en';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations = {
  cs: {
    // Navigation
    'nav.webcams': 'Webkamery',
    'nav.conditions': 'Podmínky',
    'nav.pricing': 'Ceník',
    'nav.rental': 'Půjčovna',
    'nav.contact': 'Kontakt',
    
    // Common
    'common.open': 'AREÁL V PROVOZU',
    'common.closed': 'AREÁL UZAVŘEN',
    'common.hours': 'Provozní doba',
    'common.lastUpdate': 'Poslední aktualizace',
    
    // Homepage
    'home.hero': 'Rodinný lyžařský areál',
    'home.areaOpen': 'Areál v provozu',
    'home.areaClosed': 'Areál uzavřen',
  },
  en: {
    // Navigation
    'nav.webcams': 'Webcams',
    'nav.conditions': 'Conditions',
    'nav.pricing': 'Pricing',
    'nav.rental': 'Rental',
    'nav.contact': 'Contact',
    
    // Common
    'common.open': 'RESORT OPEN',
    'common.closed': 'RESORT CLOSED',
    'common.hours': 'Operating Hours',
    'common.lastUpdate': 'Last Updated',
    
    // Homepage
    'home.hero': 'Family Ski Resort',
    'home.areaOpen': 'Resort open',
    'home.areaClosed': 'Resort closed',
  },
};

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

  const t = (key: string): string => {
    return translations[locale][key as keyof typeof translations['cs']] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
