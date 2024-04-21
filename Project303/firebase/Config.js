import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBPiRrslh28md3DbkqacWsxWcy97WM04bk",
    authDomain: "projectcs303.firebaseapp.com",
    projectId: "projectcs303",
    storageBucket: "projectcs303.appspot.com",
    messagingSenderId: "176023625454",
    appId: "1:176023625454:web:1d154478eb43f4ffe39dff"
};

const app = initializeApp(firebaseConfig);

//instial database
const db = getFirestore(app);
const auth = getAuth(app);

export {app , db , auth}


