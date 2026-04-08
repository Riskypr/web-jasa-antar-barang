'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { Mail, Lock, Eye, EyeOff, Truck } from '@/components/icons';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { success, error } = useToast();

  useEffect(() => {
    const registered = searchParams.get('registered');

    if (registered) {
      success('Pendaftaran berhasil, silakan login!');
      router.replace('/login'); 
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Email atau password salah');

      const data = await response.json();

      // localStorage.setItem('token', data.token);
      document.cookie = `token=${data.token}; path=/`;
      localStorage.setItem('user', JSON.stringify(data.user));

      window.dispatchEvent(new Event("userChanged"));

      success('Login berhasil!');

      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err) {
      error(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      {/* BACKGROUND EFFECT */}
      <div className="absolute w-[500px] h-[500px] bg-gray-800 rounded-full blur-3xl opacity-30 top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-gray-700 rounded-full blur-3xl opacity-20 bottom-[-100px] right-[-100px]" />

      <div className="relative w-full max-w-md px-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">

          {/* LOGO */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-white text-black p-3 rounded-full mb-3">
              <Truck size={28} />
            </div>
            <h1 className="text-2xl font-bold text-white">JaBarin</h1>
            <p className="text-gray-400 text-sm">
              Jasa Antar Barang Cepat & Aman
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan email"
                  className="w-full pl-10 pr-3 py-2 bg-white/10 text-white border border-white/10 rounded-lg focus:ring-2 focus:ring-white outline-none"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-300">Kata Sandi</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan password"
                  className="w-full pl-10 pr-10 py-2 bg-white/10 text-white border border-white/10 rounded-lg focus:ring-2 focus:ring-white outline-none"
                />

                {/* SHOW PASSWORD */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Belum punya akun?{' '}
            <Link href="/register" className="text-white font-semibold hover:underline">
              Daftar
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-xs text-gray-500 hover:text-gray-300">
              ← Kembali ke beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}