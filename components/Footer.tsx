"use client";

import Link from "next/link";
import { Mountain, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { locale, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-alpine-gradient text-white mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-full bg-diagonal-gradient flex items-center justify-center">
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="font-display text-3xl">{t('home.title')}</div>
                <div className="font-mono text-sm text-golden-hour uppercase tracking-wider">
                  {locale === 'cs' ? 'Od roku 1995' : 'Since 1995'}
                </div>
              </div>
            </div>
            <p className="text-snow-cream/80 text-lg leading-relaxed max-w-md">
              {t('home.hero')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-2xl mb-6">{locale === 'cs' ? 'Odkazy' : 'Links'}</h3>
            <nav className="space-y-3">
              <Link 
                href="/kamery" 
                className="block text-snow-cream/80 hover:text-golden-hour transition-colors"
              >
                {t('nav.webcams')}
              </Link>
              <Link 
                href="/podminky" 
                className="block text-snow-cream/80 hover:text-golden-hour transition-colors"
              >
                {t('nav.conditions')}
              </Link>
              <Link 
                href="/cenik" 
                className="block text-snow-cream/80 hover:text-golden-hour transition-colors"
              >
                {t('nav.pricing')}
              </Link>
              <Link 
                href="/kontakt" 
                className="block text-snow-cream/80 hover:text-golden-hour transition-colors"
              >
                {t('nav.contact')}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-2xl mb-6">{t('contact.title')}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-golden-hour flex-shrink-0 mt-1" />
                <div>
                  <p className="text-snow-cream/80">721 115 584</p>
                  <p className="text-sm text-snow-cream/60">{t('contact.resort')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-golden-hour flex-shrink-0 mt-1" />
                <div>
                  <a 
                    href="mailto:info@vlekychotoun.cz"
                    className="text-snow-cream/80 hover:text-golden-hour transition-colors"
                  >
                    info@vlekychotoun.cz
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-golden-hour flex-shrink-0 mt-1" />
                <div>
                  <p className="text-snow-cream/80">Chotouň</p>
                  <p className="text-sm text-snow-cream/60">
                    {locale === 'cs' ? 'Česká republika' : 'Czech Republic'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-snow-cream/60 text-sm">
              © {currentYear} {t('home.title')}. {locale === 'cs' ? 'Všechna práva vyhrazena.' : 'All rights reserved.'}
            </p>
            <div className="flex items-center gap-6 text-sm text-snow-cream/60">
              <button className="hover:text-golden-hour transition-colors">
                {locale === 'cs' ? 'Ochrana osobních údajů' : 'Privacy Policy'}
              </button>
              <button className="hover:text-golden-hour transition-colors">
                {locale === 'cs' ? 'Podmínky použití' : 'Terms of Use'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
