import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TravelBuddy.css';

const DestinationCard = ({ image, name, country, price, rating, onReserveClick }) => {
  return (
    <div className="card">
      <img src={image} alt={name} className="city-image" />
      <h3>{name}, {country}</h3>
      <div className="card-details">
        <span className="price">${price}</span>
        <span className="rating">⭐ {rating}</span>
      </div>
      <button className="reserve-btn" onClick={() => onReserveClick({ name, country, price })}>Reserve</button>
    </div>
  );
};

const TravelBuddy = () => {
  const [travelers, setTravelers] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDestinations, setShowDestinations] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showPrices, setShowPrices] = useState(false);
  const navigate = useNavigate();

  // Liste des destinations (quatre spécifiques et mondiales)
  const destinations = [
    {
      id: 1,
      name: 'Bali',
      country: 'Indonesia',
      image: '/bali.jpeg',
      price: 1200,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Paris',
      country: 'France',
      image: '/paris.jpg',
      price: 1500,
      rating: 4.9
    },
    {
      id: 3,
      name: 'Tokyo',
      country: 'Japan',
      image: '/tokyo.jpg',
      price: 1800,
      rating: 4.7
    },
    {
      id: 4,
      name: 'New York',
      country: 'USA',
      image: '/nyc.jpg',
      price: 1600,
      rating: 4.6
    },
    // Autres destinations mondiales ajoutées
    {
      id: 5,
      name: 'Sydney',
      country: 'Australia',
      image: '/sydney.jpg',
      price: 2000,
      rating: 4.7
    },
    {
      id: 6,
      name: 'Cape Town',
      country: 'South Africa',
      image: '/capetown.jpg',
      price: 1700,
      rating: 4.5
    },
    {
      id: 7,
      name: 'Rome',
      country: 'Italy',
      image: '/rome.jpg',
      price: 1400,
      rating: 4.8
    },
    {
      id: 8,
      name: 'Dubai',
      country: 'UAE',
      image: '/dubai.jpg',
      price: 2200,
      rating: 4.6
    }
  ];

  const handleTravelerChange = (number) => {
    setTravelers(number);
  };

  const handleReserveClick = (destination) => {
    setSelectedDestination(destination);
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate('/payment', {
      state: {
        destination: selectedDestination.name,
        country: selectedDestination.country,
        price: selectedDestination.price,
        travelers: travelers
      }
    });
  };

  const handleSearch = () => {
    setShowSearchBar(true);
  };

  const handleSearchSubmit = () => {
    const foundDestination = destinations.find(destination =>
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (foundDestination) {
      setSelectedDestination(foundDestination);
      setShowForm(true); // Show the reservation form
    }
  };

  const filteredDestinations = destinations.filter(destination =>
    destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="travel-buddy">
      <header>
        <div className="header-container">
          <a href="/" className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            TravelBuddy
          </a>
          <nav className="nav-menu">
            <ul className="nav-links">
              <li><a href="#destinations" onClick={() => setShowDestinations(!showDestinations)}>Destinations</a></li>
              <li><a href="#suggestions" onClick={() => setShowSuggestions(!showSuggestions)}>Suggestions</a></li>
              <li><a href="#prices" onClick={() => setShowPrices(!showPrices)}>Prices</a></li>
            </ul>
            <button className="login-btn">Login</button>
          </nav>
        </div>
      </header>

      <main>
        <section className="intro">
          <h2>Discover Your Next Adventure</h2>
          <p>Find inspiring travel destinations with transparent pricing</p>
        </section>

        <section className="search">
          <div className="travelers-selector">
            {[1, 2, 3, 4].map(num => (
              <button
                key={num}
                className={travelers === num ? 'active' : ''}
                onClick={() => handleTravelerChange(num)}
              >
                {num}
              </button>
            ))}
            <span>Travelers</span>
          </div>

          <button className="find-destinations-btn" onClick={handleSearch}>Find Destinations</button>

          {showSearchBar && (
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearchSubmit}>Search</button>
            </div>
          )}
        </section>

        {showDestinations && (
          <section className="destinations">
            {filteredDestinations.map(dest => (
              <DestinationCard
                key={dest.id}
                name={dest.name}
                country={dest.country}
                image={dest.image}
                price={dest.price}
                rating={dest.rating}
                onReserveClick={handleReserveClick}
              />
            ))}
          </section>
        )}

        {showSuggestions && (
          <section className="suggestions">
            <h3>Suggestions for You</h3>
            <p>Explore some of the best destinations recommended for you!</p>
          </section>
        )}

        {showPrices && (
          <section className="prices">
            <h3>Price Range</h3>
            <p>Here are the price ranges for each destination.</p>
          </section>
        )}

        {showForm && selectedDestination && (
          <section className="reservation-form">
            <h3>Reserve your trip to {selectedDestination.name}</h3>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Number of Travelers: </label>
                <input type="number" value={travelers} onChange={(e) => setTravelers(e.target.value)} />
              </div>
              <div>
                <label>Your Name:   </label>
                <input type="text" placeholder="Enter your name" required />
              </div>
              <div>
                <label>Contact Information: </label>
                <input type="email" placeholder="Enter your email" required />
              </div>
              <button type="submit">Confirm Reservation</button>
            </form>
          </section>
        )}
      </main>

      <footer>
        © 2024 TravelBuddy. All adventures await!
      </footer>
    </div>
  );
};

export default TravelBuddy;
