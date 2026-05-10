"use client";

import { useState } from "react";
import {
  Truck,
  Bike,
  Car,
  Trash2,
  Pencil,
  Plus,
  BadgeDollarSign,
  Package,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
} from "lucide-react";

import AddFleetModal from "../fleet/AddFleetModal";
import EditFleetModal from "../fleet/EditFleetModal";
import DeleteFleetModal from "../fleet/DeleteFleetModal";


export default function ArmadaManagement({ initialVehicles }) {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // --- STATE BARU UNTUK SEARCH & FILTER ---
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("ALL");

  // --- LOGIKA FILTERING ---
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "ALL" || vehicle.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddSuccess = (newVehicle) => {
    setVehicles((prev) => [newVehicle, ...prev]);
  };

  const handleEditSuccess = (updatedVehicle) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === updatedVehicle.id ? updatedVehicle : v))
    );
  };

  const handleDeleteSuccess = (deletedId) => {
    setVehicles((prev) => prev.filter((v) => v.id !== deletedId));
  };

  const getVehicleIcon = (type) => {
    switch (type) {
      case "MOTOR": return Bike;
      case "MOBIL": return Car;
      default: return Truck;
    }
  };

  return (
    <>
      <div className="bg-white border border-black/5 rounded-[32px] overflow-hidden shadow-sm">
        {/* HEADER */}
        <div className="px-8 py-6 border-b border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black">Data Armada</h2>
            <p className="text-sm text-gray-500 mt-1">Seluruh kendaraan JaBarin.</p>
          </div>

          <button
            onClick={() => setOpenAdd(true)}
            className="h-12 px-5 rounded-2xl bg-black text-white font-semibold flex items-center gap-2"
          >
            <Plus size={18} />
            Tambah Armada
          </button>
        </div>

        {/* --- BARU: SEARCH & FILTER BAR --- */}
        <div className="px-8 py-4 bg-zinc-50/50 border-b border-black/5 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari nama armada..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-2xl border border-black/10 outline-none focus:border-black transition-all bg-white"
            />
          </div>

          <div className="relative min-w-[200px]">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-2xl border border-black/10 outline-none appearance-none bg-white font-medium"
            >
              <option value="ALL">Semua Tipe</option>
              <option value="MOTOR">Motor</option>
              <option value="MOBIL">Mobil</option>
              <option value="TRUCK">Truck</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="border-b border-black/5 text-left text-xs uppercase tracking-wider text-gray-400">
                <th className="px-8 py-5">Armada</th>
                <th className="px-8 py-5">Harga</th>
                <th className="px-8 py-5">Max Berat</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Order</th>
                <th className="px-8 py-5 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {/* --- MENGGUNAKAN filteredVehicles --- */}
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => {
                  const Icon = getVehicleIcon(vehicle.type);
                  return (
                    <tr key={vehicle.id} className="border-b border-black/5 hover:bg-zinc-50 transition-all">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center shrink-0">
                            <Icon size={22} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-bold text-[15px]">{vehicle.name}</h3>
                            <p className="text-sm text-gray-400">{vehicle.type}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <BadgeDollarSign size={15} />
                            Rp {vehicle.basePrice.toLocaleString("id-ID")}
                          </div>
                          <p className="text-xs text-gray-400">+ Rp {vehicle.pricePerKm.toLocaleString("id-ID")} / KM</p>
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-100 text-sm font-semibold">
                          <Package size={15} />
                          {vehicle.maxWeight || 0} Kg
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        {vehicle.isActive ? (
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-100 text-emerald-700 text-sm font-bold">
                            <CheckCircle2 size={15} /> Aktif
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-100 text-red-600 text-sm font-bold">
                            <XCircle size={15} /> Nonaktif
                          </div>
                        )}
                      </td>

                      <td className="px-8 py-6">
                        <div className="inline-flex px-4 py-2 rounded-2xl bg-black text-white text-sm font-bold">
                          {vehicle._count?.orders || 0} Order
                        </div>
                      </td>

                      <td className="px-8 py-6 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => {
                              setSelectedVehicle(vehicle);
                              setOpenEdit(true);
                            }}
                            className="w-11 h-11 rounded-2xl border border-black/10 hover:bg-zinc-100 transition-all flex items-center justify-center"
                          >
                            <Pencil size={17} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedVehicle(vehicle);
                              setOpenDelete(true);
                            }}
                            className="w-11 h-11 rounded-2xl border border-red-100 hover:bg-red-50 text-red-500 transition-all flex items-center justify-center"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-gray-400">
                    Tidak ada armada yang sesuai dengan pencarian Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALS TETAP SAMA */}
      <AddFleetModal open={openAdd} onClose={() => setOpenAdd(false)} onSuccess={handleAddSuccess} />
      <EditFleetModal open={openEdit} onClose={() => setOpenEdit(false)} onSuccess={handleEditSuccess} vehicle={selectedVehicle} />
      <DeleteFleetModal open={openDelete} onClose={() => setOpenDelete(false)} onSuccess={handleDeleteSuccess} vehicle={selectedVehicle} />
    </>
  );
}