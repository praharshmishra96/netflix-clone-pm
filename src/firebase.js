import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDnkprmZbD7arLl0tc1QRUBtrZjvbualsU",
    authDomain: "netflix-clone-pm.firebaseapp.com",
    projectId: "netflix-clone-pm",
    storageBucket: "netflix-clone-pm.appspot.com",
    messagingSenderId: "120506596264",
    appId: "1:120506596264:web:f448d46a59d4d61241bb9d"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth };
