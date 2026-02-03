"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LiveCamera from "@/components/LiveCamera";
import StatusCard from "@/components/StatusCard";
import NewsCard from "@/components/NewsCard";
import { AlertTriangle, Clock, Mountain, Snowflake, ThermometerSnowflake } from "lucide-react";

export default function Home() {
  const cameras = useQuery(api.cameras.list);
  const operatingStatus = useQuery(api.operatingStatus.getCurrent);
  const lifts = useQuery(api.lifts.list);
  const conditions = useQuery(api.conditions.getCurrent);
  const news = useQuery(api.news.list);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Status */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
          Vleky Chotouň
        </h1>
        <p className="text-xl text-center text-gray-600 mb-8">
          Rodinný lyžařský areál s perfektními podmínkami
        </p>

        {operatingStatus && (
          <div className={`max-w-2xl mx-auto p-6 rounded-lg text-center ${
            operatingStatus.isOpen ? "bg-green-100 border-2 border-green-500" : "bg-red-100 border-2 border-red-500"
          }`}>
            <div className="text-2xl font-bold mb-2">
              {operatingStatus.isOpen ? "✅ AREÁL V PROVOZU" : "❌ AREÁL UZAVŘEN"}
            </div>
            <div className="flex items-center justify-center gap-2 text-lg">
              <Clock className="w-5 h-5" />
              <span>Provozní doba: {operatingStatus.openingHours}</span>
            </div>
          </div>
        )}
      </div>

      {/* Important News */}
      {news && news.filter(n => n.isImportant).length > 0 && (
        <div className="mb-12">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                {news.filter(n => n.isImportant).map((item) => (
                  <div key={item._id} className="mb-4 last:mb-0">
                    <h3 className="font-bold text-yellow-900">{item.title}</h3>
                    <p className="text-yellow-800 whitespace-pre-wrap">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Cameras - PROMINENTLY FEATURED */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">
          🎥 Živé kamery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cameras?.map((camera) => (
            <LiveCamera key={camera._id} camera={camera} />
          ))}
        </div>
        {(!cameras || cameras.length === 0) && (
          <p className="text-center text-gray-500">Načítání kamer...</p>
        )}
      </section>

      {/* Current Conditions */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Aktuální podmínky</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {conditions && (
            <>
              <StatusCard
                icon={<Snowflake className="w-8 h-8" />}
                title="Výška sněhu"
                value={conditions.snowDepth}
                color="blue"
              />
              <StatusCard
                icon={<Mountain className="w-8 h-8" />}
                title="Druh sněhu"
                value={conditions.snowType}
                color="indigo"
              />
              <StatusCard
                icon={<ThermometerSnowflake className="w-8 h-8" />}
                title="Podmínky"
                value={conditions.quality}
                color="green"
              />
              {conditions.temperature && (
                <StatusCard
                  icon={<ThermometerSnowflake className="w-8 h-8" />}
                  title="Teplota"
                  value={conditions.temperature}
                  color="cyan"
                />
              )}
            </>
          )}
        </div>
      </section>

      {/* Lifts Status */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Vleky v provozu</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lifts?.map((lift) => (
            <div
              key={lift._id}
              className={`p-6 rounded-lg text-center font-semibold ${
                lift.isOperating
                  ? "bg-green-100 text-green-800 border-2 border-green-500"
                  : "bg-gray-100 text-gray-500 border-2 border-gray-300"
              }`}
            >
              <div className="text-xl mb-2">{lift.name}</div>
              <div className="text-lg">
                {lift.isOperating ? "✅ V PROVOZU" : "❌ MIMO PROVOZ"}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Regular News */}
      {news && news.filter(n => !n.isImportant).length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Aktuality</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.filter(n => !n.isImportant).map((item) => (
              <NewsCard key={item._id} news={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
