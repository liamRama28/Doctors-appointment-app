// Register.js
import React, { useState } from 'react';
import axios from '../../api'; // Import Axios with your configured base URL
import { Link, useNavigate } from 'react-router-dom'; // Updated import

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(''); // Added error state
  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate(); // Updated hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the email ends with '@gmail.com'
      if (!email.endsWith('@gmail.com')) {
        setError('Email must end with @gmail.com');
        return;
      }

      // Make a POST request to the registration endpoint
      const response = await axios.post('/api/users/register', formData);

      // Handle successful registration
      console.log('Registration successful:', response.data);
      // You can show a success message or redirect the user
      navigate('/tasks'); // Use navigate to redirect
    } catch (err) {
      if (err.response) {
        // Handle server-side errors (e.g., 400 Bad Request)
        console.error('Registration failed:', err.response.data);
        // You can show an error message to the user
        setError(err.response.data.error); // Set the error message from the server response
      } else if (err.request) {
        // Handle network errors (e.g., no response from server)
        console.error('Network error:', err.request);
        // You can show a different error message or retry the request
        setError('Network error. Please try again later.');
      } else {
        // Handle other errors
        console.error('Error:', err.message);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
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
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>} {/* Display the error message */}
      <Link to="/login">Already have an account? Login</Link> {/* Use Link for navigation */}
    </div>
  );
};

export default Register;
