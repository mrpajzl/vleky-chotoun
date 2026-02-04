"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";

interface LiveCameraProps {
  name: string;
  imageUrl: string;
  description?: string;
  timestamp?: number;
  onRefresh?: () => void;
}

export default function LiveCamera({ 
  name, 
  imageUrl, 
  description, 
  timestamp,
  onRefresh 
}: LiveCameraProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleRefresh = () => {
    if (onRefresh) {
      setIsRefreshing(true);
      onRefresh();
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  const imageUrlWithTimestamp = `${imageUrl}?t=${timestamp || Date.now()}`;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-xl lift-on-hover">
      {/* Live Badge */}
      <div className="absolute top-4 right-4 z-20">
        <span className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider shadow-lg pulse-live">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          ŽIVĚ
        </span>
      </div>

      {/* Refresh Button */}
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-alpine-blue hover:bg-white hover:scale-110 transition-all shadow-lg disabled:opacity-50"
        title="Obnovit obrázek"
      >
        <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
      </button>

      {/* Camera Image */}
      <div className="relative aspect-video bg-gradient-to-br from-alpine-blue/5 to-sunset-orange/5">
        {!imageError ? (
          <img
            src={imageUrlWithTimestamp}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-alpine-blue/10 to-sunset-orange/10">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-mountain-night/5 flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-10 h-10 text-mountain-night/30" />
              </div>
              <p className="font-mono text-sm text-mountain-night/50">
                Kamera není dostupná
              </p>
            </div>
          </div>
        )}

        {/* Gradient Overlay for Text */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>

      {/* Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-display text-3xl text-white mb-1">{name}</h3>
        {description && (
          <p className="text-snow-cream/90 mb-2">{description}</p>
        )}
        <p className="font-mono text-xs text-snow-cream/70">
          Aktualizováno: {new Date().toLocaleTimeString('cs-CZ')}
        </p>
      </div>

      {/* Decorative Corner Accent */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-diagonal-gradient opacity-10 blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-alpine-blue/20 opacity-10 blur-3xl"></div>
    </div>
  );
}
