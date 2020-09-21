import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDs4DRe3PnvPivOvTZOUsjhLq6o09aQSCs",
    authDomain: "clone-6145b.firebaseapp.com",
    databaseURL: "https://clone-6145b.firebaseio.com",
    projectId: "clone-6145b",
    storageBucket: "clone-6145b.appspot.com",
    messagingSenderId: "927168072226",
    appId: "1:927168072226:web:517df344fc877b471a987b",
    measurementId: "G-MRG476RB96"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };