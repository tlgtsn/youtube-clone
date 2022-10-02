import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtbuYCLSxFifjyhw_W9Lf6MKvKmltGgQ4",
  authDomain: "video-3caa7.firebaseapp.com",
  projectId: "video-3caa7",
  storageBucket: "video-3caa7.appspot.com",
  messagingSenderId: "213701808388",
  appId: "1:213701808388:web:34534dd6ded629f9ad0051"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
