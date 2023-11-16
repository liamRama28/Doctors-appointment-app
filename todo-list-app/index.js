const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const userRoutes = require('./src/routes/userRoutes');
const appointRoutes = require('./src/routes/appointRoutes');
const authMiddleware = require('./src/middleware/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// User routes (registration and login)
app.use('/api/users', userRoutes);

// Define routes
app.use('/api/tasks', appointRoutes); // Use the appoint routes for /api/appoints


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}  and it is working `);
});
