// AppointForm.js

import React, { useState } from 'react';
import axios from '../../api.mjs'; // Ensure this points to your configured Axios instance
import { useNavigate } from 'react-router-dom';

const AppointForm = () => {
  const [appoint, setAppoint] = useState({
    title: '',
    description: '',
    doctor: '',
    date: '',
    timeSlot: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { title, description, doctor, date, timeSlot } = appoint;
  const navigate = useNavigate();

  // Handle changes in the form inputs
  const handleChange = (e) => {
    setAppoint({ ...appoint, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setSuccessMessage('');

    // Retrieve the authentication token from local storage
    const authToken = localStorage.getItem('auth-token');
    if (!authToken) {
      setError('Authentication error: No token provided');
      return;
    }

    try {
      // Check if the total character count of title and description exceeds 140
      if (title.length + description.length > 140) {
        setError('Text cannot exceed 140 characters');
        return;
      }

      // Make a POST request to create a new appointment, including the auth token in headers
      const response = await axios.post('/api/tasks/create', appoint, {
        headers: {
          'auth-token': authToken
        }
      });

      // Handle successful response
      setSuccessMessage('Appointment created successfully!');
      setAppoint({ title: '', description: '', doctor: '', date: '', timeSlot: '' }); // Clear the form
      navigate('/tasks'); // Redirect to appointments list or dashboard as needed
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Create Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Reason for booking"
            name="description"
            value={description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <select name="doctor" value={doctor} onChange={handleChange} required>
            <option value="">Select a Doctor</option>
            <option value="Doctor A">Doctor A</option>
            <option value="Doctor B">Doctor B</option>
            <option value="Doctor C">Doctor C</option>
          </select>
        </div>
        <div>
          <input
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <select name="timeSlot" value={timeSlot} onChange={handleChange} required>
            <option value="">Select a Time</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
          </select>
        </div>
        <button type="submit">Create Appointment</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      
    </div>
  );
};

export default AppointForm;
