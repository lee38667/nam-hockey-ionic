// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEyTYOzUoS3DyQsRbmk9263_7igpy8m4A",
  authDomain: "namhockey-64af2.firebaseapp.com",
  projectId: "namhockey-64af2",
  storageBucket: "namhockey-64af2.firebasestorage.app",
  messagingSenderId: "430066998544",
  appId: "1:430066998544:web:959b84a9b75dac8b185995",
  measurementId: "G-YNV19QVMYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default app;
export { db }; 
