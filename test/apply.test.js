const request = require('supertest');
const { expect } = require('chai');
let server;
before(() => { server = require('../index'); });
after(() => server.close());

describe('apply suggestion', () => {
  it('updates product via mock patch', async () => {
    const agent = request.agent(server);
    await agent.post('/login').send({ email: 'test@example.com' });
    const resAnalyze = await agent.get('/analyze/p001');
    const res = await agent.post(`/apply/${resAnalyze.body.id}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('shopify');
  });
});
