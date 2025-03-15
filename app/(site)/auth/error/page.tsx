// app/auth/error/page.tsx
"use client";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  console.log(`error from the error page: ${error}`)
  
  let errorMessage = 'An error occurred';
  
  // Map error codes to user-friendly messages
  switch (error) {
    case 'CredentialsSignin':
      errorMessage = 'Invalid email or password';
      break;
    // Add other error cases as needed
  }

  
  
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold text-red-600 mb-4">Authentication Error</h1>
      <p className="mb-4">{errorMessage}</p>
      <Link 
        href="/auth/signin"
        className="block w-full text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Back to Sign In
      </Link>
    </div>
  );
}