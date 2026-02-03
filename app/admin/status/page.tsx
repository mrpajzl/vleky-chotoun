"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Save, Lift } from "lucide-react";

export default function AdminStatusPage() {
  const router = useRouter();
  const operatingStatus = useQuery(api.operatingStatus.getCurrent);
  const lifts = useQuery(api.lifts.list);
  const updateStatus = useMutation(api.operatingStatus.update);
  const updateLift = useMutation(api.lifts.update);

  const [isOpen, setIsOpen] = useState(true);
  const [openingHours, setOpeningHours] = useState("9-21 (so+ne 8-21)");
  const [liftStates, setLiftStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("adminAuth")) {
      router.push("/admin");
    }
  }, [router]);

  useEffect(() => {
    if (operatingStatus) {
      setIsOpen(operatingStatus.isOpen);
      setOpeningHours(operatingStatus.openingHours);
    }
  }, [operatingStatus]);

  useEffect(() => {
    if (lifts) {
      const states: Record<string, boolean> = {};
      lifts.forEach((lift) => {
        states[lift._id] = lift.isOperating;
      });
      setLiftStates(states);
    }
  }, [lifts]);

  const handleSaveStatus = async () => {
    await updateStatus({ isOpen, openingHours });
    alert("Stav areálu byl úspěšně aktualizován!");
  };

  const handleToggleLift = async (liftId: string, currentState: boolean) => {
    setLiftStates({ ...liftStates, [liftId]: !currentState });
    await updateLift({ id: liftId as any, isOperating: !currentState });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Správa stavu areálu</h1>

      {/* Operating Status */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Lift className="w-6 h-6" />
          Provozní stav
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="flex items-center text-lg mb-4">
              <input
                type="checkbox"
                checked={isOpen}
                onChange={(e) => setIsOpen(e.target.checked)}
                className="mr-3 w-5 h-5"
              />
              <span className="font-semibold">Areál je v provozu</span>
            </label>
            
            <div className={`p-4 rounded-lg ${isOpen ? "bg-green-100 border-2 border-green-500" : "bg-red-100 border-2 border-red-500"}`}>
              <p className="text-center text-xl font-bold">
                {isOpen ? "✅ AREÁL V PROVOZU" : "❌ AREÁL UZAVŘEN"}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Provozní doba</label>
            <input
              type="text"
              value={openingHours}
              onChange={(e) => setOpeningHours(e.target.value)}
              className="w-full max-w-md px-4 py-2 border rounded-lg"
              placeholder="např. 9-21 (so+ne 8-21)"
            />
            <p className="text-sm text-gray-500 mt-1">
              Zadejte provozní dobu (např. "9-21 (so+ne 8-21)")
            </p>
          </div>

          <button
            onClick={handleSaveStatus}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Uložit stav areálu
          </button>
        </div>
      </div>

      {/* Lifts Status */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Stav vleků</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lifts?.map((lift) => (
            <div
              key={lift._id}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                liftStates[lift._id]
                  ? "bg-green-50 border-green-500"
                  : "bg-gray-50 border-gray-300"
              }`}
              onClick={() => handleToggleLift(lift._id, liftStates[lift._id])}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg">{lift.name}</h3>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={liftStates[lift._id]}
                    onChange={() => {}}
                    className="sr-only peer"
                  />
                  <div className={`w-12 h-6 rounded-full ${liftStates[lift._id] ? "bg-green-500" : "bg-gray-300"}`}>
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${liftStates[lift._id] ? "translate-x-6" : ""}`}></div>
                  </div>
                </div>
              </div>
              <p className={`text-center font-semibold ${
                liftStates[lift._id] ? "text-green-700" : "text-gray-500"
              }`}>
                {liftStates[lift._id] ? "✅ V PROVOZU" : "❌ MIMO PROVOZ"}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Klikněte na vlek pro přepnutí jeho stavu. Změny se projeví okamžitě.
          </p>
        </div>
      </div>
    </div>
  );
}
