// src/pages/PaymentPage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentPage.css'; // Assurez-vous que vous avez un fichier CSS pour les styles

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { destination, price, travelers } = location.state || {};

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  // Gérer les changements des champs de formulaire de paiement
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value
    });
  };

  // Soumettre le paiement
  const handlePayment = () => {
    alert('Paiement effectué avec succès!');
    navigate('/'); // Rediriger vers la page d'accueil après paiement
  };

  const totalPrice = price * travelers;

  return (
    <div className="payment-page">
      <div className="payment-header">
        <h2>Payment Information</h2>
        <p><strong>Destination:</strong> {destination}</p>
        <p><strong>Price per Traveler:</strong> ${price}</p>
        <p><strong>Number of Travelers:</strong> {travelers}</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
      </div>

      <div className="payment-form">
        <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
          <div className="form-group">
            <label>Card Number:</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleInputChange}
              placeholder="Enter your card number"
              required
            />
          </div>
          <div className="form-group">
            <label>Card Holder Name:</label>
            <input
              type="text"
              name="cardHolder"
              value={paymentInfo.cardHolder}
              onChange={handleInputChange}
              placeholder="Enter cardholder's name"
              required
            />
          </div>
          <div className="form-group">
            <label>Expiry Date (MM/YY):</label>
            <input
              type="text"
              name="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="form-group">
            <label>CVV:</label>
            <input
              type="text"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={handleInputChange}
              placeholder="CVV"
              required
            />
          </div>

          {/* Bouton pour soumettre le paiement */}
          <button type="submit">Pay Now</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
