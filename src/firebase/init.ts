// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log("analytics: ", analytics);

// // init firebase
// initializeApp(firebaseConfig);

// init firestore service
const db = getFirestore();
export default db;
