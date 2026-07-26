// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBm2WU5SSr3kn5mey1qoN9tiq8RkejDo0",
  authDomain: "second-brain-edc31.firebaseapp.com",
  projectId: "second-brain-edc31",
  storageBucket: "second-brain-edc31.firebasestorage.app",
  messagingSenderId: "109051647806",
  appId: "1:109051647806:web:438722624c331b6f2b3e6f",
  measurementId: "G-WKHZ6GGNQW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);