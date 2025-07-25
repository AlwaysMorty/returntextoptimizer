const { expect } = require('chai');
const { loadProducts, loadReturns } = require('../db/init');

describe('Test data loading', () => {
  it('should load products from JSON', async () => {
    const products = await loadProducts();
    expect(products).to.be.an('array');
    expect(products).to.have.length.greaterThan(0);
  });

  it('should load returns from CSV', async () => {
    const returns = await loadReturns();
    expect(returns).to.be.an('array');
    expect(returns[0]).to.have.property('product_id');
  });
});
