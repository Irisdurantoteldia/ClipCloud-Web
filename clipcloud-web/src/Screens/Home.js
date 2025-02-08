import React from 'react';
import { useNavigate } from 'react-router-dom'; // Usamos useNavigate para la navegación

// Importamos el archivo de estilos CSS
import './Home.css'; // Asegúrate de que la ruta sea correcta

// Rutas de las imágenes
const logoImage = require('../Assets/logo.png'); // Cambia la ruta de la imagen si es necesario

export default function Home() {
  const navigate = useNavigate(); // Usamos useNavigate para obtener la función de navegación

  const handlePress = (id) => {
    console.log("Has clicado en el botón " + id);
    if (id === 2) {
      navigate("/login"); // Redirige a la página de Login
    } else if (id === 3) {
      navigate("/signup"); // Redirige a la página de SignUp
    }
  };

  return (
    <div className="background">
      <div className="container">
        {/* Logo al centro de la pantalla */}
        <img
          src={logoImage}
          alt="Logo"
          className="logo" // Usamos la clase CSS del logo
        />
      </div>

      {/* Botones debajo del logo */}
      <div className="buttonContainer">
        <button className="button" onClick={() => handlePress(2)}>
          Login
        </button>
        <button className="button" onClick={() => handlePress(3)}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
