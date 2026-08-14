// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4G9wvfTvRcHhiknlMvGvuwbg7pmy70YI",
  authDomain: "react-daily-expense-app.firebaseapp.com",
  databaseURL: "https://react-daily-expense-app-default-rtdb.firebaseio.com",
  projectId: "react-daily-expense-app",
  storageBucket: "react-daily-expense-app.firebasestorage.app",
  messagingSenderId: "747729783286",
  appId: "1:747729783286:web:743e4574f7cc753f14dfd7",
  measurementId: "G-LQQSC15FE2"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}

const db = getDatabase(app);
const auth = getAuth(app);

export { app, db, auth, analytics };
