// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import firebase from "firebase";
import "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBoWU_ULimp3eNfuXrSfugpDchwklKCNUQ",
    authDomain: "nourishment-firebase-d757b.firebaseapp.com",
    databaseURL: "https://nourishment-firebase-d757b-default-rtdb.firebaseio.com",
    projectId: "nourishment-firebase-d757b",
    storageBucket: "nourishment-firebase-d757b.appspot.com",
    messagingSenderId: "854624864378",
    appId: "1:854624864378:web:2ff046eb12d6af058553c3"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
// const firebaseApp = firebase.initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore(app)

// Initialize database
// export const db = getDatabase(app)
// export const db = firebaseApp.firestore();





