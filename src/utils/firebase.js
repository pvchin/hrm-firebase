import firebase from "firebase";
require("dotenv").config();

var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_ID,
  authDomain: "hrms-appsmith.firebaseapp.com",
  projectId: "hrms-appsmith",
  storageBucket: "hrms-appsmith.appspot.com",
  messagingSenderId: "1075628749605",
  appId: "1:1075628749605:web:3ee65bf3acf097eaf9e0cc",
  measurementId: "G-EGE5ML97G5",
};

// Initialize Firebase
//let instance;

// export default function getFirebase() {
//   if (typeof window !== "undefined") {
//     if (instance) return instance;
//     instance = firebase.initializeApp(firebaseConfig);
//     return instance;
//   }

//   return null;
// }

const app = firebase.initializeApp(firebaseConfig);

export default app;
