import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { users } from '@/mock/database'; // Import shared database

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Check if the user already exists
    if (users.find((user) => user.email === email)) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user
    users.push({ email, password: hashedPassword });

    console.log('Users after signup:', users); // Debugging log

    return NextResponse.json({ message: 'Signup successful' }, { status: 201 });
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
