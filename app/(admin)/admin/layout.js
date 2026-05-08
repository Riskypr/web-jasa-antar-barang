"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import {
  LayoutDashboard,
  Users,
  Truck,
  ShoppingCart,
  BarChart3,
  History,
  Bell,
  Search,
  LogOut,
  Menu,
} from "lucide-react";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Users,
    label: "Pelanggan",
    href: "/users",
  },
  {
    icon: Truck,
    label: "Driver",
    href: "/drivers",
  },
  {
    icon: ShoppingCart,
    label: "Orderan",
    href: "/orders",
  },
  {
    icon: BarChart3,
    label: "Keuangan",
    href: "/reports",
  },
  {
    icon: History,
    label: "Aktivitas",
    href: "/activities",
  },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-gray-900">
      <div className="flex">

        {/* SIDEBAR */}
        <aside
          className="
            hidden lg:flex flex-col
            w-[290px] h-screen sticky top-0
            bg-white/80 backdrop-blur-xl
            border-r border-gray-200/60
            px-6 py-7
          "
        >
          {/* LOGO */}
          <div className="flex items-center gap-4 pb-8 border-b border-gray-100">
            <div
              className="
                w-14 h-14 rounded-2xl
                bg-gradient-to-br from-black to-gray-700
                flex items-center justify-center
                shadow-lg
              "
            >
              <img
                src="/truck.png"
                alt="logo"
                className="w-7 h-7 object-contain"
              />
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight">
                JaBarin
              </h1>

              <p className="text-xs text-gray-400 font-medium">
                Admin Dashboard
              </p>
            </div>
          </div>

          {/* MENU */}
          <nav className="flex-1 mt-8 space-y-3">
            {menuItems.map((item, index) => {
              const isActive = pathname.includes(item.href);

              return (
                <Link
                  key={item.href}
                  href={`/admin${item.href}`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    whileHover={{
                      x: 6,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className={`
                      group relative overflow-hidden
                      flex items-center gap-4
                      px-5 py-4 rounded-2xl
                      transition-all duration-300
                      ${
                        isActive
                          ? `
                            bg-black text-white
                            shadow-xl shadow-black/10
                          `
                          : `
                            text-gray-500
                            hover:bg-gray-100
                            hover:text-black
                          `
                      }
                    `}
                  >
                    <item.icon size={20} />

                    <span className="text-sm font-semibold">
                      {item.label}
                    </span>

                    {isActive && (
                      <motion.div
                        layoutId="activeSidebar"
                        className="
                          absolute inset-0
                          border border-white/10
                          rounded-2xl
                        "
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* PROFILE */}
          <div
            className="
              mt-auto
              bg-gradient-to-br from-black to-gray-800
              rounded-3xl p-5 text-white
              shadow-2xl
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  w-12 h-12 rounded-2xl
                  bg-white/10
                  flex items-center justify-center
                  text-lg font-bold
                "
              >
                A
              </div>

              <div>
                <p className="font-bold">
                  Admin JaBarin
                </p>

                <p className="text-xs text-gray-400">
                  Super Administrator
                </p>
              </div>
            </div>

            <button
              className="
                mt-5 w-full
                flex items-center justify-center gap-3
                py-3 rounded-2xl
                bg-white/10 hover:bg-white/20
                transition
              "
            >
              <LogOut size={18} />

              <span className="text-sm font-semibold">
                Logout
              </span>
            </button>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="flex-1 min-w-0">

          {/* TOPBAR */}
          <header
            className="
              sticky top-0 z-30
              backdrop-blur-xl bg-[#F4F7FB]/70
              border-b border-gray-200/60
            "
          >
            <div
              className="
                px-4 md:px-8 py-5
                flex items-center justify-between gap-5
              "
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <button
                  className="
                    lg:hidden
                    w-11 h-11 rounded-2xl
                    bg-white border border-gray-200
                    flex items-center justify-center
                  "
                >
                  <Menu size={18} />
                </button>

                <div>
                  <h2 className="text-2xl font-black tracking-tight">
                    Dashboard
                  </h2>

                  <p className="text-sm text-gray-400">
                    Monitoring seluruh sistem JaBarin
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">

                {/* SEARCH */}
                <div
                  className="
                    hidden md:flex
                    items-center gap-3
                    bg-white border border-gray-200
                    rounded-2xl px-4 py-3
                    min-w-[260px]
                  "
                >
                  <Search
                    size={18}
                    className="text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Cari sesuatu..."
                    className="
                      bg-transparent outline-none
                      text-sm w-full
                    "
                  />
                </div>

                {/* NOTIFICATION */}
                <button
                  className="
                    relative
                    w-12 h-12 rounded-2xl
                    bg-white border border-gray-200
                    flex items-center justify-center
                  "
                >
                  <Bell size={18} />

                  <span
                    className="
                      absolute top-2 right-2
                      w-2.5 h-2.5 rounded-full
                      bg-red-500
                    "
                  />
                </button>
              </div>
            </div>
          </header>

          {/* PAGE */}
          <main className="p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}