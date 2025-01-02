import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '@/mock/database'; // Import shared database

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Find the user
    const user = users.find((user) => user.email === email);
    if (!user) {
      console.log('User not found:', email); // Debugging log
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isPasswordValid); // Debugging log

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

    console.log('Login successful for:', email); // Debugging log

    // Set token in cookies
    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('token', token, { httpOnly: true, secure: false, maxAge: 3600 });

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
