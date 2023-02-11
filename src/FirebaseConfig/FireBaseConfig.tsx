// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC4G9wvfTvRcHhiknlMvGvuwbg7pmy70YI",
    authDomain: "react-daily-expense-app.firebaseapp.com",
    projectId: "react-daily-expense-app",
    storageBucket: "react-daily-expense-app.appspot.com",
    messagingSenderId: "747729783286",
    appId: "1:747729783286:web:743e4574f7cc753f14dfd7",
    measurementId: "G-LQQSC15FE2"
};

// Initialize Firebase


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app)