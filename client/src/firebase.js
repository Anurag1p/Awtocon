import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_Gwa9NuvZmKl6jJrAGwJeHENh8Sty4DU",
  authDomain: "constructionautomation.firebaseapp.com",
  projectId: "constructionautomation",
  storageBucket: "constructionautomation.appspot.com",
  messagingSenderId: "803254119869",
  appId: "1:803254119869:web:f7fabf783eb0511c2976d4",
  measurementId: "G-LLK8XZ64VQ"
};



const app = initializeApp(firebaseConfig);

const auth = getAuth();

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore,storage };
