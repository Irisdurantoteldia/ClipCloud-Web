import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Usamos 'react-router-dom' para la navegación en la web
import { auth, db } from '../Firebase/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './SignUp.css'; // Estilos en un archivo separado

const backgroundImage = require('../Assets/fondo.jpg'); // Puedes usar una ruta relativa a la imagen

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        if (password === confirmPassword) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                await setDoc(doc(db, 'users', user.uid), {
                    email: user.email,
                    createdAt: new Date(),
                });

                navigate('/all');
            } catch (error) {
                alert('Error: ' + error.message);
            }
        } else {
            alert('Passwords do not match');
        }
    };

    return (
        <div className="signup-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="login-box">
                <div className="top-buttons">
                    <button className="switch-button" onClick={() => navigate('/login')}>
                        Login
                    </button>
                    <button className="switch-button active-button">
                        Sign Up
                    </button>
                </div>

                <h1 className="title">Welcome to ClipCloud!</h1>

                <input
                    className="input"
                    placeholder="User..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                />

                <input
                    className="input"
                    placeholder="Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />

                <input
                    className="input"
                    placeholder="Repeat Password..."
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                />

                <button className="button" onClick={handleSignUp}>
                    Sign Up
                </button>
            </div>
        </div>
    );
}
