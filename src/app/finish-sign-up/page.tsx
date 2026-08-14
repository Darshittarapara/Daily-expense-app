'use client';

import React, { useEffect, useState, useRef } from 'react';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ErrorMessage } from '@/components/shared/ErrorMessage';

export default function FinishSignUpPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [needsEmail, setNeedsEmail] = useState(false);
  const router = useRouter();
  const processedRef = useRef(false);

  useEffect(() => {
    const completeSignIn = async () => {
      // Prevent running twice in React Strict Mode
      if (processedRef.current) return;

      if (isSignInWithEmailLink(auth, window.location.href)) {
        processedRef.current = true;
        
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          setNeedsEmail(true);
          setLoading(false);
          return;
        }
        await processSignIn(email);
      } else {
        setError('Invalid sign-in link.');
        setLoading(false);
      }
    };

    completeSignIn();
  }, [router]);

  const processSignIn = async (emailToSignIn: string) => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithEmailLink(auth, emailToSignIn, window.location.href);
      // Clear email from storage.
      window.localStorage.removeItem('emailForSignIn');
      
      const idToken = await result.user.getIdToken();
      
      // Establish session with Next.js backend
      const response = await fetch('/api/login', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (response.ok) {
        router.push('/');
        router.refresh();
      } else {
        setError('Failed to establish secure session.');
      }
    } catch (err: any) {
      setError(err.message || 'Error signing in with email link.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      processSignIn(emailInput);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold mb-4">Authenticating...</h2>
          
          <ErrorMessage message={error} />

          {loading && !error && !needsEmail && (
            <div className="flex justify-center my-8">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          )}

          {needsEmail && (
             <form onSubmit={handleEmailSubmit} className="space-y-4">
               <div className="alert alert-warning text-sm">
                 Please enter your email to complete the sign-in process. (This happens if you open the link on a different device than the one you requested it from).
               </div>
               <div className="form-control w-full">
                 <label className="label">
                   <span className="label-text">Email</span>
                 </label>
                 <input 
                   type="email" 
                   placeholder="email@example.com" 
                   className="input input-bordered w-full" 
                   value={emailInput}
                   onChange={(e) => setEmailInput(e.target.value)}
                   required
                 />
               </div>
               <div className="form-control mt-6 w-full">
                 <button className="btn btn-primary w-full" type="submit" disabled={loading}>
                   {loading ? <span className="loading loading-spinner" /> : 'Complete Sign In'}
                 </button>
               </div>
             </form>
          )}

          {error && (
            <div className="mt-6 text-center">
              <Link href="/login" className="btn btn-primary w-full">Return to Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
