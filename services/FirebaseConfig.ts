// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9gly5RUJXSOD7v1kMExDVGjIJn7ig0Ek",
  authDomain: "z-alert-b36c2.firebaseapp.com",
  projectId: "z-alert-b36c2",
  storageBucket: "z-alert-b36c2.firebasestorage.app",
  messagingSenderId: "736274370519",
  appId: "1:736274370519:web:60ed67a92e6de17f0a0592",
  measurementId: "G-PBRTRKFNFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);