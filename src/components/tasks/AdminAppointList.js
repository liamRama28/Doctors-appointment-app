import React, { useEffect, useState } from 'react';
import axios from '../../api'; // Import Axios with your configured base URL
import { Link, useNavigate } from 'react-router-dom';  // <-- Add this line
import './AdminAppointList.css'; // Import the CSS file for styling

const AppointList = () => {
  // State variables
  const [appoints, setAppoints] = useState([]); // To store appointments
  const [editedAppoint, setEditedAppoint] = useState(null); // To track edited appointment
  const [editedTitle, setEditedTitle] = useState(''); // To edit appointment title
  const [editedDescription, setEditedDescription] = useState(''); // To edit appointment description
  const [characterLimitExceeded, setCharacterLimitExceeded] = useState(false); // To track character limit exceeded
  const [acceptedAppoints, setAcceptedAppoints] = useState(new Set()); // To track accepted appointments

  // Fetch appointments from the server on component mount
  useEffect(() => {
    const fetchAppoints = async () => {
      try {
        const response = await axios.get('/api/tasks/list');
    
        setAppoints(response.data);
      } catch (err) {
        console.error('Error fetching Appointments:', err.message);
      }
    };

    fetchAppoints();
  }, []);

  // Handle the deletion of an appointment
  const handleDelete = async (appointId) => {
    try {
      await axios.delete(`/api/tasks/delete/${appointId}`);
      setAppoints((prevAppoints) => prevAppoints.filter((appoint) => appoint._id !== appointId));
    } catch (err) {
      console.error('Error deleting appointment:', err.message);
    }
  };

  // Handle the editing of an appointment
  const handleEdit = (appoint) => {
    setEditedAppoint(appoint);
    setEditedTitle(appoint.title);
    setEditedDescription(appoint.description);
  };

  // Handle saving the edited appointment
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
      });

      setAppoints((prevAppoints) =>
        prevAppoints.map((appoint) => (appoint._id === editedAppoint._id ? response.data : appoint))
      );

      // Clear the edited appointment state
      setEditedAppoint(null);
      setEditedTitle('');
      setEditedDescription('');
    } catch (err) {
      console.error('Error updating appointment:', err.message);
    }
  };

  // Handle accepting or unaccepting an appointment
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

  // Check if an appointment is accepted
  const isAppointAccepted = (appointId) => acceptedAppoints.has(appointId);

  const navigate = useNavigate(); // Add this line to get the navigate function

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
              </div>
            )}
            <button onClick={() => handleEdit(appoint)}>Edit</button>
            <button onClick={() => handleDelete(appoint._id)}>Delete</button>
            <button
              onClick={() => handleAccept(appoint._id)}
              className={isAppointAccepted(appoint._id) ? 'unaccept-button' : 'accept-button'}
            >
              {isAppointAccepted(appoint._id) ? 'Unaccept' : 'Accept'}
            </button>
          </li>
        ))}
      </ul>

      <div>
      <button onClick={() => navigate('/login')}>Log Out</button>
      </div>
    </div>
  );
};

export default AppointList;
