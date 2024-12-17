import React, { useState } from 'react';
import './Reservation.css';

const ReservationModal = ({ isOpen, onClose, destination }) => {
  const [reservation, setReservation] = useState({
    id_passager: null,
    num_passeport: '',
    num_carte_identite: '',
    nationalite: '',
    adresse: '',
    telephone: '',
    destination: destination ? `${destination.name}, ${destination.country}` : ''
  });

  const [reservations, setReservations] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const ajouter_reservation = (e) => {
    e.preventDefault();
    const newReservation = {
      ...reservation,
      id_passager: Date.now() // Simple unique ID generation
    };

    setReservations(prev => [...prev, newReservation]);
    
    // Reset form after submission
    setReservation({
      id_passager: null,
      num_passeport: '',
      num_carte_identite: '',
      nationalite: '',
      adresse: '',
      telephone: '',
      destination: destination ? `${destination.name}, ${destination.country}` : ''
    });
  };

  const supprimer_reservation = (id) => {
    setReservations(prev => prev.filter(res => res.id_passager !== id));
  };

  const recuperer_reservation = (id) => {
    return reservations.find(res => res.id_passager === id);
  };

  const mettre_a_jour_reservation = (id, updatedData) => {
    setReservations(prev => 
      prev.map(res => 
        res.id_passager === id ? { ...res, ...updatedData } : res
      )
    );
  };

  if (!isOpen) return null;

  return (
    <div className="reservation-modal-overlay">
      <div className="reservation-modal">
        <div className="modal-header">
          <h2>Réservation de Vol</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={ajouter_reservation} className="reservation-form">
          <div className="form-group">
            <label>Destination</label>
            <input 
              type="text" 
              value={reservation.destination} 
              readOnly 
            />
          </div>

          <div className="form-group">
            <label>Numéro de Passeport</label>
            <input 
              type="text" 
              name="num_passeport"
              value={reservation.num_passeport}
              onChange={handleInputChange}
              placeholder="Numéro de passeport"
              required 
            />
          </div>

          <div className="form-group">
            <label>Numéro de Carte d'Identité</label>
            <input 
              type="text" 
              name="num_carte_identite"
              value={reservation.num_carte_identite}
              onChange={handleInputChange}
              placeholder="Numéro de carte d'identité"
              required 
            />
          </div>

          <div className="form-group">
            <label>Nationalité</label>
            <input 
              type="text" 
              name="nationalite"
              value={reservation.nationalite}
              onChange={handleInputChange}
              placeholder="Nationalité"
              required 
            />
          </div>

          <div className="form-group">
            <label>Adresse</label>
            <input 
              type="text" 
              name="adresse"
              value={reservation.adresse}
              onChange={handleInputChange}
              placeholder="Adresse"
              required 
            />
          </div>

          <div className="form-group">
            <label>Téléphone</label>
            <input 
              type="tel" 
              name="telephone"
              value={reservation.telephone}
              onChange={handleInputChange}
              placeholder="Numéro de téléphone"
              required 
            />
          </div>

          <button type="submit" className="submit-reservation-btn">
            Confirmer la Réservation
          </button>
        </form>

        {/* Reservation List */}
        {reservations.length > 0 && (
          <div className="reservations-list">
            <h3>Réservations Existantes</h3>
            <table>
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Passeport</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => (
                  <tr key={res.id_passager}>
                    <td>{res.destination}</td>
                    <td>{res.num_passeport}</td>
                    <td>
                      <button 
                        onClick={() => supprimer_reservation(res.id_passager)}
                        className="delete-btn"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationModal;