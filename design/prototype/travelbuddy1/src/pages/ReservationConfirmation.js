import React from 'react';
import { useLocation } from 'react-router-dom';

const ReservationConfirmation = () => {
  const location = useLocation();
  const { destination, price, travelers } = location.state || {};

  if (!destination) return <div>No reservation details available.</div>;

  return (
    <div className="confirmation-page">
      <h2>Reservation Confirmation</h2>
      <p>Destination: {destination}</p>
      <p>Price: ${price}</p>
      <p>Travelers: {travelers}</p>
    </div>
  );
};

export default ReservationConfirmation;
