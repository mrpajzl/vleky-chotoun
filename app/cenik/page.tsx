"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CreditCard, Users, Baby } from "lucide-react";

export default function CenikPage() {
  const pricing = useQuery(api.pricing.list);

  const timeTickets = pricing?.filter((p) => p.category === "time");
  const pointTickets = pricing?.filter((p) => p.category === "points");
  const kidsTickets = pricing?.filter((p) => p.category === "kids");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
        Ceník pro sezónu 2025/2026
      </h1>

      {/* Important Notice */}
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded mb-12 max-w-3xl mx-auto">
        <p className="text-red-800 font-bold text-lg text-center">
          !!! OMLOUVÁME SE, ALE V NAŠEM AREÁLU NENÍ MOŽNO PLATIT PLATEBNÍ KARTOU !!!
        </p>
      </div>

      {/* Time Tickets */}
      <section className="mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <CreditCard className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-center">Časové jízdenky</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {timeTickets?.map((ticket) => (
            <div key={ticket._id} className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-500">
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">{ticket.name}</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plné:</span>
                  <span className="text-2xl font-bold text-blue-600">{ticket.priceRegular},-</span>
                </div>
                {ticket.priceReduced && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Zlevněné:</span>
                    <span className="text-xl font-semibold text-green-600">{ticket.priceReduced},-</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Point Tickets */}
      <section className="mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Users className="w-8 h-8 text-indigo-600" />
          <h2 className="text-3xl font-bold text-center">Bodové jízdenky</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {pointTickets?.map((ticket) => (
            <div key={ticket._id} className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-indigo-500">
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">{ticket.name}</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plné:</span>
                  <span className="text-2xl font-bold text-indigo-600">{ticket.priceRegular},-</span>
                </div>
                {ticket.priceReduced && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Zlevněné:</span>
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
          <h2 className="text-3xl font-bold text-center">Dětský areál</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {kidsTickets?.map((ticket) => (
            <div key={ticket._id} className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-pink-500">
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">{ticket.name}</h3>
              <div className="text-center">
                <span className="text-3xl font-bold text-pink-600">{ticket.priceRegular},-</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 mt-4">
          Zdarma děti do 4 let (tzn.: do 4. narozenin!!!) v doprovodu dospělého
        </p>
        <p className="text-center text-sm text-gray-500 mt-2">
          Prodej v automatu u vstupu do dětského areálu
        </p>
      </section>

      {/* Discounts & Important Info */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
          <h3 className="font-bold text-xl mb-3 text-green-800">✅ Zlevněné jízdenky</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Děti do 140 cm</li>
            <li>• Senioři od 65 let</li>
            <li>• ZTP, ZTP+P</li>
            <li>• Průvodce ZTP+P</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <h3 className="font-bold text-xl mb-3 text-blue-800">💳 Vratná záloha na čipovou kartu</h3>
          <p className="text-3xl font-bold text-blue-600 mb-3">100 Kč</p>
          <p className="text-sm text-gray-700">
            Karta se používá pro všechny tarify. Záloha se vrací při vrácení karty do pokladny.
          </p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-12 max-w-4xl mx-auto bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
        <h3 className="font-bold text-xl mb-4">ℹ️ Důležité informace</h3>
        <ul className="space-y-3 text-gray-700">
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
        </ul>
      </div>
    </div>
  );
}
