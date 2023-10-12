// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASfs6vAxpCX6lzxtCQEbEuYlBaLMvXNtg",
  authDomain: "netflixgpt-dfc0a.firebaseapp.com",
  projectId: "netflixgpt-dfc0a",
  storageBucket: "netflixgpt-dfc0a.appspot.com",
  messagingSenderId: "829798574175",
  appId: "1:829798574175:web:35061ea3031220b74b53ea",
  measurementId: "G-ZFCY7X5Y57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();