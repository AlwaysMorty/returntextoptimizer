const { expect } = require('chai');
const { categorizeReason, clusterReasonsByProduct } = require('../gpt/analyzer');

describe('Return reason categorization', () => {
  it('categorizes simple size reason', () => {
    const cat = categorizeReason('Fällt kleiner aus als erwartet');
    expect(cat).to.equal('size');
  });

  it('clusters reasons per product', () => {
    const returns = [
      { product_id: 'p1', return_reason: 'zu klein' },
      { product_id: 'p1', return_reason: 'zu klein' },
      { product_id: 'p1', return_reason: 'Farbe stimmt nicht' },
    ];
    const clusters = clusterReasonsByProduct(returns);
    expect(clusters.p1.size).to.equal(2);
    expect(clusters.p1.color).to.equal(1);
  });
});
