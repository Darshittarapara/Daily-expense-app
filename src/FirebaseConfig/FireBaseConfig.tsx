// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics'
import { getAuth, browserSessionPersistence, initializeAuth, browserPopupRedirectResolver } from 'firebase/auth';

// const firebaseConfig = {
//     apiKey: "AIzaSyC4G9wvfTvRcHhiknlMvGvuwbg7pmy70YI",
//     authDomain: "react-daily-expense-app.firebaseapp.com",
//     projectId: "react-daily-expense-app",
//     storageBucket: "react-daily-expense-app.appspot.com",
//     messagingSenderId: "747729783286",
//     appId: "1:747729783286:web:743e4574f7cc753f14dfd7",
//     measurementId: "G-LQQSC15FE2"
// };

const firebaseConfig = {
    apiKey: "AIzaSyCVyNCX0du7YSJvrhgtIdYPLL3MfHYvpW8",
    authDomain: "react-chat-application-67cf3.firebaseapp.com",
    databaseURL: "https://react-chat-application-67cf3-default-rtdb.firebaseio.com",
    projectId: "react-chat-application-67cf3",
    storageBucket: "react-chat-application-67cf3.appspot.com",
    messagingSenderId: "629872259885",
    appId: "1:629872259885:web:41cf359e15b19830e059a4",
    measurementId: "G-12LG8QCR0H"
};
// Initialize Firebase


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = initializeAuth(app, {
    persistence: browserSessionPersistence,
    popupRedirectResolver: browserPopupRedirectResolver,
});