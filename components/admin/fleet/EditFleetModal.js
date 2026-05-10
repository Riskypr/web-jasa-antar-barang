"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { X, Truck, BadgeDollarSign, Weight, FileText, ImageIcon, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EditFleetModal({ open, onClose, onSuccess, vehicle }) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        type: "MOTOR",
        description: "",
        icon: "",
        basePrice: "",
        pricePerKm: "",
        maxWeight: "",
        isActive: true,
    });

    // KUNCI: Mengisi form saat modal dibuka atau saat vehicle berubah
    useEffect(() => {
        if (vehicle && open) {
            setForm({
                name: vehicle.name || "",
                type: vehicle.type || "MOTOR",
                description: vehicle.description || "",
                icon: vehicle.icon || "",
                basePrice: vehicle.basePrice || "",
                pricePerKm: vehicle.pricePerKm || "",
                maxWeight: vehicle.maxWeight || "",
                isActive: vehicle.isActive ?? true,
            });
        }
    }, [vehicle, open]);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch(`/api/admin/vehicles/${vehicle.id}`, {
                method: "PUT", // Gunakan PUT untuk update
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    basePrice: Number(form.basePrice),
                    pricePerKm: Number(form.pricePerKm),
                    maxWeight: form.maxWeight ? Number(form.maxWeight) : null,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Gagal mengupdate armada");

            toast.success("Armada berhasil diperbarui!");
            onSuccess?.(data); // Kirim data terbaru ke parent (ArmadaManagement)
            onClose();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex items-center justify-center p-5"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="w-full max-w-3xl rounded-[32px] bg-white shadow-2xl overflow-hidden"
                    >
                        {/* HEADER */}
                        <div className="p-7 border-b border-black/5 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black">Edit Armada</h2>
                                <p className="text-sm text-gray-500 mt-1">Ubah informasi armada {vehicle?.name}</p>
                            </div>
                            <button onClick={onClose} className="w-11 h-11 rounded-2xl hover:bg-zinc-100 flex items-center justify-center">
                                <X size={20} />
                            </button>
                        </div>

                        {/* FORM (Gunakan komponen Input yang sama dengan AddFleetModal) */}
                        <form onSubmit={handleSubmit} className="p-7 space-y-6">
                            <div className="grid md:grid-cols-2 gap-5">
                                <Input icon={Truck} label="Nama Armada" name="name" value={form.name} onChange={handleChange} />
                                <Select label="Tipe Armada" name="type" value={form.type} onChange={handleChange} options={["MOTOR", "MOBIL", "TRUCK"]} />
                                <Input icon={BadgeDollarSign} type="number" label="Harga Dasar" name="basePrice" value={form.basePrice} onChange={handleChange} />
                                <Input icon={BadgeDollarSign} type="number" label="Harga Per KM" name="pricePerKm" value={form.pricePerKm} onChange={handleChange} />
                                <Input icon={Weight} type="number" label="Max Berat (KG)" name="maxWeight" value={form.maxWeight} onChange={handleChange} />
                                <Input icon={ImageIcon} label="Icon URL" name="icon" value={form.icon} onChange={handleChange} />
                            </div>
                            
                            <Textarea icon={FileText} label="Deskripsi" name="description" value={form.description} onChange={handleChange} />

                            {/* FOOTER */}
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={onClose} className="h-12 px-5 rounded-2xl border border-black/10 font-medium">Batal</button>
                                <button type="submit" disabled={loading} className="h-12 px-6 rounded-2xl bg-black text-white font-semibold flex items-center gap-2">
                                    <Save size={17} />
                                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Rekomendasi: Pindahkan komponen Input, Select, Textarea ke file terpisah agar bisa di-reuse
function Input({ icon: Icon, label, ...props }) {
    return (
        <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{label}</label>
            <div className="relative">
                {Icon && <Icon size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />}
                <input {...props} className="w-full h-12 rounded-xl bg-zinc-100 border border-black/10 pl-11 pr-4 outline-none focus:border-black" />
            </div>
        </div>
    );
}

function Select({ label, options, ...props }) {
    return (
        <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{label}</label>
            <select {...props} className="w-full h-12 rounded-xl bg-zinc-100 border border-black/10 px-4 outline-none">
                {options.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
        </div>
    );
}

function Textarea({ icon: Icon, label, ...props }) {
    return (
        <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{label}</label>
            <div className="relative">
                {Icon && <Icon size={17} className="absolute left-4 top-4 text-gray-400" />}
                <textarea {...props} rows={4} className="w-full rounded-2xl bg-zinc-100 border border-black/10 pl-11 pr-4 py-4 outline-none resize-none focus:border-black" />
            </div>
        </div>
    );
}