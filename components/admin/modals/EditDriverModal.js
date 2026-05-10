"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    X,
    User,
    Mail,
    Phone,
    Truck,
    ShieldCheck,
    Activity,
    Save,
    FileText,
    BadgeCheck,
    Check,
} from "lucide-react";

import {
    motion,
    AnimatePresence,
} from "framer-motion";

const STATUS_OPTIONS = [
    {
        value: "ACTIVE",
        label: "Active",
        color:
            "bg-emerald-100 text-emerald-700 border-emerald-200",
    },

    {
        value: "SUSPENDED",
        label: "Suspended",
        color:
            "bg-amber-100 text-amber-700 border-amber-200",
    },

    {
        value: "INACTIVE",
        label:
            "Inactive",
        color:
            "bg-zinc-100 text-zinc-700 border-zinc-200",
    },
];

const VEHICLES = [
    "MOTOR",
    "MOBIL",
    "TRUCK",
];

export default function EditDriverModal({
    open,
    onClose,
    driver,
}) {
    const [loading, setLoading] =
        useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        status: "ACTIVE",

        vehicleType: "MOTOR",

        licenseNumber: "",
        identityNumber: "",

        isOnline: false,
        isVerified: false,

        totalDeliveries: 0,
    });

    useEffect(() => {
        if (driver) {
            setForm({
                name: driver.name || "",
                email: driver.email || "",
                phone: driver.phone || "",

                status:
                    driver.status || "ACTIVE",

                vehicleType:
                    driver.driverProfile
                        ?.vehicleType || "MOTOR",

                licenseNumber:
                    driver.driverProfile
                        ?.licenseNumber || "",

                identityNumber:
                    driver.driverProfile
                        ?.identityNumber || "",

                isOnline:
                    driver.driverProfile
                        ?.isOnline || false,

                isVerified:
                    driver.driverProfile
                        ?.isVerified || false,

                totalDeliveries:
                    driver.driverProfile
                        ?.totalDeliveries || 0,
            });
        }
    }, [driver]);

    const handleChange = (e) => {
        const {
            name,
            value,
            type,
            checked,
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
                `/api/admin/drivers/${driver.id}`,
                {
                    method: "PUT",

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
                    "Gagal update driver"
                );

                return;
            }

            toast.success(
                data.message ||
                "Driver berhasil diperbarui"
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

    if (!open || !driver) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="
          fixed inset-0 z-[999]
          bg-black/50 backdrop-blur-sm
          flex items-center justify-center
          p-4
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
            w-full max-w-4xl
            rounded-2xl
            bg-white
            shadow-[0_25px_80px_rgba(0,0,0,0.15)]
            overflow-hidden
          "
                >
                    {/* HEADER */}
                    <div
                        className="
              px-7 py-5
              border-b border-zinc-100
              flex items-center justify-between
            "
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="
                  w-14 h-14 rounded-xl
                  bg-black text-white
                  flex items-center justify-center
                  text-xl font-black
                "
                            >
                                {form.name
                                    ?.charAt(0)
                                    ?.toUpperCase()}
                            </div>

                            <div>
                                <h2 className="text-2xl font-black tracking-tight text-zinc-900">
                                    Edit Data Driver
                                </h2>

                                <p className="text-sm text-zinc-500 mt-1">
                                    Update informasi driver
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="
                w-11 h-11 rounded-xl
                hover:bg-zinc-100
                transition-all
                flex items-center justify-center
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
                        {/* INPUTS */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {/* NAME */}
                            <InputField
                                icon={User}
                                label="Nama Driver"
                            >
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </InputField>

                            {/* EMAIL */}
                            <InputField
                                icon={Mail}
                                label="Email"
                            >
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </InputField>

                            {/* PHONE */}
                            <InputField
                                icon={Phone}
                                label="Telepon"
                            >
                                <input
                                    type="text"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </InputField>

                            {/* VEHICLE */}
                            <InputField
                                icon={Truck}
                                label="Armada"
                            >
                                <select
                                    name="vehicleType"
                                    value={form.vehicleType}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    {VEHICLES.map((item) => (
                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </InputField>

                            {/* LICENSE */}
                            <InputField
                                icon={FileText}
                                label="Nomor SIM"
                            >
                                <input
                                    type="text"
                                    name="licenseNumber"
                                    value={
                                        form.licenseNumber
                                    }
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </InputField>

                            {/* IDENTITY */}
                            <InputField
                                icon={BadgeCheck}
                                label="Nomor Identitas"
                            >
                                <input
                                    type="text"
                                    name="identityNumber"
                                    value={
                                        form.identityNumber
                                    }
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </InputField>

                        </div>

                        {/* STATUS */}
                        <div>
                            <p className="text-sm font-bold text-zinc-700 mb-3">
                                Status Akun
                            </p>

                            <div className="flex gap-3">
                                {STATUS_OPTIONS.map(
                                    (status) => {
                                        const active =
                                            form.status ===
                                            status.value;

                                        return (
                                            <button
                                                key={status.value}
                                                type="button"
                                                onClick={() =>
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        status:
                                                            status.value,
                                                    }))
                                                }
                                                className={`
                          flex-1 rounded-xl border px-4 py-4 transition-all
                          ${active
                                                        ? status.color
                                                        : "border-zinc-200 bg-white text-zinc-500"
                                                    }
                        `}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-bold text-sm">
                                                        {status.label}
                                                    </span>

                                                    {active && (
                                                        <Check size={16} />
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    }
                                )}
                            </div>
                        </div>

                        {/* TOGGLE */}
                        <div className="grid grid-cols-2 gap-4">
                            <ModernSwitch
                                title="Driver Online"
                                desc="Status realtime"
                                icon={Activity}
                                active={form.isOnline}
                                onClick={() =>
                                    setForm((prev) => ({
                                        ...prev,
                                        isOnline:
                                            !prev.isOnline,
                                    }))
                                }
                                activeStyle="emerald"
                            />

                            <ModernSwitch
                                title="Driver Verified"
                                desc="Verifikasi akun"
                                icon={ShieldCheck}
                                active={form.isVerified}
                                onClick={() =>
                                    setForm((prev) => ({
                                        ...prev,
                                        isVerified:
                                            !prev.isVerified,
                                    }))
                                }
                                activeStyle="sky"
                            />
                        </div>

                        {/* FOOTER */}
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="
                  h-12 px-5 rounded-xl
                  border border-zinc-200
                  font-semibold text-zinc-700
                  hover:bg-zinc-100
                  transition-all
                "
                            >
                                Batal
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="
                  h-12 px-6 rounded-xl
                  bg-black text-white
                  font-bold
                  flex items-center gap-2
                  hover:scale-[1.02]
                  transition-all
                  disabled:opacity-50
                "
                            >
                                <Save size={17} />

                                {loading
                                    ? "Menyimpan..."
                                    : "Simpan"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

/* ===================================================== */

const inputClass = `
  w-full h-12 rounded-xl
  border border-zinc-200
  bg-zinc-50
  px-4
  text-sm
  outline-none
  transition-all
  focus:border-black
  focus:bg-white
`;

function InputField({
    label,
    icon: Icon,
    children,
}) {
    return (
        <div>
            <label className="text-sm font-bold text-zinc-700 mb-2 flex items-center gap-2">
                <Icon
                    size={15}
                    className="text-zinc-400"
                />

                {label}
            </label>

            {children}
        </div>
    );
}

function ModernSwitch({
    title,
    desc,
    icon: Icon,
    active,
    onClick,
    activeStyle,
}) {
    const styles = {
        emerald:
            "bg-gray-800 border-gray-500",
        sky: "bg-gray-800 border-gray-500",
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className="
        flex items-center justify-between
        rounded-2xl border border-zinc-200
        bg-zinc-50 p-4
        transition-all
        hover:bg-white
      "
        >
            <div className="flex items-center gap-3">
                <div
                    className="
            w-11 h-11 rounded-xl
            bg-white border border-zinc-200
            flex items-center justify-center
          "
                >
                    <Icon
                        size={18}
                        className="text-zinc-700"
                    />
                </div>

                <div className="text-left">
                    <h4 className="font-bold text-sm text-zinc-900">
                        {title}
                    </h4>

                    <p className="text-xs text-zinc-500 mt-1">
                        {desc}
                    </p>
                </div>
            </div>

            {/* SWITCH */}
            <div
                className={`
          relative w-14 h-8 rounded-full border transition-all
          ${active
                        ? styles[activeStyle]
                        : "bg-zinc-200 border-zinc-200"
                    }
        `}
            >
                <div
                    className={`
            absolute top-1 w-6 h-6 rounded-full bg-white shadow-sm transition-all
            ${active
                            ? "translate-x-6"
                            : "translate-x-1"
                        }
          `}
                />
            </div>
        </button>
    );
}