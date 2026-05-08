'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RegisterFormClient() {
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
        
    if (name === 'phone') {
      // Regex /[^\d]/g akan menghapus semua karakter yang BUKAN angka
      const onlyNums = value.replace(/[^\d]/g, '');
      setFormData((prev) => ({ ...prev, [name]: onlyNums }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (formData.password.length < 6) return 'Kata sandi minimal 6 karakter';
    if (formData.password !== formData.confirmPassword) return 'Kata sandi tidak cocok';
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
      setTimeout(() => router.push('/login?registered=true'), 1500);
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
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="show"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* NAME */}
      <motion.div variants={itemVariants}>
        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1 mb-1.5 block">Nama Lengkap</label>
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={16} />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="w-full pl-11 pr-4 py-3 bg-white/5 text-white border border-white/5 rounded-2xl focus:ring-1 focus:ring-white/20 focus:bg-white/10 outline-none transition-all text-sm"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* EMAIL */}
        <motion.div variants={itemVariants}>
          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1 mb-1.5 block">Email</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={16} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="user@mail.com"
              className="w-full pl-11 pr-4 py-3 bg-white/5 text-white border border-white/5 rounded-2xl focus:ring-1 focus:ring-white/20 focus:bg-white/10 outline-none transition-all text-sm"
            />
          </div>
        </motion.div>

        {/* PHONE */}
        <motion.div variants={itemVariants}>
          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1 mb-1.5 block">Telepon</label>
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={16} />
            <input
              type="text" // Gunakan text agar replace logic di atas berjalan mulus
              inputMode="numeric" // Memunculkan keyboard angka di HP
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="0812..."
              className="w-full pl-11 pr-4 py-3 bg-white/5 text-white border border-white/5 rounded-2xl focus:ring-1 focus:ring-white/20 focus:bg-white/10 outline-none transition-all text-sm"
            />
          </div>
        </motion.div>
      </div>

      {/* PASSWORD */}
      <motion.div variants={itemVariants}>
        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1 mb-1.5 block">Kata Sandi</label>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={16} />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full pl-11 pr-12 py-3 bg-white/5 text-white border border-white/5 rounded-2xl focus:ring-1 focus:ring-white/20 focus:bg-white/10 outline-none transition-all text-sm"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors">
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </motion.div>

      {/* CONFIRM PASSWORD */}
      <motion.div variants={itemVariants}>
        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1 mb-1.5 block">Konfirmasi Sandi</label>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={16} />
          <input
            type={showConfirm ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full pl-11 pr-12 py-3 bg-white/5 text-white border border-white/5 rounded-2xl focus:ring-1 focus:ring-white/20 focus:bg-white/10 outline-none transition-all text-sm"
          />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors">
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </motion.div>

      {/* SUBMIT BUTTON */}
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full group bg-white text-black font-black uppercase text-[11px] tracking-[0.2em] py-4 rounded-2xl transition disabled:opacity-70 mt-4 flex items-center justify-center gap-2 shadow-lg shadow-white/5"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : (
          <>
            Buat Akun Sekarang
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </motion.button>

      {/* FOOTER */}
      <motion.p variants={itemVariants} className="text-center text-xs text-gray-500 pt-4">
        Sudah memiliki akun?{' '}
        <Link href="/login" className="text-white font-bold hover:text-gray-300 transition-colors">
          Masuk di sini
        </Link>
      </motion.p>
    </motion.form>
  );
}