import React from 'react';
import FButton from './FButton'; // Asegúrate de importar FButton desde donde corresponda
import { FaHome, FaPlay, FaPlusCircle, FaHeart, FaUser } from 'react-icons/fa'; // Importamos los íconos

export default function FSection({ currentSection, onPress }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
      }}
    >
      <FButton
        selectedIcon={<FaHome />}
        unselectedIcon={<FaHome />}
        id={1}
        onPress={onPress}
        isSelected={currentSection === 1}
        color="#673dff"
      />
      <FButton
        selectedIcon={<FaPlay />}
        unselectedIcon={<FaPlay />}
        id={2}
        onPress={onPress}
        isSelected={currentSection === 2}
        color="#673dff"
      />
      <FButton
        selectedIcon={<FaPlusCircle />}
        unselectedIcon={<FaPlusCircle />}
        id={3}
        onPress={onPress}
        isSelected={currentSection === 3}
        color="#673dff"
      />
      <FButton
        selectedIcon={<FaHeart />}
        unselectedIcon={<FaHeart />}
        id={4}
        onPress={onPress}
        isSelected={currentSection === 4}
        color="#673dff"
      />
      <FButton
        selectedIcon={<FaUser />}
        unselectedIcon={<FaUser />}
        id={5}
        onPress={onPress}
        isSelected={currentSection === 5}
        color="#673dff"
      />
    </div>
  );
}
