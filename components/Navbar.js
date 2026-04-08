'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, User, Home, Package, Rocket, LogOut, History } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/services/auth'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef();

  // 🔥 ambil user
  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   if (!token) return;

  //   fetch('/api/auth/me', {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.user) setUser(data.user);
  //     })
  //     .catch(() => {
  //       localStorage.removeItem('token');
  //     });
  // }, []);

//   useEffect(() => {
//   const storedUser = localStorage.getItem("user");

//   if (!storedUser || storedUser === "undefined") return;

//   try {
//     setUser(JSON.parse(storedUser));
//   } catch {
//     localStorage.removeItem("user");
//   }
// }, []);

useEffect(() => {
    const user = getCurrentUser();
    if (user) setUser(user);
  }, []);

  //  klik luar untuk close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // sinkronisasi user 
  useEffect(() => {
    const syncUser = () => {
      const user = getCurrentUser();
      setUser(user);
    };

    syncUser();

    window.addEventListener("userChanged", syncUser);

    return () => {
      window.removeEventListener("userChanged", syncUser);
    };
  }, []);

  //  logout
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);

    window.dispatchEvent(new Event("userChanged"));

    router.push('/login');
  };

  //  helper close mobile
  const closeMobile = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white shadow px-6 py-4 flex justify-between items-center">

      {/* LOGO */}
      <div className="flex items-center gap-3">
        <img src="/truck.png" className="w-8 h-8" />
        <div>
          <h1 className="font-bold text-gray-800">JaBarin</h1>
          <p className="text-xs text-gray-500">Jasa Antar Barang</p>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex gap-6">
        <Link href="/#hero">Home</Link>
        <Link href="/#features">Features</Link>
        <Link href="/#services">Services</Link>
      </div>

      {/* DESKTOP AUTH */}
      <div className="hidden md:flex items-center gap-4 relative">

        {!user ? (
          <>
            <Link href="/login">Masuk</Link>
            <Link href="/register" className="bg-black text-white px-4 py-2 rounded-md">
              Daftar
            </Link>
          </>
        ) : (
          <div className="relative" ref={dropdownRef}>

            {/* AVATAR */}
            <button
              onClick={() => setDropdown(!dropdown)}
              className="w-10 h-10 rounded-full bg-gray-900 text-white font-bold flex items-center justify-center shadow"
            >
              {user.name?.charAt(0).toUpperCase()}
            </button>

            {/* DROPDOWN */}
            {dropdown && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border p-6 animate-fadeIn">

                <div className="mb-3">
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-[12px] text-gray-500 truncate max-w-[200px]">{user.email}</p>
                </div>

                <div className="border-t pt-2 space-y-3 font-medium text-sm  ">
                  <Link href="/profile" className="flex items-center gap-2 hover:text-gray-500">
                    <User size={18} /> Profil
                  </Link>

                  <Link href="/order/history" onClick={closeMobile} className="flex items-center gap-2 my-3 hover:text-gray-500">
                  <History size={18} /> Riwayat Order
                </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[9999]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-[9999] transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 flex flex-col gap-6 font-medium">

          <button onClick={() => setIsOpen(false)} className="self-end bg-black text-white p-2 rounded-xl">
            <X size={24} />
          </button>

          <Link href="/#hero" onClick={closeMobile} className="flex items-center gap-2 px-4 pt-4 text-xl">
            <Home size={20} /> Home
          </Link>
          <Link href="/#features" onClick={closeMobile} className="flex items-center gap-2 px-4 text-xl">
            <Rocket size={20} /> Features
          </Link>
          <Link href="/#services" onClick={closeMobile} className="flex items-center gap-2 px-4 text-xl">
            <Package size={20} />Services
          </Link>

          <div className="border-t pt-4 text-lg absolute bottom-0 left-0 w-full px-6 pb-6">
            {!user ? (
              <>
                <Link href="/login" onClick={closeMobile} className="block px-4 py-2">
                  Masuk
                </Link>
                <Link href="/register" onClick={closeMobile} className="block mt-2 bg-black text-center text-white px-4 py-2 rounded-full">
                  Daftar
                </Link>
              </>
            ) : (
              <>
                {/* <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p> */}

                <Link href="/profile" onClick={closeMobile} className="flex items-center gap-2 my-2 mx-4">
                  <User size={18} /> Profil
                </Link>
                <Link href="/order/history" onClick={closeMobile} className="flex items-center gap-2 my-3 mx-4">
                  <History size={18} /> Riwayat Order
                </Link>

                <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 text-white mt-6 py-2 px-4 w-full rounded-full items-center justify-center">
                  <LogOut size={18} /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}