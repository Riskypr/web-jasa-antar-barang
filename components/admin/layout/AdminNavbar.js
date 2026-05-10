"use client";

import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

export default function AdminNavbar({
  title = "Dashboard",
  description = "Monitoring seluruh sistem JaBarin",
}) {
  return (
    <header
      className="
        sticky top-0 z-30
        backdrop-blur-xl
        bg-[#F4F7FB]/70
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
              {title}
            </h2>

            <p className="text-sm text-gray-400">
              {description}
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
  );
}