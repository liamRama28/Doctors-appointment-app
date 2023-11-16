// api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://doctors-appointment-app-jkgz.onrender.com', // Replace with your backend's URL
});

export default instance;
