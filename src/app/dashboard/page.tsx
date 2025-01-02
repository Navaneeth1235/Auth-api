'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const tokenCookie = document.cookie.split('; ').find((row) => row.startsWith('token='));
    console.log('Cookie:', tokenCookie); // Debugging log

    if (!tokenCookie) {
      alert('You are not logged in. Redirecting to login...');
      router.push('/auth/login');
      return;
    }

    const token = tokenCookie.split('=')[1];
    console.log('Token:', token); // Debugging log

    try {
      const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET || 'default_secret');
      console.log('Decoded Token:', decoded); // Debugging log
      setAuth(true);
    } catch (err) {
      console.error('Invalid or expired token:', err);
      alert('Session expired. Redirecting to login...');
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!auth) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
      <p className="mt-4 text-lg">You are successfully logged in.</p>
      <button
        onClick={() => router.push('/auth/logout')}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
