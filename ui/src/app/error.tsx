'use client'; // Error components must be Client Components

import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error.message);
  }, [error]);

  const router = useRouter();

  return (
    <main>
      <header className='pr-12 pl-12 pt-6 pb-6'>
        <Header />
      </header>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>Error</h1>
        <p className='text-lg text-gray-500'>{error.message}</p>
        <div>
          <button>Login</button>
          <button>Sign Up</button>
        </div>
      </div>
    </main>
  );
}
