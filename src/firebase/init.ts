// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPXCKWHLMhIBA9e_IXFxpBuFVth2_Qvo0",
  authDomain: "workout-app-5e81f.firebaseapp.com",
  projectId: "workout-app-5e81f",
  storageBucket: "workout-app-5e81f.appspot.com",
  messagingSenderId: "46791203415",
  appId: "1:46791203415:web:e884810893899ea3dbe112",
  measurementId: "G-31QF607P15",
  // storageBucket: "gs://workout-app-5e81f.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init firestore service
const db = getFirestore(app); // Pass the app instance here

// init auth service
const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { auth, db, storage };
