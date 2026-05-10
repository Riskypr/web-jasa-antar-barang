"use client";

import { useEffect, useState } from "react";

import {
    Camera,
    Mail,
    Phone,
    ShieldCheck,
    Save,
    Lock,
    User2,
    CalendarDays,
    BadgeCheck,
    Eye,
    EyeOff,
} from "lucide-react";

import {
    motion,
    AnimatePresence,
} from "framer-motion";

import { toast } from "react-toastify";

import {
    getCurrentUser,
    loginUser,
} from "@/services/auth";

export default function AdminProfilePage() {
    const [loading, setLoading] =
        useState(false);

    const [user, setUser] =
        useState(null);

    const [showCurrentPassword, setShowCurrentPassword] =
        useState(false);

    const [showNewPassword, setShowNewPassword] =
        useState(false);

    const [form, setForm] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",

        currentPassword: "",
        newPassword: "",
    });

    

    useEffect(() => {
        const currentUser =
            getCurrentUser();

        if (currentUser) {
            setUser(currentUser);

            setForm((prev) => ({
                ...prev,

                id: currentUser.id || "",

                name:
                    currentUser.name || "",

                email:
                    currentUser.email || "",

                phone:
                    currentUser.phone || "",
            }));
        }
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,

            [e.target.name]:
                e.target.value,
        });
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch(
                "/api/admin/profile",
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
                throw new Error(data.message);
            }

            // UPDATE LOCAL STORAGE
            const updatedUser = {
                ...user,

                name: form.name,
                email: form.email,
                phone: form.phone,
            };

            loginUser(updatedUser);

            setUser(updatedUser);

            toast.success(
                "Profil berhasil diperbarui"
            );
        } catch (err) {
            toast.error(
                err.message ||
                "Gagal memperbarui profil"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* HEADER */}
            <motion.div
                initial={{
                    opacity: 0,
                    y: -20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
            >
                <h1 className="text-4xl font-black tracking-tight">
                    Profil Admin
                </h1>

                <p className="text-gray-500 mt-2 text-[15px]">
                    Kelola informasi akun,
                    keamanan, dan identitas
                    admin JaBarin.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-7">
                {/* LEFT SIDEBAR */}
                <motion.div
                    initial={{
                        opacity: 0,
                        x: -20,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        delay: 0.1,
                    }}
                    className="
            relative overflow-hidden
            rounded-3xl
            bg-black text-white
            p-7
            shadow-2xl
          "
                >
                    {/* BG BLUR */}
                    <div
                        className="
              absolute -top-20 -right-20
              w-64 h-64 rounded-full
              bg-white/10 blur-3xl
            "
                    />

                    {/* AVATAR */}
                    <div className="relative z-10">
                        <div className="flex flex-col items-center text-center">
                            <motion.div
                                whileHover={{
                                    scale: 1.05,
                                    rotate: 2,
                                }}
                                className="relative"
                            >
                                <div
                                    className="
                    w-32 h-32 rounded-[38px]
                    bg-white/10
                    border border-white/10
                    backdrop-blur-xl
                    flex items-center justify-center
                    text-5xl font-black
                    shadow-2xl
                  "
                                >
                                    {form.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "A"}
                                </div>

                                <button
                                    className="
                    absolute -bottom-2 -right-2
                    w-12 h-12 rounded-xl
                    bg-white text-black
                    shadow-xl
                    flex items-center justify-center
                    hover:scale-105
                    transition-all
                  "
                                >
                                    <Camera size={18} />
                                </button>
                            </motion.div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={form.name}
                                    initial={{
                                        opacity: 0,
                                        y: 10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    className="mt-6"
                                >
                                    <h2 className="text-3xl font-black break-words">
                                        {form.name ||
                                            "Admin"}
                                    </h2>

                                    <p className="text-sm text-white/60 mt-2 break-all">
                                        {form.email}
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            <div
                                className="
                  mt-5 inline-flex items-center gap-2
                  px-4 py-2 rounded-2xl
                  bg-emerald-500/15
                  border border-emerald-500/20
                  text-emerald-300
                  text-sm font-bold
                "
                            >
                                <ShieldCheck size={16} />

                                Verified Administrator
                            </div>
                        </div>

                        {/* INFO CARDS */}
                        <div className="mt-8 space-y-4">
                            <InfoCard
                                icon={BadgeCheck}
                                title="Role"
                                value={
                                    user?.role ||
                                    "SUPER ADMIN"
                                }
                            />

                            <InfoCard
                                icon={Phone}
                                title="Telepon"
                                value={
                                    form.phone ||
                                    "-"
                                }
                            />

                            <InfoCard
                                icon={CalendarDays}
                                title="Bergabung"
                                value={
                                    user?.createdAt
                                        ? new Date(
                                            user.createdAt
                                        ).toLocaleDateString(
                                            "id-ID",
                                            {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            }
                                        )
                                        : "-"
                                }
                            />
                        </div>
                    </div>
                </motion.div>

                {/* FORM */}
                <motion.form
                    initial={{
                        opacity: 0,
                        x: 20,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        delay: 0.2,
                    }}
                    onSubmit={handleSubmit}
                    className="
            rounded-3xl
            bg-white
            border border-black/5
            shadow-sm
            overflow-hidden
          "
                >
                    {/* TOP */}
                    <div className="p-8 border-b border-black/5">
                        <h2 className="text-2xl font-black">
                            Informasi Akun
                        </h2>

                        <p className="text-gray-500 mt-2 text-sm">
                            Update data profil dan
                            keamanan akun admin.
                        </p>
                    </div>

                    {/* BODY */}
                    <div className="p-8 space-y-8">
                        {/* PERSONAL */}
                        <div>
                            <div className="mb-5">
                                <h3 className="font-black text-lg">
                                    Informasi Personal
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    Informasi dasar akun
                                    admin.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-5">
                                <Input
                                    icon={User2}
                                    label="Nama Lengkap"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Nama lengkap"
                                />

                                <Input
                                    icon={Mail}
                                    label="Email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Email admin"
                                />

                                <Input
                                    icon={Phone}
                                    label="Nomor Telepon"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="08xxxxxxxxxx"
                                />
                            </div>
                        </div>

                        {/* SECURITY */}
                        <div>
                            <div className="mb-5">
                                <h3 className="font-black text-lg">
                                    Keamanan Akun
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    Ubah password akun
                                    admin.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-5">
                                <PasswordInput
                                    label="Password Saat Ini"
                                    name="currentPassword"
                                    value={form.currentPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    show={showCurrentPassword}
                                    setShow={setShowCurrentPassword}
                                />

                                <PasswordInput
                                    label="Password Baru"
                                    name="newPassword"
                                    value={form.newPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    show={showNewPassword}
                                    setShow={setShowNewPassword}
                                />
                            </div>
                        </div>
                        
                    </div>

                    {/* FOOTER */}
                    <div
                        className="
              px-8 py-6
              border-t border-black/5
              bg-zinc-50
              flex justify-end
            "
                    >
                        <motion.button
                            whileHover={{
                                scale: 1.02,
                            }}
                            whileTap={{
                                scale: 0.98,
                            }}
                            type="submit"
                            disabled={loading}
                            className="
                h-14 px-7 rounded-2xl
                bg-black text-white
                font-semibold
                flex items-center gap-3
                shadow-xl
                disabled:opacity-50
              "
                        >
                            <Save size={18} />

                            {loading
                                ? "Menyimpan..."
                                : "Simpan Perubahan"}
                        </motion.button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
}

function InfoCard({
    icon: Icon,
    title,
    value,
}) {
    return (
        <motion.div
            whileHover={{
                y: -2,
            }}
            className="
        rounded-2xl
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        p-4
      "
        >
            <div className="flex items-start gap-4">
                <div
                    className="
            w-11 h-11 rounded-2xl
            bg-white/10
            flex items-center justify-center
            shrink-0
          "
                >
                    <Icon size={18} />
                </div>

                <div className="min-w-0">
                    <p className="text-xs text-white/50 uppercase tracking-wider">
                        {title}
                    </p>

                    <h3 className="font-bold mt-1 break-words">
                        {value}
                    </h3>
                </div>
            </div>
        </motion.div>
    );
}

function Input({
    icon: Icon,
    label,
    ...props
}) {
    return (
        <motion.div
            whileFocus={{
                scale: 1.01,
            }}
        >
            <label className="text-sm font-bold text-gray-700 mb-3 block">
                {label}
            </label>

            <div className="relative">
                {Icon && (
                    <Icon
                        size={18}
                        className="
              absolute left-4 top-1/2
              -translate-y-1/2
              text-gray-400
            "
                    />
                )}

                <input
                    {...props}
                    className="
            w-full h-14 rounded-2xl
            bg-zinc-50
            border border-black/10
            pl-12 pr-4
            outline-none
            transition-all
            focus:border-black
            focus:bg-white
            focus:shadow-lg
          "
                />
            </div>
        </motion.div>
    );
}

function PasswordInput({
  label,
  show,
  setShow,
  ...props
}) {
  return (
    <motion.div
      whileFocus={{
        scale: 1.01,
      }}
    >
      <label className="text-sm font-bold text-gray-700 mb-3 block">
        {label}
      </label>

      <div className="relative">
        <Lock
          size={18}
          className="
            absolute left-4 top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

        <input
          {...props}
          type={show ? "text" : "password"}
          className="
            w-full h-14 rounded-2xl
            bg-zinc-50
            border border-black/10
            pl-12 pr-14
            outline-none
            transition-all
            focus:border-black
            focus:bg-white
            focus:shadow-lg
          "
        />

        <button
          type="button"
          onClick={() =>
            setShow(!show)
          }
          className="
            absolute right-4 top-1/2
            -translate-y-1/2
            text-gray-400 hover:text-black
            transition-all
          "
        >
          {show ? (
            <EyeOff size={19} />
          ) : (
            <Eye size={19} />
          )}
        </button>
      </div>
    </motion.div>
  );
}