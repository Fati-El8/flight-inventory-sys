import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./AdminDashboard.css";
import axios from 'axios';

const AdminDashboard = () => {
  // State for different entities with more detailed structures
  const [vols, setVols] = useState([]);
  const [aeroports, setAeroports] = useState([]);
  const [avions, setAvions] = useState([]);

  // Form hooks for different entities
  const volForm = useForm();
  const aeroportForm = useForm();
  const avionForm = useForm();

  // Flight (Vol) Management
  const ajouter_vol = (data) => {
    const newVol = { 
      ...data, 
      id_vol: Date.now(),
      date_vol: new Date(data.date_vol).toISOString()
    };
    setVols([...vols, newVol]);
    volForm.reset();
  };

  const supprimer_vol = (id) => {
    setVols(vols.filter(vol => vol.id_vol !== id));
  };

  const recuperer_vol = (id) => {
    return vols.find(vol => vol.id_vol === id);
  };

  const mettre_a_jour_vol = (id, updatedData) => {
    setVols(vols.map(vol => 
      vol.id_vol === id ? { ...vol, ...updatedData } : vol
    ));
  };

  // Airport (Aeroport) Management
  const ajouter_aeroport = (data) => {
    const newAeroport = { 
      ...data, 
      id_aeroport: Date.now()
    };
    setAeroports([...aeroports, newAeroport]);
    aeroportForm.reset();
  };

  const supprimer_aeroport = (id) => {
    setAeroports(aeroports.filter(aeroport => aeroport.id_aeroport !== id));
  };

  const recuperer_aeroport = (id) => {
    return aeroports.find(aeroport => aeroport.id_aeroport === id);
  };

  const mettre_a_jour_aeroport = (id, updatedData) => {
    setAeroports(aeroports.map(aeroport => 
      aeroport.id_aeroport === id ? { ...aeroport, ...updatedData } : aeroport
    ));
  };

  // Plane (Avion) Management
  const ajouter_avion = (data) => {
    const newAvion = { 
      ...data, 
      id_avion: Date.now(),
      annee_fab: parseInt(data.annee_fab)
    };
    setAvions([...avions, newAvion]);
    avionForm.reset();
  };

  const supprimer_avion = (id) => {
    setAvions(avions.filter(avion => avion.id_avion !== id));
  };

  const recuperer_avion = (id) => {
    return avions.find(avion => avion.id_avion === id);
  };

  const mettre_a_jour_avion = (id, updatedData) => {
    setAvions(avions.map(avion => 
      avion.id_avion === id ? { ...avion, ...updatedData } : avion
    ));
  };

  return (
    <div className="admin-dashboard">
      <h1>Tableau de Bord Admin - Travel Buddy</h1>

      {/* Gestion des Vols (Flights) */}
      <section className="admin-section">
        <h2>Gestion des Vols</h2>
        <form onSubmit={volForm.handleSubmit(ajouter_vol)}>
          <input 
            {...volForm.register("num_vol", { required: true })} 
            placeholder="Numéro de Vol" 
          />
          <input 
            {...volForm.register("vol_IATA", { required: true })} 
            placeholder="Code IATA" 
          />
          <input 
            type="datetime-local"
            {...volForm.register("date_vol", { required: true })} 
            placeholder="Date du Vol" 
          />
          <input 
            {...volForm.register("aeroport_depart", { required: true })} 
            placeholder="Aéroport de Départ" 
          />
          <input 
            {...volForm.register("aeroport_arrive", { required: true })} 
            placeholder="Aéroport d'Arrivée" 
          />
          <button type="submit">Ajouter Vol</button>
        </form>
        
        <table>
          <thead>
            <tr>
              <th>Num Vol</th>
              <th>Code IATA</th>
              <th>Date</th>
              <th>Départ</th>
              <th>Arrivée</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vols.map((vol) => (
              <tr key={vol.id_vol}>
                <td>{vol.num_vol}</td>
                <td>{vol.vol_IATA}</td>
                <td>{new Date(vol.date_vol).toLocaleString()}</td>
                <td>{vol.aeroport_depart}</td>
                <td>{vol.aeroport_arrive}</td>
                <td>
                  <button onClick={() => supprimer_vol(vol.id_vol)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Gestion des Aéroports (Airports) */}
      <section className="admin-section">
        <h2>Gestion des Aéroports</h2>
        <form onSubmit={aeroportForm.handleSubmit(ajouter_aeroport)}>
          <input 
            {...aeroportForm.register("aeroport_IATA", { required: true })} 
            placeholder="Code IATA" 
          />
          <input 
            {...aeroportForm.register("nom_aeroport", { required: true })} 
            placeholder="Nom de l'Aéroport" 
          />
          <input 
            {...aeroportForm.register("ville", { required: true })} 
            placeholder="Ville" 
          />
          <input 
            {...aeroportForm.register("pays", { required: true })} 
            placeholder="Pays" 
          />
          <input 
            type="number"
            {...aeroportForm.register("capacite", { required: true })} 
            placeholder="Capacité" 
          />
          <button type="submit">Ajouter Aéroport</button>
        </form>
        
        <table>
          <thead>
            <tr>
              <th>Code IATA</th>
              <th>Nom</th>
              <th>Ville</th>
              <th>Pays</th>
              <th>Capacité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {aeroports.map((aeroport) => (
              <tr key={aeroport.id_aeroport}>
                <td>{aeroport.aeroport_IATA}</td>
                <td>{aeroport.nom_aeroport}</td>
                <td>{aeroport.ville}</td>
                <td>{aeroport.pays}</td>
                <td>{aeroport.capacite}</td>
                <td>
                  <button onClick={() => supprimer_aeroport(aeroport.id_aeroport)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Gestion des Avions (Planes) */}
      <section className="admin-section">
        <h2>Gestion des Avions</h2>
        <form onSubmit={avionForm.handleSubmit(ajouter_avion)}>
          <input 
            {...avionForm.register("type_avion", { required: true })} 
            placeholder="Type d'Avion" 
          />
          <input 
            type="number"
            {...avionForm.register("capacite", { required: true })} 
            placeholder="Capacité" 
          />
          <input 
            type="number"
            {...avionForm.register("annee_fab", { required: true })} 
            placeholder="Année de Fabrication" 
          />
          <input 
            {...avionForm.register("model", { required: true })} 
            placeholder="Modèle" 
          />
          <button type="submit">Ajouter Avion</button>
        </form>
        
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Capacité</th>
              <th>Année Fab.</th>
              <th>Modèle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {avions.map((avion) => (
              <tr key={avion.id_avion}>
                <td>{avion.type_avion}</td>
                <td>{avion.capacite}</td>
                <td>{avion.annee_fab}</td>
                <td>{avion.model}</td>
                <td>
                  <button onClick={() => supprimer_avion(avion.id_avion)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;