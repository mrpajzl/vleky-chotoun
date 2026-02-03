"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Camera, CloudSnow, DollarSign, Newspaper, Settings, Cable } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (typeof window !== "undefined" && !sessionStorage.getItem("adminAuth")) {
      router.push("/admin");
    }
  }, [router]);

  const sections = [
    {
      title: "Webkamery",
      description: "Spravovat kamery a jejich nastavení",
      icon: <Camera className="w-12 h-12" />,
      href: "/admin/cameras",
      color: "bg-blue-500",
    },
    {
      title: "Stav areálu",
      description: "Aktualizovat provozní dobu a stav vleků",
      icon: <Cable className="w-12 h-12" />,
      href: "/admin/status",
      color: "bg-green-500",
    },
    {
      title: "Sněhové podmínky",
      description: "Upravit informace o sněhu a počasí",
      icon: <CloudSnow className="w-12 h-12" />,
      href: "/admin/conditions",
      color: "bg-cyan-500",
    },
    {
      title: "Ceník",
      description: "Spravovat ceny jízdenek",
      icon: <DollarSign className="w-12 h-12" />,
      href: "/admin/pricing",
      color: "bg-indigo-500",
    },
    {
      title: "Aktuality",
      description: "Přidat nebo upravit novinky",
      icon: <Newspaper className="w-12 h-12" />,
      href: "/admin/news",
      color: "bg-orange-500",
    },
    {
      title: "Nastavení",
      description: "Kontaktní informace a další nastavení",
      icon: <Settings className="w-12 h-12" />,
      href: "/admin/settings",
      color: "bg-gray-500",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Vítejte v administračním rozhraní webu Vleky Chotouň</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-t-4 hover:scale-105 transform duration-200"
            style={{ borderTopColor: section.color.replace("bg-", "") }}
          >
            <div className={`${section.color} w-20 h-20 rounded-lg flex items-center justify-center text-white mb-4 mx-auto`}>
              {section.icon}
            </div>
            <h2 className="text-xl font-bold text-center mb-2">{section.title}</h2>
            <p className="text-gray-600 text-center text-sm">{section.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
        <h3 className="font-bold text-lg mb-2">⚠️ Důležité poznámky</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Všechny změny se projeví okamžitě na veřejném webu</li>
          <li>• Webkamery se aktualizují automaticky každých 30 sekund</li>
          <li>• Pravidelně aktualizujte sněhové podmínky a stav areálu</li>
        </ul>
      </div>
    </div>
  );
}
