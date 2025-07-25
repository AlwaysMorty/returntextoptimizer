const request = require('supertest');
const { expect } = require('chai');
let server;
before(() => { server = require('../index'); });
after(() => server.close());

describe('session routes', () => {
  it('requires auth for /stats', async () => {
    const res = await request(server).get('/stats');
    expect(res.status).to.equal(401);
  });

  it('login and access protected route', async () => {
    const agent = request.agent(server);
    await agent.post('/login').send({ email: 'test@example.com' });
    const res = await agent.get('/stats');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
