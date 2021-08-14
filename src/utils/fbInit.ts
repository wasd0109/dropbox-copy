import firebase from "firebase";
import firebaseConfig from "./fbConfig";

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
auth.useEmulator("http://localhost:9099");
const db = firebase.firestore();
db.useEmulator("localhost", 8080);

const storage = firebase.storage();
storage.useEmulator("localhost", 9199);

export { auth, db, storage };
