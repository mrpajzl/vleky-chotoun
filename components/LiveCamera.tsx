"use client";

import { useState, useEffect } from "react";
import { Camera, RefreshCcw } from "lucide-react";

interface LiveCameraProps {
  camera: {
    _id: string;
    name: string;
    description?: string;
    imageUrl: string;
  };
}

export default function LiveCamera({ camera }: LiveCameraProps) {
  const [imageUrl, setImageUrl] = useState(camera.imageUrl);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshImage();
    }, 30000);

    return () => clearInterval(interval);
  }, [camera.imageUrl]);

  const refreshImage = () => {
    setIsLoading(true);
    // Add timestamp to force refresh
    const timestamp = new Date().getTime();
    setImageUrl(`${camera.imageUrl}?t=${timestamp}`);
    setLastUpdate(new Date());
    
    // Reset loading state after a brief moment
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative aspect-video bg-gray-200">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-10">
            <RefreshCcw className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
        <img
          src={imageUrl}
          alt={camera.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            const target = e.target as HTMLImageElement;
            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%23666'%3EKamera není dostupná%3C/text%3E%3C/svg%3E";
          }}
        />
        
        {/* Live Badge */}
        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          LIVE
        </div>
        
        {/* Refresh Button */}
        <button
          onClick={refreshImage}
          className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all"
          title="Obnovit obrázek"
        >
          <RefreshCcw className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Camera className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-lg">{camera.name}</h3>
        </div>
        {camera.description && (
          <p className="text-gray-600 text-sm mb-2">{camera.description}</p>
        )}
        <div className="text-xs text-gray-500">
          Poslední aktualizace: {lastUpdate.toLocaleTimeString("cs-CZ")}
        </div>
      </div>
    </div>
  );
}
