import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCs3qu8-5pVUY3qQkPBbnsXB-85E2Rgav0",
  authDomain: "second-brain53.firebaseapp.com",
  projectId: "second-brain53",
  storageBucket: "second-brain53.firebasestorage.app",
  messagingSenderId: "719833919936",
  appId: "1:719833919936:web:2527374e2914ee0f5c1825",
  measurementId: "G-CE95V2RSVC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();



