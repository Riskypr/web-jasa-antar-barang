"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import {
    X,
    User,
    Mail,
    Phone,
    Lock,
    Truck,
    FileText,
    BadgeCheck,
    Save,
} from "lucide-react";

import {
    motion,
    AnimatePresence,
} from "framer-motion";

export default function AddDriverModal({
    open,
    onClose,
}) {
    const [loading, setLoading] =
        useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",

        status: "ACTIVE",

        vehicleType: "MOTOR",

        licenseNumber: "",
        identityNumber: "",

        isOnline: false,
        isVerified: false,
    });

    const handleChange = (e) => {
        const {
            name,
            value,
            checked,
            type,
        } = e.target;

        setForm((prev) => ({
            ...prev,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch(
                "/api/admin/drivers",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify(form),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(
                    data.message ||
                    "Gagal menambahkan driver"
                );

                return;
            }

            toast.success(
                data.message ||
                "Driver berhasil ditambahkan"
            );

            onClose();

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (err) {
            toast.error(
                "Terjadi kesalahan server"
            );
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
                    className="
                        fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex items-center justify-center p-5
                    "
                >
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.96,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.96,
                            y: 20,
                        }}
                        className="
                        w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden
                        "
                    >
                        {/* HEADER */}
                        <div className="px-7 py-6 border-b border-black/5 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black">
                                    Tambah Driver
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Tambahkan driver baru ke
                                    sistem.
                                </p>
                            </div>

                            <button
                                onClick={onClose}
                                className="
                                w-11 h-11 rounded-xl hover:bg-zinc-100 flex items-center justify-center
                                "
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-7 space-y-6"
                        >
                            <div className="grid md:grid-cols-2 gap-5">
                                <Input
                                    icon={User}
                                    label="Nama Driver"
                                    name="name"
                                    placeholder="Masukkan nama lengkap"
                                    value={form.name}
                                    onChange={handleChange}
                                />

                                <Input
                                    icon={Mail}
                                    label="Email"
                                    name="email"
                                    placeholder="contoh: john.doe@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                />

                                <Input
                                    icon={Phone}
                                    label="Nomor Telepon"
                                    name="phone"
                                    placeholder="contoh: +62 812-3456-7890"
                                    value={form.phone}
                                    onChange={handleChange}
                                />

                                <Input
                                    icon={Lock}
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="Minimal 8 karakter"
                                    value={form.password}
                                    onChange={handleChange}
                                />

                                <Select
                                    icon={Truck}
                                    label="Armada"
                                    name="vehicleType"
                                    value={form.vehicleType}
                                    onChange={handleChange}
                                    options={[
                                        "MOTOR",
                                        "MOBIL",
                                        "TRUCK",
                                    ]}
                                />

                                <Select
                                    label="Status Akun"
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    options={[
                                        "ACTIVE",
                                        "SUSPENDED",
                                        "INACTIVE",
                                    ]}
                                />

                                <Input
                                    icon={FileText}
                                    label="Nomor SIM"
                                    placeholder="Contoh: 12345678"
                                    name="licenseNumber"
                                    value={form.licenseNumber}
                                    onChange={handleChange}
                                />

                                <Input
                                    icon={BadgeCheck}
                                    label="Nomor Identitas"
                                    name="identityNumber"
                                    placeholder="Contoh: 1234567890123456"
                                    value={
                                        form.identityNumber
                                    }
                                    onChange={handleChange}
                                />
                            </div>

                            {/* SWITCH */}
                            <div className="grid grid-cols-2 gap-4">
                                <SwitchCard
                                    title="Driver Online"
                                    name="isOnline"
                                    checked={form.isOnline}
                                    onChange={handleChange}
                                />

                                <SwitchCard
                                    title="Driver Verified"
                                    name="isVerified"
                                    checked={form.isVerified}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* FOOTER */}
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="
                                        h-12 px-5 rounded-xl border border-black/10 font-medium
                                    "
                                >
                                    Batal
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        h-12 px-6 rounded-2xl bg-black text-white font-semibold flex items-center gap-2
                                        "
                                >
                                    <Save size={17} />

                                    {loading
                                        ? "Menyimpan..."
                                        : "Tambah Driver"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function Input({
    icon: Icon,
    label,
    ...props
}) {
    return (
        <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                {label}
            </label>

            <div className="relative">
                {Icon && (
                    <Icon
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                )}

                <input
                    {...props}
                    className="
                        w-full h-12 rounded-xl placeholder:text-[13px] bg-zinc-100 focus:border-black outline-none border border-black/10 pl-11 pr-4
                    "
                />
            </div>
        </div>
    );
}

function Select({
    label,
    options,
    ...props
}) {
    return (
        <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                {label}
            </label>

            <select
                {...props}
                className="
          w-full h-12 rounded-xl bg-zinc-100 border border-black/10 px-4 outline-none
        "
            >
                {options.map((item) => (
                    <option
                        key={item}
                        value={item}
                    >
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
}

function SwitchCard({
    title,
    name,
    checked,
    onChange,
}) {
    return (
        <label
            className="
       rounded-2xl border border-black/5 bg-zinc-50 p-5 flex items-center justify-between cursor-pointer
      "
        >
            <span className="font-semibold">
                {title}
            </span>

            <div
                className={`
          w-14 h-8 rounded-full p-1
          transition-all
          ${checked
                        ? "bg-black"
                        : "bg-zinc-300"
                    }
        `}
            >
                <div
                    className={`
            w-6 h-6 rounded-full bg-white
            transition-all
            ${checked
                            ? "translate-x-6"
                            : ""
                        }
          `}
                />
            </div>

            <input
                hidden
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
            />
        </label>
    );
}