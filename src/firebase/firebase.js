import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9O76O3eNgAf5Os2SrBktGtQUVmC3ZRZI",
  authDomain: "react-chat-fba68.firebaseapp.com",
  databaseURL: "https://react-chat-fba68-default-rtdb.firebaseio.com",
  projectId: "react-chat-fba68",
  storageBucket: "react-chat-fba68.appspot.com",
  messagingSenderId: "861942412840",
  appId: "1:861942412840:web:ed6af08031a022de6ae71d",
  measurementId: "G-2JH8R2JBW6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export { db, firebase };
