// AdminAppointList.js

import React, { useEffect, useState } from 'react';
import axios from '../../api.mjs'; // Ensure this is correctly configured
import { Link, useNavigate } from 'react-router-dom';
import './AdminAppointList.css'; // Your CSS file for styling

const AdminAppointList = () => {
  const [appoints, setAppoints] = useState([]);
  const [editedAppoint, setEditedAppoint] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [characterLimitExceeded, setCharacterLimitExceeded] = useState(false);
  const [acceptedAppoints, setAcceptedAppoints] = useState(new Set());

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppoints = async () => {
      try {
        const authToken = localStorage.getItem('auth-token');
        if (!authToken) {
          console.error('No authentication token found');
          navigate('/login'); // Redirect to login if no token
          return;
        }

        const response = await axios.get('/api/tasks/list', {
          headers: {
            'auth-token': authToken
          }
        });
        setAppoints(response.data);
      } catch (err) {
        console.error('Error fetching Appointments:', err.message);
      }
    };

    fetchAppoints();
  }, [navigate]);

  const handleDelete = async (appointId) => {
    try {
      await axios.delete(`/api/tasks/delete/${appointId}`, {
        headers: {
          'auth-token': localStorage.getItem('auth-token')
        }
      });
      setAppoints(appoints.filter((appoint) => appoint._id !== appointId));
    } catch (err) {
      console.error('Error deleting appointment:', err.message);
    }
  };

  const handleEdit = (appoint) => {
    setEditedAppoint(appoint);
    setEditedTitle(appoint.title);
    setEditedDescription(appoint.description);
  };

  const handleSaveEdit = async () => {
    if (editedDescription.length > 140) {
      setCharacterLimitExceeded(true);
      return;
    } else {
      setCharacterLimitExceeded(false);
    }

    try {
      const response = await axios.put(`/api/tasks/edit/${editedAppoint._id}`, {
        title: editedTitle,
        description: editedDescription,
      }, {
        headers: {
          'auth-token': localStorage.getItem('auth-token')
        }
      });

      setAppoints(appoints.map((appoint) => 
        appoint._id === editedAppoint._id ? response.data : appoint));

      setEditedAppoint(null);
      setEditedTitle('');
      setEditedDescription('');
    } catch (err) {
      console.error('Error updating appointment:', err.message);
    }
  };

  const handleAccept = (appointId) => {
    setAcceptedAppoints((prevAcceptedAppoints) => {
      const updatedAcceptedAppoints = new Set(prevAcceptedAppoints);
      if (updatedAcceptedAppoints.has(appointId)) {
        updatedAcceptedAppoints.delete(appointId);
      } else {
        updatedAcceptedAppoints.add(appointId);
      }
      return updatedAcceptedAppoints;
    });
  };

  const isAppointAccepted = (appointId) => acceptedAppoints.has(appointId);

  return (
    <div>
      <h2>Appointment List</h2>
      <ul>
        {appoints.map((appoint) => (
          <li key={appoint._id} className={isAppointAccepted(appoint._id) ? 'accepted' : ''}>
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
                <button onClick={handleSaveEdit}>Save</button>
              </div>
            ) : (
              <div>
                <div>{appoint.title}</div>
                <div>{appoint.description}</div>
                <div>{appoint.doctor}</div>
                <div>{appoint.date}</div>
                <div>{appoint.timeSlot}</div>
                <button onClick={() => handleEdit(appoint)}>Edit</button>
                <button onClick={() => handleDelete(appoint._id)}>Delete</button>
                <button
                  onClick={() => handleAccept(appoint._id)}
                  className={isAppointAccepted(appoint._id) ? 'unaccept-button' : 'accept-button'}>
                  {isAppointAccepted(appoint._id) ? 'Unaccept' : 'Accept'}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <Link to="/tasks">Back to Appointment List</Link>
      <button onClick={() => navigate('/login')}>Log Out</button>
    </div>
  );
};

export default AdminAppointList;
