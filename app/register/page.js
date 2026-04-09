'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { User, Mail, Phone, Lock, Eye, EyeOff, Truck } from '@/components/icons';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { success, error } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (formData.password.length < 6) {
      return 'Kata sandi minimal 6 karakter';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Kata sandi tidak cocok';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      error(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Email sudah terdaftar');
      }

      success('Pendaftaran berhasil! 🎉');

      setTimeout(() => {
        router.push('/login?registered=true');
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
              <img src="/truck.png" alt="Logo" className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white">JaBarin</h1>
            <p className="text-gray-400 text-sm">
              Daftar akun baru
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NAME */}
            <div>
              <label className="text-sm text-gray-300">Nama Lengkap</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama lengkap"
                  className="w-full pl-10 pr-3 py-2 bg-white/10 text-white border border-white/10 rounded-lg focus:ring-2 focus:ring-white outline-none"
                />
              </div>
            </div>

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

            {/* PHONE */}
            <div>
              <label className="text-sm text-gray-300">Nomor Telepon</label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nomor telepon"
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
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-10 pr-10 py-2 bg-white/10 text-white border border-white/10 rounded-lg focus:ring-2 focus:ring-white outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-sm text-gray-300">Konfirmasi Kata Sandi</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Ulangi password"
                  className="w-full pl-10 pr-10 py-2 bg-white/10 text-white border border-white/10 rounded-lg focus:ring-2 focus:ring-white outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? 'Mendaftar...' : 'Daftar'}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-white font-semibold hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}