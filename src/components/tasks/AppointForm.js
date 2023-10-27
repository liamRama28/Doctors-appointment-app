import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api';
import './AppointForm.css';

const AppointForm = () => {
  // State variables
  const [appoint, setAppoint] = useState({
    title: '',
    description: '',
    doctor: '',
    date: '',
    time: '',
  });
  const [error, setError] = useState('');

  const { title, description, doctor, date, time } = appoint;

  // Handle changes in the form inputs
  const handleChange = (e) => {
    setAppoint({ ...appoint, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the total character count of title and description exceeds 140
      if (appoint.title.length + appoint.description.length > 140) {
        setError('Text cannot exceed 140 characters');
        return;
      }

      // Make a POST request to create a new appointment
      const response = await axios.post('/api/tasks/create', appoint);

      console.log('Appointment created:', response.data);

      // Clear form fields
      setAppoint({ title: '', description: '', doctor: '', date: '', time: '' });
    } catch (err) {
      console.error('Error creating appointment:', err.message);
    }
  };

  return (
    <div>
      <h2>Create Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
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
            placeholder="Date"
            name="date"
            value={date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <select name="time" value={time} onChange={handleChange} required>
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
      {error && <div className="error-message">{error}</div>}
      <Link to="/tasks" className="back-button">
        Back to Appointment List
      </Link>
    </div>
  );
};

export default AppointForm;
