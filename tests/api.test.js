'use strict';

process.env.JWT_SECRET = 'test-secret';
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');

describe('Health check', () => {
  it('GET /health returns 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'OK');
  });
});

describe('Auth – register', () => {
  it('POST /api/v1/auth/register creates a user and returns a token', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Alice', email: 'alice@example.com', password: 'secret123' });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).not.toHaveProperty('passwordHash');
  });

  it('POST /api/v1/auth/register returns 409 for duplicate email', async () => {
    await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Bob', email: 'bob@example.com', password: 'secret123' });

    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Bob2', email: 'bob@example.com', password: 'secret456' });

    expect(res.statusCode).toBe(409);
  });

  it('POST /api/v1/auth/register returns 422 for invalid data', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: '', email: 'not-an-email', password: '123' });

    expect(res.statusCode).toBe(422);
    expect(res.body.errors).toBeDefined();
  });
});

describe('Auth – login', () => {
  const email = 'charlie@example.com';
  const password = 'mypassword';

  beforeAll(async () => {
    await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Charlie', email, password });
  });

  it('POST /api/v1/auth/login returns a token for valid credentials', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email, password });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('token');
  });

  it('POST /api/v1/auth/login returns 401 for wrong password', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email, password: 'wrongpassword' });

    expect(res.statusCode).toBe(401);
  });

  it('POST /api/v1/auth/login returns 401 for unknown email', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'unknown@example.com', password });

    expect(res.statusCode).toBe(401);
  });
});

describe('Protected routes – JWT validation', () => {
  let token;

  beforeAll(async () => {
    const registerRes = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Dave', email: 'dave@example.com', password: 'davepass123' });
    token = registerRes.body.token;
  });

  it('GET /api/v1/users/me returns 401 without token', async () => {
    const res = await request(app).get('/api/v1/users/me');
    expect(res.statusCode).toBe(401);
  });

  it('GET /api/v1/users/me returns 401 with invalid token', async () => {
    const res = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', 'Bearer invalid.token.value');
    expect(res.statusCode).toBe(401);
  });

  it('GET /api/v1/users/me returns user profile with valid token', async () => {
    const res = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('email', 'dave@example.com');
    expect(res.body.data).not.toHaveProperty('passwordHash');
  });

  it('GET /api/v1/users returns all users with valid token', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

describe('404 handler', () => {
  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/api/v1/unknown-route');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Route not found.');
  });
});
