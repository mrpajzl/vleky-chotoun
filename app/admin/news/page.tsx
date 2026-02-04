"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Plus, Edit, Trash2, Save, X, Megaphone } from "lucide-react";

export default function AdminNewsPage() {
  const router = useRouter();
  const news = useQuery(api.news.listAll);
  const createNews = useMutation(api.news.create);
  const updateNews = useMutation(api.news.update);
  const deleteNews = useMutation(api.news.remove);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title_cs: "",
    title_en: "",
    content_cs: "",
    content_en: "",
    isImportant: false,
    isActive: true,
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("adminAuth")) {
      router.push("/admin");
    }
  }, [router]);

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setFormData({
      title_cs: item.title_cs || item.title || "",
      title_en: item.title_en || item.title || "",
      content_cs: item.content_cs || item.content || "",
      content_en: item.content_en || item.content || "",
      isImportant: item.isImportant,
      isActive: item.isActive,
    });
  };

  const handleSave = async () => {
    if (editingId) {
      await updateNews({ id: editingId as any, ...formData });
      setEditingId(null);
    } else {
      await createNews(formData);
      setIsAdding(false);
    }
    setFormData({ title_cs: "", title_en: "", content_cs: "", content_en: "", isImportant: false, isActive: true });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Opravdu chcete smazat tuto aktualitu?")) {
      await deleteNews({ id: id as any });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({ title_cs: "", title_en: "", content_cs: "", content_en: "", isImportant: false, isActive: true });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Správa aktualit</h1>
          <p className="text-gray-600">Přidat, upravit nebo odstranit novinky</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Přidat aktualitu
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-blue-500">
          <h3 className="text-xl font-bold mb-4">{editingId ? "Upravit aktualitu" : "Nová aktualita"}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nadpis (čeština) *</label>
                <input
                  type="text"
                  value={formData.title_cs}
                  onChange={(e) => setFormData({ ...formData, title_cs: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="např. Areál otevřen"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Title (English) *</label>
                <input
                  type="text"
                  value={formData.title_en}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g. Resort Open"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Obsah (čeština) *</label>
                <textarea
                  value={formData.content_cs}
                  onChange={(e) => setFormData({ ...formData, content_cs: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={6}
                  placeholder="Text aktuality v češtině"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Content (English) *</label>
                <textarea
                  value={formData.content_en}
                  onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={6}
                  placeholder="News content in English"
                />
              </div>
            </div>
            
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isImportant}
                  onChange={(e) => setFormData({ ...formData, isImportant: e.target.checked })}
                  className="mr-2 w-5 h-5"
                />
                <span className="text-sm font-medium">Důležité (zobrazit žlutě nahoře)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="mr-2 w-5 h-5"
                />
                <span className="text-sm font-medium">Aktivní</span>
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
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Zrušit
            </button>
          </div>
        </div>
      )}

      {/* News List */}
      <div className="space-y-4">
        {news?.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Megaphone className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold">{item.title_cs || item.title}</h3>
                    {item.isImportant && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                        ⚠️ Důležité
                      </span>
                    )}
                    {item.isActive ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                        ✅ Aktivní
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-semibold">
                        Neaktivní
                      </span>
                    )}
                  </div>
                  
                  {/* Czech Version */}
                  <div className="mb-4 bg-blue-50 p-3 rounded">
                    <p className="text-xs font-semibold text-blue-700 mb-1">🇨🇿 Česká verze:</p>
                    {item.title_cs && <p className="font-semibold text-gray-800">{item.title_cs}</p>}
                    <p className="text-gray-700 whitespace-pre-wrap mt-1">{item.content_cs || item.content}</p>
                  </div>
                  
                  {/* English Version */}
                  {(item.title_en || item.content_en) && (
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-xs font-semibold text-green-700 mb-1">🇬🇧 English version:</p>
                      {item.title_en && <p className="font-semibold text-gray-800">{item.title_en}</p>}
                      {item.content_en && <p className="text-gray-700 whitespace-pre-wrap mt-1">{item.content_en}</p>}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-3">
                    Vytvořeno: {new Date(item.createdAt).toLocaleString("cs-CZ")}
                  </p>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    title="Upravit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                    title="Smazat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(!news || news.length === 0) && !isAdding && (
        <div className="text-center py-12 text-gray-500">
          <Megaphone className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Zatím nejsou přidány žádné aktuality.</p>
        </div>
      )}
    </div>
  );
}
