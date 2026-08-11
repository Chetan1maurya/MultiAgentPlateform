// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "multiagentplateform.firebaseapp.com",
  projectId: "multiagentplateform",
  storageBucket: "multiagentplateform.firebasestorage.app",
  messagingSenderId: "490136772912",
  appId: "1:490136772912:web:3ee5fb77416a518b99a8f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
