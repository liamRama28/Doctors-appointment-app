const request = require('supertest');
const app = require('../app'); // Update the path to where your app is defined

describe('Login Endpoint', () => {
  it('should authenticate a user successfully with correct credentials', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'admin@gmail.com', // Assuming this is a valid user in your test database
        password: 'admin' // The correct password for the user
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token'); // Assuming a successful login returns a token
  });

  it('should reject login with incorrect credentials', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'admin@gmail.com', // Assuming this user exists
        password: 'wrongpassword' // Incorrect password
      });

    expect(res.statusCode).toEqual(401); // 401 Unauthorized or another appropriate status code
    expect(res.body).not.toHaveProperty('token'); // No token should be returned
  });
});
