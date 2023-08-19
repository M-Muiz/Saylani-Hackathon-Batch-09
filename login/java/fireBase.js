import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";

// Hackathon 
// https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js


const firebaseConfig = {
  apiKey: "AIzaSyCf8z6Ri867ZBnhGZhwb0K80FuHqADLHxE",
  authDomain: "registration-form-f6a07.firebaseapp.com",
  projectId: "registration-form-f6a07",
  storageBucket: "registration-form-f6a07.appspot.com",
  messagingSenderId: "1036783377451",
  appId: "1:1036783377451:web:a64be296d635cbc28c9e6e",
  measurementId: "G-3N7WBZRGQC"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, storage, ref, uploadBytesResumable, getStorage, getDownloadURL, db, collection, addDoc, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, getDocs, doc }
