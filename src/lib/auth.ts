import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET = process.env.JWT_SECRET || 'default_secret';

// Hash password
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare passwords
export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

// Generate JWT token
export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, SECRET, { expiresIn: '1h' });
};

// Verify JWT token
export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
