"use client";

import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminNavbar from "@/components/admin/layout/AdminNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({
  children,
}) {
  return (
    <div className="min-h-screen bg-[#F4F7FB] text-gray-900">
      <div className="flex">

        {/* SIDEBAR */}
        <AdminSidebar />

        {/* CONTENT */}
        <div className="flex-1 min-w-0">

          {/* NAVBAR */}
          <AdminNavbar />

          {/* PAGE */}
          <main className="p-4 md:p-8">
            {children}
          </main>
          
          <ToastContainer
          position="top-right"
          autoClose={2500}
          theme="light"
        />
        </div>
      </div>
    </div>
  );
}