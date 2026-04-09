import jwt from "jsonwebtoken";

export function getUserFromRequest(req) {
  const cookie = req.headers.get("cookie");

  if (!cookie) return null;

  const token = cookie
    .split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];

  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error("JWT Error:", err.message);
    return null;
  }
}