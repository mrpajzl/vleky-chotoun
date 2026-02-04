"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Save, CloudSnow } from "lucide-react";

export default function AdminConditionsPage() {
  const router = useRouter();
  const conditions = useQuery(api.conditions.getCurrent);
  const updateConditions = useMutation(api.conditions.update);

  const [snowDepth, setSnowDepth] = useState("");
  const [snowType, setSnowType] = useState("");
  const [quality, setQuality] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("adminAuth")) {
      router.push("/admin");
    }
  }, [router]);

  useEffect(() => {
    if (conditions) {
      setSnowDepth(conditions.snowDepth);
      setSnowType(conditions.snowType);
      setQuality(conditions.quality);
    }
  }, [conditions]);

  const handleSave = async () => {
    await updateConditions({
      snowDepth,
      snowType,
      quality,
    });
    alert("Sněhové podmínky byly úspěšně aktualizovány!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Správa sněhových podmínek</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <CloudSnow className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Aktuální podmínky</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Výška sněhu *</label>
            <input
              type="text"
              value={snowDepth}
              onChange={(e) => setSnowDepth(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="např. 100-140cm"
            />
            <p className="text-sm text-gray-500 mt-1">Rozsah výšky sněhu v cm</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Druh sněhu *</label>
            <input
              type="text"
              value={snowType}
              onChange={(e) => setSnowType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="např. technický+přírodní"
            />
            <p className="text-sm text-gray-500 mt-1">Typ sněhové pokrývky</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Kvalita podmínek *</label>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">-- Vyberte --</option>
              <option value="výborné">Výborné</option>
              <option value="dobré">Dobré</option>
              <option value="uspokojivé">Uspokojivé</option>
              <option value="špatné">Špatné</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">Celkové hodnocení podmínek</p>
          </div>
        </div>

        {/* Preview */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-bold mb-4">Náhled:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Výška sněhu</p>
              <p className="text-xl font-bold text-blue-800">{snowDepth || "-"}</p>
            </div>
            <div className="bg-indigo-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Druh sněhu</p>
              <p className="text-xl font-bold text-indigo-800">{snowType || "-"}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Podmínky</p>
              <p className="text-xl font-bold text-green-800">{quality || "-"}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Uložit podmínky
        </button>

        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
          <p className="text-sm text-yellow-800">
            ⚠️ <strong>Důležité:</strong> Aktualizujte sněhové podmínky pravidelně (ideálně denně), 
            aby návštěvníci měli aktuální informace.
          </p>
        </div>
      </div>
    </div>
  );
}
