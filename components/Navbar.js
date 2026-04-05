import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from '@/components/icons';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white shadow" style={{ zIndex: 9999 }}>
      <div className="flex items-center gap-3">
        <img
          src="/truck.png"
          alt="JasDar Logo"
          className="w-8 h-8"
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-gray-800 p-0 m-0">
            JaBarin
          </h1>
          <p className="text-[10px] sm:text-xs font-normal text-gray-500 -mt-1.5 m-0">
            Jasa Antar Barang
          </p>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/#hero" className="text-gray-700 hover:text-slate-600 font-medium">
          Home
        </Link>
        <Link href="/#features" className="text-gray-700 hover:text-slate-600 font-medium">
          Features
        </Link>
        <Link href="/#services" className="text-gray-700 hover:text-slate-600 font-medium">
          Services
        </Link>
      </div>

      {/* Desktop Auth */}
      <div className="hidden md:flex items-center space-x-4">
        <Link href="/login" className="text-gray-700 hover:text-slate-600 font-medium">
          Masuk
        </Link>
        <Link href="/register" className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-slate-700 font-medium">
          Daftar
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center space-x-4">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-slate-600">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <Link href="/#hero" className="text-gray-700 hover:text-slate-600 font-medium" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/#features" className="text-gray-700 hover:text-slate-600 font-medium" onClick={() => setIsOpen(false)}>
              Features
            </Link>
            <Link href="/#services" className="text-gray-700 hover:text-slate-600 font-medium" onClick={() => setIsOpen(false)}>
              Services
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-slate-600 font-medium" onClick={() => setIsOpen(false)}>
              Masuk
            </Link>
            <Link href="/register" className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-slate-700 font-medium text-center" onClick={() => setIsOpen(false)}>
              Daftar
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}