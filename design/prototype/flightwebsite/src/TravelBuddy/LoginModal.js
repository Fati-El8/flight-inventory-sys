import React, { useState } from 'react';
import axiosInstance from '../services/axiosConfig';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axiosInstance.post('http://localhost:8080/api/auth/login', {
        username,
        password
      });

      const { token, roles, id, username: responseUsername } = response.data;
      console.log(roles)

      localStorage.setItem('token', token);
      console.log('Token after storage:', localStorage.getItem('token'));
      localStorage.setItem('username', responseUsername);
      localStorage.setItem('userId', id);

      const isAdmin = roles.some(role => 
        role.toUpperCase().includes('ADMIN') || 
        role.toUpperCase().includes('ROLE_ADMIN')
      );
      console.log(isAdmin)

      if (isAdmin) {
        navigate('/travel-buddy-admin/AddFlight');
      } else {
        onClose();
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Login failed');
      } else if (err.request) {
        setError('No response from server');
      } else {
        setError('Error during login request');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Login</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleLogin}>
            <label>
              Username
              <input 
                type="text" 
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </label>
            <label>
              Password
              <input 
                type="password" 
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </label>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;