import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TravelBuddy from './TravelBuddy/TravelBuddy';
import AddFlight from './travel-buddy-admin/AddFlight'; // Assurez-vous que ce composant existe

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TravelBuddy />} />
        <Route path="/travel-buddy-admin/AddFlight" element={<AddFlight />} />
      </Routes>
    </Router>
  );
};

export default App;
