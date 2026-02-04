"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Plus, Edit, Trash2, Save, X, CreditCard } from "lucide-react";

export default function AdminPricingPage() {
  const router = useRouter();
  const pricing = useQuery(api.pricing.list);
  const createPrice = useMutation(api.pricing.create);
  const updatePrice = useMutation(api.pricing.update);
  const deletePrice = useMutation(api.pricing.remove);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    category: "time",
    name_cs: "",
    name_en: "",
    priceRegular: 0,
    priceReduced: 0,
    description_cs: "",
    description_en: "",
    order: 1,
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("adminAuth")) {
      router.push("/admin");
    }
  }, [router]);

  const handleEdit = (price: any) => {
    setEditingId(price._id);
    setFormData({
      category: price.category,
      name_cs: price.name_cs || price.name || "",
      name_en: price.name_en || price.name || "",
      priceRegular: price.priceRegular,
      priceReduced: price.priceReduced || 0,
      description_cs: price.description_cs || price.description || "",
      description_en: price.description_en || price.description || "",
      order: price.order,
    });
  };

  const handleSave = async () => {
    const data = {
      category: formData.category,
      name_cs: formData.name_cs,
      name_en: formData.name_en,
      priceRegular: formData.priceRegular,
      priceReduced: formData.priceReduced > 0 ? formData.priceReduced : undefined,
      description_cs: formData.description_cs || undefined,
      description_en: formData.description_en || undefined,
      order: formData.order,
    };

    if (editingId) {
      await updatePrice({
        id: editingId as any,
        ...data,
      });
      setEditingId(null);
    } else {
      await createPrice(data);
      setIsAdding(false);
    }
    setFormData({ category: "time", name_cs: "", name_en: "", priceRegular: 0, priceReduced: 0, description_cs: "", description_en: "", order: 1 });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Opravdu chcete smazat tuto položku ceníku?")) {
      await deletePrice({ id: id as any });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({ category: "time", name_cs: "", name_en: "", priceRegular: 0, priceReduced: 0, description_cs: "", description_en: "", order: 1 });
  };

  const timeTickets = pricing?.filter((p) => p.category === "time");
  const pointTickets = pricing?.filter((p) => p.category === "points");
  const kidsTickets = pricing?.filter((p) => p.category === "kids");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Správa ceníku</h1>
          <p className="text-gray-600">Přidat, upravit nebo odstranit položky ceníku</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Přidat položku
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-blue-500">
          <h3 className="text-xl font-bold mb-4">{editingId ? "Upravit položku" : "Nová položka"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Kategorie *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="time">Časové jízdenky</option>
                <option value="points">Bodové jízdenky</option>
                <option value="kids">Dětský areál</option>
              </select>
            </div>
            <div></div>
            <div>
              <label className="block text-sm font-medium mb-2">Název (čeština) *</label>
              <input
                type="text"
                value={formData.name_cs}
                onChange={(e) => setFormData({ ...formData, name_cs: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="např. 1 hodina"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Name (English) *</label>
              <input
                type="text"
                value={formData.name_en}
                onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="e.g. 1 hour"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Plná cena (Kč) *</label>
              <input
                type="number"
                value={formData.priceRegular}
                onChange={(e) => setFormData({ ...formData, priceRegular: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Zlevněná cena (Kč)</label>
              <input
                type="number"
                value={formData.priceReduced}
                onChange={(e) => setFormData({ ...formData, priceReduced: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="150"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Popis (čeština)</label>
              <input
                type="text"
                value={formData.description_cs}
                onChange={(e) => setFormData({ ...formData, description_cs: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Dodatečné informace"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description (English)</label>
              <input
                type="text"
                value={formData.description_en}
                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Additional info"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pořadí</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 border rounded-lg"
              />
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

      {/* Pricing Categories */}
      <div className="grid grid-cols-1 gap-8">
        {/* Time Tickets */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-600" />
            Časové jízdenky
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {timeTickets && timeTickets.length > 0 ? (
              timeTickets.map((price) => (
                <PricingItem
                  key={price._id}
                  price={price}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  editingId={editingId}
                />
              ))
            ) : (
              <p className="text-gray-500 italic">Žádné časové jízdenky</p>
            )}
          </div>
        </div>

        {/* Point Tickets */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-purple-600" />
            Bodové jízdenky
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {pointTickets && pointTickets.length > 0 ? (
              pointTickets.map((price) => (
                <PricingItem
                  key={price._id}
                  price={price}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  editingId={editingId}
                />
              ))
            ) : (
              <p className="text-gray-500 italic">Žádné bodové jízdenky</p>
            )}
          </div>
        </div>

        {/* Kids Tickets */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-green-600" />
            Dětský areál
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {kidsTickets && kidsTickets.length > 0 ? (
              kidsTickets.map((price) => (
                <PricingItem
                  key={price._id}
                  price={price}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  editingId={editingId}
                />
              ))
            ) : (
              <p className="text-gray-500 italic">Žádné položky dětského areálu</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingItem({ price, onEdit, onDelete, editingId }: any) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
      <div className="flex-1">
        <h3 className="text-lg font-bold">{price.name_cs || price.name}</h3>
        {price.name_en && <p className="text-sm text-gray-500">EN: {price.name_en}</p>}
        {(price.description_cs || price.description) && (
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-semibold">CS:</span> {price.description_cs || price.description}
          </p>
        )}
        {price.description_en && (
          <p className="text-sm text-gray-600">
            <span className="font-semibold">EN:</span> {price.description_en}
          </p>
        )}
        <div className="flex gap-4 mt-2">
          <span className="text-lg font-bold text-blue-600">{price.priceRegular} Kč</span>
          {price.priceReduced && (
            <span className="text-lg font-semibold text-green-600">{price.priceReduced} Kč (zlevněno)</span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(price)}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          title="Upravit"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(price._id)}
          className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
          title="Smazat"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
