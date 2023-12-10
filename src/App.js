

//App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/auth/Register'; // Import Register component
import Login from './components/auth/Login'; // Import Login component
import AppointList from './components/tasks/AppointList'; // Import AppointList component
import AppointForm from './components/tasks/AppointForm'; // Import AppointForm component
import AdminAppointList from './components/tasks/AdminAppointList'; // Import AdminAppointList component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} /> {/* Route for the Register component */}
        <Route path="/register" element={<Register />} /> {/* Route for the Register component */}
        <Route path="/login" element={<Login />} /> {/* Route for the Login component */}
        <Route path="/tasks" element={<AppointList />} /> {/* Route for the AppointList component */}
        <Route path="/tasks/new" element={<AppointForm />} /> {/* Route for the AppointForm component */}
        <Route path="/admin/appoints" element={<AdminAppointList />} /> {/* Route for the AdminAppointList component */}
      </Routes>
    </Router>
  );
}

export default App;





