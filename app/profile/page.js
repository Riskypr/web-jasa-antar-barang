'use client';

import { useEffect, useState } from 'react';
import { User } from '@/components/icons';
import { useToast } from '@/hooks/useToast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getCurrentUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { Save } from '@/components/icons';

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [passwordData, setPasswordData] = useState({
        password: '',
        confirmPassword: '',
    });

    const { success, error } = useToast();

    //  ambil data user
    const router = useRouter();

    useEffect(() => {
        const currentUser = getCurrentUser();

        if (!currentUser) {
            router.push("/login"); // 🔐 proteksi halaman
            return;
        }

        setUser(currentUser);
        setFormData({
            name: currentUser.name || '',
            email: currentUser.email || '',
            phone: currentUser.phone || '',
        });

        setLoading(false);
    }, []);

    //  handle input profile
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // update profile
    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const res = await fetch('/api/auth/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Gagal update profile');

            // update local user
            setUser(formData);
            localStorage.setItem("user", JSON.stringify(formData));
            window.dispatchEvent(new Event("userChanged"));

            success('Profil berhasil diperbarui');

        } catch (err) {
            error(err.message);
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (passwordData.password.length < 6) {
            return error('Password minimal 6 karakter');
        }

        if (passwordData.password !== passwordData.confirmPassword) {
            return error('Konfirmasi password tidak cocok');
        }

        try {
            const token = localStorage.getItem('token');

            const res = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    password: passwordData.password,
                }),
            });

            if (!res.ok) throw new Error('Gagal mengganti password');

            success('Password berhasil diubah');

            setPasswordData({
                password: '',
                confirmPassword: '',
            });

        } catch (err) {
            error(err.message);
        }
    };

    if (loading) return <p className="text-center mt-20">Loading...</p>;

    return (
        <main className="flex flex-col min-h-screen bg-gray-50">

            <Navbar />

            {/* 🔥 CONTENT */}
            <div className="flex-1 w-full">
                <div className="max-w-5xl mx-auto space-y-6 py-10 px-4 mt-20">

                    {/* 🔥 HEADER */}
                    <div className="bg-gray-200 p-6 rounded-xl flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gray-900 text-white flex items-center justify-center text-xl font-bold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {user?.name}
                            </h2>
                            <p className="text-gray-500 text-sm truncate">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    {/* 🔥 GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

                        {/* INFORMASI PRIBADI */}
                        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 border-l-4 border-black pl-2">
                                Informasi Pribadi
                            </h3>

                            <form onSubmit={handleUpdateProfile}>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                                    <div>
                                        <label className="text-sm text-gray-600">Nama</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full mt-1 px-4 py-2 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-black"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-600">Nomor Telepon</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone || ''}
                                            onChange={handleChange}
                                            className="w-full mt-1 px-4 py-2 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-black"
                                        />
                                    </div>

                                </div>

                                <div className='mb-10'>
                                    <label className="text-sm text-gray-600">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full mt-1 px-4 py-2 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-3 rounded-full hover:opacity-90"
                                    >
                                        <Save size={18} />
                                        Simpan Profil
                                    </button>

                            </form>
                        </div>

                        {/* ACCOUNT */}
                        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow">
                            <h3 className="text-lg font-semibold mb-4 border-l-4 border-black pl-2 flex items-center gap-2">
                                Pengaturan Akun
                            </h3>

                            <form onSubmit={handleChangePassword}>
                                <div className="mb-10 space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-600">Password Baru</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={passwordData.password}
                                            onChange={handlePasswordChange}
                                            className="w-full mt-1 px-4 py-2 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-black"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-600">Konfirmasi Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full mt-1 px-4 py-2 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-black"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-3 rounded-full hover:opacity-90"
                                >
                                    <Save size={18} />
                                    Simpan Password
                                </button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>

            {/* 🔥 FOOTER */}
            <Footer />

        </main>
    );
}