import React from 'react';
import ReactDOM from 'react-dom/client'; // Per a React 18
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // React Router
import Home from './Screens/Home'; // Ruta del component Home
import Login from './Screens/Login'; // Ruta del component Login
import SignUp from './Screens/SignUp'; // Ruta del component SignUp
import All from './Screens/All';
import Feed from './Screens/Feed';
import Add from './Screens/Add';
import Favorites from './Screens/Favorites';
import Account from './Screens/Account';
import VideoPlayer from './Screens/VideoPlayer';
import './index.css'; // Si tens fitxers CSS globals

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/all" element={<All />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/add" element={<Add />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/account" element={<Account />} />
      <Route path="/videoPlayer/:videoId" element={<VideoPlayer />} />
    </Routes>
  </Router>
);
