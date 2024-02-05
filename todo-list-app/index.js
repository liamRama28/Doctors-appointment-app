//index.js
const app = require('./app'); // Import the app

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} and it is working`);
});
