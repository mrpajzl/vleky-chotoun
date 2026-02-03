"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LiveCamera from "@/components/LiveCamera";

export default function KameryPage() {
  const cameras = useQuery(api.cameras.list);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
        Živé webkamery
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Sledujte aktuální situaci v areálu v reálném čase. Kamery se automaticky aktualizují každých 30 sekund.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {cameras?.map((camera) => (
          <LiveCamera key={camera._id} camera={camera} />
        ))}
      </div>

      {(!cameras || cameras.length === 0) && (
        <p className="text-center text-gray-500">Načítání kamer...</p>
      )}

      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="font-bold text-lg mb-2">💡 Tip</h2>
        <p className="text-gray-700">
          Sledujte obsazenost areálu pomocí kamer a plánujte svou návštěvu podle vytížení! 
          Ve všední dny si užijete krásné lyžování bez front.
        </p>
      </div>
    </div>
  );
}
