//Login.js

import React, { useState } from 'react';
import axios from '../../api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', formData);

      console.log('Login successful:', response.data);

      if (email === 'admin@gmail.com') {
        // If the user is an admin, redirect to the admin dashboard
        navigate('/admin/appoints');
      } else {
        // For regular users, redirect to the user dashboard
        navigate('/tasks');
      }
    } catch (err) {
      if (err.response) {
        console.error('Login failed:', err.response.data);
      } else if (err.request) {
        console.error('Network error:', err.request);
      } else {
        console.error('Error:', err.message);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Don't have an account? Register</Link>
    </div>
  );
};

export default Login;