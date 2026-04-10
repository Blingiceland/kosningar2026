import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYSAJp0r2UH63v7GHfDbJvavs6HaSeYIE",
  authDomain: "vidreisn-gardabaer.firebaseapp.com",
  projectId: "vidreisn-gardabaer",
  storageBucket: "vidreisn-gardabaer.firebasestorage.app",
  messagingSenderId: "793366722605",
  appId: "1:793366722605:web:388126b14c6349ea6e60a4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
