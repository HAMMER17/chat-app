
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDWx9FBrtpJwDKmjjIcZiv0blIKif6IihM",
  authDomain: "chat-app-839f9.firebaseapp.com",
  projectId: "chat-app-839f9",
  storageBucket: "chat-app-839f9.appspot.com",
  messagingSenderId: "905289106284",
  appId: "1:905289106284:web:a4c31d91aa5c1e3af1a949"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)