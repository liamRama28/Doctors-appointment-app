//AppointList.js

import React, { useEffect, useState } from 'react';
import axios from '../../api'; // Import Axios with your configured base URL
import { Link, useNavigate } from 'react-router-dom';  // <-- Add this line
import './AppointList.css'; // Import the CSS file for styling



const AppointList = () => {
  // State variables
  const [appoints, setAppoints] = useState([]); // To store appointments
  const [editedAppoint, setEditedAppoint] = useState(null); // To track edited appointment
  const [editedTitle, setEditedTitle] = useState(''); // To edit appointment title
  const [editedDescription, setEditedDescription] = useState(''); // To edit appointment description
  const [characterLimitExceeded, setCharacterLimitExceeded] = useState(false); // To track character limit exceeded


  useEffect(() => {
    // Fetch appointments from the server on component mount
    const fetchAppoints = async () => {
      try {
        const response = await axios.get('/api/tasks/list');
        
        setAppoints(response.data);
      } catch (err) {
        console.error('Error fetching appointments:', err.message);
      }
    };




 fetchAppoints();
  }, []);


  const navigate = useNavigate(); // Add this line to get the navigate function


  return (
    <div>
      <h2>Appointment List</h2>
      <ul>
        {appoints.map((appoint) => (
          <li key={appoint._id}>
            {appoint === editedAppoint ? (
              // Render edit mode when appointment is being edited
              <div>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                  value={editedDescription}
                  onChange={(e) => {
                    if (e.target.value.length <= 140) {
                      setCharacterLimitExceeded(false);
                      setEditedDescription(e.target.value);
                    }
                  }}
                />
                {characterLimitExceeded && <p>Error: Character limit exceeded (140 characters max)</p>}
              </div>
            ) : (
              // Render view mode when not in edit mode
              <div>
                <div>{appoint.title}</div>
                <div>{appoint.description}</div>
                <div>{appoint.doctor}</div>
                <div>{appoint.date}</div>
                <div>{appoint.timeSlot}</div>
                
              </div>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/tasks/new')}>Create New Appointment</button>
<button onClick={() => navigate('/login')}>Log Out</button>
    </div>
  );
};

export default AppointList;