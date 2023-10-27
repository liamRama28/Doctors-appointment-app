import React, { useState } from 'react';

const AppointItem = ({ appoint, updateAppoint, deleteAppoint }) => {
  // State variables
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(appoint.text);

  // Handle the "Edit" button click
  const handleEdit = () => {
    setEditing(true);
  };

  // Handle the "Save" button click
  const handleSave = () => {
    if (editedText.trim() === '') {
      return; // Prevent saving empty appointment text
    }

    // Create an updated appointment object with edited text
    const updatedAppoint = {
      ...appoint,
      text: editedText,
    };

    // Call the updateAppoint function with the updated appointment
    updateAppoint(updatedAppoint);

    // Exit edit mode
    setEditing(false);
  };

  // Handle the "Delete" button click
  const handleDelete = () => {
    // Call the deleteAppoint function with the appointment's id
    deleteAppoint(appoint.id);
  };

  return (
    <li>
      {isEditing ? (
        // Render edit mode with input field and "Save" button
        <div>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        // Render view mode with appointment text and "Edit" / "Delete" buttons
        <div>
          {appoint.text}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </li>
  );
};

export default AppointItem;
