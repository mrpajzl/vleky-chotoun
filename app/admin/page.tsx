"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password check (in production, use proper authentication)
    if (password === "vleky2026") {
      // Store auth in sessionStorage
      sessionStorage.setItem("adminAuth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Nesprávné heslo");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="flex items-center justify-center mb-8">
          <Lock className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Admin Panel
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Heslo
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Zadejte administrátorské heslo"
              required
            />
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Přihlásit se
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded text-sm text-gray-600">
          <p className="font-semibold mb-1">🔐 Výchozí přihlašovací údaje:</p>
          <p>Heslo: <code className="bg-gray-200 px-2 py-1 rounded">vleky2026</code></p>
        </div>
      </div>
    </div>
  );
}
