'use client';

import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ErrorMessage } from '@/components/shared/ErrorMessage';

export default function RegisterPage() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  const registerWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: userName });
      await sendEmailVerification(userCredential.user);
      setSuccessMsg('Registration successful! Please check your email to verify your account before logging in.');
      // Optional: sign out the user immediately so they can't access authenticated routes until verified
      await auth.signOut();
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold mb-4">Register</h2>
          
          <ErrorMessage message={error} />
          {successMsg && <div className="alert alert-success text-sm">{successMsg}</div>}

          <form onSubmit={registerWithEmail} className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <input 
                type="text" 
                placeholder="Username" 
                className="input input-bordered w-full" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
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
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input 
                type="password" 
                placeholder="********" 
                className="input input-bordered w-full" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-6 w-full">
              <button className="btn btn-primary w-full" type="submit" disabled={loading}>
                {loading ? <span className="loading loading-spinner" /> : 'Sign up'}
              </button>
            </div>
          </form>

          <div className="divider">OR</div>

          <div className="text-center">
            <Link href="/login" className="link link-hover text-sm">Already a user? Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
