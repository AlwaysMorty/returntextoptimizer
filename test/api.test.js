const { expect } = require('chai');
const { patchProduct: patchShopify, getProducts: getShopProducts } = require('../api/shopify');
const { patchProduct: patchWoo, getProducts: getWooProducts } = require('../api/woocommerce');
const { generatePrompt } = require('../gpt/analyzer');

describe('API helpers', () => {
  it('shopify patchProduct returns updated false without key', async () => {
    const res = await patchShopify('p1', { title: 'Neu' });
    expect(res).to.deep.equal({ id: 'p1', updated: false });
  });

  it('woocommerce patchProduct returns updated false without key', async () => {
    const res = await patchWoo('p1', { title: 'Neu' });
    expect(res).to.deep.equal({ id: 'p1', updated: false });
  });

  it('getProducts falls back to local data', async () => {
    const list1 = await getShopProducts();
    const list2 = await getWooProducts();
    expect(list1).to.be.an('array').with.length.greaterThan(0);
    expect(list2).to.be.an('array').with.length.greaterThan(0);
  });
});

describe('generatePrompt', () => {
  it('includes title and reasons', () => {
    const product = { title: 'Schuh', description: 'Ein Schuh' };
    const prompt = generatePrompt(product, ['zu klein']);
    expect(prompt).to.include('Schuh');
    expect(prompt).to.include('- zu klein');
  });
});
