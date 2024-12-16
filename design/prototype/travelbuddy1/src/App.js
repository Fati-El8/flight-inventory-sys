// App.js
import './styles/TravelBuddy.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ReservationPage from './components/ReservationPage';
import PaymentPage from './components/PaymentPage';
import LoginPage from './pages/LoginPage'; // Importation de la page de connexion
import PrivateRoute from './components/PrivateRoute';  // Importation de la route protégée
import { useAuth } from './hooks/useAuth'; // Hook personnalisé pour gérer l'authentification

const App = () => {
  const { isAuthenticated } = useAuth(); // Vérification de l'état de l'authentification

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route pour la page d'accueil */}
          <Route path="/" element={<Home />} />

          {/* Route pour la page de connexion */}
          <Route path="/login" element={<LoginPage />} />

          {/* Routes protégées */}
          <Route
            path="/reservation/:id"
            element={
              <PrivateRoute element={<ReservationPage />} />
            }
          />
          <Route
            path="/payment"
            element={
              <PrivateRoute element={<PaymentPage />} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
