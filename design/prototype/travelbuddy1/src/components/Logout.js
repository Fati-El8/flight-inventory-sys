// Logout.js

import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="logout-container">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
