'use client';

import React, { useState } from 'react';
import { sendSignInLinkToEmail, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '@/config/firebase';
import Link from 'next/link';
import { ErrorMessage } from '@/components/shared/ErrorMessage';

export default function LoginEmailLinkPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Check if the user is already registered
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      
      if (signInMethods.length === 0) {
        setError('No account found with this email. Please register first.');
        setLoading(false);
        return;
      }

      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: window.location.origin + '/finish-sign-up',
        // This must be true.
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', email);
      setSuccess('A magic link has been sent to your email! Please check your inbox and click the link to sign in.');
    } catch (err: any) {
      setError(err.message || 'Failed to send magic link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold mb-4">Sign in with Email Link</h2>
          
          <ErrorMessage message={error} />
          {success && <div className="alert alert-success text-sm">{success}</div>}

          {!success && (
            <form onSubmit={sendMagicLink} className="space-y-4">
              <p className="text-sm text-gray-500 mb-4 text-center">
                Enter your email address and we will send you a magic link to sign in instantly without a password.
              </p>
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
              <div className="form-control mt-6 w-full">
                <button className="btn btn-primary w-full" type="submit" disabled={loading}>
                  {loading ? <span className="loading loading-spinner" /> : 'Send Magic Link'}
                </button>
              </div>
            </form>
          )}

          <div className="divider"></div>

          <div className="text-center mt-2 flex flex-col gap-2">
            <Link href="/login" className="btn btn-outline w-full">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
