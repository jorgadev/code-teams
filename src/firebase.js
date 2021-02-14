import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCsbJmeuDb_SXLNiNxGHJdDON-u6pg3lQ0",
  authDomain: "code-teams-2a209.firebaseapp.com",
  projectId: "code-teams-2a209",
  storageBucket: "code-teams-2a209.appspot.com",
  messagingSenderId: "1012426688769",
  appId: "1:1012426688769:web:c42392738900a0359db300",
});

export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export default app;
