import React, { useEffect, useState } from 'react';
import axios from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment'; // Import Moment.js
import './AppointList.css';

const AppointList = () => {
  const [appoints, setAppoints] = useState([]);
  const [editedAppoint, setEditedAppoint] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [characterLimitExceeded, setCharacterLimitExceeded] = useState(false);

  useEffect(() => {
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

  const navigate = useNavigate();

  return (
    <div>
      <h2>Appointment List</h2>
      <ul>
        {appoints.map((appoint) => (
          <li key={appoint._id}>
            {appoint === editedAppoint ? (
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
              <div>
                <div>{appoint.title}</div>
                <div>{appoint.description}</div>
                <div>{appoint.doctor}</div>
                <div>{moment(appoint.date).format('MMMM D, YYYY')}</div>
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
