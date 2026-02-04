"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Phone, Mail, MapPin, Globe } from "lucide-react";

export default function AdminSettingsPage() {
  const router = useRouter();

  const [settings, setSettings] = useState({
    phone: "721 115 584",
    email: "info@vlekychotoun.cz",
    address: "Pohoří Chotouň 52, 254 01 Jílové u Prahy",
    website: "www.vlekychotoun.cz",
    facebook: "",
    instagram: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("adminAuth")) {
      router.push("/admin");
    }
  }, [router]);

  const handleSave = () => {
    // In the future, this would save to Convex settings table
    alert("Nastavení bylo úspěšně uloženo!\n\nPoznámka: Aktuálně se nastavení ukládá pouze v této relaci. Pro trvalé uložení kontaktujte administrátora.");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Nastavení webu</h1>
        <p className="text-gray-600">Kontaktní informace a další nastavení</p>
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
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Uložit nastavení
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
