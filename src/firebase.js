import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBni-X-EQtQuMAMgKzEYVy8ZI0t9ipd2ZU",
    authDomain: "code-teams-4ca8b.firebaseapp.com",
    projectId: "code-teams-4ca8b",
    storageBucket: "code-teams-4ca8b.appspot.com",
    messagingSenderId: "480546517327",
    appId: "1:480546517327:web:d460de775c844c2eaa553a"
});

export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export default app;
