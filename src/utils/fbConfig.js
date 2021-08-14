require("dotenv").config();
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,

  authDomain: "dropbox-copy.firebaseapp.com",

  projectId: "dropbox-copy",

  storageBucket: "dropbox-copy.appspot.com",

  messagingSenderId: "431286804897",

  appId: "1:431286804897:web:c239d9981e4c8d5c7fabe0",

  measurementId: "G-WV8SBTT34J",
};

export default firebaseConfig;
