import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./AdminDashboard.css";
import axiosInstance from '../services/axiosConfig';

const AdminDashboard = () => {
  // State for different entities with more detailed structures
  const [vols, setVols] = useState([]);
  const [aeroports, setAeroports] = useState([]);
  const [avions, setAvions] = useState([]);

  // Form hooks for different entities
  const volForm = useForm();
  const aeroportForm = useForm();
  const avionForm = useForm();
  const API_BASE_URL = 'http://localhost:8080/api';
  // Flight Management Functions
  const ajouter_vol = async (data) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token format:', `Bearer ${token}`); // Debug log
  
      if (!token) {
        console.error('No token found');
        return { success: false, message: 'Non authentifié' };
      }
  
      // Format the date properly
      const formattedData = {
        ...data,
        date_vol: data.date_vol ? new Date(data.date_vol).toISOString() : null,
        aeroportDepart: { name_aeroport: data.aeroportDepartName },
        aeroportArrive: { name_aeroport: data.aeroportArriveName }
      };
      
      console.log('Sending flight data:', formattedData); // Debug log
  
      // Remove the duplicate Authorization header since it's already in the interceptor
      const response = await axiosInstance.post('http://localhost:8080/api/vols', formattedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },});
      
      console.log('Response:', response); // Debug log
  
      if (response.status === 201 || response.status === 200) {
        await charger_tous_les_vols();
        volForm.reset();
        return { success: true, message: 'Vol ajouté avec succès' };
      }
    } catch (error) {
      console.error('Full error object:', error); // Debug log
      
      if (error.response?.status === 401) {
        // Handle unauthorized error
        console.log('Unauthorized - redirecting to login');
        // You might want to redirect to login here
        return { success: false, message: 'Session expirée. Veuillez vous reconnecter.' };
      }
      
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erreur lors de l\'ajout du vol' 
      };
    }
  };

const supprimer_vol = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { success: false, message: 'Non authentifié' };
    }

    const response = await axiosInstance.delete(`${API_BASE_URL}/vols/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (response.status === 200) {
      setVols(vols.filter(vol => vol.id_vol !== id));
      return { success: true, message: 'Vol supprimé avec succès' };
    }
  } catch (error) {
    if (error.response?.status === 401) {
      return { success: false, message: 'Session expirée. Veuillez vous reconnecter.' };
    }
    console.error('Erreur lors de la suppression du vol:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Erreur lors de la suppression du vol'
    };
  }
};

const recuperer_vol = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { success: false, message: 'Non authentifié' };
    }

    const response = await axiosInstance.get(`${API_BASE_URL}/vols/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (error) {
    if (error.response?.status === 401) {
      return { success: false, message: 'Session expirée. Veuillez vous reconnecter.' };
    }
    console.error('Erreur lors de la récupération du vol:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Erreur lors de la récupération du vol'
    };
  }
};

const mettre_a_jour_vol = async (id, updatedData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { success: false, message: 'Non authentifié' };
    }

    const formattedData = {
      ...updatedData,
      date_vol: new Date(updatedData.date_vol).toISOString()
    };

    const response = await axiosInstance.put(`${API_BASE_URL}/vols/${id}`, formattedData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (response.status === 200) {
      await charger_tous_les_vols(); // Reload all flights after update
      return { success: true, message: 'Vol mis à jour avec succès' };
    }
  } catch (error) {
    if (error.response?.status === 401) {
      return { success: false, message: 'Session expirée. Veuillez vous reconnecter.' };
    }
    console.error('Erreur lors de la mise à jour du vol:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Erreur lors de la mise à jour du vol'
    };
  }
};

const charger_tous_les_vols = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { success: false, message: 'Non authentifié' };
    }

    const response = await axiosInstance.get(`${API_BASE_URL}/vols`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (response.status === 200) {
      setVols(response.data);
      return { success: true, data: response.data };
    }
  } catch (error) {
    if (error.response?.status === 401) {
      return { success: false, message: 'Session expirée. Veuillez vous reconnecter.' };
    }
    console.error('Erreur lors du chargement des vols:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Erreur lors du chargement des vols'
    };
  }
};

// Modified form submit handler to handle the response
const onSubmitVol = async (data) => {
  const result = await ajouter_vol(data);
  if (result.success) {
    // Show success message
    alert(result.message);
    volForm.reset();
  } else {
    // Show error message
    alert(result.message);
  }
};

// Modified delete handler to handle the response
const handleDeleteVol = async (id) => {
  if (window.confirm('Êtes-vous sûr de vouloir supprimer ce vol ?')) {
    const result = await supprimer_vol(id);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  }
};
  // Airport (Aeroport) Management
  const ajouter_aeroport = async (data) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return { success: false, message: 'Non authentifié' };
      }
  
      console.log('Envoi des données aéroport:', data); // Debug log
  
      const response = await axiosInstance.post('http://localhost:8080/api/Aeroports', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
      console.log('Réponse:', response); // Debug log
  
      if (response.status === 201 || response.status === 200) {
        await charger_tous_les_aeroports();
        aeroportForm.reset();
        return { success: true, message: 'Aéroport ajouté avec succès' };
      }
    } catch (error) {
      console.error('Erreur complète:', error);
      
      if (error.response?.status === 401) {
        return { success: false, message: 'Session expirée. Veuillez vous reconnecter.' };
      }
      
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erreur lors de l\'ajout de l\'aéroport' 
      };
    }
  };
  
  const supprimer_aeroport = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, message: 'Non authentifié' };
      }
  
      const response = await axiosInstance.delete(`${API_BASE_URL}/Aeroports/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        setAeroports(aeroports.filter(aeroport => aeroport.id_aeroport !== id));
        return { success: true, message: 'Aéroport supprimé avec succès' };
      }
    } catch (error) {
      if (error.response?.status === 401) {
        return { success: false, message: 'Session expirée. Veuillez vous reconnecter.' };
      }
      console.error('Erreur lors de la suppression de l\'aéroport:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la suppression de l\'aéroport'
      };
    }
  };
  
  const recuperer_aeroport = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, message: 'Non authentifié' };
      }
  
      const response = await axiosInstance.get(`${API_BASE_URL}/Aeroports/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        return { success: true, data: response.data };
      }
    } catch (error) {
      if (error.response?.status === 401) {
        return { success: false, message: 'Session expirée. Veuillez vous reconnecter.' };
      }
      console.error('Erreur lors de la récupération de l\'aéroport:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération de l\'aéroport'
      };
    }
  };
  
  const mettre_a_jour_aeroport = async (id, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, message: 'Non authentifié' };
      }
  
      const response = await axiosInstance.put(`${API_BASE_URL}/Aeroports/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        await charger_tous_les_aeroports();
        return { success: true, message: 'Aéroport mis à jour avec succès' };
      }
    } catch (error) {
      if (error.response?.status === 401) {
        return { success: false, message: 'Session expirée. Veuillez vous reconnecter.' };
      }
      console.error('Erreur lors de la mise à jour de l\'aéroport:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la mise à jour de l\'aéroport'
      };
    }
  };
  
  const charger_tous_les_aeroports = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, message: 'Non authentifié' };
      }
  
      const response = await axiosInstance.get(`${API_BASE_URL}/Aeroports`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        setAeroports(response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      if (error.response?.status === 401) {
        return { success: false, message: 'Session expirée. Veuillez vous reconnecter.' };
      }
      console.error('Erreur lors du chargement des aéroports:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors du chargement des aéroports'
      };
    }
  };
  
  // Gestionnaire de soumission du formulaire
  const onSubmitAeroport = async (data) => {
    const result = await ajouter_aeroport(data);
    if (result.success) {
      alert(result.message);
      aeroportForm.reset();
    } else {
      alert(result.message);
    }
  };
  
  // Gestionnaire de suppression
  const handleDeleteAeroport = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet aéroport ?')) {
      const result = await supprimer_aeroport(id);
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    }
  };
  // Plane (Avion) Management
  const ajouter_avion = async (data) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return { success: false, message: 'Non authentifié' };
      }
  
      console.log('Envoi des données avion:', data); // Debug log
  
      const response = await axiosInstance.post('http://localhost:8080/api/planes', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
      console.log('Réponse:', response); // Debug log
  
      if (response.status === 201 || response.status === 200) {
        await charger_tous_les_avions();
        avionForm.reset();
        return { success: true, message: 'Avion ajouté avec succès' };
      }
    } catch (error) {
      console.error('Erreur complète:', error);
      
      if (error.response?.status === 401) {
        return { success: false, message: 'Session expirée. Veuillez vous reconnecter.' };
      }
      
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erreur lors de l\'ajout de l\'avion' 
      };
    }
  };
  
  const supprimer_avion = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, message: 'Non authentifié' };
      }
  
      const response = await axiosInstance.delete(`${API_BASE_URL}/planes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        setAvions(avions.filter(avion => avion.id_avion !== id));
        return { success: true, message: 'Avion supprimé avec succès' };
      }
    } catch (error) {
      if (error.response?.status === 401) {
        return { success: false, message: 'Session expirée. Veuillez vous reconnecter.' };
      }
      console.error('Erreur lors de la suppression de l\'avion:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la suppression de l\'avion'
      };
    }
  };
  
  const recuperer_avion = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, message: 'Non authentifié' };
      }
  
      const response = await axiosInstance.get(`${API_BASE_URL}/planes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        return { success: true, data: response.data };
      }
    } catch (error) {
      if (error.response?.status === 401) {
        return { success: false, message: 'Session expirée. Veuillez vous reconnecter.' };
      }
      console.error('Erreur lors de la récupération de l\'avion:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération de l\'avion'
      };
    }
  };
  
  const mettre_a_jour_avion = async (id, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, message: 'Non authentifié' };
      }
  
      const response = await axiosInstance.put(`${API_BASE_URL}/planes/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        await charger_tous_les_avions();
        return { success: true, message: 'Avion mis à jour avec succès' };
      }
    } catch (error) {
      if (error.response?.status === 401) {
        return { success: false, message: 'Session expirée. Veuillez vous reconnecter.' };
      }
      console.error('Erreur lors de la mise à jour de l\'avion:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la mise à jour de l\'avion'
      };
    }
  };
  
  const charger_tous_les_avions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, message: 'Non authentifié' };
      }
  
      const response = await axiosInstance.get(`${API_BASE_URL}/planes`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        setAvions(response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      if (error.response?.status === 401) {
        return { success: false, message: 'Session expirée. Veuillez vous reconnecter.' };
      }
      console.error('Erreur lors du chargement des avions:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors du chargement des avions'
      };
    }
  };
  
  // Gestionnaire de soumission du formulaire
  const onSubmitAvion = async (data) => {
    const result = await ajouter_avion(data);
    if (result.success) {
      alert(result.message);
      avionForm.reset();
    } else {
      alert(result.message);
    }
  };
  
  // Gestionnaire de suppression
  const handleDeleteAvion = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet avion ?')) {
      const result = await supprimer_avion(id);
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    }
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