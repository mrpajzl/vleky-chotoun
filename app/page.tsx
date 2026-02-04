"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Mountain, Camera, Snowflake, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const cameras = useQuery(api.cameras.list);
  const operatingStatus = useQuery(api.operatingStatus.get);
  const conditions = useQuery(api.conditions.get);
  const lifts = useQuery(api.lifts.list);
  const newsItems = useQuery(api.news.listPublic);

  const [imageTimestamps, setImageTimestamps] = useState<Record<string, number>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimestamps: Record<string, number> = {};
      cameras?.forEach((camera) => {
        newTimestamps[camera._id] = Date.now();
      });
      setImageTimestamps(newTimestamps);
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [cameras]);

  const handleRefreshCamera = (cameraId: string) => {
    setImageTimestamps(prev => ({ ...prev, [cameraId]: Date.now() }));
  };

  const isOperating = operatingStatus?.isOperating ?? false;
  const operatingLifts = lifts?.filter(lift => lift.isOperating) || [];
  const topNews = newsItems?.filter(n => n.isVisible).slice(0, 2) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Asymmetric with Live Cameras */}
      <section className="relative bg-alpine-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sunset-orange/20 via-transparent to-alpine-blue/40"></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Hero Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <div className="inline-flex items-center gap-3 bg-golden-hour/20 backdrop-blur-sm border-2 border-golden-hour/50 rounded-full px-6 py-3">
                  <div className={`w-3 h-3 rounded-full ${isOperating ? 'bg-golden-hour' : 'bg-gray-400'} pulse-live`}></div>
                  <span className="font-mono text-sm uppercase tracking-wider">
                    {isOperating ? 'Areál v provozu' : 'Areál uzavřen'}
                  </span>
                </div>
              </div>

              <h1 className="font-display text-6xl md:text-8xl leading-none">
                Vleky<br/>
                <span className="text-golden-hour">Chotouň</span>
              </h1>

              <p className="text-xl md:text-2xl font-body text-snow-cream/90 max-w-md">
                Rodinný lyžařský areál v srdci hor. Sledujte podmínky v reálném čase.
              </p>

              {conditions && (
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Snowflake className="w-6 h-6 text-golden-hour" />
                    <div>
                      <div className="font-mono text-sm opacity-75">Sníh</div>
                      <div className="font-display text-2xl">{conditions.snowDepth}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-golden-hour" />
                    <div>
                      <div className="font-mono text-sm opacity-75">Podmínky</div>
                      <div className="font-display text-2xl capitalize">{conditions.quality}</div>
                    </div>
                  </div>
                </div>
              )}

              <Link 
                href="/kamery" 
                className="inline-flex items-center gap-3 bg-sunset-orange hover:bg-sunset-orange/90 text-white px-8 py-4 rounded-lg font-display text-xl tracking-wide transition-all lift-on-hover group"
              >
                <Camera className="w-6 h-6" />
                Živé kamery
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right - Featured Camera */}
            {cameras && cameras.length > 0 && (
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-sunset-orange to-golden-hour rounded-2xl opacity-20 blur-2xl"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-white/20">
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider pulse-live">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      ŽIVĚ
                    </span>
                  </div>
                  <img
                    src={`${cameras[0].imageUrl}?t=${imageTimestamps[cameras[0]._id] || Date.now()}`}
                    alt={cameras[0].name}
                    className="w-full aspect-video object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/800x600?text=Camera+Offline";
                    }}
                  />
                  <div className="p-4 bg-gradient-to-t from-black/60 to-transparent absolute bottom-0 left-0 right-0">
                    <h3 className="font-display text-2xl mb-1">{cameras[0].name}</h3>
                    <p className="font-mono text-xs opacity-75">
                      Aktualizováno: {new Date().toLocaleTimeString('cs-CZ')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Diagonal divider */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-snow-cream transform origin-bottom-left -skew-y-2"></div>
      </section>

      {/* Operating Status Cards - Overlapping Layout */}
      <section className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Operating Hours */}
          <div className="bg-white rounded-2xl p-6 shadow-xl lift-on-hover diagonal-accent opacity-0 animate-fade-in-up stagger-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-sunset-orange/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-sunset-orange" />
              </div>
              <h3 className="font-display text-2xl">Provozní doba</h3>
            </div>
            <p className="font-mono text-3xl text-mountain-night mb-2">
              {operatingStatus?.hours || '9-21'}
            </p>
            <p className="text-mountain-night/60">
              {isOperating ? 'Dnes otevřeno' : 'Dnes zavřeno'}
            </p>
          </div>

          {/* Active Lifts */}
          <div className="bg-white rounded-2xl p-6 shadow-xl lift-on-hover diagonal-accent opacity-0 animate-fade-in-up stagger-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-alpine-blue/10 flex items-center justify-center">
                <Mountain className="w-6 h-6 text-alpine-blue" />
              </div>
              <h3 className="font-display text-2xl">Vleky v provozu</h3>
            </div>
            <p className="font-mono text-3xl text-mountain-night mb-2">
              {operatingLifts.length}/{lifts?.length || 0}
            </p>
            <div className="space-y-1">
              {operatingLifts.slice(0, 2).map((lift) => (
                <div key={lift._id} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-golden-hour"></div>
                  <span>{lift.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weather */}
          {conditions && (
            <div className="bg-white rounded-2xl p-6 shadow-xl lift-on-hover diagonal-accent opacity-0 animate-fade-in-up stagger-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-golden-hour/10 flex items-center justify-center">
                  <Snowflake className="w-6 h-6 text-golden-hour" />
                </div>
                <h3 className="font-display text-2xl">Sněhové podmínky</h3>
              </div>
              <p className="font-mono text-3xl text-mountain-night mb-2">
                {conditions.snowDepth}
              </p>
              <p className="text-mountain-night/60 capitalize">
                {conditions.snowType} • {conditions.quality}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* News Section - Magazine Layout */}
      {topNews.length > 0 && (
        <section className="container mx-auto px-4 py-20">
          <h2 className="font-display text-5xl md:text-6xl mb-12 text-center">
            Aktuality
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {topNews.map((item, idx) => (
              <article 
                key={item._id}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg lift-on-hover opacity-0 animate-fade-in-up stagger-${idx + 4}`}
              >
                <div className={`h-2 ${item.isImportant ? 'bg-diagonal-gradient' : 'bg-alpine-blue'}`}></div>
                <div className="p-8">
                  {item.isImportant && (
                    <span className="inline-block bg-sunset-orange text-white px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-4">
                      Důležité
                    </span>
                  )}
                  <h3 className="font-display text-3xl mb-4">{item.title}</h3>
                  <p className="text-mountain-night/80 text-lg leading-relaxed mb-4">
                    {item.content}
                  </p>
                  <p className="font-mono text-sm text-mountain-night/50">
                    {new Date(item.date).toLocaleDateString('cs-CZ')}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section - Bold Diagonal */}
      <section className="relative bg-alpine-gradient text-white py-20 mt-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-24 bg-snow-cream transform origin-top-left skew-y-2"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-sunset-orange/30 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="font-display text-5xl md:text-7xl mb-6">
            Připraveni na sjezdovku?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-snow-cream/90 max-w-2xl mx-auto">
            Zkontrolujte aktuální podmínky a připravte se na perfektní den na sněhu.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/podminky" 
              className="inline-flex items-center gap-2 bg-white text-alpine-blue hover:bg-snow-cream px-8 py-4 rounded-lg font-display text-xl tracking-wide transition-all lift-on-hover"
            >
              Zobrazit podmínky
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/cenik" 
              className="inline-flex items-center gap-2 bg-sunset-orange hover:bg-sunset-orange/90 text-white px-8 py-4 rounded-lg font-display text-xl tracking-wide transition-all lift-on-hover"
            >
              Ceník
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-snow-cream transform origin-bottom-left -skew-y-2"></div>
      </section>
    </div>
  );
}
