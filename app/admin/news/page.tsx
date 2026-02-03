"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

export default function AdminNewsPage() {
  const router = useRouter();
  const news = useQuery(api.news.listAll);
  const createNews = useMutation(api.news.create);
  const updateNews = useMutation(api.news.update);
  const deleteNews = useMutation(api.news.remove);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isImportant: false,
    isActive: true,
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("adminAuth")) {
      router.push("/admin");
    }
  }, [router]);

  const handleSave = async () => {
    if (editingId) {
      await updateNews({ id: editingId as any, ...formData });
      setEditingId(null);
    } else {
      await createNews(formData);
      setIsAdding(false);
    }
    setFormData({ title: "", content: "", isImportant: false, isActive: true });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Opravdu chcete smazat tuto aktualitu?")) {
      await deleteNews({ id: id as any });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Správa aktualit</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Přidat aktualitu
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">{editingId ? "Upravit aktualitu" : "Nová aktualita"}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Název *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Obsah *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={5}
              />
            </div>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isImportant}
                  onChange={(e) => setFormData({ ...formData, isImportant: e.target.checked })}
                  className="mr-2"
                />
                Důležité (zobrazit žlutě nahoře)
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="mr-2"
                />
                Aktivní
              </label>
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
              onClick={() => {
                setEditingId(null);
                setIsAdding(false);
                setFormData({ title: "", content: "", isImportant: false, isActive: true });
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Zrušit
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {news?.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  {item.isImportant && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                      Důležité
                    </span>
                  )}
                  {!item.isActive && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-semibold">
                      Neaktivní
                    </span>
                  )}
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{item.content}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => {
                    setEditingId(item._id);
                    setFormData({
                      title: item.title,
                      content: item.content,
                      isImportant: item.isImportant,
                      isActive: item.isActive,
                    });
                  }}
                  className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
