"use client";

import { useEffect, useState } from "react";
import { Thermometer } from "lucide-react";

export default function WeatherWidget() {
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const lat = 49.90122;
        const lon = 14.51319;
        
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&timezone=Europe/Prague`
        );
        
        const data = await response.json();
        setTemperature(Math.round(data.current.temperature_2m));
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (temperature === null) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Thermometer className="w-6 h-6 text-golden-hour" />
      <div>
        <div className="font-mono text-sm opacity-75">Teplota</div>
        <div className="font-display text-2xl">{temperature}°C</div>
      </div>
    </div>
  );
}
