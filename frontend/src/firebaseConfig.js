// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIXT4kMabvduphIiUonQrbZLSElWBbKOw",
  authDomain: "task2-23905.firebaseapp.com",
  projectId: "task2-23905",
  storageBucket: "task2-23905.appspot.com",
  messagingSenderId: "195806836736",
  appId: "1:195806836736:web:bded0507c0e61f569640e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default { auth , app};
