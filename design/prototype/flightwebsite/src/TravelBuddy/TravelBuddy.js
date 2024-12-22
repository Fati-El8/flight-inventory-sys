import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TravelBuddy.css';
import LoginModal from './LoginModal';
import SignUpModal from '../signupModal/signupModal';
import ReservationModal from '../ReservationPage/ReservationModal';

const CityImage = ({ city, onReserve }) => {
  return (
    <div className="city-container" onClick={() => onReserve(city)}>
      <img src={city.image} alt={city.name} className="city-image" />
      <div className="city-overlay">
        <h3>{city.name}</h3>
        <p>{city.country}</p>
      </div>
    </div>
  );
};

const TravelBuddy = () => {
  const navigate = useNavigate();
  const cities = [
    { id: 1, name: 'Bali', country: 'Indonesia', image: '/bali.jpeg' },
    { id: 2, name: 'Paris', country: 'France', image: '/paris.jpg' },
    { id: 3, name: 'Tokyo', country: 'Japan', image: '/tokyo.jpg' },
    { id: 4, name: 'New York', country: 'USA', image: '/nyc.jpg' }
  ];

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const toggleLoginModal = () => setIsLoginModalOpen(!isLoginModalOpen);
  const toggleSignUpModal = () => setIsSignUpModalOpen(!isSignUpModalOpen);

  const handleBookFlight = () => {
    navigate('/reservation');
  };

  const handleReserve = (city) => {
    setSelectedCity(city);
    setIsReservationModalOpen(true);
  };

  const closeReservationModal = () => {
    setIsReservationModalOpen(false);
    setSelectedCity(null);
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
            <div className="auth-buttons">
              <button className="login-btn" onClick={toggleLoginModal}>Login</button>
              <button className="signup-btn" onClick={toggleSignUpModal}>Sign Up</button>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="intro">
          <div className="intro-content">
            <h2>Book Your Next Flight Adventure</h2>
            <p>Your one-stop platform for booking flights to amazing destinations worldwide. 
               Experience seamless travel planning with competitive prices and easy booking.</p>
            <button className="book-flight-btn" onClick={handleBookFlight}>
              Book Your Flight
            </button>
          </div>
        </section>

        <section className="cities-grid">
          {cities.map(city => (
            <CityImage
              key={city.id}
              city={city}
              onReserve={handleReserve}
            />
          ))}
        </section>
      </main>

      <footer>
        © 2024 TravelBuddy. Your journey begins here!
      </footer>

      <LoginModal isOpen={isLoginModalOpen} onClose={toggleLoginModal} />
      <SignUpModal isOpen={isSignUpModalOpen} onClose={toggleSignUpModal} />
      <ReservationModal 
        isOpen={isReservationModalOpen} 
        onClose={closeReservationModal}
        selectedCity={selectedCity?.name}
      />
    </div>
  );
};

export default TravelBuddy;