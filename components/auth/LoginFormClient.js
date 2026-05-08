'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'; // Menggunakan lucide untuk konsistensi modern
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function LoginFormClient() {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
  }, [searchParams, router, success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Email atau password salah');

      const data = await response.json();
      document.cookie = `token=${data.token}; path=/; Secure; SameSite=None`;
      localStorage.setItem('user', JSON.stringify(data.user));

      window.dispatchEvent(new Event('userChanged'));
      success('Selamat datang kembali!');

      setTimeout(() => router.push('/'), 1200);
    } catch (err) {
      error(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.form 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      onSubmit={handleSubmit} 
      className="space-y-5"
    >
      {/* EMAIL */}
      <motion.div variants={itemVariants}>
        <label className="text-[11px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-2 block">
          Alamat Email
        </label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={18} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="nama@email.com"
            className="w-full pl-12 pr-4 py-3.5 bg-white/5 text-white border border-white/5 rounded-2xl focus:ring-1 focus:ring-white/20 focus:bg-white/10 outline-none transition-all placeholder:text-gray-700"
          />
        </div>
      </motion.div>

      {/* PASSWORD */}
      <motion.div variants={itemVariants}>
        <div className="flex justify-between items-center ml-1 mb-2">
          <label className="text-[11px] uppercase tracking-widest text-gray-500 font-bold block">
            Kata Sandi
          </label>
          <Link href="/forgot-password" size={18} className="text-[10px] text-gray-600 hover:text-white uppercase tracking-tighter">Lupa Sandi?</Link>
        </div>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={18} />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full pl-12 pr-12 py-3.5 bg-white/5 text-white border border-white/5 rounded-2xl focus:ring-1 focus:ring-white/20 focus:bg-white/10 outline-none transition-all placeholder:text-gray-700"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </motion.div>

      {/* SUBMIT BUTTON */}
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full relative overflow-hidden group bg-white text-black font-black uppercase text-xs tracking-[0.2em] py-4 rounded-2xl transition disabled:opacity-70"
      >
        <span className="flex items-center justify-center gap-2">
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              Masuk Sekarang
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </span>
      </motion.button>

      {/* FOOTER LINKS */} 
      <motion.div variants={itemVariants} className="pt-4 flex flex-col items-center gap-6">
        <p className="text-sm text-gray-500">
          Belum punya akun?{' '}
          <Link href="/register" className="text-white font-bold hover:text-gray-300 transition-colors">
            Buat Akun Baru
          </Link>
        </p>
        
        <Link href="/" className="group flex items-center gap-2 text-[10px] text-gray-600 hover:text-gray-300 uppercase tracking-widest transition-all">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Kembali ke Beranda
        </Link>
      </motion.div>
    </motion.form>
  );
}