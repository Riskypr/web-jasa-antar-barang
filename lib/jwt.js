import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret123';

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
};