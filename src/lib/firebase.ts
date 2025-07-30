// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCufsiSAJgQKTQByZFYM_WpGMaHvFpuYnE",
  authDomain: "assistente-dcfe8.firebaseapp.com",
  projectId: "assistente-dcfe8",
  storageBucket: "assistente-dcfe8.firebasestorage.app",
  messagingSenderId: "169299414266",
  appId: "1:169299414266:web:0965accd4eb4a424cbcd43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;