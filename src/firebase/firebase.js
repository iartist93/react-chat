import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";

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
const rtdb = firebase.database();

/**
 * Setup presense (online/offline) status for users
 */
const setupUserPresense = (user) => {
  const isOfflineForDatabase = {
    status: "Offline",
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  };
  const isOnlineForDatabase = {
    status: "Online",
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  };
  const isOfflineForFirestore = {
    status: "Offline",
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  };
  const isOnlineForFirestore = {
    status: "Online",
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const rtdbStatusRef = rtdb.ref(`/status/${user.uid}`);
  const userDoc = db.doc(`/users/${user.uid}`);

  rtdb.ref(".info/connected").on("value", (snapshot) => {
    console.log(snapshot.val());

    // don't do anything if offline
    if (snapshot.val() === false) {
      userDoc.update({ status: isOfflineForFirestore });
      return;
    }

    // set is online and set what to do when go offline
    rtdbStatusRef.onDisconnect().set(isOfflineForDatabase);
    rtdbStatusRef.set(isOnlineForDatabase);
    userDoc.update({ status: isOnlineForFirestore });
  });
};

export { db, firebase, setupUserPresense };
