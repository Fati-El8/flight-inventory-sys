import React, { useState } from 'react';
import { searchFlights } from '../services/FlightServices';
import FlightResults from '../flightresults/flightRes';
import './Reservation.css';

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: ''
  });
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear previous results when input changes
    setSearchResults(null);
    setError(null);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const flights = await searchFlights(formData);
      setSearchResults(flights);
    } catch (error) {
      setError(error.message);
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReservationComplete = (result) => {
    // Handle successful reservation (e.g., show success message, redirect to confirmation page)
    console.log('Reservation completed:', result);
  };

  return (
    <div className="reservation-page">
      <div className="reservation-container">
        <h2>Find Your Perfect Flight</h2>
        <form onSubmit={handleSearch}>
        
          
         
          
          

          <button 
            type="submit" 
            className="search-flights-btn" 
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search Flights'}
          </button>
        </form>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="loading">Searching for flights...</div>
      ) : (
        searchResults && (
          <FlightResults 
            flights={searchResults} 
            searchCriteria={formData}
            onReservation={handleReservationComplete}
          />
        )
      )}
    </div>
  );
};

export default ReservationPage;