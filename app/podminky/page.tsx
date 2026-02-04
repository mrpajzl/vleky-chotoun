"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import StatusCard from "@/components/StatusCard";
import WeatherForecast from "@/components/WeatherForecast";
import { Clock, Mountain, Snowflake, ThermometerSnowflake } from "lucide-react";
import { format } from "date-fns";
import { cs } from "date-fns/locale";

export default function PodminkyPage() {
  const operatingStatus = useQuery(api.operatingStatus.getCurrent);
  const lifts = useQuery(api.lifts.list);
  const conditions = useQuery(api.conditions.getCurrent);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
        Aktuální podmínky
      </h1>

      {/* Operating Status */}
      {operatingStatus && (
        <div className="mb-12">
          <div className={`max-w-3xl mx-auto p-8 rounded-lg text-center shadow-lg ${
            operatingStatus.isOpen ? "bg-green-100 border-4 border-green-500" : "bg-red-100 border-4 border-red-500"
          }`}>
            <div className="text-3xl font-bold mb-4">
              {operatingStatus.isOpen ? "✅ AREÁL V PROVOZU" : "❌ AREÁL UZAVŘEN"}
            </div>
            <div className="flex items-center justify-center gap-3 text-xl mb-2">
              <Clock className="w-6 h-6" />
              <span className="font-semibold">Provozní doba: {operatingStatus.openingHours}</span>
            </div>
            <div className="text-sm text-gray-600 mt-4">
              Poslední aktualizace: {format(new Date(operatingStatus.lastUpdated), "d. MMMM yyyy, HH:mm", { locale: cs })}
            </div>
          </div>
        </div>
      )}

      {/* Live Weather Forecast */}
      <section className="mb-12 max-w-5xl mx-auto">
        <WeatherForecast />
      </section>

      {/* Weather Conditions */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Sněhové podmínky</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {conditions && (
            <>
              <StatusCard
                icon={<Snowflake className="w-10 h-10" />}
                title="Výška sněhu"
                value={conditions.snowDepth}
                color="blue"
              />
              <StatusCard
                icon={<Mountain className="w-10 h-10" />}
                title="Druh sněhu"
                value={conditions.snowType}
                color="indigo"
              />
              <StatusCard
                icon={<ThermometerSnowflake className="w-10 h-10" />}
                title="Kvalita podmínek"
                value={conditions.quality}
                color="green"
              />
              {conditions.temperature && (
                <StatusCard
                  icon={<ThermometerSnowflake className="w-10 h-10" />}
                  title="Teplota"
                  value={conditions.temperature}
                  color="cyan"
                />
              )}
            </>
          )}
        </div>
        {conditions && (
          <div className="text-center text-sm text-gray-500 mt-4">
            Poslední aktualizace: {format(new Date(conditions.lastUpdated), "d. MMMM yyyy, HH:mm", { locale: cs })}
          </div>
        )}
      </section>

      {/* Lifts Status */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Vleky v provozu</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {lifts?.map((lift) => (
            <div
              key={lift._id}
              className={`p-8 rounded-lg text-center font-semibold shadow-lg ${
                lift.isOperating
                  ? "bg-green-100 text-green-800 border-4 border-green-500"
                  : "bg-gray-100 text-gray-500 border-4 border-gray-300"
              }`}
            >
              <div className="text-2xl mb-3">{lift.name}</div>
              <div className="text-xl">
                {lift.isOperating ? "✅ V PROVOZU" : "❌ MIMO PROVOZ"}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Info */}
      <div className="max-w-3xl mx-auto bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="font-bold text-xl mb-4">ℹ️ Další informace</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• V provozu jsou oba hlavní vleky</li>
          <li>• Dětský areál s pásem</li>
          <li>• Sjezdovka denně upravována</li>
          <li>• Půjčovna a servis k dispozici</li>
          <li>• Škola lyžování</li>
          <li>• Občerstvení v areálu</li>
        </ul>
      </div>
    </div>
  );
}
