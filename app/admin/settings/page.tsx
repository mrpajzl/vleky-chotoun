"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Save, Phone, Mail, MapPin, Globe, Navigation } from "lucide-react";

export default function AdminSettingsPage() {
  const router = useRouter();
  const location = useQuery(api.settings.getLocation);
  const setLocation = useMutation(api.settings.setLocation);

  const [settings, setSettings] = useState({
    phone: "721 115 584",
    email: "info@vlekychotoun.cz",
    address: "Pohoří Chotouň 52, 254 01 Jílové u Prahy",
    website: "www.vlekychotoun.cz",
    facebook: "",
    instagram: "",
  });

  const [lat, setLat] = useState<string>("49.90122");
  const [lon, setLon] = useState<string>("14.51319");

  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("adminAuth")) {
      router.push("/admin");
    }
  }, [router]);

  useEffect(() => {
    if (location) {
      setLat(location.lat.toString());
      setLon(location.lon.toString());
    }
  }, [location]);

  const handleSaveContact = () => {
    alert("Kontaktní informace uloženy!\n\nPoznámka: Aktuálně se kontakty ukládají pouze v této relaci. Pro trvalé uložení kontaktujte administrátora.");
  };

  const handleSaveLocation = async () => {
    try {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lon);

      if (isNaN(latitude) || isNaN(longitude)) {
        alert("Chyba: Zadejte platné GPS souřadnice (čísla s desetinnou tečkou)");
        return;
      }

      if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        alert("Chyba: GPS souřadnice jsou mimo platný rozsah");
        return;
      }

      await setLocation({ lat: latitude, lon: longitude });
      alert("GPS lokace byla úspěšně uložena! Počasí se nyní načítá pro tuto pozici.");
    } catch (error) {
      alert("Chyba při ukládání lokace: " + error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Nastavení webu</h1>
        <p className="text-gray-600">Kontaktní informace a další nastavení</p>
      </div>

      {/* Weather Location */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Navigation className="w-6 h-6" />
          GPS lokace pro předpověď počasí
        </h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                Zeměpisná šířka (latitude)
              </label>
              <input
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg font-mono"
                placeholder="49.90122"
              />
              <p className="text-xs text-gray-500 mt-1">Např. 49.90122 (Chotouň)</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                Zeměpisná délka (longitude)
              </label>
              <input
                type="text"
                value={lon}
                onChange={(e) => setLon(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg font-mono"
                placeholder="14.51319"
              />
              <p className="text-xs text-gray-500 mt-1">Např. 14.51319 (Chotouň)</p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> GPS souřadnice najdete na Google Maps kliknutím pravým tlačítkem na mapu. 
              Počasí se automaticky načítá pro tuto polohu.
            </p>
          </div>

          <button
            onClick={handleSaveLocation}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Uložit GPS lokaci
          </button>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Phone className="w-6 h-6" />
          Kontaktní informace
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              Telefon
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="721 115 584"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="info@vlekychotoun.cz"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              Adresa
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Pohoří Chotouň 52, 254 01 Jílové u Prahy"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-500" />
              Webová stránka
            </label>
            <input
              type="text"
              value={settings.website}
              onChange={(e) => setSettings({ ...settings, website: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="www.vlekychotoun.cz"
            />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Sociální sítě</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Facebook</label>
            <input
              type="text"
              value={settings.facebook}
              onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="https://facebook.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Instagram</label>
            <input
              type="text"
              value={settings.instagram}
              onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="https://instagram.com/..."
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-4">
        <button
          onClick={handleSaveContact}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Uložit kontaktní informace
        </button>
      </div>

      {/* Info Notice */}
      <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h3 className="font-bold text-lg mb-2">ℹ️ Informace</h3>
        <p className="text-gray-700">
          Tato stránka slouží pro správu kontaktních informací a obecného nastavení webu. 
          V budoucnu zde bude možné upravit více nastavení.
        </p>
      </div>
    </div>
  );
}
