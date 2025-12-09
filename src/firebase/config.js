// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALHSXqwSNpee9D3cQ3C13X5tDZLhr-DIw",
  authDomain: "studybuddy-75cca.firebaseapp.com",
  projectId: "studybuddy-75cca",
  storageBucket: "studybuddy-75cca.firebasestorage.app",
  messagingSenderId: "310896302104",
  appId: "1:310896302104:web:daa75d7fe097d4c7cc8b6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

