'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {  Mail, Phone, MapPin, MoveUpRight } from '@/components/icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Layanan: [
      { name: 'Kirim Instan', href: '#' },
      { name: 'Sewa Pickup', href: '#' },
      { name: 'Cek Tarif', href: '#' },
      { name: 'Kemitraan', href: '#' },
    ],
    Perusahaan: [
      { name: 'Tentang Kami', href: '#' },
      { name: 'Syarat & Ketentuan', href: '#' },
      { name: 'Kebijakan Privasi', href: '#' },
      { name: 'Pusat Bantuan', href: '#' },
    ],
  };

  return (
    <footer className="relative bg-gray-950 text-slate-300 pt-20 pb-10 px-2 md:px-14 overflow-hidden">
      {/* Efek Cahaya Dekoratif di Latar Belakang */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* KOLOM 1: BRANDING */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white rounded-xl">
                <img src="/truck.png" className="w-6 h-6" alt="logo" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">JaBarin</h2>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              Solusi pengiriman barang tercepat dan terpercaya dengan teknologi tracking peta real-time. Kirim apa saja, ke mana saja, tanpa ribet.
            </p>
            <div className="flex gap-4">
             {/* GitHub */}
              <a
                href="#"
                className="p-2 rounded-xl text-slate-500 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 008 10.94c.58.1.79-.25.79-.55v-2.15c-3.25.71-3.94-1.57-3.94-1.57-.53-1.34-1.3-1.7-1.3-1.7-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.21 1.8 1.21 1.05 1.8 2.76 1.28 3.43.98.1-.76.41-1.28.75-1.57-2.6-.3-5.34-1.3-5.34-5.8 0-1.28.46-2.33 1.21-3.15-.12-.3-.52-1.5.11-3.13 0 0 .98-.31 3.2 1.2a11.1 11.1 0 015.82 0c2.22-1.51 3.2-1.2 3.2-1.2.63 1.63.23 2.83.11 3.13.75.82 1.21 1.87 1.21 3.15 0 4.51-2.74 5.5-5.35 5.8.42.36.8 1.08.8 2.18v3.23c0 .3.21.65.8.55A11.5 11.5 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
                </svg>
              </a>

              {/* Twitter */}
              <a
                href="#"
                className="p-2 rounded-xl text-slate-500 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M22 5.92c-.77.35-1.6.58-2.47.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.73 1.04 4.28 4.28 0 00-7.3 3.9A12.15 12.15 0 013 4.89a4.28 4.28 0 001.32 5.72 4.26 4.26 0 01-1.94-.54v.05a4.29 4.29 0 003.43 4.2 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004 2.98A8.6 8.6 0 012 19.54 12.13 12.13 0 008.56 21c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.7 8.7 0 0022 5.92z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6 1.11 6 0 4.88 0 3.5 0 2.12 1.11 1 2.49 1c1.38 0 2.49 1.12 2.49 2.5zM.5 8h4v12h-4V8zm7.5 0h3.6v1.64h.05c.5-.95 1.73-1.95 3.55-1.95 3.8 0 4.5 2.5 4.5 5.74V20h-4v-5.7c0-1.36-.03-3.1-1.89-3.1-1.9 0-2.2 1.48-2.2 3V20h-4V8z" />
                </svg>
              </a>
            </div>
          </div>

          {/* KOLOM 2 & 3: LINKS */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-bold mb-6 text-lg">{title}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-sm hover:text-white hover:translate-x-1 transition-all flex items-center gap-1 group"
                    >
                      {link.name}
                      <MoveUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* KOLOM 4: KONTAK */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-white shrink-0" />
                <span>Jl. Logistik No. 123, Jakarta Selatan, Indonesia</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={18} className="text-white shrink-0" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={18} className="text-white shrink-0" />
                <span>support@jabarin.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* GARIS PEMISAH & COPYRIGHT */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} <span className="text-slate-300 font-semibold">JaBarin</span>. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Sub-komponen Social Icon
const SocialIcon = ({ icon }) => (
  <motion.a
    href="#"
    whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,1)", color: "rgba(0,0,0,1)" }}
    className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 transition-colors"
  >
    {icon}
  </motion.a>
);

export default Footer;