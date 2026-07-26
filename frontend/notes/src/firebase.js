import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Optional: only keep Analytics if you really want it
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDBm2WU5SSr3kn5mey1qoN9tiq8RkejDo0",
  authDomain: "second-brain-edc31.firebaseapp.com",
  projectId: "second-brain-edc31",
  storageBucket: "second-brain-edc31.firebasestorage.app",
  messagingSenderId: "109051647806",
  appId: "1:109051647806:web:438722624c331b6f2b3e6f",
  measurementId: "G-WKHZ6GGNQW",
};

const app = initializeApp(firebaseConfig);

// Optional
const analytics = getAnalytics(app);

// ⭐ These are what your App.jsx needs
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;