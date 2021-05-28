
import firebase from 'firebase';

const FirebaseConfig = {
  apiKey: "AIzaSyC8YhzYoQKqi6PDqqUs-DPw0yDltrJBNtg",
  authDomain: "testfirebase-1412.firebaseapp.com",
  projectId: "testfirebase-1412",
  storageBucket: "testfirebase-1412.appspot.com",
  messagingSenderId: "493676433657",
  appId: "1:493676433657:web:eb11df96823ac181b91228",
  measurementId: "G-VMZS4FCKC2"
}


export const firebaseApp = firebase.initializeApp(FirebaseConfig)