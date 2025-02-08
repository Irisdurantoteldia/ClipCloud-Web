import React from 'react';
import { FaHome, FaPlay, FaPlusCircle, FaHeart, FaUser } from 'react-icons/fa'; // Importamos los íconos
import './FButton.css'; // Añade los estilos aquí

export default function FButton({
  selectedIcon,
  unselectedIcon,
  id,
  isSelected,
  onPress,
  isCircular = false,
  color = "#9265ff",
}) {
  return (
    <button
      className="fbutton"
      onClick={() => onPress(id)}
      style={{
        borderRadius: isCircular ? '50%' : '0',
        padding: isCircular ? '10px' : '0',
        backgroundColor: isSelected ? color : 'transparent',
        border: isCircular ? 'none' : '1px solid #ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isSelected ? selectedIcon : unselectedIcon}
    </button>
  );
}
