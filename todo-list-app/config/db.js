//db.js
const mongoose = require('mongoose');

// Define the URI (Uniform Resource Identifier) for the MongoDB cluster
const uri = 'mongodb+srv://Liam:liam@cluster0.1yb4lwz.mongodb.net/?retryWrites=true&w=majority';

// Connect to the MongoDB database using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event handler for when the connection to MongoDB is established
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Event handler for any errors that occur during the database connection
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Export the Mongoose object to make it available for other parts of the application
module.exports = mongoose;
