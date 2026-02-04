"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Camera, Plus, Edit, Trash2, Save, X } from "lucide-react";

export default function AdminCamerasPage() {
  const router = useRouter();
  const cameras = useQuery(api.cameras.listAll);
  const createCamera = useMutation(api.cameras.create);
  const updateCamera = useMutation(api.cameras.update);
  const deleteCamera = useMutation(api.cameras.remove);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name_cs: "",
    name_en: "",
    description_cs: "",
    description_en: "",
    imageUrl: "",
    type: "image" as "image" | "iframe",
    order: 1,
    isActive: true,
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("adminAuth")) {
      router.push("/admin");
    }
  }, [router]);

  const handleEdit = (camera: any) => {
    setEditingId(camera._id);
    setFormData({
      name_cs: camera.name_cs || camera.name || "",
      name_en: camera.name_en || camera.name || "",
      description_cs: camera.description_cs || camera.description || "",
      description_en: camera.description_en || camera.description || "",
      imageUrl: camera.imageUrl,
      type: camera.type || "image",
      order: camera.order,
      isActive: camera.isActive,
    });
  };

  const handleSave = async () => {
    if (editingId) {
      await updateCamera({
        id: editingId as any,
        ...formData,
      });
      setEditingId(null);
    } else {
      await createCamera(formData);
      setIsAdding(false);
    }
    setFormData({ name_cs: "", name_en: "", description_cs: "", description_en: "", imageUrl: "", type: "image", order: 1, isActive: true });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Opravdu chcete smazat tuto kameru?")) {
      await deleteCamera({ id: id as any });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({ name_cs: "", name_en: "", description_cs: "", description_en: "", imageUrl: "", type: "image", order: 1, isActive: true });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Správa webkamer</h1>
          <p className="text-gray-600">Přidat, upravit nebo odstranit kamery</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Přidat kameru
        </button>
      </div>

      {/* Add Camera Form */}
      {isAdding && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-blue-500">
          <h3 className="text-xl font-bold mb-4">Nová kamera</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Název (čeština) *</label>
              <input
                type="text"
                value={formData.name_cs}
                onChange={(e) => setFormData({ ...formData, name_cs: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="např. Kamera 1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Name (English) *</label>
              <input
                type="text"
                value={formData.name_en}
                onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="e.g. Camera 1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Typ kamery *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as "image" | "iframe" })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="image">Statický obrázek</option>
                <option value="iframe">Živé video (iframe)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                {formData.type === "iframe" ? "URL iframe embedu *" : "URL obrázku *"}
              </label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder={formData.type === "iframe" ? "https://v.angelcam.com/iframe?v=..." : "https://..."}
              />
              {formData.type === "iframe" && (
                <p className="text-xs text-gray-500 mt-1">
                  Pro Angelcam použijte iframe embed URL
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Popis (čeština)</label>
              <input
                type="text"
                value={formData.description_cs}
                onChange={(e) => setFormData({ ...formData, description_cs: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Krátký popis kamery"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description (English)</label>
              <input
                type="text"
                value={formData.description_en}
                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Short camera description"
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
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="mr-2"
              />
              <label className="text-sm font-medium">Aktivní</label>
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

      {/* Camera List */}
      <div className="grid grid-cols-1 gap-6">
        {cameras?.map((camera) => (
          <div key={camera._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {editingId === camera._id ? (
              <div className="p-6 border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold mb-4">Upravit kameru</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Název (čeština) *</label>
                    <input
                      type="text"
                      value={formData.name_cs}
                      onChange={(e) => setFormData({ ...formData, name_cs: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Name (English) *</label>
                    <input
                      type="text"
                      value={formData.name_en}
                      onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Typ kamery *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as "image" | "iframe" })}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="image">Statický obrázek</option>
                      <option value="iframe">Živé video (iframe)</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      {formData.type === "iframe" ? "URL iframe embedu *" : "URL obrázku *"}
                    </label>
                    <input
                      type="text"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    {formData.type === "iframe" && (
                      <p className="text-xs text-gray-500 mt-1">
                        Pro Angelcam použijte iframe embed URL
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Popis (čeština)</label>
                    <input
                      type="text"
                      value={formData.description_cs}
                      onChange={(e) => setFormData({ ...formData, description_cs: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description (English)</label>
                    <input
                      type="text"
                      value={formData.description_en}
                      onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
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
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium">Aktivní</label>
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
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 aspect-video bg-gray-200">
                  {camera.type === "iframe" ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                      <div className="text-center p-4">
                        <Camera className="w-12 h-12 mx-auto mb-2 text-blue-600" />
                        <p className="text-sm font-semibold text-gray-700">Živé video (iframe)</p>
                        <p className="text-xs text-gray-500 mt-1">Náhled není k dispozici</p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={`${camera.imageUrl}?t=${Date.now()}`}
                      alt={camera.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Camera className="w-6 h-6 text-blue-600" />
                        <h3 className="text-xl font-bold">{camera.name_cs || camera.name}</h3>
                        {camera.type === "iframe" && (
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-semibold">
                            Živé video
                          </span>
                        )}
                        {camera.isActive ? (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                            Aktivní
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-semibold">
                            Neaktivní
                          </span>
                        )}
                      </div>
                      {(camera.description_cs || camera.description) && (
                        <div className="mb-2">
                          <p className="text-gray-600"><span className="font-semibold">CS:</span> {camera.description_cs || camera.description}</p>
                          {camera.description_en && <p className="text-gray-600"><span className="font-semibold">EN:</span> {camera.description_en}</p>}
                        </div>
                      )}
                      <p className="text-sm text-gray-500">Pořadí: {camera.order}</p>
                      <p className="text-sm text-gray-500">Typ: {camera.type === "iframe" ? "Živé video (iframe)" : "Statický obrázek"}</p>
                      <p className="text-sm text-gray-500 break-all">URL: {camera.imageUrl}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(camera)}
                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                        title="Upravit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(camera._id)}
                        className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                        title="Smazat"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {(!cameras || cameras.length === 0) && !isAdding && (
        <div className="text-center py-12 text-gray-500">
          <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Zatím nejsou přidány žádné kamery.</p>
        </div>
      )}
    </div>
  );
}
