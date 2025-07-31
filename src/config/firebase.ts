// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANfrZINUNF9sXwcCeo5NXPSJtdJNiTzkc",
  authDomain: "la-italiana-pizzeria-fc077.firebaseapp.com",
  projectId: "la-italiana-pizzeria-fc077",
  storageBucket: "la-italiana-pizzeria-fc077.firebasestorage.app",
  messagingSenderId: "205676371623",
  appId: "1:205676371623:web:ffa4af7ffc4edd9a9c4582",
  measurementId: "G-Z07QZVTM3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };
export default app;