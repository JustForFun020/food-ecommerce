'use client'; // Error components must be Client Components

import GlobalError from '@/components/Error/GlobalError';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error.message);
  }, [error]);

  const router = useRouter();

  return <GlobalError error={error} reset={reset} />;
}
