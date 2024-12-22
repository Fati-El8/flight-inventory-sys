import axiosInstance from '../services/axiosConfig';

export const searchFlights = async (nameAeroportDepart, nameAeroportArrive) => {
  try {
    const token = localStorage.getItem('token');
    // Extract the actual value from the object
    const departAirport = typeof nameAeroportDepart === 'object' ? 
      nameAeroportDepart.origin : nameAeroportDepart;
    const arriveAirport = typeof nameAeroportArrive === 'object' ? 
      nameAeroportArrive.destination : nameAeroportArrive;
      console.log("Request Body:", {
        nameAeroportDepart,
        nameAeroportArrive
      });
    const response = await axiosInstance.post(
      'http://localhost:8080/api/vols/search',
      {
        nameAeroportDepart: departAirport,
        nameAeroportArrive: arriveAirport
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch flights: ' + error.message);
  }
};

export const reserveFlight = async (flightId, passengerDetails) => {
  try {
    const response = await axiosInstance.post('/flights/reserve', {
      flightId,
      passengerDetails
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to reserve flight: ' + error.message);
  }
};