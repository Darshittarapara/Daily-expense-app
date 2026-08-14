import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { FirebaseError } from 'firebase/app';

type AsyncFunction<T, Args extends any[]> = (...args: Args) => Promise<T>;

/**
 * A higher-order function that wraps an asynchronous function with error handling.
 * It catches errors, displays a user-friendly message using Sonner, and re-throws the error.
 * 
 * It specifically handles:
 * - Axios errors (for API calls)
 * - Firebase errors (for authentication and database operations)
 * - Generic JavaScript errors
 * 
 * @param fn The asynchronous function to wrap
 * @returns A new function with the same signature that includes error handling
 */
export const withErrorHandler = <T, Args extends any[]>(
  fn: AsyncFunction<T, Args>
): AsyncFunction<T, Args> => {
  return async (...args: Args): Promise<T> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error instanceof AxiosError) {
        // Handle Axios errors (API errors)
        const message = error.response?.data?.message || error.message || 'An API error occurred';
        toast.error(`API Error: ${message}`);
      } else if (error instanceof FirebaseError) {
        // Handle Firebase errors
        let message = 'An unknown Firebase error occurred';
        switch (error.code) {
          case 'auth/user-not-found':
            message = 'User not found.';
            break;
          case 'auth/wrong-password':
            message = 'Incorrect password.';
            break;
          case 'auth/email-already-in-use':
            message = 'Email is already in use.';
            break;
          case 'auth/invalid-credential':
            message = 'Invalid credentials provided.';
            break;
          case 'auth/network-request-failed':
            message = 'Network error. Please check your connection.';
            break;
          case 'auth/too-many-requests':
            message = 'Too many requests. Please try again later.';
            break;
          default:
            // Fallback to Firebase's default error message
            message = error.message || message;
        }
        toast.error(message);
      } else if (error instanceof Error) {
        // Generic Error
        toast.error(`Error: ${error.message}`);
      } else {
        // Unknown error types
        toast.error('An unexpected error occurred');
      }
      
      // Re-throw the error so the caller can still react to it if needed
      throw error;
    }
  };
};
