import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLlBOct3cGt4nvG0lvC1_S2rVfPLzippI",
  authDomain: "fir-lab-770e0.firebaseapp.com",
  projectId: "fir-lab-770e0",
  storageBucket: "fir-lab-770e0.appspot.com",
  messagingSenderId: "69138470018",
  appId: "1:69138470018:web:0a21a942407f4f8b48109b",
  measurementId: "G-W983HEHL9N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}

export function signOut(): void {
  auth.signOut();
}
