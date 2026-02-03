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
    name: "",
    description: "",
    imageUrl: "",
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
      name: camera.name,
      description: camera.description || "",
      imageUrl: camera.imageUrl,
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
    setFormData({ name: "", description: "", imageUrl: "", order: 1, isActive: true });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Opravdu chcete smazat tuto kameru?")) {
      await deleteCamera({ id: id as any });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({ name: "", description: "", imageUrl: "", order: 1, isActive: true });
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
              <label className="block text-sm font-medium mb-2">Název *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="např. Kamera 1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL obrázku *</label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="https://..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Popis</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Krátký popis kamery"
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
                    <label className="block text-sm font-medium mb-2">Název *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">URL obrázku *</label>
                    <input
                      type="text"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Popis</label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  <img
                    src={`${camera.imageUrl}?t=${Date.now()}`}
                    alt={camera.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Camera className="w-6 h-6 text-blue-600" />
                        <h3 className="text-xl font-bold">{camera.name}</h3>
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
                      {camera.description && (
                        <p className="text-gray-600 mb-2">{camera.description}</p>
                      )}
                      <p className="text-sm text-gray-500">Pořadí: {camera.order}</p>
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
