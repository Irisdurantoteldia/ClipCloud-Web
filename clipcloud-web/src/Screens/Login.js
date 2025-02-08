import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/FirebaseConfig'; // Asegúrate de que el archivo FirebaseConfig.js esté correctamente configurado
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import './Login.css'; // Importa el archivo de CSS

const backgroundImage = require('../Assets/fondo.jpg'); // Cambia la ruta de la imagen si es necesario

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMsg('Por favor, ingresa tu correo electrónico y contraseña.');
            return;
        }
        setErrorMsg(null);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('¡Login exitoso!');
            navigate('/all'); // Redirigir a la página "All" después del login exitoso
        } catch (error) {
            console.log('Error al iniciar sesión:', error.code, error.message);
            setErrorMsg(`Error: ${error.message}`);  // Mostramos el mensaje de error completo
            switch (error.code) {
                case 'auth/invalid-email':
                    setErrorMsg('El correo electrónico no es válido.');
                    break;
                case 'auth/user-not-found':
                    setErrorMsg('Este usuario no existe.');
                    break;
                case 'auth/wrong-password':
                    setErrorMsg('La contraseña es incorrecta.');
                    break;
                default:
                    setErrorMsg(`Hubo un error inesperado: ${error.message}`);
            }
        }
    };


    const handleForgotPassword = async () => {
        if (!email) {
            setErrorMsg('Por favor, ingresa tu correo electrónico para recuperar la contraseña.');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            alert('¡Correo enviado!', 'Revisa tu bandeja de entrada para restablecer tu contraseña.');
        } catch (error) {
            console.log('Error enviando el correo de recuperación:', error.code, error.message);
            switch (error.code) {
                case 'auth/invalid-email':
                    setErrorMsg('El correo electrónico no es válido.');
                    break;
                case 'auth/user-not-found':
                    setErrorMsg('Este correo electrónico no está registrado.');
                    break;
                default:
                    setErrorMsg('Hubo un error inesperado. Por favor, inténtalo de nuevo.');
            }
        }
    };

    return (
        <div className="background">
            <div className="loginBox">
                <div className="topButtons">
                    <button className="switchButton activeButton">
                        Login
                    </button>
                    <button className="switchButton" onClick={() => navigate('/signup')}>
                        Sign Up
                    </button>
                </div>

                <h1 className="title">Welcome to ClipCloud!</h1>

                {errorMsg && <p className="errorText">{errorMsg}</p>}

                <input
                    type="email"
                    className="input"
                    placeholder="Correo electrónico..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="input"
                    placeholder="Contraseña..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="button" onClick={handleLogin}>
                    Iniciar sesión
                </button>

                <button className="forgotPassword" onClick={handleForgotPassword}>
                    ¿Olvidaste tu contraseña?
                </button>
            </div>
        </div>
    );
};
