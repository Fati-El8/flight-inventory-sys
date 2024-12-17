import React, { useState } from 'react';
import './TravelBuddy.css';
import LoginModal from './LoginModal';
import ReservationModal from '../ReservationPage/ReservationModal';

// Destination Card Component
const DestinationCard = ({ destination, onReserve }) => {
  const { image, name, country, price, rating } = destination;

  return (
    <div className="card">
      <img src={image} alt={name} className="city-image" />
      <h3>{name}, {country}</h3>
      <div className="card-details">
        <span className="price">${price}</span>
        <span className="rating">⭐ {rating}</span>
      </div>
      <button 
        className="reserve-btn" 
        onClick={() => onReserve(destination)}
      >
        Reserve
      </button>
    </div>
  );
};

// Main TravelBuddy Component
const TravelBuddy = () => {
  const destinations = [
    { id: 1, name: 'Bali', country: 'Indonesia', image: '/bali.jpeg', price: 1200, rating: 4.8 },
    { id: 2, name: 'Paris', country: 'France', image: '/paris.jpg', price: 1500, rating: 4.9 },
    { id: 3, name: 'Tokyo', country: 'Japan', image: '/tokyo.jpg', price: 1800, rating: 4.7 },
    { id: 4, name: 'New York', country: 'USA', image: '/nyc.jpg', price: 1600, rating: 4.6 }
  ];

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleReserve = (destination) => {
    setSelectedDestination(destination);
    setIsReservationModalOpen(true);
  };

  const closeReservationModal = () => {
    setIsReservationModalOpen(false);
    setSelectedDestination(null);
  };

  return (
    <div className="travel-buddy">
      <header>
        <div className="header-container">
          <a href="/" className="logo">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            TravelBuddy
          </a>
          
          <nav className="nav-menu">
            <ul className="nav-links">
              <li><a href="#destinations">Destinations</a></li>
              <li><a href="#suggestions">Suggestions</a></li>
              <li><a href="#prices">Prices</a></li>
            </ul>
            <button className="login-btn" onClick={toggleLoginModal}>Login</button>
          </nav>
        </div>
      </header>

      <main>
        <section className="intro" >
          <div className="intro-content">
            <h2>Discover Your Next Adventure</h2>
            <p>Find inspiring travel destinations with transparent pricing</p>
            <div className="search-bar">
              <input type="text" placeholder="Search destinations..." />
              <button className="search-btn">Search</button>
            </div>
          </div>
        </section>

        <section className="destinations">
          {destinations.map(dest => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onReserve={handleReserve}
            />
          ))}
        </section>
      </main>

      <footer>
        © 2024 TravelBuddy. All adventures await!
      </footer>

      <LoginModal isOpen={isLoginModalOpen} onClose={toggleLoginModal} />
      <ReservationModal 
        isOpen={isReservationModalOpen} 
        onClose={closeReservationModal}
        destination={selectedDestination}
      />
    </div>
  );
};

export default TravelBuddy;