How to Use the App:

1.Start by registering a new user using the /register route.
2.Log in using the registered credentials through the /login route.
3.Create new appointments using the "Create Appointment" button.
4.View, edit, and delete appointments through the appointment list.
5.Admin users can log in and view all appointments via the /admin/appoints route.






Instructions to Install, Test, and Run the App:

git clone <repository-url>
cd <repository-folder>
npm install
Ensure that you have MongoDB installed and running locally.
Update the MongoDB URI in db.js with your connection details.
npm start
Open your web browser and go to http://localhost:3001 or the specified port.







Security Measures:

User Authentication:
-User passwords are hashed before saving to the database using bcrypt.
-JSON Web Tokens (JWT) are used for user authentication.

API Key Handling:
-No explicit API keys are visible in the provided code.
-Secrets like JWT secret and MongoDB URI should be stored in environment variables.

Middleware Security:
-Middleware functions like verifyEmail and validateAppoint provide additional security checks.



Deployment:
The app was deployed onto render throught github. The backend and the front-end were deployued together because:

Simplified Deployment:
Streamlines the process, eliminating the need for separate deployments for the server and client.

Seamless Communication:
Enables direct integration for efficient data exchange, reducing latency and communication challenges.

Efficient Development:
Facilitates cohesive development, allowing simultaneous work on both components and easing issue identification and resolution.



https://doctors-appointment-app-jkgz.onrender.com