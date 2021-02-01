import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const app = firebase.initializeApp({
  apiKey: "AIzaSyABcDZLhOScnJZpr-AVObIkYAb0fbe8Nhg",
  authDomain: "code-teams.firebaseapp.com",
  databaseURL: "https://code-teams-default-rtdb.firebaseio.com",
  projectId: "code-teams",
  storageBucket: "code-teams.appspot.com",
  messagingSenderId: "759472991088",
  appId: "1:759472991088:web:d282368045b86a0067fdb5",
});

export const auth = app.auth();
export const db = app.database();
export default app;
