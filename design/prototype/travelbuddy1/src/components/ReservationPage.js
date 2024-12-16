// src/pages/ReservationPage.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ReservationPage.css';  // Ajoutez ce fichier pour les styles

const ReservationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Détails fictifs de la destination
  const destinationDetails = {
    1: { destination: 'Bali', price: 1200 },
    2: { destination: 'Paris', price: 1500 },
    3: { destination: 'Tokyo', price: 1800 },
    4: { destination: 'New York', price: 1600 }
  };

  const { destination, price } = destinationDetails[id];

  // État pour afficher les détails de la réservation après avoir cliqué sur "Réserver"
  const [reservationDetails, setReservationDetails] = useState(null);

  // Fonction pour enregistrer les détails de la réservation
  const handleReserve = () => {
    // Vous pouvez ajuster le nombre de voyageurs ici
    setReservationDetails({
      destination,
      price,
      travelers: 1,  // Exemple de nombre de voyageurs
    });
  };

  // Fonction pour rediriger vers la page de paiement
  const handleProceedToPayment = () => {
    navigate('/payment', {
      state: reservationDetails,  // Passez les informations de réservation à la page de paiement
    });
  };

  return (
    <div className="reservation-page">
      <h2>Confirm Your Reservation</h2>
      <p><strong>Destination:</strong> {destination}</p>
      <p><strong>Price per Traveler:</strong> ${price}</p>
      <p><strong>Number of Travelers:</strong> 1</p> {/* Ajustez selon les voyageurs */}

      {/* Bouton pour réserver */}
      <button className="reserve-button" onClick={handleReserve}>Réserver</button>

      {/* Affichage des informations de réservation après avoir cliqué sur "Réserver" */}
      {reservationDetails && (
        <div className="reservation-info">
          <h3>Your Reservation Details</h3>
          <p><strong>Destination:</strong> {reservationDetails.destination}</p>
          <p><strong>Price per Traveler:</strong> ${reservationDetails.price}</p>
          <p><strong>Number of Travelers:</strong> {reservationDetails.travelers}</p>
          <p><strong>Total Price:</strong> ${reservationDetails.price * reservationDetails.travelers}</p>
          
          {/* Bouton pour procéder au paiement */}
          <button className="pay-now-button" onClick={handleProceedToPayment}>Proceed to Payment</button>
        </div>
      )}
    </div>
  );
};

export default ReservationPage;
