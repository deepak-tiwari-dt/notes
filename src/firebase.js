import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbbob7Q6A30Rt150HJJzUr2T6Yt4vK2RU",
  authDomain: "notes-a5ad4.firebaseapp.com",
  projectId: "notes-a5ad4",
  storageBucket: "notes-a5ad4.appspot.com",
  messagingSenderId: "613098766694",
  appId: "1:613098766694:web:fbb21c886c1419206148a7",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
