'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Home, Package, Rocket, LogOut, History, ChevronDown } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { getCurrentUser, logoutUser } from '@/services/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef();

  // Efek scroll untuk mengubah tampilan saat di-scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const syncUser = () => {
      const user = getCurrentUser();
      setUser(user);
    };
    syncUser();
    window.addEventListener("userChanged", syncUser);
    return () => window.removeEventListener("userChanged", syncUser);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setDropdown(false);
    window.dispatchEvent(new Event("userChanged"));
    router.push("/login");
  };

  const navLinks = [
    { name: 'Home', href: '/#hero', icon: <Home size={18} /> },
    { name: 'Features', href: '/#features', icon: <Rocket size={18} /> },
    { name: 'Services', href: '/#services', icon: <Package size={18} /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 transition-all duration-300">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`relative flex items-center justify-between w-full max-w-6xl px-6 py-3 transition-all duration-500 border rounded-full ${
          scrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-xl border-white/20 py-2' 
          : 'bg-white shadow-md border-transparent'
        }`}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div whileHover={{ rotate: 10 }} className="p-2 bg-black rounded-lg">
            <img src="/truck.png" className="w-6 h-6 invert" alt="logo" />
          </motion.div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold leading-none text-gray-900 tracking-tight">JaBarin</h1>
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Jasa Antar Barang</p>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-full border border-gray-200/50">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <motion.span
                whileHover={{ backgroundColor: "rgba(255,255,255,1)" }}
                className="px-5 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-black hover:shadow-sm transition-all flex items-center gap-2"
              >
                {link.name}
              </motion.span>
            </Link>
          ))}
        </div>

        {/* DESKTOP AUTH */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link href="/login" className="text-sm font-bold text-gray-700 hover:text-black px-4">
                Masuk
              </Link>
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-gray-200 hover:bg-black transition-all"
                >
                  Daftar
                </motion.button>
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={() => setDropdown(!dropdown)}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 p-1 pr-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-all border border-gray-200"
              >
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold ring-2 ring-white">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <ChevronDown size={14} className={`transition-transform duration-300 ${dropdown ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-50 mb-1">
                      <p className="text-sm font-bold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <DropdownItem icon={<User size={18} />} label="Profil" href="/profile" />
                      <DropdownItem icon={<History size={18} />} label="Riwayat Order" href="/order/history" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-gray-100 rounded-full text-gray-700"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-[70] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="font-bold text-xl">Menu</h2>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 rounded-full"><X size={20}/></button>
              </div>

              <nav className="flex flex-col gap-4 flex-1">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 text-gray-700 font-bold hover:bg-black hover:text-white transition-all"
                  >
                    {link.icon} {link.name}
                  </Link>
                ))}
              </nav>

              <div className="border-t border-gray-100 pt-6">
                {!user ? (
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/login" onClick={() => setIsOpen(false)} className="py-3 text-center font-bold text-gray-600 border border-gray-200 rounded-2xl">Masuk</Link>
                    <Link href="/register" onClick={() => setIsOpen(false)} className="py-3 text-center font-bold bg-black text-white rounded-2xl">Daftar</Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                     <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-4 font-bold text-gray-700"><User size={20}/> Profil</Link>
                     <Link href="/order/history" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-4 font-bold text-gray-700"><History size={20}/> Riwayat Pesanan</Link>
                     <button onClick={handleLogout} className="flex items-center gap-3 w-full p-4 bg-red-50 text-red-500 rounded-2xl font-bold"><LogOut size={20}/> Logout</button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

// Sub-komponen untuk Dropdown Item agar rapi
function DropdownItem({ icon, label, href }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-2xl transition-all">
      {icon} {label}
    </Link>
  );
}