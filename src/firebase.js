
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDZG8OejoCYlZ-HpIshpX6x_6U_kV-NalY",
  authDomain: "react-chat-project-c5725.firebaseapp.com",
  projectId: "react-chat-project-c5725",
  storageBucket: "react-chat-project-c5725.appspot.com",
  messagingSenderId: "248888556843",
  appId: "1:248888556843:web:6bb5729794a6935c6c196e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();