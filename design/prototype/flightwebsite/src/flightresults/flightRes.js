import React, { useState } from 'react';
import { searchFlights, reserveFlight } from '../services/FlightServices';
import './FlightRes.css';

const FlightResults = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    nameAeroportDepart: '',
    nameAeroportArrive: ''
  });
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const results = await searchFlights(
        searchCriteria.nameAeroportDepart, 
        searchCriteria.nameAeroportArrive
      );
      setFlights(results);
      setError('');
    } catch (err) {
      setError('Error searching flights: ' + err.message);
    }
  };

  const handleReserve = async (flightId) => {
    try {
      const result = await reserveFlight(flightId, {
        // Add passenger details here
      });
      // Handle successful reservation
    } catch (error) {
      console.error('Reservation failed:', error);
      setError('Reservation failed: ' + error.message);
    }
  };

  return (
    <div className="flight-results">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Departure Airport"
          value={searchCriteria.nameAeroportDepart}
          onChange={(e) => setSearchCriteria({
            ...searchCriteria,
            nameAeroportDepart: e.target.value
          })}
        />
        <input
          type="text"
          placeholder="Arrival Airport"
          value={searchCriteria.nameAeroportArrive}
          onChange={(e) => setSearchCriteria({
            ...searchCriteria,
            nameAeroportArrive: e.target.value
          })}
        />
        <button type="submit">Search Flights</button>
      </form>

      {error && <div className="error">{error}</div>}

      {(!flights || flights.length === 0) ? (
        <div className="no-results">
          <h2>No flights found</h2>
          <p>No flights available for the selected route.</p>
        </div>
      ) : (
        <div className="flights-list">
          {flights.map(flight => (
            <div key={flight.id_vol} className="flight-card">
              <p>Flight Number: {flight.num_vol}</p>
              <p>From: {flight.aeroportDepart.nameAeroport}</p>
              <p>To: {flight.aeroportArrive.nameAeroport}</p>
              <button onClick={() => handleReserve(flight.id_vol)}>
                Reserve Flight
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightResults;