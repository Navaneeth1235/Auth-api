import request from 'supertest'; 

describe('Auth API Endpoints', () => {
  let server: any;

  beforeAll(() => {
    server = app.listen(4000); 
  });

  afterAll(() => {
    server.close(); 
  });

  it('should create a new user', async () => {
    const res = await request(server)
      .post('/api/auth/signup')
      .send({
        username: 'testuser',
        password: 'password123',
      });

    expect(res.statusCode).toBe(201); 
    expect(res.body).toHaveProperty('token'); 
  });


  it('should login an existing user', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'password123',
      });

    expect(res.statusCode).toBe(200); 
    expect(res.body).toHaveProperty('token');
  });


  it('should reject login with invalid credentials', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'invaliduser',
        password: 'wrongpassword',
      });

    expect(res.statusCode).toBe(401); 
    expect(res.body).toHaveProperty('error');
  });
});
