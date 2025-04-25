 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
 import { getAut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
 import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyCMOe5WGwL2g03J0O08C_H-_LVD1OjTWtg",
   authDomain: "laundrywebapp-71232.firebaseapp.com",
   projectId: "laundrywebapp-71232",
   storageBucket: "laundrywebapp-71232.firebasestorage.app",
   messagingSenderId: "260962124147",
   appId: "1:260962124147:web:be4871909dc42077638506"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);