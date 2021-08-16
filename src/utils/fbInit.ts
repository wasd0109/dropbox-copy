import firebase from "firebase";
import firebaseConfig from "./fbConfig";

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const storage = firebase.storage();

// if (process.env.NODE_ENV === "development") {
//   auth.useEmulator("http://localhost:9099");
//   db.useEmulator("localhost", 8080);
//   storage.useEmulator("localhost", 9199);
// }

export { auth, db, storage };
