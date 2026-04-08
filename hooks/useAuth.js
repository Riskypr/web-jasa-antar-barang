import { useEffect, useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    // 🔥 ambil user dari API (lebih valid)
    fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
        } else {
          localStorage.clear();
        }
      })
      .catch(() => {
        localStorage.clear();
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout,
  };
}