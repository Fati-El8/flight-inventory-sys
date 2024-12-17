import React, { useState } from 'react';

const BookingForm = ({ onReserve, defaultDestination, defaultPrice, defaultTravelers }) => {
  const [destination, setDestination] = useState(defaultDestination || '');
  const [price, setPrice] = useState(defaultPrice || 0);
  const [travelers, setTravelers] = useState(defaultTravelers || 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérification des données avant d'envoyer
    if (!destination || !price || !travelers) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    onReserve({ destination, price, travelers });  // Envoi des données à la page de confirmation
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Destination</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination"
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Enter price"
        />
      </div>
      <div>
        <label>Travelers</label>
        <input
          type="number"
          value={travelers}
          onChange={(e) => setTravelers(Number(e.target.value))}
          min="1"
        />
      </div>
      <button type="submit">Reserve</button>
    </form>
  );
};

export default BookingForm;
