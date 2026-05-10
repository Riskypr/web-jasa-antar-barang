"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, ChevronRight } from "lucide-react";

// Local Imports
import { menuItems } from "./menuItems";
import { getCurrentUser, logoutUser } from "@/services/auth";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    setAdmin(user);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    window.location.href = "/login";
  };

  return (
    <aside className="hidden lg:flex flex-col w-[290px] h-screen sticky top-0 bg-white/80 backdrop-blur-xl border-r border-gray-200/60 px-6 py-7">
      
      {/* LOGO SECTION */}
      <div className="flex items-center gap-4 pb-8 border-b border-gray-100">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg bg-white">
          <img src="/truck.png" alt="logo" className="w-7 h-7 object-contain" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900">JaBarin</h1>
          <p className="text-xs text-gray-400 font-medium">Admin Dashboard</p>
        </div>
      </div>

      {/* NAVIGATION MENU */}
      <nav className="flex-1 mt-8 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = pathname === `/admin${item.href}`;

          return (
            <Link key={item.href} href={`/admin${item.href}`}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300
                  ${isActive 
                    ? "bg-black text-white shadow-xl shadow-black/10" 
                    : "text-gray-500 hover:bg-gray-100 hover:text-black"}
                `}
              >
                <item.icon size={20} />
                <span className="text-sm font-semibold">{item.label}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeSidebar"
                    className="absolute inset-0 rounded-2xl border border-white/10"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* PROFILE & LOGOUT SECTION */}
      <div className="mt-auto rounded-[32px] p-5 bg-gradient-to-br from-black to-gray-800 text-white shadow-2xl">
        <Link href="/admin/profile">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between gap-3 cursor-pointer rounded-2xl p-2 hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* AVATAR */}
              <div className="w-11 h-11 rounded-xl bg-white/10 flex shrink-0 items-center justify-center text-lg font-bold uppercase">
                {admin?.name?.charAt(0) || "A"}
              </div>

              {/* USER INFO */}
              <div className="min-w-0 flex-1">
                <p className="font-bold truncate text-sm">
                  {admin?.name || "Admin"}
                </p>
                <p className="text-[10px] text-gray-400 truncate opacity-80">
                  {admin?.email || "admin@jabarin.com"}
                </p>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-500 shrink-0" />
          </motion.div>
        </Link>

        <button
          onClick={handleLogout}
          className="mt-4 w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-white/10 hover:bg-red-500/20 hover:text-red-400 transition-all group"
        >
          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
}