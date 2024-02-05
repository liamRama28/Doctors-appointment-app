# Appointment Booking System

## Overview
This project is an appointment booking system designed for a medical clinic. It allows users to create appointments. Admin users can view and manage all appointments, while regular users can only manage their own.

## Features
- **User Authentication**: Users can register and log in to the system.
- **Appointment Management**: Users can book and view their appointments.
- **Admin Dashboard**: Admin users (`admin@gmail.com`) have access to all appointments and can manage them by editing, and deleting appointments.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/liamRama28/Capstone-Project-II-part-2.git
2. cd your-repository
3. npm install

### Running the Application
Start the backend server: npm start
Start the frontend server: npm start


Usage
Register: Sign up for a new account.
Login: Log in with your credentials.
Create Appointment: Book a new appointment by specifying the details.
Edit/Delete Appointment: Manage your existing appointments.



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