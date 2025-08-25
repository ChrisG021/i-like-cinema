import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCiPEOA4glaPrzqYqN0OSlw5O_mOd2VRT0",
  authDomain: "i-like-cinema-b1cb1.firebaseapp.com",
  projectId: "i-like-cinema-b1cb1",
  storageBucket: "i-like-cinema-b1cb1.firebasestorage.app",
  messagingSenderId: "994646558531",
  appId: "1:994646558531:web:586abc3202c2fba6eed1f6",
  measurementId: "G-24GYVS7MWP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)