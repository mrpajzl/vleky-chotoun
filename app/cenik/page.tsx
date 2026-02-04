"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CreditCard, Users, Baby } from "lucide-react";
import { useLanguage, getLocalizedField } from "@/contexts/LanguageContext";

export default function CenikPage() {
  const { locale, t } = useLanguage();
  const pricing = useQuery(api.pricing.list);

  const timeTickets = pricing?.filter((p) => p.category === "time");
  const pointTickets = pricing?.filter((p) => p.category === "points");
  const kidsTickets = pricing?.filter((p) => p.category === "kids");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
        {t('pricing.title')} {locale === 'cs' ? 'pro sezónu 2025/2026' : 'for season 2025/2026'}
      </h1>

      {/* Important Notice */}
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded mb-12 max-w-3xl mx-auto">
        <p className="text-red-800 font-bold text-lg text-center">
          {locale === 'cs' 
            ? '!!! OMLOUVÁME SE, ALE V NAŠEM AREÁLU NENÍ MOŽNO PLATIT PLATEBNÍ KARTOU !!!'
            : '!!! WE APOLOGIZE, BUT CARD PAYMENTS ARE NOT ACCEPTED IN OUR RESORT !!!'}
        </p>
      </div>

      {/* Time Tickets */}
      <section className="mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <CreditCard className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-center">{t('pricing.time')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {timeTickets?.map((ticket) => (
            <div key={ticket._id} className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-500">
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                {getLocalizedField(ticket, 'name', locale)}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('pricing.regular')}:</span>
                  <span className="text-2xl font-bold text-blue-600">{ticket.priceRegular},-</span>
                </div>
                {ticket.priceReduced && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('pricing.reduced')}:</span>
                    <span className="text-xl font-semibold text-green-600">{ticket.priceReduced},-</span>
                  </div>
                )}
              </div>
              {getLocalizedField(ticket, 'description', locale) && (
                <p className="text-sm text-gray-600 mt-3">
                  {getLocalizedField(ticket, 'description', locale)}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Point Tickets */}
      <section className="mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Users className="w-8 h-8 text-indigo-600" />
          <h2 className="text-3xl font-bold text-center">{t('pricing.points')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {pointTickets?.map((ticket) => (
            <div key={ticket._id} className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-indigo-500">
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                {getLocalizedField(ticket, 'name', locale)}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('pricing.regular')}:</span>
                  <span className="text-2xl font-bold text-indigo-600">{ticket.priceRegular},-</span>
                </div>
                {ticket.priceReduced && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('pricing.reduced')}:</span>
                    <span className="text-xl font-semibold text-green-600">{ticket.priceReduced},-</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kids Area */}
      <section className="mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Baby className="w-8 h-8 text-pink-600" />
          <h2 className="text-3xl font-bold text-center">{t('pricing.kids')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {kidsTickets?.map((ticket) => (
            <div key={ticket._id} className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-pink-500">
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                {getLocalizedField(ticket, 'name', locale)}
              </h3>
              <div className="text-center">
                <span className="text-3xl font-bold text-pink-600">{ticket.priceRegular},-</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 mt-4">
          {locale === 'cs'
            ? 'Zdarma děti do 4 let (tzn.: do 4. narozenin!!!) v doprovodu dospělého'
            : 'Free for children under 4 years old accompanied by an adult'}
        </p>
        <p className="text-center text-sm text-gray-500 mt-2">
          {locale === 'cs'
            ? 'Prodej v automatu u vstupu do dětského areálu'
            : 'Tickets sold at vending machine at kids area entrance'}
        </p>
      </section>

      {/* Discounts & Important Info */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
          <h3 className="font-bold text-xl mb-3 text-green-800">
            ✅ {locale === 'cs' ? 'Zlevněné jízdenky' : 'Reduced Tickets'}
          </h3>
          <ul className="space-y-2 text-gray-700">
            {locale === 'cs' ? (
              <>
                <li>• Děti do 140 cm</li>
                <li>• Senioři od 65 let</li>
                <li>• ZTP, ZTP+P</li>
                <li>• Průvodce ZTP+P</li>
              </>
            ) : (
              <>
                <li>• Children up to 140 cm</li>
                <li>• Seniors 65+</li>
                <li>• Disabled persons (ZTP, ZTP+P)</li>
                <li>• ZTP+P companion</li>
              </>
            )}
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <h3 className="font-bold text-xl mb-3 text-blue-800">
            💳 {locale === 'cs' ? 'Vratná záloha na čipovou kartu' : 'Refundable Chip Card Deposit'}
          </h3>
          <p className="text-3xl font-bold text-blue-600 mb-3">100 Kč</p>
          <p className="text-sm text-gray-700">
            {locale === 'cs'
              ? 'Karta se používá pro všechny tarify. Záloha se vrací při vrácení karty do pokladny.'
              : 'Card is used for all rates. Deposit refunded when returning card to cashier.'}
          </p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-12 max-w-4xl mx-auto bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
        <h3 className="font-bold text-xl mb-4">
          ℹ️ {locale === 'cs' ? 'Důležité informace' : 'Important Information'}
        </h3>
        <ul className="space-y-3 text-gray-700">
          {locale === 'cs' ? (
            <>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Bezkontaktní karty z minulé sezony JE možno použít-vrátit i v této sezóně</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Nevyužité body ze sezony 2024/2025 JE možno projezdit i v této sezóně (platnost je na kartě: 2025/26)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Body (jednotlivé jízdy) lze projezdit během celé lyžařské sezóny</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Časové jízdenky jsou aktivovány prvním zasunutím čipové karty do turniketu</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Karty s nabitým tarifem uložte do kapsy - turniket vás odbavuje automaticky</span>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Cards from previous season CAN be used and returned this season</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Unused points from 2024/2025 season CAN be used this season (validity on card: 2025/26)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Points (individual rides) can be used throughout the entire ski season</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Time tickets are activated upon first insertion of chip card into turnstile</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Keep loaded cards in your pocket - turnstile processes you automatically</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
