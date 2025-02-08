import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Configuració de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDrnoPJpGHM_3weR1FyKCXdvqrFKcQXnRc",
    authDomain: "clipcloud-42392.firebaseapp.com",
    projectId: "clipcloud-42392",
    storageBucket: "clipcloud-42392.firebasestorage.app",
    messagingSenderId: "660348271829",
    appId: "1:660348271829:web:0060922e3a4a4d94def65c"
};

// Inicialitza l'app de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Servei d'autenticació
const db = getFirestore(app); // Instància de Firestore

export { auth, db }; // 🔹 Exportació correcta
