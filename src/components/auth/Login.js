// Login.js

import React, { useState } from 'react';
import axios from '../../api.mjs'; // Ensure this is your configured Axios instance
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); // State to handle any login error

  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const response = await axios.post('/api/users/login', formData);

      // Store user token, ID, and admin status in local storage
      localStorage.setItem('auth-token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('isAdmin', response.data.isAdmin);

      // Redirect based on user role
      if (response.data.isAdmin) {
        navigate('/admin/appoints'); // Redirect admin to the admin dashboard
      } else {
        navigate('/tasks'); // Redirect regular user to their dashboard
      }
    } catch (err) {
      if (err.response) {
        // Display error message from server
        setError(err.response.data.error);
      } else {
        // Handle other errors like network issues
        setError('Login failed. Please try again later.');
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Don't have an account? Register</Link>
    </div>
  );
};

export default Login;
