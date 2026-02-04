"use client";

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState<'cs' | 'en'>('cs');

  useEffect(() => {
    const saved = localStorage.getItem('locale');
    if (saved === 'en') setLocale('en');
  }, []);

  const toggleLocale = () => {
    const newLocale = locale === 'cs' ? 'en' : 'cs';
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    // Would trigger re-render of content in full implementation
    window.location.reload();
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sunset-orange/10 transition-colors"
      title="Switch language / Změnit jazyk"
    >
      <Globe className="w-4 h-4" />
      <span className="font-mono text-sm uppercase font-semibold">
        {locale === 'cs' ? 'EN' : 'CZ'}
      </span>
    </button>
  );
}
