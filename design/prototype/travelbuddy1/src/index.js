// src/App.js
import './styles/TravelBuddy.css'; // Importer les styles
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Correct importation des composants de routage
import Home from './pages/Home';
import ReservationPage from './components/ReservationPage';  // S'assurer que ReservationPage est importé depuis pages et non components
import PaymentPage from './components/PaymentPage';  // Importer la page de paiement

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservation/:id" element={<ReservationPage />} />  {/* Route pour la page de réservation */}
        <Route path="/payment" element={<PaymentPage />} />  {/* Route pour la page de paiement */}
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
