export const authConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  cookieName: 'AuthToken',
  cookieSignatureKeys: ['secret1', 'secret2'], // In production, use strong secrets from .env
  cookieSerializeOptions: {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // set this to true on HTTPS
    sameSite: 'lax' as const,
    maxAge: 12 * 60 * 60 * 24, // twelve days
  },
  serviceAccount: {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY 
        ? process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        : '',
  }
};
