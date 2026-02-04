"use client";

import { useEffect, useState } from "react";
import { Thermometer, CloudSnow, Wind } from "lucide-react";

interface WeatherData {
  temperature: number;
  feelsLike: number;
  description: string;
  windSpeed: number;
  forecast: {
    time: string;
    temp: number;
  }[];
}

export default function WeatherForecast() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Chotouň coordinates
    const lat = 49.90122;
    const lon = 14.51319;

    // Using Open-Meteo (free, no API key required)
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m&forecast_days=1&timezone=Europe/Prague`
        );
        
        const data = await response.json();
        
        const current = data.current;
        const hourly = data.hourly;
        
        // Get next 6 hours forecast
        const now = new Date();
        const currentHour = now.getHours();
        const forecast = [];
        
        for (let i = 0; i < 6; i++) {
          const hour = (currentHour + i) % 24;
          const temp = hourly.temperature_2m[currentHour + i];
          if (temp !== undefined) {
            forecast.push({
              time: `${hour}:00`,
              temp: Math.round(temp),
            });
          }
        }

        setWeather({
          temperature: Math.round(current.temperature_2m),
          feelsLike: Math.round(current.apparent_temperature),
          description: getWeatherDescription(current.weather_code),
          windSpeed: Math.round(current.wind_speed_10m),
          forecast,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather:", error);
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every 15 minutes
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherDescription = (code: number): string => {
    if (code === 0) return "Jasno";
    if (code <= 3) return "Částečně oblačno";
    if (code <= 48) return "Mlha";
    if (code <= 67) return "Déšť";
    if (code <= 77) return "Sněžení";
    if (code <= 82) return "Přeháňky";
    if (code <= 86) return "Sněhové přeháňky";
    return "Proměnlivé";
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-16 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-6 border-2 border-blue-200">
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Thermometer className="w-6 h-6 text-blue-600" />
        Aktuální počasí
      </h3>

      {/* Current Weather */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 text-center shadow">
          <div className="text-4xl font-bold text-blue-600">{weather.temperature}°C</div>
          <div className="text-sm text-gray-600 mt-1">Teplota</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow">
          <div className="text-2xl font-bold text-cyan-600">{weather.feelsLike}°C</div>
          <div className="text-sm text-gray-600 mt-1">Pocitová</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow">
          <CloudSnow className="w-8 h-8 mx-auto mb-1 text-indigo-600" />
          <div className="text-sm text-gray-600">{weather.description}</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow">
          <Wind className="w-8 h-8 mx-auto mb-1 text-gray-600" />
          <div className="text-sm text-gray-600">{weather.windSpeed} km/h</div>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div>
        <h4 className="font-semibold text-lg mb-3">Předpověď na další hodiny</h4>
        <div className="grid grid-cols-6 gap-2">
          {weather.forecast.map((hour, idx) => (
            <div key={idx} className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-xs text-gray-600 mb-1">{hour.time}</div>
              <div className="text-lg font-bold text-blue-600">{hour.temp}°C</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Aktualizováno: {new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
}
