"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LiveCamera from "@/components/LiveCamera";
import CameraHistoryViewer from "@/components/CameraHistoryViewer";
import { Camera, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage, getLocalizedField } from "@/contexts/LanguageContext";

export default function KameryPage() {
  const { locale, t } = useLanguage();
  const cameras = useQuery(api.cameras.list);
  const [imageTimestamps, setImageTimestamps] = useState<Record<string, number>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimestamps: Record<string, number> = {};
      cameras?.forEach((camera) => {
        newTimestamps[camera._id] = Date.now();
      });
      setImageTimestamps(newTimestamps);
    }, 30000);

    return () => clearInterval(interval);
  }, [cameras]);

  const handleRefreshCamera = (cameraId: string) => {
    setImageTimestamps(prev => ({ ...prev, [cameraId]: Date.now() }));
  };

  const activeCameras = cameras?.filter(c => c.isActive).sort((a, b) => a.order - b.order) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-alpine-gradient text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sunset-orange/20 via-transparent to-alpine-blue/40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-golden-hour/20 backdrop-blur-sm border-2 border-golden-hour/50 rounded-full px-6 py-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-golden-hour pulse-live"></div>
              <span className="font-mono text-sm uppercase tracking-wider">
                {activeCameras.length} {t('cameras.liveCams')}
              </span>
            </div>

            <h1 className="font-display text-6xl md:text-8xl mb-6">
              {t('cameras.title').split(' ').map((word, i) => (
                i === 0 ? <span key={i}>{word}<br/></span> : <span key={i} className="text-golden-hour">{word}</span>
              ))}
            </h1>

            <p className="text-xl md:text-2xl text-snow-cream/90 mb-8">
              {t('cameras.subtitle')}
            </p>

            <div className="flex items-center justify-center gap-6 text-snow-cream/80">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-golden-hour" />
                <span className="font-mono text-sm">{t('cameras.autoRefresh')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-golden-hour" />
                <span className="font-mono text-sm">{t('cameras.hdQuality')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-snow-cream/20 transform origin-bottom-left -skew-y-2"></div>
      </section>

      {/* Cameras Grid */}
      <section className="container mx-auto px-4 py-20">
        {activeCameras.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-mountain-night/5 flex items-center justify-center mx-auto mb-6">
              <Camera className="w-12 h-12 text-mountain-night/30" />
            </div>
            <h3 className="font-display text-3xl text-mountain-night mb-3">
              {t('cameras.noCameras')}
            </h3>
            <p className="text-mountain-night/60">
              {t('cameras.noCamerasDesc')}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-1 gap-8">
            {activeCameras.map((camera, idx) => (
              <div
                key={camera._id}
                className={`opacity-0 animate-fade-in-up stagger-${Math.min(idx + 1, 6)}`}
              >
                {camera.cameraName ? (
                  <CameraHistoryViewer
                    cameraName={camera.cameraName}
                    historyCount={camera.historyCount || 216}
                    name={getLocalizedField(camera, 'name', locale)}
                    description={getLocalizedField(camera, 'description', locale)}
                  />
                ) : (
                  <LiveCamera
                    name={getLocalizedField(camera, 'name', locale)}
                    imageUrl={camera.imageUrl}
                    description={getLocalizedField(camera, 'description', locale)}
                    type={camera.type || "image"}
                    timestamp={imageTimestamps[camera._id]}
                    onRefresh={() => handleRefreshCamera(camera._id)}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="bg-gradient-to-br from-sunset-orange/5 via-golden-hour/5 to-alpine-blue/5 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              Sledujte podmínky kdykoliv
            </h2>
            <p className="text-lg text-mountain-night/80 leading-relaxed mb-8">
              Naše webkamery vám poskytují živý pohled na sjezdovku a aktuální sněhové 
              podmínky. Obrázky se automaticky obnovují každých 30 sekund, nebo můžete 
              provést ruční refresh kdykoli potřebujete.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white rounded-xl p-6">
                <div className="w-10 h-10 rounded-full bg-sunset-orange/10 flex items-center justify-center mb-4">
                  <Camera className="w-5 h-5 text-sunset-orange" />
                </div>
                <h3 className="font-display text-xl mb-2">HD Kvalita</h3>
                <p className="text-sm text-mountain-night/70">
                  Všechny kamery nabízejí high-definition kvalitu obrazu
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="w-10 h-10 rounded-full bg-alpine-blue/10 flex items-center justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-alpine-blue pulse-live"></div>
                </div>
                <h3 className="font-display text-xl mb-2">Živě 24/7</h3>
                <p className="text-sm text-mountain-night/70">
                  Kamery fungují nepřetržitě, můžete se podívat kdykoliv
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="w-10 h-10 rounded-full bg-golden-hour/10 flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5 text-golden-hour" />
                </div>
                <h3 className="font-display text-xl mb-2">Více úhlů</h3>
                <p className="text-sm text-mountain-night/70">
                  Několik kamer pro kompletní přehled o areálu
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
