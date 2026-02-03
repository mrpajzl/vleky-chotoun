"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AdminPricingPage() {
  const router = useRouter();
  const pricing = useQuery(api.pricing.list);

  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("adminAuth")) {
      router.push("/admin");
    }
  }, [router]);

  const timeTickets = pricing?.filter((p) => p.category === "time");
  const pointTickets = pricing?.filter((p) => p.category === "points");
  const kidsTickets = pricing?.filter((p) => p.category === "kids");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Správa ceníku</h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-8">
        <h3 className="font-bold mb-2">ℹ️ Informace</h3>
        <p className="text-gray-700 mb-2">
          Aktuálně je ceník nastaven pomocí počátečních dat. Pro úpravu cen použijte Convex Dashboard nebo přidejte úpravu zde v budoucnu.
        </p>
        <a
          href="https://dashboard.convex.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          → Otevřít Convex Dashboard
        </a>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Časové jízdenky</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {timeTickets?.map((ticket) => (
              <div key={ticket._id} className="border rounded p-4">
                <h3 className="font-bold">{ticket.name}</h3>
                <p>Plné: {ticket.priceRegular} Kč</p>
                {ticket.priceReduced && <p>Zlevněné: {ticket.priceReduced} Kč</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Bodové jízdenky</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {pointTickets?.map((ticket) => (
              <div key={ticket._id} className="border rounded p-4">
                <h3 className="font-bold">{ticket.name}</h3>
                <p>Plné: {ticket.priceRegular} Kč</p>
                {ticket.priceReduced && <p>Zlevněné: {ticket.priceReduced} Kč</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Dětský areál</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {kidsTickets?.map((ticket) => (
              <div key={ticket._id} className="border rounded p-4">
                <h3 className="font-bold">{ticket.name}</h3>
                <p>Cena: {ticket.priceRegular} Kč</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
