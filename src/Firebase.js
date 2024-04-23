// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAQeT9wvHneJkEm1kflmjt17-5TjmhV5V8",
  authDomain: "coolpro-c24e2.firebaseapp.com",
  projectId: "coolpro-c24e2",
  storageBucket: "coolpro-c24e2.appspot.com",
  messagingSenderId: "906948245251",
  appId: "1:906948245251:web:d30ea606dce683e3b55b36",
  measurementId: "G-LC6QFXQS6H"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;


