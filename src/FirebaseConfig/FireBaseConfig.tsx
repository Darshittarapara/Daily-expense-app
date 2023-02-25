// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics'
import { browserSessionPersistence, initializeAuth, browserPopupRedirectResolver } from 'firebase/auth';
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyC4G9wvfTvRcHhiknlMvGvuwbg7pmy70YI",
    authDomain: "react-daily-expense-app.firebaseapp.com",
    projectId: "react-daily-expense-app",
    storageBucket: "react-daily-expense-app.appspot.com",
    messagingSenderId: "747729783286",
    appId: "1:747729783286:web:743e4574f7cc753f14dfd7",
    measurementId: "G-LQQSC15FE2"
};


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getDatabase(app)
export const auth = initializeAuth(app, {
    persistence: browserSessionPersistence,
    popupRedirectResolver: browserPopupRedirectResolver,
});