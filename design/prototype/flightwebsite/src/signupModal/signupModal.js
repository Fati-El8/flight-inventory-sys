import React, { useState } from 'react';
import axios from 'axios';

const SignUpModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    AdPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', {
        username: formData.username,
        password: formData.password,
        role: [formData.AdPassword] // Default role as passager
      });
      const { token, roles, id, username: responseUsername } = response.data;
      console.log(roles)

      localStorage.setItem('token', token);
      console.log('Token after storage:', localStorage.getItem('token'));
      localStorage.setItem('username', responseUsername);
      localStorage.setItem('userId', id);

      if (response.data.message === "User registered successfully!") {
        alert('Registration successful!');
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert('An error occurred during registration');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Sign Up</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <label>
              Username :
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter your username"
              />
            </label>
            <label>
              Password :
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </label>
            <label>
              Admin Password :
              <input
                type="password"
                name="AdPassword"
                value={formData.AdPassword}
                onChange={handleChange}
                placeholder="For Admin"
              />
            </label>
            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;