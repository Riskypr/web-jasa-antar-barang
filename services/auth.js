// Utility functions untuk authentication

// Check jika user sudah login
export const isUserLoggedIn = () => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('token');
  }
  return false;
};

// Get current user
export const getCurrentUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");

    if (!user || user === "undefined") return null; 

    try {
      return JSON.parse(user);
    } catch (err) {
      console.error("Invalid user data in localStorage:", user);
      return null;
    }
  }
  return null;
};

// Get token
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Logout user
export const logoutUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Login user
export const loginUser = (user, token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }
};

// Check jika token valid (expired atau tidak)
export const isTokenValid = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return !!token;
  }
  return false;
};

// Format user display
export const formatUserName = (user) => {
  if (!user) return 'Guest';
  return user.name || user.email || 'User';
};
