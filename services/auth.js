
// Check login (pakai user saja)
export const isUserLoggedIn = () => {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("user");
  }
  return false;
};

//  Get current user
export const getCurrentUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");

    if (!user || user === "undefined") return null;

    try {
      return JSON.parse(user);
    } catch (err) {
      console.error("Invalid user data:", user);
      return null;
    }
  }
  return null;
};

// logout (hapus token dan user)
export const logoutUser = async () => {
  if (typeof window !== "undefined") {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("user");
  }
};

//  Login (hanya simpan user)
export const loginUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

//  Format nama
export const formatUserName = (user) => {
  if (!user) return "Guest";
  return user.name || user.email || "User";
};