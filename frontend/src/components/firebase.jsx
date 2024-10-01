import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBIXT4kMabvduphIiUonQrbZLSElWBbKOw",
  authDomain: "task2-23905.firebaseapp.com",
  projectId: "task2-23905",
  storageBucket: "task2-23905.appspot.com",
  messagingSenderId: "195806836736",
  appId: "1:195806836736:web:bded0507c0e61f569640e5"
};

const app = firebase.initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();

export const auth = app.auth();

export default {app, auth, provider};