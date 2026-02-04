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
    name: "",
    priceRegular: 0,
    priceReduced: 0,
    description: "",
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
      name: price.name,
      priceRegular: price.priceRegular,
      priceReduced: price.priceReduced || 0,
      description: price.description || "",
      order: price.order,
    });
  };

  const handleSave = async () => {
    const data = {
      category: formData.category,
      name: formData.name,
      priceRegular: formData.priceRegular,
      priceReduced: formData.priceReduced > 0 ? formData.priceReduced : undefined,
      description: formData.description || undefined,
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
    setFormData({ category: "time", name: "", priceRegular: 0, priceReduced: 0, description: "", order: 1 });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Opravdu chcete smazat tuto položku ceníku?")) {
      await deletePrice({ id: id as any });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({ category: "time", name: "", priceRegular: 0, priceReduced: 0, description: "", order: 1 });
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
            <div>
              <label className="block text-sm font-medium mb-2">Název *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="např. 1 hodina"
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Popis</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Volitelný popis"
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
              disabled={!formData.name || formData.priceRegular <= 0}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Pricing Tables */}
      <div className="space-y-8">
        {/* Time Tickets */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-600" />
            Časové jízdenky
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Název</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Plná cena</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Zlevněná</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Popis</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Akce</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {timeTickets?.map((ticket) => (
                  <tr key={ticket._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{ticket.name}</td>
                    <td className="px-4 py-3">{ticket.priceRegular} Kč</td>
                    <td className="px-4 py-3">{ticket.priceReduced ? `${ticket.priceReduced} Kč` : "-"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{ticket.description || "-"}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleEdit(ticket)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(ticket._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Point Tickets */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-green-600" />
            Bodové jízdenky
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Název</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Plná cena</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Zlevněná</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Popis</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Akce</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {pointTickets?.map((ticket) => (
                  <tr key={ticket._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{ticket.name}</td>
                    <td className="px-4 py-3">{ticket.priceRegular} Kč</td>
                    <td className="px-4 py-3">{ticket.priceReduced ? `${ticket.priceReduced} Kč` : "-"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{ticket.description || "-"}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleEdit(ticket)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(ticket._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kids Tickets */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-purple-600" />
            Dětský areál
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Název</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Cena</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Popis</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Akce</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {kidsTickets?.map((ticket) => (
                  <tr key={ticket._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{ticket.name}</td>
                    <td className="px-4 py-3">{ticket.priceRegular} Kč</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{ticket.description || "-"}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleEdit(ticket)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(ticket._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
