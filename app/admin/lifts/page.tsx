"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Cable, Plus, Edit, Trash2, Save, X } from "lucide-react";

export default function AdminLiftsPage() {
  const router = useRouter();
  const lifts = useQuery(api.lifts.list);
  const createLift = useMutation(api.lifts.create);
  const updateLift = useMutation(api.lifts.updateFull);
  const deleteLift = useMutation(api.lifts.remove);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    isOperating: true,
    order: 1,
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("adminAuth")) {
      router.push("/admin");
    }
  }, [router]);

  const handleEdit = (lift: any) => {
    setEditingId(lift._id);
    setFormData({
      name: lift.name,
      isOperating: lift.isOperating,
      order: lift.order,
    });
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateLift({
          id: editingId as any,
          ...formData,
        });
        setEditingId(null);
      } else {
        await createLift(formData);
        setIsAdding(false);
      }
      setFormData({ name: "", isOperating: true, order: 1 });
      alert("Vlek byl úspěšně uložen!");
    } catch (error) {
      alert("Chyba při ukládání vleku: " + error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Opravdu chcete smazat tento vlek?")) {
      await deleteLift({ id: id as any });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({ name: "", isOperating: true, order: 1 });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Správa vleků</h1>
          <p className="text-gray-600">Přidat, upravit nebo odstranit vleky</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Přidat vlek
        </button>
      </div>

      {/* Add Lift Form */}
      {isAdding && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-blue-500">
          <h3 className="text-xl font-bold mb-4">Nový vlek</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Název vleku *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="např. Poma 1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pořadí</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="flex items-center md:col-span-2">
              <input
                type="checkbox"
                checked={formData.isOperating}
                onChange={(e) => setFormData({ ...formData, isOperating: e.target.checked })}
                className="mr-2 w-5 h-5"
              />
              <label className="text-sm font-medium">V provozu</label>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Uložit
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Zrušit
            </button>
          </div>
        </div>
      )}

      {/* Lifts List */}
      <div className="grid grid-cols-1 gap-6">
        {lifts?.map((lift) => (
          <div key={lift._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {editingId === lift._id ? (
              <div className="p-6 border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold mb-4">Upravit vlek</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Název vleku *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Pořadí</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="flex items-center md:col-span-2">
                    <input
                      type="checkbox"
                      checked={formData.isOperating}
                      onChange={(e) => setFormData({ ...formData, isOperating: e.target.checked })}
                      className="mr-2 w-5 h-5"
                    />
                    <label className="text-sm font-medium">V provozu</label>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Uložit
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Zrušit
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Cable className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-bold">{lift.name}</h3>
                      {lift.isOperating ? (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                          ✅ V provozu
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                          ❌ Mimo provoz
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">Pořadí: {lift.order}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(lift)}
                      className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                      title="Upravit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(lift._id)}
                      className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                      title="Smazat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {(!lifts || lifts.length === 0) && !isAdding && (
        <div className="text-center py-12 text-gray-500">
          <Cable className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Zatím nejsou přidány žádné vleky.</p>
        </div>
      )}
    </div>
  );
}
