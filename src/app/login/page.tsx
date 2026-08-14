'use client';

import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ErrorMessage } from '@/components/shared/ErrorMessage';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLoginSuccess = async (idToken: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (response.ok) {
        router.push('/');
        router.refresh(); // Refresh to apply middleware state
      } else {
        setError('Failed to establish secure session.');
      }
    } catch (err) {
      setError('An error occurred setting up your session.');
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (!userCredential.user.emailVerified) {
        // Send a new verification email if they haven't verified
        import('firebase/auth').then(({ sendEmailVerification }) => {
           sendEmailVerification(userCredential.user).catch(() => {});
        });
        setError('Your email is not verified. A new verification link has been sent to your inbox. Please check your email.');
        await auth.signOut();
        setLoading(false);
        return;
      }

      const idToken = await userCredential.user.getIdToken();
      await handleLoginSuccess(idToken);
    } catch (err: any) {
      setError(err.message || 'Login failed.');
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();
      await handleLoginSuccess(idToken);
    } catch (err: any) {
      setError(err.message || 'Google Login failed.');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold mb-4">Welcome Back</h2>
          
          <ErrorMessage message={error} />

          <form onSubmit={loginWithEmail} className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="input input-bordered w-full" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input 
                type="password" 
                placeholder="********" 
                className="input input-bordered w-full" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-6 w-full">
              <button className="btn btn-primary w-full" type="submit" disabled={loading}>
                {loading ? <span className="loading loading-spinner" /> : 'Login'}
              </button>
            </div>
          </form>

          <div className="divider">OR</div>

          <button 
            className="btn w-full bg-[#4285F4] hover:bg-[#357abd] text-white border-none flex items-center justify-center gap-2" 
            onClick={loginWithGoogle}
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 bg-white p-0.5 rounded-sm">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            Continue with Google
          </button>
          
          <div className="mt-4 flex flex-col gap-2 text-center text-sm">
             <Link href="/login-email-link" className="btn btn-outline w-full border-gray-300 hover:bg-gray-100 hover:text-black">Sign in with Email Link</Link>
             <Link href="/register" className="link link-hover mt-2">New user? Register Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
