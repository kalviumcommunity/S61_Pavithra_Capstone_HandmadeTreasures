import { initializeApp, setLogLevel } from "firebase/app";
import { getAuth } from "firebase/auth";

setLogLevel('debug');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAT0I2paqooWzpSPBqF6ApYLdd4vzOx1C4",
    authDomain: "handmade-treasures.firebaseapp.com",
    projectId: "handmade-treasures",
    storageBucket: "handmade-treasures.appspot.com",
    messagingSenderId: "366831430098",
    appId: "1:366831430098:web:0cbdd2c49a6f3b36c7800b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };