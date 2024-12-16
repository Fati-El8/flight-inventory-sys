import React from 'react';
import { Link } from 'react-router-dom';  // Import du Link pour la navigation

// Destination Card Component
const DestinationCard = ({ image, name, country, price, rating, id }) => {
  return (
    <div className="card">
      <img src={image} alt={name} className="city-image" />
      <h3>{name}, {country}</h3>
      <div className="card-details">
        <span className="price">${price}</span>
        <span className="rating">⭐ {rating}</span>
      </div>
      {/* Utilisation de Link pour la navigation vers la page de réservation */}
      <Link 
        to={{
          pathname: `/reservation/${id}`,
          state: { destination: name, price, travelers: 1 }  // Passer d'autres informations nécessaires
        }} 
        className="reserve-btn">
        Reserve
      </Link>
    </div>
  );
};

export default DestinationCard;
