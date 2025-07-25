const request = require('supertest');
const { expect } = require('chai');
let server;

before(() => { server = require('../index'); });
after(() => server.close());

describe('public routes', () => {
  it('/products returns list', async () => {
    const res = await request(server).get('/products');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array').with.length.greaterThan(0);
  });

  it('/returns returns list without personal data', async () => {
    const res = await request(server).get('/returns');
    expect(res.status).to.equal(200);
    expect(res.body[0]).to.have.keys('product_id', 'return_reason');
    res.body.forEach(r => {
      expect(r.return_reason).to.not.match(/@/);
    });
  });

  it('/analyze unknown id', async () => {
    const res = await request(server).get('/analyze/unknown');
    expect(res.status).to.equal(404);
  });

  it('/categories unknown id', async () => {
    const res = await request(server).get('/categories/unknown');
    expect(res.status).to.equal(404);
  });
});
