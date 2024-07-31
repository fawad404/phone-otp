
import { initializeApp } from "firebase/app";
import 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyC_wBSTSgtgpVzIEC5di-BS8WIKiJazi60",
  authDomain: "phone-opt-68c04.firebaseapp.com",
  projectId: "phone-opt-68c04",
  storageBucket: "phone-opt-68c04.appspot.com",
  messagingSenderId: "160856326170",
  appId: "1:160856326170:web:e899a5f83337b56df891a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };